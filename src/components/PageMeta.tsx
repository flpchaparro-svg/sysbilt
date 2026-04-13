import type { FC, ReactNode } from 'react';
import { Helmet as HelmetImpl } from 'react-helmet-async';

/** react-helmet-async + React 19 JSX types */
const Helmet = HelmetImpl as FC<{ children?: ReactNode }>;

const DEFAULT_OG_IMAGE = 'https://sysbilt.com/images/og-sysbilt.png';

export interface PageMetaProps {
  title: string;
  description: string;
  /** Absolute URL for `<link rel="canonical">` */
  canonical?: string;
  /** e.g. `noindex, follow` for pages that should not appear in search results */
  robots?: string;
  /** Open Graph image URL; defaults to site-wide og image */
  ogImage?: string;
}

/** Sets document title, meta description, and matching Open Graph title/description. */
export function PageMeta({ title, description, canonical, robots, ogImage }: PageMetaProps) {
  const resolvedOgImage = ogImage != null && ogImage !== '' ? ogImage : DEFAULT_OG_IMAGE;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical != null && canonical !== '' ? <link rel="canonical" href={canonical} /> : null}
      {robots != null && robots !== '' ? <meta name="robots" content={robots} /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical != null && canonical !== '' ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:image" content={resolvedOgImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
    </Helmet>
  );
}
