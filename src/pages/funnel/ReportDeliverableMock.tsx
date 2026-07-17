import React from 'react'
import {motion, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Before/after report email mock — the artefact they buy.
 * Replaces stock “team” photography in the price band.
 */
export function ReportDeliverableMock() {
  const reduce = useReducedMotion()

  return (
    <div className="relative min-h-[320px] md:min-h-full flex items-center">
      <motion.div
        className="w-full border overflow-hidden"
        style={{
          borderColor: `${FUNNEL_COLOURS.onInk}22`,
          backgroundColor: FUNNEL_COLOURS.surface,
          boxShadow: `10px 14px 0 0 ${FUNNEL_COLOURS.ink}55`,
        }}
        initial={reduce ? false : {opacity: 0, y: 20, rotate: -1.5}}
        whileInView={{opacity: 1, y: 0, rotate: -0.5}}
        viewport={{once: true, amount: 0.4}}
        transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
      >
        {/* Email chrome */}
        <div
          className="px-4 py-3 border-b flex items-center gap-2"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}14`,
            backgroundColor: FUNNEL_COLOURS.ground,
          }}
        >
          <span className="h-2 w-2 rounded-full bg-red-solid/80" />
          <span className="h-2 w-2 rounded-full" style={{backgroundColor: FUNNEL_COLOURS.gold}} />
          <span className="h-2 w-2 rounded-full bg-dark/20" />
          <span
            className="ml-2 font-mono text-[9px] uppercase tracking-[0.16em] truncate"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            Inbox · Before &amp; after report
          </span>
        </div>

        <div className="p-5 md:p-6">
          <p
            className="font-mono text-[9px] uppercase tracking-[0.2em] mb-1"
            style={{color: FUNNEL_COLOURS.steel}}
          >
            From SYSBILT
          </p>
          <p
            className="font-serif text-lg md:text-xl mb-5"
            style={{color: FUNNEL_COLOURS.ink}}
          >
            Your speed report is ready
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1.5 font-mono text-[9px] uppercase tracking-[0.14em]">
                <span style={{color: FUNNEL_COLOURS.accent}}>Before</span>
                <span style={{color: FUNNEL_COLOURS.accent}}>34 · Poor</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden" style={{backgroundColor: `${FUNNEL_COLOURS.ink}10`}}>
                <motion.div
                  className="h-full"
                  style={{backgroundColor: FUNNEL_COLOURS.accent}}
                  initial={{width: '0%'}}
                  whileInView={{width: '34%'}}
                  viewport={{once: true}}
                  transition={reduce ? {duration: 0} : {duration: 0.9, ease: 'easeOut'}}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1.5 font-mono text-[9px] uppercase tracking-[0.14em]">
                <span style={{color: '#0D9488'}}>After</span>
                <span style={{color: '#0D9488'}}>90+ · Good</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden" style={{backgroundColor: `${FUNNEL_COLOURS.ink}10`}}>
                <motion.div
                  className="h-full bg-teal"
                  initial={{width: '0%'}}
                  whileInView={{width: '90%'}}
                  viewport={{once: true}}
                  transition={
                    reduce ? {duration: 0} : {duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1]}
                  }
                />
              </div>
            </div>
          </div>

          <p
            className="mt-6 font-sans text-sm leading-relaxed"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            Same public Google test. Side by side. The proof lands in your inbox.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
