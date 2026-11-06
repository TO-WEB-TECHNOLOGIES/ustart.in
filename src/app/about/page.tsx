import { AboutPage } from '@/views/AboutPage';
import { buildMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { graph, breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  title: 'About Us: Fair Food Delivery in Delhi NCR',
  description:
    'USTART builds the tech, marketplace and logistics behind fair food delivery across Delhi NCR. Meet the founders and the reason menu-price parity matters.',
  path: '/about',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
          ])
        )}
      />
      <AboutPage />
    </>
  );
}
