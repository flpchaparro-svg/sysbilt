#!/usr/bin/env node
/**
 * Wave B1 build orchestrator: turns the content snapshot + the client Vite
 * build into the deployed `dist/` HTML for every route.
 *
 * - `required-body` routes (see `src/site/routePolicy.ts`) get a real
 *   server-rendered React body: imports the SSR bundle
 *   (`vite build --ssr src/entry-server.tsx --outDir .build/ssr`), renders
 *   it, strips the native `<title>/<meta>/<link>` tags React 19 hoists into
 *   the fragment (the stamped head below is the single source of truth for
 *   those), and splices the remaining body markup into `#root` with
 *   `data-ssr="1"` and an embedded `window.__SYSBILT_ROUTE_DATA__` payload
 *   for the client to hydrate against with no re-fetch.
 * - Every other indexable route keeps Wave A's behaviour: head-only
 *   stamping via `stampHtml`, `#root` left as the client's static
 *   placeholder, and the client hydrates/renders normally on load
 *   (`temporary-legacy-shell`) or is stamped `noindex` and excluded from
 *   the sitemap (`noindex-shell`).
 *
 * Also writes `dist/sitemap.xml` and `.build/route-catalog.json` (the full
 * per-route policy + word-count record `verify-seo.mjs` Guard v2 reads).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  buildAllRoutes,
  buildSitemapXml,
  distPathForRoute,
  fetchSanityContent,
  stampHtml,
} from './stamp-meta.mjs';
import {
  bodyPolicyForPath,
  REQUIRED_BODY_PATHS,
  NOINDEX_BOOK_READ_PATHS,
  wordThresholdForRequiredBodyPath,
} from '../../src/site/routePolicy';
import { BTW_META } from '../../src/built-to-work/types';
import { BTS_META } from '../../src/built-to-sell/types';
import { BTC_META } from '../../src/built-to-close/types';
import { BTR_META } from '../../src/built-to-run/types';
import { BTT_META } from '../../src/built-to-think/types';
import { BTM_META } from '../../src/built-to-multiply/types';
import { BTE_META } from '../../src/built-to-teach/types';
import { BSE_META } from '../../src/built-to-see/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const DIST = path.join(ROOT, 'dist');
const TEMPLATE_PATH = path.join(DIST, 'index.html');
const SITEMAP_PATH = path.join(DIST, 'sitemap.xml');
const SNAPSHOT_PATH = path.join(ROOT, '.build', 'content-snapshot.json');
const SSR_ENTRY_PATH = path.join(ROOT, '.build', 'ssr', 'entry-server.js');
const CATALOG_PATH = path.join(ROOT, '.build', 'route-catalog.json');

/**
 * React 19 hoists `<title>`, `<meta>`, and `<link>` elements wherever they
 * render in the tree; `prerenderToNodeStream`'s output always has them
 * concatenated at the very start of the fragment, before the actual body
 * markup. `stampHtml`'s route metadata (identical values, already the
 * source `RouteHead` renders from) is the single source of truth for the
 * deployed head, so this prefix is discarded rather than merged.
 */
const HEAD_TAG_PREFIX = /^(?:<title>[\s\S]*?<\/title>|<meta[^>]*\/?>|<link[^>]*\/?>)+/;

function extractSsrBody(html) {
  return html.replace(HEAD_TAG_PREFIX, '');
}

