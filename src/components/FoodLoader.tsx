import React from 'react';

/** Rotating taglines. Each holds for ~1.8s; the cycle length is derived in CSS from the count. */
export const LOADER_TAGLINES = [
  'Good Food. Good Mood.',
  'Lowest Prices Ever',
  'Happy Tummy, Happy Wallet',
  'No Hidden Charges',
  'Real Menu Prices',
  'Hot & Fresh, On Its Way',
];

export type LoaderVariant = 'menu' | 'list' | 'city';

/**
 * Route-transition loader, shown by <RouteLoader /> as an overlay while the next
 * city / restaurant / brand page loads. It is never part of a page's server HTML,
 * so crawlers always get the real page content first. Animation is pure CSS.
 *
 * Motion (apple-ui): calm, critically damped curves; taglines rise in and leave
 * upward along the same axis; steam drifts slowly; the skeleton below previews
 * the shape of the page that is coming so the swap feels like a continuation,
 * not a jump. The whole thing fades in after a short delay, so fast navigations
 * never flash a loader. prefers-reduced-motion swaps all of it for gentle fades.
 */
export function FoodLoader({ variant = 'list', label = 'Loading' }: { variant?: LoaderVariant; label?: string }) {
  return (
    <div className="fl-page">
      <div className="fl-main" role="status" aria-live="polite">
        <span className="sr-only">{label}…</span>

        <div className="fl-hero" aria-hidden="true">
          <div className="fl-bowl">
            <span className="fl-steam fl-steam--1" />
            <span className="fl-steam fl-steam--2" />
            <span className="fl-steam fl-steam--3" />
            <svg viewBox="0 0 120 70" className="fl-bowl-svg">
              <path d="M8 22h104c0 26-23 44-52 44S8 48 8 22z" fill="var(--orange)" />
              <path d="M8 22h104" stroke="var(--navy)" strokeWidth="5" strokeLinecap="round" />
              <path d="M30 34c8 10 22 14 38 12" stroke="rgba(255,255,255,0.55)" strokeWidth="4" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          <div className="fl-tags" style={{ '--fl-count': LOADER_TAGLINES.length } as React.CSSProperties}>
            {LOADER_TAGLINES.map((t, i) => (
              <span key={t} className="fl-tag" style={{ '--fl-i': i } as React.CSSProperties}>
                {t}
              </span>
            ))}
          </div>
          <div className="fl-dots">
            <i />
            <i />
            <i />
          </div>
        </div>

        <div className="fl-skeleton" aria-hidden="true">
          {variant === 'menu' ? (
            <>
              <div className="fl-skel-head">
                <i className="fl-sq" />
                <div>
                  <i style={{ width: '62%', height: '26px' }} />
                  <i style={{ width: '34%' }} />
                </div>
              </div>
              <i style={{ height: '44px', borderRadius: '12px' }} />
              {[0, 1, 2].map((k) => (
                <div key={k} className="fl-skel-row">
                  <div>
                    <i style={{ width: '48%' }} />
                    <i style={{ width: '18%' }} />
                    <i style={{ width: '82%' }} />
                  </div>
                  <i className="fl-sq fl-sq--sm" />
                </div>
              ))}
            </>
          ) : (
            <>
              <i style={{ width: '46%', height: '28px' }} />
              <i style={{ width: '70%' }} />
              <div className="fl-skel-grid">
                {Array.from({ length: variant === 'city' ? 6 : 9 }, (_, k) => (
                  <i key={k} className="fl-card" />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
