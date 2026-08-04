/**
 * Sample landscaping rate card for the Quote Capture sandbox.
 * Prices are samples. Live installs use the client's card.
 * Size is chosen via familiar references first, then converted to units for maths.
 */

export type SituationId =
  | 'dead-lawn'
  | 'bare-front'
  | 'need-privacy'
  | 'sloping'
  | 'tired-whole'
  | 'unsure'
  | 'out-of-scope'

export type JobId =
  | 'lawn-new'
  | 'lawn-replace'
  | 'garden-front'
  | 'garden-beds'
  | 'fence-side'
  | 'fence-full'
  | 'retain-low'
  | 'retain-long'
  | 'refresh-package'

export type SizePresetId =
  | 'car-space'
  | 'courtyard'
  | 'half-back'
  | 'full-back'
  | 'short-run'
  | 'side-boundary'
  | 'long-boundary'
  | 'know-number'

export type AccessId = 'easy' | 'side-gate' | 'through-house' | 'crane'
export type SiteConditionId = 'clear' | 'old-to-remove' | 'part-done'

export type Situation = {
  id: SituationId
  label: string
  blurb: string
  unsure?: boolean
  outOfScope?: boolean
  nextJobs: JobId[]
}

export type Job = {
  id: JobId
  label: string
  blurb: string
  unit: 'm2' | 'm'
  base: number
  perUnit: number
  sizePresets: SizePresetId[]
  defaultPreset: SizePresetId
}

export type SizePreset = {
  id: SizePresetId
  label: string
  blurb: string
  /** Converted size for maths */
  value: number
  forUnit: 'm2' | 'm' | 'both'
}

export const SITUATIONS: Situation[] = [
  {
    id: 'dead-lawn',
    label: 'The lawn is dead or patchy',
    blurb: 'You want green grass that looks finished, not another bag of seed.',
    nextJobs: ['lawn-new', 'lawn-replace'],
  },
  {
    id: 'bare-front',
    label: 'The front looks empty',
    blurb: 'Beds, plants, and mulch so the house looks looked after from the street.',
    nextJobs: ['garden-front', 'garden-beds', 'refresh-package'],
  },
  {
    id: 'need-privacy',
    label: 'We need privacy or a boundary',
    blurb: 'Fence line or screen so the neighbours are not in every photo.',
    nextJobs: ['fence-side', 'fence-full'],
  },
  {
    id: 'sloping',
    label: 'The ground drops away',
    blurb: 'A retaining wall so the yard is usable and the soil stays put.',
    nextJobs: ['retain-low', 'retain-long'],
  },
  {
    id: 'tired-whole',
    label: 'The whole front feels tired',
    blurb: 'A refresh package: beds, plants, mulch, and a tidy finish.',
    nextJobs: ['refresh-package', 'garden-front'],
  },
  {
    id: 'unsure',
    label: 'Not sure yet',
    blurb: 'We will narrow it with one more question. Most people start here.',
    unsure: true,
    nextJobs: ['lawn-replace', 'garden-front', 'fence-side', 'retain-low', 'refresh-package'],
  },
  {
    id: 'out-of-scope',
    label: 'Pool, roof, or full redesign',
    blurb: 'Those sit outside this sample rate card. We stop cleanly.',
    outOfScope: true,
    nextJobs: [],
  },
]

