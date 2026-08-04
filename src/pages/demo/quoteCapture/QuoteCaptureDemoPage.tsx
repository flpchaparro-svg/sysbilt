import React, {useMemo, useState} from 'react'
import {Link, useSearchParams} from 'react-router-dom'
import {SysbiltLogo} from '../../../components/SysbiltLogo'
import {PageMeta} from '../../../components/PageMeta'
import {SITE_ORIGIN} from '../../../constants/seoMeta'
import {FUNNEL_COLOURS} from '../../funnel/funnelTheme'
import {
  ACCESS_OPTIONS,
  buildLandscapeQuote,
  IN_SCOPE_LIST,
  LANDSCAPE_JOBS,
  SAMPLE_DISCLAIMER,
  type AccessId,
  type BuiltQuote,
  type LandscapeJob,
  type LandscapeJobId,
} from './rateCard'

type Step =
  | 'intro'
  | 'job'
  | 'size'
  | 'access'
  | 'details'
  | 'quote'
  | 'soft-no'
  | 'buy'

function money(n: number): string {
  return `$${n.toLocaleString('en-AU')}`
}

function ChoiceButton({
  selected,
  onSelect,
  title,
  blurb,
}: {
  selected: boolean
  onSelect: () => void
  title: string
  blurb: string
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full text-left border px-4 py-3.5 transition-colors"
      style={{
        borderColor: selected ? FUNNEL_COLOURS.accent : `${FUNNEL_COLOURS.ink}18`,
        backgroundColor: selected ? `${FUNNEL_COLOURS.accent}0A` : FUNNEL_COLOURS.surface,
      }}
    >
      <p className="font-sans text-sm font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
        {title}
      </p>
      <p className="mt-1 font-sans text-sm leading-snug" style={{color: FUNNEL_COLOURS.muted}}>
        {blurb}
      </p>
    </button>
  )
}

