import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {Link, useSearchParams} from 'react-router-dom'
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Gauge,
  Globe,
  Heart,
  HelpCircle,
  MapPin,
  MessageCircle,
  Search,
  Star,
  ThumbsDown,
  ThumbsUp,
  User,
  Zap,
} from 'lucide-react'
import {SysbiltLogo} from '../../components/SysbiltLogo'
import {PageMeta} from '../../components/PageMeta'
import {SITE_ORIGIN} from '../../constants/seoMeta'
import {FUNNEL_FOOTER_TEXT} from '../../constants/funnel'
import {
  AGAIN_OPTIONS,
  ATTENTION_INSTANT_IDS,
  ATTENTION_OPTIONS,
  buildFakeDraft,
  COMFORT_INSTANT_IDS,
  COMFORT_OPTIONS,
  detailsForService,
  GENERAL_JOB_QUERY_MAP,
  GENERAL_SERVICE_OPTIONS,
  HAPPY_THRESHOLD,
  IMPROVE_BETTER_INSTANT_IDS,
  IMPROVE_BETTER_OPTIONS,
  IMPROVE_FASTER_INSTANT_IDS,
  IMPROVE_FASTER_OPTIONS,
  MATERIALS_INSTANT_IDS,
  MATERIALS_OPTIONS,
  PERSON_INSTANT_IDS,
  PERSON_OPTIONS,
  PERSON_TRAIT_OPTIONS,
  PRODUCT_JOB_QUERY_MAP,
  PRODUCT_SERVICE_OPTIONS,
  RESULT_INSTANT_IDS,
  RESULT_OPTIONS,
  serviceDetailInstantIds,
  serviceLabel,
  SYSBILT_GOOGLE_REVIEW_URL,
} from './sysbiltConfig'

const RED = '#E21E3F'
const INK = '#1A1A1A'
const CREAM = '#FFF2EC'
const GOLD = '#A8843F'

type Step =
  | 'intro'
  | 'service'
  | 'serviceDetail'
  | 'result'
  | 'attention'
  | 'comfort'
  | 'personName'
  | 'personFeel'
  | 'personTraits'
  | 'materials'
  | 'improveBetter'
  | 'improveFaster'
  | 'again'
  | 'nextHelp'
  | 'score'
  | 'loading'
  | 'draft'
  | 'thanks'

const PHASES = [
  {id: 'start', n: 1, label: 'Start'},
  {id: 'work', n: 2, label: 'The work'},
  {id: 'people', n: 3, label: 'People'},
  {id: 'improve', n: 4, label: 'Improve'},
  {id: 'done', n: 5, label: 'Done'},
] as const

function phaseIndexFor(step: Step): number {
  switch (step) {
    case 'intro':
      return 0
    case 'service':
    case 'serviceDetail':
    case 'result':
    case 'attention':
    case 'comfort':
      return 1
    case 'personName':
    case 'personFeel':
    case 'personTraits':
    case 'materials':
      return 2
    case 'improveBetter':
    case 'improveFaster':
    case 'again':
    case 'nextHelp':
    case 'score':
    case 'loading':
      return 3
    case 'draft':
    case 'thanks':
      return 4
  }
}

const STEP_ORDER: Step[] = [
  'intro',
  'service',
  'serviceDetail',
  'result',
  'attention',
  'comfort',
  'personName',
  'personFeel',
  'personTraits',
  'materials',
  'improveBetter',
  'improveFaster',
  'again',
  'nextHelp',
  'score',
]

function StepChrome({
  eyebrow,
  title,
  lead,
  children,
  centre,
}: {
  eyebrow?: string
  title: string
  lead: string
  children: ReactNode
  centre?: boolean
}) {
  return (
    <section className={centre ? 'mx-auto flex w-full max-w-3xl flex-col items-center text-center' : undefined}>
      {eyebrow ? (
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#A8843F]">
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={`font-serif text-3xl leading-tight tracking-tight md:text-4xl ${
          centre ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'
        }`}
      >
        {title}
      </h1>
      <p
        className={`mb-8 mt-3 font-sans text-base text-dark/60 ${
          centre ? 'mx-auto max-w-xl text-center' : 'max-w-xl'
        }`}
      >
        {lead}
      </p>
      <div className={centre ? 'w-full' : undefined}>{children}</div>
    </section>
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

function GhostButton({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-dark/20 bg-white px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark transition-colors hover:border-dark/40"
    >
      {children}
    </button>
  )
}

type BurstIntensity = 'big' | 'small'

/** Quiet celebration: gold/cream sparks, bigger for nailed-it moments. */
function PositiveBurst({
  intensity,
  origin,
}: {
  intensity: BurstIntensity
  origin: {x: number; y: number} | null
}) {
  const count = intensity === 'big' ? 16 : 9
  const colours = ['#A8843F', '#E21E3F', '#FFF2EC', '#1A1A1A']
  if (!origin) return null
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[80] overflow-hidden"
      aria-hidden
    >
      {Array.from({length: count}).map((_, i) => {
        const angle = (Math.PI * 2 * i) / count + (i % 3) * 0.2
        const dist = intensity === 'big' ? 72 + (i % 5) * 14 : 48 + (i % 4) * 10
        const size = intensity === 'big' ? 5 + (i % 3) : 3 + (i % 2)
        const delay = (i % 4) * 20
        const dur = intensity === 'big' ? 780 : 520
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: origin.x,
              top: origin.y,
              width: size,
              height: size,
              backgroundColor: colours[i % colours.length],
              animation: `fb-burst ${dur}ms ease-out ${delay}ms forwards`,
              ['--fb-dx' as string]: `${Math.cos(angle) * dist}px`,
              ['--fb-dy' as string]: `${Math.sin(angle) * dist}px`,
            } as React.CSSProperties}
          />
        )
      })}
      <span
        className="absolute rounded-full border-2"
        style={{
          left: origin.x,
          top: origin.y,
          width: intensity === 'big' ? 12 : 8,
          height: intensity === 'big' ? 12 : 8,
          marginLeft: intensity === 'big' ? -6 : -4,
          marginTop: intensity === 'big' ? -6 : -4,
          borderColor: intensity === 'big' ? '#E21E3F' : '#A8843F',
          animation: `${intensity === 'big' ? 'fb-ring-big' : 'fb-ring-small'} ${
            intensity === 'big' ? 700 : 480
          }ms ease-out forwards`,
        }}
      />
    </div>
  )
}

