/**
 * Native React 19 document-metadata tags for the Wave B1 SSR pilot routes.
 *
 * `<title>`, `<meta>`, and `<link>` elements are "hoistable" in React 19:
 * wherever they render in the tree, React de-dupes them and moves them into
 * `<head>` on both the client and during server rendering
 * (`prerenderToNodeStream`). react-helmet-async's context-capture mechanism
 * does not survive `prerenderToNodeStream` (see the Wave B1 spike), so the
 * pilot routes use this instead of `PageMeta`.
 */
const DEFAULT_OG_IMAGE = 'https://sysbilt.com/images/og-sysbilt.png';

export interface RouteHeadProps {
  title: string;
  description: string;
  /** Absolute URL for `<link rel="canonical">` */
  canonical?: string;
  /** e.g. `noindex, follow` for pages that should not appear in search results */
  robots?: string;
  /** Open Graph image URL; defaults to site-wide og image */
  ogImage?: string;
  /** Open Graph title, if it should differ from `title` */
  ogTitle?: string;
  ogType?: 'website' | 'article';
}

/** Sets document title, meta description, canonical, and Open Graph/Twitter tags via native tags. */
export function RouteHead({
  title,
  description,
  canonical,
  robots,
  ogImage,
  ogTitle,
  ogType = 'website',
}: RouteHeadProps) {
  const resolvedOgImage = ogImage != null && ogImage !== '' ? ogImage : DEFAULT_OG_IMAGE;
  const resolvedOgTitle = ogTitle != null && ogTitle !== '' ? ogTitle : title;
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical != null && canonical !== '' ? <link rel="canonical" href={canonical} /> : null}
      {robots != null && robots !== '' ? <meta name="robots" content={robots} /> : null}
      <meta property="og:type" content={ogType} />
      {canonical != null && canonical !== '' ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
    </>
  );
}
