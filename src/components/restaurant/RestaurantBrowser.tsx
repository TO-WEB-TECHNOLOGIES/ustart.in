'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { RestaurantCard, decodeRow, type CardData, type CompactList } from './RestaurantCard';

export interface CardGroup {
  key: string;
  title: string;
  items: CardData[];
}

const groupDomId = (key: string) => `rl-${key.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

/**
 * Photo cards are rendered up front for roughly this many restaurants; later
 * groups start as plain name links and upgrade to cards as they approach the
 * viewport. Delhi has 2,400+ outlets — full cards for all of them made a 3 MB page.
 */
const EAGER_CARDS = 180;

/**
 * Restaurant list with search, Pure Veg / Late night toggles and jump chips for
 * the biggest groups (areas on a city page, cities on a brand page).
 *
 * Every card is server-rendered into the HTML (props → SSR), so all restaurant
 * links are crawlable; filtering happens in the browser and hides nothing from
 * search engines.
 */
export function RestaurantBrowser({ data, groupNoun = 'area', chipLimit = 14 }: { data: CompactList; groupNoun?: string; chipLimit?: number }) {
  const groups: CardGroup[] = useMemo(
    () => data.groups.map((g) => ({ key: g.key, title: g.title, items: g.rows.map((row) => decodeRow(row, data.imgs)) })),
    [data]
  );
  const [query, setQuery] = useState('');
  const [veg, setVeg] = useState(false);
  const [late, setLate] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set());
  const chipsRef = useRef<HTMLElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q && !veg && !late) return groups;
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (c) =>
            (!veg || c.pureVeg) &&
            (!late || c.late) &&
            (!q || `${c.name} ${c.area} ${c.cuisines} ${g.title}`.toLowerCase().includes(q))
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [groups, query, veg, late]);

  const total = filtered.reduce((n, g) => n + g.items.length, 0);
  const chips = useMemo(
    () => [...filtered].sort((a, b) => b.items.length - a.items.length).slice(0, chipLimit),
    [filtered, chipLimit]
  );
  const filtering = query.trim() !== '' || veg || late;

  useEffect(() => {
    const els = filtered.map((g) => document.getElementById(groupDomId(g.key))).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: '-160px 0px -65% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filtered]);

  // Which groups render as full cards: the first ~EAGER_CARDS restaurants, plus
  // any group the visitor has scrolled near (or jumped to).
  const eager = useMemo(() => {
    const keys = new Set<string>();
    let n = 0;
    for (const g of filtered) {
      if (n >= EAGER_CARDS) break;
      keys.add(g.key);
      n += g.items.length;
    }
    return keys;
  }, [filtered]);

  useEffect(() => {
    const pending = filtered.filter((g) => !eager.has(g.key) && !revealed.has(g.key));
    if (!pending.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const keys = entries.filter((e) => e.isIntersecting).map((e) => (e.target as HTMLElement).dataset.key!);
        if (keys.length) setRevealed((prev) => new Set([...prev, ...keys]));
      },
      { rootMargin: '1200px 0px' }
    );
    pending.forEach((g) => {
      const el = document.getElementById(groupDomId(g.key));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [filtered, eager, revealed]);

  const jump = (id: string) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const key = document.getElementById(id)?.dataset.key;
    if (key) setRevealed((prev) => new Set([...prev, key]));
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setActive(id);
  };

  return (
    <div className="rl">
      <div className="rl-toolbar">
        <div className="rx-filters">
          <label className="rx-search">
            <span className="sr-only">Search restaurants</span>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder={`Search restaurants, cuisines or ${groupNoun}s`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </label>
          <button type="button" className="rx-toggle" aria-pressed={veg} onClick={() => setVeg((v) => !v)}>
            <span className="rx-diet rx-diet--veg" aria-hidden="true" /> Pure Veg
          </button>
          <button type="button" className="rx-toggle" aria-pressed={late} onClick={() => setLate((v) => !v)}>
            Late night
          </button>
        </div>
        {chips.length > 1 && (
          <nav className="rx-chips" aria-label={`Jump to ${groupNoun}`} ref={chipsRef}>
            {chips.map((g) => {
              const id = groupDomId(g.key);
              return (
                <a
                  key={g.key}
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    jump(id);
                  }}
                >
                  {g.title} <span className="rl-chip-count">{g.items.length}</span>
                </a>
              );
            })}
          </nav>
        )}
        <p className="rx-results" aria-live="polite">
          {filtering && (total === 0 ? 'No restaurants match.' : `${total.toLocaleString('en-IN')} restaurants`)}
        </p>
      </div>

      {filtered.map((g) => (
        <section key={g.key} id={groupDomId(g.key)} className="rl-group" data-key={g.key}>
          <h2 className="rl-group-title">
            {g.title} <span>{g.items.length}</span>
          </h2>
          {eager.has(g.key) || revealed.has(g.key) ? (
            <div className="rl-grid">
              {g.items.map((c) => (
                <RestaurantCard key={c.slug} c={c} />
              ))}
            </div>
          ) : (
            // Lightweight placeholder with the same links (crawlable), upgraded on approach.
            <ul className="rl-mini">
              {g.items.map((c) => (
                <li key={c.slug}>
                  <a href={c.path}>{c.name}</a>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
