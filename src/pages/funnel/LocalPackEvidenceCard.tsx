import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

function initialsOf(name?: string | null) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return null
  return parts
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
}

function ColumnFrame({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div
      className="flex-1 rounded-lg border p-3 flex flex-col gap-2.5"
      style={{borderColor: `${FUNNEL_COLOURS.ink}12`, backgroundColor: FUNNEL_COLOURS.surface}}
    >
      <span
        className="font-mono text-[8px] font-bold uppercase tracking-[0.18em]"
        style={{color: FUNNEL_COLOURS.steel}}
      >
        {label}
      </span>
      {children}
    </div>
  )
}

/** Proof: three connected panels for the three jobs in the pack. Shape-first, almost no words. */
export function LocalPackEvidenceCard({business}: {business?: string | null}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const reduce = useReducedMotion()
  const go = !reduce && inView
  const initials = initialsOf(business)

  return (
    <motion.div
      ref={ref}
      className="mt-2 rounded-xl overflow-hidden border max-w-2xl"
      style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: FUNNEL_COLOURS.surface}}
      initial={reduce ? false : {opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
    >
      <div
        className="px-3 py-2 flex items-center gap-1.5"
        style={{backgroundColor: `${FUNNEL_COLOURS.ink}16`}}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.accent}70`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.gold}80`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.ink}25`}} />
        <div
          className="h-5 w-5 rounded-sm ml-1 flex items-center justify-center"
          style={{backgroundColor: `${FUNNEL_COLOURS.ink}1C`}}
        >
          {initials ? (
            <span className="font-mono text-[7px] font-bold" style={{color: FUNNEL_COLOURS.steel}}>
              {initials}
            </span>
          ) : null}
        </div>
        <span
          className="ml-auto font-mono text-[8px] uppercase tracking-[0.16em]"
          style={{color: FUNNEL_COLOURS.goldDeep}}
        >
          One listing
        </span>
      </div>

      <div className="p-4 md:p-5 flex flex-col sm:flex-row gap-3">
        {/* Profile: identity block ticking clean */}
        <ColumnFrame label="Profile">
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-md shrink-0"
              style={{backgroundColor: FUNNEL_COLOURS.mockFill}}
            />
            <div className="flex-1 space-y-1.5">
              <div className="h-1.5 w-4/5 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockBar}} />
              <div className="h-1.5 w-1/2 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {['Category', 'Photos', 'Link'].map((label, i) => (
              <motion.span
                key={label}
                className="flex-1 rounded-sm border px-1 py-1 text-center font-mono text-[6px] uppercase tracking-wide"
                style={{borderColor: `${FUNNEL_COLOURS.ink}14`, color: FUNNEL_COLOURS.muted}}
                animate={
                  go
                    ? {
                        borderColor: [`${FUNNEL_COLOURS.ink}14`, `${FUNNEL_COLOURS.gold}90`, `${FUNNEL_COLOURS.gold}90`],
                        backgroundColor: ['transparent', `${FUNNEL_COLOURS.gold}18`, `${FUNNEL_COLOURS.gold}18`],
                      }
                    : undefined
                }
                transition={{duration: 0.4, delay: 0.15 + i * 0.15}}
              >
                {label}
              </motion.span>
            ))}
          </div>
        </ColumnFrame>

        {/* Reviews: stars filling, count ticking up */}
        <ColumnFrame label="Reviews">
          <div className="flex items-center gap-1">
            {Array.from({length: 5}).map((_, i) => (
              <motion.span
                key={i}
                className="h-3 w-3"
                style={{
                  backgroundColor: FUNNEL_COLOURS.gold,
                  clipPath:
                    'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                }}
                initial={reduce ? false : {opacity: 0.15, scale: 0.7}}
                animate={go ? {opacity: 1, scale: 1} : undefined}
                transition={{delay: 0.1 + i * 0.09, type: 'spring', stiffness: 340, damping: 20}}
              />
            ))}
          </div>
          <div
            className="rounded-md border px-2 py-1.5 flex items-center justify-between"
            style={{borderColor: `${FUNNEL_COLOURS.goldDeep}40`, backgroundColor: `${FUNNEL_COLOURS.gold}12`}}
          >
            <span className="font-mono text-[6px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.goldDeep}}>
              Ask sent
            </span>
            <motion.span
              className="h-1.5 w-1.5 rounded-full"
              style={{backgroundColor: '#1F7A4D'}}
              animate={go ? {opacity: [0.4, 1, 0.4]} : {opacity: 0.8}}
              transition={{duration: 1.4, repeat: Infinity}}
            />
          </div>
        </ColumnFrame>

        {/* Posts: a small feed with a fresh row landing */}
        <ColumnFrame label="Posts">
          <div className="space-y-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2.5 rounded-sm"
                style={{
                  backgroundColor: i === 0 ? `${FUNNEL_COLOURS.goldDeep}40` : FUNNEL_COLOURS.mockFill,
                  width: i === 0 ? '100%' : `${85 - i * 12}%`,
                }}
                initial={reduce ? false : {opacity: 0, x: 10}}
                animate={go ? {opacity: 1, x: 0} : undefined}
                transition={{delay: 0.15 + i * 0.12, duration: 0.35}}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5 pt-0.5">
            {Array.from({length: 4}).map((_, i) => (
              <motion.span
                key={i}
                className="h-1 flex-1 rounded-full"
                style={{backgroundColor: i === 0 ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.mockBar}}
                animate={i === 0 && go ? {opacity: [0.5, 1, 0.5]} : undefined}
                transition={{duration: 1.6, repeat: Infinity}}
              />
            ))}
          </div>
        </ColumnFrame>
      </div>
    </motion.div>
  )
}
