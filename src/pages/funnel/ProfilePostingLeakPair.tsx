import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/** Leak: a quiet profile (feed dims) vs a profile publishing on a rhythm (cards slide in). Almost no words. */
export function ProfilePostingLeakPair() {
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
      {/* Quiet */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.accent}40`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div className="px-3 py-2 flex items-center justify-between">
          <span
            className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.accent}}
          >
            Quiet
          </span>
          <div className="flex items-center gap-1">
            {Array.from({length: 3}).map((_, i) => (
              <span key={i} className="h-1 w-1 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.ink}18`}} />
            ))}
          </div>
        </div>
        <div className="px-4 md:px-5 pb-4 md:pb-5 space-y-2.5">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="h-8 w-8 rounded-md border border-dashed shrink-0"
              style={{borderColor: `${FUNNEL_COLOURS.ink}20`}}
            />
            <div className="flex-1 space-y-1.5">
              <div className="h-2 w-2/5 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}10`}} />
              <div className="h-1.5 w-1/4 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}08`}} />
            </div>
          </div>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-8 rounded-lg border border-dashed"
              style={{borderColor: `${FUNNEL_COLOURS.ink}16`}}
              animate={
                go
                  ? {opacity: [0.5, 0.2, 0.5], scale: [1, 0.985, 1]}
                  : {opacity: 0.3}
              }
              transition={{duration: 2.4, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut'}}
            />
          ))}
        </div>
      </div>

      {/* Alive */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{
          borderColor: `${FUNNEL_COLOURS.goldDeep}55`,
          backgroundColor: FUNNEL_COLOURS.surface,
        }}
      >
        <div className="px-3 py-2 flex items-center justify-between">
          <span
            className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Alive
          </span>
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{backgroundColor: '#1F7A4D'}}
            animate={go ? {opacity: [0.4, 1, 0.4]} : {opacity: 0.7}}
            transition={{duration: 1.3, repeat: Infinity}}
          />
        </div>
        <div className="px-4 md:px-5 pb-4 md:pb-5 space-y-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2.5 rounded-lg border px-2.5 py-2"
              style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: '#fff'}}
              initial={reduce ? false : {opacity: 0, y: 14}}
              animate={
                go
                  ? {opacity: [0, 1, 1, 0.35], y: [14, 0, 0, -4]}
                  : {opacity: 1, y: 0}
              }
              transition={{
                duration: 2.6,
                repeat: Infinity,
                delay: i * 0.55,
                times: [0, 0.18, 0.75, 1],
                ease: 'easeInOut',
              }}
            >
              <div
                className="h-7 w-7 rounded-md shrink-0"
                style={{backgroundColor: `${FUNNEL_COLOURS.gold}30`}}
              />
              <div className="flex-1 space-y-1.5">
                <div className="h-1.5 w-4/5 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}14`}} />
                <div className="h-1.5 w-1/2 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}0A`}} />
              </div>
              <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{backgroundColor: '#1F7A4D'}} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
