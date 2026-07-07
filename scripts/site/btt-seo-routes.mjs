/**
 * Single source of truth for Built to Think public routes and per-chapter SEO meta.
 */
export const BTT_HUB_ROUTE = '/guides/built-to-think'

export const BTT_CHAPTER_SLUGS = [
  'why-everyone-talks-about-ai',
  'what-ai-actually-is',
  'the-anatomy-of-an-ai-task',
  'choosing-the-right-tool',
  'the-use-case-library',
  'running-ai-day-to-day',
  'keeping-ai-safe-private-and-legal',
  'ai-that-answers',
  'connecting-ai-to-your-systems',
  'growing-ai-over-time',
  'the-prompt-pack',
  'glossary-and-who-to-call',
]

export const BTT_CHAPTER_META_BY_SLUG = {
  'why-everyone-talks-about-ai': {
    title: 'Why Everyone Talks About AI (and Most Waste Money) | SYSBILT',
    description:
      'AI is real and most spending is wasted. The one rule, why the waste happens, and what this guide is for.',
  },
  'what-ai-actually-is': {
    title: 'What AI Actually Is, in Plain Terms | SYSBILT',
    description:
      'A prediction machine, not a knowledge machine. Memory, windows, meters, model tiers, and what you own.',
  },
  'the-anatomy-of-an-ai-task': {
    title: 'The Anatomy of an AI Task That Pays | SYSBILT',
    description:
      'Four features of tasks worth giving to AI, the three questions before any spend, and the inventory camera lesson.',
  },
  'choosing-the-right-tool': {
    title: 'Choosing the Right Tool at the Right Tier | SYSBILT',
    description:
      'Three doors AI is sold at, which model to size to the job, and the honest cents-per-task arithmetic.',
  },
  'the-use-case-library': {
    title: 'The AI Use-Case Library | SYSBILT',
    description:
      'Summarising, drafting, classifying, extracting, researching, answering, images, code, and what rules do better.',
  },
  'running-ai-day-to-day': {
    title: 'Running AI Day to Day | SYSBILT',
    description:
      'Briefing as the skill, the prompt library, human gates as habit, and the monthly measuring habit.',
  },
  'keeping-ai-safe-private-and-legal': {
    title: 'Keeping AI Safe, Private and Legal | SYSBILT',
    description:
      'The privacy line, hallucination liability, why machines invent, and honesty with your brand.',
  },
  'ai-that-answers': {
    title: 'AI That Answers: Chat and Voice Agents | SYSBILT',
    description:
      'What agents do well, where they must hand off, and why the knowledge base is the product.',
  },
  'connecting-ai-to-your-systems': {
    title: 'Connecting AI to Your Systems | SYSBILT',
    description:
      'AI inside your tools and automations, MCP plugs, the Tuesday from the intelligence side, and metered guardrails.',
  },
  'growing-ai-over-time': {
    title: 'Growing AI Over Time | SYSBILT',
    description:
      'The adoption ladder, measuring at every rung, ignoring the launch of the week, and the humans as capability grows.',
  },
  'the-prompt-pack': {
    title: 'The AI Prompt Pack | SYSBILT',
    description:
      'Ten copy-ready briefings for calls, enquiries, articles, chases, research, and the monthly measure.',
  },
  'glossary-and-who-to-call': {
    title: 'AI Terms Explained Plainly | SYSBILT',
    description:
      'Plain-English AI glossary, plus how to request an AI Systems Review from SYSBILT.',
  },
}

export const BTT_HUB_META = {
  title: 'Built to Think — AI for Business Without the Hype | SYSBILT',
  description:
    'How to use AI in your business without burning money on the hype: fit tests, tiers, gates, caps, and growing one proven rung at a time. Free from SYSBILT.',
}

export function bttPublicRoutes() {
  return [BTT_HUB_ROUTE, ...BTT_CHAPTER_SLUGS.map((s) => `${BTT_HUB_ROUTE}/${s}`)]
}
