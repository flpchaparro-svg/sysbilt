import React from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const TIERS = [
  {name: 'Brochure', price: '$120', pages: '1 page'},
  {name: 'Practice', price: '$160', pages: '5–7 pages', featured: true},
  {name: 'Full site', price: '$190', pages: '9–12 pages'},
] as const

/**
 * Investment-band mock for Hosted Website Plan: three sizes + live form care.
 */
export function WebsiteDeliverableMock() {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const play = reduce || inView

  return (
    <div ref={ref} className="relative min-h-[320px] md:min-h-full flex items-center">
      <motion.div
        className="w-full max-w-sm mx-auto border overflow-hidden"
        style={{
          borderColor: `${FUNNEL_COLOURS.onInk}22`,
          backgroundColor: FUNNEL_COLOURS.surface,
          boxShadow: `10px 14px 0 0 ${FUNNEL_COLOURS.ink}55`,
        }}
        initial={reduce ? false : {opacity: 0, y: 20, rotate: 1.5}}
        whileInView={{opacity: 1, y: 0, rotate: 0.5}}
        viewport={{once: true, amount: 0.4}}
        transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
      >
        <div
          className="px-4 py-3 border-b flex items-center gap-2"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}14`,
            backgroundColor: FUNNEL_COLOURS.ground,
          }}
        >
          <span className="h-2 w-2 rounded-full" style={{backgroundColor: '#D4726A'}} />
          <span className="h-2 w-2 rounded-full" style={{backgroundColor: FUNNEL_COLOURS.gold}} />
          <span className="h-2 w-2 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.ink}28`}} />
          <span
            className="ml-2 font-mono text-[9px] uppercase tracking-[0.16em] truncate"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            Hosted plan · Live
          </span>
        </div>

        <div className="p-5 md:p-6 space-y-4">
          <div>
            <p
              className="font-mono text-[9px] uppercase tracking-[0.2em]"
              style={{color: FUNNEL_COLOURS.steel}}
            >
              Built by us · Hosted by us
            </p>
            <p className="mt-1 font-serif text-lg md:text-xl" style={{color: FUNNEL_COLOURS.ink}}>
              One monthly plan. Three sizes.
            </p>
          </div>

          <div className="space-y-2">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                className="flex items-center justify-between gap-3 rounded-sm border px-3 py-2.5"
                style={{
                  borderColor: tier.featured
                    ? `${FUNNEL_COLOURS.goldDeep}45`
                    : `${FUNNEL_COLOURS.ink}14`,
                  backgroundColor: tier.featured
                    ? `${FUNNEL_COLOURS.goldDeep}12`
                    : FUNNEL_COLOURS.ground,
                }}
                initial={reduce ? false : {opacity: 0, x: 10}}
                animate={play ? {opacity: 1, x: 0} : {opacity: 0, x: 10}}
                transition={{delay: reduce ? 0 : 0.15 + i * 0.1, duration: 0.35}}
              >
                <div className="min-w-0">
                  <p
                    className="font-sans text-sm font-semibold"
                    style={{color: FUNNEL_COLOURS.ink}}
                  >
                    {tier.name}
                  </p>
                  <p
                    className="font-mono text-[9px] uppercase tracking-[0.12em]"
                    style={{color: FUNNEL_COLOURS.steel}}
                  >
                    {tier.pages}
                  </p>
                </div>
                <p
                  className="font-serif text-base font-bold tabular-nums shrink-0"
                  style={{color: FUNNEL_COLOURS.ink}}
                >
                  {tier.price}
                  <span
                    className="font-mono text-[9px] font-bold uppercase tracking-wider ml-1"
                    style={{color: FUNNEL_COLOURS.steel}}
                  >
                    /mo
                  </span>
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="rounded-sm border px-3 py-3"
            style={{
              borderColor: `${FUNNEL_COLOURS.ink}14`,
              backgroundColor: '#fff',
            }}
            initial={reduce ? false : {opacity: 0, y: 8}}
            animate={play ? {opacity: 1, y: 0} : {opacity: 0, y: 8}}
            transition={{delay: reduce ? 0 : 0.5, duration: 0.35}}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <p
                className="font-mono text-[8px] uppercase tracking-[0.16em]"
                style={{color: FUNNEL_COLOURS.steel}}
              >
                Contact form
              </p>
              <motion.span
                className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] px-1.5 py-0.5 text-white"
                style={{backgroundColor: '#1a7a4c'}}
                animate={play && !reduce ? {opacity: [0.7, 1, 0.7]} : undefined}
                transition={{duration: 1.8, repeat: Infinity}}
              >
                To your email
              </motion.span>
            </div>
            <p className="font-sans text-xs leading-snug" style={{color: FUNNEL_COLOURS.muted}}>
              Start fee is setup plus first month. About 14 days to live.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
