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
    <div className="relative w-full h-[72px] border border-dark/20 bg-white flex items-center justify-center">
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
    <div className="w-full h-[72px] border border-dark/20 bg-white px-3 flex items-center gap-3">
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
          borderColor: `${FUNNEL_COLOURS.ink}22`,
          backgroundColor: FUNNEL_COLOURS.surfaceGold,
        }}
        initial={{opacity: 0, x: 8}}
        animate={{opacity: play || reduce ? 1 : 0, x: play || reduce ? 0 : 8}}
        transition={{delay: play ? 0.45 : 0, duration: 0.4}}
      >
        <p className="font-mono text-[7px] uppercase tracking-widest text-dark/45">Auto SMS</p>
        <p className="font-sans text-[10px] text-dark/80 truncate">We'll call you back…</p>
      </motion.div>
    </div>
  )
}

/** On-brand wording, not a robot script. */
function YourWordsVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full h-[72px] border border-dark/20 bg-white px-3 flex items-center justify-center">
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
    <div className="w-full h-[72px] border border-dark/20 bg-white px-3 flex items-center gap-2">
      <motion.div
        className="flex-1 rounded-md border px-2 py-1.5"
        style={{borderColor: `${FUNNEL_COLOURS.ink}22`, backgroundColor: FUNNEL_COLOURS.surfaceGold}}
        initial={{opacity: 0}}
        animate={{opacity: play || reduce ? 1 : 0}}
        transition={{duration: 0.35}}
      >
        <p className="font-mono text-[7px] text-dark/45 uppercase tracking-widest">Reply</p>
        <p className="font-sans text-[10px] text-dark/75 truncate">
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
        style={{borderColor: `${colors.teal}66`, backgroundColor: `${colors.teal}22`}}
        initial={{opacity: 0, x: 6}}
        animate={{opacity: play || reduce ? 1 : 0, x: play || reduce ? 0 : 6}}
        transition={{delay: play ? 0.5 : 0, duration: 0.35}}
      >
        <p className="font-mono text-[7px] uppercase tracking-widest" style={{color: colors.teal}}>
          Logged
        </p>
        <p className="font-sans text-[9px] text-dark/70">Lead + note</p>
      </motion.div>
    </div>
  )
}

/** Live miss test → received. */
function LiveProofVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full h-[72px] border border-dark/20 bg-white px-3 flex items-center gap-2">
      <div className="flex-1 text-center">
        <p className="font-mono text-[7px] uppercase tracking-widest text-dark/45 mb-1">Test miss</p>
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
        style={{borderColor: `${colors.teal}66`, backgroundColor: `${colors.teal}22`}}
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
        <p className="font-sans text-[9px] text-dark/70 mt-0.5">You watching</p>
      </motion.div>
    </div>
  )
}

/** Profile audit checklist ticking through. */
function ProfileOverhaulBarVisual({reduce, play}: VisualProps) {
  const rows = ['Claim', 'Categories', 'Photos', 'Review link']
  return (
    <div className="w-full h-[72px] border border-dark/20 bg-white px-3 py-2 flex flex-col justify-center gap-1">
      <div className="flex gap-1.5">
        {rows.map((label, i) => (
          <motion.div
            key={label}
            className="flex-1 border px-1 py-1 text-center bg-cream"
            style={{borderColor: 'rgba(26,26,26,0.18)'}}
            initial={{opacity: 0.35}}
            animate={{
              opacity: play || reduce ? 1 : 0.35,
              borderColor:
                play || reduce ? 'rgba(168,132,63,0.85)' : 'rgba(26,26,26,0.18)',
              backgroundColor:
                play || reduce ? 'rgba(197,160,89,0.22)' : '#FFF2EC',
            }}
            transition={
              reduce ? {duration: 0} : {delay: play ? i * 0.18 : 0, duration: 0.3}
            }
          >
            <p className="font-mono text-[7px] uppercase tracking-wider text-dark/60">{label}</p>
            <motion.p
              className="font-mono text-[9px] font-bold text-gold-on-cream"
              initial={{opacity: 0}}
              animate={{opacity: play || reduce ? 1 : 0}}
              transition={{delay: play ? 0.2 + i * 0.18 : 0}}
            >
              ✓
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Keys stay with the owner. */
function OwnershipKeysVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full h-[72px] border border-dark/20 bg-white px-3 flex items-center justify-center gap-3">
      <motion.div
        className="border px-3 py-2 text-center"
        style={{
          borderColor: 'rgba(168,132,63,0.85)',
          backgroundColor: 'rgba(197,160,89,0.28)',
        }}
        initial={{opacity: 0, scale: 0.92}}
        animate={{
          opacity: play || reduce ? 1 : 0,
          scale: play || reduce ? 1 : 0.92,
        }}
        transition={{duration: 0.4}}
      >
        <p className="font-mono text-[7px] uppercase tracking-widest text-gold-on-cream">Owner</p>
        <p className="font-sans text-[11px] font-medium text-dark">You</p>
      </motion.div>
      <motion.span
        className="font-mono text-[10px] text-gold-on-cream"
        initial={{opacity: 0}}
        animate={{opacity: play || reduce ? 1 : 0}}
        transition={{delay: play ? 0.25 : 0}}
      >
        ←
      </motion.span>
      <motion.div
        className="border border-dark/20 bg-cream px-3 py-2 text-center"
        initial={{opacity: 0, x: 8}}
        animate={{opacity: play || reduce ? 1 : 0, x: play || reduce ? 0 : 8}}
        transition={{delay: play ? 0.35 : 0, duration: 0.35}}
      >
        <p className="font-mono text-[7px] uppercase tracking-widest text-dark/50">Us</p>
        <p className="font-sans text-[11px] text-dark/80">Manager only</p>
      </motion.div>
    </div>
  )
}

/** Review link ready to copy. */
function ReviewLinkStackVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full h-[72px] border border-dark/20 bg-white px-3 flex items-center gap-2">
      <motion.div
        className="flex-1 border px-2.5 py-2"
        style={{
          borderColor: 'rgba(168,132,63,0.85)',
          backgroundColor: 'rgba(197,160,89,0.22)',
        }}
        initial={{opacity: 0, y: 6}}
        animate={{opacity: play || reduce ? 1 : 0, y: play || reduce ? 0 : 6}}
        transition={{duration: 0.35}}
      >
        <p className="font-mono text-[7px] uppercase tracking-widest text-gold-on-cream">
          Ask wording + link
        </p>
        <p className="font-sans text-[10px] truncate text-dark">Ready to send after a good job</p>
      </motion.div>
      <motion.span
        className="font-mono text-[9px] font-bold uppercase tracking-widest text-gold-on-cream"
        initial={{opacity: 0}}
        animate={{opacity: play || reduce ? 1 : 0}}
        transition={{delay: play ? 0.4 : 0}}
      >
        Copy
      </motion.span>
    </div>
  )
}

/** Monthly habit + snapshot. */
function HabitSnapshotVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full h-[72px] border border-dark/20 bg-white px-3 flex items-center gap-2">
      <motion.div
        className="w-[42%] border border-dark/20 bg-cream px-2 py-1.5 text-center"
        initial={{opacity: 0}}
        animate={{opacity: play || reduce ? 1 : 0}}
        transition={{duration: 0.3}}
      >
        <p className="font-mono text-[7px] uppercase tracking-widest text-gold-on-cream">5 min</p>
        <p className="font-sans text-[10px] text-dark">Monthly habit</p>
      </motion.div>
      <motion.span
        className="font-mono text-[10px] text-gold-on-cream"
        initial={{opacity: 0}}
        animate={{opacity: play || reduce ? 1 : 0}}
        transition={{delay: play ? 0.25 : 0}}
      >
        +
      </motion.span>
      <motion.div
        className="flex-1 border px-2 py-1.5"
        style={{
          borderColor: 'rgba(168,132,63,0.85)',
          backgroundColor: 'rgba(197,160,89,0.22)',
        }}
        initial={{opacity: 0, x: 6}}
        animate={{opacity: play || reduce ? 1 : 0, x: play || reduce ? 0 : 6}}
        transition={{delay: play ? 0.4 : 0, duration: 0.35}}
      >
        <p className="font-mono text-[7px] uppercase tracking-widest text-gold-on-cream">Snapshot</p>
        <p className="font-sans text-[9px] text-dark/80">What to fix next</p>
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

/** AI Phone: voice agent on their vendor account. */
function AiPhoneVendorStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center gap-3 overflow-hidden">
      <motion.div
        className="h-10 w-10 rounded-sm border flex items-center justify-center shrink-0"
        style={{borderColor: FUNNEL_COLOURS.accent, color: FUNNEL_COLOURS.accent}}
        animate={go ? {scale: [1, 1.08, 1], rotate: [0, -3, 3, 0]} : undefined}
        transition={{duration: 1.3, repeat: Infinity}}
      >
        <span className="font-mono text-[8px] font-bold uppercase tracking-wide">AI</span>
      </motion.div>
      <div className="min-w-0">
        <p className="font-mono text-[8px] uppercase tracking-widest text-dark/45">Your vendor login</p>
        <motion.p
          className="font-sans text-[12px] text-dark/80"
          initial={{opacity: 0, x: 6}}
          animate={go ? {opacity: 1, x: 0} : {opacity: 1}}
          transition={{delay: reduce ? 0 : 0.2, type: 'spring', stiffness: 340}}
        >
          Synthflow · Vapi · equivalent
        </motion.p>
      </div>
    </div>
  )
}

/** AI Phone: knowledge pack loaded. */
function AiPhoneKnowledgeStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const rows = ['Hours', 'FAQs', 'Tone', 'Booking rules']
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 space-y-1 overflow-hidden">
      {rows.map((label, i) => (
        <motion.div
          key={label}
          className="flex items-center justify-between border px-2 py-0.5"
          initial={{opacity: 0.3, x: -6}}
          animate={
            go
              ? {
                  opacity: 1,
                  x: 0,
                  borderColor: FUNNEL_COLOURS.accent,
                  backgroundColor: `${FUNNEL_COLOURS.accent}12`,
                }
              : undefined
          }
          transition={{delay: i * 0.12, type: 'spring', stiffness: 360}}
        >
          <span className="font-sans text-[11px] text-dark/75">{label}</span>
          <span
            className="font-mono text-[7px] font-bold uppercase tracking-wide"
            style={{color: FUNNEL_COLOURS.accent}}
          >
            In
          </span>
        </motion.div>
      ))}
    </div>
  )
}

/** AI Phone: calendar + CRM wired. */
function AiPhoneWireStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const rows = ['Calendar', 'CRM / inbox']
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex flex-col justify-center gap-1.5 overflow-hidden">
      {rows.map((label, i) => (
        <motion.div
          key={label}
          className="flex items-center justify-between border px-2 py-1.5"
          initial={{opacity: 0.35}}
          animate={
            go
              ? {
                  opacity: 1,
                  borderColor: FUNNEL_COLOURS.accent,
                  backgroundColor: `${FUNNEL_COLOURS.accent}12`,
                }
              : undefined
          }
          transition={{delay: i * 0.22, duration: 0.3}}
        >
          <span className="font-sans text-[12px] text-dark/80">{label}</span>
          <motion.span
            className="font-mono text-[7px] font-bold uppercase tracking-wide"
            style={{color: FUNNEL_COLOURS.accent}}
            animate={go ? {opacity: [0.4, 1, 0.4]} : undefined}
            transition={{duration: 1.1, repeat: Infinity, delay: 0.35 + i * 0.2}}
          >
            Wired
          </motion.span>
        </motion.div>
      ))}
    </div>
  )
}

/** AI Phone: live test call proof. */
function AiPhoneLiveProofStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center gap-3 overflow-hidden">
      <motion.div
        className="font-serif text-2xl font-bold leading-none"
        style={{color: FUNNEL_COLOURS.accent}}
        animate={go ? {scale: [1, 1.1, 1]} : undefined}
        transition={{duration: 1.2, repeat: Infinity}}
      >
        ☎
      </motion.div>
      <div className="min-w-0">
        <p className="font-mono text-[8px] uppercase tracking-widest text-dark/45">Live test call</p>
        <p className="font-sans text-[12px] text-dark/75 mt-0.5">You listen · then runbook + keys</p>
      </div>
    </div>
  )
}

