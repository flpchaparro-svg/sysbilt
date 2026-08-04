import React, {useMemo, useState, type ReactNode} from 'react'
import {Link, useSearchParams} from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Fence,
  Flower2,
  HelpCircle,
  Layers,
  Mountain,
  Shrub,
  Sprout,
  Trees,
} from 'lucide-react'
import {SysbiltLogo} from '../../../components/SysbiltLogo'
import {PageMeta} from '../../../components/PageMeta'
import {SITE_ORIGIN} from '../../../constants/seoMeta'
import {
  ACCESS_OPTIONS,
  buildQuote,
  JOBS,
  SAMPLE_DISCLAIMER,
  SITE_CONDITIONS,
  SITUATIONS,
  SIZE_PRESETS,
  type AccessId,
  type BuiltQuote,
  type JobId,
  type SiteConditionId,
  type SituationId,
  type SizePresetId,
} from './rateCard'

const RED = '#E21E3F'
const INK = '#1A1A1A'
const CREAM = '#FFF2EC'

type Step =
  | 'intro'
  | 'situation'
  | 'job'
  | 'size'
  | 'access'
  | 'site'
  | 'details'
  | 'quote'
  | 'soft-no'
  | 'buy'

const STEP_PHASE: Record<Step, number> = {
  intro: 0,
  situation: 1,
  job: 1,
  size: 2,
  access: 2,
  site: 2,
  details: 3,
  quote: 4,
  'soft-no': 4,
  buy: 4,
}

const PHASE_LABELS = ['Start', 'What you need', 'The job', 'Your details', 'Quote']

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

