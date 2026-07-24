import {useEffect, useMemo, useRef, useState, type FormEvent} from 'react'
import {Helmet} from 'react-helmet-async'
import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import {SysbiltLogo} from '../../components/SysbiltLogo'
import {
  buildWebsiteAgreementClauses,
  isWebsiteTierCode,
  WEBSITE_TIER_META,
  type WebsiteTierCode,
} from './websiteAgreementCopy'
import '../../styles/website-agreement-print.css'

const PROVIDER_SIGNED = new Date().toISOString().slice(0, 10)

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

type Prefill = {
  email: string
  name: string
  business: string
  phone?: string
  abn?: string | null
  address?: string
}

type SignedRecord = {
  tier: WebsiteTierCode
  name: string
  position: string
  business: string
  email: string
  signedAt: string
  preview: boolean
  sessionId?: string | null
}

/**
 * Product agreement after Hosted Website Plan checkout.
 * Prefills from Stripe Checkout session when session_id is present.
 * Use ?preview=1 to review without paying.
 */
export default function WebsiteAgreementPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const afterSignRef = useRef<HTMLDivElement>(null)
  const tierParam = params.get('tier')
  const preview = params.get('preview') === '1'
  const paid = params.get('paid') === '1' || preview
  const sessionId = params.get('session_id')

  const tier: WebsiteTierCode | null = isWebsiteTierCode(tierParam) ? tierParam : null
  const meta = tier ? WEBSITE_TIER_META[tier] : null
  const clauses = useMemo(() => (tier ? buildWebsiteAgreementClauses(tier) : []), [tier])

  const [acceptAgreement, setAcceptAgreement] = useState(false)
  const [acceptBilling, setAcceptBilling] = useState(false)
  const [acceptTerm, setAcceptTerm] = useState(false)
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [business, setBusiness] = useState('')
  const [email, setEmail] = useState('')
  const [prefillNote, setPrefillNote] = useState<string | null>(null)
  const [prefillLoading, setPrefillLoading] = useState(false)
  const [signed, setSigned] = useState<SignedRecord | null>(null)

  useEffect(() => {
    if (!sessionId || !sessionId.startsWith('cs_') || preview) return
    let cancelled = false
    setPrefillLoading(true)
    fetch(`/api/funnel/access?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        const json = (await res.json()) as Prefill & {error?: string}
        if (!res.ok) throw new Error(json.error || 'Could not load payment details')
        return json
      })
      .then((data) => {
        if (cancelled) return
        if (data.email) setEmail(data.email)
        if (data.name) setName(data.name)
        if (data.business) setBusiness(data.business)
        setPrefillNote('We filled what we already have from checkout. Check it, then sign.')
      })
      .catch(() => {
        if (!cancelled) {
          setPrefillNote(
            'We could not pull checkout details automatically. Enter your details below.',
          )
        }
      })
      .finally(() => {
        if (!cancelled) setPrefillLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [sessionId, preview])

  useEffect(() => {
    if (!signed) return
    afterSignRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
  }, [signed])

  const canSubmit =
    Boolean(tier) &&
    paid &&
    acceptAgreement &&
    acceptBilling &&
    acceptTerm &&
    name.trim().length >= 2 &&
    position.trim().length >= 2 &&
    business.trim().length >= 2 &&
    email.includes('@')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!canSubmit || !tier) return
    const record: SignedRecord = {
      tier,
      name: name.trim(),
      position: position.trim(),
      business: business.trim(),
      email: email.trim(),
      signedAt: new Date().toISOString(),
      preview,
      sessionId,
    }
    try {
      sessionStorage.setItem('sysbilt_website_agreement', JSON.stringify(record))
    } catch {
      /* ignore */
    }
    setSigned(record)
  }

  const robotsMeta = (
    <Helmet>
      <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      <title>Hosted Website Plan agreement | SYSBILT</title>
    </Helmet>
  )

  if (!tier || !meta) {
    return (
      <>
        {robotsMeta}
        <div className="flex min-h-screen items-center justify-center bg-cream p-8">
          <div className="w-full max-w-xl border border-dark/10 bg-white p-8 md:p-12">
            <span className="mb-4 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-text">
              / Agreement
            </span>
            <h1 className="type-h3 text-dark">Choose a plan first</h1>
            <p className="type-body mt-4 text-dark/70">
              This agreement needs a plan (Brochure, Practice, or Full site). Pick one on the Hosted
              Website Plan page, pay the enrolment, then you land here.
            </p>
            <Link
              to="/go/website"
              className="mt-8 inline-block border-2 border-dark bg-dark px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-cream"
            >
              Back to plans
            </Link>
            <p className="mt-6 font-sans text-sm text-dark/60">
              Preview without paying:{' '}
              <Link className="underline" to="/go/website/agreement?tier=practice&preview=1">
                Practice sample
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }

  if (!paid) {
    return (
      <>
        {robotsMeta}
        <div className="flex min-h-screen items-center justify-center bg-cream p-8">
          <div className="w-full max-w-xl border border-dark/10 bg-white p-8 md:p-12">
            <span className="mb-4 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-text">
              / Payment needed
            </span>
            <h1 className="type-h3 text-dark">{meta.name} agreement</h1>
            <p className="type-body mt-4 text-dark/70">
              Pay ${meta.enrolmentAud} today to start, then this agreement opens automatically.
            </p>
            <Link
              to="/go/website"
              className="mt-8 inline-block border-2 border-dark bg-dark px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-cream"
            >
              Choose plan and pay
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {robotsMeta}
      <div className="min-h-screen bg-cream font-sans text-dark selection:bg-dark selection:text-cream">
        <main className="website-agreement-doc mx-auto max-w-3xl px-6 py-12 md:py-20">
          <SysbiltLogo className="w-[160px] md:w-[200px] max-w-[85vw]" />
          <p className="mt-2 font-sans text-sm text-dark/60 md:text-base">
            Business systems for growing companies
          </p>

          {preview ? (
            <p
              className="mt-8 border border-dark/15 bg-white px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-dark/70"
              data-noprint
            >
              Preview mode · no Stripe payment on this view
            </p>
          ) : null}

          <header className="mt-16 md:mt-20 mb-12">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-red-text">
              / Hosted Website Plan agreement
            </p>
            <h1 className="font-serif font-bold uppercase tracking-tight text-4xl leading-none text-dark md:text-6xl">
              {meta.name}
            </h1>
            <hr className="mb-8 mt-8 border-t-2 border-dark" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-red-text">
                  / Pages
                </p>
                <p className="font-serif text-2xl text-dark">{meta.pages}</p>
              </div>
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-red-text">
                  / Today
                </p>
                <p className="font-serif text-2xl text-dark">${meta.enrolmentAud}</p>
              </div>
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-red-text">
                  / Monthly at go-live
                </p>
                <p className="font-serif text-2xl text-dark">${meta.monthlyAud}/mo</p>
              </div>
            </div>
            {signed ? (
              <div className="mt-8 grid grid-cols-1 gap-4 border border-dark/15 bg-white p-6 md:grid-cols-2">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-text">
                    / Client
                  </p>
                  <p className="mt-2 font-serif text-xl text-dark">{signed.business}</p>
                  <p className="font-sans text-sm text-dark/70">
                    {signed.name}, {signed.position}
                  </p>
                  <p className="font-sans text-sm text-dark/70">{signed.email}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-red-text">
                    / Signed
                  </p>
                  <p className="mt-2 font-serif text-xl text-dark">
                    {formatDate(signed.signedAt.slice(0, 10))}
                  </p>
                </div>
              </div>
            ) : null}
          </header>

          {clauses.map((clause) => (
            <section key={clause.id} id={clause.id} className="mb-10">
              <h2 className="mb-4 font-serif text-2xl font-semibold uppercase tracking-tight text-dark md:text-3xl">
                {clause.title}
              </h2>
              {clause.paragraphs.map((p) => (
                <p key={p} className="mb-4 text-base leading-relaxed text-dark/85 md:text-lg">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <section id="hwa-sign" className="mb-10 mt-16">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-red-text">
              / Signatures
            </p>
            <h2 className="mb-10 font-serif text-3xl font-black uppercase tracking-tight text-dark md:text-4xl">
              Signatures
            </h2>

            <div className="website-agreement-sign-block mb-8 border-2 border-dark bg-cream-warm p-8">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-red-text">
                / Signed by the provider
              </p>
              <p className="font-serif text-2xl italic text-dark">Felipe Chaparro</p>
              <div className="mt-4 space-y-1 font-sans text-sm text-dark/70">
                <p>Position: Founder, SYSBILT</p>
                <p>ABN: 56 115 228 020</p>
                <p>Date: {formatDate(PROVIDER_SIGNED)}</p>
              </div>
            </div>

            {signed ? (
              <div className="website-agreement-sign-block border-2 border-dark bg-cream-warm p-8">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-red-text">
                  / Signed by the client
                </p>
                <p className="font-serif text-2xl italic text-dark">{signed.name}</p>
                <div className="mt-4 space-y-1 font-sans text-sm text-dark/70">
                  <p>Business: {signed.business}</p>
                  <p>Position: {signed.position}</p>
                  <p>Email: {signed.email}</p>
                  <p>Date: {formatDate(signed.signedAt.slice(0, 10))}</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="proposal-accept border-2 border-dark bg-cream-warm p-8"
                data-noprint
              >
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-red-text">
                  / Sign as client
                </p>

                {prefillLoading ? (
                  <p className="mb-6 font-sans text-sm text-dark/60">
                    Loading your details from checkout…
                  </p>
                ) : null}
                {prefillNote ? (
                  <p className="mb-6 border border-dark/10 bg-white px-4 py-3 font-sans text-sm text-dark/75">
                    {prefillNote}
                  </p>
                ) : null}

                <div className="space-y-5">
                  <label className="flex cursor-pointer items-start gap-4">
                    <input
                      type="checkbox"
                      checked={acceptAgreement}
                      onChange={(e) => setAcceptAgreement(e.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 border-2 border-dark bg-cream-light text-red-text accent-red-text"
                    />
                    <span className="font-serif text-lg text-dark">
                      I have read and agree to this Hosted Website Plan agreement for the{' '}
                      {meta.name} plan.
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-4">
                    <input
                      type="checkbox"
                      checked={acceptBilling}
                      onChange={(e) => setAcceptBilling(e.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 border-2 border-dark bg-cream-light text-red-text accent-red-text"
                    />
                    <span className="font-serif text-lg text-dark">
                      I accept the charge order: ${meta.enrolmentAud} today to start, then $
                      {meta.monthlyAud} each month from go-live on the card used at checkout.
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-4">
                    <input
                      type="checkbox"
                      checked={acceptTerm}
                      onChange={(e) => setAcceptTerm(e.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 border-2 border-dark bg-cream-light text-red-text accent-red-text"
                    />
                    <span className="font-serif text-lg text-dark">
                      I accept the twelve month term from go-live. Leaving early means paying the
                      remaining months of the term.
                    </span>
                  </label>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <label className="block md:col-span-2">
                    <span className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-red-text">
                      / Business name
                    </span>
                    <input
                      type="text"
                      value={business}
                      onChange={(e) => setBusiness(e.target.value)}
                      placeholder="Trading or company name"
                      className="w-full border-2 border-dark bg-cream-light px-4 py-3 font-sans text-base text-dark focus:bg-white focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-red-text">
                      / Full name
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      placeholder="Your name"
                      className="w-full border-2 border-dark bg-cream-light px-4 py-3 font-sans text-base text-dark focus:bg-white focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-red-text">
                      / Position in the company
                    </span>
                    <input
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      autoComplete="organization-title"
                      placeholder="Director, Manager, Owner"
                      className="w-full border-2 border-dark bg-cream-light px-4 py-3 font-sans text-base text-dark focus:bg-white focus:outline-none"
                    />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-red-text">
                      / Email
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      placeholder="you@company.com.au"
                      className="w-full border-2 border-dark bg-cream-light px-4 py-3 font-sans text-base text-dark focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="mt-10 border-2 border-dark bg-dark px-10 py-5 font-mono text-sm uppercase tracking-[0.2em] text-cream transition-colors duration-200 hover:border-red-text hover:bg-red-text disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Sign agreement <span aria-hidden>›</span>
                </button>
              </form>
            )}
          </section>

          {signed ? (
            <div
              ref={afterSignRef}
              className="mb-16 border-2 border-dark bg-cream-warm p-8"
              data-noprint
            >
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-red-text">
                / Signed
              </p>
              <h2 className="font-serif text-3xl font-bold text-dark">Agreement recorded</h2>
              <p className="mt-3 font-sans text-base text-dark/75">
                Signed by {signed.name} ({signed.position}) for {signed.business} on{' '}
                {formatDate(signed.signedAt.slice(0, 10))}.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="border-2 border-dark bg-dark px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-cream hover:border-red-text hover:bg-red-text"
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/go/website/wizard?tier=${tier}&agreed=1`, {replace: true})
                  }
                  className="border-2 border-dark bg-cream px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-dark hover:border-red-text"
                >
                  Continue to briefing
                </button>
              </div>
              <p className="mt-4 font-sans text-sm text-dark/60">
                Download opens the print dialog. Choose Save as PDF.
              </p>
            </div>
          ) : null}

          <footer className="type-body mt-8 border-t border-dark/10 pt-8 text-sm text-dark/60">
            <p>SYSBILT | ABN 56 115 228 020 | Sydney, Australia</p>
            <p className="mt-1">hello@sysbilt.com | sysbilt.com</p>
          </footer>
        </main>
      </div>
    </>
  )
}
