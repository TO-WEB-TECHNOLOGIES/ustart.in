import React, { useState, useEffect } from 'react';
import { ReceiptText, Handshake, Zap, Leaf, UserCheck, ChefHat, MapPin } from 'lucide-react';
import { Header } from '../components/Header';
import { PageHero } from '../components/PageHero';
import { Footer } from '../components/Footer';

export const AboutPage: React.FC = () => {
  const [marqueeOpen, setMarqueeOpen] = useState(false);

  useEffect(() => {
    // Re-initialize scroll reveal observer for about page elements
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

{/* ===== ABOUT HERO ===== */}
<PageHero
  kicker="🍽️ FRESH FROM GURUGRAM · ABOUT US"
  title={<>The People Behind <span>Your Next Meal.</span></>}
  subtitle="Born from one idea: fair food delivery for everyone."
  focal="center 68%"
  tint="rgba(255,159,67,0.18)"
/>
{/* ===== OUR STORY ===== */}

<section className="story-section">
  <svg className="doodle-animated" style={{ top: "8%", right: "4%", width: "64px", opacity: "0.16" }} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="35" cy="35" r="26" stroke="var(--terracotta)" stroke-width="2" stroke-dasharray="5 6"/>
    <path d="M35 16 L35 26 M35 44 L35 54 M16 35 L26 35 M44 35 L54 35" stroke="var(--orange)" stroke-width="2.4" stroke-linecap="round"/>
  </svg>
  <span className="float-food" style={{ top: "4%", left: "2%", "--rot": "-8deg", "--rot2": "5deg", fontSize: "30px" } as React.CSSProperties}>🥗</span>
  <div className="story-grid">
    <div className="story-text reveal-left">
      <span className="sec-kicker">🍳 WHO WE ARE</span>
      <h2 className="font-display" style={{ fontSize: "clamp(1.7rem,3.4vw,2.4rem)", color: "var(--navy)", margin: "16px 0 18px" }}>A Platform Built Around The Table.</h2>
      <p><strong>USTART doesn't own restaurants or cook the food</strong> — we build the tech, marketplace, and logistics that connect customers, restaurant partners, and delivery riders in one seamless ecosystem.</p>
      <p>Restaurants stay independent and focus on what they do best. We handle discovery, payments, and delivery — bringing demand and supply together with transparent, fair terms for everyone at the table.</p>
      <div className="story-img-wrap reveal d2" style={{ marginTop: "24px", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--soft-shadow)" }}>
        <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80" alt="Delicious Indian food spread" style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }} />
      </div>
    </div>
    <div className="story-cards-wrap">
      <div className="story-card reveal-right d1">
        <div className="num">
          <UserCheck size={22} strokeWidth={2.2} />
        </div>
        <h4>For You, The Customer</h4>
        <p>Every fee is visible upfront. No checkout surprises, ever.</p>
      </div>
      <div className="story-card reveal-right d2">
        <div className="num">
          <ChefHat size={22} strokeWidth={2.2} />
        </div>
        <h4>Fair to Restaurants</h4>
        <p>Lower commissions so local kitchens actually keep what they earn.</p>
      </div>
      <div className="story-card reveal-right d3">
        <div className="num">
          <MapPin size={22} strokeWidth={2.2} />
        </div>
        <h4>Made in Gurugram</h4>
        <p>Built for this city first — by people who order from here too.</p>
      </div>
    </div>
  </div>
</section>
{/* ===== CO-FOUNDERS ===== */}

<section className="founders-section">
  <div className="founders-head reveal">
    <span className="sec-kicker">👨‍🍳 THE FOUNDERS</span>
    <h2 className="font-display">Meet the Co-Founders.</h2>
    <p>Two BML Munjal University graduates who decided the food delivery industry needed a rewrite — and started cooking one up themselves.</p>
  </div>
  <div className="founders-grid">
    <div className="founder-card reveal-left">
      <div className="founder-file-tag">🍽️ AT THE HELM</div>
      <div className="founder-avatar">RG</div>
      <h3>Rishabh Goel</h3>
      <span className="founder-role">Co-Founder & CEO</span>
      <p>Driven by a vision to make food delivery fairer for everyone, Rishabh Goel founded USTART to challenge industry norms and create a platform built on transparency, trust, and innovation. An MBA graduate from BML Munjal University, he combines entrepreneurial ambition with customer-centric thinking, leading USTART's mission to empower restaurants, delight customers, and create meaningful opportunities across India's food ecosystem.</p>
      <div className="founder-tags">
        <span className="alt">Strategy & Vision</span>
      </div>
    </div>
    <div className="founder-card reveal-right">
      <div className="founder-file-tag">⚙️ BUILDING THE STACK</div>
      <div className="founder-avatar">YG</div>
      <h3>Yash Gupta</h3>
      <span className="founder-role">Co-Founder & CTO</span>
      <p>Yash Gupta is the technology force behind USTART, transforming ambitious ideas into scalable digital solutions. A Computer Science Engineer from BML Munjal University, he is passionate about building technology that solves real-world problems. With a focus on innovation, AI-driven systems, and seamless user experiences, Yash is helping shape the future of food-tech through technology that empowers businesses and simplifies lives.</p>
      <div className="founder-tags">
        <span className="alt">Engineering & AI</span>
      </div>
    </div>
  </div>
  <div className="reveal" style={{ textAlign: "center", marginTop: "40px", position: "relative", zIndex: "2" }}>
    <a href="career.html#team" className="btn btn-outline" style={{ borderColor: "rgba(255,159,67,0.4)", color: "#fff" }}>👥 Meet the Team</a>
  </div>
</section>
{/* ===== TRUST + FOOD GALLERY ===== */}

<section className="trust-gallery">
  <svg className="doodle" style={{ width: "60px", top: "4%", left: "2%", opacity: "0.18" }} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 8 C36 8 40 14 40 20 C40 28 30 40 30 40 C30 40 20 28 20 20 C20 14 24 8 30 8Z" stroke="var(--orange)" stroke-width="2"/>
    <circle cx="30" cy="20" r="4" stroke="var(--orange)" stroke-width="2"/>
  </svg>
  <svg className="doodle" style={{ width: "70px", top: "6%", right: "3%", opacity: "0.16" }} viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 35 Q10 10 35 10 Q60 10 60 35" stroke="var(--teal)" stroke-width="2" stroke-dasharray="5 6" stroke-linecap="round"/>
    <path d="M15 35 L55 35" stroke="var(--terracotta)" stroke-width="2.2" stroke-linecap="round"/>
  </svg>
  <div className="sec-head reveal">
    <span className="sec-kicker">🍛 TASTE THE TRUST</span>
    <h2 className="font-display">Real Food. Real Kitchens. Real Fairness.</h2>
    <p>A peek at what's cooking on USTART right now.</p>
  </div>
  <div className="trust-strip">
    <div className="trust-card reveal-scale">
      <div className="trust-photo">
        <img src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80" alt="Biryani" />
        <span className="badge-caption">🍛 Biryani</span>
      </div>
      <div className="trust-brand-strip">
        <img src="/assets/brands/biryani_blues.png" alt="Biryani Blues logo" />
        <span>Biryani Blues</span>
      </div>
    </div>
    <div className="trust-card reveal-scale d1">
      <div className="trust-photo">
        <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80" alt="Butter Chicken" />
        <span className="badge-caption">🧈 Butter Chicken</span>
      </div>
      <div className="trust-brand-strip">
        <img src="/assets/brands/goila_butter_chicken.png" alt="Goila Butter Chicken logo" />
        <span>Goila Butter Chicken</span>
      </div>
    </div>
    <div className="trust-card reveal-scale d2">
      <div className="trust-photo">
        <img src="https://images.unsplash.com/photo-1585032226651-759a68395ec6?auto=format&fit=crop&w=800&q=80" alt="Noodles" />
        <span className="badge-caption">🍜 Noodles</span>
      </div>
      <div className="trust-brand-strip">
        <img src="/assets/brands/chinese_wok.png" alt="Chinese Wok logo" />
        <span>Chinese Wok</span>
      </div>
    </div>
    <div className="trust-card reveal-scale d3">
      <div className="trust-photo">
        <img src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80" alt="Ice Cream" />
        <span className="badge-caption">🍨 Ice Cream</span>
      </div>
      <div className="trust-brand-strip">
        <img src="/assets/brands/baskin_robbins.png" alt="Baskin Robbins logo" />
        <span>Baskin Robbins</span>
      </div>
    </div>
    <div className="trust-card reveal-scale d4">
      <div className="trust-photo">
        <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" alt="Pizza" />
        <span className="badge-caption">🍕 Pizza</span>
      </div>
      <div className="trust-brand-strip">
        <img src="/assets/brands/nomad_pizza.png" alt="Nomad Pizza logo" />
        <span>Nomad Pizza</span>
      </div>
    </div>
    <div className="trust-card reveal-scale d5">
      <div className="trust-photo">
        <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" alt="Burger" />
        <span className="badge-caption">🍔 Burger</span>
      </div>
      <div className="trust-brand-strip">
        <img src="/assets/brands/louis_burger.png" alt="Louis Burger logo" />
        <span>Louis Burger</span>
      </div>
    </div>
  </div>
  <div className="trust-more reveal" style={{ textAlign: "center", marginTop: "34px" }}>
    <button type="button" onClick={() => setMarqueeOpen(!marqueeOpen)} style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#fff", border: "1px dashed var(--line)", boxShadow: "var(--soft-shadow)", padding: "12px 22px", borderRadius: "999px", fontFamily: "'Manrope',sans-serif", fontWeight: "700", fontSize: "14px", color: "var(--navy)", cursor: "pointer" }}>
      <span className="tm-chev" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,159,67,0.16)", color: "var(--orange-dark)", fontSize: "16px" }}>
        {marqueeOpen ? '−' : '➕'}
      </span>
      & many more favourites waiting on USTART
    </button>
  </div>

<div className={`taste-marquee-reveal ${marqueeOpen ? 'open' : ''}`} id="tasteMarqueeReveal">
<section className="taste-marquee-section" aria-label="Restaurants and brands on USTART">
  <div className="taste-marquee-track" id="tasteMarqueeTrack">
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
</div>

</section>
{/* ===== VALUES STRIP ===== */}

<section className="values-section">
  <svg className="doodle" style={{ width: "120px", top: "-20px", left: "-30px", opacity: "0.12" }} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="42" stroke="var(--gold)" stroke-width="2" stroke-dasharray="6 7"/>
    <path d="M60 30 L60 42 M60 78 L60 90 M30 60 L42 60 M78 60 L90 60" stroke="var(--gold-bright)" stroke-width="2.4" stroke-linecap="round"/>
  </svg>
  <svg className="doodle" style={{ width: "90px", bottom: "-10px", right: "-20px", opacity: "0.12" }} viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 45 Q10 15 45 15 Q80 15 80 45 Q80 75 45 75 Q10 75 10 45Z" stroke="var(--gold)" stroke-width="2" stroke-dasharray="4 6"/>
  </svg>
  <span className="float-food" style={{ top: "6%", left: "3%", "--rot": "-10deg", "--rot2": "6deg", fontSize: "26px", opacity: "0.35" } as React.CSSProperties}>🍴</span>
  <span className="float-food" style={{ bottom: "8%", right: "4%", "--rot": "8deg", "--rot2": "-6deg", fontSize: "24px", opacity: "0.35", animationDelay: "1s" } as React.CSSProperties}>🌿</span>
  <div className="sec-head reveal">
    <span className="sec-kicker">✨ OUR VALUES</span>
    <h2 className="font-display">What We Stand For.</h2>
    <p>Four ingredients. Non-negotiable.</p>
  </div>
  <div className="values-grid">
    <div className="value-item reveal-pop d1">
      <span className="num-tag">01</span>
      <div className="icon-badge">
        <ReceiptText size={26} strokeWidth={2.2} />
      </div>
      <h4>Transparency</h4>
      <p>The price you see is the price you pay. Always. No checkout surprises.</p>
    </div>
    <div className="value-item reveal-pop d2">
      <span className="num-tag">02</span>
      <div className="icon-badge">
        <Handshake size={26} strokeWidth={2.2} />
      </div>
      <h4>Fairness</h4>
      <p>For customers, restaurants, and delivery partners alike — built on trust.</p>
    </div>
    <div className="value-item reveal-pop d3">
      <span className="num-tag">03</span>
      <div className="icon-badge">
        <Zap size={26} strokeWidth={2.2} />
      </div>
      <h4>Speed</h4>
      <p>Fast delivery without cutting corners on fairness or quality.</p>
    </div>
    <div className="value-item reveal-pop d4">
      <span className="num-tag">04</span>
      <div className="icon-badge">
        <Leaf size={26} strokeWidth={2.2} />
      </div>
      <h4>Responsibility</h4>
      <p>Eco packaging and green last-mile delivery, by design.</p>
    </div>
  </div>
</section>


{/* ===== CTA SECTION ===== */}
{/*
<section className="premium-cta-section" id="download">
  <div className="premium-cta-head reveal">
    <span className="stamp" style={{ position: "static", display: "inline-block" }}>🔥 FRESH & READY</span>
    <h2 className="font-display" style={{ marginTop: "16px" }}>Hungry To Build Something <span style={{ color: "var(--orange)" }}>Delicious With Us?</span></h2>
    <p style={{ fontFamily: "'Manrope',sans-serif", color: "var(--slate)", marginTop: "10px" }}>Whether you're craving a ride or a partnership — there's a seat at this table.</p>
  </div>
  <div className="premium-cta-grid">
    <div className="premium-card reveal-left">
      <div className="pc-corner tl"></div><div className="pc-corner tr"></div>
      <div className="pc-bg"><img src="RIDE_WITH_US_SCREENSHOT_PLACEHOLDER.png" alt="USTART app screenshot" /></div>
      <div className="pc-overlay"></div>
      <span className="pc-kicker">🛵 For Foodies</span>
      <h3>Ride With <span>USTART.</span></h3>
      <div className="pc-stats">
        <div className="pc-stat"><b>100+</b><span>ORDERS DELIVERED</span></div>
        <div className="pc-stat"><b>6,000+</b><span>RESTAURANT PARTNERS</span></div>
      </div>
      <p>Order your favourite thalis, pizzas, and burgers with transparent pricing and lightning-fast delivery — every single time.</p>
      <a href="ustart_final.html#download" className="btn btn-gold btn-lg">🛵 Ride With Us</a>
    </div>
    <div className="premium-card reveal-right">
      <div className="pc-corner tl"></div><div className="pc-corner tr"></div>
      <div className="pc-bg"><img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80" alt="Restaurant exterior storefront" /></div>
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
*/}
{/* ===== FOOTER ===== */}
<Footer />


    </div>
  );
};
