/**
 * Post-build: serves `dist/` via Vite preview, captures HTML per route with Puppeteer
 * so crawlers receive rendered <title> / meta from react-helmet-async.
 *
 * Loaded from scripts/site/prerender.mjs (after Vercel skip check). Run after `vite build`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');

const ROUTES = [
  '/',
  '/system',
  '/process',
  '/architect',
  '/proof',
  '/evidence-vault',
  '/contact',
  '/privacy',
  '/pillar1',
  '/pillar2',
  '/pillar3',
  '/pillar4',
  '/pillar5',
  '/pillar6',
  '/pillar7',
  '/blog',
  '/news',
  '/guides',
  '/toolkit',
];

const SITE = 'https://sysbilt.com';

function patchCanonical(html, route) {
  const canonicalHref = route === '/' ? `${SITE}/` : `${SITE}${route}`;
  return html.replace(
    /<link rel="canonical" href="https:\/\/sysbilt\.com\/?"[^>]*>/i,
    `<link rel="canonical" href="${canonicalHref}" />`
  );
}

/** react-helmet-async leaves the shell &lt;title&gt;; remove the duplicate default. */
function dedupeStaticTitle(html) {
  return html.replace(
    /<\/title>\s*<title>SYSBILT \| Business Systems for Growing Companies<\/title>/i,
    '</title>'
  );
}

/** Only scan &lt;head&gt; — inlined &lt;style&gt; can contain substrings that look like `&lt;meta name="description"`. */
function getHeadInnerHtml(html) {
  const m = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  return m ? m[1] : '';
}

function headForMetaScan(headInner) {
  return headInner
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
}

function countMetaDescriptionTags(html) {
  const head = headForMetaScan(getHeadInnerHtml(html));
  return (head.match(/<meta\s+[^>]*name\s*=\s*["']description["'][^>]*>/gi) || []).length;
}

/**
 * When Helmet adds a page-specific description, the shell default can remain first in the
 * document; crawlers read the first &lt;meta name="description"&gt;. Remove the shell
 * duplicate only if at least two description metas exist (Helmet injected another).
 */
function dedupeMetaDescription(html) {
  if (countMetaDescriptionTags(html) < 2) return html;
  return html.replace(
    /<meta\s+name="description"\s+content="SYSBILT builds business systems for growing Australian companies[^"]*"\s*\/?>/i,
    ''
  );
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const distDir = path.join(root, 'dist');
  if (!fs.existsSync(distDir)) {
    console.error('[prerender] dist/ not found. Run vite build first.');
    process.exit(1);
  }

  const server = await preview({
    root,
    logLevel: 'warn',
    preview: {
      port: 4173,
      strictPort: true,
    },
  });

  const baseUrl = server.resolvedUrls?.local?.[0] ?? server.resolvedUrls?.network?.[0];
  if (!baseUrl) {
    await server.close();
    throw new Error('[prerender] No preview server URL');
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      const url = new URL(route === '/' ? '/' : route, baseUrl).href;
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 120_000 });
      await delay(5000);
      let html = await page.content();
      html = patchCanonical(html, route);
      html = dedupeStaticTitle(html);
      html = dedupeMetaDescription(html);
      const outDir = route === '/' ? distDir : path.join(distDir, route.slice(1));
      fs.mkdirSync(outDir, { recursive: true });
      const outFile = path.join(outDir, 'index.html');
      fs.writeFileSync(outFile, html, 'utf8');
      console.log(`[prerender] ${route} -> ${path.relative(root, outFile)}`);
      await page.close();
    }
  } finally {
    await browser.close();
    await server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
