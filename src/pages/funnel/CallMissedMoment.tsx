import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

type CallMissedMomentProps = {
  businessName?: string | null
  /** before = ring-out leak; after = text-back landed */
  mode?: 'before' | 'after'
}

/**
 * Single card: miss (ring out) or after (SMS landed). Used in the fix bridge.
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
      <PhoneCard
        play={play}
        reduce={reduce}
        variant={mode === 'after' ? 'sms' : 'miss'}
        businessLabel={label}
      />
    </div>
  )
}

type PhoneCardVariant = 'miss' | 'competitor' | 'sms'

function PhoneCard({
  play,
  reduce,
  variant,
  businessLabel,
}: {
  play: boolean
  reduce: boolean | null
  variant: PhoneCardVariant
  businessLabel: string
}) {
  const isMiss = variant === 'miss'
  const isCompetitor = variant === 'competitor'
  const isSms = variant === 'sms'

  return (
    <div
      className="relative w-full overflow-hidden border h-full"
      style={{
        borderColor: isCompetitor
          ? `${FUNNEL_COLOURS.accent}55`
          : `${FUNNEL_COLOURS.ink}18`,
        backgroundColor: FUNNEL_COLOURS.surface,
        boxShadow: isCompetitor
          ? `8px 12px 0 0 ${FUNNEL_COLOURS.accent}28`
          : `8px 12px 0 0 ${FUNNEL_COLOURS.ink}14`,
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
          {isSms ? 'After the fix' : isCompetitor ? 'Meanwhile' : 'When you miss'}
        </p>
        <motion.span
          className="font-mono text-[9px] uppercase tracking-[0.16em]"
          style={{
            color: isSms
              ? FUNNEL_COLOURS.goldDeep
              : isCompetitor
                ? FUNNEL_COLOURS.accent
                : FUNNEL_COLOURS.accent,
          }}
          animate={play ? {opacity: [0.55, 1, 0.55]} : {opacity: 0.85}}
          transition={play ? {duration: 1.6, repeat: Infinity} : {duration: 0.2}}
        >
          {isSms ? 'Text sent' : isCompetitor ? 'They answered' : 'Ringing out'}
        </motion.span>
      </div>

      <div className="px-5 py-7 flex flex-col items-center text-center min-h-[260px]">
        <motion.div
          className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-full border"
          style={{
            borderColor: isSms ? FUNNEL_COLOURS.gold : FUNNEL_COLOURS.accent,
            backgroundColor: FUNNEL_COLOURS.ground,
          }}
          animate={
            play && isMiss
              ? {scale: [1, 1.06, 1], rotate: [0, -4, 4, 0]}
              : {scale: 1, rotate: 0}
          }
          transition={
            play && isMiss
              ? {duration: 1.2, repeat: Infinity, ease: 'easeInOut'}
              : {duration: 0.2}
          }
        >
          <span className="font-serif text-2xl leading-none" style={{color: FUNNEL_COLOURS.ink}}>
            ☎
          </span>
          {isMiss ? (
            <motion.span
              className="absolute inset-0 rounded-full border"
              style={{borderColor: FUNNEL_COLOURS.accent}}
              animate={play ? {scale: [1, 1.45], opacity: [0.55, 0]} : {opacity: 0}}
              transition={
                play ? {duration: 1.4, repeat: Infinity, ease: 'easeOut'} : {duration: 0.2}
              }
            />
          ) : null}
        </motion.div>

        <p className="font-sans text-sm mb-1" style={{color: FUNNEL_COLOURS.muted}}>
          {isCompetitor ? 'Caller dialled next' : 'Caller dialled'}
        </p>
        <p className="font-serif text-xl md:text-2xl mb-6" style={{color: FUNNEL_COLOURS.ink}}>
          {isCompetitor ? 'The competition' : businessLabel}
        </p>

        {isMiss ? (
          <p
            className="font-mono text-[11px] uppercase tracking-[0.18em] mt-auto"
            style={{color: FUNNEL_COLOURS.accentDeep}}
          >
            No answer · They hang up
          </p>
        ) : null}

        {isCompetitor ? (
          <div className="mt-auto w-full space-y-2">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{color: FUNNEL_COLOURS.accent}}
            >
              Answered · Job booked
            </p>
            <p
              className="font-sans text-sm leading-relaxed"
              style={{color: FUNNEL_COLOURS.muted}}
            >
              One client less for you. You never knew they called.
            </p>
          </div>
        ) : null}

        {isSms ? (
          <motion.div
            className="w-full text-left border px-4 py-3 mt-auto"
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
            <p className="font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.ink}}>
              Sorry we missed your call. We will ring you back shortly, or reply here and we will
              sort a time.
            </p>
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}

/**
 * Impact pair after the leak copy: your miss, then the competitor wins.
 * Supports the story. Does not tell it.
 */
export function MissedCallLeakPair({businessName}: {businessName?: string | null}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.3})
  const play = inView && !reduce
  const label = businessName?.trim() || 'Your business'

  return (
    <div ref={ref} className="mt-10 md:mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        <PhoneCard play={play} reduce={reduce} variant="miss" businessLabel={label} />
        <PhoneCard play={play} reduce={reduce} variant="competitor" businessLabel={label} />
      </div>
    </div>
  )
}
