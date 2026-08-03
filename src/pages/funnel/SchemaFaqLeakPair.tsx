import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

const QUESTIONS = ['Do you cover emergency jobs?', 'What suburbs do you cover?', 'How much does a job cost?']

/**
 * Leak: empty dashed FAQ slots beside the same content answered, marked up,
 * and readable by AI tools. Shape-first, almost no words.
 */
export function SchemaFaqLeakPair() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.3})
  const reduce = useReducedMotion()
  const go = !reduce && inView

  return (
    <motion.div
      ref={ref}
      className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
      initial={reduce ? false : {opacity: 0, y: 22}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.55, ease: EASE}}
    >
      {/* Uncited: dashed FAQ slots, nothing an AI tool can quote */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.accent}40`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.accent}}
        >
          Unciteable
        </div>
        <div className="p-4 md:p-5 flex flex-col items-center gap-2 min-h-[148px]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-full max-w-[220px] rounded-md border border-dashed px-3 py-2"
              style={{borderColor: `${FUNNEL_COLOURS.ink}22`}}
            >
              <p className="font-mono text-[7px] uppercase tracking-wide" style={{color: `${FUNNEL_COLOURS.ink}35`}}>
                Q ···
              </p>
            </div>
          ))}
          <motion.p
            className="mt-1 font-mono text-[8px] uppercase tracking-wide"
            style={{color: `${FUNNEL_COLOURS.ink}40`}}
            animate={go ? {opacity: [0.3, 0.6, 0.3]} : {opacity: 0.4}}
            transition={{duration: 2.8, repeat: Infinity, ease: 'easeInOut'}}
          >
            AI shrugs
          </motion.p>
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em]"
          style={{color: `${FUNNEL_COLOURS.ink}45`, backgroundColor: `${FUNNEL_COLOURS.ink}05`}}
        >
          Nothing to quote
        </div>
      </div>

      {/* Cited: answered rows staged in, a gold Schema chip, green status */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.goldDeep}55`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div className="px-3 py-2 flex items-center justify-between">
          <span
            className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Citeable
          </span>
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{backgroundColor: '#1F7A4D'}}
            animate={go ? {opacity: [0.45, 1, 0.45]} : {opacity: 0.7}}
            transition={{duration: 1.6, repeat: Infinity, ease: 'easeInOut'}}
          />
        </div>
        <div className="p-4 md:p-5 flex flex-col items-center gap-2 min-h-[148px]">
          {QUESTIONS.map((q, i) => (
            <motion.div
              key={q}
              className="w-full max-w-[220px] rounded-md px-3 py-2"
              style={{backgroundColor: `${FUNNEL_COLOURS.gold}18`, border: `1px solid ${FUNNEL_COLOURS.goldDeep}45`}}
              initial={reduce ? false : {opacity: 0, y: 8}}
              animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.5, y: 4}}
              transition={{delay: reduce ? 0 : 0.1 + i * 0.14, duration: 0.4, ease: EASE}}
            >
              <p className="font-mono text-[7px] font-bold truncate" style={{color: FUNNEL_COLOURS.goldDeep}}>
                {q}
              </p>
            </motion.div>
          ))}
          <motion.span
            className="mt-1 rounded-sm px-2.5 py-1 font-mono text-[7px] font-bold uppercase tracking-[0.14em]"
            style={{backgroundColor: FUNNEL_COLOURS.gold, color: FUNNEL_COLOURS.ink}}
            initial={reduce ? false : {opacity: 0, scale: 0.9}}
            animate={go || reduce ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.9}}
            transition={{delay: reduce ? 0 : 0.62, type: 'spring', stiffness: 320, damping: 22}}
          >
            Schema
          </motion.span>
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep, backgroundColor: `${FUNNEL_COLOURS.goldDeep}12`}}
        >
          Answers · Markup
        </div>
      </div>
    </motion.div>
  )
}
