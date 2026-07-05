#!/usr/bin/env node
/**
 * Post-build: stamp per-route <title>, meta, canonical, og/twitter tags, and
 * build-time JSON-LD into dist/<path>/index.html so crawlers (including non-JS
 * AI fetchers) receive unique raw HTML per URL.
 *
 * Runs under tsx so it can import the app's TypeScript SEO builders directly
 * (zero duplication with the client Helmet JSON-LD).
 */
import { createClient } from '@sanity/client';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  BTW_CHAPTER_SLUGS,
  BTW_HUB_ROUTE,
  BTW_CHAPTER_META_BY_SLUG,
} from './btw-seo-routes.mjs';
import {
  BTS_CHAPTER_SLUGS,
  BTS_HUB_ROUTE,
  BTS_CHAPTER_META_BY_SLUG,
  BTS_HUB_META,
} from './bts-seo-routes.mjs';
import { buildBlogPostingJsonLd } from '../../src/utils/blogSeoJsonLd';
import { buildToolkitArticleJsonLd } from '../../src/utils/toolkitSeoJsonLd';
import { generateFAQSchema, getPillarFAQs, getSystemPageFAQs } from '../../src/constants/faqData';
import {
  BTW_CHAPTERS,
  btwChapterPath,
  extractChapterBlocks,
  extractGlossaryFaqs,
} from '../../src/built-to-work/chapter-seo';
import { BTW_CHAPTER_COVERS } from '../../src/built-to-work/chapter-covers';
import { BTW_META } from '../../src/built-to-work/types';
import {
  BTS_CHAPTERS,
  btsChapterPath,
  extractGlossaryFaqs as extractBtsGlossaryFaqs,
} from '../../src/built-to-sell/chapter-seo';
import { BTS_CHAPTER_COVERS } from '../../src/built-to-sell/chapter-covers';
import { BTS_META } from '../../src/built-to-sell/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const DIST = path.join(ROOT, 'dist');
const TEMPLATE_PATH = path.join(DIST, 'index.html');
const BASE_URL = 'https://sysbilt.com';

/** Title present in the un-stamped dist/index.html template; a stamped page must differ. */
const GENERIC_TITLE = 'SYSBILT | Business Systems';

/** Routes that are intentionally noindex and therefore excluded from the sitemap. */
const INDEXABLE_EXCLUDE = new Set(['/news']);

const BLOG_FALLBACK_DESCRIPTION =
  'We build the systems that help Australian businesses stop doing everything manually';

