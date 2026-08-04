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
  children: (opts: {play: boolean; reduce: boolean | null}) => React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const reduce = useReducedMotion()
  const play = Boolean(inView && !reduce)

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl p-5 md:p-6 border flex flex-col"
      style={{
        borderColor: FUNNEL_COLOURS.mockBorder,
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
      <div className="mt-auto min-h-[72px] flex items-center justify-center">{children({play, reduce})}</div>
    </motion.div>
  )
}

export function LocalPackPainCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {/* 01: profile chip lit and done, reviews chip frozen dashed beside it */}
      <Card index="01" title="Categories got cleaned, reviews never did">
        {({play}) => (
          <div className="flex items-center justify-center gap-3 w-full py-1">
            <motion.div
              className="flex-1 rounded-lg border px-3 py-3 text-center"
              style={{
                borderColor: `${FUNNEL_COLOURS.goldDeep}70`,
                backgroundColor: `${FUNNEL_COLOURS.gold}22`,
              }}
              animate={play ? {opacity: [0.85, 1, 0.85]} : {opacity: 1}}
              transition={{duration: 2.2, repeat: Infinity, ease: 'easeInOut'}}
            >
              <p
                className="font-mono text-[7px] uppercase tracking-wide mb-1"
                style={{color: FUNNEL_COLOURS.goldDeep}}
              >
                Profile
              </p>
              <p className="font-mono text-[9px] font-bold" style={{color: FUNNEL_COLOURS.goldDeep}}>
                Done
              </p>
            </motion.div>
            <motion.span
              className="font-mono text-[10px]"
              style={{color: FUNNEL_COLOURS.mockLabel}}
              animate={play ? {opacity: [0.45, 1, 0.45]} : {opacity: 0.7}}
              transition={{duration: 1.6, repeat: Infinity, ease: 'easeInOut'}}
            >
              ···
            </motion.span>
            <div
              className="flex-1 rounded-lg border border-dashed px-3 py-3 text-center"
              style={{
                borderColor: FUNNEL_COLOURS.mockBorder,
                backgroundColor: FUNNEL_COLOURS.mockWash,
              }}
            >
              <p
                className="font-mono text-[7px] uppercase tracking-wide mb-1"
                style={{color: FUNNEL_COLOURS.mockLabel}}
              >
                Reviews
              </p>
              <p className="font-mono text-[9px] font-bold" style={{color: FUNNEL_COLOURS.muted}}>
                Untouched
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* 02: one review star lands, the rest stay dead */}
      <Card index="02" title="One ask, then the habit died">
        {({play, reduce}) => (
          <div className="flex items-center gap-2 py-2 justify-center">
            {Array.from({length: 5}).map((_, i) => (
              <motion.span
                key={i}
                className="h-5 w-5"
                style={{
                  backgroundColor: i === 0 ? FUNNEL_COLOURS.gold : FUNNEL_COLOURS.mockFill,
                  clipPath:
                    'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                }}
                initial={reduce ? false : i === 0 ? {opacity: 0, scale: 0.6} : {opacity: 0.9}}
                animate={
                  play
                    ? i === 0
                      ? {opacity: [1, 0.7, 1], scale: [1, 1.12, 1]}
                      : {opacity: 0.55, scale: 1}
                    : i === 0
                      ? {opacity: 1, scale: 1}
                      : {opacity: 0.55, scale: 1}
                }
                transition={
                  i === 0 && play
                    ? {duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2}
                    : {duration: 0.4, delay: 0.1 + i * 0.04}
                }
              />
            ))}
          </div>
        )}
      </Card>

      {/* 03: empty calendar, one lonely post that soft-pulses */}
      <Card index="03" title="Posts happen on guilt, not a schedule">
        {({play, reduce}) => {
          const cells = Array.from({length: 12})
          return (
            <div className="grid grid-cols-6 gap-1.5 w-full">
              {cells.map((_, i) => (
                <motion.div
                  key={i}
                  className="aspect-square rounded-[3px] flex items-center justify-center"
                  style={{
                    backgroundColor:
                      i === 3 ? `${FUNNEL_COLOURS.accent}28` : FUNNEL_COLOURS.mockFill,
                    border:
                      i === 3
                        ? `1px solid ${FUNNEL_COLOURS.accent}80`
                        : `1px solid ${FUNNEL_COLOURS.mockBorder}`,
                  }}
                  initial={reduce ? false : {opacity: 0}}
                  animate={
                    play || reduce
                      ? i === 3
                        ? {opacity: [1, 0.55, 1], scale: [1, 0.94, 1]}
                        : {opacity: 0.85, scale: 1}
                      : {opacity: 0.55}
                  }
                  transition={
                    i === 3 && play
                      ? {duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.25}
                      : {duration: 0.35, delay: reduce ? 0 : i * 0.03}
                  }
                >
                  {i === 3 ? (
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{backgroundColor: FUNNEL_COLOURS.accent}}
                    />
                  ) : null}
                </motion.div>
              ))}
            </div>
          )
        }}
      </Card>

      {/* 04: three stalled receipts, soft sequential fade */}
      <Card index="04" title="Three buys, three chances to stall">
        {({play}) => (
          <div className="flex items-center gap-2 w-full py-1">
            {['Brief', 'Access', 'Start'].map((label, i) => (
              <motion.div
                key={label}
                className="flex-1 rounded-md border border-dashed px-1.5 py-2.5 text-center"
                style={{
                  borderColor: FUNNEL_COLOURS.mockBorder,
                  backgroundColor: FUNNEL_COLOURS.mockWash,
                }}
                animate={play ? {opacity: [0.55, 1, 0.55]} : {opacity: 0.8}}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.4,
                }}
              >
                <p
                  className="font-mono text-[7px] uppercase tracking-wide"
                  style={{color: FUNNEL_COLOURS.mockLabel}}
                >
                  {label}
                </p>
                <p
                  className="mt-1 font-mono text-[7px] font-bold uppercase tracking-wide"
                  style={{color: FUNNEL_COLOURS.accent}}
                >
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
