'use client';

import React from 'react';
import { Link } from '../router';
import { PLAY_STORE_URL, APP_STORE_URL, PARTNER_URL, SOCIAL_LINKS } from '../constants';
import { FacebookIcon, InstagramIcon, LinkedInIcon, GooglePlayIcon, AppleIcon } from './Icons';

/**
 * This used to be a single run-on string of keywords ("Food delivery in Gurugram ·
 * No hidden charges food delivery · ..."). Keyword-stuffed prose with no links is a
 * spam signal and passes no equity. Now that each of those terms has a real page,
 * they are links — which both helps users and distributes crawl depth to the
 * locality and intent pages that have few other inbound links.
 */
const FOOTER_SEO_LINKS: Array<{ label: string; to: string }> = [
  { label: 'Food delivery in Gurgaon', to: '/food-delivery/gurgaon' },
  { label: 'Food delivery in Delhi', to: '/food-delivery/delhi' },
  { label: 'Food delivery in Cyber City', to: '/food-delivery/gurgaon/cyber-city' },
  { label: 'No hidden charges food delivery', to: '/food-delivery-without-hidden-charges' },
  { label: 'Late night food delivery', to: '/late-night-food-delivery' },
  { label: 'Office lunch delivery', to: '/office-lunch-delivery' },
  { label: 'Biryani delivery', to: '/order/biryani' },
  { label: 'Pizza delivery', to: '/order/pizza' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" style={{ overflow: 'hidden' }}>
      {/* doodle: burger outline, light stroke for navy footer */}
      <svg className="doodle" style={{ top: '8%', right: '4%', width: '46px', opacity: '0.12' }} viewBox="0 0 64 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 18 Q6 6 32 6 Q58 6 58 18 Z" stroke="var(--peach)" strokeWidth="2" fill="none"/>
        <path d="M6 24 L58 24" stroke="var(--orange)" strokeWidth="2.4" strokeLinecap="round"/>
        <path d="M6 38 L58 38 Q58 46 32 46 Q6 46 6 38Z" stroke="var(--peach)" strokeWidth="2" fill="none"/>
      </svg>
      <div className="footer-row">
        <div className="footer-brand">
          <img src="/Logo_White_Text.png" alt="USTART" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <div className="tag">Fairness That Never Tasted <span>Better.</span></div>
          <p>Made for food lovers. Built for local restaurants.</p>
        </div>
        <div className="footer-cols">
          <div className="col">
            <h5>COMPANY</h5>
            <Link to="/about">About</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/nextgen-campus-leaders">Campus Leaders</Link>
          </div>
          <div className="col">
            <h5>FOR PARTNERS</h5>
            {/* Cross-origin links must be plain anchors: the router treats
                the partner URL as a pathname and would fall through to the 404 case. */}
            <a href={PARTNER_URL}>Partner Your Restaurant</a>
            <Link to="/careers">Become a Delivery Partner</Link>
          </div>
          <div className="col">
            <h5>ORDER</h5>
            <Link to="/food-delivery/gurgaon">Food Delivery in Gurgaon</Link>
            <Link to="/food-delivery/delhi">Food Delivery in Delhi</Link>
            <Link to="/late-night-food-delivery">Late Night Delivery</Link>
            <Link to="/office-lunch-delivery">Office Lunch Delivery</Link>
            <Link to="/elite">USTART Elite</Link>
          </div>
          <div className="col">
            <h5>SUPPORT</h5>
            <Link to="/contact">Help Centre</Link>
            {/* <Link to="/food-delivery-without-hidden-charges">Our Pricing</Link> */}
            <a href="/#faq">FAQs</a>
          </div>
          <div className="col">
            <h5>LEGAL</h5>
            {/* All three are sections of the single /terms document — the anchor ids
                come from src/app/terms/users/*.tsx. Deep-linking beats three separate
                thin pages, and it matches how the live site linked privacy. */}
            <Link to="/terms">Terms of Service</Link>
            <Link to="/terms#privacy-data-protection">Privacy Policy</Link>
            <Link to="/terms#cancellations-refunds">Refunds &amp; Cancellations</Link>
            {/* Google Play requires the account-deletion URL to be reachable from
                the site; the reference project links it from the footer too. */}
            <Link to="/delete-account">Account Deletion</Link>
          </div>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-apps-social">
        <div className="footer-store-btns">
          <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="footer-store-btn">
            <span className="fi"><GooglePlayIcon /></span>
            <span className="ft"><small>GET IT ON</small><strong>Google Play</strong></span>
          </a>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="footer-store-btn">
            <span className="fi"><AppleIcon /></span>
            <span className="ft"><small>DOWNLOAD ON THE</small><strong>App Store</strong></span>
          </a>
        </div>
        {/* These must stay in sync with Organization.sameAs in src/lib/schema.ts —
            Google cross-checks the profiles a site links to against the ones it
            claims in structured data. No X/Twitter link: there is no live profile. */}
        <div className="footer-social">
          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="USTART on Facebook">
            <FacebookIcon />
          </a>
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="USTART on Instagram">
            <InstagramIcon />
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="USTART on LinkedIn">
            <LinkedInIcon />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 USTART. All rights reserved. · Proudly serving Gurugram &amp; Delhi.</span>
        <span className="seo-line">
          {FOOTER_SEO_LINKS.map(({ label, to }, idx) => (
            <React.Fragment key={to}>
              {idx > 0 && ' · '}
              <Link to={to}>{label}</Link>
            </React.Fragment>
          ))}
        </span>
      </div>
    </footer>
  );
};
