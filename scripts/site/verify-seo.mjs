#!/usr/bin/env node
/**
 * Pre-deploy SEO guard. Runs after stamp-meta in the build pipeline; a non-zero
 * exit aborts the Vercel deploy.
 *
 * It re-derives the route + sitemap sets from the SAME SOURCE DATA the app uses
 * (Sanity content + the shared route definitions) — it never fetches production —
 * then asserts, for every indexable route, that the generated dist HTML has:
 *   - a unique, non-generic <title>
 *   - exactly one self-referential <link rel="canonical">
 *   - no accidental noindex
 *   - every JSON-LD @type that stamp-meta intended to emit
 * and that the sitemap set and the stamped indexable set agree in both directions.
 *
 * Hard-fails on Sanity fetch errors, matching stamp-meta's behaviour.
 */
import { readFile } from 'node:fs/promises';
import { BTW_CHAPTER_SLUGS, BTW_HUB_ROUTE } from './btw-seo-routes.mjs';
import {
  STATIC_ROUTES,
  canonicalUrl,
  distPathForRoute,
  GENERIC_TITLE,
  INDEXABLE_EXCLUDE,
  fetchSanityContent,
  buildAllRoutes,
} from './stamp-meta.mjs';

const violations = [];
const addViolation = (msg) => violations.push(msg);

async function readDist(routePath) {
  try {
    return await readFile(distPathForRoute(routePath), 'utf8');
  } catch {
    return null;
  }
}

function checkRouteHtml(route, html) {
  const p = route.path;
  if (html == null) {
    addViolation(`${p} — dist HTML missing (${distPathForRoute(p)})`);
    return;
  }

  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  if (!titleMatch) {
    addViolation(`${p} — no <title> tag`);
  } else {
    const title = titleMatch[1].trim();
    if (!title) addViolation(`${p} — empty <title>`);
    else if (title === GENERIC_TITLE) addViolation(`${p} — generic/un-stamped <title> ("${title}")`);
  }

  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)];
  if (canonicals.length === 0) {
    addViolation(`${p} — missing <link rel="canonical">`);
  } else if (canonicals.length > 1) {
    addViolation(`${p} — ${canonicals.length} canonical tags (expected 1)`);
  } else {
    const expected = canonicalUrl(p);
    if (canonicals[0][1] !== expected) {
      addViolation(`${p} — canonical "${canonicals[0][1]}" != expected "${expected}"`);
    }
  }

  if (!INDEXABLE_EXCLUDE.has(p)) {
    if (/<meta[^>]+name="robots"[^>]*content="[^"]*noindex/i.test(html)) {
      addViolation(`${p} — unexpected noindex robots meta on an indexable route`);
    }
  }

  const expectedTypes = Array.isArray(route.jsonLd)
    ? route.jsonLd.map((s) => s && s['@type']).filter(Boolean)
    : [];
  for (const type of expectedTypes) {
    if (!html.includes(`"@type":"${type}"`)) {
      addViolation(`${p} — missing build-time JSON-LD @type "${type}"`);
    }
  }
}

/** Sitemap URL set derived from the same source data the API route uses. */
function buildSitemapPathSet(content) {
  const set = new Set();
  for (const r of STATIC_ROUTES) {
    if (!INDEXABLE_EXCLUDE.has(r.path)) set.add(r.path);
  }
  for (const g of content.guides) {
    if (g.slug && g.slug !== 'built-to-work') set.add(`/guides/${g.slug}`);
  }
  set.add(BTW_HUB_ROUTE);
  for (const slug of BTW_CHAPTER_SLUGS) set.add(`${BTW_HUB_ROUTE}/${slug}`);
  for (const post of content.posts) {
    if (post.slug) set.add(`/blog/${post.slug}`);
  }
  for (const item of content.toolkitItems) {
    if (item.slug) set.add(`/toolkit/${item.slug}`);
  }
  return set;
}

async function main() {
  let content;
  try {
    content = await fetchSanityContent();
  } catch (err) {
    console.error('[verify-seo] Sanity fetch failed — aborting build.');
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }

  const { routes } = buildAllRoutes(content);

  for (const route of routes) {
    const html = await readDist(route.path);
    checkRouteHtml(route, html);
  }

  const sitemapSet = buildSitemapPathSet(content);
  const indexableSet = new Set(routes.map((r) => r.path).filter((p) => !INDEXABLE_EXCLUDE.has(p)));

  for (const p of indexableSet) {
    if (!sitemapSet.has(p)) addViolation(`sitemap — indexable route ${p} would be missing from the sitemap`);
  }
  for (const p of sitemapSet) {
    if (!indexableSet.has(p)) addViolation(`sitemap — sitemap URL ${p} has no stamped indexable page`);
  }

  if (violations.length > 0) {
    console.error(`[verify-seo] FAIL — ${violations.length} violation(s):`);
    for (const v of violations) console.error(`  \u2717 ${v}`);
    process.exit(1);
  }

  console.log(
    `[verify-seo] PASS — ${routes.length} routes verified (title, canonical, noindex, JSON-LD, sitemap set of ${sitemapSet.size}).`
  );
}

main().catch((err) => {
  console.error('[verify-seo] Fatal error:', err);
  process.exit(1);
});
