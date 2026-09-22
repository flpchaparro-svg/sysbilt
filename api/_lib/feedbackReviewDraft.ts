/**
 * Feedback Review draft.
 * The skeleton is the fallback if the model call fails.
 * The model writes from meanings, not from a fixed sentence per tap.
 */

import {buildVariedReview} from '../../src/lib/feedbackReviewSkeleton.js'

const DETAIL_LINES: Record<string, string> = {
  'full-site': 'a full website',
  landing: 'a landing page',
  shop: 'an online shop',
  forms: 'contact forms',
  fixes: 'fixes on the existing site',
  'other-detail': 'website work',
  setup: 'CRM setup',
  pipeline: 'pipeline work',
  followup: 'follow-up setup',
  cleanup: 'CRM cleanup',
  'lead-flow': 'lead automation',
  'job-flow': 'job automation',
  alerts: 'alert automation',
  'other-auto': 'automation',
  'site-chat': 'website chat',
  phone: 'phone AI',
  'team-ai': 'team AI',
  'other-ai': 'AI help',
  posting: 'social posting',
  blog: 'blog content',
  system: 'a publishing system',
  'other-content': 'content work',
  workshop: 'a training workshop',
  playbook: 'a playbook for the team',
  handover: 'a handover',
  'other-train': 'training',
  'live-board': 'a live dashboard',
  weekly: 'weekly reporting',
  tracking: 'tracking setup',
  'other-dash': 'reporting',
  speed: 'website speed work',
  images: 'image and media cleanup',
  'other-speed': 'speed work',
  'profile-clean': 'Google profile cleanup',
  claim: 'profile claim and access',
  'other-profile': 'Google profile work',
  wizard: 'a quote wizard',
  rates: 'a locked rate card',
  'other-quote': 'quote capture work',
  index: 'getting pages into Google',
  sitemap: 'sitemap and crawl fixes',
  'other-search': 'search visibility work',
}

const PERSON_TRAIT_LINES: Record<string, string> = {
  clear: 'explained things in plain language',
  fast: 'was quick to reply',
  patient: 'was patient when I had questions',
  honest: 'was straight about what was possible',
  organised: 'kept the work organised',
  skilled: 'really knew their stuff',
  calm: 'stayed calm when things got messy',
  listened: 'actually listened to what we needed',
}

const STYLE_HINTS = ['direct', 'warm', 'short', 'detail-first'] as const
const SHAPES = [
  'Job and result in one sentence, then the person, then how the contact or the files felt if that was good, then a short closer if they would return.',
  'Open on the person, then the job and the result together, then how it felt. Do not give updates their own sentence.',
  'Open on the result or how it felt, then name the work, then the person. Four sentences at most.',
  'Customer note first if it has a real point. Then the job and the result in one sentence. Then the person. Skip any fact the note already covers.',
] as const

const UPDATE_SWAPS = [
  'they told us where the job was up to',
  'we always knew what was happening',
  'we did not have to chase them',
  'they checked in as the work moved',
] as const

export type FeedbackDraftInput = {
  serviceLabel: string
  detailId: string | null
  detailOther: string
  score: number
  personName: string
  resultId: string | null
  attentionId: string | null
  comfortId: string | null
  personId: string | null
  personTraitIds: string[]
  materialsId: string | null
  againId: string | null
  /** Happy-path free text (praise / specifics). Improve notes stay out. */
  extraNote?: string
}

function detailLine(input: FeedbackDraftInput): string {
  const otherDetail = input.detailOther.trim()
  if (input.detailId === 'other-detail' && otherDetail) return otherDetail
  return (input.detailId && DETAIL_LINES[input.detailId]) || input.serviceLabel
}

export function buildReviewSkeleton(input: FeedbackDraftInput): string {
  return buildVariedReview({
    detail: detailLine(input),
    personName: input.personName,
    resultId: input.resultId,
    attentionId: input.attentionId,
    comfortId: input.comfortId,
    personId: input.personId,
    personTraitIds: input.personTraitIds,
    materialsId: input.materialsId,
    againId: input.againId,
    extraNote: input.extraNote,
  })
}

function pickHint<T extends readonly string[]>(hints: T): T[number] {
  return hints[Math.floor(Math.random() * hints.length)]
}

function swapPhrase(match: string, choices: readonly string[]): string {
  const line = pickHint(choices)
  if (match[0] && match[0] === match[0].toUpperCase()) {
    return line.charAt(0).toUpperCase() + line.slice(1)
  }
  return line
}

/** Last-resort scrub if the model still reaches for the old stock lines. */
function softenSurveySpeak(text: string): string {
  return text
    .replace(/\bthey kept (me|us) in the loop\b/gi, (match) =>
      swapPhrase(match, UPDATE_SWAPS),
    )
    .replace(/\bkept (me|us) in the loop\b/gi, (match) =>
      swapPhrase(match, UPDATE_SWAPS),
    )
    .replace(/\bin the loop\b/gi, (match) =>
      match[0] === match[0].toUpperCase() ? 'Up to date' : 'up to date',
    )
    .replace(/\bcommunication was tight\b/gi, (match) =>
      swapPhrase(match, UPDATE_SWAPS),
    )
    .replace(/\bkept everything tight\b/gi, 'kept things clear')
    .replace(/\btight from start to finish\b/gi, 'clear from start to finish')
    .replace(/\bcrystal clear\b/gi, 'easy to follow')
    .replace(/\bnailed it\b/gi, 'got it right')
}

