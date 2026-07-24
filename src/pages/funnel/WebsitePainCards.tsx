import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const CARDS = [
  {n: '01', title: 'They find you', text: 'Maps, ads, word of mouth. The trail starts.'},
  {n: '02', title: 'The door does not open', text: 'No site, or a site that fails in seconds.'},
  {n: '03', title: 'They pick the next one', text: 'The work you already won walks next door.'},
]

export function WebsitePainCards() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.25})
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-8 md:mb-10"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {transition: {staggerChildren: 0.12}},
      }}
    >
      {CARDS.map((c) => (
        <motion.div
          key={c.n}
          className="rounded-sm border p-5 md:p-6"
          style={{
            borderColor: `${FUNNEL_COLOURS.onInk}18`,
            backgroundColor: 'rgba(255,242,236,0.04)',
          }}
          variants={{
            hidden: {opacity: 0, y: reduce ? 0 : 20},
            visible: {
              opacity: 1,
              y: 0,
              transition: {duration: 0.45, ease: [0.16, 1, 0.3, 1]},
            },
          }}
        >
          <p
            className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
            style={{color: `${FUNNEL_COLOURS.onInk}55`}}
          >
            {c.n}
          </p>
          <p className="font-serif font-bold text-xl tracking-tight" style={{color: FUNNEL_COLOURS.onInk}}>
            {c.title}
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed" style={{color: `${FUNNEL_COLOURS.onInk}A8`}}>
            {c.text}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}
