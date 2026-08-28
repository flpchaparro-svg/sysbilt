/**
 * Seed the sample Learn course into Sanity (open, two lessons).
 * Requires SANITY_API_TOKEN or SANITY_API_WRITE_TOKEN in env.
 *
 *   node --experimental-strip-types scripts/learn/seed-sample-course.mjs
 *   # or: npx tsx scripts/learn/seed-sample-course.mjs
 */
import {createClient} from '@sanity/client'

const token = (
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_AUTH_TOKEN ||
  ''
).trim()

if (!token) {
  console.error('Set SANITY_API_TOKEN (write) before seeding.')
  process.exit(1)
}

const client = createClient({
  projectId: 'wdlc9pg8',
  dataset: 'production',
  apiVersion: '2024-02-20',
  token,
  useCdn: false,
})

const COURSE_ID = 'learnCourse.sample-how-learn-works'
const L1 = 'learnLesson.sample-welcome'
const L2 = 'learnLesson.sample-activities'

function block(key, text) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `${key}s`, text, marks: []}],
  }
}

const course = {
  _id: COURSE_ID,
  _type: 'learnCourse',
  title: 'How Learn works',
  slug: {_type: 'slug', current: 'how-learn-works'},
  dek: 'A short walkthrough of progress, activities, and how a lesson feels on this membership.',
  access: 'open',
  released: true,
  commentsEnabled: false,
  order: 1,
}

const lesson1 = {
  _id: L1,
  _type: 'learnLesson',
  course: {_type: 'reference', _ref: COURSE_ID},
  title: 'Welcome to a lesson',
  slug: {_type: 'slug', current: 'welcome'},
  order: 1,
  unlockAfterDays: 0,
  body: [
    block(
      'b1',
      'This is a lesson. Watch a video when you add one, read the notes, then complete the activity. Your progress saves so you can pick up here next time.',
    ),
  ],
  activities: [
    {
      _type: 'learnActivity',
      _key: 'act-tf-1',
      template: 'trueFalse',
      prompt: 'Progress on a lesson is saved so you can return later.',
      explainAfter: 'Yes. Completing an activity, or marking a lesson done, writes to your account.',
      trueFalseCorrect: true,
    },
  ],
}

const lesson2 = {
  _id: L2,
  _type: 'learnLesson',
  course: {_type: 'reference', _ref: COURSE_ID},
  title: 'Try the activity templates',
  slug: {_type: 'slug', current: 'activities'},
  order: 2,
  unlockAfterDays: 0,
  body: [
    block(
      'b2',
      'Each lesson can reuse the same activity templates with different copy: true or false, a single best answer, or matching a case to the right idea.',
    ),
  ],
  activities: [
    {
      _type: 'learnActivity',
      _key: 'act-mc-1',
      template: 'multipleChoice',
      prompt: 'Which of these is the point of a lesson activity?',
      explainAfter: 'Activities check that the idea landed, then explain the right answer.',
      options: [
        {_key: 'oa', key: 'a', label: 'Fill time on the page', isCorrect: false},
        {_key: 'ob', key: 'b', label: 'Check the idea landed, then explain', isCorrect: true},
        {_key: 'oc', key: 'c', label: 'Replace the video', isCorrect: false},
      ],
    },
    {
      _type: 'learnActivity',
      _key: 'act-match-1',
      template: 'match',
      prompt: 'Link each situation to the best next step.',
      explainAfter:
        'Open courses start at once. Premium sits in the catalogue until you are entitled. Company courses stay hidden from everyone else.',
      matchItems: [
        {_key: 'm1', prompt: 'Anyone signed in should be able to take it', correctKey: 'open'},
        {
          _key: 'm2',
          prompt: 'Listed, but locked until they pay or you grant access',
          correctKey: 'premium',
        },
        {_key: 'm3', prompt: 'Only the people you invite should even see it', correctKey: 'company'},
      ],
      matchChoices: [
        {_key: 'c1', key: 'open', label: 'Open course'},
        {_key: 'c2', key: 'premium', label: 'Premium course'},
        {_key: 'c3', key: 'company', label: 'Company course'},
      ],
    },
  ],
}

const tx = client.transaction().createOrReplace(course).createOrReplace(lesson1).createOrReplace(lesson2)
await tx.commit()
console.log('Seeded How Learn works (open, two lessons).')
