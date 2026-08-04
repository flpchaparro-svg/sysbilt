import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

function WindowDots() {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <span className="h-2 w-2 rounded-full" style={{backgroundColor: '#D4726A'}} />
      <span className="h-2 w-2 rounded-full" style={{backgroundColor: FUNNEL_COLOURS.gold}} />
      <span className="h-2 w-2 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.ink}28`}} />
    </div>
  )
}

function BrowserChrome({url}: {url: string}) {
  return (
    <div
      className="flex items-center gap-2 px-2.5 h-9 border-b"
      style={{
        borderColor: `${FUNNEL_COLOURS.ink}12`,
        backgroundColor: FUNNEL_COLOURS.ground,
      }}
    >
      <WindowDots />
      <div
        className="ml-1 flex-1 h-[22px] rounded-sm border px-2.5 flex items-center gap-2 min-w-0"
        style={{
          borderColor: `${FUNNEL_COLOURS.ink}12`,
          backgroundColor: '#fff',
        }}
      >
        <span
          className="h-2.5 w-2.5 rounded-full shrink-0 border"
          style={{borderColor: `${FUNNEL_COLOURS.ink}28`, backgroundColor: `${FUNNEL_COLOURS.ink}16`}}
          aria-hidden
        />
        <span
          className="font-mono text-[9px] truncate"
          style={{color: FUNNEL_COLOURS.steel}}
        >
          {url}
        </span>
      </div>
    </div>
  )
}

/**
 * Leak mock: your search dead end vs a rival browser with a working form.
 */
