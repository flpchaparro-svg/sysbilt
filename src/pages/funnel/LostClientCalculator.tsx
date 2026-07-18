import React, {useEffect, useId, useRef, useState} from 'react'
import {ChevronDown, ChevronUp} from 'lucide-react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const DEFAULT_VALUE = 1500
const DEFAULT_LOST = 3

function formatMoney(n: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(Math.round(n))
}

function formatGrouped(n: number): string {
  return new Intl.NumberFormat('en-AU', {maximumFractionDigits: 0}).format(n)
}

type StepperFieldProps = {
  label: string
  suffix?: string
  prefix?: string
  value: number
  step: number
  min?: number
  dirty: boolean
  onDirty: () => void
  onChange: (n: number) => void
  ariaLabel: string
  /** Pulse arrows twice when the calculator scrolls into view */
  pulseArrows?: boolean
}

/** Modern stepper: grey example until touched, gold money figures, no native spinners. */
function StepperField({
  label,
  suffix,
  prefix,
  value,
  step,
  min = 0,
  dirty,
  onDirty,
  onChange,
  ariaLabel,
  pulseArrows = false,
}: StepperFieldProps) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)
  const isExample = !dirty && !focused
  const shown = formatGrouped(value)
  // Money fields read gold; quantity fields stay cream (muted until edited)
  const isMoney = Boolean(prefix)
  const textColor = isMoney
    ? isExample
      ? `${FUNNEL_COLOURS.goldLight}99`
      : FUNNEL_COLOURS.goldLight
    : isExample
      ? `${FUNNEL_COLOURS.onInk}48`
      : FUNNEL_COLOURS.onInk

  const bump = (dir: 1 | -1) => {
    onDirty()
    onChange(Math.max(min, value + dir * step))
  }

  const arrowMotion = pulseArrows
    ? {
        opacity: [0.45, 1, 0.45, 1, 0.75],
        scale: [1, 1.12, 1, 1.12, 1],
      }
    : {opacity: 0.75, scale: 1}

  return (
    <div className="flex-1 min-w-0" onClick={() => inputRef.current?.focus()}>
      <label
        htmlFor={id}
        className="font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.22em] block mb-3 cursor-pointer"
        style={{color: `${FUNNEL_COLOURS.onInk}58`}}
      >
        {label}
      </label>

      <div
        className="relative flex items-end gap-3 border-b pb-2.5 transition-[border-color] duration-200 cursor-text"
        style={{
          borderColor: focused
            ? FUNNEL_COLOURS.goldLight
            : isExample
              ? `${FUNNEL_COLOURS.onInk}22`
              : `${FUNNEL_COLOURS.onInk}45`,
        }}
      >
        <div className="flex items-baseline gap-1.5 min-w-0 flex-1">
          {prefix ? (
            <span
              className="font-serif text-2xl md:text-3xl leading-none select-none"
              style={{
                color: isExample
                  ? `${FUNNEL_COLOURS.goldLight}70`
                  : FUNNEL_COLOURS.goldLight,
              }}
            >
              {prefix}
            </span>
          ) : null}

          <input
            ref={inputRef}
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            spellCheck={false}
            value={shown}
            aria-label={ariaLabel}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              onDirty()
              const raw = e.target.value.replace(/[^\d]/g, '')
              onChange(raw === '' ? 0 : Math.max(min, Number(raw)))
            }}
            className="bg-transparent font-serif text-3xl md:text-4xl tabular-nums outline-none max-w-full"
            style={{
              color: textColor,
              caretColor: FUNNEL_COLOURS.goldLight,
              width: `${Math.max(shown.length, 1) + 0.5}ch`,
            }}
          />

          {suffix ? (
            <span
              className="font-sans text-sm md:text-base whitespace-nowrap pb-1"
              style={{color: `${FUNNEL_COLOURS.onInk}55`}}
            >
              {suffix}
            </span>
          ) : null}
        </div>

        <motion.div
          className="flex flex-col shrink-0 border overflow-hidden"
          style={{borderColor: `${FUNNEL_COLOURS.onInk}22`}}
          initial={false}
          animate={arrowMotion}
          transition={
            pulseArrows
              ? {duration: 1.6, times: [0, 0.2, 0.4, 0.6, 1], ease: 'easeInOut'}
              : {duration: 0.2}
          }
        >
          <button
            type="button"
            aria-label="Increase"
            onClick={(e) => {
              e.stopPropagation()
              bump(1)
            }}
            className="h-6 w-7 flex items-center justify-center transition-colors hover:bg-white/10"
            style={{color: `${FUNNEL_COLOURS.onInk}90`}}
          >
            <ChevronUp className="w-3.5 h-3.5" strokeWidth={2.25} />
          </button>
          <div className="h-px" style={{backgroundColor: `${FUNNEL_COLOURS.onInk}18`}} />
          <button
            type="button"
            aria-label="Decrease"
            onClick={(e) => {
              e.stopPropagation()
              bump(-1)
            }}
            className="h-6 w-7 flex items-center justify-center transition-colors hover:bg-white/10"
            style={{color: `${FUNNEL_COLOURS.onInk}90`}}
          >
            <ChevronDown className="w-3.5 h-3.5" strokeWidth={2.25} />
          </button>
        </motion.div>
      </div>

      <p
        className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-opacity duration-200"
        style={{
          color: `${FUNNEL_COLOURS.onInk}32`,
          opacity: isExample ? 1 : 0,
        }}
      >
        Example · tap or use arrows
      </p>
    </div>
  )
}

