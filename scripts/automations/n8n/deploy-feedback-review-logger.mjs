#!/usr/bin/env node
/**
 * Deploy Feedback Review sheet logger (n8n).
 *
 * Creates (or reuses) a Google Sheet, then a webhook that appends each finish.
 *
 * Env:
 *   N8N_API_KEY / cursor-mcp
 *   N8N_BASE_URL — default https://n8n.sysbilt.com
 *   FEEDBACK_REVIEW_SHEET_ID — optional existing spreadsheet
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-feedback-review-logger.mjs --setup-sheet
 *   node scripts/automations/n8n/deploy-feedback-review-logger.mjs --activate
 *   node scripts/automations/n8n/deploy-feedback-review-logger.mjs --fix-sheet --activate
 *   node scripts/automations/n8n/deploy-feedback-review-logger.mjs --setup-sheet --activate
 */
import {readFileSync, existsSync, writeFileSync} from 'node:fs'
import {randomUUID} from 'node:crypto'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '../../..')
const GOOGLE_SHEETS_CRED_ID = 'W8jOFatMKmraYw0F'
const GOOGLE_SHEETS_CRED_NAME = 'Google Sheets account'
const TAB = 'Responses'
const LEGACY_TAB = 'Sheet1'
const WEBHOOK_PATH = 'sysbilt-feedback-review'
const FIX_PATH = 'sysbilt-feedback-review-fix-sheet'

const HEADERS = [
  'Timestamp',
  'Path',
  'Score',
  'Catalog',
  'Service',
  'Service Other',
  'Detail',
  'Detail Other',
  'Result',
  'Result Note',
  'Attention',
  'Attention Note',
  'Comfort',
  'Comfort Note',
  'Person Name',
  'Person Feel',
  'Person Note',
  'Person Traits',
  'Materials',
  'Materials Note',
  'Improve Better',
  'Improve Better Note',
  'Improve Faster',
  'Improve Faster Note',
  'Again',
  'Next Help',
  'Contact Name',
  'Email',
  'Company',
  'Skeleton',
  'Draft',
]

function loadEnvLocal() {
  const path = resolve(ROOT, '.env.local')
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (!m) continue
    const key = m[1].trim()
    let val = m[2].trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = val
  }
}

function loadDeployState() {
  const path = resolve(__dirname, '.deploy-state.env')
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim()
  }
}

function saveDeployState(updates) {
  const path = resolve(__dirname, '.deploy-state.env')
  const existing = existsSync(path) ? readFileSync(path, 'utf8') : ''
  const map = new Map()
  for (const line of existing.split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (m) map.set(m[1].trim(), m[2].trim())
  }
  for (const [k, v] of Object.entries(updates)) map.set(k, v)
  writeFileSync(
    path,
    [...map.entries()].map(([k, v]) => `${k}=${v}`).join('\n') + '\n',
  )
}

loadEnvLocal()
loadDeployState()

const N8N_BASE = (process.env.N8N_BASE_URL || 'https://n8n.sysbilt.com').replace(/\/$/, '')
const N8N_KEY = process.env.N8N_API_KEY || process.env['cursor-mcp']
if (!N8N_KEY) {
  console.error('Missing N8N_API_KEY or cursor-mcp in .env.local')
  process.exit(1)
}

