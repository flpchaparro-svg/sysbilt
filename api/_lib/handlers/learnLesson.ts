import type {VercelRequest, VercelResponse} from '@vercel/node'
import {loadEntitledLesson, lessonPublicFields} from '../learnLoad.js'
import {getServiceSupabase} from '../supabase.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({error: 'Method not allowed'})
  const loaded = await loadEntitledLesson(req, res)
  if (!loaded) return
  const {user, course, lesson, lessons} = loaded

  const supabase = getServiceSupabase()
  const {data: entitlementRow} = await supabase
    .from('learn_entitlements')
    .select('created_at')
    .eq('user_id', user.id)
    .eq('course_id', course._id)
    .maybeSingle()
  const entitledAt = entitlementRow?.created_at
    ? new Date(entitlementRow.created_at as string).getTime()
    : Date.now()
  const days = lesson.unlockAfterDays || 0
  if (Date.now() < entitledAt + days * 24 * 60 * 60 * 1000) {
    return res.status(403).json({error: 'This lesson is not unlocked yet'})
  }

  await supabase.from('learn_progress').upsert(
    {
      user_id: user.id,
      lesson_id: lesson._id,
      course_id: course._id,
      last_seen_at: new Date().toISOString(),
    },
    {onConflict: 'user_id,lesson_id'},
  )

  const {data: progress} = await supabase
    .from('learn_progress')
    .select('completed_at')
    .eq('user_id', user.id)
    .eq('lesson_id', lesson._id)
    .maybeSingle()

  const {data: attempts} = await supabase
    .from('learn_attempts')
    .select('activity_id, score, passed, answers, created_at')
    .eq('user_id', user.id)
    .eq('lesson_id', lesson._id)
    .order('created_at', {ascending: false})

  const latestByActivity = new Map<string, {score: number | null; passed: boolean; answers: unknown}>()
  for (const row of attempts || []) {
    if (!latestByActivity.has(row.activity_id)) {
      latestByActivity.set(row.activity_id, {
        score: row.score == null ? null : Number(row.score),
        passed: Boolean(row.passed),
        answers: row.answers,
      })
    }
  }

  const idx = lessons.findIndex((l) => l._id === lesson._id)
  const prev = idx > 0 ? lessons[idx - 1] : null
  const next = idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : null

  return res.status(200).json({
    course: {
      id: course._id,
      title: course.title,
      slug: course.slug,
      commentsEnabled: course.commentsEnabled,
    },
    lesson: lessonPublicFields(lesson),
    completed: Boolean(progress?.completed_at),
    attempts: Object.fromEntries(latestByActivity),
    prev: prev ? {slug: prev.slug, title: prev.title} : null,
    next: next ? {slug: next.slug, title: next.title} : null,
  })
}
