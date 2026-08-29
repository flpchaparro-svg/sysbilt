import React, {useState} from 'react'
import {AnimatePresence, m, useReducedMotion} from 'framer-motion'
import {GoldRule, Kicker, StampWell} from './learnChrome'

type Branch = {id: string; label: string; note: string}

const ease = [0.16, 1, 0.3, 1] as const

function ExplainBoard({title, intro, branches}: {title: string; intro: string; branches: Branch[]}) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState<string | null>(null)
  const chosen = branches.find((b) => b.id === picked)

  function toggleHub() {
    setOpen((v) => {
      if (v) setPicked(null)
      return !v
    })
  }

  return (
    <div className="w-full">
      <Kicker>Diagram</Kicker>
      <h2 className="mt-4 font-serif text-3xl font-medium leading-tight md:text-4xl">How this works</h2>
      <GoldRule />
      <p className="mt-5 max-w-lg text-sm leading-relaxed text-dark/60">{intro}</p>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute left-2 top-2 -bottom-2 -right-2 border border-gold" aria-hidden />
        <div className="relative flex flex-col items-center overflow-visible bg-dark px-8 pb-16 pt-12 text-cream">
        <button
          type="button"
          onClick={toggleHub}
          aria-expanded={open}
          className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gold text-center text-dark shadow-[10px_10px_0_0_#8B6914]"
        >
          <m.span
            className="font-serif text-lg leading-tight"
            animate={reduce ? undefined : {scale: open ? 0.96 : 1}}
            transition={{duration: 0.35, ease}}
          >
            {title}
          </m.span>
          <span className="absolute -bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-cream font-mono text-sm text-dark">
            {open ? '-' : '+'}
          </span>
        </button>
        {!open ? (
          <p className="mt-6 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-on-dark">Tap the circle</p>
        ) : null}

        <AnimatePresence>
          {open ? (
            <m.div
              key="open"
              initial={reduce ? false : {opacity: 0, y: -12}}
              animate={{opacity: 1, y: 0}}
              exit={reduce ? undefined : {opacity: 0, y: -8}}
              transition={{duration: 0.45, ease}}
              className="flex w-full flex-col items-center pb-4"
            >
              <m.div
                className="mt-6 w-px bg-gold"
                initial={reduce ? false : {height: 0}}
                animate={{height: 36}}
                transition={{duration: 0.35, ease, delay: 0.08}}
              />
              <p className="mt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-on-dark">Now tap one</p>
              <ul className="mt-5 flex w-full justify-center gap-3">
                {branches.map((b, i) => {
                  const on = picked === b.id
                  const dim = picked != null && !on
                  return (
                    <li key={b.id}>
                      <m.button
                        type="button"
                        onClick={() => setPicked(on ? null : b.id)}
                        initial={reduce ? false : {y: -16, opacity: 0}}
                        animate={{y: 0, opacity: dim ? 0.28 : 1, scale: on ? 1.04 : 1}}
                        transition={{duration: 0.4, ease, delay: reduce ? 0 : 0.12 + i * 0.08}}
                        className={`flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full px-2 text-center font-serif text-[13px] leading-tight md:h-20 md:w-20 md:text-sm ${
                          on
                            ? 'bg-gold text-dark shadow-[6px_6px_0_0_#8B6914]'
                            : 'bg-cream/10 text-cream ring-1 ring-cream/25'
                        }`}
                      >
                        {b.label}
                      </m.button>
                    </li>
                  )
                })}
              </ul>

              <AnimatePresence mode="wait">
                {chosen ? (
                  <m.div
                    key={chosen.id}
                    initial={reduce ? false : {y: -12, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={reduce ? undefined : {y: -8, opacity: 0}}
                    transition={{duration: 0.45, ease}}
                    className="relative mt-8 w-full text-dark"
                  >
                    <div className="pointer-events-none absolute left-1.5 top-1.5 -bottom-1.5 -right-1.5 border border-gold" aria-hidden />
                    <div className="relative bg-cream-warm px-5 py-5">
                      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-on-cream">
                        / {chosen.label}
                      </p>
                      <p className="mt-3 font-serif text-lg leading-snug">{chosen.note}</p>
                    </div>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </m.div>
          ) : null}
        </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export function LessonDiagram({kind}: {kind?: LessonDiagramKind | null}) {
  if (kind === 'pile') {
    return (
      <ExplainBoard
        title="The pile"
        intro="The pile is the same job coming back. Tap the circle, then tap a part."
        branches={[
          {id: 'repeat', label: 'Twice', note: 'Repeats are the start of the pile. One question twice is enough to write the steps down.'},
          {id: 'inbox', label: 'Inbox', note: 'Monday quote. Thursday file. Same work wearing a new subject line.'},
          {id: 'night', label: 'After hours', note: 'It follows you home because the job still lives in your head.'},
        ]}
      />
    )
  }
  if (kind === 'job') {
    return (
      <ExplainBoard
        title="One job"
        intro="Pick one repeating job. Leave the rest until that one has steps."
        branches={[
          {id: 'quotes', label: 'Quotes', note: 'This one already repeats. Start here.'},
          {id: 'follow', label: 'Follow-up', note: 'Wait until quotes have steps.'},
          {id: 'files', label: 'Files', note: 'Give them a home after the first job is written.'},
        ]}
      />
    )
  }
  return (
    <ExplainBoard
      title="A system"
      intro="A system is the way a job still runs when you leave the room. Tap the circle, then tap a part."
      branches={[
        {id: 'memory', label: 'Memory', note: 'Only you know the steps. It stops when you stop.'},
        {id: 'steps', label: 'Steps', note: 'Someone else can run it on a Thursday.'},
        {id: 'tools', label: 'Tools later', note: 'Software is not the system. The steps are.'},
      ]}
    />
  )
}

export function VideoPlaceholder() {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-dark">
      <div
        className="absolute inset-0"
        style={{background: 'radial-gradient(circle at 30% 40%, rgba(197,160,89,0.28), transparent 52%)'}}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/30">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M8 6.5v11l10-5.5z" fill="currentColor" />
          </svg>
        </span>
      </div>
    </div>
  )
}

export function EmailPlaceholder() {
  return (
    <section>
      <Kicker>Example</Kicker>
      <h2 className="mt-4 font-serif text-3xl font-medium leading-tight md:text-4xl">A real-world example</h2>
      <GoldRule />
      <p className="mt-5 text-sm leading-relaxed text-dark/70">
        This is what the pile looks like in an inbox. We wrote it. Nobody sent it. An image goes here later.
      </p>
      <StampWell className="mt-6" ink>
        <div className="flex aspect-[16/10] w-full items-center justify-center">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-on-dark">
            Image placeholder
          </p>
        </div>
      </StampWell>
    </section>
  )
}