const AI_PHONE_STACK_VISUALS = [
  AiPhoneVendorStackVisual,
  AiPhoneKnowledgeStackVisual,
  AiPhoneWireStackVisual,
  AiPhoneLiveProofStackVisual,
  AftercareStampVisual,
]

const MISSED_VISUALS = [
  TextBackTriggerVisual,
  YourWordsVisual,
  LeadCaptureVisual,
  LiveProofVisual,
  AftercareStampVisual,
]

const PROFILE_STACK_VISUALS = [
  ProfileOverhaulBarVisual,
  OwnershipKeysVisual,
  ReviewLinkStackVisual,
  HabitSnapshotVisual,
  AftercareStampVisual,
]

/** Auto ask: job stamp → SMS pulse. */
function ReviewsAskFireVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center gap-3">
      <motion.div
        className="rounded-md border px-2 py-1.5 font-mono text-[8px] font-bold uppercase tracking-wider shrink-0"
        style={{
          borderColor: play || reduce ? `${FUNNEL_COLOURS.gold}88` : `${FUNNEL_COLOURS.ink}20`,
          backgroundColor: play || reduce ? `${FUNNEL_COLOURS.gold}22` : FUNNEL_COLOURS.ground,
          color: FUNNEL_COLOURS.goldDeep,
        }}
        animate={{opacity: play || reduce ? 1 : 0.4}}
      >
        Done
      </motion.div>
      <motion.span
        className="font-mono text-[12px] font-bold"
        style={{color: FUNNEL_COLOURS.goldDeep}}
        initial={{opacity: 0, x: -4}}
        animate={{opacity: play || reduce ? 1 : 0, x: play || reduce ? 0 : -4}}
        transition={{delay: play ? 0.2 : 0}}
      >
        →
      </motion.span>
      <motion.div
        className="flex-1 border px-2.5 py-2"
        style={{
          borderColor: play || reduce ? `${FUNNEL_COLOURS.accent}55` : `${FUNNEL_COLOURS.ink}14`,
          backgroundColor: FUNNEL_COLOURS.ground,
        }}
        initial={{opacity: 0, x: 8}}
        animate={{opacity: play || reduce ? 1 : 0, x: play || reduce ? 0 : 8}}
        transition={{delay: play ? 0.3 : 0, duration: 0.35}}
      >
        <div className="flex gap-1 mb-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{backgroundColor: FUNNEL_COLOURS.accent}}
              animate={
                play
                  ? {opacity: [0.3, 1, 0.3]}
                  : {opacity: 0.5}
              }
              transition={play ? {duration: 1.1, repeat: Infinity, delay: i * 0.15} : undefined}
            />
          ))}
        </div>
        <div className="h-1.5 w-full rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}18`}} />
      </motion.div>
    </div>
  )
}

/** Voice wording: bars type in. */
function ReviewsVoiceVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex flex-col justify-center gap-1.5">
      {[88, 64, 40].map((w, i) => (
        <motion.div
          key={w}
          className="h-2 rounded-sm origin-left"
          style={{
            width: `${w}%`,
            backgroundColor: i === 2 ? FUNNEL_COLOURS.goldDeep : `${FUNNEL_COLOURS.ink}${i === 0 ? '28' : '18'}`,
          }}
          initial={{scaleX: 0}}
          animate={{scaleX: play || reduce ? 1 : 0}}
          transition={{delay: play ? i * 0.18 : 0, duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
        />
      ))}
    </div>
  )
}

/** Mini QR builds. */
function ReviewsQrStackVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center justify-center gap-3">
      <div className="h-12 w-12 border grid grid-cols-3 grid-rows-3 gap-0.5 p-1" style={{borderColor: `${FUNNEL_COLOURS.ink}18`}}>
        {Array.from({length: 9}).map((_, i) => (
          <motion.div
            key={i}
            className="rounded-[1px]"
            style={{backgroundColor: i === 4 ? 'transparent' : FUNNEL_COLOURS.ink}}
            initial={{opacity: 0}}
            animate={{opacity: play || reduce ? (i === 4 ? 0 : i % 2 === 0 ? 0.9 : 0.4) : 0}}
            transition={{delay: play ? i * 0.05 : 0}}
          />
        ))}
      </div>
      <motion.p
        className="font-mono text-[9px] font-bold uppercase tracking-widest"
        style={{color: FUNNEL_COLOURS.goldDeep}}
        initial={{opacity: 0, x: 6}}
        animate={{opacity: play || reduce ? 1 : 0, x: play || reduce ? 0 : 6}}
        transition={{delay: play ? 0.45 : 0}}
      >
        Ready
      </motion.p>
    </div>
  )
}

/** Good / tough reply pair. */
function ReviewsReplyPairVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex gap-2">
      {['Good', 'Tough'].map((label, i) => (
        <motion.div
          key={label}
          className="flex-1 border px-2 py-2 flex flex-col justify-between"
          style={{
            borderColor: play || reduce ? `${FUNNEL_COLOURS.gold}66` : `${FUNNEL_COLOURS.ink}14`,
            backgroundColor: FUNNEL_COLOURS.ground,
          }}
          initial={{opacity: 0, y: 8}}
          animate={{opacity: play || reduce ? 1 : 0, y: play || reduce ? 0 : 8}}
          transition={{delay: play ? i * 0.2 : 0, duration: 0.35}}
        >
          <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-dark/55">{label}</p>
          <div className="h-1.5 w-full rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}16`}} />
        </motion.div>
      ))}
    </div>
  )
}

const REVIEWS_STACK_VISUALS = [
  ReviewsAskFireVisual,
  ReviewsVoiceVisual,
  ReviewsQrStackVisual,
  ReviewsReplyPairVisual,
  HabitSnapshotVisual,
  AftercareStampVisual,
]

/** Diagnosis checklist ticks on — white panel so it reads on cream page. */
function IndexDiagnosisVisual({reduce, play}: VisualProps) {
  const items = ['noindex', 'robots', 'canonicals', 'redirects']
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex flex-col justify-center">
      <div className="flex flex-wrap gap-1.5 justify-center">
        {items.map((label, i) => (
          <motion.span
            key={label}
            className="font-mono text-[8px] uppercase tracking-wider px-2 py-1 border"
            style={{
              borderColor: play || reduce ? `${FUNNEL_COLOURS.gold}88` : `${FUNNEL_COLOURS.ink}20`,
              backgroundColor: play || reduce ? `${FUNNEL_COLOURS.gold}22` : FUNNEL_COLOURS.ground,
              color: FUNNEL_COLOURS.ink,
            }}
            initial={reduce ? false : {opacity: 0, y: 6}}
            animate={{opacity: play || reduce ? 1 : 0.5, y: play || reduce ? 0 : 6}}
            transition={{delay: play ? i * 0.12 : 0, duration: 0.3}}
          >
            {label}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

/** Sitemap rebuilds. */
function SitemapRebuildVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center gap-2">
      <span className="font-mono text-[8px] uppercase tracking-widest text-dark/55 shrink-0">
        sitemap.xml
      </span>
      <div className="flex-1 h-2.5 bg-dark/10 overflow-hidden">
        <motion.div
          className="h-full"
          style={{backgroundColor: FUNNEL_COLOURS.gold}}
          initial={{width: '0%'}}
          animate={{width: play || reduce ? '100%' : '0%'}}
          transition={reduce ? {duration: 0} : {duration: 1.2, ease: [0.16, 1, 0.3, 1]}}
        />
      </div>
      <motion.span
        className="font-mono text-[8px] font-bold uppercase tracking-widest shrink-0"
        style={{color: FUNNEL_COLOURS.goldDeep}}
        initial={{opacity: 0}}
        animate={{opacity: play || reduce ? 1 : 0}}
        transition={{delay: play ? 0.9 : 0}}
      >
        Sent
      </motion.span>
    </div>
  )
}

/** Keys hand to your account. */
function ConsoleOwnershipVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center justify-center gap-2">
      <motion.div
        className="border px-2.5 py-2"
        style={{
          borderColor: `${FUNNEL_COLOURS.ink}18`,
          backgroundColor: FUNNEL_COLOURS.ground,
        }}
        animate={{opacity: play || reduce ? 0.55 : 1}}
        transition={{duration: 0.4}}
      >
        <p className="font-mono text-[8px] uppercase tracking-widest text-dark/60">Our access</p>
      </motion.div>
      <motion.span
        className="font-mono text-[12px] font-bold"
        style={{color: FUNNEL_COLOURS.goldDeep}}
        initial={{opacity: 0, x: -4}}
        animate={{opacity: play || reduce ? 1 : 0, x: play || reduce ? 0 : -4}}
        transition={{delay: play ? 0.15 : 0}}
      >
        →
      </motion.span>
      <motion.div
        className="border px-2.5 py-2"
        style={{
          borderColor: `${FUNNEL_COLOURS.gold}88`,
          backgroundColor: `${FUNNEL_COLOURS.gold}22`,
        }}
        initial={reduce ? false : {opacity: 0, x: 8}}
        animate={{opacity: play || reduce ? 1 : 0, x: play || reduce ? 0 : 8}}
        transition={{delay: play ? 0.25 : 0, duration: 0.4}}
      >
        <p
          className="font-mono text-[8px] font-bold uppercase tracking-widest"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          Your keys
        </p>
      </motion.div>
    </div>
  )
}

/** Plain English note card. */
function PlainSummaryVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex flex-col justify-center">
      <motion.div
        className="border px-2.5 py-2"
        style={{
          borderColor: `${FUNNEL_COLOURS.ink}14`,
          backgroundColor: FUNNEL_COLOURS.ground,
        }}
        initial={reduce ? false : {opacity: 0, y: 6}}
        animate={{opacity: play || reduce ? 1 : 0, y: play || reduce ? 0 : 6}}
        transition={{duration: 0.4}}
      >
        <p
          className="font-mono text-[7px] uppercase tracking-widest mb-1"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          Summary
        </p>
        <p className="font-sans text-[10px] leading-snug text-dark/75">
          What broke · why · how to stop it
        </p>
      </motion.div>
    </div>
  )
}

