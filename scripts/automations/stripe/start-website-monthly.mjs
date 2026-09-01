#!/usr/bin/env node
/**
 * Start Hosted Website Plan monthly care the day the site is live.
 *
 * First payment (build fee) already happened on the Payment Link.
 * This creates the Subscription on the saved card.
 *
 * Requires Stripe_Secret_key_live=sk_live_… in .env.local.
 *
 *   node scripts/automations/stripe/start-website-monthly.mjs --email=owner@example.com --tier=practice
 *   node scripts/automations/stripe/start-website-monthly.mjs --session=cs_live_… --tier=full
 *   node scripts/automations/stripe/start-website-monthly.mjs --customer=cus_… --tier=brochure
 */
import {readFileSync, existsSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

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
  console.error('Need sk_live_…. Put Stripe_Secret_key_live=sk_live_… in .env.local.')
  process.exit(1)
}

function arg(name) {
  const prefix = `--${name}=`
  const hit = process.argv.find((a) => a.startsWith(prefix))
  return hit ? hit.slice(prefix.length).trim() : ''
}

async function stripe(method, path, params) {
  const url = `https://api.stripe.com/v1/${path}`
  const headers = {Authorization: `Bearer ${SK}`}
  let body
  if (method !== 'GET' && params) {
    const form = new URLSearchParams()
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined || v === null) continue
      form.append(k, String(v))
    }
    body = form
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  const res = await fetch(url, {method, headers, body})
  const data = await res.json()
  if (!res.ok) throw new Error(`${method} ${path}: ${JSON.stringify(data.error || data, null, 2)}`)
  return data
}

const email = arg('email')
const sessionId = arg('session')
const customerArg = arg('customer')
const tier = arg('tier')

if (!['brochure', 'practice', 'full'].includes(tier)) {
  console.error('Need --tier=brochure|practice|full')
  process.exit(1)
}
if (!email && !sessionId && !customerArg) {
  console.error('Need --email= or --session=cs_… or --customer=cus_…')
  process.exit(1)
}

const state = JSON.parse(
  readFileSync(resolve(__dirname, 'hosted-website-live.json'), 'utf8'),
)
const row = (state.tiers || []).find((t) => t.tier === tier)
if (!row?.monthlyPriceId) {
  console.error(`No monthlyPriceId for ${tier} in hosted-website-live.json`)
  process.exit(1)
}

async function resolveCustomerId() {
  if (customerArg) return customerArg
  if (sessionId) {
    const session = await stripe(
      'GET',
      `checkout/sessions/${encodeURIComponent(sessionId)}`,
    )
    const id =
      typeof session.customer === 'string'
        ? session.customer
        : session.customer?.id
    if (!id) throw new Error('Checkout session has no customer. Card may not have been saved.')
    return id
  }
  const list = await stripe(
    'GET',
    `customers?email=${encodeURIComponent(email)}&limit=5`,
  )
  if (!list.data.length) throw new Error(`No Stripe customer for ${email}`)
  if (list.data.length > 1) {
    console.warn(`Multiple customers for ${email}, using newest ${list.data[0].id}`)
  }
  return list.data[0].id
}

const customerId = await resolveCustomerId()

const existing = await stripe(
  'GET',
  `subscriptions?customer=${encodeURIComponent(customerId)}&status=active&limit=20`,
)
const already = existing.data.find(
  (s) =>
    s.metadata?.product === 'website' &&
    s.metadata?.tier === tier &&
    s.metadata?.kind === 'monthly-care',
)
if (already) {
  console.log('Monthly care already running:', already.id)
  process.exit(0)
}

const methods = await stripe(
  'GET',
  `payment_methods?customer=${encodeURIComponent(customerId)}&type=card&limit=10`,
)
const pm = methods.data[0]
if (!pm) {
  throw new Error(
    `No saved card on ${customerId}. Enrolment checkout must save the card (setup_future_usage).`,
  )
}

await stripe('POST', `customers/${customerId}`, {
  'invoice_settings[default_payment_method]': pm.id,
})

const sub = await stripe('POST', 'subscriptions', {
  customer: customerId,
  'items[0][price]': row.monthlyPriceId,
  default_payment_method: pm.id,
  'metadata[product]': 'website',
  'metadata[tier]': tier,
  'metadata[kind]': 'monthly-care',
  'metadata[abn]': '56115228020',
})

console.log(
  JSON.stringify(
    {
      customerId,
      paymentMethodId: pm.id,
      subscriptionId: sub.id,
      status: sub.status,
      monthlyPriceId: row.monthlyPriceId,
      tier,
    },
    null,
    2,
  ),
)
