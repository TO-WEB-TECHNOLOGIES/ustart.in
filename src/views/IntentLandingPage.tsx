import React from 'react';
import { Header } from '../components/Header';
import { PageHero } from '../components/PageHero';
import { Footer } from '../components/Footer';
import { Link } from '../router';
import type { IntentPage } from '@/content/intent-pages';
import { cities } from '@/content/locations';
import { APP_DOWNLOAD_URL } from '@/constants';

/** Splits "Food Delivery Without Hidden Charges" into lead text + accented final words. */
const splitHeading = (h1: string) => {
  const words = h1.split(' ');
  if (words.length < 3) return { lead: h1, accent: '' };
  return {
    lead: words.slice(0, -2).join(' '),
    accent: words.slice(-2).join(' '),
  };
};

export const IntentLandingPage: React.FC<{ page: IntentPage }> = ({ page }) => {
  const { lead, accent } = splitHeading(page.h1);

  return (
    <div className="about-page-wrapper">
      <Header variant="overlay" />

      <PageHero
        kicker={page.kicker}
        title={<>{lead} {accent && <span>{accent}</span>}</>}
        subtitle={page.lede}
        focal="center 30%"
        tint="rgba(255,159,67,0.18)"
      />

      <section className="blog-listing-section">
        <div className="wrap article-body">
          <nav className="article-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> › </span>
            <span>{page.h1}</span>
          </nav>

          {page.sections.map((section, idx) => (
            <section key={idx} className="article-intro-section">
              <h2 className="article-subheading">{section.heading}</h2>
              {section.paragraphs.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="article-takeaways-list">
                  {section.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>
                      <span className="takeaway-bullet">✓</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section className="article-faq-section">
            <h2 className="article-subheading">❓ Frequently Asked Questions</h2>
            <div className="article-faq-list">
              {page.faq.map((item, idx) => (
                <div key={idx} className="article-faq-item">
                  <h3 className="faq-question">{item.q}</h3>
                  <p className="faq-answer">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="article-cta">
            <h2>Try It On Your Next Order</h2>
            <p>Menu prices that match the restaurant. No surge. No checkout surprises.</p>
            <div className="article-cta-links">
              <a href={APP_DOWNLOAD_URL} className="btn btn-primary">
                Get the App
              </a>
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/food-delivery/${city.slug}`}
                  className="btn btn-outline"
                >
                  Delivery in {city.name}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
};
