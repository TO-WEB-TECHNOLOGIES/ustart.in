import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const articles: Record<string, { tag: string; paragraphs: string[] }> = {
  "Why Food Delivery Bills Increase at Checkout and How to Avoid It": {
    tag: "📌 FEATURED · MOST-ASKED QUESTION",
    paragraphs: [
      "You see a meal for ₹199, add it to your cart, and suddenly your total reaches ₹299. Sound familiar? Food delivery bills often include extra charges such as delivery fees, platform fees, packaging costs, and surge pricing.",
      "While these charges may seem small individually, they can quickly add up. Understanding what you're paying for helps you make smarter ordering decisions and avoid unpleasant surprises at checkout.",
      "In this blog, we'll break down the common fees found on food delivery apps and share practical tips to help you save money on every order."
    ]
  },
  "Understanding Hidden Charges in Food Delivery Apps: A Complete Guide": {
    tag: "🔍 Fairness",
    paragraphs: [
      "Food delivery apps have made ordering food easier than ever, but many customers are confused by the extra costs that appear before payment.",
      "Hidden charges like convenience fees, surge fees, and packaging costs can significantly increase your final bill. The problem is that these charges are not always obvious when you first browse the menu.",
      "This guide explains the most common hidden fees, why platforms charge them, and how they affect your overall spending. Knowing what to look for can help you order more confidently and avoid unnecessary expenses."
    ]
  },
  "How Delivery Fees Work in Online Food Ordering Platforms": {
    tag: "🛵 Fairness",
    paragraphs: [
      "Ever wondered why delivery fees change from one order to another? Delivery charges are usually influenced by factors such as distance, order volume, weather conditions, and rider availability.",
      "Some platforms also increase fees during peak hours or high-demand periods. While delivery fees help cover logistics costs, customers often find them unpredictable.",
      "In this article, we'll explain how delivery fees are calculated and what factors impact the final amount. Understanding these costs can help you make informed choices and get better value from your food delivery experience."
    ]
  },
  "Menu Price Parity Explained: Why It Matters for Customers": {
    tag: "⚖️ Fairness",
    paragraphs: [
      "Have you ever noticed that the same dish sometimes costs more online than it does at the restaurant? This happens when restaurants increase menu prices on delivery platforms to cover commissions and other costs.",
      "Menu price parity means customers pay the same price online as they would in-store. It promotes transparency and helps customers know exactly what they're spending.",
      "In this blog, we'll explain what menu price parity is, why it matters, and how it can create a fairer experience for both customers and restaurants."
    ]
  },
  "The Real Cost of Convenience in Food Delivery": {
    tag: "💸 Fairness",
    paragraphs: [
      "Food delivery saves time and effort, but convenience often comes with a price. Beyond the food itself, customers may pay delivery charges, platform fees, packaging costs, and surge pricing.",
      "While many people are willing to pay for convenience, it's important to understand exactly where that money goes. This article explores the true cost of food delivery and explains how various fees contribute to your final bill.",
      "By understanding these costs, you can make better decisions about when and how to order food online."
    ]
  },
  "Rain Fees, Surge Pricing, and Peak Charges Explained": {
    tag: "🌧️ Fairness",
    paragraphs: [
      "Ordering food during bad weather or busy hours often means paying more. Many food delivery platforms increase prices when demand is high or when delivery conditions become difficult.",
      "These additional charges are commonly known as rain fees, surge pricing, or peak-hour charges. While platforms use them to balance demand and supply, customers often find them frustrating.",
      "In this blog, we'll explain why these charges exist, when they apply, and how they affect your food delivery bill so you can order more wisely."
    ]
  },
  "Are Food Delivery Memberships Really Worth It?": {
    tag: "🎟️ Fairness",
    paragraphs: [
      "Food delivery memberships promise benefits such as free delivery, exclusive discounts, and faster service. But are they actually worth paying for?",
      "The answer depends on how often you order food and how much you typically spend. For frequent users, memberships can offer significant savings over time. For occasional users, the benefits may not justify the cost.",
      "In this article, we'll examine the advantages and limitations of food delivery memberships and help you decide whether subscribing makes financial sense for your lifestyle."
    ]
  },
  "How to Save Money While Ordering Food Online": {
    tag: "💰 Fairness",
    paragraphs: [
      "Ordering food online doesn't have to be expensive. A few smart habits can help you reduce costs without sacrificing convenience.",
      "Comparing prices, avoiding peak hours, checking for offers, and understanding delivery fees can all make a difference. Many people spend more than necessary simply because they overlook small charges that add up over time.",
      "This blog shares practical strategies to help you save money on food delivery and get the most value from every order you place."
    ]
  },
  "Best Lunch Delivery Options for Working Professionals in Cyber City Gurgaon": {
    tag: "🏢 City & Culture",
    paragraphs: [
      "For busy professionals in Cyber City Gurgaon, lunch needs to be quick, convenient, and affordable. Whether you're working from an office or a coworking space, finding reliable food delivery options can make a big difference to your day.",
      "From healthy meals to comfort food and budget-friendly combos, there are plenty of choices available.",
      "In this article, we'll explore the factors professionals consider when ordering lunch and what makes a food delivery experience smooth during a busy workday."
    ]
  },
  "Food Delivery Trends Shaping Gurgaon in 2026": {
    tag: "📈 City & Culture",
    paragraphs: [
      "The way people order food continues to evolve. In Gurgaon, growing office culture, cloud kitchens, subscription services, and changing consumer preferences are influencing food delivery habits.",
      "Customers now expect faster deliveries, transparent pricing, and better value for money. Restaurants are also adapting by exploring new business models and digital solutions.",
      "This blog takes a closer look at the key trends shaping Gurgaon's food delivery market and what they could mean for customers and restaurants in the coming years."
    ]
  },
  "The Rise of Cloud Kitchens in Delhi NCR": {
    tag: "☁️ City & Culture",
    paragraphs: [
      "Cloud kitchens are changing the way food businesses operate across Delhi NCR. Unlike traditional restaurants, cloud kitchens focus only on preparing food for delivery, without the expense of maintaining a dining area.",
      "This allows them to serve customers efficiently while keeping operational costs lower. The growing popularity of online ordering has helped cloud kitchens expand rapidly in recent years.",
      "In this blog, we'll explore how cloud kitchens work, why they're becoming popular, and how they are shaping the future of food delivery for both businesses and customers."
    ]
  },
  "Why Gurgaon Professionals Are Looking for Better Food Delivery Alternatives": {
    tag: "🔎 City & Culture",
    paragraphs: [
      "Today's professionals want more than just fast delivery. They want fair pricing, reliable service, quality food, and a smooth ordering experience.",
      "Many customers are becoming more aware of hidden charges and unexpected costs that increase their food bills. As a result, people are actively looking for alternatives that offer transparency and better value.",
      "In this article, we'll discuss the changing expectations of Gurgaon professionals and the factors influencing their food delivery choices."
    ]
  },
  "Top Food Ordering Habits of Delhi NCR Consumers": {
    tag: "🍽️ City & Culture",
    paragraphs: [
      "Food delivery has become a part of everyday life for many people across Delhi NCR. From late-night cravings to office lunches and weekend family meals, consumer behavior continues to evolve.",
      "Convenience, affordability, speed, and variety are among the biggest factors influencing food choices. Understanding these habits helps businesses serve customers more effectively.",
      "This blog explores some of the most common food ordering trends and preferences seen among consumers across the region."
    ]
  },
  "How Hyperlocal Delivery Is Changing Food Ordering in Gurgaon": {
    tag: "📍 City & Culture",
    paragraphs: [
      "Hyperlocal delivery focuses on connecting customers with nearby restaurants for faster and more efficient service. Instead of relying on distant locations, customers can receive fresh meals from restaurants within their area.",
      "This approach benefits everyone involved by reducing delivery times, improving food quality, and supporting local businesses. As Gurgaon continues to grow, hyperlocal delivery is becoming an important part of the food ordering experience.",
      "In this article, we'll explore how this model is transforming the local food ecosystem."
    ]
  },
  "Why Restaurants Raise Prices on Food Delivery Platforms": {
    tag: "📊 Restaurants",
    paragraphs: [
      "Many customers are surprised when they discover that a dish costs more online than it does in the restaurant. One reason for this difference is the commission and operational costs restaurants face when using delivery platforms.",
      "To maintain profitability, some businesses increase menu prices on these platforms. While this practice helps cover expenses, it can also affect customer trust and satisfaction.",
      "This blog explains why restaurants adjust their prices and how these decisions impact both businesses and consumers."
    ]
  },
  "Restaurant Profit Margins Explained: What Happens to Every Order?": {
    tag: "🧮 Restaurants",
    paragraphs: [
      "When a customer places an order, the restaurant doesn't keep the entire amount. Costs such as ingredients, staff salaries, rent, packaging, taxes, and platform commissions all reduce the final profit.",
      "Many people are unaware of how challenging it can be for restaurants to maintain healthy margins while delivering quality food.",
      "In this article, we'll break down the journey of every order and explain where the money goes, helping customers better understand the economics of the food business."
    ]
  },
  "How High Commission Fees Impact Small Restaurants and Cloud Kitchens": {
    tag: "🏪 Restaurants",
    paragraphs: [
      "For small restaurants and cloud kitchens, every order matters. High commission fees charged by delivery platforms can significantly reduce profits, making it difficult for businesses to grow sustainably.",
      "Some restaurants respond by increasing menu prices, while others struggle to compete in a crowded market. Understanding the impact of these commissions is important for both restaurant owners and customers.",
      "This blog explores how commission structures affect local businesses and why fair pricing models are becoming increasingly important."
    ]
  },
  "What Restaurant Owners Should Know Before Joining a Food Delivery Platform": {
    tag: "📋 Restaurants",
    paragraphs: [
      "Joining a food delivery platform can help restaurants reach more customers, but it's important to understand the costs and challenges involved.",
      "Factors such as commission rates, operational requirements, customer support, and platform visibility can all affect success. Restaurant owners should carefully evaluate their options before making a decision.",
      "In this blog, we'll discuss key considerations that can help businesses choose the right platform and build a sustainable online presence."
    ]
  },
  "Why We Built USTART: Rethinking Food Delivery for Delhi NCR": {
    tag: "🚀 USTART News",
    paragraphs: [
      "Food delivery has become an essential part of modern life, but many customers and restaurants continue to face challenges such as hidden charges, inflated prices, and high commissions. We believe there is a better way.",
      "USTART was created with a simple goal: to make food delivery more transparent, affordable, and beneficial for everyone involved.",
      "In this article, we share the vision behind USTART and the problems we aim to solve for customers, restaurants, and delivery partners across Delhi NCR."
    ]
  },
  "Can Food Delivery Be Fair for Customers, Restaurants, and Delivery Partners?": {
    tag: "🤝 USTART News",
    paragraphs: [
      "The food delivery industry connects millions of people every day, but balancing the interests of customers, restaurants, and delivery partners is not always easy.",
      "Customers want affordable prices, restaurants need healthy profit margins, and delivery partners deserve fair opportunities. Creating a system that benefits everyone requires transparency, innovation, and sustainable business practices.",
      "In this blog, we'll explore what a fair food delivery ecosystem looks like and why building one is important for the future of the industry."
    ]
  }
};

