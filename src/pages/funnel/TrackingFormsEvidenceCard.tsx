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

const STEPS = [
  {label: 'Form submit', detail: 'Visitor hits Send'},
  {label: 'Event fires', detail: 'GA4 records the action'},
  {label: 'Inbox lands', detail: 'Right person gets it'},
]

/** Proof: submit → event → destination, in sequence. */
export function TrackingFormsEvidenceCard({business}: {business?: string | null}) {
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
        style={{backgroundColor: `${FUNNEL_COLOURS.ink}06`}}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.accent}70`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.gold}80`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.ink}25`}} />
        {initials ? (
          <span
            className="ml-1 h-5 min-w-[20px] px-1 rounded-sm flex items-center justify-center font-mono text-[7px] font-bold"
            style={{backgroundColor: `${FUNNEL_COLOURS.ink}10`, color: FUNNEL_COLOURS.steel}}
          >
            {initials}
          </span>
        ) : null}
        <span
          className="ml-auto font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          Signal trail
        </span>
      </div>

      <div className="p-4 md:p-5 space-y-2.5">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.label}
            className="rounded-lg border px-3 py-2.5 flex items-center gap-3"
            style={{
              borderColor: `${FUNNEL_COLOURS.goldDeep}40`,
              backgroundColor: '#fff',
            }}
            initial={reduce ? false : {opacity: 0, x: -10}}
            animate={go || reduce ? {opacity: 1, x: 0} : {opacity: 0.4}}
            transition={{delay: reduce ? 0 : 0.12 + i * 0.16, duration: 0.4, ease: EASE}}
          >
            <span
              className="h-6 w-6 shrink-0 rounded-full flex items-center justify-center font-mono text-[9px] font-bold"
              style={{backgroundColor: `${FUNNEL_COLOURS.gold}30`, color: FUNNEL_COLOURS.goldDeep}}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-sans text-[12px] font-semibold leading-snug" style={{color: FUNNEL_COLOURS.ink}}>
                {step.label}
              </p>
              <p className="font-sans text-[11px] leading-snug" style={{color: FUNNEL_COLOURS.steel}}>
                {step.detail}
              </p>
            </div>
            {i < STEPS.length - 1 ? (
              <span className="font-mono text-[10px] shrink-0" style={{color: FUNNEL_COLOURS.goldDeep}}>
                ↓
              </span>
            ) : (
              <motion.span
                className="h-2 w-2 rounded-full shrink-0"
                style={{backgroundColor: '#1F7A4D'}}
                animate={go ? {opacity: [0.45, 1, 0.45]} : {opacity: 0.7}}
                transition={{duration: 1.5, repeat: Infinity, ease: 'easeInOut'}}
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
