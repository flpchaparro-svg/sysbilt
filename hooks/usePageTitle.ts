import { useEffect } from 'react';

/**
 * Legacy: sets `document.title` only (no meta description).
 * Prefer `<PageMeta title="…" description="…" />` from `components/PageMeta.tsx` for route-level SEO.
 */
export const usePageTitle = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | SYSBILT`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};
