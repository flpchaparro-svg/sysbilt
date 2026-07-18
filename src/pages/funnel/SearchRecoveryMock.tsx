import React from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {colors} from '../../constants/theme'
import {FUNNEL_COLOURS} from './funnelTheme'

type SearchRecoveryMockProps = {
  /** Compact card for the dark price band */
  compact?: boolean
  onDark?: boolean
}

/**
 * Generic Search Console-style recovery pattern (no business name).
 */
export function SearchRecoveryMock({compact = false, onDark = false}: SearchRecoveryMockProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.4})
  const reduce = useReducedMotion()
  const show = reduce || inView
  const ink = onDark ? FUNNEL_COLOURS.onInk : FUNNEL_COLOURS.ink
  const muted = onDark ? `${FUNNEL_COLOURS.onInk}88` : FUNNEL_COLOURS.muted
  const border = onDark ? `${FUNNEL_COLOURS.onInk}22` : `${FUNNEL_COLOURS.ink}16`
  const surface = onDark ? 'rgba(255,242,236,0.06)' : FUNNEL_COLOURS.surface

  const card = (
    <motion.div
      ref={ref}
      className={`w-full ${compact ? 'max-w-md' : 'max-w-2xl mt-10'}`}
      initial={reduce ? false : {opacity: 0, y: 14}}
      animate={show ? {opacity: 1, y: 0} : undefined}
      transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
    >
      <div
        className="border p-5 md:p-6"
        style={{
          borderColor: border,
          backgroundColor: surface,
          boxShadow: onDark ? `10px 14px 0 0 ${FUNNEL_COLOURS.ink}55` : undefined,
        }}
      >
        <div className="flex items-center justify-between gap-3 mb-5">
          <p
            className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{color: onDark ? FUNNEL_COLOURS.goldLight : FUNNEL_COLOURS.goldDeep}}
          >
            The recovery pattern
          </p>
          <motion.span
            className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-1"
            style={{
              backgroundColor: FUNNEL_COLOURS.gold,
              color: FUNNEL_COLOURS.ink,
            }}
            animate={
              show
                ? {
                    backgroundColor: [FUNNEL_COLOURS.gold, colors.teal, colors.teal],
                  }
                : {backgroundColor: FUNNEL_COLOURS.gold}
            }
            transition={{delay: 0.8, duration: 0.6}}
          >
            Indexed
          </motion.span>
        </div>

        <svg viewBox="0 0 320 120" className="w-full h-auto" aria-hidden>
          <line
            x1="16"
            y1="100"
            x2="304"
            y2="100"
            stroke={muted}
            strokeWidth="1"
            opacity="0.35"
          />
          <motion.polyline
            fill="none"
            stroke={colors.teal}
            strokeWidth="3"
            strokeLinecap="square"
            points="16,92 60,88 110,78 160,58 210,42 260,28 304,22"
            initial={reduce ? false : {pathLength: 0}}
            animate={show ? {pathLength: 1} : {pathLength: 0}}
            transition={{duration: 1.2, ease: [0.16, 1, 0.3, 1]}}
          />
        </svg>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{color: muted}}>
            Indexed pages
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{color: ink}}>
            Benchmark pattern · not a client result
          </p>
        </div>

        {!compact ? (
          <div className="mt-5 flex flex-wrap gap-2">
            <span
              className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] px-2 py-1"
              style={{backgroundColor: FUNNEL_COLOURS.accent, color: FUNNEL_COLOURS.onInk}}
            >
              Pages: blocked
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em]" style={{color: muted}}>
              →
            </span>
            <span
              className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] px-2 py-1"
              style={{backgroundColor: colors.teal, color: FUNNEL_COLOURS.ink}}
            >
              Indexed
            </span>
          </div>
        ) : null}
      </div>
    </motion.div>
  )

  // Price band: vertically centre the card in the right column (same as Speed Fix report).
  if (compact) {
    return (
      <div className="relative min-h-[280px] md:min-h-full flex items-center justify-center md:justify-end">
        {card}
      </div>
    )
  }

  return card
}
