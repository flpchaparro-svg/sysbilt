#!/usr/bin/env node
/**
 * Patch SYSBILT - NEWS for Lane 1 live mode:
 * - Auto-publish drafts (skip approval email). Goes live unless you kill social in Slack.
 * - Keep published news on the site for 14 days (stop wiping all but the latest batch).
 * - Replace pool cover pick with Browserless lane1 cream card → Sanity asset.
 *
 *   node scripts/automations/n8n/patch-news-lane1-asap.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const CARD_PATH = resolve(ROOT, 'scripts/automations/social/cards/lane1-news-card.html');
const MINI_HOST = process.env.SYSBILT_MINI_SSH || 'sysbilt@felipes-mac-mini-1.tail1e2dea.ts.net';
const NEWS_WF_ID = process.env.NEWS_WORKFLOW_ID || 'hB7YMEOcD7TLu3NZ';
const SANITY_CRED = { id: 'CEL0Wba7AmmXdZGq', name: 'n8n-news-writer' };
const RETAIN_DAYS = 14;

function loadEnvLocal() {
  const path = resolve(ROOT, '.env.local');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (!m) continue;
    if (!process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
  }
}
loadEnvLocal();

const N8N_BASE = (process.env.N8N_BASE_URL || 'https://n8n.sysbilt.com').replace(/\/$/, '');
const N8N_KEY = process.env.N8N_API_KEY || process.env['cursor-mcp'];
if (!N8N_KEY) {
  console.error('Missing N8N_API_KEY');
  process.exit(1);
}
if (!existsSync(CARD_PATH)) {
  console.error('Missing', CARD_PATH);
  process.exit(1);
}

function loadBrowserlessToken() {
  if (process.env.BROWSERLESS_TOKEN) return process.env.BROWSERLESS_TOKEN.trim();
  const local = resolve(process.env.HOME || '', '.config/sysbilt/browserless-secrets.env');
  if (existsSync(local)) {
    const m = readFileSync(local, 'utf8').match(/^BROWSERLESS_TOKEN=(.+)$/m);
    if (m) return m[1].trim();
  }
  return execSync(
    `ssh -o ConnectTimeout=15 -o BatchMode=yes ${MINI_HOST} 'grep ^BROWSERLESS_TOKEN= ~/.config/sysbilt/browserless-secrets.env | cut -d= -f2-'`,
    { encoding: 'utf8' },
  ).trim();
}

const n8n = async (method, path, body) => {
  const res = await fetch(`${N8N_BASE}/api/v1${path}`, {
    method,
    headers: { 'X-N8N-API-KEY': N8N_KEY, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(data).slice(0, 400)}`);
  return data;
};

const uid = () => randomUUID();

const FILL_CARD_JS = `const TEMPLATE = ${JSON.stringify(readFileSync(CARD_PATH, 'utf8'))};
const article = $input.first().json;
const title = String(article.title || '').trim();
const PHASE_MAP = { phase1: 'phase-01', phase2: 'phase-02', phase3: 'phase-03', horizon: 'phase-01' };
const TAG_MAP = {
  'Websites & E-commerce': 'Websites',
  'CRM & Lead Tracking': 'CRM',
  Automation: 'Automation',
  'AI Assistants': 'AI',
  'Content Systems': 'Content',
  'Team Training': 'Training',
  'Dashboards & Reporting': 'Dashboards',
};
const MOTIF_MAP = {
  'Websites & E-commerce': 'motif-nodes',
  'CRM & Lead Tracking': 'motif-nodes',
  Automation: 'motif-bars',
  'AI Assistants': 'motif-nodes',
  'Content Systems': 'motif-grid',
  'Team Training': 'motif-grid',
  'Dashboards & Reporting': 'motif-bars',
};
function esc(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function accentHeadline(plain) {
  const words = String(plain || '').trim().split(/\\s+/).filter(Boolean);
  if (!words.length) return '';
  let idx = words.findIndex((w) => w.replace(/[^a-zA-Z]/g, '').length >= 5);
  if (idx < 0) idx = Math.min(1, words.length - 1);
  return words.map((w, i) => (i === idx ? '<em>' + esc(w) + '</em>' : esc(w))).join(' ');
}
const plainLen = title.replace(/<[^>]+>/g, '').length;
let lenClass = 'len-long';
if (plainLen < 35) lenClass = 'len-short';
else if (plainLen <= 65) lenClass = 'len-mid';
const phase = PHASE_MAP[article.revenuePhase] || 'phase-01';
const motif = MOTIF_MAP[article.servicePillar] || 'motif-grid';
const tag = TAG_MAP[article.servicePillar] || String(article.servicePillar || 'News').slice(0, 22);
let html = TEMPLATE;
html = html.split('{{PHASE}}').join(phase);
html = html.split('{{LEN}}').join(lenClass);
html = html.split('{{MOTIF}}').join(motif);
html = html.split('{{TAG}}').join(esc(tag));
html = html.split('{{HEADLINE}}').join(accentHeadline(title));
if (html.includes('{{')) throw new Error('Unreplaced card placeholders');
return [{ json: { ...article, cardHtml: html } }];`;

const MERGE_ASSET_JS = `const article = $('Fill Lane1 Card').item.json;
const up = $input.first().json;
const assetId = up.document?._id || up._id;
if (!assetId) throw new Error('Sanity image upload missing document._id: ' + JSON.stringify(up).slice(0, 300));
return [{ json: { ...article, document: { _id: assetId } } }];`;

const AUTO_APPROVE_JS = `const ids = [];
let runIndex = 0;
while (true) {
  try {
    const assembleRun = $items('Assemble Draft', 0, runIndex);
    if (!assembleRun || assembleRun.length === 0) break;
    const created = assembleRun[0].json?.mutations?.[0]?.create;
    if (created?._id) ids.push(created._id);
    runIndex++;
  } catch (e) {
    break;
  }
}
if (!ids.length) {
  return [{ json: { approvedDraftIds: [], approvedCount: 0, message: 'No drafts to auto-publish' } }];
}
return [{ json: { approvedDraftIds: ids, approvedCount: ids.length, auto: true } }];`;

async function main() {
  const browserlessToken = loadBrowserlessToken();
  console.log('Browserless token prefix:', browserlessToken.slice(0, 6) + '…');

  const wf = await n8n('GET', `/workflows/${NEWS_WF_ID}`);
  const nodes = [...(wf.nodes || [])];
  const connections = { ...(wf.connections || {}) };

  const byName = (name) => nodes.find((n) => n.name === name);
  const ensureNode = (node) => {
    const i = nodes.findIndex((n) => n.name === node.name);
    if (i >= 0) nodes[i] = { ...nodes[i], ...node, id: nodes[i].id, position: node.position || nodes[i].position };
    else nodes.push(node);
  };

  // 1) 14-day retention instead of wipe-all-but-batch
  const clearOld = byName('Clear Old Published News');
  if (clearOld) {
    clearOld.parameters.jsonBody = `={{ JSON.stringify({ mutations: [{ delete: { query: "*[_type == 'newsItem' && !(_id in path('drafts.**')) && defined(publishedAt) && publishedAt < $cutoff]", params: { cutoff: new Date(Date.now() - ${RETAIN_DAYS} * 24 * 60 * 60 * 1000).toISOString() } } }] }) }}`;
    console.log('Patched Clear Old Published News → retain', RETAIN_DAYS, 'days');
  }

  // 2) Browserless card instead of cover pool
  const fillId = byName('Fill Lane1 Card')?.id || uid();
  const blId = byName('Browserless Lane1 Card')?.id || uid();
  const upId = byName('Upload Lane1 Card Sanity')?.id || uid();
  const mergeId = byName('Merge Lane1 Asset')?.id || uid();

  ensureNode({
    parameters: { jsCode: FILL_CARD_JS },
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [2200, 400],
    id: fillId,
    name: 'Fill Lane1 Card',
  });
  ensureNode({
    parameters: {
      method: 'POST',
      url: `http://127.0.0.1:3010/chromium/screenshot?token=${browserlessToken}`,
      sendBody: true,
      specifyBody: 'json',
      jsonBody: `={{ JSON.stringify({ html: $json.cardHtml, options: { type: 'png' }, viewport: { width: 1200, height: 630, deviceScaleFactor: 2 }, gotoOptions: { waitUntil: 'networkidle0' }, waitForTimeout: 4000 }) }}`,
      options: {
        timeout: 90000,
        response: { response: { responseFormat: 'file', outputPropertyName: 'data' } },
      },
    },
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.2,
    position: [2420, 400],
    id: blId,
    name: 'Browserless Lane1 Card',
  });
  ensureNode({
    parameters: {
      method: 'POST',
      url: 'https://wdlc9pg8.api.sanity.io/v2021-06-07/assets/images/production?filename=lane1-news.png',
      authentication: 'genericCredentialType',
      genericAuthType: 'httpHeaderAuth',
      sendBody: true,
      contentType: 'binaryData',
      inputDataFieldName: 'data',
      options: { timeout: 60000 },
    },
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.2,
    position: [2640, 400],
    id: upId,
    name: 'Upload Lane1 Card Sanity',
    credentials: { httpHeaderAuth: SANITY_CRED },
  });
  ensureNode({
    parameters: { jsCode: MERGE_ASSET_JS },
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [2860, 400],
    id: mergeId,
    name: 'Merge Lane1 Asset',
  });

  connections['Body to Portable Text'] = {
    main: [[{ node: 'Fill Lane1 Card', type: 'main', index: 0 }]],
  };
  connections['Fill Lane1 Card'] = {
    main: [[{ node: 'Browserless Lane1 Card', type: 'main', index: 0 }]],
  };
  connections['Browserless Lane1 Card'] = {
    main: [[{ node: 'Upload Lane1 Card Sanity', type: 'main', index: 0 }]],
  };
  connections['Upload Lane1 Card Sanity'] = {
    main: [[{ node: 'Merge Lane1 Asset', type: 'main', index: 0 }]],
  };
  connections['Merge Lane1 Asset'] = {
    main: [[{ node: 'Assemble Draft', type: 'main', index: 0 }]],
  };
  console.log('Wired Browserless Lane1 card → Sanity asset → Assemble Draft');

  // 3) Auto-publish: skip approval email
  const autoId = byName('Auto-Approve This Run')?.id || uid();
  ensureNode({
    parameters: { jsCode: AUTO_APPROVE_JS },
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [3200, -200],
    id: autoId,
    name: 'Auto-Approve This Run',
  });

  const loopConn = connections['Loop Over Items'] || { main: [[], []] };
  const processBranch = (loopConn.main && loopConn.main[1]) || [{ node: 'DS NEWS Rewrite', type: 'main', index: 0 }];
  connections['Loop Over Items'] = {
    main: [
      [{ node: 'Auto-Approve This Run', type: 'main', index: 0 }],
      processBranch,
    ],
  };
  connections['Auto-Approve This Run'] = {
    main: [[{ node: 'Fetch Approved Draft Contents', type: 'main', index: 0 }]],
  };
  console.log('Wired auto-publish (email approval bypassed)');

  await n8n('PUT', `/workflows/${NEWS_WF_ID}`, {
    name: wf.name,
    nodes,
    connections,
    settings: { executionOrder: wf.settings?.executionOrder || 'v1' },
  });
  console.log(`Updated NEWS (${NEWS_WF_ID})`);
  console.log('Live mode: drafts auto-publish → retain', RETAIN_DAYS, 'days on site → Social Distribute ASAP');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
