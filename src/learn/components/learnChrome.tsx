import React from 'react'

export const learnEase = [0.16, 1, 0.3, 1] as const

export function LessonChartGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(26,26,26,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,26,26,0.045) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage:
          'linear-gradient(to bottom, transparent 0, #000 72px, #000 calc(100% - 64px), transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0, #000 72px, #000 calc(100% - 64px), transparent 100%)',
      }}
    />
  )
}

export function Kicker({children}: {children: React.ReactNode}) {
  return (
    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-on-cream">
      / {children}
    </p>
  )
}

export function Marker({children}: {children: React.ReactNode}) {
  return (
    <p className="font-sans text-[11px] font-medium tracking-[0.16em] text-dark/45 tabular-nums">{children}</p>
  )
}

export function Chip({children}: {children: React.ReactNode}) {
  return (
    <span className="inline-flex border border-dark/20 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-dark/70">
      {children}
    </span>
  )
}

export function GoldRule({className = 'mt-6'}: {className?: string}) {
  return <span className={`block h-[2px] w-[7.5rem] bg-gold ${className}`} />
}

export function StampWell({
  children,
  className = '',
  ink = false,
}: {
  children: React.ReactNode
  className?: string
  ink?: boolean
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="pointer-events-none absolute left-2 top-2 -bottom-2 -right-2 border border-gold"
        aria-hidden
      />
      <div className={`relative ${ink ? 'bg-dark text-cream' : 'bg-cream-warm'}`}>{children}</div>
    </div>
  )
}

export function PageHead({
  kicker,
  title,
  marker,
  children,
}: {
  kicker: string
  title: string
  marker?: string
  children?: React.ReactNode
}) {
  return (
    <header>
      <div className="flex items-start justify-between gap-4">
        <Kicker>{kicker}</Kicker>
        {marker ? <Marker>{marker}</Marker> : null}
      </div>
      <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-tight md:text-5xl">{title}</h1>
      <GoldRule />
      {children ? <div className="mt-5 max-w-xl text-sm leading-relaxed text-dark/70">{children}</div> : null}
    </header>
  )
}

export function SectionHead({
  kicker,
  title,
  action,
}: {
  kicker?: string
  title: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {kicker ? <Kicker>{kicker}</Kicker> : null}
        <h2 className={`font-serif text-2xl font-medium md:text-3xl ${kicker ? 'mt-3' : ''}`}>{title}</h2>
      </div>
      {action}
    </div>
  )
}

export function StatTile({label, value}: {label: string; value: string}) {
  return (
    <StampWell>
      <div className="px-5 py-5">
        <Kicker>{label}</Kicker>
        <p
          className="mt-4 font-serif text-5xl font-medium leading-none tracking-tight text-gold-on-cream tabular-nums"
          style={{textShadow: '4px 4px 0 rgba(197,160,89,0.4)'}}
        >
          {value}
        </p>
      </div>
    </StampWell>
  )
}

export const learnBtn =
  'inline-flex min-h-[3rem] items-center justify-center bg-dark px-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-[6px_6px_0_0_#C5A059]'

export const learnLink =
  'font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-dark/45 underline-offset-4 hover:text-gold-on-cream hover:underline'

export function LearnPage({children}: {children: React.ReactNode}) {
  return (
    <div className="relative overflow-visible pb-4">
      <LessonChartGrid />
      <div className="relative">{children}</div>
    </div>
  )
}
