import { useEffect, useState, type ReactNode } from 'react';

/**
 * Renders `fallback` (default `null`) during SSR and on the client's first
 * paint, then swaps to `children` once mounted. Use for widgets that only
 * make sense in a browser (modals, cookie banners, help docks) so SSR output
 * and the pre-hydration client paint stay identical.
 */
export function ClientOnly({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <>{fallback}</>;
  return <>{children}</>;
}
