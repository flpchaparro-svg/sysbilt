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
  dek: 'What a system is, why work piles up, and one job to fix.',
  access: 'open',
  coverUrl: null,
  commentsEnabled: true,
  locked: false,
  entitled: true,
  hasPrice: false,
  completedLessons: 0,
  lessonCount: 3,
  continueLessonId: null,
  featured: true,
  popular: true,
}

export const DUMMY_LOCKED: CatalogueCourse = {
  id: 'learnCourse.private-workshops',
  title: 'Private workshops',
  slug: 'private-workshops',
  dek: 'Live work with us. Locked until you have a seat.',
  access: 'premium',
  coverUrl: null,
  commentsEnabled: false,
  locked: true,
  entitled: false,
  hasPrice: false,
  completedLessons: 0,
  lessonCount: 0,
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
    lessonCount: extra.lessonCount ?? 0,
    continueLessonId: null,
    featured: false,
    ...extra,
  }
}

export const DUMMY_CATALOGUE: CatalogueCourse[] = [
  DUMMY_COURSE,
  card(
    'learnCourse.websites',
    'Websites and e-commerce',
    'websites',
    'The site that brings work in, including a shop if you sell that way.',
    'premium',
    {popular: true},
  ),
  card(
    'learnCourse.crm',
    'CRM and lead tracking',
    'crm',
    'The record of who enquired, and what happened next.',
    'premium',
  ),
  card(
    'learnCourse.automation',
    'Automation',
    'automation',
    'How a repeating job gets off your plate.',
    'premium',
    {featured: true, popular: true},
  ),
  card(
    'learnCourse.ai',
    'AI assistants',
    'ai',
    'An assistant that stays on your material, without the hype.',
    'premium',
    {featured: true, popular: true},
  ),
  card(
    'learnCourse.content',
    'Content systems',
    'content',
    'The system that keeps publishing without you sitting in the editor.',
    'premium',
  ),
  card(
    'learnCourse.training',
    'Team training',
    'training',
    'How the team runs the job when you are not in the room.',
    'premium',
  ),
  card(
    'learnCourse.dashboards',
    'Dashboards and reporting',
    'dashboards',
    'The numbers you can trust, in one place.',
    'premium',
  ),
  DUMMY_LOCKED,
]

const a1: PublicActivity = {
  _key: 'act-system-tf',
  template: 'trueFalse',
  prompt: 'A system is a way of doing a job the same way each time, without you standing over it.',
  explainAfter: 'If it only works when you are in the room, it is still a habit sitting on you.',
  trueHint: 'Think about a Thursday when you are on a job and someone else has to run it.',
  falseHint: 'If the job dies the moment you leave, that is still you, not a system.',
  trueTeach:
    'Yes. Written steps that someone else can follow. That is the test. Tools come later.',
  falseTeach:
    'Not this one. A habit that only you can run is still sitting on you. The test is a Thursday without you in the room.',
  options: [],
  matchItems: [],
  matchChoices: [],
}

const a2: PublicActivity = {
  _key: 'act-pile-mc',
  template: 'threeColumn',
  prompt: 'When does the pile start?',
  explainAfter: 'The same question coming back is the pile starting. The rest of the business can look fine.',
  options: [
    {
      key: 'a',
      label: 'People ask you the same question twice',
      hint: 'Listen for repeats. Same file, same quote, same “where is it”.',
      teach: 'Yes. Repeats are the pile starting. One question twice is enough to write the steps down.',
    },
    {
      key: 'b',
      label: 'The website looks dated',
      hint: 'Looks can wait. This path is about the work coming back, not the shopfront.',
      teach: 'Not this one. A dated site is a different job. The pile starts when the same question comes back.',
    },
    {
      key: 'c',
      label: 'You hired someone last year',
      hint: 'Hiring is a later move. The first sign shows up before you add a person.',
      teach: 'Not this one. You can hire and still be the system. The first sign is the repeat.',
    },
  ],
  matchItems: [],
  matchChoices: [],
}

const a3: PublicActivity = {
  _key: 'act-job-match',
  template: 'dropdown',
  prompt: 'Match each situation to the better next step.',
  explainAfter:
    'Start with one job you already do every week. Leave the shiny tools until that job runs without you.',
  options: [],
  matchItems: [
    {
      prompt: 'The same quote request lands in your inbox every Monday',
      correctKey: 'repeat',
      hint: 'This one already repeats. That is the job to systemise first.',
      wrongTeach: {
        wait: 'This already repeats every Monday. Waiting is for a tool with no job under it.',
        memory: 'This is a weekly quote, not a missing file. Write the quote steps first.',
      },
    },
    {
      prompt: 'You want an AI assistant because it sounds current',
      correctKey: 'wait',
      hint: 'Wanting a tool is not a job. Park it until a real job is written down.',
      wrongTeach: {
        repeat: 'Wanting a tool is not a repeating job. There is nothing here to systemise yet.',
        memory: 'This is not a file that needs a home. It is a tool with no job under it. Wait.',
      },
    },
    {
      prompt: 'A client asks where the file is, again',
      correctKey: 'memory',
      hint: 'This is memory, not a missing chatbot. Give the file a home.',
      wrongTeach: {
        repeat: 'The file has no home yet. Another quote system will not hold it. Give it a place.',
        wait: 'This is already coming back. Waiting leaves the file in your head. Give it a home.',
      },
    },
  ],
  matchChoices: [
    {key: 'repeat', label: 'Turn that job into a system first', teach: 'Yes. A weekly repeat is the job. Write the steps before you buy a tool.'},
    {key: 'wait', label: 'Leave it until a real job is systemised', teach: 'Yes. A tool without a job becomes another pile. Wait.'},
    {key: 'memory', label: 'Give the job a home, not another chat', teach: 'Yes. The file needs a place. Another message thread will not hold it.'},
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
      videoUrl: 'placeholder',
      summary: 'A system is the steps a job follows when you are not in the room. If only you know them, it is still sitting on you.',
      diagram: 'system',
      showEmail: false,
      body: blocks(
        'A system is not software. It is the way a job gets done when you are not standing there.',
        'If only you know the steps, you do not have a system. You have a memory. That is fine until you are busy, sick, or on a job.',
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
      videoUrl: 'placeholder',
      summary: 'The pile is the same job coming back. It starts when nobody wrote down what good looks like.',
      diagram: 'pile',
      showEmail: true,
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
      videoUrl: 'placeholder',
      summary: 'Pick one job you already do every week. Write the steps. Leave the tools until that job can run without you.',
      diagram: 'job',
      showEmail: false,
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

export function mergeDummyStartHere(payload: LessonPayload): LessonPayload {
  if (payload.course.slug !== DUMMY_COURSE.slug) return payload
  const dummy = dummyLesson(payload.lesson.slug, payload.course.slug)
  if (!dummy) return payload
  return {
    ...payload,
    lesson: {
      ...payload.lesson,
      videoUrl: payload.lesson.videoUrl || dummy.lesson.videoUrl,
      summary: payload.lesson.summary || dummy.lesson.summary,
      diagram: payload.lesson.diagram || dummy.lesson.diagram,
      showEmail: payload.lesson.showEmail || dummy.lesson.showEmail,
      activities: dummy.lesson.activities,
    },
    prev: payload.prev || dummy.prev,
    next: payload.next || dummy.next,
  }
}

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
  const ok =
    map['0'] === 'repeat' && map['1'] === 'wait' && map['2'] === 'memory'
  return {score: ok ? 100 : 0, passed: ok, explainAfter: a3.explainAfter}
}
