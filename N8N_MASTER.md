# SYSBILT n8n master reference

**Last verified:** 9 July 2026

**UNVERIFIED at verification time (confirm manually):** Live workflow list and `active` flags from n8n API/MCP (public `https://n8n.sysbilt.com` returned HTTP 530; n8n MCP not connected in this workspace; Mac Mini SSH timed out). Workflow table below is compiled from `scripts/automations/n8n/add-workflow-guide-stickies.mjs`, deploy scripts, and `scripts/automations/n8n/.deploy-state.env`. **Re-run** `GET /api/v1/workflows` or open the n8n UI to confirm active state and discover any workflows not listed here.

---

## 1. Access

| Endpoint | Use when |
|----------|----------|
| **https://n8n.sysbilt.com** | Production, API (`N8N_API_KEY` / `cursor-mcp`), webhooks, Claude web MCP, any external caller |
| **Tailscale / LAN** (e.g. `http://felipes-mac-mini-1.tail1e2dea.ts.net:5678` or Tailscale IP) | Admin on tailnet only — **local port UNVERIFIED in repo** |
| **API base** | `N8N_BASE_URL` default `https://n8n.sysbilt.com` |
| **API header** | `X-N8N-API-KEY: <N8N_API_KEY or cursor-mcp>` |

### Rule: Claude web / external MCP

Anthropic’s servers **cannot** reach Tailscale. Any n8n MCP or HTTP integration from Claude web must target **`https://n8n.sysbilt.com`**, not a `100.x` or `localhost` URL.

Deploy and guide scripts load the API key from `.env.local` (`cursor-mcp=` or `N8N_API_KEY=`). Mac Mini may also store keys under `~/.config/sysbilt/` — **UNVERIFIED, confirm manually**.

---

## 2. Workflow inventory

**Legend — Active column:**

- **Active†** / **Inactive†** = documented expectation in repo sticky guides or deploy scripts, **not live-verified** on 9 Jul 2026.
- **UNVERIFIED** = no reliable active/trigger info in repo.

