import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { PageMeta } from '../components/PageMeta'
import { SITE_ORIGIN } from '../constants/seoMeta'
import { GuideGateForm } from '../components/GuideGateForm'
import { BTW_STYLES } from '../built-to-work/styles'
import { BTS_HUB_PATH, BTS_BOOK_PATH } from '../built-to-sell/chapter-seo'
import { BTS_META } from '../built-to-sell/types'

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
        ogImage={`${SITE_ORIGIN}/images/og-sysbilt.png`}
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

        <header className="w-full max-w-[794px] border-2 border-[#FFF2EC]/20 bg-[#111111] p-8 md:p-12 text-center">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4A84B] mb-4">
            / {BTS_META.badgeLabel}
          </div>
          <h1 className="font-serif text-[clamp(32px,5vw,48px)] font-medium leading-[1.05] tracking-[-0.03em] text-[#FFF2EC] m-0 mb-4">
            {BTS_META.title}
          </h1>
          <p className="font-sans text-[15px] leading-relaxed text-[#FFF2EC]/65 m-0 max-w-prose mx-auto">
            {BTS_META.coverLegend}
          </p>
        </header>

        {!isUnlocked ? (
          <div className="w-full max-w-[794px] relative z-20 print:hidden">
            <GuideGateForm
              guideSlug={BTS_META.slug}
              guideName={BTS_META.title}
              onSuccess={() => setIsUnlocked(true)}
            />
          </div>
        ) : (
          <div className="w-full max-w-[794px] border border-[#FFF2EC]/15 bg-[#111111] p-8 md:p-10 text-center print:hidden">
            <p className="font-sans text-[15px] leading-relaxed text-[#FFF2EC]/70 m-0 mb-6">
              The full A4 book layout is being prepared. Read every chapter free on the web in the meantime.
            </p>
            <Link
              to={BTS_HUB_PATH}
              className="inline-flex font-mono text-[11px] font-bold uppercase tracking-[0.18em] border-2 border-[#D4A84B] text-[#D4A84B] px-5 py-3 hover:bg-[#D4A84B] hover:text-[#1A1A1A] transition-colors"
            >
              Browse chapters
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
