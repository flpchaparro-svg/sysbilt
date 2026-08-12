#!/usr/bin/env node
/**
 * Deploy SYSBILT - Outbound List Builder (Workflow A) and optional Google Sheet setup.
 *
 * Env (from .env.local or shell):
 *   N8N_API_KEY / cursor-mcp
 *   N8N_BASE_URL          — default https://n8n.sysbilt.com
 *   OUTBOUND_LEADS_SHEET_ID — spreadsheet ID (written by --setup-sheet)
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-outbound-list-builder.mjs --setup-master
 *   node scripts/automations/n8n/deploy-outbound-list-builder.mjs --setup-sheet
 *   node scripts/automations/n8n/deploy-outbound-list-builder.mjs
 *   node scripts/automations/n8n/deploy-outbound-list-builder.mjs --activate
 *
 * --setup-master renames Sheet1 → Master Leads, creates Run Queue tab, deploys A + A2.
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
const QUOTA_COOLDOWN_MS = 24 * 60 * 60 * 1000;
const NOTIFY_EMAIL = 'felipe@sysbilt.com';

const SHEET_HEADERS = [
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
];

const LEADS_SHEET = 'Master Leads';
const QUEUE_SHEET = 'Run Queue';
const QUEUE_HEADERS = ['Queue Key', 'Niche', 'Suburb', 'Status', 'Rows Added', 'Last Run', 'Notes'];
const QUEUE_STATUS_VALUES = ['Queued', 'Running', 'Done', 'Failed'];
const QUEUE_DATA_RANGE = 'A1:G500';
const SHEET_DATA_RANGE = 'A1:N5000';
const GEMINI_CRED_ID = 'fYynkgKRlOyjBhLi';
const GEMINI_CRED_NAME = 'Gemini News Free';

const STATUS_VALUES = ['New', 'Audit', 'Auditing', 'Audited', 'Engage', 'Emailed', 'Replied', 'Dead'];

/** Suggested niches for Run Queue data validation (set manually in Sheets). */
const NICHE_SUGGESTIONS = [
  'Landscapers',
  'Landscaping',
  'Fencing contractors',
  'Retaining wall contractors',
  'Paving contractors',
  'Concreters',
  'Tree services',
  'Pool builders',
  'Dentists',
  'Psychologists',
  'Physiotherapists',
  'Chiropractors',
  'Optometrists',
  'Hair clinics',
  'Plastic surgery',
  'Lawyers',
  'Accountants',
  'High-end builders',
  'Interior designers',
];

/**
 * Suburb → [lat, lng] for SerpAPI ll= (zoom 14). Unknown suburbs fall back to
 * Sydney CBD at zoom 12 and rely on hard suburb filter after results.
 */
const SUBURB_COORDS = {
  marrickville: [-33.9111, 151.1556],
  stanmore: [-33.8992, 151.1644],
  newtown: [-33.8983, 151.1795],
  enmore: [-33.8995, 151.1708],
  petersham: [-33.895, 151.155],
  mascot: [-33.933, 151.185],
  dulwich: [-33.9045, 151.138],
  'dulwich hill': [-33.9045, 151.138],
  leichhardt: [-33.8847, 151.1564],
  balmain: [-33.8568, 151.179],
  rozelle: [-33.864, 151.171],
  annandale: [-33.881, 151.17],
  glebe: [-33.879, 151.185],
  forest: [-33.891, 151.132],
  'forest lodge': [-33.891, 151.132],
  camperdown: [-33.885, 151.178],
  erskineville: [-33.901, 151.186],
  alexandria: [-33.909, 151.196],
  waterloo: [-33.9, 151.208],
  surry: [-33.888, 151.21],
  'surry hills': [-33.888, 151.21],
  darlinghurst: [-33.879, 151.219],
  paddington: [-33.885, 151.23],
  bondi: [-33.8915, 151.2767],
  'bondi junction': [-33.891, 151.247],
  bronte: [-33.903, 151.263],
  coogee: [-33.921, 151.255],
  randwick: [-33.914, 151.241],
  maroubra: [-33.95, 151.244],
  double: [-33.877, 151.242],
  'double bay': [-33.877, 151.242],
  rose: [-33.87, 151.264],
  'rose bay': [-33.87, 151.264],
  mosman: [-33.829, 151.242],
  neutral: [-33.838, 151.218],
  'neutral bay': [-33.838, 151.218],
  cremorne: [-33.828, 151.227],
  northbridge: [-33.813, 151.217],
  chatswood: [-33.7969, 151.183],
  willoughby: [-33.806, 151.2],
  lane: [-33.829, 151.17],
  'lane cove': [-33.829, 151.17],
  rye: [-33.814, 151.14],
  ryde: [-33.814, 151.14],
  parramatta: [-33.8151, 151.001],
  strathfield: [-33.877, 151.094],
  burwood: [-33.877, 151.104],
  ashfield: [-33.889, 151.126],
  summer: [-33.893, 151.133],
  'summer hill': [-33.893, 151.133],
  haberfield: [-33.881, 151.14],
  drummoyne: [-33.852, 151.154],
  five: [-33.873, 151.128],
  'five dock': [-33.873, 151.128],
  concord: [-33.856, 151.104],
  homebush: [-33.865, 151.082],
  manly: [-33.7969, 151.285],
  dee: [-33.75, 151.29],
  'dee why': [-33.75, 151.29],
  brookvale: [-33.764, 151.271],
  crotulla: [-34.028, 151.154],
  cronulla: [-34.028, 151.154],
  sutherland: [-34.029, 151.057],
  hurstville: [-33.967, 151.102],
  kogarah: [-33.968, 151.135],
  rockdale: [-33.953, 151.139],
  brighton: [-33.96, 151.155],
  'brighton-le-sands': [-33.96, 151.155],
  bankstown: [-33.917, 151.033],
  liverpool: [-33.928, 150.924],
  penrith: [-33.751, 150.694],
  blacktown: [-33.771, 150.906],
  hornsby: [-33.703, 151.099],
  epping: [-33.773, 151.082],
  eastwood: [-33.79, 151.082],
  macquarie: [-33.777, 151.125],
  'macquarie park': [-33.777, 151.125],
  pyrmont: [-33.869, 151.195],
  ultimo: [-33.881, 151.198],
  chippendale: [-33.887, 151.2],
  redfern: [-33.893, 151.205],
  zetland: [-33.907, 151.208],
  potts: [-33.867, 151.223],
  'potts point': [-33.867, 151.223],
  woolloomooloo: [-33.87, 151.22],
  millers: [-33.86, 151.207],
  'millers point': [-33.86, 151.207],
  barangaroo: [-33.863, 151.202],
  circular: [-33.861, 151.211],
  'circular quay': [-33.861, 151.211],
  'sydney cbd': [-33.8688, 151.2093],
  sydney: [-33.8688, 151.2093],
  cbd: [-33.8688, 151.2093],
};

const HEADER_ROW_JS = `return [{
  json: {
    'Business Name': 'Business Name',
    'Suburb': 'Suburb',
    'Address': 'Address',
    'Website': 'Website',
    'Phone': 'Phone',
    'Rating': 'Rating',
    'Reviews': 'Reviews',
    'Maps ID': 'Maps ID',
    'Owner Name': 'Owner Name',
    'Email': 'Email',
    'Status': 'Status',
    'Audit Link': 'Audit Link',
    'Emailed': 'Emailed',
    'Notes': 'Notes',
  },
}];`;

function buildHeaderRowNode(position) {
  return {
    id: uid(),
    name: 'Build Header Row',
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position,
    parameters: {
      mode: 'runOnceForAllItems',
      jsCode: HEADER_ROW_JS,
    },
  };
}

