import type {VercelRequest, VercelResponse} from '@vercel/node'
import {requireLearnUser} from '../learnAuth.js'
import {fetchLearnCourseBySlug, fetchLessonsForCourse} from '../learnSanity.js'
import {loadEntitlementMap, syncCourseEntitlements, upsertEntitlement, visibilityForCourse} from '../learnAccess.js'
import {getServiceSupabase} from '../supabase.js'
import {retrieveCheckoutSession} from '../learnStripe.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({error: 'Method not allowed'})
  const user = await requireLearnUser(req, res)
  if (!user) return

  const slug = typeof req.query.slug === 'string' ? req.query.slug : ''
  if (!slug) return res.status(400).json({error: 'slug required'})

  try {
    const course = await fetchLearnCourseBySlug(slug)
    if (!course) return res.status(404).json({error: 'Course not found'})

    const sessionId = typeof req.query.session_id === 'string' ? req.query.session_id : ''
    if (sessionId) {
      try {
        const session = await retrieveCheckoutSession(sessionId)
        if (session.paid && session.courseId === course._id && session.userId === user.id) {
          await upsertEntitlement(user.id, course._id, 'stripe')
        }
      } catch (err) {
        console.warn('[learn/course] checkout session', err)
      }
    }

    const entitlements = await syncCourseEntitlements(
      user,
      [course],
      await loadEntitlementMap(user.id),
    )
    const source = entitlements.get(course._id) || null
    const vis = visibilityForCourse(course, Boolean(source), source)
    if (!vis.listed) return res.status(404).json({error: 'Course not found'})

    const lessons = vis.entitled ? await fetchLessonsForCourse(course._id) : []
    const supabase = getServiceSupabase()
    const {data: progressRows} = vis.entitled
      ? await supabase
          .from('learn_progress')
          .select('lesson_id, completed_at, last_seen_at')
          .eq('user_id', user.id)
          .eq('course_id', course._id)
      : {data: []}

    const progressByLesson = new Map(
      (progressRows || []).map((row) => [
        row.lesson_id,
        {completed: Boolean(row.completed_at), lastSeenAt: row.last_seen_at as string},
      ]),
    )

    const {data: entitlementRow} = vis.entitled
      ? await supabase
          .from('learn_entitlements')
          .select('created_at')
          .eq('user_id', user.id)
          .eq('course_id', course._id)
          .maybeSingle()
      : {data: null}

    const entitledAt = entitlementRow?.created_at
      ? new Date(entitlementRow.created_at as string).getTime()
      : Date.now()
    const now = Date.now()

    const lessonPayload = lessons.map((lesson) => {
      const days = lesson.unlockAfterDays || 0
      const unlockAt = entitledAt + days * 24 * 60 * 60 * 1000
      const unlocked = now >= unlockAt
      const progress = progressByLesson.get(lesson._id)
      return {
        id: lesson._id,
        title: lesson.title,
        slug: lesson.slug,
        order: lesson.order,
        unlocked,
        unlockAfterDays: days,
        completed: Boolean(progress?.completed),
      }
    })

    return res.status(200).json({
      course: {
        id: course._id,
        title: course.title,
        slug: course.slug,
        dek: course.dek,
        access: course.access,
        coverUrl: course.coverUrl,
        commentsEnabled: course.commentsEnabled,
        locked: vis.locked,
        entitled: vis.entitled,
        hasPrice: Boolean(course.stripePriceId || (course.priceAud && course.priceAud >= 0.5)),
      },
      lessons: vis.entitled ? lessonPayload : [],
      continueLessonSlug: lessonPayload.find((l) => !l.completed && l.unlocked)?.slug || lessonPayload[0]?.slug || null,
    })
  } catch (err) {
    console.error('[learn/course]', err)
    return res.status(500).json({error: 'Could not load course'})
  }
}
