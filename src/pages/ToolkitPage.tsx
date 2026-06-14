import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, ChevronDown, ChevronUp, Wrench } from 'lucide-react'
import { PageMeta } from '../components/PageMeta'
import { SITE_ORIGIN } from '../constants/seoMeta'
import { client } from '../sanityClient'
import {
  getCategoryLabel,
  getPricingLabel,
  getToolkitOutboundRel,
  TOOLKIT_CATEGORY_ORDER,
  TOOLKIT_PICK_LABELS,
  TOOLKIT_PRICING_ORDER,
  type ToolkitCategory,
  type ToolkitLinkType,
  type ToolkitPick,
  type ToolkitPricingModel,
} from '../constants/toolkit'

type ToolkitItemSummary = {
  _id: string
  name: string
  slug: string
  tagline?: string
  category: ToolkitCategory
  pricingModel: ToolkitPricingModel
  picks?: ToolkitPick[] | null
  linkType: ToolkitLinkType
  url: string
  featured?: boolean
}

const TOOLKIT_URL = `${SITE_ORIGIN}/toolkit`

const toolkitCollectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Business Toolkit | SYSBILT',
  description:
    'Tools we rate for running a business, with a plain explanation of what each one does.',
  url: TOOLKIT_URL,
  publisher: {
    '@type': 'Organization',
    name: 'SYSBILT',
    url: SITE_ORIGIN,
  },
}

const toolkitBreadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {'@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/`},
    {'@type': 'ListItem', position: 2, name: 'Toolkit', item: TOOLKIT_URL},
  ],
}

const TOOLKIT_INDEX_QUERY = `*[_type == "toolkitItem"] | order(featured desc, orderRank asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  tagline,
  category,
  pricingModel,
  picks,
  linkType,
  url,
  featured
}`

