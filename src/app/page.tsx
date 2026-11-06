import type { Metadata } from 'next';
import { HomePage } from '@/views/HomePage';
import { JsonLd } from '@/components/JsonLd';
import { graph, faqSchema } from '@/lib/schema';
import { homeFaqs } from '@/content/faq';
import { buildMetadata } from '@/lib/seo';

/**
 * The homepage previously had no page-level metadata at all and silently inherited
 * the layout default, which meant no canonical and no page-specific Open Graph.
 * `title.absolute` bypasses the '%s | USTART' template so the brand is not doubled.
 */
export const metadata: Metadata = {
  ...buildMetadata({
    title: 'USTART',
    description:
      'Order food across Delhi NCR (Gurugram, Delhi, Noida, Ghaziabad & Greater Noida) at real menu prices. No surge pricing, no hidden checkout fees.',
    path: '/',
  }),
  title: {
    absolute: 'Food Delivery in Delhi NCR: No Hidden Charges | USTART',
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={graph(faqSchema(homeFaqs))} />
      <HomePage />
    </>
  );
}
