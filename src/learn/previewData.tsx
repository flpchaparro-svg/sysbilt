import {createContext, useContext, type ReactNode} from 'react'
import type {CatalogueCourse, CourseOutlineLesson, LessonPayload, PublicActivity} from './types'

const tf: PublicActivity = {
  _key: 'act-tf-1',
  template: 'trueFalse',
  prompt: 'Progress on a lesson is saved so you can return later.',
  explainAfter: 'Yes. Completing an activity, or marking a lesson done, writes to your account.',
  options: [],
  matchItems: [],
  matchChoices: [],
}

const mc: PublicActivity = {
  _key: 'act-mc-1',
  template: 'multipleChoice',
  prompt: 'Which of these is the point of a lesson activity?',
  explainAfter: 'Activities check that the idea landed, then explain the right answer.',
  options: [
    {key: 'a', label: 'Fill time on the page'},
    {key: 'b', label: 'Check the idea landed, then explain'},
    {key: 'c', label: 'Replace the video'},
  ],
  matchItems: [],
  matchChoices: [],
}

const match: PublicActivity = {
  _key: 'act-match-1',
  template: 'match',
  prompt: 'Link each situation to the best next step.',
  explainAfter:
    'Open courses start at once. Premium sits in the catalogue until you are entitled. Company courses stay hidden from everyone else.',
  options: [],
  matchItems: [
    {prompt: 'Anyone signed in should be able to take it'},
    {prompt: 'Listed, but locked until they pay or you grant access'},
    {prompt: 'Only the people you invite should even see it'},
  ],
  matchChoices: [
    {key: 'open', label: 'Open course'},
    {key: 'premium', label: 'Premium course'},
    {key: 'company', label: 'Company course'},
  ],
}

function block(text: string) {
  return [
    {
      _type: 'block',
      _key: 'b1',
      style: 'normal',
      markDefs: [],
      children: [{_type: 'span', _key: 's1', text, marks: []}],
    },
  ]
}

export const PREVIEW_COURSE: CatalogueCourse = {
  id: 'preview-course',
  title: 'How Learn works',
  slug: 'how-learn-works',
  dek: 'A short walkthrough of progress, activities, and how a lesson feels on this membership.',
  access: 'open',
  coverUrl: null,
  commentsEnabled: true,
  locked: false,
  entitled: true,
  hasPrice: false,
  completedLessons: 0,
  continueLessonId: null,
}

export const PREVIEW_OUTLINE: CourseOutlineLesson[] = [
  {id: 'l1', title: 'Welcome to a lesson', slug: 'welcome', order: 1, unlocked: true, unlockAfterDays: 0, completed: false},
  {id: 'l2', title: 'Try the activity templates', slug: 'activities', order: 2, unlocked: true, unlockAfterDays: 0, completed: false},
]

export const PREVIEW_LOCKED: CatalogueCourse = {
  id: 'preview-premium',
  title: 'Client workshop (sample lock)',
  slug: 'client-workshop',
  dek: 'This card shows how a premium course looks when it is listed but locked.',
  access: 'premium',
  coverUrl: null,
  commentsEnabled: false,
  locked: true,
  entitled: false,
  hasPrice: false,
  completedLessons: 0,
  continueLessonId: null,
}

export function previewLesson(slug: string): LessonPayload | null {
  if (slug === 'welcome') {
    return {
      course: {id: PREVIEW_COURSE.id, title: PREVIEW_COURSE.title, slug: PREVIEW_COURSE.slug, commentsEnabled: true},
      lesson: {
        id: 'l1',
        title: 'Welcome to a lesson',
        slug: 'welcome',
        order: 1,
        videoUrl: null,
        body: block(
          'This is a lesson. Watch a video when you add one, read the notes, then complete the activity. Your progress saves so you can pick up here next time.',
        ),
        activities: [tf],
      },
      completed: false,
      attempts: {},
      prev: null,
      next: {slug: 'activities', title: 'Try the activity templates'},
    }
  }
  if (slug === 'activities') {
    return {
      course: {id: PREVIEW_COURSE.id, title: PREVIEW_COURSE.title, slug: PREVIEW_COURSE.slug, commentsEnabled: true},
      lesson: {
        id: 'l2',
        title: 'Try the activity templates',
        slug: 'activities',
        order: 2,
        videoUrl: null,
        body: block(
          'Each lesson can reuse the same activity templates with different copy: true or false, a single best answer, or matching a case to the right idea.',
        ),
        activities: [mc, match],
      },
      completed: false,
      attempts: {},
      prev: {slug: 'welcome', title: 'Welcome to a lesson'},
      next: null,
    }
  }
  return null
}

export function gradePreview(
  activityKey: string,
  answers: unknown,
): {score: number; passed: boolean; explainAfter: string | null} {
  if (activityKey === 'act-tf-1') {
    const value = typeof answers === 'boolean' ? answers : false
    return {score: value ? 100 : 0, passed: value === true, explainAfter: tf.explainAfter}
  }
  if (activityKey === 'act-mc-1') {
    const key = typeof answers === 'string' ? answers : (answers as {key?: string})?.key
    const passed = key === 'b'
    return {score: passed ? 100 : 0, passed, explainAfter: mc.explainAfter}
  }
  const map = answers && typeof answers === 'object' && !Array.isArray(answers) ? (answers as Record<string, string>) : {}
  const ok = map['0'] === 'open' && map['1'] === 'premium' && map['2'] === 'company'
  return {score: ok ? 100 : 0, passed: ok, explainAfter: match.explainAfter}
}

type LearnPreview = {enabled: boolean}

const LearnPreviewContext = createContext<LearnPreview>({enabled: false})

export function LearnPreviewProvider({
  enabled,
  children,
}: {
  enabled: boolean
  children: ReactNode
}) {
  return <LearnPreviewContext.Provider value={{enabled}}>{children}</LearnPreviewContext.Provider>
}

export function useLearnPreview(): boolean {
  return useContext(LearnPreviewContext).enabled
}
