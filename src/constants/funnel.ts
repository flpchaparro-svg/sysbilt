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
  'search-fix',
  'landing-page',
  'crm-rescue',
  'team-ai',
  'change-pack',
  'content-system',
] as const

export type FunnelProductCode = (typeof FUNNEL_PRODUCT_CODES)[number]

export const FUNNEL_PRODUCT_LABELS: Record<FunnelProductCode, string> = {
  'speed-fix': 'Website Speed Fix',
  'missed-call': 'Missed-Call Text-Back',
  'google-profile': 'Google Profile Fix',
  'search-fix': 'Search Visibility Fix',
  'landing-page': 'Campaign Landing Page',
  'crm-rescue': 'CRM Rescue',
  'team-ai': 'Team AI',
  'change-pack': 'Change Pack',
  'content-system': 'Content System',
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
    price: '$750',
    blurb: 'Every missed call gets a reply before they dial the next business.',
    status: 'live',
    href: '/go/missed-call',
  },
  {
    code: 'google-profile',
    title: 'Google Profile Fix',
    price: '$600',
    blurb: 'Your Business Profile cleaned up so the right people find you first.',
    status: 'live',
    href: '/go/google-profile',
  },
  {
    code: 'search-fix',
    title: 'Search Visibility Fix',
    price: '$1,400',
    blurb: "Three days. Google's own records show the pages coming back.",
    status: 'live',
    href: '/go/search-fix',
  },
  {
    code: 'landing-page',
    title: 'Campaign Landing Page',
    price: '$1,800',
    blurb: 'Two days. One page that matches the ad promise and keeps the click.',
    status: 'live',
    href: '/go/landing-page',
  },
  {
    code: 'crm-rescue',
    title: 'CRM Rescue',
    price: '$2,800',
    blurb: 'Five days. Every enquiry caught, answered in seconds, and chased.',
    status: 'live',
    href: '/go/crm-rescue',
  },
  {
    code: 'team-ai',
    title: 'Team AI',
    price: 'From $1,950',
    blurb: 'Half a day. Shared setup, real tasks, prompts the whole team owns.',
    status: 'live',
    href: '/go/team-ai',
  },
  {
    code: 'change-pack',
    title: 'Change Pack',
    price: 'From $6,000',
    blurb: 'Training for a new system or AI rollout, built before day one.',
    status: 'live',
    href: '/go/change-pack',
  },
  {
    code: 'content-system',
    title: 'Content System',
    price: '$3,400 + $1,900/mo',
    blurb: 'One hour of your month. A month of on-brand content comes out the other side.',
    status: 'live',
    href: '/go/content-system',
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

/** Branded on-site access wizard path (preferred over Tally). Always keeps ?p= when present. */
export function accessFormPathForProduct(
  product: string | null | undefined,
  mode?: string | null,
): string {
  if (!product || !String(product).trim()) return '/go/access'
  const params = new URLSearchParams()
  params.set('p', String(product).trim())
  const m = mode?.trim().toLowerCase()
  if (m === 'remote' || m === 'onsite') params.set('m', m)
  return `/go/access?${params.toString()}`
}
