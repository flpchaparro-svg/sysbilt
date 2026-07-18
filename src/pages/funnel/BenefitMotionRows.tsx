import React from 'react'
import {motion, useReducedMotion} from 'framer-motion'
import {colors} from '../../constants/theme'
import {FUNNEL_COLOURS} from './funnelTheme'

type VisualProps = {reduce: boolean | null}

/** Caller: no answer → SMS arrives → thinking (not a chat reply). */
function StayWarmVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70 p-2.5 flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <motion.div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{backgroundColor: FUNNEL_COLOURS.accent}}
          animate={reduce ? undefined : {rotate: [0, -5, 5, 0]}}
          transition={reduce ? undefined : {duration: 0.6, repeat: 1}}
        >
          <span className="font-serif text-sm" style={{color: FUNNEL_COLOURS.onInk}}>
            ☎
          </span>
        </motion.div>
        <div className="min-w-0">
          <p
            className="font-mono text-[8px] uppercase tracking-[0.16em]"
            style={{color: FUNNEL_COLOURS.accentDeep}}
          >
            No answer
          </p>
          <p className="font-sans text-[10px] truncate" style={{color: FUNNEL_COLOURS.muted}}>
            Call rings out
          </p>
        </div>
        <motion.span
          className="ml-auto font-mono text-[9px]"
          style={{color: FUNNEL_COLOURS.goldDeep}}
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.35}}
        >
          →
        </motion.span>
        <motion.div
          className="shrink-0 rounded-md border px-1.5 py-1 max-w-[42%]"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}18`,
            backgroundColor: FUNNEL_COLOURS.ground,
          }}
          initial={reduce ? false : {opacity: 0, x: 6}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          transition={{duration: 0.35, delay: reduce ? 0 : 0.4}}
        >
          <p className="font-mono text-[6px] uppercase tracking-widest text-dark/40">SMS</p>
          <p className="font-sans text-[9px] leading-snug text-dark/75">We will call you back…</p>
        </motion.div>
      </div>

      {/* Thought cloud — clearly thinking, not a text bubble */}
      <motion.div
        className="relative self-center mt-1"
        initial={reduce ? false : {opacity: 0, y: 6, scale: 0.92}}
        whileInView={{opacity: 1, y: 0, scale: 1}}
        viewport={{once: true}}
        transition={{duration: 0.4, delay: reduce ? 0 : 0.75}}
      >
        <div className="absolute -top-2 left-6 flex gap-1" aria-hidden>
          <span className="h-1 w-1 rounded-full bg-dark/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-dark/30" />
        </div>
        <div
          className="rounded-[18px] border px-3 py-2 max-w-[240px]"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}20`,
            backgroundColor: `${FUNNEL_COLOURS.gold}22`,
          }}
        >
          <p
            className="font-mono text-[6px] uppercase tracking-[0.18em] mb-0.5"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Thinking
          </p>
          <p className="font-sans text-[11px] leading-snug italic" style={{color: FUNNEL_COLOURS.ink}}>
            They must be busy. They said they will call me back.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