function buildSetHeaderRowHttpNode(sheetId, position) {
  const encodedRange = encodeURIComponent(`${LEADS_SHEET}!A1:N1`);
  return {
    id: uid(),
    name: 'Set Header Row',
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.4,
    position,
    credentials: {
      googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
    },
    parameters: {
      method: 'PUT',
      url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodedRange}?valueInputOption=USER_ENTERED`,
      authentication: 'predefinedCredentialType',
      nodeCredentialType: 'googleSheetsOAuth2Api',
      sendBody: true,
      specifyBody: 'json',
      jsonBody: JSON.stringify({
        range: `${LEADS_SHEET}!A1:N1`,
        majorDimension: 'ROWS',
        values: [SHEET_HEADERS],
      }),
      options: {},
    },
  };
}

const BUILD_DELETE_TABLE_REQUESTS_JS = `const requests = [];
for (const sheet of ($input.first().json.sheets || [])) {
  for (const table of sheet.tables || []) {
    if (table.tableId) requests.push({ deleteTable: { tableId: table.tableId } });
  }
}
return [{ json: { requests, hasTables: requests.length > 0 } }];`;

function buildGetSpreadsheetMetaNode(sheetId, position) {
  return {
    id: uid(),
    name: 'Get Spreadsheet Meta',
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.4,
    position,
    credentials: {
      googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
    },
    parameters: {
      method: 'GET',
      url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets(properties.sheetId,tables(tableId))`,
      authentication: 'predefinedCredentialType',
      nodeCredentialType: 'googleSheetsOAuth2Api',
      options: {},
    },
  };
}

function buildDeleteTablesNode(sheetId, position) {
  return {
    id: uid(),
    name: 'Delete Tables',
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.4,
    position,
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
      jsonBody: '={{ ({ requests: $json.requests }) }}',
      options: {},
    },
  };
}

function buildWriteHeadersNode(sheetIdExpr, position) {
  return {
    id: uid(),
    name: 'Append Header Row',
    type: 'n8n-nodes-base.googleSheets',
    typeVersion: 4.7,
    position,
    credentials: {
      googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
    },
    parameters: {
      operation: 'append',
      documentId: {
        __rl: true,
        value: sheetIdExpr,
        mode: 'id',
      },
      sheetName: {
        __rl: true,
        value: LEADS_SHEET,
        mode: 'name',
        cachedResultName: LEADS_SHEET,
      },
      columns: {
        mappingMode: 'autoMapInputData',
        value: {},
        matchingColumns: [],
        schema: headerSchema(),
        attemptToConvertTypes: false,
        convertFieldsToString: false,
      },
      options: {},
    },
  };
}

const TRIGGER_AFTER_CLEAR_JS = `return [{ json: { _ok: true } }];`;

function buildPassHeadersNode(position) {
  return {
    id: uid(),
    name: 'Pass Headers Through',
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position,
    parameters: {
      mode: 'runOnceForAllItems',
      jsCode: TRIGGER_AFTER_CLEAR_JS,
    },
  };
}

function buildClearEntireSheetNode(sheetIdExpr, position) {
  return {
    id: uid(),
    name: 'Clear Sheet',
    type: 'n8n-nodes-base.googleSheets',
    typeVersion: 4.7,
    position,
    alwaysOutputData: true,
    credentials: {
      googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
    },
    parameters: {
      operation: 'clear',
      documentId: {
        __rl: true,
        value: sheetIdExpr,
        mode: 'id',
      },
      sheetName: {
        __rl: true,
        value: LEADS_SHEET,
        mode: 'name',
        cachedResultName: LEADS_SHEET,
      },
      clear: 'wholeSheet',
      options: {},
    },
  };
}

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
  const body = [...map.entries()].map(([k, v]) => `${k}=${v}`).join('\n') + '\n';
  writeFileSync(path, body);
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

async function fetchSerpApiKey() {
  const wf = await n8n('GET', `/workflows/${INBOUND_AUDIT_WORKFLOW_ID}`);
  const maps = wf.nodes?.find((n) => n.name === 'Maps Lookup');
  const url = maps?.parameters?.url || '';
  const m = String(url).match(/api_key=([a-f0-9]+)/i);
  if (!m) throw new Error('Could not extract SerpAPI key from inbound Maps Lookup node');
  return m[1];
}

function sheetRef(sheetId, sheetName = LEADS_SHEET) {
  return {
    documentId: {
      __rl: true,
      value: sheetId,
      mode: 'id',
    },
    sheetName: {
      __rl: true,
      value: sheetName,
      mode: 'name',
      cachedResultName: sheetName,
    },
  };
}

function headerSchema() {
  return SHEET_HEADERS.map((id) => ({
    id,
    displayName: id,
    required: false,
    defaultMatch: false,
    display: true,
    type: 'string',
    canBeUsedToMatch: true,
  }));
}

const MAP_SERP_RESULTS_JS = `// Reads the SerpAPI google_maps response; keeps rows matching the queued suburb.
const staticData = $getWorkflowStaticData('global');
const response = $input.first().json || {};
const COOLDOWN_MS = ${QUOTA_COOLDOWN_MS};

function isSerpQuota(body) {
  const msg = String(body?.error || body?.message || body?.description || '').toLowerCase();
  const code = Number(body?.statusCode || body?.status || body?.error?.code || 0);
  if (code === 429) return true;
  if (msg.includes('run out of searches') || msg.includes('out of searches')) return true;
  if (msg.includes('quota') || msg.includes('rate limit') || msg.includes('rate_limit')) return true;
  if (msg.includes('monthly searches') || msg.includes('account has run out')) return true;
  return false;
}

if (isSerpQuota(response)) {
  const streak = Number(staticData.quotaFailStreak || 0) + 1;
  staticData.quotaFailStreak = streak;
  staticData.quotaCooldownUntil = Date.now() + COOLDOWN_MS;
  const alert = streak >= 2 && !staticData.quotaAlertSent;
  if (alert) staticData.quotaAlertSent = true;
  const untilIso = new Date(staticData.quotaCooldownUntil).toISOString();
  return [{
    json: {
      _quotaHit: true,
      _alert: alert,
      _quotaStreak: streak,
      _cooldownUntil: untilIso,
      _quotaReason: String(response.error || response.message || 'SerpAPI quota'),
      _skipped: true,
      _noResults: true,
    },
  }];
}

// Healthy Serp response path — reset streak when we got a real payload shape.
if (response.local_results || response.place_results || Array.isArray(response.local_results)) {
  staticData.quotaFailStreak = 0;
  staticData.quotaAlertSent = false;
  staticData.quotaCooldownUntil = 0;
}

const results = response.local_results || (response.place_results ? [response.place_results] : []);
const targetSuburb = String($('Pick Queued Job').first().json._targetSuburb || '').trim().toLowerCase();

const MAX_ROWS = 20;

function parseSuburb(address) {
  const a = String(address || '');
  const nsw = a.match(/,\\s*([^,]+)\\s+NSW\\s+\\d{4}\\s*$/i);
  if (nsw) return nsw[1].trim();
  const vic = a.match(/,\\s*([^,]+)\\s+VIC\\s+\\d{4}\\s*$/i);
  if (vic) return vic[1].trim();
  return '';
}

function suburbMatch(parsed, target) {
  if (!target) return true;
  if (!parsed) return false;
  const p = parsed.toLowerCase();
  return p === target || p.includes(target) || target.includes(p);
}

const rows = results
  .filter((r) => r.website)
  .filter((r) => suburbMatch(parseSuburb(r.address), targetSuburb))
  .slice(0, MAX_ROWS)
  .map((r) => ({
    'Business Name': r.title || '',
    Suburb: parseSuburb(r.address),
    Address: r.address || '',
    Website: r.website || '',
    Phone: r.phone || '',
    Rating: r.rating || '',
    Reviews: r.reviews || '',
    'Maps ID': r.data_id || '',
    'Owner Name': '',
    Email: '',
    Status: 'New',
    'Audit Link': '',
    Emailed: '',
    Notes: '',
    _quotaHit: false,
    _alert: false,
  }));

if (!rows.length) {
  return [{ json: { _noResults: true, reason: 'No Maps results for this niche/suburb', _quotaHit: false, _alert: false } }];
}

return rows.map((row) => ({ json: row }));`;

