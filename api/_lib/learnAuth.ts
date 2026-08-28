import type {VercelRequest, VercelResponse} from '@vercel/node'
import {getServiceSupabase, supabaseConfigured} from './supabase.js'

export type LearnUser = {
  id: string
  email: string
  displayName: string
}

function bearerToken(req: VercelRequest): string | null {
  const header = req.headers.authorization
  if (typeof header === 'string' && header.toLowerCase().startsWith('bearer ')) {
    const token = header.slice(7).trim()
    return token || null
  }
  return null
}

export async function requireLearnUser(
  req: VercelRequest,
  res: VercelResponse,
): Promise<LearnUser | null> {
  if (!supabaseConfigured()) {
    res.status(503).json({error: 'Learn is not configured yet'})
    return null
  }
  const token = bearerToken(req)
  if (!token) {
    res.status(401).json({error: 'Sign in required'})
    return null
  }
  const supabase = getServiceSupabase()
  const {data, error} = await supabase.auth.getUser(token)
  if (error || !data.user) {
    res.status(401).json({error: 'Sign in required'})
    return null
  }
  const email = (data.user.email || '').trim().toLowerCase()
  if (!email) {
    res.status(401).json({error: 'This account has no email'})
    return null
  }
  const displayName =
    (typeof data.user.user_metadata?.full_name === 'string' && data.user.user_metadata.full_name) ||
    (typeof data.user.user_metadata?.name === 'string' && data.user.user_metadata.name) ||
    ''
  await supabase.from('learn_profiles').upsert(
    {
      id: data.user.id,
      email,
      display_name: displayName,
    },
    {onConflict: 'id', ignoreDuplicates: false},
  )
  return {id: data.user.id, email, displayName}
}