| ID | Name (expected) | Active† | Trigger | Purpose |
|----|-----------------|---------|---------|---------|
| `TvkvfhrMWWHAEQFd` | SYSBILT - Contact Form Research and Acknowledgement (inbound audit) | Active† | Schedule (~5 min) | HubSpot contact-form leads → research → audit → Vercel report → email/Gmail draft |
| `hB7YMEOcD7TLu3NZ` | SYSBILT - NEWS | UNVERIFIED | Schedule | Google News RSS → tag/rewrite → Sanity drafts → approval → publish → newsletter → Social Distribute |
| `JU7VFyEcCHKU0ckl` | SYSBILT - Social Distribute | UNVERIFIED | Execute Workflow | Sanity news → captions → Postiz schedule (LinkedIn/Facebook) |
| `36hxhyRRWoRgIMgz` | SYSBILT - Social Test (webhook) | UNVERIFIED | Webhook `sysbilt-social-test` | Manual test: pull Sanity news → call Social Distribute |
| `2mtOhfqD5DRiXR7T` | SYSBILT - LinkedIn → Instagram Mirror | UNVERIFIED | Schedule (15 min) + Webhook `sysbilt-li-ig-mirror` | Mirror Felipe LinkedIn Postiz posts to Instagram |
| `Lph4ik3Y6VMhuYHV` | Newsletter Welcome | UNVERIFIED | Schedule | New HubSpot newsletter subscribers → welcome email (patched for guide/DM sources) |
| `5i6sz7pSUvVFiNql` | Deal Stage Automations | Active† | Schedule | HubSpot deal stages → stage-appropriate Gmail |
| `20NfO5zmf4sHTUJJ` | Sybil Chat Logger | UNVERIFIED | Webhook | Sybil chat events → Google Sheet |
| `QV7KWPAjqFWme0Cu` | SYSBILT - Outbound List Builder (A) | Inactive† (deploy default) | Manual (+ test webhook `sysbilt-outbound-list-test`) | SerpAPI Maps → sheet rows → Jina email scrape |
| `0S0aaGP5VVHg3aZU` | SYSBILT - Outbound Contact Scrape (A2) | Inactive† | Manual | Backfill emails for existing sheet rows |
| `zOZh6wE70PikOCqI` | SYSBILT - Outbound Audit Runner (B) | Inactive† (deploy default) | Schedule (~5 min) when active | Sheet `Status=Audit` → clone of inbound audit → Vercel report → `Audited` |
| `WD3s1eD9aUQNUWY6` | SYSBILT - Outbound HubSpot Engage (C) | Inactive† (deploy default) | Schedule (~5 min) when active | Sheet `Status=Engage` → HubSpot upsert → sheet notes |
| `fag1E0JKa8JSIUhp` | SYSBILT - Outbound Speed Fix Scorer | Active† | Schedule (~5 min) + Manual | Sheet1 empty `LH Mobile` → PageSpeed mobile → write score; if &lt; 65 append **Speed Fix** tab (`Status=Ready`) |
| `qDydgiC09UoV4MRO` | SYSBILT - Outbound Speed Fix Send | Active† | Schedule (~5 min) + Manual | Speed Fix `Status=Ready` → Gmail **draft** Email A + `/go/speed-fix?b=&s=` → `Emailed` (does not send) |
| `5QwCiKvZz4A9T4eF` | SYSBILT - Outbound Speed Fix Tab Setup | Inactive† | Webhook | Create **Speed Fix** tab + `LH Mobile` header on Sheet1 (`--setup-tab`) |
| `WP2tZjhH27vJbOaV` | SYSBILT - Outbound Sheet Setup | UNVERIFIED | Webhook | Create outbound Google Sheet with headers (deploy `--setup-sheet`) |
| `5h6SvE2hScz6KHh3` | SYSBILT - Outbound Sheet Headers | UNVERIFIED | Webhook | Repair headers after Google Tables conflicts (`--fix-sheet`) |
| *(UNVERIFIED ID)* | SYSBILT - DM Lead Intake | UNVERIFIED | Webhook `sysbilt-dm-lead-intake` | ManyChat/DM leads → HubSpot → Slack → optional sheet log |
| `5sdNZZhTABB2VSg0` | DEPRECATED — old inbound audit | Inactive† | — | Replaced by `TvkvfhrMWWHAEQFd`; safe to archive |
| `sysbilt-routing-1` | Lead Routing | Inactive† | HubSpot trigger (when enabled) | Persona-based auto-email on new contacts |
| `otV9aaxSJ5ARJzSc` | Manual Audit (stub) | UNVERIFIED | Manual | Placeholder one-off audits |
| `hAXxg6L0ibpt9QVW` | T1 Comms Sequence (stub) | Inactive† | Schedule | Early comms scaffold; not wired to production paths |

**Deploy-state IDs confirmed locally (gitignored file):** `SOCIAL_DISTRIBUTE_WORKFLOW_ID=JU7VFyEcCHKU0ckl`, `LI_IG_MIRROR_WORKFLOW_ID=2mtOhfqD5DRiXR7T`, `POSTIZ_CREDENTIAL_ID=9UIR0xUww7EWF8mH`.

**To refresh live:** `node -e` with `GET https://n8n.sysbilt.com/api/v1/workflows?limit=250` and `X-N8N-API-KEY`, or use n8n UI → Workflows.

---

## 3. Read-only and protected workflows

### 3.1 Never modify — clone only

| ID | Name | Rule |
|----|------|------|
| **`TvkvfhrMWWHAEQFd`** | Inbound Contact Form Research and Acknowledgement | **Do not edit in place.** Outbound audit runner (`deploy-outbound-audit-runner.mjs`) **clones** this workflow (`INBOUND_AUDIT_WORKFLOW_ID`). Changes here affect all future clones. To experiment, duplicate in n8n UI. |

Sticky guide on this workflow explicitly warns: outbound deploy re-clones from this source.

### 3.2 Treat as protected (operational caution)

| ID | Reason |
|----|--------|
| `hB7YMEOcD7TLu3NZ` (NEWS) | Production content pipeline; patched by `patch-news-workflow.mjs` and `deploy-social-pipeline.mjs` |
| `JU7VFyEcCHKU0ckl` (Social Distribute) | Called by NEWS and webhooks; redeploy via `deploy-social-pipeline.sh` |
| `5sdNZZhTABB2VSg0` | Deprecated — archive only after confirming nothing references it |

