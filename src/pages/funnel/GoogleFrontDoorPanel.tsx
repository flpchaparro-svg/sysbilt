import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

type PanelKind = 'thin' | 'alive'

function PhotoStrip({kind, play, reduce}: {kind: PanelKind; play: boolean; reduce: boolean | null}) {
  const slots =
    kind === 'alive'
      ? ['Storefront', 'Work', 'Team']
      : ['Phone snap', 'Empty', 'Empty']

  return (
    <div className="grid grid-cols-3 gap-1.5">
      {slots.map((label, i) => {
        const empty = kind === 'thin' && i > 0
        return (
          <motion.div
            key={`${kind}-${label}-${i}`}
            className="relative h-14 md:h-16 border overflow-hidden flex items-end px-1.5 pb-1"
            style={{
              borderColor:
                kind === 'alive'
                  ? `${FUNNEL_COLOURS.gold}88`
                  : empty
                    ? `${FUNNEL_COLOURS.ink}18`
                    : `${FUNNEL_COLOURS.accent}55`,
              backgroundColor:
                kind === 'alive'
                  ? `${FUNNEL_COLOURS.gold}24`
                  : empty
                    ? FUNNEL_COLOURS.ground
                    : `${FUNNEL_COLOURS.accent}12`,
            }}
            initial={reduce ? false : {opacity: 0, y: 8}}
            animate={play || reduce ? {opacity: 1, y: 0} : {opacity: 0, y: 8}}
            transition={{delay: reduce ? 0 : 0.15 + i * 0.1, duration: 0.35}}
          >
            {kind === 'alive' ? (
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background: `linear-gradient(145deg, ${FUNNEL_COLOURS.gold}55 0%, transparent 55%)`,
                }}
              />
            ) : null}
            <p
              className="relative font-mono text-[7px] uppercase tracking-wider"
              style={{
                color:
                  kind === 'alive'
                    ? FUNNEL_COLOURS.goldDeep
                    : empty
                      ? `${FUNNEL_COLOURS.ink}40`
                      : FUNNEL_COLOURS.accentDeep,
              }}
            >
              {empty ? '—' : label}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}

function Stars({kind, play, reduce}: {kind: PanelKind; play: boolean; reduce: boolean | null}) {
  const filled = kind === 'alive' ? 5 : 2
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({length: 5}).map((_, i) => (
          <motion.span
            key={i}
            className="font-serif text-sm leading-none"
            style={{
              color:
                i < filled
                  ? kind === 'alive'
                    ? FUNNEL_COLOURS.goldDeep
                    : FUNNEL_COLOURS.accent
                  : `${FUNNEL_COLOURS.ink}22`,
            }}
            initial={reduce ? false : {opacity: 0, scale: 0.7}}
            animate={play || reduce ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.7}}
            transition={{delay: reduce ? 0 : 0.45 + i * 0.05, duration: 0.25}}
          >
            ★
          </motion.span>
        ))}
      </div>
      <p
        className="font-mono text-[8px] uppercase tracking-widest"
        style={{color: kind === 'alive' ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.muted}}
      >
        {kind === 'alive' ? '48 reviews' : '3 reviews'}
      </p>
    </div>
  )
}

