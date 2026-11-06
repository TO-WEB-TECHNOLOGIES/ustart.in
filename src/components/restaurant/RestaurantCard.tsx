import React from 'react';
import NextLink from 'next/link';

/** Compact, serialisable card data — built on the server by toCard() in src/lib/restaurants.ts. */
export interface CardData {
  slug: string;
  path: string;
  name: string;
  area: string;
  cuisines: string;
  pureVeg: boolean;
  late: boolean;
  img: string | null;
}

/**
 * One restaurant in a list. Deliberately not a bordered box: a rounded photo,
 * a clear name and one quiet line of context; the whole row lifts on hover and
 * presses in on tap. Works in both server and client components (no hooks).
 */
export function RestaurantCard({ c, priority = false }: { c: CardData; priority?: boolean }) {
  return (
    <NextLink href={c.path} className="rc" prefetch={false}>
      <span className="rc-img">
        {c.img ? (
          <img src={c.img} alt="" width={76} height={76} loading={priority ? 'eager' : 'lazy'} decoding="async" />
        ) : (
          <span className="rc-initial" aria-hidden="true">
            {c.name.charAt(0)}
          </span>
        )}
      </span>
      <span className="rc-body">
        <span className="rc-name">{c.name}</span>
        <span className="rc-meta">
          {c.area}
          {c.cuisines && <> · {c.cuisines}</>}
        </span>
        {(c.pureVeg || c.late) && (
          <span className="rc-tags">
            {c.pureVeg && <span className="rc-tag rc-tag--veg">Pure Veg</span>}
            {c.late && <span className="rc-tag">Late night</span>}
          </span>
        )}
      </span>
    </NextLink>
  );
}

/* ── Compact wire format for long lists ───────────────────────────────────────
 * A city page passes thousands of cards from the server to <RestaurantBrowser>.
 * Sent as objects, every card repeats its field names, its full path and a long
 * image URL — over half of a large page's weight. This format sends short rows
 * and one shared image table instead (~54% smaller for Delhi).
 */
/** [city/slug, name, area, cuisines, flags (1 = pure veg, 2 = late night), image index or -1] */
export type CardRow = [string, string, string, string, number, number];
export interface CompactGroup {
  key: string;
  title: string;
  rows: CardRow[];
}
export interface CompactList {
  imgs: string[];
  groups: CompactGroup[];
}

/** Server side: CardData groups → compact payload. */
export function encodeGroups(groups: Array<{ key: string; title: string; items: CardData[] }>): CompactList {
  const imgs: string[] = [];
  const index = new Map<string, number>();
  const imgIndex = (u: string | null) => {
    if (!u) return -1;
    if (!index.has(u)) {
      index.set(u, imgs.length);
      imgs.push(u);
    }
    return index.get(u)!;
  };
  return {
    imgs,
    groups: groups.map((g) => ({
      key: g.key,
      title: g.title,
      rows: g.items.map((c) => [
        c.path.replace(/^\/restaurants\//, ''),
        c.name,
        c.area,
        c.cuisines,
        (c.pureVeg ? 1 : 0) | (c.late ? 2 : 0),
        imgIndex(c.img),
      ]),
    })),
  };
}

/** Client side: one compact row → CardData. */
export function decodeRow(row: CardRow, imgs: string[]): CardData {
  const [cityAndSlug, name, area, cuisines, flags, img] = row;
  return {
    slug: cityAndSlug.split('/')[1] ?? cityAndSlug,
    path: `/restaurants/${cityAndSlug}`,
    name,
    area,
    cuisines,
    pureVeg: (flags & 1) === 1,
    late: (flags & 2) === 2,
    img: img >= 0 ? imgs[img] : null,
  };
}
