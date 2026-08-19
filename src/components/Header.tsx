'use client';

import React, { useEffect, useState } from 'react';
import { Link, useRouter } from '../router';
import { PARTNER_URL } from '../constants';

// The /food-delivery/gurgaon and /food-delivery/delhi city hubs are intentionally
// not in the header. They stay linked from the footer's ORDER column, which is what
// keeps them (and the 20 locality pages hanging off them) crawlable — don't remove
// those footer links without putting the hubs back somewhere in the nav.
const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/careers', label: 'Careers' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' }
];

export interface HeaderProps {
  variant?: 'light' | 'dark' | 'overlay';
}

export const Header: React.FC<HeaderProps> = ({ variant = 'light' }) => {
  const { pathname } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Overlay variant only: transparent over the hero photo, glassmorphic on scroll start,
  // condensing into the solid bar once the hero has scrolled past.
  useEffect(() => {
    if (variant !== 'overlay') return;

    let threshold = 0;
    let frame = 0;

    const measure = () => {
      // .page-hero on sub-pages, .hero on the homepage — no page renders both.
      const hero = document.querySelector('.page-hero, .hero') as HTMLElement | null;
      const heroHeight = hero?.offsetHeight ?? window.innerHeight * 0.6;
      // Change to solid white when the header passes the hero image segment (heroHeight - navbar height)
      threshold = Math.max(heroHeight - 75, 60);
    };

    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      setScrolled(scrollY > 15);
      setStuck(scrollY > threshold);
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
    ? `subnav subnav-overlay${scrolled ? ' is-scrolled' : ''}${solid ? ' is-stuck' : ''}`
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
