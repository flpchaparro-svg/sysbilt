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
      initial={reduce ? false : {opacity: 0, y: 20, scale: 0.98}}
      whileInView={{opacity: 1, y: 0, scale: 1}}
      viewport={{once: true, amount: 0.3}}
      transition={{type: 'spring', stiffness: 280, damping: 22}}
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

export function EnquiryReplyPainCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      <Card index="01" title="The form fires, nobody watches">
        {({inView, reduce}) => (
          <div className="space-y-2">
            {['Form submitted', 'Emailed to shared inbox', 'No alert, no reply'].map((row, i) => (
              <motion.div
                key={row}
                className="h-7 rounded px-2 flex items-center font-mono text-[9px] uppercase tracking-wider"
                style={{
                  backgroundColor: `${FUNNEL_COLOURS.ink}1C`,
                  color: i === 2 ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.muted,
                }}
                initial={reduce ? false : {opacity: 0, x: -8}}
                animate={
                  reduce || !inView
                    ? {opacity: 1, x: 0}
                    : i === 2
                      ? {opacity: [0.45, 1, 0.45], x: [0, 5, 0]}
                      : {opacity: [0.7, 1, 0.7], x: 0}
                }
                transition={{duration: 1.5, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut'}}
              >
                {row}
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      <Card index="02" title="Two channels, two different stories">
        {({inView, reduce}) => (
          <div className="flex gap-2">
            {['Form reply', 'Email reply'].map((label, i) => (
              <motion.div
                key={label}
                className="flex-1 rounded-lg p-2.5 border"
                style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: '#fff'}}
                animate={
                  reduce || !inView
                    ? undefined
                    : {opacity: [0.55, 1, 0.55]}
                }
                transition={{duration: 1.6, repeat: Infinity, delay: i * 0.2}}
              >
                <p
                  className="font-mono text-[8px] uppercase tracking-wider mb-1"
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  {label}
                </p>
                <p className="font-sans text-[11px]" style={{color: FUNNEL_COLOURS.ink}}>
                  {i === 0 ? 'Whoever is free, whenever' : 'Different wording, no rule'}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      <Card index="03" title="Silence reads as closed">
        {({inView, reduce}) => (
          <motion.div
            className="rounded-lg p-3 border flex items-center justify-between"
            style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: '#fff'}}
            animate={reduce || !inView ? undefined : {opacity: [0.7, 1, 0.7]}}
            transition={{duration: 2, repeat: Infinity}}
          >
            <span className="font-sans text-sm" style={{color: FUNNEL_COLOURS.muted}}>
              Hours since enquiry
            </span>
            <motion.span
              className="font-serif text-2xl font-bold tabular-nums"
              style={{color: FUNNEL_COLOURS.accent}}
              animate={reduce || !inView ? undefined : {scale: [1, 1.1, 1]}}
              transition={{duration: 1.15, repeat: Infinity}}
            >
              6
            </motion.span>
          </motion.div>
        )}
      </Card>

      <Card index="04" title="Reply roulette">
        {({inView, reduce}) => (
          <div className="space-y-2">
            {['Reply A · different hours', 'Reply B · different price', 'Reply C · different tone'].map(
              (row, i) => (
                <motion.div
                  key={row}
                  className="h-7 rounded px-2 flex items-center font-mono text-[9px] uppercase tracking-wider"
                  style={{backgroundColor: `${FUNNEL_COLOURS.ink}1C`, color: FUNNEL_COLOURS.goldDeep}}
                  animate={reduce || !inView ? undefined : {opacity: [0.5, 1, 0.5]}}
                  transition={{duration: 1.5, repeat: Infinity, delay: i * 0.12}}
                >
                  {row}
                </motion.div>
              ),
            )}
          </div>
        )}
      </Card>
    </div>
  )
}
