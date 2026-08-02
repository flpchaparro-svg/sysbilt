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
          <p className="font-sans text-[9px] leading-snug text-dark/75">We'll call you back…</p>
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
            They must be busy, they said they'll call me back.
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

/** CRM Rescue: every enquiry answered in seconds. */
function CrmInstantReplyVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          New form enquiry
        </span>
        <motion.span
          className="font-mono text-[7px] font-bold uppercase tracking-wide text-gold-on-cream"
          animate={reduce ? undefined : {opacity: [0.55, 1, 0.55]}}
          transition={{duration: 1.4, repeat: Infinity}}
        >
          Auto-reply
        </motion.span>
      </div>
      <div className="flex-1 min-h-0 p-2 flex flex-col justify-center gap-1.5">
        <motion.div
          className="rounded-sm border border-dark/10 bg-cream px-2 py-1 shrink-0"
          initial={reduce ? false : {opacity: 0, x: -14, scale: 0.96}}
          whileInView={{opacity: 1, x: 0, scale: 1}}
          viewport={{once: true}}
          transition={{type: 'spring', stiffness: 380, damping: 22}}
        >
          <p className="font-mono text-[7px] text-dark/40">Lead</p>
          <p className="font-sans text-[10px] text-dark/70 leading-tight">Website form · just now</p>
        </motion.div>
        <motion.div
          className="rounded-sm border px-2 py-1 shrink-0"
          style={{borderColor: `${colors.teal}55`, backgroundColor: `${colors.teal}12`}}
          initial={reduce ? false : {opacity: 0, y: 10, scale: 0.92}}
          whileInView={{opacity: 1, y: 0, scale: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.35, type: 'spring', stiffness: 420, damping: 18}}
        >
          <motion.p
            className="font-mono text-[7px] font-bold uppercase tracking-wide"
            style={{color: colors.teal}}
            animate={reduce ? undefined : {scale: [1, 1.04, 1]}}
            transition={{duration: 1.1, repeat: Infinity, delay: 0.6}}
          >
            Instant reply sent · 4s
          </motion.p>
          <p className="font-sans text-[10px] text-dark/65 leading-tight">
            Thanks, we got it. Someone will follow up.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/** CRM Rescue: right phone buzzes. */
function CrmRightPhoneVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/40">Route to</span>
      </div>
      <div className="flex-1 min-h-0 p-1.5 flex flex-col justify-center gap-1">
        {[
          {who: 'Sales · Jordan', ok: true},
          {who: 'Ops inbox', ok: false},
          {who: 'Owner CC', ok: false},
        ].map((row, i) => (
          <motion.div
            key={row.who}
            className="flex items-center justify-between rounded-sm border px-2 py-1 shrink-0"
            style={
              row.ok
                ? {borderColor: colors.teal, backgroundColor: `${colors.teal}14`}
                : {borderColor: 'rgba(26,26,26,0.12)', backgroundColor: colors.cream}
            }
            initial={reduce ? false : {opacity: 0, x: row.ok ? -10 : 10, scale: 0.96}}
            whileInView={{opacity: row.ok ? 1 : 0.4, x: 0, scale: 1}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.1 + i * 0.14, type: 'spring', stiffness: 380, damping: 20}}
          >
            <motion.span
              className="font-sans text-[10px] text-dark/75 truncate pr-2"
              animate={
                reduce || !row.ok ? undefined : {x: [0, -1.5, 1.5, -1, 1, 0]}
              }
              transition={
                reduce || !row.ok
                  ? undefined
                  : {duration: 0.55, repeat: Infinity, repeatDelay: 0.9, ease: 'easeInOut'}
              }
            >
              {row.who}
            </motion.span>
            {row.ok ? (
              <motion.span
                className="font-mono text-[7px] font-bold uppercase tracking-wide shrink-0"
                style={{color: colors.teal}}
                animate={reduce ? undefined : {opacity: [1, 0.35, 1], scale: [1, 1.14, 1]}}
                transition={{duration: 0.8, repeat: Infinity, ease: 'easeInOut'}}
              >
                Buzzing
              </motion.span>
            ) : (
              <span className="font-mono text-[7px] uppercase tracking-wide text-dark/30 shrink-0">
                Skip
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** CRM Rescue: quotes chased. */
function CrmQuoteChaseVisual({reduce}: VisualProps) {
  const steps = [
    {label: 'Quote sent', done: true, pulse: false},
    {label: 'Day 2 nudge', done: true, pulse: false},
    {label: 'Day 5 chase', done: false, pulse: true},
  ]
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Open quote · kitchen reno
        </span>
      </div>
      <div className="flex-1 min-h-0 flex items-stretch gap-1.5 p-2">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            className="flex-1 min-w-0 rounded-sm border px-1 py-1.5 text-center flex flex-col items-center justify-center"
            style={{
              borderColor: s.done || s.pulse ? colors.teal : 'rgba(26,26,26,0.15)',
              backgroundColor: s.done || s.pulse ? `${colors.teal}14` : colors.cream,
            }}
            initial={reduce ? false : {opacity: 0, y: 12, scale: 0.9}}
            whileInView={{opacity: 1, y: 0, scale: 1}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.12 + i * 0.2, type: 'spring', stiffness: 360, damping: 18}}
          >
            <p className="font-mono text-[7px] uppercase tracking-wide text-dark/50 leading-tight">
              {s.label}
            </p>
            <motion.span
              className="mt-1 inline-block h-1.5 w-1.5 rounded-full"
              style={{backgroundColor: s.done || s.pulse ? colors.teal : 'rgba(26,26,26,0.2)'}}
              initial={reduce ? false : {scale: 0, opacity: 0}}
              whileInView={
                reduce || !s.pulse
                  ? {scale: 1, opacity: 1}
                  : {scale: [1, 1.7, 1], opacity: [1, 0.45, 1]}
              }
              viewport={{once: true}}
              transition={
                s.pulse && !reduce
                  ? {delay: 0.35 + i * 0.2, duration: 1.05, repeat: Infinity, ease: 'easeInOut'}
                  : {delay: reduce ? 0 : 0.28 + i * 0.2, type: 'spring', stiffness: 500}
              }
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** CRM Rescue: five business days — not Missed-Call’s three. */
function CrmFiveDayVisual({reduce}: VisualProps) {
  const cells = [
    {label: 'D1–3', sub: 'Build'},
    {label: 'D4–5', sub: 'Walkthrough'},
  ]
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Delivery window
        </span>
        <motion.span
          className="font-mono text-[7px] font-bold uppercase tracking-[0.12em] text-gold-on-cream"
          animate={reduce ? undefined : {opacity: [0.55, 1, 0.55]}}
          transition={{duration: 1.4, repeat: Infinity}}
        >
          Within 5 days
        </motion.span>
      </div>
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-1.5 p-1.5">
        {cells.map((c, i) => (
          <motion.div
            key={c.label}
            className="border flex flex-col items-center justify-center min-h-0"
            initial={
              reduce
                ? false
                : {
                    backgroundColor: colors.cream,
                    borderColor: 'rgba(26,26,26,0.15)',
                    scale: 0.92,
                    y: 8,
                  }
            }
            whileInView={{
              backgroundColor: `${colors.teal}18`,
              borderColor: colors.teal,
              scale: 1,
              y: 0,
            }}
            viewport={{once: true, amount: 0.7}}
            transition={{
              type: 'spring',
              stiffness: 360,
              damping: 18,
              delay: reduce ? 0 : 0.12 + i * 0.25,
            }}
          >
            <motion.span
              className="font-serif text-base text-dark leading-none"
              animate={reduce ? undefined : {scale: [1, 1.06, 1]}}
              transition={{duration: 1.5, repeat: Infinity, delay: 0.5 + i * 0.3}}
            >
              {c.label}
            </motion.span>
            <span className="mt-0.5 font-mono text-[6px] uppercase tracking-wide text-dark/45">
              {c.sub}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.p
        className="shrink-0 pb-1.5 text-center font-mono text-[7px] uppercase tracking-[0.14em]"
        style={{color: colors.teal}}
        initial={reduce ? false : {opacity: 0, y: 4}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{delay: reduce ? 0 : 0.7}}
      >
        Then 14 days watching · we call if it slips
      </motion.p>
    </div>
  )
}

/** AI Phone: after hours, voice picks up. */
function AiPhoneAnsweredVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Incoming · after hours
        </span>
        <motion.span
          className="font-mono text-[7px] font-bold uppercase tracking-wide"
          style={{color: colors.teal}}
          animate={reduce ? undefined : {opacity: [0.45, 1, 0.45]}}
          transition={{duration: 1.1, repeat: Infinity}}
        >
          Picked up
        </motion.span>
      </div>
      <div className="flex-1 min-h-0 p-2 flex items-center gap-2">
        <motion.div
          className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
          style={{backgroundColor: FUNNEL_COLOURS.accent}}
          animate={reduce ? undefined : {scale: [1, 1.08, 1]}}
          transition={{duration: 1.2, repeat: Infinity}}
        >
          <span className="font-serif text-sm" style={{color: FUNNEL_COLOURS.onInk}}>
            ☎
          </span>
        </motion.div>
        <motion.div
          className="flex-1 min-w-0 rounded-sm border px-2 py-1.5"
          style={{borderColor: `${colors.teal}55`, backgroundColor: `${colors.teal}12`}}
          initial={reduce ? false : {opacity: 0, x: 10}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.25, type: 'spring', stiffness: 360}}
        >
          <p className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
            Voice agent
          </p>
          <p className="font-sans text-[10px] text-dark/70 leading-tight">
            Thanks for calling. How can I help?
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/** AI Phone: books, then hands off. */
function AiPhoneBookHandoffVisual({reduce}: VisualProps) {
  const steps = [
    {label: 'Answered', ok: true},
    {label: 'Booked', ok: true},
    {label: 'Handoff', ok: true},
  ]
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Call path
        </span>
      </div>
      <div className="flex-1 min-h-0 flex items-stretch gap-1.5 p-2">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            className="flex-1 min-w-0 rounded-sm border px-1 py-1.5 text-center flex flex-col items-center justify-center"
            style={{borderColor: colors.teal, backgroundColor: `${colors.teal}14`}}
            initial={reduce ? false : {opacity: 0, y: 10, scale: 0.92}}
            whileInView={{opacity: 1, y: 0, scale: 1}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.12 + i * 0.18, type: 'spring', stiffness: 360}}
          >
            <p className="font-mono text-[7px] uppercase tracking-wide text-dark/55 leading-tight">
              {s.label}
            </p>
            <motion.span
              className="mt-1 inline-block h-1.5 w-1.5 rounded-full"
              style={{backgroundColor: colors.teal}}
              animate={reduce ? undefined : {scale: [1, 1.5, 1]}}
              transition={{duration: 1.1, repeat: Infinity, delay: 0.4 + i * 0.2}}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** AI Phone: agent lives on their vendor login. */
function AiPhoneOwnedAccountVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Vendor account
        </span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide text-gold-on-cream">
          Yours
        </span>
      </div>
      <div className="flex-1 min-h-0 p-2 flex flex-col justify-center gap-1.5">
        <motion.div
          className="rounded-sm border px-2 py-1.5 flex items-center justify-between"
          style={{borderColor: colors.teal, backgroundColor: `${colors.teal}14`}}
          initial={reduce ? false : {opacity: 0, y: 8}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{type: 'spring', stiffness: 340}}
        >
          <span className="font-sans text-[10px] text-dark/75">Your Synthflow / Vapi login</span>
          <motion.span
            className="font-mono text-[7px] font-bold uppercase tracking-wide"
            style={{color: colors.teal}}
            animate={reduce ? undefined : {opacity: [0.5, 1, 0.5]}}
            transition={{duration: 1.3, repeat: Infinity}}
          >
            Owned
          </motion.span>
        </motion.div>
        <motion.p
          className="font-mono text-[7px] uppercase tracking-[0.12em] text-dark/40 text-center"
          initial={reduce ? false : {opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.35}}
        >
          Not a SYSBILT monthly sub
        </motion.p>
      </div>
    </div>
  )
}

/** AI Phone: few business days to live test. */
function AiPhoneFewDaysVisual({reduce}: VisualProps) {
  const cells = [
    {label: 'D1', sub: 'Access'},
    {label: 'D2', sub: 'Build'},
    {label: 'D3+', sub: 'Live test'},
  ]
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Delivery
        </span>
        <motion.span
          className="font-mono text-[7px] font-bold uppercase tracking-[0.12em] text-gold-on-cream"
          animate={reduce ? undefined : {opacity: [0.55, 1, 0.55]}}
          transition={{duration: 1.4, repeat: Infinity}}
        >
          A few days
        </motion.span>
      </div>
      <div className="flex-1 min-h-0 grid grid-cols-3 gap-1 p-1.5">
        {cells.map((c, i) => (
          <motion.div
            key={c.label}
            className="border flex flex-col items-center justify-center min-h-0"
            initial={
              reduce
                ? false
                : {backgroundColor: colors.cream, borderColor: 'rgba(26,26,26,0.15)', y: 8}
            }
            whileInView={{
              backgroundColor: `${colors.teal}18`,
              borderColor: colors.teal,
              y: 0,
            }}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.12 + i * 0.2, type: 'spring', stiffness: 340}}
          >
            <span className="font-serif text-sm text-dark leading-none">{c.label}</span>
            <span className="mt-0.5 font-mono text-[6px] uppercase tracking-wide text-dark/45">
              {c.sub}
            </span>
          </motion.div>
        ))}
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
const AI_PHONE_VISUALS = [
  AiPhoneAnsweredVisual,
  AiPhoneBookHandoffVisual,
  AiPhoneOwnedAccountVisual,
  AiPhoneFewDaysVisual,
]
const CRM_VISUALS = [
  CrmInstantReplyVisual,
  CrmRightPhoneVisual,
  CrmQuoteChaseVisual,
  CrmFiveDayVisual,
]

/** Enquiry Reply: form enquiry answered in seconds. */
function EnquiryAckInSecondsVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Website form
        </span>
        <motion.span
          className="font-mono text-[7px] font-bold uppercase tracking-wide text-gold-on-cream"
          animate={reduce ? undefined : {opacity: [0.55, 1, 0.55]}}
          transition={{duration: 1.4, repeat: Infinity}}
        >
          Auto-ack
        </motion.span>
      </div>
      <div className="flex-1 min-h-0 p-2 flex flex-col justify-center gap-1.5">
        <motion.div
          className="rounded-sm border border-dark/10 bg-cream px-2 py-1 shrink-0"
          initial={reduce ? false : {opacity: 0, x: -14, scale: 0.96}}
          whileInView={{opacity: 1, x: 0, scale: 1}}
          viewport={{once: true}}
          transition={{type: 'spring', stiffness: 380, damping: 22}}
        >
          <p className="font-mono text-[7px] text-dark/40">Enquiry</p>
          <p className="font-sans text-[10px] text-dark/70 leading-tight">Submitted · just now</p>
        </motion.div>
        <motion.div
          className="rounded-sm border px-2 py-1 shrink-0"
          style={{borderColor: `${colors.teal}55`, backgroundColor: `${colors.teal}12`}}
          initial={reduce ? false : {opacity: 0, y: 10, scale: 0.92}}
          whileInView={{opacity: 1, y: 0, scale: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.35, type: 'spring', stiffness: 420, damping: 18}}
        >
          <motion.p
            className="font-mono text-[7px] font-bold uppercase tracking-wide"
            style={{color: colors.teal}}
            animate={reduce ? undefined : {scale: [1, 1.04, 1]}}
            transition={{duration: 1.1, repeat: Infinity, delay: 0.6}}
          >
            Acknowledged · 4s
          </motion.p>
          <p className="font-sans text-[10px] text-dark/65 leading-tight">
            Thanks, we have this and will follow up shortly.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/** Enquiry Reply: everything routes to one owned inbox. */
function EnquiryOneInboxVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/40">Routes to</span>
      </div>
      <div className="flex-1 min-h-0 p-1.5 flex flex-col justify-center gap-1">
        {[
          {who: 'Enquiries · one inbox', ok: true},
          {who: 'Personal mobile', ok: false},
          {who: 'Second staff app', ok: false},
        ].map((row, i) => (
          <motion.div
            key={row.who}
            className="flex items-center justify-between rounded-sm border px-2 py-1 shrink-0"
            style={
              row.ok
                ? {borderColor: colors.teal, backgroundColor: `${colors.teal}14`}
                : {borderColor: 'rgba(26,26,26,0.12)', backgroundColor: colors.cream}
            }
            initial={reduce ? false : {opacity: 0, x: row.ok ? -10 : 10, scale: 0.96}}
            whileInView={{opacity: row.ok ? 1 : 0.4, x: 0, scale: 1}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.1 + i * 0.14, type: 'spring', stiffness: 380, damping: 20}}
          >
            <span className="font-sans text-[10px] text-dark/75 truncate pr-2">{row.who}</span>
            {row.ok ? (
              <motion.span
                className="font-mono text-[7px] font-bold uppercase tracking-wide shrink-0"
                style={{color: colors.teal}}
                animate={reduce ? undefined : {opacity: [1, 0.35, 1], scale: [1, 1.14, 1]}}
                transition={{duration: 0.8, repeat: Infinity, ease: 'easeInOut'}}
              >
                Watched
              </motion.span>
            ) : null}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Enquiry Reply: reply wording stays in your voice. */
function EnquiryYourWordsVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col justify-center px-3">
      <motion.div
        className="max-w-[92%] rounded-2xl rounded-bl-sm px-3 py-2"
        style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
        initial={reduce ? false : {opacity: 0, y: 8}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.4}}
      >
        <p className="font-mono text-[7px] uppercase tracking-widest mb-0.5 opacity-60">
          Your words, not a script
        </p>
        <p className="font-sans text-[11px] leading-snug">
          Thanks for reaching out, we have this and someone will follow up shortly.
        </p>
      </motion.div>
    </div>
  )
}

/** Enquiry Reply: clean routing sets up the next system. */
function EnquiryNextStepVisual({reduce}: VisualProps) {
  const steps = ['Enquiry Reply', 'Missed-Call', 'CRM Rescue']
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col justify-center">
      <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40 mb-2 text-center">
        Ready when you are
      </p>
      <div className="flex items-center justify-center gap-1 px-2">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <motion.span
              className="font-mono text-[8px] uppercase tracking-wider px-2 py-1 border text-center"
              style={
                i === 0
                  ? {borderColor: colors.teal, backgroundColor: `${colors.teal}18`, color: 'inherit'}
                  : {borderColor: 'rgba(26,26,26,0.15)', backgroundColor: '#fff', opacity: 0.5}
              }
              initial={reduce ? false : {opacity: 0, scale: 0.92}}
              whileInView={{opacity: i === 0 ? 1 : 0.5, scale: 1}}
              viewport={{once: true}}
              transition={{delay: reduce ? 0 : i * 0.16, duration: 0.35}}
            >
              {s}
            </motion.span>
            {i < steps.length - 1 && (
              <motion.span
                className="font-mono text-[9px] text-dark/25"
                animate={reduce ? undefined : {opacity: [0.15, 1, 0.15], x: [0, 2, 0]}}
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

const ENQUIRY_REPLY_VISUALS = [
  EnquiryAckInSecondsVisual,
  EnquiryOneInboxVisual,
  EnquiryYourWordsVisual,
  EnquiryNextStepVisual,
]

/** Profile Posting: a real week with spaced post days, not every day. */
function ProfilePostLiveVisual({reduce}: VisualProps) {
  // Mon–Sun: post on Mon, Wed, Fri only (capacity rhythm).
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
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Your week</span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
          3 posts
        </span>
      </div>
      <div className="flex-1 flex items-end justify-between gap-1 px-2.5 pb-3 pt-2">
        {days.map((d, i) => (
          <div key={`${d.label}-${i}`} className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
            <motion.div
              className="w-full rounded-sm"
              style={{
                height: d.post ? 36 : 10,
                backgroundColor: d.post ? `${colors.teal}28` : `${FUNNEL_COLOURS.ink}08`,
                border: d.post ? `1px solid ${colors.teal}` : '1px solid transparent',
              }}
              initial={reduce || !d.post ? false : {scaleY: 0.2, opacity: 0.3}}
              whileInView={d.post ? {scaleY: 1, opacity: 1} : undefined}
              viewport={{once: true}}
              transition={{delay: reduce ? 0 : 0.12 + i * 0.08, type: 'spring', stiffness: 340, damping: 20}}
            />
            <span className="font-mono text-[7px] uppercase tracking-wide text-dark/40">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Profile Posting: four named template shapes fill in. */
function ProfileTemplatesReadyVisual({reduce}: VisualProps) {
  const templates = [
    {label: 'Offer', bars: [0.9, 0.45]},
    {label: 'Proof', bars: [0.7, 0.55]},
    {label: 'FAQ', bars: [0.55, 0.8]},
    {label: 'Season', bars: [0.8, 0.35]},
  ]
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Template set</span>
      </div>
      <div className="flex-1 grid grid-cols-4 gap-1.5 p-2.5">
        {templates.map((t, i) => (
          <motion.div
            key={t.label}
            className="rounded-sm border flex flex-col px-1.5 py-1.5 min-h-0"
            style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: '#fff'}}
            initial={reduce ? false : {opacity: 0.35, y: 8}}
            whileInView={{
              opacity: 1,
              y: 0,
              borderColor: `${FUNNEL_COLOURS.gold}90`,
              backgroundColor: `${FUNNEL_COLOURS.gold}14`,
            }}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.1 + i * 0.14, duration: 0.35}}
          >
            <span className="font-mono text-[6px] font-bold uppercase tracking-wide text-dark/55 mb-1.5">
              {t.label}
            </span>
            <div className="mt-auto space-y-1">
              {t.bars.map((w, bi) => (
                <div
                  key={bi}
                  className="h-1 rounded-sm"
                  style={{
                    width: `${w * 100}%`,
                    backgroundColor: `${FUNNEL_COLOURS.ink}22`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Profile Posting: weeks of ready posts stack into a bank. */
function ProfileOfferFreshVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Starter bank</span>
        <motion.span
          className="font-mono text-[7px] font-bold uppercase tracking-wide"
          style={{color: colors.teal}}
          initial={reduce ? false : {opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.7}}
        >
          Ready
        </motion.span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-1.5 px-3 py-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 rounded-sm border px-2 py-1"
            style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: '#fff'}}
            initial={reduce ? false : {opacity: 0, x: 18}}
            whileInView={{
              opacity: 1,
              x: 0,
              borderColor: colors.teal,
              backgroundColor: `${colors.teal}12`,
            }}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.1 + i * 0.12, type: 'spring', stiffness: 360, damping: 22}}
          >
            <span
              className="font-mono text-[7px] font-bold tabular-nums shrink-0"
              style={{color: colors.teal}}
            >
              W{i + 1}
            </span>
            <div className="flex-1 h-1 rounded-sm" style={{backgroundColor: `${colors.teal}40`}} />
            <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{backgroundColor: colors.teal}} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Profile Posting: you publish now; care month stays optional. */
function ProfilePostingNextStepVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Who posts</span>
      </div>
      <div className="flex-1 flex items-center gap-2.5 px-3 py-2.5">
        <motion.div
          className="flex-1 rounded-sm border-2 px-2.5 py-3 flex flex-col items-center justify-center gap-1.5"
          style={{borderColor: colors.teal, backgroundColor: `${colors.teal}14`}}
          initial={reduce ? false : {scale: 0.92, opacity: 0.5}}
          whileInView={{scale: 1, opacity: 1}}
          viewport={{once: true}}
          transition={{type: 'spring', stiffness: 360, damping: 20}}
        >
          <motion.span
            className="h-2.5 w-2.5 rounded-full"
            style={{backgroundColor: colors.teal}}
            animate={reduce ? undefined : {scale: [1, 1.2, 1]}}
            transition={{duration: 1.3, repeat: Infinity}}
          />
          <span className="font-mono text-[8px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
            You
          </span>
          <span className="font-mono text-[6px] uppercase tracking-wide text-dark/45">Publish</span>
        </motion.div>
        <motion.div
          className="flex-1 rounded-sm border border-dashed px-2.5 py-3 flex flex-col items-center justify-center gap-1.5"
          style={{borderColor: `${FUNNEL_COLOURS.gold}80`, backgroundColor: `${FUNNEL_COLOURS.gold}0A`}}
          initial={reduce ? false : {opacity: 0.35}}
          whileInView={{opacity: 0.85}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.35}}
        >
          <span
            className="h-2.5 w-2.5 rounded-full border-2 border-dashed"
            style={{borderColor: `${FUNNEL_COLOURS.gold}90`}}
          />
          <span className="font-mono text-[8px] font-bold uppercase tracking-wide text-dark/45">Care</span>
          <span className="font-mono text-[6px] uppercase tracking-wide text-dark/35">Later</span>
        </motion.div>
      </div>
    </div>
  )
}

const PROFILE_POSTING_VISUALS = [
  ProfilePostLiveVisual,
  ProfileTemplatesReadyVisual,
  ProfileOfferFreshVisual,
  ProfilePostingNextStepVisual,
]

/** Team AI: whole team shares the same setup. */
function TeamSharedSetupVisual({reduce}: VisualProps) {
  const seats = ['You', 'Sales', 'Ops', 'Admin']
  return (
    <div className="relative w-full rounded-sm border border-dark/12 bg-white flex flex-col">
      <div className="h-7 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Shared workspace
        </span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide text-gold-on-cream">
          Same tools
        </span>
      </div>
      <div className="grid grid-cols-4 gap-1.5 p-2.5 min-h-[88px]">
        {seats.map((s, i) => (
          <motion.div
            key={s}
            className="border flex flex-col items-center justify-center min-h-[72px]"
            initial={{
              backgroundColor: colors.cream,
              borderColor: 'rgba(26,26,26,0.12)',
            }}
            whileInView={{
              backgroundColor: `${colors.teal}16`,
              borderColor: colors.teal,
            }}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.15 + i * 0.12}}
          >
            <span className="font-mono text-[8px] uppercase tracking-wide text-dark/55">{s}</span>
            <motion.span
              className="mt-1.5 h-1.5 w-1.5 rounded-full"
              style={{backgroundColor: colors.teal}}
              initial={{opacity: 0}}
              whileInView={{opacity: 1}}
              viewport={{once: true}}
              transition={{delay: reduce ? 0 : 0.35 + i * 0.12}}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Team AI: client data stays out of prompts. */
function TeamSafeDataVisual({reduce}: VisualProps) {
  const rows = [
    {label: 'Client names', ok: false},
    {label: 'Payroll files', ok: false},
    {label: 'Approved templates', ok: true},
  ]
  return (
    <div className="relative w-full rounded-sm border border-dark/12 bg-white p-3">
      <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/40 mb-2.5">
        Usage policy
      </p>
      <div className="space-y-2">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            className="flex items-center justify-between rounded-sm border px-2.5 py-2"
            initial={{opacity: 0.4}}
            whileInView={{
              opacity: 1,
              borderColor: row.ok ? colors.teal : 'rgba(26,26,26,0.12)',
              backgroundColor: row.ok ? `${colors.teal}14` : colors.cream,
            }}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.15 + i * 0.18}}
          >
            <span className="font-sans text-[12px] text-dark/75">{row.label}</span>
            <span
              className="font-mono text-[8px] font-bold uppercase tracking-wide"
              style={{color: row.ok ? colors.teal : 'rgba(26,26,26,0.35)'}}
            >
              {row.ok ? 'Allowed' : 'Never'}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Team AI: prompt library compounds — one head → shared library. */
function TeamPromptLibraryVisual({reduce}: VisualProps) {
  return (
    <div className="relative w-full rounded-sm border border-dark/12 bg-white flex min-h-[128px]">
      <div className="w-[38%] border-r border-dark/10 bg-cream p-2.5 flex flex-col justify-center">
        <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40 mb-2">
          One person
        </p>
        <motion.div
          className="rounded-sm border px-2 py-2.5 text-center"
          style={{borderColor: 'rgba(26,26,26,0.12)', backgroundColor: '#fff'}}
          initial={{opacity: 1}}
          whileInView={reduce ? undefined : {opacity: [1, 1, 0.35]}}
          viewport={{once: true}}
          transition={{duration: 1.4, times: [0, 0.45, 1]}}
        >
          <p className="font-sans text-[11px] text-dark/70 leading-tight">Tricks in one head</p>
          <p className="mt-1 font-mono text-[7px] uppercase tracking-wide text-dark/35">Private</p>
        </motion.div>
      </div>
      <div className="flex-1 p-2.5 flex flex-col">
        <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40 mb-2">
          Shared library
        </p>
        <div className="space-y-1.5">
          {['Quote opener', 'Follow-up', 'Job brief'].map((p, i) => (
            <motion.div
              key={p}
              className="rounded-sm border px-2 py-1.5 flex items-center justify-between"
              initial={{opacity: 0, y: 6, scaleX: 0.85}}
              whileInView={{opacity: 1, y: 0, scaleX: 1}}
              viewport={{once: true}}
              transition={{delay: reduce ? 0 : 0.35 + i * 0.22, duration: 0.3}}
              style={{
                borderColor: `${colors.teal}55`,
                backgroundColor: `${colors.teal}12`,
                transformOrigin: 'left',
              }}
            >
              <span className="font-sans text-[11px] text-dark/75">{p}</span>
              <span className="font-mono text-[7px] uppercase tracking-wide" style={{color: colors.teal}}>
                +{i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Team AI: 30-day check-in sticks. */
function TeamSticksVisual({reduce}: VisualProps) {
  return (
    <div className="relative w-full rounded-sm border border-dark/12 bg-white flex flex-col">
      <div className="h-7 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          After the day
        </span>
        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-gold-on-cream">
          Day 30
        </span>
      </div>
      <div className="flex items-center gap-3 p-3.5 min-h-[96px]">
        <motion.div
          className="font-serif text-4xl font-bold tabular-nums leading-none"
          style={{color: colors.teal}}
          initial={{opacity: 0.4, scale: 0.9}}
          whileInView={{opacity: 1, scale: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.2}}
        >
          30
        </motion.div>
        <div className="min-w-0">
          <p className="font-mono text-[8px] uppercase tracking-widest text-dark/45">Day check-in</p>
          <motion.p
            className="font-sans text-[13px] text-dark/70 mt-1 leading-snug"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.45}}
          >
            Tighten what works · fix what does not
          </motion.p>
        </div>
      </div>
    </div>
  )
}

/** Change Pack: day one has a path per role. */
function ChangeDayOnePathVisual({reduce}: VisualProps) {
  const roles = ['Sales', 'Ops', 'Admin']
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Day one pack
        </span>
        <motion.span
          className="font-mono text-[7px] font-bold uppercase tracking-wide text-gold-on-cream"
          animate={reduce ? undefined : {opacity: [0.5, 1, 0.5]}}
          transition={{duration: 1.3, repeat: Infinity}}
        >
          Ready
        </motion.span>
      </div>
      <div className="flex-1 min-h-0 grid grid-cols-3 gap-1 p-1.5">
        {roles.map((r, i) => (
          <motion.div
            key={r}
            className="border flex flex-col items-center justify-center min-h-0"
            initial={
              reduce
                ? false
                : {backgroundColor: colors.cream, borderColor: 'rgba(26,26,26,0.12)', y: 8}
            }
            whileInView={{
              backgroundColor: `${colors.teal}16`,
              borderColor: colors.teal,
              y: 0,
            }}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.1 + i * 0.15, type: 'spring', stiffness: 340}}
          >
            <span className="font-mono text-[8px] uppercase tracking-wide text-dark/55">{r}</span>
            <span className="mt-1 font-mono text-[6px] uppercase tracking-wide" style={{color: colors.teal}}>
              How-tos
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Change Pack: fewer tickets in week two. */
function ChangeFewerTicketsVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Week two · help desk
        </span>
      </div>
      <div className="flex-1 min-h-0 p-2 flex flex-col justify-center gap-1.5">
        <motion.div
          className="rounded-sm border border-dark/10 bg-cream px-2 py-1 flex items-center justify-between"
          initial={reduce ? false : {opacity: 0.45, x: -6}}
          whileInView={{opacity: 0.35, x: 0}}
          viewport={{once: true}}
        >
          <span className="font-sans text-[10px] text-dark/45 line-through">How do I log a job?</span>
          <span className="font-mono text-[7px] uppercase text-dark/30">Ticket</span>
        </motion.div>
        <motion.div
          className="rounded-sm border px-2 py-1.5"
          style={{borderColor: `${colors.teal}55`, backgroundColor: `${colors.teal}12`}}
          initial={reduce ? false : {opacity: 0, y: 8, scale: 0.96}}
          whileInView={{opacity: 1, y: 0, scale: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.25, type: 'spring', stiffness: 380}}
        >
          <p className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
            Answered in pack
          </p>
          <p className="font-sans text-[10px] text-dark/70 leading-tight">2-min video · desk one-pager</p>
        </motion.div>
      </div>
    </div>
  )
}

/** Change Pack: materials stay yours for new hires. */
function ChangePackStaysYoursVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Training library
        </span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide text-gold-on-cream">
          Yours
        </span>
      </div>
      <div className="flex-1 min-h-0 p-2 flex flex-col justify-center gap-1">
        {['Audio · what changed', 'Videos · click by click', 'Sheets · daily steps'].map((row, i) => (
          <motion.div
            key={row}
            className="rounded-sm border px-2 py-1 flex items-center justify-between"
            style={{borderColor: `${colors.teal}44`, backgroundColor: `${colors.teal}10`}}
            initial={reduce ? false : {opacity: 0, x: -8}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.1 + i * 0.12, type: 'spring', stiffness: 360}}
          >
            <span className="font-sans text-[10px] text-dark/75">{row}</span>
            <span className="font-mono text-[7px] font-bold uppercase" style={{color: colors.teal}}>
              Keep
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Change Pack: day-30 ownership check-in. */
function ChangeDay30OwnerVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          People side
        </span>
        <motion.span
          className="font-mono text-[7px] font-bold uppercase tracking-wide"
          style={{color: colors.teal}}
          animate={reduce ? undefined : {opacity: [0.5, 1, 0.5]}}
          transition={{duration: 1.2, repeat: Infinity}}
        >
          Named
        </motion.span>
      </div>
      <div className="flex-1 min-h-0 p-2 flex items-center gap-2">
        <motion.div
          className="font-serif text-3xl font-bold tabular-nums leading-none"
          style={{color: colors.teal}}
          animate={reduce ? undefined : {scale: [1, 1.06, 1]}}
          transition={{duration: 1.4, repeat: Infinity}}
        >
          30
        </motion.div>
        <div className="min-w-0">
          <p className="font-sans text-[11px] font-semibold text-dark/80">Day check-in</p>
          <p className="font-mono text-[7px] uppercase tracking-wide text-dark/40 mt-0.5">
            What stuck · what we patch
          </p>
        </div>
      </div>
    </div>
  )
}

const CHANGE_PACK_VISUALS = [
  ChangeDayOnePathVisual,
  ChangeFewerTicketsVisual,
  ChangePackStaysYoursVisual,
  ChangeDay30OwnerVisual,
]

/** Content System: channels stay alive. */
function ContentAliveChannelsVisual({reduce}: VisualProps) {
  const channels = ['LI', 'IG', 'FB', 'EM']
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          This week
        </span>
        <motion.span
          className="font-mono text-[7px] font-bold uppercase tracking-wide text-gold-on-cream"
          animate={reduce ? undefined : {opacity: [0.5, 1, 0.5]}}
          transition={{duration: 1.3, repeat: Infinity}}
        >
          Live
        </motion.span>
      </div>
      <div className="flex-1 min-h-0 grid grid-cols-4 gap-1 p-1.5">
        {channels.map((c, i) => (
          <motion.div
            key={c}
            className="border flex flex-col items-center justify-center min-h-0"
            initial={
              reduce
                ? false
                : {backgroundColor: colors.cream, borderColor: 'rgba(26,26,26,0.12)', y: 8}
            }
            whileInView={{
              backgroundColor: `${colors.teal}16`,
              borderColor: colors.teal,
              y: 0,
            }}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.1 + i * 0.12, type: 'spring', stiffness: 340}}
          >
            <span className="font-mono text-[10px] font-bold" style={{color: colors.teal}}>
              {c}
            </span>
            <span className="font-mono text-[6px] uppercase tracking-wide text-dark/45 mt-0.5">
              Set
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Content System: sounds like you. */
function ContentSoundsLikeYouVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Voice check
        </span>
      </div>
      <div className="flex-1 min-h-0 p-2 flex flex-col justify-center gap-1.5">
        <motion.div
          className="rounded-sm border border-dark/10 bg-cream px-2 py-1"
          initial={reduce ? false : {opacity: 0.4, x: -6}}
          whileInView={{opacity: 0.4, x: 0}}
          viewport={{once: true}}
        >
          <span className="font-sans text-[10px] text-dark/40 line-through">
            Exciting synergy for your journey
          </span>
        </motion.div>
        <motion.div
          className="rounded-sm border px-2 py-1.5"
          style={{borderColor: `${colors.teal}55`, backgroundColor: `${colors.teal}12`}}
          initial={reduce ? false : {opacity: 0, y: 8, scale: 0.96}}
          whileInView={{opacity: 1, y: 0, scale: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.25, type: 'spring', stiffness: 380}}
        >
          <p className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
            Sounds like you
          </p>
          <p className="font-sans text-[10px] text-dark/70 leading-tight">Human-reviewed · batch approved</p>
        </motion.div>
      </div>
    </div>
  )
}

/** Content System: one hour is the whole job. */
function ContentOneHourVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Input
        </span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide text-gold-on-cream">
          1 hour
        </span>
      </div>
      <div className="flex-1 min-h-0 p-2 flex items-center gap-2">
        <motion.div
          className="font-serif text-3xl font-bold tabular-nums leading-none"
          style={{color: colors.teal}}
          animate={reduce ? undefined : {scale: [1, 1.06, 1]}}
          transition={{duration: 1.4, repeat: Infinity}}
        >
          1
        </motion.div>
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[11px] font-semibold text-dark/80">Talk · we produce</p>
          <div className="mt-1.5 flex gap-1">
            {['Post', 'Carousel', 'Caption'].map((label, i) => (
              <motion.span
                key={label}
                className="font-mono text-[6px] uppercase tracking-wide border px-1 py-0.5"
                style={{borderColor: `${colors.teal}55`, color: colors.teal}}
                initial={reduce ? false : {opacity: 0, y: 4}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: reduce ? 0 : 0.2 + i * 0.1}}
              >
                {label}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Content System: monthly report. */
function ContentReportVisual({reduce}: VisualProps) {
  const rows = [
    {label: 'What went out', tag: 'Done'},
    {label: 'What landed', tag: 'Noted'},
    {label: 'What we do more of', tag: 'Next'},
  ]
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-5 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Monthly report
        </span>
      </div>
      <div className="flex-1 min-h-0 p-2 space-y-1">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            className="rounded-sm border px-2 py-1 flex items-center justify-between"
            style={{borderColor: `${colors.teal}44`, backgroundColor: `${colors.teal}10`}}
            initial={reduce ? false : {opacity: 0, x: -8}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.1 + i * 0.12, type: 'spring', stiffness: 360}}
          >
            <span className="font-sans text-[10px] text-dark/75">{row.label}</span>
            <span className="font-mono text-[7px] font-bold uppercase" style={{color: colors.teal}}>
              {row.tag}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const CONTENT_SYSTEM_VISUALS = [
  ContentAliveChannelsVisual,
  ContentSoundsLikeYouVisual,
  ContentOneHourVisual,
  ContentReportVisual,
]

const TEAM_AI_VISUALS = [
  TeamSharedSetupVisual,
  TeamSafeDataVisual,
  TeamPromptLibraryVisual,
  TeamSticksVisual,
]

/** Categories / hours / services fill in. */
function CategoriesFillVisual({reduce}: VisualProps) {
  const items = ['Primary category', 'Services', 'Hours', 'Attributes']
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70 p-2.5">
      <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/40 mb-1.5">
        Profile fields
      </p>
      <div className="space-y-1">
        {items.map((label, i) => (
          <motion.div
            key={label}
            className="flex items-center justify-between border px-2 py-1"
            style={{
              borderColor: `${FUNNEL_COLOURS.ink}12`,
              backgroundColor: FUNNEL_COLOURS.ground,
            }}
            initial={reduce ? false : {opacity: 0, x: -8}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : i * 0.14, duration: 0.35}}
          >
            <span className="font-sans text-[10px]" style={{color: FUNNEL_COLOURS.ink}}>
              {label}
            </span>
            <motion.span
              className="font-mono text-[8px] font-bold uppercase tracking-widest"
              style={{color: FUNNEL_COLOURS.goldDeep}}
              initial={{opacity: 0, scale: 0.8}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{delay: reduce ? 0 : 0.35 + i * 0.14}}
            >
              Set
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Empty description → selling copy appears. */
function DescriptionSellsVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70 p-2.5 flex flex-col">
      <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/40 mb-1.5">
        Business description
      </p>
      <motion.div
        className="flex-1 border px-2 py-1.5 overflow-hidden"
        style={{
          borderColor: `${FUNNEL_COLOURS.ink}14`,
          backgroundColor: FUNNEL_COLOURS.ground,
        }}
        initial={reduce ? false : {opacity: 0.4}}
        whileInView={{opacity: 1}}
        viewport={{once: true}}
      >
        <motion.p
          className="font-sans text-[11px] leading-snug"
          style={{color: FUNNEL_COLOURS.ink}}
          initial={reduce ? false : {opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.35, duration: 0.5}}
        >
          Local plumbers for Bondi and surrounds. Same-day call-outs, honest quotes, work you can
          see.
        </motion.p>
      </motion.div>
      <motion.p
        className="mt-1.5 font-mono text-[7px] uppercase tracking-widest"
        style={{color: FUNNEL_COLOURS.goldDeep}}
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true}}
        transition={{delay: reduce ? 0 : 0.7}}
      >
        Terms customers search
      </motion.p>
    </div>
  )
}

/** Review link + honest ask. */
function ReviewHabitVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70 p-2.5 flex flex-col justify-between">
      <motion.div
        className="border px-2 py-1.5"
        style={{
          borderColor: `${FUNNEL_COLOURS.gold}55`,
          backgroundColor: `${FUNNEL_COLOURS.gold}14`,
        }}
        initial={reduce ? false : {opacity: 0, y: 6}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.35}}
      >
        <p
          className="font-mono text-[7px] uppercase tracking-widest"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          Review link
        </p>
        <p className="font-sans text-[10px] truncate" style={{color: FUNNEL_COLOURS.ink}}>
          g.page/r/your-business/review
        </p>
      </motion.div>
      <motion.div
        className="rounded-2xl rounded-bl-sm border px-2.5 py-1.5 self-start max-w-[92%]"
        style={{
          borderColor: `${FUNNEL_COLOURS.ink}14`,
          backgroundColor: FUNNEL_COLOURS.ground,
        }}
        initial={reduce ? false : {opacity: 0, y: 8}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{delay: reduce ? 0 : 0.45, duration: 0.35}}
      >
        <p className="font-sans text-[10px] leading-snug" style={{color: FUNNEL_COLOURS.ink}}>
          If we did a good job, leave a quick Google review here.
        </p>
      </motion.div>
    </div>
  )
}

/** Day 1 audit → Day 2 done. */
function TwoDayProfileVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70 p-2.5 flex items-center gap-2">
      {[
        {day: 'Day 1', text: 'Audit'},
        {day: 'Day 2', text: 'Overhaul'},
      ].map((item, i) => (
        <motion.div
          key={item.day}
          className="flex-1 border px-2 py-3 text-center"
          style={{
            borderColor: i === 1 ? `${FUNNEL_COLOURS.gold}66` : `${FUNNEL_COLOURS.ink}14`,
            backgroundColor: i === 1 ? `${FUNNEL_COLOURS.gold}18` : FUNNEL_COLOURS.ground,
          }}
          initial={reduce ? false : {opacity: 0, y: 10}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : i * 0.35, duration: 0.4}}
        >
          <p className="font-mono text-[8px] uppercase tracking-widest text-dark/40">{item.day}</p>
          <p className="font-serif text-sm mt-1" style={{color: FUNNEL_COLOURS.ink}}>
            {item.text}
          </p>
          {i === 1 ? (
            <motion.p
              className="font-mono text-[8px] font-bold uppercase tracking-widest mt-1"
              style={{color: FUNNEL_COLOURS.goldDeep}}
              initial={{opacity: 0}}
              whileInView={{opacity: 1}}
              viewport={{once: true}}
              transition={{delay: reduce ? 0 : 0.7}}
            >
              Done
            </motion.p>
          ) : null}
        </motion.div>
      ))}
    </div>
  )
}

const PROFILE_VISUALS = [
  CategoriesFillVisual,
  DescriptionSellsVisual,
  ReviewHabitVisual,
  TwoDayProfileVisual,
]

/** Job stamped complete → SMS ask fires. */
function JobDoneAskVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70 p-2.5 flex flex-col justify-between">
      <motion.div
        className="self-start rounded-md border px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-wider"
        style={{
          borderColor: `${FUNNEL_COLOURS.gold}66`,
          backgroundColor: `${FUNNEL_COLOURS.gold}18`,
          color: FUNNEL_COLOURS.goldDeep,
        }}
        initial={reduce ? false : {opacity: 0, scale: 0.9}}
        whileInView={{opacity: 1, scale: 1}}
        viewport={{once: true}}
      >
        Job complete
      </motion.div>
      <motion.div
        className="rounded-2xl rounded-bl-sm border px-2.5 py-2 self-start max-w-[90%]"
        style={{
          borderColor: `${FUNNEL_COLOURS.ink}14`,
          backgroundColor: FUNNEL_COLOURS.ground,
        }}
        initial={reduce ? false : {opacity: 0, y: 12, x: -6}}
        whileInView={{opacity: 1, y: 0, x: 0}}
        viewport={{once: true}}
        transition={{delay: reduce ? 0 : 0.35, duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
      >
        <div className="flex gap-1 mb-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1 w-1 rounded-full"
              style={{backgroundColor: FUNNEL_COLOURS.accent}}
              animate={reduce ? undefined : {opacity: [0.3, 1, 0.3]}}
              transition={reduce ? undefined : {duration: 1.2, repeat: Infinity, delay: i * 0.15}}
            />
          ))}
        </div>
        <div className="h-1.5 w-28 rounded-sm mb-1" style={{backgroundColor: `${FUNNEL_COLOURS.ink}22`}} />
        <div className="h-1.5 w-16 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.accent}} />
      </motion.div>
    </div>
  )
}

/** Robot script fades. Your short voice bubble lands. */
function YourVoiceVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70 p-2.5">
      <motion.div
        className="absolute inset-x-2.5 top-2.5 border border-dashed px-2 py-1.5"
        style={{borderColor: `${FUNNEL_COLOURS.ink}22`, backgroundColor: `${FUNNEL_COLOURS.ink}05`}}
        initial={reduce ? false : {opacity: 0.7}}
        whileInView={{opacity: 0.25, y: -4}}
        viewport={{once: true}}
        transition={{delay: reduce ? 0 : 0.4, duration: 0.5}}
      >
        <div className="h-1.5 w-full rounded-sm mb-1" style={{backgroundColor: `${FUNNEL_COLOURS.ink}16`}} />
        <div className="h-1.5 w-4/5 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}12`}} />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.5}}
        >
          <span
            className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5"
            style={{backgroundColor: `${FUNNEL_COLOURS.accent}22`, color: FUNNEL_COLOURS.accent}}
          >
            Script cut
          </span>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute bottom-2.5 left-2.5 right-2.5 rounded-2xl rounded-bl-sm border px-2.5 py-2"
        style={{
          borderColor: `${FUNNEL_COLOURS.gold}55`,
          backgroundColor: `${FUNNEL_COLOURS.gold}14`,
        }}
        initial={reduce ? false : {opacity: 0, y: 10}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{delay: reduce ? 0 : 0.65, duration: 0.4}}
      >
        <p className="font-mono text-[7px] uppercase tracking-widest mb-1" style={{color: FUNNEL_COLOURS.goldDeep}}>
          Your voice
        </p>
        <div className="h-1.5 w-24 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}28`}} />
      </motion.div>
    </div>
  )
}

/** QR tiles fill in. Short link bar completes. */
function QrLinkReadyVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70 p-2.5 flex items-center gap-3">
      <div
        className="h-[72px] w-[72px] shrink-0 rounded-sm border grid grid-cols-3 grid-rows-3 gap-0.5 p-1.5"
        style={{borderColor: `${FUNNEL_COLOURS.ink}18`}}
        aria-hidden
      >
        {Array.from({length: 9}).map((_, i) => (
          <motion.div
            key={i}
            className="rounded-[1px]"
            style={{
              backgroundColor: i === 4 ? 'transparent' : FUNNEL_COLOURS.ink,
            }}
            initial={reduce ? false : {opacity: 0, scale: 0.5}}
            whileInView={{opacity: i === 4 ? 0 : i % 2 === 0 ? 0.9 : 0.45, scale: 1}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : i * 0.05, duration: 0.25}}
          />
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[7px] uppercase tracking-widest text-dark/40 mb-2">Short link</p>
        <div className="h-2 w-full bg-dark/10 overflow-hidden rounded-full">
          <motion.div
            className="h-full"
            style={{backgroundColor: FUNNEL_COLOURS.goldDeep}}
            initial={{width: '0%'}}
            whileInView={{width: '100%'}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1]}}
          />
        </div>
        <motion.p
          className="mt-2 font-mono text-[8px] font-bold uppercase tracking-widest"
          style={{color: FUNNEL_COLOURS.goldDeep}}
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.9}}
        >
          Van · desk · invoice
        </motion.p>
      </div>
    </div>
  )
}

