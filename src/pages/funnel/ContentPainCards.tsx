import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

function Card({
  index,
  title,
  text,
  children,
}: {
  index: string
  title: string
  text: string
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
        borderColor: `${FUNNEL_COLOURS.onInk}18`,
        backgroundColor: 'rgba(255,242,236,0.04)',
      }}
      initial={reduce ? false : {opacity: 0, y: 20, scale: 0.98}}
      whileInView={{opacity: 1, y: 0, scale: 1}}
      viewport={{once: true, amount: 0.3}}
      transition={{type: 'spring', stiffness: 280, damping: 22}}
    >
      <p
        className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
        style={{color: FUNNEL_COLOURS.goldLight}}
      >
        {index}
      </p>
      <h3 className="font-serif text-xl font-bold mb-2" style={{color: FUNNEL_COLOURS.onInk}}>
        {title}
      </h3>
      <p className="font-sans text-sm leading-relaxed mb-4" style={{color: `${FUNNEL_COLOURS.onInk}85`}}>
        {text}
      </p>
      {children({inView, reduce})}
    </motion.div>
  )
}

/** Three content pain scenes with motion mocks. */
export function ContentPainCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      <Card
        index="01"
        title="They look before they call"
        text="A dead feed answers the comparison before you pick up the phone."
      >
        {({inView, reduce}) => (
          <div className="grid grid-cols-4 gap-1.5">
            {Array.from({length: 8}).map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-sm"
                style={{
                  backgroundColor:
                    i < 2 ? `${FUNNEL_COLOURS.onInk}22` : `${FUNNEL_COLOURS.onInk}08`,
                  border: i >= 2 ? `1px dashed ${FUNNEL_COLOURS.onInk}22` : undefined,
                }}
                animate={
                  reduce || !inView
                    ? undefined
                    : i >= 2
                      ? {opacity: [0.35, 0.75, 0.35]}
                      : {opacity: 0.85}
                }
                transition={{duration: 1.5, repeat: Infinity, delay: i * 0.07}}
              />
            ))}
          </div>
        )}
      </Card>

      <Card
        index="02"
        title="Busy kills DIY by week three"
        text="Owner posts at 10pm until real work wins. Then silence."
      >
        {({inView, reduce}) => (
          <div className="space-y-2">
            {[
              {label: 'Week 1 · posted', hot: false},
              {label: 'Week 2 · late night', hot: false},
              {label: 'Week 3 · skipped', hot: true},
            ].map((row, i) => (
              <motion.div
                key={row.label}
                className="h-7 rounded px-2 flex items-center font-mono text-[9px] uppercase tracking-wider"
                style={{
                  backgroundColor: `${FUNNEL_COLOURS.onInk}10`,
                  color: row.hot ? FUNNEL_COLOURS.goldLight : `${FUNNEL_COLOURS.onInk}70`,
                }}
                animate={
                  reduce || !inView
                    ? undefined
                    : row.hot
                      ? {opacity: [0.45, 1, 0.45], x: [0, 3, 0]}
                      : {opacity: 0.75}
                }
                transition={{duration: 1.4, repeat: Infinity, delay: i * 0.1}}
              >
                {row.label}
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      <Card
        index="03"
        title="Cheap content sounds like nobody"
        text="Generic posts are worse than quiet. They do not sound like you."
      >
        {({inView, reduce}) => (
          <motion.div
            className="rounded-lg border p-3"
            style={{borderColor: `${FUNNEL_COLOURS.onInk}18`, backgroundColor: `${FUNNEL_COLOURS.onInk}08`}}
            animate={reduce || !inView ? undefined : {y: [0, -2, 0]}}
            transition={{duration: 1.8, repeat: Infinity}}
          >
            <p className="font-mono text-[8px] uppercase tracking-wider" style={{color: `${FUNNEL_COLOURS.onInk}55`}}>
              Draft
            </p>
            <p className="mt-2 font-sans text-sm" style={{color: `${FUNNEL_COLOURS.onInk}70`}}>
              Exciting synergy for your journey…
            </p>
            <motion.p
              className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider"
              style={{color: FUNNEL_COLOURS.goldLight}}
              animate={reduce || !inView ? undefined : {opacity: [0.4, 1, 0.4]}}
              transition={{duration: 1.1, repeat: Infinity}}
            >
              Voice · not yours
            </motion.p>
          </motion.div>
        )}
      </Card>
    </div>
  )
}
