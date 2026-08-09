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
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BTW_CHAPTER_SLUGS,
  BTW_HUB_ROUTE,
  BTW_CHAPTER_META_BY_SLUG,
} from './btw-seo-routes.mjs';
import {
  BTS_CHAPTER_SLUGS,
  BTS_HUB_ROUTE,
  BTS_CHAPTER_META_BY_SLUG,
} from './bts-seo-routes.mjs';
import {
  BTC_CHAPTER_SLUGS,
  BTC_HUB_ROUTE,
  BTC_CHAPTER_META_BY_SLUG,
} from './btc-seo-routes.mjs';
import {
  BTR_CHAPTER_SLUGS,
  BTR_HUB_ROUTE,
  BTR_CHAPTER_META_BY_SLUG,
} from './btr-seo-routes.mjs';
import {
  BTT_CHAPTER_SLUGS,
  BTT_HUB_ROUTE,
  BTT_CHAPTER_META_BY_SLUG,
} from './btt-seo-routes.mjs';
import {
  BTM_CHAPTER_SLUGS,
  BTM_HUB_ROUTE,
  BTM_CHAPTER_META_BY_SLUG,
} from './btm-seo-routes.mjs';
import {
  BTE_CHAPTER_SLUGS,
  BTE_HUB_ROUTE,
  BTE_CHAPTER_META_BY_SLUG,
} from './bte-seo-routes.mjs';
import {
  BSE_CHAPTER_SLUGS,
  BSE_HUB_ROUTE,
  BSE_CHAPTER_META_BY_SLUG,
} from './bse-seo-routes.mjs';
import { BTW_CHAPTERS } from '../../src/built-to-work/chapter-seo.ts';
import { BTS_CHAPTERS } from '../../src/built-to-sell/chapter-seo.ts';
import { BTC_CHAPTERS } from '../../src/built-to-close/chapter-seo.ts';
import { BTR_CHAPTERS } from '../../src/built-to-run/chapter-seo.ts';
import { BTT_CHAPTERS } from '../../src/built-to-think/chapter-seo.ts';
import { BTM_CHAPTERS } from '../../src/built-to-multiply/chapter-seo.ts';
import { BTE_CHAPTERS } from '../../src/built-to-teach/chapter-seo.ts';
import { BSE_CHAPTERS } from '../../src/built-to-see/chapter-seo.ts';
import {
  canonicalUrl,
  distPathForRoute,
  GENERIC_TITLE,
  isGoFunnelPath,
  isIndexableExcluded,
  fetchSanityContent,
  buildAllRoutes,
  buildSitemapXml,
} from './stamp-meta.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');

const violations = [];
const addViolation = (msg) => violations.push(msg);

async function readDist(routePath) {
  try {
    return await readFile(distPathForRoute(routePath), 'utf8');
  } catch {
    return null;
  }
}

async function readSource(relativePath) {
  try {
    return await readFile(path.join(ROOT, relativePath), 'utf8');
  } catch {
    addViolation(`crawl graph — could not read ${relativePath}`);
    return '';
  }
}

