import React, {useEffect, useMemo, useState} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {useParams, useSearchParams} from 'react-router-dom'
import {SysbiltLogo} from '../../components/SysbiltLogo'
import {PageMeta} from '../../components/PageMeta'
import {client} from '../../sanityClient'
import {SITE_ORIGIN} from '../../constants/seoMeta'
import {FunnelCtaBlock, FunnelLegalFooter, type FunnelCtaFields} from './FunnelCtaBlock'
import {ScoreMoment} from './ScoreMoment'
import {CallMissedMoment, MissedCallLeakPair} from './CallMissedMoment'
import {PainCostCards} from './PainCostCards'
import {MissedCallPainCards} from './MissedCallPainCards'
import {GoogleProfilePainCards} from './GoogleProfilePainCards'
import {SearchPainCards} from './SearchPainCards'
import {LostClientCalculator} from './LostClientCalculator'
import {BenefitMotionRows} from './BenefitMotionRows'
import {StackMotionRows} from './StackMotionRows'
import {FunnelObjections} from './FunnelObjections'
import {ReportDeliverableMock} from './ReportDeliverableMock'
import {TextBackDeliverableMock} from './TextBackDeliverableMock'
import {ProfileDeliverableMock} from './ProfileDeliverableMock'
import {ProfileAfterMoment} from './ProfileAfterMoment'
import {IndexCheckMoment, type IndexCheckEvidence} from './IndexCheckMoment'
import {SearchVisibilityLeakPair} from './SearchVisibilityLeakPair'
import {SearchRecoveryMock} from './SearchRecoveryMock'
import {
  MissedCallEvidenceCard,
  type MissedCallEvidence,
} from './MissedCallEvidenceCard'
import {
  GoogleProfileEvidenceCard,
  type GoogleProfileEvidence,
} from './GoogleProfileEvidenceCard'
import {GoogleFrontDoorPanel} from './GoogleFrontDoorPanel'
import {
  parseBlockedPages,
  parseSpeedScore,
  sanitiseBusinessName,
  sanitiseCallDay,
  sanitiseCallTime,
  sanitiseCompetitorName,
} from './funnelPersonalise'
import {FUNNEL_COLOURS, FUNNEL_CSS_VARS} from './funnelTheme'
import {Reveal, RevealList} from './funnelReveal'
import {funnelCopyForSlug} from './funnelCopy'

type FunnelPageDoc = FunnelCtaFields & {
  title?: string
  ctaLabel?: string | null
  faqs?: Array<{question?: string; answer?: string}>
}

const QUERY = `*[_type == "funnelPage" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  title,
  "slug": slug.current,
  ctaMode,
  ctaLabel,
  stripeUrl,
  schedulerUrl,
  secondaryCtaLabel,
  secondaryUrl,
  priceOptions[]{ label, ctaLabel, stripeUrl },
  faqs[]{ question, answer }
}`

function SectionLabel({
  children,
  onDark = false,
}: {
  children: React.ReactNode
  onDark?: boolean
}) {
  return (
    <p
      className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.28em] mb-4"
      style={{color: onDark ? `${FUNNEL_COLOURS.onInk}70` : FUNNEL_COLOURS.steel}}
    >
      {children}
    </p>
  )
}

function SectionRule({onDark = false}: {onDark?: boolean}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, {once: true, amount: 0.2})
  const show = reduce || inView
  return (
    <motion.div
      ref={ref}
      className="h-px w-12 mb-10 md:mb-12 origin-left"
      style={{backgroundColor: onDark ? FUNNEL_COLOURS.goldLight : FUNNEL_COLOURS.gold}}
      initial={reduce ? false : {scaleX: 0}}
      animate={show ? {scaleX: 1} : {scaleX: 0}}
      transition={{duration: 0.65, ease: [0.16, 1, 0.3, 1]}}
      aria-hidden
    />
  )
}

