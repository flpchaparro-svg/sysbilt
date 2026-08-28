export const LEARN_INTERESTS = [
  {id: 'ai', label: 'AI'},
  {id: 'automation', label: 'Automation'},
  {id: 'video', label: 'Video and content'},
  {id: 'websites', label: 'Websites'},
  {id: 'unsure', label: 'Not sure yet'},
] as const

export const LEARN_GOALS = [
  {id: 'looking', label: 'Just looking around'},
  {id: 'basics', label: 'Learn the basics'},
  {id: 'better', label: 'Get better at something I already do'},
  {id: 'unsure', label: 'Not sure yet'},
] as const

export type LearnProfile = {
  displayName: string
  email: string
  interest: string[]
  goal: string
  onboarded: boolean
}

const PROFILE_KEY = 'sysbilt-learn-profile'
const PROGRESS_KEY = 'sysbilt-learn-progress'
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
  return {displayName: '', email, interest: [], goal: '', onboarded: false}
}

export function readLocalProfile(email: string): LearnProfile {
  const stored = readJson<LearnProfile | null>(PROFILE_KEY, null)
  if (stored && stored.email === email) return stored
  return emptyProfile(email)
}

export function writeLocalProfile(profile: LearnProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function readLocalProgress(): Set<string> {
  return new Set(readJson<string[]>(PROGRESS_KEY, []))
}

export function markLocalLessonDone(lessonId: string) {
  const next = readLocalProgress()
  next.add(lessonId)
  localStorage.setItem(PROGRESS_KEY, JSON.stringify([...next]))
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
