import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from '../router';
import { AppDownloadBlock, AppDownloadPrompt } from '@/components/AppDownloadPrompt';
import { OpenStatus } from '@/components/restaurant/OpenStatus';
import { MenuBrowser } from '@/components/restaurant/MenuBrowser';
import { HoursTable } from '@/components/restaurant/HoursTable';
import { RestaurantCard } from '@/components/restaurant/RestaurantCard';
import { getCity, getLocality } from '@/content/locations';
import { getCuisine } from '@/content/cuisines';
import { summariseHours } from '@/lib/hours';
import type { MenuPage } from '@/lib/menu';
import { type Restaurant, directionsUrl, getBrand, getRestaurantBySlug, mapUrl, toCard } from '@/lib/restaurants';

/**
 * Restaurant page. Server-rendered from the catalog API (ISR, 24h): the first
 * page of the menu (up to 100 dishes) is in the HTML, and MenuBrowser loads the
 * rest as the visitor scrolls.
 *
 * Layout: a full-bleed navy band (same visual language as the site's page heroes,
 * with the restaurant's own photo blurred into it) carries identity and live
 * status; the menu follows on paper; practical details (hours, address, licence)
 * sit in a quiet About section after it, where people look for them.
 */
const DirectionsIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M12 2.6 2.6 12 12 21.4 21.4 12Z" fill="currentColor" />
    <path d="M9 14.5v-2.2c0-.8.6-1.4 1.4-1.4h3.4M12.4 8.6l2.4 2.3-2.4 2.3" fill="none" stroke="var(--rx-icon-ink,#0f2441)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const RestaurantPage: React.FC<{ restaurant: Restaurant; menu: MenuPage }> = ({ restaurant: r, menu }) => {
  const city = getCity(r.city)!;
  const [locCity, locSlug] = r.localityRef?.split('/') ?? [];
  const locality = locSlug ? getLocality(locCity, locSlug) : undefined;
  const brand = r.brandSlug ? getBrand(r.brandSlug) : undefined;
  const cuisines = r.cuisines.map((slug) => getCuisine(slug)).filter(Boolean);
  const nearby = r.nearby.map(getRestaurantBySlug).filter(Boolean) as Restaurant[];
  const area = r.localityName ?? city.name;
  const routeUrl = directionsUrl(r);
  const hoursSummary = summariseHours(r.hours);

  return (
    <div className="rx-page">
      <Header variant="overlay" />

      {/* ===== HERO BAND ===== */}
      <header
        className="rx-band"
        style={r.image ? ({ '--rx-cover': `url("${r.image}")` } as React.CSSProperties) : undefined}
      >
        <div className="rx-band-inner">
          <nav className="rx-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <Link to="/food-delivery">Delhi NCR</Link>
            <span aria-hidden="true">›</span>
            <Link to={`/food-delivery/${city.slug}`}>{city.name}</Link>
            {locality && (
              <>
                <span aria-hidden="true">›</span>
                <Link to={`/food-delivery/${locCity}/${locality.slug}`}>{locality.name}</Link>
              </>
            )}
            <span aria-hidden="true">›</span>
            <span aria-current="page">{r.name}</span>
          </nav>

          <div className="rx-identity">
            {r.image && <img className="rx-logo" src={r.image} alt={`${r.name}, ${area}`} width={120} height={120} />}
            <div className="rx-identity-text">
              <h1 className="rx-title">{r.name}</h1>
              <p className="rx-sub">
                {area} · {city.name}
              </p>
              {cuisines.length > 0 && (
                <p className="rx-cuisines">
                  {cuisines.map((c, i) => (
                    <React.Fragment key={c!.slug}>
                      {i > 0 && <span aria-hidden="true"> · </span>}
                      <Link to={`/order/${c!.slug}`}>{c!.name}</Link>
                    </React.Fragment>
                  ))}
                </p>
              )}
            </div>
          </div>

          <ul className="rx-meta">
            <li className="rx-meta-status">
              <OpenStatus hours={r.hours} />
            </li>
            {hoursSummary.length === 1 && (
              <li>
                {hoursSummary[0].days === 'Mon–Sun' ? 'Every day' : hoursSummary[0].days} · {hoursSummary[0].text}
              </li>
            )}
            {r.vegType && (
              <li>
                <span className={`rx-diet rx-diet--${r.vegType === 'Pure Veg' ? 'veg' : 'nonveg'} rx-diet--light`} aria-hidden="true" />{' '}
                {r.vegType}
              </li>
            )}
            {r.lateNight && <li>Late-night kitchen</li>}
            {brand && (
              <li>
                <Link to={`/brands/${brand.slug}`} className="rx-band-link">
                  {brand.outlets.length} {brand.name} outlets →
                </Link>
              </li>
            )}
          </ul>

          <div className="rx-actions">
            <a href={routeUrl} target="_blank" rel="noopener noreferrer" className="rx-directions">
              <DirectionsIcon />
              Directions
              <span className="sr-only"> to {r.name} (opens Google Maps)</span>
            </a>
            <span className="rx-actions-addr">{r.address}</span>
          </div>
        </div>
      </header>

      <main className="rx-main">
        {r.description && <p className="rx-desc-lead">{r.description}</p>}

        {/* ===== MENU ===== */}
        <section className="rx-menu" aria-labelledby="rx-menu-title">
          <div className="rx-menu-head">
            <h2 id="rx-menu-title">Menu</h2>
            {menu.total > 0 && <span>{menu.total} dishes</span>}
          </div>
          <MenuBrowser
            slug={r.slug}
            categories={menu.categories}
            initialDishes={menu.dishes}
            total={menu.total}
            hasMore={menu.hasMore}
          />
        </section>

        <AppDownloadBlock headingLevel="h2" />

        {/* ===== ABOUT ===== */}
        <section className="rx-about" aria-labelledby="rx-about-title">
          <h2 id="rx-about-title">About {r.name}</h2>
          <div className="rx-about-grid">
            <div>
              <h3>Opening hours</h3>
              {Object.keys(r.hours).length ? <HoursTable hours={r.hours} /> : <p className="rx-soft">Hours not published.</p>}
            </div>
            <div>
              <h3>Address</h3>
              <p>
                {r.address}
                {r.pincode ? ` – ${r.pincode}` : ''}
              </p>
              <div className="rx-about-links">
                <a href={routeUrl} target="_blank" rel="noopener noreferrer" className="rx-pill-link">
                  <DirectionsIcon />
                  Get directions
                </a>
                <a href={mapUrl(r)} target="_blank" rel="noopener noreferrer" className="rx-link">
                  View on map
                </a>
              </div>
              {r.fssai && (
                <>
                  <h3>FSSAI licence</h3>
                  <p>{r.fssai}</p>
                </>
              )}
              {brand && (
                <>
                  <h3>Brand</h3>
                  <p>
                    <Link to={`/brands/${brand.slug}`} className="rx-link">
                      See all {brand.outlets.length} {brand.name} outlets
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ===== NEARBY ===== */}
        {nearby.length > 0 && (
          <section className="rx-nearby" aria-labelledby="rx-nearby-title">
            <div className="rx-nearby-head">
              <h2 id="rx-nearby-title">More near {area}</h2>
              <Link to={`/restaurants/${city.slug}`} className="rx-link">
                All in {city.name}
              </Link>
            </div>
            <div className="rx-nearby-row">
              {nearby.map((n) => (
                <RestaurantCard key={n.slug} c={toCard(n)} />
              ))}
            </div>
            <p className="rx-related">
              {locality && (
                <>
                  <Link to={`/food-delivery/${locCity}/${locality.slug}`}>Food delivery in {locality.name}</Link>
                  <span aria-hidden="true"> · </span>
                </>
              )}
              <Link to={`/food-delivery/${city.slug}`}>Food delivery in {city.name}</Link>
            </p>
          </section>
        )}
      </main>

      <AppDownloadPrompt restaurantName={r.name} />
      <Footer />
    </div>
  );
};
