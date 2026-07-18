import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

/**
 * Leak pair: real browser chrome (site looks fine) vs Google results (you're missing).
 * Loops while on screen — same motion language as Speed Fix pain cards.
 */
export function SearchVisibilityLeakPair() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.3})
  const play = inView && !reduce

  return (
    <div ref={ref} className="mt-12 md:mt-14 w-full max-w-3xl">
      <p
        className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
        style={{color: FUNNEL_COLOURS.ink}}
      >
        The site looks perfect, and that&apos;s exactly why nobody caught it
      </p>
      <p
        className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-8"
        style={{color: FUNNEL_COLOURS.muted}}
      >
        This almost never comes from anything you did. A redesign ships with a hidden do-not-index
        switch still on. A migration breaks the sitemap. A developer&apos;s staging rule follows the
        site into production. Everything looks normal in the browser, so months pass while Google
        quietly drops your pages and customers find whoever&apos;s left.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 items-stretch">
        <BrowserLooksFineCard play={play} reduce={reduce} />
        <GoogleResultsMissingCard play={play} reduce={reduce} />
      </div>
    </div>
  )
}

/** Chrome-style browser: traffic lights, URL, page that loads clean. */
function BrowserLooksFineCard({play, reduce}: {play: boolean; reduce: boolean | null}) {
  return (
    <motion.div
      className="flex flex-col border overflow-hidden bg-cream text-dark"
      style={{borderColor: `${FUNNEL_COLOURS.ink}18`}}
      initial={reduce ? false : {opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.4}}
      transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
    >
      <p
        className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] px-4 pt-4 pb-2"
        style={{color: FUNNEL_COLOURS.goldDeep}}
      >
        Your browser
      </p>

      <div className="mx-3 mb-3 border border-dark/15 bg-white/70 overflow-hidden rounded-sm flex-1 flex flex-col min-h-[200px]">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-2.5 h-8 border-b border-dark/10 bg-cream">
          <span className="h-2 w-2 rounded-full bg-red-solid/80" />
          <span className="h-2 w-2 rounded-full" style={{backgroundColor: FUNNEL_COLOURS.gold}} />
          <span className="h-2 w-2 rounded-full bg-dark/20" />
          <div className="ml-2 flex-1 h-4 rounded-sm bg-dark/5 border border-dark/10 px-2 flex items-center gap-1.5">
            <span className="font-mono text-[8px] text-dark/35">🔒</span>
            <motion.span
              className="font-mono text-[8px] text-dark/45 truncate"
              animate={play ? {opacity: [0.55, 1, 0.55]} : {opacity: 0.8}}
              transition={
                play ? {duration: 3, repeat: Infinity, ease: 'easeInOut'} : {duration: 0.2}
              }
            >
              yoursite.com.au
            </motion.span>
          </div>
        </div>

        {/* Page body — loads in, then sits looking perfect */}
        <div className="p-3 flex-1 flex flex-col gap-2">
          <motion.div
            className="h-3 w-1/2 rounded-sm bg-dark/15"
            initial={reduce ? false : {width: '0%', opacity: 0}}
            animate={play || reduce ? {width: '50%', opacity: 1} : {width: '0%', opacity: 0}}
            transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
          />
          <motion.div
            className="h-2 w-full rounded-sm bg-dark/8"
            initial={reduce ? false : {scaleX: 0, opacity: 0}}
            animate={play || reduce ? {scaleX: 1, opacity: 1} : {scaleX: 0, opacity: 0}}
            transition={{duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1]}}
            style={{transformOrigin: 'left'}}
          />
          <motion.div
            className="h-2 w-4/5 rounded-sm bg-dark/8"
            initial={reduce ? false : {scaleX: 0, opacity: 0}}
            animate={play || reduce ? {scaleX: 1, opacity: 1} : {scaleX: 0, opacity: 0}}
            transition={{duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1]}}
            style={{transformOrigin: 'left'}}
          />
          <motion.div
            className="mt-1 h-16 w-full rounded-sm border border-dark/10 bg-dark/[0.03] overflow-hidden relative"
            initial={reduce ? false : {opacity: 0, y: 8}}
            animate={play || reduce ? {opacity: 1, y: 0} : {opacity: 0, y: 8}}
            transition={{duration: 0.45, delay: 0.4}}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(110deg, transparent 30%, ${FUNNEL_COLOURS.gold}22 50%, transparent 70%)`,
              }}
              animate={play ? {x: ['-100%', '120%']} : {x: '0%'}}
              transition={
                play
                  ? {duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2}
                  : {duration: 0.2}
              }
            />
          </motion.div>
          <motion.div
            className="h-6 w-28 rounded-sm mt-1"
            style={{backgroundColor: FUNNEL_COLOURS.accent}}
            initial={reduce ? false : {opacity: 0, scale: 0.9}}
            animate={play || reduce ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.9}}
            transition={{duration: 0.35, delay: 0.55}}
          />
        </div>

        {/* Progress bar completes then stays full */}
        <div className="h-1 bg-dark/5">
          <motion.div
            className="h-full"
            style={{backgroundColor: FUNNEL_COLOURS.gold}}
            animate={
              play
                ? {width: ['0%', '100%', '100%', '100%']}
                : {width: '100%'}
            }
            transition={
              play
                ? {
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeOut',
                    times: [0, 0.35, 0.85, 1],
                    repeatDelay: 0.8,
                  }
                : {duration: 0.2}
            }
          />
        </div>
      </div>

      <p
        className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] px-4 pb-4"
        style={{color: FUNNEL_COLOURS.goldDeep}}
      >
        Looks fine
      </p>
    </motion.div>
  )
}

/** Google SERP-style results: rivals appear, your slot stays empty and pulses. */
function GoogleResultsMissingCard({play, reduce}: {play: boolean; reduce: boolean | null}) {
  const rivals = [
    {name: 'Studio Hale', path: 'studiohale.com.au › mosman'},
    {name: 'North Shore Atelier', path: 'nsatelier.com.au › architects'},
    {name: 'Harbour Form', path: 'harbourform.com.au'},
  ]

  return (
    <motion.div
      className="flex flex-col border overflow-hidden bg-cream text-dark"
      style={{borderColor: `${FUNNEL_COLOURS.ink}18`}}
      initial={reduce ? false : {opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.4}}
      transition={{duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1]}}
    >
      <p
        className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] px-4 pt-4 pb-2"
        style={{color: FUNNEL_COLOURS.goldDeep}}
      >
        Google results
      </p>

      <div className="mx-3 mb-3 border border-dark/15 bg-white/70 overflow-hidden rounded-sm flex-1 flex flex-col min-h-[200px]">
        {/* Search field */}
        <div className="px-2.5 pt-2.5 pb-2 border-b border-dark/8">
          <div className="h-8 border border-dark/12 rounded-full px-3 flex items-center gap-2 bg-cream/80">
            <span className="font-mono text-[10px] text-dark/35">⌕</span>
            <motion.span
              className="font-sans text-[11px] text-dark/70"
              animate={play ? {opacity: [0.6, 1, 0.6]} : {opacity: 0.85}}
              transition={
                play ? {duration: 2.5, repeat: Infinity, ease: 'easeInOut'} : {duration: 0.2}
              }
            >
              architect Mosman
            </motion.span>
          </div>
        </div>

        <div className="px-2.5 py-2 space-y-2.5 flex-1">
          {rivals.map((r, i) => (
            <motion.div
              key={r.name}
              initial={reduce ? false : {opacity: 0, x: -10}}
              animate={play || reduce ? {opacity: 1, x: 0} : {opacity: 0, x: -10}}
              transition={{duration: 0.4, delay: 0.2 + i * 0.18, ease: [0.16, 1, 0.3, 1]}}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <span
                  className="h-3.5 w-3.5 rounded-full border border-dark/15 shrink-0"
                  style={{backgroundColor: `${FUNNEL_COLOURS.gold}33`}}
                />
                <p className="font-sans text-[9px] text-dark/45 truncate">{r.path}</p>
              </div>
              <p className="font-sans text-[13px] font-semibold leading-tight text-dark">{r.name}</p>
              <motion.div
                className="mt-1 h-1.5 w-[88%] rounded-sm bg-dark/8"
                animate={play ? {opacity: [0.35, 0.7, 0.35]} : {opacity: 0.5}}
                transition={
                  play
                    ? {duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2}
                    : {duration: 0.2}
                }
              />
            </motion.div>
          ))}

          {/* Empty slot where you should be */}
          <motion.div
            className="border border-dashed px-2.5 py-2.5 mt-1"
            style={{borderColor: FUNNEL_COLOURS.accent}}
            animate={
              play
                ? {
                    opacity: [0.55, 1, 0.55],
                    borderColor: [FUNNEL_COLOURS.accent, '#9A1730', FUNNEL_COLOURS.accent],
                  }
                : {opacity: 0.85}
            }
            transition={
              play ? {duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.8} : {duration: 0.2}
            }
          >
            <p
              className="font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
              style={{color: FUNNEL_COLOURS.accentDeep}}
            >
              Where you should be
            </p>
            <motion.div
              className="mt-1.5 h-1.5 w-2/3 rounded-sm origin-left"
              style={{backgroundColor: `${FUNNEL_COLOURS.accent}40`}}
              animate={play ? {scaleX: [0.4, 1, 0.4]} : {scaleX: 1}}
              transition={
                play
                  ? {duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.8}
                  : {duration: 0.2}
              }
            />
          </motion.div>
        </div>
      </div>

      <p
        className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] px-4 pb-4"
        style={{color: FUNNEL_COLOURS.accentDeep}}
      >
        You&apos;re not listed
      </p>
    </motion.div>
  )
}
