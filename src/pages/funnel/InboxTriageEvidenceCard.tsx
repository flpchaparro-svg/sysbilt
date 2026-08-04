import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'
import {colors} from '../../constants/theme'

const EASE = [0.16, 1, 0.3, 1] as const

function initialsOf(name?: string | null) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return null
  return parts
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}

/** Proof: chaos stream vs labelled triage + draft ready. */
export function InboxTriageEvidenceCard({business}: {business?: string | null}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const go = !reduce && inView
  const initials = initialsOf(business)

  const before = [
    {from: 'Promo blast', tag: 'Noise'},
    {from: 'Client ask', tag: 'Urgent'},
    {from: 'Newsletter', tag: 'Noise'},
  ]
  const after = [
    {from: 'Client ask', tag: 'Act', hot: true},
    {from: 'Team update', tag: 'Share', hot: false},
    {from: 'Promo · later', tag: 'Batch', hot: false},
  ]

  return (
    <motion.div
      ref={ref}
      className="mt-2 rounded-xl overflow-hidden border max-w-2xl"
      style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.surface}}
      initial={reduce ? false : {opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.5, ease: EASE}}
    >
      <div
        className="px-3 py-2.5 flex items-center gap-2"
        style={{backgroundColor: `${FUNNEL_COLOURS.ink}16`}}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.accent}70`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.gold}80`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.ink}25`}} />
        {initials ? (
          <span
            className="ml-1 h-5 min-w-[20px] px-1 rounded-sm flex items-center justify-center font-mono text-[7px] font-bold"
            style={{backgroundColor: `${FUNNEL_COLOURS.ink}2C`, color: FUNNEL_COLOURS.steel}}
          >
            {initials}
          </span>
        ) : null}
        <span
          className="ml-auto font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          Inbox triage
        </span>
      </div>

      <div className="p-4 md:p-5 grid grid-cols-2 gap-3">
        <div
          className="rounded-lg border px-2.5 py-2.5 flex flex-col gap-1.5"
          style={{borderColor: `${FUNNEL_COLOURS.accent}45`, backgroundColor: `${FUNNEL_COLOURS.accent}08`}}
        >
          <p className="font-mono text-[8px] font-bold uppercase tracking-wide" style={{color: FUNNEL_COLOURS.accent}}>
            Before
          </p>
          {before.map((row, i) => (
            <motion.div
              key={row.from}
              className="rounded-md border border-dashed px-2 py-1.5 flex items-center gap-1.5"
              style={{borderColor: `${FUNNEL_COLOURS.accent}50`, backgroundColor: '#fff'}}
              animate={
                go
                  ? {opacity: [0.55, 1, 0.55], x: [0, i % 2 ? -2 : 2, 0]}
                  : {opacity: 0.85}
              }
              transition={{duration: 1.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18}}
            >
              <div className="min-w-0 flex-1">
                <div className="h-1 w-3/4 rounded-sm mb-1" style={{backgroundColor: `${FUNNEL_COLOURS.accent}30`}} />
                <p className="font-sans text-[10px] font-semibold truncate" style={{color: FUNNEL_COLOURS.ink}}>
                  {row.from}
                </p>
              </div>
              <span className="font-mono text-[7px] font-bold uppercase" style={{color: FUNNEL_COLOURS.accent}}>
                {row.tag}
              </span>
            </motion.div>
          ))}
        </div>

        <div
          className="rounded-lg border px-2.5 py-2.5 flex flex-col gap-1.5"
          style={{borderColor: `${FUNNEL_COLOURS.goldDeep}45`, backgroundColor: '#fff'}}
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-[8px] font-bold uppercase tracking-wide" style={{color: FUNNEL_COLOURS.goldDeep}}>
              After
            </p>
            <motion.span
              className="font-mono text-[7px] font-bold uppercase tracking-wide"
              style={{color: colors.teal}}
              animate={go ? {opacity: [0.5, 1, 0.5]} : {opacity: 0.8}}
              transition={{duration: 1.3, repeat: Infinity, ease: 'easeInOut'}}
            >
              Draft ready
            </motion.span>
          </div>
          {after.map((row, i) => (
            <motion.div
              key={row.from}
              className="rounded-md border px-2 py-1.5 flex items-center gap-1.5"
              style={{
                borderColor: row.hot ? colors.teal : `${FUNNEL_COLOURS.goldDeep}40`,
                backgroundColor: row.hot ? `${colors.teal}12` : `${FUNNEL_COLOURS.gold}14`,
              }}
              initial={reduce ? false : {opacity: 0, x: 10}}
              animate={go || reduce ? {opacity: 1, x: 0} : {opacity: 0.45}}
              transition={{delay: reduce ? 0 : 0.2 + i * 0.12, type: 'spring', stiffness: 320, damping: 20}}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{backgroundColor: row.hot ? colors.teal : FUNNEL_COLOURS.goldDeep}}
                animate={go ? {scale: [1, 1.3, 1]} : {scale: 1}}
                transition={{duration: 1.15, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15}}
              />
              <p className="font-sans text-[10px] font-semibold truncate flex-1" style={{color: FUNNEL_COLOURS.ink}}>
                {row.from}
              </p>
              <span
                className="font-mono text-[7px] font-bold uppercase"
                style={{color: row.hot ? colors.teal : FUNNEL_COLOURS.goldDeep}}
              >
                {row.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
