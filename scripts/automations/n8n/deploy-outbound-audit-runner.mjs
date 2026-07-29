#!/usr/bin/env node
/**
 * Deploy SYSBILT - Outbound Audit Runner (Workflow B).
 * Clones the inbound audit chain; triggers from Google Sheet rows with Status = Audit.
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-outbound-audit-runner.mjs
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
const DEEPSEEK_CRED_ID = 'XgmuWh1nV8XX7x83';
const DEEPSEEK_CRED_NAME = 'SYSBILT DeepSeek';
const SHEET_DATA_RANGE = 'A1:N5000';

const FORMAT_AI_OUTPUT_JS = `const raw = $input.first().json || {};
const value =
  raw.message?.content ??
  raw.text ??
  raw.output ??
  raw.content?.parts?.[0]?.text ??
  raw.choices?.[0]?.message?.content ??
  '';
const text = typeof value === 'string' ? value : JSON.stringify(value);
return [{ json: { content: { parts: [{ text }] } } }];`;

const DEEPSEEK_SWAPS = [
  { name: 'Client deep research', model: 'deepseek-chat', jsonOutput: true },
  { name: 'Client brief', model: 'deepseek-chat', jsonOutput: false },
  { name: 'Master Analyst', model: 'deepseek-chat', jsonOutput: true },
];

const PICK_AUDIT_ROW_JS = `const staticData = $getWorkflowStaticData('global');
const STALE_MS = 35 * 60 * 1000;

if (staticData.auditInProgress) {
  const started = staticData.auditStartedAt || 0;
  if (Date.now() - started < STALE_MS) {
    return [];
  }
  staticData.auditInProgress = false;
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
  if (!mapsId) return false;
  if (status === 'Audit') return true;
  // Retry a stuck run (crashed before Audited) — not a manual re-trigger
  if (status === 'Auditing' && !String(row['Audit Link'] || '').trim()) return true;
  return false;
});

if (!candidates.length) return [];

staticData.auditInProgress = true;
staticData.auditStartedAt = Date.now();

return [{ json: candidates[0] }];`;

const NORMALIZE_LEAD_JS = `const row = $('Pick Audit Row').first().json;
const mapsId = String(row['Maps ID'] || '').trim();
const realEmail = String(row.Email || '').trim();
const website = String(row.Website || '').trim();
const owner = String(row['Owner Name'] || '').trim();
const business = String(row['Business Name'] || '').trim();
const suburb = String(row.Suburb || '').trim();
const placeholderEmail = realEmail || ('pending+' + mapsId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 48) + '@outbound.sysbilt.internal');

return [{
  json: {
    properties: {
      firstname: { value: owner || 'there' },
      company: { value: business },
      email: { value: placeholderEmail },
      message: {
        value: [
          'Outbound lead from sheet.',
          suburb ? 'Suburb: ' + suburb : '',
          website ? 'Website: ' + website : '',
          row.Address ? 'Address: ' + row.Address : '',
        ].filter(Boolean).join(' '),
      },
      friction_point: { value: String(row.Notes || '').trim() || 'Outbound prospect — audit requested from sheet' },
      lead_source_detail: { value: 'outbound_sheet' },
    },
    _sheetRow: row,
    _realEmail: realEmail,
    vid: mapsId,
  },
}];`;

const AGGREGATE_CHAT_JS = `const leadData = $('Filter').first().json;
return [{
  json: {
    ...leadData,
    sybil_chat_history: 'No previous chat history found (outbound lead).',
  },
  pairedItem: { item: 0 },
}];`;

const WEBSITE_TARGET_EXPR = `={{ (() => {
  const sheet = $('Filter').item.json._sheetRow || {};
  const website = String(sheet.Website || '').trim();
  if (website) {
    let u = website.replace(/^https?:\\/\\//i, '');
    return 'https://r.jina.ai/https://' + u;
  }
  const email = $('Filter').item.json.properties.email?.value || '';
  const company = $('Filter').item.json.properties.company?.value || '';
  const domain = email.split('@')[1] || '';
  const generics = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'bigpond.com', 'icloud.com', 'test.com'];
  let target = '';
  if (company.includes('.') && !company.includes(' ')) target = company;
  else if (domain && !generics.includes(domain.toLowerCase())) target = domain;
  return target ? 'https://r.jina.ai/https://' + target : 'https://r.jina.ai/https://example.com/no-scrape';
})() }}`;

const PAGESPEED_TARGET_EXPR = `={{ (() => {
  const sheet = $('Filter').item.json._sheetRow || {};
  const website = String(sheet.Website || '').trim();
  if (website) {
    let u = website.trim();
    if (!/^https?:/i.test(u)) u = 'https://' + u;
    return 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + encodeURIComponent(u) + '&strategy=mobile&category=performance&category=seo';
  }
  const email = $('Filter').item.json.properties.email?.value || '';
  const company = $('Filter').item.json.properties.company?.value || '';
  const domain = email.split('@')[1] || '';
  const generics = ['gmail.com','hotmail.com','yahoo.com','outlook.com','bigpond.com','icloud.com','test.com'];
  let target = '';
  if (company.includes('.') && !company.includes(' ')) target = company.startsWith('http') ? company : 'https://' + company;
  else if (domain && !generics.includes(domain.toLowerCase())) target = 'https://' + domain;
  if (!target) return 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + encodeURIComponent('https://example.com') + '&strategy=mobile';
  return 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + encodeURIComponent(target) + '&strategy=mobile&category=performance&category=seo';
})() }}`;

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
    sheetName: { __rl: true, value: 'Master Leads', mode: 'name', cachedResultName: 'Master Leads' },
  };
}

function removeNodes(wf, names) {
  const drop = new Set(names);
  wf.nodes = wf.nodes.filter((n) => !drop.has(n.name));
  for (const [source, conn] of Object.entries(wf.connections)) {
    if (drop.has(source)) {
      delete wf.connections[source];
      continue;
    }
    if (!conn.main) continue;
    conn.main = conn.main.map((branch) =>
      (branch || []).filter((edge) => !drop.has(edge.node)),
    );
  }
}

function setConnection(wf, from, to, branchIndex = 0) {
  if (!wf.connections[from]) wf.connections[from] = { main: [] };
  while (wf.connections[from].main.length <= branchIndex) {
    wf.connections[from].main.push([]);
  }
  wf.connections[from].main[branchIndex] = [{ node: to, type: 'main', index: 0 }];
}

function findNode(wf, name) {
  return wf.nodes.find((n) => n.name === name);
}

function patchMapsLookup(wf, serpApiKey) {
  const node = findNode(wf, 'Maps Lookup');
  if (!node) return;
  node.parameters.url = `={{(() => {
  const mapsId = $('Filter').item.json._sheetRow?.['Maps ID'] || '';
  if (mapsId) {
    return 'https://serpapi.com/search.json?engine=google_maps&type=search&data_id=' + encodeURIComponent(mapsId) + '&hl=en&gl=au&api_key=${serpApiKey}';
  }
  const company = $('Filter').item.json.properties.company?.value || '';
  let city = 'Australia';
  try { city = JSON.parse($('Client deep research').item.json.content.parts[0].text).inferred_city || 'Australia'; } catch (e) {}
  const q = encodeURIComponent((company + ' ' + city).trim());
  return 'https://serpapi.com/search.json?engine=google_maps&type=search&q=' + q + '&hl=en&gl=au&api_key=${serpApiKey}';
})()}}`;
}

function patchVercelPush(wf) {
  const node = findNode(wf, 'Vercel Push');
  if (!node) return;
  node.parameters.jsonBody = '={{ JSON.stringify($json) }}';
}

const PARSE_AUDIT_JSON_JS = readFileSync(
  resolve(__dirname, 'parse-audit-json-code.js'),
  'utf8',
);

function patchParseAuditJsonNode(wf) {
  let node = wf.nodes.find((n) => n.name === 'Parse Audit JSON');
  const masterFmt = findNode(wf, 'Master Analyst');
  if (!masterFmt) return;

  if (!node) {
    node = {
      id: uid(),
      name: 'Parse Audit JSON',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [masterFmt.position[0] + 160, masterFmt.position[1]],
      parameters: { mode: 'runOnceForAllItems', jsCode: PARSE_AUDIT_JSON_JS },
    };
    wf.nodes.push(node);
  } else {
    node.parameters = { mode: 'runOnceForAllItems', jsCode: PARSE_AUDIT_JSON_JS };
  }

  wf.connections['Master Analyst'] = {
    main: [[{ node: 'Parse Audit JSON', type: 'main', index: 0 }]],
  };
  wf.connections['Parse Audit JSON'] = {
    main: [[{ node: 'Vercel Push', type: 'main', index: 0 }]],
  };
}

const MASTER_ANALYST_JSON_RULE =
  '\\n\\nJSON SYNTAX (mandatory): Return ONLY one valid JSON object. Every key must use a colon: \\"key\\": \\"value\\". Never write \\"key \\"value. No markdown fences.';

const MASTER_ANALYST_GBP_CLAIM_RULE = `

GOOGLE BUSINESS PROFILE CLAIM RULE v2 (critical, non-negotiable):

Claim status is OUT OF SCOPE for this audit by default. Do not diagnose, metric, SWOT, or action-plan anything about claiming, verifying, or an "unclaimed" Google listing / Google Business Profile / knowledge panel.

SerpAPI knowledge_graph.unclaimed_listing is a KNOWN FALSE POSITIVE. It often returns true on fully managed profiles that already have photos, services, posts, review replies, booking links, and social profiles. IGNORE that field completely. Treat it as if it does not exist. The same applies to public "Own this business?" CTAs.

Photos, services, posts, reviews, updates, booking links, or social profiles on the listing are signs of an active profile, not an unclaimed one.

For the metric "Knowledge panel presence": if a panel exists, value like "Present" or "Present with X stars, Y reviews". Never write "Present but unclaimed" or mention claim status.

Only mention claim status if an operator note in the sheet inputs explicitly says the listing is unclaimed. SerpAPI fields alone never qualify.

BOOKING AND UNDETECTED TOOLS (reinforce):

A website "Book Now" button that opens a form, phone link, or contact page is NOT proof that online booking is missing. If Detected tools marks booking false or could_not_verify, you may note that a live booking widget could not be confirmed in this pass. You must NOT title a diagnosis "No online booking available", and you must NOT treat an undetected booking widget as a proven absence.

REVIEW NUMBER CONSISTENCY RULE v1 (critical, non-negotiable):

Before you write any diagnosis, SWOT weakness, opportunity, metric value, or reviews context about review volume, compare the subject's Google review count to every competitor review count you cite.

- If the subject has more reviews than the competitors you mention, you must NOT say "only X reviews", "low review count", "low volume vs competitors", or "competitors with more reviews".
- If they have the most reviews in the set and still rank worse in the local pack, that is the finding: volume is not the lever. Say they have the strongest review count in this pack and still sit behind on pack position, so proximity, categories, photos, posts, and profile activity matter more than raw volume.
- Numbers in the primary finding, SWOT, and reviews section must agree with each other. Do not invent a volume weakness the numbers contradict.

PAGE HEALTH VALUE RULE v1 (critical, non-negotiable):

For appendix.page_health values (meta_description, schema_markup, cookie_compliance, alt_text_rate, heading_hierarchy), use exactly one state:

- "Present" or a short present detail when the HTML / PageSpeed input confirms it.
- "Missing" only when the HTML / PageSpeed input confirms absence.
- "Could not verify" when that check has no usable input (no PageSpeed data, blocked HTML, field not returned).

Never write "Missing" when you mean "Could not verify". Never pair those two meanings in the same field.
`;

function stripOldGbpClaimRule(content) {
  // Remove prior accuracy blocks so redeploys replace instead of stacking.
  return content
    .replace(
      /\n*GOOGLE BUSINESS PROFILE CLAIM RULE(?: v2)? \(critical, non-negotiable\):[\s\S]*?(?=\n(?:CRITICAL OUTPUT RULES:|JSON SYNTAX \(mandatory\):|REVIEW NUMBER CONSISTENCY RULE|PAGE HEALTH VALUE RULE)|$)/g,
      '\n\n',
    )
    .replace(
      /\n*REVIEW NUMBER CONSISTENCY RULE(?: v1)? \(critical, non-negotiable\):[\s\S]*?(?=\n(?:CRITICAL OUTPUT RULES:|JSON SYNTAX \(mandatory\):|PAGE HEALTH VALUE RULE|GOOGLE BUSINESS PROFILE CLAIM RULE)|$)/g,
      '\n\n',
    )
    .replace(
      /\n*PAGE HEALTH VALUE RULE(?: v1)? \(critical, non-negotiable\):[\s\S]*?(?=\n(?:CRITICAL OUTPUT RULES:|JSON SYNTAX \(mandatory\):|GOOGLE BUSINESS PROFILE CLAIM RULE|REVIEW NUMBER CONSISTENCY RULE)|$)/g,
      '\n\n',
    );
}

const MASTER_ANALYST_SENTIMENT_RULE =
  '- For sentiment: do NOT classify from review text snippets. Prefer whole-number percentages that sum to 100 from a Google Maps star histogram / rating_summary when present (4 and 5 stars = positive, 3 = neutral, 1 and 2 = negative). If no histogram is available, set positive, neutral and negative all to 0. A downstream step overwrites sentiment from Maps stars when available. Use Customer reviews text only for recent_theme and warm context, not for the sentiment percentages.';

function patchSentimentAndReviewSample(content) {
  let next = content;
  const sentimentRe =
    /- For sentiment:[\s\S]*?(?=\n\n- For review_sources|\n\n### |\n\nCRITICAL OUTPUT RULES:|$)/;
  if (sentimentRe.test(next)) {
    next = next.replace(sentimentRe, `${MASTER_ANALYST_SENTIMENT_RULE}\n\n`);
  } else if (!next.includes('do NOT classify from review text snippets')) {
    const themeAnchor = '- For review_sources, the Google recent_theme';
    if (next.includes(themeAnchor)) {
      next = next.replace(themeAnchor, `${MASTER_ANALYST_SENTIMENT_RULE}\n\n${themeAnchor}`);
    }
  }
  next = next.replace(/\.slice\(0,\s*12\)/g, '.slice(0, 20)');
  return next;
}

function patchMasterAnalystPrompt(wf) {
  const node = wf.nodes.find((n) => n.name === 'DS Master Analyst');
  if (!node?.parameters?.messages?.values?.[0]) return;
  let content = node.parameters.messages.values[0].content || '';
  if (!content.includes('JSON SYNTAX (mandatory)')) {
    content += MASTER_ANALYST_JSON_RULE;
  }
  content = stripOldGbpClaimRule(content);
  content = patchSentimentAndReviewSample(content);
  const anchor = 'CRITICAL OUTPUT RULES:';
  if (content.includes(anchor)) {
    content = content.replace(anchor, `${MASTER_ANALYST_GBP_CLAIM_RULE.trim()}\n\n\n${anchor}`);
  } else {
    content = `${content.trimEnd()}\n\n${MASTER_ANALYST_GBP_CLAIM_RULE}`;
  }
  node.parameters.messages.values[0].content = content;
}


function patchGmailDraft(wf) {
  const node = findNode(wf, 'Gmail Draft to prospect');
  if (!node) return;
  // Template A: gift the audit only. One link. Offer lives inside the audit page.
  node.parameters.subject =
    "={{ (() => { const f = $('Filter').item.json; const company = f.properties?.company?.value || f._sheetRow?.['Business Name'] || 'your business'; return 'The audit we ran on ' + company; })() }}";
  node.parameters.emailType = 'html';
  node.parameters.message = `={{ (() => {
  const f = $('Filter').item.json;
  const sheet = f._sheetRow || {};
  const company = String(f.properties?.company?.value || sheet['Business Name'] || 'your business').trim();
  const ownerRaw = String(f.properties?.firstname?.value || sheet['Owner Name'] || '').trim();
  let firstName = '';
  const firstPart = ownerRaw.split(/\\s+/)[0].replace(/[^a-zA-Z'-]/g, '');
  if (firstPart.length >= 2) firstName = firstPart;
  const greeting = firstName ? ('Hi ' + firstName + ',') : 'Hi,';
  const auditUrl = String($('Vercel Push').item.json.url || '').trim();
  const diagnosis = (() => {
    try {
      const parsed = $('Parse Audit JSON').item.json || {};
      const title = String(parsed?.audit_data?.diagnosis?.critical?.title || '').trim();
      if (title) return title;
    } catch (_) {}
    const score = String(sheet['LH Mobile'] || '').trim();
    if (score) return 'the site scored ' + score + ' on Google\\'s mobile speed test';
    return '';
  })();
  const standout = diagnosis
    ? diagnosis.replace(/[.!]+$/g, '')
    : 'the site is costing you enquiries before people ever speak to you';
  const esc = (s) => String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return [
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#222">',
    '<p style="margin:0 0 14px">' + esc(greeting) + '</p>',
    '<p style="margin:0 0 14px">We ran an outside audit on ' + esc(company) + ': the website, how you show up in search, and your reviews. It\\'s ready, and it\\'s yours. No charge and nothing expected back.</p>',
    '<p style="margin:0 0 14px">Most firms run something like this and charge for it before they\\'ll quote any work. We can hand it over because our systems had already done the pass.</p>',
    '<p style="margin:0 0 14px"><a href="' + esc(auditUrl) + '" style="color:#1a73e8;text-decoration:underline">Open the audit</a></p>',
    '<p style="margin:0 0 14px">The one that stood out: ' + esc(standout) + '.</p>',
    '<p style="margin:0 0 14px">Worth a look while it\\'s in front of you. If anything in there doesn\\'t make sense, reply and we\\'ll explain it properly.</p>',
    '<p style="margin:0 0 14px">Felipe<br><a href="https://sysbilt.com" style="color:#1a73e8;text-decoration:underline">SYSBILT</a>, Sydney<br>Websites and business systems for growing Australian businesses</p>',
    '<p style="margin:0;color:#666;font-size:12px;line-height:1.4">If you\\'d rather not hear from us again, reply &quot;no thanks&quot; and that\\'s the end of it.</p>',
    '</div>',
  ].join('');
})() }}`;
}

function patchIfAlwaysAudit(wf) {
  const node = findNode(wf, 'If');
  if (!node) return;
  node.parameters.conditions.conditions = [
    {
      id: uid(),
      leftValue: '={{ 10 }}',
      rightValue: 5,
      operator: { type: 'number', operation: 'gte' },
    },
  ];
}

function findDownstream(connections, nodeName) {
  const targets = [];
  for (const [from, conn] of Object.entries(connections)) {
    if (from !== nodeName) continue;
    for (const branch of conn.main || []) {
      for (const edge of branch || []) targets.push(edge.node);
    }
  }
  return targets;
}

function retargetIncoming(connections, fromName, toName) {
  for (const conn of Object.values(connections)) {
    for (const branch of conn.main || []) {
      for (const edge of branch || []) {
        if (edge.node === fromName) edge.node = toName;
      }
    }
  }
}

function geminiToDeepSeek(node, { model, jsonOutput }) {
  const prompt = node.parameters?.messages?.values?.[0]?.content || '';
  return {
    ...node,
    type: '@n8n/n8n-nodes-langchain.openAi',
    typeVersion: 1.1,
    retryOnFail: true,
    maxTries: 3,
    waitBetweenTries: 8000,
    credentials: {
      openAiApi: { id: DEEPSEEK_CRED_ID, name: DEEPSEEK_CRED_NAME },
    },
    parameters: {
      modelId: {
        __rl: true,
        value: model,
        mode: 'id',
        cachedResultName: model,
      },
      messages: { values: [{ content: prompt }] },
      ...(jsonOutput ? { jsonOutput: true } : {}),
      options: {},
    },
  };
}

function deepSeekPromptLength(node) {
  const values = node?.parameters?.messages?.values;
  if (!Array.isArray(values) || !values[0]) return 0;
  return String(values[0].content || '').length;
}

/** Drop duplicate DS * nodes left by re-running the Gemini→DeepSeek swap. Keep the longest prompt. */
function dedupeDeepSeekNodes(wf) {
  const groups = new Map();
  for (const n of wf.nodes) {
    if (!n.name?.startsWith('DS ')) continue;
    if (n.type !== '@n8n/n8n-nodes-langchain.openAi') continue;
    const list = groups.get(n.name) || [];
    list.push(n);
    groups.set(n.name, list);
  }
  const drop = new Set();
  for (const list of groups.values()) {
    if (list.length < 2) continue;
    list.sort((a, b) => deepSeekPromptLength(b) - deepSeekPromptLength(a));
    for (const loser of list.slice(1)) drop.add(loser.id);
  }
  if (drop.size) {
    wf.nodes = wf.nodes.filter((n) => !drop.has(n.id));
  }
}

