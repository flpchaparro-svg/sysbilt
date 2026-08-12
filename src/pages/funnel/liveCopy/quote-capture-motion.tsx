/**
 * Quote Capture · benefit + stack motion visuals.
 * Distinct scenes per row. No repeated “box in a box with OK”.
 */
import React, {useEffect, useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {colors} from '../../../constants/theme'
import {FUNNEL_COLOURS} from '../funnelTheme'

type BenefitVisualProps = {reduce: boolean | null}
type StackVisualProps = {reduce: boolean | null; play: boolean}

/* ─── Benefits ─────────────────────────────────────────────── */

function QcNumberVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-cream">
      <motion.div
        className="absolute inset-0 flex flex-col justify-center px-4"
        initial={reduce ? false : {opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true}}
      >
        <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/45 mb-1">On screen</p>
        <motion.p
          className="font-serif text-3xl font-bold tabular-nums"
          style={{color: FUNNEL_COLOURS.ink}}
          initial={reduce ? false : {scale: 0.9, opacity: 0}}
          whileInView={{scale: 1, opacity: 1}}
          viewport={{once: true}}
          transition={{type: 'spring', stiffness: 320, damping: 18}}
        >
          $4,280
        </motion.p>
        <p className="font-mono text-[8px] mt-1" style={{color: colors.teal}}>
          One total. Before they ghost.
        </p>
      </motion.div>
    </div>
  )
}

function QcLockedVisual({reduce}: BenefitVisualProps) {
  return (
    <div
      className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 flex items-center justify-center"
      style={{backgroundColor: FUNNEL_COLOURS.ink}}
    >
      <motion.div
        className="text-center px-4"
        initial={reduce ? false : {opacity: 0, y: 6}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
      >
        <motion.div
          className="mx-auto mb-2 h-8 w-8 rounded-full border-2 flex items-center justify-center"
          style={{borderColor: FUNNEL_COLOURS.goldLight}}
          animate={reduce ? undefined : {rotate: [0, -8, 8, 0]}}
          transition={{duration: 2.4, repeat: Infinity, ease: 'easeInOut'}}
        >
          <span className="font-mono text-[10px] font-bold" style={{color: FUNNEL_COLOURS.goldLight}}>
            ¤
          </span>
        </motion.div>
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]" style={{color: FUNNEL_COLOURS.onInk}}>
          Rate card locked
        </p>
        <p className="font-mono text-[7px] mt-1" style={{color: `${FUNNEL_COLOURS.onInk}70`}}>
          Your prices only
        </p>
      </motion.div>
    </div>
  )
}

function QcLeadVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white p-3 flex flex-col justify-center">
      <motion.div
        className="rounded-lg px-3 py-2.5 shadow-[0_8px_20px_-10px_rgba(14,28,47,0.35)]"
        style={{backgroundColor: FUNNEL_COLOURS.ink}}
        initial={reduce ? false : {y: 16, opacity: 0}}
        whileInView={{y: 0, opacity: 1}}
        viewport={{once: true}}
        transition={{type: 'spring', stiffness: 340, damping: 20}}
      >
        <p className="font-mono text-[7px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.goldLight}}>
          New priced lead
        </p>
        <p className="font-sans text-[11px] font-semibold mt-0.5" style={{color: FUNNEL_COLOURS.onInk}}>
          Soft landscape · Bondi · $4,280
        </p>
      </motion.div>
    </div>
  )
}

function QcSoftNoVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-cream flex items-center justify-center px-4">
      <motion.div
        className="text-center"
        initial={reduce ? false : {opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true}}
      >
        <p className="font-serif text-lg font-bold" style={{color: FUNNEL_COLOURS.ink}}>
          Outside what we do
        </p>
        <p className="font-mono text-[8px] mt-1 uppercase tracking-[0.14em]" style={{color: FUNNEL_COLOURS.accent}}>
          Soft no · no alert to you
        </p>
      </motion.div>
    </div>
  )
}

export const BENEFIT_VISUALS = [QcNumberVisual, QcLockedVisual, QcLeadVisual, QcSoftNoVisual]

/* ─── Stack: each row is a different scene ─────────────────── */

