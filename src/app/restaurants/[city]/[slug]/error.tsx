'use client';

import { useEffect } from 'react';
import { AppDownloadBlock } from '@/components/AppDownloadPrompt';

/**
 * Shown when the catalog API cannot be reached on a restaurant's first render.
 * Errors are never cached by ISR, so the next request tries again; a page that
 * was already cached keeps serving its last good version instead of this.
 */
export default function RestaurantError({ reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Retry once after a short pause - most API blips are transient.
    const t = setTimeout(reset, 4000);
    return () => clearTimeout(t);
  }, [reset]);

  return (
    <main className="rp-error wrap">
      <h1>Menu temporarily unavailable</h1>
      <p>We couldn&apos;t load this restaurant&apos;s menu just now. It usually comes back in a moment.</p>
      <button type="button" className="btn btn-outline" onClick={reset}>
        Try again
      </button>
      <AppDownloadBlock />
    </main>
  );
}
