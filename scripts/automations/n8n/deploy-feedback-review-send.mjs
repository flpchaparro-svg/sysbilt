#!/usr/bin/env node
/**
 * Feedback Review · Send tab + personalised link builder.
 *
 * Adds a "Send" tab on the Feedback Review spreadsheet. You fill rows, set
 * Status=Ready, and this workflow writes the /r/sysbilt?name=&email=&company=
 * link, then a Gmail draft (does not send). End-of-job tokens stay later.
 *
 * Env:
 *   N8N_API_KEY / cursor-mcp
 *   N8N_BASE_URL — default https://n8n.sysbilt.com
 *   FEEDBACK_REVIEW_SHEET_ID — from deploy-feedback-review-logger.mjs
 *   PUBLIC_BASE_URL — default https://sysbilt.com
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-feedback-review-send.mjs --setup-tab --activate
 *   node scripts/automations/n8n/deploy-feedback-review-send.mjs --setup-dropdowns
 *   node scripts/automations/n8n/deploy-feedback-review-send.mjs --activate
 */
import {readFileSync, existsSync, writeFileSync} from 'node:fs'
import {randomUUID} from 'node:crypto'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '../../..')
const GOOGLE_SHEETS_CRED_ID = 'W8jOFatMKmraYw0F'
const GOOGLE_SHEETS_CRED_NAME = 'Google Sheets account'
const GMAIL_CRED_ID = 'pR8GnMBXmukPyA2V'
const GMAIL_CRED_NAME = 'Gmail account'

const SEND_TAB = 'Send'
const SEND_RANGE = 'A1:J2000'
const SETUP_PATH = 'sysbilt-feedback-review-send-tab'
const WEBHOOK_PATH = 'sysbilt-feedback-review-send'

const SEND_HEADERS = [
  'Contact Name',
  'Email',
  'Company',
  'Job',
  'Catalog',
  'Status',
  'Link',
  'Notes',
  'Updated',
  'SMS',
]

const SEND_STATUSES = ['New', 'Ready', 'Drafted', 'Done']
const SEND_CATALOGS = ['general', 'products']
const SEND_JOBS = [
  'websites',
  'crm',
  'automation',
  'ai',
  'content',
  'training',
  'dashboards',
  'website',
  'speed-fix',
  'google-profile',
  'quote-capture',
  'search-fix',
]
const DROPDOWNS_PATH = 'sysbilt-feedback-review-send-dropdowns'

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
/** Live site for client-facing links. Do not use local PUBLIC_BASE_URL. */
const PUBLIC_BASE = (
  process.env.FEEDBACK_REVIEW_PUBLIC_BASE ||
  'https://sysbilt.com'
).replace(/\/$/, '')

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