export const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [blogExpanded, setBlogExpanded] = useState(false);
  const [activeArticle, setActiveArticle] = useState<string | null>(null);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    // Re-initialize scroll reveal observer for blog page elements
    const revealEls = document.querySelectorAll('.reveal, .reveal-tilt, .reveal-scale, .reveal-stamp, .reveal-left, .reveal-right, .reveal-pop, .reveal-flip, .sv-reveal, .sv-reveal-tilt, .sv-reveal-pop, .el-reveal, .dlx-reveal, .dlx-reveal-left, .dlx-reveal-right');
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

  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeArticle]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSubscribed(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="about-page-wrapper">
      <Header />

{/* ===== BLOG HERO ===== */}
<header className="subhero">
  <div className="subhero-orb subhero-orb-1"></div>
  <div className="subhero-orb subhero-orb-2"></div>
  <div className="subhero-inner">
    <span className="case-number reveal"><span className="pulse-dot">●</span>🍽️ FRESH FROM GURUGRAM · THE USTART BLOG</span>
    <h1 className="reveal d1">Food, Fairness & <span>Everything In Between.</span></h1>
    <p className="reveal d2">Straight answers on delivery fees, restaurant economics, and the fair way to order food — no fine print, no fluff.</p>
  </div>
</header>
{/* ===== FEATURED ARTICLE ===== */}

<section className="blog-listing-section">
  <svg className="doodle" style={{ top: "4%", right: "3%", width: "42px", opacity: "0.16" }} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="19" stroke="var(--terracotta)" stroke-width="2" fill="none"/>
    <circle cx="25" cy="25" r="8" stroke="var(--terracotta)" stroke-width="2" fill="none"/>
  </svg>

  <div className="featured-post reveal-scale">
    <div className="featured-post-inner">
      <div className="featured-post-visual"><img src="receipt_bill.png" alt="USTART food delivery bill breakdown showing delivery fee, platform fee, packaging charges and taxes" style={{ maxWidth: "100%", maxHeight: "260px", width: "auto", borderRadius: "10px", objectFit: "contain" }} /></div>
      <div className="featured-post-text">
        <span className="tag">📌 FEATURED · MOST-ASKED QUESTION</span>
        <h3>Why Food Delivery Bills Increase at Checkout and How to Avoid It</h3>
        <p><strong>Food delivery bills increase at checkout because additional charges — delivery fees, platform fees, packaging charges, taxes, and surge pricing — are added to the base menu price.</strong> While these fees help cover operational and logistics costs, they can significantly increase the final amount customers pay. Understanding where each charge comes from helps you compare platforms and order smarter.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("Why Food Delivery Bills Increase at Checkout and How to Avoid It"); }}>Read the full breakdown →</a>
      </div>
    </div>
  </div>

  <div className="blog-filters reveal">
    <span className={`blog-filter-pill ${activeCategory === 'All' ? 'active' : ''}`} onClick={() => setActiveCategory('All')}>All Articles</span>
    <span className={`blog-filter-pill ${activeCategory === 'Fairness' ? 'active' : ''}`} onClick={() => setActiveCategory('Fairness')}>Fairness</span>
    <span className={`blog-filter-pill ${activeCategory === 'Restaurants' ? 'active' : ''}`} onClick={() => setActiveCategory('Restaurants')}>Restaurants</span>
    <span className={`blog-filter-pill ${activeCategory === 'City & Culture' ? 'active' : ''}`} onClick={() => setActiveCategory('City & Culture')}>City &amp; Culture</span>
    <span className={`blog-filter-pill ${activeCategory === 'USTART News' ? 'active' : ''}`} onClick={() => setActiveCategory('USTART News')}>USTART News</span>
  </div>

  <div className="wrap">
    <div className="blog-grid" style={{ marginBottom: "0" }}><div className="blog-card reveal-tilt d1" data-cat="Fairness" style={{ "--r": "-1deg" , display: (activeCategory === 'All' || activeCategory === 'Fairness') ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">🔍 Fairness</span>
        <h4>Understanding Hidden Charges in Food Delivery Apps: A Complete Guide</h4>
        <p>Convenience fees, surge fees, and packaging costs can significantly increase your final bill — and they're not always obvious when you first browse the menu.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("Understanding Hidden Charges in Food Delivery Apps: A Complete Guide"); }}>Read More →</a>
      </div>
      <div className="blog-card reveal-tilt d2" data-cat="Fairness" style={{ "--r": "1.2deg" , display: (activeCategory === 'All' || activeCategory === 'Fairness') ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">🛵 Fairness</span>
        <h4>How Delivery Fees Work in Online Food Ordering Platforms</h4>
        <p>Delivery charges are usually influenced by distance, order volume, weather, and rider availability — which is why they change from order to order.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("How Delivery Fees Work in Online Food Ordering Platforms"); }}>Read More →</a>
      </div>
      <div className="blog-card reveal-tilt d3" data-cat="Fairness" style={{ "--r": "-0.8deg" , display: (activeCategory === 'All' || activeCategory === 'Fairness') ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">⚖️ Fairness</span>
        <h4>Menu Price Parity Explained: Why It Matters for Customers</h4>
        <p>Menu price parity means customers pay the same price online as they would in-store, promoting transparency across the board.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("Menu Price Parity Explained: Why It Matters for Customers"); }}>Read More →</a>
      </div>
      <div className="blog-card reveal-tilt d4" data-cat="Fairness" style={{ "--r": "1.4deg" , display: (activeCategory === 'All' || activeCategory === 'Fairness') ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">💸 Fairness</span>
        <h4>The Real Cost of Convenience in Food Delivery</h4>
        <p>Beyond the food itself, customers may pay delivery charges, platform fees, packaging costs, and surge pricing — here's where that money actually goes.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("The Real Cost of Convenience in Food Delivery"); }}>Read More →</a>
      </div>
      <div className="blog-card reveal-tilt d5" data-cat="Fairness" style={{ "--r": "-1.3deg" , display: (activeCategory === 'All' || activeCategory === 'Fairness') ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">🌧️ Fairness</span>
        <h4>Rain Fees, Surge Pricing, and Peak Charges Explained</h4>
        <p>Ordering during bad weather or busy hours often means paying more. Here's why these charges exist and when they apply.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("Rain Fees, Surge Pricing, and Peak Charges Explained"); }}>Read More →</a>
      </div>
      <div className="blog-card reveal-tilt d6" data-cat="Fairness" style={{ "--r": "0.9deg" , display: (activeCategory === 'All' || activeCategory === 'Fairness') ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">🎟️ Fairness</span>
        <h4>Are Food Delivery Memberships Really Worth It?</h4>
        <p>It depends on how often you order. For frequent users, memberships can offer real savings — for occasional users, maybe not.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("Are Food Delivery Memberships Really Worth It?"); }}>Read More →</a>
      </div>
      <div className="blog-card reveal-tilt d1" data-cat="Fairness" style={{ "--r": "-1.1deg" , display: (activeCategory === 'All' || activeCategory === 'Fairness') ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">💰 Fairness</span>
        <h4>How to Save Money While Ordering Food Online</h4>
        <p>Comparing prices, avoiding peak hours, and understanding delivery fees can all make a real difference to your final bill.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("How to Save Money While Ordering Food Online"); }}>Read More →</a>
      </div>
      <div className="blog-card reveal-tilt d2" data-cat="City & Culture" style={{ "--r": "0.7deg" , display: (activeCategory === 'All' || activeCategory === 'City & Culture') ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">🏢 City & Culture</span>
        <h4>Best Lunch Delivery Options for Working Professionals in Cyber City Gurgaon</h4>
        <p>For busy professionals, lunch needs to be quick, convenient, and affordable — here's what makes a food delivery experience smooth on a workday.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("Best Lunch Delivery Options for Working Professionals in Cyber City Gurgaon"); }}>Read More →</a>
      </div>
      <div className="blog-card reveal-tilt d3" data-cat="City & Culture" style={{ "--r": "-0.6deg" , display: (activeCategory === 'All' || activeCategory === 'City & Culture') ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">📈 City & Culture</span>
        <h4>Food Delivery Trends Shaping Gurgaon in 2026</h4>
        <p>Growing office culture, cloud kitchens, and subscription services are influencing how Gurgaon orders food this year.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("Food Delivery Trends Shaping Gurgaon in 2026"); }}>Read More →</a>
      </div>
      <div className="blog-card extra-card reveal-tilt d4" data-cat="City & Culture" style={{ "--r": "1.0deg" , display: (activeCategory === 'All' ? blogExpanded : (activeCategory === 'City & Culture')) ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">☁️ City & Culture</span>
        <h4>The Rise of Cloud Kitchens in Delhi NCR</h4>
        <p>Cloud kitchens focus only on preparing food for delivery, letting them serve customers efficiently while keeping costs lower.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("The Rise of Cloud Kitchens in Delhi NCR"); }}>Read More →</a>
      </div>
      <div className="blog-card extra-card reveal-tilt d5" data-cat="City & Culture" style={{ "--r": "-1.4deg" , display: (activeCategory === 'All' ? blogExpanded : (activeCategory === 'City & Culture')) ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">🔎 City & Culture</span>
        <h4>Why Gurgaon Professionals Are Looking for Better Food Delivery Alternatives</h4>
        <p>Today's professionals want more than fast delivery — they want fair pricing, reliable service, and a transparent ordering experience.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("Why Gurgaon Professionals Are Looking for Better Food Delivery Alternatives"); }}>Read More →</a>
      </div>
      <div className="blog-card extra-card reveal-tilt d6" data-cat="City & Culture" style={{ "--r": "0.5deg" , display: (activeCategory === 'All' ? blogExpanded : (activeCategory === 'City & Culture')) ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">🍽️ City & Culture</span>
        <h4>Top Food Ordering Habits of Delhi NCR Consumers</h4>
        <p>Convenience, affordability, speed, and variety are among the biggest factors influencing how the region orders food.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("Top Food Ordering Habits of Delhi NCR Consumers"); }}>Read More →</a>
      </div>
      <div className="blog-card extra-card reveal-tilt d1" data-cat="City & Culture" style={{ "--r": "-0.9deg" , display: (activeCategory === 'All' ? blogExpanded : (activeCategory === 'City & Culture')) ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">📍 City & Culture</span>
        <h4>How Hyperlocal Delivery Is Changing Food Ordering in Gurgaon</h4>
        <p>Connecting customers with nearby restaurants means faster delivery, fresher food, and stronger support for local businesses.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("How Hyperlocal Delivery Is Changing Food Ordering in Gurgaon"); }}>Read More →</a>
      </div>
      <div className="blog-card extra-card reveal-tilt d2" data-cat="Restaurants" style={{ "--r": "1.3deg" , display: (activeCategory === 'All' ? blogExpanded : (activeCategory === 'Restaurants')) ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">📊 Restaurants</span>
        <h4>Why Restaurants Raise Prices on Food Delivery Platforms</h4>
        <p>Commission and operational costs often push restaurants to increase menu prices online to stay profitable.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("Why Restaurants Raise Prices on Food Delivery Platforms"); }}>Read More →</a>
      </div>
      <div className="blog-card extra-card reveal-tilt d3" data-cat="Restaurants" style={{ "--r": "-0.5deg" , display: (activeCategory === 'All' ? blogExpanded : (activeCategory === 'Restaurants')) ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">🧮 Restaurants</span>
        <h4>Restaurant Profit Margins Explained: What Happens to Every Order?</h4>
        <p>Ingredients, staff, rent, packaging, taxes, and commissions all take a cut before a restaurant sees any real profit.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("Restaurant Profit Margins Explained: What Happens to Every Order?"); }}>Read More →</a>
      </div>
      <div className="blog-card extra-card reveal-tilt d4" data-cat="Restaurants" style={{ "--r": "0.8deg" , display: (activeCategory === 'All' ? blogExpanded : (activeCategory === 'Restaurants')) ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">🏪 Restaurants</span>
        <h4>How High Commission Fees Impact Small Restaurants and Cloud Kitchens</h4>
        <p>High commissions can significantly reduce profits for small businesses, making sustainable growth harder to achieve.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("How High Commission Fees Impact Small Restaurants and Cloud Kitchens"); }}>Read More →</a>
      </div>
      <div className="blog-card extra-card reveal-tilt d5" data-cat="Restaurants" style={{ "--r": "-1.2deg" , display: (activeCategory === 'All' ? blogExpanded : (activeCategory === 'Restaurants')) ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">📋 Restaurants</span>
        <h4>What Restaurant Owners Should Know Before Joining a Food Delivery Platform</h4>
        <p>Commission rates, operational requirements, and platform visibility all affect whether a partnership actually pays off.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("What Restaurant Owners Should Know Before Joining a Food Delivery Platform"); }}>Read More →</a>
      </div>
      <div className="blog-card extra-card reveal-tilt d6" data-cat="USTART News" style={{ "--r": "0.6deg" , display: (activeCategory === 'All' ? blogExpanded : (activeCategory === 'USTART News')) ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">🚀 USTART News</span>
        <h4>Why We Built USTART: Rethinking Food Delivery for Delhi NCR</h4>
        <p>USTART was created with one goal: make food delivery more transparent, affordable, and fair for everyone at the table.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("Why We Built USTART: Rethinking Food Delivery for Delhi NCR"); }}>Read More →</a>
      </div>
      <div className="blog-card extra-card reveal-tilt d1" data-cat="USTART News" style={{ "--r": "-0.7deg" , display: (activeCategory === 'All' ? blogExpanded : (activeCategory === 'USTART News')) ? '' : 'none'} as React.CSSProperties}>
        <span className="tag">🤝 USTART News</span>
        <h4>Can Food Delivery Be Fair for Customers, Restaurants, and Delivery Partners?</h4>
        <p>Balancing everyone's interests takes transparency and innovation — here's what a fair food delivery ecosystem actually looks like.</p>
        <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); setActiveArticle("Can Food Delivery Be Fair for Customers, Restaurants, and Delivery Partners?"); }}>Read More →</a>
      </div>
    </div>
    {activeCategory === 'All' && !blogExpanded && (
      <div className="blog-viewmore-wrap reveal" id="blogViewMoreWrap">
        <button type="button" className="blog-viewmore-btn" id="blogViewMoreBtn" onClick={() => setBlogExpanded(true)}>View More Articles ↓</button>
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
      <div className={`newsletter-success ${newsletterSubscribed ? 'show' : ''}`} id="nlSuccess">✅ You're on the list. Watch your inbox.</div>
    </div>
  </div>
</section>

{/* ===== FOOTER ===== */}
<Footer />

{/* ===== ARTICLE READ MODAL ===== */}





      {/* REACT DYNAMIC MODAL OVERLAY */}
      {activeArticle && (
        <div className="article-modal-overlay show" onClick={(e) => { if (e.target === e.currentTarget) setActiveArticle(null); }}>
          <div className="article-modal" role="dialog" aria-modal="true" aria-labelledby="articleModalTitle">
            <div className="article-modal-head">
              <button className="article-modal-close" onClick={() => setActiveArticle(null)} aria-label="Close article">✕</button>
              <span className="tag" id="articleModalTag">{articles[activeArticle]?.tag || '📌 USTART BLOG'}</span>
              <h2 id="articleModalTitle">{activeArticle}</h2>
            </div>
            <div className="article-modal-body" id="articleModalBody">
              {articles[activeArticle]?.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <div className="article-modal-foot">
              <button className="btn btn-outline" onClick={() => setActiveArticle(null)} style={{ width: '100%' }}>Close Article</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
