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
import { BTW_META } from './types'

export type BtwChapterSeo = {
  num: number
  slug: string
  seoTitle: string
  seoDescription: string
  h1: string
  subtitle?: string
  /** Related pillar routes for footer / service links */
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

export const BTW_CHAPTERS: BtwChapterSeo[] = [
  {
    num: 1,
    slug: 'what-a-business-website-is-for',
    seoTitle: 'What a Business Website Is Actually For',
    seoDescription:
      'Most business websites sit online and do nothing. Here is what a website is really for, and why the businesses that treat it as a system pull ahead.',
    h1: 'Why your business website exists',
    subtitle:
      'The way websites get built, and what a website is even for, has just changed. Most businesses have not caught up.',
    pillars: ['/pillar1'],
    pages: ch01Pages,
  },
  {
    num: 2,
    slug: 'do-you-own-your-website',
    seoTitle: 'Do You Actually Own Your Website?',
    seoDescription:
      'Domain, hosting, code and the accounts behind them. What you must own outright, and how to keep your website secure.',
    h1: 'What you own, and what keeps it safe',
    subtitle: 'Most owners assume they own their website. Plenty find out too late that they do not.',
    pillars: ['/pillar1'],
    pages: ch02Pages,
  },
  {
    num: 3,
    slug: 'web-page-that-converts',
    seoTitle: 'The Anatomy of a Web Page That Converts',
    seoDescription:
      'Every page that brings in business shares the same four-part structure. How to build a web page that turns visitors into enquiries.',
    h1: 'The anatomy of a page that converts',
    subtitle:
      'Every page that brings in business shares the same shape. Once you see it, you cannot unsee it.',
    pillars: ['/pillar1'],
    pages: ch03Pages,
  },
  {
    num: 4,
    slug: 'pages-a-business-website-needs',
    seoTitle: 'What Pages Does a Business Website Need?',
    seoDescription:
      'A lead-generation website is lean. The pages you actually need, what each one is for, and the ones you can leave out.',
    h1: 'The pages your website needs',
    subtitle: 'A lead-generation site is lean. Every page earns its place, or it goes.',
    pillars: ['/pillar1'],
    pages: ch04Pages,
  },
  {
    num: 5,
    slug: 'business-website-features',
    seoTitle: 'Website Features That Win Work',
    seoDescription:
      'Contact forms wired to your CRM, booking calendars, AI chat, speed to lead and more. The website features that actually bring in clients.',
    h1: 'Your website features',
    subtitle: 'Your website is built from small machines. Each one has a job to do.',
    pillars: ['/pillar1', '/pillar2', '/pillar3'],
    pages: ch05Pages,
  },
  {
    num: 6,
    slug: 'running-your-website-day-to-day',
    seoTitle: 'Running Your Website Day to Day',
    seoDescription:
      'The simple habits that keep a website sharp and the leads moving, plus a fire drill for when something looks broken.',
    h1: 'Running your website day to day',
    subtitle:
      'A website that works is a website that gets used. Here is the handful of things worth doing well.',
    pillars: ['/pillar1'],
    pages: ch06Pages,
  },
  {
    num: 7,
    slug: 'website-maintenance-speed-accessibility',
    seoTitle: 'Website Maintenance, Speed & Accessibility',
    seoDescription:
      'What keeps a website fast, secure and legal in Australia, from Core Web Vitals to WCAG 2.2 accessibility and privacy rules.',
    h1: 'Keeping your website healthy, legal and fast',
    subtitle: 'Most of what keeps a site safe and quick happens out of sight. Here is what it takes.',
    pillars: ['/pillar1'],
    pages: ch07Pages,
  },
  {
    num: 8,
    slug: 'how-to-get-your-website-found',
    seoTitle: 'How to Get Your Website Found (SEO & AI)',
    seoDescription:
      'How getting found really works now, in three plain stages, plus how to be recommended by AI assistants like ChatGPT.',
    h1: 'Getting found, on search and AI',
    subtitle: 'A great website is worth nothing if nobody sees it. This is how the right people arrive.',
    pillars: ['/pillar1', '/pillar5'],
    pages: ch08Pages,
  },
  {
    num: 9,
    slug: 'website-crm-automation-hub',
    seoTitle: 'Your Website as the Hub of Your Business',
    seoDescription:
      'Wire your website to your CRM, automation and reporting so leads capture, follow up and report themselves.',
    h1: 'Your website as the hub',
    subtitle:
      'A properly built website is not an island. It is the centre your whole business runs through.',
    pillars: ['/pillar1', '/pillar2', '/pillar3', '/pillar7'],
    pages: ch09Pages,
  },
  {
    num: 10,
    slug: 'growing-your-website-over-time',
    seoTitle: 'Growing Your Website as Your Business Grows',
    seoDescription:
      'The order to build in, the signs you have outgrown your website, and why building properly means you grow instead of starting over.',
    h1: 'Growing your website over time',
    subtitle: 'A website is never built complete. It grows, in a sensible order, as the business grows.',
    pillars: ['/pillar1'],
    pages: ch10Pages,
  },
  {
    num: 11,
    slug: 'using-ai-for-website-content',
    seoTitle: 'Using AI to Write Website Content Faster',
    seoDescription:
      'Use AI to turn the blank page into a strong first draft. A copy-ready prompt pack, and the four checks to run before you publish.',
    h1: 'Using AI to run your content faster',
    subtitle:
      'The slowest part of running a website just got quick. Here is how to use it without getting burned.',
    pillars: ['/pillar4', '/pillar5'],
    pages: ch11Pages,
  },
  {
    num: 12,
    slug: 'website-terms-glossary',
    seoTitle: 'Website Terms Explained Plainly: A Glossary',
    seoDescription:
      'Plain-English definitions of the website terms that matter, from CRM and DNS to webhooks, schema, GEO and Core Web Vitals.',
    h1: 'A plain-English website glossary',
    subtitle:
      'The plain meaning of every term in this book, and a note on getting help when you want it.',
    pillars: ['/pillar1'],
    pages: ch12Pages,
  },
]

export const BTW_GUIDE_SLUG = BTW_META.slug
export const BTW_HUB_PATH = `/guides/${BTW_GUIDE_SLUG}`
export const BTW_BOOK_PATH = `${BTW_HUB_PATH}/read`

export function btwChapterPath(slug: string): string {
  return `${BTW_HUB_PATH}/${slug}`
}

export function getBtwChapterBySlug(slug: string): BtwChapterSeo | undefined {
  return BTW_CHAPTERS.find((c) => c.slug === slug)
}

export function getBtwChapterByNum(num: number): BtwChapterSeo | undefined {
  return BTW_CHAPTERS.find((c) => c.num === num)
}

/** All prerenderable public chapter paths (hub + chapters). */
export function btwPublicPrerenderRoutes(): string[] {
  return [BTW_HUB_PATH, ...BTW_CHAPTERS.map((c) => btwChapterPath(c.slug))]
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
      id: `btw-glossary-${b.term.toLowerCase().replace(/\s+/g, '-')}`,
      question: `What is ${b.term}?`,
      answer: b.definition,
    }))
}

export { CHAPTER_PAGES }
