#!/usr/bin/env node
/**
 * Patch Master Analyst accuracy + Parse Audit JSON sanitizer on audit workflows.
 *
 * Root cause: SerpAPI knowledge_graph.unclaimed_listing often returns true on fully
 * managed profiles. Prompt alone is not enough; Parse Audit JSON strips claim findings.
 *
 * Usage:
 *   node scripts/automations/n8n/patch-audit-analyst-accuracy.mjs
 *   node scripts/automations/n8n/patch-audit-analyst-accuracy.mjs --inbound-too
 */
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../../..');
const OUTBOUND_ID = 'zOZh6wE70PikOCqI';
const INBOUND_ID = 'TvkvfhrMWWHAEQFd';

const ACCURACY_BLOCK = `
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

OWNER GIFT RULES v2 (critical, non-negotiable):

This report is a gift for a busy business owner, not a technical memo for an agency. Every sentence must earn its place by helping them see lost enquiries, lost trust, or a clear next move.

Add these top-level fields on the same JSON object as "diagnosis" (not nested under appendix):

- "gift_intro": 2 to 3 sentences. Speak to the owner. Say what you checked (find, trust, book) and that the pages below show what it is costing them and what to fix first. Never write "not a sales pitch", "front-of-house systems", "outside pass", or "if we worked together".
- "ai_site_read": mandatory. Using Raw HTML (ScrapingBee) as source of truth, plus the Jina scrape for readable copy. This is a MACHINE / AI read of the homepage, not a pretend human visit. Do not write "a first visitor would notice" or "when you walk into the site". Write 2 to 4 short paragraphs separated by blank lines (\\n\\n), or one short opening paragraph plus 3 to 5 bullet lines each starting with "- ". Cover promise, booking path, speed feel, trust, and clutter in polished owner English. Every line must sound written for a person, not a checklist dump. If the page was bot-blocked, thin, broken, or unreadable, say that plainly and why it matters for Google and for AI answers. About 90 to 160 words total.

For appendix.tools_detected[].plain_english: one or two sentences of OWNER MEANING. Say what found / missing / broken means for catching or losing an enquiry (booking path, live chat, CRM or form handoff, tracking). Do not only name the tool.

For appendix.page_health.*.plain_english: one sentence of OWNER MEANING tied to the Present / Missing / Could not verify state (snippet clicks, machine understanding, trust, scanability). Do not only restate the field name.

Also add on appendix (same object as tools_detected):

- "tools_context": 60 to 110 words AFTER the tools list. Interpret the actual found vs missing rows for the owner (good that analytics is live; bad that chat, booking, or CRM is missing). Do not explain what tools are in general. Explain what THESE results mean for booked jobs and follow-up.
- "page_health_context": 60 to 110 words AFTER the page health cards. Interpret Present / Missing / Could not verify for money and discovery. Do not restate the section definition.

For every section "context" field (how_they_find_you, how_they_perceive_you, what_people_say): write 70 to 120 words of OWNER RESULT MEANING. Do not explain what the section is. Explain what the results above mean for money, patients, booked jobs, or wasted ads. Example shape: you are 4th for X, so named competitors get the first clicks; a few focused fixes can move you up and stop you paying for attention you should already own.

diagnosis.consequence must be owner cost language (leads, trust, bookings), never jargon for its own sake.

Do not open diagnosis.critical with ABN / interstate entity name collisions unless the public search results clearly show a different clinic stealing branded clicks. Prefer findability, pack, speed, booking path, or trust.

SWOT opportunities must never say "claim", "unclaimed", or "verify your Google". Prefer "strengthen Google profile activity", posts, photos, categories, or local pages.

Never mention "Own this business?", claiming, or verifying a Google listing in any owner-facing field.

PRODUCT PICK RULE v1 (critical, non-negotiable):

appendix.action_plan must recommend the real next job, not Hosted Website Plan by default.

- Do NOT write "start again", "rebuild", "brochure site", "front door rebuild", or "hosted website" in action_plan unless the homepage is thin, dead, parked, bot-blocked, or a throwaway builder page with almost no real practice content.
- A multi-page clinic site with services, a blog, or long-running brand copy is NOT a rebuild case. Prefer Google Profile Fix, Website Speed Fix, Search Visibility Fix, Booking System, or Review Engine based on the primary diagnosis.
- Never call the offer a "brochure" in owner-facing copy. That word is banned in findings, action_plan, and context.
- PageSpeed in the 40s to 60s is Website Speed Fix territory, not a new site.
- Missing meta, schema, chat, or CRM alone is a patch, not a rebuild.

Banned owner-facing filler: "leverage", "utilise", "click goldmine", "outside pass", "systems audit", "directional not definitive" inside findings.
`.trim();

const PARSE_SANITIZE_MARKER = 'scrubFalseGbpClaimFindings';

