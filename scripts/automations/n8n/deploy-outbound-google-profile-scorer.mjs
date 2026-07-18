#!/usr/bin/env node
/**
 * Deploy SYSBILT - Outbound Google Profile Scorer.
 *
 * Cheap filter only (free-tier safe): Master Leads with Maps ID + thin Reviews
 * (< REVIEWS_MAX or empty) → append Google Profile tab.
 * Status = Ready, or Wait if Speed Fix already Ready/Emailed for same Maps ID.
 * Skips if any product tab has Replied for that Maps ID.
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-outbound-google-profile-scorer.mjs --setup-tab
 *   node scripts/automations/n8n/deploy-outbound-google-profile-scorer.mjs
 *   node scripts/automations/n8n/deploy-outbound-google-profile-scorer.mjs --activate
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const GOOGLE_SHEETS_CRED_ID = 'W8jOFatMKmraYw0F';
const GOOGLE_SHEETS_CRED_NAME = 'Google Sheets account';

const SHEET_ID_DEFAULT = '1aGz6kruGwSpt55rwlcknxVDXp9dgL_M-OnVJrDIbTlE';
const REVIEWS_MAX = 10;
const LEADS_SHEET = 'Master Leads';
const SPEED_FIX_SHEET = 'Speed Fix';
const GP_SHEET = 'Google Profile';
const LEADS_RANGE = 'A1:O5000';
const PRODUCT_RANGE = 'A1:I5000';

const GP_HEADERS = [
  'Business Name',
  'Suburb',
  'Website',
  'Email',
  'Phone',
  'Reviews',
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
  } else {
    try {
      await n8n('POST', `/workflows/${wf.id}/deactivate`, {});
    } catch {
      /* ok */
    }
  }
  return wf;
}

const PICK_JS = `const staticData = $getWorkflowStaticData('global');
const STALE_MS = 8 * 60 * 1000;
const REVIEWS_MAX = ${REVIEWS_MAX};

if (staticData.gpInProgress) {
  const started = staticData.gpStartedAt || 0;
  if (Date.now() - started < STALE_MS) return [];
  staticData.gpInProgress = false;
}

const rows = $input.all()
  .map((item) => item.json)
  .filter((row) => {
    const name = String(row['Business Name'] || '').trim();
    return name && name !== 'Business Name';
  });

function thinReviews(row) {
  const raw = String(row.Reviews || '').trim();
  if (!raw) return true;
  const n = Number(String(raw).replace(/[^0-9.]/g, ''));
  if (!Number.isFinite(n)) return true;
  return n < REVIEWS_MAX;
}

const candidates = rows.filter((row) => {
  const mapsId = String(row['Maps ID'] || '').trim();
  const status = String(row.Status || '').trim();
  if (!mapsId) return false;
  if (['Auditing', 'Dead'].includes(status)) return false;
  return thinReviews(row);
});

if (!candidates.length) return [];

staticData.gpInProgress = true;
staticData.gpStartedAt = Date.now();
return [{ json: candidates[0] }];`;

const BUILD_JS = `const lead = $('Pick Thin Profile').first().json;
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

const gpRows = rowsFrom('Read Google Profile Tab');
const sfRows = rowsFrom('Read Speed Fix Tab');

if (gpRows.some((r) => String(r['Maps ID'] || '').trim() === mapsId)) {
  return [{ json: { _skipAppend: true, reason: 'already_on_google_profile', mapsId } }];
}

const allProduct = [...gpRows, ...sfRows];
const same = allProduct.filter((r) => String(r['Maps ID'] || '').trim() === mapsId);
if (same.some((r) => String(r.Status || '').trim() === 'Replied')) {
  return [{ json: { _skipAppend: true, reason: 'replied_elsewhere', mapsId } }];
}

const busy = same.some((r) => ['Ready', 'Emailed'].includes(String(r.Status || '').trim()));
const status = busy ? 'Wait' : 'Ready';
const reviews = String(lead.Reviews || '').trim();

return [{
  json: {
    'Business Name': lead['Business Name'] || '',
    Suburb: lead.Suburb || '',
    Website: lead.Website || '',
    Email: lead.Email || '',
    Phone: lead.Phone || '',
    Reviews: reviews,
    Status: status,
    'Maps ID': mapsId,
    Notes: busy ? 'wait:other-product-live' : 'gate:reviews<${REVIEWS_MAX}',
    _skipAppend: false,
  },
}];`;

const CLEAR_JS = `const staticData = $getWorkflowStaticData('global');
staticData.gpInProgress = false;
staticData.gpStartedAt = 0;
return $input.all();`;

