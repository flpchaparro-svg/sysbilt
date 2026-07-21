import React from 'react'
import {FUNNEL_COLOURS} from './funnelTheme'

type Props = {
  business: string | null
  yourCount: number | null
  competitor: string | null
  theirCount: number | null
}

/**
 * Evidence moment for Review Engine: your review count vs competitor, or a try-it-now prompt.
 * Static on purpose.
 */
export function ReviewEvidenceCard({business, yourCount, competitor, theirCount}: Props) {
  const live = yourCount != null

  return (
    <div
      className="mt-2 rounded-sm border overflow-hidden max-w-2xl"
      style={{
        borderColor: `${FUNNEL_COLOURS.ink}14`,
        backgroundColor: FUNNEL_COLOURS.surface,
      }}
    >
      <div
        className="px-4 py-2.5 flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
        style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
      >
        <span>Review count</span>
        <span style={{color: FUNNEL_COLOURS.goldLight}}>
          {live ? business || 'Your listing' : 'Try it now'}
        </span>
      </div>
      <div className="p-4 md:p-5">
        {live ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p
                  className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] mb-2"
                  style={{color: FUNNEL_COLOURS.accent}}
                >
                  {business || 'You'}
                </p>
                <p
                  className="font-serif text-4xl md:text-5xl font-bold tracking-tight"
                  style={{color: FUNNEL_COLOURS.ink}}
                >
                  {yourCount}
                </p>
                <p
                  className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em]"
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  Reviews
                </p>
              </div>
              <div>
                <p
                  className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] mb-2"
                  style={{color: FUNNEL_COLOURS.goldDeep}}
                >
                  {competitor || 'Them'}
                </p>
                <p
                  className="font-serif text-4xl md:text-5xl font-bold tracking-tight"
                  style={{color: FUNNEL_COLOURS.ink}}
                >
                  {theirCount != null ? theirCount : '?'}
                </p>
                <p
                  className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em]"
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  Reviews
                </p>
              </div>
            </div>
            <p
              className="mt-4 font-sans text-sm md:text-base leading-relaxed"
              style={{color: FUNNEL_COLOURS.muted}}
            >
              {competitor
                ? `${competitor} is not better at the work. They asked more often after jobs.`
                : 'The listing above you is not better at the work. They asked more often after jobs.'}
            </p>
          </>
        ) : (
          <p className="font-sans text-sm md:text-base leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
            Open your Google listing next to the business ranking above you. Count the reviews. That
            gap is already deciding who gets the call.
          </p>
        )}
      </div>
    </div>
  )
}
