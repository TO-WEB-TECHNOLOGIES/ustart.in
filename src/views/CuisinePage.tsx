import React from 'react';
import { Header } from '../components/Header';
import { PageHero } from '../components/PageHero';
import { Footer } from '../components/Footer';
import { Link } from '../router';
import type { Cuisine } from '@/content/cuisines';
import { cuisines } from '@/content/cuisines';
import { cities } from '@/content/locations';
import { APP_DOWNLOAD_URL } from '@/constants';

export const CuisinePage: React.FC<{ cuisine: Cuisine }> = ({ cuisine }) => {
  const others = cuisines.filter((c) => c.slug !== cuisine.slug);

  return (
    <div className="about-page-wrapper">
      <Header variant="overlay" />

      <PageHero
        kicker={`🍽️ ${cuisine.name.toUpperCase()} · GURGAON & DELHI`}
        title={<>{cuisine.heading} <span>Done Fairly.</span></>}
        subtitle={`Order ${cuisine.name.toLowerCase()} at real menu prices — no surge pricing, nothing added at checkout.`}
        focal="center 35%"
        tint="rgba(255,159,67,0.18)"
      />

      <section className="blog-listing-section">
        <div className="wrap article-body">
          <nav className="article-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> › </span>
            <span>{cuisine.heading}</span>
          </nav>

          <section className="article-intro-section">
            {cuisine.intro.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </section>

          <section className="article-takeaways-box">
            <h2 className="article-subheading">📌 Before You Order {cuisine.name}</h2>
            <ul className="article-takeaways-list">
              {cuisine.orderingNotes.map((note, idx) => (
                <li key={idx}>
                  <span className="takeaway-bullet">✓</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="article-intro-section">
            <h2 className="article-subheading">Popular {cuisine.name} Dishes</h2>
            <div className="locality-grid">
              {cuisine.popularDishes.map((dish) => (
                <div key={dish} className="locality-card locality-card-static">
                  <strong>{dish}</strong>
                </div>
              ))}
            </div>
          </section>

          {cuisine.partnerBrands.length > 0 && (
            <section className="article-intro-section">
              <h2 className="article-subheading">{cuisine.name} Partners on USTART</h2>
              <p>Brands we partner with for {cuisine.name.toLowerCase()} across Gurgaon and Delhi:</p>
              <div className="locality-grid">
                {cuisine.partnerBrands.map((brand) => (
                  <div key={brand} className="locality-card locality-card-static">
                    <strong>{brand}</strong>
                  </div>
                ))}
              </div>
              <p className="article-note">
                Availability depends on your delivery address. Enter it in the app to see which of
                these are currently open near you.
              </p>
            </section>
          )}

          <section className="article-intro-section">
            <h2 className="article-subheading">Where to Order</h2>
            <div className="locality-grid">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  to={`/food-delivery/${city.slug}`}
                  className="locality-card"
                >
                  <strong>{cuisine.name} in {city.name}</strong>
                  <span>See areas we deliver to</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="article-faq-section">
            <h2 className="article-subheading">❓ {cuisine.heading} — FAQs</h2>
            <div className="article-faq-list">
              {cuisine.faq.map((item, idx) => (
                <div key={idx} className="article-faq-item">
                  <h3 className="faq-question">{item.q}</h3>
                  <p className="faq-answer">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="article-cta">
            <h2>Order {cuisine.name} Now</h2>
            <p>Real menu prices. No surge. Live tracking from the kitchen to your door.</p>
            <div className="article-cta-links">
              <a href={APP_DOWNLOAD_URL} className="btn btn-primary">
                Get the App
              </a>
            </div>
          </aside>

          <section className="article-intro-section">
            <h2 className="article-subheading">Other Cuisines</h2>
            <div className="locality-grid">
              {others.map((other) => (
                <Link key={other.slug} to={`/order/${other.slug}`} className="locality-card">
                  <strong>{other.name}</strong>
                  <span>{other.heading}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </div>
  );
};
