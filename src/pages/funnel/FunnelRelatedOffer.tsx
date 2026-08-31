import React from 'react'
import {Link} from 'react-router-dom'
import {ArrowRight} from 'lucide-react'
import {FUNNEL_COLOURS} from './funnelTheme'
import {Reveal} from './funnelReveal'
import type {FunnelRelatedOffer as Related} from './funnelRelated'

export function FunnelRelatedOffer({
  offer,
  business,
}: {
  offer: Related
  business?: string | null
}) {
  const href = business
    ? `${offer.product.href}?b=${encodeURIComponent(business)}`
    : offer.product.href

  return (
    <section className="max-w-3xl mx-auto px-6 md:px-10 pb-16 md:pb-24">
      <div
        className="h-px w-12 mb-10 md:mb-12"
        style={{backgroundColor: FUNNEL_COLOURS.gold}}
        aria-hidden
      />
      <Reveal y={10}>
        <p
          className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.28em] mb-4"
          style={{color: FUNNEL_COLOURS.steel}}
        >
          Works well with
        </p>
      </Reveal>
      <Reveal delay={0.06} y={14}>
        <Link
          to={href}
          className="relative block border pl-5 pr-4 py-4 md:py-5 transition-colors duration-200 hover:bg-white/40"
          style={{
            borderColor: `${FUNNEL_COLOURS.goldDeep}55`,
            backgroundColor: FUNNEL_COLOURS.surface,
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px]"
            style={{backgroundColor: FUNNEL_COLOURS.goldDeep}}
            aria-hidden
          />
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h2
              className="font-serif text-xl md:text-2xl tracking-tight leading-snug"
              style={{color: FUNNEL_COLOURS.ink}}
            >
              {offer.product.title}
            </h2>
            <p
              className="font-mono text-sm font-bold tabular-nums shrink-0 mt-1"
              style={{color: FUNNEL_COLOURS.ink}}
            >
              {offer.product.price}
            </p>
          </div>
          <p
            className="font-sans text-sm md:text-[15px] leading-relaxed max-w-xl"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            {offer.why}
          </p>
          <span
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{color: FUNNEL_COLOURS.accent}}
          >
            Open
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </Reveal>
    </section>
  )
}
