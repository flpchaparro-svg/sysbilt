import React from 'react'
import {ArrowRight} from 'lucide-react'
import {Link} from 'react-router-dom'
import {FUNNEL_FOOTER_TEXT} from '../../constants/funnel'

/** Red urgency CTA, same structure as site CTAButton, for /go/ pages only. */
export function FunnelPrimaryLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  if (!href) return null
  return (
    <a
      href={href}
      className="group relative inline-flex px-8 py-4 text-xs font-mono font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-[250ms] active:scale-[0.97] border border-red-text bg-red-text text-cream max-w-full w-auto h-auto min-h-[3rem]"
    >
      <div className="absolute inset-0 bg-red-text group-hover:-translate-y-full transition-transform duration-[250ms]" />
      <div className="absolute inset-0 bg-dark translate-y-full group-hover:translate-y-0 transition-transform duration-[250ms]" />
      <span className="relative z-10 flex items-center justify-center gap-3 flex-wrap text-center text-cream group-hover:text-cream">
        <span className="whitespace-normal leading-relaxed">{children}</span>
        <ArrowRight className="w-4 h-4 shrink-0" />
      </span>
    </a>
  )
}

export function FunnelQuietLink({href, children}: {href: string; children: React.ReactNode}) {
  if (!href) return null
  return (
    <a
      href={href}
      className="font-sans text-sm text-dark/60 hover:text-dark underline underline-offset-4 decoration-dark/20 hover:decoration-dark/50 transition-colors"
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
}: {
  fields: FunnelCtaFields
  quietLabel?: string
}) {
  const mode = fields.ctaMode || 'buy'

  if (mode === 'dual') {
    const options = (fields.priceOptions || []).filter((o) => o?.ctaLabel && o?.stripeUrl)
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {options.map((opt, i) => (
            <div key={i} className="border border-dark/10 p-5 flex flex-col gap-4">
              {opt.label ? (
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-dark/50">
                  {opt.label}
                </p>
              ) : null}
              <FunnelPrimaryLink href={opt.stripeUrl!}>{opt.ctaLabel}</FunnelPrimaryLink>
            </div>
          ))}
        </div>
        {fields.schedulerUrl ? (
          <p>
            <FunnelQuietLink href={fields.schedulerUrl}>{quietLabel}</FunnelQuietLink>
          </p>
        ) : null}
      </div>
    )
  }

  if (mode === 'call') {
    return (
      <div className="space-y-3">
        {fields.schedulerUrl && fields.ctaLabel ? (
          <FunnelPrimaryLink href={fields.schedulerUrl}>{fields.ctaLabel}</FunnelPrimaryLink>
        ) : null}
        {fields.secondaryUrl && fields.secondaryCtaLabel ? (
          <p>
            <FunnelQuietLink href={fields.secondaryUrl}>{fields.secondaryCtaLabel}</FunnelQuietLink>
          </p>
        ) : fields.stripeUrl ? (
          <p>
            <FunnelQuietLink href={fields.stripeUrl}>Or pay now</FunnelQuietLink>
          </p>
        ) : null}
      </div>
    )
  }

  // buy (default)
  return (
    <div className="space-y-3">
      {fields.stripeUrl && fields.ctaLabel ? (
        <FunnelPrimaryLink href={fields.stripeUrl}>{fields.ctaLabel}</FunnelPrimaryLink>
      ) : null}
      {fields.schedulerUrl ? (
        <p>
          <FunnelQuietLink href={fields.schedulerUrl}>{quietLabel}</FunnelQuietLink>
        </p>
      ) : null}
    </div>
  )
}

export function FunnelLegalFooter() {
  return (
    <footer className="mt-20 pt-8 border-t border-dark/10">
      <p className="font-sans text-xs text-dark/45 leading-relaxed">
        {FUNNEL_FOOTER_TEXT}{' '}
        <Link to="/privacy" className="underline underline-offset-2 hover:text-dark">
          Privacy
        </Link>
        .{' '}
        <Link to="/terms" className="underline underline-offset-2 hover:text-dark">
          Terms
        </Link>
        .
      </p>
    </footer>
  )
}
