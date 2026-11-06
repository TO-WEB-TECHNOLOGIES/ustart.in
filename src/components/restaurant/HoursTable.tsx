'use client';

import { useEffect, useState } from 'react';
import { nowInIndia, weekRows, type WeekHours } from '@/lib/hours';

/**
 * Full week of opening hours, Monday first. Today is highlighted in the browser
 * (the HTML is cached for up to a day, so the server can't know "today").
 */
export function HoursTable({ hours }: { hours: WeekHours }) {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(String(nowInIndia().day)), []);
  return (
    <table className="rx-hours">
      <tbody>
        {weekRows(hours).map((row) => (
          <tr key={row.day} aria-current={today === row.day ? 'date' : undefined}>
            <th scope="row">
              {row.name}
              {today === row.day && <span className="rx-today">Today</span>}
            </th>
            <td className={row.text === 'Closed' ? 'is-closed' : undefined}>{row.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
