import { AboutPage } from '@/views/AboutPage';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'About Us — Fair Food Delivery in Gurgaon & Delhi',
  description:
    'USTART builds the tech, marketplace and logistics behind fair food delivery in Gurgaon and Delhi. Meet the founders and the reason menu-price parity matters.',
  path: '/about',
});

export default function Page() {
  return <AboutPage />;
}
