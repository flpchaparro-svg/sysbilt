/**
 * Routes mirrored for build-time prerender (keep aligned with `api/sitemap.ts` + `src/App.tsx`).
 * Blog post URLs are appended from Sanity at build time when the API is reachable.
 */

export const PRERENDER_STATIC_PATHS: string[] = [
  '/',
  '/system',
  '/pillar1',
  '/pillar2',
  '/pillar3',
  '/pillar4',
  '/pillar5',
  '/pillar6',
  '/pillar7',
  '/process',
  '/architect',
  '/proof',
  '/evidence-vault',
  '/blog',
  '/news',
  '/contact',
  '/privacy',
]

const POST_SLUGS_QUERY = `*[_type == "post" && !(_id in path("drafts.**"))].slug.current`

export async function getAllPrerenderRoutes(): Promise<string[]> {
  const routes = [...PRERENDER_STATIC_PATHS]
  try {
    const { createClient } = await import('@sanity/client')
    const client = createClient({
      projectId: 'wdlc9pg8',
      dataset: 'production',
      useCdn: true,
      apiVersion: '2024-02-20',
    })
    const slugs = await client.fetch<(string | null)[]>(POST_SLUGS_QUERY)
    for (const slug of slugs) {
      if (typeof slug === 'string' && slug.length > 0) {
        routes.push(`/blog/${encodeURIComponent(slug)}`)
      }
    }
  } catch (e) {
    console.warn('[prerender] Sanity slug fetch failed; using static paths only.', e)
  }
  return [...new Set(routes)]
}
