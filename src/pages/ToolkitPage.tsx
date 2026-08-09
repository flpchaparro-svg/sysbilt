import React, { useEffect, useMemo, useState, lazy, Suspense, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, BookOpen, ChevronDown, ChevronUp, FileText } from 'lucide-react'
import { RouteHead } from '../site/RouteHead'
import { useRouteData } from '../site/RouteContentProvider'
import { SEO_META, SITE_ORIGIN } from '../constants/seoMeta'
import { organizationIdRef } from '../constants/organizationJsonLd'
import { client } from '../sanityClient'
import {
  getCategoryLabel,
  getGroupedCategories,
  getPricingLabel,
  getPrimaryPick,
  TOOLKIT_BTN_SECONDARY,
  TOOLKIT_CATEGORY_ORDER,
  TOOLKIT_PHASE_GROUPS,
  TOOLKIT_PICK_BADGE_CLASSES,
  TOOLKIT_PICK_LABELS,
  TOOLKIT_PRICING_ORDER,
  truncateToolkitTagline,
  type ToolkitCategory,
  type ToolkitLinkType,
  type ToolkitPick,
  type ToolkitPricingModel,
  type ToolkitPhaseGroup,
} from '../constants/toolkit'

const BookingCTA = lazy(() => import('../components/HomePage/BookingCTA'))

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
  publisher: organizationIdRef(),
}

const toolkitBreadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {'@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/`},
    {'@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE_ORIGIN}/blog`},
    {'@type': 'ListItem', position: 3, name: 'Toolkit', item: TOOLKIT_URL},
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

function filterButtonClass(isActive: boolean): string {
  return `type-eyebrow px-3 py-2 md:px-4 md:py-2 border-2 border-cream transition-all hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#D4A84B] ${
    isActive
      ? 'bg-cream text-dark'
      : 'bg-transparent text-cream hover:bg-gold hover:border-gold hover:text-dark'
  }`
}

export default function ToolkitPage() {
  const navigate = useNavigate()
  const routeData = useRouteData<{ tools?: ToolkitItemSummary[] }>()
  const initialToolsRef = useRef(routeData?.tools ?? null)
  const [tools, setTools] = useState<ToolkitItemSummary[]>(() => initialToolsRef.current ?? [])
  const [isLoading, setIsLoading] = useState(() => !initialToolsRef.current)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activePricing, setActivePricing] = useState<string>('all')
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false)
  const [isMobilePricingOpen, setIsMobilePricingOpen] = useState(false)

  useEffect(() => {
    if (initialToolsRef.current) {
      initialToolsRef.current = null
      return
    }
    client
      .fetch<ToolkitItemSummary[]>(TOOLKIT_INDEX_QUERY)
      .then((data) => {
        setTools(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [])

  const groupedCategoryFilters = useMemo(() => {
    const present = new Set(tools.map((tool) => tool.category))
    const available = TOOLKIT_CATEGORY_ORDER.filter((category) => present.has(category))
    const grouped = getGroupedCategories()
    const result: Partial<Record<ToolkitPhaseGroup, ToolkitCategory[]>> = {}
    for (const phase of TOOLKIT_PHASE_GROUPS) {
      const categories = grouped[phase].filter((category) => available.includes(category))
      if (categories.length > 0) result[phase] = categories
    }
    return result
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
    hidden: {opacity: 0, y: 12},
    show: {opacity: 1, y: 0, transition: {duration: 0.4, ease: [0.16, 1, 0.3, 1] as const}},
    exit: {opacity: 0, transition: {duration: 0.15}},
  }

  const activeCategoryLabel =
    activeCategory === 'all' ? 'All categories' : getCategoryLabel(activeCategory)
  const activePricingLabel =
    activePricing === 'all' ? 'All pricing' : getPricingLabel(activePricing)

  return (
    <section className="w-full min-h-screen bg-dark text-cream font-sans">
      <RouteHead
        title={SEO_META.toolkitIndex.title}
        description={SEO_META.toolkitIndex.description}
        canonical={SEO_META.toolkitIndex.canonical}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(toolkitCollectionJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(toolkitBreadcrumbJsonLd)}</script>
      </Helmet>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-32 md:pt-44 pb-20 w-full">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-cream/45"
        >
          <Link to="/" className="hover:text-cream transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-cream transition-colors">
            Insights
          </Link>
          <span className="mx-2">/</span>
          <span className="text-cream/70">Toolkit</span>
        </nav>

        <header className="mb-12 md:mb-16 border-b-4 border-cream pb-10 md:pb-14">
          <m.div initial={false} animate={{ opacity: 1, y: 0 }}>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream/50 mb-4 block">
              / TOOLKIT
            </span>
            <h1 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-cream leading-[1.02] mb-6 max-w-4xl text-balance">
              Tools we rate for running a business
            </h1>
            <p className="type-body text-cream/70 max-w-2xl border-l-4 border-gold pl-4 text-pretty">
              A plain explanation of what each one does, who it suits, and where to sign up.
            </p>
          </m.div>
        </header>

        <div className="mb-10 md:mb-14">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream/50 mb-4 block">
            / FILTER BY USE
          </span>

          <div className="md:hidden space-y-3">
            <button
              type="button"
              onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
              className="w-full flex items-center justify-between border-2 border-cream px-4 py-3 type-eyebrow text-cream bg-white/5"
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
                  className="border-2 border-cream border-t-0 overflow-hidden max-h-[min(70vh,28rem)] overflow-y-auto"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('all')
                      setIsMobileCategoryOpen(false)
                    }}
                    className="w-full text-left px-4 py-3 type-eyebrow border-b border-cream/20 text-cream/80 hover:bg-gold hover:text-dark transition-colors"
                  >
                    All categories
                  </button>
                  {TOOLKIT_PHASE_GROUPS.map((phase) => {
                    const categories = groupedCategoryFilters[phase]
                    if (!categories?.length) return null
                    return (
                      <div key={phase}>
                        <div className="px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cream/40 bg-white/5 border-b border-cream/10">
                          {phase}
                        </div>
                        {categories.map((category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => {
                              setActiveCategory(category)
                              setIsMobileCategoryOpen(false)
                            }}
                            className="w-full text-left px-4 py-3 type-eyebrow border-b border-cream/20 last:border-0 text-cream/80 hover:bg-gold hover:text-dark transition-colors"
                          >
                            {getCategoryLabel(category)}
                          </button>
                        ))}
                      </div>
                    )
                  })}
                </m.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:block space-y-8">
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setActiveCategory('all')} className={filterButtonClass(activeCategory === 'all')}>
                All
              </button>
            </div>
            {TOOLKIT_PHASE_GROUPS.map((phase) => {
              const categories = groupedCategoryFilters[phase]
              if (!categories?.length) return null
              return (
                <div key={phase}>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cream/40 mb-3 block">
                    {phase}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={filterButtonClass(activeCategory === category)}
                      >
                        {getCategoryLabel(category)}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {pricingFilters.length > 1 && (
          <div className="mb-12 md:mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream/50 mb-4 block">
              / FILTER BY PRICE
            </span>

            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsMobilePricingOpen(!isMobilePricingOpen)}
                className="w-full flex items-center justify-between border-2 border-cream px-4 py-3 type-eyebrow text-cream bg-white/5"
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
                    className="mt-0 border-2 border-cream border-t-0 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActivePricing('all')
                        setIsMobilePricingOpen(false)
                      }}
                      className="w-full text-left px-4 py-3 type-eyebrow border-b border-cream/20 text-cream/80 hover:bg-gold hover:text-dark transition-colors"
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
                        className="w-full text-left px-4 py-3 type-eyebrow border-b border-cream/20 last:border-0 text-cream/80 hover:bg-gold hover:text-dark transition-colors"
                      >
                        {getPricingLabel(pricing)}
                      </button>
                    ))}
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:flex flex-wrap gap-2">
              <button type="button" onClick={() => setActivePricing('all')} className={filterButtonClass(activePricing === 'all')}>
                All
              </button>
              {pricingFilters.map((pricing) => (
                <button
                  key={pricing}
                  type="button"
                  onClick={() => setActivePricing(pricing)}
                  className={filterButtonClass(activePricing === pricing)}
                >
                  {getPricingLabel(pricing)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="min-h-[320px]">
          {isLoading ? (
            <div className="type-eyebrow text-cream border-2 border-cream p-6 inline-block tracking-widest animate-pulse">
              Loading tools...
            </div>
          ) : filteredTools.length === 0 ? (
            <p className="type-body text-cream/60 border-l-4 border-cream/30 pl-4">
              No tools match these filters yet.
            </p>
          ) : (
            <m.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {filteredTools.map((tool) => {
                  const toolPath = `/toolkit/${tool.slug}`
                  const primaryPick = getPrimaryPick(tool.picks)
                  const cardTagline = truncateToolkitTagline(tool.tagline)
                  return (
                    <m.article
                      key={tool._id}
                      variants={cardVariants}
                      layout
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      className="group relative overflow-visible border-2 border-cream bg-dark flex flex-col h-full hover:shadow-[8px_8px_0px_0px_#FFF2EC] hover:-translate-y-1 transition-all duration-300"
                    >
                      {primaryPick && (
                        <span
                          className={`absolute top-0 right-0 z-20 type-eyebrow px-3 py-2 rounded-bl-md border-l-2 border-b-2 border-cream ${TOOLKIT_PICK_BADGE_CLASSES[primaryPick]}`}
                        >
                          {TOOLKIT_PICK_LABELS[primaryPick]}
                        </span>
                      )}

                      <div className="p-6 md:p-8 flex flex-col h-full">
                        <div className="mb-4 flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-widest pr-28">
                          <span className="border border-cream/30 px-2 py-1 text-gold-on-dark">
                            {getCategoryLabel(tool.category)}
                          </span>
                          <span className="border border-cream/30 px-2 py-1 text-cream/70">
                            {getPricingLabel(tool.pricingModel)}
                          </span>
                          {tool.featured && (
                            <span className="border border-cream/30 px-2 py-1 text-cream/90">Featured</span>
                          )}
                        </div>

                        <h2 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tight text-cream mb-3 leading-snug group-hover:text-gold-on-dark transition-colors">
                          {tool.name}
                        </h2>

                        {cardTagline && (
                          <p className="type-body text-cream/65 mb-8 line-clamp-4 flex-grow text-pretty">{cardTagline}</p>
                        )}

                        <div className="mt-auto pt-5 border-t-2 border-cream/20">
                          <Link
                            to={toolPath}
                            className={`w-full sm:w-auto px-5 py-3 ${TOOLKIT_BTN_SECONDARY}`}
                          >
                            About this tool
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </m.article>
                  )
                })}
              </AnimatePresence>
            </m.div>
          )}
        </div>

        <section className="mt-24 md:mt-32 border-t-4 border-cream pt-14 md:pt-16">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream/50 mb-4 block">
            / GO DEEPER
          </span>
          <h2 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tight text-cream mb-4 max-w-2xl text-balance">
            Learn how to use the tools
          </h2>
          <p className="type-body text-cream/60 mb-10 max-w-2xl text-pretty">
            Step-by-step guides and practical articles on putting AI and systems to work in a real business.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-0">
            <Link
              to="/blog"
              className="group flex items-start gap-5 border-2 border-cream p-6 md:p-8 hover:shadow-[6px_6px_0px_0px_#FFF2EC] hover:-translate-y-0.5 transition-all"
            >
              <div className="shrink-0 w-12 h-12 border-2 border-cream flex items-center justify-center text-cream group-hover:bg-gold group-hover:border-gold group-hover:text-dark transition-colors">
                <FileText className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-sans font-black text-lg uppercase tracking-tight text-cream group-hover:text-gold-on-dark mb-2">
                  Insights
                </h3>
                <p className="type-body text-cream/60 text-sm leading-relaxed">
                  Practical advice for businesses that want to grow without the grind.
                </p>
              </div>
            </Link>
            <Link
              to="/guides"
              className="group flex items-start gap-5 border-2 border-cream p-6 md:p-8 hover:shadow-[6px_6px_0px_0px_#FFF2EC] hover:-translate-y-0.5 transition-all"
            >
              <div className="shrink-0 w-12 h-12 border-2 border-cream flex items-center justify-center text-cream group-hover:bg-gold group-hover:border-gold group-hover:text-dark transition-colors">
                <BookOpen className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-sans font-black text-lg uppercase tracking-tight text-cream group-hover:text-gold-on-dark mb-2">
                  Guides
                </h3>
                <p className="type-body text-cream/60 text-sm leading-relaxed">
                  Deep blueprints for websites, CRM, automation, AI, and more.
                </p>
              </div>
            </Link>
          </div>
        </section>
      </div>

      <Suspense fallback={null}>
        <BookingCTA onCtaClick={() => navigate('/contact')} ctaLabel="BOOK A CALL" />
      </Suspense>
    </section>
  )
}
