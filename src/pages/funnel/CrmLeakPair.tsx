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
  const go = !reduce && inView

  return (
    <motion.div
      ref={ref}
      className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
      initial={reduce ? false : {opacity: 0, y: 22}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
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
                initial={reduce ? false : {opacity: 0, x: -12}}
                animate={
                  go
                    ? i === 1
                      ? {opacity: [0.55, 1, 0.55], x: [0, 3, 0], scale: [1, 1.02, 1]}
                      : {opacity: 0.65, x: 0}
                    : {opacity: 0.65, x: 0}
                }
                transition={
                  i === 1
                    ? {duration: 1.35, repeat: Infinity, ease: 'easeInOut', delay: 0.2}
                    : {delay: i * 0.08, duration: 0.35}
                }
              >
                <span>{row}</span>
                {i === 1 ? (
                  <motion.span
                    className="font-bold normal-case tracking-normal"
                    animate={go ? {scale: [1, 1.12, 1]} : undefined}
                    transition={{duration: 1.1, repeat: Infinity}}
                  >
                    3 days
                  </motion.span>
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
          <motion.p
            className="font-serif text-lg font-bold"
            style={{color: FUNNEL_COLOURS.ink}}
            initial={reduce ? false : {opacity: 0, y: 8}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{type: 'spring', stiffness: 320, damping: 20}}
          >
            Competitor thread
          </motion.p>
          <p className="mt-2 font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
            Replied in 9 min
          </p>
          <motion.span
            className="mt-4 inline-block font-mono text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1.5 text-white"
            style={{backgroundColor: '#1F7A4D'}}
            initial={reduce ? false : {opacity: 0, scale: 0.85, y: 6}}
            whileInView={{opacity: 1, scale: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.35, type: 'spring', stiffness: 400, damping: 16}}
            animate={go ? {scale: [1, 1.07, 1]} : undefined}
          >
            Booked
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