function selectGridClass(count: number) {
  if (count <= 2) return 'grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4'
  if (count === 3) return 'grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4'
  return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4'
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

function GhostButton({children, onClick}: {children: ReactNode; onClick: () => void}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-dark/15 bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-dark/70 transition hover:border-dark/30"
    >
      {children}
    </button>
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
    default:
      return <Layers strokeWidth={1.5} />
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
  const businessName = (params.get('name') || '').trim()

  const [step, setStep] = useState<Step>('intro')
  const [situationId, setSituationId] = useState<SituationId | null>(null)
  const [jobId, setJobId] = useState<JobId | null>(null)
  const [sizePresetId, setSizePresetId] = useState<SizePresetId | null>(null)
  const [customSize, setCustomSize] = useState('')
  const [access, setAccess] = useState<AccessId | null>(null)
  const [site, setSite] = useState<SiteConditionId | null>(null)
  const [visitorName, setVisitorName] = useState('')
  const [visitorPhone, setVisitorPhone] = useState('')
  const [visitorEmail, setVisitorEmail] = useState('')
  const [quote, setQuote] = useState<BuiltQuote | null>(null)

  const situation = SITUATIONS.find((s) => s.id === situationId) ?? null
  const job = jobId ? JOBS[jobId] : null

  const jobOptions = useMemo(() => {
    if (!situation) return []
    return situation.nextJobs.map((id) => JOBS[id])
  }, [situation])

  const sizeOptions = useMemo(() => {
    if (!job) return []
    return job.sizePresets
      .map((id) => SIZE_PRESETS[id])
      .filter((p) => p.forUnit === 'both' || p.forUnit === (job.unit === 'm2' ? 'm2' : 'm'))
  }, [job])

  const phaseIndex = STEP_PHASE[step]
  const headerEyebrow = businessName ? `Built for ${businessName}` : 'Quote Capture demo'

  function go(next: Step) {
    setStep(next)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  function pickSituation(id: SituationId) {
    const s = SITUATIONS.find((x) => x.id === id)
    if (!s) return
    setSituationId(id)
    setJobId(null)
    setSizePresetId(null)
    setCustomSize('')
    if (s.outOfScope) {
      go('soft-no')
      return
    }
    window.setTimeout(() => go('job'), 180)
  }

  function pickJob(id: JobId) {
    setJobId(id)
    setSizePresetId(JOBS[id].defaultPreset)
    setCustomSize('')
    window.setTimeout(() => go('size'), 180)
  }

  function pickSize(id: SizePresetId) {
    setSizePresetId(id)
    if (id !== 'know-number') {
      window.setTimeout(() => go('access'), 180)
    }
  }

  function continueFromSize() {
    if (!sizePresetId) return
    if (sizePresetId === 'know-number') {
      const n = Number(customSize)
      if (!Number.isFinite(n) || n <= 0) return
    }
    go('access')
  }

  function pickAccess(id: AccessId) {
    setAccess(id)
    window.setTimeout(() => go('site'), 180)
  }

  function pickSite(id: SiteConditionId) {
    setSite(id)
    window.setTimeout(() => go('details'), 180)
  }

  function resolveSize(): {value: number; label: string} | null {
    if (!job || !sizePresetId) return null
    if (sizePresetId === 'know-number') {
      const n = Number(customSize)
      if (!Number.isFinite(n) || n <= 0) return null
      return {
        value: Math.round(n),
        label: `${Math.round(n)} ${job.unit === 'm2' ? 'm²' : 'm'} (you measured)`,
      }
    }
    const preset = SIZE_PRESETS[sizePresetId]
    return {value: preset.value, label: preset.label}
  }

  function buildAndShow() {
    if (!job || !access || !site) return
    const size = resolveSize()
    if (!size) return
    setQuote(
      buildQuote({
        job,
        sizeValue: size.value,
        sizeLabel: size.label,
        access,
        site,
      }),
    )
    go('quote')
  }

  function restart() {
    setStep('intro')
    setSituationId(null)
    setJobId(null)
    setSizePresetId(null)
    setCustomSize('')
    setAccess(null)
    setSite(null)
    setVisitorName('')
    setVisitorPhone('')
    setVisitorEmail('')
    setQuote(null)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  const canSubmitDetails =
    visitorName.trim().length >= 2 && visitorPhone.trim().replace(/\s/g, '').length >= 8

  return (
    <div className="min-h-screen bg-cream font-sans text-dark selection:bg-dark selection:text-cream">
      <PageMeta
        title="Quote Capture demo | SYSBILT"
        description="Feel an instant quote calculator. Sample landscaping rates. Built by SYSBILT."
        canonical={`${SITE_ORIGIN}/demo/quote-capture`}
        robots="noindex, nofollow"
      />

      <div className="mx-auto max-w-5xl px-5 md:px-8 pt-6 pb-24">
        <div className="mb-6 flex items-center justify-between gap-4">
          <SysbiltLogo className="w-[110px] md:w-[130px]" />
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-dark/40">
            Sample demo
          </p>
        </div>

        {step !== 'intro' && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            {PHASE_LABELS.map((label, i) => {
              const active = i === phaseIndex
              const done = i < phaseIndex
              return (
                <div key={label} className="flex items-center gap-2">
                  {i > 0 ? <span className="text-dark/20">/</span> : null}
                  <span
                    className={`font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${
                      active ? 'text-[#E21E3F]' : done ? 'text-dark/55' : 'text-dark/25'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#A8843F]">
          {headerEyebrow}
        </p>

        {step === 'intro' && (
          <section className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight text-dark">
              Get a clear landscaping quote without writing a novel
            </h1>
            <p className="mt-5 font-sans text-lg leading-relaxed text-dark/70 max-w-xl">
              This sandbox shows what Quote Capture feels like on a real site. Sample prices only.
              You answer plain questions. The rate card does the maths. You see a quotation on
              screen.
            </p>
            <p className="mt-3 font-sans text-base leading-relaxed text-dark/55 max-w-xl">
              If you are not sure what you need, that is fine. The next screens narrow it for you.
            </p>
            <div className="mt-10">
              <InkButton onClick={() => go('situation')}>
                Start the sample <ArrowRight className="h-4 w-4" />
              </InkButton>
            </div>
          </section>
        )}

        {step === 'situation' && (
          <section>
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight max-w-2xl">
              What are you trying to fix
            </h1>
            <p className="mt-3 mb-8 font-sans text-base text-dark/60 max-w-xl">
              Start with the problem, not the product name. Hover a card for the detail, then
              select.
            </p>
            <div className={selectGridClass(SITUATIONS.length)}>
              {SITUATIONS.map((s) => (
                <SelectCard
                  key={s.id}
                  selected={situationId === s.id}
                  onSelect={() => pickSituation(s.id)}
                  title={s.label}
                  blurb={s.blurb}
                  icon={situationIcon(s.id)}
                  unsure={s.unsure}
                />
              ))}
            </div>
          </section>
        )}

        {step === 'job' && situation && (
          <section>
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight max-w-2xl">
              Which of these matches best
            </h1>
            <p className="mt-3 mb-8 font-sans text-base text-dark/60 max-w-xl">
              Based on “{situation.label.toLowerCase()}”. Pick the closest job. We price only what
              is on the sample rate card.
            </p>
            <div className={selectGridClass(jobOptions.length)}>
              {jobOptions.map((j) => (
                <SelectCard
                  key={j.id}
                  selected={jobId === j.id}
                  onSelect={() => pickJob(j.id)}
                  title={j.label}
                  blurb={j.blurb}
                  icon={jobIcon(j.id)}
                />
              ))}
            </div>
            <div className="mt-8">
              <GhostButton onClick={() => go('situation')}>
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </GhostButton>
            </div>
          </section>
        )}

        {step === 'size' && job && (
          <section>
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight max-w-2xl">
              Roughly how big is it
            </h1>
            <p className="mt-3 mb-8 font-sans text-base text-dark/60 max-w-xl">
              Most people do not know the exact metres. Pick the closest picture of the space. If
              you already measured, say so.
            </p>
            <div className={selectGridClass(sizeOptions.length)}>
              {sizeOptions.map((p) => (
                <SelectCard
                  key={p.id}
                  selected={sizePresetId === p.id}
                  onSelect={() => pickSize(p.id)}
                  title={p.label}
                  blurb={p.blurb}
                  icon={<Layers strokeWidth={1.5} />}
                  unsure={p.id === 'know-number'}
                />
              ))}
            </div>
            {sizePresetId === 'know-number' && (
              <div className="mt-8 max-w-sm">
                <label className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark/45">
                  Measurement ({job.unit === 'm2' ? 'square metres' : 'metres'})
                </label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={customSize}
                  onChange={(e) => setCustomSize(e.target.value)}
                  placeholder={job.unit === 'm2' ? 'e.g. 45' : 'e.g. 18'}
                  className="w-full rounded-xl border border-dark/12 bg-white px-4 py-3.5 font-sans text-base outline-none focus:border-[#E21E3F]"
                />
                <div className="mt-5">
                  <InkButton
                    disabled={!customSize || Number(customSize) <= 0}
                    onClick={continueFromSize}
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </InkButton>
                </div>
              </div>
            )}
            <div className="mt-8">
              <GhostButton onClick={() => go('job')}>
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </GhostButton>
            </div>
          </section>
        )}

        {step === 'access' && (
          <section>
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight max-w-2xl">
              How do materials get to the work
            </h1>
            <p className="mt-3 mb-8 font-sans text-base text-dark/60 max-w-xl">
              Access changes labour time. The rate card already prices that. Pick what is true for
              this property.
            </p>
            <div className={selectGridClass(ACCESS_OPTIONS.length)}>
              {ACCESS_OPTIONS.map((a) => (
                <SelectCard
                  key={a.id}
                  selected={access === a.id}
                  onSelect={() => pickAccess(a.id)}
                  title={a.label}
                  blurb={a.blurb}
                  icon={<Layers strokeWidth={1.5} />}
                />
              ))}
            </div>
            <div className="mt-8">
              <GhostButton onClick={() => go('size')}>
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </GhostButton>
            </div>
          </section>
        )}

        {step === 'site' && (
          <section>
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight max-w-2xl">
              What is on the ground now
            </h1>
            <p className="mt-3 mb-8 font-sans text-base text-dark/60 max-w-xl">
              Clearing old material is priced separately so the quote stays honest.
            </p>
            <div className={selectGridClass(SITE_CONDITIONS.length)}>
              {SITE_CONDITIONS.map((s) => (
                <SelectCard
                  key={s.id}
                  selected={site === s.id}
                  onSelect={() => pickSite(s.id)}
                  title={s.label}
                  blurb={s.blurb}
                  icon={<Shrub strokeWidth={1.5} />}
                />
              ))}
            </div>
            <div className="mt-8">
              <GhostButton onClick={() => go('access')}>
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </GhostButton>
            </div>
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
            <div className="mt-8 flex flex-wrap gap-3">
              <InkButton disabled={!canSubmitDetails} onClick={buildAndShow}>
                See my quotation <ArrowRight className="h-4 w-4" />
              </InkButton>
              <GhostButton onClick={() => go('site')}>
                <ArrowLeft className="h-3.5 w-3.5" /> Back
              </GhostButton>
            </div>
          </section>
        )}

        {step === 'soft-no' && (
          <section className="max-w-xl">
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight">
              We do not quote that job here
            </h1>
            <p className="mt-4 font-sans text-base leading-relaxed text-dark/70">
              Thanks for stopping by. This sample only covers jobs on the rate card. Nothing was
              sent to a business owner. No PDF. No SMS.
            </p>
            <p className="mt-4 font-sans text-base leading-relaxed text-dark/55">
              On a live site, this screen would list what they do and offer a call or email for
              anything else.
            </p>
            <div className="mt-10">
              <InkButton onClick={restart}>Try a job we do quote</InkButton>
            </div>
          </section>
        )}

        {step === 'quote' && quote && (
          <section className="max-w-xl">
            <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8843F]">
              Your quotation, sample
            </p>
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight">
              {quote.jobLabel}
            </h1>
            <p className="mt-2 font-sans text-sm text-dark/55">
              For {visitorName.trim() || 'you'}
              {visitorPhone.trim() ? `, ${visitorPhone.trim()}` : ''}
              {`, ${quote.sizeLabel}`}
            </p>

            <div className="mt-6 rounded-2xl border border-dark/10 bg-white p-5 md:p-6 shadow-[0_8px_24px_-18px_rgba(26,26,26,0.28)]">
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-dark/40">
                Breakdown
              </p>
              <ul className="space-y-2.5">
                {quote.lines.map((line) => (
                  <li key={line.label} className="flex justify-between gap-4 font-sans text-sm">
                    <span className="text-dark/70">{line.label}</span>
                    <span className="shrink-0 tabular-nums font-semibold">{money(line.amount)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-dark/10 pt-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-dark/40">
                  Quotation
                </p>
                <p className="mt-1 font-serif text-4xl tabular-nums">{money(quote.subtotal)}</p>
                <p className="mt-1 font-sans text-xs text-dark/50">
                  Range {money(quote.low)} to {money(quote.high)} if site conditions shift
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[#A8843F]/35 bg-[#A8843F]/10 px-5 py-4">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#A8843F]">
                Pay now, sample
              </p>
              <p className="mt-1 font-sans text-sm text-dark/75">
                Full payment {money(quote.subtotal)}. On a live install this is a real Stripe link
                on the PDF, email, and SMS.
              </p>
              <button
                type="button"
                disabled
                className="mt-3 rounded-full bg-dark/80 px-6 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-cream opacity-70 cursor-not-allowed"
              >
                Pay {money(quote.subtotal)} (demo only)
              </button>
            </div>

            <p className="mt-5 font-sans text-xs leading-relaxed text-dark/45">{SAMPLE_DISCLAIMER}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <GhostButton onClick={() => window.print()}>Print or save as PDF</GhostButton>
              <InkButton onClick={() => go('buy')}>
                Want this on your website <ArrowRight className="h-4 w-4" />
              </InkButton>
            </div>
            <button
              type="button"
              onClick={restart}
              className="mt-4 font-sans text-sm text-dark/45 hover:text-dark/70"
            >
              Run the demo again
            </button>
          </section>
        )}

        {step === 'buy' && (
          <section className="max-w-xl">
            <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight">
              That was a sample. Yours runs on your prices
            </h1>
            <p className="mt-4 font-sans text-base leading-relaxed text-dark/70">
              Quote Capture installs on your existing site. Customers answer plain questions, see a
              real quotation, get email and SMS with a pay link, and you get a priced lead you can
              call.
            </p>
            <p className="mt-3 font-sans text-base leading-relaxed text-dark/55">
              One payment. No subscription. AI Concierge is optional on the same rate card.
            </p>
            <div className="mt-10">
              <Link
                to="/go/quote-capture"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E21E3F] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream shadow-[0_12px_28px_-12px_rgba(226,30,63,0.65)]"
              >
                See Quote Capture, $2,800
              </Link>
            </div>
            <p className="mt-4 font-sans text-xs text-dark/40">
              Sales page ships next. If the link is not live yet, message Felipe and we send the buy
              path by hand.
            </p>
            <button
              type="button"
              onClick={() => go('quote')}
              className="mt-6 font-sans text-sm text-dark/45"
            >
              Back to the sample quote
            </button>
          </section>
        )}

        <p className="mt-16 border-t border-dark/10 pt-6 font-sans text-[11px] text-dark/35">
          SYSBILT, Quote Capture sandbox, sample rates only, noindex
        </p>
      </div>
    </div>
  )
}
