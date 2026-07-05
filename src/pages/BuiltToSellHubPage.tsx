import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PageMeta } from '../components/PageMeta'
import { SITE_ORIGIN } from '../constants/seoMeta'
import {
  BTS_CHAPTERS,
  BTS_HUB_PATH,
  btsChapterPath,
} from '../built-to-sell/chapter-seo'
import { BtsPdfCta } from '../built-to-sell/components/BtsPdfCta'
import { BTS_META } from '../built-to-sell/types'
import { BTS_HUB_OG } from '../built-to-sell/chapter-covers'

export default function BuiltToSellHubPage() {
  const hubUrl = `${SITE_ORIGIN}${BTS_HUB_PATH}`
  const htmlTitle = 'Online Stores That Sell: The Complete Guide | SYSBILT'
  const description = BTS_META.seoDescription

  return (
    <div className="min-h-screen bg-cream text-dark selection:bg-dark selection:text-cream pt-[100px] md:pt-[140px] pb-16 md:pb-24">
      <PageMeta
        title={htmlTitle}
        description={description}
        canonical={hubUrl}
        ogImage={`${SITE_ORIGIN}${BTS_HUB_OG}`}
      />
      {/* JSON-LD (CollectionPage + BreadcrumbList) is stamped into static HTML at build time. */}

      <div className="mx-auto w-full max-w-[840px] px-4 md:px-6">
        <Link
          to="/guides"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark/45 hover:text-dark transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" /> All Guides
        </Link>

        <header className="mb-12 md:mb-16 border-b-2 border-dark pb-10">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-gold-on-cream mb-4">
            / A field guide for store owners
          </div>
          <h1 className="font-serif text-[clamp(40px,7vw,64px)] font-medium leading-[1.02] tracking-[-0.035em] text-dark m-0 mb-5">
            How modern online stores actually work
          </h1>
          <p className="font-sans text-[17px] md:text-[19px] leading-relaxed text-dark/70 max-w-prose m-0">
            {BTS_META.subtitle} Read every chapter free on the web, or download the full A4 edition to print or save as PDF.
          </p>
        </header>

        <section aria-labelledby="bts-chapters-heading" className="mb-14">
          <h2
            id="bts-chapters-heading"
            className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-dark/45 mb-6 m-0"
          >
            Twelve chapters
          </h2>
          <ol className="list-none p-0 m-0 flex flex-col gap-0 border-2 border-dark divide-y divide-dark">
            {BTS_CHAPTERS.map((ch) => (
              <li key={ch.slug}>
                <Link
                  to={btsChapterPath(ch.slug)}
                  className="group flex items-start gap-4 md:gap-6 p-5 md:p-6 hover:bg-dark hover:text-cream transition-colors"
                >
                  <span className="font-mono text-[11px] font-bold tracking-widest text-gold-on-cream group-hover:text-gold-on-dark shrink-0 pt-1">
                    {String(ch.num).padStart(2, '0')}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-serif text-lg md:text-xl font-medium leading-snug mb-1">
                      {ch.h1}
                    </span>
                    {ch.subtitle ? (
                      <span className="block font-sans text-sm leading-relaxed text-dark/55 group-hover:text-cream/75">
                        {ch.subtitle}
                      </span>
                    ) : null}
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all mt-1" />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <BtsPdfCta />
      </div>
    </div>
  )
}