const PICK_QUEUED_JOB_JS = `const staticData = $getWorkflowStaticData('global');
const SUBURB_COORDS = ${JSON.stringify(SUBURB_COORDS)};
const now = Date.now();

// Silent SerpAPI quota cooldown — schedule keeps firing, this run exits empty.
if (staticData.quotaCooldownUntil && now < staticData.quotaCooldownUntil) {
  return [];
}

const rows = $input.all()
  .map((item) => item.json)
  .filter((row) => {
    const niche = String(row.Niche || '').trim();
    return niche && niche !== 'Niche';
  });

const queued = rows.filter((row) => String(row.Status || '').trim().toLowerCase() === 'queued');
if (!queued.length) return [];

const job = queued[0];
const niche = String(job.Niche || '').trim();
const suburb = String(job.Suburb || '').trim();
if (!niche || !suburb) {
  return [{
    json: {
      ...job,
      _skip: true,
      reason: 'Queued row needs both Niche and Suburb',
    },
  }];
}

const queueKey = String(job['Queue Key'] || '').trim() || (niche + '|' + suburb).toLowerCase();
const coords = SUBURB_COORDS[suburb.toLowerCase()];
const ll = coords
  ? ('@' + coords[0] + ',' + coords[1] + ',14z')
  : '@-33.8688,151.2093,12z';

return [{
  json: {
    ...job,
    'Queue Key': queueKey,
    Status: 'Running',
    _searchQuery: niche + ' ' + suburb + ' NSW',
    _ll: ll,
    _targetSuburb: suburb,
    _skip: false,
  },
}];`;

const FINISH_QUEUE_JOB_JS = `const job = $('Pick Queued Job').first().json;
let added = 0;
let quotaHit = false;
let cooldownUntil = '';
let quotaReason = '';
try {
  const mapItems = $('Map SerpAPI Results').all().map((item) => item.json);
  quotaHit = mapItems.some((row) => row._quotaHit);
  const q = mapItems.find((row) => row._quotaHit);
  if (q) {
    cooldownUntil = q._cooldownUntil || '';
    quotaReason = q._quotaReason || 'SerpAPI quota';
  }
} catch (e) {
  // Map node may not have run
}
try {
  if (!quotaHit) {
    added = $('Dedup New Rows').all()
      .map((item) => item.json)
      .filter((row) => !row._skipped).length;
  }
} catch (e) {
  added = 0;
}

const failed = Boolean(job._skip);
let status = 'Done';
let notes = job.Notes || '';
if (quotaHit) {
  // Re-queue so the same niche/suburb retries after cooldown.
  status = 'Queued';
  notes = 'Quota cooldown until ' + cooldownUntil + (quotaReason ? (' — ' + quotaReason) : '');
} else if (failed) {
  status = 'Failed';
  notes = job.reason || job.Notes || '';
}

return [{
  json: {
    row_number: job.row_number,
    'Queue Key': job['Queue Key'] || '',
    Niche: job.Niche || '',
    Suburb: job.Suburb || '',
    Status: status,
    'Rows Added': String(added),
    'Last Run': new Date().toISOString().slice(0, 19).replace('T', ' '),
    Notes: notes,
    _quotaHit: quotaHit,
    _alert: false,
  },
}];`;

const FINISH_QUOTA_JOB_JS = `const job = $('Pick Queued Job').first().json;
const map = $('Map SerpAPI Results').first().json || {};
return [{
  json: {
    row_number: job.row_number,
    'Queue Key': job['Queue Key'] || '',
    Niche: job.Niche || '',
    Suburb: job.Suburb || '',
    Status: 'Queued',
    'Rows Added': '0',
    'Last Run': new Date().toISOString().slice(0, 19).replace('T', ' '),
    Notes: 'Quota cooldown until ' + (map._cooldownUntil || '') + (map._quotaReason ? (' — ' + map._quotaReason) : ''),
    _quotaHit: true,
    _alert: Boolean(map._alert),
    _quotaStreak: map._quotaStreak || 0,
    _cooldownUntil: map._cooldownUntil || '',
    _quotaReason: map._quotaReason || 'SerpAPI quota',
  },
}];`;

const EXTRACT_CONTACTS_HELPER = `function jinaText(j) {
  return String(j?.data || j?.content || j?.text || JSON.stringify(j || {}));
}

function pickEmail(emails) {
  const blocked = [
    'sentry.io', 'wixpress.com', 'example.com', 'google.com', 'facebook.com',
    'instagram.com', 'wordpress.org', 'cloudflare.com', 'schema.org', 'w3.org',
    'gravatar.com', 'domain.com', 'email.com', 'yourname@', 'name@example',
    '.png', '.jpg', '.webp', '.gif', 'noreply', 'no-reply', 'donotreply',
  ];
  const good = [...new Set(emails)].filter((e) => {
    const lower = e.toLowerCase();
    return lower.includes('@') && !blocked.some((b) => lower.includes(b));
  });
  const prefs = ['info@', 'contact@', 'hello@', 'enquir', 'reception@', 'admin@', 'office@', 'appoint'];
  for (const p of prefs) {
    const hit = good.find((e) => e.toLowerCase().includes(p.replace('@', '')));
    if (hit) return hit;
  }
  return good[0] || '';
}

function extractFromText(text) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g;
  const emails = text.match(emailRegex) || [];
  const email = pickEmail(emails);
  let owner = '';
  const dr = text.match(/\\bDr\\.?\\s+([A-Z][a-z]+(?:\\s+[A-Z][a-z]+)?)/);
  if (dr) owner = dr[1].trim();
  if (!owner) {
    const principal = text.match(/\\b(?:Principal|Owner|Director)\\s*:?\\s+([A-Z][a-z]+(?:\\s+[A-Z][a-z]+)?)/i);
    if (principal) owner = principal[1].trim();
  }
  return { email, owner };
}`;

const PARSE_HOMEPAGE_JS = `${EXTRACT_CONTACTS_HELPER}
const row = { ...$('Has Rows To Append').item.json };
const found = extractFromText(jinaText($input.item.json));
if (found.email) row.Email = found.email;
if (found.owner) row['Owner Name'] = found.owner;
row.Notes = found.email ? 'email:homepage' : 'email:not-found-homepage';
return { json: row };`;

const PARSE_CONTACT_JS = `${EXTRACT_CONTACTS_HELPER}
const row = { ...$('Parse Homepage Contacts').item.json };
const found = extractFromText(jinaText($input.item.json));
if (found.email && !row.Email) row.Email = found.email;
if (found.owner && !row['Owner Name']) row['Owner Name'] = found.owner;
if (found.email && !String($('Parse Homepage Contacts').item.json.Email || '').trim()) {
  row.Notes = 'email:contact-page';
}
return { json: row };`;

const JINA_HOMEPAGE_URL = `={{ (() => {
  let u = ($json.Website || '').trim();
  if (!u) return 'https://r.jina.ai/https://example.com';
  if (!/^https?:/i.test(u)) u = 'https://' + u;
  return 'https://r.jina.ai/' + u;
})() }}`;

const JINA_CONTACT_URL = `={{ (() => {
  let u = ($('Has Rows To Append').item.json.Website || '').trim().replace(/\\/$/, '');
  if (!/^https?:/i.test(u)) u = 'https://' + u;
  return 'https://r.jina.ai/' + u + '/contact';
})() }}`;

const FILTER_NEEDS_EMAIL_JS = `return $input.all()
  .map((item) => item.json)
  .filter((row) => String(row['Business Name'] || '').trim() && row['Business Name'] !== 'Business Name')
  .filter((r) => (r.Website || '').trim() && !(r.Email || '').trim() && (r['Maps ID'] || '').trim())
  .map((row) => ({ json: row }));`;

const DEDUP_ROWS_JS = `const mapped = $('Map SerpAPI Results').all().map((item) => item.json);
if (mapped.length === 1 && mapped[0]._noResults) {
  return [{ json: { _skipped: true, reason: mapped[0].reason || 'No Maps results' } }];
}

const newRows = mapped.filter((row) => !row._noResults);
const existingIds = new Set(
  $('Read Sheet For Dedup').all()
    .map((item) => item.json)
    .filter((row) => String(row['Business Name'] || '').trim() && row['Business Name'] !== 'Business Name')
    .map((row) => String(row['Maps ID'] || '').trim())
    .filter(Boolean)
);

const fresh = newRows.filter((row) => {
  const mapsId = String(row['Maps ID'] || '').trim();
  return mapsId && !existingIds.has(mapsId);
});

if (!fresh.length) {
  return [{ json: { _skipped: true, reason: 'No new rows (all Maps IDs already in sheet)' } }];
}

return fresh.map((row) => ({ json: row }));`;

