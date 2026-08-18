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
      'Order food in Gurgaon and Delhi at real menu prices. No surge pricing, no hidden checkout fees, live order tracking. Download the USTART food delivery app.',
    path: '/',
  }),
  title: {
    absolute: 'Food Delivery in Gurgaon & Delhi — No Hidden Charges | USTART',
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
