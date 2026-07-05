/**
 * Vercel Edge Middleware: adds `X-Robots-Tag: noindex, follow` on unknown URLs
 * (paths not handled by the SPA router) so crawlers see noindex without executing JS.
 */
import { next } from '@vercel/functions';
import {
  BLOG_SLUGS,
  GUIDE_SLUGS,
  TOOLKIT_SLUGS,
  BTW_CHAPTER_SLUGS as BTW_CHAPTER_SLUG_LIST,
  BTW_HUB_ROUTE,
  BTS_CHAPTER_SLUGS as BTS_CHAPTER_SLUG_LIST,
  BTS_HUB_ROUTE,
} from './src/generated/contentManifest.generated';

/** Vite dev-server URLs (same origin as `vercel dev`). Production builds never hit these paths. */
const VITE_DEV_FILE =
  /\.(?:ts|tsx|js|jsx|mjs|css|json|svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|map)$/i;

/**
 * Valid CMS + Built to Work slug sets, inlined at build time from
 * src/generated/contentManifest.generated.ts. Used to reject bogus content
 * children (soft-404s) so `/blog/does-not-exist` etc. get noindex without a
 * runtime Sanity lookup.
 */
const BLOG_SLUG_SET = new Set(BLOG_SLUGS);
const GUIDE_SLUG_SET = new Set(GUIDE_SLUGS);
const TOOLKIT_SLUG_SET = new Set(TOOLKIT_SLUGS);
const BTW_CHAPTER_SLUGS = new Set(BTW_CHAPTER_SLUG_LIST);
const BTS_CHAPTER_SLUGS = new Set(BTS_CHAPTER_SLUG_LIST);

/** Decode a single path segment; malformed encodings are treated as invalid. */
function decodeSegment(segment: string): string | null {
  try {
    return decodeURIComponent(segment);
  } catch {
    return null;
  }
}

function isViteInternalRequest(url: URL): boolean {
  const { pathname, href } = url;

  if (href.includes('hot-update')) return true;
  if (href.includes('?import') || href.includes('&import')) return true;
  if (href.includes('?t=') || href.includes('&t=')) return true;
  if (href.includes('?v=') || href.includes('&v=')) return true;

  if (
    pathname.startsWith('/@vite/') ||
    pathname === '/@vite' ||
    pathname.startsWith('/@react-refresh') ||
    pathname.startsWith('/@id/') ||
    pathname.startsWith('/@fs/') ||
    pathname === '/src' ||
    pathname.startsWith('/src/') ||
    pathname.startsWith('/node_modules/')
  ) {
    return true;
  }

  if (VITE_DEV_FILE.test(pathname)) return true;

  return false;
}

/** Normalized pathname (no trailing slash except `/`). Must mirror `src/App.tsx` routes. */
function normalizePathname(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.replace(/\/$/, '') || '/';
}

/**
 * True if this path is handled by a real React route (not the catch-all 404).
 * Used to send X-Robots-Tag on unknown URLs so crawlers see noindex without executing JS.
 */
function isSpaRoute(normalizedPathname: string): boolean {
  if (normalizedPathname === '/') return true;
  if (/^\/pillar[1-7]$/i.test(normalizedPathname)) return true;
  const exact = new Set([
    '/architect',
    '/system',
    '/process',
    '/proof',
    '/evidence-vault',
    '/contact',
    '/privacy',
    '/blog',
    '/news',
    '/guides',
    '/toolkit',
  ]);
  if (exact.has(normalizedPathname)) return true;

  const blog = normalizedPathname.match(/^\/blog\/([^/]+)$/i);
  if (blog) {
    const slug = decodeSegment(blog[1]);
    return slug != null && BLOG_SLUG_SET.has(slug);
  }

  // Built to Work hub + code-defined chapters (not Sanity guides).
  if (normalizedPathname === BTW_HUB_ROUTE) return true;
  const builtToWorkChapter = normalizedPathname.match(/^\/guides\/built-to-work\/([^/]+)$/i);
  if (builtToWorkChapter) {
    const slug = decodeSegment(builtToWorkChapter[1]);
    return slug != null && BTW_CHAPTER_SLUGS.has(slug);
  }

  // Built to Sell hub + code-defined chapters (not Sanity guides).
  if (normalizedPathname === BTS_HUB_ROUTE) return true;
  const builtToSellChapter = normalizedPathname.match(/^\/guides\/built-to-sell\/([^/]+)$/i);
  if (builtToSellChapter) {
    const slug = decodeSegment(builtToSellChapter[1]);
    return slug != null && BTS_CHAPTER_SLUGS.has(slug);
  }

  const guide = normalizedPathname.match(/^\/guides\/([^/]+)$/i);
  if (guide) {
    const slug = decodeSegment(guide[1]);
    return slug != null && GUIDE_SLUG_SET.has(slug);
  }

  const toolkit = normalizedPathname.match(/^\/toolkit\/([^/]+)$/i);
  if (toolkit) {
    const slug = decodeSegment(toolkit[1]);
    return slug != null && TOOLKIT_SLUG_SET.has(slug);
  }

  return false;
}

export const config = {
  matcher: [
    // Exclude Vite dev internals + static prefixes so middleware rarely runs for those in prod.
    '/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml|images|videos|@vite|@react-refresh|@id|@fs|src|node_modules).*)',
  ],
};

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (isViteInternalRequest(url)) {
    return next();
  }

  const normalizedPath = normalizePathname(url.pathname);

  // Catch-all 404 URLs: index.html is still 200 — add header so bots get noindex without JS.
  if (!isSpaRoute(normalizedPath)) {
    const res = await next();
    const headers = new Headers(res.headers);
    headers.set('X-Robots-Tag', 'noindex, follow');
    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers,
    });
  }

  return next();
}