/** Good and bad reply cards flip in. */
function ReplyTemplatesVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white/70 p-2.5 flex gap-2">
      {[
        {label: 'Good', color: '#1B6B3A', delay: 0},
        {label: 'Tough', color: FUNNEL_COLOURS.accent, delay: 0.28},
      ].map((card) => (
        <motion.div
          key={card.label}
          className="flex-1 border px-2 py-2 flex flex-col justify-between"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}14`,
            backgroundColor: FUNNEL_COLOURS.ground,
          }}
          initial={reduce ? false : {opacity: 0, rotateY: -40}}
          whileInView={{opacity: 1, rotateY: 0}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : card.delay, duration: 0.45}}
        >
          <p
            className="font-mono text-[8px] font-bold uppercase tracking-widest"
            style={{color: card.color}}
          >
            {card.label}
          </p>
          <div className="space-y-1">
            <div className="h-1.5 w-full rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}18`}} />
            <div className="h-1.5 w-3/4 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}12`}} />
          </div>
          <motion.span
            className="font-mono text-[8px] font-bold uppercase tracking-widest self-end"
            style={{color: FUNNEL_COLOURS.goldDeep}}
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : card.delay + 0.35}}
          >
            Ready
          </motion.span>
        </motion.div>
      ))}
    </div>
  )
}

