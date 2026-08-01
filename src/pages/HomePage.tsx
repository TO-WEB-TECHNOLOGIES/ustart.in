import React, { useState, useEffect } from 'react';
import { Link } from '../router';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    // 1. Scroll Reveal (IntersectionObserver)
    const revealEls = document.querySelectorAll('.reveal, .reveal-tilt, .reveal-scale, .reveal-stamp, .reveal-left, .reveal-right, .reveal-pop, .reveal-flip, .sv-reveal, .sv-reveal-tilt, .sv-reveal-pop, .el-reveal, .dlx-reveal, .dlx-reveal-left, .dlx-reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          e.target.classList.add('sv-is-in');
          e.target.classList.add('el-is-in');
          e.target.classList.add('dlx-is-in');
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach((el) => revealObserver.observe(el));

    // 2. Verified Stamp & Approval Stamp Triggers
    const approvalStamp = document.getElementById('approvalStamp');
    let approvalFired = false;
    const approvalObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !approvalFired) {
          approvalFired = true;
          setTimeout(() => {
            if (approvalStamp) {
              approvalStamp.classList.add('is-stamped');
              const svg = approvalStamp.querySelector('.stamp-svg') as HTMLElement;
              if (svg) {
                svg.style.transition = 'transform .45s cubic-bezier(.2,.9,.3,1.3), opacity .3s ease';
                svg.style.transform = 'scale(1) rotate(-8deg)';
                svg.style.opacity = '1';
                setTimeout(() => {
                  svg.style.transition = 'transform .3s cubic-bezier(.34,1.56,.64,1)';
                  svg.style.transform = 'scale(1.06) rotate(-10deg)';
                  setTimeout(() => {
                    svg.style.transform = 'scale(1) rotate(-8deg)';
                  }, 200);
                }, 450);
              }
            }
          }, 600);
        }
      });
    }, { threshold: 0.4 });
    if (approvalStamp) {
      const parent = approvalStamp.closest('.sec-head') || approvalStamp;
      approvalObserver.observe(parent);
    }

    const verifiedStamp = document.getElementById('verifiedStamp');
    let verifiedFired = false;
    const verifiedObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !verifiedFired) {
          verifiedFired = true;
          setTimeout(() => {
            if (verifiedStamp) {
              verifiedStamp.classList.add('sv-is-stamped');
            }
          }, 500);
        }
      });
    }, { threshold: 0.4 });
    if (verifiedStamp) {
      const parent = verifiedStamp.closest('.sv-sec-head') || verifiedStamp;
      verifiedObserver.observe(parent);
    }

    // 3. Magnetic Hover & Card Tilt Effects (Perk File & KOT tickets)
    const perkFiles = document.querySelectorAll('.perk-file');
    const handlePerkMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const el = mouseEvent.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
      const y = (mouseEvent.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `translateY(-8px) scale(1.03) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
    };
    const handlePerkMouseLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform = '';
    };
    perkFiles.forEach((el) => {
      el.addEventListener('mousemove', handlePerkMouseMove);
      el.addEventListener('mouseleave', handlePerkMouseLeave);
    });

    const kotTickets = document.querySelectorAll('.kot-ticket');
    const handleKotMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const t = mouseEvent.currentTarget as HTMLElement;
      const rect = t.getBoundingClientRect();
      const x = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
      const y = (mouseEvent.clientY - rect.top) / rect.height - 0.5;
      t.style.transform = `rotate(0deg) translateY(-6px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) scale(1.02)`;
    };
    const handleKotMouseLeave = (e: Event) => {
      const t = e.currentTarget as HTMLElement;
      const r = t.style.getPropertyValue('--r') || '0deg';
      t.style.transform = `rotate(${r})`;
    };
    kotTickets.forEach((t) => {
      t.addEventListener('mousemove', handleKotMouseMove);
      t.addEventListener('mouseleave', handleKotMouseLeave);
    });

    // 4. Ripple effect on btn-solid and btn-gold
    const buttons = document.querySelectorAll('.btn-solid, .btn-gold');
    const handleButtonClick = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const btn = mouseEvent.currentTarget as HTMLElement;
      const circle = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.6;
      circle.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,255,0.35);transform:translate(-50%,-50%) scale(0);left:${mouseEvent.clientX - rect.left}px;top:${mouseEvent.clientY - rect.top}px;animation:rippleOut .6s ease forwards;pointer-events:none;`;
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 700);
    };
    buttons.forEach((btn) => btn.addEventListener('click', handleButtonClick));

    // 5. Draw-on doodle paths
    const doodlePaths = document.querySelectorAll('.doodle-animated path, .doodle-animated polyline, .doodle-animated circle');
    const doodleObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.animationPlayState = 'running';
          doodleObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    doodlePaths.forEach((p) => {
      (p as HTMLElement).style.animationPlayState = 'paused';
      doodleObserver.observe(p);
    });

    // 6. Count-up Stats
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const counters = document.querySelectorAll('.stat .n[data-target]');
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        countObserver.unobserve(e.target);
        const el = e.target as HTMLElement;
        const target = parseInt(el.getAttribute('data-target') || '0');
        const duration = 1600;
        let start: number | null = null;
        const step = (ts: number) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const val = Math.floor(easeOut(progress) * target);
          el.textContent = (val >= 1000 ? '10,000' : String(val)) + (target === 10000 ? '+' : '+');
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target === 10000 ? '10,000+' : '100+';
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => countObserver.observe(c));

    // 7. Parallax Hero Orbs
    const orb1 = document.querySelector('.hero-orb-1') as HTMLElement;
    const orb2 = document.querySelector('.hero-orb-2') as HTMLElement;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      if (orb1) orb1.style.transform = `translate(${x}px, ${y}px)`;
      if (orb2) orb2.style.transform = `translate(${-x * 0.6}px, ${-y * 0.6}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 8. Barcode generator
    document.querySelectorAll('.sv-barcode').forEach((bc) => {
      bc.innerHTML = '';
      for (let i = 0; i < 26; i++) {
        const span = document.createElement('span');
        span.style.width = (Math.random() > 0.5 ? 2 : 1) + 'px';
        span.style.height = '100%';
        span.style.background = 'var(--navy)';
        span.style.opacity = String(0.3 + Math.random() * 0.7);
        bc.appendChild(span);
      }
    });

    return () => {
      revealObserver.disconnect();
      approvalObserver.disconnect();
      verifiedObserver.disconnect();
      doodleObserver.disconnect();
      countObserver.disconnect();
      perkFiles.forEach((el) => {
        el.removeEventListener('mousemove', handlePerkMouseMove);
        el.removeEventListener('mouseleave', handlePerkMouseLeave);
      });
      kotTickets.forEach((t) => {
        t.removeEventListener('mousemove', handleKotMouseMove);
        t.removeEventListener('mouseleave', handleKotMouseLeave);
      });
      buttons.forEach((btn) => btn.removeEventListener('click', handleButtonClick));
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      






<header className="hero">
  <nav className="nav nav-on-hero">
    <Link to="/" className="logo">
      <img src="Logo_White_Text.png" alt="USTART" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
    </Link>
    <div className="nav-links nav-links-hero">
      <Link to="/about">About Us</Link>
      <Link to="/careers">Careers</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/contact">Contact</Link>
    </div>
  </nav>
  <div className="hero-grain"></div>
  <div className="hero-orb hero-orb-1"></div>
  <div className="hero-orb hero-orb-2"></div>
  <div className="hero-orb hero-orb-3"></div>

  {/* ══════ HERO DOODLES — expanded ══════ */}

  {/* 1. Curved arrow top-left (draw-on) */}
  <svg className="doodle-arrow" style={{'top': '20%', 'left': '10%', 'width': '88px', 'transform': 'rotate(-28deg)', 'opacity': '0.22'} as React.CSSProperties} viewBox="0 0 80 40" fill="none">
    <path d="M4 20 C20 8, 56 8, 72 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 4" fill="none" style={{'stroke-dasharray': '200', 'stroke-dashoffset': '200', 'animation': 'doodleDraw 1.2s ease .3s forwards'} as React.CSSProperties}/>
    <path d="M64 14 L72 20 L64 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>

  {/* 2. Curved arrow bottom-right (mirrored) */}
  <svg className="doodle-arrow" style={{'top': '68%', 'right': '12%', 'width': '62px', 'transform': 'rotate(18deg) scaleX(-1)', 'opacity': '0.2'} as React.CSSProperties} viewBox="0 0 80 40" fill="none">
    <path d="M4 20 C20 8, 56 8, 72 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 4" fill="none"/>
    <path d="M64 14 L72 20 L64 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>

  {/* 3. 8-point asterisk star (wobbles) */}
  <svg className="doodle-arrow" style={{'top': '28%', 'right': '20%', 'width': '40px', 'opacity': '0.2', 'animation': 'doodleWobble 5.5s ease-in-out infinite', '--dr': '0deg'} as React.CSSProperties} viewBox="0 0 40 40" fill="none">
    <line x1="20" y1="2" x2="20" y2="38" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="2" y1="20" x2="38" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="7" y1="7" x2="33" y2="33" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="33" y1="7" x2="7" y2="33" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>

  {/* 4. Dotted circle with plus */}
  <svg className="doodle-arrow" style={{'top': '74%', 'left': '20%', 'width': '34px', 'opacity': '0.18'} as React.CSSProperties} viewBox="0 0 34 34" fill="none">
    <circle cx="17" cy="17" r="14" stroke="var(--peach)" strokeWidth="2" strokeDasharray="4 3"/>
    <line x1="10" y1="17" x2="24" y2="17" stroke="var(--peach)" strokeWidth="2" strokeLinecap="round"/>
    <line x1="17" y1="10" x2="17" y2="24" stroke="var(--peach)" strokeWidth="2" strokeLinecap="round"/>
  </svg>

  {/* 5. Dashed rectangle */}
  <svg className="doodle-arrow" style={{'top': '16%', 'right': '8%', 'width': '54px', 'opacity': '0.14', 'transform': 'rotate(12deg)'} as React.CSSProperties} viewBox="0 0 54 36" fill="none">
    <rect x="3" y="3" width="48" height="30" rx="4" stroke="white" strokeWidth="2" strokeDasharray="6 4"/>
  </svg>

  {/* 6. Lightning bolt */}
  <svg className="doodle-arrow" style={{'bottom': '14%', 'left': '14%', 'width': '48px', 'opacity': '0.2', 'transform': 'rotate(-8deg)'} as React.CSSProperties} viewBox="0 0 44 60" fill="none">
    <polyline points="32,4 14,28 28,28 12,56" stroke="var(--orange)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>



  {/* 8. Dotted S-curve top-right */}
  <svg className="doodle-arrow" style={{'top': '10%', 'right': '4%', 'width': '50px', 'opacity': '0.16', 'transform': 'rotate(15deg)'} as React.CSSProperties} viewBox="0 0 30 60" fill="none">
    <path d="M4 4 C 20 4, 24 20, 12 30 C 0 40, 4 56, 26 56" stroke="var(--peach)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" fill="none"/>
  </svg>

  {/* 9. Tiny hand-drawn heart left-center */}
  <svg className="doodle-arrow" style={{'top': '48%', 'left': '4%', 'width': '32px', 'opacity': '0.18', 'animation': 'doodleFlicker 4s ease-in-out infinite', '--do': '0.18'} as React.CSSProperties} viewBox="0 0 32 30" fill="none">
    <path d="M16 26 C 6 18, 2 10, 8 6 C 12 4, 16 8, 16 8 C 16 8, 20 4, 24 6 C 30 10, 26 18, 16 26Z" stroke="var(--orange)" strokeWidth="2" fill="none" strokeLinejoin="round"/>
  </svg>

  {/* 10. Small star polygon top-center */}
  <svg className="doodle-arrow" style={{'top': '8%', 'left': '44%', 'width': '28px', 'opacity': '0.15', 'animation': 'doodleWobble 7s ease-in-out infinite', '--dr': '-3deg'} as React.CSSProperties} viewBox="0 0 28 28" fill="none">
    <path d="M14 2 L16.2 10.2 L24 10.2 L17.8 15.2 L20 23 L14 18 L8 23 L10.2 15.2 L4 10.2 L11.8 10.2 Z" stroke="var(--peach)" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
  </svg>

  {/* 11. Spiral (top-left corner) */}
  <svg className="doodle-arrow" style={{'top': '4%', 'left': '3%', 'width': '52px', 'opacity': '0.16'} as React.CSSProperties} viewBox="0 0 52 52" fill="none">
    <path d="M26 26 C 26 19, 33 13, 39 17 C 45 21, 45 31, 37 35 C 29 39, 17 35, 15 25 C 13 15, 21 7, 33 7" stroke="rgba(255,255,255,0.7)" strokeWidth="2" fill="none" strokeLinecap="round" style={{'stroke-dasharray': '240', 'stroke-dashoffset': '240', 'animation': 'doodleDraw 2s ease .8s forwards', '--dl': '240'} as React.CSSProperties}/>
  </svg>

  {/* 12. Dashed angle bracket right */}
  <svg className="doodle-arrow" style={{'top': '36%', 'right': '5%', 'width': '36px', 'opacity': '0.16'} as React.CSSProperties} viewBox="0 0 24 50" fill="none">
    <polyline points="20,4 4,25 20,46" stroke="var(--peach)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 4"/>
  </svg>

  {/* 13. Dashed oval ring (floating mid-right) */}
  <svg className="doodle-arrow" style={{'top': '52%', 'right': '6%', 'width': '60px', 'opacity': '0.14', 'transform': 'rotate(-20deg)'} as React.CSSProperties} viewBox="0 0 60 36" fill="none">
    <ellipse cx="30" cy="18" rx="27" ry="14" stroke="var(--peach)" strokeWidth="2" strokeDasharray="6 4"/>
  </svg>



  {/* 15. Crosshair circle bottom-left */}
  <svg className="doodle-arrow" style={{'bottom': '20%', 'left': '6%', 'width': '44px', 'opacity': '0.16'} as React.CSSProperties} viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="18" stroke="var(--orange)" strokeWidth="1.8" strokeDasharray="5 4"/>
    <circle cx="22" cy="22" r="8" stroke="var(--orange)" strokeWidth="1.5"/>
    <line x1="22" y1="2" x2="22" y2="10" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="22" y1="34" x2="22" y2="42" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="2" y1="22" x2="10" y2="22" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="34" y1="22" x2="42" y2="22" stroke="var(--orange)" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>

  {/* 16. Tiny orbiting dot around asterisk (top-right) */}
  <svg className="doodle-arrow" style={{'top': '35%', 'right': '16%', 'width': '20px', 'opacity': '0.22'} as React.CSSProperties} viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="3" fill="var(--orange)" style={{'animation': 'doodleOrbit 3s linear infinite', 'transform-origin': '10px 10px'} as React.CSSProperties}/>
  </svg>



  <div className="hero-inner">
    <span className="case-number reveal"><span className="pulse-dot"></span>NOW SERVING · DELHI NCR EDITION</span>
    <h1 className="font-display reveal d1">
      <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>Fairness That <span style={{ color: 'var(--orange)' }}>Never</span></span><br />
      <span className="underline-word">Tasted Better.
        {/* <svg viewBox="0 0 320 22" preserveAspectRatio="none"><path d="M2 16 Q 80 3, 160 13 T 318 10" stroke="var(--peach)" strokeWidth="10" fill="none" strokeLinecap="round"/></svg> */}
      </span>
    </h1>
    {/* <p className="hero-sub reveal d2">Fav meals. <span className="hl">Fair prices.</span> No checkout plot twists.</p> */}

    {/* <div className="hero-proof reveal d4" style={{'margin-top': '34px', 'display': 'flex', 'flex-wrap': 'wrap', 'align-items': 'center', 'justify-content': 'center', 'gap': '14px 28px'} as React.CSSProperties}>
      <div style={{'display': 'flex', 'align-items': 'center', 'gap': '8px', 'background': 'rgba(253,251,247,0.08)', 'border': '1px solid rgba(253,251,247,0.22)', 'backdrop-filter': 'blur(6px)', 'padding': '9px 16px', 'border-radius': '999px'} as React.CSSProperties}>
        <span style={{'display': 'flex', 'gap': '1px', 'color': 'var(--orange)', 'font-size': '14px', 'letter-spacing': '1px'} as React.CSSProperties}>★★★★★</span>
        <span style={{'font-family': '\'Manrope\',sans-serif', 'font-weight': '700', 'font-size': '12.5px', 'color': 'rgba(253,251,247,0.92)'} as React.CSSProperties}>4.8/5 · 2,400+ ratings</span>
      </div>
      <div style={{'display': 'flex', 'align-items': 'center', '-webkit-mask-image': 'none'} as React.CSSProperties}>
        <div style={{'display': 'flex', 'margin-right': '10px'} as React.CSSProperties}>
          <span style={{'width': '26px', 'height': '26px', 'border-radius': '50%', 'background': 'linear-gradient(135deg,var(--orange),var(--terracotta))', 'border': '2px solid var(--navy)', 'margin-right': '-9px'} as React.CSSProperties}></span>
          <span style={{'width': '26px', 'height': '26px', 'border-radius': '50%', 'background': 'linear-gradient(135deg,var(--teal),var(--navy-soft))', 'border': '2px solid var(--navy)', 'margin-right': '-9px'} as React.CSSProperties}></span>
          <span style={{'width': '26px', 'height': '26px', 'border-radius': '50%', 'background': 'linear-gradient(135deg,var(--peach),var(--gold-dark))', 'border': '2px solid var(--navy)'} as React.CSSProperties}></span>
        </div>
        <span style={{'font-family': '\'Manrope\',sans-serif', 'font-weight': '700', 'font-size': '12.5px', 'color': 'rgba(253,251,247,0.92)'} as React.CSSProperties}>Joined by 10,000+ Delhi NCR foodies</span>
      </div>
    </div> */}

  </div>

  <div className="hero-bottom-group">
    <div className="hero-ctas reveal d3">
      <a href="#download" className="btn btn-solid btn-lg">Feed the Craving</a>
      <a href="http://partners.ustart.in/" className="btn btn-outline btn-lg">Put Us On the Menu</a>
    </div>

    <div className="scroll-cue reveal d5">
      <div className="scroll-arrow-wrap">
        <span className="scroll-label">scroll</span>
        <svg className="scroll-chevrons" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4 L14 14 L24 4" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 14 L14 24 L24 14" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 24 L14 34 L24 24" stroke="rgba(255,255,255,0.95)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</header>

{/* ===== EVIDENCE / HOW WE'RE RAISING THE BAR (redesigned) ===== */}



<section className="sv-services-section" id="evidence">
  {/* brand watermark, echoes hero header wordmark */}
  <img className="sv-brand-mark" src="/assets/brands/ustart_logo.png" alt="" />

  {/* floating street-food doodles */}
  <span className="sv-float-food" style={{'top': '9%', 'left': '2%', '--rot': '-8deg', '--rot2': '6deg', 'animation-delay': '.5s'} as React.CSSProperties}>🍔</span>
  <span className="sv-float-food" style={{'top': '70%', 'left': '3.5%', '--rot': '6deg', '--rot2': '-5deg', 'font-size': '20px', 'animation-delay': '1.3s'} as React.CSSProperties}>🥡</span>
  <span className="sv-float-food" style={{'top': '16%', 'right': '3%', '--rot': '7deg', '--rot2': '-4deg', 'animation-delay': '.9s'} as React.CSSProperties}>🛵</span>

  {/* hand-drawn doodle icons, styled after the hero graphic (crown / bolt / sparkle) */}
  <svg className="sv-doodle" style={{'top': '4%', 'left': '44%', 'width': '34px', 'height': '26px', 'animation-delay': '.2s'} as React.CSSProperties} viewBox="0 0 40 30" fill="none">
    <path d="M3 26L6 8l7 9 7-13 7 13 7-9 3 18H3z" stroke="#FF9F43" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
  </svg>
  <svg className="sv-doodle" style={{'top': '34%', 'right': '5%', 'width': '26px', 'height': '26px', 'animation-delay': '.7s'} as React.CSSProperties} viewBox="0 0 30 30" fill="none">
    <path d="M15 1c1 6 2 8 8 9-6 1-7 3-8 9-1-6-2-8-8-9 6-1 7-3 8-9z" stroke="#F4B76F" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
  </svg>

  {/* sticker badges, street-sticker flavor */}
  <span className="sv-sticker sv-s1">NO CAP,<br />ONLY FACTS</span>
  <div className="sv-wrap">
    <div className="sv-sec-head sv-reveal" style={{'position': 'relative'} as React.CSSProperties}>
      <div className="sv-splash sv-sp1" aria-hidden="true"></div>
      <div className="sv-splash sv-sp2" aria-hidden="true"></div>
      <h2><span className="sv-font-display">HOW WE'RE</span><br /><span className="sv-font-display sv-hl">RAISING THE BAR.</span></h2>
      <p>Ordering food shouldn't feel like getting played. Fair prices, happy restaurants, food that shows up hot — that's the whole personality.</p>

      {/* VERIFIED STAMP */}
      <div className="sv-verified-stamp-wrap" id="verifiedStamp" aria-label="USTART Verified">
        <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="roughv" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.6" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
          <circle cx="52" cy="52" r="45" stroke="#539987" strokeWidth="3.5" fill="rgba(83,153,135,0.10)" filter="url(#roughv)" opacity="0.95"/>
          <circle cx="52" cy="52" r="38.5" stroke="#539987" strokeWidth="1.4" fill="none" filter="url(#roughv)" opacity="0.8"/>
          <path id="topArcV" d="M 14 52 A 38 38 0 0 1 90 52" fill="none"/>
          <text fontFamily="'Manrope',sans-serif" font-weight="900" fontSize="10" fill="var(--navy)" letterSpacing="2">
            <textPath href="#topArcV" startOffset="6%">USTART VERIFIED</textPath>
          </text>
          <path id="botArcV" d="M 14 52 A 38 38 0 0 0 90 52" fill="none"/>
          <text fontFamily="'Manrope',sans-serif" font-weight="800" fontSize="8.5" fill="var(--navy)" letterSpacing="2">
            <textPath href="#botArcV" startOffset="16%">✦ FAIR • FRESH • FAST ✦</textPath>
          </text>
          <circle cx="52" cy="50" r="17" fill="none" stroke="#539987" strokeWidth="2" filter="url(#roughv)" opacity="0.9"/>
          <path d="M 40 50 L 49 59 L 66 40" stroke="#539987" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#roughv)" opacity="0.95"/>
        </svg>
      </div>
    </div>

    <div className="sv-bills-row">

      {/* BILL 1 — CUSTOMERS */}
      <div className="sv-bill sv-b1 sv-reveal-tilt sv-d1" style={{'--r': '-1deg'} as React.CSSProperties}>
        <div className="sv-bill-head">
          <div className="sv-row1"><span className="sv-no">KOT #001</span></div>
          <div className="sv-pillar-num">01</div>
          <div className="sv-pillar-name">For You, The Customer</div>
          <div className="sv-pillar-tag">TABLE: YOU · ORDER 01</div>
        </div>
        <div className="sv-bill-body">
          <div className="sv-bill-item">
            <span className="sv-ic">🧾</span>
            <div className="sv-txt"><h4>Zero Inflated Prices</h4><p>Menu prices that match offline prices.</p></div>
            <span className="sv-check">✓</span>
          </div>
          <div className="sv-bill-item">
            <span className="sv-ic">✅</span>
            <div className="sv-txt"><h4>No Checkout Shock</h4><p>The price you see is the price you pay.</p></div>
            <span className="sv-check">✓</span>
          </div>
          <div className="sv-bill-item">
            <span className="sv-ic">💬</span>
            <div className="sv-txt"><h4>Support That Shows Up</h4><p>Real humans, real fast, whenever something's off.</p></div>
            <span className="sv-check">✓</span>
          </div>
        </div>
        <div className="sv-bill-footer">
          <div className="sv-bill-total"><span>TOTAL BS CHARGED</span><span className="sv-zero sv-zero-b1"><span className="sv-zero-ic">🚫</span>₹0.00</span></div>
          <div className="sv-barcode" aria-hidden="true"></div>
        </div>
      </div>

      {/* BILL 2 — RESTAURANTS */}
      <div className="sv-bill sv-b2 sv-reveal-tilt sv-d2" style={{'--r': '0.7deg'} as React.CSSProperties}>
        <div className="sv-bill-head">
          <div className="sv-row1"><span className="sv-no">KOT #002</span></div>
          <div className="sv-pillar-num">02</div>
          <div className="sv-pillar-name">For Restaurants</div>
          <div className="sv-pillar-tag">TABLE: PARTNER · ORDER 02</div>
        </div>
        <div className="sv-bill-body">
          <div className="sv-bill-item">
            <span className="sv-ic">📈</span>
            <div className="sv-txt"><h4>Bigger Margins</h4><p>Lower commissions mean restaurants keep more of every order.</p></div>
            <span className="sv-check">✓</span>
          </div>
          <div className="sv-bill-item">
            <span className="sv-ic">🤖</span>
            <div className="sv-txt"><h4>Smart Growth Tools</h4><p>AI-powered insights to help local spots scale, not just survive.</p></div>
            <span className="sv-check">✓</span>
          </div>
          <div className="sv-bill-item">
            <span className="sv-ic">🔒</span>
            <div className="sv-txt"><h4>Your Data Stays Yours</h4><p>Protected from private-label brands trying to copy your bestsellers.</p></div>
            <span className="sv-check">✓</span>
          </div>
          <div className="sv-bill-item">
            <span className="sv-ic">🛟</span>
            <div className="sv-txt"><h4>Better Partner Support</h4><p>Onboarding and help that doesn't leave restaurants on hold.</p></div>
            <span className="sv-check">✓</span>
          </div>
        </div>
        <div className="sv-bill-footer">
          <div className="sv-bill-total"><span>FORCED AD CHARGES</span><span className="sv-zero sv-zero-b2"><span className="sv-zero-ic">✂️</span>₹0.00</span></div>
          <div className="sv-barcode" aria-hidden="true"></div>
        </div>
      </div>

      {/* BILL 3 — BEYOND THE PLATE */}
      <div className="sv-bill sv-b3 sv-reveal-tilt sv-d3" style={{'--r': '-0.6deg'} as React.CSSProperties}>
        <div className="sv-bill-head">
          <div className="sv-row1"><span className="sv-no">KOT #003</span></div>
          <div className="sv-pillar-num">03</div>
          <div className="sv-pillar-name">Beyond The Plate</div>
          <div className="sv-pillar-tag">TABLE: EARTH · ORDER 03</div>
        </div>
        <div className="sv-bill-body">
          <div className="sv-bill-item">
            <span className="sv-ic">🧼</span>
            <div className="sv-txt"><h4>Hygiene First</h4><p>Freshness and food-safety standards we don't compromise on.</p></div>
            <span className="sv-check">✓</span>
          </div>
          <div className="sv-bill-item">
            <span className="sv-ic">🛵</span>
            <div className="sv-txt"><h4>Smarter Routes, Less Waiting</h4><p>Optimized delivery means hot food and zero extra wait.</p></div>
            <span className="sv-check">✓</span>
          </div>
          <div className="sv-bill-item">
            <span className="sv-ic">🌱</span>
            <div className="sv-txt"><h4>Greener Deliveries</h4><p>Cutting our carbon footprint with EV-powered rides.</p></div>
            <span className="sv-check">✓</span>
          </div>
        </div>
        <div className="sv-bill-footer">
          <div className="sv-bill-total"><span>CARBON GUILT</span><span className="sv-zero sv-zero-b3"><span className="sv-zero-ic">🌱</span>₹0.00</span></div>
          <div className="sv-barcode" aria-hidden="true"></div>
        </div>
      </div>

    </div>
  </div>
</section>




{/* ===== ELITE (redesigned) ===== */}



<section className="el-elite-section" id="elite">
  <div className="el-elite-curve el-top">
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
      <path d="M0,0 C360,100 1080,100 1440,0 L1440,0 L0,0 Z" fill="#FDFBF7"/>
    </svg>
  </div>
  <div className="el-elite-curve el-bottom">
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
      <path d="M0,0 C360,100 1080,100 1440,0 L1440,0 L0,0 Z" fill="#FDFBF7"/>
    </svg>
  </div>

  <div className="el-elite-texture"></div>
  <div className="el-elite-glow"></div>

  {/* gold coin doodles */}
  <div className="el-gold-coin el-coin-tl el-coin-float">
    <svg viewBox="0 0 24 24" fill="none"><path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8z" fill="#7a4e12"/></svg>
  </div>
  <div className="el-gold-coin el-coin-tr el-coin-float">
    <svg viewBox="0 0 24 24" fill="none"><path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8z" fill="#7a4e12"/></svg>
  </div>
  <div className="el-gold-coin el-coin-bl el-coin-float">
    <svg viewBox="0 0 24 24" fill="none"><path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8z" fill="#7a4e12"/></svg>
  </div>
  <div className="el-gold-coin el-coin-br el-coin-float">
    <svg viewBox="0 0 24 24" fill="none"><path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8z" fill="#7a4e12"/></svg>
  </div>

  {/* food doodles */}
  <div className="el-food-doodle el-doodle-burger el-coin-float">
    <svg viewBox="0 0 64 64" fill="none" stroke="#F2C464" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 26c0-9 10-15 22-15s22 6 22 15" fill="#FF9F43" fillOpacity="0.18"/>
      <path d="M8 28h48" />
      <path d="M9 34h46c1.5 0 2 1.7 1 2.7-2 2-6 2.3-9 2.3H17c-3 0-7-.3-9-2.3-1-1-.5-2.7 1-2.7z" fill="#F4B76F" fillOpacity="0.22"/>
      <path d="M11 40c1 3 4 5 8 5h26c4 0 7-2 8-5" />
      <path d="M14 30.5c2-1 4-1 6 0M26 30.5c2-1 4-1 6 0M38 30.5c2-1 4-1 6 0" stroke-opacity="0.6"/>
      <path d="M8 42h48v2c0 3-2.5 5-5.5 5h-37C10.5 49 8 47 8 44z" fill="#9C6B1F" fillOpacity="0.25"/>
    </svg>
  </div>

  <div className="el-food-doodle el-doodle-pizza el-coin-float">
    <svg viewBox="0 0 64 64" fill="none" stroke="#FCEBB6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 8 58 54H6z" fill="#FF9F43" fillOpacity="0.2"/>
      <circle cx="26" cy="34" r="2.6" fill="#C0563F" stroke="none"/>
      <circle cx="36" cy="40" r="2.6" fill="#C0563F" stroke="none"/>
      <circle cx="30" cy="46" r="2.6" fill="#C0563F" stroke="none"/>
      <circle cx="40" cy="30" r="2.6" fill="#C0563F" stroke="none"/>
      <path d="M14 46c6 2 10 2 18 2s12 0 18-2" stroke-opacity="0.55"/>
    </svg>
  </div>

  <div className="el-food-doodle el-doodle-drink el-coin-float">
    <svg viewBox="0 0 40 64" fill="none" stroke="#F2C464" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 14h24l-3 40a5 5 0 0 1-5 4.5H16a5 5 0 0 1-5-4.5z" fill="#F4B76F" fillOpacity="0.2"/>
      <path d="M6 14h28" />
      <path d="M13 8c1-3 4-5 7-5s6 2 7 5" />
      <path d="M12 26h16M11 36h18M12 46h16" stroke-opacity="0.5"/>
      <path d="M22 2v10" />
    </svg>
  </div>

  <div className="el-food-doodle el-doodle-donut el-coin-float">
    <svg viewBox="0 0 64 64" fill="none" stroke="#FCEBB6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="32" cy="32" r="24" fill="#C0563F" fillOpacity="0.22"/>
      <circle cx="32" cy="32" r="9" fill="#081527" fillOpacity="0.35"/>
      <path d="M18 20c2 3 1 6-1 7M46 22c-2 2-2 5 0 7M20 46c3-1 6 0 7 2M42 47c-2-2-2-5 0-7" stroke-opacity="0.55"/>
    </svg>
  </div>

  <div className="el-food-doodle el-doodle-noodles el-coin-float">
    <svg viewBox="0 0 64 64" fill="none" stroke="#F2C464" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 30c8-6 36-6 44 0l-4 24a6 6 0 0 1-6 5H20a6 6 0 0 1-6-5z" fill="#FF9F43" fillOpacity="0.18"/>
      <path d="M10 30c8-6 36-6 44 0" />
      <path d="M20 30c2-8 4-14 2-22M32 30c0-8 0-14-2-22M44 30c-2-8-4-14-2-22" stroke-opacity="0.6"/>
    </svg>
  </div>

  <div className="el-food-doodle el-doodle-fries el-coin-float">
    <svg viewBox="0 0 48 64" fill="none" stroke="#FCEBB6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 28h28l-4 30a4 4 0 0 1-4 3.5H18a4 4 0 0 1-4-3.5z" fill="#F4B76F" fillOpacity="0.22"/>
      <path d="M14 28 12 6h6l1 22M22 28l-1-26h6l1 26M30 28l2-22h6l-2 22" stroke-opacity="0.65"/>
    </svg>
  </div>

  <div className="el-elite-inner">

    <div className="el-elite-brand el-reveal">
      <div className="el-word">USTART</div>
      <div className="el-rule"></div>
      <div className="el-mark">
        <svg className="el-crown-icon el-crown-pulse" viewBox="0 0 24 24" fill="none"><path d="M3 8l4 3 5-6 5 6 4-3-2 10H5L3 8z" fill="url(#cg)"/><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FDFBF7"/><stop offset="100%" stopColor="#FF9F43"/></linearGradient></defs></svg>
        <h1 className="el-font-display">ELITE</h1>
      </div>
    </div>

    <p className="el-elite-tagline-top el-reveal el-d1">USTART's Top Savings Program for Regulars</p>

    <h2 className="el-elite-title el-font-display el-reveal el-d2">FOR PEOPLE WHO ORDER<br />MORE THAN THEY <span className="el-hl">COOK.</span></h2>
    <p className="el-elite-sub el-reveal el-d2">More perks, more savings</p>

    <div className="el-perks-label el-reveal el-d3"><span className="el-star">★</span> ELITE BENEFITS <span className="el-star">★</span></div>

    <div className="el-elite-cards el-reveal el-d3">
      <div className="el-elite-card">
        <span className="el-icon"><svg viewBox="0 0 24 24"><path fill="#F2C464" d="M5.5 20a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2Zm13 0a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2ZM5.7 6.3a.9.9 0 0 1 .85.62l.55 1.58h2.3a.9.9 0 0 1 .9.9v2.1h2.36l3.1-5.06a.9.9 0 0 1 .77-.44h2.2a.9.9 0 1 1 0 1.8h-1.7l-2.9 4.73 1.1 1.87h3.14a.9.9 0 0 1 .87.66l.4 1.44a.9.9 0 1 1-1.74.48l-.22-.78H8.9a.9.9 0 0 1-.77-.44l-1.9-3.19H4.3a.9.9 0 0 1 0-1.8h1.34V9.4H4.3a.9.9 0 0 1-.85-1.18l.6-1.72a.9.9 0 0 1 .85-.62 .9.9 0 0 1 .8.42Z"/></svg></span>
        <h3>Delivery's On Us</h3>
        <p>Keep that money for more food.</p>
      </div>
      <div className="el-elite-card">
        <span className="el-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.4" fill="none" stroke="#F2C464" strokeWidth="1.7"/><path fill="#F2C464" d="M12.85 7.55v-1a.85.85 0 0 0-1.7 0v1.02c-1.55.2-2.75 1.2-2.75 2.63 0 1.66 1.4 2.28 2.8 2.72l.35.11c1.15.36 1.85.66 1.85 1.35 0 .66-.7 1.1-1.7 1.1-.86 0-1.6-.34-1.98-.9a.85.85 0 1 0-1.42.94c.65.98 1.75 1.5 2.85 1.62v1a.85.85 0 0 0 1.7 0v-1.03c1.6-.22 2.75-1.24 2.75-2.7 0-1.7-1.5-2.32-2.9-2.76l-.3-.1c-1.1-.34-1.8-.6-1.8-1.3 0-.6.65-1.03 1.55-1.03.7 0 1.3.24 1.7.68a.85.85 0 1 0 1.26-1.14c-.6-.66-1.45-1.06-2.26-1.21Z"/></svg></span>
        <h3>Unlock Elite Value</h3>
        <p>Up to 15% off the discounted price at selected restaurants.</p>
      </div>
      <div className="el-elite-card">
        <span className="el-icon"><svg viewBox="0 0 24 24"><path fill="#F2C464" d="M13.3 1.6a.9.9 0 0 1 .8 1.32L11.6 8.1h4.75a.9.9 0 0 1 .67 1.5l-9 10.8a.9.9 0 0 1-1.55-.78l1.6-7.1H3.9a.9.9 0 0 1-.7-1.46l9-9.2a.9.9 0 0 1 .64-.26Z"/></svg></span>
        <h3>Cut the Line</h3>
        <p>Priority handling on every order.</p>
      </div>
    </div>

    <p className="el-elite-tagline el-reveal el-d4">One membership. Unlimited cravings.</p>

  </div>
</section>




{/* ===== TESTIMONIALS ===== */}
<section className="witness-section">
  {/* small doodle circle */}
  <svg className="doodle" style={{'bottom': '10%', 'left': '2%', 'width': '80px'} as React.CSSProperties} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="32" stroke="var(--navy)" strokeWidth="2" strokeDasharray="6 5"/>
    <circle cx="40" cy="40" r="18" stroke="var(--orange)" strokeWidth="1.5" strokeDasharray="4 4"/>
  </svg>
  {/* NEW: doodle arrow pointing at stats */}
  <svg className="doodle-animated" style={{'bottom': '24%', 'right': '4%', 'width': '70px', '--dr': '12deg', 'opacity': '0.22'} as React.CSSProperties} viewBox="0 0 70 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12 C 22 4, 52 16, 64 40" stroke="var(--navy)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="5 4" fill="none"/>
    <path d="M56 42 L64 40 L60 32" stroke="var(--navy)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
  {/* NEW: doodle checkmark near testimonials */}
  <svg className="doodle-animated" style={{'top': '6%', 'right': '3%', 'width': '42px', 'opacity': '0.2'} as React.CSSProperties} viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21" cy="21" r="18" stroke="var(--teal)" strokeWidth="2" strokeDasharray="5 3"/>
    <path d="M12 21 L19 28 L30 14" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
  {/* doodle: noodle bowl with chopsticks */}
  <svg className="doodle" style={{'top': '32%', 'left': '2%', 'width': '50px', 'opacity': '0.16'} as React.CSSProperties} viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 24 Q6 44 30 44 Q54 44 54 24 Z" stroke="var(--navy)" strokeWidth="2" fill="none"/>
    <path d="M2 24 L58 24" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 20 Q20 14 26 20" stroke="var(--orange)" strokeWidth="1.6" fill="none"/>
    <path d="M30 18 Q36 12 42 18" stroke="var(--orange)" strokeWidth="1.6" fill="none"/>
    <line x1="38" y1="6" x2="50" y2="30" stroke="var(--terracotta)" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="44" y1="4" x2="56" y2="28" stroke="var(--terracotta)" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
  <span className="float-food" style={{'bottom': '4%', 'right': '2%', '--rot': '-6deg', '--rot2': '8deg', 'font-size': '22px', 'animation-delay': '.3s'} as React.CSSProperties}>🍱</span>
  <div className="wrap">
    <div className="sec-head reveal">
      <span className="sec-kicker">📼 INTERVIEW TRANSCRIPTS</span>
      <h2 className="font-display">Don't just trust us.<br /><span className="hl">Trust them.</span></h2>
    </div>
    <div className="witness-grid">
      <div className="witness-card reveal-tilt d1" style={{'--r': '-1.5deg'} as React.CSSProperties}>
        <div className="stars">★★★★★</div>
        <p className="quote">"Honestly, it's wild that my checkout total finally matched the menu price. No mystery fees, no 'convenience charge' out of nowhere, no surge tax at 11 pm. I paid exactly what I saw. <span className="hl">First food app that didn't make me feel low-key scammed</span> at the last step."</p>
        <div className="who"><span className="av"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg></span><div className="who-text"><span className="name">Ananya Sharma</span><span className="role">Verified Customer · Sector 29</span></div></div>
      </div>
      <div className="witness-card reveal-tilt d2" style={{'--r': '1.4deg'} as React.CSSProperties}>
        <div className="stars">★★★★★</div>
        <p className="quote">"The lower commission actually changed our numbers. We used to inflate menu prices just to break even after the big apps took their cut. <span className="hl-teal">Now we keep more of every order</span>, our prices stay honest, and customers keep coming back. Feels like an actual partnership."</p>
        <div className="who"><span className="av"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg></span><div className="who-text"><span className="name">Rohit Malhotra</span><span className="role">Restaurant Partner · Cyber Hub</span></div></div>
      </div>
      <div className="witness-card reveal-tilt d3" style={{'--r': '-1.1deg'} as React.CSSProperties}>
        <div className="stars">★★★★★</div>
        <p className="quote">"Everything's just clearer here. I know what I'm earning per order, the routes make sense, and I'm not chasing hidden deductions at the end of the week. <span className="hl">It's a fairer setup</span> for riders, restaurants, and customers alike. Wish I'd switched way sooner."</p>
        <div className="who"><span className="av"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg></span><div className="who-text"><span className="name">Sandeep Yadav</span><span className="role">Delivery Partner · DLF Phase 3</span></div></div>
      </div>
    </div>
    <div className="stats-strip reveal">
      <div className="stat"><span className="n" data-target="100">0</span><span className="l">+ RESTAURANT PARTNERS</span></div>
      <div className="stat"><span className="n" data-target="10000">0</span><span className="l">+ ORDERS DELIVERED</span></div>
      <div className="stat"><span className="n">4.8★</span><span className="l">RATING</span></div>
    </div>
    <p className="bottom-line reveal">Join the ones who already <span className="hl">made the switch.</span></p>
  </div>
</section>



{/* ===== BRAND MARQUEE ===== */}
<section className="brand-marquee-section" aria-label="Restaurants and brands on USTART">
  <div className="brand-marquee-track" id="brandMarqueeTrack">
    <img src="/assets/brands/biryani_by_kilo.png" alt="Biryani By Kilo" />
    <img src="/assets/brands/biryani_blues.png" alt="Biryani Blues" />
    <img src="/assets/brands/burger_singh.png" alt="Burger Singh" />
    <img src="/assets/brands/nomad_pizza.png" alt="Nomad Pizza" />
    <img src="/assets/brands/enzo.png" alt="Enzo's Pizza" />
    <img src="/assets/brands/chinese_wok.png" alt="Chinese Wok" />
    <img src="/assets/brands/nirula.png" alt="Nirula's" />
    <img src="/assets/brands/charcoal_eats.png" alt="Charcoal Eats" />
    <img src="/assets/brands/olio_pizza.png" alt="Olio Pizza" />
    <img src="/assets/brands/the_burger_club.png" alt="The Burger Club" />
    <img src="/assets/brands/louis_burger.png" alt="Louis Burger" />
    <img src="/assets/brands/crusto.png" alt="Crusto's" />
    <img src="/assets/brands/edesia.png" alt="Edesia" />
    <img src="/assets/brands/goila_butter_chicken.png" alt="Goila Butter Chicken" />
    <img src="/assets/brands/defence_bakery.png" alt="Defence Bakery" />
    <img src="/assets/brands/donburi.png" alt="Donburi" />
    {/* duplicate set for seamless infinite loop */}
    <img src="/assets/brands/biryani_by_kilo.png" alt="" aria-hidden="true" />
    <img src="/assets/brands/biryani_blues.png" alt="" aria-hidden="true" />
    <img src="/assets/brands/burger_singh.png" alt="" aria-hidden="true" />
    <img src="/assets/brands/nomad_pizza.png" alt="" aria-hidden="true" />
    <img src="/assets/brands/enzo.png" alt="" aria-hidden="true" />
    <img src="/assets/brands/chinese_wok.png" alt="" aria-hidden="true" />
    <img src="/assets/brands/nirula.png" alt="" aria-hidden="true" />
    <img src="/assets/brands/charcoal_eats.png" alt="" aria-hidden="true" />
    <img src="/assets/brands/olio_pizza.png" alt="" aria-hidden="true" />
    <img src="/assets/brands/the_burger_club.png" alt="" aria-hidden="true" />
    <img src="/assets/brands/louis_burger.png" alt="" aria-hidden="true" />
    <img src="/assets/brands/crusto.png" alt="" aria-hidden="true" />
    <img src="/assets/brands/edesia.png" alt="" aria-hidden="true" />
    <img src="/assets/brands/goila_butter_chicken.png" alt="" aria-hidden="true" />
    <img src="/assets/brands/defence_bakery.png" alt="" aria-hidden="true" />
    <img src="/assets/brands/donburi.png" alt="" aria-hidden="true" />
  </div>
</section>

{/* ===== FAQ ===== */}
<section className="faq-section" id="faq">
  {/* doodle: coffee cup */}
  <svg className="doodle" style={{'top': '7%', 'left': '3%', 'width': '46px', 'opacity': '0.22'} as React.CSSProperties} viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20 L10 46 Q10 52 16 52 L30 52 Q36 52 36 46 L36 20 Z" stroke="var(--terracotta)" strokeWidth="2" fill="none" strokeLinejoin="round"/>
    <path d="M36 24 Q46 24 46 32 Q46 40 36 38" stroke="var(--terracotta)" strokeWidth="2" fill="none"/>
    <path d="M16 8 Q14 12 17 15 Q20 18 18 22" stroke="var(--orange-dark)" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
    <path d="M26 8 Q24 12 27 15 Q30 18 28 22" stroke="var(--orange-dark)" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
  </svg>
  {/* doodle: donut */}
  <svg className="doodle" style={{'bottom': '8%', 'right': '4%', 'width': '44px', 'opacity': '0.2'} as React.CSSProperties} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="19" stroke="var(--terracotta)" strokeWidth="2" fill="none"/>
    <circle cx="25" cy="25" r="8" stroke="var(--terracotta)" strokeWidth="2" fill="none"/>
    <line x1="16" y1="14" x2="20" y2="11" stroke="var(--orange-dark)" strokeWidth="2" strokeLinecap="round"/>
    <line x1="30" y1="10" x2="33" y2="14" stroke="var(--orange-dark)" strokeWidth="2" strokeLinecap="round"/>
    <line x1="38" y1="22" x2="42" y2="20" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round"/>
    <line x1="14" y1="34" x2="10" y2="36" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
  <span className="float-food" style={{'top': '14%', 'right': '6%', '--rot': '8deg', '--rot2': '-6deg', 'font-size': '22px', 'animation-delay': '.5s'} as React.CSSProperties}>🍿</span>
  <span className="float-food" style={{'bottom': '16%', 'left': '6%', '--rot': '-7deg', '--rot2': '5deg', 'font-size': '22px', 'animation-delay': '1.4s'} as React.CSSProperties}>🥗</span>
  <div className="wrap">
    <div className="sec-head reveal">
      <span className="sec-kicker">🕵️ INTERROGATION ROOM</span>
      <h2 className="font-display">Everything You<br />Wanted to <span className="hl">Know.</span></h2>
    </div>
    <div className="faq-list" id="faqList">
      <div className="faq-item reveal d1">
        <button className="faq-q" onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}><span><span className="qtag">Q1.</span>Is USTART really more affordable than other apps?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">There's no hidden platform fee and no surprise charge waiting at checkout. The price you see on the menu is <strong>the exact price you pay</strong>. No plot twists, no "convenience" tax, no math you didn't agree to.</div></div>
      </div>
      <div className="faq-item reveal d2">
        <button className="faq-q" onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}><span><span className="qtag">Q2.</span>Which areas do you deliver to?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Right now, we're serving all of <strong>Gurugram</strong>, and we're adding new areas as fast as we can. Just drop your location into the app, and it'll tell you instantly whether we're already at your doorstep or on the way soon.</div></div>
      </div>
      <div className="faq-item reveal d3">
        <button className="faq-q" onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}><span><span className="qtag">Q3.</span>How is USTART better for restaurants?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">We charge <strong>lower commissions</strong> than the big apps, so restaurants keep more of what they actually earn. That means they don't have to inflate their menu prices just to survive, which keeps food affordable for you and margins healthy for them.</div></div>
      </div>
      <div className="faq-item reveal d4">
        <button className="faq-q" onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}><span><span className="qtag">Q4.</span>What is USTART Elite and is it worth it?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">It's our membership for regulars: free delivery on eligible orders, <strong>up to 15% extra off</strong> at select restaurants, priority handling, and early access to deals. If you order even semi-regularly, the savings stack up, and it pays for itself pretty fast.</div></div>
      </div>
      <div className="faq-item reveal d5">
        <button className="faq-q" onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}><span><span className="qtag">Q5.</span>Do you actually have no surge pricing?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">For real. Rain, rush hour, or a midnight craving: <strong>the price stays the same</strong>. We don't do "high demand" markups, ever. The whole point of USTART is that you never get punished for ordering at the wrong time.</div></div>
      </div>
      <div className="faq-item reveal d6">
        <button className="faq-q" onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}><span><span className="qtag">Q6.</span>How do I become a restaurant or delivery partner?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Easy — just tap "Put Us on the Menu" at the top of the page, or head to the Partner section in the footer. Fill in a few details, and our team will reach out to get you onboarded and set up fast.</div></div>
      </div>
    </div>
    <div className="reveal d6" style={{'text-align': 'center', 'margin-top': '36px'} as React.CSSProperties}>
      <Link to="/contact" className="btn btn-outline">🕵️ View All FAQs →</Link>
    </div>
  </div>
</section>



{/* ===== NEXTGEN CAMPUS LEADERS — HOME PAGE BANNER (links to full program page) ===== */}




{/* ===== FINAL CTA / DOWNLOAD (redesigned) ===== */}



<section className="dlx-download-section" id="download">
  <div className="dlx-streak dlx-s1"></div>
  <div className="dlx-streak dlx-s2"></div>

  {/* ambient premium glow blobs */}
  <div className="dlx-glow dlx-g1"></div>
  <div className="dlx-glow dlx-g2"></div>
  <div className="dlx-glow dlx-g3"></div>

  {/* extra floating doodles for a livelier stage */}
  <span className="dlx-float-food" style={{'top': '10%', 'left': '8%', '--rot': '-8deg', '--rot2': '6deg', 'animation-delay': '.2s'} as React.CSSProperties}>🍕</span>
  <span className="dlx-float-food" style={{'top': '18%', 'right': '10%', '--rot': '6deg', '--rot2': '-5deg', 'animation-delay': '1s', 'font-size': '26px'} as React.CSSProperties}>🥤</span>
  <span className="dlx-float-food" style={{'bottom': '14%', 'left': '6%', '--rot': '7deg', '--rot2': '-6deg', 'animation-delay': '1.6s', 'font-size': '22px'} as React.CSSProperties}>🍟</span>
  <span className="dlx-float-food" style={{'bottom': '20%', 'right': '7%', '--rot': '-6deg', '--rot2': '8deg', 'animation-delay': '.7s', 'font-size': '24px'} as React.CSSProperties}>🍰</span>
  <span className="dlx-spark" style={{'top': '24%', 'left': '22%', 'font-size': '20px'} as React.CSSProperties}>✦</span>
  <span className="dlx-spark" style={{'bottom': '26%', 'right': '20%', 'font-size': '16px', 'animation-delay': '.8s'} as React.CSSProperties}>✦</span>
  <span className="dlx-spark" style={{'top': '14%', 'right': '32%', 'font-size': '14px', 'animation-delay': '1.4s'} as React.CSSProperties}>✧</span>

  <div className="dlx-download-inner">

    {/* HEADING — together at the top */}
    <div className="dlx-dl-heading dlx-reveal">
      <h2 className="dlx-font-display">STOP FEEDING THE <span className="dlx-hl">FEES.</span><span className="dlx-line2">START FEEDING <span className="dlx-hl">YOURSELF.</span></span></h2>
      <p className="dlx-sub">Gurugram's fairest food delivery is one tap away. What are you waiting for?</p>
    </div>

    {/* STRUCTURED ROW: copy left · phone center · copy right, none overlapping */}
    <div className="dlx-dl-content">

      {/* LEFT COPY */}
      <div className="dlx-dl-col dlx-dl-col-left dlx-reveal-left">
        <div className="dlx-perk-col">
          <span className="dlx-perk dlx-perk-1"><span className="dlx-tick">✓</span>Fair prices</span>
          <span className="dlx-perk dlx-perk-2"><span className="dlx-tick">✓</span>No hidden fees</span>
        </div>
      </div>

      {/* CENTER: PHONE POPPING OUT OF A GLOWING PLATFORM */}
      <div className="dlx-phone-stage">
        <div className="dlx-phone-cutoff dlx-reveal" id="phoneCutoff">
          <div id="phoneFrame">
            <div className="dlx-phone-shell dlx-phone-bob">
              <div className="dlx-fresh-stamp">FAIR<br />PROMISE</div>
              <div className="dlx-phone-notch"></div>
              <div className="dlx-phone-screen">
                <div className="dlx-status-bar">
                  <span>9:41</span>
                  <span className="dlx-status-icons">
                    <svg viewBox="0 0 20 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="0.5"/><rect x="5" y="4" width="3" height="8" rx="0.5"/><rect x="10" y="1" width="3" height="11" rx="0.5"/></svg>
                    <svg viewBox="0 0 24 12" fill="currentColor"><rect x="0" y="1" width="20" height="10" rx="2.5" stroke="currentColor" strokeWidth="1" fill="none"/><rect x="1.5" y="2.5" width="14" height="7" rx="1.5"/><rect x="21" y="4" width="2" height="4" rx="1"/></svg>
                  </span>
                </div>
                <span className="dlx-screen-badge">Get Started</span>
                <p className="dlx-screen-heading">Fair food.<br /><span className="dlx-accent">Zero fees.</span></p>
                <p className="dlx-screen-sub">Tap below, we'll take it from here</p>

                <a href="#" className="dlx-screen-store-btn apple">
                  <svg viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                  <span className="dlx-badge-txt"><span className="dlx-small">Download on the</span><span className="dlx-big">App Store</span></span>
                </a>
                <a href="#" className="dlx-screen-store-btn dlx-google">
                  <svg viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                  <span className="dlx-badge-txt"><span className="dlx-small">Get it on</span><span className="dlx-big">Google Play</span></span>
                </a>

                <div className="dlx-screen-footnote"><span className="dlx-dot dlx-pulse-dot"></span>Live in Gurugram</div>
              </div>
            </div>
          </div>
        </div>

        <div className="dlx-surface dlx-reveal dlx-d2">
          <div className="dlx-surface-ring"></div>
        </div>
      </div>

      {/* RIGHT COPY */}
      <div className="dlx-dl-col dlx-dl-col-right dlx-reveal-right dlx-d2">
        <div className="dlx-perk-col">
          <span className="dlx-perk dlx-perk-3"><span className="dlx-tick">✓</span>Fast delivery</span>
          <span className="dlx-perk dlx-perk-4"><span className="dlx-tick">✓</span>Members-only perks</span>
        </div>
      </div>

    </div>
  </div>

  <div className="dlx-dl-bottom-strip dlx-reveal dlx-d4">
    <p>Available on iOS &amp; Android · Gurugram, India</p>
  </div>
</section>




<section className="ambx-banner" id="campus-leaders">
  <div className="ambx-orb ambx-orb-1"></div>
  <div className="ambx-orb ambx-orb-2"></div>
  <div className="ambx-orb ambx-orb-3"></div>
  <span className="ambx-float" style={{'top': '14%', 'left': '6%', '--r': '-8deg', '--r2': '5deg'} as React.CSSProperties}>🎓</span>
  <span className="ambx-float" style={{'bottom': '16%', 'left': '16%', '--r': '6deg', '--r2': '-4deg', 'animation-delay': '.8s'} as React.CSSProperties}>🏅</span>
  <span className="ambx-float" style={{'top': '20%', 'right': '22%', '--r': '5deg', '--r2': '-6deg', 'animation-delay': '1.4s'} as React.CSSProperties}>🚀</span>

  <div className="ambx-inner">
    <div className="ambx-left">
      <div className="ambx-icon-badge">🎓</div>
      <div className="ambx-copy-wrap">
        <span className="ambx-kicker"><span className="ambx-dot"></span>Founding Batch Open</span>
        <div className="ambx-copy">
          <h3>USTART <span className="ambx-accent">NextGen Campus Leaders</span> Program</h3>
          <p>Become a Creator. Build a Community. Lead from your campus.</p>
        </div>
        <div className="ambx-perks">
          <span className="ambx-perk"><span className="ambx-tick">✓</span>0₹ to join</span>
          <span className="ambx-perk"><span className="ambx-tick">✓</span>Verified certificates</span>
          <span className="ambx-perk"><span className="ambx-tick">✓</span>Founder mentorship</span>
        </div>
      </div>
    </div>

    <div className="ambx-right">
      <div className="ambx-count">
        <div className="ambx-n">4+</div>
        <div className="ambx-l">Badges & Certs</div>
      </div>
      <a href="/nextgen-campus-leaders" className="ambx-cta">
        <span>Apply Now</span>
        <span className="ambx-arrow">→</span>
      </a>
    </div>
  </div>
</section>

{/* ===== FOOTER ===== */}
<Footer />



    </>
  );
}

export default HomePage;