/** Static routes — titles/descriptions from SEO_META + GuidesHubPage PageMeta */
const STATIC_ROUTES = [
  {
    path: '/',
    title: 'SYSBILT | Business Systems for Growing Companies',
    description:
      'SYSBILT builds business systems for growing Australian companies. Websites, CRM, automation, AI, content, training, and dashboards that work together.',
  },
  {
    path: '/system',
    title: 'The System | SYSBILT',
    description:
      'Seven pillars that work together. See how SYSBILT connects websites, CRM, automation, AI, content, training, and dashboards.',
  },
  {
    path: '/process',
    title: 'Our Process | SYSBILT',
    description:
      'From discovery to deployment in four phases. See how SYSBILT builds business systems that actually work.',
  },
  {
    path: '/architect',
    title: 'About SYSBILT | Business Systems Team',
    description:
      'Meet the SYSBILT team. We build business systems for Australian companies doing $1M to $20M in revenue.',
  },
  {
    path: '/proof',
    title: 'Proof | SYSBILT',
    description:
      'Real results from real businesses. See how SYSBILT systems drive revenue, save time, and reduce manual work.',
  },
  {
    path: '/evidence-vault',
    title: 'Evidence Vault | SYSBILT',
    description: 'Technical proof and build details from SYSBILT client work.',
  },
  {
    path: '/contact',
    title: "Let's Talk | SYSBILT",
    description:
      'Book a call with SYSBILT. We build business systems for growing Australian companies.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | SYSBILT',
    description: 'How SYSBILT collects, uses, and protects your information.',
  },
  {
    path: '/blog',
    title: 'Insights | SYSBILT',
    description:
      'Practical advice for businesses that want to grow without the grind. Systems, automation, and growth strategies.',
  },
  {
    path: '/news',
    title: 'News | SYSBILT',
    description: 'Industry news and updates for Australian businesses. Filtered by growth stage.',
  },
  {
    path: '/guides',
    title: 'Business System Guides for Growing Companies | SYSBILT',
    description:
      'Deep guides on building business systems. Websites, CRM, automation, AI assistants, content systems, team training, and dashboards. Free to read and download.',
  },
  {
    path: '/toolkit',
    title: 'Business Toolkit | SYSBILT',
    description:
      'Tools we rate for running a business, with a plain explanation of what each one does.',
  },
  {
    path: '/pillar1',
    title: 'Websites & E-commerce for Australian Businesses | SYSBILT',
    description:
      'We build websites and e-commerce systems that capture leads and connect to your CRM. For Australian businesses doing $1M to $20M.',
  },
  {
    path: '/pillar2',
    title: 'CRM & Lead Tracking for Growing Businesses | SYSBILT',
    description:
      'We set up CRM systems that track every lead, every deal, and every follow-up in one place. HubSpot and Pipedrive specialists in Sydney.',
  },
  {
    path: '/pillar3',
    title: 'Business Automation for Australian Companies | SYSBILT',
    description:
      'We build automations that move data between your tools, send follow-ups, and handle admin. Using Make.com and n8n for businesses doing $1M to $20M.',
  },
  {
    path: '/pillar4',
    title: 'AI Assistants for Business | SYSBILT Sydney',
    description:
      'We build AI assistants that answer calls, qualify leads, and handle repetitive questions for your business. Custom AI chatbots and voice bots.',
  },
  {
    path: '/pillar5',
    title: 'Content Systems & Distribution | SYSBILT',
    description:
      'We build content systems that turn one voice note into a month of posts. Automated content production for busy Australian business owners.',
  },
  {
    path: '/pillar6',
    title: 'Team Training & System Adoption | SYSBILT',
    description:
      'We train your team to actually use the tools you paid for. SOPs, onboarding videos, and adoption tracking for Australian businesses.',
  },
  {
    path: '/pillar7',
    title: 'Business Dashboards & Reporting | SYSBILT',
    description:
      'We build dashboards that show your leads, revenue, and operations on one screen. Real-time business intelligence for growing Australian companies.',
  },
];

const BTW_HUB_ROUTE_DEF = {
  path: BTW_HUB_ROUTE,
  title: 'Lead-Generation Websites: The Complete Guide | SYSBILT',
  description:
    'A deep guide to lead-generation websites: ownership, conversion, features, automation, SEO, and growing your site as a business hub. Free from SYSBILT.',
};

const BTW_ROUTES = [
  { ...BTW_HUB_ROUTE_DEF, jsonLd: btwHubJsonLd(BTW_HUB_ROUTE_DEF) },
  ...BTW_CHAPTER_SLUGS.map((slug) => {
    const meta = BTW_CHAPTER_META_BY_SLUG[slug];
    if (!meta) throw new Error(`[stamp-meta] Missing Built to Work metadata for ${slug}`);
    return {
      path: `${BTW_HUB_ROUTE}/${slug}`,
      ...meta,
      jsonLd: btwChapterJsonLd(slug),
    };
  }),
];

const BTS_HUB_ROUTE_DEF = {
  path: BTS_HUB_ROUTE,
  title: BTS_HUB_META.title,
  description: BTS_HUB_META.description,
};

