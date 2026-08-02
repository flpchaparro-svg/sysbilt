import React from 'react'
import {FUNNEL_COLOURS} from './funnelTheme'

/** Price-band mock: messaging on, hours honest, reply ready. */
export function ProfileMessagingDeliverableMock() {
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
        <span>Profile messaging</span>
        <span style={{color: FUNNEL_COLOURS.goldLight}}>Live</span>
      </div>
      <div className="p-4 space-y-2.5">
        {[
          {label: 'Hours', value: 'Honest windows'},
          {label: 'First reply', value: 'Canned · your voice'},
          {label: 'Handoff', value: 'Phone / inbox alert'},
        ].map((row) => (
          <div
            key={row.label}
            className="rounded-sm border px-3 py-2 flex items-center justify-between gap-2"
            style={{borderColor: `${FUNNEL_COLOURS.onInk}18`}}
          >
            <span
              className="font-mono text-[9px] font-bold uppercase tracking-[0.14em]"
              style={{color: `${FUNNEL_COLOURS.onInk}55`}}
            >
              {row.label}
            </span>
            <span className="font-sans text-sm text-right" style={{color: FUNNEL_COLOURS.onInk}}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