### 3.3 Deploy script ownership

Prefer changing workflows via idempotent deploy scripts under `scripts/automations/n8n/` rather than hand-editing nodes in the UI, so repo and instance stay aligned.

---

## 4. Credentials (names only — never values)

Workflows should use **named n8n credentials**, not generic HTTP nodes with inline secrets. Deploy scripts create or reference these by name:

| Credential name | Type (n8n) | Used for |
|-----------------|------------|----------|
| **SYSBILT n8n Production** | `hubspotAppToken` | HubSpot CRM in inbound, outbound C, DM intake, deals |
| **Google Sheets account** | `googleSheetsOAuth2Api` | Outbound sheet, Sybil logger, DM sheet log |
| **Gmail account** | `gmailOAuth2` | Draft/send email nodes |
| **SYSBILT DeepSeek** | `openAiApi` (OpenAI-compatible) | Audit chain, NEWS rewrite/select patches |
| **Gemini News Free** | `openAiApi` or Gemini | Referenced in list-builder deploy (legacy; outbound audit uses DeepSeek) |
| **Postiz API** | `httpHeaderAuth` | Social Distribute, LI→IG mirror (`Authorization` header) |
| **SYSBILT Slack** | `slackApi` | DM lead intake (created at deploy if `SLACK_BOT_TOKEN` set) |

**Env vars that feed credentials (not stored in repo):**

- `cursor-mcp` / `N8N_API_KEY` — n8n API
- `POSTIZ_API_KEY` — Postiz credential creation
- `SLACK_BOT_TOKEN` — Slack credential creation
- `SYSBILT_DM_WEBHOOK_SECRET` — optional webhook auth on DM intake
- `HUBSPOT_PRIVATE_APP_TOKEN` — separate from n8n; used on Vercel and HubSpot MCP script

**Inbound-only credentials (UNVERIFIED names):** Inbound audit likely uses HubSpot, Gmail, DeepSeek, and possibly SerpAPI/HTTP nodes not enumerated in outbound deploy scripts. Inspect workflow `TvkvfhrMWWHAEQFd` in n8n UI.

---

## 5. Naming conventions

| Pattern | Meaning | Verified in repo? |
|---------|---------|-------------------|
| **`SYSBILT - …`** prefix | SYSBILT-owned production workflows (NEWS, Social Distribute, Outbound *, DM Lead Intake, LI→IG Mirror) | Yes — deploy scripts set these names |
| **Outbound A / B / C** | List Builder → Audit Runner → HubSpot Engage sheet pipeline | Yes — sticky guides |
| **`PI_` prefix** | Passive-income / non-SYSBILT separation | **Not found** in this repo — **UNVERIFIED** whether any `PI_` workflows exist in the live instance |
| **`sysbilt-` webhook paths** | e.g. `sysbilt-social-test`, `sysbilt-dm-lead-intake`, `sysbilt-li-ig-mirror` | Yes |

Keep new SYSBILT workflows under the `SYSBILT -` prefix and separate experimental ventures with a distinct prefix (e.g. `PI_`) if added later.

---

## 6. Outbound engine (A → Speed Fix / B → C)

Google Sheet is the **source of truth** between workflows. Sheet1 columns **A1:O5000** (row 1 headers; **LH Mobile** in column O). Status values include: `New`, `Audit`, `Auditing`, `Audited`, `Engage`, `Emailed`, `Replied`, `Dead`. **Speed Fix** tab columns: Business Name, Suburb, Website, Email, Phone, LH Mobile, Status (`Ready` / `Emailed` / `Replied` / `Dead`), Maps ID, Notes. Gate: **LH Mobile &lt; 65**.

