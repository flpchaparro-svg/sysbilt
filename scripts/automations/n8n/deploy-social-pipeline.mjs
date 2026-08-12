#!/usr/bin/env node
/**
 * Deploy SYSBILT - Social Distribute (Lane 1 Website News social)
 * and patch SYSBILT - NEWS Call Distributor wiring.
 *
 * Lane 1 card: Browserless HTML (1200×630) → Postiz
 * Channels: personal LinkedIn + Facebook at slot.
 * Company LinkedIn page: Postiz repost plug on the personal post (+2h). Never a second post.
 * No Instagram.
 *
 *   ./scripts/automations/n8n/deploy-social-pipeline.sh
 *
 * Env: N8N_API_KEY / cursor-mcp, POSTIZ_API_KEY, BROWSERLESS_TOKEN (or Mini)
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const CARD_PATH = resolve(ROOT, 'scripts/automations/social/cards/lane1-news-card.html');
const MINI_HOST = process.env.SYSBILT_MINI_SSH || 'sysbilt@felipes-mac-mini-1.tail1e2dea.ts.net';
const STATE_ENV = resolve(__dirname, '.deploy-state.env');

const LI_PERSONAL_FALLBACK = 'cmrvgawuy0005ob6ufwade18l';
const LI_COMPANY_FALLBACK = 'cmqiupuld0012pe76c3kjc6wb';
const FB_FALLBACK = 'cmqdhhxms0001pe760w6chubg';
const COMPANY_DELAY_HOURS = 2;

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

loadEnvLocal();

const N8N_BASE = (process.env.N8N_BASE_URL || 'https://n8n.sysbilt.com').replace(/\/$/, '');
const N8N_KEY = process.env.N8N_API_KEY || process.env['cursor-mcp'];
const NEWS_WF_ID = process.env.NEWS_WORKFLOW_ID || 'hB7YMEOcD7TLu3NZ';
const POSTIZ_BASE = 'https://postiz.sysbilt.com/api/public/v1';

function loadPostizApiKey() {
  if (process.env.POSTIZ_API_KEY) return process.env.POSTIZ_API_KEY.trim();
  const local = resolve(process.env.HOME || '', '.config/sysbilt/postiz-secrets.env');
  if (existsSync(local)) {
    const m = readFileSync(local, 'utf8').match(/^POSTIZ_API_KEY=(.+)$/m);
    if (m) return m[1].trim();
  }
  return execSync(
    `ssh -o ConnectTimeout=15 -o BatchMode=yes ${MINI_HOST} 'grep ^POSTIZ_API_KEY= ~/.config/sysbilt/postiz-secrets.env | cut -d= -f2-'`,
    { encoding: 'utf8' },
  ).trim();
}

function loadBrowserlessToken() {
  if (process.env.BROWSERLESS_TOKEN) return process.env.BROWSERLESS_TOKEN.trim();
  const local = resolve(process.env.HOME || '', '.config/sysbilt/browserless-secrets.env');
  if (existsSync(local)) {
    const m = readFileSync(local, 'utf8').match(/^BROWSERLESS_TOKEN=(.+)$/m);
    if (m) return m[1].trim();
  }
  const remote = execSync(
    `ssh -o ConnectTimeout=15 -o BatchMode=yes ${MINI_HOST} 'grep ^BROWSERLESS_TOKEN= ~/.config/sysbilt/browserless-secrets.env | cut -d= -f2-'`,
    { encoding: 'utf8' },
  ).trim();
  if (!remote) throw new Error('Could not load BROWSERLESS_TOKEN from Mini');
  return remote;
}

const POSTIZ_KEY = loadPostizApiKey();
if (!N8N_KEY) {
  console.error('Missing N8N_API_KEY or cursor-mcp in .env.local');
  process.exit(1);
}
if (!POSTIZ_KEY) {
  console.error('Missing POSTIZ_API_KEY');
  process.exit(1);
}
if (!existsSync(CARD_PATH)) {
  console.error('Missing card template:', CARD_PATH);
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
const postizCred = (id) => ({ httpHeaderAuth: { id, name: 'Postiz API' } });

const CLEANUP_JS = `function cleanText(s) {
  if (!s) return s;
  let t = s.replace(/[\\u2014\\u2013]/g, ',').replace(/!/g, '.');
  const au = [
    [/\\borganize\\b/gi,'organise'],[/\\boptimize\\b/gi,'optimise'],[/\\borganizing\\b/gi,'organising'],
    [/\\boptimizing\\b/gi,'optimising'],[/\\borganized\\b/gi,'organised'],[/\\boptimized\\b/gi,'optimised'],
    [/\\bcustomize\\b/gi,'customise'],[/\\bcustomized\\b/gi,'customised'],[/\\banalyze\\b/gi,'analyse'],
    [/\\banalyzed\\b/gi,'analysed'],[/\\brecognize\\b/gi,'recognise'],[/\\brecognized\\b/gi,'recognised'],
    [/\\bcentralize\\b/gi,'centralise'],[/\\bcentralized\\b/gi,'centralised'],[/\\bdigitize\\b/gi,'digitise'],
    [/\\bdigitized\\b/gi,'digitised'],[/\\bcolor\\b/gi,'colour'],[/\\bcenter\\b/gi,'centre'],
    [/\\bcentered\\b/gi,'centred'],[/\\bfavor\\b/gi,'favour'],[/\\bfavorite\\b/gi,'favourite'],
    [/\\blabor\\b/gi,'labour'],[/\\bhonor\\b/gi,'honour'],
  ];
  for (const [p, r] of au) t = t.replace(p, r);
  return t;
}
const j = { ...$json };
j.linkedin = cleanText(j.linkedin);
j.facebook = cleanText(j.facebook);
j.company = cleanText(j.company || j.facebook);
return [{ json: j }];`;

const PREPARE_ITEMS_JS = `const SANITY_QUERY = '*[_type == "newsItem" && !(_id in path("drafts.**")) && defined(publishedAt) && publishedAt > $cutoff] | order(publishedAt desc) [0...40] { _id, title, publishedAt, servicePillar, revenuePhase, "imageUrl": mainImage.asset->url, "introText": pt::text(body), sourceUrl }';
const cutoff = DateTime.now().minus({ days: 14 }).toUTC().toISO();

const mapNewsRows = (rows) => (rows || [])
  .map((r) => ({
    type: 'news',
    title: (r.title || '').trim(),
    summary: (r.introText || '').trim(),
    link: 'https://sysbilt.com/news',
    imageUrl: (r.imageUrl || '').split('?')[0] || '',
    pillar: r.servicePillar || '',
    persona: r.revenuePhase || '',
    sanityId: r._id,
    sourceUrl: r.sourceUrl || '',
    publishedAt: r.publishedAt || '',
  }))
  .filter((it) => it.title && it.summary);

const staticData = $getWorkflowStaticData('global');
const seen = staticData.lane1PostedSanityIds || {};
const seenUrls = staticData.lane1PostedSourceUrls || {};
const now = Date.now();
const SEEN_TTL_MS = 21 * 24 * 60 * 60 * 1000;
for (const [id, at] of Object.entries({ ...seen })) {
  if (!at || now - Number(at) > SEEN_TTL_MS) delete seen[id];
}
for (const [url, at] of Object.entries({ ...seenUrls })) {
  if (!at || now - Number(at) > SEEN_TTL_MS) delete seenUrls[url];
}

let batch = $('Execute Workflow Trigger').first().json || {};
if (!(batch.items || []).length) {
  const fromInput = $input.first()?.json || {};
  if ((fromInput.items || []).length) batch = fromInput;
}

let items = batch.items || [];
const targets = $('Parse Integrations').first().json;

if (!items.length) {
  const res = await this.helpers.httpRequest({
    method: 'POST',
    url: 'https://wdlc9pg8.api.sanity.io/v2021-06-07/data/query/production',
    body: { query: SANITY_QUERY, params: { cutoff } },
    json: true,
  });
  items = mapNewsRows(res.result);
}

// Only new items (not already posted to social). Fresh publishes from NEWS arrive here once.
items = items.filter((it) => {
  if (!it.sanityId || seen[it.sanityId]) return false;
  const url = String(it.sourceUrl || '').trim();
  if (url && seenUrls[url]) return false;
  return true;
});
if (!items.length) {
  staticData.lane1PostedSanityIds = seen;
  staticData.lane1PostedSourceUrls = seenUrls;
  return [];
}

// Social: one post per day from today (if hour still ahead), clear of L2/L3.
// First 7 stories get day 0..6. Anything beyond piles on the Sunday in that window
// (Monday gets a fresh NEWS batch). Website already has all stories live.
const PUBLISH_HOUR = 12; // Sydney — clear of carousel 08:00, L3 ~11:00, L2 ~15:00
const DAILY_CAP_BEFORE_SUNDAY = 7;
const RESERVED = [
  { hour: 11, minute: 0, radiusMin: 40, days: [2, 4, 6] }, // Lane 3
  { hour: 15, minute: 0, radiusMin: 40, days: [1, 3] }, // Lane 2
];
function nudgePastReserved(dt) {
  let t = dt;
  for (let guard = 0; guard < 64; guard++) {
    let hit = null;
    for (const r of RESERVED) {
      if (r.days && !r.days.includes(t.weekday)) continue;
      const center = t.set({ hour: r.hour, minute: r.minute, second: 0, millisecond: 0 });
      const diff = Math.abs(t.diff(center, 'minutes').minutes);
      if (diff <= r.radiusMin) {
        hit = center.plus({ minutes: r.radiusMin + 5 });
        break;
      }
    }
    if (!hit) return t;
    t = hit;
  }
  return t;
}

const sydneyNow = DateTime.now().setZone('Australia/Sydney');
let startDay = sydneyNow.startOf('day').set({ hour: PUBLISH_HOUR, minute: 0, second: 0, millisecond: 0 });
if (startDay <= sydneyNow.plus({ minutes: 10 })) {
  startDay = startDay.plus({ days: 1 });
}

const daySlots = [];
for (let i = 0; i < DAILY_CAP_BEFORE_SUNDAY; i++) {
  daySlots.push(nudgePastReserved(startDay.plus({ days: i })));
}
const sundayDump = daySlots.find((d) => d.weekday === 7) || nudgePastReserved(
  startDay.plus({ days: (7 - startDay.weekday + 7) % 7 || 7 }).set({ hour: PUBLISH_HOUR, minute: 0 }),
);

const out = [];
items.forEach((it, i) => {
  let slot;
  if (i < DAILY_CAP_BEFORE_SUNDAY) {
    slot = daySlots[i];
  } else {
    // Overflow on Sunday, staggered so Postiz does not collide with itself
    slot = nudgePastReserved(sundayDump.plus({ minutes: (i - DAILY_CAP_BEFORE_SUNDAY + 1) * 20 }));
  }
  const companySlot = slot.plus({ hours: ${COMPANY_DELAY_HOURS} });
  // Do NOT mark seen here. Mark only after Postiz schedule succeeds (Mark Seen node),
  // otherwise a mid-loop failure permanently skips stories.
  out.push({
    json: {
      ...it,
      index: i,
      slotISO: slot.toUTC().toISO(),
      companySlotISO: companySlot.toUTC().toISO(),
      slotLabel: slot.toFormat("ccc d LLL yyyy, HH:mm") + ' Sydney',
      companySlotLabel: companySlot.toFormat("ccc d LLL yyyy, HH:mm") + ' Sydney',
      mode: { postType: 'schedule' },
      targets,
    },
  });
});
return out;`;

const WRITE_POST_JS = `const title = ($json.title || '').trim();
const intro = ($json.summary || '').trim();
function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
// Postiz LinkedIn expects HTML paragraphs (same shape as manual Lane 1 recovery).
const paras = [title, ...String(intro).split(/\\n\\n+/).map((p) => p.trim()).filter(Boolean)];
const parts = [];
paras.forEach((p, i) => {
  parts.push('<p>' + escapeHtml(p) + '</p>');
  if (i < paras.length - 1) parts.push('<p></p>');
});
const caption = parts.join('');
const newsComment = 'See more news → https://sysbilt.com/news';
const company = caption
  .replace(/>I /g, '>We ')
  .replace(/\\bI\\b/g, 'we');
return [{ json: { ...$json, linkedin: caption, facebook: caption, company, newsComment } }];`;

const FILL_CARD_JS = `const TEMPLATE = ${JSON.stringify(readFileSync(CARD_PATH, 'utf8'))};
const j = $input.first().json;
const title = String(j.title || '').trim();

const PHASE_MAP = {
  phase1: 'phase-01',
  phase2: 'phase-02',
  phase3: 'phase-03',
  horizon: 'phase-01',
};
const TAG_MAP = {
  'Websites & E-commerce': 'Websites',
  'CRM & Lead Tracking': 'CRM',
  Automation: 'Automation',
  'AI Assistants': 'AI',
  'Content Systems': 'Content',
  'Team Training': 'Training',
  'Dashboards & Reporting': 'Dashboards',
};
const MOTIF_MAP = {
  'Websites & E-commerce': 'motif-nodes',
  'CRM & Lead Tracking': 'motif-nodes',
  Automation: 'motif-bars',
  'AI Assistants': 'motif-nodes',
  'Content Systems': 'motif-grid',
  'Team Training': 'motif-grid',
  'Dashboards & Reporting': 'motif-bars',
};

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function accentHeadline(plain) {
  const words = String(plain || '').trim().split(/\\s+/).filter(Boolean);
  if (!words.length) return '';
  // Prefer a mid-length content word for the italic accent
  let idx = words.findIndex((w) => w.replace(/[^a-zA-Z]/g, '').length >= 5);
  if (idx < 0) idx = Math.min(1, words.length - 1);
  return words
    .map((w, i) => (i === idx ? '<em>' + esc(w) + '</em>' : esc(w)))
    .join(' ');
}

const plainLen = title.replace(/<[^>]+>/g, '').length;
let lenClass = 'len-long';
if (plainLen < 35) lenClass = 'len-short';
else if (plainLen <= 65) lenClass = 'len-mid';

const phase = PHASE_MAP[j.persona] || PHASE_MAP[j.revenuePhase] || 'phase-01';
const motif = MOTIF_MAP[j.pillar] || 'motif-grid';
const tag = TAG_MAP[j.pillar] || String(j.pillar || 'News').slice(0, 22);
const headline = accentHeadline(title);

let html = TEMPLATE;
html = html.split('{{PHASE}}').join(phase);
html = html.split('{{LEN}}').join(lenClass);
html = html.split('{{MOTIF}}').join(motif);
html = html.split('{{TAG}}').join(esc(tag));
html = html.split('{{HEADLINE}}').join(headline);
if (html.includes('{{')) throw new Error('Unreplaced card placeholders remain');

return [{ json: { ...j, cardHtml: html, cardPhase: phase, cardLen: lenClass, cardMotif: motif, cardTag: tag } }];`;

function buildSocialDistributeWorkflow(postizCredId, browserlessToken, slackCredId) {
  const slackChannel = process.env.SLACK_CHANNEL || '#content';
  const ids = {
    trigger: uid(),
    getIntegrations: uid(),
    parseIntegrations: uid(),
    prepareItems: uid(),
    loop: uid(),
    writePost: uid(),
    cleanupCaptions: uid(),
    fillCard: uid(),
    browserless: uid(),
    upload: uid(),
    mergeUpload: uid(),
    buildPrimary: uid(),
    schedulePrimary: uid(),
    forcePrimary: uid(),
    forceFacebook: uid(),
    markSeen: uid(),
    buildSlack: uid(),
    slackNotify: uid(),
    queueSummary: uid(),
    cancelWebhook: uid(),
    cancelNormalise: uid(),
    cancelPrimary: uid(),
    cancelSummary: uid(),
  };

  const nodes = [
    {
      parameters: { inputSource: 'passthrough' },
      type: 'n8n-nodes-base.executeWorkflowTrigger',
      typeVersion: 1.1,
      position: [0, 0],
      id: ids.trigger,
      name: 'Execute Workflow Trigger',
    },
    {
      parameters: {
        url: `${POSTIZ_BASE}/integrations`,
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [220, 0],
      id: ids.getIntegrations,
      name: 'Get Integrations',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: {
        jsCode: `const rows = $input.all();
let ints;
if (rows.length > 1) ints = rows.map((r) => r.json);
else {
  const raw = rows[0]?.json ?? {};
  if (Array.isArray(raw)) ints = raw;
  else if (Array.isArray(raw.integrations)) ints = raw.integrations;
  else if (raw.id) ints = [raw];
  else ints = [];
}
const provider = (i) => i.providerIdentifier || i.platform || i.provider || i.identifier || '';
const active = ints.filter((i) => !i.disabled);
const linkedinPersonal = active.find((i) => provider(i) === 'linkedin') || {};
const linkedinCompany = active.find((i) => provider(i) === 'linkedin-page') || {};
const facebook = active.find((i) => provider(i) === 'facebook') || {};
const targets = {
  linkedinPersonalId: linkedinPersonal.id || '${LI_PERSONAL_FALLBACK}',
  linkedinCompanyId: linkedinCompany.id || '${LI_COMPANY_FALLBACK}',
  facebookId: facebook.id || '${FB_FALLBACK}',
  // Full page object for Postiz personal→page repost plug (NOT a second post)
  linkedinCompany: {
    id: linkedinCompany.id || '${LI_COMPANY_FALLBACK}',
    name: linkedinCompany.name || 'SYSBILT',
    internalId: linkedinCompany.internalId || '',
    disabled: false,
    picture: linkedinCompany.picture || '',
    identifier: 'linkedin-page',
    providerIdentifier: 'linkedin-page',
    display: linkedinCompany.display || linkedinCompany.name || 'SYSBILT',
    type: 'social',
  },
};
if (!targets.linkedinPersonalId) throw new Error('Missing personal LinkedIn integration');
if (!targets.linkedinCompanyId) throw new Error('Missing company LinkedIn page integration');
if (!targets.facebookId) throw new Error('Missing Facebook integration');
$getWorkflowStaticData('global').postizTargets = targets;
return [{ json: targets }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [440, 0],
      id: ids.parseIntegrations,
      name: 'Parse Integrations',
    },
    {
      parameters: { jsCode: PREPARE_ITEMS_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [660, 0],
      id: ids.prepareItems,
      name: 'Prepare Items',
    },
    {
      parameters: { batchSize: 1, options: {} },
      type: 'n8n-nodes-base.splitInBatches',
      typeVersion: 3,
      position: [880, 0],
      id: ids.loop,
      name: 'Loop Over Items',
    },
    {
      parameters: { jsCode: WRITE_POST_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1100, 140],
      id: ids.writePost,
      name: 'Write Post Copy',
    },
    {
      parameters: { jsCode: CLEANUP_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1320, 140],
      id: ids.cleanupCaptions,
      name: 'Cleanup Captions',
    },
    {
      parameters: { jsCode: FILL_CARD_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1540, 140],
      id: ids.fillCard,
      name: 'Fill Card HTML',
    },
    {
      parameters: {
        method: 'POST',
        url: `http://127.0.0.1:3010/chromium/screenshot?token=${browserlessToken}`,
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={{ JSON.stringify({ html: $json.cardHtml, options: { type: 'png' }, viewport: { width: 1200, height: 630, deviceScaleFactor: 2 }, gotoOptions: { waitUntil: 'networkidle0' }, waitForTimeout: 4000 }) }}`,
        options: {
          timeout: 90000,
          response: { response: { responseFormat: 'file', outputPropertyName: 'data' } },
        },
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [1760, 140],
      id: ids.browserless,
      name: 'Browserless Screenshot',
    },
    {
      parameters: {
        method: 'POST',
        url: `${POSTIZ_BASE}/upload`,
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        sendBody: true,
        contentType: 'multipart-form-data',
        bodyParameters: {
          parameters: [
            {
              parameterType: 'formBinaryData',
              name: 'file',
              inputDataFieldName: 'data',
            },
          ],
        },
        options: { timeout: 60000 },
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [1980, 140],
      id: ids.upload,
      name: 'Upload Image',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: {
        jsCode: `const prev = $('Fill Card HTML').item.json;
const up = $json;
if (!up.id || !up.path) throw new Error('Postiz upload missing id/path: ' + JSON.stringify(up).slice(0, 300));
return [{ json: { ...prev, uploadId: up.id, uploadPath: up.path } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [2200, 140],
      id: ids.mergeUpload,
      name: 'Merge Upload',
    },
    {
      parameters: {
        jsCode: `const item = $input.item.json;
const targets = item.targets || $getWorkflowStaticData('global').postizTargets || {};
const images = [{ id: item.uploadId, path: item.uploadPath }];
const tags = [
  { value: 'no-ig-mirror', label: 'no-ig-mirror' },
  { value: 'lane-1', label: 'lane-1' },
];
const mode = item.mode || { postType: 'schedule' };
const postType = mode.postType || 'schedule';
const date = item.slotISO || DateTime.now().plus({ days: 1 }).toUTC().toISO();
const company = targets.linkedinCompany || { id: targets.linkedinCompanyId, identifier: 'linkedin-page' };
// ONE LinkedIn post on personal. Company page = Postiz repost plug +2h (never a second post).
const linkedinSettings = {
  __type: 'linkedin',
  'plug--linkedin-add-comment--integrations': [],
  'plug--linkedin-add-comment--delay': '0',
  'plug--linkedin-add-comment--comment': '',
  'plug--linkedin-repost-post-users--integrations': [company],
  'plug--linkedin-repost-post-users--delay': String(${COMPANY_DELAY_HOURS} * 60 * 60 * 1000),
  'plug--linkedin-repost-post-users--active': true,
};
const body = {
  type: postType,
  date,
  shortLink: false,
  tags,
  posts: [
    {
      integration: { id: targets.linkedinPersonalId },
      value: [
        { content: item.linkedin, image: images },
        { content: item.newsComment || 'See more news → https://sysbilt.com/news', image: [] },
      ],
      settings: linkedinSettings,
    },
    {
      integration: { id: targets.facebookId },
      value: [
        { content: item.facebook, image: images },
        { content: item.newsComment || 'See more news → https://sysbilt.com/news', image: [] },
      ],
      settings: { __type: 'facebook' },
    },
  ],
};
return [{ json: { ...item, primaryBody: body } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [2420, 140],
      id: ids.buildPrimary,
      name: 'Build Primary Payload',
    },
    {
      parameters: {
        method: 'POST',
        url: `${POSTIZ_BASE}/posts`,
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: '={{ JSON.stringify($json.primaryBody) }}',
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [2640, 140],
      id: ids.schedulePrimary,
      name: 'Schedule Personal + FB',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: {
        method: 'PUT',
        // Postiz returns array-like {0: liPost, 1: fbPost} for multi-channel creates.
        url: `={{ (() => { const j = $json; const li = j[0] || j['0'] || j; const id = li?.id || li?.postId || j.postId || j.id || ''; return '${POSTIZ_BASE}/posts/' + id + '/status'; })() }}`,
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: '={{ JSON.stringify({ status: "schedule" }) }}',
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [2860, 140],
      id: ids.forcePrimary,
      name: 'Force Schedule LinkedIn',
      credentials: postizCred(postizCredId),
      continueOnFail: true,
    },
    {
      parameters: {
        method: 'PUT',
        url: `={{ (() => { const j = $('Schedule Personal + FB').first().json || {}; const fb = j[1] || j['1'] || {}; const id = fb?.id || fb?.postId || ''; return '${POSTIZ_BASE}/posts/' + id + '/status'; })() }}`,
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: '={{ JSON.stringify({ status: "schedule" }) }}',
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [2970, 140],
      id: ids.forceFacebook,
      name: 'Force Schedule Facebook',
      credentials: postizCred(postizCredId),
      continueOnFail: true,
    },
    {
      parameters: {
        jsCode: `const item = $('Merge Upload').item.json;
const scheduled = $('Schedule Personal + FB').first().json || {};
const li = scheduled[0] || scheduled['0'] || scheduled;
const fb = scheduled[1] || scheduled['1'] || {};
const primaryId = li?.id || li?.postId || scheduled.postId || scheduled.id || '';
const facebookId = fb?.id || fb?.postId || '';
const staticData = $getWorkflowStaticData('global');
const seen = staticData.lane1PostedSanityIds || {};
const seenUrls = staticData.lane1PostedSourceUrls || {};
const now = Date.now();
if (item.sanityId) seen[item.sanityId] = now;
if (item.sourceUrl) seenUrls[String(item.sourceUrl).trim()] = now;
staticData.lane1PostedSanityIds = seen;
staticData.lane1PostedSourceUrls = seenUrls;
return [{ json: { ...item, primaryPostId: primaryId, facebookPostId: facebookId } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [3080, 140],
      id: ids.markSeen,
      name: 'Mark Seen',
    },
    {
      parameters: {
        jsCode: `const item = $('Mark Seen').item.json;
const primaryId = item.primaryPostId || '';
const sanityId = item.sanityId || '';
const studioUrl = sanityId
  ? 'https://sysbilt.com/studio/structure/newsItem;' + encodeURIComponent(sanityId)
  : 'https://sysbilt.com/studio';
const killUrl = 'https://n8n.sysbilt.com/webhook/sysbilt-lane1-cancel?postId=' + encodeURIComponent(primaryId);
const slack_text = [
  '*Lane 1 ready* (personal LI + Facebook; company page via personal repost plug +${COMPANY_DELAY_HOURS}h)',
  '',
  '*' + (item.title || 'News') + '*',
  'Phase: ' + (item.persona || '') + ' · ' + (item.pillar || ''),
  'Goes live: ' + (item.slotLabel || item.slotISO),
  'Company page: same post, shared +${COMPANY_DELAY_HOURS}h (not a second Postiz post)',
  '',
  'Sanity: ' + studioUrl,
  'Site: https://sysbilt.com/news',
  'Postiz: https://postiz.sysbilt.com/launches',
  '',
  'Do nothing → it posts. Kill social: ' + killUrl,
].join('\\n');
return [{ json: { ...item, slack_text, killUrl, studioUrl } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [3300, 140],
      id: ids.buildSlack,
      name: 'Build Slack Alert',
    },
    slackCredId
      ? {
          parameters: {
            select: 'channel',
            channelId: { __rl: true, value: slackChannel, mode: 'name' },
            text: '={{ $json.slack_text }}',
            otherOptions: {},
          },
          type: 'n8n-nodes-base.slack',
          typeVersion: 2.2,
          position: [3520, 140],
          id: ids.slackNotify,
          name: 'Slack Notify',
          credentials: { slackApi: { id: slackCredId, name: 'SYSBILT Slack' } },
        }
      : {
          parameters: {
            jsCode: `return [{ json: { ...$json, slackSkipped: true } }];`,
          },
          type: 'n8n-nodes-base.code',
          typeVersion: 2,
          position: [3520, 140],
          id: ids.slackNotify,
          name: 'Slack Notify',
        },
    {
      parameters: {
        jsCode: `const count = $('Prepare Items').all().length;
return [{ json: {
  message: count + ' Lane 1 news post(s), 1/day. Company via personal LinkedIn repost plug +${COMPANY_DELAY_HOURS}h (no duplicate post).',
  count,
} }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1100, -160],
      id: ids.queueSummary,
      name: 'Queue Summary',
    },
    {
      parameters: {
        path: 'sysbilt-lane1-cancel',
        httpMethod: 'GET',
        responseMode: 'lastNode',
        options: {},
      },
      type: 'n8n-nodes-base.webhook',
      typeVersion: 2,
      position: [0, 420],
      id: ids.cancelWebhook,
      name: 'Cancel Webhook',
      webhookId: ids.cancelWebhook,
    },
    {
      parameters: {
        jsCode: `const q = $json.query || {};
const body = $json.body || {};
const postId = String(q.postId || body.postId || '').trim();
if (!postId) throw new Error('Cancel needs postId');
return [{ json: { postId } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [220, 420],
      id: ids.cancelNormalise,
      name: 'Cancel Normalise',
    },
    {
      parameters: {
        method: 'PUT',
        url: `=${POSTIZ_BASE}/posts/{{ $json.postId }}/status`,
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: '={{ JSON.stringify({ status: "draft" }) }}',
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [440, 420],
      id: ids.cancelPrimary,
      name: 'Demote Primary',
      credentials: postizCred(postizCredId),
      continueOnFail: true,
    },
    {
      parameters: {
        jsCode: `const n = $('Cancel Normalise').item.json;
return [{ json: { ok: true, cancelled: true, postId: n.postId, message: 'Lane 1 social moved to draft (will not publish). Company share plug dies with it.' } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [660, 420],
      id: ids.cancelSummary,
      name: 'Cancel Summary',
    },
  ];

  const connections = {
    'Execute Workflow Trigger': { main: [[{ node: 'Get Integrations', type: 'main', index: 0 }]] },
    'Get Integrations': { main: [[{ node: 'Parse Integrations', type: 'main', index: 0 }]] },
    'Parse Integrations': { main: [[{ node: 'Prepare Items', type: 'main', index: 0 }]] },
    'Prepare Items': { main: [[{ node: 'Loop Over Items', type: 'main', index: 0 }]] },
    'Loop Over Items': {
      main: [
        [{ node: 'Queue Summary', type: 'main', index: 0 }],
        [{ node: 'Write Post Copy', type: 'main', index: 0 }],
      ],
    },
    'Write Post Copy': { main: [[{ node: 'Cleanup Captions', type: 'main', index: 0 }]] },
    'Cleanup Captions': { main: [[{ node: 'Fill Card HTML', type: 'main', index: 0 }]] },
    'Fill Card HTML': { main: [[{ node: 'Browserless Screenshot', type: 'main', index: 0 }]] },
    'Browserless Screenshot': { main: [[{ node: 'Upload Image', type: 'main', index: 0 }]] },
    'Upload Image': { main: [[{ node: 'Merge Upload', type: 'main', index: 0 }]] },
    'Merge Upload': { main: [[{ node: 'Build Primary Payload', type: 'main', index: 0 }]] },
    'Build Primary Payload': { main: [[{ node: 'Schedule Personal + FB', type: 'main', index: 0 }]] },
    'Schedule Personal + FB': { main: [[{ node: 'Force Schedule LinkedIn', type: 'main', index: 0 }]] },
    'Force Schedule LinkedIn': { main: [[{ node: 'Force Schedule Facebook', type: 'main', index: 0 }]] },
    'Force Schedule Facebook': { main: [[{ node: 'Mark Seen', type: 'main', index: 0 }]] },
    'Mark Seen': { main: [[{ node: 'Build Slack Alert', type: 'main', index: 0 }]] },
    'Build Slack Alert': { main: [[{ node: 'Slack Notify', type: 'main', index: 0 }]] },
    'Slack Notify': { main: [[{ node: 'Loop Over Items', type: 'main', index: 0 }]] },
    'Cancel Webhook': { main: [[{ node: 'Cancel Normalise', type: 'main', index: 0 }]] },
    'Cancel Normalise': { main: [[{ node: 'Demote Primary', type: 'main', index: 0 }]] },
    'Demote Primary': { main: [[{ node: 'Cancel Summary', type: 'main', index: 0 }]] },
  };

  return {
    name: 'SYSBILT - Social Distribute',
    nodes,
    connections,
    settings: { executionOrder: 'v1', timezone: 'Australia/Sydney' },
  };
}

async function ensurePostizCredential() {
  if (process.env.POSTIZ_CREDENTIAL_ID) return process.env.POSTIZ_CREDENTIAL_ID;
  if (existsSync(STATE_ENV)) {
    const m = readFileSync(STATE_ENV, 'utf8').match(/^POSTIZ_CREDENTIAL_ID=(.+)$/m);
    if (m) return m[1].trim();
  }
  const created = await n8n('POST', '/credentials', {
    name: 'Postiz API',
    type: 'httpHeaderAuth',
    data: { name: 'Authorization', value: POSTIZ_KEY },
  });
  console.log('Created Postiz API credential:', created.id);
  return created.id;
}

async function activateWorkflow(id, name) {
  try {
    await n8n('POST', `/workflows/${id}/activate`, {});
    console.log(`Activated workflow "${name}" (${id})`);
  } catch (err) {
    if (String(err.message).includes('already active')) return;
    throw err;
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
    const updated = await n8n('PUT', `/workflows/${existing.id}`, body);
    console.log(`Updated workflow "${workflow.name}" (${updated.id})`);
    return updated;
  }
  const created = await n8n('POST', '/workflows', body);
  console.log(`Created workflow "${workflow.name}" (${created.id})`);
  return created;
}

const BUILD_CONTENT_JS = `const pull = $('Pull Published News').first()?.json || $json;
const rows = pull.result || pull.items || [];
const cutoff = Date.now() - 14 * 24 * 60 * 60 * 1000;
const items = rows
  .map((r) => ({
    type: 'news',
    title: (r.title || '').trim(),
    summary: (r.introText || '').trim(),
    link: 'https://sysbilt.com/news',
    imageUrl: ((r.imageUrl || '').split('?')[0] || ''),
    pillar: r.servicePillar || '',
    persona: r.revenuePhase || '',
    sanityId: r._id,
    sourceUrl: r.sourceUrl || '',
    publishedAt: r.publishedAt || '',
  }))
  .filter((it) => {
    if (!it.title || !it.summary) return false;
    if (!it.publishedAt) return true;
    return Date.parse(it.publishedAt) >= cutoff;
  });
if (!items.length) {
  throw new Error('No published news with body text in the last 14 days.');
}
return [{ json: { items, mode: { postType: 'schedule' } } }];`;

const PULL_PUBLISHED_QUERY =
  '*[_type == "newsItem" && !(_id in path("drafts.**")) && defined(publishedAt)] | order(publishedAt desc) [0...40] { _id, title, publishedAt, servicePillar, revenuePhase, "imageUrl": mainImage.asset->url, "introText": pt::text(body), sourceUrl }';

function updateNewsPullPublished(wf) {
  const node = wf.nodes.find((n) => n.name === 'Pull Published News');
  if (node?.parameters) {
    node.parameters.jsonBody = `={{ JSON.stringify({ query: ${JSON.stringify(PULL_PUBLISHED_QUERY)} }) }}`;
    console.log('Updated Pull Published News');
  }
  return wf;
}

function updateNewsCallDistributor(wf, distributorId) {
  const node = wf.nodes.find((n) => n.name === 'Call Distributor');
  if (node) {
    node.parameters = {
      workflowId: { __rl: true, value: distributorId, mode: 'id' },
      workflowInputs: { mappingMode: 'passThrough' },
      mode: 'once',
      options: { waitForSubWorkflow: true },
    };
    node.typeVersion = 1.2;
    console.log('Updated Call Distributor →', distributorId);
  }
  return wf;
}

function updateNewsBuildContent(wf) {
  const node = wf.nodes.find((n) => n.name === 'Build Content Objects');
  if (node) {
    node.parameters.jsCode = BUILD_CONTENT_JS;
    console.log('Updated Build Content Objects (card rendered in Social Distribute)');
  }
  return wf;
}

function ensureSocialNodes(wf, distributorId) {
  let build = wf.nodes.find((n) => n.name === 'Build Content Objects');
  let call = wf.nodes.find((n) => n.name === 'Call Distributor');
  let restore = wf.nodes.find((n) => n.name === 'Restore Pull For Newsletter');

  if (!build) {
    build = {
      parameters: { jsCode: BUILD_CONTENT_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [5008, -1040],
      id: uid(),
      name: 'Build Content Objects',
    };
    wf.nodes.push(build);
  }
  if (!call) {
    call = {
      parameters: {
        workflowId: { __rl: true, value: distributorId, mode: 'id' },
        workflowInputs: { mappingMode: 'passThrough' },
        mode: 'once',
        options: { waitForSubWorkflow: true },
      },
      type: 'n8n-nodes-base.executeWorkflow',
      typeVersion: 1.2,
      position: [5248, -1040],
      id: uid(),
      name: 'Call Distributor',
    };
    wf.nodes.push(call);
  }
  if (!restore) {
    restore = {
      parameters: {
        jsCode: `const pull = $('Pull Published News').first()?.json || {};
return [{ json: pull }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [5488, -1040],
      id: uid(),
      name: 'Restore Pull For Newsletter',
    };
    wf.nodes.push(restore);
  }
  return wf;
}

function wireNewsSocialBranch(wf, distributorId) {
  ensureSocialNodes(wf, distributorId);
  const pullOut = wf.connections['Pull Published News']?.main?.[0] || [];
  const newsletterEntry = pullOut.find((c) => c.node === 'Build News HTML')?.node || 'Build News HTML';
  wf.connections['Pull Published News'] = {
    main: [[{ node: 'Build Content Objects', type: 'main', index: 0 }]],
  };
  wf.connections['Build Content Objects'] = {
    main: [[{ node: 'Call Distributor', type: 'main', index: 0 }]],
  };
  wf.connections['Call Distributor'] = {
    main: [[{ node: 'Restore Pull For Newsletter', type: 'main', index: 0 }]],
  };
  wf.connections['Restore Pull For Newsletter'] = {
    main: [[{ node: newsletterEntry, type: 'main', index: 0 }]],
  };
  console.log('Wired NEWS social serial branch');
  return wf;
}

function buildSocialTestWorkflow(distributorId) {
  const webhookId = uid();
  return {
    name: 'SYSBILT - Social Test (webhook)',
    nodes: [
      {
        parameters: { path: 'sysbilt-social-test', httpMethod: 'POST', options: {} },
        type: 'n8n-nodes-base.webhook',
        typeVersion: 2,
        position: [0, 0],
        id: webhookId,
        name: 'Webhook',
        webhookId: webhookId,
      },
      {
        parameters: {
          method: 'POST',
          url: 'https://wdlc9pg8.api.sanity.io/v2021-06-07/data/query/production',
          sendBody: true,
          specifyBody: 'json',
          jsonBody: `={{ JSON.stringify({ query: ${JSON.stringify(PULL_PUBLISHED_QUERY)} }) }}`,
          options: {},
        },
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4.2,
        position: [240, 0],
        id: uid(),
        name: 'Pull Published News',
      },
      {
        parameters: { jsCode: BUILD_CONTENT_JS },
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [480, 0],
        id: uid(),
        name: 'Build Content Objects',
      },
      {
        parameters: {
          workflowId: { __rl: true, value: distributorId, mode: 'id' },
          workflowInputs: { mappingMode: 'passThrough' },
          mode: 'once',
          options: {},
        },
        type: 'n8n-nodes-base.executeWorkflow',
        typeVersion: 1.2,
        position: [720, 0],
        id: uid(),
        name: 'Call Distributor',
      },
    ],
    connections: {
      Webhook: { main: [[{ node: 'Pull Published News', type: 'main', index: 0 }]] },
      'Pull Published News': { main: [[{ node: 'Build Content Objects', type: 'main', index: 0 }]] },
      'Build Content Objects': { main: [[{ node: 'Call Distributor', type: 'main', index: 0 }]] },
    },
    settings: { executionOrder: 'v1' },
  };
}

async function ensureSlackCredential() {
  if (process.env.SLACK_CREDENTIAL_ID) return process.env.SLACK_CREDENTIAL_ID;
  if (existsSync(STATE_ENV)) {
    const m = readFileSync(STATE_ENV, 'utf8').match(/^SLACK_CREDENTIAL_ID=(.+)$/m);
    if (m) return m[1].trim();
  }
  try {
    const list = await n8n('GET', '/workflows?limit=100');
    for (const w of list.data || []) {
      const full = await n8n('GET', `/workflows/${w.id}`);
      for (const node of full.nodes || []) {
        const sid = node.credentials?.slackApi?.id;
        if (sid) {
          console.log('Reusing Slack credential from', full.name);
          return sid;
        }
      }
    }
  } catch (e) {
    console.warn('Slack credential scan failed:', e.message || e);
  }
  return '';
}

async function main() {
  console.log('Loading Browserless token from Mini…');
  const browserlessToken = loadBrowserlessToken();
  console.log('Token prefix:', browserlessToken.slice(0, 6) + '…');

  const postizCredId = await ensurePostizCredential();
  const slackCredId = await ensureSlackCredential();
  console.log('Slack:', slackCredId || 'skipped');
  const socialWf = buildSocialDistributeWorkflow(postizCredId, browserlessToken, slackCredId);
  const deployed = await upsertWorkflow(socialWf);
  await activateWorkflow(deployed.id, deployed.name);

  const testWf = buildSocialTestWorkflow(deployed.id);
  const testDeployed = await upsertWorkflow(testWf);
  await activateWorkflow(testDeployed.id, testDeployed.name);
  console.log(`Test webhook: POST ${N8N_BASE}/webhook/sysbilt-social-test`);

  try {
    const newsWf = await n8n('GET', `/workflows/${NEWS_WF_ID}`);
    let patched = wireNewsSocialBranch(newsWf, deployed.id);
    patched = updateNewsPullPublished(patched);
    patched = updateNewsBuildContent(patched);
    patched = updateNewsCallDistributor(patched, deployed.id);
    await n8n('PUT', `/workflows/${NEWS_WF_ID}`, {
      name: patched.name,
      nodes: patched.nodes,
      connections: patched.connections,
      settings: { executionOrder: patched.settings?.executionOrder || 'v1' },
    });
    console.log(`Patched NEWS workflow (${NEWS_WF_ID}) → distributor ${deployed.id}`);
  } catch (err) {
    console.warn('NEWS patch skipped:', err.message || err);
  }

  let state = '';
  if (existsSync(STATE_ENV)) state = readFileSync(STATE_ENV, 'utf8');
  const lines = state
    .split('\n')
    .filter(
      (l) =>
        l &&
        !l.startsWith('POSTIZ_CREDENTIAL_ID=') &&
        !l.startsWith('SOCIAL_DISTRIBUTE_WORKFLOW_ID=') &&
        !(slackCredId && l.startsWith('SLACK_CREDENTIAL_ID=')),
    );
  if (!lines[0] || !lines[0].startsWith('#')) {
    lines.unshift('# Generated by deploy-social-pipeline.mjs — do not commit');
  }
  lines.push(`POSTIZ_CREDENTIAL_ID=${postizCredId}`);
  lines.push(`SOCIAL_DISTRIBUTE_WORKFLOW_ID=${deployed.id}`);
  if (slackCredId) lines.push(`SLACK_CREDENTIAL_ID=${slackCredId}`);
  writeFileSync(STATE_ENV, `${lines.filter(Boolean).join('\n')}\n`);

  console.log('\nLane 1 Social Distribute live:');
  console.log('  Social: 1/day at 12:00 Sydney; 8+ dump on Sunday');
  console.log('  Full body HTML + first comment link; personal LI + Facebook only');
  console.log('  Company page: personal LinkedIn repost plug +2h (NO duplicate Postiz post)');
  console.log('  Slack #content + kill; force-schedule LI+FB; mark seen after success');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
