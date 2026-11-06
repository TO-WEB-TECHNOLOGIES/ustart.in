/**
 * JSON-LD builders. Every @id is a stable absolute URI so the graph nodes can
 * reference each other instead of being re-declared on every page.
 */

import {
  SITE_URL,
  SITE_NAME,
  LEGAL_ENTITY,
  SUPPORT_EMAIL,
  SOCIAL_LINKS,
  PLAY_STORE_URL,
  APP_STORE_URL,
  APP_DOWNLOAD_URL,
  absoluteUrl,
} from '@/constants';
import { cities, type City } from '@/content/locations';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  legalName: LEGAL_ENTITY,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl('/icon-512.png'),
  },
  description:
    'USTART is a food delivery platform serving Delhi NCR (Gurugram, Delhi, Noida, Ghaziabad and Greater Noida) with menu-price parity, no surge pricing and no hidden checkout fees.',
  parentOrganization: {
    '@type': 'Organization',
    name: LEGAL_ENTITY,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gurugram',
    addressRegion: 'Haryana',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SUPPORT_EMAIL,
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  ],
  sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  // Google picks the search-result site name from this node on the home page.
  // alternateName is its fallback if it does not accept `name`.
  name: SITE_NAME,
  alternateName: ['USTART Food Delivery', 'USTART App'],
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-IN',
});

const NCR_ID = `${SITE_URL}/#ncr`;

/** The National Capital Region - the parent place every served city sits inside. */
const NCR_PLACE = {
  '@type': 'AdministrativeArea',
  '@id': NCR_ID,
  name: 'National Capital Region',
  alternateName: 'Delhi NCR',
  address: { '@type': 'PostalAddress', addressCountry: 'IN' },
};

const cityPlace = (city: City) => ({
  '@type': 'City',
  name: city.officialName,
  ...(city.officialName !== city.name ? { alternateName: city.name } : {}),
  address: { '@type': 'PostalAddress', addressRegion: city.state, addressCountry: 'IN' },
  containedInPlace: { '@id': NCR_ID },
});

/**
 * The delivery service itself. `Service` + `areaServed` is a more accurate
 * description than LocalBusiness: per the About page, USTART "doesn't own
 * restaurants or cook the food" and has no customer-facing storefront, so
 * LocalBusiness (which implies a visitable place) would be a misrepresentation.
 */
export const deliveryServiceSchema = () => ({
  '@type': 'Service',
  '@id': `${SITE_URL}/#service`,
  name: 'USTART Food Delivery',
  serviceType: 'Food delivery',
  provider: { '@id': ORG_ID },
  // Derived from the city list so a new city can never be live on the site but
  // missing from the entity graph (or vice versa).
  areaServed: [NCR_PLACE, ...cities.map(cityPlace)],
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: SITE_URL,
    availableLanguage: ['en', 'hi'],
  },
});

/**
 * App listings.
 *
 * ── aggregateRating is deliberately ABSENT ───────────────────────────────────
 * The homepage displays "4.8★ RATING" and "200+ DOWNLOADS", but the App Store
 * listing (id6780561961) shows 5.0 from only 2 ratings, and the Play Store figure
 * has not been confirmed from Play Console. Publishing an AggregateRating whose
 * ratingCount is not genuine, verifiable and visible on the page is a direct
 * violation of Google's structured-data policy and risks a manual action that
 * causes ALL structured data on the affected pages to be ignored.
 *
 * To enable once you have a real Play Console rating count, add to the Android
 * object below - and make sure the same figures are visible in the page copy:
 *
 *   aggregateRating: {
 *     '@type': 'AggregateRating',
 *     ratingValue: '<real average>',
 *     ratingCount: <real count>,
 *     bestRating: '5',
 *     worstRating: '1',
 *   }
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const mobileAppSchemas = () => [
  {
    '@type': 'MobileApplication',
    '@id': `${SITE_URL}/#app-android`,
    name: 'USTART: Food Delivery App',
    operatingSystem: 'ANDROID',
    applicationCategory: 'FoodAndDrinkApplication',
    installUrl: PLAY_STORE_URL,
    publisher: { '@id': ORG_ID },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  },
  {
    '@type': 'MobileApplication',
    '@id': `${SITE_URL}/#app-ios`,
    name: 'USTART: Food Delivery App',
    operatingSystem: 'IOS',
    applicationCategory: 'FoodAndDrinkApplication',
    installUrl: APP_STORE_URL,
    publisher: { '@id': ORG_ID },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  },
];

/**
 * Per-city service node for /food-delivery/[city]. Scopes the site-wide service
 * to one city so the page carries an explicit "food delivery in {city}" entity.
 */
