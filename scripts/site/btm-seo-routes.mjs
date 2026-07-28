/**
 * Single source of truth for Built to Multiply public routes and per-chapter SEO meta.
 */
export const BTM_HUB_ROUTE = '/guides/built-to-multiply'

export const BTM_CHAPTER_SLUGS = [
  'why-content-and-why-most-is-wasted',
  'strategy-before-assets',
  'the-anatomy-of-content-that-works',
  'one-source-many-channels',
  'the-content-toolkit',
  'the-production-line-day-to-day',
  'keeping-it-honest-legal-and-on-brand',
  'knowing-what-works',
  'content-as-part-of-the-system',
  'growing-it-and-training-the-team',
  'the-prompt-pack',
  'glossary-and-who-to-call',
]

export const BTM_CHAPTER_META_BY_SLUG = {
  'why-content-and-why-most-is-wasted': {
    title: 'Why Content, and Why Most of It Is Wasted | SYSBILT',
    description:
      'Making content got cheap. The flood is not the strategy. One job, one system, and why volume without a reason earns nothing.',
  },
  'strategy-before-assets': {
    title: 'Strategy Before Assets | SYSBILT',
    description:
      'Who you are talking to, the three jobs content does, investment that follows the job, and a few channels done properly.',
  },
  'the-anatomy-of-content-that-works': {
    title: 'The Anatomy of Content That Works | SYSBILT',
    description:
      'Hook, value, action. One idea per piece, native to the room, and why variations are the unit now.',
  },
  'one-source-many-channels': {
    title: 'One Source, Many Channels | SYSBILT',
    description:
      'The repurposing tree, the content library, templates, and consistency at speed.',
  },
  'the-content-toolkit': {
    title: 'The Content Toolkit | SYSBILT',
    description:
      'AI writing, images, video, design, scheduling, capture, analytics, and choosing what you actually need.',
  },
  'the-production-line-day-to-day': {
    title: 'The Production Line, Day to Day | SYSBILT',
    description:
      'The five-minute idea honestly, batching, three levels of automation, and the human gate.',
  },
  'keeping-it-honest-legal-and-on-brand': {
    title: 'Keeping Content Honest, Legal and On-Brand | SYSBILT',
    description:
      'Real claims, real proof, rights respected, disclosure, and the brand cost of looking cheap.',
  },
  'knowing-what-works': {
    title: 'Knowing What Works | SYSBILT',
    description:
      'Numbers that match the job, testing variations, AI as researcher, the monthly loop, and vanity metrics.',
  },
  'content-as-part-of-the-system': {
    title: 'Content as Part of the System | SYSBILT',
    description:
      'Content points home, comment-to-lead wiring, CRM tagging, and rented permissions done properly.',
  },
  'growing-it-and-training-the-team': {
    title: 'Growing It, and Training the Team to Run It | SYSBILT',
    description:
      'Tools without training, what the team needs written down, onboarding in a day, scaling without breaking.',
  },
  'the-prompt-pack': {
    title: 'The Content Prompt Pack | SYSBILT',
    description:
      'Ten copy-ready briefings for articles, carousels, captions, hooks, repurposing, and analytics.',
  },
  'glossary-and-who-to-call': {
    title: 'Content Terms Explained Plainly | SYSBILT',
    description:
      'Plain-English content glossary, plus how to request a Content Systems Review from SYSBILT.',
  },
}

export const BTM_HUB_META = {
  title: 'Built to Multiply: Content Systems Without the Flood | SYSBILT',
  description:
    'How one voice becomes a month of content: strategy, one source, the toolkit, the production line, measurement, and wiring that turns attention into business. Free from SYSBILT.',
}

export function btmPublicRoutes() {
  return [BTM_HUB_ROUTE, ...BTM_CHAPTER_SLUGS.map((s) => `${BTM_HUB_ROUTE}/${s}`)]
}
