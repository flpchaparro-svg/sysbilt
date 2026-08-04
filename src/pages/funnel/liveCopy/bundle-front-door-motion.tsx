import React from 'react'
import {motion} from 'framer-motion'
import {colors} from '../../../constants/theme'
import {FUNNEL_COLOURS} from '../funnelTheme'

type BenefitVisualProps = {reduce: boolean | null}
type StackVisualProps = {reduce: boolean | null; play: boolean}

/** Benefit: find → trust → book story. */
function BundleFrontDoorNarrativeVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Call script</span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-1.5 px-2.5">
        {['Find', 'Trust', 'Book'].map((label, i) => (
          <React.Fragment key={label}>
            <motion.div
              className="rounded-md px-2.5 py-2"
              style={{backgroundColor: colors.teal}}
              initial={reduce ? false : {opacity: 0, scale: 0.88, y: 6}}
              whileInView={{opacity: 1, scale: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: reduce ? 0 : i * 0.12, type: 'spring', stiffness: 340, damping: 18}}
            >
              <p className="font-mono text-[8px] font-bold text-white">{label}</p>
            </motion.div>
            {i < 2 ? (
              <motion.span
                className="font-mono text-[10px] font-bold"
                style={{color: colors.teal}}
                animate={reduce ? undefined : {x: [0, 2, 0], opacity: [0.5, 1, 0.5]}}
                transition={{duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15}}
              >
                →
              </motion.span>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

/** Benefit: one kickoff for three jobs. */
function BundleFrontDoorPriceVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">List price</span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
          Bundle
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-3">
        <div className="flex w-full items-center gap-1">
          {['Profile', 'Reviews', 'Book'].map((label, i) => (
            <motion.div
              key={label}
              className="flex-1 rounded-md border px-1 py-1.5 text-center"
              style={{borderColor: `${FUNNEL_COLOURS.ink}16`}}
              initial={reduce ? false : {opacity: 0, y: 6}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: reduce ? 0 : i * 0.08}}
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
          transition={{delay: 0.22, type: 'spring', stiffness: 320, damping: 18}}
        >
          <p className="font-mono text-[10px] font-bold text-white">$3,400 · one window</p>
        </motion.div>
      </div>
    </div>
  )
}

/** Benefit: clinics and service businesses. */
function BundleFrontDoorFitVisual({reduce}: BenefitVisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Fit</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-2.5">
        {['Clinics', 'Service businesses'].map((label, i) => (
          <motion.div
            key={label}
            className="w-full flex items-center gap-2 rounded-md border px-2.5 py-1.5"
            style={{borderColor: `${colors.teal}35`, backgroundColor: `${colors.teal}08`}}
            initial={reduce ? false : {opacity: 0, x: -8}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : i * 0.12}}
          >
            <motion.span
              className="h-2 w-2 rounded-full shrink-0"
              style={{backgroundColor: colors.teal}}
              animate={reduce ? undefined : {scale: [1, 1.25, 1]}}
              transition={{duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2}}
            />
            <span className="font-sans text-[9px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Benefit: later path once Book now is live. */
function BundleFrontDoorUpsellVisual({reduce}: BenefitVisualProps) {
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
            Front door live
          </span>
        </motion.div>
        <motion.div
          className="w-full h-1 rounded-full overflow-hidden"
          style={{backgroundColor: FUNNEL_COLOURS.mockFill}}
        >
          <motion.div
            className="h-full origin-left rounded-full"
            style={{backgroundColor: colors.teal, width: '100%'}}
            initial={reduce ? false : {scaleX: 0}}
            whileInView={{scaleX: 0.55}}
            viewport={{once: true}}
            transition={{delay: 0.2, duration: 0.55}}
          />
        </motion.div>
        <motion.div
          className="w-full rounded-sm py-1.5 text-center"
          style={{backgroundColor: FUNNEL_COLOURS.ink}}
          initial={reduce ? false : {opacity: 0, y: 4}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{delay: 0.25}}
        >
          <span className="font-mono text-[8px] font-bold uppercase tracking-wide text-white">
            No-Show · AI Phone
          </span>
        </motion.div>
      </div>
    </div>
  )
}

/** Stack: profile chips light clean on Maps. */
function BundleFrontDoorProfileStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  const chips = ['Category', 'Photos', 'Hours']
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
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

/** Stack: visit done → ask sent → stars. */
function BundleFrontDoorReviewsStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white px-3 py-2.5 flex flex-col gap-2">
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

/** Stack: call us → Book now button. */
function BundleFrontDoorBookingStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[110px] border border-dark/15 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/55">Booking System</span>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2 px-2.5 py-2">
        <div className="rounded-md border px-2 py-2 flex flex-col gap-1.5" style={{borderColor: `${FUNNEL_COLOURS.ink}14`}}>
          <div className="h-1.5 w-4/5 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockBar}} />
          <div className="h-1.5 w-1/2 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
          <motion.div
            className="mt-auto h-5 w-full rounded-sm flex items-center justify-center"
            style={{backgroundColor: FUNNEL_COLOURS.mockFill}}
            animate={go ? {opacity: [0.55, 0.3, 0.55]} : {opacity: 0.45}}
            transition={{duration: 1.4, repeat: Infinity, ease: 'easeInOut'}}
          >
            <span className="font-mono text-[6px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.steel}}>
              Call us
            </span>
          </motion.div>
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
          />
          <div className="h-1.5 w-1/2 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
          <motion.div
            className="mt-auto h-5 w-full rounded-sm flex items-center justify-center"
            style={{backgroundColor: colors.teal}}
            animate={go ? {scale: [1, 1.04, 1]} : {scale: 1}}
            transition={{duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.25}}
          >
            <span className="font-mono text-[7px] font-bold uppercase tracking-wide text-white">Book now</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export const BUNDLE_FRONT_DOOR_BENEFIT_VISUALS = [
  BundleFrontDoorNarrativeVisual,
  BundleFrontDoorPriceVisual,
  BundleFrontDoorFitVisual,
  BundleFrontDoorUpsellVisual,
]

export const BUNDLE_FRONT_DOOR_STACK_VISUALS = [
  BundleFrontDoorProfileStackVisual,
  BundleFrontDoorReviewsStackVisual,
  BundleFrontDoorBookingStackVisual,
]
