import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { ScrollReveal } from '@/components/ScrollReveal';
import { RouteLoader } from '@/components/RouteLoader';
import { JsonLd } from '@/components/JsonLd';
import {
  graph,
  organizationSchema,
  websiteSchema,
  deliveryServiceSchema,
  mobileAppSchemas,
} from '@/lib/schema';
import { SITE_NAME, SITE_URL } from '@/constants';
import '../index.css';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  // Required for canonical / Open Graph URLs to resolve to absolute addresses.
  // Without it Next emits relative og:url values, which crawlers cannot follow.
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'USTART — Food Delivery in Delhi NCR | No Hidden Charges',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Order food across Delhi NCR — Gurugram, Delhi, Noida, Ghaziabad & Greater Noida — at real menu prices. No surge pricing, no hidden checkout fees.',
  applicationName: SITE_NAME,
  referrer: 'origin-when-cross-origin',
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false, address: false, email: false },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={manrope.variable}>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla's
          cz-shortcut-listen) add attributes to <body> before React hydrates.
          Applies to this element's own attributes only, not its children. */}
      <body className={`${manrope.className} antialiased`} suppressHydrationWarning>
        {/* Site-wide entity graph. Page-level nodes (Article, FAQPage,
            BreadcrumbList) reference these by @id rather than redeclaring them. */}
        <JsonLd
          data={graph(
            organizationSchema(),
            websiteSchema(),
            deliveryServiceSchema(),
            mobileAppSchemas()
          )}
        />
        <ScrollReveal />
        {children}
        {/* Food loader overlay while a city / restaurant / brand page loads. */}
        <RouteLoader />
      </body>
    </html>
  );
}
