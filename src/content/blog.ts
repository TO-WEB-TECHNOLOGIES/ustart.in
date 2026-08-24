/**
 * Blog content, extracted out of BlogPage.tsx so server components
 * (`app/blog/[slug]/page.tsx`, `app/sitemap.ts`) can import it without pulling
 * in the `'use client'` boundary.
 *
 * `id` doubles as the URL slug — keep it kebab-case, lowercase, and STABLE.
 * Changing an id changes the article's URL and drops whatever ranking it holds;
 * if one must change, add a 301 in next.config.ts.
 */

export type ArticleCategory = 'Fairness' | 'City & Culture' | 'Restaurants';

export interface Article {
  /** URL slug. Stable — see file header. */
  id: string;
  title: string;
  tag: string;
  category: ArticleCategory;
  /** Meta description + og:description. Keep under ~155 chars. */
  description: string;
  /** Primary query this article targets. Drives internal linking, not a meta tag. */
  targetKeyword: string;
  directAnswer: string;
  introduction: string[];
  keyTakeaways: string[];
  faq?: Array<{ q: string; a: string }>;
  /**
   * First publication date (W3C). These 13 articles were unreachable — locked
   * behind a client-side modal with no URL — until the /blog/[slug] routes
   * shipped, so this is their genuine first-publish date.
   */
  publishedAt: string;
  /**
   * Last significant content change. Bump this by hand when you materially edit
   * an article; it feeds <lastmod> in the sitemap. Do NOT bump it for typo or
   * styling changes — Google stops trusting lastmod when it can't be verified
   * against real content changes.
   */
  updatedAt: string;
  tilt?: string;
  delayClass?: string;
}

/** Date the /blog/[slug] routes went live and these articles first became crawlable. */
const FIRST_PUBLISHED = '2026-08-18';