const REVIEWS_VISUALS = [
  JobDoneAskVisual,
  YourVoiceVisual,
  QrLinkReadyVisual,
  ReplyTemplatesVisual,
]

/** Empty SERP slot fills with your listing. */
function FoundAgainVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-2.5 flex flex-col gap-1.5">
      <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/40">Results</p>
      {['Studio Hale', 'North Shore Atelier'].map((name) => (
        <div
          key={name}
          className="h-5 px-2 flex items-center"
          style={{backgroundColor: `${FUNNEL_COLOURS.ink}06`}}
        >
          <span className="font-sans text-[10px]" style={{color: FUNNEL_COLOURS.muted}}>
            {name}
          </span>
        </div>
      ))}
      <motion.div
        className="h-6 px-2 flex items-center border"
        style={{
          borderColor: FUNNEL_COLOURS.gold,
          backgroundColor: `${FUNNEL_COLOURS.gold}18`,
        }}
        initial={reduce ? false : {opacity: 0, y: 8, scale: 0.96}}
        whileInView={{opacity: 1, y: 0, scale: 1}}
        viewport={{once: true}}
        transition={{delay: reduce ? 0 : 0.35, duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
      >
        <span className="font-sans text-[10px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
          You · back in results
        </span>
      </motion.div>
    </div>
  )
}