const TRIGGER_READ_ONCE_JS = `// Collapse mapped rows to a single item so the sheet read runs once.
return [{ json: { _triggerRead: true } }];`;

const PARSE_HOMEPAGE_BACKFILL_JS = PARSE_HOMEPAGE_JS.replaceAll(
  "$('Has Rows To Append')",
  "$('Rows To Scrape')",
);
const PARSE_CONTACT_BACKFILL_JS = PARSE_CONTACT_JS;
const JINA_CONTACT_URL_BACKFILL = JINA_CONTACT_URL.replaceAll(
  "$('Has Rows To Append')",
  "$('Rows To Scrape')",
);

function buildWebsiteScrapeNodes({
  rowSourceNode,
  appendNode,
  parseHomeJs = PARSE_HOMEPAGE_JS,
  parseContactJs = PARSE_CONTACT_JS,
  jinaContactUrl = JINA_CONTACT_URL,
}) {
  const waitHomeId = uid();
  const jinaHomeId = uid();
  const parseHomeId = uid();
  const ifContactId = uid();
  const waitContactId = uid();
  const jinaContactId = uid();
  const parseContactId = uid();

  const nodes = [
    {
      id: waitHomeId,
      name: 'Wait Before Homepage',
      type: 'n8n-nodes-base.wait',
      typeVersion: 1.1,
      position: [600, 0],
      parameters: { amount: 1 },
    },
    {
      id: jinaHomeId,
      name: 'Jina Homepage',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.4,
      position: [720, 0],
      onError: 'continueRegularOutput',
      parameters: { url: JINA_HOMEPAGE_URL, options: { timeout: 30000 } },
    },
    {
      id: parseHomeId,
      name: 'Parse Homepage Contacts',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [960, 0],
      parameters: { mode: 'runOnceForEachItem', jsCode: parseHomeJs },
    },
    {
      id: ifContactId,
      name: 'Needs Contact Page',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [1200, 0],
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3 },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json.Email }}',
              rightValue: '',
              operator: { type: 'string', operation: 'empty' },
            },
          ],
          combinator: 'and',
        },
        looseTypeValidation: true,
        options: {},
      },
    },
    {
      id: waitContactId,
      name: 'Wait Before Contact',
      type: 'n8n-nodes-base.wait',
      typeVersion: 1.1,
      position: [1320, 160],
      parameters: { amount: 2 },
    },
    {
      id: jinaContactId,
      name: 'Jina Contact Page',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.4,
      position: [1440, 160],
      onError: 'continueRegularOutput',
      parameters: { url: jinaContactUrl, options: { timeout: 30000 } },
    },
    {
      id: parseContactId,
      name: 'Parse Contact Page',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1680, 160],
      parameters: { mode: 'runOnceForEachItem', jsCode: parseContactJs },
    },
  ];

  const connections = {
    [rowSourceNode]: { main: [[{ node: 'Wait Before Homepage', type: 'main', index: 0 }]] },
    'Wait Before Homepage': { main: [[{ node: 'Jina Homepage', type: 'main', index: 0 }]] },
    'Jina Homepage': { main: [[{ node: 'Parse Homepage Contacts', type: 'main', index: 0 }]] },
    'Parse Homepage Contacts': { main: [[{ node: 'Needs Contact Page', type: 'main', index: 0 }]] },
    'Needs Contact Page': {
      main: [
        [{ node: 'Wait Before Contact', type: 'main', index: 0 }],
        [{ node: appendNode, type: 'main', index: 0 }],
      ],
    },
    'Wait Before Contact': { main: [[{ node: 'Jina Contact Page', type: 'main', index: 0 }]] },
    'Jina Contact Page': { main: [[{ node: 'Parse Contact Page', type: 'main', index: 0 }]] },
    'Parse Contact Page': { main: [[{ node: appendNode, type: 'main', index: 0 }]] },
  };

  return { nodes, connections };
}

function queueHeaderSchema() {
  return QUEUE_HEADERS.map((id) => ({
    id,
    displayName: id,
    required: false,
    defaultMatch: false,
    display: true,
    type: 'string',
    canBeUsedToMatch: id === 'Queue Key' || id === 'row_number',
  }));
}

