import React, {useEffect, useRef, useState} from 'react'
import {motion, AnimatePresence, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const FACES = [
  {
    id: 'wizard',
    kicker: '01 · Wizard',
    title: 'Plain questions',
    scene: 'wizard' as const,
  },
  {
    id: 'card',
    kicker: '02 · Rate card',
    title: 'Your prices only',
    scene: 'lock' as const,
  },
  {
    id: 'quote',
    kicker: '03 · Quotation',
    title: 'One total on screen',
    scene: 'quote' as const,
  },
  {
    id: 'send',
    kicker: '04 · Leaves with them',
    title: 'PDF · email · SMS',
    scene: 'send' as const,
  },
  {
    id: 'alert',
    kicker: '05 · You',
    title: 'Priced lead ready',
    scene: 'alert' as const,
  },
]

/** Investment column: large flipping “what ships” card, not a tiny checklist. */
export function QuoteCaptureDeliverableMock() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    const id = window.setInterval(() => {
      setI((prev) => (prev + 1) % FACES.length)
    }, 2600)
    return () => window.clearInterval(id)
  }, [inView, reduce])

  const face = FACES[reduce ? 2 : i]

  return (
    <motion.div
      ref={ref}
      className="w-full h-full min-h-[340px] md:min-h-[420px] flex flex-col"
      initial={reduce ? false : {opacity: 0, y: 16, scale: 0.98}}
      whileInView={{opacity: 1, y: 0, scale: 1}}
      viewport={{once: true, amount: 0.35}}
      transition={{type: 'spring', stiffness: 300, damping: 22}}
      style={{perspective: 1200}}
    >
      <div
        className="flex-1 rounded-2xl overflow-hidden border flex flex-col shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]"
        style={{borderColor: `${FUNNEL_COLOURS.onInk}22`, backgroundColor: '#fff'}}
      >
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
        >
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]">
            Once it ships
          </span>
          <span className="font-mono text-[9px] tabular-nums" style={{color: `${FUNNEL_COLOURS.onInk}70`}}>
            {String((reduce ? 3 : i) + 1).padStart(2, '0')} / {String(FACES.length).padStart(2, '0')}
          </span>
        </div>

        <div className="relative flex-1 min-h-[260px] md:min-h-[320px] p-5 md:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={face.id}
              className="absolute inset-5 md:inset-6 flex flex-col"
              initial={reduce ? false : {rotateY: 75, opacity: 0, scale: 0.94}}
              animate={{rotateY: 0, opacity: 1, scale: 1}}
              exit={{rotateY: -75, opacity: 0, scale: 0.94}}
              transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
              style={{transformStyle: 'preserve-3d', backfaceVisibility: 'hidden'}}
            >
              <p
                className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
                style={{color: FUNNEL_COLOURS.goldDeep}}
              >
                {face.kicker}
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-5" style={{color: FUNNEL_COLOURS.ink}}>
                {face.title}
              </h3>
              <div className="flex-1 flex items-center justify-center">
                <FaceScene scene={face.scene} reduce={!!reduce} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className="px-5 py-3 flex items-center justify-center gap-2"
          style={{borderTop: `1px solid ${FUNNEL_COLOURS.ink}12`}}
        >
          {FACES.map((f, idx) => (
            <button
              key={f.id}
              type="button"
              aria-label={f.title}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: idx === (reduce ? 2 : i) ? 22 : 8,
                backgroundColor:
                  idx === (reduce ? 2 : i) ? FUNNEL_COLOURS.accent : `${FUNNEL_COLOURS.ink}22`,
              }}
              onClick={() => setI(idx)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function FaceScene({scene, reduce}: {scene: (typeof FACES)[number]['scene']; reduce: boolean}) {
  if (scene === 'wizard') {
    const steps = ['Job', 'Size', 'Finish', 'Total']
    return (
      <div className="w-full flex gap-2">
        {steps.map((s, idx) => (
          <motion.div
            key={s}
            className="flex-1 rounded-xl py-4 text-center"
            style={{backgroundColor: idx < 3 ? '#1F7A4D' : FUNNEL_COLOURS.ink}}
            initial={reduce ? false : {opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: idx * 0.08}}
          >
            <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-white">{s}</span>
          </motion.div>
        ))}
      </div>
    )
  }

  if (scene === 'lock') {
    return (
      <div
        className="w-full rounded-2xl px-5 py-8 text-center"
        style={{backgroundColor: FUNNEL_COLOURS.ink}}
      >
        <motion.div
          className="mx-auto mb-3 h-12 w-12 rounded-full border-2 flex items-center justify-center"
          style={{borderColor: FUNNEL_COLOURS.goldLight}}
          animate={reduce ? undefined : {rotate: [0, -10, 10, 0]}}
          transition={{duration: 2.2, repeat: Infinity, ease: 'easeInOut'}}
        >
          <span className="font-mono text-lg font-bold" style={{color: FUNNEL_COLOURS.goldLight}}>
            ¤
          </span>
        </motion.div>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em]" style={{color: FUNNEL_COLOURS.onInk}}>
          Rate card locked
        </p>
        <p className="font-mono text-[9px] mt-1" style={{color: `${FUNNEL_COLOURS.onInk}70`}}>
          No invented fees
        </p>
      </div>
    )
  }

  if (scene === 'quote') {
    return (
      <div className="w-full rounded-2xl border px-5 py-5" style={{borderColor: `${FUNNEL_COLOURS.ink}14`}}>
        <div className="flex items-end justify-between gap-3 mb-4">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.steel}}>
              Soft landscape · 48 m²
            </p>
            <p className="font-sans text-sm font-semibold mt-1" style={{color: FUNNEL_COLOURS.ink}}>
              Scope of works
            </p>
          </div>
          <motion.p
            className="font-serif text-4xl font-bold tabular-nums leading-none"
            style={{color: FUNNEL_COLOURS.ink}}
            initial={reduce ? false : {scale: 0.85, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            transition={{type: 'spring', stiffness: 340}}
          >
            $4,280
          </motion.p>
        </div>
        <div className="space-y-1.5">
          {['Turf supply & lay', 'Garden bed prep'].map((line) => (
            <div
              key={line}
              className="flex justify-between border-b pb-1"
              style={{borderColor: `${FUNNEL_COLOURS.ink}10`}}
            >
              <span className="font-mono text-[10px]" style={{color: FUNNEL_COLOURS.steel}}>
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (scene === 'send') {
    return (
      <div className="relative w-full h-[120px] flex items-center justify-center">
        {[
          {label: 'PDF', rot: -10, x: -36},
          {label: 'Email', rot: 0, x: 0},
          {label: 'SMS', rot: 10, x: 36},
        ].map((ch, idx) => (
          <motion.div
            key={ch.label}
            className="absolute w-[88px] h-[100px] rounded-lg border bg-white shadow-[0_14px_30px_-16px_rgba(14,28,47,0.45)] flex flex-col items-center justify-center"
            style={{borderColor: `${FUNNEL_COLOURS.ink}16`, zIndex: 3 - idx}}
            initial={reduce ? false : {opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0, rotate: ch.rot, x: ch.x}}
            transition={{delay: idx * 0.1, type: 'spring', stiffness: 280}}
          >
            <span className="font-mono text-sm font-bold" style={{color: '#1F7A4D'}}>
              {ch.label}
            </span>
            <span className="font-mono text-[8px] mt-1 uppercase tracking-wide" style={{color: FUNNEL_COLOURS.steel}}>
              + pay link
            </span>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full rounded-2xl px-4 py-5"
      style={{background: `linear-gradient(180deg, ${FUNNEL_COLOURS.ink} 0%, #1a2a3d 100%)`}}
    >
      <motion.div
        className="rounded-xl px-4 py-3"
        style={{backgroundColor: FUNNEL_COLOURS.onInk}}
        initial={reduce ? false : {y: 18, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{type: 'spring', stiffness: 320}}
      >
        <div className="flex items-start gap-2">
          <motion.span
            className="mt-1 h-2.5 w-2.5 rounded-full shrink-0"
            style={{backgroundColor: FUNNEL_COLOURS.accent}}
            animate={reduce ? undefined : {scale: [1, 1.3, 1]}}
            transition={{duration: 1.2, repeat: Infinity}}
          />
          <div>
            <p className="font-mono text-[8px] font-bold uppercase tracking-wide" style={{color: FUNNEL_COLOURS.steel}}>
              Now
            </p>
            <p className="font-sans text-sm font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              New priced lead · $4,280
            </p>
            <p className="font-mono text-[9px] mt-0.5" style={{color: FUNNEL_COLOURS.steel}}>
              Bondi · pay link sent · call while warm
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
