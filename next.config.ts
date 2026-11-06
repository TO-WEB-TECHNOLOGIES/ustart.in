import fs from 'node:fs';
import path from 'node:path';
import type { NextConfig } from 'next';

/**
 * Outlet pages that disappeared from the partner snapshot (delisted or renamed)
 * 301 to their city list instead of 404ing. Maintained by
 * scripts/restaurants/build_data.py.
 */
const restaurantRedirects: Array<{ source: string; destination: string }> = (() => {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'src/data/restaurants/redirects.json'), 'utf8')
    );
  } catch {
    return [];
  }
})();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Restaurant pages render on demand (ISR) and read the small restaurant index
  // from disk at runtime, so make sure it is traced into the server bundle.
  outputFileTracingIncludes: {
    '/restaurants/**': ['./src/data/restaurants/*.json'],
    '/brands/**': ['./src/data/restaurants/*.json'],
    '/api/menu': ['./src/data/restaurants/*.json'],
  },
  allowedDevOrigins: [
    '10.5.63.214',
    '10.5.63.214:3000',
    'localhost',
    'localhost:3000',
    '127.0.0.1',
    '127.0.0.1:3000',
    '*.local',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  /**
   * Canonical host enforcement. The site currently answers on both ustart.in and
   * www.ustart.in, which means every page exists at two URLs and they compete with
   * each other. The sitemap and every canonical tag point at the apex, so www must
   * redirect there permanently — otherwise the sitemap advertises URLs that differ
   * from the host visitors actually land on.
   *
   * Many hosts (Vercel, Cloudflare, Netlify) can do this at the edge more cheaply
   * than Next can. If yours already redirects www → apex, this block is redundant
   * and can be removed — but verify the edge rule exists before deleting it.
   */
  async redirects() {
    return [
      ...restaurantRedirects.map((r) => ({ ...r, permanent: true })),
      {
        // Legacy URL from the pre-Next site; Google still crawled it in Mar 2026
        // and reported a 404. The pricing-intent page is the hidden-charges page.
        source: '/pricing',
        destination: '/food-delivery-without-hidden-charges',
        permanent: true,
      },
      {
        // /.well-known/* is excluded: Apple Pay domain verification rejects any 3xx,
        // so the association file must answer 200 on www as well as the apex.
        source: '/:path((?!\\.well-known/).*)',
        has: [{ type: 'host', value: 'www.ustart.in' }],
        destination: 'https://ustart.in/:path',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        // Extensionless file would otherwise be served as application/octet-stream;
        // Apple requires text/plain.
        source: '/.well-known/apple-developer-merchantid-domain-association',
        headers: [
          { key: 'Content-Type', value: 'text/plain' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
    ];
  },
};

export default nextConfig;
