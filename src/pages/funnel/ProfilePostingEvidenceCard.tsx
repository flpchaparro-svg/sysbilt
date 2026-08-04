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

/** Proof: a Google Business Profile with an empty update history, Maps-style panel. Almost no words. */
export function ProfilePostingEvidenceCard({
  business,
  lastPostMonth,
}: {
  business?: string | null
  lastPostMonth?: string | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {amount: 0.35})
  const reduce = useReducedMotion()
  const go = !reduce && inView
  const initials = initialsOf(business)
  void lastPostMonth

  const TIMELINE_DOTS = 9

  return (
    <motion.div
      ref={ref}
      className="mt-2 rounded-xl overflow-hidden border max-w-2xl"
      style={{borderColor: FUNNEL_COLOURS.mockBorder, backgroundColor: FUNNEL_COLOURS.surface}}
      initial={reduce ? false : {opacity: 0, y: 16}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
    >
      <div
        className="px-3 py-2 flex items-center gap-1.5"
        style={{backgroundColor: FUNNEL_COLOURS.mockWash}}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.accent}70`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: `${FUNNEL_COLOURS.gold}80`}} />
        <span className="h-1.5 w-1.5 rounded-full" style={{backgroundColor: FUNNEL_COLOURS.mockBar}} />
        <div className="ml-auto flex items-center gap-1">
          {Array.from({length: 5}).map((_, i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{backgroundColor: i < 4 ? FUNNEL_COLOURS.gold : FUNNEL_COLOURS.mockBar}}
            />
          ))}
        </div>
      </div>

      <div className="p-4 md:p-5 space-y-4">
        <div className="flex gap-3 items-center">
          <div
            className="h-12 w-12 rounded-lg shrink-0 flex items-center justify-center"
            style={{backgroundColor: FUNNEL_COLOURS.mockFill}}
          >
            {initials ? (
              <span className="font-mono text-xs font-bold tracking-wide" style={{color: FUNNEL_COLOURS.mockLabel}}>
                {initials}
              </span>
            ) : (
              <div className="h-4 w-6 rounded-[2px]" style={{backgroundColor: FUNNEL_COLOURS.mockBar}} />
            )}
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="h-2.5 w-2/5 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockBar}} />
            <div className="h-1.5 w-1/3 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
          </div>
        </div>

        <div
          className="relative rounded-lg border border-dashed px-3 py-3 space-y-2"
          style={{borderColor: FUNNEL_COLOURS.mockBorder, backgroundColor: FUNNEL_COLOURS.mockWash}}
        >
          <span
            className="absolute top-2 right-2.5 font-mono text-[8px] uppercase tracking-[0.14em]"
            style={{color: FUNNEL_COLOURS.mockLabel}}
          >
            Empty
          </span>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 rounded-md border border-dashed px-2 py-2"
              style={{borderColor: FUNNEL_COLOURS.mockBorder}}
              animate={go ? {opacity: [0.78, 1, 0.78]} : {opacity: 0.9}}
              transition={{duration: 2.2, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut'}}
            >
              <div className="h-6 w-6 rounded shrink-0" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-3/4 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockBar}} />
                <div className="h-1.5 w-1/2 rounded-sm" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 pt-1">
          {Array.from({length: TIMELINE_DOTS}).map((_, i) => {
            const isLast = i === TIMELINE_DOTS - 1
            const isFirst = i === 0
            return (
              <React.Fragment key={i}>
                <motion.span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: isFirst ? FUNNEL_COLOURS.goldDeep : 'transparent',
                    border: isFirst ? 'none' : `1px solid ${FUNNEL_COLOURS.mockBorder}`,
                  }}
                  animate={
                    isLast && go
                      ? {
                          scale: [1, 1.6, 1],
                          boxShadow: [
                            `0 0 0 0 ${FUNNEL_COLOURS.accent}00`,
                            `0 0 0 4px ${FUNNEL_COLOURS.accent}30`,
                            `0 0 0 0 ${FUNNEL_COLOURS.accent}00`,
                          ],
                          borderColor: FUNNEL_COLOURS.accent,
                        }
                      : undefined
                  }
                  transition={{duration: 1.6, repeat: Infinity}}
                />
                {i < TIMELINE_DOTS - 1 ? (
                  <div className="h-px flex-1" style={{backgroundColor: FUNNEL_COLOURS.mockFill}} />
                ) : null}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
