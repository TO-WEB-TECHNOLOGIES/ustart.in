#!/usr/bin/env python3
"""
Build the restaurant index behind /restaurants/* from the partner sheet.

    python3 -I scripts/restaurants/build_data.py \
        --restaurants ustart.in-audit/sheets/restro_seo.xlsx [--no-api] [--refresh-api]

Menus are NOT stored here. Each restaurant page fetches its full menu from the
catalog API on the server (ISR, cached 24h) — see src/lib/catalog.ts. This
script only makes one light call per restaurant (`limit=1`) to learn the dish
count and the menu's category names, used for the index/noindex decision and
for cuisine tags. Responses are cached in ustart.in-audit/.api-cache/ so a
re-run does not call the API again unless --refresh-api is passed.

Standard library only. The input sheet is a private export (git-ignored); the
outputs in src/data/restaurants/ are the public, trimmed index the site uses.
Privacy: only customer-facing fields are emitted. Never add owner contact,
commission, bank, GST or PAN columns to the outputs.
"""

import argparse
import collections
import concurrent.futures
import hashlib
import json
import math
import os
import re
import ssl
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'src', 'data', 'restaurants')
REPORT = os.path.join(ROOT, 'ustart.in-audit', 'restaurant-data-report.md')

# ── cities we serve ──────────────────────────────────────────────────────────
CITY_MAP = {
    'new delhi': 'delhi', 'delhi': 'delhi', 'north west delhi': 'delhi', 'begum pur': 'delhi',
    'gurgaon': 'gurgaon', 'gurugram': 'gurgaon',
    'noida': 'noida',
    'ghaziabad': 'ghaziabad',
    'greater noida': 'greater-noida',
}
CITY_NAMES = {
    'delhi': 'Delhi', 'gurgaon': 'Gurgaon', 'noida': 'Noida',
    'ghaziabad': 'Ghaziabad', 'greater-noida': 'Greater Noida',
}

# ── raw locality → one of the 32 editorial locality pages ───────────────────
# Name matching only. Proximity is deliberately NOT used: listing a Kalkaji
# restaurant under "Greater Kailash" because it is 1 km away misleads users.
# Each rule: (city, locality page city, locality slug, regex on raw locality).
def sector(nums):
    alt = '|'.join(str(n) for n in nums)
    return rf'\bsector[\s-]*({alt})\b(?![a-z0-9])'

