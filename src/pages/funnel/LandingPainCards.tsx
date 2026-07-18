import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

function Card({
  index,
  title,
  children,
}: {
  index: string
  title: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl p-5 md:p-6 border"
      style={{
        borderColor: `${FUNNEL_COLOURS.ink}12`,
        backgroundColor: FUNNEL_COLOURS.surface,
      }}
      initial={reduce ? false : {opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.3}}
      transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
    >
      <p
        className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
        style={{color: FUNNEL_COLOURS.goldDeep}}
      >
        {index}
      </p>
      <h3 className="font-serif text-xl font-bold mb-4" style={{color: FUNNEL_COLOURS.ink}}>
        {title}
      </h3>
      <motion.div
        animate={reduce || !inView ? undefined : {opacity: [0.7, 1, 0.7]}}
        transition={{duration: 2.4, repeat: Infinity, ease: 'easeInOut'}}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export function LandingPainCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      <Card index="01" title="They click a promise">
        <div
          className="rounded-lg p-3 border"
          style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: '#fff'}}
        >
          <p className="font-sans text-sm font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
            Free consult this week
          </p>
          <div
            className="mt-3 h-7 rounded flex items-center justify-center text-[10px] font-mono font-bold uppercase tracking-wider text-white"
            style={{backgroundColor: FUNNEL_COLOURS.accent}}
          >
            Click
          </div>
        </div>
      </Card>
      <Card index="02" title="They land in a lobby">
        <div className="space-y-1.5">
          {['Nav', 'Hero carousel', 'Six services', 'Popup'].map((row) => (
            <div
              key={row}
              className="h-6 rounded px-2 flex items-center font-mono text-[9px] uppercase tracking-wider"
              style={{backgroundColor: `${FUNNEL_COLOURS.ink}08`, color: FUNNEL_COLOURS.muted}}
            >
              {row}
            </div>
          ))}
        </div>
      </Card>
      <Card index="03" title="The spend teaches nothing">
        <div
          className="rounded-lg p-3 font-mono text-[11px] leading-relaxed"
          style={{backgroundColor: `${FUNNEL_COLOURS.ink}06`, color: FUNNEL_COLOURS.ink}}
        >
          <div>Ad spend · $2,000</div>
          <div>Clicks · 380</div>
          <div style={{color: FUNNEL_COLOURS.accent}}>Enquiries · 3</div>
        </div>
      </Card>
    </div>
  )
}
