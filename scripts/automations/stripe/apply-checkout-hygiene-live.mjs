#!/usr/bin/env node
/**
 * Live Stripe checkout hygiene (Pass 1–3).
 *
 * Stripe cannot add a terms checkbox to an existing Payment Link (create-only).
 * This script creates new links with the same prices, updates repo URLs, and
 * deactivates the old links. Quote Capture already has terms: we only add the
 * Quote Follow-Up extra.
 *
 * Requires Stripe_Secret_key_live=sk_live_… in .env.local.
 *
 *   node scripts/automations/stripe/apply-checkout-hygiene-live.mjs
 *   DRY_RUN=1 node scripts/automations/stripe/apply-checkout-hygiene-live.mjs
 */
import {readFileSync, existsSync, writeFileSync, readdirSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import {
  CATALOGUE_TERMS,
  SYSBILT_ABN,
  websiteTerms,
} from './paymentLinkDefaults.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '../../..')
const DRY = process.env.DRY_RUN === '1'
const PMC_ID = 'pmc_1Tu1RK7kQC0CB85zqQbwEHyB'

const OLD_PACK_PLINKS = [
  'plink_1U0LGi7kQC0CB85zKgHSSyAR',
  'plink_1U0LGg7kQC0CB85z5iZ7x0Jm',
  'plink_1U0LGe7kQC0CB85zEVbMv0ab',
  'plink_1TzxWz7kQC0CB85zEisQ0rS2',
]

/** Complementary extra: never a pack that already contains the SKU. */
const RELATED_EXTRA = {
  'speed-fix': 'conversion-pass',
  'missed-call': 'booking',
  'google-profile': 'reviews',
  reviews: 'google-profile',
  'feedback-review': 'reviews',
  'search-fix': 'schema-faq',
  booking: 'missed-call',
  'landing-page': 'tracking-forms',
  'ai-phone': 'booking',
  'crm-rescue': 'enquiry-reply',
  'team-ai': 'change-pack',
  'change-pack': 'team-ai',
  'enquiry-reply': 'missed-call',
  'profile-posting': 'reviews',
  'local-pack': 'missed-call',
  'conversion-pass': 'tracking-forms',
  'onpage-search': 'schema-faq',
  'schema-faq': 'search-fix',
  'tracking-forms': 'conversion-pass',
  'site-chat': 'conversion-pass',
  'media-clean': 'speed-fix',
  'a11y-pass': 'conversion-pass',
  'whatsapp-setup': 'dm-reply',
  'dm-reply': 'enquiry-reply',
  'quote-followup': 'quote-capture',
  'quote-capture': 'quote-followup',
  'noshow-rescue': 'booking',
  'intake-forms': 'booking',
  'inbox-triage': 'sop-playbook',
  'sop-playbook': 'team-ai',
  'dashboard-lite': 'tracking-forms',
  geo: 'search-fix',
  'client-finder': 'geo',
  'found-booked': 'reviews',
  'catch-the-lead': 'booking',
  'call-and-book': 'google-profile',
  'maps-trust': 'missed-call',
  'full-diary': 'google-profile',
  'get-found': 'onpage-search',
  'get-found-full': 'conversion-pass',
  'quote-path': 'enquiry-reply',
  'bundle-speed-next': 'speed-fix',
  'bundle-front-door': 'missed-call',
}

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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
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

async function listAll(path) {
  const out = []
  let startingAfter
  do {
    const q = new URLSearchParams({limit: '100'})
    if (startingAfter) q.set('starting_after', startingAfter)
    const page = await stripe('GET', `${path}?${q}`)
    out.push(...page.data)
    startingAfter = page.has_more ? page.data.at(-1).id : null
  } while (startingAfter)
  return out
}

function productCode(obj) {
  return String(obj?.metadata?.product || obj?.metadata?.funnel || '').trim()
}

function goSlug(code, link) {
  if (code === 'website') return 'website'
  if (code === 'team-ai') return 'team-ai'
  if (code) return code
  const url = link.after_completion?.redirect?.url || ''
  const m = url.match(/[?&]p=([a-z0-9-]+)/i)
  return m ? m[1] : 'website'
}

function replaceInTree(oldUrl, newUrl) {
  if (!oldUrl || oldUrl === newUrl) return 0
  let n = 0
  const roots = [
    resolve(ROOT, 'src/constants'),
    resolve(ROOT, 'scripts/automations/stripe'),
  ]
  function walk(dir) {
    for (const name of readdirSync(dir, {withFileTypes: true})) {
      const full = resolve(dir, name.name)
      if (name.isDirectory()) {
        walk(full)
        continue
      }
      if (!/\.(ts|json|mjs)$/.test(name.name)) continue
      const raw = readFileSync(full, 'utf8')
      if (!raw.includes(oldUrl)) continue
      writeFileSync(full, raw.split(oldUrl).join(newUrl))
      n += 1
    }
  }
  for (const dir of roots) walk(dir)
  return n
}

function oneTimePriceForProduct(prices, productId, code) {
  const rows = prices.filter(
    (p) =>
      p.active &&
      p.product === productId &&
      p.type === 'one_time' &&
      p.currency === 'aud' &&
      p.unit_amount > 0,
  )
  if (code === 'website') {
    return rows.find((p) => p.metadata?.kind === 'enrolment') || rows[0]
  }
  if (code === 'team-ai') {
    return rows.find((p) => p.nickname?.toLowerCase().includes('remote')) || rows[0]
  }
  return rows.sort((a, b) => (b.created || 0) - (a.created || 0))[0]
}

function extraPriceId(products, prices, extraCode) {
  if (!extraCode) return null
  const prod = products.find((p) => productCode(p) === extraCode && p.active)
  if (!prod) return null
  const price = oneTimePriceForProduct(prices, prod.id, extraCode)
  return price?.id || null
}

function optionalItemParams(priceId, index, quantity = '0') {
  const i = String(index)
  return {
    [`optional_items[${i}][price]`]: priceId,
    [`optional_items[${i}][quantity]`]: quantity === '0' ? '1' : quantity,
    [`optional_items[${i}][adjustable_quantity][enabled]`]: 'true',
    [`optional_items[${i}][adjustable_quantity][minimum]`]: '0',
    [`optional_items[${i}][adjustable_quantity][maximum]`]: '1',
  }
}

async function main() {
  console.log(DRY ? 'DRY RUN' : 'LIVE')

  const [links, products, prices] = await Promise.all([
    listAll('payment_links'),
    listAll('products'),
    listAll('prices'),
  ])

  if (!DRY) {
    await stripe('POST', `payment_method_configurations/${PMC_ID}`, {
      'google_pay[display_preference][preference]': 'on',
    })
    console.log('Google Pay: on')
  }

  for (const prod of products) {
    if (!prod.active) continue
    if (prod.metadata?.abn === SYSBILT_ABN) continue
    if (DRY) {
      console.log('Would stamp ABN on product', prod.id, prod.name)
      continue
    }
    const meta = {...(prod.metadata || {}), abn: SYSBILT_ABN}
    const params = {}
    for (const [k, v] of Object.entries(meta)) {
      params[`metadata[${k}]`] = v
    }
    await stripe('POST', `products/${prod.id}`, params)
    await sleep(80)
  }
  console.log('Product ABN pass done')

  for (const id of OLD_PACK_PLINKS) {
    const existing = links.find((l) => l.id === id)
    if (!existing) continue
    if (DRY) {
      console.log('Would keep archived', id)
      continue
    }
    if (existing.active) {
      await stripe('POST', `payment_links/${id}`, {active: 'false'})
    }
  }

  const quoteFollowupPrice = extraPriceId(products, prices, 'quote-followup')
  const quoteCapture = links.find((l) => l.id === 'plink_1U61os7kQC0CB85z8fOD94ul')
  if (quoteCapture && quoteFollowupPrice && !DRY) {
    await stripe('POST', `payment_links/${quoteCapture.id}`, {
      ...optionalItemParams('price_1U61oc7kQC0CB85zVS0SVMPp', 0, '1'),
      ...optionalItemParams('price_1U61oQ7kQC0CB85zrdvZSb2N', 1, '1'),
      ...optionalItemParams(quoteFollowupPrice, 2, '0'),
      'metadata[product]': 'quote-capture',
      'metadata[abn]': SYSBILT_ABN,
      customer_creation: 'always',
    })
    console.log('Quote Capture: kept URL, added Quote Follow-Up extra')
  } else if (quoteCapture && quoteFollowupPrice && DRY) {
    console.log('Would add Quote Follow-Up extra to Quote Capture')
  }

  const created = []
  for (const link of links) {
    if (!link.active) continue
    if (link.id === 'plink_1U61os7kQC0CB85z8fOD94ul') continue
    if (OLD_PACK_PLINKS.includes(link.id)) continue
    const alreadyTerms =
      link.consent_collection?.terms_of_service === 'required'
    const isWebsitePreview =
      productCode(link) === 'website' ||
      (link.metadata?.kind === 'enrolment' && link.metadata?.tier)
    if (alreadyTerms && !isWebsitePreview) continue
    if (
      alreadyTerms &&
      isWebsitePreview &&
      link.payment_intent_data?.setup_future_usage === 'off_session'
    ) {
      continue
    }

    const code = productCode(link)
    const isWebsite = code === 'website' || (link.metadata?.kind === 'enrolment' && link.metadata?.tier)
    const tier = isWebsite ? String(link.metadata?.tier || '') : ''
    const slug = goSlug(code, link)

    const lineItems = await stripe('GET', `payment_links/${link.id}/line_items?limit=10`)
    const priceId = lineItems.data[0]?.price?.id
    if (!priceId) {
      console.warn('Skip, no price', link.id, link.url)
      continue
    }

    const extraCode = isWebsite ? null : RELATED_EXTRA[code] || RELATED_EXTRA[slug]
    let extraId = extraCode ? extraPriceId(products, prices, extraCode) : null
    if (extraId === priceId) extraId = null

    const afterUrl = isWebsite
      ? `https://sysbilt.com/go/website/wizard?tier=${tier}&paid=1&session_id={CHECKOUT_SESSION_ID}`
      : link.after_completion?.redirect?.url || `https://sysbilt.com/go/thanks?p=${slug}`

    const params = {
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      ...(isWebsite ? websiteTerms(tier) : CATALOGUE_TERMS),
      'after_completion[type]': 'redirect',
      'after_completion[redirect][url]': afterUrl,
      billing_address_collection: isWebsite ? 'required' : 'auto',
      customer_creation: 'always',
      'invoice_creation[enabled]': isWebsite ? 'false' : 'true',
      'tax_id_collection[enabled]': 'true',
      submit_type: isWebsite ? 'pay' : 'pay',
      'metadata[product]': code || slug,
      'metadata[abn]': SYSBILT_ABN,
    }
    if (link.metadata?.tier) params['metadata[tier]'] = link.metadata.tier
    if (link.metadata?.kind) params['metadata[kind]'] = link.metadata.kind
    if (link.metadata?.mode) params['metadata[mode]'] = link.metadata.mode
    if (isWebsite) {
      params['phone_number_collection[enabled]'] = 'true'
      params['payment_intent_data[setup_future_usage]'] = 'off_session'
      params['custom_text[submit][message]'] =
        'Today is to start the build. Monthly care starts the day your site goes live.'
      params['payment_intent_data[statement_descriptor]'] = 'SYSBILTWEB'
    }
    if (extraId) Object.assign(params, optionalItemParams(extraId, 0))

    if (DRY) {
      console.log('Would recreate', slug, link.url, extraCode || '-', extraId || '')
      created.push({old: link.url, slug})
      continue
    }

    let fresh
    try {
      fresh = await stripe('POST', 'payment_links', params)
    } catch (err) {
      if (!extraId) throw err
      params['optional_items[0][quantity]'] = '1'
      fresh = await stripe('POST', 'payment_links', params)
    }
    if (String(fresh.url || '').includes('test_')) {
      throw new Error(`Refusing test Payment Link for ${slug}`)
    }
    await stripe('POST', `payment_links/${link.id}`, {
      active: 'false',
      inactive_message: `This checkout is closed. The current page is sysbilt.com/go/${slug}.`,
    })
    const files = replaceInTree(link.url, fresh.url)
    created.push({
      slug,
      oldId: link.id,
      newId: fresh.id,
      oldUrl: link.url,
      newUrl: fresh.url,
      extra: extraCode || null,
      files,
    })
    console.log(slug, '→', fresh.url, extraCode ? `extra ${extraCode}` : 'no extra')
    await sleep(200)
  }

  const reportPath = resolve(__dirname, 'checkout-hygiene-live.json')
  const report = {
    createdAt: new Date().toISOString(),
    dryRun: DRY,
    note: 'New Payment Links with terms. Old URLs deactivated. Quote Capture URL kept.',
    publicDetails:
      'Set Terms https://sysbilt.com/terms and Privacy https://sysbilt.com/privacy in Dashboard → Settings → Public details.',
    created,
  }
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`)
  console.log('Wrote', reportPath)
  console.log(
    '\nDashboard (once): https://dashboard.stripe.com/settings/public\nTerms: https://sysbilt.com/terms\nPrivacy: https://sysbilt.com/privacy\n',
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
