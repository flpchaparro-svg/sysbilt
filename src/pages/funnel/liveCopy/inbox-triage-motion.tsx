import React from 'react'
import {motion} from 'framer-motion'
import {colors} from '../../../constants/theme'
import {FUNNEL_COLOURS} from '../funnelTheme'

type BenefitVisualProps = {reduce: boolean | null}
type StackVisualProps = {reduce: boolean | null; play: boolean}

/** Benefit: mixed stream sorts into labelled buckets. */
function InboxLessHuntingVisual({reduce}: BenefitVisualProps) {
  const buckets = [
    {label: 'Clients', tone: 'act'},
    {label: 'Team', tone: 'share'},
    {label: 'Later', tone: 'batch'},
  ]
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Buckets</span>
        <motion.span
          className="font-mono text-[7px] font-bold uppercase tracking-wide"
          style={{color: colors.teal}}
          animate={reduce ? undefined : {opacity: [0.55, 1, 0.55]}}
          transition={{duration: 1.5, repeat: Infinity, ease: 'easeInOut'}}
        >
          Sorted
        </motion.span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-1 px-2.5 py-1.5">
        {buckets.map((b, i) => (
          <motion.div
            key={b.label}
            className="w-full flex items-center gap-2 rounded-md border px-2 py-1"
            style={{borderColor: `${colors.teal}35`, backgroundColor: `${colors.teal}08`}}
            initial={reduce ? false : {opacity: 0.25, x: -10}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : 0.08 + i * 0.12, type: 'spring', stiffness: 340, damping: 20}}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full shrink-0"
              style={{backgroundColor: colors.teal}}
              animate={reduce ? undefined : {scale: [1, 1.35, 1]}}
              transition={{duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15}}
            />
            <span className="flex-1 font-sans text-[8px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              {b.label}
            </span>
            <span className="font-mono text-[6px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
              {b.tone}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Benefit: blank reply → draft ready. */
function InboxFasterRepliesVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Draft help</span>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2 px-2.5 py-2">
        <div
          className="rounded-md border px-2 py-2 flex flex-col gap-1.5"
          style={{borderColor: `${FUNNEL_COLOURS.ink}14`}}
        >
          <div className="h-1.5 w-4/5 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockBar}} />
          <div className="h-1.5 w-1/2 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
          <motion.div
            className="mt-auto h-5 w-full rounded-sm"
            style={{backgroundColor: FUNNEL_COLOURS.mockFill}}
            animate={reduce ? undefined : {opacity: [0.55, 0.25, 0.55]}}
            transition={{duration: 1.4, repeat: Infinity, ease: 'easeInOut'}}
          />
          <p className="font-mono text-[6px] uppercase tracking-wide text-center" style={{color: FUNNEL_COLOURS.steel}}>
            Blank
          </p>
        </div>
        <motion.div
          className="rounded-md border px-2 py-2 flex flex-col gap-1.5"
          style={{borderColor: `${colors.teal}40`, backgroundColor: `${colors.teal}08`}}
          initial={reduce ? false : {opacity: 0.3, x: 8}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          transition={{type: 'spring', stiffness: 320, damping: 20}}
        >
          <motion.div
            className="h-1.5 w-4/5 rounded-sm origin-left"
            style={{backgroundColor: FUNNEL_COLOURS.mockBar}}
            initial={reduce ? false : {scaleX: 0.4}}
            whileInView={{scaleX: 1}}
            viewport={{once: true}}
          />
          <div className="h-1.5 w-3/5 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
          <motion.div
            className="mt-auto h-5 w-full rounded-sm flex items-center justify-center"
            style={{backgroundColor: colors.teal}}
            animate={reduce ? undefined : {scale: [1, 1.04, 1]}}
            transition={{duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2}}
          >
            <span className="font-mono text-[7px] font-bold uppercase tracking-wide text-white">Draft</span>
          </motion.div>
          <p className="font-mono text-[6px] uppercase tracking-wide text-center" style={{color: colors.teal}}>
            Ready
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/** Benefit: suggest then you approve send. */
function InboxHumanSayVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Send</span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
          You decide
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-3">
        <motion.div
          className="w-full rounded-md border px-2 py-1.5 flex items-center gap-2"
          style={{borderColor: `${colors.teal}40`, backgroundColor: `${colors.teal}0C`}}
          initial={reduce ? false : {opacity: 0, y: 6}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
        >
          <motion.span
            className="h-2 w-2 rounded-full shrink-0"
            style={{backgroundColor: colors.teal}}
            animate={reduce ? undefined : {opacity: [0.4, 1, 0.4]}}
            transition={{duration: 1.1, repeat: Infinity, ease: 'easeInOut'}}
          />
          <span className="font-sans text-[8px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
            Draft suggested
          </span>
        </motion.div>
        <motion.span
          className="font-mono text-[10px] font-bold"
          style={{color: colors.teal}}
          animate={reduce ? undefined : {y: [0, 2, 0], opacity: [0.5, 1, 0.5]}}
          transition={{duration: 1.2, repeat: Infinity, ease: 'easeInOut'}}
        >
          ↓
        </motion.span>
        <motion.div
          className="w-full rounded-md py-2 text-center"
          style={{backgroundColor: FUNNEL_COLOURS.ink}}
          initial={reduce ? false : {opacity: 0, scale: 0.96}}
          whileInView={{opacity: 1, scale: 1}}
          viewport={{once: true}}
          transition={{delay: 0.15, type: 'spring', stiffness: 320, damping: 18}}
        >
          <span className="font-mono text-[8px] font-bold uppercase tracking-wide text-white">
            You approve · send
          </span>
        </motion.div>
      </div>
    </div>
  )
}

/** Benefit: inbox discipline feeds Team AI later. */
function InboxFeedsTeamVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Later path</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-3">
        <motion.div
          className="w-full rounded-sm border px-2 py-1.5 flex items-center gap-1.5"
          style={{borderColor: `${colors.teal}40`, backgroundColor: `${colors.teal}0C`}}
          initial={reduce ? false : {opacity: 0, y: 4}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
        >
          <span className="font-mono text-[7px] font-bold" style={{color: colors.teal}}>
            NOW
          </span>
          <span className="font-sans text-[8px]" style={{color: FUNNEL_COLOURS.ink}}>
            Inbox discipline
          </span>
        </motion.div>
        <div className="w-full h-1 rounded-full overflow-hidden" style={{backgroundColor: FUNNEL_COLOURS.mockFill}}>
          <motion.div
            className="h-full origin-left rounded-full"
            style={{backgroundColor: colors.teal, width: '100%'}}
            initial={reduce ? false : {scaleX: 0}}
            whileInView={{scaleX: 0.6}}
            viewport={{once: true}}
            transition={{delay: 0.15, duration: 0.55}}
          />
        </div>
        <motion.div
          className="w-full rounded-sm py-1.5 text-center"
          style={{backgroundColor: FUNNEL_COLOURS.ink}}
          initial={reduce ? false : {opacity: 0, y: 4}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{delay: 0.22}}
        >
          <span className="font-mono text-[8px] font-bold uppercase tracking-wide text-white">
            Team AI habits
          </span>
        </motion.div>
      </div>
    </div>
  )
}

/** Stack: triage map categories light up. */
function InboxMapStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  const rows = [
    {label: 'Clients', action: 'Act'},
    {label: 'Noise', action: 'Batch'},
  ]
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Triage map</span>
        <motion.span
          className="font-mono text-[6px] font-bold uppercase tracking-wide"
          style={{color: colors.teal}}
          animate={go ? {opacity: [0.5, 1, 0.5]} : {opacity: 0.8}}
          transition={{duration: 1.3, repeat: Infinity, ease: 'easeInOut'}}
        >
          Types
        </motion.span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-1.5">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            className="flex items-center gap-2 rounded-md border px-2 py-1.5"
            initial={reduce ? false : {opacity: 0.3, x: -8}}
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
            transition={{delay: reduce ? 0 : 0.1 + i * 0.14, type: 'spring', stiffness: 340, damping: 20}}
            style={{borderColor: FUNNEL_COLOURS.mockBorder}}
          >
            <span className="flex-1 font-sans text-[8px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              {row.label}
            </span>
            <span className="font-mono text-[6px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
              {row.action}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Stack: filter → labelled. */
function InboxRulesStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Rules setup</span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-2">
        <motion.div
          className="rounded-md border px-2 py-2 text-center shrink-0"
          style={{borderColor: `${FUNNEL_COLOURS.ink}18`}}
          animate={go ? {opacity: [0.55, 1, 0.55]} : {opacity: 1}}
          transition={{duration: 1.4, repeat: Infinity, ease: 'easeInOut'}}
        >
          <div className="mx-auto mb-1 space-y-0.5">
            <div className="h-1 w-8 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockBar}} />
            <div className="h-1 w-6 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
          </div>
          <p className="font-mono text-[6px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.steel}}>
            Filter
          </p>
        </motion.div>
        <motion.span
          className="font-mono text-[10px] font-bold shrink-0"
          style={{color: colors.teal}}
          animate={go ? {x: [0, 3, 0], opacity: [0.5, 1, 0.5]} : {opacity: 0.8}}
          transition={{duration: 1.1, repeat: Infinity, ease: 'easeInOut'}}
        >
          →
        </motion.span>
        <motion.div
          className="rounded-md px-2.5 py-2 text-center shrink-0"
          style={{backgroundColor: colors.teal}}
          initial={reduce ? false : {opacity: 0.35, scale: 0.92}}
          animate={go ? {opacity: 1, scale: 1} : {opacity: 1, scale: 1}}
          transition={{delay: reduce ? 0 : 0.25, type: 'spring', stiffness: 340, damping: 18}}
        >
          <p className="font-mono text-[7px] font-bold uppercase tracking-wide text-white">Label</p>
        </motion.div>
      </div>
    </div>
  )
}

