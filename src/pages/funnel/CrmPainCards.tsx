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
  children: (opts: {inView: boolean; reduce: boolean | null}) => React.ReactNode
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
      {children({inView, reduce})}
    </motion.div>
  )
}

export function CrmPainCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      <Card index="01" title="The enquiry lands, nobody's phone knows">
        {({inView, reduce}) => (
          <div className="space-y-2">
            {['Form submitted', 'Email to inbox', 'No alert'].map((row, i) => (
              <motion.div
                key={row}
                className="h-7 rounded px-2 flex items-center font-mono text-[9px] uppercase tracking-wider"
                style={{
                  backgroundColor: `${FUNNEL_COLOURS.ink}08`,
                  color: i === 2 ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.muted,
                }}
                animate={
                  reduce || !inView
                    ? undefined
                    : {opacity: [0.5, 1, 0.5], x: [0, i === 2 ? 4 : 0, 0]}
                }
                transition={{duration: 1.8, repeat: Infinity, delay: i * 0.15}}
              >
                {row}
              </motion.div>
            ))}
          </div>
        )}
      </Card>
      <Card index="02" title="The first responder books them">
        {({inView, reduce}) => (
          <div
            className="rounded-lg p-3 border"
            style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: '#fff'}}
          >
            <p className="font-sans text-sm" style={{color: FUNNEL_COLOURS.muted}}>
              Rival reply
            </p>
            <motion.span
              className="mt-3 inline-block font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-1 text-white"
              style={{backgroundColor: '#1F7A4D'}}
              animate={reduce || !inView ? undefined : {scale: [1, 1.06, 1]}}
              transition={{duration: 1.4, repeat: Infinity}}
            >
              Booked
            </motion.span>
          </div>
        )}
      </Card>
      <Card index="03" title="The quote you sent dies quietly">
        {({inView, reduce}) => (
          <motion.div
            className="rounded-lg p-3 font-mono text-[11px] leading-relaxed"
            style={{backgroundColor: `${FUNNEL_COLOURS.ink}06`, color: FUNNEL_COLOURS.ink}}
            animate={reduce || !inView ? undefined : {opacity: [0.65, 1, 0.65]}}
            transition={{duration: 2.2, repeat: Infinity}}
          >
            <div>Quote sent · Monday</div>
            <div>Follow-up · none</div>
            <motion.div
              className="mt-1 font-bold"
              style={{color: FUNNEL_COLOURS.accent}}
              animate={reduce || !inView ? undefined : {scale: [1, 1.08, 1]}}
              transition={{duration: 1.3, repeat: Infinity}}
            >
              Status · gone cold
            </motion.div>
          </motion.div>
        )}
      </Card>
    </div>
  )
}
