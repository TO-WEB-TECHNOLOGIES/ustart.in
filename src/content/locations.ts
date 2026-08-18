/**
 * City + locality data behind /food-delivery/[city] and /food-delivery/[city]/[locality].
 *
 * ── QUALITY GATE — READ BEFORE ADDING A LOCALITY ──────────────────────────────
 * Location pages that only swap a place name are the single most common cause of
 * programmatic-SEO penalties: Google classifies them as doorway pages and filters
 * them out of the index. Every locality here must carry genuinely unique content.
 *
 * The `intro`, `whoOrders` and `faq` fields below are real editorial copy about a
 * real place and are safe to ship. The three ops fields are NOT:
 *
 *   avgDeliveryMinutes  – must come from real delivery telemetry for that polygon
 *   partnerCount        – must come from the partner DB, scoped to that locality
 *   coverage            – must be the sectors/sub-areas you actually deliver to
 *
 * They are typed `| null` on purpose. A page renders those blocks ONLY when the
 * value is non-null, so an unfilled locality degrades to honest editorial content
 * instead of publishing an invented delivery time. Fill them from ops data — do
 * not guess. An invented "25 min average" is a claim you can be held to.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface Locality {
  slug: string;
  name: string;
  /** Search-facing alternates, e.g. "DLF Cyber City", "Cybercity". Used in copy, not meta keywords. */
  aka?: string[];
  /** 1–2 paragraphs of genuinely locality-specific editorial. Required. */
  intro: string[];
  /** Who orders here and when — the demand pattern that makes this locality distinct. */
  whoOrders: string;
  /** Locality-specific FAQ. At least one entry that is not generic. */
  faq: Array<{ q: string; a: string }>;
  /** OPS DATA — see file header. Null until sourced from real telemetry. */
  avgDeliveryMinutes: number | null;
  /** OPS DATA — see file header. Null until sourced from the partner DB. */
  partnerCount: number | null;
  /** OPS DATA — sectors / sub-areas actually covered. Empty until confirmed. */
  coverage: string[];
  updatedAt: string;
}

export interface City {
  slug: string;
  name: string;
  /** Formal name for schema.org addressLocality. */
  officialName: string;
  state: string;
  intro: string[];
  faq: Array<{ q: string; a: string }>;
  localities: Locality[];
  updatedAt: string;
}

const UPDATED = '2026-08-18';

