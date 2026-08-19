/**
 * Standalone landing pages for high-intent, non-geographic queries — the
 * "differentiator" and "occasion" keyword clusters.
 *
 * These are USTART's strongest SEO wedge. Head terms like "food delivery gurgaon"
 * are dominated by incumbents with a decade of authority; queries like "food
 * delivery without hidden charges" are lower competition, higher intent, and
 * describe something structurally true about this product and not about theirs.
 */

export interface IntentSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface IntentPage {
  slug: string;
  kicker: string;
  /** JSX-free H1 text. The view splits the final word into the accent span. */
  h1: string;
  title: string;
  description: string;
  targetKeyword: string;
  lede: string;
  sections: IntentSection[];
  faq: Array<{ q: string; a: string }>;
  updatedAt: string;
}

const UPDATED = '2026-08-18';

export const intentPages: Record<string, IntentPage> = {
  'food-delivery-without-hidden-charges': {
    slug: 'food-delivery-without-hidden-charges',
    kicker: '💸 TRANSPARENT PRICING',
    h1: 'Food Delivery Without Hidden Charges',
    title: 'Food Delivery Without Hidden Charges — Gurgaon & Delhi',
    description:
      'A ₹199 meal should cost ₹199. How USTART removes platform fees, surge pricing and menu markups so the price you see is the price you pay.',
    targetKeyword: 'food delivery without hidden charges',
    lede: 'You see a meal for ₹199, add it to your cart, and the total reaches ₹299. This page explains exactly where that gap comes from — and what we removed to close it.',
    sections: [
      {
        heading: 'Where the extra ₹100 usually comes from',
        paragraphs: [
          'The gap between a menu price and a checkout total is rarely one big charge. It is an accumulation of small ones, each individually defensible and collectively substantial.',
        ],
        bullets: [
          'Menu markup — the restaurant raised its online price to absorb a platform commission.',
          'Platform or convenience fee — charged by the app, not the restaurant.',
          'Delivery fee — variable by distance, demand and weather.',
          'Surge or rain fee — a demand-based multiplier applied at peak times.',
          'Packaging charge — set by the restaurant, often revealed late in the flow.',
        ],
      },
      {
        heading: 'The one that hides best: menu markup',
        paragraphs: [
          'Of everything on that list, menu markup is the hardest to see, because it never appears as a line item. It is baked into the price you thought was the base price.',
          'It also has a specific cause. When a platform takes a large commission on every order, a restaurant has two options: absorb it and lose margin, or raise its online prices and stay whole. Most raise prices. The fee never shows up on your bill because it was already inside the number at the top.',
        ],
      },
      {
        heading: 'What USTART does differently',
        paragraphs: [
          'We keep partner commissions low enough that restaurants do not need to run a separate, higher online menu to stay profitable. That is the mechanism — everything else follows from it.',
        ],
        bullets: [
          'Menu-price parity: online prices track what the restaurant charges offline.',
          'No surge pricing, ever — not at peak hours, not in the rain, not at midnight.',
          'No platform or convenience fee added at checkout.',
          'Any charge that does apply is shown in the breakdown before you pay, not after.',
        ],
      },
      {
        heading: 'How to check this yourself',
        paragraphs: [
          'Do not take the claim on trust. Pick a restaurant you know, compare its USTART menu price against what it charges in-store, then compare the checkout total against the sum of the items. Both numbers should reconcile. That is the entire test, and it is the one worth running on any delivery app.',
        ],
      },
    ],
    faq: [
      {
        q: 'Does USTART charge a platform fee?',
        a: 'No. There is no platform or convenience fee added at checkout. Any charge that does apply to your order appears in the price breakdown before you pay.',
      },
      {
        q: 'Is there surge pricing during rain or peak hours?',
        a: 'No. USTART does not apply surge, rain or peak-hour pricing at any time. The price does not change based on demand.',
      },
      {
        q: 'Why are menu prices sometimes higher on other apps?',
        a: 'Restaurants often raise their online menu prices to offset the commission a platform charges on each order. Because USTART keeps partner commissions low, partners do not need to run a higher online price to stay profitable.',
      },
      {
        q: 'Is delivery free on USTART?',
        a: 'Delivery is not free by default, and the fee is shown up front rather than at the last step. USTART Elite members get free delivery on qualifying orders above the membership threshold.',
      },
    ],
    updatedAt: UPDATED,
  },

  'late-night-food-delivery': {
    slug: 'late-night-food-delivery',
    kicker: '🌙 LATE NIGHT',
    h1: 'Late Night Food Delivery',
    title: 'Late Night Food Delivery in Gurgaon & Delhi',
    description:
      'Order late night food in Gurgaon and Delhi with no midnight surge pricing. Which areas stay active after hours and how to order well at 2am.',
    targetKeyword: 'late night food delivery gurgaon',
    lede: 'Late-night ordering is where delivery pricing usually gets worst — demand is high, supply is thin, and surge multipliers do the rest. On USTART the price at 2am is the price at 2pm.',
    sections: [
      {
        heading: 'No midnight markup',
        paragraphs: [
          'Most platforms treat late-night demand as a pricing opportunity. Fewer riders are available, orders keep coming, and a multiplier closes the gap.',
          'We do not apply one. There is no surge pricing on USTART at any hour, which means a late-night order costs what the same order costs at lunchtime. The constraint after midnight is which kitchens are open, not what they will charge you.',
        ],
      },
      {
        heading: 'Where late-night ordering actually works',
        paragraphs: [
          'Late-night availability is uneven across the NCR, and it tracks where people are awake rather than where people live.',
        ],
        bullets: [
          'Sector 29, Gurgaon — the highest concentration of genuinely late-operating kitchens in the city.',
          'DLF Phase 3, Gurgaon — a large resident population of young professionals who eat late.',
          'Udyog Vihar, Gurgaon — night-shift demand from the business estate keeps activity steady.',
          'Hauz Khas, Delhi — the Village runs later than most of south Delhi.',
          'Connaught Place, Delhi — late activity driven by central-Delhi nightlife rather than residents.',
        ],
      },
      {
        heading: 'Ordering well after midnight',
        paragraphs: [
          'A few things matter more at 2am than they do at lunch, mostly because there is less margin for error in the system.',
        ],
        bullets: [
          'The app shows live restaurant availability — what you see open is genuinely accepting orders.',
          'Kitchen options narrow as the night goes on, so ordering earlier in the window gives you more choice.',
          'Gate and building access is harder at night. A reachable phone number in the delivery notes matters more than usual.',
          'Rolls, biryani and North Indian gravies hold up better over a longer late-night route than fried food does.',
        ],
      },
    ],
    faq: [
      {
        q: 'Does USTART charge more for late-night delivery?',
        a: 'No. There is no late-night, midnight or peak-hour surcharge. Prices do not change based on the time you order.',
      },
      {
        q: 'How late can I order food in Gurgaon?',
        a: 'It depends on which partner kitchens are still open rather than on a fixed platform cut-off. The app shows live availability, so what appears open at 2am is genuinely accepting orders.',
      },
      {
        q: 'Which areas have the best late-night options?',
        a: 'In Gurgaon, Sector 29 has the most genuinely late-operating kitchens, with DLF Phase 3 and Udyog Vihar also staying active. In Delhi, Hauz Khas and Connaught Place run latest.',
      },
    ],
    updatedAt: UPDATED,
  },

  'office-lunch-delivery': {
    slug: 'office-lunch-delivery',
    kicker: '🏢 WORKDAY LUNCH',
    h1: 'Office Lunch Delivery',
    title: 'Office & Corporate Lunch Delivery in Gurgaon & Delhi',
    description:
      'Office lunch delivery across Cyber City, Udyog Vihar, Connaught Place and Nehru Place — real menu prices, no surge, and tips for ordering for a team.',
    targetKeyword: 'office lunch delivery gurgaon',
    lede: 'Weekday lunch between 1pm and 2:30pm is the single busiest delivery window in the NCR, and it is concentrated in a handful of buildings. Here is how to order into that without waiting.',
    sections: [
      {
        heading: 'Why the lunch peak is different',
        paragraphs: [
          'Most delivery demand is spread across a city. Office lunch is not — it originates from a small number of towers, all at once, within a ninety-minute window.',
          'That concentration is what makes lunch feel slower than dinner even when the kitchens are faster. The bottleneck is rarely the cooking; it is the number of simultaneous orders leaving the same few restaurants for the same few buildings.',
        ],
      },
      {
        heading: 'The business districts we serve',
        paragraphs: ['Coverage is deepest where the weekday lunch demand actually is.'],
        bullets: [
          'Cyber City, Gurgaon — the densest office lunch market in the NCR.',
          'Udyog Vihar, Gurgaon — shift patterns mean lunch demand runs wider than the standard window.',
          'Golf Course Road, Gurgaon — offices along the commercial stretches of the corridor.',
          'Connaught Place, Delhi — central Delhi corporate lunch, with high team-order volume.',
          'Nehru Place, Delhi — market traders and office workers, with strong repeat ordering.',
        ],
      },
      {
        heading: 'Ordering for a team',
        paragraphs: [
          'Group orders fail for logistical reasons far more often than culinary ones, and the fixes are mostly about addressing and timing.',
        ],
        bullets: [
          'Order before 12:45pm. The 1pm–2:30pm peak is when every other office orders too.',
          'Include the tower name and floor. Most Cyber City and CP buildings hand over at a reception desk, not at your seat.',
          'Consolidate into one order rather than several. One rider, one handover, one arrival time.',
          'Choose gravy-based or rice dishes for larger orders — they hold temperature far better across a slow handover than fried food.',
        ],
      },
    ],
    faq: [
      {
        q: 'Can I order lunch for a whole team on USTART?',
        a: 'Yes. Consolidating into a single order rather than several separate ones means one rider and one handover, which is significantly faster at the lunch peak than staggered individual orders.',
      },
      {
        q: 'How do deliveries work in office towers?',
        a: 'Most towers in Cyber City, Connaught Place and similar districts route riders through a reception or security desk rather than allowing them to the floor. Adding your tower, floor and a reachable phone number to the delivery notes is the single biggest thing you can do to avoid a delayed handover.',
      },
      {
        q: 'What time should I order to avoid the lunch rush?',
        a: 'Before 12:45pm. The 1pm to 2:30pm window is the busiest delivery period anywhere in the NCR because so many orders originate from the same buildings simultaneously.',
      },
    ],
    updatedAt: UPDATED,
  },

  elite: {
    slug: 'elite',
    kicker: '⭐ MEMBERSHIP',
    h1: 'USTART Elite Membership',
    title: 'Elite — Free Delivery Membership',
    description:
      'USTART Elite gives free delivery on qualifying orders, extra savings at select restaurants and priority handling. How it works and when it pays for itself.',
    targetKeyword: 'food delivery membership gurgaon',
    lede: 'Elite is the membership for people who order more than they cook. Free delivery on qualifying orders, extra savings at selected restaurants, and priority handling.',
    sections: [
      {
        heading: 'What Elite includes',
        paragraphs: ['One membership, applied automatically to every eligible order.'],
        bullets: [
          'Free delivery on all qualifying orders above the membership threshold.',
          'Up to 15% extra off the already-discounted price at selected partner restaurants.',
          'Priority handling on your orders.',
          'Early access to offers before they open to everyone.',
        ],
      },
      {
        heading: 'When a membership actually pays for itself',
        paragraphs: [
          'Delivery memberships are worth it or not depending entirely on how often you order, and the honest answer is that not everyone should buy one.',
          'The maths is simple: divide the membership cost by what you typically pay in delivery fees per order. That gives you the number of orders per cycle at which you break even. Below it, you are paying for a benefit you are not using. Above it, every subsequent order is pure saving.',
          'If you order a few times a month, run that calculation before subscribing. If you order weekly, it will almost certainly clear.',
        ],
      },
      {
        heading: 'How Elite sits alongside our pricing',
        paragraphs: [
          'Elite reduces delivery cost on top of pricing that is already transparent. It is not a way to buy back savings that were removed by a fee — there is no platform fee or surge pricing on USTART regardless of whether you are a member.',
          'That is a deliberate difference. A membership that mainly exists to waive charges the platform invented is a worse deal than it looks.',
        ],
      },
    ],
    faq: [
      {
        q: 'What does USTART Elite cost?',
        a: 'Current membership pricing is shown in the app, where it stays accurate if the offer changes. Elite includes free delivery on qualifying orders, up to 15% extra off at selected restaurants, and priority handling.',
      },
      {
        q: 'Is USTART Elite worth it?',
        a: 'It depends on how often you order. Divide the membership cost by what you typically pay in delivery fees per order to get your break-even order count. Weekly orderers generally clear it comfortably; occasional orderers often do not.',
      },
      {
        q: 'Do Elite members still pay surge pricing?',
        a: 'Nobody pays surge pricing on USTART, member or not. We do not apply demand-based markups at any time.',
      },
    ],
    updatedAt: UPDATED,
  },
};

export const getIntentPage = (slug: string): IntentPage | undefined => intentPages[slug];
