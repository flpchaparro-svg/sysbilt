#!/usr/bin/env node
/**
 * Deploy SYSBILT - Outbound Search Visibility Scorer.
 *
 * Master Leads with Website + empty SV Indexed → SerpAPI Google site:host
 * (+ homepage noindex / robots check) → write SV Indexed back.
 * If Google barely indexes the site (≤ INDEXED_MAX) or the homepage blocks
 * indexing → append Search Visibility tab (Ready / Wait).
 *
 * SerpAPI quota: silent 24h cooldown. Second consecutive fail emails Felipe.
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-outbound-search-fix-scorer.mjs --setup-tab
 *   node scripts/automations/n8n/deploy-outbound-search-fix-scorer.mjs
 *   node scripts/automations/n8n/deploy-outbound-search-fix-scorer.mjs --activate
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const INBOUND_AUDIT_WORKFLOW_ID = 'TvkvfhrMWWHAEQFd';
const GOOGLE_SHEETS_CRED_ID = 'W8jOFatMKmraYw0F';
const GOOGLE_SHEETS_CRED_NAME = 'Google Sheets account';
const GMAIL_CRED_ID = 'pR8GnMBXmukPyA2V';
const GMAIL_CRED_NAME = 'Gmail account';

const SHEET_ID_DEFAULT = '1aGz6kruGwSpt55rwlcknxVDXp9dgL_M-OnVJrDIbTlE';
/** Qualify when Google site: returns this many indexed pages or fewer. */
const INDEXED_MAX = 5;
const LEADS_SHEET = 'Master Leads';
const SV_SHEET = 'Search Visibility';
const SPEED_FIX_SHEET = 'Speed Fix';
const GP_SHEET = 'Google Profile';
const MC_SHEET = 'Missed-Call';
const LEADS_RANGE = 'A1:P5000';
const PRODUCT_RANGE = 'A1:I5000';

const LEADS_HEADERS = [
  'Business Name',
  'Suburb',
  'Address',
  'Website',
  'Phone',
  'Rating',
  'Reviews',
  'Maps ID',
  'Owner Name',
  'Email',
  'Status',
  'Audit Link',
  'Emailed',
  'Notes',
  'LH Mobile',
  'SV Indexed',
];

const SV_HEADERS = [
  'Business Name',
  'Suburb',
  'Website',
  'Email',
  'Phone',
  'Blocked Pages',
  'Status',
  'Maps ID',
  'Notes',
];

function loadEnvLocal() {
  const path = resolve(ROOT, '.env.local');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (!m) continue;
    const key = m[1].trim();
    const val = m[2].trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

function loadDeployState() {
  const path = resolve(__dirname, '.deploy-state.env');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
  }
}

function saveDeployState(updates) {
  const path = resolve(__dirname, '.deploy-state.env');
  const existing = existsSync(path) ? readFileSync(path, 'utf8') : '';
  const map = new Map();
  for (const line of existing.split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) map.set(m[1].trim(), m[2].trim());
  }
  for (const [k, v] of Object.entries(updates)) map.set(k, v);
  writeFileSync(path, [...map.entries()].map(([k, v]) => `${k}=${v}`).join('\n') + '\n');
}

loadEnvLocal();
loadDeployState();

const N8N_BASE = (process.env.N8N_BASE_URL || 'https://n8n.sysbilt.com').replace(/\/$/, '');
const N8N_KEY = process.env.N8N_API_KEY || process.env['cursor-mcp'];

if (!N8N_KEY) {
  console.error('Missing N8N_API_KEY or cursor-mcp in .env.local');
  process.exit(1);
}