async function checkWaveACrawlGraph() {
  const [header, footer, ctaButton, guidesHub, homeGuides, vercelConfig] = await Promise.all([
    readSource('src/components/GlobalHeader.tsx'),
    readSource('src/components/GlobalFooter.tsx'),
    readSource('src/components/CTAButton.tsx'),
    readSource('src/pages/GuidesHubPage.tsx'),
    readSource('src/components/HomePage/GuideLibrarySection.tsx'),
    readSource('vercel.json'),
  ]);

  if (header.includes('onNavigate')) {
    addViolation('crawl graph — GlobalHeader still uses button-only onNavigate routing');
  }
  if (footer.includes('onNavigate')) {
    addViolation('crawl graph — GlobalFooter still uses button-only onNavigate routing');
  }
  if (!ctaButton.includes('<Link to={to}')) {
    addViolation('crawl graph — CTAButton link mode is missing');
  }

  const headerPaths = ['/', '/architect', '/system', '/process', '/proof', '/blog', '/contact'];
  for (const routePath of headerPaths) {
    if (!header.includes(`'${routePath}'`) && !header.includes(`"${routePath}"`)) {
      addViolation(`crawl graph — GlobalHeader is missing route ${routePath}`);
    }
  }

  const footerPaths = [
    '/',
    '/architect',
    '/process',
    '/proof',
    '/pillar1',
    '/pillar2',
    '/pillar3',
    '/pillar4',
    '/pillar5',
    '/pillar6',
    '/pillar7',
    '/blog',
    '/toolkit',
    '/guides',
    '/news',
    '/privacy',
    '/terms',
  ];
  for (const routePath of footerPaths) {
    if (!footer.includes(`'${routePath}'`) && !footer.includes(`"${routePath}"`)) {
      addViolation(`crawl graph — GlobalFooter is missing route ${routePath}`);
    }
  }

  if (!guidesHub.includes('FEATURED_CODE_GUIDES.map') || guidesHub.includes('FEATURED_INITIAL_VISIBLE')) {
    addViolation('crawl graph — /guides must render all eight code-defined guide hubs without a visibility slice');
  }
  if (!guidesHub.includes('filteredGuides.map') || guidesHub.includes('visibleSanityGuides')) {
    addViolation('crawl graph — /guides must render every filtered Sanity guide without a load-more slice');
  }

  const homeGuideMetas = [
    'BTW_META',
    'BTS_META',
    'BTC_META',
    'BTR_META',
    'BTT_META',
    'BTM_META',
    'BTE_META',
    'BSE_META',
  ];
  for (const metaName of homeGuideMetas) {
    if (!homeGuides.includes(`{ meta: ${metaName},`)) {
      addViolation(`crawl graph — homepage guide section is missing ${metaName}`);
    }
  }

  const pillarBookRoutes = [
    ['src/pages/System/Pillar1.tsx', BTW_HUB_ROUTE],
    ['src/pages/System/Pillar2.tsx', BTC_HUB_ROUTE],
    ['src/pages/System/Pillar3.tsx', BTR_HUB_ROUTE],
    ['src/pages/System/Pillar4.tsx', BTT_HUB_ROUTE],
    ['src/pages/System/Pillar5.tsx', BTM_HUB_ROUTE],
    ['src/pages/System/Pillar6.tsx', BTE_HUB_ROUTE],
    ['src/pages/System/Pillar7.tsx', BSE_HUB_ROUTE],
  ];
  for (const [relativePath, bookRoute] of pillarBookRoutes) {
    const source = await readSource(relativePath);
    if (!source.includes(`bookPath="${bookRoute}"`)) {
      addViolation(`crawl graph — ${relativePath} is missing its ${bookRoute} field-guide link`);
    }
  }

  let parsedVercel = null;
  try {
    parsedVercel = JSON.parse(vercelConfig);
  } catch {
    addViolation('sitemap — vercel.json is not valid JSON');
  }

  if (parsedVercel) {
    const rewrites = Array.isArray(parsedVercel.rewrites) ? parsedVercel.rewrites : [];
    const rewriteBlob = JSON.stringify(rewrites);
    if (rewriteBlob.includes('/api/sitemap')) {
      addViolation('sitemap — vercel.json still routes sitemap.xml through a runtime function');
    }

    const hasIdentitySitemapRewrite = rewrites.some(
      (rule) => rule?.source === '/sitemap.xml' && rule?.destination === '/sitemap.xml'
    );
    const spaRewrite = rewrites.find(
      (rule) => rule?.destination === '/index.html' && String(rule?.source || '').includes('(?!')
    );
    const spaExcludesSitemap =
      typeof spaRewrite?.source === 'string' &&
      (spaRewrite.source.includes('sitemap\\.xml') || spaRewrite.source.includes('sitemap.xml'));

    // Static dist/sitemap.xml is filesystem-served. Guard against the SPA fallback
    // swallowing it; do not require a redundant identity rewrite (Vercel may omit those).
    if (!hasIdentitySitemapRewrite && !spaExcludesSitemap) {
      addViolation('sitemap — vercel.json SPA fallback does not exclude the static sitemap.xml route');
    }
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
    else if (/\|\s*SYSBILT\s*\|\s*SYSBILT/i.test(title)) {
      addViolation(`${p} — double-branded <title> ("${title}")`);
    }
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

  if (isIndexableExcluded(p)) {
    if (isGoFunnelPath(p)) {
      if (!/<meta[^>]+name="robots"[^>]*content="[^"]*noindex/i.test(html)) {
        addViolation(`${p} — /go/ route missing noindex robots meta`);
      }
      if (!/<meta[^>]+name="robots"[^>]*content="[^"]*nofollow/i.test(html)) {
        addViolation(`${p} — /go/ route missing nofollow robots meta`);
      }
    } else if (p === '/news') {
      if (!/<meta[^>]+name="robots"[^>]*content="[^"]*noindex/i.test(html)) {
        addViolation(`${p} — /news missing noindex robots meta`);
      }
    }
  } else if (/<meta[^>]+name="robots"[^>]*content="[^"]*noindex/i.test(html)) {
    addViolation(`${p} — unexpected noindex robots meta on an indexable route`);
  }

  if (/"wordCount"\s*:/.test(html)) {
    addViolation(`${p} — stamped JSON-LD must not emit wordCount`);
  }

  const expectedTypes = Array.isArray(route.jsonLd)
    ? route.jsonLd.map((s) => s && s['@type']).filter(Boolean)
    : [];
  for (const type of expectedTypes) {
    if (!html.includes(`"@type":"${type}"`)) {
      addViolation(`${p} — missing build-time JSON-LD @type "${type}"`);
    }
  }

  if (p === '/' || p === '/contact') {
    checkProfessionalServiceNode(p, html);
  }
}

