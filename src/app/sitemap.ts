import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants';
import { articles } from '@/content/blog';
import { cities } from '@/content/locations';
import { cuisines } from '@/content/cuisines';

/**
 * Sitemap for ustart.in — served at /sitemap.xml and declared in robots.ts.
 *
 * Two deliberate omissions:
 *
 * 1. No <priority> or <changefreq>. Google ignores both outright; emitting them
 *    adds bytes and implies a signal that does not exist.
 *
 * 2. No `new Date()` anywhere. Every lastModified traces to an `updatedAt` field
 *    on a content record or to the ROUTE_UPDATED map below. Deriving lastmod from
 *    build time makes every URL look freshly modified on every deploy, which is
 *    precisely how a site teaches Google to stop trusting its lastmod values —
 *    Google only honours the signal while it stays verifiably accurate.
 *
 * /nextgen-campus-leaders is intentionally excluded: it is orphaned (linked only
 * from commented-out JSX), and an unlinked URL in a sitemap is a weak signal.
 * Link it from the footer first, then add it here.
 */

/**
 * Last significant content change per static route. Update the date by hand when
 * you materially change a page — not for typo or styling edits.
 */
const ROUTE_UPDATED: Record<string, string> = {
  '/': '2026-08-18',
  '/about': '2026-08-18',
  '/blog': '2026-08-18',
  '/careers': '2026-08-18',
  '/contact': '2026-08-18',
  '/elite': '2026-08-18',
  '/late-night-food-delivery': '2026-08-18',
  '/office-lunch-delivery': '2026-08-18',
  '/food-delivery-without-hidden-charges': '2026-08-18',
  '/delete-account': '2026-09-05',
  // Legal copy is dated "January 2026" in the page itself; keep this in step with
  // the document's own revision date rather than the deploy date.
  '/terms': '2026-01-19',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = Object.entries(ROUTE_UPDATED).map(([path, updated]) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: updated,
  }));

  const blogRoutes = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.id}`,
    lastModified: article.updatedAt,
  }));

  const cityRoutes = cities.map((city) => ({
    url: `${SITE_URL}/food-delivery/${city.slug}`,
    lastModified: city.updatedAt,
  }));

  const localityRoutes = cities.flatMap((city) =>
    city.localities.map((locality) => ({
      url: `${SITE_URL}/food-delivery/${city.slug}/${locality.slug}`,
      lastModified: locality.updatedAt,
    }))
  );

  const cuisineRoutes = cuisines.map((cuisine) => ({
    url: `${SITE_URL}/order/${cuisine.slug}`,
    lastModified: cuisine.updatedAt,
  }));

  return [...staticRoutes, ...blogRoutes, ...cityRoutes, ...localityRoutes, ...cuisineRoutes];
}
