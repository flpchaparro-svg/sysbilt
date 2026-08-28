import type {VercelRequest, VercelResponse} from '@vercel/node'
import crypto from 'node:crypto'
import {upsertEntitlement} from '../learnAccess.js'
import {retrieveCheckoutSession} from '../learnStripe.js'
import '../auth.js'

function webhookSecret(): string {
  return (process.env.STRIPE_WEBHOOK_SECRET || process.env.LEARN_STRIPE_WEBHOOK_SECRET || '').trim()
}

function verifyStripeSignature(rawBody: string, header: string, secret: string): boolean {
  const parts = header.split(',').map((p) => p.trim())
  const timestamp = parts.find((p) => p.startsWith('t='))?.slice(2)
  const signatures = parts.filter((p) => p.startsWith('v1=')).map((p) => p.slice(3))
  if (!timestamp || signatures.length === 0) return false
  const age = Math.abs(Date.now() / 1000 - Number(timestamp))
  if (!Number.isFinite(Number(timestamp)) || age > 60 * 5) return false
  const expected = crypto.createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex')
  return signatures.some((sig) => {
    try {
      return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
    } catch {
      return false
    }
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'})
  const secret = webhookSecret()
  const sig = req.headers['stripe-signature']
  const raw =
    typeof req.body === 'string'
      ? req.body
      : Buffer.isBuffer(req.body)
        ? req.body.toString('utf8')
        : JSON.stringify(req.body || {})

  if (secret) {
    if (typeof sig !== 'string' || !verifyStripeSignature(raw, sig, secret)) {
      return res.status(400).json({error: 'Invalid Stripe signature'})
    }
  }

  let event: {type?: string; data?: {object?: Record<string, unknown>}}
  try {
    event = typeof req.body === 'object' && req.body ? (req.body as typeof event) : JSON.parse(raw)
  } catch {
    return res.status(400).json({error: 'Invalid payload'})
  }

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({received: true})
  }

  const obj = event.data?.object || {}
  const metadata = (obj.metadata || {}) as Record<string, string>
  let courseId = metadata.courseId || null
  let userId = metadata.userId || null
  const sessionId = typeof obj.id === 'string' ? obj.id : ''

  if ((!courseId || !userId) && sessionId) {
    try {
      const session = await retrieveCheckoutSession(sessionId)
      if (session.paid) {
        courseId = courseId || session.courseId
        userId = userId || session.userId
      }
    } catch (err) {
      console.warn('[learn/stripe-webhook] session retrieve failed', err)
    }
  }

  if (metadata.product && metadata.product !== 'learn-course') {
    return res.status(200).json({received: true})
  }
  if (!courseId || !userId) {
    return res.status(200).json({received: true, skipped: true})
  }

  try {
    await upsertEntitlement(userId, courseId, 'stripe')
    return res.status(200).json({ok: true})
  } catch (err) {
    console.error('[learn/stripe-webhook]', err)
    return res.status(500).json({error: 'Could not grant access'})
  }
}
