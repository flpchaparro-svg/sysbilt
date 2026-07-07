import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { PageMeta } from '../components/PageMeta'
import { SITE_ORIGIN } from '../constants/seoMeta'
import { GuideGateForm } from '../components/GuideGateForm'
import { BtwMeasuredGuide } from '../built-to-work/components/BtwMeasuredGuide'
import { BTW_STYLES } from '../built-to-work/styles'
import { BTM_HUB_PATH, BTM_BOOK_PATH } from '../built-to-multiply/chapter-seo'
import { BTM_CHAPTER_COVERS, BTM_HUB_OG } from '../built-to-multiply/chapter-covers'
import { BtmCoverPage, BtmClosingPage } from '../built-to-multiply/components/BtmCover'
import { BTM_CONTENT_PAGES } from '../built-to-multiply/pages'
import { BTM_META } from '../built-to-multiply/types'

const BTM_GUIDE_BOOK = {
  runningHeadTitle: BTM_META.title,
  chapterCovers: BTM_CHAPTER_COVERS,
} as const

/** Gated A4 book — noindex; public chapters are the canonical SEO surface. */
export default function BuiltToMultiplyBookPage() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('sysbilt_known_user') === 'true'
  })

  const bookUrl = `${SITE_ORIGIN}${BTM_BOOK_PATH}`

  return (
    <div className="btw-root btw-book-shell min-h-screen bg-[#1A1A1A] selection:bg-[#C5A059] selection:text-[#1A1A1A] pt-[100px] md:pt-[140px] pb-16 md:pb-24 print:pt-0 print:pb-0">
      <style>{BTW_STYLES}</style>
      <PageMeta
        title={`${BTM_META.title} — Full edition | SYSBILT`}
        description="Download or print the full A4 edition of Built to Multiply."
        canonical={bookUrl}
        robots="noindex, follow"
        ogImage={`${SITE_ORIGIN}${BTM_HUB_OG}`}
      />
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="btw-page-stack mx-auto flex w-full max-w-[840px] flex-col items-center gap-10 md:gap-14 px-4">
        <nav aria-label="Guide navigation" className="print:hidden relative z-20 w-full self-stretch">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link
              to={BTM_HUB_PATH}
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

        <BtmCoverPage />

        {!isUnlocked ? (
          <div className="w-full max-w-[794px] relative z-20 print:hidden">
            <GuideGateForm
              guideSlug={BTM_META.slug}
              guideName={BTM_META.title}
              onSuccess={() => setIsUnlocked(true)}
            />
          </div>
        ) : null}

        {isUnlocked ? (
          <>
            <BtwMeasuredGuide rawPages={BTM_CONTENT_PAGES} guide={BTM_GUIDE_BOOK} />
            <BtmClosingPage />
          </>
        ) : null}
      </div>
    </div>
  )
}
