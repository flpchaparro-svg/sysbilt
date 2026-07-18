import React from 'react'
import {motion, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

export type AdEvidence =
  | {mode: 'live'; business: string}
  | {mode: 'try'}

/**
 * Meta Ad Library evidence: personalised "ads running → homepage" or try-it-now.
 */
export function AdEvidenceMoment({evidence}: {evidence: AdEvidence}) {
  const reduce = useReducedMotion()
  const isLive = evidence.mode === 'live'

  if (!isLive) {
    return (
      <motion.div
        className="mt-8 md:mt-10 w-full max-w-2xl"
        initial={reduce ? false : {opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.4}}
        transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
      >
        <div
          className="relative px-5 py-6 md:px-7 md:py-7"
          style={{
            border: `1px solid ${FUNNEL_COLOURS.ink}16`,
            backgroundColor: FUNNEL_COLOURS.surface,
          }}
        >
          <p
            className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] mb-4"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Try it now
          </p>
          <p
            className="font-serif font-bold text-xl md:text-2xl leading-snug tracking-tight"
            style={{color: FUNNEL_COLOURS.ink}}
          >
            Open one of your own ads and tap it like a customer would. Now count the steps between
            where you land and the thing the ad promised.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="mt-8 md:mt-10 w-full max-w-2xl"
      initial={reduce ? false : {opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
    >
      <div
        className="relative px-5 py-7 md:px-8 md:py-9"
        style={{
          border: `1px solid ${FUNNEL_COLOURS.ink}16`,
          backgroundColor: FUNNEL_COLOURS.surface,
        }}
      >
        <p
          className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] mb-6"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          Found · Meta Ad Library
        </p>
        <p
          className="font-serif font-bold text-2xl md:text-3xl leading-snug tracking-tight"
          style={{color: FUNNEL_COLOURS.ink}}
        >
          {evidence.business}&apos;s ads are running this week. The clicks land on your homepage.
        </p>
        <span
          className="mt-6 inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1"
          style={{
            color: FUNNEL_COLOURS.onInk,
            backgroundColor: FUNNEL_COLOURS.accent,
          }}
        >
          Leak
        </span>
      </div>
    </motion.div>
  )
}
