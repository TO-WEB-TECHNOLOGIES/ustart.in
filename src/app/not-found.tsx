import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Link } from '@/router';

/**
 * 404 page.
 *
 * Next returns a real HTTP 404 for this route automatically, which is what actually
 * keeps it out of the index — the noindex below is belt-and-braces for the case
 * where something soft-renders this component at a 200.
 *
 * Deliberately a server component. The reference implementation was `'use client'`
 * only to run a scroll listener whose state was never read, and to inject a Font
 * Awesome stylesheet from a CDN at runtime — which blocks render, shifts layout when
 * it lands, and leaves every icon invisible until JS executes. The icons here are
 * inline SVG instead, so they are painted in the first frame with no network cost.
 */
// No `robots` directive here: Next already emits its own noindex meta tag for
// not-found, and adding a second one just duplicates it in the head.
export const metadata: Metadata = {
  title: 'Page Not Found',
};

/** Recovery paths — a 404 should always offer a way back into the site. */
const DESTINATIONS = [
  { to: '/food-delivery/gurgaon', label: 'Food delivery in Gurgaon' },
  { to: '/food-delivery/delhi', label: 'Food delivery in Delhi' },
  { to: '/order/biryani', label: 'Order biryani' },
  { to: '/blog', label: 'Read the blog' },
];

export default function NotFound() {
  return (
    <div className="nf-page">
      <Header variant="light" />

      <main className="nf-main">
        {/* Ambient wash. Purely decorative, hidden from assistive tech. */}
        <div className="nf-orb nf-orb-1" aria-hidden="true"></div>
        <div className="nf-orb nf-orb-2" aria-hidden="true"></div>

        <div className="nf-inner">
          <div className="nf-graphic">
            <span className="nf-digit">4</span>

            {/* The "0" — a donut. Inline SVG so it needs no icon font. */}
            <svg
              className="nf-donut"
              viewBox="0 0 100 100"
              role="img"
              aria-label="0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="42" fill="var(--orange)" />
              <circle cx="50" cy="50" r="16" fill="var(--paper)" />
              <g fill="var(--navy)" opacity="0.55">
                <rect x="47" y="17" width="6" height="2.6" rx="1.3" transform="rotate(28 50 18)" />
                <rect x="70" y="38" width="6" height="2.6" rx="1.3" transform="rotate(-42 73 39)" />
                <rect x="66" y="68" width="6" height="2.6" rx="1.3" transform="rotate(15 69 69)" />
                <rect x="36" y="74" width="6" height="2.6" rx="1.3" transform="rotate(-25 39 75)" />
                <rect x="20" y="52" width="6" height="2.6" rx="1.3" transform="rotate(62 23 53)" />
                <rect x="26" y="28" width="6" height="2.6" rx="1.3" transform="rotate(-12 29 29)" />
              </g>
            </svg>

            <span className="nf-digit">4</span>
          </div>

          <h1 className="nf-title">Order Not Found</h1>

          <p className="nf-copy">
            This page is off the menu. It may have been removed or renamed — or it went out for a
            delivery and never came back.
          </p>

          <div className="nf-ctas">
            <Link to="/" className="btn btn-primary">
              Go back home
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact support
            </Link>
          </div>

          <div className="nf-suggestions">
            <span className="nf-suggestions-label">Or try one of these</span>
            <div className="nf-suggestions-links">
              {DESTINATIONS.map(({ to, label }) => (
                <Link key={to} to={to}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
