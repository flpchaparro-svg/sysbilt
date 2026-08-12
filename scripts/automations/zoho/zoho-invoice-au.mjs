/**
 * Zoho Invoice (Australia) API helper.
 * UI label: Quotes. API resource: estimates.
 *
 * Env (never commit):
 *   ZOHO_INVOICE_CLIENT_ID
 *   ZOHO_INVOICE_CLIENT_SECRET
 *   ZOHO_INVOICE_REFRESH_TOKEN
 *   ZOHO_INVOICE_ORG_ID
 *
 * Optional:
 *   ZOHO_ACCOUNTS_BASE  (default https://accounts.zoho.com.au)
 *   ZOHO_INVOICE_API_BASE (default https://www.zohoapis.com.au/invoice/v3)
 */

import {readFileSync, existsSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '../../..')

export const ACCOUNTS_BASE_DEFAULT = 'https://accounts.zoho.com.au'
export const API_BASE_DEFAULT = 'https://www.zohoapis.com.au/invoice/v3'
export const INVOICE_APP_BASE_DEFAULT = 'https://invoice.zoho.com.au'

/** Scopes needed for Phase 4 proof (contact + quote create). */
export const REQUIRED_SCOPES = [
  'ZohoInvoice.contacts.CREATE',
  'ZohoInvoice.contacts.READ',
  'ZohoInvoice.estimates.CREATE',
  'ZohoInvoice.estimates.READ',
].join(',')

export function loadEnvLocal() {
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

export function getZohoConfig() {
  const clientId = process.env.ZOHO_INVOICE_CLIENT_ID?.trim() || ''
  const clientSecret = process.env.ZOHO_INVOICE_CLIENT_SECRET?.trim() || ''
  const refreshToken = process.env.ZOHO_INVOICE_REFRESH_TOKEN?.trim() || ''
  const orgId = process.env.ZOHO_INVOICE_ORG_ID?.trim() || ''
  const accountsBase =
    process.env.ZOHO_ACCOUNTS_BASE?.trim() || ACCOUNTS_BASE_DEFAULT
  const apiBase = process.env.ZOHO_INVOICE_API_BASE?.trim() || API_BASE_DEFAULT
  const appBase =
    process.env.ZOHO_INVOICE_APP_BASE?.trim() || INVOICE_APP_BASE_DEFAULT
  return {
    clientId,
    clientSecret,
    refreshToken,
    orgId,
    accountsBase,
    apiBase,
    appBase,
  }
}

export function missingZohoEnv(cfg = getZohoConfig()) {
  const missing = []
  if (!cfg.clientId) missing.push('ZOHO_INVOICE_CLIENT_ID')
  if (!cfg.clientSecret) missing.push('ZOHO_INVOICE_CLIENT_SECRET')
  if (!cfg.refreshToken) missing.push('ZOHO_INVOICE_REFRESH_TOKEN')
  if (!cfg.orgId) missing.push('ZOHO_INVOICE_ORG_ID')
  return missing
}

export function quoteDeepLink(estimateId, appBase = INVOICE_APP_BASE_DEFAULT) {
  return `${appBase.replace(/\/$/, '')}/app#/quotes/${estimateId}`
}

/**
 * @param {ReturnType<typeof getZohoConfig>} cfg
 * @returns {Promise<string>} access token
 */
export async function refreshAccessToken(cfg = getZohoConfig()) {
  const missing = missingZohoEnv(cfg)
  if (missing.length) {
    throw new Error(`Missing Zoho env: ${missing.join(', ')}`)
  }
  const url = new URL(`${cfg.accountsBase.replace(/\/$/, '')}/oauth/v2/token`)
  url.searchParams.set('refresh_token', cfg.refreshToken)
  url.searchParams.set('client_id', cfg.clientId)
  url.searchParams.set('client_secret', cfg.clientSecret)
  url.searchParams.set('grant_type', 'refresh_token')

  const res = await fetch(url, {method: 'POST'})
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.access_token) {
    throw new Error(
      `Zoho token refresh failed: ${JSON.stringify(data.error || data, null, 2)}`,
    )
  }
  return data.access_token
}

/**
 * Exchange a one-time Self Client grant code for access + refresh tokens.
 * @param {{code: string, redirectUri?: string}} opts
 */
export async function exchangeGrantCode(opts, cfg = getZohoConfig()) {
  const {code, redirectUri = 'https://www.zoho.com/invoice'} = opts
  if (!cfg.clientId || !cfg.clientSecret) {
    throw new Error('Need ZOHO_INVOICE_CLIENT_ID and ZOHO_INVOICE_CLIENT_SECRET')
  }
  if (!code) throw new Error('Need grant code')

  const url = new URL(`${cfg.accountsBase.replace(/\/$/, '')}/oauth/v2/token`)
  url.searchParams.set('code', code)
  url.searchParams.set('client_id', cfg.clientId)
  url.searchParams.set('client_secret', cfg.clientSecret)
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('grant_type', 'authorization_code')

  const res = await fetch(url, {method: 'POST'})
  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.refresh_token) {
    throw new Error(
      `Zoho grant exchange failed: ${JSON.stringify(data.error || data, null, 2)}`,
    )
  }
  return data
}

