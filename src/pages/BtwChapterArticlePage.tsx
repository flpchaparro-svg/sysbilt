import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { RouteHead } from '../site/RouteHead'
import { SITE_ORIGIN } from '../constants/seoMeta'
import {
  BTW_CHAPTERS,
  BTW_HUB_PATH,
  btwChapterPath,
  extractChapterBlocks,
  getBtwChapterBySlug,
  getBtwChapterByNum,
  pillarLabel,
} from '../built-to-work/chapter-seo'
import { BTW_CHAPTER_COVERS } from '../built-to-work/chapter-covers'
import { chapterCoverWebSrc } from '../guides/chapter-cover-types'
import { BtwFlowList } from '../built-to-work/components/BtwBlocks'
import { BtwPdfCta } from '../built-to-work/components/BtwPdfCta'
import { GuideChapterNav } from '../components/GuideChapterNav'
import { BTW_STYLES } from '../built-to-work/styles'
import { BTW_META } from '../built-to-work/types'

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

  return (
    <div className="btw-root min-h-screen bg-cream text-dark selection:bg-dark selection:text-cream pt-[100px] md:pt-[140px] pb-16 md:pb-24">
      <style>{BTW_STYLES}</style>
      <RouteHead
        title={htmlTitle}
        description={chapter.seoDescription}
        canonical={canonical}
        ogImage={cover ? `${SITE_ORIGIN}${chapterCoverWebSrc(cover)}` : `${SITE_ORIGIN}/images/og-sysbilt.png`}
        ogType="article"
      />
      {/* JSON-LD (Article + BreadcrumbList + glossary FAQPage on ch12) is stamped at build time. */}

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
              src={chapterCoverWebSrc(cover)}
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

        <GuideChapterNav prev={prev} next={next} chapterPath={btwChapterPath} />

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
      </article>
    </div>
  )
}

/** Prevent /read and other reserved segments from matching as chapters. */
export function isBtwChapterSlug(slug: string): boolean {
  if (slug === 'read') return false
  return BTW_CHAPTERS.some((c) => c.slug === slug)
}
