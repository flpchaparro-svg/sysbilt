import React, {useEffect, useRef, useState} from 'react'
import {ArrowRight, ChevronDown} from 'lucide-react'
import {Link} from 'react-router-dom'
import {FUNNEL_FOOTER_TEXT} from '../../constants/funnel'
import {FUNNEL_COLOURS} from './funnelTheme'

export type FunnelCtaSize = 'md' | 'lg' | 'xl' | 'final'

function ctaSizeClass(size: FunnelCtaSize): string {
  switch (size) {
    case 'final':
      // Slightly tighter tracking on small screens so label + arrow stay one line.
      return 'w-full max-w-2xl px-8 py-7 sm:px-10 md:px-14 md:py-8 text-[15px] sm:text-base md:text-lg tracking-[0.12em] sm:tracking-[0.18em] md:tracking-[0.22em] min-h-[5.25rem] md:min-h-[5.75rem] justify-center shadow-[0_18px_50px_-12px_rgba(226,30,63,0.55)]'
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
        className={`relative z-10 inline-flex items-center justify-center flex-nowrap whitespace-nowrap ${
          size === 'final' ? 'gap-3 sm:gap-4 md:gap-5' : 'gap-3'
        }`}
        style={{color: FUNNEL_COLOURS.onInk}}
      >
        <span className="leading-none">{children}</span>
        <ArrowRight className={iconClass} aria-hidden />
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

/** Single source of truth for hero / price / final CTA blocks. Buy mode is pay only — no scheduler escape hatch. */
export function FunnelCtaBlock({
  fields,
  theme = 'light',
  size = 'md',
  align = 'start',
}: {
  fields: FunnelCtaFields
  theme?: 'light' | 'dark'
  size?: FunnelCtaSize
  align?: 'start' | 'center'
}) {
  const mode = fields.ctaMode || 'buy'
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
    if (options.length < 2) {
      const only = options[0]
      return (
        <div className={`flex flex-col ${alignClass}`}>
          {buttonOrFallback(only?.stripeUrl || fields.stripeUrl, only?.ctaLabel || fields.ctaLabel)}
        </div>
      )
    }
    return (
      <div className={`flex flex-col ${alignClass}`}>
        <DualSwapCta options={options} size={size} />
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
    <div className={`flex flex-col ${alignClass}`}>
      {buttonOrFallback(fields.stripeUrl, fields.ctaLabel)}
    </div>
  )
}

/**
 * One primary CTA that cycles option labels, then expands on hover/tap
 * so both Stripe links stay one click away without two side-by-side red bricks.
 */
function DualSwapCta({
  options,
  size,
}: {
  options: Array<{label?: string | null; ctaLabel?: string | null; stripeUrl?: string | null}>
  size: FunnelCtaSize
}) {
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (open || reduceMotion || options.length < 2) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % options.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [open, reduceMotion, options.length])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const current = options[index] || options[0]
  const btnSize = size === 'final' ? 'lg' : size
  const iconClass = btnSize === 'md' ? 'w-4 h-4 shrink-0' : 'w-5 h-5 shrink-0'
  const optionPad =
    btnSize === 'xl' || btnSize === 'lg'
      ? 'px-8 py-4 text-xs tracking-[0.18em] min-h-[3.25rem]'
      : 'px-6 py-3.5 text-[11px] tracking-[0.16em] min-h-[2.85rem]'

  return (
    <div
      ref={rootRef}
      className="relative w-full max-w-xl"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={`group relative inline-flex w-full font-mono font-bold uppercase overflow-hidden transition-all duration-[250ms] active:scale-[0.97] border ${ctaSizeClass(btnSize)}`}
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
          className="relative z-10 inline-flex w-full items-center justify-between gap-3 px-1"
          style={{color: FUNNEL_COLOURS.onInk}}
        >
          <span className="leading-none text-left truncate">{current.ctaLabel}</span>
          <span className="inline-flex items-center gap-2 shrink-0">
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              aria-hidden
            />
            <ArrowRight className={iconClass} aria-hidden />
          </span>
        </span>
      </button>

      {/* pt-1 keeps the hit area continuous so the mouse never "leaves" between button and menu */}
      <div
        className={`absolute left-0 right-0 top-full z-30 pt-1 transition-all duration-200 ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        <div role="menu" className="flex flex-col gap-1.5">
          {options.map((opt, i) => {
            const active = i === index
            return (
              <a
                key={i}
                role="menuitem"
                href={opt.stripeUrl!}
                onMouseEnter={() => setIndex(i)}
                className={`group/opt relative inline-flex w-full items-center justify-between gap-3 font-mono font-bold uppercase overflow-hidden border transition-all duration-200 active:scale-[0.98] ${optionPad}`}
                style={{
                  borderColor: active ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.accentDeep,
                  backgroundColor: active ? FUNNEL_COLOURS.accent : FUNNEL_COLOURS.accentDeep,
                  color: FUNNEL_COLOURS.onInk,
                  boxShadow: active
                    ? '0 14px 32px -16px rgba(226,30,63,0.55)'
                    : '0 10px 28px -18px rgba(226,30,63,0.35)',
                }}
              >
                <span className="min-w-0 text-left leading-none truncate">{opt.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden />
              </a>
            )
          })}
        </div>
      </div>
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
