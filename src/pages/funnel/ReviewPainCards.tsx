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

/** Stars decide before the site loads. */
function StarsFirstVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60 p-3 flex flex-col"
    >
      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-dark/55 mb-2">Maps panel</p>
      <div className="flex-1 flex flex-col justify-center gap-2">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="text-base leading-none"
              style={{color: i < 4 ? FUNNEL_COLOURS.goldDeep : `${FUNNEL_COLOURS.ink}22`}}
              initial={reduce ? false : {opacity: 0, scale: 0.6}}
              animate={play || reduce ? {opacity: 1, scale: 1} : {opacity: 0.4}}
              transition={{delay: play ? i * 0.08 : 0, duration: 0.3}}
            >
              ★
            </motion.span>
          ))}
          <motion.span
            className="ml-1 font-mono text-[10px] font-bold"
            style={{color: FUNNEL_COLOURS.accent}}
            animate={play ? {opacity: [0.5, 1, 0.5]} : undefined}
            transition={play ? {duration: 1.8, repeat: Infinity} : undefined}
          >
            12
          </motion.span>
        </div>
        <motion.div
          className="h-2 w-3/5 rounded-sm"
          style={{backgroundColor: `${FUNNEL_COLOURS.ink}14`}}
          initial={reduce ? false : {opacity: 0}}
          animate={play || reduce ? {opacity: 1} : undefined}
          transition={{delay: play ? 0.45 : 0}}
        />
        <motion.p
          className="font-mono text-[9px] uppercase tracking-[0.16em]"
          style={{color: FUNNEL_COLOURS.accent}}
          initial={{opacity: 0}}
          animate={play || reduce ? {opacity: 1} : undefined}
          transition={{delay: play ? 0.55 : 0}}
        >
          Before the site loads
        </motion.p>
      </div>
    </div>
  )
}

/** Clock runs out. The ask never leaves. */
function AskDiesVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60 flex flex-col items-center justify-center"
    >
      <motion.div
        className="relative h-16 w-16 rounded-full border-2 flex items-center justify-center"
        style={{borderColor: `${FUNNEL_COLOURS.ink}22`}}
      >
        <motion.div
          className="absolute h-5 w-0.5 origin-bottom rounded-full"
          style={{backgroundColor: FUNNEL_COLOURS.accent, bottom: '50%', left: 'calc(50% - 1px)'}}
          animate={play ? {rotate: [0, 360]} : {rotate: 120}}
          transition={play ? {duration: 4, repeat: Infinity, ease: 'linear'} : undefined}
        />
        <div
          className="absolute h-3.5 w-0.5 origin-bottom rounded-full"
          style={{
            backgroundColor: FUNNEL_COLOURS.ink,
            bottom: '50%',
            left: 'calc(50% - 1px)',
            transform: 'rotate(90deg)',
          }}
        />
      </motion.div>
      <motion.p
        className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em]"
        style={{color: FUNNEL_COLOURS.accent}}
        animate={play ? {opacity: [0.5, 1, 0.5]} : undefined}
        transition={play ? {duration: 2, repeat: Infinity} : undefined}
      >
        6pm · ask still a thought
      </motion.p>
    </div>
  )
}

/** Happy customers stay quiet until asked. */
function QuietHappyVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60 p-3 flex flex-col"
    >
      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-dark/55 mb-2">
        Happy customers
      </p>
      <div className="flex-1 flex items-end justify-around gap-2 pb-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-1"
            animate={play ? {y: [0, -4, 0]} : undefined}
            transition={play ? {duration: 2.2, repeat: Infinity, delay: i * 0.25} : undefined}
          >
            <div
              className="h-9 w-9 rounded-full flex items-center justify-center border"
              style={{
                borderColor: `${FUNNEL_COLOURS.ink}18`,
                backgroundColor: FUNNEL_COLOURS.ground,
                color: FUNNEL_COLOURS.ink,
              }}
            >
              <span className="font-serif text-sm">☺</span>
            </div>
            <motion.div
              className="h-5 w-5 rounded-sm border border-dashed flex items-center justify-center"
              style={{borderColor: `${FUNNEL_COLOURS.ink}28`}}
              animate={play ? {opacity: [0.25, 0.7, 0.25]} : {opacity: 0.8}}
              transition={play ? {duration: 1.8, repeat: Infinity, delay: i * 0.2} : undefined}
            >
              <span className="font-mono text-[8px]" style={{color: `${FUNNEL_COLOURS.ink}40`}}>
                ★
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <p
        className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em]"
        style={{color: FUNNEL_COLOURS.accent}}
      >
        No ask · no review
      </p>
    </div>
  )
}

const CARDS = [
  {
    label: '01',
    title: 'Stars decide before the site loads',
    Visual: StarsFirstVisual,
  },
  {
    label: '02',
    title: 'The ask dies when the day ends',
    Visual: AskDiesVisual,
  },
  {
    label: '03',
    title: 'Happy customers stay quiet',
    Visual: QuietHappyVisual,
  },
] as const

export function ReviewPainCards() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, margin: '-80px'}}
    >
      {CARDS.map(({label, title, Visual}) => (
        <motion.article
          key={label}
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
          </div>
        </motion.article>
      ))}
    </motion.div>
  )
}
