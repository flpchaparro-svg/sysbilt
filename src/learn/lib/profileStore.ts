export const LEARN_INTERESTS = [
  {id: 'websites', label: 'Websites and e-commerce'},
  {id: 'crm', label: 'CRM and lead tracking'},
  {id: 'automation', label: 'Automation'},
  {id: 'ai', label: 'AI assistants'},
  {id: 'content', label: 'Content systems'},
  {id: 'training', label: 'Team training'},
  {id: 'dashboards', label: 'Dashboards and reporting'},
  {id: 'unsure', label: 'Not sure yet'},
] as const

export const LEARN_GOALS = [
  {id: 'looking', label: 'Just looking around'},
  {id: 'basics', label: 'Learn the basics'},
  {id: 'better', label: 'Get better at something I already do'},
  {id: 'unsure', label: 'Not sure yet'},
] as const

export const LEARN_COUNTRIES = [
  {id: 'AU', label: 'Australia'},
  {id: 'NZ', label: 'New Zealand'},
  {id: 'GB', label: 'United Kingdom'},
  {id: 'US', label: 'United States'},
  {id: 'other', label: 'Somewhere else'},
] as const

export type LearnProfile = {
  displayName: string
  email: string
  phone: string
  country: string
  interest: string[]
  goal: string
  onboarded: boolean
}

const PROFILE_KEY = 'sysbilt-learn-profile'
const PROGRESS_KEY = 'sysbilt-learn-progress'
const EVENTS_KEY = 'sysbilt-learn-events'
const SAVED_KEY = 'sysbilt-learn-saved'
const NOTES_KEY = 'sysbilt-learn-notes'
const COMMENTS_KEY = 'sysbilt-learn-comments'

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function emptyProfile(email: string): LearnProfile {
  return {displayName: '', email, phone: '', country: 'AU', interest: [], goal: '', onboarded: false}
}

export function normaliseProfile(row: Partial<LearnProfile> & {email: string}): LearnProfile {
  const base = emptyProfile(row.email)
  return {
    ...base,
    ...row,
    email: row.email,
    displayName: (row.displayName || '').trim(),
    phone: (row.phone || '').trim(),
    country: row.country || 'AU',
    interest: Array.isArray(row.interest) ? row.interest : [],
    goal: row.goal || '',
    onboarded: Boolean(row.onboarded),
  }
}

export function readLocalProfile(email: string): LearnProfile {
  const stored = readJson<Partial<LearnProfile> | null>(PROFILE_KEY, null)
  if (stored && stored.email === email) return normaliseProfile({...stored, email})
  return emptyProfile(email)
}

export function writeLocalProfile(profile: LearnProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function readLocalProgress(): Set<string> {
  return new Set(readJson<string[]>(PROGRESS_KEY, []))
}

function notifyLearnProgress() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event('sysbilt-learn-progress'))
}

export function markLocalLessonDone(lessonId: string) {
  const next = readLocalProgress()
  const already = next.has(lessonId)
  next.add(lessonId)
  localStorage.setItem(PROGRESS_KEY, JSON.stringify([...next]))
  if (!already) {
    const events = readJson<Array<{lessonId: string; at: string}>>(EVENTS_KEY, [])
    events.push({lessonId, at: new Date().toISOString()})
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events))
  }
  notifyLearnProgress()
}

const START_HERE_IDS: Record<string, string> = {
  'what-a-system-is': 'learnLesson.start-system',
  'where-the-pile-starts': 'learnLesson.start-pile',
  'pick-one-job': 'learnLesson.start-first-job',
}

export function markStartHereLessonDone(lessonId: string, slug: string) {
  markLocalLessonDone(lessonId)
  const dummyId = START_HERE_IDS[slug]
  if (dummyId && dummyId !== lessonId) markLocalLessonDone(dummyId)
}

export function countLessonsSince(msAgo: number): number {
  const from = Date.now() - msAgo
  return readJson<Array<{lessonId: string; at: string}>>(EVENTS_KEY, []).filter(
    (row) => Date.parse(row.at) >= from,
  ).length
}

export type SavedLesson = {
  lessonId: string
  courseSlug: string
  lessonSlug: string
  title: string
  at: string
}

export function readSavedLessons(): SavedLesson[] {
  return readJson<SavedLesson[]>(SAVED_KEY, [])
}

export function isLessonSaved(lessonId: string): boolean {
  return readSavedLessons().some((row) => row.lessonId === lessonId)
}

export function toggleSavedLesson(row: Omit<SavedLesson, 'at'>): boolean {
  const all = readSavedLessons()
  const exists = all.some((item) => item.lessonId === row.lessonId)
  const next = exists
    ? all.filter((item) => item.lessonId !== row.lessonId)
    : [...all, {...row, at: new Date().toISOString()}]
  localStorage.setItem(SAVED_KEY, JSON.stringify(next))
  notifyLearnProgress()
  return !exists
}

export function readLessonNote(lessonId: string): string {
  return readJson<Record<string, string>>(NOTES_KEY, {})[lessonId] || ''
}

export function writeLessonNote(lessonId: string, body: string) {
  const all = readJson<Record<string, string>>(NOTES_KEY, {})
  all[lessonId] = body
  localStorage.setItem(NOTES_KEY, JSON.stringify(all))
}

export type LocalComment = {
  id: string
  lessonSlug: string
  lessonTitle: string
  body: string
  author: string
  createdAt: string
  mine: boolean
}

export function readLocalComments(seed: LocalComment[]): LocalComment[] {
  const stored = readJson<LocalComment[] | null>(COMMENTS_KEY, null)
  if (stored && stored.length) return stored
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(seed))
  return seed
}

export function addLocalComment(comment: LocalComment) {
  const all = readJson<LocalComment[]>(COMMENTS_KEY, [])
  all.push(comment)
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(all))
}
