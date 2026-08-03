import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

/** Leak: inventing bot beside leashed FAQ chat. */
export function SiteChatLeakPair() {
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
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.accent}55`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.accent}}
        >
          Loose bot
        </div>
        <div className="p-4 md:p-5 flex flex-col justify-center gap-2.5 min-h-[168px]">
          <div
            className="rounded-lg border border-dashed px-3 py-2.5"
            style={{borderColor: `${FUNNEL_COLOURS.accent}55`, backgroundColor: `${FUNNEL_COLOURS.accent}08`}}
          >
            <p className="font-mono text-[8px] uppercase tracking-wide mb-1" style={{color: FUNNEL_COLOURS.accent}}>
              Visitor
            </p>
            <p className="font-sans text-[11px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              How much for a kitchen?
            </p>
          </div>
          <div
            className="rounded-lg border border-dashed px-3 py-2.5"
            style={{borderColor: `${FUNNEL_COLOURS.accent}55`, backgroundColor: `${FUNNEL_COLOURS.accent}08`}}
          >
            <p className="font-mono text-[8px] uppercase tracking-wide mb-1" style={{color: FUNNEL_COLOURS.accent}}>
              Bot
            </p>
            <p className="font-sans text-[11px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              About $12,000 fixed
            </p>
            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.accent}}>
              Invented · No handoff
            </p>
          </div>
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.accent, backgroundColor: `${FUNNEL_COLOURS.accent}10`}}
        >
          Dispute risk
        </div>
      </div>

      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.goldDeep}55`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div className="px-3 py-2 flex items-center justify-between">
          <span
            className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Leashed chat
          </span>
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{backgroundColor: '#1F7A4D'}}
            animate={go ? {opacity: [0.45, 1, 0.45]} : {opacity: 0.7}}
            transition={{duration: 1.6, repeat: Infinity, ease: 'easeInOut'}}
          />
        </div>
        <div className="p-4 md:p-5 flex flex-col justify-center gap-2.5 min-h-[168px]">
          <motion.div
            className="rounded-lg border px-3 py-2.5"
            style={{borderColor: `${FUNNEL_COLOURS.goldDeep}45`, backgroundColor: '#fff'}}
            initial={reduce ? false : {opacity: 0, y: 8}}
            animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.5}}
            transition={{delay: reduce ? 0 : 0.1, duration: 0.4, ease: EASE}}
          >
            <p className="font-mono text-[8px] uppercase tracking-wide mb-1" style={{color: FUNNEL_COLOURS.goldDeep}}>
              Visitor
            </p>
            <p className="font-sans text-[11px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              How much for a kitchen?
            </p>
          </motion.div>
          <motion.div
            className="rounded-lg border px-3 py-2.5"
            style={{borderColor: `${FUNNEL_COLOURS.goldDeep}45`, backgroundColor: '#fff'}}
            initial={reduce ? false : {opacity: 0, y: 8}}
            animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.5}}
            transition={{delay: reduce ? 0 : 0.25, duration: 0.4, ease: EASE}}
          >
            <p className="font-mono text-[8px] uppercase tracking-wide mb-1" style={{color: FUNNEL_COLOURS.goldDeep}}>
              Chat
            </p>
            <p className="font-sans text-[11px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              We quote after a look. Want the team to call?
            </p>
            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.goldDeep}}>
              Approved · Handoff
            </p>
          </motion.div>
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep, backgroundColor: `${FUNNEL_COLOURS.goldDeep}12`}}
        >
          Safe answers
        </div>
      </div>
    </motion.div>
  )
}