function applyDeepSeekSwap(wf) {
  // Inbound may already contain DS * nodes from a prior conversion. Never swap a format Code
  // node named "Master Analyst" into a second empty DS node.
  dedupeDeepSeekNodes(wf);

  for (const swap of DEEPSEEK_SWAPS) {
    const llmName = `DS ${swap.name}`;
    const existingDs = wf.nodes.filter(
      (n) => n.name === llmName && n.type === '@n8n/n8n-nodes-langchain.openAi',
    );
    if (existingDs.length) {
      existingDs.sort((a, b) => deepSeekPromptLength(b) - deepSeekPromptLength(a));
      const keep = existingDs[0];
      if (deepSeekPromptLength(keep) < 200) {
        console.warn(`Warning: ${llmName} prompt looks empty (${deepSeekPromptLength(keep)} chars)`);
      }
      for (const extra of existingDs.slice(1)) {
        wf.nodes = wf.nodes.filter((n) => n.id !== extra.id);
      }
      continue;
    }

    const idx = wf.nodes.findIndex((n) => n.name === swap.name);
    if (idx === -1) continue;
    // Only swap real LLM nodes (Gemini / OpenAI), never the format Code node.
    if (wf.nodes[idx].type === 'n8n-nodes-base.code') continue;
    if (wf.nodes[idx].type === '@n8n/n8n-nodes-langchain.openAi' && wf.nodes[idx].name.startsWith('DS ')) {
      continue;
    }

    const geminiNode = wf.nodes[idx];
    const downstream = findDownstream(wf.connections, swap.name);
    if (downstream.length !== 1) continue;

    const nextNode = downstream[0];
    const llmNode = geminiToDeepSeek({ ...geminiNode, name: llmName, id: uid() }, swap);
    const formatNode = {
      id: uid(),
      name: swap.name,
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [geminiNode.position[0] + 140, geminiNode.position[1]],
      parameters: { mode: 'runOnceForAllItems', jsCode: FORMAT_AI_OUTPUT_JS },
    };

    llmNode.position = [geminiNode.position[0] - 140, geminiNode.position[1]];
    wf.nodes[idx] = llmNode;
    wf.nodes.push(formatNode);

    retargetIncoming(wf.connections, swap.name, llmName);
    delete wf.connections[swap.name];
    wf.connections[llmName] = { main: [[{ node: swap.name, type: 'main', index: 0 }]] };
    wf.connections[swap.name] = { main: [[{ node: nextNode, type: 'main', index: 0 }]] };
  }

  dedupeDeepSeekNodes(wf);
  patchMasterAnalystPrompt(wf);

  const vercel = findNode(wf, 'Vercel Push');
  if (vercel) vercel.parameters.jsonBody = '={{ JSON.stringify($json) }}';
}

