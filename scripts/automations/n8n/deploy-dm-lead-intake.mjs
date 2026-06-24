#!/usr/bin/env node
/**
 * Deploy SYSBILT - DM Lead Intake (ManyChat / conversation-builder webhook).
 * Also patches Newsletter Welcome to include guide-form and instagram_dm: subscribers.
 *
 * Usage:
 *   ./scripts/automations/n8n/deploy-dm-lead-intake.sh
 *
 * Optional env (.env.local):
 *   SYSBILT_DM_WEBHOOK_SECRET   — require X-SYSBILT-Webhook-Secret header on webhook
 *   DM_LEAD_LOG_SHEET_ID        — Google Sheet ID for optional lead log tab
 *   SLACK_BOT_TOKEN             — xoxb-… token; creates "SYSBILT Slack" credential if missing
 *   SLACK_DM_CHANNEL            — e.g. #instagram-dm-leads (default placeholder until you set it)
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');

const HUBSPOT_CRED_ID = '64xkc10iud9ZbzkZ';
const HUBSPOT_CRED_NAME = 'SYSBILT n8n Production';
const GOOGLE_SHEETS_CRED_ID = 'W8jOFatMKmraYw0F';
const GOOGLE_SHEETS_CRED_NAME = 'Google Sheets account';
const GMAIL_CRED_ID = 'pR8GnMBXmukPyA2V';
const NEWSLETTER_WELCOME_WF_ID = 'Lph4ik3Y6VMhuYHV';
const NEWSLETTER_FORM_ID = '3903904e-f536-47e7-bbde-02d05e8b38dd';
const GUIDE_FORM_ID = '6702ab07-e01e-42c7-97b5-3cc68822b566';
const SYSBILT_UPDATES_SUBSCRIPTION_ID = '2628685226';
const WEBHOOK_PATH = 'sysbilt-dm-lead-intake';
const SLACK_CRED_NAME = 'SYSBILT Slack';

const NORMALIZE_LEAD_JS = `const raw = $input.first().json;
const body = raw.body && typeof raw.body === 'object' ? raw.body : raw;
const headers = raw.headers || {};

const secret = $env.SYSBILT_DM_WEBHOOK_SECRET;
if (secret) {
  const hdr = headers['x-sysbilt-webhook-secret'] || headers['X-SYSBILT-Webhook-Secret'] || '';
  if (hdr !== secret) throw new Error('Unauthorized: invalid X-SYSBILT-Webhook-Secret');
}

const email = String(body.email || '').trim().toLowerCase();
if (!email) throw new Error('email is required');

const GUIDE_MAP = {
  'ai-assistants': 'ai_assistants',
  'content-systems': 'content_systems',
  'team-training': 'team_training',
  websites: 'websites',
  'revenue-engine': 'revenue_engine',
  'lead-tracking': 'lead_tracking',
  automation: 'automation',
  dashboards: 'dashboards',
  'how-to-build-connected-construction-ecosystem': 'how_to_build_connected_construction_ecosystem',
};

const guideSlug = String(body.guide || body.guide_slug || 'revenue-engine').trim();
const guideHubspot = GUIDE_MAP[guideSlug] || guideSlug.replace(/-/g, '_');
const leadSource = String(body.lead_source_detail || ('instagram_dm:' + guideSlug)).trim();

return [{
  json: {
    firstname: String(body.firstname || body.name || body.first_name || '').trim(),
    email,
    sysbilt_persona: String(body.sysbilt_persona || body.persona || '').trim(),
    guide_slug: guideSlug,
    guide_downloaded: guideHubspot,
    lifecyclestage: String(body.lifecyclestage || 'subscriber').trim(),
    lead_source_detail: leadSource,
    ig_handle: String(body.ig_handle || body.instagram_handle || body.handle || '').trim(),
    keyword: String(body.keyword || '').trim(),
    reply_text: String(body.reply_text || body.reply || '').trim(),
    intent: String(body.intent || '').trim(),
    platform: String(body.platform || 'instagram').trim(),
  },
}];`;

const MERGE_GUIDE_DOWNLOADED_JS = `const lead = $('Normalize Lead').first().json;
const search = $input.first().json || {};
const existing = search.results?.[0]?.properties?.guide_downloaded || '';
const incoming = lead.guide_downloaded;
const values = new Set(
  String(existing || '')
    .split(';')
    .map((v) => v.trim())
    .filter(Boolean)
);
values.add(incoming);
return [{
  json: {
    ...lead,
    guide_downloaded: [...values].join(';'),
    existing_contact_id: search.results?.[0]?.id || '',
  },
}];`;

const BUILD_SLACK_MESSAGE_JS = `const lead = $('Merge Guide Downloaded').first().json;
const upsert = $('Upsert HubSpot Contact').first().json || {};
const contactId = upsert.results?.[0]?.id || upsert.id || lead.existing_contact_id || '';
const hubspotUrl = contactId
  ? 'https://app.hubspot.com/contacts/442914926/contact/' + contactId
  : '(pending)';

const lines = [
  '*Instagram / Facebook DM lead*',
  '',
  '*IG handle:* ' + (lead.ig_handle || '—'),
  '*Guide:* ' + lead.guide_slug + ' (' + lead.guide_downloaded + ')',
  '*Keyword:* ' + (lead.keyword || '—'),
  '*Name:* ' + (lead.firstname || '—'),
  '*Email:* ' + lead.email,
  '*Persona:* ' + (lead.sysbilt_persona || '—'),
  '*Platform:* ' + lead.platform,
  '*Source:* ' + lead.lead_source_detail,
];

if (lead.intent) lines.push('*Intent:* ' + lead.intent);
if (lead.reply_text) lines.push('*Reply:* ' + lead.reply_text);
lines.push('', '*HubSpot:* ' + hubspotUrl);

return [{ json: { ...lead, slack_text: lines.join('\\n'), hubspotUrl, contactId } }];`;

const BUILD_SHEET_ROW_JS = `const lead = $('Build Slack Message').first().json;
return [{
  json: {
  Timestamp: new Date().toISOString(),
  Platform: lead.platform,
  'IG Handle': lead.ig_handle,
  Keyword: lead.keyword,
  Guide: lead.guide_slug,
  Name: lead.firstname,
  Email: lead.email,
  Persona: lead.sysbilt_persona,
  Intent: lead.intent,
  Reply: lead.reply_text,
  Source: lead.lead_source_detail,
  'HubSpot URL': lead.hubspotUrl,
  },
}];`;

const ELIGIBLE_FOR_WELCOME_JS = `const NEWSLETTER_FORM = '${NEWSLETTER_FORM_ID}';
const GUIDE_FORM = '${GUIDE_FORM_ID}';

return $input.all().filter((item) => {
  const j = item.json;
  const formId = j['form-submissions']?.[0]?.['form-id'] || '';
  const source = String(
    j.properties?.lead_source_detail?.value
      || j.lead_source_detail
      || j.properties?.lead_source_detail
      || ''
  );
  if (formId === NEWSLETTER_FORM || formId === GUIDE_FORM) return true;
  if (source.startsWith('instagram_dm:')) return true;
  return false;
});`;

const SKIP_ALREADY_WELCOMED_JS = `const staticData = $getWorkflowStaticData('global');
staticData.welcomedSubscribers = staticData.welcomedSubscribers || [];
const newItems = [];

for (const item of $input.all()) {
  const contactId = item.json.id || item.json.vid || item.json['canonical-vid'];
  if (!contactId) continue;
  if (!staticData.welcomedSubscribers.includes(contactId)) {
    newItems.push(item);
    staticData.welcomedSubscribers.push(contactId);
  }
}
return newItems;`;

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
const DM_SHEET_ID = process.env.DM_LEAD_LOG_SHEET_ID || '';
const SLACK_CHANNEL = process.env.SLACK_DM_CHANNEL || '#instagram-dm-leads';

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

function sheetRef(sheetId) {
  return {
    documentId: { __rl: true, value: sheetId, mode: 'id' },
    sheetName: { __rl: true, value: 'DM Leads', mode: 'name', cachedResultName: 'DM Leads' },
  };
}

async function ensureSlackCredential() {
  const creds = await n8n('GET', '/credentials');
  const list = creds.data || creds;
  const existing = list.find((c) => c.name === SLACK_CRED_NAME);
  if (existing) return existing.id;

  const token = process.env.SLACK_BOT_TOKEN;
  if (!token) {
    console.warn(
      `No Slack credential "${SLACK_CRED_NAME}" and SLACK_BOT_TOKEN not set — workflow will deploy with Slack node unwired until you add the credential.`,
    );
    return null;
  }

  const created = await n8n('POST', '/credentials', {
    name: SLACK_CRED_NAME,
    type: 'slackApi',
    data: { accessToken: token },
  });
  console.log(`Created Slack credential: ${SLACK_CRED_NAME} (${created.id})`);
  return created.id;
}

function buildDmLeadIntakeWorkflow(slackCredId) {
  const webhookId = uid();
  const nodes = [
    {
      id: uid(),
      name: 'Workflow Guide',
      type: 'n8n-nodes-base.stickyNote',
      typeVersion: 1,
      position: [-80, -320],
      parameters: {
        content: `## DM Lead Intake\n\n**Webhook:** POST /webhook/${WEBHOOK_PATH}\n\nReceives leads from ManyChat (or similar) after DM signup.\nUpserts HubSpot → subscribes SYSBILT Updates → Slack alert → optional Sheet log.\n\nDoes **not** send the guide (builder handles that).`,
        width: 520,
        height: 280,
      },
    },
    {
      parameters: {
        path: WEBHOOK_PATH,
        httpMethod: 'POST',
        responseMode: 'responseNode',
        options: {},
      },
      type: 'n8n-nodes-base.webhook',
      typeVersion: 2,
      position: [0, 0],
      id: webhookId,
      name: 'Webhook',
      webhookId: WEBHOOK_PATH,
    },
    {
      parameters: { mode: 'runOnceForAllItems', jsCode: NORMALIZE_LEAD_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [240, 0],
      id: uid(),
      name: 'Normalize Lead',
    },
    {
      parameters: {
        method: 'POST',
        url: 'https://api.hubapi.com/crm/v3/objects/contacts/search',
        authentication: 'predefinedCredentialType',
        nodeCredentialType: 'hubspotAppToken',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={{ JSON.stringify({
  filterGroups: [{
    filters: [{
      propertyName: 'email',
      operator: 'EQ',
      value: $json.email,
    }],
  }],
  properties: ['guide_downloaded', 'email', 'firstname'],
  limit: 1,
}) }}`,
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [480, 0],
      id: uid(),
      name: 'Search Contact by Email',
      credentials: {
        hubspotAppToken: { id: HUBSPOT_CRED_ID, name: HUBSPOT_CRED_NAME },
      },
    },
    {
      parameters: { mode: 'runOnceForAllItems', jsCode: MERGE_GUIDE_DOWNLOADED_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [720, 0],
      id: uid(),
      name: 'Merge Guide Downloaded',
    },
    {
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
      email: $json.email,
      sysbilt_persona: $json.sysbilt_persona,
      guide_downloaded: $json.guide_downloaded,
      lifecyclestage: $json.lifecyclestage,
      lead_source_detail: $json.lead_source_detail,
    },
  }],
}) }}`,
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [960, 0],
      id: uid(),
      name: 'Upsert HubSpot Contact',
      credentials: {
        hubspotAppToken: { id: HUBSPOT_CRED_ID, name: HUBSPOT_CRED_NAME },
      },
    },
    {
      parameters: {
        method: 'POST',
        url: 'https://api.hubapi.com/communication-preferences/v3/subscribe',
        authentication: 'predefinedCredentialType',
        nodeCredentialType: 'hubspotAppToken',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={{ JSON.stringify({
  emailAddress: $('Merge Guide Downloaded').first().json.email,
  subscriptionId: ${SYSBILT_UPDATES_SUBSCRIPTION_ID},
  legalBasis: 'CONSENT_WITH_NOTICE',
  legalBasisExplanation: 'Opted in via Instagram/Facebook DM funnel (ManyChat)',
}) }}`,
        options: { response: { response: { neverError: true } } },
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [1200, 0],
      id: uid(),
      name: 'Subscribe SYSBILT Updates',
      credentials: {
        hubspotAppToken: { id: HUBSPOT_CRED_ID, name: HUBSPOT_CRED_NAME },
      },
      continueOnFail: true,
    },
    {
      parameters: { mode: 'runOnceForAllItems', jsCode: BUILD_SLACK_MESSAGE_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1440, 0],
      id: uid(),
      name: 'Build Slack Message',
    },
  ];

  if (slackCredId) {
    nodes.push({
      parameters: {
        select: 'channel',
        channelId: {
          __rl: true,
          value: SLACK_CHANNEL,
          mode: 'name',
        },
        text: '={{ $json.slack_text }}',
        otherOptions: {},
      },
      type: 'n8n-nodes-base.slack',
      typeVersion: 2.2,
      position: [1680, 0],
      id: uid(),
      name: 'Slack Notify',
      credentials: {
        slackApi: { id: slackCredId, name: SLACK_CRED_NAME },
      },
      continueOnFail: true,
    });
  } else {
    nodes.push({
      parameters: { mode: 'runOnceForAllItems', jsCode: 'return $input.all();' },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1680, 0],
      id: uid(),
      name: 'Slack Notify (add SYSBILT Slack credential)',
    });
  }

  const afterSlack = slackCredId ? 'Slack Notify' : 'Slack Notify (add SYSBILT Slack credential)';

  if (DM_SHEET_ID) {
    nodes.push(
      {
        parameters: { mode: 'runOnceForAllItems', jsCode: BUILD_SHEET_ROW_JS },
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [1920, 0],
        id: uid(),
        name: 'Build Sheet Row',
      },
      {
        parameters: {
          operation: 'append',
          ...sheetRef(DM_SHEET_ID),
          columns: {
            mappingMode: 'autoMapInputData',
            value: {},
          },
          options: {},
        },
        type: 'n8n-nodes-base.googleSheets',
        typeVersion: 4.7,
        position: [2160, 0],
        id: uid(),
        name: 'Log to Google Sheet',
        credentials: {
          googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
        },
        continueOnFail: true,
      },
    );
  }

  const respondNode = {
    parameters: {
      respondWith: 'json',
      responseBody: `={{ JSON.stringify({
  ok: true,
  email: $('Merge Guide Downloaded').first().json.email,
  guide: $('Merge Guide Downloaded').first().json.guide_slug,
  hubspot_contact_id: $('Upsert HubSpot Contact').first().json.results?.[0]?.id || $('Upsert HubSpot Contact').first().json.id || null,
}) }}`,
      options: { responseCode: 200 },
    },
    type: 'n8n-nodes-base.respondToWebhook',
    typeVersion: 1.1,
    position: [DM_SHEET_ID ? 2400 : 1920, 0],
    id: uid(),
    name: 'Respond OK',
  };
  nodes.push(respondNode);

  const connections = {
    Webhook: { main: [[{ node: 'Normalize Lead', type: 'main', index: 0 }]] },
    'Normalize Lead': { main: [[{ node: 'Search Contact by Email', type: 'main', index: 0 }]] },
    'Search Contact by Email': { main: [[{ node: 'Merge Guide Downloaded', type: 'main', index: 0 }]] },
    'Merge Guide Downloaded': { main: [[{ node: 'Upsert HubSpot Contact', type: 'main', index: 0 }]] },
    'Upsert HubSpot Contact': { main: [[{ node: 'Subscribe SYSBILT Updates', type: 'main', index: 0 }]] },
    'Subscribe SYSBILT Updates': { main: [[{ node: 'Build Slack Message', type: 'main', index: 0 }]] },
    'Build Slack Message': { main: [[{ node: afterSlack, type: 'main', index: 0 }]] },
  };

  if (DM_SHEET_ID) {
    connections[afterSlack] = { main: [[{ node: 'Build Sheet Row', type: 'main', index: 0 }]] };
    connections['Build Sheet Row'] = { main: [[{ node: 'Log to Google Sheet', type: 'main', index: 0 }]] };
    connections['Log to Google Sheet'] = { main: [[{ node: 'Respond OK', type: 'main', index: 0 }]] };
  } else {
    connections[afterSlack] = { main: [[{ node: 'Respond OK', type: 'main', index: 0 }]] };
  }

  return {
    name: 'SYSBILT - DM Lead Intake',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  };
}

async function upsertWorkflow(workflow, existingId) {
  const payload = {
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings: workflow.settings,
  };
  if (existingId) {
    return n8n('PUT', `/workflows/${existingId}`, payload);
  }
  const all = await n8n('GET', '/workflows?limit=100');
  const list = all.data || [];
  const match = list.find((w) => w.name === workflow.name);
  if (match) {
    return n8n('PUT', `/workflows/${match.id}`, payload);
  }
  return n8n('POST', '/workflows', payload);
}

async function activateWorkflow(id, name) {
  try {
    await n8n('POST', `/workflows/${id}/activate`);
    console.log(`Activated: ${name} (${id})`);
  } catch (err) {
    if (String(err).includes('conflict with one of the webhooks')) {
      console.warn(`Activate skipped for ${id} (webhook path already active on this workflow)`);
      return;
    }
    throw err;
  }
}

function patchNewsletterWelcome(wf) {
  const getNode = wf.nodes.find((n) => n.name === 'Get many contacts');
  if (getNode) {
    getNode.parameters.additionalFields = {
      propertiesCollection: {
        propertiesValues: {
          properties: ['firstname', 'email', 'lead_source_detail'],
          propertyMode: 'valueOnly',
        },
      },
    };
  }

  const filterNode = wf.nodes.find((n) => n.name === 'Filter');
  if (filterNode) {
    filterNode.name = 'Eligible for Welcome';
    filterNode.type = 'n8n-nodes-base.code';
    filterNode.typeVersion = 2;
    filterNode.parameters = { mode: 'runOnceForAllItems', jsCode: ELIGIBLE_FOR_WELCOME_JS };
  }

  const dedupeNode = wf.nodes.find((n) => n.name === 'Code in JavaScript');
  if (dedupeNode) {
    dedupeNode.name = 'Skip Already Welcomed';
    dedupeNode.parameters.jsCode = SKIP_ALREADY_WELCOMED_JS;
  }

  const legacyNode = wf.nodes.find((n) => n.name === 'Code in JavaScript1');
  if (legacyNode) {
    legacyNode.name = 'Passthrough (legacy dedupe removed)';
    legacyNode.parameters.jsCode = 'return $input.all();';
  }

  const sticky = wf.nodes.find((n) => n.name === 'Workflow Guide');
  if (sticky) {
    sticky.parameters.content = `## Newsletter Welcome\n\n**What it does**\nScheduled: finds HubSpot contacts who subscribed via newsletter form, guide download form, or \`instagram_dm:\` lead source → sends a one-time welcome email.\n\n**Related workflows**\n← **NEWS** — ongoing newsletter sends use the same subscriber list\n← **DM Lead Intake** — sets \`lead_source_detail: instagram_dm:{guide}\`\n✗ Separate from outbound sheet / audit pipeline`;
  }

  const conn = wf.connections || {};
  if (conn.Filter) {
    conn['Eligible for Welcome'] = conn.Filter;
    delete conn.Filter;
  }
  if (conn['Code in JavaScript1']) {
    conn['Passthrough (legacy dedupe removed)'] = conn['Code in JavaScript1'];
    delete conn['Code in JavaScript1'];
  }
  if (conn['Code in JavaScript']) {
    conn['Skip Already Welcomed'] = conn['Code in JavaScript'];
    delete conn['Code in JavaScript'];
  }

  return wf;
}

async function main() {
  const slackCredId = await ensureSlackCredential();
  const dmWorkflow = buildDmLeadIntakeWorkflow(slackCredId);

  const existingId = process.env.DM_LEAD_INTAKE_WORKFLOW_ID;
  const deployed = await upsertWorkflow(dmWorkflow, existingId);
  await activateWorkflow(deployed.id, deployed.name);

  const workflowsDir = resolve(__dirname, 'workflows');
  mkdirSync(workflowsDir, { recursive: true });
  const jsonPath = resolve(workflowsDir, 'sysbilt-dm-lead-intake.json');
  writeFileSync(jsonPath, JSON.stringify({ ...dmWorkflow, id: deployed.id, active: true }, null, 2) + '\n');
  console.log(`Wrote workflow JSON: ${jsonPath}`);

  const welcomeWf = await n8n('GET', `/workflows/${NEWSLETTER_WELCOME_WF_ID}`);
  const patched = patchNewsletterWelcome(welcomeWf);
  await n8n('PUT', `/workflows/${NEWSLETTER_WELCOME_WF_ID}`, {
    name: patched.name,
    nodes: patched.nodes,
    connections: patched.connections,
    settings: { executionOrder: patched.settings?.executionOrder || 'v1' },
  });
  console.log(`Patched Newsletter Welcome (${NEWSLETTER_WELCOME_WF_ID}) — now includes guide form + instagram_dm: sources`);

  saveDeployState({
    DM_LEAD_INTAKE_WORKFLOW_ID: deployed.id,
    ...(slackCredId ? { SLACK_CREDENTIAL_ID: slackCredId } : {}),
  });

  console.log(`\nWebhook URL: POST ${N8N_BASE}/webhook/${WEBHOOK_PATH}`);
  if (!slackCredId) {
    console.log('\nSlack: set SLACK_BOT_TOKEN + SLACK_DM_CHANNEL in .env.local, then re-run deploy.');
  }
  if (!DM_SHEET_ID) {
    console.log('\nSheet log: set DM_LEAD_LOG_SHEET_ID in .env.local (tab "DM Leads") to enable logging.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
