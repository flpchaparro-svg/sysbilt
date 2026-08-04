import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Leak: Piecemeal shows three disconnected, drifting bits (profile, reviews, posts bought
 * separately, never lining up). One sprint shows the same three as connected, lit nodes.
 * Shape-first, almost no words.
 *
 * Icon centres and SVG endpoints share the same coords so connector lines meet behind
 * the chips instead of overshooting through them.
 */
const NODES = [
  {label: 'Profile', cx: 22, cy: 28},
  {label: 'Reviews', cx: 72, cy: 48},
  {label: 'Posts', cx: 30, cy: 72},
] as const

export function LocalPackLeakPair() {
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
        <div className="px-4 md:px-5 pb-5 md:pb-6 min-h-[188px] relative">
          {NODES.map((node, i) => (
            <motion.div
              key={node.label}
              className="absolute"
              style={{left: `${node.cx}%`, top: `${node.cy}%`}}
              animate={
                go
                  ? {
                      x: [0, i % 2 === 0 ? -6 : 7, 0],
                      y: [0, i === 1 ? -7 : 6, 0],
                    }
                  : undefined
              }
              transition={{duration: 4.2 + i * 0.5, repeat: Infinity, ease: 'easeInOut'}}
            >
              <div
                className="h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-md border border-dashed"
                style={{
                  borderColor: FUNNEL_COLOURS.mockBorder,
                  backgroundColor: FUNNEL_COLOURS.mockWash,
                }}
              />
              <span
                className="absolute left-0 top-[22px] -translate-x-1/2 font-mono text-[6px] uppercase tracking-wide whitespace-nowrap"
                style={{color: FUNNEL_COLOURS.mockLabel}}
              >
                {node.label}
              </span>
            </motion.div>
          ))}
          <span
            className="absolute bottom-2 right-2.5 font-mono text-[7px] uppercase tracking-[0.14em]"
            style={{color: `${FUNNEL_COLOURS.accent}90`}}
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
            animate={go ? {opacity: [0.45, 1, 0.45], scale: [1, 1.2, 1]} : {opacity: 0.7}}
            transition={{duration: 1.6, repeat: Infinity, ease: 'easeInOut'}}
          />
        </div>
        <div className="px-4 md:px-5 pb-5 md:pb-6 min-h-[188px] relative">
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none z-0"
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d={`M ${NODES[0].cx} ${NODES[0].cy} L ${NODES[1].cx} ${NODES[1].cy}`}
              fill="none"
              stroke={FUNNEL_COLOURS.goldDeep}
              strokeWidth={1.4}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : {pathLength: 0, opacity: 0}}
              animate={go || reduce ? {pathLength: 1, opacity: 0.7} : {pathLength: 0, opacity: 0}}
              transition={{duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1]}}
            />
            <motion.path
              d={`M ${NODES[1].cx} ${NODES[1].cy} L ${NODES[2].cx} ${NODES[2].cy}`}
              fill="none"
              stroke={FUNNEL_COLOURS.goldDeep}
              strokeWidth={1.4}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : {pathLength: 0, opacity: 0}}
              animate={go || reduce ? {pathLength: 1, opacity: 0.7} : {pathLength: 0, opacity: 0}}
              transition={{duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1]}}
            />
            <motion.path
              d={`M ${NODES[2].cx} ${NODES[2].cy} L ${NODES[0].cx} ${NODES[0].cy}`}
              fill="none"
              stroke={FUNNEL_COLOURS.goldDeep}
              strokeWidth={1.4}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : {pathLength: 0, opacity: 0}}
              animate={go || reduce ? {pathLength: 1, opacity: 0.55} : {pathLength: 0, opacity: 0}}
              transition={{duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1]}}
            />
          </svg>
          {NODES.map((node, i) => (
            <motion.div
              key={node.label}
              className="absolute z-10"
              style={{left: `${node.cx}%`, top: `${node.cy}%`}}
              initial={reduce ? false : {opacity: 0, scale: 0.88}}
              animate={go || reduce ? {opacity: 1, scale: 1} : {opacity: 0.55, scale: 0.94}}
              transition={{delay: 0.08 + i * 0.12, type: 'spring', stiffness: 340, damping: 22}}
            >
              {/* Icon centre on (cx, cy). Label hangs below so lines meet the chip. */}
              <div
                className="h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-md"
                style={{
                  backgroundColor: `${FUNNEL_COLOURS.gold}38`,
                  border: `1px solid ${FUNNEL_COLOURS.goldDeep}`,
                }}
              />
              <span
                className="absolute left-0 top-[22px] -translate-x-1/2 font-mono text-[6px] uppercase tracking-wide whitespace-nowrap"
                style={{color: FUNNEL_COLOURS.goldDeep}}
              >
                {node.label}
              </span>
            </motion.div>
          ))}
          <span
            className="absolute bottom-2 right-2.5 font-mono text-[7px] font-bold uppercase tracking-[0.14em] z-10"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            1 handoff
          </span>
        </div>
      </div>
    </motion.div>
  )
}