function extractJsonLdNodes(html) {
  const nodes = [];
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const parsed = JSON.parse(match[1]);
      if (Array.isArray(parsed)) nodes.push(...parsed);
      else if (parsed && typeof parsed === 'object') nodes.push(parsed);
    } catch {
      addViolation('JSON-LD — unparseable application/ld+json script');
    }
  }
  return nodes;
}

function checkProfessionalServiceNode(routePath, html) {
  const nodes = extractJsonLdNodes(html);
  const org = nodes.find((n) => n && n['@type'] === 'ProfessionalService');
  if (!org) {
    addViolation(`${routePath} — missing JSON-LD node of @type ProfessionalService`);
    return;
  }
  if (org.address?.addressCountry !== 'AU') {
    addViolation(
      `${routePath} — ProfessionalService address.addressCountry must be "AU" (got ${JSON.stringify(org.address?.addressCountry)})`
    );
  }
  if (!Array.isArray(org.areaServed) || org.areaServed.length === 0) {
    addViolation(`${routePath} — ProfessionalService areaServed must be a non-empty array`);
  }
  const identifiers = Array.isArray(org.identifier) ? org.identifier : [];
  const hasAbn = identifiers.some((id) => id && id.propertyID === 'ABN');
  if (!hasAbn) {
    addViolation(`${routePath} — ProfessionalService identifier must contain propertyID "ABN"`);
  }
}

/**
 * Anti-drift: the shared BTW route module is the single source consumed by
 * stamp-meta and (via the generated manifest) middleware. Assert it
 * stays in lock-step with the content source (chapter-seo.ts) and that no
 * consumer has re-introduced its own hardcoded copy of the chapter slugs.
 */
async function checkBtwAntiDrift() {
  const contentSlugs = BTW_CHAPTERS.map((c) => c.slug);
  const sharedSlugs = [...BTW_CHAPTER_SLUGS];

  if (JSON.stringify(sharedSlugs) !== JSON.stringify(contentSlugs)) {
    addViolation(
      `anti-drift — btw-seo-routes.mjs BTW_CHAPTER_SLUGS != chapter-seo.ts BTW_CHAPTERS slugs ` +
        `(shared: ${sharedSlugs.length}, content: ${contentSlugs.length}). ` +
        `shared=${JSON.stringify(sharedSlugs)} content=${JSON.stringify(contentSlugs)}`
    );
  }

  for (const slug of sharedSlugs) {
    if (!BTW_CHAPTER_META_BY_SLUG[slug]) {
      addViolation(`anti-drift — btw-seo-routes.mjs missing BTW_CHAPTER_META_BY_SLUG entry for "${slug}"`);
    }
  }

  // No consumer should keep its own hardcoded chapter-slug list.
  const consumers = ['middleware.ts'];
  for (const rel of consumers) {
    let src;
    try {
      src = await readFile(path.join(ROOT, rel), 'utf8');
    } catch {
      addViolation(`anti-drift — could not read ${rel} to check for a hardcoded slug copy`);
      continue;
    }
    const hardcoded = sharedSlugs.filter((slug) => src.includes(`'${slug}'`) || src.includes(`"${slug}"`));
    if (hardcoded.length > 0) {
      addViolation(
        `anti-drift — ${rel} contains ${hardcoded.length} hardcoded BTW chapter slug literal(s); ` +
          `it must import from the shared module instead (e.g. ${hardcoded[0]})`
      );
    }
  }
}

