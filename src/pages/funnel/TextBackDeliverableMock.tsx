import React from 'react'
import {motion, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * SMS proof mock for Missed-Call Text-Back price band.
 */
export function TextBackDeliverableMock() {
  const reduce = useReducedMotion()

  return (
    <div className="relative min-h-[320px] md:min-h-full flex items-center">
      <motion.div
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
            Messages · Live proof
          </span>
        </div>

        <div className="p-5 md:p-6 space-y-4">
          <p
            className="font-mono text-[9px] uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.steel}}
          >
            Missed call → SMS
          </p>
          <p className="font-serif text-lg md:text-xl" style={{color: FUNNEL_COLOURS.ink}}>
            They hear from you in seconds
          </p>

          <div
            className="ml-auto max-w-[90%] rounded-2xl rounded-br-sm px-4 py-3"
            style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
          >
            <p className="font-sans text-sm leading-relaxed">
              Sorry we missed your call. We will ring you back shortly, or reply here and we will
              sort a time.
            </p>
            <p
              className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-right"
              style={{color: `${FUNNEL_COLOURS.onInk}70`}}
            >
              Delivered
            </p>
          </div>

          <div
            className="max-w-[80%] rounded-2xl rounded-bl-sm px-4 py-3 border"
            style={{
              borderColor: `${FUNNEL_COLOURS.ink}14`,
              backgroundColor: FUNNEL_COLOURS.ground,
            }}
          >
            <p className="font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.ink}}>
              Can you call me this afternoon?
            </p>
          </div>

          <p className="font-sans text-xs" style={{color: FUNNEL_COLOURS.muted}}>
            Lead captured. You follow up. Job stays yours.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
