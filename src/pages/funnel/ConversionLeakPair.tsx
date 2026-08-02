import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

function SpeedBars({go}: {go: boolean}) {
  const heights = [55, 78, 94]
  return (
    <div className="flex items-end gap-1.5 h-10">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="w-2.5 rounded-sm"
          style={{backgroundColor: `${FUNNEL_COLOURS.goldDeep}60`}}
          initial={{height: '22%'}}
          animate={go ? {height: `${h}%`} : undefined}
          transition={{delay: 0.1 + i * 0.1, duration: 0.4, ease: EASE}}
        />
      ))}
    </div>
  )
}

/**
 * Leak: a fast site with a faint, drifting ask beside the same speed paired
 * with one solid, unmissable call to action. Shape-first, almost no words.
 */
export function ConversionLeakPair() {
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
      {/* Fast but silent: speed is fine, the ask drifts and fades */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.accent}40`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.accent}}
        >
          Fast but silent
        </div>
        <div className="p-4 md:p-5 flex flex-col items-center gap-4">
          <SpeedBars go={go} />
          <motion.div
            className="rounded-md border border-dashed px-4 py-2"
            style={{borderColor: `${FUNNEL_COLOURS.ink}22`}}
            animate={go ? {opacity: [0.35, 0.7, 0.35], y: [0, -2, 0]} : {opacity: 0.5}}
            transition={{duration: 3, repeat: Infinity, ease: 'easeInOut'}}
          >
            <span
              className="font-mono text-[9px] uppercase tracking-wide"
              style={{color: `${FUNNEL_COLOURS.ink}45`}}
            >
              Enquire
            </span>
          </motion.div>
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em]"
          style={{color: `${FUNNEL_COLOURS.ink}45`, backgroundColor: `${FUNNEL_COLOURS.ink}05`}}
        >
          Traffic stays · No enquire
        </div>
      </div>

      {/* Clear ask: same speed, one solid, unmissable call to action */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.goldDeep}55`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div className="px-3 py-2 flex items-center justify-between">
          <span
            className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Clear ask
          </span>
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{backgroundColor: '#1F7A4D'}}
            animate={go ? {opacity: [0.45, 1, 0.45]} : {opacity: 0.7}}
            transition={{duration: 1.6, repeat: Infinity, ease: 'easeInOut'}}
          />
        </div>
        <div className="p-4 md:p-5 flex flex-col items-center gap-4">
          <SpeedBars go={go} />
          <motion.div
            className="rounded-md px-4 py-2"
            style={{backgroundColor: FUNNEL_COLOURS.gold}}
            initial={reduce ? false : {opacity: 0, scale: 0.9}}
            animate={go ? {opacity: 1, scale: 1} : {opacity: 0.85, scale: 0.96}}
            transition={{delay: 0.35, type: 'spring', stiffness: 320, damping: 22}}
          >
            <span
              className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
              style={{color: FUNNEL_COLOURS.ink}}
            >
              Enquire
            </span>
          </motion.div>
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep, backgroundColor: `${FUNNEL_COLOURS.goldDeep}12`}}
        >
          Offer · Proof · Next step
        </div>
      </div>
    </motion.div>
  )
}
