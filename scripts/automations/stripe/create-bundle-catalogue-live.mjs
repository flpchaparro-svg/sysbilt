#!/usr/bin/env node
/**
 * Create live Payment Links for the /go bundle catalogue (new amounts only).
 * Requires Stripe_Secret_key_live=sk_live_… in .env.local (refuses sk_test_).
 *
 *   node scripts/automations/stripe/create-bundle-catalogue-live.mjs
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

function camelConst(code) {
  return code
    .split('-')
    .map((part, i) => (i === 0 ? part : part[0].toUpperCase() + part.slice(1)))
    .join('')
}

function constFileName(code) {
  const camel = camelConst(code)
  return `${camel}Stripe.ts`
}

function exportName(code) {
  return `${code
    .split('-')
    .map((part) => part.toUpperCase())
    .join('_')}_STRIPE_URL`
}

const BUNDLES = [
  {
    code: 'found-booked',
    name: 'Found and booked',
    amount: 230000,
    description:
      'Google Profile Fix, Booking System, and Missed-Call Text-Back in one window. One location, one number, one calendar. SYSBILT ABN 56 115 228 020.',
    features: ['Google Profile Fix', 'Booking System', 'Missed-Call Text-Back', 'One handover'],
  },
  {
    code: 'catch-the-lead',
    name: 'Catch the lead',
    amount: 195000,
    description:
      'Google Profile Fix, Review Engine, and Missed-Call Text-Back in one window. One location, one number. SYSBILT ABN 56 115 228 020.',
    features: ['Google Profile Fix', 'Review Engine', 'Missed-Call Text-Back', 'One handover'],
  },
  {
    code: 'bundle-front-door',
    name: 'Front Door',
    amount: 255000,
    description:
      'Google Profile Fix, Review Engine, and Booking System in one window. One location, one calendar. SYSBILT ABN 56 115 228 020.',
    features: ['Google Profile Fix', 'Review Engine', 'Booking System', 'One handover'],
    constPath: 'bundleFrontDoorStripe.ts',
    exportName: 'BUNDLE_FRONT_DOOR_STRIPE_URL',
  },
  {
    code: 'local-pack',
    name: 'Maps alive',
    amount: 225000,
    description:
      'Google Profile Fix, Review Engine, and Profile Posting System in one sprint. Not local SEO. SYSBILT ABN 56 115 228 020.',
    features: ['Google Profile Fix', 'Review Engine', 'Profile Posting System', 'One handover'],
    constPath: 'localPackStripe.ts',
    exportName: 'LOCAL_PACK_STRIPE_URL',
  },
  {
    code: 'bundle-speed-next',
    name: 'Pages that ask',
    amount: 190000,
    description:
      'Conversion Pass plus Tracking and Forms Pack while site access is still open. SYSBILT ABN 56 115 228 020.',
    features: ['Conversion Pass', 'Tracking and Forms Pack', 'One handover'],
    constPath: 'bundleSpeedNextStripe.ts',
    exportName: 'BUNDLE_SPEED_NEXT_STRIPE_URL',
  },
  {
    code: 'call-and-book',
    name: 'Call and book',
    amount: 180000,
    description:
      'Booking System plus Missed-Call Text-Back in one window. One number, one calendar. SYSBILT ABN 56 115 228 020.',
    features: ['Booking System', 'Missed-Call Text-Back', 'One handover'],
  },
  {
    code: 'maps-trust',
    name: 'Maps trust',
    amount: 135000,
    description:
      'Google Profile Fix plus Review Engine in one window. One location. SYSBILT ABN 56 115 228 020.',
    features: ['Google Profile Fix', 'Review Engine', 'One handover'],
  },
  {
    code: 'full-diary',
    name: 'Full diary',
    amount: 240000,
    description:
      'Booking System, Missed-Call Text-Back, and No-Show Rescue in one window. One number, one calendar. SYSBILT ABN 56 115 228 020.',
    features: ['Booking System', 'Missed-Call Text-Back', 'No-Show Rescue', 'One handover'],
  },
  {
    code: 'get-found',
    name: 'Get found',
    amount: 210000,
    description:
      'Search Visibility Fix plus Schema and FAQ Pack in one window. One site. SYSBILT ABN 56 115 228 020.',
    features: ['Search Visibility Fix', 'Schema and FAQ Pack', 'One handover'],
  },
  {
    code: 'get-found-full',
    name: 'Get found (full)',
    amount: 360000,
    description:
      'Search Visibility Fix, On-Page Search Pack, and Schema and FAQ Pack in one window. One site. SYSBILT ABN 56 115 228 020.',
    features: ['Search Visibility Fix', 'On-Page Search Pack', 'Schema and FAQ Pack', 'One handover'],
  },
  {
    code: 'quote-path',
    name: 'Quote path',
    amount: 340000,
    description:
      'Quote Capture plus Quote Follow-Up Autopilot in one window. One quote pipeline. SYSBILT ABN 56 115 228 020.',
    features: ['Quote Capture', 'Quote Follow-Up Autopilot', 'One handover'],
  },
]

const created = []

for (const pack of BUNDLES) {
  const productParams = {
    name: pack.name,
    description: pack.description,
    'metadata[product]': pack.code,
  }
  pack.features.forEach((feat, i) => {
    productParams[`marketing_features[${i}][name]`] = feat
  })
  const product = await stripe('products', productParams)
  const price = await stripe('prices', {
    product: product.id,
    unit_amount: String(pack.amount),
    currency: 'aud',
    tax_behavior: 'inclusive',
    nickname: `${pack.name} $${pack.amount / 100}`,
    'metadata[product]': pack.code,
  })
  const link = await stripe('payment_links', {
    'line_items[0][price]': price.id,
    'line_items[0][quantity]': '1',
    ...CATALOGUE_TERMS,
    'after_completion[type]': 'redirect',
    'after_completion[redirect][url]': `https://sysbilt.com/go/thanks?p=${pack.code}`,
    billing_address_collection: 'auto',
    customer_creation: 'always',
    'invoice_creation[enabled]': 'true',
    'tax_id_collection[enabled]': 'true',
    submit_type: 'pay',
    'metadata[product]': pack.code,
    'metadata[abn]': '56115228020',
  })
  if (String(link.url || '').includes('test_')) {
    throw new Error(`Refusing test Payment Link URL for ${pack.code}`)
  }
  const jsonName = `${pack.code}-live.json`
  const out = {
    createdAt: new Date().toISOString(),
    mode: 'live',
    note: `${pack.name} · $${pack.amount / 100} live Payment Link. After pay → thanks?p=${pack.code} → access wizard.`,
    product: {
      code: pack.code,
      name: pack.name,
      productId: product.id,
      priceId: price.id,
      paymentLinkId: link.id,
      paymentLinkUrl: link.url,
      amountAud: pack.amount / 100,
    },
  }
  writeFileSync(resolve(__dirname, jsonName), JSON.stringify(out, null, 2) + '\n')
  const file = pack.constPath || constFileName(pack.code)
  const exp = pack.exportName || exportName(pack.code)
  writeFileSync(
    resolve(ROOT, 'src/constants', file),
    `/**
 * ${pack.name} · Stripe Payment Link (live).
 *
 * After pay → https://sysbilt.com/go/thanks?p=${pack.code}
 */
export const ${exp} = '${link.url}'
`,
  )
  created.push(`${pack.code} ${link.url}`)
  console.log('Wrote', pack.code, link.url)
}

writeFileSync(
  resolve(__dirname, 'bundle-catalogue-live.json'),
  JSON.stringify({createdAt: new Date().toISOString(), links: created}, null, 2) + '\n',
)
