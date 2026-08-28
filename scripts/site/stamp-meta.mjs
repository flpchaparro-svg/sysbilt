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
import { existsSync } from 'node:fs';
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
import {
  BTC_CHAPTER_SLUGS,
  BTC_HUB_ROUTE,
  BTC_CHAPTER_META_BY_SLUG,
  BTC_HUB_META,
} from './btc-seo-routes.mjs';
import {
  BTR_CHAPTER_SLUGS,
  BTR_HUB_ROUTE,
  BTR_CHAPTER_META_BY_SLUG,
  BTR_HUB_META,
} from './btr-seo-routes.mjs';
import { brandTitle, stripSysbiltBrand } from './brand-title.mjs';
import {
  BTT_CHAPTER_SLUGS,
  BTT_HUB_ROUTE,
  BTT_CHAPTER_META_BY_SLUG,
  BTT_HUB_META,
} from './btt-seo-routes.mjs';
import {
  BTM_CHAPTER_SLUGS,
  BTM_HUB_ROUTE,
  BTM_CHAPTER_META_BY_SLUG,
  BTM_HUB_META,
} from './btm-seo-routes.mjs';
import {
  BTE_CHAPTER_SLUGS,
  BTE_HUB_ROUTE,
  BTE_CHAPTER_META_BY_SLUG,
  BTE_HUB_META,
} from './bte-seo-routes.mjs';
import {
  BSE_CHAPTER_SLUGS,
  BSE_HUB_ROUTE,
  BSE_CHAPTER_META_BY_SLUG,
  BSE_HUB_META,
} from './bse-seo-routes.mjs';
import { buildBlogPostingJsonLd } from '../../src/utils/blogSeoJsonLd';
import { buildToolkitArticleJsonLd } from '../../src/utils/toolkitSeoJsonLd';
import { generateFAQSchema, getPillarFAQs, getSystemPageFAQs } from '../../src/constants/faqData';
import {
  buildProfessionalServiceJsonLd,
  organizationIdRef,
} from '../../src/constants/organizationJsonLd';
import { SITE_ORIGIN } from '../../src/constants/seoMeta';
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
import { BTS_CHAPTER_COVERS, BTS_HUB_OG } from '../../src/built-to-sell/chapter-covers';
import { BTS_META } from '../../src/built-to-sell/types';
import {
  BTC_CHAPTERS,
  btcChapterPath,
  extractGlossaryFaqs as extractBtcGlossaryFaqs,
} from '../../src/built-to-close/chapter-seo';
import { BTC_CHAPTER_COVERS, BTC_HUB_OG } from '../../src/built-to-close/chapter-covers';
import { BTC_META } from '../../src/built-to-close/types';
import {
  BTR_CHAPTERS,
  btrChapterPath,
  extractGlossaryFaqs as extractBtrGlossaryFaqs,
} from '../../src/built-to-run/chapter-seo';
import { BTR_CHAPTER_COVERS, BTR_HUB_OG } from '../../src/built-to-run/chapter-covers';
import { BTR_META } from '../../src/built-to-run/types';
import {
  BTT_CHAPTERS,
  bttChapterPath,
  extractGlossaryFaqs as extractBttGlossaryFaqs,
} from '../../src/built-to-think/chapter-seo';
import { BTT_CHAPTER_COVERS, BTT_HUB_OG } from '../../src/built-to-think/chapter-covers';
import { BTT_META } from '../../src/built-to-think/types';
import {
  BTM_CHAPTERS,
  btmChapterPath,
  extractGlossaryFaqs as extractBtmGlossaryFaqs,
} from '../../src/built-to-multiply/chapter-seo';
import { BTM_CHAPTER_COVERS, BTM_HUB_OG } from '../../src/built-to-multiply/chapter-covers';
import { BTM_META } from '../../src/built-to-multiply/types';
import {
  BTE_CHAPTERS,
  bteChapterPath,
  extractGlossaryFaqs as extractBteGlossaryFaqs,
} from '../../src/built-to-teach/chapter-seo';
import { BTE_CHAPTER_COVERS, BTE_HUB_OG } from '../../src/built-to-teach/chapter-covers';
import { BTE_META } from '../../src/built-to-teach/types';
import {
  BSE_CHAPTERS,
  bseChapterPath,
  extractGlossaryFaqs as extractBseGlossaryFaqs,
} from '../../src/built-to-see/chapter-seo';
import { BSE_CHAPTER_COVERS, BSE_HUB_OG } from '../../src/built-to-see/chapter-covers';
import { BSE_META } from '../../src/built-to-see/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const DIST = path.join(ROOT, 'dist');
const TEMPLATE_PATH = path.join(DIST, 'index.html');
const SITEMAP_PATH = path.join(DIST, 'sitemap.xml');
const SNAPSHOT_PATH = path.join(ROOT, '.build', 'content-snapshot.json');
const BASE_URL = SITE_ORIGIN;

