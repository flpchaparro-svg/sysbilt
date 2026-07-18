import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const container = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {staggerChildren: 0.18},
  },
}

const card = {
  hidden: {opacity: 0, y: 28},
  visible: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.55, ease: [0.16, 1, 0.3, 1]},
  },
}

type VisualProps = {reduce: boolean | null}

function ThinPanelVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.4, once: true})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border p-3"
      style={{
        borderColor: `${FUNNEL_COLOURS.onInk}22`,
        backgroundColor: 'rgba(255,242,236,0.06)',
      }}
    >
      <p
        className="font-mono text-[8px] uppercase tracking-[0.2em] mb-2"
        style={{color: `${FUNNEL_COLOURS.onInk}55`}}
      >
        Your panel
      </p>
      <div className="space-y-2">
        {['Hours · outdated', 'Photos · 3', 'Services · empty'].map((row, i) => (
          <motion.div
            key={row}
            className="border px-2 py-1.5 font-sans text-[11px]"
            style={{
              borderColor: `${FUNNEL_COLOURS.accent}55`,
              backgroundColor: `${FUNNEL_COLOURS.accent}14`,
              color: FUNNEL_COLOURS.onInk,
            }}
            initial={reduce ? false : {opacity: 0, x: -8}}
            animate={play || reduce ? {opacity: 1, x: 0} : {opacity: 0, x: -8}}
            transition={{delay: reduce ? 0 : i * 0.15, duration: 0.35}}
          >
            {row}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function CompetitorAliveVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.4, once: true})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border p-3"
      style={{
        borderColor: `${FUNNEL_COLOURS.onInk}22`,
        backgroundColor: 'rgba(255,242,236,0.06)',
      }}
    >
      <p
        className="font-mono text-[8px] uppercase tracking-[0.2em] mb-2"
        style={{color: `${FUNNEL_COLOURS.onInk}55`}}
      >
        Next door
      </p>
      <motion.div
        className="border px-2 py-2 space-y-1.5"
        style={{
          borderColor: `${FUNNEL_COLOURS.goldLight}88`,
          backgroundColor: `${FUNNEL_COLOURS.gold}22`,
        }}
        initial={reduce ? false : {opacity: 0, scale: 0.94}}
        animate={play || reduce ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.94}}
        transition={{duration: 0.4}}
      >
        <p className="font-serif text-sm" style={{color: FUNNEL_COLOURS.onInk}}>
          Looks finished
        </p>
        <motion.p
          className="font-mono text-[8px] uppercase tracking-widest"
          style={{color: FUNNEL_COLOURS.goldLight}}
          animate={play ? {opacity: [0.55, 1, 0.55]} : {opacity: 1}}
          transition={play ? {duration: 1.8, repeat: Infinity} : {duration: 0}}
        >
          Photos · Reviews · Hours
        </motion.p>
        <p className="font-sans text-[10px]" style={{color: `${FUNNEL_COLOURS.onInk}99`}}>
          Customer picks this one
        </p>
      </motion.div>
    </div>
  )
}

function SomedayVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.4, once: true})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border flex flex-col items-center justify-center px-4"
      style={{
        borderColor: `${FUNNEL_COLOURS.onInk}22`,
        backgroundColor: 'rgba(255,242,236,0.06)',
      }}
    >
      <motion.p
        className="font-serif text-2xl"
        style={{color: `${FUNNEL_COLOURS.onInk}40`}}
        animate={play ? {opacity: [0.35, 0.75, 0.35]} : {opacity: 0.5}}
        transition={play ? {duration: 2.2, repeat: Infinity} : {duration: 0}}
      >
        Someday
      </motion.p>
      <motion.p
        className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-center"
        style={{color: FUNNEL_COLOURS.accent}}
        initial={reduce ? false : {opacity: 0, y: 6}}
        animate={play || reduce ? {opacity: 1, y: 0} : {opacity: 0, y: 6}}
        transition={{delay: reduce ? 0 : 0.3}}
      >
        Costs you every day it waits
      </motion.p>
    </div>
  )
}

const ITEMS = [
  {
    title: 'Thin panel',
    text: 'Old hours, empty services, three phone photos. Google still shows it.',
    Visual: ThinPanelVisual,
  },
  {
    title: 'Competitor looks alive',
    text: 'Same suburb, finished listing. Customers pick the one that looks looked after.',
    Visual: CompetitorAliveVisual,
  },
  {
    title: 'Someday DIY',
    text: 'The honest plan most owners have, and someday is already losing calls.',
    Visual: SomedayVisual,
  },
]

export function GoogleProfilePainCards() {
  const reduce = useReducedMotion()

  return (
    <motion.ul
      className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-4"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 0.2}}
    >
      {ITEMS.map(({title, text, Visual}) => (
        <motion.li
          key={title}
          variants={card}
          className="border p-4 md:p-5"
          style={{
            borderColor: `${FUNNEL_COLOURS.onInk}18`,
            backgroundColor: 'rgba(255,242,236,0.04)',
          }}
        >
          <Visual reduce={reduce} />
          <p className="mt-4 font-serif text-lg" style={{color: FUNNEL_COLOURS.onInk}}>
            {title}
          </p>
          <p
            className="mt-2 font-sans text-sm leading-relaxed"
            style={{color: `${FUNNEL_COLOURS.onInk}B3`}}
          >
            {text}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  )
}