/**
 * @param {string} path e.g. '/contacts'
 * @param {{method?: string, body?: object, accessToken: string, cfg?: ReturnType<typeof getZohoConfig>}} opts
 */
export async function zohoRequest(path, opts) {
  const cfg = opts.cfg || getZohoConfig()
  const method = opts.method || 'GET'
  const url = new URL(
    `${cfg.apiBase.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`,
  )
  url.searchParams.set('organization_id', cfg.orgId)

  const headers = {
    Authorization: `Zoho-oauthtoken ${opts.accessToken}`,
    'X-com-zoho-invoice-organizationid': cfg.orgId,
  }

  /** @type {RequestInit} */
  const init = {method, headers}

  if (opts.body !== undefined) {
    // Zoho Invoice accepts JSONString form field (legacy) or JSON body.
    // Prefer form JSONString — widely documented and reliable on AU.
    const form = new URLSearchParams()
    form.set('JSONString', JSON.stringify(opts.body))
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    init.body = form
  }

  const res = await fetch(url, init)
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.code > 0) {
    throw new Error(
      `Zoho ${method} ${path} failed (${res.status}): ${JSON.stringify(data, null, 2)}`,
    )
  }
  return data
}

/**
 * Find contact by email, or create a person/company contact.
 * @returns {Promise<{contact_id: string, contact: object, created: boolean}>}
 */
export async function ensureContact(
  {
    email,
    companyName,
    firstName = 'Sample',
    lastName = 'Customer',
    phone = '',
  },
  accessToken,
  cfg = getZohoConfig(),
) {
  let existing = null
  if (email) {
    try {
      const byEmail = await zohoRequest(
        `/contacts?email_contains=${encodeURIComponent(email)}`,
        {method: 'GET', accessToken, cfg},
      )
      const list = byEmail.contacts || []
      existing = list.find(
        (c) => (c.email || '').toLowerCase() === email.toLowerCase(),
      )
      if (!existing && list.length === 1) existing = list[0]
    } catch {
      // fall through to create
    }
  }

  if (existing?.contact_id) {
    return {contact_id: String(existing.contact_id), contact: existing, created: false}
  }

  const body = {
    contact_name: companyName || `${firstName} ${lastName}`.trim(),
    company_name: companyName || undefined,
    contact_type: 'customer',
    customer_sub_type: companyName ? 'business' : 'individual',
    billing_address: {
      country: 'Australia',
    },
    contact_persons: [
      {
        first_name: firstName,
        last_name: lastName,
        email: email || undefined,
        phone: phone || undefined,
        is_primary_contact: true,
      },
    ],
  }

  const created = await zohoRequest('/contacts', {
    method: 'POST',
    body,
    accessToken,
    cfg,
  })
  const contact = created.contact
  if (!contact?.contact_id) {
    throw new Error(`Create contact returned no contact_id: ${JSON.stringify(created)}`)
  }
  return {contact_id: String(contact.contact_id), contact, created: true}
}

/**
 * Create an estimate (Quote in the Zoho Invoice UI).
 * @param {{
 *   customerId: string,
 *   referenceNumber?: string,
 *   notes?: string,
 *   terms?: string,
 *   lineItems: Array<{name: string, description?: string, rate: number, quantity: number, unit?: string}>,
 * }} input
 */
export async function createEstimate(input, accessToken, cfg = getZohoConfig()) {
  const body = {
    customer_id: input.customerId,
    reference_number: input.referenceNumber || undefined,
    notes: input.notes || undefined,
    terms: input.terms || undefined,
    is_inclusive_tax: false,
    line_items: input.lineItems.map((li, i) => ({
      name: li.name,
      description: li.description || '',
      rate: li.rate,
      quantity: li.quantity,
      unit: li.unit || '',
      item_order: i + 1,
    })),
  }

  const data = await zohoRequest('/estimates', {
    method: 'POST',
    body,
    accessToken,
    cfg,
  })
  const estimate = data.estimate
  if (!estimate?.estimate_id) {
    throw new Error(`Create estimate returned no estimate_id: ${JSON.stringify(data)}`)
  }
  return {
    estimate,
    estimate_id: String(estimate.estimate_id),
    estimate_number: estimate.estimate_number || '',
    deepLink: quoteDeepLink(estimate.estimate_id, cfg.appBase),
  }
}

/**
 * Full helper: ensure contact + create quote.
 */
export async function createQuoteForContact(input, accessToken, cfg = getZohoConfig()) {
  const {contact_id, created} = await ensureContact(input.contact, accessToken, cfg)
  const quote = await createEstimate(
    {
      customerId: contact_id,
      referenceNumber: input.referenceNumber,
      notes: input.notes,
      terms: input.terms,
      lineItems: input.lineItems,
    },
    accessToken,
    cfg,
  )
  return {...quote, contact_id, contactCreated: created}
}
