import React from 'react'
import {Link} from 'react-router-dom'
import {ArrowRight} from 'lucide-react'
import {SysbiltLogo} from '../../components/SysbiltLogo'
import {PageMeta} from '../../components/PageMeta'
import {SITE_ORIGIN} from '../../constants/seoMeta'
import {FUNNEL_PRODUCT_CATALOGUE} from '../../constants/funnel'
import {FunnelLegalFooter} from './FunnelCtaBlock'
import {FUNNEL_COLOURS, FUNNEL_CSS_VARS} from './funnelTheme'
import {Reveal} from './funnelReveal'

/**
 * Private /go index — product catalogue for SYSBILT wedge offers.
 * Not linked from public nav. Template for adding more products later.
 */
const FunnelHomePage: React.FC = () => {
  return (
    <div
      className="min-h-screen font-sans"
      style={{
        ...FUNNEL_CSS_VARS,
        backgroundColor: FUNNEL_COLOURS.ground,
        color: FUNNEL_COLOURS.ink,
      }}
    >
      <PageMeta
        title="Fixed-price fixes | SYSBILT"
        description="Private catalogue of fixed-price SYSBILT productised offers. Not listed on the public site."
        canonical={`${SITE_ORIGIN}/go`}
        robots="noindex, nofollow"
      />

      <div className="max-w-3xl mx-auto px-6 md:px-10 pt-8 pb-16 md:pb-24">
        <SysbiltLogo className="w-[110px] md:w-[130px]" />

        <Reveal y={10}>
          <p
            className="mt-10 md:mt-12 font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.28em]"
            style={{color: FUNNEL_COLOURS.steel}}
          >
            Private catalogue
          </p>
        </Reveal>

        <Reveal delay={0.06} y={18}>
          <h1
            className="mt-4 font-serif font-bold text-4xl md:text-5xl tracking-tight leading-[1.05] max-w-2xl"
            style={{color: FUNNEL_COLOURS.ink}}
          >
            Fixed price, fixed scope, measured result
          </h1>
        </Reveal>

        <Reveal delay={0.12} y={12}>
          <p
            className="mt-5 font-sans text-base md:text-lg leading-relaxed max-w-xl"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            One job at a time. You pay once, we deliver, and the outcome is something you can verify.
          </p>
        </Reveal>

        <ul className="mt-12 md:mt-14 space-y-4">
          {FUNNEL_PRODUCT_CATALOGUE.map((product, i) => {
            const live = product.status === 'live'
            const inner = (
              <>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <p
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.22em]"
                    style={{color: live ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.steel}}
                  >
                    {live ? 'Available' : 'Coming soon'}
                  </p>
                  <p
                    className="font-mono text-sm font-bold tabular-nums"
                    style={{color: FUNNEL_COLOURS.ink}}
                  >
                    {product.price}
                  </p>
                </div>
                <h2
                  className="font-serif text-2xl md:text-3xl tracking-tight mb-2"
                  style={{color: FUNNEL_COLOURS.ink}}
                >
                  {product.title}
                </h2>
                <p
                  className="font-sans text-base leading-relaxed max-w-xl"
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  {product.blurb}
                </p>
                {live ? (
                  <span
                    className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
                    style={{color: FUNNEL_COLOURS.accent}}
                  >
                    Open offer
                    <ArrowRight className="w-4 h-4" />
                  </span>
                ) : null}
              </>
            )

            return (
              <Reveal key={product.code} delay={0.08 + i * 0.06} y={14}>
                {live ? (
                  <Link
                    to={product.href}
                    className="block border p-6 md:p-7 transition-colors duration-200 hover:bg-white/40"
                    style={{
                      borderColor: `${FUNNEL_COLOURS.ink}18`,
                      backgroundColor: FUNNEL_COLOURS.surface,
                    }}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    className="block border p-6 md:p-7 opacity-70"
                    style={{
                      borderColor: `${FUNNEL_COLOURS.ink}12`,
                      backgroundColor: FUNNEL_COLOURS.surface,
                    }}
                  >
                    {inner}
                  </div>
                )}
              </Reveal>
            )
          })}
        </ul>

        <FunnelLegalFooter />
      </div>
    </div>
  )
}

export default FunnelHomePage
