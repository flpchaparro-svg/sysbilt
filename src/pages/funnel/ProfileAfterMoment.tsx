import React from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const AUDIT_ROWS = [
  {empty: 'Hours unclear', filled: 'Hours set'},
  {empty: 'Services empty', filled: 'Services filled'},
  {empty: 'Photos thin', filled: 'Photos live'},
  {empty: 'No review link', filled: 'Review link ready'},
  {empty: 'Q and A off', filled: 'Q and A seeded'},
]

/**
 * Bridge proof: audit the Google panel, then fill it. Not a static before/after card.
 */
export function ProfileAfterMoment({businessName}: {businessName?: string | null}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.4})
  const reduce = useReducedMotion()
  const [phase, setPhase] = React.useState<'idle' | 'audit' | 'fix'>('idle')
  const label = businessName?.trim() || 'Your business'

  React.useEffect(() => {
    if (reduce) {
      setPhase('fix')
      return
    }
    if (!inView) return
    setPhase('audit')
    const t1 = window.setTimeout(() => setPhase('fix'), 1600)
    return () => window.clearTimeout(t1)
  }, [inView, reduce])

  const fixed = phase === 'fix'

  return (
    <div ref={ref} className="mt-10 md:mt-12 w-full max-w-xl">
      <motion.div
        className="border overflow-hidden"
        style={{
          borderColor: fixed ? `${FUNNEL_COLOURS.gold}66` : `${FUNNEL_COLOURS.ink}16`,
          backgroundColor: FUNNEL_COLOURS.surface,
        }}
        initial={reduce ? false : {opacity: 0, y: 16}}
        animate={inView || reduce ? {opacity: 1, y: 0} : {opacity: 0, y: 16}}
        transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
      >
        <div
          className="px-4 py-3 border-b flex items-center justify-between gap-3"
          style={{borderColor: `${FUNNEL_COLOURS.ink}12`}}
        >
          <div>
            <p
              className="font-mono text-[9px] uppercase tracking-[0.2em]"
              style={{color: FUNNEL_COLOURS.steel}}
            >
              Google · Business Profile
            </p>
            <p className="font-serif text-lg mt-1" style={{color: FUNNEL_COLOURS.ink}}>
              {label}
            </p>
          </div>
          <motion.span
            className="font-mono text-[8px] font-bold uppercase tracking-widest px-2 py-1 shrink-0"
            style={{
              backgroundColor: fixed ? `${FUNNEL_COLOURS.gold}28` : `${FUNNEL_COLOURS.accent}18`,
              color: fixed ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.accent,
            }}
            key={fixed ? 'after' : 'before'}
            initial={reduce ? false : {opacity: 0, y: -4}}
            animate={{opacity: 1, y: 0}}
          >
            {fixed ? 'After' : phase === 'audit' ? 'Auditing' : 'Before'}
          </motion.span>
        </div>

        <div className="p-4 md:p-5 space-y-2.5">
          {AUDIT_ROWS.map((row, i) => {
            const done = fixed || reduce
            return (
              <motion.div
                key={row.empty}
                className="flex items-center justify-between gap-3 border px-3 py-2.5"
                style={{
                  borderColor: done
                    ? `${FUNNEL_COLOURS.gold}55`
                    : `${FUNNEL_COLOURS.accent}40`,
                  backgroundColor: done
                    ? `${FUNNEL_COLOURS.gold}14`
                    : `${FUNNEL_COLOURS.accent}08`,
                }}
                initial={reduce ? false : {opacity: 0, x: -10}}
                animate={
                  phase === 'idle' && !reduce
                    ? {opacity: 0, x: -10}
                    : {opacity: 1, x: 0}
                }
                transition={{delay: reduce ? 0 : i * 0.12, duration: 0.35}}
              >
                <p
                  className="font-sans text-sm"
                  style={{color: done ? FUNNEL_COLOURS.ink : FUNNEL_COLOURS.muted}}
                >
                  {done ? row.filled : row.empty}
                </p>
                <motion.span
                  className="font-mono text-[10px] font-bold uppercase tracking-widest"
                  style={{color: done ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.accent}}
                  animate={
                    !done && phase === 'audit' && !reduce
                      ? {opacity: [0.35, 1, 0.35]}
                      : {opacity: 1}
                  }
                  transition={
                    !done && phase === 'audit' && !reduce
                      ? {duration: 0.9, repeat: Infinity, delay: i * 0.08}
                      : {duration: 0.25}
                  }
                >
                  {done ? 'Set' : 'Missing'}
                </motion.span>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          className="px-4 pb-4 font-sans text-xs"
          style={{color: FUNNEL_COLOURS.muted}}
          initial={{opacity: 0}}
          animate={{opacity: fixed || reduce ? 1 : 0}}
          transition={{delay: reduce ? 0 : 0.2}}
        >
          Same panel. Looked after. You keep the keys.
        </motion.p>
      </motion.div>
    </div>
  )
}