export default function ToolkitPage() {
  const [tools, setTools] = useState<ToolkitItemSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activePricing, setActivePricing] = useState<string>('all')
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false)
  const [isMobilePricingOpen, setIsMobilePricingOpen] = useState(false)

  useEffect(() => {
    client
      .fetch<ToolkitItemSummary[]>(TOOLKIT_INDEX_QUERY)
      .then((data) => {
        setTools(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const categoryFilters = useMemo(() => {
    const present = new Set(tools.map((tool) => tool.category))
    return TOOLKIT_CATEGORY_ORDER.filter((category) => present.has(category))
  }, [tools])

  const pricingFilters = useMemo(() => {
    const present = new Set(tools.map((tool) => tool.pricingModel))
    return TOOLKIT_PRICING_ORDER.filter((pricing) => present.has(pricing))
  }, [tools])

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const categoryMatch = activeCategory === 'all' || tool.category === activeCategory
      const pricingMatch = activePricing === 'all' || tool.pricingModel === activePricing
      return categoryMatch && pricingMatch
    })
  }, [tools, activeCategory, activePricing])

  const cardVariants = {
    hidden: {opacity: 0, y: 15},
    show: {opacity: 1, y: 0, transition: {duration: 0.5, ease: [0.16, 1, 0.3, 1]}},
    exit: {opacity: 0, transition: {duration: 0.2}},
  }

  const activeCategoryLabel =
    activeCategory === 'all' ? 'All categories' : getCategoryLabel(activeCategory)
  const activePricingLabel =
    activePricing === 'all' ? 'All pricing' : getPricingLabel(activePricing)

  return (
    <div className="min-h-screen bg-cream font-sans selection:bg-dark selection:text-cream flex flex-col">
      <PageMeta
        title="Business Toolkit | SYSBILT"
        description="Tools we rate for running a business, with a plain explanation of what each one does."
        canonical={TOOLKIT_URL}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(toolkitCollectionJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(toolkitBreadcrumbJsonLd)}</script>
      </Helmet>

      <main className="flex-grow pt-28 md:pt-32 pb-24 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }}
        />

        <section className="px-6 md:px-12 max-w-[1400px] mx-auto mb-12 md:mb-16 relative z-10 text-center">
          <m.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8}}>
            <div className="relative w-16 h-16 md:w-20 md:h-20 bg-cream rounded-full shadow-neu mx-auto flex items-center justify-center mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-cream rounded-full shadow-neu-inner flex items-center justify-center">
                <Wrench size={20} className="text-red-text" strokeWidth={2} />
              </div>
            </div>
            <h1 className="font-serif text-4xl md:text-7xl text-dark tracking-tighter mb-6">
              Business <span className="italic font-serif text-gold-on-cream">Toolkit</span>
            </h1>
            <p className="font-sans text-base md:text-xl font-light text-on-cream-secondary max-w-2xl mx-auto">
              Tools we rate for running a business, with a plain explanation of what each one does.
            </p>
          </m.div>
        </section>

        <section className="max-w-[1000px] mx-auto mb-8 relative z-20 px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark/40 mb-3 text-center md:text-left">
            Filter by use
          </p>

          <div className="md:hidden space-y-3">
            <button
              type="button"
              onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
              className="w-full flex items-center justify-between bg-cream px-6 py-4 rounded-xl shadow-neu border border-white/50 text-[11px] font-bold uppercase tracking-widest text-red-text"
            >
              {activeCategoryLabel}
              {isMobileCategoryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <AnimatePresence>
              {isMobileCategoryOpen && (
                <m.div
                  initial={{opacity: 0, height: 0}}
                  animate={{opacity: 1, height: 'auto'}}
                  exit={{opacity: 0, height: 0}}
                  className="bg-cream rounded-xl shadow-neu-inner border border-black/5 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('all')
                      setIsMobileCategoryOpen(false)
                    }}
                    className="w-full text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest border-b border-black/5 text-dark/70 active:text-red-text"
                  >
                    All categories
                  </button>
                  {categoryFilters.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category)
                        setIsMobileCategoryOpen(false)
                      }}
                      className="w-full text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest border-b border-black/5 last:border-0 text-dark/70 active:text-red-text"
                    >
                      {getCategoryLabel(category)}
                    </button>
                  ))}
                </m.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:flex flex-wrap gap-2 bg-cream rounded-xl shadow-neu border border-white/50 p-3">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-3 rounded-lg text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-[#FFF8F5] shadow-neu-inner text-red-text'
                  : 'hover:bg-white text-dark/50 hover:text-dark'
              }`}
            >
              All
            </button>
            {categoryFilters.map((category) => {
              const isActive = activeCategory === category
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-3 rounded-lg text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                    isActive
                      ? 'bg-[#FFF8F5] shadow-neu-inner text-red-text'
                      : 'hover:bg-white text-dark/50 hover:text-dark'
                  }`}
                >
                  {getCategoryLabel(category)}
                </button>
              )
            })}
          </div>
        </section>

        {pricingFilters.length > 1 && (
          <section className="max-w-[1000px] mx-auto mb-12 relative z-20 px-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark/40 mb-3 text-center md:text-left">
              Filter by price
            </p>

            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobilePricingOpen(!isMobilePricingOpen)}
                className="w-full flex items-center justify-between bg-cream px-6 py-4 rounded-xl shadow-neu border border-white/50 text-[11px] font-bold uppercase tracking-widest text-dark/70"
              >
                {activePricingLabel}
                {isMobilePricingOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <AnimatePresence>
                {isMobilePricingOpen && (
                  <m.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: 'auto'}}
                    exit={{opacity: 0, height: 0}}
                    className="mt-2 bg-cream rounded-xl shadow-neu-inner border border-black/5 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActivePricing('all')
                        setIsMobilePricingOpen(false)
                      }}
                      className="w-full text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest border-b border-black/5 text-dark/70 active:text-red-text"
                    >
                      All pricing
                    </button>
                    {pricingFilters.map((pricing) => (
                      <button
                        key={pricing}
                        type="button"
                        onClick={() => {
                          setActivePricing(pricing)
                          setIsMobilePricingOpen(false)
                        }}
                        className="w-full text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest border-b border-black/5 last:border-0 text-dark/70 active:text-red-text"
                      >
                        {getPricingLabel(pricing)}
                      </button>
                    ))}
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActivePricing('all')}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] border transition-all duration-300 ${
                  activePricing === 'all'
                    ? 'border-red-text/30 bg-[#FFF8F5] text-red-text'
                    : 'border-black/10 text-dark/50 hover:text-dark hover:border-black/20'
                }`}
              >
                All
              </button>
              {pricingFilters.map((pricing) => {
                const isActive = activePricing === pricing
                return (
                  <button
                    key={pricing}
                    type="button"
                    onClick={() => setActivePricing(pricing)}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] border transition-all duration-300 ${
                      isActive
                        ? 'border-red-text/30 bg-[#FFF8F5] text-red-text'
                        : 'border-black/10 text-dark/50 hover:text-dark hover:border-black/20'
                    }`}
                  >
                    {getPricingLabel(pricing)}
                  </button>
                )
              })}
            </div>
          </section>
        )}

        <section className="px-6 md:px-12 max-w-5xl mx-auto relative z-10 min-h-[400px]">
          {isLoading ? (
            <div className="py-20 flex justify-center">
              <div className="w-10 h-10 rounded-full border-2 border-t-red-text animate-spin" />
            </div>
          ) : filteredTools.length === 0 ? (
            <div className="py-20 text-center text-on-cream-secondary font-light">
              No tools match these filters yet.
            </div>
          ) : (
            <m.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <AnimatePresence mode="popLayout">
                {filteredTools.map((tool) => {
                  const toolPath = `/toolkit/${tool.slug}`
                  return (
                    <m.div
                      key={tool._id}
                      variants={cardVariants}
                      layout
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="relative group"
                    >
                      <div className="relative flex flex-col h-full bg-cream rounded-[28px] p-8 shadow-neu border border-white/40 transition-all duration-500 hover:-translate-y-1">
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          <span className="inline-flex border border-gold-on-cream/20 px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest text-gold-on-cream bg-cream shadow-neu-inner">
                            {getCategoryLabel(tool.category)}
                          </span>
                          <span className="inline-flex border border-dark/10 px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest text-dark/60 bg-white/60">
                            {getPricingLabel(tool.pricingModel)}
                          </span>
                          {tool.featured && (
                            <span className="inline-flex border border-red-text/20 px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest text-red-text bg-[#FFF8F5]">
                              Featured
                            </span>
                          )}
                        </div>

                        {(tool.picks?.length ?? 0) > 0 && (
                          <div className="mb-4 flex flex-wrap gap-2">
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

                        <h2 className="font-serif text-2xl text-dark mb-3 leading-tight">{tool.name}</h2>

                        {tool.tagline && (
                          <p className="text-on-cream-secondary font-light text-sm mb-8 line-clamp-3 flex-grow">
                            {tool.tagline}
                          </p>
                        )}

                        <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-4 border-t border-black/5">
                          <a
                            href={tool.url}
                            target="_blank"
                            rel={getToolkitOutboundRel(tool.linkType)}
                            className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-dark text-cream text-[11px] font-bold uppercase tracking-widest hover:bg-red-text transition-colors"
                          >
                            Visit
                          </a>
                          <Link
                            to={toolPath}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-black/10 text-[11px] font-bold uppercase tracking-widest text-dark hover:text-red-text hover:border-red-text/20 transition-colors"
                          >
                            Read more
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </m.div>
                  )
                })}
              </AnimatePresence>
            </m.div>
          )}
        </section>
      </main>
    </div>
  )
}
