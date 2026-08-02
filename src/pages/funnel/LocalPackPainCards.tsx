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

export function LocalPackPainCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {/* 01: profile chip lit and done, reviews chip frozen dashed beside it */}
      <Card index="01" title="Categories got cleaned, reviews never did">
        {({inView, reduce}) => (
          <div className="flex items-center justify-center gap-3 py-2">
            <div
              className="flex-1 rounded-lg border px-3 py-3 text-center"
              style={{borderColor: `${FUNNEL_COLOURS.goldDeep}55`, backgroundColor: `${FUNNEL_COLOURS.gold}18`}}
            >
              <p className="font-mono text-[7px] uppercase tracking-wide mb-1" style={{color: FUNNEL_COLOURS.goldDeep}}>
                Profile
              </p>
              <p className="font-mono text-[9px] font-bold" style={{color: FUNNEL_COLOURS.goldDeep}}>
                Done
              </p>
            </div>
            <motion.span
              className="font-mono text-[10px]"
              style={{color: `${FUNNEL_COLOURS.ink}30`}}
              animate={reduce || !inView ? undefined : {opacity: [0.2, 0.5, 0.2]}}
              transition={{duration: 1.8, repeat: Infinity}}
            >
              ···
            </motion.span>
            <div
              className="flex-1 rounded-lg border border-dashed px-3 py-3 text-center"
              style={{borderColor: `${FUNNEL_COLOURS.ink}20`}}
            >
              <p className="font-mono text-[7px] uppercase tracking-wide mb-1" style={{color: `${FUNNEL_COLOURS.ink}45`}}>
                Reviews
              </p>
              <p className="font-mono text-[9px] font-bold" style={{color: `${FUNNEL_COLOURS.ink}35`}}>
                Untouched
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* 02: one review star burst, then fades to nothing */}
      <Card index="02" title="One ask, then the habit died">
        {({inView, reduce}) => (
          <div className="flex items-center gap-1.5 py-3 justify-center">
            {Array.from({length: 6}).map((_, i) => (
              <motion.span
                key={i}
                className="h-4 w-4"
                style={{
                  backgroundColor: i === 0 ? FUNNEL_COLOURS.gold : `${FUNNEL_COLOURS.ink}10`,
                  clipPath:
                    'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                }}
                animate={
                  reduce || !inView
                    ? undefined
                    : i === 0
                      ? {scale: [1, 1.2, 1]}
                      : {opacity: [0.5, 0.2, 0.5]}
                }
                transition={{duration: 1.8, repeat: Infinity, delay: i * 0.08}}
              />
            ))}
          </div>
        )}
      </Card>

      {/* 03: a guilty finger tap, one lonely post, long gap after */}
      <Card index="03" title="Posts happen on guilt, not a schedule">
        {({inView, reduce}) => {
          const cells = Array.from({length: 12})
          return (
            <div className="grid grid-cols-6 gap-1.5">
              {cells.map((_, i) => (
                <motion.div
                  key={i}
                  className="aspect-square rounded-[3px] flex items-center justify-center"
                  style={{
                    backgroundColor: i === 3 ? `${FUNNEL_COLOURS.accent}22` : `${FUNNEL_COLOURS.ink}07`,
                    border: i === 3 ? `1px solid ${FUNNEL_COLOURS.accent}70` : `1px solid ${FUNNEL_COLOURS.ink}0A`,
                  }}
                  initial={reduce ? false : {opacity: 0}}
                  animate={
                    reduce || !inView
                      ? {opacity: 1}
                      : i === 3
                        ? {opacity: 1}
                        : {opacity: [0.35, 0.6, 0.35]}
                  }
                  transition={{duration: 1.8, repeat: Infinity, delay: i * 0.05, ease: 'easeInOut'}}
                >
                  {i === 3 ? (
                    <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: FUNNEL_COLOURS.accent}} />
                  ) : null}
                </motion.div>
              ))}
            </div>
          )
        }}
      </Card>

      {/* 04: three separate stalled receipts, each with its own dashed border */}
      <Card index="04" title="Three buys, three chances to stall">
        {({inView, reduce}) => (
          <div className="flex items-center gap-2 py-1">
            {['Brief', 'Access', 'Start'].map((label, i) => (
              <motion.div
                key={label}
                className="flex-1 rounded-md border border-dashed px-1.5 py-2.5 text-center"
                style={{borderColor: `${FUNNEL_COLOURS.ink}22`}}
                animate={
                  reduce || !inView
                    ? undefined
                    : {opacity: [0.4, 0.75, 0.4]}
                }
                transition={{duration: 2, repeat: Infinity, delay: i * 0.3}}
              >
                <p className="font-mono text-[6px] uppercase tracking-wide" style={{color: `${FUNNEL_COLOURS.ink}55`}}>
                  {label}
                </p>
                <p className="mt-1 font-mono text-[6px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.accent}}>
                  ×3
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