/** Title present in the un-stamped dist/index.html template; a stamped page must differ. */
const GENERIC_TITLE = 'SYSBILT | Business Systems';

/** Routes that are intentionally noindex and therefore excluded from the sitemap. */
const INDEXABLE_EXCLUDE = new Set(['/news']);

const SITEMAP_STATIC_PRIORITIES = new Map([
  ['/', '1.0'],
  ['/system', '0.9'],
  ['/process', '0.9'],
  ['/architect', '0.9'],
  ['/proof', '0.9'],
  ['/blog', '0.9'],
  ['/evidence-vault', '0.9'],
  ['/contact', '0.7'],
  ['/privacy', '0.6'],
  ['/terms', '0.6'],
  ['/pillar1', '0.8'],
  ['/pillar2', '0.8'],
  ['/pillar3', '0.8'],
  ['/pillar4', '0.8'],
  ['/pillar5', '0.8'],
  ['/pillar6', '0.8'],
  ['/pillar7', '0.8'],
  ['/guides', '0.7'],
  ['/toolkit', '0.7'],
]);

/** Private funnel routes: stamped with noindex, never in the sitemap. */
function isGoFunnelPath(routePath) {
  return routePath === '/go' || routePath === '/go/thanks' || routePath.startsWith('/go/');
}

function isFeedbackReviewPath(routePath) {
  return routePath === '/r' || routePath.startsWith('/r/');
}

function isLearnPath(routePath) {
  return routePath === '/learn' || routePath.startsWith('/learn/');
}

