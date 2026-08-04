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
      initial={reduce ? false : {opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.3}}
      transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
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

export function LandingPainCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      <Card index="01" title="They click a promise">
        {({inView, reduce}) => (
          <div
            className="rounded-lg p-3 border"
            style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: '#fff'}}
          >
            <p className="font-sans text-sm font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              Free consult this week
            </p>
            <motion.div
              className="mt-3 h-7 rounded flex items-center justify-center text-[10px] font-mono font-bold uppercase tracking-wider text-white"
              style={{backgroundColor: FUNNEL_COLOURS.accent}}
              animate={
                reduce || !inView
                  ? undefined
                  : {
                      scale: [1, 1.08, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(226,30,63,0)',
                        '0 0 0 10px rgba(226,30,63,0.22)',
                        '0 0 0 0 rgba(226,30,63,0)',
                      ],
                    }
              }
              transition={{duration: 1.4, repeat: Infinity}}
            >
              Click
            </motion.div>
          </div>
        )}
      </Card>
      <Card index="02" title="They land in a lobby">
        {({inView, reduce}) => (
          <div className="relative space-y-1.5 overflow-hidden">
            {['Nav', 'Hero carousel', 'Six services', 'Popup'].map((row, i) => (
              <motion.div
                key={row}
                className="h-6 rounded px-2 flex items-center font-mono text-[9px] uppercase tracking-wider"
                style={{backgroundColor: `${FUNNEL_COLOURS.ink}1C`, color: FUNNEL_COLOURS.muted}}
                animate={
                  reduce || !inView
                    ? undefined
                    : {x: [0, i % 2 === 0 ? 6 : -6, 0], opacity: [0.5, 1, 0.5]}
                }
                transition={{duration: 1.8, repeat: Infinity, delay: i * 0.12}}
              >
                {row}
              </motion.div>
            ))}
            <motion.div
              className="pointer-events-none absolute h-3 w-3 rounded-full border-2"
              style={{borderColor: FUNNEL_COLOURS.accent, top: 8, left: 12}}
              animate={
                reduce || !inView
                  ? undefined
                  : {top: [8, 28, 52, 76, 8], left: [12, 80, 40, 100, 12]}
              }
              transition={{duration: 3.2, repeat: Infinity, ease: 'easeInOut'}}
              aria-hidden
            />
          </div>
        )}
      </Card>
      <Card index="03" title="The spend teaches nothing">
        {({inView, reduce}) => (
          <motion.div
            className="rounded-lg p-3 font-mono text-[11px] leading-relaxed"
            style={{backgroundColor: `${FUNNEL_COLOURS.ink}16`, color: FUNNEL_COLOURS.ink}}
          >
            <div>Ad spend · $2,000</div>
            <div>Clicks · 380</div>
            <motion.div
              className="mt-1 font-bold"
              style={{color: FUNNEL_COLOURS.accent}}
              animate={
                reduce || !inView
                  ? undefined
                  : {scale: [1, 1.12, 1], x: [0, 2, 0]}
              }
              transition={{duration: 1.2, repeat: Infinity}}
            >
              Enquiries · 3
            </motion.div>
          </motion.div>
        )}
      </Card>
    </div>
  )
}
