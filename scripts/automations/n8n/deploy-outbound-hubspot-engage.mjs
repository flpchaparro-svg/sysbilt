#!/usr/bin/env node
/**
 * Deploy SYSBILT - Outbound HubSpot Engage (Workflow C).
 * Pushes sheet rows to HubSpot when Status = Engage (after audit).
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-outbound-hubspot-engage.mjs
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const GOOGLE_SHEETS_CRED_ID = 'W8jOFatMKmraYw0F';
const GOOGLE_SHEETS_CRED_NAME = 'Google Sheets account';
const HUBSPOT_CRED_ID = '64xkc10iud9ZbzkZ';
const HUBSPOT_CRED_NAME = 'SYSBILT n8n Production';
const GMAIL_CRED_ID = 'pR8GnMBXmukPyA2V';
const GMAIL_CRED_NAME = 'Gmail account';
const SHEET_DATA_RANGE = 'A1:N5000';

const PICK_ENGAGE_ROW_JS = `const staticData = $getWorkflowStaticData('global');
const STALE_MS = 10 * 60 * 1000;

if (staticData.engageInProgress) {
  const started = staticData.engageStartedAt || 0;
  if (Date.now() - started < STALE_MS) return [];
  staticData.engageInProgress = false;
}

const rows = $input.all()
  .map((item) => item.json)
  .filter((row) => {
    const name = String(row['Business Name'] || '').trim();
    return name && name !== 'Business Name';
  });

const candidates = rows.filter((row) => {
  const status = String(row.Status || '').trim();
  const mapsId = String(row['Maps ID'] || '').trim();
  const notes = String(row.Notes || '').trim();
  const email = String(row.Email || '').trim().toLowerCase();
  const auditLink = String(row['Audit Link'] || '').trim();
  if (!mapsId || status !== 'Engage') return false;
  if (notes.includes('hubspot:')) return false;
  if (!email || email.includes('@outbound.sysbilt.internal')) return false;
  if (!auditLink) return false;
  return true;
});

if (!candidates.length) return [];

staticData.engageInProgress = true;
staticData.engageStartedAt = Date.now();

return [{ json: candidates[0] }];`;

const BUILD_HUBSPOT_CONTACT_JS = `const row = $('Pick Engage Row').first().json;
const owner = String(row['Owner Name'] || '').trim();
const business = String(row['Business Name'] || '').trim();
const email = String(row.Email || '').trim().toLowerCase();
const parts = owner.split(/\\s+/).filter(Boolean);
const firstname = parts[0] || 'there';
const lastname = parts.slice(1).join(' ');
const suburb = String(row.Suburb || '').trim();
const address = String(row.Address || '').trim();
const auditLink = String(row['Audit Link'] || '').trim();
const website = String(row.Website || '').trim();
const phone = String(row.Phone || '').trim();
const priorNotes = String(row.Notes || '').trim();

const message = [
  'Outbound lead engaged from Google Sheet after audit.',
  suburb ? 'Suburb: ' + suburb : '',
  address ? 'Address: ' + address : '',
  auditLink ? 'Audit: ' + auditLink : '',
  website ? 'Website: ' + website : '',
].filter(Boolean).join(' ');

return [{
  json: {
    email,
    firstname,
    lastname,
    company: business,
    phone,
    website: website && !/^https?:/i.test(website) ? 'https://' + website : website,
    message,
    friction_point: 'website_and_leads',
    lead_source_detail: 'outbound_sheet_engage',
    lifecyclestage: 'lead',
    audit_link: auditLink,
    maps_id: String(row['Maps ID'] || '').trim(),
    prior_notes: priorNotes,
    _sheetRow: row,
  },
}];`;

const PARSE_HUBSPOT_RESPONSE_JS = `const raw = $input.first().json || {};
const result = Array.isArray(raw.results) ? raw.results[0] : raw;
const contactId = result?.id || raw.id || '';
if (!contactId) {
  throw new Error('HubSpot upsert returned no contact id: ' + JSON.stringify(raw).slice(0, 500));
}
const built = $('Build HubSpot Contact').first().json;
return [{
  json: {
    contactId,
    email: built.email,
    company: built.company,
    auditLink: built.audit_link,
    mapsId: built.maps_id,
    priorNotes: built.prior_notes,
    hubspotUrl: 'https://app.hubspot.com/contacts/442914926/contact/' + contactId,
  },
}];`;

const RELEASE_ENGAGE_LOCK_JS = `const staticData = $getWorkflowStaticData('global');
staticData.engageInProgress = false;
staticData.engageStartedAt = null;
return $input.all();`;

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

function headerSchema() {
  const headers = [
    'Business Name', 'Suburb', 'Address', 'Website', 'Phone', 'Rating', 'Reviews',
    'Maps ID', 'Owner Name', 'Email', 'Status', 'Audit Link', 'Emailed', 'Notes',
  ];
  return headers.map((id) => ({
    id,
    displayName: id,
    required: false,
    defaultMatch: false,
    display: true,
    type: 'string',
    canBeUsedToMatch: id === 'Maps ID',
  }));
}

function sheetRef(sheetId) {
  return {
    documentId: { __rl: true, value: sheetId, mode: 'id' },
    sheetName: { __rl: true, value: 'Sheet1', mode: 'name', cachedResultName: 'Sheet1' },
  };
}

function buildWorkflow(sheetId) {
  const nodes = [
    {
      id: uid(),
      name: 'Schedule Trigger',
      type: 'n8n-nodes-base.scheduleTrigger',
      typeVersion: 1.2,
      position: [-1200, 480],
      parameters: {
        rule: { interval: [{ field: 'minutes', minutesInterval: 5 }] },
      },
    },
    {
      id: uid(),
      name: 'Read Outbound Sheet',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-960, 480],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId),
        options: {
          dataLocationOnSheet: {
            values: { rangeDefinition: 'specifyRangeA1', range: SHEET_DATA_RANGE },
          },
        },
      },
    },
    {
      id: uid(),
      name: 'Pick Engage Row',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-720, 480],
      parameters: { mode: 'runOnceForAllItems', jsCode: PICK_ENGAGE_ROW_JS },
    },
    {
      id: uid(),
      name: 'Build HubSpot Contact',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-480, 480],
      parameters: { mode: 'runOnceForAllItems', jsCode: BUILD_HUBSPOT_CONTACT_JS },
    },
    {
      id: uid(),
      name: 'Upsert HubSpot Contact',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [-240, 480],
      credentials: {
        hubspotAppToken: { id: HUBSPOT_CRED_ID, name: HUBSPOT_CRED_NAME },
      },
      parameters: {
        method: 'POST',
        url: 'https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert',
        authentication: 'predefinedCredentialType',
        nodeCredentialType: 'hubspotAppToken',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={{ JSON.stringify({
  inputs: [{
    idProperty: 'email',
    id: $json.email,
    properties: {
      firstname: $json.firstname,
      lastname: $json.lastname,
      email: $json.email,
      company: $json.company,
      phone: $json.phone,
      website: $json.website,
      message: $json.message,
      friction_point: $json.friction_point,
      lead_source_detail: $json.lead_source_detail,
      lifecyclestage: $json.lifecyclestage,
    },
  }],
}) }}`,
        options: {},
      },
    },
    {
      id: uid(),
      name: 'Parse HubSpot Response',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [0, 480],
      parameters: { mode: 'runOnceForAllItems', jsCode: PARSE_HUBSPOT_RESPONSE_JS },
    },
    {
      id: uid(),
      name: 'Update Sheet HubSpot',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [240, 480],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'appendOrUpdate',
        ...sheetRef(sheetId),
        columns: {
          mappingMode: 'defineBelow',
          value: {
            'Maps ID': "={{ $('Build HubSpot Contact').item.json.maps_id }}",
            Notes: `={{ (() => {
  const prior = String($('Parse HubSpot Response').item.json.priorNotes || '').trim();
  const stamp = 'hubspot:' + $('Parse HubSpot Response').item.json.contactId;
  return prior ? prior + ' | ' + stamp : stamp;
})() }}`,
          },
          matchingColumns: ['Maps ID'],
          schema: headerSchema(),
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: { useAppend: false },
      },
    },
    {
      id: uid(),
      name: 'Send a message',
      type: 'n8n-nodes-base.gmail',
      typeVersion: 2.1,
      position: [480, 480],
      credentials: {
        gmailOAuth2: { id: GMAIL_CRED_ID, name: GMAIL_CRED_NAME },
      },
      parameters: {
        sendTo: 'felipe@sysbilt.com',
        subject: "=Outbound engage → HubSpot: {{ $('Parse HubSpot Response').item.json.company }}",
        message: `=Outbound lead pushed to HubSpot after sheet Engage.<br><br>
Company: {{ $('Parse HubSpot Response').item.json.company }}<br>
Email: {{ $('Parse HubSpot Response').item.json.email }}<br>
HubSpot: <a href="{{ $('Parse HubSpot Response').item.json.hubspotUrl }}">Open contact</a><br>
Audit: <a href="{{ $('Parse HubSpot Response').item.json.auditLink }}">Open audit</a><br><br>
Status stays <strong>Engage</strong> in the sheet. Notes now contains <code>hubspot:&lt;id&gt;</code> so this row will not push again.`,
        options: {},
      },
    },
    {
      id: uid(),
      name: 'Release Engage Lock',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [720, 480],
      parameters: { mode: 'runOnceForAllItems', jsCode: RELEASE_ENGAGE_LOCK_JS },
    },
    {
      id: uid(),
      name: 'Workflow Guide',
      type: 'n8n-nodes-base.stickyNote',
      typeVersion: 1,
      position: [-1240, 40],
      parameters: {
        width: 520,
        height: 400,
        color: 4,
        content: `## Outbound HubSpot Engage (Workflow C)

**What it does**
Every 5 min: reads the outbound sheet, picks one row with Status = Engage, upserts the contact in HubSpot, stamps Notes with hubspot:<id>, emails you.

**Requirements on the row**
- Status = Engage
- Real Email (not pending+@outbound.sysbilt.internal)
- Audit Link present
- Notes does not already contain hubspot:

**Related workflows**
← **Outbound Audit Runner (B)** — creates Audit Link first
← **List Builder (A)** / **Contact Scrape (A2)** — fill the sheet

**Outbound pipeline**
A → sheet → B (Audit) → you review → set Engage → C (this) → HubSpot`,
      },
    },
  ];

  const connections = {
    'Schedule Trigger': { main: [[{ node: 'Read Outbound Sheet', type: 'main', index: 0 }]] },
    'Read Outbound Sheet': { main: [[{ node: 'Pick Engage Row', type: 'main', index: 0 }]] },
    'Pick Engage Row': { main: [[{ node: 'Build HubSpot Contact', type: 'main', index: 0 }]] },
    'Build HubSpot Contact': { main: [[{ node: 'Upsert HubSpot Contact', type: 'main', index: 0 }]] },
    'Upsert HubSpot Contact': { main: [[{ node: 'Parse HubSpot Response', type: 'main', index: 0 }]] },
    'Parse HubSpot Response': { main: [[{ node: 'Update Sheet HubSpot', type: 'main', index: 0 }]] },
    'Update Sheet HubSpot': { main: [[{ node: 'Send a message', type: 'main', index: 0 }]] },
    'Send a message': { main: [[{ node: 'Release Engage Lock', type: 'main', index: 0 }]] },
  };

  return {
    name: 'SYSBILT - Outbound HubSpot Engage',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  };
}

async function findWorkflowByName(name) {
  const { data } = await n8n('GET', '/workflows?limit=250');
  return data?.find((w) => w.name === name);
}

async function upsertWorkflow(workflow) {
  const existing = await findWorkflowByName(workflow.name);
  const body = {
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings: workflow.settings,
  };
  if (existing) {
    const result = await n8n('PUT', `/workflows/${existing.id}`, body);
    console.log(`Updated workflow "${workflow.name}" (${result.id})`);
    return result;
  }
  const result = await n8n('POST', '/workflows', body);
  console.log(`Created workflow "${workflow.name}" (${result.id})`);
  return result;
}

async function main() {
  const sheetId = process.env.OUTBOUND_LEADS_SHEET_ID;
  if (!sheetId) {
    console.error('Missing OUTBOUND_LEADS_SHEET_ID. Run deploy-outbound-list-builder.mjs --setup-sheet first.');
    process.exit(1);
  }

  const workflow = buildWorkflow(sheetId);
  const wf = await upsertWorkflow(workflow);
  saveDeployState({ OUTBOUND_HUBSPOT_ENGAGE_WORKFLOW_ID: wf.id });

  console.log(`\nWorkflow C deployed (inactive): ${N8N_BASE}/workflow/${wf.id}`);
  console.log(`Sheet: https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
  console.log('\nHow to test:');
  console.log('  1. Pick a row that already has Status = Audited, a real Email, and an Audit Link');
  console.log('  2. Set Status = Engage');
  console.log('  3. Execute this workflow in n8n (or activate for the 5-minute schedule)');
  console.log('  4. Notes should gain hubspot:<contactId>; you get an internal email');
  console.log('  5. Deactivate when not actively engaging outbound leads');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
