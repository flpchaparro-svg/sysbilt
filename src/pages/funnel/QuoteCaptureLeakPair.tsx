import React, {useEffect, useRef, useState} from 'react'
import {motion, AnimatePresence, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

const NOVEL =
  'Hi we need someone to look at our backyard. Not sure of the size. Maybe 80sqm. Soft soil. Photos attached. Budget flexible…'

const ATTACHMENTS = [
  {name: 'backyard-1.jpg', kind: 'photo'},
  {name: 'site-plan.pdf', kind: 'pdf'},
  {name: 'measurements.docx', kind: 'doc'},
] as const

const JOB_CARDS = [
  {
    id: 'soft',
    label: 'Soft landscape',
    hint: 'Turf · planting · beds',
    tint: '#1F7A4D',
    wash: 'linear-gradient(145deg, #1F7A4D 0%, #0E3D28 100%)',
  },
  {
    id: 'hard',
    label: 'Hardscape',
    hint: 'Paths · retaining · paving',
    tint: FUNNEL_COLOURS.goldDeep,
    wash: `linear-gradient(145deg, ${FUNNEL_COLOURS.goldDeep} 0%, #6B4A1A 100%)`,
  },
  {
    id: 'mix',
    label: 'Mix of both',
    hint: 'Soft + hard together',
    tint: FUNNEL_COLOURS.ink,
    wash: `linear-gradient(145deg, ${FUNNEL_COLOURS.ink} 0%, #1a2a3d 100%)`,
  },
] as const

/** Leak: messy novel-form vs click-and-go image cards. */
export function QuoteCaptureLeakPair() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.25})
  const reduce = useReducedMotion()
  const go = Boolean(inView)

  const [typed, setTyped] = useState(reduce ? NOVEL.slice(0, 48) + '…' : '')
  const [attachN, setAttachN] = useState(reduce ? ATTACHMENTS.length : 0)
  const [abandoned, setAbandoned] = useState(false)
  const [cardI, setCardI] = useState(0)
  const [picked, setPicked] = useState(false)
  const [showTotal, setShowTotal] = useState(false)

  useEffect(() => {
    if (!go || reduce) {
      if (reduce) {
        setAbandoned(true)
        setPicked(true)
        setShowTotal(true)
      }
      return
    }

    let cancelled = false
    const timers: number[] = []

    const loop = () => {
      if (cancelled) return
      setTyped('')
      setAttachN(0)
      setAbandoned(false)
      setCardI(0)
      setPicked(false)
      setShowTotal(false)

      let i = 0
      const typeId = window.setInterval(() => {
        if (cancelled) return
        i += 1
        setTyped(NOVEL.slice(0, i))
        if (i >= NOVEL.length) window.clearInterval(typeId)
      }, 18)
      timers.push(typeId)

      ATTACHMENTS.forEach((_, idx) => {
        timers.push(
          window.setTimeout(() => {
            if (!cancelled) setAttachN(idx + 1)
          }, 900 + idx * 550),
        )
      })

      timers.push(
        window.setTimeout(() => {
          if (!cancelled) setAbandoned(true)
        }, 3200),
      )

      // Right side: swipe through cards, then pick, then total
      JOB_CARDS.forEach((_, idx) => {
        timers.push(
          window.setTimeout(() => {
            if (!cancelled) setCardI(idx)
          }, 400 + idx * 900),
        )
      })
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) {
            setPicked(true)
            setCardI(1)
          }
        }, 400 + JOB_CARDS.length * 900),
      )
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) setShowTotal(true)
        }, 400 + JOB_CARDS.length * 900 + 700),
      )

      // Replay
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) loop()
        }, 7800),
      )
    }

    loop()
    return () => {
      cancelled = true
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [go, reduce])

  return (
    <motion.div
      ref={ref}
      className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 md:items-stretch"
      initial={reduce ? false : {opacity: 0, y: 22}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.3}}
      transition={{duration: 0.55, ease: EASE}}
    >
      {/* OLD: cluttered contact form — fixed height */}
      <div
        className="rounded-xl overflow-hidden border relative flex flex-col h-[320px] md:h-[340px]"
        style={{borderColor: `${FUNNEL_COLOURS.accent}55`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.2em] shrink-0"
          style={{color: FUNNEL_COLOURS.accent}}
        >
          The old form
        </div>
        <div className="p-4 md:p-5 flex-1 flex flex-col gap-2.5 relative overflow-hidden min-h-0">
          <FakeField label="Name" value="…" muted />
          <FakeField label="Email" value="…" muted />
          <div
            className="rounded-lg border px-3 py-2.5 h-[96px] shrink-0 overflow-hidden"
            style={{borderColor: `${FUNNEL_COLOURS.accent}50`, backgroundColor: `${FUNNEL_COLOURS.accent}08`}}
          >
            <p className="font-mono text-[7px] uppercase tracking-wide mb-1.5" style={{color: FUNNEL_COLOURS.accent}}>
              Tell us about your job
            </p>
            <p className="font-sans text-[11px] leading-snug line-clamp-4" style={{color: FUNNEL_COLOURS.ink}}>
              {typed}
              {!abandoned && !reduce ? (
                <motion.span
                  className="inline-block w-[2px] h-[11px] ml-0.5 align-middle"
                  style={{backgroundColor: FUNNEL_COLOURS.accent}}
                  animate={{opacity: [1, 0, 1]}}
                  transition={{duration: 0.8, repeat: Infinity}}
                />
              ) : null}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 h-[28px] shrink-0 content-start overflow-hidden">
            <AnimatePresence>
              {ATTACHMENTS.slice(0, attachN).map((file, i) => (
                <motion.span
                  key={file.name}
                  className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[8px] font-bold"
                  style={{
                    borderColor: `${FUNNEL_COLOURS.accent}45`,
                    backgroundColor: '#fff',
                    color: FUNNEL_COLOURS.ink,
                  }}
                  initial={reduce ? false : {opacity: 0, y: 8, rotate: -4}}
                  animate={{opacity: 1, y: 0, rotate: i % 2 === 0 ? -2 : 3}}
                  exit={{opacity: 0}}
                  transition={{type: 'spring', stiffness: 380, damping: 20}}
                >
                  <PaperclipIcon />
                  {file.name}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {abandoned ? (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{backgroundColor: 'rgba(255,242,236,0.88)'}}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
              >
                <motion.p
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-center px-4"
                  style={{color: FUNNEL_COLOURS.accent}}
                  initial={reduce ? false : {y: 8}}
                  animate={{y: 0}}
                >
                  Tab closed. Buyer gone.
                </motion.p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em] shrink-0"
          style={{color: FUNNEL_COLOURS.accent, backgroundColor: `${FUNNEL_COLOURS.accent}10`}}
        >
          Write a novel. Attach everything. Leave.
        </div>
      </div>

      {/* NEW: click-and-go cards — same fixed height */}
      <div
        className="rounded-xl overflow-hidden border flex flex-col h-[320px] md:h-[340px]"
        style={{borderColor: `${FUNNEL_COLOURS.goldDeep}55`, backgroundColor: FUNNEL_COLOURS.surface}}
      >
        <div className="px-3 py-2 flex items-center justify-between shrink-0">
          <span
            className="font-mono text-[8px] font-bold uppercase tracking-[0.2em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Quote Capture
          </span>
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{backgroundColor: '#1F7A4D'}}
            animate={go && !reduce ? {opacity: [0.45, 1, 0.45]} : {opacity: 0.7}}
            transition={{duration: 1.6, repeat: Infinity, ease: 'easeInOut'}}
          />
        </div>

        <div className="p-4 md:p-5 flex-1 flex flex-col relative min-h-0 overflow-hidden">
          <p
            className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] mb-3 shrink-0"
            style={{color: FUNNEL_COLOURS.steel}}
          >
            Pick what you need. Tap. Go.
          </p>

          <div className="relative flex-1 min-h-0">
            <AnimatePresence initial={false}>
              {!showTotal ? (
                <motion.div
                  key="deck"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.25}}
                >
                  <div className="relative w-full max-w-[220px] h-[168px]">
                    {JOB_CARDS.map((card, idx) => {
                      const offset = idx - cardI
                      const visible = Math.abs(offset) <= 1 || (picked && idx === cardI)
                      if (!visible && !reduce) return null
                      const isTop = idx === cardI
                      return (
                        <motion.div
                          key={card.id}
                          className="absolute inset-x-0 top-0 rounded-2xl overflow-hidden shadow-[0_12px_28px_-12px_rgba(14,28,47,0.45)]"
                          style={{
                            height: 168,
                            background: card.wash,
                            zIndex: JOB_CARDS.length - Math.abs(offset),
                          }}
                          initial={false}
                          animate={
                            picked && isTop
                              ? {x: 0, y: 0, scale: 1, rotate: 0, opacity: 1}
                              : {
                                  x: offset * 14,
                                  y: Math.abs(offset) * 10,
                                  scale: 1 - Math.abs(offset) * 0.06,
                                  rotate: offset * -4,
                                  opacity: isTop ? 1 : 0.55,
                                }
                          }
                          transition={{type: 'spring', stiffness: 320, damping: 24}}
                        >
                          <CardFace card={card} picked={picked && isTop} />
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="total"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                  initial={reduce ? false : {opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.25}}
                >
                  <div
                    className="w-full max-w-[240px] rounded-xl border px-4 py-4 text-center"
                    style={{borderColor: `${FUNNEL_COLOURS.goldDeep}40`, backgroundColor: '#fff'}}
                  >
                    <p
                      className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] mb-2"
                      style={{color: FUNNEL_COLOURS.goldDeep}}
                    >
                      Quotation
                    </p>
                    <p className="font-serif text-2xl font-bold tabular-nums" style={{color: FUNNEL_COLOURS.ink}}>
                      $4,280
                    </p>
                    <p className="font-mono text-[9px] mt-1" style={{color: FUNNEL_COLOURS.steel}}>
                      Scope · one total · pay link
                    </p>
                  </div>
                  <div
                    className="rounded-full px-4 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-white"
                    style={{backgroundColor: '#1F7A4D'}}
                  >
                    Pay link ready
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div
          className="px-3 py-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em] shrink-0"
          style={{color: FUNNEL_COLOURS.goldDeep, backgroundColor: `${FUNNEL_COLOURS.goldDeep}12`}}
        >
          Click. Quote. Priced lead.
        </div>
      </div>
    </motion.div>
  )
}

function FakeField({label, value, muted}: {label: string; value: string; muted?: boolean}) {
  return (
    <div
      className="rounded-lg border px-3 py-2 flex items-center justify-between gap-2"
      style={{
        borderColor: muted ? `${FUNNEL_COLOURS.ink}18` : `${FUNNEL_COLOURS.accent}45`,
        backgroundColor: '#fff',
      }}
    >
      <div>
        <p className="font-mono text-[7px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.steel}}>
          {label}
        </p>
        <p className="font-sans text-[11px] font-semibold" style={{color: `${FUNNEL_COLOURS.ink}55`}}>
          {value}
        </p>
      </div>
    </div>
  )
}

function CardFace({
  card,
  picked,
}: {
  card: (typeof JOB_CARDS)[number]
  picked: boolean
}) {
  return (
    <div className="h-full w-full p-4 flex flex-col justify-between text-white relative">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.35) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.25) 0%, transparent 50%)',
        }}
        aria-hidden
      />
      <div className="relative">
        <p className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white/70">Job type</p>
        <p className="font-serif text-xl font-bold mt-1 leading-tight">{card.label}</p>
        <p className="font-mono text-[9px] mt-1 text-white/75">{card.hint}</p>
      </div>
      <div className="relative flex items-center justify-between">
        <span className="font-mono text-[8px] font-bold uppercase tracking-wide text-white/60">Tap to choose</span>
        <AnimatePresence>
          {picked ? (
            <motion.span
              className="rounded-full bg-white/95 px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-wide"
              style={{color: card.tint}}
              initial={{scale: 0.6, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
            >
              Selected
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}

function PaperclipIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M10.5 4.5l-4.8 4.8a2 2 0 002.8 2.8l5.2-5.2a3.2 3.2 0 00-4.5-4.5L3.5 8.1a4.4 4.4 0 006.2 6.2l4.1-4.1"
        stroke={FUNNEL_COLOURS.accent}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
