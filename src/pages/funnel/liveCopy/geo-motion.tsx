import React from 'react'
import {motion} from 'framer-motion'
import {colors} from '../../../constants/theme'
import {FUNNEL_COLOURS} from '../funnelTheme'

type VisualProps = {reduce: boolean | null}
type StackVisualProps = {reduce: boolean | null; play: boolean}

/** GEO benefit: shot in AI answers. */
function GeoAiShotVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">AI answer</span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
          Citeable
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-2 px-2.5">
        <motion.div
          className="flex-1 rounded-md border px-2 py-2 text-center"
          style={{borderColor: `${FUNNEL_COLOURS.accent}40`, backgroundColor: `${FUNNEL_COLOURS.accent}0A`}}
          initial={reduce ? false : {opacity: 0, x: -6}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
        >
          <p className="font-mono text-[6px] uppercase tracking-wide mb-1" style={{color: FUNNEL_COLOURS.accent}}>
            Before
          </p>
          <p className="font-sans text-[8px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
            Skipped
          </p>
        </motion.div>
        <motion.span
          className="font-mono text-[9px] font-bold"
          style={{color: colors.teal}}
          initial={reduce ? false : {opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: 0.15}}
        >
          →
        </motion.span>
        <motion.div
          className="flex-1 rounded-md px-2 py-2 text-center"
          style={{backgroundColor: colors.teal}}
          initial={reduce ? false : {opacity: 0, x: 6}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          transition={{delay: 0.2}}
        >
          <p className="font-mono text-[6px] uppercase tracking-wide text-white/70 mb-1">After</p>
          <p className="font-mono text-[8px] font-bold text-white">Named</p>
        </motion.div>
      </div>
    </div>
  )
}

/** GEO benefit: FAQ schema. */
function GeoFaqSchemaVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">FAQ schema</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-2.5">
        {['Q on page', 'Markup matched'].map((label, i) => (
          <motion.div
            key={label}
            className="w-full flex items-center justify-between rounded-md border px-2.5 py-1.5"
            style={{borderColor: `${colors.teal}35`, backgroundColor: `${colors.teal}08`}}
            initial={reduce ? false : {opacity: 0, y: 6}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: reduce ? 0 : i * 0.12}}
          >
            <span className="font-sans text-[9px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              {label}
            </span>
            <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
              Ready
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** GEO benefit: honest scope. */
function GeoHonestScopeVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center justify-between px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Scope</span>
        <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
          Honest
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-1.5 px-2.5">
        <motion.div
          className="w-full rounded-md border px-2 py-1.5"
          style={{borderColor: `${colors.teal}40`, backgroundColor: `${colors.teal}0C`}}
          initial={reduce ? false : {opacity: 0, y: 4}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
        >
          <p className="font-sans text-[8px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
            Pages and schema we change
          </p>
        </motion.div>
        <motion.div
          className="w-full rounded-md border px-2 py-1.5 text-center"
          style={{borderColor: `${FUNNEL_COLOURS.ink}18`}}
          initial={reduce ? false : {opacity: 0, y: 4}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{delay: 0.15}}
        >
          <p className="font-mono text-[8px] font-bold uppercase tracking-wide" style={{color: FUNNEL_COLOURS.steel}}>
            No ChatGPT guarantee
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/** GEO benefit: pairs with existing search and content work. */
function GeoPairsVisual({reduce}: VisualProps) {
  return (
    <div className="relative h-[118px] w-full rounded-sm overflow-hidden border border-dark/12 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Beside</span>
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
            SEARCH
          </span>
          <span className="font-sans text-[8px]" style={{color: FUNNEL_COLOURS.ink}}>
            If index is already fine
          </span>
        </motion.div>
        <motion.div
          className="w-full rounded-sm py-1.5 text-center"
          style={{backgroundColor: FUNNEL_COLOURS.accent}}
          initial={reduce ? false : {opacity: 0, y: 4}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{delay: 0.2}}
        >
          <span className="font-mono text-[8px] font-bold uppercase tracking-wide text-white">
            GEO stands alone
          </span>
        </motion.div>
      </div>
    </div>
  )
}

export const BENEFIT_VISUALS = [
  GeoAiShotVisual,
  GeoFaqSchemaVisual,
  GeoHonestScopeVisual,
  GeoPairsVisual,
]

function GeoPagesStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Service pages</span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-1 px-2.5 py-2">
        {['Offer clear', 'Who you serve'].map((label, i) => (
          <motion.div
            key={label}
            className="flex items-center justify-between rounded-md border px-2 py-1"
            style={{borderColor: `${colors.teal}35`, backgroundColor: `${colors.teal}08`}}
            initial={reduce ? false : {opacity: 0, y: 4}}
            animate={go ? {opacity: 1, y: 0} : {opacity: 0.35}}
            transition={{delay: reduce ? 0 : i * 0.1}}
          >
            <span className="font-sans text-[8px] font-semibold truncate" style={{color: FUNNEL_COLOURS.ink}}>
              {label}
            </span>
            <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: colors.teal}}>
              Quote
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function GeoSchemaStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">FAQ schema</span>
      </div>
      <div className="flex-1 flex items-center justify-center gap-1.5 px-2.5">
        <motion.div
          className="flex-1 rounded-md border px-2 py-1.5 text-center"
          style={{borderColor: `${FUNNEL_COLOURS.ink}20`}}
          initial={reduce ? false : {opacity: 0, x: -4}}
          animate={go ? {opacity: 1, x: 0} : {opacity: 0.4}}
        >
          <p className="font-sans text-[8px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
            On page
          </p>
        </motion.div>
        <span className="font-mono text-[9px] font-bold" style={{color: colors.teal}}>
          =
        </span>
        <motion.div
          className="flex-1 rounded-md px-2 py-1.5 text-center"
          style={{backgroundColor: colors.teal}}
          initial={reduce ? false : {opacity: 0, x: 4}}
          animate={go ? {opacity: 1, x: 0} : {opacity: 0.4}}
          transition={{delay: reduce ? 0 : 0.15}}
        >
          <p className="font-mono text-[8px] font-bold text-white">Markup</p>
        </motion.div>
      </div>
    </div>
  )
}

function GeoFactsStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Fact cleanup</span>
      </div>
      <div className="flex-1 flex items-center px-2.5">
        <motion.div
          className="w-full rounded-md border px-2 py-1.5"
          style={{borderColor: `${colors.teal}40`, backgroundColor: `${colors.teal}0C`}}
          initial={reduce ? false : {opacity: 0, y: 4}}
          animate={go ? {opacity: 1, y: 0} : {opacity: 0.4}}
        >
          <p className="font-mono text-[7px] font-bold" style={{color: colors.teal}}>
            ONE SOURCE
          </p>
          <p className="font-sans text-[8px]" style={{color: FUNNEL_COLOURS.ink}}>
            Hours, location, claims
          </p>
        </motion.div>
      </div>
    </div>
  )
}

function GeoHandoffStackVisual({reduce, play}: StackVisualProps) {
  const go = play || reduce
  return (
    <div className="w-full min-h-[88px] border border-dark/15 bg-white flex flex-col">
      <div className="h-6 shrink-0 border-b border-dark/10 bg-cream flex items-center px-2.5">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-dark/45">Handoff</span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-1 px-2.5 py-2">
        {['What changed', 'What to keep'].map((label, i) => (
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

export const STACK_VISUALS = [
  GeoPagesStackVisual,
  GeoSchemaStackVisual,
  GeoFactsStackVisual,
  GeoHandoffStackVisual,
]
