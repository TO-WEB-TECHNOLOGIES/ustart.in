import { getIntentPage } from '@/content/intent-pages';
import { IntentLandingPage } from '@/views/IntentLandingPage';
import { JsonLd } from '@/components/JsonLd';
import { graph, breadcrumbSchema, faqSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

const SLUG = 'elite';
const page = getIntentPage(SLUG)!;

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: `/${SLUG}`,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: page.h1, path: `/${SLUG}` },
          ]),
          faqSchema(page.faq)
        )}
      />
      <IntentLandingPage page={page} />
    </>
  );
}
