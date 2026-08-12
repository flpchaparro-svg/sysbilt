#!/usr/bin/env node
/**
 * Deploy SYSBILT - Outbound Quote Capture Send (+ optional --setup-tab).
 *
 * Quote Capture Status=Ready → Gmail draft Email A + demo link → Emailed
 * Status=Ready B → Gmail draft Email B → Emailed (Notes stamp draft-b:)
 * Drafts only.
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-outbound-quote-capture-send.mjs --setup-tab
 *   node scripts/automations/n8n/deploy-outbound-quote-capture-send.mjs
 *   node scripts/automations/n8n/deploy-outbound-quote-capture-send.mjs --activate
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
const QC_SHEET = 'Quote Capture'
const LEADS_SHEET = 'Master Leads'
const QC_RANGE = 'A1:J5000'
const LEADS_RANGE = 'A1:S5000'
const DEMO_BASE = 'https://sysbilt.com/demo/quote-capture'
const GO_URL = 'https://sysbilt.com/go/quote-capture'

const QC_INDUSTRIES = [
  'Landscaping',
  'Fencing',
  'Retaining walls',
  'Paving',
  'Concreting',
  'Tree services',
  'Pool builders',
  'Roofing',
  'Painting',
  'Electrical',
  'Plumbing',
  'HVAC',
  'Cleaning',
  'Pest control',
  'Removals',
  'Other trade',
]

const QC_STATUSES = ['Wait', 'Ready', 'Ready B', 'Emailed', 'Replied', 'Dead']

const QC_CONTACT_FORM = ['silent', 'yes', 'none', 'skip']

/** Sydney suburbs with Serp coords in list-builder (display labels). */
const QC_SUBURBS = [
  'Alexandria',
  'Annandale',
  'Ashfield',
  'Balmain',
  'Bondi',
  'Bondi Junction',
  'Bronte',
  'Burwood',
  'Camperdown',
  'Chatswood',
  'Coogee',
  'Cronulla',
  'Darlinghurst',
  'Double Bay',
  'Drummoyne',
  'Dulwich Hill',
  'Enmore',
  'Erskineville',
  'Five Dock',
  'Forest Lodge',
  'Glebe',
  'Haberfield',
  'Hurstville',
  'Kogarah',
  'Lane Cove',
  'Leichhardt',
  'Manly',
  'Maroubra',
  'Marrickville',
  'Mascot',
  'Mosman',
  'Neutral Bay',
  'Newtown',
  'Paddington',
  'Parramatta',
  'Petersham',
  'Pyrmont',
  'Randwick',
  'Redfern',
  'Rockdale',
  'Rose Bay',
  'Rozelle',
  'Ryde',
  'Stanmore',
  'Strathfield',
  'Summer Hill',
  'Surry Hills',
  'Sutherland',
  'Ultimo',
  'Waterloo',
  'Zetland',
]

/** Run Queue niches: keep existing + Quote Capture landscaping cluster. */
const RUN_QUEUE_NICHES = [
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
]

const RUN_QUEUE_STATUSES = ['Queued', 'Running', 'Done', 'Failed']

const QC_HEADERS = [
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
      /* ok */
    }
  }
  return wf
}

const PICK_READY_JS = `const staticData = $getWorkflowStaticData('global');
const STALE_MS = 8 * 60 * 1000;

if (staticData.qcSendInProgress) {
  const started = staticData.qcSendStartedAt || 0;
  if (Date.now() - started < STALE_MS) return [];
  staticData.qcSendInProgress = false;
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
  const website = String(row.Website || '').trim();
  if (status !== 'Ready' && status !== 'Ready B') return false;
  if (!mapsId || !website) return false;
  if (!email || !email.includes('@')) return false;
  if (email.endsWith('@outbound.sysbilt.internal')) return false;
  if (email.startsWith('pending+')) return false;
  return true;
});

if (!candidates.length) return [];

staticData.qcSendInProgress = true;
staticData.qcSendStartedAt = Date.now();
return [{ json: candidates[0] }];`

