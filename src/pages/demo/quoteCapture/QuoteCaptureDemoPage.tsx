import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode} from 'react'
import {Link, useSearchParams} from 'react-router-dom'
import {
  ArrowRight,
  Fence,
  Flower2,
  HelpCircle,
  Layers,
  Mountain,
  Package,
  Palette,
  Shrub,
  Sprout,
  Trees,
} from 'lucide-react'
import {SysbiltLogo} from '../../../components/SysbiltLogo'
import {PageMeta} from '../../../components/PageMeta'
import {SITE_ORIGIN} from '../../../constants/seoMeta'
import {
  QuoteCaptureConciergeDock,
  QuoteCaptureConciergeTalk,
  type ConciergeContextPayload,
} from './QuoteCaptureConciergePanel'
import {
  ACCESS_OPTIONS,
  buildQuote,
  FINISH_OPTIONS,
  JOBS,
  MATERIALS_OPTIONS,
  MIX_ITEM_LABELS,
  SAMPLE_DISCLAIMER,
  SITE_CONDITIONS,
  SITUATIONS,
  SIZE_PRESETS,
  type AccessId,
  type BuiltQuote,
  type FinishId,
  type JobId,
  type MaterialsId,
  type MixItemId,
  type SiteConditionId,
  type SituationId,
  type SizePresetId,
} from './rateCard'

const RED = '#E21E3F'
const INK = '#1A1A1A'
const CREAM = '#FFF2EC'

type Step =
  | 'intro'
  | 'talk'
  | 'situation'
  | 'job'
  | 'size'
  | 'materials'
  | 'mix-have'
  | 'finish'
  | 'access'
  | 'site'
  | 'details'
  | 'quote'
  | 'buy'

const PHASES = [
  {id: 'start', n: 1, label: 'Start'},
  {id: 'need', n: 2, label: 'What you need'},
  {id: 'job', n: 3, label: 'The job'},
  {id: 'details', n: 4, label: 'Your details'},
  {id: 'quote', n: 5, label: 'Quote'},
] as const

function phaseIndexFor(step: Step): number {
  switch (step) {
    case 'intro':
    case 'talk':
      return 0
    case 'situation':
    case 'job':
      return 1
    case 'size':
    case 'materials':
    case 'mix-have':
    case 'finish':
    case 'access':
    case 'site':
      return 2
    case 'details':
      return 3
    case 'quote':
    case 'buy':
      return 4
  }
}

function money(n: number): string {
  return `$${n.toLocaleString('en-AU')}`
}

function SelectCard({
  selected,
  onSelect,
  title,
  blurb,
  icon,
  unsure,
}: {
  selected: boolean
  onSelect: () => void
  title: string
  blurb: string
  icon?: ReactNode
  unsure?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-selected={selected ? 'true' : undefined}
      className="group relative flex h-[280px] w-full flex-col items-center overflow-hidden rounded-2xl border border-dark/12 bg-white px-4 pt-8 pb-4 text-center shadow-[0_8px_24px_-18px_rgba(26,26,26,0.28)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#E21E3F] hover:shadow-[0_16px_40px_-20px_rgba(226,30,63,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21E3F] focus-visible:ring-offset-2 data-[selected=true]:border-[#E21E3F] data-[selected=true]:shadow-[0_16px_40px_-20px_rgba(226,30,63,0.35)]"
    >
      <div className="mb-5 flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center text-dark transition-all duration-300 ease-out group-hover:mb-2 group-hover:h-9 group-hover:w-9 group-hover:text-[#E21E3F] group-data-[selected=true]:mb-2 group-data-[selected=true]:h-9 group-data-[selected=true]:w-9 group-data-[selected=true]:text-[#E21E3F]">
        {unsure ? (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A1A1A] text-2xl text-[#FFF2EC] transition-all duration-300 group-hover:h-9 group-hover:w-9 group-hover:text-base group-data-[selected=true]:h-9 group-data-[selected=true]:w-9 group-data-[selected=true]:text-base">
            <span className="font-serif leading-none">?</span>
          </div>
        ) : (
          <div className="h-full w-full [&_svg]:h-full [&_svg]:w-full">{icon}</div>
        )}
      </div>
      <div className="shrink-0 font-sans text-base font-semibold leading-snug text-dark transition-colors duration-300 group-hover:text-[#E21E3F] group-data-[selected=true]:text-[#E21E3F]">
        {title}
      </div>
      <div className="mt-0 flex max-h-0 w-full flex-1 flex-col overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100 group-data-[selected=true]:mt-3 group-data-[selected=true]:max-h-40 group-data-[selected=true]:opacity-100">
        <p className="flex-1 px-0.5 font-sans text-[13px] leading-relaxed text-dark/55">{blurb}</p>
        <span
          className="mt-3 flex w-full shrink-0 items-center justify-center rounded-lg py-2.5 font-sans text-sm font-semibold text-white"
          style={{backgroundColor: RED}}
        >
          Select
        </span>
      </div>
    </button>
  )
}

const CHOICE_CARD_WIDTH = 280
const FADE_MS = 900
const MOVE_MS = 900

type ChoiceItem = {
  id: string
  title: string
  blurb: string
  icon?: ReactNode
  unsure?: boolean
}

/**
 * Click a card → others fade out in place (same size) → selected eases to centre
 * → Continue + Show all options appear once.
 *
 * Important: the centre move must pin the card with a transform in useLayoutEffect
 * (before paint). Doing it in rAF leaves one painted frame at the final spot, then
 * the card jumps back and animates — that random "glitch".
 */
