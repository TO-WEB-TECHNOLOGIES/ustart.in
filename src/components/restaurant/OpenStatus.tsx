'use client';

import { useEffect, useState } from 'react';
import { openState, type OpenState, type WeekHours } from '@/lib/hours';

/**
 * Live open/closed status. Computed in the browser, not on the server: the page
 * HTML is cached for up to 24h, so a server-rendered "open now" would be wrong
 * most of the day.
 */
export function OpenStatus({ hours, className = '' }: { hours: WeekHours; className?: string }) {
  const [status, setStatus] = useState<OpenState | null>(null);
  useEffect(() => {
    const update = () => setStatus(openState(hours));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, [hours]);

  if (!status) return null;
  return (
    <span className={`rx-open ${status.open ? 'rx-open--yes' : 'rx-open--no'} ${className}`}>
      <span className="rx-dot" aria-hidden="true" />
      {status.label}
    </span>
  );
}
