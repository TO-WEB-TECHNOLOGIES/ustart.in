/**
 * Server-only access to the restaurant index in src/data/restaurants/, built by
 * scripts/restaurants/build_data.py from the partner sheet.
 *
 * The index holds only restaurant-level facts (name, area, hours, cuisines…).
 * Menus are fetched per page from the catalog API — see src/lib/catalog.ts.
 *
 * Never import this module from a 'use client' file: it reads from disk.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { WeekHours } from '@/lib/hours';
import type { CardData } from '@/components/restaurant/RestaurantCard';
import { getCuisine } from '@/content/cuisines';

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'restaurants');
const readJson = <T,>(name: string): T => JSON.parse(fs.readFileSync(path.join(DATA_DIR, name), 'utf8')) as T;

/**
 * Chain outlets (McDonald's, KFC, Pizza Hut…) are indexable. Each outlet page is
 * distinct by location (area, address, map, hours, nearby restaurants), and these
 * are the brand + area searches people actually make ("McDonald's Millennium City
 * Centre Gurugram"). Set to false to put every chain outlet back to noindex.
 */
export const INDEX_CHAIN_OUTLETS = true;

export interface Restaurant {
  /** ONDC provider id — used with bppId for the catalog API. */
  id: string;
  /** ONDC seller app (BPP) subscriber id. */
  bppId: string;
  slug: string;
  name: string;
  brandSlug: string | null;
  city: string;
  localityName: string | null;
  /** "city/locality-slug" of an editorial locality page, when one matches. */
  localityRef: string | null;
  address: string;
  pincode: string | null;
  lat: number;
  lon: number;
  vegType: string | null;
  cuisines: string[];
  /** The menu's own section names (from the catalog API at index time). */
  menuSections: string[];
  /** Dish count from the catalog API at index time; null if the API was skipped. */
  itemCount: number | null;
  /** ONDC day (1 = Monday) → order windows; see src/lib/hours.ts for the shape. */
  hours: WeekHours;
  lateNight: boolean;
  fssai: string | null;
  partnerSince: string | null;
  image: string | null;
  description: string | null;
  chain: boolean;
  indexable: boolean;
  /** Slugs of the six nearest indexable outlets in the same city. */
  nearby: string[];
}

export interface Brand {
  slug: string;
  name: string;
  /** Outlet slugs. */
  outlets: string[];
}

// Read from disk rather than `import`ed: TypeScript would otherwise infer a type
// for a multi-MB JSON literal on every type-check.
const snapshot = readJson<{ snapshot: string; restaurants: Restaurant[] }>('restaurants.json');

export const SNAPSHOT_DATE = snapshot.snapshot;
export const restaurants: Restaurant[] = snapshot.restaurants;
export const brands: Brand[] = readJson<Brand[]>('brands.json');

const bySlug = new Map(restaurants.map((r) => [r.slug, r]));
const byPath = new Map(restaurants.map((r) => [`${r.city}/${r.slug}`, r]));
const brandBySlug = new Map(brands.map((b) => [b.slug, b]));

export const getRestaurant = (city: string, slug: string) => byPath.get(`${city}/${slug}`);
/** Slugs are unique across all cities. */
export const getRestaurantBySlug = (slug: string) => bySlug.get(slug);
export const getBrand = (slug: string) => brandBySlug.get(slug);

export const restaurantPath = (r: Pick<Restaurant, 'city' | 'slug'>) => `/restaurants/${r.city}/${r.slug}`;

/** Whether the outlet page should be indexed, including the chain rollout gate. */
export const isIndexed = (r: Restaurant) => r.indexable && (!r.chain || INDEX_CHAIN_OUTLETS);

/**
 * A brand page is worth indexing only if at least one of its outlets has a real
 * menu — otherwise it is a list of empty pages (24 brands today, mostly outlets
 * whose catalog the API returns empty).
 */
export const isBrandIndexed = (b: Brand) =>
  b.outlets.some((slug) => (bySlug.get(slug)?.itemCount ?? 0) >= 10);

/** Google Maps pin for the outlet (also used as schema.org hasMap). */
export const mapUrl = (r: Pick<Restaurant, 'lat' | 'lon'>) =>
  `https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lon}`;

/**
 * Turn-by-turn route from the visitor's current location to the outlet. With no
 * origin, Google Maps uses the device location; on phones this universal link
 * opens the Maps app straight into navigation preview.
 */
export const directionsUrl = (r: Pick<Restaurant, 'lat' | 'lon'>) =>
  `https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lon}&travelmode=driving`;

export const restaurantsInCity = (city: string) => restaurants.filter((r) => r.city === city);

export const restaurantsInLocality = (city: string, localitySlug: string) =>
  restaurants.filter((r) => r.localityRef === `${city}/${localitySlug}`);

export const restaurantsByCuisine = (cuisineSlug: string) =>
  restaurants.filter((r) => r.cuisines.includes(cuisineSlug));


export const formatInr = (n: number) =>
  `₹${n.toLocaleString('en-IN', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;

export const slugToTitle = (slug: string) =>
  slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/** Compact card data for lists (city, brand, nearby). Cuisine names resolved here, on the server. */
export function toCard(r: Restaurant): CardData {
  return {
    slug: r.slug,
    path: restaurantPath(r),
    name: r.name,
    area: r.localityName ?? '',
    cuisines: r.cuisines
      .map((c) => getCuisine(c)?.name)
      .filter(Boolean)
      .slice(0, 2)
      .join(', '),
    pureVeg: r.vegType === 'Pure Veg',
    late: r.lateNight,
    img: r.image,
  };
}