function buildOutboundWorkflow(inbound, sheetId, serpApiKey) {
  const wf = JSON.parse(JSON.stringify(inbound));
  wf.name = 'SYSBILT - Outbound Audit Runner';
  delete wf.id;
  delete wf.active;
  delete wf.createdAt;
  delete wf.updatedAt;
  delete wf.versionId;
  delete wf.meta;
  delete wf.pinData;
  delete wf.tags;

  removeNodes(wf, [
    'Get many contacts',
    'Code in JavaScript',
    'Filter',
    'CLIENT EMAIL - Confirmation',
    'HTTP Request1',
    'Get Sybil Chat History',
  ]);

  const schedule = findNode(wf, 'Schedule Trigger');
  if (schedule) {
    schedule.parameters = {
      rule: { interval: [{ field: 'minutes', minutesInterval: 5 }] },
    };
    schedule.position = [-1200, 0];
  }

  const readId = uid();
  const pickId = uid();
  const markId = uid();
  const filterId = uid();

  wf.nodes.push(
    {
      id: readId,
      name: 'Read Outbound Sheet',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-960, 0],
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
      id: pickId,
      name: 'Pick Audit Row',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-720, 0],
      parameters: { mode: 'runOnceForAllItems', jsCode: PICK_AUDIT_ROW_JS },
    },
    {
      id: markId,
      name: 'Mark Status Auditing',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [-480, 0],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'appendOrUpdate',
        ...sheetRef(sheetId),
        columns: {
          mappingMode: 'defineBelow',
          value: {
            'Maps ID': "={{ $json['Maps ID'] }}",
            Status: 'Auditing',
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
      id: filterId,
      name: 'Filter',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-240, 0],
      parameters: { mode: 'runOnceForAllItems', jsCode: NORMALIZE_LEAD_JS },
    },
    {
      id: uid(),
      name: 'Update Sheet Audited',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [1680, 0],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'appendOrUpdate',
        ...sheetRef(sheetId),
        columns: {
          mappingMode: 'defineBelow',
          value: {
            'Maps ID': "={{ $('Filter').item.json._sheetRow['Maps ID'] }}",
            Status: 'Audited',
            'Audit Link': "={{ $('Vercel Push').item.json.url }}",
          },
          matchingColumns: ['Maps ID'],
          schema: headerSchema(),
          attemptToConvertTypes: false,
          convertFieldsToString: false,
        },
        options: { useAppend: false },
      },
    },
  );

  const aggregate = findNode(wf, 'Aggregate Chat');
  if (aggregate) {
    aggregate.parameters.jsCode = AGGREGATE_CHAT_JS;
    aggregate.position = [0, 0];
  }

  const httpReq = findNode(wf, 'HTTP Request');
  if (httpReq) httpReq.parameters.url = WEBSITE_TARGET_EXPR;
  const rawHtml = findNode(wf, 'Raw HTML Fetch');
  if (rawHtml) rawHtml.parameters.url = WEBSITE_TARGET_EXPR;
  const pageSpeed = findNode(wf, 'PageSpeed');
  if (pageSpeed) pageSpeed.parameters.url = PAGESPEED_TARGET_EXPR;

  patchMapsLookup(wf, serpApiKey);
  patchVercelPush(wf);
  patchParseAuditJsonNode(wf);
  patchMasterAnalystPrompt(wf);
  patchGmailDraft(wf);
  patchIfAlwaysAudit(wf);

  const notify = findNode(wf, 'Send a message');
  if (notify) {
    notify.parameters.subject =
      '=Outbound audit ready: {{ $(\'Filter\').item.json.properties.company?.value || $(\'Filter\').item.json.properties.firstname.value }}';
    notify.parameters.message = `=Outbound deep audit generated.<br><br>
Company: {{ $('Filter').item.json.properties.company?.value || 'Unknown' }}<br>
Contact: {{ $('Filter').item.json.properties.firstname.value }} &lt;{{ $('Filter').item.json._realEmail || $('Filter').item.json.properties.email.value }}&gt;<br><br>
Audit link (live 90 days): {{ $('Vercel Push').item.json.url }}<br><br>
Gmail draft is in your Drafts folder — add the recipient before sending.`;
  }

  setConnection(wf, 'Schedule Trigger', 'Read Outbound Sheet');
  setConnection(wf, 'Read Outbound Sheet', 'Pick Audit Row');
  setConnection(wf, 'Pick Audit Row', 'Mark Status Auditing');
  setConnection(wf, 'Mark Status Auditing', 'Filter');
  setConnection(wf, 'Filter', 'Aggregate Chat');
  setConnection(wf, 'Vercel Push', 'Update Sheet Audited');
  setConnection(wf, 'Update Sheet Audited', 'Send a message');

  applyDeepSeekSwap(wf);

  return {
    name: wf.name,
    nodes: wf.nodes,
    connections: wf.connections,
    settings: { executionOrder: 'v1' },
  };
}