export const cityServiceSchema = (city: City) => ({
  '@type': 'Service',
  '@id': `${absoluteUrl(`/food-delivery/${city.slug}`)}/#service`,
  name: `USTART Food Delivery in ${city.name}`,
  serviceType: 'Food delivery',
  url: absoluteUrl(`/food-delivery/${city.slug}`),
  provider: { '@id': ORG_ID },
  isRelatedTo: { '@id': `${SITE_URL}/#service` },
  areaServed: cityPlace(city),
});

/** ItemList of the city hubs, for the /food-delivery Delhi NCR page. */
export const cityListSchema = () => ({
  '@type': 'ItemList',
  name: 'USTART food delivery cities in Delhi NCR',
  itemListElement: cities.map((city, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: `Food Delivery in ${city.name}`,
    url: absoluteUrl(`/food-delivery/${city.slug}`),
  })),
});

export interface Crumb {
  name: string;
  path: string;
}

export const breadcrumbSchema = (crumbs: Crumb[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: absoluteUrl(crumb.path),
  })),
});

/**
 * NOTE: Google turned off FAQ rich results for the vast majority of sites on
 * 7 May 2026. This markup is still worth emitting - it helps entity extraction
 * and AI-search surfaces - but it will not render an accordion in Search, so do
 * not forecast CTR gains from it.
 */
export const faqSchema = (faqs: Array<{ q: string; a: string }>) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

