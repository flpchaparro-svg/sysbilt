/** Built-in sample so /learn is clickable before Studio content exists. */

export const SAMPLE_COURSE_ID = 'learnCourse.start-here'
export const SAMPLE_LESSON_1_ID = 'learnLesson.start-system'
export const SAMPLE_LESSON_2_ID = 'learnLesson.start-pile'
export const SAMPLE_LESSON_3_ID = 'learnLesson.start-first-job'

const blocks = (...paras: string[]) =>
  paras.map((text, i) => ({
    _type: 'block',
    _key: `p${i}`,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `s${i}`, text, marks: []}],
  }))

export const SAMPLE_COURSE = {
  _id: SAMPLE_COURSE_ID,
  title: 'Start here',
  slug: 'start-here',
  dek: 'Three short lessons on what a system is, why work piles up, and how to pick one job to fix.',
  access: 'open' as const,
  released: true,
  commentsEnabled: true,
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
    title: 'What a system is',
    slug: 'what-a-system-is',
    order: 1,
    unlockAfterDays: 0,
    videoUrl: null as string | null,
    body: blocks(
      'A system is not software. It is the way a job gets done when you are not standing there.',
      'If only you know the steps, you do not have a system. You have a memory. That is fine until you are busy, sick, or on a job.',
    ),
    activities: [
      {
        _key: 'act-system-tf',
        template: 'trueFalse' as const,
        prompt: 'A system is a way of doing a job the same way each time, without you standing over it.',
        explainAfter: 'Yes. If it only works when you are in the room, it is still a habit sitting on you.',
        trueFalseCorrect: true,
        options: [],
        matchItems: [],
        matchChoices: [],
      },
    ],
  },
  {
    _id: SAMPLE_LESSON_2_ID,
    title: 'Where the pile starts',
    slug: 'where-the-pile-starts',
    order: 2,
    unlockAfterDays: 0,
    videoUrl: null as string | null,
    body: blocks(
      'The pile is not a personality trait. It is the same job arriving again because nobody wrote down what good looks like.',
      'You do not fix the pile by working later. You fix it by taking one repeating job off your head.',
    ),
    activities: [
      {
        _key: 'act-pile-mc',
        template: 'multipleChoice' as const,
        prompt: 'What is the first sign a job has no system?',
        explainAfter: 'The same question coming back is the pile starting. The rest of the business can look fine.',
        trueFalseCorrect: null,
        options: [
          {key: 'a', label: 'People ask you the same question twice', isCorrect: true},
          {key: 'b', label: 'The website looks dated', isCorrect: false},
          {key: 'c', label: 'You hired someone last year', isCorrect: false},
        ],
        matchItems: [],
        matchChoices: [],
      },
    ],
  },
  {
    _id: SAMPLE_LESSON_3_ID,
    title: 'Pick one job',
    slug: 'pick-one-job',
    order: 3,
    unlockAfterDays: 0,
    videoUrl: null as string | null,
    body: blocks(
      'Do not start with a platform. Start with a job you already do every week.',
      'Write the steps as if a new person had to do it on Thursday without ringing you.',
    ),
    activities: [
      {
        _key: 'act-job-match',
        template: 'match' as const,
        prompt: 'Link each situation to the better next step.',
        explainAfter:
          'Start with one job you already do every week. Leave the shiny tools until that job runs without you.',
        trueFalseCorrect: null,
        options: [],
        matchItems: [
          {prompt: 'The same quote request lands in your inbox every Monday', correctKey: 'repeat'},
          {prompt: 'You want an AI assistant because it sounds current', correctKey: 'wait'},
          {prompt: 'A client asks where the file is, again', correctKey: 'memory'},
        ],
        matchChoices: [
          {key: 'repeat', label: 'Turn that job into a system first'},
          {key: 'wait', label: 'Leave it until a real job is systemised'},
          {key: 'memory', label: 'Give the job a home, not another chat'},
        ],
      },
    ],
  },
]
