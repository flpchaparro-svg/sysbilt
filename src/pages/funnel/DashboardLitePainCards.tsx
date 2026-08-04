import React, {useRef} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {FUNNEL_COLOURS} from './funnelTheme'

const EASE = [0.16, 1, 0.3, 1] as const

function Card({
  index,
  title,
  children,
}: {
  index: string
  title: string
  children: (opts: {play: boolean; reduce: boolean | null}) => React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {once: true, amount: 0.35})
  const reduce = useReducedMotion()
  const play = Boolean(inView && !reduce)

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl p-5 md:p-6 border"
      style={{
        borderColor: `${FUNNEL_COLOURS.ink}12`,
        backgroundColor: FUNNEL_COLOURS.surface,
      }}
      initial={reduce ? false : {opacity: 0, y: 20, scale: 0.98}}
      whileInView={{opacity: 1, y: 0, scale: 1}}
      viewport={{once: true, amount: 0.3}}
      transition={{type: 'spring', stiffness: 280, damping: 22}}
    >
      <p
        className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
        style={{color: FUNNEL_COLOURS.goldDeep}}
      >
        {index}
      </p>
      <h3 className="font-serif text-xl font-bold mb-4" style={{color: FUNNEL_COLOURS.ink}}>
        {title}
      </h3>
      {children({play, reduce})}
    </motion.div>
  )
}

export function DashboardLitePainCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
      <Card index="01" title="Ads look fine until enquiries">
        {({play, reduce}) => (
          <div className="space-y-3 py-1">
            {[
              {label: 'Ad spend view', value: 'Green', ok: true},
              {label: 'Enquiry count', value: 'Quiet', ok: false},
            ].map((row, i) => (
              <div key={row.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[7px] uppercase tracking-wide" style={{color: FUNNEL_COLOURS.steel}}>
                    {row.label}
                  </span>
                  <span
                    className="font-mono text-[7px] font-bold"
                    style={{color: row.ok ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.accent}}
                  >
                    {row.value}
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{backgroundColor: `${FUNNEL_COLOURS.ink}2C`}}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{backgroundColor: row.ok ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.accent}}
                    initial={reduce ? false : {width: '0%'}}
                    animate={play || reduce ? {width: row.ok ? '88%' : '32%'} : {width: '0%'}}
                    transition={{duration: 0.55, delay: 0.1 + i * 0.15, ease: EASE}}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card index="02" title="Bookings and reviews never meet">
        {({play, reduce}) => (
          <div className="space-y-2 py-1">
            {['Bookings tab', 'Reviews tab', 'Never compared'].map((label, i) => (
              <motion.div
                key={label}
                className="flex items-center justify-between rounded-lg border px-3 py-2"
                style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: '#fff'}}
                initial={reduce ? false : {opacity: 0, x: -6}}
                animate={play || reduce ? {opacity: 1, x: 0} : {opacity: 0.4}}
                transition={{delay: reduce ? 0 : i * 0.1, duration: 0.35, ease: EASE}}
              >
                <span className="font-sans text-[12px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
                  {label}
                </span>
                <span className="font-mono text-[8px] font-bold uppercase tracking-wide" style={{color: FUNNEL_COLOURS.accent}}>
                  Split
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      <Card index="03" title="Meetings run on vibes">
        {({play}) => (
          <div className="flex flex-col items-center justify-center gap-3 py-2">
            <div
              className="w-full rounded-lg border px-3 py-3 text-center"
              style={{borderColor: `${FUNNEL_COLOURS.ink}14`, backgroundColor: '#fff'}}
            >
              <p className="font-mono text-[8px] uppercase tracking-wide mb-1" style={{color: FUNNEL_COLOURS.steel}}>
                Staff report
              </p>
              <p className="font-sans text-[13px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
                Feels busy this week
              </p>
            </div>
            <motion.span
              className="font-mono text-[9px] font-bold uppercase tracking-[0.14em]"
              style={{color: FUNNEL_COLOURS.accent}}
              animate={play ? {opacity: [0.45, 1, 0.45]} : {opacity: 0.7}}
              transition={{duration: 1.8, repeat: Infinity, ease: 'easeInOut'}}
            >
              No shared number
            </motion.span>
          </div>
        )}
      </Card>

      <Card index="04" title="Still screenshotting into Slack">
        {({play, reduce}) => (
          <div className="relative flex flex-col items-center justify-center gap-2 py-2">
            <motion.div
              className="rounded-lg border border-dashed px-4 py-3 text-center w-full"
              style={{borderColor: `${FUNNEL_COLOURS.accent}45`, backgroundColor: `${FUNNEL_COLOURS.accent}08`}}
              initial={reduce ? false : {opacity: 0, scale: 0.96}}
              animate={play || reduce ? {opacity: 1, scale: 1} : {opacity: 0.5}}
            >
              <p className="font-mono text-[8px] uppercase tracking-wide mb-1" style={{color: FUNNEL_COLOURS.accent}}>
                Tool stack
              </p>
              <p className="font-sans text-[13px] font-semibold" style={{color: FUNNEL_COLOURS.ink}}>
                Paid for dashboards, paste cropped charts
              </p>
            </motion.div>
            <motion.p
              className="font-mono text-[8px] font-bold uppercase tracking-[0.14em]"
              style={{color: FUNNEL_COLOURS.accent}}
              animate={play ? {opacity: [0.4, 1, 0.4]} : {opacity: 0.65}}
              transition={{duration: 2, repeat: Infinity, ease: 'easeInOut'}}
            >
              No single pane
            </motion.p>
          </div>
        )}
      </Card>
    </div>
  )
}
