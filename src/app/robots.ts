import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants';

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
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