/** Stack: prompt pack drafts appear for human send. */
function InboxDraftsStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
      <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Draft pack</span>
      <div className="flex-1 flex flex-col justify-center gap-1.5">
        <motion.div
          className="rounded-md border px-2 py-1.5"
          style={{borderColor: FUNNEL_COLOURS.mockBorder}}
          initial={reduce ? false : {opacity: 0.4}}
          animate={go ? {opacity: 1} : {opacity: 1}}
        >
          <div className="h-1.5 w-3/4 rounded-sm mb-1" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
          <p className="font-mono text-[6px] uppercase tracking-wide text-dark/45">Incoming</p>
        </motion.div>
        <motion.div
          className="self-end max-w-[85%] rounded-lg rounded-br-sm px-2.5 py-1.5"
          style={{backgroundColor: colors.teal}}
          initial={reduce ? false : {opacity: 0, x: 12, y: 4}}
          animate={go ? {opacity: 1, x: 0, y: 0} : {opacity: 1, x: 0, y: 0}}
          transition={{delay: reduce ? 0 : 0.3, type: 'spring', stiffness: 320, damping: 20}}
        >
          <p className="font-sans text-[8px] font-semibold text-white leading-snug">
            Suggested reply. You send.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/** Stack: shared rules + owner. */
function InboxTeamNoteStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
      <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Team note</span>
      <div className="flex-1 flex flex-col justify-center gap-1.5">
        {['Shared rules', 'Who owns triage'].map((label, i) => (
          <motion.div
            key={label}
            className="flex items-center gap-2 rounded-md border px-2 py-1.5"
            style={{borderColor: `${colors.teal}35`, backgroundColor: `${colors.teal}08`}}
            initial={reduce ? false : {opacity: 0, y: 6}}
            animate={go ? {opacity: 1, y: 0} : {opacity: 1, y: 0}}
            transition={{delay: reduce ? 0 : 0.1 + i * 0.12, type: 'spring', stiffness: 340, damping: 20}}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full shrink-0"
              style={{backgroundColor: colors.teal}}
              animate={go ? {scale: [1, 1.3, 1]} : {scale: 1}}
              transition={{duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2}}
            />
            <span className="font-sans text-[8px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export const INBOX_TRIAGE_BENEFIT_VISUALS = [
  InboxLessHuntingVisual,
  InboxFasterRepliesVisual,
  InboxHumanSayVisual,
  InboxFeedsTeamVisual,
]

export const INBOX_TRIAGE_STACK_VISUALS = [
  InboxMapStackVisual,
  InboxRulesStackVisual,
  InboxDraftsStackVisual,
  InboxTeamNoteStackVisual,
]
