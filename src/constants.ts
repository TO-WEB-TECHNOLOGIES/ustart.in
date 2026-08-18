export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=in.toweb.ustart.users';

// India storefront only. The /us/ path 404s — the app is not published to the
// US store, so a /us/ link is a dead end for both users and crawlers.
export const APP_STORE_URL = 'https://apps.apple.com/in/app/id6780561961';

/**
 * Canonical origin. Every absolute URL the site emits — canonicals, Open Graph,
 * JSON-LD @id values, sitemap <loc> entries — is built from this. The apex is
 * canonical; www must 301 here (see next.config.ts) or the sitemap will contain
 * URLs that redirect, which Google treats as a soft error.
 */
export const SITE_URL = 'https://ustart.in';

export const SITE_NAME = 'USTART';
export const LEGAL_ENTITY = 'Toweb Technology Private Limited';

export const SUPPORT_EMAIL = 'support@ustart.app';
export const PARTNERS_EMAIL = 'partners@ustart.app';

export const PARTNER_URL = 'https://partners.ustart.in/';
export const APP_DOWNLOAD_URL = 'https://store.ustart.in';

/** Verified live profiles — used for Organization.sameAs. */
export const SOCIAL_LINKS = {
  linkedin: 'https://in.linkedin.com/company/ustartin',
  instagram: 'https://www.instagram.com/ustart.in',
  facebook: 'https://www.facebook.com/profile.php?id=61572376997840',
} as const;

/** Absolute URL helper. Pass a root-relative path, get a canonical absolute URL. */
export const absoluteUrl = (path = '/') =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`.replace(/\/$/, '') || SITE_URL;
