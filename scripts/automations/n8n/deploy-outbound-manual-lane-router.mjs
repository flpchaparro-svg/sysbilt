#!/usr/bin/env node
/**
 * Deploy SYSBILT - Outbound Manual Lane Router.
 *
 * Master Leads column **Manual Lane** (S): you pick the product tab by eye.
 * Router appends that lead to the matching tab, then sets Manual Lane = routed.
 *
 * Dropdown values (you add data validation):
 *   Speed Fix | Google Profile | Missed-Call | Search Visibility |
 *   Landing Page | CRM Rescue | Website | Quote Capture | Feedback Review
 *
 * After route: routed
 * Skip forever: none | skip
 * Empty: ignored
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-outbound-manual-lane-router.mjs --setup-col
 *   node scripts/automations/n8n/deploy-outbound-manual-lane-router.mjs --activate
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '../../..')
const GOOGLE_SHEETS_CRED_ID = 'W8jOFatMKmraYw0F'
const GOOGLE_SHEETS_CRED_NAME = 'Google Sheets account'

const SHEET_ID_DEFAULT = '1aGz6kruGwSpt55rwlcknxVDXp9dgL_M-OnVJrDIbTlE'
const LEADS_SHEET = 'Master Leads'
const LEADS_RANGE = 'A1:S5000'
const MANUAL_HEADER_CELL = 'Master Leads!S1'
const MANUAL_COL = 'Manual Lane'

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
  'LP Ads',
  'CRM Form',
  MANUAL_COL,
]

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
    data = { raw: text }
  }
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(data)}`)
  }
  return data
}

const uid = () => randomUUID()

function sheetRef(sheetId, sheetName) {
  return {
    documentId: { __rl: true, value: sheetId, mode: 'id' },
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
  const { data } = await n8n('GET', '/workflows?limit=250')
  return (data || []).find((w) => w.name === name) || null
}

async function upsertWorkflow(workflow, { activate = false } = {}) {
  const existing = await findWorkflowByName(workflow.name)
  let wf
  if (existing) {
    const full = await n8n('GET', `/workflows/${existing.id}`)
    wf = await n8n('PUT', `/workflows/${existing.id}`, {
      name: workflow.name,
      nodes: workflow.nodes,
      connections: workflow.connections,
      settings: workflow.settings || full.settings || { executionOrder: 'v1' },
      staticData: full.staticData ?? null,
    })
    console.log(`Updated workflow ${workflow.name} (${wf.id})`)
  } else {
    wf = await n8n('POST', '/workflows', {
      name: workflow.name,
      nodes: workflow.nodes,
      connections: workflow.connections,
      settings: workflow.settings || { executionOrder: 'v1' },
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
      /* ok */
    }
  }
  return wf
}

const PICK_JS = `const staticData = $getWorkflowStaticData('global');
const STALE_MS = 8 * 60 * 1000;

if (staticData.mlInProgress) {
  const started = staticData.mlStartedAt || 0;
  if (Date.now() - started < STALE_MS) return [];
  staticData.mlInProgress = false;
}

const QUALIFY = new Set([
  'speed fix',
  'google profile',
  'missed-call',
  'missed call',
  'search visibility',
  'landing page',
  'crm rescue',
  'website',
  'quote capture',
  'feedback review',
]);

const rows = $input.all()
  .map((i) => i.json)
  .filter((r) => {
    const name = String(r['Business Name'] || '').trim();
    return name && name !== 'Business Name';
  });

const candidates = rows.filter((row) => {
  const mapsId = String(row['Maps ID'] || '').trim();
  const lane = String(row['Manual Lane'] || '').trim().toLowerCase();
  const status = String(row.Status || '').trim();
  if (!mapsId || !lane) return false;
  if (['Auditing', 'Dead'].includes(status)) return false;
  if (lane === 'routed' || lane === 'none' || lane === 'skip') return false;
  return QUALIFY.has(lane);
});

if (!candidates.length) return [];

staticData.mlInProgress = true;
staticData.mlStartedAt = Date.now();
return [{ json: candidates[0] }];`

