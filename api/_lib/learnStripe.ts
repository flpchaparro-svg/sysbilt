import './auth.js'

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

export function publicBaseUrl(): string {
  return (process.env.PUBLIC_BASE_URL || 'https://sysbilt.com').replace(/\/$/, '')
}

export async function createLearnCheckoutSession(input: {
  courseId: string
  courseTitle: string
  userId: string
  email: string
  successPath: string
  cancelPath: string
  priceAud?: number | null
  stripePriceId?: string | null
}): Promise<{id: string; url: string}> {
  const sk = stripeSecret()
  if (!sk) throw new Error('Missing Stripe secret')

  const body = new URLSearchParams()
  body.set('mode', 'payment')
  body.set('success_url', `${publicBaseUrl()}${input.successPath}?session_id={CHECKOUT_SESSION_ID}`)
  body.set('cancel_url', `${publicBaseUrl()}${input.cancelPath}`)
  body.set('customer_email', input.email)
  body.set('client_reference_id', input.userId)
  body.set('metadata[product]', 'learn-course')
  body.set('metadata[courseId]', input.courseId)
  body.set('metadata[userId]', input.userId)
  body.set('line_items[0][quantity]', '1')

  if (input.stripePriceId) {
    body.set('line_items[0][price]', input.stripePriceId)
  } else {
    const amountCents = Math.round((input.priceAud || 0) * 100)
    if (!Number.isFinite(amountCents) || amountCents < 50) {
      throw new Error('Set a premium price of at least $0.50 AUD, or grant access by email')
    }
    body.set('line_items[0][price_data][currency]', 'aud')
    body.set('line_items[0][price_data][unit_amount]', String(amountCents))
    body.set('line_items[0][price_data][product_data][name]', `Learn: ${input.courseTitle}`)
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

export async function retrieveCheckoutSession(sessionId: string): Promise<{
  paid: boolean
  courseId: string | null
  userId: string | null
}> {
  const sk = stripeSecret()
  if (!sk) throw new Error('Missing Stripe secret')
  const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
    headers: {Authorization: `Bearer ${sk}`},
  })
  const data = (await res.json()) as {
    payment_status?: string
    metadata?: Record<string, string>
    error?: {message?: string}
  }
  if (!res.ok) throw new Error(data.error?.message || 'Could not load Stripe session')
  return {
    paid: data.payment_status === 'paid',
    courseId: data.metadata?.courseId || null,
    userId: data.metadata?.userId || null,
  }
}
