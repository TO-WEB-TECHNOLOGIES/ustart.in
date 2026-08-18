import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cities, getCity } from '@/content/locations';
import { CityPage } from '@/views/CityPage';
import { JsonLd } from '@/components/JsonLd';
import { graph, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type Params = { city: string };

export function generateStaticParams(): Params[] {
  return cities.map((city) => ({ city: city.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);

  if (!city) return {};

  return buildMetadata({
    title: `Food Delivery in ${city.name} — No Hidden Charges`,
    description: `Order food online in ${city.name} at real menu prices. No surge pricing, no fees added at checkout, live order tracking. See the areas USTART delivers to.`,
    path: `/food-delivery/${city.slug}`,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { city: citySlug } = await params;
  const city = getCity(citySlug);

  if (!city) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: `Food Delivery in ${city.name}`, path: `/food-delivery/${city.slug}` },
          ]),
          faqSchema(city.faq)
        )}
      />
      <CityPage city={city} />
    </>
  );
}
