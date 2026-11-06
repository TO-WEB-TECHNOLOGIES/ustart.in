/**
 * Replace em dashes in third-party text (partner descriptions, menu items) with
 * commas. The site's style uses no em dashes. Mirrors clean() in
 * scripts/restaurants/build_data.py.
 */
export const noEmDash = (s: string): string =>
  s
    .replace(/\s*\u2014\s*([^\u2014]+?)\s*\u2014\s*/g, ', $1, ')
    .replace(/\s*\u2014\s*/g, ', ')
    .replace(/,\s*([,.!?;:])/g, '$1')
    .replace(/^,\s*|,\s*$/g, '');
