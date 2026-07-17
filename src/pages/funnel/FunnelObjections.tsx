import React, {useState} from 'react'
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion'
import {MapPin, Plus} from 'lucide-react'
import {FUNNEL_COLOURS} from './funnelTheme'

type Faq = {q: string; a: string}

/**
 * Objections / FAQ — pin spins once on enter; answers stay closed until clicked.
 */
export function FunnelObjections({
  label,
  heading,
  faqs,
}: {
  label: string
  heading: string
  faqs: Faq[]
}) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="max-w-3xl mx-auto px-6 md:px-10 pb-16 md:pb-24">
      <motion.div
        className="h-px w-12 mb-10 md:mb-12"
        style={{backgroundColor: FUNNEL_COLOURS.gold, originX: 0}}
        initial={reduce ? false : {scaleX: 0}}
        whileInView={{scaleX: 1}}
        viewport={{once: true, amount: 0.8}}
        transition={{duration: 0.7, ease: [0.16, 1, 0.3, 1]}}
        aria-hidden
      />

      <motion.div
        className="flex items-start gap-3 mb-4"
        initial={reduce ? false : {opacity: 0, y: 12}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.5}}
      >
        <motion.span
          className="mt-0.5 inline-flex text-gold-on-cream"
          initial={reduce ? false : {opacity: 0}}
          whileInView={{opacity: 1}}
          viewport={{once: true}}
          transition={{duration: 0.3}}
        >
          <motion.span
            initial={reduce ? false : {rotate: 0}}
            whileInView={reduce ? undefined : {rotate: 360}}
            viewport={{once: true}}
            transition={{duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15}}
            style={{display: 'inline-flex', transformOrigin: 'center bottom'}}
          >
            <MapPin className="w-4 h-4" strokeWidth={2.25} aria-hidden />
          </motion.span>
        </motion.span>
        <p
          className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.28em]"
          style={{color: FUNNEL_COLOURS.steel}}
        >
          {label}
        </p>
      </motion.div>

      <motion.h2
        className="font-serif font-bold text-3xl md:text-4xl tracking-tight mb-3 max-w-2xl"
        style={{color: FUNNEL_COLOURS.ink}}
        initial={reduce ? false : {opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.55, delay: 0.08}}
      >
        {heading}
      </motion.h2>

      <motion.p
        className="font-mono text-[10px] uppercase tracking-[0.2em] mb-8 md:mb-10"
        style={{color: FUNNEL_COLOURS.muted}}
        initial={reduce ? false : {opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true}}
        transition={{delay: 0.35, duration: 0.6}}
      >
        Sydney · straight answers
      </motion.p>

      <motion.div
        className="border-t border-b"
        style={{borderColor: `${FUNNEL_COLOURS.ink}14`}}
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, margin: '-40px'}}
        variants={{
          hidden: {},
          visible: {transition: {staggerChildren: 0.08, delayChildren: 0.2}},
        }}
      >
        {faqs.map((faq, i) => {
          const isOpen = open === i
          return (
            <motion.div
              key={i}
              className="border-b last:border-b-0"
              style={{borderColor: `${FUNNEL_COLOURS.ink}14`}}
              variants={{
                hidden: {opacity: 0, y: 14},
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {duration: 0.45, ease: [0.16, 1, 0.3, 1]},
                },
              }}
            >
              <button
                type="button"
                className="w-full py-5 text-left flex items-start justify-between gap-4 group"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span
                  className="font-serif text-lg md:text-xl transition-colors duration-200"
                  style={{color: isOpen ? FUNNEL_COLOURS.accentDeep : FUNNEL_COLOURS.ink}}
                >
                  {faq.q}
                </span>
                <motion.span
                  className="mt-1 shrink-0 inline-flex h-6 w-6 items-center justify-center border"
                  style={{
                    borderColor: isOpen ? FUNNEL_COLOURS.accent : `${FUNNEL_COLOURS.ink}22`,
                    color: isOpen ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.steel,
                  }}
                  animate={{rotate: isOpen ? 45 : 0}}
                  transition={{duration: 0.25}}
                  aria-hidden
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="answer"
                    initial={reduce ? false : {height: 0, opacity: 0}}
                    animate={{height: 'auto', opacity: 1}}
                    exit={reduce ? undefined : {height: 0, opacity: 0}}
                    transition={{duration: 0.32, ease: [0.16, 1, 0.3, 1]}}
                    className="overflow-hidden"
                  >
                    <p
                      className="pb-5 font-sans text-base leading-relaxed pr-10 max-w-2xl"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
