/**
 * Sample landscaping rate card for the Quote Capture sandbox.
 * Local demo only. Prices are samples.
 */

export type SituationId =
  | 'dead-lawn'
  | 'bare-front'
  | 'need-privacy'
  | 'sloping'
  | 'tired-whole'
  | 'unsure'

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
  | 'one-bay'
  | 'two-bays'
  | 'half-back'
  | 'full-back'
  | 'short-run'
  | 'side-boundary'
  | 'long-boundary'
  | 'know-sqm'
  | 'measure-lxw'
  | 'know-length'

export type AccessId = 'easy' | 'side-gate' | 'through-house' | 'crane'
export type SiteConditionId = 'clear' | 'weedy' | 'old-to-remove' | 'part-done'
export type MaterialsId = 'we-supply' | 'you-supply' | 'mix' | 'unsure'
export type FinishId =
  | 'low-care'
  | 'native'
  | 'colour-pop'
  | 'match-street'
  | 'cottage'
  | 'formal'
  | 'timber'
  | 'colorbond'
  | 'mixed-fence'
  | 'unsure'

export type MixItemId =
  | 'turf'
  | 'soil'
  | 'plants'
  | 'mulch'
  | 'timber'
  | 'panels'
  | 'hardware'
  | 'gravel'
  | 'irrigation'
  | 'posts'
  | 'concrete'
  | 'weedmat'

export type Situation = {
  id: SituationId
  label: string
  blurb: string
  unsure?: boolean
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
  asksMaterials: boolean
  asksFinish: boolean
  /** Rip-out jobs already include clearing. Skip the "what's on the ground" step. */
  impliesRemoval: boolean
  impliedRemovalFee: number
  finishOptions: FinishId[]
  mixItems: MixItemId[]
  extras: {id: string; label: string}[]
}

export type SizePreset = {
  id: SizePresetId
  label: string
  blurb: string
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
    blurb: 'We will narrow it with one more question.',
    unsure: true,
    nextJobs: ['lawn-replace', 'garden-front', 'fence-side', 'retain-low', 'refresh-package'],
  },
]

const LAWN_MIX: MixItemId[] = ['turf', 'soil', 'gravel', 'weedmat']
const GARDEN_MIX: MixItemId[] = ['plants', 'soil', 'mulch', 'gravel', 'irrigation', 'weedmat']
const FENCE_MIX: MixItemId[] = ['timber', 'panels', 'posts', 'hardware', 'concrete']
const RETAIN_MIX: MixItemId[] = ['timber', 'posts', 'gravel', 'hardware', 'concrete']

export const MIX_ITEM_LABELS: Record<MixItemId, string> = {
  turf: 'Turf / grass',
  soil: 'Soil / compost',
  plants: 'Plants / shrubs',
  mulch: 'Mulch',
  timber: 'Timber / sleepers',
  panels: 'Fence panels',
  hardware: 'Screws, fittings, brackets',
  gravel: 'Sand / gravel / base',
  irrigation: 'Irrigation parts',
  posts: 'Posts',
  concrete: 'Concrete / post mix',
  weedmat: 'Weed mat / underlay',
}

