import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

type CallMissedMomentProps = {
  businessName?: string | null
  /** before = ring-out leak; after = text-back landed */
  mode?: 'before' | 'after'
}

/**
 * Missed-call proof visual: phone rings out, then (in after mode) SMS lands.
 */
export function CallMissedMoment({
  businessName,
  mode = 'before',
}: CallMissedMomentProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const play = inView && !reduce
  const label = businessName?.trim() || 'Your business'

  return (
    <div ref={ref} className="mt-8 md:mt-10">
      <div
        className="relative mx-auto max-w-sm overflow-hidden border"
        style={{
          borderColor: `${FUNNEL_COLOURS.ink}18`,
          backgroundColor: FUNNEL_COLOURS.surface,
          boxShadow: `8px 12px 0 0 ${FUNNEL_COLOURS.ink}14`,
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}12`,
            backgroundColor: FUNNEL_COLOURS.ground,
          }}
        >
          <p
            className="font-mono text-[9px] uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.steel}}
          >
            {mode === 'after' ? 'After the fix' : 'When you miss'}
          </p>
          <motion.span
            className="font-mono text-[9px] uppercase tracking-[0.16em]"
            style={{color: mode === 'after' ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.accent}}
            animate={play ? {opacity: [0.55, 1, 0.55]} : {opacity: 0.85}}
            transition={play ? {duration: 1.6, repeat: Infinity} : {duration: 0.2}}
          >
            {mode === 'after' ? 'Text sent' : 'Ringing out'}
          </motion.span>
        </div>

        <div className="px-5 py-8 flex flex-col items-center text-center">
          <motion.div
            className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-full border"
            style={{
              borderColor: mode === 'after' ? FUNNEL_COLOURS.gold : FUNNEL_COLOURS.accent,
              backgroundColor: FUNNEL_COLOURS.ground,
            }}
            animate={
              play && mode === 'before'
                ? {scale: [1, 1.06, 1], rotate: [0, -4, 4, 0]}
                : {scale: 1, rotate: 0}
            }
            transition={
              play && mode === 'before'
                ? {duration: 1.2, repeat: Infinity, ease: 'easeInOut'}
                : {duration: 0.2}
            }
          >
            <span
              className="font-serif text-2xl leading-none"
              style={{color: FUNNEL_COLOURS.ink}}
            >
              ☎
            </span>
            {mode === 'before' ? (
              <motion.span
                className="absolute inset-0 rounded-full border"
                style={{borderColor: FUNNEL_COLOURS.accent}}
                animate={play ? {scale: [1, 1.45], opacity: [0.55, 0]} : {opacity: 0}}
                transition={
                  play
                    ? {duration: 1.4, repeat: Infinity, ease: 'easeOut'}
                    : {duration: 0.2}
                }
              />
            ) : null}
          </motion.div>

          <p
            className="font-sans text-sm mb-1"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            Caller dialled
          </p>
          <p
            className="font-serif text-xl md:text-2xl mb-6"
            style={{color: FUNNEL_COLOURS.ink}}
          >
            {label}
          </p>

          {mode === 'before' ? (
            <p
              className="font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{color: FUNNEL_COLOURS.accentDeep}}
            >
              No answer · They hang up
            </p>
          ) : (
            <motion.div
              className="w-full text-left border px-4 py-3"
              style={{
                borderColor: `${FUNNEL_COLOURS.gold}55`,
                backgroundColor: FUNNEL_COLOURS.ground,
              }}
              initial={reduce ? false : {opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            >
              <p
                className="font-mono text-[9px] uppercase tracking-[0.18em] mb-2"
                style={{color: FUNNEL_COLOURS.goldDeep}}
              >
                SMS · just now
              </p>
              <p
                className="font-sans text-sm leading-relaxed"
                style={{color: FUNNEL_COLOURS.ink}}
              >
                Sorry we missed your call. We will ring you back shortly, or reply here and we will
                sort a time.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