/** Snapshot one-pager. */
function SystemsSnapshotSearchVisual({reduce, play}: VisualProps) {
  const labels = ['Site', 'Leads', 'Next']
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center gap-2">
      {labels.map((label, i) => (
        <motion.div
          key={label}
          className="flex-1 h-12 border flex items-center justify-center"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}14`,
            backgroundColor: FUNNEL_COLOURS.ground,
          }}
          initial={reduce ? false : {opacity: 0, y: 6}}
          animate={{opacity: play || reduce ? 1 : 0, y: play || reduce ? 0 : 6}}
          transition={{delay: play ? i * 0.12 : 0, duration: 0.3}}
        >
          <span className="font-mono text-[8px] uppercase tracking-widest text-dark/55">{label}</span>
        </motion.div>
      ))}
      <motion.span
        className="font-mono text-[8px] font-bold uppercase tracking-widest whitespace-nowrap"
        style={{color: FUNNEL_COLOURS.goldDeep}}
        initial={{opacity: 0}}
        animate={{opacity: play || reduce ? 1 : 0}}
        transition={{delay: play ? 0.4 : 0}}
      >
        Next fix
      </motion.span>
    </div>
  )
}

/** 30-day watch progress. */
function RecrawlWatchVisual({reduce, play}: VisualProps) {
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex flex-col justify-center">
      <div className="flex justify-between mb-2 font-mono text-[8px] uppercase tracking-[0.14em]">
        <span className="text-dark/50">Day 1</span>
        <span style={{color: FUNNEL_COLOURS.goldDeep}}>Day 30</span>
      </div>
      <div className="h-2.5 w-full bg-dark/10 overflow-hidden">
        <motion.div
          className="h-full"
          style={{backgroundColor: FUNNEL_COLOURS.gold}}
          initial={{width: '0%'}}
          animate={{width: play || reduce ? '100%' : '0%'}}
          transition={reduce ? {duration: 0} : {duration: 1.6, ease: [0.16, 1, 0.3, 1]}}
        />
      </div>
      <p className="mt-2 font-mono text-[8px] uppercase tracking-widest text-dark/45">
        Monitoring and improving
      </p>
    </div>
  )
}

const SEARCH_STACK_VISUALS = [
  IndexDiagnosisVisual,
  SitemapRebuildVisual,
  ConsoleOwnershipVisual,
  PlainSummaryVisual,
  SystemsSnapshotSearchVisual,
  RecrawlWatchVisual,
]

/** Ad line slides down and becomes the page headline. */
function CopyMatchStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="relative w-full h-[72px] border border-dark/12 bg-cream px-3 py-2 overflow-hidden">
      <motion.div
        className="absolute left-3 right-3 top-2 flex items-center gap-2"
        animate={go ? {y: [0, 0, 22, 22, 0], opacity: [1, 1, 0.15, 0.15, 1]} : undefined}
        transition={{duration: 2.6, repeat: Infinity, times: [0, 0.25, 0.45, 0.8, 1]}}
      >
        <span className="font-mono text-[7px] uppercase tracking-widest text-dark/40 w-8 shrink-0">Ad</span>
        <span className="font-sans text-[10px] truncate" style={{color: FUNNEL_COLOURS.ink}}>
          Free consult this week
        </span>
      </motion.div>
      <motion.div
        className="absolute left-3 right-3 bottom-2 flex items-center gap-2"
        animate={go ? {y: [18, 18, 0, 0, 18], opacity: [0, 0, 1, 1, 0]} : {opacity: reduce ? 1 : 0}}
        transition={{duration: 2.6, repeat: Infinity, times: [0, 0.25, 0.45, 0.8, 1]}}
      >
        <span className="font-mono text-[7px] uppercase tracking-widest text-dark/40 w-8 shrink-0">Page</span>
        <span className="font-serif text-[11px] font-bold truncate" style={{color: FUNNEL_COLOURS.ink}}>
          Free consult this week
        </span>
        <motion.span
          className="ml-auto font-mono text-[9px] font-bold"
          style={{color: FUNNEL_COLOURS.accent}}
          animate={go ? {scale: [0, 0, 1.2, 1, 0]} : undefined}
          transition={{duration: 2.6, repeat: Infinity, times: [0, 0.4, 0.55, 0.8, 1]}}
        >
          ✓
        </motion.span>
      </motion.div>
    </div>
  )
}

/** Domain types in, bar fills, lock flashes. */
function DomainBrandStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full h-[72px] border border-dark/12 bg-cream px-3 py-2.5 flex flex-col justify-center">
      <div className="flex items-center justify-between mb-1">
        <p className="font-mono text-[7px] uppercase tracking-widest text-dark/40">Your domain</p>
        <motion.span
          className="font-mono text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5"
          style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
          animate={go ? {scale: [0.7, 1.1, 1, 1, 0.7], opacity: [0, 1, 1, 1, 0]} : {opacity: reduce ? 1 : 0}}
          transition={{duration: 2.8, repeat: Infinity, times: [0, 0.35, 0.45, 0.85, 1]}}
        >
          Yours
        </motion.span>
      </div>
      <motion.p
        className="font-serif text-sm font-bold overflow-hidden whitespace-nowrap"
        style={{color: FUNNEL_COLOURS.ink}}
        animate={
          go
            ? {clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 0)', 'inset(0 100% 0 0)']}
            : undefined
        }
        transition={{duration: 2.8, repeat: Infinity, times: [0, 0.4, 0.85, 1], ease: 'easeInOut'}}
      >
        you.com.au/offer
      </motion.p>
      <div className="mt-1.5 h-1.5 rounded-full overflow-hidden bg-dark/10">
        <motion.div
          className="h-full"
          style={{backgroundColor: FUNNEL_COLOURS.gold}}
          animate={go ? {width: ['0%', '100%', '100%', '0%']} : {width: '100%'}}
          transition={{duration: 2.8, repeat: Infinity, times: [0, 0.4, 0.85, 1], ease: 'easeInOut'}}
        />
      </div>
    </div>
  )
}

/** Tracking fire — pixels cascade then FIRED stamp. */
function TrackingWireStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="relative w-full h-[72px] border border-dark/12 bg-cream px-3 py-2 flex items-center gap-3 overflow-hidden">
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[7px] uppercase tracking-widest text-dark/40 mb-1.5">Pixel → ads</p>
        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.span
              key={i}
              className="h-3 w-3 rounded-sm"
              style={{backgroundColor: i % 2 === 0 ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.gold}}
              animate={
                go
                  ? {opacity: [0.15, 1, 0.15], scale: [0.7, 1.2, 0.7], y: [4, -2, 4]}
                  : {opacity: 0.5}
              }
              transition={{duration: 1, repeat: Infinity, delay: i * 0.12}}
            />
          ))}
        </div>
      </div>
      <motion.span
        className="font-mono text-[8px] font-bold uppercase tracking-widest px-2 py-1.5 shrink-0"
        style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
        animate={
          go
            ? {scale: [0.85, 1.12, 1], rotate: [-6, 3, 0], opacity: [0.4, 1, 1]}
            : undefined
        }
        transition={{duration: 1.6, repeat: Infinity}}
      >
        Fired
      </motion.span>
    </div>
  )
}

/** Campaign wipe: /homepage out, /offer in. */
function PointCampaignStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full h-[72px] border border-dark/12 bg-cream px-3 py-2 flex flex-col justify-center gap-1.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[8px] text-dark/40">Destination</span>
        <motion.span
          className="font-mono text-[8px] font-bold uppercase tracking-widest"
          style={{color: FUNNEL_COLOURS.accent}}
          animate={go ? {opacity: [0.2, 1, 0.2], x: [4, 0, 4]} : undefined}
          transition={{duration: 2.4, repeat: Infinity}}
        >
          Switched
        </motion.span>
      </div>
      <div className="relative h-8 overflow-hidden border" style={{borderColor: `${FUNNEL_COLOURS.ink}12`}}>
        <motion.div
          className="absolute inset-0 flex items-center px-2.5 font-mono text-[10px] line-through"
          style={{color: FUNNEL_COLOURS.muted, backgroundColor: FUNNEL_COLOURS.ground}}
          animate={go ? {x: ['0%', '-105%', '-105%', '0%']} : {x: reduce ? '-105%' : '0%'}}
          transition={{duration: 2.8, repeat: Infinity, times: [0, 0.35, 0.85, 1], ease: 'easeInOut'}}
        >
          /homepage
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center px-2.5 font-mono text-[10px] font-bold"
          style={{color: FUNNEL_COLOURS.ink, backgroundColor: FUNNEL_COLOURS.surfaceGold}}
          animate={go ? {x: ['105%', '0%', '0%', '105%']} : {x: '0%'}}
          transition={{duration: 2.8, repeat: Infinity, times: [0, 0.35, 0.85, 1], ease: 'easeInOut'}}
        >
          /offer · matched
        </motion.div>
      </div>
    </div>
  )
}

/** Systems Snapshot rows draw in sequence. */
function SnapshotStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const rows = [
    {label: 'Website', w: '92%'},
    {label: 'Leads', w: '70%'},
    {label: 'Follow-up', w: '48%'},
  ]
  return (
    <div className="w-full h-[72px] border border-dark/12 bg-cream px-3 py-2 flex flex-col justify-center gap-1">
      <motion.p
        className="font-mono text-[7px] uppercase tracking-widest mb-0.5"
        style={{color: FUNNEL_COLOURS.goldDeep}}
        animate={go ? {opacity: [0.4, 1, 0.4]} : undefined}
        transition={{duration: 2, repeat: Infinity}}
      >
        Systems Snapshot
      </motion.p>
      {rows.map((row, i) => (
        <div key={row.label} className="flex items-center gap-2">
          <span className="font-mono text-[7px] text-dark/40 w-12 shrink-0">{row.label}</span>
          <div className="flex-1 h-2 bg-dark/8 overflow-hidden">
            <motion.div
              className="h-full"
              style={{backgroundColor: i === 2 ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.gold}}
              animate={go ? {width: ['0%', row.w, row.w, '0%']} : {width: row.w}}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                delay: i * 0.15,
                times: [0, 0.35, 0.8, 1],
                ease: 'easeOut',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/** 14-day aftercare — counter ticks, bar fills. */
function AftercareStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full h-[72px] border border-dark/12 bg-cream px-3 py-2.5 flex items-center gap-3">
      <motion.div
        className="font-serif text-2xl font-bold tabular-nums w-10 text-center"
        style={{color: FUNNEL_COLOURS.accent}}
        animate={go ? {scale: [1, 1.15, 1], rotate: [0, -4, 0]} : undefined}
        transition={{duration: 1.4, repeat: Infinity}}
      >
        14
      </motion.div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[8px] uppercase tracking-widest text-dark/45">Days aftercare</p>
        <div className="mt-1.5 h-2 w-full bg-dark/10 overflow-hidden">
          <motion.div
            className="h-full"
            style={{backgroundColor: FUNNEL_COLOURS.gold}}
            animate={go ? {width: ['0%', '100%', '100%', '0%']} : {width: '100%'}}
            transition={{duration: 2.8, repeat: Infinity, times: [0, 0.5, 0.85, 1], ease: 'easeInOut'}}
          />
        </div>
        <motion.p
          className="mt-1 font-mono text-[7px] uppercase tracking-widest"
          style={{color: FUNNEL_COLOURS.goldDeep}}
          animate={go ? {opacity: [0, 1, 1, 0]} : undefined}
          transition={{duration: 2.8, repeat: Infinity, times: [0, 0.45, 0.85, 1]}}
        >
          Copy tweak included
        </motion.p>
      </div>
    </div>
  )
}

const LANDING_STACK_VISUALS = [
  CopyMatchStackVisual,
  DomainBrandStackVisual,
  TrackingWireStackVisual,
  PointCampaignStackVisual,
  SnapshotStackVisual,
  AftercareStackVisual,
]

/** Booking tool ↔ calendar handshake. */
function BookingToolStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full h-[72px] border border-dark/12 bg-cream px-3 py-2 flex items-center gap-2 overflow-hidden">
      <motion.div
        className="flex-1 min-w-0 h-full border px-2 flex flex-col justify-center"
        style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: '#fff'}}
        animate={go ? {x: [0, 2, 0]} : undefined}
        transition={{duration: 2.2, repeat: Infinity}}
      >
        <p className="font-mono text-[7px] uppercase tracking-widest text-dark/40">Tool</p>
        <p className="font-serif text-[12px] font-bold truncate" style={{color: FUNNEL_COLOURS.ink}}>
          Calendly / HubSpot
        </p>
      </motion.div>
      <motion.span
        className="font-mono text-[10px] font-bold shrink-0"
        style={{color: FUNNEL_COLOURS.goldDeep}}
        animate={go ? {opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9]} : undefined}
        transition={{duration: 1.4, repeat: Infinity}}
      >
        ↔
      </motion.span>
      <motion.div
        className="flex-1 min-w-0 h-full border px-2 flex flex-col justify-center"
        style={{borderColor: `${FUNNEL_COLOURS.goldDeep}40`, backgroundColor: FUNNEL_COLOURS.surfaceGold}}
        animate={go ? {x: [0, -2, 0]} : undefined}
        transition={{duration: 2.2, repeat: Infinity}}
      >
        <p className="font-mono text-[7px] uppercase tracking-widest" style={{color: FUNNEL_COLOURS.goldDeep}}>
          Calendar
        </p>
        <p className="font-serif text-[12px] font-bold truncate" style={{color: FUNNEL_COLOURS.ink}}>
          Your real diary
        </p>
      </motion.div>
    </div>
  )
}

/** Confirm → remind → empty-slot chase. */
function BookingRemindersStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const steps = [
    {label: 'Booked', tone: FUNNEL_COLOURS.gold},
    {label: 'Remind', tone: FUNNEL_COLOURS.goldDeep},
    {label: 'Chase', tone: FUNNEL_COLOURS.accent},
  ]
  return (
    <div className="w-full h-[72px] border border-dark/12 bg-cream px-3 py-2.5 flex items-center gap-1.5">
      {steps.map((step, i) => (
        <React.Fragment key={step.label}>
          <motion.div
            className="flex-1 min-w-0 h-full border px-1.5 flex flex-col items-center justify-center text-center"
            style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: '#fff'}}
            initial={reduce ? false : {opacity: 0, y: 6}}
            animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.35, y: 6}}
            transition={{duration: 0.35, delay: reduce ? 0 : i * 0.35}}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full mb-1"
              style={{backgroundColor: step.tone}}
              animate={go ? {scale: [1, 1.4, 1]} : undefined}
              transition={{duration: 1.2, repeat: Infinity, delay: i * 0.25}}
            />
            <p className="font-mono text-[8px] font-bold uppercase tracking-[0.1em]" style={{color: FUNNEL_COLOURS.ink}}>
              {step.label}
            </p>
          </motion.div>
          {i < steps.length - 1 ? (
            <motion.span
              className="font-mono text-[9px] text-dark/35 shrink-0"
              animate={go ? {opacity: [0.2, 1, 0.2]} : undefined}
              transition={{duration: 1.2, repeat: Infinity, delay: 0.2 + i * 0.25}}
            >
              →
            </motion.span>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  )
}

/** Book now on site + Google. */
function BookingSurfacesStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full h-[72px] border border-dark/12 bg-cream px-3 py-2 flex gap-2">
      {[
        {label: 'Your site', cta: 'Book now'},
        {label: 'Google', cta: 'Book now'},
      ].map((surface, i) => (
        <motion.div
          key={surface.label}
          className="flex-1 border px-2 py-1.5 flex flex-col justify-between"
          style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: '#fff'}}
          initial={reduce ? false : {opacity: 0, y: 8}}
          animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.4, y: 8}}
          transition={{duration: 0.4, delay: reduce ? 0 : i * 0.2}}
        >
          <p className="font-mono text-[7px] uppercase tracking-widest text-dark/40">{surface.label}</p>
          <motion.span
            className="self-start font-mono text-[8px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5"
            style={{backgroundColor: FUNNEL_COLOURS.accent, color: FUNNEL_COLOURS.onInk}}
            animate={go ? {opacity: [0.75, 1, 0.75]} : undefined}
            transition={{duration: 1.6, repeat: Infinity, delay: i * 0.2}}
          >
            {surface.cta}
          </motion.span>
        </motion.div>
      ))}
    </div>
  )
}

const BOOKING_STACK_VISUALS = [
  BookingToolStackVisual,
  BookingRemindersStackVisual,
  BookingSurfacesStackVisual,
  SnapshotStackVisual,
  AftercareStackVisual,
]

/** Brochure: one live page with the inclusions from the copy. */
function BrochureStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const bits = ['Who you are', 'Hours', 'Map', 'Form → email']
  return (
    <div
      className="w-full min-h-[96px] overflow-hidden"
      style={{
        border: `1px solid ${FUNNEL_COLOURS.ink}18`,
        backgroundColor: '#fff',
        boxShadow: `0 12px 28px -20px ${FUNNEL_COLOURS.ink}50`,
      }}
    >
      <div
        className="flex items-center gap-1.5 px-2.5 h-7 border-b"
        style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: FUNNEL_COLOURS.ground}}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: '#D4726A'}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: FUNNEL_COLOURS.gold}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.ink}35`}} />
        <span
          className="ml-1 font-mono text-[8px] uppercase tracking-[0.14em] truncate"
          style={{color: FUNNEL_COLOURS.steel}}
        >
          yoursite.com.au · 1 page
        </span>
      </div>
      <div className="p-2.5 space-y-2" style={{backgroundColor: '#fff'}}>
        <div className="flex items-center justify-between gap-2">
          <p className="font-serif text-[13px] font-bold" style={{color: FUNNEL_COLOURS.ink}}>
            Brochure
          </p>
          <motion.span
            className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] px-1.5 py-0.5"
            style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
            animate={go ? {opacity: [0.85, 1, 0.85]} : undefined}
            transition={{duration: 1.8, repeat: Infinity}}
          >
            One page
          </motion.span>
        </div>
        <div className="flex flex-wrap gap-1">
          {bits.map((label, i) => (
            <motion.span
              key={label}
              className="font-mono text-[8px] uppercase tracking-[0.1em] px-1.5 py-1"
              style={{
                color: FUNNEL_COLOURS.ink,
                backgroundColor: FUNNEL_COLOURS.ground,
                border: `1px solid ${FUNNEL_COLOURS.ink}18`,
              }}
              initial={reduce ? false : {opacity: 0, y: 4}}
              animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0, y: 4}}
              transition={{duration: 0.3, delay: reduce ? 0 : 0.12 + i * 0.1}}
            >
              {label}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Practice: named pages filling a 5–7 page map. */
function PracticeStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const pages = ['Home', 'Services', 'About', 'Proof', 'Contact', 'FAQ', 'More']
  return (
    <div
      className="w-full min-h-[96px] overflow-hidden"
      style={{
        border: `1px solid ${FUNNEL_COLOURS.goldDeep}45`,
        backgroundColor: '#fff',
        boxShadow: `0 12px 28px -20px ${FUNNEL_COLOURS.ink}50`,
      }}
    >
      <div
        className="flex items-center justify-between px-2.5 h-7 border-b"
        style={{
          borderColor: `${FUNNEL_COLOURS.goldDeep}30`,
          backgroundColor: FUNNEL_COLOURS.surfaceGold,
        }}
      >
        <span
          className="font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.ink}}
        >
          Practice · sweet spot
        </span>
        <span
          className="font-mono text-[8px] font-bold uppercase tracking-[0.12em]"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          5–7 pages
        </span>
      </div>
      <div className="p-2.5 grid grid-cols-4 gap-1.5" style={{backgroundColor: '#fff'}}>
        {pages.map((page, i) => (
          <motion.div
            key={page}
            className="h-7 flex items-center justify-center font-mono text-[8px] font-bold uppercase tracking-[0.08em]"
            style={{
              border: `1px solid ${i < 5 ? `${FUNNEL_COLOURS.goldDeep}40` : `${FUNNEL_COLOURS.ink}20`}`,
              backgroundColor: i < 5 ? FUNNEL_COLOURS.ground : '#fff',
              color: FUNNEL_COLOURS.ink,
            }}
            initial={reduce ? false : {opacity: 0, scale: 0.92}}
            animate={go || reduce ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.92}}
            transition={{duration: 0.28, delay: reduce ? 0 : 0.08 + i * 0.07}}
          >
            {page}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Full site: denser sitemap for 9–12 pages. */
function FullSiteStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const pages = [
    'Home',
    'Service 1',
    'Service 2',
    'Service 3',
    'About',
    'Team',
    'Cases',
    'FAQ',
    'Areas',
    'Blog',
    'Contact',
    'Legal',
  ]
  return (
    <div
      className="w-full min-h-[96px] overflow-hidden"
      style={{
        border: `1px solid ${FUNNEL_COLOURS.ink}18`,
        backgroundColor: '#fff',
        boxShadow: `0 12px 28px -20px ${FUNNEL_COLOURS.ink}50`,
      }}
    >
      <div
        className="flex items-center justify-between px-2.5 h-7 border-b"
        style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: FUNNEL_COLOURS.ground}}
      >
        <span
          className="font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.ink}}
        >
          Full site
        </span>
        <motion.span
          className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5"
          style={{backgroundColor: FUNNEL_COLOURS.accent, color: FUNNEL_COLOURS.onInk}}
          animate={go ? {opacity: [0.85, 1, 0.85]} : undefined}
          transition={{duration: 1.8, repeat: Infinity}}
        >
          9–12 pages
        </motion.span>
      </div>
      <div className="p-2.5 grid grid-cols-4 gap-1.5" style={{backgroundColor: '#fff'}}>
        {pages.map((page, i) => (
          <motion.div
            key={page}
            className="h-5 flex items-center justify-center font-mono text-[7px] font-bold uppercase tracking-[0.06em]"
            style={{
              border: `1px solid ${FUNNEL_COLOURS.ink}18`,
              backgroundColor: FUNNEL_COLOURS.ground,
              color: FUNNEL_COLOURS.ink,
            }}
            initial={reduce ? false : {opacity: 0}}
            animate={go || reduce ? {opacity: 1} : {opacity: 0}}
            transition={{duration: 0.25, delay: reduce ? 0 : 0.05 + i * 0.05}}
          >
            {page}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** What else later: next doors stay available, not pushed on day one. */
function LaterUpsellStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const items = [
    {label: 'Booking', state: 'Later'},
    {label: 'Follow-up', state: 'Later'},
    {label: 'Reviews', state: 'Later'},
    {label: 'Content', state: 'Later'},
  ]
  return (
    <div
      className="w-full min-h-[96px] overflow-hidden"
      style={{
        border: `1px solid ${FUNNEL_COLOURS.ink}18`,
        backgroundColor: '#fff',
        boxShadow: `0 12px 28px -20px ${FUNNEL_COLOURS.ink}50`,
      }}
    >
      <div
        className="flex items-center justify-between px-2.5 h-7 border-b"
        style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: FUNNEL_COLOURS.ground}}
      >
        <span
          className="font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.ink}}
        >
          Not day one
        </span>
        <motion.span
          className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5"
          style={{
            color: FUNNEL_COLOURS.ink,
            backgroundColor: `${FUNNEL_COLOURS.goldDeep}28`,
            border: `1px solid ${FUNNEL_COLOURS.goldDeep}45`,
          }}
          animate={go ? {opacity: [0.8, 1, 0.8]} : undefined}
          transition={{duration: 2, repeat: Infinity}}
        >
          Ask when ready
        </motion.span>
      </div>
      <div className="p-2.5 grid grid-cols-2 gap-1.5" style={{backgroundColor: '#fff'}}>
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            className="px-2 py-2 flex items-center justify-between gap-1"
            style={{
              border: `1px dashed ${FUNNEL_COLOURS.ink}28`,
              backgroundColor: FUNNEL_COLOURS.ground,
            }}
            initial={reduce ? false : {opacity: 0, y: 6}}
            animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0, y: 6}}
            transition={{duration: 0.3, delay: reduce ? 0 : 0.1 + i * 0.08}}
          >
            <span className="font-sans text-[11px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              {item.label}
            </span>
            <span
              className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] px-1 py-0.5"
              style={{
                color: FUNNEL_COLOURS.steel,
                backgroundColor: '#fff',
                border: `1px solid ${FUNNEL_COLOURS.ink}18`,
              }}
            >
              {item.state}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const WEBSITE_STACK_VISUALS: Array<(p: VisualProps) => React.ReactElement> = [
  BrochureStackVisual,
  PracticeStackVisual,
  FullSiteStackVisual,
  LaterUpsellStackVisual,
]

/** CRM: full lead-handling rescue — enquiry path lights up. */
function CrmRescuePathVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const steps = ['In', 'Alert', 'Reply', 'Chase']
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex flex-col justify-center overflow-hidden">
      <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40 mb-2 text-center">
        Lead path
      </p>
      <div className="flex items-center justify-center gap-1">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <motion.span
              className="font-mono text-[8px] uppercase tracking-wider px-2 py-1 border"
              initial={{opacity: 0.35, borderColor: 'rgba(26,26,26,0.15)', backgroundColor: '#fff', scale: 0.92}}
              animate={
                go
                  ? {
                      opacity: 1,
                      borderColor: FUNNEL_COLOURS.accent,
                      backgroundColor: `${FUNNEL_COLOURS.accent}18`,
                      scale: [1, 1.06, 1],
                    }
                  : undefined
              }
              transition={{
                delay: i * 0.18,
                duration: 0.35,
                scale: {delay: 0.5 + i * 0.18, duration: 1.2, repeat: Infinity},
              }}
            >
              {s}
            </motion.span>
            {i < steps.length - 1 && (
              <motion.span
                className="font-mono text-[9px] text-dark/25"
                animate={go ? {opacity: [0.15, 1, 0.15], x: [0, 2, 0]} : undefined}
                transition={{delay: 0.12 + i * 0.18, duration: 0.9, repeat: Infinity}}
              >
                →
              </motion.span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

/** CRM: missed-call included badge. */
function CrmMissedCallIncludedVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center justify-center gap-3 overflow-hidden">
      <motion.div
        className="h-10 w-10 rounded-sm border flex items-center justify-center shrink-0"
        style={{borderColor: FUNNEL_COLOURS.accent, color: FUNNEL_COLOURS.accent}}
        animate={
          go
            ? {
                scale: [1, 1.1, 1],
                rotate: [0, -4, 4, 0],
              }
            : undefined
        }
        transition={{duration: 1.3, repeat: Infinity}}
      >
        <span className="font-mono text-[9px] font-bold uppercase tracking-wide">MC</span>
      </motion.div>
      <div className="min-w-0">
        <p className="font-mono text-[8px] uppercase tracking-widest text-dark/45">Included</p>
        <motion.p
          className="font-sans text-[12px] text-dark/80"
          initial={{opacity: 0, x: 8}}
          animate={go ? {opacity: 1, x: 0} : {opacity: 1}}
          transition={{delay: reduce ? 0 : 0.2, type: 'spring', stiffness: 340}}
        >
          Missed-call text-back
        </motion.p>
      </div>
    </div>
  )
}

/** CRM: alerts + reply + quote follow-up. */
function CrmTripleWireVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const rows = ['Phone alert', 'Instant reply', 'Quote chase']
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 space-y-1.5 overflow-hidden">
      {rows.map((label, i) => (
        <motion.div
          key={label}
          className="flex items-center justify-between border px-2 py-1"
          initial={{opacity: 0.3, x: -8, borderColor: 'rgba(26,26,26,0.12)'}}
          animate={
            go
              ? {
                  opacity: 1,
                  x: 0,
                  borderColor: FUNNEL_COLOURS.accent,
                  backgroundColor: `${FUNNEL_COLOURS.accent}12`,
                }
              : undefined
          }
          transition={{delay: i * 0.22, type: 'spring', stiffness: 360, damping: 20}}
        >
          <span className="font-sans text-[11px] text-dark/75">{label}</span>
          <motion.span
            className="font-mono text-[7px] font-bold uppercase tracking-wide"
            style={{color: FUNNEL_COLOURS.accent}}
            animate={go ? {opacity: [0.45, 1, 0.45], scale: [1, 1.12, 1]} : undefined}
            transition={{duration: 1.1, repeat: Infinity, delay: 0.4 + i * 0.22}}
          >
            On
          </motion.span>
        </motion.div>
      ))}
    </div>
  )
}

