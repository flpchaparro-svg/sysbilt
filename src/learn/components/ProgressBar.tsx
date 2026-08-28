import React from 'react'

export function ProgressBar({value, label}: {value: number; label?: string}) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)))
  return (
    <div>
      {label ? (
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-dark/50">{label}</p>
      ) : null}
      <div className="h-[3px] w-full bg-dark/10" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full bg-gold transition-[width] duration-300" style={{width: `${pct}%`}} />
      </div>
    </div>
  )
}