async function checkBtsAntiDrift() {
  const contentSlugs = BTS_CHAPTERS.map((c) => c.slug);
  const sharedSlugs = [...BTS_CHAPTER_SLUGS];

  if (JSON.stringify(sharedSlugs) !== JSON.stringify(contentSlugs)) {
    addViolation(
      `anti-drift — bts-seo-routes.mjs BTS_CHAPTER_SLUGS != chapter-seo.ts BTS_CHAPTERS slugs ` +
        `(shared: ${sharedSlugs.length}, content: ${contentSlugs.length}). ` +
        `shared=${JSON.stringify(sharedSlugs)} content=${JSON.stringify(contentSlugs)}`
    );
  }

  for (const slug of sharedSlugs) {
    if (!BTS_CHAPTER_META_BY_SLUG[slug]) {
      addViolation(`anti-drift — bts-seo-routes.mjs missing BTS_CHAPTER_META_BY_SLUG entry for "${slug}"`);
    }
  }

  const consumers = ['middleware.ts'];
  for (const rel of consumers) {
    let src;
    try {
      src = await readFile(path.join(ROOT, rel), 'utf8');
    } catch {
      addViolation(`anti-drift — could not read ${rel} to check for a hardcoded slug copy`);
      continue;
    }
    const hardcoded = sharedSlugs.filter((slug) => src.includes(`'${slug}'`) || src.includes(`"${slug}"`));
    if (hardcoded.length > 0) {
      addViolation(
        `anti-drift — ${rel} contains ${hardcoded.length} hardcoded BTS chapter slug literal(s); ` +
          `it must import from the shared module instead (e.g. ${hardcoded[0]})`
      );
    }
  }
}

async function checkBtcAntiDrift() {
  const contentSlugs = BTC_CHAPTERS.map((c) => c.slug);
  const sharedSlugs = [...BTC_CHAPTER_SLUGS];

  if (JSON.stringify(sharedSlugs) !== JSON.stringify(contentSlugs)) {
    addViolation(
      `anti-drift — btc-seo-routes.mjs BTC_CHAPTER_SLUGS != chapter-seo.ts BTC_CHAPTERS slugs ` +
        `(shared: ${sharedSlugs.length}, content: ${contentSlugs.length}). ` +
        `shared=${JSON.stringify(sharedSlugs)} content=${JSON.stringify(contentSlugs)}`
    );
  }

  for (const slug of sharedSlugs) {
    if (!BTC_CHAPTER_META_BY_SLUG[slug]) {
      addViolation(`anti-drift — btc-seo-routes.mjs missing BTC_CHAPTER_META_BY_SLUG entry for "${slug}"`);
    }
  }

  const consumers = ['middleware.ts'];
  for (const rel of consumers) {
    let src;
    try {
      src = await readFile(path.join(ROOT, rel), 'utf8');
    } catch {
      addViolation(`anti-drift — could not read ${rel} to check for a hardcoded slug copy`);
      continue;
    }
    const hardcoded = sharedSlugs.filter((slug) => src.includes(`'${slug}'`) || src.includes(`"${slug}"`));
    if (hardcoded.length > 0) {
      addViolation(
        `anti-drift — ${rel} contains ${hardcoded.length} hardcoded BTC chapter slug literal(s); ` +
          `it must import from the shared module instead (e.g. ${hardcoded[0]})`
      );
    }
  }
}

async function checkBtrAntiDrift() {
  const contentSlugs = BTR_CHAPTERS.map((c) => c.slug);
  const sharedSlugs = [...BTR_CHAPTER_SLUGS];

  if (JSON.stringify(sharedSlugs) !== JSON.stringify(contentSlugs)) {
    addViolation(
      `anti-drift — btr-seo-routes.mjs BTR_CHAPTER_SLUGS != chapter-seo.ts BTR_CHAPTERS slugs ` +
        `(shared: ${sharedSlugs.length}, content: ${contentSlugs.length}). ` +
        `shared=${JSON.stringify(sharedSlugs)} content=${JSON.stringify(contentSlugs)}`
    );
  }

  for (const slug of sharedSlugs) {
    if (!BTR_CHAPTER_META_BY_SLUG[slug]) {
      addViolation(`anti-drift — btr-seo-routes.mjs missing BTR_CHAPTER_META_BY_SLUG entry for "${slug}"`);
    }
  }

  const consumers = ['middleware.ts'];
  for (const rel of consumers) {
    let src;
    try {
      src = await readFile(path.join(ROOT, rel), 'utf8');
    } catch {
      addViolation(`anti-drift — could not read ${rel} to check for a hardcoded slug copy`);
      continue;
    }
    const hardcoded = sharedSlugs.filter((slug) => src.includes(`'${slug}'`) || src.includes(`"${slug}"`));
    if (hardcoded.length > 0) {
      addViolation(
        `anti-drift — ${rel} contains ${hardcoded.length} hardcoded BTR chapter slug literal(s); ` +
          `it must import from the shared module instead (e.g. ${hardcoded[0]})`
      );
    }
  }
}

