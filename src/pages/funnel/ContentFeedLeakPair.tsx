import React from 'react'
import {FUNNEL_COLOURS} from './funnelTheme'

/** Your quiet feed vs a full scheduled month. Static. */
export function ContentFeedLeakPair({lastPostMonth}: {lastPostMonth: string | null}) {
  const quietLabel = lastPostMonth ? `Went quiet in ${lastPostMonth}` : 'Went quiet'

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
          Your feed
        </p>
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {Array.from({length: 8}).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm"
              style={{
                backgroundColor:
                  i < 3 ? `${FUNNEL_COLOURS.ink}18` : `${FUNNEL_COLOURS.ink}06`,
                border: i >= 3 ? `1px dashed ${FUNNEL_COLOURS.ink}22` : undefined,
              }}
            />
          ))}
        </div>
        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{color: FUNNEL_COLOURS.accent}}
        >
          {quietLabel}
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
          The system
        </p>
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {Array.from({length: 8}).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm relative overflow-hidden"
              style={{backgroundColor: `${FUNNEL_COLOURS.ink}12`}}
            >
              <span
                className="absolute bottom-0.5 left-0.5 right-0.5 font-mono text-[6px] font-bold uppercase tracking-wider text-center"
                style={{color: '#1B6B3A'}}
              >
                Set
              </span>
            </div>
          ))}
        </div>
        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{color: '#1B6B3A'}}
        >
          Scheduled
        </p>
      </div>
    </div>
  )
}
