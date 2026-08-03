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

const ROWS = [
  {q: 'Do you cover emergency call-outs?', a: 'Yes, same day across the service area.'},
  {q: 'What suburbs do you work in?', a: 'Bayside and the inner south east.'},
  {q: 'How much does a typical job cost?', a: 'Depends on scope, quoted before we start.'},
]

/**
 * Proof: empty dashed question rows resolve into answered Q/A pairs as a
 * Schema chip lights up. Shape-first, almost no words.
 */
export function SchemaFaqEvidenceCard({business}: {business?: string | null}) {
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
        className="px-3 py-2 flex items-center gap-1.5"
        style={{backgroundColor: `${FUNNEL_COLOURS.ink}06`}}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.accent}70`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.gold}80`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.ink}25`}} />
        <div
          className="h-5 w-5 rounded-sm ml-1 flex items-center justify-center"
          style={{backgroundColor: `${FUNNEL_COLOURS.ink}08`}}
        >
          {initials ? (
            <span className="font-mono text-[7px] font-bold" style={{color: FUNNEL_COLOURS.steel}}>
              {initials}
            </span>
          ) : null}
        </div>

        {/* Schema chip: faint outline fades out as the filled gold chip lights up */}
        <div className="ml-2 relative h-4 w-16 shrink-0">
          <motion.span
            className="absolute inset-0 flex items-center justify-center rounded-sm border font-mono text-[7px] uppercase tracking-[0.1em]"
            style={{borderColor: `${FUNNEL_COLOURS.ink}22`, color: `${FUNNEL_COLOURS.ink}45`}}
            animate={{opacity: go ? 0 : 1}}
            transition={{duration: 0.3, delay: go ? 0.9 : 0}}
          >
            Schema
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center justify-center rounded-sm font-mono text-[7px] font-bold uppercase tracking-[0.1em]"
            style={{backgroundColor: FUNNEL_COLOURS.gold, color: FUNNEL_COLOURS.ink}}
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: go ? 1 : 0, scale: go ? 1 : 0.9}}
            transition={{delay: go ? 1 : 0, duration: 0.3, type: 'spring', stiffness: 340, damping: 22}}
          >
            Schema
          </motion.span>
        </div>

        <div className="ml-auto relative h-3 w-28">
          <motion.span
            className="absolute inset-0 text-right font-mono text-[8px] uppercase tracking-[0.14em]"
            style={{color: FUNNEL_COLOURS.muted}}
            animate={{opacity: go ? 0 : 1}}
            transition={{duration: 0.3, delay: go ? 0.9 : 0}}
          >
            FAQs · empty
          </motion.span>
          <motion.span
            className="absolute inset-0 text-right font-mono text-[8px] font-bold uppercase tracking-[0.16em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
            initial={{opacity: 0}}
            animate={{opacity: go ? 1 : 0}}
            transition={{duration: 0.3, delay: go ? 0.95 : 0}}
          >
            FAQs · answered
          </motion.span>
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col gap-2.5">
        {/* Each row: dashed empty question fades out as a filled Q/A pair lands */}
        {ROWS.map((row, i) => (
          <div key={row.q} className="relative min-h-[38px]">
            <motion.div
              className="absolute inset-0 rounded-md border border-dashed px-3 py-2 flex items-center"
              style={{borderColor: `${FUNNEL_COLOURS.ink}22`}}
              animate={{opacity: go ? 0 : 1}}
              transition={{duration: 0.3, delay: go ? 0.15 + i * 0.12 : 0}}
            >
              <span
                className="font-mono text-[9px] uppercase tracking-wide"
                style={{color: `${FUNNEL_COLOURS.ink}35`}}
              >
                Q ···
              </span>
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-md px-3 py-2 flex flex-col justify-center gap-0.5"
              style={{backgroundColor: `${FUNNEL_COLOURS.gold}14`, border: `1px solid ${FUNNEL_COLOURS.goldDeep}40`}}
              initial={{opacity: 0, y: 6}}
              animate={{opacity: go ? 1 : 0, y: go ? 0 : 6}}
              transition={{duration: 0.35, delay: go ? 0.35 + i * 0.12 : 0, ease: EASE}}
            >
              <p className="font-sans text-[11px] font-semibold truncate" style={{color: FUNNEL_COLOURS.ink}}>
                {row.q}
              </p>
              <p className="font-sans text-[10px] truncate" style={{color: FUNNEL_COLOURS.steel}}>
                {row.a}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
