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
  lessonCount: number
  continueLessonId: string | null
  featured?: boolean
  popular?: boolean
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

export type CoursePayload = {
  course: {
    id: string
    title: string
    slug: string
    dek: string | null
    access: string
    locked: boolean
    entitled: boolean
    hasPrice: boolean
  }
  lessons: CourseOutlineLesson[]
  continueLessonSlug: string | null
}

export type ActivityOption = {
  key: string
  label: string
  hint?: string
  teach?: string
}

export type PublicActivity = {
  _key: string
  template: 'trueFalse' | 'multipleChoice' | 'match' | 'threeColumn' | 'dropdown'
  prompt: string
  explainAfter: string | null
  trueHint?: string
  falseHint?: string
  trueTeach?: string
  falseTeach?: string
  options: ActivityOption[]
  matchItems: Array<{
    prompt: string
    correctKey?: string
    hint?: string
    wrongTeach?: Record<string, string>
  }>
  matchChoices: Array<{key: string; label: string; teach?: string}>
}

export type LessonDiagramKind = 'system' | 'pile' | 'job' | 'generic'

export type LessonPayload = {
  course: {id: string; title: string; slug: string; commentsEnabled: boolean}
  lesson: {
    id: string
    title: string
    slug: string
    order: number
    videoUrl: string | null
    summary?: string | null
    diagram?: LessonDiagramKind | null
    showEmail?: boolean
    body: unknown[]
    activities: PublicActivity[]
  }
  completed: boolean
  attempts: Record<string, {score: number | null; passed: boolean; answers: unknown}>
  prev: {slug: string; title: string} | null
  next: {slug: string; title: string} | null
}
