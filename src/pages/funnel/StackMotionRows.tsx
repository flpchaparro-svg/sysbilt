import React from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {colors} from '../../constants/theme'
import {FUNNEL_COLOURS} from './funnelTheme'

type VisualProps = {reduce: boolean | null; play: boolean}

/** Full-width 1 → 2 → 3 loading bar (plays on scroll). */
function OverhaulBarVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full h-[72px] border border-dark/12 bg-cream px-3 py-2.5 flex flex-col justify-center">
      <div className="flex justify-between mb-1.5">
        {['01', '02', '03'].map((n) => (
          <span
            key={n}
            className="font-mono text-[8px] font-bold tracking-[0.14em] text-dark/40"
          >
            {n}
          </span>
        ))}
      </div>
      <div className="h-2.5 w-full bg-dark/8 overflow-hidden">
        <motion.div
          className="h-full bg-teal"
          initial={{width: '0%'}}
          animate={{width: play || reduce ? '100%' : '0%'}}
          transition={
            reduce ? {duration: 0} : {duration: 1.8, ease: [0.16, 1, 0.3, 1]}
          }
        />
      </div>
    </div>
  )
}

/** Loading bar: red first half, green second half. */
function BeforeAfterBarVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full h-[72px] border border-dark/12 bg-cream px-3 py-2.5 flex flex-col justify-center">
      <div className="flex justify-between mb-1.5 font-mono text-[8px] uppercase tracking-[0.14em]">
        <span className="text-red-text">Before</span>
        <span className="text-teal">After</span>
      </div>
      <div className="h-2.5 w-full bg-dark/8 overflow-hidden flex">
        <motion.div
          className="h-full bg-red-solid"
          initial={{width: '0%'}}
          animate={{width: play || reduce ? '50%' : '0%'}}
          transition={reduce ? {duration: 0} : {duration: 0.9, ease: 'easeOut'}}
        />
        <motion.div
          className="h-full bg-teal"
          initial={{width: '0%'}}
          animate={{width: play || reduce ? '50%' : '0%'}}
          transition={
            reduce ? {duration: 0} : {duration: 0.9, delay: play ? 0.85 : 0, ease: 'easeOut'}
          }
        />
      </div>
    </div>
  )
}

/** Two sides + “easy to understand” meeting in the middle. */
function PlainEnglishVisual({reduce, play}: VisualProps) {
  return (
    <div className="relative w-full h-[72px] border border-dark/12 bg-cream overflow-hidden flex items-center">
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[38%] border-r border-dark/10 bg-dark/[0.03] flex items-center justify-center px-2"
        initial={{x: reduce ? 0 : -12}}
        animate={{x: play || reduce ? 0 : -12}}
        transition={{duration: 0.7, ease: [0.16, 1, 0.3, 1]}}
      >
        <span className="font-mono text-[8px] text-dark/40 uppercase tracking-wider text-center leading-tight">
          Technical
        </span>
      </motion.div>
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-[38%] border-l border-dark/10 bg-dark/[0.03] flex items-center justify-center px-2"
        initial={{x: reduce ? 0 : 12}}
        animate={{x: play || reduce ? 0 : 12}}
        transition={{duration: 0.7, ease: [0.16, 1, 0.3, 1]}}
      >
        <span className="font-mono text-[8px] text-dark/40 uppercase tracking-wider text-center leading-tight">
          Jargon
        </span>
      </motion.div>
      <motion.div
        className="relative z-10 mx-auto px-2 py-1 border border-gold/50 bg-cream"
        initial={{opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.85}}
        animate={{
          opacity: play || reduce ? 1 : 0,
          scale: play || reduce ? 1 : 0.85,
        }}
        transition={{delay: play ? 0.25 : 0, duration: 0.45}}
      >
        <span className="font-mono text-[8px] md:text-[9px] font-bold uppercase tracking-[0.12em] text-gold-on-cream whitespace-nowrap">
          Easy to understand
        </span>
      </motion.div>
    </div>
  )
}

