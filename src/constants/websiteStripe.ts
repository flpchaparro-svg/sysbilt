/**
 * Hosted Website Plan · Stripe Payment Links (enrolment = one month today).
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
    stripeUrl: 'https://buy.stripe.com/aFaaER01HfPO2DY1xN3gk0a',
    amountAud: 120,
  },
  practice: {
    label: 'Practice · $160/mo',
    ctaLabel: 'Start Practice · $160 today',
    stripeUrl: 'https://buy.stripe.com/4gM14h01HfPOdiC3FV3gk09',
    amountAud: 160,
  },
  full: {
    label: 'Full site · $190/mo',
    ctaLabel: 'Start Full site · $190 today',
    stripeUrl: 'https://buy.stripe.com/4gM28l01HgTS6Ue90f3gk08',
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
