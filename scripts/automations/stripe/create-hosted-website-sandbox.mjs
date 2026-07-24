#!/usr/bin/env node
/**
 * Create Hosted Website Plan products + Payment Links in Stripe TEST mode.
 *
 * Today (enrolment): one-time $120 / $160 / $190
 * Monthly prices also created for go-live autopay wiring later.
 *
 * Usage (from repo root, with Stripe_Secret_key=sk_test_… in .env.local):
 *   node scripts/automations/stripe/create-hosted-website-sandbox.mjs
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '../../..')

function loadEnvLocal() {
  const path = resolve(ROOT, '.env.local')
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (!m) continue
    const key = m[1].trim()
    let val = m[2].trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = val
  }
}

loadEnvLocal()

const secret =
  process.env.Stripe_Secret_key ||
  process.env.STRIPE_SECRET_KEY ||
  process.env.STRIPE_SECRET

if (!secret) {
  console.error('Missing Stripe_Secret_key in .env.local')
  process.exit(1)
}
if (!secret.startsWith('sk_test_')) {
  console.error('Refusing to run: key is not sk_test_. Use sandbox only.')
  process.exit(1)
}

async function stripe(method, path, params = {}) {
  const body = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue
    body.append(k, String(v))
  }
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: method === 'GET' ? undefined : body,
  })
  const json = await res.json()
  if (!res.ok) {
    throw new Error(`${method} ${path}: ${JSON.stringify(json)}`)
  }
  return json
}

const TIERS = [
  {
    code: 'brochure',
    name: 'Hosted Website Plan · Brochure',
    amount: 12000,
    pages: 'one page',
  },
  {
    code: 'practice',
    name: 'Hosted Website Plan · Practice',
    amount: 16000,
    pages: '5 to 7 pages',
  },
  {
    code: 'full',
    name: 'Hosted Website Plan · Full site',
    amount: 19000,
    pages: '9 to 12 pages',
  },
]

function productDescription(tier) {
  // Shown on Checkout. Keep plain, no !, AU spelling, under Stripe comfort length.
  return (
    `${tier.name}. Pay $${tier.amount / 100} today to start. ` +
    `We interview, write, build and host a ${tier.pages} site on our care plan. ` +
    `Monthly $${tier.amount / 100} autopay begins when your site goes live (about 14 days). ` +
    `Twelve month term from go-live. Not a custom app or online shop. ` +
    `SYSBILT ABN 56 115 228 020.`
  )
}

const FEATURES = [
  'Pay one month today to start the build',
  'Monthly autopay begins at go-live',
  'Interview, copy, build and hosting included',
  'About 14 days to live from a complete brief',
  '12 month term from go-live',
]

async function main() {
  const out = []

  for (const tier of TIERS) {
    const product = await stripe('POST', '/products', {
      name: tier.name,
      description: productDescription(tier),
      url: 'https://sysbilt.com/go/website',
      'metadata[product]': 'website',
      'metadata[tier]': tier.code,
      'metadata[abn]': '56115228020',
      'metadata[business]': 'SYSBILT',
      'metadata[billing]': 'enrolment-today-monthly-at-golive',
      'marketing_features[0][name]': FEATURES[0],
      'marketing_features[1][name]': FEATURES[1],
      'marketing_features[2][name]': FEATURES[2],
      'marketing_features[3][name]': FEATURES[3],
      'marketing_features[4][name]': FEATURES[4],
    })

    const enrolment = await stripe('POST', '/prices', {
      product: product.id,
      currency: 'aud',
      unit_amount: tier.amount,
      'metadata[product]': 'website',
      'metadata[tier]': tier.code,
      'metadata[kind]': 'enrolment',
    })

    const monthly = await stripe('POST', '/prices', {
      product: product.id,
      currency: 'aud',
      unit_amount: tier.amount,
      'recurring[interval]': 'month',
      'metadata[product]': 'website',
      'metadata[tier]': tier.code,
      'metadata[kind]': 'monthly',
    })

    // Payment Link: enrolment only (today). Logo you add in Dashboard.
    const link = await stripe('POST', '/payment_links', {
      'line_items[0][price]': enrolment.id,
      'line_items[0][quantity]': 1,
      'after_completion[type]': 'redirect',
      'after_completion[redirect][url]':
        'https://sysbilt.com/go/website/wizard?paid=1&tier=' + tier.code,
      billing_address_collection: 'required',
      'phone_number_collection[enabled]': 'true',
      'tax_id_collection[enabled]': 'true',
      customer_creation: 'always',
      allow_promotion_codes: 'false',
      'metadata[product]': 'website',
      'metadata[tier]': tier.code,
      'metadata[kind]': 'enrolment',
      'custom_text[submit][message]':
        'Today is one month to start. Monthly autopay begins when your site goes live.',
      'payment_intent_data[description]': productDescription(tier).slice(0, 1000),
      'payment_intent_data[statement_descriptor]': 'SYSBILTWEB',
    })

    const row = {
      tier: tier.code,
      productId: product.id,
      enrolmentPriceId: enrolment.id,
      monthlyPriceId: monthly.id,
      paymentLinkId: link.id,
      paymentLinkUrl: link.url,
      amountAud: tier.amount / 100,
    }
    out.push(row)
    console.log(`\n${tier.name}`)
    console.log(`  product:   ${product.id}`)
    console.log(`  enrolment: ${enrolment.id} ($${tier.amount / 100} once)`)
    console.log(`  monthly:   ${monthly.id} ($${tier.amount / 100}/mo, for go-live later)`)
    console.log(`  link:      ${link.url}`)
  }

  const statePath = resolve(__dirname, 'hosted-website-sandbox.json')
  writeFileSync(
    statePath,
    JSON.stringify(
      {
        createdAt: new Date().toISOString(),
        mode: 'test',
        note: 'Import or recreate in live when ready. Add logo on each Payment Link in Dashboard. Wire Sanity stripeUrl or code CTAs to paymentLinkUrl.',
        tiers: out,
      },
      null,
      2,
    ) + '\n',
  )
  console.log(`\nWrote ${statePath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
