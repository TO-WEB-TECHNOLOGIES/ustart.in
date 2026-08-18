import { BlogPage } from '@/views/BlogPage';
import { JsonLd } from '@/components/JsonLd';
import { graph, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Food Delivery Blog — Fees, Pricing & Gurgaon Insights',
  description:
    'Straight answers on delivery fees, surge pricing, menu price parity and restaurant economics, plus food delivery trends across Gurgaon and Delhi NCR.',
  path: '/blog',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ])
        )}
      />
      <BlogPage />
    </>
  );
}