export const JOBS: Record<JobId, Job> = {
  'lawn-new': {
    id: 'lawn-new',
    label: 'New turf on bare ground',
    blurb: 'Prepared ground, turf supply and lay.',
    unit: 'm2',
    base: 350,
    perUnit: 28,
    sizePresets: ['one-bay', 'two-bays', 'half-back', 'full-back', 'know-sqm', 'measure-lxw'],
    defaultPreset: 'half-back',
    asksMaterials: true,
    asksFinish: false,
    impliesRemoval: false,
    impliedRemovalFee: 0,
    finishOptions: [],
    mixItems: LAWN_MIX,
    extras: [],
  },
  'lawn-replace': {
    id: 'lawn-replace',
    label: 'Rip out and re-turf',
    blurb: 'Lift the dead lawn, prepare, then new turf. Clearing is included.',
    unit: 'm2',
    base: 520,
    perUnit: 34,
    sizePresets: ['one-bay', 'two-bays', 'half-back', 'full-back', 'know-sqm', 'measure-lxw'],
    defaultPreset: 'half-back',
    asksMaterials: true,
    asksFinish: false,
    impliesRemoval: true,
    impliedRemovalFee: 480,
    finishOptions: [],
    mixItems: LAWN_MIX,
    extras: [],
  },
  'garden-front': {
    id: 'garden-front',
    label: 'Front garden beds',
    blurb: 'Street-facing beds, plants, and mulch.',
    unit: 'm2',
    base: 450,
    perUnit: 95,
    sizePresets: ['one-bay', 'two-bays', 'half-back', 'know-sqm', 'measure-lxw'],
    defaultPreset: 'two-bays',
    asksMaterials: true,
    asksFinish: true,
    impliesRemoval: false,
    impliedRemovalFee: 0,
    finishOptions: ['low-care', 'native', 'colour-pop', 'match-street', 'cottage', 'formal', 'unsure'],
    mixItems: GARDEN_MIX,
    extras: [
      {id: 'feature-tree', label: 'Feature tree'},
      {id: 'edging', label: 'Garden edging'},
      {id: 'lighting', label: 'Simple garden lights'},
      {id: 'path', label: 'Small path or stepping stones'},
      {id: 'pot-plants', label: 'Pots by the entry'},
    ],
  },
  'garden-beds': {
    id: 'garden-beds',
    label: 'Side or rear garden beds',
    blurb: 'Defined beds with soil, plants, and mulch.',
    unit: 'm2',
    base: 420,
    perUnit: 88,
    sizePresets: ['one-bay', 'two-bays', 'half-back', 'know-sqm', 'measure-lxw'],
    defaultPreset: 'two-bays',
    asksMaterials: true,
    asksFinish: true,
    impliesRemoval: false,
    impliedRemovalFee: 0,
    finishOptions: ['low-care', 'native', 'colour-pop', 'cottage', 'unsure'],
    mixItems: GARDEN_MIX,
    extras: [
      {id: 'edging', label: 'Garden edging'},
      {id: 'screen-plants', label: 'Screening plants'},
      {id: 'irrigation', label: 'Basic irrigation'},
    ],
  },
  'fence-side': {
    id: 'fence-side',
    label: 'One side boundary fence',
    blurb: 'Timber or Colorbond-style along one side.',
    unit: 'm',
    base: 600,
    perUnit: 145,
    sizePresets: ['short-run', 'side-boundary', 'long-boundary', 'know-length'],
    defaultPreset: 'side-boundary',
    asksMaterials: true,
    asksFinish: true,
    impliesRemoval: false,
    impliedRemovalFee: 0,
    finishOptions: ['timber', 'colorbond', 'mixed-fence', 'unsure'],
    mixItems: FENCE_MIX,
    extras: [
      {id: 'gate', label: 'Add a gate'},
      {id: 'remove-old-fence', label: 'Remove the old fence first'},
      {id: 'privacy-taller', label: 'Taller privacy height'},
    ],
  },
  'fence-full': {
    id: 'fence-full',
    label: 'Rear or full boundary fence',
    blurb: 'Longer fence run for the back or full side.',
    unit: 'm',
    base: 900,
    perUnit: 145,
    sizePresets: ['side-boundary', 'long-boundary', 'know-length'],
    defaultPreset: 'long-boundary',
    asksMaterials: true,
    asksFinish: true,
    impliesRemoval: false,
    impliedRemovalFee: 0,
    finishOptions: ['timber', 'colorbond', 'mixed-fence', 'unsure'],
    mixItems: FENCE_MIX,
    extras: [
      {id: 'gate', label: 'Add a gate'},
      {id: 'remove-old-fence', label: 'Remove the old fence first'},
      {id: 'privacy-taller', label: 'Taller privacy height'},
    ],
  },
  'retain-low': {
    id: 'retain-low',
    label: 'Low retaining wall',
    blurb: 'Short wall to level a step or garden edge.',
    unit: 'm',
    base: 1200,
    perUnit: 380,
    sizePresets: ['short-run', 'side-boundary', 'know-length'],
    defaultPreset: 'short-run',
    asksMaterials: true,
    asksFinish: false,
    impliesRemoval: false,
    impliedRemovalFee: 0,
    finishOptions: [],
    mixItems: RETAIN_MIX,
    extras: [{id: 'drainage', label: 'Extra drainage behind the wall'}],
  },
  'retain-long': {
    id: 'retain-long',
    label: 'Longer retaining wall',
    blurb: 'Wall along a slope so the yard becomes usable.',
    unit: 'm',
    base: 1800,
    perUnit: 420,
    sizePresets: ['side-boundary', 'long-boundary', 'know-length'],
    defaultPreset: 'side-boundary',
    asksMaterials: true,
    asksFinish: false,
    impliesRemoval: false,
    impliedRemovalFee: 0,
    finishOptions: [],
    mixItems: RETAIN_MIX,
    extras: [{id: 'drainage', label: 'Extra drainage behind the wall'}],
  },
  'refresh-package': {
    id: 'refresh-package',
    label: 'Front yard refresh package',
    blurb: 'Beds, plants, mulch, and tidy for a typical front.',
    unit: 'm2',
    base: 1800,
    perUnit: 55,
    sizePresets: ['two-bays', 'half-back', 'full-back', 'know-sqm', 'measure-lxw'],
    defaultPreset: 'half-back',
    asksMaterials: true,
    asksFinish: true,
    impliesRemoval: false,
    impliedRemovalFee: 0,
    finishOptions: ['low-care', 'native', 'colour-pop', 'match-street', 'cottage', 'formal', 'unsure'],
    mixItems: GARDEN_MIX,
    extras: [
      {id: 'feature-tree', label: 'Feature tree'},
      {id: 'edging', label: 'Garden edging'},
      {id: 'lighting', label: 'Simple garden lights'},
      {id: 'path', label: 'Small path or stepping stones'},
    ],
  },
}