const BUILD_JS = `const lead = $('Pick Manual Lane').first().json;
const mapsId = String(lead['Maps ID'] || '').trim();
const laneRaw = String(lead['Manual Lane'] || '').trim();
const lane = laneRaw.toLowerCase();

const TAB_BY_LANE = {
  'speed fix': 'Speed Fix',
  'google profile': 'Google Profile',
  'missed-call': 'Missed-Call',
  'missed call': 'Missed-Call',
  'search visibility': 'Search Visibility',
  'landing page': 'Landing Page',
  'crm rescue': 'CRM Rescue',
  website: 'Website',
  'quote capture': 'Quote Capture',
  'feedback review': 'Feedback Review',
};

const tab = TAB_BY_LANE[lane];
if (!tab) {
  return [{ json: { _skipAppend: true, reason: 'unknown_lane', _manualMark: 'skip', mapsId, 'Maps ID': mapsId } }];
}

function rowsFrom(nodeName) {
  try {
    return $(nodeName).all()
      .map((i) => i.json)
      .filter((r) => String(r['Business Name'] || '').trim() && r['Business Name'] !== 'Business Name');
  } catch {
    return [];
  }
}

const destRows = rowsFrom('Read Dest Tab');
if (destRows.some((r) => String(r['Maps ID'] || '').trim() === mapsId)) {
  return [{
    json: {
      _skipAppend: true,
      reason: 'already_on_tab',
      mapsId,
      'Maps ID': mapsId,
      _manualMark: 'routed',
      _destTab: tab,
    },
  }];
}

const status = 'Wait';
const base = {
  'Business Name': lead['Business Name'] || '',
  Suburb: lead.Suburb || '',
  Website: lead.Website || '',
  Email: lead.Email || '',
  Phone: lead.Phone || '',
  Status: status,
  'Maps ID': mapsId,
  Notes: 'gate:manual-lane|' + laneRaw,
};

let row = { ...base };
if (tab === 'Speed Fix') {
  row = { ...row, 'LH Mobile': lead['LH Mobile'] || '' };
} else if (tab === 'Google Profile') {
  row = { ...row, Reviews: lead.Reviews || '' };
} else if (tab === 'Search Visibility') {
  row = { ...row, 'Blocked Pages': lead['SV Indexed'] || '' };
} else if (tab === 'Landing Page') {
  row = { ...row, 'LP Ads': 'manual' };
} else if (tab === 'CRM Rescue') {
  row = { ...row, 'CRM Form': 'manual', 'Form Day': '', 'Form Time': '' };
} else if (tab === 'Quote Capture') {
  row = { ...row, Industry: 'Landscaping', 'Contact Form': '' };
} else if (tab === 'Website') {
  row = {
    ...row,
    'LH Perf': lead['LH Mobile'] || '',
    'LH SEO': '',
    'LH A11y': '',
    'LH BP': '',
    Route: 'website_only',
    'Audit Link': lead['Audit Link'] || '',
  };
}

return [{
  json: {
    ...row,
    _skipAppend: false,
    _manualMark: 'routed',
    _destTab: tab,
  },
}];`

const CLEAR_JS = `const staticData = $getWorkflowStaticData('global');
staticData.mlInProgress = false;
staticData.mlStartedAt = 0;
return $input.all();`

const RESOLVE_TAB_JS = `const lead = $input.first().json;
return [{
  json: {
    ...lead,
    _sheetName: lead._destTab || 'Speed Fix',
  },
}];`

