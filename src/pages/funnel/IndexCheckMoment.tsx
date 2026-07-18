import React, {useEffect, useRef, useState} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const COUNT_MS = 1200

export type IndexCheckEvidence =
  | {mode: 'live'; business: string; pages: number}
  | {mode: 'try'}

/**
 * Indexation evidence: big blocked-page count, or try-it-now fallback.
 */
export function IndexCheckMoment({evidence}: {evidence: IndexCheckEvidence}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(0)
  const isLive = evidence.mode === 'live'
  const target = isLive ? evidence.pages : 0

  useEffect(() => {
    if (!inView || !isLive) return
    if (reduce) {
      setDisplay(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setDisplay(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, isLive, reduce, target])

  if (!isLive) {
    return (
      <motion.div
        ref={rootRef}
        className="mt-8 md:mt-10 w-full max-w-2xl"
        initial={reduce ? false : {opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.4}}
        transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
      >
        <div
          className="relative px-5 py-6 md:px-7 md:py-7"
          style={{
            border: `1px solid ${FUNNEL_COLOURS.ink}16`,
            backgroundColor: FUNNEL_COLOURS.surface,
          }}
        >
          <p
            className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] mb-4"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Try it now
          </p>
          <p
            className="font-serif font-bold text-xl md:text-2xl leading-snug tracking-tight"
            style={{color: FUNNEL_COLOURS.ink}}
          >
            Open Google and search site:yourbusiness.com.au. Count the results, then count the pages
            your site actually has. The gap is what this fixes.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={rootRef}
      className="mt-8 md:mt-10 w-full max-w-2xl"
      initial={reduce ? false : {opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
    >
      <div
        className="relative px-5 py-7 md:px-8 md:py-9"
        style={{
          border: `1px solid ${FUNNEL_COLOURS.ink}16`,
          backgroundColor: FUNNEL_COLOURS.surface,
        }}
      >
        <p
          className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] mb-6"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          Index check · {evidence.business.toUpperCase()}
        </p>
        <p
          className="font-serif font-bold text-6xl md:text-7xl tabular-nums tracking-tight leading-none"
          style={{color: FUNNEL_COLOURS.ink}}
          aria-live="polite"
        >
          {display}
        </p>
        <p
          className="mt-3 font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.22em]"
          style={{color: FUNNEL_COLOURS.muted}}
        >
          Pages Google can&apos;t see
        </p>
        <span
          className="mt-5 inline-block font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1"
          style={{
            color: FUNNEL_COLOURS.onInk,
            backgroundColor: FUNNEL_COLOURS.accent,
          }}
        >
          Blocked
        </span>
      </div>
    </motion.div>
  )
}
