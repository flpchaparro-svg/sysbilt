#!/usr/bin/env node
/**
 * Deploy SYSBILT - Outbound Feedback Review Send (+ optional --setup-tab).
 *
 * Feedback Review tab Status=Ready + Email → Gmail draft (Email A +
 * personalised /go/feedback-review?b= link) → Status=Emailed.
 *
 * Does NOT send. Drafts only.
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-outbound-feedback-review-send.mjs --setup-tab
 *   node scripts/automations/n8n/deploy-outbound-feedback-review-send.mjs
 *   node scripts/automations/n8n/deploy-outbound-feedback-review-send.mjs --activate
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

const SHEET_ID_DEFAULT = '1aGz6kruGwSpt55rwlcknxVDXp9dgL_M-OnVJrDIbTlE'
const FR_SHEET = 'Feedback Review'
const LEADS_SHEET = 'Master Leads'
const FR_RANGE = 'A1:H5000'
const LEADS_RANGE = 'A1:S5000'
const FUNNEL_BASE = 'https://sysbilt.com/go/feedback-review'
const SAMPLE_URL = 'https://sysbilt.com/r/sysbilt?sample=1'

const FR_HEADERS = [
  'Business Name',
  'Suburb',
  'Website',
  'Email',
  'Phone',
  'Status',
  'Maps ID',
  'Notes',
]
const FR_STATUSES = ['Wait', 'Ready', 'Emailed', 'Replied', 'Dead']

function loadEnvLocal() {
  const path = resolve(ROOT, '.env.local')
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/)
    if (!m) continue
    const key = m[1].trim()
    const val = m[2].trim()
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
  writeFileSync(path, [...map.entries()].map(([k, v]) => `${k}=${v}`).join('\n') + '\n')
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

function sheetRef(sheetId, sheetName) {
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

function schemaFor(headers, matchCol) {
  return headers.map((id) => ({
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
  } else {
    try {
      await n8n('POST', `/workflows/${wf.id}/deactivate`, {})
    } catch {
      // fine if already inactive
    }
  }
  return wf
}

const PICK_READY_JS = `const staticData = $getWorkflowStaticData('global');
const STALE_MS = 8 * 60 * 1000;

if (staticData.frSendInProgress) {
  const started = staticData.frSendStartedAt || 0;
  if (Date.now() - started < STALE_MS) {
    return [];
  }
  staticData.frSendInProgress = false;
}

const rows = $input.all()
  .map((item) => item.json)
  .filter((row) => {
    const name = String(row['Business Name'] || '').trim();
    return name && name !== 'Business Name';
  });

const candidates = rows.filter((row) => {
  const status = String(row.Status || '').trim();
  const email = String(row.Email || '').trim().toLowerCase();
  const mapsId = String(row['Maps ID'] || '').trim();
  if (status !== 'Ready') return false;
  if (!mapsId) return false;
  if (!email || !email.includes('@')) return false;
  if (email.endsWith('@outbound.sysbilt.internal')) return false;
  if (email.startsWith('pending+')) return false;
  return true;
});

if (!candidates.length) return [];

staticData.frSendInProgress = true;
staticData.frSendStartedAt = Date.now();

return [{ json: candidates[0] }];`

const BUILD_EMAIL_JS = `const row = $('Pick Ready Row').first().json;
const leads = $input.all()
  .map((i) => i.json)
  .filter((r) => String(r['Business Name'] || '').trim() && r['Business Name'] !== 'Business Name');

const mapsId = String(row['Maps ID'] || '').trim();
const lead = leads.find((r) => String(r['Maps ID'] || '').trim() === mapsId) || {};

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** First name only when Owner Name has two or more words. Single tokens are often surnames. */
function verifiedFirstName(raw) {
  const parts = String(raw || '').trim().split(/\\s+/).filter(Boolean);
  if (parts.length < 2) return '';
  const part = parts[0].replace(/[^a-zA-Z'-]/g, '');
  return part.length >= 2 ? part : '';
}

const business = String(row['Business Name'] || '').trim();
const email = String(row.Email || '').trim();
const owner = String(lead['Owner Name'] || '').trim();
const firstName = verifiedFirstName(owner);
const greeting = firstName ? ('Hi ' + esc(firstName) + ',') : 'Hi,';

const bParam = encodeURIComponent(business.slice(0, 40));
const funnelUrl = '${FUNNEL_BASE}?b=' + bParam;
const sampleUrl = '${SAMPLE_URL}';

const subject = business + ': the Google review after the job';

const html = [
  '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#222">',
  '<p style="margin:0 0 14px">' + greeting + '</p>',
  '<p style="margin:0 0 14px">I\\'m Felipe from SYSBILT. After a job, most happy customers never leave a Google review. They meant to. Then the next job started.</p>',
  '<p style="margin:0 0 14px">Feedback Review is a short question flow you send when the work is done. They tap through what happened. If it went well, they get a suggested review they can edit, copy, and post themselves. You never post for them. If the job went poorly, that stays with you.</p>',
  '<p style="margin:0 0 14px">You can walk the customer questions here (sample only, nothing is saved):<br><a href="' + esc(sampleUrl) + '" style="color:#1a73e8;text-decoration:underline">Try a sample</a>.</p>',
  '<p style="margin:0 0 14px">Price, what is included, and how it runs for ' + esc(business) + ':<br><a href="' + esc(funnelUrl) + '" style="color:#1a73e8;text-decoration:underline">See Feedback Review</a>.</p>',
  '<p style="margin:0 0 14px">Felipe<br>SYSBILT</p>',
  '<p style="margin:0;color:#666;font-size:12px;line-height:1.4">If you\\'d rather not hear from us again, reply &quot;no thanks&quot; and that\\'s the end of it.</p>',
  '</div>',
].join('');

return [{
  json: {
    ...row,
    _firstName: firstName,
    _funnelUrl: funnelUrl,
    _subject: subject,
    _html: html,
    _to: email,
  },
}];`

const RELEASE_LOCK_JS = `const staticData = $getWorkflowStaticData('global');
staticData.frSendInProgress = false;
staticData.frSendStartedAt = 0;
return $input.all();`

function buildSendWorkflow(sheetId) {
  const nodes = [
    {
      id: uid(),
      name: 'Every 5 Minutes',
      type: 'n8n-nodes-base.scheduleTrigger',
      typeVersion: 1.2,
      position: [-720, -80],
      parameters: {rule: {interval: [{field: 'minutes', minutesInterval: 5}]}},
    },
    {
      id: uid(),
      name: 'Manual Trigger',
      type: 'n8n-nodes-base.manualTrigger',
      typeVersion: 1,
      position: [-720, 120],
      parameters: {},
    },
    {
      id: uid(),
      name: 'Read Feedback Review Tab',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-480, 0],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId, FR_SHEET),
        options: {
          dataLocationOnSheet: {
            values: {
              rangeDefinition: 'specifyRangeA1',
              range: FR_RANGE,
            },
          },
        },
      },
    },
    {
      id: uid(),
      name: 'Pick Ready Row',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-240, 0],
      parameters: {mode: 'runOnceForAllItems', jsCode: PICK_READY_JS},
    },
    {
      id: uid(),
      name: 'Read Leads For Name',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [0, 0],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
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
      id: uid(),
      name: 'Build Email A',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [240, 0],
      parameters: {mode: 'runOnceForAllItems', jsCode: BUILD_EMAIL_JS},
    },
    {
      id: uid(),
      name: 'Gmail Draft Email A',
      type: 'n8n-nodes-base.gmail',
      typeVersion: 2.1,
      position: [480, 0],
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
      name: 'Mark Emailed',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [720, 0],
      credentials: {
        googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
      },
      parameters: {
        operation: 'appendOrUpdate',
        ...sheetRef(sheetId, FR_SHEET),
        columns: {
          mappingMode: 'defineBelow',
          value: {
            'Maps ID': "={{ $('Build Email A').item.json['Maps ID'] }}",
            Status: 'Emailed',
            Notes:
              "={{ (() => { const prior = String($('Build Email A').item.json.Notes || '').trim(); const stamp = 'draft:' + new Date().toISOString().slice(0, 10); return prior ? prior + ' | ' + stamp : stamp; })() }}",
          },
          matchingColumns: ['Maps ID'],
          schema: schemaFor(FR_HEADERS, 'Maps ID'),
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: {useAppend: false},
      },
    },
    {
      id: uid(),
      name: 'Release Send Lock',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [960, 0],
      parameters: {mode: 'runOnceForAllItems', jsCode: RELEASE_LOCK_JS},
    },
    {
      id: uid(),
      name: 'Workflow Guide',
      type: 'n8n-nodes-base.stickyNote',
      typeVersion: 1,
      position: [-980, -40],
      parameters: {
        width: 480,
        height: 380,
        color: 5,
        content: `## Outbound Feedback Review Send

**What it does**
Every 5 min: one Feedback Review row with Status = **Ready** + real Email → Gmail **draft** (Email A + personalised /go/feedback-review?b=) → Status = **Emailed**.

**Does not send.** Open Gmail Drafts, review, Send.

**Related**
Master Leads Manual Lane = Feedback Review → this tab
→ you hit Send in Gmail`,
      },
    },
  ]

  const connections = {
    'Every 5 Minutes': {main: [[{node: 'Read Feedback Review Tab', type: 'main', index: 0}]]},
    'Manual Trigger': {main: [[{node: 'Read Feedback Review Tab', type: 'main', index: 0}]]},
    'Read Feedback Review Tab': {main: [[{node: 'Pick Ready Row', type: 'main', index: 0}]]},
    'Pick Ready Row': {main: [[{node: 'Read Leads For Name', type: 'main', index: 0}]]},
    'Read Leads For Name': {main: [[{node: 'Build Email A', type: 'main', index: 0}]]},
    'Build Email A': {main: [[{node: 'Gmail Draft Email A', type: 'main', index: 0}]]},
    'Gmail Draft Email A': {main: [[{node: 'Mark Emailed', type: 'main', index: 0}]]},
    'Mark Emailed': {main: [[{node: 'Release Send Lock', type: 'main', index: 0}]]},
  }

  return {
    name: 'SYSBILT - Outbound Feedback Review Send',
    nodes,
    connections,
    settings: {executionOrder: 'v1'},
  }
}

function buildSetupTabWorkflow(sheetId) {
  const headerRange = `${FR_SHEET}!A1:H1`
  return {
    name: 'SYSBILT - Outbound Feedback Review Tab Setup',
    nodes: [
      {
        id: uid(),
        name: 'Setup Webhook',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2,
        position: [0, 0],
        webhookId: 'sysbilt-outbound-feedback-review-tab',
        parameters: {
          httpMethod: 'POST',
          path: 'sysbilt-outbound-feedback-review-tab',
          responseMode: 'responseNode',
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Get Spreadsheet Meta',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [240, 0],
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
        name: 'Ensure Feedback Review Tab',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [480, 0],
        parameters: {
          mode: 'runOnceForAllItems',
          jsCode: `const meta = $input.first().json;
const titles = (meta.sheets || []).map((s) => s.properties?.title);
const has = titles.includes('${FR_SHEET}');
return [{ json: { hasTab: has, titles } }];`,
        },
      },
      {
        id: uid(),
        name: 'Needs Add Sheet',
        type: 'n8n-nodes-base.if',
        typeVersion: 2.2,
        position: [720, 0],
        parameters: {
          conditions: {
            options: {caseSensitive: true, leftValue: '', typeValidation: 'strict'},
            conditions: [
              {
                id: uid(),
                leftValue: '={{ $json.hasTab }}',
                rightValue: false,
                operator: {type: 'boolean', operation: 'false'},
              },
            ],
            combinator: 'and',
          },
        },
      },
      {
        id: uid(),
        name: 'Add Feedback Review Sheet',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [960, -80],
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
          jsonBody: JSON.stringify({
            requests: [{addSheet: {properties: {title: FR_SHEET}}}],
          }),
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Skip Add Sheet',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [960, 80],
        parameters: {mode: 'runOnceForAllItems', jsCode: 'return $input.all();'},
      },
      {
        id: uid(),
        name: 'Set Feedback Review Headers',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [1200, 0],
        credentials: {
          googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
        },
        parameters: {
          method: 'PUT',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(headerRange)}?valueInputOption=USER_ENTERED`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: JSON.stringify({
            range: headerRange,
            majorDimension: 'ROWS',
            values: [FR_HEADERS],
          }),
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Refresh Meta For Sheet Id',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [1440, 0],
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
        position: [1680, 0],
        parameters: {
          mode: 'runOnceForAllItems',
          jsCode: `const meta = $input.first().json;
const sheet = (meta.sheets || []).find((s) => s.properties?.title === '${FR_SHEET}');
if (!sheet?.properties?.sheetId && sheet?.properties?.sheetId !== 0) {
  throw new Error('Feedback Review tab sheetId not found');
}
const sid = sheet.properties.sheetId;
const statuses = ${JSON.stringify(FR_STATUSES)};
const listRule = (values) => ({
  condition: {
    type: 'ONE_OF_LIST',
    values: values.map((v) => ({ userEnteredValue: v })),
  },
  showCustomUi: true,
  strict: true,
});
const endRow = 2000;
return [{
  json: {
    requests: [{
      setDataValidation: {
        range: {
          sheetId: sid,
          startRowIndex: 1,
          endRowIndex: endRow,
          startColumnIndex: 5,
          endColumnIndex: 6,
        },
        rule: listRule(statuses),
      },
    }],
  },
}];`,
        },
      },
      {
        id: uid(),
        name: 'Apply Feedback Review Dropdowns',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [1920, 0],
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
          jsonBody: '={{ { requests: $json.requests } }}',
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Respond OK',
        type: 'n8n-nodes-base.respondToWebhook',
        typeVersion: 1.1,
        position: [2160, 0],
        parameters: {
          respondWith: 'json',
          responseBody: `={{ ({ ok: true, spreadsheetId: '${sheetId}', tab: '${FR_SHEET}', dropdowns: true }) }}`,
          options: {},
        },
      },
    ],
    connections: {
      'Setup Webhook': {main: [[{node: 'Get Spreadsheet Meta', type: 'main', index: 0}]]},
      'Get Spreadsheet Meta': {
        main: [[{node: 'Ensure Feedback Review Tab', type: 'main', index: 0}]],
      },
      'Ensure Feedback Review Tab': {main: [[{node: 'Needs Add Sheet', type: 'main', index: 0}]]},
      'Needs Add Sheet': {
        main: [
          [{node: 'Add Feedback Review Sheet', type: 'main', index: 0}],
          [{node: 'Skip Add Sheet', type: 'main', index: 0}],
        ],
      },
      'Add Feedback Review Sheet': {
        main: [[{node: 'Set Feedback Review Headers', type: 'main', index: 0}]],
      },
      'Skip Add Sheet': {main: [[{node: 'Set Feedback Review Headers', type: 'main', index: 0}]]},
      'Set Feedback Review Headers': {
        main: [[{node: 'Refresh Meta For Sheet Id', type: 'main', index: 0}]],
      },
      'Refresh Meta For Sheet Id': {
        main: [[{node: 'Build Dropdown Requests', type: 'main', index: 0}]],
      },
      'Build Dropdown Requests': {
        main: [[{node: 'Apply Feedback Review Dropdowns', type: 'main', index: 0}]],
      },
      'Apply Feedback Review Dropdowns': {
        main: [[{node: 'Respond OK', type: 'main', index: 0}]],
      },
    },
    settings: {executionOrder: 'v1'},
  }
}

