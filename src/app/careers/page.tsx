import { CareersPage } from '@/views/CareersPage';
import { buildMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { graph, breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'Careers: Jobs in Delhi NCR',
  description:
    'Join the team building fair food delivery across Delhi NCR. Open roles, how we work, and what we look for at USTART.',
  path: '/careers',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Careers', path: '/careers' },
          ])
        )}
      />
      <CareersPage />
    </>
  );
}
