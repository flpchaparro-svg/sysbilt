import {createClient} from '@sanity/client'
import {SAMPLE_COURSE, SAMPLE_LESSONS} from './learnSample.js'
import './auth.js'

export type LearnAccess = 'open' | 'premium' | 'company'

export type LearnActivity = {
  _key: string
  template: 'trueFalse' | 'multipleChoice' | 'match'
  prompt: string
  explainAfter: string | null
  trueFalseCorrect: boolean | null
  options: Array<{key: string; label: string; isCorrect: boolean}>
  matchItems: Array<{prompt: string; correctKey: string}>
  matchChoices: Array<{key: string; label: string}>
}

export type LearnCourseDoc = {
  _id: string
  title: string
  slug: string
  dek: string | null
  access: LearnAccess
  released: boolean
  commentsEnabled: boolean
  order: number
  priceAud: number | null
  stripePriceId: string | null
  inviteEmails: string[]
  grantEmails: string[]
  coverUrl: string | null
}

export type LearnLessonDoc = {
  _id: string
  title: string
  slug: string
  order: number
  unlockAfterDays: number
  videoUrl: string | null
  body: unknown[]
  activities: LearnActivity[]
  courseId: string
}

function sanityToken(): string {
  return (
    process.env.SANITY_API_TOKEN ||
    process.env.SANITY_API_WRITE_TOKEN ||
    process.env.SANITY_AUTH_TOKEN ||
    ''
  ).trim()
}

function learnSanity() {
  const token = sanityToken()
  if (!token) return null
  return createClient({
    projectId: 'wdlc9pg8',
    dataset: 'production',
    apiVersion: '2024-02-20',
    useCdn: false,
    token,
    perspective: 'raw',
  })
}

function publishedId(id: string): string {
  return id.replace(/^drafts\./, '')
}

function preferDraft<T extends {_id: string}>(docs: T[]): T[] {
  const byPublished = new Map<string, T>()
  for (const doc of docs) {
    const pid = publishedId(doc._id)
    const existing = byPublished.get(pid)
    if (!existing) {
      byPublished.set(pid, doc)
      continue
    }
    const incomingIsDraft = doc._id.startsWith('drafts.')
    const existingIsDraft = existing._id.startsWith('drafts.')
    if (incomingIsDraft && !existingIsDraft) byPublished.set(pid, doc)
  }
  return [...byPublished.values()].map((doc) => ({...doc, _id: publishedId(doc._id)}))
}

function emails(list: unknown): string[] {
  if (!Array.isArray(list)) return []
  return list
    .filter((v): v is string => typeof v === 'string')
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean)
}

function mapActivity(raw: Record<string, unknown>, index: number): LearnActivity {
  const options = Array.isArray(raw.options)
    ? raw.options.map((o, i) => {
        const row = (o || {}) as Record<string, unknown>
        return {
          key: String(row.key || `opt-${i}`),
          label: String(row.label || ''),
          isCorrect: Boolean(row.isCorrect),
        }
      })
    : []
  const matchItems = Array.isArray(raw.matchItems)
    ? raw.matchItems.map((o) => {
        const row = (o || {}) as Record<string, unknown>
        return {
          prompt: String(row.prompt || ''),
          correctKey: String(row.correctKey || ''),
        }
      })
    : []
  const matchChoices = Array.isArray(raw.matchChoices)
    ? raw.matchChoices.map((o) => {
        const row = (o || {}) as Record<string, unknown>
        return {key: String(row.key || ''), label: String(row.label || '')}
      })
    : []
  const template =
    raw.template === 'trueFalse' || raw.template === 'multipleChoice' || raw.template === 'match'
      ? raw.template
      : 'multipleChoice'
  return {
    _key: String(raw._key || `act-${index}`),
    template,
    prompt: String(raw.prompt || ''),
    explainAfter: raw.explainAfter ? String(raw.explainAfter) : null,
    trueFalseCorrect: typeof raw.trueFalseCorrect === 'boolean' ? raw.trueFalseCorrect : null,
    options,
    matchItems,
    matchChoices,
  }
}

