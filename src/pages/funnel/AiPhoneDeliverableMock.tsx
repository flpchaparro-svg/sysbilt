import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const RUNBOOK = [
  {label: 'Live test call', detail: 'You listen while it answers and books'},
  {label: 'Vendor account', detail: 'Agent lives on your login, not ours'},
  {label: 'Knowledge pack', detail: 'Hours, FAQs, tone, booking rules'},
  {label: 'Handoff paths', detail: 'When to pass to a human, and how'},
]

/**
 * Deliverable mock for AI Phone Setup: live test call + runbook handover.
 */
export function AiPhoneDeliverableMock() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.4})
  const reduce = useReducedMotion()
  const play = inView && !reduce

  return (
    <div className="relative min-h-[320px] md:min-h-full flex items-center">
      <motion.div
        ref={ref}
        className="w-full max-w-sm mx-auto border overflow-hidden"
        style={{
          borderColor: `${FUNNEL_COLOURS.onInk}22`,
          backgroundColor: FUNNEL_COLOURS.surface,
          boxShadow: `10px 14px 0 0 ${FUNNEL_COLOURS.ink}55`,
        }}
        initial={reduce ? false : {opacity: 0, y: 20, rotate: 1.5}}
        whileInView={{opacity: 1, y: 0, rotate: 0.5}}
        viewport={{once: true, amount: 0.4}}
        transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
      >
        <div
          className="px-4 py-3 border-b flex items-center gap-2"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}14`,
            backgroundColor: FUNNEL_COLOURS.ground,
          }}
        >
          <span className="h-2 w-2 rounded-full bg-red-solid/80" />
          <span className="h-2 w-2 rounded-full" style={{backgroundColor: FUNNEL_COLOURS.gold}} />
          <span className="h-2 w-2 rounded-full bg-dark/20" />
          <span
            className="ml-2 font-mono text-[9px] uppercase tracking-[0.16em] truncate"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            Live test · Handover
          </span>
        </div>

        <div className="p-5 md:p-6 space-y-4">
          <p
            className="font-mono text-[9px] uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.steel}}
          >
            Proof before keys
          </p>
          <p className="font-serif text-lg md:text-xl" style={{color: FUNNEL_COLOURS.ink}}>
            You hear it work, then you own it
          </p>

          <div
            className="rounded-lg border px-3 py-3"
            style={{
              borderColor: `${FUNNEL_COLOURS.ink}12`,
              backgroundColor: FUNNEL_COLOURS.ground,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <p
                className="font-mono text-[9px] uppercase tracking-[0.18em]"
                style={{color: FUNNEL_COLOURS.muted}}
              >
                Test call
              </p>
              <motion.span
                className="font-mono text-[9px] font-bold uppercase tracking-[0.14em]"
                style={{color: '#1F7A4D'}}
                animate={play ? {opacity: [0.55, 1, 0.55]} : {opacity: 0.9}}
                transition={play ? {duration: 1.5, repeat: Infinity} : {duration: 0.2}}
              >
                Connected
              </motion.span>
            </div>
            <p className="font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.ink}}>
              Agent: &ldquo;I can book Tuesday at 10. Shall I lock that in?&rdquo;
            </p>
            <motion.span
              className="mt-3 inline-block font-mono text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-1 text-white"
              style={{backgroundColor: '#1F7A4D'}}
              animate={play ? {scale: [1, 1.03, 1]} : {scale: 1}}
              transition={play ? {duration: 1.6, repeat: Infinity} : {duration: 0.2}}
            >
              Booked
            </motion.span>
          </div>

          <div className="space-y-2.5">
            {RUNBOOK.map((row, i) => (
              <motion.div
                key={row.label}
                className="flex items-start gap-3"
                initial={reduce ? false : {opacity: 0, x: 8}}
                animate={inView || reduce ? {opacity: 1, x: 0} : undefined}
                transition={{delay: reduce ? 0 : 0.12 + i * 0.1, duration: 0.35}}
              >
                <span
                  className="mt-1.5 h-2 w-2 rounded-full shrink-0"
                  style={{backgroundColor: FUNNEL_COLOURS.accent}}
                />
                <div className="min-w-0">
                  <p className="font-sans text-sm font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
                    {row.label}
                  </p>
                  <p
                    className="font-mono text-[9px] uppercase tracking-wider"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {row.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