export const JOBS: Record<JobId, Job> = {
  'lawn-new': {
    id: 'lawn-new',
    label: 'New turf on bare ground',
    blurb: 'Prepared ground, turf supply and lay.',
    unit: 'm2',
    base: 350,
    perUnit: 28,
    sizePresets: ['car-space', 'courtyard', 'half-back', 'full-back', 'know-number'],
    defaultPreset: 'half-back',
  },
  'lawn-replace': {
    id: 'lawn-replace',
    label: 'Rip out and re-turf',
    blurb: 'Lift the dead lawn, prepare, then new turf.',
    unit: 'm2',
    base: 520,
    perUnit: 34,
    sizePresets: ['car-space', 'courtyard', 'half-back', 'full-back', 'know-number'],
    defaultPreset: 'half-back',
  },
  'garden-front': {
    id: 'garden-front',
    label: 'Front garden beds',
    blurb: 'Street-facing beds, plants, and mulch.',
    unit: 'm2',
    base: 450,
    perUnit: 95,
    sizePresets: ['car-space', 'courtyard', 'half-back', 'know-number'],
    defaultPreset: 'courtyard',
  },
  'garden-beds': {
    id: 'garden-beds',
    label: 'Side or rear garden beds',
    blurb: 'Defined beds with soil, plants, and mulch.',
    unit: 'm2',
    base: 420,
    perUnit: 88,
    sizePresets: ['car-space', 'courtyard', 'half-back', 'know-number'],
    defaultPreset: 'courtyard',
  },
  'fence-side': {
    id: 'fence-side',
    label: 'One side boundary fence',
    blurb: 'Timber or Colorbond-style along one side.',
    unit: 'm',
    base: 600,
    perUnit: 145,
    sizePresets: ['short-run', 'side-boundary', 'long-boundary', 'know-number'],
    defaultPreset: 'side-boundary',
  },
  'fence-full': {
    id: 'fence-full',
    label: 'Rear or full boundary fence',
    blurb: 'Longer fence run for the back or full side.',
    unit: 'm',
    base: 900,
    perUnit: 145,
    sizePresets: ['side-boundary', 'long-boundary', 'know-number'],
    defaultPreset: 'long-boundary',
  },
  'retain-low': {
    id: 'retain-low',
    label: 'Low retaining wall',
    blurb: 'Short wall to level a step or garden edge.',
    unit: 'm',
    base: 1200,
    perUnit: 380,
    sizePresets: ['short-run', 'side-boundary', 'know-number'],
    defaultPreset: 'short-run',
  },
  'retain-long': {
    id: 'retain-long',
    label: 'Longer retaining wall',
    blurb: 'Wall along a slope so the yard becomes usable.',
    unit: 'm',
    base: 1800,
    perUnit: 420,
    sizePresets: ['side-boundary', 'long-boundary', 'know-number'],
    defaultPreset: 'side-boundary',
  },
  'refresh-package': {
    id: 'refresh-package',
    label: 'Front yard refresh package',
    blurb: 'Beds, plants, mulch, and tidy for a typical front.',
    unit: 'm2',
    base: 1800,
    perUnit: 55,
    sizePresets: ['courtyard', 'half-back', 'full-back', 'know-number'],
    defaultPreset: 'half-back',
  },
}

export const SIZE_PRESETS: Record<SizePresetId, SizePreset> = {
  'car-space': {
    id: 'car-space',
    label: 'About a car park',
    blurb: 'Roughly one parking bay of area.',
    value: 15,
    forUnit: 'm2',
  },
  courtyard: {
    id: 'courtyard',
    label: 'Small courtyard',
    blurb: 'A tight front or side patch.',
    value: 30,
    forUnit: 'm2',
  },
  'half-back': {
    id: 'half-back',
    label: 'Half a backyard',
    blurb: 'A typical suburban half lawn or bed zone.',
    value: 60,
    forUnit: 'm2',
  },
  'full-back': {
    id: 'full-back',
    label: 'Most of the backyard',
    blurb: 'A large open lawn or garden area.',
    value: 120,
    forUnit: 'm2',
  },
  'short-run': {
    id: 'short-run',
    label: 'Short run',
    blurb: 'About the length of a garage.',
    value: 8,
    forUnit: 'm',
  },
  'side-boundary': {
    id: 'side-boundary',
    label: 'One side of the house',
    blurb: 'Typical side boundary length.',
    value: 18,
    forUnit: 'm',
  },
  'long-boundary': {
    id: 'long-boundary',
    label: 'Long boundary',
    blurb: 'Rear fence or a long side run.',
    value: 32,
    forUnit: 'm',
  },
  'know-number': {
    id: 'know-number',
    label: 'I know the measurement',
    blurb: 'Enter metres yourself if you already measured.',
    value: 0,
    forUnit: 'both',
  },
}

