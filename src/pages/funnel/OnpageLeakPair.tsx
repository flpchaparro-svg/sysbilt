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
        <div className="p-4 md:p-5 flex flex-col items-center gap-3 min-h-[148px]">
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
            animate={go ? {opacity: [0.35, 0.65, 0.35]} : {opacity: 0.5}}
            transition={{duration: 2.8, repeat: Infinity, ease: 'easeInOut'}}
          />
          <div className="flex items-center gap-1.5 w-full max-w-[220px] justify-center">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-6 flex-1 rounded-sm border border-dashed"
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

      {/* Clear signal: title → heading → links, staged once */}
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
        <div className="p-4 md:p-5 flex flex-col items-center gap-2.5 min-h-[148px]">
          <motion.div
            className="w-full max-w-[220px] rounded-md px-3 py-2.5 text-center"
            style={{backgroundColor: `${FUNNEL_COLOURS.gold}18`, border: `1px solid ${FUNNEL_COLOURS.goldDeep}55`}}
            initial={reduce ? false : {opacity: 0, y: 8}}
            animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.5, y: 4}}
            transition={{delay: 0.1, duration: 0.4, ease: EASE}}
          >
            <p className="font-mono text-[7px] uppercase tracking-wide mb-1" style={{color: FUNNEL_COLOURS.goldDeep}}>
              Title
            </p>
            <p className="font-mono text-[9px] font-bold" style={{color: FUNNEL_COLOURS.goldDeep}}>
              Service + suburb
            </p>
          </motion.div>

          {/* short connector stem */}
          <motion.div
            className="w-px h-3 origin-top"
            style={{backgroundColor: `${FUNNEL_COLOURS.goldDeep}55`}}
            initial={reduce ? false : {scaleY: 0, opacity: 0}}
            animate={go || reduce ? {scaleY: 1, opacity: 1} : {scaleY: 0, opacity: 0}}
            transition={{delay: 0.28, duration: 0.3, ease: EASE}}
          />

          <motion.div
            className="h-2.5 rounded-sm"
            style={{backgroundColor: FUNNEL_COLOURS.goldDeep, width: '60%'}}
            initial={reduce ? false : {opacity: 0, scaleX: 0.4}}
            animate={go || reduce ? {opacity: 1, scaleX: 1} : {opacity: 0.4, scaleX: 0.4}}
            transition={{duration: 0.4, delay: 0.38, ease: EASE}}
          />

          <motion.div
            className="w-px h-3 origin-top"
            style={{backgroundColor: `${FUNNEL_COLOURS.goldDeep}55`}}
            initial={reduce ? false : {scaleY: 0, opacity: 0}}
            animate={go || reduce ? {scaleY: 1, opacity: 1} : {scaleY: 0, opacity: 0}}
            transition={{delay: 0.52, duration: 0.3, ease: EASE}}
          />

          <div className="flex items-center gap-1.5 w-full max-w-[220px] justify-center">
            {['Services', 'Proof', 'Contact'].map((label, i) => (
              <motion.span
                key={label}
                className="flex-1 rounded-sm border px-1 py-1.5 text-center font-mono text-[6px] uppercase tracking-wide"
                style={{
                  borderColor: `${FUNNEL_COLOURS.goldDeep}55`,
                  color: FUNNEL_COLOURS.goldDeep,
                  backgroundColor: `${FUNNEL_COLOURS.gold}10`,
                }}
                initial={reduce ? false : {opacity: 0, y: 6}}
                animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.35, y: 0}}
                transition={{delay: reduce ? 0 : 0.6 + i * 0.1, duration: 0.35, ease: EASE}}
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
