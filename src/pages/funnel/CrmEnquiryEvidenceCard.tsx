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

export type CrmEnquiryEvidence = TestedEvidence | TryEvidence

/**
 * Form-enquiry evidence for CRM Rescue — tested silence, or self-test fallback.
 */
export function CrmEnquiryEvidenceCard({evidence}: {evidence: CrmEnquiryEvidence}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.4})
  const reduce = useReducedMotion()
  const show = reduce || inView

  const isTested = evidence.mode === 'tested'
  const label = isTested
    ? `TESTED · ${evidence.day.toUpperCase()} · ${evidence.time.toUpperCase()}`
    : 'TRY IT NOW'
  const body = isTested
    ? `We sent a genuine enquiry through ${evidence.business}'s form on ${evidence.day} at ${evidence.time}. As of this morning, no reply has come back.`
    : 'Fill in your own contact form from a personal email and start a timer. However long it takes anyone to reply, that is your real response time, and your customers already know it.'
  const caption = isTested
    ? "We do this politely, one enquiry, withdrawn once you've seen this. Your customers don't withdraw theirs. They just buy elsewhere."
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
