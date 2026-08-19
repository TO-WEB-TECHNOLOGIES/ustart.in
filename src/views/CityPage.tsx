import React from 'react';
import { Header } from '../components/Header';
import { PageHero } from '../components/PageHero';
import { Footer } from '../components/Footer';
import { Link } from '../router';
import type { City } from '@/content/locations';
import { cuisines } from '@/content/cuisines';
import { articles } from '@/content/blog';
import { APP_DOWNLOAD_URL } from '@/constants';

/**
 * City hub. This is the parent in the city → locality hierarchy, and its main job
 * beyond ranking for the head term is to pass link equity down to the locality
 * pages, which have no other inbound links.
 */
export const CityPage: React.FC<{ city: City }> = ({ city }) => {
  // Surface posts that actually mention this city rather than a fixed list.
  const cityArticles = articles
    .filter(
      (a) =>
        a.title.toLowerCase().includes(city.name.toLowerCase()) ||
        a.targetKeyword.toLowerCase().includes(city.slug)
    )
    .slice(0, 3);

  return (
    <div className="about-page-wrapper">
      <Header variant="overlay" />

      <PageHero
        kicker={`📍 NOW SERVING · ${city.name.toUpperCase()}`}
        title={<>Food Delivery in <span>{city.name}</span></>}
        subtitle={`Real menu prices, no surge pricing, and nothing added at the last step. Here's how USTART works across ${city.name}.`}
        focal="center 30%"
        tint="rgba(255,159,67,0.18)"
      />

      <section className="blog-listing-section">
        <div className="wrap article-body">
          <nav className="article-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> › </span>
            <span>Food Delivery in {city.name}</span>
          </nav>

          <section className="article-intro-section">
            {city.intro.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </section>

          {/* ===== LOCALITIES — the internal-linking core of this page ===== */}
          <section className="article-intro-section">
            <h2 className="article-subheading">Areas We Deliver To in {city.name}</h2>
            <p>
              Each area below has its own delivery patterns, addressing quirks and peak hours.
              Pick yours for the specifics.
            </p>
            <div className="locality-grid">
              {city.localities.map((locality) => (
                <Link
                  key={locality.slug}
                  to={`/food-delivery/${city.slug}/${locality.slug}`}
                  className="locality-card"
                >
                  <strong>{locality.name}</strong>
                  <span>Food delivery in {locality.name}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* ===== CUISINES ===== */}
          <section className="article-intro-section">
            <h2 className="article-subheading">Popular Cuisines in {city.name}</h2>
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
            <h2 className="article-subheading">❓ Food Delivery in {city.name} — FAQs</h2>
            <div className="article-faq-list">
              {city.faq.map((item, idx) => (
                <div key={idx} className="article-faq-item">
                  <h3 className="faq-question">{item.q}</h3>
                  <p className="faq-answer">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {cityArticles.length > 0 && (
            <section className="article-related">
              <h2 className="article-subheading">Reading on {city.name}</h2>
              <div className="blog-grid">
                {cityArticles.map((article) => (
                  <div key={article.id} className="blog-card" data-cat={article.category}>
                    <span className="tag">{article.tag}</span>
                    <h4>{article.title}</h4>
                    <p>{article.directAnswer}</p>
                    <Link to={`/blog/${article.id}`} className="read-more">
                      Read More →
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}

          <aside className="article-cta">
            <h2>Order in {city.name}</h2>
            <p>Menu prices that match the restaurant. No surge. No checkout surprises.</p>
            <div className="article-cta-links">
              <a href={APP_DOWNLOAD_URL} className="btn btn-primary">
                Get the App
              </a>
              <Link to="/food-delivery-without-hidden-charges" className="btn btn-outline">
                How Our Pricing Works
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
};
