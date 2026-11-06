import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allLocalityPaths, getCity, getLocality } from '@/content/locations';
import { LocalityPage } from '@/views/LocalityPage';
import { JsonLd } from '@/components/JsonLd';
import { graph, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type Params = { city: string; locality: string };

export function generateStaticParams(): Params[] {
  return allLocalityPaths;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { city: citySlug, locality: localitySlug } = await params;
  const city = getCity(citySlug);
  const locality = getLocality(citySlug, localitySlug);

  if (!city || !locality) return {};

  return buildMetadata({
    title: `Food Delivery in ${locality.name}, ${city.name}`,
    description: (() => {
      const place = `${locality.name}, ${city.name}${locality.aka?.length ? ` (${locality.aka[0]})` : ''}`;
      const base = `Order food in ${place} at real menu prices: no surge pricing and no hidden checkout fees.`;
      const withTips = `${base} Delivery tips and FAQs for ${locality.name}.`;
      return withTips.length <= 160 ? withTips : base;
    })(),
    path: `/food-delivery/${city.slug}/${locality.slug}`,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { city: citySlug, locality: localitySlug } = await params;
  const city = getCity(citySlug);
  const locality = getLocality(citySlug, localitySlug);

  if (!city || !locality) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Delhi NCR', path: '/food-delivery' },
            { name: city.name, path: `/food-delivery/${city.slug}` },
            { name: locality.name, path: `/food-delivery/${city.slug}/${locality.slug}` },
          ]),
          faqSchema(locality.faq)
        )}
      />
      <LocalityPage city={city} locality={locality} />
    </>
  );
}
