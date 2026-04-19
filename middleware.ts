/**
 * Vercel Edge Middleware: send known crawlers / AI fetchers to a prerender service
 * (Prerender.io-compatible) so they receive rendered HTML instead of the SPA shell.
 *
 * Set PRERENDER_TOKEN in Vercel project env (from prerender.io or compatible host).
 * If unset, middleware is a no-op (pass-through).
 */
import { next } from '@vercel/functions';

const PRERENDER_BASE = process.env.PRERENDER_BASE_URL ?? 'https://service.prerender.io';

/** User-agent substrings (case-insensitive) — bots & AI fetchers */
const BOT_PATTERNS = [
  /googlebot/i,
  /bingbot/i,
  /ChatGPT-User/i,
  /PerplexityBot/i,
  /ClaudeBot/i,
  /GPTBot/i,
  /Amazonbot/i,
  /facebookexternalhit/i,
  /LinkedInBot/i,
  /Twitterbot/i,
  /Slackbot/i,
  /WhatsApp/i,
  /TelegramBot/i,
  /Discordbot/i,
  /Viber/i,
  /iMessageBot/i,
  /Applebot/i,
  /SkypeUriPreview/i,
  /Line/i,
];

function isBot(userAgent: string): boolean {
  return BOT_PATTERNS.some((re) => re.test(userAgent));
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

/** Routes that must receive prerendered HTML for SEO / GEO (see project brief). */
function shouldPrerenderPath(pathname: string): boolean {
  if (pathname.startsWith('/api')) return false;
  if (pathname === '/robots.txt' || pathname === '/sitemap.xml') return false;
  if (/\.[a-zA-Z0-9]{1,6}$/.test(pathname)) return false;

  if (pathname.startsWith('/news')) return false;
  if (pathname.startsWith('/privacy')) return false;
  if (pathname.startsWith('/evidence-vault')) return false;

  if (pathname === '/') return true;

  const staticRoutes = new Set([
    '/system',
    '/process',
    '/architect',
    '/proof',
    '/blog',
    '/guides',
    '/contact',
  ]);
  for (let i = 1; i <= 7; i++) staticRoutes.add(`/pillar${i}`);
  if (staticRoutes.has(pathname)) return true;

  if (pathname.startsWith('/blog/') && pathname.length > '/blog/'.length) return true;

  if (pathname.startsWith('/guides/') && pathname.length > '/guides/'.length) return true;

  return false;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml|images|videos).*)',
  ],
};

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const ua = request.headers.get('user-agent') ?? '';
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

  if (!isBot(ua) || !shouldPrerenderPath(normalizedPath)) {
    return next();
  }

  const token = process.env.PRERENDER_TOKEN;
  if (!token?.trim()) {
    return next();
  }

  const targetPage = url.href;
  const prerenderUrl = `${PRERENDER_BASE.replace(/\/$/, '')}/${targetPage}`;

  try {
    const res = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': token,
        'User-Agent': ua,
      },
      redirect: 'follow',
    });

    const headers = new Headers(res.headers);
    headers.delete('content-encoding');

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers,
    });
  } catch {
    return next();
  }
}
