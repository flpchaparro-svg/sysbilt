import React from 'react'
import {motion} from 'framer-motion'
import {colors} from '../../../constants/theme'
import {FUNNEL_COLOURS} from '../funnelTheme'

type BenefitVisualProps = {reduce: boolean | null}
type StackVisualProps = {reduce: boolean | null; play: boolean}

/** Benefit: same open window stays warm. */
function BundleSpeedNextWindowVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Access</span>
        <motion.span
          className="font-mono text-[7px] font-bold uppercase tracking-wide"
          style={{color: colors.teal}}
          animate={reduce ? undefined : {opacity: [0.55, 1, 0.55]}}
          transition={{duration: 1.6, repeat: Infinity, ease: 'easeInOut'}}
        >
          Still warm
        </motion.span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-2 px-2.5">
        <motion.div
          className="h-10 w-10 rounded-md border flex items-center justify-center shrink-0"
          style={{borderColor: `${colors.teal}45`, backgroundColor: `${colors.teal}12`}}
          animate={reduce ? undefined : {scale: [1, 1.06, 1]}}
          transition={{duration: 1.4, repeat: Infinity, ease: 'easeInOut'}}
        >
          <span className="font-mono text-[8px] font-bold" style={{color: colors.teal}}>
            Key
          </span>
        </motion.div>
        <motion.div
          className="flex-1 h-1.5 rounded-full overflow-hidden"
          style={{backgroundColor: FUNNEL_COLOURS.mockFill}}
        >
          <motion.div
            className="h-full rounded-full origin-left"
            style={{backgroundColor: colors.teal}}
            initial={reduce ? false : {scaleX: 0.25}}
            whileInView={{scaleX: 1}}
            viewport={{once: true}}
            transition={{duration: 0.7, ease: 'easeOut'}}
          />
        </motion.div>
        <motion.div
          className="rounded-md px-2 py-1.5 shrink-0"
          style={{backgroundColor: FUNNEL_COLOURS.ink}}
          initial={reduce ? false : {opacity: 0, x: 6}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          transition={{delay: 0.25}}
        >
          <span className="font-mono text-[7px] font-bold uppercase tracking-wide text-white">Next</span>
        </motion.div>
      </div>
    </div>
  )
}

/** Benefit: convert + measure in one pass. */
function BundleSpeedNextTogetherVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">One pass</span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-1.5 px-2.5">
        <motion.div
          className="flex-1 rounded-md border px-2 py-2.5 text-center"
          style={{borderColor: `${colors.teal}40`, backgroundColor: `${colors.teal}0A`}}
          initial={reduce ? false : {opacity: 0, y: 8}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
        >
          <div className="mx-auto mb-1.5 h-1.5 w-10 rounded-full" style={{backgroundColor: colors.teal}} />
          <p className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
            Convert
          </p>
        </motion.div>
        <motion.span
          className="font-mono text-[11px] font-bold shrink-0"
          style={{color: colors.teal}}
          animate={reduce ? undefined : {scale: [1, 1.15, 1]}}
          transition={{duration: 1.2, repeat: Infinity, ease: 'easeInOut'}}
        >
          +
        </motion.span>
        <motion.div
          className="flex-1 rounded-md px-2 py-2.5 text-center"
          style={{backgroundColor: colors.teal}}
          initial={reduce ? false : {opacity: 0, y: 8}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{delay: 0.12}}
        >
          <motion.div
            className="mx-auto mb-1.5 h-2 w-2 rounded-full bg-white"
            animate={reduce ? undefined : {opacity: [0.35, 1, 0.35]}}
            transition={{duration: 1.1, repeat: Infinity, ease: 'easeInOut'}}
          />
          <p className="font-mono text-[7px] font-bold uppercase tracking-wide text-white">Measure</p>
        </motion.div>
      </div>
    </div>
  )
}

/** Benefit: one list price for both jobs. */
function BundleSpeedNextPriceVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">List price</span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
          Bundle
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-3">
        <div className="flex w-full items-center gap-1.5">
          {['Convert', 'Measure'].map((label, i) => (
            <motion.div
              key={label}
              className="flex-1 rounded-md border px-1.5 py-1.5 text-center"
              style={{borderColor: `${FUNNEL_COLOURS.ink}18`}}
              initial={reduce ? false : {opacity: 0, y: 6}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: reduce ? 0 : i * 0.1}}
            >
              <p className="font-mono text-[6px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.steel}}>
                {label}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="w-full rounded-md py-2 text-center"
          style={{backgroundColor: colors.teal}}
          initial={reduce ? false : {opacity: 0, scale: 0.96}}
          whileInView={{opacity: 1, scale: 1}}
          viewport={{once: true}}
          transition={{delay: 0.2, type: 'spring', stiffness: 320, damping: 18}}
        >
          <p className="font-mono text-[10px] font-bold text-white">$2,400 · one window</p>
        </motion.div>
      </div>
    </div>
  )
}

