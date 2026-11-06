import React from 'react';
import { Header } from '../components/Header';
import { PageHero } from '../components/PageHero';
import { Footer } from '../components/Footer';
import { Link } from '../router';
import { cities, ncrFaqs, ncrIntro } from '@/content/locations';
import { articles } from '@/content/blog';
import { APP_DOWNLOAD_URL } from '@/constants';

/**
 * Delhi NCR hub at /food-delivery - the top of the city → locality hierarchy.
 * Targets the region-level query ("food delivery in Delhi NCR") and passes link
 * equity down to every city hub, which in turn feeds the locality pages.
 */
export const NcrHubPage: React.FC = () => {
  const ncrArticles = articles
    .filter((a) => a.title.toLowerCase().includes('ncr'))
    .slice(0, 3);

  return (
    <div className="about-page-wrapper">
      <Header variant="overlay" />

      <PageHero
        kicker="📍 NOW SERVING · DELHI NCR"
        title={<>Food Delivery in <span>Delhi NCR</span></>}
        subtitle="Gurugram, Delhi, Noida, Ghaziabad and Greater Noida: real menu prices, no surge pricing, and nothing added at checkout."
        focal="center 30%"
        tint="rgba(255,159,67,0.18)"
      />

      <section className="blog-listing-section">
        <div className="wrap article-body">
          <nav className="article-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> › </span>
            <span>Food Delivery in Delhi NCR</span>
          </nav>

          <section className="article-intro-section">
            {ncrIntro.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </section>

          {/* ===== CITIES - each card links the city hub plus its top localities ===== */}
          {cities.map((city) => (
            <section key={city.slug} className="article-intro-section">
              <h2 className="article-subheading">
                <Link to={`/food-delivery/${city.slug}`}>Food Delivery in {city.name}</Link>
              </h2>
              <p>{city.intro[0]}</p>
              <div className="locality-grid">
                {city.localities.map((locality) => (
                  <Link
                    key={locality.slug}
                    to={`/food-delivery/${city.slug}/${locality.slug}`}
                    className="locality-card"
                  >
                    <strong>{locality.name}</strong>
                    <span>{city.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          <section className="article-intro-section">
            <h2 className="article-subheading">One Pricing Model Across the NCR</h2>
            <p>
              Whichever city you order in, the bill works the same way: the menu price is the
              restaurant&apos;s own price, there is no surge or rain pricing, and nothing is added
              at the final step. <Link to="/food-delivery-without-hidden-charges">See how our pricing works</Link>.
            </p>
          </section>

          <section className="article-faq-section">
            <h2 className="article-subheading">❓ Food Delivery in Delhi NCR: FAQs</h2>
            <div className="article-faq-list">
              {ncrFaqs.map((item, idx) => (
                <div key={idx} className="article-faq-item">
                  <h3 className="faq-question">{item.q}</h3>
                  <p className="faq-answer">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {ncrArticles.length > 0 && (
            <section className="article-related">
              <h2 className="article-subheading">Reading on Delhi NCR</h2>
              <div className="blog-grid">
                {ncrArticles.map((article) => (
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
            <h2>Order Anywhere in Delhi NCR</h2>
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
