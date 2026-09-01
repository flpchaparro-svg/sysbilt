import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  Calendar,
  Check,
  Clock,
  Globe,
  HelpCircle,
  ImagePlus,
  Mail,
  MapPin,
  MessageCircle,
  Moon,
  Phone,
  Sun,
  Sunrise,
  Sunset,
  Upload,
  X,
} from 'lucide-react'
import { SysbiltLogo } from '../../components/SysbiltLogo'
import { FUNNEL_COLOURS, FUNNEL_CSS_VARS } from './funnelTheme'
import {
  websiteWizardAcks,
  WEBSITE_WIZARD_STAGES,
  type WizardField,
  type WizardOption,
} from './websiteWizardSpec'
import { isWebsiteTierCode, type WebsiteTierCode } from './websiteAgreementCopy'

const RED = FUNNEL_COLOURS.accent
const INK = FUNNEL_COLOURS.ink
const CREAM = FUNNEL_COLOURS.onInk
/** Brand cream — same as /go/access and FUNNEL_COLOURS.ground (#FFF2EC) */
const GROUND = FUNNEL_COLOURS.ground

type Answers = Record<string, string | string[] | boolean | File[] | null>

function serialiseAnswers(answers: Answers): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(answers)) {
    if (Array.isArray(value) && value[0] instanceof File) {
      out[key] = (value as File[]).map((f) => f.name)
      continue
    }
    out[key] = value
  }
  return out
}

const PHASES = WEBSITE_WIZARD_STAGES.map((s, i) => ({
  id: s.id,
  n: i + 1,
  label: s.label,
}))

function flatFields(): WizardField[] {
  return WEBSITE_WIZARD_STAGES.flatMap((s) => s.fields)
}

function stageIndexForField(fieldId: string): number {
  return WEBSITE_WIZARD_STAGES.findIndex((s) => s.fields.some((f) => f.id === fieldId))
}

const inputClass =
  'w-full max-w-md mx-auto rounded-xl border border-dark/12 bg-white px-4 py-4 font-sans text-lg text-dark placeholder:text-dark/35 shadow-[0_8px_24px_-16px_rgba(26,26,26,0.28)] focus:outline-none focus:ring-2 focus:ring-[#E21E3F]/35 focus:border-[#E21E3F]'

const boxInputClass =
  'w-full rounded-xl border border-dark/12 bg-white px-4 py-3.5 font-sans text-base text-dark placeholder:text-dark/35 shadow-[0_8px_24px_-16px_rgba(26,26,26,0.28)] focus:outline-none focus:ring-2 focus:ring-[#E21E3F]/35 focus:border-[#E21E3F]'

function isValidName(value: string): boolean {
  const t = value.trim()
  if (t.length < 2) return false
  if (!/[A-Za-z]/.test(t)) return false
  if (/^\d+$/.test(t)) return false
  return true
}

function isValidEmail(value: string): boolean {
  const t = value.trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)
}

function isValidWebsite(value: string): boolean {
  const t = value.trim().toLowerCase()
  if (t.length < 4) return false
  return /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i.test(t)
}

function isValidBusiness(value: string): boolean {
  return value.trim().length >= 2
}

function isValidPhone(value: string): boolean {
  const clean = value.replace(/\s+/g, '')
  return /^(0[23478])\d{8}$/.test(clean)
}

function isValidDomain(value: string): boolean {
  const t = value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .split('/')[0]
    .replace(/:\d+$/, '')
  if (t.length < 4) return false
  return /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/.test(t)
}

function isValidAbn(value: string): boolean {
  const digits = value.replace(/\s+/g, '')
  return /^\d{11}$/.test(digits)
}

function asStringList(raw: Answers[string] | undefined, count: number): string[] {
  if (Array.isArray(raw) && !(raw[0] instanceof File)) {
    const list = (raw as string[]).map((x) => (typeof x === 'string' ? x : ''))
    while (list.length < count) list.push('')
    return list.slice(0, count)
  }
  return Array.from({ length: count }, () => '')
}