function isIndexableExcluded(routePath) {
  return (
    INDEXABLE_EXCLUDE.has(routePath) ||
    isGoFunnelPath(routePath) ||
    isFeedbackReviewPath(routePath) ||
    isLearnPath(routePath)
  );
}

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
      'Meet the SYSBILT team. We build business systems for growing Australian companies.',
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
    path: '/terms',
    title: 'Terms of Service | SYSBILT',
    description:
      "The plain-English terms for SYSBILT's fixed-scope services: what's included, how delivery works, and where you stand.",
  },
  {
    path: '/go',
    title: 'Fixed-price fixes | SYSBILT',
    description:
      'Private catalogue of fixed-price SYSBILT productised offers. Not listed on the public site.',
    robots: 'noindex, nofollow',
  },
  {
    path: '/go/thanks',
    title: 'Paid, confirmed | SYSBILT',
    description:
      'Your payment is confirmed. Complete the access form so we can start delivery.',
    robots: 'noindex, nofollow',
  },
  {
    path: '/go/access',
    title: 'Access form | SYSBILT',
    description: 'Tell us how to reach your site so we can start delivery.',
    robots: 'noindex, nofollow',
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
    robots: 'noindex, follow',
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
      'We build websites and e-commerce systems that capture leads and connect to your CRM. For growing Australian businesses.',
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
      'We build automations that move data between your tools, send follow-ups, and handle admin. Using Make.com and n8n for growing Australian businesses.',
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

const BTC_HUB_ROUTE_DEF = {
  path: BTC_HUB_ROUTE,
  title: BTC_HUB_META.title,
  description: BTC_HUB_META.description,
};

const BTC_ROUTES = [
  { ...BTC_HUB_ROUTE_DEF, jsonLd: btcHubJsonLd(BTC_HUB_ROUTE_DEF) },
  ...BTC_CHAPTER_SLUGS.map((slug) => {
    const meta = BTC_CHAPTER_META_BY_SLUG[slug];
    if (!meta) throw new Error(`[stamp-meta] Missing Built to Close metadata for ${slug}`);
    return {
      path: `${BTC_HUB_ROUTE}/${slug}`,
      ...meta,
      jsonLd: btcChapterJsonLd(slug),
    };
  }),
];

const BTR_HUB_ROUTE_DEF = {
  path: BTR_HUB_ROUTE,
  title: BTR_HUB_META.title,
  description: BTR_HUB_META.description,
};

const BTR_ROUTES = [
  { ...BTR_HUB_ROUTE_DEF, jsonLd: btrHubJsonLd(BTR_HUB_ROUTE_DEF) },
  ...BTR_CHAPTER_SLUGS.map((slug) => {
    const meta = BTR_CHAPTER_META_BY_SLUG[slug];
    if (!meta) throw new Error(`[stamp-meta] Missing Built to Run metadata for ${slug}`);
    return {
      path: `${BTR_HUB_ROUTE}/${slug}`,
      ...meta,
      jsonLd: btrChapterJsonLd(slug),
    };
  }),
];

const BTT_HUB_ROUTE_DEF = {
  path: BTT_HUB_ROUTE,
  title: BTT_HUB_META.title,
  description: BTT_HUB_META.description,
};

const BTT_ROUTES = [
  { ...BTT_HUB_ROUTE_DEF, jsonLd: bttHubJsonLd(BTT_HUB_ROUTE_DEF) },
  ...BTT_CHAPTER_SLUGS.map((slug) => {
    const meta = BTT_CHAPTER_META_BY_SLUG[slug];
    if (!meta) throw new Error(`[stamp-meta] Missing Built to Think metadata for ${slug}`);
    return {
      path: `${BTT_HUB_ROUTE}/${slug}`,
      ...meta,
      jsonLd: bttChapterJsonLd(slug),
    };
  }),
];

const BTM_HUB_ROUTE_DEF = {
  path: BTM_HUB_ROUTE,
  title: BTM_HUB_META.title,
  description: BTM_HUB_META.description,
};

const BTM_ROUTES = [
  { ...BTM_HUB_ROUTE_DEF, jsonLd: btmHubJsonLd(BTM_HUB_ROUTE_DEF) },
  ...BTM_CHAPTER_SLUGS.map((slug) => {
    const meta = BTM_CHAPTER_META_BY_SLUG[slug];
    if (!meta) throw new Error(`[stamp-meta] Missing Built to Multiply metadata for ${slug}`);
    return {
      path: `${BTM_HUB_ROUTE}/${slug}`,
      ...meta,
      jsonLd: btmChapterJsonLd(slug),
    };
  }),
];

const BTE_HUB_ROUTE_DEF = {
  path: BTE_HUB_ROUTE,
  title: BTE_HUB_META.title,
  description: BTE_HUB_META.description,
};

const BTE_ROUTES = [
  { ...BTE_HUB_ROUTE_DEF, jsonLd: bteHubJsonLd(BTE_HUB_ROUTE_DEF) },
  ...BTE_CHAPTER_SLUGS.map((slug) => {
    const meta = BTE_CHAPTER_META_BY_SLUG[slug];
    if (!meta) throw new Error(`[stamp-meta] Missing Built to Teach metadata for ${slug}`);
    return {
      path: `${BTE_HUB_ROUTE}/${slug}`,
      ...meta,
      jsonLd: bteChapterJsonLd(slug),
    };
  }),
];

const BSE_HUB_ROUTE_DEF = {
  path: BSE_HUB_ROUTE,
  title: BSE_HUB_META.title,
  description: BSE_HUB_META.description,
};

const BSE_ROUTES = [
  { ...BSE_HUB_ROUTE_DEF, jsonLd: bseHubJsonLd(BSE_HUB_ROUTE_DEF) },
  ...BSE_CHAPTER_SLUGS.map((slug) => {
    const meta = BSE_CHAPTER_META_BY_SLUG[slug];
    if (!meta) throw new Error(`[stamp-meta] Missing Built to See metadata for ${slug}`);
    return {
      path: `${BSE_HUB_ROUTE}/${slug}`,
      ...meta,
      jsonLd: bseChapterJsonLd(slug),
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
  publishedAt,
  _updatedAt,
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

const FUNNEL_QUERY = `*[_type == "funnelPage" && !(_id in path("drafts.**"))]{
  "slug": slug.current,
  title,
  sub
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

function cmsDateOnly(updatedAt, publishedAt) {
  const raw = updatedAt || publishedAt;
  if (!raw) return undefined;
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString().slice(0, 10);
}

function sitemapLastmodByPath({ posts, guides, toolkitItems }) {
  const dates = new Map();
  for (const post of posts) {
    if (!post.slug) continue;
    const date = cmsDateOnly(post._updatedAt, post.publishedAt);
    if (date) dates.set(`/blog/${post.slug}`, date);
  }
  for (const guide of guides) {
    if (!guide.slug) continue;
    const routePath = `/guides/${guide.slug}`;
    if (
      routePath === BTW_HUB_ROUTE ||
      routePath === BTS_HUB_ROUTE ||
      routePath === BTC_HUB_ROUTE ||
      routePath === BTR_HUB_ROUTE ||
      routePath === BTT_HUB_ROUTE ||
      routePath === BTM_HUB_ROUTE ||
      routePath === BTE_HUB_ROUTE ||
      routePath === BSE_HUB_ROUTE
    ) {
      continue;
    }
    const date = cmsDateOnly(guide._updatedAt, guide.publishedAt);
    if (date) dates.set(routePath, date);
  }
  for (const item of toolkitItems) {
    if (!item.slug) continue;
    const date = cmsDateOnly(item._updatedAt);
    if (date) dates.set(`/toolkit/${item.slug}`, date);
  }
  return dates;
}

function sitemapHints(routePath) {
  const staticPriority = SITEMAP_STATIC_PRIORITIES.get(routePath);
  if (staticPriority) return { changefreq: 'weekly', priority: staticPriority };

  const codeHubRoutes = [
    BTW_HUB_ROUTE,
    BTS_HUB_ROUTE,
    BTC_HUB_ROUTE,
    BTR_HUB_ROUTE,
    BTT_HUB_ROUTE,
    BTM_HUB_ROUTE,
    BTE_HUB_ROUTE,
    BSE_HUB_ROUTE,
  ];
  if (codeHubRoutes.includes(routePath)) return { changefreq: 'monthly', priority: '0.8' };
  if (codeHubRoutes.some((hubPath) => routePath.startsWith(`${hubPath}/`))) {
    return { changefreq: 'monthly', priority: '0.75' };
  }
  if (routePath.startsWith('/guides/')) return { changefreq: 'weekly', priority: '0.8' };
  return { changefreq: 'weekly', priority: '0.65' };
}

function buildSitemapXml(routes, content) {
  const lastmodByPath = sitemapLastmodByPath(content);
  const uniquePaths = [
    ...new Set(routes.map((route) => route.path).filter((routePath) => !isIndexableExcluded(routePath))),
  ].sort((a, b) => {
    if (a === '/') return -1;
    if (b === '/') return 1;
    return a.localeCompare(b);
  });

  const rows = uniquePaths
    .map((routePath) => {
      const lastmod = lastmodByPath.get(routePath);
      const { changefreq, priority } = sitemapHints(routePath);
      return `  <url>
    <loc>${escapeAttr(canonicalUrl(routePath))}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return {
    paths: uniquePaths,
    xml: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows}
</urlset>
`,
  };
}

function ogUrl(routePath) {
  if (routePath === '/') return BASE_URL;
  return `${BASE_URL}${routePath}`;
}

// --- JSON-LD builders (build-time; mirror the client Helmet schemas) ---------

function organizationJsonLd() {
  return buildProfessionalServiceJsonLd();
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
    publisher: organizationIdRef(),
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
  const image = cover ? `${BASE_URL}${cover.webSrc}` : `${BASE_URL}/images/og-sysbilt.png`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: chapter.h1,
    description: chapter.seoDescription,
    author: { '@type': 'Organization', name: 'SYSBILT', url: `${BASE_URL}/` },
    publisher: organizationIdRef(),
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
    image: `${BASE_URL}${BTS_HUB_OG}`,
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
  const image = cover ? `${BASE_URL}${cover.webSrc}` : `${BASE_URL}/images/og-sysbilt.png`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: chapter.h1,
    description: chapter.seoDescription,
    author: { '@type': 'Organization', name: 'SYSBILT', url: `${BASE_URL}/` },
    publisher: organizationIdRef(),
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

function btcHubJsonLd(hubRoute) {
  const canonical = canonicalUrl(hubRoute.path);
  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hubRoute.title,
    description: hubRoute.description,
    url: canonical,
    image: `${BASE_URL}${BTC_HUB_OG}`,
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BTC_META.title, item: canonical },
  ]);
  return [collection, crumb];
}

function btcChapterJsonLd(slug) {
  const chapter = BTC_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) return [];
  const canonical = `${BASE_URL}${btcChapterPath(chapter.slug)}`;
  const cover = BTC_CHAPTER_COVERS[chapter.num];
  const image = cover ? `${BASE_URL}${cover.webSrc}` : `${BASE_URL}/images/og-sysbilt.png`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: chapter.h1,
    description: chapter.seoDescription,
    author: { '@type': 'Organization', name: 'SYSBILT', url: `${BASE_URL}/` },
    publisher: organizationIdRef(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    image,
    isPartOf: { '@type': 'Book', name: BTC_META.title, url: `${BASE_URL}${BTC_HUB_ROUTE}` },
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BTC_META.title, item: `${BASE_URL}${BTC_HUB_ROUTE}` },
    { name: chapter.h1, item: canonical },
  ]);
  const out = [article, crumb];
  const glossary =
    chapter.num === 12 ? extractBtcGlossaryFaqs(extractChapterBlocks(chapter.pages)) : [];
  if (glossary.length > 0) out.push(generateFAQSchema(glossary));
  return out;
}

function btrHubJsonLd(hubRoute) {
  const canonical = canonicalUrl(hubRoute.path);
  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hubRoute.title,
    description: hubRoute.description,
    url: canonical,
    image: `${BASE_URL}${BTR_HUB_OG}`,
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BTR_META.title, item: canonical },
  ]);
  return [collection, crumb];
}

function btrChapterJsonLd(slug) {
  const chapter = BTR_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) return [];
  const canonical = `${BASE_URL}${btrChapterPath(chapter.slug)}`;
  const cover = BTR_CHAPTER_COVERS[chapter.num];
  const image = cover ? `${BASE_URL}${cover.webSrc}` : `${BASE_URL}/images/og-sysbilt.png`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: chapter.h1,
    description: chapter.seoDescription,
    author: { '@type': 'Organization', name: 'SYSBILT', url: `${BASE_URL}/` },
    publisher: organizationIdRef(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    image,
    isPartOf: { '@type': 'Book', name: BTR_META.title, url: `${BASE_URL}${BTR_HUB_ROUTE}` },
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BTR_META.title, item: `${BASE_URL}${BTR_HUB_ROUTE}` },
    { name: chapter.h1, item: canonical },
  ]);
  const out = [article, crumb];
  const glossary =
    chapter.num === 12 ? extractBtrGlossaryFaqs(extractChapterBlocks(chapter.pages)) : [];
  if (glossary.length > 0) out.push(generateFAQSchema(glossary));
  return out;
}

function bttHubJsonLd(hubRoute) {
  const canonical = canonicalUrl(hubRoute.path);
  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hubRoute.title,
    description: hubRoute.description,
    url: canonical,
    image: `${BASE_URL}${BTT_HUB_OG}`,
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BTT_META.title, item: canonical },
  ]);
  return [collection, crumb];
}

function bttChapterJsonLd(slug) {
  const chapter = BTT_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) return [];
  const canonical = `${BASE_URL}${bttChapterPath(chapter.slug)}`;
  const cover = BTT_CHAPTER_COVERS[chapter.num];
  const image = cover ? `${BASE_URL}${cover.webSrc}` : `${BASE_URL}/images/og-sysbilt.png`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: chapter.h1,
    description: chapter.seoDescription,
    author: { '@type': 'Organization', name: 'SYSBILT', url: `${BASE_URL}/` },
    publisher: organizationIdRef(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    image,
    isPartOf: { '@type': 'Book', name: BTT_META.title, url: `${BASE_URL}${BTT_HUB_ROUTE}` },
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BTT_META.title, item: `${BASE_URL}${BTT_HUB_ROUTE}` },
    { name: chapter.h1, item: canonical },
  ]);
  const out = [article, crumb];
  const glossary =
    chapter.num === 12 ? extractBttGlossaryFaqs(extractChapterBlocks(chapter.pages)) : [];
  if (glossary.length > 0) out.push(generateFAQSchema(glossary));
  return out;
}

function btmHubJsonLd(hubRoute) {
  const canonical = canonicalUrl(hubRoute.path);
  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hubRoute.title,
    description: hubRoute.description,
    url: canonical,
    image: `${BASE_URL}${BTM_HUB_OG}`,
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BTM_META.title, item: canonical },
  ]);
  return [collection, crumb];
}

function btmChapterJsonLd(slug) {
  const chapter = BTM_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) return [];
  const canonical = `${BASE_URL}${btmChapterPath(chapter.slug)}`;
  const cover = BTM_CHAPTER_COVERS[chapter.num];
  const image = cover ? `${BASE_URL}${cover.webSrc}` : `${BASE_URL}/images/og-sysbilt.png`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: chapter.h1,
    description: chapter.seoDescription,
    author: { '@type': 'Organization', name: 'SYSBILT', url: `${BASE_URL}/` },
    publisher: organizationIdRef(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    image,
    isPartOf: { '@type': 'Book', name: BTM_META.title, url: `${BASE_URL}${BTM_HUB_ROUTE}` },
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BTM_META.title, item: `${BASE_URL}${BTM_HUB_ROUTE}` },
    { name: chapter.h1, item: canonical },
  ]);
  const out = [article, crumb];
  const glossary =
    chapter.num === 12 ? extractBtmGlossaryFaqs(extractChapterBlocks(chapter.pages)) : [];
  if (glossary.length > 0) out.push(generateFAQSchema(glossary));
  return out;
}

function bteHubJsonLd(hubRoute) {
  const canonical = canonicalUrl(hubRoute.path);
  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hubRoute.title,
    description: hubRoute.description,
    url: canonical,
    image: `${BASE_URL}${BTE_HUB_OG}`,
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BTE_META.title, item: canonical },
  ]);
  return [collection, crumb];
}

function bteChapterJsonLd(slug) {
  const chapter = BTE_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) return [];
  const canonical = `${BASE_URL}${bteChapterPath(chapter.slug)}`;
  const cover = BTE_CHAPTER_COVERS[chapter.num];
  const image = cover ? `${BASE_URL}${cover.webSrc}` : `${BASE_URL}/images/og-sysbilt.png`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: chapter.h1,
    description: chapter.seoDescription,
    author: { '@type': 'Organization', name: 'SYSBILT', url: `${BASE_URL}/` },
    publisher: organizationIdRef(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    image,
    isPartOf: { '@type': 'Book', name: BTE_META.title, url: `${BASE_URL}${BTE_HUB_ROUTE}` },
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BTE_META.title, item: `${BASE_URL}${BTE_HUB_ROUTE}` },
    { name: chapter.h1, item: canonical },
  ]);
  const out = [article, crumb];
  const glossary =
    chapter.num === 12 ? extractBteGlossaryFaqs(extractChapterBlocks(chapter.pages)) : [];
  if (glossary.length > 0) out.push(generateFAQSchema(glossary));
  return out;
}

function bseHubJsonLd(hubRoute) {
  const canonical = canonicalUrl(hubRoute.path);
  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: hubRoute.title,
    description: hubRoute.description,
    url: canonical,
    image: `${BASE_URL}${BSE_HUB_OG}`,
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BSE_META.title, item: canonical },
  ]);
  return [collection, crumb];
}

function bseChapterJsonLd(slug) {
  const chapter = BSE_CHAPTERS.find((c) => c.slug === slug);
  if (!chapter) return [];
  const canonical = `${BASE_URL}${bseChapterPath(chapter.slug)}`;
  const cover = BSE_CHAPTER_COVERS[chapter.num];
  const image = cover ? `${BASE_URL}${cover.webSrc}` : `${BASE_URL}/images/og-sysbilt.png`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: chapter.h1,
    description: chapter.seoDescription,
    author: { '@type': 'Organization', name: 'SYSBILT', url: `${BASE_URL}/` },
    publisher: organizationIdRef(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    image,
    isPartOf: { '@type': 'Book', name: BSE_META.title, url: `${BASE_URL}${BSE_HUB_ROUTE}` },
    inLanguage: 'en-AU',
  };
  const crumb = breadcrumbJsonLd([
    { name: 'Home', item: `${BASE_URL}/` },
    { name: 'Guides', item: `${BASE_URL}/guides` },
    { name: BSE_META.title, item: `${BASE_URL}${BSE_HUB_ROUTE}` },
    { name: chapter.h1, item: canonical },
  ]);
  const out = [article, crumb];
  const glossary =
    chapter.num === 12 ? extractBseGlossaryFaqs(extractChapterBlocks(chapter.pages)) : [];
  if (glossary.length > 0) out.push(generateFAQSchema(glossary));
  return out;
}

/** JSON-LD for static routes (homepage ProfessionalService/WebSite, contact org, pillar/system FAQ). */
function staticJsonLd(routePath) {
  if (routePath === '/') return [organizationJsonLd(), webSiteJsonLd()];
  if (routePath === '/contact') return [organizationJsonLd()];
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
  const robots =
    route.robots ||
    (isGoFunnelPath(routePath) || isFeedbackReviewPath(routePath) || isLearnPath(routePath)
      ? 'noindex, nofollow'
      : null) ||
    (INDEXABLE_EXCLUDE.has(routePath) ? 'noindex, follow' : null);

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

  const robotsMeta = robots
    ? `\n    <meta name="robots" content="${escapeAttr(robots)}" />`
    : '';
  const needsCanonical = !html.includes('rel="canonical"');
  const canonicalMeta = needsCanonical
    ? `\n    <link rel="canonical" href="${safeCanonical}" />`
    : '';

  if (robotsMeta || canonicalMeta) {
    html = html.replace(stampedDescMeta, `${stampedDescMeta}${robotsMeta}${canonicalMeta}`);
  }

  if (!needsCanonical) {
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

/** Narrows the snapshot's wide per-doc shape down to the fields stamp-meta/verify-seo need. */
function fromSnapshot(snapshot) {
  const posts = (snapshot.posts ?? []).map((p) => ({
    slug: p.slug,
    title: p.title,
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
    publishedAt: p.publishedAt,
    _updatedAt: p._updatedAt,
    servicePillar: p.servicePillar,
    focusKeyword: p.focusKeyword,
    authorName: p.author?.name,
    imageUrl: p.ogImage?.asset?._ref
      ? sanityAssetRefToUrl(p.ogImage)
      : sanityAssetRefToUrl(p.mainImage),
  }));

  const guides = (snapshot.guides ?? []).map((g) => ({
    slug: g.slug,
    title: g.title,
    seoTitle: g.seoTitle,
    seoDescription: g.seoDescription,
    subtitle: g.subtitle,
    publishedAt: g.publishedAt,
    _updatedAt: g._updatedAt,
    imageUrl: g.imageUrl,
  }));

  const toolkitItems = (snapshot.toolkitItems ?? []).map((t) => ({
    slug: t.slug,
    name: t.name,
    metaTitle: t.metaTitle,
    metaDescription: t.metaDescription,
    summary: t.summary,
    category: t.category,
    focusKeyword: t.focusKeyword,
    _updatedAt: t._updatedAt,
    authorName: t.authorName,
    imageUrl: t.imageUrl,
  }));

  const funnelPages = (snapshot.funnelPages ?? []).map((f) => ({
    slug: f.slug,
    title: f.title,
    sub: f.sub,
  }));

  return { posts, guides, toolkitItems, funnelPages };
}

/** Best-effort asset ref -> CDN URL; the snapshot keeps raw image refs (needed by `urlFor` client-side). */
function sanityAssetRefToUrl(image) {
  const ref = image?.asset?._ref;
  if (!ref) return undefined;
  // e.g. "image-abc123-1200x630-png" -> "abc123-1200x630.png"
  const match = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/.exec(ref);
  if (!match) return undefined;
  const [, id, dims, format] = match;
  return `https://cdn.sanity.io/images/wdlc9pg8/production/${id}-${dims}.${format}`;
}

async function fetchSanityContent() {
  if (existsSync(SNAPSHOT_PATH)) {
    const raw = await readFile(SNAPSHOT_PATH, 'utf8');
    return fromSnapshot(JSON.parse(raw));
  }

  const client = createClient({
    projectId: 'wdlc9pg8',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-02-20',
  });

  const [posts, guides, toolkitItems, funnelPages] = await Promise.all([
    client.fetch(POSTS_QUERY),
    client.fetch(GUIDES_QUERY),
    client.fetch(TOOLKIT_QUERY),
    client.fetch(FUNNEL_QUERY),
  ]);

  return { posts, guides, toolkitItems, funnelPages };
}

/** Pure transform: content rows -> full stamped route list (static + BTW + dynamic). */
function buildAllRoutes({ posts, guides, toolkitItems, funnelPages = [] }) {
  const skipped = [];
  const dynamic = [];

  for (const post of posts) {
    if (!post.slug || !post.title) {
      skipped.push(`post:${post.slug ?? '(no slug)'} — missing slug or title`);
      continue;
    }
    const rawTitle = stripSysbiltBrand(post.seoTitle || post.title);
    const title = brandTitle(rawTitle);
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
    if (guide.slug === 'built-to-close') {
      skipped.push('guide:built-to-close — handled by static Built to Close routes');
      continue;
    }
    if (guide.slug === 'built-to-run') {
      skipped.push('guide:built-to-run — handled by static Built to Run routes');
      continue;
    }
    if (guide.slug === 'built-to-think') {
      skipped.push('guide:built-to-think — handled by static Built to Think routes');
      continue;
    }
    if (guide.slug === 'built-to-multiply') {
      skipped.push('guide:built-to-multiply — handled by static Built to Multiply routes');
      continue;
    }
    if (guide.slug === 'built-to-teach') {
      skipped.push('guide:built-to-teach — handled by static Built to Teach routes');
      continue;
    }
    if (guide.slug === 'built-to-see') {
      skipped.push('guide:built-to-see — handled by static Built to See routes');
      continue;
    }
    const rawTitle = stripSysbiltBrand(guide.seoTitle?.trim() || guide.title);
    const title = brandTitle(rawTitle);
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
    const rawTitle = stripSysbiltBrand(item.metaTitle?.trim() || item.name);
    const title = brandTitle(rawTitle);
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

  for (const page of funnelPages) {
    if (!page.slug || !page.title) {
      skipped.push(`funnelPage:${page.slug ?? '(no slug)'} — missing slug or title`);
      continue;
    }
    const title = brandTitle(page.title);
    const description = (page.sub || 'Fixed-scope service from SYSBILT.').trim();
    dynamic.push({
      path: `/go/${page.slug}`,
      title,
      description,
      ogTitle: title,
      robots: 'noindex, nofollow',
      jsonLd: [],
    });
  }

  const staticRoutes = STATIC_ROUTES.map((r) => ({ ...r, jsonLd: staticJsonLd(r.path) }));

  return { routes: [...staticRoutes, ...BTW_ROUTES, ...BTS_ROUTES, ...BTC_ROUTES, ...BTR_ROUTES, ...BTT_ROUTES, ...BTM_ROUTES, ...BTE_ROUTES, ...BSE_ROUTES, ...dynamic], skipped };
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

  let content;
  let allRoutes;
  let skipped = [];
  try {
    content = await fetchSanityContent();
    const result = buildAllRoutes(content);
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

  const sitemap = buildSitemapXml(allRoutes, content);
  await writeFile(SITEMAP_PATH, sitemap.xml, 'utf8');

  const codeDefinedCount = BTW_ROUTES.length + BTS_ROUTES.length + BTC_ROUTES.length + BTR_ROUTES.length + BTT_ROUTES.length + BTM_ROUTES.length + BTE_ROUTES.length + BSE_ROUTES.length;
  const sanityCount = allRoutes.length - STATIC_ROUTES.length - codeDefinedCount;
  console.log(
    `[stamp-meta] Stamped ${allRoutes.length} routes (${STATIC_ROUTES.length} static, ${sanityCount} from Sanity, ${BTW_ROUTES.length} BTW, ${BTS_ROUTES.length} BTS, ${BTC_ROUTES.length} BTC, ${BTR_ROUTES.length} BTR, ${BTT_ROUTES.length} BTT, ${BTM_ROUTES.length} BTM, ${BTE_ROUTES.length} BTE, ${BSE_ROUTES.length} BSE).`
  );
  if (skipped.length > 0) {
    console.log('[stamp-meta] Skipped Sanity entries:');
    for (const line of skipped) {
      console.log(`  - ${line}`);
    }
  }
  console.log(`[stamp-meta] Wrote dist/sitemap.xml with ${sitemap.paths.length} deployed indexable routes.`);
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
  isGoFunnelPath,
  isIndexableExcluded,
  STATIC_ROUTES,
  BTW_ROUTES,
  BTS_ROUTES,
  BTC_ROUTES,
  BTR_ROUTES,
  BTT_ROUTES,
  BTM_ROUTES,
  BTE_ROUTES,
  BSE_ROUTES,
  canonicalUrl,
  buildSitemapXml,
  distPathForRoute,
  fetchSanityContent,
  buildAllRoutes,
  collectAllRoutes,
  stampHtml,
};
