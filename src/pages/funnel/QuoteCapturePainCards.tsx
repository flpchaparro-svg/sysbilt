import React, {useEffect, useRef, useState} from 'react'
import {motion, AnimatePresence, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

function Card({
  index,
  title,
  caption,
  children,
}: {
  index: string
  title: string
  caption: string
  children: (opts: {play: boolean; reduce: boolean | null}) => React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.3})
  const reduce = useReducedMotion()
  const play = Boolean(inView && !reduce)

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl p-5 md:p-6 border flex flex-col"
      style={{
        borderColor: `${FUNNEL_COLOURS.ink}12`,
        backgroundColor: FUNNEL_COLOURS.surface,
      }}
      initial={reduce ? false : {opacity: 0, y: 20, scale: 0.98}}
      whileInView={{opacity: 1, y: 0, scale: 1}}
      viewport={{once: true, amount: 0.25}}
      transition={{type: 'spring', stiffness: 280, damping: 22}}
    >
      <p
        className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
        style={{color: FUNNEL_COLOURS.goldDeep}}
      >
        {index}
      </p>
      <h3 className="font-serif text-xl font-bold mb-2" style={{color: FUNNEL_COLOURS.ink}}>
        {title}
      </h3>
      <p className="font-sans text-[13px] leading-snug mb-5" style={{color: FUNNEL_COLOURS.steel}}>
        {caption}
      </p>
      <div className="mt-auto min-h-[148px] flex flex-col justify-center">{children({play, reduce})}</div>
    </motion.div>
  )
}

/** Pain: four readable mini-scenes, not abstract bars. */
export function QuoteCapturePainCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      <Card
        index="01"
        title="Paid clicks die in a blank box"
        caption="They paid for the visit. The form asked them to write a novel. They left."
      >
        {({play, reduce}) => <AdBounceScene play={play} reduce={reduce} />}
      </Card>

      <Card
        index="02"
        title="Need a quote please"
        caption="Three emails later you still don't know the size, the access, or the suburb."
      >
        {({play, reduce}) => <EmailThreadScene play={play} reduce={reduce} />}
      </Card>

      <Card
        index="03"
        title="You quote at night for people who won't say their budget"
        caption="Kitchen table, 9pm. You are estimating for free. They have not said a number."
      >
        {({play, reduce}) => <NightQuoteScene play={play} reduce={reduce} />}
      </Card>

      <Card
        index="04"
        title="The fastest clear number wins"
        caption="Someone else sent a total. You are still asking questions."
      >
        {({play, reduce}) => <RaceScene play={play} reduce={reduce} />}
      </Card>
    </div>
  )
}

