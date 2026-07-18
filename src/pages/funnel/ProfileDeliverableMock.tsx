import React from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Google panel proof mock for the price band — fields fill on scroll.
 */
export function ProfileDeliverableMock() {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const play = reduce || inView

  const fields = [
    {label: 'Hours', value: 'Open today'},
    {label: 'Services', value: 'Filled'},
    {label: 'Photos', value: 'Live'},
    {label: 'Reviews', value: 'Link ready'},
  ]

  return (
    <div ref={ref} className="relative w-full max-w-md mx-auto md:mx-0 md:ml-auto">
      <motion.div
        className="border overflow-hidden"
        style={{
          borderColor: `${FUNNEL_COLOURS.gold}55`,
          backgroundColor: FUNNEL_COLOURS.surface,
        }}
        initial={reduce ? false : {opacity: 0, y: 18}}
        animate={play ? {opacity: 1, y: 0} : {opacity: 0, y: 18}}
        transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
      >
        <div
          className="px-5 py-3 border-b flex items-center justify-between"
          style={{borderColor: `${FUNNEL_COLOURS.ink}12`}}
        >
          <p
            className="font-mono text-[9px] uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.steel}}
          >
            Google · Business Profile
          </p>
          <motion.span
            className="font-mono text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5"
            style={{backgroundColor: `${FUNNEL_COLOURS.gold}22`, color: FUNNEL_COLOURS.goldDeep}}
            animate={play && !reduce ? {scale: [1, 1.06, 1]} : {scale: 1}}
            transition={play && !reduce ? {duration: 0.6, delay: 0.8} : {duration: 0}}
          >
            After
          </motion.span>
        </div>

        <div className="p-5 md:p-6 space-y-4">
          <p className="font-serif text-lg md:text-xl" style={{color: FUNNEL_COLOURS.ink}}>
            Open · Rated · Ready to call
          </p>

          <div className="grid grid-cols-2 gap-2">
            {fields.map((field, i) => (
              <motion.div
                key={field.label}
                className="border px-2.5 py-2"
                style={{
                  borderColor: `${FUNNEL_COLOURS.ink}12`,
                  backgroundColor: FUNNEL_COLOURS.ground,
                }}
                initial={reduce ? false : {opacity: 0, y: 8}}
                animate={play ? {opacity: 1, y: 0} : {opacity: 0, y: 8}}
                transition={{delay: reduce ? 0 : 0.2 + i * 0.12, duration: 0.35}}
              >
                <p className="font-mono text-[8px] uppercase tracking-widest text-dark/45">
                  {field.label}
                </p>
                <motion.p
                  className="font-sans text-[12px] mt-0.5"
                  style={{color: FUNNEL_COLOURS.ink}}
                  initial={{opacity: 0}}
                  animate={{opacity: play ? 1 : 0}}
                  transition={{delay: reduce ? 0 : 0.45 + i * 0.12}}
                >
                  {field.value}
                </motion.p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="rounded-md border px-3 py-3"
            style={{
              borderColor: `${FUNNEL_COLOURS.gold}55`,
              backgroundColor: `${FUNNEL_COLOURS.gold}12`,
            }}
            initial={reduce ? false : {opacity: 0, y: 8}}
            animate={play ? {opacity: 1, y: 0} : {opacity: 0, y: 8}}
            transition={{delay: reduce ? 0 : 0.85, duration: 0.4}}
          >
            <p
              className="font-mono text-[8px] uppercase tracking-widest mb-1"
              style={{color: FUNNEL_COLOURS.goldDeep}}
            >
              Review link
            </p>
            <p className="font-sans text-sm" style={{color: FUNNEL_COLOURS.ink}}>
              Ready to send. Honest ask. No fake reviews.
            </p>
          </motion.div>

          <p className="font-sans text-xs" style={{color: FUNNEL_COLOURS.muted}}>
            Ownership stays on your Google account.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
