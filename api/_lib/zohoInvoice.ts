/**
 * Zoho Invoice (Australia) API helper for Quote Capture.
 * UI: Quotes. API: estimates.
 */

export const ACCOUNTS_BASE_DEFAULT = 'https://accounts.zoho.com.au'
export const API_BASE_DEFAULT = 'https://www.zohoapis.com.au/invoice/v3'
export const INVOICE_APP_BASE_DEFAULT = 'https://invoice.zoho.com.au'

export type ZohoConfig = {
  clientId: string
  clientSecret: string
  refreshToken: string
  orgId: string
  accountsBase: string
  apiBase: string
  appBase: string
}

export function getZohoConfig(): ZohoConfig {
  return {
    clientId: process.env.ZOHO_INVOICE_CLIENT_ID?.trim() || '',
    clientSecret: process.env.ZOHO_INVOICE_CLIENT_SECRET?.trim() || '',
    refreshToken: process.env.ZOHO_INVOICE_REFRESH_TOKEN?.trim() || '',
    orgId: process.env.ZOHO_INVOICE_ORG_ID?.trim() || '',
    accountsBase: process.env.ZOHO_ACCOUNTS_BASE?.trim() || ACCOUNTS_BASE_DEFAULT,
    apiBase: process.env.ZOHO_INVOICE_API_BASE?.trim() || API_BASE_DEFAULT,
    appBase: process.env.ZOHO_INVOICE_APP_BASE?.trim() || INVOICE_APP_BASE_DEFAULT,
  }
}

export function missingZohoEnv(cfg = getZohoConfig()): string[] {
  const missing: string[] = []
  if (!cfg.clientId) missing.push('ZOHO_INVOICE_CLIENT_ID')
  if (!cfg.clientSecret) missing.push('ZOHO_INVOICE_CLIENT_SECRET')
  if (!cfg.refreshToken) missing.push('ZOHO_INVOICE_REFRESH_TOKEN')
  if (!cfg.orgId) missing.push('ZOHO_INVOICE_ORG_ID')
  return missing
}

export function quoteDeepLink(estimateId: string, appBase = INVOICE_APP_BASE_DEFAULT): string {
  return `${appBase.replace(/\/$/, '')}/app#/quotes/${estimateId}`
}

export async function refreshAccessToken(cfg = getZohoConfig()): Promise<string> {
  const missing = missingZohoEnv(cfg)
  if (missing.length) throw new Error(`Missing Zoho env: ${missing.join(', ')}`)
  const url = new URL(`${cfg.accountsBase.replace(/\/$/, '')}/oauth/v2/token`)
  url.searchParams.set('refresh_token', cfg.refreshToken)
  url.searchParams.set('client_id', cfg.clientId)
  url.searchParams.set('client_secret', cfg.clientSecret)
  url.searchParams.set('grant_type', 'refresh_token')
  const res = await fetch(url, {method: 'POST'})
  const data = (await res.json().catch(() => ({}))) as {access_token?: string; error?: unknown}
  if (!res.ok || !data.access_token) {
    throw new Error(`Zoho token refresh failed: ${JSON.stringify(data.error || data, null, 2)}`)
  }
  return data.access_token
}

async function zohoRequest(
  path: string,
  opts: {method?: string; body?: object; accessToken: string; cfg?: ZohoConfig},
): Promise<any> {
  const cfg = opts.cfg || getZohoConfig()
  const method = opts.method || 'GET'
  const url = new URL(
    `${cfg.apiBase.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`,
  )
  url.searchParams.set('organization_id', cfg.orgId)
  const headers: Record<string, string> = {
    Authorization: `Zoho-oauthtoken ${opts.accessToken}`,
    'X-com-zoho-invoice-organizationid': cfg.orgId,
  }
  const init: RequestInit = {method, headers}
  if (opts.body !== undefined) {
    const form = new URLSearchParams()
    form.set('JSONString', JSON.stringify(opts.body))
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    init.body = form
  }
  const res = await fetch(url, init)
  const data = await res.json().catch(() => ({}))
  if (!res.ok || (typeof data.code === 'number' && data.code > 0)) {
    throw new Error(`Zoho ${method} ${path} failed (${res.status}): ${JSON.stringify(data, null, 2)}`)
  }
  return data
}