function ProcessDayCards({
  steps,
}: {
  steps: Array<{label: string; text: string}>
}) {
  const reduce = useReducedMotion()

  return (
    <div
      className={`grid grid-cols-1 gap-4 md:gap-5 ${
        steps.length === 2 ? 'sm:grid-cols-2 max-w-2xl' : 'sm:grid-cols-3'
      }`}
    >
      {steps.map((step, i) => (
        <motion.div
          key={i}
          className="group border bg-cream p-5 md:p-6 flex flex-col min-h-[160px] cursor-default"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}22`,
            boxShadow: '4px 4px 0 0 rgba(26,26,26,0.06)',
          }}
          initial={reduce ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.4}}
          transition={{duration: 0.45, delay: i * 0.12, ease: [0.16, 1, 0.3, 1]}}
          whileHover={
            reduce
              ? undefined
              : {
                  y: -6,
                  borderColor: FUNNEL_COLOURS.gold,
                  boxShadow: '6px 10px 0 0 rgba(197,160,89,0.28)',
                  backgroundColor: FUNNEL_COLOURS.surface,
                }
          }
        >
          <div
            className="h-px mb-4 w-8 transition-all duration-200 ease-out group-hover:w-14"
            style={{backgroundColor: FUNNEL_COLOURS.gold}}
            aria-hidden
          />
          <p
            className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3 transition-[letter-spacing] duration-200 group-hover:tracking-[0.28em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            {step.label}
          </p>
          <p
            className="font-sans text-sm md:text-[15px] leading-relaxed mt-auto"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            {step.text}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

const FunnelPage: React.FC = () => {
  const {slug} = useParams<{slug: string}>()
  const [params] = useSearchParams()
  const [doc, setDoc] = useState<FunnelPageDoc | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing' | 'error'>('loading')

  const COPY = useMemo(() => funnelCopyForSlug(slug), [slug])
  const business = useMemo(() => sanitiseBusinessName(params.get('b')), [params])
  const competitor = useMemo(() => sanitiseCompetitorName(params.get('c')), [params])
  const score = useMemo(() => parseSpeedScore(params.get('s')), [params])
  const blockedPages = useMemo(() => parseBlockedPages(params.get('n')), [params])
  const callDay = useMemo(() => sanitiseCallDay(params.get('d')), [params])
  const callTime = useMemo(() => sanitiseCallTime(params.get('t')), [params])
  const proofKind = COPY.proofKind
  const isMissedCall = proofKind === 'missed-call'
  const isGoogleProfile = proofKind === 'google-profile'
  const isSearchFix = proofKind === 'search-fix'
  const isSpeed = proofKind === 'speed'
  const motionVariant = isMissedCall
    ? 'missed-call'
    : isGoogleProfile
      ? 'google-profile'
      : isSearchFix
        ? 'search-fix'
        : 'speed'
  const calculatorVariant = isSpeed
    ? 'speed'
    : isMissedCall
      ? 'missed-call'
      : isSearchFix
        ? 'search-fix'
        : 'google-profile'
  const missedEvidence: MissedCallEvidence = useMemo(() => {
    if (business && callDay && callTime) {
      return {mode: 'tested', business, day: callDay, time: callTime}
    }
    return {mode: 'try'}
  }, [business, callDay, callTime])
  const profileEvidence: GoogleProfileEvidence = useMemo(() => {
    if (business && competitor) return {mode: 'compared', business, competitor}
    if (business) return {mode: 'named', business}
    return {mode: 'try'}
  }, [business, competitor])
  const searchEvidence: IndexCheckEvidence = useMemo(() => {
    if (business && blockedPages != null) {
      return {mode: 'live', business, pages: blockedPages}
    }
    return {mode: 'try'}
  }, [business, blockedPages])

  useEffect(() => {
    if (!slug) {
      setStatus('missing')
      return
    }
    let cancelled = false
    setStatus('loading')
    client
      .fetch(QUERY, {slug})
      .then((result: FunnelPageDoc | null) => {
        if (cancelled) return
        if (!result) {
          setDoc(null)
          setStatus('missing')
          return
        }
        setDoc(result)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  const rawLabel = doc?.ctaLabel || COPY.ctaLabel
  const ctaFields: FunnelCtaFields = {
    ctaMode: doc?.ctaMode || 'buy',
    // Authored labels already include price text. Only normalise a comma before $ into one middle dot.
    ctaLabel: rawLabel.replace(/,\s*(?=\$)/, ' · ').replace(/\s*·\s*·\s*(?=\$)/, ' · '),
    stripeUrl: doc?.stripeUrl,
    schedulerUrl: undefined,
    secondaryCtaLabel: doc?.secondaryCtaLabel,
    secondaryUrl: doc?.secondaryUrl,
    priceOptions: doc?.priceOptions,
  }

  const pageTitle = doc?.title ? `${doc.title} | SYSBILT` : 'Fixed-price fix | SYSBILT'
  const h1 = business ? COPY.h1Personal(business) : COPY.h1Generic
  const faqs =
    doc?.faqs && doc.faqs.length > 0
      ? doc.faqs.map((f) => ({q: f.question || '', a: f.answer || ''}))
      : COPY.faqs

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        ...FUNNEL_CSS_VARS,
        backgroundColor: FUNNEL_COLOURS.ground,
        color: FUNNEL_COLOURS.ink,
      }}
    >
      <PageMeta
        title={pageTitle}
        description={COPY.sub}
        canonical={slug ? `${SITE_ORIGIN}/go/${slug}` : undefined}
        robots="noindex, nofollow"
      />

      {status === 'loading' && (
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-8">
          <SysbiltLogo className="w-[110px] md:w-[130px]" />
          <p className="mt-10 font-sans" style={{color: FUNNEL_COLOURS.muted}}>
            Loading…
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-8 pb-16">
          <SysbiltLogo className="w-[110px] md:w-[130px]" />
          <p className="mt-10 font-sans" style={{color: FUNNEL_COLOURS.muted}}>
            Something went wrong loading this page. Reply to any SYSBILT email and a human answers.
          </p>
          <FunnelLegalFooter />
        </div>
      )}

      {status === 'missing' && (
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-8 pb-16">
          <SysbiltLogo className="w-[110px] md:w-[130px]" />
          <p className="mt-10 font-sans" style={{color: FUNNEL_COLOURS.muted}}>
            This offer page is not available. If you followed a link from us, reply to that email and
            we will sort it.
          </p>
          <FunnelLegalFooter />
        </div>
      )}

      {status === 'ready' && doc && (
        <>
          <header className="max-w-3xl mx-auto px-6 md:px-10 pt-8 pb-16 md:pb-20">
            <SysbiltLogo className="w-[110px] md:w-[130px]" />

            <Reveal delay={0.05} y={10}>
              <p
                className="mt-10 md:mt-12 font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]"
                style={{color: FUNNEL_COLOURS.steel}}
              >
                {COPY.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.12} y={20}>
              <h1
                className="mt-6 md:mt-8 font-serif font-bold text-[2.5rem] sm:text-5xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl"
                style={{color: FUNNEL_COLOURS.ink}}
              >
                {h1}
              </h1>
            </Reveal>

            <Reveal delay={0.22} y={14}>
              <p
                className="mt-6 md:mt-8 font-sans text-base md:text-xl leading-relaxed max-w-2xl"
                style={{color: FUNNEL_COLOURS.muted}}
              >
                {COPY.sub}
              </p>
            </Reveal>

            <Reveal delay={0.32} y={12}>
              <div className="mt-10">
                <FunnelCtaBlock fields={ctaFields} size="final" />
              </div>
            </Reveal>
          </header>

          <section
            className={`mx-auto px-6 md:px-10 pb-16 md:pb-24 ${
              isSpeed || isSearchFix ? 'max-w-3xl' : 'max-w-5xl'
            }`}
          >
            <SectionRule />
            <Reveal y={10}>
              <SectionLabel>{COPY.proofLabel}</SectionLabel>
            </Reveal>
            <Reveal delay={0.06} y={18}>
              <h2
                className="font-serif font-bold text-3xl md:text-4xl tracking-tight mb-6 md:mb-8 max-w-2xl"
                style={{color: FUNNEL_COLOURS.ink}}
              >
                {isSpeed && score != null
                  ? COPY.proofHeadingLive
                  : isSearchFix && searchEvidence.mode === 'live'
                    ? COPY.proofHeadingLive
                    : COPY.proofHeadingGeneric}
              </h2>
            </Reveal>
            {isMissedCall ? <MissedCallEvidenceCard evidence={missedEvidence} /> : null}
            {isGoogleProfile ? <GoogleProfileEvidenceCard evidence={profileEvidence} /> : null}
            {isSearchFix ? <IndexCheckMoment evidence={searchEvidence} /> : null}
            {!(isSearchFix && searchEvidence.mode === 'try') ? (
              <Reveal delay={0.12} y={12}>
                <p
                  className={`font-sans text-base md:text-lg leading-relaxed max-w-2xl ${
                    isMissedCall || isGoogleProfile || isSearchFix ? 'mt-8' : ''
                  }`}
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  {isSpeed
                    ? score != null
                      ? COPY.proofLead(business)
                      : COPY.proofLeadGeneric
                    : isSearchFix
                      ? COPY.proofLead(business)
                      : business
                        ? COPY.proofLead(business)
                        : COPY.proofLeadGeneric}
                </p>
              </Reveal>
            ) : null}
            {isMissedCall ? (
              <>
                <Reveal delay={0.08} y={12}>
                  <p
                    className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {COPY.proofAfterGeneric}
                  </p>
                </Reveal>
                <MissedCallLeakPair businessName={business} />
              </>
            ) : isGoogleProfile ? (
              <>
                <Reveal delay={0.08} y={12}>
                  <p
                    className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {COPY.proofAfterGeneric}
                  </p>
                </Reveal>
                <GoogleFrontDoorPanel businessName={business} competitorName={competitor} />
              </>
            ) : isSearchFix ? (
              <>
                {searchEvidence.mode === 'live' ? (
                  <Reveal delay={0.08} y={12}>
                    <p
                      className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      {COPY.proofAfter}
                    </p>
                  </Reveal>
                ) : null}
                <SearchVisibilityLeakPair />
              </>
            ) : (
              <>
                <ScoreMoment
                  businessName={business}
                  score={score ?? 34}
                  mode={score != null ? 'live' : 'example'}
                />
                <Reveal delay={0.08} y={12}>
                  <p
                    className="mt-8 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {score != null ? COPY.proofAfter : COPY.proofAfterGeneric}
                  </p>
                </Reveal>
              </>
            )}
          </section>

          <section
            className="w-full py-16 md:py-24 mb-0"
            style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
          >
            <div className="max-w-5xl mx-auto px-6 md:px-10">
              <SectionRule onDark />
              <Reveal y={10}>
                <SectionLabel onDark>{COPY.painLabel}</SectionLabel>
              </Reveal>
              <Reveal delay={0.06} y={18}>
                <h2
                  className="font-serif font-bold text-3xl md:text-4xl tracking-tight mb-8 md:mb-10 max-w-2xl"
                  style={{color: FUNNEL_COLOURS.onInk}}
                >
                  {COPY.painHeading}
                </h2>
              </Reveal>
              <RevealList className="space-y-7 mb-12 md:mb-14 max-w-2xl" stagger={0.14}>
                {COPY.painLines.map((line, i) => (
                  <li
                    key={i}
                    className="font-sans text-lg md:text-xl leading-relaxed"
                    style={{color: `${FUNNEL_COLOURS.onInk}CC`}}
                  >
                    {line}
                  </li>
                ))}
              </RevealList>
              {isMissedCall ? (
                <MissedCallPainCards />
              ) : isGoogleProfile ? (
                <GoogleProfilePainCards />
              ) : isSearchFix ? (
                <SearchPainCards />
              ) : (
                <PainCostCards />
              )}
              <LostClientCalculator variant={calculatorVariant} theme="dark" />
            </div>
          </section>

          <section className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-24">
            <SectionRule />
            <Reveal y={10}>
              <SectionLabel>{COPY.bridgeLabel}</SectionLabel>
            </Reveal>
            <Reveal delay={0.06} y={18}>
              <h2
                className="font-serif font-bold text-3xl md:text-4xl tracking-tight mb-6 max-w-2xl"
                style={{color: FUNNEL_COLOURS.ink}}
              >
                {COPY.bridgeHeading}
              </h2>
            </Reveal>
            <Reveal delay={0.12} y={12}>
              <p
                className="font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                style={{color: FUNNEL_COLOURS.muted}}
              >
                {COPY.bridgeBody}
              </p>
            </Reveal>

            <Reveal delay={0.08} y={12}>
              <p
                className="mt-12 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                style={{color: FUNNEL_COLOURS.muted}}
              >
                {COPY.bridgeGaugeCaption}
              </p>
            </Reveal>
            {isMissedCall ? (
              <CallMissedMoment businessName={business} mode="after" />
            ) : isGoogleProfile ? (
              <ProfileAfterMoment businessName={business} />
            ) : isSearchFix ? (
              <SearchRecoveryMock />
            ) : (
              <ScoreMoment score={90} mode="benchmark" />
            )}
          </section>

          <section
            className="w-full py-16 md:py-24"
            style={{backgroundColor: FUNNEL_COLOURS.surfaceGold}}
          >
            <div className="max-w-5xl mx-auto px-6 md:px-10">
              <SectionRule />
              <Reveal y={10}>
                <SectionLabel>{COPY.benefitsLabel}</SectionLabel>
              </Reveal>
              <Reveal delay={0.06} y={18}>
                <h2
                  className="font-serif font-bold text-3xl md:text-4xl tracking-tight mb-10 max-w-2xl"
                  style={{color: FUNNEL_COLOURS.ink}}
                >
                  {COPY.benefitsHeading}
                </h2>
              </Reveal>
              <BenefitMotionRows
                benefits={COPY.benefits}
                ink={FUNNEL_COLOURS.ink}
                muted={FUNNEL_COLOURS.muted}
                gold={FUNNEL_COLOURS.goldDeep}
                variant={motionVariant}
              />
            </div>
          </section>

          <section className="max-w-3xl mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-24">
            <SectionRule />
            <Reveal y={10}>
              <SectionLabel>{COPY.processLabel}</SectionLabel>
            </Reveal>
            <Reveal delay={0.06} y={18}>
              <h2
                className="font-serif font-bold text-3xl md:text-4xl tracking-tight mb-10 max-w-2xl"
                style={{color: FUNNEL_COLOURS.ink}}
              >
                {COPY.processHeading}
              </h2>
            </Reveal>
            <ProcessDayCards steps={COPY.processSteps} />
            <Reveal delay={0.1} y={10}>
              <p
                className="mt-10 font-sans text-sm md:text-base leading-relaxed max-w-2xl"
                style={{color: FUNNEL_COLOURS.muted}}
              >
                {COPY.scopeLine}
              </p>
            </Reveal>
            <Reveal delay={0.16} y={10}>
              <div className="mt-10">
                <FunnelCtaBlock fields={ctaFields} size="lg" />
              </div>
            </Reveal>
          </section>

          <section className="max-w-5xl mx-auto px-6 md:px-10 pb-16 md:pb-24">
            <SectionRule />
            <Reveal y={10}>
              <SectionLabel>{COPY.stackLabel}</SectionLabel>
            </Reveal>
            <Reveal delay={0.06} y={18}>
              <h2
                className="font-serif font-bold text-3xl md:text-4xl tracking-tight mb-10 max-w-2xl"
                style={{color: FUNNEL_COLOURS.ink}}
              >
                {COPY.stackHeading}
              </h2>
            </Reveal>
            <StackMotionRows
              items={COPY.stackItems}
              ink={FUNNEL_COLOURS.ink}
              muted={FUNNEL_COLOURS.muted}
              variant={motionVariant}
            />
          </section>

          <section
            className="w-full py-16 md:py-24 mb-16 md:mb-24 overflow-hidden"
            style={{backgroundColor: FUNNEL_COLOURS.inkSoft, color: FUNNEL_COLOURS.onInk}}
          >
            <div className="max-w-5xl mx-auto px-6 md:px-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 md:items-stretch">
                <div className="flex flex-col justify-center">
                  <Reveal y={10}>
                    <p
                      className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.28em] mb-4"
                      style={{color: `${FUNNEL_COLOURS.onInk}70`}}
                    >
                      {COPY.priceLabel}
                    </p>
                  </Reveal>
                  <Reveal delay={0.08} y={22}>
                    <p
                      className="font-serif font-bold text-5xl md:text-7xl tracking-tight mb-6"
                      style={{color: FUNNEL_COLOURS.onInk}}
                    >
                      {COPY.price}
                    </p>
                  </Reveal>
                  <Reveal delay={0.14} y={12}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-xl mb-4"
                      style={{color: `${FUNNEL_COLOURS.onInk}CC`}}
                    >
                      {COPY.priceLead}
                    </p>
                  </Reveal>
                  <Reveal delay={0.2} y={10}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-xl mb-4"
                      style={{color: `${FUNNEL_COLOURS.onInk}B3`}}
                    >
                      {COPY.guarantee}
                    </p>
                  </Reveal>
                  <Reveal delay={0.24} y={8}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-xl mb-10"
                      style={{color: FUNNEL_COLOURS.goldLight}}
                    >
                      {COPY.priceAnchor}
                    </p>
                  </Reveal>
                  <Reveal delay={0.28} y={10}>
                    <FunnelCtaBlock fields={ctaFields} theme="dark" size="xl" />
                  </Reveal>
                </div>

                {isMissedCall ? (
                  <TextBackDeliverableMock />
                ) : isGoogleProfile ? (
                  <ProfileDeliverableMock />
                ) : isSearchFix ? (
                  <SearchRecoveryMock compact onDark />
                ) : (
                  <ReportDeliverableMock />
                )}
              </div>
            </div>
          </section>

          <FunnelObjections
            label={COPY.faqLabel}
            heading={COPY.faqHeading}
            faqs={faqs}
          />

          <section
            className="w-full relative overflow-hidden"
            style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.14]"
              style={{
                background:
                  'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226,30,63,0.55) 0%, transparent 55%)',
              }}
              aria-hidden
            />
            <div className="relative max-w-4xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-16 md:pb-20 text-center flex flex-col items-center">
              <Reveal y={10}>
                <p
                  className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.32em] mb-6"
                  style={{color: FUNNEL_COLOURS.goldLight}}
                >
                  {COPY.finalLabel}
                </p>
              </Reveal>
              <Reveal delay={0.08} y={24}>
                <h2
                  className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6 max-w-3xl leading-[1.05]"
                  style={{color: FUNNEL_COLOURS.onInk}}
                >
                  {COPY.finalHeading}
                </h2>
              </Reveal>
              <Reveal delay={0.16} y={14}>
                <p
                  className="font-sans text-lg md:text-xl leading-relaxed mb-12 md:mb-14 max-w-2xl"
                  style={{color: `${FUNNEL_COLOURS.onInk}B8`}}
                >
                  {COPY.finalLine}
                </p>
              </Reveal>
              <Reveal delay={0.24} y={12}>
                <FunnelCtaBlock
                  fields={ctaFields}
                  theme="dark"
                  size="final"
                  align="center"
                />
              </Reveal>
            </div>
            <div className="relative max-w-4xl mx-auto px-6 md:px-10 pb-10">
              <FunnelLegalFooter theme="dark" />
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default FunnelPage
