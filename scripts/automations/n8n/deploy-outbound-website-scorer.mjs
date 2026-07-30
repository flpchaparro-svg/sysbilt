#!/usr/bin/env node
/**
 * Deploy SYSBILT - Outbound Website Scorer.
 *
 * Runs after Speed Fix has scored Master Leads (LH Mobile filled).
 * PageSpeed mobile: PERFORMANCE + SEO + ACCESSIBILITY + BEST_PRACTICES.
 * If the site looks like a Website offer (not speed-only), appends **Website** tab.
 *
 * Status always lands as Wait (you flip Ready). Route is set by score rules.
 *
 * Usage:
 *   node scripts/automations/n8n/deploy-outbound-website-scorer.mjs
 *   node scripts/automations/n8n/deploy-outbound-website-scorer.mjs --activate
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '../../..')
const INBOUND_AUDIT_WORKFLOW_ID = 'TvkvfhrMWWHAEQFd'
const GOOGLE_SHEETS_CRED_ID = 'W8jOFatMKmraYw0F'
const GOOGLE_SHEETS_CRED_NAME = 'Google Sheets account'
const GMAIL_CRED_ID = 'pR8GnMBXmukPyA2V'
const GMAIL_CRED_NAME = 'Gmail account'
const NOTIFY_EMAIL = 'felipe@sysbilt.com'

const SHEET_ID_DEFAULT = '1aGz6kruGwSpt55rwlcknxVDXp9dgL_M-OnVJrDIbTlE'
const LEADS_SHEET = 'Master Leads'
const WEBSITE_SHEET = 'Website'
const SPEED_FIX_SHEET = 'Speed Fix'
const GP_SHEET = 'Google Profile'
const MC_SHEET = 'Missed-Call'
const SV_SHEET = 'Search Visibility'
const LP_SHEET = 'Landing Page'
const CRM_SHEET = 'CRM Rescue'

const LEADS_RANGE = 'A1:R5000'
const WEBSITE_RANGE = 'A1:N5000'
const PRODUCT_RANGE = 'A1:K5000'

const QUALITY_MAX = 55
const PERF_SPEED = 65
const AUDIT_ALL = 45

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

async function fetchPageSpeedKey() {
  const inbound = await n8n('GET', `/workflows/${INBOUND_AUDIT_WORKFLOW_ID}`)
  const pageSpeedUrl = inbound.nodes?.find((n) => n.name === 'PageSpeed')?.parameters?.url || ''
  const pageSpeedKey = String(pageSpeedUrl).match(/key=([^&']+)/)?.[1]
  if (!pageSpeedKey) {
    throw new Error('Could not extract PageSpeed key from inbound PageSpeed node')
  }
  return pageSpeedKey
}

const PICK_JS = `const staticData = $getWorkflowStaticData('global');
const STALE_MS = 8 * 60 * 1000;
const now = Date.now();

if (staticData.quotaCooldownUntil && now < staticData.quotaCooldownUntil) return [];

if (staticData.webInProgress) {
  const started = staticData.webStartedAt || 0;
  if (now - started < STALE_MS) return [];
  staticData.webInProgress = false;
}

const leads = $('Read Leads Sheet').all()
  .map((i) => i.json)
  .filter((r) => {
    const name = String(r['Business Name'] || '').trim();
    return name && name !== 'Business Name';
  });

const onWebsite = new Set(
  $('Read Website Tab').all()
    .map((i) => i.json)
    .filter((r) => String(r['Business Name'] || '').trim() && r['Business Name'] !== 'Business Name')
    .map((r) => String(r['Maps ID'] || '').trim())
    .filter(Boolean),
);

const candidates = leads.filter((row) => {
  const website = String(row.Website || '').trim();
  const mapsId = String(row['Maps ID'] || '').trim();
  const lh = String(row['LH Mobile'] || '').trim();
  const status = String(row.Status || '').trim();
  if (!website || !mapsId) return false;
  if (['Auditing', 'Dead'].includes(status)) return false;
  if (onWebsite.has(mapsId)) return false;
  // Wait for Speed Fix scorer first (LH Mobile filled with a real score).
  if (!lh || lh === 'err' || Number.isNaN(Number(lh))) return false;
  return true;
});

if (!candidates.length) return [];

staticData.webInProgress = true;
staticData.webStartedAt = now;
return [{ json: candidates[0] }];`

const EXTRACT_JS = `const staticData = $getWorkflowStaticData('global');
const row = $('Pick Website Row').first().json;
const ps = $input.first().json;
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

function catScore(cats, key) {
  const n = cats?.[key]?.score;
  if (typeof n !== 'number') return 'err';
  return Math.round(n * 100);
}

const msg = String(ps.error?.message || ps.message || '').toLowerCase();
const quota =
  ps.error?.code === 429 ||
  msg.includes('quota') ||
  msg.includes('rate limit') ||
  msg.includes('resourcestateexhaust');

if (quota) {
  staticData.quotaCooldownUntil = Date.now() + COOLDOWN_MS;
  staticData.quotaStreak = (staticData.quotaStreak || 0) + 1;
  const alert = staticData.quotaStreak >= 2;
  return [{
    json: {
      ...row,
      _quotaHit: true,
      _alert: alert,
      _quotaStreak: staticData.quotaStreak,
      _cooldownUntil: new Date(staticData.quotaCooldownUntil).toISOString(),
      _quotaReason: ps.error?.message || ps.message || 'quota',
      _qualifies: false,
    },
  }];
}

staticData.quotaStreak = 0;

const cats = ps.lighthouseResult?.categories || {};
const perf = catScore(cats, 'performance');
const seo = catScore(cats, 'seo');
const a11y = catScore(cats, 'accessibility');
const bp = catScore(cats, 'best-practices');

const nums = [perf, seo, a11y, bp].map((x) => (x === 'err' ? null : Number(x)));
const [perfN, seoN, a11yN, bpN] = nums;

let route = '';
let qualifies = false;
let note = '';

if (nums.every((n) => n === null)) {
  qualifies = false;
  note = 'pagespeed_err';
} else {
  const qualityBad =
    (seoN !== null && seoN < ${QUALITY_MAX}) ||
    (a11yN !== null && a11yN < ${QUALITY_MAX}) ||
    (bpN !== null && bpN < ${QUALITY_MAX});
  const speedOnly =
    perfN !== null &&
    perfN < ${PERF_SPEED} &&
    !qualityBad &&
    (seoN === null || seoN >= ${QUALITY_MAX}) &&
    (a11yN === null || a11yN >= ${QUALITY_MAX}) &&
    (bpN === null || bpN >= ${QUALITY_MAX});

  const allLow = nums.every((n) => n !== null && n < ${AUDIT_ALL});

  if (speedOnly) {
    qualifies = false;
    note = 'speed_only_skip';
  } else if (allLow) {
    qualifies = true;
    route = 'audit_then_website';
    note = 'all_lh_low';
  } else if (qualityBad && perfN !== null && perfN < ${PERF_SPEED}) {
    qualifies = true;
    route = 'website_plus_speed';
    note = 'quality+slow';
  } else if (qualityBad) {
    qualifies = true;
    route = 'website_only';
    note = 'quality_low';
  } else {
    qualifies = false;
    note = 'scores_ok';
  }
}

return [{
  json: {
    ...row,
    'LH Perf': perf,
    'LH SEO': seo,
    'LH A11y': a11y,
    'LH BP': bp,
    Route: route,
    _qualifies: qualifies,
    _note: note,
    _quotaHit: false,
    _alert: false,
  },
}];`

const BUILD_JS = `const lead = $('Extract Scores').first().json;
if (!lead._qualifies) {
  return [{ json: { _skipAppend: true, reason: lead._note || 'no_qualify' } }];
}

const mapsId = String(lead['Maps ID'] || '').trim();

function rowsFrom(nodeName) {
  try {
    return $(nodeName).all()
      .map((i) => i.json)
      .filter((r) => String(r['Business Name'] || '').trim() && r['Business Name'] !== 'Business Name');
  } catch {
    return [];
  }
}

const webRows = rowsFrom('Read Website Tab2');
if (webRows.some((r) => String(r['Maps ID'] || '').trim() === mapsId)) {
  return [{ json: { _skipAppend: true, reason: 'already_on_website', mapsId } }];
}

const sfRows = rowsFrom('Read Speed Fix Tab');
const same = sfRows.filter((r) => String(r['Maps ID'] || '').trim() === mapsId);
if (same.some((r) => String(r.Status || '').trim() === 'Replied')) {
  return [{ json: { _skipAppend: true, reason: 'replied_elsewhere', mapsId } }];
}

const busy = same.some((r) => ['Ready', 'Emailed'].includes(String(r.Status || '').trim()));
const status = 'Wait';

return [{
  json: {
    'Business Name': lead['Business Name'] || '',
    Suburb: lead.Suburb || '',
    Website: lead.Website || '',
    Email: lead.Email || '',
    Phone: lead.Phone || '',
    'LH Perf': lead['LH Perf'] ?? '',
    'LH SEO': lead['LH SEO'] ?? '',
    'LH A11y': lead['LH A11y'] ?? '',
    'LH BP': lead['LH BP'] ?? '',
    Route: lead.Route || 'website_only',
    Status: status,
    'Maps ID': mapsId,
    'Audit Link': String(lead['Audit Link'] || '').trim(),
    Notes: (busy ? 'wait:speed-fix-live | ' : '') + (lead._note || ''),
    _skipAppend: false,
  },
}];`

const CLEAR_JS = `const staticData = $getWorkflowStaticData('global');
staticData.webInProgress = false;
staticData.webStartedAt = 0;
return $input.all();`

function readSheetNode(id, name, sheetId, title, range, position) {
  return {
    id,
    name,
    type: 'n8n-nodes-base.googleSheets',
    typeVersion: 4.7,
    position,
    alwaysOutputData: true,
    credentials: {
      googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
    },
    parameters: {
      operation: 'read',
      ...sheetRef(sheetId, title),
      options: {
        dataLocationOnSheet: {
          values: { rangeDefinition: 'specifyRangeA1', range },
        },
      },
    },
  }
}

function buildScorerWorkflow(sheetId, pageSpeedKey) {
  const nodes = [
    {
      id: uid(),
      name: 'Every 5 Minutes',
      type: 'n8n-nodes-base.scheduleTrigger',
      typeVersion: 1.2,
      position: [-960, -80],
      parameters: { rule: { interval: [{ field: 'minutes', minutesInterval: 5 }] } },
    },
    {
      id: uid(),
      name: 'Manual Trigger',
      type: 'n8n-nodes-base.manualTrigger',
      typeVersion: 1,
      position: [-960, 120],
      parameters: {},
    },
    readSheetNode(uid(), 'Read Leads Sheet', sheetId, LEADS_SHEET, LEADS_RANGE, [-720, 0]),
    readSheetNode(uid(), 'Read Website Tab', sheetId, WEBSITE_SHEET, WEBSITE_RANGE, [-720, 200]),
    {
      id: uid(),
      name: 'Merge Reads',
      type: 'n8n-nodes-base.merge',
      typeVersion: 3,
      position: [-480, 80],
      parameters: { mode: 'combine', combineBy: 'combineAll', options: {} },
    },
    {
      id: uid(),
      name: 'Pick Website Row',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-240, 80],
      parameters: { mode: 'runOnceForAllItems', jsCode: PICK_JS },
    },
    {
      id: uid(),
      name: 'Wait Before PageSpeed',
      type: 'n8n-nodes-base.wait',
      typeVersion: 1.1,
      position: [0, 80],
      parameters: { amount: 2 },
    },
    {
      id: uid(),
      name: 'PageSpeed Full',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.4,
      position: [240, 80],
      onError: 'continueRegularOutput',
      parameters: {
        method: 'GET',
        url: `={{ (() => {
  let u = String($json.Website || '').trim();
  if (!u) return 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + encodeURIComponent('https://example.com') + '&strategy=mobile&category=performance&key=${pageSpeedKey}';
  if (!/^https?:\\/\\//i.test(u)) u = 'https://' + u;
  return 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + encodeURIComponent(u) + '&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices&key=${pageSpeedKey}';
})() }}`,
        options: { timeout: 90000 },
      },
    },
    {
      id: uid(),
      name: 'Extract Scores',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [480, 80],
      parameters: { mode: 'runOnceForAllItems', jsCode: EXTRACT_JS },
    },
    {
      id: uid(),
      name: 'Quota Hit',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [700, 80],
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3 },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json._quotaHit }}',
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
    {
      id: uid(),
      name: 'Should Alert Quota',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [920, 280],
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: '', typeValidation: 'loose', version: 3 },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json._alert }}',
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
    {
      id: uid(),
      name: 'Quota Alert Email',
      type: 'n8n-nodes-base.gmail',
      typeVersion: 2.1,
      position: [1140, 200],
      credentials: { gmailOAuth2: { id: GMAIL_CRED_ID, name: GMAIL_CRED_NAME } },
      parameters: {
        sendTo: NOTIFY_EMAIL,
        subject: '=Outbound Website Scorer: PageSpeed quota failed twice',
        message: `=PageSpeed hit quota again after a 24h pause.<br><br>
Streak: {{ $json._quotaStreak }}<br>
Cooldown until: {{ $json._cooldownUntil }}<br>
Reason: {{ $json._quotaReason }}`,
        options: {},
      },
    },
    {
      id: uid(),
      name: 'Clear Lock Quota',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1140, 360],
      parameters: { mode: 'runOnceForAllItems', jsCode: CLEAR_JS },
    },
    readSheetNode(uid(), 'Read Website Tab2', sheetId, WEBSITE_SHEET, WEBSITE_RANGE, [
      920, -120,
    ]),
    readSheetNode(uid(), 'Read Speed Fix Tab', sheetId, SPEED_FIX_SHEET, PRODUCT_RANGE, [
      1140, -120,
    ]),
    {
      id: uid(),
      name: 'Build Website Row',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1360, -120],
      parameters: { mode: 'runOnceForAllItems', jsCode: BUILD_JS },
    },
    {
      id: uid(),
      name: 'Should Append',
      type: 'n8n-nodes-base.if',
      typeVersion: 2.3,
      position: [1800, -40],
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
      name: 'Append Website',
      type: 'n8n-nodes-base.googleSheets',
      typeVersion: 4.7,
      position: [2040, -120],
      credentials: {
        googleSheetsOAuth2Api: { id: GOOGLE_SHEETS_CRED_ID, name: GOOGLE_SHEETS_CRED_NAME },
      },
      parameters: {
        operation: 'append',
        ...sheetRef(sheetId, WEBSITE_SHEET),
        columns: {
          mappingMode: 'defineBelow',
          value: Object.fromEntries(
            WEBSITE_HEADERS.map((h) => [h, `={{ $json[${JSON.stringify(h)}] }}`]),
          ),
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
      name: 'Clear Lock',
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [2040, 40],
      parameters: { mode: 'runOnceForAllItems', jsCode: CLEAR_JS },
    },
  ]

  // Merge after extract+quota false path needs product reads to complete.
  // Simpler wiring: after Extract Scores not quota → fan into product reads via a no-op, then merge is hard.
  // Use sequential: Extract → if not quota → Build that reads $('Read Website Tab2') etc.
  // Those reads must run before Build. Wire: Quota Hit false → Read Website Tab2 → ... chain → Build.

  const connections = {
    'Every 5 Minutes': {
      main: [
        [
          { node: 'Read Leads Sheet', type: 'main', index: 0 },
          { node: 'Read Website Tab', type: 'main', index: 0 },
        ],
      ],
    },
    'Manual Trigger': {
      main: [
        [
          { node: 'Read Leads Sheet', type: 'main', index: 0 },
          { node: 'Read Website Tab', type: 'main', index: 0 },
        ],
      ],
    },
    'Read Leads Sheet': { main: [[{ node: 'Merge Reads', type: 'main', index: 0 }]] },
    'Read Website Tab': { main: [[{ node: 'Merge Reads', type: 'main', index: 1 }]] },
    'Merge Reads': { main: [[{ node: 'Pick Website Row', type: 'main', index: 0 }]] },
    'Pick Website Row': { main: [[{ node: 'Wait Before PageSpeed', type: 'main', index: 0 }]] },
    'Wait Before PageSpeed': { main: [[{ node: 'PageSpeed Full', type: 'main', index: 0 }]] },
    'PageSpeed Full': { main: [[{ node: 'Extract Scores', type: 'main', index: 0 }]] },
    'Extract Scores': { main: [[{ node: 'Quota Hit', type: 'main', index: 0 }]] },
    'Quota Hit': {
      main: [
        [{ node: 'Should Alert Quota', type: 'main', index: 0 }],
        [{ node: 'Read Website Tab2', type: 'main', index: 0 }],
      ],
    },
    'Should Alert Quota': {
      main: [
        [{ node: 'Quota Alert Email', type: 'main', index: 0 }],
        [{ node: 'Clear Lock Quota', type: 'main', index: 0 }],
      ],
    },
    'Quota Alert Email': { main: [[{ node: 'Clear Lock Quota', type: 'main', index: 0 }]] },
    'Read Website Tab2': { main: [[{ node: 'Read Speed Fix Tab', type: 'main', index: 0 }]] },
    'Read Speed Fix Tab': {
      main: [[{ node: 'Build Website Row', type: 'main', index: 0 }]],
    },
    'Build Website Row': { main: [[{ node: 'Should Append', type: 'main', index: 0 }]] },
    'Should Append': {
      main: [
        [{ node: 'Append Website', type: 'main', index: 0 }],
        [{ node: 'Clear Lock', type: 'main', index: 0 }],
      ],
    },
    'Append Website': { main: [[{ node: 'Clear Lock', type: 'main', index: 0 }]] },
  }

  return {
    name: 'SYSBILT - Outbound Website Scorer',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  }
}

async function main() {
  const args = process.argv.slice(2)
  const activate = args.includes('--activate')
  const sheetId = process.env.OUTBOUND_LEADS_SHEET_ID || SHEET_ID_DEFAULT
  if (!process.env.OUTBOUND_LEADS_SHEET_ID) {
    saveDeployState({ OUTBOUND_LEADS_SHEET_ID: sheetId })
  }

  const pageSpeedKey = await fetchPageSpeedKey()
  const workflow = buildScorerWorkflow(sheetId, pageSpeedKey)
  const wf = await upsertWorkflow(workflow, { activate })
  saveDeployState({
    OUTBOUND_LEADS_SHEET_ID: sheetId,
    OUTBOUND_WEBSITE_SCORER_WORKFLOW_ID: wf.id,
  })

  console.log(
    `\nWebsite Scorer${activate ? ' (active)' : ' (inactive)'}: ${N8N_BASE}/workflow/${wf.id}`,
  )
  console.log(`Sheet: https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=0`)
  console.log(
    `Gate: after LH Mobile scored; SEO/A11y/BP < ${QUALITY_MAX} → Website (not speed-only). Status=Wait.`,
  )
  console.log('Manual: add Status + Route dropdowns on Website tab (see chat).')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
