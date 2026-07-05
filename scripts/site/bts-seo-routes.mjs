/**
 * Single source of truth for Built to Sell public routes and per-chapter SEO meta.
 *
 * Consumed by:
 *   - scripts/site/stamp-meta.mjs   (build-time HTML + JSON-LD stamping)
 *   - scripts/site/verify-seo.mjs   (pre-deploy guard + anti-drift assertion)
 *   - scripts/site/gen-content-manifest.mjs (edge middleware slug manifest)
 *   - api/sitemap.ts                (sitemap generation)
 *
 * Plain JS only (no TS syntax). Content source of truth for chapters is
 * src/built-to-sell/chapter-seo.ts; verify-seo asserts lock-step with this file.
 */
export const BTS_HUB_ROUTE = '/guides/built-to-sell'

export const BTS_CHAPTER_SLUGS = [
  'why-your-store-exists',
  'what-you-own-store-safety',
  'product-page-that-sells',
  'your-store-pages',
  'store-features',
  'running-your-store-day-to-day',
  'store-health-legal-speed',
  'getting-your-store-found',
  'store-as-the-hub',
  'selling-where-buyers-are',
  'using-ai-for-store-content',
  'store-terms-glossary',
]

/** Per-chapter <title>/description used to stamp static HTML for each chapter route. */
export const BTS_CHAPTER_META_BY_SLUG = {
  'why-your-store-exists': {
    title: 'Why Your Online Store Exists | SYSBILT',
    description:
      'Most stores still sell only to human eyes. Learn why yours must serve buyers and the machines choosing for them.',
  },
  'what-you-own-store-safety': {
    title: 'What You Own (and What Keeps Your Store Safe) | SYSBILT',
    description:
      'Domain, catalogue, customers, payment security, and fraud. What you must own before you sell online.',
  },
  'product-page-that-sells': {
    title: 'The Anatomy of a Product Page That Sells | SYSBILT',
    description:
      'The four-step structure every product page needs to convince people and the machines reading on their behalf.',
  },
  'your-store-pages': {
    title: 'What Pages Your Online Store Needs | SYSBILT',
    description:
      'Which pages your store needs, what each is for, and why shipping and returns pages now sell for you.',
  },
  'store-features': {
    title: 'E-commerce Features That Win Sales | SYSBILT',
    description:
      'Store features explained: what each one does, how to use it day to day, and where it can grow next.',
  },
  'running-your-store-day-to-day': {
    title: 'Running Your Online Store Day to Day | SYSBILT',
    description:
      'Orders, stock honesty, content upkeep, reviews, returns, and the checkout fire drill. The operating rhythm.',
  },
  'store-health-legal-speed': {
    title: 'Store Health, Speed and Australian Law | SYSBILT',
    description:
      'Speed, security, Australian consumer guarantees, honest pricing, privacy, and reviews done properly.',
  },
  'getting-your-store-found': {
    title: 'How to Get Your Store Found (Search and AI) | SYSBILT',
    description:
      'Readable catalogue, relevant content, and trusted signals so search engines and AI assistants can choose you.',
  },
  'store-as-the-hub': {
    title: 'Your Store as the Hub of Your Business | SYSBILT',
    description:
      'Wire your store to inventory, payments, fulfilment, accounting, and customer memory in one connected system.',
  },
  'selling-where-buyers-are': {
    title: 'Sell on Marketplaces Without Losing Your Store | SYSBILT',
    description:
      'Marketplaces, social shops, live selling, and agent commerce. Rented land feeds owned ground.',
  },
  'using-ai-for-store-content': {
    title: 'Using AI to Run Your Store Content Faster | SYSBILT',
    description:
      'AI prompt pack for product copy, policies, and emails, with truth checks before anything ships.',
  },
  'store-terms-glossary': {
    title: 'E-commerce Terms Explained Plainly | SYSBILT',
    description:
      'Plain-English definitions of e-commerce terms that matter, plus how to request a Store Systems Review.',
  },
}

export const BTS_HUB_META = {
  title: 'Online Stores That Sell: The Complete Guide | SYSBILT',
  description:
    'A deep guide to e-commerce for Australian businesses: ownership, product pages, features, operations, legal, discovery, and your store as a business hub. Free from SYSBILT.',
}

export function btsPublicRoutes() {
  return [BTS_HUB_ROUTE, ...BTS_CHAPTER_SLUGS.map((s) => `${BTS_HUB_ROUTE}/${s}`)]
}
