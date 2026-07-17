import React from 'react'
import {ArrowRight} from 'lucide-react'
import {Link} from 'react-router-dom'
import {FUNNEL_FOOTER_TEXT} from '../../constants/funnel'
import {FUNNEL_COLOURS} from './funnelTheme'

export type FunnelCtaSize = 'md' | 'lg' | 'xl' | 'final'

function ctaSizeClass(size: FunnelCtaSize): string {
  switch (size) {
    case 'final':
      return 'w-full max-w-2xl px-10 py-7 md:px-14 md:py-8 text-base md:text-lg tracking-[0.18em] md:tracking-[0.22em] min-h-[5.25rem] md:min-h-[5.75rem] justify-center shadow-[0_18px_50px_-12px_rgba(226,30,63,0.55)]'
    case 'xl':
      return 'px-11 py-5 text-[15px] tracking-[0.22em] min-h-[4rem]'
    case 'lg':
      return 'px-10 py-5 text-sm tracking-[0.22em] min-h-[3.75rem]'
    default:
      return 'px-8 py-4 text-xs tracking-[0.2em] min-h-[3rem]'
  }
}

/** Isolation-effect CTA — accent red only, for /go/ pages. */
export function FunnelPrimaryLink({
  href,
  children,
  size = 'md',
}: {
  href: string
  children: React.ReactNode
  size?: FunnelCtaSize
}) {
  if (!href) return null
  const iconClass =
    size === 'final' ? 'w-6 h-6 shrink-0' : size === 'md' ? 'w-4 h-4 shrink-0' : 'w-5 h-5 shrink-0'
  return (
    <a
      href={href}
      className={`group relative inline-flex font-mono font-bold uppercase overflow-hidden transition-all duration-[250ms] active:scale-[0.97] max-w-full h-auto border ${ctaSizeClass(size)}`}
      style={{
        borderColor: FUNNEL_COLOURS.accent,
        backgroundColor: FUNNEL_COLOURS.accent,
        color: FUNNEL_COLOURS.onInk,
      }}
    >
      <div
        className="absolute inset-0 group-hover:-translate-y-full transition-transform duration-[250ms]"
        style={{backgroundColor: FUNNEL_COLOURS.accent}}
      />
      <div
        className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-[250ms]"
        style={{backgroundColor: FUNNEL_COLOURS.accentDeep}}
      />
      <span
        className={`relative z-10 flex items-center justify-center flex-wrap text-center ${
          size === 'final' ? 'gap-4 md:gap-5' : 'gap-3'
        }`}
        style={{color: FUNNEL_COLOURS.onInk}}
      >
        <span className="whitespace-normal leading-relaxed">{children}</span>
        <ArrowRight className={iconClass} />
      </span>
    </a>
  )
}

export function FunnelQuietLink({
  href,
  children,
  theme = 'light',
}: {
  href: string
  children: React.ReactNode
  theme?: 'light' | 'dark'
}) {
  if (!href) return null
  const cls =
    theme === 'dark'
      ? 'font-sans text-sm underline underline-offset-4 transition-colors opacity-60 hover:opacity-100'
      : 'font-sans text-sm underline underline-offset-4 transition-colors'
  return (
    <a
      href={href}
      className={cls}
      style={
        theme === 'dark'
          ? {color: FUNNEL_COLOURS.onInk, textDecorationColor: `${FUNNEL_COLOURS.onInk}40`}
          : {color: FUNNEL_COLOURS.steel, textDecorationColor: `${FUNNEL_COLOURS.steel}40`}
      }
    >
      {children}
    </a>
  )
}

export type FunnelCtaFields = {
  ctaMode?: 'buy' | 'call' | 'dual' | string
  ctaLabel?: string | null
  stripeUrl?: string | null
  schedulerUrl?: string | null
  secondaryCtaLabel?: string | null
  secondaryUrl?: string | null
  priceOptions?: Array<{
    label?: string | null
    ctaLabel?: string | null
    stripeUrl?: string | null
  }> | null
}

