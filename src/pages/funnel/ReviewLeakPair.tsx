import React from 'react'
import {FUNNEL_COLOURS} from './funnelTheme'

/** Quiet ask never sent vs automatic ask after job complete. Static. */
export function ReviewLeakPair() {
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
          After the job
        </p>
        <div
          className="rounded-sm border border-dashed px-3 py-4 mb-4"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}22`,
            backgroundColor: `${FUNNEL_COLOURS.ink}06`,
          }}
        >
          <p
            className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] mb-2"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            Draft · unsent
          </p>
          <p className="font-sans text-sm leading-relaxed" style={{color: `${FUNNEL_COLOURS.ink}55`}}>
            Meant to ask for a review
          </p>
        </div>
        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{color: FUNNEL_COLOURS.accent}}
        >
          Never left your head
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
          Job complete
        </p>
        <div
          className="rounded-sm border px-3 py-4 mb-4"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}12`,
            backgroundColor: FUNNEL_COLOURS.ground,
          }}
        >
          <p
            className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] mb-2"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            SMS · sent
          </p>
          <p className="font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.ink}}>
            Thanks again. If you&apos;re happy with the work, here&apos;s a quick link to leave a
            review.
          </p>
        </div>
        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{color: '#1B6B3A'}}
        >
          Automatic ask
        </p>
      </div>
    </div>
  )
}
