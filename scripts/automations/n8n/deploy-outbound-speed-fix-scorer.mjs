#!/usr/bin/env node
/**
 * Deploy SYSBILT - Outbound Speed Fix Scorer.
 *
 * Reads Master Leads rows with Website + empty LH Mobile, runs PageSpeed (mobile
 * performance), writes the score back to Master Leads, and if score < 65 appends
 * the lead to the "Speed Fix" tab for outreach.
 *
 * PageSpeed quota: silent 24h cooldown (no sheet write). Second consecutive
 * quota after a cooldown emails felipe@sysbilt.com once.
 *
 * Env:
 *   N8N_API_KEY / cursor-mcp
 *   N8N_BASE_URL — default https://n8n.sysbilt.com
 *   OUTBOUND_LEADS_SHEET_ID — spreadsheet ID
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-outbound-speed-fix-scorer.mjs --setup-tab
 *   node scripts/automations/n8n/deploy-outbound-speed-fix-scorer.mjs
 *   node scripts/automations/n8n/deploy-outbound-speed-fix-scorer.mjs --activate
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

const SHEET_ID_DEFAULT = '1aGz6kruGwSpt55rwlcknxVDXp9dgL_M-OnVJrDIbTlE';
const LH_THRESHOLD = 65;
const LEADS_SHEET = 'Master Leads';
const SPEED_FIX_SHEET = 'Speed Fix';
const LEADS_RANGE = 'A1:O5000';
const SPEED_FIX_RANGE = 'A1:I5000';

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
];

const SPEED_FIX_HEADERS = [
  'Business Name',
  'Suburb',
  'Website',
  'Email',
  'Phone',
  'LH Mobile',
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

async function fetchPageSpeedKey() {
  const inbound = await n8n('GET', `/workflows/${INBOUND_AUDIT_WORKFLOW_ID}`);
  const pageSpeedUrl = inbound.nodes?.find((n) => n.name === 'PageSpeed')?.parameters?.url || '';
  const pageSpeedKey = String(pageSpeedUrl).match(/key=([^&']+)/)?.[1];
  if (!pageSpeedKey) {
    throw new Error('Could not extract PageSpeed key from inbound PageSpeed node');
  }
  return pageSpeedKey;
}

const COOLDOWN_MS = 24 * 60 * 60 * 1000;
const NOTIFY_EMAIL = 'felipe@sysbilt.com';
const GMAIL_CRED_ID = 'pR8GnMBXmukPyA2V';
const GMAIL_CRED_NAME = 'Gmail account';

const PICK_SCORE_ROW_JS = `const staticData = $getWorkflowStaticData('global');
const STALE_MS = 8 * 60 * 1000;
const now = Date.now();

// Silent PageSpeed quota cooldown — schedule keeps firing, this run exits empty.
if (staticData.quotaCooldownUntil && now < staticData.quotaCooldownUntil) {
  return [];
}

if (staticData.lhInProgress) {
  const started = staticData.lhStartedAt || 0;
  if (now - started < STALE_MS) {
    return [];
  }
  staticData.lhInProgress = false;
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
  const lh = String(row['LH Mobile'] || '').trim();
  const status = String(row.Status || '').trim();
  if (!website || !mapsId) return false;
  if (lh !== '') return false;
  // Score fresh scrapes and anything not mid-audit
  if (['Auditing', 'Dead'].includes(status)) return false;
  return true;
});

if (!candidates.length) return [];

staticData.lhInProgress = true;
staticData.lhStartedAt = now;

return [{ json: candidates[0] }];`;

const EXTRACT_SCORE_JS = `const staticData = $getWorkflowStaticData('global');
const row = $('Pick Score Row').first().json;
const ps = $input.first().json || {};
const COOLDOWN_MS = ${COOLDOWN_MS};

function isQuotaError(body) {
  const msg = String(
    body?.error?.message || body?.error || body?.message || body?.description || '',
  ).toLowerCase();
  const status = String(body?.error?.status || '').toUpperCase();
  const code = Number(body?.error?.code || body?.statusCode || body?.status || 0);
  if (code === 429 || status === 'RESOURCE_EXHAUSTED') return true;
  if (msg.includes('quota') || msg.includes('rate limit') || msg.includes('rate_limit')) return true;
  if (msg.includes('daily limit') || msg.includes('user rate limit')) return true;
  if (msg.includes('resource_exhausted')) return true;
  return false;
}

if (isQuotaError(ps)) {
  const streak = Number(staticData.quotaFailStreak || 0) + 1;
  staticData.quotaFailStreak = streak;
  staticData.quotaCooldownUntil = Date.now() + COOLDOWN_MS;
  staticData.lhInProgress = false;
  staticData.lhStartedAt = 0;
  const alert = streak >= 2 && !staticData.quotaAlertSent;
  if (alert) staticData.quotaAlertSent = true;
  const untilIso = new Date(staticData.quotaCooldownUntil).toISOString();
  return [{
    json: {
      ...row,
      _quotaHit: true,
      _alert: alert,
      _quotaStreak: streak,
      _cooldownUntil: untilIso,
      _quotaReason: String(ps?.error?.message || ps?.error || 'PageSpeed quota'),
    },
  }];
}

const cats = ps.lighthouseResult?.categories || {};
const perf = cats.performance?.score;
let score = '';
if (typeof perf === 'number' && Number.isFinite(perf)) {
  score = String(Math.round(perf * 100));
  // Healthy response — reset quota streak so a later hit starts at 1 again.
  staticData.quotaFailStreak = 0;
  staticData.quotaAlertSent = false;
  staticData.quotaCooldownUntil = 0;
} else if (ps.error?.message) {
  score = 'err';
} else {
  score = 'err';
}

const num = score === 'err' ? 999 : Number(score);
const qualifies = score !== 'err' && num < ${LH_THRESHOLD};

return [{
  json: {
    ...row,
    'LH Mobile': score,
    _qualifies: qualifies,
    _scoreNum: num,
    _quotaHit: false,
    _alert: false,
  },
}];`;

const CLEAR_LOCK_JS = `const staticData = $getWorkflowStaticData('global');
staticData.lhInProgress = false;
staticData.lhStartedAt = 0;
return $input.all();`;

const DEDUP_SPEED_FIX_JS = `const lead = $('Extract Score').first().json;
if (!lead._qualifies) {
  return [{ json: { _skipAppend: true, reason: 'score_ok_or_err', score: lead['LH Mobile'] } }];
}

const mapsId = String(lead['Maps ID'] || '').trim();
const existing = $input.all()
  .map((i) => i.json)
  .filter((r) => String(r['Business Name'] || '').trim() && r['Business Name'] !== 'Business Name');

if (existing.some((r) => String(r['Maps ID'] || '').trim() === mapsId)) {
  return [{ json: { _skipAppend: true, reason: 'already_on_speed_fix', mapsId } }];
}

return [{
  json: {
    'Business Name': lead['Business Name'] || '',
    Suburb: lead.Suburb || '',
    Website: lead.Website || '',
    Email: lead.Email || '',
    Phone: lead.Phone || '',
    'LH Mobile': lead['LH Mobile'] || '',
    Status: 'Wait',
    'Maps ID': mapsId,
    Notes: '',
    _skipAppend: false,
  },
}];`;

function buildScorerWorkflow(sheetId, pageSpeedKey) {
  const scheduleId = uid();
  const manualId = uid();
  const readLeadsId = uid();
  const pickId = uid();
  const waitId = uid();
  const pageSpeedId = uid();
  const extractId = uid();
  const ifQuotaId = uid();
  const ifAlertId = uid();
  const notifyId = uid();
  const updateLeadsId = uid();
  const readSfId = uid();
  const dedupId = uid();
  const ifAppendId = uid();
  const appendId = uid();
  const clearId = uid();

  const nodes = [
    {
      id: scheduleId,
      name: 'Every 5 Minutes',
      type: 'n8n-nodes-base.scheduleTrigger',
      typeVersion: 1.2,
      position: [-720, -80],
      parameters: {
        rule: {
          interval: [{ field: 'minutes', minutesInterval: 5 }],
        },
      },
    },
    {
      id: manualId,
      name: 'Manual Trigger',
      type: 'n8n-nodes-base.manualTrigger',
      typeVersion: 1,
      position: [-720, 120],
      parameters: {},
    },
    {
      id: readLeadsId,
      name: 'Read Leads Sheet',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-480, 0],
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
              range: LEADS_RANGE,
            },
          },
        },
      },
    },
    {
      id: pickId,
      name: 'Pick Score Row',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-240, 0],
      parameters: { mode: 'runOnceForAllItems', jsCode: PICK_SCORE_ROW_JS },
    },
    {
      id: waitId,
      name: 'Wait Before PageSpeed',
      type: 'n8n-nodes-base.wait',
      typeVersion: 1.1,
      position: [0, 0],
      parameters: { amount: 2 },
    },
    {
      id: pageSpeedId,
      name: 'PageSpeed Mobile',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.4,
      position: [240, 0],
      onError: 'continueRegularOutput',
      parameters: {
        method: 'GET',
        url: `={{ (() => {
  let u = String($json.Website || '').trim();
  if (!u) return 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + encodeURIComponent('https://example.com') + '&strategy=mobile&category=performance&key=${pageSpeedKey}';
  if (!/^https?:\\/\\//i.test(u)) u = 'https://' + u;
  return 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + encodeURIComponent(u) + '&strategy=mobile&category=performance&key=${pageSpeedKey}';
})() }}`,
        options: { timeout: 70000 },
      },
    },
    {
      id: extractId,
      name: 'Extract Score',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [480, 0],
      parameters: { mode: 'runOnceForAllItems', jsCode: EXTRACT_SCORE_JS },
    },
    {
      id: ifQuotaId,
      name: 'Quota Hit',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [700, 0],
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
      id: ifAlertId,
      name: 'Should Alert Quota',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [920, 160],
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
      position: [1140, 80],
      credentials: {
        gmailOAuth2: { id: GMAIL_CRED_ID, name: GMAIL_CRED_NAME },
      },
      parameters: {
        sendTo: NOTIFY_EMAIL,
        subject: '=Outbound Speed Fix Scorer: PageSpeed quota failed twice',
        message: `=PageSpeed hit quota again after a 24h pause.<br><br>
Streak: {{ $json._quotaStreak }}<br>
Cooldown until: {{ $json._cooldownUntil }}<br>
Reason: {{ $json._quotaReason }}<br><br>
Workflow paused scoring for another 24 hours automatically. No sheet rows were burned.`,
        options: {},
      },
    },
    {
      id: updateLeadsId,
      name: 'Write LH Mobile',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [920, -80],
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
            'LH Mobile': "={{ $json['LH Mobile'] }}",
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
      id: readSfId,
      name: 'Read Speed Fix Tab',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [1140, -80],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId, SPEED_FIX_SHEET),
        options: {
          dataLocationOnSheet: {
            values: {
              rangeDefinition: 'specifyRangeA1',
              range: SPEED_FIX_RANGE,
            },
          },
        },
      },
    },
    {
      id: dedupId,
      name: 'Build Speed Fix Row',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1360, -80],
      parameters: { mode: 'runOnceForAllItems', jsCode: DEDUP_SPEED_FIX_JS },
    },
    {
      id: ifAppendId,
      name: 'Should Append',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [1580, -80],
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
      id: appendId,
      name: 'Append Speed Fix',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [1800, -160],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'append',
        ...sheetRef(sheetId, SPEED_FIX_SHEET),
        columns: {
          mappingMode: 'defineBelow',
          value: {
            'Business Name': "={{ $json['Business Name'] }}",
            Suburb: '={{ $json.Suburb }}',
            Website: '={{ $json.Website }}',
            Email: '={{ $json.Email }}',
            Phone: '={{ $json.Phone }}',
            'LH Mobile': "={{ $json['LH Mobile'] }}",
            Status: '={{ $json.Status }}',
            'Maps ID': "={{ $json['Maps ID'] }}",
            Notes: '={{ $json.Notes }}',
          },
          matchingColumns: [],
          schema: schemaFor(SPEED_FIX_HEADERS, 'Maps ID'),
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: {},
      },
    },
    {
      id: clearId,
      name: 'Clear LH Lock',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [2020, 0],
      parameters: { mode: 'runOnceForAllItems', jsCode: CLEAR_LOCK_JS },
    },
  ];

  const connections = {
    'Every 5 Minutes': { main: [[{ node: 'Read Leads Sheet', type: 'main', index: 0 }]] },
    'Manual Trigger': { main: [[{ node: 'Read Leads Sheet', type: 'main', index: 0 }]] },
    'Read Leads Sheet': { main: [[{ node: 'Pick Score Row', type: 'main', index: 0 }]] },
    'Pick Score Row': { main: [[{ node: 'Wait Before PageSpeed', type: 'main', index: 0 }]] },
    'Wait Before PageSpeed': { main: [[{ node: 'PageSpeed Mobile', type: 'main', index: 0 }]] },
    'PageSpeed Mobile': { main: [[{ node: 'Extract Score', type: 'main', index: 0 }]] },
    'Extract Score': { main: [[{ node: 'Quota Hit', type: 'main', index: 0 }]] },
    'Quota Hit': {
      main: [
        [{ node: 'Should Alert Quota', type: 'main', index: 0 }],
        [{ node: 'Write LH Mobile', type: 'main', index: 0 }],
      ],
    },
    'Should Alert Quota': {
      main: [
        [{ node: 'Quota Alert Email', type: 'main', index: 0 }],
        [{ node: 'Clear LH Lock', type: 'main', index: 0 }],
      ],
    },
    'Quota Alert Email': { main: [[{ node: 'Clear LH Lock', type: 'main', index: 0 }]] },
    'Write LH Mobile': { main: [[{ node: 'Read Speed Fix Tab', type: 'main', index: 0 }]] },
    'Read Speed Fix Tab': { main: [[{ node: 'Build Speed Fix Row', type: 'main', index: 0 }]] },
    'Build Speed Fix Row': { main: [[{ node: 'Should Append', type: 'main', index: 0 }]] },
    'Should Append': {
      main: [
        [{ node: 'Append Speed Fix', type: 'main', index: 0 }],
        [{ node: 'Clear LH Lock', type: 'main', index: 0 }],
      ],
    },
    'Append Speed Fix': { main: [[{ node: 'Clear LH Lock', type: 'main', index: 0 }]] },
  };

  return {
    name: 'SYSBILT - Outbound Speed Fix Scorer',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  };
}

function buildSetupTabWorkflow(sheetId) {
  const webhookId = uid();
  const getMetaId = uid();
  const ensureId = uid();
  const batchId = uid();
  const writeLhHeaderId = uid();
  const writeSfHeadersId = uid();
  const respondId = uid();

  const ENSURE_TAB_JS = `const meta = $input.first().json;
const sheets = meta.sheets || [];
const hasSpeedFix = sheets.some((s) => s.properties?.title === '${SPEED_FIX_SHEET}');
const requests = [];
if (!hasSpeedFix) {
  requests.push({
    addSheet: {
      properties: { title: '${SPEED_FIX_SHEET}' },
    },
  });
}
return [{
  json: {
    spreadsheetId: meta.spreadsheetId || '${sheetId}',
    hasSpeedFix,
    requests,
    skipBatch: requests.length === 0,
  },
}];`;

  return {
    name: 'SYSBILT - Outbound Speed Fix Tab Setup',
    nodes: [
      {
        id: webhookId,
        name: 'Setup Webhook',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2.1,
        position: [-600, 0],
        parameters: {
          path: 'sysbilt-outbound-speed-fix-tab',
          httpMethod: 'POST',
          responseMode: 'responseNode',
          options: {},
        },
        webhookId: 'sysbilt-outbound-speed-fix-tab',
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
        name: 'Ensure Speed Fix Tab',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [-120, 0],
        parameters: { mode: 'runOnceForAllItems', jsCode: ENSURE_TAB_JS },
      },
      {
        id: batchId,
        name: 'Add Sheet If Needed',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [120, 0],
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
        id: writeLhHeaderId,
        name: 'Set LH Mobile Header',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [360, 0],
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        parameters: {
          method: 'PUT',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent('Master Leads!O1')}?valueInputOption=USER_ENTERED`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: JSON.stringify({
            range: 'Master Leads!O1',
            majorDimension: 'ROWS',
            values: [['LH Mobile']],
          }),
          options: {},
        },
      },
      {
        id: writeSfHeadersId,
        name: 'Set Speed Fix Headers',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [600, 0],
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        parameters: {
          method: 'PUT',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent('Speed Fix!A1:I1')}?valueInputOption=USER_ENTERED`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: JSON.stringify({
            range: 'Speed Fix!A1:I1',
            majorDimension: 'ROWS',
            values: [SPEED_FIX_HEADERS],
          }),
          options: {},
        },
      },
      {
        id: respondId,
        name: 'Respond OK',
        type: 'n8n-nodes-base.respondToWebhook',
        typeVersion: 1.1,
        position: [840, 0],
        parameters: {
          respondWith: 'json',
          responseBody: `={{ ({ ok: true, spreadsheetId: '${sheetId}', speedFixTab: '${SPEED_FIX_SHEET}', lhHeader: 'LH Mobile', threshold: ${LH_THRESHOLD} }) }}`,
          options: {},
        },
      },
    ],
    connections: {
      'Setup Webhook': { main: [[{ node: 'Get Spreadsheet Meta', type: 'main', index: 0 }]] },
      'Get Spreadsheet Meta': { main: [[{ node: 'Ensure Speed Fix Tab', type: 'main', index: 0 }]] },
      'Ensure Speed Fix Tab': { main: [[{ node: 'Add Sheet If Needed', type: 'main', index: 0 }]] },
      'Add Sheet If Needed': { main: [[{ node: 'Set LH Mobile Header', type: 'main', index: 0 }]] },
      'Set LH Mobile Header': { main: [[{ node: 'Set Speed Fix Headers', type: 'main', index: 0 }]] },
      'Set Speed Fix Headers': { main: [[{ node: 'Respond OK', type: 'main', index: 0 }]] },
    },
    settings: { executionOrder: 'v1' },
  };
}

async function setupTab(sheetId) {
  console.log(`Setting up Speed Fix tab on sheet ${sheetId}...`);
  const workflow = buildSetupTabWorkflow(sheetId);
  // Fix: Add Sheet If Needed should skip when no requests — empty batchUpdate fails.
  // Patch Ensure → conditional: use IF or always send empty-safe body.
  // Google rejects empty requests array — gate with IF node.
  const ensureNode = workflow.nodes.find((n) => n.name === 'Ensure Speed Fix Tab');
  const ifId = uid();
  const noopId = uid();
  workflow.nodes.push(
    {
      id: ifId,
      name: 'Needs Add Sheet',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [0, 0],
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
      id: noopId,
      name: 'Skip Add Sheet',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [120, 120],
      parameters: {
        mode: 'runOnceForAllItems',
        jsCode: 'return $input.all();',
      },
    },
  );
  // Reposition Add Sheet
  const addSheet = workflow.nodes.find((n) => n.name === 'Add Sheet If Needed');
  if (addSheet) addSheet.position = [120, -80];
  if (ensureNode) ensureNode.position = [-120, 0];

  workflow.connections['Ensure Speed Fix Tab'] = {
    main: [[{ node: 'Needs Add Sheet', type: 'main', index: 0 }]],
  };
  workflow.connections['Needs Add Sheet'] = {
    main: [
      [{ node: 'Add Sheet If Needed', type: 'main', index: 0 }],
      [{ node: 'Skip Add Sheet', type: 'main', index: 0 }],
    ],
  };
  workflow.connections['Add Sheet If Needed'] = {
    main: [[{ node: 'Set LH Mobile Header', type: 'main', index: 0 }]],
  };
  workflow.connections['Skip Add Sheet'] = {
    main: [[{ node: 'Set LH Mobile Header', type: 'main', index: 0 }]],
  };

  const wf = await upsertWorkflow(workflow, { activate: true });
  const res = await fetch(`${N8N_BASE}/webhook/sysbilt-outbound-speed-fix-tab`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'deploy-outbound-speed-fix-scorer' }),
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
  if (!res.ok) {
    throw new Error(`Speed Fix tab setup failed: ${res.status} ${JSON.stringify(data)}`);
  }
  saveDeployState({
    OUTBOUND_LEADS_SHEET_ID: sheetId,
    OUTBOUND_SPEED_FIX_TAB_SETUP_WORKFLOW_ID: wf.id,
  });
  console.log('Tab setup OK:', data);
  return data;
}

async function deployScorer(sheetId, { activate = false } = {}) {
  const pageSpeedKey = await fetchPageSpeedKey();
  const workflow = buildScorerWorkflow(sheetId, pageSpeedKey);
  const wf = await upsertWorkflow(workflow, { activate });
  saveDeployState({
    OUTBOUND_LEADS_SHEET_ID: sheetId,
    OUTBOUND_SPEED_FIX_SCORER_WORKFLOW_ID: wf.id,
    OUTBOUND_LH_THRESHOLD: String(LH_THRESHOLD),
  });
  console.log(`\nScorer deployed${activate ? ' (active)' : ' (inactive)'}: ${N8N_BASE}/workflow/${wf.id}`);
  console.log(`Sheet: https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
  console.log(`Gate: LH Mobile < ${LH_THRESHOLD} → Speed Fix tab (Status=Wait)`);
  console.log('Quota: PageSpeed limit → silent 24h pause; email only on 2nd fail.');
  console.log('Test: open workflow → Execute (Manual Trigger). One row per run.');
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

  if (doSetup) {
    await setupTab(sheetId);
  }

  await deployScorer(sheetId, { activate });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
