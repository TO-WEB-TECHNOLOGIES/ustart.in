/**
 * Opening-hours helpers shared by the server (hours table, structured data) and
 * the browser (live "Open now" status). No server-only imports.
 *
 * Shape (built by scripts/restaurants/build_data.py from ONDC order windows):
 *   { "1": [["11:00", "02:45"]], "2": [["12:00", "15:30"], ["19:00", "23:00"]], … }
 * Day keys follow ONDC: "1" = Monday … "7" = Sunday. A window whose close is
 * earlier than its open runs past midnight into the next day. ["00:00", "24:00"]
 * means open all day.
 */

export type Window = [string, string];
export type WeekHours = Record<string, Window[]>;

export const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const DAY_LONG = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

/** "13:00" → "1:00 pm", "00:00" → "12:00 am", "24:00" → "12:00 am". */
export function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const hh = h % 24;
  const hour = hh % 12 === 0 ? 12 : hh % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${hh >= 12 ? 'pm' : 'am'}`;
}

export const isAllDay = (w: Window) => w[0] === '00:00' && w[1] === '24:00';
export const isOvernight = (w: Window) => !isAllDay(w) && toMin(w[1]) < toMin(w[0]);

/** "11:00 am – 2:45 am", "Open 24 hours". */
export function windowText(w: Window) {
  if (isAllDay(w)) return 'Open 24 hours';
  return `${formatTime(w[0])} – ${formatTime(w[1])}`;
}

export const dayText = (ws: Window[] | undefined) => (ws && ws.length ? ws.map(windowText).join(', ') : 'Closed');

/** Seven rows, Monday first, for an hours table. */
export function weekRows(hours: WeekHours) {
  return DAY_LONG.map((name, i) => ({ day: String(i + 1), name, short: DAY_SHORT[i], text: dayText(hours[String(i + 1)]) }));
}

/** Consecutive days with identical hours collapsed: [{ days: "Mon–Sun", text: "11:00 am – 2:45 am" }]. */
export function summariseHours(hours: WeekHours) {
  const rows = weekRows(hours);
  const out: Array<{ days: string; text: string }> = [];
  let start = 0;
  for (let i = 0; i < rows.length; i++) {
    if (i === rows.length - 1 || rows[i + 1].text !== rows[i].text) {
      const days = start === i ? rows[i].short : `${rows[start].short}–${rows[i].short}`;
      out.push({ days, text: rows[i].text });
      start = i + 1;
    }
  }
  // "Closed" rows only add noise in a summary; the full table still shows them.
  return out.filter((r) => r.text !== 'Closed');
}

/** Current ONDC day (1 = Monday) and minute of day in India. */
export function nowInIndia(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return { day: DAY_SHORT.indexOf(get('weekday')) + 1, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

export type OpenState = { open: boolean; label: string };

/** "Open now · until 2:45 am" / "Opens today at 11:00 am" / "Opens Monday at 11:00 am". */
export function openState(hours: WeekHours, date = new Date()): OpenState | null {
  if (!Object.keys(hours).length) return null;
  const { day, minutes } = nowInIndia(date);
  const prev = day === 1 ? 7 : day - 1;

  // Still inside last night's overnight window?
  for (const w of hours[String(prev)] ?? []) {
    if (isOvernight(w) && minutes < toMin(w[1])) return { open: true, label: `Open now · until ${formatTime(w[1])}` };
  }
  for (const w of hours[String(day)] ?? []) {
    if (isAllDay(w)) return { open: true, label: 'Open 24 hours' };
    const o = toMin(w[0]);
    const c = toMin(w[1]);
    if (minutes >= o && (isOvernight(w) || minutes < c)) return { open: true, label: `Open now · until ${formatTime(w[1])}` };
  }
  const laterToday = (hours[String(day)] ?? []).find((w) => toMin(w[0]) > minutes);
  if (laterToday) return { open: false, label: `Opens today at ${formatTime(laterToday[0])}` };
  for (let i = 1; i <= 7; i++) {
    const d = ((day - 1 + i) % 7) + 1;
    const first = hours[String(d)]?.[0];
    if (first) {
      return {
        open: false,
        label: i === 1 ? `Opens tomorrow at ${formatTime(first[0])}` : `Opens ${DAY_LONG[d - 1]} at ${formatTime(first[0])}`,
      };
    }
  }
  return null;
}
