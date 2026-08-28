import type {VercelRequest, VercelResponse} from '@vercel/node'
import catalogue from '../_lib/handlers/learnCatalogue.js'
import course from '../_lib/handlers/learnCourse.js'
import lesson from '../_lib/handlers/learnLesson.js'
import progress from '../_lib/handlers/learnProgress.js'
import comments from '../_lib/handlers/learnComments.js'
import checkout from '../_lib/handlers/learnCheckout.js'
import stripeWebhook from '../_lib/handlers/learnStripeWebhook.js'

function actionName(req: VercelRequest): string {
  const raw = req.query.action
  const value = Array.isArray(raw) ? raw[0] : raw
  return typeof value === 'string' ? value : ''
}

const handlers: Record<string, (req: VercelRequest, res: VercelResponse) => unknown> = {
  catalogue,
  course,
  lesson,
  progress,
  comments,
  checkout,
  'stripe-webhook': stripeWebhook,
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const action = actionName(req)
  const next = handlers[action]
  if (!next) {
    res.status(404).json({error: 'Not found'})
    return
  }
  return next(req, res)
}
