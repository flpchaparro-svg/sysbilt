import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const PIECES = [
  {label: 'Audio explainers', detail: 'What changed and why'},
  {label: 'Screen how-to videos', detail: 'Click-by-click per task'},
  {label: 'Desk one-pagers', detail: 'Daily steps on paper or PDF'},
  {label: 'Live Q and A + day-30 call', detail: 'After they have tried it'},
]

/** Deliverable card beside the Change Pack price band. */
export function ChangePackDeliverableMock() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.4})
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-sm mx-auto md:mx-0 md:ml-auto self-center"
      initial={reduce ? false : {opacity: 0, y: 14}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.4}}
      transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
    >
      <div
        className="rounded-2xl overflow-hidden border shadow-[0_16px_40px_-24px_rgba(14,28,47,0.45)]"
        style={{borderColor: `${FUNNEL_COLOURS.onInk}22`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div
          className="px-4 py-2.5 flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
        >
          <span>The pack</span>
          <span style={{color: FUNNEL_COLOURS.goldLight}}>Yours to keep</span>
        </div>
        <div className="p-5 space-y-3">
          {PIECES.map((row, i) => (
            <motion.div
              key={row.label}
              className="flex items-start gap-3"
              initial={reduce ? false : {opacity: 0, x: 8}}
              animate={inView || reduce ? {opacity: 1, x: 0} : undefined}
              transition={{delay: reduce ? 0 : 0.12 + i * 0.1, duration: 0.35}}
            >
              <span
                className="mt-1.5 h-2 w-2 rounded-full shrink-0"
                style={{backgroundColor: FUNNEL_COLOURS.accent}}
              />
              <div className="min-w-0">
                <p className="font-sans text-sm font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
                  {row.label}
                </p>
                <p
                  className="font-mono text-[9px] uppercase tracking-wider"
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  {row.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
