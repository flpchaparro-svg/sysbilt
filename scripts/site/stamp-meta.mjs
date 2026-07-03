#!/usr/bin/env node
/**
 * Post-build: stamp per-route <title>, meta, canonical, and og/twitter tags into
 * dist/<path>/index.html so crawlers receive unique raw HTML per URL.
 */
import { createClient } from '@sanity/client';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BTW_CHAPTER_SLUGS, BTW_HUB_ROUTE } from './btw-seo-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const DIST = path.join(ROOT, 'dist');
const TEMPLATE_PATH = path.join(DIST, 'index.html');
const BASE_URL = 'https://sysbilt.com';

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

const BTW_CHAPTER_META_BY_SLUG = {
  'what-a-business-website-is-for': {
    title: 'What a Business Website Is Actually For | SYSBILT',
    description:
      'Most business websites sit online and do nothing. Here is what a website is really for, and why the businesses that treat it as a system pull ahead.',
  },
  'do-you-own-your-website': {
    title: 'Do You Actually Own Your Website? | SYSBILT',
    description:
      'Domain, hosting, code and the accounts behind them. What you must own outright, and how to keep your website secure.',
  },
  'web-page-that-converts': {
    title: 'The Anatomy of a Web Page That Converts | SYSBILT',
    description:
      'Every page that brings in business shares the same four-part structure. How to build a web page that turns visitors into enquiries.',
  },
  'pages-a-business-website-needs': {
    title: 'What Pages Does a Business Website Need? | SYSBILT',
    description:
      'A lead-generation website is lean. The pages you actually need, what each one is for, and the ones you can leave out.',
  },
  'business-website-features': {
    title: 'Website Features That Win Work | SYSBILT',
    description:
      'Contact forms wired to your CRM, booking calendars, AI chat, speed to lead and more. The website features that actually bring in clients.',
  },
  'running-your-website-day-to-day': {
    title: 'Running Your Website Day to Day | SYSBILT',
    description:
      'The simple habits that keep a website sharp and the leads moving, plus a fire drill for when something looks broken.',
  },
  'website-maintenance-speed-accessibility': {
    title: 'Website Maintenance, Speed & Accessibility | SYSBILT',
    description:
      'What keeps a website fast, secure and legal in Australia, from Core Web Vitals to WCAG 2.2 accessibility and privacy rules.',
  },
  'how-to-get-your-website-found': {
    title: 'How to Get Your Website Found (SEO & AI) | SYSBILT',
    description:
      'How getting found really works now, in three plain stages, plus how to be recommended by AI assistants like ChatGPT.',
  },
  'website-crm-automation-hub': {
    title: 'Your Website as the Hub of Your Business | SYSBILT',
    description:
      'Wire your website to your CRM, automation and reporting so leads capture, follow up and report themselves.',
  },
  'growing-your-website-over-time': {
    title: 'Growing Your Website as Your Business Grows | SYSBILT',
    description:
      'The order to build in, the signs you have outgrown your website, and why building properly means you grow instead of starting over.',
  },
  'using-ai-for-website-content': {
    title: 'Using AI to Write Website Content Faster | SYSBILT',
    description:
      'Use AI to turn the blank page into a strong first draft. A copy-ready prompt pack, and the four checks to run before you publish.',
  },
  'website-terms-glossary': {
    title: 'Website Terms Explained Plainly: A Glossary | SYSBILT',
    description:
      'Plain-English definitions of the website terms that matter, from CRM and DNS to webhooks, schema, GEO and Core Web Vitals.',
  },
};

const BTW_ROUTES = [
  {
    path: BTW_HUB_ROUTE,
    title: 'Lead-Generation Websites: The Complete Guide | SYSBILT',
    description:
      'A deep guide to lead-generation websites: ownership, conversion, features, automation, SEO, and growing your site as a business hub. Free from SYSBILT.',
  },
  ...BTW_CHAPTER_SLUGS.map((slug) => {
    const meta = BTW_CHAPTER_META_BY_SLUG[slug];
    if (!meta) throw new Error(`[stamp-meta] Missing Built to Work metadata for ${slug}`);
    return {
      path: `${BTW_HUB_ROUTE}/${slug}`,
      ...meta,
    };
  }),
];

