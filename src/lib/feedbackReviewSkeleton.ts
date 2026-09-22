/**
 * Fallback Google review when the model call does not land.
 * Each answer picks one wording at random, and the middle lines shuffle,
 * so the same taps do not share a sentence.
 */

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function shuffle<T>(items: T[]): T[] {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const swap = next[i]
    next[i] = next[j]
    next[j] = swap
  }
  return next
}

const OPENINGS = [
  (detail: string) => `We worked with SYSBILT on ${detail}.`,
  (detail: string) => `SYSBILT handled ${detail} for us.`,
  (detail: string) => `We brought SYSBILT in for ${detail}.`,
  (detail: string) => `The work we had SYSBILT do was ${detail}.`,
] as const

const RESULT_NAILED = [
  'The finished work was what we needed.',
  'It came out the way we had asked.',
  'What we got matched what we agreed.',
  'The job landed where we needed it.',
] as const

const RESULT_SOLID = [
  'The result was good and ready to use.',
  'It is in good shape and we can use it.',
  'The work is ready to use, with only small niggles.',
  'Good result, and we can use it as it is.',
] as const

const UPDATES_CLEAR = [
  'They told us where things were up to.',
  'We always knew what was happening.',
  'Updates came through without us having to ask.',
  'They checked in as the work moved along.',
  'Replies were clear, and we were not left chasing.',
] as const

const UPDATES_ENOUGH = [
  'We heard from them when it mattered.',
  'The contact was enough for how the job ran.',
  'Updates showed up when we needed them.',
  'We did not have to chase much.',
] as const

const COMFORT_YES = [
  'I felt looked after the whole way.',
  'Working with them was easy.',
  'I was comfortable from the start through to the end.',
  'They made the job feel straightforward.',
] as const

const COMFORT_MOSTLY = [
  'I was mostly comfortable with how it went.',
  'A few bumps, but I was comfortable with them.',
  'It felt comfortable, aside from a couple of rough spots.',
] as const

const MATERIALS_CLEAR = [
  'What they sent was easy to follow.',
  'The notes and files made sense straight away.',
  'I could follow what they sent without another round of questions.',
  'The briefs and links were plain and easy to use.',
] as const

const MATERIALS_MOSTLY = [
  'Most of what they sent was clear.',
  'The files were easy to follow, with a couple of fuzzy bits.',
  'One or two bits needed a second look, then it was clear.',
] as const

const CLOSERS = [
  'I would work with them again.',
  'Happy to recommend them.',
  "I'd use them again next time.",
  'Glad we picked them.',
  'I would send someone their way.',
] as const

const TRAITS: Record<string, readonly string[]> = {
  clear: [
    'explained things in plain language',
    'kept the explanation simple',
    'said it in words we could actually use',
  ],
  fast: [
    'was quick to reply',
    'came back to us quickly',
    'did not leave us waiting on a reply',
  ],
  patient: [
    'was patient when I had questions',
    'was happy to go over things again',
    'took the time when I needed it explained again',
  ],
  honest: [
    'was straight about what was possible',
    'told us what would work and what would not',
    'did not oversell what was possible',
  ],
  organised: [
    'kept the work organised',
    'knew the next step every time',
    'kept the job in order',
  ],
  skilled: [
    'really knew their stuff',
    'was competent on the work',
    'knew how to do the job properly',
  ],
  calm: [
    'stayed calm when things got messy',
    'was steady when it got messy',
    'stayed steady when something went sideways',
  ],
  listened: [
    'actually listened to what we needed',
    'heard what we needed, not a script',
    'paid attention to what we actually asked for',
  ],
}

const PERSON_EXCELLENT = [
  (name: string) => `${name} was excellent to work with.`,
  (name: string) => `${name} made the job easy.`,
  (name: string) => `Working with ${name} was straightforward.`,
] as const

const PERSON_GOOD = [
  (name: string) => `${name} was good to work with.`,
  (name: string) => `${name} was easy to deal with.`,
  (name: string) => `I liked working with ${name}.`,
] as const

export type VariedReviewInput = {
  detail: string
  personName: string
  resultId: string | null
  attentionId: string | null
  comfortId: string | null
  personId: string | null
  personTraitIds: string[]
  materialsId: string | null
  againId: string | null
  extraNote?: string
}

function personLine(input: VariedReviewInput): string | null {
  const person = input.personName.trim()
  if (!person) return null
  if (input.personId !== 'excellent' && input.personId !== 'good') return null

  const traits = input.personTraitIds
    .map((id) => {
      const bank = TRAITS[id]
      return bank ? pick(bank) : ''
    })
    .filter(Boolean)

  if (traits.length === 0) {
    const bank = input.personId === 'excellent' ? PERSON_EXCELLENT : PERSON_GOOD
    return pick(bank)(person)
  }
  if (traits.length === 1) return `${person} ${traits[0]}.`
  if (traits.length === 2) return `${person} ${traits[0]}, and ${traits[1]}.`
  const last = traits[traits.length - 1]
  const head = traits.slice(0, -1).join(', ')
  return `${person} ${head}, and ${last}.`
}

export function buildVariedReview(input: VariedReviewInput): string {
  const detail = input.detail.trim() || 'the work'
  const middle: string[] = []

  if (input.resultId === 'nailed') middle.push(pick(RESULT_NAILED))
  else if (input.resultId === 'solid') middle.push(pick(RESULT_SOLID))

  if (input.attentionId === 'tight') middle.push(pick(UPDATES_CLEAR))
  else if (input.attentionId === 'fine') middle.push(pick(UPDATES_ENOUGH))

  if (input.comfortId === 'yes') middle.push(pick(COMFORT_YES))
  else if (input.comfortId === 'mostly') middle.push(pick(COMFORT_MOSTLY))

  const person = personLine(input)
  if (person) middle.push(person)

  if (input.materialsId === 'crystal') middle.push(pick(MATERIALS_CLEAR))
  else if (input.materialsId === 'mostly') middle.push(pick(MATERIALS_MOSTLY))

  const bits = [pick(OPENINGS)(detail), ...shuffle(middle)]

  const extra = (input.extraNote || '').trim()
  if (extra && extra.length <= 140) {
    bits.push(extra.replace(/[.!?]+$/, '') + '.')
  }

  if (input.againId === 'yes' || input.againId === 'likely') {
    bits.push(pick(CLOSERS))
  }

  return bits.join(' ').replace(/\s+/g, ' ').trim()
}
