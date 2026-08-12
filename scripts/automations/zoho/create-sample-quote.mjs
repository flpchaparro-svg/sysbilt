#!/usr/bin/env node
/**
 * Phase 4 proof: create one editable Quote in SYSBILT Zoho Invoice (AU)
 * from sample landscaping line items.
 *
 * NOT wired to /demo/quote-capture. Manual run only.
 *
 *   node scripts/automations/zoho/create-sample-quote.mjs
 *   node scripts/automations/zoho/create-sample-quote.mjs --dry-run
 *
 * Requires in .env.local:
 *   ZOHO_INVOICE_CLIENT_ID
 *   ZOHO_INVOICE_CLIENT_SECRET
 *   ZOHO_INVOICE_REFRESH_TOKEN
 *   ZOHO_INVOICE_ORG_ID
 */
import {
  loadEnvLocal,
  getZohoConfig,
  missingZohoEnv,
  refreshAccessToken,
  createQuoteForContact,
} from './zoho-invoice-au.mjs'

loadEnvLocal()

const dryRun = process.argv.includes('--dry-run')

/** Sample landscaping quote aligned with demo rate-card feel (labelled sample). */
const SAMPLE = {
  contact: {
    email: 'quote-capture-sample@sysbilt.com',
    companyName: 'Sample Landscaping Prospect',
    firstName: 'Sample',
    lastName: 'Prospect',
    phone: '',
  },
  referenceNumber: `QC-SAMPLE-${new Date().toISOString().slice(0, 10)}`,
  notes: [
    'SAMPLE Quote Capture proof only. Not a live client job.',
    'Landscaping sample rates for Phase 4 Zoho Invoice Quotes path.',
    'On a live install this quotation uses the client locked rate card, and a short site look confirms access, soil, and hidden work before work starts.',
  ].join('\n'),
  terms: 'Sample proof. Valid for testing only.',
  lineItems: [
    {
      name: 'New turf on bare ground (sample)',
      description: 'Prepared ground, turf supply and lay. Sample rate from demo card.',
      rate: 350,
      quantity: 1,
      unit: 'job',
    },
    {
      name: 'Turf supply and lay (sample)',
      description: 'Per square metre. Sample half-back yard ~60 m².',
      rate: 28,
      quantity: 60,
      unit: 'm2',
    },
    {
      name: 'Rip-out clearing (sample)',
      description: 'Lift dead lawn included on replace jobs. Sample flat fee.',
      rate: 480,
      quantity: 1,
      unit: 'job',
    },
  ],
}

const total = SAMPLE.lineItems.reduce((sum, li) => sum + li.rate * li.quantity, 0)

console.log('Quote Capture · Phase 4 Zoho Invoice proof')
console.log('------------------------------------------')
console.log(`Reference: ${SAMPLE.referenceNumber}`)
console.log(`Contact:   ${SAMPLE.contact.companyName} <${SAMPLE.contact.email}>`)
console.log(`Lines:     ${SAMPLE.lineItems.length}`)
console.log(`Subtotal:  $${total.toFixed(2)} AUD (ex tax; Zoho may apply tax)`)
console.log('')

if (dryRun) {
  console.log('--dry-run: payload only. No Zoho call.')
  console.log(JSON.stringify(SAMPLE, null, 2))
  process.exit(0)
}

const cfg = getZohoConfig()
const missing = missingZohoEnv(cfg)
if (missing.length) {
  console.error('Missing Zoho env in .env.local:')
  for (const key of missing) console.error(`  - ${key}`)
  console.error('')
  console.error('Setup:')
  console.error('  1. API Console (AU): https://api-console.zoho.com.au/')
  console.error('  2. Self Client → scopes (see scripts/automations/zoho/README.md)')
  console.error('  3. Exchange grant code:')
  console.error('       node scripts/automations/zoho/exchange-grant-code.mjs <CODE>')
  console.error('  4. Org ID: Zoho Invoice → Settings → Organisation')
  console.error('  5. Re-run this script (omit --dry-run).')
  process.exit(1)
}

try {
  const accessToken = await refreshAccessToken(cfg)
  const result = await createQuoteForContact(SAMPLE, accessToken, cfg)
  console.log('Created editable Quote in Zoho Invoice.')
  console.log(`  Quote number: ${result.estimate_number || '(auto)'}`)
  console.log(`  Estimate ID:  ${result.estimate_id}`)
  console.log(`  Contact ID:   ${result.contact_id} (${result.contactCreated ? 'created' : 'existing'})`)
  console.log(`  Open:         ${result.deepLink}`)
  console.log('')
  console.log('Open Quotes in invoice.zoho.com.au, edit a line, save. That is Phase 4 done.')
} catch (err) {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
}
