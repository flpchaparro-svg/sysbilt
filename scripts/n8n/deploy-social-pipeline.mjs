#!/usr/bin/env node
/**
 * Deploy SYSBILT - Social Distribute workflow and patch SYSBILT - NEWS.
 *
 * Env (from .env.local or shell):
 *   N8N_API_KEY          — n8n API key (cursor-mcp JWT)
 *   POSTIZ_API_KEY       — Postiz organization API key
 *   N8N_BASE_URL         — default https://n8n.sysbilt.com
 *   NEWS_WORKFLOW_ID     — default hB7YMEOcD7TLu3NZ
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');

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
const NEWS_WF_ID = process.env.NEWS_WORKFLOW_ID || 'hB7YMEOcD7TLu3NZ';
const POSTIZ_BASE = 'https://postiz.sysbilt.com/api/public/v1';

if (!N8N_KEY) {
  console.error('Missing N8N_API_KEY or cursor-mcp in .env.local');
  process.exit(1);
}
if (!POSTIZ_KEY) {
  console.error('Missing POSTIZ_API_KEY (Mac Mini ~/.config/sysbilt/postiz-secrets.env)');
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
return [{ json: j }];`;

const postizCred = (id) => ({ httpHeaderAuth: { id, name: 'Postiz API' } });

const PREPARE_ITEMS_JS = `const SANITY_QUERY = '*[_type == "newsItem" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...12] { _id, title, publishedAt, servicePillar, revenuePhase, "imageUrl": mainImage.asset->url, "introText": pt::text(body), sourceUrl }';

const sanityImage = (url) => {
  const u = (url || '').trim();
  if (!u.startsWith('https://cdn.sanity.io/images/')) return '';
  return u.split('?')[0];
};

const mapNewsRows = (rows) => (rows || [])
  .map((r) => ({
    type: 'news',
    title: (r.title || '').trim(),
    summary: (r.introText || '').trim(),
    link: 'https://sysbilt.com/news',
    imageUrl: sanityImage(r.imageUrl),
    pillar: r.servicePillar || '',
    persona: r.revenuePhase || '',
    sanityId: r._id,
  }))
  .filter((it) => it.title && it.summary && it.imageUrl);

let batch = $('Execute Workflow Trigger').first().json || {};
if (!(batch.items || []).length) {
  const fromInput = $input.first()?.json || {};
  if ((fromInput.items || []).length) batch = fromInput;
}

let items = batch.items || [];
const mode = batch.mode || { postType: 'schedule' };
const targets = $('Parse Integrations').first().json;

if (!items.length) {
  const res = await this.helpers.httpRequest({
    method: 'POST',
    url: 'https://wdlc9pg8.api.sanity.io/v2021-06-07/data/query/production',
    body: { query: SANITY_QUERY },
    json: true,
  });
  items = mapNewsRows(res.result);
  if (!items.length) {
    throw new Error('No published news with body text and main image in Sanity.');
  }
}

const SLOTS = [8, 13];
let day = DateTime.now().setZone('Australia/Sydney').plus({ days: 1 }).startOf('day');
const nextWeekday = (d) => { while (d.weekday > 5) d = d.plus({ days: 1 }); return d; };
day = nextWeekday(day);
const out = [];
let slotIdx = 0;
items.forEach((it, i) => {
  if (slotIdx >= SLOTS.length) { slotIdx = 0; day = nextWeekday(day.plus({ days: 1 })); }
  const slot = day.set({ hour: SLOTS[slotIdx], minute: 0, second: 0, millisecond: 0 });
  slotIdx++;
  out.push({ json: { ...it, index: i, slotISO: slot.toUTC().toISO(), mode, targets } });
});
return out;`;

const WRITE_POST_JS = `const title = ($json.title || '').trim();
const intro = ($json.summary || '').trim();
const lines = [title];
if (intro) lines.push(intro);
lines.push('See more news → https://sysbilt.com/news');
const caption = lines.join('\\n\\n');
return [{ json: { ...$json, linkedin: caption, facebook: caption } }];`;

function buildSocialDistributeWorkflow(postizCredId) {
  const ids = {
    trigger: uid(),
    getIntegrations: uid(),
    parseIntegrations: uid(),
    prepareItems: uid(),
    loop: uid(),
    writePost: uid(),
    cleanupCaptions: uid(),
    checkImage: uid(),
    ifValidImage: uid(),
    uploadImage: uid(),
    mergeUpload: uid(),
    skipImage: uid(),
    buildPayload: uid(),
    schedulePost: uid(),
    queueSummary: uid(),
  };

  const nodes = [
    {
      parameters: {
        inputSource: 'passthrough',
      },
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
      position: [240, 0],
      id: ids.getIntegrations,
      name: 'Get Integrations',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: {
        jsCode: `const rows = $input.all();
let ints;
if (rows.length > 1) {
  ints = rows.map((r) => r.json);
} else {
  const raw = rows[0]?.json ?? {};
  if (Array.isArray(raw)) ints = raw;
  else if (Array.isArray(raw.integrations)) ints = raw.integrations;
  else if (raw.id) ints = [raw];
  else ints = [];
}
const provider = (i) => i.providerIdentifier || i.platform || i.provider || i.identifier || '';
const active = ints.filter((i) => !i.disabled);
const targets = {
  linkedinTargets: active.filter((i) => provider(i).includes('linkedin')).map((i) => ({ id: i.id, provider: provider(i) })),
  facebookTargets: active.filter((i) => provider(i) === 'facebook').map((i) => ({ id: i.id, provider: provider(i) })),
};
if (!targets.linkedinTargets.length && !targets.facebookTargets.length) {
  throw new Error('No Postiz integrations connected. Got: ' + JSON.stringify(ints).slice(0, 400));
}
$getWorkflowStaticData('global').postizTargets = targets;
return [{ json: targets }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [480, 0],
      id: ids.parseIntegrations,
      name: 'Parse Integrations',
    },
    {
      parameters: { jsCode: PREPARE_ITEMS_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [720, 0],
      id: ids.prepareItems,
      name: 'Prepare Items',
    },
    {
      parameters: { batchSize: 1, options: {} },
      type: 'n8n-nodes-base.splitInBatches',
      typeVersion: 3,
      position: [960, 0],
      id: ids.loop,
      name: 'Loop Over Items',
    },
    {
      parameters: { jsCode: WRITE_POST_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1200, 120],
      id: ids.writePost,
      name: 'Write Post Copy',
    },
    {
      parameters: { jsCode: CLEANUP_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1440, 120],
      id: ids.cleanupCaptions,
      name: 'Cleanup Captions',
    },
    {
      parameters: {
        jsCode: `const url = ($json.imageUrl || '').trim();
return [{ json: { ...$json, hasValidImage: url.startsWith('https://cdn.sanity.io/images/') } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1560, 120],
      id: ids.checkImage,
      name: 'Check Image',
    },
    {
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json.hasValidImage }}',
              rightValue: true,
              operator: { type: 'boolean', operation: 'true' },
            },
          ],
          combinator: 'and',
        },
        options: {},
      },
      type: 'n8n-nodes-base.if',
      typeVersion: 2.2,
      position: [1680, 120],
      id: ids.ifValidImage,
      name: 'Valid image?',
    },
    {
      parameters: {
        method: 'POST',
        url: `${POSTIZ_BASE}/upload-from-url`,
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        sendBody: true,
        specifyBody: 'keypair',
        bodyParameters: {
          parameters: [{ name: 'url', value: '={{ ($json.imageUrl || "").split("?")[0] }}' }],
        },
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [1920, 0],
      id: ids.uploadImage,
      name: 'Upload Image',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: {
        jsCode: `const prev = $('Check Image').item.json;
const up = $json;
if (!up.id) throw new Error('Postiz image upload failed: ' + JSON.stringify(up).slice(0, 300));
const imagePath = (prev.imageUrl || '').split('?')[0];
return [{ json: { ...prev, uploadId: up.id, uploadPath: imagePath } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [2160, 0],
      id: ids.mergeUpload,
      name: 'Merge Upload',
    },
    {
      parameters: {
        jsCode: `throw new Error('News item missing valid Sanity image. imageUrl=' + ($json.imageUrl || 'none'));`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1920, 240],
      id: ids.skipImage,
      name: 'Skip Image',
    },
    {
      parameters: {
        jsCode: `const item = $input.item.json;
const targets = item.targets || $getWorkflowStaticData('global').postizTargets || { linkedinTargets: [], facebookTargets: [] };
const images = item.uploadId && item.uploadPath
  ? [{ id: item.uploadId, path: item.uploadPath }]
  : [];
const posts = [];
for (const t of targets.linkedinTargets || [])
  posts.push({ integration: { id: t.id }, value: [{ content: item.linkedin, image: images }], settings: { __type: t.provider } });
for (const t of targets.facebookTargets || [])
  posts.push({ integration: { id: t.id }, value: [{ content: item.facebook, image: images }], settings: { __type: t.provider, post_type: 'post' } });
if (!posts.length) {
  throw new Error('No posts to schedule. Check Postiz integrations and captions. targets=' + JSON.stringify(targets));
}
const mode = item.mode || { postType: 'schedule' };
const postType = mode.postType || 'schedule';
const date = item.slotISO || DateTime.now().plus({ days: 1 }).toUTC().toISO();
const body = { type: postType, date, shortLink: false, tags: [], posts };
return [{ json: { ...item, body } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [2160, 120],
      id: ids.buildPayload,
      name: 'Build Payload',
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
      position: [2400, 120],
      id: ids.schedulePost,
      name: 'Schedule Post',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: {
        jsCode: `const trigger = $('Execute Workflow Trigger').first().json;
const count = (trigger.items || []).length || $('Prepare Items').all().length;
return [{ json: { message: \`\${count} social post(s) queued in Postiz → https://postiz.sysbilt.com/launches\`, count } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1200, -160],
      id: ids.queueSummary,
      name: 'Queue Summary',
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
    'Cleanup Captions': { main: [[{ node: 'Check Image', type: 'main', index: 0 }]] },
    'Check Image': { main: [[{ node: 'Valid image?', type: 'main', index: 0 }]] },
    'Valid image?': {
      main: [
        [{ node: 'Upload Image', type: 'main', index: 0 }],
        [{ node: 'Skip Image', type: 'main', index: 0 }],
      ],
    },
    'Upload Image': { main: [[{ node: 'Merge Upload', type: 'main', index: 0 }]] },
    'Skip Image': { main: [[{ node: 'Build Payload', type: 'main', index: 0 }]] },
    'Merge Upload': { main: [[{ node: 'Build Payload', type: 'main', index: 0 }]] },
    'Build Payload': { main: [[{ node: 'Schedule Post', type: 'main', index: 0 }]] },
    'Schedule Post': { main: [[{ node: 'Loop Over Items', type: 'main', index: 0 }]] },
  };

  return {
    name: 'SYSBILT - Social Distribute',
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
  if (process.env.POSTIZ_CREDENTIAL_ID) {
    return process.env.POSTIZ_CREDENTIAL_ID;
  }
  try {
    const created = await n8n('POST', '/credentials', {
      name: 'Postiz API',
      type: 'httpHeaderAuth',
      data: { name: 'Authorization', value: POSTIZ_KEY },
    });
    console.log('Created Postiz API credential:', created.id);
    return created.id;
  } catch (err) {
    if (String(err.message).includes('already exists')) {
      throw new Error('Postiz credential may already exist — set POSTIZ_CREDENTIAL_ID and re-run');
    }
    throw err;
  }
}

async function activateWorkflow(id, name) {
  try {
    const activated = await n8n('POST', `/workflows/${id}/activate`, {});
    console.log(`Activated workflow "${name}" (${id})`);
    return activated;
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
    await clearWorkflowPinData(existing.id);
    console.log(`Updated workflow "${workflow.name}" (${updated.id})`);
    return updated;
  }
  const created = await n8n('POST', '/workflows', body);
  console.log(`Created workflow "${workflow.name}" (${created.id})`);
  return created;
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
  const full = { ...wf, pinData: {}, nodes: wf.nodes, connections: wf.connections, settings: wf.settings, name: wf.name };
  delete full.id;
  delete full.createdAt;
  delete full.updatedAt;
  delete full.versionId;
  delete full.meta;
  delete full.tags;
  delete full.active;
  await n8n('PUT', `/workflows/${workflowId}`, {
    name: full.name,
    nodes: full.nodes,
    connections: full.connections,
    settings: full.settings,
  });
  console.log('Pinned data may still exist — clear manually in n8n UI if needed');
}

const BUILD_CONTENT_JS = `const rows = $json.result || [];
const sanityImage = (url) => {
  const u = (url || '').trim();
  if (!u.startsWith('https://cdn.sanity.io/images/')) return '';
  return u.split('?')[0];
};
const items = rows
  .map((r) => ({
    type: 'news',
    title: (r.title || '').trim(),
    summary: (r.introText || '').trim(),
    link: 'https://sysbilt.com/news',
    imageUrl: sanityImage(r.imageUrl),
    pillar: r.servicePillar || '',
    persona: r.revenuePhase || '',
    sanityId: r._id,
  }))
  .filter((it) => it.title && it.summary && it.imageUrl);
if (!items.length) {
  throw new Error('No published news with both body text and main image. Add Main Visual in Sanity.');
}
return [{ json: { items, mode: { postType: 'schedule' } } }];`;

const PULL_PUBLISHED_QUERY =
  '*[_type == "newsItem" && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...12] { _id, title, publishedAt, servicePillar, revenuePhase, "imageUrl": mainImage.asset->url, "introText": pt::text(body), sourceUrl }';

function updateNewsPullPublished(wf) {
  const node = wf.nodes.find((n) => n.name === 'Pull Published News');
  if (node?.parameters) {
    node.parameters.jsonBody = `={{ JSON.stringify({ query: ${JSON.stringify(PULL_PUBLISHED_QUERY)} }) }}`;
    console.log('Updated Pull Published News (full body text for social)');
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
      options: {},
    };
    console.log('Updated Call Distributor (passThrough inputs)');
  }
  return wf;
}

function updateNewsBuildContent(wf) {
  const node = wf.nodes.find((n) => n.name === 'Build Content Objects');
  if (node) {
    node.parameters.jsCode = BUILD_CONTENT_JS;
    console.log('Updated Build Content Objects (Sanity copy, image required, schedule posts)');
  }
  return wf;
}

function patchNewsWorkflow(wf, distributorId) {
  const buildContentId = uid();
  const callDistributorId = uid();

  const buildContentNode = {
    parameters: {
      jsCode: BUILD_CONTENT_JS,
    },
    type: 'n8n-nodes-base.code',
    typeVersion: 2,
    position: [5008, -1040],
    id: buildContentId,
    name: 'Build Content Objects',
  };

  const callDistributorNode = {
    parameters: {
      workflowId: {
        __rl: true,
        value: distributorId,
        mode: 'id',
      },
      workflowInputs: {
        mappingMode: 'passThrough',
      },
      mode: 'once',
      options: {},
    },
    type: 'n8n-nodes-base.executeWorkflow',
    typeVersion: 1.2,
    position: [5248, -1040],
    id: callDistributorId,
    name: 'Call Distributor',
  };

  const hasBuild = wf.nodes.some((n) => n.name === 'Build Content Objects');
  if (hasBuild) {
    console.log('NEWS workflow already has Build Content Objects — skipping node add');
    return wf;
  }

  wf.nodes.push(buildContentNode, callDistributorNode);

  const conn = wf.connections['Pull Published News']?.main?.[0] || [];
  conn.push({ node: 'Build Content Objects', type: 'main', index: 0 });
  wf.connections['Pull Published News'] = { main: [conn] };
  wf.connections['Build Content Objects'] = {
    main: [[{ node: 'Call Distributor', type: 'main', index: 0 }]],
  };

  return wf;
}

function buildSocialTestWorkflow(distributorId) {
  const webhookId = uid();
  const pullId = uid();
  const buildId = uid();
  const callId = uid();

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
        id: pullId,
        name: 'Pull Published News',
      },
      {
        parameters: { jsCode: BUILD_CONTENT_JS },
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [480, 0],
        id: buildId,
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
        id: callId,
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

async function main() {
  const postizCredId = await ensurePostizCredential();
  const socialWf = buildSocialDistributeWorkflow(postizCredId);
  const deployed = await upsertWorkflow(socialWf);
  await activateWorkflow(deployed.id, deployed.name);

  const testWf = buildSocialTestWorkflow(deployed.id);
  const testDeployed = await upsertWorkflow(testWf);
  await activateWorkflow(testDeployed.id, testDeployed.name);
  console.log(`Test webhook: POST ${N8N_BASE}/webhook/sysbilt-social-test`);

  const newsWf = await n8n('GET', `/workflows/${NEWS_WF_ID}`);
  let patched = patchNewsWorkflow(newsWf, deployed.id);
  patched = updateNewsPullPublished(patched);
  patched = updateNewsBuildContent(patched);
  patched = updateNewsCallDistributor(patched, deployed.id);
  await n8n('PUT', `/workflows/${NEWS_WF_ID}`, {
    name: patched.name,
    nodes: patched.nodes,
    connections: patched.connections,
    settings: { executionOrder: patched.settings?.executionOrder || 'v1' },
  });
  console.log(`Patched NEWS workflow (${NEWS_WF_ID}) with social branch → distributor ${deployed.id}`);

  const statePath = resolve(__dirname, '.deploy-state.env');
  writeFileSync(
    statePath,
    `# Generated by deploy-social-pipeline.mjs — do not commit\nPOSTIZ_CREDENTIAL_ID=${postizCredId}\nSOCIAL_DISTRIBUTE_WORKFLOW_ID=${deployed.id}\n`,
  );
  console.log(`Wrote ${statePath}`);

  console.log('\nDone. Verify: node scripts/n8n/verify-sanity-post.mjs');
  console.log('Manual n8n test: paste real news JSON on Execute Workflow Trigger (no pinned data).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
