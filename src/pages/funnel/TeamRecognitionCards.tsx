import React from 'react'
import {motion, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const CARDS = [
  {
    index: '01',
    title: 'The experimenter',
    text: 'Has prompts that save hours every week. Shares none of them.',
  },
  {
    index: '02',
    title: 'The risk',
    text: 'Client details going into personal accounts nobody vetted.',
  },
  {
    index: '03',
    title: 'The waiting room',
    text: "Everyone else, unsure it's even allowed, watching from the side.",
  },
] as const

export function TeamRecognitionCards() {
  const reduce = useReducedMotion()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mt-2">
      {CARDS.map((card, i) => (
        <motion.div
          key={card.index}
          className="rounded-sm border p-5 md:p-6"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}14`,
            backgroundColor: FUNNEL_COLOURS.surface,
          }}
          initial={reduce ? false : {opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.35}}
          transition={{duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1]}}
        >
          <p
            className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            {card.index}
          </p>
          <h3 className="font-serif text-xl font-bold mb-2" style={{color: FUNNEL_COLOURS.ink}}>
            {card.title}
          </h3>
          <p className="font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
            {card.text}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

export function TeamPainCards() {
  const reduce = useReducedMotion()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      <motion.div
        className="rounded-2xl p-5 md:p-6 border"
        style={{
          borderColor: `${FUNNEL_COLOURS.onInk}18`,
          backgroundColor: 'rgba(255,242,236,0.04)',
        }}
        initial={reduce ? false : {opacity: 0, y: 14}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.3}}
        transition={{duration: 0.4}}
      >
        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
          style={{color: FUNNEL_COLOURS.goldLight}}
        >
          01
        </p>
        <h3 className="font-serif text-xl font-bold mb-4" style={{color: FUNNEL_COLOURS.onInk}}>
          One person&apos;s tricks
        </h3>
        <div className="space-y-2">
          <div
            className="rounded-lg px-3 py-2 flex items-center justify-between"
            style={{backgroundColor: 'rgba(255,242,236,0.08)'}}
          >
            <span className="font-mono text-[9px] uppercase tracking-wider" style={{color: `${FUNNEL_COLOURS.onInk}70`}}>
              Hours saved / week
            </span>
            <span className="font-serif text-lg font-bold" style={{color: FUNNEL_COLOURS.onInk}}>
              1 seat
            </span>
          </div>
          <div
            className="rounded-lg px-3 py-2 flex items-center justify-between border"
            style={{
              borderColor: `${FUNNEL_COLOURS.accent}55`,
              backgroundColor: `${FUNNEL_COLOURS.accent}18`,
            }}
          >
            <span className="font-mono text-[9px] uppercase tracking-wider" style={{color: `${FUNNEL_COLOURS.onInk}80`}}>
              Same tricks × whole team
            </span>
            <span className="font-serif text-lg font-bold" style={{color: FUNNEL_COLOURS.accent}}>
              Still 1
            </span>
          </div>
        </div>
        <p className="mt-3 font-sans text-sm leading-relaxed" style={{color: `${FUNNEL_COLOURS.onInk}85`}}>
          The shortcuts never leave one person&apos;s head.
        </p>
      </motion.div>

      <motion.div
        className="rounded-2xl p-5 md:p-6 border"
        style={{
          borderColor: `${FUNNEL_COLOURS.onInk}18`,
          backgroundColor: 'rgba(255,242,236,0.04)',
        }}
        initial={reduce ? false : {opacity: 0, y: 14}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.3}}
        transition={{duration: 0.4, delay: 0.06}}
      >
        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
          style={{color: FUNNEL_COLOURS.goldLight}}
        >
          02
        </p>
        <h3 className="font-serif text-xl font-bold mb-4" style={{color: FUNNEL_COLOURS.onInk}}>
          Unapproved tools, client data
        </h3>
        <div className="space-y-1.5">
          {[
            {label: 'Personal ChatGPT account', bad: true},
            {label: 'Client paste · no policy', bad: true},
            {label: 'Company workspace', bad: false},
          ].map((row) => (
            <div
              key={row.label}
              className="rounded px-2.5 py-1.5 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider"
              style={{
                backgroundColor: 'rgba(255,242,236,0.07)',
                color: row.bad ? FUNNEL_COLOURS.accent : `${FUNNEL_COLOURS.onInk}45`,
              }}
            >
              <span>{row.label}</span>
              <span>{row.bad ? 'Risk' : 'Empty'}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 font-sans text-sm leading-relaxed" style={{color: `${FUNNEL_COLOURS.onInk}85`}}>
          The tools in private are the ones nobody checked.
        </p>
      </motion.div>

      <motion.div
        className="rounded-2xl p-5 md:p-6 border"
        style={{
          borderColor: `${FUNNEL_COLOURS.onInk}18`,
          backgroundColor: 'rgba(255,242,236,0.04)',
        }}
        initial={reduce ? false : {opacity: 0, y: 14}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.3}}
        transition={{duration: 0.4, delay: 0.12}}
      >
        <p
          className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
          style={{color: FUNNEL_COLOURS.goldLight}}
        >
          03
        </p>
        <h3 className="font-serif text-xl font-bold mb-4" style={{color: FUNNEL_COLOURS.onInk}}>
          Everyone else waits
        </h3>
        <div className="space-y-1.5">
          {[
            {who: 'Sales', state: 'Waiting for permission'},
            {who: 'Ops', state: 'Watching from the side'},
            {who: 'Admin', state: 'Not sure it is allowed'},
          ].map((row) => (
            <div
              key={row.who}
              className="rounded px-2.5 py-1.5 flex items-center justify-between"
              style={{backgroundColor: 'rgba(255,242,236,0.07)'}}
            >
              <span className="font-sans text-sm" style={{color: FUNNEL_COLOURS.onInk}}>
                {row.who}
              </span>
              <span
                className="font-mono text-[8px] uppercase tracking-wider"
                style={{color: `${FUNNEL_COLOURS.onInk}55`}}
              >
                {row.state}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 font-sans text-sm leading-relaxed" style={{color: `${FUNNEL_COLOURS.onInk}85`}}>
          Until someone makes the setup official.
        </p>
      </motion.div>
    </div>
  )
}
