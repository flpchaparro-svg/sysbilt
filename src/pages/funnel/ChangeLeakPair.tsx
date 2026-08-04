import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Leak: week-three help desk flood vs the old spreadsheet quietly winning.
 */
export function ChangeLeakPair() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.3})
  const reduce = useReducedMotion()
  const go = !reduce && inView

  return (
    <motion.div
      ref={ref}
      className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
      initial={reduce ? false : {opacity: 0, y: 22}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
    >
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.accent}40`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div
          className="px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.accent, backgroundColor: `${FUNNEL_COLOURS.accent}12`}}
        >
          Week three · help desk
        </div>
        <div className="p-4 md:p-5 space-y-2">
          {[
            {label: 'How do I log a job?', hot: false},
            {label: 'Where did the old fields go?', hot: true},
            {label: 'Can we still use the sheet?', hot: false},
          ].map((row, i) => (
            <motion.div
              key={row.label}
              className="rounded-lg px-3 py-2.5 font-mono text-[10px] uppercase tracking-wider flex items-center justify-between"
              style={{
                backgroundColor: row.hot ? `${FUNNEL_COLOURS.accent}12` : `${FUNNEL_COLOURS.ink}16`,
                color: row.hot ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.muted,
              }}
              initial={reduce ? false : {opacity: 0, x: -10}}
              animate={
                go
                  ? row.hot
                    ? {opacity: [0.55, 1, 0.55], x: [0, 3, 0]}
                    : {opacity: 0.7, x: 0}
                  : {opacity: 0.7, x: 0}
              }
              transition={
                row.hot
                  ? {duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.15}
                  : {delay: i * 0.08, duration: 0.35}
              }
            >
              <span className="truncate pr-2">{row.label}</span>
              <span className="shrink-0 font-bold normal-case tracking-normal">Open</span>
            </motion.div>
          ))}
          <motion.p
            className="pt-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{color: FUNNEL_COLOURS.accent}}
            animate={go ? {scale: [1, 1.04, 1]} : undefined}
            transition={{duration: 1.2, repeat: Infinity}}
          >
            41 open tickets
          </motion.p>
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
          Quietly reopened
        </div>
        <div className="p-4 md:p-5">
          <motion.div
            className="relative rounded-lg border overflow-hidden"
            style={{
              borderColor: `${FUNNEL_COLOURS.ink}14`,
              backgroundColor: '#fff',
              boxShadow: `6px 8px 0 0 ${FUNNEL_COLOURS.ink}22`,
            }}
            initial={reduce ? false : {opacity: 0, y: 12, rotate: -1.5}}
            whileInView={{opacity: 1, y: 0, rotate: 0}}
            viewport={{once: true}}
            transition={{type: 'spring', stiffness: 320, damping: 18}}
            animate={go ? {y: [0, -3, 0]} : undefined}
          >
            <div
              className="h-8 flex items-center gap-2 px-3 border-b"
              style={{borderColor: `${FUNNEL_COLOURS.ink}2C`, backgroundColor: FUNNEL_COLOURS.ground}}
            >
              <span className="h-2 w-2 rounded-sm" style={{backgroundColor: '#1F7A4D'}} />
              <span className="font-mono text-[8px] uppercase tracking-wider text-dark/55">
                Spreadsheet
              </span>
              <motion.span
                className="ml-auto font-mono text-[8px] font-bold uppercase tracking-wider"
                style={{color: FUNNEL_COLOURS.goldDeep}}
                animate={go ? {opacity: [0.4, 1, 0.4]} : undefined}
                transition={{duration: 1.1, repeat: Infinity}}
              >
                Live again
              </motion.span>
            </div>
            <div className="px-3 py-4">
              <p className="font-mono text-[12px] font-semibold tracking-wide" style={{color: FUNNEL_COLOURS.ink}}>
                old_spreadsheet_v7_FINAL.xlsx
              </p>
              <div className="mt-3 space-y-1.5">
                <div className="h-1.5 w-full rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}12`}} />
                <div className="h-1.5 rounded-sm" style={{width: '80%', backgroundColor: `${FUNNEL_COLOURS.ink}2C`}} />
                <div className="h-1.5 rounded-sm" style={{width: '60%', backgroundColor: `${FUNNEL_COLOURS.ink}1C`}} />
              </div>
            </div>
          </motion.div>
          <p className="mt-4 font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
            The project didn&apos;t fail at the technology. It failed in the gap between announcement and
            habit.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
