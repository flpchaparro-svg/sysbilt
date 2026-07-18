import React from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Simple before → after panel pair for the bridge section.
 */
export function ProfileAfterMoment({businessName}: {businessName?: string | null}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const show = reduce || inView
  const label = businessName?.trim() || 'Your business'

  return (
    <div ref={ref} className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
      <motion.div
        className="border p-4"
        style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.surface}}
        initial={reduce ? false : {opacity: 0, y: 12}}
        animate={show ? {opacity: 1, y: 0} : {opacity: 0, y: 12}}
        transition={{duration: 0.45}}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-text mb-3">Before</p>
        <p className="font-serif text-lg" style={{color: FUNNEL_COLOURS.ink}}>
          {label}
        </p>
        <ul className="mt-3 space-y-1.5 font-sans text-sm" style={{color: FUNNEL_COLOURS.muted}}>
          <li>Hours unclear</li>
          <li>Services empty</li>
          <li>Photos thin</li>
        </ul>
      </motion.div>
      <motion.div
        className="border p-4"
        style={{
          borderColor: `${FUNNEL_COLOURS.gold}55`,
          backgroundColor: `${FUNNEL_COLOURS.gold}12`,
        }}
        initial={reduce ? false : {opacity: 0, y: 12}}
        animate={show ? {opacity: 1, y: 0} : {opacity: 0, y: 12}}
        transition={{duration: 0.45, delay: reduce ? 0 : 0.15}}
      >
        <p
          className="font-mono text-[9px] uppercase tracking-[0.2em] mb-3"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          After
        </p>
        <p className="font-serif text-lg" style={{color: FUNNEL_COLOURS.ink}}>
          {label}
        </p>
        <ul className="mt-3 space-y-1.5 font-sans text-sm" style={{color: FUNNEL_COLOURS.muted}}>
          <li>Hours set</li>
          <li>Services filled</li>
          <li>Ready to call</li>
        </ul>
      </motion.div>
    </div>
  )
}
