#!/usr/bin/env node
/**
 * Patch SYSBILT - NEWS workflow: DeepSeek selection, service-gap prompts, robust JSON parsing.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const NEWS_WF_ID = process.env.NEWS_WORKFLOW_ID || 'hB7YMEOcD7TLu3NZ';

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

if (!N8N_KEY) {
  console.error('Missing N8N_API_KEY or cursor-mcp in .env.local');
  process.exit(1);
}

const n8n = async (method, path, body) => {
  const res = await fetch(`${N8N_BASE}/api/v1${path}`, {
    method,
    headers: { 'X-N8N-API-KEY': N8N_KEY, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(data)}`);
  return data;
};

const CLEANUP_GATE_JS = `function stripFences(raw) {
  return String(raw || '').replace(/^\\\`\\\`\\\`(json)?/i, '').replace(/\\\`\\\`\\\`$/i, '').trim();
}

function unescapeJsonString(s) {
  return String(s || '')
    .replace(/\\\\n/g, '\\n')
    .replace(/\\\\"/g, '"')
    .replace(/\\\\\\\\/g, '\\\\');
}

function parseRewriteJson(raw) {
  const t = stripFences(raw);
  try {
    return JSON.parse(t);
  } catch (first) {
    const block = t.match(/\\{[\\s\\S]*\\}/);
    if (block) {
      try { return JSON.parse(block[0]); } catch (_) {}
      let repaired = block[0];
      if (!repaired.endsWith('}')) {
        if ((repaired.match(/"/g) || []).length % 2 === 1) repaired += '"';
        repaired += '}';
      }
      try { return JSON.parse(repaired); } catch (_) {}
    }
    const titleM = t.match(/"title"\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"/);
    const bodyM = t.match(/"bodyText"\\s*:\\s*"([\\s\\S]*)$/);
    if (titleM) {
      const title = unescapeJsonString(titleM[1]).replace(/\\n/g, ' ').trim();
      let bodyText = '';
      if (bodyM) {
        bodyText = unescapeJsonString(bodyM[1].replace(/"\\s*}\\s*$/, '')).trim();
      }
      return { title, bodyText };
    }
    throw first;
  }
}

const aiOutput = $input.item.json;
const value =
  aiOutput.content?.parts?.[0]?.text ??
  aiOutput.message?.content ??
  aiOutput.choices?.[0]?.message?.content ??
  aiOutput.text ??
  aiOutput.output ??
  '{}';
const rawText = typeof value === 'string' ? value : JSON.stringify(value);
const parsed = parseRewriteJson(rawText);
const tagged = $('Parse Groq Response').item.json;

let title = String(parsed.title || tagged.sourceTitle || '').trim();
let body = String(parsed.bodyText || tagged.sourceSummary || '').trim();
title = title.replace(/[\\u2014\\u2013]/g, ',').replace(/!/g, '.');
body = body.replace(/[\\u2014\\u2013]/g, ',').replace(/!/g, '.');

const genericTitlePatterns = [
  /^what small businesses need to know/i,
  /^why your website/i,
  /^the digital shift/i,
  /^small businesses face/i,
  /^new rules for businesses/i,
];
if (genericTitlePatterns.some((pattern) => pattern.test(title))) {
  const sourceTitle = String(tagged.sourceTitle || '').replace(/\\s+-\\s+[^-]+$/, '').trim();
  if (sourceTitle && sourceTitle.length <= 90) title = sourceTitle;
}

const auSpelling = [
  [/\\borganize\\b/gi, 'organise'], [/\\boptimize\\b/gi, 'optimise'], [/\\borganizing\\b/gi, 'organising'],
  [/\\boptimizing\\b/gi, 'optimising'], [/\\borganized\\b/gi, 'organised'], [/\\boptimized\\b/gi, 'optimised'],
  [/\\bcustomize\\b/gi, 'customise'], [/\\bcustomized\\b/gi, 'customised'], [/\\banalyze\\b/gi, 'analyse'],
  [/\\banalyzed\\b/gi, 'analysed'], [/\\brecognize\\b/gi, 'recognise'], [/\\brecognized\\b/gi, 'recognised'],
  [/\\bcentralize\\b/gi, 'centralise'], [/\\bcentralized\\b/gi, 'centralised'], [/\\bdigitize\\b/gi, 'digitise'],
  [/\\bdigitized\\b/gi, 'digitised'], [/\\bcolor\\b/gi, 'colour'], [/\\bcenter\\b/gi, 'centre'],
  [/\\bcentered\\b/gi, 'centred'], [/\\bfavor\\b/gi, 'favour'], [/\\bfavorite\\b/gi, 'favourite'],
  [/\\blabor\\b/gi, 'labour'], [/\\bhonor\\b/gi, 'honour'],
];
for (const [pattern, replacement] of auSpelling) {
  title = title.replace(pattern, replacement);
  body = body.replace(pattern, replacement);
}

if (title.length > 90) title = title.substring(0, 87).trimEnd() + '...';

const productMentions = {};
const words = body.match(/[A-Z][a-z]+(?:[A-Z][a-z]+)+/g) || [];
for (const w of words) productMentions[w] = (productMentions[w] || 0) + 1;
const productWarning = Object.entries(productMentions)
  .filter(([_, count]) => count >= 3)
  .map(([name, count]) => name + ' mentioned ' + count + ' times')
  .join('; ');

return [{
  json: {
    title,
    bodyText: body,
    servicePillar: tagged.servicePillar,
    revenuePhase: tagged.revenuePhase,
    personaName: tagged.personaName,
    sourceUrl: tagged.sourceUrl,
    cleanupWarnings: productWarning || null,
  },
}];`;

const DEEPSEEK_CRED = { id: 'XgmuWh1nV8XX7x83', name: 'SYSBILT DeepSeek' };
const SELECT_NODE = 'DS Select and Tag';
const OLD_SELECT_NODE = 'Groq Select and Tag';

// Selection: only keep stories where a SYSBILT capability closes a real gap.
const SELECT_SYSTEM = [
  'SYSBILT editorial director. Pick news only when a recent event creates a problem one SYSBILT capability directly solves for Australian SMB owners. Global news is fine if it affects AU SMBs.',
  'Capabilities and gaps:',
  "Websites & E-commerce: invisible online, lost enquiries, weak storefront.",
  "CRM & Lead Tracking: leads slip through, no follow-up, no customer record.",
  "Automation: manual admin, re-keying between tools, slow responses.",
  "AI Assistants: repeated questions, after-hours enquiries missed.",
  "Content Systems: no time for marketing, inconsistent presence.",
  "Team Training: tools unused, poor adoption.",
  "Dashboards & Reporting: scattered data, flying blind, cannot prove what works.",
  'GEOGRAPHY RULE (important): the SOURCE can be from anywhere in the world. What matters is whether the EVENT affects Australian SMBs.',
  '- KEEP global events that apply to Australian businesses too: a new AI model, a tool launch or pricing change, a platform or feature update, a security issue, a global product or service. These reach Australian businesses directly.',
  '- REJECT foreign-local news: an event tied to one other country that only affects that country (for example a UK-only law for UK businesses, a US state regulation), UNLESS it has already been proposed or introduced in Australia. "It might reach Australia someday" is NOT enough, reject it.',
  'GENERAL NEWS IS WELCOME, not only product launches. A study, a market shift, a change in customer behaviour, a regulation, an industry trend, or research counts just as much as a tool release, as long as it creates a gap one capability closes. Do not bias toward "company X launched feature Y".',
  'FRESHNESS: we publish every 2 weeks, so only keep news from roughly the last 2 weeks. If the underlying event clearly happened more than about 2 weeks ago (old version, last month, last year, a dated "April 2025" style announcement), set keep false even if the article was recirculated.',
  'KEEP when a recent concrete event affects Australian SMBs and connects to one capability. REJECT off-brief: macro economy, interest rates, hiring-cost stats, bank PR, politics, celebrity, evergreen listicles with no news event, stale events, and foreign-local stories per the rule above.',
  "servicePillar exact: Websites & E-commerce | CRM & Lead Tracking | Automation | AI Assistants | Content Systems | Team Training | Dashboards & Reporting.",
  'revenuePhase: phase1 (Websites, CRM), phase2 (Automation, AI Assistants, Content Systems, Team Training), phase3 (Dashboards), horizon (forward forecast only).',
  'personaName: The Builder (phase1), The Scaler (phase2), The Controller (phase3), The Visionary (horizon).',
  'serviceGap: one sentence, the gap this event creates and how the capability closes it.',
  'Do not echo the article title, URL, or summary. JSON only with these keys: {"keep":bool,"area":"string","servicePillar":"string","revenuePhase":"string","personaName":"string","serviceGap":"string"}',
].join('\n');

const DS_SELECT_PROMPT = `=${SELECT_SYSTEM}

Analyse this found article. Title: {{ $json.sourceTitle }}. Summary: {{ $json.sourceSummary }}. URL: {{ $json.sourceUrl }}`;

function renameNodeInConnections(connections, oldName, newName) {
  if (connections[oldName]) {
    connections[newName] = connections[oldName];
    delete connections[oldName];
  }
  for (const conn of Object.values(connections)) {
    for (const branch of conn.main || []) {
      for (const edge of branch || []) {
        if (edge.node === oldName) edge.node = newName;
      }
    }
  }
}

function buildDeepSeekSelectNode(existing) {
  return {
    ...existing,
    name: SELECT_NODE,
    type: '@n8n/n8n-nodes-langchain.openAi',
    typeVersion: 1.1,
    retryOnFail: true,
    maxTries: 3,
    waitBetweenTries: 8000,
    credentials: { openAiApi: DEEPSEEK_CRED },
    parameters: {
      modelId: {
        __rl: true,
        value: 'deepseek-chat',
        mode: 'id',
        cachedResultName: 'deepseek-chat',
      },
      messages: { values: [{ content: DS_SELECT_PROMPT }] },
      jsonOutput: true,
      options: { maxTokens: 300, temperature: 0 },
    },
  };
}

// Normalise, dedupe, and drop stale items (older than 45 days by publish date).
const NORMALISE_DEDUPE_JS = `const items = $input.all();
const seen = new Set();
const out = [];
const MAX_AGE_DAYS = 14;
const now = Date.now();

const sanitize = (str) => str
  .replace(/["\\\\]/g, '')
  .replace(/[\\n\\r\\t]/g, ' ')
  .replace(/[\\u2018\\u2019\\u201C\\u201D]/g, "'")
  .trim();

const normaliseTitle = (str) => str
  .toLowerCase()
  .replace(/\\s+-\\s+[^-]+$/, '')
  .replace(/[^\\w\\s]/g, ' ')
  .replace(/\\s+/g, ' ')
  .trim();

for (const it of items) {
  const j = it.json;
  const url = (j.link || j.guid || '').trim();
  const title = (j.title || '').trim();
  if (!title || !url) continue;

  // Drop stale stories: we publish every 2 weeks, so anything older than 14 days
  // is out of cycle. Google News sometimes recirculates old articles.
  const rawDate = j.isoDate || j.pubDate || '';
  const pub = rawDate ? new Date(rawDate).getTime() : 0;
  if (pub && (now - pub) > MAX_AGE_DAYS * 86400000) continue;

  const key = normaliseTitle(title);
  if (!key || seen.has(key)) continue;
  seen.add(key);

  const desc = (j.contentSnippet || j.content || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\\s+/g, ' ')
    .trim();

  out.push({
    json: {
      sourceTitle: sanitize(title),
      sourceUrl: url,
      sourceSummary: sanitize(desc.slice(0, 800)),
      sourcePublished: rawDate || new Date().toISOString(),
    },
  });
}

// Each RSS feed dumps ~50 articles in one block, so taking the "first N" later
// would sample only the first one or two topics. Shuffle so the downstream
// Pre-Limit sample spans all searches and the selector sees a varied pool.
for (let i = out.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  const tmp = out[i];
  out[i] = out[j];
  out[j] = tmp;
}

return out;`;

const PARSE_GROQ_JS = `const PILLAR_PHASE = {
  'websites & e-commerce': 'phase1',
  'crm & lead tracking': 'phase1',
  'automation': 'phase2',
  'ai assistants': 'phase2',
  'content systems': 'phase2',
  'team training': 'phase2',
  'dashboards & reporting': 'phase3',
};

function normPhase(value, pillar) {
  const s = String(value || '').toLowerCase().replace(/\\s+/g, '');
  // Horizon is a forward-looking forecast, not tied to a pillar, so honour it.
  if (s === 'horizon') return 'horizon';
  // Otherwise the pillar deterministically sets the phase. This stops the AI from
  // mis-tagging (e.g. Websites as phase2) and splitting one service across phases.
  const fromPillar = PILLAR_PHASE[String(pillar || '').toLowerCase()];
  if (fromPillar) return fromPillar;
  if (s === 'phase1' || s === 'getclients') return 'phase1';
  if (s === 'phase2' || s === 'scalefaster') return 'phase2';
  if (s === 'phase3' || s === 'seeclearly') return 'phase3';
  return 'phase2';
}

function normPillar(value) {
  const s = String(value || '').trim();
  const allowed = [
    'Websites & E-commerce',
    'CRM & Lead Tracking',
    'Automation',
    'AI Assistants',
    'Content Systems',
    'Team Training',
    'Dashboards & Reporting',
  ];
  const hit = allowed.find((p) => p.toLowerCase() === s.toLowerCase());
  return hit || s;
}

function parseSelectPayload(item) {
  const j = item.json || {};
  if (j.keep !== undefined && j.servicePillar !== undefined) return j;
  const raw =
    j.choices?.[0]?.message?.content ??
    j.message?.content ??
    j.text ??
    j.output ??
    '';
  const text = typeof raw === 'string' ? raw : JSON.stringify(raw);
  const cleaned = text.replace(/^\\\`\\\`\\\`(json)?/i, '').replace(/\\\`\\\`\\\`$/, '').trim();
  return JSON.parse(cleaned);
}

const responses = $input.all();
const sources = $('Pre-Limit').all();
const out = [];

for (let i = 0; i < responses.length; i++) {
  try {
    const parsed = parseSelectPayload(responses[i]);
    const src = sources[i]?.json || {};
    const keep = parsed.keep === true || parsed.keep === 'true';
    const servicePillar = normPillar(parsed.servicePillar);
    const revenuePhase = normPhase(parsed.revenuePhase, servicePillar);
    out.push({
      json: {
        keep,
        area: String(parsed.area || '').trim(),
        servicePillar,
        revenuePhase,
        personaName: String(parsed.personaName || '').trim(),
        serviceGap: String(parsed.serviceGap || '').trim(),
        sourceTitle: src.sourceTitle || '',
        sourceUrl: src.sourceUrl || '',
        sourceSummary: src.sourceSummary || '',
      },
    });
  } catch (_) {
    continue;
  }
}

return out;`;

const BALANCE_BY_PHASE_JS = `const items = $input.all();
const titleKey = (item) => String(item.json.sourceTitle || '')
  .toLowerCase()
  .replace(/\\s+-\\s+[^-]+$/, '')
  .replace(/[^a-z0-9\\s]/g, ' ')
  .replace(/\\s+/g, ' ')
  .trim();

// Max 1 story per brand/company per run, so we never ship two Shopify stories.
const BRANDS = [
  'shopify', 'wix', 'webflow', 'squarespace', 'framer', 'figma', 'cursor', 'lovable',
  'bolt.new', 'replit', 'antigravity', 'codex', 'hubspot', 'pipedrive', 'zoho',
  'monday.com', 'gohighlevel', 'attio', 'n8n', 'zapier', 'make.com', 'openai',
  'anthropic', 'claude', 'gemini', 'copilot', 'microsoft', 'nvidia', 'deepseek',
  'qwen', 'mistral', 'grok', 'canva', 'capcut', 'descript', 'elevenlabs', 'pinterest',
  'meta', 'instagram', 'facebook', 'tiktok', 'power bi', 'looker', 'tableau',
  'metabase', 'gamma', 'google', 'apple', 'amazon',
];
const brandKey = (item) => {
  const t = ' ' + String(item.json.sourceTitle || '').toLowerCase() + ' ';
  for (const b of BRANDS) {
    const re = new RegExp('\\\\b' + b.replace(/\\./g, '\\\\.') + '\\\\b');
    if (re.test(t)) return b;
  }
  return '';
};
const brandCount = new Map();
const brandOk = (item) => {
  const b = brandKey(item);
  if (!b) return true;
  return (brandCount.get(b) || 0) < 1;
};
const markBrand = (item) => {
  const b = brandKey(item);
  if (b) brandCount.set(b, (brandCount.get(b) || 0) + 1);
};

function pickDiverse(phase, limit) {
  const phaseItems = items.filter((i) => i.json.revenuePhase === phase);
  const byPillar = new Map();
  for (const item of phaseItems) {
    const pillar = item.json.servicePillar || 'Other';
    if (!byPillar.has(pillar)) byPillar.set(pillar, []);
    byPillar.get(pillar).push(item);
  }
  const selected = [];
  const seenTitles = new Set();
  const pillars = [...byPillar.keys()];
  while (selected.length < limit && pillars.length) {
    let progressed = false;
    for (const pillar of pillars) {
      const bucket = byPillar.get(pillar) || [];
      while (bucket.length) {
        const item = bucket.shift();
        const key = titleKey(item);
        if (key && seenTitles.has(key)) continue;
        if (key) seenTitles.add(key);
        selected.push(item);
        progressed = true;
        break;
      }
      if (selected.length >= limit) break;
    }
    if (!progressed) break;
  }
  return selected;
}

// Hard ceiling: 2 covers per service (light/dark), 1 forecast cover for horizon.
const MAX_PER_SERVICE = 2;
const MAX_HORIZON = 1;
const TARGET = 9;

// Weighted targets across the 3 areas: Scale operations is the busiest, so it
// gets the most slots. Get clients next, See numbers last, plus 1 optional forecast.
// phase1 = Get clients, phase2 = Scale operations, phase3 = See numbers.
const perServiceCount = new Map();
function pickPhase(phase, limit) {
  const seenUrls = new Set();
  const phaseItems = items.filter((i) => i.json.revenuePhase === phase);
  const byPillar = new Map();
  for (const item of phaseItems) {
    const pillar = item.json.servicePillar || 'Other';
    if (!byPillar.has(pillar)) byPillar.set(pillar, []);
    byPillar.get(pillar).push(item);
  }
  const selected = [];
  const seenTitles = new Set();
  const cap = phase === 'horizon' ? MAX_HORIZON : MAX_PER_SERVICE;
  const pillars = [...byPillar.keys()];
  while (selected.length < limit && pillars.length) {
    let progressed = false;
    for (const pillar of pillars) {
      if ((perServiceCount.get(pillar) || 0) >= cap) continue;
      const bucket = byPillar.get(pillar) || [];
      while (bucket.length) {
        const item = bucket.shift();
        const key = titleKey(item);
        if (key && seenTitles.has(key)) continue;
        if (!brandOk(item)) continue;
        if (key) seenTitles.add(key);
        selected.push(item);
        markBrand(item);
        perServiceCount.set(pillar, (perServiceCount.get(pillar) || 0) + 1);
        progressed = true;
        break;
      }
      if (selected.length >= limit) break;
    }
    if (!progressed) break;
  }
  return selected;
}

let balanced = [
  ...pickPhase('phase2', 4), // Scale operations, weighted highest
  ...pickPhase('phase1', 3), // Get clients
  ...pickPhase('phase3', 2), // See numbers
  ...pickPhase('horizon', 1), // Forecast, optional
];

// Fill any remaining slots up to TARGET from leftover items, still honouring the
// per-service cap so we never assign a duplicate cover image.
const seenUrls = new Set(balanced.map((i) => i.json.sourceUrl).filter(Boolean));
if (balanced.length < TARGET) {
  for (const item of items) {
    if (balanced.length >= TARGET) break;
    const url = item.json.sourceUrl;
    if (!url || seenUrls.has(url)) continue;
    if (!brandOk(item)) continue;
    const pillar = item.json.servicePillar || 'Other';
    const cap = item.json.revenuePhase === 'horizon' ? MAX_HORIZON : MAX_PER_SERVICE;
    if ((perServiceCount.get(pillar) || 0) >= cap) continue;
    seenUrls.add(url);
    markBrand(item);
    perServiceCount.set(pillar, (perServiceCount.get(pillar) || 0) + 1);
    balanced.push(item);
  }
}

return balanced.slice(0, TARGET);`;

// Searching: one bucket per service (named tools + broad catch-alls), global by default,
// plus a couple of Australia-only searches for local SMB tech and compliance.
const BUILD_FEEDS_JS = `// Each query carries its servicePillar so we can balance later, and a 'geo' flag.
// Two kinds of query per service: TOOL (named product news) and IMPACT (trends,
// studies, behaviour shifts, regulation) so we get general news, not just launches.
// Three query types per service:
//   TOOL   = named product news,  THEME = trend/study/behaviour,
//   FUNCTION = what AI/automation/tech does for a business function
//   (marketing, sales, operations, finance, customer service, people).
const GLOBAL = [
  // 1. Websites & E-commerce (the front door)
  ['Websites & E-commerce', 'Shopify OR Wix OR Webflow OR Squarespace OR Framer OR Figma update when:14d'],
  ['Websites & E-commerce', '"vibe coding" OR Cursor OR "Claude Code" OR Lovable OR Bolt.new OR Replit OR "Google Antigravity" OR "OpenAI Codex" when:14d'],
  ['Websites & E-commerce', 'Google AI Overviews OR AI search website traffic OR SEO shift small business when:14d'],
  ['Websites & E-commerce', 'AI crawler OR content scraping OR bot blocking OR robots.txt website when:14d'],
  ['Websites & E-commerce', 'AI ecommerce OR online store conversion OR digital storefront when:14d'],
  // 2. CRM & Lead Tracking (the memory) — exclude Salesforce (enterprise)
  ['CRM & Lead Tracking', 'HubSpot OR Pipedrive OR Zoho OR "Monday.com" OR GoHighLevel OR Attio update when:14d'],
  ['CRM & Lead Tracking', 'lead response time OR customer follow up OR sales pipeline research when:14d'],
  ['CRM & Lead Tracking', 'AI sales OR sales automation OR lead generation technology when:14d'],
  // 3. Automation (the engine)
  ['Automation', 'n8n OR "Make.com" OR Zapier OR workflow automation update when:14d'],
  ['Automation', 'automation replacing admin OR back office efficiency OR productivity study when:14d'],
  ['Automation', 'AI operations OR business operations automation OR finance admin automation when:14d'],
  // 4. AI Assistants / the agent movement (the assistant) — the firehose
  ['AI Assistants', 'OpenAI OR Anthropic OR Claude OR Gemini OR Microsoft Copilot new model OR release OR API when:14d'],
  ['AI Assistants', 'NVIDIA OR DeepSeek OR Qwen OR Mistral OR xAI AI announcement when:14d'],
  ['AI Assistants', 'AI agent OR autonomous agent OR AI assistant business when:14d'],
  ['AI Assistants', 'AI customer service OR AI chatbot OR customer support automation when:14d'],
  ['AI Assistants', 'AI impact small business OR AI productivity OR AI jobs study when:14d'],
  // 5. Content Systems (the amplifier) — organic, no ads
  ['Content Systems', 'Canva OR CapCut OR Descript OR ElevenLabs OR "AI video" tool when:14d'],
  ['Content Systems', 'AI marketing OR social media marketing OR content creation automation when:14d'],
  ['Content Systems', 'social media reach OR short form video OR content marketing trend when:14d'],
  // 6. Team Training (the coach)
  ['Team Training', 'change management technology OR digital transformation workforce study when:14d'],
  ['Team Training', 'AI training staff OR AI adoption workplace OR employee upskilling when:14d'],
  ['Team Training', 'presentation tool OR Gamma OR meeting AI notetaker when:14d'],
  // 7. Dashboards & Reporting (the dashboard)
  ['Dashboards & Reporting', 'Power BI OR Looker OR Tableau OR Metabase analytics update when:14d'],
  ['Dashboards & Reporting', 'AI finance OR financial reporting automation OR cash flow analytics when:14d'],
  ['Dashboards & Reporting', 'data driven decision OR business intelligence OR KPI reporting trend when:14d'],
];

const AU_LOCAL = [
  ['AI Assistants', 'Australian small business AI OR technology adoption when:14d'],
  ['Automation', 'ATO OR ACCC OR Fair Work small business digital compliance update when:14d'],
];

const all = [...GLOBAL.map((q) => [...q, 'global']), ...AU_LOCAL.map((q) => [...q, 'au'])];

// Interleave by service so no single topic sits at the head of the feed and
// gets truncated last. Round-robin across pillars keeps the candidate pool varied.
const byPillar = new Map();
for (const row of all) {
  const p = row[0];
  if (!byPillar.has(p)) byPillar.set(p, []);
  byPillar.get(p).push(row);
}
const interleaved = [];
let added = true;
while (added) {
  added = false;
  for (const bucket of byPillar.values()) {
    if (bucket.length) {
      interleaved.push(bucket.shift());
      added = true;
    }
  }
}

return interleaved.map(([servicePillar, q, geo]) => {
  const base = 'https://news.google.com/rss/search?q=' + encodeURIComponent(q);
  // Global searches read US/global editions, AU searches read the AU edition.
  const locale = geo === 'au' ? '&hl=en-AU&gl=AU&ceid=AU:en' : '&hl=en-US&gl=US&ceid=US:en';
  return { json: { feedUrl: base + locale, sourceQuery: q, servicePillar, geo } };
});`;

// Rewrite: report the event, then connect it to the gap our capability closes.
const DS_REWRITE_PROMPT = [
  '=You are the brand voice writer for SYSBILT, a Sydney team that builds business systems for Australian small and medium businesses. Turn this source into a SYSBILT news item.',
  '',
  'What a SYSBILT news item is: it reports a real, recent event and then tells the reader what it means for their business and which capability closes the gap it exposes. It is journalistic and advisory, never a press release and never a hard sell.',
  '',
  'Structure across 4 to 6 paragraphs:',
  '1. Report what actually happened. Name the specific actor, tool, platform, policy, report, or incident. The story can be global, that is fine.',
  '2. Turn straight to why it matters for an Australian small or medium business owner. Make it about their time, money, stress, or risk.',
  '3. Make the gap concrete: the specific problem, cost, or opportunity this event creates for them.',
  '4. Connect that gap to the relevant SYSBILT capability in plain outcome language (what it does for them), woven in naturally, never a sales pitch. This connection is required, it is the whole point of the item.',
  '5. Name the honest limitation or catch. Every item is honest about the trade-off.',
  '6. End on a single takeaway line.',
  '',
  'Grounding: stay strictly to the facts in the source. Do not invent statistics, dollar figures, dates, names, or quotes. If the source is thin, write about what the development means for the area in general.',
  '',
  'Title rules: under 90 characters, lead with the concrete news angle, do not reuse a generic frame like "What small businesses need to know" or "Why your website matters" unless the source is literally about that.',
  '',
  'Brand voice: Australian spelling (organise, optimise, colour, centre). Never use em dashes or en dashes, use commas or a new sentence. Never use exclamation marks. Use "we" for SYSBILT, never "I". Direct, practical, warm, confident, no jargon. You may name the tools the reader uses (Google, Meta, Shopify, Xero, ChatGPT, Claude). Explain what we do in plain language, never name prices, never use persona names or pillar numbers.',
  '',
  'Return a strict JSON object only, no markdown, no preamble: {"title": "string under 90 chars", "bodyText": "Paragraph one.\\n\\nParagraph two.\\n\\nParagraph three.\\n\\nParagraph four."}',
  '',
  'Rewrite this item. Source title: {{ $json.sourceTitle }}. Source summary: {{ $json.sourceSummary }}. The capability that closes the gap for the reader: {{ $json.servicePillar }}. The concrete gap to make real: {{ $json.serviceGap }}.',
].join('\n');

function patchWorkflow(wf) {
  let changes = 0;

  const feeds = wf.nodes.find((n) => n.name === 'Build Feeds');
  if (feeds) {
    feeds.parameters.jsCode = BUILD_FEEDS_JS;
    changes++;
    console.log('Patched Build Feeds (7 service buckets, global + AU, interleaved)');
  }

  const normalise = wf.nodes.find((n) => n.name === 'Normalise and Dedupe');
  if (normalise) {
    normalise.parameters.jsCode = NORMALISE_DEDUPE_JS;
    changes++;
    console.log('Patched Normalise and Dedupe (drop stale >14 days)');
  }

  const preLimit = wf.nodes.find((n) => n.name === 'Pre-Limit');
  if (preLimit && preLimit.parameters.maxItems !== 60) {
    preLimit.parameters.maxItems = 60;
    changes++;
    console.log('Patched Pre-Limit maxItems=60 (wider, interleaved pool)');
  }

  const select = wf.nodes.find((n) => n.name === SELECT_NODE || n.name === OLD_SELECT_NODE);
  if (select) {
    const wasGroq = select.type === 'n8n-nodes-base.httpRequest';
    const idx = wf.nodes.findIndex((n) => n.id === select.id);
    wf.nodes[idx] = buildDeepSeekSelectNode(select);
    if (wasGroq || select.name === OLD_SELECT_NODE) {
      renameNodeInConnections(wf.connections, OLD_SELECT_NODE, SELECT_NODE);
    }
    changes++;
    console.log('Patched DS Select and Tag (DeepSeek replaces Groq)');
  }

  const parseGroq = wf.nodes.find((n) => n.name === 'Parse Groq Response');
  if (parseGroq) {
    parseGroq.parameters.jsCode = PARSE_GROQ_JS;
    changes++;
    console.log('Patched Parse Groq Response (merge source fields, normalize phase)');
  }

  const balance = wf.nodes.find((n) => n.name === 'Balance by Phase');
  if (balance) {
    balance.parameters.jsCode = BALANCE_BY_PHASE_JS;
    changes++;
    console.log('Patched Balance by Phase (9 max, weighted areas, max 2/service, horizon 1)');
  }

  const cleanup = wf.nodes.find((n) => n.name === 'Cleanup Gate');
  if (cleanup) {
    cleanup.parameters.jsCode = CLEANUP_GATE_JS;
    changes++;
    console.log('Patched Cleanup Gate (robust JSON parse)');
  }

  const ds = wf.nodes.find((n) => n.name === 'DS NEWS Rewrite');
  if (ds) {
    ds.parameters.messages.values[0].content = DS_REWRITE_PROMPT;
    ds.parameters.options = { ...(ds.parameters.options || {}), maxTokens: 4096, temperature: 0.5 };
    changes++;
    console.log('Patched DS NEWS Rewrite (service-connected, maxTokens=4096)');
  }

  const clearDrafts = wf.nodes.find((n) => n.name === 'Clear Published and draft previous News');
  if (clearDrafts?.parameters?.jsonBody?.includes('JSON.stringify({ mutations: [{"delete"')) {
    clearDrafts.parameters.jsonBody = `={
  "mutations": [
    { "delete": { "query": "*[_type == 'newsItem' && _id in path('drafts.**')]" } }
  ]
}`;
    changes++;
    console.log('Reverted Clear Published and draft previous News to static JSON body');
  }

  const socialOk =
    wf.nodes.some((n) => n.name === 'Build Content Objects') &&
    wf.nodes.some((n) => n.name === 'Call Distributor') &&
    wf.connections['Pull Published News']?.main?.[0]?.some((l) => l.node === 'Build Content Objects') &&
    wf.connections['Call Distributor']?.main?.[0]?.some((l) => l.node === 'Restore Pull For Newsletter');
  console.log(socialOk ? 'Social branch: OK (serial)' : 'Social branch: MISSING — run deploy-social-pipeline.sh');

  return changes;
}

async function main() {
  const wf = await n8n('GET', `/workflows/${NEWS_WF_ID}`);
  const changes = patchWorkflow(wf);
  if (!changes) {
    console.log('No changes applied');
    return;
  }
  await n8n('PUT', `/workflows/${NEWS_WF_ID}`, {
    name: wf.name,
    nodes: wf.nodes,
    connections: wf.connections,
    settings: { executionOrder: wf.settings?.executionOrder || 'v1' },
  });
  console.log(`Updated SYSBILT - NEWS (${NEWS_WF_ID}) — ${changes} patch(es)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