const COURSE_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  dek,
  access,
  released,
  commentsEnabled,
  order,
  priceAud,
  stripePriceId,
  inviteEmails,
  grantEmails,
  "coverUrl": cover.asset->url
}`

const LESSON_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  order,
  unlockAfterDays,
  "videoUrl": video.url,
  body,
  activities,
  "courseId": course._ref
}`

export async function fetchLearnCourses(): Promise<LearnCourseDoc[]> {
  const client = learnSanity()
  if (!client) {
    return [SAMPLE_COURSE]
  }
  try {
    const raw = await client.fetch<Array<Record<string, unknown>>>(
      `*[_type == "learnCourse"]${COURSE_PROJECTION}`,
    )
    const mapped = preferDraft(raw.map((row) => mapCourse(row))).filter((course) => course.released)
    if (mapped.length === 0) return [SAMPLE_COURSE]
    return mapped.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
  } catch (err) {
    console.warn('[learn] Sanity course fetch failed, using sample', err)
    return [SAMPLE_COURSE]
  }
}

export async function fetchLearnCourseBySlug(slug: string): Promise<LearnCourseDoc | null> {
  const courses = await fetchLearnCourses()
  return courses.find((c) => c.slug === slug) || null
}

export async function fetchLearnCourseById(id: string): Promise<LearnCourseDoc | null> {
  const courses = await fetchLearnCourses()
  return courses.find((c) => c._id === id || publishedId(c._id) === publishedId(id)) || null
}

export async function fetchLessonsForCourse(courseId: string): Promise<LearnLessonDoc[]> {
  const pid = publishedId(courseId)
  if (pid === SAMPLE_COURSE._id) {
    return SAMPLE_LESSONS.map((lesson) => ({...lesson, courseId: pid}))
  }
  const client = learnSanity()
  if (!client) return []
  const raw = await client.fetch<Array<Record<string, unknown>>>(
    `*[_type == "learnLesson" && (course._ref == $id || course._ref == $draft)] | order(order asc)${LESSON_PROJECTION}`,
    {id: pid, draft: `drafts.${pid}`},
  )
  return preferDraft(raw.map((row) => mapLesson(row, pid))).sort((a, b) => a.order - b.order)
}

function mapCourse(row: Record<string, unknown>): LearnCourseDoc {
  const access =
    row.access === 'premium' || row.access === 'company' || row.access === 'open'
      ? row.access
      : 'open'
  return {
    _id: String(row._id),
    title: String(row.title || 'Untitled course'),
    slug: String(row.slug || ''),
    dek: row.dek ? String(row.dek) : null,
    access,
    released: row.released !== false,
    commentsEnabled: Boolean(row.commentsEnabled),
    order: typeof row.order === 'number' ? row.order : 100,
    priceAud: typeof row.priceAud === 'number' ? row.priceAud : null,
    stripePriceId: row.stripePriceId ? String(row.stripePriceId) : null,
    inviteEmails: emails(row.inviteEmails),
    grantEmails: emails(row.grantEmails),
    coverUrl: row.coverUrl ? String(row.coverUrl) : null,
  }
}

function mapLesson(row: Record<string, unknown>, courseId: string): LearnLessonDoc {
  const activities = Array.isArray(row.activities)
    ? row.activities.map((a, i) => mapActivity((a || {}) as Record<string, unknown>, i))
    : []
  return {
    _id: String(row._id),
    title: String(row.title || 'Untitled lesson'),
    slug: String(row.slug || ''),
    order: typeof row.order === 'number' ? row.order : 1,
    unlockAfterDays: typeof row.unlockAfterDays === 'number' ? row.unlockAfterDays : 0,
    videoUrl: row.videoUrl ? String(row.videoUrl) : null,
    body: Array.isArray(row.body) ? row.body : [],
    activities,
    courseId: publishedId(String(row.courseId || courseId)),
  }
}

export function publicActivity(activity: LearnActivity) {
  return {
    _key: activity._key,
    template: activity.template,
    prompt: activity.prompt,
    explainAfter: activity.explainAfter,
    options: activity.options.map(({key, label}) => ({key, label})),
    matchItems: activity.matchItems.map(({prompt}) => ({prompt})),
    matchChoices: activity.matchChoices,
  }
}
