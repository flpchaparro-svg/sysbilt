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

export function ProfileMessagingPainCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      <Card
        index="01"
        title="The thread sits while you work"
        text="Maps traffic looks fine. The message waits unread until the job is gone."
      >
        {({inView, reduce}) => (
          <div className="space-y-2">
            {['Message received', 'No alert', 'Still unread'].map((row, i) => (
              <motion.div
                key={row}
                className="h-7 rounded px-2 flex items-center font-mono text-[9px] uppercase tracking-wider"
                style={{
                  backgroundColor: `${FUNNEL_COLOURS.onInk}10`,
                  color: i === 2 ? FUNNEL_COLOURS.goldLight : `${FUNNEL_COLOURS.onInk}70`,
                }}
                animate={
                  reduce || !inView
                    ? undefined
                    : i === 2
                      ? {opacity: [0.45, 1, 0.45], x: [0, 3, 0]}
                      : {opacity: 0.75}
                }
                transition={{duration: 1.4, repeat: Infinity, delay: i * 0.1}}
              >
                {row}
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      <Card
        index="02"
        title="Staff invent replies on the fly"
        text="Tone and facts drift. Every person writes a different first answer."
      >
        {({inView, reduce}) => (
          <div className="space-y-2">
            {['Reply A · different hours', 'Reply B · different price', 'Reply C · different tone'].map(
              (row, i) => (
                <motion.div
                  key={row}
                  className="h-7 rounded px-2 flex items-center font-mono text-[9px] uppercase tracking-wider"
                  style={{
                    backgroundColor: `${FUNNEL_COLOURS.onInk}10`,
                    color: FUNNEL_COLOURS.goldLight,
                  }}
                  animate={
                    reduce || !inView
                      ? undefined
                      : {opacity: [0.5, 1, 0.5]}
                  }
                  transition={{duration: 1.5, repeat: Infinity, delay: i * 0.12}}
                >
                  {row}
                </motion.div>
              ),
            )}
          </div>
        )}
      </Card>

      <Card
        index="03"
        title="You never see what vanished"
        text="Some threads become bookings. Some disappear. Nobody owns the count."
      >
        {({inView, reduce}) => (
          <motion.div
            className="rounded-lg border p-3"
            style={{borderColor: `${FUNNEL_COLOURS.onInk}18`, backgroundColor: `${FUNNEL_COLOURS.onInk}08`}}
            animate={reduce || !inView ? undefined : {y: [0, -2, 0]}}
            transition={{duration: 1.8, repeat: Infinity}}
          >
            <p className="font-mono text-[8px] uppercase tracking-wider" style={{color: `${FUNNEL_COLOURS.onInk}55`}}>
              This week
            </p>
            <motion.p
              className="mt-2 font-serif text-3xl font-bold tabular-nums leading-none"
              style={{color: FUNNEL_COLOURS.goldLight}}
              animate={reduce || !inView ? undefined : {scale: [1, 1.06, 1]}}
              transition={{duration: 1.3, repeat: Infinity}}
            >
              ?
            </motion.p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-wider" style={{color: `${FUNNEL_COLOURS.onInk}70`}}>
              Booked vs gone · unknown
            </p>
          </motion.div>
        )}
      </Card>
    </div>
  )
}
