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
  const inView = useInView(ref, {amount: 0.3})
  const reduce = useReducedMotion()
  const go = !reduce && inView

  const labels = ['Profile', 'Reviews', 'Posts']

  return (
    <motion.div
      ref={ref}
      className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
      initial={reduce ? false : {opacity: 0, y: 22}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
    >
      {/* Piecemeal: three bits scattered and drifting apart, no connecting lines */}
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
          {labels.map((label, i) => {
            const positions = [
              {left: '10%', top: '18%'},
              {left: '52%', top: '52%'},
              {left: '18%', top: '68%'},
            ]
            return (
              <motion.div
                key={label}
                className="absolute flex flex-col items-center gap-1.5"
                style={positions[i]}
                animate={
                  go
                    ? {
                        x: [0, i % 2 === 0 ? -4 : 5, 0],
                        y: [0, i === 1 ? -5 : 4, 0],
                        opacity: [0.5, 0.75, 0.5],
                      }
                    : {opacity: 0.55}
                }
                transition={{duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut'}}
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
            )
          })}
          <span
            className="absolute bottom-2 right-2.5 font-mono text-[7px] uppercase tracking-[0.14em]"
            style={{color: `${FUNNEL_COLOURS.ink}30`}}
          >
            3 kickoffs
          </span>
        </div>
      </div>

      {/* One sprint: same three, connected by lit lines, glowing together */}
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
            animate={go ? {opacity: [0.35, 1, 0.35], scale: [1, 1.25, 1]} : {opacity: 0.7}}
            transition={{duration: 1.2, repeat: Infinity, ease: 'easeInOut'}}
          />
        </div>
        <div className="px-4 md:px-5 pb-5 md:pb-6 h-[164px] relative">
          <svg className="absolute inset-0 h-full w-full" aria-hidden>
            <motion.line
              x1="26%"
              y1="30%"
              x2="60%"
              y2="60%"
              stroke={FUNNEL_COLOURS.goldDeep}
              strokeWidth={1.5}
              initial={reduce ? undefined : {pathLength: 0, opacity: 0}}
              animate={go ? {pathLength: 1, opacity: 0.6} : {opacity: 0.35}}
              transition={{duration: 0.6, delay: 0.15}}
            />
            <motion.line
              x1="60%"
              y1="60%"
              x2="30%"
              y2="76%"
              stroke={FUNNEL_COLOURS.goldDeep}
              strokeWidth={1.5}
              initial={reduce ? undefined : {pathLength: 0, opacity: 0}}
              animate={go ? {pathLength: 1, opacity: 0.6} : {opacity: 0.35}}
              transition={{duration: 0.6, delay: 0.35}}
            />
          </svg>
          {labels.map((label, i) => {
            const positions = [
              {left: '10%', top: '18%'},
              {left: '52%', top: '52%'},
              {left: '18%', top: '68%'},
            ]
            return (
              <motion.div
                key={label}
                className="absolute flex flex-col items-center gap-1.5"
                style={positions[i]}
                initial={reduce ? false : {opacity: 0.4, scale: 0.9}}
                animate={go ? {opacity: 1, scale: 1} : {opacity: 1, scale: 1}}
                transition={{delay: 0.1 + i * 0.15, type: 'spring', stiffness: 320, damping: 20}}
              >
                <motion.div
                  className="h-8 w-8 rounded-md"
                  style={{backgroundColor: `${FUNNEL_COLOURS.gold}30`, border: `1px solid ${FUNNEL_COLOURS.goldDeep}70`}}
                  animate={go ? {boxShadow: ['0 0 0 0 rgba(197,160,89,0)', '0 0 0 5px rgba(197,160,89,0.16)', '0 0 0 0 rgba(197,160,89,0)']} : undefined}
                  transition={{duration: 1.8, repeat: Infinity, delay: i * 0.3}}
                />
                <span
                  className="font-mono text-[6px] uppercase tracking-wide"
                  style={{color: FUNNEL_COLOURS.goldDeep}}
                >
                  {label}
                </span>
              </motion.div>
            )
          })}
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
