import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const STEPS = [
  {label: 'Enquiry in', detail: 'Owned pipeline'},
  {label: 'Phone alert', detail: 'Seconds later'},
  {label: 'Instant reply', detail: 'Customer still on site'},
  {label: 'Quote chase', detail: 'Queued'},
]

/**
 * Fixed-state thread beside the bridge / price band.
 */
export function CrmFixedThreadMock() {
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
          After the rescue
        </div>
        <div className="p-5 space-y-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              className="flex items-center gap-3"
              animate={
                reduce || !inView
                  ? undefined
                  : {opacity: [0.45, 1, 0.45]}
              }
              transition={{duration: 2, repeat: Infinity, delay: i * 0.25}}
            >
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{backgroundColor: '#1F7A4D'}}
              />
              <div className="min-w-0">
                <p className="font-sans text-sm font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
                  {step.label}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-wider" style={{color: FUNNEL_COLOURS.muted}}>
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