/**
 * Cost-of-doing-nothing calculator — landscape, example-grey until touched.
 */
export function LostClientCalculator({
  variant = 'speed',
}: {
  variant?: 'speed' | 'missed-call' | 'google-profile'
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const [value, setValue] = useState(DEFAULT_VALUE)
  const [lost, setLost] = useState(DEFAULT_LOST)
  const [valueDirty, setValueDirty] = useState(false)
  const [lostDirty, setLostDirty] = useState(false)
  const [display, setDisplay] = useState(0)

  const yearly = Math.max(0, value) * Math.max(0, lost) * 12
  const fromRef = useRef(0)

  useEffect(() => {
    if (!inView) return
    const to = yearly
    if (reduce) {
      setDisplay(to)
      fromRef.current = to
      return
    }
    let raf = 0
    const from = fromRef.current
    if (from === to) return
    const start = performance.now()
    const dur = 900
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - t, 3)
      const next = Math.round(from + (to - from) * eased)
      setDisplay(next)
      if (t < 1) raf = requestAnimationFrame(tick)
      else {
        setDisplay(to)
        fromRef.current = to
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [yearly, inView, reduce])

  return (
    <div ref={rootRef} className="mt-14 md:mt-16 w-full">
      <style>{`
        input[inputmode="numeric"]::-webkit-outer-spin-button,
        input[inputmode="numeric"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>

      <div
        className="px-5 py-6 md:px-8 md:py-8"
        style={{
          border: `1px solid ${FUNNEL_COLOURS.onInk}18`,
          backgroundColor: 'rgba(255,242,236,0.04)',
        }}
      >
        <p
          className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.28em] mb-3"
          style={{color: `${FUNNEL_COLOURS.onInk}60`}}
        >
          Do your own maths
        </p>
        <h3
          className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-8 md:mb-10 max-w-lg"
          style={{color: FUNNEL_COLOURS.onInk}}
        >
          What&apos;s one lost client worth to you
        </h3>

        <div className="flex flex-col md:flex-row md:items-stretch gap-2 md:gap-0">
          <StepperField
            label="Average client worth"
            prefix="$"
            value={value}
            step={100}
            dirty={valueDirty}
            onDirty={() => setValueDirty(true)}
            onChange={setValue}
            ariaLabel="Average client value in dollars"
            pulseArrows={inView && !reduce}
          />

          <div
            className="hidden md:block w-px mx-8 shrink-0 self-stretch"
            style={{backgroundColor: `${FUNNEL_COLOURS.onInk}14`}}
            aria-hidden
          />

          <StepperField
            label={
              variant === 'missed-call'
                ? 'Missed calls a month'
                : variant === 'google-profile'
                  ? 'Lost to a thin profile'
                  : 'Lost to a slow site'
            }
            suffix="/ month"
            value={lost}
            step={1}
            dirty={lostDirty}
            onDirty={() => setLostDirty(true)}
            onChange={setLost}
            ariaLabel={
              variant === 'missed-call'
                ? 'Missed calls per month'
                : variant === 'google-profile'
                  ? 'Customers lost to a thin profile per month'
                  : 'Enquiries lost per month'
            }
            pulseArrows={inView && !reduce}
          />
        </div>

        <div
          className="mt-6 md:mt-8 pt-6 md:pt-8"
          style={{borderTop: `1px solid ${FUNNEL_COLOURS.onInk}14`}}
        >
          <motion.p
            className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight tabular-nums leading-tight"
            style={{color: FUNNEL_COLOURS.accent}}
            key={yearly}
            initial={reduce ? false : {opacity: 0.65, y: 6}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3}}
          >
            That&apos;s {formatMoney(display)} a year, walking next door.
          </motion.p>
          <p
            className="mt-2 font-serif text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight leading-tight"
            style={{color: FUNNEL_COLOURS.goldLight}}
          >
            The fix costs less than one of them.
          </p>
          <p
            className="mt-3 font-sans text-sm leading-relaxed max-w-xl"
            style={{color: `${FUNNEL_COLOURS.onInk}65`}}
          >
            Your numbers, not ours. Change them and watch. The leak doesn&apos;t care either way.
          </p>
        </div>
      </div>
    </div>
  )
}
