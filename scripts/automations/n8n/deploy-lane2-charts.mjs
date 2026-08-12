#!/usr/bin/env node
/**
 * Deploy SYSBILT - Lane 2 Charts
 *
 * Topic bank → fill HTML chart template → Browserless PNG → DeepSeek caption
 * → Postiz schedule (personal LinkedIn + Facebook).
 *
 *   node scripts/automations/n8n/deploy-lane2-charts.mjs
 *   node scripts/automations/n8n/deploy-lane2-charts.mjs --activate
 *
 * Env: N8N_API_KEY / cursor-mcp, POSTIZ_API_KEY
 * Browserless token: loaded at deploy from Mini secrets
 */
import { readFileSync, existsSync, writeFileSync, readdirSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const TOPICS_PATH = resolve(ROOT, 'scripts/automations/social/lane2-topics.json');
const CARDS_DIR = resolve(ROOT, 'scripts/automations/social/cards/lane2');
const MINI_HOST = process.env.SYSBILT_MINI_SSH || 'sysbilt@felipes-mac-mini-1.tail1e2dea.ts.net';
const STATE_ENV = resolve(__dirname, '.deploy-state.env');

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
if (!existsSync(TOPICS_PATH)) {
  console.error('Missing topics bank:', TOPICS_PATH);
  process.exit(1);
}
if (!existsSync(CARDS_DIR)) {
  console.error('Missing cards dir:', CARDS_DIR);
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

const POSTIZ_KEY_RESOLVED = loadPostizApiKey();
if (!POSTIZ_KEY_RESOLVED) {
  console.error('Missing POSTIZ_API_KEY');
  process.exit(1);
}
process.env.POSTIZ_API_KEY = POSTIZ_KEY_RESOLVED;

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

function loadTemplates() {
  const out = {};
  for (const name of readdirSync(CARDS_DIR)) {
    if (!name.endsWith('.html')) continue;
    const id = name.replace(/\.html$/, '');
    out[id] = readFileSync(resolve(CARDS_DIR, name), 'utf8');
  }
  if (!out['01-bars']) throw new Error('Missing 01-bars.html template');
  return out;
}

const WRITER_SYSTEM = `You write Lane 2 Charts for Felipe's personal LinkedIn.

Output ONLY valid JSON with keys:
caption, first_comment

Core rule: the chart does the what. The caption does the arithmetic.
If a number is visible on the card, do not restate it unless you are doing something to it.

Caption structure (locked):
1) The relationship, not the headline. Open with what is behind the number: gap, ratio, who owns what. Do not re-read the chart.
2) One derived number from the banked "derived" list. Something the reader cannot see on the card. Never invent maths.
3) The caveat from the bank. What the number does not mean, or who reads it wrong.
4) Your position from the bank, tied to a growing business. Write it so it sounds like Felipe, not a template.
5) End with exactly: Source in the first comment.

Freshness / tense (hard):
- Name the source period when it matters (June 2026, 2024 survey, illustrative pattern).
- Do not write as if an old study is a live ranking. Never "who still owns", "still the winner", or "right now the market leader is" unless sourceYear is the current calendar year or sourceAsOf is within six months.
- If softClaim is true, soften with around / roughly / surveys put it near.

Hard bans:
- No listing the bars or segments shown on the image
- No "that is not a typo"
- No "the real battle is X"
- No "My take:"
- No em dashes, no exclamation marks, no emojis, no SYSBILT product pitch, no book-a-call, no prices
- Never say "small business" or "small teams"

Voice:
- Australian English. Contractions on. Personal "I" allowed sparingly.
- Short paragraphs only. Blank line between each (\\n\\n). Usually 4–6 paragraphs. About 100–160 words.
- Write like someone who actually read the study and has an opinion. Not a dashboard readout.
- Use ONLY banked relationship / derived / caveat / position / numbers. If softClaim is true, soften.
- If the source is illustrative / SYSBILT pattern, say so plainly.
- first_comment: bare source URL only (no markdown)`;

function buildWorkflow(postizCredId, browserlessToken, slackCredId, slackChannel) {
  const bank = JSON.parse(readFileSync(TOPICS_PATH, 'utf8'));
  const templates = loadTemplates();
  const cron = bank.cadence?.pickCron || '0 8 * * 1,3';
  const publishHour = Number(bank.cadence?.publishHourLocal ?? 15);
  const publishWeekdays = Array.isArray(bank.cadence?.publishWeekdays)
    ? bank.cadence.publishWeekdays
    : [1, 3];
  const reuseAfterDays = Number(bank.cadence?.reuseAfterDays ?? 60);
  const maxAgeMonths = Number(bank.cadence?.maxAgeMonths ?? 6);
  const bankLiteral = JSON.stringify(bank);
  const templatesLiteral = JSON.stringify(templates);

  const ids = {
    schedule: uid(),
    manualPick: uid(),
    webhook: uid(),
    pickTopic: uid(),
    skipIf: uid(),
    noTopic: uid(),
    fillCard: uid(),
    browserless: uid(),
    upload: uid(),
    buildPrompt: uid(),
    writer: uid(),
    parseWriter: uid(),
    integrations: uid(),
    buildDraft: uid(),
    createDraft: uid(),
    expandCreated: uid(),
    forceSchedule: uid(),
    keepOne: uid(),
    buildSlack: uid(),
    slackNotify: uid(),
    summary: uid(),
    cancelWebhook: uid(),
    cancelNormalise: uid(),
    cancelStatus: uid(),
    cancelSummary: uid(),
  };

  const PICK_TOPIC_JS = `const BANK = ${bankLiteral};
const staticData = $getWorkflowStaticData('global');
const seen = staticData.lane2SeenTopics || {};
const now = Date.now();
const REUSE_MS = ${reuseAfterDays} * 24 * 60 * 60 * 1000;
const MAX_AGE_MONTHS = ${maxAgeMonths};
for (const [id, at] of Object.entries({ ...seen })) {
  if (!at || now - Number(at) > REUSE_MS) delete seen[id];
}

function topicAsOfMs(t) {
  if (t.sourceAsOf) {
    const ms = Date.parse(String(t.sourceAsOf));
    if (!Number.isNaN(ms)) return ms;
  }
  const y = Number(t.sourceYear);
  if (Number.isFinite(y) && y > 1970) return Date.UTC(y, 0, 1);
  return 0;
}

function isFresh(t) {
  if (t.active === false) return false;
  const asOf = topicAsOfMs(t);
  if (!asOf) return false;
  const currentYear = new Date().getUTCFullYear();
  const yearOk = Number(t.sourceYear) === currentYear;
  const cutoff = new Date();
  cutoff.setUTCMonth(cutoff.getUTCMonth() - MAX_AGE_MONTHS);
  const ageOk = asOf >= cutoff.getTime();
  return yearOk || ageOk;
}

const raw = $input.first().json || {};
const body = raw.body && typeof raw.body === 'object' ? raw.body : raw;
const forcedId = String(body.topicId || body.id || '').trim();
const topics = BANK.topics || [];
const fresh = topics.filter(isFresh);

let pick = null;
if (forcedId) {
  pick = topics.find((t) => t.id === forcedId);
  if (!pick) throw new Error('Unknown topicId: ' + forcedId);
  if (!isFresh(pick)) {
    throw new Error('Topic ' + forcedId + ' is inactive or stale (need current year or source within ' + MAX_AGE_MONTHS + ' months). ' + (pick.inactiveReason || ''));
  }
} else {
  pick = fresh.find((t) => !seen[t.id]);
}

if (!pick) {
  staticData.lane2SeenTopics = seen;
  return [{ json: { skip: true, message: 'No fresh Lane 2 topics left in bank (active + current year or within ' + MAX_AGE_MONTHS + ' months)', count: topics.length, freshCount: fresh.length } }];
}

seen[pick.id] = now;
staticData.lane2SeenTopics = seen;

return [{
  json: {
    skip: false,
    topic: pick,
    publishHour: ${publishHour},
    publishWeekdays: ${JSON.stringify(publishWeekdays)},
  },
}];`;

  const NO_TOPIC_JS = `const j = $input.first().json;
return [{ json: { ok: false, skipped: true, message: j.message || 'No topic picked' } }];`;

  const FILL_CARD_JS = `const TEMPLATES = ${templatesLiteral};
const { topic, publishHour } = $input.first().json;
const templateId = String(topic.template || '01-bars');
const shell = TEMPLATES[templateId];
if (!shell) throw new Error('Unknown template: ' + templateId);

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
function titleHtml(raw) {
  const s = String(raw || '');
  const re = /<em>([\\s\\S]*?)<\\/em>/i;
  const m = s.match(re);
  if (!m) return esc(s);
  const before = esc(s.slice(0, m.index));
  const mid = esc(m[1]);
  const after = esc(s.slice(m.index + m[0].length));
  return before + '<em>' + mid + '</em>' + after;
}
function plainTitle(raw) {
  return String(raw || '').replace(/<[^>]+>/g, '').trim();
}
function lenClass(title) {
  const n = plainTitle(title).length;
  if (n < 45) return 'len-short';
  if (n <= 85) return 'len-mid';
  return 'len-long';
}
function figClass(figure) {
  const n = String(figure || '').trim().length;
  if (n <= 3) return 'fig-1';
  if (n === 4) return 'fig-2';
  if (n <= 6) return 'fig-3';
  return 'fig-4';
}
function sortRowsDesc(rows) {
  return [...(rows || [])].sort((a, b) => Number(b.value) - Number(a.value));
}
function requireFive(rows, id) {
  const list = rows || [];
  if (list.length !== 5) throw new Error(id + ' needs exactly 5 rows, got ' + list.length);
  return list;
}

const tone = ['tone-problem', 'tone-gain', 'tone-neutral'].includes(topic.tone) ? topic.tone : 'tone-neutral';
const title = titleHtml(topic.titleHtml || topic.title || '');
const topicLabel = esc(String(topic.topicLabel || 'DATA').toUpperCase());
let sourceLineRaw = String(topic.sourceLine || '').trim();
if (!sourceLineRaw) {
  const name = String(topic.sourceName || 'Source').trim();
  const year = topic.sourceYear ? String(topic.sourceYear) : '';
  if (year && name.includes(year)) sourceLineRaw = 'Source: ' + name;
  else if (year) sourceLineRaw = 'Source: ' + name + ', ' + year;
  else sourceLineRaw = 'Source: ' + name;
}
if (!/^source:/i.test(sourceLineRaw)) sourceLineRaw = 'Source: ' + sourceLineRaw;
const sourceLine = esc(sourceLineRaw);
const len = lenClass(topic.titleHtml || topic.title || '');

let chartInner = '';
let bodyClass = tone + ' ' + len;

if (templateId === '01-bars') {
  const rows = requireFive(sortRowsDesc(topic.rows), templateId);
  const max = Math.max(...rows.map((r) => Number(r.value) || 0)) || 1;
  chartInner = rows.map((r, i) => {
    const w = ((Number(r.value) / max) * 86).toFixed(1);
    const standout = i === 0 ? ' standout' : '';
    return '<div class="item' + standout + '"><div class="label">' + esc(r.label) + '</div><div class="bar-row"><div class="bar-track"><div class="bar" style="width: ' + w + '%;"></div><div class="value">' + esc(r.display || r.value) + '</div></div></div></div>';
  }).join('\\n');
} else if (templateId === '02-columns') {
  const rows = requireFive(sortRowsDesc(topic.rows), templateId);
  const max = Math.max(...rows.map((r) => Number(r.value) || 0)) || 1;
  const cols = rows.map((r, i) => {
    const h = ((Number(r.value) / max) * 84).toFixed(1);
    const standout = i === 0 ? ' standout' : '';
    return '<div class="col' + standout + '"><div class="value">' + esc(r.display || r.value) + '</div><div class="bar" style="height: ' + h + '%;"></div></div>';
  }).join('');
  const labs = rows.map((r) => '<div class="label">' + esc(r.label) + '</div>').join('');
  chartInner = '<div class="plot">' + cols + '</div><div class="x-axis">' + labs + '</div>';
} else if (templateId === '03-line') {
  const pts = topic.points || [];
  if (pts.length < 4 || pts.length > 8) throw new Error('03-line needs 4–8 points');
  const n = pts.length;
  const max = Math.max(...pts.map((p) => Number(p.value) || 0)) || 1;
  const coords = pts.map((p, i) => ({
    x: (i / (n - 1)) * 800,
    y: (Number(p.value) / max) * 340,
    label: p.label,
    display: p.display || p.value,
  }));
  const drops = coords.map((c) => '<div class="drop" style="--x:' + c.x + '; --y:' + c.y + '"></div>').join('');
  const segs = [];
  for (let i = 0; i < coords.length - 1; i++) {
    const a = coords[i];
    const b = coords[i + 1];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const w = Math.sqrt(dx * dx + dy * dy);
    const r = -Math.atan2(dy, dx) * (180 / Math.PI);
    segs.push('<div class="seg" style="--x:' + a.x + '; --y:' + a.y + '; --w:' + w.toFixed(1) + '; --r:' + r.toFixed(2) + '"></div>');
  }
  const vtx = coords.map((c) => '<div class="vtx" style="--x:' + c.x + '; --y:' + c.y + '"></div>').join('');
  const notes = coords.map((c, i) => {
    const end = i === coords.length - 1 ? ' end' : '';
    return '<div class="note' + end + '" style="--x:' + c.x + '; --y:' + c.y + '">' + esc(c.display) + '</div>';
  }).join('');
  const labs = coords.map((c) => '<div class="lab" style="--x:' + c.x + '">' + esc(c.label) + '</div>').join('');
  chartInner = '<div class="plot">' + drops + segs.join('') + vtx + notes + '</div><div class="x-axis">' + labs + '</div>';
} else if (templateId === '04-share-bar') {
  const rows = requireFive(topic.rows, templateId);
  const sum = rows.reduce((a, r) => a + Number(r.value), 0);
  if (Math.abs(sum - 100) > 0.6) throw new Error('04-share-bar rows must sum to 100, got ' + sum);
  const segs = rows.map((r) => '<div class="seg" style="width: ' + Number(r.value) + '%;"></div>').join('');
  const legend = rows.map((r) => '<div class="legend-item"><div class="swatch"></div><div class="legend-text"><div class="legend-value">' + esc(r.display || (r.value + '%')) + '</div><div class="legend-label">' + esc(r.label) + '</div></div></div>').join('');
  chartInner = '<div class="stack">' + segs + '</div><div class="legend">' + legend + '</div>';
} else if (templateId === '05-share-pie') {
  const rows = requireFive(topic.rows, templateId);
  const sum = rows.reduce((a, r) => a + Number(r.value), 0);
  if (Math.abs(sum - 100) > 0.6) throw new Error('05-share-pie rows must sum to 100, got ' + sum);
  const colors = ['var(--tone)', 'var(--n1)', 'var(--n2)', 'var(--n3)', 'var(--n4)'];
  let acc = 0;
  const stops = rows.map((r, i) => {
    const start = acc;
    acc += Number(r.value);
    return colors[i] + ' ' + start + '% ' + acc + '%';
  }).join(',\\n      ');
  const pieStyle = 'background: conic-gradient(\\n      ' + stops + '\\n    );';
  const legend = rows.map((r) => '<div class="legend-item"><div class="swatch"></div><div class="legend-value">' + esc(r.display || (r.value + '%')) + '</div><div class="legend-label">' + esc(r.label) + '</div></div>').join('');
  chartInner = '<div class="pie" style="' + pieStyle + '"></div><div class="legend">' + legend + '</div>';
} else if (templateId === '06-comparison') {
  const rows = requireFive(topic.rows, templateId);
  const axisMax = Math.max(...rows.flatMap((r) => [Number(r.left) || 0, Number(r.right) || 0]), 1);
  const leftHead = esc(topic.leftHead || 'Before');
  const rightHead = esc(topic.rightHead || 'After');
  const heads = '<div class="heads"><div class="head left">' + leftHead + '</div><div class="head spacer"></div><div class="head right">' + rightHead + '</div></div>';
  const rowHtml = rows.map((r) => {
    const lw = ((Number(r.left) / axisMax) * 100).toFixed(1);
    const rw = ((Number(r.right) / axisMax) * 100).toFixed(1);
    return '<div class="row"><div class="side left"><div class="val left">' + esc(r.leftDisplay || r.left) + '</div><div class="track left"><div class="bar left" style="width: ' + lw + '%;"></div></div></div><div class="centre">' + esc(r.label) + '</div><div class="side right"><div class="track right"><div class="bar right" style="width: ' + rw + '%;"></div></div><div class="val right">' + esc(r.rightDisplay || r.right) + '</div></div></div>';
  }).join('');
  chartInner = heads + rowHtml;
} else if (templateId === '07-stat') {
  const figure = String(topic.figure || '').trim();
  if (!figure) throw new Error('07-stat needs figure');
  bodyClass = tone + ' ' + len + ' ' + figClass(figure);
  chartInner = '<div class="figure">' + esc(figure) + '</div><div class="context">' + esc(topic.context || '') + '</div>';
} else {
  throw new Error('Unhandled template: ' + templateId);
}

let html = shell;
html = html.replace(/<body class="[^"]*">/, '<body class="' + bodyClass + '">');
html = html.replace(/<div class="topic">[\\s\\S]*?<\\/div>/, '<div class="topic">' + topicLabel + '</div>');
html = html.replace(/<h1 class="title">[\\s\\S]*?<\\/h1>/, '<h1 class="title">' + title + '</h1>');
html = html.replace(/<div class="source">[\\s\\S]*?<\\/div>/, '<div class="source">' + sourceLine + '</div>');
const chartStart = html.indexOf('<div class="chart">');
const footerStart = html.indexOf('<div class="footer">');
if (chartStart < 0 || footerStart < 0) throw new Error('Template missing .chart or .footer');
html =
  html.slice(0, chartStart) +
  '<div class="chart">\\n' + chartInner + '\\n    </div>\\n  </div>\\n\\n  ' +
  html.slice(footerStart);
html = html.replace(/<!--[\\s\\S]*?-->/g, '');
if (/\\{\\{[A-Z0-9_]+\\}\\}/.test(html)) throw new Error('Unreplaced placeholders remain');

const writerContext = {
  id: topic.id,
  template: templateId,
  topicLabel: topic.topicLabel,
  title: plainTitle(topic.titleHtml || topic.title || ''),
  relationship: topic.relationship || '',
  derived: topic.derived || [],
  caveat: topic.caveat || '',
  position: topic.position || '',
  rows: topic.rows || null,
  points: topic.points || null,
  figure: topic.figure || null,
  context: topic.context || null,
  sourceLine: sourceLineRaw,
  sourceUrl: topic.sourceUrl,
  sourceYear: topic.sourceYear,
  softClaim: !!topic.softClaim,
  notes: topic.notes || '',
};

return [{
  json: {
    topicId: topic.id,
    topicLabel: topic.topicLabel,
    title: plainTitle(topic.titleHtml || topic.title || ''),
    template: templateId,
    sourceUrl: topic.sourceUrl,
    sourceName: topic.sourceName,
    softClaim: !!topic.softClaim,
    publishHour,
    cardHtml: html,
    writerContext,
  },
}];`;

  const BUILD_PROMPT_JS = `const card = $('Fill Card HTML').item.json;
const up = $('Upload Image').item.json;
const writerPrompt = ${JSON.stringify(WRITER_SYSTEM)} + '\\n\\nTOPIC CONTEXT (JSON):\\n' + JSON.stringify(card.writerContext, null, 2);
return [{
  json: {
    ...card,
    uploadId: up.id,
    uploadPath: up.path,
    writerPrompt,
  },
}];`;

  const PARSE_WRITER_JS = `const prev = $('Build Writer Prompt').item.json;
let raw = $input.first().json;
if (raw.message && raw.message.content) raw = raw.message.content;
if (typeof raw === 'string') {
  try { raw = JSON.parse(raw); } catch (e) {
    const m = raw.match(/\\{[\\s\\S]*\\}/);
    if (!m) throw new Error('Writer did not return JSON');
    raw = JSON.parse(m[0]);
  }
}
if (raw.output) raw = typeof raw.output === 'string' ? JSON.parse(raw.output) : raw.output;

let caption = String(raw.caption || '').trim();
caption = caption.replace(/[\\u2014\\u2013]/g, ',').replace(/!/g, '.');
caption = caption.replace(/\\bsmall business(es)?\\b/gi, 'growing business');
caption = caption.replace(/\\bsmall teams?\\b/gi, 'growing teams');
if (!caption) throw new Error('Missing caption');
if (!/source in the first comment\\.?$/i.test(caption.trim())) {
  caption = caption.replace(/\\s+$/,'') + '\\n\\nSource in the first comment.';
}
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

let firstComment = String(raw.first_comment || prev.sourceUrl || '').trim();
firstComment = firstComment.replace(/^<|>$/g, '').replace(/\\s+/g, '');
if (!/^https?:\\/\\//i.test(firstComment)) {
  if (prev.sourceUrl) firstComment = prev.sourceUrl;
  else throw new Error('Missing first_comment / sourceUrl');
}

return [{ json: { ...prev, caption, first_comment: firstComment } }];`;

  const BUILD_DRAFT_JS = `const writer = $('Parse Writer').item.json;
const up = $('Upload Image').item.json;
if (!up.id || !up.path) throw new Error('Postiz upload missing id/path: ' + JSON.stringify(up).slice(0, 300));
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
const linkedinId = (ints.find((i) => provider(i) === 'linkedin') || {}).id || '${LI_PERSONAL_FALLBACK}';
const facebookId = (ints.find((i) => provider(i) === 'facebook') || {}).id || '${FB_FALLBACK}';

const paras = String(writer.caption || '')
  .split(/\\n\\n+/)
  .map((p) => p.trim())
  .filter(Boolean)
  .map((p) => '<p>' + p.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '</p>')
  .join('');

const publishHour = Number(writer.publishHour || ${publishHour});
const publishWeekdays = Array.isArray(writer.publishWeekdays) && writer.publishWeekdays.length
  ? writer.publishWeekdays.map(Number)
  : ${JSON.stringify(publishWeekdays)};
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
  const fallback = new Date(Date.now() + 6 * 60 * 60 * 1000);
  slotISO = fallback.toISOString();
  slotLabel = slotISO + ' (UTC fallback)';
}

const image = [{ id: up.id, path: up.path }];
const body = {
  type: 'schedule',
  date: slotISO,
  shortLink: false,
  tags: ['no-ig-mirror', 'lane-2'],
  posts: [
    {
      integration: { id: linkedinId },
      value: [
        { content: paras, image },
        { content: writer.first_comment, image: [] },
      ],
      settings: { __type: 'linkedin' },
    },
    {
      integration: { id: facebookId },
      value: [
        { content: paras, image },
        { content: writer.first_comment, image: [] },
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
    topicId: writer.topicId,
    topicLabel: writer.topicLabel,
    title: writer.title,
    template: writer.template,
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
const cancelUrl = 'https://n8n.sysbilt.com/webhook/sysbilt-lane2-cancel?postId=' + encodeURIComponent(postId);
const slack_text = [
  '*Lane 2 ready* (LinkedIn personal + Facebook)',
  '',
  '*' + (prev.title || prev.topicId) + '*',
  'Template: ' + (prev.template || ''),
  'Topic: ' + (prev.topicLabel || ''),
  'Goes live: ' + (prev.slotLabel || prev.slotISO),
  '',
  'Review / edit in Postiz: https://postiz.sysbilt.com/launches',
  'Source: ' + (prev.sourceUrl || ''),
  '',
  'Do nothing → it posts at the time above on LinkedIn + Facebook.',
  'Kill it: ' + cancelUrl,
].join('\\n');

return [{
  json: {
    ok: true,
    message: 'Lane 2 scheduled. Auto-posts at the slot unless cancelled.',
    topicId: prev.topicId,
    title: prev.title,
    template: prev.template,
    sourceUrl: prev.sourceUrl,
    linkedinId: prev.linkedinId,
    slotISO: prev.slotISO,
    slotLabel: prev.slotLabel,
    postId,
    cancelUrl,
    slack_text,
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
    message: 'Lane 2 post moved back to draft (will not publish).',
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
      position: [-520, -120],
      id: ids.schedule,
      name: 'Mon Wed Fri 8am Sydney',
    },
    {
      parameters: {},
      type: 'n8n-nodes-base.manualTrigger',
      typeVersion: 1,
      position: [-520, 80],
      id: ids.manualPick,
      name: 'Manual Pick',
    },
    {
      parameters: {
        path: 'sysbilt-lane2',
        httpMethod: 'POST',
        responseMode: 'lastNode',
        options: {},
      },
      type: 'n8n-nodes-base.webhook',
      typeVersion: 2,
      position: [-520, 280],
      id: ids.webhook,
      name: 'Webhook',
      webhookId: ids.webhook,
    },
    {
      parameters: { jsCode: PICK_TOPIC_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [-200, 40],
      id: ids.pickTopic,
      name: 'Pick Topic',
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
      position: [40, 40],
      id: ids.skipIf,
      name: 'Skip?',
    },
    {
      parameters: { jsCode: NO_TOPIC_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [280, -80],
      id: ids.noTopic,
      name: 'No Topic',
    },
    {
      parameters: { jsCode: FILL_CARD_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [280, 120],
      id: ids.fillCard,
      name: 'Fill Card HTML',
    },
    {
      parameters: {
        method: 'POST',
        url: `http://127.0.0.1:3010/chromium/screenshot?token=${browserlessToken}`,
        sendBody: true,
        specifyBody: 'json',
        jsonBody: `={{ JSON.stringify({ html: $json.cardHtml, options: { type: 'png' }, viewport: { width: 1080, height: 1080, deviceScaleFactor: 3 }, gotoOptions: { waitUntil: 'networkidle0' }, waitForTimeout: 5000 }) }}`,
        options: {
          timeout: 90000,
          response: { response: { responseFormat: 'file', outputPropertyName: 'data' } },
        },
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [520, 120],
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
      position: [760, 120],
      id: ids.upload,
      name: 'Upload Image',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: { jsCode: BUILD_PROMPT_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1000, 120],
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
        options: { maxTokens: 1200, temperature: 0.35 },
      },
      type: '@n8n/n8n-nodes-langchain.openAi',
      typeVersion: 1.1,
      position: [1240, 120],
      id: ids.writer,
      name: 'DS Write Lane 2',
      credentials: { openAiApi: DEEPSEEK_CRED },
      retryOnFail: true,
      maxTries: 2,
      waitBetweenTries: 5000,
    },
    {
      parameters: { jsCode: PARSE_WRITER_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1480, 120],
      id: ids.parseWriter,
      name: 'Parse Writer',
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
      position: [1720, 120],
      id: ids.integrations,
      name: 'Get Integrations',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: { jsCode: BUILD_DRAFT_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [1960, 120],
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
      position: [2200, 120],
      id: ids.createDraft,
      name: 'Create Scheduled Post',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: {
        jsCode: `const created = $input.first().json || {};
const ids = new Set();
const push = (v) => { if (v && typeof v === 'string') ids.add(v); };
push(created.postId);
push(created.id);
const list = Array.isArray(created.posts) ? created.posts
  : (Array.isArray(created) ? created : []);
for (const p of list) {
  if (!p || typeof p !== 'object') continue;
  push(p.postId);
  push(p.id);
}
const uniq = [...ids];
if (!uniq.length) {
  // Keep one pass-through so Slack still fires; Force Schedule will no-op/fail softly
  return [{ json: { postId: '', created, warn: 'No post ids in Create Scheduled Post response' } }];
}
return uniq.map((postId) => ({ json: { postId, created } }));`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [2260, 120],
      id: ids.expandCreated,
      name: 'Expand Created Post IDs',
    },
    {
      parameters: {
        method: 'PUT',
        url: `=${POSTIZ_BASE}/posts/{{ $json.postId }}/status`,
        authentication: 'genericCredentialType',
        genericAuthType: 'httpHeaderAuth',
        sendBody: true,
        specifyBody: 'json',
        jsonBody: '={{ JSON.stringify({ status: "schedule" }) }}',
        options: {},
      },
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 4.2,
      position: [2480, 120],
      id: ids.forceSchedule,
      name: 'Force Schedule (LI)',
      credentials: postizCred(postizCredId),
      continueOnFail: true,
    },
    {
      parameters: {
        jsCode: `return [$input.first()];`,
      },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [2600, 120],
      id: ids.keepOne,
      name: 'Keep One For Slack',
    },
    {
      parameters: { jsCode: SUMMARY_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [2720, 120],
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
          position: [2680, 120],
          id: ids.slackNotify,
          name: 'Slack Notify',
          credentials: {
            slackApi: { id: slackCredId, name: 'SYSBILT Slack' },
          },
          continueOnFail: true,
        }
      : {
          parameters: { jsCode: `return $input.all();` },
          type: 'n8n-nodes-base.code',
          typeVersion: 2,
          position: [2680, 120],
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
      position: [2920, 120],
      id: ids.summary,
      name: 'Summary',
    },
    {
      parameters: {
        path: 'sysbilt-lane2-cancel',
        httpMethod: 'GET',
        responseMode: 'lastNode',
        options: {},
      },
      type: 'n8n-nodes-base.webhook',
      typeVersion: 2,
      position: [-200, 420],
      id: ids.cancelWebhook,
      name: 'Cancel Webhook',
      webhookId: ids.cancelWebhook,
    },
    {
      parameters: { jsCode: CANCEL_NORMALISE_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [40, 420],
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
      position: [280, 420],
      id: ids.cancelStatus,
      name: 'Demote To Draft',
      credentials: postizCred(postizCredId),
    },
    {
      parameters: { jsCode: CANCEL_SUMMARY_JS },
      type: 'n8n-nodes-base.code',
      typeVersion: 2,
      position: [520, 420],
      id: ids.cancelSummary,
      name: 'Cancel Summary',
    },
  ];

  const afterSlack = slackCredId ? 'Slack Notify' : 'Slack Skip (no credential)';

  const connections = {
    'Mon Wed Fri 8am Sydney': { main: [[{ node: 'Pick Topic', type: 'main', index: 0 }]] },
    'Manual Pick': { main: [[{ node: 'Pick Topic', type: 'main', index: 0 }]] },
    Webhook: { main: [[{ node: 'Pick Topic', type: 'main', index: 0 }]] },
    'Pick Topic': { main: [[{ node: 'Skip?', type: 'main', index: 0 }]] },
    'Skip?': {
      main: [
        [{ node: 'No Topic', type: 'main', index: 0 }],
        [{ node: 'Fill Card HTML', type: 'main', index: 0 }],
      ],
    },
    'Fill Card HTML': { main: [[{ node: 'Browserless Screenshot', type: 'main', index: 0 }]] },
    'Browserless Screenshot': { main: [[{ node: 'Upload Image', type: 'main', index: 0 }]] },
    'Upload Image': { main: [[{ node: 'Build Writer Prompt', type: 'main', index: 0 }]] },
    'Build Writer Prompt': { main: [[{ node: 'DS Write Lane 2', type: 'main', index: 0 }]] },
    'DS Write Lane 2': { main: [[{ node: 'Parse Writer', type: 'main', index: 0 }]] },
    'Parse Writer': { main: [[{ node: 'Get Integrations', type: 'main', index: 0 }]] },
    'Get Integrations': { main: [[{ node: 'Build Draft Payload', type: 'main', index: 0 }]] },
    'Build Draft Payload': { main: [[{ node: 'Create Scheduled Post', type: 'main', index: 0 }]] },
    'Create Scheduled Post': { main: [[{ node: 'Expand Created Post IDs', type: 'main', index: 0 }]] },
    'Expand Created Post IDs': { main: [[{ node: 'Force Schedule (LI)', type: 'main', index: 0 }]] },
    'Force Schedule (LI)': { main: [[{ node: 'Keep One For Slack', type: 'main', index: 0 }]] },
    'Keep One For Slack': { main: [[{ node: 'Build Slack Alert', type: 'main', index: 0 }]] },
    'Build Slack Alert': { main: [[{ node: afterSlack, type: 'main', index: 0 }]] },
    [afterSlack]: { main: [[{ node: 'Summary', type: 'main', index: 0 }]] },
    'Cancel Webhook': { main: [[{ node: 'Cancel Normalise', type: 'main', index: 0 }]] },
    'Cancel Normalise': { main: [[{ node: 'Demote To Draft', type: 'main', index: 0 }]] },
    'Demote To Draft': { main: [[{ node: 'Cancel Summary', type: 'main', index: 0 }]] },
  };

  return {
    name: 'SYSBILT - Lane 2 Charts',
    nodes,
    connections,
    settings: {
      executionOrder: 'v1',
      timezone: 'Australia/Sydney',
    },
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
    data: { name: 'Authorization', value: POSTIZ_KEY_RESOLVED },
  });
  console.log('Created Postiz API credential:', created.id);
  return created.id;
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
    console.log('Slack credential scan failed:', e.message || e);
  }
  return '';
}

async function upsertWorkflow(workflow) {
  let existingId = process.env.LANE2_CHARTS_WORKFLOW_ID || '';
  if (!existingId && existsSync(STATE_ENV)) {
    const m = readFileSync(STATE_ENV, 'utf8').match(/^LANE2_CHARTS_WORKFLOW_ID=(.+)$/m);
    if (m) existingId = m[1].trim();
  }
  if (!existingId) {
    const list = await n8n('GET', '/workflows?limit=100');
    const hit = (list.data || list || []).find((w) => w.name === workflow.name);
    if (hit) existingId = hit.id;
  }

  const payload = {
    name: workflow.name,
    nodes: workflow.nodes,
    connections: workflow.connections,
    settings: workflow.settings,
  };

  if (existingId) {
    return n8n('PUT', `/workflows/${existingId}`, payload);
  }
  return n8n('POST', '/workflows', payload);
}

async function main() {
  const activate = process.argv.includes('--activate');
  console.log('Loading Browserless token from Mini…');
  const browserlessToken = loadBrowserlessToken();
  console.log('Token prefix:', browserlessToken.slice(0, 6) + '…');

  const postizCredId = await ensurePostizCredential();
  const slackCredId = await ensureSlackCredential();
  const slackChannel = process.env.SLACK_CHANNEL || '#content';
  console.log('Slack:', slackCredId ? `${slackCredId} → ${slackChannel}` : 'skipped');

  const workflow = buildWorkflow(postizCredId, browserlessToken, slackCredId, slackChannel);
  const deployed = await upsertWorkflow(workflow);
  console.log(`Updated workflow "${deployed.name}" (${deployed.id})`);

  if (activate) {
    await n8n('POST', `/workflows/${deployed.id}/activate`);
    console.log('Activated');
  }

  let lines = existsSync(STATE_ENV) ? readFileSync(STATE_ENV, 'utf8').split('\\n') : [];
  // fix: split on real newlines
  lines = existsSync(STATE_ENV) ? readFileSync(STATE_ENV, 'utf8').split('\n') : [];
  lines = lines.filter((l) => l.trim() && !l.startsWith('LANE2_CHARTS_WORKFLOW_ID='));
  if (!lines.some((l) => l.startsWith('POSTIZ_CREDENTIAL_ID='))) {
    lines.push(`POSTIZ_CREDENTIAL_ID=${postizCredId}`);
  }
  lines.push(`LANE2_CHARTS_WORKFLOW_ID=${deployed.id}`);
  writeFileSync(STATE_ENV, lines.filter(Boolean).join('\n') + '\n');

  console.log(`\nWorkflow: ${N8N_BASE}/workflow/${deployed.id}`);
  console.log('Machine:');
  console.log('  Mon/Wed 08:00 → pick topic → HTML chart → Browserless 1080² → LI+FB at 15:00 (2/week)');
  console.log('  Templates: scripts/automations/social/cards/lane2/');
  console.log('  Manual: POST /webhook/sysbilt-lane2  optional { "topicId": "…" }');
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