async function setupTab(sheetId) {
  console.log(`Setting up Feedback Review tab on sheet ${sheetId}...`)
  const wf = await upsertWorkflow(buildSetupTabWorkflow(sheetId), {activate: true})
  saveDeployState({OUTBOUND_FEEDBACK_REVIEW_TAB_SETUP_WORKFLOW_ID: wf.id})
  await new Promise((r) => setTimeout(r, 1500))
  const res = await fetch(`${N8N_BASE}/webhook/sysbilt-outbound-feedback-review-tab`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({source: 'deploy-outbound-feedback-review-send'}),
  })
  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    data = {raw: text}
  }
  try {
    await n8n('POST', `/workflows/${wf.id}/deactivate`, {})
  } catch {
    /* ok */
  }
  if (!res.ok) {
    throw new Error(`Feedback Review tab setup failed: ${res.status} ${JSON.stringify(data)}`)
  }
  console.log('Tab setup OK:', data)
  return data
}

async function main() {
  const args = process.argv.slice(2)
  const doSetup = args.includes('--setup-tab')
  const activate = args.includes('--activate')
  const sheetId = process.env.OUTBOUND_LEADS_SHEET_ID || SHEET_ID_DEFAULT
  if (!process.env.OUTBOUND_LEADS_SHEET_ID) {
    saveDeployState({OUTBOUND_LEADS_SHEET_ID: sheetId})
  }

  if (doSetup) await setupTab(sheetId)

  const wf = await upsertWorkflow(buildSendWorkflow(sheetId), {activate})
  saveDeployState({OUTBOUND_FEEDBACK_REVIEW_SEND_WORKFLOW_ID: wf.id})

  console.log(
    `\nFeedback Review Send${activate ? ' (active)' : ' (inactive)'}: ${N8N_BASE}/workflow/${wf.id}`,
  )
  console.log('Drafts only → Gmail Drafts → review → Send')
  console.log(`Door: ${FUNNEL_BASE}?b=`)
  console.log('Status Ready = Email A')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
