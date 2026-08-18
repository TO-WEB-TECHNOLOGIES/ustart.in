'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { PageHero } from '../components/PageHero';
import { Footer } from '../components/Footer';

export const ContactPage: React.FC = () => {
  const [faqPage, setFaqPage] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Re-initialize scroll reveal observer for contact page elements
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

    // Initialise background question marks rotation/parallax if scrolled
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

  const handleFaqPageChange = (pageNum: number) => {
    setFaqPage(pageNum);
    // Smooth scroll to top of the FAQ section
    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="about-page-wrapper">
      <Header variant="overlay" />

{/* ===== CONTACT HERO ===== */}
<PageHero
  kicker="🍽️ FRESH FROM GURUGRAM · GET IN TOUCH"
  title={<>Got A Question? <span>We're Listening.</span></>}
  subtitle="Real humans, real fast — no chatbot loop. Reach out about orders, partnerships, or just to say hi."
  focal="70% 45%"
  tint="rgba(244,183,111,0.20)"
/>
{/* ===== CONTACT INFO + FORM ===== */}

<section className="contact-section">
  <svg className="doodle" style={{ top: "5%", left: "3%", width: "50px", opacity: "0.14" }} viewBox="0 0 64 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 18 Q6 6 32 6 Q58 6 58 18 Z" stroke="var(--navy)" strokeWidth="2" fill="none"/>
    <path d="M6 24 L58 24" stroke="var(--terracotta)" strokeWidth="2.4" strokeLinecap="round"/>
    <path d="M6 38 L58 38 Q58 46 32 46 Q6 46 6 38Z" stroke="var(--navy)" strokeWidth="2" fill="none"/>
  </svg>
  <div className="contact-grid">
    <div className="contact-cards reveal-left">
      <div className="contact-info-card">
        <div className="cic-head"><span>SUPPORT</span><span className="no">24/7</span></div>
        <div className="cic-body">
          <span className="icon">💬</span>
          <h4>Chat With Support</h4>
          <p>Real humans, real fast. Available daily, 8 AM – midnight.<br /><a href="mailto:support@ustart.app">support@ustart.app</a></p>
        </div>
      </div>
      <div className="contact-info-card">
        <div className="cic-head"><span>PARTNERSHIPS</span><span className="no">B2B</span></div>
        <div className="cic-body">
          <span className="icon">🤝</span>
          <h4>Restaurant Partnerships</h4>
          <p>Want to list your restaurant on USTART?<br /><a href="mailto:partners@ustart.app">partners@ustart.app</a></p>
        </div>
      </div>
      <div className="contact-info-card">
        <div className="cic-head"><span>HEAD OFFICE</span><span className="no">HQ</span></div>
        <div className="cic-body">
          <span className="icon">📍</span>
          <h4>Gurugram HQ</h4>
          <p>Gurugram, Haryana, India</p>
        </div>
      </div>
    </div>
    <div className="contact-form-wrap reveal-right">
      <h3>Send Us A Message</h3>
      <span className="file-tag">We typically reply within 24 hours</span>
      <form id="contactForm" onSubmit={handleFormSubmit}>
        <div className="cform-row">
          <div className="cform-field">
            <label htmlFor="cf-name">Full Name</label>
            <input type="text" id="cf-name" name="name" placeholder="Your name" required />
          </div>
          <div className="cform-field">
            <label htmlFor="cf-email">Email Address</label>
            <input type="email" id="cf-email" name="email" placeholder="you@example.com" required />
          </div>
        </div>
        <div className="cform-field">
          <label htmlFor="cf-phone">Phone Number <span style={{ fontWeight: "500", color: "var(--slate)", textTransform: "none", letterSpacing: "0" }}>(optional)</span></label>
          <input type="tel" id="cf-phone" name="phone" placeholder="+91 98765 43210" />
        </div>
        <div className="cform-field">
          <label htmlFor="cf-topic">What's this about?</label>
          <select id="cf-topic" name="topic">
            <option>Order support</option>
            <option>Restaurant partnership</option>
            <option>Delivery partner enquiry</option>
            <option>NextGen Campus Leaders Program</option>
            <option>Something else</option>
          </select>
        </div>
        <div className="cform-field">
          <label htmlFor="cf-message">Message</label>
          <textarea id="cf-message" name="message" placeholder="Tell us what's going on..." required></textarea>
        </div>
        <button type="submit" className="cform-submit">📨 Send Message</button>
        <div className={`cform-success ${formSubmitted ? 'show' : ''}`} id="cformSuccess">✅ Message sent. We'll get back to you soon.</div>
        <p className="cform-note">By submitting, you agree to our <a href="/terms#privacy-data-protection" style={{ color: "var(--terracotta-dark)", fontWeight: "700" }}>Privacy Policy</a>.</p>
      </form>
    </div>
  </div>
</section>
{/* ===== QUICK ANSWERS ===== */}

<section className="faq-section" id="faq">
  <div className="qmark-bg" aria-hidden="true">
    <span style={{ fontSize: "340px", top: "-120px", left: "-60px", opacity: "0.22", transform: "rotate(-8deg)" }}>?</span>
    <span style={{ fontSize: "220px", bottom: "-90px", right: "-40px", opacity: "0.22", transform: "rotate(10deg)" }}>?</span>
    <span style={{ fontSize: "150px", top: "8%", right: "6%", opacity: "0.18", transform: "rotate(-6deg)" }}>?</span>
    <span style={{ fontSize: "120px", bottom: "10%", left: "4%", opacity: "0.18", transform: "rotate(8deg)" }}>?</span>
    <span style={{ fontSize: "90px", top: "40%", left: "40%", opacity: "0.16", transform: "rotate(-4deg)" }}>?</span>
    <span style={{ fontSize: "70px", top: "18%", left: "14%", opacity: "0.16", transform: "rotate(12deg)" }}>?</span>
    <span style={{ fontSize: "64px", bottom: "20%", right: "18%", opacity: "0.16", transform: "rotate(-10deg)" }}>?</span>
    <span style={{ fontSize: "56px", top: "62%", right: "30%", opacity: "0.15", transform: "rotate(6deg)" }}>?</span>
    <span style={{ fontSize: "48px", top: "4%", left: "38%", opacity: "0.15", transform: "rotate(-14deg)" }}>?</span>
    <span style={{ fontSize: "44px", bottom: "4%", left: "32%", opacity: "0.15", transform: "rotate(9deg)" }}>?</span>
    <span style={{ fontSize: "38px", top: "30%", right: "36%", opacity: "0.14", transform: "rotate(-8deg)" }}>?</span>
    <span style={{ fontSize: "34px", bottom: "36%", left: "16%", opacity: "0.14", transform: "rotate(15deg)" }}>?</span>
  </div>
  <div className="wrap">
    <div className="sec-head reveal">
      <span className="sec-kicker">⚡ BEFORE YOU WRITE IN</span>
      <h2 className="font-display">Everything You've Been<br />Wondering About USTART.</h2>
      <p>We get asked these a lot — so here's the full story on who we are, how we work, and why it's worth switching, before you drop us a line.</p>
    </div>
    

<div className="faq-list reveal d1"><div className={`faq-page-group ${faqPage === 1 ? 'active-page' : ''}`} id="faqPage1">
      <div className={`faq-item ${openFaq === 1 ? 'open' : ''}`}>
        <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}><span className="qtext"><span className="qtag">Q1</span>What is USTART and how does it operate in Delhi NCR?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">USTART is a prominent Indian food-tech platform that connects consumers, restaurant partners, and delivery personnel across a unified digital marketplace in the Delhi NCR region. Founded by Toweb Technology Private Limited, the platform aggregates neighborhood dining establishments, standalone culinary brands, and cloud kitchens to provide seamless online ordering and automated food delivery. USTART makes ordering online simple and more affordable by ensuring strict menu price parity through its innovative model.</div></div>
      </div>
      <div className={`faq-item ${openFaq === 2 ? 'open' : ''}`}>
        <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}><span className="qtext"><span className="qtag">Q2</span>How can users and restaurants access the USTART platform?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">You can jump onto the USTART platform right from your phone or computer. Customers can order meals through the official website at <a href="https://www.ustart.in/" style={{ color: "var(--orange-dark)", fontWeight: "700" }}>ustart.in</a> or by downloading the USTART mobile app, available on both iOS and Android. If you run a restaurant or a cloud kitchen, the platform gives you a dedicated merchant dashboard that links right up with your existing counter billing system (POS) to keep things running smoothly. This entire digital network spans across Delhi NCR's busiest residential neighborhoods and corporate office hubs, making it simple for users to order, track their delivery driver in real-time, and get their food fresh.</div></div>
      </div>
      <div className={`faq-item ${openFaq === 3 ? 'open' : ''}`}>
        <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}><span className="qtext"><span className="qtag">Q3</span>When was USTART founded and where is its headquarters?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">USTART was established by its parent organization, Toweb Technology Private Limited, and is headquartered strategically within the commercial zone of Gurugram, Haryana, India. Positioned in the heart of India's prominent technology and startup hub, the headquarters hosts the platform's core software engineering, data analytics, and regional logistics dispatch operations. Operating from this localized base allows the corporate leadership team to directly monitor, test, and optimize hyper-local delivery algorithms within its primary testbed market.</div></div>
      </div>
      <div className={`faq-item ${openFaq === 4 ? 'open' : ''}`}>
        <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}><span className="qtext"><span className="qtag">Q4</span>Why is USTART uniquely relevant to the Delhi NCR market?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">USTART is built specifically to handle the everyday headaches of ordering food in busy metropolitan regions like Delhi NCR. From handling massive lunch-hour rushes in corporate hubs like Cyber City and Horizon Center to delivering across sprawling residential sectors along Sohna Road, the platform understands local traffic patterns and neighborhoods. While national apps often leave users facing long delays, high food markups, or sudden surge prices when it rains, USTART ensures reliable delivery times and fair pricing. This deep focus on local neighborhood needs makes the platform highly dependable for office professionals and families across the entire region.</div></div>
      </div>
      <div className={`faq-item ${openFaq === 5 ? 'open' : ''}`}>
        <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}><span className="qtext"><span className="qtag">Q5</span>What makes USTART structurally different from legacy food delivery apps?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">USTART differentiates itself through a transparent, flat-fee, low-commission structural model that actively rejects the extractive monetization strategies used by legacy food delivery networks. Unlike traditional aggregators that inflate menu prices, layer hidden service fees, and restrict direct merchant-to-consumer data sharing, USTART maintains strict price parity with a restaurant's actual dine-in menu. This structural shift moves away from acting as an intrusive marketplace intermediary, functioning instead as a pure utility infrastructure that lowers costs for diners while preserving the operational independence of local food businesses.</div></div>
      </div>
      <div className={`faq-item ${openFaq === 6 ? 'open' : ''}`}>
        <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 6 ? null : 6)}><span className="qtext"><span className="qtag">Q6</span>What is USTART Elite and what exclusive privileges does it unlock?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">USTART Elite is the platform's premium loyalty tier designed to maximize cost savings and convenience for high-frequency individual and corporate users across Gurugram. Members unlock unrestricted free delivery on all qualifying orders above ₹129 from any partner kitchen or restaurant located within their active delivery radius. Additional structural privileges include priority order preparation in merchant kitchens, automated bypassing of standard customer support queues, and exclusive access to highly curated, premium culinary listings that are hidden from the standard public interface.</div></div>
      </div>
      </div><div className={`faq-page-group ${faqPage === 2 ? 'active-page' : ''}`} id="faqPage2"><div className={`faq-item ${openFaq === 7 ? 'open' : ''}`}>
        <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 7 ? null : 7)}><span className="qtext"><span className="qtag">Q7</span>What are the explicit financial benefits for users ordering on USTART?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Diners using USTART receive immediate financial relief through a structural commitment to menu price parity, saving an average of 15% to 35% per order compared to apps that tolerate merchant markup. Operationally, users benefit from a baseline of free delivery on all order volumes exceeding ₹129, a complete absence of ambiguous "rain fees" or peak-hour surges, and highly accurate, multi-point tracking. These transparent parameters eliminate checkout price friction, allowing corporate employees and families to budget their monthly food expenditures with absolute certainty.</div></div>
      </div>
      <div className={`faq-item ${openFaq === 8 ? 'open' : ''}`}>
        <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 8 ? null : 8)}><span className="qtext"><span className="qtag">Q8</span>How does USTART improve margins for Delhi NCR restaurants and cloud kitchens?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">USTART helps local restaurants and cloud kitchens make more money by charging incredibly fair service fees that keep profits where they belong. While mainstream apps take massive cuts out of every ticket, USTART charges a fair service fee that is sometimes lower than 10% of the total order value, meaning a restaurant partner can save up to 25% to 35% on per-order costs. To add even more value, USTART gives merchants access to advanced, AI-driven analytics dashboards without charging them a single rupee extra — helping neighborhood eateries track customer preferences, plan daily kitchen inventory, and run successful promotions without losing their hard-earned margins.</div></div>
      </div>
      <div className={`faq-item ${openFaq === 9 ? 'open' : ''}`}>
        <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 9 ? null : 9)}><span className="qtext"><span className="qtag">Q9</span>Why should I shift my daily food ordering to USTART?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Switch to USTART to stop paying the annoying hidden fees and inflated menu prices that make ordering food so expensive on traditional apps. When you order from your favorite food spots or premium hubs like Horizon Center to your home or office in Delhi NCR, mainstream platforms secretly jack up item prices and slap on sudden surge charges. Ordering through USTART ensures you pay the exact same fair prices you'd get if you walked right into the restaurant to dine in, plus you get stable, predictable delivery fees that never spike just because it's raining or busy.</div></div>
      </div>
      <div className={`faq-item ${openFaq === 10 ? 'open' : ''}`}>
        <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 10 ? null : 10)}><span className="qtext"><span className="qtag">Q10</span>Why should restaurant owners prioritize USTART integration?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Restaurant owners and cloud kitchen operators should choose active USTART integration because it protects your hard-earned profits instead of forcing you to pay endless advertising fees just to be seen. Traditional discovery sites and mainstream platforms make you bid against your own neighbors for visibility, often redirecting your customer traffic toward competitors who pay for higher listings. USTART charges a fair service fee that is sometimes lower than 10% of the total order value, meaning a restaurant partner can save up to 25% to 35% on per-order costs — and USTART promises to never sell your customer data to third parties or competitors, giving you complete, private access to your local customer relationships.</div></div>
      </div>
      <div className={`faq-item ${openFaq === 11 ? 'open' : ''}`}>
        <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 11 ? null : 11)}><span className="qtext"><span className="qtag">Q11</span>How does USTART correct imbalances in the food-tech market?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">USTART corrects systemic market imbalances by shifting from an extractive marketplace model to a collaborative infrastructure built on sustainable economics. Legacy platforms squeeze local restaurants with heavy commissions, pass higher costs to consumers via inflated menu pricing, and use aggressive algorithms to penalize smaller independent kitchens. USTART re-establishes a healthy ecosystem by enforcing transparent flat fees, keeping restaurant commissions low, and sharing clean customer data — allowing Gurugram's diverse culinary community to thrive sustainably.</div></div>
      </div>
      <div className={`faq-item ${openFaq === 12 ? 'open' : ''}`}>
        <button type="button" className="faq-q" onClick={() => setOpenFaq(openFaq === 12 ? null : 12)}><span className="qtext"><span className="qtag">Q12</span>How does USTART's restaurant catalog compare to bulk aggregators?</span><span className="chev">+</span></button>
        <div className="faq-a"><div className="faq-a-inner">Rather than overwhelming users with thousands of unverified, substandard listings merely to boost catalog volume, USTART prioritizes a highly curated directory of verified, premium culinary options. The platform focuses heavily on onboarding top-tier local institutions, critically acclaimed standalone restaurants, and strictly vetted cloud kitchens operating across Gurugram's key food corridors. Every merchant undergoes rigorous quality, hygiene, and operational efficiency reviews, ensuring that users receive premium food quality and reliable packaging across all orders.</div></div>
      </div>
</div>

    <div className="faq-pagination reveal">
      <button type="button" className="faq-page-arrow" id="faqPrevBtn" onClick={() => handleFaqPageChange(1)} style={{ visibility: faqPage === 1 ? "hidden" : "visible" }}>← Previous</button>
      <button type="button" className={`faq-page-btn ${faqPage === 1 ? 'active' : ''}`} id="faqBtn1" onClick={() => handleFaqPageChange(1)} aria-current="page">1</button>
      <button type="button" className={`faq-page-btn ${faqPage === 2 ? 'active' : ''}`} id="faqBtn2" onClick={() => handleFaqPageChange(2)}>2</button>
      <button type="button" className="faq-page-arrow" id="faqNextBtn" onClick={() => handleFaqPageChange(2)} style={{ visibility: faqPage === 2 ? "hidden" : "visible" }}>Next →</button>
    </div>
    </div>
  </div>
</section>

{/* ===== FOOTER ===== */}
<Footer />


    </div>
  );
};