export const SIZE_PRESETS: Record<SizePresetId, SizePreset> = {
  'one-bay': {
    id: 'one-bay',
    label: 'About one supermarket car bay',
    blurb: 'One parking bay at Coles or Woolies. Roughly 12 to 15 square metres.',
    value: 14,
    forUnit: 'm2',
  },
  'two-bays': {
    id: 'two-bays',
    label: 'About two supermarket car bays',
    blurb: 'Two parking bays side by side. Roughly 25 to 30 square metres.',
    value: 28,
    forUnit: 'm2',
  },
  'half-back': {
    id: 'half-back',
    label: 'About half a typical backyard',
    blurb: 'A suburban half lawn or bed zone. Roughly 50 to 70 square metres.',
    value: 60,
    forUnit: 'm2',
  },
  'full-back': {
    id: 'full-back',
    label: 'Most of a typical backyard',
    blurb: 'A large open lawn or garden. Roughly 100 to 140 square metres.',
    value: 120,
    forUnit: 'm2',
  },
  'short-run': {
    id: 'short-run',
    label: 'Short run',
    blurb: 'About the length of a single garage. Roughly 6 to 10 metres.',
    value: 8,
    forUnit: 'm',
  },
  'side-boundary': {
    id: 'side-boundary',
    label: 'One side of the house',
    blurb: 'Typical side boundary. Roughly 15 to 20 metres.',
    value: 18,
    forUnit: 'm',
  },
  'long-boundary': {
    id: 'long-boundary',
    label: 'Long boundary',
    blurb: 'Rear fence or a long side. Roughly 28 to 36 metres.',
    value: 32,
    forUnit: 'm',
  },
  'know-sqm': {
    id: 'know-sqm',
    label: 'I know the square metres',
    blurb: 'Enter the total area if you already have it.',
    value: 0,
    forUnit: 'm2',
  },
  'measure-lxw': {
    id: 'measure-lxw',
    label: 'I will measure length and width',
    blurb: 'Square metres = length × width. We do the multiply for you.',
    value: 0,
    forUnit: 'm2',
  },
  'know-length': {
    id: 'know-length',
    label: 'I know the length in metres',
    blurb: 'Enter the run length along the fence or wall.',
    value: 0,
    forUnit: 'm',
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
    label: 'Mostly clear and ready',
    blurb: 'Little to strip out before the new work starts.',
    removalFee: 0,
  },
  {
    id: 'weedy',
    label: 'Weedy or patchy',
    blurb: 'Needs a tidy and prep, but not a full rip-out.',
    removalFee: 220,
  },
  {
    id: 'old-to-remove',
    label: 'Old material to remove',
    blurb: 'Old beds, hard surfaces, or leftover materials to clear.',
    removalFee: 480,
  },
  {
    id: 'part-done',
    label: 'Partly started already',
    blurb: 'Some work done, some left. We price the remaining scope.',
    removalFee: 180,
  },
]

export const MATERIALS_OPTIONS: {
  id: MaterialsId
  label: string
  blurb: string
  materialFactor: number
  unsure?: boolean
}[] = [
  {
    id: 'we-supply',
    label: 'Include materials in the quote',
    blurb: 'We bring what the job needs, with a little spare so the job does not stall.',
    materialFactor: 1,
  },
  {
    id: 'you-supply',
    label: 'I already have the materials',
    blurb: 'Labour and install only. Materials are already bought or on site.',
    materialFactor: 0.55,
  },
  {
    id: 'mix',
    label: 'Mix of both',
    blurb: 'After you select, tick what you already have. We quote the rest, plus a little spare.',
    materialFactor: 0.8,
  },
  {
    id: 'unsure',
    label: 'Not sure yet',
    blurb: 'We price as supply and install. Easy to adjust later.',
    materialFactor: 1,
    unsure: true,
  },
]

