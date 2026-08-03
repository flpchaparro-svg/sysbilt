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

export function SchemaFaqPainCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {/* 01: a solid "Competitor" chip sits cited, the "You" chip stays dashed and missing */}
      <Card index="01" title="Competitors get cited">
        {({play}) => (
          <div className="flex items-center justify-center gap-3 py-2">
            <motion.div
              className="flex-1 rounded-lg border px-3 py-3 text-center"
              style={{borderColor: `${FUNNEL_COLOURS.ink}22`, backgroundColor: `${FUNNEL_COLOURS.ink}08`}}
              initial={false}
              animate={play ? {opacity: 1, y: 0} : {opacity: 1}}
              transition={{duration: 0.4}}
            >
              <p
                className="font-mono text-[7px] uppercase tracking-wide mb-1"
                style={{color: `${FUNNEL_COLOURS.ink}60`}}
              >
                Competitor
              </p>
              <p className="font-mono text-[9px] font-bold" style={{color: `${FUNNEL_COLOURS.ink}80`}}>
                Cited
              </p>
            </motion.div>
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
              style={{borderColor: `${FUNNEL_COLOURS.accent}45`, opacity: 0.9}}
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

      {/* 02: the site sits fully live, the after-hours line stays flat and unanswered */}
      <Card index="02" title="Nothing answers after hours">
        {({play, reduce}) => (
          <div className="space-y-3 py-1">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span
                  className="font-mono text-[7px] uppercase tracking-wide"
                  style={{color: FUNNEL_COLOURS.goldDeep}}
                >
                  Website
                </span>
                <span className="font-mono text-[7px] font-bold" style={{color: FUNNEL_COLOURS.goldDeep}}>
                  Live
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{backgroundColor: `${FUNNEL_COLOURS.ink}10`}}>
                <motion.div
                  className="h-full rounded-full"
                  style={{backgroundColor: FUNNEL_COLOURS.goldDeep}}
                  initial={reduce ? false : {width: '0%'}}
                  animate={play || reduce ? {width: '96%'} : {width: '0%'}}
                  transition={{duration: 0.6, delay: 0.1, ease: EASE}}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[7px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.accent}}>
                  After hours
                </span>
                <span className="font-mono text-[7px] font-bold" style={{color: FUNNEL_COLOURS.accent}}>
                  No answer
                </span>
              </div>
              <svg className="w-full h-5" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
                <motion.path
                  d="M 2 12 L 98 12"
                  stroke={FUNNEL_COLOURS.accent}
                  strokeWidth={1.4}
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  initial={reduce ? false : {pathLength: 0, opacity: 0}}
                  animate={play || reduce ? {pathLength: 1, opacity: 0.6} : {pathLength: 0, opacity: 0}}
                  transition={{duration: 0.6, delay: 0.35, ease: EASE}}
                />
                <motion.circle
                  cx={98}
                  cy={12}
                  r={2}
                  fill={FUNNEL_COLOURS.accent}
                  animate={play ? {opacity: [0.4, 1, 0.4]} : {opacity: 0.6}}
                  transition={{duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9}}
                />
              </svg>
            </div>
          </div>
        )}
      </Card>

      {/* 03: a page and a schema node, joined by a link that never resolves */}
      <Card index="03" title="Schema missing or wrong">
        {({play, reduce}) => {
          // Shared viewBox coords so the link, the error marker, and both
          // nodes all line up. Nodes stay put.
          const nodes = [
            {id: 'Page', cx: 46, cy: 58},
            {id: 'Schema', cx: 154, cy: 58},
          ] as const
          const box = 26
          const midX = (nodes[0].cx + nodes[1].cx) / 2

          return (
            <div className="relative w-full">
              <svg
                className="w-full h-[112px]"
                viewBox="0 0 200 112"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden
              >
                <motion.path
                  d={`M ${nodes[0].cx} ${nodes[0].cy} L ${nodes[1].cx} ${nodes[1].cy}`}
                  fill="none"
                  stroke={FUNNEL_COLOURS.accent}
                  strokeWidth={1.25}
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                  initial={reduce ? false : {pathLength: 0, opacity: 0}}
                  animate={
                    play
                      ? {pathLength: [0, 0.86, 0], opacity: [0, 0.7, 0]}
                      : reduce
                        ? {pathLength: 0.5, opacity: 0.35}
                        : {pathLength: 0, opacity: 0}
                  }
                  transition={{duration: 2.6, repeat: Infinity, ease: 'easeInOut'}}
                />
                <motion.g
                  animate={play || reduce ? {opacity: [0.55, 1, 0.55]} : {opacity: 0.55}}
                  transition={{duration: 1.8, repeat: Infinity, ease: 'easeInOut'}}
                >
                  <circle
                    cx={midX}
                    cy={nodes[0].cy}
                    r={7}
                    fill={`${FUNNEL_COLOURS.accent}18`}
                    stroke={FUNNEL_COLOURS.accent}
                    strokeWidth={1.4}
                  />
                  <text
                    x={midX}
                    y={nodes[0].cy + 2.5}
                    textAnchor="middle"
                    fill={FUNNEL_COLOURS.accent}
                    style={{fontSize: 9, fontWeight: 700, fontFamily: 'ui-monospace, monospace'}}
                  >
                    ×
                  </text>
                </motion.g>
                {nodes.map((n, i) => (
                  <g key={n.id}>
                    <motion.rect
                      x={n.cx - box / 2}
                      y={n.cy - box / 2}
                      width={box}
                      height={box}
                      rx={4}
                      fill={`${FUNNEL_COLOURS.ink}06`}
                      stroke={`${FUNNEL_COLOURS.ink}30`}
                      strokeWidth={1}
                      strokeDasharray="3 2"
                      initial={reduce ? false : {opacity: 0}}
                      animate={play || reduce ? {opacity: 1} : {opacity: 0.45}}
                      transition={{delay: reduce ? 0 : 0.08 + i * 0.1, duration: 0.35, ease: EASE}}
                    />
                    <text
                      x={n.cx}
                      y={n.cy + box / 2 + 16}
                      textAnchor="middle"
                      fill={`${FUNNEL_COLOURS.ink}55`}
                      style={{fontSize: 7, letterSpacing: '0.06em', fontFamily: 'ui-monospace, monospace'}}
                    >
                      {n.id.toUpperCase()}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          )
        }}
      </Card>

      {/* 04: two near-identical dashed answer blocks, no fact tells them apart */}
      <Card index="04" title="AI search talk, no facts">
        {({play, reduce}) => (
          <div className="relative flex items-center justify-center gap-2 py-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex-1 rounded-lg border border-dashed px-3 py-3 space-y-1.5"
                style={{borderColor: `${FUNNEL_COLOURS.ink}22`}}
              >
                <div className="h-1.5 w-4/5 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}14`}} />
                <div className="h-1.5 w-3/5 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}0A`}} />
                <div className="h-1.5 w-2/5 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}0A`}} />
              </div>
            ))}
            <motion.span
              className="absolute font-mono text-[10px] font-bold"
              style={{color: `${FUNNEL_COLOURS.accent}90`}}
              initial={reduce ? false : {opacity: 0}}
              animate={play || reduce ? {opacity: [0.4, 1, 0.4]} : {opacity: 0}}
              transition={{duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3}}
            >
              ≈
            </motion.span>
          </div>
        )}
      </Card>
    </div>
  )
}
