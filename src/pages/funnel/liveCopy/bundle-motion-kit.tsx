import React from 'react'
import {motion} from 'framer-motion'
import {colors} from '../../../constants/theme'
import {FUNNEL_COLOURS} from '../funnelTheme'

type BenefitVisualProps = {reduce: boolean | null}
type StackVisualProps = {reduce: boolean | null; play: boolean}

export function PackChipsVisual({
  reduce,
  chrome,
  chips,
}: BenefitVisualProps & {chrome: string; chips: string[]}) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">{chrome}</span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-1.5 px-2.5">
        {chips.map((label, i) => (
          <motion.div
            key={label}
            className="rounded-md px-2.5 py-2"
            style={{backgroundColor: colors.teal}}
            initial={reduce ? false : {opacity: 0, scale: 0.88, y: 6}}
            whileInView={{opacity: 1, scale: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : i * 0.12, type: 'spring', stiffness: 340, damping: 18}}
          >
            <p className="font-mono text-[8px] font-bold text-white">{label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function PackPathVisual({
  reduce,
  chrome,
  steps,
}: BenefitVisualProps & {chrome: string; steps: string[]}) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">{chrome}</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-3">
        {steps.map((label, i) => (
          <motion.div
            key={label}
            className="w-full rounded-md px-2 py-1.5 text-center"
            style={{backgroundColor: i === steps.length - 1 ? colors.teal : `${colors.teal}18`}}
            initial={reduce ? false : {opacity: 0, y: 6}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : i * 0.12}}
          >
            <p
              className="font-mono text-[8px] font-bold"
              style={{color: i === steps.length - 1 ? '#fff' : FUNNEL_COLOURS.ink}}
            >
              {label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function PackPriceVisual({
  reduce,
  apart,
  pack,
}: BenefitVisualProps & {apart: string; pack: string}) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Apart</span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
          Pack
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-3">
        <p className="font-mono text-[10px] line-through" style={{color: FUNNEL_COLOURS.steel}}>
          {apart}
        </p>
        <motion.div
          className="w-full rounded-md py-2 text-center"
          style={{backgroundColor: colors.teal}}
          initial={reduce ? false : {opacity: 0, scale: 0.96}}
          whileInView={{opacity: 1, scale: 1}}
          viewport={{once: true}}
          transition={{delay: 0.15, type: 'spring', stiffness: 320, damping: 18}}
        >
          <p className="font-mono text-[10px] font-bold text-white">{pack}</p>
        </motion.div>
      </div>
    </div>
  )
}

export function PackNotInVisual({
  reduce,
  inPack,
  later,
}: BenefitVisualProps & {inPack: string; later: string}) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Not in this pack</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-3">
        <motion.div
          className="w-full rounded-sm border px-2 py-1.5"
          style={{borderColor: `${colors.teal}40`, backgroundColor: `${colors.teal}0C`}}
          initial={reduce ? false : {opacity: 0, y: 4}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
        >
          <span className="font-sans text-[8px]" style={{color: FUNNEL_COLOURS.ink}}>
            {inPack}
          </span>
        </motion.div>
        <motion.div
          className="w-full rounded-sm py-1.5 text-center"
          style={{backgroundColor: FUNNEL_COLOURS.ink}}
          initial={reduce ? false : {opacity: 0, y: 4}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{delay: 0.2}}
        >
          <span className="font-mono text-[8px] font-bold uppercase tracking-wide text-white">{later}</span>
        </motion.div>
      </div>
    </div>
  )
}

export function ProfileStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  const chips = ['Category', 'Photos', 'Hours']
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
      <p className="font-mono text-[6px] uppercase tracking-wide text-dark/55">Google Profile Fix</p>
      <div className="flex items-center gap-2">
        <motion.div
          className="h-8 w-8 rounded-md shrink-0"
          style={{backgroundColor: FUNNEL_COLOURS.mockFill}}
          initial={reduce ? false : {opacity: 0.4, scale: 0.9}}
          animate={go ? {opacity: 1, scale: 1} : {opacity: 1, scale: 1}}
        />
        <div className="flex-1 space-y-1 min-w-0">
          <motion.div
            className="h-1.5 w-3/4 rounded-sm origin-left"
            style={{backgroundColor: FUNNEL_COLOURS.mockBar}}
            initial={reduce ? false : {scaleX: 0.4, opacity: 0.5}}
            animate={go ? {scaleX: 1, opacity: 1} : {scaleX: 1, opacity: 1}}
          />
          <div className="h-1.5 w-1/2 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {chips.map((label, i) => (
          <motion.span
            key={label}
            className="font-mono text-[7px] font-bold uppercase tracking-wide rounded-sm px-1.5 py-0.5"
            style={{backgroundColor: `${colors.teal}18`, color: colors.teal}}
            initial={reduce ? false : {opacity: 0, y: 4}}
            animate={go ? {opacity: 1, y: 0} : {opacity: 1, y: 0}}
            transition={{delay: reduce ? 0 : 0.12 + i * 0.08}}
          >
            {label}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

export function BookingStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-1.5">
      <p className="font-mono text-[6px] uppercase tracking-wide text-dark/55">Booking System</p>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[7px]" style={{color: FUNNEL_COLOURS.steel}}>
          Tool
        </span>
        <motion.span
          className="font-mono text-[8px]"
          style={{color: colors.teal}}
          animate={go ? {x: [0, 4, 0]} : undefined}
          transition={{duration: 1.4, repeat: Infinity, ease: 'easeInOut'}}
        >
          ↔
        </motion.span>
        <span className="font-mono text-[7px]" style={{color: FUNNEL_COLOURS.steel}}>
          Calendar
        </span>
      </div>
      <motion.div
        className="rounded-md py-2 text-center"
        style={{backgroundColor: colors.teal}}
        initial={reduce ? false : {opacity: 0, y: 6}}
        animate={go ? {opacity: 1, y: 0} : {opacity: 1, y: 0}}
      >
        <p className="font-mono text-[8px] font-bold text-white">Book now · live test</p>
      </motion.div>
      <p className="font-mono text-[6px] text-dark/50">Confirm · remind · chase empty slots</p>
    </div>
  )
}

export function MissedStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
      <p className="font-mono text-[6px] uppercase tracking-wide text-dark/55">Missed-Call Text-Back</p>
      <div className="flex items-center gap-2">
        <motion.div
          className="h-8 w-8 rounded-full border flex items-center justify-center shrink-0"
          style={{borderColor: FUNNEL_COLOURS.mockBorder, backgroundColor: FUNNEL_COLOURS.mockWash}}
          animate={
            go
              ? {scale: [1, 1.08, 1], borderColor: [FUNNEL_COLOURS.mockBorder, colors.teal, FUNNEL_COLOURS.mockBorder]}
              : {scale: 1}
          }
          transition={{duration: 1.4, repeat: Infinity, ease: 'easeInOut'}}
        >
          <span className="h-2 w-2 rounded-full" style={{backgroundColor: FUNNEL_COLOURS.accent}} />
        </motion.div>
        <p className="font-mono text-[7px] uppercase tracking-wide text-dark/55">Ring out</p>
      </div>
      <motion.div
        className="self-end max-w-[82%] rounded-lg rounded-br-sm px-2.5 py-1.5"
        style={{backgroundColor: colors.teal}}
        initial={reduce ? false : {opacity: 0, x: 16, y: 4}}
        animate={go ? {opacity: 1, x: 0, y: 0} : {opacity: 1, x: 0, y: 0}}
        transition={{delay: reduce ? 0 : 0.35, type: 'spring', stiffness: 320, damping: 20}}
      >
        <p className="font-sans text-[8px] font-semibold text-white leading-snug">
          Sorry we missed you. Reply and we will call back.
        </p>
      </motion.div>
    </div>
  )
}

