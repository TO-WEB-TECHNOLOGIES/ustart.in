import { CampusPage } from '@/views/CampusPage';
import { buildMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { graph, breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'NextGen Campus Leaders Program',
  description:
    'Become a creator, build a community and lead from your campus with the USTART NextGen Campus Leaders Program.',
  path: '/nextgen-campus-leaders',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'NextGen Campus Leaders', path: '/nextgen-campus-leaders' },
          ])
        )}
      />
      <CampusPage />
    </>
  );
}
