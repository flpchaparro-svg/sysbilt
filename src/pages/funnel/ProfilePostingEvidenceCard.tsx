import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/** Proof: a Google Business Profile with an empty update history, Maps-style panel. */
export function ProfilePostingEvidenceCard({
  business,
  lastPostMonth,
}: {
  business?: string | null
  lastPostMonth?: string | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const reduce = useReducedMotion()
  const go = !reduce && inView
  const who = business?.trim() || 'Your business'
  const staleLabel = lastPostMonth ? `Last post · ${lastPostMonth}` : 'Last post · over a year ago'

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
        <span>{who} · Google Business Profile</span>
        <motion.span
          style={{color: FUNNEL_COLOURS.accent}}
          animate={go ? {opacity: [0.45, 1, 0.45]} : undefined}
          transition={{duration: 1.2, repeat: Infinity}}
        >
          No recent posts
        </motion.span>
      </div>
      <div className="p-4 md:p-5 space-y-3">
        <div className="flex gap-3 items-center">
          <div
            className="h-12 w-12 rounded-lg shrink-0"
            style={{backgroundColor: `${FUNNEL_COLOURS.ink}08`}}
          />
          <div className="min-w-0">
            <p className="font-sans text-sm font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              {who}
            </p>
            <p
              className="font-mono text-[9px] uppercase tracking-wider mt-1"
              style={{color: FUNNEL_COLOURS.muted}}
            >
              Photos · Reviews · Hours
            </p>
          </div>
        </div>
        <div
          className="rounded-lg border px-3 py-2.5"
          style={{borderColor: `${FUNNEL_COLOURS.ink}10`, backgroundColor: `${FUNNEL_COLOURS.ink}04`}}
        >
          <p
            className="font-mono text-[9px] uppercase tracking-wider"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            Updates tab
          </p>
          <p className="mt-1 font-sans text-sm" style={{color: FUNNEL_COLOURS.ink}}>
            Nothing posted this month, or the month before that.
          </p>
        </div>
        <motion.p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{color: FUNNEL_COLOURS.accent}}
          animate={go ? {x: [0, 3, 0]} : undefined}
          transition={{duration: 1.4, repeat: Infinity}}
        >
          {staleLabel}
        </motion.p>
      </div>
    </motion.div>
  )
}
