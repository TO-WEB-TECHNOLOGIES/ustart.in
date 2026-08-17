import type { Metadata } from 'next';
import { CareersPage } from '@/views/CareersPage';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Be a part of our team. Explore career opportunities at USTART.',
};

export default function Page() {
  return <CareersPage />;
}