export default function QuoteCaptureDemoPage() {
  const [params] = useSearchParams()
  const trade = (params.get('trade') || 'landscaping').trim().toLowerCase()
  const businessName = (params.get('name') || '').trim()

  const [step, setStep] = useState<Step>('intro')
  const [jobId, setJobId] = useState<LandscapeJobId | null>(null)
  const [size, setSize] = useState(40)
  const [access, setAccess] = useState<AccessId>('easy')
  const [removeExisting, setRemoveExisting] = useState(false)
  const [visitorName, setVisitorName] = useState('')
  const [visitorPhone, setVisitorPhone] = useState('')
  const [visitorEmail, setVisitorEmail] = useState('')
  const [quote, setQuote] = useState<BuiltQuote | null>(null)

  const job: LandscapeJob | null = useMemo(
    () => LANDSCAPE_JOBS.find((j) => j.id === jobId) ?? null,
    [jobId],
  )

  const headerTitle = businessName
    ? `Built for ${businessName}`
    : 'Quote Capture demo'

  const tradeLabel = trade === 'landscaping' ? 'landscaping' : trade

  function selectJob(id: LandscapeJobId) {
    const next = LANDSCAPE_JOBS.find((j) => j.id === id)
    if (!next) return
    setJobId(id)
    if (!next.inScope) {
      setStep('soft-no')
      return
    }
    setSize(next.defaultSize)
    setStep('size')
  }

  function goToAccess() {
    setStep('access')
  }

  function goToDetails() {
    setStep('details')
  }

  function buildAndShowQuote() {
    if (!job) return
    const built = buildLandscapeQuote({job, size, access, removeExisting})
    if (!built) {
      setStep('soft-no')
      return
    }
    setQuote(built)
    setStep('quote')
  }

  function restart() {
    setStep('intro')
    setJobId(null)
    setSize(40)
    setAccess('easy')
    setRemoveExisting(false)
    setVisitorName('')
    setVisitorPhone('')
    setVisitorEmail('')
    setQuote(null)
  }

  return (
    <div
      className="min-h-screen font-sans selection:bg-dark selection:text-cream"
      style={{backgroundColor: FUNNEL_COLOURS.ground, color: FUNNEL_COLOURS.ink}}
    >
      <PageMeta
        title="Quote Capture demo | SYSBILT"
        description="Feel an instant quote calculator for landscaping. Sample rates only. Built by SYSBILT."
        canonical={`${SITE_ORIGIN}/demo/quote-capture`}
        robots="noindex, nofollow"
      />

      <div className="max-w-xl mx-auto px-5 md:px-8 pt-7 pb-20">
        <div className="flex items-center justify-between gap-4 mb-8">
          <SysbiltLogo className="w-[100px] md:w-[120px]" />
          <p
            className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.steel}}
          >
            Sample demo
          </p>
        </div>

        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-2"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          {headerTitle}
        </p>

        {step === 'intro' && (
          <section>
            <h1 className="font-serif text-3xl md:text-4xl leading-[1.08] tracking-tight mb-4">
              Get a {tradeLabel} quote in under a minute
            </h1>
            <p className="font-sans text-base md:text-lg leading-relaxed mb-3" style={{color: FUNNEL_COLOURS.muted}}>
              This is a sandbox. Sample prices, labelled as samples. On a live install, every number
              comes from the business owner's real rate card.
            </p>
            <p className="font-sans text-base leading-relaxed mb-8" style={{color: FUNNEL_COLOURS.muted}}>
              Answer a few questions. See a quotation on screen. That is what their customers would
              get instead of a blank contact form.
            </p>
            <button
              type="button"
              onClick={() => setStep('job')}
              className="w-full md:w-auto px-6 py-3.5 font-sans text-sm font-semibold text-cream"
              style={{backgroundColor: FUNNEL_COLOURS.accent}}
            >
              Start the sample quote
            </button>
          </section>
        )}

        {step === 'job' && (
          <section>
            <h1 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight mb-2">
              What do you need done
            </h1>
            <p className="font-sans text-sm mb-6" style={{color: FUNNEL_COLOURS.muted}}>
              Pick the closest job. If it is not on this list, we stop cleanly.
            </p>
            <div className="space-y-2.5">
              {LANDSCAPE_JOBS.map((j) => (
                <ChoiceButton
                  key={j.id}
                  selected={jobId === j.id}
                  onSelect={() => selectJob(j.id)}
                  title={j.label}
                  blurb={j.blurb}
                />
              ))}
            </div>
          </section>
        )}

        {step === 'size' && job && (
          <section>
            <h1 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight mb-2">
              How big is the job
            </h1>
            <p className="font-sans text-sm mb-6" style={{color: FUNNEL_COLOURS.muted}}>
              {job.sizeHint}. A rough number is fine.
            </p>
            <label className="block mb-6">
              <span
                className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{color: FUNNEL_COLOURS.steel}}
              >
                Size ({job.unitLabel})
              </span>
              <input
                type="number"
                min={job.sizeMin}
                max={job.sizeMax}
                step={job.sizeStep}
                value={size}
                onChange={(e) => setSize(Number(e.target.value) || job.defaultSize)}
                className="mt-2 w-full border bg-white px-4 py-3 font-sans text-base outline-none"
                style={{borderColor: `${FUNNEL_COLOURS.ink}22`, color: FUNNEL_COLOURS.ink}}
              />
            </label>
            <label className="flex items-start gap-3 mb-8 cursor-pointer">
              <input
                type="checkbox"
                checked={removeExisting}
                onChange={(e) => setRemoveExisting(e.target.checked)}
                className="mt-1"
              />
              <span className="font-sans text-sm leading-snug" style={{color: FUNNEL_COLOURS.muted}}>
                Remove existing material first (old turf, beds, or fence line)
              </span>
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setStep('job')}
                className="px-5 py-3 font-sans text-sm border"
                style={{borderColor: `${FUNNEL_COLOURS.ink}22`, color: FUNNEL_COLOURS.ink}}
              >
                Back
              </button>
              <button
                type="button"
                onClick={goToAccess}
                className="px-5 py-3 font-sans text-sm font-semibold text-cream"
                style={{backgroundColor: FUNNEL_COLOURS.accent}}
              >
                Continue
              </button>
            </div>
          </section>
        )}

        {step === 'access' && (
          <section>
            <h1 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight mb-2">
              How do materials get in
            </h1>
            <p className="font-sans text-sm mb-6" style={{color: FUNNEL_COLOURS.muted}}>
              Access changes labour. The rate card already prices that.
            </p>
            <div className="space-y-2.5 mb-8">
              {ACCESS_OPTIONS.map((a) => (
                <ChoiceButton
                  key={a.id}
                  selected={access === a.id}
                  onSelect={() => setAccess(a.id)}
                  title={a.label}
                  blurb={a.blurb}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setStep('size')}
                className="px-5 py-3 font-sans text-sm border"
                style={{borderColor: `${FUNNEL_COLOURS.ink}22`, color: FUNNEL_COLOURS.ink}}
              >
                Back
              </button>
              <button
                type="button"
                onClick={goToDetails}
                className="px-5 py-3 font-sans text-sm font-semibold text-cream"
                style={{backgroundColor: FUNNEL_COLOURS.accent}}
              >
                Continue
              </button>
            </div>
          </section>
        )}

        {step === 'details' && (
          <section>
            <h1 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight mb-2">
              Where should we send the quote
            </h1>
            <p className="font-sans text-sm mb-6" style={{color: FUNNEL_COLOURS.muted}}>
              In a live install this also triggers SMS and the owner's alert. Here it only fills the
              sample quote on screen. Nothing is saved to a CRM.
            </p>
            <div className="space-y-4 mb-8">
              <label className="block">
                <span
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{color: FUNNEL_COLOURS.steel}}
                >
                  Your name
                </span>
                <input
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="mt-2 w-full border bg-white px-4 py-3 font-sans text-base outline-none"
                  style={{borderColor: `${FUNNEL_COLOURS.ink}22`}}
                  placeholder="Alex"
                  autoComplete="name"
                />
              </label>
              <label className="block">
                <span
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{color: FUNNEL_COLOURS.steel}}
                >
                  Mobile
                </span>
                <input
                  value={visitorPhone}
                  onChange={(e) => setVisitorPhone(e.target.value)}
                  className="mt-2 w-full border bg-white px-4 py-3 font-sans text-base outline-none"
                  style={{borderColor: `${FUNNEL_COLOURS.ink}22`}}
                  placeholder="04…"
                  autoComplete="tel"
                />
              </label>
              <label className="block">
                <span
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{color: FUNNEL_COLOURS.steel}}
                >
                  Email
                </span>
                <input
                  type="email"
                  value={visitorEmail}
                  onChange={(e) => setVisitorEmail(e.target.value)}
                  className="mt-2 w-full border bg-white px-4 py-3 font-sans text-base outline-none"
                  style={{borderColor: `${FUNNEL_COLOURS.ink}22`}}
                  placeholder="you@…"
                  autoComplete="email"
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setStep('access')}
                className="px-5 py-3 font-sans text-sm border"
                style={{borderColor: `${FUNNEL_COLOURS.ink}22`, color: FUNNEL_COLOURS.ink}}
              >
                Back
              </button>
              <button
                type="button"
                disabled={visitorName.trim().length < 2 || visitorPhone.trim().length < 8}
                onClick={buildAndShowQuote}
                className="px-5 py-3 font-sans text-sm font-semibold text-cream disabled:opacity-40"
                style={{backgroundColor: FUNNEL_COLOURS.accent}}
              >
                See my quotation
              </button>
            </div>
          </section>
        )}

        {step === 'soft-no' && (
          <section>
            <h1 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight mb-4">
              We do not quote that job here
            </h1>
            <p className="font-sans text-base leading-relaxed mb-4" style={{color: FUNNEL_COLOURS.muted}}>
              Thanks for stopping by. This sample calculator only covers the jobs on the rate card.
              Nothing was sent to the business owner.
            </p>
            <p
              className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] mb-2"
              style={{color: FUNNEL_COLOURS.steel}}
            >
              What this demo does quote
            </p>
            <ul className="mb-8 space-y-1.5">
              {IN_SCOPE_LIST.map((label) => (
                <li key={label} className="font-sans text-sm" style={{color: FUNNEL_COLOURS.ink}}>
                  {label}
                </li>
              ))}
            </ul>
            <p className="font-sans text-sm leading-relaxed mb-8" style={{color: FUNNEL_COLOURS.muted}}>
              For anything else, a live site would show a call or email path. No PDF. No SMS. No
              owner alert.
            </p>
            <button
              type="button"
              onClick={restart}
              className="px-5 py-3 font-sans text-sm font-semibold text-cream"
              style={{backgroundColor: FUNNEL_COLOURS.accent}}
            >
              Try a job we do quote
            </button>
          </section>
        )}

        {step === 'quote' && quote && (
          <section>
            <p
              className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
              style={{color: FUNNEL_COLOURS.goldDeep}}
            >
              Your quotation, sample
            </p>
            <h1 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight mb-2">
              {quote.jobLabel}
            </h1>
            <p className="font-sans text-sm mb-6" style={{color: FUNNEL_COLOURS.muted}}>
              Prepared for {visitorName.trim() || 'you'}
              {visitorPhone.trim() ? `, ${visitorPhone.trim()}` : ''}
            </p>

            <div
              className="border p-5 md:p-6 mb-5"
              style={{
                borderColor: `${FUNNEL_COLOURS.ink}18`,
                backgroundColor: FUNNEL_COLOURS.surface,
              }}
            >
              <p
                className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] mb-3"
                style={{color: FUNNEL_COLOURS.steel}}
              >
                Breakdown
              </p>
              <ul className="space-y-2 mb-4">
                {quote.lines.map((line) => (
                  <li
                    key={line.label}
                    className="flex justify-between gap-4 font-sans text-sm"
                    style={{color: FUNNEL_COLOURS.ink}}
                  >
                    <span>{line.label}</span>
                    <span className="tabular-nums shrink-0">{money(line.amount)}</span>
                  </li>
                ))}
              </ul>
              <div
                className="border-t pt-4 flex justify-between gap-4 items-end"
                style={{borderColor: `${FUNNEL_COLOURS.ink}14`}}
              >
                <div>
                  <p
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{color: FUNNEL_COLOURS.steel}}
                  >
                    Quotation
                  </p>
                  <p className="font-serif text-3xl tabular-nums mt-1">{money(quote.subtotal)}</p>
                  <p className="font-sans text-xs mt-1" style={{color: FUNNEL_COLOURS.muted}}>
                    Range {money(quote.low)} to {money(quote.high)} if site conditions shift
                  </p>
                </div>
              </div>
            </div>

            <div
              className="border px-4 py-3 mb-5"
              style={{
                borderColor: `${FUNNEL_COLOURS.goldDeep}40`,
                backgroundColor: `${FUNNEL_COLOURS.goldDeep}12`,
              }}
            >
              <p
                className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] mb-1"
                style={{color: FUNNEL_COLOURS.goldDeep}}
              >
                Pay now, sample
              </p>
              <p className="font-sans text-sm" style={{color: FUNNEL_COLOURS.ink}}>
                Full payment {money(quote.deposit)}. On a live install this would be a real Stripe
                link on the PDF, email, and SMS.
              </p>
              <button
                type="button"
                disabled
                className="mt-3 w-full md:w-auto px-5 py-2.5 font-sans text-sm font-semibold text-cream opacity-70 cursor-not-allowed"
                style={{backgroundColor: FUNNEL_COLOURS.ink}}
              >
                Pay {money(quote.deposit)} (demo only)
              </button>
            </div>

            <p className="font-sans text-xs leading-relaxed mb-8" style={{color: FUNNEL_COLOURS.steel}}>
              {SAMPLE_DISCLAIMER}
            </p>

            <div className="flex flex-col gap-3 mb-10">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full px-5 py-3 font-sans text-sm border"
                style={{borderColor: `${FUNNEL_COLOURS.ink}22`, color: FUNNEL_COLOURS.ink}}
              >
                Print or save as PDF
              </button>
              <button
                type="button"
                onClick={() => setStep('buy')}
                className="w-full px-5 py-3.5 font-sans text-sm font-semibold text-cream"
                style={{backgroundColor: FUNNEL_COLOURS.accent}}
              >
                Want this on your website
              </button>
              <button
                type="button"
                onClick={restart}
                className="w-full px-5 py-3 font-sans text-sm"
                style={{color: FUNNEL_COLOURS.steel}}
              >
                Run the demo again
              </button>
            </div>
          </section>
        )}

        {step === 'buy' && (
          <section>
            <h1 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight mb-4">
              That was a sample. Yours runs on your prices
            </h1>
            <p className="font-sans text-base leading-relaxed mb-4" style={{color: FUNNEL_COLOURS.muted}}>
              Quote Capture installs on your existing site. Customers answer, see a real quotation,
              get email and SMS with a pay link, and you get a priced lead you can call.
            </p>
            <p className="font-sans text-base leading-relaxed mb-8" style={{color: FUNNEL_COLOURS.muted}}>
              One payment. No subscription. AI Concierge is optional on the same rate card.
            </p>
            <Link
              to="/go/quote-capture"
              className="inline-flex w-full md:w-auto justify-center px-6 py-3.5 font-sans text-sm font-semibold text-cream"
              style={{backgroundColor: FUNNEL_COLOURS.accent}}
            >
              See Quote Capture, $2,800
            </Link>
            <p className="mt-4 font-sans text-xs leading-relaxed" style={{color: FUNNEL_COLOURS.steel}}>
              The sales page ships next. If that link is not live yet, reply to Felipe and we will
              send the buy path by hand.
            </p>
            <button
              type="button"
              onClick={() => setStep('quote')}
              className="mt-6 font-sans text-sm"
              style={{color: FUNNEL_COLOURS.steel}}
            >
              Back to the sample quote
            </button>
          </section>
        )}

        <p
          className="mt-14 pt-6 border-t font-sans text-[11px] leading-relaxed"
          style={{borderColor: `${FUNNEL_COLOURS.ink}12`, color: FUNNEL_COLOURS.steel}}
        >
          SYSBILT, Quote Capture sandbox, sample rates only, noindex
        </p>
      </div>
    </div>
  )
}
