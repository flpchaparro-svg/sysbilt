import { createClient, type SanityClient } from '@sanity/client';

export const BASE_URL = 'https://sysbilt.com';

/** Main marketing routes (excludes /news, /privacy — noindex). */
export const STATIC_PATHS = [
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
  '/blog',
  '/contact',
] as const;

/** Exclude Sanity drafts (ids prefixed with drafts.). */
const POSTS_QUERY = `*[_type == "post" && defined(slug.current) && defined(publishedAt) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  "slug": slug.current,
  publishedAt
}`;

export type PostSlugRow = { slug: string; publishedAt: string };

export function createSanityClient(): SanityClient {
  return createClient({
    projectId: 'wdlc9pg8',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-02-20',
  });
}

export async function fetchPublishedPostSlugs(client: SanityClient = createSanityClient()): Promise<PostSlugRow[]> {
  return client.fetch(POSTS_QUERY);
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function buildSitemapXml(
  staticPaths: readonly string[],
  posts: PostSlugRow[],
): string {
  type UrlEntry = { loc: string; lastmod?: string };

  const staticUrls: UrlEntry[] = staticPaths.map((path) => ({
    loc: path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`,
  }));

  const blogUrls: UrlEntry[] = posts.map((p) => ({
    loc: `${BASE_URL}/blog/${encodeURIComponent(p.slug)}`,
    lastmod: new Date(p.publishedAt).toISOString().split('T')[0],
  }));

  const body = [...staticUrls, ...blogUrls]
    .map(({ loc, lastmod }) => {
      const lm = lastmod ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>` : '';
      return `  <url>
    <loc>${escapeXml(loc)}</loc>${lm}
    <changefreq>weekly</changefreq>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}
