import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants';
import { cities } from '@/content/locations';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // API routes carry no indexable content. /_next/static must stay
        // crawlable: Google fetches the JS/CSS chunks to render pages.
        disallow: ['/api/'],
      },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      // Per-city restaurant sitemaps (src/app/restaurants/sitemap.ts).
      ...cities.map((city) => `${SITE_URL}/restaurants/sitemap/${city.slug}.xml`),
    ],
    host: SITE_URL,
  };
}