export function ReviewsStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
      <p className="font-mono text-[6px] uppercase tracking-wide text-dark/55">Review Engine</p>
      <div className="flex items-center gap-2">
        <motion.div
          className="rounded-sm border px-2 py-1.5 shrink-0"
          style={{borderColor: FUNNEL_COLOURS.mockBorder}}
          initial={reduce ? false : {opacity: 0.45}}
          animate={go ? {opacity: 1} : {opacity: 1}}
        >
          <span className="font-mono text-[6px] uppercase tracking-wide text-dark/55">Job done</span>
        </motion.div>
        <motion.span
          className="font-mono text-[9px] shrink-0"
          style={{color: colors.teal}}
          animate={go ? {x: [0, 4, 0], opacity: [0.55, 1, 0.55]} : {opacity: 0.8}}
          transition={{duration: 1.2, repeat: Infinity, ease: 'easeInOut'}}
        >
          →
        </motion.span>
        <motion.div
          className="flex-1 rounded-sm border px-2 py-1.5 text-center"
          style={{borderColor: colors.teal, backgroundColor: `${colors.teal}12`}}
          initial={reduce ? false : {opacity: 0.35, scale: 0.94}}
          animate={go ? {opacity: 1, scale: 1} : {opacity: 1, scale: 1}}
        >
          <span className="font-mono text-[6px] uppercase tracking-wide" style={{color: colors.teal}}>
            Ask sent
          </span>
        </motion.div>
      </div>
      <div className="flex items-center justify-center gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="h-3.5 w-3.5"
            style={{
              backgroundColor: colors.teal,
              clipPath:
                'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            }}
            initial={reduce ? false : {opacity: 0.15, scale: 0.7}}
            animate={go ? {opacity: 1, scale: 1} : {opacity: 1, scale: 1}}
            transition={{delay: reduce ? 0 : 0.45 + i * 0.08, type: 'spring', stiffness: 360, damping: 18}}
          />
        ))}
      </div>
    </div>
  )
}