export const FINISH_OPTIONS: Record<
  FinishId,
  {id: FinishId; label: string; blurb: string; unsure?: boolean}
> = {
  'low-care': {
    id: 'low-care',
    label: 'Low care',
    blurb: 'Tough plants, less watering, less weekend work.',
  },
  native: {
    id: 'native',
    label: 'Mostly native',
    blurb: 'Australian natives that suit the climate.',
  },
  'colour-pop': {
    id: 'colour-pop',
    label: 'More colour',
    blurb: 'Flowering or brighter plants for kerb appeal.',
  },
  'match-street': {
    id: 'match-street',
    label: 'Match the street',
    blurb: 'Quiet look that fits the neighbours, not a statement.',
  },
  cottage: {
    id: 'cottage',
    label: 'Soft cottage feel',
    blurb: 'Layered planting, softer edges, lived-in garden look.',
  },
  formal: {
    id: 'formal',
    label: 'Clean and formal',
    blurb: 'Neater lines, simpler plant palette, tidy edges.',
  },
  timber: {
    id: 'timber',
    label: 'Timber look',
    blurb: 'Timber or timber-style fence boards.',
  },
  colorbond: {
    id: 'colorbond',
    label: 'Colorbond-style',
    blurb: 'Metal panel fence. Exact colour confirmed on a call.',
  },
  'mixed-fence': {
    id: 'mixed-fence',
    label: 'Mix of timber and metal',
    blurb: 'Combination look. Details confirmed before install.',
  },
  unsure: {
    id: 'unsure',
    label: 'Not sure yet',
    blurb: 'We price a standard finish. You pick the exact look before work starts.',
    unsure: true,
  },
}

export type QuoteLine = {label: string; amount: number}

export type BuiltQuote = {
  quoteNumber: string
  issuedAt: string
  jobLabel: string
  sizeLabel: string
  sizeValue: number
  unit: 'm2' | 'm'
  materialsLabel: string
  finishLabel: string | null
  accessLabel: string
  siteLabel: string | null
  mixHaveLabels: string[]
  extrasLabels: string[]
  scope: string[]
  lines: QuoteLine[]
  total: number
  validDays: number
}

function roundMoney(n: number): number {
  return Math.round(n / 10) * 10
}

function scopeOfWorks(input: {
  job: Job
  sizeLabel: string
  materials: MaterialsId
  finish: FinishId | null
  mixHave: MixItemId[]
  extrasLabels: string[]
  accessLabel: string
  siteLabel: string | null
}): string[] {
  const lines: string[] = []
  const id = input.job.id

  if (id.startsWith('lawn')) {
    if (input.job.impliesRemoval) {
      lines.push('Lift and remove existing turf and green waste from the work area')
    }
    lines.push('Level and prepare the ground for new turf')
    lines.push(`Supply and lay turf across ${input.sizeLabel}`)
    lines.push('Light roll and edge tidy so joins sit flat')
  } else if (id.startsWith('garden') || id === 'refresh-package') {
    lines.push('Mark out and dig garden beds in the agreed area')
    lines.push('Improve soil where needed, then plant to the chosen look')
    lines.push('Mulch beds and finish edges so the front looks complete')
    if (input.finish) {
      const finish = FINISH_OPTIONS[input.finish]
      lines.push(`Plant direction: ${finish.label.toLowerCase()} (${finish.blurb})`)
    }
  } else if (id.startsWith('fence')) {
    lines.push(`Set out and install fence along ${input.sizeLabel}`)
    lines.push('Posts set plumb, panels or boards fixed to the chosen finish')
    if (input.finish) {
      const finish = FINISH_OPTIONS[input.finish]
      lines.push(`Fence look: ${finish.label}`)
    }
    lines.push('Leave site tidy with offcuts removed from the work line')
  } else if (id.startsWith('retain')) {
    lines.push(`Build retaining wall along ${input.sizeLabel}`)
    lines.push('Excavate the line, set base, and stack to a true level')
    lines.push('Backfill with drainage gravel behind the wall')
  } else {
    lines.push(`Complete ${input.job.label} for ${input.sizeLabel}`)
  }

  if (input.materials === 'we-supply') {
    lines.push('Materials supplied by us, including a little spare for the job')
  } else if (input.materials === 'you-supply') {
    lines.push('Labour and install only. You supply the materials on site')
  } else if (input.materials === 'mix') {
    if (input.mixHave.length > 0) {
      lines.push(
        `You supply: ${input.mixHave.map((id) => MIX_ITEM_LABELS[id]).join(', ')}. We supply the rest, with a little spare`,
      )
    } else {
      lines.push('Mix of materials: we supply what you do not already have, with a little spare')
    }
  } else {
    lines.push('Materials priced as supply and install for now, easy to adjust later')
  }

  lines.push(`Site access: ${input.accessLabel}`)
  if (input.siteLabel) {
    lines.push(`Ground condition: ${input.siteLabel}`)
  }
  for (const extra of input.extrasLabels) {
    lines.push(`Optional extra included: ${extra}`)
  }
  lines.push('Final walk-through and basic tidy of the work area')

  return lines
}

