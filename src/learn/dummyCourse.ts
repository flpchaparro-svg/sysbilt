import type {CatalogueCourse, CourseOutlineLesson, LessonPayload, PublicActivity} from './types'

function blocks(...paras: string[]) {
  return paras.map((text, i) => ({
    _type: 'block',
    _key: `p${i}`,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `s${i}`, text, marks: []}],
  }))
}

export const DUMMY_COURSE_ID = 'learnCourse.start-here'
export const DUMMY_L1 = 'learnLesson.start-system'
export const DUMMY_L2 = 'learnLesson.start-pile'
export const DUMMY_L3 = 'learnLesson.start-first-job'

export const DUMMY_COURSE: CatalogueCourse = {
  id: DUMMY_COURSE_ID,
  title: 'Start here',
  slug: 'start-here',
  dek: 'Three short lessons on what a system is, why work piles up, and how to pick one job to fix.',
  access: 'open',
  coverUrl: null,
  commentsEnabled: true,
  locked: false,
  entitled: true,
  hasPrice: false,
  completedLessons: 0,
  continueLessonId: null,
  featured: true,
}

export const DUMMY_LOCKED: CatalogueCourse = {
  id: 'learnCourse.client-workshop',
  title: 'Client workshop',
  slug: 'client-workshop',
  dek: 'A longer course. Locked so you can see how that looks.',
  access: 'premium',
  coverUrl: null,
  commentsEnabled: false,
  locked: true,
  entitled: false,
  hasPrice: false,
  completedLessons: 0,
  continueLessonId: null,
  featured: false,
}

function card(
  id: string,
  title: string,
  slug: string,
  dek: string,
  access: CatalogueCourse['access'],
  extra: Partial<CatalogueCourse> = {},
): CatalogueCourse {
  return {
    id,
    title,
    slug,
    dek,
    access,
    coverUrl: null,
    commentsEnabled: false,
    locked: access !== 'open',
    entitled: access === 'open',
    hasPrice: false,
    completedLessons: 0,
    continueLessonId: null,
    featured: false,
    ...extra,
  }
}

export const DUMMY_CATALOGUE: CatalogueCourse[] = [
  DUMMY_COURSE,
  card(
    'learnCourse.ai',
    'AI',
    'ai',
    'What AI can do in a course, without the hype.',
    'open',
    {featured: true, commentsEnabled: true},
  ),
  card(
    'learnCourse.automation',
    'Automation',
    'automation',
    'How a repeating job gets off your plate.',
    'open',
    {featured: true},
  ),
  card(
    'learnCourse.video',
    'Video and content',
    'video',
    'Dummy locked card. This is how a paid course looks before you have access.',
    'premium',
  ),
  DUMMY_LOCKED,
]

const a1: PublicActivity = {
  _key: 'act-system-tf',
  template: 'trueFalse',
  prompt: 'A system is a way of doing a job the same way each time, without you standing over it.',
  explainAfter: 'Yes. If it only works when you are in the room, it is still a habit sitting on you.',
  options: [],
  matchItems: [],
  matchChoices: [],
}

const a2: PublicActivity = {
  _key: 'act-pile-mc',
  template: 'multipleChoice',
  prompt: 'What is the first sign a job has no system?',
  explainAfter: 'The same question coming back is the pile starting. The rest of the business can look fine.',
  options: [
    {key: 'a', label: 'People ask you the same question twice'},
    {key: 'b', label: 'The website looks dated'},
    {key: 'c', label: 'You hired someone last year'},
  ],
  matchItems: [],
  matchChoices: [],
}

const a3: PublicActivity = {
  _key: 'act-job-match',
  template: 'match',
  prompt: 'Link each situation to the better next step.',
  explainAfter:
    'Start with one job you already do every week. Leave the shiny tools until that job runs without you.',
  options: [],
  matchItems: [
    {prompt: 'The same quote request lands in your inbox every Monday'},
    {prompt: 'You want an AI assistant because it sounds current'},
    {prompt: 'A client asks where the file is, again'},
  ],
  matchChoices: [
    {key: 'repeat', label: 'Turn that job into a system first'},
    {key: 'wait', label: 'Leave it until a real job is systemised'},
    {key: 'memory', label: 'Give the job a home, not another chat'},
  ],
}

export const DUMMY_OUTLINE: CourseOutlineLesson[] = [
  {id: DUMMY_L1, title: 'What a system is', slug: 'what-a-system-is', order: 1, unlocked: true, unlockAfterDays: 0, completed: false},
  {id: DUMMY_L2, title: 'Where the pile starts', slug: 'where-the-pile-starts', order: 2, unlocked: true, unlockAfterDays: 0, completed: false},
  {id: DUMMY_L3, title: 'Pick one job', slug: 'pick-one-job', order: 3, unlocked: true, unlockAfterDays: 0, completed: false},
]