const BTS_ROUTES = [
  { ...BTS_HUB_ROUTE_DEF, jsonLd: btsHubJsonLd(BTS_HUB_ROUTE_DEF) },
  ...BTS_CHAPTER_SLUGS.map((slug) => {
    const meta = BTS_CHAPTER_META_BY_SLUG[slug];
    if (!meta) throw new Error(`[stamp-meta] Missing Built to Sell metadata for ${slug}`);
    return {
      path: `${BTS_HUB_ROUTE}/${slug}`,
      ...meta,
      jsonLd: btsChapterJsonLd(slug),
    };
  }),
];

const POSTS_QUERY = `*[_type == "post" && !(_id in path("drafts.**"))]{
  "slug": slug.current,
  title,
  seoTitle,
  seoDescription,
  publishedAt,
  _updatedAt,
  servicePillar,
  focusKeyword,
  "authorName": author->name,
  "imageUrl": coalesce(ogImage.asset->url, mainImage.asset->url)
}`;

const GUIDES_QUERY = `*[_type == "guide" && !(_id in path("drafts.**"))]{
  "slug": slug.current,
  title,
  seoTitle,
  seoDescription,
  subtitle,
  "imageUrl": ogImage.asset->url
}`;

const TOOLKIT_QUERY = `*[_type == "toolkitItem" && !(_id in path("drafts.**"))]{
  "slug": slug.current,
  name,
  metaTitle,
  metaDescription,
  summary,
  category,
  focusKeyword,
  _updatedAt,
  "authorName": author->name,
  "imageUrl": coalesce(ogImage.asset->url, mainImage.asset->url)
}`;

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Safe inline JSON-LD: prevent `</script>` breakout by escaping `<`. */
function escapeJsonLd(schema) {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}

function canonicalUrl(routePath) {
  if (routePath === '/') return `${BASE_URL}/`;
  return `${BASE_URL}${routePath}`;
}

function ogUrl(routePath) {
  if (routePath === '/') return BASE_URL;
  return `${BASE_URL}${routePath}`;
}

// --- JSON-LD builders (build-time; mirror the client Helmet schemas) ---------

function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SYSBILT',
    url: `${BASE_URL}/`,
    logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/og-sysbilt.png` },
  };
}

function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SYSBILT',
    url: `${BASE_URL}/`,
    inLanguage: 'en-AU',
  };
}

function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };
}

function genericArticleJsonLd({ canonical, headline, description, image }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonical}#article`,
    url: canonical,
    headline,
    description,
    author: { '@type': 'Organization', name: 'SYSBILT', url: `${BASE_URL}/` },
    publisher: {
      '@type': 'Organization',
      name: 'SYSBILT',
      url: `${BASE_URL}/`,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/og-sysbilt.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    inLanguage: 'en-AU',
  };
  if (image) {
    schema.image = { '@type': 'ImageObject', url: image, width: 1200, height: 630 };
  }
  return schema;
}

function btwHubJsonLd(hubRoute) {
  const canonical = canonicalUrl(hubRoute.path);
  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hubRoute.title,
    description: hubRoute.description,
    url: canonical,
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BTW_META.title, item: canonical },
  ]);
  return [collection, crumb];
}

function btwChapterJsonLd(slug) {
  const chapter = BTW_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) return [];
  const canonical = `${BASE_URL}${btwChapterPath(chapter.slug)}`;
  const cover = BTW_CHAPTER_COVERS[chapter.num];
  const image = cover ? `${BASE_URL}${cover.src}` : `${BASE_URL}/images/og-sysbilt.png`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: chapter.h1,
    description: chapter.seoDescription,
    author: { '@type': 'Organization', name: 'SYSBILT', url: `${BASE_URL}/` },
    publisher: {
      '@type': 'Organization',
      name: 'SYSBILT',
      url: `${BASE_URL}/`,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/og-sysbilt.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    image,
    isPartOf: { '@type': 'Book', name: BTW_META.title, url: `${BASE_URL}${BTW_HUB_ROUTE}` },
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BTW_META.title, item: `${BASE_URL}${BTW_HUB_ROUTE}` },
    { name: chapter.h1, item: canonical },
  ]);
  const out = [article, crumb];
  const glossary = chapter.num === 12 ? extractGlossaryFaqs(extractChapterBlocks(chapter.pages)) : [];
  if (glossary.length > 0) out.push(generateFAQSchema(glossary));
  return out;
}

