/** Built-in sample so /learn is clickable before Studio content exists. */

export const SAMPLE_COURSE_ID = 'learnCourse.sample-how-learn-works'
export const SAMPLE_LESSON_1_ID = 'learnLesson.sample-welcome'
export const SAMPLE_LESSON_2_ID = 'learnLesson.sample-activities'

const block = (text: string) => [
  {
    _type: 'block',
    _key: 'b1',
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: 's1', text, marks: []}],
  },
]

export const SAMPLE_COURSE = {
  _id: SAMPLE_COURSE_ID,
  title: 'How Learn works',
  slug: 'how-learn-works',
  dek: 'A short walkthrough of progress, activities, and how a lesson feels on this membership.',
  access: 'open' as const,
  released: true,
  commentsEnabled: false,
  order: 1,
  priceAud: null as number | null,
  stripePriceId: null as string | null,
  inviteEmails: [] as string[],
  grantEmails: [] as string[],
  coverUrl: null as string | null,
}

export const SAMPLE_LESSONS = [
  {
    _id: SAMPLE_LESSON_1_ID,
    title: 'Welcome to a lesson',
    slug: 'welcome',
    order: 1,
    unlockAfterDays: 0,
    videoUrl: null as string | null,
    body: block(
      'This is a lesson. Watch a video when you add one, read the notes, then complete the activity. Your progress saves so you can pick up here next time.',
    ),
    activities: [
      {
        _key: 'act-tf-1',
        template: 'trueFalse' as const,
        prompt: 'Progress on a lesson is saved so you can return later.',
        explainAfter: 'Yes. Completing an activity, or marking a lesson done, writes to your account.',
        trueFalseCorrect: true,
        options: [],
        matchItems: [],
        matchChoices: [],
      },
    ],
  },
  {
    _id: SAMPLE_LESSON_2_ID,
    title: 'Try the activity templates',
    slug: 'activities',
    order: 2,
    unlockAfterDays: 0,
    videoUrl: null as string | null,
    body: block(
      'Each lesson can reuse the same activity templates with different copy: true or false, a single best answer, or matching a case to the right idea.',
    ),
    activities: [
      {
        _key: 'act-mc-1',
        template: 'multipleChoice' as const,
        prompt: 'Which of these is the point of a lesson activity?',
        explainAfter: 'Activities check that the idea landed, then explain the right answer.',
        trueFalseCorrect: null,
        options: [
          {key: 'a', label: 'Fill time on the page', isCorrect: false},
          {key: 'b', label: 'Check the idea landed, then explain', isCorrect: true},
          {key: 'c', label: 'Replace the video', isCorrect: false},
        ],
        matchItems: [],
        matchChoices: [],
      },
      {
        _key: 'act-match-1',
        template: 'match' as const,
        prompt: 'Link each situation to the best next step.',
        explainAfter: 'Open courses start at once. Premium sits in the catalogue until you are entitled. Company courses stay hidden from everyone else.',
        trueFalseCorrect: null,
        options: [],
        matchItems: [
          {prompt: 'Anyone signed in should be able to take it', correctKey: 'open'},
          {prompt: 'Listed, but locked until they pay or you grant access', correctKey: 'premium'},
          {prompt: 'Only the people you invite should even see it', correctKey: 'company'},
        ],
        matchChoices: [
          {key: 'open', label: 'Open course'},
          {key: 'premium', label: 'Premium course'},
          {key: 'company', label: 'Company course'},
        ],
      },
    ],
  },
]
