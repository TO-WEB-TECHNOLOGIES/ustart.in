import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

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
      <Header />

{/* ===== CAREERS HERO (Rapido-inspired) ===== */}

<header className="careers-hero">
  <div className="careers-hero-orb"></div>
  <div className="careers-hero-inner">
    <h1 className="reveal d1">Be a part of <span style={{ color: "var(--orange)" }}>our team.</span></h1>
    <p className="reveal d2">We are so glad you want to join us in exploring a world of endless opportunities at USTART. Let's find a spot for you.</p>
    <a href="jobs.html" className="btn btn-solid reveal d3">View Jobs</a>
  </div>
</header>

{/* ===== WHY WORK WITH US ===== */}
<section className="why-work-section">
  <div className="why-work-inner">
    <h2 className="reveal">Why work with us</h2>
    <div className="why-work-underline reveal"></div>
    <div className="why-work-grid">
      <div className="why-work-item reveal d1">
        <div className="why-work-icon">💸</div>
        <p>We pride ourselves on rewarding great work with great compensation.</p>
      </div>
      <div className="why-work-item reveal d2">
        <div className="why-work-icon">🕒</div>
        <p>Flexible hours and vacation. Night owls welcome.</p>
      </div>
      <div className="why-work-item reveal d3">
        <div className="why-work-icon">🤝</div>
        <p>Meet new cultures and enjoy our crew from all over the world.</p>
      </div>
    </div>
  </div>
</section>

{/* ===== RIDE WITH US / PARTNER WITH US ===== */}


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
        <a href="influencer.html" className="ambx-cta">
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

{/* ===== STUDENT AMBASSADOR PROGRAM ===== */}

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
        <div className="pc-stat"><b>30k+</b><span>ORDERS DELIVERED</span></div>
        <div className="pc-stat"><b>0</b><span>HIDDEN CHARGES</span></div>
      </div>
      <p>Earn on your own schedule with transparent payouts, fair incentives, and zero hidden deductions — every single trip.</p>
      <a href="ustart_final.html#download" className="btn btn-gold btn-lg">🛵 Ride With Us</a>
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
      <a href="http://partners.ustart.in/" className="btn btn-gold btn-lg">🤝 Partner With Us</a>
    </div>
  </div>
</section>

{/* ===== FOOTER ===== */}
<Footer />


    </div>
  );
};
