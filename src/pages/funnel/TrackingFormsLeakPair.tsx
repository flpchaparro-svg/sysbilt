import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Leak: blind spend beside a clean event → inbox trail.
 */
export function TrackingFormsLeakPair() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.3})
  const reduce = useReducedMotion()
  const go = !reduce && inView

  return (
    <motion.div
      ref={ref}
      className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
      initial={reduce ? false : {opacity: 0, y: 22}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.55, ease: EASE}}
    >
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.accent}55`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.accent}}
        >
          Blind
        </div>
        <div className="p-4 md:p-5 flex flex-col justify-center gap-2.5 min-h-[168px]">
          {['Form submit', 'Call click', 'Book tap'].map((label) => (
            <div
              key={label}
              className="rounded-lg border border-dashed px-3 py-2.5 flex items-center gap-2.5"
              style={{borderColor: `${FUNNEL_COLOURS.accent}55`, backgroundColor: `${FUNNEL_COLOURS.accent}08`}}
            >
              <span
                className="h-5 w-5 shrink-0 rounded-full border border-dashed flex items-center justify-center font-mono text-[8px] font-bold"
                style={{borderColor: FUNNEL_COLOURS.accent, color: FUNNEL_COLOURS.accent}}
              >
                ?
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[11px] font-semibold leading-snug" style={{color: FUNNEL_COLOURS.ink}}>
                  {label}
                </p>
                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.accent}}>
                  No event · Wrong inbox
                </p>
              </div>
            </div>
          ))}
          <p
            className="mt-1 text-center font-mono text-[9px] font-bold uppercase tracking-[0.14em]"
            style={{color: FUNNEL_COLOURS.accent}}
          >
            Guesswork
          </p>
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.accent, backgroundColor: `${FUNNEL_COLOURS.accent}10`}}
        >
          Nothing to measure
        </div>
      </div>

      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.goldDeep}55`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div className="px-3 py-2 flex items-center justify-between">
          <span
            className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Tracked
          </span>
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{backgroundColor: '#1F7A4D'}}
            animate={go ? {opacity: [0.45, 1, 0.45]} : {opacity: 0.7}}
            transition={{duration: 1.6, repeat: Infinity, ease: 'easeInOut'}}
          />
        </div>
        <div className="p-4 md:p-5 flex flex-col justify-center gap-2.5 min-h-[168px]">
          {[
            {action: 'Form submit', result: 'Event · Inbox ok'},
            {action: 'Call click', result: 'Event · Logged'},
            {action: 'Book tap', result: 'Event · Logged'},
          ].map((row, i) => (
            <motion.div
              key={row.action}
              className="rounded-lg border px-3 py-2.5 flex items-center gap-2.5"
              style={{borderColor: `${FUNNEL_COLOURS.goldDeep}45`, backgroundColor: '#fff'}}
              initial={reduce ? false : {opacity: 0, y: 8}}
              animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.5}}
              transition={{delay: reduce ? 0 : 0.1 + i * 0.12, duration: 0.4, ease: EASE}}
            >
              <span
                className="h-5 w-5 shrink-0 rounded-full flex items-center justify-center font-mono text-[8px] font-bold"
                style={{backgroundColor: `${FUNNEL_COLOURS.gold}35`, color: FUNNEL_COLOURS.goldDeep}}
              >
                ✓
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[11px] font-semibold leading-snug" style={{color: FUNNEL_COLOURS.ink}}>
                  {row.action}
                </p>
                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.goldDeep}}>
                  {row.result}
                </p>
              </div>
            </motion.div>
          ))}
          <motion.div
            className="mt-1 flex justify-center"
            initial={reduce ? false : {opacity: 0, y: 4}}
            animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0}}
            transition={{delay: reduce ? 0 : 0.55, duration: 0.35}}
          >
            <span
              className="rounded-sm px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
              style={{backgroundColor: FUNNEL_COLOURS.gold, color: FUNNEL_COLOURS.ink}}
            >
              Watchlist ready
            </span>
          </motion.div>
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep, backgroundColor: `${FUNNEL_COLOURS.goldDeep}12`}}
        >
          Events · Destinations
        </div>
      </div>
    </motion.div>
  )
}
