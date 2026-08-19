import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/constants';

export interface PageSeo {
  title: string;
  description: string;
  /** Root-relative path, e.g. "/blog/how-delivery-fees-work". Becomes the canonical. */
  path: string;
  /** Set for article pages so Open Graph declares og:type=article. */
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  /** Keep pages out of the index (e.g. thin utility pages). Default: indexable. */
  noindex?: boolean;
}

/**
 * Single source of truth for per-page metadata. Every page gets an explicit
 * self-referencing canonical — without one, query-string and trailing-slash
 * variants of the same page compete with each other for the same rankings.
 *
 * `title` is passed as a plain string so the root layout's '%s | USTART'
 * template applies. Pass an absolute title only if you need to bypass it.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  modifiedTime,
  noindex = false,
}: PageSeo): Metadata {
  const canonical = path === '/' ? '/' : path;
  const url = `${SITE_URL}${path === '/' ? '' : path}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: 'en_IN',
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
