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
import { BTS_META } from './types'

export type BtsChapterSeo = {
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

export const BTS_CHAPTERS: BtsChapterSeo[] = [
  {
    num: 1,
    slug: 'why-your-store-exists',
    seoTitle: 'Why Your Online Store Exists',
    seoDescription:
      'Most stores still sell only to human eyes. Learn why yours must serve buyers and the machines choosing for them.',
    h1: 'Why your store exists',
    subtitle: 'The way people buy online has shifted again. Most stores have not caught up.',
    pillars: ['/pillar1'],
    pages: ch01Pages,
  },
  {
    num: 2,
    slug: 'what-you-own-store-safety',
    seoTitle: 'What You Own (and What Keeps Your Store Safe)',
    seoDescription:
      'Domain, catalogue, customers, payment security, and fraud. What you must own before you sell online.',
    h1: 'What you own, and what keeps it safe',
    subtitle: 'Domain, catalogue, customers, and the armour that protects them.',
    pillars: ['/pillar1'],
    pages: ch02Pages,
  },
  {
    num: 3,
    slug: 'product-page-that-sells',
    seoTitle: 'The Anatomy of a Product Page That Sells',
    seoDescription:
      'The four-step structure every product page needs to convince people and the machines reading on their behalf.',
    h1: 'The anatomy of a product page that sells',
    subtitle: 'Every product page that earns money shares the same structure.',
    pillars: ['/pillar1'],
    pages: ch03Pages,
  },
  {
    num: 4,
    slug: 'your-store-pages',
    seoTitle: 'What Pages Your Online Store Needs',
    seoDescription:
      'Which pages your store needs, what each is for, and why shipping and returns pages now sell for you.',
    h1: 'Your pages',
    subtitle: 'Every page earns its place, or it costs you attention.',
    pillars: ['/pillar1'],
    pages: ch04Pages,
  },
  {
    num: 5,
    slug: 'store-features',
    seoTitle: 'E-commerce Features That Win Sales',
    seoDescription:
      'Store features explained: what each one does, how to use it day to day, and where it can grow next.',
    h1: 'Your features',
    subtitle: 'Each feature is a small machine with a job to do.',
    pillars: ['/pillar1'],
    pages: ch05Pages,
  },
  {
    num: 6,
    slug: 'running-your-store-day-to-day',
    seoTitle: 'Running Your Online Store Day to Day',
    seoDescription:
      'Orders, stock honesty, content upkeep, reviews, returns, and the checkout fire drill. The operating rhythm.',
    h1: 'Running it day to day',
    subtitle: 'The operating rhythm that keeps orders flowing and stock honest.',
    pillars: ['/pillar1'],
    pages: ch06Pages,
  },
  {
    num: 7,
    slug: 'store-health-legal-speed',
    seoTitle: 'Store Health, Speed and Australian Law',
    seoDescription:
      'Speed, security, Australian consumer guarantees, honest pricing, privacy, and reviews done properly.',
    h1: 'Keeping it healthy, legal and fast',
    subtitle: 'Money and personal data make the maintenance bar higher.',
    pillars: ['/pillar1'],
    pages: ch07Pages,
  },
  {
    num: 8,
    slug: 'getting-your-store-found',
    seoTitle: 'How to Get Your Store Found (Search and AI)',
    seoDescription:
      'Readable catalogue, relevant content, and trusted signals so search engines and AI assistants can choose you.',
    h1: 'Getting found, by people and by machines',
    subtitle: 'Readable, relevant, trusted — for search engines and assistants.',
    pillars: ['/pillar1'],
    pages: ch08Pages,
  },
  {
    num: 9,
    slug: 'store-as-the-hub',
    seoTitle: 'Your Store as the Hub of Your Business',
    seoDescription:
      'Wire your store to inventory, payments, fulfilment, accounting, and customer memory in one connected system.',
    h1: 'Your store as the hub',
    subtitle: 'One order, one second — and everything behind it connected.',
    pillars: ['/pillar1', '/pillar3'],
    pages: ch09Pages,
  },
  {
    num: 10,
    slug: 'selling-where-buyers-are',
    seoTitle: 'Sell on Marketplaces Without Losing Your Store',
    seoDescription:
      'Marketplaces, social shops, live selling, and agent commerce. Rented land feeds owned ground.',
    h1: 'Selling where the buyers are',
    subtitle: 'Rented land feeds owned ground.',
    pillars: ['/pillar1'],
    pages: ch10Pages,
  },
  {
    num: 11,
    slug: 'using-ai-for-store-content',
    seoTitle: 'Using AI to Run Your Store Content Faster',
    seoDescription:
      'AI prompt pack for product copy, policies, and emails, with truth checks before anything ships.',
    h1: 'Using AI to run the store faster',
    subtitle: 'AI drafts. You verify. The store publishes only what is true.',
    pillars: ['/pillar1', '/pillar5'],
    pages: ch11Pages,
  },
  {
    num: 12,
    slug: 'store-terms-glossary',
    seoTitle: 'E-commerce Terms Explained Plainly',
    seoDescription:
      'Plain-English definitions of e-commerce terms that matter, plus how to request a Store Systems Review.',
    h1: 'Glossary, and who to call',
    subtitle: 'Plain meanings — plus who to talk to when you are ready.',
    pillars: ['/pillar1'],
    pages: ch12Pages,
  },
]

export const BTS_GUIDE_SLUG = BTS_META.slug
export const BTS_HUB_PATH = `/guides/${BTS_GUIDE_SLUG}`
export const BTS_BOOK_PATH = `${BTS_HUB_PATH}/read`

export function btsChapterPath(slug: string): string {
  return `${BTS_HUB_PATH}/${slug}`
}

export function getBtsChapterBySlug(slug: string): BtsChapterSeo | undefined {
  return BTS_CHAPTERS.find((c) => c.slug === slug)
}

export function getBtsChapterByNum(num: number): BtsChapterSeo | undefined {
  return BTS_CHAPTERS.find((c) => c.num === num)
}

export function btsPublicPrerenderRoutes(): string[] {
  return [BTS_HUB_PATH, ...BTS_CHAPTERS.map((c) => btsChapterPath(c.slug))]
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
      id: `bts-glossary-${b.term.toLowerCase().replace(/\s+/g, '-')}`,
      question: `What is ${b.term}?`,
      answer: b.definition,
    }))
}

export { CHAPTER_PAGES }
