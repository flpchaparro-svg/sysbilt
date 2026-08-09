/**
 * Single source of truth for Built to Work public routes and per-chapter SEO meta.
 *
 * Consumed by:
 *   - scripts/site/stamp-meta.mjs   (build-time HTML, JSON-LD and static sitemap)
 *   - scripts/site/verify-seo.mjs   (pre-deploy guard + anti-drift assertion)
 *   - scripts/site/gen-content-manifest.mjs (edge middleware slug manifest)
 *
 * Plain JS only (no TS syntax) so Node, tsx, the Vercel serverless bundler and
 * the edge bundler can all import it. The content source of truth for chapters
 * is src/built-to-work/chapter-seo.ts; verify-seo asserts this list stays in
 * lock-step with it, so adding a chapter there fails the build until it is added
 * here too.
 */
export const BTW_HUB_ROUTE = '/guides/built-to-work'

export const BTW_CHAPTER_SLUGS = [
  'what-a-business-website-is-for',
  'do-you-own-your-website',
  'web-page-that-converts',
  'pages-a-business-website-needs',
  'business-website-features',
  'running-your-website-day-to-day',
  'website-maintenance-speed-accessibility',
  'how-to-get-your-website-found',
  'website-crm-automation-hub',
  'growing-your-website-over-time',
  'using-ai-for-website-content',
  'website-terms-glossary',
]

/** Per-chapter <title>/description used to stamp static HTML for each chapter route. */
export const BTW_CHAPTER_META_BY_SLUG = {
  'what-a-business-website-is-for': {
    title: 'What a Business Website Is Actually For | SYSBILT',
    description:
      'Most business websites sit online and do nothing. Here is what a website is really for, and why the businesses that treat it as a system pull ahead.',
  },
  'do-you-own-your-website': {
    title: 'Do You Actually Own Your Website? | SYSBILT',
    description:
      'Domain, hosting, code and the accounts behind them. What you must own outright, and how to keep your website secure.',
  },
  'web-page-that-converts': {
    title: 'The Anatomy of a Web Page That Converts | SYSBILT',
    description:
      'Every page that brings in business shares the same four-part structure. How to build a web page that turns visitors into enquiries.',
  },
  'pages-a-business-website-needs': {
    title: 'What Pages Does a Business Website Need? | SYSBILT',
    description:
      'A lead-generation website is lean. The pages you actually need, what each one is for, and the ones you can leave out.',
  },
  'business-website-features': {
    title: 'Website Features That Win Work | SYSBILT',
    description:
      'Contact forms wired to your CRM, booking calendars, AI chat, speed to lead and more. The website features that actually bring in clients.',
  },
  'running-your-website-day-to-day': {
    title: 'Running Your Website Day to Day | SYSBILT',
    description:
      'The simple habits that keep a website sharp and the leads moving, plus a fire drill for when something looks broken.',
  },
  'website-maintenance-speed-accessibility': {
    title: 'Website Maintenance, Speed & Accessibility | SYSBILT',
    description:
      'What keeps a website fast, secure and legal in Australia, from Core Web Vitals to WCAG 2.2 accessibility and privacy rules.',
  },
  'how-to-get-your-website-found': {
    title: 'How to Get Your Website Found (SEO & AI) | SYSBILT',
    description:
      'How getting found really works now, in three plain stages, plus how to be recommended by AI assistants like ChatGPT.',
  },
  'website-crm-automation-hub': {
    title: 'Your Website as the Hub of Your Business | SYSBILT',
    description:
      'Wire your website to your CRM, automation and reporting so leads capture, follow up and report themselves.',
  },
  'growing-your-website-over-time': {
    title: 'Growing Your Website as Your Business Grows | SYSBILT',
    description:
      'The order to build in, the signs you have outgrown your website, and why building properly means you grow instead of starting over.',
  },
  'using-ai-for-website-content': {
    title: 'Using AI to Write Website Content Faster | SYSBILT',
    description:
      'Use AI to turn the blank page into a strong first draft. A copy-ready prompt pack, and the four checks to run before you publish.',
  },
  'website-terms-glossary': {
    title: 'Website Terms Explained Plainly: A Glossary | SYSBILT',
    description:
      'Plain-English definitions of the website terms that matter, from CRM and DNS to webhooks, schema, GEO and Core Web Vitals.',
  },
}

export function btwPublicRoutes() {
  return [BTW_HUB_ROUTE, ...BTW_CHAPTER_SLUGS.map((s) => `${BTW_HUB_ROUTE}/${s}`)]
}
