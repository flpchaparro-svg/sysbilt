import React from 'react'
import {motion} from 'framer-motion'
import {colors} from '../../../constants/theme'
import {FUNNEL_COLOURS} from '../funnelTheme'

type BenefitVisualProps = {reduce: boolean | null}
type StackVisualProps = {reduce: boolean | null; play: boolean}

/** Benefit: one access window. */
function BundleClinicAccessVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Access</span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
          One window
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-1.5 px-2.5">
        {['Profile', 'Reviews', 'SMS'].map((label, i) => (
          <motion.div
            key={label}
            className="flex-1 rounded-md border px-1.5 py-2 text-center"
            style={{borderColor: `${colors.teal}35`, backgroundColor: `${colors.teal}08`}}
            initial={reduce ? false : {opacity: 0, y: 6}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : i * 0.1}}
          >
            <p className="font-mono text-[7px] font-bold" style={{color: colors.teal}}>
              {label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Benefit: coherent local story. */
function BundleClinicStoryVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Local story</span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-1.5 px-2.5">
        {['Maps', 'Proof', 'Phone'].map((label, i) => (
          <React.Fragment key={label}>
            <motion.div
              className="rounded-md px-2 py-1.5"
              style={{backgroundColor: colors.teal}}
              initial={reduce ? false : {opacity: 0, scale: 0.9}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{delay: reduce ? 0 : i * 0.12}}
            >
              <p className="font-mono text-[7px] font-bold text-white">{label}</p>
            </motion.div>
            {i < 2 ? (
              <span className="font-mono text-[8px] font-bold" style={{color: colors.teal}}>
                →
              </span>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

/** Benefit: bundle list price. */
function BundleClinicPriceVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">List price</span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
          Bundle
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-2 px-2.5">
        <motion.div
          className="flex-1 rounded-md border px-2 py-2 text-center"
          style={{borderColor: `${FUNNEL_COLOURS.ink}20`}}
          initial={reduce ? false : {opacity: 0, x: -6}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
        >
          <p className="font-mono text-[6px] uppercase tracking-wide mb-1" style={{color: FUNNEL_COLOURS.steel}}>
            Apart
          </p>
          <p className="font-sans text-[9px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
            $2,450
          </p>
        </motion.div>
        <span className="font-mono text-[9px] font-bold" style={{color: colors.teal}}>
          →
        </span>
        <motion.div
          className="flex-1 rounded-md px-2 py-2 text-center"
          style={{backgroundColor: colors.teal}}
          initial={reduce ? false : {opacity: 0, x: 6}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          transition={{delay: 0.15}}
        >
          <p className="font-mono text-[6px] uppercase tracking-wide text-white/70 mb-1">Bundle</p>
          <p className="font-mono text-[9px] font-bold text-white">$2,200</p>
        </motion.div>
      </div>
    </div>
  )
}

/** Benefit: natural next step to booking. */
function BundleClinicNextVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Next step</span>
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
            Capture bundle
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
            Later · Booking
          </span>
        </motion.div>
      </div>
    </div>
  )
}

function BundleClinicProfileStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Google Profile Fix</span>
      </div>
      <div className="flex-1 flex items-center px-2.5">
        <motion.div
          className="w-full rounded-md border px-2 py-1.5"
          style={{borderColor: `${colors.teal}40`, backgroundColor: `${colors.teal}0C`}}
          initial={reduce ? false : {opacity: 0, y: 4}}
          animate={go ? {opacity: 1, y: 0} : {opacity: 0.4}}
        >
          <p className="font-mono text-[7px] font-bold" style={{color: colors.teal}}>
            INCLUDED
          </p>
          <p className="font-sans text-[8px]" style={{color: FUNNEL_COLOURS.ink}}>
            Maps presence cleaned
          </p>
        </motion.div>
      </div>
    </div>
  )
}

function BundleClinicReviewsStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Review Engine</span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-1 px-2.5 py-2">
        {['Ask path', 'Habit live'].map((label, i) => (
          <motion.div
            key={label}
            className="rounded-md border px-2 py-1 text-center"
            style={{borderColor: `${colors.teal}35`, backgroundColor: `${colors.teal}08`}}
            initial={reduce ? false : {opacity: 0, y: 4}}
            animate={go ? {opacity: 1, y: 0} : {opacity: 0.35}}
            transition={{delay: reduce ? 0 : i * 0.1}}
          >
            <span className="font-sans text-[8px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function BundleClinicMissedStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Missed-Call Text-Back</span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-1.5 px-2.5">
        <motion.div
          className="flex-1 rounded-md border px-2 py-1.5 text-center"
          style={{borderColor: `${FUNNEL_COLOURS.ink}20`}}
          initial={reduce ? false : {opacity: 0, x: -4}}
          animate={go ? {opacity: 1, x: 0} : {opacity: 0.4}}
        >
          <p className="font-sans text-[8px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
            Ring out
          </p>
        </motion.div>
        <span className="font-mono text-[9px] font-bold" style={{color: colors.teal}}>
          →
        </span>
        <motion.div
          className="flex-1 rounded-md px-2 py-1.5 text-center"
          style={{backgroundColor: colors.teal}}
          initial={reduce ? false : {opacity: 0, x: 4}}
          animate={go ? {opacity: 1, x: 0} : {opacity: 0.4}}
          transition={{delay: reduce ? 0 : 0.15}}
        >
          <p className="font-mono text-[8px] font-bold text-white">SMS</p>
        </motion.div>
      </div>
    </div>
  )
}

export const BUNDLE_CLINIC_BENEFIT_VISUALS = [
  BundleClinicAccessVisual,
  BundleClinicStoryVisual,
  BundleClinicPriceVisual,
  BundleClinicNextVisual,
]

export const BUNDLE_CLINIC_STACK_VISUALS = [
  BundleClinicProfileStackVisual,
  BundleClinicReviewsStackVisual,
  BundleClinicMissedStackVisual,
]
