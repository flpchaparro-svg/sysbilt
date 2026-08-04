import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Leak: the ask stays a thought vs the ask fires the second the job closes.
 */
export function ReviewLeakPair() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.3})
  const reduce = useReducedMotion()
  const play = inView && !reduce

  return (
    <motion.div
      ref={ref}
      className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
      initial={reduce ? false : {opacity: 0, y: 18}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
    >
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.accent}35`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div
          className="px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.accent, backgroundColor: `${FUNNEL_COLOURS.accent}10`}}
        >
          After the job · today
        </div>
        <div className="relative h-[200px] md:h-[220px] p-4 flex flex-col items-center justify-center">
          <motion.div
            className="absolute top-8 left-1/2 -translate-x-1/2 w-[78%] rounded-2xl rounded-bl-sm border px-3 py-3"
            style={{
              borderColor: `${FUNNEL_COLOURS.ink}14`,
              backgroundColor: `${FUNNEL_COLOURS.ink}16`,
            }}
            animate={
              play
                ? {opacity: [0.35, 0.7, 0.35], y: [0, -3, 0]}
                : {opacity: 0.45}
            }
            transition={play ? {duration: 2.4, repeat: Infinity} : undefined}
          >
            <div className="flex gap-1 mb-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full"
                  style={{backgroundColor: `${FUNNEL_COLOURS.ink}35`}}
                  animate={play ? {opacity: [0.3, 1, 0.3]} : undefined}
                  transition={play ? {duration: 1.2, repeat: Infinity, delay: i * 0.2} : undefined}
                />
              ))}
            </div>
            <div className="h-2 w-4/5 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}18`}} />
            <div className="mt-1.5 h-2 w-3/5 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}12`}} />
          </motion.div>
          <motion.p
            className="absolute bottom-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{color: FUNNEL_COLOURS.accent}}
            animate={play ? {opacity: [0.55, 1, 0.55]} : undefined}
            transition={play ? {duration: 2, repeat: Infinity} : undefined}
          >
            Draft · never sent
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
          After the setup
        </div>
        <div className="relative h-[200px] md:h-[220px] p-4 flex flex-col justify-center gap-3">
          <motion.div
            className="self-start rounded-md border px-2.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider"
            style={{
              borderColor: `${FUNNEL_COLOURS.goldDeep}66`,
              backgroundColor: `${FUNNEL_COLOURS.gold}22`,
              color: FUNNEL_COLOURS.goldDeep,
            }}
            initial={reduce ? false : {opacity: 0, scale: 0.9}}
            animate={play || reduce ? {opacity: 1, scale: 1} : {opacity: 0.4}}
            transition={{duration: 0.35}}
          >
            Job complete
          </motion.div>
          <motion.div
            className="rounded-2xl rounded-bl-sm border px-3 py-3 max-w-[92%]"
            style={{
              borderColor: `${FUNNEL_COLOURS.ink}12`,
              backgroundColor: FUNNEL_COLOURS.ground,
            }}
            initial={reduce ? false : {opacity: 0, y: 16, x: -8}}
            animate={play || reduce ? {opacity: 1, y: 0, x: 0} : {opacity: 0}}
            transition={{delay: play ? 0.35 : 0, duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="h-6 w-6 rounded-full flex items-center justify-center text-[10px]"
                style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
              >
                ✉
              </span>
              <span
                className="font-mono text-[8px] font-bold uppercase tracking-widest"
                style={{color: FUNNEL_COLOURS.goldDeep}}
              >
                SMS · sent
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}22`}} />
              <div className="h-2 w-4/5 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}16`}} />
              <motion.div
                className="h-2 w-2/5 rounded-sm"
                style={{backgroundColor: FUNNEL_COLOURS.accent}}
                animate={
                  play
                    ? {opacity: [0.5, 1, 0.5]}
                    : undefined
                }
                transition={play ? {duration: 1.6, repeat: Infinity, delay: 0.8} : undefined}
              />
            </div>
          </motion.div>
          <motion.p
            className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{color: '#1B6B3A'}}
            initial={{opacity: 0}}
            animate={play || reduce ? {opacity: 1} : {opacity: 0}}
            transition={{delay: play ? 0.7 : 0}}
          >
            Automatic ask
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