function btsHubJsonLd(hubRoute) {
  const canonical = canonicalUrl(hubRoute.path);
  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hubRoute.title,
    description: hubRoute.description,
    url: canonical,
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BTS_META.title, item: canonical },
  ]);
  return [collection, crumb];
}

function btsChapterJsonLd(slug) {
  const chapter = BTS_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) return [];
  const canonical = `${BASE_URL}${btsChapterPath(chapter.slug)}`;
  const cover = BTS_CHAPTER_COVERS[chapter.num];
  const image = cover ? `${BASE_URL}${cover.src}` : `${BASE_URL}/images/og-sysbilt.png`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: chapter.h1,
    description: chapter.seoDescription,
    author: { '@type': 'Organization', name: 'SYSBILT', url: `${BASE_URL}/` },
    publisher: {
      '@type': 'Organization',
      name: 'SYSBILT',
      url: `${BASE_URL}/`,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/og-sysbilt.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    image,
    isPartOf: { '@type': 'Book', name: BTS_META.title, url: `${BASE_URL}${BTS_HUB_ROUTE}` },
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BTS_META.title, item: `${BASE_URL}${BTS_HUB_ROUTE}` },
    { name: chapter.h1, item: canonical },
  ]);
  const out = [article, crumb];
  const glossary =
    chapter.num === 12 ? extractBtsGlossaryFaqs(extractChapterBlocks(chapter.pages)) : [];
  if (glossary.length > 0) out.push(generateFAQSchema(glossary));
  return out;
}

/** JSON-LD for static routes (homepage Organization/WebSite, pillar/system FAQ). */
function staticJsonLd(routePath) {
  if (routePath === '/') return [organizationJsonLd(), webSiteJsonLd()];
  if (/^\/pillar[1-7]$/.test(routePath)) {
    const faqs = getPillarFAQs(routePath.slice(1));
    return faqs.length > 0 ? [generateFAQSchema(faqs)] : [];
  }
  if (routePath === '/system') {
    const faqs = getSystemPageFAQs();
    return faqs.length > 0 ? [generateFAQSchema(faqs)] : [];
  }
  return [];
}

function replaceOrFail(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`[stamp-meta] Pattern not found for ${label}: ${pattern}`);
  }
  return html.replace(pattern, replacement);
}

function stampHtml(template, route) {
  const { path: routePath, title, description, ogTitle } = route;
  const safeTitle = escapeAttr(title);
  const safeDescription = escapeAttr(description);
  const safeOgTitle = escapeAttr(ogTitle ?? title);
  const safeOgUrl = escapeAttr(ogUrl(routePath));
  const safeCanonical = escapeAttr(canonicalUrl(routePath));

  let html = template;

  html = replaceOrFail(
    html,
    /<title>[^<]*<\/title>/,
    `<title>${safeTitle}</title>`,
    '<title>'
  );

  const descMetaPattern = /<meta name="description" content="[^"]*" \/>/;
  const stampedDescMeta = `<meta name="description" content="${safeDescription}" />`;
  html = replaceOrFail(html, descMetaPattern, stampedDescMeta, 'meta name="description"');

  if (!html.includes('rel="canonical"')) {
    html = html.replace(
      stampedDescMeta,
      `${stampedDescMeta}\n    <link rel="canonical" href="${safeCanonical}" />`
    );
  } else {
    html = replaceOrFail(
      html,
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${safeCanonical}" />`,
      'link rel="canonical"'
    );
  }

  html = replaceOrFail(
    html,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${safeOgUrl}" />`,
    'og:url'
  );
  html = replaceOrFail(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${safeOgTitle}" />`,
    'og:title'
  );
  html = replaceOrFail(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${safeDescription}" />`,
    'og:description'
  );
  html = replaceOrFail(
    html,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${safeOgTitle}" />`,
    'twitter:title'
  );
  html = replaceOrFail(
    html,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${safeDescription}" />`,
    'twitter:description'
  );

  const jsonLd = Array.isArray(route.jsonLd) ? route.jsonLd : [];
  if (jsonLd.length > 0) {
    if (!html.includes('</head>')) {
      throw new Error(`[stamp-meta] </head> not found while injecting JSON-LD for ${routePath}`);
    }
    const scripts = jsonLd
      .map((schema) => `    <script type="application/ld+json">${escapeJsonLd(schema)}</script>`)
      .join('\n');
    // Function replacement avoids `$` being treated as a capture reference.
    html = html.replace('</head>', () => `${scripts}\n  </head>`);
  }

  return html;
}