/** Single source of truth for hero / price / final CTA blocks. */
export function FunnelCtaBlock({
  fields,
  quietLabel = 'Prefer to talk first? Book 15 minutes.',
  theme = 'light',
  size = 'md',
  align = 'start',
}: {
  fields: FunnelCtaFields
  quietLabel?: string
  theme?: 'light' | 'dark'
  size?: FunnelCtaSize
  align?: 'start' | 'center'
}) {
  const mode = fields.ctaMode || 'buy'
  const large = size === 'lg' || size === 'xl' || size === 'final'
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  const buttonOrFallback = (href: string | null | undefined, label: string | null | undefined) => {
    if (href && label) return <FunnelPrimaryLink href={href} size={size}>{label}</FunnelPrimaryLink>
    if (label) {
      return (
        <span
          className={`inline-flex font-mono font-bold uppercase border items-center ${ctaSizeClass(size)}`}
          style={{
            borderColor: FUNNEL_COLOURS.accent,
            backgroundColor: FUNNEL_COLOURS.accent,
            color: FUNNEL_COLOURS.onInk,
          }}
        >
          {label}
        </span>
      )
    }
    return null
  }

  if (mode === 'dual') {
    const options = (fields.priceOptions || []).filter((o) => o?.ctaLabel && o?.stripeUrl)
    return (
      <div className={`flex flex-col space-y-6 ${alignClass}`}>
        <div className="grid gap-4 sm:grid-cols-2 w-full">
          {options.map((opt, i) => (
            <div
              key={i}
              className="p-5 flex flex-col gap-4 border"
              style={{borderColor: `${FUNNEL_COLOURS.ink}18`}}
            >
              {opt.label ? (
                <p
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  {opt.label}
                </p>
              ) : null}
              <FunnelPrimaryLink href={opt.stripeUrl!} size={size}>
                {opt.ctaLabel}
              </FunnelPrimaryLink>
            </div>
          ))}
        </div>
        {fields.schedulerUrl ? (
          <p className={large ? 'text-[15px]' : undefined}>
            <FunnelQuietLink href={fields.schedulerUrl} theme={theme}>
              {quietLabel}
            </FunnelQuietLink>
          </p>
        ) : null}
      </div>
    )
  }

  if (mode === 'call') {
    return (
      <div className={`flex flex-col space-y-3 ${alignClass}`}>
        {buttonOrFallback(fields.schedulerUrl, fields.ctaLabel)}
        {fields.secondaryUrl && fields.secondaryCtaLabel ? (
          <p>
            <FunnelQuietLink href={fields.secondaryUrl} theme={theme}>
              {fields.secondaryCtaLabel}
            </FunnelQuietLink>
          </p>
        ) : fields.stripeUrl ? (
          <p>
            <FunnelQuietLink href={fields.stripeUrl} theme={theme}>
              Or pay now
            </FunnelQuietLink>
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <div className={`flex flex-col space-y-4 ${alignClass}`}>
      {buttonOrFallback(fields.stripeUrl, fields.ctaLabel)}
      {fields.schedulerUrl ? (
        <p className={size === 'final' ? 'text-sm md:text-base [&_a]:opacity-70' : large ? '[&_a]:text-[15px]' : undefined}>
          <FunnelQuietLink href={fields.schedulerUrl} theme={theme}>
            {quietLabel}
          </FunnelQuietLink>
        </p>
      ) : null}
    </div>
  )
}

export function FunnelLegalFooter({theme = 'light'}: {theme?: 'light' | 'dark'}) {
  const muted = theme === 'dark' ? `${FUNNEL_COLOURS.onInk}70` : FUNNEL_COLOURS.muted
  const link = theme === 'dark' ? `${FUNNEL_COLOURS.onInk}90` : FUNNEL_COLOURS.steel
  const rule = theme === 'dark' ? `${FUNNEL_COLOURS.onInk}18` : `${FUNNEL_COLOURS.ink}14`
  return (
    <footer className="mt-16 md:mt-20 pt-8 border-t" style={{borderColor: rule}}>
      <p className="font-sans text-xs leading-relaxed" style={{color: muted}}>
        {FUNNEL_FOOTER_TEXT}{' '}
        <Link
          to="/privacy"
          className="underline underline-offset-2"
          style={{color: link}}
        >
          Privacy
        </Link>
        .{' '}
        <Link
          to="/terms"
          className="underline underline-offset-2"
          style={{color: link}}
        >
          Terms
        </Link>
        .
      </p>
    </footer>
  )
}
