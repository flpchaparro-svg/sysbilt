#!/usr/bin/env node
/**
 * Deploy SYSBILT - Outbound CRM Rescue Send.
 *
 * CRM Rescue Status=Ready + real Email → Gmail draft + /go/crm-rescue?b=&d=&t=
 * → Status=Emailed. Drafts only.
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-outbound-crm-rescue-send.mjs
 *   node scripts/automations/n8n/deploy-outbound-crm-rescue-send.mjs --activate
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const GOOGLE_SHEETS_CRED_ID = 'W8jOFatMKmraYw0F';
const GOOGLE_SHEETS_CRED_NAME = 'Google Sheets account';
const GMAIL_CRED_ID = 'pR8GnMBXmukPyA2V';
const GMAIL_CRED_NAME = 'Gmail account';

const SHEET_ID_DEFAULT = '1aGz6kruGwSpt55rwlcknxVDXp9dgL_M-OnVJrDIbTlE';
const CRM_SHEET = 'CRM Rescue';
const LEADS_SHEET = 'Master Leads';
const CRM_RANGE = 'A1:K5000';
const LEADS_RANGE = 'A1:R5000';
const FUNNEL_BASE = 'https://sysbilt.com/go/crm-rescue';

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
  const website = String(row.Website || '').trim();
  if (status !== 'Ready') return false;
  if (!mapsId || !website) return false;
  if (!email || !email.includes('@')) return false;
  if (email.endsWith('@outbound.sysbilt.internal')) return false;
  if (email.startsWith('pending+')) return false;
  return true;
});

if (!candidates.length) return [];

staticData.sendInProgress = true;
staticData.sendStartedAt = Date.now();
return [{ json: candidates[0] }];`;

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
const websiteHref = cleanSiteUrl(row.Website);
const formDay = String(row['Form Day'] || '').trim();
const formTime = String(row['Form Time'] || '').trim();

const owner = String(lead['Owner Name'] || '').trim();
let firstName = 'there';
if (owner) {
  const part = owner.split(/\\s+/)[0].replace(/[^a-zA-Z'-]/g, '');
  if (part.length >= 2) firstName = part;
}

const bParam = encodeURIComponent(business.slice(0, 40));
let funnelUrl = '${FUNNEL_BASE}?b=' + bParam;
if (formDay) funnelUrl += '&d=' + encodeURIComponent(formDay.slice(0, 24));
if (formTime) funnelUrl += '&t=' + encodeURIComponent(formTime.slice(0, 24));

const whenBit = formDay && formTime
  ? ' on ' + formDay + ' at ' + formTime
  : formDay
    ? ' on ' + formDay
    : '';

const subject = business + ': we enquired through your website, and nobody replied';

const siteLink = websiteHref
  ? '<a href="' + esc(websiteHref) + '" style="color:#1a73e8;text-decoration:underline">' + esc(business) + '</a>'
  : esc(business);

const html = [
  '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#222">',
  '<p style="margin:0 0 14px">Hi ' + esc(firstName) + ',</p>',
  '<p style="margin:0 0 14px">We sent a genuine enquiry through ' + siteLink + '\\'s website form' + esc(whenBit) + '. As of this morning, no reply had come back.</p>',
  '<p style="margin:0 0 14px">That is not a dig. It is how a real customer experienced your business. Enquiries are arriving. The system catching them is what is broken, and it is fixable in five days.</p>',
  '<p style="margin:0 0 14px">We rescue the lead-handling setup you already have so every enquiry alerts the right phone, replies instantly, and chases every quote you send. Fixed price, paid once: <a href="' + esc(funnelUrl) + '" style="color:#1a73e8;text-decoration:underline">CRM Rescue</a>.</p>',
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
}];`;

const RELEASE_LOCK_JS = `const staticData = $getWorkflowStaticData('global');
staticData.sendInProgress = false;
staticData.sendStartedAt = 0;
return $input.all();`;

function buildSendWorkflow(sheetId) {
  const nodes = [
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
      name: 'Read CRM Rescue Tab',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-480, 0],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId, CRM_SHEET),
        options: {
          dataLocationOnSheet: {
            values: { rangeDefinition: 'specifyRangeA1', range: CRM_RANGE },
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
        ...sheetRef(sheetId, CRM_SHEET),
        columns: {
          mappingMode: 'defineBelow',
          value: {
            'Maps ID': "={{ $('Build Email A').item.json['Maps ID'] }}",
            Status: 'Emailed',
            Notes:
              "={{ (() => { const prior = String($('Build Email A').item.json.Notes || '').trim(); const stamp = 'draft:' + new Date().toISOString().slice(0, 10); return prior ? prior + ' | ' + stamp : stamp; })() }}",
          },
          matchingColumns: ['Maps ID'],
          schema: schemaFor(CRM_HEADERS, 'Maps ID'),
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
    {
      id: uid(),
      name: 'Workflow Guide',
      type: 'n8n-nodes-base.stickyNote',
      typeVersion: 1,
      position: [-980, -40],
      parameters: {
        width: 480,
        height: 400,
        color: 5,
        content: `## Outbound CRM Rescue Send

**What it does**
Every 5 min: one CRM Rescue row with Status = **Ready** + real Email → Gmail **draft** + /go/crm-rescue?b=&d=&t= → Status = **Emailed**.

**Does not send.** Open Gmail Drafts, review, Send.

**Related**
← CRM Rescue Router (CRM Form = form silence → Ready)`,
      },
    },
  ];

  const connections = {
    'Every 5 Minutes': { main: [[{ node: 'Read CRM Rescue Tab', type: 'main', index: 0 }]] },
    'Manual Trigger': { main: [[{ node: 'Read CRM Rescue Tab', type: 'main', index: 0 }]] },
    'Read CRM Rescue Tab': { main: [[{ node: 'Pick Ready Row', type: 'main', index: 0 }]] },
    'Pick Ready Row': { main: [[{ node: 'Read Leads For Name', type: 'main', index: 0 }]] },
    'Read Leads For Name': { main: [[{ node: 'Build Email A', type: 'main', index: 0 }]] },
    'Build Email A': { main: [[{ node: 'Gmail Draft Email A', type: 'main', index: 0 }]] },
    'Gmail Draft Email A': { main: [[{ node: 'Mark Emailed', type: 'main', index: 0 }]] },
    'Mark Emailed': { main: [[{ node: 'Release Send Lock', type: 'main', index: 0 }]] },
  };

  return {
    name: 'SYSBILT - Outbound CRM Rescue Send',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  };
}

async function main() {
  const activate = process.argv.includes('--activate');
  const sheetId = process.env.OUTBOUND_LEADS_SHEET_ID || SHEET_ID_DEFAULT;
  if (!process.env.OUTBOUND_LEADS_SHEET_ID) {
    saveDeployState({ OUTBOUND_LEADS_SHEET_ID: sheetId });
  }

  const wf = await upsertWorkflow(buildSendWorkflow(sheetId), { activate });
  saveDeployState({ OUTBOUND_CRM_RESCUE_SEND_WORKFLOW_ID: wf.id });

  console.log(
    `\nCRM Rescue Send${activate ? ' (active)' : ' (inactive)'}: ${N8N_BASE}/workflow/${wf.id}`,
  );
  console.log('Drafts only → Gmail Drafts → review → Send');
  console.log(`Funnel: ${FUNNEL_BASE}?b=&d=&t=`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
