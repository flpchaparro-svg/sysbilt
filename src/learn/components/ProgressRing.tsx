import React from 'react'

export function ProgressRing({
  value,
  size = 52,
  done,
}: {
  value: number
  size?: number
  done?: boolean
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)))
  const complete = done || pct >= 100
  const r = 16
  const c = 2 * Math.PI * r
  const dash = (pct / 100) * c

  return (
    <div className="relative shrink-0" style={{width: size, height: size}} aria-label={`${pct} percent complete`}>
      <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" stroke="currentColor" strokeWidth="2.5" className="text-dark/10" />
        <circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeDasharray={`${dash} ${c}`}
          className={complete ? 'text-gold' : 'text-gold'}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-sans text-[10px] font-medium tabular-nums text-dark">
        {complete ? (
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
            <path d="M3 8.2 6.2 11.5 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        ) : (
          `${pct}%`
        )}
      </span>
    </div>
  )
}
