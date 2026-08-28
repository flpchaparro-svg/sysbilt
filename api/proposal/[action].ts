import type {VercelRequest, VercelResponse} from '@vercel/node'
import getHandler from '../_lib/handlers/proposalGet.js'
import acceptHandler from '../_lib/handlers/proposalAccept.js'
import signHandler from '../_lib/handlers/proposalSign.js'

function actionName(req: VercelRequest): string {
  const raw = req.query.action
  const value = Array.isArray(raw) ? raw[0] : raw
  return typeof value === 'string' ? value : ''
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const action = actionName(req)
  if (action === 'get') return getHandler(req, res)
  if (action === 'accept') return acceptHandler(req, res)
  if (action === 'sign') return signHandler(req, res)
  res.status(404).json({error: 'Not found'})
}
