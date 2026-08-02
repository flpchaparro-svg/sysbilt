import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Leak: a page with an empty title and a dashed headline beside the same
 * page with a filled title, a real H1, and internal links wired in.
 * Shape-first, almost no words.
 */
export function OnpageLeakPair() {
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
      {/* Thin signal: empty title, dashed headline, no links to lean on */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.accent}40`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.accent}}
        >
          Thin signal
        </div>
        <div className="p-4 md:p-5 flex flex-col items-center gap-3">
          <div
            className="w-full max-w-[220px] rounded-md border border-dashed px-3 py-2.5 text-center"
            style={{borderColor: `${FUNNEL_COLOURS.ink}22`}}
          >
            <p
              className="font-mono text-[7px] uppercase tracking-wide mb-1"
              style={{color: `${FUNNEL_COLOURS.ink}45`}}
            >
              Title
            </p>
            <p className="font-mono text-[9px] font-bold" style={{color: `${FUNNEL_COLOURS.ink}35`}}>
              Brand only
            </p>
          </div>
          <motion.div
            className="h-2.5 w-3/5 rounded-sm border border-dashed"
            style={{borderColor: `${FUNNEL_COLOURS.accent}45`}}
            animate={go ? {opacity: [0.35, 0.7, 0.35]} : {opacity: 0.5}}
            transition={{duration: 2.6, repeat: Infinity, ease: 'easeInOut'}}
          />
          <div className="flex items-center gap-1.5 w-full max-w-[220px] justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-2 flex-1 rounded-sm border border-dashed"
                style={{borderColor: `${FUNNEL_COLOURS.ink}18`}}
              />
            ))}
          </div>
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em]"
          style={{color: `${FUNNEL_COLOURS.ink}45`, backgroundColor: `${FUNNEL_COLOURS.ink}05`}}
        >
          Google shrugs
        </div>
      </div>

      {/* Clear signal: filled title, a real H1, internal links wired in */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.goldDeep}55`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div className="px-3 py-2 flex items-center justify-between">
          <span
            className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Clear signal
          </span>
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{backgroundColor: '#1F7A4D'}}
            animate={go ? {opacity: [0.45, 1, 0.45]} : {opacity: 0.7}}
            transition={{duration: 1.6, repeat: Infinity, ease: 'easeInOut'}}
          />
        </div>
        <div className="p-4 md:p-5 flex flex-col items-center gap-3">
          <motion.div
            className="w-full max-w-[220px] rounded-md px-3 py-2.5 text-center"
            style={{backgroundColor: `${FUNNEL_COLOURS.gold}18`, border: `1px solid ${FUNNEL_COLOURS.goldDeep}55`}}
            initial={reduce ? false : {opacity: 0, scale: 0.92}}
            animate={go ? {opacity: 1, scale: 1} : {opacity: 0.85, scale: 0.96}}
            transition={{delay: 0.15, type: 'spring', stiffness: 320, damping: 22}}
          >
            <p className="font-mono text-[7px] uppercase tracking-wide mb-1" style={{color: FUNNEL_COLOURS.goldDeep}}>
              Title
            </p>
            <p className="font-mono text-[9px] font-bold" style={{color: FUNNEL_COLOURS.goldDeep}}>
              Service + suburb
            </p>
          </motion.div>
          <motion.div
            className="h-2.5 rounded-sm"
            style={{backgroundColor: FUNNEL_COLOURS.goldDeep}}
            initial={reduce ? false : {width: '35%', opacity: 0.4}}
            animate={go ? {width: '60%', opacity: 1} : {width: '35%', opacity: 0.4}}
            transition={{duration: 0.45, delay: 0.35, ease: EASE}}
          />
          <div className="flex items-center gap-1.5 w-full max-w-[220px] justify-center">
            {['Services', 'Proof', 'Contact'].map((label, i) => (
              <motion.span
                key={label}
                className="flex-1 rounded-sm border px-1 py-1 text-center font-mono text-[6px] uppercase tracking-wide"
                style={{borderColor: `${FUNNEL_COLOURS.goldDeep}40`, color: FUNNEL_COLOURS.goldDeep}}
                initial={reduce ? false : {opacity: 0, y: 6}}
                animate={go ? {opacity: 1, y: 0} : {opacity: 0.4, y: 0}}
                transition={{delay: reduce ? 0 : 0.5 + i * 0.12, duration: 0.35}}
              >
                {label}
              </motion.span>
            ))}
          </div>
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep, backgroundColor: `${FUNNEL_COLOURS.goldDeep}12`}}
        >
          Titles · Headings · Links
        </div>
      </div>
    </motion.div>
  )
}
