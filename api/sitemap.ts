import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@sanity/client';

const BASE_URL = 'https://sysbilt.com';

/** Slugs for guide documents (hub is /guides only). */
const GUIDE_DOC_SLUGS = [
  'revenue-engine',
  'websites',
  'lead-tracking',
  'automation',
  'ai-assistants',
  'content-systems',
  'team-training',
  'dashboards',
] as const;

type StaticPage = { path: string; priority: string };

const STATIC_PAGES: readonly StaticPage[] = [
  { path: '/', priority: '1.0' },
  { path: '/system', priority: '0.9' },
  { path: '/process', priority: '0.9' },
  { path: '/architect', priority: '0.9' },
  { path: '/proof', priority: '0.9' },
  { path: '/blog', priority: '0.9' },
  { path: '/news', priority: '0.9' },
  { path: '/evidence-vault', priority: '0.9' },
  { path: '/contact', priority: '0.7' },
  { path: '/privacy', priority: '0.6' },
  { path: '/pillar1', priority: '0.8' },
  { path: '/pillar2', priority: '0.8' },
  { path: '/pillar3', priority: '0.8' },
  { path: '/pillar4', priority: '0.8' },
  { path: '/pillar5', priority: '0.8' },
  { path: '/pillar6', priority: '0.8' },
  { path: '/pillar7', priority: '0.8' },
  { path: '/guides', priority: '0.7' },
] as const;

const POSTS_QUERY = `*[_type == "post" && !(_id in path("drafts.**"))]{
  "slug": slug.current, publishedAt
}`;

const GUIDES_QUERY = `*[_type == "guide" && !(_id in path("drafts.**"))]{
  "slug": slug.current,
  publishedAt
}`;

type PostRow = { slug: string | null; publishedAt: string | null };
type GuideRow = { slug: string | null; publishedAt: string | null };

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function isoDateOnly(d: Date): string {
  return d.toISOString().split('T')[0];
}

type UrlEntry = {
  loc: string;
  lastmod?: string;
  changefreq: string;
  priority: string;
};

function buildXml(entries: UrlEntry[]): string {
  const rows = entries
    .map(({ loc, lastmod, changefreq, priority }) => {
      const lm = lastmod ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>` : '';
      return `  <url>
    <loc>${escapeXml(loc)}</loc>${lm}
    <changefreq>${escapeXml(changefreq)}</changefreq>
    <priority>${escapeXml(priority)}</priority>
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

    const [posts, guidesFromCms] = await Promise.all([
      client.fetch<PostRow[]>(POSTS_QUERY),
      client.fetch<GuideRow[]>(GUIDES_QUERY),
    ]);

    const today = isoDateOnly(new Date());
    const guideLastmodBySlug = new Map<string, string>();
    for (const g of guidesFromCms) {
      if (typeof g.slug === 'string' && g.slug.length > 0) {
        const lm = g.publishedAt ? new Date(g.publishedAt).toISOString().split('T')[0] : today;
        guideLastmodBySlug.set(g.slug, lm);
      }
    }

    const staticEntries: UrlEntry[] = STATIC_PAGES.map(({ path, priority }) => ({
      loc: path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`,
      lastmod: today,
      changefreq: 'weekly',
      priority,
    }));

    const guideDocEntries: UrlEntry[] = GUIDE_DOC_SLUGS.map((slug) => ({
      loc: `${BASE_URL}/guides/${encodeURIComponent(slug)}`,
      lastmod: guideLastmodBySlug.get(slug) ?? today,
      changefreq: 'weekly',
      priority: '0.8',
    }));

    const blogUrls: UrlEntry[] = posts
      .filter((p): p is { slug: string; publishedAt: string | null } => typeof p.slug === 'string' && p.slug.length > 0)
      .map((p) => ({
        loc: `${BASE_URL}/blog/${encodeURIComponent(p.slug)}`,
        lastmod: p.publishedAt ? new Date(p.publishedAt).toISOString().split('T')[0] : today,
        changefreq: 'weekly',
        priority: '0.65',
      }));

    const xml = buildXml([...staticEntries, ...guideDocEntries, ...blogUrls]);

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(xml);
  } catch (err) {
    console.error('sitemap:', err);
    res.status(500).setHeader('Content-Type', 'text/plain; charset=utf-8').send('Failed to generate sitemap');
  }
}
