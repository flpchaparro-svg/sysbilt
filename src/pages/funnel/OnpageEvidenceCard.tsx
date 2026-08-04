import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

function initialsOf(name?: string | null) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return null
  return parts
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}

function slugOf(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '') || 'yourbusiness'
}

/**
 * Proof: a brand-only title tag resolves into a title that names the service
 * and the suburb. Shape-first, almost no words.
 */
export function OnpageEvidenceCard({business}: {business?: string | null}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const go = !reduce && inView
  const initials = initialsOf(business)
  const name = business?.trim() || 'Your Business'
  const slug = slugOf(name)

  return (
    <motion.div
      ref={ref}
      className="mt-2 rounded-xl overflow-hidden border max-w-2xl"
      style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.surface}}
      initial={reduce ? false : {opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.5, ease: EASE}}
    >
      <div
        className="px-3 py-2 flex items-center gap-1.5"
        style={{backgroundColor: `${FUNNEL_COLOURS.ink}16`}}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.accent}70`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.gold}80`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.ink}25`}} />
        <div
          className="h-5 w-5 rounded-sm ml-1 flex items-center justify-center"
          style={{backgroundColor: `${FUNNEL_COLOURS.ink}1C`}}
        >
          {initials ? (
            <span className="font-mono text-[7px] font-bold" style={{color: FUNNEL_COLOURS.steel}}>
              {initials}
            </span>
          ) : null}
        </div>
        <div className="ml-auto relative h-3 w-32">
          <motion.span
            className="absolute inset-0 text-right font-mono text-[8px] uppercase tracking-[0.14em]"
            style={{color: FUNNEL_COLOURS.muted}}
            animate={{opacity: go ? 0 : 1}}
            transition={{duration: 0.3, delay: go ? 0.9 : 0}}
          >
            Title · brand only
          </motion.span>
          <motion.span
            className="absolute inset-0 text-right font-mono text-[8px] font-bold uppercase tracking-[0.16em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
            initial={{opacity: 0}}
            animate={{opacity: go ? 1 : 0}}
            transition={{duration: 0.3, delay: go ? 0.95 : 0}}
          >
            Title clear
          </motion.span>
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col gap-3">
        {/* SERP breadcrumb: domain, then a service path that fades in */}
        <div className="flex items-center gap-1.5">
          <span
            className="h-3 w-3 rounded-full shrink-0"
            style={{backgroundColor: `${FUNNEL_COLOURS.ink}24`}}
          />
          <span className="font-mono text-[9px]" style={{color: FUNNEL_COLOURS.steel}}>
            {slug}.com.au
          </span>
          <motion.span
            className="font-mono text-[9px]"
            style={{color: `${FUNNEL_COLOURS.steel}90`}}
            animate={{opacity: go ? 1 : 0, x: go ? 0 : -4}}
            transition={{duration: 0.35, delay: go ? 0.55 : 0}}
          >
            › services · bayside
          </motion.span>
        </div>

        {/* Title crossfade: vague brand-only line resolves into service + suburb */}
        <div className="relative h-6 w-full">
          <motion.p
            className="absolute inset-0 font-serif text-base font-semibold truncate"
            style={{color: FUNNEL_COLOURS.ink}}
            animate={{opacity: go ? 0 : 1}}
            transition={{duration: 0.3, delay: go ? 0.15 : 0}}
          >
            {name} | Home
          </motion.p>
          <motion.p
            className="absolute inset-0 font-serif text-base font-semibold truncate"
            style={{color: FUNNEL_COLOURS.goldDeep}}
            initial={{opacity: 0}}
            animate={{opacity: go ? 1 : 0}}
            transition={{duration: 0.35, delay: go ? 0.35 : 0}}
          >
            Bathroom Renovations Bayside | {name}
          </motion.p>
        </div>

        {/* Description bars settle wider once the title is doing its job */}
        <div className="space-y-1.5 pt-0.5">
          <motion.div
            className="h-1.5 rounded-sm"
            style={{backgroundColor: `${FUNNEL_COLOURS.ink}2C`}}
            animate={{width: go ? '92%' : '68%'}}
            transition={{duration: 0.4, delay: 0.5, ease: EASE}}
          />
          <motion.div
            className="h-1.5 rounded-sm"
            style={{backgroundColor: `${FUNNEL_COLOURS.ink}24`}}
            animate={{width: go ? '66%' : '44%'}}
            transition={{duration: 0.4, delay: 0.6, ease: EASE}}
          />
        </div>
      </div>
    </motion.div>
  )
}
