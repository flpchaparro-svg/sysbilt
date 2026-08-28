import type {VercelRequest, VercelResponse} from '@vercel/node'
import {loadEntitledLesson} from '../learnLoad.js'
import type {LearnActivity} from '../learnSanity.js'
import {getServiceSupabase} from '../supabase.js'

function gradeActivity(
  activity: LearnActivity,
  answers: unknown,
): {score: number; passed: boolean} {
  if (activity.template === 'trueFalse') {
    const value = typeof answers === 'boolean' ? answers : (answers as {value?: boolean})?.value
    const correct = activity.trueFalseCorrect !== false
    const passed = value === correct
    return {score: passed ? 100 : 0, passed}
  }
  if (activity.template === 'multipleChoice') {
    const key = typeof answers === 'string' ? answers : (answers as {key?: string})?.key
    const correct = activity.options.find((o) => o.isCorrect)?.key
    const passed = Boolean(key && correct && key === correct)
    return {score: passed ? 100 : 0, passed}
  }
  const map =
    answers && typeof answers === 'object' && !Array.isArray(answers)
      ? (answers as Record<string, string>)
      : {}
  const total = activity.matchItems.length || 1
  let hits = 0
  activity.matchItems.forEach((item, i) => {
    const chosen = map[String(i)] ?? map[item.prompt]
    if (chosen && chosen === item.correctKey) hits += 1
  })
  const score = Math.round((hits / total) * 100)
  return {score, passed: hits === activity.matchItems.length}
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'})
  const loaded = await loadEntitledLesson(req, res)
  if (!loaded) return
  const {user, course, lesson} = loaded
  const body = (req.body || {}) as {
    action?: 'attempt' | 'complete'
    activityKey?: string
    answers?: unknown
  }

  try {
    const supabase = getServiceSupabase()

    if (body.action === 'attempt') {
      const activity = lesson.activities.find((a) => a._key === body.activityKey)
      if (!activity) return res.status(400).json({error: 'Unknown activity'})
      const result = gradeActivity(activity, body.answers)
      await supabase.from('learn_attempts').insert({
        user_id: user.id,
        activity_id: activity._key,
        lesson_id: lesson._id,
        score: result.score,
        passed: result.passed,
        answers: body.answers ?? null,
      })
      const required = lesson.activities
      let allPassed = required.length > 0
      if (required.length) {
        const {data: attempts} = await supabase
          .from('learn_attempts')
          .select('activity_id, passed')
          .eq('user_id', user.id)
          .eq('lesson_id', lesson._id)
        const passedKeys = new Set(
          (attempts || []).filter((row) => row.passed).map((row) => row.activity_id),
        )
        allPassed = required.every((a) => passedKeys.has(a._key))
      }
      if (allPassed) {
        await supabase.from('learn_progress').upsert(
          {
            user_id: user.id,
            lesson_id: lesson._id,
            course_id: course._id,
            completed_at: new Date().toISOString(),
            last_seen_at: new Date().toISOString(),
          },
          {onConflict: 'user_id,lesson_id'},
        )
      }
      return res.status(200).json({
        score: result.score,
        passed: result.passed,
        explainAfter: activity.explainAfter,
        lessonComplete: allPassed,
      })
    }

    if (body.action === 'complete') {
      if (lesson.activities.length > 0) {
        return res.status(400).json({error: 'Complete the activities first'})
      }
      await supabase.from('learn_progress').upsert(
        {
          user_id: user.id,
          lesson_id: lesson._id,
          course_id: course._id,
          completed_at: new Date().toISOString(),
          last_seen_at: new Date().toISOString(),
        },
        {onConflict: 'user_id,lesson_id'},
      )
      return res.status(200).json({lessonComplete: true})
    }

    return res.status(400).json({error: 'Unknown action'})
  } catch (err) {
    console.error('[learn/progress]', err)
    return res.status(500).json({error: 'Could not save progress'})
  }
}