/** Search Console line climbs, badge flips to Indexed. */
function ConsoleWatchVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-2.5 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/40">
          Search Console
        </p>
        <motion.span
          className="font-mono text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5"
          style={{backgroundColor: FUNNEL_COLOURS.gold, color: FUNNEL_COLOURS.ink}}
          initial={reduce ? false : {opacity: 0.5}}
          whileInView={{backgroundColor: FUNNEL_COLOURS.gold}}
          viewport={{once: true}}
        >
          Indexed
        </motion.span>
      </div>
      <svg viewBox="0 0 220 56" className="w-full flex-1" aria-hidden>
        <line
          x1="8"
          y1="48"
          x2="212"
          y2="48"
          stroke={`${FUNNEL_COLOURS.ink}22`}
          strokeWidth="1"
        />
        <motion.polyline
          fill="none"
          stroke={FUNNEL_COLOURS.goldDeep}
          strokeWidth="2.5"
          strokeLinecap="square"
          points="8,44 40,42 80,36 120,26 160,16 212,10"
          initial={reduce ? false : {pathLength: 0}}
          whileInView={{pathLength: 1}}
          viewport={{once: true}}
          transition={{duration: 1.1, ease: [0.16, 1, 0.3, 1]}}
        />
      </svg>
    </div>
  )
}

