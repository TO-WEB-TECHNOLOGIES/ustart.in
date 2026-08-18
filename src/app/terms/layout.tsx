import React from 'react';
import { buildMetadata } from '@/lib/seo';
// Route-scoped: neutralises the src/index.css globals that would otherwise
// alter the byte-for-byte copy of the reference terms page. See terms.css.
import './terms.css';

/**
 * Metadata for /terms lives here rather than in page.tsx.
 *
 * page.tsx was copied across verbatim and is a `'use client'` component, which
 * cannot export `metadata` — without this layout the route silently inherited the
 * root layout's homepage title, giving the terms page a "Food Delivery in Gurgaon
 * & Delhi" title that duplicates the homepage's. A layout is the standard way to
 * attach metadata to a client page while leaving the page file untouched.
 */
export const metadata = buildMetadata({
  title: 'Terms of Service & Privacy Policy',
  description:
    'USTART platform terms, privacy and data protection, cancellations and refunds, delivery obligations and grievance officer details.',
  path: '/terms',
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