/** Mini growing chart (forex-ish). */
function SnapshotChartVisual({reduce, play}: VisualProps) {
  const bars = [28, 36, 32, 48, 44, 58, 62, 74, 70, 88]
  return (
    <div className="relative w-full h-[72px] border border-dark/12 bg-cream px-2.5 py-2 flex items-end gap-1">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm origin-bottom"
          style={{backgroundColor: i === bars.length - 1 ? colors.teal : `${colors.gold}99`}}
          initial={{height: '12%'}}
          animate={{height: play || reduce ? `${h}%` : '12%'}}
          transition={
            reduce
              ? {duration: 0}
              : {duration: 0.7, delay: play ? i * 0.06 : 0, ease: [0.16, 1, 0.3, 1]}
          }
        />
      ))}
      <motion.div
        className="absolute right-3 top-2 font-mono text-[8px] text-teal font-bold"
        initial={{opacity: 0}}
        animate={{opacity: play || reduce ? 1 : 0}}
        transition={{delay: play ? 0.7 : 0}}
      >
        +↑
      </motion.div>
    </div>
  )
}

/** Circular promise stamp — rubber-stamp slam on scroll. */
function AftercareStampVisual({reduce, play}: VisualProps) {
  return (
    <div className="relative w-full h-[72px] border border-dark/12 bg-cream flex items-center justify-center">
      <motion.div
        className="pointer-events-none absolute inset-0 bg-red-solid/15"
        initial={{opacity: 0}}
        animate={play && !reduce ? {opacity: [0, 0, 0.4, 0]} : {opacity: 0}}
        transition={{duration: 0.65, times: [0, 0.48, 0.62, 1], ease: 'easeOut'}}
        aria-hidden
      />
      <motion.div
        className="relative h-14 w-14 rounded-full border-[2.5px] border-red-text flex items-center justify-center"
        style={{transformOrigin: '50% 60%'}}
        initial={false}
        animate={
          reduce
            ? {opacity: 1, scale: 1, rotate: -12, y: 0}
            : play
              ? {
                  opacity: 1,
                  scale: [2.6, 1.08, 0.92, 1],
                  rotate: [-38, -6, -15, -12],
                  y: [-28, 4, -2, 0],
                }
              : {opacity: 0, scale: 2.6, rotate: -38, y: -28}
        }
        transition={
          reduce
            ? {duration: 0}
            : {
                duration: 0.65,
                times: [0, 0.5, 0.72, 1],
                ease: [0.2, 0.9, 0.3, 1],
              }
        }
      >
        <div className="absolute inset-1 rounded-full border border-red-text/40" />
        <div className="text-center leading-none">
          <p className="font-mono text-[7px] font-bold uppercase tracking-[0.14em] text-red-text">
            Promise
          </p>
          <p className="font-serif text-[10px] text-red-text mt-0.5">14 days</p>
        </div>
      </motion.div>
    </div>
  )
}

/** Miss → automatic SMS. */
function TextBackTriggerVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full h-[72px] border border-dark/12 bg-cream px-3 flex items-center gap-3">
      <motion.div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{backgroundColor: FUNNEL_COLOURS.accent}}
        animate={
          play && !reduce
            ? {rotate: [0, -6, 6, 0], scale: [1, 1.05, 1]}
            : {rotate: 0, scale: 1}
        }
        transition={play && !reduce ? {duration: 0.7, repeat: 1} : {duration: 0}}
      >
        <span className="font-serif text-lg" style={{color: FUNNEL_COLOURS.onInk}}>
          ☎
        </span>
      </motion.div>
      <motion.span
        className="font-mono text-[10px]"
        style={{color: FUNNEL_COLOURS.goldDeep}}
        initial={{opacity: 0}}
        animate={{opacity: play || reduce ? 1 : 0}}
        transition={{delay: play ? 0.35 : 0}}
      >
        →
      </motion.span>
      <motion.div
        className="flex-1 rounded-md border px-2.5 py-1.5"
        style={{
          borderColor: `${FUNNEL_COLOURS.ink}18`,
          backgroundColor: FUNNEL_COLOURS.ground,
        }}
        initial={{opacity: 0, x: 8}}
        animate={{opacity: play || reduce ? 1 : 0, x: play || reduce ? 0 : 8}}
        transition={{delay: play ? 0.45 : 0, duration: 0.4}}
      >
        <p className="font-mono text-[7px] uppercase tracking-widest text-dark/40">Auto SMS</p>
        <p className="font-sans text-[10px] text-dark/75 truncate">We'll call you back…</p>
      </motion.div>
    </div>
  )
}

