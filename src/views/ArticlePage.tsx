import React from 'react';
import { Header } from '../components/Header';
import { PageHero } from '../components/PageHero';
import { Footer } from '../components/Footer';
import { Link } from '../router';
import type { Article } from '@/content/blog';
import { getRelatedArticles } from '@/content/blog';
import { APP_DOWNLOAD_URL } from '@/constants';

/**
 * Single article view. Server component on purpose — the body copy must be in the
 * initial HTML so crawlers see it without executing JavaScript.
 */
export const ArticlePage: React.FC<{ article: Article }> = ({ article }) => {
  const related = getRelatedArticles(article.id);

  return (
    <div className="about-page-wrapper">
      <Header variant="overlay" />

      <PageHero
        kicker={article.tag}
        title={<>{article.title}</>}
        subtitle={article.directAnswer}
        focal="center 25%"
        tint="rgba(83,153,135,0.20)"
      />

      <article className="blog-listing-section">
        <div className="wrap article-body">
          {/* Breadcrumb — mirrors the BreadcrumbList JSON-LD on this page */}
          <nav className="article-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> › </span>
            <Link to="/blog">Blog</Link>
            <span aria-hidden="true"> › </span>
            <span>{article.title}</span>
          </nav>

          <div className="article-direct-answer-box">
            <div className="direct-answer-badge">
              <span>⚡</span> Direct Answer
            </div>
            <p className="direct-answer-text">{article.directAnswer}</p>
          </div>

          <section className="article-intro-section">
            <h2 className="article-subheading">Introduction</h2>
            {article.introduction.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </section>

          {article.keyTakeaways.length > 0 && (
            <section className="article-takeaways-box">
              <h2 className="article-subheading">📌 Key Takeaways</h2>
              <ul className="article-takeaways-list">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx}>
                    <span className="takeaway-bullet">✓</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {article.faq && article.faq.length > 0 && (
            <section className="article-faq-section">
              <h2 className="article-subheading">❓ Frequently Asked Questions</h2>
              <div className="article-faq-list">
                {article.faq.map((faqItem, idx) => (
                  <div key={idx} className="article-faq-item">
                    <h3 className="faq-question">{faqItem.q}</h3>
                    <p className="faq-answer">{faqItem.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Conversion path out of an informational page */}
          <aside className="article-cta">
            <h2>Ordering in Gurgaon or Delhi?</h2>
            <p>
              USTART shows the real menu price with no surge pricing and nothing added at the last
              step. See what your bill actually looks like.
            </p>
            <div className="article-cta-links">
              <a href={APP_DOWNLOAD_URL} className="btn btn-primary">
                Get the App
              </a>
              <Link to="/food-delivery/gurgaon" className="btn btn-outline">
                Food Delivery in Gurgaon
              </Link>
              <Link to="/food-delivery/delhi" className="btn btn-outline">
                Food Delivery in Delhi
              </Link>
            </div>
          </aside>

          {related.length > 0 && (
            <section className="article-related">
              <h2 className="article-subheading">Keep Reading</h2>
              <div className="blog-grid">
                {related.map((rel) => (
                  <div key={rel.id} className="blog-card" data-cat={rel.category}>
                    <span className="tag">{rel.tag}</span>
                    <h4>{rel.title}</h4>
                    <p>{rel.directAnswer}</p>
                    <Link to={`/blog/${rel.id}`} className="read-more">
                      Read More →
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
};
