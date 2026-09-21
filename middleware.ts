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
  BTC_CHAPTER_SLUGS as BTC_CHAPTER_SLUG_LIST,
  BTC_HUB_ROUTE,
  BTR_CHAPTER_SLUGS as BTR_CHAPTER_SLUG_LIST,
  BTR_HUB_ROUTE,
  BTT_CHAPTER_SLUGS as BTT_CHAPTER_SLUG_LIST,
  BTT_HUB_ROUTE,
  BTM_CHAPTER_SLUGS as BTM_CHAPTER_SLUG_LIST,
  BTM_HUB_ROUTE,
  BTE_CHAPTER_SLUGS as BTE_CHAPTER_SLUG_LIST,
  BTE_HUB_ROUTE,
  BSE_CHAPTER_SLUGS as BSE_CHAPTER_SLUG_LIST,
  BSE_HUB_ROUTE,
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
const BLOG_REDIRECT_SLUGS = [
  'what-vibe-coding-means-small-business-websites',
  'looker-studio-vs-power-bi-australian-small',
  'what-happens-when-your-business-hits-2m',
  'true-cost-cheap-website-australian-small-businesses',
  'best-social-media-scheduling-tool-small-business',
  'hubspot-vs-pipedrive-australian-small-businesses',
  'complete-guide-business-automation-australian-small-businesses',
  '800-missed-call-how-much-money-are',
  'what-kpis-should-5m-business-track-weekly',
  'business-technology-trends-australian-smbs-2026',
];
const BLOG_SLUG_SET = new Set([...BLOG_SLUGS, ...BLOG_REDIRECT_SLUGS]);
const GUIDE_SLUG_SET = new Set(GUIDE_SLUGS);
const TOOLKIT_SLUG_SET = new Set(TOOLKIT_SLUGS);
const BTW_CHAPTER_SLUGS = new Set(BTW_CHAPTER_SLUG_LIST);
const BTS_CHAPTER_SLUGS = new Set(BTS_CHAPTER_SLUG_LIST);
const BTC_CHAPTER_SLUGS = new Set(BTC_CHAPTER_SLUG_LIST);
const BTR_CHAPTER_SLUGS = new Set(BTR_CHAPTER_SLUG_LIST);
const BTT_CHAPTER_SLUGS = new Set(BTT_CHAPTER_SLUG_LIST);
const BTM_CHAPTER_SLUGS = new Set(BTM_CHAPTER_SLUG_LIST);
const BTE_CHAPTER_SLUGS = new Set(BTE_CHAPTER_SLUG_LIST);
const BSE_CHAPTER_SLUGS = new Set(BSE_CHAPTER_SLUG_LIST);

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
    '/terms',
    '/blog',
    '/news',
    '/guides',
    '/toolkit',
    '/go',
    '/go/thanks',
    '/learn',
    '/r',
    '/demo/quote-capture',
    '/404.html',
  ]);
  if (exact.has(normalizedPathname)) return true;

  if (normalizedPathname.startsWith('/go/')) return true;
  if (normalizedPathname.startsWith('/learn/')) return true;
  if (normalizedPathname.startsWith('/r/')) return true;
  if (normalizedPathname.startsWith('/proposal/')) return true;
  if (normalizedPathname.startsWith('/agreement/')) return true;
  if (normalizedPathname.startsWith('/reports/')) return true;
  if (normalizedPathname.startsWith('/q/')) return true;
  if (normalizedPathname.startsWith('/embed/q/')) return true;
  if (normalizedPathname.startsWith('/demo/quote-capture/')) return true;

  const bookReadHubs = [
    BTW_HUB_ROUTE,
    BTS_HUB_ROUTE,
    BTC_HUB_ROUTE,
    BTR_HUB_ROUTE,
    BTT_HUB_ROUTE,
    BTM_HUB_ROUTE,
    BTE_HUB_ROUTE,
    BSE_HUB_ROUTE,
  ];
  if (bookReadHubs.some((hub) => normalizedPathname === `${hub}/read`)) return true;

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

  // Built to Close hub + code-defined chapters (not Sanity guides).
  if (normalizedPathname === BTC_HUB_ROUTE) return true;
  const builtToCloseChapter = normalizedPathname.match(/^\/guides\/built-to-close\/([^/]+)$/i);
  if (builtToCloseChapter) {
    const slug = decodeSegment(builtToCloseChapter[1]);
    return slug != null && BTC_CHAPTER_SLUGS.has(slug);
  }

  // Built to Run hub + code-defined chapters (not Sanity guides).
  if (normalizedPathname === BTR_HUB_ROUTE) return true;
  const builtToRunChapter = normalizedPathname.match(/^\/guides\/built-to-run\/([^/]+)$/i);
  if (builtToRunChapter) {
    const slug = decodeSegment(builtToRunChapter[1]);
    return slug != null && BTR_CHAPTER_SLUGS.has(slug);
  }

  // Built to Think hub + code-defined chapters (not Sanity guides).
  if (normalizedPathname === BTT_HUB_ROUTE) return true;
  const builtToThinkChapter = normalizedPathname.match(/^\/guides\/built-to-think\/([^/]+)$/i);
  if (builtToThinkChapter) {
    const slug = decodeSegment(builtToThinkChapter[1]);
    return slug != null && BTT_CHAPTER_SLUGS.has(slug);
  }

  // Built to Multiply hub + code-defined chapters (not Sanity guides).
  if (normalizedPathname === BTM_HUB_ROUTE) return true;
  const builtToMultiplyChapter = normalizedPathname.match(/^\/guides\/built-to-multiply\/([^/]+)$/i);
  if (builtToMultiplyChapter) {
    const slug = decodeSegment(builtToMultiplyChapter[1]);
    return slug != null && BTM_CHAPTER_SLUGS.has(slug);
  }

  // Built to Teach hub + code-defined chapters (not Sanity guides).
  if (normalizedPathname === BTE_HUB_ROUTE) return true;
  const builtToTeachChapter = normalizedPathname.match(/^\/guides\/built-to-teach\/([^/]+)$/i);
  if (builtToTeachChapter) {
    const slug = decodeSegment(builtToTeachChapter[1]);
    return slug != null && BTE_CHAPTER_SLUGS.has(slug);
  }

  // Built to See hub + code-defined chapters (not Sanity guides).
  if (normalizedPathname === BSE_HUB_ROUTE) return true;
  const builtToSeeChapter = normalizedPathname.match(/^\/guides\/built-to-see\/([^/]+)$/i);
  if (builtToSeeChapter) {
    const slug = decodeSegment(builtToSeeChapter[1]);
    return slug != null && BSE_CHAPTER_SLUGS.has(slug);
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
    '/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml|404.html|images|videos|@vite|@react-refresh|@id|@fs|src|node_modules).*)',
  ],
};

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (isViteInternalRequest(url)) {
    return next();
  }

  const normalizedPath = normalizePathname(url.pathname);

  // Private SPA routes: always noindex at the edge, even when the route is "known".
  // Unstamped /go/* (and /r, /q, documents) otherwise fall through to homepage HTML
  // with no robots meta, which is the GSC duplicate bucket this 404 work is closing.
  const forceNoindex =
    normalizedPath === '/news' ||
    normalizedPath === '/go' ||
    normalizedPath.startsWith('/go/') ||
    normalizedPath === '/learn' ||
    normalizedPath.startsWith('/learn/') ||
    normalizedPath === '/r' ||
    normalizedPath.startsWith('/r/') ||
    normalizedPath.startsWith('/proposal/') ||
    normalizedPath.startsWith('/agreement/') ||
    normalizedPath.startsWith('/reports/') ||
    normalizedPath.startsWith('/q/') ||
    normalizedPath.startsWith('/embed/q/') ||
    normalizedPath === '/demo/quote-capture' ||
    normalizedPath.startsWith('/demo/quote-capture/');

  if (!isSpaRoute(normalizedPath)) {
    const notFoundUrl = new URL('/404.html', request.url);
    let notFoundRes: Response;
    try {
      notFoundRes = await fetch(notFoundUrl);
    } catch {
      return new Response('Not Found', {
        status: 404,
        statusText: 'Not Found',
        headers: { 'X-Robots-Tag': 'noindex, follow', 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }
    const headers = new Headers(notFoundRes.headers);
    headers.set('X-Robots-Tag', 'noindex, follow');
    return new Response(notFoundRes.body, {
      status: 404,
      statusText: 'Not Found',
      headers,
    });
  }

  if (forceNoindex) {
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
