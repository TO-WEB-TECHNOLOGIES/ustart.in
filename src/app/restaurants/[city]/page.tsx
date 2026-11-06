import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { RestaurantCityList } from '@/views/RestaurantLists';
import { graph, breadcrumbSchema, restaurantListSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { cities, getCity } from '@/content/locations';
import { restaurantsInCity, restaurantPath } from '@/lib/restaurants';

type Params = { city: string };

export function generateStaticParams(): Params[] {
  return cities.map((c) => ({ city: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};
  const count = restaurantsInCity(city).length;
  return buildMetadata({
    title: `Restaurants in ${c.name} — ${count.toLocaleString('en-IN')} Menus`,
    description: `Browse ${count.toLocaleString('en-IN')} restaurants delivering in ${c.name} on USTART, by area. Full menus with prices, no surge pricing, no hidden charges.`,
    path: `/restaurants/${city}`,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();
  const list = restaurantsInCity(city);
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Restaurants', path: '/restaurants' },
            { name: c.name, path: `/restaurants/${city}` },
          ]),
          restaurantListSchema(
            `Restaurants in ${c.name} on USTART`,
            list.map((r) => ({ name: r.name, path: restaurantPath(r) }))
          )
        )}
      />
      <RestaurantCityList city={c} list={list} />
    </>
  );
}