function buildRouterWorkflow(sheetId) {
  // One append node per tab (Sheets node needs fixed sheetName). Switch by tab.
  const tabs = [
    {
      key: 'Speed Fix',
      headers: [
        'Business Name',
        'Suburb',
        'Website',
        'Email',
        'Phone',
        'LH Mobile',
        'Status',
        'Maps ID',
        'Notes',
      ],
    },
    {
      key: 'Google Profile',
      headers: [
        'Business Name',
        'Suburb',
        'Website',
        'Email',
        'Phone',
        'Reviews',
        'Status',
        'Maps ID',
        'Notes',
      ],
    },
    {
      key: 'Missed-Call',
      headers: [
        'Business Name',
        'Suburb',
        'Website',
        'Email',
        'Phone',
        'Status',
        'Maps ID',
        'Notes',
      ],
    },
    {
      key: 'Search Visibility',
      headers: [
        'Business Name',
        'Suburb',
        'Website',
        'Email',
        'Phone',
        'Blocked Pages',
        'Status',
        'Maps ID',
        'Notes',
      ],
    },
    {
      key: 'Landing Page',
      headers: [
        'Business Name',
        'Suburb',
        'Website',
        'Email',
        'Phone',
        'LP Ads',
        'Status',
        'Maps ID',
        'Notes',
      ],
    },
    {
      key: 'CRM Rescue',
      headers: [
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
      ],
    },
    {
      key: 'Quote Capture',
      headers: [
        'Business Name',
        'Suburb',
        'Website',
        'Email',
        'Phone',
        'Industry',
        'Contact Form',
        'Status',
        'Maps ID',
        'Notes',
      ],
    },
    {
      key: 'Feedback Review',
      headers: [
        'Business Name',
        'Suburb',
        'Website',
        'Email',
        'Phone',
        'Status',
        'Maps ID',
        'Notes',
      ],
    },
    {
      key: 'Website',
      headers: [
        'Business Name',
        'Suburb',
        'Website',
        'Email',
        'Phone',
        'LH Perf',
        'LH SEO',
        'LH A11y',
        'LH BP',
        'Route',
        'Status',
        'Maps ID',
        'Audit Link',
        'Notes',
      ],
    },
  ]

  const appendNodes = tabs.map((t, i) => ({
    id: uid(),
    name: `Append ${t.key}`,
    type: 'n8n-nodes-base.googleSheets',
    typeVersion: 4.7,
    position: [1560, -240 + i * 80],
    credentials: {
      googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
    },
    parameters: {
      operation: 'append',
      ...sheetRef(sheetId, t.key),
      columns: {
        mappingMode: 'defineBelow',
        value: Object.fromEntries(
          t.headers.map((h) => [h, `={{ $json[${JSON.stringify(h)}] }}`]),
        ),
        matchingColumns: [],
        schema: schemaFor(t.headers, 'Maps ID'),
        attemptToConvertTypes: false,
        convertFieldsToString: false,
      },
      options: {},
    },
  }))

  const switchRules = tabs.map((t, i) => ({
    conditions: {
      options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3 },
      conditions: [
        {
          id: uid(),
          leftValue: '={{ $json._destTab }}',
          rightValue: t.key,
          operator: { type: 'string', operation: 'equals' },
        },
      ],
      combinator: 'and',
    },
    renameOutput: true,
    outputKey: t.key,
  }))

  const nodes = [
    {
      id: uid(),
      name: 'Every 5 Minutes',
      type: 'n8n-nodes-base.scheduleTrigger',
      typeVersion: 1.2,
      position: [-840, -40],
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
      name: 'Read Master Leads',
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
      name: 'Pick Manual Lane',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-360, 0],
      parameters: { mode: 'runOnceForAllItems', jsCode: PICK_JS },
    },
    {
      id: uid(),
      name: 'Set Dest Sheet Name',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-120, 0],
      parameters: {
        mode: 'runOnceForAllItems',
        jsCode: `const lead = $input.first().json;
const lane = String(lead['Manual Lane'] || '').trim().toLowerCase();
const TAB_BY_LANE = {
  'speed fix': 'Speed Fix',
  'google profile': 'Google Profile',
  'missed-call': 'Missed-Call',
  'missed call': 'Missed-Call',
  'search visibility': 'Search Visibility',
  'landing page': 'Landing Page',
  'crm rescue': 'CRM Rescue',
  website: 'Website',
  'quote capture': 'Quote Capture',
  'feedback review': 'Feedback Review',
};
return [{ json: { ...lead, _destTab: TAB_BY_LANE[lane] || '' } }];`,
      },
    },
    {
      id: uid(),
      name: 'Read Dest Tab',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [120, 0],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        documentId: { __rl: true, value: sheetId, mode: 'id' },
        sheetName: {
          __rl: true,
          value: '={{ $json._destTab }}',
          mode: 'name',
        },
        options: {
          dataLocationOnSheet: {
            values: { rangeDefinition: 'specifyRangeA1', range: 'A1:R5000' },
          },
        },
      },
    },
    {
      id: uid(),
      name: 'Build Product Row',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [360, 0],
      parameters: { mode: 'runOnceForAllItems', jsCode: BUILD_JS },
    },
    {
      id: uid(),
      name: 'Should Append',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [600, 0],
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
      name: 'Switch Tab',
      type: 'n8n-nodes-base.switch',
      typeVersion: 3.2,
      position: [840, 0],
      parameters: {
        mode: 'rules',
        rules: { values: switchRules },
        options: { fallbackOutput: 'extra' },
      },
    },
    ...appendNodes,
    {
      id: uid(),
      name: 'Mark Manual Lane',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [1800, 0],
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
              "={{ $('Build Product Row').item.json['Maps ID'] || $('Build Product Row').item.json.mapsId || $('Pick Manual Lane').item.json['Maps ID'] }}",
            [MANUAL_COL]: "={{ $('Build Product Row').item.json._manualMark || 'routed' }}",
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
      name: 'Clear Lock',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [2040, 0],
      parameters: { mode: 'runOnceForAllItems', jsCode: CLEAR_JS },
    },
  ]

  const connections = {
    'Every 5 Minutes': { main: [[{ node: 'Read Master Leads', type: 'main', index: 0 }]] },
    'Manual Trigger': { main: [[{ node: 'Read Master Leads', type: 'main', index: 0 }]] },
    'Read Master Leads': { main: [[{ node: 'Pick Manual Lane', type: 'main', index: 0 }]] },
    'Pick Manual Lane': { main: [[{ node: 'Set Dest Sheet Name', type: 'main', index: 0 }]] },
    'Set Dest Sheet Name': { main: [[{ node: 'Read Dest Tab', type: 'main', index: 0 }]] },
    'Read Dest Tab': { main: [[{ node: 'Build Product Row', type: 'main', index: 0 }]] },
    'Build Product Row': { main: [[{ node: 'Should Append', type: 'main', index: 0 }]] },
    'Should Append': {
      main: [
        [{ node: 'Switch Tab', type: 'main', index: 0 }],
        [{ node: 'Mark Manual Lane', type: 'main', index: 0 }],
      ],
    },
    'Switch Tab': {
      main: appendNodes.map((n) => [{ node: n.name, type: 'main', index: 0 }]),
    },
    'Clear Lock': { main: [[]] },
  }

  for (const n of appendNodes) {
    connections[n.name] = { main: [[{ node: 'Mark Manual Lane', type: 'main', index: 0 }]] }
  }
  connections['Mark Manual Lane'] = { main: [[{ node: 'Clear Lock', type: 'main', index: 0 }]] }

  return {
    name: 'SYSBILT - Outbound Manual Lane Router',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  }
}

