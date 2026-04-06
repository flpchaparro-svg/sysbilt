/**
 * Build-time: writes public/sitemap.xml (same URLs as /api/sitemap).
 * Run via prebuild before vite build.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSitemapXml, fetchPublishedPostSlugs, STATIC_PATHS } from '../lib/sitemap-builder';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main(): Promise<void> {
  const posts = await fetchPublishedPostSlugs();
  const xml = buildSitemapXml(STATIC_PATHS, posts);
  const out = join(__dirname, '../public/sitemap.xml');
  writeFileSync(out, xml, 'utf8');
  console.log(`Wrote ${out}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
