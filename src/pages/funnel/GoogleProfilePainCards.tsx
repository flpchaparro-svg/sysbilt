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
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60 p-3"
    >
      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-dark/40 mb-2">Your panel</p>
      <div className="space-y-2">
        {['Hours · outdated', 'Photos · 3', 'Services · empty'].map((row, i) => (
          <motion.div
            key={row}
            className="border border-dark/10 px-2 py-1.5 bg-cream/80 font-sans text-[11px] text-dark/55"
            initial={reduce ? false : {opacity: 0, x: -6}}
            animate={play || reduce ? {opacity: 1, x: 0} : {opacity: 0, x: -6}}
            transition={{delay: reduce ? 0 : i * 0.12}}
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
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60 p-3"
    >
      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-dark/40 mb-2">Next door</p>
      <motion.div
        className="border px-2 py-2 space-y-1.5"
        style={{
          borderColor: `${FUNNEL_COLOURS.gold}66`,
          backgroundColor: `${FUNNEL_COLOURS.gold}14`,
        }}
        animate={play ? {scale: [1, 1.02, 1]} : {scale: 1}}
        transition={play ? {duration: 2, repeat: Infinity} : {duration: 0}}
      >
        <p className="font-serif text-sm text-dark">Looks finished</p>
        <p className="font-mono text-[8px] uppercase tracking-widest" style={{color: FUNNEL_COLOURS.goldDeep}}>
          Photos · Reviews · Hours
        </p>
        <p className="font-sans text-[10px] text-dark/60">Customer picks this one</p>
      </motion.div>
    </div>
  )
}

function SomedayVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60 flex flex-col items-center justify-center px-4"
    >
      <motion.p
        className="font-serif text-2xl text-dark/30"
        animate={play ? {opacity: [0.35, 0.7, 0.35]} : {opacity: 0.45}}
        transition={play ? {duration: 2.4, repeat: Infinity} : {duration: 0}}
      >
        Someday
      </motion.p>
      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-red-text text-center">
        Costs you every day it waits
      </p>
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
          className="border border-white/10 bg-white/[0.04] p-4 md:p-5"
        >
          <Visual reduce={reduce} />
          <p className="mt-4 font-serif text-lg text-cream">{title}</p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-cream/70">{text}</p>
        </motion.li>
      ))}
    </motion.ul>
  )
}