function SelectChoiceGrid({
  items,
  selectedId,
  revealAll,
  onSelect,
  onContinue,
  onShowAll,
  continueDisabled,
  followUp,
}: {
  items: ChoiceItem[]
  selectedId: string | null
  revealAll: boolean
  onSelect: (id: string) => void
  onContinue: () => void
  onShowAll: () => void
  continueDisabled?: boolean
  followUp?: ReactNode
}) {
  const [phase, setPhase] = useState<'grid' | 'fading' | 'centred'>(() =>
    selectedId && !revealAll ? 'centred' : 'grid',
  )
  const [pickedId, setPickedId] = useState<string | null>(() =>
    selectedId && !revealAll ? selectedId : null,
  )
  const timers = useRef<number[]>([])
  const rafs = useRef<number[]>([])
  const shellRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const flipRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const actionsPlayed = useRef(false)
  const pendingFirst = useRef<{id: string; first: DOMRect} | null>(null)
  const moveGen = useRef(0)

  function clearTimers() {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    rafs.current.forEach((r) => cancelAnimationFrame(r))
    rafs.current = []
  }

  function clearFlips() {
    Object.values(flipRefs.current).forEach((node) => {
      if (!node) return
      node.style.transition = ''
      node.style.transform = ''
    })
  }

  useEffect(() => () => clearTimers(), [])

  useEffect(() => {
    if (!selectedId) {
      clearTimers()
      clearFlips()
      pendingFirst.current = null
      setPickedId(null)
      setPhase('grid')
      actionsPlayed.current = false
    }
  }, [selectedId])

  useLayoutEffect(() => {
    if (phase !== 'centred') return
    const pending = pendingFirst.current
    if (!pending) return
    pendingFirst.current = null

    const flip = flipRefs.current[pending.id]
    const shell = shellRefs.current[pending.id]
    if (!flip || !shell) return

    const last = shell.getBoundingClientRect()
    const dx = pending.first.left - last.left
    const dy = pending.first.top - last.top
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) return

    const gen = ++moveGen.current

    // Before paint: keep the card visually where it was
    flip.style.transition = 'none'
    flip.style.transform = `translate(${dx}px, ${dy}px)`
    void flip.offsetWidth

    const raf = requestAnimationFrame(() => {
      if (gen !== moveGen.current) return
      flip.style.transition = `transform ${MOVE_MS}ms ease-in-out`
      flip.style.transform = 'translate(0, 0)'
      const done = window.setTimeout(() => {
        if (gen !== moveGen.current) return
        flip.style.transition = ''
        flip.style.transform = ''
      }, MOVE_MS)
      timers.current.push(done)
    })
    rafs.current.push(raf)
  }, [phase])

  function finishToCentre(id: string) {
    const shell = shellRefs.current[id]
    const first = shell?.getBoundingClientRect()
    if (first) {
      pendingFirst.current = {id, first}
    } else {
      pendingFirst.current = null
    }
    setPhase('centred')
  }

  function handleSelect(id: string) {
    if (pickedId === id && (phase === 'centred' || phase === 'fading')) {
      handleShowAll()
      return
    }

    clearTimers()
    clearFlips()
    moveGen.current += 1
    pendingFirst.current = null
    actionsPlayed.current = false
    setPickedId(id)
    setPhase('fading')
    onSelect(id)

    const t = window.setTimeout(() => {
      finishToCentre(id)
    }, FADE_MS)
    timers.current.push(t)
  }

  function handleShowAll() {
    clearTimers()
    clearFlips()
    moveGen.current += 1
    pendingFirst.current = null
    actionsPlayed.current = false
    setPhase('grid')
    onShowAll()
  }

  const actionsRef = (node: HTMLDivElement | null) => {
    if (!node || actionsPlayed.current) return
    actionsPlayed.current = true
    node.animate(
      [
        {opacity: 0, transform: 'translateY(10px)'},
        {opacity: 1, transform: 'translateY(0)'},
      ],
      {duration: MOVE_MS, easing: 'ease-out', fill: 'forwards'},
    )
  }

  const currentId = pickedId ?? selectedId
  const list =
    phase === 'centred' ? items.filter((item) => item.id === currentId) : items

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {list.map((item) => {
          const selected = currentId === item.id
          const fadingOut = phase === 'fading' && item.id !== currentId
          return (
            <div
              key={item.id}
              ref={(node) => {
                shellRefs.current[item.id] = node
              }}
              className="shrink-0"
              style={{
                width: CHOICE_CARD_WIDTH,
                maxWidth: '100%',
                opacity: fadingOut ? 0 : 1,
                transition: `opacity ${FADE_MS}ms ease-in-out`,
                pointerEvents: fadingOut ? 'none' : 'auto',
              }}
              aria-hidden={fadingOut}
            >
              <div
                ref={(node) => {
                  flipRefs.current[item.id] = node
                }}
              >
                <SelectCard
                  selected={Boolean(selected)}
                  onSelect={() => handleSelect(item.id)}
                  title={item.title}
                  blurb={item.blurb}
                  icon={item.icon}
                  unsure={item.unsure}
                />
              </div>
            </div>
          )
        })}
      </div>

      {phase === 'centred' ? (
        <div
          ref={actionsRef}
          className="mx-auto mt-8 flex flex-col items-center text-center"
          style={{width: CHOICE_CARD_WIDTH, maxWidth: '100%'}}
        >
          {followUp ? <div className="mb-5 w-full text-left">{followUp}</div> : null}
          <InkButton disabled={continueDisabled} onClick={onContinue}>
            Continue <ArrowRight className="h-4 w-4" />
          </InkButton>
          <button
            type="button"
            onClick={handleShowAll}
            className="mt-4 font-sans text-sm text-dark/55 transition-colors hover:text-dark hover:underline hover:underline-offset-4"
          >
            Show all options
          </button>
        </div>
      ) : null}
    </>
  )
}

function InkButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E21E3F] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream shadow-[0_12px_28px_-12px_rgba(226,30,63,0.65)] transition hover:bg-[#c41935] disabled:opacity-40"
    >
      {children}
    </button>
  )
}

