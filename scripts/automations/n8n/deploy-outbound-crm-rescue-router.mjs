#!/usr/bin/env node
/**
 * Deploy SYSBILT - Outbound CRM Rescue Router.
 *
 * Semi-manual gate: you run a polite website form test, wait for silence,
 * then set Master Leads **CRM Form** to a qualify value (silent / yes / 48h / fit / noreply).
 * Router appends **CRM Rescue** tab (Ready / Wait) and marks CRM Form = routed
 * so the same row is not picked again.
 *
 * CRM Form values:
 *   Qualify → silent | yes | 48h | fit | noreply
 *   Skip forever → replied | none | no | skip
 *   After route → routed (written by this workflow)
 *   Empty → not checked yet (ignored)
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-outbound-crm-rescue-router.mjs --setup-tab
 *   node scripts/automations/n8n/deploy-outbound-crm-rescue-router.mjs
 *   node scripts/automations/n8n/deploy-outbound-crm-rescue-router.mjs --activate
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
const LEADS_SHEET = 'Master Leads';
const CRM_SHEET = 'CRM Rescue';
const SPEED_FIX_SHEET = 'Speed Fix';
const GP_SHEET = 'Google Profile';
const MC_SHEET = 'Missed-Call';
const SV_SHEET = 'Search Visibility';
const LP_SHEET = 'Landing Page';
const LEADS_RANGE = 'A1:R5000';
const PRODUCT_RANGE = 'A1:K5000';

const CRM_HEADERS = [
  'Business Name',
  'Suburb',
  'Website',
  'Email',
  'Phone',
  'CRM Form',
  'Form Day',
  'Form Time',
  'Status',
  'Maps ID',
  'Notes',
];

const CRM_FORM_MARK_HEADERS = ['Maps ID', 'CRM Form'];

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

if (staticData.crmInProgress) {
  const started = staticData.crmStartedAt || 0;
  if (Date.now() - started < STALE_MS) return [];
  staticData.crmInProgress = false;
}

const QUALIFY = new Set(['silent', 'yes', '48h', 'fit', 'noreply']);

const rows = $input.all()
  .map((item) => item.json)
  .filter((row) => {
    const name = String(row['Business Name'] || '').trim();
    return name && name !== 'Business Name';
  });

function realEmail(row) {
  const email = String(row.Email || '').trim().toLowerCase();
  if (!email || !email.includes('@')) return false;
  if (email.endsWith('@outbound.sysbilt.internal')) return false;
  if (email.startsWith('pending+')) return false;
  return true;
}

function crmFormKey(row) {
  return String(row['CRM Form'] || '').trim().toLowerCase();
}

const candidates = rows.filter((row) => {
  const mapsId = String(row['Maps ID'] || '').trim();
  const website = String(row.Website || '').trim();
  const status = String(row.Status || '').trim();
  const flag = crmFormKey(row);
  if (!mapsId || !website) return false;
  if (!realEmail(row)) return false;
  if (['Auditing', 'Dead'].includes(status)) return false;
  if (!QUALIFY.has(flag)) return false;
  return true;
});

if (!candidates.length) return [];

staticData.crmInProgress = true;
staticData.crmStartedAt = Date.now();
return [{ json: candidates[0] }];`;

const BUILD_JS = `const lead = $('Pick CRM Lead').first().json;
const mapsId = String(lead['Maps ID'] || '').trim();
const crmFormRaw = String(lead['CRM Form'] || '').trim();
const notesRaw = String(lead.Notes || '').trim();

function rowsFrom(nodeName) {
  try {
    return $(nodeName).all()
      .map((i) => i.json)
      .filter((r) => String(r['Business Name'] || '').trim() && r['Business Name'] !== 'Business Name');
  } catch {
    return [];
  }
}

function parseDayTime(notes) {
  let day = '';
  let time = '';
  const dayM = notes.match(/\\bd\\s*[:=]\\s*([^|;]+)/i) || notes.match(/\\bday\\s*[:=]\\s*([^|;]+)/i);
  const timeM = notes.match(/\\bt\\s*[:=]\\s*([^|;]+)/i) || notes.match(/\\btime\\s*[:=]\\s*([^|;]+)/i);
  if (dayM) day = dayM[1].trim();
  if (timeM) time = timeM[1].trim();
  return { day, time };
}

const crmRows = rowsFrom('Read CRM Rescue Tab');
const sfRows = rowsFrom('Read Speed Fix Tab');
const gpRows = rowsFrom('Read Google Profile Tab');
const mcRows = rowsFrom('Read Missed-Call Tab');
const svRows = rowsFrom('Read Search Visibility Tab');
const lpRows = rowsFrom('Read Landing Page Tab');

if (crmRows.some((r) => String(r['Maps ID'] || '').trim() === mapsId)) {
  return [{
    json: {
      _skipAppend: true,
      reason: 'already_on_crm_rescue',
      mapsId,
      _crmFormMark: 'routed',
    },
  }];
}

const allProduct = [...crmRows, ...sfRows, ...gpRows, ...mcRows, ...svRows, ...lpRows];
const same = allProduct.filter((r) => String(r['Maps ID'] || '').trim() === mapsId);
if (same.some((r) => String(r.Status || '').trim() === 'Replied')) {
  return [{
    json: {
      _skipAppend: true,
      reason: 'replied_elsewhere',
      mapsId,
      _crmFormMark: 'skip:replied',
    },
  }];
}

const busy = same.some((r) => ['Ready', 'Emailed'].includes(String(r.Status || '').trim()));
const status = busy ? 'Wait' : 'Ready';
const { day, time } = parseDayTime(notesRaw);

return [{
  json: {
    'Business Name': lead['Business Name'] || '',
    Suburb: lead.Suburb || '',
    Website: lead.Website || '',
    Email: lead.Email || '',
    Phone: lead.Phone || '',
    'CRM Form': crmFormRaw,
    'Form Day': day,
    'Form Time': time,
    Status: status,
    'Maps ID': mapsId,
    Notes: busy ? 'wait:other-product-live' : 'gate:form-silence-manual',
    _skipAppend: false,
    _crmFormMark: 'routed',
  },
}];`;

const CLEAR_JS = `const staticData = $getWorkflowStaticData('global');
staticData.crmInProgress = false;
staticData.crmStartedAt = 0;
return $input.all();`;

function buildRouterWorkflow(sheetId) {
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
      name: 'Pick CRM Lead',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-360, 0],
      parameters: { mode: 'runOnceForAllItems', jsCode: PICK_JS },
    },
    {
      id: uid(),
      name: 'Read CRM Rescue Tab',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-120, -260],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId, CRM_SHEET),
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
      position: [-120, -140],
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
      position: [-120, -20],
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
      position: [-120, 100],
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
      name: 'Read Search Visibility Tab',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-120, 220],
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
      name: 'Read Landing Page Tab',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-120, 340],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId, LP_SHEET),
        options: {
          dataLocationOnSheet: {
            values: { rangeDefinition: 'specifyRangeA1', range: PRODUCT_RANGE },
          },
        },
      },
    },
    {
      id: uid(),
      name: 'Build CRM Rescue Row',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [140, 40],
      parameters: { mode: 'runOnceForAllItems', jsCode: BUILD_JS },
    },
    {
      id: uid(),
      name: 'Should Append',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [380, 40],
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
      name: 'Append CRM Rescue',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [620, -40],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'append',
        ...sheetRef(sheetId, CRM_SHEET),
        columns: {
          mappingMode: 'defineBelow',
          value: {
            'Business Name': "={{ $json['Business Name'] }}",
            Suburb: '={{ $json.Suburb }}',
            Website: '={{ $json.Website }}',
            Email: '={{ $json.Email }}',
            Phone: '={{ $json.Phone }}',
            'CRM Form': "={{ $json['CRM Form'] }}",
            'Form Day': "={{ $json['Form Day'] }}",
            'Form Time': "={{ $json['Form Time'] }}",
            Status: '={{ $json.Status }}',
            'Maps ID': "={{ $json['Maps ID'] }}",
            Notes: '={{ $json.Notes }}',
          },
          schema: schemaFor(CRM_HEADERS, 'Maps ID'),
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: { useAppend: true },
      },
    },
    {
      id: uid(),
      name: 'Mark CRM Form',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [860, 40],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'appendOrUpdate',
        ...sheetRef(sheetId, LEADS_SHEET),
        columns: {
          mappingMode: 'defineBelow',
          value: {
            'Maps ID':
              "={{ $('Build CRM Rescue Row').item.json['Maps ID'] || $('Build CRM Rescue Row').item.json.mapsId }}",
            'CRM Form': "={{ $('Build CRM Rescue Row').item.json._crmFormMark }}",
          },
          matchingColumns: ['Maps ID'],
          schema: schemaFor(CRM_FORM_MARK_HEADERS, 'Maps ID'),
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: { useAppend: false },
      },
    },
    {
      id: uid(),
      name: 'Clear CRM Lock',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1100, 40],
      parameters: { mode: 'runOnceForAllItems', jsCode: CLEAR_JS },
    },
    {
      id: uid(),
      name: 'Workflow Guide',
      type: 'n8n-nodes-base.stickyNote',
      typeVersion: 1,
      position: [-1100, -40],
      parameters: {
        width: 520,
        height: 480,
        color: 5,
        content: `## Outbound CRM Rescue Router

**Semi-manual gate (form silence)**
1. Submit one polite test enquiry on their website form
2. Wait (e.g. 48h). If no reply → set Master Leads **CRM Form** = \`silent\` (or yes / 48h / fit / noreply)
3. Optional on Master Notes: \`d:Tuesday | t:2:14pm\` (copied into Form Day / Form Time)
4. If they replied → \`replied\` or \`none\`
5. This workflow appends **CRM Rescue** and sets CRM Form = \`routed\`

**Status**
Ready / Wait (other product live) / skip if Replied elsewhere

**Related**
→ CRM Rescue Send (drafts only)
Deploy: \`deploy-outbound-crm-rescue-router.sh --setup-tab\``,
      },
    },
  ];

  const connections = {
    'Every 5 Minutes': { main: [[{ node: 'Read Leads Sheet', type: 'main', index: 0 }]] },
    'Manual Trigger': { main: [[{ node: 'Read Leads Sheet', type: 'main', index: 0 }]] },
    'Read Leads Sheet': { main: [[{ node: 'Pick CRM Lead', type: 'main', index: 0 }]] },
    'Pick CRM Lead': { main: [[{ node: 'Read CRM Rescue Tab', type: 'main', index: 0 }]] },
    'Read CRM Rescue Tab': { main: [[{ node: 'Read Speed Fix Tab', type: 'main', index: 0 }]] },
    'Read Speed Fix Tab': { main: [[{ node: 'Read Google Profile Tab', type: 'main', index: 0 }]] },
    'Read Google Profile Tab': { main: [[{ node: 'Read Missed-Call Tab', type: 'main', index: 0 }]] },
    'Read Missed-Call Tab': {
      main: [[{ node: 'Read Search Visibility Tab', type: 'main', index: 0 }]],
    },
    'Read Search Visibility Tab': {
      main: [[{ node: 'Read Landing Page Tab', type: 'main', index: 0 }]],
    },
    'Read Landing Page Tab': {
      main: [[{ node: 'Build CRM Rescue Row', type: 'main', index: 0 }]],
    },
    'Build CRM Rescue Row': { main: [[{ node: 'Should Append', type: 'main', index: 0 }]] },
    'Should Append': {
      main: [
        [{ node: 'Append CRM Rescue', type: 'main', index: 0 }],
        [{ node: 'Mark CRM Form', type: 'main', index: 0 }],
      ],
    },
    'Append CRM Rescue': { main: [[{ node: 'Mark CRM Form', type: 'main', index: 0 }]] },
    'Mark CRM Form': { main: [[{ node: 'Clear CRM Lock', type: 'main', index: 0 }]] },
  };

  return {
    name: 'SYSBILT - Outbound CRM Rescue Router',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  };
}

function buildSetupTabWorkflow(sheetId) {
  const ENSURE_JS = `const meta = $input.first().json;
const sheets = meta.sheets || [];
const has = sheets.some((s) => s.properties?.title === '${CRM_SHEET}');
const requests = [];
if (!has) {
  requests.push({ addSheet: { properties: { title: '${CRM_SHEET}' } } });
}
return [{
  json: {
    spreadsheetId: meta.spreadsheetId || '${sheetId}',
    requests,
    skipBatch: requests.length === 0,
  },
}];`;

  return {
    name: 'SYSBILT - Outbound CRM Rescue Tab Setup',
    nodes: [
      {
        id: uid(),
        name: 'Setup Webhook',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2.1,
        position: [-600, 0],
        parameters: {
          path: 'sysbilt-outbound-crm-rescue-tab',
          httpMethod: 'POST',
          responseMode: 'responseNode',
          options: {},
        },
        webhookId: 'sysbilt-outbound-crm-rescue-tab',
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
        name: 'Ensure CRM Rescue Tab',
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
        name: 'Set CRM Form Header',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [600, 0],
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        parameters: {
          method: 'PUT',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent('Master Leads!R1')}?valueInputOption=USER_ENTERED`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: JSON.stringify({
            range: 'Master Leads!R1',
            majorDimension: 'ROWS',
            values: [['CRM Form']],
          }),
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Set CRM Rescue Headers',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [840, 0],
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        parameters: {
          method: 'PUT',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent('CRM Rescue!A1:K1')}?valueInputOption=USER_ENTERED`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: JSON.stringify({
            range: 'CRM Rescue!A1:K1',
            majorDimension: 'ROWS',
            values: [CRM_HEADERS],
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
          responseBody: `={{ ({ ok: true, spreadsheetId: '${sheetId}', tab: '${CRM_SHEET}', crmHeader: 'CRM Form' }) }}`,
          options: {},
        },
      },
    ],
    connections: {
      'Setup Webhook': { main: [[{ node: 'Get Spreadsheet Meta', type: 'main', index: 0 }]] },
      'Get Spreadsheet Meta': {
        main: [[{ node: 'Ensure CRM Rescue Tab', type: 'main', index: 0 }]],
      },
      'Ensure CRM Rescue Tab': { main: [[{ node: 'Needs Add Sheet', type: 'main', index: 0 }]] },
      'Needs Add Sheet': {
        main: [
          [{ node: 'Add Sheet If Needed', type: 'main', index: 0 }],
          [{ node: 'Skip Add Sheet', type: 'main', index: 0 }],
        ],
      },
      'Add Sheet If Needed': { main: [[{ node: 'Set CRM Form Header', type: 'main', index: 0 }]] },
      'Skip Add Sheet': { main: [[{ node: 'Set CRM Form Header', type: 'main', index: 0 }]] },
      'Set CRM Form Header': {
        main: [[{ node: 'Set CRM Rescue Headers', type: 'main', index: 0 }]],
      },
      'Set CRM Rescue Headers': { main: [[{ node: 'Respond OK', type: 'main', index: 0 }]] },
    },
    settings: { executionOrder: 'v1' },
  };
}

async function setupTab(sheetId) {
  console.log(`Setting up CRM Rescue tab on sheet ${sheetId}...`);
  const wf = await upsertWorkflow(buildSetupTabWorkflow(sheetId), { activate: true });
  saveDeployState({ OUTBOUND_CRM_RESCUE_TAB_SETUP_WORKFLOW_ID: wf.id });
  await new Promise((r) => setTimeout(r, 1500));
  const res = await fetch(`${N8N_BASE}/webhook/sysbilt-outbound-crm-rescue-tab`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'deploy-outbound-crm-rescue-router' }),
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
    throw new Error(`CRM Rescue tab setup failed: ${res.status} ${JSON.stringify(data)}`);
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

  const wf = await upsertWorkflow(buildRouterWorkflow(sheetId), { activate });
  saveDeployState({ OUTBOUND_CRM_RESCUE_ROUTER_WORKFLOW_ID: wf.id });

  console.log(
    `\nCRM Rescue Router${activate ? ' (active)' : ' (inactive)'}: ${N8N_BASE}/workflow/${wf.id}`,
  );
  console.log(`Gate: Master Leads CRM Form = silent|yes|48h|fit|noreply → ${CRM_SHEET}`);
  console.log('Human check: website form test → silence → set CRM Form');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
