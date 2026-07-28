import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@sanity/client';
import { BTW_CHAPTER_SLUGS, BTW_HUB_ROUTE as BTW_HUB_PATH } from '../scripts/site/btw-seo-routes.mjs';
import { BTS_CHAPTER_SLUGS, BTS_HUB_ROUTE as BTS_HUB_PATH } from '../scripts/site/bts-seo-routes.mjs';
import { BTC_CHAPTER_SLUGS, BTC_HUB_ROUTE as BTC_HUB_PATH } from '../scripts/site/btc-seo-routes.mjs';
import { BTR_CHAPTER_SLUGS, BTR_HUB_ROUTE as BTR_HUB_PATH } from '../scripts/site/btr-seo-routes.mjs';
import { BTT_CHAPTER_SLUGS, BTT_HUB_ROUTE as BTT_HUB_PATH } from '../scripts/site/btt-seo-routes.mjs';
import { BTM_CHAPTER_SLUGS, BTM_HUB_ROUTE as BTM_HUB_PATH } from '../scripts/site/btm-seo-routes.mjs';
import { BTE_CHAPTER_SLUGS, BTE_HUB_ROUTE as BTE_HUB_PATH } from '../scripts/site/bte-seo-routes.mjs';
import { BSE_CHAPTER_SLUGS, BSE_HUB_ROUTE as BSE_HUB_PATH } from '../scripts/site/bse-seo-routes.mjs';

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
  { path: '/terms', priority: '0.6' },
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

/** Sanity guide hubs replaced by code-defined /guides/built-to-* routes. */
const CODE_DEFINED_GUIDE_HUB_SLUGS = new Set([
  'built-to-work',
  'built-to-sell',
  'built-to-close',
  'built-to-run',
  'built-to-think',
  'built-to-multiply',
  'built-to-teach',
  'built-to-see',
]);

const POSTS_QUERY = `*[_type == "post" && !(_id in path("drafts.**"))]{
  "slug": slug.current, publishedAt, _updatedAt
}`;

const GUIDES_QUERY = `*[_type == "guide" && !(_id in path("drafts.**"))]{
  "slug": slug.current,
  publishedAt,
  _updatedAt
}`;

const TOOLKIT_QUERY = `*[_type == "toolkitItem" && !(_id in path("drafts.**"))]{
  "slug": slug.current,
  _updatedAt
}`;

type PostRow = { slug: string | null; publishedAt: string | null; _updatedAt: string | null };
type GuideRow = { slug: string | null; publishedAt: string | null; _updatedAt: string | null };
type ToolkitRow = { slug: string | null; _updatedAt: string | null };

/** Prefer real CMS dates. Never invent "today" for static/code routes. */
function cmsLastmod(updatedAt: string | null | undefined, publishedAt?: string | null): string | undefined {
  const raw = updatedAt || publishedAt;
  if (!raw) return undefined;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return undefined;
  return isoDateOnly(d);
}

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
      useCdn: false,
      apiVersion: '2024-02-20',
    });

    const [posts, guidesFromCms, toolkitItems] = await Promise.all([
      client.fetch<PostRow[]>(POSTS_QUERY),
      client.fetch<GuideRow[]>(GUIDES_QUERY),
      client.fetch<ToolkitRow[]>(TOOLKIT_QUERY),
    ]);

    const staticEntries: UrlEntry[] = STATIC_PAGES.map(({ path, priority }) => ({
      loc: path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`,
      changefreq: 'weekly',
      priority,
    }));

    const guideDocEntries: UrlEntry[] = guidesFromCms
      .filter(
        (g): g is GuideRow & { slug: string } =>
          typeof g.slug === 'string' &&
          g.slug.length > 0 &&
          !CODE_DEFINED_GUIDE_HUB_SLUGS.has(g.slug),
      )
      .map((g) => ({
        loc: `${BASE_URL}/guides/${encodeURIComponent(g.slug)}`,
        lastmod: cmsLastmod(g._updatedAt, g.publishedAt),
        changefreq: 'weekly',
        priority: '0.8',
      }));

    const chapterEntry = (hubPath: string, slug: string): UrlEntry => ({
      loc: `${BASE_URL}${hubPath}/${encodeURIComponent(slug)}`,
      changefreq: 'monthly',
      priority: '0.75',
    });

    const hubEntry = (hubPath: string): UrlEntry => ({
      loc: `${BASE_URL}${hubPath}`,
      changefreq: 'monthly',
      priority: '0.8',
    });

    const btwHubEntry = hubEntry(BTW_HUB_PATH);
    const btwChapterEntries = BTW_CHAPTER_SLUGS.map((slug) => chapterEntry(BTW_HUB_PATH, slug));
    const btsHubEntry = hubEntry(BTS_HUB_PATH);
    const btsChapterEntries = BTS_CHAPTER_SLUGS.map((slug) => chapterEntry(BTS_HUB_PATH, slug));
    const btcHubEntry = hubEntry(BTC_HUB_PATH);
    const btcChapterEntries = BTC_CHAPTER_SLUGS.map((slug) => chapterEntry(BTC_HUB_PATH, slug));
    const btrHubEntry = hubEntry(BTR_HUB_PATH);
    const btrChapterEntries = BTR_CHAPTER_SLUGS.map((slug) => chapterEntry(BTR_HUB_PATH, slug));
    const bttHubEntry = hubEntry(BTT_HUB_PATH);
    const bttChapterEntries = BTT_CHAPTER_SLUGS.map((slug) => chapterEntry(BTT_HUB_PATH, slug));
    const btmHubEntry = hubEntry(BTM_HUB_PATH);
    const btmChapterEntries = BTM_CHAPTER_SLUGS.map((slug) => chapterEntry(BTM_HUB_PATH, slug));
    const bteHubEntry = hubEntry(BTE_HUB_PATH);
    const bteChapterEntries = BTE_CHAPTER_SLUGS.map((slug) => chapterEntry(BTE_HUB_PATH, slug));
    const bseHubEntry = hubEntry(BSE_HUB_PATH);
    const bseChapterEntries = BSE_CHAPTER_SLUGS.map((slug) => chapterEntry(BSE_HUB_PATH, slug));

    const blogUrls: UrlEntry[] = posts
      .filter((p): p is PostRow & { slug: string } => typeof p.slug === 'string' && p.slug.length > 0)
      .map((p) => ({
        loc: `${BASE_URL}/blog/${encodeURIComponent(p.slug)}`,
        lastmod: cmsLastmod(p._updatedAt, p.publishedAt),
        changefreq: 'weekly',
        priority: '0.65',
      }));

    const toolkitUrls: UrlEntry[] = toolkitItems
      .filter((t): t is ToolkitRow & { slug: string } => typeof t.slug === 'string' && t.slug.length > 0)
      .map((t) => ({
        loc: `${BASE_URL}/toolkit/${encodeURIComponent(t.slug)}`,
        lastmod: cmsLastmod(t._updatedAt),
        changefreq: 'weekly',
        priority: '0.65',
      }));

    const seen = new Set<string>();
    const entries = [...staticEntries, ...guideDocEntries, btwHubEntry, ...btwChapterEntries, btsHubEntry, ...btsChapterEntries, btcHubEntry, ...btcChapterEntries, btrHubEntry, ...btrChapterEntries, bttHubEntry, ...bttChapterEntries, btmHubEntry, ...btmChapterEntries, bteHubEntry, ...bteChapterEntries, bseHubEntry, ...bseChapterEntries, ...blogUrls, ...toolkitUrls].filter((entry) => {
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