const BUILD_EMAIL_JS = `const row = $('Pick Ready Row').first().json;
const leads = $input.all()
  .map((i) => i.json)
  .filter((r) => String(r['Business Name'] || '').trim() && r['Business Name'] !== 'Business Name');

const mapsId = String(row['Maps ID'] || '').trim();
const lead = leads.find((r) => String(r['Maps ID'] || '').trim() === mapsId) || {};
const status = String(row.Status || '').trim();
const isB = status === 'Ready B';

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const TRADE_SLUG = {
  landscaping: 'landscaping',
  fencing: 'fencing',
  'retaining walls': 'retaining-walls',
  paving: 'paving',
  concreting: 'concreting',
  'tree services': 'tree-services',
  'pool builders': 'pools',
  pools: 'pools',
  roofing: 'roofing',
  painting: 'painting',
  electrical: 'electrical',
  plumbing: 'plumbing',
  hvac: 'hvac',
  cleaning: 'cleaning',
  'pest control': 'pest-control',
  removals: 'removals',
  'other trade': 'landscaping',
};

const business = String(row['Business Name'] || '').trim();
const email = String(row.Email || '').trim();
const industry = String(row.Industry || 'Landscaping').trim() || 'Landscaping';
const industryLower = industry.toLowerCase();
const tradeSlug = TRADE_SLUG[industryLower] || 'landscaping';

const owner = String(lead['Owner Name'] || '').trim();
let firstName = '';
if (owner) {
  const part = owner.split(/\\s+/)[0].replace(/[^a-zA-Z'-]/g, '');
  if (part.length >= 2) firstName = part;
}
const greeting = firstName ? ('Hi ' + esc(firstName) + ',') : 'Hi,';

const demoUrl = '${DEMO_BASE}?trade=' + encodeURIComponent(tradeSlug)
  + '&name=' + encodeURIComponent(business.slice(0, 60));
const goUrl = '${GO_URL}';

const subject = isB
  ? (business + ': one more on the quote form')
  : (business + ': stop wasting time on quotations');

const htmlA = [
  '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#222">',
  '<p style="margin:0 0 14px">' + greeting + '</p>',
  '<p style="margin:0 0 14px">I\\'m Felipe from SYSBILT. I was looking at the contact page on your site, and how quote requests land.</p>',
  '<p style="margin:0 0 14px">On a lot of ' + esc(industryLower) + ' sites, the form just takes a message. The buyer waits. You chase later, put a quotation together, spend time on it, and they never come back.</p>',
  '<p style="margin:0 0 14px">Quote Capture is a short question flow on your site. It turns that ask into a clear quotation on screen, with email, SMS, and a pay link, on your rates. The visitor does most of the admin work in the flow. You get notified so you can follow up if you want. Even if you don\\'t chase hard, the pay link is already in their hands.</p>',
  '<p style="margin:0 0 14px">You can try a sample landscaping version here (sample prices, not yours):<br><a href="' + esc(demoUrl) + '" style="color:#1a73e8;text-decoration:underline">Try a sample quote</a>.</p>',
  '<p style="margin:0 0 14px">This is built for your brand, with options like photos of your work if you want them.</p>',
  '<p style="margin:0 0 14px">Worth a look for ' + esc(business) + '?</p>',
  '<p style="margin:0 0 14px">Felipe<br><a href="https://sysbilt.com" style="color:#1a73e8;text-decoration:underline">SYSBILT</a></p>',
  '<p style="margin:0;color:#666;font-size:12px;line-height:1.4">If you\\'d rather not hear from us again, reply &quot;no thanks&quot; and that\\'s the end of it.</p>',
  '</div>',
].join('');

const htmlB = [
  '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#222">',
  '<p style="margin:0 0 14px">' + greeting + '</p>',
  '<p style="margin:0 0 14px">Did you get a chance to try the sample quote flow for your potential clients?</p>',
  '<p style="margin:0 0 14px">If you want the full picture, benefits, pricing, and another go at the flow, it\\'s here:<br><a href="' + esc(goUrl) + '" style="color:#1a73e8;text-decoration:underline">See Quote Capture</a>.</p>',
  '<p style="margin:0 0 14px">If the timing is wrong, reply &quot;no thanks&quot; and we\\'ll stop.</p>',
  '<p style="margin:0 0 14px">Felipe<br><a href="https://sysbilt.com" style="color:#1a73e8;text-decoration:underline">SYSBILT</a></p>',
  '</div>',
].join('');

return [{
  json: {
    ...row,
    _firstName: firstName,
    _demoUrl: demoUrl,
    _goUrl: goUrl,
    _subject: subject,
    _html: isB ? htmlB : htmlA,
    _to: email,
    _emailKind: isB ? 'B' : 'A',
  },
}];`

