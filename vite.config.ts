/**
 * Production builds run @prerenderer/rollup-plugin + Puppeteer so each route gets a real HTML
 * snapshot under dist/<path>/index.html (bots and no-JS clients see content; Vercel serves these
 * files before the SPA fallback rewrite). There is no vercel.json “prerender” flag for plain SPAs.
 * Set SKIP_PRERENDER=1 for a faster build without Puppeteer.
 */
import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import prerender from '@prerenderer/rollup-plugin';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';
import { getAllPrerenderRoutes } from './prerender/routes';

const SITE_ORIGIN = 'https://sysbilt.com';

export default defineConfig(async ({ command }): Promise<UserConfig> => {
  const enablePrerender = command === 'build' && process.env.SKIP_PRERENDER !== '1';

  let prerenderRoutes: string[] = [];
  if (enablePrerender) {
    prerenderRoutes = await getAllPrerenderRoutes();
  }

  return {
    plugins: [
      react(),
      cssInjectedByJsPlugin(),
      visualizer({
        open: !process.env.CI && !process.env.VERCEL,
        filename: 'bundle-stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
      ...(enablePrerender
        ? [
            prerender({
              routes: prerenderRoutes,
              renderer: new PuppeteerRenderer({
                renderAfterTime: 3500,
                maxConcurrentRoutes: 2,
                timeout: 120000,
              }),
              postProcess(renderedRoute) {
                renderedRoute.html = renderedRoute.html
                  .replace(/http:\/\//gi, 'https://')
                  .replace(
                    /https:\/\/(localhost|127\.0\.0\.1)(:\d+)?/gi,
                    SITE_ORIGIN
                  );
              },
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '~': path.resolve(__dirname, '.'),
      },
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-motion': ['framer-motion'],
            'vendor-icons': ['lucide-react'],
            'vendor-d3': ['d3-selection', 'd3-shape', 'd3-scale', 'd3-axis', 'd3-transition', 'd3-ease'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion'],
    },
  };
});