async function checkBttAntiDrift() {
  const contentSlugs = BTT_CHAPTERS.map((c) => c.slug);
  const sharedSlugs = [...BTT_CHAPTER_SLUGS];

  if (JSON.stringify(sharedSlugs) !== JSON.stringify(contentSlugs)) {
    addViolation(
      `anti-drift — btt-seo-routes.mjs BTT_CHAPTER_SLUGS != chapter-seo.ts BTT_CHAPTERS slugs ` +
        `(shared: ${sharedSlugs.length}, content: ${contentSlugs.length}). ` +
        `shared=${JSON.stringify(sharedSlugs)} content=${JSON.stringify(contentSlugs)}`
    );
  }

  for (const slug of sharedSlugs) {
    if (!BTT_CHAPTER_META_BY_SLUG[slug]) {
      addViolation(`anti-drift — btt-seo-routes.mjs missing BTT_CHAPTER_META_BY_SLUG entry for "${slug}"`);
    }
  }

  const consumers = ['middleware.ts'];
  for (const rel of consumers) {
    let src;
    try {
      src = await readFile(path.join(ROOT, rel), 'utf8');
    } catch {
      addViolation(`anti-drift — could not read ${rel} to check for a hardcoded slug copy`);
      continue;
    }
    const hardcoded = sharedSlugs.filter((slug) => src.includes(`'${slug}'`) || src.includes(`"${slug}"`));
    if (hardcoded.length > 0) {
      addViolation(
        `anti-drift — ${rel} contains ${hardcoded.length} hardcoded BTT chapter slug literal(s); ` +
          `it must import from the shared module instead (e.g. ${hardcoded[0]})`
      );
    }
  }
}

async function checkBtmAntiDrift() {
  const contentSlugs = BTM_CHAPTERS.map((c) => c.slug);
  const sharedSlugs = [...BTM_CHAPTER_SLUGS];

  if (JSON.stringify(sharedSlugs) !== JSON.stringify(contentSlugs)) {
    addViolation(
      `anti-drift — btm-seo-routes.mjs BTM_CHAPTER_SLUGS != chapter-seo.ts BTM_CHAPTERS slugs ` +
        `(shared: ${sharedSlugs.length}, content: ${contentSlugs.length}). ` +
        `shared=${JSON.stringify(sharedSlugs)} content=${JSON.stringify(contentSlugs)}`
    );
  }

  for (const slug of sharedSlugs) {
    if (!BTM_CHAPTER_META_BY_SLUG[slug]) {
      addViolation(`anti-drift — btm-seo-routes.mjs missing BTM_CHAPTER_META_BY_SLUG entry for "${slug}"`);
    }
  }

  const consumers = ['middleware.ts'];
  for (const rel of consumers) {
    let src;
    try {
      src = await readFile(path.join(ROOT, rel), 'utf8');
    } catch {
      addViolation(`anti-drift — could not read ${rel} to check for a hardcoded slug copy`);
      continue;
    }
    const hardcoded = sharedSlugs.filter((slug) => src.includes(`'${slug}'`) || src.includes(`"${slug}"`));
    if (hardcoded.length > 0) {
      addViolation(
        `anti-drift — ${rel} contains ${hardcoded.length} hardcoded BTM chapter slug literal(s); ` +
          `it must import from the shared module instead (e.g. ${hardcoded[0]})`
      );
    }
  }
}

