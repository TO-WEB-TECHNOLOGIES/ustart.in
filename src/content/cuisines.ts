/**
 * Cuisine landing pages behind /order/[cuisine].
 *
 * `partnerBrands` lists only brands that already appear in the partner marquee on
 * the homepage (HomePage.tsx) — i.e. brands USTART publicly names as partners.
 * Do not add a brand here that is not a confirmed partner: naming a restaurant you
 * do not serve is both a trust problem and a trademark one. Leave the array empty
 * rather than guessing; the page renders the block only when it is non-empty.
 */

export interface Cuisine {
  slug: string;
  name: string;
  /** H1-facing phrasing, e.g. "Biryani Delivery". */
  heading: string;
  description: string;
  targetKeyword: string;
  intro: string[];
  /** What to know before ordering this cuisine — genuinely category-specific. */
  orderingNotes: string[];
  popularDishes: string[];
  /** Confirmed partner brands only — see file header. */
  partnerBrands: string[];
  faq: Array<{ q: string; a: string }>;
  updatedAt: string;
}

const UPDATED = '2026-08-18';

export const cuisines: Cuisine[] = [
  {
    slug: 'biryani',
    name: 'Biryani',
    heading: 'Biryani Delivery',
    description:
      'Order biryani in Gurgaon and Delhi at menu prices with no surge pricing and no hidden checkout fees. Live tracking from kitchen to door on USTART.',
    targetKeyword: 'biryani delivery gurgaon',
    intro: [
      'Biryani is the single most ordered dish on Indian delivery platforms, and it is also one of the least forgiving in transit. A biryani that sits too long steams itself in its own container and arrives with the rice broken down.',
      'That makes routing time matter more for biryani than for almost anything else on a menu — the difference between a good and a poor biryani order is usually minutes, not kitchens.',
    ],
    orderingNotes: [
      'Dum biryani travels better than a fried-rice-style preparation, which loses texture faster.',
      'Raita and salan are usually packed separately — check they are included before checkout rather than after.',
      'Portion labelling varies a lot by kitchen: a "full" is comfortably two people at some restaurants and one at others.',
    ],
    popularDishes: ['Hyderabadi dum biryani', 'Lucknowi biryani', 'Chicken tikka biryani', 'Veg biryani', 'Mutton biryani'],
    partnerBrands: ['Biryani By Kilo', 'Biryani Blues', 'Charcoal Eats'],
    faq: [
      {
        q: 'Does USTART add a surge charge on biryani orders at peak times?',
        a: 'No. There is no surge or peak-hour pricing on USTART at any time, on any category.',
      },
      {
        q: 'How do I keep biryani from arriving soggy?',
        a: 'Shorter delivery distances help most. Ordering from a kitchen closer to you generally beats ordering a better biryani from further away, because the rice continues cooking in the container while it travels.',
      },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: 'pizza',
    name: 'Pizza',
    heading: 'Pizza Delivery',
    description:
      'Order pizza in Gurgaon and Delhi with menu prices that match the restaurant, zero surge pricing and a checkout total with nothing hidden in it.',
    targetKeyword: 'pizza delivery gurgaon',
    intro: [
      'Pizza is the category where delivery economics are most visible to customers, because the same pizza is so often priced differently online than it is in the restaurant.',
      'It is also unusually sensitive to handling — a pizza that is stacked or tilted in transit arrives with the toppings displaced regardless of how good the kitchen was.',
    ],
    orderingNotes: [
      'Thin crust loses heat faster than pan or deep dish; the thicker bases hold temperature better over distance.',
      'Ordering two mediums instead of one large is often cheaper per square inch, but check before assuming it.',
      'Most kitchens will hold garlic or adjust bake level if you ask in the order notes.',
    ],
    popularDishes: ['Margherita', 'Pepperoni', 'Farmhouse', 'Paneer tikka pizza', 'BBQ chicken pizza'],
    partnerBrands: ["Nomad Pizza", "Enzo's Pizza", 'Olio Pizza', "Crusto's"],
    faq: [
      {
        q: 'Is pizza cheaper on USTART than on other delivery apps?',
        a: 'USTART keeps restaurant commissions low enough that partners do not need to inflate their online menu to absorb them, so listed prices track the restaurant\'s own prices. Whether that is cheaper on a given order depends on what the other platform is charging that day.',
      },
      {
        q: 'Are there separate packaging charges on pizza orders?',
        a: 'Any packaging charge a restaurant applies is shown in the price breakdown before you pay, not added at the final step.',
      },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: 'north-indian',
    name: 'North Indian',
    heading: 'North Indian Food Delivery',
    description:
      'Order North Indian food in Gurgaon and Delhi — dal makhani, butter chicken, tandoori breads — at menu prices with no hidden fees or surge charges.',
    targetKeyword: 'north indian food delivery gurgaon',
    intro: [
      'North Indian is the default delivery cuisine across Delhi NCR and the broadest category on any Indian menu, covering everything from a simple dal and roti to a full tandoori spread.',
      'It is built for sharing, which is why it dominates family dinner ordering across both Gurgaon and Delhi.',
    ],
    orderingNotes: [
      'Gravies travel well; breads do not. Rotis and naan are best ordered from the closest capable kitchen.',
      'Most gravy dishes reheat cleanly, so ordering slightly more than you need is less wasteful in this category than in most.',
      'Spice levels vary widely between kitchens — the order notes field is worth using on a first order.',
    ],
    popularDishes: ['Butter chicken', 'Dal makhani', 'Paneer butter masala', 'Tandoori roti', 'Chole bhature'],
    partnerBrands: ['Goila Butter Chicken', 'Nirula\'s'],
    faq: [
      {
        q: 'Do North Indian prices on USTART match the restaurant menu?',
        a: 'That is the model — low partner commissions mean restaurants do not need to run a higher online price to cover platform costs.',
      },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: 'chinese',
    name: 'Chinese',
    heading: 'Chinese Food Delivery',
    description:
      'Order Indo-Chinese food in Gurgaon and Delhi — hakka noodles, chilli paneer, momos and more — with transparent pricing and no surge fees on USTART.',
    targetKeyword: 'chinese food delivery gurgaon',
    intro: [
      'Indian Chinese is its own cuisine rather than a regional Chinese one, and it is among the fastest-cooking categories on any delivery menu — most dishes come off the wok in minutes.',
      'That speed means kitchen time is rarely the constraint on a Chinese order; delivery distance almost always is.',
    ],
    orderingNotes: [
      'Gravy dishes and dry dishes are usually packed separately — combining them in transit is what makes noodles go soft.',
      'Anything crisp-fried loses its texture fastest of any category; order it from nearby or expect it soft.',
      'Most kitchens will adjust chilli level on request.',
    ],
    popularDishes: ['Hakka noodles', 'Chilli paneer', 'Manchurian', 'Schezwan fried rice', 'Chilli chicken'],
    partnerBrands: ['Chinese Wok'],
    faq: [
      {
        q: 'Why does fried Chinese food arrive soft?',
        a: 'Steam trapped in the container softens the coating during transit. Shorter delivery distances and vented packaging both help, which is why the nearest capable kitchen usually beats a better one further away.',
      },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: 'burgers',
    name: 'Burgers',
    heading: 'Burger Delivery',
    description:
      'Order burgers in Gurgaon and Delhi at real menu prices — no surge pricing, no platform fee bolted on at checkout. Track your order live on USTART.',
    targetKeyword: 'burger delivery gurgaon',
    intro: [
      'Burgers are the most time-sensitive item in mainstream delivery. The bun absorbs moisture from the patty and sauces from the moment it is assembled, so the clock starts before the order even leaves the kitchen.',
      'Nothing about a burger improves in transit, which makes distance the dominant variable in whether it arrives well.',
    ],
    orderingNotes: [
      'Ask for sauces on the side if you are more than a short ride away — it is the single most effective fix for a soggy bun.',
      'Fries lose heat faster than the burger itself and rarely survive a long delivery well.',
      'Most kitchens will hold or swap a component if you put it in the order notes.',
    ],
    popularDishes: ['Classic chicken burger', 'Veg patty burger', 'Cheeseburger', 'Paneer burger', 'Loaded fries'],
    partnerBrands: ['Burger Singh', 'The Burger Club', 'Louis Burger'],
    faq: [
      {
        q: 'Can I ask for sauces on the side?',
        a: 'Yes — use the order notes at checkout. Most partner kitchens will accommodate it, and for a longer delivery it makes a real difference to how the bun holds up.',
      },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: 'momos',
    name: 'Momos',
    heading: 'Momos Delivery',
    description:
      'Order momos in Gurgaon and Delhi — steamed, fried and tandoori — at menu prices with no hidden charges and no surge pricing on USTART.',
    targetKeyword: 'momos delivery gurgaon',
    intro: [
      'Momos are among the most ordered snack items across Delhi NCR and one of the few categories that genuinely spans street stalls and full restaurants at very different price points.',
      'They are also cheap enough per plate that delivery fees can easily exceed the food cost, which makes fee transparency matter more here than in almost any other category.',
    ],
    orderingNotes: [
      'Steamed momos hold up better in transit than fried; fried momos soften quickly in a closed container.',
      'Chutney is usually packed separately — check the quantity if you are ordering for more than two.',
      'Portions are small, so momo orders are often better combined with something else to be worth the trip.',
    ],
    popularDishes: ['Steamed chicken momos', 'Veg momos', 'Tandoori momos', 'Fried momos', 'Momo platter'],
    partnerBrands: [],
    faq: [
      {
        q: 'Is a small momo order worth the delivery fee?',
        a: 'That is exactly why USTART shows the full total up front rather than revealing fees at the last step — on a low-value order you can see immediately whether the trip is worth it. Elite members get free delivery above the qualifying order value, which changes the maths on small orders.',
      },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: 'rolls',
    name: 'Rolls & Wraps',
    heading: 'Rolls & Wraps Delivery',
    description:
      'Order kathi rolls and wraps in Gurgaon and Delhi with menu-price parity, no surge charges and live order tracking on USTART.',
    targetKeyword: 'rolls delivery gurgaon',
    intro: [
      'Rolls are the default single-person meal across Delhi NCR — quick to cook, easy to eat one-handed, and priced for an everyday order rather than an occasion.',
      'They also travel better than most fast food, because the paratha wrap holds structure and heat far better than a bun does.',
    ],
    orderingNotes: [
      'Egg and double-egg variants cost more but hold the filling together noticeably better in transit.',
      'Ask for chutney separately if you dislike a wet wrap by the time it arrives.',
      'Roll portions vary widely by kitchen — two is a meal at some places, one at others.',
    ],
    popularDishes: ['Chicken kathi roll', 'Paneer roll', 'Egg roll', 'Mutton seekh roll', 'Veg frankie'],
    partnerBrands: [],
    faq: [
      {
        q: 'Do rolls travel well for longer deliveries?',
        a: 'Better than most fast food. The paratha wrap holds heat and structure far better than a burger bun, so rolls are a reasonable choice when the nearest kitchen is not especially close.',
      },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: 'south-indian',
    name: 'South Indian',
    heading: 'South Indian Food Delivery',
    description:
      'Order dosa, idli and South Indian food in Gurgaon and Delhi at menu prices — no surge pricing, no hidden fees, live tracking on USTART.',
    targetKeyword: 'south indian food delivery gurgaon',
    intro: [
      'South Indian is the strongest breakfast category on Indian delivery platforms and one of the few that sees genuine morning demand rather than only lunch and dinner.',
      'It is also technically demanding to deliver: a dosa is defined by being crisp, and crispness is the first thing lost in a closed container.',
    ],
    orderingNotes: [
      'Idli, vada and uttapam survive delivery far better than dosa — they are not relying on a crisp surface.',
      'Sambar and chutney are packed separately; check quantities if ordering for a group.',
      'If you want dosa, order from the closest kitchen available. Distance matters more here than in any other category.',
    ],
    popularDishes: ['Masala dosa', 'Idli sambar', 'Medu vada', 'Uttapam', 'Filter coffee'],
    partnerBrands: [],
    faq: [
      {
        q: 'Will a dosa still be crisp when it arrives?',
        a: 'Honestly, only over short distances. Steam in the container softens it over time, so for a longer delivery idli, vada or uttapam are the more reliable choice.',
      },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: 'desserts',
    name: 'Desserts',
    heading: 'Dessert Delivery',
    description:
      'Order cakes, ice cream and Indian sweets in Gurgaon and Delhi with transparent pricing and no surge fees. Live order tracking on USTART.',
    targetKeyword: 'dessert delivery gurgaon',
    intro: [
      'Desserts are mostly an add-on category rather than a standalone order, and they are the most temperature-sensitive thing on any delivery menu.',
      'Anything frozen is on a much tighter clock than hot food, and unlike hot food it cannot be recovered once it has gone.',
    ],
    orderingNotes: [
      'Ice cream and frozen desserts are the most delivery-sensitive items on any menu — order them from the nearest available kitchen.',
      'Cakes should be ordered with a delivery note if they are for an occasion; handling instructions genuinely get followed.',
      'Indian sweets travel well and are the safest dessert choice over distance.',
    ],
    popularDishes: ['Chocolate truffle cake', 'Gulab jamun', 'Ice cream tubs', 'Brownies', 'Rasmalai'],
    partnerBrands: ['Defence Bakery', 'Baskin Robbins'],
    faq: [
      {
        q: 'Will ice cream arrive frozen?',
        a: 'Over short distances, generally yes. Frozen desserts are on a far tighter clock than hot food, so the closer the kitchen the better the outcome — and unlike a cooled curry, melted ice cream does not recover.',
      },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: 'healthy',
    name: 'Healthy',
    heading: 'Healthy Food Delivery',
    description:
      'Order salads, bowls and high-protein meals in Gurgaon and Delhi at menu prices with no hidden charges or surge pricing on USTART.',
    targetKeyword: 'healthy food delivery gurgaon',
    intro: [
      'Healthy eating is one of the fastest-growing delivery categories in the NCR office districts, driven by weekday lunch ordering rather than by evening or weekend demand.',
      'It is also the category where repeat ordering is highest — people who order salads and bowls tend to do it on a routine, several times a week, rather than as an occasion.',
    ],
    orderingNotes: [
      'Dressings packed separately keep a salad from wilting — most kitchens do this by default, but it is worth confirming.',
      'Grain and protein bowls hold up considerably better in transit than leaf-heavy salads.',
      'Check whether stated calorie or macro counts are per serving or per container; kitchens are inconsistent about this.',
    ],
    popularDishes: ['Grilled chicken salad', 'Quinoa bowl', 'Protein bowl', 'Greek salad', 'Grilled paneer bowl'],
    partnerBrands: ['Edesia'],
    faq: [
      {
        q: 'Are dressings packed separately?',
        a: 'Most partner kitchens do this by default for salads. If it matters to you, add it to the order notes — it is the main thing that keeps leaves from wilting on the way over.',
      },
    ],
    updatedAt: UPDATED,
  },
];

export const getCuisine = (slug: string): Cuisine | undefined =>
  cuisines.find((c) => c.slug === slug);