function buildScorerWorkflow(sheetId) {
  const nodes = [
    {
      id: uid(),
      name: 'Every 5 Minutes',
      type: 'n8n-nodes-base.scheduleTrigger',
      typeVersion: 1.2,
      position: [-840, -80],
      parameters: { rule: { interval: [{ field: 'minutes', minutesInterval: 5 }] } },
    },
    {
      id: uid(),
      name: 'Manual Trigger',
      type: 'n8n-nodes-base.manualTrigger',
      typeVersion: 1,
      position: [-840, 120],
      parameters: {},
    },
    {
      id: uid(),
      name: 'Read Leads Sheet',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-600, 0],
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
      name: 'Pick Thin Profile',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-360, 0],
      parameters: { mode: 'runOnceForAllItems', jsCode: PICK_JS },
    },
    {
      id: uid(),
      name: 'Read Google Profile Tab',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-120, -80],
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
      name: 'Read Speed Fix Tab',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-120, 120],
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
      name: 'Build Google Profile Row',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [120, 0],
      parameters: { mode: 'runOnceForAllItems', jsCode: BUILD_JS },
    },
    {
      id: uid(),
      name: 'Should Append',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [360, 0],
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
      name: 'Append Google Profile',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [600, -80],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'append',
        ...sheetRef(sheetId, GP_SHEET),
        columns: {
          mappingMode: 'defineBelow',
          value: {
            'Business Name': "={{ $json['Business Name'] }}",
            Suburb: '={{ $json.Suburb }}',
            Website: '={{ $json.Website }}',
            Email: '={{ $json.Email }}',
            Phone: '={{ $json.Phone }}',
            Reviews: '={{ $json.Reviews }}',
            Status: '={{ $json.Status }}',
            'Maps ID': "={{ $json['Maps ID'] }}",
            Notes: '={{ $json.Notes }}',
          },
          schema: schemaFor(GP_HEADERS, 'Maps ID'),
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: { useAppend: true },
      },
    },
    {
      id: uid(),
      name: 'Clear GP Lock',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [840, 0],
      parameters: { mode: 'runOnceForAllItems', jsCode: CLEAR_JS },
    },
    {
      id: uid(),
      name: 'Workflow Guide',
      type: 'n8n-nodes-base.stickyNote',
      typeVersion: 1,
      position: [-1100, -40],
      parameters: {
        width: 480,
        height: 400,
        color: 5,
        content: `## Outbound Google Profile Scorer

**Gate (cheap, no scrape)**
Master Leads Reviews empty or &lt; ${REVIEWS_MAX} → **Google Profile** tab.

**Status**
- **Ready** — free to draft
- **Wait** — Speed Fix already Ready/Emailed for same Maps ID (flip to Ready when you want product 2)
- Skip if already on this tab, or Replied elsewhere

**Related**
← List Builder / Master Leads
→ Google Profile Send
Deploy: \`deploy-outbound-google-profile-scorer.sh --setup-tab\``,
      },
    },
  ];

  const connections = {
    'Every 5 Minutes': { main: [[{ node: 'Read Leads Sheet', type: 'main', index: 0 }]] },
    'Manual Trigger': { main: [[{ node: 'Read Leads Sheet', type: 'main', index: 0 }]] },
    'Read Leads Sheet': { main: [[{ node: 'Pick Thin Profile', type: 'main', index: 0 }]] },
    'Pick Thin Profile': { main: [[{ node: 'Read Google Profile Tab', type: 'main', index: 0 }]] },
    'Read Google Profile Tab': { main: [[{ node: 'Read Speed Fix Tab', type: 'main', index: 0 }]] },
    'Read Speed Fix Tab': { main: [[{ node: 'Build Google Profile Row', type: 'main', index: 0 }]] },
    'Build Google Profile Row': { main: [[{ node: 'Should Append', type: 'main', index: 0 }]] },
    'Should Append': {
      main: [
        [{ node: 'Append Google Profile', type: 'main', index: 0 }],
        [{ node: 'Clear GP Lock', type: 'main', index: 0 }],
      ],
    },
    'Append Google Profile': { main: [[{ node: 'Clear GP Lock', type: 'main', index: 0 }]] },
  };

  return {
    name: 'SYSBILT - Outbound Google Profile Scorer',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  };
}

