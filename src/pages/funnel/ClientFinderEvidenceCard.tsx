import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

function initialsOf(name?: string | null) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return null
  return parts
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}

/** Proof: hope pile becomes a named shortlist with a script. */
export function ClientFinderEvidenceCard({business}: {business?: string | null}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const go = !reduce && inView
  const initials = initialsOf(business)

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
        style={{backgroundColor: `${FUNNEL_COLOURS.ink}06`}}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.accent}70`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.gold}80`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.ink}25`}} />
        {initials ? (
          <span
            className="ml-1 h-5 min-w-[20px] px-1 rounded-sm flex items-center justify-center font-mono text-[7px] font-bold"
            style={{backgroundColor: `${FUNNEL_COLOURS.ink}10`, color: FUNNEL_COLOURS.steel}}
          >
            {initials}
          </span>
        ) : null}
        <span
          className="ml-auto font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          Client finder
        </span>
      </div>

      <div className="p-4 md:p-5 grid grid-cols-2 gap-3">
        <motion.div
          className="rounded-lg border px-3 py-3"
          style={{borderColor: `${FUNNEL_COLOURS.accent}45`, backgroundColor: `${FUNNEL_COLOURS.accent}08`}}
          initial={reduce ? false : {opacity: 0, y: 8}}
          animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.45}}
          transition={{delay: reduce ? 0 : 0.1, duration: 0.35, ease: EASE}}
        >
          <p className="font-mono text-[8px] font-bold uppercase tracking-wide mb-2" style={{color: FUNNEL_COLOURS.accent}}>
            Before
          </p>
          <p className="font-sans text-[12px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
            Quiet month
          </p>
          <p className="font-mono text-[10px] mt-1" style={{color: FUNNEL_COLOURS.accent}}>
            Hope · no list
          </p>
        </motion.div>
        <motion.div
          className="rounded-lg border px-3 py-3"
          style={{borderColor: `${FUNNEL_COLOURS.goldDeep}45`, backgroundColor: '#fff'}}
          initial={reduce ? false : {opacity: 0, y: 8}}
          animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.45}}
          transition={{delay: reduce ? 0 : 0.35, duration: 0.4, ease: EASE}}
        >
          <p className="font-mono text-[8px] font-bold uppercase tracking-wide mb-2" style={{color: FUNNEL_COLOURS.goldDeep}}>
            After
          </p>
          <p className="font-sans text-[12px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
            50 to 100 named rows
          </p>
          <p className="font-mono text-[10px] mt-1" style={{color: FUNNEL_COLOURS.goldDeep}}>
            ICP · scripts · plan
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
