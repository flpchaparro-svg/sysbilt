import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

export type WebsiteEvidence =
  | {mode: 'nosite'; business: string}
  | {mode: 'score'; business: string; score: number}
  | {mode: 'try'}

const EASE = [0.16, 1, 0.3, 1] as const

function Frame({
  children,
  accent = false,
}: {
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        border: `1px solid ${accent ? `${FUNNEL_COLOURS.accent}35` : `${FUNNEL_COLOURS.ink}14`}`,
        backgroundColor: FUNNEL_COLOURS.surface,
        boxShadow: `0 1px 0 ${FUNNEL_COLOURS.ink}1C, 0 18px 40px -28px ${FUNNEL_COLOURS.ink}55`,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${
            accent ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.gold
          }88, transparent)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-0 right-0 h-16 w-16"
        style={{
          background: `linear-gradient(225deg, ${
            accent ? `${FUNNEL_COLOURS.accent}12` : `${FUNNEL_COLOURS.gold}14`
          }, transparent 70%)`,
        }}
        aria-hidden
      />
      {children}
    </div>
  )
}

/**
 * Evidence card: no website / bad mobile score / try-it-yourself.
 */
export function WebsiteEvidenceCard({evidence}: {evidence: WebsiteEvidence}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const show = reduce || inView

  if (evidence.mode === 'try') {
    return (
      <motion.div
        ref={ref}
        className="mt-8 md:mt-10 w-full max-w-2xl"
        initial={reduce ? false : {opacity: 0, y: 22}}
        animate={show ? {opacity: 1, y: 0} : {opacity: 0, y: 22}}
        transition={{duration: 0.6, ease: EASE}}
      >
        <Frame>
          <div className="px-6 py-7 md:px-8 md:py-8">
            <div className="flex items-center gap-3 mb-5">
              <span
                className="h-px w-8"
                style={{backgroundColor: FUNNEL_COLOURS.goldDeep}}
                aria-hidden
              />
              <p
                className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.26em]"
                style={{color: FUNNEL_COLOURS.goldDeep}}
              >
                Try it now
              </p>
            </div>
            <p
              className="font-serif font-bold text-xl md:text-2xl leading-snug tracking-tight"
              style={{color: FUNNEL_COLOURS.ink}}
            >
              Open your site in a private window on your phone, on mobile data, not wifi
            </p>
            <p
              className="mt-4 font-sans text-sm md:text-[15px] leading-relaxed"
              style={{color: FUNNEL_COLOURS.muted}}
            >
              Your own phone already has the site in memory, so it loads fast for you. A stranger
              gets the first-load wait. Count the seconds before anything appears, then ask whether
              they would have stayed.
            </p>
          </div>
        </Frame>
      </motion.div>
    )
  }

  if (evidence.mode === 'nosite') {
    const name = evidence.business.toUpperCase()
    return (
      <motion.div
        ref={ref}
        className="mt-8 md:mt-10 w-full max-w-2xl"
        initial={reduce ? false : {opacity: 0, y: 22}}
        animate={show ? {opacity: 1, y: 0} : {opacity: 0, y: 22}}
        transition={{duration: 0.6, ease: EASE}}
      >
        <Frame accent>
          <div className="px-6 py-7 md:px-8 md:py-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <p
                className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.24em]"
                style={{color: FUNNEL_COLOURS.accent}}
              >
                Searched · {name}
              </p>
              <span
                className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1"
                style={{
                  color: FUNNEL_COLOURS.onInk,
                  backgroundColor: FUNNEL_COLOURS.accent,
                }}
              >
                Dead end
              </span>
            </div>

            <p
              className="font-serif font-bold text-3xl md:text-[2.75rem] tracking-tight leading-none"
              style={{color: FUNNEL_COLOURS.ink}}
            >
              No website found
            </p>
            <p className="mt-3 font-sans text-sm" style={{color: FUNNEL_COLOURS.muted}}>
              Google Maps listing, no site attached
            </p>

            <div
              className="mt-6 rounded-md border border-dashed p-4 md:p-5"
              style={{
                borderColor: `${FUNNEL_COLOURS.ink}22`,
                backgroundColor: `${FUNNEL_COLOURS.ink}04`,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p
                    className="font-sans text-sm font-semibold truncate"
                    style={{color: FUNNEL_COLOURS.ink}}
                  >
                    {evidence.business}
                  </p>
                  <p className="mt-1 font-mono text-[11px]" style={{color: FUNNEL_COLOURS.steel}}>
                    Phone · Open now · Directions
                  </p>
                </div>
                <motion.span
                  className="shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-1"
                  style={{
                    color: FUNNEL_COLOURS.accent,
                    backgroundColor: `${FUNNEL_COLOURS.accent}12`,
                    border: `1px solid ${FUNNEL_COLOURS.accent}30`,
                  }}
                  animate={reduce || !show ? undefined : {opacity: [0.55, 1, 0.55]}}
                  transition={{duration: 2.2, repeat: Infinity, ease: 'easeInOut'}}
                >
                  No link
                </motion.span>
              </div>
              <div
                className="mt-4 h-14 rounded border border-dashed flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{
                  borderColor: `${FUNNEL_COLOURS.ink}24`,
                  color: `${FUNNEL_COLOURS.ink}40`,
                  backgroundColor: FUNNEL_COLOURS.surface,
                }}
              >
                Website missing
              </div>
            </div>

            <p
              className="mt-6 font-sans text-sm md:text-[15px] leading-relaxed"
              style={{color: FUNNEL_COLOURS.muted}}
            >
              We looked for {evidence.business} the way a customer would. There is a listing, a
              phone number, and nowhere to go next. Every person who searched you this week hit the
              same wall.
            </p>
          </div>
        </Frame>
      </motion.div>
    )
  }

  const {business, score} = evidence
  return (
    <motion.div
      ref={ref}
      className="mt-8 md:mt-10 w-full max-w-2xl"
      initial={reduce ? false : {opacity: 0, y: 22}}
      animate={show ? {opacity: 1, y: 0} : {opacity: 0, y: 22}}
      transition={{duration: 0.6, ease: EASE}}
    >
      <Frame accent>
        <div className="px-6 py-7 md:px-8 md:py-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <p
              className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.24em]"
              style={{color: FUNNEL_COLOURS.accent}}
            >
              Tested · {business.toUpperCase()}
            </p>
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1"
              style={{
                color: FUNNEL_COLOURS.onInk,
                backgroundColor: FUNNEL_COLOURS.accent,
              }}
            >
              Poor
            </span>
          </div>

          <div className="flex items-end gap-5 md:gap-8">
            <motion.p
              className="font-serif font-bold text-6xl md:text-7xl tracking-tight tabular-nums leading-none"
              style={{color: FUNNEL_COLOURS.ink}}
              initial={reduce ? false : {opacity: 0, scale: 0.92}}
              animate={show ? {opacity: 1, scale: 1} : undefined}
              transition={{duration: 0.55, delay: 0.12, ease: EASE}}
            >
              {score}
            </motion.p>
            <div className="pb-1">
              <p
                className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{color: FUNNEL_COLOURS.steel}}
              >
                Mobile Google score
              </p>
              <div
                className="mt-3 h-1.5 w-36 md:w-44 overflow-hidden rounded-full"
                style={{backgroundColor: `${FUNNEL_COLOURS.ink}2C`}}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{backgroundColor: FUNNEL_COLOURS.accent}}
                  initial={reduce ? false : {width: 0}}
                  animate={show ? {width: `${Math.min(100, Math.max(0, score))}%`} : undefined}
                  transition={{duration: 0.9, delay: 0.2, ease: EASE}}
                />
              </div>
            </div>
          </div>

          <p
            className="mt-6 font-sans text-sm md:text-[15px] leading-relaxed"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            That is what Google measures when someone looks you up on a phone. It is not a design
            opinion. It is the number deciding whether they wait or leave.
          </p>
        </div>
      </Frame>
    </motion.div>
  )
}
