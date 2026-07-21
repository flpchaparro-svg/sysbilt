import React from 'react'
import {FUNNEL_COLOURS} from './funnelTheme'

const CARDS = [
  {
    index: '01',
    title: 'Stars before the site',
    text: 'Review count shows before your website loads. Fewer reads as risk.',
  },
  {
    index: '02',
    title: 'The ask dies at 6pm',
    text: 'You meant to ask. The next job started. The message stayed a thought.',
  },
  {
    index: '03',
    title: 'Quiet customers stay quiet',
    text: 'Happy people rarely leave a review unless someone asks at the right moment.',
  },
] as const

export function ReviewPainCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      {CARDS.map((card) => (
        <div
          key={card.index}
          className="rounded-2xl p-5 md:p-6 border"
          style={{
            borderColor: `${FUNNEL_COLOURS.onInk}18`,
            backgroundColor: 'rgba(255,242,236,0.04)',
          }}
        >
          <p
            className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
            style={{color: FUNNEL_COLOURS.goldLight}}
          >
            {card.index}
          </p>
          <h3 className="font-serif text-xl font-bold mb-3" style={{color: FUNNEL_COLOURS.onInk}}>
            {card.title}
          </h3>
          <p className="font-sans text-sm leading-relaxed" style={{color: `${FUNNEL_COLOURS.onInk}85`}}>
            {card.text}
          </p>
        </div>
      ))}
    </div>
  )
}
