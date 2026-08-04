import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

function initialsOf(name?: string | null) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return null
  return parts
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}

/** Proof: fast page gains a clear ask and a visible enquiry signal. */
export function BundleSpeedNextEvidenceCard({business}: {business?: string | null}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const go = !reduce && inView
  const initials = initialsOf(business)

  return (
    <motion.div
      ref={ref}
      className="mt-2 rounded-xl overflow-hidden border max-w-2xl"
      style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.surface}}
      initial={reduce ? false : {opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.5, ease: EASE}}
    >
      <div
        className="px-3 py-2.5 flex items-center gap-2"
        style={{backgroundColor: `${FUNNEL_COLOURS.ink}16`}}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.accent}70`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.gold}80`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.ink}25`}} />
        {initials ? (
          <span
            className="ml-1 h-5 min-w-[20px] px-1 rounded-sm flex items-center justify-center font-mono text-[7px] font-bold"
            style={{backgroundColor: `${FUNNEL_COLOURS.ink}2C`, color: FUNNEL_COLOURS.steel}}
          >
            {initials}
          </span>
        ) : null}
        <span
          className="ml-auto font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          Speed next
        </span>
      </div>

      <div className="p-4 md:p-5 grid grid-cols-3 gap-2">
        {[
          {label: 'Fast', detail: 'Speed win kept', tone: 'ink' as const},
          {label: 'Clear ask', detail: 'CTA on page', tone: 'gold' as const},
          {label: 'Signal', detail: 'Enquiry lands', tone: 'gold' as const},
        ].map((cell, i) => (
          <motion.div
            key={cell.label}
            className="rounded-lg border px-2.5 py-3 text-center"
            style={{
              borderColor:
                cell.tone === 'gold' ? `${FUNNEL_COLOURS.goldDeep}45` : `${FUNNEL_COLOURS.ink}18`,
              backgroundColor: cell.tone === 'gold' ? '#fff' : `${FUNNEL_COLOURS.ink}16`,
            }}
            initial={reduce ? false : {opacity: 0, y: 8}}
            animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.45}}
            transition={{delay: reduce ? 0 : 0.1 + i * 0.14, duration: 0.4, ease: EASE}}
          >
            <p
              className="font-mono text-[8px] font-bold uppercase tracking-wide mb-1.5"
              style={{color: cell.tone === 'gold' ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.steel}}
            >
              {cell.label}
            </p>
            <p className="font-sans text-[11px] font-semibold leading-snug" style={{color: FUNNEL_COLOURS.ink}}>
              {cell.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
