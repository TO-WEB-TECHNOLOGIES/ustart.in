import type { MetadataRoute } from 'next';
import { SITE_NAME } from '@/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME}: Food Delivery in Delhi NCR`,
    short_name: SITE_NAME,
    description:
      'Order food across Delhi NCR at real menu prices. No surge pricing, no hidden checkout fees, live order tracking.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f2038',
    theme_color: '#0f2038',
    lang: 'en-IN',
    categories: ['food', 'shopping', 'lifestyle'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
