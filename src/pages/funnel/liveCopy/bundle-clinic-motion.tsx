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
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Access</span>
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
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Local story</span>
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
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">List price</span>
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
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Next step</span>
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

/** Stack: profile chips light clean on Maps. */
function BundleClinicProfileStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  const chips = ['Category', 'Photos', 'Hours']
  return (
    <div className="w-full min-h-[96px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
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
            className="flex-1 rounded-sm border px-1 py-1 text-center font-mono text-[6px] uppercase tracking-wide"
            initial={reduce ? false : {opacity: 0.35, y: 4}}
            animate={
              go
                ? {
                    opacity: 1,
                    y: 0,
                    borderColor: colors.teal,
                    backgroundColor: `${colors.teal}14`,
                    color: colors.teal,
                  }
                : {
                    opacity: 1,
                    y: 0,
                    borderColor: FUNNEL_COLOURS.mockBorder,
                    color: FUNNEL_COLOURS.steel,
                  }
            }
            transition={{delay: reduce ? 0 : 0.12 + i * 0.12, type: 'spring', stiffness: 340, damping: 20}}
            style={{borderColor: FUNNEL_COLOURS.mockBorder, color: FUNNEL_COLOURS.steel}}
          >
            {label}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

/** Stack: visit done → ask sent → stars fill. */
function BundleClinicReviewsStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[96px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <motion.div
          className="rounded-sm border px-2 py-1.5 shrink-0"
          style={{borderColor: FUNNEL_COLOURS.mockBorder}}
          initial={reduce ? false : {opacity: 0.45}}
          animate={go ? {opacity: 1} : {opacity: 1}}
        >
          <span className="font-mono text-[6px] uppercase tracking-wide text-dark/55">Visit done</span>
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
          transition={{delay: reduce ? 0 : 0.25, type: 'spring', stiffness: 340, damping: 20}}
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

/** Stack: missed ring → SMS bubble lands. */
function BundleClinicMissedStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[96px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
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
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[6px] uppercase tracking-wide text-dark/55 mb-1">Missed call</p>
          <div className="h-1.5 w-2/3 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockBar}} />
        </div>
      </div>
      <motion.div
        className="self-end max-w-[78%] rounded-lg rounded-br-sm px-2.5 py-1.5"
        style={{backgroundColor: colors.teal}}
        initial={reduce ? false : {opacity: 0, x: 16, y: 4}}
        animate={go ? {opacity: 1, x: 0, y: 0} : {opacity: 1, x: 0, y: 0}}
        transition={{delay: reduce ? 0 : 0.35, type: 'spring', stiffness: 320, damping: 20}}
      >
        <p className="font-sans text-[8px] font-semibold text-white leading-snug">
          Sorry we missed you. Reply to book.
        </p>
      </motion.div>
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
