'use client';

import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import { PageHero } from '../components/PageHero';
import { Footer } from '../components/Footer';
import { PARTNER_URL } from '../constants';

export const CareersPage: React.FC = () => {

  useEffect(() => {
    // Re-initialize scroll reveal observer for careers page elements
    const revealEls = document.querySelectorAll('.reveal, .reveal-tilt, .reveal-scale, .reveal-stamp, .reveal-left, .reveal-right, .reveal-pop, .reveal-flip, .sv-reveal, .sv-reveal-tilt, .sv-reveal-pop, .el-reveal, .dlx-reveal, .dlx-reveal-left, .dlx-reveal-right');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          entry.target.classList.add('sv-is-in');
          entry.target.classList.add('el-is-in');
          entry.target.classList.add('dlx-is-in');
        }
      });
    }, { threshold: 0.08 });

    revealEls.forEach(el => observer.observe(el));

    // Dynamic rotating badge stamps if present
    const badges = document.querySelectorAll('.dlx-badge-wrap');
    badges.forEach(badge => {
      const stamp = badge.querySelector('.dlx-badge-stamp') as HTMLElement;
      if (stamp) {
        let rotation = 0;
        const handleScroll = () => {
          rotation = window.scrollY * 0.15;
          stamp.style.transform = `rotate(${rotation}deg)`;
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }
    });

    return () => {
      revealEls.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="about-page-wrapper">
      <Header variant="overlay" />

{/* ===== CAREERS HERO ===== */}
<PageHero
  kicker="🚀 FRESH FROM GURUGRAM · CAREERS"
  title={<>Be a part of <span>our team.</span></>}
  subtitle="We are so glad you want to join us in exploring a world of endless opportunities at USTART. Let's find a spot for you."
  focal="30% 55%"
  tint="rgba(232,194,106,0.18)"
>
  {/* <a href="/contact" className="btn btn-solid btn-lg">View Jobs</a> */}
</PageHero>

{/* ===== WHY WORK WITH US ===== */}
<section className="why-work-section">
  <div className="why-work-inner">
    <div className="why-work-header reveal">
      <span className="sec-kicker">✨ PERKS & CULTURE</span>
      <h2 className="font-display" style={{ fontSize: "clamp(1.8rem,3.6vw,2.5rem)", color: "var(--navy)", margin: "14px 0 10px" }}>
        Why work with <span style={{ color: "var(--orange)" }}>USTART.</span>
      </h2>
      <p style={{ color: "var(--slate)", fontSize: "16px", maxWidth: "560px", lineHeight: "1.6" }}>
        We're building a high-trust, high-velocity team where your craft is valued, your schedule is respected, and your growth is real.
      </p>
    </div>

    <div className="why-work-grid">
      {/* CARD 1: COMPENSATION */}
      <div className="why-work-card why-work-amber reveal d1">
        <div className="why-work-card-top">
          <div className="why-work-icon-box icon-amber">
            <svg className="why-work-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="11" width="40" height="26" rx="7" fill="url(#amber-bg)" fillOpacity="0.2" />
              <rect x="4" y="11" width="40" height="26" rx="7" stroke="url(#amber-stroke)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="9" y="16" width="30" height="16" rx="4" stroke="url(#amber-stroke)" strokeWidth="1.4" strokeDasharray="3 3" strokeOpacity="0.6" />
              <circle cx="24" cy="24" r="5.5" fill="url(#amber-glow)" fillOpacity="0.35" stroke="url(#amber-stroke)" strokeWidth="2" />
              <circle cx="24" cy="24" r="2.2" fill="url(#amber-stroke)" />
              <circle cx="12" cy="18.5" r="1.4" fill="url(#amber-stroke)" />
              <circle cx="36" cy="18.5" r="1.4" fill="url(#amber-stroke)" />
              <circle cx="12" cy="29.5" r="1.4" fill="url(#amber-stroke)" />
              <circle cx="36" cy="29.5" r="1.4" fill="url(#amber-stroke)" />
              <path d="M38 5L39.3 8.7L43 10L39.3 11.3L38 15L36.7 11.3L33 10L36.7 8.7L38 5Z" fill="#FF9F43" />
              <defs>
                <linearGradient id="amber-bg" x1="4" y1="11" x2="44" y2="37" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF9F43" />
                  <stop offset="1" stopColor="#E8841F" />
                </linearGradient>
                <linearGradient id="amber-stroke" x1="4" y1="11" x2="44" y2="37" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF9F43" />
                  <stop offset="1" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="amber-glow" x1="18.5" y1="18.5" x2="29.5" y2="29.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDE68A" />
                  <stop offset="1" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="why-work-tag tag-amber">01 · REWARDS</span>
        </div>
        <h3>Top-Tier Rewards</h3>
        <p>We pride ourselves on rewarding great work with great compensation, equity, and performance incentives.</p>
      </div>

      {/* CARD 2: FLEXIBILITY */}
      <div className="why-work-card why-work-teal reveal d2">
        <div className="why-work-card-top">
          <div className="why-work-icon-box icon-teal">
            <svg className="why-work-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="18" fill="url(#teal-bg)" fillOpacity="0.18" />
              <circle cx="24" cy="24" r="18" stroke="url(#teal-stroke)" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="24" cy="24" r="13.5" stroke="url(#teal-stroke)" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.5" />
              <path d="M24 24L17.5 16.5" stroke="url(#teal-stroke)" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M24 24L31 20" stroke="url(#teal-stroke)" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="24" cy="24" r="3" fill="#10B981" stroke="url(#teal-stroke)" strokeWidth="1.5" />
              <line x1="24" y1="8.5" x2="24" y2="10.5" stroke="url(#teal-stroke)" strokeWidth="2" strokeLinecap="round" />
              <line x1="39.5" y1="24" x2="37.5" y2="24" stroke="url(#teal-stroke)" strokeWidth="2" strokeLinecap="round" />
              <line x1="24" y1="39.5" x2="24" y2="37.5" stroke="url(#teal-stroke)" strokeWidth="2" strokeLinecap="round" />
              <line x1="8.5" y1="24" x2="10.5" y2="24" stroke="url(#teal-stroke)" strokeWidth="2" strokeLinecap="round" />
              <path d="M38 6L39.2 9L42 10.2L39.2 11.4L38 14.5L36.8 11.4L34 10.2L36.8 9L38 6Z" fill="#10B981" />
              <defs>
                <linearGradient id="teal-bg" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#539987" />
                  <stop offset="1" stopColor="#10B981" />
                </linearGradient>
                <linearGradient id="teal-stroke" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#539987" />
                  <stop offset="1" stopColor="#0D9488" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="why-work-tag tag-teal">02 · AUTONOMY</span>
        </div>
        <h3>True Flexibility</h3>
        <p>Flexible hours, hybrid freedom, and unlimited trust. Night owls, early birds, and creators all welcome.</p>
      </div>

      {/* CARD 3: GLOBAL CULTURE */}
      <div className="why-work-card why-work-coral reveal d3">
        <div className="why-work-card-top">
          <div className="why-work-icon-box icon-coral">
            <svg className="why-work-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="18" fill="url(#coral-bg)" fillOpacity="0.18" />
              <circle cx="24" cy="24" r="18" stroke="url(#coral-stroke)" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="6.5" y1="24" x2="41.5" y2="24" stroke="url(#coral-stroke)" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="24" cy="24" rx="8.5" ry="18" stroke="url(#coral-stroke)" strokeWidth="2" strokeLinecap="round" />
              <path d="M9.5 14.5C14 17 34 17 38.5 14.5" stroke="url(#coral-stroke)" strokeWidth="1.4" strokeDasharray="3 3" strokeOpacity="0.65" />
              <path d="M9.5 33.5C14 31 34 31 38.5 33.5" stroke="url(#coral-stroke)" strokeWidth="1.4" strokeDasharray="3 3" strokeOpacity="0.65" />
              <circle cx="15.5" cy="24" r="2.2" fill="#E11D48" />
              <circle cx="24" cy="17.5" r="2.2" fill="#EA580C" />
              <circle cx="32.5" cy="24" r="2.2" fill="#C0563F" />
              <circle cx="24" cy="30.5" r="2.2" fill="#E11D48" />
              <path d="M39 6L40.2 9.2L43.4 10.4L40.2 11.6L39 14.8L37.8 11.6L34.6 10.4L37.8 9.2L39 6Z" fill="#EA580C" />
              <defs>
                <linearGradient id="coral-bg" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C0563F" />
                  <stop offset="1" stopColor="#E11D48" />
                </linearGradient>
                <linearGradient id="coral-stroke" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C0563F" />
                  <stop offset="1" stopColor="#9C4330" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="why-work-tag tag-coral">03 · COMMUNITY</span>
        </div>
        <h3>Global Culture</h3>
        <p>Meet diverse cultures and collaborate with a bold, forward-thinking team solving hard challenges daily.</p>
      </div>
    </div>
  </div>
</section>

{/* ===== STUDENT AMBASSADOR / PROGRAM STATS SECTION (COMMENTED OUT) ===== */}
{/*
<section className="sap-section" id="student">
  <section className="ambx-banner">
    <div className="ambx-orb ambx-orb-1"></div>
    <div className="ambx-orb ambx-orb-2"></div>
    <div className="ambx-orb ambx-orb-3"></div>
    <span className="ambx-float" style={{ top: "14%", left: "6%", "--r": "-8deg", "--r2": "5deg" } as React.CSSProperties}>🎓</span>
    <span className="ambx-float" style={{ bottom: "16%", left: "16%", "--r": "6deg", "--r2": "-4deg", animationDelay: ".8s" } as React.CSSProperties}>🏅</span>
    <span className="ambx-float" style={{ top: "20%", right: "22%", "--r": "5deg", "--r2": "-6deg", animationDelay: "1.4s" } as React.CSSProperties}>🚀</span>
    <div className="ambx-inner">
      <div className="ambx-left">
        <div className="ambx-icon-badge">🎓</div>
        <div className="ambx-copy-wrap">
          <span className="ambx-kicker"><span className="dot"></span>Founding Batch Open</span>
          <div className="ambx-copy">
            <h3>USTART <span className="accent">NextGen Campus Leaders</span> Program</h3>
            <p>Become a Creator. Build a Community. Lead from your campus.</p>
          </div>
          <div className="ambx-perks">
            <span className="ambx-perk"><span className="tick">✓</span>0₹ to join</span>
            <span className="ambx-perk"><span className="tick">✓</span>Verified certificates</span>
            <span className="ambx-perk"><span className="tick">✓</span>Founder mentorship</span>
          </div>
        </div>
      </div>
      <div className="ambx-right">
        <div className="ambx-count">
          <div className="n">4+</div>
          <div className="l">Badges & Certs</div>
        </div>
        <a href="/nextgen-campus-leaders" className="ambx-cta">
          <span>Apply Now</span>
          <span className="arrow">→</span>
        </a>
      </div>
    </div>
  </section>

  <div style={{ height: "22px" }}></div>

  <section className="ambx-banner">
    <div className="ambx-orb ambx-orb-1" style={{ background: "radial-gradient(circle,rgba(83,153,135,0.20),transparent 70%)" }}></div>
    <div className="ambx-orb ambx-orb-2"></div>
    <div className="ambx-orb ambx-orb-3"></div>
    <span className="ambx-float" style={{ top: "14%", left: "6%", "--r": "-8deg", "--r2": "5deg" } as React.CSSProperties}>📸</span>
    <span className="ambx-float" style={{ bottom: "16%", left: "16%", "--r": "6deg", "--r2": "-4deg", animationDelay: ".8s" } as React.CSSProperties}>🎬</span>
    <span className="ambx-float" style={{ top: "20%", right: "22%", "--r": "5deg", "--r2": "-6deg", animationDelay: "1.4s" } as React.CSSProperties}>✨</span>
    <div className="ambx-inner">
      <div className="ambx-left">
        <div className="ambx-icon-badge">📸</div>
        <div className="ambx-copy-wrap">
          <span className="ambx-kicker"><span className="dot"></span>Founding Batch Open</span>
          <div className="ambx-copy">
            <h3>USTART <span className="accent">GenZ Influencer</span> Program</h3>
            <p>You're already famous on campus. Let's make it count.</p>
          </div>
          <div className="ambx-perks">
            <span className="ambx-perk"><span className="tick">✓</span>Your own coupon code</span>
            <span className="ambx-perk"><span className="tick">✓</span>Campaign certificate</span>
            <span className="ambx-perk"><span className="tick">✓</span>Featured on USTART</span>
          </div>
        </div>
      </div>
      <div className="ambx-right">
        <div className="ambx-count">
          <div className="n">4+</div>
          <div className="l">Perks & Rewards</div>
        </div>
        <a href="/nextgen-campus-leaders" className="ambx-cta">
          <span>Apply Now</span>
          <span className="arrow">→</span>
        </a>
      </div>
    </div>
  </section>

  <div className="sap-wrap">
    <div className="sap-tag">By The Numbers</div>
    <h2 className="sap-heading">Program <span>Stats</span></h2>
    <div className="sap-stats">
      <div className="sap-stat"><span className="sap-stat-n">∞</span><span className="sap-stat-l">Campus Reach</span></div>
      <div className="sap-stat"><span className="sap-stat-n">0₹</span><span className="sap-stat-l">Cost to Join</span></div>
      <div className="sap-stat"><span className="sap-stat-n">4+</span><span className="sap-stat-l">Certificates & Badges</span></div>
      <div className="sap-stat"><span className="sap-stat-n">100%</span><span className="sap-stat-l">Real Startup Work</span></div>
    </div>
  </div>
</section>
*/}

{/* ===== CTA SECTION ===== */}
{/*
<section className="premium-cta-section" id="partner-ride">
  <div className="premium-cta-head reveal">
    <span className="sec-kicker">🧭 WAYS TO WORK WITH US</span>
    <h2 className="font-display" style={{ marginTop: "16px" }}>Two Roads Into <span style={{ color: "var(--orange)" }}>The USTART Family.</span></h2>
    <p style={{ fontFamily: "'Manrope',sans-serif", color: "var(--slate)", marginTop: "10px" }}>Whether you're craving a ride or a partnership — there's a seat at this table.</p>
  </div>
  <div className="premium-cta-grid">
    <div className="premium-card reveal-left">
      <div className="pc-corner tl"></div><div className="pc-corner tr"></div>
      <div className="pc-bg"><img src="assets/hero_bg.jpg" alt="Rider delivering food" /></div>
      <div className="pc-overlay"></div>
      <span className="pc-kicker">🛵 For Delivery Partners</span>
      <h3>Ride With <span>USTART.</span></h3>
      <div className="pc-stats">
        <div className="pc-stat"><b>100+</b><span>ORDERS DELIVERED</span></div>
        <div className="pc-stat"><b>6,000+</b><span>RESTAURANT PARTNERS</span></div>
      </div>
      <p>Earn on your own schedule with transparent payouts, fair incentives, and zero hidden deductions — every single trip.</p>
      <a href="/contact" className="btn btn-gold btn-lg">🛵 Ride With Us</a>
    </div>
    <div className="premium-card reveal-right">
      <div className="pc-corner tl"></div><div className="pc-corner tr"></div>
      <div className="pc-bg"><img src="assets/hero_bg.jpg" alt="Restaurant kitchen preparing food" /></div>
      <div className="pc-overlay"></div>
      <span className="pc-kicker">🤝 For Restaurants</span>
      <h3>Partner With <span>USTART.</span></h3>
      <div className="pc-stats">
        <div className="pc-stat"><b>Low</b><span>COMMISSION RATES</span></div>
        <div className="pc-stat"><b>100%</b><span>PAYOUT TRANSPARENCY</span></div>
      </div>
      <p>Grow your kitchen with a platform that keeps more money in your pocket and treats you as a true partner, not just a vendor.</p>
      <a href={PARTNER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg">🤝 Partner With Us</a>
    </div>
  </div>
</section>
*/}

{/* ===== CAREERS DIRECT APPLICATION CALLOUT ===== */}
<section className="careers-apply-section reveal-scale">
  <div className="careers-apply-card">
    <div className="careers-apply-badge">
      <span>🚀</span> CAREERS AT USTART
    </div>
    <h3 className="careers-apply-heading">
      Feel fit to join <span className="highlight">USTART?</span>
    </h3>
    <p className="careers-apply-desc">
      Mail your resume to{' '}
      <a href="mailto:hr@ustart.in" className="careers-apply-email">
        hr@ustart.in
      </a>
      {' '}. We like innovative application emails.
    </p>
  </div>
</section>

{/* ===== FOOTER ===== */}
<Footer />


    </div>
  );
};
