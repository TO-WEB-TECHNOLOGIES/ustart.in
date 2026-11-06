import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants';
import { cities } from '@/content/locations';
import { restaurants, isIndexed, restaurantPath, SNAPSHOT_DATE } from '@/lib/restaurants';

/**
 * One sitemap per city: /restaurants/sitemap/{city}.xml. Only outlets that are
 * indexable (and, during rollout phase A, not chain outlets) are listed — a
 * sitemap full of noindex URLs is a contradiction Google reports as an error.
 * lastModified is the data snapshot date, never the build time.
 */
/**
 * Next writes image URLs into the XML verbatim, so a raw `&` breaks the whole
 * file — escape it. Google search thumbnails (encrypted-tbn*.gstatic.com) are
 * hotlinked previews, not the outlet's own photo, so they are left out.
 */
function sitemapImage(url: string | null): string | null {
  if (!url || /^https:\/\/encrypted-tbn\d\.gstatic\.com\//.test(url)) return null;
  return url.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function generateSitemaps() {
  return cities.map((c) => ({ id: c.slug }));
}

export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const city = await props.id;
  return restaurants
    .filter((r) => r.city === city && isIndexed(r))
    .map((r) => ({
      url: `${SITE_URL}${restaurantPath(r)}`,
      lastModified: SNAPSHOT_DATE,
      // Image sitemap extension: the outlet's photo, so it can surface in Google Images.
      ...(sitemapImage(r.image) ? { images: [sitemapImage(r.image)!] } : {}),
    }));
}
