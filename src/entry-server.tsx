/**
 * SSR entry point used only at build time by `scripts/site/render-routes.mjs`
 * (via the `.build/ssr` Vite SSR bundle). Renders the same `<App />` tree the
 * client hydrates, wrapped in a `StaticRouter` fixed to one URL and a
 * `RouteContentProvider` carrying pre-fetched data for `required-body`
 * routes (see `src/site/routePolicy.ts`).
 *
 * Uses React 19's `prerenderToNodeStream`: it waits out Suspense boundaries
 * (no partial/streaming shell), which is what a static-export renderer
 * needs. `react-helmet-async`'s Helmet component does not survive this API
 * (its context-capture side channel never resolves), so the app relies on
 * native `<title>/<meta>/<link>` tags for anything the SSR output must
 * contain; see `src/site/RouteHead.tsx`.
 */
import { StrictMode } from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { RouteContentProvider, type RouteData } from './site/RouteContentProvider';

export interface RenderResult {
  /** Full HTML fragment for the rendered tree (includes any hoisted `<title>/<meta>/<link>` tags). */
  html: string;
}

async function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString('utf8');
}

export async function render(url: string, routeData: RouteData = null): Promise<RenderResult> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url}>
        <RouteContentProvider data={routeData}>
          <App />
        </RouteContentProvider>
      </StaticRouter>
    </StrictMode>,
  );
  const html = await streamToString(prelude);
  return { html };
}
