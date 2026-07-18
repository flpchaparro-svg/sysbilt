import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Leak: enquiry buried in inbox vs competitor replied in minutes.
 */
export function CrmLeakPair() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.3})
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
      initial={reduce ? false : {opacity: 0, y: 18}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
    >
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div
          className="px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.muted, backgroundColor: `${FUNNEL_COLOURS.ink}06`}}
        >
          Your inbox
        </div>
        <div className="p-4 md:p-5 space-y-2">
          {['Invoice · due Friday', 'Website enquiry · still unread', 'Newsletter · 12 tips'].map(
            (row, i) => (
              <motion.div
                key={row}
                className="rounded-lg px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider flex items-center justify-between"
                style={{
                  backgroundColor: i === 1 ? `${FUNNEL_COLOURS.accent}12` : `${FUNNEL_COLOURS.ink}06`,
                  color: i === 1 ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.muted,
                }}
                animate={
                  reduce || !inView
                    ? undefined
                    : i === 1
                      ? {opacity: [0.55, 1, 0.55], x: [0, 2, 0]}
                      : {opacity: 0.7}
                }
                transition={{duration: 1.8, repeat: Infinity}}
              >
                <span>{row}</span>
                {i === 1 ? (
                  <span className="font-bold normal-case tracking-normal">3 days</span>
                ) : null}
              </motion.div>
            ),
          )}
        </div>
      </div>

      <div
        className="rounded-xl overflow-hidden border"
        style={{
          borderColor: `${FUNNEL_COLOURS.goldDeep}55`,
          backgroundColor: FUNNEL_COLOURS.surface,
        }}
      >
        <div
          className="px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.goldDeep, backgroundColor: `${FUNNEL_COLOURS.goldDeep}12`}}
        >
          The other tab
        </div>
        <div className="p-4 md:p-5">
          <p className="font-serif text-lg font-bold" style={{color: FUNNEL_COLOURS.ink}}>
            Competitor thread
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
            Replied in 9 min
          </p>
          <motion.span
            className="mt-4 inline-block font-mono text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1.5 text-white"
            style={{backgroundColor: '#1F7A4D'}}
            animate={reduce || !inView ? undefined : {scale: [1, 1.04, 1]}}
            transition={{duration: 1.6, repeat: Infinity}}
          >
            Booked
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
