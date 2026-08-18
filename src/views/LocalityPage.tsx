import React from 'react';
import { Header } from '../components/Header';
import { PageHero } from '../components/PageHero';
import { Footer } from '../components/Footer';
import { Link } from '../router';
import type { City, Locality } from '@/content/locations';
import { cuisines } from '@/content/cuisines';
import { APP_DOWNLOAD_URL } from '@/constants';

/**
 * Locality page.
 *
 * The ops blocks (avg delivery time, partner count, coverage) render ONLY when the
 * data is non-null. That is deliberate: a locality page whose only distinguishing
 * feature is a swapped place name is a doorway page, and inventing a delivery time
 * to fill the gap would be both an SEO risk and a promise to customers you have not
 * verified you can keep. Unfilled localities fall back to real editorial copy.
 */
export const LocalityPage: React.FC<{ city: City; locality: Locality }> = ({ city, locality }) => {
  const siblings = city.localities.filter((l) => l.slug !== locality.slug).slice(0, 6);
  const hasOpsData =
    locality.avgDeliveryMinutes !== null ||
    locality.partnerCount !== null ||
    locality.coverage.length > 0;

  return (
    <div className="about-page-wrapper">
      <Header variant="overlay" />

      <PageHero
        kicker={`📍 ${city.name.toUpperCase()} · ${locality.name.toUpperCase()}`}
        title={<>Food Delivery in <span>{locality.name}</span></>}
        subtitle={`Order in ${locality.name} at real menu prices — no surge pricing, no fees added at checkout.`}
        focal="center 30%"
        tint="rgba(255,159,67,0.18)"
      />

      <section className="blog-listing-section">
        <div className="wrap article-body">
          <nav className="article-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> › </span>
            <Link to={`/food-delivery/${city.slug}`}>{city.name}</Link>
            <span aria-hidden="true"> › </span>
            <span>{locality.name}</span>
          </nav>

          <section className="article-intro-section">
            {locality.intro.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </section>

          <section className="article-intro-section">
            <h2 className="article-subheading">How {locality.name} Orders</h2>
            <p>{locality.whoOrders}</p>
          </section>

          {hasOpsData && (
            <section className="locality-stats">
              {locality.avgDeliveryMinutes !== null && (
                <div className="locality-stat">
                  <strong>{locality.avgDeliveryMinutes} min</strong>
                  <span>Average delivery time</span>
                </div>
              )}
              {locality.partnerCount !== null && (
                <div className="locality-stat">
                  <strong>{locality.partnerCount}+</strong>
                  <span>Restaurant partners</span>
                </div>
              )}
              {locality.coverage.length > 0 && (
                <div className="locality-stat locality-stat-wide">
                  <strong>Areas covered</strong>
                  <span>{locality.coverage.join(' · ')}</span>
                </div>
              )}
            </section>
          )}

          <section className="article-intro-section">
            <h2 className="article-subheading">What to Order in {locality.name}</h2>
            <div className="locality-grid">
              {cuisines.map((cuisine) => (
                <Link key={cuisine.slug} to={`/order/${cuisine.slug}`} className="locality-card">
                  <strong>{cuisine.name}</strong>
                  <span>{cuisine.heading}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="article-faq-section">
            <h2 className="article-subheading">
              ❓ Ordering in {locality.name} — FAQs
            </h2>
            <div className="article-faq-list">
              {locality.faq.map((item, idx) => (
                <div key={idx} className="article-faq-item">
                  <h3 className="faq-question">{item.q}</h3>
                  <p className="faq-answer">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="article-cta">
            <h2>Order in {locality.name}</h2>
            <p>
              Enter your address in the app to see live coverage and which kitchens near{' '}
              {locality.name} are open right now.
            </p>
            <div className="article-cta-links">
              <a href={APP_DOWNLOAD_URL} className="btn btn-primary">
                Get the App
              </a>
              <Link to={`/food-delivery/${city.slug}`} className="btn btn-outline">
                All {city.name} Areas
              </Link>
            </div>
          </aside>

          {siblings.length > 0 && (
            <section className="article-intro-section">
              <h2 className="article-subheading">Nearby Areas in {city.name}</h2>
              <div className="locality-grid">
                {siblings.map((sibling) => (
                  <Link
                    key={sibling.slug}
                    to={`/food-delivery/${city.slug}/${sibling.slug}`}
                    className="locality-card"
                  >
                    <strong>{sibling.name}</strong>
                    <span>Food delivery in {sibling.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
