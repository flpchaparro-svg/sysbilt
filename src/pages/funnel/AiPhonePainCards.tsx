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

function VoicemailVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60 flex flex-col items-center justify-center px-3"
    >
      <motion.div
        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-red-solid/60"
        animate={play ? {scale: [1, 1.06, 1]} : {scale: 1}}
        transition={play ? {duration: 1.2, repeat: Infinity} : {duration: 0.2}}
      >
        <span className="font-serif text-lg text-dark">☎</span>
      </motion.div>
      <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-red-text text-center">
        Voicemail / ring-out
      </p>
      <p className="mt-1 font-sans text-[11px] text-dark/50 text-center">No booking. No handoff.</p>
    </div>
  )
}

function TextHoldsVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60 p-3 flex flex-col"
    >
      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-dark/55 mb-2">
        Missed-Call Text-Back
      </p>
      <motion.div
        className="ml-auto max-w-[92%] rounded-xl rounded-br-sm px-3 py-2 bg-dark text-cream"
        animate={play ? {opacity: [0.7, 1, 0.7]} : {opacity: 0.9}}
        transition={play ? {duration: 1.8, repeat: Infinity} : {duration: 0.2}}
      >
        <p className="font-sans text-[11px] leading-snug">
          Sorry we missed you. We&apos;ll call back shortly.
        </p>
      </motion.div>
      <p className="mt-auto pt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-gold-on-cream">
        Holds the lead
      </p>
    </div>
  )
}

function VoiceBooksVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60 p-3 flex flex-col"
    >
      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-dark/55 mb-2">
        AI Phone Setup
      </p>
      <div className="space-y-1.5 flex-1">
        {['Answered', 'Questions handled', 'Booked + handed off'].map((row, i) => (
          <motion.div
            key={row}
            className="flex items-center justify-between border border-dark/10 px-2 py-1.5 bg-cream/80"
            animate={
              play && i === 2
                ? {
                    borderColor: [
                      'rgba(26,26,26,0.1)',
                      'rgba(197,160,89,0.8)',
                      'rgba(26,26,26,0.1)',
                    ],
                  }
                : undefined
            }
            transition={play && i === 2 ? {duration: 2, repeat: Infinity} : undefined}
          >
            <span className="font-sans text-[11px] text-dark/70">{row}</span>
            {i === 2 ? (
              <span className="font-mono text-[8px] uppercase tracking-widest text-gold-on-cream">
                Done
              </span>
            ) : (
              <span className="font-mono text-[8px] text-dark/30">·</span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const CARDS = [
  {
    label: '01',
    title: 'After hours, voicemail is the whole answer.',
    Visual: VoicemailVisual,
  },
  {
    label: '02',
    title: 'A text can hold them. Voice can book them.',
    Visual: TextHoldsVisual,
  },
  {
    label: '03',
    title: 'Without a live answer, the next listing wins.',
    Visual: VoiceBooksVisual,
  },
] as const

export function AiPhonePainCards() {
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
