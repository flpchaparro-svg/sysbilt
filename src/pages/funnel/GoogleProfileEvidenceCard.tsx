import React from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

type ComparedEvidence = {
  mode: 'compared'
  business: string
  competitor: string
}

type NamedEvidence = {
  mode: 'named'
  business: string
}

type TryEvidence = {
  mode: 'try'
}

export type GoogleProfileEvidence = ComparedEvidence | NamedEvidence | TryEvidence

/**
 * “This is you, right now” for Google Profile — listing vs competitor, or self-test.
 */
export function GoogleProfileEvidenceCard({evidence}: {evidence: GoogleProfileEvidence}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.4})
  const reduce = useReducedMotion()
  const show = reduce || inView

  let label = 'TRY IT NOW'
  let body =
    'Search your own business name on Google and look at the panel on the right. Then search your best competitor. Whatever difference you see is what this fixes.'
  let caption: string | null =
    "No dashboards required. That gap is already deciding who gets the call."

  if (evidence.mode === 'compared') {
    label = 'OPENED · BOTH LISTINGS'
    body = `We opened ${evidence.business} next to ${evidence.competitor}. One panel looks finished. The other is the reason calls go sideways.`
    caption =
      "That's not a dig. It's why this page exists, and it's what customers see before your website ever loads."
  } else if (evidence.mode === 'named') {
    label = 'OPENED · YOUR LISTING'
    body = `We opened the Google panel for ${evidence.business}. Thin photos, thin categories, or a description that does not sell. That is the front door.`
    caption =
      "That's not a criticism. It's why this page exists. Search your best competitor next and feel the gap."
  }

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
          style={{
            color:
              evidence.mode === 'try' ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.accent,
          }}
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
