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
import { BSE_META } from './types'

export type BseChapterSeo = {
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

export const BSE_CHAPTERS: BseChapterSeo[] = [
  {
    num: 1,
    slug: 'why-youre-flying-blind-even-with-all-this-data',
    seoTitle: 'Why You\'re Flying Blind, Even With All This Data',
    seoDescription:
      'Too little data or too much scattered data. The rear-view problem, drowning in dashboards, and seeing clearly instead.',
    h1: 'Why you\'re flying blind, even with all this data',
    subtitle: 'The ground has shifted. Seeing clearly is now cheap and achievable.',
    pillars: ['/pillar7'],
    pages: ch01Pages,
  },
  {
    num: 2,
    slug: 'what-you-own-the-data-of-your-business',
    seoTitle: 'What You Own: The Data of Your Business',
    seoDescription:
      'The asset every system was building, owned and exportable data, and shared definitions that decide if numbers are true.',
    h1: 'What you own: the data of your business',
    subtitle: 'Your scattered data is an asset. Definitions decide whether it is truth or nonsense.',
    pillars: ['/pillar7'],
    pages: ch02Pages,
  },
  {
    num: 3,
    slug: 'the-anatomy-of-a-dashboard-that-gets-used',
    seoTitle: 'The Anatomy of a Dashboard That Gets Used',
    seoDescription:
      'One question per view, a handful of numbers, context on every figure, and built for the five-second glance.',
    h1: 'The anatomy of a dashboard that gets used',
    subtitle: 'Built to answer something, not to show everything.',
    pillars: ['/pillar7'],
    pages: ch03Pages,
  },
  {
    num: 4,
    slug: 'the-numbers-that-matter',
    seoTitle: 'The Numbers That Matter',
    seoDescription:
      'Leading versus lagging numbers, the core set most businesses need, and vanity numbers to ignore.',
    h1: 'The numbers that matter',
    subtitle: 'Metric literacy in plain terms.',
    pillars: ['/pillar7'],
    pages: ch04Pages,
  },
  {
    num: 5,
    slug: 'the-dashboard-library',
    seoTitle: 'The Dashboard Library',
    seoDescription:
      'Daily glance, pipeline, marketing, money, operations, and content views, and choosing what you need.',
    h1: 'The dashboard library',
    subtitle: 'A few focused views, each answering one question.',
    pillars: ['/pillar7', '/pillar5'],
    pages: ch05Pages,
  },
  {
    num: 6,
    slug: 'running-it-day-to-day',
    seoTitle: 'Running Dashboards Day to Day',
    seoDescription:
      'Daily, weekly, and monthly rhythms, only show what you will act on, and meetings from one screen.',
    h1: 'Running it day to day',
    subtitle: 'A light rhythm, not a heavy chore.',
    pillars: ['/pillar7'],
    pages: ch06Pages,
  },
  {
    num: 7,
    slug: 'keeping-it-honest',
    seoTitle: 'Keeping Dashboards Honest',
    seoDescription:
      'Garbage in gospel out, definitions held over time, who sees what, and silent failure when connections freeze.',
    h1: 'Keeping it honest',
    subtitle: 'A dashboard that lies convincingly is worse than no dashboard.',
    pillars: ['/pillar7'],
    pages: ch07Pages,
  },
  {
    num: 8,
    slug: 'knowing-where-to-look-and-when',
    seoTitle: 'Knowing Where to Look, and When',
    seoDescription:
      'Alerts and thresholds, anomaly flags, plain-language questions of your data, and forecasts as guidance.',
    h1: 'Knowing where to look, and when',
    subtitle: 'Be told when something needs attention, rather than watching all day.',
    pillars: ['/pillar7', '/pillar4'],
    pages: ch08Pages,
  },
  {
    num: 9,
    slug: 'the-dashboard-as-the-nervous-systems-screen',
    seoTitle: 'The Dashboard as the Nervous System\'s Screen',
    seoDescription:
      'Where the whole connected business becomes visible, one enquiry through the loop, and the pipes behind the screen.',
    h1: 'The dashboard as the nervous system\'s screen',
    subtitle: 'Where the entire connected business finally becomes visible.',
    pillars: ['/pillar7'],
    pages: ch09Pages,
  },
  {
    num: 10,
    slug: 'growing-it-over-time',
    seoTitle: 'Growing Dashboards Over Time',
    seoDescription:
      'See, understand, anticipate: the three stages, build when the decision needs it, grow without over-building.',
    h1: 'Growing it over time',
    subtitle: 'Build what you need, prove it works, let it compound.',
    pillars: ['/pillar7'],
    pages: ch10Pages,
  },
  {
    num: 11,
    slug: 'the-prompt-pack',
    seoTitle: 'The Dashboard Prompt Pack',
    seoDescription:
      'Ten copy-ready briefings for monthly summaries, weekly reviews, channel analysis, and sanity-checking numbers.',
    h1: 'The prompt pack',
    subtitle: 'Briefings that turn numbers into decisions fast.',
    pillars: ['/pillar7'],
    pages: ch11Pages,
  },
  {
    num: 12,
    slug: 'glossary-and-who-to-call',
    seoTitle: 'Dashboard Terms Explained Plainly',
    seoDescription:
      'Plain-English dashboard glossary, plus how to request a Dashboard Systems Review from SYSBILT.',
    h1: 'Glossary, and who to call',
    subtitle: 'Plain meanings, plus who to talk to when you are ready.',
    pillars: ['/pillar7'],
    pages: ch12Pages,
  },
]

export const BSE_GUIDE_SLUG = BSE_META.slug
export const BSE_HUB_PATH = `/guides/${BSE_GUIDE_SLUG}`
export const BSE_BOOK_PATH = `${BSE_HUB_PATH}/read`

export function bseChapterPath(slug: string): string {
  return `${BSE_HUB_PATH}/${slug}`
}

export function getBseChapterBySlug(slug: string): BseChapterSeo | undefined {
  return BSE_CHAPTERS.find((c) => c.slug === slug)
}

export function getBseChapterByNum(num: number): BseChapterSeo | undefined {
  return BSE_CHAPTERS.find((c) => c.num === num)
}

export function bsePublicPrerenderRoutes(): string[] {
  return [BSE_HUB_PATH, ...BSE_CHAPTERS.map((c) => bseChapterPath(c.slug))]
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
      id: `bse-glossary-${b.term.toLowerCase().replace(/\s+/g, '-')}`,
      question: `What is ${b.term}?`,
      answer: b.definition,
    }))
}

export { CHAPTER_PAGES }
