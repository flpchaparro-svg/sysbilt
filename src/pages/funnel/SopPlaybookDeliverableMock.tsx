import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const STEPS = [
  {label: 'SOP written', detail: 'Plain steps for scoped jobs'},
  {label: 'Prompt pack', detail: 'Tied to those steps'},
  {label: 'Quality checks', detail: 'What must be true before send'},
  {label: 'Owner map', detail: 'Who maintains the playbook'},
]

/** Once it ships: SOP, prompts, checks, owner. */
export function SopPlaybookDeliverableMock() {
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
          className="px-4 py-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
          style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
        >
          Once it ships
        </div>
        <div className="p-5 space-y-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              className="flex items-center gap-3"
              initial={reduce ? false : {opacity: 0, x: -10}}
              animate={go ? {opacity: 1, x: 0} : {opacity: 0.5, x: 0}}
              transition={{delay: reduce ? 0 : 0.1 + i * 0.12, type: 'spring', stiffness: 360}}
            >
              <motion.span
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{backgroundColor: '#1F7A4D'}}
                animate={
                  go
                    ? {
                        scale: [1, 1.35, 1],
                        boxShadow: [
                          '0 0 0 0 rgba(31,122,77,0)',
                          '0 0 0 4px rgba(31,122,77,0.25)',
                          '0 0 0 0 rgba(31,122,77,0)',
                        ],
                      }
                    : undefined
                }
                transition={{duration: 1.4, repeat: Infinity, delay: i * 0.28}}
              />
              <div className="min-w-0">
                <p className="font-sans text-sm font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
                  {step.label}
                </p>
                <p
                  className="font-mono text-[9px] uppercase tracking-wider"
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
