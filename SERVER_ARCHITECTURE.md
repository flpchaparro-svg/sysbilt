# SYSBILT server architecture

**Last verified:** 9 July 2026

**UNVERIFIED at verification time (confirm manually):** Mac Mini SSH (`felipes-mac-mini-1.tail1e2dea.ts.net`), `pm2 ls`, `docker ps`, Cloudflare Tunnel ingress file on the Mac Mini, n8n local port and process manager, live `active` flags on n8n workflows, Tailscale IP for the Mac Mini, n8n/Postiz public endpoints (both returned HTTP 530 via Cloudflare during this check), n8n database engine and backup jobs, Cloudflare DNS/tunnel details beyond public DNS resolution.

---

## 1. Overview — what runs where

| Layer | Components | Role |
|-------|------------|------|
| **Mac Mini** (always-on home server) | n8n, Postiz, Cloudflare Tunnel (`cloudflared`) | Self-hosted automation and social scheduling; exposed on `*.sysbilt.com` subdomains via tunnel |
| **Vercel** | React/Vite site, Edge middleware, `/api/*` serverless routes | Public marketing site, Sybil chat, proposals/agreements, audit report ingest/view, sitemap |
| **Third-party SaaS** | Sanity, HubSpot, Notion, Google (Gemini, Sheets, Gmail, News RSS), DeepSeek, Postiz OAuth targets (LinkedIn, Facebook), Upstash Redis, Cloudflare (DNS/proxy for tunnel hostnames) | CMS, CRM, documents, AI, spreadsheets, email, rate limiting, KV storage |

The Git repo (`flpchaparro-svg/sysbilt`) is the single source of truth for the **website** and **deploy scripts** for n8n/Postiz. Automation state (workflow IDs, sheet IDs) lives partly in gitignored `scripts/automations/n8n/.deploy-state.env` on developer machines.

**Mac Mini identity (from repo scripts):**

- SSH host: `felipes-mac-mini-1.tail1e2dea.ts.net`
- SSH user: `sysbilt`
- Postiz install path: `~/services/postiz` (from `scripts/automations/postiz/bootstrap-mac-mini.sh`)
- Postiz secrets file: `~/.config/sysbilt/postiz-secrets.env`

No `docker-compose` or `Dockerfile` for n8n/Postiz lives in this repo; Postiz bootstraps from upstream `gitroomhq/postiz-docker-compose`.

---

## 2. Hosting and deploy

### 2.1 Front end (sysbilt.com)

| Item | Verified value |
|------|----------------|
| Stack | React 19, Vite 6, TypeScript, Tailwind CSS (`package.json`) |
| Vercel project | `sysbilt` (`prj_IF3c0EChyiF77H7WH675QhBmQRHa`) |
| Framework | `vite` |
| Node runtime | `24.x` (Vercel project settings) |
| Build command | `npm run build` → content manifest, Vite build, SEO stamp, verify (`package.json`) |
| Production regions | `iad1` (latest production deployment) |

**Production domains (Vercel MCP, 9 Jul 2026):**

- `sysbilt.com`
- `www.sysbilt.com`
- `felipechaparro.com`
- `www.felipechaparro.com`
- `revenue-engine-architect.vercel.app`
- `sysbilt-felipe-s-projects-e6331a74.vercel.app`
- `sysbilt-git-main-felipe-s-projects-e6331a74.vercel.app`

**Deploy flow:** Push to `main` on GitHub (`flpchaparro-svg/sysbilt`) triggers a Vercel production deployment (`githubDeployment: 1` on latest deployment). No separate deploy step is documented in-repo for the site beyond git push.

**Routing (`vercel.json`):**

- SPA fallback to `/index.html` for most paths
- `/sitemap.xml` → `/api/sitemap`
- Security headers on all routes (`X-Content-Type-Options`, `X-Frame-Options`, etc.)

**Edge middleware (`middleware.ts`):** Adds `X-Robots-Tag: noindex, follow` on URLs that are not valid SPA routes (soft 404s), using build-time content manifest slug sets.

### 2.2 DNS (public resolution, 9 Jul 2026)

| Hostname | Resolution |
|----------|------------|
| `sysbilt.com` | `76.76.21.21` (Vercel) |
| `www.sysbilt.com` | CNAME → `005e26b40d8e1297.vercel-dns-017.com` |
| `n8n.sysbilt.com` | Cloudflare anycast (`104.21.33.174`, `172.67.147.169`) |
| `postiz.sysbilt.com` | Cloudflare anycast (same IPs) |