EXPRESSWAY = list(range(125, 138)) + [142, 143, 144, 168]
LOCALITY_RULES = [
    # Gurgaon
    ('gurgaon', 'gurgaon', 'cyber-city', r'cyber\s*(city|hub)'),
    ('gurgaon', 'gurgaon', 'sector-29', sector([29])),
    ('gurgaon', 'gurgaon', 'dlf-phase-1', r'dlf\s*phase[\s-]*(1|i)\b(?!\d)'),
    ('gurgaon', 'gurgaon', 'dlf-phase-2', r'dlf\s*phase[\s-]*(2|ii)\b(?!\d)'),
    ('gurgaon', 'gurgaon', 'dlf-phase-3', r'dlf\s*phase[\s-]*(3|iii)\b(?!\d)'),
    ('gurgaon', 'gurgaon', 'golf-course-road', r'golf\s*course\s*road'),
    ('gurgaon', 'gurgaon', 'sohna-road', r'sohna\s*road'),
    ('gurgaon', 'gurgaon', 'mg-road', r'\bm\.?\s?g\.?\s*road\b|mehrauli[\s-]*gurgaon'),
    ('gurgaon', 'gurgaon', 'udyog-vihar', r'udyog\s*vihar'),
    ('gurgaon', 'gurgaon', 'sushant-lok', r'sushant\s*lok'),
    ('gurgaon', 'gurgaon', 'south-city', r'south\s*city'),
    ('gurgaon', 'gurgaon', 'palam-vihar', r'palam\s*vihar'),
    # Delhi
    ('delhi', 'delhi', 'connaught-place', r'connaught\s*place|\(cp\)|^cp$'),
    ('delhi', 'delhi', 'saket', r'\bsaket\b'),
    ('delhi', 'delhi', 'hauz-khas', r'hauz\s*khas'),
    ('delhi', 'delhi', 'vasant-kunj', r'vasant\s*kunj|vasant\s*square'),
    ('delhi', 'delhi', 'dwarka', r'\bdwarka\b'),
    ('delhi', 'delhi', 'nehru-place', r'nehru\s*place'),
    ('delhi', 'delhi', 'greater-kailash', r'greater\s*kailash|\bgk[\s-]*(1|2|i|ii)\b'),
    ('delhi', 'delhi', 'lajpat-nagar', r'lajpat\s*nagar'),
    # Noida
    ('noida', 'noida', 'sector-18', sector([18]) + r'|mall of india|atta\s*market'),
    ('noida', 'noida', 'sector-62', sector([62])),
    ('noida', 'noida', 'sector-50', sector([50])),
    ('noida', 'noida', 'sector-76', sector([76])),
    ('noida', 'noida', 'noida-expressway', sector(EXPRESSWAY) + r'|expressway'),
    # Noida Extension is administratively Greater Noida West.
    ('noida', 'greater-noida', 'greater-noida-west', r'noida\s*extension|gaur\s*city|greater\s*noida\s*west'),
    # Ghaziabad
    ('ghaziabad', 'ghaziabad', 'indirapuram', r'indirapuram|shipra\s*mall|(shakti|niti|ahinsa|vaibhav|abhay|nyay|gyan)\s*khand'),
    ('ghaziabad', 'ghaziabad', 'vaishali', r'\bvaishali\b|mahagun\s*metro'),
    ('ghaziabad', 'ghaziabad', 'raj-nagar-extension', r'raj\s*nagar\s*extension|\brne\b'),
    ('ghaziabad', 'ghaziabad', 'crossings-republik', r'crossings?\s*republi[kc]'),
    # Greater Noida
    ('greater-noida', 'greater-noida', 'greater-noida-west',
     r'gaur\s*city|noida\s*extension|greater\s*noida\s*west|tech\s*zone|techzone|gaur\s*chowk|ek\s*murti|amrapali\s*(leisure|dream)\s*valley'),
    ('greater-noida', 'greater-noida', 'pari-chowk',
     r'pari\s*chowk|\b(alpha|beta|gamma)\b|jagat\s*farm|omaxe\s*connaught'),
    ('greater-noida', 'greater-noida', 'knowledge-park', r'knowledge\s*park'),
]
LOCALITY_RULES = [(c, lc, s, re.compile(rx, re.I)) for c, lc, s, rx in LOCALITY_RULES]


CATALOG_API = os.environ.get('CATALOG_API_BASE', 'https://api-ondc.ustart.in/api/v1/').rstrip('/') + '/'
API_CACHE = os.path.join(ROOT, 'ustart.in-audit', '.api-cache')
API_WORKERS = 5
MIN_INDEXABLE_DISHES = 10

# ── cuisine inference from the menu's category names → /order/{slug} pages ──
CUISINE_RULES = {
    'biryani': r'biryani|biriyani|pulao',
    'pizza': r'pizza',
    'north-indian': r'north indian|punjabi|mughlai|main course|curr(y|ies)|\bdal\b|paneer|tandoor|breads?\b|roti|naan|thali|kebab|kabab',
    'chinese': r'chinese|noodle|fried rice|manchurian|chowmein|chow mein|dim sum|szechuan|schezwan',
    'burgers': r'burger',
    'momos': r'momo',
    'rolls': r'\brolls?\b|wraps?\b|kathi',
    'south-indian': r'south indian|dosa|idli|vada|uttapam',
    'desserts': r'dessert|cake|pastr|ice cream|sweet|mithai|shake|waffle|brownie',
    'healthy': r'salad|healthy|protein|bowl|keto|diet',
}
CUISINE_RULES = {k: re.compile(v, re.I) for k, v in CUISINE_RULES.items()}

# Category names that are merchandising slots, not menu sections.
NON_MENU_CATEGORY = re.compile(
    r'recommended|your orders|collections?|best ?sellers?|top picks|must try|offers?\b|combos? for you|trending',
    re.I,
)

GENERIC = re.compile(
    r'delicious|scrumptious|mouth[\s-]?watering|cozy atmosphere|perfect place|satisf(y|ies) your|'
    r'liked by one and all|very proudly|wide (variety|range) of|something for everyone',
    re.I,
)


def slugify(text):
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode()
    text = re.sub(r"['’`]", '', text.lower())
    return re.sub(r'[^a-z0-9]+', '-', text).strip('-')


