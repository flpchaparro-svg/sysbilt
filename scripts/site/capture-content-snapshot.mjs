#!/usr/bin/env node
/**
 * Wave B1 foundation: the ONE Sanity fetch for the whole build.
 *
 * Every other build step (gen-content-manifest, render-routes, verify-seo)
 * reads `.build/content-snapshot.json` instead of hitting Sanity again, so a
 * single build sees one consistent view of the content and CI/local builds
 * don't depend on Sanity being reachable three separate times.
 *
 * Also writes `src/generated/contentManifest.generated.ts` (delegating the
 * serialisation to gen-content-manifest.mjs) and a word-count census of
 * every Sanity document against the Wave B1 SSR thresholds, so under-length
 * content is visible before it gets promoted to `required-body`.
 */
import { createClient } from '@sanity/client';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeContentManifest } from './gen-content-manifest.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const BUILD_DIR = path.join(ROOT, '.build');
const SNAPSHOT_PATH = path.join(BUILD_DIR, 'content-snapshot.json');

/** Census word-count minimums, by Sanity document type. */
const CENSUS_THRESHOLDS = {
  post: 600,
  toolkitItem: 450,
  guide: 800,
};

const SNAPSHOT_QUERY = `{
  "posts": *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)] | order(slug.current asc) {
    "slug": slug.current,
    title,
    mainImage,
    ogImage,
    publishedAt,
    _updatedAt,
    body,
    servicePillar,
    seoTitle,
    seoDescription,
    focusKeyword,
    businessPhase,
    targetPersona,
    internalLinkDestination,
    tags,
    customCTA,
    "relatedPosts": relatedPosts[]->{
      title,
      slug,
      mainImage,
      servicePillar,
      publishedAt
    },
    "author": author->{
      name,
      image,
      bio
    }
  },
  "guides": *[_type == "guide" && !(_id in path("drafts.**")) && defined(slug.current)] | order(slug.current asc) {
    "slug": slug.current,
    title,
    subtitle,
    seoTitle,
    seoDescription,
    publishedAt,
    _updatedAt,
    servicePillar,
    "imageUrl": ogImage.asset->url,
    pages[]{
      _key,
      _type,
      content
    }
  },
  "toolkitItems": *[_type == "toolkitItem" && !(_id in path("drafts.**")) && defined(slug.current)] | order(slug.current asc) {
    "slug": slug.current,
    name,
    tagline,
    summary,
    benefits,
    body,
    category,
    phase,
    pricingModel,
    picks,
    linkType,
    url,
    promoCode,
    metaTitle,
    metaDescription,
    focusKeyword,
    _updatedAt,
    "authorName": author->name,
    "imageUrl": coalesce(ogImage.asset->url, mainImage.asset->url)
  },
  "funnelPages": *[_type == "funnelPage" && !(_id in path("drafts.**")) && defined(slug.current)] | order(slug.current asc) {
    "slug": slug.current,
    title,
    sub
  }
}`;

/** Recursively collects every string value in a Sanity content tree (portable text spans, custom block fields, etc). */
function collectStrings(node, out) {
  if (node == null) return;
  if (typeof node === 'string') {
    out.push(node);
    return;
  }
  if (Array.isArray(node)) {
    for (const item of node) collectStrings(item, out);
    return;
  }
  if (typeof node === 'object') {
    for (const [key, value] of Object.entries(node)) {
      // Skip Sanity plumbing (_key/_type/_ref/_id) and non-prose URL fields.
      if (key.startsWith('_') || key === 'asset' || key === 'href' || key === 'url') continue;
      collectStrings(value, out);
    }
  }
}

/** Plain text from any Sanity content tree (portable text blocks, guide page content, toolkit body). */
function toPlainText(content) {
  const strings = [];
  collectStrings(content, strings);
  return strings.join(' ');
}

