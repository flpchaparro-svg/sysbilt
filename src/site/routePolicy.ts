/**
 * Wave B route policy: classifies every route into one of three SSR body
 * strategies. Shared by the client (no runtime behaviour depends on it yet),
 * `scripts/site/render-routes.mjs` (decides which routes get a rendered
 * React body vs a head-only shell), and `scripts/site/verify-seo.mjs`
 * (asserts each route matches its declared class).
 */

/** Wave B1 pilots plus the guides-hubs cohort (collection + eight book hubs). */
export const GUIDES_HUB_REQUIRED_BODY_PATHS = [
  '/guides',
  '/guides/built-to-work',
  '/guides/built-to-sell',
  '/guides/built-to-close',
  '/guides/built-to-run',
  '/guides/built-to-think',
  '/guides/built-to-multiply',
  '/guides/built-to-teach',
  '/guides/built-to-see',
] as const;

/** Routes that get a real server-rendered React body. */
export const REQUIRED_BODY_PATHS = [
  '/pillar1',
  '/guides/built-to-work/what-a-business-website-is-for',
  '/blog/after-hours-phone-answering-ai-vs-answering',
  ...GUIDES_HUB_REQUIRED_BODY_PATHS,
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

const GUIDES_HUB_PATH_SET = new Set<string>(GUIDES_HUB_REQUIRED_BODY_PATHS);

function isGoFunnelPath(path: string): boolean {
  return path === '/go' || path.startsWith('/go/');
}

/** Word-count minimums verify-seo enforces on `required-body` routes, by route shape. */
export const REQUIRED_BODY_WORD_THRESHOLDS = {
  staticOrPillar: 100,
  guidesHub: 120,
  chapter: 600,
  blog: 600,
} as const;

export function wordThresholdForRequiredBodyPath(path: RequiredBodyPath | string): number {
  if (path.startsWith('/blog/')) return REQUIRED_BODY_WORD_THRESHOLDS.blog;
  if (GUIDES_HUB_PATH_SET.has(path)) return REQUIRED_BODY_WORD_THRESHOLDS.guidesHub;
  if (path.startsWith('/guides/')) return REQUIRED_BODY_WORD_THRESHOLDS.chapter;
  return REQUIRED_BODY_WORD_THRESHOLDS.staticOrPillar;
}

/**
 * Classify a route path into its SSR body policy.
 *
 * - `required-body`: Wave B pilots / cohorts with a real server-rendered body.
 * - `noindex-shell`: intentionally not indexed (funnel, news, `/read` editions).
 * - `temporary-legacy-shell`: every other indexable route (head-only until a later cohort).
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
