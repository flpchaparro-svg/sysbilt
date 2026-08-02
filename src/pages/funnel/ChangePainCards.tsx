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

/** Three pain scenes with motion mocks, not text-only cards. */
export function ChangePainCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      <Card
        index="01"
        title="Half the team misses the session"
        text="One long session the week before. Jobs win. The recording sits unwatched."
      >
        {({inView, reduce}) => (
          <div className="space-y-2">
            {['Seat · showed', 'Seat · empty', 'Seat · empty', 'Recording · unwatched'].map(
              (row, i) => (
                <motion.div
                  key={row}
                  className="h-7 rounded px-2 flex items-center font-mono text-[9px] uppercase tracking-wider"
                  style={{
                    backgroundColor: `${FUNNEL_COLOURS.onInk}10`,
                    color: i === 0 ? `${FUNNEL_COLOURS.onInk}70` : FUNNEL_COLOURS.goldLight,
                  }}
                  initial={reduce ? false : {opacity: 0, x: -8}}
                  animate={
                    reduce || !inView
                      ? {opacity: 1, x: 0}
                      : i > 0
                        ? {opacity: [0.45, 1, 0.45], x: [0, 3, 0]}
                        : {opacity: 0.75, x: 0}
                  }
                  transition={{duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut'}}
                >
                  {row}
                </motion.div>
              ),
            )}
          </div>
        )}
      </Card>

      <Card
        index="02"
        title="The help desk floods in week two"
        text="Confusion does not arrive as complaints. It arrives as tickets and workarounds."
      >
        {({inView, reduce}) => (
          <div
            className="rounded-lg p-3 border"
            style={{borderColor: `${FUNNEL_COLOURS.onInk}18`, backgroundColor: `${FUNNEL_COLOURS.onInk}08`}}
          >
            <p className="font-mono text-[9px] uppercase tracking-wider" style={{color: `${FUNNEL_COLOURS.onInk}55`}}>
              Open tickets
            </p>
            <motion.p
              className="mt-2 font-serif text-3xl font-bold tabular-nums leading-none"
              style={{color: FUNNEL_COLOURS.goldLight}}
              animate={
                reduce || !inView
                  ? undefined
                  : {scale: [1, 1.06, 1], opacity: [0.75, 1, 0.75]}
              }
              transition={{duration: 1.3, repeat: Infinity}}
            >
              41
            </motion.p>
            <div className="mt-3 space-y-1.5">
              {[0.9, 0.65, 0.8].map((w, i) => (
                <motion.div
                  key={i}
                  className="h-1.5 rounded-full origin-left"
                  style={{
                    width: `${w * 100}%`,
                    backgroundColor: `${FUNNEL_COLOURS.goldLight}55`,
                  }}
                  animate={
                    reduce || !inView
                      ? undefined
                      : {scaleX: [0.7, 1, 0.85, 1], opacity: [0.5, 1, 0.7, 1]}
                  }
                  transition={{duration: 1.6, repeat: Infinity, delay: i * 0.15}}
                />
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card
        index="03"
        title="The old spreadsheet wins"
        text="Every workaround that sticks becomes the real system, whether you bought it or not."
      >
        {({inView, reduce}) => (
          <motion.div
            className="rounded-lg border overflow-hidden"
            style={{borderColor: `${FUNNEL_COLOURS.onInk}18`, backgroundColor: `${FUNNEL_COLOURS.onInk}08`}}
            animate={reduce || !inView ? undefined : {y: [0, -2, 0]}}
            transition={{duration: 1.8, repeat: Infinity}}
          >
            <div
              className="px-3 py-2 flex items-center justify-between border-b"
              style={{borderColor: `${FUNNEL_COLOURS.onInk}12`}}
            >
              <span className="font-mono text-[8px] uppercase tracking-wider" style={{color: `${FUNNEL_COLOURS.onInk}55`}}>
                File
              </span>
              <motion.span
                className="font-mono text-[8px] font-bold uppercase tracking-wider"
                style={{color: FUNNEL_COLOURS.goldLight}}
                animate={reduce || !inView ? undefined : {opacity: [0.4, 1, 0.4]}}
                transition={{duration: 1.1, repeat: Infinity}}
              >
                Reopened
              </motion.span>
            </div>
            <div className="px-3 py-3">
              <p className="font-mono text-[11px] leading-relaxed" style={{color: FUNNEL_COLOURS.onInk}}>
                old_spreadsheet_v7_FINAL.xlsx
              </p>
              <motion.p
                className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider"
                style={{color: FUNNEL_COLOURS.goldLight}}
                animate={reduce || !inView ? undefined : {scale: [1, 1.05, 1]}}
                transition={{duration: 1.2, repeat: Infinity}}
              >
                Status · real system again
              </motion.p>
            </div>
          </motion.div>
        )}
      </Card>
    </div>
  )
}
