import React from 'react'
import {FUNNEL_COLOURS} from './funnelTheme'

/** Non-clickable CTA for Coming Soon draft pages. No Stripe, no form. */
export function FunnelComingSoonCta({
  label = 'Coming soon',
  size = 'md',
  theme = 'light',
}: {
  label?: string
  size?: 'md' | 'lg' | 'xl' | 'final'
  theme?: 'light' | 'dark'
}) {
  const sizeClass =
    size === 'final'
      ? 'w-full max-w-2xl px-8 py-7 text-[15px] md:text-lg tracking-[0.14em] min-h-[5.25rem]'
      : size === 'xl'
        ? 'px-11 py-5 text-[15px] tracking-[0.2em] min-h-[4rem]'
        : size === 'lg'
          ? 'px-10 py-5 text-sm tracking-[0.2em] min-h-[3.75rem]'
          : 'px-8 py-4 text-xs tracking-[0.18em] min-h-[3rem]'

  const onDark = theme === 'dark'

  return (
    <div className="flex flex-col items-start gap-3">
      <span
        className={`inline-flex items-center justify-center font-mono font-bold uppercase border ${sizeClass}`}
        style={{
          borderColor: onDark ? `${FUNNEL_COLOURS.onInk}35` : `${FUNNEL_COLOURS.ink}28`,
          backgroundColor: onDark ? 'transparent' : `${FUNNEL_COLOURS.ink}08`,
          color: onDark ? `${FUNNEL_COLOURS.onInk}90` : FUNNEL_COLOURS.steel,
        }}
      >
        {label}
      </span>
      <p
        className="font-sans text-sm leading-relaxed max-w-md"
        style={{color: onDark ? `${FUNNEL_COLOURS.onInk}70` : FUNNEL_COLOURS.muted}}
      >
        Draft for review only. Not for sale yet. No payment link and no form wired.
      </p>
    </div>
  )
}