const n8n = async (method, path, body) => {
  const res = await fetch(`${N8N_BASE}/api/v1${path}`, {
    method,
    headers: {
      'X-N8N-API-KEY': N8N_KEY,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    data = {raw: text}
  }
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(data)}`)
  }
  return data
}

const uid = () => randomUUID()

function sheetRef(sheetId, sheetName = TAB) {
  return {
    documentId: {__rl: true, value: sheetId, mode: 'id'},
    sheetName: {
      __rl: true,
      value: sheetName,
      mode: 'name',
      cachedResultName: sheetName,
    },
  }
}

function headerSchema() {
  return HEADERS.map((id) => ({
    id,
    displayName: id,
    required: false,
    defaultMatch: false,
    display: true,
    type: 'string',
    canBeUsedToMatch: false,
  }))
}

async function findWorkflowByName(name) {
  const {data} = await n8n('GET', '/workflows?limit=250')
  return (data || []).find((w) => w.name === name) || null
}

async function upsertWorkflow(workflow, {activate = false} = {}) {
  const existing = await findWorkflowByName(workflow.name)
  let wf
  if (existing) {
    const full = await n8n('GET', `/workflows/${existing.id}`)
    wf = await n8n('PUT', `/workflows/${existing.id}`, {
      name: workflow.name,
      nodes: workflow.nodes,
      connections: workflow.connections,
      settings: workflow.settings || full.settings || {executionOrder: 'v1'},
      staticData: full.staticData ?? null,
    })
    console.log(`Updated workflow ${workflow.name} (${wf.id})`)
  } else {
    wf = await n8n('POST', '/workflows', {
      name: workflow.name,
      nodes: workflow.nodes,
      connections: workflow.connections,
      settings: workflow.settings || {executionOrder: 'v1'},
    })
    console.log(`Created workflow ${workflow.name} (${wf.id})`)
  }
  if (activate) {
    await n8n('POST', `/workflows/${wf.id}/activate`, {})
    console.log('Activated')
  }
  return wf
}

function buildSheetSetupWorkflow() {
  return {
    name: 'SYSBILT - Feedback Review Sheet Setup',
    nodes: [
      {
        id: uid(),
        name: 'Setup Webhook',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2.1,
        position: [-640, 0],
        parameters: {
          path: 'sysbilt-feedback-review-sheet-setup',
          httpMethod: 'POST',
          responseMode: 'responseNode',
          options: {},
        },
        webhookId: 'sysbilt-feedback-review-sheet-setup',
      },
      {
        id: uid(),
        name: 'Create Spreadsheet',
        type: 'n8n-nodes-base.googleSheets',
        typeVersion: 4.7,
        position: [-400, 0],
        credentials: {
          googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
        },
        parameters: {
          resource: 'spreadsheet',
          operation: 'create',
          title: 'SYSBILT Feedback Review',
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Rename To Responses',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [-160, 0],
        parameters: {
          mode: 'runOnceForAllItems',
          jsCode: `const created = $("Create Spreadsheet").item.json;
const spreadsheetId = created.spreadsheetId;
const spreadsheetUrl = created.spreadsheetUrl;
const sheets = created.sheets || [];
const sheet1 = sheets.find((s) => s.properties?.title === 'Sheet1') || sheets[0];
const sheetIdNum = sheet1?.properties?.sheetId ?? 0;
return [{
  json: {
    spreadsheetId,
    spreadsheetUrl,
    requests: [{
      updateSheetProperties: {
        properties: { sheetId: sheetIdNum, title: '${TAB}' },
        fields: 'title',
      },
    }],
  },
}];`,
        },
      },
      {
        id: uid(),
        name: 'Apply Rename',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [80, 0],
        credentials: {
          googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
        },
        parameters: {
          method: 'POST',
          url: '=https://sheets.googleapis.com/v4/spreadsheets/{{ $json.spreadsheetId }}:batchUpdate',
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
        name: 'Write Headers',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [320, 0],
        credentials: {
          googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
        },
        parameters: {
          method: 'PUT',
          url: `=https://sheets.googleapis.com/v4/spreadsheets/{{ $("Create Spreadsheet").item.json.spreadsheetId }}/values/${encodeURIComponent(`${TAB}!A1`)}?valueInputOption=RAW`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: JSON.stringify({values: [HEADERS]}),
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Respond With Sheet URL',
        type: 'n8n-nodes-base.respondToWebhook',
        typeVersion: 1.1,
        position: [560, 0],
        parameters: {
          respondWith: 'json',
          responseBody:
            '={{ ({ spreadsheetId: $("Create Spreadsheet").item.json.spreadsheetId, spreadsheetUrl: $("Create Spreadsheet").item.json.spreadsheetUrl }) }}',
          options: {},
        },
      },
    ],
    connections: {
      'Setup Webhook': {main: [[{node: 'Create Spreadsheet', type: 'main', index: 0}]]},
      'Create Spreadsheet': {main: [[{node: 'Rename To Responses', type: 'main', index: 0}]]},
      'Rename To Responses': {main: [[{node: 'Apply Rename', type: 'main', index: 0}]]},
      'Apply Rename': {main: [[{node: 'Write Headers', type: 'main', index: 0}]]},
      'Write Headers': {main: [[{node: 'Respond With Sheet URL', type: 'main', index: 0}]]},
    },
    settings: {executionOrder: 'v1'},
  }
}

