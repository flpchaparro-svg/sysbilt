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
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          New form enquiry
        </span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide text-gold-on-cream">
          Auto-reply
        </span>
      </div>
      <div className="flex-1 p-2.5 space-y-1.5">
        <motion.div
          className="rounded-sm border border-dark/10 bg-cream px-2 py-1.5"
          initial={{opacity: 0, x: -8}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.15}}
        >
          <p className="font-mono text-[7px] text-dark/40">Lead</p>
          <p className="font-sans text-[10px] text-dark/70">Website form · just now</p>
        </motion.div>
        <motion.div
          className="rounded-sm border px-2 py-1.5"
          style={{borderColor: `${colors.teal}55`, backgroundColor: `${colors.teal}12`}}
          initial={{opacity: 0, x: 8}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 0.45}}
        >
          <p className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
            Instant reply sent · 4s
          </p>
          <p className="font-sans text-[10px] text-dark/65">Thanks — we got it. Someone will follow up.</p>
        </motion.div>
      </div>
    </div>
  )
}

/** CRM Rescue: right phone buzzes. */
function CrmRightPhoneVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white p-2.5">
      <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/40 mb-2">Route to</p>
      <div className="space-y-1.5">
        {[
          {who: 'Sales · Jordan', ok: true},
          {who: 'Ops inbox', ok: false},
          {who: 'Owner CC', ok: false},
        ].map((row, i) => (
          <motion.div
            key={row.who}
            className="flex items-center justify-between rounded-sm border px-2 py-1.5"
            initial={{
              opacity: 0.35,
              borderColor: 'rgba(26,26,26,0.12)',
              backgroundColor: colors.cream,
            }}
            whileInView={
              row.ok
                ? {
                    opacity: 1,
                    borderColor: colors.teal,
                    backgroundColor: `${colors.teal}14`,
                  }
                : {opacity: 0.45}
            }
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.2 + i * 0.2}}
          >
            <span className="font-sans text-[11px] text-dark/75">{row.who}</span>
            {row.ok ? (
              <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
                Buzzing
              </span>
            ) : (
              <span className="font-mono text-[7px] uppercase tracking-wide text-dark/30">Skip</span>
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
    {label: 'Quote sent', done: true},
    {label: 'Day 2 nudge', done: true},
    {label: 'Day 5 chase', done: false},
  ]
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Open quote · kitchen reno
        </span>
      </div>
      <div className="flex-1 flex items-center gap-1.5 p-2.5">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            className="flex-1 rounded-sm border px-1.5 py-2 text-center"
            initial={{opacity: 0.4, y: 6}}
            whileInView={{
              opacity: 1,
              y: 0,
              borderColor: s.done ? colors.teal : 'rgba(26,26,26,0.15)',
              backgroundColor: s.done ? `${colors.teal}14` : colors.cream,
            }}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.2 + i * 0.25}}
          >
            <p className="font-mono text-[7px] uppercase tracking-wide text-dark/50 leading-tight">
              {s.label}
            </p>
            <motion.span
              className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full"
              style={{backgroundColor: s.done ? colors.teal : 'rgba(26,26,26,0.2)'}}
              initial={{scale: 0}}
              whileInView={{scale: 1}}
              viewport={{once: true}}
              transition={{delay: reduce ? 0 : 0.35 + i * 0.25}}
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
      <div className="h-7 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">
          Delivery window
        </span>
        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-gold-on-cream">
          Within 5 days
        </span>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-1.5 p-2">
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
            transition={{duration: 0.35, delay: reduce ? 0 : 0.25 + i * 0.35}}
          >
            <span className="font-serif text-lg text-dark leading-none">{c.label}</span>
            <span className="mt-0.5 font-mono text-[6px] uppercase tracking-wide text-dark/45">
              {c.sub}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.p
        className="pb-2 text-center font-mono text-[7px] uppercase tracking-[0.14em]"
        style={{color: colors.teal}}
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true}}
        transition={{delay: reduce ? 0 : 0.95}}
      >
        Then 14 days watching · we call if it slips
      </motion.p>
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
const CRM_VISUALS = [
  CrmInstantReplyVisual,
  CrmRightPhoneVisual,
  CrmQuoteChaseVisual,
  CrmFiveDayVisual,
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
}) {
  const reduce = useReducedMotion()
  const visuals =
    variant === 'missed-call'
      ? MISSED_VISUALS
      : variant === 'google-profile'
        ? PROFILE_VISUALS
        : variant === 'search-fix'
          ? SEARCH_VISUALS
          : variant === 'landing-page'
            ? LANDING_VISUALS
            : variant === 'crm-rescue'
              ? CRM_VISUALS
              : variant === 'team-ai' || variant === 'change-pack'
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
