import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@sanity/client';

const BASE_URL = 'https://sysbilt.com';

const STATIC_PATHS = [
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

const POSTS_QUERY = `*[_type == "post" && !(_id in path("drafts.**"))]{
  "slug": slug.current, publishedAt
}`;

type PostRow = { slug: string | null; publishedAt: string | null };

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildXml(staticPaths: readonly string[], posts: PostRow[]): string {
  type UrlEntry = { loc: string; lastmod?: string };

  const staticUrls: UrlEntry[] = staticPaths.map((path) => ({
    loc: path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`,
  }));

  const blogUrls: UrlEntry[] = posts
    .filter((p): p is { slug: string; publishedAt: string | null } => typeof p.slug === 'string' && p.slug.length > 0)
    .map((p) => ({
      loc: `${BASE_URL}/blog/${encodeURIComponent(p.slug)}`,
      lastmod: p.publishedAt ? new Date(p.publishedAt).toISOString().split('T')[0] : undefined,
    }));

  const rows = [...staticUrls, ...blogUrls]
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
${rows}
</urlset>
`;
}

export default async function handler(_req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const client = createClient({
      projectId: 'wdlc9pg8',
      dataset: 'production',
      useCdn: true,
      apiVersion: '2024-02-20',
    });

    const posts = await client.fetch<PostRow[]>(POSTS_QUERY);
    const xml = buildXml(STATIC_PATHS, posts);

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(xml);
  } catch (err) {
    console.error('sitemap:', err);
    res.status(500).setHeader('Content-Type', 'text/plain; charset=utf-8').send('Failed to generate sitemap');
  }
}
