import type { Metadata } from 'next';
import { AboutPage } from '@/views/AboutPage';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'The people behind your next meal. Learn about USTART story, founders, and mission.',
};

export default function Page() {
  return <AboutPage />;
}