function buildLoggerWorkflow(sheetId) {
  return {
    name: 'SYSBILT - Feedback Review Logger',
    nodes: [
      {
        id: uid(),
        name: 'Webhook',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2.1,
        position: [-480, 0],
        parameters: {
          path: WEBHOOK_PATH,
          httpMethod: 'POST',
          responseMode: 'responseNode',
          options: {},
        },
        webhookId: WEBHOOK_PATH,
      },
      {
        id: uid(),
        name: 'Normalise Row',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [-240, 0],
        parameters: {
          mode: 'runOnceForAllItems',
          jsCode: `const body = $input.first().json.body || $input.first().json;
const out = {};
for (const h of ${JSON.stringify(HEADERS)}) {
  const v = body[h];
  out[h] = v == null ? '' : String(v);
}
if (!out.Timestamp) out.Timestamp = new Date().toISOString();
return [{ json: out }];`,
        },
      },
      {
        id: uid(),
        name: 'Append Row',
        type: 'n8n-nodes-base.googleSheets',
        typeVersion: 4.7,
        position: [0, 0],
        credentials: {
          googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
        },
        parameters: {
          operation: 'append',
          ...sheetRef(sheetId),
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
      },
      {
        id: uid(),
        name: 'Respond OK',
        type: 'n8n-nodes-base.respondToWebhook',
        typeVersion: 1.1,
        position: [240, 0],
        parameters: {
          respondWith: 'json',
          responseBody: '={{ ({ ok: true }) }}',
          options: {},
        },
      },
    ],
    connections: {
      Webhook: {main: [[{node: 'Normalise Row', type: 'main', index: 0}]]},
      'Normalise Row': {main: [[{node: 'Append Row', type: 'main', index: 0}]]},
      'Append Row': {main: [[{node: 'Respond OK', type: 'main', index: 0}]]},
    },
    settings: {executionOrder: 'v1'},
  }
}

async function runWebhookSetup(path, workflow) {
  const wf = await upsertWorkflow(workflow, {activate: true})
  await new Promise((r) => setTimeout(r, 2000))
  const url = `${N8N_BASE}/webhook/${path}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({source: 'deploy-feedback-review-logger'}),
  })
  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    data = {raw: text}
  }
  console.log('Setup webhook status', res.status, text.slice(0, 400))
  // Deactivate one-shot setup workflow
  try {
    await n8n('POST', `/workflows/${wf.id}/deactivate`, {})
  } catch {
    // non-fatal
  }
  if (!res.ok) {
    throw new Error(`Setup webhook ${path} → ${res.status}: ${JSON.stringify(data)}`)
  }
  return {data, workflowId: wf.id}
}

async function setupSheet() {
  let sheetId = process.env.FEEDBACK_REVIEW_SHEET_ID
  if (!sheetId) {
    console.log('Creating Feedback Review spreadsheet...')
    const {data, workflowId} = await runWebhookSetup(
      'sysbilt-feedback-review-sheet-setup',
      buildSheetSetupWorkflow(),
    )
    sheetId =
      data.spreadsheetId ||
      (data.spreadsheetUrl &&
        String(data.spreadsheetUrl).match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1])
    if (!sheetId) {
      throw new Error(`Setup returned unexpected payload: ${JSON.stringify(data)}`)
    }
    saveDeployState({
      FEEDBACK_REVIEW_SHEET_SETUP_WORKFLOW_ID: workflowId,
      FEEDBACK_REVIEW_SHEET_ID: sheetId,
    })
    process.env.FEEDBACK_REVIEW_SHEET_ID = sheetId
    console.log(`Sheet: https://docs.google.com/spreadsheets/d/${sheetId}/edit`)
  } else {
    console.log(`Using existing sheet ${sheetId}`)
    saveDeployState({FEEDBACK_REVIEW_SHEET_ID: sheetId})
  }
  return sheetId
}

