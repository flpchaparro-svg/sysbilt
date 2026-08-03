import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

/** Leak: heavy gallery weight beside a cleaned set. */
export function MediaCleanLeakPair() {
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
          Heavy
        </div>
        <div className="p-4 md:p-5 flex flex-col justify-center gap-2 min-h-[168px]">
          {['IMG_4821.jpg · 6.2 MB', 'banner.png · 3.1 MB', 'gallery-01.jpg · 5.4 MB'].map((file) => (
            <div
              key={file}
              className="rounded-lg border border-dashed px-3 py-2.5 flex items-center justify-between gap-2"
              style={{borderColor: `${FUNNEL_COLOURS.accent}55`, backgroundColor: `${FUNNEL_COLOURS.accent}08`}}
            >
              <p className="font-sans text-[11px] font-semibold truncate" style={{color: FUNNEL_COLOURS.ink}}>
                {file}
              </p>
              <span className="font-mono text-[8px] font-bold uppercase tracking-wide shrink-0" style={{color: FUNNEL_COLOURS.accent}}>
                Fat
              </span>
            </div>
          ))}
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.accent, backgroundColor: `${FUNNEL_COLOURS.accent}10`}}
        >
          Score slips
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
            Clean
          </span>
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{backgroundColor: '#1F7A4D'}}
            animate={go ? {opacity: [0.45, 1, 0.45]} : {opacity: 0.7}}
            transition={{duration: 1.6, repeat: Infinity, ease: 'easeInOut'}}
          />
        </div>
        <div className="p-4 md:p-5 flex flex-col justify-center gap-2 min-h-[168px]">
          {['hero.webp · 160 KB', 'banner.webp · 90 KB', 'gallery-01.webp · 140 KB'].map((file, i) => (
            <motion.div
              key={file}
              className="rounded-lg border px-3 py-2.5 flex items-center justify-between gap-2"
              style={{borderColor: `${FUNNEL_COLOURS.goldDeep}45`, backgroundColor: '#fff'}}
              initial={reduce ? false : {opacity: 0, y: 8}}
              animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.5}}
              transition={{delay: reduce ? 0 : 0.1 + i * 0.12, duration: 0.4, ease: EASE}}
            >
              <p className="font-sans text-[11px] font-semibold truncate" style={{color: FUNNEL_COLOURS.ink}}>
                {file}
              </p>
              <span className="font-mono text-[8px] font-bold uppercase tracking-wide shrink-0" style={{color: FUNNEL_COLOURS.goldDeep}}>
                Light
              </span>
            </motion.div>
          ))}
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep, backgroundColor: `${FUNNEL_COLOURS.goldDeep}12`}}
        >
          Upload guide ready
        </div>
      </div>
    </motion.div>
  )
}