async function checkBteAntiDrift() {
  const contentSlugs = BTE_CHAPTERS.map((c) => c.slug);
  const sharedSlugs = [...BTE_CHAPTER_SLUGS];

  if (JSON.stringify(sharedSlugs) !== JSON.stringify(contentSlugs)) {
    addViolation(
      `anti-drift — bte-seo-routes.mjs BTE_CHAPTER_SLUGS != chapter-seo.ts BTE_CHAPTERS slugs ` +
        `(shared: ${sharedSlugs.length}, content: ${contentSlugs.length}). ` +
        `shared=${JSON.stringify(sharedSlugs)} content=${JSON.stringify(contentSlugs)}`
    );
  }

  for (const slug of sharedSlugs) {
    if (!BTE_CHAPTER_META_BY_SLUG[slug]) {
      addViolation(`anti-drift — bte-seo-routes.mjs missing BTE_CHAPTER_META_BY_SLUG entry for "${slug}"`);
    }
  }

  const consumers = ['middleware.ts'];
  for (const rel of consumers) {
    let src;
    try {
      src = await readFile(path.join(ROOT, rel), 'utf8');
    } catch {
      addViolation(`anti-drift — could not read ${rel} to check for a hardcoded slug copy`);
      continue;
    }
    const hardcoded = sharedSlugs.filter((slug) => src.includes(`'${slug}'`) || src.includes(`"${slug}"`));
    if (hardcoded.length > 0) {
      addViolation(
        `anti-drift — ${rel} contains ${hardcoded.length} hardcoded BTE chapter slug literal(s); ` +
          `it must import from the shared module instead (e.g. ${hardcoded[0]})`
      );
    }
  }
}

async function checkBseAntiDrift() {
  const contentSlugs = BSE_CHAPTERS.map((c) => c.slug);
  const sharedSlugs = [...BSE_CHAPTER_SLUGS];

  if (JSON.stringify(sharedSlugs) !== JSON.stringify(contentSlugs)) {
    addViolation(
      `anti-drift — bse-seo-routes.mjs BSE_CHAPTER_SLUGS != chapter-seo.ts BSE_CHAPTERS slugs ` +
        `(shared: ${sharedSlugs.length}, content: ${contentSlugs.length}). ` +
        `shared=${JSON.stringify(sharedSlugs)} content=${JSON.stringify(contentSlugs)}`
    );
  }

  for (const slug of sharedSlugs) {
    if (!BSE_CHAPTER_META_BY_SLUG[slug]) {
      addViolation(`anti-drift — bse-seo-routes.mjs missing BSE_CHAPTER_META_BY_SLUG entry for "${slug}"`);
    }
  }

  const consumers = ['middleware.ts'];
  for (const rel of consumers) {
    let src;
    try {
      src = await readFile(path.join(ROOT, rel), 'utf8');
    } catch {
      addViolation(`anti-drift — could not read ${rel} to check for a hardcoded slug copy`);
      continue;
    }
    const hardcoded = sharedSlugs.filter((slug) => src.includes(`'${slug}'`) || src.includes(`"${slug}"`));
    if (hardcoded.length > 0) {
      addViolation(
        `anti-drift — ${rel} contains ${hardcoded.length} hardcoded BSE chapter slug literal(s); ` +
          `it must import from the shared module instead (e.g. ${hardcoded[0]})`
      );
    }
  }
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

  await checkBtwAntiDrift();
  await checkBtsAntiDrift();
  await checkBtcAntiDrift();
  await checkBtrAntiDrift();
  await checkBttAntiDrift();
  await checkBtmAntiDrift();
  await checkBteAntiDrift();
  await checkBseAntiDrift();
  await checkWaveACrawlGraph();

  const expectedSitemap = buildSitemapXml(routes, content);
  const sitemapPath = path.join(ROOT, 'dist', 'sitemap.xml');
  let actualSitemap = null;
  try {
    actualSitemap = await readFile(sitemapPath, 'utf8');
  } catch {
    addViolation(`sitemap — generated file missing (${sitemapPath})`);
  }
  if (actualSitemap != null && actualSitemap !== expectedSitemap.xml) {
    addViolation('sitemap — generated XML does not match the deployed route and content snapshot');
  }
  if (
    actualSitemap != null &&
    (!actualSitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>') ||
      !actualSitemap.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">') ||
      !actualSitemap.trimEnd().endsWith('</urlset>'))
  ) {
    addViolation('sitemap — generated file is missing the expected XML declaration or urlset root');
  }

  const sitemapSet = new Set(expectedSitemap.paths);
  const indexableSet = new Set(routes.map((r) => r.path).filter((p) => !isIndexableExcluded(p)));

  for (const p of sitemapSet) {
    if (p === '/news' || p === '/go' || p.startsWith('/go/')) {
      addViolation(`sitemap — ${p} must never appear in the sitemap set (funnel/news are noindex)`);
    }
  }

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
    `[verify-seo] PASS — ${routes.length} routes verified (title, canonical, noindex, JSON-LD, crawl graph, anti-drift, static sitemap set of ${sitemapSet.size}).`
  );
}

main().catch((err) => {
  console.error('[verify-seo] Fatal error:', err);
  process.exit(1);
});
