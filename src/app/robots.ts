import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants';
import { cities } from '@/content/locations';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Next internals and API routes carry no indexable content.
        disallow: ['/api/', '/_next/static/chunks/'],
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
