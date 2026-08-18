import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cuisines, getCuisine } from '@/content/cuisines';
import { CuisinePage } from '@/views/CuisinePage';
import { JsonLd } from '@/components/JsonLd';
import { graph, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type Params = { cuisine: string };

export function generateStaticParams(): Params[] {
  return cuisines.map((cuisine) => ({ cuisine: cuisine.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { cuisine: cuisineSlug } = await params;
  const cuisine = getCuisine(cuisineSlug);

  if (!cuisine) return {};

  return buildMetadata({
    title: `${cuisine.heading} in Gurgaon & Delhi`,
    description: cuisine.description,
    path: `/order/${cuisine.slug}`,
  });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { cuisine: cuisineSlug } = await params;
  const cuisine = getCuisine(cuisineSlug);

  if (!cuisine) notFound();

  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: cuisine.heading, path: `/order/${cuisine.slug}` },
          ]),
          faqSchema(cuisine.faq)
        )}
      />
      <CuisinePage cuisine={cuisine} />
    </>
  );
}
