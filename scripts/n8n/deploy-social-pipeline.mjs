#!/usr/bin/env node
/**
 * Deploy SYSBILT - Social Distribute workflow and patch SYSBILT - NEWS.
 *
 * Env (from .env.local or shell):
 *   N8N_API_KEY          — n8n API key (cursor-mcp JWT)
 *   POSTIZ_API_KEY       — Postiz organization API key
 *   N8N_BASE_URL         — default https://n8n.sysbilt.com
 *   GROQ_CREDENTIAL_ID   — default ORWTg3G7S74Vwnfs
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
const GROQ_CRED_ID = process.env.GROQ_CREDENTIAL_ID || 'ORWTg3G7S74Vwnfs';
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

const GROQ_SYSTEM = `You write organic social posts for SYSBILT, a Sydney business systems consultancy, promoting one news article. Write two captions for the SAME article: one LinkedIn, one Facebook.
Rules: Australian English. No em dashes or en dashes. No exclamation marks. Use "we", never "I". Direct, practical, warm. No hype, no jargon. This is organic value, not an ad: no sales CTA, no mention of SYSBILT services or prices. You may invite people to read the full piece. End each caption with the link on its own line.
LinkedIn: 2 to 3 short paragraphs on why this matters to a small business owner, then 3 relevant hashtags.
Facebook: 1 to 2 short conversational sentences, then 2 relevant hashtags.
Return strict JSON only: {"linkedin":"...","facebook":"..."}`;

function buildSocialDistributeWorkflow(postizCredId) {
  const ids = {
    trigger: uid(),
    getIntegrations: uid(),
    buildTargets: uid(),
    prepareItems: uid(),
    loop: uid(),
    ifStub: uid(),
    stubCaptions: uid(),
    generateCaptions: uid(),
    parseCaptions: uid(),
    cleanupCaptions: uid(),
    uploadImage: uid(),
    mergeUpload: uid(),
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
      credentials: { httpHeaderAuth: { id: postizCredId, name: 'Postiz API' } },
    },
    {
      parameters: {
        jsCode: `const raw = $json;
const ints = Array.isArray(raw) ? raw : (raw.integrations || []);
const provider = (i) => i.providerIdentifier || i.platform || i.provider || i.identifier || '';
const linkedinTargets = ints
  .filter((i) => provider(i).includes('linkedin'))
  .map((i) => ({ id: i.id, provider: provider(i) }));
const facebookTargets = ints
  .filter((i) => provider(i) === 'facebook')
  .map((i) => ({ id: i.id, provider: provider(i) }));
return [{ json: { linkedinTargets, facebookTargets } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [480, 0],
      id: ids.buildTargets,
      name: 'Build Targets',
    },
    {
      parameters: {
        jsCode: `const trigger = $('Execute Workflow Trigger').first().json;
const items = trigger.items || [];
const mode = trigger.mode || { caption: 'model', postType: 'schedule' };
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
  out.push({ json: { ...it, index: i, slotISO: slot.toUTC().toISO(), mode } });
});
return out;`,
      },
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
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json.mode.caption }}',
              rightValue: 'stub',
              operator: { type: 'string', operation: 'equals' },
            },
          ],
          combinator: 'and',
        },
        options: {},
      },
      type: 'n8n-nodes-base.if',
      typeVersion: 2.2,
      position: [1200, 120],
      id: ids.ifStub,
      name: 'Stub mode?',
    },
    {
      parameters: {
        jsCode: `const t = $json.title;
return [{ json: { ...$json, linkedin: \`[[STUB LinkedIn]] \${t}\\n\${$json.link}\`, facebook: \`[[STUB Facebook]] \${t}\\n\${$json.link}\` } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1440, 0],
      id: ids.stubCaptions,
      name: 'Stub Captions',
    },
    {
      parameters: {
        method: 'POST',
        url: 'https://api.groq.com/openai/v1/chat/completions',
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={{ JSON.stringify({ model: 'llama-3.3-70b-versatile', temperature: 0.4, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: ${JSON.stringify(GROQ_SYSTEM)} }, { role: 'user', content: 'Article title: ' + $json.title + '. Summary: ' + $json.summary + '. Pillar: ' + $json.pillar + '. Link: ' + $json.link }] }) }}`,
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [1440, 240],
      id: ids.generateCaptions,
      name: 'Generate Captions',
      credentials: { httpHeaderAuth: { id: GROQ_CRED_ID, name: 'Groq' } },
    },
    {
      parameters: {
        jsCode: `const item = $('Loop Over Items').item.json;
const raw = $json.choices?.[0]?.message?.content || '{}';
const caps = JSON.parse(raw);
return [{ json: { ...item, linkedin: caps.linkedin, facebook: caps.facebook } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1680, 240],
      id: ids.parseCaptions,
      name: 'Parse Captions',
    },
    {
      parameters: { jsCode: CLEANUP_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1920, 120],
      id: ids.cleanupCaptions,
      name: 'Cleanup Captions',
    },
    {
      parameters: {
        method: 'POST',
        url: `${POSTIZ_BASE}/upload-from-url`,
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: '={{ JSON.stringify({ url: $json.imageUrl }) }}',
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [2160, 120],
      id: ids.uploadImage,
      name: 'Upload Image',
      credentials: { httpHeaderAuth: { id: postizCredId, name: 'Postiz API' } },
    },
    {
      parameters: {
        jsCode: `const prev = $('Cleanup Captions').first().json;
const up = $json;
return [{ json: { ...prev, uploadId: up.id, uploadPath: prev.imageUrl || up.path } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [2400, 120],
      id: ids.mergeUpload,
      name: 'Merge Upload',
    },
    {
      parameters: {
        jsCode: `const targets = $('Build Targets').first().json;
const img = { id: $json.uploadId, path: $json.uploadPath };
const posts = [];
for (const t of targets.linkedinTargets)
  posts.push({ integration: { id: t.id }, value: [{ content: $json.linkedin, image: [img] }], settings: { __type: t.provider } });
for (const t of targets.facebookTargets)
  posts.push({ integration: { id: t.id }, value: [{ content: $json.facebook, image: [img] }], settings: { __type: t.provider } });
return [{ json: { body: { type: $json.mode.postType, date: $json.slotISO, shortLink: false, tags: [], posts } } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [2640, 120],
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
      position: [2880, 120],
      id: ids.schedulePost,
      name: 'Schedule Post',
      credentials: { httpHeaderAuth: { id: postizCredId, name: 'Postiz API' } },
    },
    {
      parameters: {
        jsCode: `const trigger = $('Execute Workflow Trigger').first().json;
const count = (trigger.items || []).length;
return [{ json: { message: \`\${count} social post(s) queued in Postiz → https://postiz.sysbilt.com/launches\` } }];`,
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
    'Get Integrations': { main: [[{ node: 'Build Targets', type: 'main', index: 0 }]] },
    'Build Targets': { main: [[{ node: 'Prepare Items', type: 'main', index: 0 }]] },
    'Prepare Items': { main: [[{ node: 'Loop Over Items', type: 'main', index: 0 }]] },
    'Loop Over Items': {
      main: [
        [{ node: 'Queue Summary', type: 'main', index: 0 }],
        [{ node: 'Stub mode?', type: 'main', index: 0 }],
      ],
    },
    'Stub mode?': {
      main: [
        [{ node: 'Stub Captions', type: 'main', index: 0 }],
        [{ node: 'Generate Captions', type: 'main', index: 0 }],
      ],
    },
    'Stub Captions': { main: [[{ node: 'Cleanup Captions', type: 'main', index: 0 }]] },
    'Generate Captions': { main: [[{ node: 'Parse Captions', type: 'main', index: 0 }]] },
    'Parse Captions': { main: [[{ node: 'Cleanup Captions', type: 'main', index: 0 }]] },
    'Cleanup Captions': { main: [[{ node: 'Upload Image', type: 'main', index: 0 }]] },
    'Upload Image': { main: [[{ node: 'Merge Upload', type: 'main', index: 0 }]] },
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
    console.log(`Updated workflow "${workflow.name}" (${updated.id})`);
    return updated;
  }
  const created = await n8n('POST', '/workflows', body);
  console.log(`Created workflow "${workflow.name}" (${created.id})`);
  return created;
}

function patchNewsWorkflow(wf, distributorId) {
  const buildContentId = uid();
  const callDistributorId = uid();

  const buildContentNode = {
    parameters: {
      jsCode: `const rows = $json.result || [];
const items = rows.map((r) => ({
  type: 'news',
  title: r.title,
  summary: (r.introText || '').slice(0, 300),
  link: 'https://sysbilt.com/news',
  imageUrl: r.imageUrl || '',
  pillar: r.servicePillar || '',
  persona: r.revenuePhase || '',
}));
return [{ json: { items, mode: { caption: 'model', postType: 'schedule' } } }];`,
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
        mappingMode: 'defineBelow',
        value: {},
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

async function main() {
  const postizCredId = await ensurePostizCredential();
  const socialWf = buildSocialDistributeWorkflow(postizCredId);
  const deployed = await upsertWorkflow(socialWf);
  await activateWorkflow(deployed.id, deployed.name);

  const newsWf = await n8n('GET', `/workflows/${NEWS_WF_ID}`);
  const patched = patchNewsWorkflow(newsWf, deployed.id);
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

  console.log('\nDone. Test in n8n:');
  console.log('  Stage A: manual run Social Distribute with { items:[{...}], mode:{caption:"stub",postType:"draft"} }');
  console.log('  Stage B: mode:{caption:"model",postType:"draft"}');
  console.log('  Stage C: one item, mode:{caption:"model",postType:"schedule"}');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
