'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const CampusPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    // Scroll reveal binding
    const revealEls = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right, .reveal-pop');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
        }
      });
    }, { threshold: 0.08 });

    revealEls.forEach(el => observer.observe(el));

    return () => {
      revealEls.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="campus-page-wrapper" style={{ background: '#050d1a', color: '#fff', minHeight: '100vh' }}>
      <Header variant="dark" />
      <header className="ng-hero">
  <div className="ng-orb ng-orb-1"></div>
  <div className="ng-orb ng-orb-2"></div>
  <div className="nextgen-header wrap">
    <div className="nextgen-kicker"><span className="ng-dot"></span>&nbsp;USTART NEXTGEN · FOUNDING BATCH OPEN</div>
    <h2 className="nextgen-title">USTART <span className="ng-accent">NextGen Campus</span><br />Leaders Program</h2>
    <p className="nextgen-sub">Become a Creator. Build a Community. Lead the Next Generation — from your campus.</p>
  </div>

  <div className="ng-pathway reveal">
    <div className="ng-pathway-glow"></div>
    <svg className="ng-path-svg" viewBox="0 0 1040 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <path className="ng-path-line" d="M90 75 H950" stroke="rgba(255,159,67,0.4)" strokeWidth="2"/>
      <circle r="4" fill="#FF9F43"><animateMotion dur="3.2s" repeatCount="indefinite" path="M90 75 H950"/></circle>
      <g>
        <circle className="ng-path-node-ring" cx="90" cy="75" r="13" fill="none" stroke="#FF9F43" strokeWidth="1.5"/>
        <circle cx="90" cy="75" r="13" fill="#0a1426" stroke="#FF9F43" strokeWidth="2"/>
        <text x="90" y="80" textAnchor="middle" fontSize="14">🎓</text>
        <text className="ng-path-label" x="90" y="112" textAnchor="middle">Apply</text>
        <text className="ng-path-sub" x="90" y="126" textAnchor="middle">2-min form</text>
      </g>
      <g>
        <circle className="ng-path-node-ring" cx="376" cy="75" r="13" fill="none" stroke="#5eead4" strokeWidth="1.5" style={{ animationDelay: ".5s" }}/>
        <circle cx="376" cy="75" r="13" fill="#0a1426" stroke="#5eead4" strokeWidth="2"/>
        <text x="376" y="80" textAnchor="middle" fontSize="14">🎟️</text>
        <text className="ng-path-label" x="376" y="112" textAnchor="middle">Activate</text>
        <text className="ng-path-sub" x="376" y="126" textAnchor="middle">Get your code</text>
      </g>
      <g>
        <circle className="ng-path-node-ring" cx="664" cy="75" r="13" fill="none" stroke="#93c5fd" strokeWidth="1.5" style={{ animationDelay: "1s" }}/>
        <circle cx="664" cy="75" r="13" fill="#0a1426" stroke="#93c5fd" strokeWidth="2"/>
        <text x="664" y="80" textAnchor="middle" fontSize="14">📈</text>
        <text className="ng-path-label" x="664" y="112" textAnchor="middle">Grow</text>
        <text className="ng-path-sub" x="664" y="126" textAnchor="middle">Build your campus</text>
      </g>
      <g>
        <circle className="ng-path-node-ring" cx="950" cy="75" r="13" fill="none" stroke="#fde047" strokeWidth="1.5" style={{ animationDelay: "1.5s" }}/>
        <circle cx="950" cy="75" r="13" fill="#0a1426" stroke="#fde047" strokeWidth="2"/>
        <text x="950" y="80" textAnchor="middle" fontSize="14">🏅</text>
        <text className="ng-path-label" x="950" y="112" textAnchor="middle">Lead</text>
        <text className="ng-path-sub" x="950" y="126" textAnchor="middle">Founding badge</text>
      </g>
    </svg>
  </div>
</header>

<section className="ng-section wrap">
  <div className="ng-section-tag">What You Unlock</div>
  <h2>Program <span>Modules</span></h2>
  <div className="ng-grid">
    <div className="ng-card"><div className="ng-card-id">MODULE_01</div><span className="ng-card-icon">🎟️</span><h4>Creator Coupon Code</h4><p>Your own personalized USTART code. Share it, track your impact.</p><span className="ng-tag ng-tag-orange">INSTANT</span></div>
    <div className="ng-card"><div className="ng-card-id">MODULE_02</div><span className="ng-card-icon">📜</span><h4>Certificates</h4><p>Internship + campaign management certificates for real marketing work.</p><span className="ng-tag ng-tag-blue">VERIFIED</span></div>
    <div className="ng-card"><div className="ng-card-id">MODULE_03</div><span className="ng-card-icon">🏅</span><h4>Founding Badge</h4><p>Early members earn the "Founding Ambassador" digital badge.</p><span className="ng-tag ng-tag-yellow">EARLY ACCESS</span></div>
    <div className="ng-card"><div className="ng-card-id">MODULE_04</div><span className="ng-card-icon">🚀</span><h4>Founder Access</h4><p>Work directly with USTART's founding team and learn how startups scale.</p><span className="ng-tag ng-tag-green">MENTORSHIP</span></div>
  </div>
</section>

<section className="ng-section wrap">
  <div className="ng-section-tag">By The Numbers</div>
  <h2>Program <span>Stats</span></h2>
  <div className="ng-stats">
    <div className="ng-stat"><span className="ng-stat-n">∞</span><span className="ng-stat-l">Campus Reach</span></div>
    <div className="ng-stat"><span className="ng-stat-n">0₹</span><span className="ng-stat-l">Cost to Join</span></div>
    <div className="ng-stat"><span className="ng-stat-n">4+</span><span className="ng-stat-l">Certificates & Badges</span></div>
    <div className="ng-stat"><span className="ng-stat-n">100%</span><span className="ng-stat-l">Real Startup Work</span></div>
  </div>
</section>

<section className="ng-section wrap">
  <div className="ng-section-tag">The Pathway, Explained</div>
  <h2>How It <span>Works</span></h2>
  <div className="ng-steps">
    <div className="ng-step"><div className="n">01</div><div><h4>Apply</h4><p>Fill out a 2-minute form telling us about your campus and why you want in.</p></div></div>
    <div className="ng-step"><div className="n">02</div><div><h4>Activate</h4><p>Get your personalized Creator Coupon Code and start sharing it right away.</p></div></div>
    <div className="ng-step"><div className="n">03</div><div><h4>Grow</h4><p>Run activations, build your campus community, and track your impact.</p></div></div>
    <div className="ng-step"><div className="n">04</div><div><h4>Lead</h4><p>Earn your Founding Ambassador badge, certificates, and direct founder access.</p></div></div>
  </div>
</section>

<section className="ng-section wrap">
  <div className="ng-section-tag">Common Questions</div>
  <h2>Frequently Asked <span>Questions</span></h2>
  <div className={`ng-faq-item ${openFaq === 1 ? 'open' : ''}`}>
    <div className="ng-faq-q" onClick={() => setOpenFaq(openFaq === 1 ? null : 1)} style={{ cursor: 'pointer' }}><span>Is there any cost to join?</span><span className="plus">+</span></div>
    <div className="ng-faq-a"><p>None — the program is completely free to join, always.</p></div>
  </div>
  <div className={`ng-faq-item ${openFaq === 2 ? 'open' : ''}`}>
    <div className="ng-faq-q" onClick={() => setOpenFaq(openFaq === 2 ? null : 2)} style={{ cursor: 'pointer' }}><span>Do I need prior marketing experience?</span><span className="plus">+</span></div>
    <div className="ng-faq-a"><p>No experience needed — just enthusiasm, creativity, and drive.</p></div>
  </div>
  <div className={`ng-faq-item ${openFaq === 3 ? 'open' : ''}`}>
    <div className="ng-faq-q" onClick={() => setOpenFaq(openFaq === 3 ? null : 3)} style={{ cursor: 'pointer' }}><span>What do I actually get out of it?</span><span className="plus">+</span></div>
    <div className="ng-faq-a"><p>A personal coupon code, verified certificates, a Founding Ambassador badge, and direct mentorship from USTART's founders.</p></div>
  </div>
  <div className={`ng-faq-item ${openFaq === 4 ? 'open' : ''}`}>
    <div className="ng-faq-q" onClick={() => setOpenFaq(openFaq === 4 ? null : 4)} style={{ cursor: 'pointer' }}><span>How is my impact tracked?</span><span className="plus">+</span></div>
    <div className="ng-faq-a"><p>Every order placed with your creator code is tracked automatically on your dashboard.</p></div>
  </div>
</section>

<section className="ng-section wrap" style={{ paddingBottom: "80px" }}>
  <div className="ng-cta-strip">
    <div className="ng-founding-badge">⚡ Founding Batch</div>
    <div className="ng-cta-text">
      <h3>Ready to Lead the<br />Next Generation?</h3>
      <p>No experience needed — just enthusiasm, creativity, and drive.</p>
    </div>
    <div className="ng-cta-btns">
      <a href="#" className="btn-ng-primary">🎓 Apply Now →</a>
      <a href="#" className="btn-ng-outline">Learn More ↗</a>
    </div>
  </div>
</section>

<Footer />
    </div>
  );
};