function buildListBuilderWorkflow(serpApiKey, sheetId, { includeTestWebhook = false } = {}) {
  const scheduleId = uid();
  const manualId = uid();
  const webhookId = uid();
  const readQueueId = uid();
  const pickId = uid();
  const hasJobId = uid();
  const markRunningId = uid();
  const serpId = uid();
  const mapId = uid();
  const ifQuotaId = uid();
  const finishQuotaId = uid();
  const ifAlertId = uid();
  const notifyId = uid();
  const triggerReadId = uid();
  const readId = uid();
  const dedupId = uid();
  const skipIfId = uid();
  const appendId = uid();
  const finishId = uid();
  const markDoneId = uid();
  const guideId = uid();

  const nodes = [
    {
      id: scheduleId,
      name: 'Every 10 Minutes',
      type: 'n8n-nodes-base.scheduleTrigger',
      typeVersion: 1.2,
      position: [-1080, -80],
      parameters: {
        rule: {
          interval: [{ field: 'minutes', minutesInterval: 10 }],
        },
      },
    },
    {
      id: manualId,
      name: 'Manual Trigger',
      type: 'n8n-nodes-base.manualTrigger',
      typeVersion: 1,
      position: [-1080, 120],
      parameters: {},
    },
    ...(includeTestWebhook
      ? [
          {
            id: webhookId,
            name: 'Test Webhook',
            type: 'n8n-nodes-base.webhook',
            typeVersion: 2.1,
            position: [-1080, 280],
            parameters: {
              path: 'sysbilt-outbound-list-test',
              httpMethod: 'POST',
              options: {},
            },
            webhookId: 'sysbilt-outbound-list-test',
          },
        ]
      : []),
    {
      id: readQueueId,
      name: 'Read Run Queue',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-840, 0],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId, QUEUE_SHEET),
        options: {
          dataLocationOnSheet: {
            values: {
              rangeDefinition: 'specifyRangeA1',
              range: QUEUE_DATA_RANGE,
            },
          },
        },
      },
    },
    {
      id: pickId,
      name: 'Pick Queued Job',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-600, 0],
      parameters: {
        mode: 'runOnceForAllItems',
        jsCode: PICK_QUEUED_JOB_JS,
      },
    },
    {
      id: hasJobId,
      name: 'Has Queued Job',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [-360, 0],
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3 },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json._skip }}',
              rightValue: true,
              operator: { type: 'boolean', operation: 'notEquals' },
            },
            {
              id: uid(),
              leftValue: '={{ $json._searchQuery }}',
              rightValue: '',
              operator: { type: 'string', operation: 'notEmpty' },
            },
          ],
          combinator: 'and',
        },
        looseTypeValidation: true,
        options: {},
      },
    },
    {
      id: markRunningId,
      name: 'Mark Queue Running',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-120, 0],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'update',
        ...sheetRef(sheetId, QUEUE_SHEET),
        columns: {
          mappingMode: 'defineBelow',
          value: {
            row_number: '={{ $json.row_number }}',
            'Queue Key': '={{ $json["Queue Key"] }}',
            Niche: '={{ $json.Niche }}',
            Suburb: '={{ $json.Suburb }}',
            Status: 'Running',
            'Rows Added': '={{ $json["Rows Added"] || "" }}',
            'Last Run': '={{ $json["Last Run"] || "" }}',
            Notes: '={{ $json.Notes || "" }}',
          },
          matchingColumns: ['row_number'],
          schema: [
            ...queueHeaderSchema(),
            {
              id: 'row_number',
              displayName: 'row_number',
              required: false,
              defaultMatch: true,
              display: true,
              type: 'number',
              canBeUsedToMatch: true,
            },
          ],
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: {},
      },
    },
    {
      id: serpId,
      name: 'SerpAPI Maps Search',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.4,
      position: [120, 0],
      onError: 'continueRegularOutput',
      parameters: {
        method: 'GET',
        url: 'https://serpapi.com/search.json',
        sendQuery: true,
        queryParameters: {
          parameters: [
            { name: 'engine', value: 'google_maps' },
            {
              name: 'q',
              value: "={{ $('Pick Queued Job').item.json._searchQuery }}",
            },
            {
              name: 'll',
              value: "={{ $('Pick Queued Job').item.json._ll }}",
            },
            { name: 'google_domain', value: 'google.com.au' },
            { name: 'gl', value: 'au' },
            { name: 'hl', value: 'en' },
            { name: 'type', value: 'search' },
            { name: 'api_key', value: serpApiKey },
          ],
        },
        options: {},
      },
    },
    {
      id: mapId,
      name: 'Map SerpAPI Results',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [360, 0],
      parameters: {
        mode: 'runOnceForAllItems',
        jsCode: MAP_SERP_RESULTS_JS,
      },
    },
    {
      id: ifQuotaId,
      name: 'Quota Hit',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [560, 0],
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
      id: finishQuotaId,
      name: 'Finish Quota Job',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [760, 160],
      parameters: {
        mode: 'runOnceForAllItems',
        jsCode: FINISH_QUOTA_JOB_JS,
      },
    },
    {
      id: ifAlertId,
      name: 'Should Alert Quota',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [960, 160],
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
      id: notifyId,
      name: 'Quota Alert Email',
      type: 'n8n-nodes-base.gmail',
      typeVersion: 2.1,
      position: [1160, 80],
      credentials: {
        gmailOAuth2: { id: GMAIL_CRED_ID, name: GMAIL_CRED_NAME },
      },
      parameters: {
        sendTo: NOTIFY_EMAIL,
        subject: '=Outbound List Builder: SerpAPI quota failed twice',
        message: `=SerpAPI hit quota again after a 24h pause.<br><br>
Niche: {{ $json.Niche }} · Suburb: {{ $json.Suburb }}<br>
Streak: {{ $json._quotaStreak }}<br>
Cooldown until: {{ $json._cooldownUntil }}<br>
Reason: {{ $json._quotaReason }}<br><br>
Run Queue row was set back to Queued. Workflow will retry automatically after the pause.`,
        options: {},
      },
    },
    {
      id: triggerReadId,
      name: 'Trigger Read Once',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [760, -80],
      parameters: {
        mode: 'runOnceForAllItems',
        jsCode: TRIGGER_READ_ONCE_JS,
      },
    },
    {
      id: readId,
      name: 'Read Sheet For Dedup',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [840, 0],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId, LEADS_SHEET),
        options: {
          dataLocationOnSheet: {
            values: {
              rangeDefinition: 'specifyRangeA1',
              range: SHEET_DATA_RANGE,
            },
          },
        },
      },
    },
    {
      id: dedupId,
      name: 'Dedup New Rows',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1080, 0],
      parameters: {
        mode: 'runOnceForAllItems',
        jsCode: DEDUP_ROWS_JS,
      },
    },
    {
      id: skipIfId,
      name: 'Has Rows To Append',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [1320, 0],
      parameters: {
        conditions: {
          options: {
            caseSensitive: true,
            leftValue: '',
            typeValidation: 'loose',
            version: 3,
          },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json._skipped }}',
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
      id: appendId,
      name: 'Append To Sheet',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [2520, 0],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'append',
        ...sheetRef(sheetId, LEADS_SHEET),
        columns: {
          mappingMode: 'autoMapInputData',
          value: {},
          matchingColumns: [],
          schema: headerSchema(),
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: {
          useAppend: true,
        },
      },
    },
    {
      id: finishId,
      name: 'Finish Queue Job',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [2760, 80],
      parameters: {
        mode: 'runOnceForAllItems',
        jsCode: FINISH_QUEUE_JOB_JS,
      },
    },
    {
      id: uid(),
      name: 'Wait Before Mark Done',
      type: 'n8n-nodes-base.wait',
      typeVersion: 1.1,
      position: [2920, 80],
      parameters: {
        amount: 8,
        unit: 'seconds',
      },
    },
    {
      id: markDoneId,
      name: 'Mark Queue Done',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [3120, 80],
      // Sheets rate-limits after append+homepage scrapes; without retry the row stays Running forever.
      retryOnFail: true,
      maxTries: 5,
      waitBetweenTries: 10000,
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'update',
        ...sheetRef(sheetId, QUEUE_SHEET),
        columns: {
          mappingMode: 'defineBelow',
          value: {
            row_number: '={{ $json.row_number }}',
            'Queue Key': '={{ $json["Queue Key"] }}',
            Niche: '={{ $json.Niche }}',
            Suburb: '={{ $json.Suburb }}',
            Status: '={{ $json.Status }}',
            'Rows Added': '={{ $json["Rows Added"] }}',
            'Last Run': '={{ $json["Last Run"] }}',
            Notes: '={{ $json.Notes }}',
          },
          matchingColumns: ['row_number'],
          schema: [
            ...queueHeaderSchema(),
            {
              id: 'row_number',
              displayName: 'row_number',
              required: false,
              defaultMatch: true,
              display: true,
              type: 'number',
              canBeUsedToMatch: true,
            },
          ],
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: {},
      },
    },
    {
      id: guideId,
      name: 'Workflow Guide',
      type: 'n8n-nodes-base.stickyNote',
      typeVersion: 1,
      position: [-1080, 400],
      parameters: {
        width: 520,
        height: 360,
        color: 4,
        content: `## Outbound List Builder (A)

**How to run a scrape**
1. Open the **Run Queue** tab
2. Add Niche + Suburb
3. Set Status = **Queued**
4. Wait up to 10 min (or Manual Trigger)

One Queued job per run. Results append to **Master Leads**.

**If Status sticks on Running**
The scrape often already worked. Check Master Leads. Set that row to Done by hand (do not re-Queue or you may duplicate). Mark Done now retries Sheets rate limits.

**SerpAPI quota**
Silent 24h pause, job stays Queued. Email only if it fails again after the pause.

**Related**
→ Contact Scrape (A2) backfills emails
→ Speed Fix Scorer reads **Master Leads**`,
      },
    },
  ];

  const scrape = buildWebsiteScrapeNodes({
    rowSourceNode: 'Has Rows To Append',
    appendNode: 'Append To Sheet',
  });
  // Shift scrape nodes right so they sit between Has Rows and Finish
  for (const n of scrape.nodes) {
    n.position = [n.position[0] + 720, n.position[1]];
  }
  nodes.push(...scrape.nodes);

  const connections = {
    'Every 10 Minutes': { main: [[{ node: 'Read Run Queue', type: 'main', index: 0 }]] },
    'Manual Trigger': { main: [[{ node: 'Read Run Queue', type: 'main', index: 0 }]] },
    ...(includeTestWebhook
      ? { 'Test Webhook': { main: [[{ node: 'Read Run Queue', type: 'main', index: 0 }]] } }
      : {}),
    'Read Run Queue': { main: [[{ node: 'Pick Queued Job', type: 'main', index: 0 }]] },
    'Pick Queued Job': { main: [[{ node: 'Has Queued Job', type: 'main', index: 0 }]] },
    'Has Queued Job': {
      main: [
        [{ node: 'Mark Queue Running', type: 'main', index: 0 }],
        [{ node: 'Finish Queue Job', type: 'main', index: 0 }],
      ],
    },
    'Mark Queue Running': { main: [[{ node: 'SerpAPI Maps Search', type: 'main', index: 0 }]] },
    'SerpAPI Maps Search': { main: [[{ node: 'Map SerpAPI Results', type: 'main', index: 0 }]] },
    'Map SerpAPI Results': { main: [[{ node: 'Quota Hit', type: 'main', index: 0 }]] },
    'Quota Hit': {
      main: [
        [{ node: 'Finish Quota Job', type: 'main', index: 0 }],
        [{ node: 'Trigger Read Once', type: 'main', index: 0 }],
      ],
    },
    'Finish Quota Job': { main: [[{ node: 'Should Alert Quota', type: 'main', index: 0 }]] },
    'Should Alert Quota': {
      main: [
        [{ node: 'Quota Alert Email', type: 'main', index: 0 }],
        [{ node: 'Wait Before Mark Done', type: 'main', index: 0 }],
      ],
    },
    'Quota Alert Email': { main: [[{ node: 'Wait Before Mark Done', type: 'main', index: 0 }]] },
    'Trigger Read Once': { main: [[{ node: 'Read Sheet For Dedup', type: 'main', index: 0 }]] },
    'Read Sheet For Dedup': { main: [[{ node: 'Dedup New Rows', type: 'main', index: 0 }]] },
    'Dedup New Rows': { main: [[{ node: 'Has Rows To Append', type: 'main', index: 0 }]] },
    'Has Rows To Append': {
      main: [
        scrape.connections['Has Rows To Append'].main[0],
        [{ node: 'Finish Queue Job', type: 'main', index: 0 }],
      ],
    },
    ...Object.fromEntries(
      Object.entries(scrape.connections).filter(([k]) => k !== 'Has Rows To Append'),
    ),
    'Append To Sheet': { main: [[{ node: 'Finish Queue Job', type: 'main', index: 0 }]] },
    'Finish Queue Job': { main: [[{ node: 'Wait Before Mark Done', type: 'main', index: 0 }]] },
    'Wait Before Mark Done': { main: [[{ node: 'Mark Queue Done', type: 'main', index: 0 }]] },
  };

  return {
    name: 'SYSBILT - Outbound List Builder',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  };
}

