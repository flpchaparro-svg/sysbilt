import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Leak: Piecemeal shows three disconnected, drifting bits (profile, reviews, posts bought
 * separately, never lining up). One sprint shows the same three as connected, lit nodes.
 * Shape-first, almost no words.
 */
export function LocalPackLeakPair() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.3})
  const reduce = useReducedMotion()
  const go = !reduce && inView

  const labels = ['Profile', 'Reviews', 'Posts']
  const positions = [
    {left: '10%', top: '18%'},
    {left: '52%', top: '52%'},
    {left: '18%', top: '68%'},
  ]

  return (
    <motion.div
      ref={ref}
      className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
      initial={reduce ? false : {opacity: 0, y: 22}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
    >
      {/* Piecemeal: three bits scattered, soft drift, no connecting lines */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.accent}40`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div className="px-3 py-2">
          <span
            className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.accent}}
          >
            Piecemeal
          </span>
        </div>
        <div className="px-4 md:px-5 pb-5 md:pb-6 h-[164px] relative">
          {labels.map((label, i) => (
            <motion.div
              key={label}
              className="absolute flex flex-col items-center gap-1.5"
              style={{...positions[i], opacity: 0.55}}
              animate={
                go
                  ? {
                      x: [0, i % 2 === 0 ? -5 : 6, 0],
                      y: [0, i === 1 ? -6 : 5, 0],
                    }
                  : undefined
              }
              transition={{duration: 4.2 + i * 0.5, repeat: Infinity, ease: 'easeInOut'}}
            >
              <div
                className="h-8 w-8 rounded-md border border-dashed"
                style={{borderColor: `${FUNNEL_COLOURS.ink}28`, backgroundColor: `${FUNNEL_COLOURS.ink}05`}}
              />
              <span
                className="font-mono text-[6px] uppercase tracking-wide"
                style={{color: `${FUNNEL_COLOURS.ink}55`}}
              >
                {label}
              </span>
            </motion.div>
          ))}
          <span
            className="absolute bottom-2 right-2.5 font-mono text-[7px] uppercase tracking-[0.14em]"
            style={{color: `${FUNNEL_COLOURS.ink}30`}}
          >
            3 kickoffs
          </span>
        </div>
      </div>

      {/* One sprint: same three, connected by lines that draw once */}
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.goldDeep}55`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div className="px-3 py-2 flex items-center justify-between">
          <span
            className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            One sprint
          </span>
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{backgroundColor: '#1F7A4D'}}
            animate={go ? {opacity: [0.45, 1, 0.45]} : {opacity: 0.7}}
            transition={{duration: 1.6, repeat: Infinity, ease: 'easeInOut'}}
          />
        </div>
        <div className="px-4 md:px-5 pb-5 md:pb-6 h-[164px] relative">
          <svg className="absolute inset-0 h-full w-full" aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M 18 30 L 60 60"
              fill="none"
              stroke={FUNNEL_COLOURS.goldDeep}
              strokeWidth={1.2}
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : {pathLength: 0, opacity: 0}}
              animate={go || reduce ? {pathLength: 1, opacity: 0.55} : {pathLength: 0, opacity: 0}}
              transition={{duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1]}}
            />
            <motion.path
              d="M 60 60 L 26 78"
              fill="none"
              stroke={FUNNEL_COLOURS.goldDeep}
              strokeWidth={1.2}
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : {pathLength: 0, opacity: 0}}
              animate={go || reduce ? {pathLength: 1, opacity: 0.55} : {pathLength: 0, opacity: 0}}
              transition={{duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1]}}
            />
          </svg>
          {labels.map((label, i) => (
            <motion.div
              key={label}
              className="absolute flex flex-col items-center gap-1.5"
              style={positions[i]}
              initial={reduce ? false : {opacity: 0, scale: 0.88}}
              animate={go || reduce ? {opacity: 1, scale: 1} : {opacity: 0.4, scale: 0.9}}
              transition={{delay: 0.08 + i * 0.12, type: 'spring', stiffness: 340, damping: 22}}
            >
              <div
                className="h-8 w-8 rounded-md"
                style={{
                  backgroundColor: `${FUNNEL_COLOURS.gold}30`,
                  border: `1px solid ${FUNNEL_COLOURS.goldDeep}70`,
                }}
              />
              <span
                className="font-mono text-[6px] uppercase tracking-wide"
                style={{color: FUNNEL_COLOURS.goldDeep}}
              >
                {label}
              </span>
            </motion.div>
          ))}
          <span
            className="absolute bottom-2 right-2.5 font-mono text-[7px] font-bold uppercase tracking-[0.14em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            1 handoff
          </span>
        </div>
      </div>
    </motion.div>
  )
}
