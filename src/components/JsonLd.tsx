import React from 'react';

/**
 * Renders a JSON-LD block. Server component by design — structured data must be
 * in the initial HTML payload, since Google will not reliably pick it up if it
 * only appears after client-side hydration.
 *
 * `<` is escaped so a stray "</script>" inside any string field cannot break out
 * of the script element.
 */
export const JsonLd: React.FC<{ data: object | object[] }> = ({ data }) => (
  <script
    type="application/ld+json"
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, '\\u003c'),
    }}
  />
);
