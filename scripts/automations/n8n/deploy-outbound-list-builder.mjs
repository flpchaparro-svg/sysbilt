#!/usr/bin/env node
/**
 * Deploy SYSBILT - Outbound List Builder (Workflow A) and optional Google Sheet setup.
 *
 * Env (from .env.local or shell):
 *   N8N_API_KEY / cursor-mcp
 *   N8N_BASE_URL          — default https://n8n.sysbilt.com
 *   OUTBOUND_LEADS_SHEET_ID — spreadsheet ID (written by --setup-sheet)
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-outbound-list-builder.mjs --setup-sheet
 *   node scripts/automations/n8n/deploy-outbound-list-builder.mjs
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const INBOUND_AUDIT_WORKFLOW_ID = 'TvkvfhrMWWHAEQFd';
const GOOGLE_SHEETS_CRED_ID = 'W8jOFatMKmraYw0F';
const GOOGLE_SHEETS_CRED_NAME = 'Google Sheets account';

const SHEET_HEADERS = [
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
];

const SHEET_DATA_RANGE = 'A1:N5000';
const GEMINI_CRED_ID = 'fYynkgKRlOyjBhLi';
const GEMINI_CRED_NAME = 'Gemini News Free';

const STATUS_VALUES = ['New', 'Audit', 'Auditing', 'Audited', 'Engage', 'Emailed', 'Replied', 'Dead'];

const HEADER_ROW_JS = `return [{
  json: {
    'Business Name': 'Business Name',
    'Suburb': 'Suburb',
    'Address': 'Address',
    'Website': 'Website',
    'Phone': 'Phone',
    'Rating': 'Rating',
    'Reviews': 'Reviews',
    'Maps ID': 'Maps ID',
    'Owner Name': 'Owner Name',
    'Email': 'Email',
    'Status': 'Status',
    'Audit Link': 'Audit Link',
    'Emailed': 'Emailed',
    'Notes': 'Notes',
  },
}];`;

function buildHeaderRowNode(position) {
  return {
    id: uid(),
    name: 'Build Header Row',
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position,
    parameters: {
      mode: 'runOnceForAllItems',
      jsCode: HEADER_ROW_JS,
    },
  };
}

function buildSetHeaderRowHttpNode(sheetId, position) {
  const encodedRange = encodeURIComponent('Sheet1!A1:N1');
  return {
    id: uid(),
    name: 'Set Header Row',
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.4,
    position,
    credentials: {
      googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
    },
    parameters: {
      method: 'PUT',
      url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodedRange}?valueInputOption=USER_ENTERED`,
      authentication: 'predefinedCredentialType',
      nodeCredentialType: 'googleSheetsOAuth2Api',
      sendBody: true,
      specifyBody: 'json',
      jsonBody: JSON.stringify({
        range: 'Sheet1!A1:N1',
        majorDimension: 'ROWS',
        values: [SHEET_HEADERS],
      }),
      options: {},
    },
  };
}

const BUILD_DELETE_TABLE_REQUESTS_JS = `const requests = [];
for (const sheet of ($input.first().json.sheets || [])) {
  for (const table of sheet.tables || []) {
    if (table.tableId) requests.push({ deleteTable: { tableId: table.tableId } });
  }
}
return [{ json: { requests, hasTables: requests.length > 0 } }];`;

function buildGetSpreadsheetMetaNode(sheetId, position) {
  return {
    id: uid(),
    name: 'Get Spreadsheet Meta',
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.4,
    position,
    credentials: {
      googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
    },
    parameters: {
      method: 'GET',
      url: `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=sheets(properties.sheetId,tables(tableId))`,
      authentication: 'predefinedCredentialType',
      nodeCredentialType: 'googleSheetsOAuth2Api',
      options: {},
    },
  };
}

function buildDeleteTablesNode(sheetId, position) {
  return {
    id: uid(),
    name: 'Delete Tables',
    type: 'n8n-nodes-base.httpRequest',
    typeVersion: 4.4,
    position,
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
      jsonBody: '={{ ({ requests: $json.requests }) }}',
      options: {},
    },
  };
}

function buildWriteHeadersNode(sheetIdExpr, position) {
  return {
    id: uid(),
    name: 'Append Header Row',
    type: 'n8n-nodes-base.googleSheets',
    typeVersion: 4.7,
    position,
    credentials: {
      googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
    },
    parameters: {
      operation: 'append',
      documentId: {
        __rl: true,
        value: sheetIdExpr,
        mode: 'id',
      },
      sheetName: {
        __rl: true,
        value: 'Sheet1',
        mode: 'name',
        cachedResultName: 'Sheet1',
      },
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
  };
}

const TRIGGER_AFTER_CLEAR_JS = `return [{ json: { _ok: true } }];`;

function buildPassHeadersNode(position) {
  return {
    id: uid(),
    name: 'Pass Headers Through',
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position,
    parameters: {
      mode: 'runOnceForAllItems',
      jsCode: TRIGGER_AFTER_CLEAR_JS,
    },
  };
}

function buildClearEntireSheetNode(sheetIdExpr, position) {
  return {
    id: uid(),
    name: 'Clear Sheet',
    type: 'n8n-nodes-base.googleSheets',
    typeVersion: 4.7,
    position,
    alwaysOutputData: true,
    credentials: {
      googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
    },
    parameters: {
      operation: 'clear',
      documentId: {
        __rl: true,
        value: sheetIdExpr,
        mode: 'id',
      },
      sheetName: {
        __rl: true,
        value: 'Sheet1',
        mode: 'name',
        cachedResultName: 'Sheet1',
      },
      clear: 'wholeSheet',
      options: {},
    },
  };
}

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
  const body = [...map.entries()].map(([k, v]) => `${k}=${v}`).join('\n') + '\n';
  writeFileSync(path, body);
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

async function fetchSerpApiKey() {
  const wf = await n8n('GET', `/workflows/${INBOUND_AUDIT_WORKFLOW_ID}`);
  const maps = wf.nodes?.find((n) => n.name === 'Maps Lookup');
  const url = maps?.parameters?.url || '';
  const m = String(url).match(/api_key=([a-f0-9]+)/i);
  if (!m) throw new Error('Could not extract SerpAPI key from inbound Maps Lookup node');
  return m[1];
}

function sheetRef(sheetId, sheetName = 'Sheet1') {
  return {
    documentId: {
      __rl: true,
      value: sheetId,
      mode: 'id',
    },
    sheetName: {
      __rl: true,
      value: sheetName,
      mode: 'name',
      cachedResultName: sheetName,
    },
  };
}

function headerSchema() {
  return SHEET_HEADERS.map((id) => ({
    id,
    displayName: id,
    required: false,
    defaultMatch: false,
    display: true,
    type: 'string',
    canBeUsedToMatch: true,
  }));
}

const MAP_SERP_RESULTS_JS = `// Reads the SerpAPI google_maps response from the HTTP node above
const response = $input.first().json;
const results = response.local_results || (response.place_results ? [response.place_results] : []);

const MAX_ROWS = 20;

function parseSuburb(address) {
  const a = String(address || '');
  const nsw = a.match(/,\\s*([^,]+)\\s+NSW\\s+\\d{4}\\s*$/i);
  if (nsw) return nsw[1].trim();
  const vic = a.match(/,\\s*([^,]+)\\s+VIC\\s+\\d{4}\\s*$/i);
  if (vic) return vic[1].trim();
  return '';
}

const rows = results
  .filter(r => r.website)
  .slice(0, MAX_ROWS)
  .map(r => ({
    'Business Name': r.title || '',
    'Suburb':        parseSuburb(r.address),
    'Address':       r.address || '',
    'Website':       r.website || '',
    'Phone':         r.phone || '',
    'Rating':        r.rating || '',
    'Reviews':       r.reviews || '',
    'Maps ID':       r.data_id || '',
    'Owner Name':    '',
    'Email':         '',
    'Status':        'New',
    'Audit Link':    '',
    'Emailed':       '',
    'Notes':         ''
  }));

return rows.map(row => ({ json: row }));`;

const EXTRACT_CONTACTS_HELPER = `function jinaText(j) {
  return String(j?.data || j?.content || j?.text || JSON.stringify(j || {}));
}

function pickEmail(emails) {
  const blocked = [
    'sentry.io', 'wixpress.com', 'example.com', 'google.com', 'facebook.com',
    'instagram.com', 'wordpress.org', 'cloudflare.com', 'schema.org', 'w3.org',
    'gravatar.com', 'domain.com', 'email.com', 'yourname@', 'name@example',
    '.png', '.jpg', '.webp', '.gif', 'noreply', 'no-reply', 'donotreply',
  ];
  const good = [...new Set(emails)].filter((e) => {
    const lower = e.toLowerCase();
    return lower.includes('@') && !blocked.some((b) => lower.includes(b));
  });
  const prefs = ['info@', 'contact@', 'hello@', 'enquir', 'reception@', 'admin@', 'office@', 'appoint'];
  for (const p of prefs) {
    const hit = good.find((e) => e.toLowerCase().includes(p.replace('@', '')));
    if (hit) return hit;
  }
  return good[0] || '';
}

function extractFromText(text) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g;
  const emails = text.match(emailRegex) || [];
  const email = pickEmail(emails);
  let owner = '';
  const dr = text.match(/\\bDr\\.?\\s+([A-Z][a-z]+(?:\\s+[A-Z][a-z]+)?)/);
  if (dr) owner = dr[1].trim();
  if (!owner) {
    const principal = text.match(/\\b(?:Principal|Owner|Director)\\s*:?\\s+([A-Z][a-z]+(?:\\s+[A-Z][a-z]+)?)/i);
    if (principal) owner = principal[1].trim();
  }
  return { email, owner };
}`;

const PARSE_HOMEPAGE_JS = `${EXTRACT_CONTACTS_HELPER}
const row = { ...$('Has Rows To Append').item.json };
const found = extractFromText(jinaText($input.item.json));
if (found.email) row.Email = found.email;
if (found.owner) row['Owner Name'] = found.owner;
row.Notes = found.email ? 'email:homepage' : 'email:not-found-homepage';
return { json: row };`;

const PARSE_CONTACT_JS = `${EXTRACT_CONTACTS_HELPER}
const row = { ...$('Parse Homepage Contacts').item.json };
const found = extractFromText(jinaText($input.item.json));
if (found.email && !row.Email) row.Email = found.email;
if (found.owner && !row['Owner Name']) row['Owner Name'] = found.owner;
if (found.email && !String($('Parse Homepage Contacts').item.json.Email || '').trim()) {
  row.Notes = 'email:contact-page';
}
return { json: row };`;

const JINA_HOMEPAGE_URL = `={{ (() => {
  let u = ($json.Website || '').trim();
  if (!u) return 'https://r.jina.ai/https://example.com';
  if (!/^https?:/i.test(u)) u = 'https://' + u;
  return 'https://r.jina.ai/' + u;
})() }}`;

const JINA_CONTACT_URL = `={{ (() => {
  let u = ($('Has Rows To Append').item.json.Website || '').trim().replace(/\\/$/, '');
  if (!/^https?:/i.test(u)) u = 'https://' + u;
  return 'https://r.jina.ai/' + u + '/contact';
})() }}`;

const FILTER_NEEDS_EMAIL_JS = `return $input.all()
  .map((item) => item.json)
  .filter((row) => String(row['Business Name'] || '').trim() && row['Business Name'] !== 'Business Name')
  .filter((r) => (r.Website || '').trim() && !(r.Email || '').trim() && (r['Maps ID'] || '').trim())
  .map((row) => ({ json: row }));`;

const DEDUP_ROWS_JS = `const newRows = $('Map SerpAPI Results').all().map((item) => item.json);
const existingIds = new Set(
  $('Read Sheet For Dedup').all()
    .map((item) => item.json)
    .filter((row) => String(row['Business Name'] || '').trim() && row['Business Name'] !== 'Business Name')
    .map((row) => String(row['Maps ID'] || '').trim())
    .filter(Boolean)
);

const fresh = newRows.filter((row) => {
  const mapsId = String(row['Maps ID'] || '').trim();
  return mapsId && !existingIds.has(mapsId);
});

if (!fresh.length) {
  return [{ json: { _skipped: true, reason: 'No new rows (all Maps IDs already in sheet)' } }];
}

return fresh.map((row) => ({ json: row }));`;

const TRIGGER_READ_ONCE_JS = `// Collapse mapped rows to a single item so the sheet read runs once.
return [{ json: { _triggerRead: true } }];`;

// Inner west Sydney anchor (Stanmore centre). q=dental clinic + ll returns nearby suburbs correctly.
const INNER_WEST_LL = '@-33.8992,151.1644,13z';

const PARSE_HOMEPAGE_BACKFILL_JS = PARSE_HOMEPAGE_JS.replaceAll(
  "$('Has Rows To Append')",
  "$('Rows To Scrape')",
);
const PARSE_CONTACT_BACKFILL_JS = PARSE_CONTACT_JS;
const JINA_CONTACT_URL_BACKFILL = JINA_CONTACT_URL.replaceAll(
  "$('Has Rows To Append')",
  "$('Rows To Scrape')",
);

function buildWebsiteScrapeNodes({
  rowSourceNode,
  appendNode,
  parseHomeJs = PARSE_HOMEPAGE_JS,
  parseContactJs = PARSE_CONTACT_JS,
  jinaContactUrl = JINA_CONTACT_URL,
}) {
  const waitHomeId = uid();
  const jinaHomeId = uid();
  const parseHomeId = uid();
  const ifContactId = uid();
  const waitContactId = uid();
  const jinaContactId = uid();
  const parseContactId = uid();

  const nodes = [
    {
      id: waitHomeId,
      name: 'Wait Before Homepage',
      type: 'n8n-nodes-base.wait',
      typeVersion: 1.1,
      position: [600, 0],
      parameters: { amount: 1 },
    },
    {
      id: jinaHomeId,
      name: 'Jina Homepage',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.4,
      position: [720, 0],
      onError: 'continueRegularOutput',
      parameters: { url: JINA_HOMEPAGE_URL, options: { timeout: 30000 } },
    },
    {
      id: parseHomeId,
      name: 'Parse Homepage Contacts',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [960, 0],
      parameters: { mode: 'runOnceForEachItem', jsCode: parseHomeJs },
    },
    {
      id: ifContactId,
      name: 'Needs Contact Page',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [1200, 0],
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3 },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json.Email }}',
              rightValue: '',
              operator: { type: 'string', operation: 'empty' },
            },
          ],
          combinator: 'and',
        },
        looseTypeValidation: true,
        options: {},
      },
    },
    {
      id: waitContactId,
      name: 'Wait Before Contact',
      type: 'n8n-nodes-base.wait',
      typeVersion: 1.1,
      position: [1320, 160],
      parameters: { amount: 2 },
    },
    {
      id: jinaContactId,
      name: 'Jina Contact Page',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.4,
      position: [1440, 160],
      onError: 'continueRegularOutput',
      parameters: { url: jinaContactUrl, options: { timeout: 30000 } },
    },
    {
      id: parseContactId,
      name: 'Parse Contact Page',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1680, 160],
      parameters: { mode: 'runOnceForEachItem', jsCode: parseContactJs },
    },
  ];

  const connections = {
    [rowSourceNode]: { main: [[{ node: 'Wait Before Homepage', type: 'main', index: 0 }]] },
    'Wait Before Homepage': { main: [[{ node: 'Jina Homepage', type: 'main', index: 0 }]] },
    'Jina Homepage': { main: [[{ node: 'Parse Homepage Contacts', type: 'main', index: 0 }]] },
    'Parse Homepage Contacts': { main: [[{ node: 'Needs Contact Page', type: 'main', index: 0 }]] },
    'Needs Contact Page': {
      main: [
        [{ node: 'Wait Before Contact', type: 'main', index: 0 }],
        [{ node: appendNode, type: 'main', index: 0 }],
      ],
    },
    'Wait Before Contact': { main: [[{ node: 'Jina Contact Page', type: 'main', index: 0 }]] },
    'Jina Contact Page': { main: [[{ node: 'Parse Contact Page', type: 'main', index: 0 }]] },
    'Parse Contact Page': { main: [[{ node: appendNode, type: 'main', index: 0 }]] },
  };

  return { nodes, connections };
}

function buildListBuilderWorkflow(serpApiKey, sheetId, { includeTestWebhook = false } = {}) {
  const manualId = uid();
  const webhookId = uid();
  const serpId = uid();
  const mapId = uid();
  const triggerReadId = uid();
  const readId = uid();
  const dedupId = uid();
  const appendId = uid();
  const skipIfId = uid();

  const nodes = [
    {
      id: manualId,
      name: 'Manual Trigger',
      type: 'n8n-nodes-base.manualTrigger',
      typeVersion: 1,
      position: [-720, -120],
      parameters: {},
    },
    ...(includeTestWebhook
      ? [
          {
            id: webhookId,
            name: 'Test Webhook',
            type: 'n8n-nodes-base.webhook',
            typeVersion: 2.1,
            position: [-720, 120],
            parameters: {
              path: 'sysbilt-outbound-list-test',
              httpMethod: 'POST',
              options: {},
            },
            webhookId: 'sysbilt-outbound-list-test',
          },
        ]
      : []),
    {
      id: serpId,
      name: 'SerpAPI Maps Search',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.4,
      position: [-480, 0],
      parameters: {
        method: 'GET',
        url: 'https://serpapi.com/search.json',
        sendQuery: true,
        queryParameters: {
          parameters: [
            { name: 'engine', value: 'google_maps' },
            { name: 'q', value: 'dental clinic' },
            { name: 'll', value: INNER_WEST_LL },
            { name: 'google_domain', value: 'google.com.au' },
            { name: 'gl', value: 'au' },
            { name: 'hl', value: 'en' },
            { name: 'type', value: 'search' },
            { name: 'api_key', value: serpApiKey },
          ],
        },
        options: {},
      },
    },
    {
      id: mapId,
      name: 'Map SerpAPI Results',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-240, 0],
      parameters: {
        mode: 'runOnceForAllItems',
        jsCode: MAP_SERP_RESULTS_JS,
      },
    },
    {
      id: triggerReadId,
      name: 'Trigger Read Once',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [0, 0],
      parameters: {
        mode: 'runOnceForAllItems',
        jsCode: TRIGGER_READ_ONCE_JS,
      },
    },
    {
      id: readId,
      name: 'Read Sheet For Dedup',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [240, 0],
      alwaysOutputData: true,
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId),
        options: {
          dataLocationOnSheet: {
            values: {
              rangeDefinition: 'specifyRangeA1',
              range: SHEET_DATA_RANGE,
            },
          },
        },
      },
    },
    {
      id: dedupId,
      name: 'Dedup New Rows',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [480, 0],
      parameters: {
        mode: 'runOnceForAllItems',
        jsCode: DEDUP_ROWS_JS,
      },
    },
    {
      id: skipIfId,
      name: 'Has Rows To Append',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [720, 0],
      parameters: {
        conditions: {
          options: {
            caseSensitive: true,
            leftValue: '',
            typeValidation: 'loose',
            version: 3,
          },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json._skipped }}',
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
      id: appendId,
      name: 'Append To Sheet',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [1920, 0],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
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
        options: {
          useAppend: true,
        },
      },
    },
  ];

  const scrape = buildWebsiteScrapeNodes({
    rowSourceNode: 'Has Rows To Append',
    appendNode: 'Append To Sheet',
  });
  nodes.push(...scrape.nodes);

  const connections = {
    'Manual Trigger': { main: [[{ node: 'SerpAPI Maps Search', type: 'main', index: 0 }]] },
    ...(includeTestWebhook
      ? { 'Test Webhook': { main: [[{ node: 'SerpAPI Maps Search', type: 'main', index: 0 }]] } }
      : {}),
    'SerpAPI Maps Search': { main: [[{ node: 'Map SerpAPI Results', type: 'main', index: 0 }]] },
    'Map SerpAPI Results': { main: [[{ node: 'Trigger Read Once', type: 'main', index: 0 }]] },
    'Trigger Read Once': { main: [[{ node: 'Read Sheet For Dedup', type: 'main', index: 0 }]] },
    'Read Sheet For Dedup': { main: [[{ node: 'Dedup New Rows', type: 'main', index: 0 }]] },
    'Dedup New Rows': { main: [[{ node: 'Has Rows To Append', type: 'main', index: 0 }]] },
    'Has Rows To Append': {
      main: [
        scrape.connections['Has Rows To Append'].main[0],
        [],
      ],
    },
    ...Object.fromEntries(
      Object.entries(scrape.connections).filter(([k]) => k !== 'Has Rows To Append'),
    ),
  };

  return {
    name: 'SYSBILT - Outbound List Builder',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  };
}

function buildContactScrapeWorkflow(sheetId) {
  const manualId = uid();
  const readId = uid();
  const filterId = uid();
  const updateId = uid();

  const nodes = [
    {
      id: manualId,
      name: 'Manual Trigger',
      type: 'n8n-nodes-base.manualTrigger',
      typeVersion: 1,
      position: [-720, 200],
      parameters: {},
    },
    {
      id: readId,
      name: 'Read Sheet Rows',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-480, 200],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'read',
        ...sheetRef(sheetId),
        options: {
          dataLocationOnSheet: {
            values: {
              rangeDefinition: 'specifyRangeA1',
              range: SHEET_DATA_RANGE,
            },
          },
        },
      },
    },
    {
      id: filterId,
      name: 'Rows To Scrape',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-240, 200],
      parameters: {
        mode: 'runOnceForAllItems',
        jsCode: FILTER_NEEDS_EMAIL_JS,
      },
    },
    {
      id: updateId,
      name: 'Update Sheet Row',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [2160, 200],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'appendOrUpdate',
        ...sheetRef(sheetId),
        columns: {
          mappingMode: 'autoMapInputData',
          value: {},
          matchingColumns: ['Maps ID'],
          schema: headerSchema().map((col) => ({
            ...col,
            canBeUsedToMatch: col.id === 'Maps ID',
          })),
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: { useAppend: false },
      },
    },
  ];

  const scrape = buildWebsiteScrapeNodes({
    rowSourceNode: 'Rows To Scrape',
    appendNode: 'Update Sheet Row',
    parseHomeJs: PARSE_HOMEPAGE_BACKFILL_JS,
    parseContactJs: PARSE_CONTACT_BACKFILL_JS,
    jinaContactUrl: JINA_CONTACT_URL_BACKFILL,
  });
  nodes.push(...scrape.nodes);

  const connections = {
    'Manual Trigger': { main: [[{ node: 'Read Sheet Rows', type: 'main', index: 0 }]] },
    'Read Sheet Rows': { main: [[{ node: 'Rows To Scrape', type: 'main', index: 0 }]] },
    ...scrape.connections,
  };

  return {
    name: 'SYSBILT - Outbound Contact Scrape',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  };
}

function buildSheetSetupWorkflow() {
  const webhookId = uid();
  const createId = uid();
  const headerCodeId = uid();
  const headersId = uid();
  const respondId = uid();
  const headerCode = buildHeaderRowNode([-320, 0]);
  headerCode.id = headerCodeId;
  const writeHeaders = buildWriteHeadersNode('={{ $("Create Spreadsheet").item.json.spreadsheetId }}', [-80, 0]);
  headersId && (writeHeaders.id = headersId);

  const nodes = [
    {
      id: webhookId,
      name: 'Setup Webhook',
      type: 'n8n-nodes-base.webhook',
      typeVersion: 2.1,
      position: [-640, 0],
      parameters: {
        path: 'sysbilt-outbound-sheet-setup',
        httpMethod: 'POST',
        responseMode: 'responseNode',
        options: {},
      },
      webhookId: 'sysbilt-outbound-sheet-setup',
    },
    {
      id: createId,
      name: 'Create Spreadsheet',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-480, 0],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        resource: 'spreadsheet',
        operation: 'create',
        title: 'SYSBILT Outbound Leads',
        options: {},
      },
    },
    headerCode,
    writeHeaders,
    {
      id: respondId,
      name: 'Respond With Sheet URL',
      type: 'n8n-nodes-base.respondToWebhook',
      typeVersion: 1.1,
      position: [160, 0],
      parameters: {
        respondWith: 'json',
        responseBody: '={{ ({ spreadsheetId: $("Create Spreadsheet").item.json.spreadsheetId, spreadsheetUrl: $("Create Spreadsheet").item.json.spreadsheetUrl }) }}',
        options: {},
      },
    },
  ];

  const connections = {
    'Setup Webhook': { main: [[{ node: 'Create Spreadsheet', type: 'main', index: 0 }]] },
    'Create Spreadsheet': { main: [[{ node: 'Build Header Row', type: 'main', index: 0 }]] },
    'Build Header Row': { main: [[{ node: 'Append Header Row', type: 'main', index: 0 }]] },
    'Append Header Row': { main: [[{ node: 'Respond With Sheet URL', type: 'main', index: 0 }]] },
  };

  return {
    name: 'SYSBILT - Outbound Sheet Setup',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  };
}

async function findWorkflowByName(name) {
  const { data } = await n8n('GET', '/workflows?limit=250');
  return data?.find((w) => w.name === name);
}

async function clearWorkflowPinData(workflowId) {
  const wf = await n8n('GET', `/workflows/${workflowId}`);
  if (!wf.pinData || !Object.keys(wf.pinData).length) return;
  const res = await fetch(`${N8N_BASE}/api/v1/workflows/${workflowId}`, {
    method: 'PATCH',
    headers: { 'X-N8N-API-KEY': N8N_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ pinData: {} }),
  });
  if (res.ok) {
    console.log('Cleared pinned test data on workflow');
    return;
  }
  await n8n('PUT', `/workflows/${workflowId}`, {
    name: wf.name,
    nodes: wf.nodes,
    connections: wf.connections,
    settings: wf.settings,
  });
  console.log('Pinned data may still exist — clear manually in n8n UI if needed');
}

async function upsertWorkflow(workflow, { activate = false } = {}) {
  const existing = await findWorkflowByName(workflow.name);
  const body = {
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings: workflow.settings,
  };
  let result;
  if (existing) {
    result = await n8n('PUT', `/workflows/${existing.id}`, body);
    await clearWorkflowPinData(existing.id);
    console.log(`Updated workflow "${workflow.name}" (${result.id})`);
  } else {
    result = await n8n('POST', '/workflows', body);
    console.log(`Created workflow "${workflow.name}" (${result.id})`);
  }
  if (activate && !result.active) {
    await n8n('POST', `/workflows/${result.id}/activate`, {});
    console.log(`Activated workflow "${workflow.name}"`);
  }
  return result;
}

function buildHeadersOnlyWorkflow(sheetId) {
  const webhookId = uid();
  const respondId = uid();
  const buildDeleteId = uid();
  const hasTablesIfId = uid();
  const getMeta = buildGetSpreadsheetMetaNode(sheetId, [-360, 0]);
  const deleteTables = buildDeleteTablesNode(sheetId, [120, 0]);
  const clearSheet = buildClearEntireSheetNode(sheetId, [360, 0]);
  const setHeaders = buildSetHeaderRowHttpNode(sheetId, [600, 0]);

  const nodes = [
    {
      id: webhookId,
      name: 'Headers Webhook',
      type: 'n8n-nodes-base.webhook',
      typeVersion: 2.1,
      position: [-640, 0],
      parameters: {
        path: 'sysbilt-outbound-sheet-headers',
        httpMethod: 'POST',
        responseMode: 'responseNode',
        options: {},
      },
      webhookId: 'sysbilt-outbound-sheet-headers',
    },
    getMeta,
    {
      id: buildDeleteId,
      name: 'Build Delete Table Requests',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-120, 0],
      parameters: {
        mode: 'runOnceForAllItems',
        jsCode: BUILD_DELETE_TABLE_REQUESTS_JS,
      },
    },
    {
      id: hasTablesIfId,
      name: 'Has Tables',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [0, 0],
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3 },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json.hasTables }}',
              rightValue: true,
              operator: { type: 'boolean', operation: 'equals' },
            },
          ],
          combinator: 'and',
        },
        looseTypeValidation: true,
        options: {},
      },
    },
    deleteTables,
    clearSheet,
    setHeaders,
    {
      id: respondId,
      name: 'Respond OK',
      type: 'n8n-nodes-base.respondToWebhook',
      typeVersion: 1.1,
      position: [840, 0],
      parameters: {
        respondWith: 'json',
        responseBody: '={{ ({ ok: true, spreadsheetId: "' + sheetId + '" }) }}',
        options: {},
      },
    },
  ];

  return {
    name: 'SYSBILT - Outbound Sheet Headers',
    nodes,
    connections: {
      'Headers Webhook': { main: [[{ node: 'Get Spreadsheet Meta', type: 'main', index: 0 }]] },
      'Get Spreadsheet Meta': { main: [[{ node: 'Build Delete Table Requests', type: 'main', index: 0 }]] },
      'Build Delete Table Requests': { main: [[{ node: 'Has Tables', type: 'main', index: 0 }]] },
      'Has Tables': {
        main: [
          [{ node: 'Delete Tables', type: 'main', index: 0 }],
          [{ node: 'Clear Sheet', type: 'main', index: 0 }],
        ],
      },
      'Delete Tables': { main: [[{ node: 'Clear Sheet', type: 'main', index: 0 }]] },
      'Clear Sheet': { main: [[{ node: 'Set Header Row', type: 'main', index: 0 }]] },
      'Set Header Row': { main: [[{ node: 'Respond OK', type: 'main', index: 0 }]] },
    },
    settings: { executionOrder: 'v1' },
  };
}

async function runWebhookSetup(path, workflow) {
  const wf = await upsertWorkflow(workflow);
  await n8n('POST', `/workflows/${wf.id}/activate`, {});
  const res = await fetch(`${N8N_BASE}/webhook/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'deploy-outbound-list-builder' }),
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
    // non-fatal
  }
  if (!res.ok) throw new Error(`Webhook ${path} failed: ${res.status} ${JSON.stringify(data)}`);
  return { data, workflowId: wf.id };
}

async function setupSheet() {
  let sheetId = process.env.OUTBOUND_LEADS_SHEET_ID;

  if (!sheetId) {
    console.log('Creating outbound leads spreadsheet...');
    const { data, workflowId } = await runWebhookSetup(
      'sysbilt-outbound-sheet-setup',
      buildSheetSetupWorkflow(),
    );
    sheetId =
      data.spreadsheetId ||
      (data.spreadsheetUrl && String(data.spreadsheetUrl).match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]);
    if (!sheetId) {
      throw new Error(`Setup webhook returned unexpected payload: ${JSON.stringify(data)}`);
    }
    saveDeployState({ OUTBOUND_SHEET_SETUP_WORKFLOW_ID: workflowId });
  } else {
    console.log(`Writing headers to existing sheet ${sheetId}...`);
    const { data } = await runWebhookSetup(
      'sysbilt-outbound-sheet-headers',
      buildHeadersOnlyWorkflow(sheetId),
    );
    if (!data.ok) throw new Error(`Header write failed: ${JSON.stringify(data)}`);
  }

  saveDeployState({ OUTBOUND_LEADS_SHEET_ID: sheetId });
  console.log(`\nSheet ready: https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
  console.log('Saved OUTBOUND_LEADS_SHEET_ID to scripts/automations/n8n/.deploy-state.env');
  console.log('\nManual step: add data validation on Status column (column K):');
  console.log(`  ${STATUS_VALUES.join(', ')}`);
  return sheetId;
}

async function deployContactScrape() {
  const sheetId = process.env.OUTBOUND_LEADS_SHEET_ID;
  if (!sheetId) {
    console.error('Missing OUTBOUND_LEADS_SHEET_ID.');
    process.exit(1);
  }
  const wf = await upsertWorkflow(buildContactScrapeWorkflow(sheetId), { activate: false });
  saveDeployState({ OUTBOUND_CONTACT_SCRAPE_WORKFLOW_ID: wf.id });
  console.log(`\nContact scrape workflow (inactive): ${N8N_BASE}/workflow/${wf.id}`);
  console.log('Run manually to fill Email / Owner Name on existing rows.');
  return wf;
}

async function deployAll() {
  await deployListBuilder();
  await deployContactScrape();
}

async function deployListBuilder({ includeTestWebhook = false } = {}) {
  const sheetId = process.env.OUTBOUND_LEADS_SHEET_ID;
  if (!sheetId) {
    console.error('Missing OUTBOUND_LEADS_SHEET_ID. Run with --setup-sheet first.');
    process.exit(1);
  }

  const serpApiKey = await fetchSerpApiKey();
  const workflow = buildListBuilderWorkflow(serpApiKey, sheetId, { includeTestWebhook });
  const wf = await upsertWorkflow(workflow, { activate: includeTestWebhook });
  saveDeployState({
    OUTBOUND_LIST_BUILDER_WORKFLOW_ID: wf.id,
    OUTBOUND_LEADS_SHEET_ID: sheetId,
  });

  console.log(`\nWorkflow A deployed (inactive): ${N8N_BASE}/workflow/${wf.id}`);
  console.log('Test: open the workflow in n8n → Execute workflow (Manual Trigger).');
  console.log(`Sheet: https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
  return wf;
}

async function runListBuilderTest() {
  const wf = await deployListBuilder({ includeTestWebhook: true });
  console.log('\nRunning list builder test webhook...');
  const res = await fetch(`${N8N_BASE}/webhook/sysbilt-outbound-list-test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ test: true }),
  });
  console.log('Webhook status', res.status);
  await new Promise((r) => setTimeout(r, 300000));
  const { data } = await n8n('GET', `/executions?workflowId=${wf.id}&limit=1`);
  const execId = data?.[0]?.id;
  const exec = await n8n('GET', `/executions/${execId}?includeData=true`);
  console.log('Execution', execId, exec.status);
  const rd = exec.data?.resultData?.runData || {};
  for (const node of [
    'SerpAPI Maps Search',
    'Map SerpAPI Results',
    'Dedup New Rows',
    'Jina Homepage',
    'Parse Homepage Contacts',
    'Append To Sheet',
  ]) {
    const items = rd[node]?.[0]?.data?.main?.[0]?.length ?? 'not run';
    const err = rd[node]?.[0]?.error?.message;
    console.log(`  ${node}:`, items, err ? `ERROR ${err}` : '');
  }
  await n8n('POST', `/workflows/${wf.id}/deactivate`, {}).catch(() => {});
  await deployListBuilder({ includeTestWebhook: false });
}

const setupOnly = process.argv.includes('--setup-sheet');
const fixSheetOnly = process.argv.includes('--fix-sheet');
const runTest = process.argv.includes('--run-test');

if (runTest) {
  runListBuilderTest().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
} else if (fixSheetOnly || setupOnly) {
  const run = async () => {
    const sheetId = process.env.OUTBOUND_LEADS_SHEET_ID;
    if (!sheetId && fixSheetOnly) {
      console.error('Missing OUTBOUND_LEADS_SHEET_ID in scripts/automations/n8n/.deploy-state.env');
      process.exit(1);
    }
    if (fixSheetOnly && sheetId) {
      console.log(`Resetting headers on sheet ${sheetId}...`);
      const { data } = await runWebhookSetup(
        'sysbilt-outbound-sheet-headers',
        buildHeadersOnlyWorkflow(sheetId),
      );
      if (!data.ok) throw new Error(`Header reset failed: ${JSON.stringify(data)}`);
      console.log(`\nSheet fixed: https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
      console.log(
        'If row 1 still shows "Column 1", "Column 2": click Table1 → Convert to range, then run --fix-sheet again.',
      );
      console.log('Re-run Workflow A in n8n to repopulate rows (Address + scraped email).');
      await deployAll();
      return;
    }
    const id = await setupSheet();
    if (id) await deployAll();
  };
  run().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
} else {
  deployAll().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
