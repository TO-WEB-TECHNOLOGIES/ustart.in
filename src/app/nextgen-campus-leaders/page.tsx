import { CampusPage } from '@/views/CampusPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'NextGen Campus Leaders Program',
  description:
    'Become a creator, build a community and lead from your campus with the USTART NextGen Campus Leaders Program.',
  path: '/nextgen-campus-leaders',
});

export default function Page() {
  return <CampusPage />;
}
