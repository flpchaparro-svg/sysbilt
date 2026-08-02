import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/** Once delivered: three product blocks light up in turn, then the monthly checklist ticks. */
export function LocalPackDeliverableMock() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.4})
  const reduce = useReducedMotion()
  const go = !reduce && inView

  const blocks = [
    {label: 'Profile Fix', detail: 'Claim · categories · photos'},
    {label: 'Review Engine', detail: 'Ask · templates · QR'},
    {label: 'Profile Posting', detail: 'Cadence · bank'},
  ]
  const checklist = ['Profile still clean', 'Asks still firing', 'Bank still fresh']

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
          <span
            className="ml-auto font-mono text-[8px] uppercase tracking-[0.14em]"
            style={{color: `${FUNNEL_COLOURS.onInk}70`}}
          >
            One pack
          </span>
        </div>

        <div className="p-5 space-y-3">
          {blocks.map((block, i) => (
            <motion.div
              key={block.label}
              className="flex items-center gap-3 rounded-lg border px-3 py-2.5"
              style={{borderColor: `${FUNNEL_COLOURS.ink}10`, backgroundColor: '#fff'}}
              initial={reduce ? false : {opacity: 0.3, x: 12}}
              animate={
                go
                  ? {
                      opacity: 1,
                      x: 0,
                      borderColor: `${FUNNEL_COLOURS.goldDeep}60`,
                      backgroundColor: `${FUNNEL_COLOURS.gold}10`,
                    }
                  : undefined
              }
              transition={{delay: reduce ? 0 : 0.15 + i * 0.22, type: 'spring', stiffness: 340, damping: 22}}
            >
              <span
                className="font-mono text-[9px] font-bold tabular-nums shrink-0"
                style={{color: FUNNEL_COLOURS.goldDeep}}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-[12px] font-semibold truncate" style={{color: FUNNEL_COLOURS.ink}}>
                  {block.label}
                </p>
                <p className="font-mono text-[7px] uppercase tracking-wide truncate" style={{color: FUNNEL_COLOURS.muted}}>
                  {block.detail}
                </p>
              </div>
              <motion.span
                className="h-1.5 w-1.5 rounded-full shrink-0"
                style={{backgroundColor: '#1F7A4D'}}
                animate={go ? {opacity: [0.4, 1, 0.4]} : {opacity: 0.8}}
                transition={{duration: 1.4, repeat: Infinity, delay: 0.5 + i * 0.2}}
              />
            </motion.div>
          ))}

          {/* monthly checklist strip */}
          <div
            className="rounded-lg border px-3 py-2.5 space-y-1.5"
            style={{borderColor: `${FUNNEL_COLOURS.ink}10`, backgroundColor: FUNNEL_COLOURS.ground}}
          >
            <p
              className="font-mono text-[7px] font-bold uppercase tracking-[0.14em]"
              style={{color: FUNNEL_COLOURS.steel}}
            >
              5-minute check
            </p>
            {checklist.map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-2"
                initial={reduce ? false : {opacity: 0}}
                animate={go ? {opacity: 1} : undefined}
                transition={{delay: reduce ? 0 : 0.9 + i * 0.15, duration: 0.3}}
              >
                <motion.span
                  className="font-mono text-[8px] font-bold"
                  style={{color: FUNNEL_COLOURS.goldDeep}}
                  initial={reduce ? false : {opacity: 0, scale: 0.6}}
                  animate={go ? {opacity: 1, scale: 1} : undefined}
                  transition={{delay: reduce ? 0 : 1 + i * 0.15}}
                >
                  ✓
                </motion.span>
                <span className="font-sans text-[10px]" style={{color: FUNNEL_COLOURS.muted}}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
