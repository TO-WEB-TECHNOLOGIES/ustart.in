import React from 'react';
import { Link } from '../router';
import { PLAY_STORE_URL, APP_STORE_URL } from '../constants';

const SEO_LINE = 'Food delivery in Gurugram · No hidden charges food delivery · Late night food delivery Gurugram · Affordable food delivery · Best food delivery app Gurugram';

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
          <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 800, color: 'var(--paper)', fontSize: '1.8rem', letterSpacing: '-0.02em', marginBottom: '4px' }}>USTART</div>
          <div className="tag">Fairness That Never Tasted <span>Better.</span></div>
          <p>Made for food lovers. Built for local restaurants.</p>
        </div>
        <div className="footer-cols">
          <div className="col">
            <h5>COMPANY</h5>
            <Link to="/about">About</Link>
            <Link to="/careers">Careers</Link>
            <a href="influencer.html">Influencer Program</a>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="col">
            <h5>FOR PARTNERS</h5>
            {/* Cross-route hash links must be plain anchors: the router treats
                "http://partners.ustart.in/" as a pathname and would fall through to the 404 case. */}
            <a href="http://partners.ustart.in/">Partner Your Restaurant</a>
            <Link to="/careers">Become a Delivery Partner</Link>
          </div>
          <div className="col">
            <h5>SUPPORT</h5>
            <Link to="/contact">Help Centre</Link>
            <a href="#">Refunds &amp; Cancellations</a>
            <a href="/#faq">FAQs</a>
          </div>
          <div className="col">
            <h5>LEGAL</h5>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-apps-social">
        <div className="footer-store-btns">
          <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="footer-store-btn">
            <span className="fi">▶</span>
            <span className="ft"><small>GET IT ON</small><strong>Google Play</strong></span>
          </a>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="footer-store-btn">
            <span className="fi"> </span>
            <span className="ft"><small>DOWNLOAD ON THE</small><strong>App Store</strong></span>
          </a>
        </div>
        <div className="footer-social">
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Twitter / X">𝕏</a>
          <a href="#" aria-label="Instagram">◎</a>
          <a href="#" aria-label="LinkedIn">in</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 USTART. All rights reserved. · Proudly serving Gurugram.</span>
        <span className="seo-line">{SEO_LINE}</span>
      </div>
    </footer>
  );
};
