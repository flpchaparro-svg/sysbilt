import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {colors} from '../../constants/theme'

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

/** Browser that tries to load — loops while on screen, pauses off-screen. */
function SlowSiteVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60"
    >
      <div className="flex items-center gap-1.5 px-2.5 h-7 border-b border-dark/10 bg-cream">
        <span className="h-1.5 w-1.5 rounded-full bg-red-solid/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-gold/80" />
        <span className="h-1.5 w-1.5 rounded-full bg-dark/20" />
        <div className="ml-2 flex-1 h-3.5 rounded-sm bg-dark/5 border border-dark/10 px-2 flex items-center">
          <span className="font-mono text-[8px] text-dark/40 truncate">yoursite.com</span>
        </div>
      </div>

      <div className="p-3 space-y-2">
        <motion.div
          className="h-3 w-2/3 rounded-sm bg-dark/10"
          animate={play ? {opacity: [0.35, 0.7, 0.35]} : {opacity: 0.5}}
          transition={
            play
              ? {duration: 2.4, repeat: Infinity, ease: 'easeInOut'}
              : {duration: 0.2}
          }
        />
        <motion.div
          className="h-2 w-full rounded-sm bg-dark/8"
          animate={play ? {opacity: [0.2, 0.45, 0.2]} : {opacity: 0.3}}
          transition={
            play
              ? {duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2}
              : {duration: 0.2}
          }
        />
        <motion.div
          className="h-2 w-4/5 rounded-sm bg-dark/8"
          animate={play ? {opacity: [0.15, 0.4, 0.15]} : {opacity: 0.25}}
          transition={
            play
              ? {duration: 3.1, repeat: Infinity, ease: 'easeInOut', delay: 0.4}
              : {duration: 0.2}
          }
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-dark/5">
        <motion.div
          className="h-full bg-red-solid"
          animate={
            play
              ? {width: ['0%', '38%', '38%', '41%', '41%', '0%']}
              : {width: '38%'}
          }
          transition={
            play
              ? {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                  times: [0, 0.4, 0.55, 0.7, 0.85, 1],
                }
              : {duration: 0.2}
          }
        />
      </div>

      <motion.div
        className="absolute right-6 top-14 h-3 w-3 rounded-full border-2 border-dark"
        style={{boxShadow: `0 0 0 1px ${colors.redSolid}`}}
        animate={
          play
            ? {scale: [1, 0.85, 1.15, 1], opacity: [0.9, 1, 0.7, 0.9]}
            : {scale: 1, opacity: 0.85}
        }
        transition={
          play
            ? {duration: 1.8, repeat: Infinity, ease: 'easeInOut'}
            : {duration: 0.2}
        }
      />

      <p className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-[0.18em] text-red-text">
        Still loading…
      </p>
    </div>
  )
}

/** Cash draining — loops while on screen. */
function MoneyWasteVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce
  const notes = [
    {x: '18%', delay: 0},
    {x: '48%', delay: 0.45},
    {x: '72%', delay: 0.9},
  ]

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm overflow-hidden border border-dark/15 bg-white/60"
    >
      <div className="absolute inset-0 flex items-end justify-center pb-4">
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full bg-dark/10" />
        <motion.div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors.redSolid}40 0%, transparent 70%)`,
          }}
          animate={
            play
              ? {scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5]}
              : {scale: 1, opacity: 0.6}
          }
          transition={
            play
              ? {duration: 2, repeat: Infinity, ease: 'easeInOut'}
              : {duration: 0.2}
          }
        />

        {notes.map((n, i) => (
          <motion.div
            key={i}
            className="absolute top-4 w-10 h-6 rounded-[2px] border border-gold/60 bg-gold/20 flex items-center justify-center"
            style={{left: n.x}}
            animate={
              play
                ? {
                    y: [0, 88],
                    opacity: [0.95, 0.95, 0],
                    rotate: [-8, 10],
                  }
                : {y: 40, opacity: 0.5, rotate: -4}
            }
            transition={
              play
                ? {
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeIn',
                    delay: n.delay,
                    repeatDelay: 0.3,
                  }
                : {duration: 0.2}
            }
          >
            <span className="font-mono text-[10px] font-bold text-gold-on-cream">$</span>
          </motion.div>
        ))}
      </div>

      <p className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.18em] text-gold-on-cream">
        Leaking
      </p>
      <motion.p
        className="absolute bottom-3 right-3 font-serif text-2xl text-red-text tabular-nums"
        animate={play ? {opacity: [0.55, 1, 0.55]} : {opacity: 0.8}}
        transition={
          play ? {duration: 1.6, repeat: Infinity} : {duration: 0.2}
        }
      >
        −$
      </motion.p>
    </div>
  )
}

/** Ad invoice — cost per lead pulse while on screen. */
function RoasInvoiceVisual({reduce}: VisualProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce

  return (
    <div
      ref={ref}
      className="relative h-[140px] md:h-[160px] rounded-sm border border-dark/15 bg-white/60 p-3 flex flex-col overflow-hidden"
    >
      <div className="flex items-start justify-between mb-1.5 shrink-0">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-dark/40">Invoice</p>
          <p className="font-mono text-[9px] text-gold-on-cream mt-0.5">Google Ads · Monthly</p>
        </div>
        <motion.span
          className="font-mono text-[8px] uppercase tracking-[0.16em] px-1.5 py-0.5 border border-red-text/50 text-red-text"
          animate={play ? {opacity: [0.55, 1, 0.55]} : {opacity: 0.85}}
          transition={
            play ? {duration: 1.4, repeat: Infinity} : {duration: 0.2}
          }
        >
          Waste
        </motion.span>
      </div>

      <div className="space-y-1 shrink-0">
        <div className="flex justify-between font-mono text-[10px] text-dark/55">
          <span>Ad spend</span>
          <span>$4,800</span>
        </div>
        <div className="flex justify-between font-mono text-[10px] text-dark/55">
          <span>Clicks</span>
          <span>612</span>
        </div>
        <div className="flex justify-between font-mono text-[10px] text-dark/55">
          <span>Leads</span>
          <span className="text-red-text">2</span>
        </div>
      </div>

      <div className="mt-auto pt-2 border-t border-dark/10 flex items-baseline justify-between gap-2 shrink-0">
        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-dark/40">
          Cost per lead
        </span>
        <motion.span
          className="font-serif text-xl md:text-2xl leading-none tabular-nums text-red-text"
          animate={play ? {opacity: [0.7, 1, 0.7]} : {opacity: 1}}
          transition={
            play
              ? {duration: 2, repeat: Infinity, ease: 'easeInOut'}
              : {duration: 0.2}
          }
        >
          $2,400
        </motion.span>
      </div>
    </div>
  )
}

const CARDS = [
  {
    label: '01',
    title: 'They tap. They wait. They leave.',
    Visual: SlowSiteVisual,
  },
  {
    label: '02',
    title: 'Traffic turns into nothing.',
    Visual: MoneyWasteVisual,
  },
  {
    label: '03',
    title: 'Ads pay for a slow door.',
    Visual: RoasInvoiceVisual,
  },
] as const

/**
 * Cream motion cards for the dark pain section.
 * Added under existing copy — does not replace it.
 */
export function PainCostCards() {
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
