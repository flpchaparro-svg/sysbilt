/**
 * Quote Capture · Stripe Payment Link.
 *
 * TEMP: test-mode link (local .env only has sk_test_).
 * Before deploy, run: node scripts/automations/stripe/create-quote-capture-live.mjs
 * with Stripe_Secret_key_live=sk_live_… so this becomes a live buy.stripe.com URL
 * (not test_). After pay → https://sysbilt.com/go/thanks?p=quote-capture
 */
export const QUOTE_CAPTURE_STRIPE_URL =
  'https://buy.stripe.com/test_28E8wJ03NeEKaR27iXaEE0e'