const RELEASE_LOCK_JS = `const staticData = $getWorkflowStaticData('global');
staticData.qcSendInProgress = false;
staticData.qcSendStartedAt = 0;
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
      name: 'Read Quote Capture Tab',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-480, 0],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId, QC_SHEET),
        options: {
          dataLocationOnSheet: {
            values: {rangeDefinition: 'specifyRangeA1', range: QC_RANGE},
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
            values: {rangeDefinition: 'specifyRangeA1', range: LEADS_RANGE},
          },
        },
      },
    },
    {
      id: uid(),
      name: 'Build Email',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [240, 0],
      parameters: {mode: 'runOnceForAllItems', jsCode: BUILD_EMAIL_JS},
    },
    {
      id: uid(),
      name: 'Gmail Draft',
      type: 'n8n-nodes-base.gmail',
      typeVersion: 2.1,
      position: [480, 0],
      credentials: {gmailOAuth2: {id: GMAIL_CRED_ID, name: GMAIL_CRED_NAME}},
      parameters: {
        resource: 'draft',
        operation: 'create',
        subject: '={{ $json._subject }}',
        emailType: 'html',
        message: '={{ $json._html }}',
        options: {sendTo: '={{ $json._to }}'},
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
        ...sheetRef(sheetId, QC_SHEET),
        columns: {
          mappingMode: 'defineBelow',
          value: {
            'Maps ID': "={{ $('Build Email').item.json['Maps ID'] }}",
            Status: 'Emailed',
            Notes:
              "={{ (() => { const prior = String($('Build Email').item.json.Notes || '').trim(); const kind = String($('Build Email').item.json._emailKind || 'A'); const stamp = 'draft-' + kind.toLowerCase() + ':' + new Date().toISOString().slice(0, 10); return prior ? prior + ' | ' + stamp : stamp; })() }}",
          },
          matchingColumns: ['Maps ID'],
          schema: schemaFor(QC_HEADERS, 'Maps ID'),
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
        height: 420,
        color: 5,
        content: `## Outbound Quote Capture Send

**What it does**
Every 5 min: one Quote Capture row with Status = **Ready** (Email A) or **Ready B** (Email B) + real Email → Gmail **draft** + /demo/quote-capture?trade=&name= → Status = **Emailed**.

**Does not send.** Open Gmail Drafts, review, Send.

**Route in**
Master Leads Manual Lane = Quote Capture → Wait, then flip Ready.

See docs/internal/QUOTE_CAPTURE_OUTBOUND.md`,
      },
    },
  ]

  const connections = {
    'Every 5 Minutes': {main: [[{node: 'Read Quote Capture Tab', type: 'main', index: 0}]]},
    'Manual Trigger': {main: [[{node: 'Read Quote Capture Tab', type: 'main', index: 0}]]},
    'Read Quote Capture Tab': {main: [[{node: 'Pick Ready Row', type: 'main', index: 0}]]},
    'Pick Ready Row': {main: [[{node: 'Read Leads For Name', type: 'main', index: 0}]]},
    'Read Leads For Name': {main: [[{node: 'Build Email', type: 'main', index: 0}]]},
    'Build Email': {main: [[{node: 'Gmail Draft', type: 'main', index: 0}]]},
    'Gmail Draft': {main: [[{node: 'Mark Emailed', type: 'main', index: 0}]]},
    'Mark Emailed': {main: [[{node: 'Release Send Lock', type: 'main', index: 0}]]},
  }

  return {
    name: 'SYSBILT - Outbound Quote Capture Send',
    nodes,
    connections,
    settings: {executionOrder: 'v1'},
  }
}

function buildSetupTabWorkflow(sheetId) {
  return {
    name: 'SYSBILT - Outbound Quote Capture Tab Setup',
    nodes: [
      {
        id: uid(),
        name: 'Setup Webhook',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2,
        position: [0, 0],
        webhookId: 'sysbilt-outbound-quote-capture-tab',
        parameters: {
          httpMethod: 'POST',
          path: 'sysbilt-outbound-quote-capture-tab',
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
        name: 'Ensure Quote Capture Tab',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [480, 0],
        parameters: {
          mode: 'runOnceForAllItems',
          jsCode: `const meta = $input.first().json;
