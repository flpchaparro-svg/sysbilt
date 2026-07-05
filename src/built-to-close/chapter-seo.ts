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
      'Follow-up has become a system, not a personality trait. See the three leaks and why memory beats more leads.',
    h1: 'Why your business needs a memory',
    subtitle: 'Follow-up is a system now. Most businesses still run it from memory and inbox.',
    pillars: ['/pillar2'],
    pages: ch01Pages,
  },
  {
    num: 2,
    slug: 'what-a-crm-actually-is',
    seoTitle: 'What a CRM Actually Is (and What You Own)',
    seoDescription:
      'Contacts, deals, activities, and ownership rules. Right-sized CRM choice and a clean migration.',
    h1: 'What a CRM actually is, and what you own',
    subtitle: 'Four words that matter, sized honestly, and data you can take with you.',
    pillars: ['/pillar2'],
    pages: ch02Pages,
  },
  {
    num: 3,
    slug: 'anatomy-of-a-pipeline',
    seoTitle: 'The Anatomy of a Pipeline That Closes',
    seoDescription:
      'Stages that mirror reality, entry rules, one owner per deal, and reading the board honestly.',
    h1: 'The anatomy of a pipeline that closes',
    subtitle: 'Stages that mirror reality, not wishful thinking.',
    pillars: ['/pillar2'],
    pages: ch03Pages,
  },
  {
    num: 4,
    slug: 'your-data-keeping-it-clean',
    seoTitle: 'Your CRM Data, and Keeping It Clean',
    seoDescription:
      'Fewer fields, source tagged at birth, one human one record, and the hygiene rhythm that keeps trust.',
    h1: 'Your data, and keeping it clean',
    subtitle: 'Fewer fields, tagged sources, and a rhythm that keeps the CRM trustworthy.',
    pillars: ['/pillar2'],
    pages: ch04Pages,
  },
  {
    num: 5,
    slug: 'your-crm-features',
    seoTitle: 'CRM Features That Win Work',
    seoDescription:
      'Forms, inbox, sequences, tasks, and win-back flows explained: what each does and how to use it.',
    h1: 'Your features',
    subtitle: 'Each feature is a small machine with a job to do.',
    pillars: ['/pillar2'],
    pages: ch05Pages,
  },
  {
    num: 6,
    slug: 'running-crm-day-to-day',
    seoTitle: 'Running Your CRM Day to Day',
    seoDescription:
      'The fifteen-minute morning rhythm, lead-inbox zero, weekly pipeline review, and the fire drill.',
    h1: 'Running it day to day',
    subtitle: 'The operating rhythm that keeps leads answered and the board honest.',
    pillars: ['/pillar2'],
    pages: ch06Pages,
  },
  {
    num: 7,
    slug: 'following-up-without-burning-people',
    seoTitle: 'Following Up Without Burning People',
    seoDescription:
      'Cadence, graceful closes, Australian law, and sender reputation. Follow-up as craft, not pestering.',
    h1: 'Following up without burning people',
    subtitle: 'Cadence, content, stopping, and the machinery underneath your messages.',
    pillars: ['/pillar2'],
    pages: ch07Pages,
  },
  {
    num: 8,
    slug: 'lead-tracking',
    seoTitle: 'Lead Tracking: Where Every Job Came From',
    seoDescription:
      'Which marketing brings work, not just leads. UTMs, call tracking, attribution honesty, and quarterly decisions.',
    h1: 'Lead tracking: knowing where every job came from',
    subtitle: 'Which marketing brings work, not just names in a list.',
    pillars: ['/pillar2', '/pillar7'],
    pages: ch08Pages,
  },
  {
    num: 9,
    slug: 'crm-as-the-hub',
    seoTitle: 'Your CRM as the Hub',
    seoDescription:
      'Wire website, email, phone, quoting, and accounting through the CRM. One lead, start to finish.',
    h1: 'Your CRM as the hub',
    subtitle: 'One lead, start to finish, with everything behind it connected.',
    pillars: ['/pillar2', '/pillar3'],
    pages: ch09Pages,
  },
  {
    num: 10,
    slug: 'getting-your-team-to-use-it',
    seoTitle: 'Getting Your Team to Actually Use the CRM',
    seoDescription:
      'Why CRMs die, design for laziness, owner-first rollout, and growing features without breaking adoption.',
    h1: 'Getting your team to actually use it',
    subtitle: 'Adoption is design. Rollout is discipline.',
    pillars: ['/pillar2'],
    pages: ch10Pages,
  },
  {
    num: 11,
    slug: 'using-ai-for-crm',
    seoTitle: 'Using AI to Run the CRM Faster',
    seoDescription:
      'AI drafts, you approve. Prompt pack for follow-ups, notes, and briefs, with privacy rules that matter.',
    h1: 'Using AI to run the CRM faster',
    subtitle: 'AI drafts. You verify. The CRM records only what is true.',
    pillars: ['/pillar2', '/pillar4'],
    pages: ch11Pages,
  },
  {
    num: 12,
    slug: 'glossary-and-who-to-call',
    seoTitle: 'CRM Terms Explained Plainly',
    seoDescription:
      'Plain-English CRM glossary plus how to request a CRM Systems Review from SYSBILT.',
    h1: 'Glossary, and who to call',
    subtitle: 'Plain meanings — plus who to talk to when you are ready.',
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
