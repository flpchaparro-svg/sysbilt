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
  'your-data-keeping-it-clean',
  'your-crm-features',
  'running-crm-day-to-day',
  'following-up-without-burning-people',
  'lead-tracking',
  'crm-as-the-hub',
  'getting-your-team-to-use-it',
  'using-ai-for-crm',
  'glossary-and-who-to-call',
]

/** Per-chapter <title>/description used to stamp static HTML for each chapter route. */
export const BTC_CHAPTER_META_BY_SLUG = {
  'why-your-business-needs-a-memory': {
    title: 'Why Your Business Needs a Memory | SYSBILT',
    description:
      'Follow-up has become a system, not a personality trait. See the three leaks and why memory beats more leads.',
  },
  'what-a-crm-actually-is': {
    title: 'What a CRM Actually Is (and What You Own) | SYSBILT',
    description:
      'Contacts, deals, activities, and ownership rules. Right-sized CRM choice and a clean migration.',
  },
  'anatomy-of-a-pipeline': {
    title: 'The Anatomy of a Pipeline That Closes | SYSBILT',
    description:
      'Stages that mirror reality, entry rules, one owner per deal, and reading the board honestly.',
  },
  'your-data-keeping-it-clean': {
    title: 'Your CRM Data, and Keeping It Clean | SYSBILT',
    description:
      'Fewer fields, source tagged at birth, one human one record, and the hygiene rhythm that keeps trust.',
  },
  'your-crm-features': {
    title: 'CRM Features That Win Work | SYSBILT',
    description:
      'Forms, inbox, sequences, tasks, and win-back flows explained: what each does and how to use it.',
  },
  'running-crm-day-to-day': {
    title: 'Running Your CRM Day to Day | SYSBILT',
    description:
      'The fifteen-minute morning rhythm, lead-inbox zero, weekly pipeline review, and the fire drill.',
  },
  'following-up-without-burning-people': {
    title: 'Following Up Without Burning People | SYSBILT',
    description:
      'Cadence, graceful closes, Australian law, and sender reputation. Follow-up as craft, not pestering.',
  },
  'lead-tracking': {
    title: 'Lead Tracking: Where Every Job Came From | SYSBILT',
    description:
      'Which marketing brings work, not just leads. UTMs, call tracking, attribution honesty, and quarterly decisions.',
  },
  'crm-as-the-hub': {
    title: 'Your CRM as the Hub | SYSBILT',
    description:
      'Wire website, email, phone, quoting, and accounting through the CRM. One lead, start to finish.',
  },
  'getting-your-team-to-use-it': {
    title: 'Getting Your Team to Actually Use the CRM | SYSBILT',
    description:
      'Why CRMs die, design for laziness, owner-first rollout, and growing features without breaking adoption.',
  },
  'using-ai-for-crm': {
    title: 'Using AI to Run the CRM Faster | SYSBILT',
    description:
      'AI drafts, you approve. Prompt pack for follow-ups, notes, and briefs, with privacy rules that matter.',
  },
  'glossary-and-who-to-call': {
    title: 'CRM Terms Explained Plainly | SYSBILT',
    description:
      'Plain-English CRM glossary plus how to request a CRM Systems Review from SYSBILT.',
  },
}

export const BTC_HUB_META = {
  title: 'CRM and Follow-Up That Wins Work: The Complete Guide | SYSBILT',
  description:
    'A deep guide to CRM and lead tracking for Australian businesses: memory, pipeline, features, follow-up, attribution, and your CRM as the hub. Free from SYSBILT.',
}

export function btcPublicRoutes() {
  return [BTC_HUB_ROUTE, ...BTC_CHAPTER_SLUGS.map((slug) => `${BTC_HUB_ROUTE}/${slug}`)]
}