```
┌─────────────────────────┐
│ A: Outbound List Builder │  SerpAPI Maps + Jina scrape → append rows (Status=New)
└───────────┬─────────────┘
            │ optional
┌───────────▼─────────────┐
│ A2: Contact Scrape       │  Backfill Email for existing rows
└───────────┬─────────────┘
            │ schedule: empty LH Mobile
┌───────────▼─────────────┐
│ Speed Fix Scorer         │  PageSpeed mobile → Sheet1!LH Mobile;
│                          │  if score < 65 → Speed Fix tab (Ready)
└───────────┬─────────────┘
            │ schedule: Status=Ready + Email
┌───────────▼─────────────┐
│ Speed Fix Send           │  Gmail draft Email A + /go?b=&s= → Emailed
│                          │  (you Send from Drafts — not auto-send)
└───────────┬─────────────┘
            │ you send Email A + /go/speed-fix from Speed Fix tab
            │
            │ manual: set Status=Audit (full report — later / different draft)
┌───────────▼─────────────┐
│ B: Outbound Audit Runner │  Clone of TvkvfhrMWWHAEQFd chain; DeepSeek;
│                          │  POST api/reports/ingest (N8N_WEBHOOK_SECRET) → Audit Link
└───────────┬─────────────┘
            │ human review; set Status=Engage
┌───────────▼─────────────┐
│ C: Outbound HubSpot      │  Upsert contact (SYSBILT n8n Production);
│    Engage                │  stamp Notes with hubspot:<id>; notify via Gmail
└─────────────────────────┘
```

| Workflow | ID | Deploy script |
|----------|-----|---------------|
| A — List Builder | `QV7KWPAjqFWme0Cu` | `deploy-outbound-list-builder.sh` |
| A2 — Contact Scrape | `0S0aaGP5VVHg3aZU` | same script (secondary workflow) |
| Sheet setup | `WP2tZjhH27vJbOaV` | `--setup-sheet` |
| Sheet headers repair | `5h6SvE2hScz6KHh3` | `--fix-sheet` |
| Speed Fix Scorer | `fag1E0JKa8JSIUhp` | `deploy-outbound-speed-fix-scorer.sh` |
| Speed Fix Send | `qDydgiC09UoV4MRO` | `deploy-outbound-speed-fix-send.sh` |
| Speed Fix tab setup | `5QwCiKvZz4A9T4eF` | `--setup-tab` |
| B — Audit Runner | `zOZh6wE70PikOCqI` | `deploy-outbound-audit-runner.sh` |
| C — HubSpot Engage | `WD3s1eD9aUQNUWY6` | `deploy-outbound-hubspot-engage.sh` |

**Sheet ID:** `OUTBOUND_LEADS_SHEET_ID` in gitignored `.deploy-state.env`. Live sheet: `1aGz6kruGwSpt55rwlcknxVDXp9dgL_M-OnVJrDIbTlE` (Sheet1 + **Speed Fix**).

**Audit ingest (Vercel):** Workflow B posts to `https://sysbilt.com/api/reports/ingest` with header `x-n8n-webhook-secret` or `Authorization: Bearer <N8N_WEBHOOK_SECRET>` (see `api/_lib/auth.ts`).

**Inbound clone source:** `TvkvfhrMWWHAEQFd` — read-only; see §3.

---

## 7. Content and social pipelines (non-outbound)

| Flow | Workflows | Notes |
|------|-----------|-------|
| NEWS | `hB7YMEOcD7TLu3NZ` | Patch: `patch-news-workflow.mjs` |
| Social publish | `JU7VFyEcCHKU0ckl` | Deploy: `deploy-social-pipeline.sh`; needs `POSTIZ_API_KEY` |
| Social test | `36hxhyRRWoRgIMgz` | `POST …/webhook/sysbilt-social-test` |
| LI → IG mirror | `2mtOhfqD5DRiXR7T` | `deploy-linkedin-ig-mirror.sh` |
| Newsletter welcome | `Lph4ik3Y6VMhuYHV` | Patched by `deploy-dm-lead-intake.mjs` |
| Sybil transcripts | `20NfO5zmf4sHTUJJ` | Webhook from chat (optional `SYBIL_TRANSCRIPT_WEBHOOK_URL` on Vercel is separate) |

---

## 8. Deploy and operations

### 8.1 Common commands (from repo root)

