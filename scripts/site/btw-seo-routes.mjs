/** Chapter slugs for prerender + sitemap — keep in sync with src/built-to-work/chapter-seo.ts */
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

export const BTW_HUB_ROUTE = '/guides/built-to-work'

export function btwPublicRoutes() {
  return [BTW_HUB_ROUTE, ...BTW_CHAPTER_SLUGS.map((s) => `${BTW_HUB_ROUTE}/${s}`)]
}