export const articleSchema = (article: {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
}) => ({
  '@type': 'BlogPosting',
  '@id': `${absoluteUrl(`/blog/${article.id}`)}/#article`,
  headline: article.title,
  description: article.description,
  datePublished: article.publishedAt,
  dateModified: article.updatedAt,
  inLanguage: 'en-IN',
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
  isPartOf: { '@id': WEBSITE_ID },
  mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/blog/${article.id}`) },
});

/** Wraps nodes into a single @graph so one script tag carries the whole page. */
export const graph = (...nodes: Array<object | object[]>) => ({
  '@context': 'https://schema.org',
  '@graph': nodes.flat(),
});

/* ── Restaurant pages ─────────────────────────────────────────────────────── */

interface RestaurantForSchema {
  name: string;
  city: string;
  slug: string;
  address: string;
  pincode: string | null;
  localityName: string | null;
  lat: number;
  lon: number;
  image: string | null;
  hours: Record<string, Array<[string, string]>>;
}

/** Structural subset of the fetched menu (src/lib/catalog.ts) the schema needs. */
interface MenuForSchema {
  groups: Array<{ title: string; dishes: Array<{ name: string; price: number; inStock: boolean; veg: boolean | null; description: string | null }> }>;
}

const SCHEMA_DAYS: Record<string, string> = {
  '1': 'Monday', '2': 'Tuesday', '3': 'Wednesday', '4': 'Thursday',
  '5': 'Friday', '6': 'Saturday', '7': 'Sunday',
};

const CITY_REGION: Record<string, { locality: string; region: string }> = {
  delhi: { locality: 'New Delhi', region: 'Delhi' },
  gurgaon: { locality: 'Gurugram', region: 'Haryana' },
  noida: { locality: 'Noida', region: 'Uttar Pradesh' },
  ghaziabad: { locality: 'Ghaziabad', region: 'Uttar Pradesh' },
  'greater-noida': { locality: 'Greater Noida', region: 'Uttar Pradesh' },
};

/**
 * Structured data carries a representative sample of the menu, not all of it:
 * the visible page lists every dish, and hundreds of MenuItems in JSON-LD (which
 * App Router serialises a second time into the RSC payload) only add weight.
 */
const MENU_SCHEMA_ITEMS = 60;

function sampleMenu(menu: MenuForSchema) {
  // Round-robin across sections so every section is represented; in-stock only.
  // In stock and with a real price - customisable dishes report 0 until options are chosen.
  const queues = menu.groups.map((g) => ({ title: g.title, dishes: g.dishes.filter((d) => d.inStock && d.price > 0) }));
  const picked = new Map<string, MenuForSchema['groups'][number]['dishes']>();
  let left = MENU_SCHEMA_ITEMS;
  for (let i = 0; left > 0; i++) {
    let any = false;
    for (const q of queues) {
      if (left === 0) break;
      const dish = q.dishes[i];
      if (!dish) continue;
      any = true;
      left--;
      picked.set(q.title, [...(picked.get(q.title) ?? []), dish]);
    }
    if (!any) break;
  }
  return [...picked.entries()];
}

/**
 * One partner outlet. No aggregateRating: there is no review data, and a rating
 * not visible on the page would breach Google's structured-data policy. Menu
 * prices come straight from the catalog API at render time.
 */
export const restaurantSchema = (
  r: RestaurantForSchema,
  menu: MenuForSchema | null,
  opts: { cuisineNames: string[]; brandName?: string }
) => {
  const url = absoluteUrl(`/restaurants/${r.city}/${r.slug}`);
  const region = CITY_REGION[r.city];
  return {
    '@type': 'Restaurant',
    '@id': `${url}/#restaurant`,
    name: r.name,
    url,
    ...(r.image ? { image: r.image } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: r.address,
      addressLocality: r.localityName ? `${r.localityName}, ${region.locality}` : region.locality,
      addressRegion: region.region,
      ...(r.pincode ? { postalCode: r.pincode } : {}),
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: r.lat, longitude: r.lon },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${r.lat},${r.lon}`,
    ...(opts.cuisineNames.length ? { servesCuisine: opts.cuisineNames } : {}),
    currenciesAccepted: 'INR',
    // A window that closes "earlier" than it opens runs past midnight, which
    // schema.org expresses exactly that way; an all-day window is 00:00–23:59.
    openingHoursSpecification: Object.entries(r.hours).flatMap(([day, windows]) =>
      windows.map(([opens, closes]) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${SCHEMA_DAYS[day]}`,
        opens,
        closes: closes === '24:00' ? '23:59' : closes,
      }))
    ),
    ...(opts.brandName ? { brand: { '@type': 'Brand', name: opts.brandName } } : {}),
    ...(menu && menu.groups.length
      ? {
          hasMenu: {
            '@type': 'Menu',
            '@id': `${url}/#menu`,
            hasMenuSection: sampleMenu(menu).map(([title, dishes]) => ({
              '@type': 'MenuSection',
              name: title,
              hasMenuItem: dishes.map((d) => ({
                '@type': 'MenuItem',
                name: d.name,
                ...(d.veg ? { suitableForDiet: 'https://schema.org/VegetarianDiet' } : {}),
                offers: { '@type': 'Offer', price: d.price.toFixed(2), priceCurrency: 'INR' },
              })),
            })),
          },
        }
      : {}),
    potentialAction: {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: APP_DOWNLOAD_URL,
        actionPlatform: ['https://schema.org/AndroidPlatform', 'https://schema.org/IOSPlatform'],
      },
    },
  };
};

/** ItemList of outlet pages (city lists, brand pages, locality lists). */
export const restaurantListSchema = (
  name: string,
  items: Array<{ name: string; path: string }>
) => ({
  '@type': 'ItemList',
  name,
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    url: absoluteUrl(item.path),
  })),
});
