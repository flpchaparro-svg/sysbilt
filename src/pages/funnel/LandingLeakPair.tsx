import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

function Panel({
  label,
  children,
  accent,
}: {
  label: string
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{
        borderColor: accent ? `${FUNNEL_COLOURS.goldDeep}55` : `${FUNNEL_COLOURS.ink}14`,
        backgroundColor: FUNNEL_COLOURS.surface,
      }}
    >
      <div
        className="px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
        style={{
          color: accent ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.muted,
          backgroundColor: accent ? `${FUNNEL_COLOURS.goldDeep}12` : `${FUNNEL_COLOURS.ink}06`,
        }}
      >
        {label}
      </div>
      <div className="p-4 md:p-5 min-h-[140px]">{children}</div>
    </div>
  )
}

/**
 * Leak: THE AD → THE LANDING (lobby) → THE DOOR (matched page).
 */
export function LandingLeakPair() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.3})
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
      initial={reduce ? false : {opacity: 0, y: 18}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
    >
      <Panel label="The ad">
        <motion.div
          animate={reduce || !inView ? undefined : {y: [0, -3, 0]}}
          transition={{duration: 2.2, repeat: Infinity, ease: 'easeInOut'}}
        >
          <p className="font-serif text-lg font-bold" style={{color: FUNNEL_COLOURS.ink}}>
            One specific offer
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
            Clean promise. One reason to click.
          </p>
          <motion.div
            className="mt-4 h-8 rounded-md flex items-center justify-center font-mono text-[10px] font-bold uppercase tracking-wider text-white"
            style={{backgroundColor: FUNNEL_COLOURS.accent}}
            animate={
              reduce || !inView
                ? undefined
                : {
                    scale: [1, 1.04, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(226,30,63,0)',
                      '0 0 0 8px rgba(226,30,63,0.16)',
                      '0 0 0 0 rgba(226,30,63,0)',
                    ],
                  }
            }
            transition={{duration: 1.8, repeat: Infinity}}
          >
            Learn more
          </motion.div>
        </motion.div>
      </Panel>

      <Panel label="The landing">
        <div className="relative space-y-2 overflow-hidden min-h-[100px]">
          {['Home', 'About', 'Services', 'Blog', 'Contact', 'Popup'].map((item, i) => (
            <motion.div
              key={item}
              className="h-3 rounded"
              style={{backgroundColor: `${FUNNEL_COLOURS.ink}10`, width: item === 'Popup' ? '55%' : '100%'}}
              animate={
                reduce || !inView
                  ? undefined
                  : {opacity: [0.35, 1, 0.35], x: [0, i % 2 === 0 ? 5 : -5, 0]}
              }
              transition={{duration: 1.5, repeat: Infinity, delay: i * 0.1}}
            />
          ))}
          <motion.div
            className="pointer-events-none absolute h-3.5 w-3.5 rounded-full border-2 bg-white/70"
            style={{borderColor: FUNNEL_COLOURS.accent, top: 6, left: 10}}
            animate={
              reduce || !inView
                ? undefined
                : {
                    top: [6, 22, 40, 58, 74, 6],
                    left: [10, 70, 30, 90, 45, 10],
                    scale: [1, 0.85, 1, 0.85, 1, 1],
                  }
            }
            transition={{duration: 3.6, repeat: Infinity, ease: 'easeInOut'}}
            aria-hidden
          />
        </div>
        <motion.p
          className="mt-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em]"
          style={{color: FUNNEL_COLOURS.accent}}
          animate={reduce || !inView ? undefined : {opacity: [0.25, 1, 0.25], x: [0, 3, 0]}}
          transition={{duration: 1.1, repeat: Infinity}}
        >
          Lost cursor
        </motion.p>
      </Panel>

      <Panel label="The door" accent>
        <motion.div
          animate={reduce || !inView ? undefined : {y: [0, 2, 0]}}
          transition={{duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.25}}
        >
          <p className="font-serif text-lg font-bold" style={{color: FUNNEL_COLOURS.ink}}>
            Same promise as the ad
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed" style={{color: FUNNEL_COLOURS.muted}}>
            One headline. One action. Nowhere else to go.
          </p>
          <motion.div
            className="mt-4 h-8 rounded-md flex items-center justify-center font-mono text-[10px] font-bold uppercase tracking-wider text-white"
            style={{backgroundColor: FUNNEL_COLOURS.accent}}
            animate={
              reduce || !inView
                ? undefined
                : {
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(226,30,63,0)',
                      '0 0 0 10px rgba(226,30,63,0.18)',
                      '0 0 0 0 rgba(226,30,63,0)',
                    ],
                  }
            }
            transition={{duration: 1.6, repeat: Infinity}}
          >
            Book now
          </motion.div>
        </motion.div>
      </Panel>
    </motion.div>
  )
}
