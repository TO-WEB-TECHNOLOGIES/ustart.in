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
  absoluteUrl,
} from '@/constants';

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
    url: absoluteUrl('/Logo_White_Text.png'),
  },
  description:
    'USTART is a food delivery platform serving Gurugram and Delhi with menu-price parity, no surge pricing and no hidden checkout fees.',
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
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-IN',
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
  areaServed: [
    { '@type': 'City', name: 'Gurugram', address: { '@type': 'PostalAddress', addressRegion: 'Haryana', addressCountry: 'IN' } },
    { '@type': 'City', name: 'Delhi', address: { '@type': 'PostalAddress', addressRegion: 'Delhi', addressCountry: 'IN' } },
  ],
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
 * object below — and make sure the same figures are visible in the page copy:
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
 * 7 May 2026. This markup is still worth emitting — it helps entity extraction
 * and AI-search surfaces — but it will not render an accordion in Search, so do
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
