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
  theme?: 'dark' | 'cream'
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
  theme = 'dark',
}: StepperFieldProps) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)
  const isExample = !dirty && !focused
  const shown = formatGrouped(value)
  const cream = theme === 'cream'
  const ink = cream ? FUNNEL_COLOURS.ink : FUNNEL_COLOURS.onInk
  const gold = cream ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.goldLight
  // Money fields read gold; quantity fields stay muted until edited
  const isMoney = Boolean(prefix)
  const textColor = isMoney
    ? isExample
      ? `${gold}99`
      : gold
    : isExample
      ? `${ink}48`
      : ink

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
        style={{color: `${ink}58`}}
      >
        {label}
      </label>

      <div
        className="relative flex items-end gap-3 border-b pb-2.5 transition-[border-color] duration-200 cursor-text"
        style={{
          borderColor: focused ? gold : isExample ? `${ink}22` : `${ink}45`,
        }}
      >
        <div className="flex items-baseline gap-1.5 min-w-0 flex-1">
          {prefix ? (
            <span
              className="font-serif text-2xl md:text-3xl leading-none select-none"
              style={{
                color: isExample ? `${gold}70` : gold,
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
              caretColor: gold,
              width: `${Math.max(shown.length, 1) + 0.5}ch`,
            }}
          />

          {suffix ? (
            <span
              className="font-sans text-sm md:text-base whitespace-nowrap pb-1"
              style={{color: `${ink}55`}}
            >
              {suffix}
            </span>
          ) : null}
        </div>

        <motion.div
          className="flex flex-col shrink-0 border overflow-hidden"
          style={{borderColor: `${ink}22`}}
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
            className="h-6 w-7 flex items-center justify-center transition-colors hover:bg-black/5"
            style={{color: `${ink}90`}}
          >
            <ChevronUp className="w-3.5 h-3.5" strokeWidth={2.25} />
          </button>
          <div className="h-px" style={{backgroundColor: `${ink}18`}} />
          <button
            type="button"
            aria-label="Decrease"
            onClick={(e) => {
              e.stopPropagation()
              bump(-1)
            }}
            className="h-6 w-7 flex items-center justify-center transition-colors hover:bg-black/5"
            style={{color: `${ink}90`}}
          >
            <ChevronDown className="w-3.5 h-3.5" strokeWidth={2.25} />
          </button>
        </motion.div>
      </div>

      <p
        className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-opacity duration-200"
        style={{
          color: `${ink}40`,
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
  theme = 'dark',
}: {
  variant?:
    | 'speed'
    | 'missed-call'
    | 'google-profile'
    | 'search-fix'
    | 'landing-page'
    | 'crm-rescue'
    | 'team-ai'
    | 'change-pack'
    | 'content-system'
  theme?: 'dark' | 'cream'
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const isLanding = variant === 'landing-page'
  const isTeam = variant === 'team-ai'
  const isChange = variant === 'change-pack'
  const isContent = variant === 'content-system'
  const [value, setValue] = useState(
    isLanding ? 2000 : isTeam ? 8 : isChange ? 80 : isContent ? 8 : DEFAULT_VALUE,
  )
  const [lost, setLost] = useState(
    isChange
      ? 4
      : isContent
        ? 1500
        : isTeam
          ? 3
          : variant === 'search-fix'
            ? 4
            : variant === 'crm-rescue'
              ? 3
              : DEFAULT_LOST,
  )
  const [hourlyRate, setHourlyRate] = useState(75)
  const [valueDirty, setValueDirty] = useState(false)
  const [lostDirty, setLostDirty] = useState(false)
  const [rateDirty, setRateDirty] = useState(false)
  const [display, setDisplay] = useState(0)

  const teamHours = Math.max(0, value) * Math.max(0, lost) * 52
  const changeHours = Math.max(0, value) * Math.max(0, lost)
  const yearly = isLanding
    ? Math.max(0, value) * 12
    : isTeam
      ? teamHours * Math.max(0, hourlyRate)
      : isChange
        ? changeHours * Math.max(0, hourlyRate)
        : Math.max(0, value) * Math.max(0, lost) * 12
  const fromRef = useRef(0)
  const cream = theme === 'cream'
  const ink = cream ? FUNNEL_COLOURS.ink : FUNNEL_COLOURS.onInk
  const goldLine = cream ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.goldLight

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
          border: `1px solid ${ink}18`,
          backgroundColor: cream ? FUNNEL_COLOURS.surface : 'rgba(255,242,236,0.04)',
        }}
      >
        <p
          className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.28em] mb-3"
          style={{color: cream ? FUNNEL_COLOURS.goldDeep : `${FUNNEL_COLOURS.onInk}60`}}
        >
          Do your own maths
        </p>
        <h3
          className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-8 md:mb-10 max-w-lg"
          style={{color: ink}}
        >
          {isLanding
            ? "What's riding on where the click lands"
            : isTeam
              ? "What's on the table across the whole team"
              : isChange
                ? 'What does month one of confusion cost'
                : isContent
                  ? 'How many decisions get made while looking at your channels'
                  : variant === 'search-fix'
                    ? "What's being findable worth to you"
                    : variant === 'crm-rescue'
                      ? "What's one quiet enquiry worth to you"
                      : "What's one lost client worth to you"}
        </h3>

        <div
          className={
            isTeam || isChange
              ? 'flex flex-col lg:flex-row lg:items-stretch gap-2 lg:gap-0'
              : 'flex flex-col md:flex-row md:items-stretch gap-2 md:gap-0'
          }
        >
          <StepperField
            label={
              isLanding
                ? 'Monthly ad spend'
                : isTeam
                  ? 'People on the team'
                  : isChange
                    ? 'People affected by the change'
                    : isContent
                      ? 'Customers a month who check you out online'
                      : 'Average client worth'
            }
            prefix={isTeam || isChange || isContent ? undefined : '$'}
            value={value}
            step={isTeam || isChange || isContent ? 1 : 100}
            min={isTeam || isChange || isContent ? 1 : 0}
            dirty={valueDirty}
            onDirty={() => setValueDirty(true)}
            onChange={setValue}
            ariaLabel={
              isLanding
                ? 'Monthly ad spend in dollars'
                : isTeam
                  ? 'People on the team'
                  : isChange
                    ? 'People affected by the change'
                    : isContent
                      ? 'Customers a month who check you out online'
                      : 'Average client value in dollars'
            }
            pulseArrows={inView && !reduce}
            theme={theme}
          />

          {!isLanding ? (
            <>
              <div
                className={`hidden ${isTeam || isChange ? 'lg' : 'md'}:block w-px mx-6 xl:mx-8 shrink-0 self-stretch`}
                style={{backgroundColor: `${ink}14`}}
                aria-hidden
              />

              <StepperField
                label={
                  isTeam
                    ? 'Hours a week each could hand to AI'
                    : isChange
                      ? 'Hours each loses to confusion in month one'
                      : isContent
                        ? 'An average client is worth about'
                        : variant === 'missed-call'
                          ? 'Missed calls a month'
                          : variant === 'crm-rescue'
                            ? 'Enquiries a month that go quiet'
                            : variant === 'google-profile'
                              ? 'Lost to a thin profile'
                              : variant === 'search-fix'
                                ? 'Clients a month via Google'
                                : 'Lost to a slow site'
                }
                prefix={isContent ? '$' : undefined}
                suffix={isTeam ? '/ week' : isChange || isContent ? undefined : '/ month'}
                value={lost}
                step={isContent ? 100 : 1}
                dirty={lostDirty}
                onDirty={() => setLostDirty(true)}
                onChange={setLost}
                ariaLabel={
                  isTeam
                    ? 'Hours a week each person could hand to AI'
                    : isChange
                      ? 'Hours each person loses to confusion in month one'
                      : isContent
                        ? 'Average client value in dollars'
                        : variant === 'missed-call'
                          ? 'Missed calls per month'
                          : variant === 'crm-rescue'
                            ? 'Enquiries a month that go quiet'
                            : variant === 'google-profile'
                              ? 'Customers lost to a thin profile per month'
                              : variant === 'search-fix'
                                ? 'Clients a month who find you through Google'
                                : 'Enquiries lost per month'
                }
                pulseArrows={inView && !reduce}
                theme={theme}
              />
            </>
          ) : null}

          {isTeam || isChange ? (
            <>
              <div
                className="hidden lg:block w-px mx-6 xl:mx-8 shrink-0 self-stretch"
                style={{backgroundColor: `${ink}14`}}
                aria-hidden
              />
              <StepperField
                label="Average cost of one hour"
                prefix="$"
                suffix="/ hr"
                value={hourlyRate}
                step={5}
                min={10}
                dirty={rateDirty}
                onDirty={() => setRateDirty(true)}
                onChange={setHourlyRate}
                ariaLabel="Average cost of one staff hour in dollars"
                pulseArrows={inView && !reduce}
                theme={theme}
              />
            </>
          ) : null}
        </div>

        <div
          className="mt-6 md:mt-8 pt-6 md:pt-8"
          style={{borderTop: `1px solid ${ink}14`}}
        >
          <motion.p
            className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight tabular-nums leading-tight"
            style={{color: FUNNEL_COLOURS.accent}}
            key={yearly}
            initial={reduce ? false : {opacity: 0.65, y: 6}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.3}}
          >
            {isLanding
              ? `That's ${formatMoney(display)} a year riding on the first five seconds after the click.`
              : isTeam
                ? `That's ${formatMoney(display)} a year across the team.`
                : isChange
                  ? `That's ${formatMoney(display)} in month one.`
                  : isContent
                    ? `That's ${formatMoney(display)} a year of decisions made while looking at your feed.`
                    : `That's ${formatMoney(display)} a year, walking next door.`}
          </motion.p>
          {isTeam ? (
            <p
              className="mt-2 font-sans text-base md:text-lg leading-relaxed"
              style={{color: cream ? FUNNEL_COLOURS.muted : `${FUNNEL_COLOURS.onInk}70`}}
            >
              {formatGrouped(teamHours)} hours × {formatMoney(hourlyRate)} an hour.
            </p>
          ) : null}
          {isChange ? (
            <p
              className="mt-2 font-sans text-base md:text-lg leading-relaxed"
              style={{color: cream ? FUNNEL_COLOURS.muted : `${FUNNEL_COLOURS.onInk}70`}}
            >
              {formatGrouped(changeHours)} hours × {formatMoney(hourlyRate)} an hour.
            </p>
          ) : null}
          <p
            className="mt-2 font-serif text-3xl md:text-4xl lg:text-[2.75rem] tracking-tight leading-tight"
            style={{color: goldLine}}
          >
            {isLanding
              ? 'The page that catches it costs less than one month of that.'
              : isTeam
                ? 'The afternoon that unlocks them costs less than one week of one salary.'
                : isChange
                  ? 'The pack costs less than one week of that bill.'
                  : isContent
                    ? 'Keeping it alive costs one hour of your month. The system does the rest.'
                    : 'The fix costs less than one of them.'}
          </p>
          <p
            className="mt-3 font-sans text-sm leading-relaxed max-w-xl"
            style={{color: cream ? FUNNEL_COLOURS.muted : `${FUNNEL_COLOURS.onInk}65`}}
          >
            {isChange
              ? 'Your numbers, not ours. Change the three fields above. The dollar figure updates.'
              : isContent
                ? 'Your numbers, not ours. Change the two fields above. The dollar figure updates.'
                : "Your numbers, not ours. Change them and watch. The leak doesn't care either way."}
          </p>
        </div>
      </div>
    </div>
  )
}
