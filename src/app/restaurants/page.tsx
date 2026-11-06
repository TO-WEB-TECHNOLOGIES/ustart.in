import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { RestaurantsOverview } from '@/views/RestaurantLists';
import { graph, breadcrumbSchema } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';
import { restaurants } from '@/lib/restaurants';

const total = restaurants.length.toLocaleString('en-IN');

export const metadata: Metadata = buildMetadata({
  title: `Restaurants in Delhi NCR — ${total} Menus on USTART`,
  description: `Browse ${total} restaurants across Delhi, Gurugram, Noida, Ghaziabad and Greater Noida. Full menus with prices, no surge pricing, no hidden charges.`,
  path: '/restaurants',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Restaurants', path: '/restaurants' },
          ])
        )}
      />
      <RestaurantsOverview />
    </>
  );
}
