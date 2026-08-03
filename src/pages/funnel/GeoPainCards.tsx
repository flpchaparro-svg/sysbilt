import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

function Card({
  index,
  title,
  children,
}: {
  index: string
  title: string
  children: (opts: {play: boolean; reduce: boolean | null}) => React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const play = Boolean(inView && !reduce)

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
      {children({play, reduce})}
    </motion.div>
  )
}

export function GeoPainCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      <Card index="01" title="Buyers ask AI first">
        {({play, reduce}) => (
          <div className="space-y-2 py-1">
            {['Who fixes this near me', 'Best option for X', 'Who to call today'].map((q, i) => (
              <motion.div
                key={q}
                className="flex items-center justify-between rounded-lg border px-3 py-2"
                style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: '#fff'}}
                initial={reduce ? false : {opacity: 0, x: -6}}
                animate={play || reduce ? {opacity: 1, x: 0} : {opacity: 0.4}}
                transition={{delay: reduce ? 0 : i * 0.1, duration: 0.35, ease: EASE}}
              >
                <span className="font-sans text-[12px] font-semibold truncate" style={{color: FUNNEL_COLOURS.ink}}>
                  {q}
                </span>
                <span className="font-mono text-[8px] font-bold uppercase tracking-wide shrink-0" style={{color: FUNNEL_COLOURS.accent}}>
                  Asked
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      <Card index="02" title="Competitors get cited">
        {({play}) => (
          <div className="flex items-center justify-center gap-3 py-2">
            <div
              className="flex-1 rounded-lg border px-3 py-3 text-center"
              style={{borderColor: `${FUNNEL_COLOURS.ink}22`, backgroundColor: `${FUNNEL_COLOURS.ink}08`}}
            >
              <p className="font-mono text-[7px] uppercase tracking-wide mb-1" style={{color: `${FUNNEL_COLOURS.ink}60`}}>
                Rival
              </p>
              <p className="font-mono text-[9px] font-bold" style={{color: `${FUNNEL_COLOURS.ink}80`}}>
                Cited
              </p>
            </div>
            <motion.span
              className="font-mono text-[10px]"
              style={{color: `${FUNNEL_COLOURS.ink}30`}}
              animate={play ? {opacity: [0.25, 0.55, 0.25]} : {opacity: 0.35}}
              transition={{duration: 2.2, repeat: Infinity, ease: 'easeInOut'}}
            >
              ···
            </motion.span>
            <div
              className="flex-1 rounded-lg border border-dashed px-3 py-3 text-center"
              style={{borderColor: `${FUNNEL_COLOURS.accent}55`, backgroundColor: `${FUNNEL_COLOURS.accent}08`}}
            >
              <p className="font-mono text-[7px] uppercase tracking-wide mb-1" style={{color: FUNNEL_COLOURS.accent}}>
                You
              </p>
              <p className="font-mono text-[9px] font-bold" style={{color: FUNNEL_COLOURS.accent}}>
                Missing
              </p>
            </div>
          </div>
        )}
      </Card>

      <Card index="03" title="Classic search alone">
        {({play, reduce}) => (
          <div className="space-y-3 py-1">
            {[
              {label: 'Ten blue links', value: 'Covered', ok: true},
              {label: 'AI answer layer', value: 'Open', ok: false},
            ].map((row, i) => (
              <div key={row.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[7px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.steel}}>
                    {row.label}
                  </span>
                  <span
                    className="font-mono text-[7px] font-bold"
                    style={{color: row.ok ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.accent}}
                  >
                    {row.value}
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{backgroundColor: `${FUNNEL_COLOURS.ink}10`}}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{backgroundColor: row.ok ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.accent}}
                    initial={reduce ? false : {width: '0%'}}
                    animate={play || reduce ? {width: row.ok ? '86%' : '28%'} : {width: '0%'}}
                    transition={{duration: 0.55, delay: 0.1 + i * 0.15, ease: EASE}}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card index="04" title="Default name drifts">
        {({play, reduce}) => (
          <div className="relative flex flex-col items-center justify-center gap-2 py-2">
            <motion.div
              className="rounded-lg border border-dashed px-4 py-3 text-center w-full"
              style={{borderColor: `${FUNNEL_COLOURS.accent}45`, backgroundColor: `${FUNNEL_COLOURS.accent}08`}}
              initial={reduce ? false : {opacity: 0, scale: 0.96}}
              animate={play || reduce ? {opacity: 1, scale: 1} : {opacity: 0.5}}
            >
              <p className="font-mono text-[8px] uppercase tracking-wide mb-1" style={{color: FUNNEL_COLOURS.accent}}>
                This week
              </p>
              <p className="font-sans text-[13px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
                Someone else becomes the answer
              </p>
            </motion.div>
            <motion.p
              className="font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
              style={{color: FUNNEL_COLOURS.accent}}
              animate={play ? {opacity: [0.4, 1, 0.4]} : {opacity: 0.65}}
              transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
            >
              Gap widens
            </motion.p>
          </div>
        )}
      </Card>
    </div>
  )
}