function buildContactScrapeWorkflow(sheetId) {
  const manualId = uid();
  const readId = uid();
  const filterId = uid();
  const updateId = uid();

  const nodes = [
    {
      id: manualId,
      name: 'Manual Trigger',
      type: 'n8n-nodes-base.manualTrigger',
      typeVersion: 1,
      position: [-720, 200],
      parameters: {},
    },
    {
      id: readId,
      name: 'Read Sheet Rows',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-480, 200],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId),
        options: {
          dataLocationOnSheet: {
            values: {
              rangeDefinition: 'specifyRangeA1',
              range: SHEET_DATA_RANGE,
            },
          },
        },
      },
    },
    {
      id: filterId,
      name: 'Rows To Scrape',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-240, 200],
      parameters: {
        mode: 'runOnceForAllItems',
        jsCode: FILTER_NEEDS_EMAIL_JS,
      },
    },
    {
      id: updateId,
      name: 'Update Sheet Row',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [2160, 200],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'appendOrUpdate',
        ...sheetRef(sheetId),
        columns: {
          mappingMode: 'autoMapInputData',
          value: {},
          matchingColumns: ['Maps ID'],
          schema: headerSchema().map((col) => ({
            ...col,
            canBeUsedToMatch: col.id === 'Maps ID',
          })),
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: { useAppend: false },
      },
    },
  ];

  const scrape = buildWebsiteScrapeNodes({
    rowSourceNode: 'Rows To Scrape',
    appendNode: 'Update Sheet Row',
    parseHomeJs: PARSE_HOMEPAGE_BACKFILL_JS,
    parseContactJs: PARSE_CONTACT_BACKFILL_JS,
    jinaContactUrl: JINA_CONTACT_URL_BACKFILL,
  });
  nodes.push(...scrape.nodes);

  const connections = {
    'Manual Trigger': { main: [[{ node: 'Read Sheet Rows', type: 'main', index: 0 }]] },
    'Read Sheet Rows': { main: [[{ node: 'Rows To Scrape', type: 'main', index: 0 }]] },
    ...scrape.connections,
  };

  return {
    name: 'SYSBILT - Outbound Contact Scrape',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  };
}

function buildSheetSetupWorkflow() {
  const webhookId = uid();
  const createId = uid();
  const headerCodeId = uid();
  const headersId = uid();
  const respondId = uid();
  const headerCode = buildHeaderRowNode([-320, 0]);
  headerCode.id = headerCodeId;
  const writeHeaders = buildWriteHeadersNode('={{ $("Create Spreadsheet").item.json.spreadsheetId }}', [-80, 0]);
  headersId && (writeHeaders.id = headersId);

  const nodes = [
    {
      id: webhookId,
      name: 'Setup Webhook',
      type: 'n8n-nodes-base.webhook',
      typeVersion: 2.1,
      position: [-640, 0],
      parameters: {
        path: 'sysbilt-outbound-sheet-setup',
        httpMethod: 'POST',
        responseMode: 'responseNode',
        options: {},
      },
      webhookId: 'sysbilt-outbound-sheet-setup',
    },
    {
      id: createId,
      name: 'Create Spreadsheet',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-480, 0],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        resource: 'spreadsheet',
        operation: 'create',
        title: 'SYSBILT Outbound Leads',
        options: {},
      },
    },
    headerCode,
    writeHeaders,
    {
      id: respondId,
      name: 'Respond With Sheet URL',
      type: 'n8n-nodes-base.respondToWebhook',
      typeVersion: 1.1,
      position: [160, 0],
      parameters: {
        respondWith: 'json',
        responseBody: '={{ ({ spreadsheetId: $("Create Spreadsheet").item.json.spreadsheetId, spreadsheetUrl: $("Create Spreadsheet").item.json.spreadsheetUrl }) }}',
        options: {},
      },
    },
  ];

  const connections = {
    'Setup Webhook': { main: [[{ node: 'Create Spreadsheet', type: 'main', index: 0 }]] },
    'Create Spreadsheet': { main: [[{ node: 'Build Header Row', type: 'main', index: 0 }]] },
    'Build Header Row': { main: [[{ node: 'Append Header Row', type: 'main', index: 0 }]] },
    'Append Header Row': { main: [[{ node: 'Respond With Sheet URL', type: 'main', index: 0 }]] },
  };

  return {
    name: 'SYSBILT - Outbound Sheet Setup',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  };
}

async function findWorkflowByName(name) {
  const { data } = await n8n('GET', '/workflows?limit=250');
  return data?.find((w) => w.name === name);
}

async function clearWorkflowPinData(workflowId) {
  const wf = await n8n('GET', `/workflows/${workflowId}`);
  if (!wf.pinData || !Object.keys(wf.pinData).length) return;
  const res = await fetch(`${N8N_BASE}/api/v1/workflows/${workflowId}`, {
    method: 'PATCH',
    headers: { 'X-N8N-API-KEY': N8N_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ pinData: {} }),
  });
  if (res.ok) {
    console.log('Cleared pinned test data on workflow');
    return;
  }
  await n8n('PUT', `/workflows/${workflowId}`, {
    name: wf.name,
    nodes: wf.nodes,
    connections: wf.connections,
    settings: wf.settings,
  });
  console.log('Pinned data may still exist — clear manually in n8n UI if needed');
}

async function upsertWorkflow(workflow, { activate = false } = {}) {
  const existing = await findWorkflowByName(workflow.name);
  const body = {
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings: workflow.settings,
  };
  let result;
  if (existing) {
    result = await n8n('PUT', `/workflows/${existing.id}`, body);
    await clearWorkflowPinData(existing.id);
    console.log(`Updated workflow "${workflow.name}" (${result.id})`);
  } else {
    result = await n8n('POST', '/workflows', body);
    console.log(`Created workflow "${workflow.name}" (${result.id})`);
  }
  if (activate && !result.active) {
    await n8n('POST', `/workflows/${result.id}/activate`, {});
    console.log(`Activated workflow "${workflow.name}"`);
  }
  return result;
}

