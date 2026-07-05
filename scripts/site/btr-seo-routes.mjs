/**
 * Single source of truth for Built to Run public routes and per-chapter SEO meta.
 */
export const BTR_HUB_ROUTE = '/guides/built-to-run'

export const BTR_CHAPTER_SLUGS = [
  'why-your-business-drowns-in-admin',
  'what-an-automation-is',
  'anatomy-of-an-automation',
  'finding-what-to-automate',
  'the-automation-library',
  'running-automations-day-to-day',
  'keeping-automations-healthy',
  'when-automations-think',
  'your-automations-as-the-nervous-system',
  'growing-automations-over-time',
  'using-ai-to-build-automations',
  'glossary-and-who-to-call',
]

export const BTR_CHAPTER_META_BY_SLUG = {
  'why-your-business-drowns-in-admin': {
    title: 'Why Your Business Drowns in Admin | SYSBILT',
    description:
      'Admin has become optional. Why growing businesses stall when the owner becomes human glue, and what automation actually is.',
  },
  'what-an-automation-is': {
    title: 'What an Automation Is (and What You Own) | SYSBILT',
    description:
      'Triggers, steps, conditions, and actions. Webhooks, platform sizing, and ownership rules for your automation logic.',
  },
  'anatomy-of-an-automation': {
    title: 'The Anatomy of an Automation That Works | SYSBILT',
    description:
      'One job per workflow, precise triggers, failure paths, and building automations legible to the next person.',
  },
  'finding-what-to-automate': {
    title: 'Finding What to Automate | SYSBILT',
    description:
      'The week audit, rule of three, what never gets automated, and quick wins before deep builds.',
  },
  'the-automation-library': {
    title: 'The Automation Library: 30+ Workflows to Steal | SYSBILT',
    description:
      'Ready-made automation ideas for leads, marketing, operations, customer service, and reporting.',
  },
  'running-automations-day-to-day': {
    title: 'Running Automations Day to Day | SYSBILT',
    description:
      'Human in the loop, drafts not sends, the two-minute daily check, and the workflow fire drill.',
  },
  'keeping-automations-healthy': {
    title: 'Keeping Automations Healthy, Safe and Legal | SYSBILT',
    description:
      'Staging, credentials, backups, decay, rate limits, and Australian law when machines act for you.',
  },
  'when-automations-think': {
    title: 'When Automations Think: Adding AI | SYSBILT',
    description:
      'Where AI belongs in a flow, the hype tax, agents honestly, and cost discipline for thinking steps.',
  },
  'your-automations-as-the-nervous-system': {
    title: 'Your Automations as the Nervous System | SYSBILT',
    description:
      'The connected business: the enquiry that arrives with its homework done, and the engineering underneath.',
  },
  'growing-automations-over-time': {
    title: 'Growing Automations Over Time | SYSBILT',
    description:
      'Start with what stings, split workflows, platform crossover economics, and the team layer.',
  },
  'using-ai-to-build-automations': {
    title: 'Using AI to Build Automations Faster | SYSBILT',
    description:
      'Automation prompt pack for specifications, failure paths, diagnosis, documentation, and go-live review.',
  },
  'glossary-and-who-to-call': {
    title: 'Automation Terms Explained Plainly | SYSBILT',
    description:
      'Plain-English automation glossary, plus how to request an Automation Systems Review from SYSBILT.',
  },
}

export const BTR_HUB_META = {
  title: 'Business Automation That Works: The Complete Guide | SYSBILT',
  description:
    'A deep guide to business automation for Australian businesses: triggers, workflows, the automation library, AI steps, and your systems as a nervous system. Free from SYSBILT.',
}

export function btrPublicRoutes() {
  return [BTR_HUB_ROUTE, ...BTR_CHAPTER_SLUGS.map((s) => `${BTR_HUB_ROUTE}/${s}`)]
}
