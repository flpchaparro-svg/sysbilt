/**
 * Vercel Edge Middleware: adds `X-Robots-Tag: noindex, follow` on unknown URLs
 * (paths not handled by the SPA router) so crawlers see noindex without executing JS.
 */
import { next } from '@vercel/functions';

/** Vite dev-server URLs (same origin as `vercel dev`). Production builds never hit these paths. */
const VITE_DEV_FILE =
  /\.(?:ts|tsx|js|jsx|mjs|css|json|svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|map)$/i;

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
  ]);
  if (exact.has(normalizedPathname)) return true;
  if (/^\/blog\/[^/]+$/i.test(normalizedPathname)) return true;
  if (/^\/guides\/[^/]+$/i.test(normalizedPathname)) return true;
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
