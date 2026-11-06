import React from 'react';
import { Header } from '../components/Header';
import { PageHero } from '../components/PageHero';
import { Footer } from '../components/Footer';
import { Link } from '../router';
import { AppDownloadBlock } from '@/components/AppDownloadPrompt';
import { RestaurantBrowser, type CardGroup } from '@/components/restaurant/RestaurantBrowser';
import { encodeGroups } from '@/components/restaurant/RestaurantCard';
import { cities, getCity, type City } from '@/content/locations';
import { brands, getRestaurantBySlug, restaurants, toCard, type Brand, type Restaurant } from '@/lib/restaurants';

/** Group outlets by area name, biggest areas first; names A–Z inside each area. */
function groupByArea(list: Restaurant[]): CardGroup[] {
  const groups = new Map<string, Restaurant[]>();
  for (const r of list) {
    const key = r.localityName ?? 'Other areas';
    groups.set(key, [...(groups.get(key) ?? []), r]);
  }
  return [...groups.entries()]
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([area, rs]) => ({
      key: area,
      title: area,
      items: rs.sort((a, b) => a.name.localeCompare(b.name)).map(toCard),
    }));
}

const Breadcrumb: React.FC<{ trail: Array<{ to?: string; label: string }> }> = ({ trail }) => (
  <nav className="rl-crumbs" aria-label="Breadcrumb">
    {trail.map((c, idx) => (
      <React.Fragment key={idx}>
        {idx > 0 && <span aria-hidden="true">›</span>}
        {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
      </React.Fragment>
    ))}
  </nav>
);

/** Brand avatar: the logo/cover of the brand's first outlet that has one. */
const brandImage = (b: Brand) =>
  b.outlets.map(getRestaurantBySlug).find((r) => r?.image)?.image ?? null;

export const RestaurantsOverview: React.FC = () => {
  const topBrands = [...brands].sort((a, b) => b.outlets.length - a.outlets.length).slice(0, 18);
  return (
    <div className="about-page-wrapper">
      <Header variant="overlay" />
      <PageHero
        kicker="🍽️ DELHI NCR · RESTAURANTS"
        title={<>Restaurants on <span>USTART</span></>}
        subtitle={`${restaurants.length.toLocaleString('en-IN')} restaurants across Delhi NCR — full menus, real prices, nothing hidden at checkout.`}
        focal="center 30%"
        tint="rgba(255,159,67,0.18)"
      />
      <div className="rl-wrap">
        <Breadcrumb trail={[{ to: '/', label: 'Home' }, { label: 'Restaurants' }]} />

        <section className="rl-cities" aria-labelledby="rl-cities-title">
          <h2 id="rl-cities-title" className="rl-h2">Choose your city</h2>
          <ul>
            {cities.map((c) => {
              const inCity = restaurants.filter((r) => r.city === c.slug);
              const areaCounts = new Map<string, number>();
              for (const r of inCity) if (r.localityName) areaCounts.set(r.localityName, (areaCounts.get(r.localityName) ?? 0) + 1);
              const topAreas = [...areaCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([a]) => a);
              return (
                <li key={c.slug}>
                  <Link to={`/restaurants/${c.slug}`} className="rl-city">
                    <span className="rl-city-name">{c.name}</span>
                    <span className="rl-city-count">{inCity.length.toLocaleString('en-IN')} restaurants</span>
                    <span className="rl-city-areas">{topAreas.join(' · ')}</span>
                    <span className="rl-city-arrow" aria-hidden="true">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="rl-brands-title">
          <h2 id="rl-brands-title" className="rl-h2">Popular brands</h2>
          <div className="rl-brands">
            {topBrands.map((b) => {
              const img = brandImage(b);
              return (
                <Link key={b.slug} to={`/brands/${b.slug}`} className="rl-brand">
                  <span className="rl-brand-img">
                    {img ? <img src={img} alt="" width={72} height={72} loading="lazy" /> : <span>{b.name.charAt(0)}</span>}
                  </span>
                  <span className="rl-brand-name">{b.name}</span>
                  <span className="rl-brand-count">{b.outlets.length} outlets</span>
                </Link>
              );
            })}
          </div>
        </section>

        <AppDownloadBlock />
      </div>
      <Footer />
    </div>
  );
};

export const RestaurantCityList: React.FC<{ city: City; list: Restaurant[] }> = ({ city, list }) => {
  const groups = groupByArea(list);
  return (
    <div className="about-page-wrapper">
      <Header variant="overlay" />
      <PageHero
        kicker={`📍 ${city.name.toUpperCase()} · RESTAURANTS`}
        title={<>Restaurants in <span>{city.name}</span></>}
        subtitle={`${list.length.toLocaleString('en-IN')} restaurants across ${groups.length} areas. Tap any one for its full menu and prices.`}
        focal="center 30%"
        tint="rgba(255,159,67,0.18)"
      />
      <div className="rl-wrap">
        <Breadcrumb
          trail={[
            { to: '/', label: 'Home' },
            { to: '/restaurants', label: 'Restaurants' },
            { label: city.name },
          ]}
        />
        <p className="rl-lead">
          Looking for delivery tips for your area? See <Link to={`/food-delivery/${city.slug}`}>food delivery in {city.name}</Link>.
        </p>
        <RestaurantBrowser data={encodeGroups(groups)} groupNoun="area" />
        <AppDownloadBlock />
      </div>
      <Footer />
    </div>
  );
};

export const BrandPage: React.FC<{ brand: Brand; outlets: Restaurant[] }> = ({ brand, outlets }) => {
  const groups: CardGroup[] = cities
    .map((c) => ({
      key: c.slug,
      title: `${brand.name} in ${c.name}`,
      items: outlets
        .filter((o) => o.city === c.slug)
        .sort((a, b) => (a.localityName ?? '').localeCompare(b.localityName ?? ''))
        .map((o) => ({ ...toCard(o), name: o.localityName ?? getCity(o.city)?.name ?? o.name, area: getCity(o.city)?.name ?? '' })),
    }))
    .filter((g) => g.items.length > 0);
  return (
    <div className="about-page-wrapper">
      <Header variant="overlay" />
      <PageHero
        kicker="🏷️ BRAND · DELHI NCR"
        title={<>{brand.name} <span>on USTART</span></>}
        subtitle={`${outlets.length} ${brand.name} outlets across Delhi NCR. Pick the one nearest you for its full menu.`}
        focal="center 30%"
        tint="rgba(255,159,67,0.18)"
      />
      <div className="rl-wrap">
        <Breadcrumb
          trail={[
            { to: '/', label: 'Home' },
            { to: '/restaurants', label: 'Restaurants' },
            { label: brand.name },
          ]}
        />
        <RestaurantBrowser data={encodeGroups(groups)} groupNoun="city" chipLimit={5} />
        <AppDownloadBlock />
      </div>
      <Footer />
    </div>
  );
};