```bash
# Social / NEWS
./scripts/automations/n8n/deploy-social-pipeline.sh

# Outbound A → Speed Fix scorer → B → C
./scripts/automations/n8n/deploy-outbound-list-builder.sh
./scripts/automations/n8n/deploy-outbound-speed-fix-scorer.sh --setup-tab   # once
./scripts/automations/n8n/deploy-outbound-speed-fix-scorer.sh --activate
./scripts/automations/n8n/deploy-outbound-speed-fix-send.sh --activate
./scripts/automations/n8n/deploy-outbound-audit-runner.sh
./scripts/automations/n8n/deploy-outbound-hubspot-engage.sh

# DM intake + newsletter patch
./scripts/automations/n8n/deploy-dm-lead-intake.sh

# Sticky workflow guides in n8n UI
node scripts/automations/n8n/add-workflow-guide-stickies.mjs
```

Requires `N8N_API_KEY` or `cursor-mcp` in `.env.local`. Postiz deploys also need `POSTIZ_API_KEY` (local or from Mac Mini secrets via SSH).

### 8.2 Local state file

`scripts/automations/n8n/.deploy-state.env` — workflow IDs, sheet IDs, credential IDs. **Gitignored. Never commit.**

---

## 9. Security notes

### 9.1 Hardcoded or extracted secrets (rotate / refactor)

| Issue | Location | Recommendation |
|-------|----------|----------------|
| SerpAPI key **copied from inbound HTTP node** into outbound List Builder | `deploy-outbound-list-builder.mjs` (`extractSerpApiKeyFromInbound`, `api_key` query param on SerpAPI node) | Move to named SerpAPI credential; rotate key if ever committed or logged |
| GitHub PAT in MCP config | `.cursor/mcp.json` (gitignored) | Rotate; remove from file |
| HubSpot token in MCP config | `.cursor/mcp.json` (gitignored) | Rotate; use env via `hubspot.sh` |
| Postiz API key in credential body at create time | `deploy-social-pipeline.mjs`, `deploy-linkedin-ig-mirror.mjs` | Acceptable if only via deploy script + env; rotate `POSTIZ_API_KEY` if leaked |

### 9.2 Webhooks — auth posture

| Webhook path | Auth | Risk |
|--------------|------|------|
| Vercel `api/reports/ingest` | **`N8N_WEBHOOK_SECRET` required** | Low when secret set |
| `sysbilt-dm-lead-intake` | Optional **`SYSBILT_DM_WEBHOOK_SECRET`** (`X-SYSBILT-Webhook-Secret`) | Medium if secret unset and workflow active |
| `sysbilt-social-test` | **No auth documented** | Test-only; disable or protect if exposed |
| `sysbilt-li-ig-mirror` | **No auth documented** | Manual trigger; restrict exposure |
| NEWS approval webhook | **UNVERIFIED** | Confirm in workflow `hB7YMEOcD7TLu3NZ` |
| Outbound sheet setup/headers webhooks | Called from deploy scripts | Obscurity only; not for public use |

n8n production webhooks on `https://n8n.sysbilt.com/webhook/...` are **public URLs** when workflows are active. Use header secrets or n8n webhook auth where available.

### 9.3 Credentials to review

| Credential | Note |
|------------|------|
| **SYSBILT n8n Production** | HubSpot private app — rotate in HubSpot if token leaked |
| **Postiz API** | Org-level Postiz key on Mac Mini |
| **SYSBILT Slack** | Bot token via `SLACK_BOT_TOKEN` |
| **Google Sheets / Gmail** | OAuth — revoke if Mac Mini or n8n DB compromised |
| **`cursor-mcp` / `N8N_API_KEY`** | Full n8n API access — treat like root automation password |

### 9.4 Rule: no inline secrets in new workflows

New nodes must reference **existing named credentials** (pattern used in all `deploy-*.mjs` scripts). Do not add generic HTTP Request nodes with API keys in query/body parameters.

---

## 10. Related documentation

- `SERVER_ARCHITECTURE.md` — Mac Mini, Vercel, tunnel, DNS, KV, Sanity, HubSpot
- `scripts/README.md` — script index and git workflow for automation vs site
- `REPO_MAP.md` — Vercel API routes and env vars