function StageJourney({
  phaseIndex,
  canGoBack,
  onBack,
}: {
  phaseIndex: number
  canGoBack: boolean
  onBack: () => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const [fillWidth, setFillWidth] = useState(120)

  const measure = useCallback(() => {
    const track = trackRef.current
    const end = endRef.current
    if (!track || !end) return
    const t = track.getBoundingClientRect()
    const e = end.getBoundingClientRect()
    setFillWidth(Math.max(96, e.right - t.left + 6))
  }, [])

  useLayoutEffect(() => {
    measure()
    const raf = requestAnimationFrame(measure)
    const t1 = window.setTimeout(measure, 50)
    const t2 = window.setTimeout(measure, 400)
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    if (trackRef.current) ro?.observe(trackRef.current)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.removeEventListener('resize', onResize)
      ro?.disconnect()
    }
  }, [measure, phaseIndex, canGoBack])

  return (
    <div
      ref={trackRef}
      className="relative flex h-12 w-full min-w-0 items-center rounded-full shadow-[0_4px_18px_-6px_rgba(26,26,26,0.28)] md:h-[52px]"
      style={{backgroundColor: INK}}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
        style={{width: fillWidth, backgroundColor: CREAM}}
        aria-hidden
      />
      <div className="relative z-10 flex h-full min-w-0 flex-1 items-center gap-0 pl-1.5 pr-2 md:pl-2 md:pr-3">
        <div className="flex shrink-0 items-center gap-2 md:gap-2.5">
          {canGoBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-solid border-dark text-dark transition-colors duration-200 hover:bg-dark/10 md:h-[42px] md:w-[42px]"
              aria-label="Back"
              title="Back"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <span className="w-1 shrink-0" aria-hidden />
          )}
          <SysbiltLogo className="w-[92px] md:w-[108px]" />
        </div>
        <nav className="flex min-w-0 flex-1 items-center gap-0 overflow-x-auto" aria-label="Progress">
          {PHASES.map((p, i) => {
            const done = i < phaseIndex
            const current = i === phaseIndex
            const filled = i <= phaseIndex
            return (
              <div
                key={p.id}
                ref={current ? endRef : undefined}
                className="shrink-0 whitespace-nowrap px-1.5 font-sans text-[12px] tracking-wide md:px-3.5 md:text-[13px]"
                style={{
                  color: filled ? INK : 'rgba(255,242,236,0.4)',
                  fontWeight: current || done ? 600 : 400,
                }}
              >
                {p.n}
                <span className="hidden md:inline">. {p.label}</span>
              </div>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

function situationIcon(id: SituationId): ReactNode {
  switch (id) {
    case 'dead-lawn':
      return <Sprout strokeWidth={1.5} />
    case 'bare-front':
      return <Flower2 strokeWidth={1.5} />
    case 'need-privacy':
      return <Fence strokeWidth={1.5} />
    case 'sloping':
      return <Mountain strokeWidth={1.5} />
    case 'tired-whole':
      return <Trees strokeWidth={1.5} />
    case 'unsure':
      return <HelpCircle strokeWidth={1.5} />
  }
}

function jobIcon(id: JobId): ReactNode {
  if (id.startsWith('lawn')) return <Sprout strokeWidth={1.5} />
  if (id.startsWith('garden') || id === 'refresh-package') return <Shrub strokeWidth={1.5} />
  if (id.startsWith('fence')) return <Fence strokeWidth={1.5} />
  if (id.startsWith('retain')) return <Mountain strokeWidth={1.5} />
  return <Flower2 strokeWidth={1.5} />
}

export default function QuoteCaptureDemoPage() {
  const [params] = useSearchParams()
  const businessName = (params.get('name') || '')
    .trim()
    .replace(/[\\/]+$/g, '')
    .trim()
  const tradeRaw = (params.get('trade') || 'landscaping').trim().toLowerCase()
  const TRADE_LABELS: Record<string, string> = {
    landscaping: 'landscaping',
    fencing: 'fencing',
    'retaining-walls': 'retaining walls',
    paving: 'paving',
    concreting: 'concreting',
    'tree-services': 'tree services',
    pools: 'pool building',
    roofing: 'roofing',
    painting: 'painting',
    electrical: 'electrical',
    plumbing: 'plumbing',
    hvac: 'HVAC',
    cleaning: 'cleaning',
    'pest-control': 'pest control',
    removals: 'removals',
  }
  const tradeLabel = TRADE_LABELS[tradeRaw] || tradeRaw.replace(/-/g, ' ') || 'landscaping'

  const [step, setStep] = useState<Step>('intro')
  const [situationId, setSituationId] = useState<SituationId | null>(null)
  const [jobId, setJobId] = useState<JobId | null>(null)
  const [sizePresetId, setSizePresetId] = useState<SizePresetId | null>(null)
  const [sqmKnown, setSqmKnown] = useState('')
  const [lengthM, setLengthM] = useState('')
  const [widthM, setWidthM] = useState('')
  const [runLength, setRunLength] = useState('')
  const [materials, setMaterials] = useState<MaterialsId | null>(null)
  const [mixHave, setMixHave] = useState<MixItemId[]>([])
  const [finish, setFinish] = useState<FinishId | null>(null)
  const [extras, setExtras] = useState<string[]>([])
  const [access, setAccess] = useState<AccessId | null>(null)
  const [site, setSite] = useState<SiteConditionId | null>(null)
  const [visitorName, setVisitorName] = useState('')
  const [visitorPhone, setVisitorPhone] = useState('')
  const [visitorEmail, setVisitorEmail] = useState('')
  const [quote, setQuote] = useState<BuiltQuote | null>(null)
  const [revealAll, setRevealAll] = useState(false)
  const [conciergeResetKey, setConciergeResetKey] = useState(0)

  const situation = SITUATIONS.find((s) => s.id === situationId) ?? null
  const job = jobId ? JOBS[jobId] : null
  const phaseIndex = phaseIndexFor(step)

  // Fresh choice UI each step (collapsed if a value is already set from back-nav).
  useEffect(() => {
    setRevealAll(false)
  }, [step])

  const jobOptions = useMemo(() => {
    if (!situation) return []
    return situation.nextJobs.map((id) => JOBS[id])
  }, [situation])

  const sizeOptions = useMemo(() => {
    if (!job) return []
    return job.sizePresets.map((id) => SIZE_PRESETS[id])
  }, [job])

  const finishOptions = useMemo(() => {
    if (!job) return []
    return job.finishOptions.map((id) => FINISH_OPTIONS[id])
  }, [job])

  const measuredLxW = useMemo(() => {
    const l = Number(lengthM)
    const w = Number(widthM)
    if (!Number.isFinite(l) || !Number.isFinite(w) || l <= 0 || w <= 0) return null
    return Math.round(l * w)
  }, [lengthM, widthM])

  function go(next: Step) {
    setStep(next)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  function afterSize() {
    if (!job) return
    if (job.asksMaterials) {
      go('materials')
      return
    }
    if (job.asksFinish) {
      go('finish')
      return
    }
    go('access')
  }

  function afterMaterials(_nextMaterials: MaterialsId) {
    if (!job) return
    // Mix checklist is on the materials step now, so skip the old mix-have page
    if (job.asksFinish) {
      go('finish')
      return
    }
    go('access')
  }

  function afterMixHave() {
    if (!job) return
    if (job.asksFinish) {
      go('finish')
      return
    }
    go('access')
  }

  function afterFinish() {
    go('access')
  }

  function afterAccess() {
    if (!job) return
    if (job.impliesRemoval) {
      setSite(null)
      go('details')
      return
    }
    go('site')
  }

  function pickSituation(id: SituationId) {
    setSituationId(id)
    setJobId(null)
    setSizePresetId(null)
    setSqmKnown('')
    setLengthM('')
    setWidthM('')
    setRunLength('')
    setMaterials(null)
    setMixHave([])
    setFinish(null)
    setExtras([])
    setRevealAll(false)
  }

  function continueSituation() {
    if (!situationId) return
    go('job')
  }

  function pickJob(id: JobId) {
    setJobId(id)
    setSizePresetId(null)
    setSqmKnown('')
    setLengthM('')
    setWidthM('')
    setRunLength('')
    setMaterials(null)
    setMixHave([])
    setFinish(null)
    setExtras([])
    setSite(null)
    setRevealAll(false)
  }

  function continueJob() {
    if (!jobId) return
    go('size')
  }

  function pickSize(id: SizePresetId) {
    setSizePresetId(id)
    setRevealAll(false)
  }

  function sizeInputReady(): boolean {
    if (!sizePresetId) return false
    if (sizePresetId === 'know-sqm') return Number(sqmKnown) > 0
    if (sizePresetId === 'measure-lxw') return measuredLxW != null && measuredLxW > 0
    if (sizePresetId === 'know-length') return Number(runLength) > 0
    return true
  }

  function pickMaterials(id: MaterialsId) {
    setMaterials(id)
    if (id !== 'mix') setMixHave([])
    setRevealAll(false)
  }

  function continueMaterials() {
    if (!materials) return
    afterMaterials(materials)
  }

  function toggleMix(id: MixItemId) {
    setMixHave((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function pickFinish(id: FinishId) {
    setFinish(id)
    setRevealAll(false)
  }

  function toggleExtra(id: string) {
    setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function pickAccess(id: AccessId) {
    setAccess(id)
    setRevealAll(false)
  }

  function continueAccess() {
    if (!access) return
    afterAccess()
  }

  function pickSite(id: SiteConditionId) {
    setSite(id)
    setRevealAll(false)
  }

  function continueSite() {
    if (!site) return
    go('details')
  }

  function resolveSize(): {value: number; label: string} | null {
    if (!job || !sizePresetId) return null
    if (sizePresetId === 'know-sqm') {
      const n = Math.round(Number(sqmKnown))
      if (!Number.isFinite(n) || n <= 0) return null
      return {value: n, label: `${n} m² (you entered)`}
    }
    if (sizePresetId === 'measure-lxw') {
      if (measuredLxW == null) return null
      return {
        value: measuredLxW,
        label: `${lengthM.trim()} m × ${widthM.trim()} m = ${measuredLxW} m²`,
      }
    }
    if (sizePresetId === 'know-length') {
      const n = Math.round(Number(runLength))
      if (!Number.isFinite(n) || n <= 0) return null
      return {value: n, label: `${n} m run (you entered)`}
    }
    const preset = SIZE_PRESETS[sizePresetId]
    return {value: preset.value, label: preset.label}
  }

  function buildAndShow() {
    if (!job || !access || !materials) return
    if (job.asksFinish && !finish) return
    if (!job.impliesRemoval && !site) return
    const size = resolveSize()
    if (!size) return
    setQuote(
      buildQuote({
        job,
        sizeValue: size.value,
        sizeLabel: size.label,
        access,
        site: job.impliesRemoval ? null : site,
        materials,
        finish: job.asksFinish ? finish : null,
        mixHave: materials === 'mix' ? mixHave : [],
        extras,
      }),
    )
    go('quote')
  }

  function goBack() {
    switch (step) {
      case 'talk':
        go('intro')
        break
      case 'job':
        go('situation')
        break
      case 'size':
        go('job')
        break
      case 'materials':
        go('size')
        break
      case 'mix-have':
        go('materials')
        break
      case 'finish':
        go(job?.asksMaterials ? 'materials' : 'size')
        break
      case 'access':
        if (job?.asksFinish) go('finish')
        else if (job?.asksMaterials) go('materials')
        else go('size')
        break
      case 'site':
        go('access')
        break
      case 'details':
        go(job?.impliesRemoval ? 'access' : 'site')
        break
      case 'quote':
        go('details')
        break
      case 'buy':
        go('quote')
        break
      case 'situation':
        go('intro')
        break
      default:
        go('intro')
    }
  }

  function restart() {
    setStep('intro')
    setSituationId(null)
    setJobId(null)
    setSizePresetId(null)
    setSqmKnown('')
    setLengthM('')
    setWidthM('')
    setRunLength('')
    setMaterials(null)
    setMixHave([])
    setFinish(null)
    setExtras([])
    setAccess(null)
    setSite(null)
    setVisitorName('')
    setVisitorPhone('')
    setVisitorEmail('')
    setQuote(null)
    setConciergeResetKey((k) => k + 1)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  const canSubmitDetails =
    visitorName.trim().length >= 2 && visitorPhone.trim().replace(/\s/g, '').length >= 8
  const canGoBack = step !== 'intro'
  const headerEyebrow = businessName
    ? `Built for ${businessName}`
    : `Quote Capture demo · ${tradeLabel}`


  const sizeResolved = resolveSize()
  const conciergeContext: ConciergeContextPayload = {
    mode: 'sandbox',
    step,
    businessName: businessName || undefined,
    situationLabel: situation?.label ?? null,
    jobLabel: job?.label ?? null,
    sizeLabel: sizeResolved?.label ?? (sizePresetId ? SIZE_PRESETS[sizePresetId]?.label : null),
    materialsLabel: materials
      ? MATERIALS_OPTIONS.find((m) => m.id === materials)?.label ?? materials
      : null,
    finishLabel: finish ? FINISH_OPTIONS[finish]?.label ?? finish : null,
    accessLabel: access
      ? ACCESS_OPTIONS.find((a) => a.id === access)?.label ?? access
      : null,
    siteLabel: site
      ? SITE_CONDITIONS.find((s) => s.id === site)?.label ?? site
      : null,
  }
  const showConciergeDock = step !== 'intro' && step !== 'talk'

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream font-sans text-dark selection:bg-dark selection:text-cream">
      <PageMeta
        title="Quote Capture demo | SYSBILT"
        description="Feel an instant quote calculator. Sample landscaping rates. Built by SYSBILT."
        canonical={`${SITE_ORIGIN}/demo/quote-capture`}
        robots="noindex, nofollow"
      />

      {step === 'intro' || step === 'buy' ? (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(90% 70% at 50% 18%, rgba(226,30,63,0.09), transparent 58%), radial-gradient(70% 55% at 82% 72%, rgba(168,132,63,0.14), transparent 55%), radial-gradient(55% 45% at 12% 78%, rgba(26,26,26,0.04), transparent 50%)',
            }}
          />
          <div
            className="absolute -left-[18%] top-[42%] h-[28rem] w-[28rem] rounded-full opacity-40"
            style={{
              background:
                'radial-gradient(circle, rgba(226,30,63,0.08) 0%, transparent 68%)',
            }}
          />
          <div
            className="absolute -right-[12%] top-[8%] h-[22rem] w-[22rem] rounded-full opacity-50"
            style={{
              background:
                'radial-gradient(circle, rgba(168,132,63,0.16) 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }}
          />
        </div>
      ) : null}

      <div
        className={`relative mx-auto max-w-5xl px-5 md:px-8 pt-5 ${showConciergeDock ? 'pb-44 md:pb-48' : 'pb-24'}`}
      >
        {step !== 'intro' && step !== 'talk' ? (
          <div className="mb-8">
            <StageJourney phaseIndex={phaseIndex} canGoBack={canGoBack} onBack={goBack} />
          </div>
        ) : (
          <div className="mb-6 flex items-center justify-between gap-4">
            <SysbiltLogo className="w-[110px] md:w-[130px]" />
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-dark/40">
              Sample demo · simulated {tradeLabel}
            </p>
          </div>
        )}

        {step !== 'intro' && step !== 'buy' && step !== 'talk' ? (
          <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#A8843F]">
            {headerEyebrow}
          </p>
        ) : null}

        {step === 'intro' && (
          <section className="mx-auto flex min-h-[min(74vh,44rem)] w-full max-w-4xl flex-col items-center justify-center pb-16 text-center md:min-h-[min(78vh,48rem)]">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#A8843F]">
              {headerEyebrow}
            </p>
            <h1 className="mt-6 w-full font-serif text-[2.35rem] leading-[1.08] tracking-tight text-dark sm:text-5xl md:text-6xl lg:text-[3.75rem]">
              Stop writing quotes, start closing them
            </h1>
            <p className="mx-auto mt-7 max-w-2xl font-sans text-lg leading-relaxed text-dark/70 md:text-xl">
              Walk through this as if you were the customer. They get a clear landscaping quotation on
              screen. You check it, send the pay link or say yes, and move on.
            </p>
            <div className="mt-12 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
              <InkButton onClick={() => go('situation')}>
                Start the sample <ArrowRight className="h-4 w-4" />
              </InkButton>
              <button
                type="button"
                onClick={() => go('talk')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-dark/20 bg-white px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark transition-colors hover:border-dark/40"
              >
                Talk it through
              </button>
            </div>
          </section>
        )}

        {step === 'talk' && (
          <QuoteCaptureConciergeTalk
            context={conciergeContext}
            onStartWizard={() => go('situation')}
            onBack={() => go('intro')}
          />
        )}
        {step === 'situation' && (
          <section>
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight max-w-2xl">
              What are you trying to fix
            </h1>
            <p className="mt-3 mb-8 font-sans text-base text-dark/60 max-w-xl">
              Start with the problem. Select a card, then continue.
            </p>
            <SelectChoiceGrid
              items={SITUATIONS.map((s) => ({
                id: s.id,
                title: s.label,
                blurb: s.blurb,
                icon: situationIcon(s.id),
                unsure: s.unsure,
              }))}
              selectedId={situationId}
              revealAll={revealAll}
              onSelect={(id) => pickSituation(id as SituationId)}
              onContinue={continueSituation}
              onShowAll={() => setRevealAll(true)}
            />
          </section>
        )}

        {step === 'job' && situation && (
          <section>
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight max-w-2xl">
              Which of these matches best
            </h1>
            <p className="mt-3 mb-8 font-sans text-base text-dark/60 max-w-xl">
              Based on “{situation.label.toLowerCase()}”. Pick the closest job on the sample rate
              card.
            </p>
            <SelectChoiceGrid
              items={jobOptions.map((j) => ({
                id: j.id,
                title: j.label,
                blurb: j.blurb,
                icon: jobIcon(j.id),
              }))}
              selectedId={jobId}
              revealAll={revealAll}
              onSelect={(id) => pickJob(id as JobId)}
              onContinue={continueJob}
              onShowAll={() => setRevealAll(true)}
            />
          </section>
        )}

        {step === 'size' && job && (
          <section>
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight max-w-2xl">
              Roughly how big is it
            </h1>
            <p className="mt-3 mb-2 font-sans text-base text-dark/60 max-w-xl">
              Use a supermarket car bay as a picture in your head, or enter a number if you already
              have one.
            </p>
            {job.unit === 'm2' && (
              <p className="mb-8 font-sans text-sm text-dark/45 max-w-xl">
                Square metres = length × width. Example: 5 m by 4 m is 20 m². If you already know
                the square metres, pick that option and type them in.
              </p>
            )}
            {job.unit === 'm' && (
              <p className="mb-8 font-sans text-sm text-dark/45 max-w-xl">
                This job is priced by run length in metres, not square metres.
              </p>
            )}
            <SelectChoiceGrid
              items={sizeOptions.map((p) => ({
                id: p.id,
                title: p.label,
                blurb: p.blurb,
                icon: <Layers strokeWidth={1.5} />,
                unsure:
                  p.id === 'know-sqm' || p.id === 'measure-lxw' || p.id === 'know-length',
              }))}
              selectedId={sizePresetId}
              revealAll={revealAll}
              onSelect={(id) => pickSize(id as SizePresetId)}
              onContinue={afterSize}
              onShowAll={() => setRevealAll(true)}
              continueDisabled={!sizeInputReady()}
              followUp={
                sizePresetId === 'know-sqm' ? (
                  <div className="space-y-3 rounded-2xl border border-dark/10 bg-white p-5">
                    <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark/45">
                      Square metres
                    </label>
                    <input
                      type="number"
                      min={1}
                      step={1}
                      value={sqmKnown}
                      onChange={(e) => setSqmKnown(e.target.value)}
                      placeholder="e.g. 45"
                      className="w-full rounded-xl border border-dark/12 bg-cream px-4 py-3 font-sans text-base outline-none focus:border-[#E21E3F]"
                    />
                  </div>
                ) : sizePresetId === 'measure-lxw' ? (
                  <div className="space-y-3 rounded-2xl border border-dark/10 bg-white p-5">
                    <p className="font-sans text-sm text-dark/60">
                      Enter length and width in metres. We multiply them for square metres.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark/45">
                          Length (m)
                        </label>
                        <input
                          type="number"
                          min={0.5}
                          step={0.5}
                          value={lengthM}
                          onChange={(e) => setLengthM(e.target.value)}
                          placeholder="e.g. 8"
                          className="w-full rounded-xl border border-dark/12 bg-cream px-4 py-3 font-sans text-base outline-none focus:border-[#E21E3F]"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark/45">
                          Width (m)
                        </label>
                        <input
                          type="number"
                          min={0.5}
                          step={0.5}
                          value={widthM}
                          onChange={(e) => setWidthM(e.target.value)}
                          placeholder="e.g. 5"
                          className="w-full rounded-xl border border-dark/12 bg-cream px-4 py-3 font-sans text-base outline-none focus:border-[#E21E3F]"
                        />
                      </div>
                    </div>
                    {measuredLxW != null && (
                      <p className="font-sans text-sm text-dark/70">
                        That is about <span className="font-semibold">{measuredLxW} m²</span>
                      </p>
                    )}
                  </div>
                ) : sizePresetId === 'know-length' ? (
                  <div className="space-y-3 rounded-2xl border border-dark/10 bg-white p-5">
                    <p className="font-sans text-sm text-dark/60">
                      Enter the run length in metres along the fence or wall.
                    </p>
                    <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark/45">
                      Length (m)
                    </label>
                    <input
                      type="number"
                      min={1}
                      step={1}
                      value={runLength}
                      onChange={(e) => setRunLength(e.target.value)}
                      placeholder="e.g. 18"
                      className="w-full rounded-xl border border-dark/12 bg-cream px-4 py-3 font-sans text-base outline-none focus:border-[#E21E3F]"
                    />
                  </div>
                ) : null
              }
            />
          </section>
        )}

        {step === 'materials' && job && (
          <section>
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight max-w-2xl">
              Who is supplying the materials
            </h1>
            <p className="mt-3 mb-8 font-sans text-base text-dark/60 max-w-xl">
              If we supply, the quote includes a little spare so the job does not stall. If you
              already have some items, pick mix and tick what is on site.
            </p>
            <SelectChoiceGrid
              items={MATERIALS_OPTIONS.map((m) => ({
                id: m.id,
                title: m.label,
                blurb: m.blurb,
                icon: <Package strokeWidth={1.5} />,
                unsure: m.unsure,
              }))}
              selectedId={materials}
              revealAll={revealAll}
              onSelect={(id) => pickMaterials(id as MaterialsId)}
              onContinue={continueMaterials}
              onShowAll={() => setRevealAll(true)}
              followUp={
                materials === 'mix' && job.mixItems.length > 0 ? (
                  <div className="rounded-2xl border border-dark/10 bg-white p-5 text-left">
                    <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark/40">
                      What you already have
                    </p>
                    <p className="mb-3 font-sans text-sm text-dark/55">
                      <strong>Tick only what is already bought or on site.</strong> Leave blank if
                      none. We quote the rest, with a little spare on what we bring.
                    </p>
                    <ul className="space-y-2">
                      {job.mixItems.map((id) => {
                        const checked = mixHave.includes(id)
                        return (
                          <li key={id}>
                            <label className="flex cursor-pointer items-center gap-3 rounded-lg px-1 py-1.5">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleMix(id)}
                                className="h-4 w-4"
                              />
                              <span className="font-sans text-sm text-dark">
                                {MIX_ITEM_LABELS[id]}
                              </span>
                            </label>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ) : null
              }
            />
          </section>
        )}

        {step === 'mix-have' && job && (
          <section className="max-w-xl">
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight">
              What do you already have on site
            </h1>
            <p className="mt-3 mb-6 font-sans text-base text-dark/60">
              <strong>Tick what you already bought or have ready.</strong> We quote the rest, and
              still allow a little spare on what we bring.
            </p>
            <ul className="space-y-2.5">
              {(job.mixItems.length > 0
                ? job.mixItems
                : (['plants', 'soil', 'mulch', 'gravel'] as MixItemId[])
              ).map((id) => {
                const checked = mixHave.includes(id)
                return (
                  <li key={id}>
                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                        checked ? 'border-[#E21E3F] bg-[#E21E3F]/5' : 'border-dark/12 bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleMix(id)}
                        className="h-4 w-4"
                      />
                      <span className="font-sans text-sm font-medium text-dark">
                        {MIX_ITEM_LABELS[id]}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
            <div className="mt-8">
              <InkButton onClick={afterMixHave}>
                Continue <ArrowRight className="h-4 w-4" />
              </InkButton>
            </div>
          </section>
        )}

        {step === 'finish' && job && (
          <section>
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight max-w-2xl">
              What look are you after
            </h1>
            <p className="mt-3 mb-8 font-sans text-base text-dark/60 max-w-xl">
              Exact plant lists and Colorbond colours confirm later. Pick the closest direction.
            </p>
            <SelectChoiceGrid
              items={finishOptions.map((f) => ({
                id: f.id,
                title: f.label,
                blurb: f.blurb,
                icon: <Palette strokeWidth={1.5} />,
                unsure: f.unsure,
              }))}
              selectedId={finish}
              revealAll={revealAll}
              onSelect={(id) => pickFinish(id as FinishId)}
              onContinue={afterFinish}
              onShowAll={() => setRevealAll(true)}
              followUp={
                job.extras.length > 0 ? (
                  <div className="rounded-2xl border border-dark/10 bg-white p-5">
                    <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark/40">
                      Optional extras
                    </p>
                    <p className="mb-3 font-sans text-sm text-dark/55">
                      Optional. <strong>Tick only if you want them priced in.</strong>
                    </p>
                    <ul className="space-y-2">
                      {job.extras.map((e) => {
                        const checked = extras.includes(e.id)
                        return (
                          <li key={e.id}>
                            <label className="flex cursor-pointer items-center gap-3 rounded-lg px-1 py-1.5">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleExtra(e.id)}
                                className="h-4 w-4"
                              />
                              <span className="font-sans text-sm text-dark">{e.label}</span>
                            </label>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ) : null
              }
            />
          </section>
        )}

        {step === 'access' && (
          <section>
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight max-w-2xl">
              How do materials get to the work
            </h1>
            <p className="mt-3 mb-8 font-sans text-base text-dark/60 max-w-xl">
              Access changes labour time. Pick what is true for this property.
            </p>
            <SelectChoiceGrid
              items={ACCESS_OPTIONS.map((a) => ({
                id: a.id,
                title: a.label,
                blurb: a.blurb,
                icon: <Layers strokeWidth={1.5} />,
              }))}
              selectedId={access}
              revealAll={revealAll}
              onSelect={(id) => pickAccess(id as AccessId)}
              onContinue={continueAccess}
              onShowAll={() => setRevealAll(true)}
            />
          </section>
        )}

        {step === 'site' && (
          <section>
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight max-w-2xl">
              What is on the ground now
            </h1>
            <p className="mt-3 mb-8 font-sans text-base text-dark/60 max-w-xl">
              Clearing changes the price. Pick the closest description.
            </p>
            <SelectChoiceGrid
              items={SITE_CONDITIONS.map((s) => ({
                id: s.id,
                title: s.label,
                blurb: s.blurb,
                icon: <Shrub strokeWidth={1.5} />,
              }))}
              selectedId={site}
              revealAll={revealAll}
              onSelect={(id) => pickSite(id as SiteConditionId)}
              onContinue={continueSite}
              onShowAll={() => setRevealAll(true)}
            />
          </section>
        )}

        {step === 'details' && (
          <section className="max-w-lg">
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight">
              Where should the quote go
            </h1>
            <p className="mt-3 mb-8 font-sans text-base text-dark/60">
              On a live install this also fires SMS and the owner alert. In this sandbox it only
              fills the sample quotation on screen. Nothing is saved to a CRM.
            </p>
            {job?.impliesRemoval && (
              <p className="mb-6 rounded-xl border border-dark/10 bg-white px-4 py-3 font-sans text-sm text-dark/60">
                Rip-out and clear is already included in this job type, so we skipped the ground
                condition step.
              </p>
            )}
            <div className="space-y-4">
              <div>
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark/45">
                  Your name
                </label>
                <input
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="w-full rounded-xl border border-dark/12 bg-white px-4 py-3.5 font-sans text-base outline-none focus:border-[#E21E3F]"
                  placeholder="Alex"
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark/45">
                  Mobile
                </label>
                <input
                  value={visitorPhone}
                  onChange={(e) => setVisitorPhone(e.target.value)}
                  className="w-full rounded-xl border border-dark/12 bg-white px-4 py-3.5 font-sans text-base outline-none focus:border-[#E21E3F]"
                  placeholder="04xx xxx xxx"
                  autoComplete="tel"
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark/45">
                  Email
                </label>
                <input
                  type="email"
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                  className="w-full rounded-xl border border-dark/12 bg-white px-4 py-3.5 font-sans text-base outline-none focus:border-[#E21E3F]"
                  placeholder="you@…"
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="mt-8">
              <InkButton disabled={!canSubmitDetails} onClick={buildAndShow}>
                See my quotation <ArrowRight className="h-4 w-4" />
              </InkButton>
            </div>
          </section>
        )}

        {step === 'quote' && quote && (
          <section className="max-w-3xl">
            <style>{`
              @media print {
                @page { margin: 14mm; size: A4; }
                html, body {
                  background: #fff !important;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
                body * { visibility: hidden !important; }
                #qc-quote-sheet, #qc-quote-sheet * { visibility: visible !important; }
                #qc-quote-sheet {
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100% !important;
                  margin: 0 !important;
                  border: none !important;
                  box-shadow: none !important;
                  border-radius: 0 !important;
                  background: #fff !important;
                }
                .qc-no-print { display: none !important; }
              }
            `}</style>

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 qc-no-print print:hidden">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8843F]">
                Sample quotation
              </p>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-dark/15 bg-white px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark/70"
              >
                Print or save as PDF
              </button>
            </div>

            <article
              id="qc-quote-sheet"
              className="overflow-hidden rounded-sm border border-dark/15 bg-white text-[#1A1A1A] shadow-[0_16px_48px_-28px_rgba(26,26,26,0.45)]"
            >
              <header className="px-7 pt-8 pb-6 md:px-12 md:pt-10 md:pb-7">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div>
                    <p className="font-serif text-[1.65rem] leading-none tracking-tight md:text-[1.85rem]">
                      {businessName || 'GreenEdge Landscapes'}
                    </p>
                    <p className="mt-2 font-sans text-[12px] leading-relaxed text-dark/55">
                      Sample landscaping quotation
                    </p>
                  </div>
                  <div className="min-w-[10rem] text-left sm:text-right">
                    <p className="font-serif text-[11px] uppercase tracking-[0.22em] text-dark/45">
                      Quote no.
                    </p>
                    <p className="mt-1 font-serif text-[15px] tabular-nums tracking-wide">
                      {quote.quoteNumber}
                    </p>
                    <p className="mt-3 font-serif text-[11px] uppercase tracking-[0.22em] text-dark/45">
                      Date
                    </p>
                    <p className="mt-1 font-serif text-[15px]">{quote.issuedAt}</p>
                  </div>
                </div>

                <div className="mt-7 border-t border-dark/20 pt-5">
                  <h1 className="text-center font-serif text-[13px] font-semibold uppercase tracking-[0.42em] text-dark">
                    Quotation
                  </h1>
                  <div className="mx-auto mt-3 h-px w-24 bg-dark/25" aria-hidden />
                </div>
              </header>

              <div className="grid gap-8 border-t border-dark/10 px-7 py-6 md:grid-cols-2 md:gap-10 md:px-12 md:py-7">
                <div>
                  <h2 className="font-serif text-[12px] font-semibold uppercase tracking-[0.2em] text-dark">
                    Prepared for
                  </h2>
                  <div className="mt-2 h-px w-full bg-dark/15" aria-hidden />
                  <p className="mt-3 font-serif text-[17px] leading-snug">
                    {visitorName.trim() || 'Customer'}
                  </p>
                  {visitorPhone.trim() ? (
                    <p className="mt-1.5 font-serif text-[14px] text-dark/65">{visitorPhone.trim()}</p>
                  ) : null}
                  {visitorEmail.trim() ? (
                    <p className="font-serif text-[14px] text-dark/65">{visitorEmail.trim()}</p>
                  ) : null}
                </div>
                <div>
                  <h2 className="font-serif text-[12px] font-semibold uppercase tracking-[0.2em] text-dark">
                    Particulars of works
                  </h2>
                  <div className="mt-2 h-px w-full bg-dark/15" aria-hidden />
                  <p className="mt-3 font-serif text-[17px] leading-snug">{quote.jobLabel}</p>
                  <p className="mt-1.5 font-serif text-[14px] text-dark/65">{quote.sizeLabel}</p>
                  <p className="mt-1 font-serif text-[14px] text-dark/65">{quote.materialsLabel}</p>
                  {quote.finishLabel ? (
                    <p className="mt-1 font-serif text-[14px] text-dark/65">
                      Finish: {quote.finishLabel}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="border-t border-dark/10 px-7 py-6 md:px-12 md:py-7">
                <h2 className="font-serif text-[12px] font-semibold uppercase tracking-[0.2em] text-dark">
                  Scope of works
                </h2>
                <div className="mt-2 h-px w-full bg-dark/15" aria-hidden />
                <ol className="mt-4 list-decimal space-y-2.5 pl-5">
                  {quote.scope.map((line) => (
                    <li
                      key={line}
                      className="pl-1 font-serif text-[14px] leading-[1.55] text-dark/80"
                    >
                      {line}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border-t border-dark/10 px-7 py-6 md:px-12 md:py-7">
                <h2 className="font-serif text-[12px] font-semibold uppercase tracking-[0.2em] text-dark">
                  Schedule of rates
                </h2>
                <div className="mt-2 h-px w-full bg-dark/15" aria-hidden />
                <table className="mt-4 w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-dark/25">
                      <th className="pb-2.5 font-serif text-[11px] font-semibold uppercase tracking-[0.16em] text-dark/55">
                        Description
                      </th>
                      <th className="pb-2.5 text-right font-serif text-[11px] font-semibold uppercase tracking-[0.16em] text-dark/55">
                        Amount (AUD)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {quote.lines.map((line) => (
                      <tr key={line.label} className="border-b border-dark/10">
                        <td className="py-3 pr-4 font-serif text-[14px] leading-snug text-dark/80">
                          {line.label}
                        </td>
                        <td className="py-3 text-right font-serif text-[14px] tabular-nums">
                          {money(line.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="mt-6 border-t border-dark pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h2 className="font-serif text-[12px] font-semibold uppercase tracking-[0.2em] text-dark">
                        Total payable
                      </h2>
                      <p className="mt-1 font-serif text-[12px] text-dark/50">
                        Inclusive of GST. Sample rates for this demo.
                      </p>
                    </div>
                    <p className="font-serif text-[2.35rem] leading-none tabular-nums tracking-tight md:text-[2.75rem]">
                      {money(quote.total)}
                    </p>
                  </div>
                </div>

                <div className="qc-no-print mt-6 border border-dark/15 bg-[#FAFAF8] px-4 py-3.5 md:px-5 print:hidden">
                  <h2 className="font-serif text-[12px] font-semibold uppercase tracking-[0.2em] text-dark">
                    Payment
                  </h2>
                  <p className="mt-1.5 font-serif text-[13px] leading-relaxed text-dark/70">
                    Total due {money(quote.total)}. On a live install the pay link sits here. Demo
                    pay is off.
                  </p>
                  <button
                    type="button"
                    disabled
                    className="mt-3 cursor-not-allowed rounded-full bg-dark/80 px-6 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-cream opacity-70"
                  >
                    Pay {money(quote.total)} (demo only)
                  </button>
                </div>

                <p className="mt-6 font-serif text-[12px] leading-relaxed text-dark/50">
                  This quotation remains valid for {quote.validDays} days from the date shown above.
                  {' '}
                  {SAMPLE_DISCLAIMER}
                </p>
              </div>

              <footer className="border-t border-dark/15 px-7 py-4 md:px-12">
                <p className="font-serif text-[11px] text-dark/40">
                  Prepared with Quote Capture by SYSBILT. Sample document for demonstration only.
                </p>
              </footer>
            </article>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap qc-no-print print:hidden">
              <InkButton onClick={() => go('buy')}>
                Want this on your website <ArrowRight className="h-4 w-4" />
              </InkButton>
              <button
                type="button"
                onClick={restart}
                className="font-sans text-sm text-dark/45 hover:text-dark/70 sm:px-2"
              >
                Run the demo again
              </button>
            </div>
          </section>
        )}

        {step === 'buy' && (
          <section className="mx-auto flex min-h-[min(62vh,36rem)] w-full max-w-4xl flex-col items-center justify-center pb-12 text-center md:min-h-[min(68vh,40rem)]">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#A8843F]">
              {headerEyebrow}
            </p>
            <h1 className="mt-6 w-full font-serif text-[2.35rem] leading-[1.08] tracking-tight text-dark sm:text-5xl md:text-6xl lg:text-[3.75rem]">
              {businessName
                ? `${businessName}, stop writing quotes, start closing them`
                : 'Stop writing quotes, start closing them'}
            </h1>
            <p className="mx-auto mt-7 max-w-2xl font-sans text-lg leading-relaxed text-dark/70 md:text-xl">
              That sample used demo rates. Quote Capture installs on your site with your prices.
              Customers answer plain questions, see a clear quotation with scope and total, get email
              and SMS with a pay link, and you get a priced lead you can close.
            </p>
            <div className="mt-12 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Link
                to="/go/quote-capture"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E21E3F] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream shadow-[0_12px_28px_-12px_rgba(226,30,63,0.65)]"
              >
                See Quote Capture, $2,800
              </Link>
            </div>
            <button
              type="button"
              onClick={() => go('quote')}
              className="mt-8 font-sans text-sm text-dark/45 hover:text-dark/70"
            >
              Back to the sample quote
            </button>
          </section>
        )}

        <p className="mt-16 border-t border-dark/10 pt-6 font-sans text-[11px] text-dark/35">
          SYSBILT, Quote Capture demo, sample rates only, simulated business, noindex
        </p>
      </div>

      {showConciergeDock ? (
        <QuoteCaptureConciergeDock
          context={conciergeContext}
          resetKey={conciergeResetKey}
          onSyncSituation={(id) => {
            pickSituation(id)
            if (step !== 'situation') {
              go('job')
            }
          }}
        />
      ) : null}
    </div>
  )
}
