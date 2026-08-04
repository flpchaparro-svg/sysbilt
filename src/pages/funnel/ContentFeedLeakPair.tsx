import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/** Quiet feed vs a full scheduled month. */
export function ContentFeedLeakPair({lastPostMonth}: {lastPostMonth: string | null}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.3})
  const reduce = useReducedMotion()
  const go = !reduce && inView
  const quietLabel = lastPostMonth ? `Went quiet in ${lastPostMonth}` : 'Went quiet'

  return (
    <motion.div
      ref={ref}
      className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
      initial={reduce ? false : {opacity: 0, y: 22}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
    >
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.accent}40`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div
          className="px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.accent, backgroundColor: `${FUNNEL_COLOURS.accent}12`}}
        >
          Your feed
        </div>
        <div className="p-4 md:p-5">
          <div className="grid grid-cols-4 gap-1.5 mb-4">
            {Array.from({length: 8}).map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-sm"
                style={{
                  backgroundColor: i < 3 ? `${FUNNEL_COLOURS.ink}18` : `${FUNNEL_COLOURS.ink}16`,
                  border: i >= 3 ? `1px dashed ${FUNNEL_COLOURS.ink}22` : undefined,
                }}
                animate={
                  go && i >= 3
                    ? {opacity: [0.35, 0.7, 0.35]}
                    : undefined
                }
                transition={{duration: 1.6, repeat: Infinity, delay: i * 0.08}}
              />
            ))}
          </div>
          <motion.p
            className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{color: FUNNEL_COLOURS.accent}}
            animate={go ? {opacity: [0.55, 1, 0.55]} : undefined}
            transition={{duration: 1.4, repeat: Infinity}}
          >
            {quietLabel}
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
          The system
        </div>
        <div className="p-4 md:p-5">
          <div className="grid grid-cols-4 gap-1.5 mb-4">
            {Array.from({length: 8}).map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-sm relative overflow-hidden"
                style={{backgroundColor: `${FUNNEL_COLOURS.ink}12`}}
                initial={reduce ? false : {opacity: 0, scale: 0.9}}
                animate={go ? {opacity: 1, scale: 1} : {opacity: 1, scale: 1}}
                transition={{delay: i * 0.05, type: 'spring', stiffness: 360, damping: 18}}
              >
                <motion.span
                  className="absolute bottom-0.5 left-0.5 right-0.5 font-mono text-[6px] font-bold uppercase tracking-wider text-center"
                  style={{color: '#1F7A4D'}}
                  animate={go ? {opacity: [0.5, 1, 0.5]} : undefined}
                  transition={{duration: 1.2, repeat: Infinity, delay: i * 0.06}}
                >
                  Set
                </motion.span>
              </motion.div>
            ))}
          </div>
          <motion.p
            className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{color: '#1F7A4D'}}
            animate={go ? {scale: [1, 1.04, 1]} : undefined}
            transition={{duration: 1.3, repeat: Infinity}}
          >
            Scheduled
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