/** Habit card: what broke + how to catch it. */
function StaysFixedVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-2.5 flex flex-col justify-center gap-2">
      {[
        {label: 'What broke', delay: 0},
        {label: 'How to catch it next time', delay: 0.25},
      ].map((row) => (
        <motion.div
          key={row.label}
          className="flex items-center justify-between border px-2 py-1.5"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}12`,
            backgroundColor: FUNNEL_COLOURS.ground,
          }}
          initial={reduce ? false : {opacity: 0, x: -8}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : row.delay, duration: 0.35}}
        >
          <span className="font-sans text-[10px]" style={{color: FUNNEL_COLOURS.ink}}>
            {row.label}
          </span>
          <motion.span
            className="font-mono text-[8px] font-bold uppercase tracking-widest"
            style={{color: FUNNEL_COLOURS.goldDeep}}
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : row.delay + 0.2}}
          >
            Written
          </motion.span>
        </motion.div>
      ))}
    </div>
  )
}

/** Day 1 fix, Day 2–3 fix, then monitoring and improving. */
function ThreeDayWatchVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-2.5 flex flex-col justify-center gap-2">
      <div className="flex gap-1.5">
        {[
          {day: 'Day 1', text: 'Fix'},
          {day: 'Day 2–3', text: 'Fix'},
        ].map((item, i) => (
          <motion.div
            key={item.day}
            className="flex-1 border px-2 py-2 text-center"
            style={{
              borderColor: `${FUNNEL_COLOURS.ink}14`,
              backgroundColor: FUNNEL_COLOURS.ground,
            }}
            initial={reduce ? false : {opacity: 0, y: 8}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : i * 0.2, duration: 0.35}}
          >
            <p className="font-mono text-[8px] font-bold uppercase tracking-widest text-dark/45">
              {item.day}
            </p>
            <p className="font-sans text-[9px] mt-0.5" style={{color: FUNNEL_COLOURS.ink}}>
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="border px-2 py-2 origin-left"
        style={{
          borderColor: `${FUNNEL_COLOURS.gold}66`,
          backgroundColor: `${FUNNEL_COLOURS.gold}18`,
        }}
        initial={reduce ? false : {opacity: 0, scaleX: 0.6}}
        whileInView={{opacity: 1, scaleX: 1}}
        viewport={{once: true}}
        transition={{delay: reduce ? 0 : 0.45, duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
      >
        <p
          className="font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          Monitoring and improving · 30 days
        </p>
      </motion.div>
    </div>
  )
}

const SEARCH_VISUALS = [
  FoundAgainVisual,
  ConsoleWatchVisual,
  StaysFixedVisual,
  ThreeDayWatchVisual,
]

/** Ad promise → matched page: cursor travels, CTA slams. */
function AdPromiseMatchVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-2.5">
      <div className="flex gap-2 h-full">
        <div
          className="flex-1 border px-2 py-2 flex flex-col justify-between"
          style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.ground}}
        >
          <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/40">The ad</p>
          <p className="font-serif text-[11px] font-bold leading-snug" style={{color: FUNNEL_COLOURS.ink}}>
            Free consult this week
          </p>
          <motion.div
            className="h-5 rounded flex items-center justify-center font-mono text-[7px] font-bold uppercase tracking-wider text-white"
            style={{backgroundColor: FUNNEL_COLOURS.accent}}
            animate={reduce ? undefined : {scale: [1, 0.92, 1.06, 1]}}
            transition={reduce ? undefined : {duration: 2.8, repeat: Infinity, times: [0, 0.35, 0.45, 1]}}
          >
            Click
          </motion.div>
        </div>
        <div className="flex items-center">
          <motion.span
            className="font-mono text-base font-bold"
            style={{color: FUNNEL_COLOURS.accent}}
            animate={reduce ? undefined : {x: [0, 6, 0], scale: [1, 1.2, 1]}}
            transition={reduce ? undefined : {duration: 1.4, repeat: Infinity}}
          >
            →
          </motion.span>
        </div>
        <div
          className="flex-1 border px-2 py-2 flex flex-col justify-between"
          style={{borderColor: `${FUNNEL_COLOURS.goldDeep}50`, backgroundColor: FUNNEL_COLOURS.surfaceGold}}
        >
          <p className="font-mono text-[7px] uppercase tracking-[0.16em]" style={{color: FUNNEL_COLOURS.goldDeep}}>
            The door
          </p>
          <motion.p
            className="font-serif text-[11px] font-bold leading-snug"
            style={{color: FUNNEL_COLOURS.ink}}
            animate={reduce ? undefined : {opacity: [0.35, 1, 1, 0.35]}}
            transition={reduce ? undefined : {duration: 2.8, repeat: Infinity, times: [0, 0.4, 0.85, 1]}}
          >
            Free consult this week
          </motion.p>
          <motion.div
            className="h-5 rounded flex items-center justify-center font-mono text-[7px] font-bold uppercase tracking-wider text-white"
            style={{backgroundColor: FUNNEL_COLOURS.accent}}
            animate={
              reduce
                ? undefined
                : {
                    scale: [1, 1, 1.1, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(226,30,63,0)',
                      '0 0 0 0 rgba(226,30,63,0)',
                      '0 0 0 8px rgba(226,30,63,0.28)',
                      '0 0 0 0 rgba(226,30,63,0)',
                    ],
                  }
            }
            transition={reduce ? undefined : {duration: 2.8, repeat: Infinity, times: [0, 0.5, 0.65, 1]}}
          >
            Book
          </motion.div>
        </div>
      </div>
      {/* Cursor path: ad CTA → door CTA */}
      <motion.div
        className="pointer-events-none absolute z-10 h-3.5 w-3.5 rounded-full border-2 bg-white/80"
        style={{borderColor: FUNNEL_COLOURS.ink, top: 78, left: '18%'}}
        animate={
          reduce
            ? undefined
            : {
                left: ['18%', '18%', '78%', '78%', '18%'],
                top: [78, 78, 78, 78, 78],
                scale: [1, 0.75, 1, 0.75, 1],
              }
        }
        transition={reduce ? undefined : {duration: 2.8, repeat: Infinity, times: [0, 0.32, 0.55, 0.7, 1]}}
        aria-hidden
      />
    </div>
  )
}

/** Conversion signals stream up into ads — count ticks. */
function AdsSmarterVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-2.5">
      <div className="flex items-center justify-between mb-1.5">
        <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/40">Ad platform</p>
        <motion.span
          className="font-mono text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5"
          style={{backgroundColor: FUNNEL_COLOURS.gold, color: FUNNEL_COLOURS.ink}}
          animate={reduce ? undefined : {scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7]}}
          transition={reduce ? undefined : {duration: 1.2, repeat: Infinity}}
        >
          Learning
        </motion.span>
      </div>
      <div className="relative h-[78px]">
        <div
          className="absolute top-0 left-0 right-0 h-7 border flex items-center justify-between px-2 font-mono text-[8px] uppercase tracking-widest"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}14`,
            backgroundColor: FUNNEL_COLOURS.ink,
            color: FUNNEL_COLOURS.onInk,
          }}
        >
          <span>Ads</span>
          <motion.span
            animate={reduce ? undefined : {opacity: [0.4, 1, 0.4]}}
            transition={reduce ? undefined : {duration: 1.5, repeat: Infinity}}
          >
            + signals
          </motion.span>
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: i % 2 === 0 ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.gold,
              left: `${18 + i * 14}%`,
            }}
            animate={
              reduce
                ? {top: 40, opacity: 0.45}
                : {top: [62, 12], opacity: [0, 1, 0], scale: [0.6, 1.15, 0.7]}
            }
            transition={
              reduce
                ? undefined
                : {duration: 1.6, repeat: Infinity, delay: i * 0.28, ease: 'easeOut'}
            }
          />
        ))}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 border flex items-center justify-center gap-2 font-mono text-[8px] uppercase tracking-widest"
          style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.ground}}
        >
          <span>Conversion</span>
          <motion.span
            className="font-bold tabular-nums"
            style={{color: FUNNEL_COLOURS.accent}}
            animate={reduce ? undefined : {scale: [1, 1.25, 1]}}
            transition={reduce ? undefined : {duration: 1.6, repeat: Infinity}}
          >
            +1
          </motion.span>
        </div>
      </div>
    </div>
  )
}