/** Missed call → logged lead on a CRM / dashboard. */
function LoggedLeadVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70 flex">
      <motion.div
        className="w-[38%] border-r border-dark/10 p-2 flex flex-col justify-center gap-1.5"
        initial={reduce ? false : {opacity: 0.5}}
        whileInView={{opacity: 1}}
        viewport={{once: true}}
      >
        <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/40">Call</p>
        <motion.div
          className="rounded-sm border px-1.5 py-1.5"
          style={{borderColor: `${FUNNEL_COLOURS.accent}55`, backgroundColor: `${FUNNEL_COLOURS.accent}12`}}
          initial={reduce ? false : {scale: 0.92, opacity: 0}}
          whileInView={{scale: 1, opacity: 1}}
          viewport={{once: true}}
          transition={{duration: 0.35}}
        >
          <p className="font-mono text-[8px] font-bold" style={{color: FUNNEL_COLOURS.accentDeep}}>
            Missed
          </p>
          <p className="font-sans text-[9px] text-dark/60 mt-0.5">0412 ··· ···</p>
        </motion.div>
        <motion.span
          className="font-mono text-[8px] text-center"
          style={{color: FUNNEL_COLOURS.goldDeep}}
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.45}}
        >
          →
        </motion.span>
      </motion.div>

      <div className="flex-1 p-2 flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/40">CRM</p>
          <motion.span
            className="font-mono text-[7px] uppercase tracking-widest px-1 py-0.5"
            style={{backgroundColor: `${colors.teal}22`, color: colors.teal}}
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.7}}
          >
            New
          </motion.span>
        </div>
        <motion.div
          className="flex-1 border border-dark/10 bg-cream/80 p-1.5 space-y-1"
          initial={reduce ? false : {opacity: 0, x: 8}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          transition={{duration: 0.4, delay: reduce ? 0 : 0.55}}
        >
          <div className="h-1.5 w-2/3 rounded-sm bg-dark/15" />
          <div className="h-1.5 w-full rounded-sm bg-dark/10" />
          <div className="h-1.5 w-4/5 rounded-sm bg-dark/10" />
          <p className="pt-1 font-mono text-[8px]" style={{color: colors.teal}}>
            Lead · SMS thread
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/** Live proof: test SMS arrives on the other phone. */
function TestSmsReceivedVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70 p-2.5 flex gap-2">
      <div className="flex-1 border border-dark/10 rounded-sm bg-cream/70 p-1.5 flex flex-col">
        <p className="font-mono text-[6px] uppercase tracking-[0.14em] text-dark/40 mb-1">
          Your phone
        </p>
        <motion.div
          className="mt-auto rounded-lg rounded-br-sm px-2 py-1.5"
          style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
          initial={reduce ? false : {opacity: 0, y: 6}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.35}}
        >
          <p className="font-sans text-[9px] leading-snug">Test miss · send</p>
        </motion.div>
      </div>

      <motion.span
        className="self-center font-mono text-[10px]"
        style={{color: FUNNEL_COLOURS.goldDeep}}
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true}}
        transition={{delay: reduce ? 0 : 0.35}}
      >
        →
      </motion.span>

      <div className="flex-1 border border-dark/10 rounded-sm bg-cream/70 p-1.5 flex flex-col">
        <p className="font-mono text-[6px] uppercase tracking-[0.14em] text-dark/40 mb-1">
          Test handset
        </p>
        <motion.div
          className="mt-auto rounded-lg rounded-bl-sm border px-2 py-1.5"
          style={{
            borderColor: `${colors.teal}55`,
            backgroundColor: `${colors.teal}15`,
          }}
          initial={reduce ? false : {opacity: 0, scale: 0.9}}
          whileInView={{opacity: 1, scale: 1}}
          viewport={{once: true}}
          transition={{duration: 0.4, delay: reduce ? 0 : 0.55}}
        >
          <p className="font-mono text-[7px] uppercase tracking-widest mb-0.5" style={{color: colors.teal}}>
            Received
          </p>
          <p className="font-sans text-[9px] leading-snug text-dark/80">
            Sorry we missed…
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/** Clear within-3-days delivery, often done earlier. */
function WithinThreeDaysVisual({reduce}: VisualProps) {
  const cells = [
    {label: 'D1', sub: 'Access'},
    {label: 'D2', sub: 'Wire'},
    {label: 'D3', sub: 'Proof'},
  ]

  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70 flex flex-col">
      <div className="h-7 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Delivery window
        </span>
        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-gold-on-cream">
          Within 3 days
        </span>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-1.5 p-2">
        {cells.map((c, i) => (
          <motion.div
            key={c.label}
            className="border flex flex-col items-center justify-center"
            initial={{
              backgroundColor: colors.cream,
              borderColor: 'rgba(26,26,26,0.15)',
            }}
            whileInView={{
              backgroundColor: `${colors.teal}18`,
              borderColor: colors.teal,
            }}
            viewport={{once: true, amount: 0.7}}
            transition={{duration: 0.35, delay: reduce ? 0 : 0.2 + i * 0.28}}
          >
            <span className="font-serif text-lg text-dark leading-none">{c.label}</span>
            <span className="mt-0.5 font-mono text-[6px] uppercase tracking-wide text-dark/45">
              {c.sub}
            </span>
            <motion.span
              className="mt-1 h-1 w-1 rounded-full bg-teal"
              initial={{opacity: 0}}
              whileInView={{opacity: 1}}
              viewport={{once: true}}
              transition={{delay: reduce ? 0 : 0.3 + i * 0.28}}
            />
          </motion.div>
        ))}
      </div>

      <motion.p
        className="pb-2 text-center font-mono text-[7px] uppercase tracking-[0.14em]"
        style={{color: colors.teal}}
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true}}
        transition={{delay: reduce ? 0 : 1.1}}
      >
        Often done day one · capped at three
      </motion.p>
    </div>
  )
}

