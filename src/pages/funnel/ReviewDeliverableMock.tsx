import React from 'react'
import {FUNNEL_COLOURS} from './funnelTheme'

/** Price-band mock: SMS/email review ask plus QR label. */
export function ReviewDeliverableMock() {
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
        <span>Review ask</span>
        <span style={{color: FUNNEL_COLOURS.goldLight}}>Live</span>
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
            SMS · after job
          </p>
          <p className="font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.onInk}}>
            Thanks again. If you&apos;re happy with the work, leave a quick review here.
          </p>
        </div>
        <div
          className="rounded-sm border px-3 py-2.5"
          style={{borderColor: `${FUNNEL_COLOURS.onInk}18`}}
        >
          <p
            className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] mb-1"
            style={{color: `${FUNNEL_COLOURS.onInk}55`}}
          >
            Email · same ask
          </p>
          <p className="font-sans text-sm" style={{color: FUNNEL_COLOURS.onInk}}>
            Your wording · short link included
          </p>
        </div>
        <div className="flex items-center gap-3 pt-1">
          <div
            className="h-14 w-14 shrink-0 rounded-sm border grid grid-cols-3 grid-rows-3 gap-0.5 p-1.5"
            style={{borderColor: `${FUNNEL_COLOURS.onInk}22`}}
            aria-hidden
          >
            {Array.from({length: 9}).map((_, i) => (
              <div
                key={i}
                className="rounded-[1px]"
                style={{
                  backgroundColor:
                    i === 4 ? 'transparent' : `${FUNNEL_COLOURS.onInk}${i % 2 === 0 ? '90' : '40'}`,
                }}
              />
            ))}
          </div>
          <div className="min-w-0">
            <p
              className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
              style={{color: FUNNEL_COLOURS.goldLight}}
            >
              QR · van and invoice
            </p>
            <p className="font-sans text-xs mt-1" style={{color: `${FUNNEL_COLOURS.onInk}85`}}>
              One tap to your Google review page
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
