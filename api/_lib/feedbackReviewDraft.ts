/**
 * Deterministic review skeleton + DeepSeek polish for Feedback Review.
 * Skeleton is the source of truth. AI may rewrite wording only.
 */

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

export function buildReviewSkeleton(input: FeedbackDraftInput): string {
  const person = input.personName.trim()
  const otherDetail = input.detailOther.trim()
  const extra = (input.extraNote || '').trim()
  const detail =
    input.detailId === 'other-detail' && otherDetail
      ? otherDetail
      : (input.detailId && DETAIL_LINES[input.detailId]) || input.serviceLabel
  const bits: string[] = []

  bits.push(
    `We worked with SYSBILT on ${detail} and I'd give them ${input.score} out of 5.`,
  )

  if (input.resultId === 'nailed') {
    bits.push('The finished work nailed what we needed.')
  } else if (input.resultId === 'solid') {
    bits.push('The result was solid and ready to use.')
  }

  if (input.attentionId === 'tight') {
    bits.push('They kept me in the loop the whole way.')
  } else if (input.attentionId === 'fine') {
    bits.push('Communication was fine throughout.')
  }

  if (input.comfortId === 'yes') {
    bits.push('I felt looked after from start to finish.')
  } else if (input.comfortId === 'mostly') {
    bits.push('I felt mostly comfortable working with them.')
  }

  if (person && (input.personId === 'excellent' || input.personId === 'good')) {
    const traits = input.personTraitIds
      .map((id) => PERSON_TRAIT_LINES[id])
      .filter(Boolean)
    if (traits.length === 0) {
      bits.push(
        input.personId === 'excellent'
          ? `${person} was excellent to work with.`
          : `${person} was good to work with.`,
      )
    } else if (traits.length === 1) {
      bits.push(`${person} ${traits[0]}.`)
    } else if (traits.length === 2) {
      bits.push(`${person} ${traits[0]}, and ${traits[1]}.`)
    } else {
      const last = traits[traits.length - 1]
      const head = traits.slice(0, -1).join(', ')
      bits.push(`${person} ${head}, and ${last}.`)
    }
  }

  if (input.materialsId === 'crystal') {
    bits.push('Everything they sent was crystal clear.')
  } else if (input.materialsId === 'mostly') {
    bits.push('The materials were mostly clear.')
  }

  if (extra) {
    bits.push(extra.replace(/[.!?]+$/, '') + '.')
  }

  if (input.againId === 'yes' || input.againId === 'likely') {
    bits.push('I would work with them again and am happy to recommend them.')
  }

  return bits.join(' ').replace(/\s+/g, ' ').trim()
}

function pickStyleHint(): (typeof STYLE_HINTS)[number] {
  return STYLE_HINTS[Math.floor(Math.random() * STYLE_HINTS.length)]
}

function cleanModelDraft(raw: string, skeleton: string): string {
  let text = raw.trim()
  text = text.replace(/^```[\w]*\n?|\n?```$/g, '').trim()
  text = text.replace(/^["']|["']$/g, '').trim()
  text = text.replace(/^(here('s| is) (a |the )?review[:\s]*)/i, '').trim()
  text = text.replace(/\u2014/g, ',').replace(/--/g, ',')
  text = text.replace(/!/g, '.')
  text = text.replace(/\s+/g, ' ').trim()
  if (!text || text.length < 40) return skeleton
  if (text.length > 1200) return skeleton
  return text
}

export async function polishReviewWithDeepSeek(
  input: FeedbackDraftInput & { skeleton: string },
): Promise<{ draft: string; usedAi: boolean; styleHint: string }> {
  const styleHint = pickStyleHint()
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
    detailId: input.detailId,
    detailOther: input.detailOther,
    score: input.score,
    personName: input.personName,
    resultId: input.resultId,
    attentionId: input.attentionId,
    comfortId: input.comfortId,
    personId: input.personId,
    personTraitIds: input.personTraitIds,
    materialsId: input.materialsId,
    againId: input.againId,
    extraNote: (input.extraNote || '').trim(),
    skeleton,
    styleHint,
  }

  const system = [
    'You polish Google review drafts for SYSBILT (Australian business systems agency).',
    'Rewrite the skeleton into natural first-person AU English.',
    'You may change sentence order and openings. Style hint guides tone only.',
    'Do not invent jobs, results, praise, people, or facts missing from the JSON.',
    'If extraNote has praise or concrete detail about the work (design, feel, speed, clarity, and so on), weave that meaning into the review. Keep their point. You may tidy grammar.',
    'If extraNote is only a future request with no usable review content, omit it from the public review.',
    'Do not use marketing nicknames or hype words.',
    'No em dashes. No exclamation marks. No emoji.',
    'Keep about 2 to 6 sentences. Output the review text only.',
  ].join(' ')

  try {
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        temperature: 0.78,
        max_tokens: 400,
        messages: [
          {role: 'system', content: system},
          {
            role: 'user',
            content: `Polish this review. Facts JSON:\n${JSON.stringify(facts, null, 2)}`,
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
