'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FoodLoader, type LoaderVariant } from './FoodLoader';

/** Routes that get the food loader while they load. */
const LOADER_ROUTES: Array<[RegExp, LoaderVariant, string]> = [
  [/^\/restaurants\/[^/]+\/[^/]+\/?$/, 'menu', 'Loading the menu'],
  [/^\/restaurants(\/[^/]+)?\/?$/, 'list', 'Loading restaurants'],
  [/^\/brands\/[^/]+\/?$/, 'list', 'Loading outlets'],
  [/^\/food-delivery(\/.*)?$/, 'city', 'Loading your area'],
];

/** Give up after this long, so a stalled navigation never traps the visitor. */
const SAFETY_TIMEOUT_MS = 15000;

/**
 * Shows <FoodLoader /> as an overlay from the moment a visitor taps a link to a
 * city, area, restaurant or brand page until the new page is on screen.
 *
 * Deliberately client-only (no loading.tsx): a loading.tsx boundary makes the
 * streamed server HTML start with the loader and hide the real page behind a
 * script swap, which is worse for crawlers. Here the server HTML is untouched.
 */
export function RouteLoader() {
  const pathname = usePathname();
  const [state, setState] = useState<{ variant: LoaderVariant; label: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A new pathname means the destination page has rendered - hide the loader.
  useEffect(() => {
    setState(null);
    if (timer.current) clearTimeout(timer.current);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest('a');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page / hash link
      const match = LOADER_ROUTES.find(([re]) => re.test(url.pathname));
      if (!match) return;
      setState({ variant: match[1], label: match[2] });
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setState(null), SAFETY_TIMEOUT_MS);
    };
    // Capture phase: Next's <Link> calls preventDefault in its own handler.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  if (!state) return null;
  return (
    <div className="fl-overlay">
      <FoodLoader variant={state.variant} label={state.label} />
    </div>
  );
}
