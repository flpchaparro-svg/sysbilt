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
import { BTT_META } from './types'

export type BttChapterSeo = {
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

export const BTT_CHAPTERS: BttChapterSeo[] = [
  {
    num: 1,
    slug: 'why-everyone-talks-about-ai',
    seoTitle: 'Why Everyone Talks About AI (and Most Waste Money)',
    seoDescription:
      'AI is real and most spending is wasted. The one rule, why the waste happens, and what this guide is for.',
    h1: "Why everyone's talking about AI, and most are wasting money",
    subtitle: 'The shift is real. So is the waste.',
    pillars: ['/pillar4'],
    pages: ch01Pages,
  },
  {
    num: 2,
    slug: 'what-ai-actually-is',
    seoTitle: 'What AI Actually Is, in Plain Terms',
    seoDescription:
      'A prediction machine, not a knowledge machine. Memory, windows, meters, model tiers, and what you own.',
    h1: 'What AI actually is, in plain terms',
    subtitle: 'The honest model every practical rule falls out of.',
    pillars: ['/pillar4'],
    pages: ch02Pages,
  },
  {
    num: 3,
    slug: 'the-anatomy-of-an-ai-task',
    seoTitle: 'The Anatomy of an AI Task That Pays',
    seoDescription:
      'Four features of tasks worth giving to AI, the three questions before any spend, and the inventory camera lesson.',
    h1: 'The anatomy of an AI task that pays',
    subtitle: 'Messy in, checkable out, real volume, cheap wrongness.',
    pillars: ['/pillar4'],
    pages: ch03Pages,
  },
  {
    num: 4,
    slug: 'choosing-the-right-tool',
    seoTitle: 'Choosing the Right Tool at the Right Tier',
    seoDescription:
      'Three doors AI is sold at, which model to size to the job, and the honest cents-per-task arithmetic.',
    h1: 'Choosing the right tool, at the right tier',
    subtitle: 'Three doors, wildly different prices, one buying method.',
    pillars: ['/pillar4'],
    pages: ch04Pages,
  },
  {
    num: 5,
    slug: 'the-use-case-library',
    seoTitle: 'The AI Use-Case Library',
    seoDescription:
      'Summarising, drafting, classifying, extracting, researching, answering, images, code, and what rules do better.',
    h1: 'The use-case library',
    subtitle: 'What AI is genuinely good at, and what rules do better.',
    pillars: ['/pillar4'],
    pages: ch05Pages,
  },
  {
    num: 6,
    slug: 'running-ai-day-to-day',
    seoTitle: 'Running AI Day to Day',
    seoDescription:
      'Briefing as the skill, the prompt library, human gates as habit, and the monthly measuring habit.',
    h1: 'Running it day to day',
    subtitle: 'Briefing, library, gates, measurement: the daily craft.',
    pillars: ['/pillar4'],
    pages: ch06Pages,
  },
  {
    num: 7,
    slug: 'keeping-ai-safe-private-and-legal',
    seoTitle: 'Keeping AI Safe, Private and Legal',
    seoDescription:
      'The privacy line, hallucination liability, why machines invent, and honesty with your brand.',
    h1: 'Keeping it safe, private and legal',
    subtitle: "Your customers' information and your name are in the room.",
    pillars: ['/pillar4'],
    pages: ch07Pages,
  },
  {
    num: 8,
    slug: 'ai-that-answers',
    seoTitle: 'AI That Answers: Chat and Voice Agents',
    seoDescription:
      'What agents do well, where they must hand off, and why the knowledge base is the product.',
    h1: 'AI that answers: chat and voice agents',
    subtitle: 'Done well, the end of the missed enquiry. Done badly, your brand live and unsupervised.',
    pillars: ['/pillar4'],
    pages: ch08Pages,
  },
  {
    num: 9,
    slug: 'connecting-ai-to-your-systems',
    seoTitle: 'Connecting AI to Your Systems',
    seoDescription:
      'AI inside your tools and automations, MCP plugs, the Tuesday from the intelligence side, and metered guardrails.',
    h1: 'Connecting AI to your systems',
    subtitle: 'Where the meter runs with nobody at the keyboard.',
    pillars: ['/pillar4', '/pillar3'],
    pages: ch09Pages,
  },
  {
    num: 10,
    slug: 'growing-ai-over-time',
    seoTitle: 'Growing AI Over Time',
    seoDescription:
      'The adoption ladder, measuring at every rung, ignoring the launch of the week, and the humans as capability grows.',
    h1: 'Growing it over time',
    subtitle: 'One proven rung at a time while the hype cycle churns past.',
    pillars: ['/pillar4'],
    pages: ch10Pages,
  },
  {
    num: 11,
    slug: 'the-prompt-pack',
    seoTitle: 'The AI Prompt Pack',
    seoDescription:
      'Ten copy-ready briefings for calls, enquiries, articles, chases, research, and the monthly measure.',
    h1: 'The prompt pack',
    subtitle: 'The daily craft of chapter six, packed into briefings you can copy.',
    pillars: ['/pillar4'],
    pages: ch11Pages,
  },
  {
    num: 12,
    slug: 'glossary-and-who-to-call',
    seoTitle: 'AI Terms Explained Plainly',
    seoDescription:
      'Plain-English AI glossary, plus how to request an AI Systems Review from SYSBILT.',
    h1: 'Glossary, and who to call',
    subtitle: 'Plain meanings, plus who to talk to when you are ready.',
    pillars: ['/pillar4'],
    pages: ch12Pages,
  },
]

export const BTT_GUIDE_SLUG = BTT_META.slug
export const BTT_HUB_PATH = `/guides/${BTT_GUIDE_SLUG}`
export const BTT_BOOK_PATH = `${BTT_HUB_PATH}/read`

export function bttChapterPath(slug: string): string {
  return `${BTT_HUB_PATH}/${slug}`
}

export function getBttChapterBySlug(slug: string): BttChapterSeo | undefined {
  return BTT_CHAPTERS.find((c) => c.slug === slug)
}

export function getBttChapterByNum(num: number): BttChapterSeo | undefined {
  return BTT_CHAPTERS.find((c) => c.num === num)
}

export function bttPublicPrerenderRoutes(): string[] {
  return [BTT_HUB_PATH, ...BTT_CHAPTERS.map((c) => bttChapterPath(c.slug))]
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
      id: `btt-glossary-${b.term.toLowerCase().replace(/\s+/g, '-')}`,
      question: `What is ${b.term}?`,
      answer: b.definition,
    }))
}

export { CHAPTER_PAGES }
