'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { groupDishes, sectionDomId, UNAVAILABLE_ID, type Dish, type MenuCategory } from '@/lib/menu';

const fmtInr = (n: number) =>
  `₹${n.toLocaleString('en-IN', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;

const fmtTime = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${h >= 12 && h < 24 ? 'pm' : 'am'}`;
};

interface Props {
  slug: string;
  categories: MenuCategory[];
  initialDishes: Dish[];
  total: number;
  hasMore: boolean;
}

/**
 * The restaurant menu: sticky toolbar (search, Veg only, In stock, section chips
 * that follow the scroll) and the dish list with infinite scroll.
 *
 * Page 1 arrives as props, so it is server-rendered into the HTML. As the
 * visitor nears the end of the list, the next page is fetched from /api/menu.
 * When a filter or search is active, the remaining pages load automatically so
 * results cover the whole menu, not just what has been scrolled so far.
 */
export function MenuBrowser({
  slug,
  categories: initialCategories,
  initialDishes,
  total: initialTotal,
  hasMore: initialHasMore,
}: Props) {
  const [dishes, setDishes] = useState(initialDishes);
  const [categories, setCategories] = useState(initialCategories);
  const [total, setTotal] = useState(initialTotal);
  // An empty menu in the cached HTML may be out of date (seller catalog sync
  // gaps come and go during the day): re-check once in the browser.
  const [checking, setChecking] = useState(initialTotal === 0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [veg, setVeg] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLElement>(null);
  const inflight = useRef(false);

  const loadNext = useCallback(async () => {
    if (inflight.current || !hasMore) return;
    inflight.current = true;
    setLoading(true);
    setFailed(false);
    try {
      const res = await fetch(`/api/menu?slug=${encodeURIComponent(slug)}&page=${page + 1}`);
      if (!res.ok) throw new Error(String(res.status));
      const data: { dishes: Dish[]; hasMore: boolean; page: number } = await res.json();
      setDishes((prev) => {
        const seen = new Set(prev.map((d) => d.id));
        return [...prev, ...data.dishes.filter((d) => !seen.has(d.id))];
      });
      setPage(data.page);
      setHasMore(data.hasMore);
    } catch {
      setFailed(true);
    } finally {
      inflight.current = false;
      setLoading(false);
    }
  }, [hasMore, page, slug]);

  useEffect(() => {
    if (initialTotal !== 0) return;
    let cancelled = false;
    fetch(`/api/menu?slug=${encodeURIComponent(slug)}&page=1`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { dishes: Dish[]; categories: MenuCategory[]; total: number; hasMore: boolean; page: number } | null) => {
        if (cancelled || !data || data.total === 0) return;
        setCategories(data.categories);
        setDishes(data.dishes);
        setTotal(data.total);
        setPage(data.page);
        setHasMore(data.hasMore);
      })
      .catch(() => {})
      .finally(() => !cancelled && setChecking(false));
    return () => {
      cancelled = true;
    };
  }, [initialTotal, slug]);

  // Infinite scroll: start loading well before the visitor reaches the end.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore || failed) return;
    const io = new IntersectionObserver((entries) => entries[0].isIntersecting && loadNext(), {
      rootMargin: '900px 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, failed, loadNext]);

  const filtering = veg || inStock || query.trim().length > 0;

  // With a filter active, pull in the rest of the menu so results are complete.
  useEffect(() => {
    if (filtering && hasMore && !loading && !failed) loadNext();
  }, [filtering, hasMore, loading, failed, loadNext]);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const visible = dishes.filter(
      (d) => (!veg || d.veg === true) && (!inStock || d.inStock) && (!q || d.name.toLowerCase().includes(q))
    );
    const grouped = groupDishes(categories, visible, { separateUnavailable: true });
    // Hold the unavailable section back until the whole menu has loaded, so it is
    // always the very end of the page - never sitting above dishes still to come.
    return hasMore ? grouped.filter((g) => g.id !== UNAVAILABLE_ID) : grouped;
  }, [dishes, categories, veg, inStock, query, hasMore]);

  const shownCount = groups.reduce((n, g) => n + g.dishes.length, 0);

  // Scroll spy over the rendered sections.
  useEffect(() => {
    const els = groups.map((g) => document.getElementById(sectionDomId(g.id))).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: '-160px 0px -60% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [groups]);

  useEffect(() => {
    if (!active) return;
    chipsRef.current
      ?.querySelector<HTMLElement>(`[data-target="${active}"]`)
      ?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [active]);

  const jump = (id: string) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setActive(id);
  };

  const currentId = active ?? (groups[0] ? sectionDomId(groups[0].id) : null);

  return (
    <>
      <div className="rx-toolbar">
        <div className="rx-filters">
          <label className="rx-search">
            <span className="sr-only">Search dishes</span>
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Search dishes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </label>
          <button type="button" className="rx-toggle" aria-pressed={veg} onClick={() => setVeg((v) => !v)}>
            <span className="rx-diet rx-diet--veg" aria-hidden="true" /> Veg only
          </button>
          <button type="button" className="rx-toggle" aria-pressed={inStock} onClick={() => setInStock((v) => !v)}>
            In stock
          </button>
        </div>
        {groups.length > 1 && (
          <nav className="rx-chips" aria-label="Menu sections" ref={chipsRef}>
            {groups.map((g) => {
              const id = sectionDomId(g.id);
              return (
                <a
                  key={g.id}
                  href={`#${id}`}
                  data-target={id}
                  aria-current={currentId === id ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    jump(id);
                  }}
                >
                  {g.title}
                </a>
              );
            })}
          </nav>
        )}
        <p className="rx-results" aria-live="polite">
          {filtering &&
            (loading && hasMore
              ? 'Searching the full menu…'
              : shownCount === 0
                ? 'No dishes match your filters.'
                : `${shownCount} ${shownCount === 1 ? 'dish' : 'dishes'}`)}
        </p>
      </div>

      <div className="rx-menu-list">
        {total === 0 &&
          (checking ? (
            <div className="rx-more-loader" aria-busy="true">
              <p className="rx-empty rx-empty--checking">Checking for the latest menu…</p>
              {[0, 1, 2].map((i) => (
                <div key={i} className="rx-skel" style={{ animationDelay: `${i * 120}ms` }} aria-hidden="true">
                  <div className="rx-skel-text">
                    <i style={{ width: '14px', height: '14px' }} />
                    <i style={{ width: '58%' }} />
                    <i style={{ width: '22%' }} />
                    <i style={{ width: '86%' }} />
                  </div>
                  <i className="rx-skel-img" />
                </div>
              ))}
            </div>
          ) : (
            <p className="rx-empty">
              <strong>Menu temporarily unavailable.</strong> This restaurant&apos;s menu isn&apos;t showing right now. Please check back
              soon.
            </p>
          ))}
        {groups.map((g) => (
          <section
            key={g.id}
            id={sectionDomId(g.id)}
            className={`rx-section${g.id === UNAVAILABLE_ID ? ' rx-section--unavailable' : ''}`}
          >
            <h3 className="rx-section-title">
              {g.title} <span>{g.dishes.length}</span>
            </h3>
            <ul className="rx-dishes">
              {g.dishes.map((d) => (
                <DishRow key={d.id} d={d} />
              ))}
            </ul>
          </section>
        ))}

        {hasMore && (
          <div ref={sentinelRef} className="rx-more-loader" aria-busy={loading}>
            {failed ? (
              <div className="rx-load-error">
                <span>Couldn&apos;t load more dishes.</span>
                <button type="button" className="rx-toggle" onClick={() => loadNext()}>
                  Try again
                </button>
              </div>
            ) : (
              <>
                <span className="sr-only">Loading more dishes…</span>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rx-skel" style={{ animationDelay: `${i * 120}ms` }} aria-hidden="true">
                    <div className="rx-skel-text">
                      <i style={{ width: '14px', height: '14px' }} />
                      <i style={{ width: '58%' }} />
                      <i style={{ width: '22%' }} />
                      <i style={{ width: '86%' }} />
                    </div>
                    <i className="rx-skel-img" />
                  </div>
                ))}
              </>
            )}
          </div>
        )}
        {!hasMore && dishes.length < total && (
          <p className="rx-empty">Showing {dishes.length} of {total} dishes. See the full menu in the USTART app.</p>
        )}
      </div>
    </>
  );
}