function wordCountOfText(text) {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

/** Rough visible-text word count for a rendered HTML fragment. */
function wordCountOfHtml(html) {
  const withoutScriptsAndStyles = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const text = withoutScriptsAndStyles.replace(/<[^>]+>/g, ' ').replace(/&[a-zA-Z#0-9]+;/g, ' ');
  return wordCountOfText(text);
}

/**
 * The eight code-defined guide books' "read online" long-form editions.
 * Not part of `buildAllRoutes()` (they're a static reading view, not a
 * distinct piece of content) so they're stamped as a separate noindex
 * side-channel, never added to the sitemap-building route list.
 */
const BOOK_READ_TITLES = [BTW_META, BTS_META, BTC_META, BTR_META, BTT_META, BTM_META, BTE_META, BSE_META].map(
  (meta) => meta.title
);

function bookReadShellRoutes() {
  return NOINDEX_BOOK_READ_PATHS.map((routePath, i) => ({
    path: routePath,
    title: `${BOOK_READ_TITLES[i]}: full edition | SYSBILT`,
    description: `Read the full print edition of ${BOOK_READ_TITLES[i]} online.`,
    robots: 'noindex, follow',
    jsonLd: [],
  }));
}

/**
 * Reshapes a snapshot post into the `relatedPosts` item shape the client
 * fetch produces (a dereferenced Sanity `slug` object, not a bare string) so
 * `BlogPostPage`'s `relatedPost.slug?.current` links work identically
 * whether the data came from this embed or the client's own live fetch.
 */
function toRelatedPostItem(post) {
  return {
    title: post.title,
    slug: { current: post.slug },
    mainImage: post.mainImage,
    servicePillar: post.servicePillar,
    publishedAt: post.publishedAt,
  };
}

/** Mirrors `BlogPostPage`'s own related-posts fallback so the SSR embed and a live client fetch never disagree. */
function buildBlogRouteData(snapshot, slug) {
  const post = (snapshot.posts ?? []).find((p) => p.slug === slug);
  if (!post) return null;

  let related;
  if (Array.isArray(post.relatedPosts) && post.relatedPosts.length > 0) {
    related = post.relatedPosts;
  } else {
    const others = (snapshot.posts ?? []).filter((p) => p.slug !== slug);
    const samePillar = others.filter((p) => p.servicePillar === post.servicePillar);
    const otherPillar = others.filter((p) => p.servicePillar !== post.servicePillar);
    const combined = samePillar.length >= 3 ? samePillar : [...samePillar, ...otherPillar];
    related = combined.slice(0, 3).map(toRelatedPostItem);
  }

  return { slug, post, relatedPosts: related };
}

/** Sanity guide cards for `/guides`, reshaped to the client fetch shape (`slug.current`). */
function buildGuidesHubRouteData(snapshot) {
  const guides = (snapshot.guides ?? []).map((g) => ({
    title: g.title,
    subtitle: g.subtitle,
    slug: { current: g.slug },
    servicePillar: g.servicePillar,
  }));
  return { guides };
}

/** `null` for routes that derive everything from static/code content. */
function routeDataFor(routePath, snapshot) {
  if (routePath.startsWith('/blog/')) {
    return buildBlogRouteData(snapshot, routePath.slice('/blog/'.length));
  }
  if (routePath === '/guides') {
    return buildGuidesHubRouteData(snapshot);
  }
  return null;
}

function injectSsrBody({ template, body, routeData }) {
  // Non-greedy body + a `</body>` lookahead: matches exactly the outermost
  // `<div id="root">…</div>` (the last element before `</body>` in the
  // client build's template) regardless of how deeply nested its
  // placeholder markup is, with no HTML-tag-depth tracking needed.
  const rootPattern = /<div id="root">[\s\S]*?<\/div>\s*(?=<\/body>)/;
  if (!rootPattern.test(template)) {
    throw new Error('[render-routes] Could not find <div id="root">…</div> in the client template');
  }
  const dataScript =
    routeData != null
      ? `<script>window.__SYSBILT_ROUTE_DATA__=${JSON.stringify(routeData).replace(/</g, '\\u003c')};</script>\n  `
      : '';
  const replacement = `${dataScript}<div id="root" data-ssr="1">${body}</div>`;
  return template.replace(rootPattern, replacement);
}

async function main() {
  let template;
  try {
    template = await readFile(TEMPLATE_PATH, 'utf8');
  } catch {
    console.error(`[render-routes] dist/index.html not found at ${TEMPLATE_PATH}. Run "vite build" first.`);
    process.exit(1);
  }

  if (!existsSync(SNAPSHOT_PATH)) {
    console.error(
      `[render-routes] Content snapshot not found at ${path.relative(ROOT, SNAPSHOT_PATH)}. ` +
        `Run capture-content-snapshot.mjs first.`
    );
    process.exit(1);
  }
  const snapshot = JSON.parse(await readFile(SNAPSHOT_PATH, 'utf8'));

  let content;
  let allRoutes;
  let skipped = [];
  try {
    content = await fetchSanityContent(); // reads the same snapshot (see stamp-meta.mjs's fromSnapshot)
    const result = buildAllRoutes(content);
    allRoutes = result.routes;
    skipped = result.skipped;
  } catch (err) {
    console.error('[render-routes] Failed to build the route list from the content snapshot.');
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }

  if (!existsSync(SSR_ENTRY_PATH)) {
    console.error(
      `[render-routes] SSR bundle not found at ${path.relative(ROOT, SSR_ENTRY_PATH)}. ` +
        `Run: vite build --ssr src/entry-server.tsx --outDir .build/ssr`
    );
    process.exit(1);
  }
  const { render } = await import(pathToFileURL(SSR_ENTRY_PATH).href);

  const catalog = [];
  const policyCounts = { 'required-body': 0, 'temporary-legacy-shell': 0, 'noindex-shell': 0 };

  for (const route of allRoutes) {
    const policy = bodyPolicyForPath(route.path);
    let html;
    let wordCount = null;

    if (policy === 'required-body') {
      const routeData = routeDataFor(route.path, snapshot);
      const { html: rendered } = await render(route.path, routeData);
      const body = extractSsrBody(rendered);
      const stamped = stampHtml(template, route);
      html = injectSsrBody({ template: stamped, body, routeData });
      wordCount = wordCountOfHtml(body);
    } else {
      html = stampHtml(template, route);
    }

    const outPath = distPathForRoute(route.path);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf8');

    policyCounts[policy] += 1;
    catalog.push({ path: route.path, policy, wordCount });
  }

  for (const route of bookReadShellRoutes()) {
    const html = stampHtml(template, route);
    const outPath = distPathForRoute(route.path);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf8');
    policyCounts['noindex-shell'] += 1;
    catalog.push({ path: route.path, policy: 'noindex-shell', wordCount: null });
  }

  const renderedPilots = catalog.filter((r) => r.policy === 'required-body').map((r) => r.path);
  const missingPilots = REQUIRED_BODY_PATHS.filter((p) => !renderedPilots.includes(p));
  if (missingPilots.length > 0) {
    console.error(
      `[render-routes] ${missingPilots.length} required-body pilot(s) were not found in the built route list: ` +
        missingPilots.join(', ')
    );
    process.exit(1);
  }

  const sitemap = buildSitemapXml(allRoutes, content);
  await writeFile(SITEMAP_PATH, sitemap.xml, 'utf8');

  await mkdir(path.dirname(CATALOG_PATH), { recursive: true });
  await writeFile(
    CATALOG_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        snapshotHash: snapshot.snapshotHash,
        policyCounts,
        routes: catalog,
      },
      null,
      2
    ),
    'utf8'
  );

  console.log(
    `[render-routes] Rendered ${allRoutes.length + NOINDEX_BOOK_READ_PATHS.length} routes ` +
      `(${policyCounts['required-body']} required-body, ${policyCounts['temporary-legacy-shell']} temporary-legacy-shell, ` +
      `${policyCounts['noindex-shell']} noindex-shell).`
  );
  for (const p of renderedPilots) {
    const entry = catalog.find((r) => r.path === p);
    const threshold = wordThresholdForRequiredBodyPath(p);
    const flag = entry.wordCount < threshold ? ' \u2717 UNDER THRESHOLD' : '';
    console.log(`  - ${p}: ${entry.wordCount} words (threshold ${threshold})${flag}`);
  }
  if (skipped.length > 0) {
    console.log('[render-routes] Skipped Sanity entries:');
    for (const line of skipped) {
      console.log(`  - ${line}`);
    }
  }
  console.log(`[render-routes] Wrote dist/sitemap.xml with ${sitemap.paths.length} deployed indexable routes.`);
  console.log(`[render-routes] Wrote ${path.relative(ROOT, CATALOG_PATH)}.`);
}

main().catch((err) => {
  console.error('[render-routes] Fatal error:', err);
  process.exit(1);
});
