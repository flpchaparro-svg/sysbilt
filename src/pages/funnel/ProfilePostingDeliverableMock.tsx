import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/** Once it's wired: cadence fills, templates go blank-to-ready, the bank grows. Minimal labels. */
export function ProfilePostingDeliverableMock() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.4})
  const reduce = useReducedMotion()
  const go = !reduce && inView

  return (
    <motion.div
      ref={ref}
      className="w-full max-w-sm"
      initial={reduce ? false : {opacity: 0, y: 16, scale: 0.98}}
      whileInView={{opacity: 1, y: 0, scale: 1}}
      viewport={{once: true, amount: 0.4}}
      transition={{type: 'spring', stiffness: 300, damping: 22}}
    >
      <div
        className="rounded-2xl overflow-hidden border shadow-[0_16px_40px_-24px_rgba(14,28,47,0.35)]"
        style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: '#fff'}}
      >
        <div
          className="px-4 py-2.5 flex items-center gap-1.5"
          style={{backgroundColor: FUNNEL_COLOURS.ink}}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.onInk}55`}} />
          <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.onInk}35`}} />
          <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.onInk}20`}} />
          <motion.span
            className="ml-auto h-1.5 w-1.5 rounded-full"
            style={{backgroundColor: '#1F7A4D'}}
            animate={go ? {opacity: [0.4, 1, 0.4]} : {opacity: 0.8}}
            transition={{duration: 1.4, repeat: Infinity}}
          />
        </div>

        <div className="p-5 space-y-4">
          {/* beat 1: cadence — weekly ticks fill in */}
          <div className="flex items-center gap-1.5">
            {Array.from({length: 7}).map((_, i) => (
              <motion.div
                key={i}
                className="h-6 flex-1 rounded-sm"
                style={{backgroundColor: `${FUNNEL_COLOURS.ink}08`}}
                animate={go ? {backgroundColor: [`${FUNNEL_COLOURS.ink}08`, FUNNEL_COLOURS.gold, FUNNEL_COLOURS.gold]} : undefined}
                transition={{duration: 0.4, delay: reduce ? 0 : 0.15 + i * 0.09}}
              />
            ))}
          </div>

          {/* beat 2: templates — blank framed cards go ready */}
          <div className="grid grid-cols-4 gap-1.5">
            {Array.from({length: 4}).map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-md border"
                style={{borderColor: `${FUNNEL_COLOURS.ink}18`, backgroundColor: '#fff'}}
                initial={{borderStyle: 'dashed'}}
                animate={
                  go
                    ? {
                        borderColor: [`${FUNNEL_COLOURS.ink}18`, `${FUNNEL_COLOURS.goldDeep}80`, `${FUNNEL_COLOURS.goldDeep}80`],
                        backgroundColor: ['#fff', `${FUNNEL_COLOURS.gold}1C`, `${FUNNEL_COLOURS.gold}1C`],
                      }
                    : undefined
                }
                transition={{duration: 0.4, delay: reduce ? 0 : 0.7 + i * 0.12}}
              />
            ))}
          </div>

          {/* beat 3: bank — a stack of post cards grows */}
          <div className="relative h-12 flex items-end justify-center">
            {Array.from({length: 5}).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-16 h-9 rounded-md border"
                style={{
                  borderColor: `${FUNNEL_COLOURS.ink}14`,
                  backgroundColor: '#fff',
                  boxShadow: '0 3px 8px -4px rgba(14,28,47,0.25)',
                  zIndex: i,
                }}
                initial={{opacity: 0, y: 10, x: (i - 2) * 2}}
                animate={
                  go
                    ? {opacity: 1, y: -(i * 3), x: (i - 2) * 9, rotate: (i - 2) * 3.5}
                    : undefined
                }
                transition={{delay: reduce ? 0 : 1.25 + i * 0.1, type: 'spring', stiffness: 320, damping: 22}}
              >
                <div
                  className="absolute inset-1.5 rounded-sm"
                  style={{backgroundColor: i % 2 === 0 ? `${FUNNEL_COLOURS.gold}25` : `${FUNNEL_COLOURS.ink}06`}}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
