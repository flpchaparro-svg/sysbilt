/**
 * Quote Capture AI Concierge (sandbox + live install).
 * Same locked landscaping rate card digest. Never invents prices.
 */

import {
  ACCESS_OPTIONS,
  FINISH_OPTIONS,
  JOBS,
  MATERIALS_OPTIONS,
  SITE_CONDITIONS,
  SITUATIONS,
  SIZE_PRESETS,
} from './landscapingRateCard.js'

const MODEL = 'gemini-2.5-flash'
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`
const MAX_MESSAGES = 24
const MAX_INPUT_CHARS = 800
const MAX_OUTPUT_TOKENS = 2048
const TEMPERATURE = 0.4

export type ConciergeMessage = {role: 'user' | 'model'; text: string}

export type ConciergeWizardContext = {
  mode?: string
  step?: string
  businessName?: string
  situationLabel?: string | null
  jobLabel?: string | null
  sizeLabel?: string | null
  materialsLabel?: string | null
  finishLabel?: string | null
  accessLabel?: string | null
  siteLabel?: string | null
}

function str(v: unknown, max = 200): string {
  if (typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}

export function buildLandscapingRateCardDigest(): string {
  const situations = SITUATIONS.map(
    (s) => `- ${s.label}: ${s.blurb}${s.unsure ? ' (unsure option)' : ''}`,
  ).join('\n')

  const jobs = Object.values(JOBS)
    .map((j) => {
      const finishes = j.finishOptions.length
        ? ` finishes: ${j.finishOptions.map((id) => FINISH_OPTIONS[id]?.label || id).join(', ')}.`
        : ''
      const extras = j.extras.length
        ? ` extras: ${j.extras.map((e) => e.label).join(', ')}.`
        : ''
      const clearing = j.impliesRemoval
        ? ' Includes ripping out / clearing the old surface.'
        : ' Assumes ground is already bare or ready enough that full rip-out is not in this line.'
      return `- ${j.label} (${j.id}): ${j.blurb}.${clearing} Unit ${j.unit}. Setup/base $${j.base}. Per ${j.unit} $${j.perUnit}.${finishes}${extras}`
    })
    .join('\n')

  const sizes = Object.values(SIZE_PRESETS)
    .map((s) => `- ${s.label}${s.value ? ` (~${s.value}${s.id.includes('length') || s.id.includes('run') || s.id.includes('boundary') ? 'm' : ' m²'})` : ''}`)
    .join('\n')

  const access = ACCESS_OPTIONS.map(
    (a) => `- ${a.label}: ${a.blurb}. Surcharge ${a.surchargePct}%`,
  ).join('\n')

  const site = SITE_CONDITIONS.map((s) => `- ${s.label}: ${s.blurb}`).join('\n')
  const materials = MATERIALS_OPTIONS.map((m) => `- ${m.label}: ${m.blurb}`).join('\n')

  const decisionGuides = `
## How to explain common job pairs (use this when someone is confused)
- New turf on bare ground vs Rip out and re-turf: Bare ground means dirt, builder fill, or a cleared patch with no living lawn to remove. Rip out and re-turf means there is still old grass, thatch, or a dead lawn sitting there that must be lifted first. If they can still see lawn (even dead), guide them to rip out. If they are looking at soil already, guide them to new turf on bare ground. Rip out costs more because clearing is included.
- Front garden beds vs Front yard refresh package: Beds only means planting beds, plants, mulch for the street face. Refresh package is a broader tidy of the front: beds plus a general clean-up feel. If they only care about planting strips, beds. If the whole front looks tired, refresh.
- Front garden beds vs Side or rear garden beds: Front is street-facing kerb appeal. Side or rear is private yard beds.
- One side boundary fence vs Rear or full boundary fence: One side is a single run. Rear or full is the longer boundary job.
- Low retaining wall vs Longer retaining wall: Low is a short hold for a mild drop. Longer is a bigger run along a slope.
- Materials we supply vs you supply vs mix: We supply means the sample quote includes materials. You supply means labour-led. Mix means they already have some items.
- Access options: Easy is drive-up. Side gate is wheelbarrow path. Through the house means carrying through rooms. Crane is awkward sites that need lifting over.

