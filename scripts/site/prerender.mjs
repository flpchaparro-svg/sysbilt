#!/usr/bin/env node
/**
 * Entry only: static `import` is hoisted in ESM, so prerender logic lives in
 * scripts/site/prerender-run.mjs and is loaded with dynamic import() after this check.
 */
if (process.env.VERCEL) {
  console.log('[prerender] Skipping on Vercel — pre-rendered files are committed to repo');
  process.exit(0);
}

await import('./prerender-run.mjs');