function usePositiveBurst() {
  const [burst, setBurst] = useState<{
    intensity: BurstIntensity
    origin: {x: number; y: number}
  } | null>(null)

  function fire(intensity: BurstIntensity, el?: HTMLElement | null) {
    const rect = el?.getBoundingClientRect()
    const origin = rect
      ? {x: rect.left + rect.width / 2, y: rect.top + rect.height / 2}
      : {x: window.innerWidth / 2, y: window.innerHeight * 0.4}
    setBurst({intensity, origin})
    const ms = intensity === 'big' ? 720 : 480
    window.setTimeout(() => setBurst(null), ms)
    return ms
  }

  return {burst, fire}
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
        <p className="flex-1 px-0.5 font-sans text-[13px] leading-relaxed text-dark/55">
          {blurb}
        </p>
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

/** Big service picker only (Quote Capture centre animation). */
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
    pendingFirst.current = first ? {id, first} : null
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
    const t = window.setTimeout(() => finishToCentre(id), FADE_MS)
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

/** Compact card: tap picks. Instant options advance. No fake Select overlay. */
function CompactCard({
  selected,
  onSelect,
  title,
  blurb,
  icon,
  pop,
}: {
  selected: boolean
  onSelect: (el: HTMLButtonElement) => void
  title: string
  blurb: string
  icon?: ReactNode
  pop?: boolean
}) {
  return (
    <button
      type="button"
      onClick={(e) => onSelect(e.currentTarget)}
      data-selected={selected ? 'true' : undefined}
      data-pop={pop ? 'true' : undefined}
      className="group relative flex min-h-[148px] flex-col items-center rounded-xl border border-dark/12 bg-white px-3 pt-4 pb-3 text-center shadow-[0_6px_18px_-14px_rgba(26,26,26,0.28)] transition-[border-color,box-shadow] duration-200 hover:border-[#E21E3F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21E3F] focus-visible:ring-offset-2 data-[selected=true]:border-[#E21E3F] data-[selected=true]:shadow-[0_12px_28px_-18px_rgba(226,30,63,0.35)] data-[pop=true]:[&>div:first-child]:animate-[fb-icon-pop_480ms_ease-out] sm:min-h-[160px]"
    >
      <div
        className={`mb-2 flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9 ${
          selected ? 'text-[#E21E3F]' : 'text-dark group-hover:text-[#E21E3F]'
        }`}
      >
        <div className="h-full w-full [&_svg]:h-full [&_svg]:w-full">{icon}</div>
      </div>
      <div
        className={`shrink-0 font-sans text-sm font-semibold leading-snug sm:text-[15px] ${
          selected ? 'text-[#E21E3F]' : 'text-dark group-hover:text-[#E21E3F]'
        }`}
      >
        {title}
      </div>
      <p className="mt-1.5 font-sans text-[11px] leading-snug text-dark/50 sm:text-xs">
        {blurb}
      </p>
    </button>
  )
}

/** Four options stay visible. Tap = select + go next. No Continue. */
function CompactChoiceGrid({
  items,
  selectedId,
  onPick,
  celebrateFor,
  onCelebrate,
}: {
  items: ChoiceItem[]
  selectedId: string | null
  onPick: (id: string) => void
  celebrateFor?: (id: string) => BurstIntensity | null
  onCelebrate?: (intensity: BurstIntensity, el: HTMLElement | null) => number
}) {
  const [popId, setPopId] = useState<string | null>(null)
  const busy = useRef(false)

  function handleSelect(id: string, el: HTMLButtonElement) {
    if (busy.current) return
    const intensity = celebrateFor?.(id) ?? null
    if (intensity && onCelebrate) {
      busy.current = true
      setPopId(id)
      const wait = onCelebrate(intensity, el)
      window.setTimeout(() => {
        busy.current = false
        setPopId(null)
        onPick(id)
      }, wait)
      return
    }
    onPick(id)
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3">
      {items.map((item) => (
        <CompactCard
          key={item.id}
          selected={selectedId === item.id || popId === item.id}
          pop={popId === item.id}
          onSelect={(el) => handleSelect(item.id, el)}
          title={item.title}
          blurb={item.blurb}
          icon={item.icon}
        />
      ))}
    </div>
  )
}

/** Multi-pick chips so reviews pick different strengths, not the same sentence every time. */
function MultiPickGrid({
  items,
  selectedIds,
  onToggle,
  onContinue,
  onSkip,
  max = 3,
}: {
  items: ChoiceItem[]
  selectedIds: string[]
  onToggle: (id: string) => void
  onContinue: () => void
  onSkip: () => void
  max?: number
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3">
        {items.map((item) => {
          const selected = selectedIds.includes(item.id)
          const full = !selected && selectedIds.length >= max
          return (
            <button
              key={item.id}
              type="button"
              disabled={full}
              onClick={() => onToggle(item.id)}
              data-selected={selected ? 'true' : undefined}
              className="group flex min-h-[132px] flex-col items-center rounded-xl border border-dark/12 bg-white px-3 py-4 text-center shadow-[0_6px_18px_-14px_rgba(26,26,26,0.28)] transition-[border-color,box-shadow,opacity] duration-200 hover:border-[#E21E3F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21E3F] focus-visible:ring-offset-2 data-[selected=true]:border-[#E21E3F] disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-[148px]"
            >
              <div
                className={`mb-2 flex h-8 w-8 shrink-0 items-center justify-center sm:h-9 sm:w-9 ${
                  selected ? 'text-[#E21E3F]' : 'text-dark group-hover:text-[#E21E3F]'
                }`}
              >
                <div className="h-full w-full [&_svg]:h-full [&_svg]:w-full">{item.icon}</div>
              </div>
              <div
                className={`font-sans text-sm font-semibold leading-snug sm:text-[15px] ${
                  selected ? 'text-[#E21E3F]' : 'text-dark'
                }`}
              >
                {item.title}
              </div>
              <p className="mt-1.5 font-sans text-[11px] leading-snug text-dark/50 sm:text-xs">
                {item.blurb}
              </p>
            </button>
          )
        })}
      </div>
      <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark/40">
        Pick up to {max}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <InkButton disabled={selectedIds.length === 0} onClick={onContinue}>
          Continue <ArrowRight className="h-4 w-4" />
        </InkButton>
        <GhostButton onClick={onSkip}>Skip</GhostButton>
      </div>
    </>
  )
}

/**
 * Compact cards. Positive picks in `instantIds` advance with no box.
 * Other picks open an optional note with Skip / Continue.
 */
function CompactChoiceWithNote({
  items,
  selectedId,
  onSelect,
  note,
  onNoteChange,
  noteLabel,
  notePlaceholder,
  onAdvance,
  instantIds,
  celebrateFor,
  onCelebrate,
}: {
  items: ChoiceItem[]
  selectedId: string | null
  onSelect: (id: string) => void
  note: string
  onNoteChange: (v: string) => void
  noteLabel: string
  notePlaceholder: string
  onAdvance: () => void
  instantIds?: readonly string[]
  celebrateFor?: (id: string) => BurstIntensity | null
  onCelebrate?: (intensity: BurstIntensity, el: HTMLElement | null) => number
}) {
  const [popId, setPopId] = useState<string | null>(null)
  const busy = useRef(false)
  const noteWrapRef = useRef<HTMLDivElement | null>(null)

  function finishPick(id: string) {
    onSelect(id)
    if (instantIds?.includes(id)) {
      onAdvance()
    }
  }

  function handlePick(id: string, el: HTMLButtonElement) {
    if (busy.current) return
    const intensity = celebrateFor?.(id) ?? null
    if (intensity && onCelebrate && instantIds?.includes(id)) {
      busy.current = true
      setPopId(id)
      onSelect(id)
      const wait = onCelebrate(intensity, el)
      window.setTimeout(() => {
        busy.current = false
        setPopId(null)
        onAdvance()
      }, wait)
      return
    }
    if (intensity && onCelebrate) {
      setPopId(id)
      onCelebrate(intensity, el)
      window.setTimeout(() => setPopId(null), intensity === 'big' ? 720 : 480)
    }
    finishPick(id)
  }

  const showNote = Boolean(selectedId) && !instantIds?.includes(selectedId)
  const picked = items.find((item) => item.id === selectedId)

  useEffect(() => {
    if (!showNote) return
    noteWrapRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
  }, [showNote])

  if (showNote) {
    return (
      <div ref={noteWrapRef} className="mx-auto w-full max-w-xl text-center">
        {picked ? (
          <p className="font-sans text-base font-semibold text-dark">{picked.title}</p>
        ) : null}
        <button
          type="button"
          onClick={() => onSelect('')}
          className="mt-2 font-sans text-sm text-dark/55 transition-colors hover:text-dark hover:underline hover:underline-offset-4"
        >
          Pick a different one
        </button>
        <div className="mt-8 text-left">
          <label className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-dark/45">
            {noteLabel}
          </label>
          <textarea
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            rows={4}
            placeholder={notePlaceholder}
            autoFocus
            className="mt-2 w-full resize-y rounded-2xl border border-dark/15 bg-white px-4 py-4 font-sans text-base leading-relaxed text-dark outline-none transition focus:border-[#E21E3F]"
          />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <InkButton onClick={onAdvance}>
            Continue <ArrowRight className="h-4 w-4" />
          </InkButton>
          <GhostButton onClick={onAdvance}>Skip</GhostButton>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3">
      {items.map((item) => (
        <CompactCard
          key={item.id}
          selected={selectedId === item.id || popId === item.id}
          pop={popId === item.id}
          onSelect={(el) => handlePick(item.id, el)}
          title={item.title}
          blurb={item.blurb}
          icon={item.icon}
        />
      ))}
    </div>
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
  const barRef = useRef<HTMLDivElement | null>(null)
  const markRefs = useRef<(HTMLDivElement | null)[]>([])
  const [fillPx, setFillPx] = useState(0)

  useLayoutEffect(() => {
    const bar = barRef.current
    if (!bar) return

    function measure() {
      const mark = markRefs.current[phaseIndex]
      if (!bar || !mark) return
      const barBox = bar.getBoundingClientRect()
      const markBox = mark.getBoundingClientRect()
      if (phaseIndex >= PHASES.length - 1) {
        setFillPx(barBox.width)
        return
      }
      const next = markRefs.current[phaseIndex + 1]
      const justPast = markBox.right - barBox.left + 8
      if (next) {
        const nextBox = next.getBoundingClientRect()
        const mid = (markBox.right + nextBox.left) / 2 - barBox.left
        setFillPx(Math.max(0, Math.min(justPast, mid, barBox.width)))
        return
      }
      setFillPx(Math.max(0, Math.min(justPast, barBox.width)))
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(bar)
    markRefs.current.forEach((el) => {
      if (el) ro.observe(el)
    })
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [phaseIndex, canGoBack])

  return (
    <div
      ref={barRef}
      className="relative flex h-12 w-full min-w-0 items-center rounded-full shadow-[0_4px_18px_-6px_rgba(26,26,26,0.28)] md:h-[52px]"
      style={{backgroundColor: INK}}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
        style={{
          width: fillPx > 0 ? `${fillPx}px` : `${((phaseIndex + 1) / PHASES.length) * 100}%`,
          backgroundColor: CREAM,
        }}
        aria-hidden
      />
      <div className="relative z-10 flex h-full min-w-0 flex-1 items-center gap-0 pl-1.5 pr-2 md:pl-2 md:pr-3">
        <div className="flex shrink-0 items-center gap-2">
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
        </div>
        <div className="ml-2 flex min-w-0 flex-1 items-center justify-between gap-1 md:ml-3 md:gap-2">
          {PHASES.map((p, i) => {
            const active = i === phaseIndex
            const done = i < phaseIndex
            const onCream = i <= phaseIndex
            return (
              <div
                key={p.id}
                ref={(node) => {
                  markRefs.current[i] = node
                }}
                className="flex shrink-0 items-center gap-1.5 px-1 md:gap-2 md:px-2"
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] font-bold md:h-7 md:w-7 md:text-[11px] ${
                    onCream ? 'bg-dark text-cream' : 'bg-cream/15 text-cream/70'
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : p.n}
                </span>
                <span
                  className={`hidden font-mono text-[9px] font-bold uppercase tracking-[0.16em] sm:inline ${
                    active
                      ? onCream
                        ? 'text-dark'
                        : 'text-cream'
                      : onCream
                        ? 'text-dark/55'
                        : 'text-cream/45'
                  }`}
                >
                  {p.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function serviceIcon(id: string): ReactNode {
  switch (id) {
    case 'websites':
    case 'website':
      return <Globe strokeWidth={1.5} />
    case 'crm':
      return <FileText strokeWidth={1.5} />
    case 'automation':
    case 'speed-fix':
      return <Zap strokeWidth={1.5} />
    case 'ai':
      return <MessageCircle strokeWidth={1.5} />
    case 'content':
      return <Search strokeWidth={1.5} />
    case 'training':
      return <User strokeWidth={1.5} />
    case 'dashboards':
      return <Gauge strokeWidth={1.5} />
    case 'google-profile':
      return <MapPin strokeWidth={1.5} />
    case 'quote-capture':
      return <FileText strokeWidth={1.5} />
    case 'search-fix':
      return <Search strokeWidth={1.5} />
    case 'other':
      return <HelpCircle strokeWidth={1.5} />
    default:
      return <HelpCircle strokeWidth={1.5} />
  }
}

function toneIcon(id: string, kind: 'up' | 'ok' | 'mid' | 'down'): ReactNode {
  if (kind === 'up') return <ThumbsUp strokeWidth={1.5} />
  if (kind === 'ok') return <Check strokeWidth={1.5} />
  if (kind === 'mid') return <HelpCircle strokeWidth={1.5} />
  return <ThumbsDown strokeWidth={1.5} />
}

function resultIcon(id: string): ReactNode {
  if (id === 'nailed') return toneIcon(id, 'up')
  if (id === 'solid') return toneIcon(id, 'ok')
  if (id === 'mixed') return toneIcon(id, 'mid')
  return toneIcon(id, 'down')
}

function attentionIcon(id: string): ReactNode {
  if (id === 'tight') return <MessageCircle strokeWidth={1.5} />
  if (id === 'fine') return <Check strokeWidth={1.5} />
  if (id === 'spotty') return <HelpCircle strokeWidth={1.5} />
  return <ThumbsDown strokeWidth={1.5} />
}

function comfortIcon(id: string): ReactNode {
  if (id === 'yes') return <Heart strokeWidth={1.5} />
  if (id === 'mostly') return <ThumbsUp strokeWidth={1.5} />
  if (id === 'uneasy') return <HelpCircle strokeWidth={1.5} />
  return <ThumbsDown strokeWidth={1.5} />
}

function personFeelIcon(id: string): ReactNode {
  if (id === 'excellent') return <Heart strokeWidth={1.5} />
  if (id === 'good') return <ThumbsUp strokeWidth={1.5} />
  if (id === 'mixed') return <HelpCircle strokeWidth={1.5} />
  return <ThumbsDown strokeWidth={1.5} />
}

function materialsIcon(id: string): ReactNode {
  if (id === 'crystal') return <Check strokeWidth={1.5} />
  if (id === 'mostly') return <FileText strokeWidth={1.5} />
  if (id === 'confusing') return <HelpCircle strokeWidth={1.5} />
  return <ThumbsDown strokeWidth={1.5} />
}

function improveBetterIcon(id: string): ReactNode {
  if (id === 'perfect') return <ThumbsUp strokeWidth={1.5} />
  if (id === 'result') return <Gauge strokeWidth={1.5} />
  if (id === 'explain') return <FileText strokeWidth={1.5} />
  return <MessageCircle strokeWidth={1.5} />
}

function improveFasterIcon(id: string): ReactNode {
  if (id === 'perfect') return <ThumbsUp strokeWidth={1.5} />
  if (id === 'start') return <Zap strokeWidth={1.5} />
  if (id === 'replies') return <MessageCircle strokeWidth={1.5} />
  return <Gauge strokeWidth={1.5} />
}

function againIcon(id: string): ReactNode {
  if (id === 'yes') return <Heart strokeWidth={1.5} />
  if (id === 'likely') return <ThumbsUp strokeWidth={1.5} />
  if (id === 'maybe') return <HelpCircle strokeWidth={1.5} />
  return <ThumbsDown strokeWidth={1.5} />
}

function traitIcon(id: string): ReactNode {
  if (id === 'clear') return <MessageCircle strokeWidth={1.5} />
  if (id === 'fast') return <Zap strokeWidth={1.5} />
  if (id === 'patient') return <Heart strokeWidth={1.5} />
  if (id === 'honest') return <Check strokeWidth={1.5} />
  if (id === 'organised') return <FileText strokeWidth={1.5} />
  if (id === 'skilled') return <Gauge strokeWidth={1.5} />
  if (id === 'calm') return <ThumbsUp strokeWidth={1.5} />
  return <User strokeWidth={1.5} />
}

function detailIcon(id: string): ReactNode {
  if (id.includes('site') || id === 'full-site' || id === 'landing' || id === 'shop') {
    return <Globe strokeWidth={1.5} />
  }
  if (id.includes('form') || id === 'wizard' || id === 'rates') {
    return <FileText strokeWidth={1.5} />
  }
  if (id.includes('speed') || id === 'images') {
    return <Zap strokeWidth={1.5} />
  }
  if (id.includes('chat') || id === 'phone' || id.includes('ai')) {
    return <MessageCircle strokeWidth={1.5} />
  }
  if (id.includes('profile') || id === 'claim') {
    return <MapPin strokeWidth={1.5} />
  }
  return <Check strokeWidth={1.5} />
}

export default function FeedbackReviewPage() {
  const [params] = useSearchParams()
  const jobPrefill = (params.get('job') || '').trim().toLowerCase()
  const catalogParam = (params.get('catalog') || '').trim().toLowerCase()
  const catalog: 'general' | 'products' =
    catalogParam === 'products' || jobPrefill in PRODUCT_JOB_QUERY_MAP
      ? 'products'
      : 'general'
  const isSample =
    params.get('sample') === '1' || params.get('demo') === '1'

  /** Silent personalisation from the send link (sheet / outbound). Never asked in-form. */
  const linkContactName = (
    params.get('name') ||
    params.get('n') ||
    ''
  ).trim()
  const linkEmail = (params.get('email') || params.get('e') || '').trim().toLowerCase()
  const linkCompany = (
    params.get('company') ||
    params.get('c') ||
    params.get('business') ||
    ''
  ).trim()
  const linkFirstName = linkContactName.split(/\s+/)[0] || ''

  const serviceOptions =
    catalog === 'products' ? PRODUCT_SERVICE_OPTIONS : GENERAL_SERVICE_OPTIONS

  const [step, setStep] = useState<Step>('intro')
  const [serviceId, setServiceId] = useState<string | null>(() => {
    if (catalog === 'products') return PRODUCT_JOB_QUERY_MAP[jobPrefill] ?? null
    return GENERAL_JOB_QUERY_MAP[jobPrefill] ?? null
  })
  const [otherService, setOtherService] = useState('')
  const [detailId, setDetailId] = useState<string | null>(null)
  const [detailOther, setDetailOther] = useState('')
  const [resultId, setResultId] = useState<string | null>(null)
  const [resultNote, setResultNote] = useState('')
  const [attentionId, setAttentionId] = useState<string | null>(null)
  const [attentionNote, setAttentionNote] = useState('')
  const [comfortId, setComfortId] = useState<string | null>(null)
  const [comfortNote, setComfortNote] = useState('')
  const [personName, setPersonName] = useState('')
  const [personId, setPersonId] = useState<string | null>(null)
  const [personNote, setPersonNote] = useState('')
  const [personTraitIds, setPersonTraitIds] = useState<string[]>([])
  const [materialsId, setMaterialsId] = useState<string | null>(null)
  const [materialsNote, setMaterialsNote] = useState('')
  const [improveBetterId, setImproveBetterId] = useState<string | null>(null)
  const [improveBetterNote, setImproveBetterNote] = useState('')
  const [improveFasterId, setImproveFasterId] = useState<string | null>(null)
  const [improveFasterNote, setImproveFasterNote] = useState('')
  const [againId, setAgainId] = useState<string | null>(null)
  const [nextHelp, setNextHelp] = useState('')
  const [score, setScore] = useState<number | null>(null)
  const [draft, setDraft] = useState('')
  const [copied, setCopied] = useState(false)
  const [hoverStar, setHoverStar] = useState<number | null>(null)
  const [revealAll, setRevealAll] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const submitLock = useRef(false)
  const {burst, fire} = usePositiveBurst()

  const phaseIndex = phaseIndexFor(step)
  const label = useMemo(
    () => serviceLabel(catalog, serviceId, otherService),
    [catalog, serviceId, otherService],
  )

  useEffect(() => {
    setRevealAll(false)
  }, [step])

  function go(next: Step) {
    setStep(next)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  function goBack() {
    if (step === 'result') {
      go(detailsForService(serviceId).length > 0 ? 'serviceDetail' : 'service')
      return
    }
    if (step === 'materials') {
      go(
        personId === 'excellent' || personId === 'good'
          ? 'personTraits'
          : 'personFeel',
      )
      return
    }
    if (step === 'personTraits') {
      go('personFeel')
      return
    }
    if (step === 'serviceDetail') {
      go('service')
      return
    }
    const i = STEP_ORDER.indexOf(step)
    if (i <= 0) return
    go(STEP_ORDER[i - 1])
  }

  const canGoBack =
    step !== 'intro' &&
    step !== 'loading' &&
    step !== 'draft' &&
    step !== 'thanks'

  function finishScore() {
    if (score == null) return
    submitLock.current = false
    setSubmitError(null)
    if (score >= HAPPY_THRESHOLD) go('loading')
    else go('thanks')
  }

  function buildPayload(path: 'happy' | 'unhappy') {
    return {
      catalog,
      serviceId,
      serviceLabel: label,
      otherService,
      detailId,
      detailOther,
      resultId,
      resultNote,
      attentionId,
      attentionNote,
      comfortId,
      comfortNote,
      personName,
      personId,
      personNote,
      personTraitIds,
      materialsId,
      materialsNote,
      improveBetterId,
      improveBetterNote,
      improveFasterId,
      improveFasterNote,
      againId,
      nextHelp,
      contactName: linkContactName,
      email: linkEmail,
      company: linkCompany,
      score: score ?? 0,
      path,
      sample: isSample,
    }
  }

  useEffect(() => {
    if (step !== 'loading' && step !== 'thanks') return
    if (submitLock.current) return
    submitLock.current = true

    const path = step === 'loading' ? 'happy' : 'unhappy'
    const skeleton = buildFakeDraft({
      serviceLabel: label,
      detailId,
      detailOther,
      score: score ?? 5,
      personName,
      resultId,
      attentionId,
      comfortId,
      personId,
      personTraitIds,
      materialsId,
      againId,
      extraNote: path === 'happy' ? nextHelp : '',
    })

    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/feedback-review/submit', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(buildPayload(path)),
        })
        const data = (await res.json().catch(() => ({}))) as {
          draft?: string
          error?: string
        }
        if (cancelled) return
        if (path === 'happy') {
          setDraft(
            typeof data.draft === 'string' && data.draft.trim()
              ? data.draft.trim()
              : skeleton,
          )
          if (!res.ok) setSubmitError(data.error || 'Could not polish the draft')
          go('draft')
        }
      } catch {
        if (cancelled) return
        if (path === 'happy') {
          setDraft(skeleton)
          setSubmitError('Could not reach the server. Showing a local draft.')
          go('draft')
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [step])

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  function openGoogle() {
    if (isSample) return
    window.open(SYSBILT_GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer')
  }

  async function copyAndOpenGoogle() {
    await copyDraft()
    openGoogle()
  }

  const serviceReady =
    serviceId != null && (serviceId !== 'other' || otherService.trim().length > 1)
  const personReady = personName.trim().length > 1
  const serviceDetails = detailsForService(serviceId)

  function afterService() {
    setDetailId(null)
    setDetailOther('')
    if (detailsForService(serviceId).length > 0) go('serviceDetail')
    else go('result')
  }

  function toggleTrait(id: string) {
    setPersonTraitIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 3) return prev
      return [...prev, id]
    })
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream font-sans text-dark selection:bg-dark selection:text-cream">
      {burst ? (
        <PositiveBurst intensity={burst.intensity} origin={burst.origin} />
      ) : null}
      <style>{`
        @keyframes fb-burst {
          0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--fb-dx)), calc(-50% + var(--fb-dy))) scale(0.2); opacity: 0; }
        }
        @keyframes fb-ring-big {
          0% { transform: scale(0.4); opacity: 0.7; }
          100% { transform: scale(7); opacity: 0; }
        }
        @keyframes fb-ring-small {
          0% { transform: scale(0.4); opacity: 0.65; }
          100% { transform: scale(4.5); opacity: 0; }
        }
        @keyframes fb-icon-pop {
          0% { transform: scale(1); }
          35% { transform: scale(1.22); }
          100% { transform: scale(1); }
        }
      `}</style>
      <PageMeta
        title={isSample ? 'Sample | Feedback Review' : 'A quick note | SYSBILT'}
        description={
          isSample
            ? 'A sample of the Feedback Review customer questions. Nothing is saved.'
            : 'Share how we did on your recent job. Feedback first. Google review only if you want.'
        }
        canonical={
          isSample
            ? `${SITE_ORIGIN}/r/sysbilt?sample=1`
            : `${SITE_ORIGIN}/r/sysbilt`
        }
        robots="noindex, nofollow"
      />

      {step === 'intro' ? (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(90% 70% at 50% 18%, rgba(226,30,63,0.09), transparent 58%), radial-gradient(70% 55% at 82% 72%, rgba(168,132,63,0.14), transparent 55%), radial-gradient(55% 45% at 12% 78%, rgba(26,26,26,0.04), transparent 50%)',
            }}
          />
        </div>
      ) : null}

      <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-5 md:px-8">
        {isSample ? (
          <p className="mb-6 rounded-2xl border border-dark/10 bg-white/80 px-4 py-3 text-center font-sans text-sm leading-relaxed text-dark/70">
            This is a sample of the customer flow. Nothing is saved. Your install uses
            your Google page and your jobs.{' '}
            <Link
              to="/go/feedback-review"
              className="text-dark underline decoration-dark/25 underline-offset-4 hover:decoration-dark/60"
            >
              Back to Feedback Review
            </Link>
          </p>
        ) : null}
        {step !== 'intro' ? (
          <div className="mb-8">
            <StageJourney
              phaseIndex={phaseIndex}
              canGoBack={canGoBack}
              onBack={goBack}
            />
          </div>
        ) : (
          <div className="mb-6 flex items-center justify-between gap-4">
            <SysbiltLogo className="w-[110px] md:w-[130px]" />
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-dark/40">
              {isSample ? 'Sample · customer flow' : 'Private · feedback'}
            </p>
          </div>
        )}

        {step !== 'intro' ? (
          <p className="mb-2 text-center font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#A8843F]">
            {isSample ? 'Sample · customer questions' : 'SYSBILT · how we did'}
          </p>
        ) : null}

        {step === 'intro' && (
          <section className="mx-auto flex min-h-[min(74vh,44rem)] w-full max-w-4xl flex-col items-center justify-center pb-16 text-center md:min-h-[min(78vh,48rem)]">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#A8843F]">
              {isSample
                ? 'Sample · a few taps'
                : linkFirstName
                  ? `Hi ${linkFirstName} · a few taps`
                  : 'A few taps · honest answers'}
            </p>
            <h1 className="mt-6 w-full font-serif text-[2.35rem] leading-[1.08] tracking-tight text-dark sm:text-5xl md:text-6xl lg:text-[3.75rem]">
              {isSample ? 'How the questions feel' : 'A quick note on how we did'}
            </h1>
            <p className="mx-auto mt-7 max-w-2xl font-sans text-lg leading-relaxed text-dark/70 md:text-xl">
              {isSample
                ? 'Walk the same taps a customer would after a job. If it goes well, you will see a suggested Google review. Nothing is saved, and we will not send you to Google from this sample.'
                : 'Short questions about the job, the person you worked with, and what we can improve. If it went well, we can shape a suggested Google review you can edit, copy, or skip.'}
            </p>
            <div className="mt-12">
              <InkButton onClick={() => go('service')}>
                Start <ArrowRight className="h-4 w-4" />
              </InkButton>
            </div>
          </section>
        )}

        {step === 'service' && (
          <StepChrome
            title="What did we do for you"
            lead="Select a card, then continue."
          >
            <SelectChoiceGrid
              items={serviceOptions.map((s) => ({
                id: s.id,
                title: s.label,
                blurb: s.blurb,
                icon: serviceIcon(s.id),
                unsure: s.id === 'other',
              }))}
              selectedId={serviceId}
              revealAll={revealAll}
              onSelect={(id) => setServiceId(id)}
              onContinue={afterService}
              onShowAll={() => setRevealAll(true)}
              continueDisabled={!serviceReady}
              followUp={
                serviceId === 'other' ? (
                  <>
                    <label className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-dark/45">
                      What was it
                    </label>
                    <input
                      type="text"
                      value={otherService}
                      onChange={(e) => setOtherService(e.target.value)}
                      placeholder={
                        catalog === 'products'
                          ? 'e.g. Missed-Call Text-Back'
                          : 'e.g. a mix of CRM and automation'
                      }
                      className="mt-2 w-full rounded-xl border border-dark/15 bg-white px-4 py-3.5 font-sans text-base text-dark outline-none transition focus:border-[#E21E3F]"
                    />
                  </>
                ) : undefined
              }
            />
          </StepChrome>
        )}

        {step === 'serviceDetail' && (
          <StepChrome
            centre
            title="What part of that work"
            lead="Pick the closest match so the review stays specific."
          >
            <CompactChoiceWithNote
              items={serviceDetails.map((o) => ({
                id: o.id,
                title: o.label,
                blurb: o.blurb,
                icon: detailIcon(o.id),
              }))}
              selectedId={detailId}
              onSelect={setDetailId}
              note={detailOther}
              onNoteChange={setDetailOther}
              noteLabel="What was it"
              notePlaceholder="Write it in plain words."
              onAdvance={() => go('result')}
              instantIds={serviceDetailInstantIds(serviceId)}
            />
          </StepChrome>
        )}

        {step === 'result' && (
          <StepChrome
            centre
            title="How did the finished work land"
            lead="Pick the closest match."
          >
            <CompactChoiceWithNote
              items={RESULT_OPTIONS.map((o) => ({
                id: o.id,
                title: o.label,
                blurb: o.blurb,
                icon: resultIcon(o.id),
              }))}
              selectedId={resultId}
              onSelect={setResultId}
              note={resultNote}
              onNoteChange={setResultNote}
              noteLabel="What went wrong with the result"
              notePlaceholder="What should we fix."
              onAdvance={() => go('attention')}
              instantIds={RESULT_INSTANT_IDS}
              celebrateFor={(id) =>
                id === 'nailed' ? 'big' : id === 'solid' ? 'small' : null
              }
              onCelebrate={fire}
            />
          </StepChrome>
        )}

        {step === 'attention' && (
          <StepChrome
            centre
            title="How was our attention"
            lead="Updates, replies, whether you had to chase."
          >
            <CompactChoiceWithNote
              items={ATTENTION_OPTIONS.map((o) => ({
                id: o.id,
                title: o.label,
                blurb: o.blurb,
                icon: attentionIcon(o.id),
              }))}
              selectedId={attentionId}
              onSelect={setAttentionId}
              note={attentionNote}
              onNoteChange={setAttentionNote}
              noteLabel="How can we improve our attention"
              notePlaceholder="What should we fix."
              onAdvance={() => go('comfort')}
              instantIds={ATTENTION_INSTANT_IDS}
              celebrateFor={(id) =>
                id === 'tight' ? 'big' : id === 'fine' ? 'small' : null
              }
              onCelebrate={fire}
            />
          </StepChrome>
        )}

        {step === 'comfort' && (
          <StepChrome
            centre
            title="Did you feel looked after"
            lead="Straight gut feel while the job was on."
          >
            <CompactChoiceWithNote
              items={COMFORT_OPTIONS.map((o) => ({
                id: o.id,
                title: o.label,
                blurb: o.blurb,
                icon: comfortIcon(o.id),
              }))}
              selectedId={comfortId}
              onSelect={setComfortId}
              note={comfortNote}
              onNoteChange={setComfortNote}
              noteLabel="How can we improve how we look after you"
              notePlaceholder="What should we fix."
              onAdvance={() => go('personName')}
              instantIds={COMFORT_INSTANT_IDS}
              celebrateFor={(id) =>
                id === 'yes' ? 'big' : id === 'mostly' ? 'small' : null
              }
              onCelebrate={fire}
            />
          </StepChrome>
        )}

        {step === 'personName' && (
          <StepChrome
            centre
            title="Who did you work with"
            lead="The person you dealt with most. First name is enough."
          >
            <div className="mx-auto w-full max-w-md text-left">
              <label className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-dark/45">
                <User className="h-3.5 w-3.5" strokeWidth={2} />
                Their name
              </label>
              <input
                type="text"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="e.g. Felipe"
                autoComplete="name"
                className="mt-2 w-full rounded-xl border border-dark/15 bg-white px-4 py-3.5 font-sans text-base text-dark outline-none transition focus:border-[#E21E3F]"
              />
            </div>
            <div className="mt-10 flex justify-center">
              <InkButton disabled={!personReady} onClick={() => go('personFeel')}>
                Continue <ArrowRight className="h-4 w-4" />
              </InkButton>
            </div>
          </StepChrome>
        )}

        {step === 'personFeel' && (
          <StepChrome
            centre
            title={`How did ${personName.trim() || 'they'} do`}
            lead="This is about the person, not the company as a whole."
          >
            <CompactChoiceWithNote
              items={PERSON_OPTIONS.map((o) => ({
                id: o.id,
                title: o.label,
                blurb: o.blurb,
                icon: personFeelIcon(o.id),
              }))}
              selectedId={personId}
              onSelect={setPersonId}
              note={personNote}
              onNoteChange={setPersonNote}
              noteLabel="How can we improve on this"
              notePlaceholder="What should we fix."
              onAdvance={() => {
                if (personId === 'excellent' || personId === 'good') {
                  setPersonTraitIds([])
                  go('personTraits')
                } else {
                  go('materials')
                }
              }}
              instantIds={PERSON_INSTANT_IDS}
              celebrateFor={(id) =>
                id === 'excellent' ? 'big' : id === 'good' ? 'small' : null
              }
              onCelebrate={fire}
            />
          </StepChrome>
        )}

        {step === 'personTraits' && (
          <StepChrome
            centre
            title={`What stood out about ${personName.trim() || 'them'}`}
            lead="Pick up to three. This keeps the review specific, not generic."
          >
            <MultiPickGrid
              items={PERSON_TRAIT_OPTIONS.map((o) => ({
                id: o.id,
                title: o.label,
                blurb: o.blurb,
                icon: traitIcon(o.id),
              }))}
              selectedIds={personTraitIds}
              onToggle={toggleTrait}
              onContinue={() => go('materials')}
              onSkip={() => go('materials')}
              max={3}
            />
          </StepChrome>
        )}

        {step === 'materials' && (
          <StepChrome
            centre
            title="Were the materials clear"
            lead="Briefs, links, files, instructions."
          >
            <CompactChoiceWithNote
              items={MATERIALS_OPTIONS.map((o) => ({
                id: o.id,
                title: o.label,
                blurb: o.blurb,
                icon: materialsIcon(o.id),
              }))}
              selectedId={materialsId}
              onSelect={setMaterialsId}
              note={materialsNote}
              onNoteChange={setMaterialsNote}
              noteLabel="How can we make the materials clearer"
              notePlaceholder="What was confusing."
              onAdvance={() => go('improveBetter')}
              instantIds={MATERIALS_INSTANT_IDS}
              celebrateFor={(id) =>
                id === 'crystal' ? 'big' : id === 'mostly' ? 'small' : null
              }
              onCelebrate={fire}
            />
          </StepChrome>
        )}

        {step === 'improveBetter' && (
          <StepChrome
            centre
            eyebrow="Help us improve"
            title="What could be better"
            lead="Be blunt. This stays with us."
          >
            <CompactChoiceWithNote
              items={IMPROVE_BETTER_OPTIONS.map((o) => ({
                id: o.id,
                title: o.label,
                blurb: o.blurb,
                icon: improveBetterIcon(o.id),
              }))}
              selectedId={improveBetterId}
              onSelect={setImproveBetterId}
              note={improveBetterNote}
              onNoteChange={setImproveBetterNote}
              noteLabel="What was off, in your words"
              notePlaceholder="Be blunt."
              onAdvance={() => go('improveFaster')}
              instantIds={IMPROVE_BETTER_INSTANT_IDS}
              celebrateFor={(id) => (id === 'perfect' ? 'big' : null)}
              onCelebrate={fire}
            />
          </StepChrome>
        )}

        {step === 'improveFaster' && (
          <StepChrome
            centre
            eyebrow="Help us improve"
            title="What could be faster"
            lead="Kickoff, replies, or the last stretch."
          >
            <CompactChoiceWithNote
              items={IMPROVE_FASTER_OPTIONS.map((o) => ({
                id: o.id,
                title: o.label,
                blurb: o.blurb,
                icon: improveFasterIcon(o.id),
              }))}
              selectedId={improveFasterId}
              onSelect={setImproveFasterId}
              note={improveFasterNote}
              onNoteChange={setImproveFasterNote}
              noteLabel="Where did it drag"
              notePlaceholder="Be blunt."
              onAdvance={() => go('again')}
              instantIds={IMPROVE_FASTER_INSTANT_IDS}
              celebrateFor={(id) => (id === 'perfect' ? 'big' : null)}
              onCelebrate={fire}
            />
          </StepChrome>
        )}

        {step === 'again' && (
          <StepChrome
            centre
            title="Would you work with us again"
            lead="Or send someone our way."
          >
            <CompactChoiceGrid
              items={AGAIN_OPTIONS.map((o) => ({
                id: o.id,
                title: o.label,
                blurb: o.blurb,
                icon: againIcon(o.id),
              }))}
              selectedId={againId}
              onPick={(id) => {
                setAgainId(id)
                go('nextHelp')
              }}
              celebrateFor={(id) =>
                id === 'yes' ? 'big' : id === 'likely' ? 'small' : null
              }
              onCelebrate={fire}
            />
          </StepChrome>
        )}

        {step === 'nextHelp' && (
          <section className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
            <h1 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">
              Anything else worth saying
            </h1>
            <p className="mt-3 font-sans text-base text-dark/60">
              What you liked, what stood out, or what would help your business next. Optional.
            </p>
            <textarea
              value={nextHelp}
              onChange={(e) => setNextHelp(e.target.value)}
              rows={5}
              placeholder="Write it in plain words"
              className="mt-8 w-full resize-y rounded-2xl border border-dark/15 bg-white px-4 py-4 text-left font-sans text-base leading-relaxed text-dark outline-none transition focus:border-[#E21E3F]"
            />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <InkButton onClick={() => go('score')}>
                Continue <ArrowRight className="h-4 w-4" />
              </InkButton>
              <GhostButton onClick={() => go('score')}>Skip</GhostButton>
            </div>
          </section>
        )}

        {step === 'score' && (
          <section className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
            <h1 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">
              Overall stars
            </h1>
            <p className="mt-3 font-sans text-base text-dark/60">
              Last step. One to five. Be honest.
            </p>
            <div
              className="mt-10 flex flex-wrap items-center justify-center gap-2 md:gap-3"
              onMouseLeave={() => setHoverStar(null)}
            >
              {[1, 2, 3, 4, 5].map((n) => {
                const lit = (hoverStar ?? score ?? 0) >= n
                return (
                  <button
                    key={n}
                    type="button"
                    onMouseEnter={() => setHoverStar(n)}
                    onClick={() => setScore(n)}
                    className="rounded-full p-1.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21E3F]"
                    aria-label={`${n} star${n === 1 ? '' : 's'}`}
                  >
                    <Star
                      className="h-10 w-10 md:h-12 md:w-12"
                      strokeWidth={1.5}
                      fill={lit ? GOLD : 'transparent'}
                      color={lit ? GOLD : `${INK}44`}
                    />
                  </button>
                )
              })}
            </div>
            {score != null ? (
              <p className="mt-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-dark/50">
                {score} out of 5
              </p>
            ) : null}
            <div className="mt-10">
              <InkButton disabled={score == null} onClick={finishScore}>
                Finish <ArrowRight className="h-4 w-4" />
              </InkButton>
            </div>
          </section>
        )}

        {step === 'loading' && (
          <section className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center text-center">
            <div
              className="mb-8 h-10 w-10 animate-spin rounded-full border-2 border-dark/15 border-t-[#E21E3F]"
              aria-hidden
            />
            <h1 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">
              Thanks. Give us a moment
            </h1>
            <p className="mt-4 font-sans text-base text-dark/60">
              Shaping a short suggested review from your answers. You can edit it next.
            </p>
          </section>
        )}

        {step === 'draft' && (
          <section className="mx-auto max-w-2xl text-center">
            <h1 className="font-serif text-3xl leading-tight tracking-tight md:text-4xl">
              {isSample ? 'This is the suggested review' : 'Thanks for your feedback'}
            </h1>
            <p className="mb-6 mt-3 font-sans text-base text-dark/60">
              {isSample
                ? 'On a live install, they can edit this, copy it, and post it on your Google page. We never post for them. This sample does not open Google.'
                : 'If you are willing, here is a suggested Google review from your answers. Edit it, copy it, or write your own on Google. Your call.'}
            </p>
            {submitError ? (
              <p className="mb-4 font-sans text-sm text-dark/55">{submitError}</p>
            ) : null}
            <label className="block text-left font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-dark/45">
              Suggested review
            </label>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={8}
              className="mt-2 w-full resize-y rounded-2xl border border-dark/15 bg-white px-4 py-4 text-left font-sans text-base leading-relaxed text-dark outline-none transition focus:border-[#E21E3F]"
            />
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              {isSample ? (
                <>
                  <InkButton onClick={() => void copyDraft()}>
                    {copied ? (
                      <>
                        Copied <Check className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Copy the sample <Copy className="h-4 w-4" />
                      </>
                    )}
                  </InkButton>
                  <Link
                    to="/go/feedback-review"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-dark/20 bg-white px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark transition-colors hover:border-dark/40"
                  >
                    See Feedback Review
                  </Link>
                </>
              ) : (
                <>
                  <InkButton onClick={() => void copyAndOpenGoogle()}>
                    {copied ? (
                      <>
                        Copied <Check className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Copy and open Google <Copy className="h-4 w-4" />
                      </>
                    )}
                  </InkButton>
                  <GhostButton onClick={openGoogle}>
                    Write your own on Google <ExternalLink className="h-4 w-4" />
                  </GhostButton>
                </>
              )}
            </div>
            <p className="mt-6 font-sans text-sm leading-relaxed text-dark/50">
              {isSample
                ? 'Nothing from this sample is saved. Weak jobs stay private on a live install.'
                : 'We never post for you. Improve answers stay private. Google opens in a new tab.'}
            </p>
          </section>
        )}

        {step === 'thanks' && (
          <section className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center text-center">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#A8843F]">
              Received
            </p>
            <h1 className="mt-4 font-serif text-3xl leading-tight tracking-tight md:text-4xl">
              Thanks for the feedback
            </h1>
            <p className="mt-5 font-sans text-base leading-relaxed text-dark/65">
              {isSample
                ? 'On a live install, weak jobs stay with you. Nobody is sent to Google from this path. You are done with the sample.'
                : 'We will take your points seriously and use them to improve. No Google ask from this path. You are done.'}
            </p>
            {isSample ? (
              <div className="mt-10">
                <Link
                  to="/go/feedback-review"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E21E3F] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream shadow-[0_12px_28px_-12px_rgba(226,30,63,0.65)] transition hover:bg-[#c41935]"
                >
                  See Feedback Review <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : null}
          </section>
        )}

        <footer className="mt-20 border-t border-dark/10 pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-dark/40">
            {FUNNEL_FOOTER_TEXT}
          </p>
        </footer>
      </div>
    </div>
  )
}
