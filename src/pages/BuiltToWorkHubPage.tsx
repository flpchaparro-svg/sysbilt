import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { PageMeta } from '../components/PageMeta'
import { SITE_ORIGIN } from '../constants/seoMeta'
import {
  BTW_CHAPTERS,
  BTW_HUB_PATH,
  btwChapterPath,
} from '../built-to-work/chapter-seo'
import { BtwPdfCta } from '../built-to-work/components/BtwPdfCta'
import { BTW_META } from '../built-to-work/types'

export default function BuiltToWorkHubPage() {
  const hubUrl = `${SITE_ORIGIN}${BTW_HUB_PATH}`
  const htmlTitle = `Lead-Generation Websites: The Complete Guide | SYSBILT`
  const description = BTW_META.seoDescription

  const bookJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: BTW_META.title,
    description,
    author: { '@type': 'Organization', name: 'SYSBILT', url: SITE_ORIGIN },
    publisher: { '@type': 'Organization', name: 'SYSBILT', url: SITE_ORIGIN },
    url: hubUrl,
    hasPart: BTW_CHAPTERS.map((ch) => ({
      '@type': 'Chapter',
      name: ch.h1,
      url: `${SITE_ORIGIN}${btwChapterPath(ch.slug)}`,
      position: ch.num,
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElements: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_ORIGIN}/guides` },
      { '@type': 'ListItem', position: 3, name: BTW_META.title, item: hubUrl },
    ],
  }

  return (
    <div className="min-h-screen bg-cream text-dark selection:bg-dark selection:text-cream pt-[100px] md:pt-[140px] pb-16 md:pb-24">
      <PageMeta
        title={htmlTitle}
        description={description}
        canonical={hubUrl}
        ogImage={`${SITE_ORIGIN}/images/og-sysbilt.png`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(bookJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <div className="mx-auto w-full max-w-[840px] px-4 md:px-6">
        <Link
          to="/guides"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark/45 hover:text-dark transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" /> All Guides
        </Link>

        <header className="mb-12 md:mb-16 border-b-2 border-dark pb-10">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-gold-on-cream mb-4">
            / A field guide for business owners
          </div>
          <h1 className="font-serif text-[clamp(40px,7vw,64px)] font-medium leading-[1.02] tracking-[-0.035em] text-dark m-0 mb-5">
            How modern business websites actually work
          </h1>
          <p className="font-sans text-[17px] md:text-[19px] leading-relaxed text-dark/70 max-w-prose m-0">
            {BTW_META.subtitle} Read every chapter free on the web, or download the full A4 edition to print or save as PDF.
          </p>
        </header>

        <section aria-labelledby="btw-chapters-heading" className="mb-14">
          <h2
            id="btw-chapters-heading"
            className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-dark/45 mb-6 m-0"
          >
            Twelve chapters
          </h2>
          <ol className="list-none p-0 m-0 flex flex-col gap-0 border-2 border-dark divide-y divide-dark">
            {BTW_CHAPTERS.map((ch) => (
              <li key={ch.slug}>
                <Link
                  to={btwChapterPath(ch.slug)}
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

        <BtwPdfCta />
      </div>
    </div>
  )
}
