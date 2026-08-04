/**
 * Sample landscaping rate card for the Quote Capture sandbox.
 * Numbers are labelled as samples in the UI. Live installs use the client's card.
 */

export type LandscapeJobId =
  | 'lawn'
  | 'garden-beds'
  | 'retaining'
  | 'fencing'
  | 'soft-package'
  | 'out-of-scope'

export type AccessId = 'easy' | 'tight' | 'crane'

export type LandscapeJob = {
  id: LandscapeJobId
  label: string
  blurb: string
  inScope: boolean
  /** Fixed start fee in AUD */
  base: number
  /** Per square metre (lawn, beds, soft) or per linear metre (retaining, fencing) */
  unitLabel: 'm²' | 'm'
  perUnit: number
  sizeHint: string
  sizeMin: number
  sizeMax: number
  sizeStep: number
  defaultSize: number
}

export const LANDSCAPE_JOBS: LandscapeJob[] = [
  {
    id: 'lawn',
    label: 'New lawn or turf',
    blurb: 'Supply and lay turf on a prepared area',
    inScope: true,
    base: 350,
    unitLabel: 'm²',
    perUnit: 28,
    sizeHint: 'Rough area in square metres',
    sizeMin: 10,
    sizeMax: 400,
    sizeStep: 5,
    defaultSize: 40,
  },
  {
    id: 'garden-beds',
    label: 'Garden beds and planting',
    blurb: 'Beds, soil, plants, and mulch for a defined area',
    inScope: true,
    base: 450,
    unitLabel: 'm²',
    perUnit: 95,
    sizeHint: 'Bed area in square metres',
    sizeMin: 5,
    sizeMax: 120,
    sizeStep: 5,
    defaultSize: 20,
  },
  {
    id: 'retaining',
    label: 'Retaining wall',
    blurb: 'Timber or block retaining, standard height',
    inScope: true,
    base: 1200,
    unitLabel: 'm',
    perUnit: 380,
    sizeHint: 'Wall length in metres',
    sizeMin: 2,
    sizeMax: 40,
    sizeStep: 1,
    defaultSize: 8,
  },
  {
    id: 'fencing',
    label: 'Boundary fencing',
    blurb: 'Timber or Colorbond-style fence line',
    inScope: true,
    base: 600,
    unitLabel: 'm',
    perUnit: 145,
    sizeHint: 'Fence length in metres',
    sizeMin: 5,
    sizeMax: 80,
    sizeStep: 1,
    defaultSize: 20,
  },
  {
    id: 'soft-package',
    label: 'Front garden refresh',
    blurb: 'Beds, plants, mulch, and tidy for a typical front yard',
    inScope: true,
    base: 1800,
    unitLabel: 'm²',
    perUnit: 55,
    sizeHint: 'Garden area in square metres',
    sizeMin: 15,
    sizeMax: 150,
    sizeStep: 5,
    defaultSize: 35,
  },
  {
    id: 'out-of-scope',
    label: 'Something else (pool, roof, full redesign)',
    blurb: 'Jobs we do not price in this sample calculator',
    inScope: false,
    base: 0,
    unitLabel: 'm²',
    perUnit: 0,
    sizeHint: '',
    sizeMin: 0,
    sizeMax: 0,
    sizeStep: 1,
    defaultSize: 0,
  },
]

export const ACCESS_OPTIONS: {id: AccessId; label: string; blurb: string; surchargePct: number}[] = [
  {
    id: 'easy',
    label: 'Easy access',
    blurb: 'Driveway or side gate, materials go straight in',
    surchargePct: 0,
  },
  {
    id: 'tight',
    label: 'Tight access',
    blurb: 'Carry through house or long walk from the street',
    surchargePct: 12,
  },
  {
    id: 'crane',
    label: 'Crane or special gear',
    blurb: 'Heights, no vehicle access, or hired lift needed',
    surchargePct: 22,
  },
]

/** Removal of existing material, flat add when yes */
export const REMOVAL_FEE = 480

export type QuoteBreakdownLine = {
  label: string
  amount: number
}

export type BuiltQuote = {
  jobLabel: string
  size: number
  unitLabel: 'm²' | 'm'
  lines: QuoteBreakdownLine[]
  subtotal: number
  /** Display range: subtotal ± 8% to feel like a real estimate band */
  low: number
  high: number
  deposit: number
}

function roundMoney(n: number): number {
  return Math.round(n / 10) * 10
}

export function buildLandscapeQuote(input: {
  job: LandscapeJob
  size: number
  access: AccessId
  removeExisting: boolean
}): BuiltQuote | null {
  if (!input.job.inScope) return null

  const access = ACCESS_OPTIONS.find((a) => a.id === input.access) ?? ACCESS_OPTIONS[0]
  const size = Math.min(input.job.sizeMax, Math.max(input.job.sizeMin, input.size))
  const unitTotal = size * input.job.perUnit
  const base = input.job.base
  const removal = input.removeExisting ? REMOVAL_FEE : 0
  const beforeAccess = base + unitTotal + removal
  const accessFee = roundMoney(beforeAccess * (access.surchargePct / 100))
  const subtotal = roundMoney(beforeAccess + accessFee)
  const low = roundMoney(subtotal * 0.92)
  const high = roundMoney(subtotal * 1.08)

  const lines: QuoteBreakdownLine[] = [
    {label: `Start fee (${input.job.label})`, amount: base},
    {
      label: `${size} ${input.job.unitLabel} × $${input.job.perUnit}`,
      amount: roundMoney(unitTotal),
    },
  ]
  if (removal) lines.push({label: 'Remove existing material', amount: removal})
  if (accessFee) lines.push({label: `Access (${access.label})`, amount: accessFee})

  return {
    jobLabel: input.job.label,
    size,
    unitLabel: input.job.unitLabel,
    lines,
    subtotal,
    low,
    high,
    deposit: subtotal,
  }
}

export const SAMPLE_DISCLAIMER =
  'Sample rates for this demo only. A live Quote Capture install uses your real prices. Automatic quotes may change after a site look for access, soil, and hidden work.'

export const IN_SCOPE_LIST = LANDSCAPE_JOBS.filter((j) => j.inScope).map((j) => j.label)
