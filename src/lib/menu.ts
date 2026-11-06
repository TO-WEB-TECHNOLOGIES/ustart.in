/**
 * Menu types and grouping shared by the server (first page, rendered into the
 * HTML) and the browser (later pages loaded on scroll). No server-only imports.
 */

export interface Dish {
  id: string;
  /** Real (non-merchandising) category id this dish belongs to, or null. */
  catId: string | null;
  name: string;
  description: string | null;
  image: string | null;
  price: number;
  inStock: boolean;
  /** Inside its serving window when the page was rendered. */
  available: boolean;
  /** "HH:MM" the dish is next served from, when outside its window. */
  availableFrom: string | null;
  veg: boolean | null;
  recommended: boolean;
  customisable: boolean;
}

export interface MenuCategory {
  id: string;
  title: string;
}

export interface MenuGroup {
  id: string;
  title: string;
  dishes: Dish[];
}

/** One page of a restaurant's menu, as the server page and /api/menu return it. */
export interface MenuPage {
  /** The provider's real menu sections, in display order (full list, not paginated). */
  categories: MenuCategory[];
  dishes: Dish[];
  total: number;
  page: number;
  hasMore: boolean;
}

export const MORE_DISHES_ID = '__more';
export const UNAVAILABLE_ID = '__unavailable';

/** Out of stock, or in stock but outside its serving window right now. */
export const isUnavailable = (d: Dish) => !d.inStock || !d.available;

/**
 * Group dishes into the provider's categories, in category order; uncategorised
 * dishes go after them under "More Dishes". With separateUnavailable, dishes
 * that are out of stock or outside their serving window are pulled out into a
 * final "Currently unavailable" section. Dishes keep the restaurant's own order
 * (API rank) — no re-sorting, so loading a later page never reshuffles dishes the
 * visitor has already scrolled past.
 */
export function groupDishes(
  categories: MenuCategory[],
  dishes: Dish[],
  { separateUnavailable = false }: { separateUnavailable?: boolean } = {}
): MenuGroup[] {
  const order = new Map(categories.map((c, i) => [c.id, i]));
  const groups = new Map<string, MenuGroup>();
  const unavailable: Dish[] = [];
  for (const d of dishes) {
    if (separateUnavailable && isUnavailable(d)) {
      unavailable.push(d);
      continue;
    }
    const key = d.catId && order.has(d.catId) ? d.catId : MORE_DISHES_ID;
    if (!groups.has(key)) {
      const title = key === MORE_DISHES_ID ? 'More Dishes' : categories[order.get(key)!].title;
      groups.set(key, { id: key, title, dishes: [] });
    }
    groups.get(key)!.dishes.push(d);
  }
  const ordered = [...groups.values()].sort(
    (a, b) => (order.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.id) ?? Number.MAX_SAFE_INTEGER)
  );
  // Everything that can't be ordered right now goes last, in one section.
  if (unavailable.length) ordered.push({ id: UNAVAILABLE_ID, title: 'Currently unavailable', dishes: unavailable });
  return ordered;
}

/** DOM id for a menu section. Stable across pages because it uses the category id. */
export const sectionDomId = (groupId: string) => `menu-${groupId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
