import type { Metadata } from 'next';
import { BlogPage } from '@/views/BlogPage';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Stories, updates, and deep dives on food delivery transparency and tech from USTART.',
};

export default function Page() {
  return <BlogPage />;
}
