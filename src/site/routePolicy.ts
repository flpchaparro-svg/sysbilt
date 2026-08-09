/**
 * Wave B route policy: classifies every route into one of three SSR body
 * strategies. Shared by `scripts/site/render-routes.mjs` and
 * `scripts/site/verify-seo.mjs`.
 */

/** Guides collection hub + eight book hubs. */
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

/**
 * Explicit required-body paths that are not inferred (pilots, hubs).
 * Book chapters use `isCodeBookChapterPath`; toolkit items use `isToolkitItemPath`;
 * blog posts use `isBlogPostPath`; Sanity guides use `isSanityGuidePath`.
 */
export const STATIC_REQUIRED_BODY_PATHS = [
  '/architect',
  '/contact',
  '/evidence-vault',
  '/pillar1',
  '/pillar2',
  '/pillar3',
  '/pillar4',
  '/pillar5',
  '/pillar6',
  '/pillar7',
  '/privacy',
  '/process',
  '/proof',
  '/system',
  '/terms',
] as const;

export const REQUIRED_BODY_PATHS = [
  ...STATIC_REQUIRED_BODY_PATHS,
  '/blog',
  '/toolkit',
  ...GUIDES_HUB_REQUIRED_BODY_PATHS,
] as const;

export type RequiredBodyPath = (typeof REQUIRED_BODY_PATHS)[number] | string;

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

const BOOK_HUB_SLUG_SET = new Set<string>(BOOK_READ_HUB_SLUGS);

function isGoFunnelPath(path: string): boolean {
  return path === '/go' || path.startsWith('/go/');
}

/**
 * `/guides/built-to-work/:chapterSlug` (and the other seven books).
 * Excludes hubs (`/guides/built-to-work`) and `/read` editions.
 */
export function isCodeBookChapterPath(path: string): boolean {
  const parts = path.split('/').filter(Boolean);
  if (parts.length !== 3 || parts[0] !== 'guides') return false;
  if (parts[2] === 'read') return false;
  return BOOK_HUB_SLUG_SET.has(parts[1]);
}

/** `/toolkit/:slug` item pages (not the `/toolkit` index). */
export function isToolkitItemPath(path: string): boolean {
  const parts = path.split('/').filter(Boolean);
  return parts.length === 2 && parts[0] === 'toolkit' && parts[1].length > 0;
}

/** `/blog/:slug` post pages (not the `/blog` index). */
export function isBlogPostPath(path: string): boolean {
  const parts = path.split('/').filter(Boolean);
  return parts.length === 2 && parts[0] === 'blog' && parts[1].length > 0;
}

/**
 * `/guides/:slug` Sanity CMS guide docs.
 * Excludes the collection hub, the eight code book hubs, chapters, and `/read`.
 */
export function isSanityGuidePath(path: string): boolean {
  const parts = path.split('/').filter(Boolean);
  if (parts.length !== 2 || parts[0] !== 'guides' || !parts[1]) return false;
  return !BOOK_HUB_SLUG_SET.has(parts[1]);
}

/** Word-count minimums verify-seo enforces on `required-body` routes, by route shape. */
export const REQUIRED_BODY_WORD_THRESHOLDS = {
  staticOrPillar: 100,
  guidesHub: 120,
  toolkitHub: 120,
  blogHub: 120,
  toolkitItem: 450,
  chapter: 600,
  blog: 600,
  guide: 800,
} as const;

/** Expected public chapter count across all eight code-defined books (12 × 8). */
export const EXPECTED_CODE_BOOK_CHAPTER_COUNT = 96;

export function wordThresholdForRequiredBodyPath(path: RequiredBodyPath | string): number {
  if (path === '/blog') return REQUIRED_BODY_WORD_THRESHOLDS.blogHub;
  if (isBlogPostPath(path)) return REQUIRED_BODY_WORD_THRESHOLDS.blog;
  if (path === '/toolkit') return REQUIRED_BODY_WORD_THRESHOLDS.toolkitHub;
  if (isToolkitItemPath(path)) return REQUIRED_BODY_WORD_THRESHOLDS.toolkitItem;
  if (isSanityGuidePath(path)) return REQUIRED_BODY_WORD_THRESHOLDS.guide;
  if (GUIDES_HUB_PATH_SET.has(path)) return REQUIRED_BODY_WORD_THRESHOLDS.guidesHub;
  if (isCodeBookChapterPath(path) || path.startsWith('/guides/')) {
    return REQUIRED_BODY_WORD_THRESHOLDS.chapter;
  }
  return REQUIRED_BODY_WORD_THRESHOLDS.staticOrPillar;
}

/**
 * Classify a route path into its SSR body policy.
 *
 * - `required-body`: pilots, guides hubs, book chapters, toolkit, blog, Sanity guides.
 * - `noindex-shell`: funnel, news, `/read` editions.
 * - `temporary-legacy-shell`: every other indexable route until a later cohort.
 */
export function bodyPolicyForPath(path: string): RouteBodyPolicy {
  const normalised = path === '' ? '/' : path;

  if (
    (REQUIRED_BODY_PATHS as readonly string[]).includes(normalised) ||
    isCodeBookChapterPath(normalised) ||
    isToolkitItemPath(normalised) ||
    isBlogPostPath(normalised) ||
    isSanityGuidePath(normalised)
  ) {
    return 'required-body';
  }

  if (NOINDEX_EXACT_PATHS.has(normalised) || isGoFunnelPath(normalised)) {
    return 'noindex-shell';
  }

  return 'temporary-legacy-shell';
}

export function isRequiredBodyPath(path: string): boolean {
  return bodyPolicyForPath(path) === 'required-body';
}