function AdBounceScene({play, reduce}: {play: boolean; reduce: boolean | null}) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!play) {
      if (reduce) setStep(2)
      return
    }
    let cancelled = false
    const timers: number[] = []
    const loop = () => {
      if (cancelled) return
      setStep(0)
      timers.push(window.setTimeout(() => !cancelled && setStep(1), 900))
      timers.push(window.setTimeout(() => !cancelled && setStep(2), 2000))
      timers.push(window.setTimeout(() => !cancelled && loop(), 4200))
    }
    loop()
    return () => {
      cancelled = true
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [play, reduce])

  return (
    <div className="relative rounded-xl border overflow-hidden" style={{borderColor: `${FUNNEL_COLOURS.ink}14`}}>
      <div
        className="px-2.5 py-1.5 flex items-center gap-1.5"
        style={{backgroundColor: `${FUNNEL_COLOURS.ink}10`}}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: FUNNEL_COLOURS.accent}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: FUNNEL_COLOURS.gold}} />
        <span className="font-mono text-[7px] uppercase tracking-wide ml-1" style={{color: FUNNEL_COLOURS.steel}}>
          yoursite.com/contact
        </span>
      </div>
      <div className="p-3 bg-white min-h-[112px] relative">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="ad"
              className="flex flex-col items-center justify-center gap-2 py-3"
              initial={{opacity: 0, y: 6}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -6}}
            >
              <span
                className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] px-2 py-0.5 rounded"
                style={{backgroundColor: `${FUNNEL_COLOURS.goldDeep}18`, color: FUNNEL_COLOURS.goldDeep}}
              >
                Paid ad click
              </span>
              <p className="font-sans text-[12px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
                Ready to spend
              </p>
            </motion.div>
          ) : step === 1 ? (
            <motion.div
              key="form"
              className="space-y-1.5"
              initial={{opacity: 0, y: 6}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0}}
            >
              <div className="h-2 rounded w-1/3" style={{backgroundColor: `${FUNNEL_COLOURS.ink}18`}} />
              <div className="h-2 rounded w-2/5" style={{backgroundColor: `${FUNNEL_COLOURS.ink}14`}} />
              <div
                className="h-10 rounded border border-dashed flex items-center px-2"
                style={{borderColor: `${FUNNEL_COLOURS.accent}50`}}
              >
                <p className="font-mono text-[8px]" style={{color: FUNNEL_COLOURS.accent}}>
                  Tell us about your job…
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="bounce"
              className="flex flex-col items-center justify-center gap-1 py-4"
              initial={{opacity: 0, scale: 0.96}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0}}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]" style={{color: FUNNEL_COLOURS.accent}}>
                Tab closed
              </p>
              <p className="font-sans text-[12px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
                Click money gone
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function EmailThreadScene({play, reduce}: {play: boolean; reduce: boolean | null}) {
  const emails = [
    {from: 'Buyer', body: 'Need a quote please', day: 'Mon'},
    {from: 'You', body: 'Sure. What size is the area?', day: 'Tue'},
    {from: 'Buyer', body: 'Not sure. Can you come look?', day: 'Wed'},
  ]
  const [n, setN] = useState(reduce ? 3 : 0)

  useEffect(() => {
    if (!play) {
      if (reduce) setN(3)
      return
    }
    let cancelled = false
    const timers: number[] = []
    const loop = () => {
      if (cancelled) return
      setN(0)
      emails.forEach((_, i) => {
        timers.push(window.setTimeout(() => !cancelled && setN(i + 1), 500 + i * 750))
      })
      timers.push(window.setTimeout(() => !cancelled && loop(), 4200))
    }
    loop()
    return () => {
      cancelled = true
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [play, reduce])

  return (
    <div className="space-y-1.5">
      {emails.map((mail, i) => {
        const show = i < n
        const you = mail.from === 'You'
        return (
          <motion.div
            key={mail.day + mail.body}
            className="rounded-lg border px-2.5 py-2"
            style={{
              borderColor: show ? `${FUNNEL_COLOURS.ink}14` : 'transparent',
              backgroundColor: you ? `${FUNNEL_COLOURS.ink}08` : `${FUNNEL_COLOURS.accent}08`,
              opacity: show ? 1 : 0.15,
            }}
            initial={false}
            animate={show ? {opacity: 1, x: 0} : {opacity: 0.15, x: you ? 4 : -4}}
            transition={{type: 'spring', stiffness: 360, damping: 24}}
          >
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: FUNNEL_COLOURS.steel}}>
                {mail.from}
              </span>
              <span className="font-mono text-[7px]" style={{color: FUNNEL_COLOURS.steel}}>
                {mail.day}
              </span>
            </div>
            <p className="font-sans text-[11px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              {mail.body}
            </p>
          </motion.div>
        )
      })}
      <p
        className="pt-1 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-center"
        style={{color: FUNNEL_COLOURS.accent}}
      >
        Still no size. Still no price.
      </p>
    </div>
  )
}

