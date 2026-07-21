import React from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

type TestedEvidence = {
  mode: 'tested'
  business: string
  day: string
  time: string
}

type TryEvidence = {
  mode: 'try'
}

export type AiPhoneEvidence = TestedEvidence | TryEvidence

/**
 * "This is you, right now" for AI Phone Setup: after-hours call hit voicemail / ring-out.
 */
export function AiPhoneEvidenceCard({evidence}: {evidence: AiPhoneEvidence}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.4})
  const reduce = useReducedMotion()
  const show = reduce || inView

  const isTested = evidence.mode === 'tested'
  const label = isTested
    ? `TESTED · ${evidence.day.toUpperCase()} · ${evidence.time.toUpperCase()}`
    : 'TRY IT NOW'
  const body = isTested
    ? `We rang ${evidence.business} after hours. It hit voicemail. No one answered. Nothing booked.`
    : 'Grab another phone after hours, or while your team is mid-job, and ring your own number. Whatever happens (voicemail, ring-out, silence) is what every after-hours caller gets.'
  const caption = isTested
    ? "That's not a criticism, it's why this page exists. It's also exactly what your customers got this week."
    : null

  return (
    <motion.div
      ref={ref}
      className="mt-8 md:mt-10 w-full max-w-2xl"
      initial={reduce ? false : {opacity: 0, y: 16}}
      animate={show ? {opacity: 1, y: 0} : {opacity: 0, y: 16}}
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
          style={{color: isTested ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.goldDeep}}
        >
          {label}
        </p>
        <p
          className="font-serif font-bold text-xl md:text-2xl leading-snug tracking-tight"
          style={{color: FUNNEL_COLOURS.ink}}
        >
          {body}
        </p>
        {caption ? (
          <p
            className="mt-4 font-sans text-sm md:text-base leading-relaxed"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            {caption}
          </p>
        ) : null}
      </div>
    </motion.div>
  )
}
