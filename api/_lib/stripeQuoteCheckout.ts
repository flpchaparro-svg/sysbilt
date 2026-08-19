/** Stripe Checkout Session for a Quote Capture job total (AUD). */

function stripeSecret(): string {
  return (
    process.env.Stripe_Secret_key ||
    process.env.STRIPE_SECRET_KEY ||
    process.env.STRIPE_SECRET ||
    ''
  ).trim()
}

export function stripeConfigured(): boolean {
  return Boolean(stripeSecret())
}

export async function createQuoteCheckoutSession(input: {
  amountAud: number
  currency?: string
  customerEmail?: string
  businessName: string
  quoteNumber: string
  slug: string
  successUrl: string
  cancelUrl: string
  isProof?: boolean
  metadata?: Record<string, string>
}): Promise<{id: string; url: string}> {
  const sk = stripeSecret()
  if (!sk) throw new Error('Missing Stripe_Secret_key')
  if (input.isProof && !sk.startsWith('sk_test_')) {
    throw new Error('Proof checkout blocked: Stripe is not in test mode')
  }

  const amountCents = Math.round(input.amountAud * 100)
  if (!Number.isFinite(amountCents) || amountCents < 50) {
    throw new Error('Quote total too low for Checkout')
  }

  const productName = input.isProof
    ? `TEST only, do not use a real card, ${input.businessName} ${input.quoteNumber}`
    : `${input.businessName} · Quote ${input.quoteNumber}`
  const productDescription = input.isProof
    ? 'Stripe test checkout for a sample Quote Capture quotation. Not a live charge. Not Quote Capture product payment.'
    : `Payment for quotation ${input.quoteNumber}`

  const body = new URLSearchParams()
  body.set('mode', 'payment')
  body.set('success_url', input.successUrl)
  body.set('cancel_url', input.cancelUrl)
  body.set('line_items[0][quantity]', '1')
  body.set('line_items[0][price_data][currency]', (input.currency || 'aud').toLowerCase())
  body.set('line_items[0][price_data][unit_amount]', String(amountCents))
  body.set('line_items[0][price_data][product_data][name]', productName)
  body.set('line_items[0][price_data][product_data][description]', productDescription)
  if (input.customerEmail) body.set('customer_email', input.customerEmail)
  body.set('metadata[product]', 'quote-capture-job')
  body.set('metadata[slug]', input.slug)
  body.set('metadata[quote_number]', input.quoteNumber)
  if (input.isProof) body.set('metadata[proof]', '1')
  if (input.metadata) {
    for (const [k, v] of Object.entries(input.metadata)) {
      body.set(`metadata[${k}]`, v.slice(0, 500))
    }
  }

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sk}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  const data = (await res.json()) as {id?: string; url?: string; error?: {message?: string}}
  if (!res.ok || !data.id || !data.url) {
    throw new Error(data.error?.message || `Stripe Checkout failed (${res.status})`)
  }
  return {id: data.id, url: data.url}
}

const QC_PRODUCT_BASE_AUD = 2800
const QC_PRODUCT_CONCIERGE_AUD = 600
const QC_PRODUCT_ZOHO_AUD = 100

function productStripeSecret(): string {
  const live = (
    process.env.Stripe_Secret_key_live ||
    process.env.STRIPE_SECRET_KEY_LIVE ||
    ''
  ).trim()
  if (live.startsWith('sk_live_')) return live
  return stripeSecret()
}

function asBool(value: unknown): boolean {
  return value === true || value === 'true' || value === 1 || value === '1'
}

export type QuoteCaptureProductBuyResult =
  | {ok: true; url: string}
  | {ok: false; status: number; error: string}

export async function createQuoteCaptureProductCheckout(input: {
  concierge: boolean
  zohoSetup: boolean
  successUrl: string
  cancelUrl: string
}): Promise<{id: string; url: string}> {
  const sk = productStripeSecret()
  if (!sk) throw new Error('Missing Stripe_Secret_key')

  const body = new URLSearchParams()
  body.set('mode', 'payment')
  body.set('success_url', input.successUrl)
  body.set('cancel_url', input.cancelUrl)
  body.set('line_items[0][quantity]', '1')
  body.set('line_items[0][price_data][currency]', 'aud')
  body.set('line_items[0][price_data][unit_amount]', String(QC_PRODUCT_BASE_AUD * 100))
  body.set('line_items[0][price_data][product_data][name]', 'Quote Capture')
  body.set(
    'line_items[0][price_data][product_data][description]',
    'Guided quote wizard on your site: locked rate card, on-screen quotation, PDF, email and SMS with pay link, owner alert.',
  )

  let next = 1
  if (input.concierge) {
    body.set(`line_items[${next}][quantity]`, '1')
    body.set(`line_items[${next}][price_data][currency]`, 'aud')
    body.set(`line_items[${next}][price_data][unit_amount]`, String(QC_PRODUCT_CONCIERGE_AUD * 100))
    body.set(`line_items[${next}][price_data][product_data][name]`, 'AI Concierge')
    body.set(
      `line_items[${next}][price_data][product_data][description]`,
      'Chat path on the same locked Quote Capture prices.',
    )
    next += 1
  }
  if (input.zohoSetup) {
    body.set(`line_items[${next}][quantity]`, '1')
    body.set(`line_items[${next}][price_data][currency]`, 'aud')
    body.set(`line_items[${next}][price_data][unit_amount]`, String(QC_PRODUCT_ZOHO_AUD * 100))
    body.set(`line_items[${next}][price_data][product_data][name]`, 'Basic quote or invoice setup')
    body.set(
      `line_items[${next}][price_data][product_data][description]`,
      'Basic quote or invoice tool in your name, only if you have none.',
    )
  }

  body.set('metadata[product]', 'quote-capture')
  body.set('metadata[concierge]', input.concierge ? '1' : '0')
  body.set('metadata[zoho_setup]', input.zohoSetup ? '1' : '0')

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${sk}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  const data = (await res.json()) as {id?: string; url?: string; error?: {message?: string}}
  if (!res.ok || !data.id || !data.url) {
    throw new Error(data.error?.message || `Stripe Checkout failed (${res.status})`)
  }
  return {id: data.id, url: data.url}
}

export async function processQuoteCaptureProductBuy(
  body: Record<string, unknown>,
  publicBase: string,
): Promise<QuoteCaptureProductBuyResult> {
  if (!asBool(body.terms)) {
    return {ok: false, status: 400, error: 'Agree to the terms to continue'}
  }
  const base =
    process.env.VERCEL_ENV === 'production'
      ? 'https://sysbilt.com'
      : publicBase.replace(/\/$/, '')
  try {
    const session = await createQuoteCaptureProductCheckout({
      concierge: asBool(body.concierge),
      zohoSetup: asBool(body.zohoSetup),
      successUrl: `${base}/go/thanks?p=quote-capture`,
      cancelUrl: `${base}/go/quote-capture`,
    })
    return {ok: true, url: session.url}
  } catch (err) {
    return {
      ok: false,
      status: 502,
      error: err instanceof Error ? err.message : 'Could not start payment',
    }
  }
}
