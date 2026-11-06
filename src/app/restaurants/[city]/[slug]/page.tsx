import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { RestaurantPage } from '@/views/RestaurantPage';
import { graph, breadcrumbSchema, restaurantSchema, type Crumb } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { getCity, getLocality } from '@/content/locations';
import { getCuisine } from '@/content/cuisines';
import { fetchMenuPage, fetchMenuPageSafe } from '@/lib/catalog';
import { groupDishes } from '@/lib/menu';
import { getRestaurant, getBrand, isIndexed, restaurantPath, SNAPSHOT_DATE } from '@/lib/restaurants';

type Params = { city: string; slug: string };

/**
 * Rendering model - on-demand ISR:
 * - Nothing is prerendered at build (empty generateStaticParams), so builds stay
 *   fast and never hit the catalog API.
 * - The first request for a restaurant renders it on the server, fetching the
 *   menu from the catalog API; the HTML (with every dish) is cached for 24h.
 * - Slugs not in the restaurant index 404 via notFound() below.
 */
export const revalidate = 86400;
export const dynamicParams = true;

export function generateStaticParams(): Params[] {
  return [];
}

/** Below this many dishes a page is too thin to index, whatever the snapshot said. */
const MIN_INDEXABLE_DISHES = 10;
const MAX_TITLE = 60 - ' | USTART'.length;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city, slug } = await params;
  const r = getRestaurant(city, slug);
  if (!r) return {};

  // Same URL + cache options as the page render, so Next dedupes this fetch.
  const menu = await fetchMenuPageSafe(r.id, r.bppId, 1);
  const area = r.localityName ?? getCity(r.city)?.name ?? '';
  const title =
    [`${r.name}, ${area}: Menu & Order Online`, `${r.name}, ${area} Menu`, `${r.name} Menu`].find(
      (t) => t.length <= MAX_TITLE
    ) ?? r.name.slice(0, MAX_TITLE);

  const cuisineNames = r.cuisines.map((c) => getCuisine(c)?.name).filter(Boolean);
  const dishCount = menu?.total ?? r.itemCount;
  const facts = [
    dishCount ? `${dishCount} dishes` : null,
    cuisineNames.length ? cuisineNames.join(', ') : null,
    r.vegType,
  ].filter(Boolean);
  const description = [
    `Full ${r.name} menu with prices in ${area}, ${getCity(r.city)?.name}.`,
    facts.length ? `${facts.join(' · ')}.` : '',
    'Order on USTART: no hidden charges.',
  ]
    .filter(Boolean)
    .join(' ')
    .slice(0, 160);

  const thin = menu ? menu.total < MIN_INDEXABLE_DISHES : false;
  return buildMetadata({
    title,
    description,
    path: restaurantPath(r),
    noindex: !isIndexed(r) || thin,
    modifiedTime: SNAPSHOT_DATE,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { city, slug } = await params;
  const r = getRestaurant(city, slug);
  if (!r) notFound();

  // Page 1 only (up to 100 dishes) - the rest loads on scroll via /api/menu.
  // Throws on API failure: during ISR revalidation that keeps the last good page
  // in the cache; on a first render the error is not cached and is retried.
  const menu = await fetchMenuPage(r.id, r.bppId, 1);

  const cityData = getCity(r.city)!;
  const [locCity, locSlug] = r.localityRef?.split('/') ?? [];
  const locality = locSlug ? getLocality(locCity, locSlug) : undefined;
  const brand = r.brandSlug ? getBrand(r.brandSlug) : undefined;

  const crumbs: Crumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Delhi NCR', path: '/food-delivery' },
    { name: cityData.name, path: `/food-delivery/${cityData.slug}` },
    ...(locality ? [{ name: locality.name, path: `/food-delivery/${locCity}/${locality.slug}` }] : []),
    { name: r.name, path: restaurantPath(r) },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema(crumbs),
          restaurantSchema(r, { groups: groupDishes(menu.categories, menu.dishes) }, {
            cuisineNames: r.cuisines.map((c) => getCuisine(c)?.name).filter(Boolean) as string[],
            brandName: brand?.name,
          })
        )}
      />
      <RestaurantPage restaurant={r} menu={menu} />
    </>
  );
}