function distPathForRoute(routePath) {
  if (routePath === '/') return TEMPLATE_PATH;
  const segments = routePath.replace(/^\//, '').split('/');
  return path.join(DIST, ...segments, 'index.html');
}

async function fetchSanityContent() {
  const client = createClient({
    projectId: 'wdlc9pg8',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-02-20',
  });

  const [posts, guides, toolkitItems] = await Promise.all([
    client.fetch(POSTS_QUERY),
    client.fetch(GUIDES_QUERY),
    client.fetch(TOOLKIT_QUERY),
  ]);

  return { posts, guides, toolkitItems };
}

/** Pure transform: content rows -> full stamped route list (static + BTW + dynamic). */
function buildAllRoutes({ posts, guides, toolkitItems }) {
  const skipped = [];
  const dynamic = [];

  for (const post of posts) {
    if (!post.slug || !post.title) {
      skipped.push(`post:${post.slug ?? '(no slug)'} — missing slug or title`);
      continue;
    }
    const rawTitle = (post.seoTitle || post.title).trim();
    const title = `${rawTitle} | SYSBILT`;
    const description = (post.seoDescription || BLOG_FALLBACK_DESCRIPTION).trim();
    const canonical = canonicalUrl(`/blog/${post.slug}`);
    const jsonLd = [
      buildBlogPostingJsonLd({
        post: {
          title: rawTitle,
          publishedAt: post.publishedAt,
          _updatedAt: post._updatedAt,
          servicePillar: post.servicePillar,
          focusKeyword: post.focusKeyword,
          author: post.authorName ? { name: post.authorName } : undefined,
        },
        canonicalUrl: canonical,
        pageDescription: description,
        shareImage: post.imageUrl || '',
        headline: rawTitle,
      }),
      breadcrumbJsonLd([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Insights', item: `${BASE_URL}/blog` },
        { name: rawTitle, item: canonical },
      ]),
    ];
    dynamic.push({ path: `/blog/${post.slug}`, title, description, ogTitle: title, jsonLd });
  }

  for (const guide of guides) {
    if (!guide.slug || !guide.title) {
      skipped.push(`guide:${guide.slug ?? '(no slug)'} — missing slug or title`);
      continue;
    }
    if (guide.slug === 'built-to-work') {
      skipped.push('guide:built-to-work — handled by static Built to Work routes');
      continue;
    }
    if (guide.slug === 'built-to-sell') {
      skipped.push('guide:built-to-sell — handled by static Built to Sell routes');
      continue;
    }
    const rawTitle = (guide.seoTitle?.trim() || guide.title).trim();
    const title = `${rawTitle} | SYSBILT`;
    const description = (guide.seoDescription?.trim() || guide.subtitle?.trim() || '').trim();
    const ogTitle = rawTitle;
    const canonical = canonicalUrl(`/guides/${guide.slug}`);
    const jsonLd = [
      genericArticleJsonLd({ canonical, headline: rawTitle, description, image: guide.imageUrl || '' }),
      breadcrumbJsonLd([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Guides', item: `${BASE_URL}/guides` },
        { name: rawTitle, item: canonical },
      ]),
    ];
    dynamic.push({ path: `/guides/${guide.slug}`, title, description, ogTitle, jsonLd });
  }

  for (const item of toolkitItems) {
    if (!item.slug || !item.name) {
      skipped.push(`toolkitItem:${item.slug ?? '(no slug)'} — missing slug or name`);
      continue;
    }
    const rawTitle = (item.metaTitle?.trim() || item.name).trim();
    const title = `${rawTitle} | SYSBILT`;
    const description = (item.metaDescription?.trim() || item.summary?.trim() || '').trim();
    const canonical = canonicalUrl(`/toolkit/${item.slug}`);
    const jsonLd = [
      buildToolkitArticleJsonLd({
        tool: {
          name: item.name,
          summary: description,
          category: item.category,
          _updatedAt: item._updatedAt,
          focusKeyword: item.focusKeyword,
          author: item.authorName ? { name: item.authorName } : null,
        },
        canonicalUrl: canonical,
        pageDescription: description,
        shareImage: item.imageUrl || '',
        headline: rawTitle,
      }),
      breadcrumbJsonLd([
        { name: 'Home', item: `${BASE_URL}/` },
        { name: 'Insights', item: `${BASE_URL}/blog` },
        { name: 'Toolkit', item: `${BASE_URL}/toolkit` },
        { name: item.name, item: canonical },
      ]),
    ];
    dynamic.push({ path: `/toolkit/${item.slug}`, title, description, ogTitle: title, jsonLd });
  }

  const staticRoutes = STATIC_ROUTES.map((r) => ({ ...r, jsonLd: staticJsonLd(r.path) }));

  return { routes: [...staticRoutes, ...BTW_ROUTES, ...BTS_ROUTES, ...dynamic], skipped };
}

async function collectAllRoutes() {
  const content = await fetchSanityContent();
  return buildAllRoutes(content);
}

async function main() {
  let template;
  try {
    template = await readFile(TEMPLATE_PATH, 'utf8');
  } catch {
    console.error(`[stamp-meta] dist/index.html not found at ${TEMPLATE_PATH}. Run vite build first.`);
    process.exit(1);
  }

  let allRoutes;
  let skipped = [];
  try {
    const result = await collectAllRoutes();
    allRoutes = result.routes;
    skipped = result.skipped;
  } catch (err) {
    console.error('[stamp-meta] Sanity fetch failed — aborting build.');
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }

  for (const route of allRoutes) {
    const html = stampHtml(template, route);
    const outPath = distPathForRoute(route.path);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf8');
  }

  const codeDefinedCount = BTW_ROUTES.length + BTS_ROUTES.length;
  const sanityCount = allRoutes.length - STATIC_ROUTES.length - codeDefinedCount;
  console.log(
    `[stamp-meta] Stamped ${allRoutes.length} routes (${STATIC_ROUTES.length} static, ${sanityCount} from Sanity, ${BTW_ROUTES.length} BTW, ${BTS_ROUTES.length} BTS).`
  );
  if (skipped.length > 0) {
    console.log('[stamp-meta] Skipped Sanity entries:');
    for (const line of skipped) {
      console.log(`  - ${line}`);
    }
  }
}

const isMain = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  main().catch((err) => {
    console.error('[stamp-meta] Fatal error:', err);
    process.exit(1);
  });
}

export {
  BASE_URL,
  GENERIC_TITLE,
  INDEXABLE_EXCLUDE,
  STATIC_ROUTES,
  BTW_ROUTES,
  BTS_ROUTES,
  canonicalUrl,
  distPathForRoute,
  fetchSanityContent,
  buildAllRoutes,
  collectAllRoutes,
};
