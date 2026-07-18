/**
 * Private /go/ funnel commerce constants.
 *
 * Post-purchase access is the branded wizard at /go/access (not Tally).
 * TALLY_ACCESS_FORM_URL remains as an emergency backup URL only.
 */
export const TALLY_ACCESS_FORM_URL =
  'https://tally.so/r/2EyW7D' as const

/** Locked footer copy for every /go/ surface (Privacy + Terms are linked in the UI). */
export const FUNNEL_FOOTER_TEXT = 'SYSBILT, Sydney. ABN 56 115 228 020.' as const

export const FUNNEL_PRODUCT_CODES = [
  'speed-fix',
  'missed-call',
  'google-profile',
] as const

export type FunnelProductCode = (typeof FUNNEL_PRODUCT_CODES)[number]

export const FUNNEL_PRODUCT_LABELS: Record<FunnelProductCode, string> = {
  'speed-fix': 'Website Speed Fix',
  'missed-call': 'Missed-Call Text-Back',
  'google-profile': 'Google Profile Fix',
}

export type FunnelProductStatus = 'live' | 'soon'

/** Private catalogue for /go home — not linked from public nav. */
export type FunnelProductCard = {
  code: FunnelProductCode
  title: string
  price: string
  blurb: string
  status: FunnelProductStatus
  href: string
}

export const FUNNEL_PRODUCT_CATALOGUE: FunnelProductCard[] = [
  {
    code: 'speed-fix',
    title: 'Website Speed Fix',
    price: '$1,200',
    blurb: "Three days. Measured before and after with Google's own score.",
    status: 'live',
    href: '/go/speed-fix',
  },
  {
    code: 'missed-call',
    title: 'Missed-Call Text-Back',
    price: '$790',
    blurb: 'Every missed call gets a reply before they dial the next business.',
    status: 'live',
    href: '/go/missed-call',
  },
  {
    code: 'google-profile',
    title: 'Google Profile Fix',
    price: 'Fixed price',
    blurb: 'Your Business Profile cleaned up so the right people find you first.',
    status: 'soon',
    href: '/go/google-profile',
  },
]

export function isFunnelProductCode(value: string | null | undefined): value is FunnelProductCode {
  return (
    typeof value === 'string' &&
    (FUNNEL_PRODUCT_CODES as readonly string[]).includes(value)
  )
}

/** Build the Tally access-form URL with product pre-filled via query string. */
export function tallyAccessFormUrlForProduct(product: string | null | undefined): string {
  if (!isFunnelProductCode(product)) return TALLY_ACCESS_FORM_URL
  const url = new URL(TALLY_ACCESS_FORM_URL)
  url.searchParams.set('product', product)
  return url.toString()
}

/** Branded on-site access wizard path (preferred over Tally). */
export function accessFormPathForProduct(product: string | null | undefined): string {
  if (!isFunnelProductCode(product)) return '/go/access'
  return `/go/access?p=${encodeURIComponent(product)}`
}
