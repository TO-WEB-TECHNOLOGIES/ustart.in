/**
 * Server-only menu fetching from the ONDC catalog API (Ustart BFF).
 *
 * The restaurant page renders page 1 (up to 100 dishes) into its HTML; further
 * pages are loaded as the visitor scrolls, through /api/menu (a same-origin
 * proxy — the API currently rejects browser requests that carry an Origin
 * header, and the proxy also keeps provider/BPP ids out of client requests).
 * Every page fetch is cached for MENU_REVALIDATE_SECONDS in Next's data cache.
 *
 * API contract: ustart.in-audit/docs/items.md —
 *   GET catalog/providers/:provider_id/items?bpp_id=…&page=…&limit=… (max 100)
 */
import { CATALOG_API_BASE, MENU_REVALIDATE_SECONDS } from '@/constants';
import type { Dish, MenuCategory, MenuPage } from '@/lib/menu';

export const MENU_PAGE_SIZE = 100;
/** Hard cap: 12 pages = 1,200 dishes — above the largest menu in the partner set. */
export const MENU_MAX_PAGES = 12;
const TIMEOUT_MS = 8000;
/**
 * An empty menu is usually a seller-side catalog sync gap (seen daily on
 * Magicpin), not a restaurant with no food — so it is never trusted for 24h.
 * It is re-checked at most once per this window, per restaurant.
 */
export const EMPTY_MENU_RECHECK_SECONDS = 900;

/** Category names that are merchandising slots, not real menu sections. Mirrors build_data.py. */
const NON_MENU_CATEGORY =
  /recommended|your orders|collections?|best ?sellers?|top picks|must try|offers?\b|combos? for you|trending/i;

interface ApiItem {
  id: string;
  name: string | null;
  short_desc: string | null;
  images: string[] | null;
  price: string;
  in_stock: boolean;
  is_veg: boolean | null;
  recommended: boolean | null;
  rank: number | null;
  isAvailable: boolean;
  availabilityWindow: { day: string; startTime: string; endTime: string } | null;
  isCustomizable: boolean;
  custom_menu?: Array<{ id: string; name: string | null }>;
}

interface ApiCategory {
  id: string;
  name: string | null;
  rank: number | null;
}

interface ApiPage {
  total: number;
  page: number;
  hasMore: boolean;
  items: ApiItem[];
  categories?: ApiCategory[];
}

class CatalogClientError extends Error {}

interface FetchOpts {
  /** Data-cache lifetime for this response. */
  revalidate: number;
  /** Extra query param that gives the response its own cache entry (ignored by the API). */
  bucket?: number;
}

async function getPageOnce(providerId: string, bppId: string, page: number, opts: FetchOpts): Promise<ApiPage> {
  const url =
    `${CATALOG_API_BASE}catalog/providers/${encodeURIComponent(providerId)}/items` +
    `?bpp_id=${encodeURIComponent(bppId)}&page=${page}&limit=${MENU_PAGE_SIZE}` +
    (opts.bucket !== undefined ? `&fresh=${opts.bucket}` : '');
  const res = await fetch(url, {
    next: { revalidate: opts.revalidate, tags: [`menu:${bppId}:${providerId}`] },
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) {
    const msg = `catalog ${res.status} for ${providerId} page ${page}`;
    throw res.status >= 400 && res.status < 500 ? new CatalogClientError(msg) : new Error(msg);
  }
  return (await res.json()) as ApiPage;
}

/** One retry for transient failures (network errors, 5xx); 4xx is final. */
async function getPageRetry(providerId: string, bppId: string, page: number, opts: FetchOpts): Promise<ApiPage> {
  try {
    return await getPageOnce(providerId, bppId, page, opts);
  } catch (err) {
    if (err instanceof CatalogClientError) throw err;
    await new Promise((resolve) => setTimeout(resolve, 600));
    return getPageOnce(providerId, bppId, page, opts);
  }
}

/**
 * Normal path: the 24h-cached response. If that cached response is an empty
 * menu, ask again through a cache entry that lives only EMPTY_MENU_RECHECK_SECONDS
 * (keyed by a time bucket), so a menu that has come back appears within ~15 min
 * instead of the next day. Because this fetch has the shorter revalidate, Next
 * also re-renders the empty page on that shorter cycle; full menus keep 24h.
 * Backend cost: at most one extra call per empty restaurant per 15 min, and only
 * when someone opens it.
 */
async function getPage(providerId: string, bppId: string, page: number): Promise<ApiPage> {
  const cached = await getPageRetry(providerId, bppId, page, { revalidate: MENU_REVALIDATE_SECONDS });
  if (page !== 1 || (cached.total ?? 0) > 0) return cached;
  const bucket = Math.floor(Date.now() / (EMPTY_MENU_RECHECK_SECONDS * 1000));
  try {
    return await getPageRetry(providerId, bppId, page, { revalidate: EMPTY_MENU_RECHECK_SECONDS, bucket });
  } catch {
    return cached;
  }
}

const realCategories = (raw: ApiCategory[] | undefined): MenuCategory[] =>
  (raw ?? [])
    .filter((c) => c.name && !NON_MENU_CATEGORY.test(c.name))
    .sort((a, b) => (a.rank ?? Number.MAX_SAFE_INTEGER) - (b.rank ?? Number.MAX_SAFE_INTEGER))
    .map((c) => ({ id: c.id, title: c.name!.trim() }));

const toDish = (it: ApiItem, categoryIds: Set<string>): Dish => {
  const price = Number.parseFloat(it.price);
  const name = (it.name ?? '').trim();
  const desc = it.short_desc?.trim() ?? '';
  return {
    id: it.id,
    catId: (it.custom_menu ?? []).find((c) => categoryIds.has(c.id))?.id ?? null,
    name,
    description: desc && desc !== name ? desc : null,
    image: it.images?.find(Boolean)?.replace(/^http:\/\//, 'https://') ?? null,
    price: Number.isFinite(price) ? price : 0,
    inStock: it.in_stock,
    available: it.isAvailable,
    availableFrom: !it.isAvailable && it.availabilityWindow ? it.availabilityWindow.startTime : null,
    veg: it.is_veg,
    recommended: Boolean(it.recommended),
    customisable: it.isCustomizable,
  };
};

/**
 * One page of a restaurant's menu. Throws on API failure: during ISR revalidation
 * that keeps the last good page cached; /api/menu turns it into a 502 the
 * browser can retry.
 */
export async function fetchMenuPage(providerId: string, bppId: string, page = 1): Promise<MenuPage> {
  const data = await getPage(providerId, bppId, page);
  const categories = realCategories(data.categories);
  const ids = new Set(categories.map((c) => c.id));
  const dishes = (data.items ?? [])
    .filter((it) => it.name)
    .sort((a, b) => (a.rank ?? Number.MAX_SAFE_INTEGER) - (b.rank ?? Number.MAX_SAFE_INTEGER))
    .map((it) => toDish(it, ids));
  const total = data.total ?? dishes.length;
  return {
    categories,
    dishes,
    total,
    page,
    hasMore: Boolean(data.hasMore) && page < MENU_MAX_PAGES,
  };
}

/** fetchMenuPage that never throws — for metadata, where a fallback beats an error. */
export async function fetchMenuPageSafe(providerId: string, bppId: string, page = 1): Promise<MenuPage | null> {
  try {
    return await fetchMenuPage(providerId, bppId, page);
  } catch (err) {
    console.error('[catalog] menu fetch failed', providerId, bppId, page, err);
    return null;
  }
}