function buildHeadersOnlyWorkflow(sheetId) {
  const webhookId = uid();
  const respondId = uid();
  const buildDeleteId = uid();
  const hasTablesIfId = uid();
  const getMeta = buildGetSpreadsheetMetaNode(sheetId, [-360, 0]);
  const deleteTables = buildDeleteTablesNode(sheetId, [120, 0]);
  const clearSheet = buildClearEntireSheetNode(sheetId, [360, 0]);
  const setHeaders = buildSetHeaderRowHttpNode(sheetId, [600, 0]);

  const nodes = [
    {
      id: webhookId,
      name: 'Headers Webhook',
      type: 'n8n-nodes-base.webhook',
      typeVersion: 2.1,
      position: [-640, 0],
      parameters: {
        path: 'sysbilt-outbound-sheet-headers',
        httpMethod: 'POST',
        responseMode: 'responseNode',
        options: {},
      },
      webhookId: 'sysbilt-outbound-sheet-headers',
    },
    getMeta,
    {
      id: buildDeleteId,
      name: 'Build Delete Table Requests',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-120, 0],
      parameters: {
        mode: 'runOnceForAllItems',
        jsCode: BUILD_DELETE_TABLE_REQUESTS_JS,
      },
    },
    {
      id: hasTablesIfId,
      name: 'Has Tables',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [0, 0],
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3 },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json.hasTables }}',
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
    deleteTables,
    clearSheet,
    setHeaders,
    {
      id: respondId,
      name: 'Respond OK',
      type: 'n8n-nodes-base.respondToWebhook',
      typeVersion: 1.1,
      position: [840, 0],
      parameters: {
        respondWith: 'json',
        responseBody: '={{ ({ ok: true, spreadsheetId: "' + sheetId + '" }) }}',
        options: {},
      },
    },
  ];

  return {
    name: 'SYSBILT - Outbound Sheet Headers',
    nodes,
    connections: {
      'Headers Webhook': { main: [[{ node: 'Get Spreadsheet Meta', type: 'main', index: 0 }]] },
      'Get Spreadsheet Meta': { main: [[{ node: 'Build Delete Table Requests', type: 'main', index: 0 }]] },
      'Build Delete Table Requests': { main: [[{ node: 'Has Tables', type: 'main', index: 0 }]] },
      'Has Tables': {
        main: [
          [{ node: 'Delete Tables', type: 'main', index: 0 }],
          [{ node: 'Clear Sheet', type: 'main', index: 0 }],
        ],
      },
      'Delete Tables': { main: [[{ node: 'Clear Sheet', type: 'main', index: 0 }]] },
      'Clear Sheet': { main: [[{ node: 'Set Header Row', type: 'main', index: 0 }]] },
      'Set Header Row': { main: [[{ node: 'Respond OK', type: 'main', index: 0 }]] },
    },
    settings: { executionOrder: 'v1' },
  };
}

async function runWebhookSetup(path, workflow) {
  const wf = await upsertWorkflow(workflow);
  await n8n('POST', `/workflows/${wf.id}/activate`, {});
  // Brief wait so n8n registers the webhook
  await new Promise((r) => setTimeout(r, 1500));
  const res = await fetch(`${N8N_BASE}/webhook/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'deploy-outbound-list-builder' }),
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
    // non-fatal
  }
  if (!res.ok) throw new Error(`Webhook ${path} failed: ${res.status} ${JSON.stringify(data)}`);
  return { data, workflowId: wf.id };
}

const ENSURE_MASTER_QUEUE_JS = `const meta = $input.first().json;
const sheets = meta.sheets || [];
const requests = [];

const sheet1 = sheets.find((s) => s.properties?.title === 'Sheet1');
const master = sheets.find((s) => s.properties?.title === 'Master Leads');
if (sheet1 && !master) {
  requests.push({
    updateSheetProperties: {
      properties: { sheetId: sheet1.properties.sheetId, title: 'Master Leads' },
      fields: 'title',
    },
  });
}

const queue = sheets.find((s) => s.properties?.title === 'Run Queue');
if (!queue) {
  requests.push({
    addSheet: { properties: { title: 'Run Queue', index: 0 } },
  });
}

return [{ json: { requests, hasRequests: requests.length > 0 } }];`;

function buildMasterMigrateWorkflow(sheetId) {
  const webhookId = uid();
  const getMetaId = uid();
  const ensureId = uid();
  const batchId = uid();
  const setQueueHeadersId = uid();
  const seedId = uid();
  const respondId = uid();

  return {
    name: 'SYSBILT - Outbound Master + Queue Setup',
    nodes: [
      {
        id: webhookId,
        name: 'Setup Webhook',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2.1,
        position: [-600, 0],
        parameters: {
          path: 'sysbilt-outbound-master-queue',
          httpMethod: 'POST',
          responseMode: 'responseNode',
          options: {},
        },
        webhookId: 'sysbilt-outbound-master-queue',
      },
      {
        id: getMetaId,
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
        id: ensureId,
        name: 'Ensure Master And Queue',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [-120, 0],
        parameters: { mode: 'runOnceForAllItems', jsCode: ENSURE_MASTER_QUEUE_JS },
      },
      {
        id: uid(),
        name: 'Has Sheet Changes',
        type: 'n8n-nodes-base.if',
        typeVersion: 2.3,
        position: [0, 0],
        parameters: {
          conditions: {
            options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3 },
            conditions: [
              {
                id: uid(),
                leftValue: '={{ $json.hasRequests }}',
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
        id: batchId,
        name: 'Apply Sheet Changes',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [200, -80],
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
          jsonBody: '={{ JSON.stringify({ requests: $json.requests || [] }) }}',
          options: {},
        },
      },
      {
        id: setQueueHeadersId,
        name: 'Set Run Queue Headers',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [440, 0],
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        parameters: {
          method: 'PUT',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent('Run Queue!A1:G1')}?valueInputOption=USER_ENTERED`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: JSON.stringify({
            range: 'Run Queue!A1:G1',
            majorDimension: 'ROWS',
            values: [QUEUE_HEADERS],
          }),
          options: {},
        },
      },
      {
        id: seedId,
        name: 'Seed Run Queue Hint',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [680, 0],
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        parameters: {
          method: 'PUT',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent('Run Queue!A2:G2')}?valueInputOption=USER_ENTERED`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: JSON.stringify({
            range: 'Run Queue!A2:G2',
            majorDimension: 'ROWS',
            values: [
              [
                '',
                'Dentists',
                'Marrickville',
                '',
                '',
                '',
                'Example row: set Status to Queued to scrape. Leave Queue Key blank.',
              ],
            ],
          }),
          options: {},
        },
      },
      {
        id: respondId,
        name: 'Respond OK',
        type: 'n8n-nodes-base.respondToWebhook',
        typeVersion: 1.1,
        position: [920, 0],
        parameters: {
          respondWith: 'json',
          responseBody: `={{ ({ ok: true, spreadsheetId: "${sheetId}", leadsSheet: "Master Leads", queueSheet: "Run Queue" }) }}`,
          options: {},
        },
      },
    ],
    connections: {
      'Setup Webhook': { main: [[{ node: 'Get Spreadsheet Meta', type: 'main', index: 0 }]] },
      'Get Spreadsheet Meta': { main: [[{ node: 'Ensure Master And Queue', type: 'main', index: 0 }]] },
      'Ensure Master And Queue': { main: [[{ node: 'Has Sheet Changes', type: 'main', index: 0 }]] },
      'Has Sheet Changes': {
        main: [
          [{ node: 'Apply Sheet Changes', type: 'main', index: 0 }],
          [{ node: 'Set Run Queue Headers', type: 'main', index: 0 }],
        ],
      },
      'Apply Sheet Changes': { main: [[{ node: 'Set Run Queue Headers', type: 'main', index: 0 }]] },
      'Set Run Queue Headers': { main: [[{ node: 'Seed Run Queue Hint', type: 'main', index: 0 }]] },
      'Seed Run Queue Hint': { main: [[{ node: 'Respond OK', type: 'main', index: 0 }]] },
    },
    settings: { executionOrder: 'v1' },
  };
}

async function setupMasterAndQueue() {
  const sheetId = process.env.OUTBOUND_LEADS_SHEET_ID;
  if (!sheetId) {
    console.error('Missing OUTBOUND_LEADS_SHEET_ID.');
    process.exit(1);
  }
  console.log(`Migrating sheet ${sheetId}: Sheet1 → Master Leads, ensure Run Queue...`);
  const { data, workflowId } = await runWebhookSetup(
    'sysbilt-outbound-master-queue',
    buildMasterMigrateWorkflow(sheetId),
  );
  if (!data.ok) throw new Error(`Master/queue setup failed: ${JSON.stringify(data)}`);
  saveDeployState({
    OUTBOUND_MASTER_QUEUE_SETUP_WORKFLOW_ID: workflowId,
    OUTBOUND_LEADS_SHEET_ID: sheetId,
  });
  console.log(`\nSheet ready: https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
  console.log(`Tabs: ${LEADS_SHEET} (companies) + ${QUEUE_SHEET} (jobs) + Speed Fix`);
  console.log('\nAdd data validation on Run Queue:');
  console.log(`  Status (column D): ${QUEUE_STATUS_VALUES.join(', ')}`);
  console.log(`  Niche suggestions: ${NICHE_SUGGESTIONS.join(', ')}`);
  return sheetId;
}