/** On-brand wording, not a robot script. */
function YourWordsVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full h-[72px] border border-dark/12 bg-cream px-3 flex items-center justify-center">
      <motion.div
        className="max-w-[90%] rounded-2xl rounded-br-sm px-3 py-2"
        style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
        initial={{opacity: 0, y: 8}}
        animate={{opacity: play || reduce ? 1 : 0, y: play || reduce ? 0 : 8}}
        transition={{duration: 0.4}}
      >
        <p className="font-mono text-[7px] uppercase tracking-widest mb-0.5 opacity-60">
          Your words
        </p>
        <p className="font-sans text-[11px] leading-snug">
          Sorry we missed your call, we'll ring you back shortly…
        </p>
      </motion.div>
    </div>
  )
}

/** Optional reply → logged. */
function LeadCaptureVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full h-[72px] border border-dark/12 bg-cream px-3 flex items-center gap-2">
      <motion.div
        className="flex-1 rounded-md border px-2 py-1.5"
        style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.ground}}
        initial={{opacity: 0}}
        animate={{opacity: play || reduce ? 1 : 0}}
        transition={{duration: 0.35}}
      >
        <p className="font-mono text-[7px] text-dark/40 uppercase tracking-widest">Reply</p>
        <p className="font-sans text-[10px] text-dark/70 truncate">
          Do you cover Bondi, and what's the soonest…
        </p>
      </motion.div>
      <motion.span
        className="font-mono text-[10px]"
        style={{color: FUNNEL_COLOURS.goldDeep}}
        initial={{opacity: 0}}
        animate={{opacity: play || reduce ? 1 : 0}}
        transition={{delay: play ? 0.35 : 0}}
      >
        →
      </motion.span>
      <motion.div
        className="w-[38%] rounded-md border px-2 py-1.5"
        style={{borderColor: `${colors.teal}55`, backgroundColor: `${colors.teal}15`}}
        initial={{opacity: 0, x: 6}}
        animate={{opacity: play || reduce ? 1 : 0, x: play || reduce ? 0 : 6}}
        transition={{delay: play ? 0.5 : 0, duration: 0.35}}
      >
        <p className="font-mono text-[7px] uppercase tracking-widest" style={{color: colors.teal}}>
          Logged
        </p>
        <p className="font-sans text-[9px] text-dark/60">Lead + note</p>
      </motion.div>
    </div>
  )
}

