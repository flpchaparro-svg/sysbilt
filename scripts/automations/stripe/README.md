# Stripe Payment Links (local, live)

Not part of the Vercel deploy. Needs `Stripe_Secret_key_live=sk_live_…` in `.env.local`.

## Public details (once, Dashboard)

Stripe will not show a reliable terms checkbox until these URLs are set:

1. Open [Public details](https://dashboard.stripe.com/settings/public)
2. Terms of service: `https://sysbilt.com/terms`
3. Privacy policy: `https://sysbilt.com/privacy`

Hosted Website Plan checkouts also link the plan agreement at `/go/website/agreement?tier=…&preview=1`.

## Hygiene (terms, ABN, extras, Google Pay)

Stripe cannot add a terms checkbox to an existing Payment Link. The hygiene script creates new links with the same prices, updates `src/constants/*Stripe.ts`, and deactivates the old URLs.

```bash
DRY_RUN=1 node scripts/automations/stripe/apply-checkout-hygiene-live.mjs
node scripts/automations/stripe/apply-checkout-hygiene-live.mjs
```

Google Pay: turn it on in Dashboard → Settings → Payment methods (default config `pmc_1Tu1RK7kQC0CB85zqQbwEHyB`). The API write is not available on this account from here.

Quote Capture keeps `https://buy.stripe.com/3cI14hbKp9rq4M6dgv3gk0E` (already had terms). Optional extras stay Concierge + quote/invoice setup. Complementary SKU is Quote Follow-Up, not Quote path.

## Hosted Website monthly care (do this at go-live)

The first Stripe charge is the **build fee only**. Monthly care does **not** start when they pay.

The day the site is on hosting and people can use it, Felipe runs:

```bash
node scripts/automations/stripe/start-website-monthly.mjs --email=owner@example.com --tier=practice
```

`--tier` is `brochure`, `practice`, or `full`. You can pass `--session=cs_live_…` or `--customer=cus_…` instead of email.

## New SKUs

Create scripts import `paymentLinkDefaults.mjs` so terms and ABN ship on create. Do not mint a live link without the terms checkbox.
