import React from 'react'
import {FUNNEL_COLOURS} from './funnelTheme'

/** Week-three help desk flood + old spreadsheet quietly wins. Static. No fade gimmicks. */
export function ChangeLeakPair() {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-3xl">
      <div
        className="rounded-sm border p-5"
        style={{
          borderColor: `${FUNNEL_COLOURS.accent}40`,
          backgroundColor: FUNNEL_COLOURS.surface,
        }}
      >
        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
          style={{color: FUNNEL_COLOURS.accent}}
        >
          Week three
        </p>
        <p className="font-serif text-xl font-bold mb-2" style={{color: FUNNEL_COLOURS.ink}}>
          Help desk
        </p>
        <p
          className="font-mono text-sm font-bold uppercase tracking-[0.14em]"
          style={{color: FUNNEL_COLOURS.accent}}
        >
          41 open tickets
        </p>
        <p className="mt-3 font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
          Questions that should have been answered before go-live.
        </p>
      </div>

      <div
        className="rounded-sm border p-5"
        style={{
          borderColor: `${FUNNEL_COLOURS.ink}14`,
          backgroundColor: FUNNEL_COLOURS.surface,
        }}
      >
        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          Quietly reopened
        </p>
        <div
          className="rounded-lg border px-3 py-3 font-mono text-[11px] tracking-wide"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}12`,
            backgroundColor: `${FUNNEL_COLOURS.ink}06`,
            color: FUNNEL_COLOURS.ink,
          }}
        >
          old_spreadsheet_v7_FINAL.xlsx
        </div>
        <p className="mt-3 font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
          The project didn&apos;t fail at the technology. It failed in the gap between announcement
          and habit.
        </p>
      </div>
    </div>
  )
}
