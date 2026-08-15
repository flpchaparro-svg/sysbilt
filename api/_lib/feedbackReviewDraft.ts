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
const OPENING_HINTS = ['extra-first', 'person-first', 'work-first', 'feel-first'] as const
const CLOSER_LINES = [
  'I would work with them again.',
  'Happy to recommend them.',
  "I'd use them again next time.",
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

export function buildReviewSkeleton(input: FeedbackDraftInput): string {
  const person = input.personName.trim()
  const otherDetail = input.detailOther.trim()
  const extra = (input.extraNote || '').trim()
  const detail =
    input.detailId === 'other-detail' && otherDetail
      ? otherDetail
      : (input.detailId && DETAIL_LINES[input.detailId]) || input.serviceLabel
  const bits: string[] = []

  bits.push(`We worked with SYSBILT on ${detail}.`)

  if (input.resultId === 'nailed') {
    bits.push('The finished work was what we needed.')
  } else if (input.resultId === 'solid') {
    bits.push('The result was good and ready to use.')
  }

  if (input.attentionId === 'tight') {
    bits.push('They kept me in the loop.')
  } else if (input.attentionId === 'fine') {
    bits.push('Updates were enough.')
  }

  if (input.comfortId === 'yes') {
    bits.push('I felt looked after.')
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
    bits.push('What they sent was easy to follow.')
  } else if (input.materialsId === 'mostly') {
    bits.push('The materials were mostly clear.')
  }

  // Short extras can sit in the fallback. Long spoken notes are for AI only.
  if (extra && extra.length <= 140) {
    bits.push(extra.replace(/[.!?]+$/, '') + '.')
  }

  if (input.againId === 'yes' || input.againId === 'likely') {
    bits.push(pickHint(CLOSER_LINES))
  }

  return bits.join(' ').replace(/\s+/g, ' ').trim()
}

function pickHint<T extends readonly string[]>(hints: T): T[number] {
  return hints[Math.floor(Math.random() * hints.length)]
}

function softenSurveySpeak(text: string): string {
  return text
    .replace(/\bcommunication was tight\b/gi, 'they kept me in the loop')
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
  const openingHint = pickHint(OPENING_HINTS)
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
    detail:
      input.detailId === 'other-detail' && input.detailOther.trim()
        ? input.detailOther.trim()
        : (input.detailId && DETAIL_LINES[input.detailId]) || input.serviceLabel,
    personName: input.personName,
    result:
      input.resultId === 'nailed'
        ? 'the finished work was what they needed'
        : input.resultId === 'solid'
          ? 'the result was good and ready to use'
          : '',
    updates:
      input.attentionId === 'tight'
        ? 'they were kept in the loop'
        : input.attentionId === 'fine'
          ? 'updates were enough'
          : '',
    comfort:
      input.comfortId === 'yes'
        ? 'felt looked after'
        : input.comfortId === 'mostly'
          ? 'felt mostly comfortable'
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
        ? 'what they sent was easy to follow'
        : input.materialsId === 'mostly'
          ? 'materials were mostly clear'
          : '',
    wouldReturn: input.againId === 'yes' || input.againId === 'likely',
    extraNote: (input.extraNote || '').trim(),
    skeleton,
    styleHint,
    openingHint,
  }

  const system = [
    'You polish Google review drafts for SYSBILT (Australian business systems agency).',
    'Rewrite the skeleton into a natural first-person Google review in Australian English.',
    'Write 3 to 5 flowing sentences that connect, like a person talking. Not a list of survey answers.',
    'Google already shows the star rating next to the text. Never mention stars, scores, or "out of 5" in the review body.',
    'Never open with the company name plus a rating. openingHint is the lead: extra-first uses extraNote, person-first uses the person, work-first uses the job, feel-first uses how it felt.',
    'If extraNote has a real point, that is usually the best opening. If extraNote is empty, ignore extra-first and still write a connected paragraph, not one fact per sentence.',
    'Do not invent jobs, results, praise, people, or facts missing from the JSON.',
    'extraNote is often spoken out loud: messy, long, and full of asides. Extract the point. Do not paste the transcript.',
    'If extraNote is only a future request with no usable review content, omit it.',
    'Do not use the words tight, crystal, or the phrase crystal clear. Say they kept you in the loop, or that notes were easy to follow.',
    'Do not always end with "I would happily work with them again". Vary the last line if they would return: recommend, use them again, or glad they picked them.',
    'Do not use marketing nicknames or hype words.',
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
        model: 'deepseek-chat',
        temperature: 0.88,
        max_tokens: 500,
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
