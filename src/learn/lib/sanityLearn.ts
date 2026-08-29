import {client} from '../../sanityClient'
import {readLocalProgress} from './profileStore'
import type {CatalogueCourse, CoursePayload, LessonPayload, PublicActivity} from '../types'

type SanityCourseRow = {
  _id: string
  title: string
  slug: string
  dek: string | null
  access: CatalogueCourse['access']
  released: boolean
  commentsEnabled: boolean
  order: number
  coverUrl: string | null
  lessonCount: number
}

type SanityLessonRow = {
  _id: string
  title: string
  slug: string
  order: number
  unlockAfterDays: number | null
  videoUrl: string | null
  body: unknown[] | null
  activities: unknown[] | null
}

function mapCourse(row: SanityCourseRow): CatalogueCourse {
  const access = row.access === 'premium' || row.access === 'company' ? row.access : 'open'
  return {
    id: row._id,
    title: row.title,
    slug: row.slug,
    dek: row.dek,
    access,
    coverUrl: row.coverUrl,
    commentsEnabled: Boolean(row.commentsEnabled),
    locked: access === 'premium' || access === 'company',
    entitled: access === 'open',
    hasPrice: false,
    completedLessons: 0,
    lessonCount: row.lessonCount || 3,
    continueLessonId: null,
    featured: row.order === 1 || access === 'open',
  }
}

function publicActivities(raw: unknown[] | null): PublicActivity[] {
  if (!Array.isArray(raw)) return []
  return raw.map((item, index) => {
    const row = (item || {}) as Record<string, unknown>
    const options = Array.isArray(row.options)
      ? row.options.map((o, i) => {
          const opt = (o || {}) as Record<string, unknown>
          return {key: String(opt.key || `opt-${i}`), label: String(opt.label || '')}
        })
      : []
    const matchItems = Array.isArray(row.matchItems)
      ? row.matchItems.map((o) => {
          const m = (o || {}) as Record<string, unknown>
          return {prompt: String(m.prompt || '')}
        })
      : []
    const matchChoices = Array.isArray(row.matchChoices)
      ? row.matchChoices.map((o) => {
          const m = (o || {}) as Record<string, unknown>
          return {key: String(m.key || ''), label: String(m.label || '')}
        })
      : []
    const template =
      row.template === 'trueFalse' ||
      row.template === 'multipleChoice' ||
      row.template === 'match' ||
      row.template === 'threeColumn' ||
      row.template === 'dropdown'
        ? row.template
        : 'multipleChoice'
    return {
      _key: String(row._key || `act-${index}`),
      template,
      prompt: String(row.prompt || ''),
      explainAfter: row.explainAfter ? String(row.explainAfter) : null,
      options,
      matchItems,
      matchChoices,
    }
  })
}

export async function fetchSanityCatalogue(): Promise<CatalogueCourse[]> {
  const rows = await client.fetch<SanityCourseRow[]>(
    `*[_type == "learnCourse" && released != false] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      dek,
      access,
      released,
      commentsEnabled,
      order,
      "coverUrl": cover.asset->url,
      "lessonCount": count(*[_type == "learnLesson" && course._ref == ^._id])
    }`,
  )
  return (rows || []).filter((row) => row.slug).map(mapCourse)
}

export async function fetchSanityCourse(slug: string): Promise<CoursePayload | null> {
  const course = await client.fetch<SanityCourseRow | null>(
    `*[_type == "learnCourse" && slug.current == $slug && released != false][0] {
      _id,
      title,
      "slug": slug.current,
      dek,
      access,
      released,
      commentsEnabled,
      order,
      "coverUrl": cover.asset->url
    }`,
    {slug},
  )
  if (!course?.slug) return null
  const mapped = mapCourse(course)
  const lessons = await client.fetch<SanityLessonRow[]>(
    `*[_type == "learnLesson" && course._ref == $id] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      order,
      unlockAfterDays,
      "videoUrl": video.url,
      body,
      activities
    }`,
    {id: course._id},
  )
  const done = readLocalProgress()
  const outline = (lessons || [])
    .filter((row) => row.slug)
    .map((row) => ({
      id: row._id,
      title: row.title,
      slug: row.slug,
      order: row.order || 0,
      unlockAfterDays: row.unlockAfterDays || 0,
      unlocked: !row.unlockAfterDays,
      completed: done.has(row._id),
    }))
  const next = outline.find((l) => !l.completed) || outline[0]
  return {
    course: {
      id: mapped.id,
      title: mapped.title,
      slug: mapped.slug,
      dek: mapped.dek,
      access: mapped.access,
      locked: mapped.locked,
      entitled: mapped.entitled,
      hasPrice: mapped.hasPrice,
    },
    lessons: outline,
    continueLessonSlug: next?.slug || null,
  }
}

export async function fetchSanityLesson(courseSlug: string, lessonSlug: string): Promise<LessonPayload | null> {
  const course = await client.fetch<{
    _id: string
    title: string
    slug: string
    commentsEnabled: boolean
  } | null>(
    `*[_type == "learnCourse" && slug.current == $slug && released != false][0] {
      _id,
      title,
      "slug": slug.current,
      commentsEnabled
    }`,
    {slug: courseSlug},
  )
  if (!course?._id) return null
  const lessons = await client.fetch<SanityLessonRow[]>(
    `*[_type == "learnLesson" && course._ref == $id] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      order,
      unlockAfterDays,
      "videoUrl": video.url,
      body,
      activities
    }`,
    {id: course._id},
  )
  const index = (lessons || []).findIndex((row) => row.slug === lessonSlug)
  const lesson = lessons[index]
  if (!lesson?.slug) return null
  const prev = index > 0 ? lessons[index - 1] : null
  const next = index < lessons.length - 1 ? lessons[index + 1] : null
  const done = readLocalProgress()
  return {
    course: {
      id: course._id,
      title: course.title,
      slug: course.slug,
      commentsEnabled: Boolean(course.commentsEnabled),
    },
    lesson: {
      id: lesson._id,
      title: lesson.title,
      slug: lesson.slug,
      order: lesson.order || 0,
      videoUrl: lesson.videoUrl,
      body: Array.isArray(lesson.body) ? lesson.body : [],
      activities: publicActivities(lesson.activities),
    },
    completed: done.has(lesson._id),
    attempts: {},
    prev: prev?.slug ? {slug: prev.slug, title: prev.title} : null,
    next: next?.slug ? {slug: next.slug, title: next.title} : null,
  }
}