const n8n = async (method, path, body) => {
  const res = await fetch(`${N8N_BASE}/api/v1${path}`, {
    method,
    headers: {
      'X-N8N-API-KEY': N8N_KEY,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
};

const uid = () => randomUUID();

function sheetRef(sheetId, sheetName) {
  return {
    documentId: { __rl: true, value: sheetId, mode: 'id' },
    sheetName: {
      __rl: true,
      value: sheetName,
      mode: 'name',
      cachedResultName: sheetName,
    },
  };
}

function schemaFor(headers, matchCol) {
  return headers.map((id) => ({
    id,
    displayName: id,
    required: false,
    defaultMatch: false,
    display: true,
    type: 'string',
    canBeUsedToMatch: id === matchCol,
  }));
}

async function findWorkflowByName(name) {
  const { data } = await n8n('GET', '/workflows?limit=250');
  return (data || []).find((w) => w.name === name) || null;
}

async function upsertWorkflow(workflow, { activate = false } = {}) {
  const existing = await findWorkflowByName(workflow.name);
  let wf;
  if (existing) {
    const full = await n8n('GET', `/workflows/${existing.id}`);
    wf = await n8n('PUT', `/workflows/${existing.id}`, {
      name: workflow.name,
      nodes: workflow.nodes,
      connections: workflow.connections,
      settings: workflow.settings || full.settings || { executionOrder: 'v1' },
      staticData: full.staticData ?? null,
    });
    console.log(`Updated workflow ${workflow.name} (${wf.id})`);
  } else {
    wf = await n8n('POST', '/workflows', {
      name: workflow.name,
      nodes: workflow.nodes,
      connections: workflow.connections,
      settings: workflow.settings || { executionOrder: 'v1' },
    });
    console.log(`Created workflow ${workflow.name} (${wf.id})`);
  }
  if (activate) {
    await n8n('POST', `/workflows/${wf.id}/activate`, {});
    console.log('Activated');
  }
  return wf;
}

async function fetchSerpApiKey() {
  const wf = await n8n('GET', `/workflows/${INBOUND_AUDIT_WORKFLOW_ID}`);
  const maps = wf.nodes?.find((n) => n.name === 'Maps Lookup');
  const url = maps?.parameters?.url || '';
  const m = String(url).match(/api_key=([a-f0-9]+)/i);
  if (!m) throw new Error('Could not extract SerpAPI key from inbound Maps Lookup node');
  return m[1];
}

const COOLDOWN_MS = 24 * 60 * 60 * 1000;
const NOTIFY_EMAIL = 'felipe@sysbilt.com';

const PICK_JS = `const staticData = $getWorkflowStaticData('global');
const STALE_MS = 8 * 60 * 1000;
const now = Date.now();

if (staticData.quotaCooldownUntil && now < staticData.quotaCooldownUntil) {
  return [];
}

if (staticData.svInProgress) {
  const started = staticData.svStartedAt || 0;
  if (now - started < STALE_MS) return [];
  staticData.svInProgress = false;
}

const rows = $input.all()
  .map((item) => item.json)
  .filter((row) => {
    const name = String(row['Business Name'] || '').trim();
    return name && name !== 'Business Name';
  });

const candidates = rows.filter((row) => {
  const website = String(row.Website || '').trim();
  const mapsId = String(row['Maps ID'] || '').trim();
  const sv = String(row['SV Indexed'] || '').trim();
  const status = String(row.Status || '').trim();
  if (!website || !mapsId) return false;
  if (sv !== '') return false;
  if (['Auditing', 'Dead'].includes(status)) return false;
  return true;
});

if (!candidates.length) return [];

staticData.svInProgress = true;
staticData.svStartedAt = now;
return [{ json: candidates[0] }];`;

const EXTRACT_JS = `const staticData = $getWorkflowStaticData('global');
const row = $('Pick Score Row').first().json;
const serp = $input.first().json || {};
let home = {};
try { home = $('Fetch Homepage').first().json || {}; } catch (_) { home = {}; }
const COOLDOWN_MS = ${COOLDOWN_MS};
const INDEXED_MAX = ${INDEXED_MAX};

function isSerpQuota(body) {
  const msg = String(body?.error || body?.message || body?.description || '').toLowerCase();
  const code = Number(body?.statusCode || body?.status || body?.error?.code || 0);
  if (code === 429) return true;
  if (msg.includes('run out of searches') || msg.includes('out of searches')) return true;
  if (msg.includes('quota') || msg.includes('rate limit') || msg.includes('rate_limit')) return true;
  if (msg.includes('monthly searches') || msg.includes('account has run out')) return true;
  return false;
}

function hostFromWebsite(raw) {
  let s = String(raw || '').trim();
  if (!s) return '';
  if (!/^https?:\\/\\//i.test(s)) s = 'https://' + s;
  try {
    return new URL(s).hostname.replace(/^www\\./i, '').toLowerCase();
  } catch {
    return s.replace(/^https?:\\/\\//i, '').replace(/^www\\./i, '').split('/')[0].toLowerCase();
  }
}

function detectNoindex(homeBody) {
  const headers = homeBody?.headers || {};
  const xrobots = String(
    headers['x-robots-tag'] || headers['X-Robots-Tag'] || '',
  ).toLowerCase();
  if (xrobots.includes('noindex')) return true;
  let html = '';
  if (typeof homeBody?.data === 'string') html = homeBody.data;
  else if (typeof homeBody?.body === 'string') html = homeBody.body;
  else if (typeof homeBody === 'string') html = homeBody;
  const lower = String(html || '').toLowerCase();
  if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(lower)) return true;
  if (/<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(lower)) return true;
  return false;
}

if (isSerpQuota(serp)) {
  const streak = Number(staticData.quotaFailStreak || 0) + 1;
  staticData.quotaFailStreak = streak;
  staticData.quotaCooldownUntil = Date.now() + COOLDOWN_MS;
  staticData.svInProgress = false;
  staticData.svStartedAt = 0;
  const alert = streak >= 2 && !staticData.quotaAlertSent;
  if (alert) staticData.quotaAlertSent = true;
  return [{
    json: {
      ...row,
      _quotaHit: true,
      _alert: alert,
      _quotaStreak: streak,
      _cooldownUntil: new Date(staticData.quotaCooldownUntil).toISOString(),
      _quotaReason: String(serp.error || serp.message || 'SerpAPI quota'),
    },
  }];
}

staticData.quotaFailStreak = 0;
staticData.quotaAlertSent = false;
staticData.quotaCooldownUntil = 0;

const host = hostFromWebsite(row.Website);
const organic = Array.isArray(serp.organic_results) ? serp.organic_results : [];
let indexed = null;
const totalRaw = serp.search_information?.total_results
  ?? serp.search_information?.total_results_state
  ?? null;
if (typeof totalRaw === 'number' && Number.isFinite(totalRaw)) {
  indexed = Math.max(0, Math.round(totalRaw));
} else if (typeof totalRaw === 'string') {
  const n = Number(String(totalRaw).replace(/[^0-9]/g, ''));
  if (Number.isFinite(n)) indexed = n;
}
if (indexed === null) {
  // Fallback: count organic hits that clearly belong to this host
  indexed = organic.filter((r) => {
    const link = String(r.link || r.displayed_link || '').toLowerCase();
    return host && link.includes(host);
  }).length;
}

const noindex = detectNoindex(home);
let score = '';
if (serp.error && !organic.length && indexed === 0 && !serp.search_information) {
  score = 'err';
} else {
  score = String(Math.min(indexed, 9999));
}

const num = score === 'err' ? 9999 : Number(score);
const thin = score !== 'err' && num <= INDEXED_MAX;
const qualifies = score !== 'err' && (thin || noindex);

let blocked = 0;
if (qualifies) {
  if (noindex) blocked = Math.max(12, Math.min(500, 30 - (thin ? num : 0)));
  else blocked = Math.max(5, Math.min(500, 20 - num));
}

return [{
  json: {
    ...row,
    'SV Indexed': score,
    _qualifies: qualifies,
    _indexedNum: num,
    _blockedPages: blocked,
    _noindex: noindex,
    _host: host,
    _quotaHit: false,
    _alert: false,
  },
}];`;

const CLEAR_JS = `const staticData = $getWorkflowStaticData('global');
staticData.svInProgress = false;
staticData.svStartedAt = 0;
return $input.all();`;

const BUILD_JS = `const lead = $('Extract Score').first().json;
if (!lead._qualifies) {
  return [{ json: { _skipAppend: true, reason: 'indexed_ok_or_err', score: lead['SV Indexed'] } }];
}

const mapsId = String(lead['Maps ID'] || '').trim();

function rowsFrom(nodeName) {
  try {
    return $(nodeName).all()
      .map((i) => i.json)
      .filter((r) => String(r['Business Name'] || '').trim() && r['Business Name'] !== 'Business Name');
  } catch {
    return [];
  }
}

const svRows = rowsFrom('Read Search Visibility Tab');
const sfRows = rowsFrom('Read Speed Fix Tab');
const gpRows = rowsFrom('Read Google Profile Tab');
const mcRows = rowsFrom('Read Missed-Call Tab');

if (svRows.some((r) => String(r['Maps ID'] || '').trim() === mapsId)) {
  return [{ json: { _skipAppend: true, reason: 'already_on_search_visibility', mapsId } }];
}

const allProduct = [...svRows, ...sfRows, ...gpRows, ...mcRows];
const same = allProduct.filter((r) => String(r['Maps ID'] || '').trim() === mapsId);
if (same.some((r) => String(r.Status || '').trim() === 'Replied')) {
  return [{ json: { _skipAppend: true, reason: 'replied_elsewhere', mapsId } }];
}

const busy = same.some((r) => ['Ready', 'Emailed'].includes(String(r.Status || '').trim()));
const status = busy ? 'Wait' : 'Ready';
const notes = [
  busy ? 'wait:other-product-live' : '',
  lead._noindex ? 'gate:homepage-noindex' : 'gate:site-indexed<=' + ${INDEXED_MAX},
  'indexed:' + String(lead['SV Indexed'] || ''),
].filter(Boolean).join(' | ');

return [{
  json: {
    'Business Name': lead['Business Name'] || '',
    Suburb: lead.Suburb || '',
    Website: lead.Website || '',
    Email: lead.Email || '',
    Phone: lead.Phone || '',
    'Blocked Pages': String(lead._blockedPages || ''),
    Status: status,
    'Maps ID': mapsId,
    Notes: notes,
    _skipAppend: false,
  },
}];`;

function buildScorerWorkflow(sheetId, serpApiKey) {
  const nodes = [
    {
      id: uid(),
      name: 'Every 5 Minutes',
      type: 'n8n-nodes-base.scheduleTrigger',
      typeVersion: 1.2,
      position: [-960, -80],
      parameters: { rule: { interval: [{ field: 'minutes', minutesInterval: 5 }] } },
    },
    {
      id: uid(),
      name: 'Manual Trigger',
      type: 'n8n-nodes-base.manualTrigger',
      typeVersion: 1,
      position: [-960, 120],
      parameters: {},
    },
    {
      id: uid(),
      name: 'Read Leads Sheet',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-720, 0],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId, LEADS_SHEET),
        options: {
          dataLocationOnSheet: {
            values: { rangeDefinition: 'specifyRangeA1', range: LEADS_RANGE },
          },
        },
      },
    },
    {
      id: uid(),
      name: 'Pick Score Row',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-480, 0],
      parameters: { mode: 'runOnceForAllItems', jsCode: PICK_JS },
    },
    {
      id: uid(),
      name: 'Wait Before Checks',
      type: 'n8n-nodes-base.wait',
      typeVersion: 1.1,
      position: [-240, 0],
      parameters: { amount: 2 },
    },
    {
      id: uid(),
      name: 'Fetch Homepage',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.4,
      position: [0, -100],
      onError: 'continueRegularOutput',
      parameters: {
        method: 'GET',
        url: `={{ (() => {
  let u = String($json.Website || '').trim();
  if (!u) return 'https://example.com';
  if (!/^https?:\\/\\//i.test(u)) u = 'https://' + u;
  try {
    const parsed = new URL(u);
    return parsed.origin + '/';
  } catch {
    return u;
  }
})() }}`,
        options: {
          timeout: 20000,
          response: { response: { fullResponse: true, neverError: true } },
        },
      },
    },
    {
      id: uid(),
      name: 'SerpAPI Site Index',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.4,
      position: [0, 120],
      onError: 'continueRegularOutput',
      parameters: {
        method: 'GET',
        url: `={{ (() => {
  let u = String($('Pick Score Row').item.json.Website || '').trim();
  if (!u) return 'https://serpapi.com/search.json?engine=google&q=site%3Aexample.com&api_key=${serpApiKey}';
  if (!/^https?:\\/\\//i.test(u)) u = 'https://' + u;
  let host = 'example.com';
  try { host = new URL(u).hostname.replace(/^www\\./i, ''); } catch (_) {}
  return 'https://serpapi.com/search.json?engine=google&q=' + encodeURIComponent('site:' + host) + '&google_domain=google.com.au&gl=au&hl=en&num=10&api_key=${serpApiKey}';
})() }}`,
        options: { timeout: 45000 },
      },
    },
    {
      id: uid(),
      name: 'Extract Score',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [240, 0],
      parameters: { mode: 'runOnceForAllItems', jsCode: EXTRACT_JS },
    },
    {
      id: uid(),
      name: 'Quota Hit',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [480, 0],
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3 },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json._quotaHit }}',
              rightValue: true,
              operator: { type: 'boolean', operation: 'equals' },
            },
          ],
          combinator: 'and',
        },
        looseTypeValidation: true,
        options: {},
      },
    },
    {
      id: uid(),
      name: 'Should Alert Quota',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [720, 160],
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3 },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json._alert }}',
              rightValue: true,
              operator: { type: 'boolean', operation: 'equals' },
            },
          ],
          combinator: 'and',
        },
        looseTypeValidation: true,
        options: {},
      },
    },
    {
      id: uid(),
      name: 'Quota Alert Email',
      type: 'n8n-nodes-base.gmail',
      typeVersion: 2.1,
      position: [960, 80],
      credentials: { gmailOAuth2: { id: GMAIL_CRED_ID, name: GMAIL_CRED_NAME } },
      parameters: {
        sendTo: NOTIFY_EMAIL,
        subject: '=Outbound Search Visibility Scorer: SerpAPI quota failed twice',
        message: `=SerpAPI hit quota again after a 24h pause.<br><br>
Streak: {{ $json._quotaStreak }}<br>
Cooldown until: {{ $json._cooldownUntil }}<br>
Reason: {{ $json._quotaReason }}<br><br>
Workflow paused scoring for another 24 hours. No sheet rows were burned.`,
        options: {},
      },
    },
    {
      id: uid(),
      name: 'Write SV Indexed',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [720, -120],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'appendOrUpdate',
        ...sheetRef(sheetId, LEADS_SHEET),
        columns: {
          mappingMode: 'defineBelow',
          value: {
            'Maps ID': "={{ $json['Maps ID'] }}",
            'SV Indexed': "={{ $json['SV Indexed'] }}",
          },
          matchingColumns: ['Maps ID'],
          schema: schemaFor(LEADS_HEADERS, 'Maps ID'),
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: { useAppend: false },
      },
    },
    {
      id: uid(),
      name: 'Read Search Visibility Tab',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [960, -280],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId, SV_SHEET),
        options: {
          dataLocationOnSheet: {
            values: { rangeDefinition: 'specifyRangeA1', range: PRODUCT_RANGE },
          },
        },
      },
    },
    {
      id: uid(),
      name: 'Read Speed Fix Tab',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [960, -120],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId, SPEED_FIX_SHEET),
        options: {
          dataLocationOnSheet: {
            values: { rangeDefinition: 'specifyRangeA1', range: PRODUCT_RANGE },
          },
        },
      },
    },
    {
      id: uid(),
      name: 'Read Google Profile Tab',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [960, 40],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId, GP_SHEET),
        options: {
          dataLocationOnSheet: {
            values: { rangeDefinition: 'specifyRangeA1', range: PRODUCT_RANGE },
          },
        },
      },
    },
    {
      id: uid(),
      name: 'Read Missed-Call Tab',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [960, 200],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId, MC_SHEET),
        options: {
          dataLocationOnSheet: {
            values: { rangeDefinition: 'specifyRangeA1', range: PRODUCT_RANGE },
          },
        },
      },
    },
    {
      id: uid(),
      name: 'Build Search Visibility Row',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1200, -40],
      parameters: { mode: 'runOnceForAllItems', jsCode: BUILD_JS },
    },
    {
      id: uid(),
      name: 'Should Append',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [1440, -40],
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3 },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json._skipAppend }}',
              rightValue: true,
              operator: { type: 'boolean', operation: 'notEquals' },
            },
          ],
          combinator: 'and',
        },
        looseTypeValidation: true,
        options: {},
      },
    },
    {
      id: uid(),
      name: 'Append Search Visibility',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [1680, -120],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'append',
        ...sheetRef(sheetId, SV_SHEET),
        columns: {
          mappingMode: 'defineBelow',
          value: {
            'Business Name': "={{ $json['Business Name'] }}",
            Suburb: '={{ $json.Suburb }}',
            Website: '={{ $json.Website }}',
            Email: '={{ $json.Email }}',
            Phone: '={{ $json.Phone }}',
            'Blocked Pages': "={{ $json['Blocked Pages'] }}",
            Status: '={{ $json.Status }}',
            'Maps ID': "={{ $json['Maps ID'] }}",
            Notes: '={{ $json.Notes }}',
          },
          matchingColumns: [],
          schema: schemaFor(SV_HEADERS, 'Maps ID'),
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: {},
      },
    },
    {
      id: uid(),
      name: 'Clear SV Lock',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1920, 0],
      parameters: { mode: 'runOnceForAllItems', jsCode: CLEAR_JS },
    },
    {
      id: uid(),
      name: 'Workflow Guide',
      type: 'n8n-nodes-base.stickyNote',
      typeVersion: 1,
      position: [-1200, -60],
      parameters: {
        width: 460,
        height: 460,
        color: 4,
        content: `## Outbound Search Visibility Scorer

**What it does**
Master Leads empty **SV Indexed** → homepage robots check + SerpAPI \`site:host\` → write SV Indexed.

**Gate**
Indexed ≤ ${INDEXED_MAX} **or** homepage noindex → **Search Visibility** tab.
Status Ready, or Wait if another product tab already Ready/Emailed.

**Personalisation**
Blocked Pages column feeds \`/go/search-fix?b=&n=\`.

**Quota**
SerpAPI limit → silent 24h pause; email only on 2nd fail.`,
      },
    },
  ];

  // Merge path: Fetch Homepage and SerpAPI both feed Extract.
  // n8n needs both complete — chain Fetch → SerpAPI → Extract so one item carries forward,
  // while Extract still reads Fetch Homepage by name.
  const connections = {
    'Every 5 Minutes': { main: [[{ node: 'Read Leads Sheet', type: 'main', index: 0 }]] },
    'Manual Trigger': { main: [[{ node: 'Read Leads Sheet', type: 'main', index: 0 }]] },
    'Read Leads Sheet': { main: [[{ node: 'Pick Score Row', type: 'main', index: 0 }]] },
    'Pick Score Row': { main: [[{ node: 'Wait Before Checks', type: 'main', index: 0 }]] },
    'Wait Before Checks': { main: [[{ node: 'Fetch Homepage', type: 'main', index: 0 }]] },
    'Fetch Homepage': { main: [[{ node: 'SerpAPI Site Index', type: 'main', index: 0 }]] },
    'SerpAPI Site Index': { main: [[{ node: 'Extract Score', type: 'main', index: 0 }]] },
    'Extract Score': { main: [[{ node: 'Quota Hit', type: 'main', index: 0 }]] },
    'Quota Hit': {
      main: [
        [{ node: 'Should Alert Quota', type: 'main', index: 0 }],
        [{ node: 'Write SV Indexed', type: 'main', index: 0 }],
      ],
    },
    'Should Alert Quota': {
      main: [
        [{ node: 'Quota Alert Email', type: 'main', index: 0 }],
        [{ node: 'Clear SV Lock', type: 'main', index: 0 }],
      ],
    },
    'Quota Alert Email': { main: [[{ node: 'Clear SV Lock', type: 'main', index: 0 }]] },
    'Write SV Indexed': { main: [[{ node: 'Read Search Visibility Tab', type: 'main', index: 0 }]] },
    'Read Search Visibility Tab': { main: [[{ node: 'Read Speed Fix Tab', type: 'main', index: 0 }]] },
    'Read Speed Fix Tab': { main: [[{ node: 'Read Google Profile Tab', type: 'main', index: 0 }]] },
    'Read Google Profile Tab': { main: [[{ node: 'Read Missed-Call Tab', type: 'main', index: 0 }]] },
    'Read Missed-Call Tab': { main: [[{ node: 'Build Search Visibility Row', type: 'main', index: 0 }]] },
    'Build Search Visibility Row': { main: [[{ node: 'Should Append', type: 'main', index: 0 }]] },
    'Should Append': {
      main: [
        [{ node: 'Append Search Visibility', type: 'main', index: 0 }],
        [{ node: 'Clear SV Lock', type: 'main', index: 0 }],
      ],
    },
    'Append Search Visibility': { main: [[{ node: 'Clear SV Lock', type: 'main', index: 0 }]] },
  };

  return {
    name: 'SYSBILT - Outbound Search Visibility Scorer',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  };
}

