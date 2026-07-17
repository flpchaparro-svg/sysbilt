import React, {useEffect, useId, useMemo, useRef, useState} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {scoreStrokeColour} from './funnelPersonalise'
import {FUNNEL_COLOURS} from './funnelTheme'

const CX = 160
const CY = 160
const TRACK_R = 118
const TRACK_C = 2 * Math.PI * TRACK_R
const COUNT_MS = 1500

type ScoreMomentProps = {
  businessName?: string | null
  score: number | null
  /** live = prospect score; benchmark = Google's good band; example = localhost/demo with no ?s= */
  mode?: 'live' | 'benchmark' | 'example'
}

/** Google PSI band labels — keep the stamps aligned with Google's words. */
function scoreBand(score: number): string {
  if (score < 50) return 'POOR'
  if (score < 90) return 'SLOW'
  return 'GOOD'
}

function TickMarks({colour}: {colour: string}) {
  const ticks = useMemo(() => {
    const out: Array<{x1: number; y1: number; x2: number; y2: number; major: boolean}> = []
    for (let i = 0; i <= 100; i += 5) {
      const major = i % 25 === 0
      const a = ((i / 100) * 360 - 90) * (Math.PI / 180)
      const r1 = TRACK_R + (major ? 10 : 6)
      const r2 = TRACK_R + (major ? 22 : 14)
      out.push({
        x1: CX + Math.cos(a) * r1,
        y1: CY + Math.sin(a) * r1,
        x2: CX + Math.cos(a) * r2,
        y2: CY + Math.sin(a) * r2,
        major,
      })
    }
    return out
  }, [])

  return (
    <g aria-hidden>
      {ticks.map((t, i) => (
        <line
          key={i}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={t.major ? colour : 'rgba(26,26,26,0.28)'}
          strokeWidth={t.major ? 2.5 : 1.25}
          strokeLinecap="square"
        />
      ))}
    </g>
  )
}

function CornerBrackets() {
  const s = 18
  const inset = 8
  const corners = [
    {x: inset, y: inset, dx: 1, dy: 1},
    {x: 320 - inset, y: inset, dx: -1, dy: 1},
    {x: inset, y: 320 - inset, dx: 1, dy: -1},
    {x: 320 - inset, y: 320 - inset, dx: -1, dy: -1},
  ]
  return (
    <g aria-hidden stroke={FUNNEL_COLOURS.ink} strokeWidth="2.5" fill="none">
      {corners.map((c, i) => (
        <path
          key={i}
          d={`M ${c.x} ${c.y + c.dy * s} L ${c.x} ${c.y} L ${c.x + c.dx * s} ${c.y}`}
        />
      ))}
    </g>
  )
}

/**
 * Brutalist mobile Google score dial.
 * Google PSI stroke colours (red / orange / teal). Counts once on scroll-in.
 */
