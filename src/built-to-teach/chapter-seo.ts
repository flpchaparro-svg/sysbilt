import type { BtwBlock, BtwPage } from './types'
import { ch01Pages } from './chapters/ch01'
import { ch02Pages } from './chapters/ch02'
import { ch03Pages } from './chapters/ch03'
import { ch04Pages } from './chapters/ch04'
import { ch05Pages } from './chapters/ch05'
import { ch06Pages } from './chapters/ch06'
import { ch07Pages } from './chapters/ch07'
import { ch08Pages } from './chapters/ch08'
import { ch09Pages } from './chapters/ch09'
import { ch10Pages } from './chapters/ch10'
import { ch11Pages } from './chapters/ch11'
import { ch12Pages } from './chapters/ch12'
import { BTE_META } from './types'

export type BteChapterSeo = {
  num: number
  slug: string
  seoTitle: string
  seoDescription: string
  h1: string
  subtitle?: string
  pillars: string[]
  pages: BtwPage[]
}

const CHAPTER_PAGES: BtwPage[][] = [
  ch01Pages,
  ch02Pages,
  ch03Pages,
  ch04Pages,
  ch05Pages,
  ch06Pages,
  ch07Pages,
  ch08Pages,
  ch09Pages,
  ch10Pages,
  ch11Pages,
  ch12Pages,
]

export function extractChapterBlocks(pages: BtwPage[]): BtwBlock[] {
  const blocks: BtwBlock[] = []
  for (const page of pages) {
    const isFlow = page.layout === 'flow' || (!page.layout && page.blocks.length > 0)
    if (isFlow) blocks.push(...page.blocks)
  }
  return blocks
}

export const BTE_CHAPTERS: BteChapterSeo[] = [
  {
    num: 1,
    slug: 'why-good-systems-fail-without-trained-people',
    seoTitle: 'Why Good Systems Fail Without Trained People',
    seoDescription:
      'Training got cheap. The bottleneck is not production. One job, adoption, and why knowledge trapped in heads is the real risk.',
    h1: 'Why good systems fail without trained people',
    subtitle: 'Training got cheap. Adoption is the real point of failure.',
    pillars: ['/pillar6'],
    pages: ch01Pages,
  },
  {
    num: 2,
    slug: 'what-you-actually-own-the-knowledge-of-the-business',
    seoTitle: 'What You Actually Own: The Knowledge of the Business',
    seoDescription:
      'The asset nobody wrote down, the single source of truth, and key-person risk when knowledge lives only in heads.',
    h1: 'What you actually own: the knowledge of the business',
    subtitle: 'Your most valuable asset is stored in the least secure place.',
    pillars: ['/pillar6'],
    pages: ch02Pages,
  },
  {
    num: 3,
    slug: 'the-anatomy-of-training-that-sticks',
    seoTitle: 'The Anatomy of Training That Sticks',
    seoDescription:
      'One skill at a time, show then do then check, short and close to need, spaced repetition, and confirming it landed.',
    h1: 'The anatomy of training that sticks',
    subtitle: 'Built to be remembered, not just delivered.',
    pillars: ['/pillar6'],
    pages: ch03Pages,
  },
  {
    num: 4,
    slug: 'capturing-whats-in-peoples-heads',
    seoTitle: 'Capturing What Is in People\'s Heads',
    seoDescription:
      'Record while doing, voice and screen turned into materials, and the document-as-you-go habit.',
    h1: 'Capturing what\'s in people\'s heads',
    subtitle: 'A conversation and a recording, not a documentation project.',
    pillars: ['/pillar6'],
    pages: ch04Pages,
  },
  {
    num: 5,
    slug: 'the-format-library',
    seoTitle: 'The Training Format Library',
    seoDescription:
      'Procedures, videos, podcasts, infographics, quizzes, avatar presenters, and when in-person still earns its place.',
    h1: 'The format library',
    subtitle: 'Same knowledge, the shape that suits the person and the moment.',
    pillars: ['/pillar6'],
    pages: ch05Pages,
  },
  {
    num: 6,
    slug: 'running-it-day-to-day',
    seoTitle: 'Running Training Day to Day',
    seoDescription:
      'Training in the flow of work, look it up first, and the update ritual that keeps materials trusted.',
    h1: 'Running it day to day',
    subtitle: 'A light habit, not a heavy project.',
    pillars: ['/pillar6'],
    pages: ch06Pages,
  },
  {
    num: 7,
    slug: 'the-training-agent-a-teacher-that-never-sleeps',
    seoTitle: 'The Training Agent: A Teacher That Never Sleeps',
    seoDescription:
      'A number you can ring, learning by asking, and why the agent is only as good as the knowledge behind it.',
    h1: 'The training agent: a teacher that never sleeps',
    subtitle: 'The interface is easy. The knowledge is the product.',
    pillars: ['/pillar6', '/pillar4'],
    pages: ch07Pages,
  },
  {
    num: 8,
    slug: 'onboarding-from-first-day-to-independent',
    seoTitle: 'Onboarding: From First Day to Independent',
    seoDescription:
      'Ready before they arrive, a path not a firehose, the blend that works, and time to independent.',
    h1: 'Onboarding: from first day to independent',
    subtitle: 'Done once, serves every future starter.',
    pillars: ['/pillar6'],
    pages: ch08Pages,
  },
  {
    num: 9,
    slug: 'change-management-rolling-out-new-systems-without-the-revolt',
    seoTitle: 'Change Management Without the Revolt',
    seoDescription:
      'Why people resist, explain why before how, support generously then commit fully, and shipping change with its story.',
    h1: 'Change management: rolling out new systems without the revolt',
    subtitle: 'The hinge every technology investment turns on.',
    pillars: ['/pillar6', '/pillar3'],
    pages: ch09Pages,
  },
  {
    num: 10,
    slug: 'growing-it-and-knowing-it-works',
    seoTitle: 'Growing It, and Knowing It Works',
    seoDescription:
      'Signals you can read, the library that compounds, keeping it alive, and growing without over-building.',
    h1: 'Growing it, and knowing it works',
    subtitle: 'Measure what matters. Let it compound.',
    pillars: ['/pillar6'],
    pages: ch10Pages,
  },
  {
    num: 11,
    slug: 'the-prompt-pack',
    seoTitle: 'The Training Prompt Pack',
    seoDescription:
      'Ten copy-ready briefings for procedures, quizzes, podcasts, change packs, onboarding paths, and gap spotting.',
    h1: 'The prompt pack',
    subtitle: 'Briefings that turn captured knowledge into training fast.',
    pillars: ['/pillar6'],
    pages: ch11Pages,
  },
  {
    num: 12,
    slug: 'glossary-and-who-to-call',
    seoTitle: 'Training Terms Explained Plainly',
    seoDescription:
      'Plain-English training glossary, plus how to request a Training Systems Review from SYSBILT.',
    h1: 'Glossary, and who to call',
    subtitle: 'Plain meanings, plus who to talk to when you are ready.',
    pillars: ['/pillar6'],
    pages: ch12Pages,
  },
]