/** 1 · Wizard: step chips advance like a real flow */
function QcWizardStackVisual({reduce, play}: StackVisualProps) {
  const steps = ['Job', 'Size', 'Access', 'Quote']
  const [active, setActive] = useState(reduce ? 3 : 0)

  useEffect(() => {
    if (!play || reduce) return
    let cancelled = false
    const timers: number[] = []
    const loop = () => {
      if (cancelled) return
      setActive(0)
      steps.forEach((_, i) => {
        timers.push(window.setTimeout(() => !cancelled && setActive(i), 280 + i * 420))
      })
      timers.push(window.setTimeout(() => !cancelled && loop(), 280 + steps.length * 420 + 900))
    }
    loop()
    return () => {
      cancelled = true
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [play, reduce])

  return (
    <div className="w-full h-[120px] rounded-sm overflow-hidden border border-dark/15 bg-cream flex flex-col justify-center px-4">
      <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/45 mb-3">Buyer path</p>
      <div className="flex items-center gap-1.5">
        {steps.map((label, i) => {
          const on = i <= active
          return (
            <React.Fragment key={label}>
              <motion.div
                className="flex-1 rounded-full py-2 text-center"
                style={{
                  backgroundColor: on ? colors.teal : `${FUNNEL_COLOURS.ink}12`,
                }}
                animate={{scale: i === active ? 1.04 : 1}}
                transition={{type: 'spring', stiffness: 400, damping: 22}}
              >
                <span
                  className="font-mono text-[8px] font-bold uppercase tracking-wide"
                  style={{color: on ? '#fff' : FUNNEL_COLOURS.steel}}
                >
                  {label}
                </span>
              </motion.div>
              {i < steps.length - 1 ? (
                <span className="font-mono text-[9px]" style={{color: on && i < active ? colors.teal : `${FUNNEL_COLOURS.ink}30`}}>
                  ·
                </span>
              ) : null}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

/** 2 · Quotation: real sheet with lines + total */
function QcQuoteStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full h-[120px] rounded-sm overflow-hidden border border-dark/15 bg-white px-4 py-3 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/45">Quotation</p>
          <p className="font-sans text-[10px] font-semibold mt-0.5" style={{color: FUNNEL_COLOURS.ink}}>
            Soft landscape · 48 m²
          </p>
        </div>
        <motion.p
          className="font-serif text-2xl font-bold tabular-nums leading-none"
          style={{color: FUNNEL_COLOURS.ink}}
          initial={reduce ? false : {opacity: 0, y: 8}}
          animate={go ? {opacity: 1, y: 0} : {opacity: 0.3}}
          transition={{delay: 0.25, type: 'spring', stiffness: 320}}
        >
          $4,280
        </motion.p>
      </div>
      <div className="space-y-1">
        {['Turf supply & lay', 'Garden bed prep', 'Site conditions line'].map((line, i) => (
          <motion.div
            key={line}
            className="flex items-center justify-between border-b border-dark/8 pb-0.5"
            initial={reduce ? false : {opacity: 0, x: -6}}
            animate={go ? {opacity: 1, x: 0} : {opacity: 0.3}}
            transition={{delay: reduce ? 0 : 0.08 + i * 0.1}}
          >
            <span className="font-mono text-[8px]" style={{color: FUNNEL_COLOURS.steel}}>
              {line}
            </span>
            {i < 2 ? (
              <span className="font-mono text-[8px] tabular-nums" style={{color: FUNNEL_COLOURS.ink}}>
                {i === 0 ? '2,400' : '1,880'}
              </span>
            ) : (
              <span className="font-mono text-[7px]" style={{color: FUNNEL_COLOURS.accent}}>
                noted
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** 3 · PDF / email / SMS: channels peel off */
function QcDeliverStackVisual({reduce, play}: StackVisualProps) {
  const channels = [
    {label: 'PDF', rot: -6, x: -18},
    {label: 'Email', rot: 0, x: 0},
    {label: 'SMS', rot: 7, x: 18},
  ]
  const go = play || reduce

  return (
    <div className="w-full h-[120px] rounded-sm overflow-hidden border border-dark/15 bg-cream relative flex items-center justify-center">
      {channels.map((ch, i) => (
        <motion.div
          key={ch.label}
          className="absolute w-[72px] h-[78px] rounded-md border bg-white shadow-[0_10px_24px_-14px_rgba(14,28,47,0.4)] flex flex-col items-center justify-center"
          style={{borderColor: `${FUNNEL_COLOURS.ink}18`, zIndex: 3 - i}}
          initial={reduce ? false : {opacity: 0, y: 20, rotate: 0, x: 0}}
          animate={
            go
              ? {opacity: 1, y: 0, rotate: ch.rot, x: ch.x}
              : {opacity: 0.4, y: 8, rotate: 0, x: 0}
          }
          transition={{delay: reduce ? 0 : 0.1 + i * 0.15, type: 'spring', stiffness: 280, damping: 18}}
        >
          <span className="font-mono text-[10px] font-bold" style={{color: colors.teal}}>
            {ch.label}
          </span>
          <span className="font-mono text-[6px] mt-1 uppercase tracking-wide text-dark/40">Sent</span>
        </motion.div>
      ))}
      <motion.p
        className="absolute bottom-2 font-mono text-[7px] uppercase tracking-[0.14em]"
        style={{color: FUNNEL_COLOURS.goldDeep}}
        initial={reduce ? false : {opacity: 0}}
        animate={go ? {opacity: 1} : {opacity: 0}}
        transition={{delay: 0.55}}
      >
        Pay link inside
      </motion.p>
    </div>
  )
}

/** 4 · Owner alert: phone notification slides in */
function QcAlertStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div
      className="w-full h-[120px] rounded-sm overflow-hidden border border-dark/15 flex items-center justify-center px-4"
      style={{background: `linear-gradient(180deg, ${FUNNEL_COLOURS.ink} 0%, #1a2a3d 100%)`}}
    >
      <motion.div
        className="w-full max-w-[220px] rounded-xl px-3 py-2.5 shadow-lg"
        style={{backgroundColor: FUNNEL_COLOURS.onInk}}
        initial={reduce ? false : {y: 12, opacity: 0}}
        animate={go ? {y: 0, opacity: 1} : {y: 8, opacity: 0.4}}
        transition={{type: 'spring', stiffness: 320, damping: 20}}
      >
        <div className="flex items-start gap-2">
          <motion.span
            className="mt-0.5 h-2 w-2 rounded-full shrink-0"
            style={{backgroundColor: FUNNEL_COLOURS.accent}}
            animate={go && !reduce ? {scale: [1, 1.35, 1]} : undefined}
            transition={{duration: 1.2, repeat: Infinity}}
          />
          <div className="min-w-0">
            <p className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: FUNNEL_COLOURS.steel}}>
              SYSBILT · now
            </p>
            <p className="font-sans text-[11px] font-semibold truncate" style={{color: FUNNEL_COLOURS.ink}}>
              New priced lead · $4,280
            </p>
            <p className="font-mono text-[7px] mt-0.5" style={{color: FUNNEL_COLOURS.steel}}>
              Soft landscape · Bondi · pay link sent
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/** 5 · Edit in their system: pencil rewrites a line (no brand names) */
function QcPlatformStackVisual({reduce, play}: StackVisualProps) {
  const [price, setPrice] = useState(reduce ? '$4,150' : '$4,280')
  const go = play || reduce

  useEffect(() => {
    if (!play || reduce) return
    let cancelled = false
    const timers: number[] = []
    const loop = () => {
      if (cancelled) return
      setPrice('$4,280')
      timers.push(window.setTimeout(() => !cancelled && setPrice('$4,150'), 1200))
      timers.push(window.setTimeout(() => !cancelled && loop(), 3200))
    }
    loop()
    return () => {
      cancelled = true
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [play, reduce])

  return (
    <div className="w-full h-[120px] rounded-sm overflow-hidden border border-dark/15 bg-white px-4 py-3 flex flex-col justify-center gap-2">
      <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-dark/45">Your quote system</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 border-b border-dark/20 pb-1">
          <p className="font-sans text-[10px]" style={{color: FUNNEL_COLOURS.steel}}>
            Soft landscape
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={price}
              className="font-serif text-xl font-bold tabular-nums"
              style={{color: FUNNEL_COLOURS.ink}}
              initial={reduce ? false : {opacity: 0, y: 4}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -4}}
            >
              {price}
            </motion.p>
          </AnimatePresence>
        </div>
        <motion.div
          className="h-8 w-8 rounded-full flex items-center justify-center shrink-0"
          style={{backgroundColor: `${colors.teal}18`}}
          animate={go && !reduce ? {rotate: [0, -12, 12, 0]} : undefined}
          transition={{duration: 1.6, repeat: Infinity, ease: 'easeInOut'}}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path
              d="M11.5 2.5l2 2L5 13H3v-2L11.5 2.5z"
              stroke={colors.teal}
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
      <p className="font-mono text-[7px] uppercase tracking-[0.12em]" style={{color: colors.teal}}>
        Tweak · resend
      </p>
    </div>
  )
}

/** 6 · Handover: days tick down aftercare */
function QcHandoverStackVisual({reduce, play}: StackVisualProps) {
  const checks = ['Prices editable', 'Live test done', '14 days covered']
  const [n, setN] = useState(reduce ? 3 : 0)

  useEffect(() => {
    if (!play || reduce) return
    let cancelled = false
    const timers: number[] = []
    const loop = () => {
      if (cancelled) return
      setN(0)
      checks.forEach((_, i) => {
        timers.push(window.setTimeout(() => !cancelled && setN(i + 1), 400 + i * 500))
      })
      timers.push(window.setTimeout(() => !cancelled && loop(), 400 + checks.length * 500 + 1100))
    }
    loop()
    return () => {
      cancelled = true
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [play, reduce])

  return (
    <div className="w-full h-[120px] rounded-sm overflow-hidden border border-dark/15 bg-cream px-4 py-3 flex flex-col justify-center gap-1.5">
      {checks.map((label, i) => {
        const on = i < n
        return (
          <motion.div key={label} className="flex items-center gap-2" animate={{opacity: on ? 1 : 0.35}}>
            <motion.span
              className="h-4 w-4 rounded-sm flex items-center justify-center shrink-0"
              style={{
                backgroundColor: on ? colors.teal : `${FUNNEL_COLOURS.ink}14`,
              }}
              animate={on ? {scale: [1, 1.15, 1]} : {scale: 1}}
              transition={{duration: 0.35}}
            >
              {on ? (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : null}
            </motion.span>
            <span className="font-sans text-[11px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              {label}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

export const STACK_VISUALS = [
  QcWizardStackVisual,
  QcQuoteStackVisual,
  QcDeliverStackVisual,
  QcAlertStackVisual,
  QcPlatformStackVisual,
  QcHandoverStackVisual,
]
