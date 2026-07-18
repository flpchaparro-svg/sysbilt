#!/usr/bin/env node
/**
 * Add or update "Workflow Guide" sticky notes on SYSBILT n8n workflows.
 *
 * Usage:
 *   node scripts/automations/n8n/add-workflow-guide-stickies.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const GUIDE_NODE_NAME = 'Workflow Guide';

const WORKFLOW_GUIDES = {
  QV7KWPAjqFWme0Cu: {
    color: 4,
    width: 520,
    height: 420,
    content: `## Outbound List Builder (Workflow A)

**What it does**
SerpAPI Google Maps search → dedupe by Maps ID → append new rows to the outbound Google Sheet. Scrapes homepage/contact pages with Jina to find emails. Sets Status = New.

**How to run**
Manual trigger in n8n. Use deploy script \`deploy-outbound-list-builder.mjs\` for sheet setup.

**Related workflows**
→ **Outbound Contact Scrape** — backfill emails for rows already in the sheet
→ **Outbound Audit Runner** — set Status = Audit to generate a report
→ **Outbound HubSpot Engage (C)** — HubSpot push when you set Status = Engage
→ **Outbound Sheet Setup / Headers** — one-time sheet creation and header repair

**Outbound pipeline**
A (this) → sheet → B (audit) → you review → Engage → C (HubSpot)`,
  },
  '0S0aaGP5VVHg3aZU': {
    color: 4,
    width: 500,
    height: 360,
    content: `## Outbound Contact Scrape (Workflow A2)

**What it does**
Reads existing sheet rows and scrapes website/contact pages (Jina) to backfill missing Email values. Use when List Builder found a site but no email.

**How to run**
Manual trigger. Sheet is the source of truth — no HubSpot writes.

**Related workflows**
← **Outbound List Builder** — fills the sheet first
→ **Outbound Audit Runner** — needs Website (email can be placeholder until Engage)

**Note**
Add Jina wait nodes if you hit rate limits on large batches.`,
  },
  fag1E0JKa8JSIUhp: {
    color: 5,
    width: 520,
    height: 440,
    content: `## Outbound Speed Fix Scorer

**What it does**
Every 5 min (or Manual): picks one Master Leads row with Website + empty **LH Mobile**, runs PageSpeed mobile performance, writes the score to Master Leads. If score **&lt; 65**, appends the lead to the **Speed Fix** tab with Status = Ready.

**How to run**
1. List Builder fills Master Leads (Status = New)
2. Activate this workflow (or Execute once)
3. Work the **Speed Fix** tab for Email A + /go/speed-fix

**Related**
← **Outbound List Builder** — scrape
→ full audit still via Status = Audit on Master Leads (different draft later)
Deploy: \`deploy-outbound-speed-fix-scorer.sh\` (\`--setup-tab\` once)`,
  },
  zOZh6wE70PikOCqI: {
    color: 4,
    width: 540,
    height: 480,
    content: `## Outbound Audit Runner (Workflow B)

**What it does**
Every 5 min: reads the outbound sheet, picks one row with Status = Audit (or stuck Auditing), runs the full SYSBILT audit (DeepSeek), pushes report to Vercel, sets Status = Audited + Audit Link, drafts a Gmail to the prospect.

**How to run**
1. Clear old Audit Link on the row
2. Set Status = Audit (exact spelling)
3. Execute or activate workflow
4. Open the **new** Audit Link from the sheet

**AI**
DeepSeek (deepseek-chat) for Client deep research, Client brief, Master Analyst. Clone of inbound audit with sheet trigger.

**Related workflows**
← **Outbound List Builder** / **Contact Scrape** — feed the sheet
← **Inbound Contact Form Audit** — original audit chain this was cloned from
→ **Workflow C — Outbound HubSpot Engage** — HubSpot push when Status = Engage

**Sheet**
Google Sheet ID in deploy state. Columns A–N: Business Name … Notes.`,
  },
  WD3s1eD9aUQNUWY6: {
    color: 4,
    width: 520,
    height: 400,
    content: `## Outbound HubSpot Engage (Workflow C)

**What it does**
Every 5 min: reads the outbound sheet, picks one row with Status = Engage, upserts contact in HubSpot, stamps Notes with hubspot:<id>, emails you.

**Requirements on the row**
- Status = Engage
- Real Email (not pending+@outbound.sysbilt.internal)
- Audit Link present
- Notes does not already contain hubspot:

**How to run**
1. After Workflow B sets Status = Audited, review the audit
2. Set Status = Engage on the row
3. Execute or activate this workflow

**Related workflows**
← **Outbound Audit Runner (B)** — creates Audit Link first
← **List Builder (A)** / **Contact Scrape (A2)** — fill the sheet

**Outbound pipeline**
A → sheet → B (Audit) → you review → Engage → C (this) → HubSpot`,
  },
  WP2tZjhH27vJbOaV: {
    color: 3,
    width: 460,
    height: 280,
    content: `## Outbound Sheet Setup

**What it does**
Webhook creates a new Google Sheet with outbound lead headers and returns the sheet URL.

**How to run**
Called by \`deploy-outbound-list-builder.mjs --setup-sheet\`. Not part of daily ops.

**Related workflows**
→ **Outbound List Builder** — writes rows to this sheet
→ **Outbound Sheet Headers** — fixes headers if Google Tables breaks them
→ **Outbound Audit Runner** — reads the same sheet`,
  },
  '5h6SvE2hScz6KHh3': {
    color: 3,
    width: 460,
    height: 280,
    content: `## Outbound Sheet Headers

**What it does**
Webhook deletes conflicting Google Tables, clears the sheet, and rewrites row 1 headers (A–N).

**How to run**
Called by \`deploy-outbound-list-builder.mjs --fix-sheet\` when column names break downstream reads.

**Related workflows**
← **Outbound Sheet Setup** — creates the sheet
→ **List Builder** and **Audit Runner** — both require A1:N5000 read range with correct headers`,
  },
  TvkvfhrMWWHAEQFd: {
    color: 5,
    width: 520,
    height: 420,
    content: `## Inbound Contact Form Audit (LIVE)

**What it does**
Polls HubSpot for new contact-form leads → deep research → full website audit → Vercel report → confirmation email + Gmail draft + internal notify.

**Trigger**
Schedule (every 5 min). **Active — production path for inbound leads.**

**AI**
DeepSeek (deepseek-chat) on Client deep research, Client brief, Master Analyst.

**Related workflows**
← **Sybil Chat Logger** — chat history may feed research context on inbound
→ **Outbound Audit Runner** — cloned from this workflow (sheet trigger instead of HubSpot)
✗ Do not edit casually — outbound deploy re-clones from this`,
  },
  '5sdNZZhTABB2VSg0': {
    color: 2,
    width: 440,
    height: 220,
    content: `## DEPRECATED — old inbound audit

**Do not use.** Replaced by **SYSBILT - Contact Form Research and Acknowledgement** (active).

Kept for reference only. Safe to archive/delete once you confirm nothing points here.`,
  },
  hB7YMEOcD7TLu3NZ: {
    color: 6,
    width: 540,
    height: 480,
    content: `## NEWS pipeline

**What it does**
Scheduled run: Google News RSS → dedupe → Groq relevance/tagging → DeepSeek rewrite → Sanity drafts → approval email + webhook → publish → newsletter to HubSpot subscribers → **Social Distribute**.

**Approval**
Email links to n8n webhook checklist. Approve publishes; cancel aborts send.

**AI**
Groq (llama-3.3-70b) for keep/tag. DeepSeek for article rewrite.

**Related workflows**
→ **Social Distribute** — schedules LinkedIn/Facebook via Postiz after publish
→ **Newsletter Welcome** — separate welcome flow for new subscribers
→ **Outbound HubSpot Engage (C)** — HubSpot push when Status = Engage
✗ Not part of outbound lead sheet pipeline`,
  },
  JU7VFyEcCHKU0ckl: {
    color: 6,
    width: 500,
    height: 360,
    content: `## Social Distribute

**What it does**
Takes published news items (from Sanity or passthrough input) → writes captions → uploads images → schedules posts on LinkedIn/Facebook via Postiz.

**Trigger**
**Execute Workflow** — called by NEWS after publish. Not scheduled on its own.

**Related workflows**
← **SYSBILT - NEWS** — main caller after Clear Old Published News
← **Social Test (webhook)** — manual test entry with same payload shape`,
  },
  '36hxhyRRWoRgIMgz': {
    color: 6,
    width: 460,
    height: 300,
    content: `## Social Test (webhook)

**What it does**
POST webhook → pull latest published news from Sanity → build content objects → call **Social Distribute**.

**How to run**
\`POST https://n8n.sysbilt.com/webhook/sysbilt-social-test\`

**Related workflows**
→ **Social Distribute** — the real scheduler/posting workflow
← **NEWS** — production path uses the same distributor after newsletter`,
  },
  Lph4ik3Y6VMhuYHV: {
    color: 6,
    width: 460,
    height: 300,
    content: `## Newsletter Welcome

**What it does**
Scheduled: finds new HubSpot contacts who subscribed to news → sends a one-time welcome email.

**Related workflows**
← **NEWS** — ongoing newsletter sends use the same subscriber list
✗ Separate from outbound sheet / audit pipeline`,
  },
  '5i6sz7pSUvVFiNql': {
    color: 7,
    width: 480,
    height: 320,
    content: `## Deal Stage Automations

**What it does**
Scheduled HubSpot deal check → routes by stage → sends stage-appropriate Gmail messages and HTTP actions.

**Related workflows**
HubSpot CRM only. No sheet, no audit, no NEWS content pipeline.

**Status**
Active. No AI nodes.`,
  },
  'sysbilt-routing-1': {
    color: 7,
    width: 460,
    height: 280,
    content: `## Lead Routing (inactive)

**What it does**
HubSpot new-contact trigger → route by persona → send persona-specific email (Builder / Scaler / Controller).

**Related workflows**
HubSpot inbound leads. Overlaps conceptually with deal/comms flows but separate from audit and outbound sheet.

**Status**
Inactive — enable only if you want automatic persona emails on new contacts.`,
  },
  otV9aaxSJ5ARJzSc: {
    color: 3,
    width: 440,
    height: 240,
    content: `## Manual Audit (stub)

**What it does**
Manual button → calls external/manual audit step. Placeholder for one-off audits outside HubSpot or sheet flows.

**Related workflows**
Could share report ingest with **Inbound** / **Outbound Audit Runner** if extended.`,
  },
  hAXxg6L0ibpt9QVW: {
    color: 7,
    width: 440,
    height: 240,
    content: `## T1 Comms Sequence (inactive stub)

**What it does**
Scheduled HubSpot contact search — early-stage comms sequence scaffold.

**Related workflows**
HubSpot only. Not wired to outbound sheet or NEWS.`,
  },
  '20NfO5zmf4sHTUJJ': {
    color: 5,
    width: 460,
    height: 280,
    content: `## Sybil Chat Logger

**What it does**
Webhook receives Sybil chat events → appends/updates a Google Sheet row.

**Related workflows**
→ **Inbound Contact Form Audit** — may read chat history during lead research
✗ Not used by outbound sheet pipeline`,
  },
};

function loadEnv() {
  const path = resolve(ROOT, '.env.local');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
  }
}

loadEnv();

const N8N_BASE = (process.env.N8N_BASE_URL || 'https://n8n.sysbilt.com').replace(/\/$/, '');
const N8N_KEY = process.env.N8N_API_KEY || process.env['cursor-mcp'];
if (!N8N_KEY) {
  console.error('Missing N8N_API_KEY or cursor-mcp in .env.local');
  process.exit(1);
}

const n8n = async (method, path, body) => {
  const res = await fetch(`${N8N_BASE}/api/v1${path}`, {
    method,
    headers: { 'X-N8N-API-KEY': N8N_KEY, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(data).slice(0, 600)}`);
  return data;
};

function workflowBody(wf) {
  return {
    name: wf.name,
    nodes: wf.nodes,
    connections: wf.connections,
    settings: { executionOrder: 'v1' },
  };
}

function bounds(nodes) {
  const real = nodes.filter((n) => n.type !== 'n8n-nodes-base.stickyNote');
  if (!real.length) return { minX: -200, minY: -200, maxX: 400, maxY: 200 };
  const xs = real.map((n) => n.position[0]);
  const ys = real.map((n) => n.position[1]);
  return { minX: Math.min(...xs), minY: Math.min(...ys), maxX: Math.max(...xs), maxY: Math.max(...ys) };
}

function upsertGuideSticky(wf, guide) {
  const { minX, minY } = bounds(wf.nodes);
  const stickyParams = {
    content: guide.content,
    width: guide.width,
    height: guide.height,
    color: guide.color,
  };
  const position = [minX - 40, minY - guide.height - 40];

  const existing = wf.nodes.find((n) => n.name === GUIDE_NODE_NAME);
  if (existing) {
    existing.parameters = stickyParams;
    existing.position = position;
    existing.type = 'n8n-nodes-base.stickyNote';
    existing.typeVersion = 1;
    return 'updated';
  }

  // Remove empty legacy stickies with no content on outbound runner
  wf.nodes = wf.nodes.filter(
    (n) => !(n.type === 'n8n-nodes-base.stickyNote' && n.name === 'Sticky Note' && !n.parameters?.content),
  );

  wf.nodes.push({
    id: randomUUID(),
    name: GUIDE_NODE_NAME,
    type: 'n8n-nodes-base.stickyNote',
    typeVersion: 1,
    position,
    parameters: stickyParams,
  });
  return 'added';
}

async function main() {
  const results = [];
  for (const [workflowId, guide] of Object.entries(WORKFLOW_GUIDES)) {
    let wf;
    try {
      wf = await n8n('GET', `/workflows/${workflowId}`);
    } catch (error) {
      results.push({ name: workflowId, id: workflowId, action: 'skipped (not found)', active: false });
      continue;
    }
    const wasActive = wf.active;
    const action = upsertGuideSticky(wf, guide);
    try {
      await n8n('PUT', `/workflows/${workflowId}`, workflowBody(wf));
    } catch (error) {
      if (String(error.message).includes('archived')) {
        results.push({ name: wf.name, id: workflowId, action: 'skipped (archived)', active: wasActive });
        continue;
      }
      throw error;
    }
    const after = await n8n('GET', `/workflows/${workflowId}`);
    if (wasActive && !after.active) await n8n('POST', `/workflows/${workflowId}/activate`);
    results.push({ name: wf.name, id: workflowId, action, active: wasActive });
  }

  console.log(`Updated ${results.length} workflow guide stickies:\n`);
  for (const r of results) {
    console.log(`  ${r.action.padEnd(7)} ${r.name}`);
    console.log(`          ${N8N_BASE}/workflow/${r.id}`);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
