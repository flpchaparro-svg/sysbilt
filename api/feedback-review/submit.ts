import type {VercelRequest, VercelResponse} from '@vercel/node'
import {processFeedbackReviewSubmit} from '../_lib/feedbackReviewSubmit.js'

function cors(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res)
  if (req.method === 'OPTIONS') {
    res.status(204).end()
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
  const result = await processFeedbackReviewSubmit(body)
  if (result.ok === false) {
    res.status(result.status).json({error: result.error})
    return
  }
  res.status(200).json(result)
}
