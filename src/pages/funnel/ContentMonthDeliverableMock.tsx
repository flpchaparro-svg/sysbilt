import React from 'react'
import {FUNNEL_COLOURS} from './funnelTheme'

/** Price-band mock: one hour in, a month of posts out. */
export function ContentMonthDeliverableMock() {
  return (
    <div
      className="rounded-sm border overflow-hidden w-full max-w-sm"
      style={{
        borderColor: `${FUNNEL_COLOURS.onInk}22`,
        backgroundColor: 'rgba(255,242,236,0.06)',
      }}
    >
      <div
        className="px-4 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em] flex justify-between"
        style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
      >
        <span>This month</span>
        <span style={{color: FUNNEL_COLOURS.goldLight}}>Approved</span>
      </div>
      <div className="p-4 space-y-3">
        <div
          className="rounded-sm border px-3 py-2.5"
          style={{borderColor: `${FUNNEL_COLOURS.onInk}18`}}
        >
          <p
            className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] mb-1"
            style={{color: `${FUNNEL_COLOURS.onInk}55`}}
          >
            Your hour
          </p>
          <p className="font-sans text-sm" style={{color: FUNNEL_COLOURS.onInk}}>
            Recorded · voice locked
          </p>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {['Post', 'Carousel', 'Caption'].map((label) => (
            <div
              key={label}
              className="rounded-sm border px-2 py-3 text-center"
              style={{borderColor: `${FUNNEL_COLOURS.onInk}14`}}
            >
              <p
                className="font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
                style={{color: FUNNEL_COLOURS.goldLight}}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
        <p
          className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-center"
          style={{color: '#6BCB8A'}}
        >
          Scheduled across channels
        </p>
      </div>
    </div>
  )
}
