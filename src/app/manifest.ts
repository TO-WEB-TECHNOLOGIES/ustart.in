import type { MetadataRoute } from 'next';
import { SITE_NAME } from '@/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Food Delivery in Gurgaon & Delhi`,
    short_name: SITE_NAME,
    description:
      'Order food in Gurgaon and Delhi at real menu prices. No surge pricing, no hidden checkout fees, live order tracking.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f2038',
    theme_color: '#0f2038',
    lang: 'en-IN',
    categories: ['food', 'shopping', 'lifestyle'],
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