/** Benefit: fast, clear, measurable story. */
function BundleSpeedNextStoryVisual({reduce}: BenefitVisualProps) {
  const steps = [
    {label: 'Fast', fill: 0.45},
    {label: 'Clear', fill: 0.7},
    {label: 'Measurable', fill: 1},
  ]
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Client story</span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-1.5 px-2.5">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <span className="w-14 shrink-0 font-sans text-[8px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              {step.label}
            </span>
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{backgroundColor: FUNNEL_COLOURS.mockFill}}>
              <motion.div
                className="h-full rounded-full origin-left"
                style={{backgroundColor: colors.teal}}
                initial={reduce ? false : {scaleX: 0}}
                whileInView={{scaleX: step.fill}}
                viewport={{once: true}}
                transition={{delay: reduce ? 0 : 0.1 + i * 0.12, duration: 0.45, ease: 'easeOut'}}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Stack: vague page → clear CTA button. */
function BundleSpeedNextConversionStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Conversion Pass</span>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2 px-2.5 py-2">
        <div className="rounded-md border px-2 py-2 flex flex-col gap-1.5" style={{borderColor: `${FUNNEL_COLOURS.ink}14`}}>
          <motion.div
            className="h-1.5 w-4/5 rounded-sm"
            style={{backgroundColor: FUNNEL_COLOURS.mockBar}}
            animate={go ? {opacity: [0.35, 0.55, 0.35]} : {opacity: 0.45}}
            transition={{duration: 1.4, repeat: Infinity, ease: 'easeInOut'}}
          />
          <div className="h-1.5 w-3/5 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
          <motion.div
            className="mt-auto h-5 w-full rounded-sm"
            style={{backgroundColor: FUNNEL_COLOURS.mockFill}}
            animate={go ? {opacity: [0.5, 0.25, 0.5]} : {opacity: 0.4}}
            transition={{duration: 1.4, repeat: Infinity, ease: 'easeInOut'}}
          />
          <p className="font-mono text-[6px] uppercase tracking-wide text-center" style={{color: FUNNEL_COLOURS.steel}}>
            Vague
          </p>
        </div>
        <motion.div
          className="rounded-md border px-2 py-2 flex flex-col gap-1.5"
          style={{borderColor: `${colors.teal}40`, backgroundColor: `${colors.teal}08`}}
          initial={reduce ? false : {opacity: 0.35, x: 8}}
          animate={go ? {opacity: 1, x: 0} : {opacity: 1, x: 0}}
          transition={{type: 'spring', stiffness: 320, damping: 20}}
        >
          <motion.div
            className="h-1.5 w-4/5 rounded-sm origin-left"
            style={{backgroundColor: FUNNEL_COLOURS.mockBar}}
            initial={reduce ? false : {scaleX: 0.5}}
            animate={go ? {scaleX: 1} : {scaleX: 1}}
            transition={{delay: reduce ? 0 : 0.15}}
          />
          <div className="h-1.5 w-1/2 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
          <motion.div
            className="mt-auto h-5 w-full rounded-sm flex items-center justify-center"
            style={{backgroundColor: colors.teal}}
            animate={go ? {scale: [1, 1.04, 1]} : {scale: 1}}
            transition={{duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3}}
          >
            <span className="font-mono text-[7px] font-bold uppercase tracking-wide text-white">Ask</span>
          </motion.div>
          <p className="font-mono text-[6px] uppercase tracking-wide text-center" style={{color: colors.teal}}>
            Clear
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/** Stack: form action → event → destination. */
function BundleSpeedNextTrackingStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Tracking and Forms</span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-2">
        <motion.div
          className="rounded-md border px-2 py-2 text-center shrink-0"
          style={{borderColor: `${FUNNEL_COLOURS.ink}18`}}
          initial={reduce ? false : {opacity: 0.4}}
          animate={go ? {opacity: 1} : {opacity: 1}}
        >
          <div className="mx-auto mb-1 h-4 w-8 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
          <p className="font-mono text-[6px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.steel}}>
            Form
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
          className="h-8 w-8 rounded-full flex items-center justify-center shrink-0"
          style={{backgroundColor: `${colors.teal}18`, border: `1px solid ${colors.teal}45`}}
          animate={go ? {scale: [1, 1.12, 1]} : {scale: 1}}
          transition={{duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.15}}
        >
          <motion.div
            className="h-2 w-2 rounded-full"
            style={{backgroundColor: colors.teal}}
            animate={go ? {opacity: [0.4, 1, 0.4]} : {opacity: 1}}
            transition={{duration: 0.9, repeat: Infinity, ease: 'easeInOut'}}
          />
        </motion.div>
        <motion.span
          className="font-mono text-[10px] font-bold shrink-0"
          style={{color: colors.teal}}
          animate={go ? {x: [0, 3, 0], opacity: [0.5, 1, 0.5]} : {opacity: 0.8}}
          transition={{duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: 0.2}}
        >
          →
        </motion.span>
        <motion.div
          className="rounded-md px-2 py-2 text-center shrink-0"
          style={{backgroundColor: colors.teal}}
          initial={reduce ? false : {opacity: 0.35, scale: 0.92}}
          animate={go ? {opacity: 1, scale: 1} : {opacity: 1, scale: 1}}
          transition={{delay: reduce ? 0 : 0.35, type: 'spring', stiffness: 340, damping: 18}}
        >
          <p className="font-mono text-[7px] font-bold uppercase tracking-wide text-white">Inbox</p>
        </motion.div>
      </div>
    </div>
  )
}

export const BUNDLE_SPEED_NEXT_BENEFIT_VISUALS = [
  BundleSpeedNextWindowVisual,
  BundleSpeedNextTogetherVisual,
  BundleSpeedNextPriceVisual,
  BundleSpeedNextStoryVisual,
]

export const BUNDLE_SPEED_NEXT_STACK_VISUALS = [
  BundleSpeedNextConversionStackVisual,
  BundleSpeedNextTrackingStackVisual,
]
