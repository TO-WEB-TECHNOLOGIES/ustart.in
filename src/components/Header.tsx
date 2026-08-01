import React, { useEffect, useState } from 'react';
import { Link, useRouter } from '../router';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/careers', label: 'Careers' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' }
];

export interface HeaderProps {
  variant?: 'light' | 'dark';
}

export const Header: React.FC<HeaderProps> = ({ variant = 'light' }) => {
  const { pathname } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const logo = variant === 'dark' ? '/Logo_White_Text.png' : '/Logo_Blue.png';

  return (
    <nav className={variant === 'dark' ? 'subnav subnav-dark' : 'subnav'}>
      <div className="subnav-inner">
        <Link to="/" className="logo">
          <img src={logo} alt="USTART" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <span className="case-label">food, fairly delivered</span>
        </Link>

        <div className="subnav-links">
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className={pathname === to ? 'active' : ''}>{label}</Link>
          ))}
        </div>

        <div className="subnav-ctas">
          <Link to="/" className="btn btn-outline" style={{ padding: "9px 16px", fontSize: "13px" }}>Partner With Us</Link>
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
        <Link to="/" className="btn btn-outline">Partner With Us</Link>
      </div>
    </nav>
  );
};