/** Domain types in, then lock stamp slams. */
function OwnDomainVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-2.5 flex flex-col justify-center items-center gap-2.5">
      <motion.div
        className="w-full border px-3 py-3 text-center"
        style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.ground}}
        animate={reduce ? undefined : {y: [2, 0, 0, 2]}}
        transition={reduce ? undefined : {duration: 3, repeat: Infinity, times: [0, 0.2, 0.85, 1]}}
      >
        <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-dark/40 mb-1">Your domain</p>
        <motion.p
          className="font-serif text-sm font-bold mx-auto overflow-hidden whitespace-nowrap"
          style={{color: FUNNEL_COLOURS.ink}}
          animate={
            reduce
              ? undefined
              : {clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 0)', 'inset(0 100% 0 0)']}
          }
          transition={reduce ? undefined : {duration: 3, repeat: Infinity, times: [0, 0.35, 0.8, 1], ease: 'easeInOut'}}
        >
          you.com.au/offer
        </motion.p>
      </motion.div>
      <motion.span
        className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1.5"
        style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
        animate={
          reduce
            ? undefined
            : {
                scale: [0.6, 1.12, 1, 1, 0.6],
                rotate: [-8, 4, 0, 0, -8],
                opacity: [0, 1, 1, 1, 0],
              }
        }
        transition={reduce ? undefined : {duration: 3, repeat: Infinity, times: [0, 0.4, 0.5, 0.85, 1]}}
      >
        Locked · yours
      </motion.span>
    </div>
  )
}

/** Day 1 → Day 2 progress fill, then LIVE badge. */
function TwoDayLiveVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-2.5 flex flex-col justify-center gap-2.5">
      <div className="flex gap-1.5">
        {[
          {day: 'Day 1', text: 'Draft'},
          {day: 'Day 2', text: 'Live'},
        ].map((item, i) => (
          <motion.div
            key={item.day}
            className="flex-1 border px-2 py-2 text-center relative overflow-hidden"
            style={{
              borderColor: i === 1 ? `${FUNNEL_COLOURS.accent}55` : `${FUNNEL_COLOURS.ink}14`,
              backgroundColor: FUNNEL_COLOURS.ground,
            }}
          >
            <motion.div
              className="absolute inset-0 origin-left"
              style={{backgroundColor: i === 1 ? `${FUNNEL_COLOURS.accent}18` : `${FUNNEL_COLOURS.gold}22`}}
              animate={
                reduce
                  ? {scaleX: 1}
                  : i === 0
                    ? {scaleX: [0, 1, 1, 0]}
                    : {scaleX: [0, 0, 1, 1, 0]}
              }
              transition={
                reduce
                  ? undefined
                  : {
                      duration: 3.2,
                      repeat: Infinity,
                      times: i === 0 ? [0, 0.35, 0.85, 1] : [0, 0.35, 0.55, 0.85, 1],
                      ease: 'easeInOut',
                    }
              }
            />
            <p className="relative font-mono text-[8px] font-bold uppercase tracking-widest text-dark/45">
              {item.day}
            </p>
            <p className="relative mt-1 font-serif text-sm font-bold" style={{color: FUNNEL_COLOURS.ink}}>
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="h-1.5 w-full bg-dark/10 overflow-hidden rounded-full">
        <motion.div
          className="h-full rounded-full"
          style={{backgroundColor: FUNNEL_COLOURS.accent}}
          animate={reduce ? {width: '100%'} : {width: ['0%', '100%', '100%', '0%']}}
          transition={reduce ? undefined : {duration: 3.2, repeat: Infinity, times: [0, 0.55, 0.85, 1], ease: 'easeInOut'}}
        />
      </div>
      <motion.p
        className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-center"
        style={{color: FUNNEL_COLOURS.goldDeep}}
        animate={reduce ? undefined : {opacity: [0, 0, 1, 1, 0], scale: [0.9, 0.9, 1.05, 1, 0.9]}}
        transition={reduce ? undefined : {duration: 3.2, repeat: Infinity, times: [0, 0.5, 0.6, 0.85, 1]}}
      >
        Tracking verified
      </motion.p>
    </div>
  )
}

const LANDING_VISUALS = [
  AdPromiseMatchVisual,
  AdsSmarterVisual,
  OwnDomainVisual,
  TwoDayLiveVisual,
]

/** Hot intent → Book now tap. */
function BookingHotTapVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-3 flex flex-col justify-between">
      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-dark/40">Ready customer</p>
      <div className="space-y-2">
        <p className="font-serif text-sm font-bold" style={{color: FUNNEL_COLOURS.ink}}>
          They want a time now
        </p>
        <motion.span
          className="inline-flex font-mono text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1.5"
          style={{backgroundColor: FUNNEL_COLOURS.accent, color: FUNNEL_COLOURS.onInk}}
          animate={reduce ? undefined : {scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85]}}
          transition={reduce ? undefined : {duration: 1.5, repeat: Infinity}}
        >
          Book now
        </motion.span>
      </div>
    </div>
  )
}

/** Calendar stays source of truth. */
function BookingCalendarTruthVisual({reduce}: VisualProps) {
  const slots = ['9:00', '10:30', '14:00']
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-3">
      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-dark/40 mb-2">Your calendar</p>
      <div className="space-y-1.5">
        {slots.map((slot, i) => (
          <motion.div
            key={slot}
            className="flex items-center justify-between border px-2 py-1"
            style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.ground}}
            animate={
              reduce
                ? undefined
                : {opacity: [0.45, 1, 0.45], borderColor: [`${FUNNEL_COLOURS.ink}14`, `${FUNNEL_COLOURS.goldDeep}55`, `${FUNNEL_COLOURS.ink}14`]}
            }
            transition={reduce ? undefined : {duration: 2.4, repeat: Infinity, delay: i * 0.25}}
          >
            <span className="font-mono text-[10px]" style={{color: FUNNEL_COLOURS.ink}}>
              {slot}
            </span>
            <span
              className="font-mono text-[8px] font-bold uppercase tracking-[0.12em]"
              style={{color: i === 1 ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.goldDeep}}
            >
              {i === 1 ? 'New' : 'Held'}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Empty chair → text chase. */
function BookingNoShowVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-3 flex flex-col justify-center gap-2">
      <div className="flex items-center gap-2">
        <motion.span
          className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] px-1.5 py-1"
          style={{backgroundColor: `${FUNNEL_COLOURS.accent}22`, color: FUNNEL_COLOURS.accent}}
          animate={reduce ? undefined : {opacity: [1, 0.35, 1]}}
          transition={reduce ? undefined : {duration: 1.8, repeat: Infinity}}
        >
          Empty slot
        </motion.span>
        <motion.span
          className="font-mono text-[10px] text-dark/35"
          animate={reduce ? undefined : {x: [0, 4, 0], opacity: [0.3, 1, 0.3]}}
          transition={reduce ? undefined : {duration: 1.4, repeat: Infinity}}
        >
          →
        </motion.span>
        <motion.span
          className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] px-1.5 py-1"
          style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
          animate={reduce ? undefined : {scale: [0.92, 1, 0.92]}}
          transition={reduce ? undefined : {duration: 1.8, repeat: Infinity, delay: 0.4}}
        >
          Text sent
        </motion.span>
      </div>
      <p className="font-serif text-sm font-bold" style={{color: FUNNEL_COLOURS.ink}}>
        Fewer quiet no-shows
      </p>
    </div>
  )
}

