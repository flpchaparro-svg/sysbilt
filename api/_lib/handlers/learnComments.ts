import type {VercelRequest, VercelResponse} from '@vercel/node'
import {loadEntitledLesson} from '../learnLoad.js'
import {getServiceSupabase} from '../supabase.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const loaded = await loadEntitledLesson(req, res)
  if (!loaded) return
  const {user, course, lesson} = loaded
  if (!course.commentsEnabled) {
    if (req.method === 'GET') return res.status(200).json({enabled: false, comments: []})
    return res.status(403).json({error: 'Comments are off for this course'})
  }

  const supabase = getServiceSupabase()

  if (req.method === 'GET') {
    const {data, error} = await supabase
      .from('learn_comments')
      .select('id, body, created_at, user_id')
      .eq('lesson_id', lesson._id)
      .order('created_at', {ascending: true})
      .limit(200)
    if (error) return res.status(500).json({error: 'Could not load comments'})
    const userIds = [...new Set((data || []).map((row) => row.user_id))]
    const {data: profiles} = userIds.length
      ? await supabase.from('learn_profiles').select('id, display_name, email').in('id', userIds)
      : {data: []}
    const byId = new Map((profiles || []).map((p) => [p.id, p]))
    return res.status(200).json({
      enabled: true,
      comments: (data || []).map((row) => {
        const profile = byId.get(row.user_id)
        const name = profile?.display_name || profile?.email?.split('@')[0] || 'Member'
        return {
          id: row.id,
          body: row.body,
          createdAt: row.created_at,
          author: name,
          mine: row.user_id === user.id,
        }
      }),
    })
  }

  if (req.method === 'POST') {
    const text = typeof req.body?.body === 'string' ? req.body.body.trim() : ''
    if (text.length < 2) return res.status(400).json({error: 'Write a short question or comment'})
    if (text.length > 4000) return res.status(400).json({error: 'Comment is too long'})
    const {data, error} = await supabase
      .from('learn_comments')
      .insert({user_id: user.id, lesson_id: lesson._id, body: text})
      .select('id, body, created_at')
      .single()
    if (error || !data) return res.status(500).json({error: 'Could not save comment'})
    return res.status(200).json({
      comment: {
        id: data.id,
        body: data.body,
        createdAt: data.created_at,
        author: user.displayName || user.email.split('@')[0],
        mine: true,
      },
    })
  }

  return res.status(405).json({error: 'Method not allowed'})
}
