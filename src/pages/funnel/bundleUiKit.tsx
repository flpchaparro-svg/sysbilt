import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

function initialsOf(name?: string | null) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return null
  return parts
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}

export function BundleEvidencePath({
  business,
  badge,
  doors,
}: {
  business?: string | null
  badge: string
  doors: Array<{label: string; detail: string}>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const go = !reduce && inView
  const initials = initialsOf(business)

  return (
    <motion.div
      ref={ref}
      className="mt-2 rounded-xl overflow-hidden border max-w-2xl"
      style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.surface}}
      initial={reduce ? false : {opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.5, ease: EASE}}
    >
      <div
        className="px-3 py-2.5 flex items-center gap-2"
        style={{backgroundColor: `${FUNNEL_COLOURS.ink}16`}}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.accent}70`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.gold}80`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.ink}25`}} />
        {initials ? (
          <span
            className="ml-1 h-5 min-w-[20px] px-1 rounded-sm flex items-center justify-center font-mono text-[7px] font-bold"
            style={{backgroundColor: `${FUNNEL_COLOURS.ink}2C`, color: FUNNEL_COLOURS.steel}}
          >
            {initials}
          </span>
        ) : null}
        <span
          className="ml-auto font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          {badge}
        </span>
      </div>
      <div className="p-4 md:p-5 flex items-stretch gap-2">
        {doors.map((door, i) => (
          <React.Fragment key={door.label}>
            <motion.div
              className="flex-1 rounded-lg border px-2.5 py-3 text-center"
              style={{borderColor: `${FUNNEL_COLOURS.goldDeep}45`, backgroundColor: '#fff'}}
              initial={reduce ? false : {opacity: 0, y: 8}}
              animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.45}}
              transition={{delay: reduce ? 0 : 0.1 + i * 0.14, duration: 0.4, ease: EASE}}
            >
              <p
                className="font-mono text-[8px] font-bold uppercase tracking-wide mb-1.5"
                style={{color: FUNNEL_COLOURS.goldDeep}}
              >
                {door.label}
              </p>
              <p className="font-sans text-[11px] font-semibold leading-snug" style={{color: FUNNEL_COLOURS.ink}}>
                {door.detail}
              </p>
            </motion.div>
            {i < doors.length - 1 ? (
              <motion.span
                className="self-center font-mono text-[10px] font-bold"
                style={{color: FUNNEL_COLOURS.goldDeep}}
                initial={reduce ? false : {opacity: 0}}
                animate={go || reduce ? {opacity: 1} : {opacity: 0.3}}
                transition={{delay: reduce ? 0 : 0.2 + i * 0.14}}
              >
                →
              </motion.span>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  )
}

export function BundleLeakPair({
  leftTitle,
  leftFoot,
  locked,
  rightTitle,
  rightFoot,
  open,
}: {
  leftTitle: string
  leftFoot: string
  locked: string[]
  rightTitle: string
  rightFoot: string
  open: string[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.3})
  const reduce = useReducedMotion()
  const go = !reduce && inView

  return (
    <motion.div
      ref={ref}
      className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
      initial={reduce ? false : {opacity: 0, y: 22}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.55, ease: EASE}}
    >
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.accent}55`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
          style={{color: FUNNEL_COLOURS.accent}}
        >
          {leftTitle}
        </div>
        <div className="p-4 md:p-5 flex flex-col justify-center gap-2 min-h-[168px]">
          {locked.map((row) => (
            <div
              key={row}
              className="rounded-lg border border-dashed px-3 py-2.5 flex items-center justify-between gap-2"
              style={{borderColor: `${FUNNEL_COLOURS.accent}55`, backgroundColor: `${FUNNEL_COLOURS.accent}08`}}
            >
              <p className="font-sans text-[11px] font-semibold truncate" style={{color: FUNNEL_COLOURS.ink}}>
                {row}
              </p>
              <span
                className="font-mono text-[8px] font-bold uppercase tracking-wide shrink-0"
                style={{color: FUNNEL_COLOURS.accent}}
              >
                Locked
              </span>
            </div>
          ))}
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.accent, backgroundColor: `${FUNNEL_COLOURS.accent}10`}}
        >
          {leftFoot}
        </div>
      </div>
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.goldDeep}55`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div className="px-3 py-2 flex items-center justify-between">
          <span
            className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            {rightTitle}
          </span>
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{backgroundColor: '#1F7A4D'}}
            animate={go ? {opacity: [0.45, 1, 0.45]} : {opacity: 0.7}}
            transition={{duration: 1.6, repeat: Infinity, ease: 'easeInOut'}}
          />
        </div>
        <div className="p-4 md:p-5 flex flex-col justify-center gap-2 min-h-[168px]">
          {open.map((row, i) => (
            <motion.div
              key={row}
              className="rounded-lg border px-3 py-2.5 flex items-center justify-between gap-2"
              style={{borderColor: `${FUNNEL_COLOURS.goldDeep}45`, backgroundColor: '#fff'}}
              initial={reduce ? false : {opacity: 0, y: 8}}
              animate={go || reduce ? {opacity: 1, y: 0} : {opacity: 0.5}}
              transition={{delay: reduce ? 0 : 0.1 + i * 0.12, duration: 0.4, ease: EASE}}
            >
              <p className="font-sans text-[11px] font-semibold truncate" style={{color: FUNNEL_COLOURS.ink}}>
                {row}
              </p>
              <span
                className="font-mono text-[8px] font-bold uppercase tracking-wide shrink-0"
                style={{color: FUNNEL_COLOURS.goldDeep}}
              >
                Open
              </span>
            </motion.div>
          ))}
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.goldDeep, backgroundColor: `${FUNNEL_COLOURS.goldDeep}12`}}
        >
          {rightFoot}
        </div>
      </div>
    </motion.div>
  )
}

function PainCard({
  index,
  title,
  children,
}: {
  index: string
  title: string
  children: (opts: {play: boolean; reduce: boolean | null}) => React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const play = Boolean(inView && !reduce)

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl p-5 md:p-6 border"
      style={{
        borderColor: `${FUNNEL_COLOURS.ink}12`,
        backgroundColor: FUNNEL_COLOURS.surface,
      }}
      initial={reduce ? false : {opacity: 0, y: 20, scale: 0.98}}
      whileInView={{opacity: 1, y: 0, scale: 1}}
      viewport={{once: true, amount: 0.3}}
      transition={{type: 'spring', stiffness: 280, damping: 22}}
    >
      <p
        className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
        style={{color: FUNNEL_COLOURS.goldDeep}}
      >
        {index}
      </p>
      <h3 className="font-serif text-xl font-bold mb-4" style={{color: FUNNEL_COLOURS.ink}}>
        {title}
      </h3>
      {children({play, reduce})}
    </motion.div>
  )
}

export function BundlePainCards({
  cards,
}: {
  cards: Array<{title: string; rows: string[]; stamp: string}>
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {cards.map((card, i) => (
        <PainCard key={card.title} index={String(i + 1).padStart(2, '0')} title={card.title}>
          {({play, reduce}) => (
            <div className="space-y-2 py-1">
              {card.rows.map((row, ri) => (
                <motion.div
                  key={row}
                  className="flex items-center justify-between rounded-lg border px-3 py-2"
                  style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: '#fff'}}
                  initial={reduce ? false : {opacity: 0, x: -6}}
                  animate={play || reduce ? {opacity: 1, x: 0} : {opacity: 0.4}}
                  transition={{delay: reduce ? 0 : ri * 0.1, duration: 0.35, ease: EASE}}
                >
                  <span className="font-sans text-[12px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
                    {row}
                  </span>
                  <span
                    className="font-mono text-[8px] font-bold uppercase tracking-wide"
                    style={{color: FUNNEL_COLOURS.accent}}
                  >
                    {card.stamp}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </PainCard>
      ))}
    </div>
  )
}

export function BundleDeliverableMock({
  title,
  steps,
}: {
  title: string
  steps: Array<{label: string; detail: string}>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.4})
  const reduce = useReducedMotion()
  const go = !reduce && inView

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-sm"
      initial={reduce ? false : {opacity: 0, y: 16, scale: 0.98}}
      whileInView={{opacity: 1, y: 0, scale: 1}}
      viewport={{once: true, amount: 0.4}}
      transition={{type: 'spring', stiffness: 300, damping: 22}}
    >
      <div
        className="rounded-2xl overflow-hidden border shadow-[0_16px_40px_-24px_rgba(14,28,47,0.35)]"
        style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: '#fff'}}
      >
        <div
          className="px-4 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
        >
          {title}
        </div>
        <div className="p-5 space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              className="flex items-center gap-3"
              initial={reduce ? false : {opacity: 0, x: -10}}
              animate={go ? {opacity: 1, x: 0} : {opacity: 0.5, x: 0}}
              transition={{delay: reduce ? 0 : 0.1 + i * 0.12, type: 'spring', stiffness: 360}}
            >
              <motion.span
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{backgroundColor: '#1F7A4D'}}
                animate={
                  go
                    ? {
                        scale: [1, 1.35, 1],
                        boxShadow: [
                          '0 0 0 0 rgba(31,122,77,0)',
                          '0 0 0 4px rgba(31,122,77,0.25)',
                          '0 0 0 0 rgba(31,122,77,0)',
                        ],
                      }
                    : undefined
                }
                transition={{duration: 1.4, repeat: Infinity, delay: i * 0.28}}
              />
              <div className="min-w-0">
                <p className="font-sans text-sm font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
                  {step.label}
                </p>
                <p
                  className="font-mono text-[9px] uppercase tracking-wider"
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
