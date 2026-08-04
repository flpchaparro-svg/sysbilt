import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

function initialsOf(name?: string | null) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return null
  return parts
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}

/** Proof: five logins vs one weekly board. */
export function DashboardLiteEvidenceCard({business}: {business?: string | null}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const go = !reduce && inView
  const initials = initialsOf(business)

  return (
    <motion.div
      ref={ref}
      className="mt-2 rounded-xl overflow-hidden border max-w-2xl"
      style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.surface}}
      initial={reduce ? false : {opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.5, ease: EASE}}
    >
      <div
        className="px-3 py-2.5 flex items-center gap-2"
        style={{backgroundColor: `${FUNNEL_COLOURS.ink}16`}}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.accent}70`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.gold}80`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.ink}25`}} />
        {initials ? (
          <span
            className="ml-1 h-5 min-w-[20px] px-1 rounded-sm flex items-center justify-center font-mono text-[7px] font-bold"
            style={{backgroundColor: `${FUNNEL_COLOURS.ink}2C`, color: FUNNEL_COLOURS.steel}}
          >
            {initials}
          </span>
        ) : null}
        <span
          className="ml-auto font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          Dashboard lite
        </span>
      </div>

      <div className="p-4 md:p-5 grid grid-cols-2 gap-3">
        <motion.div
          className="rounded-lg border px-3 py-3"
          style={{borderColor: `${FUNNEL_COLOURS.accent}45`, backgroundColor: `${FUNNEL_COLOURS.accent}08`}}
          initial={reduce ? false : {opacity: 0, y: 8}}
          animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.45}}
          transition={{delay: reduce ? 0 : 0.1, duration: 0.35, ease: EASE}}
        >
          <p className="font-mono text-[8px] font-bold uppercase tracking-wide mb-2" style={{color: FUNNEL_COLOURS.accent}}>
            Before
          </p>
          <div className="grid grid-cols-2 gap-1 mb-2">
            {['Ads', 'CRM', 'Book', 'Reviews'].map((label) => (
              <div
                key={label}
                className="rounded-sm py-1.5 text-center font-mono text-[7px] font-bold uppercase"
                style={{backgroundColor: `${FUNNEL_COLOURS.accent}28`, color: FUNNEL_COLOURS.accent}}
              >
                {label}
              </div>
            ))}
          </div>
          <p className="font-sans text-[12px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
            Five logins
          </p>
          <p className="font-mono text-[10px]" style={{color: FUNNEL_COLOURS.accent}}>
            Week already gone
          </p>
        </motion.div>
        <motion.div
          className="rounded-lg border px-3 py-3"
          style={{borderColor: `${FUNNEL_COLOURS.goldDeep}45`, backgroundColor: '#fff'}}
          initial={reduce ? false : {opacity: 0, y: 8}}
          animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.45}}
          transition={{delay: reduce ? 0 : 0.35, duration: 0.4, ease: EASE}}
        >
          <p className="font-mono text-[8px] font-bold uppercase tracking-wide mb-2" style={{color: FUNNEL_COLOURS.goldDeep}}>
            After
          </p>
          <div
            className="h-16 rounded-sm mb-2 grid grid-cols-2 gap-1 p-1.5"
            style={{backgroundColor: `${FUNNEL_COLOURS.gold}22`}}
          >
            {['Leads', 'Bookings', 'Reviews', 'Ads'].map((label) => (
              <div
                key={label}
                className="rounded-sm flex items-center justify-center font-mono text-[7px] font-bold uppercase"
                style={{backgroundColor: '#fff', color: FUNNEL_COLOURS.goldDeep}}
              >
                {label}
              </div>
            ))}
          </div>
          <p className="font-sans text-[12px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
            One board
          </p>
          <p className="font-mono text-[10px]" style={{color: FUNNEL_COLOURS.goldDeep}}>
            Monday check
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
