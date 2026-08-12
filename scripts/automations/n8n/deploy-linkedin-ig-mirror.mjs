#!/usr/bin/env node
/**
 * Deploy SYSBILT - LinkedIn → Instagram Mirror workflow to n8n.
 *
 * Polls Postiz for scheduled Felipe Chaparro (linkedin personal) posts,
 * transforms caption with plain code, schedules matching Instagram post.
 *
 * Env: N8N_API_KEY, POSTIZ_API_KEY (from .env.local / Mac Mini secrets)
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');

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
const POSTIZ_KEY = process.env.POSTIZ_API_KEY;
const POSTIZ_BASE = 'https://postiz.sysbilt.com/api/public/v1';
const POSTIZ_PUBLIC = 'https://postiz.sysbilt.com/api/public';

if (!N8N_KEY) {
  console.error('Missing N8N_API_KEY or cursor-mcp in .env.local');
  process.exit(1);
}
if (!POSTIZ_KEY) {
  console.error('Missing POSTIZ_API_KEY');
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

const RESOLVE_CHANNELS_JS = `const rows = $input.all().map(function(r) { return r.json; });
let ints = rows;
if (rows.length === 1) {
  const raw = rows[0];
  if (Array.isArray(raw)) ints = raw;
  else if (raw.integrations && Array.isArray(raw.integrations)) ints = raw.integrations;
  else if (raw.id) ints = [raw];
}
function provider(i) { return i.providerIdentifier || i.platform || i.identifier || ''; }
let linkedinPersonal = null;
let instagram = null;
for (const i of ints) {
  const p = provider(i);
  if (p === 'linkedin' && !linkedinPersonal) linkedinPersonal = i;
  if (p === 'instagram-standalone' && !instagram) instagram = i;
}
if (!linkedinPersonal || !linkedinPersonal.id || !instagram || !instagram.id) {
  throw new Error('Need linkedin personal + instagram-standalone integrations connected in Postiz');
}
$getWorkflowStaticData('global').mirrorTargets = {
  linkedinPersonalId: linkedinPersonal.id,
  instagramId: instagram.id,
};
return [{ json: { linkedinPersonalId: linkedinPersonal.id, instagramId: instagram.id } }];`;

const FILTER_CANDIDATES_JS = `const raw = $input.first()?.json ?? {};
const posts = Array.isArray(raw.posts) ? raw.posts : Array.isArray(raw) ? raw : [];
const staticData = $getWorkflowStaticData('global');
const mirrored = staticData.mirroredSourceIds || {};

const provider = (p) =>
  p.integration?.providerIdentifier || p.integration?.identifier || p.integration?.platform || '';
const isLinkedInPersonal = (p) => provider(p) === 'linkedin';

const igSlots = new Set(
  posts
    .filter((p) => provider(p) === 'instagram-standalone')
    .map((p) => new Date(p.publishDate).toISOString())
);

function extractHashtags(text) {
  const tags = (text || '').match(/#[\\w]+/g);
  return tags ? [...new Set(tags)].join(' ') : '';
}

function hasMatchingInstagram(post, allPosts) {
  const liTags = extractHashtags(post.content || '');
  if (!liTags) return false;
  const liWhen = new Date(post.publishDate).getTime();
  return allPosts.some((p) => {
    if (provider(p) !== 'instagram-standalone') return false;
    if (extractHashtags(p.content || '') !== liTags) return false;
    const diff = Math.abs(new Date(p.publishDate).getTime() - liWhen);
    return diff < 14 * 24 * 60 * 60 * 1000;
  });
}

function alreadyMirroredInPostiz(post) {
  const slot = new Date(post.publishDate).toISOString();
  return igSlots.has(slot) || hasMatchingInstagram(post, posts);
}

// First run: only skip LinkedIn posts that already have a matching Instagram slot.
if (!staticData.bootstrapComplete) {
  for (const p of posts) {
    if (isLinkedInPersonal(p) && !p.parentPostId && (p.content || '').length >= 400 && alreadyMirroredInPostiz(p)) {
      mirrored[p.id] = { skipped: 'bootstrap-already-has-ig', at: new Date().toISOString() };
    }
  }
  staticData.bootstrapComplete = true;
}

// Unblock mistaken bootstrap-existing marks and allow retry if the IG post was deleted.
for (const [id, meta] of Object.entries({ ...mirrored })) {
  if (meta?.instagramPostId && !posts.some((p) => p.id === meta.instagramPostId)) {
    delete mirrored[id];
    continue;
  }
  if (meta?.skipped === 'bootstrap-existing') {
    const post = posts.find((p) => p.id === id);
    if (post && !alreadyMirroredInPostiz(post)) delete mirrored[id];
  }
}

staticData.mirroredSourceIds = mirrored;

const now = Date.now();
const candidates = posts.filter((p) => {
  if (!isLinkedInPersonal(p)) return false;
  if (p.parentPostId) return false;
  if ((p.content || '').length < 400) return false;
  // Never mirror drafts. Lane charts / manual drafts must not create Instagram posts.
  // Only mirror real scheduled personal LinkedIn (QUEUE). Manual publish can be mirrored once it is queued.
  if (p.state !== 'QUEUE') return false;
  const tags = p.tags || [];
  const tagVals = tags.map((t) => (typeof t === 'string' ? t : (t?.value || t?.label || ''))).filter(Boolean);
  // Lane 1/2/3 and any post tagged to skip Instagram
  if (tagVals.includes('no-ig-mirror') || tagVals.includes('lane-1') || tagVals.includes('lane-2') || tagVals.includes('lane-3')) return false;
  const plain = String(p.content || '').replace(/<[^>]+>/g, ' ');
  // Belt-and-braces for Lane 2 chart copy (tags sometimes drop in Postiz)
  if (/Source in the first comment/i.test(plain) &&
      /(Imagine running a business|Salesforce is not just ahead|58% is the number|Five platforms on the chart|Who still owns|Create plus approve|distribution and measurement|Media Clean|week.?s distribution)/i.test(plain)) {
    return false;
  }
  if (/\blane-?2\b|\bno-ig-mirror\b/i.test(plain)) return false;
  if (mirrored[p.id]) return false;
  const when = new Date(p.publishDate).getTime();
  if (Number.isNaN(when) || when < now - 5 * 60 * 1000) return false;
  const slot = new Date(p.publishDate).toISOString();
  if (igSlots.has(slot)) return false;
  if (hasMatchingInstagram(p, posts)) return false;
  return true;
});

if (!candidates.length) {
  return [{ json: { skip: true, message: 'No new LinkedIn personal posts to mirror', count: 0 } }];
}

return candidates.map((p) => ({
  json: {
    sourcePostId: p.id,
    publishDate: p.publishDate,
    group: p.group,
    linkedinHtml: p.content || '',
    state: p.state,
  },
}));`;

const TRANSFORM_AND_BUILD_JS = `const LI_PERSONAL = 'linkedin';
const IG_PROVIDER = 'instagram-standalone';

function cleanText(s) {
  if (!s) return s;
  let t = s.replace(/[\\u2014\\u2013]/g, ',').replace(/!/g, '.');
  const au = [
    [/\\borganize\\b/gi, 'organise'], [/\\boptimize\\b/gi, 'optimise'],
    [/\\borganizing\\b/gi, 'organising'], [/\\boptimizing\\b/gi, 'optimising'],
    [/\\borganized\\b/gi, 'organised'], [/\\boptimized\\b/gi, 'optimised'],
    [/\\bcustomize\\b/gi, 'customise'], [/\\bcustomized\\b/gi, 'customised'],
    [/\\banalyze\\b/gi, 'analyse'], [/\\banalyzed\\b/gi, 'analysed'],
    [/\\brecognize\\b/gi, 'recognise'], [/\\brecognized\\b/gi, 'recognised'],
    [/\\bcentralize\\b/gi, 'centralise'], [/\\bcentralized\\b/gi, 'centralised'],
    [/\\bdigitize\\b/gi, 'digitise'], [/\\bdigitized\\b/gi, 'digitised'],
    [/\\bcolor\\b/gi, 'colour'], [/\\bcenter\\b/gi, 'centre'],
    [/\\bcentered\\b/gi, 'centred'], [/\\bfavor\\b/gi, 'favour'],
    [/\\bfavorite\\b/gi, 'favourite'], [/\\blabor\\b/gi, 'labour'], [/\\bhonor\\b/gi, 'honour'],
  ];
  for (const [p, r] of au) t = t.replace(p, r);
  return t;
}

function stripHtml(html) {
  return (html || '')
    .replace(/<p><\\/p>/gi, '\\n')
    .replace(/<br\\s*\\/?>/gi, '\\n')
    .replace(/<\\/p>/gi, '\\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\\n{3,}/g, '\\n\\n')
    .trim();
}

function extractHashtags(text) {
  const tags = (text || '').match(/#[\\w]+/g);
  return tags ? [...new Set(tags)].join(' ') : '';
}

function linkedinToInstagram(html) {
  const plain = cleanText(stripHtml(html));
  const hashtags = extractHashtags(plain);
  let body = plain.replace(/#[\\w]+/g, ' ').replace(/\\s+/g, ' ').trim();

  body = body.replace(/The full breakdown[^.?!]*[.?!]/gi, '');
  body = body.replace(/full review[^.?!]*available now[^.?!]*[.?!]/gi, '');
  body = body.replace(/link in (the )?comments?[^.?!]*[.?!]/gi, '');
  body = body.replace(/see (the )?first comment[^.?!]*[.?!]/gi, '');
  body = body.replace(/Link in bio[^.?!]*[.?!]/gi, '');
  body = body.replace(/\\s+/g, ' ').trim();

  const sentences = body.match(/[^.!?]+[.!?]+/g) || [body];
  let condensed = '';
  for (const s of sentences) {
    const next = (condensed + ' ' + s).trim();
    if (next.length > 520) break;
    condensed = next;
  }
  if (!condensed) condensed = body.slice(0, 520).trim();

  const parts = [condensed, 'Link in bio for the full review.'];
  if (hashtags) parts.push(hashtags);
  return parts.map((p) => '<p>' + p.trim() + '</p>').join('');
}

const prev = $('Filter Candidates').item.json;
const rawDetail = $input.first()?.json;
let detail = rawDetail;
if (Array.isArray(rawDetail)) detail = rawDetail[0];
if (!detail?.image && Array.isArray($input.all()[0]?.json)) {
  detail = $input.all()[0].json[0];
}
if (!detail?.id && !prev.sourcePostId) {
  throw new Error('Missing post detail for ' + prev.sourcePostId);
}

let images = detail?.image;
if (typeof images === 'string') {
  try { images = JSON.parse(images); } catch { images = []; }
}
if (!Array.isArray(images)) images = [];
images = images
  .filter((i) => i && i.id && i.path)
  .map((i) => ({ id: i.id, path: i.path }));
if (!images.length) {
  throw new Error('No images on LinkedIn post ' + prev.sourcePostId);
}

const targets = $getWorkflowStaticData('global').mirrorTargets;
if (!targets?.instagramId) {
  throw new Error('Instagram integration id not loaded');
}

const instagramHtml = linkedinToInstagram(prev.linkedinHtml || detail.content || '');
// Always schedule. Drafts are excluded upstream; never create IG drafts from this workflow.
const body = {
  type: 'schedule',
  date: prev.publishDate,
  shortLink: false,
  tags: [],
  posts: [{
    integration: { id: targets.instagramId },
    value: [{ content: instagramHtml, image: images }],
    settings: { __type: IG_PROVIDER, post_type: 'post' },
  }],
};

return [{
  json: {
    sourcePostId: prev.sourcePostId,
    publishDate: prev.publishDate,
    body,
    imageCount: images.length,
    captionPreview: stripHtml(instagramHtml).slice(0, 160),
  },
}];`;

const RECORD_MIRROR_JS = `const sourcePostId = $('Filter Candidates').item.json.sourcePostId;
const created = $input.first()?.json ?? {};
const createdId = created.id || created.postId || created?.posts?.[0]?.id || 'unknown';
const staticData = $getWorkflowStaticData('global');
if (!staticData.mirroredSourceIds) staticData.mirroredSourceIds = {};
staticData.mirroredSourceIds[sourcePostId] = {
  instagramPostId: createdId,
  at: new Date().toISOString(),
};
return [{
  json: {
    mirrored: true,
    sourcePostId,
    instagramPostId: createdId,
    message: 'Mirrored LinkedIn ' + sourcePostId + ' → Instagram ' + createdId,
  },
}];`;

function buildWorkflow(postizCredId) {
  const ids = {
    schedule: uid(),
    webhook: uid(),
    dateRange: uid(),
    getPosts: uid(),
    resolveIntegrations: uid(),
    filter: uid(),
    ifCandidates: uid(),
    noOp: uid(),
    loop: uid(),
    getDetail: uid(),
    build: uid(),
    scheduleIg: uid(),
    record: uid(),
    summary: uid(),
  };

  const nodes = [
    {
      parameters: {
        rule: { interval: [{ field: 'minutes', minutesInterval: 15 }] },
      },
      type: 'n8n-nodes-base.scheduleTrigger',
      typeVersion: 1.2,
      position: [0, 0],
      id: ids.schedule,
      name: 'Every 15 Minutes',
    },
    {
      parameters: {
        path: 'sysbilt-li-ig-mirror',
        httpMethod: 'POST',
        options: {},
      },
      type: 'n8n-nodes-base.webhook',
      typeVersion: 2,
      position: [0, 200],
      id: ids.webhook,
      name: 'Webhook (manual run)',
      webhookId: ids.webhook,
    },
    {
      parameters: {
        jsCode: `const start = DateTime.now().minus({ days: 1 }).toISODate();
const end = DateTime.now().plus({ days: 120 }).toISODate();
return [{ json: { startDate: start, endDate: end } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [280, 100],
      id: ids.dateRange,
      name: 'Date Range',
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
      position: [280, -80],
      id: ids.resolveIntegrations,
      name: 'Get Integrations',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: { jsCode: RESOLVE_CHANNELS_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [500, -80],
      id: uid(),
      name: 'Resolve Channels',
    },
    {
      parameters: {
        url: `=${POSTIZ_BASE}/posts?startDate={{ $('Date Range').item.json.startDate }}&endDate={{ $('Date Range').item.json.endDate }}`,
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [500, 100],
      id: ids.getPosts,
      name: 'Get Scheduled Posts',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: { jsCode: FILTER_CANDIDATES_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [720, 100],
      id: ids.filter,
      name: 'Filter Candidates',
    },
    {
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json.skip }}',
              rightValue: true,
              operator: { type: 'boolean', operation: 'notEquals' },
            },
          ],
          combinator: 'and',
        },
        options: {},
      },
      type: 'n8n-nodes-base.if',
      typeVersion: 2.2,
      position: [940, 100],
      id: ids.ifCandidates,
      name: 'Has candidates?',
    },
    {
      parameters: {
        jsCode: `return [{ json: { message: $json.message || 'Nothing to mirror', count: 0 } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1160, 240],
      id: ids.noOp,
      name: 'No Candidates',
    },
    {
      parameters: { batchSize: 1, options: {} },
      type: 'n8n-nodes-base.splitInBatches',
      typeVersion: 3,
      position: [1160, 0],
      id: ids.loop,
      name: 'Loop Candidates',
    },
    {
      parameters: {
        url: `=${POSTIZ_PUBLIC}/posts/{{ $json.sourcePostId }}`,
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [1380, 0],
      id: ids.getDetail,
      name: 'Get Post Images',
    },
    {
      parameters: { jsCode: TRANSFORM_AND_BUILD_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1600, 0],
      id: ids.build,
      name: 'Transform and Build',
    },
    {
      parameters: {
        method: 'POST',
        url: `${POSTIZ_BASE}/posts`,
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: '={{ JSON.stringify($json.body) }}',
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [1820, 0],
      id: ids.scheduleIg,
      name: 'Schedule Instagram',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: { jsCode: RECORD_MIRROR_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [2040, 0],
      id: ids.record,
      name: 'Record Mirror',
    },
    {
      parameters: {
        jsCode: `const items = $('Filter Candidates').all().filter((i) => !i.json.skip);
return [{ json: { message: 'Mirror run complete', mirroredCount: items.length } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1380, -160],
      id: ids.summary,
      name: 'Run Summary',
    },
  ];

  // Fix Resolve Channels id reference
  const resolveNode = nodes.find((n) => n.name === 'Resolve Channels');

  const connections = {
    'Every 15 Minutes': { main: [[{ node: 'Get Integrations', type: 'main', index: 0 }]] },
    'Webhook (manual run)': { main: [[{ node: 'Get Integrations', type: 'main', index: 0 }]] },
    'Get Integrations': { main: [[{ node: 'Resolve Channels', type: 'main', index: 0 }]] },
    'Resolve Channels': { main: [[{ node: 'Date Range', type: 'main', index: 0 }]] },
    'Date Range': { main: [[{ node: 'Get Scheduled Posts', type: 'main', index: 0 }]] },
    'Get Scheduled Posts': { main: [[{ node: 'Filter Candidates', type: 'main', index: 0 }]] },
    'Filter Candidates': { main: [[{ node: 'Has candidates?', type: 'main', index: 0 }]] },
    'Has candidates?': {
      main: [
        [{ node: 'Loop Candidates', type: 'main', index: 0 }],
        [{ node: 'No Candidates', type: 'main', index: 0 }],
      ],
    },
    'Loop Candidates': {
      main: [
        [{ node: 'Run Summary', type: 'main', index: 0 }],
        [{ node: 'Get Post Images', type: 'main', index: 0 }],
      ],
    },
    'Get Post Images': { main: [[{ node: 'Transform and Build', type: 'main', index: 0 }]] },
    'Transform and Build': { main: [[{ node: 'Schedule Instagram', type: 'main', index: 0 }]] },
    'Schedule Instagram': { main: [[{ node: 'Record Mirror', type: 'main', index: 0 }]] },
    'Record Mirror': { main: [[{ node: 'Loop Candidates', type: 'main', index: 0 }]] },
  };

  return {
    name: 'SYSBILT - LinkedIn → Instagram Mirror',
    nodes,
    connections,
    settings: { executionOrder: 'v1' },
  };
}

async function ensurePostizCredential() {
  const statePath = resolve(__dirname, '.deploy-state.env');
  if (!process.env.POSTIZ_CREDENTIAL_ID && existsSync(statePath)) {
    const m = readFileSync(statePath, 'utf8').match(/^POSTIZ_CREDENTIAL_ID=(.+)$/m);
    if (m) process.env.POSTIZ_CREDENTIAL_ID = m[1].trim();
  }
  if (process.env.POSTIZ_CREDENTIAL_ID) return process.env.POSTIZ_CREDENTIAL_ID;
  const created = await n8n('POST', '/credentials', {
    name: 'Postiz API',
    type: 'httpHeaderAuth',
    data: { name: 'Authorization', value: POSTIZ_KEY },
  });
  console.log('Created Postiz API credential:', created.id);
  return created.id;
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

async function activateWorkflow(id, name) {
  try {
    await n8n('POST', `/workflows/${id}/activate`, {});
    console.log(`Activated workflow "${name}" (${id})`);
  } catch (err) {
    if (!String(err.message).includes('already active')) throw err;
  }
}

async function main() {
  const postizCredId = await ensurePostizCredential();
  const workflow = buildWorkflow(postizCredId);
  const deployed = await upsertWorkflow(workflow);
  await activateWorkflow(deployed.id, deployed.name);

  const statePath = resolve(__dirname, '.deploy-state.env');
  const existing = existsSync(statePath) ? readFileSync(statePath, 'utf8') : '';
  const lines = existing
    .split('\n')
    .filter((l) => l && !l.startsWith('LI_IG_MIRROR_WORKFLOW_ID='));
  lines.push(`LI_IG_MIRROR_WORKFLOW_ID=${deployed.id}`);
  if (!lines.some((l) => l.startsWith('POSTIZ_CREDENTIAL_ID='))) {
    lines.push(`POSTIZ_CREDENTIAL_ID=${postizCredId}`);
  }
  writeFileSync(statePath, `${lines.filter(Boolean).join('\n')}\n`);
  console.log(`Wrote ${statePath}`);
  console.log(`\nManual trigger: POST ${N8N_BASE}/webhook/sysbilt-li-ig-mirror`);
  console.log('Test: schedule Felipe LinkedIn only (no Instagram), then webhook or wait 15 min.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
