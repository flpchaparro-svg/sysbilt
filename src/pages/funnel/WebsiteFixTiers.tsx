import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'
import {WEBSITE_STRIPE_ENROLMENT} from '../../constants/websiteStripe'

const EASE = [0.16, 1, 0.3, 1] as const

const TIERS = [
  {
    code: 'brochure' as const,
    name: 'Brochure',
    pages: 'One page',
    price: '$120/mo',
    start: 'Today $120',
    blurb: 'Who you are, what you do, hours, map, and a form to your email.',
    bars: [92],
    featured: false,
  },
  {
    code: 'practice' as const,
    name: 'Practice',
    pages: 'Five to seven pages',
    price: '$160/mo',
    start: 'Today $160',
    blurb: 'Room for services, about, and proof. The sweet spot for most.',
    bars: [88, 72, 64, 54, 48],
    featured: true,
  },
  {
    code: 'full' as const,
    name: 'Full site',
    pages: 'Nine to twelve pages',
    price: '$190/mo',
    start: 'Today $190',
    blurb: 'More room when the work needs explaining across more pages.',
    bars: [90, 78, 70, 62, 55, 48, 42, 36],
    featured: false,
  },
] as const

function PageStack({bars, featured}: {bars: readonly number[]; featured: boolean}) {
  return (
    <div
      className="relative h-[108px] md:h-[118px] rounded-sm border overflow-hidden px-3 py-3 flex flex-col justify-end gap-1.5"
      style={{
        borderColor: featured ? `${FUNNEL_COLOURS.goldDeep}40` : `${FUNNEL_COLOURS.ink}12`,
        backgroundColor: featured ? `${FUNNEL_COLOURS.goldDeep}08` : `${FUNNEL_COLOURS.ink}04`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-7 flex items-center gap-1.5 px-2.5 border-b"
        style={{
          borderColor: `${FUNNEL_COLOURS.ink}2C`,
          backgroundColor: FUNNEL_COLOURS.surface,
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: '#D4726A'}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: FUNNEL_COLOURS.gold}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.ink}28`}} />
      </div>
      <div className="mt-5 flex flex-col gap-1.5 justify-end flex-1">
        {bars.map((w, i) => (
          <div
            key={i}
            className="h-1.5 rounded-sm"
            style={{
              width: `${w}%`,
              backgroundColor:
                i === 0
                  ? featured
                    ? FUNNEL_COLOURS.goldDeep
                    : `${FUNNEL_COLOURS.ink}35`
                  : `${FUNNEL_COLOURS.ink}${featured ? '18' : '12'}`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * The Fix visual: three hosted-site sizes, all visible, no click required.
 */
export function WebsiteFixTiers() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.25})
  const reduce = useReducedMotion()
  const show = reduce || inView

  return (
    <div ref={ref} className="mt-12 md:mt-14">
      <motion.div
        className="mb-6 md:mb-8 inline-flex items-center gap-3 border px-3.5 py-2"
        style={{
          borderColor: `${FUNNEL_COLOURS.goldDeep}40`,
          backgroundColor: `${FUNNEL_COLOURS.goldDeep}10`,
        }}
        initial={reduce ? false : {opacity: 0, y: 10}}
        animate={show ? {opacity: 1, y: 0} : undefined}
        transition={{duration: 0.45, ease: EASE}}
      >
        <span
          className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          Typical build
        </span>
        <span
          className="font-serif text-lg font-bold tracking-tight"
          style={{color: FUNNEL_COLOURS.ink}}
        >
          14 days
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
        {TIERS.map((tier, i) => (
          <motion.article
            key={tier.name}
            className="relative flex flex-col overflow-hidden"
            style={{
              border: `1px solid ${
                tier.featured ? `${FUNNEL_COLOURS.goldDeep}50` : `${FUNNEL_COLOURS.ink}14`
              }`,
              backgroundColor: FUNNEL_COLOURS.surface,
              boxShadow: tier.featured
                ? `0 22px 48px -28px ${FUNNEL_COLOURS.ink}55`
                : `0 16px 36px -28px ${FUNNEL_COLOURS.ink}40`,
            }}
            initial={reduce ? false : {opacity: 0, y: 22}}
            animate={show ? {opacity: 1, y: 0} : undefined}
            transition={{duration: 0.5, delay: 0.08 + i * 0.1, ease: EASE}}
          >
            {tier.featured ? (
              <div
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{
                  background: `linear-gradient(90deg, ${FUNNEL_COLOURS.goldDeep}, ${FUNNEL_COLOURS.gold})`,
                }}
                aria-hidden
              />
            ) : null}

            <div
              className="px-4 pt-4 pb-3 border-b flex items-start justify-between gap-2"
              style={{
                borderColor: tier.featured
                  ? `${FUNNEL_COLOURS.goldDeep}22`
                  : `${FUNNEL_COLOURS.ink}2C`,
                backgroundColor: tier.featured
                  ? `${FUNNEL_COLOURS.goldDeep}0C`
                  : `${FUNNEL_COLOURS.ink}12`,
              }}
            >
              <div>
                <p
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    color: tier.featured ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.steel,
                  }}
                >
                  {tier.featured ? 'Sweet spot' : `Size 0${i + 1}`}
                </p>
                <h3
                  className="mt-1.5 font-serif text-xl md:text-[1.35rem] font-bold tracking-tight"
                  style={{color: FUNNEL_COLOURS.ink}}
                >
                  {tier.name}
                </h3>
              </div>
              <div className="text-right shrink-0">
                <p
                  className="font-serif text-lg font-bold tabular-nums"
                  style={{color: FUNNEL_COLOURS.ink}}
                >
                  {tier.price}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em]" style={{color: FUNNEL_COLOURS.muted}}>
                  {tier.start}
                </p>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col gap-3.5">
              <PageStack bars={tier.bars} featured={tier.featured} />
              <p
                className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{color: FUNNEL_COLOURS.steel}}
              >
                {tier.pages}
              </p>
              <p className="font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
                {tier.blurb}
              </p>
              <a
                href={WEBSITE_STRIPE_ENROLMENT[tier.code].stripeUrl}
                className="mt-auto inline-flex items-center justify-center px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: tier.featured ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.ink,
                  color: FUNNEL_COLOURS.onInk,
                }}
              >
                Start {tier.name} · ${WEBSITE_STRIPE_ENROLMENT[tier.code].amountAud} today
              </a>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.p
        className="mt-7 md:mt-8 font-sans text-sm md:text-base leading-relaxed max-w-2xl"
        style={{color: FUNNEL_COLOURS.muted}}
        initial={reduce ? false : {opacity: 0}}
        animate={show ? {opacity: 1} : undefined}
        transition={{duration: 0.45, delay: 0.4}}
      >
        Same care under all three: form to your email, hosting, search basics, privacy and terms when
        needed. Pick by how much room you need, not by how much tech you want to learn.
      </motion.p>
    </div>
  )
}
