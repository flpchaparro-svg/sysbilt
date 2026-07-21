import React from 'react'
import {FUNNEL_COLOURS} from './funnelTheme'

type Props = {
  business: string | null
  lastPostMonth: string | null
}

/**
 * Evidence moment for Content System: last post date, or a try-it-now prompt.
 * Static on purpose.
 */
export function ContentLastPostCard({business, lastPostMonth}: Props) {
  const live = Boolean(business && lastPostMonth)

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
        <span>Last post</span>
        <span style={{color: FUNNEL_COLOURS.goldLight}}>
          {live ? business : 'Try it now'}
        </span>
      </div>
      <div className="p-4 md:p-5">
        {live ? (
          <>
            <p
              className="font-serif text-4xl md:text-5xl font-bold tracking-tight"
              style={{color: FUNNEL_COLOURS.ink}}
            >
              {lastPostMonth}
            </p>
            <p className="mt-3 font-sans text-sm md:text-base leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
              {business}&apos;s work clearly hasn&apos;t stopped since {lastPostMonth}. Your channels
              have.
            </p>
          </>
        ) : (
          <p className="font-sans text-sm md:text-base leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
            Open your own Instagram the way a stranger would. Check the date on the last post. Now
            check your busiest competitor&apos;s.
          </p>
        )}
      </div>
    </div>
  )
}