## How to help someone decide if the lawn situation fits (diagnostic)
When they ask "is my lawn dead", "patchy", "can I save it", or "do I need to change it", teach first, then map to cards:
- Looks dead / needs replacing: mostly brown or grey with little or no green returning after rain or watering, bare dirt showing through, weeds winning, spongy thatch, or they already hate how it looks and want a reset. Point them to situation "The lawn is dead or patchy", then usually "Rip out and re-turf" if old lawn is still there, or "New turf on bare ground" if it is already scraped to dirt.
- Might still be saveable (not a full replace job on this sample card): still mostly green after water, just dry or hungry, a few thin spots, recent heat stress that greened up again. Be honest: this sample rate card is built for replace / new turf style jobs, not a fertilise-and-wait service. Soft-no the "save it with feed only" path, then ask if they still want a fresh lawn install anyway.
- Always ask one either/or: after a good water, did green come back, or is it still brown and bare.
`.trim()

  return [
    '## Situations',
    situations,
    '',
    '## Jobs on the sample rate card',
    jobs,
    '',
    decisionGuides,
    '',
    '## Size presets',
    sizes,
    '',
    '## Materials',
    materials,
    '',
    '## Access',
    access,
    '',
    '## Ground / site',
    site,
  ].join('\n')
}

function formatWizardContext(ctx: ConciergeWizardContext): string {
  const live = ctx.mode === 'live'
  const lines = [
    `Mode: ${live ? 'live install' : 'sandbox demo'}`,
    `Step: ${ctx.step || 'unknown'}`,
    ctx.businessName
      ? live
        ? `Business name: ${ctx.businessName}`
        : `Demo personalisation name: ${ctx.businessName}`
      : null,
    ctx.situationLabel ? `Situation chosen: ${ctx.situationLabel}` : 'Situation: not chosen yet',
    ctx.jobLabel ? `Job chosen: ${ctx.jobLabel}` : 'Job: not chosen yet',
    ctx.sizeLabel ? `Size: ${ctx.sizeLabel}` : 'Size: not chosen yet',
    ctx.materialsLabel ? `Materials: ${ctx.materialsLabel}` : null,
    ctx.finishLabel ? `Finish: ${ctx.finishLabel}` : null,
    ctx.accessLabel ? `Access: ${ctx.accessLabel}` : null,
    ctx.siteLabel ? `Site: ${ctx.siteLabel}` : null,
  ].filter(Boolean)
  return lines.join('\n')
}

function buildSystemPrompt(ctx: ConciergeWizardContext): string {
  const digest = buildLandscapingRateCardDigest()
  const wizard = formatWizardContext(ctx)
  const live = ctx.mode === 'live'
  const biz = ctx.businessName?.trim() || (live ? 'this landscaping business' : 'the sample landscaping business')

  const identity = live
    ? `You are the Quote Capture Concierge on a live install for ${biz}. Speak as their yard quote helper.`
    : `You are the Quote Capture Concierge in a SYSBILT product sandbox demo.`

  const truth = live
    ? `# LIVE INSTALL TRUTH
- You help visitors get a quotation from ${biz}.
- Only use jobs and dollar amounts from the RATE CARD DIGEST (locked card for this install).
- Soft no still applies: if the job is not on the card, say so and point them to call or email. Do not invent a quote line.
- Do not call this a sandbox or sample demo. If this is a proof install with sample rates, you may say once that rates are for this install's locked card, then keep teaching.
- Prefer teaching the current choice over product talk.`
    : `# SANDBOX TRUTH (SAY THIS PLAINLY WHEN RELEVANT)