export async function ensureContact(
  input: {
    email: string
    companyName?: string
    firstName?: string
    lastName?: string
    phone?: string
  },
  accessToken: string,
  cfg = getZohoConfig(),
): Promise<{contact_id: string; created: boolean}> {
  const email = input.email.trim()
  let existing: {contact_id?: string} | null = null
  if (email) {
    try {
      const byEmail = await zohoRequest(
        `/contacts?email_contains=${encodeURIComponent(email)}`,
        {method: 'GET', accessToken, cfg},
      )
      const list = (byEmail.contacts || []) as Array<{contact_id?: string; email?: string}>
      existing =
        list.find((c) => (c.email || '').toLowerCase() === email.toLowerCase()) ||
        (list.length === 1 ? list[0] : null)
    } catch {
      /* create */
    }
  }
  if (existing?.contact_id) {
    return {contact_id: String(existing.contact_id), created: false}
  }
  const firstName = input.firstName || 'Customer'
  const lastName = input.lastName || ''
  const body = {
    contact_name: input.companyName || `${firstName} ${lastName}`.trim(),
    company_name: input.companyName || undefined,
    contact_type: 'customer',
    customer_sub_type: input.companyName ? 'business' : 'individual',
    billing_address: {country: 'Australia'},
    contact_persons: [
      {
        first_name: firstName,
        last_name: lastName || 'Contact',
        email: email || undefined,
        phone: input.phone || undefined,
        is_primary_contact: true,
      },
    ],
  }
  const created = await zohoRequest('/contacts', {method: 'POST', body, accessToken, cfg})
  const contact = created.contact
  if (!contact?.contact_id) {
    throw new Error(`Create contact returned no contact_id: ${JSON.stringify(created)}`)
  }
  return {contact_id: String(contact.contact_id), created: true}
}

export async function createEstimate(
  input: {
    customerId: string
    referenceNumber?: string
    notes?: string
    terms?: string
    lineItems: Array<{
      name: string
      description?: string
      rate: number
      quantity: number
      unit?: string
    }>
  },
  accessToken: string,
  cfg = getZohoConfig(),
): Promise<{estimate_id: string; estimate_number: string; deepLink: string}> {
  const body = {
    customer_id: input.customerId,
    reference_number: input.referenceNumber || undefined,
    notes: input.notes || undefined,
    terms: input.terms || undefined,
    is_inclusive_tax: true,
    line_items: input.lineItems.map((li, i) => ({
      name: li.name,
      description: li.description || '',
      rate: li.rate,
      quantity: li.quantity,
      unit: li.unit || '',
      item_order: i + 1,
    })),
  }
  const data = await zohoRequest('/estimates', {method: 'POST', body, accessToken, cfg})
  const estimate = data.estimate
  if (!estimate?.estimate_id) {
    throw new Error(`Create estimate returned no estimate_id: ${JSON.stringify(data)}`)
  }
  return {
    estimate_id: String(estimate.estimate_id),
    estimate_number: estimate.estimate_number || '',
    deepLink: quoteDeepLink(estimate.estimate_id, cfg.appBase),
  }
}

export async function createQuoteForContact(
  input: {
    contact: {
      email: string
      companyName?: string
      firstName?: string
      lastName?: string
      phone?: string
    }
    referenceNumber?: string
    notes?: string
    terms?: string
    lineItems: Array<{
      name: string
      description?: string
      rate: number
      quantity: number
      unit?: string
    }>
  },
  accessToken: string,
  cfg = getZohoConfig(),
) {
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
