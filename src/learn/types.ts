export type LearnAccess = 'open' | 'premium' | 'company'

export type CatalogueCourse = {
  id: string
  title: string
  slug: string
  dek: string | null
  access: LearnAccess
  coverUrl: string | null
  commentsEnabled: boolean
  locked: boolean
  entitled: boolean
  hasPrice: boolean
  completedLessons: number
  continueLessonId: string | null
  featured?: boolean
}

export type CourseOutlineLesson = {
  id: string
  title: string
  slug: string
  order: number
  unlocked: boolean
  unlockAfterDays: number
  completed: boolean
}

export type PublicActivity = {
  _key: string
  template: 'trueFalse' | 'multipleChoice' | 'match'
  prompt: string
  explainAfter: string | null
  options: Array<{key: string; label: string}>
  matchItems: Array<{prompt: string}>
  matchChoices: Array<{key: string; label: string}>
}

export type LessonPayload = {
  course: {id: string; title: string; slug: string; commentsEnabled: boolean}
  lesson: {
    id: string
    title: string
    slug: string
    order: number
    videoUrl: string | null
    body: unknown[]
    activities: PublicActivity[]
  }
  completed: boolean
  attempts: Record<string, {score: number | null; passed: boolean; answers: unknown}>
  prev: {slug: string; title: string} | null
  next: {slug: string; title: string} | null
}
