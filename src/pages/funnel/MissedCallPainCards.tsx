import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'

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

function RingOutVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60 flex flex-col items-center justify-center"
    >
      <motion.div
        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-red-solid/60"
        animate={play ? {scale: [1, 1.08, 1]} : {scale: 1}}
        transition={play ? {duration: 1.1, repeat: Infinity} : {duration: 0.2}}
      >
        <span className="font-serif text-lg text-dark">☎</span>
        <motion.span
          className="absolute inset-0 rounded-full border border-red-solid"
          animate={play ? {scale: [1, 1.5], opacity: [0.5, 0]} : {opacity: 0}}
          transition={play ? {duration: 1.3, repeat: Infinity} : {duration: 0.2}}
        />
      </motion.div>
      <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-red-text">
        Rings out
      </p>
    </div>
  )
}

function NextBusinessVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60 p-3"
    >
      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-dark/55 mb-2">Google</p>
      <div className="space-y-2">
        {['You', 'Next business', 'Another listing'].map((row, i) => (
          <motion.div
            key={row}
            className="flex items-center justify-between border border-dark/10 px-2 py-1.5 bg-cream/80"
            animate={
              play && i === 1
                ? {borderColor: ['rgba(26,26,26,0.1)', 'rgba(197,160,89,0.8)', 'rgba(26,26,26,0.1)']}
                : undefined
            }
            transition={play && i === 1 ? {duration: 2, repeat: Infinity} : undefined}
          >
            <span className="font-sans text-[11px] text-dark/70">{row}</span>
            {i === 0 ? (
              <span className="font-mono text-[8px] uppercase tracking-widest text-red-text">
                Missed
              </span>
            ) : i === 1 ? (
              <span className="font-mono text-[8px] uppercase tracking-widest text-gold-on-cream">
                Answered
              </span>
            ) : (
              <span className="font-mono text-[8px] text-dark/30">—</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SilentLossVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60 p-3 flex flex-col"
    >
      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-dark/55 mb-2">
        Your week
      </p>
      <div className="flex-1 flex items-end gap-1.5 pb-1">
        {[40, 55, 35, 60, 28, 22, 18].map((h, i) => (
          <motion.div
            key={i}
            className={`flex-1 rounded-sm ${i >= 4 ? 'bg-red-solid/35' : 'bg-dark/15'}`}
            style={{height: `${h}%`}}
            animate={
              play && i >= 4
                ? {opacity: [0.35, 0.85, 0.35]}
                : {opacity: 0.7}
            }
            transition={
              play && i >= 4
                ? {duration: 1.8, repeat: Infinity, delay: (i - 4) * 0.15}
                : {duration: 0.2}
            }
          />
        ))}
      </div>
      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-red-text">
        Quiet, no clue why
      </p>
    </div>
  )
}

const CARDS = [
  {
    label: '01',
    title: 'They ring. You miss. They hang up.',
    Visual: RingOutVisual,
  },
  {
    label: '02',
    title: 'The next business gets the job.',
    Visual: NextBusinessVisual,
  },
  {
    label: '03',
    title: 'You never see the lead that left.',
    Visual: SilentLossVisual,
  },
] as const

export function MissedCallPainCards() {
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
