import type {VercelRequest, VercelResponse} from '@vercel/node'
import {requireLearnUser} from '../learnAuth.js'
import {fetchLearnCourses} from '../learnSanity.js'
import {loadEntitlementMap, syncCourseEntitlements, visibilityForCourse} from '../learnAccess.js'
import {syncLearnHubspot} from '../learnHubspot.js'
import {getServiceSupabase} from '../supabase.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({error: 'Method not allowed'})
  const user = await requireLearnUser(req, res)
  if (!user) return

  try {
    await syncLearnHubspot(user)
    const courses = await fetchLearnCourses()
    const entitlements = await syncCourseEntitlements(user, courses, await loadEntitlementMap(user.id))
    const supabase = getServiceSupabase()
    const {data: progressRows} = await supabase
      .from('learn_progress')
      .select('course_id, lesson_id, completed_at')
      .eq('user_id', user.id)

    const completedByCourse = new Map<string, number>()
    const lastByCourse = new Map<string, string>()
    for (const row of progressRows || []) {
      if (row.completed_at) {
        completedByCourse.set(row.course_id, (completedByCourse.get(row.course_id) || 0) + 1)
      }
      lastByCourse.set(row.course_id, row.lesson_id)
    }

    const payload = courses
      .map((course) => {
        const source = entitlements.get(course._id) || null
        const vis = visibilityForCourse(course, Boolean(source), source)
        if (!vis.listed) return null
        return {
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
          completedLessons: completedByCourse.get(course._id) || 0,
          continueLessonId: lastByCourse.get(course._id) || null,
        }
      })
      .filter(Boolean)

    return res.status(200).json({
      user: {email: user.email, displayName: user.displayName},
      courses: payload,
    })
  } catch (err) {
    console.error('[learn/catalogue]', err)
    return res.status(500).json({error: 'Could not load courses'})
  }
}
