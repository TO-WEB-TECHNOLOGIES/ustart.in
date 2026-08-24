import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
      {
        // Legacy URL from the pre-Next site; Google still crawled it in Mar 2026
        // and reported a 404. The pricing-intent page is the hidden-charges page.
        source: '/pricing',
        destination: '/food-delivery-without-hidden-charges',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.ustart.in' }],
        destination: 'https://ustart.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