Tunnel hostname → origin mapping for **Postiz** is documented in-repo: `postiz.sysbilt.com` → `http://localhost:5000`.

**n8n tunnel mapping:** `n8n.sysbilt.com` is the public n8n URL used throughout automation scripts (`N8N_BASE_URL` default). The local origin port for n8n is **UNVERIFIED, confirm manually** on the Mac Mini (`~/.cloudflared/config.yml`); n8n’s default is port `5678`.

### 2.3 Repository layout (automation vs site)

```
scripts/
  site/           → Vercel build pipeline
  automations/    → n8n, Postiz, MCP helpers (manual / Mac Mini)
  content/        → one-off Sanity seeding
api/              → Vercel serverless routes
src/              → Vite app
studio/           → Sanity Studio (project wdlc9pg8)
```

---

## 3. Self-hosted services

### 3.1 n8n — `https://n8n.sysbilt.com`

| Item | Detail |
|------|--------|
| Public URL | `https://n8n.sysbilt.com` (default in all `scripts/automations/n8n/*`) |
| API auth | `N8N_API_KEY` or `cursor-mcp` from `.env.local` → header `X-N8N-API-KEY` |
| Exposure | Cloudflare Tunnel (hostname on Cloudflare; origin on Mac Mini **UNVERIFIED**) |
| Process manager | **UNVERIFIED, confirm manually** (`pm2` vs Docker `n8n` container) |
| Deploy | Workflow changes via Node deploy scripts in `scripts/automations/n8n/`; not part of Vercel build |

At verification time, `https://n8n.sysbilt.com` returned **HTTP 530** (Cloudflare origin error). Treat tunnel or origin as potentially down until re-checked on the Mac Mini.

### 3.2 Postiz — `https://postiz.sysbilt.com`

| Item | Detail |
|------|--------|
| Public URL | `https://postiz.sysbilt.com` |
| Local port | `5000` (`docker-compose.override.yml` generated by bootstrap) |
| Stack | Docker Compose from `gitroomhq/postiz-docker-compose` + override |
| Exposure | Cloudflare Tunnel: `postiz.sysbilt.com` → `http://localhost:5000` (`patch-cloudflared.sh`, `bootstrap-mac-mini.sh`) |
| Keep-alive | `docker compose up -d`; bootstrap script health-checks `localhost:5000` |
| Secrets | `~/.config/sysbilt/postiz-secrets.env` (`LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET`, `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`, `POSTIZ_API_KEY`, etc.) |
| Postiz env | `JWT_SECRET`, `POSTGRES_PASSWORD` in `~/services/postiz/.env` (bootstrap) |

Postiz containers typically include: `postiz`, `postiz-postgres`, `postiz-redis`, `temporal` (per bootstrap override). **Exact running container list: UNVERIFIED, confirm manually** (`docker ps` on Mac Mini).

At verification time, `https://postiz.sysbilt.com` returned **HTTP 530**.

### 3.3 Cloudflare Tunnel hostname → port (confirmed + gaps)

| Hostname | Local service | Source |
|----------|---------------|--------|
| `postiz.sysbilt.com` | `http://localhost:5000` | `scripts/automations/postiz/bootstrap-mac-mini.sh`, `patch-cloudflared.sh` |
| `n8n.sysbilt.com` | **UNVERIFIED** (expected `http://localhost:5678` or similar) | Scripts assume public URL only; tunnel config not in repo |

Tunnel config paths searched by bootstrap/patch scripts:

- `~/.cloudflared/config.yml`
- `~/.cloudflared/config.yaml`
- `~/Library/Application Support/cloudflared/config.yml`
- `/etc/cloudflared/config.yml`

After ingress changes, scripts note: restart `cloudflared` (e.g. `brew services restart cloudflared` or `launchctl kickstart`).

---

## 4. Process and container management

| Component | Manager | Restart / boot | Verified? |
|-----------|---------|----------------|-----------|
| Postiz stack | Docker Compose | `docker compose up -d` in `~/services/postiz` | Script only; live state **UNVERIFIED** |
| n8n | **UNVERIFIED** | **UNVERIFIED** | Not documented in repo |
| `cloudflared` | **UNVERIFIED** (likely `brew services` or launchd on Mac Mini) | Manual restart noted in `patch-cloudflared.sh` | Partial |
| Vercel site/API | Vercel platform | Auto on `main` push | Yes (Vercel MCP) |

**PM2:** Referenced in user requirements but **not found in this repo**. `pm2 ls` on the Mac Mini was **not reachable** during verification (SSH timeout). **UNVERIFIED, confirm manually** whether any SYSBILT services use PM2.

