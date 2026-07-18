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
    <div ref={ref} className="mt-8 md:mt-10 max-w-md mx-auto w-full">
      {mode === 'after' ? (
        <SmsCard play={play} reduce={reduce} businessLabel={label} />
      ) : (
        <MissCard play={play} businessLabel={label} />
      )}
    </div>
  )
}

/** Big phone, hard vibrate, loud red NO ANSWER. */
function MissCard({play, businessLabel}: {play: boolean; businessLabel: string}) {
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
              x: [0, -4, 4, -4, 3, -2, 2, 0],
              y: [0, 2, -2, 2, -1, 1, 0],
              rotate: [0, -0.9, 1, -0.8, 0.6, 0],
            }
          : {x: 0, y: 0, rotate: 0}
      }
      transition={
        play
          ? {duration: 0.7, repeat: Infinity, repeatDelay: 0.55, ease: 'easeInOut'}
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
          When you miss
        </p>
        <span
          className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
          style={{color: FUNNEL_COLOURS.onInk}}
        >
          Ringing out
        </span>
      </div>

      <div className="relative px-5 py-8 flex flex-col items-center text-center">
        <motion.div
          className="relative mb-5 flex h-28 w-28 md:h-32 md:w-32 items-center justify-center rounded-full"
          style={{
            backgroundColor: FUNNEL_COLOURS.accent,
            boxShadow: `0 0 0 10px ${FUNNEL_COLOURS.accent}33, 0 0 0 22px ${FUNNEL_COLOURS.accent}18`,
          }}
          animate={
            play
              ? {
                  x: [0, -1.5, 1.5, -1, 1, 0],
                  rotate: [0, -1.5, 1.5, -1, 0.8, 0],
                  scale: [1, 1.01, 1, 1.01, 1],
                }
              : {x: 0, rotate: 0, scale: 1}
          }
          transition={
            play
              ? {duration: 1.1, repeat: Infinity, repeatDelay: 0.7, ease: 'easeInOut'}
              : {duration: 0.2}
          }
        >
          <span
            className="font-serif text-5xl md:text-6xl leading-none"
            style={{color: FUNNEL_COLOURS.onInk}}
            aria-hidden
          >
            ☎
          </span>
          {play ? (
            <>
              <motion.span
                className="absolute inset-0 rounded-full border-2"
                style={{borderColor: FUNNEL_COLOURS.accent}}
                animate={{scale: [1, 1.55], opacity: [0.7, 0]}}
                transition={{duration: 0.9, repeat: Infinity, ease: 'easeOut'}}
              />
              <motion.span
                className="absolute inset-0 rounded-full border-2"
                style={{borderColor: FUNNEL_COLOURS.accent}}
                animate={{scale: [1, 1.8], opacity: [0.5, 0]}}
                transition={{duration: 0.9, repeat: Infinity, ease: 'easeOut', delay: 0.25}}
              />
            </>
          ) : null}
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
          No answer
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

/** Conversation won by the competition — not another ringing phone. */
function CompetitorCard({play}: {play: boolean}) {
  return (
    <div
      className="relative w-full overflow-hidden border h-full min-h-[300px] flex flex-col"
      style={{
        borderColor: `${FUNNEL_COLOURS.accent}55`,
        backgroundColor: FUNNEL_COLOURS.surface,
        boxShadow: `10px 14px 0 0 ${FUNNEL_COLOURS.accent}28`,
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
          Meanwhile
        </p>
        <motion.span
          className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
          style={{color: FUNNEL_COLOURS.accent}}
          animate={play ? {opacity: [0.55, 1, 0.55]} : {opacity: 0.9}}
          transition={play ? {duration: 1.4, repeat: Infinity} : {duration: 0.2}}
        >
          On a call
        </motion.span>
      </div>

      <div className="flex-1 px-5 py-6 flex flex-col">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4"
          style={{color: FUNNEL_COLOURS.steel}}
        >
          The competition
        </p>

        {/* Talk scene: two people + voice bars, not a ringing handset */}
        <div className="flex-1 flex flex-col items-center justify-center gap-5">
          <div className="flex items-end justify-center gap-6 w-full max-w-[220px]">
            <div className="flex flex-col items-center gap-2">
              <motion.div
                className="h-14 w-14 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: FUNNEL_COLOURS.ink,
                  backgroundColor: FUNNEL_COLOURS.ground,
                }}
                animate={play ? {y: [0, -2, 0]} : {y: 0}}
                transition={play ? {duration: 1.8, repeat: Infinity, ease: 'easeInOut'} : undefined}
              >
                <span className="font-serif text-lg" style={{color: FUNNEL_COLOURS.ink}}>
                  C
                </span>
              </motion.div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-dark/45">
                Caller
              </span>
            </div>

            <div className="flex items-end gap-1 pb-8 h-12" aria-hidden>
              {[0.45, 0.85, 0.55, 1, 0.65, 0.9, 0.5].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1.5 rounded-sm"
                  style={{backgroundColor: FUNNEL_COLOURS.accent, height: `${h * 100}%`}}
                  animate={
                    play
                      ? {scaleY: [0.35, 1, 0.5, 0.95, 0.4], opacity: [0.55, 1, 0.7, 1, 0.55]}
                      : {scaleY: 1, opacity: 0.75}
                  }
                  transition={
                    play
                      ? {
                          duration: 0.9,
                          repeat: Infinity,
                          delay: i * 0.07,
                          ease: 'easeInOut',
                        }
                      : {duration: 0.2}
                  }
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-2">
              <motion.div
                className="h-14 w-14 rounded-full flex items-center justify-center"
                style={{backgroundColor: FUNNEL_COLOURS.accent}}
                animate={play ? {y: [0, -2, 0]} : {y: 0}}
                transition={
                  play
                    ? {duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2}
                    : undefined
                }
              >
                <span className="font-serif text-lg" style={{color: FUNNEL_COLOURS.onInk}}>
                  ✓
                </span>
              </motion.div>
              <span
                className="font-mono text-[9px] uppercase tracking-widest"
                style={{color: FUNNEL_COLOURS.accentDeep}}
              >
                Answered
              </span>
            </div>
          </div>

          <div className="w-full space-y-2 max-w-[240px]">
            <motion.div
              className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm px-3 py-2 text-left"
              style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
              animate={play ? {opacity: [0.75, 1, 0.75]} : {opacity: 1}}
              transition={play ? {duration: 2.2, repeat: Infinity} : undefined}
            >
              <p className="font-sans text-[12px] leading-snug">
                Yes, we can do that. Booked for Thursday.
              </p>
            </motion.div>
            <div
              className="max-w-[70%] rounded-2xl rounded-bl-sm px-3 py-2 border text-left"
              style={{
                borderColor: `${FUNNEL_COLOURS.ink}14`,
                backgroundColor: FUNNEL_COLOURS.ground,
              }}
            >
              <p className="font-sans text-[12px] leading-snug" style={{color: FUNNEL_COLOURS.ink}}>
                Perfect, see you then.
              </p>
            </div>
          </div>
        </div>

        <div
          className="mt-6 w-full border-t pt-4"
          style={{borderColor: `${FUNNEL_COLOURS.accent}40`}}
        >
          <p
            className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-center"
            style={{color: FUNNEL_COLOURS.accent}}
          >
            One client less
          </p>
          <p
            className="mt-1.5 font-sans text-sm text-center leading-snug"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            They got the job. You never knew the call existed.
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * Fix-section animation kit: miss → your SMS → optional questions reply → still warm.
 */
function SmsCard({
  play,
  reduce,
  businessLabel,
}: {
  play: boolean
  reduce: boolean | null
  businessLabel: string
}) {
  return (
    <div
      className="relative w-full overflow-hidden border"
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
          After the fix
        </p>
        <motion.span
          className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
          style={{color: FUNNEL_COLOURS.goldDeep}}
          initial={reduce ? false : {opacity: 0}}
          animate={play ? {opacity: [0.55, 1, 0.55]} : {opacity: 0.9}}
          transition={
            play
              ? {duration: 1.6, repeat: Infinity, delay: reduce ? 0 : 1.8}
              : {duration: 0.2}
          }
        >
          Thread live
        </motion.span>
      </div>

      <div className="px-4 py-5 md:px-5 md:py-6 space-y-3">
        {/* Step 1: miss */}
        <motion.div
          className="flex items-center gap-2"
          initial={reduce ? false : {opacity: 0, y: 8}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.5}}
          transition={{duration: 0.35}}
        >
          <motion.div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{backgroundColor: FUNNEL_COLOURS.accent}}
            animate={
              play
                ? {rotate: [0, -4, 4, -3, 0], scale: [1, 1.04, 1]}
                : {rotate: 0, scale: 1}
            }
            transition={
              play
                ? {duration: 0.7, repeat: 2, repeatDelay: 0.15, ease: 'easeInOut'}
                : {duration: 0.2}
            }
          >
            <span className="font-serif text-base" style={{color: FUNNEL_COLOURS.onInk}}>
              ☎
            </span>
          </motion.div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em]" style={{color: FUNNEL_COLOURS.accentDeep}}>
              Missed · {businessLabel}
            </p>
            <p className="font-sans text-xs" style={{color: FUNNEL_COLOURS.muted}}>
              No answer
            </p>
          </div>
        </motion.div>

        {/* Step 2: your SMS with hook */}
        <motion.div
          className="ml-auto max-w-[92%] rounded-2xl rounded-br-sm px-3.5 py-3 text-left"
          style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
          initial={reduce ? false : {opacity: 0, y: 12, scale: 0.96}}
          whileInView={{opacity: 1, y: 0, scale: 1}}
          viewport={{once: true, amount: 0.4}}
          transition={{duration: 0.45, delay: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1]}}
        >
          <p
            className="font-mono text-[8px] uppercase tracking-[0.16em] mb-1.5"
            style={{color: `${FUNNEL_COLOURS.onInk}70`}}
          >
            You · SMS
          </p>
          <p className="font-sans text-[13px] leading-relaxed">
            Sorry we missed your call, we'll ring you back shortly. If you want, reply with any
            questions meanwhile.
          </p>
        </motion.div>

        {/* Step 3: optional reply */}
        <motion.div
          className="max-w-[88%] rounded-2xl rounded-bl-sm border px-3.5 py-3 text-left"
          style={{
            borderColor: `${FUNNEL_COLOURS.gold}55`,
            backgroundColor: FUNNEL_COLOURS.ground,
          }}
          initial={reduce ? false : {opacity: 0, y: 12, scale: 0.96}}
          whileInView={{opacity: 1, y: 0, scale: 1}}
          viewport={{once: true, amount: 0.4}}
          transition={{duration: 0.45, delay: reduce ? 0 : 1.05, ease: [0.16, 1, 0.3, 1]}}
        >
          <p
            className="font-mono text-[8px] uppercase tracking-[0.16em] mb-1.5"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Them · optional
          </p>
          <p className="font-sans text-[13px] leading-relaxed" style={{color: FUNNEL_COLOURS.ink}}>
            Do you cover Bondi, and what's the soonest you can start?
          </p>
        </motion.div>

        {/* Step 4: outcome */}
        <motion.div
          className="pt-1 flex items-center justify-between gap-3 border-t"
          style={{borderColor: `${FUNNEL_COLOURS.ink}12`}}
          initial={reduce ? false : {opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{delay: reduce ? 0 : 1.55, duration: 0.4}}
        >
          <p className="font-sans text-xs leading-snug" style={{color: FUNNEL_COLOURS.muted}}>
            They can wait, or leave a note while they wait.
          </p>
          <span
            className="shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.14em] px-2 py-1"
            style={{
              backgroundColor: FUNNEL_COLOURS.gold,
              color: FUNNEL_COLOURS.ink,
            }}
          >
            Warm
          </span>
        </motion.div>
      </div>
    </div>
  )
}

/**
 * Impact pair after the leak copy: hard miss vibrate, then competitor on a call.
 */
export function MissedCallLeakPair({businessName}: {businessName?: string | null}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.3})
  const play = inView && !reduce
  const label = businessName?.trim() || 'Your business'

  return (
    <div ref={ref} className="mt-10 md:mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 items-stretch">
        <MissCard play={play} businessLabel={label} />
        <CompetitorCard play={play} />
      </div>
    </div>
  )
}