const lessons: Record<string, LessonPayload> = {
  'what-a-system-is': {
    course: {id: DUMMY_COURSE_ID, title: DUMMY_COURSE.title, slug: DUMMY_COURSE.slug, commentsEnabled: true},
    lesson: {
      id: DUMMY_L1,
      title: 'What a system is',
      slug: 'what-a-system-is',
      order: 1,
      videoUrl: null,
      body: blocks(
        'A system is not software. It is the way a job gets done when you are not standing there.',
        'If only you know the steps, you do not have a system. You have a memory. That is fine until you are busy, sick, or on a job.',
        'Read this, answer the question, then move on. The next lesson is the pile that shows up when the memory is you.',
      ),
      activities: [a1],
    },
    completed: false,
    attempts: {},
    prev: null,
    next: {slug: 'where-the-pile-starts', title: 'Where the pile starts'},
  },
  'where-the-pile-starts': {
    course: {id: DUMMY_COURSE_ID, title: DUMMY_COURSE.title, slug: DUMMY_COURSE.slug, commentsEnabled: true},
    lesson: {
      id: DUMMY_L2,
      title: 'Where the pile starts',
      slug: 'where-the-pile-starts',
      order: 2,
      videoUrl: null,
      body: blocks(
        'The pile is not a personality trait. It is the same job arriving again because nobody wrote down what good looks like.',
        'Quotes, follow-ups, “where is that file”, after-hours calls. Each one feels small. Together they eat the week.',
        'You do not fix the pile by working later. You fix it by taking one repeating job off your head.',
      ),
      activities: [a2],
    },
    completed: false,
    attempts: {},
    prev: {slug: 'what-a-system-is', title: 'What a system is'},
    next: {slug: 'pick-one-job', title: 'Pick one job'},
  },
  'pick-one-job': {
    course: {id: DUMMY_COURSE_ID, title: DUMMY_COURSE.title, slug: DUMMY_COURSE.slug, commentsEnabled: true},
    lesson: {
      id: DUMMY_L3,
      title: 'Pick one job',
      slug: 'pick-one-job',
      order: 3,
      videoUrl: null,
      body: blocks(
        'Do not start with a platform. Start with a job you already do every week.',
        'Write the steps as if a new person had to do it on Thursday without ringing you. If you cannot write it, the job is still yours.',
        'That is the whole course. Later lessons in other courses get into AI, automation, and the rest. This one is the habit.',
      ),
      activities: [a3],
    },
    completed: false,
    attempts: {},
    prev: {slug: 'where-the-pile-starts', title: 'Where the pile starts'},
    next: null,
  },
}

export const DUMMY_SEED_COMMENTS = [
  {
    id: 'seed-1',
    lessonSlug: 'what-a-system-is',
    lessonTitle: 'What a system is',
    body: 'If the job only works when I am there, is that still a system or just me?',
    author: 'Alex',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    mine: false,
  },
  {
    id: 'seed-2',
    lessonSlug: 'what-a-system-is',
    lessonTitle: 'What a system is',
    body: 'That is still you. A system is the steps someone else can follow on a Thursday.',
    author: 'Sybil',
    createdAt: new Date(Date.now() - 86400000 * 2 + 3600000).toISOString(),
    mine: false,
  },
]

export function dummyLesson(slug: string, courseSlug = DUMMY_COURSE.slug): LessonPayload | null {
  const lesson = lessons[slug]
  if (!lesson) return null
  const course = DUMMY_CATALOGUE.find((item) => item.slug === courseSlug) || DUMMY_COURSE
  return {
    ...lesson,
    course: {
      id: course.id,
      title: course.title,
      slug: course.slug,
      commentsEnabled: course.commentsEnabled,
    },
  }
}

export function dummyOutline(completedIds: Set<string>): CourseOutlineLesson[] {
  return DUMMY_OUTLINE.map((lesson) => ({...lesson, completed: completedIds.has(lesson.id)}))
}

export function gradeDummy(
  activityKey: string,
  answers: unknown,
): {score: number; passed: boolean; explainAfter: string | null} {
  if (activityKey === 'act-system-tf') {
    const value = typeof answers === 'boolean' ? answers : false
    return {score: value ? 100 : 0, passed: value === true, explainAfter: a1.explainAfter}
  }
  if (activityKey === 'act-pile-mc') {
    const key = typeof answers === 'string' ? answers : (answers as {key?: string})?.key
    const passed = key === 'a'
    return {score: passed ? 100 : 0, passed, explainAfter: a2.explainAfter}
  }
  const map = answers && typeof answers === 'object' && !Array.isArray(answers) ? (answers as Record<string, string>) : {}
  const ok = map['0'] === 'repeat' && map['1'] === 'wait' && map['2'] === 'memory'
  return {score: ok ? 100 : 0, passed: ok, explainAfter: a3.explainAfter}
}
