import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { BrandPage } from '@/views/RestaurantLists';
import { graph, breadcrumbSchema, restaurantListSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { brands, getBrand, isBrandIndexed, getRestaurantBySlug, restaurantPath, type Restaurant } from '@/lib/restaurants';

type Params = { brand: string };

export function generateStaticParams(): Params[] {
  return brands.map((b) => ({ brand: b.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { brand } = await params;
  const b = getBrand(brand);
  if (!b) return {};
  const n = b.outlets.length;
  const max = 60 - ' | USTART'.length;
  const title =
    [
      `${b.name} in Delhi NCR — ${n} Outlets, Menu & Order`,
      `${b.name} — ${n} Outlets in Delhi NCR`,
      `${b.name} Outlets in Delhi NCR`,
      `${b.name} Outlets & Menu`,
    ].find((t) => t.length <= max) ?? b.name.slice(0, max);
  return buildMetadata({
    title,
    description: `Order from ${n} ${b.name} outlets across Delhi NCR on USTART. Find your nearest outlet, see the full menu with prices — no hidden charges.`.slice(0, 160),
    path: `/brands/${brand}`,
    noindex: !isBrandIndexed(b),
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { brand } = await params;
  const b = getBrand(brand);
  if (!b) notFound();
  const outlets = b.outlets.map(getRestaurantBySlug).filter(Boolean) as Restaurant[];
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Restaurants', path: '/restaurants' },
            { name: b.name, path: `/brands/${brand}` },
          ]),
          { '@type': 'Brand', name: b.name },
          restaurantListSchema(
            `${b.name} outlets on USTART`,
            outlets.map((r) => ({ name: `${r.name}, ${r.localityName ?? r.city}`, path: restaurantPath(r) }))
          )
        )}
      />
      <BrandPage brand={b} outlets={outlets} />
    </>
  );
}
