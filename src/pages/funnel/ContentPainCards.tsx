import React from 'react'
import {FUNNEL_COLOURS} from './funnelTheme'

const CARDS = [
  {
    index: '01',
    title: 'They look before they call',
    text: 'A dead feed answers the comparison before you pick up the phone.',
  },
  {
    index: '02',
    title: 'Busy kills DIY by week three',
    text: 'Owner posts at 10pm until real work wins. Then silence.',
  },
  {
    index: '03',
    title: 'Cheap content sounds like nobody',
    text: 'Generic posts are worse than quiet. They do not sound like you.',
  },
] as const

export function ContentPainCards() {
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