function buildSetupTabWorkflow(sheetId) {
  const ENSURE_JS = `const meta = $input.first().json;
const sheets = meta.sheets || [];
const has = sheets.some((s) => s.properties?.title === '${SV_SHEET}');
const requests = [];
if (!has) {
  requests.push({ addSheet: { properties: { title: '${SV_SHEET}' } } });
}
return [{
  json: {
    spreadsheetId: meta.spreadsheetId || '${sheetId}',
    hasTab: has,
    requests,
    skipBatch: requests.length === 0,
  },
}];`;

  return {
    name: 'SYSBILT - Outbound Search Visibility Tab Setup',
    nodes: [
      {
        id: uid(),
        name: 'Setup Webhook',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2.1,
        position: [-600, 0],
        parameters: {
          path: 'sysbilt-outbound-search-fix-tab',
          httpMethod: 'POST',
          responseMode: 'responseNode',
          options: {},
        },
        webhookId: 'sysbilt-outbound-search-fix-tab',
      },
      {
        id: uid(),
        name: 'Get Spreadsheet Meta',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [-360, 0],
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        parameters: {
          method: 'GET',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=spreadsheetId,sheets(properties(sheetId,title))`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Ensure Search Visibility Tab',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [-120, 0],
        parameters: { mode: 'runOnceForAllItems', jsCode: ENSURE_JS },
      },
      {
        id: uid(),
        name: 'Needs Add Sheet',
        type: 'n8n-nodes-base.if',
        typeVersion: 2.3,
        position: [120, 0],
        parameters: {
          conditions: {
            options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3 },
            conditions: [
              {
                id: uid(),
                leftValue: '={{ $json.skipBatch }}',
                rightValue: true,
                operator: { type: 'boolean', operation: 'notEquals' },
              },
            ],
            combinator: 'and',
          },
          looseTypeValidation: true,
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Add Sheet If Needed',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [360, -80],
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        parameters: {
          method: 'POST',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: '={{ JSON.stringify({ requests: $json.requests }) }}',
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Skip Add Sheet',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [360, 120],
        parameters: { mode: 'runOnceForAllItems', jsCode: 'return $input.all();' },
      },
      {
        id: uid(),
        name: 'Set SV Indexed Header',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [600, 0],
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        parameters: {
          method: 'PUT',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent('Master Leads!P1')}?valueInputOption=USER_ENTERED`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: JSON.stringify({
            range: 'Master Leads!P1',
            majorDimension: 'ROWS',
            values: [['SV Indexed']],
          }),
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Set Search Visibility Headers',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [840, 0],
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        parameters: {
          method: 'PUT',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent('Search Visibility!A1:I1')}?valueInputOption=USER_ENTERED`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: JSON.stringify({
            range: 'Search Visibility!A1:I1',
            majorDimension: 'ROWS',
            values: [SV_HEADERS],
          }),
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Respond OK',
        type: 'n8n-nodes-base.respondToWebhook',
        typeVersion: 1.1,
        position: [1080, 0],
        parameters: {
          respondWith: 'json',
          responseBody: `={{ ({ ok: true, spreadsheetId: '${sheetId}', tab: '${SV_SHEET}', svHeader: 'SV Indexed', indexedMax: ${INDEXED_MAX} }) }}`,
          options: {},
        },
      },
    ],
    connections: {
      'Setup Webhook': { main: [[{ node: 'Get Spreadsheet Meta', type: 'main', index: 0 }]] },
      'Get Spreadsheet Meta': {
        main: [[{ node: 'Ensure Search Visibility Tab', type: 'main', index: 0 }]],
      },
      'Ensure Search Visibility Tab': {
        main: [[{ node: 'Needs Add Sheet', type: 'main', index: 0 }]],
      },
      'Needs Add Sheet': {
        main: [
          [{ node: 'Add Sheet If Needed', type: 'main', index: 0 }],
          [{ node: 'Skip Add Sheet', type: 'main', index: 0 }],
        ],
      },
      'Add Sheet If Needed': {
        main: [[{ node: 'Set SV Indexed Header', type: 'main', index: 0 }]],
      },
      'Skip Add Sheet': {
        main: [[{ node: 'Set SV Indexed Header', type: 'main', index: 0 }]],
      },
      'Set SV Indexed Header': {
        main: [[{ node: 'Set Search Visibility Headers', type: 'main', index: 0 }]],
      },
      'Set Search Visibility Headers': {
        main: [[{ node: 'Respond OK', type: 'main', index: 0 }]],
      },
    },
    settings: { executionOrder: 'v1' },
  };
}

async function setupTab(sheetId) {
  console.log(`Setting up Search Visibility tab on sheet ${sheetId}...`);
  const wf = await upsertWorkflow(buildSetupTabWorkflow(sheetId), { activate: true });
  saveDeployState({ OUTBOUND_SEARCH_FIX_TAB_SETUP_WORKFLOW_ID: wf.id });

  await new Promise((r) => setTimeout(r, 1500));
  const res = await fetch(`${N8N_BASE}/webhook/sysbilt-outbound-search-fix-tab`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'deploy-outbound-search-fix-scorer' }),
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  try {
    await n8n('POST', `/workflows/${wf.id}/deactivate`, {});
  } catch {
    /* ok */
  }
  if (!res.ok) {
    throw new Error(`Search Visibility tab setup failed: ${res.status} ${JSON.stringify(data)}`);
  }
  console.log('Tab setup OK:', data);
  return data;
}

async function deployScorer(sheetId, { activate = false } = {}) {
  const serpApiKey = await fetchSerpApiKey();
  const workflow = buildScorerWorkflow(sheetId, serpApiKey);
  const wf = await upsertWorkflow(workflow, { activate });
  saveDeployState({
    OUTBOUND_LEADS_SHEET_ID: sheetId,
    OUTBOUND_SEARCH_FIX_SCORER_WORKFLOW_ID: wf.id,
    OUTBOUND_SV_INDEXED_MAX: String(INDEXED_MAX),
  });
  console.log(`\nScorer deployed${activate ? ' (active)' : ' (inactive)'}: ${N8N_BASE}/workflow/${wf.id}`);
  console.log(`Sheet: https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
  console.log(
    `Gate: SV Indexed ≤ ${INDEXED_MAX} or homepage noindex → ${SV_SHEET} (Ready / Wait)`,
  );
  console.log('Quota: SerpAPI limit → silent 24h pause; email only on 2nd fail.');
  return wf;
}

async function main() {
  const args = process.argv.slice(2);
  const doSetup = args.includes('--setup-tab');
  const activate = args.includes('--activate');
  const sheetId = process.env.OUTBOUND_LEADS_SHEET_ID || SHEET_ID_DEFAULT;

  if (!process.env.OUTBOUND_LEADS_SHEET_ID) {
    saveDeployState({ OUTBOUND_LEADS_SHEET_ID: sheetId });
    process.env.OUTBOUND_LEADS_SHEET_ID = sheetId;
  }

  if (doSetup) await setupTab(sheetId);
  await deployScorer(sheetId, { activate });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
