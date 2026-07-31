import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/** Price-band mock: SMS ask fires, then QR lands for van and invoice. */
export function ReviewDeliverableMock() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const reduce = useReducedMotion()
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="rounded-sm border overflow-hidden w-full max-w-sm"
      style={{
        borderColor: `${FUNNEL_COLOURS.onInk}22`,
        backgroundColor: 'rgba(255,242,236,0.06)',
      }}
    >
      <div
        className="px-4 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] flex justify-between"
        style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
      >
        <span>Review engine</span>
        <motion.span
          style={{color: FUNNEL_COLOURS.goldLight}}
          animate={play ? {opacity: [0.5, 1, 0.5]} : undefined}
          transition={play ? {duration: 1.6, repeat: Infinity} : undefined}
        >
          Live
        </motion.span>
      </div>
      <div className="p-4 space-y-3">
        <motion.div
          className="rounded-2xl rounded-bl-sm border px-3 py-3"
          style={{borderColor: `${FUNNEL_COLOURS.onInk}18`, backgroundColor: 'rgba(255,242,236,0.08)'}}
          initial={reduce ? false : {opacity: 0, y: 12}}
          animate={play || reduce ? {opacity: 1, y: 0} : {opacity: 0.3}}
          transition={{duration: 0.4}}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className="h-6 w-6 rounded-full flex items-center justify-center text-[10px]"
              style={{backgroundColor: FUNNEL_COLOURS.goldLight, color: FUNNEL_COLOURS.ink}}
            >
              ✉
            </span>
            <span
              className="font-mono text-[8px] font-bold uppercase tracking-widest"
              style={{color: FUNNEL_COLOURS.goldLight}}
            >
              SMS · after job
            </span>
          </div>
          <div className="space-y-1.5">
            <motion.div
              className="h-2 rounded-sm origin-left"
              style={{backgroundColor: `${FUNNEL_COLOURS.onInk}55`, width: '100%'}}
              initial={reduce ? false : {scaleX: 0}}
              animate={play || reduce ? {scaleX: 1} : undefined}
              transition={{delay: play ? 0.25 : 0, duration: 0.45}}
            />
            <motion.div
              className="h-2 rounded-sm origin-left"
              style={{backgroundColor: `${FUNNEL_COLOURS.onInk}35`, width: '72%'}}
              initial={reduce ? false : {scaleX: 0}}
              animate={play || reduce ? {scaleX: 1} : undefined}
              transition={{delay: play ? 0.4 : 0, duration: 0.45}}
            />
            <motion.div
              className="h-2 rounded-sm origin-left"
              style={{backgroundColor: FUNNEL_COLOURS.goldLight, width: '40%'}}
              initial={reduce ? false : {scaleX: 0}}
              animate={play || reduce ? {scaleX: 1} : undefined}
              transition={{delay: play ? 0.55 : 0, duration: 0.45}}
            />
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-3"
          initial={reduce ? false : {opacity: 0, y: 10}}
          animate={play || reduce ? {opacity: 1, y: 0} : {opacity: 0}}
          transition={{delay: play ? 0.7 : 0, duration: 0.4}}
        >
          <motion.div
            className="h-14 w-14 shrink-0 rounded-sm border grid grid-cols-3 grid-rows-3 gap-0.5 p-1.5"
            style={{borderColor: `${FUNNEL_COLOURS.onInk}22`}}
            aria-hidden
            animate={
              play
                ? {
                    boxShadow: [
                      '0 0 0 0 rgba(197,160,89,0)',
                      '0 0 0 6px rgba(197,160,89,0.2)',
                      '0 0 0 0 rgba(197,160,89,0)',
                    ],
                  }
                : undefined
            }
            transition={play ? {duration: 2, repeat: Infinity, delay: 1} : undefined}
          >
            {Array.from({length: 9}).map((_, i) => (
              <motion.div
                key={i}
                className="rounded-[1px]"
                style={{
                  backgroundColor:
                    i === 4 ? 'transparent' : `${FUNNEL_COLOURS.onInk}${i % 2 === 0 ? '90' : '40'}`,
                }}
                initial={reduce ? false : {opacity: 0}}
                animate={play || reduce ? {opacity: 1} : undefined}
                transition={{delay: play ? 0.75 + i * 0.04 : 0}}
              />
            ))}
          </motion.div>
          <div className="min-w-0">
            <p
              className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
              style={{color: FUNNEL_COLOURS.goldLight}}
            >
              QR · van and invoice
            </p>
            <div
              className="mt-2 h-1.5 w-28 rounded-full overflow-hidden"
              style={{backgroundColor: `${FUNNEL_COLOURS.onInk}22`}}
            >
              <motion.div
                className="h-full"
                style={{backgroundColor: FUNNEL_COLOURS.goldLight}}
                initial={{width: '0%'}}
                animate={play || reduce ? {width: '100%'} : {width: '0%'}}
                transition={{delay: play ? 0.9 : 0, duration: 0.7, ease: [0.16, 1, 0.3, 1]}}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
