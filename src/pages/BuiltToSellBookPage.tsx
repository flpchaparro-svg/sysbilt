import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { PageMeta } from '../components/PageMeta'
import { SITE_ORIGIN } from '../constants/seoMeta'
import { GuideGateForm } from '../components/GuideGateForm'
import { BtwMeasuredGuide } from '../built-to-work/components/BtwMeasuredGuide'
import { BTW_STYLES } from '../built-to-work/styles'
import { BTS_HUB_PATH, BTS_BOOK_PATH } from '../built-to-sell/chapter-seo'
import { BTS_CHAPTER_COVERS, BTS_HUB_OG } from '../built-to-sell/chapter-covers'
import { BtsCoverPage, BtsClosingPage } from '../built-to-sell/components/BtsCover'
import { BTS_CONTENT_PAGES } from '../built-to-sell/pages'
import { BTS_META } from '../built-to-sell/types'

const BTS_GUIDE_BOOK = {
  runningHeadTitle: BTS_META.title,
  chapterCovers: BTS_CHAPTER_COVERS,
} as const

/** Gated A4 book — noindex; public chapters are the canonical SEO surface. */
export default function BuiltToSellBookPage() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('sysbilt_known_user') === 'true'
  })

  const bookUrl = `${SITE_ORIGIN}${BTS_BOOK_PATH}`

  return (
    <div className="btw-root min-h-screen bg-[#1A1A1A] selection:bg-[#C5A059] selection:text-[#1A1A1A] pt-[100px] md:pt-[140px] pb-16 md:pb-24">
      <style>{BTW_STYLES}</style>
      <PageMeta
        title={`${BTS_META.title} — Full edition | SYSBILT`}
        description="Download or print the full A4 edition of Built to Sell."
        canonical={bookUrl}
        robots="noindex, follow"
        ogImage={`${SITE_ORIGIN}${BTS_HUB_OG}`}
      />
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="btw-page-stack mx-auto flex w-full max-w-[840px] flex-col items-center gap-10 md:gap-14 px-4">
        <nav aria-label="Guide navigation" className="print:hidden relative z-20 w-full self-stretch">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link
              to={BTS_HUB_PATH}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#FFF2EC]/50 transition-colors hover:text-[#FFF2EC]"
            >
              <ArrowLeft className="h-4 w-4" /> Chapter list
            </Link>
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#FFF2EC]/35 transition-colors hover:text-[#FFF2EC]/85"
            >
              <ArrowLeft className="h-4 w-4" /> All Guides
            </Link>
          </div>
        </nav>

        <BtsCoverPage />

        {!isUnlocked ? (
          <div className="w-full max-w-[794px] relative z-20 print:hidden">
            <GuideGateForm
              guideSlug={BTS_META.slug}
              guideName={BTS_META.title}
              onSuccess={() => setIsUnlocked(true)}
            />
          </div>
        ) : null}

        {isUnlocked ? (
          <>
            <BtwMeasuredGuide rawPages={BTS_CONTENT_PAGES} guide={BTS_GUIDE_BOOK} />
            <BtsClosingPage />
          </>
        ) : null}
      </div>
    </div>
  )
}
