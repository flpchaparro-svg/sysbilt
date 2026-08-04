import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {Reveal} from './funnelReveal'
import {FUNNEL_COLOURS} from './funnelTheme'

const LEFT = [
  'Which platform, and whether you will still be able to use it in a year',
  'What SEO actually is, and which half of the advice is nonsense',
  'What to write, and what customers need to read before they trust you',
  'Which pages you need, and what order they go in',
  'How fast is fast enough, and why Google cares',
  'Privacy, terms, and what you are legally required to have',
  'Where the domain lives, and who is holding it',
  'What a contact form does with an enquiry after someone hits send',
  'Which quotes are fair and which ones are a number picked out of the air',
  'Whether the person you hire will still answer the phone in six months',
  'What breaks when a plugin updates itself at 2am',
  'Who fixes it when it does',
]

const RIGHT = [
  {
    title: 'Fill in a short form',
    hint: 'Logo, photos, hours, services',
  },
  {
    title: 'Talk to us for twenty minutes about the work you do',
    hint: 'We record it with your say-so. That is the brief.',
  },
  {
    title: 'Say yes to what we build',
    hint: 'Approve it. We host it. You stay on the plan.',
  },
]

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Centrepiece: every unknown they'd face alone vs the three things they actually do.
 */
export function WebsiteUnknownsCentrepiece() {
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, {once: true, amount: 0.2})
  const reduce = useReducedMotion()
  const show = reduce || inView

  return (
    <section className="max-w-5xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <Reveal y={10}>
        <div className="flex items-center gap-4 mb-5">
          <span
            className="h-px w-10 md:w-14"
            style={{backgroundColor: FUNNEL_COLOURS.goldDeep}}
            aria-hidden
          />
          <p
            className="font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.28em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Why it never gets done
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.06} y={16}>
        <h2
          className="font-serif font-bold text-3xl md:text-[2.65rem] tracking-tight mb-6 md:mb-8 max-w-3xl leading-[1.15]"
          style={{color: FUNNEL_COLOURS.ink}}
        >
          The job has twenty parts and nobody ever told you which ones matter
        </h2>
      </Reveal>
      <Reveal delay={0.1} y={12}>
        <p
          className="font-sans text-base md:text-lg leading-relaxed max-w-3xl mb-14 md:mb-20"
          style={{color: FUNNEL_COLOURS.muted}}
        >
          This is the real reason the website never happens. It is not laziness and it is not
          budget. It is that the moment you start, you hit a wall of decisions nobody prepared you
          for, every one of them with a stranger on the internet insisting you will regret getting
          it wrong.
        </p>
      </Reveal>

      <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        {/* LEFT */}
        <motion.div
          className="relative overflow-hidden h-full flex flex-col"
          style={{
            border: `1px solid ${FUNNEL_COLOURS.ink}14`,
            backgroundColor: `${FUNNEL_COLOURS.ink}12`,
            boxShadow: `0 18px 40px -30px ${FUNNEL_COLOURS.ink}40`,
          }}
          initial={reduce ? false : {opacity: 0, y: 20}}
          animate={show ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
          transition={{duration: 0.55, ease: EASE}}
        >
          <div
            className="px-5 py-5 md:px-6 md:py-6 border-b"
            style={{
              borderColor: `${FUNNEL_COLOURS.ink}12`,
              backgroundColor: FUNNEL_COLOURS.surface,
            }}
          >
            <p
              className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-2.5"
              style={{color: FUNNEL_COLOURS.steel}}
            >
              Alone
            </p>
            <h3
              className="font-serif font-bold text-xl md:text-2xl tracking-tight leading-snug"
              style={{color: FUNNEL_COLOURS.ink}}
            >
              What you would have to work out
            </h3>
            <p className="mt-2 font-sans text-sm" style={{color: FUNNEL_COLOURS.muted}}>
              Twelve decisions. None of them are your job.
            </p>
          </div>
          <ul className="px-5 py-3 md:px-6 md:py-4 flex-1">
            {LEFT.map((line, i) => (
              <motion.li
                key={line}
                className="flex gap-3 py-2.5 border-b last:border-b-0"
                style={{borderColor: `${FUNNEL_COLOURS.ink}28`}}
                initial={reduce ? false : {opacity: 0, x: -8}}
                animate={show ? {opacity: 1, x: 0} : undefined}
                transition={{duration: 0.35, delay: 0.08 + i * 0.035, ease: EASE}}
              >
                <span
                  className="font-mono text-[9px] font-bold tabular-nums shrink-0 mt-0.5 w-5"
                  style={{color: `${FUNNEL_COLOURS.ink}35`}}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="font-sans text-[12px] md:text-[13px] leading-snug"
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  {line}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="relative overflow-hidden h-full flex flex-col"
          style={{
            border: `1px solid ${FUNNEL_COLOURS.goldDeep}45`,
            backgroundColor: FUNNEL_COLOURS.surface,
            boxShadow: `0 24px 55px -28px ${FUNNEL_COLOURS.ink}55`,
          }}
          initial={reduce ? false : {opacity: 0, y: 20}}
          animate={show ? {opacity: 1, y: 0} : {opacity: 0, y: 20}}
          transition={{duration: 0.55, delay: 0.1, ease: EASE}}
        >
          <div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{
              background: `linear-gradient(90deg, ${FUNNEL_COLOURS.goldDeep}, ${FUNNEL_COLOURS.gold}, ${FUNNEL_COLOURS.goldDeep})`,
            }}
            aria-hidden
          />
          <div
            className="px-5 py-5 md:px-7 md:py-6 border-b"
            style={{
              borderColor: `${FUNNEL_COLOURS.goldDeep}22`,
              background: `linear-gradient(180deg, ${FUNNEL_COLOURS.goldDeep}14 0%, ${FUNNEL_COLOURS.surface} 100%)`,
            }}
          >
            <p
              className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-2.5"
              style={{color: FUNNEL_COLOURS.goldDeep}}
            >
              With us
            </p>
            <h3
              className="font-serif font-bold text-xl md:text-2xl tracking-tight leading-snug"
              style={{color: FUNNEL_COLOURS.ink}}
            >
              What you actually do
            </h3>
            <p className="mt-2 font-sans text-sm" style={{color: FUNNEL_COLOURS.muted}}>
              Three steps. That is the whole trade.
            </p>
          </div>

          <ol className="relative flex-1 flex flex-col justify-center gap-3 p-4 md:p-5 md:px-6">
            {/* Connecting rail behind the three steps */}
            <div
              className="pointer-events-none absolute left-[2.05rem] md:left-[2.35rem] top-8 bottom-8 w-px"
              style={{backgroundColor: `${FUNNEL_COLOURS.goldDeep}28`}}
              aria-hidden
            />
            {RIGHT.map((step, i) => (
              <motion.li
                key={step.title}
                className="relative flex gap-3.5 md:gap-4 items-start rounded-sm border p-4 md:p-5"
                style={{
                  borderColor: `${FUNNEL_COLOURS.goldDeep}28`,
                  backgroundColor: '#fff',
                  boxShadow: `0 10px 28px -22px ${FUNNEL_COLOURS.ink}50`,
                }}
                initial={reduce ? false : {opacity: 0, y: 16}}
                animate={show ? {opacity: 1, y: 0} : undefined}
                transition={{duration: 0.5, delay: 0.28 + i * 0.14, ease: EASE}}
              >
                <span
                  className="relative z-[1] shrink-0 flex h-10 w-10 md:h-11 md:w-11 items-center justify-center font-mono text-[12px] font-bold tabular-nums"
                  style={{
                    color: FUNNEL_COLOURS.onInk,
                    backgroundColor: FUNNEL_COLOURS.goldDeep,
                    boxShadow: `0 6px 16px -8px ${FUNNEL_COLOURS.goldDeep}`,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 pt-0.5">
                  <p
                    className="font-serif text-lg md:text-[1.35rem] font-bold tracking-tight leading-snug"
                    style={{color: FUNNEL_COLOURS.ink}}
                  >
                    {step.title}
                  </p>
                  <p
                    className="mt-1.5 font-sans text-[12px] md:text-[13px] leading-snug"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {step.hint}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>

      <Reveal delay={0.2} y={12}>
        <p
          className="mt-14 md:mt-20 font-sans text-base md:text-lg leading-relaxed max-w-3xl"
          style={{color: FUNNEL_COLOURS.ink}}
        >
          That is the whole trade. Every decision on the left is ours to make and ours to maintain.
          If we get one wrong, it is our job to fix it, not yours to notice.
        </p>
      </Reveal>
    </section>
  )
}
