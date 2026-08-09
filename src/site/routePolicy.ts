/**
 * Wave B1 route policy: classifies every route into one of three SSR body
 * strategies. Shared by the client (no runtime behaviour depends on it yet),
 * `scripts/site/render-routes.mjs` (decides which routes get a rendered
 * React body vs a head-only shell), and `scripts/site/verify-seo.mjs`
 * (asserts each route matches its declared class).
 */

/** The only routes that get a real server-rendered React body in Wave B1. */
export const REQUIRED_BODY_PATHS = [
  '/pillar1',
  '/guides/built-to-work/what-a-business-website-is-for',
  '/blog/after-hours-phone-answering-ai-vs-answering',
] as const;

export type RequiredBodyPath = (typeof REQUIRED_BODY_PATHS)[number];

export type RouteBodyPolicy = 'required-body' | 'temporary-legacy-shell' | 'noindex-shell';

/** Guide book hub slugs that print a static "read online" long-form edition; always noindex. */
const BOOK_READ_HUB_SLUGS = [
  'built-to-work',
  'built-to-sell',
  'built-to-close',
  'built-to-run',
  'built-to-think',
  'built-to-multiply',
  'built-to-teach',
  'built-to-see',
] as const;

/** `/guides/<hub>/read` routes: eight of them, one per code-defined guide book. */
export const NOINDEX_BOOK_READ_PATHS = BOOK_READ_HUB_SLUGS.map((slug) => `/guides/${slug}/read`);

const NOINDEX_EXACT_PATHS = new Set<string>(['/news', ...NOINDEX_BOOK_READ_PATHS]);

function isGoFunnelPath(path: string): boolean {
  return path === '/go' || path.startsWith('/go/');
}

/** Word-count minimums verify-seo enforces on `required-body` routes, by route shape. */
export const REQUIRED_BODY_WORD_THRESHOLDS = {
  staticOrPillar: 100,
  chapter: 600,
  blog: 600,
} as const;

export function wordThresholdForRequiredBodyPath(path: RequiredBodyPath | string): number {
  if (path.startsWith('/blog/')) return REQUIRED_BODY_WORD_THRESHOLDS.blog;
  if (path.startsWith('/guides/')) return REQUIRED_BODY_WORD_THRESHOLDS.chapter;
  return REQUIRED_BODY_WORD_THRESHOLDS.staticOrPillar;
}

/**
 * Classify a route path into its Wave B1 SSR body policy.
 *
 * - `required-body`: one of the three Wave B1 pilots. Gets a real server-
 *   rendered React body, embedded route data, and `data-ssr="1"`.
 * - `noindex-shell`: intentionally not indexed (private funnel, industry
 *   news feed, or the long-form "read online" book editions). Head-only,
 *   stamped `noindex`, and excluded from the sitemap.
 * - `temporary-legacy-shell`: every other indexable route. Head-only for
 *   now (client hydrates and renders the body as before); a later wave
 *   moves these to `required-body`.
 */
export function bodyPolicyForPath(path: string): RouteBodyPolicy {
  const normalised = path === '' ? '/' : path;

  if ((REQUIRED_BODY_PATHS as readonly string[]).includes(normalised)) {
    return 'required-body';
  }

  if (NOINDEX_EXACT_PATHS.has(normalised) || isGoFunnelPath(normalised)) {
    return 'noindex-shell';
  }

  return 'temporary-legacy-shell';
}

export function isRequiredBodyPath(path: string): path is RequiredBodyPath {
  return bodyPolicyForPath(path) === 'required-body';
}