export function PostingStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  const weeks = ['W1', 'W2', 'W3', 'W4']
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
      <p className="font-mono text-[6px] uppercase tracking-wide text-dark/55">Profile Posting System</p>
      <div className="grid grid-cols-4 gap-1.5">
        {weeks.map((label, i) => (
          <motion.div
            key={label}
            className="rounded-sm py-2 text-center"
            style={{backgroundColor: `${colors.teal}18`}}
            initial={reduce ? false : {opacity: 0, y: 4}}
            animate={go ? {opacity: 1, y: 0} : {opacity: 1, y: 0}}
            transition={{delay: reduce ? 0 : i * 0.08}}
          >
            <p className="font-mono text-[7px] font-bold" style={{color: colors.teal}}>
              {label}
            </p>
          </motion.div>
        ))}
      </div>
      <p className="font-mono text-[6px] text-dark/50">Cadence · templates · starter bank</p>
    </div>
  )
}

export function NoshowStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-1.5">
      <p className="font-mono text-[6px] uppercase tracking-wide text-dark/55">No-Show Rescue</p>
      <div className="flex items-center justify-between gap-1">
        {['Remind', 'Rebook', 'Alert'].map((label, i) => (
          <motion.span
            key={label}
            className="flex-1 rounded-sm py-1.5 text-center font-mono text-[7px] font-bold"
            style={{backgroundColor: i === 1 ? colors.teal : `${colors.teal}18`, color: i === 1 ? '#fff' : colors.teal}}
            initial={reduce ? false : {opacity: 0, y: 4}}
            animate={go ? {opacity: 1, y: 0} : {opacity: 1, y: 0}}
            transition={{delay: reduce ? 0 : i * 0.1}}
          >
            {label}
          </motion.span>
        ))}
      </div>
      <p className="font-mono text-[6px] text-dark/50">Live dummy booking before handoff</p>
    </div>
  )
}

export function SearchFixStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
      <p className="font-mono text-[6px] uppercase tracking-wide text-dark/55">Search Visibility Fix</p>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[7px]" style={{color: FUNNEL_COLOURS.accent}}>
          Blocked
        </span>
        <motion.span className="font-mono text-[8px]" style={{color: colors.teal}} animate={go ? {x: [0, 4, 0]} : undefined} transition={{duration: 1.3, repeat: Infinity}}>
          →
        </motion.span>
        <span className="font-mono text-[7px]" style={{color: colors.teal}}>
          Indexed
        </span>
      </div>
      <p className="font-mono text-[6px] text-dark/50">Sitemap · Search Console · 30-day watch</p>
    </div>
  )
}