/** Two to three day delivery. */
function BookingDaysVisual({reduce}: VisualProps) {
  const days = [
    {n: '01', label: 'Access'},
    {n: '02', label: 'Wire'},
    {n: '03', label: 'Live'},
  ]
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-3">
      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-dark/40 mb-3">Delivery</p>
      <div className="grid grid-cols-3 gap-2">
        {days.map((day, i) => (
          <motion.div
            key={day.n}
            className="border px-1.5 py-2 text-center"
            style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.ground}}
            initial={reduce ? false : {opacity: 0, y: 8}}
            animate={reduce ? undefined : {opacity: [0.4, 1, 0.4], y: [4, 0, 4]}}
            transition={reduce ? undefined : {duration: 2.2, repeat: Infinity, delay: i * 0.3}}
          >
            <p className="font-mono text-[10px] font-bold" style={{color: FUNNEL_COLOURS.accent}}>
              {day.n}
            </p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em]" style={{color: FUNNEL_COLOURS.ink}}>
              {day.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const BOOKING_VISUALS = [
  BookingHotTapVisual,
  BookingCalendarTruthVisual,
  BookingNoShowVisual,
  BookingDaysVisual,
]

/** No design spiral: font chaos fades, interview → we build. */
function NoDesignSpiralVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-2.5">
      <div className="grid grid-cols-2 gap-2 h-full">
        <div
          className="relative rounded-sm border overflow-hidden px-2 py-1.5"
          style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.ground}}
        >
          <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40 mb-1">
            Font pick
          </p>
          {['Serif?', 'Sans?', 'Bold?', 'Script?'].map((label, i) => (
            <motion.p
              key={label}
              className="font-serif text-[10px] leading-tight truncate"
              style={{color: FUNNEL_COLOURS.ink}}
              animate={
                reduce
                  ? {opacity: 0.25, x: 0}
                  : {opacity: [0.85, 0.85, 0.15, 0.15], x: [0, 0, -4, -4]}
              }
              transition={
                reduce
                  ? undefined
                  : {duration: 3.2, repeat: Infinity, delay: i * 0.08, times: [0, 0.35, 0.55, 1]}
              }
            >
              {label}
            </motion.p>
          ))}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{backgroundColor: `${FUNNEL_COLOURS.ground}cc`}}
            animate={reduce ? {opacity: 0.9} : {opacity: [0, 0, 1, 1, 0]}}
            transition={reduce ? undefined : {duration: 3.2, repeat: Infinity, times: [0, 0.4, 0.5, 0.9, 1]}}
          >
            <span
              className="font-mono text-[8px] font-bold uppercase tracking-[0.16em]"
              style={{color: FUNNEL_COLOURS.accent}}
            >
              Skip
            </span>
          </motion.div>
        </div>
        <div
          className="rounded-sm border px-2 py-1.5 flex flex-col justify-between"
          style={{borderColor: `${FUNNEL_COLOURS.goldDeep}40`, backgroundColor: `${FUNNEL_COLOURS.goldDeep}0A`}}
        >
          <p
            className="font-mono text-[7px] uppercase tracking-[0.14em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Brief
          </p>
          <motion.div
            className="space-y-1"
            initial={reduce ? false : {opacity: 0, y: 6}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
          >
            <div className="h-1.5 rounded-sm" style={{width: '80%', backgroundColor: `${FUNNEL_COLOURS.ink}20`}} />
            <div className="h-1.5 rounded-sm" style={{width: '60%', backgroundColor: `${FUNNEL_COLOURS.ink}14`}} />
            <motion.div
              className="mt-1 h-5 rounded-sm flex items-center justify-center font-mono text-[7px] font-bold uppercase tracking-wider text-white"
              style={{backgroundColor: FUNNEL_COLOURS.goldDeep}}
              animate={reduce ? undefined : {scale: [1, 1.04, 1]}}
              transition={reduce ? undefined : {duration: 1.8, repeat: Infinity}}
            >
              We build
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/** Looks like a business still going: clean phone site, trust cue. */
function StillGoingSiteVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-2.5 flex items-center justify-center gap-3">
      <div
        className="relative w-[72px] h-[98px] rounded-[10px] border overflow-hidden shrink-0"
        style={{borderColor: `${FUNNEL_COLOURS.ink}22`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div className="h-2.5 border-b flex items-center justify-center" style={{borderColor: `${FUNNEL_COLOURS.ink}10`}}>
          <span className="h-1 w-6 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.ink}18`}} />
        </div>
        <div className="p-1.5 space-y-1">
          <motion.div
            className="h-2 rounded-sm"
            style={{width: '75%', backgroundColor: FUNNEL_COLOURS.ink}}
            animate={reduce ? undefined : {opacity: [0.55, 1, 0.55]}}
            transition={reduce ? undefined : {duration: 2, repeat: Infinity}}
          />
          <div className="h-1 w-full rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}12`}} />
          <div className="h-1 rounded-sm" style={{width: '83%', backgroundColor: `${FUNNEL_COLOURS.ink}10`}} />
          <div
            className="mt-1 h-8 rounded-sm border"
            style={{borderColor: `${FUNNEL_COLOURS.ink}10`, backgroundColor: `${FUNNEL_COLOURS.gold}18`}}
          />
          <motion.div
            className="h-4 rounded-sm flex items-center justify-center font-mono text-[6px] font-bold uppercase tracking-wider text-white"
            style={{backgroundColor: FUNNEL_COLOURS.accent}}
            animate={reduce ? undefined : {scale: [1, 1.05, 1]}}
            transition={reduce ? undefined : {duration: 1.6, repeat: Infinity}}
          >
            Enquire
          </motion.div>
        </div>
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/40">On a phone</p>
        <p className="font-serif text-sm font-bold leading-snug" style={{color: FUNNEL_COLOURS.ink}}>
          Clean. Fast. Clear.
        </p>
        <motion.span
          className="inline-flex font-mono text-[8px] font-bold uppercase tracking-[0.14em] px-2 py-1"
          style={{
            color: '#1a7a4c',
            backgroundColor: 'rgba(26,122,76,0.12)',
            border: '1px solid rgba(26,122,76,0.28)',
          }}
          animate={reduce ? undefined : {opacity: [0.6, 1, 0.6]}}
          transition={reduce ? undefined : {duration: 2, repeat: Infinity}}
        >
          Looks open
        </motion.span>
      </div>
    </div>
  )
}

/** Boring tech is ours: hosting / security / updates handled. */
function BoringTechOursVisual({reduce}: VisualProps) {
  const rows = [
    {label: 'Hosting', status: 'Ours'},
    {label: 'Security', status: 'Ours'},
    {label: 'Updates', status: 'Ours'},
    {label: 'Passwords', status: 'Not yours'},
  ]
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-2.5">
      <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/40 mb-1.5">
        Technical end
      </p>
      <div className="space-y-1.5">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            className="flex items-center justify-between rounded-sm border px-2 py-1"
            style={{
              borderColor: `${FUNNEL_COLOURS.ink}12`,
              backgroundColor: i === 3 ? `${FUNNEL_COLOURS.accent}08` : FUNNEL_COLOURS.ground,
            }}
            initial={reduce ? false : {opacity: 0, x: 8}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{duration: 0.35, delay: reduce ? 0 : i * 0.08}}
          >
            <span className="font-sans text-[10px]" style={{color: FUNNEL_COLOURS.ink}}>
              {row.label}
            </span>
            <motion.span
              className="font-mono text-[8px] font-bold uppercase tracking-[0.12em]"
              style={{
                color: i === 3 ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.goldDeep,
              }}
              animate={
                reduce
                  ? undefined
                  : i < 3
                    ? {opacity: [0.55, 1, 0.55]}
                    : {opacity: [0.7, 1, 0.7]}
              }
              transition={reduce ? undefined : {duration: 1.8, repeat: Infinity, delay: i * 0.1}}
            >
              {row.status}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Enquiries land somewhere real: form → email. */
function EnquiryToEmailVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full overflow-hidden border border-dark/12 bg-white/70 p-2.5">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center h-full">
        <div
          className="rounded-sm border h-full px-2 py-1.5 flex flex-col gap-1"
          style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.ground}}
        >
          <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/40">Form</p>
          <div className="h-2 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}12`}} />
          <div className="h-2 rounded-sm" style={{width: '80%', backgroundColor: `${FUNNEL_COLOURS.ink}10`}} />
          <div className="h-3 rounded-sm" style={{width: '60%', backgroundColor: `${FUNNEL_COLOURS.ink}08`}} />
          <motion.div
            className="mt-auto h-5 rounded-sm flex items-center justify-center font-mono text-[7px] font-bold uppercase tracking-wider text-white"
            style={{backgroundColor: FUNNEL_COLOURS.accent}}
            animate={
              reduce
                ? undefined
                : {
                    scale: [1, 1, 0.94, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(226,30,63,0)',
                      '0 0 0 0 rgba(226,30,63,0)',
                      '0 0 0 6px rgba(226,30,63,0.2)',
                      '0 0 0 0 rgba(226,30,63,0)',
                    ],
                  }
            }
            transition={reduce ? undefined : {duration: 2.4, repeat: Infinity, times: [0, 0.45, 0.6, 1]}}
          >
            Send
          </motion.div>
        </div>
        <motion.span
          className="font-mono text-[10px] font-bold"
          style={{color: FUNNEL_COLOURS.goldDeep}}
          animate={reduce ? undefined : {x: [0, 3, 0], opacity: [0.4, 1, 0.4]}}
          transition={reduce ? undefined : {duration: 1.6, repeat: Infinity}}
        >
          →
        </motion.span>
        <div
          className="rounded-sm border h-full px-2 py-1.5 flex flex-col"
          style={{borderColor: `${FUNNEL_COLOURS.goldDeep}35`, backgroundColor: `${FUNNEL_COLOURS.goldDeep}0A`}}
        >
          <p
            className="font-mono text-[7px] uppercase tracking-[0.14em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Your email
          </p>
          <motion.div
            className="mt-2 rounded-sm border px-1.5 py-1.5"
            style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: '#fff'}}
            animate={reduce ? undefined : {y: [6, 0, 0, 6], opacity: [0, 1, 1, 0]}}
            transition={reduce ? undefined : {duration: 2.4, repeat: Infinity, times: [0, 0.25, 0.8, 1]}}
          >
            <p className="font-mono text-[6px] uppercase tracking-widest text-dark/40">New enquiry</p>
            <p className="font-sans text-[9px] leading-snug mt-0.5" style={{color: FUNNEL_COLOURS.ink}}>
              Can we book this week?
            </p>
          </motion.div>
          <motion.p
            className="mt-auto font-mono text-[7px] font-bold uppercase tracking-[0.14em]"
            style={{color: '#1a7a4c'}}
            animate={reduce ? undefined : {opacity: [0, 0, 1, 1, 0]}}
            transition={reduce ? undefined : {duration: 2.4, repeat: Infinity, times: [0, 0.35, 0.45, 0.85, 1]}}
          >
            Delivered
          </motion.p>
        </div>
      </div>
    </div>
  )
}

const WEBSITE_VISUALS = [
  NoDesignSpiralVisual,
  StillGoingSiteVisual,
  BoringTechOursVisual,
  EnquiryToEmailVisual,
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
}) {
  const reduce = useReducedMotion()
  const visuals =
    variant === 'missed-call'
      ? MISSED_VISUALS
      : variant === 'ai-phone'
        ? AI_PHONE_VISUALS
        : variant === 'reviews'
          ? REVIEWS_VISUALS
          : variant === 'google-profile'
            ? PROFILE_VISUALS
            : variant === 'search-fix'
              ? SEARCH_VISUALS
              : variant === 'website'
                ? WEBSITE_VISUALS
                : variant === 'landing-page'
                  ? LANDING_VISUALS
                  : variant === 'booking'
                    ? BOOKING_VISUALS
                    : variant === 'crm-rescue'
                      ? CRM_VISUALS
                      : variant === 'enquiry-reply'
                        ? ENQUIRY_REPLY_VISUALS
                        : variant === 'profile-posting'
                          ? PROFILE_POSTING_VISUALS
                          : variant === 'change-pack'
                          ? CHANGE_PACK_VISUALS
                          : variant === 'content-system'
                            ? CONTENT_SYSTEM_VISUALS
                            : variant === 'team-ai'
                                ? TEAM_AI_VISUALS
                                : SPEED_VISUALS

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
            <div className="flex flex-col justify-center">
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
            <div className="flex items-center justify-center md:justify-end w-full self-center">
              <div className="border border-dark/10 bg-cream p-2 md:p-2.5 w-full max-w-sm">
                <Visual reduce={reduce} />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
