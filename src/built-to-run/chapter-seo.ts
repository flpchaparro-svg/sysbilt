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
import { BTR_META } from './types'

export type BtrChapterSeo = {
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

export const BTR_CHAPTERS: BtrChapterSeo[] = [
  {
    num: 1,
    slug: 'why-your-business-drowns-in-admin',
    seoTitle: 'Why Your Business Drowns in Admin',
    seoDescription:
      'Admin has become optional. Why growing businesses stall when the owner becomes human glue, and what automation actually is.',
    h1: 'Why your business drowns in admin, and does not have to',
    subtitle: 'The most tiring part of running a business has just become optional.',
    pillars: ['/pillar3'],
    pages: ch01Pages,
  },
  {
    num: 2,
    slug: 'what-an-automation-is',
    seoTitle: 'What an Automation Is (and What You Own)',
    seoDescription:
      'Triggers, steps, conditions, and actions. Webhooks, platform sizing, and ownership rules for your automation logic.',
    h1: 'What an automation is, and what you own',
    subtitle: 'Four parts underneath every canvas of boxes and arrows.',
    pillars: ['/pillar3'],
    pages: ch02Pages,
  },
  {
    num: 3,
    slug: 'anatomy-of-an-automation',
    seoTitle: 'The Anatomy of an Automation That Works',
    seoDescription:
      'One job per workflow, precise triggers, failure paths, and building automations legible to the next person.',
    h1: 'The anatomy of an automation that works',
    subtitle: 'The canyon between a demo and something that works every night.',
    pillars: ['/pillar3'],
    pages: ch03Pages,
  },
  {
    num: 4,
    slug: 'finding-what-to-automate',
    seoTitle: 'Finding What to Automate',
    seoDescription:
      'The week audit, rule of three, what never gets automated, and quick wins before deep builds.',
    h1: 'Finding what to automate',
    subtitle: 'The answer is hiding in your own week.',
    pillars: ['/pillar3'],
    pages: ch04Pages,
  },
  {
    num: 5,
    slug: 'the-automation-library',
    seoTitle: 'The Automation Library: 30+ Workflows to Steal',
    seoDescription:
      'Ready-made automation ideas for leads, marketing, operations, customer service, and reporting.',
    h1: 'The automation library',
    subtitle: 'Raid it rather than read it.',
    pillars: ['/pillar3', '/pillar2'],
    pages: ch05Pages,
  },
  {
    num: 6,
    slug: 'running-automations-day-to-day',
    seoTitle: 'Running Automations Day to Day',
    seoDescription:
      'Human in the loop, drafts not sends, the two-minute daily check, and the workflow fire drill.',
    h1: 'Running it day to day, and the human in the loop',
    subtitle: 'The machines prepare. The humans approve.',
    pillars: ['/pillar3'],
    pages: ch06Pages,
  },
  {
    num: 7,
    slug: 'keeping-automations-healthy',
    seoTitle: 'Keeping Automations Healthy, Safe and Legal',
    seoDescription:
      'Staging, credentials, backups, decay, rate limits, and Australian law when machines act for you.',
    h1: 'Keeping it healthy, safe and legal',
    subtitle: 'The machinery sits in a moving world.',
    pillars: ['/pillar3'],
    pages: ch07Pages,
  },
  {
    num: 8,
    slug: 'when-automations-think',
    seoTitle: 'When Automations Think: Adding AI',
    seoDescription:
      'Where AI belongs in a flow, the hype tax, agents honestly, and cost discipline for thinking steps.',
    h1: 'When automations think: adding AI',
    subtitle: 'Rules for the machine work. AI for the reading and drafting.',
    pillars: ['/pillar3', '/pillar4'],
    pages: ch08Pages,
  },
  {
    num: 9,
    slug: 'your-automations-as-the-nervous-system',
    seoTitle: 'Your Automations as the Nervous System',
    seoDescription:
      'The connected business: the enquiry that arrives with its homework done, and the engineering underneath.',
    h1: 'Your automations as the nervous system',
    subtitle: 'The wiring itself, not another spoke.',
    pillars: ['/pillar3', '/pillar2'],
    pages: ch09Pages,
  },
  {
    num: 10,
    slug: 'growing-automations-over-time',
    seoTitle: 'Growing Automations Over Time',
    seoDescription:
      'Start with what stings, split workflows, platform crossover economics, and the team layer.',
    h1: 'Growing it over time',
    subtitle: 'One reflex at a time, each earning its place.',
    pillars: ['/pillar3', '/pillar6'],
    pages: ch10Pages,
  },
  {
    num: 11,
    slug: 'using-ai-to-build-automations',
    seoTitle: 'Using AI to Build Automations Faster',
    seoDescription:
      'Automation prompt pack for specifications, failure paths, diagnosis, documentation, and go-live review.',
    h1: 'Using AI to build automations faster',
    subtitle: 'Describing is the new building.',
    pillars: ['/pillar3', '/pillar4'],
    pages: ch11Pages,
  },
  {
    num: 12,
    slug: 'glossary-and-who-to-call',
    seoTitle: 'Automation Terms Explained Plainly',
    seoDescription:
      'Plain-English automation glossary, plus how to request an Automation Systems Review from SYSBILT.',
    h1: 'Glossary, and who to call',
    subtitle: 'Plain meanings, plus who to talk to when you are ready.',
    pillars: ['/pillar3'],
    pages: ch12Pages,
  },
]

export const BTR_GUIDE_SLUG = BTR_META.slug
export const BTR_HUB_PATH = `/guides/${BTR_GUIDE_SLUG}`
export const BTR_BOOK_PATH = `${BTR_HUB_PATH}/read`

export function btrChapterPath(slug: string): string {
  return `${BTR_HUB_PATH}/${slug}`
}

export function getBtrChapterBySlug(slug: string): BtrChapterSeo | undefined {
  return BTR_CHAPTERS.find((c) => c.slug === slug)
}

export function getBtrChapterByNum(num: number): BtrChapterSeo | undefined {
  return BTR_CHAPTERS.find((c) => c.num === num)
}

export function btrPublicPrerenderRoutes(): string[] {
  return [BTR_HUB_PATH, ...BTR_CHAPTERS.map((c) => btrChapterPath(c.slug))]
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
      id: `btr-glossary-${b.term.toLowerCase().replace(/\s+/g, '-')}`,
      question: `What is ${b.term}?`,
      answer: b.definition,
    }))
}

export { CHAPTER_PAGES }