export function OnpageStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
      <p className="font-mono text-[6px] uppercase tracking-wide text-dark/55">On-Page Search Pack</p>
      {['Titles', 'Headings', 'Links'].map((label, i) => (
        <motion.div
          key={label}
          className="h-1.5 rounded-sm origin-left"
          style={{backgroundColor: FUNNEL_COLOURS.mockBar, width: `${70 - i * 12}%`}}
          initial={reduce ? false : {scaleX: 0.3}}
          animate={go ? {scaleX: 1} : {scaleX: 1}}
          transition={{delay: reduce ? 0 : i * 0.1}}
        />
      ))}
    </div>
  )
}

export function SchemaStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
      <p className="font-mono text-[6px] uppercase tracking-wide text-dark/55">Schema and FAQ Pack</p>
      <motion.div
        className="rounded-md border px-2 py-2"
        style={{borderColor: `${colors.teal}40`}}
        initial={reduce ? false : {opacity: 0, y: 6}}
        animate={go ? {opacity: 1, y: 0} : {opacity: 1, y: 0}}
      >
        <p className="font-sans text-[8px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
          Q: How long does it take?
        </p>
        <p className="font-mono text-[6px] mt-1" style={{color: colors.teal}}>
          FAQPage markup live
        </p>
      </motion.div>
    </div>
  )
}

export function ConversionStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-1.5">
      <p className="font-mono text-[6px] uppercase tracking-wide text-dark/55">Conversion Pass</p>
      <div className="h-1.5 w-3/4 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockBar}} />
      <div className="h-1.5 w-1/2 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
      <motion.div
        className="mt-auto rounded-md py-2 text-center"
        style={{backgroundColor: colors.teal}}
        initial={reduce ? false : {opacity: 0, y: 6}}
        animate={go ? {opacity: 1, y: 0} : {opacity: 1, y: 0}}
      >
        <p className="font-mono text-[8px] font-bold text-white">Enquire now</p>
      </motion.div>
    </div>
  )
}

export function TrackingStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
      <p className="font-mono text-[6px] uppercase tracking-wide text-dark/55">Tracking and Forms Pack</p>
      <motion.div
        className="rounded-md px-2 py-2"
        style={{backgroundColor: `${colors.teal}14`}}
        initial={reduce ? false : {opacity: 0}}
        animate={go ? {opacity: 1} : {opacity: 1}}
      >
        <p className="font-mono text-[8px] font-bold" style={{color: colors.teal}}>
          Test enquiry arrived
        </p>
      </motion.div>
      <p className="font-mono text-[6px] text-dark/50">Actions · destinations · weekly check</p>
    </div>
  )
}

export function QuoteCaptureStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-1.5">
      <p className="font-mono text-[6px] uppercase tracking-wide text-dark/55">Quote Capture</p>
      {['Scope', 'Price from your card', 'PDF + alert'].map((label, i) => (
        <motion.p
          key={label}
          className="font-mono text-[7px]"
          style={{color: i === 1 ? colors.teal : FUNNEL_COLOURS.ink}}
          initial={reduce ? false : {opacity: 0, x: -6}}
          animate={go ? {opacity: 1, x: 0} : {opacity: 1, x: 0}}
          transition={{delay: reduce ? 0 : i * 0.1}}
        >
          {label}
        </motion.p>
      ))}
    </div>
  )
}

export function QuoteFollowupStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-1.5">
      <p className="font-mono text-[6px] uppercase tracking-wide text-dark/55">Quote Follow-Up Autopilot</p>
      <div className="flex gap-1">
        {['1', '2', '3', 'Stop'].map((label, i) => (
          <motion.span
            key={label}
            className="flex-1 rounded-sm py-1.5 text-center font-mono text-[7px] font-bold"
            style={{
              backgroundColor: i === 3 ? FUNNEL_COLOURS.ink : `${colors.teal}18`,
              color: i === 3 ? '#fff' : colors.teal,
            }}
            initial={reduce ? false : {opacity: 0, y: 4}}
            animate={go ? {opacity: 1, y: 0} : {opacity: 1, y: 0}}
            transition={{delay: reduce ? 0 : i * 0.08}}
          >
            {label}
          </motion.span>
        ))}
      </div>
      <p className="font-mono text-[6px] text-dark/50">Stops on reply, booking, or opt-out</p>
    </div>
  )
}
