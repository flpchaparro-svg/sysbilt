/**
 * Private /go/ funnel commerce constants.
 *
 * Post-purchase access is the branded wizard at /go/access (not Tally).
 * TALLY_ACCESS_FORM_URL remains as an emergency backup URL only.
 *
 * status: 'soon' = visual draft only (no Stripe / form sale).
 */
export const TALLY_ACCESS_FORM_URL =
  'https://tally.so/r/2EyW7D' as const

/** Locked footer copy for every /go/ surface (Privacy + Terms are linked in the UI). */
export const FUNNEL_FOOTER_TEXT = 'SYSBILT, Sydney. ABN 56 115 228 020.' as const

export const FUNNEL_PRODUCT_CODES = [
  'speed-fix',
  'missed-call',
  'google-profile',
  'reviews',
  'search-fix',
  'booking',
  'landing-page',
  'ai-phone',
  'crm-rescue',
  'team-ai',
  'change-pack',
  'content-system',
  'website',
  'geo',
  'client-finder',
  'enquiry-reply',
  'profile-posting',
  'local-pack',
  'conversion-pass',
  'onpage-search',
  'schema-faq',
  'tracking-forms',
  'site-chat',
  'media-clean',
  'a11y-pass',
  'whatsapp-setup',
  'dm-reply',
  'quote-followup',
  'quote-capture',
  'noshow-rescue',
  'intake-forms',
  'inbox-triage',
  'sop-playbook',
  'dashboard-lite',
  'bundle-clinic',
  'bundle-speed-next',
  'bundle-front-door',
  'website-hook',
] as const

export type FunnelProductCode = (typeof FUNNEL_PRODUCT_CODES)[number]

/** How the offer is sold / shown on the private catalogue. */
export type FunnelLane = 'outbound' | 'warm' | 'soon'

/** Homepage grouping for the private catalogue. */
export type FunnelSectionId =
  | 'outbound'
  | 'warm'
  | 'draft-local'
  | 'draft-after-site'
  | 'draft-leads'
  | 'draft-ai'
  | 'draft-bundles'
  | 'draft-web'

export const FUNNEL_PRODUCT_LABELS: Record<FunnelProductCode, string> = {
  'speed-fix': 'Website Speed Fix',
  'missed-call': 'Missed-Call Text-Back',
  'google-profile': 'Google Profile Fix',
  reviews: 'Review Engine',
  'search-fix': 'Search Visibility Fix',
  booking: 'Booking System',
  'landing-page': 'Campaign Landing Page',
  'ai-phone': 'AI Phone Setup',
  'crm-rescue': 'CRM Rescue',
  'team-ai': 'Team AI',
  'change-pack': 'Change Pack',
  'content-system': 'Content System',
  website: 'Hosted Website Plan',
  geo: 'AI Search Visibility',
  'client-finder': 'Client Finder Sprint',
  'enquiry-reply': 'Enquiry Auto-Reply',
  'profile-posting': 'Profile Posting System',
  'local-pack': 'Local Pack',
  'conversion-pass': 'Conversion Pass',
  'onpage-search': 'On-Page Search Pack',
  'schema-faq': 'Schema and FAQ Pack',
  'tracking-forms': 'Tracking and Forms Pack',
  'site-chat': 'Site AI Chat',
  'media-clean': 'Image and Media Clean',
  'a11y-pass': 'Accessibility Quick Pass',
  'whatsapp-setup': 'WhatsApp Business Setup',
  'dm-reply': 'DM Reply System',
  'quote-followup': 'Quote Follow-Up Autopilot',
  'quote-capture': 'Quote Capture',
  'noshow-rescue': 'No-Show Rescue',
  'intake-forms': 'Intake Form Pack',
  'inbox-triage': 'Inbox Triage Assistant',
  'sop-playbook': 'SOP to AI Playbook',
  'dashboard-lite': 'Dashboard Lite',
  'bundle-clinic': 'Clinic Capture Bundle',
  'bundle-speed-next': 'Speed Next Bundle',
  'bundle-front-door': 'Front Door Bundle',
  'website-hook': 'Hosted Website Plan',
}

export type FunnelProductStatus = 'live' | 'soon'

/** Private catalogue for /go home. Not linked from public nav. */
export type FunnelProductCard = {
  code: FunnelProductCode
  title: string
  price: string
  blurb: string
  status: FunnelProductStatus
  /** outbound = cold-email doors; warm = call/scoping; soon = readable draft, not for sale */
  lane: FunnelLane
  section: FunnelSectionId
  href: string
}

