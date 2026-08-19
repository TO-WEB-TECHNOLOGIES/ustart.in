'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { PageHero } from '../components/PageHero';
import { Footer } from '../components/Footer';
import { Link } from '../router';
import { articles, ARTICLE_CATEGORIES } from '@/content/blog';

/**
 * Blog index.
 *
 * Article bodies used to live in this file and render only inside a client-side
 * modal behind `<a href="#">`, which meant they had no URLs and were completely
 * invisible to search engines. Content now lives in src/content/blog.ts and every
 * card is a real <Link> to /blog/[slug] — that routing is what makes the writing
 * indexable, so please don't reintroduce the modal pattern here.
 */
export const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [blogExpanded, setBlogExpanded] = useState<boolean>(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  useEffect(() => {
    // Re-initialize scroll reveal observer for blog page elements
    const revealEls = document.querySelectorAll(
      '.reveal, .reveal-tilt, .reveal-scale, .reveal-stamp, .reveal-left, .reveal-right, .reveal-pop, .reveal-flip, .sv-reveal, .sv-reveal-tilt, .sv-reveal-pop, .el-reveal, .dlx-reveal, .dlx-reveal-left, .dlx-reveal-right'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
          }
        });
      },
      { threshold: 0.08 }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => {
      revealEls.forEach((el) => observer.unobserve(el));
    };
  }, [activeCategory, blogExpanded]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubscribed(true);
    (e.target as HTMLFormElement).reset();
  };

  const filteredArticles =
    activeCategory === 'All' ? articles : articles.filter((a) => a.category === activeCategory);

  /**
   * Every article card is rendered into the DOM and the overflow is hidden with a
   * class, rather than sliced out of the array. Slicing meant the articles past the
   * ninth had no crawlable <a> anywhere on the site — the "View More" button is
   * client-side, so a crawler never reached them. Keep the links in the HTML.
   */
  const isCollapsed = activeCategory === 'All' && !blogExpanded;
  const visibleCount = 9;

  const featuredArticle = articles[0];

  return (
    <div className="about-page-wrapper">
      <Header variant="overlay" />

      {/* ===== BLOG HERO ===== */}
      <PageHero
        kicker="🍽️ FRESH FROM GURUGRAM · THE USTART BLOG"
        title={<>Food, Fairness & <span>Everything In Between.</span></>}
        subtitle="Straight answers on delivery fees, restaurant economics, and the fair way to order food — no fine print, no fluff."
        focal="center 25%"
        tint="rgba(83,153,135,0.20)"
      />

      {/* ===== FEATURED ARTICLE ===== */}
      <section className="blog-listing-section">
        <svg className="doodle" style={{ top: "4%", right: "3%", width: "42px", opacity: "0.16" }} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="19" stroke="var(--terracotta)" strokeWidth="2" fill="none"/>
          <circle cx="25" cy="25" r="8" stroke="var(--terracotta)" strokeWidth="2" fill="none"/>
        </svg>

        {featuredArticle && (
          <div className="featured-post reveal-scale">
            <div className="featured-post-inner">
              <div className="featured-post-visual">
                {/* Previously an <img src="receipt_bill.png"> — that file has never
                    existed in /public and resolved to a 404 at /blog/receipt_bill.png. */}
                <div className="featured-post-answer">
                  <span className="direct-answer-badge"><span>⚡</span> Direct Answer</span>
                  <p>{featuredArticle.directAnswer}</p>
                </div>
              </div>
              <div className="featured-post-text">
                <span className="tag">📌 FEATURED · MOST-ASKED QUESTION</span>
                <h3>{featuredArticle.title}</h3>
                <p>{featuredArticle.introduction[0]}</p>
                <Link to={`/blog/${featuredArticle.id}`} className="read-more">
                  Read the full breakdown →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ===== CATEGORY FILTERS ===== */}
        <div className="blog-filters reveal">
          <span
            className={`blog-filter-pill ${activeCategory === 'All' ? 'active' : ''}`}
            onClick={() => { setActiveCategory('All'); setBlogExpanded(false); }}
          >
            All Articles ({articles.length})
          </span>
          {ARTICLE_CATEGORIES.map((category) => (
            <span
              key={category}
              className={`blog-filter-pill ${activeCategory === category ? 'active' : ''}`}
              onClick={() => { setActiveCategory(category); }}
            >
              {category}
            </span>
          ))}
        </div>

        {/* ===== BLOG GRID ===== */}
        <div className="wrap">
          <div className="blog-grid" style={{ marginBottom: "0" }}>
            {filteredArticles.map((article, idx) => (
              <div
                key={article.id}
                className={`blog-card reveal-tilt ${article.delayClass || 'd1'}${
                  isCollapsed && idx >= visibleCount ? ' blog-card-hidden' : ''
                }`}
                data-cat={article.category}
                style={{ "--r": article.tilt || "0deg" } as React.CSSProperties}
              >
                <span className="tag">{article.tag}</span>
                <h4>{article.title}</h4>
                <p>{article.directAnswer}</p>
                <Link to={`/blog/${article.id}`} className="read-more">
                  Read More →
                </Link>
              </div>
            ))}
          </div>

          {isCollapsed && filteredArticles.length > visibleCount && (
            <div className="blog-viewmore-wrap reveal" id="blogViewMoreWrap">
              <button
                type="button"
                className="blog-viewmore-btn"
                id="blogViewMoreBtn"
                onClick={() => setBlogExpanded(true)}
              >
                View More Articles ({filteredArticles.length - visibleCount} more) ↓
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="newsletter-section">
        <div className="newsletter-card reveal-scale">
          <div className="newsletter-inner">
            <h3>Get New Articles In Your Inbox.</h3>
            <p>No spam, no surge pricing on your inbox. Just the occasional good read.</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input type="email" placeholder="you@example.com" required />
              <button type="submit">Subscribe</button>
            </form>
            <div className={`newsletter-success ${newsletterSubscribed ? 'show' : ''}`} id="nlSuccess">
              ✅ You're on the list. Watch your inbox.
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
};
