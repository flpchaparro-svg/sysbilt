import { createContext, useContext, type ReactNode } from 'react';

/** Arbitrary per-route JSON payload embedded at build time for a `required-body` route. */
export type RouteData = Record<string, unknown> | null;

declare global {
  interface Window {
    /** Embedded by `scripts/site/render-routes.mjs` for `required-body` routes. */
    __SYSBILT_ROUTE_DATA__?: Record<string, unknown>;
  }
}

const RouteContentContext = createContext<RouteData>(null);

/** Wraps the app during SSR (and, harmlessly, on the client) so pages can read pre-fetched route data. */
export function RouteContentProvider({ data, children }: { data: RouteData; children: ReactNode }) {
  return <RouteContentContext.Provider value={data ?? null}>{children}</RouteContentContext.Provider>;
}

/**
 * Reads route data set by the SSR renderer for the current route: from
 * context during server rendering, or from the embedded `window` global on
 * the client's first paint (before hydration re-runs data fetches).
 */
export function useRouteData<T extends Record<string, unknown> = Record<string, unknown>>(): T | null {
  const ctx = useContext(RouteContentContext);
  if (ctx != null) return ctx as T;
  if (typeof window !== 'undefined' && window.__SYSBILT_ROUTE_DATA__) {
    return window.__SYSBILT_ROUTE_DATA__ as T;
  }
  return null;
}
