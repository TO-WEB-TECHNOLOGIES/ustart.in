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
    description: `Order food in ${locality.name}, ${city.name} at real menu prices — no surge pricing and no hidden checkout fees. Delivery tips and FAQs for ${locality.name}.`,
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
