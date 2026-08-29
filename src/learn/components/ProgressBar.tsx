import React from 'react'

export function ProgressBar({value, label}: {value: number; label?: string}) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)))
  return (
    <div>
      {label ? (
        <p className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-dark/50">{label}</p>
      ) : null}
      <div className="h-3 w-full bg-dark/10" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="h-full bg-gold transition-[width] duration-500"
          style={{width: `${pct}%`, boxShadow: '6px 6px 0 0 rgba(197,160,89,0.45)'}}
        />
      </div>
    </div>
  )
}