export const articles: Article[] = [
  {
    id: 'how-delivery-fees-work',
    title: 'How Delivery Fees Work in Online Food Ordering Platforms',
    tag: '🛵 Fairness',
    category: 'Fairness',
    description:
      'How food delivery fees are actually calculated — distance, demand, weather and rider availability — and why your charge changes between orders.',
    targetKeyword: 'how delivery fees work',
    directAnswer:
      'Delivery fees are usually calculated based on factors such as distance, demand, traffic conditions, weather, and delivery partner availability.',
    introduction: [
      'Delivery fees help food delivery platforms cover the costs of transporting meals from restaurants to customers. However, these fees are not always fixed and can change depending on several factors.',
      'A nearby restaurant may have lower delivery charges than one located farther away. During busy periods or poor weather conditions, fees may increase due to higher demand.',
      'Understanding how delivery charges are calculated helps customers better evaluate the true cost of ordering food online and choose options that provide better value.',
    ],
    keyTakeaways: [
      'Distance often affects delivery charges.',
      'High demand can increase delivery fees.',
      'Understanding delivery costs improves budgeting.',
    ],
    faq: [
      {
        q: 'Why do delivery charges change frequently?',
        a: 'Delivery charges often fluctuate based on demand, distance, and rider availability.',
      },
    ],
    publishedAt: FIRST_PUBLISHED,
    updatedAt: FIRST_PUBLISHED,
    tilt: '-1deg',
    delayClass: 'd1',
  },
  {
    id: 'what-is-menu-price-parity',
    title: 'What Is Menu Price Parity and Why Does It Matter?',
    tag: '⚖️ Fairness',
    category: 'Fairness',
    description:
      'Menu price parity means paying the same price online as in-store. Here is what it is, why online prices drift higher, and why it matters for customers.',
    targetKeyword: 'menu price parity',
    directAnswer:
      'Menu price parity means that a restaurant charges the same price for a dish online as it does in-store, helping ensure pricing transparency for customers.',
    introduction: [
      'Many customers notice that food prices can differ between delivery apps and restaurant menus. This often happens because restaurants adjust online prices to manage additional operational costs. Menu price parity aims to eliminate this difference by maintaining consistent pricing across ordering channels.',
      'For customers, it creates greater transparency and trust. For restaurants, it can strengthen customer relationships by providing clarity around pricing. As transparency becomes more important in the food delivery industry, menu price parity is receiving increased attention from both consumers and businesses.',
    ],
    keyTakeaways: [
      'Menu price parity promotes pricing transparency.',
      'Customers can compare prices more confidently.',
      'Consistent pricing improves trust.',
    ],
    faq: [
      {
        q: 'Why are online food prices sometimes higher?',
        a: 'Restaurants may increase prices online to offset platform-related costs and commissions.',
      },
    ],
    publishedAt: FIRST_PUBLISHED,
    updatedAt: FIRST_PUBLISHED,
    tilt: '1.2deg',
    delayClass: 'd2',
  },
  {
    id: 'real-cost-of-convenience',
    title: 'The Real Cost of Convenience in Food Delivery',
    tag: '💸 Fairness',
    category: 'Fairness',
    description:
      'Delivery fees, packaging charges, service fees and platform costs all sit on top of your meal. A breakdown of what convenience actually costs per order.',
    targetKeyword: 'real cost of food delivery',
    directAnswer:
      'The convenience of food delivery often includes additional costs such as delivery fees, packaging charges, service fees, and platform-related expenses.',
    introduction: [
      'Food delivery has transformed the way people order meals, making it possible to enjoy restaurant food without leaving home or the office. However, convenience comes at a cost. Beyond the price of the meal itself, customers may pay several additional charges that contribute to the final bill.',
      'While many people are willing to pay for convenience, understanding these costs helps them make informed decisions. This article explores the expenses involved in food delivery and explains how convenience impacts overall spending.',
    ],
    keyTakeaways: [
      'Convenience often involves multiple extra charges.',
      'Delivery costs vary across platforms.',
      'Understanding expenses helps customers manage spending.',
    ],
    publishedAt: FIRST_PUBLISHED,
    updatedAt: FIRST_PUBLISHED,
    tilt: '-0.8deg',
    delayClass: 'd3',
  },
  {
    id: 'rain-fees-surge-pricing-peak-charges',
    title: 'Rain Fees, Surge Pricing, and Peak Charges Explained',
    tag: '🌧️ Fairness',
    category: 'Fairness',
    description:
      'Why food delivery costs more when it rains or at peak meal times — what rain fees and surge pricing are, when they apply, and how to order around them.',
    targetKeyword: 'surge pricing food delivery',
    directAnswer:
      'Rain fees and surge pricing are temporary charges applied when delivery demand is high or operating conditions become more challenging.',
    introduction: [
      'Many customers notice higher delivery costs during rainy weather, weekends, or busy meal times. These additional fees are commonly known as surge pricing or peak charges. Delivery platforms use these fees to manage demand and encourage more delivery partners to become available.',
      'While they help maintain service levels, they can also increase the final cost of ordering food. Understanding why these charges exist allows customers to make more informed decisions about when and how they place orders.',
    ],
    keyTakeaways: [
      'Surge pricing usually occurs during high demand.',
      'Weather conditions can affect delivery costs.',
      'Timing can influence the final order price.',
    ],
    publishedAt: FIRST_PUBLISHED,
    updatedAt: FIRST_PUBLISHED,
    tilt: '1.4deg',
    delayClass: 'd4',
  },
  {
    id: 'are-food-delivery-memberships-worth-it',
    title: 'Are Food Delivery Memberships Really Worth It?',
    tag: '🎟️ Fairness',
    category: 'Fairness',
    description:
      'Free delivery, discounts, priority service — but do food delivery memberships pay for themselves? How to work out the break-even for your ordering habits.',
    targetKeyword: 'food delivery membership worth it',
    directAnswer:
      'Food delivery memberships can provide value for frequent users by offering benefits such as free delivery, discounts, and exclusive offers.',
    introduction: [
      'Many food delivery platforms offer subscription plans designed to help customers save money. These memberships often include benefits such as reduced delivery fees, special discounts, and priority service.',
      'However, whether a membership is worthwhile depends on how often a customer orders food. Frequent users may recover the subscription cost through savings, while occasional users may see limited benefits. This article examines the advantages and limitations of food delivery memberships to help customers make informed decisions.',
    ],
    keyTakeaways: [
      'Membership value depends on ordering frequency.',
      'Frequent users often benefit the most.',
      'Comparing savings against subscription costs is important.',
    ],
    publishedAt: FIRST_PUBLISHED,
    updatedAt: FIRST_PUBLISHED,
    tilt: '-1.3deg',
    delayClass: 'd5',
  },
  {
    id: 'how-to-save-money-ordering-food',
    title: 'How to Save Money While Ordering Food Online',
    tag: '💰 Fairness',
    category: 'Fairness',
    description:
      'Practical ways to cut your food delivery bill — comparing prices, avoiding peak hours, using offers well, and understanding how platform fees stack up.',
    targetKeyword: 'save money ordering food online',
    directAnswer:
      'Customers can save money on food delivery by comparing prices, avoiding peak hours, using offers strategically, and understanding fee structures.',
    introduction: [
      'Food delivery is convenient, but regular ordering can become expensive if customers are not aware of the costs involved. Small charges added across multiple orders can significantly increase monthly spending. Fortunately, there are several ways to reduce costs without sacrificing convenience. From choosing the right ordering time to understanding platform fees and comparing offers, simple habits can lead to meaningful savings. This guide shares practical strategies to help customers get better value from every order.',
    ],
    keyTakeaways: [
      'Small savings add up over time.',
      'Understanding fees helps reduce unnecessary spending.',
      'Strategic ordering can lower costs.',
    ],
    publishedAt: FIRST_PUBLISHED,
    updatedAt: FIRST_PUBLISHED,
    tilt: '0.9deg',
    delayClass: 'd6',
  },
  {
    id: 'best-lunch-delivery-cyber-city-gurgaon',
    title: 'Best Lunch Delivery Options for Working Professionals in Cyber City Gurgaon',
    tag: '🏢 City & Culture',
    category: 'City & Culture',
    description:
      'What Cyber City professionals actually want from lunch delivery — speed, fair pricing and reliability — and how to order well on a packed workday.',
    targetKeyword: 'lunch delivery cyber city gurgaon',
    directAnswer:
      'Working professionals in Cyber City Gurgaon often prioritize fast delivery, affordable meals, reliable service, and healthy food options during busy workdays.',
    introduction: [
      "Cyber City is one of Gurgaon's busiest business hubs, home to thousands of professionals who depend on food delivery services every day. Whether ordering lunch during a hectic work schedule or arranging meals for team meetings, convenience and reliability are essential.",
      'Customers increasingly seek platforms that offer transparent pricing, timely deliveries, and a wide variety of food choices. Understanding these preferences helps businesses create better dining experiences for working professionals.',
    ],
    keyTakeaways: [
      'Convenience is a major factor for office workers.',
      'Fast delivery is highly valued during lunch hours.',
      'Affordable meal options remain important.',
    ],
    publishedAt: FIRST_PUBLISHED,
    updatedAt: FIRST_PUBLISHED,
    tilt: '-1.1deg',
    delayClass: 'd1',
  },
  {
    id: 'food-delivery-trends-gurgaon-2026',
    title: 'Food Delivery Trends Shaping Gurgaon in 2026',
    tag: '📈 City & Culture',
    category: 'City & Culture',
    description:
      "The trends reshaping Gurgaon's food delivery market in 2026 — cloud kitchens, transparent pricing, and customers who have stopped accepting hidden fees.",
    targetKeyword: 'food delivery trends gurgaon',
    directAnswer:
      'Food delivery trends in Gurgaon are being driven by changing consumer expectations, technology adoption, cloud kitchens, and demand for transparent pricing.',
    introduction: [
      "Gurgaon's food delivery market continues to evolve as customers become more selective about where and how they order food. Convenience remains important, but consumers are increasingly looking for affordability, transparency, and reliability.",
      'At the same time, restaurants are exploring new business models such as cloud kitchens and digital-first operations. These changes are shaping the future of food delivery across the city. Understanding emerging trends helps both consumers and businesses adapt to a rapidly changing market.',
    ],
    keyTakeaways: [
      'Consumer expectations are evolving rapidly.',
      'Cloud kitchens continue to grow.',
      'Transparency is becoming a competitive advantage.',
    ],
    publishedAt: FIRST_PUBLISHED,
    updatedAt: FIRST_PUBLISHED,
    tilt: '0.7deg',
    delayClass: 'd2',
  },
  {
    id: 'rise-of-cloud-kitchens-delhi-ncr',
    title: 'The Rise of Cloud Kitchens in Delhi NCR',
    tag: '☁️ City & Culture',
    category: 'City & Culture',
    description:
      'Cloud kitchens are delivery-only restaurants with no dine-in space. How the model works, why it is growing across Delhi NCR, and what it means for customers.',
    targetKeyword: 'cloud kitchens delhi ncr',
    directAnswer:
      'Cloud kitchens are delivery-only food businesses that prepare meals without a dine-in facility. They help reduce operational costs while serving customers through online food delivery platforms.',
    introduction: [
      "Cloud kitchens have become one of the fastest-growing segments of India's food delivery industry. By eliminating the need for expensive dining spaces, these businesses can focus entirely on food preparation and delivery. This model allows restaurant owners to operate more efficiently while expanding their reach through online ordering platforms. In Delhi NCR, the growing demand for convenience and digital ordering has accelerated the rise of cloud kitchens. Understanding how they work helps customers and restaurant owners better understand the future of food delivery.",
    ],
    keyTakeaways: [
      'Cloud kitchens operate without dine-in facilities.',
      'They reduce operating costs for businesses.',
      'They are driving innovation in food delivery.',
    ],
    faq: [
      {
        q: 'What is a cloud kitchen?',
        a: 'A cloud kitchen is a delivery-only restaurant that serves customers through online ordering platforms.',
      },
    ],
    publishedAt: FIRST_PUBLISHED,
    updatedAt: FIRST_PUBLISHED,
    tilt: '-0.6deg',
    delayClass: 'd3',
  },
  {
    id: 'why-gurgaon-professionals-look-for-alternatives',
    title: 'Why Gurgaon Professionals Are Looking for Better Food Delivery Alternatives',
    tag: '🔎 City & Culture',
    category: 'City & Culture',
    description:
      'Rising fees, inconsistent service and opaque pricing are pushing Gurgaon professionals to switch food delivery apps. What they expect from an alternative.',
    targetKeyword: 'best food delivery alternative gurgaon',
    directAnswer:
      'Many Gurgaon professionals are looking for better food delivery options because they want transparent pricing, reliable service, faster deliveries, and greater value for money.',
    introduction: [
      'Food delivery has become an essential part of daily life for working professionals. However, rising costs, hidden fees, inconsistent delivery experiences, and changing customer expectations are encouraging many users to explore alternative platforms.',
      "Today's consumers are more informed than ever and expect clear pricing, dependable service, and quality food. As Gurgaon continues to grow as a major business hub, food delivery platforms must adapt to these evolving needs. This article explores the key factors influencing consumer preferences and what professionals now expect from food delivery services.",
    ],
    keyTakeaways: [
      'Professionals value transparency and affordability.',
      'Reliable delivery remains a top priority.',
      'Consumer expectations are evolving rapidly.',
    ],
    faq: [
      {
        q: 'What do working professionals want from food delivery apps?',
        a: 'Most professionals want fair pricing, convenience, reliability, and a smooth ordering experience.',
      },
    ],
    publishedAt: FIRST_PUBLISHED,
    updatedAt: FIRST_PUBLISHED,
    tilt: '1.0deg',
    delayClass: 'd4',
  },
  {
    id: 'top-food-ordering-habits-delhi-ncr',
    title: 'Top Food Ordering Habits of Delhi NCR Consumers',
    tag: '🍽️ City & Culture',
    category: 'City & Culture',
    description:
      'How Delhi NCR orders food — office lunches, family dinners, late-night cravings — and the factors that decide which app people actually open.',
    targetKeyword: 'food ordering habits delhi ncr',
    directAnswer:
      'Consumers in Delhi NCR primarily prioritize convenience, affordability, delivery speed, food quality, and discounts when ordering food online.',
    introduction: [
      "Online food ordering has become deeply integrated into everyday life across Delhi NCR. Whether it's office lunches, family dinners, weekend treats, or late-night cravings, customers have developed unique ordering patterns based on their lifestyles and preferences. Factors such as convenience, pricing, delivery speed, and restaurant variety strongly influence purchasing decisions. Understanding these habits helps businesses improve customer experiences while adapting to changing market trends. This article examines the most common food ordering behaviors shaping the region's rapidly growing delivery ecosystem.",
    ],
    keyTakeaways: [
      'Convenience drives food ordering decisions.',
      'Price and discounts remain important.',
      'Consumer habits continue to evolve.',
    ],
    faq: [
      {
        q: 'What influences food ordering decisions the most?',
        a: 'Convenience, price, food quality, and delivery speed are among the biggest factors.',
      },
    ],
    publishedAt: FIRST_PUBLISHED,
    updatedAt: FIRST_PUBLISHED,
    tilt: '-1.4deg',
    delayClass: 'd5',
  },
  {
    id: 'how-hyperlocal-delivery-is-changing-food-ordering',
    title: 'How Hyperlocal Delivery Is Changing Food Ordering in Gurgaon',
    tag: '📍 City & Culture',
    category: 'City & Culture',
    description:
      'Hyperlocal delivery pairs you with nearby restaurants to cut wait times and keep food hot. Why the model is reshaping food ordering across Gurgaon.',
    targetKeyword: 'hyperlocal food delivery gurgaon',
    directAnswer:
      'Hyperlocal delivery connects customers with nearby restaurants, reducing delivery times and improving overall food quality and customer satisfaction.',
    introduction: [
      'Hyperlocal delivery has emerged as an effective solution for improving food delivery experiences in growing cities like Gurgaon. By focusing on restaurants within a specific geographic area, businesses can provide faster deliveries while ensuring food arrives fresher.',
      'Customers benefit from shorter waiting times, while local restaurants gain greater visibility within their communities. As demand for speed and convenience continues to increase, hyperlocal delivery models are becoming an important part of the modern food delivery ecosystem.',
    ],
    keyTakeaways: [
      'Hyperlocal delivery improves speed and efficiency.',
      'Customers receive fresher meals.',
      'Local restaurants gain greater visibility.',
    ],
    faq: [
      {
        q: 'What is hyperlocal food delivery?',
        a: 'Hyperlocal delivery focuses on delivering products from businesses located near the customer.',
      },
    ],
    publishedAt: FIRST_PUBLISHED,
    updatedAt: FIRST_PUBLISHED,
    tilt: '0.5deg',
    delayClass: 'd6',
  },
  {
    id: 'why-restaurants-raise-prices',
    title: 'Why Restaurants Raise Prices on Food Delivery Platforms',
    tag: '📊 Restaurants',
    category: 'Restaurants',
    description:
      'The same dish often costs more online than in the restaurant. Commissions, packaging and marketing costs explain the gap — here is how the economics work.',
    targetKeyword: 'why food costs more online than restaurant',
    directAnswer:
      'Restaurants often increase online menu prices to offset commissions, packaging expenses, promotional costs, and other operational fees associated with food delivery platforms.',
    introduction: [
      'Many customers notice that the same meal can cost more online than it does in a restaurant. This pricing difference is often a result of additional expenses that restaurants face when operating through delivery platforms.',
      'From commission fees and packaging costs to marketing expenses and platform-related charges, businesses must account for several costs that do not exist with dine-in orders. Understanding these factors helps customers gain a clearer picture of restaurant pricing and the economics behind online food delivery.',
    ],
    keyTakeaways: [
      'Online operations involve additional costs.',
      'Restaurants adjust prices to maintain profitability.',
      'Pricing differences are common across delivery platforms.',
    ],
    faq: [
      {
        q: 'Why does food cost more online than in restaurants?',
        a: 'Restaurants often adjust prices online to cover platform commissions and operational expenses.',
      },
    ],
    publishedAt: FIRST_PUBLISHED,
    updatedAt: FIRST_PUBLISHED,
    tilt: '-0.9deg',
    delayClass: 'd1',
  },
  {
    id: 'food-delivery-delhi-ncr-guide',
    title: 'Food Delivery in Delhi NCR: A Simple Guide by USTART',
    tag: '🏙️ City & Culture',
    category: 'City & Culture',
    description:
      'A simple guide to food delivery in Delhi NCR, covering restaurant choice, clear pricing, local ordering patterns and USTART\'s delivery experience.',
    targetKeyword: 'food delivery delhi ncr',
    directAnswer:
      'Food delivery in Delhi NCR lets customers order meals from local restaurants without travelling, while USTART connects customers with independent restaurants and delivery riders with upfront fee visibility and free delivery on eligible orders above ₹199.',
    introduction: [
      'If you are looking for food delivery in Delhi NCR, this guide explains how ordering works and what to check before placing an order. You can choose from restaurants and cuisines near your location, whether you need lunch at work, dinner at home or food for a group.',
      'USTART is a food delivery marketplace that connects customers with independent restaurants and delivery riders. Customers can discover restaurants, browse menus, review applicable charges and place an order from their home, workplace or another eligible location without travelling to the restaurant.',
      'Delhi NCR has very different food-ordering patterns across neighbourhoods. A customer working around Cyber City may be ordering during a short weekday lunch window, while someone in Dwarka may be ordering dinner for a family at home. In Hauz Khas and Saket, late-evening ordering can be influenced by cafes, restaurants, entertainment and residential demand.',
      'That local difference is why choosing a delivery platform is not only about finding food. Customers also need to know which restaurants are available, understand the final order value and consider conditions such as weather, traffic and restaurant operating hours before ordering.',
    ],
    keyTakeaways: [
      'Food delivery connects Delhi NCR customers with nearby restaurants.',
      'Restaurant availability can change by location and time of day.',
      'Customers should review the final order value before payment.',
    ],
    faq: [
      {
        q: 'What is food delivery in Delhi NCR?',
        a: 'Food delivery allows customers to order meals from restaurants and have them delivered to their home, workplace or another eligible location within the delivery area.',
      },
      {
        q: 'Can I order food online in Gurugram through USTART?',
        a: 'Yes. USTART serves customers across Gurugram and Delhi, subject to restaurant and delivery availability at the customer\'s location.',
      },
      {
        q: 'Does USTART offer free food delivery?',
        a: 'USTART offers free delivery on eligible orders above ₹199, subject to applicable terms and availability.',
      },
      {
        q: 'Can weather affect food delivery?',
        a: 'Yes. Heavy rain and difficult road conditions can affect traffic and delivery conditions. Actual conditions depend on the location, weather and traffic at the time of the order.',
      },
    ],
    publishedAt: '2026-08-24',
    updatedAt: '2026-08-24',
    tilt: '0.8deg',
    delayClass: 'd2',
  },
];

export const ARTICLE_CATEGORIES: ArticleCategory[] = ['Fairness', 'City & Culture', 'Restaurants'];

export const getArticleBySlug = (slug: string): Article | undefined =>
  articles.find((article) => article.id === slug);

/** Related posts for internal linking: same category first, then anything else. */
export const getRelatedArticles = (slug: string, limit = 3): Article[] => {
  const current = getArticleBySlug(slug);
  if (!current) return articles.slice(0, limit);

  const sameCategory = articles.filter((a) => a.id !== slug && a.category === current.category);
  const rest = articles.filter((a) => a.id !== slug && a.category !== current.category);

  return [...sameCategory, ...rest].slice(0, limit);
};
