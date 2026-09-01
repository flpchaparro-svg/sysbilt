#!/usr/bin/env node
/**
 * Create Conversion Pass live Payment Link ($1,400).
 * Requires Stripe_Secret_key_live=sk_live_… in .env.local (refuses sk_test_).
 *
 *   node scripts/automations/stripe/create-conversion-pass-live.mjs
 */
import {readFileSync, existsSync, writeFileSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {CATALOGUE_TERMS} from './paymentLinkDefaults.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '../../..')

function loadEnvLocal() {
  const path = resolve(ROOT, '.env.local')
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined || process.env[key] === '') {
      process.env[key] = value
    }
  }
}

loadEnvLocal()

const SK =
  process.env.Stripe_Secret_key_live ||
  process.env.STRIPE_SECRET_KEY_LIVE ||
  process.env.Stripe_Secret_key ||
  process.env.STRIPE_SECRET_KEY ||
  ''

if (!SK.startsWith('sk_live_')) {
  console.error(
    'Need sk_live_…. Put Stripe_Secret_key_live=sk_live_… in .env.local and re-run.',
  )
  process.exit(1)
}

async function stripe(path, params) {
  const body = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue
    body.append(k, String(v))
  }
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SK}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(JSON.stringify(data.error || data, null, 2))
  return data
}

const product = await stripe('products', {
  name: 'Conversion Pass',
  description:
    'Rewrite home, contact, and up to two service pages so the offer, proof, and next step are obvious. Not a full redesign. SYSBILT ABN 56 115 228 020.',
  'metadata[product]': 'conversion-pass',
  'marketing_features[0][name]': 'Home rewrite: offer, proof, primary CTA',
  'marketing_features[1][name]': 'Contact clarity on mobile',
  'marketing_features[2][name]': 'Up to two service pages',
  'marketing_features[3][name]': 'Mobile-first pass before handoff',
})

const price = await stripe('prices', {
  product: product.id,
  unit_amount: '140000',
  currency: 'aud',
  tax_behavior: 'inclusive',
  nickname: 'Conversion Pass $1400',
  'metadata[product]': 'conversion-pass',
})

const link = await stripe('payment_links', {
  'line_items[0][price]': price.id,
  'line_items[0][quantity]': '1',
  ...CATALOGUE_TERMS,
  'after_completion[type]': 'redirect',
  'after_completion[redirect][url]':
    'https://sysbilt.com/go/thanks?p=conversion-pass',
  billing_address_collection: 'auto',
  customer_creation: 'always',
  'invoice_creation[enabled]': 'true',
  'tax_id_collection[enabled]': 'true',
  submit_type: 'pay',
  'metadata[product]': 'conversion-pass',
  'metadata[abn]': '56115228020',
})

if (String(link.url || '').includes('test_')) {
  throw new Error('Refusing test Payment Link URL')
}

const out = {
  createdAt: new Date().toISOString(),
  mode: 'live',
  note: 'Conversion Pass · $1,400 live Payment Link. After pay → thanks?p=conversion-pass → access wizard.',
  product: {
    code: 'conversion-pass',
    name: 'Conversion Pass',
    productId: product.id,
    priceId: price.id,
    paymentLinkId: link.id,
    paymentLinkUrl: link.url,
    amountAud: 1400,
  },
}

writeFileSync(
  resolve(__dirname, 'conversion-pass-live.json'),
  JSON.stringify(out, null, 2) + '\n',
)

const constPath = resolve(ROOT, 'src/constants/conversionPassStripe.ts')
writeFileSync(
  constPath,
  `/**
 * Conversion Pass · Stripe Payment Link (live).
 *
 * After pay → https://sysbilt.com/go/thanks?p=conversion-pass
 */
export const CONVERSION_PASS_STRIPE_URL = '${link.url}'
`,
)

console.log('Wrote', link.url)
