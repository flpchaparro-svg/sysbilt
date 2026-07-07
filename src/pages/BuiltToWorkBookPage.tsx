import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { PageMeta } from '../components/PageMeta'
import { SITE_ORIGIN } from '../constants/seoMeta'
import { GuideGateForm } from '../components/GuideGateForm'
import { BtwCoverPage, BtwClosingPage } from '../built-to-work/components/BtwCover'
import { BtwMeasuredGuide } from '../built-to-work/components/BtwMeasuredGuide'
import { BTW_CONTENT_PAGES } from '../built-to-work/pages'
import { BTW_STYLES } from '../built-to-work/styles'
import { BTW_HUB_PATH, BTW_BOOK_PATH } from '../built-to-work/chapter-seo'
import { BTW_META } from '../built-to-work/types'

/** Gated A4 book — noindex; public chapters are the canonical SEO surface. */
export default function BuiltToWorkBookPage() {
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('sysbilt_known_user') === 'true'
  })

  const bookUrl = `${SITE_ORIGIN}${BTW_BOOK_PATH}`

  return (
    <div className="btw-root btw-book-shell min-h-screen bg-[#1A1A1A] selection:bg-[#C5A059] selection:text-[#1A1A1A] pt-[100px] md:pt-[140px] pb-16 md:pb-24 print:pt-0 print:pb-0">
      <style>{BTW_STYLES}</style>
      <PageMeta
        title={`${BTW_META.title} — Full edition | SYSBILT`}
        description="Download or print the full A4 edition of Built to Work."
        canonical={bookUrl}
        robots="noindex, follow"
        ogImage={`${SITE_ORIGIN}/images/og-sysbilt.png`}
      />
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="btw-page-stack mx-auto flex w-full max-w-[840px] flex-col items-center gap-10 md:gap-14 px-4">
        <nav aria-label="Guide navigation" className="print:hidden relative z-20 w-full self-stretch">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link
              to={BTW_HUB_PATH}
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

        <BtwCoverPage />

        {!isUnlocked ? (
          <div className="w-full max-w-[794px] relative z-20 print:hidden">
            <GuideGateForm
              guideSlug={BTW_META.slug}
              guideName={BTW_META.title}
              onSuccess={() => setIsUnlocked(true)}
            />
          </div>
        ) : null}

        {isUnlocked ? (
          <>
            <BtwMeasuredGuide rawPages={BTW_CONTENT_PAGES} />
            <BtwClosingPage />
          </>
        ) : null}
      </div>
    </div>
  )
}
