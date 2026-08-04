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
    transition: {duration: 0.55, ease: [0.16, 1, 0.3, 1] as const},
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
      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-dark/55 mb-2">Your panel</p>
      <div className="space-y-2">
        {['Hours · outdated', 'Photos · 3', 'Services · empty'].map((row, i) => (
          <motion.div
            key={row}
            className="border border-red-solid/40 bg-red-solid/10 px-2 py-1.5 font-sans text-[11px] text-dark/80"
            initial={reduce ? false : {opacity: 0, x: -6}}
            animate={play || reduce ? {opacity: 1, x: 0} : {opacity: 0, x: -6}}
            transition={{delay: reduce ? 0 : i * 0.12, duration: 0.35}}
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
      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-dark/55 mb-2">Next door</p>
      <motion.div
        className="border px-2 py-2 space-y-1.5"
        style={{
          borderColor: `${FUNNEL_COLOURS.gold}99`,
          backgroundColor: `${FUNNEL_COLOURS.gold}28`,
        }}
        initial={reduce ? false : {opacity: 0, scale: 0.94}}
        animate={play || reduce ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.94}}
        transition={{duration: 0.4}}
      >
        <p className="font-serif text-sm text-dark">Looks finished</p>
        <motion.p
          className="font-mono text-[8px] uppercase tracking-widest"
          style={{color: FUNNEL_COLOURS.goldDeep}}
          animate={play ? {opacity: [0.55, 1, 0.55]} : {opacity: 1}}
          transition={play ? {duration: 1.8, repeat: Infinity} : {duration: 0}}
        >
          Photos · Reviews · Hours
        </motion.p>
        <p className="font-sans text-[10px] text-dark/70">Customer picks this one</p>
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
        className="font-serif text-2xl text-dark/55"
        animate={play ? {opacity: [0.35, 0.75, 0.35]} : {opacity: 0.5}}
        transition={play ? {duration: 2.2, repeat: Infinity} : {duration: 0}}
      >
        Someday
      </motion.p>
      <motion.p
        className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-red-text text-center"
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
    label: '01',
    title: 'Thin panel',
    text: 'Old hours, empty services, three phone photos. Google still shows it.',
    Visual: ThinPanelVisual,
  },
  {
    label: '02',
    title: 'Competitor looks alive',
    text: 'Same suburb, finished listing. Customers pick the one that looks looked after.',
    Visual: CompetitorAliveVisual,
  },
  {
    label: '03',
    title: 'Someday DIY',
    text: 'The honest plan most owners have, and someday is already losing calls.',
    Visual: SomedayVisual,
  },
]

export function GoogleProfilePainCards() {
  const reduce = useReducedMotion()

  return (
    <motion.ul
      className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4 mb-4"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 0.2}}
    >
      {ITEMS.map(({label, title, text, Visual}) => (
        <motion.li
          key={title}
          variants={card}
          className="flex flex-col border border-cream/20 bg-cream text-dark overflow-hidden"
        >
          <div className="p-3 md:p-3.5">
            <Visual reduce={reduce} />
          </div>
          <div className="px-4 pb-4 pt-1">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-gold-on-cream mb-1.5">
              {label}
            </p>
            <h3 className="font-serif text-base md:text-lg text-dark leading-snug">{title}</h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-dark/65">{text}</p>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  )
}