/** CRM: 30-minute walkthrough. */
function CrmWalkthroughVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center gap-3 overflow-hidden">
      <motion.div
        className="font-serif text-3xl font-bold tabular-nums leading-none"
        style={{color: FUNNEL_COLOURS.accent}}
        animate={go ? {scale: [1, 1.12, 1], rotate: [0, -2, 2, 0]} : undefined}
        transition={{duration: 1.25, repeat: Infinity}}
      >
        30
      </motion.div>
      <div className="min-w-0">
        <p className="font-mono text-[8px] uppercase tracking-widest text-dark/45">Minute walkthrough</p>
        <p className="font-sans text-[11px] text-dark/70 mt-0.5">On their own screens · no manual</p>
      </div>
    </div>
  )
}

const CRM_STACK_VISUALS = [
  CrmRescuePathVisual,
  CrmMissedCallIncludedVisual,
  CrmTripleWireVisual,
  CrmWalkthroughVisual,
  SnapshotStackVisual,
  AftercareStampVisual,
]

/** Enquiry Reply: channel scope, form and email in the fixed price. */
function EnquiryChannelScopeStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const channels = ['Website form', 'Email']
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 space-y-1.5 overflow-hidden">
      {channels.map((label, i) => (
        <motion.div
          key={label}
          className="flex items-center justify-between border px-2 py-1"
          initial={{opacity: 0.3, x: -8, borderColor: 'rgba(26,26,26,0.12)'}}
          animate={
            go
              ? {
                  opacity: 1,
                  x: 0,
                  borderColor: FUNNEL_COLOURS.accent,
                  backgroundColor: `${FUNNEL_COLOURS.accent}12`,
                }
              : undefined
          }
          transition={{delay: i * 0.22, type: 'spring', stiffness: 360, damping: 20}}
        >
          <span className="font-sans text-[11px] text-dark/75">{label}</span>
          <motion.span
            className="font-mono text-[7px] font-bold uppercase tracking-wide"
            style={{color: FUNNEL_COLOURS.accent}}
            animate={go ? {opacity: [0.45, 1, 0.45], scale: [1, 1.12, 1]} : undefined}
            transition={{duration: 1.1, repeat: Infinity, delay: 0.4 + i * 0.22}}
          >
            In scope
          </motion.span>
        </motion.div>
      ))}
    </div>
  )
}