**No `Dockerfile` or root `docker-compose` in this repo** for the website.

---

## 5. Networking

### 5.1 Cloudflare Tunnel

Public HTTPS for `n8n.sysbilt.com` and `postiz.sysbilt.com` terminates at Cloudflare and forwards to services on the Mac Mini via `cloudflared`. DNS for those hostnames resolves to Cloudflare anycast addresses (not Vercel).

### 5.2 Tailscale

| Item | Detail |
|------|--------|
| Mac Mini hostname | `felipes-mac-mini-1.tail1e2dea.ts.net` (`deploy-via-ssh.sh`) |
| SSH | `sysbilt@felipes-mac-mini-1.tail1e2dea.ts.net` |
| Tailscale IP | **UNVERIFIED, confirm manually** (`tailscale status` on Mac Mini) |

### 5.3 Public vs Tailscale access rule

- **External services** (e.g. Claude web MCP, Vercel `api/reports/ingest`, HubSpot webhooks, Postiz API from n8n in cloud) must use **public hostnames**: `https://n8n.sysbilt.com`, `https://postiz.sysbilt.com`, `https://sysbilt.com`.
- **Tailscale / LAN URLs** (`http://<tailscale-ip>:5678`, `http://localhost:5000`) work only on devices on the tailnet or the Mac Mini itself. They are for admin and deploy scripts (`deploy-via-ssh.sh`, smoke tests), not for SaaS callbacks.

---

## 6. Data stores and integrations

### 6.1 Sanity CMS

| Item | Value |
|------|-------|
| Project ID | `wdlc9pg8` (`studio/sanity.config.ts`, `src/sanityClient.ts`, `api/sitemap.ts`) |
| Dataset | `production` |
| Studio | `studio/` (separate Sanity Studio app) |
| Site read | Public CDN + API queries from Vite app and `api/sitemap.ts` |
| Write tokens | `SANITY_API_TOKEN` / `SANITY_API_WRITE_TOKEN` / `SANITY_AUTH_TOKEN` in `.env.local` (content scripts) |

### 6.2 HubSpot

| Item | Value |
|------|-------|
| Portal ID | `442914926` (`src/hooks/useContactForm.ts`, `GuideGateForm.tsx`, `NewsletterForm.tsx`, deploy scripts) |
| Browser forms | Direct POST to HubSpot Forms API (no `api/` proxy) — form IDs in `REPO_MAP.md` |
| Vercel API | `HUBSPOT_PRIVATE_APP_TOKEN` → `api/_lib/hubspot.ts` (proposals, agreements) |
| n8n | Credential name **`SYSBILT n8n Production`** (`hubspotAppToken`, ID `64xkc10iud9ZbzkZ` in deploy scripts) |
| HubSpot MCP | `PRIVATE_APP_ACCESS_TOKEN` from `HUBSPOT_PRIVATE_APP_TOKEN` via `scripts/automations/mcp/hubspot.sh` |

### 6.3 Upstash / Redis (Vercel)

| Store | Env vars | Used by |
|-------|----------|---------|
| Vercel KV / Upstash | `KV_REST_API_URL`, `KV_REST_API_TOKEN` | `api/_lib/reportsStore.ts` (audit reports) |
| Sybil rate limit | `SYBIL_KV_REST_API_URL`, `SYBIL_KV_REST_API_TOKEN` | `api/chat.ts` (optional; fails open if unset) |

Postiz uses **internal** Redis (`redis://postiz-redis:6379`) inside its Docker stack — separate from Vercel KV.

### 6.4 n8n data store

**UNVERIFIED, confirm manually.** n8n is self-hosted on the Mac Mini; typical setups use SQLite or PostgreSQL in Docker. No `N8N_ENCRYPTION_KEY` or DB connection string appears in this repo. Check Mac Mini env (e.g. `self-hosted-ai-starter-kit` or Docker compose) on site.

### 6.5 Other integrations (by name / env only)