/** Speed Fix visuals (unchanged). */
function FastBrowseVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[110px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70">
      <div className="flex items-center gap-1 px-2 h-5 border-b border-dark/10 bg-cream">
        <span className="h-1 w-1 rounded-full bg-dark/25" />
        <span className="h-1 w-1 rounded-full bg-dark/25" />
        <span className="h-1 w-1 rounded-full bg-dark/25" />
        <span className="ml-1.5 font-mono text-[7px] text-dark/45">yoursite.com</span>
      </div>
      <motion.div
        className="absolute inset-x-0 top-5 bottom-0 p-2"
        initial={{opacity: 1}}
        whileInView={reduce ? undefined : {opacity: [1, 1, 0]}}
        viewport={{once: true, amount: 0.6}}
        transition={{duration: 1.8, times: [0, 0.55, 0.75]}}
      >
        <div className="h-2 w-3/4 rounded-sm bg-teal/25 mb-1.5" />
        <div className="h-1.5 w-full rounded-sm bg-dark/8 mb-1" />
        <div className="h-1.5 w-2/3 rounded-sm bg-dark/8 mb-3" />
        <div className="h-5 w-14 rounded-sm bg-red-solid flex items-center justify-center">
          <span className="font-mono text-[7px] text-cream font-bold">BOOK</span>
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-x-0 top-5 bottom-0 flex flex-col items-center justify-center bg-cream"
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true, amount: 0.6}}
        transition={{duration: 0.4, delay: reduce ? 0 : 1.2}}
      >
        <div className="h-7 w-7 rounded-full border-2 border-teal flex items-center justify-center">
          <span className="font-mono text-sm text-teal font-bold">✓</span>
        </div>
        <span className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-teal">
          Booked
        </span>
      </motion.div>
    </div>
  )
}

function RankRaceVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[110px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70 p-2 flex gap-2">
      <div className="flex-1 relative border border-teal/40 rounded-sm overflow-hidden bg-cream/80">
        <div className="h-4 border-b border-teal/20 px-1 flex items-center">
          <span className="font-mono text-[6px] text-teal truncate">you.com</span>
        </div>
        <motion.div
          className="h-1 bg-teal"
          initial={{width: '0%'}}
          whileInView={{width: '100%'}}
          viewport={{once: true}}
          transition={{duration: reduce ? 0 : 0.9, ease: 'easeOut'}}
        />
        <div className="p-1.5 space-y-1">
          <div className="h-1.5 w-full rounded-sm bg-teal/20" />
          <div className="h-1.5 w-2/3 rounded-sm bg-teal/15" />
        </div>
        <motion.p
          className="absolute bottom-1.5 left-1.5 right-1.5 font-mono text-[8px] font-bold text-teal"
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.7}}
        >
          Page 1
        </motion.p>
      </div>
      <div className="flex-1 relative border border-red-solid/40 rounded-sm overflow-hidden bg-cream/80">
        <div className="h-4 border-b border-red-solid/20 px-1 flex items-center">
          <span className="font-mono text-[6px] text-red-text truncate">rival.com</span>
        </div>
        <motion.div
          className="h-1 bg-red-solid"
          initial={{width: '0%'}}
          whileInView={{width: '32%'}}
          viewport={{once: true}}
          transition={{duration: reduce ? 0 : 1.2, ease: 'linear'}}
        />
        <div className="p-1.5 space-y-1 opacity-40">
          <div className="h-1.5 w-full rounded-sm bg-dark/10" />
          <div className="h-1.5 w-1/2 rounded-sm bg-dark/10" />
        </div>
        <motion.p
          className="absolute bottom-1.5 left-1.5 font-mono text-[7px] text-red-text"
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.9}}
        >
          Page 6
        </motion.p>
      </div>
    </div>
  )
}

function ProofEmailVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[110px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70 flex items-center justify-center">
      <motion.div
        className="absolute w-[88px] h-[56px]"
        initial={reduce ? false : {opacity: 1, scale: 1}}
        whileInView={reduce ? undefined : {opacity: [1, 1, 0], scale: [1, 1, 0.9]}}
        viewport={{once: true, amount: 0.6}}
        transition={{duration: 1.6, times: [0, 0.45, 0.7], ease: 'easeOut'}}
      >
        <div className="absolute inset-0 border-2 border-dark/25 bg-cream" />
        <div
          className="absolute inset-x-0 top-0 h-0 border-l-[44px] border-r-[44px] border-t-[28px] border-l-transparent border-r-transparent"
          style={{borderTopColor: `${colors.gold}99`}}
        />
        <div className="absolute inset-x-2 bottom-2 top-7 border border-dark/10 bg-cream/80" />
      </motion.div>
      <motion.div
        className="absolute inset-3 border border-teal/35 bg-cream flex flex-col items-center justify-center"
        initial={{opacity: reduce ? 1 : 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true, amount: 0.6}}
        transition={{duration: 0.45, delay: reduce ? 0 : 0.85}}
      >
        <span className="font-serif text-3xl text-teal tabular-nums leading-none">90+</span>
        <span className="mt-1 font-mono text-[7px] uppercase tracking-[0.16em] text-dark/45">
          Google score
        </span>
      </motion.div>
    </div>
  )
}

