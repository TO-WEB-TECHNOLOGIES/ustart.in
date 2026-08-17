import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { ScrollReveal } from '@/components/ScrollReveal';
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
  title: {
    default: 'USTART — Fresh, Fair & Foodie-First | Gurugram Food Delivery',
    template: '%s | USTART',
  },
  description: 'Order your favourite food in Gurugram with transparent pricing and lightning-fast delivery — zero hidden fees.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className={`${manrope.className} antialiased`}>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
