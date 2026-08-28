import type {VercelRequest, VercelResponse} from '@vercel/node'
import {requireLearnUser} from './learnAuth.js'
import {fetchLearnCourseBySlug, fetchLessonsForCourse, publicActivity} from './learnSanity.js'
import {loadEntitlementMap, syncCourseEntitlements, visibilityForCourse} from './learnAccess.js'

export async function loadEntitledLesson(
  req: VercelRequest,
  res: VercelResponse,
): Promise<
  | {
      user: NonNullable<Awaited<ReturnType<typeof requireLearnUser>>>
      course: NonNullable<Awaited<ReturnType<typeof fetchLearnCourseBySlug>>>
      lesson: Awaited<ReturnType<typeof fetchLessonsForCourse>>[number]
      lessons: Awaited<ReturnType<typeof fetchLessonsForCourse>>
    }
  | null
> {
  const user = await requireLearnUser(req, res)
  if (!user) return null
  const courseSlug = typeof req.query.courseSlug === 'string' ? req.query.courseSlug : ''
  const lessonSlug = typeof req.query.lessonSlug === 'string' ? req.query.lessonSlug : ''
  if (!courseSlug || !lessonSlug) {
    res.status(400).json({error: 'courseSlug and lessonSlug required'})
    return null
  }
  const course = await fetchLearnCourseBySlug(courseSlug)
  if (!course) {
    res.status(404).json({error: 'Course not found'})
    return null
  }
  const entitlements = await syncCourseEntitlements(user, [course], await loadEntitlementMap(user.id))
  const vis = visibilityForCourse(
    course,
    Boolean(entitlements.get(course._id)),
    entitlements.get(course._id) || null,
  )
  if (!vis.entitled) {
    res.status(403).json({error: 'This course is locked'})
    return null
  }
  const lessons = await fetchLessonsForCourse(course._id)
  const lesson = lessons.find((l) => l.slug === lessonSlug)
  if (!lesson) {
    res.status(404).json({error: 'Lesson not found'})
    return null
  }
  return {user, course, lesson, lessons}
}

export function lessonPublicFields(lesson: Awaited<ReturnType<typeof fetchLessonsForCourse>>[number]) {
  return {
    id: lesson._id,
    title: lesson.title,
    slug: lesson.slug,
    order: lesson.order,
    videoUrl: lesson.videoUrl,
    body: lesson.body,
    activities: lesson.activities.map(publicActivity),
  }
}
