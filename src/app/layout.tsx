import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { ScrollReveal } from '@/components/ScrollReveal';
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
    default: 'USTART — Food Delivery in Gurgaon & Delhi | No Hidden Charges',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Order food in Gurgaon and Delhi at real menu prices. No surge pricing, no hidden checkout fees, live order tracking. Download the USTART app.',
  applicationName: SITE_NAME,
  referrer: 'origin-when-cross-origin',
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false, address: false, email: false },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/icon.png',
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
      <body className={`${manrope.className} antialiased`}>
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
      </body>
    </html>
  );
}