/** Enquiry Reply: open hours and after hours templates ready. */
function EnquiryAckTemplatesStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const rows = ['Open hours', 'After hours']
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex flex-col justify-center gap-1.5 overflow-hidden">
      {rows.map((label, i) => (
        <motion.div
          key={label}
          className="flex items-center justify-between border px-2 py-1.5"
          initial={{opacity: 0.35}}
          animate={
            go
              ? {
                  opacity: 1,
                  borderColor: FUNNEL_COLOURS.accent,
                  backgroundColor: `${FUNNEL_COLOURS.accent}12`,
                }
              : undefined
          }
          transition={{delay: i * 0.22, duration: 0.3}}
        >
          <span className="font-sans text-[12px] text-dark/80">{label}</span>
          <motion.span
            className="font-mono text-[7px] font-bold uppercase tracking-wide"
            style={{color: FUNNEL_COLOURS.accent}}
            animate={go ? {opacity: [0.4, 1, 0.4]} : undefined}
            transition={{duration: 1.1, repeat: Infinity, delay: 0.35 + i * 0.2}}
          >
            Ready
          </motion.span>
        </motion.div>
      ))}
    </div>
  )
}

/** Enquiry Reply: routing option lights up against the alternatives. */
function EnquiryRoutingStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const options = [
    {label: 'Email', ok: true},
    {label: 'SMS alert', ok: false},
    {label: 'CRM field', ok: false},
  ]
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center gap-1.5 overflow-hidden">
      {options.map((opt, i) => (
        <motion.div
          key={opt.label}
          className="flex-1 min-w-0 rounded-sm border px-1.5 py-2 text-center"
          style={{
            borderColor: opt.ok ? FUNNEL_COLOURS.accent : 'rgba(26,26,26,0.15)',
            backgroundColor: opt.ok ? `${FUNNEL_COLOURS.accent}14` : '#fff',
          }}
          initial={reduce ? false : {opacity: 0.4, y: 8}}
          animate={go ? {opacity: opt.ok ? 1 : 0.45, y: 0} : {opacity: opt.ok ? 1 : 0.45, y: 0}}
          transition={{delay: reduce ? 0 : i * 0.14, duration: 0.35}}
        >
          <p className="font-mono text-[8px] uppercase tracking-wide text-dark/60 leading-tight">
            {opt.label}
          </p>
          {opt.ok ? (
            <motion.p
              className="mt-1 font-mono text-[7px] font-bold uppercase tracking-wide"
              style={{color: FUNNEL_COLOURS.accent}}
              animate={go ? {opacity: [0.5, 1, 0.5]} : undefined}
              transition={{duration: 1.1, repeat: Infinity}}
            >
              Matched
            </motion.p>
          ) : null}
        </motion.div>
      ))}
    </div>
  )
}

