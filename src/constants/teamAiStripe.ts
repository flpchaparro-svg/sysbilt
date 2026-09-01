/**
 * Team AI · Stripe Payment Links (live).
 *
 * Remote $1,950 → thanks?p=team-ai&m=remote
 * Face-to-face $2,400 → thanks?p=team-ai&m=onsite
 */
export const TEAM_AI_STRIPE = {
  remote: {
    label: 'Remote',
    ctaLabel: 'Book remote · $1,950',
    stripeUrl: 'https://buy.stripe.com/9B614h8yd9rqguOfoD3gk1v',
    amountAud: 1950,
  },
  onsite: {
    label: 'Face-to-face · Sydney',
    ctaLabel: 'Book face-to-face · $2,400',
    stripeUrl: 'https://buy.stripe.com/eVqfZbaGl9rqdiC0tJ3gk1w',
    amountAud: 2400,
  },
} as const

export function teamAiPriceOptions() {
  return Object.values(TEAM_AI_STRIPE).map((t) => ({
    label: t.label,
    ctaLabel: t.ctaLabel,
    stripeUrl: t.stripeUrl,
  }))
}
