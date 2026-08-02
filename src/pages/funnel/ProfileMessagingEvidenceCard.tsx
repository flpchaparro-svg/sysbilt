import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/** Proof: Maps Message tap that sits unread. */
export function ProfileMessagingEvidenceCard({business}: {business?: string | null}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const reduce = useReducedMotion()
  const go = !reduce && inView
  const who = business?.trim() || 'Your business'

  return (
    <motion.div
      ref={ref}
      className="mt-2 rounded-xl overflow-hidden border max-w-2xl"
      style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.surface}}
      initial={reduce ? false : {opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
    >
      <div
        className="px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em] flex justify-between"
        style={{backgroundColor: `${FUNNEL_COLOURS.ink}06`, color: FUNNEL_COLOURS.muted}}
      >
        <span>Google · Message</span>
        <motion.span
          style={{color: FUNNEL_COLOURS.accent}}
          animate={go ? {opacity: [0.45, 1, 0.45]} : undefined}
          transition={{duration: 1.2, repeat: Infinity}}
        >
          Unread
        </motion.span>
      </div>
      <div className="p-4 md:p-5 space-y-3">
        <p className="font-serif text-lg font-bold" style={{color: FUNNEL_COLOURS.ink}}>
          {who}
        </p>
        <div
          className="rounded-lg px-3 py-2.5 font-sans text-sm max-w-[85%]"
          style={{backgroundColor: `${FUNNEL_COLOURS.ink}08`, color: FUNNEL_COLOURS.ink}}
        >
          Hi, do you have a slot this week?
        </div>
        <motion.p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{color: FUNNEL_COLOURS.accent}}
          animate={go ? {x: [0, 3, 0]} : undefined}
          transition={{duration: 1.4, repeat: Infinity}}
        >
          Waiting · no reply yet
        </motion.p>
      </div>
    </motion.div>
  )
}