function buildSetupColWorkflow(sheetId) {
  return {
    name: 'SYSBILT - Outbound Manual Lane Col Setup',
    nodes: [
      {
        id: uid(),
        name: 'Setup Webhook',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2.1,
        position: [-400, 0],
        parameters: {
          path: 'sysbilt-outbound-manual-lane-col',
          httpMethod: 'POST',
          responseMode: 'responseNode',
          options: {},
        },
        webhookId: 'sysbilt-outbound-manual-lane-col',
      },
      {
        id: uid(),
        name: 'Set Manual Lane Header',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [-160, 0],
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        parameters: {
          method: 'PUT',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(MANUAL_HEADER_CELL)}?valueInputOption=USER_ENTERED`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: JSON.stringify({
            range: MANUAL_HEADER_CELL,
            majorDimension: 'ROWS',
            values: [[MANUAL_COL]],
          }),
          options: {},
        },
      },
      {
        id: uid(),
        name: 'Respond OK',
        type: 'n8n-nodes-base.respondToWebhook',
        typeVersion: 1.1,
        position: [80, 0],
        parameters: {
          respondWith: 'json',
          responseBody: `={{ ({ ok: true, header: '${MANUAL_COL}', cell: '${MANUAL_HEADER_CELL}' }) }}`,
          options: {},
        },
      },
    ],
    connections: {
      'Setup Webhook': { main: [[{ node: 'Set Manual Lane Header', type: 'main', index: 0 }]] },
      'Set Manual Lane Header': { main: [[{ node: 'Respond OK', type: 'main', index: 0 }]] },
    },
    settings: { executionOrder: 'v1' },
  }
}

async function setupCol(sheetId) {
  console.log(`Setting Manual Lane header on ${sheetId}...`)
  const wf = await upsertWorkflow(buildSetupColWorkflow(sheetId), { activate: true })
  await new Promise((r) => setTimeout(r, 1500))
  const res = await fetch(`${N8N_BASE}/webhook/sysbilt-outbound-manual-lane-col`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'deploy-outbound-manual-lane-router' }),
  })
  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    data = { raw: text }
  }
  try {
    await n8n('POST', `/workflows/${wf.id}/deactivate`, {})
  } catch {
    /* ok */
  }
  if (!res.ok) throw new Error(`Manual Lane header setup failed: ${res.status} ${text}`)
  console.log('Header OK:', data)
  return data
}

async function main() {
  const args = process.argv.slice(2)
  const doSetup = args.includes('--setup-col')
  const activate = args.includes('--activate')
  const sheetId = process.env.OUTBOUND_LEADS_SHEET_ID || SHEET_ID_DEFAULT
  if (!process.env.OUTBOUND_LEADS_SHEET_ID) {
    saveDeployState({ OUTBOUND_LEADS_SHEET_ID: sheetId })
  }

  if (doSetup) await setupCol(sheetId)

  const wf = await upsertWorkflow(buildRouterWorkflow(sheetId), { activate })
  saveDeployState({
    OUTBOUND_LEADS_SHEET_ID: sheetId,
    OUTBOUND_MANUAL_LANE_ROUTER_WORKFLOW_ID: wf.id,
  })

  console.log(
    `\nManual Lane Router${activate ? ' (active)' : ' (inactive)'}: ${N8N_BASE}/workflow/${wf.id}`,
  )
  console.log(`Master Leads column S = "${MANUAL_COL}"`)
  console.log(
    'Dropdown: Speed Fix | Google Profile | Missed-Call | Search Visibility | Landing Page | CRM Rescue | Website | Quote Capture | Feedback Review',
  )
  console.log('After route → routed. none/skip = ignore.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
