import React, {useMemo, useState} from 'react'
import {Link} from 'react-router-dom'
import {ArrowRight} from 'lucide-react'
import {SysbiltLogo} from '../../components/SysbiltLogo'
import {PageMeta} from '../../components/PageMeta'
import {SITE_ORIGIN} from '../../constants/seoMeta'
import {
  FUNNEL_PRODUCT_CATALOGUE,
  type FunnelLane,
  type FunnelProductCard,
  type FunnelProductCode,
} from '../../constants/funnel'
import {FunnelLegalFooter} from './FunnelCtaBlock'
import {FUNNEL_COLOURS, FUNNEL_CSS_VARS} from './funnelTheme'
import {Reveal} from './funnelReveal'

type HomeTab = 'outbound' | 'warm'

type CatalogueGroup = {
  title: string
  blurb: string
  codes: FunnelProductCode[]
}

/** Outbound tab: cold doors + related drafts, by service, then bundles, then promos. */
const OUTBOUND_GROUPS: CatalogueGroup[] = [
  {
    title: 'Website and search',
    blurb: 'Speed, findability, pages that convert, and proof you can measure.',
    codes: [
      'speed-fix',
      'website',
      'search-fix',
      'landing-page',
      'conversion-pass',
      'onpage-search',
      'schema-faq',
      'tracking-forms',
      'site-chat',
      'media-clean',
      'a11y-pass',
      'geo',
    ],
  },
  {
    title: 'Google and local',
    blurb: 'Profile, reviews, and staying visible on Maps.',
    codes: [
      'google-profile',
      'reviews',
      'profile-posting',
      'local-pack',
    ],
  },
  {
    title: 'Phone and appointments',
    blurb: 'Catch the call, book the slot, cover after hours.',
    codes: ['missed-call', 'booking', 'ai-phone', 'noshow-rescue'],
  },
  {
    title: 'CRM and chase',
    blurb: 'Enquiries caught, replied, and followed up.',
    codes: [
      'enquiry-reply',
      'crm-rescue',
      'whatsapp-setup',
      'dm-reply',
      'quote-followup',
      'intake-forms',
    ],
  },
  {
    title: 'Bundles',
    blurb: 'Combined scopes at a list price.',
    codes: ['bundle-clinic', 'bundle-speed-next', 'bundle-front-door'],
  },
  {
    title: 'Promotions',
    blurb: 'Entry hooks and commercial experiments. Draft only.',
    codes: ['website-hook'],
  },
]

/** Warm tab: scoping / training / longer relationships. */
const WARM_GROUPS: CatalogueGroup[] = [
  {
    title: 'Team and rollout',
    blurb: 'Training, change, and playbooks before the software wins.',
    codes: ['team-ai', 'change-pack', 'sop-playbook', 'inbox-triage'],
  },
  {
    title: 'Content and websites',
    blurb: 'Ongoing content and the hosted website plan.',
    codes: ['content-system', 'website', 'client-finder'],
  },
  {
    title: 'Clarity',
    blurb: 'See the week without a data team.',
    codes: ['dashboard-lite'],
  },
]

function laneStyles(lane: FunnelLane): {
  badge: string
  badgeLabel: string
  border: string
  bar: string
} {
  switch (lane) {
    case 'outbound':
      return {
        badge: FUNNEL_COLOURS.accent,
        badgeLabel: 'Outbound',
        border: `${FUNNEL_COLOURS.accent}55`,
        bar: FUNNEL_COLOURS.accent,
      }
    case 'warm':
      return {
        badge: FUNNEL_COLOURS.goldDeep,
        badgeLabel: 'Warm',
        border: `${FUNNEL_COLOURS.goldDeep}55`,
        bar: FUNNEL_COLOURS.goldDeep,
      }
    default:
      return {
        badge: FUNNEL_COLOURS.steel,
        badgeLabel: 'Draft',
        border: `${FUNNEL_COLOURS.ink}14`,
        bar: FUNNEL_COLOURS.steel,
      }
  }
}

