import type { VercelRequest, VercelResponse } from '@vercel/node'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

function loadEnvLocalIfMissing(): void {
  try {
    const path = join(process.cwd(), '.env.local')
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
      if (!key) continue
      if (process.env[key] === undefined || process.env[key] === '') {
        process.env[key] = value
      }
    }
  } catch {
    /* ignore */
  }
}

loadEnvLocalIfMissing()

function stripeSecret(): string | undefined {
  return (
    process.env.Stripe_Secret_key ||
    process.env.STRIPE_SECRET_KEY ||
    process.env.STRIPE_SECRET
  )
}

/**
 * Prefill Hosted Website Plan agreement from a completed Checkout Session.
 * GET /api/funnel/website-session?session_id=cs_test_…
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const raw = req.query.session_id
  const sessionId = Array.isArray(raw) ? raw[0] : raw
  if (!sessionId || typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
    res.status(400).json({ error: 'Missing or invalid session_id' })
    return
  }

  const secret = stripeSecret()
  if (!secret) {
    res.status(500).json({ error: 'Stripe is not configured' })
    return
  }

  try {
    const url = new URL(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`)
    url.searchParams.set('expand[]', 'customer')
    url.searchParams.set('expand[]', 'customer_details')
    const stripeRes = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${secret}` },
    })
    const session = (await stripeRes.json()) as {
      error?: { message?: string }
      id?: string
      payment_status?: string
      status?: string
      customer_details?: {
        name?: string | null
        email?: string | null
        phone?: string | null
        address?: { line1?: string | null; city?: string | null; state?: string | null; postal_code?: string | null; country?: string | null } | null
        tax_ids?: Array<{ type?: string; value?: string }> | null
      } | null
      customer?:
        | string
        | {
            name?: string | null
            email?: string | null
            phone?: string | null
            metadata?: Record<string, string>
          }
        | null
      customer_email?: string | null
      metadata?: Record<string, string>
      amount_total?: number | null
    }

    if (!stripeRes.ok) {
      res.status(stripeRes.status).json({
        error: session.error?.message || 'Could not load checkout session',
      })
      return
    }

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      res.status(402).json({ error: 'Payment is not complete yet' })
      return
    }

    const details = session.customer_details
    const customerObj =
      session.customer && typeof session.customer === 'object' ? session.customer : null
    const taxId =
      details?.tax_ids?.find((t) => t.value)?.value ||
      details?.tax_ids?.[0]?.value ||
      null

    const addressParts = [
      details?.address?.line1,
      details?.address?.city,
      details?.address?.state,
      details?.address?.postal_code,
    ].filter(Boolean)

    res.setHeader('Cache-Control', 'no-store')
    res.status(200).json({
      sessionId: session.id,
      email: details?.email || customerObj?.email || session.customer_email || '',
      name: details?.name || customerObj?.name || '',
      phone: details?.phone || customerObj?.phone || '',
      business: customerObj?.metadata?.business || details?.name || '',
      abn: taxId,
      address: addressParts.join(', '),
      tier: session.metadata?.tier || null,
      amountAud:
        typeof session.amount_total === 'number'
          ? Math.round(session.amount_total / 100)
          : null,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error'
    console.error('website-session failed', err)
    res.status(500).json({ error: message })
  }
}
