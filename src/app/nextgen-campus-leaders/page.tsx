import type { Metadata } from 'next';
import { CampusPage } from '@/views/CampusPage';

export const metadata: Metadata = {
  title: 'NextGen Campus Leaders Program',
  description: 'Become a Creator. Build a Community. Lead from your campus with USTART NextGen Campus Leaders Program.',
};

export default function Page() {
  return <CampusPage />;
}
