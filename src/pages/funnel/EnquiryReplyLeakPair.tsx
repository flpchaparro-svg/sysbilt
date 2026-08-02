import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/** Leak: a buried enquiry vs an instant acknowledgement plus a clean route. */
export function EnquiryReplyLeakPair() {
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
        style={{borderColor: `${FUNNEL_COLOURS.accent}40`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div
          className="px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.accent, backgroundColor: `${FUNNEL_COLOURS.accent}12`}}
        >
          Today · form and inbox
        </div>
        <div className="p-4 md:p-5 space-y-2">
          {[
            {label: 'Form submitted', hot: false},
            {label: 'Sits unread in the inbox', hot: true},
            {label: 'They message the next business', hot: false},
          ].map((row) => (
            <motion.div
              key={row.label}
              className="rounded-lg px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider"
              style={{
                backgroundColor: row.hot ? `${FUNNEL_COLOURS.accent}12` : `${FUNNEL_COLOURS.ink}06`,
                color: row.hot ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.muted,
              }}
              animate={
                go && row.hot
                  ? {opacity: [0.55, 1, 0.55], x: [0, 3, 0]}
                  : {opacity: 0.75}
              }
              transition={
                row.hot
                  ? {duration: 1.35, repeat: Infinity, delay: 0.15}
                  : {duration: 0.35}
              }
            >
              {row.label}
            </motion.div>
          ))}
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
          After setup
        </div>
        <div className="p-4 md:p-5 space-y-3">
          <motion.div
            className="rounded-lg border px-3 py-2.5"
            style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: '#fff'}}
            initial={reduce ? false : {opacity: 0, y: 8}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
          >
            <p
              className="font-mono text-[8px] uppercase tracking-wider"
              style={{color: `${FUNNEL_COLOURS.ink}45`}}
            >
              First reply · seconds
            </p>
            <p className="mt-1 font-sans text-sm" style={{color: FUNNEL_COLOURS.ink}}>
              Thanks for reaching out. We have this and someone will follow up shortly.
            </p>
          </motion.div>
          <motion.span
            className="inline-block font-mono text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1.5 text-white"
            style={{backgroundColor: '#1F7A4D'}}
            animate={go ? {scale: [1, 1.06, 1]} : undefined}
            transition={{duration: 1.2, repeat: Infinity}}
          >
            Routed · one inbox
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
