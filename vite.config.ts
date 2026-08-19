import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import { existsSync, readFileSync } from 'node:fs';

function loadEnvLocal(): Record<string, string> {
  const env: Record<string, string> = {};
  const file = path.resolve(__dirname, '.env.local');
  if (!existsSync(file)) return env;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (!m) continue;
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    env[m[1].trim()] = val;
  }
  return env;
}

/** Local-only: prefill agreement from Stripe Checkout without `vercel dev`. */
function websiteSessionDevApi(): Plugin {
  return {
    name: 'website-session-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (!url.startsWith('/api/funnel/access')) return next();
        // Only handle Stripe session prefill GET locally. POSTs need Vercel/HubSpot.
        if (req.method !== 'GET') return next();
        try {
          const parsed = new URL(url, 'http://localhost');
          const sessionId = parsed.searchParams.get('session_id') || '';
          if (!sessionId.startsWith('cs_')) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Missing or invalid session_id' }));
            return;
          }
          const env = loadEnvLocal();
          const secret =
            env.Stripe_Secret_key || env.STRIPE_SECRET_KEY || env.STRIPE_SECRET;
          if (!secret) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Stripe is not configured' }));
            return;
          }
          const stripeUrl = new URL(
            `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
          );
          stripeUrl.searchParams.set('expand[]', 'customer');
          const stripeRes = await fetch(stripeUrl.toString(), {
            headers: { Authorization: `Bearer ${secret}` },
          });
          const session = await stripeRes.json();
          if (!stripeRes.ok) {
            res.statusCode = stripeRes.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                error: session?.error?.message || 'Could not load checkout session',
              }),
            );
            return;
          }
          if (session.payment_status !== 'paid' && session.status !== 'complete') {
            res.statusCode = 402;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Payment is not complete yet' }));
            return;
          }
          const details = session.customer_details || {};
          const customerObj =
            session.customer && typeof session.customer === 'object'
              ? session.customer
              : {};
          const taxId =
            details.tax_ids?.find((t: { value?: string }) => t.value)?.value ||
            details.tax_ids?.[0]?.value ||
            null;
          const addressParts = [
            details.address?.line1,
            details.address?.city,
            details.address?.state,
            details.address?.postal_code,
          ].filter(Boolean);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-store');
          res.end(
            JSON.stringify({
              sessionId: session.id,
              email: details.email || customerObj.email || session.customer_email || '',
              name: details.name || customerObj.name || '',
              phone: details.phone || customerObj.phone || '',
              business: customerObj.metadata?.business || details.name || '',
              abn: taxId,
              address: addressParts.join(', '),
              tier: session.metadata?.tier || null,
              amountAud:
                typeof session.amount_total === 'number'
                  ? Math.round(session.amount_total / 100)
                  : null,
            }),
          );
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              error: err instanceof Error ? err.message : 'Server error',
            }),
          );
        }
      });
    },
  };
}

/** Local-only: Quote Capture submit + Concierge without `vercel dev`. */
function quoteCaptureDevApi(): Plugin {
  return {
    name: 'quote-capture-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = (req.url || '').split('?')[0]
        const isSubmit = url === '/api/quote-capture/submit'
        const isConcierge = url === '/api/quote-capture/concierge'
        const isFeedback = url === '/api/feedback-review/submit'
        if (!isSubmit && !isConcierge && !isFeedback) return next()

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({error: 'Method not allowed'}))
          return
        }

        try {
          const env = loadEnvLocal()
          for (const [k, v] of Object.entries(env)) {
            if (!process.env[k]) process.env[k] = v
          }

          const chunks: Buffer[] = []
          await new Promise<void>((resolve, reject) => {
            req.on('data', (c) => chunks.push(Buffer.from(c)))
            req.on('end', () => resolve())
            req.on('error', reject)
          })
          const raw = Buffer.concat(chunks).toString('utf8')
          const body = raw ? JSON.parse(raw) : {}

          if (isFeedback) {
            const mod = await server.ssrLoadModule('/api/_lib/feedbackReviewSubmit.ts')
            const result = await mod.processFeedbackReviewSubmit(body)
            if (!result.ok) {
              res.statusCode = result.status || 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({error: result.error}))
              return
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Cache-Control', 'no-store')
            res.end(JSON.stringify(result))
            return
          }

          if (isConcierge) {
            const mod = await server.ssrLoadModule('/api/_lib/quoteCaptureConcierge.ts')
            const result = await mod.processQuoteCaptureConcierge(body)
            if (!result.ok) {
              res.statusCode = result.status || 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({error: result.error}))
              return
            }
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Cache-Control', 'no-store')
            res.end(JSON.stringify({reply: result.reply, suggestions: result.suggestions || []}))
            return
          }

          const mod = await server.ssrLoadModule('/api/_lib/quoteCaptureSubmit.ts')
          const base =
            process.env.PUBLIC_BASE_URL?.trim() || 'http://localhost:3333'
          const result = await mod.processQuoteCaptureSubmit(body, base)

          if (!result.ok) {
            res.statusCode = result.status || 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({error: result.error}))
            return
          }

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.end(JSON.stringify(result))
        } catch (err) {
          console.error('[quote-capture-dev-api]', err)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: err instanceof Error ? err.message : 'Server error',
            }),
          )
        }
      })
    },
  }
}

export default defineConfig(({ isSsrBuild }) => ({
  server: {
    port: 3333,
    strictPort: false,
  },
  plugins: [
    react(),
    websiteSessionDevApi(),
    quoteCaptureDevApi(),
    visualizer({
      open: !process.env.CI && !process.env.VERCEL,
      filename: 'bundle-stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, '.'),
    },
  },
  build: {
    cssCodeSplit: true,
    // SSR build (`vite build --ssr src/entry-server.tsx --outDir .build/ssr`)
    // just needs one importable Node module; skip the client vendor
    // chunking split for it.
    rollupOptions: isSsrBuild
      ? undefined
      : {
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
  ssr: {
    // Server bundle runs under plain Node (tsx); bundle app deps so the SSR
    // output is a single self-contained module tree under `.build/ssr`.
    noExternal: true,
  },
}));
