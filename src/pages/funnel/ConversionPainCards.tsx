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

export function ConversionPainCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      {/* 01: an "About us" chip sits done and heavy, "Enquire" stays dashed and missing */}
      <Card index="01" title="The homepage talks about you">
        {({play}) => (
          <div className="flex items-center justify-center gap-3 py-2">
            <motion.div
              className="flex-1 rounded-lg border px-3 py-3 text-center"
              style={{borderColor: `${FUNNEL_COLOURS.ink}22`, backgroundColor: `${FUNNEL_COLOURS.ink}1C`}}
              initial={false}
              animate={play ? {opacity: 1, y: 0} : {opacity: 1}}
              transition={{duration: 0.4}}
            >
              <p
                className="font-mono text-[7px] uppercase tracking-wide mb-1"
                style={{color: `${FUNNEL_COLOURS.ink}60`}}
              >
                About us
              </p>
              <p className="font-mono text-[9px] font-bold" style={{color: `${FUNNEL_COLOURS.ink}80`}}>
                Long
              </p>
            </motion.div>
            <motion.span
              className="font-mono text-[10px]"
              style={{color: `${FUNNEL_COLOURS.ink}30`}}
              animate={play ? {opacity: [0.75, 1, 0.75]} : {opacity: 0.8}}
              transition={{duration: 2.2, repeat: Infinity, ease: 'easeInOut'}}
            >
              ···
            </motion.span>
            <div
              className="flex-1 rounded-lg border border-dashed px-3 py-3 text-center"
              style={{borderColor: `${FUNNEL_COLOURS.accent}45`, opacity: 0.9}}
            >
              <p className="font-mono text-[7px] uppercase tracking-wide mb-1" style={{color: FUNNEL_COLOURS.accent}}>
                Enquire
              </p>
              <p className="font-mono text-[9px] font-bold" style={{color: FUNNEL_COLOURS.accent}}>
                Missing
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* 02: three nested, fading layers to reach the contact link */}
      <Card index="02" title="Contact is three clicks deep">
        {({play, reduce}) => {
          const layers = [
            {size: 100, label: 'Home'},
            {size: 74, label: 'Services'},
            {size: 46, label: 'Contact'},
          ]
          return (
            <div className="relative h-[108px] flex items-center justify-center py-1">
              {layers.map((layer, i) => (
                <motion.div
                  key={layer.label}
                  className="absolute rounded-lg border flex items-start justify-start p-1.5"
                  style={{
                    width: `${layer.size}%`,
                    height: `${layer.size}%`,
                    borderColor:
                      i === layers.length - 1 ? `${FUNNEL_COLOURS.accent}55` : `${FUNNEL_COLOURS.ink}18`,
                    backgroundColor: i === layers.length - 1 ? `${FUNNEL_COLOURS.accent}0C` : 'transparent',
                  }}
                  initial={reduce ? false : {opacity: 0, scale: 0.9}}
                  animate={play || reduce ? {opacity: 1 - i * 0.22, scale: 1} : {opacity: 0, scale: 0.9}}
                  transition={{delay: reduce ? 0 : 0.12 + i * 0.16, type: 'spring', stiffness: 300, damping: 24}}
                >
                  <span
                    className="font-mono text-[6px] uppercase tracking-wide"
                    style={{color: i === layers.length - 1 ? FUNNEL_COLOURS.accent : `${FUNNEL_COLOURS.ink}45`}}
                  >
                    {layer.label}
                  </span>
                </motion.div>
              ))}
            </div>
          )
        }}
      </Card>

      {/* 03: two identical dashed service boxes, no way to tell them apart */}
      <Card index="03" title="Service pages are interchangeable">
        {({play, reduce}) => (
          <div className="relative flex items-center justify-center gap-2 py-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex-1 rounded-lg border border-dashed px-3 py-3 space-y-1.5"
                style={{borderColor: `${FUNNEL_COLOURS.ink}22`}}
              >
                <div className="h-1.5 w-4/5 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}14`}} />
                <div className="h-1.5 w-3/5 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}24`}} />
                <div className="h-1.5 w-2/5 rounded-sm" style={{backgroundColor: `${FUNNEL_COLOURS.ink}24`}} />
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

      {/* 04: speed gauge sits full, the enquiry line stays flat */}
      <Card index="04" title="Speed fixed, enquiries flat">
        {({play, reduce}) => (
          <div className="space-y-3 py-1">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span
                  className="font-mono text-[7px] uppercase tracking-wide"
                  style={{color: FUNNEL_COLOURS.goldDeep}}
                >
                  Speed
                </span>
                <span className="font-mono text-[7px] font-bold" style={{color: FUNNEL_COLOURS.goldDeep}}>
                  Fast
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{backgroundColor: `${FUNNEL_COLOURS.ink}2C`}}>
                <motion.div
                  className="h-full rounded-full"
                  style={{backgroundColor: FUNNEL_COLOURS.goldDeep}}
                  initial={reduce ? false : {width: '0%'}}
                  animate={play || reduce ? {width: '95%'} : {width: '0%'}}
                  transition={{duration: 0.6, delay: 0.1, ease: EASE}}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[7px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.accent}}>
                  Enquiries
                </span>
                <span className="font-mono text-[7px] font-bold" style={{color: FUNNEL_COLOURS.accent}}>
                  Flat
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
    </div>
  )
}