function wordCount(text) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function buildCensus({ posts, guides, toolkitItems }) {
  const entries = [];

  for (const post of posts) {
    const count = wordCount(toPlainText(post.body));
    entries.push({
      type: 'post',
      slug: post.slug,
      wordCount: count,
      threshold: CENSUS_THRESHOLDS.post,
      underThreshold: count < CENSUS_THRESHOLDS.post,
    });
  }

  for (const guide of guides) {
    const count = wordCount(toPlainText(guide.pages));
    entries.push({
      type: 'guide',
      slug: guide.slug,
      wordCount: count,
      threshold: CENSUS_THRESHOLDS.guide,
      underThreshold: count < CENSUS_THRESHOLDS.guide,
    });
  }

  for (const item of toolkitItems) {
    const count = wordCount(toPlainText(item.body));
    entries.push({
      type: 'toolkitItem',
      slug: item.slug,
      wordCount: count,
      threshold: CENSUS_THRESHOLDS.toolkitItem,
      underThreshold: count < CENSUS_THRESHOLDS.toolkitItem,
    });
  }

  const underThreshold = entries.filter((e) => e.underThreshold);
  const byType = {};
  for (const type of Object.keys(CENSUS_THRESHOLDS)) {
    const ofType = entries.filter((e) => e.type === type);
    byType[type] = {
      total: ofType.length,
      underThreshold: ofType.filter((e) => e.underThreshold).length,
    };
  }

  return {
    thresholds: CENSUS_THRESHOLDS,
    totalDocs: entries.length,
    underThresholdCount: underThreshold.length,
    byType,
    entries,
    underThreshold,
  };
}

function stableHash(value) {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

async function main() {
  const client = createClient({
    projectId: 'wdlc9pg8',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-02-20',
  });

  const { posts, guides, toolkitItems, funnelPages } = await client.fetch(SNAPSHOT_QUERY);

  const census = buildCensus({ posts, guides, toolkitItems });

  const snapshotBody = { posts, guides, toolkitItems, funnelPages, census };
  const snapshotHash = stableHash(snapshotBody);
  const snapshot = {
    fetchedAt: new Date().toISOString(),
    snapshotHash,
    ...snapshotBody,
  };

  await mkdir(BUILD_DIR, { recursive: true });
  await writeFile(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2), 'utf8');

  const manifestCounts = await writeContentManifest({
    posts: posts.map((p) => p.slug),
    guides: guides.map((g) => g.slug),
    toolkit: toolkitItems.map((t) => t.slug),
  });

  console.log(
    `[capture-content-snapshot] Wrote ${path.relative(ROOT, SNAPSHOT_PATH)} ` +
      `(${posts.length} posts, ${guides.length} guides, ${toolkitItems.length} toolkit items, ${funnelPages.length} funnel pages). ` +
      `Hash ${snapshotHash.slice(0, 12)}.`
  );
  console.log(
    `[capture-content-snapshot] Wrote src/generated/contentManifest.generated.ts ` +
      `(${manifestCounts.blog} blog, ${manifestCounts.guides} guides, ${manifestCounts.toolkit} toolkit).`
  );
  console.log(
    `[capture-content-snapshot] Census: ${census.totalDocs} docs, ${census.underThresholdCount} under threshold ` +
      `(post<${CENSUS_THRESHOLDS.post}: ${census.byType.post.underThreshold}/${census.byType.post.total}, ` +
      `guide<${CENSUS_THRESHOLDS.guide}: ${census.byType.guide.underThreshold}/${census.byType.guide.total}, ` +
      `toolkitItem<${CENSUS_THRESHOLDS.toolkitItem}: ${census.byType.toolkitItem.underThreshold}/${census.byType.toolkitItem.total}).`
  );
  if (census.underThreshold.length > 0) {
    console.log('[capture-content-snapshot] Under-threshold documents:');
    for (const entry of census.underThreshold) {
      console.log(`  - ${entry.type}:${entry.slug} — ${entry.wordCount}/${entry.threshold} words`);
    }
  }
}

main().catch((err) => {
  console.error('[capture-content-snapshot] Sanity fetch failed — aborting build.');
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