function NightQuoteScene({play, reduce}: {play: boolean; reduce: boolean | null}) {
  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{borderColor: `${FUNNEL_COLOURS.ink}20`, backgroundColor: FUNNEL_COLOURS.ink}}
    >
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="font-mono text-[8px] font-bold uppercase tracking-[0.14em]" style={{color: `${FUNNEL_COLOURS.onInk}70`}}>
          Kitchen table
        </span>
        <motion.span
          className="font-mono text-[12px] font-bold tabular-nums"
          style={{color: FUNNEL_COLOURS.goldLight}}
          animate={play ? {opacity: [0.55, 1, 0.55]} : {opacity: 1}}
          transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
        >
          9:47 pm
        </motion.span>
      </div>
      <div className="px-3 pb-3 space-y-2">
        <div
          className="rounded-lg px-3 py-2.5"
          style={{backgroundColor: `${FUNNEL_COLOURS.onInk}12`, border: `1px solid ${FUNNEL_COLOURS.onInk}18`}}
        >
          <p className="font-mono text-[7px] uppercase tracking-wide mb-1" style={{color: `${FUNNEL_COLOURS.onInk}65`}}>
            Draft quote
          </p>
          <div className="flex items-center justify-between gap-2">
            <p className="font-sans text-[12px] font-semibold" style={{color: FUNNEL_COLOURS.onInk}}>
              Soft landscape · ?
            </p>
            <motion.span
              className="font-mono text-[10px] font-bold"
              style={{color: FUNNEL_COLOURS.accent}}
              animate={play || reduce ? {opacity: [0.4, 1, 0.4]} : {opacity: 0.7}}
              transition={{duration: 1.4, repeat: Infinity}}
            >
              Budget: blank
            </motion.span>
          </div>
        </div>
        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-center" style={{color: `${FUNNEL_COLOURS.onInk}55`}}>
          Unpaid estimating. Again.
        </p>
      </div>
    </div>
  )
}

function RaceScene({play, reduce}: {play: boolean; reduce: boolean | null}) {
  const [phase, setPhase] = useState<'idle' | 'them' | 'you'>(reduce ? 'you' : 'idle')

  useEffect(() => {
    if (!play) {
      if (reduce) setPhase('you')
      return
    }
    let cancelled = false
    const timers: number[] = []
    const loop = () => {
      if (cancelled) return
      setPhase('idle')
      timers.push(window.setTimeout(() => !cancelled && setPhase('them'), 600))
      timers.push(window.setTimeout(() => !cancelled && setPhase('you'), 1600))
      timers.push(window.setTimeout(() => !cancelled && loop(), 4200))
    }
    loop()
    return () => {
      cancelled = true
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [play, reduce])

  return (
    <div className="space-y-2">
      <motion.div
        className="rounded-lg border px-3 py-2.5"
        style={{
          borderColor: `${FUNNEL_COLOURS.goldDeep}45`,
          backgroundColor: phase === 'idle' ? `${FUNNEL_COLOURS.ink}06` : `${FUNNEL_COLOURS.goldDeep}14`,
        }}
        animate={{
          x: phase === 'idle' ? -8 : 0,
          opacity: phase === 'idle' ? 0.35 : 1,
        }}
        transition={{type: 'spring', stiffness: 320, damping: 22}}
      >
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="font-mono text-[7px] font-bold uppercase tracking-wide" style={{color: FUNNEL_COLOURS.goldDeep}}>
              Competitor
            </p>
            <p className="font-sans text-[12px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
              Quotation sent
            </p>
          </div>
          <p className="font-serif text-lg font-bold tabular-nums" style={{color: FUNNEL_COLOURS.ink}}>
            $4,280
          </p>
        </div>
      </motion.div>

      <motion.div
        className="rounded-lg border border-dashed px-3 py-2.5"
        style={{borderColor: `${FUNNEL_COLOURS.accent}45`, backgroundColor: `${FUNNEL_COLOURS.accent}08`}}
        animate={{
          opacity: phase === 'you' || reduce ? 1 : 0.4,
        }}
      >
        <p className="font-mono text-[7px] font-bold uppercase tracking-wide mb-0.5" style={{color: FUNNEL_COLOURS.accent}}>
          You
        </p>
        <p className="font-sans text-[12px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
          {phase === 'you' || reduce ? 'Still asking for photos…' : 'Drafting questions…'}
        </p>
      </motion.div>
    </div>
  )
}