function fieldIsVisible(field: WizardField, answers: Answers): boolean {
  if (field.id === 'domainName') {
    const situation = answers.domainSituation
    // No domain to confirm when they need a new one or are unsure.
    return situation === 'have_login' || situation === 'have_no_login'
  }
  if (field.id === 'currentUrl' || field.id === 'keepFromOld') {
    const has = answers.hasSite
    // No current site means nothing to paste or keep from.
    return has === 'yes' || has === 'sort_of'
  }
  return true
}

function optionIcon(value: string): ReactNode {
  const map: Record<string, ReactNode> = {
    early_morning: <Sunrise strokeWidth={1.5} />,
    mid_morning: <Sun strokeWidth={1.5} />,
    lunch: <Clock strokeWidth={1.5} />,
    early_arvo: <Sunset strokeWidth={1.5} />,
    late_arvo: <Sunset strokeWidth={1.5} />,
    after_hours: <Moon strokeWidth={1.5} />,
    form_email: <Mail strokeWidth={1.5} />,
    call: <Phone strokeWidth={1.5} />,
    book: <Calendar strokeWidth={1.5} />,
    have_login: <Globe strokeWidth={1.5} />,
    have_no_login: <HelpCircle strokeWidth={1.5} />,
    need_new: <Globe strokeWidth={1.5} />,
    same_as_web: <Building2 strokeWidth={1.5} />,
    google: <Mail strokeWidth={1.5} />,
    microsoft: <Mail strokeWidth={1.5} />,
    other: <MessageCircle strokeWidth={1.5} />,
    yes: <Check strokeWidth={1.5} />,
    no: <X strokeWidth={1.5} />,
    sort_of: <HelpCircle strokeWidth={1.5} />,
  }
  return map[value] ?? <MapPin strokeWidth={1.5} />
}

function isUnsure(value: string) {
  return value === 'unsure' || value === 'not_sure'
}

/** Exact SelectCard from /go/access */
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
      className="group relative flex h-[300px] w-full flex-col items-center overflow-hidden rounded-2xl border border-dark/12 bg-white px-4 pt-8 pb-4 text-center shadow-[0_8px_24px_-18px_rgba(26,26,26,0.28)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#E21E3F] hover:shadow-[0_16px_40px_-20px_rgba(226,30,63,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21E3F] focus-visible:ring-offset-2 data-[selected=true]:border-[#E21E3F] data-[selected=true]:shadow-[0_16px_40px_-20px_rgba(226,30,63,0.35)]"
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
          style={{ backgroundColor: RED }}
        >
          Select
        </span>
      </div>
    </button>
  )
}