const POSTS_QUERY = `*[_type == "post" && !(_id in path("drafts.**"))]{
  "slug": slug.current,
  title,
  seoTitle,
  seoDescription
}`;

const GUIDES_QUERY = `*[_type == "guide" && !(_id in path("drafts.**"))]{
  "slug": slug.current,
  title,
  seoTitle,
  seoDescription,
  subtitle
}`;

const TOOLKIT_QUERY = `*[_type == "toolkitItem" && !(_id in path("drafts.**"))]{
  "slug": slug.current,
  name,
  metaTitle,
  metaDescription,
  summary
}`;

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function canonicalUrl(routePath) {
  if (routePath === '/') return `${BASE_URL}/`;
  return `${BASE_URL}${routePath}`;
}

function ogUrl(routePath) {
  if (routePath === '/') return BASE_URL;
  return `${BASE_URL}${routePath}`;
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

  return html;
}

function distPathForRoute(routePath) {
  if (routePath === '/') return TEMPLATE_PATH;
  const segments = routePath.replace(/^\//, '').split('/');
  return path.join(DIST, ...segments, 'index.html');
}

async function fetchSanityRoutes() {
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
    dynamic.push({
      path: `/blog/${post.slug}`,
      title,
      description,
      ogTitle: title,
    });
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
    const rawTitle = (guide.seoTitle?.trim() || guide.title).trim();
    const title = `${rawTitle} | SYSBILT`;
    const description = (guide.seoDescription?.trim() || guide.subtitle?.trim() || '').trim();
    const ogTitle = (guide.seoTitle?.trim() || guide.title).trim();
    dynamic.push({
      path: `/guides/${guide.slug}`,
      title,
      description,
      ogTitle,
    });
  }

  for (const item of toolkitItems) {
    if (!item.slug || !item.name) {
      skipped.push(`toolkitItem:${item.slug ?? '(no slug)'} — missing slug or name`);
      continue;
    }
    const rawTitle = (item.metaTitle?.trim() || item.name).trim();
    const title = `${rawTitle} | SYSBILT`;
    const description = (item.metaDescription?.trim() || item.summary?.trim() || '').trim();
    dynamic.push({
      path: `/toolkit/${item.slug}`,
      title,
      description,
      ogTitle: title,
    });
  }

  return { routes: dynamic, skipped };
}

async function main() {
  let template;
  try {
    template = await readFile(TEMPLATE_PATH, 'utf8');
  } catch {
    console.error(`[stamp-meta] dist/index.html not found at ${TEMPLATE_PATH}. Run vite build first.`);
    process.exit(1);
  }

  let sanityRoutes;
  let skipped = [];
  try {
    const result = await fetchSanityRoutes();
    sanityRoutes = result.routes;
    skipped = result.skipped;
  } catch (err) {
    console.error('[stamp-meta] Sanity fetch failed — aborting build.');
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }

  const allRoutes = [...STATIC_ROUTES, ...BTW_ROUTES, ...sanityRoutes];

  for (const route of allRoutes) {
    const html = stampHtml(template, route);
    const outPath = distPathForRoute(route.path);
    await mkdir(path.dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf8');
  }

  console.log(`[stamp-meta] Stamped ${allRoutes.length} routes (${STATIC_ROUTES.length} static, ${sanityRoutes.length} from Sanity).`);
  if (skipped.length > 0) {
    console.log('[stamp-meta] Skipped Sanity entries:');
    for (const line of skipped) {
      console.log(`  - ${line}`);
    }
  }
}

main().catch((err) => {
  console.error('[stamp-meta] Fatal error:', err);
  process.exit(1);
});
