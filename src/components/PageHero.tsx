import React, { useEffect, useRef } from 'react';

export interface PageHeroProps {
  /** Small pill above the headline, e.g. "🍽️ FRESH FROM GURUGRAM · ABOUT US" */
  kicker?: React.ReactNode;
  /** JSX so each page can place its own <span> accent */
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** background-position — each page crops the shared photo differently */
  focal?: string;
  /** colour of the soft glow at the bottom of the hero */
  tint?: string;
  /** optional CTA row */
  children?: React.ReactNode;
}

/**
 * Sub-page hero, built in the same language as the HomePage hero:
 * full-bleed photo under a navy wash, grain, drifting orbs, hand-drawn
 * doodles and a scroll cue. Sized at ~70vh so it reads as subordinate
 * to the homepage's 100vh hero.
 */
export const PageHero: React.FC<PageHeroProps> = ({
  kicker,
  title,
  subtitle,
  focal = 'center 68%',
  tint = 'rgba(255,159,67,0.16)',
  children
}) => {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Scoped to this hero so it never fights the HomePage's global listener.
    const orb1 = root.querySelector('.hero-orb-1') as HTMLElement | null;
    const orb2 = root.querySelector('.hero-orb-2') as HTMLElement | null;
    if (!orb1 && !orb2) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      if (orb1) orb1.style.transform = `translate(${x * 30}px, ${y * 20}px)`;
      if (orb2) orb2.style.transform = `translate(${x * -30 * 0.6}px, ${y * -20 * 0.6}px)`;
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX / window.innerWidth - 0.5;
      y = e.clientY / window.innerHeight - 0.5;
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <header
      ref={rootRef}
      className="page-hero"
      style={{ '--hero-focal': focal, '--hero-tint': tint } as React.CSSProperties}
    >
      <div className="hero-grain"></div>
      <div className="hero-orb hero-orb-1"></div>
      <div className="hero-orb hero-orb-2"></div>
      <div className="hero-orb hero-orb-3"></div>

      {/* Doodles — a reduced set of the homepage's, kept clear of the centred text */}

      {/* 8-point asterisk */}
      <svg className="doodle-arrow" style={{ top: '22%', right: '11%', width: '36px', opacity: 0.2, animation: 'doodleWobble 5.5s ease-in-out infinite' }} viewBox="0 0 40 40" fill="none">
        <line x1="20" y1="2" x2="20" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="2" y1="20" x2="38" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="7" y1="7" x2="33" y2="33" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="33" y1="7" x2="7" y2="33" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* Dotted circle with plus */}
      <svg className="doodle-arrow" style={{ bottom: '18%', left: '13%', width: '32px', opacity: 0.18 }} viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="14" stroke="var(--peach)" strokeWidth="2" strokeDasharray="4 3" />
        <line x1="10" y1="17" x2="24" y2="17" stroke="var(--peach)" strokeWidth="2" strokeLinecap="round" />
        <line x1="17" y1="10" x2="17" y2="24" stroke="var(--peach)" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* Lightning bolt */}
      <svg className="doodle-arrow" style={{ top: '26%', left: '8%', width: '40px', opacity: 0.2, transform: 'rotate(-8deg)' }} viewBox="0 0 44 60" fill="none">
        <polyline points="32,4 14,28 28,28 12,56" stroke="var(--orange)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Hand-drawn heart */}
      <svg className="doodle-arrow" style={{ bottom: '26%', right: '7%', width: '30px', opacity: 0.18, animation: 'doodleFlicker 4s ease-in-out infinite' }} viewBox="0 0 32 30" fill="none">
        <path d="M16 26 C 6 18, 2 10, 8 6 C 12 4, 16 8, 16 8 C 16 8, 20 4, 24 6 C 30 10, 26 18, 16 26Z" stroke="var(--orange)" strokeWidth="2" fill="none" strokeLinejoin="round" />
      </svg>

      {/* Star polygon */}
      <svg className="doodle-arrow" style={{ top: '18%', left: '30%', width: '26px', opacity: 0.15, animation: 'doodleWobble 7s ease-in-out infinite' }} viewBox="0 0 28 28" fill="none">
        <path d="M14 2 L16.2 10.2 L24 10.2 L17.8 15.2 L20 23 L14 18 L8 23 L10.2 15.2 L4 10.2 L11.8 10.2 Z" stroke="var(--peach)" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      </svg>

      {/* Crosshair circle */}
      <svg className="doodle-arrow" style={{ top: '30%', right: '26%', width: '38px', opacity: 0.16 }} viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="18" stroke="var(--orange)" strokeWidth="1.8" strokeDasharray="5 4" />
        <circle cx="22" cy="22" r="8" stroke="var(--orange)" strokeWidth="1.5" />
        <line x1="22" y1="2" x2="22" y2="10" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="22" y1="34" x2="22" y2="42" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="2" y1="22" x2="10" y2="22" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="34" y1="22" x2="42" y2="22" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>

      <div className="page-hero-inner">
        {kicker && <span className="case-number reveal"><span className="pulse-dot"></span>{kicker}</span>}
        <h1 className="font-display reveal d1">{title}</h1>
        {subtitle && <p className="reveal d2">{subtitle}</p>}
        {children && <div className="page-hero-ctas reveal d3">{children}</div>}
      </div>

      <div className="scroll-cue reveal d4">
        <div className="scroll-arrow-wrap">
          <span className="scroll-label">scroll</span>
          <svg className="scroll-chevrons" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4 L14 14 L24 4" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 14 L14 24 L24 14" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 24 L14 34 L24 24" stroke="rgba(255,255,255,0.95)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default PageHero;
