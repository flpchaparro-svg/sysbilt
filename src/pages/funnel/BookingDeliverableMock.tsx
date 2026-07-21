import React from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Deliverable mock for Booking System: Book now control + confirmation SMS.
 */
export function BookingDeliverableMock() {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const play = reduce || inView

  return (
    <div ref={ref} className="relative min-h-[320px] md:min-h-full flex items-center">
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
            Booking · Live proof
          </span>
        </div>

        <div className="p-5 md:p-6 space-y-4">
          <p
            className="font-mono text-[9px] uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.steel}}
          >
            Site + Google · Book now
          </p>
          <p className="font-serif text-lg md:text-xl" style={{color: FUNNEL_COLOURS.ink}}>
            They finish in one tap
          </p>

          <motion.div
            className="h-10 rounded-md flex items-center justify-center font-mono text-[11px] font-bold uppercase tracking-wider text-white"
            style={{backgroundColor: FUNNEL_COLOURS.accent}}
            initial={reduce ? false : {opacity: 0, y: 8}}
            animate={play ? {opacity: 1, y: 0} : {opacity: 0, y: 8}}
            transition={{delay: reduce ? 0 : 0.2, duration: 0.35}}
          >
            Book now
          </motion.div>

          <motion.div
            className="rounded-lg border px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider"
            style={{
              borderColor: `${FUNNEL_COLOURS.ink}12`,
              backgroundColor: FUNNEL_COLOURS.ground,
              color: FUNNEL_COLOURS.ink,
            }}
            initial={reduce ? false : {opacity: 0, y: 8}}
            animate={play ? {opacity: 1, y: 0} : {opacity: 0, y: 8}}
            transition={{delay: reduce ? 0 : 0.35, duration: 0.35}}
          >
            Thu 11:00 · locked on your calendar
          </motion.div>

          <motion.div
            className="ml-auto max-w-[92%] rounded-2xl rounded-br-sm px-4 py-3"
            style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
            initial={reduce ? false : {opacity: 0, y: 10}}
            animate={play ? {opacity: 1, y: 0} : {opacity: 0, y: 10}}
            transition={{delay: reduce ? 0 : 0.55, duration: 0.4}}
          >
            <p className="font-sans text-sm leading-relaxed">
              You're booked for Thursday at 11:00. Reply CANCEL if you need to move it. We'll remind
              you the day before.
            </p>
            <p
              className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-right"
              style={{color: `${FUNNEL_COLOURS.onInk}70`}}
            >
              Confirmation · Delivered
            </p>
          </motion.div>

          <p className="font-sans text-xs" style={{color: FUNNEL_COLOURS.muted}}>
            Reminder the day before. Empty slots get a plain text chase.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
