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
import { BTC_META } from './types'

export type BtcChapterSeo = {
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

/** Flatten flow segments for a chapter (skip openers and fixed layouts). */
export function extractChapterBlocks(pages: BtwPage[]): BtwBlock[] {
  const blocks: BtwBlock[] = []
  for (const page of pages) {
    const isFlow = page.layout === 'flow' || (!page.layout && page.blocks.length > 0)
    if (isFlow) blocks.push(...page.blocks)
  }
  return blocks
}

export const BTC_CHAPTERS: BtcChapterSeo[] = [
  {
    num: 1,
    slug: 'why-your-business-needs-a-memory',
    seoTitle: 'Why Your Business Needs a Memory',
    seoDescription:
      'Follow-up has become a system, not a personality trait. Why leads leak and how a CRM becomes the memory of your business.',
    h1: 'Why your business needs a memory',
    subtitle: 'The way businesses win work has shifted. Memory does not scale, and discipline runs out when you get busy.',
    pillars: ['/pillar2'],
    pages: ch01Pages,
  },
  {
    num: 2,
    slug: 'what-a-crm-actually-is',
    seoTitle: 'What a CRM Actually Is (and What You Own)',
    seoDescription:
      'Contacts, deals, activities, and ownership rules. Right-sized CRM choice and a clean migration for Australian businesses.',
    h1: 'What a CRM actually is, and what you own',
    subtitle: 'Four words underneath every CRM, an honest sizing conversation, and the ownership rules.',
    pillars: ['/pillar2'],
    pages: ch02Pages,
  },
  {
    num: 3,
    slug: 'anatomy-of-a-pipeline',
    seoTitle: 'The Anatomy of a Pipeline That Closes',
    seoDescription:
      'Stages that mirror reality, entry rules, one owner per deal, and reading the board for honest forecasts.',
    h1: 'The anatomy of a pipeline that closes',
    subtitle: 'Built well, the pipeline is the most honest page in the business.',
    pillars: ['/pillar2'],
    pages: ch03Pages,
  },
  {
    num: 4,
    slug: 'your-data-and-keeping-it-clean',
    seoTitle: 'Your CRM Data, and Keeping It Clean',
    seoDescription:
      'Fewer fields, source tagged at capture, one human one record, and the hygiene rhythm that keeps the memory trustworthy.',
    h1: 'Your data, and keeping it clean',
    subtitle: 'The shortest chapter and the heaviest per page.',
    pillars: ['/pillar2'],
    pages: ch04Pages,
  },
  {
    num: 5,
    slug: 'your-crm-features',
    seoTitle: 'CRM Features That Win Work',
    seoDescription:
      'Forms, inbox, sequences, tasks, and win-back flows explained: what each does, how to use it, and where it grows next.',
    h1: 'Your features',
    subtitle: 'Each feature is a small machine with one job.',
    pillars: ['/pillar2', '/pillar3'],
    pages: ch05Pages,
  },
  {
    num: 6,
    slug: 'running-it-day-to-day',
    seoTitle: 'Running Your CRM Day to Day',
    seoDescription:
      'The fifteen-minute morning rhythm, lead-inbox zero, weekly pipeline review, zombie deals, and the lead fire drill.',
    h1: 'Running it day to day',
    subtitle: 'A short daily rhythm, one honest weekly ritual, and a handful of reflexes.',
    pillars: ['/pillar2'],
    pages: ch06Pages,
  },
  {
    num: 7,
    slug: 'following-up-without-burning-people',
    seoTitle: 'Following Up Without Burning People',
    seoDescription:
      'Persistent versus pest, follow-up cadence, graceful closes, Australian law, and sender reputation explained plainly.',
    h1: 'Following up without burning people',
    subtitle: 'Rails can carry warmth or spam with equal efficiency.',
    pillars: ['/pillar2'],
    pages: ch07Pages,
  },
  {
    num: 8,
    slug: 'lead-tracking',
    seoTitle: 'Lead Tracking: Where Every Job Came From',
    seoDescription:
      'Source at capture, UTMs, first versus last touch, the dark funnel, and quarterly budget decisions from won revenue.',
    h1: 'Lead tracking: knowing where every job came from',
    subtitle: 'Which marketing actually turns into paid work.',
    pillars: ['/pillar2', '/pillar7'],
    pages: ch08Pages,
  },
  {
    num: 9,
    slug: 'your-crm-as-the-hub',
    seoTitle: 'Your CRM as the Hub of Your Business',
    seoDescription:
      'Wire website, inbox, phone, quoting, accounting, and reporting so one lead moves from enquiry to invoice without ferrying.',
    h1: 'Your CRM as the hub',
    subtitle: 'The memory awake, connected, and acting.',
    pillars: ['/pillar2', '/pillar3'],
    pages: ch09Pages,
  },
  {
    num: 10,
    slug: 'getting-your-team-to-use-it',
    seoTitle: 'Getting Your Team to Actually Use the CRM',
    seoDescription:
      'Why CRMs die, design for laziness, owner-first rollout, role-shaped training, and growing without over-building.',
    h1: 'Getting your team to actually use it',
    subtitle: 'Everything promised is multiplied by whether the thing gets used.',
    pillars: ['/pillar2', '/pillar6'],
    pages: ch10Pages,
  },
  {
    num: 11,
    slug: 'using-ai-to-run-the-crm-faster',
    seoTitle: 'Using AI to Run the CRM Faster',
    seoDescription:
      'AI note-takers, privacy rules, and a CRM prompt pack for follow-ups, re-engagement, and meeting prep.',
    h1: 'Using AI to run the CRM faster',
    subtitle: 'AI drafts. You decide. Nothing sends itself.',
    pillars: ['/pillar2', '/pillar4'],
    pages: ch11Pages,
  },
  {
    num: 12,
    slug: 'glossary-and-who-to-call',
    seoTitle: 'CRM Terms Explained Plainly',
    seoDescription:
      'Plain-English CRM and follow-up glossary, plus how to request a CRM Systems Review from SYSBILT.',
    h1: 'Glossary, and who to call',
    subtitle: 'Plain meanings, plus who to talk to when you are ready.',
    pillars: ['/pillar2'],
    pages: ch12Pages,
  },
]

export const BTC_GUIDE_SLUG = BTC_META.slug
export const BTC_HUB_PATH = `/guides/${BTC_GUIDE_SLUG}`
export const BTC_BOOK_PATH = `${BTC_HUB_PATH}/read`

export function btcChapterPath(slug: string): string {
  return `${BTC_HUB_PATH}/${slug}`
}

export function getBtcChapterBySlug(slug: string): BtcChapterSeo | undefined {
  return BTC_CHAPTERS.find((c) => c.slug === slug)
}

export function getBtcChapterByNum(num: number): BtcChapterSeo | undefined {
  return BTC_CHAPTERS.find((c) => c.num === num)
}

export function btcPublicPrerenderRoutes(): string[] {
  return [BTC_HUB_PATH, ...BTC_CHAPTERS.map((c) => btcChapterPath(c.slug))]
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

/** Glossary entries from ch12 blocks for FAQPage JSON-LD. */
export function extractGlossaryFaqs(blocks: BtwBlock[]): { id: string; question: string; answer: string }[] {
  return blocks
    .filter((b): b is Extract<BtwBlock, { type: 'glossaryEntry' }> => b.type === 'glossaryEntry')
    .map((b) => ({
      id: `btc-glossary-${b.term.toLowerCase().replace(/\s+/g, '-')}`,
      question: `What is ${b.term}?`,
      answer: b.definition,
    }))
}

export { CHAPTER_PAGES }