/** Enquiry Reply: test checklist ticking through. */
function EnquiryTestPackStackVisual({reduce, play}: VisualProps) {
  const rows = ['Form fires', 'Ack arrives', 'Routed', 'Alert lands']
  return (
    <div className="w-full h-[72px] border border-dark/20 bg-white px-3 py-2 flex flex-col justify-center gap-1">
      <div className="flex gap-1.5">
        {rows.map((label, i) => (
          <motion.div
            key={label}
            className="flex-1 border px-1 py-1 text-center bg-cream"
            style={{borderColor: 'rgba(26,26,26,0.18)'}}
            initial={{opacity: 0.35}}
            animate={{
              opacity: play || reduce ? 1 : 0.35,
              borderColor:
                play || reduce ? 'rgba(168,132,63,0.85)' : 'rgba(26,26,26,0.18)',
              backgroundColor:
                play || reduce ? 'rgba(197,160,89,0.22)' : '#FFF2EC',
            }}
            transition={
              reduce ? {duration: 0} : {delay: play ? i * 0.18 : 0, duration: 0.3}
            }
          >
            <p className="font-mono text-[7px] uppercase tracking-wider text-dark/60">{label}</p>
            <motion.p
              className="font-mono text-[9px] font-bold text-gold-on-cream"
              initial={{opacity: 0}}
              animate={{opacity: play || reduce ? 1 : 0}}
              transition={{delay: play ? 0.2 + i * 0.18 : 0}}
            >
              ✓
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const ENQUIRY_REPLY_STACK_VISUALS = [
  EnquiryChannelScopeStackVisual,
  EnquiryAckTemplatesStackVisual,
  EnquiryRoutingStackVisual,
  EnquiryTestPackStackVisual,
]

/** Profile Posting: a real week with 3 spaced post days. */
function PostingCadenceStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  const days = [
    {label: 'M', post: true},
    {label: 'T', post: false},
    {label: 'W', post: true},
    {label: 'T', post: false},
    {label: 'F', post: true},
    {label: 'S', post: false},
    {label: 'S', post: false},
  ]
  return (
    <div className="w-full min-h-[88px] border border-dark/12 bg-white px-3 py-2.5 flex flex-col justify-center gap-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40">Your week</span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
          3 posts
        </span>
      </div>
      <div className="flex items-end gap-1 h-9">
        {days.map((d, i) => (
          <div key={`${d.label}-${i}`} className="flex-1 flex flex-col items-center gap-1 min-w-0">
            <motion.div
              className="w-full rounded-[2px]"
              style={{
                height: d.post ? '100%' : '22%',
                backgroundColor: d.post ? colors.teal : `${FUNNEL_COLOURS.ink}10`,
              }}
              initial={reduce || !d.post ? false : {scaleY: 0.25, opacity: 0.4}}
              animate={go && d.post ? {scaleY: 1, opacity: 1} : d.post ? {opacity: 1, scaleY: 1} : undefined}
              transition={{delay: reduce ? 0 : i * 0.07, type: 'spring', stiffness: 380, damping: 20}}
            />
            <span className="font-mono text-[6px] uppercase tracking-wide text-dark/40">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Profile Posting: named template cards for Offer / Proof / FAQ / Season. */
function TemplateSetStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  const templates = [
    {label: 'Offer', w: ['85%', '40%']},
    {label: 'Proof', w: ['70%', '55%']},
    {label: 'FAQ', w: ['55%', '75%']},
    {label: 'Season', w: ['80%', '35%']},
  ]
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-2.5 py-2.5 flex flex-col gap-1.5">
      <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40 px-0.5">
        Template set
      </span>
      <div className="grid grid-cols-4 gap-1.5 flex-1">
        {templates.map((t, i) => (
          <motion.div
            key={t.label}
            className="rounded-sm border flex flex-col px-1.5 py-1.5 min-h-[58px]"
            style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: '#fff'}}
            initial={reduce ? false : {opacity: 0.45, y: 6}}
            animate={
              go
                ? {
                    opacity: 1,
                    y: 0,
                    borderColor: `${FUNNEL_COLOURS.accent}80`,
                    backgroundColor: `${FUNNEL_COLOURS.accent}14`,
                  }
                : {opacity: 1, y: 0}
            }
            transition={{delay: reduce ? 0 : i * 0.1, duration: 0.35}}
          >
            <span className="font-mono text-[6px] font-bold uppercase tracking-wide text-dark/55 mb-1">
              {t.label}
            </span>
            <div className="mt-auto space-y-1">
              {t.w.map((width, bi) => (
                <div
                  key={bi}
                  className="h-1 rounded-sm"
                  style={{width, backgroundColor: `${FUNNEL_COLOURS.ink}20`}}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Profile Posting: weeks of posts already written and ready. */
function StarterBankStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40">Starter bank</span>
        <motion.span
          className="font-mono text-[7px] font-bold uppercase tracking-wide"
          style={{color: colors.teal}}
          animate={go ? {opacity: 1} : {opacity: 0.7}}
        >
          Ready
        </motion.span>
      </div>
      <div className="space-y-1 flex-1">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 rounded-sm border px-2 py-1"
            style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: '#fff'}}
            initial={reduce ? false : {opacity: 0.4, x: 10}}
            animate={
              go
                ? {
                    opacity: 1,
                    x: 0,
                    borderColor: colors.teal,
                    backgroundColor: `${colors.teal}12`,
                  }
                : {opacity: 1, x: 0}
            }
            transition={{delay: reduce ? 0 : i * 0.09, type: 'spring', stiffness: 360, damping: 20}}
          >
            <span className="font-mono text-[7px] font-bold tabular-nums shrink-0" style={{color: colors.teal}}>
              W{i + 1}
            </span>
            <div className="flex-1 h-1 rounded-sm" style={{backgroundColor: `${colors.teal}35`}} />
            <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{backgroundColor: colors.teal}} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Profile Posting: handover notes = keep the rhythm yourself, care is optional. */
function HandoverNotesStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  const notes = [
    {label: 'Keep the rhythm', tone: 'you'},
    {label: 'How to publish', tone: 'you'},
    {label: 'Care month later', tone: 'optional'},
  ]
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-1.5">
      <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40">Handover notes</span>
      <div className="space-y-1 flex-1">
        {notes.map((n, i) => {
          const optional = n.tone === 'optional'
          return (
            <motion.div
              key={n.label}
              className="flex items-center gap-2 rounded-sm border px-2 py-1.5"
              style={{
                borderColor: optional ? `${FUNNEL_COLOURS.gold}70` : `${FUNNEL_COLOURS.ink}12`,
                borderStyle: optional ? 'dashed' : 'solid',
                backgroundColor: '#fff',
              }}
              initial={reduce ? false : {opacity: 0.35, x: 8}}
              animate={
                go
                  ? {
                      opacity: 1,
                      x: 0,
                      backgroundColor: optional ? `${FUNNEL_COLOURS.gold}10` : `${colors.teal}12`,
                      borderColor: optional ? `${FUNNEL_COLOURS.gold}80` : colors.teal,
                    }
                  : {opacity: 1, x: 0}
              }
              transition={{delay: reduce ? 0 : 0.08 + i * 0.12, duration: 0.35}}
            >
              <span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{
                  backgroundColor: optional ? 'transparent' : colors.teal,
                  border: optional ? `1.5px dashed ${FUNNEL_COLOURS.gold}` : 'none',
                }}
              />
              <span className="font-mono text-[8px] uppercase tracking-wide text-dark/60">{n.label}</span>
              {optional ? (
                <span className="ml-auto font-mono text-[6px] uppercase tracking-wide text-dark/35">
                  Optional
                </span>
              ) : null}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

const PROFILE_POSTING_STACK_VISUALS = [
  PostingCadenceStackVisual,
  TemplateSetStackVisual,
  StarterBankStackVisual,
  HandoverNotesStackVisual,
]

/** Local Pack: profile fix items ticking clean. */
function LocalPackProfileFixStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  const rows = ['Claim / recover', 'Categories', 'Photos', 'Review link']
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-1.5">
      <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40">Profile Fix</span>
      <div className="space-y-1 flex-1">
        {rows.map((label, i) => (
          <motion.div
            key={label}
            className="flex items-center gap-2 rounded-sm border px-2 py-1"
            style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: '#fff'}}
            initial={reduce ? false : {opacity: 0.35, x: 8}}
            animate={
              go
                ? {opacity: 1, x: 0, borderColor: colors.teal, backgroundColor: `${colors.teal}12`}
                : {opacity: 1, x: 0}
            }
            transition={{delay: reduce ? 0 : i * 0.1, type: 'spring', stiffness: 360, damping: 22}}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full shrink-0"
              style={{backgroundColor: colors.teal}}
              initial={reduce ? false : {scale: 0}}
              animate={go ? {scale: 1} : {scale: 1}}
              transition={{delay: reduce ? 0 : 0.15 + i * 0.1}}
            />
            <span className="font-mono text-[8px] uppercase tracking-wide text-dark/60">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Local Pack: review ask automation firing after a job. */
function LocalPackReviewEngineStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
      <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40">Review Engine</span>
      <div className="flex-1 flex items-center gap-2.5">
        <motion.div
          className="rounded-sm border px-2 py-1.5 flex flex-col items-center gap-0.5 shrink-0"
          style={{borderColor: `${FUNNEL_COLOURS.ink}12`}}
          initial={reduce ? false : {opacity: 0.5}}
          animate={go ? {opacity: 1} : {opacity: 1}}
        >
          <span className="font-mono text-[6px] uppercase tracking-wide text-dark/40">Job done</span>
        </motion.div>
        <motion.span
          className="font-mono text-[8px] shrink-0"
          style={{color: colors.teal}}
          animate={go ? {x: [0, 3, 0]} : undefined}
          transition={{duration: 1.1, repeat: Infinity}}
        >
          →
        </motion.span>
        <motion.div
          className="rounded-sm border px-2 py-1.5 flex-1 flex flex-col items-center gap-0.5"
          style={{borderColor: colors.teal, backgroundColor: `${colors.teal}12`}}
          initial={reduce ? false : {opacity: 0.4, scale: 0.94}}
          animate={go ? {opacity: 1, scale: 1} : {opacity: 1, scale: 1}}
          transition={{delay: reduce ? 0 : 0.3, type: 'spring', stiffness: 340, damping: 20}}
        >
          <span className="font-mono text-[6px] uppercase tracking-wide" style={{color: colors.teal}}>
            Ask sent
          </span>
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                className="text-[9px] leading-none"
                style={{color: colors.teal}}
                initial={reduce ? false : {opacity: 0.15}}
                animate={go ? {opacity: 1} : {opacity: 1}}
                transition={{delay: reduce ? 0 : 0.5 + i * 0.08}}
              >
                ★
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/** Local Pack: posting cadence with a starter bank waiting to publish. */
function LocalPackPostingStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40">Posting cadence</span>
        <motion.span
          className="font-mono text-[7px] font-bold uppercase tracking-wide"
          style={{color: colors.teal}}
          animate={go ? {opacity: 1} : {opacity: 0.7}}
        >
          Bank ready
        </motion.span>
      </div>
      <div className="space-y-1 flex-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 rounded-sm border px-2 py-1"
            style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: '#fff'}}
            initial={reduce ? false : {opacity: 0.35, x: 10}}
            animate={
              go
                ? {opacity: 1, x: 0, borderColor: colors.teal, backgroundColor: `${colors.teal}12`}
                : {opacity: 1, x: 0}
            }
            transition={{delay: reduce ? 0 : i * 0.1, type: 'spring', stiffness: 360, damping: 20}}
          >
            <span className="font-mono text-[7px] font-bold tabular-nums shrink-0" style={{color: colors.teal}}>
              W{i + 1}
            </span>
            <div className="flex-1 h-1 rounded-sm" style={{backgroundColor: `${colors.teal}35`}} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Local Pack: monthly checklist so profile, asks, and posts do not rot. */
function LocalPackChecklistStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  const items = ['Profile still clean', 'Asks still firing', 'Bank still fresh']
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-1.5">
      <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40">Monthly check</span>
      <div className="space-y-1 flex-1">
        {items.map((label, i) => (
          <motion.div
            key={label}
            className="flex items-center gap-2 rounded-sm border px-2 py-1"
            style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: '#fff'}}
            initial={reduce ? false : {opacity: 0.35, y: 6}}
            animate={
              go
                ? {opacity: 1, y: 0, borderColor: colors.teal, backgroundColor: `${colors.teal}12`}
                : {opacity: 1, y: 0}
            }
            transition={{delay: reduce ? 0 : 0.12 + i * 0.12, duration: 0.35}}
          >
            <motion.span
              className="font-mono text-[8px]"
              style={{color: colors.teal}}
              initial={reduce ? false : {opacity: 0}}
              animate={go ? {opacity: 1} : {opacity: 1}}
              transition={{delay: reduce ? 0 : 0.3 + i * 0.12}}
            >
              ✓
            </motion.span>
            <span className="font-mono text-[8px] uppercase tracking-wide text-dark/60">{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const LOCAL_PACK_STACK_VISUALS = [
  LocalPackProfileFixStackVisual,
  LocalPackReviewEngineStackVisual,
  LocalPackPostingStackVisual,
  LocalPackChecklistStackVisual,
]

/** Conversion Pass: the headline resolves into a single clear ask. */
function ConversionHomeClearStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
      <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40">Homepage</span>
      <div className="flex-1 flex flex-col justify-center gap-2">
        <motion.div
          className="h-2 rounded-sm"
          style={{backgroundColor: colors.teal}}
          initial={reduce ? false : {width: '45%', opacity: 0.4}}
          animate={go ? {width: '80%', opacity: 1} : {width: '45%', opacity: 0.4}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
        />
        <motion.div
          className="self-start rounded-sm px-2.5 py-1"
          style={{backgroundColor: colors.teal}}
          initial={reduce ? false : {opacity: 0, scale: 0.85}}
          animate={go ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.85}}
          transition={{delay: reduce ? 0 : 0.25, type: 'spring', stiffness: 340, damping: 22}}
        >
          <span className="font-mono text-[7px] font-bold uppercase tracking-wide text-white">Enquire</span>
        </motion.div>
      </div>
    </div>
  )
}

/** Conversion Pass: contact reachable from every page, one step. */
function ConversionContactObviousStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  const pages = ['Home', 'Services', 'About']
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-1.5">
      <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40">Every page</span>
      <div className="space-y-1 flex-1">
        {pages.map((page, i) => (
          <motion.div
            key={page}
            className="flex items-center justify-between rounded-sm border px-2 py-1"
            style={{borderColor: `${colors.teal}30`, backgroundColor: '#fff'}}
            initial={reduce ? false : {opacity: 0.35, x: 8}}
            animate={go ? {opacity: 1, x: 0} : {opacity: 0.35, x: 8}}
            transition={{delay: reduce ? 0 : i * 0.1, type: 'spring', stiffness: 360, damping: 22}}
          >
            <span className="font-mono text-[7px] uppercase tracking-wide text-dark/55">{page}</span>
            <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
              Contact
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Conversion Pass: services stop reading like the same page twice. */
function ConversionServicesSpecificStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  const services = [
    {label: 'Plumbing', detail: 'Hot water · leaks'},
    {label: 'Electrical', detail: 'Switchboards · wiring'},
  ]
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-1.5">
      <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40">Service pages</span>
      <div className="space-y-1.5 flex-1">
        {services.map((s, i) => (
          <motion.div
            key={s.label}
            className="rounded-sm border px-2 py-1"
            style={{borderColor: `${colors.teal}30`, backgroundColor: `${colors.teal}0C`}}
            initial={reduce ? false : {opacity: 0.35, y: 6}}
            animate={go ? {opacity: 1, y: 0} : {opacity: 0.35, y: 6}}
            transition={{delay: reduce ? 0 : i * 0.14, duration: 0.35}}
          >
            <p className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
              {s.label}
            </p>
            <p className="font-mono text-[6px] uppercase tracking-wide text-dark/45">{s.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Conversion Pass: checked on a real phone before it ships. */
function ConversionMobileCheckedStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 flex items-center gap-3">
      <div className="h-[62px] w-9 shrink-0 rounded-md border-2 border-dark/20 flex flex-col gap-1 p-1.5">
        <div className="h-1 w-full rounded-sm bg-dark/10" />
        <div className="h-1 w-3/4 rounded-sm bg-dark/10" />
        <motion.div
          className="mt-auto h-2 rounded-sm"
          style={{backgroundColor: colors.teal, transformOrigin: 'left'}}
          initial={reduce ? false : {opacity: 0.4, scaleX: 0.5}}
          animate={go ? {opacity: 1, scaleX: 1} : {opacity: 0.4, scaleX: 0.5}}
          transition={{delay: reduce ? 0 : 0.2, duration: 0.4}}
        />
      </div>
      <motion.span
        className="font-mono text-[8px] font-bold uppercase tracking-wide"
        style={{color: colors.teal}}
        initial={reduce ? false : {opacity: 0}}
        animate={go ? {opacity: 1} : {opacity: 0}}
        transition={{delay: reduce ? 0 : 0.4}}
      >
        Checked on mobile
      </motion.span>
    </div>
  )
}

const CONVERSION_PASS_STACK_VISUALS = [
  ConversionHomeClearStackVisual,
  ConversionContactObviousStackVisual,
  ConversionServicesSpecificStackVisual,
  ConversionMobileCheckedStackVisual,
]

/** On-Page Search Pack: a vague title and H1 resolve into clear, specific lines. */
function OnpageTitleClearStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
      <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40">Priority page</span>
      <div className="flex-1 flex flex-col justify-center gap-2">
        <motion.div
          className="h-2 rounded-sm"
          style={{backgroundColor: colors.teal}}
          initial={reduce ? false : {width: '38%', opacity: 0.4}}
          animate={go ? {width: '82%', opacity: 1} : {width: '38%', opacity: 0.4}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
        />
        <motion.div
          className="h-1.5 rounded-sm"
          style={{backgroundColor: `${colors.teal}50`}}
          initial={reduce ? false : {width: '30%', opacity: 0.3}}
          animate={go ? {width: '55%', opacity: 0.8} : {width: '30%', opacity: 0.3}}
          transition={{duration: 0.4, delay: reduce ? 0 : 0.15, ease: [0.16, 1, 0.3, 1]}}
        />
      </div>
    </div>
  )
}

/** On-Page Search Pack: a fixed, locked list of priority URLs, not an open-ended one. */
function OnpagePriorityListStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  const urls = ['/services/renovations', '/services/repairs', '/contact']
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-1.5">
      <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40">Priority URLs</span>
      <div className="space-y-1 flex-1">
        {urls.map((url, i) => (
          <motion.div
            key={url}
            className="flex items-center justify-between rounded-sm border px-2 py-1"
            style={{borderColor: `${colors.teal}30`, backgroundColor: '#fff'}}
            initial={reduce ? false : {opacity: 0.35, x: 8}}
            animate={go ? {opacity: 1, x: 0} : {opacity: 0.35, x: 8}}
            transition={{delay: reduce ? 0 : i * 0.1, type: 'spring', stiffness: 360, damping: 22}}
          >
            <span className="font-mono text-[7px] uppercase tracking-wide text-dark/55">{url}</span>
            <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
              Locked
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** On-Page Search Pack: titles and headings stay honest, not stuffed. */
function OnpageHonestNotStuffedStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40">Title tag</span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
          Honest
        </span>
      </div>
      <motion.div
        className="rounded-sm border border-dashed px-2 py-1 opacity-35"
        style={{borderColor: `${FUNNEL_COLOURS.ink}28`}}
        initial={reduce ? false : {opacity: 0.5}}
        animate={go ? {opacity: 0.25} : {opacity: 0.35}}
      >
        <p className="font-mono text-[6px] uppercase tracking-wide text-dark/40 line-through">
          keyword · keyword · keyword
        </p>
      </motion.div>
      <motion.div
        className="rounded-sm border px-2 py-1"
        style={{borderColor: `${colors.teal}40`, backgroundColor: `${colors.teal}0C`}}
        initial={reduce ? false : {opacity: 0, y: 4}}
        animate={go ? {opacity: 1, y: 0} : {opacity: 0, y: 4}}
        transition={{delay: reduce ? 0 : 0.2}}
      >
        <p className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
          Service · suburb · you
        </p>
      </motion.div>
    </div>
  )
}

/** On-Page Search Pack: clean pages bridge straight into GEO. */
function OnpageGeoBridgeStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 flex items-center gap-3">
      <div
        className="rounded-sm border px-2.5 py-2"
        style={{borderColor: `${colors.teal}30`, backgroundColor: `${colors.teal}0C`}}
      >
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
          On-page
        </span>
      </div>
      <motion.span
        className="font-mono text-[10px]"
        style={{color: colors.teal}}
        initial={reduce ? false : {opacity: 0, x: -4}}
        animate={go ? {opacity: 1, x: 0} : {opacity: 0, x: -4}}
        transition={{delay: reduce ? 0 : 0.2}}
      >
        →
      </motion.span>
      <motion.div
        className="rounded-sm px-2.5 py-2"
        style={{backgroundColor: colors.teal}}
        initial={reduce ? false : {opacity: 0, scale: 0.85}}
        animate={go ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.85}}
        transition={{delay: reduce ? 0 : 0.4, type: 'spring', stiffness: 340, damping: 22}}
      >
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide text-white">GEO</span>
      </motion.div>
    </div>
  )
}

const ONPAGE_SEARCH_STACK_VISUALS = [
  OnpageTitleClearStackVisual,
  OnpagePriorityListStackVisual,
  OnpageHonestNotStuffedStackVisual,
  OnpageGeoBridgeStackVisual,
]

/** Schema FAQ stack: mini accordion with Q badge and answer. */
function SchemaFaqQuestionsAnsweredStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">FAQ set</span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
          Up to 8
        </span>
      </div>
      <div className="flex-1 flex items-center px-2.5 py-2">
        <motion.div
          className="w-full rounded-md border px-2 py-1.5"
          style={{borderColor: `${colors.teal}45`, backgroundColor: `${colors.teal}0A`}}
          initial={reduce ? false : {opacity: 0, y: 4}}
          animate={go ? {opacity: 1, y: 0} : {opacity: 0.4, y: 4}}
          transition={{duration: 0.35}}
        >
          <div className="flex items-center gap-1.5">
            <span
              className="h-4 w-4 rounded-full flex items-center justify-center font-mono text-[7px] font-bold shrink-0"
              style={{backgroundColor: `${colors.teal}28`, color: colors.teal}}
            >
              Q
            </span>
            <span className="font-sans text-[8px] font-semibold truncate" style={{color: FUNNEL_COLOURS.ink}}>
              Do you cover emergencies?
            </span>
          </div>
          <p className="pl-5 mt-0.5 font-sans text-[7px] leading-snug" style={{color: FUNNEL_COLOURS.steel}}>
            Yes, same day in our area.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/** Schema FAQ stack: on-page Q+A equals schema markup. */
function SchemaFaqSchemaProperStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">On-page placement</span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-1.5 px-2.5">
        <motion.div
          className="flex-1 rounded-md border px-2 py-1.5 text-center"
          style={{borderColor: `${FUNNEL_COLOURS.ink}20`, backgroundColor: '#fff'}}
          initial={reduce ? false : {opacity: 0, x: -4}}
          animate={go ? {opacity: 1, x: 0} : {opacity: 0.4}}
        >
          <p className="font-mono text-[6px] uppercase tracking-wide text-dark/45 mb-0.5">On page</p>
          <p className="font-sans text-[8px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
            FAQ block
          </p>
        </motion.div>
        <motion.span
          className="font-mono text-[9px] font-bold"
          style={{color: colors.teal}}
          initial={reduce ? false : {opacity: 0}}
          animate={go ? {opacity: 1} : {opacity: 0}}
          transition={{delay: reduce ? 0 : 0.15}}
        >
          =
        </motion.span>
        <motion.div
          className="flex-1 rounded-md px-2 py-1.5 text-center"
          style={{backgroundColor: colors.teal}}
          initial={reduce ? false : {opacity: 0, x: 4}}
          animate={go ? {opacity: 1, x: 0} : {opacity: 0.4}}
          transition={{delay: reduce ? 0 : 0.2}}
        >
          <p className="font-mono text-[6px] uppercase tracking-wide text-white/70 mb-0.5">Markup</p>
          <p className="font-mono text-[8px] font-bold text-white">Schema</p>
        </motion.div>
      </div>
    </div>
  )
}

/** Schema FAQ stack: visitor and AI both get the same answers. */
function SchemaFaqHumansToolsStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  const readers = [
    {label: 'Visitor', detail: 'Reads it'},
    {label: 'Search / AI', detail: 'Can cite it'},
  ]
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Same answers</span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-1 px-2.5 py-2">
        {readers.map((reader, i) => (
          <motion.div
            key={reader.label}
            className="flex items-center justify-between rounded-md border px-2 py-1"
            style={{borderColor: `${colors.teal}35`, backgroundColor: `${colors.teal}08`}}
            initial={reduce ? false : {opacity: 0, y: 4}}
            animate={go ? {opacity: 1, y: 0} : {opacity: 0.35}}
            transition={{delay: reduce ? 0 : i * 0.1}}
          >
            <span className="font-sans text-[8px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              {reader.label}
            </span>
            <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
              {reader.detail}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Schema FAQ stack: FAQ sits above the enquire CTA. */
function SchemaFaqNearDecisionStackVisual({reduce, play}: VisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Near the ask</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-2.5 py-2">
        <motion.div
          className="w-full rounded-sm border px-2 py-1 flex items-center gap-1.5"
          style={{borderColor: `${colors.teal}40`, backgroundColor: `${colors.teal}0C`}}
          initial={reduce ? false : {opacity: 0, y: 3}}
          animate={go ? {opacity: 1, y: 0} : {opacity: 0.4}}
        >
          <span className="font-mono text-[7px] font-bold" style={{color: colors.teal}}>
            FAQ
          </span>
          <span className="font-sans text-[8px]" style={{color: FUNNEL_COLOURS.ink}}>
            Common questions
          </span>
        </motion.div>
        <motion.div
          className="w-full rounded-sm py-1 text-center"
          style={{backgroundColor: FUNNEL_COLOURS.accent}}
          initial={reduce ? false : {opacity: 0, y: 3}}
          animate={go ? {opacity: 1, y: 0} : {opacity: 0.4}}
          transition={{delay: reduce ? 0 : 0.15}}
        >
          <span className="font-mono text-[7px] font-bold uppercase tracking-wide text-white">Enquire</span>
        </motion.div>
      </div>
    </div>
  )
}

const SCHEMA_FAQ_STACK_VISUALS = [
  SchemaFaqQuestionsAnsweredStackVisual,
  SchemaFaqSchemaProperStackVisual,
  SchemaFaqHumansToolsStackVisual,
  SchemaFaqNearDecisionStackVisual,
]

/** Team AI: half-day remote session. */
function TeamHalfDayStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center gap-3">
      <motion.div
        className="font-serif text-3xl font-bold tabular-nums leading-none"
        style={{color: FUNNEL_COLOURS.accent}}
        animate={go ? {scale: [1, 1.06, 1]} : undefined}
        transition={{duration: 1.6, repeat: Infinity}}
      >
        ½
      </motion.div>
      <div className="min-w-0">
        <p className="font-mono text-[8px] uppercase tracking-widest text-dark/45">Day · session</p>
        <p className="font-sans text-[12px] text-dark/75 mt-0.5">Up to 12 people · your real work</p>
      </div>
    </div>
  )
}

/** Team AI: company-owned workspace. */
function TeamWorkspaceStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex flex-col justify-center">
      <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40 mb-2">
        Workspace owner
      </p>
      <motion.div
        className="border px-2.5 py-2 flex items-center justify-between"
        initial={{borderColor: 'rgba(26,26,26,0.12)', backgroundColor: '#fff'}}
        animate={
          go
            ? {
                borderColor: FUNNEL_COLOURS.accent,
                backgroundColor: `${FUNNEL_COLOURS.accent}12`,
              }
            : undefined
        }
        transition={{duration: 0.35}}
      >
        <span className="font-sans text-[12px] text-dark/80">Your business account</span>
        <span
          className="font-mono text-[7px] font-bold uppercase tracking-wide"
          style={{color: FUNNEL_COLOURS.accent}}
        >
          Owned
        </span>
      </motion.div>
    </div>
  )
}

/** Team AI: library + recording + policy. */
function TeamDeliverablesStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const items = ['Prompt library', 'Session recording', 'Usage policy']
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 space-y-1.5">
      {items.map((label, i) => (
        <motion.div
          key={label}
          className="flex items-center justify-between border px-2 py-1"
          initial={{opacity: 0.35, borderColor: 'rgba(26,26,26,0.12)'}}
          animate={
            go
              ? {
                  opacity: 1,
                  borderColor: FUNNEL_COLOURS.accent,
                  backgroundColor: `${FUNNEL_COLOURS.accent}10`,
                }
              : undefined
          }
          transition={{delay: i * 0.22, duration: 0.3}}
        >
          <span className="font-sans text-[11px] text-dark/75">{label}</span>
          <span
            className="font-mono text-[7px] font-bold uppercase tracking-wide"
            style={{color: FUNNEL_COLOURS.accent}}
          >
            In
          </span>
        </motion.div>
      ))}
    </div>
  )
}

/** Team AI: 30-day check-in. */
function TeamCheckInStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center gap-3">
      <motion.div
        className="font-serif text-3xl font-bold tabular-nums leading-none"
        style={{color: FUNNEL_COLOURS.accent}}
        animate={go ? {scale: [1, 1.08, 1]} : undefined}
        transition={{duration: 1.5, repeat: Infinity}}
      >
        30
      </motion.div>
      <div className="min-w-0">
        <p className="font-mono text-[8px] uppercase tracking-widest text-dark/45">Day check-in</p>
        <p className="font-sans text-[11px] text-dark/70 mt-0.5">Tighten · fix · keep going</p>
      </div>
    </div>
  )
}

/** Change Pack: commute audio. */
function ChangeAudioStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center gap-3 overflow-hidden">
      <motion.div
        className="font-serif text-3xl font-bold tabular-nums leading-none"
        style={{color: FUNNEL_COLOURS.accent}}
        animate={go ? {scale: [1, 1.06, 1]} : undefined}
        transition={{duration: 1.6, repeat: Infinity}}
      >
        12
      </motion.div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[8px] uppercase tracking-widest text-dark/45">Min · commute audio</p>
        <p className="font-sans text-[12px] text-dark/75 mt-0.5">What is changing · why · what good looks like</p>
        <div className="mt-2 flex items-end gap-0.5 h-4">
          {[4, 8, 5, 10, 6, 9, 4, 7, 5].map((h, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-sm"
              style={{backgroundColor: FUNNEL_COLOURS.accent, height: h}}
              animate={go ? {scaleY: [0.55, 1, 0.7, 1]} : undefined}
              transition={{duration: 0.9, repeat: Infinity, delay: i * 0.07}}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/** Change Pack: screen how-tos. */
function ChangeHowToStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex flex-col justify-center overflow-hidden">
      <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40 mb-2">Screen how-to</p>
      <div className="flex gap-1.5">
        {['Log a job', 'Raise invoice', 'Close day'].map((label, i) => (
          <motion.div
            key={label}
            className="flex-1 border px-1.5 py-2"
            initial={{opacity: 0.35, borderColor: 'rgba(26,26,26,0.12)'}}
            animate={
              go
                ? {
                    opacity: 1,
                    borderColor: FUNNEL_COLOURS.accent,
                    backgroundColor: `${FUNNEL_COLOURS.accent}12`,
                  }
                : undefined
            }
            transition={{delay: i * 0.18, duration: 0.3}}
          >
            <p className="font-mono text-[8px] font-bold" style={{color: FUNNEL_COLOURS.accent}}>
              {String(i + 1).padStart(2, '0')}
            </p>
            <p className="font-mono text-[6px] uppercase tracking-wide text-dark/55 mt-0.5 leading-tight">
              {label}
            </p>
            <p className="font-mono text-[6px] uppercase tracking-wide text-dark/40 mt-1">2–4 min</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Change Pack: desk sheets. */
function ChangeDeskSheetStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const items = ['Daily steps', 'Print or PDF', 'Stays on the desk']
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 space-y-1.5 overflow-hidden">
      {items.map((label, i) => (
        <motion.div
          key={label}
          className="flex items-center justify-between border px-2 py-1"
          initial={{opacity: 0.35, borderColor: 'rgba(26,26,26,0.12)'}}
          animate={
            go
              ? {
                  opacity: 1,
                  borderColor: FUNNEL_COLOURS.accent,
                  backgroundColor: `${FUNNEL_COLOURS.accent}10`,
                }
              : undefined
          }
          transition={{delay: i * 0.22, duration: 0.3}}
        >
          <span className="font-sans text-[11px] text-dark/75">{label}</span>
          <span
            className="font-mono text-[7px] font-bold uppercase tracking-wide"
            style={{color: FUNNEL_COLOURS.accent}}
          >
            In
          </span>
        </motion.div>
      ))}
    </div>
  )
}

/** Change Pack: live Q and A after real use. */
function ChangeQaStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex flex-col justify-center overflow-hidden">
      <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40 mb-2">
        Live Q and A
      </p>
      <motion.div
        className="border px-2.5 py-2 flex items-center justify-between"
        initial={{borderColor: 'rgba(26,26,26,0.12)', backgroundColor: '#fff'}}
        animate={
          go
            ? {
                borderColor: FUNNEL_COLOURS.accent,
                backgroundColor: `${FUNNEL_COLOURS.accent}12`,
              }
            : undefined
        }
        transition={{duration: 0.35}}
      >
        <span className="font-sans text-[12px] text-dark/80">After they have tried it</span>
        <motion.span
          className="font-mono text-[7px] font-bold uppercase tracking-wide"
          style={{color: FUNNEL_COLOURS.accent}}
          animate={go ? {opacity: [0.45, 1, 0.45]} : undefined}
          transition={{duration: 1.1, repeat: Infinity}}
        >
          Booked
        </motion.span>
      </motion.div>
    </div>
  )
}

/** Change Pack: day-30 check-in. */
function ChangeDay30StackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center gap-3 overflow-hidden">
      <motion.div
        className="font-serif text-3xl font-bold tabular-nums leading-none"
        style={{color: FUNNEL_COLOURS.accent}}
        animate={go ? {scale: [1, 1.08, 1]} : undefined}
        transition={{duration: 1.5, repeat: Infinity}}
      >
        30
      </motion.div>
      <div className="min-w-0">
        <p className="font-mono text-[8px] uppercase tracking-widest text-dark/45">Day check-in</p>
        <p className="font-sans text-[11px] text-dark/70 mt-0.5">Adoption · workarounds · patch</p>
      </div>
    </div>
  )
}

const CHANGE_PACK_STACK_VISUALS = [
  ChangeAudioStackVisual,
  ChangeHowToStackVisual,
  ChangeDeskSheetStackVisual,
  ChangeQaStackVisual,
  ChangeDay30StackVisual,
  SnapshotStackVisual,
]

/** Content System: setup once. */
function ContentSetupStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center gap-3 overflow-hidden">
      <motion.div
        className="font-serif text-2xl font-bold tabular-nums leading-none"
        style={{color: FUNNEL_COLOURS.accent}}
        animate={go ? {scale: [1, 1.06, 1]} : undefined}
        transition={{duration: 1.6, repeat: Infinity}}
      >
        3.4k
      </motion.div>
      <div className="min-w-0">
        <p className="font-mono text-[8px] uppercase tracking-widest text-dark/45">Setup · once</p>
        <p className="font-sans text-[12px] text-dark/75 mt-0.5">Brand · voice · pipeline · first month</p>
      </div>
    </div>
  )
}

/** Content System: monthly run. */
function ContentMonthlyStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  const items = ['Recorded hour', 'Posts and carousels', 'You approve once']
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-2.5 space-y-1.5 overflow-hidden">
      {items.map((label, i) => (
        <motion.div
          key={label}
          className="flex items-center justify-between border px-2 py-1"
          initial={{opacity: 0.35, borderColor: 'rgba(26,26,26,0.12)'}}
          animate={
            go
              ? {
                  opacity: 1,
                  borderColor: FUNNEL_COLOURS.accent,
                  backgroundColor: `${FUNNEL_COLOURS.accent}10`,
                }
              : undefined
          }
          transition={{delay: i * 0.22, duration: 0.3}}
        >
          <span className="font-sans text-[11px] text-dark/75">{label}</span>
          <span
            className="font-mono text-[7px] font-bold uppercase tracking-wide"
            style={{color: FUNNEL_COLOURS.accent}}
          >
            In
          </span>
        </motion.div>
      ))}
    </div>
  )
}

/** Content System: monthly report. */
function ContentReportStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex flex-col justify-center overflow-hidden">
      <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40 mb-2">
        Monthly report
      </p>
      <motion.div
        className="border px-2.5 py-2 flex items-center justify-between"
        initial={{borderColor: 'rgba(26,26,26,0.12)', backgroundColor: '#fff'}}
        animate={
          go
            ? {
                borderColor: FUNNEL_COLOURS.accent,
                backgroundColor: `${FUNNEL_COLOURS.accent}12`,
              }
            : undefined
        }
        transition={{duration: 0.35}}
      >
        <span className="font-sans text-[12px] text-dark/80">Out · landed · next</span>
        <motion.span
          className="font-mono text-[7px] font-bold uppercase tracking-wide"
          style={{color: FUNNEL_COLOURS.accent}}
          animate={go ? {opacity: [0.45, 1, 0.45]} : undefined}
          transition={{duration: 1.1, repeat: Infinity}}
        >
          Plain English
        </motion.span>
      </motion.div>
    </div>
  )
}

