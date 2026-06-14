import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {m} from 'framer-motion'
import {Helmet} from 'react-helmet-async'
import {ArrowLeft, ArrowUpRight} from 'lucide-react'
import {PageMeta} from '../components/PageMeta'
import {SITE_ORIGIN} from '../constants/seoMeta'
import {client} from '../sanityClient'
import {
  getCategoryLabel,
  getPricingLabel,
  getToolkitDisclosure,
  getToolkitOutboundRel,
  TOOLKIT_ITEM_QUERY,
  TOOLKIT_PICK_LABELS,
  type ToolkitCategory,
  type ToolkitLinkType,
  type ToolkitPick,
  type ToolkitPricingModel,
} from '../constants/toolkit'

type ToolkitItem = {
  _id: string
  name: string
  slug: string
  tagline?: string
  summary: string
  benefits: string[]
  category: ToolkitCategory
  phase?: string
  pricingModel: ToolkitPricingModel
  picks?: ToolkitPick[] | null
  linkType: ToolkitLinkType
  url: string
  promoCode?: string
  metaTitle?: string
  metaDescription?: string
}

export default function ToolkitItemPage() {
  const {slug} = useParams<{slug: string}>()
  const [tool, setTool] = useState<ToolkitItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    setLoading(true)
    client
      .fetch<ToolkitItem | null>(TOOLKIT_ITEM_QUERY, {slug})
      .then((data) => {
        setTool(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-t-red-text animate-spin" />
      </div>
    )
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <PageMeta
          title="Tool not found | SYSBILT"
          description="This tool page does not exist or is unpublished."
          robots="noindex, follow"
        />
        <h1 className="font-serif text-2xl text-dark">Tool not found</h1>
        <p className="max-w-md text-on-cream-secondary font-light">
          The tool you are looking for is not available. It may have been moved or not published yet.
        </p>
        <Link
          to="/toolkit"
          className="font-mono text-sm uppercase tracking-widest text-red-text underline underline-offset-4 hover:text-dark transition-colors"
        >
          Back to toolkit
        </Link>
      </div>
    )
  }

  const pageTitle = (tool.metaTitle?.trim() || tool.name).trim()
  const pageDescription = (tool.metaDescription?.trim() || tool.summary).trim()
  const htmlTitle = `${pageTitle} | SYSBILT`
  const canonicalUrl = `${SITE_ORIGIN}/toolkit/${tool.slug}`

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/`},
      {'@type': 'ListItem', position: 2, name: 'Toolkit', item: `${SITE_ORIGIN}/toolkit`},
      {'@type': 'ListItem', position: 3, name: tool.name, item: canonicalUrl},
    ],
  }

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: pageTitle,
    description: pageDescription,
    url: canonicalUrl,
    isPartOf: {
      '@type': 'CollectionPage',
      name: 'Business Toolkit',
      url: `${SITE_ORIGIN}/toolkit`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SYSBILT',
      url: SITE_ORIGIN,
    },
  }

  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-dark selection:text-cream flex flex-col">
      <PageMeta title={htmlTitle} description={pageDescription} canonical={canonicalUrl} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageJsonLd)}</script>
      </Helmet>

      <main className="flex-grow pt-28 md:pt-32 pb-24 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />

        <article className="px-6 md:px-12 max-w-3xl mx-auto relative z-10">
          <nav className="mb-10">
            <Link
              to="/toolkit"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-dark/50 hover:text-red-text transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to toolkit
            </Link>
          </nav>

          <m.header
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            className="mb-10"
          >
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex border border-gold-on-cream/20 px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest text-gold-on-cream bg-cream shadow-neu-inner">
                {getCategoryLabel(tool.category)}
              </span>
              <span className="inline-flex border border-dark/10 px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest text-dark/60 bg-white/60">
                {getPricingLabel(tool.pricingModel)}
              </span>
            </div>

            {(tool.picks?.length ?? 0) > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
                {tool.picks!.map((pick) => (
                  <span
                    key={pick}
                    className="inline-flex border border-red-text/20 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest text-red-text bg-red-solid/5"
                  >
                    {TOOLKIT_PICK_LABELS[pick]}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-serif text-4xl md:text-6xl text-dark tracking-tighter mb-5">{tool.name}</h1>

            {tool.tagline && (
              <p className="font-sans text-lg md:text-xl font-light text-on-cream-secondary leading-relaxed">
                {tool.tagline}
              </p>
            )}
          </m.header>

          <ToolkitVisitBlock tool={tool} />

          <section className="mt-12">
            <h2 className="font-serif text-2xl text-dark mb-4">What it is</h2>
            <p className="text-on-cream-secondary font-light text-base md:text-lg leading-relaxed">{tool.summary}</p>
          </section>

          {tool.benefits?.length > 0 && (
            <section className="mt-12">
              <h2 className="font-serif text-2xl text-dark mb-6">How it helps your business</h2>
              <ul className="space-y-4">
                {tool.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex gap-4 text-on-cream-secondary font-light text-base md:text-lg leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-text" aria-hidden />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="mt-12 text-on-cream-secondary font-light text-base md:text-lg leading-relaxed">
            Not sure if this fits your setup,{' '}
            <Link to="/contact" className="text-red-text underline underline-offset-4 hover:text-dark transition-colors">
              we can help you choose
            </Link>
            .
          </p>

          <div className="mt-12">
            <ToolkitVisitBlock tool={tool} />
          </div>

          <section className="mt-16 bg-cream rounded-[28px] p-8 md:p-10 shadow-neu border border-white/40">
            <h2 className="font-serif text-2xl md:text-3xl text-dark mb-4 leading-tight">
              Want help putting the right tools to work in your business?
            </h2>
            <p className="text-on-cream-secondary font-light text-base md:text-lg mb-8 leading-relaxed">
              We can map what you already use, fill the gaps, and wire it together so your team actually uses it.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark text-cream text-[11px] font-bold uppercase tracking-widest hover:bg-red-text transition-colors"
            >
              Contact us
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </section>
        </article>
      </main>
    </div>
  )
}

function ToolkitVisitBlock({tool}: {tool: ToolkitItem}) {
  const disclosure = getToolkitDisclosure(tool.linkType)

  return (
    <div className="bg-cream rounded-[28px] p-6 md:p-8 shadow-neu border border-white/40">
      <a
        href={tool.url}
        target="_blank"
        rel={getToolkitOutboundRel(tool.linkType)}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-dark text-cream text-[11px] font-bold uppercase tracking-widest hover:bg-red-text transition-colors"
      >
        Visit {tool.name}
        <ArrowUpRight className="w-4 h-4" />
      </a>

      {tool.promoCode && (
        <p className="mt-4 text-sm font-mono uppercase tracking-wider text-dark">
          Use code: <span className="font-bold text-red-text">{tool.promoCode}</span>
        </p>
      )}

      {disclosure && (
        <p className="mt-4 text-xs text-on-cream-secondary font-light leading-relaxed max-w-xl">{disclosure}</p>
      )}
    </div>
  )
}
