/**
 * Private /go/ funnel commerce constants.
 *
 * TALLY_ACCESS_FORM_URL is the single source of truth for the post-purchase
 * access form. Update this one string when the Tally form URL changes (Stage 3).
 * Do not hardcode the form URL on individual pages.
 */
export const TALLY_ACCESS_FORM_URL =
  'https://tally.so/r/PLACEHOLDER' as const;

/** Locked footer copy for every /go/ surface (Privacy + Terms are linked in the UI). */
export const FUNNEL_FOOTER_TEXT = 'SYSBILT, Sydney. ABN 56 115 228 020.' as const;

export const FUNNEL_PRODUCT_CODES = [
  'speed-fix',
  'missed-call',
  'google-profile',
] as const;

export type FunnelProductCode = (typeof FUNNEL_PRODUCT_CODES)[number];

export function isFunnelProductCode(value: string | null | undefined): value is FunnelProductCode {
  return (
    typeof value === 'string' &&
    (FUNNEL_PRODUCT_CODES as readonly string[]).includes(value)
  );
}

/** Build the Tally access-form URL with product pre-filled via query string. */
export function tallyAccessFormUrlForProduct(product: string | null | undefined): string {
  if (!isFunnelProductCode(product)) return TALLY_ACCESS_FORM_URL;
  const url = new URL(TALLY_ACCESS_FORM_URL);
  url.searchParams.set('product', product);
  return url.toString();
}