function buildFixSheetWorkflow(sheetId) {
  const FIX_JS = `const meta = $input.first().json;
const sheets = meta.sheets || [];
const legacy = sheets.find((s) => s.properties?.title === '${LEGACY_TAB}');
const responses = sheets.find((s) => s.properties?.title === '${TAB}');
const requests = [];
let readTitle = '${TAB}';

if (!responses && legacy) {
  requests.push({
    updateSheetProperties: {
      properties: { sheetId: legacy.properties.sheetId, title: '${TAB}' },
      fields: 'title',
    },
  });
}
// Always read Responses after optional rename.
return [{
  json: {
    spreadsheetId: '${sheetId}',
    requests,
    skipRename: requests.length === 0,
    readTitle: '${TAB}',
  },
}];`

  const REMAP_JS = `const headers = ${JSON.stringify(HEADERS)};
const payload = $input.first().json;
const values = payload.values || [];
if (!values.length) {
  return [{ json: { values: [headers], rowCount: 0 } }];
}

const head = values[0].map((c) => String(c || '').trim());
const hasJunk = head[0] === 'spreadsheetId' || head.includes('spreadsheetId');
const tsIdx = head.indexOf('Timestamp');
const start = hasJunk && tsIdx >= 0 ? tsIdx : head[0] === 'Timestamp' ? 0 : 0;

const out = [headers];
for (let i = 1; i < values.length; i++) {
  const row = values[i] || [];
  const slice = start > 0 ? row.slice(start) : row;
  const ts = String(slice[0] || '').trim();
  // Drop duplicate header rows and empty rows
  if (!ts || ts === 'Timestamp' || ts === 'spreadsheetId') continue;
  if (!ts.includes('T') && !/^\\d{4}-/.test(ts)) continue;
  const clean = headers.map((_, idx) => String(slice[idx] ?? ''));
  out.push(clean);
}

return [{ json: { values: out, rowCount: out.length - 1 } }];`

  return {
    name: 'SYSBILT - Feedback Review Sheet Fix',
    nodes: [
      {
        id: uid(),
        name: 'Setup Webhook',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2.1,
        position: [-720, 0],
        parameters: {
          path: FIX_PATH,
          httpMethod: 'POST',
          responseMode: 'responseNode',
          options: {},
        },
        webhookId: FIX_PATH,
      },
      {
        id: uid(),
        name: 'Get Spreadsheet Meta',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [-480, 0],
        credentials: {
          googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
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
        name: 'Plan Rename',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [-240, 0],
        parameters: {mode: 'runOnceForAllItems', jsCode: FIX_JS},
      },
      {
        id: uid(),
        name: 'Needs Rename',
        type: 'n8n-nodes-base.if',
        typeVersion: 2.3,
        position: [0, 0],
        parameters: {
          conditions: {
            options: {caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3},
            conditions: [
              {
                id: uid(),
                leftValue: '={{ $json.skipRename }}',
                rightValue: true,
                operator: {type: 'boolean', operation: 'notEquals'},
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
        name: 'Apply Rename',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [240, -100],
        credentials: {
          googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
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
        name: 'Skip Rename',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [240, 100],
        parameters: {
          mode: 'runOnceForAllItems',
          jsCode: 'return $input.all();',
        },
      },
      {
        id: uid(),
        name: 'Read Values',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [480, 0],
        credentials: {
          googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
        },
        parameters: {
          method: 'GET',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(`${TAB}!A1:AZ500`)}`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Remap Rows',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [720, 0],
        parameters: {mode: 'runOnceForAllItems', jsCode: REMAP_JS},
      },
      {
        id: uid(),
        name: 'Clear Responses',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [960, 0],
        credentials: {
          googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
        },
        parameters: {
          method: 'POST',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(`${TAB}!A:AZ`)}:clear`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: '{}',
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Write Clean Values',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [1200, 0],
        credentials: {
          googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
        },
        parameters: {
          method: 'PUT',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(`${TAB}!A1`)}?valueInputOption=RAW`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: '={{ JSON.stringify({ values: $("Remap Rows").item.json.values }) }}',
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Respond OK',
        type: 'n8n-nodes-base.respondToWebhook',
        typeVersion: 1.1,
        position: [1440, 0],
        parameters: {
          respondWith: 'json',
          responseBody:
            '={{ ({ ok: true, spreadsheetId: "' +
            sheetId +
            '", tab: "' +
            TAB +
            '", rowCount: $("Remap Rows").item.json.rowCount }) }}',
          options: {},
        },
      },
    ],
    connections: {
      'Setup Webhook': {main: [[{node: 'Get Spreadsheet Meta', type: 'main', index: 0}]]},
      'Get Spreadsheet Meta': {main: [[{node: 'Plan Rename', type: 'main', index: 0}]]},
      'Plan Rename': {main: [[{node: 'Needs Rename', type: 'main', index: 0}]]},
      'Needs Rename': {
        main: [
          [{node: 'Apply Rename', type: 'main', index: 0}],
          [{node: 'Skip Rename', type: 'main', index: 0}],
        ],
      },
      'Apply Rename': {main: [[{node: 'Read Values', type: 'main', index: 0}]]},
      'Skip Rename': {main: [[{node: 'Read Values', type: 'main', index: 0}]]},
      'Read Values': {main: [[{node: 'Remap Rows', type: 'main', index: 0}]]},
      'Remap Rows': {main: [[{node: 'Clear Responses', type: 'main', index: 0}]]},
      'Clear Responses': {main: [[{node: 'Write Clean Values', type: 'main', index: 0}]]},
      'Write Clean Values': {main: [[{node: 'Respond OK', type: 'main', index: 0}]]},
    },
    settings: {executionOrder: 'v1'},
  }
}

async function fixSheet(sheetId) {
  console.log(`Fixing headers / renaming to ${TAB} on ${sheetId}...`)
  const {data, workflowId} = await runWebhookSetup(FIX_PATH, buildFixSheetWorkflow(sheetId))
  if (!data.ok) throw new Error(`Fix failed: ${JSON.stringify(data)}`)
  saveDeployState({
    FEEDBACK_REVIEW_SHEET_FIX_WORKFLOW_ID: workflowId,
    FEEDBACK_REVIEW_SHEET_ID: sheetId,
  })
  console.log(`Fixed. Kept ${data.rowCount ?? '?'} response rows on tab ${TAB}.`)
}

async function deployLogger(sheetId, activate) {
  const wf = await upsertWorkflow(buildLoggerWorkflow(sheetId), {activate})
  const webhookUrl = `${N8N_BASE}/webhook/${WEBHOOK_PATH}`
  saveDeployState({
    FEEDBACK_REVIEW_LOGGER_WORKFLOW_ID: wf.id,
    FEEDBACK_REVIEW_SHEET_ID: sheetId,
    FEEDBACK_REVIEW_SHEET_WEBHOOK_URL: webhookUrl,
  })
  console.log(`\nLogger webhook: ${webhookUrl}`)
  console.log('Add to .env.local:')
  console.log(`FEEDBACK_REVIEW_SHEET_WEBHOOK_URL=${webhookUrl}`)
  console.log(`FEEDBACK_REVIEW_SHEET_ID=${sheetId}`)
  return wf
}

const setup = process.argv.includes('--setup-sheet')
const fix = process.argv.includes('--fix-sheet')
const activate = process.argv.includes('--activate')

const sheetId = setup
  ? await setupSheet()
  : process.env.FEEDBACK_REVIEW_SHEET_ID

if (!sheetId) {
  console.error('Missing FEEDBACK_REVIEW_SHEET_ID. Run with --setup-sheet first.')
  process.exit(1)
}

if (fix) await fixSheet(sheetId)
await deployLogger(sheetId, activate || setup || fix)
console.log('\nDone.')