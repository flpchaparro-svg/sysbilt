/**
 * Hosted Website Plan · Stripe Payment Links (build fee today, monthly care from go-live).
 *
 * Live IDs: scripts/automations/stripe/hosted-website-live.json
 * Sandbox IDs: scripts/automations/stripe/hosted-website-sandbox.json
 *
 * Add logo on each Product / Payment Link in the Stripe Dashboard (Live).
 */
export const WEBSITE_STRIPE_ENROLMENT = {
  brochure: {
    label: 'Brochure · $120/mo',
    ctaLabel: 'Start Brochure · $120 today',
    stripeUrl: 'https://buy.stripe.com/28EbIV5m1dHG6Ueb8n3gk1x',
    amountAud: 120,
  },
  practice: {
    label: 'Practice · $160/mo',
    ctaLabel: 'Start Practice · $160 today',
    stripeUrl: 'https://buy.stripe.com/14A4gtg0FdHG2DYb8n3gk1y',
    amountAud: 160,
  },
  full: {
    label: 'Full site · $190/mo',
    ctaLabel: 'Start Full site · $190 today',
    stripeUrl: 'https://buy.stripe.com/00waER01Havu5Qaekz3gk1z',
    amountAud: 190,
  },
} as const

export function websiteEnrolmentPriceOptions() {
  return Object.values(WEBSITE_STRIPE_ENROLMENT).map((t) => ({
    label: t.label,
    ctaLabel: t.ctaLabel,
    stripeUrl: t.stripeUrl,
  }))
}