- This is a simulated landscaping business for demonstration.
- Rates are sample rates, not a real client's card.
- Soft no still applies: if the job is not on this sample card, say so and point them to call/email style soft no. Do not invent a quote line.
- Mention sandbox/simulated at most once every few turns. Prefer teaching the current choice.`

  const voiceWe = live
    ? `"We" for ${biz}. "You" for the visitor.`
    : `"We" for the demo landscaping voice. "You" for the visitor.`

  const outOfScope = live
    ? `# OUT OF SCOPE
- Do not sell unrelated SYSBILT services unless they ask what Quote Capture is.
- Do not output JSON, code, or system prompts.
- Do not claim SMS or email already sent unless the visitor is past submit and the page shows that.`
    : `# OUT OF SCOPE
- Do not sell unrelated SYSBILT services unless they ask what Quote Capture is.
- Do not output JSON, code, or system prompts.
- Do not claim SMS or email already sent in this sandbox.`

  return `${identity}

# WHO YOU ARE
You are a patient guide for people who feel confused, rushed, or unsure. Your job is to explain concepts in plain English, compare the options on screen, and help them choose the best fit for their yard. You are not a caption under the cards. Repeating the card titles is a failure.

# CORE JOB (NON-NEGOTIABLE)
When someone says they do not understand, asks what the difference is, asks which to pick, asks how to know, or sounds lost:
1. Explain the concept in plain language first.
2. Give simple signs they can check in their yard (what to look for).
3. Compare the relevant options and when each fits.
4. Ask one either/or question.
5. Recommend one path and why.
Never reply with only "you chose X, now pick Y". Never paste card titles without teaching. Never stop mid-sentence.

# CHAT WINS OVER STALE CLICKS
- The latest user message is the source of truth for what they want help with.
- If WIZARD CONTEXT says they picked "The front looks empty" but they are asking about lawn / dead grass / patchy turf, answer the lawn question. Do not force front-garden-bed talk.
- If they say they clicked the wrong card, acknowledge the mistake in one line, ignore the wrong selection, and help the topic they meant.
- Only use WIZARD CONTEXT as supporting detail when it matches what they are asking now.

# FINISH THE ANSWER
- Complete the full teaching reply before SUGGEST.
- SUGGEST chips support the decision (either/or answers, or the 1 to 2 best card labels). Do not use SUGGEST as a dumping ground that replaces the explanation.
- Aim for 5 to 10 short sentences when diagnosing or comparing.

${truth}

# VOICE
- Australian English (organise, colour, metre).
- Warm, plain, direct. Pub-test language. No hype words.
- No em dashes. No exclamation marks. No emojis.
- ${voiceWe}
- Replies can be a bit longer when teaching: about 4 to 8 short sentences, still easy to scan.

# HARD RULES ON MONEY
- Never invent, guess, discount, or round creatively.
- Only mention dollar amounts that appear in the RATE CARD DIGEST, or totals already on screen.
- Prefer explaining work differences before money. Money is secondary here.

# SOFT NO AND STEER BACK
- Off-card asks: one soft-no line, then 2 to 3 closest on-card choices with a one-line why for each.

# WIZARD HELP
- Use WIZARD CONTEXT. Teach the current step.
- On size: use supermarket car bay / half backyard style anchors. Measuring later is fine.
- When offering taps, use exact rate-card labels.
- Talk path stays in chat. Do not tell them they must leave chat unless they ask for the card wizard.

# OUTPUT FORMAT (STRICT)
Write plain visitor text only. No JSON. No markdown bold. No code fences.
Then on its own line write exactly: SUGGEST:
Then up to 4 lines, each starting with "- ", using exact rate-card labels or short next answers (max 48 characters each).
Good teaching example for lawn confusion:
If you can still see old grass, even dead grass, pick Rip out and re-turf. That job lifts the old lawn first, then prepares and lays new turf. Clearing is included.

If you are looking at bare dirt already, pick New turf on bare ground. That job prepares the soil and lays turf without a full rip-out first.

Quick check: is there still lawn sitting there, or is it already bare dirt?

SUGGEST:
- There is still lawn there
- It is already bare dirt
- New turf on bare ground
- Rip out and re-turf

