import React from 'react';
import { buildMetadata } from '@/lib/seo';
// Route-scoped: neutralises the src/index.css globals that would otherwise
// alter the byte-for-byte copy of the reference page. See delete-account.css.
import './delete-account.css';

/**
 * Metadata for /delete-account lives here rather than in page.tsx.
 *
 * page.tsx was copied across verbatim from the ustart.in reference project and
 * is a `'use client'` component, which cannot export `metadata` — without this
 * layout the route would silently inherit the root layout's homepage title. A
 * layout is the standard way to attach metadata to a client page while leaving
 * the page file untouched; /terms does the same.
 *
 * Indexable on purpose. Google Play requires the account-deletion URL to be
 * publicly reachable and it is linked from the site footer, so there is no case
 * for noindex here.
 */
export const metadata = buildMetadata({
  title: 'Delete Your Account',
  description:
    'Request deletion of your USTART account. Verify your registered mobile number with an OTP and our team will process the request and contact you.',
  path: '/delete-account',
});

export default function DeleteAccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
