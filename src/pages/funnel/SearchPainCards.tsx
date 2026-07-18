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

/** Search results: rivals listed, your slot empty — loops while on screen. */
function MissingFromResultsVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60"
    >
      <div className="flex items-center gap-1.5 px-2.5 h-7 border-b border-dark/10 bg-cream">
        <span className="font-mono text-[8px] text-dark/40 truncate">architect Mosman</span>
      </div>
      <div className="p-2.5 space-y-1.5">
        {['Studio Hale', 'North Shore Atelier'].map((name, i) => (
          <motion.div
            key={name}
            className="h-6 px-2 flex items-center bg-dark/[0.04]"
            animate={play ? {opacity: [0.55, 1, 0.55]} : {opacity: 0.85}}
            transition={
              play
                ? {duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15}
                : {duration: 0.2}
            }
          >
            <span className="font-sans text-[10px] text-dark/80">{name}</span>
          </motion.div>
        ))}
        <motion.div
          className="h-7 border border-dashed flex items-center px-2"
          style={{borderColor: FUNNEL_COLOURS.accent}}
          animate={
            play
              ? {opacity: [0.45, 1, 0.45], borderColor: [FUNNEL_COLOURS.accent, '#9A1730', FUNNEL_COLOURS.accent]}
              : {opacity: 0.85}
          }
          transition={play ? {duration: 2.2, repeat: Infinity, ease: 'easeInOut'} : {duration: 0.2}}
        >
          <span
            className="font-mono text-[9px] uppercase tracking-[0.16em]"
            style={{color: FUNNEL_COLOURS.accentDeep}}
          >
            You · missing
          </span>
        </motion.div>
      </div>
    </div>
  )
}

/** Rival books the job — loops. */
function RivalBookedVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60 p-3 flex flex-col justify-center"
    >
      <motion.div
        className="border border-dark/12 bg-cream px-3 py-3"
        animate={play ? {y: [0, -3, 0]} : {y: 0}}
        transition={play ? {duration: 2.6, repeat: Infinity, ease: 'easeInOut'} : {duration: 0.2}}
      >
        <p className="font-sans text-sm font-semibold text-dark">Next practice listed</p>
        <motion.p
          className="mt-2 inline-block font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5"
          style={{backgroundColor: FUNNEL_COLOURS.gold, color: FUNNEL_COLOURS.ink}}
          animate={play ? {scale: [1, 1.06, 1]} : {scale: 1}}
          transition={
            play ? {duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3} : {duration: 0.2}
          }
        >
          Booked
        </motion.p>
      </motion.div>
      <motion.p
        className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-red-text"
        animate={play ? {opacity: [0.4, 1, 0.4]} : {opacity: 0.7}}
        transition={play ? {duration: 2, repeat: Infinity, ease: 'easeInOut'} : {duration: 0.2}}
      >
        Your slot stayed empty
      </motion.p>
    </div>
  )
}

/** Empty enquiry — never arrives. */
function NeverArrivedVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60 p-3 flex flex-col justify-center items-center"
    >
      <motion.div
        className="w-full border border-dashed border-dark/25 h-16 flex items-center justify-center"
        animate={play ? {opacity: [0.35, 0.85, 0.35]} : {opacity: 0.6}}
        transition={play ? {duration: 2.8, repeat: Infinity, ease: 'easeInOut'} : {duration: 0.2}}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-dark/45">
          No enquiry · never arrived
        </span>
      </motion.div>
      <motion.div
        className="mt-3 h-1 w-24 bg-red-solid/70"
        animate={play ? {scaleX: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4]} : {scaleX: 1, opacity: 0.7}}
        transition={play ? {duration: 2.4, repeat: Infinity, ease: 'easeInOut'} : {duration: 0.2}}
        style={{transformOrigin: 'center'}}
      />
    </div>
  )
}

const CARDS = [
  {
    label: '01',
    title: "They search, you're not there",
    Visual: MissingFromResultsVisual,
  },
  {
    label: '02',
    title: 'The next business gets found',
    Visual: RivalBookedVisual,
  },
  {
    label: '03',
    title: 'You never meet the customer who never came',
    Visual: NeverArrivedVisual,
  },
] as const

/**
 * Cream motion cards for the dark pain section — same shell as Speed Fix.
 */
export function SearchPainCards() {
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
