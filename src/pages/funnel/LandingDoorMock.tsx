import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Compact mock of the matched campaign door beside the price band.
 */
export function LandingDoorMock() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.4})
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-sm"
      initial={reduce ? false : {opacity: 0, y: 14}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.4}}
      transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
    >
      <div
        className="rounded-2xl overflow-hidden border shadow-[0_16px_40px_-24px_rgba(14,28,47,0.35)]"
        style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: '#fff'}}
      >
        <div
          className="px-4 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
        >
          Your domain · Campaign page
        </div>
        <div className="p-5 md:p-6">
          <p
            className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] mb-3"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Matches the ad
          </p>
          <p className="font-serif text-xl font-bold leading-snug" style={{color: FUNNEL_COLOURS.ink}}>
            Free consult this week
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
            Same promise. One form. No lobby.
          </p>
          <motion.div
            className="mt-5 h-10 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white"
            style={{backgroundColor: FUNNEL_COLOURS.accent}}
            animate={
              reduce || !inView
                ? undefined
                : {scale: [1, 1.03, 1], boxShadow: ['0 0 0 0 rgba(226,30,63,0)', '0 0 0 8px rgba(226,30,63,0.12)', '0 0 0 0 rgba(226,30,63,0)']}
            }
            transition={{duration: 2.2, repeat: Infinity, ease: 'easeInOut'}}
          >
            Book now
          </motion.div>
          <p
            className="mt-4 font-mono text-[9px] font-bold uppercase tracking-[0.18em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Tracking verified
          </p>
        </div>
      </div>
    </motion.div>
  )
}
