import type { FC, ReactNode } from 'react';
import { Helmet as HelmetImpl } from 'react-helmet-async';

/** react-helmet-async + React 19 JSX types */
const Helmet = HelmetImpl as FC<{ children?: ReactNode }>;

export interface PageMetaProps {
  title: string;
  description: string;
  /** e.g. `noindex, follow` for pages that should not appear in search results */
  robots?: string;
}

/** Sets document title, meta description, and matching Open Graph title/description. */
export function PageMeta({ title, description, robots }: PageMetaProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {robots != null && robots !== '' ? <meta name="robots" content={robots} /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
