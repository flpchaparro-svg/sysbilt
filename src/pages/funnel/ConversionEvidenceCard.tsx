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

/**
 * Proof: a vague headline and a buried contact chip resolve into one clear
 * gold call to action. Shape-first, almost no words.
 */
export function ConversionEvidenceCard({business}: {business?: string | null}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const go = !reduce && inView
  const initials = initialsOf(business)

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
            Homepage · vague ask
          </motion.span>
          <motion.span
            className="absolute inset-0 text-right font-mono text-[8px] font-bold uppercase tracking-[0.16em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
            initial={{opacity: 0}}
            animate={{opacity: go ? 1 : 0}}
            transition={{duration: 0.3, delay: go ? 0.95 : 0}}
          >
            Ask clear
          </motion.span>
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col items-center gap-5">
        {/* Weak H1: two vague lines settle into one clear, wider line */}
        <div className="w-full max-w-sm flex flex-col items-center gap-2 pt-2">
          <motion.div
            className="h-2.5 rounded-sm"
            style={{backgroundColor: `${FUNNEL_COLOURS.ink}16`}}
            animate={{
              width: go ? '72%' : '56%',
              backgroundColor: go ? `${FUNNEL_COLOURS.ink}24` : `${FUNNEL_COLOURS.ink}16`,
            }}
            transition={{duration: 0.5, delay: 0.1, ease: EASE}}
          />
          <motion.div
            className="h-2.5 rounded-sm"
            style={{backgroundColor: `${FUNNEL_COLOURS.ink}24`}}
            animate={{
              opacity: go ? 0 : 1,
              width: go ? '0%' : '40%',
            }}
            transition={{duration: 0.4, delay: 0.15, ease: EASE}}
          />
        </div>

        {/* Contact: a buried faint chip resolves into a solid gold Enquire button */}
        <div className="relative h-12 w-full max-w-[220px] flex items-center justify-center">
          <motion.div
            className="absolute rounded-sm border border-dashed px-2.5 py-1"
            style={{borderColor: `${FUNNEL_COLOURS.ink}20`}}
            animate={
              go
                ? {opacity: 0, scale: 0.85, y: -4}
                : {opacity: 0.5, scale: 1, y: 0}
            }
            transition={{duration: 0.4, ease: EASE}}
          >
            <span
              className="font-mono text-[7px] uppercase tracking-wide"
              style={{color: `${FUNNEL_COLOURS.ink}45`}}
            >
              Contact
            </span>
          </motion.div>
          <motion.div
            className="absolute rounded-md flex items-center gap-2 px-4 py-2"
            style={{backgroundColor: FUNNEL_COLOURS.gold}}
            initial={false}
            animate={go ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.9}}
            transition={{delay: 0.3, type: 'spring', stiffness: 320, damping: 22}}
          >
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
              style={{color: FUNNEL_COLOURS.ink}}
            >
              Enquire
            </span>
            <motion.span
              className="h-1.5 w-1.5 rounded-full"
              style={{backgroundColor: '#1F7A4D'}}
              animate={go ? {opacity: [0.5, 1, 0.5]} : {opacity: 0}}
              transition={{duration: 1.4, repeat: Infinity}}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