export const BTE_GUIDE_SLUG = BTE_META.slug
export const BTE_HUB_PATH = `/guides/${BTE_GUIDE_SLUG}`
export const BTE_BOOK_PATH = `${BTE_HUB_PATH}/read`

export function bteChapterPath(slug: string): string {
  return `${BTE_HUB_PATH}/${slug}`
}

export function getBteChapterBySlug(slug: string): BteChapterSeo | undefined {
  return BTE_CHAPTERS.find((c) => c.slug === slug)
}

export function getBteChapterByNum(num: number): BteChapterSeo | undefined {
  return BTE_CHAPTERS.find((c) => c.num === num)
}

export function btePublicPrerenderRoutes(): string[] {
  return [BTE_HUB_PATH, ...BTE_CHAPTERS.map((c) => bteChapterPath(c.slug))]
}

const PILLAR_LABELS: Record<string, string> = {
  '/pillar1': 'Websites & E-commerce',
  '/pillar2': 'CRM & Lead Tracking',
  '/pillar3': 'Automation',
  '/pillar4': 'AI Assistants',
  '/pillar5': 'Content Systems',
  '/pillar6': 'Team Training',
  '/pillar7': 'Dashboards & Reporting',
}

export function pillarLabel(path: string): string {
  return PILLAR_LABELS[path] ?? path
}

export function extractGlossaryFaqs(blocks: BtwBlock[]): { id: string; question: string; answer: string }[] {
  return blocks
    .filter((b): b is Extract<BtwBlock, { type: 'glossaryEntry' }> => b.type === 'glossaryEntry')
    .map((b) => ({
      id: `bte-glossary-${b.term.toLowerCase().replace(/\s+/g, '-')}`,
      question: `What is ${b.term}?`,
      answer: b.definition,
    }))
}

export { CHAPTER_PAGES }
