import React, {useEffect, useMemo, useState} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {useParams, useSearchParams} from 'react-router-dom'
import {SysbiltLogo} from '../../components/SysbiltLogo'
import {PageMeta} from '../../components/PageMeta'
import {client} from '../../sanityClient'
import {SITE_ORIGIN} from '../../constants/seoMeta'
import {FunnelCtaBlock, FunnelLegalFooter, type FunnelCtaFields} from './FunnelCtaBlock'
import {ScoreMoment} from './ScoreMoment'
import {PainCostCards} from './PainCostCards'
import {LostClientCalculator} from './LostClientCalculator'
import {BenefitMotionRows} from './BenefitMotionRows'
import {StackMotionRows} from './StackMotionRows'
import {FunnelObjections} from './FunnelObjections'
import {ReportDeliverableMock} from './ReportDeliverableMock'
import {parseSpeedScore, sanitiseBusinessName} from './funnelPersonalise'
import {FUNNEL_COLOURS, FUNNEL_CSS_VARS} from './funnelTheme'
import {Reveal, RevealList} from './funnelReveal'

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

/** Clear 9-block narrative for Speed Fix — structure first, CMS polish later. */
const COPY = {
  eyebrow: 'Fixed price · Three days · Measured result',
  h1Generic: "Three days from now your site is fast, and Google's own score proves it",
  h1Personal: (b: string) =>
    `${b}, three days from now your site is fast, and Google's own score proves it`,
  sub: "Slow pages lose people before they even appear, and Google ranks them lower for it. We fix it, then run the same public test again so you can watch the number change.",
  ctaLabel: 'Fix my website · $1,200',
  proofLabel: 'Your score',
  proofHeadingLive: 'This is you, right now',
  proofHeadingGeneric: 'We measure before we touch anything',
  proofLead: (b: string | null) =>
    b
      ? `We already ran ${b} through Google's speed test. This is your mobile score today.`
      : "We already ran your site through Google's speed test. This is your mobile score today.",
  proofAfter:
    "That number isn't our opinion, it's Google's. When we're done, we run the same test again and you watch what changed.",
  painLabel: 'What this is costing you',
  painHeading: "You're paying for traffic that never becomes a lead",
  painLines: [
    "Someone finds you, taps the link, waits, and leaves. They don't complain. They just call the next business.",
    "You feel it as quiet weeks and ads that don't work, when the real leak is a page that loads too late.",
    'Google prefers faster sites. While yours lags, competitors with the same offer sit above you.',
    "And every day you wait, you buy the same problem again: visitors who never see what you sell.",
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'One job, fixed scope, a number you can verify',
  bridgeBody:
    "This isn't a redesign, a retainer, or a twelve month agency relationship. It's a three day speed overhaul on the site you already have, measured before and after with Google's public tools. No meetings about meetings, no discovery workshops, no surprise invoice in month four.",
  bridgeGaugeCaption:
    "Three days later, the same test. Google calls 90 and up good. That's the band we tune toward, and we keep working until the improvement is real.",
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'People stay long enough to act',
      text: 'Pages that open fast stop the bounce. More of the traffic you already pay for gets a chance to enquire.',
    },
    {
      title: 'Google stops punishing the delay',
      text: 'Speed is a ranking signal. Closing the gap gives you a fairer fight against faster competitors.',
    },
    {
      title: 'You get proof, not a vibe',
      text: 'Before and after scores from the same public test. A number you can forward to anyone.',
    },
    {
      title: 'Done in three business days',
      text: "From the moment we have access. Most jobs finish faster, and you're never waiting on a slot.",
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Three days, then the proof lands',
  processSteps: [
    {
      label: 'Day 1',
      text: "Access, backup, and a full audit of what's actually slowing you down.",
    },
    {
      label: 'Day 2',
      text: 'The overhaul: images, scripts, caching, mobile-first tuning.',
    },
    {
      label: 'Day 3',
      text: 'Re-test, tune again, and send the before and after report.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full job, nothing extra to buy',
  stackItems: [
    {
      title: 'Full speed overhaul',
      text: 'Images, scripts, caching and mobile performance, delivered within three business days of access.',
    },
    {
      title: 'Before and after Google reports',
      text: 'Side by side, from the same public tools we used to score you.',
    },
    {
      title: 'Plain-English summary',
      text: 'What changed, why it mattered, and what to leave alone.',
    },
    {
      title: 'Systems Snapshot',
      text: "A one-page read on your website, lead handling, follow-up, reviews and automation, plus the one thing we'd fix next.",
    },
    {
      title: '14 days of aftercare',
      text: 'If anything we touched misbehaves, we sort it, no charge.',
    },
  ],
  scopeLine:
    'Works on WordPress, Shopify, Squarespace, Wix and custom builds. One site, up to 30 pages. Bigger builds get a same-day quote so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$1,200',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    "Our promise: we measure before and after. If the improvement isn't real, we keep working at no extra cost until it is.",
  priceAnchor:
    "That's about one client you'd otherwise lose. The leak charges you every month. This charges you once.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Is this refundable?',
      a: "There is no change-of-mind refund, because we start straight away. What you have instead is stronger: if the measured improvement isn't real, we keep working at no extra cost until it is.",
    },
    {
      q: 'Will anything break?',
      a: 'We back everything up before we start and test as we go. Anything we touched that misbehaves inside 14 days gets fixed free.',
    },
    {
      q: 'How long does it take?',
      a: 'Three business days from the moment we have access. Most jobs finish faster.',
    },
    {
      q: 'What do you need from me?',
      a: 'A short access form after payment — how your site is built and how we should get in. About five minutes, plain English.',
    },
    {
      q: 'Why is this cheaper than an agency retainer?',
      a: 'Because it is one job with a fixed scope, not a relationship. We made it repeatable. You get the benefit of that.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Three days from now, your site is fast and you have the proof',
  finalLine:
    'Same Google test, new number. The before and after land in your inbox, and the score speaks for itself.',
}

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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
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

  const business = useMemo(() => sanitiseBusinessName(params.get('b')), [params])
  const score = useMemo(() => parseSpeedScore(params.get('s')), [params])

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
    ctaLabel: rawLabel.replace(/,\s*(?=\$)/, ' · ').replace(/\s+\$/, ' · $'),
    stripeUrl: doc?.stripeUrl,
    schedulerUrl: doc?.schedulerUrl,
    secondaryCtaLabel: doc?.secondaryCtaLabel,
    secondaryUrl: doc?.secondaryUrl,
    priceOptions: doc?.priceOptions,
  }

  const pageTitle = doc?.title ? `${doc.title} | SYSBILT` : 'Website Speed Fix | SYSBILT'
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
        // Selection: navy on cream-ink
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
          {/* 1. HERO — cool trust ground */}
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

          {/* 2. PROOF */}
          <section className="max-w-3xl mx-auto px-6 md:px-10 pb-16 md:pb-24">
            <SectionRule />
            <Reveal y={10}>
              <SectionLabel>{COPY.proofLabel}</SectionLabel>
            </Reveal>
            <Reveal delay={0.06} y={18}>
              <h2
                className="font-serif font-bold text-3xl md:text-4xl tracking-tight mb-6 md:mb-8 max-w-2xl"
                style={{color: FUNNEL_COLOURS.ink}}
              >
                {score != null ? COPY.proofHeadingLive : COPY.proofHeadingGeneric}
              </h2>
            </Reveal>
            <Reveal delay={0.12} y={12}>
              <p
                className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-2"
                style={{color: FUNNEL_COLOURS.muted}}
              >
                {score != null
                  ? COPY.proofLead(business)
                  : "Google scores every site out of 100 on mobile. We use that number before and after so the result is public, not our spin. Here's what a typical slow score looks like."}
              </p>
            </Reveal>
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
                {score != null
                  ? COPY.proofAfter
                  : "That number isn't our opinion, it's Google's. When we run your site, this dial shows your real score — and after the fix, we run the same test again."}
              </p>
            </Reveal>
          </section>

          {/* 3. PAIN — dark band + copy kept; cream motion cards added below */}
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
              <PainCostCards />
              <LostClientCalculator />
            </div>
          </section>

          {/* 4. SOLUTION BRIDGE + after score (design mock: 95 green) */}
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
            <ScoreMoment score={90} mode="benchmark" />
          </section>

          {/* 5. BENEFIT STACK — copy kept; small motion panels beside on desktop */}
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
              />
            </div>
          </section>

          {/* 6. PROCESS */}
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

          {/* 7. VALUE STACK — copy kept; motion strips added */}
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
            />
          </section>

          {/* 8. PRICE — bigger CTA + promise portrait */}
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

                <ReportDeliverableMock />
              </div>
            </div>
          </section>

          {/* 9. OBJECTIONS */}
          <FunnelObjections
            label={COPY.faqLabel}
            heading={COPY.faqHeading}
            faqs={faqs}
          />

          {/* 10. FINAL CLOSE — the kill shot */}
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
