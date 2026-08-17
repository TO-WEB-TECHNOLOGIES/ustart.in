'use client';

import React, { useEffect, useState } from 'react';
import { Link, useRouter } from '../router';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/careers', label: 'Careers' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' }
];

const PARTNER_URL = 'http://partners.ustart.in/';

export interface HeaderProps {
  variant?: 'light' | 'dark' | 'overlay';
}

export const Header: React.FC<HeaderProps> = ({ variant = 'light' }) => {
  const { pathname } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Overlay variant only: transparent over the hero photo, condensing into the
  // solid bar once the hero has scrolled past.
  useEffect(() => {
    if (variant !== 'overlay') return;

    let threshold = 0;
    let frame = 0;

    const measure = () => {
      // .page-hero on sub-pages, .hero on the homepage — no page renders both.
      const hero = document.querySelector('.page-hero, .hero') as HTMLElement | null;
      const heroHeight = hero?.offsetHeight ?? window.innerHeight * 0.6;
      // Go solid well before the hero clears the bar. Otherwise the .3s
      // background fade plays out over the light content below it, leaving
      // white links briefly unreadable on cream.
      threshold = Math.max(heroHeight - 180, 60);
    };

    const update = () => {
      frame = 0;
      setStuck(window.scrollY > threshold);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [variant, pathname]);

  const isOverlay = variant === 'overlay';
  // The mobile panel is opaque, so the bar must adopt its solid treatment
  // whenever the menu is open — otherwise white links land on a transparent bar.
  const solid = stuck || menuOpen;

  const navClass = isOverlay
    ? `subnav subnav-overlay${solid ? ' is-stuck' : ''}`
    : variant === 'dark'
      ? 'subnav subnav-dark'
      : 'subnav';

  return (
    <nav className={navClass}>
      <div className="subnav-inner">
        <Link to="/" className="logo" aria-label="USTART — home">
          {/* The wordmark is painted via CSS mask, so its colour is a variable
              (--logo-ink) rather than a second image. Logo_Blue.png is misnamed —
              it is the same near-white artwork as Logo_White_Text.png. */}
          <span className="logo-mark" role="img" aria-label="USTART" />
          <span className="case-label">food, fairly delivered</span>
        </Link>

        <div className="subnav-links">
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className={pathname === to ? 'active' : ''}>{label}</Link>
          ))}
        </div>

        <div className="subnav-ctas">
          <a href={PARTNER_URL} className="btn btn-outline" style={{ padding: "9px 16px", fontSize: "13px" }}>Partner With Us</a>
        </div>

        <button
          type="button"
          className="subnav-burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="subnav-mobile"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={menuOpen ? 'burger-box open' : 'burger-box'}>
            <span></span><span></span><span></span>
          </span>
        </button>
      </div>

      <div id="subnav-mobile" className={menuOpen ? 'subnav-mobile open' : 'subnav-mobile'} hidden={!menuOpen}>
        {NAV_LINKS.map(({ to, label }) => (
          <Link key={to} to={to} className={pathname === to ? 'active' : ''}>{label}</Link>
        ))}
        <a href={PARTNER_URL} className="btn btn-outline">Partner With Us</a>
      </div>
    </nav>
  );
};
