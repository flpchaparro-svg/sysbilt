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

const ROWS = [
  {q: 'Do you cover emergency call-outs?', a: 'Yes, same day across the service area.'},
  {q: 'What suburbs do you work in?', a: 'Bayside and the inner south east.'},
  {q: 'How much does a typical job cost?', a: 'Quoted before we start.'},
]

/** Proof: empty FAQ rows fill into clear Q/A as schema lights up. */
export function SchemaFaqEvidenceCard({business}: {business?: string | null}) {
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
        <motion.span
          className="ml-1 rounded-sm px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.12em]"
          style={{backgroundColor: FUNNEL_COLOURS.gold, color: FUNNEL_COLOURS.ink}}
          initial={reduce ? false : {opacity: 0, scale: 0.92}}
          animate={go || reduce ? {opacity: 1, scale: 1} : {opacity: 0.35, scale: 0.96}}
          transition={{delay: go ? 0.55 : 0, type: 'spring', stiffness: 340, damping: 22}}
        >
          Schema
        </motion.span>
        <span
          className="ml-auto font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          Service FAQ
        </span>
      </div>

      <div className="p-4 md:p-5 space-y-2.5">
        {ROWS.map((row, i) => (
          <motion.div
            key={row.q}
            className="rounded-lg border px-3 py-2.5"
            style={{
              borderColor: `${FUNNEL_COLOURS.goldDeep}40`,
              backgroundColor: '#fff',
            }}
            initial={reduce ? false : {opacity: 0, y: 10}}
            animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.4}}
            transition={{delay: reduce ? 0 : 0.12 + i * 0.12, duration: 0.4, ease: EASE}}
          >
            <div className="flex items-start gap-2.5">
              <span
                className="mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center font-mono text-[8px] font-bold"
                style={{backgroundColor: `${FUNNEL_COLOURS.gold}30`, color: FUNNEL_COLOURS.goldDeep}}
              >
                Q
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[12px] font-semibold leading-snug" style={{color: FUNNEL_COLOURS.ink}}>
                  {row.q}
                </p>
                <motion.p
                  className="mt-1 font-sans text-[11px] leading-snug"
                  style={{color: FUNNEL_COLOURS.steel}}
                  initial={reduce ? false : {opacity: 0, height: 0}}
                  animate={go || reduce ? {opacity: 1, height: 'auto'} : {opacity: 0}}
                  transition={{delay: reduce ? 0 : 0.28 + i * 0.12, duration: 0.35}}
                >
                  <span className="font-mono text-[8px] font-bold uppercase tracking-wide mr-1.5" style={{color: FUNNEL_COLOURS.goldDeep}}>
                    A
                  </span>
                  {row.a}
                </motion.p>
              </div>
              <span className="font-mono text-[10px] shrink-0 mt-0.5" style={{color: FUNNEL_COLOURS.goldDeep}}>
                −
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
