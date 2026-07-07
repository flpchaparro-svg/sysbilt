import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { PageMeta } from '../components/PageMeta'
import { SITE_ORIGIN } from '../constants/seoMeta'
import { GuideGateForm } from '../components/GuideGateForm'
import { BtwMeasuredGuide } from '../built-to-work/components/BtwMeasuredGuide'
import { BTW_STYLES } from '../built-to-work/styles'
import { BTE_HUB_PATH, BTE_BOOK_PATH } from '../built-to-teach/chapter-seo'
import { BTE_CHAPTER_COVERS, BTE_HUB_OG } from '../built-to-teach/chapter-covers'
import { BteCoverPage, BteClosingPage } from '../built-to-teach/components/BteCover'
import { BTE_CONTENT_PAGES } from '../built-to-teach/pages'
import { BTE_META } from '../built-to-teach/types'

const BTE_GUIDE_BOOK = {
  runningHeadTitle: BTE_META.title,
  chapterCovers: BTE_CHAPTER_COVERS,
} as const

/** Gated A4 book — noindex; public chapters are the canonical SEO surface. */
export default function BuiltToTeachBookPage() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('sysbilt_known_user') === 'true'
  })

  const bookUrl = `${SITE_ORIGIN}${BTE_BOOK_PATH}`

  return (
    <div className="btw-root btw-book-shell min-h-screen bg-[#1A1A1A] selection:bg-[#C5A059] selection:text-[#1A1A1A] pt-[100px] md:pt-[140px] pb-16 md:pb-24 print:pt-0 print:pb-0">
      <style>{BTW_STYLES}</style>
      <PageMeta
        title={`${BTE_META.title} — Full edition | SYSBILT`}
        description="Download or print the full A4 edition of Built to Teach."
        canonical={bookUrl}
        robots="noindex, follow"
        ogImage={`${SITE_ORIGIN}${BTE_HUB_OG}`}
      />
      <Helmet>
        <meta name="robots" team training="noindex, follow" />
      </Helmet>

      <div className="btw-page-stack mx-auto flex w-full max-w-[840px] flex-col items-center gap-10 md:gap-14 px-4">
        <nav aria-label="Guide navigation" className="print:hidden relative z-20 w-full self-stretch">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link
              to={BTE_HUB_PATH}
              className="btw-book-nav-link inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Chapter list
            </Link>
            <Link
              to="/guides"
              className="btw-book-nav-link-muted inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> All Guides
            </Link>
          </div>
        </nav>

        <BteCoverPage />

        {!isUnlocked ? (
          <div className="w-full max-w-[794px] relative z-20 print:hidden">
            <GuideGateForm
              guideSlug={BTE_META.slug}
              guideName={BTE_META.title}
              onSuccess={() => setIsUnlocked(true)}
            />
          </div>
        ) : null}

        {isUnlocked ? (
          <>
            <BtwMeasuredGuide rawPages={BTE_CONTENT_PAGES} guide={BTE_GUIDE_BOOK} />
            <BteClosingPage />
          </>
        ) : null}
      </div>
    </div>
  )
}