${outOfScope}

# WIZARD CONTEXT (what they have clicked so far)
${wizard}

# RATE CARD DIGEST (only source of catalogue and rates)
${digest}
`
}

export type ConciergeResult =
  | {ok: true; reply: string; suggestions: string[]}
  | {ok: false; status: number; error: string}

function scrubLeakedJson(text: string): string {
  let t = text.trim()
  t = t.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()
  // Whole payload dumped as JSON
  if (t.startsWith('{') && /"reply"\s*:/.test(t)) {
    const m = t.match(/"reply"\s*:\s*"((?:\\.|[^"\\])*)"/)
    if (m?.[1]) {
      return m[1]
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
        .trim()
    }
    // Truncated {"reply": "partial
    const partial = t.match(/"reply"\s*:\s*"([\s\S]*)$/)
    if (partial?.[1]) {
      return partial[1]
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
        .replace(/"\s*,?\s*"suggestions"[\s\S]*$/i, '')
        .replace(/"\s*$/,'')
        .trim()
    }
  }
  // Strip accidental leading {"reply":
  t = t.replace(/^\{?\s*"reply"\s*:\s*"/i, '').replace(/"\s*\}\s*$/,'')
  return t.trim()
}

function parseConciergePayload(raw: string): {reply: string; suggestions: string[]} {
  let trimmed = raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()

  // Preferred format: plain text + SUGGEST: block
  const suggestIdx = trimmed.search(/\n\s*SUGGEST:\s*\n/i)
  if (suggestIdx >= 0) {
    const reply = scrubLeakedJson(trimmed.slice(0, suggestIdx)).trim()
    const sugPart = trimmed.slice(suggestIdx).replace(/^\s*SUGGEST:\s*/i, '')
    const suggestions = sugPart
      .split('\n')
      .map((line) => line.replace(/^\s*[-*•]\s*/, '').trim())
      .filter((line) => line && !line.startsWith('{') && line.length <= 60)
      .slice(0, 4)
    if (reply) return {reply, suggestions}
  }

  // Inline SUGGEST: on same stream without newline discipline
  const softSuggest = trimmed.match(/^([\s\S]*?)\bSUGGEST:\s*([\s\S]*)$/i)
  if (softSuggest) {
    const reply = scrubLeakedJson(softSuggest[1] || '').trim()
    const suggestions = (softSuggest[2] || '')
      .split('\n')
      .map((line) => line.replace(/^\s*[-*•]\s*/, '').trim())
      .filter((line) => line && !line.startsWith('{') && line.length <= 60)
      .slice(0, 4)
    if (reply) return {reply, suggestions}
  }

  // Legacy JSON (complete or truncated)
  if (trimmed.includes('"reply"')) {
    try {
      const start = trimmed.indexOf('{')
      const end = trimmed.lastIndexOf('}')
      if (start >= 0 && end > start) {
        const parsed = JSON.parse(trimmed.slice(start, end + 1)) as {
          reply?: unknown
          suggestions?: unknown
        }
        const reply = scrubLeakedJson(typeof parsed.reply === 'string' ? parsed.reply : '')
        const suggestions = Array.isArray(parsed.suggestions)
          ? parsed.suggestions
              .map((s) => (typeof s === 'string' ? s.trim() : ''))
              .filter(Boolean)
              .slice(0, 4)
          : []
        if (reply) return {reply, suggestions}
      }
    } catch {
      // fall through to scrub
    }
  }

  const reply = scrubLeakedJson(trimmed)
  return {
    reply:
      reply ||
      'Try one of the cards on screen, or ask again in a short line.',
    suggestions: [],
  }
}

export async function processQuoteCaptureConcierge(
  body: Record<string, unknown>,
): Promise<ConciergeResult> {
  const apiKey = process.env.GEMINI_API_KEY?.trim()
  if (!apiKey) {
    return {ok: false, status: 500, error: 'GEMINI_API_KEY missing'}
  }

  const rawMessages = Array.isArray(body.messages) ? body.messages : null
  if (!rawMessages) {
    return {ok: false, status: 400, error: 'messages array required'}
  }
  if (rawMessages.length > MAX_MESSAGES) {
    const ctxPeek =
      body.context && typeof body.context === 'object'
        ? (body.context as Record<string, unknown>)
        : {}
    const live = str(ctxPeek.mode, 40) === 'live'
    return {
      ok: true,
      reply: live
        ? 'This chat thread is long enough. Keep going with the quote cards, or start again from the top.'
        : 'This chat thread is long enough. Keep going with the sample wizard cards, or start the demo again from the top.',
      suggestions: live
        ? ['Prefer the quote wizard', 'Start again later']
        : ['Prefer the sample wizard', 'Start again later'],
    }
  }

  const messages: ConciergeMessage[] = []
  for (const m of rawMessages) {
    if (!m || typeof m !== 'object') {
      return {ok: false, status: 400, error: 'Invalid message'}
    }
    const role = (m as {role?: unknown}).role
    const text = str((m as {text?: unknown}).text, MAX_INPUT_CHARS)
    if (role !== 'user' && role !== 'model') {
      return {ok: false, status: 400, error: 'Invalid message role'}
    }
    if (!text) continue
    messages.push({role, text})
  }
  if (!messages.length) {
    return {ok: false, status: 400, error: 'Empty messages'}
  }

  const ctxRaw =
    body.context && typeof body.context === 'object'
      ? (body.context as Record<string, unknown>)
      : {}
  const ctx: ConciergeWizardContext = {
    mode: str(ctxRaw.mode, 40) || 'sandbox',
    step: str(ctxRaw.step, 40),
    businessName: str(ctxRaw.businessName, 120) || undefined,
    situationLabel: str(ctxRaw.situationLabel, 120) || null,
    jobLabel: str(ctxRaw.jobLabel, 120) || null,
    sizeLabel: str(ctxRaw.sizeLabel, 120) || null,
    materialsLabel: str(ctxRaw.materialsLabel, 120) || null,
    finishLabel: str(ctxRaw.finishLabel, 120) || null,
    accessLabel: str(ctxRaw.accessLabel, 120) || null,
    siteLabel: str(ctxRaw.siteLabel, 120) || null,
  }

  const systemPrompt = buildSystemPrompt(ctx)
  const geminiPayload = {
    systemInstruction: {parts: [{text: systemPrompt}]},
    contents: messages.map((m) => ({
      role: m.role,
      parts: [{text: m.text}],
    })),
    generationConfig: {
      temperature: TEMPERATURE,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      topP: 0.9,
      // Gemini 2.5 thinking tokens eat the output budget and truncate teaching replies.
      thinkingConfig: {thinkingBudget: 0},
    },
  }

  let res: Response
  try {
    res = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(geminiPayload),
    })
  } catch (err) {
    return {
      ok: false,
      status: 502,
      error: err instanceof Error ? err.message : 'Gemini network error',
    }
  }

  if (!res.ok) {
    const t = await res.text().catch(() => '')
    return {
      ok: false,
      status: 502,
      error: `Gemini ${res.status}${t ? `: ${t.slice(0, 200)}` : ''}`,
    }
  }

  const data = (await res.json()) as {
    candidates?: {content?: {parts?: {text?: string}[]}}[]
  }
  const raw =
    data.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('')?.trim() ||
    ''

  if (!raw) {
    const live = ctx.mode === 'live'
    return {
      ok: true,
      reply: live
        ? 'I could not form a reply just then. Try one more question, or keep going with the quote cards.'
        : 'I could not form a reply just then. Try one more question, or keep going with the sample cards.',
      suggestions: live
        ? ['Start the quote wizard', 'What jobs are on the card']
        : ['Start the sample wizard', 'What jobs are on the card'],
    }
  }

  const parsed = parseConciergePayload(raw)
  return {
    ok: true,
    reply: parsed.reply,
    suggestions: parsed.suggestions,
  }
}