/** Live miss test → received. */
function LiveProofVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full h-[72px] border border-dark/12 bg-cream px-3 flex items-center gap-2">
      <div className="flex-1 text-center">
        <p className="font-mono text-[7px] uppercase tracking-widest text-dark/40 mb-1">Test miss</p>
        <motion.div
          className="mx-auto h-8 w-8 rounded-full flex items-center justify-center"
          style={{backgroundColor: FUNNEL_COLOURS.accent}}
          animate={play && !reduce ? {scale: [1, 1.08, 1]} : {scale: 1}}
          transition={play && !reduce ? {duration: 0.6, repeat: 1} : {duration: 0}}
        >
          <span className="font-serif text-sm" style={{color: FUNNEL_COLOURS.onInk}}>
            ☎
          </span>
        </motion.div>
      </div>
      <motion.span
        className="font-mono text-[10px]"
        style={{color: FUNNEL_COLOURS.goldDeep}}
        initial={{opacity: 0}}
        animate={{opacity: play || reduce ? 1 : 0}}
        transition={{delay: play ? 0.4 : 0}}
      >
        →
      </motion.span>
      <motion.div
        className="flex-1 rounded-md border px-2 py-2 text-center"
        style={{borderColor: `${colors.teal}55`, backgroundColor: `${colors.teal}12`}}
        initial={{opacity: 0, scale: 0.92}}
        animate={{
          opacity: play || reduce ? 1 : 0,
          scale: play || reduce ? 1 : 0.92,
        }}
        transition={{delay: play ? 0.55 : 0, duration: 0.35}}
      >
        <p className="font-mono text-[8px] font-bold uppercase tracking-widest" style={{color: colors.teal}}>
          Received
        </p>
        <p className="font-sans text-[9px] text-dark/60 mt-0.5">You watching</p>
      </motion.div>
    </div>
  )
}

const SPEED_VISUALS = [
  OverhaulBarVisual,
  BeforeAfterBarVisual,
  PlainEnglishVisual,
  SnapshotChartVisual,
  AftercareStampVisual,
]

const MISSED_VISUALS = [
  TextBackTriggerVisual,
  YourWordsVisual,
  LeadCaptureVisual,
  LiveProofVisual,
  AftercareStampVisual,
]

function StackRow({
  item,
  index,
  ink,
  muted,
  reduce,
  visuals,
}: {
  item: {title: string; text: string}
  index: number
  ink: string
  muted: string
  reduce: boolean | null
  visuals: Array<(p: VisualProps) => React.ReactElement>
}) {
  const ref = React.useRef<HTMLLIElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35, margin: '0px 0px -40px 0px'})
  const [play, setPlay] = React.useState(false)
  const Visual = visuals[index] || visuals[0]

  React.useEffect(() => {
    if (reduce) {
      setPlay(true)
      return
    }
    if (!inView) return
    const t = window.setTimeout(() => setPlay(true), index === 4 ? 340 : 220)
    return () => window.clearTimeout(t)
  }, [inView, reduce, index])

  return (
    <motion.li
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 md:items-center border-t pt-6 first:border-t-0 first:pt-0"
      style={{borderColor: `${ink}14`}}
      initial={reduce ? false : {opacity: 0, y: 18}}
      animate={inView || reduce ? {opacity: 1, y: 0} : {opacity: 0, y: 18}}
      transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
    >
      <div>
        <p className="font-serif text-lg md:text-xl mb-2" style={{color: ink}}>
          {item.title}
        </p>
        <p className="font-sans text-base leading-relaxed" style={{color: muted}}>
          {item.text}
        </p>
      </div>
      <div className="relative w-full max-w-sm md:max-w-none md:ml-auto">
        <Visual reduce={reduce} play={play} />
      </div>
    </motion.li>
  )
}

type StackItem = {title: string; text: string}

/**
 * Stack rows: copy left, motion strip right.
 */
export function StackMotionRows({
  items,
  ink,
  muted,
  variant = 'speed',
}: {
  items: StackItem[]
  ink: string
  muted: string
  variant?: 'speed' | 'missed-call'
}) {
  const reduce = useReducedMotion()
  const visuals = variant === 'missed-call' ? MISSED_VISUALS : SPEED_VISUALS

  return (
    <ul className="space-y-10 md:space-y-12">
      {items.map((item, i) => (
        <StackRow
          key={i}
          item={item}
          index={i}
          ink={ink}
          muted={muted}
          reduce={reduce}
          visuals={visuals}
        />
      ))}
    </ul>
  )
}
