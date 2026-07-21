import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Leak pair: voicemail dead end vs answered + booked.
 */
export function AiPhoneLeakPair({businessName}: {businessName?: string | null}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.3})
  const play = inView && !reduce
  const label = businessName?.trim() || 'Your business'

  return (
    <div ref={ref} className="mt-10 md:mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 items-stretch">
        <VoicemailCard play={play} businessLabel={label} />
        <AnsweredBookedCard play={play} />
      </div>
    </div>
  )
}

function VoicemailCard({play, businessLabel}: {play: boolean; businessLabel: string}) {
  return (
    <motion.div
      className="relative w-full overflow-hidden border h-full min-h-[300px]"
      style={{
        borderColor: FUNNEL_COLOURS.accent,
        backgroundColor: FUNNEL_COLOURS.surface,
        boxShadow: `10px 14px 0 0 ${FUNNEL_COLOURS.accent}40`,
      }}
      animate={
        play
          ? {
              x: [0, -3, 3, -2, 2, 0],
              y: [0, 1, -1, 1, 0],
            }
          : {x: 0, y: 0}
      }
      transition={
        play
          ? {duration: 0.85, repeat: Infinity, repeatDelay: 0.7, ease: 'easeInOut'}
          : {duration: 0.2}
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(ellipse 90% 70% at 50% 35%, ${FUNNEL_COLOURS.accent}55 0%, transparent 62%)`,
        }}
        aria-hidden
      />

      <div
        className="relative flex items-center justify-between px-4 py-3 border-b"
        style={{
          borderColor: `${FUNNEL_COLOURS.accent}40`,
          backgroundColor: FUNNEL_COLOURS.accent,
        }}
      >
        <p
          className="font-mono text-[9px] uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.onInk}}
        >
          After hours
        </p>
        <span
          className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
          style={{color: FUNNEL_COLOURS.onInk}}
        >
          Voicemail
        </span>
      </div>

      <div className="relative px-5 py-8 flex flex-col items-center text-center">
        <motion.div
          className="relative mb-5 flex h-24 w-24 md:h-28 md:w-28 items-center justify-center rounded-full"
          style={{
            backgroundColor: FUNNEL_COLOURS.accent,
            boxShadow: `0 0 0 8px ${FUNNEL_COLOURS.accent}33`,
          }}
          animate={play ? {opacity: [1, 0.75, 1]} : {opacity: 1}}
          transition={play ? {duration: 1.6, repeat: Infinity} : {duration: 0.2}}
        >
          <span
            className="font-serif text-4xl md:text-5xl leading-none"
            style={{color: FUNNEL_COLOURS.onInk}}
            aria-hidden
          >
            ☎
          </span>
        </motion.div>

        <p className="font-sans text-sm mb-1" style={{color: FUNNEL_COLOURS.muted}}>
          Caller dialled
        </p>
        <p className="font-serif text-xl md:text-2xl mb-6" style={{color: FUNNEL_COLOURS.ink}}>
          {businessLabel}
        </p>

        <p
          className="mt-auto font-mono text-sm md:text-base font-bold uppercase tracking-[0.2em] px-4 py-2"
          style={{
            color: FUNNEL_COLOURS.onInk,
            backgroundColor: FUNNEL_COLOURS.accent,
          }}
        >
          Leave a message
        </p>
        <p
          className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{color: FUNNEL_COLOURS.accentDeep}}
        >
          They hang up
        </p>
      </div>
    </motion.div>
  )
}

function AnsweredBookedCard({play}: {play: boolean}) {
  return (
    <div
      className="relative w-full overflow-hidden border h-full min-h-[300px] flex flex-col"
      style={{
        borderColor: `${FUNNEL_COLOURS.goldDeep}55`,
        backgroundColor: FUNNEL_COLOURS.surface,
        boxShadow: `10px 14px 0 0 ${FUNNEL_COLOURS.goldDeep}28`,
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
          With AI phone
        </p>
        <motion.span
          className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
          style={{color: FUNNEL_COLOURS.goldDeep}}
          animate={play ? {opacity: [0.55, 1, 0.55]} : {opacity: 0.9}}
          transition={play ? {duration: 1.4, repeat: Infinity} : {duration: 0.2}}
        >
          On the line
        </motion.span>
      </div>

      <div className="flex-1 px-5 py-6 flex flex-col">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4"
          style={{color: FUNNEL_COLOURS.steel}}
        >
          Live call
        </p>

        <div className="space-y-3 flex-1">
          {[
            {who: 'Caller', line: 'Can you fit us in this week?'},
            {who: 'Agent', line: 'Yes. Tuesday at 10 is free. Shall I book that?'},
            {who: 'Caller', line: 'Yes, please.'},
          ].map((row, i) => (
            <motion.div
              key={`${row.who}-${i}`}
              className="rounded-lg px-3 py-2.5 border"
              style={{
                borderColor: `${FUNNEL_COLOURS.ink}10`,
                backgroundColor: i % 2 === 1 ? `${FUNNEL_COLOURS.goldDeep}10` : FUNNEL_COLOURS.ground,
              }}
              animate={play ? {opacity: [0.55, 1, 0.55]} : {opacity: 0.9}}
              transition={
                play
                  ? {duration: 2, repeat: Infinity, delay: i * 0.35}
                  : {duration: 0.2}
              }
            >
              <p
                className="font-mono text-[8px] uppercase tracking-[0.18em] mb-1"
                style={{color: FUNNEL_COLOURS.muted}}
              >
                {row.who}
              </p>
              <p className="font-sans text-sm leading-snug" style={{color: FUNNEL_COLOURS.ink}}>
                {row.line}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.span
          className="mt-5 self-start font-mono text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1.5 text-white"
          style={{backgroundColor: '#1F7A4D'}}
          animate={play ? {scale: [1, 1.04, 1]} : {scale: 1}}
          transition={play ? {duration: 1.6, repeat: Infinity} : {duration: 0.2}}
        >
          Booked · Handed off
        </motion.span>
      </div>
    </div>
  )
}