function stripRatingOpener(text: string): string {
  return text
    .replace(
      /^(we (worked with|had) sysbilt[^.!?]{0,120}?\d\s*out of\s*5\.?\s*)/i,
      '',
    )
    .replace(
      /^(i('d| would)? (give|gave) (them|this company|sysbilt)[^.!?]{0,80}?(\d\s*out of\s*5|five stars)\.?\s*)/i,
      '',
    )
    .trim()
}

function cleanModelDraft(raw: string, skeleton: string): string {
  let text = raw.trim()
  text = text.replace(/^```[\w]*\n?|\n?```$/g, '').trim()
  text = text.replace(/^["']|["']$/g, '').trim()
  text = text.replace(/^(here('s| is) (a |the )?review[:\s]*)/i, '').trim()
  text = text.replace(/\u2014/g, ',').replace(/--/g, ',')
  text = text.replace(/!/g, '.')
  text = text.replace(/\s+/g, ' ').trim()
  text = stripRatingOpener(text)
  text = softenSurveySpeak(text)
  if (!text || text.length < 40) return skeleton
  if (text.length > 900) return skeleton
  return text
}

export async function polishReviewWithDeepSeek(
  input: FeedbackDraftInput & { skeleton: string },
): Promise<{ draft: string; usedAi: boolean; styleHint: string }> {
  const styleHint = pickHint(STYLE_HINTS)
  const extra = (input.extraNote || '').trim()
  const shape = extra ? pickHint(SHAPES) : pickHint(SHAPES.slice(0, 3))
  const skeleton = input.skeleton
  const apiKey =
    process.env.SYSBILT_deepseek_api_key?.trim() ||
    process.env.DEEPSEEK_API_KEY?.trim() ||
    ''

  if (!apiKey) {
    return {draft: skeleton, usedAi: false, styleHint}
  }

  const facts = {
    serviceLabel: input.serviceLabel,
    detail: detailLine(input),
    personName: input.personName,
    result:
      input.resultId === 'nailed'
        ? 'The finished work matched what was agreed, or was better.'
        : input.resultId === 'solid'
          ? 'The result was good, with only small niggles, and ready to use.'
          : '',
    updates:
      input.attentionId === 'tight'
        ? 'Updates were clear and they did not have to chase.'
        : input.attentionId === 'fine'
          ? 'Contact was enough. They heard back when it mattered.'
          : '',
    comfort:
      input.comfortId === 'yes'
        ? 'They felt looked after the whole way.'
        : input.comfortId === 'mostly'
          ? 'They felt comfortable, with a few bumps.'
          : '',
    personFeel:
      input.personId === 'excellent'
        ? 'excellent to work with'
        : input.personId === 'good'
          ? 'good to work with'
          : '',
    personTraits: input.personTraitIds
      .map((id) => PERSON_TRAIT_LINES[id])
      .filter(Boolean),
    materials:
      input.materialsId === 'crystal'
        ? 'Briefs, links, and files were easy to follow.'
        : input.materialsId === 'mostly'
          ? 'Materials were mostly clear, with a couple of fuzzy bits.'
          : '',
    wouldReturn: input.againId === 'yes' || input.againId === 'likely',
    extraNote: extra,
    styleHint,
    shape,
  }

  const system = [
    'You write Google review drafts for SYSBILT, an Australian business systems agency.',
    'Write a natural first-person review in Australian English, as the customer.',
    'Write 3 to 5 sentences that connect, like a person talking. Not a list of survey answers.',
    'Combine facts. Do not give each fact its own sentence.',
    'The JSON is the meaning, not the sentence. Do not copy its phrases.',
    'Google already shows the star rating. Never mention stars, scores, or out of 5.',
    'Never open with the company name plus a rating.',
    'If extraNote has a real point, the first sentence comes from that point, cleaned up. Do not paste a messy transcript.',
    'If extraNote is empty, or only a future request, ignore it.',
    'Do not invent jobs, results, praise, people, or facts that are not in the JSON.',
    'Never write: in the loop, kept me in the loop, kept us in the loop, crystal clear, nailed it, communication was tight.',
    'If updates were good, say that as check-ins, replies, knowing where the job was up to, or not having to chase. Pick one way.',
    'If the files were clear, say that as notes, links, or instructions that were easy to follow. Pick one way.',
    'Work the person traits into one sentence about that person. Paraphrase them.',
    'Follow shape for the order of the review.',
    'If they would return, vary the last line: recommend them, use them again, send someone, or glad they picked them.',
    'No marketing nicknames or hype words.',
    'No em dashes. No exclamation marks. No emoji.',
    'Output the review text only.',
  ].join(' ')

  try {
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-flash',
        temperature: 0.95,
        max_tokens: 500,
        thinking: {type: 'disabled'},
        messages: [
          {role: 'system', content: system},
          {
            role: 'user',
            content: `Write this review from these facts. Do not copy the wording.\n${JSON.stringify(facts, null, 2)}`,
          },
        ],
      }),
    })
    if (!res.ok) {
      const errText = await res.text()
      console.warn('[feedback-review] DeepSeek HTTP', res.status, errText.slice(0, 200))
      return {draft: skeleton, usedAi: false, styleHint}
    }
    const data = (await res.json()) as {
      choices?: Array<{message?: {content?: string}}>
    }
    const content = data.choices?.[0]?.message?.content || ''
    return {
      draft: cleanModelDraft(content, skeleton),
      usedAi: true,
      styleHint,
    }
  } catch (err) {
    console.warn('[feedback-review] DeepSeek failed', err)
    return {draft: skeleton, usedAi: false, styleHint}
  }
}