function FieldRows({kind, play, reduce}: {kind: PanelKind; play: boolean; reduce: boolean | null}) {
  const rows =
    kind === 'alive'
      ? [
          {label: 'Hours', value: 'Open · closes 5pm'},
          {label: 'Services', value: 'Filled'},
          {label: 'Category', value: 'Set'},
        ]
      : [
          {label: 'Hours', value: 'Unclear'},
          {label: 'Services', value: 'Empty'},
          {label: 'Category', value: 'Guessed'},
        ]

  return (
    <div className="space-y-1.5">
      {rows.map((row, i) => (
        <motion.div
          key={row.label}
          className="flex items-center justify-between border px-2.5 py-1.5"
          style={{
            borderColor:
              kind === 'alive' ? `${FUNNEL_COLOURS.gold}66` : `${FUNNEL_COLOURS.accent}40`,
            backgroundColor:
              kind === 'alive' ? `${FUNNEL_COLOURS.gold}14` : `${FUNNEL_COLOURS.accent}08`,
          }}
          initial={reduce ? false : {opacity: 0, x: -8}}
          animate={play || reduce ? {opacity: 1, x: 0} : {opacity: 0, x: -8}}
          transition={{delay: reduce ? 0 : 0.55 + i * 0.1, duration: 0.3}}
        >
          <span className="font-mono text-[8px] uppercase tracking-widest text-dark/45">
            {row.label}
          </span>
          <span
            className="font-sans text-[11px]"
            style={{
              color: kind === 'alive' ? FUNNEL_COLOURS.ink : FUNNEL_COLOURS.accentDeep,
            }}
          >
            {row.value}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function ProfilePanel({
  kind,
  name,
  badge,
  play,
  reduce,
}: {
  kind: PanelKind
  name: string
  badge: string
  play: boolean
  reduce: boolean | null
}) {
  return (
    <motion.div
      className="border overflow-hidden h-full flex flex-col"
      style={{
        borderColor:
          kind === 'alive' ? `${FUNNEL_COLOURS.gold}88` : `${FUNNEL_COLOURS.ink}18`,
        backgroundColor: FUNNEL_COLOURS.surface,
      }}
      initial={reduce ? false : {opacity: 0, y: 14}}
      animate={play || reduce ? {opacity: 1, y: 0} : {opacity: 0, y: 14}}
      transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
    >
      <div
        className="px-3.5 py-2.5 border-b flex items-center justify-between gap-2"
        style={{borderColor: `${FUNNEL_COLOURS.ink}12`}}
      >
        <div className="min-w-0">
          <p
            className="font-mono text-[8px] uppercase tracking-[0.18em]"
            style={{color: FUNNEL_COLOURS.steel}}
          >
            Google · Business Profile
          </p>
          <p className="font-serif text-base md:text-lg truncate mt-0.5" style={{color: FUNNEL_COLOURS.ink}}>
            {name}
          </p>
        </div>
        <span
          className="shrink-0 font-mono text-[7px] font-bold uppercase tracking-widest px-1.5 py-0.5"
          style={{
            backgroundColor:
              kind === 'alive' ? `${FUNNEL_COLOURS.gold}28` : `${FUNNEL_COLOURS.accent}18`,
            color: kind === 'alive' ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.accent,
          }}
        >
          {badge}
        </span>
      </div>

      <div className="p-3.5 md:p-4 space-y-3 flex-1 flex flex-col">
        <PhotoStrip kind={kind} play={play} reduce={reduce} />
        <Stars kind={kind} play={play} reduce={reduce} />
        <FieldRows kind={kind} play={play} reduce={reduce} />

        <motion.div
          className="mt-auto grid grid-cols-2 gap-1.5 pt-1"
          initial={reduce ? false : {opacity: 0}}
          animate={play || reduce ? {opacity: 1} : {opacity: 0}}
          transition={{delay: reduce ? 0 : 0.95, duration: 0.3}}
        >
          {['Call', 'Directions'].map((action) => (
            <div
              key={action}
              className="border text-center py-1.5 font-mono text-[8px] uppercase tracking-widest"
              style={{
                borderColor:
                  kind === 'alive' ? `${FUNNEL_COLOURS.gold}77` : `${FUNNEL_COLOURS.ink}16`,
                backgroundColor:
                  kind === 'alive' ? `${FUNNEL_COLOURS.gold}18` : FUNNEL_COLOURS.ground,
                color: kind === 'alive' ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.muted,
              }}
            >
              {action}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

/**
 * Front-door visual: the Google panel customers actually see.
 * Gold / cream motion language — thin listing vs finished competitor.
 */
export function GoogleFrontDoorPanel({
  businessName,
  competitorName,
}: {
  businessName?: string | null
  competitorName?: string | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: false, amount: 0.25})
  const reduce = useReducedMotion()
  const play = inView && !reduce
  const yours = businessName?.trim() || 'Your business'
  const theirs = competitorName?.trim() || 'Competitor next door'
  const showPair = Boolean(competitorName?.trim())

  return (
    <div ref={ref} className="mt-10 md:mt-12 w-full max-w-2xl">
      {showPair ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 items-stretch">
          <ProfilePanel
            kind="thin"
            name={yours}
            badge="Thin"
            play={play}
            reduce={reduce}
          />
          <ProfilePanel
            kind="alive"
            name={theirs}
            badge="Alive"
            play={play}
            reduce={reduce}
          />
        </div>
      ) : (
        <div className="max-w-md">
          <ProfilePanel kind="thin" name={yours} badge="Thin" play={play} reduce={reduce} />
          <motion.p
            className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
            initial={reduce ? false : {opacity: 0}}
            animate={play || reduce ? {opacity: 1} : {opacity: 0}}
            transition={{delay: reduce ? 0 : 1.1}}
          >
            This is the panel on the right of Google Search
          </motion.p>
        </div>
      )}
    </div>
  )
}
