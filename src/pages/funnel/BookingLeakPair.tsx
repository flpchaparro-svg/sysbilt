import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Leak: phone tag / DM chase vs one-tap book + reminder.
 */
export function BookingLeakPair() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.3})
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
      initial={reduce ? false : {opacity: 0, y: 18}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
    >
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div
          className="px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.muted, backgroundColor: `${FUNNEL_COLOURS.ink}06`}}
        >
          How it books today
        </div>
        <div className="p-4 md:p-5 space-y-2">
          {[
            {row: 'Missed call · ring you back', stale: true},
            {row: 'Email · still arranging a time', stale: true},
            {row: 'DM · waiting on a reply', stale: true},
          ].map((item, i) => (
            <motion.div
              key={item.row}
              className="rounded-lg px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider flex items-center justify-between"
              style={{
                backgroundColor: item.stale ? `${FUNNEL_COLOURS.accent}12` : `${FUNNEL_COLOURS.ink}06`,
                color: item.stale ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.muted,
              }}
              animate={
                reduce || !inView
                  ? undefined
                  : {opacity: [0.55, 1, 0.55], x: [0, i === 1 ? 3 : 0, 0]}
              }
              transition={{duration: 1.8, repeat: Infinity, delay: i * 0.12}}
            >
              <span>{item.row}</span>
              <span className="font-bold normal-case tracking-normal">Chase</span>
            </motion.div>
          ))}
          <p className="pt-1 font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
            Phone tag and DM loops while the slot cools.
          </p>
        </div>
      </div>

      <div
        className="rounded-xl overflow-hidden border"
        style={{
          borderColor: `${FUNNEL_COLOURS.goldDeep}55`,
          backgroundColor: FUNNEL_COLOURS.surface,
        }}
      >
        <div
          className="px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.goldDeep, backgroundColor: `${FUNNEL_COLOURS.goldDeep}12`}}
        >
          After the setup
        </div>
        <div className="p-4 md:p-5">
          <motion.div
            className="h-9 rounded-md flex items-center justify-center font-mono text-[10px] font-bold uppercase tracking-wider text-white"
            style={{backgroundColor: FUNNEL_COLOURS.accent}}
            animate={
              reduce || !inView
                ? undefined
                : {
                    scale: [1, 1.04, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(226,30,63,0)',
                      '0 0 0 8px rgba(226,30,63,0.16)',
                      '0 0 0 0 rgba(226,30,63,0)',
                    ],
                  }
            }
            transition={{duration: 1.6, repeat: Infinity}}
          >
            Book now
          </motion.div>
          <p className="mt-3 font-serif text-lg font-bold" style={{color: FUNNEL_COLOURS.ink}}>
            One tap. Slot locked.
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
            Confirmation lands. Reminder the day before. Empty slots get a plain text chase.
          </p>
          <motion.span
            className="mt-4 inline-block font-mono text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1.5 text-white"
            style={{backgroundColor: '#1F7A4D'}}
            animate={reduce || !inView ? undefined : {scale: [1, 1.04, 1]}}
            transition={{duration: 1.6, repeat: Infinity, delay: 0.2}}
          >
            Reminder sent
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}