function ProductCard({product, index}: {product: FunnelProductCard; index: number}) {
  const lane = laneStyles(product.lane)
  return (
    <li className="list-none">
      <Reveal delay={Math.min(0.02 + index * 0.02, 0.22)} y={8}>
        <Link
          to={product.href}
          className="relative block h-full border pl-5 pr-4 py-3.5 md:py-4 transition-colors duration-200 hover:bg-white/40"
          style={{
            borderColor: lane.border,
            backgroundColor: FUNNEL_COLOURS.surface,
            opacity: product.lane === 'soon' ? 0.92 : 1,
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px]"
            style={{backgroundColor: lane.bar}}
            aria-hidden
          />
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <p
              className="font-mono text-[9px] font-bold uppercase tracking-[0.2em]"
              style={{color: lane.badge}}
            >
              {lane.badgeLabel}
            </p>
            <p
              className="font-mono text-xs font-bold tabular-nums shrink-0"
              style={{color: FUNNEL_COLOURS.ink}}
            >
              {product.price}
            </p>
          </div>
          <h3
            className="font-serif text-lg md:text-xl tracking-tight mb-1 leading-snug"
            style={{color: FUNNEL_COLOURS.ink}}
          >
            {product.title}
          </h3>
          <p
            className="font-sans text-sm leading-snug line-clamp-2"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            {product.blurb}
          </p>
          <span
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
            style={{
              color: product.lane === 'soon' ? FUNNEL_COLOURS.steel : FUNNEL_COLOURS.accent,
            }}
          >
            {product.lane === 'soon' ? 'Read draft' : 'Open'}
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </Reveal>
    </li>
  )
}

/**
 * Private /go index. Two tabs (Outbound / Warm), then service groups, bundles, promos.
 */
const FunnelHomePage: React.FC = () => {
  const [tab, setTab] = useState<HomeTab>('outbound')
  const byCode = useMemo(() => {
    const map = new Map<FunnelProductCode, FunnelProductCard>()
    for (const p of FUNNEL_PRODUCT_CATALOGUE) map.set(p.code, p)
    return map
  }, [])

  const groups = tab === 'outbound' ? OUTBOUND_GROUPS : WARM_GROUPS

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
          <div
            className="mt-5 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Catalogue mode"
          >
            {(
              [
                {
                  id: 'outbound' as const,
                  label: 'Outbound doors',
                  hint: 'Cold email and buy paths',
                  activeColor: FUNNEL_COLOURS.accent,
                },
                {
                  id: 'warm' as const,
                  label: 'Warm scoping',
                  hint: 'Call or qualify first',
                  activeColor: FUNNEL_COLOURS.goldDeep,
                },
              ] as const
            ).map((item) => {
              const active = tab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(item.id)}
                  className="px-4 py-2.5 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] border transition-colors duration-200"
                  style={{
                    borderColor: active ? item.activeColor : `${FUNNEL_COLOURS.ink}18`,
                    backgroundColor: active ? `${item.activeColor}12` : FUNNEL_COLOURS.surface,
                    color: active ? item.activeColor : FUNNEL_COLOURS.steel,
                  }}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
          <p
            className="mt-2.5 font-sans text-sm leading-relaxed max-w-lg"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            {tab === 'outbound'
              ? 'Cold doors and related drafts, grouped by service. Grey cards are drafts, not for sale yet.'
              : 'Warm work that starts with a call or short scope. Grey cards are drafts, not for sale yet.'}
          </p>
        </Reveal>

        {groups.map((group) => {
          const products = group.codes
            .map((code) => byCode.get(code))
            .filter((p): p is FunnelProductCard => Boolean(p))
          if (products.length === 0) return null

          return (
            <section key={`${tab}-${group.title}`} className="mt-9 md:mt-10">
              <Reveal y={8}>
                <h2
                  className="font-serif text-lg md:text-xl tracking-tight"
                  style={{color: FUNNEL_COLOURS.ink}}
                >
                  {group.title}
                </h2>
                <p
                  className="mt-1 font-sans text-sm leading-snug max-w-xl"
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  {group.blurb}
                </p>
              </Reveal>

              <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
                {products.map((product, i) => (
                  <ProductCard key={product.code} product={product} index={i} />
                ))}
              </ul>
            </section>
          )
        })}

        <FunnelLegalFooter />
      </div>
    </div>
  )
}

export default FunnelHomePage