function StageJourney({
  phaseIndex,
  canGoBack,
  onBack,
  onHelp,
}: {
  phaseIndex: number
  canGoBack: boolean
  onBack: () => void
  onHelp: () => void
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
      style={{ backgroundColor: INK }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
        style={{ width: fillWidth, backgroundColor: CREAM }}
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-w-0 flex-1 items-center gap-0 pl-1.5 pr-2 md:pl-2 md:pr-3">
        <div className="flex shrink-0 items-center gap-2 md:gap-2.5">
          {canGoBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-solid border-dark text-dark transition-colors duration-200 hover:bg-dark/10 active:bg-dark/15 md:h-[42px] md:w-[42px]"
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

          <Link to="/go/website" className="shrink-0" aria-label="SYSBILT Hosted Website Plan">
            <SysbiltLogo className="w-[92px] md:w-[108px]" />
          </Link>
        </div>

        <nav
          className="flex min-w-0 flex-1 items-center gap-0 overflow-x-auto"
          aria-label="Progress"
        >
          {PHASES.map((p, i) => {
            const done = i < phaseIndex
            const current = i === phaseIndex
            const filled = i <= phaseIndex
            return (
              <div
                key={p.id}
                ref={current ? endRef : undefined}
                className="shrink-0 whitespace-nowrap px-2.5 font-sans text-[12px] tracking-wide md:px-3.5 md:text-[13px]"
                style={{
                  color: filled ? INK : 'rgba(255,242,236,0.4)',
                  fontWeight: current || done ? 600 : 400,
                }}
              >
                {p.n}. {p.label}
              </div>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={onHelp}
          className="ml-2 inline-flex shrink-0 items-center gap-2 font-sans text-[13px] text-cream/55 transition-colors hover:text-cream"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-cream/40 text-cream/70 transition-colors hover:border-cream/80 hover:bg-white/10 hover:text-cream md:h-[42px] md:w-[42px]">
            <span className="text-[15px] font-medium leading-none">?</span>
          </span>
          <span className="hidden sm:inline">Help</span>
        </button>
      </div>
    </div>
  )
}

function QuestionTitle({
  title,
  accentWord,
}: {
  title: string
  accentWord?: string
}) {
  let body: ReactNode = title
  if (accentWord && title.includes(accentWord)) {
    const i = title.indexOf(accentWord)
    body = (
      <>
        {title.slice(0, i)}
        <span style={{ color: RED }}>{accentWord}</span>
        {title.slice(i + accentWord.length)}
      </>
    )
  }
  return (
    <h1 className="font-serif text-3xl md:text-[2.4rem] tracking-tight text-dark mb-3 leading-[1.15] text-center md:text-left">
      {body}
    </h1>
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
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center gap-2 font-mono font-bold uppercase tracking-[0.16em] text-xs px-10 py-4 text-white disabled:opacity-80 transition-opacity"
      style={{ backgroundColor: INK }}
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
      className="inline-flex items-center gap-2 rounded-full border border-dark/15 bg-white px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-dark/70 transition-colors hover:border-dark/30 hover:text-dark"
    >
      {children}
    </button>
  )
}

function selectGridClass(count: number) {
  if (count <= 2) return 'grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-2xl'
  if (count === 3) return 'grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4'
  if (count === 4) return 'grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4'
  if (count === 5) return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4'
  return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4'
}

function WebsiteWizardPage() {
  const [params] = useSearchParams()
  const fields = useMemo(() => flatFields(), [])
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [helpOpen, setHelpOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [tier, setTier] = useState<WebsiteTierCode | null>(() => {
    const fromUrl = params.get('tier')
    return isWebsiteTierCode(fromUrl) ? fromUrl : null
  })
  const fileRef = useRef<HTMLInputElement>(null)
  const prefilledRef = useRef(false)

  const field = fields[step]
  const stageIdx = stageIndexForField(field.id)
  const progress = ((step + 1) / fields.length) * 100
  const wizardAcks = useMemo(
    () => websiteWizardAcks(tier ?? 'brochure'),
    [tier],
  )

  const setAnswer = useCallback((id: string, value: Answers[string]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }, [])

  useEffect(() => {
    if (prefilledRef.current) return
    prefilledRef.current = true
    let fromAgreement: {
      tier?: string
      name?: string
      email?: string
      business?: string
    } | null = null
    try {
      const raw = sessionStorage.getItem('sysbilt_website_agreement')
      if (raw) fromAgreement = JSON.parse(raw) as typeof fromAgreement
    } catch {
      /* ignore */
    }
    const nextTier = isWebsiteTierCode(fromAgreement?.tier)
      ? fromAgreement!.tier
      : isWebsiteTierCode(params.get('tier'))
        ? (params.get('tier') as WebsiteTierCode)
        : null
    if (nextTier) setTier(nextTier)
    setAnswers((prev) => ({
      ...prev,
      ...(fromAgreement?.name && !prev.contactName
        ? { contactName: fromAgreement.name }
        : {}),
      ...(fromAgreement?.email && !prev.contactEmail
        ? { contactEmail: fromAgreement.email }
        : {}),
      ...(fromAgreement?.business && !prev.businessName
        ? { businessName: fromAgreement.business }
        : {}),
    }))
  }, [params])

  async function submitToHubSpot() {
    if (submitting || submitted) return
    const name = String(answers.contactName || '').trim()
    const email = String(answers.contactEmail || '').trim()
    const business = String(answers.businessName || '').trim()
    const phone = String(answers.contactPhone || '').trim()
    if (!tier) {
      setSubmitError('Missing plan tier. Open this page after you pay, with your plan in the link.')
      return
    }
    if (name.length < 2 || !email.includes('@') || business.length < 2) {
      setSubmitError('Name, email and business are required before we can save.')
      return
    }
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch('/api/funnel/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: 'website',
          tier,
          name,
          email,
          business,
          phone,
          answers: serialiseAnswers(answers),
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        throw new Error(data.error || 'Could not save. Try again or email hello@sysbilt.com.')
      }
      setSubmitted(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Could not save. Try again or email hello@sysbilt.com.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  const findNextVisible = useCallback(
    (from: number, dir: 1 | -1) => {
      let i = from + dir
      while (i >= 0 && i < fields.length) {
        if (fieldIsVisible(fields[i], answers)) return i
        i += dir
      }
      return from
    },
    [answers, fields],
  )

  const go = useCallback(
    (next: number) => {
      setStep(Math.max(0, Math.min(fields.length - 1, next)))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [fields.length],
  )

  const advance = useCallback(() => go(findNextVisible(step, 1)), [findNextVisible, go, step])
  const goBack = useCallback(() => go(findNextVisible(step, -1)), [findNextVisible, go, step])

  useEffect(() => {
    document.title = 'Hosted Website Plan · Intake | SYSBILT'
  }, [])

  // Prefill domain confirm from earlier answer once.
  useEffect(() => {
    if (field.id !== 'domainName') return
    const current = answers.domainName
    if (typeof current === 'string' && current.trim()) return
    const from = answers.preferredDomain
    if (typeof from === 'string' && from.trim()) {
      setAnswer('domainName', from.trim())
    }
  }, [answers.domainName, answers.preferredDomain, field.id, setAnswer])

  // If we land on a hidden step, skip past it.
  useEffect(() => {
    if (fieldIsVisible(field, answers)) return
    const next = findNextVisible(step, 1)
    if (next !== step) {
      go(next)
      return
    }
    const prev = findNextVisible(step, -1)
    if (prev !== step) go(prev)
  }, [answers, field, findNextVisible, go, step])

  const raw = answers[field.id]
  const str = typeof raw === 'string' ? raw : ''
  const files = Array.isArray(raw) && raw[0] instanceof File ? (raw as File[]) : []
  const boxCount = field.boxCount ?? 0
  const boxes = field.type === 'boxes' ? asStringList(raw, boxCount) : []

  const twinName =
    typeof answers.coContactName === 'string' ? answers.coContactName : ''
  const twinEmail =
    typeof answers.coContactEmail === 'string' ? answers.coContactEmail : ''
  const twinEmpty = !twinName.trim() && !twinEmail.trim()
  const twinOk =
    twinEmpty || (isValidName(twinName) && isValidEmail(twinEmail))

  const acksOk =
    field.type === 'acks' && wizardAcks.every((a) => answers[a.id] === true)

  const boxesFilled = boxes.map((b) => b.trim()).filter(Boolean)
  const boxesUrlsOk =
    !field.boxAsUrl || boxesFilled.every((b) => isValidWebsite(b))
  const boxesOk = (() => {
    if (field.type !== 'boxes') return false
    const min = field.minBoxes ?? (field.required ? 1 : 0)
    if (boxesFilled.length < min) return false
    return boxesUrlsOk
  })()

  const valueOk = (() => {
    switch (field.id) {
      case 'contactName':
        return isValidName(str)
      case 'contactEmail':
        return isValidEmail(str)
      case 'contactPhone':
        return isValidPhone(str)
      case 'businessName':
        return isValidBusiness(str)
      case 'preferredDomain':
      case 'domainName':
        return isValidDomain(str)
      case 'abn':
        return !str.trim() || isValidAbn(str)
      case 'currentUrl':
        return !str.trim() || isValidWebsite(str)
      default:
        if (field.type === 'email') return isValidEmail(str)
        if (field.type === 'tel') return isValidPhone(str)
        if (field.type === 'url') return isValidWebsite(str)
        if (field.type === 'text' || field.type === 'textarea') return str.trim().length > 0
        return Boolean(str.trim())
    }
  })()

  const canContinue = (() => {
    if (field.type === 'intro' || field.type === 'done') return true
    if (field.type === 'acks') return acksOk
    if (field.twin) return twinOk && !twinEmpty
    if (field.type === 'upload') return files.length > 0
    if (field.type === 'select') return Boolean(str)
    if (field.type === 'boxes') return boxesOk
    if (field.id === 'abn' || field.id === 'preferredDomain' || field.id === 'currentUrl') {
      // optional: empty is skip; filled must validate
      if (!str.trim()) return false
      return valueOk
    }
    return valueOk
  })()

  const isOptional =
    !field.required && field.type !== 'intro' && field.type !== 'done' && field.type !== 'acks'

  function onSelectOption(opt: WizardOption) {
    setAnswer(field.id, opt.value)
    window.setTimeout(() => advance(), 200)
  }

  function nextLabel() {
    if (isOptional && !canContinue) return field.skipLabel ?? 'Skip for now'
    return 'Continue'
  }

  function setBoxAt(index: number, value: string) {
    const next = asStringList(answers[field.id], boxCount)
    next[index] = value
    setAnswer(field.id, next)
  }

  function renderBody() {
    switch (field.type) {
      case 'intro':
        return (
          <div className="mt-8 max-w-xl">
            <button
              type="button"
              onClick={advance}
              className="rounded-full bg-[#E21E3F] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream shadow-[0_12px_28px_-12px_rgba(226,30,63,0.65)] transition hover:bg-[#c41935]"
            >
              Let&apos;s go <ArrowRight className="ml-1 inline h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        )

      case 'done':
        return (
          <div className="mt-10 space-y-5">
            {submitted ? (
              <>
                <p className="inline-flex items-center gap-2 rounded-full bg-[#E21E3F]/10 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#E21E3F]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> Briefing saved
                </p>
                <p className="font-sans text-base text-dark/70 max-w-md">
                  We have your answers in HubSpot. We research next and book the twenty minute
                  interview within one business day.
                </p>
                <Link
                  to="/go/website"
                  className="inline-flex items-center gap-2 rounded-full bg-[#E21E3F] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream"
                >
                  Done
                </Link>
              </>
            ) : (
              <>
                <p className="font-sans text-base text-dark/70 max-w-md">
                  Last step. Send your briefing so we can research and book the interview.
                </p>
                {submitError ? (
                  <p className="font-sans text-sm text-[#E21E3F]">{submitError}</p>
                ) : null}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    type="button"
                    onClick={() => void submitToHubSpot()}
                    disabled={submitting}
                    className="rounded-full bg-[#E21E3F] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream shadow-[0_12px_28px_-12px_rgba(226,30,63,0.65)] transition hover:bg-[#c41935] disabled:opacity-50"
                  >
                    {submitting ? 'Saving…' : 'Submit briefing'}
                  </button>
                  <GhostButton onClick={() => go(0)}>Review answers</GhostButton>
                </div>
              </>
            )}
          </div>
        )

      case 'select': {
        const opts = field.options ?? []
        return (
          <div className={`${selectGridClass(opts.length)} pt-4`}>
            {opts.map((opt) => (
              <SelectCard
                key={opt.value}
                selected={str === opt.value}
                onSelect={() => onSelectOption(opt)}
                title={opt.label}
                blurb={opt.hint ?? ''}
                icon={optionIcon(opt.value)}
                unsure={isUnsure(opt.value)}
              />
            ))}
          </div>
        )
      }

      case 'boxes': {
        const min = field.minBoxes ?? (field.required ? 1 : 0)
        const emptyOptional = isOptional && boxesFilled.length === 0
        const block = field.required ? !boxesOk : boxesFilled.length > 0 && !boxesOk
        return (
          <div className="mt-6 max-w-xl mx-auto md:mx-0 space-y-3">
            {boxes.map((value, i) => (
              <div key={`${field.id}-${i}`} className="flex items-center gap-3">
                <span className="w-6 shrink-0 font-mono text-[11px] font-bold text-dark/35 tabular-nums">
                  {i + 1}
                </span>
                <input
                  className={boxInputClass}
                  type={field.boxAsUrl ? 'url' : 'text'}
                  value={value}
                  onChange={(e) => setBoxAt(i, e.target.value)}
                  placeholder={
                    field.boxAsUrl
                      ? i === 0
                        ? 'Strongest profile URL'
                        : `Optional link ${i + 1}`
                      : `${field.placeholder ?? 'Offer'} ${i + 1}`
                  }
                />
              </div>
            ))}
            {field.boxAsUrl && boxesFilled.length > 0 && !boxesUrlsOk ? (
              <p className="font-sans text-sm text-[#E21E3F]/90">
                Use a full link with a real domain, like https://instagram.com/you
              </p>
            ) : null}
            {field.required && boxesFilled.length < min ? (
              <p className="font-sans text-sm text-dark/45">At least {min} filled to continue.</p>
            ) : null}
            <div className="pt-5 flex flex-wrap justify-center md:justify-start gap-3">
              <InkButton
                disabled={block}
                onClick={() => {
                  if (emptyOptional) setAnswer(field.id, [])
                  advance()
                }}
              >
                {emptyOptional ? field.skipLabel ?? 'Skip for now' : 'Continue'}{' '}
                <ArrowRight className="w-4 h-4" />
              </InkButton>
              {field.interviewEscape ? (
                <GhostButton
                  onClick={() => {
                    setAnswer(field.id, 'interview')
                    advance()
                  }}
                >
                  Say it in the interview
                </GhostButton>
              ) : null}
            </div>
          </div>
        )
      }

      case 'acks':
        return (
          <div className="mt-6 space-y-3 max-w-2xl">
            {wizardAcks.map((ack) => {
              const on = answers[ack.id] === true
              return (
                <button
                  key={ack.id}
                  type="button"
                  onClick={() => setAnswer(ack.id, !on)}
                  className="flex w-full items-start gap-4 rounded-2xl border border-dark/12 bg-white px-5 py-4 text-left shadow-[0_8px_24px_-18px_rgba(26,26,26,0.28)] transition-[border-color] hover:border-[#E21E3F]"
                  style={{
                    borderColor: on ? RED : undefined,
                    backgroundColor: on ? 'rgba(226,30,63,0.04)' : undefined,
                  }}
                >
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2"
                    style={{
                      borderColor: on ? RED : 'rgba(26,26,26,0.2)',
                      backgroundColor: on ? RED : 'transparent',
                    }}
                  >
                    {on ? <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} /> : null}
                  </span>
                  <span className="font-sans text-[15px] text-dark leading-snug">{ack.label}</span>
                </button>
              )
            })}
            <div className="pt-6 flex justify-center md:justify-start">
              <InkButton onClick={advance} disabled={!acksOk}>
                Submit intake <ArrowRight className="w-4 h-4" />
              </InkButton>
            </div>
          </div>
        )

      case 'upload':
        return (
          <div className="mt-8 max-w-lg mx-auto md:mx-0 space-y-5">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-dark/20 bg-white px-6 py-14 text-center transition-colors hover:border-[#E21E3F]/50 shadow-[0_8px_24px_-18px_rgba(26,26,26,0.28)]"
            >
              {field.id === 'photos' ? (
                <ImagePlus className="h-8 w-8 text-dark/35" strokeWidth={1.5} />
              ) : (
                <Upload className="h-8 w-8 text-dark/35" strokeWidth={1.5} />
              )}
              <span className="font-sans text-[15px] font-semibold text-dark">
                {files.length
                  ? `${files.length} file${files.length > 1 ? 's' : ''} ready`
                  : 'Choose files'}
              </span>
              {field.multiLabel ? (
                <span className="font-sans text-[13px] text-dark/45">{field.multiLabel}</span>
              ) : null}
            </button>
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              accept={field.accept}
              multiple={Boolean(field.multiLabel)}
              onChange={(e) => {
                const list = e.target.files ? Array.from(e.target.files) : []
                setAnswer(field.id, list)
              }}
            />
            {files.length > 0 ? (
              <ul className="space-y-2">
                {files.map((f) => (
                  <li
                    key={f.name + f.size}
                    className="flex items-center justify-between rounded-xl border border-dark/10 bg-white px-4 py-3 font-sans text-sm text-dark"
                  >
                    <span className="truncate pr-3">{f.name}</span>
                    <button
                      type="button"
                      className="text-dark/40 hover:text-dark"
                      onClick={() =>
                        setAnswer(
                          field.id,
                          files.filter((x) => x !== f),
                        )
                      }
                      aria-label={`Remove ${f.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <InkButton onClick={advance} disabled={!canContinue}>
                Continue <ArrowRight className="w-4 h-4" />
              </InkButton>
              <GhostButton
                onClick={() => {
                  setAnswer(field.id, [])
                  advance()
                }}
              >
                {field.skipLabel ?? 'Skip for now'}
              </GhostButton>
            </div>
          </div>
        )

      default: {
        if (field.twin) {
          const primarySkip = twinEmpty
          const blockTwin = !primarySkip && !twinOk
          return (
            <div className="max-w-lg mx-auto md:mx-0 py-2 space-y-4">
              {field.twin.map((t) => (
                <div key={t.id}>
                  <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark/45 text-center md:text-left">
                    {t.label}
                  </label>
                  <input
                    type={t.type}
                    value={typeof answers[t.id] === 'string' ? (answers[t.id] as string) : ''}
                    onChange={(e) => setAnswer(t.id, e.target.value)}
                    placeholder={t.placeholder}
                    className={inputClass}
                    autoComplete={t.type === 'email' ? 'email' : 'name'}
                  />
                </div>
              ))}
              {!twinEmpty && !twinOk ? (
                <p className="font-sans text-sm text-[#E21E3F]/90 text-center md:text-left">
                  Need a real name and an email with @ and a domain.
                </p>
              ) : null}
              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
                <InkButton
                  disabled={blockTwin}
                  onClick={() => {
                    if (primarySkip) {
                      field.twin?.forEach((t) => setAnswer(t.id, ''))
                      setAnswer(field.id, 'skipped')
                    }
                    advance()
                  }}
                >
                  {primarySkip ? field.skipLabel ?? 'Just me' : 'Continue'}{' '}
                  <ArrowRight className="w-4 h-4" />
                </InkButton>
              </div>
            </div>
          )
        }

        const inputType =
          field.type === 'email' || field.type === 'tel' || field.type === 'url'
            ? field.type
            : 'text'
        const blockNext = field.required ? !canContinue : Boolean(str.trim()) && !valueOk

        const invalidHint = (() => {
          if (!str.trim()) return null
          if (field.id === 'contactName' && !isValidName(str)) {
            return 'Use a real name with letters, not only numbers or punctuation.'
          }
          if (field.id === 'contactEmail' && !isValidEmail(str)) {
            return 'Use an email with @ and a domain, like you@business.com.au.'
          }
          if (field.id === 'contactPhone' && !isValidPhone(str)) {
            return 'Use an Australian mobile or landline, digits only (e.g. 04xx xxx xxx).'
          }
          if (
            (field.id === 'preferredDomain' || field.id === 'domainName') &&
            !isValidDomain(str)
          ) {
            return 'Use a domain like yourbusiness.com.au.'
          }
          if (field.id === 'abn' && !isValidAbn(str)) {
            return 'ABN should be 11 digits.'
          }
          if (
            (field.id === 'currentUrl' || field.type === 'url') &&
            !isValidWebsite(str)
          ) {
            return 'Use a full web address, like https://yourbusiness.com.au.'
          }
          return null
        })()

        return (
          <div className="max-w-lg mx-auto text-center py-2 md:text-left md:mx-0">
            {field.type === 'textarea' ? (
              <textarea
                className={`${inputClass} min-h-[140px] resize-y text-base`}
                value={str}
                onChange={(e) => setAnswer(field.id, e.target.value)}
                placeholder={field.placeholder}
                rows={field.rows ?? 4}
              />
            ) : (
              <input
                className={inputClass}
                type={inputType}
                value={str}
                onChange={(e) => setAnswer(field.id, e.target.value)}
                placeholder={field.placeholder}
                inputMode={field.type === 'tel' ? 'tel' : field.type === 'email' ? 'email' : undefined}
                autoComplete={
                  field.type === 'email'
                    ? 'email'
                    : field.type === 'tel'
                      ? 'tel'
                      : field.id.toLowerCase().includes('name')
                        ? 'name'
                        : undefined
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !blockNext) {
                    e.preventDefault()
                    if (isOptional && !canContinue) {
                      setAnswer(field.id, '')
                    }
                    advance()
                  }
                }}
              />
            )}
            {invalidHint ? (
              <p className="mt-3 font-sans text-sm text-[#E21E3F]/90">{invalidHint}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
              <InkButton
                disabled={blockNext}
                onClick={() => {
                  if (isOptional && !canContinue) setAnswer(field.id, '')
                  advance()
                }}
              >
                {nextLabel()} <ArrowRight className="w-4 h-4" />
              </InkButton>
              {field.interviewEscape ? (
                <GhostButton
                  onClick={() => {
                    setAnswer(field.id, 'interview')
                    advance()
                  }}
                >
                  Say it in the interview
                </GhostButton>
              ) : null}
            </div>
          </div>
        )
      }
    }
  }

  return (
    <div
      className="min-h-screen font-sans selection:bg-dark selection:text-cream"
      style={{ ...FUNNEL_CSS_VARS, backgroundColor: GROUND, color: INK }}
    >
      <div className="fixed top-0 inset-x-0 z-[60] h-1 bg-black/10">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%`, backgroundColor: RED }}
        />
      </div>

      <header
        className="sticky top-0 z-40 pt-[10px] pb-2 md:pt-3 md:pb-3"
        style={{ backgroundColor: GROUND }}
      >
        <div className="mx-auto max-w-5xl px-3 md:px-6">
          <StageJourney
            phaseIndex={stageIdx}
            canGoBack={step > 0 && field.type !== 'done'}
            onBack={goBack}
            onHelp={() => setHelpOpen(true)}
          />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-dark/[0.06] bg-white p-6 md:p-12 min-h-[460px] shadow-[0_24px_60px_-36px_rgba(26,26,26,0.35)]"
          >
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/40 mb-4 text-center md:text-left">
              Hosted Website Plan · Intake preview
            </p>

            <QuestionTitle title={field.title} accentWord={field.accentWord} />
            {field.hint ? (
              <p className="font-sans text-dark/55 mb-6 leading-relaxed whitespace-pre-line text-center md:text-left">
                {field.hint}
              </p>
            ) : (
              <div className="mb-4" />
            )}

            {renderBody()}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {helpOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close help"
              className="fixed inset-0 z-[70] bg-dark/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHelpOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed right-0 top-0 bottom-0 z-[80] flex w-[min(100%,400px)] flex-col border-l border-dark/10 bg-white shadow-2xl"
            >
              <div
                className="flex items-center justify-between border-b border-white/10 px-5 py-4"
                style={{ backgroundColor: INK }}
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Help
                  </p>
                  <p className="mt-0.5 font-sans text-sm text-cream">Website intake</p>
                </div>
                <button
                  type="button"
                  onClick={() => setHelpOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-5 font-sans text-[15px] leading-relaxed text-dark/75 space-y-4">
                <p>
                  Same rhythm as our access form. One question at a time. Four stages. Optional
                  questions let you skip or say it in the interview.
                </p>
                <p>
                  Technical bits always have a not sure path. We sort domain and email before any DNS
                  move so your inbox stays up.
                </p>
                <a
                  href="mailto:hello@sysbilt.com"
                  className="inline-flex items-center gap-2 font-semibold text-[#E21E3F]"
                >
                  <MessageCircle className="h-4 w-4" /> hello@sysbilt.com
                </a>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default WebsiteWizardPage
