import {PortableText} from '@portabletext/react'
import React, {useEffect, useMemo, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {motion} from 'framer-motion'
import {Helmet} from 'react-helmet-async'
import {ArrowLeft, ArrowUpRight} from 'lucide-react'
import ShareButton from '../components/ShareButton'
import PostEndCTA from '../components/PostEndCTA'
import {ToolkitPortableText, getToolkitBodyMainSections, getToolkitSectionsFromBody} from '../components/toolkit/ToolkitPortableText'
import {PageMeta} from '../components/PageMeta'
import {SITE_ORIGIN} from '../constants/seoMeta'
import {client, urlFor} from '../sanityClient'
import {
  getCategoryLabel,
  getPricingLabel,
  getPrimaryPick,
  getToolkitDisclosure,
  getToolkitOutboundRel,
  TOOLKIT_BTN_PRIMARY,
  TOOLKIT_PICK_BADGE_CLASSES,
  TOOLKIT_PICK_LABELS,
  truncateToolkitTagline,
  type ToolkitCategory,
  type ToolkitLinkType,
  type ToolkitPick,
  type ToolkitPricingModel,
} from '../constants/toolkit'

type ToolkitAuthor = {
  name?: string
  image?: unknown
  bio?: unknown[]
}

type ToolkitItem = {
  _id: string
  name: string
  slug: string
  tagline?: string
  summary: string
  benefits?: string[]
  body?: unknown[]
  mainImage?: {alt?: string; asset?: {_ref?: string}}
  author?: ToolkitAuthor | null
  internalLinkDestination?: string
  category: ToolkitCategory
  phase?: string
  pricingModel: ToolkitPricingModel
  picks?: ToolkitPick[] | null
  linkType: ToolkitLinkType
  url: string
  promoCode?: string
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  ogImage?: unknown
  tags?: string[]
  _updatedAt?: string
  relatedPosts?: RelatedPost[]
  fallbackPosts?: RelatedPost[]
}

type RelatedPost = {
  title: string
  slug?: {current?: string}
  mainImage?: unknown
  servicePillar?: string
  publishedAt?: string
}

const TOOLKIT_THEME = {
  textMain: 'text-gold-on-dark',
  textHover: 'hover:text-gold-on-dark',
  bgMain: 'bg-gold',
  pulse: 'bg-gold animate-pulse',
}

const PAGE_QUERY = `*[_type == "toolkitItem" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  tagline,
  summary,
  benefits,
  body,
  mainImage,
  author->{
    name,
    image,
    bio
  },
  category,
  phase,
  pricingModel,
  picks,
  linkType,
  url,
  promoCode,
  metaTitle,
  metaDescription,
  focusKeyword,
  ogImage,
  internalLinkDestination,
  tags,
  _updatedAt,
  "relatedPosts": *[_type == "post" && count((tags)[@ in ^.tags]) > 0] | order(publishedAt desc) [0...3] {
    title, slug, mainImage, servicePillar, publishedAt
  },
  "fallbackPosts": *[_type == "post"] | order(publishedAt desc) [0...3] {
    title, slug, mainImage, servicePillar, publishedAt
  }
}`

export default function ToolkitItemPage() {
  const {slug} = useParams<{slug: string}>()
  const navigate = useNavigate()
  const [tool, setTool] = useState<ToolkitItem | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [activeSection, setActiveSection] = useState('what-it-is')

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    setLoading(true)
    setLoadError(false)
    client
      .fetch<ToolkitItem | null>(PAGE_QUERY, {slug})
      .then((data) => {
        if (!data) {
          setTool(null)
          setRelatedPosts([])
        } else {
          const {relatedPosts: byTags, fallbackPosts, ...toolData} = data
          setTool(toolData as ToolkitItem)
          setRelatedPosts((byTags?.length ? byTags : fallbackPosts ?? []).slice(0, 3))
        }
        setLoading(false)
      })
      .catch(() => {
        // Fetch failed (network/API error) — NOT a confirmed absence.
        // Do not emit noindex; the stamped <head> canonical/title remain intact.
        setLoadError(true)
        setLoading(false)
      })
  }, [slug])

  const bodyMainSections = useMemo(
    () => getToolkitBodyMainSections(tool?.body as Parameters<typeof getToolkitBodyMainSections>[0]),
    [tool?.body],
  )
  const hasBodyMain = bodyMainSections.length > 0

  const sections = useMemo(() => {
    const items = [{id: 'what-it-is', text: 'What it is'}]
    if (tool?.benefits?.length) {
      items.push({id: 'how-it-helps', text: 'How it helps your business'})
    }
    if (hasBodyMain) {
      items.push(...getToolkitSectionsFromBody(bodyMainSections))
    }
    return items
  }, [tool?.benefits, bodyMainSections, hasBodyMain])

  useEffect(() => {
    if (!sections.length) return
    const initialId = sections[0]?.id
    if (initialId) setActiveSection(initialId)
  }, [sections])

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = sections
        .map((s) => document.getElementById(s.id))
        .filter(Boolean) as HTMLElement[]
      if (!headingElements.length) return

      let currentId = sections[0].id
      for (const el of headingElements) {
        if (el.getBoundingClientRect().top <= 160) {
          currentId = el.id
        }
      }
      setActiveSection(currentId)
    }

    window.addEventListener('scroll', handleScroll, {passive: true})
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="type-eyebrow text-cream border-2 border-cream px-6 py-4 animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!tool && loadError) {
    // Content could not be loaded (fetch/API error). This is NOT a confirmed
    // absence, so we must not emit noindex — a transient failure during a crawl
    // would otherwise deindex a real page.
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <h1 className="font-sans font-black text-2xl uppercase tracking-tight text-cream">Couldn’t load this tool</h1>
        <p className="max-w-md type-body text-cream/60">
          Something went wrong loading this page. Please refresh to try again.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream border-b-2 border-cream hover:text-gold-on-dark hover:border-gold transition-colors"
        >
          Reload
        </button>
      </div>
    )
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <PageMeta
          title="Tool not found | SYSBILT"
          description="This tool page does not exist or is unpublished."
          robots="noindex, follow"
        />
        <h1 className="font-sans font-black text-2xl uppercase tracking-tight text-cream">Tool not found</h1>
        <p className="max-w-md type-body text-cream/60">
          The tool you are looking for is not available. It may have been moved or not published yet.
        </p>
        <Link
          to="/toolkit"
          className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream border-b-2 border-cream hover:text-gold-on-dark hover:border-gold transition-colors"
        >
          Back to toolkit
        </Link>
      </div>
    )
  }

  const pageTitle = (tool.metaTitle?.trim() || tool.name).trim()
  const pageDescription = (tool.metaDescription?.trim() || tool.summary).trim()
  const brandedTitle = `${pageTitle} | SYSBILT`
  const canonicalUrl = `${SITE_ORIGIN}/toolkit/${tool.slug}`
  const shareUrl = canonicalUrl
  const shareImage = tool.ogImage
    ? urlFor(tool.ogImage).width(1200).height(630).url()
    : tool.mainImage?.asset?._ref
      ? urlFor(tool.mainImage).width(1200).height(630).url()
      : ''
  const heroTagline = truncateToolkitTagline(tool.tagline)
  const primaryPick = getPrimaryPick(tool.picks)
  const updatedLabel = tool._updatedAt
    ? new Date(tool._updatedAt).toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }).toUpperCase()
    : 'UPDATED'

  const displayTags = [
    getCategoryLabel(tool.category),
    getPricingLabel(tool.pricingModel),
    ...(tool.tags ?? []),
  ]

  const authorName = tool.author?.name?.trim() || 'SYSBILT TEAM'
  const authorInitial = authorName.charAt(0).toUpperCase() || 'S'

  const heroImage = tool.mainImage?.asset?._ref ? tool.mainImage : null
  const heroImageAlt =
    (typeof heroImage?.alt === 'string' && heroImage.alt.trim()) ||
    `${tool.name} visual`

  return (
    <main className="min-h-screen bg-dark text-cream font-sans pb-14 border-t border-white/10">
      <Helmet>
        <title>{brandedTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        {tool.focusKeyword ? <meta name="keywords" content={tool.focusKeyword} /> : null}

        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={brandedTitle} />
        <meta property="og:description" content={pageDescription} />
        {shareImage ? <meta property="og:image" content={shareImage} /> : null}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={brandedTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {shareImage ? <meta name="twitter:image" content={shareImage} /> : null}
        {/* JSON-LD (Article + BreadcrumbList) is stamped into static HTML at build time. */}
      </Helmet>

      <div className="pt-32 px-4 md:px-8 max-w-7xl mx-auto">
        <nav className="mb-8 relative z-20">
          <Link
            to="/toolkit"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All tools
          </Link>
        </nav>

        <div className="relative mb-12 md:mb-16 overflow-hidden lg:overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col z-20">
              {primaryPick && (
                <span
                  className={`inline-flex w-fit mb-4 type-eyebrow px-3 py-1.5 ${TOOLKIT_PICK_BADGE_CLASSES[primaryPick]}`}
                >
                  {TOOLKIT_PICK_LABELS[primaryPick]}
                </span>
              )}

              <motion.h1
                initial={{opacity: 0, x: -30}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 1, ease: [0.16, 1, 0.3, 1]}}
                className={`font-sans font-black break-words text-balance uppercase tracking-tighter text-white mb-4 md:mb-5 ${
                  tool.name.length < 16
                    ? 'text-[clamp(2.5rem,8vw,5rem)] leading-[0.9]'
                    : tool.name.length < 28
                      ? 'text-[clamp(2rem,6vw,3.5rem)] leading-[1]'
                      : 'text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05]'
                }`}
              >
                {tool.name}
              </motion.h1>

              {heroTagline && (
                <motion.p
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{duration: 0.8, delay: 0.15}}
                  className="font-sans text-lg md:text-xl font-light leading-snug text-cream/85 text-pretty mb-6 max-w-2xl"
                >
                  {heroTagline}
                </motion.p>
              )}

              <motion.div
                initial={{opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.25}}
                className="mb-6"
              >
                <a
                  href={tool.url}
                  target="_blank"
                  rel={getToolkitOutboundRel(tool.linkType)}
                  className={`inline-flex px-5 py-3 ${TOOLKIT_BTN_PRIMARY}`}
                >
                  Visit {tool.name}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                {tool.promoCode && (
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-cream/70">
                    Use code: <span className="text-gold-on-dark font-bold">{tool.promoCode}</span>
                  </p>
                )}
                {getToolkitDisclosure(tool.linkType) && (
                  <p className="mt-3 text-[10px] text-cream/45 leading-relaxed max-w-md">
                    {getToolkitDisclosure(tool.linkType)}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.8, delay: 0.35}}
                className="flex flex-wrap gap-3 font-mono text-[10px] md:text-xs uppercase tracking-widest mt-auto"
              >
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/20 px-3 py-1.5 bg-white/5 text-white/80"
                  >
                    #{tag.replace(/\s+/g, '')}
                  </span>
                ))}
              </motion.div>
            </div>

            {heroImage && (
              <div className="lg:col-span-5 relative z-10 w-full lg:flex lg:min-h-0">
                <motion.div
                  initial={{opacity: 0, x: 30}}
                  animate={{opacity: 1, x: 0}}
                  transition={{duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1]}}
                  className="relative w-full max-w-[520px] mx-auto lg:mx-0 lg:ml-auto lg:h-full aspect-video border-2 border-cream/25 overflow-hidden bg-white/5"
                >
                  <img
                    src={urlFor(heroImage).width(960).height(540).url()}
                    alt={heroImageAlt}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </motion.div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/20 mb-16 md:mb-24 bg-white/5 relative z-20">
          <div className="p-4 md:p-6 type-eyebrow text-white border-b border-r border-white/20">
            <span className="block opacity-40 mb-2">AUTHOR</span>
            {authorName.toUpperCase()}
          </div>
          <div className="p-4 md:p-6 type-eyebrow text-white border-b border-r border-white/20">
            <span className="block opacity-40 mb-2">UPDATED</span>
            {updatedLabel}
          </div>
          <div className="p-4 md:p-6 type-eyebrow text-white border-b border-r border-white/20">
            <span className="block opacity-40 mb-2">PRICING</span>
            {getPricingLabel(tool.pricingModel).toUpperCase()}
          </div>
          <div className="p-4 md:p-6 flex items-center justify-center border-b border-r border-white/20">
            <ShareButton
              url={shareUrl}
              title={pageTitle}
              mode="card"
              variant="dark"
              themeClass={{textMain: TOOLKIT_THEME.textMain, textHover: TOOLKIT_THEME.textHover}}
            />
          </div>
        </div>

        <article className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-3 hidden lg:block relative">
            <div className="sticky top-32 h-fit pb-12">
              <p className={`type-eyebrow ${TOOLKIT_THEME.textMain} tracking-widest mb-8 flex items-center gap-2 normal-case`}>
                <span className={`w-1.5 h-1.5 ${TOOLKIT_THEME.pulse}`} />
                In this tool
              </p>
              <nav className="relative pl-4">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />
                <ul className="space-y-4 relative">
                  {sections.map((item) => {
                    const isActive = activeSection === item.id
                    return (
                      <li key={item.id} className="relative">
                        {isActive && (
                          <motion.div
                            layoutId="toolkit-active-section"
                            className={`absolute -left-4 top-0 bottom-0 w-[2px] ${TOOLKIT_THEME.bgMain}`}
                            initial={false}
                            transition={{type: 'spring', stiffness: 300, damping: 30}}
                          />
                        )}
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(item.id)?.scrollIntoView({behavior: 'smooth'})
                          }}
                          className={`block text-sm transition-all duration-300 ${
                            isActive ? 'text-white font-medium pl-2' : 'text-white/50 hover:text-white pl-0'
                          }`}
                        >
                          {item.text}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            <div className="block lg:hidden mb-12 border border-white/10 bg-white/5 p-6">
              <p className={`type-eyebrow ${TOOLKIT_THEME.textMain} tracking-widest mb-6 flex items-center gap-2 normal-case`}>
                <span className={`w-1.5 h-1.5 ${TOOLKIT_THEME.pulse}`} />
                In this tool
              </p>
              <ul className="space-y-4 font-mono text-sm">
                {sections.map((item) => (
                  <li key={`mobile-${item.id}`}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(item.id)?.scrollIntoView({behavior: 'smooth'})
                      }}
                      className={`flex items-start gap-3 transition-colors ${
                        activeSection === item.id ? 'text-white' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <span className="shrink-0 opacity-70">//</span>
                      <span>{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <section id="what-it-is" className="scroll-mt-32 mb-16 md:mb-20">
              <h2 className="font-sans font-bold text-xl md:text-2xl uppercase tracking-tight text-white mb-5 flex items-center gap-3">
                <span className={TOOLKIT_THEME.textMain}>//</span> What it is
              </h2>
              <p className="type-body text-white/75 leading-relaxed text-pretty">{tool.summary}</p>
            </section>

            {tool.benefits && tool.benefits.length > 0 && (
              <section id="how-it-helps" className="scroll-mt-32 mb-16 md:mb-20">
                <h2 className="font-sans font-bold text-xl md:text-2xl uppercase tracking-tight text-white mb-6 flex items-center gap-3">
                  <span className={TOOLKIT_THEME.textMain}>//</span> How it helps your business
                </h2>
                <ul className="border-t border-white/15">
                  {tool.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex gap-4 py-4 border-b border-white/10 type-body text-white/75 leading-relaxed"
                    >
                      <span className={`type-eyebrow ${TOOLKIT_THEME.textMain} shrink-0 pt-0.5`}>→</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {hasBodyMain && <ToolkitPortableText value={bodyMainSections} />}

            {tool.internalLinkDestination && (
              <div className="mt-20 border border-gold-on-dark/20 bg-gold-on-dark/5 p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out" />

                <h3 className="font-sans font-black text-3xl md:text-4xl text-white tracking-tight mb-4 normal-case">
                  See how we fix this
                </h3>
                <p className="font-sans text-white/70 font-light mb-8 max-w-md">
                  See the exact system we build to fix this
                </p>

                <button
                  type="button"
                  onClick={() => navigate(tool.internalLinkDestination!)}
                  className={`font-mono text-xs font-bold uppercase transition-all duration-300 border-2 border-white bg-white text-dark px-8 py-4 inline-flex items-center gap-3 hover:bg-gold hover:border-gold hover:text-dark hover:shadow-[4px_4px_0px_0px_#D4A84B] hover:-translate-y-0.5`}
                >
                  AUDIT MY BUSINESS SYSTEMS <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="mt-20 pt-12 border-t border-white/10 flex flex-col sm:flex-row gap-6 md:gap-8 items-start">
              {tool.author?.image ? (
                <div className="shrink-0 relative">
                  <div className="absolute -inset-1 bg-white/5 rounded-full" />
                  <img
                    src={urlFor(tool.author.image).width(200).height(200).url()}
                    alt={authorName}
                    className="relative w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-white/10 opacity-90 hover:opacity-100 transition-all duration-500 hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/5 border-2 border-white/20 flex items-center justify-center">
                  <span className="font-mono text-2xl text-gold-on-dark">{authorInitial}</span>
                </div>
              )}
              <div className="flex-1">
                <p className="type-eyebrow text-white/40 mb-2">WRITTEN BY</p>
                <h4 className="font-sans font-bold text-xl md:text-2xl text-white uppercase tracking-widest mb-4">
                  {authorName}
                </h4>
                <div className="font-sans text-white/60 font-light leading-relaxed max-w-2xl text-base md:text-lg">
                  {tool.author?.bio ? (
                    <PortableText
                      value={tool.author.bio}
                      components={{block: {normal: ({children}: {children?: React.ReactNode}) => <p className="mb-4">{children}</p>}}}
                    />
                  ) : (
                    <p>The team behind SYSBILT builds business systems for growing Australian companies</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <div className="mt-24 border-t border-white/20 pt-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <h3 className={`type-eyebrow ${TOOLKIT_THEME.textMain} flex items-center gap-3 normal-case`}>
                <div className={`w-2 h-2 ${TOOLKIT_THEME.pulse}`} />
                Related articles
              </h3>
              <Link to="/blog" className={`type-eyebrow text-white ${TOOLKIT_THEME.textHover} transition-colors`}>
                Read more on the blog →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug?.current ?? relatedPost.title}
                  to={`/blog/${relatedPost.slug?.current}`}
                  className="group flex flex-col h-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                >
                  {relatedPost.mainImage && (
                    <div className="aspect-[16/9] border-b border-white/10 overflow-hidden relative shrink-0">
                      <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors z-10" />
                      <img
                        src={urlFor(relatedPost.mainImage).width(600).url()}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1 min-w-0">
                    <span className={`type-eyebrow ${TOOLKIT_THEME.textMain} mb-4`}>
                      // {relatedPost.servicePillar || 'GENERAL'}
                    </span>
                    <h4
                      className={`font-sans font-black text-xl text-white uppercase leading-tight mb-4 ${TOOLKIT_THEME.textHover} transition-colors line-clamp-3 break-words text-balance`}
                    >
                      {relatedPost.title}
                    </h4>
                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between type-eyebrow text-white/50">
                      <span>
                        {relatedPost.publishedAt
                          ? new Date(relatedPost.publishedAt)
                              .toLocaleDateString('en-AU', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                              })
                              .replace(/\//g, '.')
                          : 'DRAFT'}
                      </span>
                      <ArrowUpRight className={`w-4 h-4 ${TOOLKIT_THEME.textHover} transition-colors shrink-0`} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <PostEndCTA onCtaClick={() => navigate('/contact')} />
      </div>
    </main>
  )
}
