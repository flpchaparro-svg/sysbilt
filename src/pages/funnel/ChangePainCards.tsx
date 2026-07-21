import React from 'react'
import {motion, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const CARDS = [
  {
    index: '01',
    title: 'Half the team misses the session',
    text: 'One long session the week before. Jobs win. The recording sits unwatched.',
  },
  {
    index: '02',
    title: 'The help desk floods in week two',
    text: 'Confusion does not arrive as complaints. It arrives as tickets and workarounds.',
  },
  {
    index: '03',
    title: 'The old spreadsheet wins',
    text: 'Every workaround that sticks becomes the real system, whether you bought it or not.',
  },
] as const

export function ChangePainCards() {
  const reduce = useReducedMotion()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      {CARDS.map((card, i) => (
        <motion.div
          key={card.index}
          className="rounded-2xl p-5 md:p-6 border"
          style={{
            borderColor: `${FUNNEL_COLOURS.onInk}18`,
            backgroundColor: 'rgba(255,242,236,0.04)',
          }}
          initial={reduce ? false : {opacity: 0, y: 14}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.3}}
          transition={{duration: 0.4, delay: i * 0.06}}
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
        </motion.div>
      ))}
    </div>
  )
}