| Integration | Credential / env name | Where |
|-------------|----------------------|--------|
| Google Gemini | `GEMINI_API_KEY` | `api/chat.ts` |
| DeepSeek (via OpenAI-compatible node) | n8n credential **`SYSBILT DeepSeek`** | Outbound audit, NEWS patches |
| Google Sheets | n8n credential **`Google Sheets account`** | Outbound sheet, Sybil chat logger, DM log |
| Gmail | n8n credential **`Gmail account`** | Inbound/outbound email drafts |
| Postiz API | n8n credential **`Postiz API`**; env `POSTIZ_API_KEY` | Social distribute, LI→IG mirror |
| Slack | n8n credential **`SYSBILT Slack`**; env `SLACK_BOT_TOKEN` | DM lead intake |
| Notion | `NOTION_TOKEN` | `api/_lib/notion.ts` |
| SerpAPI | **Inline key copied from inbound workflow** (see security notes in `N8N_MASTER.md`) | Outbound list builder |
| Jina Reader | Public `https://r.jina.ai/...` URLs (no named credential in deploy scripts) | Outbound scrape |
| Audit ingest webhook | `N8N_WEBHOOK_SECRET` | `api/reports/ingest.ts` |
| Proposal/agreement tokens | `PROPOSAL_SIGNING_SECRET` | `api/_lib/auth.ts` |
| Audit viewer tokens | `AUDIT_REPORT_SIGNING_SECRET` | `api/_lib/auth.ts` |
| Admin sign routes | `ADMIN_PASSCODE` | `api/proposal/sign.ts`, `api/agreement/sign.ts` |

---

## 7. Vercel API routes (serverless)

| Route | Purpose | Key env vars |
|-------|---------|--------------|
| `api/chat.ts` | Sybil (Gemini) + Sanity catalogue | `GEMINI_API_KEY`, `SYBIL_KV_*`, optional `SYBIL_TRANSCRIPT_WEBHOOK_URL` |
| `api/sitemap.ts` | Dynamic sitemap XML | Sanity `wdlc9pg8` / `production` (embedded) |
| `api/reports/ingest.ts` | n8n → store audit JSON | `N8N_WEBHOOK_SECRET`, `KV_REST_*`, `AUDIT_REPORT_SIGNING_SECRET`, `PUBLIC_BASE_URL` |
| `api/reports/get.ts` | Signed audit viewer | `AUDIT_REPORT_SIGNING_SECRET`, `KV_REST_*` |
| `api/proposal/*`, `api/agreement/*` | Client document flows | `HUBSPOT_PRIVATE_APP_TOKEN`, `NOTION_TOKEN`, `PROPOSAL_SIGNING_SECRET`, stage env vars |

Full matrix: `REPO_MAP.md`.

---

## 8. Cursor MCP servers (names only)

**Enabled in this Cursor workspace (project MCP):**

- GoogleSearchConsole
- GoogleAnalytics
- DataForSEO
- Postiz
- Sanity
- GitHub
- Vercel
- Cloudflare
- HubSpot
- Figma

**Note:** There is **no n8n MCP** in the enabled server list for this workspace. n8n is operated via public API (`N8N_API_KEY` / `cursor-mcp`) and deploy scripts.

Repo-local `.cursor/mcp.json` is **gitignored**; if present locally it may duplicate some of the above. **Do not commit MCP config with embedded tokens.**

---

## 9. Backups, monitoring, and recovery

| Area | What exists | Gaps |
|------|-------------|------|
| **Postiz** | Bootstrap writes `JWT_SECRET` / `POSTGRES_PASSWORD` to `~/services/postiz/.env`; script reminds operator to back up that file | No automated backup job in repo; Postgres volume backup **UNVERIFIED** |
| **n8n** | **UNVERIFIED** | No backup/restore procedure in repo |
| **Sanity** | Hosted CMS (Sanity cloud) | Export/versioning via Sanity tooling, not documented here |
| **Vercel KV** | Audit reports in KV | No export/backup script in repo |
| **Git** | `main` branch history | Automation state in `.deploy-state.env` is **not** in git |
| **Monitoring** | None documented for Mac Mini services | No uptime checks, alerting, or tunnel health monitoring in repo |
| **Recovery** | Redeploy site via Vercel; redeploy workflows via `scripts/automations/n8n/*.sh` | Mac Mini disaster recovery **UNVERIFIED** |

---

## 10. Security notes (locations only — no secret values)

| Issue | Location | Action |
|-------|----------|--------|
| Hardcoded GitHub PAT | `.cursor/mcp.json` (gitignored) | Rotate token; use env-based auth |
| Hardcoded HubSpot private app token | `.cursor/mcp.json` (gitignored) | Rotate; use `hubspot.sh` pattern |
| Secrets in `.env.local` | Gitignored | Never commit |
| Postiz/Mac secrets | `~/.config/sysbilt/postiz-secrets.env` on Mac Mini | Filesystem permissions `600` |

See `N8N_MASTER.md` for workflow-level security (webhooks, inline SerpAPI key, protected workflows).