export function ScoreMoment({
  businessName,
  score,
  mode = 'live',
}: ScoreMomentProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const filterId = useId().replace(/:/g, '')
  const inView = useInView(rootRef, {once: true, amount: 0.35})
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(0)
  const [landed, setLanded] = useState(false)

  const isBenchmark = mode === 'benchmark'
  const isExample = mode === 'example'
  const cornerLabel = isBenchmark
    ? 'THE BENCHMARK'
    : isExample
      ? 'EXAMPLE'
      : businessName

  useEffect(() => {
    if (!inView || score == null) return
    if (reduceMotion) {
      setDisplay(score)
      setLanded(true)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(score * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        setDisplay(score)
        setLanded(true)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, score, reduceMotion])

  if (score == null) return null

  const colour = scoreStrokeColour(score)
  const stamp = scoreBand(score)
  const dash = TRACK_C * (score / 100)
  const arcTransition = reduceMotion
    ? {duration: 0}
    : {duration: COUNT_MS / 1000, ease: [0.16, 1, 0.3, 1] as const}
  const arcAnimate = inView
    ? {strokeDashoffset: TRACK_C - dash}
    : {strokeDashoffset: TRACK_C}

  return (
    <div ref={rootRef} className="my-10 md:my-14 flex justify-center">
      <motion.div
        className="relative w-full max-w-[340px] md:max-w-[400px] aspect-square"
        initial={reduceMotion ? false : {opacity: 0, y: 24, scale: 0.96}}
        animate={inView ? {opacity: 1, y: 0, scale: 1} : undefined}
        transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
      >
        <div
          className="absolute -inset-3 md:-inset-5 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${colour}38 0%, ${colour}10 45%, transparent 70%)`,
            opacity: 0.85,
          }}
          aria-hidden
        />

        <div
          className="absolute inset-0 border-2 overflow-hidden"
          style={{
            borderColor: FUNNEL_COLOURS.ink,
            backgroundColor: FUNNEL_COLOURS.surface,
            boxShadow: `8px 8px 0 0 ${FUNNEL_COLOURS.ink}20`,
          }}
        >
          {cornerLabel ? (
            <p
              className="absolute top-3 left-3 z-20 font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.22em] max-w-[72%] truncate"
              style={{color: FUNNEL_COLOURS.ink}}
            >
              {cornerLabel}
            </p>
          ) : null}

          <motion.p
            className="absolute bottom-3 right-3 z-20 font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.24em] px-2 py-1"
            style={{backgroundColor: colour, color: FUNNEL_COLOURS.onInk}}
            initial={reduceMotion ? false : {opacity: 0, y: 6}}
            animate={landed ? {opacity: 1, y: 0} : {opacity: 0}}
            transition={{duration: 0.25}}
          >
            {stamp}
          </motion.p>

          <svg
            viewBox="0 0 320 320"
            className="absolute inset-0 w-full h-full"
            aria-hidden
          >
            <defs>
              <filter
                id={`${filterId}-soft`}
                x="-35%"
                y="-35%"
                width="170%"
                height="170%"
              >
                <feDropShadow
                  dx="0"
                  dy="4"
                  stdDeviation="6"
                  floodColor={colour}
                  floodOpacity="0.45"
                />
              </filter>
            </defs>

            <CornerBrackets />

            <circle
              cx={CX}
              cy={CY}
              r={TRACK_R + 26}
              fill="none"
              stroke="rgba(26,26,26,0.12)"
              strokeWidth="1"
            />
            <circle
              cx={CX}
              cy={CY}
              r={TRACK_R + 4}
              fill="none"
              stroke="rgba(26,26,26,0.16)"
              strokeWidth="1"
            />

            <TickMarks colour={colour} />

            <motion.circle
              cx={CX}
              cy={CY}
              r={96}
              fill={colour}
              initial={{opacity: 0}}
              animate={inView ? {opacity: 0.08} : {opacity: 0}}
              transition={{duration: 0.6, delay: 0.15}}
            />
            <circle
              cx={CX}
              cy={CY}
              r={96}
              fill="none"
              stroke="rgba(26,26,26,0.16)"
              strokeWidth="1.5"
            />

            <circle
              cx={CX}
              cy={CY}
              r={TRACK_R}
              fill="none"
              stroke="rgba(26,26,26,0.1)"
              strokeWidth="22"
            />

            <motion.circle
              cx={CX}
              cy={CY + 2}
              r={TRACK_R}
              fill="none"
              stroke={FUNNEL_COLOURS.ink}
              strokeOpacity={0.18}
              strokeWidth="24"
              strokeLinecap="butt"
              strokeDasharray={`${TRACK_C} ${TRACK_C}`}
              transform={`rotate(-90 ${CX} ${CY + 2})`}
              initial={reduceMotion ? false : {strokeDashoffset: TRACK_C}}
              animate={arcAnimate}
              transition={arcTransition}
            />

            <motion.circle
              cx={CX}
              cy={CY}
              r={TRACK_R}
              fill="none"
              stroke={colour}
              strokeWidth="22"
              strokeLinecap="butt"
              strokeDasharray={`${TRACK_C} ${TRACK_C}`}
              transform={`rotate(-90 ${CX} ${CY})`}
              filter={`url(#${filterId}-soft)`}
              initial={reduceMotion ? false : {strokeDashoffset: TRACK_C}}
              animate={arcAnimate}
              transition={arcTransition}
            />

            <motion.circle
              cx={CX}
              cy={CY}
              r={TRACK_R - 5}
              fill="none"
              stroke={FUNNEL_COLOURS.surface}
              strokeOpacity={0.55}
              strokeWidth="2.5"
              strokeLinecap="butt"
              strokeDasharray={`${TRACK_C} ${TRACK_C}`}
              transform={`rotate(-90 ${CX} ${CY})`}
              initial={reduceMotion ? false : {strokeDashoffset: TRACK_C}}
              animate={arcAnimate}
              transition={arcTransition}
            />

            {landed ? (
              <motion.g
                initial={reduceMotion ? false : {opacity: 0, scale: 0.5}}
                animate={{opacity: 1, scale: 1}}
                style={{transformOrigin: `${CX}px ${CY}px`}}
              >
                {(() => {
                  const a = ((score / 100) * 360 - 90) * (Math.PI / 180)
                  const x = CX + Math.cos(a) * TRACK_R
                  const y = CY + Math.sin(a) * TRACK_R
                  return (
                    <circle
                      cx={x}
                      cy={y}
                      r={5}
                      fill={FUNNEL_COLOURS.ink}
                      stroke={colour}
                      strokeWidth="2"
                    />
                  )
                })()}
              </motion.g>
            ) : null}
          </svg>

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6">
            <motion.span
              className="font-serif text-[88px] md:text-[112px] leading-none tabular-nums tracking-tight"
              style={{
                color: FUNNEL_COLOURS.ink,
                textShadow: landed ? `0 6px 24px ${colour}40` : undefined,
              }}
              animate={
                landed && !reduceMotion ? {scale: [1, 1.06, 1]} : undefined
              }
              transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
            >
              {display}
            </motion.span>
            <p
              className="mt-3 font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.26em] text-center"
              style={{color: FUNNEL_COLOURS.muted}}
            >
              Mobile Google score
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
