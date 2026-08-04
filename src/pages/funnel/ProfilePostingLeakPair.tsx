import React, {useEffect, useRef, useState} from 'react'
import {AnimatePresence, motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const POST_TONES = [
  `${FUNNEL_COLOURS.gold}55`,
  `${FUNNEL_COLOURS.goldDeep}40`,
  FUNNEL_COLOURS.mockFill,
]

/** One solid post row in the Alive feed. */
function AlivePostRow({tone}: {tone: string}) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-lg border px-2.5 py-2 w-full"
      style={{borderColor: FUNNEL_COLOURS.mockBorder, backgroundColor: '#fff'}}
    >
      <div className="h-7 w-7 rounded-md shrink-0" style={{backgroundColor: tone}} />
      <div className="flex-1 space-y-1.5 min-w-0">
        <div className="h-1.5 w-4/5 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockBar}} />
        <div className="h-1.5 w-1/2 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
      </div>
      <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{backgroundColor: '#1F7A4D'}} />
    </div>
  )
}

/**
 * Leak: Quiet stays empty and still. Alive shows posts arriving from the right
 * and sliding left like a publishing feed. Almost no words.
 */
export function ProfilePostingLeakPair() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.3})
  const reduce = useReducedMotion()
  const go = !reduce && inView

  return (
    <motion.div
      ref={ref}
      className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
      initial={reduce ? false : {opacity: 0, y: 22}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.35}}
      transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
    >
      <div
        className="rounded-xl overflow-hidden border"
        style={{borderColor: `${FUNNEL_COLOURS.accent}40`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div className="px-3 py-2 flex items-center justify-between">
          <span
            className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.accent}}
          >
            Quiet
          </span>
          <div className="flex items-center gap-1">
            {Array.from({length: 3}).map((_, i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-full"
                style={{backgroundColor: FUNNEL_COLOURS.mockBar}}
              />
            ))}
          </div>
        </div>
        <div className="px-4 md:px-5 pb-4 md:pb-5 space-y-2.5">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="h-8 w-8 rounded-md border border-dashed shrink-0"
              style={{borderColor: FUNNEL_COLOURS.mockBorder, backgroundColor: FUNNEL_COLOURS.mockWash}}
            />
            <div className="flex-1 space-y-1.5">
              <div className="h-2 w-2/5 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockBar}} />
              <div className="h-1.5 w-1/4 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
            </div>
          </div>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-9 rounded-lg border border-dashed"
              style={{
                borderColor: FUNNEL_COLOURS.mockBorder,
                backgroundColor: FUNNEL_COLOURS.mockWash,
                opacity: 1 - i * 0.08,
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="rounded-xl overflow-hidden border"
        style={{
          borderColor: `${FUNNEL_COLOURS.goldDeep}55`,
          backgroundColor: FUNNEL_COLOURS.surface,
        }}
      >
        <div className="px-3 py-2 flex items-center justify-between">
          <span
            className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Alive
          </span>
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{backgroundColor: '#1F7A4D'}}
            animate={go ? {opacity: [0.55, 1, 0.55], scale: [1, 1.25, 1]} : {opacity: 0.85}}
            transition={{duration: 1.2, repeat: Infinity, ease: 'easeInOut'}}
          />
        </div>

        <div className="px-4 md:px-5 pb-4 md:pb-5 h-[148px] overflow-hidden">
          {go ? (
            <AlivePublishingFeed />
          ) : (
            <div className="space-y-2 pt-0.5">
              {POST_TONES.map((tone, i) => (
                <AlivePostRow key={i} tone={tone} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/** New post slides in from the right; oldest exits left. Stack shifts down. */
function AlivePublishingFeed() {
  const [seq, setSeq] = useState(3)
  const ids = [seq, seq - 1, seq - 2]

  useEffect(() => {
    const id = window.setInterval(() => setSeq((n) => n + 1), 1700)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="relative flex flex-col gap-2 pt-0.5 h-full overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        {ids.map((id) => (
          <motion.div
            key={id}
            layout
            initial={{x: 72, opacity: 0, scale: 0.96}}
            animate={{x: 0, opacity: 1, scale: 1}}
            exit={{x: -80, opacity: 0, scale: 0.96}}
            transition={{
              layout: {duration: 0.45, ease: [0.22, 1, 0.36, 1]},
              x: {duration: 0.5, ease: [0.22, 1, 0.36, 1]},
              opacity: {duration: 0.35},
              scale: {duration: 0.4},
            }}
          >
            <AlivePostRow tone={POST_TONES[Math.abs(id) % POST_TONES.length]} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