export function WebsiteLeakPair() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.28})
  const reduce = useReducedMotion()
  const show = reduce || inView

  return (
    <motion.div
      ref={ref}
      className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch"
      initial="hidden"
      animate={show ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {transition: {staggerChildren: 0.14}},
      }}
    >
      {/* LEFT: Maps listing + empty website window */}
      <motion.div
        className="relative overflow-hidden flex flex-col"
        style={{
          border: `1px solid ${FUNNEL_COLOURS.ink}14`,
          backgroundColor: FUNNEL_COLOURS.surface,
          boxShadow: `0 18px 40px -28px ${FUNNEL_COLOURS.ink}45`,
        }}
        variants={{
          hidden: {opacity: 0, y: reduce ? 0 : 24},
          visible: {opacity: 1, y: 0, transition: {duration: 0.55, ease: EASE}},
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-2.5 border-b"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}2C`,
            backgroundColor: `${FUNNEL_COLOURS.ink}05`,
          }}
        >
          <p
            className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{color: FUNNEL_COLOURS.steel}}
          >
            The search
          </p>
          <span
            className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
            style={{color: FUNNEL_COLOURS.accent}}
          >
            Dead end
          </span>
        </div>

        <div className="p-4 md:p-5 flex-1 flex flex-col gap-4">
          {/* Maps-style listing panel */}
          <div
            className="rounded-md border overflow-hidden"
            style={{
              borderColor: `${FUNNEL_COLOURS.ink}12`,
              backgroundColor: '#fff',
            }}
          >
            <div
              className="h-16 md:h-[72px] relative"
              style={{
                background: `linear-gradient(135deg, ${FUNNEL_COLOURS.ink}2C 0%, ${FUNNEL_COLOURS.ink}16 50%, ${FUNNEL_COLOURS.gold}18 100%)`,
              }}
            >
              <div
                className="absolute bottom-2 left-2 h-7 w-7 rounded-sm border flex items-center justify-center"
                style={{
                  borderColor: `${FUNNEL_COLOURS.ink}18`,
                  backgroundColor: FUNNEL_COLOURS.surface,
                }}
              >
                <span
                  className="font-mono text-[8px] font-bold"
                  style={{color: FUNNEL_COLOURS.steel}}
                >
                  MAP
                </span>
              </div>
            </div>
            <div className="px-3.5 py-3">
              <p className="font-sans text-sm font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
                Your listing
              </p>
              <p className="mt-0.5 font-mono text-[10px]" style={{color: FUNNEL_COLOURS.muted}}>
                Phone number · Open now · Directions
              </p>
              <div className="mt-3 flex gap-1.5">
                {['Call', 'Directions', 'Save'].map((chip) => (
                  <span
                    key={chip}
                    className="font-mono text-[9px] uppercase tracking-[0.12em] px-2.5 py-1.5 rounded-sm"
                    style={{
                      color: FUNNEL_COLOURS.steel,
                      backgroundColor: FUNNEL_COLOURS.ground,
                      border: `1px solid ${FUNNEL_COLOURS.ink}12`,
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bigger empty website window */}
          <div
            className="flex-1 min-h-[168px] md:min-h-[190px] rounded-md border overflow-hidden flex flex-col"
            style={{
              borderColor: `${FUNNEL_COLOURS.ink}16`,
              backgroundColor: '#fff',
              boxShadow: `inset 0 0 0 1px ${FUNNEL_COLOURS.ink}16`,
            }}
          >
            <BrowserChrome url="website not found" />
            <div
              className="flex-1 flex flex-col items-center justify-center gap-2.5 px-4 border-t border-dashed"
              style={{
                borderColor: `${FUNNEL_COLOURS.ink}22`,
                background: `repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 6px,
                  ${FUNNEL_COLOURS.ink}04 6px,
                  ${FUNNEL_COLOURS.ink}04 7px
                )`,
              }}
            >
              <span
                className="font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{color: `${FUNNEL_COLOURS.ink}45`}}
              >
                Website
              </span>
              <motion.span
                className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] px-2.5 py-1"
                style={{
                  color: FUNNEL_COLOURS.onInk,
                  backgroundColor: FUNNEL_COLOURS.accent,
                }}
                animate={reduce || !show ? undefined : {opacity: [0.7, 1, 0.7]}}
                transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
              >
                Empty
              </motion.span>
              <span
                className="font-sans text-[11px] text-center max-w-[12rem] leading-snug"
                style={{color: FUNNEL_COLOURS.muted}}
              >
                No page. No form. Nowhere to go next.
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RIGHT: Rival browser with real site + form */}
      <motion.div
        className="relative overflow-hidden flex flex-col"
        style={{
          border: `1px solid ${FUNNEL_COLOURS.goldDeep}45`,
          backgroundColor: FUNNEL_COLOURS.surface,
          boxShadow: `0 18px 40px -28px ${FUNNEL_COLOURS.ink}45`,
        }}
        variants={{
          hidden: {opacity: 0, y: reduce ? 0 : 24},
          visible: {opacity: 1, y: 0, transition: {duration: 0.55, ease: EASE}},
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${FUNNEL_COLOURS.gold}99, transparent)`,
          }}
          aria-hidden
        />
        <div
          className="flex items-center justify-between px-4 py-2.5 border-b"
          style={{
            borderColor: `${FUNNEL_COLOURS.goldDeep}22`,
            backgroundColor: `${FUNNEL_COLOURS.goldDeep}10`,
          }}
        >
          <p
            className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            The next one
          </p>
          <span
            className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            Ready
          </span>
        </div>

        <div className="p-4 md:p-5 flex-1 flex flex-col">
          <div
            className="flex-1 rounded-md border overflow-hidden flex flex-col min-h-[320px]"
            style={{
              borderColor: `${FUNNEL_COLOURS.ink}14`,
              backgroundColor: '#fff',
              boxShadow: `0 10px 28px -20px ${FUNNEL_COLOURS.ink}55`,
            }}
          >
            <BrowserChrome url="rivalpractice.com.au" />

            {/* Mini site nav */}
            <div
              className="flex items-center justify-between px-3 h-9 border-b"
              style={{borderColor: `${FUNNEL_COLOURS.ink}2C`, backgroundColor: FUNNEL_COLOURS.surface}}
            >
              <span
                className="font-serif text-[11px] font-bold tracking-tight"
                style={{color: FUNNEL_COLOURS.ink}}
              >
                Northside Practice
              </span>
              <div className="hidden sm:flex items-center gap-3">
                {['Services', 'About', 'Contact'].map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[8px] uppercase tracking-[0.14em]"
                    style={{color: FUNNEL_COLOURS.steel}}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 md:p-3.5 flex-1 flex flex-col gap-3">
              {/* Hero strip */}
              <div>
                <p
                  className="font-serif text-[15px] md:text-base font-bold tracking-tight leading-snug"
                  style={{color: FUNNEL_COLOURS.ink}}
                >
                  Clear offer. Open hours. Ready for you.
                </p>
                <p
                  className="mt-1 font-sans text-[11px] leading-relaxed"
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  Mon to Fri · 8am to 6pm · Same-day replies
                </p>
              </div>

              {/* Contact form window */}
              <div
                className="rounded-sm border flex-1 flex flex-col overflow-hidden"
                style={{
                  borderColor: `${FUNNEL_COLOURS.ink}14`,
                  backgroundColor: FUNNEL_COLOURS.ground,
                }}
              >
                <div
                  className="px-3 py-2 border-b flex items-center justify-between"
                  style={{
                    borderColor: `${FUNNEL_COLOURS.ink}2C`,
                    backgroundColor: '#fff',
                  }}
                >
                  <span
                    className="font-mono text-[9px] font-bold uppercase tracking-[0.18em]"
                    style={{color: FUNNEL_COLOURS.steel}}
                  >
                    Enquire
                  </span>
                  <span
                    className="font-mono text-[8px] uppercase tracking-[0.12em]"
                    style={{color: FUNNEL_COLOURS.goldDeep}}
                  >
                    Form live
                  </span>
                </div>
                <div className="p-3 space-y-2.5">
                  {[
                    {label: 'Name', value: 'Sam Chen'},
                    {label: 'Email', value: 'sam@email.com'},
                    {label: 'Message', value: 'Can I book this week?'},
                  ].map((field, i) => (
                    <motion.div
                      key={field.label}
                      initial={reduce ? false : {opacity: 0, y: 6}}
                      animate={show ? {opacity: 1, y: 0} : undefined}
                      transition={{duration: 0.35, delay: 0.25 + i * 0.08, ease: EASE}}
                    >
                      <p
                        className="font-mono text-[8px] uppercase tracking-[0.14em] mb-1"
                        style={{color: FUNNEL_COLOURS.steel}}
                      >
                        {field.label}
                      </p>
                      <div
                        className="h-7 rounded-sm border px-2.5 flex items-center font-sans text-[11px]"
                        style={{
                          borderColor: `${FUNNEL_COLOURS.ink}14`,
                          backgroundColor: '#fff',
                          color: FUNNEL_COLOURS.ink,
                        }}
                      >
                        {field.value}
                      </div>
                    </motion.div>
                  ))}
                  <motion.div
                    className="h-8 rounded-sm flex items-center justify-center font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white"
                    style={{backgroundColor: FUNNEL_COLOURS.accent}}
                    initial={reduce ? false : {opacity: 0, y: 6}}
                    animate={show ? {opacity: 1, y: 0} : undefined}
                    transition={{duration: 0.35, delay: 0.5, ease: EASE}}
                  >
                    Send enquiry
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="flex items-center gap-2"
                initial={reduce ? false : {opacity: 0, y: 8}}
                animate={show ? {opacity: 1, y: 0} : undefined}
                transition={{duration: 0.4, delay: 0.65, ease: EASE}}
              >
                <motion.span
                  className="inline-flex font-mono text-[10px] font-bold uppercase tracking-[0.16em] px-3 py-1.5 text-white"
                  style={{backgroundColor: '#1a7a4c'}}
                  animate={
                    reduce || !show
                      ? undefined
                      : {
                          scale: [1, 1.04, 1],
                          boxShadow: [
                            '0 0 0 0 rgba(26,122,76,0)',
                            '0 0 0 8px rgba(26,122,76,0.16)',
                            '0 0 0 0 rgba(26,122,76,0)',
                          ],
                        }
                  }
                  transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
                >
                  Enquired
                </motion.span>
                <span
                  className="font-sans text-[11px]"
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  Landed in their inbox
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