const gurgaonLocalities: Locality[] = [
  {
    slug: 'cyber-city',
    name: 'Cyber City',
    aka: ['DLF Cyber City', 'Cyber Hub'],
    intro: [
      'DLF Cyber City is the densest concentration of office workers anywhere in Gurgaon — a cluster of Grade A towers around Sectors 24 and 25 housing tens of thousands of professionals across technology, consulting and financial services firms.',
      'The adjoining Cyber Hub is one of the busiest restaurant precincts in the NCR, which means the area is unusual: it has enormous delivery demand and enormous restaurant supply sitting within a few hundred metres of each other.',
    ],
    whoOrders:
      'Demand here is sharply peaked rather than spread out. Weekday lunch between 1pm and 2:30pm dominates, driven by desk workers and team orders, with a second evening peak from people working late. Weekend volume drops sharply as the towers empty out — the opposite pattern to a residential locality.',
    faq: [
      {
        q: 'Can food be delivered inside Cyber City office towers?',
        a: 'Most towers in Cyber City route deliveries through a reception or security desk rather than allowing riders to the floor. Adding your tower name, floor and a reachable phone number to the delivery notes is the single biggest thing you can do to avoid a delayed handover.',
      },
      {
        q: 'Is lunchtime delivery slower in Cyber City?',
        a: 'The 1pm–2:30pm window is the busiest delivery period anywhere in Gurgaon because so many orders originate from the same few buildings at once. Ordering slightly ahead of the peak usually gets food to you faster.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'sector-29',
    name: 'Sector 29',
    aka: ['Leisure Valley'],
    intro: [
      "Sector 29 is Gurgaon's best-known eating and nightlife district, built around the Leisure Valley park and packed with large-format restaurants, breweries and bars rather than the small kitchens that dominate most delivery markets.",
      'That restaurant density makes it a supply hub as much as a demand one: a lot of food ordered elsewhere in central Gurgaon is cooked in Sector 29.',
    ],
    whoOrders:
      'Ordering skews late here. Evening and post-10pm volume is well above the Gurgaon average, heavily weighted toward weekends, and group-sized orders are far more common than single meals.',
    faq: [
      {
        q: 'Is late-night food delivery available in Sector 29?',
        a: 'Sector 29 has more genuinely late-operating kitchens than most of Gurgaon, so it is one of the better areas for a post-10pm order. Which specific restaurants are still accepting orders changes through the night — the app shows live availability rather than listing closed kitchens.',
      },
      {
        q: 'Why are Sector 29 orders often larger?',
        a: 'The area is built around group dining, so a large share of orders are shared meals for four or more rather than single portions.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'dlf-phase-1',
    name: 'DLF Phase 1',
    intro: [
      'DLF Phase 1 is one of the oldest planned colonies in Gurgaon — low-rise, largely independent housing on wide tree-lined roads, bordering Golf Course Road on one side and the older city on the other.',
      'It is residential in a way the newer high-rise sectors are not: fewer units per square kilometre, more families who have lived in the same house for decades, and a street pattern of individual gates rather than a single tower lobby.',
    ],
    whoOrders:
      'Family-sized dinner orders dominate, concentrated on weekday evenings and across the weekend. Order frequency is lower than in the office districts but average order value is higher.',
    faq: [
      {
        q: 'Do independent houses in DLF Phase 1 need different delivery instructions?',
        a: 'Yes. Unlike a tower with one lobby, Phase 1 addresses are individual gates on long blocks, so a house number and a nearby cross-street or landmark meaningfully cut down the time a rider spends locating you.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'dlf-phase-2',
    name: 'DLF Phase 2',
    intro: [
      'DLF Phase 2 sits directly alongside the Cyber City corridor, which gives it a mixed character that neither the pure office districts nor the pure residential colonies share — housing, small commercial strips and office overflow in the same few blocks.',
      'Its position next to one of the densest restaurant clusters in the city means short delivery distances to a wide range of kitchens.',
    ],
    whoOrders:
      'Demand splits between residents ordering dinner and a weekday lunch pattern spilling over from the neighbouring offices, giving the area two distinct daily peaks rather than one.',
    faq: [
      {
        q: 'Does DLF Phase 2 get the same restaurant selection as Cyber City?',
        a: 'Largely yes. Phase 2 is close enough to the Cyber City and Cyber Hub kitchens that most of that selection is within a normal delivery radius.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'dlf-phase-3',
    name: 'DLF Phase 3',
    intro: [
      'DLF Phase 3 has changed character more than any of the older DLF colonies. Its proximity to Cyber City turned a residential grid into a dense mix of shared accommodation, small offices and startup space, with a large population of young working professionals living close to where they work.',
      'It has one of the higher concentrations of first-jobbers and shared flats in Gurgaon, which shapes what and when people order.',
    ],
    whoOrders:
      'Single-portion and two-person orders dominate, spread far more evenly across the day and week than in family localities, with noticeably strong late-evening and weekend-brunch demand.',
    faq: [
      {
        q: 'Is DLF Phase 3 well covered for late-evening orders?',
        a: 'It is one of the more consistently active areas late in the evening, largely because of the resident population of young professionals who eat later than the city average.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'golf-course-road',
    name: 'Golf Course Road',
    intro: [
      'Golf Course Road is the premium residential and commercial spine of Gurgaon, running past high-rise condominium developments, Grade A offices and retail between Sector 42 and Sector 56.',
      'The corridor is vertical in a way most of Gurgaon is not — a single address can hold hundreds of households, which concentrates delivery volume into a small number of building entrances.',
    ],
    whoOrders:
      'A mix of high-rise residential dinner demand and weekday office lunch from the commercial stretches. Average order values run above the city average, and premium and health-oriented cuisines over-index here.',
    faq: [
      {
        q: 'How do deliveries work in Golf Course Road high-rises?',
        a: 'Most condominium developments along the corridor route riders through a gate and then a tower lobby. Including your tower and unit number rather than just the society name avoids a second call at the gate.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'sohna-road',
    name: 'Sohna Road',
    intro: [
      'Sohna Road runs south from Subhash Chowk through Sectors 47 to 49, lined with a mix of mid-rise residential societies, office parks and street-level retail.',
      'It grew as a value alternative to the Golf Course Road corridor, and its population skews toward working couples and young families in apartment complexes rather than independent housing.',
    ],
    whoOrders:
      'Weekday dinner is the dominant occasion, with strong weekend demand across both lunch and dinner. Order sizes cluster around two to four portions.',
    faq: [
      {
        q: 'Is Sohna Road traffic a factor in delivery times?',
        a: 'The corridor congests heavily at the evening peak, which is exactly when dinner orders concentrate. Routing around the arterial rather than along it is usually what separates a fast delivery from a slow one here.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'mg-road',
    name: 'MG Road',
    aka: ['Mehrauli-Gurgaon Road'],
    intro: [
      'MG Road is the older retail and commercial artery connecting Gurgaon to Delhi, anchored by a run of shopping malls and served directly by the Yellow Line metro.',
      'It functions as a transit and retail corridor more than a residential one, which gives it a demand profile driven by footfall rather than households.',
    ],
    whoOrders:
      'Demand is spread through the day rather than peaked, reflecting mall and office footfall, with the strongest volume across weekend afternoons and evenings.',
    faq: [
      {
        q: 'Can food be delivered to the MG Road malls?',
        a: 'Mall addresses generally require a specific handover point — a gate number or entrance — because the buildings are large and have multiple access points. Naming the entrance rather than just the mall speeds up the handover considerably.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'udyog-vihar',
    name: 'Udyog Vihar',
    intro: [
      'Udyog Vihar is Gurgaon\'s original industrial and business estate, spread across five phases near the Delhi border, mixing manufacturing units, BPO floors and corporate offices.',
      'Unlike the newer glass-tower districts it runs on shift patterns, and a significant share of the working population is on schedules that do not match a standard nine-to-six day.',
    ],
    whoOrders:
      'Shift work flattens the usual peaks. Alongside a conventional lunch rush there is meaningful night-shift demand, and bulk orders for teams are more common here than almost anywhere else in Gurgaon.',
    faq: [
      {
        q: 'Is food delivery available for night shifts in Udyog Vihar?',
        a: 'Late-night availability depends on which kitchens are still open rather than on the delivery area itself. The app shows live restaurant availability, so what you see at 2am is what is genuinely accepting orders.',
      },
      {
        q: 'How should I address a delivery to a Udyog Vihar plot?',
        a: 'Phase and plot number both matter — the five phases are separate grids and a plot number alone is ambiguous across them.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'sushant-lok',
    name: 'Sushant Lok',
    intro: [
      'Sushant Lok is a large established residential township between MG Road and Golf Course Road, laid out in blocks of independent houses and low-rise apartments with its own internal market streets.',
      'It is one of the more self-contained residential areas in central Gurgaon, with local markets that residents use daily rather than driving out to malls.',
    ],
    whoOrders:
      'Household dinner ordering dominates, with a steady weekday pattern and a pronounced weekend lift. Repeat ordering from the same nearby kitchens is more common here than in transient areas.',
    faq: [
      {
        q: 'Do I need to specify a block in Sushant Lok?',
        a: 'Yes — the township is divided into phases and blocks, and house numbers repeat across them, so a block reference is essential for a first-time delivery to your address.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'south-city',
    name: 'South City',
    intro: [
      'South City I and II are established residential colonies off Sohna Road and Golf Course Extension, built around independent houses, builder floors and a smaller number of apartment complexes.',
      'They are settled, family-oriented neighbourhoods with lower turnover than the newer sectors, which produces steady and predictable ordering rather than volatile demand.',
    ],
    whoOrders:
      'Family dinner is the dominant occasion, concentrated on weekday evenings and weekends, with larger average basket sizes than single-professional areas.',
    faq: [
      {
        q: 'Are South City I and South City II treated as the same delivery area?',
        a: 'They are adjacent but separate colonies with their own block numbering. Specifying which one you are in prevents a rider being routed to the wrong gate.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'palam-vihar',
    name: 'Palam Vihar',
    intro: [
      'Palam Vihar is a large planned residential township in western Gurgaon, closer to the Delhi border and Dwarka than to the Cyber City corridor, organised into numbered blocks with its own markets and schools.',
      'Its distance from the central restaurant clusters makes it a genuinely different delivery problem from central Gurgaon — the constraint is route distance, not restaurant supply.',
    ],
    whoOrders:
      'Residential and family-led, weighted to evenings and weekends, with demand for everyday cuisines rather than the premium end of the market.',
    faq: [
      {
        q: 'Does Palam Vihar get a smaller restaurant selection than central Gurgaon?',
        a: 'Selection is driven by which kitchens are close enough to deliver hot food in a reasonable time. Because Palam Vihar sits away from the Cyber City and Sector 29 clusters, its available list leans toward nearby kitchens rather than the central ones.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
];

const delhiLocalities: Locality[] = [
  {
    slug: 'connaught-place',
    name: 'Connaught Place',
    aka: ['CP', 'Rajiv Chowk'],
    intro: [
      "Connaught Place is central Delhi's primary business and retail district — a Georgian colonnade of concentric circles housing corporate offices, restaurants and shops, and one of the busiest metro interchanges in the country.",
      'It is overwhelmingly a workplace and destination district rather than a residential one, so its delivery demand is generated by people who are there for the day, not people who live there.',
    ],
    whoOrders:
      'Weekday office lunch is the dominant occasion, with team and bulk orders well above average. Evening demand is driven by people staying on after work rather than by households.',
    faq: [
      {
        q: 'How are deliveries handled in the Connaught Place blocks?',
        a: 'CP is laid out as lettered blocks across an inner and outer circle, and block letters repeat between them. Giving the block letter along with whether you are on the inner, middle or outer circle is what makes an address unambiguous here.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'saket',
    name: 'Saket',
    intro: [
      'Saket combines a large established residential area in south Delhi with one of the city\'s densest mall clusters, giving it both a resident population and heavy destination footfall.',
      'The mix means it behaves like two markets at once — settled households in the surrounding blocks, and a transient retail and cinema crowd around the malls.',
    ],
    whoOrders:
      'Steady household dinner demand through the week, overlaid with sharp weekend spikes from the retail and cinema footfall around the mall cluster.',
    faq: [
      {
        q: 'Is Saket delivery different around the malls?',
        a: 'Mall-area addresses need a named entrance or gate, while the surrounding residential blocks work on standard house and block numbers. They are effectively two different addressing systems in one locality.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'hauz-khas',
    name: 'Hauz Khas',
    intro: [
      'Hauz Khas spans a quiet, well-established residential enclave and the far busier Hauz Khas Village, a compact restaurant and bar district built into narrow lanes beside the historic deer park and monument complex.',
      'The Village lanes are genuinely narrow and largely pedestrian at the busiest hours, which makes it one of the more physically constrained delivery environments in south Delhi.',
    ],
    whoOrders:
      'Ordering runs late and skews to weekends, driven by the Village crowd, while the surrounding residential blocks generate a steadier, earlier weekday dinner pattern.',
    faq: [
      {
        q: 'Why can Hauz Khas Village deliveries take longer?',
        a: 'The Village lanes are narrow, congested and partly pedestrian in the evenings, so the last hundred metres are often on foot. Naming your building and floor helps more here than almost anywhere else in the city.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'vasant-kunj',
    name: 'Vasant Kunj',
    intro: [
      'Vasant Kunj is a large planned residential area in south-west Delhi, built as numbered blocks and pockets of apartment housing, with a set of malls along Nelson Mandela Marg on its edge.',
      'It is spread out and low-density by Delhi standards, with substantial distances between its own sectors and pockets.',
    ],
    whoOrders:
      'Predominantly household demand across weekday evenings and weekends, with family-sized orders and a strong weekend lunch occasion.',
    faq: [
      {
        q: 'Do Vasant Kunj pocket numbers matter for delivery?',
        a: 'They are essential. The area is divided into sectors and then pockets, and block numbers repeat between them, so an address without a pocket reference is genuinely ambiguous.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'dwarka',
    name: 'Dwarka',
    intro: [
      'Dwarka is one of the largest planned sub-cities in Asia, laid out across more than twenty sectors in south-west Delhi and built primarily around cooperative group housing societies.',
      'Its scale is the defining feature: the distance between its outer sectors is larger than the entire footprint of most Delhi localities, so delivery there is a sector-level problem rather than a locality-level one.',
    ],
    whoOrders:
      'Overwhelmingly residential and family-led, with weekday dinner and weekend demand dominating, and ordering patterns that vary noticeably between the older inner sectors and the newer outer ones.',
    faq: [
      {
        q: 'Does the sector number matter when ordering in Dwarka?',
        a: 'More than in any other Delhi locality. Dwarka spans over twenty sectors and society names recur across them, so the sector number is the part of the address that actually determines routing.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'nehru-place',
    name: 'Nehru Place',
    intro: [
      'Nehru Place is south Delhi\'s main commercial and technology district, best known as one of the largest computer and electronics markets in the country, surrounded by office towers.',
      'It is a weekday commercial district almost exclusively — the market and offices define its rhythm, and it empties out on Sundays.',
    ],
    whoOrders:
      'Concentrated weekday lunch demand from market traders and office workers, with a high share of repeat orders and bulk orders for shops and teams. Sunday volume falls away sharply as the market closes.',
    faq: [
      {
        q: 'How should shop deliveries in the Nehru Place market be addressed?',
        a: 'The market is a dense grid of numbered shops across multiple blocks and levels. Block, shop number and floor together are what make a delivery findable — a shop number alone repeats across blocks.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'greater-kailash',
    name: 'Greater Kailash',
    aka: ['GK', 'GK-1', 'GK-2'],
    intro: [
      'Greater Kailash I and II are among south Delhi\'s most established residential colonies, organised into lettered blocks around the M Block and N Block markets.',
      'The colony markets are significant restaurant clusters in their own right, so a lot of what GK residents order is cooked within the colony.',
    ],
    whoOrders:
      'Settled household demand with high repeat ordering, weighted to weekday dinners and weekends, and average order values above the city median.',
    faq: [
      {
        q: 'Is GK-1 different from GK-2 for delivery?',
        a: 'They are separate colonies with independent block lettering and their own markets. Specifying GK-1 or GK-2 alongside the block letter is what prevents a misroute — the block letters overlap between them.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
  {
    slug: 'lajpat-nagar',
    name: 'Lajpat Nagar',
    intro: [
      'Lajpat Nagar pairs a dense residential colony with the Central Market, one of the busiest shopping streets in south Delhi and a major draw from well outside the immediate area.',
      'The market\'s footfall and the narrow surrounding lanes make vehicle access genuinely difficult during peak shopping hours.',
    ],
    whoOrders:
      'A mix of resident household ordering and demand from shopkeepers and shoppers in the market, producing steadier all-day volume than a purely residential locality.',
    faq: [
      {
        q: 'Are deliveries slower near Lajpat Nagar Central Market?',
        a: 'During peak shopping hours the lanes around the market are congested and often effectively pedestrian, so the final approach is slower. Addresses set back from the market are unaffected.',
      },
    ],
    avgDeliveryMinutes: null,
    partnerCount: null,
    coverage: [],
    updatedAt: UPDATED,
  },
];

export const cities: City[] = [
  {
    slug: 'gurgaon',
    name: 'Gurgaon',
    officialName: 'Gurugram',
    state: 'Haryana',
    intro: [
      'Gurugram is where USTART started and where our coverage is deepest. The city concentrates an unusual mix of high-rise residential corridors, dense office districts and long-established colonies inside a relatively small footprint, and each of those behaves differently at dinner time.',
      'We built USTART here because Gurugram is also where the cost of ordering food had drifted furthest from the cost of the food itself. Menu prices that match what the restaurant charges offline, no surge pricing, and a bill with nothing hidden in it are the whole point of the platform.',
    ],
    faq: [
      {
        q: 'Which areas of Gurgaon does USTART deliver to?',
        a: 'We serve Gurugram city-wide, including the Cyber City and Udyog Vihar business districts, the Golf Course Road and Sohna Road corridors, the DLF phases, and established colonies such as Sushant Lok, South City and Palam Vihar. Enter your address in the app to see live coverage and the restaurants currently open near you.',
      },
      {
        q: 'Does USTART charge surge pricing in Gurgaon?',
        a: 'No. We do not apply surge or rain pricing. The price you see at checkout is the price you pay.',
      },
      {
        q: 'Are menu prices on USTART the same as in the restaurant?',
        a: 'That is the model. We keep restaurant commissions low enough that partners do not need to inflate their online menu to absorb them, so online prices track offline prices.',
      },
    ],
    localities: gurgaonLocalities,
    updatedAt: UPDATED,
  },
  {
    slug: 'delhi',
    name: 'Delhi',
    officialName: 'New Delhi',
    state: 'Delhi',
    intro: [
      'Delhi is a genuinely different delivery market from Gurugram — older, denser, and organised around colony markets and block grids rather than tower lobbies and sector numbers. An address that would be unambiguous in Gurugram is often not in Delhi.',
      'What does not change is the pricing model. Menu prices matching the restaurant, no surge charges, and a checkout total with nothing bolted on to it work the same way here as they do in Gurugram.',
    ],
    faq: [
      {
        q: 'Which areas of Delhi does USTART deliver to?',
        a: 'Coverage is strongest across south and central Delhi, including Connaught Place, Saket, Hauz Khas, Greater Kailash, Lajpat Nagar, Nehru Place, Vasant Kunj and Dwarka. Enter your address in the app for live coverage — it reflects the areas and restaurants actually available to you right now.',
      },
      {
        q: 'Why does my Delhi address need a block or pocket number?',
        a: 'Most Delhi colonies repeat house and society numbers across blocks, pockets or phases. The block-level detail is what determines routing, so including it is the difference between a direct delivery and a rider calling from the wrong gate.',
      },
    ],
    localities: delhiLocalities,
    updatedAt: UPDATED,
  },
];

export const getCity = (slug: string): City | undefined => cities.find((c) => c.slug === slug);

export const getLocality = (citySlug: string, localitySlug: string): Locality | undefined =>
  getCity(citySlug)?.localities.find((l) => l.slug === localitySlug);

/** Flat [city, locality] pairs — used by generateStaticParams and the sitemap. */
export const allLocalityPaths = cities.flatMap((city) =>
  city.localities.map((locality) => ({ city: city.slug, locality: locality.slug }))
);
