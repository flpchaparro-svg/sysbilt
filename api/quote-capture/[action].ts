import type {VercelRequest, VercelResponse} from '@vercel/node'
import {processQuoteCaptureConcierge} from '../_lib/quoteCaptureConcierge.js'
import {processQuoteCaptureSubmit} from '../_lib/quoteCaptureSubmit.js'

function cors(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function publicBase(req: VercelRequest): string {
  const env = process.env.PUBLIC_BASE_URL?.trim() || process.env.VERCEL_URL?.trim()
  if (env) {
    if (env.startsWith('http')) return env.replace(/\/$/, '')
    return `https://${env.replace(/\/$/, '')}`
  }
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const proto = (req.headers['x-forwarded-proto'] as string) || 'https'
  return `${proto}://${host}`
}

function actionName(req: VercelRequest): string {
  const raw = req.query.action
  const value = Array.isArray(raw) ? raw[0] : raw
  return typeof value === 'string' ? value : ''
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res)
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  const action = actionName(req)
  if (action !== 'submit' && action !== 'concierge') {
    res.status(404).json({error: 'Not found'})
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({error: 'Method not allowed'})
    return
  }

  const body = (typeof req.body === 'object' && req.body ? req.body : {}) as Record<
    string,
    unknown
  >

  if (action === 'concierge') {
    const result = await processQuoteCaptureConcierge(body)
    if (result.ok === false) {
      res.status(result.status).json({error: result.error})
      return
    }
    res.status(200).json({reply: result.reply, suggestions: result.suggestions})
    return
  }

  const result = await processQuoteCaptureSubmit(body, publicBase(req))
  if (result.ok === false) {
    res.status(result.status).json({error: result.error})
    return
  }
  res.status(200).json(result)
}
