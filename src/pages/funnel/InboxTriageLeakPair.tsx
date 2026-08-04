import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'
import {colors} from '../../constants/theme'

const EASE = [0.16, 1, 0.3, 1] as const

/** Leak: mixed inbox stream beside labelled triage. */
export function InboxTriageLeakPair() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.3})
  const reduce = useReducedMotion()
  const go = !reduce && inView

  const chaos = [
    {from: 'Promo blast', tag: 'Noise'},
    {from: 'Client waiting', tag: 'Urgent'},
    {from: 'Newsletter', tag: 'Noise'},
  ]
  const triaged = [
    {from: 'Client waiting', tag: 'Act', fill: true},
    {from: 'Team update', tag: 'Share', fill: false},
    {from: 'Promo · batch', tag: 'Later', fill: false},
  ]

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
          Chaos
        </div>
        <div className="p-4 md:p-5 flex flex-col justify-center gap-2 min-h-[176px]">
          {chaos.map((row, i) => (
            <motion.div
              key={row.from}
              className="rounded-lg border border-dashed px-3 py-2.5 flex items-center gap-2"
              style={{borderColor: `${FUNNEL_COLOURS.accent}55`, backgroundColor: `${FUNNEL_COLOURS.accent}08`}}
              animate={
                go
                  ? {opacity: [0.55, 1, 0.55], x: [0, i % 2 === 0 ? 2 : -2, 0]}
                  : {opacity: 0.85}
              }
              transition={{duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2}}
            >
              <div className="min-w-0 flex-1">
                <div className="h-1.5 w-2/3 rounded-sm mb-1.5" style={{backgroundColor: `${FUNNEL_COLOURS.accent}35`}} />
                <p className="font-sans text-[11px] font-semibold truncate" style={{color: FUNNEL_COLOURS.ink}}>
                  {row.from}
                </p>
              </div>
              <span
                className="font-mono text-[8px] font-bold uppercase tracking-wide shrink-0"
                style={{color: FUNNEL_COLOURS.accent}}
              >
                {row.tag}
              </span>
            </motion.div>
          ))}
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.accent, backgroundColor: `${FUNNEL_COLOURS.accent}10`}}
        >
          Urgent looks like noise
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
            Triaged
          </span>
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{backgroundColor: colors.teal}}
            animate={go ? {opacity: [0.45, 1, 0.45], scale: [1, 1.2, 1]} : {opacity: 0.7}}
            transition={{duration: 1.4, repeat: Infinity, ease: 'easeInOut'}}
          />
        </div>
        <div className="p-4 md:p-5 flex flex-col justify-center gap-2 min-h-[176px]">
          {triaged.map((row, i) => (
            <motion.div
              key={row.from}
              className="rounded-lg border px-3 py-2.5 flex items-center gap-2"
              style={{
                borderColor: row.fill ? colors.teal : `${FUNNEL_COLOURS.goldDeep}45`,
                backgroundColor: row.fill ? `${colors.teal}12` : '#fff',
              }}
              initial={reduce ? false : {opacity: 0, x: 14}}
              animate={go || reduce ? {opacity: 1, x: 0} : {opacity: 0.5}}
              transition={{delay: reduce ? 0 : 0.15 + i * 0.14, type: 'spring', stiffness: 320, damping: 20}}
            >
              <motion.span
                className="h-2 w-2 rounded-full shrink-0"
                style={{backgroundColor: row.fill ? colors.teal : FUNNEL_COLOURS.goldDeep}}
                animate={go ? {scale: [1, 1.25, 1]} : {scale: 1}}
                transition={{duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18}}
              />
              <p className="font-sans text-[11px] font-semibold truncate flex-1" style={{color: FUNNEL_COLOURS.ink}}>
                {row.from}
              </p>
              <span
                className="font-mono text-[8px] font-bold uppercase tracking-wide shrink-0"
                style={{color: row.fill ? colors.teal : FUNNEL_COLOURS.goldDeep}}
              >
                {row.tag}
              </span>
            </motion.div>
          ))}
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep, backgroundColor: `${FUNNEL_COLOURS.goldDeep}12`}}
        >
          Draft helpers ready
        </div>
      </div>
    </motion.div>
  )
}