function loadEnvLocal() {
  const path = resolve(ROOT, '.env.local');
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#') || !t.includes('=')) continue;
    const i = t.indexOf('=');
    const key = t.slice(0, i).trim();
    const val = t.slice(i + 1).trim();
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

async function n8n(method, path, body) {
  const res = await fetch(`${N8N_BASE}/api/v1${path}`, {
    method,
    headers: {
      'X-N8N-API-KEY': N8N_KEY,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`${method} ${path} -> ${res.status}: ${text.slice(0, 400)}`);
  }
  return json;
}

function getPrompt(node) {
  return node?.parameters?.messages?.values?.[0]?.content || '';
}

function setPrompt(node, content) {
  if (!node.parameters) node.parameters = {};
  if (!node.parameters.messages) node.parameters.messages = { values: [{ content }] };
  else if (!Array.isArray(node.parameters.messages.values) || !node.parameters.messages.values[0]) {
    node.parameters.messages.values = [{ content }];
  } else {
    node.parameters.messages.values[0].content = content;
  }
}

function stripOldAccuracyBlocks(prompt) {
  // Remove prior accuracy blocks so redeploys replace instead of stacking.
  return prompt
    .replace(
      /\n*GOOGLE BUSINESS PROFILE CLAIM RULE(?: v2)? \(critical, non-negotiable\):[\s\S]*?(?=\n(?:CRITICAL OUTPUT RULES:|JSON SYNTAX \(mandatory\):|REVIEW NUMBER CONSISTENCY RULE|PAGE HEALTH VALUE RULE|OWNER GIFT RULES|PRODUCT PICK RULE)|$)/g,
      '\n\n',
    )
    .replace(
      /\n*REVIEW NUMBER CONSISTENCY RULE(?: v1)? \(critical, non-negotiable\):[\s\S]*?(?=\n(?:CRITICAL OUTPUT RULES:|JSON SYNTAX \(mandatory\):|PAGE HEALTH VALUE RULE|GOOGLE BUSINESS PROFILE CLAIM RULE|OWNER GIFT RULES|PRODUCT PICK RULE)|$)/g,
      '\n\n',
    )
    .replace(
      /\n*PAGE HEALTH VALUE RULE(?: v1)? \(critical, non-negotiable\):[\s\S]*?(?=\n(?:CRITICAL OUTPUT RULES:|JSON SYNTAX \(mandatory\):|GOOGLE BUSINESS PROFILE CLAIM RULE|REVIEW NUMBER CONSISTENCY RULE|OWNER GIFT RULES|PRODUCT PICK RULE)|$)/g,
      '\n\n',
    )
    .replace(
      /\n*OWNER GIFT RULES(?: v[12])? \(critical, non-negotiable\):[\s\S]*?(?=\n(?:CRITICAL OUTPUT RULES:|JSON SYNTAX \(mandatory\):|GOOGLE BUSINESS PROFILE CLAIM RULE|REVIEW NUMBER CONSISTENCY RULE|PAGE HEALTH VALUE RULE|PRODUCT PICK RULE)|$)/g,
      '\n\n',
    )
    .replace(
      /\n*PRODUCT PICK RULE(?: v1)? \(critical, non-negotiable\):[\s\S]*?(?=\n(?:CRITICAL OUTPUT RULES:|JSON SYNTAX \(mandatory\):|GOOGLE BUSINESS PROFILE CLAIM RULE|REVIEW NUMBER CONSISTENCY RULE|PAGE HEALTH VALUE RULE|OWNER GIFT RULES)|$)/g,
      '\n\n',
    );
}

const SENTIMENT_RULE_NEW =
  '- For sentiment: do NOT classify from review text snippets. Prefer whole-number percentages that sum to 100 from a Google Maps star histogram / rating_summary when present (4 and 5 stars = positive, 3 = neutral, 1 and 2 = negative). If no histogram is available, set positive, neutral and negative all to 0. A downstream step overwrites sentiment from Maps stars when available. Use Customer reviews text only for recent_theme and warm context, not for the sentiment percentages.';

function patchSentimentAndReviewSample(prompt) {
  let next = prompt;
  let changed = false;

  const sentimentRe =
    /- For sentiment:[\s\S]*?(?=\n\n- For review_sources|\n\n### |\n\nCRITICAL OUTPUT RULES:|$)/;
  if (sentimentRe.test(next)) {
    const replaced = next.replace(sentimentRe, `${SENTIMENT_RULE_NEW}\n\n`);
    if (replaced !== next) {
      next = replaced;
      changed = true;
    }
  } else if (!next.includes('do NOT classify from review text snippets')) {
    const themeAnchor = '- For review_sources, the Google recent_theme';
    if (next.includes(themeAnchor)) {
      next = next.replace(themeAnchor, `${SENTIMENT_RULE_NEW}\n\n${themeAnchor}`);
      changed = true;
    }
  }

  if (next.includes('.slice(0, 12)')) {
    next = next.replace(/\.slice\(0,\s*12\)/g, '.slice(0, 20)');
    changed = true;
  }

  return { prompt: next, changed };
}

function injectAccuracyRules(prompt) {
  if (!prompt) return { prompt, changed: false, reason: 'empty' };
  const stripped = stripOldAccuracyBlocks(prompt);
  let working = stripped;
  const sentiment = patchSentimentAndReviewSample(working);
  working = sentiment.prompt;

  const hasFullBlock =
    working.includes('GOOGLE BUSINESS PROFILE CLAIM RULE v2') &&
    working.includes('REVIEW NUMBER CONSISTENCY RULE v1') &&
    working.includes('PAGE HEALTH VALUE RULE v1') &&
    working.includes('OWNER GIFT RULES v2') &&
    working.includes('PRODUCT PICK RULE v1');

  if (!hasFullBlock) {
    const anchor = 'CRITICAL OUTPUT RULES:';
    if (working.includes(anchor)) {
      working = working.replace(anchor, `${ACCURACY_BLOCK}\n\n\n${anchor}`);
    } else {
      working = `${working.trimEnd()}\n\n\n${ACCURACY_BLOCK}\n`;
    }
  }

  if (working === prompt) return { prompt, changed: false, reason: 'unchanged' };
  const reasons = [];
  if (stripped !== prompt || !hasFullBlock) reasons.push('accuracy-block');
  if (sentiment.changed) reasons.push('sentiment-stars');
  return { prompt: working, changed: true, reason: reasons.join('+') || 'updated' };
}

function loadParseJs() {
  const parsePath = resolve(__dirname, 'parse-audit-json-code.js');
  const parseJs = readFileSync(parsePath, 'utf8');
  if (!parseJs.includes(PARSE_SANITIZE_MARKER)) {
    throw new Error('parse-audit-json-code.js missing scrubFalseGbpClaimFindings');
  }
  return parseJs;
}

function findAnalystNodes(wf) {
  return (wf.nodes || []).filter(
    (n) =>
      (n.name === 'DS Master Analyst' || n.name === 'Master Analyst') &&
      n.type === '@n8n/n8n-nodes-langchain.openAi',
  );
}

function patchParseNode(wf, label, parseJs) {
  const node = (wf.nodes || []).find((n) => n.name === 'Parse Audit JSON');
  if (!node) {
    console.warn(`[${label}] No Parse Audit JSON node`);
    return false;
  }
  const current = node.parameters?.jsCode || '';
  if (current.includes(PARSE_SANITIZE_MARKER) && current === parseJs) {
    console.log(`[${label}] Parse Audit JSON already sanitised`);
    return false;
  }
  node.parameters = { mode: 'runOnceForAllItems', jsCode: parseJs };
  console.log(`[${label}] Parse Audit JSON updated (${parseJs.length} chars, has scrubber)`);
  return true;
}

async function patchWorkflow(id, label, parseJs) {
  const wf = await n8n('GET', `/workflows/${id}`);
  let anyChanged = false;

  for (const node of findAnalystNodes(wf)) {
    const before = getPrompt(node);
    const { prompt, changed, reason } = injectAccuracyRules(before);
    console.log(`[${label}] ${node.name}: ${reason} (before ${before.length} chars)`);
    if (changed) {
      setPrompt(node, prompt);
      anyChanged = true;
      console.log(`[${label}] ${node.name}: now ${prompt.length} chars`);
    }
  }

  if (patchParseNode(wf, label, parseJs)) anyChanged = true;

  if (!anyChanged) {
    console.log(`[${label}] No update needed`);
    return false;
  }

  await n8n('PUT', `/workflows/${id}`, {
    name: wf.name,
    nodes: wf.nodes,
    connections: wf.connections,
    settings: { executionOrder: wf.settings?.executionOrder || 'v1' },
  });
  console.log(`[${label}] Saved ${N8N_BASE}/workflow/${id}`);
  return true;
}

async function main() {
  const inboundToo = process.argv.includes('--inbound-too');
  const parseJs = loadParseJs();
  await patchWorkflow(OUTBOUND_ID, 'Outbound Audit Runner', parseJs);
  if (inboundToo) {
    await patchWorkflow(INBOUND_ID, 'Inbound audit source', parseJs);
  } else {
    console.log('Skipped inbound (pass --inbound-too to patch clone source TvkvfhrMWWHAEQFd)');
  }

  const statePath = resolve(__dirname, '.deploy-state.env');
  const line = `AUDIT_ANALYST_ACCURACY_V2_AT=${new Date().toISOString()}\n`;
  if (existsSync(statePath)) {
    writeFileSync(statePath, readFileSync(statePath, 'utf8') + line);
  } else {
    writeFileSync(statePath, line);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
