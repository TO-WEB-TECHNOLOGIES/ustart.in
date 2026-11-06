import { NextResponse, type NextRequest } from 'next/server';
import { EMPTY_MENU_RECHECK_SECONDS, fetchMenuPage, MENU_MAX_PAGES } from '@/lib/catalog';
import { getRestaurantBySlug } from '@/lib/restaurants';
import { MENU_REVALIDATE_SECONDS } from '@/constants';

/**
 * Same-origin proxy for infinite scroll on restaurant pages:
 *   GET /api/menu?slug={restaurant-slug}&page={1..12}
 *
 * - Only slugs in the restaurant index are accepted, and only pages 1–12, so it
 *   cannot be used to query arbitrary providers or hammer the catalog API.
 * - The upstream fetch is cached in Next's data cache (24h), and the response is
 *   CDN-cacheable for the same window, so repeat scrolls never reach the API.
 * - Page 1 is requested only when the page's HTML had an empty menu: the browser
 *   re-checks once in case the menu has come back since the page was cached.
 *   Empty answers are cached for minutes, not a day.
 */
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') ?? '';
  const page = Number(req.nextUrl.searchParams.get('page'));
  const r = getRestaurantBySlug(slug);

  if (!r || !Number.isInteger(page) || page < 1 || page > MENU_MAX_PAGES) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const data = await fetchMenuPage(r.id, r.bppId, page);
    return NextResponse.json(
      { dishes: data.dishes, categories: data.categories, page: data.page, hasMore: data.hasMore, total: data.total },
      {
        headers: {
          'Cache-Control':
            data.total > 0
              ? `public, s-maxage=${MENU_REVALIDATE_SECONDS}, stale-while-revalidate=3600`
              : `public, s-maxage=${EMPTY_MENU_RECHECK_SECONDS}`,
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: 'Menu temporarily unavailable' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