async function setupSheet() {
  let sheetId = process.env.OUTBOUND_LEADS_SHEET_ID;

  if (!sheetId) {
    console.log('Creating outbound leads spreadsheet...');
    const { data, workflowId } = await runWebhookSetup(
      'sysbilt-outbound-sheet-setup',
      buildSheetSetupWorkflow(),
    );
    sheetId =
      data.spreadsheetId ||
      (data.spreadsheetUrl && String(data.spreadsheetUrl).match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]);
    if (!sheetId) {
      throw new Error(`Setup webhook returned unexpected payload: ${JSON.stringify(data)}`);
    }
    saveDeployState({ OUTBOUND_SHEET_SETUP_WORKFLOW_ID: workflowId });
  } else {
    console.log(`Writing headers to existing sheet ${sheetId}...`);
    const { data } = await runWebhookSetup(
      'sysbilt-outbound-sheet-headers',
      buildHeadersOnlyWorkflow(sheetId),
    );
    if (!data.ok) throw new Error(`Header write failed: ${JSON.stringify(data)}`);
  }

  saveDeployState({ OUTBOUND_LEADS_SHEET_ID: sheetId });
  console.log(`\nSheet ready: https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
  console.log('Saved OUTBOUND_LEADS_SHEET_ID to scripts/automations/n8n/.deploy-state.env');
  console.log('\nManual step: add data validation on Status column (column K):');
  console.log(`  ${STATUS_VALUES.join(', ')}`);
  return sheetId;
}

async function deployContactScrape() {
  const sheetId = process.env.OUTBOUND_LEADS_SHEET_ID;
  if (!sheetId) {
    console.error('Missing OUTBOUND_LEADS_SHEET_ID.');
    process.exit(1);
  }
  const wf = await upsertWorkflow(buildContactScrapeWorkflow(sheetId), { activate: false });
  saveDeployState({ OUTBOUND_CONTACT_SCRAPE_WORKFLOW_ID: wf.id });
  console.log(`\nContact scrape workflow (inactive): ${N8N_BASE}/workflow/${wf.id}`);
  console.log('Run manually to fill Email / Owner Name on existing rows.');
  return wf;
}

async function deployAll({ activate = false } = {}) {
  await deployListBuilder({ activate });
  await deployContactScrape();
}

async function deployListBuilder({ includeTestWebhook = false, activate = false } = {}) {
  const sheetId = process.env.OUTBOUND_LEADS_SHEET_ID;
  if (!sheetId) {
    console.error('Missing OUTBOUND_LEADS_SHEET_ID. Run with --setup-sheet first.');
    process.exit(1);
  }

  const serpApiKey = await fetchSerpApiKey();
  const workflow = buildListBuilderWorkflow(serpApiKey, sheetId, { includeTestWebhook });
  const shouldActivate = activate || includeTestWebhook;
  const wf = await upsertWorkflow(workflow, { activate: shouldActivate });
  saveDeployState({
    OUTBOUND_LIST_BUILDER_WORKFLOW_ID: wf.id,
    OUTBOUND_LEADS_SHEET_ID: sheetId,
  });

  console.log(
    `\nWorkflow A deployed (${shouldActivate ? 'active' : 'inactive'}): ${N8N_BASE}/workflow/${wf.id}`,
  );
  console.log('Queue: set Niche + Suburb + Status=Queued on Run Queue tab.');
  console.log('Schedule: every 10 minutes when active (or Manual Trigger).');
  console.log('Quota: SerpAPI limit → silent 24h pause + re-queue; email only on 2nd fail.');
  console.log(`Sheet: https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
  return wf;
}

async function runListBuilderTest() {
  const wf = await deployListBuilder({ includeTestWebhook: true });
  console.log('\nRunning list builder test webhook...');
  const res = await fetch(`${N8N_BASE}/webhook/sysbilt-outbound-list-test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ test: true }),
  });
  console.log('Webhook status', res.status);
  await new Promise((r) => setTimeout(r, 300000));
  const { data } = await n8n('GET', `/executions?workflowId=${wf.id}&limit=1`);
  const execId = data?.[0]?.id;
  const exec = await n8n('GET', `/executions/${execId}?includeData=true`);
  console.log('Execution', execId, exec.status);
  const rd = exec.data?.resultData?.runData || {};
  for (const node of [
    'SerpAPI Maps Search',
    'Map SerpAPI Results',
    'Dedup New Rows',
    'Jina Homepage',
    'Parse Homepage Contacts',
    'Append To Sheet',
  ]) {
    const items = rd[node]?.[0]?.data?.main?.[0]?.length ?? 'not run';
    const err = rd[node]?.[0]?.error?.message;
    console.log(`  ${node}:`, items, err ? `ERROR ${err}` : '');
  }
  await n8n('POST', `/workflows/${wf.id}/deactivate`, {}).catch(() => {});
  await deployListBuilder({ includeTestWebhook: false });
}

const setupOnly = process.argv.includes('--setup-sheet');
const setupMaster = process.argv.includes('--setup-master');
const fixSheetOnly = process.argv.includes('--fix-sheet');
const runTest = process.argv.includes('--run-test');
const activate = process.argv.includes('--activate');

if (runTest) {
  runListBuilderTest().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
} else if (setupMaster) {
  setupMasterAndQueue()
    .then(() => deployAll({ activate: true }))
    .then(async () => {
      // Redeploy Speed Fix / Audit / Engage so they point at Master Leads
      const { spawnSync } = await import('node:child_process');
      const scripts = [
        'deploy-outbound-speed-fix-scorer.mjs',
        'deploy-outbound-speed-fix-send.mjs',
        'deploy-outbound-audit-runner.mjs',
        'deploy-outbound-hubspot-engage.mjs',
      ];
      for (const script of scripts) {
        console.log(`\nRedeploying ${script} for Master Leads...`);
        const r = spawnSync(process.execPath, [resolve(__dirname, script)], {
          stdio: 'inherit',
          env: process.env,
        });
        if (r.status !== 0) {
          console.warn(`Warning: ${script} exited ${r.status}`);
        }
      }
    })
    .catch((err) => {
      console.error(err.message || err);
      process.exit(1);
    });
} else if (fixSheetOnly || setupOnly) {
  const run = async () => {
    const sheetId = process.env.OUTBOUND_LEADS_SHEET_ID;
    if (!sheetId && fixSheetOnly) {
      console.error('Missing OUTBOUND_LEADS_SHEET_ID in scripts/automations/n8n/.deploy-state.env');
      process.exit(1);
    }
    if (fixSheetOnly && sheetId) {
      console.log(`Resetting headers on sheet ${sheetId}...`);
      const { data } = await runWebhookSetup(
        'sysbilt-outbound-sheet-headers',
        buildHeadersOnlyWorkflow(sheetId),
      );
      if (!data.ok) throw new Error(`Header reset failed: ${JSON.stringify(data)}`);
      console.log(`\nSheet fixed: https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
      console.log(
        'If row 1 still shows "Column 1", "Column 2": click Table1 → Convert to range, then run --fix-sheet again.',
      );
      console.log('Re-run Workflow A in n8n to repopulate rows (Address + scraped email).');
      await deployAll({ activate });
      return;
    }
    const id = await setupSheet();
    if (id) await deployAll({ activate });
  };
  run().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
} else {
  deployAll({ activate }).catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