def clean(text):
    return re.sub(r'\s+', ' ', (text or '')).strip()


def https(url):
    if not url:
        return None
    return 'https://' + url[len('http://'):] if url.startswith('http://') else url


def read_xlsx(path):
    z = zipfile.ZipFile(path)
    ns = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
    shared = []
    if 'xl/sharedStrings.xml' in z.namelist():
        for si in ET.fromstring(z.read('xl/sharedStrings.xml')).findall(ns + 'si'):
            shared.append(''.join(t.text or '' for t in si.iter(ns + 't')))
    rows = []
    for row in ET.fromstring(z.read('xl/worksheets/sheet1.xml')).iter(ns + 'row'):
        cells = {}
        for c in row.findall(ns + 'c'):
            col = re.match('[A-Z]+', c.get('r')).group()
            t = c.get('t')
            if t == 'inlineStr':
                cells[col] = ''.join(x.text or '' for x in c.iter(ns + 't'))
                continue
            v = c.find(ns + 'v')
            cells[col] = None if v is None else (shared[int(v.text)] if t == 's' else v.text)
        rows.append(cells)
    header = rows[0]
    return [{header[k]: r.get(k) for k in header} for r in rows[1:]]


def match_locality(city, raw_locality, street):
    for text in (raw_locality, street):
        if not text:
            continue
        for rule_city, loc_city, slug, rx in LOCALITY_RULES:
            if rule_city == city and rx.search(text):
                return loc_city, slug
    return None, None