function ThreeDayCalendarVisual({reduce}: VisualProps) {
  const days = ['1', '2', '3']
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70 flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Delivery
        </span>
        <span className="font-mono text-[7px] text-gold-on-cream">3 days</span>
      </div>
      <div className="flex-1 flex flex-col px-2 pt-1.5 pb-1.5">
        <div className="grid grid-cols-4 gap-1 mb-1">
          {['D1', 'D2', 'D3', '—'].map((d) => (
            <span
              key={d}
              className="text-center font-mono text-[6px] uppercase tracking-wide text-dark/35"
            >
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1 h-[44px]">
          {days.map((d, i) => (
            <motion.div
              key={d}
              className="relative border flex flex-col items-center justify-start pt-1"
              initial={{
                backgroundColor: colors.cream,
                borderColor: 'rgba(26,26,26,0.15)',
              }}
              whileInView={
                reduce
                  ? {backgroundColor: `${colors.teal}22`, borderColor: colors.teal}
                  : {backgroundColor: `${colors.teal}22`, borderColor: colors.teal}
              }
              viewport={{once: true, amount: 0.7}}
              transition={{duration: 0.35, delay: reduce ? 0 : 0.25 + i * 0.35}}
            >
              <span className="font-serif text-sm text-dark leading-none">{d}</span>
              <motion.span
                className="mt-0.5 h-1 w-1 rounded-full bg-teal"
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                viewport={{once: true}}
                transition={{delay: reduce ? 0 : 0.35 + i * 0.35}}
              />
            </motion.div>
          ))}
          <div className="relative border border-dark/15 bg-cream overflow-hidden">
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center border border-teal bg-teal/15"
              initial={{opacity: 0, scale: 0.85}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{duration: 0.4, delay: reduce ? 0 : 1.4}}
            >
              <span className="font-serif text-2xl md:text-3xl font-bold text-teal leading-none">
                ✓
              </span>
            </motion.div>
          </div>
        </div>
        <motion.p
          className="mt-2.5 text-center font-mono text-[7px] uppercase tracking-[0.16em] text-teal"
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 1.65}}
        >
          Job completed
        </motion.p>
      </div>
    </div>
  )
}

const SPEED_VISUALS = [FastBrowseVisual, RankRaceVisual, ProofEmailVisual, ThreeDayCalendarVisual]
const MISSED_VISUALS = [
  StayWarmVisual,
  LoggedLeadVisual,
  TestSmsReceivedVisual,
  WithinThreeDaysVisual,
]

type Benefit = {title: string; text: string}

/**
 * Benefit rows: copy left, small cream motion panel right (desktop).
 */
export function BenefitMotionRows({
  benefits,
  ink,
  muted,
  gold,
  variant = 'speed',
}: {
  benefits: Benefit[]
  ink: string
  muted: string
  gold: string
  variant?: 'speed' | 'missed-call'
}) {
  const reduce = useReducedMotion()
  const visuals = variant === 'missed-call' ? MISSED_VISUALS : SPEED_VISUALS

  return (
    <div className="space-y-10 md:space-y-12">
      {benefits.map((item, i) => {
        const Visual = visuals[i] || visuals[0]
        return (
          <motion.div
            key={i}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 md:items-center"
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-60px'}}
            transition={{duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1]}}
          >
            <div>
              <p
                className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-2"
                style={{color: gold}}
              >
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="font-serif text-xl md:text-2xl mb-2" style={{color: ink}}>
                {item.title}
              </h3>
              <p className="font-sans text-base md:text-lg leading-relaxed" style={{color: muted}}>
                {item.text}
              </p>
            </div>
            <div className="border border-dark/10 bg-cream p-2 md:p-2.5 max-w-sm md:max-w-none md:ml-auto w-full">
              <Visual reduce={reduce} />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
