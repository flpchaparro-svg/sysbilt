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
 * Not linked from public nav. Compact cards so several are visible at once.
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

      <div className="max-w-4xl mx-auto px-5 md:px-8 pt-6 md:pt-8 pb-14 md:pb-20">
        <SysbiltLogo className="w-[96px] md:w-[110px]" />

        <Reveal y={8}>
          <p
            className="mt-7 md:mt-8 font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-[0.28em]"
            style={{color: FUNNEL_COLOURS.steel}}
          >
            Private catalogue
          </p>
        </Reveal>

        <Reveal delay={0.04} y={12}>
          <h1
            className="mt-2.5 font-serif font-bold text-2xl md:text-3xl tracking-tight leading-[1.1] max-w-xl"
            style={{color: FUNNEL_COLOURS.ink}}
          >
            Fixed price, fixed scope, measured result
          </h1>
        </Reveal>

        <Reveal delay={0.08} y={10}>
          <p
            className="mt-2.5 font-sans text-sm md:text-base leading-relaxed max-w-lg"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            One job at a time. You pay once, we deliver, and the outcome is something you can verify.
          </p>
        </Reveal>

        <ul className="mt-8 md:mt-9 grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
          {FUNNEL_PRODUCT_CATALOGUE.map((product, i) => {
            const live = product.status === 'live'
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <p
                    className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
                    style={{color: live ? FUNNEL_COLOURS.goldDeep : FUNNEL_COLOURS.steel}}
                  >
                    {live ? 'Available' : 'Soon'}
                  </p>
                  <p
                    className="font-mono text-xs font-bold tabular-nums shrink-0"
                    style={{color: FUNNEL_COLOURS.ink}}
                  >
                    {product.price}
                  </p>
                </div>
                <h2
                  className="font-serif text-lg md:text-xl tracking-tight mb-1 leading-snug"
                  style={{color: FUNNEL_COLOURS.ink}}
                >
                  {product.title}
                </h2>
                <p
                  className="font-sans text-sm leading-snug line-clamp-2"
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  {product.blurb}
                </p>
                {live ? (
                  <span
                    className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
                    style={{color: FUNNEL_COLOURS.accent}}
                  >
                    Open
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                ) : null}
              </>
            )

            return (
              <Reveal key={product.code} delay={Math.min(0.04 + i * 0.03, 0.35)} y={10}>
                {live ? (
                  <Link
                    to={product.href}
                    className="block h-full border px-4 py-3.5 md:px-4 md:py-4 transition-colors duration-200 hover:bg-white/40"
                    style={{
                      borderColor: `${FUNNEL_COLOURS.ink}18`,
                      backgroundColor: FUNNEL_COLOURS.surface,
                    }}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    className="block h-full border px-4 py-3.5 md:px-4 md:py-4 opacity-70"
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
