/**
 * Single source of truth for Built to Close public routes and per-chapter SEO meta.
 *
 * Consumed by:
 *   - scripts/site/stamp-meta.mjs   (build-time HTML + JSON-LD stamping)
 *   - scripts/site/verify-seo.mjs   (pre-deploy guard + anti-drift assertion)
 *   - scripts/site/gen-content-manifest.mjs (edge middleware slug manifest)
 *   - api/sitemap.ts                (sitemap generation)
 *
 * Plain JS only (no TS syntax). Content source of truth for chapters is
 * src/built-to-close/chapter-seo.ts; verify-seo asserts lock-step with this file.
 */
export const BTC_HUB_ROUTE = '/guides/built-to-close'

export const BTC_CHAPTER_SLUGS = [
  'why-your-business-needs-a-memory',
  'what-a-crm-actually-is',
  'anatomy-of-a-pipeline',
  'your-data-and-keeping-it-clean',
  'your-crm-features',
  'running-it-day-to-day',
  'following-up-without-burning-people',
  'lead-tracking',
  'your-crm-as-the-hub',
  'getting-your-team-to-use-it',
  'using-ai-to-run-the-crm-faster',
  'glossary-and-who-to-call',
]

/** Per-chapter <title>/description used to stamp static HTML for each chapter route. */
export const BTC_CHAPTER_META_BY_SLUG = {
  'why-your-business-needs-a-memory': {
    title: 'Why Your Business Needs a Memory | SYSBILT',
    description:
      'Follow-up has become a system, not a personality trait. Why leads leak and how a CRM becomes the memory of your business.',
  },
  'what-a-crm-actually-is': {
    title: 'What a CRM Actually Is (and What You Own) | SYSBILT',
    description:
      'Contacts, deals, activities, and ownership rules. Right-sized CRM choice and a clean migration for Australian businesses.',
  },
  'anatomy-of-a-pipeline': {
    title: 'The Anatomy of a Pipeline That Closes | SYSBILT',
    description:
      'Stages that mirror reality, entry rules, one owner per deal, and reading the board for honest forecasts.',
  },
  'your-data-and-keeping-it-clean': {
    title: 'Your CRM Data, and Keeping It Clean | SYSBILT',
    description:
      'Fewer fields, source tagged at capture, one human one record, and the hygiene rhythm that keeps the memory trustworthy.',
  },
  'your-crm-features': {
    title: 'CRM Features That Win Work | SYSBILT',
    description:
      'Forms, inbox, sequences, tasks, and win-back flows explained: what each does, how to use it, and where it grows next.',
  },
  'running-it-day-to-day': {
    title: 'Running Your CRM Day to Day | SYSBILT',
    description:
      'The fifteen-minute morning rhythm, lead-inbox zero, weekly pipeline review, zombie deals, and the lead fire drill.',
  },
  'following-up-without-burning-people': {
    title: 'Following Up Without Burning People | SYSBILT',
    description:
      'Persistent versus pest, follow-up cadence, graceful closes, Australian law, and sender reputation explained plainly.',
  },
  'lead-tracking': {
    title: 'Lead Tracking: Where Every Job Came From | SYSBILT',
    description:
      'Source at capture, UTMs, first versus last touch, the dark funnel, and quarterly budget decisions from won revenue.',
  },
  'your-crm-as-the-hub': {
    title: 'Your CRM as the Hub of Your Business | SYSBILT',
    description:
      'Wire website, inbox, phone, quoting, accounting, and reporting so one lead moves from enquiry to invoice without ferrying.',
  },
  'getting-your-team-to-use-it': {
    title: 'Getting Your Team to Actually Use the CRM | SYSBILT',
    description:
      'Why CRMs die, design for laziness, owner-first rollout, role-shaped training, and growing without over-building.',
  },
  'using-ai-to-run-the-crm-faster': {
    title: 'Using AI to Run the CRM Faster | SYSBILT',
    description:
      'AI note-takers, privacy rules, and a CRM prompt pack for follow-ups, re-engagement, and meeting prep.',
  },
  'glossary-and-who-to-call': {
    title: 'CRM Terms Explained Plainly | SYSBILT',
    description:
      'Plain-English CRM and follow-up glossary, plus how to request a CRM Systems Review from SYSBILT.',
  },
}

export const BTC_HUB_META = {
  title: 'CRM and Follow-Up That Wins Work: The Complete Guide | SYSBILT',
  description:
    'A deep guide to CRM and lead follow-up for Australian businesses: memory, pipeline, features, daily rhythm, tracking, and your CRM as the business hub. Free from SYSBILT.',
}

export function btcPublicRoutes() {
  return [BTC_HUB_ROUTE, ...BTC_CHAPTER_SLUGS.map((s) => `${BTC_HUB_ROUTE}/${s}`)]
}
