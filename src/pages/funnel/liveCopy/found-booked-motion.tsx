import React from 'react'
import {motion} from 'framer-motion'
import {colors} from '../../../constants/theme'
import {FUNNEL_COLOURS} from '../funnelTheme'

type BenefitVisualProps = {reduce: boolean | null}
type StackVisualProps = {reduce: boolean | null; play: boolean}

function FoundBookedAccessVisual({reduce}: BenefitVisualProps) {
  const chips = ['Maps', 'Calendar', 'Phone']
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">One handover</span>
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

function FoundBookedPathVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Both ways in</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-3">
        {['Find on Maps', 'Book now or text-back'].map((label, i) => (
          <motion.div
            key={label}
            className="w-full rounded-md px-2 py-1.5 text-center"
            style={{backgroundColor: i === 1 ? colors.teal : `${colors.teal}18`}}
            initial={reduce ? false : {opacity: 0, y: 6}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : i * 0.12}}
          >
            <p
              className="font-mono text-[8px] font-bold"
              style={{color: i === 1 ? '#fff' : FUNNEL_COLOURS.ink}}
            >
              {label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function FoundBookedPriceVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Apart</span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
          Pack
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-3">
        <p
          className="font-mono text-[10px] line-through"
          style={{color: FUNNEL_COLOURS.steel}}
        >
          $2,850
        </p>
        <motion.div
          className="w-full rounded-md py-2 text-center"
          style={{backgroundColor: colors.teal}}
          initial={reduce ? false : {opacity: 0, scale: 0.96}}
          whileInView={{opacity: 1, scale: 1}}
          viewport={{once: true}}
          transition={{delay: 0.15, type: 'spring', stiffness: 320, damping: 18}}
        >
          <p className="font-mono text-[10px] font-bold text-white">$2,300 · one window</p>
        </motion.div>
      </div>
    </div>
  )
}

function FoundBookedNextVisual({reduce}: BenefitVisualProps) {
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
            Profile, Book now, missed-call SMS
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
          <span className="font-mono text-[8px] font-bold uppercase tracking-wide text-white">
            Review Engine later
          </span>
        </motion.div>
      </div>
    </div>
  )
}

function FoundBookedProfileStack({reduce, play}: StackVisualProps) {
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

function FoundBookedBookingStack({reduce, play}: StackVisualProps) {
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

function FoundBookedMissedStack({reduce, play}: StackVisualProps) {
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

export const FOUND_BOOKED_BENEFIT_VISUALS = [
  FoundBookedAccessVisual,
  FoundBookedPathVisual,
  FoundBookedPriceVisual,
  FoundBookedNextVisual,
]

export const FOUND_BOOKED_STACK_VISUALS = [
  FoundBookedProfileStack,
  FoundBookedBookingStack,
  FoundBookedMissedStack,
]