export function buildQuote(input: {
  job: Job
  sizeValue: number
  sizeLabel: string
  access: AccessId
  site: SiteConditionId | null
  materials: MaterialsId
  finish: FinishId | null
  mixHave: MixItemId[]
  extras: string[]
}): BuiltQuote {
  const access = ACCESS_OPTIONS.find((a) => a.id === input.access) ?? ACCESS_OPTIONS[0]
  const site = input.site ? SITE_CONDITIONS.find((s) => s.id === input.site) : null
  const materials =
    MATERIALS_OPTIONS.find((m) => m.id === input.materials) ?? MATERIALS_OPTIONS[0]
  const finish = input.finish ? FINISH_OPTIONS[input.finish] : null

  const removalFee = input.job.impliesRemoval
    ? input.job.impliedRemovalFee
    : (site?.removalFee ?? 0)

  let materialFactor = materials.materialFactor
  if (input.materials === 'mix' && input.job.mixItems.length > 0) {
    const have = input.mixHave.length
    const total = input.job.mixItems.length
    const haveRatio = Math.min(1, have / total)
    materialFactor = 1 - haveRatio * 0.4
  }

  const extrasLabels = input.extras
    .map((id) => input.job.extras.find((e) => e.id === id)?.label)
    .filter((x): x is string => Boolean(x))

  const extrasFee = input.extras.length * 180
  const unitTotal = input.sizeValue * input.job.perUnit * materialFactor
  const beforeAccess = input.job.base + unitTotal + removalFee + extrasFee
  const accessFee = roundMoney(beforeAccess * (access.surchargePct / 100))
  const total = roundMoney(beforeAccess + accessFee)

  const unitWord = input.job.unit === 'm2' ? 'm²' : 'm'
  const lines: QuoteLine[] = [
    {label: `${input.job.label} (setup and site prep)`, amount: input.job.base},
    {
      label: `Work area ${input.sizeValue} ${unitWord} at locked rate`,
      amount: roundMoney(unitTotal),
    },
  ]
  if (removalFee) {
    lines.push({
      label: input.job.impliesRemoval
        ? 'Rip-out and clear (included in this job)'
        : `Clearing: ${site?.label ?? 'site clear'}`,
      amount: removalFee,
    })
  }
  if (extrasFee) {
    lines.push({
      label:
        extrasLabels.length > 0
          ? `Extras: ${extrasLabels.join(', ')}`
          : `Extras (${input.extras.length})`,
      amount: extrasFee,
    })
  }
  if (accessFee) {
    lines.push({label: `Access adjustment (${access.label})`, amount: accessFee})
  }

  const stamp = new Date()
  const issuedAt = stamp.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const quoteNumber = `QC-${stamp.getFullYear()}${String(stamp.getMonth() + 1).padStart(2, '0')}${String(stamp.getDate()).padStart(2, '0')}-${String(stamp.getHours()).padStart(2, '0')}${String(stamp.getMinutes()).padStart(2, '0')}`

  return {
    quoteNumber,
    issuedAt,
    jobLabel: input.job.label,
    sizeLabel: input.sizeLabel,
    sizeValue: input.sizeValue,
    unit: input.job.unit,
    materialsLabel: materials.label,
    finishLabel: finish?.label ?? null,
    accessLabel: access.label,
    siteLabel: site?.label ?? null,
    mixHaveLabels: input.mixHave.map((id) => MIX_ITEM_LABELS[id]),
    extrasLabels,
    scope: scopeOfWorks({
      job: input.job,
      sizeLabel: input.sizeLabel,
      materials: input.materials,
      finish: input.finish,
      mixHave: input.mixHave,
      extrasLabels,
      accessLabel: access.label,
      siteLabel: site?.label ?? null,
    }),
    lines,
    total,
    validDays: 14,
  }
}

export const SAMPLE_DISCLAIMER =
  'Sample landscaping rates for this demo only. On a live install this quotation uses your locked rate card, and a short site look confirms access, soil, and hidden work before work starts.'
