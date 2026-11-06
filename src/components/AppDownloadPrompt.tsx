'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { APP_DOWNLOAD_URL } from '@/constants';

export const ORDER_PROMPT_MESSAGE = 'To place an order, download the USTART app now and get amazing offers.';

/**
 * Download card: a direct button (what works on a phone) and a QR code for
 * store.ustart.in (what works on a desktop - scan with your phone). CSS puts the
 * button first on mobile and the QR first on desktop. Server-rendered, so it is
 * in the page HTML.
 */
export const AppDownloadBlock: React.FC<{ compact?: boolean; headingLevel?: 'h2' | 'p' }> = ({
  compact,
  headingLevel = 'p',
}) => {
  const Heading = headingLevel;
  return (
    <div className={`rx-download${compact ? ' rx-download--compact' : ''}`}>
      <div className="rx-download-copy">
        <Heading className="rx-download-title">{ORDER_PROMPT_MESSAGE}</Heading>
        <span className="rx-download-hint">
          <span className="rx-only-desktop">Scan with your phone camera to get the app.</span>
          <span className="rx-only-mobile">Available on Android and iPhone.</span>
        </span>
        <a href={APP_DOWNLOAD_URL} className="rx-download-btn" target="_blank" rel="noopener noreferrer">
          Download USTART
        </a>
      </div>
      <a
        href={APP_DOWNLOAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rx-qr"
        aria-label="QR code: scan or open store.ustart.in to download the USTART app"
      >
        <QRCodeSVG value={APP_DOWNLOAD_URL} size={compact ? 108 : 132} fgColor="#0F2441" bgColor="#FFFFFF" level="M" />
        <span>store.ustart.in</span>
      </a>
    </div>
  );
};

/** Distance (px) or release velocity (px/ms) past which a downward drag dismisses the sheet. */
const DISMISS_DISTANCE = 120;
const DISMISS_VELOCITY = 0.5;

/**
 * The website does not take orders. Any element with `data-order` (each dish's
 * Add button, the sticky bar, CTAs) opens this sheet. Event delegation keeps the
 * dish buttons plain server-rendered markup.
 *
 * Motion follows the Apple guidance in the apple-ui skill:
 * - mobile: a bottom sheet that rises from the bottom edge and leaves the same
 *   way; it can be dragged 1:1 and flicked away (release velocity decides),
 *   otherwise it springs back;
 * - desktop: a dialog that grows out of the button that was tapped;
 * - prefers-reduced-motion: a plain cross-fade (handled in CSS).
 */
export const AppDownloadPrompt: React.FC<{ restaurantName: string }> = ({ restaurantName }) => {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const drag = useRef<{ startY: number; lastY: number; lastT: number; v: number } | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus({ preventScroll: true });
  }, []);

  // Open from any [data-order] element.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement).closest<HTMLElement>('[data-order]');
      if (!trigger) return;
      e.preventDefault();
      const rect = trigger.getBoundingClientRect();
      lastFocus.current = trigger;
      setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      setOpen(true);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Desktop: grow from the trigger - point transform-origin at it.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel || !origin) return;
    const r = panel.getBoundingClientRect();
    panel.style.setProperty('--origin-x', `${origin.x - r.left}px`);
    panel.style.setProperty('--origin-y', `${origin.y - r.top}px`);
  }, [origin, open]);

  // Esc to close, focus trap, lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && panel) {
        const items = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  // Mobile drag-to-dismiss. Tracks 1:1 with the finger, upward drags resist.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' || !window.matchMedia('(max-width: 720px)').matches) return;
    if ((e.target as HTMLElement).closest('a, button')) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { startY: e.clientY, lastY: e.clientY, lastT: e.timeStamp, v: 0 };
    panelRef.current?.classList.add('is-dragging');
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const panel = panelRef.current;
    if (!d || !panel) return;
    const dy = e.clientY - d.startY;
    const dt = Math.max(e.timeStamp - d.lastT, 1);
    d.v = (e.clientY - d.lastY) / dt;
    d.lastY = e.clientY;
    d.lastT = e.timeStamp;
    // Rubber-band upward: progressively less movement past the resting position.
    const y = dy >= 0 ? dy : -((-dy * 40) / (40 + -dy));
    panel.style.transform = `translateY(${y}px)`;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    const panel = panelRef.current;
    drag.current = null;
    if (!d || !panel) return;
    panel.classList.remove('is-dragging');
    panel.style.transform = '';
    const dy = e.clientY - d.startY;
    if (dy > DISMISS_DISTANCE || d.v > DISMISS_VELOCITY) close();
  };

  return (
    <>
      <div className={`rx-orderbar${open ? ' is-hidden' : ''}`}>
        <span className="rx-orderbar-text">
          Order from <strong>{restaurantName}</strong>
        </span>
        <button type="button" className="rx-orderbar-btn" data-order>
          Order now
        </button>
      </div>

      <div className={`rx-sheet-root${open ? ' is-open' : ''}`} inert={!open}>
        <div className="rx-scrim" onClick={close} />
        <div
          ref={panelRef}
          className="rx-sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="rx-sheet-title"
          tabIndex={-1}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="rx-grabber" aria-hidden="true" />
          <button type="button" className="rx-sheet-close" onClick={close} aria-label="Close">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <h2 id="rx-sheet-title" className="rx-sheet-title">
            Order on the USTART app
          </h2>
          <AppDownloadBlock />
        </div>
      </div>
    </>
  );
};
