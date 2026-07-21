import React from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Static proof for Booking System: missing Book now vs present.
 * Personalised when `business` is set; try-it-now when null.
 */
export function BookingEvidenceCard({business}: {business: string | null}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.4})
  const reduce = useReducedMotion()
  const show = reduce || inView

  const named = Boolean(business)
  const label = named ? 'CHECKED · SITE + GOOGLE' : 'TRY IT NOW'
  const body = named
    ? `We looked for Book now on ${business}'s site and Google panel. Missing, or not wired to a real calendar.`
    : 'Open your own site and your Google panel. Look for Book now. If you cannot tap it and pick a time, that is the leak.'
  const caption = named
    ? "That's not a dig. It's why this page exists, and it's what ready customers hit before they call someone else."
    : 'Same check your customers already run without thinking about it.'

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
          style={{color: named ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.goldDeep}}
        >
          {label}
        </p>
        <p
          className="font-serif font-bold text-xl md:text-2xl leading-snug tracking-tight"
          style={{color: FUNNEL_COLOURS.ink}}
        >
          {body}
        </p>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            className="rounded-lg border px-3 py-3"
            style={{
              borderColor: `${FUNNEL_COLOURS.accent}40`,
              backgroundColor: `${FUNNEL_COLOURS.accent}0A`,
            }}
          >
            <p
              className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] mb-2"
              style={{color: FUNNEL_COLOURS.accent}}
            >
              Right now
            </p>
            <div
              className="h-9 rounded-md border border-dashed flex items-center justify-center font-mono text-[10px] uppercase tracking-wider"
              style={{
                borderColor: `${FUNNEL_COLOURS.accent}55`,
                color: FUNNEL_COLOURS.accent,
                backgroundColor: FUNNEL_COLOURS.surface,
              }}
            >
              Book now · missing
            </div>
            <p className="mt-2 font-sans text-xs leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
              Site and Google panel. Call, email, or DM instead.
            </p>
          </div>

          <div
            className="rounded-lg border px-3 py-3"
            style={{
              borderColor: `${FUNNEL_COLOURS.goldDeep}45`,
              backgroundColor: `${FUNNEL_COLOURS.gold}14`,
            }}
          >
            <p
              className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] mb-2"
              style={{color: FUNNEL_COLOURS.goldDeep}}
            >
              After
            </p>
            <div
              className="h-9 rounded-md flex items-center justify-center font-mono text-[10px] font-bold uppercase tracking-wider text-white"
              style={{backgroundColor: FUNNEL_COLOURS.accent}}
            >
              Book now
            </div>
            <p className="mt-2 font-sans text-xs leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
              One tap. Real calendar. Slot locked.
            </p>
          </div>
        </div>

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
