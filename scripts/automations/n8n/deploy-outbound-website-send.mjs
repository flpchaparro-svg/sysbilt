#!/usr/bin/env node
/**
 * Deploy SYSBILT - Outbound Website Send.
 *
 * Website tab Status=Ready + Email → Gmail draft (placeholder Email A + /go/website?b=)
 * → Status=Emailed. Does NOT send.
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-outbound-website-send.mjs --activate
 *   node scripts/automations/n8n/deploy-outbound-website-send.mjs --activate --seed-demo
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '../../..')
const GOOGLE_SHEETS_CRED_ID = 'W8jOFatMKmraYw0F'
const GOOGLE_SHEETS_CRED_NAME = 'Google Sheets account'
const GMAIL_CRED_ID = 'pR8GnMBXmukPyA2V'
const GMAIL_CRED_NAME = 'Gmail account'

const SHEET_ID_DEFAULT = '1aGz6kruGwSpt55rwlcknxVDXp9dgL_M-OnVJrDIbTlE'
const WEBSITE_SHEET = 'Website'
const LEADS_SHEET = 'Master Leads'
const WEBSITE_RANGE = 'A1:R5000'
const LEADS_RANGE = 'A1:R5000'
const FUNNEL_BASE = 'https://sysbilt.com/go/website'

const WEBSITE_HEADERS = [
  'Business Name',
  'Suburb',
  'Website',
  'Email',
  'Phone',
  'LH Perf',
  'LH SEO',
  'LH A11y',
  'LH BP',
  'Page Count',
  'Single Page',
  'Has Form',
  'Looks Dead',
  'Route',
  'Status',
  'Maps ID',
  'Audit Link',
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

const PICK_READY_JS = `const staticData = $getWorkflowStaticData('global');
const STALE_MS = 8 * 60 * 1000;

if (staticData.sendInProgress) {
  const started = staticData.sendStartedAt || 0;
  if (Date.now() - started < STALE_MS) return [];
  staticData.sendInProgress = false;
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

staticData.sendInProgress = true;
staticData.sendStartedAt = Date.now();
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

function cleanSiteUrl(raw) {
  let s = String(raw || '').trim();
  if (!s) return '';
  s = s.split('#')[0].split('?')[0];
  if (!/^https?:\\/\\//i.test(s)) s = 'https://' + s;
  try {
    const u = new URL(s);
    let path = u.pathname || '/';
    if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1);
    return u.origin + (path === '/' ? '' : path);
  } catch {
    return s;
  }
}

const business = String(row['Business Name'] || '').trim();
const email = String(row.Email || '').trim();
const seo = String(row['LH SEO'] || '').trim();
const a11y = String(row['LH A11y'] || '').trim();
const perf = String(row['LH Perf'] || '').trim();
const route = String(row.Route || 'website_only').trim();
const websiteHref = cleanSiteUrl(row.Website);

const owner = String(lead['Owner Name'] || '').trim();
let firstName = '';
if (owner) {
  const part = owner.split(/\\s+/)[0].replace(/[^a-zA-Z'-]/g, '');
  if (part.length >= 2) firstName = part;
}
const greeting = firstName ? ('Hi ' + esc(firstName) + ',') : 'Hi,';

const bParam = encodeURIComponent(business.slice(0, 40));
const funnelUrl = '${FUNNEL_BASE}?b=' + bParam;

const subject = business + ': your website needs a proper front door';

const siteLink = websiteHref
  ? '<a href="' + esc(websiteHref) + '" style="color:#1a73e8;text-decoration:underline">' + esc(business) + '</a>'
  : esc(business);

const scoreBits = [];
if (seo) scoreBits.push('SEO ' + seo);
if (a11y) scoreBits.push('accessibility ' + a11y);
if (perf) scoreBits.push('speed ' + perf);
const scoreLine = scoreBits.length
  ? 'On a quick check we saw ' + scoreBits.join(', ') + '.'
  : 'On a quick check the site is thin, unclear, or hard to trust at a glance.';

const html = [
  '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#222">',
  '<p style="margin:0 0 14px">' + greeting + '</p>',
  '<p style="margin:0 0 14px">People find ' + siteLink + ' and then bounce. ' + esc(scoreLine) + '</p>',
  '<p style="margin:0 0 14px">A weak front door costs enquiries before you ever speak to them. Patching one issue at a time on a broken base rarely fixes that.</p>',
  '<p style="margin:0 0 14px">We build and host a clean brochure site for growing Australian businesses: interview, write, build, about fourteen days to live. The full scope and the price are here: <a href="' + esc(funnelUrl) + '" style="color:#1a73e8;text-decoration:underline">Hosted Website Plan</a>.</p>',
  '<p style="margin:0 0 14px">Either way, happy to send a short take on what is wrong with the current page. Just reply and it\\'s yours.</p>',
  '<p style="margin:0 0 14px">Felipe<br><a href="https://sysbilt.com" style="color:#1a73e8;text-decoration:underline">SYSBILT</a>, Sydney<br>Websites and business systems for growing Australian businesses</p>',
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
staticData.sendInProgress = false;
staticData.sendStartedAt = 0;
return $input.all();`

function buildSendWorkflow(sheetId) {
  return {
    name: 'SYSBILT - Outbound Website Send',
    nodes: [
      {
        id: uid(),
        name: 'Every 5 Minutes',
        type: 'n8n-nodes-base.scheduleTrigger',
        typeVersion: 1.2,
        position: [-720, -80],
        parameters: { rule: { interval: [{ field: 'minutes', minutesInterval: 5 }] } },
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
        name: 'Webhook Run',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2.1,
        position: [-720, 280],
        parameters: {
          path: 'sysbilt-outbound-website-send',
          httpMethod: 'POST',
          responseMode: 'lastNode',
          options: {},
        },
        webhookId: 'sysbilt-outbound-website-send',
      },
      {
        id: uid(),
        name: 'Read Website Tab',
        type: 'n8n-nodes-base.googleSheets',
        typeVersion: 4.7,
        position: [-480, 0],
        alwaysOutputData: true,
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        parameters: {
          operation: 'read',
          ...sheetRef(sheetId, WEBSITE_SHEET),
          options: {
            dataLocationOnSheet: {
              values: { rangeDefinition: 'specifyRangeA1', range: WEBSITE_RANGE },
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
        parameters: { mode: 'runOnceForAllItems', jsCode: PICK_READY_JS },
      },
      {
        id: uid(),
        name: 'Read Leads For Name',
        type: 'n8n-nodes-base.googleSheets',
        typeVersion: 4.7,
        position: [0, 0],
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
        name: 'Build Email A',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [240, 0],
        parameters: { mode: 'runOnceForAllItems', jsCode: BUILD_EMAIL_JS },
      },
      {
        id: uid(),
        name: 'Gmail Draft Email A',
        type: 'n8n-nodes-base.gmail',
        typeVersion: 2.1,
        position: [480, 0],
        credentials: { gmailOAuth2: { id: GMAIL_CRED_ID, name: GMAIL_CRED_NAME } },
        parameters: {
          resource: 'draft',
          operation: 'create',
          subject: '={{ $json._subject }}',
          emailType: 'html',
          message: '={{ $json._html }}',
          options: { sendTo: '={{ $json._to }}' },
        },
      },
      {
        id: uid(),
        name: 'Mark Emailed',
        type: 'n8n-nodes-base.googleSheets',
        typeVersion: 4.7,
        position: [720, 0],
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        parameters: {
          operation: 'appendOrUpdate',
          ...sheetRef(sheetId, WEBSITE_SHEET),
          columns: {
            mappingMode: 'defineBelow',
            value: {
              'Maps ID': "={{ $('Build Email A').item.json['Maps ID'] }}",
              Status: 'Emailed',
              Notes:
                "={{ (() => { const prior = String($('Build Email A').item.json.Notes || '').trim(); const stamp = 'draft:' + new Date().toISOString().slice(0, 10); return prior ? prior + ' | ' + stamp : stamp; })() }}",
            },
            matchingColumns: ['Maps ID'],
            schema: schemaFor(WEBSITE_HEADERS, 'Maps ID'),
            attemptToConvertTypes: false,
            convertFieldsToString: false,
          },
          options: { useAppend: false },
        },
      },
      {
        id: uid(),
        name: 'Release Send Lock',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [960, 0],
        parameters: { mode: 'runOnceForAllItems', jsCode: RELEASE_LOCK_JS },
      },
    ],
    connections: {
      'Every 5 Minutes': { main: [[{ node: 'Read Website Tab', type: 'main', index: 0 }]] },
      'Manual Trigger': { main: [[{ node: 'Read Website Tab', type: 'main', index: 0 }]] },
      'Webhook Run': { main: [[{ node: 'Read Website Tab', type: 'main', index: 0 }]] },
      'Read Website Tab': { main: [[{ node: 'Pick Ready Row', type: 'main', index: 0 }]] },
      'Pick Ready Row': { main: [[{ node: 'Read Leads For Name', type: 'main', index: 0 }]] },
      'Read Leads For Name': { main: [[{ node: 'Build Email A', type: 'main', index: 0 }]] },
      'Build Email A': { main: [[{ node: 'Gmail Draft Email A', type: 'main', index: 0 }]] },
      'Gmail Draft Email A': { main: [[{ node: 'Mark Emailed', type: 'main', index: 0 }]] },
      'Mark Emailed': { main: [[{ node: 'Release Send Lock', type: 'main', index: 0 }]] },
    },
    settings: { executionOrder: 'v1' },
  }
}

function buildSeedWorkflow(sheetId) {
  const demoMaps = 'demo-website-' + Date.now()
  const row = {
    'Business Name': 'Demo Dental Practice',
    Suburb: 'Parramatta',
    Website: 'https://example-dental.invalid',
    Email: 'felipe@sysbilt.com',
    Phone: '0412345678',
    'LH Perf': '48',
    'LH SEO': '32',
    'LH A11y': '41',
    'LH BP': '44',
    'Page Count': '1',
    'Single Page': 'Y',
    'Has Form': 'N',
    'Looks Dead': 'Y',
    Route: 'website_only',
    Status: 'Ready',
    'Maps ID': demoMaps,
    'Audit Link': '',
    Notes: 'seed-demo',
  }

  return {
    name: 'SYSBILT - Outbound Website Seed Demo',
    nodes: [
      {
        id: uid(),
        name: 'Setup Webhook',
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2.1,
        position: [-400, 0],
        parameters: {
          path: 'sysbilt-outbound-website-seed',
          httpMethod: 'POST',
          responseMode: 'responseNode',
          options: {},
        },
        webhookId: 'sysbilt-outbound-website-seed',
      },
      {
        id: uid(),
        name: 'Append Demo Row',
        type: 'n8n-nodes-base.googleSheets',
        typeVersion: 4.7,
        position: [-160, 0],
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        parameters: {
          operation: 'append',
          ...sheetRef(sheetId, WEBSITE_SHEET),
          columns: {
            mappingMode: 'defineBelow',
            value: row,
            matchingColumns: [],
            schema: schemaFor(WEBSITE_HEADERS, 'Maps ID'),
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
        position: [80, 0],
        parameters: {
          respondWith: 'json',
          responseBody: `={{ ({ ok: true, mapsId: '${demoMaps}', email: 'felipe@sysbilt.com', status: 'Ready' }) }}`,
          options: {},
        },
      },
    ],
    connections: {
      'Setup Webhook': { main: [[{ node: 'Append Demo Row', type: 'main', index: 0 }]] },
      'Append Demo Row': { main: [[{ node: 'Respond OK', type: 'main', index: 0 }]] },
    },
    settings: { executionOrder: 'v1' },
  }
}

async function seedDemo(sheetId) {
  console.log('Seeding demo Website row (Ready → felipe@sysbilt.com)...')
  const wf = await upsertWorkflow(buildSeedWorkflow(sheetId), { activate: true })
  await new Promise((r) => setTimeout(r, 1500))
  const res = await fetch(`${N8N_BASE}/webhook/sysbilt-outbound-website-seed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'deploy-outbound-website-send' }),
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
  if (!res.ok) throw new Error(`Seed failed: ${res.status} ${JSON.stringify(data)}`)
  console.log('Seed OK:', data)
  return data
}

async function triggerSend() {
  console.log('Triggering Website send (draft)...')
  await new Promise((r) => setTimeout(r, 1500))
  const res = await fetch(`${N8N_BASE}/webhook/sysbilt-outbound-website-send`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'deploy-outbound-website-send' }),
  })
  const text = await res.text()
  console.log('Send webhook status:', res.status, text.slice(0, 400))
  if (!res.ok) throw new Error(`Send trigger failed: ${res.status} ${text}`)
}

async function main() {
  const args = process.argv.slice(2)
  const activate = args.includes('--activate')
  const doSeed = args.includes('--seed-demo')
  const sheetId = process.env.OUTBOUND_LEADS_SHEET_ID || SHEET_ID_DEFAULT
  if (!process.env.OUTBOUND_LEADS_SHEET_ID) {
    saveDeployState({ OUTBOUND_LEADS_SHEET_ID: sheetId })
  }

  const wf = await upsertWorkflow(buildSendWorkflow(sheetId), { activate: activate || doSeed })
  saveDeployState({
    OUTBOUND_LEADS_SHEET_ID: sheetId,
    OUTBOUND_WEBSITE_SEND_WORKFLOW_ID: wf.id,
  })

  console.log(
    `\nWebsite Send${activate || doSeed ? ' (active)' : ' (inactive)'}: ${N8N_BASE}/workflow/${wf.id}`,
  )
  console.log('Flow: Website Status=Ready → Gmail draft → Status=Emailed')

  if (doSeed) {
    await seedDemo(sheetId)
    await triggerSend()
    console.log('\nCheck Gmail Drafts for: Demo Dental Practice / felipe@sysbilt.com')
    console.log('Website tab should show that row as Emailed.')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