function DishRow({ d }: { d: Dish }) {
  const off = !d.inStock;
  const later = d.inStock && !d.available;
  return (
    <li className={`rx-dish${off || later ? ' rx-dish--muted' : ''}`}>
      <div className="rx-dish-info">
        <div className="rx-dish-tags">
          {d.veg !== null && (
            <span className={`rx-diet rx-diet--${d.veg ? 'veg' : 'nonveg'}`}>
              <span className="sr-only">{d.veg ? 'Veg' : 'Non-veg'}</span>
            </span>
          )}
          {d.recommended && <span className="rx-badge">Recommended</span>}
        </div>
        <h4 className="rx-dish-name">{d.name}</h4>
        {/* Customisable dishes come back from the catalog with price 0 - the real
            price depends on the options picked in the app. */}
        {d.price > 0 ? (
          <p className="rx-dish-price">{fmtInr(d.price)}</p>
        ) : (
          d.customisable && <p className="rx-dish-price rx-dish-price--soft">Price on selection</p>
        )}
        {d.description && <p className="rx-dish-desc">{d.description}</p>}
        {off && <p className="rx-dish-note">Currently unavailable</p>}
        {later && d.availableFrom && (
          <p className="rx-dish-note rx-dish-note--soft">Available from {fmtTime(d.availableFrom)}</p>
        )}
      </div>
      <div className={`rx-dish-side${d.image ? '' : ' rx-dish-side--noimg'}`}>
        {d.image && <img src={d.image} alt={d.name} loading="lazy" decoding="async" width={128} height={128} />}
        <button type="button" className="rx-add" data-order disabled={off} aria-label={`Add ${d.name}`}>
          Add
        </button>
        {d.customisable && !off && <span className="rx-custom">Customisable</span>}
      </div>
    </li>
  );
}