const titles = (meta.sheets || []).map((s) => s.properties?.title);
const has = titles.includes('${QC_SHEET}');
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
        name: 'Add Quote Capture Sheet',
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
            requests: [{addSheet: {properties: {title: QC_SHEET}}}],
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
        name: 'Set Quote Capture Headers',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.4,
        position: [1200, 0],
        credentials: {
          googleSheetsOAuth2Api: {id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME},
        },
        parameters: {
          method: 'PUT',
          url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent('Quote Capture!A1:J1')}?valueInputOption=USER_ENTERED`,
          authentication: 'predefinedCredentialType',
          nodeCredentialType: 'googleSheetsOAuth2Api',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: JSON.stringify({
            range: 'Quote Capture!A1:J1',
            majorDimension: 'ROWS',
            values: [QC_HEADERS],
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
const sheet = (meta.sheets || []).find((s) => s.properties?.title === '${QC_SHEET}');
if (!sheet?.properties?.sheetId && sheet?.properties?.sheetId !== 0) {
  throw new Error('Quote Capture tab sheetId not found');
}
const sid = sheet.properties.sheetId;
const runSheet = (meta.sheets || []).find((s) => s.properties?.title === 'Run Queue');
const runSid = runSheet?.properties?.sheetId;
const listRule = (values) => ({
  condition: {
    type: 'ONE_OF_LIST',
    values: values.map((v) => ({ userEnteredValue: v })),
  },
  showCustomUi: true,
  strict: true,
});
const industries = ${JSON.stringify(QC_INDUSTRIES)};
const statuses = ${JSON.stringify(QC_STATUSES)};
const contact = ${JSON.stringify(QC_CONTACT_FORM)};
const suburbs = ${JSON.stringify(QC_SUBURBS)};
const runNiches = ${JSON.stringify(RUN_QUEUE_NICHES)};
const runStatuses = ${JSON.stringify(RUN_QUEUE_STATUSES)};
const endRow = 2000;
const col = (sheetIdNum, start, end, values) => ({
  setDataValidation: {
    range: {
      sheetId: sheetIdNum,
      startRowIndex: 1,
      endRowIndex: endRow,
      startColumnIndex: start,
      endColumnIndex: end,
    },
    rule: listRule(values),
  },
});
const requests = [
  col(sid, 1, 2, suburbs),
  col(sid, 5, 6, industries),
  col(sid, 6, 7, contact),
  col(sid, 7, 8, statuses),
];
if (runSid || runSid === 0) {
  // Run Queue: B Niche, C Suburb, D Status
  requests.push(
    col(runSid, 1, 2, runNiches),
    col(runSid, 2, 3, suburbs),
    col(runSid, 3, 4, runStatuses),
  );
}
return [{
  json: {
    sheetId: sid,
    runQueueSheetId: runSid ?? null,
    requests,
  },
}];`,
        },
      },
      {
        id: uid(),
        name: 'Apply Quote Capture Dropdowns',
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
          responseBody: `={{ ({ ok: true, spreadsheetId: '${sheetId}', tab: '${QC_SHEET}', dropdowns: true }) }}`,
          options: {},
        },
      },
    ],
    connections: {
      'Setup Webhook': {main: [[{node: 'Get Spreadsheet Meta', type: 'main', index: 0}]]},
      'Get Spreadsheet Meta': {
        main: [[{node: 'Ensure Quote Capture Tab', type: 'main', index: 0}]],
      },
      'Ensure Quote Capture Tab': {main: [[{node: 'Needs Add Sheet', type: 'main', index: 0}]]},
      'Needs Add Sheet': {
        main: [
          [{node: 'Add Quote Capture Sheet', type: 'main', index: 0}],
          [{node: 'Skip Add Sheet', type: 'main', index: 0}],
        ],
      },
      'Add Quote Capture Sheet': {
        main: [[{node: 'Set Quote Capture Headers', type: 'main', index: 0}]],
      },
      'Skip Add Sheet': {main: [[{node: 'Set Quote Capture Headers', type: 'main', index: 0}]]},
      'Set Quote Capture Headers': {
        main: [[{node: 'Refresh Meta For Sheet Id', type: 'main', index: 0}]],
      },
      'Refresh Meta For Sheet Id': {
        main: [[{node: 'Build Dropdown Requests', type: 'main', index: 0}]],
      },
      'Build Dropdown Requests': {
        main: [[{node: 'Apply Quote Capture Dropdowns', type: 'main', index: 0}]],
      },
      'Apply Quote Capture Dropdowns': {
        main: [[{node: 'Respond OK', type: 'main', index: 0}]],
      },
    },
    settings: {executionOrder: 'v1'},
  }
}

async function setupTab(sheetId) {
  console.log(`Setting up Quote Capture tab on sheet ${sheetId}...`)
  const wf = await upsertWorkflow(buildSetupTabWorkflow(sheetId), {activate: true})
  saveDeployState({OUTBOUND_QUOTE_CAPTURE_TAB_SETUP_WORKFLOW_ID: wf.id})
  await new Promise((r) => setTimeout(r, 1500))
  const res = await fetch(`${N8N_BASE}/webhook/sysbilt-outbound-quote-capture-tab`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({source: 'deploy-outbound-quote-capture-send'}),
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
    throw new Error(`Quote Capture tab setup failed: ${res.status} ${JSON.stringify(data)}`)
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
  saveDeployState({OUTBOUND_QUOTE_CAPTURE_SEND_WORKFLOW_ID: wf.id})

  console.log(
    `\nQuote Capture Send${activate ? ' (active)' : ' (inactive)'}: ${N8N_BASE}/workflow/${wf.id}`,
  )
  console.log('Drafts only → Gmail Drafts → review → Send')
  console.log(`Demo: ${DEMO_BASE}?trade=&name=`)
  console.log('Status Ready = Email A · Ready B = Email B')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
