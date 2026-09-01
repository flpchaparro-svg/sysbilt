# Scripts

This folder is split by **what deploys with the site** vs **what you run locally**.

```
scripts/
  site/           → Vercel build pipeline (stamp-meta, prerender)
  automations/    → n8n, Postiz, MCP helpers (manual / Mac Mini)
  content/        → one-off content seeding tools
```

## Site scripts (`scripts/site/`)

Used by `npm run build` on Vercel. **Do not break these paths** without updating `package.json`.

| Script | Purpose |
|--------|---------|
| `stamp-meta.mjs` | Stamps per-route SEO meta into `dist/` after Vite build |
| `prerender.mjs` | Local prerender entry (skipped on Vercel) |
| `prerender-run.mjs` | Puppeteer prerender implementation |

```bash
npm run build   # runs stamp-meta automatically
node scripts/site/prerender.mjs   # optional local prerender
```

## Automation scripts (`scripts/automations/`)

**Not part of the Vercel deploy.** Run from repo root when you need them.

### n8n

Requires `N8N_API_KEY` (or `cursor-mcp=` in `.env.local`).

```bash
# Deploy social pipeline
./scripts/automations/n8n/deploy-social-pipeline.sh

# Comment replies to Slack (LinkedIn email + IG/FB webhook)
./scripts/automations/n8n/deploy-social-comment-replies.sh --activate

# Deploy outbound list builder
./scripts/automations/n8n/deploy-outbound-list-builder.sh

# Deploy outbound audit runner (Workflow B)
./scripts/automations/n8n/deploy-outbound-audit-runner.sh

# Deploy outbound HubSpot engage (Workflow C)
./scripts/automations/n8n/deploy-outbound-hubspot-engage.sh

# Add/update sticky-note guides on SYSBILT workflows
node scripts/automations/n8n/add-workflow-guide-stickies.mjs

# Verify a Sanity post after pipeline run
node scripts/automations/n8n/verify-sanity-post.mjs

# Patch NEWS workflow (Groq JSON, Cleanup Gate, DeepSeek tokens)
node scripts/automations/n8n/patch-news-workflow.mjs
```

Local deploy state (sheet IDs, credential IDs) is written to  
`scripts/automations/n8n/.deploy-state.env` — **gitignored, never commit**.

### Motion (Remotion on Mac Mini)

Kinetic-type LinkedIn video. Preview locally, render on the Mini loopback service.

```bash
cd scripts/automations/motion && npm install && npx remotion studio
./scripts/automations/n8n/deploy-motion-kinetic.sh --activate
./scripts/automations/n8n/deploy-motion-story-card.sh --activate
./scripts/automations/n8n/deploy-motion-toolkit-deck.sh --activate
./scripts/automations/n8n/deploy-motion-charts.sh --activate
```

See `scripts/automations/motion/README.md`.

### Postiz (Mac Mini)

```bash
./scripts/automations/postiz/deploy-via-ssh.sh
./scripts/automations/postiz/smoke-test-api.sh
```

### MCP

```bash
./scripts/automations/mcp/hubspot.sh
```

### Stripe Payment Links

See [`scripts/automations/stripe/README.md`](automations/stripe/README.md). Live hygiene and Hosted Website monthly start are run from the repo with `Stripe_Secret_key_live` in `.env.local`.

## Git workflow

**One repo, one `main`.** Use folders and commits to separate concerns — not long-lived branches.

| You're changing… | Commit only… |
|------------------|--------------|
| Website / Sanity / UI | `src/`, `studio/`, `api/`, `scripts/site/` |
| n8n workflows | `scripts/automations/n8n/` |
| Postiz infra | `scripts/automations/postiz/` |

**Short-lived feature branches** are fine (`feat/toolkit-cta`, `feat/n8n-outbound`). Merge to `main` when done.

### Example: two commits in one session

```bash
# 1) Site work
git add src/ studio/
git commit -m "Update toolkit end CTA styling."

# 2) Automation work
git add scripts/automations/n8n/
git commit -m "Add outbound list builder deploy script."
```

## Secrets

| File | Commit? |
|------|---------|
| `.env.local` | Never |
| `scripts/automations/n8n/.deploy-state.env` | Never |
| `~/.config/sysbilt/postiz-secrets.env` | Never (lives on Mac Mini) |