/** Content System: no lock-in. */
function ContentNoLockInStackVisual({reduce, play}: VisualProps) {
  const go = play && !reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white px-3 py-3 flex items-center gap-3 overflow-hidden">
      <motion.div
        className="font-serif text-3xl font-bold tabular-nums leading-none"
        style={{color: FUNNEL_COLOURS.accent}}
        animate={go ? {scale: [1, 1.08, 1]} : undefined}
        transition={{duration: 1.5, repeat: Infinity}}
      >
        30
      </motion.div>
      <div className="min-w-0">
        <p className="font-mono text-[8px] uppercase tracking-widest text-dark/45">Days notice</p>
        <p className="font-sans text-[11px] text-dark/70 mt-0.5">Pause any time · brand system stays yours</p>
      </div>
    </div>
  )
}

const CONTENT_SYSTEM_STACK_VISUALS = [
  ContentSetupStackVisual,
  ContentMonthlyStackVisual,
  ContentReportStackVisual,
  ContentNoLockInStackVisual,
  SnapshotStackVisual,
]

const TEAM_AI_STACK_VISUALS = [
  TeamHalfDayStackVisual,
  TeamWorkspaceStackVisual,
  TeamDeliverablesStackVisual,
  TeamCheckInStackVisual,
  SnapshotStackVisual,
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
  variant?:
    | 'speed'
    | 'missed-call'
    | 'google-profile'
    | 'search-fix'
    | 'landing-page'
    | 'crm-rescue'
    | 'team-ai'
    | 'change-pack'
    | 'content-system'
    | 'reviews'
    | 'ai-phone'
    | 'booking'
    | 'website'
    | 'enquiry-reply'
    | 'profile-posting'
    | 'local-pack'
    | 'conversion-pass'
    | 'onpage-search'
    | 'schema-faq'
}) {
  const reduce = useReducedMotion()
  const visuals: Array<(p: VisualProps) => React.ReactElement> =
    variant === 'missed-call'
      ? MISSED_VISUALS
      : variant === 'ai-phone'
        ? AI_PHONE_STACK_VISUALS
        : variant === 'reviews'
          ? REVIEWS_STACK_VISUALS
          : variant === 'google-profile'
            ? PROFILE_STACK_VISUALS
            : variant === 'search-fix'
              ? SEARCH_STACK_VISUALS
              : variant === 'website'
                ? WEBSITE_STACK_VISUALS
                : variant === 'landing-page'
                  ? LANDING_STACK_VISUALS
                  : variant === 'booking'
                    ? BOOKING_STACK_VISUALS
                    : variant === 'crm-rescue'
                      ? CRM_STACK_VISUALS
                      : variant === 'enquiry-reply'
                        ? ENQUIRY_REPLY_STACK_VISUALS
                        : variant === 'profile-posting'
                          ? PROFILE_POSTING_STACK_VISUALS
                          : variant === 'local-pack'
                            ? LOCAL_PACK_STACK_VISUALS
                          : variant === 'conversion-pass'
                            ? CONVERSION_PASS_STACK_VISUALS
                          : variant === 'onpage-search'
                            ? ONPAGE_SEARCH_STACK_VISUALS
                          : variant === 'schema-faq'
                            ? SCHEMA_FAQ_STACK_VISUALS
                          : variant === 'change-pack'
                          ? CHANGE_PACK_STACK_VISUALS
                          : variant === 'content-system'
                            ? CONTENT_SYSTEM_STACK_VISUALS
                            : variant === 'team-ai'
                                ? TEAM_AI_STACK_VISUALS
                                : SPEED_VISUALS

  return (
    <ul className="space-y-10 md:space-y-12">
      {items.map((item, i) => (
        <StackRow
          key={i}
          item={item}
          index={i}
          ink={ink}
          muted={muted}
          reduce={!!reduce}
          visuals={visuals}
        />
      ))}
    </ul>
  )
}
