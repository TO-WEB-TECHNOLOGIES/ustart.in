import type { Metadata } from 'next';
import { NcrHubPage } from '@/views/NcrHubPage';
import { JsonLd } from '@/components/JsonLd';
import { graph, breadcrumbSchema, faqSchema, cityListSchema } from '@/lib/schema';
import { ncrFaqs } from '@/content/locations';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Food Delivery in Delhi NCR: Gurugram, Delhi, Noida',
  description:
    'Order food online across Delhi NCR (Gurugram, Delhi, Noida, Ghaziabad and Greater Noida) at real menu prices. No surge pricing, no hidden checkout fees.',
  path: '/food-delivery',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Delhi NCR', path: '/food-delivery' },
          ]),
          cityListSchema(),
          faqSchema(ncrFaqs)
        )}
      />
      <NcrHubPage />
    </>
  );
}