function sheetRef(sheetId, sheetName = SEND_TAB) {
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

function headerSchema(matchCol) {
  return SEND_HEADERS.map((id) => ({
    id,
    displayName: id,
    required: false,
    defaultMatch: false,
    display: true,
    type: 'string',
    canBeUsedToMatch: id === matchCol,
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

function buildSetupTabWorkflow(sheetId) {
  const ENSURE_JS = `const meta = $input.first().json;
const sheets = meta.sheets || [];
const has = sheets.some((s) => s.properties?.title === '${SEND_TAB}');
const requests = [];
if (!has) {
  requests.push({ addSheet: { properties: { title: '${SEND_TAB}' } } });
}
return [{
  json: {
    spreadsheetId: meta.spreadsheetId || '${sheetId}',
    requests,
    skipBatch: requests.length === 0,
  },
}];`

  return {
    name: 'SYSBILT - Feedback Review Send Tab Setup',
    nodes: [
      {
        id: uid(),
        name: 'Setup Webhook',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2.1,
        position: [-600, 0],
        parameters: {
          path: SETUP_PATH,
          httpMethod: 'POST',
          responseMode: 'responseNode',
          options: {},
        },
        webhookId: SETUP_PATH,
      },
      {
        id: uid(),
        name: 'Get Spreadsheet Meta',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [-360, 0],
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
        name: 'Ensure Send Tab',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [-120, 0],
        parameters: {mode: 'runOnceForAllItems', jsCode: ENSURE_JS},
      },
      {
        id: uid(),
        name: 'Needs Add Sheet',
        type: 'n8n-nodes-base.if',
        typeVersion: 2.3,
        position: [120, 0],
        parameters: {
          conditions: {
            options: {caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3},
            conditions: [
              {
                id: uid(),
                leftValue: '={{ $json.skipBatch }}',
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
        name: 'Add Sheet If Needed',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [360, -80],
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
        name: 'Skip Add Sheet',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [360, 120],
        parameters: {mode: 'runOnceForAllItems', jsCode: 'return $input.all();'},
      },
      {
        id: uid(),
        name: 'Set Send Headers',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [600, 0],
        credentials: {
          googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
        },
        parameters: {
          method: 'PUT',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(`${SEND_TAB}!A1:J1`)}?valueInputOption=RAW`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: JSON.stringify({values: [SEND_HEADERS]}),
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
          responseBody: `={{ ({ ok: true, spreadsheetId: "${sheetId}", sendSheet: "${SEND_TAB}" }) }}`,
          options: {},
        },
      },
    ],
    connections: {
      'Setup Webhook': {main: [[{node: 'Get Spreadsheet Meta', type: 'main', index: 0}]]},
      'Get Spreadsheet Meta': {main: [[{node: 'Ensure Send Tab', type: 'main', index: 0}]]},
      'Ensure Send Tab': {main: [[{node: 'Needs Add Sheet', type: 'main', index: 0}]]},
      'Needs Add Sheet': {
        main: [
          [{node: 'Add Sheet If Needed', type: 'main', index: 0}],
          [{node: 'Skip Add Sheet', type: 'main', index: 0}],
        ],
      },
      'Add Sheet If Needed': {main: [[{node: 'Set Send Headers', type: 'main', index: 0}]]},
      'Skip Add Sheet': {main: [[{node: 'Set Send Headers', type: 'main', index: 0}]]},
      'Set Send Headers': {main: [[{node: 'Respond OK', type: 'main', index: 0}]]},
    },
    settings: {executionOrder: 'v1'},
  }
}

const BUILD_LINKS_JS = `const base = ${JSON.stringify(PUBLIC_BASE + '/r/sysbilt')};
const rows = $input.all().map((i) => i.json);
const out = [];
const now = new Date().toISOString();

for (const row of rows) {
  const status = String(row.Status || '').trim().toLowerCase();
  if (status !== 'ready') continue;

  const name = String(row['Contact Name'] || '').trim();
  const email = String(row.Email || '').trim();
  const company = String(row.Company || '').trim();
  const job = String(row.Job || '').trim().toLowerCase();
  const catalog = String(row.Catalog || '').trim().toLowerCase();

  if (!email) {
    out.push({
      json: {
        ...row,
        Status: 'Ready',
        Notes: [row.Notes, 'Skipped: Email required so we can match the row'].filter(Boolean).join(' · '),
        Updated: now,
        _skip: true,
      },
    });
    continue;
  }

  if (!name && !company && !job) {
    // email alone is fine for HubSpot match + generic greeting
  }

  const parts = []
  if (name) parts.push('name=' + encodeURIComponent(name))
  if (email) parts.push('email=' + encodeURIComponent(email))
  if (company) parts.push('company=' + encodeURIComponent(company))
  if (job) parts.push('job=' + encodeURIComponent(job))
  if (catalog === 'products') parts.push('catalog=products')
  const link = parts.length ? base + '?' + parts.join('&') : base

  const firstName = name.split(/\\s+/).filter(Boolean)[0] || '';

  function esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  const greeting = firstName ? ('Hi ' + esc(firstName) + ',') : 'Hi,';
  const subject = firstName
    ? firstName + ', a quick note on how we did'
    : 'A quick note on how we did';
  const html = [
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#222">',
    '<p style="margin:0 0 14px">' + greeting + '</p>',
    '<p style="margin:0 0 14px">Thank you for working with us. We hope we work together again.</p>',
    '<p style="margin:0 0 14px">To keep getting better, we\\'d like your honest take on how we did, and anything we should change.</p>',
    '<p style="margin:0 0 14px"><a href="' + esc(link) + '" style="color:#1a73e8;text-decoration:underline">Give feedback</a></p>',
    '<p style="margin:0 0 14px">If you want to leave a Google review as well, we\\'d be glad. Only if it feels right.</p>',
    '<p style="margin:0 0 14px">Felipe<br>SYSBILT</p>',
    '</div>',
  ].join('');
  const sms = firstName
    ? ('Hi ' + firstName + ", we'd like your honest take on how we did. A few taps: " + link)
    : ("We'd like your honest take on how we did. A few taps: " + link);

  out.push({
    json: {
      'Contact Name': name,
      Email: email,
      Company: company,
      Job: job,
      Catalog: catalog === 'products' ? 'products' : '',
      Status: 'Drafted',
      Link: link,
      Notes: String(row.Notes || '').trim(),
      Updated: now,
      SMS: sms,
      _skip: false,
      _subject: subject,
      _html: html,
      _to: email,
    },
  });
}

if (!out.length) {
  return [{ json: { _skip: true, _empty: true } }];
}
return out;`

function buildLinkBuilderWorkflow(sheetId) {
  return {
    name: 'SYSBILT - Feedback Review Send Links',
    nodes: [
      {
        id: uid(),
        name: 'Every 5 Minutes',
        type: 'n8n-nodes-base.scheduleTrigger',
        typeVersion: 1.2,
        position: [-720, -80],
        parameters: {
          rule: {interval: [{field: 'minutes', minutesInterval: 5}]},
        },
      },
      {
        id: uid(),
        name: 'Manual',
        type: 'n8n-nodes-base.manualTrigger',
        typeVersion: 1,
        position: [-720, 80],
        parameters: {},
      },
      {
        id: uid(),
        name: 'Webhook',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2.1,
        position: [-720, 240],
        parameters: {
          path: WEBHOOK_PATH,
          httpMethod: 'POST',
          responseMode: 'lastNode',
          options: {},
        },
        webhookId: WEBHOOK_PATH,
      },
      {
        id: uid(),
        name: 'Read Send Tab',
        type: 'n8n-nodes-base.googleSheets',
        typeVersion: 4.7,
        position: [-420, 0],
        alwaysOutputData: true,
        credentials: {
          googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
        },
        parameters: {
          operation: 'read',
          ...sheetRef(sheetId),
          options: {
            dataLocationOnSheet: {
              values: {
                rangeDefinition: 'specifyRangeA1',
                range: SEND_RANGE,
              },
            },
          },
        },
      },
      {
        id: uid(),
        name: 'Build Links',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [-180, 0],
        parameters: {mode: 'runOnceForAllItems', jsCode: BUILD_LINKS_JS},
      },
      {
        id: uid(),
        name: 'Has Rows',
        type: 'n8n-nodes-base.if',
        typeVersion: 2.3,
        position: [60, 0],
        parameters: {
          conditions: {
            options: {caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3},
            conditions: [
              {
                id: uid(),
                leftValue: '={{ $json._empty }}',
                rightValue: true,
                operator: {type: 'boolean', operation: 'notEquals'},
              },
              {
                id: uid(),
                leftValue: '={{ $json._skip }}',
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
        name: 'Gmail Draft',
        type: 'n8n-nodes-base.gmail',
        typeVersion: 2.1,
        position: [320, -80],
        credentials: {
          gmailOAuth2: {id: GMAIL_CRED_ID, name: GMAIL_CRED_NAME},
        },
        parameters: {
          resource: 'draft',
          operation: 'create',
          subject: '={{ $json._subject }}',
          emailType: 'html',
          message: '={{ $json._html }}',
          options: {
            sendTo: '={{ $json._to }}',
          },
        },
      },
      {
        id: uid(),
        name: 'Write Link',
        type: 'n8n-nodes-base.googleSheets',
        typeVersion: 4.7,
        position: [560, -80],
        credentials: {
          googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
        },
        parameters: {
          operation: 'appendOrUpdate',
          ...sheetRef(sheetId),
          columns: {
            mappingMode: 'defineBelow',
            value: {
              'Contact Name': "={{ $('Build Links').item.json['Contact Name'] }}",
              Email: "={{ $('Build Links').item.json.Email }}",
              Company: "={{ $('Build Links').item.json.Company }}",
              Job: "={{ $('Build Links').item.json.Job }}",
              Catalog: "={{ $('Build Links').item.json.Catalog }}",
              Status: 'Drafted',
              Link: "={{ $('Build Links').item.json.Link }}",
              Notes:
                "={{ (() => { const prior = String($('Build Links').item.json.Notes || '').trim(); const stamp = 'draft:' + new Date().toISOString().slice(0, 10); return prior ? prior + ' · ' + stamp : stamp; })() }}",
              Updated: '={{ new Date().toISOString() }}',
              SMS: "={{ $('Build Links').item.json.SMS }}",
            },
            matchingColumns: ['Email'],
            schema: headerSchema('Email'),
            attemptToConvertTypes: false,
            convertFieldsToString: false,
          },
          options: {useAppend: false},
        },
      },
      {
        id: uid(),
        name: 'No Ready Rows',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [320, 120],
        parameters: {
          mode: 'runOnceForAllItems',
          jsCode: 'return [{ json: { ok: true, updated: 0 } }];',
        },
      },
    ],
    connections: {
      'Every 5 Minutes': {main: [[{node: 'Read Send Tab', type: 'main', index: 0}]]},
      Manual: {main: [[{node: 'Read Send Tab', type: 'main', index: 0}]]},
      Webhook: {main: [[{node: 'Read Send Tab', type: 'main', index: 0}]]},
      'Read Send Tab': {main: [[{node: 'Build Links', type: 'main', index: 0}]]},
      'Build Links': {main: [[{node: 'Has Rows', type: 'main', index: 0}]]},
      'Has Rows': {
        main: [
          [{node: 'Gmail Draft', type: 'main', index: 0}],
          [{node: 'No Ready Rows', type: 'main', index: 0}],
        ],
      },
      'Gmail Draft': {main: [[{node: 'Write Link', type: 'main', index: 0}]]},
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
    body: JSON.stringify({source: 'deploy-feedback-review-send'}),
  })
  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    data = {raw: text}
  }
  console.log('Setup webhook status', res.status, text.slice(0, 400))
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

async function setupTab(sheetId) {
  console.log(`Ensuring ${SEND_TAB} tab on ${sheetId}...`)
  const {data, workflowId} = await runWebhookSetup(
    SETUP_PATH,
    buildSetupTabWorkflow(sheetId),
  )
  if (!data.ok) throw new Error(`Send tab setup failed: ${JSON.stringify(data)}`)
  saveDeployState({
    FEEDBACK_REVIEW_SEND_TAB_SETUP_WORKFLOW_ID: workflowId,
    FEEDBACK_REVIEW_SHEET_ID: sheetId,
  })
  console.log(`Send tab ready: https://docs.google.com/spreadsheets/d/${sheetId}/edit`)
}

function buildDropdownsWorkflow(sheetId) {
  return {
    name: 'SYSBILT - Feedback Review Send Dropdowns',
    nodes: [
      {
        id: uid(),
        name: 'Setup Webhook',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2.1,
        position: [-480, 0],
        parameters: {
          path: DROPDOWNS_PATH,
          httpMethod: 'POST',
          responseMode: 'responseNode',
          options: {},
        },
        webhookId: DROPDOWNS_PATH,
      },
      {
        id: uid(),
        name: 'Get Spreadsheet Meta',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [-240, 0],
        credentials: {
          googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
        },
        parameters: {
          method: 'GET',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets.properties`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Build Dropdown Requests',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [0, 0],
        parameters: {
          mode: 'runOnceForAllItems',
          jsCode: `const meta = $input.first().json;
const sheet = (meta.sheets || []).find((s) => s.properties?.title === '${SEND_TAB}');
if (!sheet?.properties || (sheet.properties.sheetId !== 0 && !sheet.properties.sheetId)) {
  throw new Error('Send tab sheetId not found');
}
const sid = sheet.properties.sheetId;
const listRule = (values) => ({
  condition: {
    type: 'ONE_OF_LIST',
    values: values.map((v) => ({ userEnteredValue: v })),
  },
  showCustomUi: true,
  strict: true,
});
const endRow = 2000;
const col = (start, end, values) => ({
  setDataValidation: {
    range: {
      sheetId: sid,
      startRowIndex: 1,
      endRowIndex: endRow,
      startColumnIndex: start,
      endColumnIndex: end,
    },
    rule: listRule(values),
  },
});
// Send headers: Contact Name, Email, Company, Job, Catalog, Status, ...
const requests = [
  col(3, 4, ${JSON.stringify(SEND_JOBS)}),
  col(4, 5, ${JSON.stringify(SEND_CATALOGS)}),
  col(5, 6, ${JSON.stringify(SEND_STATUSES)}),
];
return [{ json: { requests } }];`,
        },
      },
      {
        id: uid(),
        name: 'Apply Dropdowns',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [240, 0],
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
        name: 'Respond OK',
        type: 'n8n-nodes-base.respondToWebhook',
        typeVersion: 1.1,
        position: [480, 0],
        parameters: {
          respondWith: 'json',
          responseBody: '={{ ({ ok: true, dropdowns: ["Job", "Catalog", "Status"] }) }}',
          options: {},
        },
      },
    ],
    connections: {
      'Setup Webhook': {main: [[{node: 'Get Spreadsheet Meta', type: 'main', index: 0}]]},
      'Get Spreadsheet Meta': {
        main: [[{node: 'Build Dropdown Requests', type: 'main', index: 0}]],
      },
      'Build Dropdown Requests': {main: [[{node: 'Apply Dropdowns', type: 'main', index: 0}]]},
      'Apply Dropdowns': {main: [[{node: 'Respond OK', type: 'main', index: 0}]]},
    },
    settings: {executionOrder: 'v1'},
  }
}

async function setupDropdowns(sheetId) {
  console.log(`Applying Send tab dropdowns on ${sheetId}...`)
  const {data, workflowId} = await runWebhookSetup(
    DROPDOWNS_PATH,
    buildDropdownsWorkflow(sheetId),
  )
  if (!data.ok) throw new Error(`Dropdown setup failed: ${JSON.stringify(data)}`)
  saveDeployState({FEEDBACK_REVIEW_SEND_DROPDOWNS_WORKFLOW_ID: workflowId})
  console.log('Dropdowns: Job, Catalog, Status')
}

async function deployBuilder(sheetId, activate) {
  const wf = await upsertWorkflow(buildLinkBuilderWorkflow(sheetId), {activate})
  const webhookUrl = `${N8N_BASE}/webhook/${WEBHOOK_PATH}`
  saveDeployState({
    FEEDBACK_REVIEW_SEND_LINKS_WORKFLOW_ID: wf.id,
    FEEDBACK_REVIEW_SHEET_ID: sheetId,
    FEEDBACK_REVIEW_SEND_WEBHOOK_URL: webhookUrl,
  })
  console.log(`\nSend links webhook: ${webhookUrl}`)
  console.log(`Public base for links: ${PUBLIC_BASE}`)
  console.log('\nHow to use:')
  console.log('1. Open the Send tab')
  console.log('2. Fill Contact Name / Email / Company / Job (optional)')
  console.log('3. Set Status = Ready')
  console.log('4. Wait ~5 min, or run the workflow Manual / POST the webhook')
  console.log('5. Gmail draft is created. Status becomes Drafted. SMS column fills')
  console.log('6. Open Gmail Drafts, review, then send yourself. Copy SMS if you want to text them')
  return wf
}

async function inspect() {
  const wfId = process.env.FEEDBACK_REVIEW_SEND_LINKS_WORKFLOW_ID
  if (!wfId) {
    console.error('Missing FEEDBACK_REVIEW_SEND_LINKS_WORKFLOW_ID')
    process.exit(1)
  }
  const wf = await n8n('GET', `/workflows/${wfId}`)
  console.log('Workflow', wf.id, wf.name, 'active=', wf.active)
  const nodes = (wf.nodes || []).map((n) => n.name)
  console.log('Nodes:', nodes.join(' → '))
  const execs = await n8n('GET', `/executions?limit=8&workflowId=${wfId}`)
  const rows = execs.data || []
  console.log('Recent executions:', rows.length)
  for (const e of rows) {
    console.log(
      '-',
      e.id,
      e.status,
      e.mode,
      e.startedAt,
      e.stoppedAt || '',
    )
  }
  const lastId = rows[0]?.id
  if (!lastId) return
  const full = await n8n('GET', `/executions/${lastId}?includeData=true`)
  const run = full.data?.resultData?.runData || {}
  console.log('\nLast run nodes:')
  for (const [name, runs] of Object.entries(run)) {
    const r = runs?.[0]
    const err = r?.error?.message || r?.error?.description || ''
    const nItems = r?.data?.main?.[0]?.length ?? 0
    console.log(`  ${name}: items=${nItems}${err ? ` ERROR ${err}` : ''}`)
  }
  const errMsg = full.data?.resultData?.error?.message
  if (errMsg) console.log('Workflow error:', errMsg)
}

const setup = process.argv.includes('--setup-tab')
const dropdowns = process.argv.includes('--setup-dropdowns')
const activate = process.argv.includes('--activate')
const inspectOnly = process.argv.includes('--inspect')
const sheetId = process.env.FEEDBACK_REVIEW_SHEET_ID

if (inspectOnly) {
  await inspect()
  process.exit(0)
}

if (!sheetId) {
  console.error(
    'Missing FEEDBACK_REVIEW_SHEET_ID. Run deploy-feedback-review-logger.mjs --setup-sheet first.',
  )
  process.exit(1)
}

if (setup) await setupTab(sheetId)
if (dropdowns || setup) await setupDropdowns(sheetId)
if (!dropdowns || setup || activate) {
  await deployBuilder(sheetId, activate || setup)
}
console.log('\nDone.')