import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { PageMeta } from '../components/PageMeta'
import { SITE_ORIGIN } from '../constants/seoMeta'
import PillarFAQJsonLd from '../components/PillarFAQJsonLd'
import {
  BTW_CHAPTERS,
  BTW_HUB_PATH,
  btwChapterPath,
  extractChapterBlocks,
  extractGlossaryFaqs,
  getBtwChapterBySlug,
  getBtwChapterByNum,
  pillarLabel,
} from '../built-to-work/chapter-seo'
import { BTW_CHAPTER_COVERS } from '../built-to-work/chapter-covers'
import { BtwFlowList } from '../built-to-work/components/BtwBlocks'
import { BtwPdfCta } from '../built-to-work/components/BtwPdfCta'
import { BTW_STYLES } from '../built-to-work/styles'
import { BTW_META } from '../built-to-work/types'

const PUBLISHED = '2026-06-01T00:00:00.000Z'

export default function BtwChapterArticlePage() {
  const { chapterSlug } = useParams<{ chapterSlug: string }>()
  const chapter = chapterSlug ? getBtwChapterBySlug(chapterSlug) : undefined

  if (!chapter) {
    return <Navigate to={BTW_HUB_PATH} replace />
  }

  const blocks = extractChapterBlocks(chapter.pages)
  const cover = BTW_CHAPTER_COVERS[chapter.num]
  const canonical = `${SITE_ORIGIN}${btwChapterPath(chapter.slug)}`
  const htmlTitle = `${chapter.seoTitle} | SYSBILT`
  const prev = chapter.num > 1 ? getBtwChapterByNum(chapter.num - 1) : undefined
  const next = chapter.num < BTW_CHAPTERS.length ? getBtwChapterByNum(chapter.num + 1) : undefined

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: chapter.h1,
    description: chapter.seoDescription,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    author: { '@type': 'Organization', name: 'SYSBILT', url: SITE_ORIGIN },
    publisher: {
      '@type': 'Organization',
      name: 'SYSBILT',
      url: SITE_ORIGIN,
      logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/images/og-sysbilt.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    image: cover ? `${SITE_ORIGIN}${cover.src}` : `${SITE_ORIGIN}/images/og-sysbilt.png`,
    isPartOf: {
      '@type': 'Book',
      name: BTW_META.title,
      url: `${SITE_ORIGIN}${BTW_HUB_PATH}`,
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElements: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_ORIGIN}/guides` },
      { '@type': 'ListItem', position: 3, name: BTW_META.title, item: `${SITE_ORIGIN}${BTW_HUB_PATH}` },
      { '@type': 'ListItem', position: 4, name: chapter.h1, item: canonical },
    ],
  }

  const glossaryFaqs = chapter.num === 12 ? extractGlossaryFaqs(blocks) : []

  return (
    <div className="btw-root min-h-screen bg-cream text-dark selection:bg-dark selection:text-cream pt-[100px] md:pt-[140px] pb-16 md:pb-24">
      <style>{BTW_STYLES}</style>
      <PageMeta
        title={htmlTitle}
        description={chapter.seoDescription}
        canonical={canonical}
        ogImage={cover ? `${SITE_ORIGIN}${cover.src}` : `${SITE_ORIGIN}/images/og-sysbilt.png`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      {glossaryFaqs.length > 0 ? <PillarFAQJsonLd faqs={glossaryFaqs} /> : null}

      <article className="mx-auto w-full max-w-[720px] px-4 md:px-6">
        <nav aria-label="Breadcrumb" className="mb-8 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-dark/45">
          <Link to="/guides" className="hover:text-dark transition-colors">
            Guides
          </Link>
          <span className="mx-2">/</span>
          <Link to={BTW_HUB_PATH} className="hover:text-dark transition-colors">
            {BTW_META.title}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-dark/70">Chapter {String(chapter.num).padStart(2, '0')}</span>
        </nav>

        <Link
          to={BTW_HUB_PATH}
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark/45 hover:text-dark transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> All chapters
        </Link>

        {cover ? (
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-sm bg-[#111111]">
            <img
              src={cover.src}
              alt={cover.alt}
              className="absolute inset-0 h-full w-full object-cover object-center"
              decoding="async"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(17,17,17,0.75) 0%, rgba(17,17,17,0.35) 40%, transparent 70%), linear-gradient(to top, rgba(17,17,17,0.85) 0%, transparent 55%)',
              }}
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <div className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A84B] mb-2">
                / Chapter {String(chapter.num).padStart(2, '0')}
              </div>
            </div>
          </div>
        ) : null}

        <header className="mb-10 border-b border-dark/10 pb-8">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-gold-on-cream mb-3">
            / {BTW_META.title}
          </div>
          <h1 className="font-serif text-[clamp(32px,5vw,48px)] font-medium leading-[1.05] tracking-[-0.03em] text-dark m-0 mb-4">
            {chapter.h1}
          </h1>
          {chapter.subtitle ? (
            <p className="font-sans text-[17px] md:text-[19px] leading-relaxed text-dark/70 m-0 max-w-prose">
              {chapter.subtitle}
            </p>
          ) : null}
        </header>

        <div className="btw-article-body">
          <BtwFlowList blocks={blocks} />
        </div>

        {chapter.pillars.length > 0 ? (
          <section className="mt-14 pt-8 border-t border-dark/10" aria-label="Related services">
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-dark/45 mb-4 m-0">
              Related SYSBILT services
            </h2>
            <ul className="flex flex-wrap gap-3 list-none p-0 m-0">
              {chapter.pillars.map((path) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="inline-block font-sans text-sm border border-dark/15 px-3 py-2 hover:bg-dark hover:text-cream transition-colors"
                  >
                    {pillarLabel(path)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-12">
          <BtwPdfCta />
        </div>

        <nav
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-between border-t border-dark/10 pt-8"
          aria-label="Chapter navigation"
        >
          {prev ? (
            <Link
              to={btwChapterPath(prev.slug)}
              className="group flex flex-col gap-1 max-w-[48%] font-sans text-sm text-dark/70 hover:text-dark"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-dark/40 group-hover:text-dark/60">
                ← Previous
              </span>
              <span className="font-medium text-dark">{prev.h1}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={btwChapterPath(next.slug)}
              className="group flex flex-col gap-1 text-right sm:ml-auto max-w-[48%] font-sans text-sm text-dark/70 hover:text-dark"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-dark/40 group-hover:text-dark/60">
                Next →
              </span>
              <span className="font-medium text-dark">{next.h1}</span>
            </Link>
          ) : null}
        </nav>
      </article>
    </div>
  )
}

/** Prevent /read and other reserved segments from matching as chapters. */
export function isBtwChapterSlug(slug: string): boolean {
  if (slug === 'read') return false
  return BTW_CHAPTERS.some((c) => c.slug === slug)
}
