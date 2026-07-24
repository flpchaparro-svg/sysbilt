#!/usr/bin/env node
/**
 * Point Hosted Website Payment Links at local agreement after pay.
 * Stripe test mode allows http://localhost redirects.
 *
 * Usage:
 *   node scripts/automations/stripe/update-website-payment-link-redirects.mjs
 *   SUCCESS_BASE=http://localhost:3333 node scripts/automations/stripe/update-website-payment-link-redirects.mjs
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '../../..')
const SUCCESS_BASE = (process.env.SUCCESS_BASE || 'http://localhost:3333').replace(/\/$/, '')

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

if (!secret?.startsWith('sk_test_')) {
  console.error('Need sk_test_ in .env.local')
  process.exit(1)
}

const state = JSON.parse(
  readFileSync(resolve(__dirname, 'hosted-website-sandbox.json'), 'utf8'),
)

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
  if (!res.ok) throw new Error(`${method} ${path}: ${JSON.stringify(json)}`)
  return json
}

for (const tier of state.tiers) {
  const url = `${SUCCESS_BASE}/go/website/agreement?tier=${tier.tier}&paid=1&session_id={CHECKOUT_SESSION_ID}`
  const updated = await stripe('POST', `/payment_links/${tier.paymentLinkId}`, {
    'after_completion[type]': 'redirect',
    'after_completion[redirect][url]': url,
  })
  console.log(`${tier.tier}: after pay → ${updated.after_completion?.redirect?.url}`)
}

console.log('\nDone. Pay with test card 4242… then you land on local agreement.')
