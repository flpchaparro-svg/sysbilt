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
import { BTM_META } from './types'

export type BtmChapterSeo = {
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

export const BTM_CHAPTERS: BtmChapterSeo[] = [
  {
    num: 1,
    slug: 'why-content-and-why-most-is-wasted',
    seoTitle: 'Why Content, and Why Most of It Is Wasted',
    seoDescription:
      'Making content got cheap. The flood is not the strategy. One job, one system, and why volume without a reason earns nothing.',
    h1: 'Why content, and why most of it is wasted',
    subtitle: 'Making got cheap. The flood is not the strategy.',
    pillars: ['/pillar5'],
    pages: ch01Pages,
  },
  {
    num: 2,
    slug: 'strategy-before-assets',
    seoTitle: 'Strategy Before Assets',
    seoDescription:
      'Who you are talking to, the three jobs content does, investment that follows the job, and a few channels done properly.',
    h1: 'Strategy before assets',
    subtitle: 'Deciding what to make, for whom, and why, before a single asset exists.',
    pillars: ['/pillar5'],
    pages: ch02Pages,
  },
  {
    num: 3,
    slug: 'the-anatomy-of-content-that-works',
    seoTitle: 'The Anatomy of Content That Works',
    seoDescription:
      'Hook, value, action. One idea per piece, native to the room, and why variations are the unit now.',
    h1: 'The anatomy of content that works',
    subtitle: 'Hook, value, action. One idea. Native to the room. Variations as the unit.',
    pillars: ['/pillar5'],
    pages: ch03Pages,
  },
  {
    num: 4,
    slug: 'one-source-many-channels',
    seoTitle: 'One Source, Many Channels',
    seoDescription:
      'The repurposing tree, the content library, templates, and consistency at speed.',
    h1: 'One source, many channels',
    subtitle: 'One source, made once, turned into many pieces across many channels.',
    pillars: ['/pillar5'],
    pages: ch04Pages,
  },
  {
    num: 5,
    slug: 'the-content-toolkit',
    seoTitle: 'The Content Toolkit',
    seoDescription:
      'AI writing, images, video, design, scheduling, capture, analytics, and choosing what you actually need.',
    h1: 'The content toolkit',
    subtitle: 'Each tool is a worker with a job. Choose the few that make your system run.',
    pillars: ['/pillar5'],
    pages: ch05Pages,
  },
  {
    num: 6,
    slug: 'the-production-line-day-to-day',
    seoTitle: 'The Production Line, Day to Day',
    seoDescription:
      'The five-minute idea honestly, batching, three levels of automation, and the human gate.',
    h1: 'The production line, day to day',
    subtitle: 'Fast batched making, on a calendar, through a human gate.',
    pillars: ['/pillar5'],
    pages: ch06Pages,
  },
  {
    num: 7,
    slug: 'keeping-it-honest-legal-and-on-brand',
    seoTitle: 'Keeping Content Honest, Legal and On-Brand',
    seoDescription:
      'Real claims, real proof, rights respected, disclosure, and the brand cost of looking cheap.',
    h1: 'Keeping it honest, legal and on-brand',
    subtitle: 'The discipline that keeps the system premium and safe.',
    pillars: ['/pillar5'],
    pages: ch07Pages,
  },
  {
    num: 8,
    slug: 'knowing-what-works',
    seoTitle: 'Knowing What Works',
    seoDescription:
      'Numbers that match the job, testing variations, AI as researcher, the monthly loop, and vanity metrics.',
    h1: 'Knowing what works',
    subtitle: 'Measure what pays, not what flatters.',
    pillars: ['/pillar5'],
    pages: ch08Pages,
  },
  {
    num: 9,
    slug: 'content-as-part-of-the-system',
    seoTitle: 'Content as Part of the System',
    seoDescription:
      'Content points home, comment-to-lead wiring, CRM tagging, and rented permissions done properly.',
    h1: 'Content as part of the system',
    subtitle: 'The wiring that turns a post into a lead in your business.',
    pillars: ['/pillar5', '/pillar2'],
    pages: ch09Pages,
  },
  {
    num: 10,
    slug: 'growing-it-and-training-the-team',
    seoTitle: 'Growing It, and Training the Team to Run It',
    seoDescription:
      'Tools without training, what the team needs written down, onboarding in a day, scaling without breaking.',
    h1: 'Growing it, and training the team to run it',
    subtitle: 'The human layer that decides whether the system produces or quietly dies.',
    pillars: ['/pillar5', '/pillar6'],
    pages: ch10Pages,
  },
  {
    num: 11,
    slug: 'the-prompt-pack',
    seoTitle: 'The Content Prompt Pack',
    seoDescription:
      'Ten copy-ready briefings for articles, carousels, captions, hooks, repurposing, and analytics.',
    h1: 'The prompt pack',
    subtitle: 'The daily work of a content system, packed into briefings you can copy.',
    pillars: ['/pillar5'],
    pages: ch11Pages,
  },
  {
    num: 12,
    slug: 'glossary-and-who-to-call',
    seoTitle: 'Content Terms Explained Plainly',
    seoDescription:
      'Plain-English content glossary, plus how to request a Content Systems Review from SYSBILT.',
    h1: 'Glossary, and who to call',
    subtitle: 'Plain meanings, plus who to talk to when you are ready.',
    pillars: ['/pillar5'],
    pages: ch12Pages,
  },
]

export const BTM_GUIDE_SLUG = BTM_META.slug
export const BTM_HUB_PATH = `/guides/${BTM_GUIDE_SLUG}`
export const BTM_BOOK_PATH = `${BTM_HUB_PATH}/read`

export function btmChapterPath(slug: string): string {
  return `${BTM_HUB_PATH}/${slug}`
}

export function getBtmChapterBySlug(slug: string): BtmChapterSeo | undefined {
  return BTM_CHAPTERS.find((c) => c.slug === slug)
}

export function getBtmChapterByNum(num: number): BtmChapterSeo | undefined {
  return BTM_CHAPTERS.find((c) => c.num === num)
}

export function btmPublicPrerenderRoutes(): string[] {
  return [BTM_HUB_PATH, ...BTM_CHAPTERS.map((c) => btmChapterPath(c.slug))]
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
      id: `btm-glossary-${b.term.toLowerCase().replace(/\s+/g, '-')}`,
      question: `What is ${b.term}?`,
      answer: b.definition,
    }))
}

export { CHAPTER_PAGES }
