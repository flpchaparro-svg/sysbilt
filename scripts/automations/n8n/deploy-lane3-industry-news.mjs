#!/usr/bin/env node
/**
 * Deploy SYSBILT - Lane 3 Industry News
 *
 * Webhook → fetch/paste article → DeepSeek (locked brief) → fill dark-dot card →
 * Browserless PNG → Postiz multipart upload → personal LinkedIn DRAFT
 * (caption + first comment = bare source URL).
 *
 *   node scripts/automations/n8n/deploy-lane3-industry-news.mjs
 *   node scripts/automations/n8n/deploy-lane3-industry-news.mjs --activate
 *
 * Env: N8N_API_KEY / cursor-mcp, POSTIZ_API_KEY
 * Browserless token: loaded at deploy from Mini secrets (injected into workflow, not committed)
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const CARD_PATH = resolve(ROOT, 'scripts/automations/social/cards/lane3-dot-grid.html');
const SOURCES_PATH = resolve(ROOT, 'scripts/automations/social/lane3-sources.json');
const MINI_HOST = process.env.SYSBILT_MINI_SSH || 'sysbilt@felipes-mac-mini-1.tail1e2dea.ts.net';

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
const POSTIZ_BASE = 'https://postiz.sysbilt.com/api/public/v1';
const DEEPSEEK_CRED = { id: 'XgmuWh1nV8XX7x83', name: 'SYSBILT DeepSeek' };
const LI_PERSONAL_FALLBACK = 'cmrvgawuy0005ob6ufwade18l';
const FB_FALLBACK = 'cmqdhhxms0001pe760w6chubg';

if (!N8N_KEY) {
  console.error('Missing N8N_API_KEY or cursor-mcp in .env.local');
  process.exit(1);
}

function loadPostizApiKey() {
  if (process.env.POSTIZ_API_KEY) return process.env.POSTIZ_API_KEY.trim();
  const local = resolve(process.env.HOME || '', '.config/sysbilt/postiz-secrets.env');
  if (existsSync(local)) {
    const m = readFileSync(local, 'utf8').match(/^POSTIZ_API_KEY=(.+)$/m);
    if (m) return m[1].trim();
  }
  try {
    return execSync(
      `ssh -o ConnectTimeout=15 -o BatchMode=yes ${MINI_HOST} 'grep ^POSTIZ_API_KEY= ~/.config/sysbilt/postiz-secrets.env | cut -d= -f2-'`,
      { encoding: 'utf8' },
    ).trim();
  } catch {
    return '';
  }
}

const POSTIZ_KEY_RESOLVED = loadPostizApiKey();
if (!POSTIZ_KEY_RESOLVED) {
  console.error('Missing POSTIZ_API_KEY');
  process.exit(1);
}
process.env.POSTIZ_API_KEY = POSTIZ_KEY_RESOLVED;
if (!existsSync(CARD_PATH)) {
  console.error('Missing card template:', CARD_PATH);
  process.exit(1);
}
if (!existsSync(SOURCES_PATH)) {
  console.error('Missing sources config:', SOURCES_PATH);
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

const WRITER_SYSTEM = `You write Lane 3 Industry News for Felipe's personal LinkedIn.

Output ONLY valid JSON with keys:
topic, headline_html, takeaway, length_class, theme, caption, first_comment

Rules:
- theme is always "theme-dark"
- length_class from headline character count (strip tags): under 40 → len-short, 40–75 → len-mid, over 75 → len-long
- Prefer headlines that fit on the card. Aim under ~70 characters when you can.
- headline_html may include a single <em>…</em> accent word. No period at end of headline.
- topic: 1–2 words (e.g. AI, Automation, Tools)
- Caption structure (locked):
  1) Operator-scene opener (put a growing-business owner inside a plain picture before jargon; works above LinkedIn "see more")
  2) Teach what happened in plain English (lab/source, what was tested, behaviour a non-tech owner follows)
  3) Turn: automation does what you told it; an agent works out what gets it the score and finds the loophole (often looking reasonable). Agents help when instructions are cracked and working. A human eye still sits on the whole picture.
  4) Human checkpoint on anything that moves money or makes a promise to a customer: quotes, refunds, supplier commitments, pricing. The rest can run on its own.
  5) End with exactly: Source in the first comment.
- Caption spacing (never bend): short paragraphs only. Separate every paragraph with a blank line (\\n\\n). Never one wall of text. Usually 4–6 short paragraphs. One or two sentences per paragraph.
- Do NOT write "My take:"
- No em dashes, no exclamation marks, no emojis, no SYSBILT product pitch, no book-a-call, no prices
- Australian English. Contractions on. Personal "I" allowed.
- Fact-check: prefer behaviour over shaky names/numbers. If the source contradicts itself on model nicknames or counts, omit the bad number. Every number you keep must be clearly from the source.
- first_comment: bare source URL only (no markdown)
- Caption length about 120–160 words
- Card is the hook. Caption teaches first, then takes a position.`;

function buildWorkflow(postizCredId, browserlessToken, slackCredId, slackChannel) {
  const cardHtml = readFileSync(CARD_PATH, 'utf8');
  const cardLiteral = JSON.stringify(cardHtml);
  const sources = JSON.parse(readFileSync(SOURCES_PATH, 'utf8'));
  const feeds = sources.feeds || [];
  const cron = sources.cadence?.pickCron || sources.cadence?.cron || '0 7 * * 2,4,6';
  const publishHour = Number(sources.cadence?.publishHourLocal ?? 11);
  const publishWeekdays = Array.isArray(sources.cadence?.publishWeekdays)
    ? sources.cadence.publishWeekdays
    : [2, 4, 6];

  const ids = {
    schedule: uid(),
    manualPick: uid(),
    mergeFeeds: uid(),
    pickStory: uid(),
    hasStory: uid(),
    noStory: uid(),
    webhook: uid(),
    normalise: uid(),
    needFetch: uid(),
    fetchArticle: uid(),
    mergeFetched: uid(),
    usePaste: uid(),
    buildPrompt: uid(),
    writer: uid(),
    parseWriter: uid(),
    fillCard: uid(),
    browserless: uid(),
    upload: uid(),
    integrations: uid(),
    buildDraft: uid(),
    createDraft: uid(),
    forceSchedule: uid(),
    buildSlack: uid(),
    slackNotify: uid(),
    summary: uid(),
    cancelWebhook: uid(),
    cancelNormalise: uid(),
    cancelStatus: uid(),
    cancelSummary: uid(),
  };
  const feedIds = feeds.map(() => uid());

  const PICK_STORY_JS = `const staticData = $getWorkflowStaticData('global');
const seen = staticData.lane3SeenUrls || {};
const now = Date.now();
const MAX_AGE_MS = 21 * 24 * 60 * 60 * 1000;
for (const [url, at] of Object.entries({ ...seen })) {
  if (!at || now - Number(at) > MAX_AGE_MS) delete seen[url];
}

const rows = $input.all().map((r) => r.json);
const items = [];
for (const row of rows) {
  if (!row) continue;
  if (Array.isArray(row.items)) {
    for (const it of row.items) items.push(it);
    continue;
  }
  items.push(row);
}

function linkOf(it) {
  return String(it.link || it.guid || it.id || it.url || '').trim();
}
function titleOf(it) {
  return String(it.title || '').trim();
}
function dateOf(it) {
  const raw = it.isoDate || it.pubDate || it.published || it.updated || '';
  const t = raw ? new Date(raw).getTime() : 0;
  return Number.isFinite(t) ? t : 0;
}

const scored = items
  .map((it) => ({
    title: titleOf(it),
    link: linkOf(it),
    when: dateOf(it),
  }))
  .filter((it) => it.link.startsWith('http') && it.title.length > 12)
  .sort((a, b) => b.when - a.when);

const pick = scored.find((it) => !seen[it.link]);
if (!pick) {
  return [{ json: { skip: true, message: 'No fresh Lane 3 stories in trusted feeds', count: scored.length } }];
}

seen[pick.link] = now;
staticData.lane3SeenUrls = seen;

return [{
  json: {
    skip: false,
    sourceUrl: pick.link,
    pastedText: '',
    articleText: '',
    needsFetch: true,
    pickedTitle: pick.title,
  },
}];`;

  const NO_STORY_JS = `const j = $input.first().json;
return [{ json: { ok: false, skipped: true, message: j.message || 'No story picked' } }];`;

  const BUILD_PROMPT_JS = `const j = $input.first().json;
const system = ${JSON.stringify(WRITER_SYSTEM)};
const prompt = system + '\\n\\nSOURCE URL:\\n' + (j.sourceUrl || '') + '\\n\\nARTICLE:\\n' + (j.articleText || '');
return [{ json: { ...j, writerPrompt: prompt } }];`;

  const NORMALISE_JS = `const raw = $input.first().json || {};
const body = raw.body && typeof raw.body === 'object' ? raw.body : raw;
const sourceUrl = String(body.sourceUrl || body.source_url || body.url || '').trim();
const pastedText = String(body.pastedText || body.pasted_text || body.articleText || '').trim();
if (!sourceUrl && !pastedText) {
  throw new Error('Provide sourceUrl and/or pastedText in the webhook JSON body');
}
return [{
  json: {
    sourceUrl,
    pastedText,
    articleText: pastedText,
    needsFetch: !pastedText && Boolean(sourceUrl),
  },
}];`;

  const MERGE_FETCHED_JS = `const prev = $('Normalise Input').item.json;
const fetched = $input.first().json;
let text = '';
if (typeof fetched === 'string') text = fetched;
else if (fetched.data) text = String(fetched.data);
else if (fetched.content) text = String(fetched.content);
else if (fetched.body) text = String(fetched.body);
else text = JSON.stringify(fetched);
text = text.replace(/\\r/g, '').trim();
if (text.length > 24000) text = text.slice(0, 24000);
if (text.length < 200) {
  throw new Error('Fetched article too short. Paste the article text as pastedText instead.');
}
return [{ json: { ...prev, articleText: text, needsFetch: false } }];`;

  const USE_PASTE_JS = `const prev = $input.first().json;
if (!prev.articleText || prev.articleText.length < 80) {
  throw new Error('pastedText too short');
}
return [{ json: { ...prev, needsFetch: false } }];`;

  const PARSE_WRITER_JS = `const prev = $('Build Writer Prompt').item.json;
const srcUrl = prev.sourceUrl || '';
let raw = $input.first().json || {};

// DeepSeek / OpenAI jsonOutput shapes
if (raw.message && typeof raw.message === 'object' && raw.message.content) {
  raw = raw.message.content;
}
if (typeof raw === 'string') {
  try { raw = JSON.parse(raw); } catch (e) {
    const m = raw.match(/\\{[\\s\\S]*\\}/);
    if (!m) throw new Error('Writer did not return JSON');
    raw = JSON.parse(m[0]);
  }
}
if (raw.output && typeof raw.output === 'object') raw = raw.output;

const topic = String(raw.topic || 'AI').trim().slice(0, 40);
let headline = String(raw.headline_html || raw.headline || '').trim();
headline = headline.replace(/[\\u2014\\u2013]/g, ',').replace(/!/g, '.');
if (!headline) throw new Error('Missing headline_html');
const takeaway = String(raw.takeaway || '').trim().replace(/[\\u2014\\u2013]/g, ',').replace(/!/g, '.');
let caption = String(raw.caption || '').trim();
caption = caption.replace(/[\\u2014\\u2013]/g, ',').replace(/!/g, '.');
if (!caption) throw new Error('Missing caption');
if (!/source in the first comment\\.?$/i.test(caption.trim())) {
  caption = caption.replace(/\\s+$/,'') + '\\n\\nSource in the first comment.';
}
// Hard rule: never ship a wall of text. Force blank lines between short paragraphs.
caption = (() => {
  let t = caption.replace(/\\r/g, '').trim();
  t = t.replace(/\\n{3,}/g, '\\n\\n');
  if (t.includes('\\n\\n')) return t;
  const sentences = t.split(/(?<=[.?!])\\s+/).map((s) => s.trim()).filter(Boolean);
  if (sentences.length <= 2) return t;
  const paras = [];
  for (let i = 0; i < sentences.length; i += 2) {
    paras.push(sentences.slice(i, i + 2).join(' '));
  }
  return paras.join('\\n\\n');
})();

const plainHeadline = headline.replace(/<[^>]+>/g, '');
let lengthClass = String(raw.length_class || '').trim();
if (!/^len-(short|mid|long)$/.test(lengthClass)) {
  const n = plainHeadline.length;
  lengthClass = n < 40 ? 'len-short' : n <= 75 ? 'len-mid' : 'len-long';
}

let firstComment = String(raw.first_comment || srcUrl || '').trim();
firstComment = firstComment.replace(/^<|>$/g, '').replace(/\\s+/g, '');
if (!/^https?:\\/\\//i.test(firstComment)) {
  if (srcUrl) firstComment = srcUrl;
  else throw new Error('Missing first_comment / sourceUrl');
}

return [{
  json: {
    sourceUrl: srcUrl || firstComment,
    topic,
    headline_html: headline,
    takeaway,
    length_class: lengthClass,
    theme: 'theme-dark',
    caption,
    first_comment: firstComment,
  },
}];`;

  const FILL_CARD_JS = `const TEMPLATE = ${cardLiteral};
const j = $input.first().json;
let html = TEMPLATE;
html = html.split('{{THEME}}').join('theme-dark');
html = html.split('{{LENGTH}}').join(j.length_class || 'len-mid');
html = html.split('{{TOPIC}}').join(String(j.topic || 'AI'));
html = html.split('{{HEADLINE}}').join(String(j.headline_html || ''));
html = html.split('{{TAKEAWAY}}').join(String(j.takeaway || ''));
if (html.includes('{{')) throw new Error('Unreplaced card placeholders remain');
return [{ json: { ...j, cardHtml: html } }];`;

  const BUILD_DRAFT_JS = `const writer = $('Parse Writer').item.json;
const up = $('Upload Image').item.json;
const intItems = $('Get Integrations').all().map((r) => r.json);
let ints = intItems;
if (intItems.length === 1) {
  const raw = intItems[0];
  if (Array.isArray(raw)) ints = raw;
  else if (raw.integrations && Array.isArray(raw.integrations)) ints = raw.integrations;
  else if (raw.data && Array.isArray(raw.data)) ints = raw.data;
  else if (raw.id) ints = [raw];
}
function provider(i) { return i.providerIdentifier || i.platform || i.identifier || ''; }
let linkedin = ints.find((i) => provider(i) === 'linkedin');
let facebook = ints.find((i) => provider(i) === 'facebook');
const linkedinId = (linkedin && linkedin.id) || '${LI_PERSONAL_FALLBACK}';
const facebookId = (facebook && facebook.id) || '${FB_FALLBACK}';
if (!up.id || !up.path) throw new Error('Postiz upload missing id/path: ' + JSON.stringify(up).slice(0, 300));

const paras = String(writer.caption || '')
  .split(/\\n\\n+/)
  .map((p) => p.trim())
  .filter(Boolean)
  .map((p) => '<p>' + p.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</p>')
  .join('');

// Live slot: reserved Lane 3 hour on Tue/Thu/Sat (Lane 1 skips those windows)
const publishHour = ${publishHour};
const publishWeekdays = ${JSON.stringify(publishWeekdays)};
let slotISO;
let slotLabel;
try {
  let slot = DateTime.now().setZone('Australia/Sydney').set({ hour: publishHour, minute: 0, second: 0, millisecond: 0 });
  if (slot <= DateTime.now().setZone('Australia/Sydney').plus({ minutes: 45 })) {
    slot = slot.plus({ days: 1 });
  }
  while (!publishWeekdays.includes(slot.weekday)) {
    slot = slot.plus({ days: 1 });
  }
  slotISO = slot.toUTC().toISO();
  slotLabel = slot.toFormat("ccc d LLL yyyy, HH:mm") + ' Sydney';
} catch (e) {
  const fallback = new Date(Date.now() + 5 * 60 * 60 * 1000);
  slotISO = fallback.toISOString();
  slotLabel = slotISO + ' (UTC fallback)';
}

const image = [{ id: up.id, path: up.path }];
const sourceComment = writer.first_comment;

const body = {
  type: 'schedule',
  date: slotISO,
  shortLink: false,
  tags: [
    { value: 'no-ig-mirror', label: 'no-ig-mirror' },
    { value: 'lane-3', label: 'lane-3' },
  ],
  posts: [
    {
      integration: { id: linkedinId },
      value: [
        { content: paras, image },
        { content: sourceComment, image: [] },
      ],
      settings: { __type: 'linkedin' },
    },
    {
      integration: { id: facebookId },
      value: [
        { content: paras, image },
        { content: sourceComment, image: [] },
      ],
      settings: { __type: 'facebook' },
    },
  ],
};

return [{
  json: {
    postizBody: body,
    linkedinId,
    facebookId,
    topic: writer.topic,
    headline: writer.headline_html,
    takeaway: writer.takeaway,
    caption: writer.caption,
    sourceUrl: writer.sourceUrl,
    uploadId: up.id,
    uploadPath: up.path,
    slotISO,
    slotLabel,
  },
}];`;

  const SUMMARY_JS = `const prev = $('Build Draft Payload').item.json;
const created = $('Create Scheduled Post').item.json;
const postId = created.postId || created.id || (Array.isArray(created) && created[0] && (created[0].postId || created[0].id)) || '';
const cancelUrl = 'https://n8n.sysbilt.com/webhook/sysbilt-lane3-cancel?postId=' + encodeURIComponent(postId);
const plainHeadline = String(prev.headline || '').replace(/<[^>]+>/g, '');
const slack_text = [
  '*Lane 3 ready* (LinkedIn personal + Facebook)',
  '',
  '*' + plainHeadline + '*',
  'Topic: ' + (prev.topic || ''),
  'Goes live: ' + (prev.slotLabel || prev.slotISO),
  '',
  'Review / edit in Postiz: https://postiz.sysbilt.com/launches',
  'Source: ' + (prev.sourceUrl || ''),
  '',
  'Do nothing → it posts at the time above on LinkedIn + Facebook.',
  'No Instagram for this lane.',
  'Kill it: ' + cancelUrl,
  'Or delete / edit in Postiz before that time.',
].join('\\n');

return [{
  json: {
    ok: true,
    message: 'Lane 3 scheduled. Auto-posts at the slot unless cancelled.',
    topic: prev.topic,
    headline: prev.headline,
    sourceUrl: prev.sourceUrl,
    linkedinId: prev.linkedinId,
    slotISO: prev.slotISO,
    slotLabel: prev.slotLabel,
    postId,
    cancelUrl,
    slack_text,
    postizResponse: created,
  },
}];`;

  const CANCEL_NORMALISE_JS = `const raw = $input.first().json || {};
const body = raw.body && typeof raw.body === 'object' ? raw.body : raw;
const q = raw.query || {};
const postId = String(body.postId || body.id || q.postId || q.id || '').trim();
if (!postId) throw new Error('Cancel needs postId query or body');
return [{ json: { postId } }];`;

  const CANCEL_SUMMARY_JS = `const postId = $('Cancel Normalise').item.json.postId;
const res = $input.first().json;
return [{
  json: {
    ok: true,
    cancelled: true,
    postId,
    message: 'Lane 3 post moved back to draft (will not publish).',
    postizResponse: res,
  },
}];`;

  const nodes = [
    {
      parameters: {
        rule: { interval: [{ field: 'cronExpression', expression: cron }] },
      },
      type: 'n8n-nodes-base.scheduleTrigger',
      typeVersion: 1.2,
      position: [-720, -200],
      id: ids.schedule,
      name: 'Daily 7am Sydney',
    },
    {
      parameters: {},
      type: 'n8n-nodes-base.manualTrigger',
      typeVersion: 1,
      position: [-720, 40],
      id: ids.manualPick,
      name: 'Manual Daily Pick',
    },
    ...feeds.map((feed, i) => ({
      parameters: {
        url: feed.url,
        options: {},
      },
      type: 'n8n-nodes-base.rssFeedRead',
      typeVersion: 1.1,
      position: [-480, -280 + i * 120],
      id: feedIds[i],
      name: `RSS ${feed.name}`,
      continueOnFail: true,
    })),
    {
      parameters: {
        mode: 'append',
        numberInputs: Math.max(feeds.length, 2),
        options: {},
      },
      type: 'n8n-nodes-base.merge',
      typeVersion: 3,
      position: [-200, -80],
      id: ids.mergeFeeds,
      name: 'Merge Feeds',
    },
    {
      parameters: { jsCode: PICK_STORY_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [40, -80],
      id: ids.pickStory,
      name: 'Pick Fresh Story',
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
              operator: { type: 'boolean', operation: 'true' },
            },
          ],
          combinator: 'and',
        },
        options: {},
      },
      type: 'n8n-nodes-base.if',
      typeVersion: 2.2,
      position: [240, -80],
      id: ids.hasStory,
      name: 'Skip?',
    },
    {
      parameters: { jsCode: NO_STORY_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [480, -200],
      id: ids.noStory,
      name: 'No Story',
    },
    {
      parameters: {
        path: 'sysbilt-lane3',
        httpMethod: 'POST',
        responseMode: 'lastNode',
        options: {},
      },
      type: 'n8n-nodes-base.webhook',
      typeVersion: 2,
      position: [0, 200],
      id: ids.webhook,
      name: 'Webhook',
      webhookId: ids.webhook,
    },
    {
      parameters: { jsCode: NORMALISE_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [240, 0],
      id: ids.normalise,
      name: 'Normalise Input',
    },
    {
      parameters: {
        conditions: {
          options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
          conditions: [
            {
              id: uid(),
              leftValue: '={{ $json.needsFetch }}',
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
      position: [480, 0],
      id: ids.needFetch,
      name: 'Need Fetch?',
    },
    {
      parameters: {
        method: 'GET',
        url: '=https://r.jina.ai/{{ $json.sourceUrl }}',
        sendHeaders: true,
        headerParameters: {
          parameters: [
            { name: 'Accept', value: 'text/plain' },
            { name: 'X-Return-Format', value: 'markdown' },
          ],
        },
        options: { timeout: 60000, response: { response: { responseFormat: 'text' } } },
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [720, -120],
      id: ids.fetchArticle,
      name: 'Fetch Article',
    },
    {
      parameters: { jsCode: MERGE_FETCHED_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [960, -120],
      id: ids.mergeFetched,
      name: 'Merge Fetched',
    },
    {
      parameters: { jsCode: USE_PASTE_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [720, 120],
      id: ids.usePaste,
      name: 'Use Pasted Text',
    },
    {
      parameters: { jsCode: BUILD_PROMPT_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1200, 0],
      id: ids.buildPrompt,
      name: 'Build Writer Prompt',
    },
    {
      parameters: {
        modelId: {
          __rl: true,
          value: 'deepseek-chat',
          mode: 'id',
          cachedResultName: 'deepseek-chat',
        },
        messages: {
          values: [{ content: '={{ $json.writerPrompt }}' }],
        },
        jsonOutput: true,
        options: { maxTokens: 1600, temperature: 0.35 },
      },
      type: '@n8n/n8n-nodes-langchain.openAi',
      typeVersion: 1.1,
      position: [1440, 0],
      id: ids.writer,
      name: 'DS Write Lane 3',
      credentials: { openAiApi: DEEPSEEK_CRED },
      retryOnFail: true,
      maxTries: 2,
      waitBetweenTries: 5000,
    },
    {
      parameters: { jsCode: PARSE_WRITER_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1680, 0],
      id: ids.parseWriter,
      name: 'Parse Writer',
    },
    {
      parameters: { jsCode: FILL_CARD_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1920, 0],
      id: ids.fillCard,
      name: 'Fill Card HTML',
    },
    {
      parameters: {
        method: 'POST',
        url: `http://127.0.0.1:3010/chromium/screenshot?token=${browserlessToken}`,
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={{ JSON.stringify({ html: $json.cardHtml, options: { type: 'png' }, viewport: { width: 1080, height: 1350, deviceScaleFactor: 3 }, gotoOptions: { waitUntil: 'networkidle0' }, waitForTimeout: 5000 }) }}`,
        options: {
          timeout: 90000,
          response: { response: { responseFormat: 'file', outputPropertyName: 'data' } },
        },
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [2160, 0],
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
      position: [2400, 0],
      id: ids.upload,
      name: 'Upload Image',
      credentials: postizCred(postizCredId),
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
      position: [2640, 0],
      id: ids.integrations,
      name: 'Get Integrations',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: { jsCode: BUILD_DRAFT_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [2880, 0],
      id: ids.buildDraft,
      name: 'Build Draft Payload',
    },
    {
      parameters: {
        method: 'POST',
        url: `${POSTIZ_BASE}/posts`,
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: '={{ JSON.stringify($json.postizBody) }}',
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [3120, 0],
      id: ids.createDraft,
      name: 'Create Scheduled Post',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: {
        method: 'PUT',
        url: `=${POSTIZ_BASE}/posts/{{ $json.postId || $json.id }}/status`,
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: '={{ JSON.stringify({ status: "schedule" }) }}',
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [3240, 0],
      id: ids.forceSchedule,
      name: 'Force Schedule (LI)',
      credentials: postizCred(postizCredId),
      continueOnFail: true,
    },
    {
      parameters: { jsCode: SUMMARY_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [3360, 0],
      id: ids.buildSlack,
      name: 'Build Slack Alert',
    },
    slackCredId
      ? {
          parameters: {
            select: 'channel',
            channelId: {
              __rl: true,
              value: slackChannel,
              mode: 'name',
            },
            text: '={{ $json.slack_text }}',
            otherOptions: {},
          },
          type: 'n8n-nodes-base.slack',
          typeVersion: 2.2,
          position: [3600, 0],
          id: ids.slackNotify,
          name: 'Slack Notify',
          credentials: {
            slackApi: { id: slackCredId, name: 'SYSBILT Slack' },
          },
          continueOnFail: true,
        }
      : {
          parameters: {
            jsCode: `return $input.all();`,
          },
          type: 'n8n-nodes-base.code',
          typeVersion: 2,
          position: [3600, 0],
          id: ids.slackNotify,
          name: 'Slack Skip (no credential)',
        },
    {
      parameters: {
        jsCode: `const j = $input.first().json;
return [{ json: { ...j, slackSent: ${slackCredId ? 'true' : 'false'} } }];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [3840, 0],
      id: ids.summary,
      name: 'Summary',
    },
    {
      parameters: {
        path: 'sysbilt-lane3-cancel',
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
      parameters: { jsCode: CANCEL_NORMALISE_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [240, 420],
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
      position: [480, 420],
      id: ids.cancelStatus,
      name: 'Demote To Draft',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: { jsCode: CANCEL_SUMMARY_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [720, 420],
      id: ids.cancelSummary,
      name: 'Cancel Summary',
    },
  ];

  const afterSlack = slackCredId ? 'Slack Notify' : 'Slack Skip (no credential)';

  const connections = {
    'Daily 7am Sydney': {
      main: [feeds.map((feed) => ({ node: `RSS ${feed.name}`, type: 'main', index: 0 }))],
    },
    'Manual Daily Pick': {
      main: [feeds.map((feed) => ({ node: `RSS ${feed.name}`, type: 'main', index: 0 }))],
    },
    ...Object.fromEntries(
      feeds.map((feed, i) => [
        `RSS ${feed.name}`,
        { main: [[{ node: 'Merge Feeds', type: 'main', index: i }]] },
      ]),
    ),
    'Merge Feeds': { main: [[{ node: 'Pick Fresh Story', type: 'main', index: 0 }]] },
    'Pick Fresh Story': { main: [[{ node: 'Skip?', type: 'main', index: 0 }]] },
    'Skip?': {
      main: [
        [{ node: 'No Story', type: 'main', index: 0 }],
        [{ node: 'Normalise Input', type: 'main', index: 0 }],
      ],
    },
    Webhook: { main: [[{ node: 'Normalise Input', type: 'main', index: 0 }]] },
    'Normalise Input': { main: [[{ node: 'Need Fetch?', type: 'main', index: 0 }]] },
    'Need Fetch?': {
      main: [
        [{ node: 'Fetch Article', type: 'main', index: 0 }],
        [{ node: 'Use Pasted Text', type: 'main', index: 0 }],
      ],
    },
    'Fetch Article': { main: [[{ node: 'Merge Fetched', type: 'main', index: 0 }]] },
    'Merge Fetched': { main: [[{ node: 'Build Writer Prompt', type: 'main', index: 0 }]] },
    'Use Pasted Text': { main: [[{ node: 'Build Writer Prompt', type: 'main', index: 0 }]] },
    'Build Writer Prompt': { main: [[{ node: 'DS Write Lane 3', type: 'main', index: 0 }]] },
    'DS Write Lane 3': { main: [[{ node: 'Parse Writer', type: 'main', index: 0 }]] },
    'Parse Writer': { main: [[{ node: 'Fill Card HTML', type: 'main', index: 0 }]] },
    'Fill Card HTML': { main: [[{ node: 'Browserless Screenshot', type: 'main', index: 0 }]] },
    'Browserless Screenshot': { main: [[{ node: 'Upload Image', type: 'main', index: 0 }]] },
    'Upload Image': { main: [[{ node: 'Get Integrations', type: 'main', index: 0 }]] },
    'Get Integrations': { main: [[{ node: 'Build Draft Payload', type: 'main', index: 0 }]] },
    'Build Draft Payload': { main: [[{ node: 'Create Scheduled Post', type: 'main', index: 0 }]] },
    'Create Scheduled Post': { main: [[{ node: 'Force Schedule (LI)', type: 'main', index: 0 }]] },
    'Force Schedule (LI)': { main: [[{ node: 'Build Slack Alert', type: 'main', index: 0 }]] },
    'Build Slack Alert': { main: [[{ node: afterSlack, type: 'main', index: 0 }]] },
    [afterSlack]: { main: [[{ node: 'Summary', type: 'main', index: 0 }]] },
    'Cancel Webhook': { main: [[{ node: 'Cancel Normalise', type: 'main', index: 0 }]] },
    'Cancel Normalise': { main: [[{ node: 'Demote To Draft', type: 'main', index: 0 }]] },
    'Demote To Draft': { main: [[{ node: 'Cancel Summary', type: 'main', index: 0 }]] },
  };

  return {
    name: 'SYSBILT - Lane 3 Industry News',
    nodes,
    connections,
    settings: { executionOrder: 'v1', timezone: 'Australia/Sydney' },
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
    data: { name: 'Authorization', value: POSTIZ_KEY_RESOLVED },
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

async function ensureSlackCredential() {
  const statePath = resolve(__dirname, '.deploy-state.env');
  if (!process.env.SLACK_CREDENTIAL_ID && existsSync(statePath)) {
    const m = readFileSync(statePath, 'utf8').match(/^SLACK_CREDENTIAL_ID=(.+)$/m);
    if (m) process.env.SLACK_CREDENTIAL_ID = m[1].trim();
  }
  if (process.env.SLACK_CREDENTIAL_ID) return process.env.SLACK_CREDENTIAL_ID;

  // Prefer credential already attached to DM Lead Intake
  try {
    const { data } = await n8n('GET', '/workflows?limit=250');
    const dm = data?.find((w) => /DM Lead Intake/i.test(w.name || ''));
    if (dm?.id) {
      const full = await n8n('GET', `/workflows/${dm.id}`);
      for (const node of full.nodes || []) {
        const sid = node.credentials?.slackApi?.id;
        if (sid) {
          console.log('Reusing Slack credential from', dm.name, sid);
          return sid;
        }
      }
    }
  } catch (e) {
    console.warn('Could not scan workflows for Slack credential:', e.message || e);
  }

  const token = process.env.SLACK_BOT_TOKEN;
  if (!token) {
    console.warn(
      'No Slack credential and no SLACK_BOT_TOKEN. Machine still schedules posts; Slack alert skipped until you add SYSBILT Slack in n8n.',
    );
    return null;
  }
  const created = await n8n('POST', '/credentials', {
    name: 'SYSBILT Slack',
    type: 'slackApi',
    data: { accessToken: token, notice: '' },
  });
  console.log('Created Slack credential:', created.id);
  return created.id;
}

async function main() {
  const activate = process.argv.includes('--activate');
  const postizCredId = await ensurePostizCredential();
  const slackCredId = await ensureSlackCredential();
  const slackChannel = process.env.SLACK_LANE3_CHANNEL || process.env.SLACK_DM_CHANNEL || '#lane3';
  console.log('Loading Browserless token from Mini…');
  const browserlessToken = loadBrowserlessToken();
  console.log('Token prefix:', browserlessToken.slice(0, 6) + '…');
  console.log('Slack:', slackCredId ? `${slackCredId} → ${slackChannel}` : 'skipped');

  const workflow = buildWorkflow(postizCredId, browserlessToken, slackCredId, slackChannel);
  const deployed = await upsertWorkflow(workflow);

  if (activate) {
    await n8n('POST', `/workflows/${deployed.id}/activate`, {});
    console.log('Activated');
  } else {
    try {
      await n8n('POST', `/workflows/${deployed.id}/deactivate`, {});
    } catch {
      /* ok */
    }
    console.log('Deployed inactive (pass --activate to enable webhook)');
  }

  const statePath = resolve(__dirname, '.deploy-state.env');
  const existing = existsSync(statePath) ? readFileSync(statePath, 'utf8') : '';
  const lines = existing
    .split('\n')
    .filter(
      (l) =>
        l &&
        !l.startsWith('LANE3_INDUSTRY_NEWS_WORKFLOW_ID=') &&
        !(slackCredId && l.startsWith('SLACK_CREDENTIAL_ID=')),
    );
  lines.push(`LANE3_INDUSTRY_NEWS_WORKFLOW_ID=${deployed.id}`);
  if (!lines.some((l) => l.startsWith('POSTIZ_CREDENTIAL_ID='))) {
    lines.push(`POSTIZ_CREDENTIAL_ID=${postizCredId}`);
  }
  if (slackCredId && !lines.some((l) => l.startsWith('SLACK_CREDENTIAL_ID='))) {
    lines.push(`SLACK_CREDENTIAL_ID=${slackCredId}`);
  }
  writeFileSync(statePath, `${lines.filter(Boolean).join('\n')}\n`);

  console.log(`\nWorkflow: ${N8N_BASE}/workflow/${deployed.id}`);
  const publishHour = Number(
    JSON.parse(readFileSync(SOURCES_PATH, 'utf8')).cadence?.publishHourLocal ?? 11,
  );
  console.log('Machine:');
  console.log('  07:00 Sydney Tue/Thu/Sat → pick AI story (skip if none) → write → card → schedule LI+FB for ' + String(publishHour).padStart(2, '0') + ':00 (3/week)');
  console.log('  Do nothing → it goes live at that hour on LinkedIn personal + Facebook (no Instagram)');
  console.log('  Kill: cancel link in Slack / Postiz, or GET webhook sysbilt-lane3-cancel?postId=…');
  console.log('  Manual URL override still: POST /webhook/sysbilt-lane3');
  console.log('Sources:', SOURCES_PATH);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
