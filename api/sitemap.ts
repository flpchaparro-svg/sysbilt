import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildSitemapXml, fetchPublishedPostSlugs, STATIC_PATHS } from '../lib/sitemap-builder';

export default async function handler(_req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    const posts = await fetchPublishedPostSlugs();
    const xml = buildSitemapXml(STATIC_PATHS, posts);
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(xml);
  } catch (err) {
    console.error('sitemap:', err);
    res.status(500).setHeader('Content-Type', 'text/plain; charset=utf-8').send('Failed to generate sitemap');
  }
}