async function fetchSerpApiKey(inbound) {
  const maps = inbound.nodes?.find((n) => n.name === 'Maps Lookup');
  const url = maps?.parameters?.url || '';
  const m = String(url).match(/api_key=([a-f0-9]+)/i);
  if (!m) throw new Error('Could not extract SerpAPI key from inbound Maps Lookup node');
  return m[1];
}

async function fetchAuditServiceKeys(inbound) {
  const serpApiKey = await fetchSerpApiKey(inbound);
  const rawUrl = inbound.nodes?.find((n) => n.name === 'Raw HTML Fetch')?.parameters?.url || '';
  const pageSpeedUrl = inbound.nodes?.find((n) => n.name === 'PageSpeed')?.parameters?.url || '';
  const scrapingBeeKey = String(rawUrl).match(/api_key=([^&']+)/)?.[1];
  const pageSpeedKey = String(pageSpeedUrl).match(/key=([^&']+)/)?.[1];
  if (!scrapingBeeKey) throw new Error('Could not extract ScrapingBee key from inbound Raw HTML Fetch node');
  if (!pageSpeedKey) throw new Error('Could not extract PageSpeed key from inbound PageSpeed node');
  return { serpApiKey, scrapingBeeKey, pageSpeedKey };
}

function patchOutboundResearchInputs(workflow, { serpApiKey, scrapingBeeKey, pageSpeedKey }) {
  const node = (name) => workflow.nodes.find((n) => n.name === name);
  const googleSearch = node('Google search');
  if (googleSearch) {
    googleSearch.parameters.q = `={{ (() => {
  const f = $('Filter').item.json;
  const s = f._sheetRow || {};
  return [s['Business Name'] || f.properties.company?.value || '', s.Suburb || '', s.Address || ''].filter(Boolean).join(' ');
})() }}`;
    googleSearch.parameters.location = 'Sydney, New South Wales, Australia';
  }

  const socialSearch = node('Google search - social');
  if (socialSearch) {
    socialSearch.parameters.q = `={{ (() => {
  const f = $('Filter').item.json;
  const s = f._sheetRow || {};
  return [s['Business Name'] || f.properties.company?.value || '', s.Suburb || '', 'LinkedIn OR Facebook OR reviews'].filter(Boolean).join(' ');
})() }}`;
    socialSearch.parameters.location = 'Sydney, New South Wales, Australia';
  }

  const maps = node('Maps Lookup');
  if (maps) {
    maps.parameters.url = `={{ (() => {
  const f = $('Filter').item.json;
  const s = f._sheetRow || {};
  const q = encodeURIComponent([s['Business Name'] || f.properties.company?.value || '', s.Suburb || '', s.Address || ''].filter(Boolean).join(' '));
  return 'https://serpapi.com/search.json?engine=google_maps&type=search&q=' + q + '&hl=en&gl=au&api_key=${serpApiKey}';
})() }}`;
  }

  const reviews = node('Reviews Fetch');
  if (reviews) {
    reviews.parameters.url = `={{ (() => {
  const j = $('Maps Lookup').item.json;
  const dataId = j.place_results?.data_id || (Array.isArray(j.local_results) && j.local_results[0]?.data_id) || '';
  if (!dataId) return 'https://serpapi.com/search.json?engine=google_maps_reviews&data_id=none&api_key=${serpApiKey}';
  return 'https://serpapi.com/search.json?engine=google_maps_reviews&data_id=' + encodeURIComponent(dataId) + '&hl=en&api_key=${serpApiKey}';
})() }}`;
  }

  const rawHtml = node('Raw HTML Fetch');
  if (rawHtml) {
    rawHtml.parameters.url = `={{ (() => {
  const s = $('Filter').item.json._sheetRow || {};
  let site = String(s.Website || '').trim();
  if (!site) site = 'https://example.com';
  if (!/^https?:/i.test(site)) site = 'https://' + site;
  return 'https://app.scrapingbee.com/api/v1/?api_key=${scrapingBeeKey}&url=' + encodeURIComponent(site);
})() }}`;
  }

  const pageSpeed = node('PageSpeed');
  if (pageSpeed) {
    pageSpeed.parameters.url = `={{ (() => {
  const s = $('Filter').item.json._sheetRow || {};
  let site = String(s.Website || '').trim();
  if (!site) site = 'https://example.com';
  if (!/^https?:/i.test(site)) site = 'https://' + site;
  return 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + encodeURIComponent(site) + '&key=${pageSpeedKey}&strategy=mobile&category=SEO&category=ACCESSIBILITY&category=PERFORMANCE&category=BEST_PRACTICES';
})() }}`;
    pageSpeed.parameters.options = { timeout: 70000 };
  }
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

  const inbound = await n8n('GET', `/workflows/${INBOUND_AUDIT_WORKFLOW_ID}`);
  const auditKeys = await fetchAuditServiceKeys(inbound);
  const workflow = buildOutboundWorkflow(inbound, sheetId, auditKeys.serpApiKey);
  patchOutboundResearchInputs(workflow, auditKeys);
  const wf = await upsertWorkflow(workflow);

  saveDeployState({ OUTBOUND_AUDIT_RUNNER_WORKFLOW_ID: wf.id });

  console.log(`\nWorkflow B deployed (inactive): ${N8N_BASE}/workflow/${wf.id}`);
  console.log(`Sheet: https://docs.google.com/spreadsheets/d/${sheetId}/edit`);
  console.log('\nHow to test:');
  console.log('  1. Set one row Status to Audit in the sheet');
  console.log('  2. Activate this workflow in n8n (or wait for the 5-minute schedule)');
  console.log('  3. Status should move Auditing → Audited; Audit Link column fills; Gmail draft created');
  console.log('  4. Deactivate when not actively auditing outbound leads');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