DAY_NAMES = {1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday', 7: 'Sunday'}


def hhmm(value):
    value = str(value).zfill(4)
    return f'{value[:2]}:{value[2:]}'


def parse_hours(raw):
    """
    ONDC order windows → {dayNumber: [[open, close], ...]} (ONDC: 1 = Monday).

    ONDC splits a late-night day at midnight: a restaurant open 11:00–02:45 is
    sent as 11:00–23:59 on Monday plus 00:00–02:45 on Tuesday. Those halves are
    joined back into one overnight window on the opening day (["11:00", "02:45"],
    close < open meaning "next day"). Genuine split days (lunch + dinner) keep
    both windows. A day covering the whole clock becomes ["00:00", "24:00"].
    Returns (hours, late_night).
    """
    try:
        t = json.loads(raw or '{}')
    except json.JSONDecodeError:
        return {}, False
    days = collections.defaultdict(list)
    for w in t.get('orderWindows') or []:
        try:
            day = int(w['day'])
            frm, to = int(w['timeFrom']), int(w['timeTo'])
        except (KeyError, ValueError, TypeError):
            continue
        if day in DAY_NAMES and (frm, to) not in days[day]:
            days[day].append((frm, to))
    for d in days:
        days[d].sort()

    def ends_at_midnight(to):
        return to >= 2358

    # Join "…–23:59" with the next day's "00:00–…" into one overnight window.
    absorbed = collections.defaultdict(set)  # day → indexes of 00:00 windows joined to the previous day
    out = {}
    for d in sorted(days):
        nxt = d % 7 + 1
        windows = []
        for i, (frm, to) in enumerate(days[d]):
            if i in absorbed[d]:
                continue
            if ends_at_midnight(to) and frm > 0:
                cont = next((j for j, (f2, t2) in enumerate(days.get(nxt, [])) if f2 == 0 and t2 < 1200), None)
                if cont is not None:
                    absorbed[nxt].add(cont)
                    windows.append([hhmm(frm), hhmm(days[nxt][cont][1])])
                    continue
            if frm == 0 and ends_at_midnight(to):
                windows.append(['00:00', '24:00'])
                continue
            windows.append([hhmm(frm), hhmm(to)])
        out[d] = windows
    # Sunday's overnight window absorbs Monday's 00:00 window after Monday was
    # already emitted — drop any absorbed 00:00 window that slipped through.
    for d, idxs in absorbed.items():
        joined = {(hhmm(days[d][j][0]), hhmm(days[d][j][1])) for j in idxs}
        out[d] = [w for w in out.get(d, []) if tuple(w) not in joined]
    hours = {str(d): ws for d, ws in sorted(out.items()) if ws}

    def late_window(w):
        o, c = w
        return c == '24:00' or c < o or c >= '23:30'

    late = any(late_window(w) for ws in hours.values() for w in ws)
    return hours, late


def haversine(a, b):
    lat1, lon1 = map(math.radians, a)
    lat2, lon2 = map(math.radians, b)
    h = math.sin((lat2 - lat1) / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin((lon2 - lon1) / 2) ** 2
    return 6371 * 2 * math.asin(math.sqrt(h))



def _ssl_context():
    # python.org builds on macOS ship without a CA bundle; fall back to the
    # system bundle instead of disabling verification.
    ctx = ssl.create_default_context()
    for bundle in ('/etc/ssl/cert.pem', '/etc/ssl/certs/ca-certificates.crt'):
        if os.path.exists(bundle):
            ctx.load_verify_locations(bundle)
            break
    return ctx


SSL_CTX = _ssl_context()


def api_summary(provider_id, bpp_id, refresh):
    """One `limit=1` call: dish count + category names. Cached on disk."""
    key = hashlib.sha1(f'{bpp_id}|{provider_id}'.encode()).hexdigest()
    path = os.path.join(API_CACHE, f'{key}.json')
    if not refresh and os.path.exists(path):
        with open(path) as f:
            return json.load(f)
    url = (
        f'{CATALOG_API}catalog/providers/{urllib.parse.quote(provider_id, safe="")}/items'
        f'?bpp_id={urllib.parse.quote(bpp_id, safe="")}&limit=1'
    )
    last_error = None
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'ustart-seo-indexer/1.0'})
            with urllib.request.urlopen(req, timeout=20, context=SSL_CTX) as resp:
                data = json.load(resp)
            out = {
                'ok': True,
                'total': int(data.get('total') or 0),
                'categories': [
                    {'name': clean(c.get('name')), 'rank': c.get('rank')}
                    for c in data.get('categories') or []
                    if clean(c.get('name'))
                ],
            }
            os.makedirs(API_CACHE, exist_ok=True)
            with open(path, 'w') as f:
                json.dump(out, f)
            return out
        except urllib.error.HTTPError as e:
            last_error = f'HTTP {e.code}'
            if e.code in (400, 404):
                break
        except (urllib.error.URLError, TimeoutError, ValueError) as e:
            last_error = str(e)[:80]
        time.sleep(1.5 * (2 ** attempt))
    return {'ok': False, 'error': last_error}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--restaurants', required=True)
    ap.add_argument('--no-api', action='store_true', help='skip the per-restaurant API calls')
    ap.add_argument('--refresh-api', action='store_true', help='ignore the on-disk API cache')
    args = ap.parse_args()
    snapshot = date.today().isoformat()

    excluded = collections.Counter()
    seen = set()
    outlets = []
    for r in read_xlsx(args.restaurants):
        pid = clean(r.get('restaurant_id'))
        bpp = clean(r.get('seller_app'))
        if not pid or not bpp:
            excluded['missing provider id or seller app'] += 1
            continue
        key = f'{bpp}|{pid}'
        if key in seen:
            excluded['duplicate (seller app, provider id)'] += 1
            continue
        seen.add(key)
        if clean(r.get('status')).lower() != 'active':
            excluded['not active'] += 1
            continue
        try:
            addr = json.loads(r.get('address_raw') or '{}')
        except json.JSONDecodeError:
            addr = {}
        city = CITY_MAP.get(clean(addr.get('city')).lower())
        if not city:
            excluded[f"outside served cities ({clean(addr.get('city')) or 'blank'})"] += 1
            continue
        try:
            lat, lon = float(r['latitude']), float(r['longitude'])
        except (TypeError, ValueError):
            excluded['missing coordinates'] += 1
            continue
        outlets.append({'raw': r, 'addr': addr, 'id': pid, 'bpp': bpp, 'key': key,
                        'city': city, 'lat': lat, 'lon': lon})

    # ── one light API call per outlet ───────────────────────────────────────
    summaries = {}
    api_failures = collections.Counter()
    if not args.no_api:
        print(f'querying catalog API for {len(outlets)} outlets…', file=sys.stderr)
        with concurrent.futures.ThreadPoolExecutor(API_WORKERS) as pool:
            futures = {pool.submit(api_summary, o['id'], o['bpp'], args.refresh_api): o['key'] for o in outlets}
            for n, fut in enumerate(concurrent.futures.as_completed(futures), 1):
                summaries[futures[fut]] = res = fut.result()
                if not res.get('ok'):
                    api_failures[res.get('error') or 'unknown'] += 1
                if n % 500 == 0:
                    print(f'  {n}/{len(outlets)}', file=sys.stderr)

    desc_counts = collections.Counter(clean(o['raw'].get('description')).lower() for o in outlets)
    name_counts = collections.Counter(slugify(clean(o['raw'].get('name'))) for o in outlets)

    slug_path = os.path.join(OUT, 'slugs.json')
    old_slugs = {}
    if os.path.exists(slug_path):
        with open(slug_path) as f:
            old_slugs = json.load(f)
    used = set(old_slugs.values())

    records = []
    for o in outlets:
        r, addr = o['raw'], o['addr']
        name = clean(r.get('name'))
        raw_loc = clean(addr.get('locality')) or clean(addr.get('street'))
        loc_city, loc_slug = match_locality(o['city'], clean(addr.get('locality')), clean(addr.get('street')))

        slug = old_slugs.get(o['key'])
        if not slug:
            base = slugify(f'{name} {raw_loc}')[:80].strip('-') or slugify(name)
            slug = base
            if slug in used:
                slug = f'{base}-{slugify(o["id"])[-6:]}'
            used.add(slug)

        desc = clean(r.get('description'))
        if (
            len(desc) < 120
            or desc.lower() == name.lower()
            or desc_counts[desc.lower()] > 1
            or GENERIC.search(desc)
        ):
            desc = None

        summary = summaries.get(o['key']) or {}
        sections = [
            c['name'] for c in sorted(summary.get('categories') or [], key=lambda c: (c['rank'] is None, c['rank'] or 0))
            if not NON_MENU_CATEGORY.search(c['name'])
        ]
        # dedupe, keep order
        sections = list(dict.fromkeys(sections))
        hits = collections.Counter()
        for s in sections:
            for slug_c, rx in CUISINE_RULES.items():
                if rx.search(s):
                    hits[slug_c] += 1
        # fall back to the restaurant name for single-cuisine brands ("Biryani Blues")
        for slug_c, rx in CUISINE_RULES.items():
            if rx.search(name):
                hits[slug_c] += 2
        cuisines = [c for c, _ in hits.most_common(3)]

        item_count = summary.get('total') if summary.get('ok') else None
        hours, late = parse_hours(r.get('timing_raw'))
        brand_key = slugify(name)
        street = clean(addr.get('street'))
        parts = [street]
        if raw_loc and raw_loc.lower() not in street.lower():
            parts.append(raw_loc)
        parts.append(CITY_NAMES[o['city']])

        if args.no_api or item_count is None:
            indexable = bool(raw_loc)
        else:
            indexable = bool(raw_loc) and item_count >= MIN_INDEXABLE_DISHES

        records.append({
            'id': o['id'],
            'bppId': o['bpp'],
            'slug': slug,
            'name': name,
            'brandSlug': brand_key if name_counts[brand_key] >= 2 else None,
            'city': o['city'],
            'localityName': raw_loc or None,
            'localityRef': f'{loc_city}/{loc_slug}' if loc_slug else None,
            'address': ', '.join(p for p in parts if p),
            'pincode': clean(addr.get('areaCode')) or None,
            'lat': round(o['lat'], 6),
            'lon': round(o['lon'], 6),
            'vegType': clean(r.get('veg_type')) or None,
            'cuisines': cuisines,
            'menuSections': sections[:12],
            'itemCount': item_count,
            'hours': hours,
            'lateNight': late,
            'fssai': clean(r.get('fssai_license')) or None,
            'partnerSince': clean(r.get('partner_since')) or None,
            'image': https(clean(r.get('cover_image_url'))),
            'description': desc,
            'chain': name_counts[brand_key] >= 2,
            'indexable': indexable,
            'nearby': [],
        })

    by_city = collections.defaultdict(list)
    for rec in records:
        if rec['indexable']:
            by_city[rec['city']].append(rec)
    for rec in records:
        here = (rec['lat'], rec['lon'])
        best = sorted(
            (haversine(here, (p['lat'], p['lon'])), p['slug']) for p in by_city[rec['city']] if p is not rec
        )[:6]
        rec['nearby'] = [s for _, s in best]

    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, 'restaurants.json'), 'w') as f:
        json.dump({'snapshot': snapshot, 'restaurants': records}, f, ensure_ascii=False, separators=(',', ':'))

    with open(slug_path, 'w') as f:
        json.dump(dict(sorted({**old_slugs, **{o['key']: rec['slug'] for o, rec in zip(outlets, records)}}.items())),
                  f, indent=0, ensure_ascii=False)

    # Pages that were live in a previous run but are gone now → 301 to the city list.
    live = {f'/restaurants/{rec["city"]}/{rec["slug"]}' for rec in records}
    redirects_path = os.path.join(OUT, 'redirects.json')
    redirects = []
    if os.path.exists(redirects_path):
        with open(redirects_path) as f:
            redirects = [x for x in json.load(f) if x['source'] not in live]
    prev_path = os.path.join(OUT, 'live-paths.json')
    if os.path.exists(prev_path):
        with open(prev_path) as f:
            for path in json.load(f):
                if path not in live and not any(x['source'] == path for x in redirects):
                    redirects.append({'source': path, 'destination': '/' + '/'.join(path.split('/')[1:3])})
    with open(redirects_path, 'w') as f:
        json.dump(redirects, f, indent=1)
    with open(prev_path, 'w') as f:
        json.dump(sorted(live), f, separators=(',', ':'))

    brands = collections.defaultdict(lambda: {'name': None, 'outlets': []})
    for rec in records:
        if rec['brandSlug']:
            b = brands[rec['brandSlug']]
            b['name'] = b['name'] or rec['name']
            b['outlets'].append(rec['slug'])
    with open(os.path.join(OUT, 'brands.json'), 'w') as f:
        json.dump([{'slug': k, 'name': v['name'], 'outlets': v['outlets']} for k, v in sorted(brands.items())],
                  f, ensure_ascii=False, separators=(',', ':'))

    # ── report ───────────────────────────────────────────────────────────────
    idx = [r for r in records if r['indexable']]
    idx_ind = [r for r in idx if not r['chain']]
    city_counts = collections.Counter(r['city'] for r in records)
    loc_counts = collections.Counter(r['localityRef'] for r in records if r['localityRef'])
    unmatched = collections.Counter((r['city'], r['localityName']) for r in records
                                    if not r['localityRef'] and r['localityName'])
    small = sum(1 for r in records if r['itemCount'] is not None and r['itemCount'] < MIN_INDEXABLE_DISHES)
    lines = [
        f'# Restaurant data report — {snapshot}', '',
        '_Generated by `scripts/restaurants/build_data.py`. Do not edit by hand._', '',
        f'- Outlets included: **{len(records)}**',
        f'- Indexable: **{len(idx)}** (independent: {len(idx_ind)}, chain outlets: {len(idx) - len(idx_ind)})',
        f'- Brands (2+ outlets): {len(brands)}',
        f'- Catalog API: {"skipped (--no-api)" if args.no_api else f"{len(summaries)} outlets queried, {sum(api_failures.values())} failed"}',
        f'- Outlets with fewer than {MIN_INDEXABLE_DISHES} dishes (noindex): {small}',
        f'- Outlets with no cuisine tag: {sum(1 for r in records if not r["cuisines"])}', '',
        '## Outlets by city', '', '| City | Outlets | Indexable |', '|---|---:|---:|',
    ]
    for c, n in city_counts.most_common():
        lines.append(f'| {CITY_NAMES[c]} | {n} | {sum(1 for r in idx if r["city"] == c)} |')
    lines += ['', '## Excluded', '', '| Reason | Count |', '|---|---:|']
    for reason, n in excluded.most_common():
        lines.append(f'| {reason} | {n} |')
    if api_failures:
        lines += ['', '## API failures', '', '| Error | Count |', '|---|---:|']
        for err, n in api_failures.most_common():
            lines.append(f'| {err} | {n} |')
    lines += ['', '## Outlets matched to editorial locality pages', '', '| Locality | Outlets |', '|---|---:|']
    for ref, n in sorted(loc_counts.items()):
        lines.append(f'| {ref} | {n} |')
    lines += ['', '## Largest unmatched localities (candidates for new locality pages)', '',
              '| City | Locality | Outlets |', '|---|---|---:|']
    for (c, l), n in unmatched.most_common(40):
        lines.append(f'| {CITY_NAMES[c]} | {l} | {n} |')
    with open(REPORT, 'w') as f:
        f.write('\n'.join(lines) + '\n')
    print('\n'.join(lines[:11]), file=sys.stderr)


if __name__ == '__main__':
    main()