export const ACCESS_OPTIONS: {id: AccessId; label: string; blurb: string; surchargePct: number}[] =
  [
    {
      id: 'easy',
      label: 'Easy from the street',
      blurb: 'Driveway or open front. Materials go straight in.',
      surchargePct: 0,
    },
    {
      id: 'side-gate',
      label: 'Side gate',
      blurb: 'Wheelbarrow through a side path.',
      surchargePct: 8,
    },
    {
      id: 'through-house',
      label: 'Through the house',
      blurb: 'Carry through rooms. Slower and more labour.',
      surchargePct: 15,
    },
    {
      id: 'crane',
      label: 'Crane or special gear',
      blurb: 'No vehicle access, heights, or hired lift.',
      surchargePct: 22,
    },
  ]

export const SITE_CONDITIONS: {
  id: SiteConditionId
  label: string
  blurb: string
  removalFee: number
}[] = [
  {
    id: 'clear',
    label: 'Mostly clear',
    blurb: 'Ready to start without ripping much out.',
    removalFee: 0,
  },
  {
    id: 'old-to-remove',
    label: 'Old material to remove',
    blurb: 'Dead turf, old beds, or an existing fence line to clear.',
    removalFee: 480,
  },
  {
    id: 'part-done',
    label: 'Partly started already',
    blurb: 'Some work done, some left. We price the remaining scope.',
    removalFee: 180,
  },
]

export type QuoteLine = {label: string; amount: number}

export type BuiltQuote = {
  jobLabel: string
  sizeLabel: string
  sizeValue: number
  unitLabel: string
  lines: QuoteLine[]
  subtotal: number
  low: number
  high: number
}

function roundMoney(n: number): number {
  return Math.round(n / 10) * 10
}

export function buildQuote(input: {
  job: Job
  sizeValue: number
  sizeLabel: string
  access: AccessId
  site: SiteConditionId
}): BuiltQuote {
  const access = ACCESS_OPTIONS.find((a) => a.id === input.access) ?? ACCESS_OPTIONS[0]
  const site = SITE_CONDITIONS.find((s) => s.id === input.site) ?? SITE_CONDITIONS[0]
  const unitTotal = input.sizeValue * input.job.perUnit
  const beforeAccess = input.job.base + unitTotal + site.removalFee
  const accessFee = roundMoney(beforeAccess * (access.surchargePct / 100))
  const subtotal = roundMoney(beforeAccess + accessFee)

  const lines: QuoteLine[] = [
    {label: `Start fee (${input.job.label})`, amount: input.job.base},
    {
      label: `${input.sizeValue} ${input.job.unit === 'm2' ? 'm²' : 'm'} × $${input.job.perUnit}`,
      amount: roundMoney(unitTotal),
    },
  ]
  if (site.removalFee) {
    lines.push({label: site.label, amount: site.removalFee})
  }
  if (accessFee) {
    lines.push({label: `Access (${access.label})`, amount: accessFee})
  }

  return {
    jobLabel: input.job.label,
    sizeLabel: input.sizeLabel,
    sizeValue: input.sizeValue,
    unitLabel: input.job.unit === 'm2' ? 'm²' : 'm',
    lines,
    subtotal,
    low: roundMoney(subtotal * 0.92),
    high: roundMoney(subtotal * 1.08),
  }
}

export const SAMPLE_DISCLAIMER =
  'Sample rates for this demo only. A live Quote Capture install uses your real prices. Automatic quotes may change after a site look for access, soil, and hidden work.'
