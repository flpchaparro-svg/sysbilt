import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@sanity/client';
import { BTW_CHAPTER_SLUGS, BTW_HUB_ROUTE as BTW_HUB_PATH } from '../scripts/site/btw-seo-routes.mjs';
import { BTS_CHAPTER_SLUGS, BTS_HUB_ROUTE as BTS_HUB_PATH } from '../scripts/site/bts-seo-routes.mjs';
import { BTC_CHAPTER_SLUGS, BTC_HUB_ROUTE as BTC_HUB_PATH } from '../scripts/site/btc-seo-routes.mjs';

const BASE_URL = 'https://sysbilt.com';

type StaticPage = { path: string; priority: string };

const STATIC_PAGES: readonly StaticPage[] = [
  { path: '/', priority: '1.0' },
  { path: '/system', priority: '0.9' },
  { path: '/process', priority: '0.9' },
  { path: '/architect', priority: '0.9' },
  { path: '/proof', priority: '0.9' },
  { path: '/blog', priority: '0.9' },
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
  { path: '/toolkit', priority: '0.7' },
] as const;

const POSTS_QUERY = `*[_type == "post" && !(_id in path("drafts.**"))]{
  "slug": slug.current, publishedAt
}`;

const GUIDES_QUERY = `*[_type == "guide" && !(_id in path("drafts.**"))]{
  "slug": slug.current,
  publishedAt
}`;

const TOOLKIT_QUERY = `*[_type == "toolkitItem" && !(_id in path("drafts.**"))]{
  "slug": slug.current,
  _updatedAt
}`;

type PostRow = { slug: string | null; publishedAt: string | null };
type GuideRow = { slug: string | null; publishedAt: string | null };
type ToolkitRow = { slug: string | null; _updatedAt: string | null };

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

    const [posts, guidesFromCms, toolkitItems] = await Promise.all([
      client.fetch<PostRow[]>(POSTS_QUERY),
      client.fetch<GuideRow[]>(GUIDES_QUERY),
      client.fetch<ToolkitRow[]>(TOOLKIT_QUERY),
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

    const guideDocEntries: UrlEntry[] = guidesFromCms
      .filter(
        (g): g is { slug: string; publishedAt: string | null } =>
          typeof g.slug === 'string' && g.slug.length > 0 && g.slug !== 'built-to-work' && g.slug !== 'built-to-sell' && g.slug !== 'built-to-close',
      )
      .map((g) => ({
        loc: `${BASE_URL}/guides/${encodeURIComponent(g.slug)}`,
        lastmod: guideLastmodBySlug.get(g.slug) ?? today,
        changefreq: 'weekly',
        priority: '0.8',
      }));

    const btwHubEntry: UrlEntry = {
      loc: `${BASE_URL}${BTW_HUB_PATH}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
    };

    const btwChapterEntries: UrlEntry[] = BTW_CHAPTER_SLUGS.map((slug) => ({
      loc: `${BASE_URL}${BTW_HUB_PATH}/${encodeURIComponent(slug)}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.75',
    }));

    const btsHubEntry: UrlEntry = {
      loc: `${BASE_URL}${BTS_HUB_PATH}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
    };

    const btsChapterEntries: UrlEntry[] = BTS_CHAPTER_SLUGS.map((slug) => ({
      loc: `${BASE_URL}${BTS_HUB_PATH}/${encodeURIComponent(slug)}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.75',
    }));

    const btcHubEntry: UrlEntry = {
      loc: `${BASE_URL}${BTC_HUB_PATH}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
    };

    const btcChapterEntries: UrlEntry[] = BTC_CHAPTER_SLUGS.map((slug) => ({
      loc: `${BASE_URL}${BTC_HUB_PATH}/${encodeURIComponent(slug)}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.75',
    }));

    const blogUrls: UrlEntry[] = posts
      .filter((p): p is { slug: string; publishedAt: string | null } => typeof p.slug === 'string' && p.slug.length > 0)
      .map((p) => ({
        loc: `${BASE_URL}/blog/${encodeURIComponent(p.slug)}`,
        lastmod: p.publishedAt ? new Date(p.publishedAt).toISOString().split('T')[0] : today,
        changefreq: 'weekly',
        priority: '0.65',
      }));

    const toolkitUrls: UrlEntry[] = toolkitItems
      .filter((t): t is { slug: string; _updatedAt: string | null } => typeof t.slug === 'string' && t.slug.length > 0)
      .map((t) => ({
        loc: `${BASE_URL}/toolkit/${encodeURIComponent(t.slug)}`,
        lastmod: t._updatedAt ? new Date(t._updatedAt).toISOString().split('T')[0] : today,
        changefreq: 'weekly',
        priority: '0.65',
      }));

    const seen = new Set<string>();
    const entries = [...staticEntries, ...guideDocEntries, btwHubEntry, ...btwChapterEntries, btsHubEntry, ...btsChapterEntries, btcHubEntry, ...btcChapterEntries, ...blogUrls, ...toolkitUrls].filter((entry) => {
      if (seen.has(entry.loc)) return false;
      seen.add(entry.loc);
      return true;
    });

    const xml = buildXml(entries);

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(xml);
  } catch (err) {
    console.error('sitemap:', err);
    res.status(500).setHeader('Content-Type', 'text/plain; charset=utf-8').send('Failed to generate sitemap');
  }
}
