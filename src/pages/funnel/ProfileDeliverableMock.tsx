import React from 'react'
import {motion, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Google panel proof mock for the price band.
 */
export function ProfileDeliverableMock() {
  const reduce = useReducedMotion()

  return (
    <div className="relative w-full max-w-md mx-auto md:mx-0 md:ml-auto">
      <motion.div
        className="border overflow-hidden"
        style={{
          borderColor: `${FUNNEL_COLOURS.ink}14`,
          backgroundColor: FUNNEL_COLOURS.surface,
        }}
        initial={reduce ? false : {opacity: 0, y: 18}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.35}}
        transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
      >
        <div
          className="px-5 py-3 border-b flex items-center justify-between"
          style={{borderColor: `${FUNNEL_COLOURS.ink}12`}}
        >
          <p
            className="font-mono text-[9px] uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.steel}}
          >
            Google · Business Profile
          </p>
          <span
            className="font-mono text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5"
            style={{backgroundColor: `${FUNNEL_COLOURS.gold}22`, color: FUNNEL_COLOURS.goldDeep}}
          >
            After
          </span>
        </div>

        <div className="p-5 md:p-6 space-y-4">
          <p className="font-serif text-lg md:text-xl" style={{color: FUNNEL_COLOURS.ink}}>
            Open · Rated · Ready to call
          </p>

          <div className="grid grid-cols-3 gap-2">
            {['Hours set', 'Services full', 'Photos live'].map((label, i) => (
              <motion.div
                key={label}
                className="border px-2 py-2 text-center"
                style={{
                  borderColor: `${FUNNEL_COLOURS.ink}12`,
                  backgroundColor: FUNNEL_COLOURS.ground,
                }}
                initial={reduce ? false : {opacity: 0, y: 8}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: reduce ? 0 : 0.15 + i * 0.1}}
              >
                <p className="font-mono text-[8px] uppercase tracking-widest text-dark/45">{label}</p>
              </motion.div>
            ))}
          </div>

          <div
            className="rounded-md border px-3 py-3"
            style={{
              borderColor: `${FUNNEL_COLOURS.gold}55`,
              backgroundColor: `${FUNNEL_COLOURS.gold}12`,
            }}
          >
            <p
              className="font-mono text-[8px] uppercase tracking-widest mb-1"
              style={{color: FUNNEL_COLOURS.goldDeep}}
            >
              Review link
            </p>
            <p className="font-sans text-sm" style={{color: FUNNEL_COLOURS.ink}}>
              Ready to send. Honest ask. No fake reviews.
            </p>
          </div>

          <p className="font-sans text-xs" style={{color: FUNNEL_COLOURS.muted}}>
            Ownership stays on your Google account.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
