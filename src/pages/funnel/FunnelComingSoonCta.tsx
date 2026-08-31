import React from 'react'
import {FUNNEL_COLOURS} from './funnelTheme'
import {CtaLabelText} from './funnelCtaLabel'

/**
 * Non-clickable CTA while payment is not wired.
 * Use the real product CTA label. Keep the note quiet and factual.
 */
export function FunnelComingSoonCta({
  label = 'Coming soon',
  size = 'md',
  theme = 'light',
  note = 'Payment is not wired on this page yet. The list price above is the locked price.',
}: {
  label?: string
  size?: 'md' | 'lg' | 'xl' | 'final'
  theme?: 'light' | 'dark'
  note?: string
}) {
  const sizeClass =
    size === 'final'
      ? 'w-full max-w-2xl px-5 py-6 sm:px-8 sm:py-7 text-[14px] md:text-lg tracking-[0.08em] sm:tracking-[0.14em] min-h-[4.75rem] sm:min-h-[5.25rem]'
      : size === 'xl'
        ? 'px-6 py-4 sm:px-11 sm:py-5 text-[13px] sm:text-[15px] tracking-[0.1em] sm:tracking-[0.2em] min-h-[3.5rem] sm:min-h-[4rem]'
        : size === 'lg'
          ? 'px-6 py-4 sm:px-10 sm:py-5 text-[13px] sm:text-sm tracking-[0.1em] sm:tracking-[0.2em] min-h-[3.25rem] sm:min-h-[3.75rem]'
          : 'px-5 py-3.5 sm:px-8 sm:py-4 text-[11px] sm:text-xs tracking-[0.1em] sm:tracking-[0.18em] min-h-[2.75rem] sm:min-h-[3rem]'

  const onDark = theme === 'dark'

  return (
    <div className="flex flex-col items-start gap-3">
      <span
        className={`inline-flex items-center justify-center font-mono font-bold uppercase border ${sizeClass}`}
        style={{
          borderColor: onDark ? `${FUNNEL_COLOURS.onInk}35` : `${FUNNEL_COLOURS.ink}28`,
          backgroundColor: onDark ? 'transparent' : `${FUNNEL_COLOURS.ink}1C`,
          color: onDark ? `${FUNNEL_COLOURS.onInk}90` : FUNNEL_COLOURS.steel,
        }}
      >
        <CtaLabelText label={label} />
      </span>
      <p
        className="font-sans text-sm leading-relaxed max-w-md"
        style={{color: onDark ? `${FUNNEL_COLOURS.onInk}70` : FUNNEL_COLOURS.muted}}
      >
        {note}
      </p>
    </div>
  )
}