function buildSetupTabWorkflow(sheetId) {
  const ENSURE_JS = `const meta = $input.first().json;
const sheets = meta.sheets || [];
const has = sheets.some((s) => s.properties?.title === '${GP_SHEET}');
const requests = [];
if (!has) {
  requests.push({ addSheet: { properties: { title: '${GP_SHEET}' } } });
}
return [{
  json: {
    spreadsheetId: meta.spreadsheetId || '${sheetId}',
    requests,
    skipBatch: requests.length === 0,
  },
}];`;

  return {
    name: 'SYSBILT - Outbound Google Profile Tab Setup',
    nodes: [
      {
        id: uid(),
        name: 'Setup Webhook',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2.1,
        position: [-600, 0],
        parameters: {
          path: 'sysbilt-outbound-google-profile-tab',
          httpMethod: 'POST',
          responseMode: 'responseNode',
          options: {},
        },
        webhookId: 'sysbilt-outbound-google-profile-tab',
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
        name: 'Ensure Google Profile Tab',
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
        name: 'Set Google Profile Headers',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [600, 0],
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        parameters: {
          method: 'PUT',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent('Google Profile!A1:I1')}?valueInputOption=USER_ENTERED`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: JSON.stringify({
            range: 'Google Profile!A1:I1',
            majorDimension: 'ROWS',
            values: [GP_HEADERS],
          }),
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Respond OK',
        type: 'n8n-nodes-base.respondToWebhook',
        typeVersion: 1.1,
        position: [840, 0],
        parameters: {
          respondWith: 'json',
          responseBody: `={{ ({ ok: true, spreadsheetId: '${sheetId}', tab: '${GP_SHEET}', reviewsMax: ${REVIEWS_MAX} }) }}`,
          options: {},
        },
      },
    ],
    connections: {
      'Setup Webhook': { main: [[{ node: 'Get Spreadsheet Meta', type: 'main', index: 0 }]] },
      'Get Spreadsheet Meta': {
        main: [[{ node: 'Ensure Google Profile Tab', type: 'main', index: 0 }]],
      },
      'Ensure Google Profile Tab': { main: [[{ node: 'Needs Add Sheet', type: 'main', index: 0 }]] },
      'Needs Add Sheet': {
        main: [
          [{ node: 'Add Sheet If Needed', type: 'main', index: 0 }],
          [{ node: 'Skip Add Sheet', type: 'main', index: 0 }],
        ],
      },
      'Add Sheet If Needed': {
        main: [[{ node: 'Set Google Profile Headers', type: 'main', index: 0 }]],
      },
      'Skip Add Sheet': {
        main: [[{ node: 'Set Google Profile Headers', type: 'main', index: 0 }]],
      },
      'Set Google Profile Headers': { main: [[{ node: 'Respond OK', type: 'main', index: 0 }]] },
    },
    settings: { executionOrder: 'v1' },
  };
}

async function setupTab(sheetId) {
  console.log(`Setting up Google Profile tab on sheet ${sheetId}...`);
  const wf = await upsertWorkflow(buildSetupTabWorkflow(sheetId), { activate: true });
  saveDeployState({ OUTBOUND_GOOGLE_PROFILE_TAB_SETUP_WORKFLOW_ID: wf.id });

  await new Promise((r) => setTimeout(r, 1500));
  const res = await fetch(`${N8N_BASE}/webhook/sysbilt-outbound-google-profile-tab`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'deploy-outbound-google-profile-scorer' }),
  });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`Google Profile tab setup failed: ${res.status} ${JSON.stringify(data)}`);
  }
  console.log('Tab setup OK:', data);
  return data;
}

async function main() {
  const args = process.argv.slice(2);
  const doSetup = args.includes('--setup-tab');
  const activate = args.includes('--activate');
  const sheetId = process.env.OUTBOUND_LEADS_SHEET_ID || SHEET_ID_DEFAULT;
  if (!process.env.OUTBOUND_LEADS_SHEET_ID) {
    saveDeployState({ OUTBOUND_LEADS_SHEET_ID: sheetId });
  }

  if (doSetup) await setupTab(sheetId);

  const wf = await upsertWorkflow(buildScorerWorkflow(sheetId), { activate });
  saveDeployState({
    OUTBOUND_GOOGLE_PROFILE_SCORER_WORKFLOW_ID: wf.id,
    OUTBOUND_GP_REVIEWS_MAX: String(REVIEWS_MAX),
  });

  console.log(`\nGoogle Profile Scorer${activate ? ' (active)' : ' (inactive)'}: ${N8N_BASE}/workflow/${wf.id}`);
  console.log(`Gate: Reviews empty or < ${REVIEWS_MAX} → ${GP_SHEET} (Ready or Wait)`);
  console.log('Sheet:', `https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
