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
      {children({inView, reduce})}
    </motion.div>
  )
}

export function ProfilePostingPainCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {/* 01: mini calendar, one old mark, the rest empty and fading */}
      <Card index="01" title="The last post is embarrassingly old">
        {({inView, reduce}) => {
          const cells = Array.from({length: 12})
          return (
            <div className="grid grid-cols-6 gap-1.5">
              {cells.map((_, i) => (
                <motion.div
                  key={i}
                  className="aspect-square rounded-[3px] flex items-center justify-center"
                  style={{
                    backgroundColor: i === 0 ? `${FUNNEL_COLOURS.accent}22` : FUNNEL_COLOURS.mockFill,
                    border: i === 0 ? `1px solid ${FUNNEL_COLOURS.accent}70` : `1px solid ${FUNNEL_COLOURS.mockBorder}`,
                  }}
                  initial={reduce ? false : {opacity: 0}}
                  animate={
                    reduce || !inView
                      ? {opacity: 1}
                      : i === 0
                        ? {opacity: 1}
                        : {opacity: [0.7, 0.95, 0.7]}
                  }
                  transition={{duration: 1.8, repeat: Infinity, delay: i * 0.05, ease: 'easeInOut'}}
                >
                  {i === 0 ? (
                    <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: FUNNEL_COLOURS.accent}} />
                  ) : null}
                </motion.div>
              ))}
            </div>
          )
        }}
      </Card>

      {/* 02: two seats, one filled owner, one empty dashed */}
      <Card index="02" title="Nobody owns posting">
        {({inView, reduce}) => (
          <div className="flex items-center justify-center gap-4 py-2">
            <div
              className="h-10 w-10 rounded-full border-2 border-dashed"
              style={{borderColor: FUNNEL_COLOURS.mockBorder}}
            />
            <motion.div
              className="h-1.5 w-8 rounded-full"
              style={{backgroundColor: FUNNEL_COLOURS.mockBar}}
              animate={reduce || !inView ? undefined : {opacity: [0.7, 1, 0.7]}}
              transition={{duration: 1.6, repeat: Infinity}}
            />
            <motion.div
              className="h-10 w-10 rounded-full"
              style={{backgroundColor: FUNNEL_COLOURS.mockFill}}
              animate={
                reduce || !inView
                  ? undefined
                  : {
                      backgroundColor: [`${FUNNEL_COLOURS.ink}28`, `${FUNNEL_COLOURS.accent}1E`, `${FUNNEL_COLOURS.ink}28`],
                      scale: [1, 1.06, 1],
                    }
              }
              transition={{duration: 2.2, repeat: Infinity}}
            />
          </div>
        )}
      </Card>

      {/* 03: strikethrough bar shape, old offer crossed out */}
      <Card index="03" title="Offers go stale on the profile">
        {({inView, reduce}) => (
          <div className="flex items-center justify-center py-3">
            <motion.div
              className="relative h-9 w-full max-w-[180px] rounded-lg border"
              style={{borderColor: FUNNEL_COLOURS.mockBorder, backgroundColor: '#fff'}}
              animate={reduce || !inView ? undefined : {opacity: [0.75, 1, 0.75]}}
              transition={{duration: 2, repeat: Infinity}}
            >
              <div
                className="absolute inset-x-3 top-1/2 h-[2px] -translate-y-1/2"
                style={{backgroundColor: FUNNEL_COLOURS.muted, transform: 'translateY(-50%) rotate(-6deg)'}}
              />
            </motion.div>
          </div>
        )}
      </Card>

      {/* 04: big number counter, competitor cadence dots vs one flat line */}
      <Card index="04" title="Silence next to a competitor who posts weekly">
        {({inView, reduce}) => (
          <div className="flex items-center justify-between gap-3 py-1">
            <motion.span
              className="font-serif text-4xl font-bold tabular-nums leading-none"
              style={{color: FUNNEL_COLOURS.accent}}
              animate={reduce || !inView ? undefined : {scale: [1, 1.08, 1]}}
              transition={{duration: 1.15, repeat: Infinity}}
            >
              214
            </motion.span>
            <div className="flex items-end gap-1 h-8">
              {[0.2, 0.2, 0.85, 0.2, 0.9, 0.2, 0.95].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1.5 rounded-sm"
                  style={{
                    height: `${h * 100}%`,
                    backgroundColor: h > 0.5 ? FUNNEL_COLOURS.gold : FUNNEL_COLOURS.mockFill,
                  }}
                  animate={reduce || !inView ? undefined : {opacity: h > 0.5 ? [0.7, 1, 0.7] : 1}}
                  transition={{duration: 1.4, repeat: Infinity, delay: i * 0.1}}
                />
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