/** Cold-email /go doors Felipe sends in outbound. */
export const FUNNEL_OUTBOUND_CODES: ReadonlySet<string> = new Set([
  'speed-fix',
  'missed-call',
  'google-profile',
  'reviews',
  'search-fix',
  'booking',
  'landing-page',
  'ai-phone',
  'crm-rescue',
  'profile-posting',
  'enquiry-reply',
  'local-pack',
  'conversion-pass',
  'onpage-search',
  'schema-faq',
  'tracking-forms',
  'site-chat',
  'media-clean',
  'a11y-pass',
  'whatsapp-setup',
  'dm-reply',
  'quote-followup',
  'quote-capture',
  'noshow-rescue',
  'intake-forms',
  'inbox-triage',
  'sop-playbook',
  'dashboard-lite',
  'bundle-clinic',
  'bundle-speed-next',
  'bundle-front-door',
  'geo',
  'client-finder',
])

export const FUNNEL_PRODUCT_CATALOGUE: FunnelProductCard[] = [
  {
    code: 'speed-fix',
    title: 'Website Speed Fix',
    price: '$1,200',
    blurb: "Three days. Measured before and after with Google's own score.",
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/speed-fix',
  },
  {
    code: 'missed-call',
    title: 'Missed-Call Text-Back',
    price: '$750',
    blurb: 'Every missed call gets a reply before they dial the next business.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/missed-call',
  },
  {
    code: 'google-profile',
    title: 'Google Profile Fix',
    price: '$600',
    blurb: 'Your Business Profile cleaned up so the right people find you first.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/google-profile',
  },
  {
    code: 'reviews',
    title: 'Review Engine',
    price: '$1,100',
    blurb: 'Automatic ask after every job. Templates, QR, and response wording included.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/reviews',
  },
  {
    code: 'profile-posting',
    title: 'Profile Posting System',
    price: '$1,100',
    blurb: 'Cadence, templates, and a starter bank. You hit publish.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/profile-posting',
  },
  {
    code: 'search-fix',
    title: 'Search Visibility Fix',
    price: '$1,400',
    blurb: "Three days. Google's own records show the pages coming back.",
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/search-fix',
  },
  {
    code: 'booking',
    title: 'Booking System',
    price: '$1,500',
    blurb: 'Book now on your site and profile, with reminders that cut no-shows.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/booking',
  },
  {
    code: 'landing-page',
    title: 'Campaign Landing Page',
    price: '$1,800',
    blurb: 'Two days. One page that matches the ad promise and keeps the click.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/landing-page',
  },
  {
    code: 'ai-phone',
    title: 'AI Phone Setup',
    price: '$1,950',
    blurb: 'One-time setup. A voice agent on your account that answers and books.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/ai-phone',
  },
  {
    code: 'crm-rescue',
    title: 'CRM Rescue',
    price: '$2,800',
    blurb: 'Five days. Every enquiry caught, answered in seconds, and chased.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/crm-rescue',
  },
  {
    code: 'team-ai',
    title: 'Team AI',
    price: 'From $1,950',
    blurb: 'Half a day. Shared setup, real tasks, prompts the whole team owns.',
    status: 'live',
    lane: 'warm',
    section: 'warm',
    href: '/go/team-ai',
  },
  {
    code: 'change-pack',
    title: 'Change Pack',
    price: 'From $6,000',
    blurb: 'Training for a new system or AI rollout, built before day one.',
    status: 'live',
    lane: 'warm',
    section: 'warm',
    href: '/go/change-pack',
  },
  {
    code: 'content-system',
    title: 'Content System',
    price: '$3,400 + $1,900/mo',
    blurb: 'One hour of your month. A month of on-brand content comes out the other side.',
    status: 'live',
    lane: 'warm',
    section: 'warm',
    href: '/go/content-system',
  },
  {
    code: 'enquiry-reply',
    title: 'Enquiry Auto-Reply',
    price: '$350',
    blurb: 'Instant acknowledgement on website forms and email, routed to one inbox.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/enquiry-reply',
  },
  {
    code: 'local-pack',
    title: 'Local Pack',
    price: '$2,400',
    blurb: 'Profile Fix, Review Engine, and Profile Posting in one sprint. Not local SEO.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/local-pack',
  },
  {
    code: 'conversion-pass',
    title: 'Conversion Pass',
    price: '$1,400',
    blurb: 'Home, contact, and key service pages rewritten so people enquire.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/conversion-pass',
  },
  {
    code: 'onpage-search',
    title: 'On-Page Search Pack',
    price: '$1,900',
    blurb: 'Titles, headings, links, and thin pages fixed on up to eight priority pages.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/onpage-search',
  },
  {
    code: 'schema-faq',
    title: 'Schema and FAQ Pack',
    price: '$1,200',
    blurb: 'Clear FAQs and markup search and AI tools can read.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/schema-faq',
  },
  {
    code: 'tracking-forms',
    title: 'Tracking and Forms Pack',
    price: '$950',
    blurb: 'Primary events, form destinations, and a plain weekly watchlist.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/tracking-forms',
  },
  {
    code: 'site-chat',
    title: 'Site AI Chat',
    price: '$950',
    blurb: 'Branded AI chat on your site: approved FAQs, human handoff, tight leash.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/site-chat',
  },
  {
    code: 'media-clean',
    title: 'Image and Media Clean',
    price: '$650',
    blurb: 'Heavy images cleaned on scoped pages, plus a plain upload guide.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/media-clean',
  },
  {
    code: 'a11y-pass',
    title: 'Accessibility Quick Pass',
    price: '$1,100',
    blurb: 'Critical access fixes that also help clarity and trust.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/a11y-pass',
  },
  {
    code: 'whatsapp-setup',
    title: 'WhatsApp Business Setup',
    price: '$950',
    blurb: 'Business profile, labels, quick replies, and routing.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/whatsapp-setup',
  },
  {
    code: 'dm-reply',
    title: 'DM Reply System',
    price: '$1,100',
    blurb: 'Instagram and Facebook quick replies with a clear handoff.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/dm-reply',
  },
  {
    code: 'quote-followup',
    title: 'Quote Follow-Up Autopilot',
    price: '$1,450',
    blurb: 'Gentle chase for quotes that went quiet.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/quote-followup',
  },
  {
    code: 'quote-capture',
    title: 'Quote Capture',
    price: '$2,800',
    blurb: 'Guided quote wizard on your site with PDF, pay link, and priced lead alert.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/quote-capture',
  },
  {
    code: 'noshow-rescue',
    title: 'No-Show Rescue',
    price: '$750',
    blurb: 'Reminders and a rebook path that protects your calendar.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/noshow-rescue',
  },
  {
    code: 'intake-forms',
    title: 'Intake Form Pack',
    price: '$1,200',
    blurb: 'Branded intake that feeds your CRM without messy email threads.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/intake-forms',
  },
  {
    code: 'inbox-triage',
    title: 'Inbox Triage Assistant',
    price: '$2,200',
    blurb: 'Rules and draft replies so the inbox stops owning your day.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/inbox-triage',
  },
  {
    code: 'sop-playbook',
    title: 'SOP to AI Playbook',
    price: '$2,400',
    blurb: 'Your real jobs turned into prompts and steps the team can reuse.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/sop-playbook',
  },
  {
    code: 'dashboard-lite',
    title: 'Dashboard Lite',
    price: '$2,600',
    blurb: 'One view: leads, bookings, reviews, and what ads actually return.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/dashboard-lite',
  },
  {
    code: 'bundle-clinic',
    title: 'Clinic Capture Bundle',
    price: '$2,200',
    blurb: 'Profile Fix, Review Engine, and Missed-Call in one pass.',
    status: 'live',
    lane: 'outbound',
    section: 'draft-bundles',
    href: '/go/bundle-clinic',
  },
  {
    code: 'bundle-speed-next',
    title: 'Speed Next Bundle',
    price: '$2,400',
    blurb: 'Conversion Pass plus Tracking Pack while the site is open.',
    status: 'live',
    lane: 'outbound',
    section: 'draft-bundles',
    href: '/go/bundle-speed-next',
  },
  {
    code: 'bundle-front-door',
    title: 'Front Door Bundle',
    price: '$3,400',
    blurb: 'Profile, Reviews, and Booking so demand can land and book.',
    status: 'live',
    lane: 'outbound',
    section: 'draft-bundles',
    href: '/go/bundle-front-door',
  },
  {
    code: 'website',
    title: 'Hosted Website Plan',
    price: 'From $120/mo',
    blurb:
      'We interview, write, build and host. Brochure, Practice or Full site. About fourteen days to live.',
    status: 'live',
    lane: 'warm',
    section: 'warm',
    href: '/go/website',
  },
  {
    code: 'website-hook',
    title: 'Hosted Website Plan',
    price: 'From $120/mo',
    blurb: 'A website that stays looked after, for the price of a phone plan.',
    status: 'soon',
    lane: 'soon',
    section: 'draft-web',
    href: '/go/website',
  },
  {
    code: 'geo',
    title: 'AI Search Visibility',
    price: '$2,200',
    blurb: 'Show up when people ask AI tools, not only the old results list.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/geo',
  },
  {
    code: 'client-finder',
    title: 'Client Finder Sprint',
    price: '$2,800',
    blurb: 'Curated prospects, approach scripts, and a plan. Not endless spam.',
    status: 'live',
    lane: 'outbound',
    section: 'outbound',
    href: '/go/client-finder',
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
