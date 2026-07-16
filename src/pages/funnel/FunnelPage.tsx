import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {SysbiltLogo} from '../../components/SysbiltLogo'
import {PageMeta} from '../../components/PageMeta'
import {client} from '../../sanityClient'
import {SITE_ORIGIN} from '../../constants/seoMeta'
import {FunnelCtaBlock, FunnelLegalFooter, type FunnelCtaFields} from './FunnelCtaBlock'
import {FunnelPortableText} from './FunnelPortableText'

type FunnelPageDoc = FunnelCtaFields & {
  title?: string
  eyebrow?: string
  h1?: string
  sub?: string
  proofBlock?: unknown
  problemHeading?: string
  problemBody?: unknown
  alternativesHeading?: string
  alternativesBody?: unknown
  fixHeading?: string
  fixBullets?: string[]
  includedHeading?: string
  included?: string[]
  priceHeading?: string
  priceBlock?: unknown
  guaranteeLine?: string
  faqs?: Array<{question?: string; answer?: string}>
  finalHeading?: string
  'slug.current'?: string
}

const QUERY = `*[_type == "funnelPage" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  title,
  "slug": slug.current,
  eyebrow,
  h1,
  sub,
  ctaMode,
  ctaLabel,
  stripeUrl,
  schedulerUrl,
  secondaryCtaLabel,
  secondaryUrl,
  priceOptions[]{ label, ctaLabel, stripeUrl },
  proofBlock,
  problemHeading,
  problemBody,
  alternativesHeading,
  alternativesBody,
  fixHeading,
  fixBullets,
  includedHeading,
  included,
  priceHeading,
  priceBlock,
  guaranteeLine,
  faqs[]{ question, answer },
  finalHeading
}`

function SectionRule() {
  return <div className="h-px w-12 bg-gold/60 mb-6" aria-hidden />
}

const FunnelPage: React.FC = () => {
  const {slug} = useParams<{slug: string}>()
  const [doc, setDoc] = useState<FunnelPageDoc | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing' | 'error'>('loading')

  useEffect(() => {
    if (!slug) {
      setStatus('missing')
      return
    }
    let cancelled = false
    setStatus('loading')
    client
      .fetch(QUERY, {slug})
      .then((result: FunnelPageDoc | null) => {
        if (cancelled) return
        if (!result?.h1) {
          setDoc(null)
          setStatus('missing')
          return
        }
        setDoc(result)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  const ctaFields: FunnelCtaFields = {
    ctaMode: doc?.ctaMode,
    ctaLabel: doc?.ctaLabel,
    stripeUrl: doc?.stripeUrl,
    schedulerUrl: doc?.schedulerUrl,
    secondaryCtaLabel: doc?.secondaryCtaLabel,
    secondaryUrl: doc?.secondaryUrl,
    priceOptions: doc?.priceOptions,
  }

  const pageTitle = doc?.title ? `${doc.title} | SYSBILT` : 'SYSBILT'
  const pageDescription = doc?.sub || 'Fixed-scope service from SYSBILT.'

  return (
    <div className="min-h-screen bg-cream text-dark font-sans selection:bg-dark selection:text-cream">
      <PageMeta
        title={pageTitle}
        description={pageDescription}
        canonical={slug ? `${SITE_ORIGIN}/go/${slug}` : undefined}
        robots="noindex, nofollow"
      />

      <div className="max-w-3xl mx-auto px-6 md:px-10 pt-8 pb-16 md:pb-24">
        <div className="mb-10 md:mb-14">
          <SysbiltLogo className="w-[110px] md:w-[130px]" />
        </div>

        {status === 'loading' && (
          <p className="font-sans text-dark/50">Loading…</p>
        )}

        {status === 'error' && (
          <p className="font-sans text-dark/70">
            Something went wrong loading this page. Reply to any SYSBILT email and a human answers.
          </p>
        )}

        {status === 'missing' && (
          <p className="font-sans text-dark/70">
            This offer page is not available. If you followed a link from us, reply to that email and
            we will sort it.
          </p>
        )}

        {status === 'ready' && doc && (
          <>
            {/* Hero */}
            <header className="mb-14 md:mb-20">
              {doc.eyebrow ? (
                <p className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-dark/50 mb-5">
                  {doc.eyebrow}
                </p>
              ) : null}
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-dark mb-6">
                {doc.h1}
              </h1>
              {doc.sub ? (
                <p className="font-sans text-lg md:text-xl text-dark/75 leading-relaxed mb-8 max-w-2xl">
                  {doc.sub}
                </p>
              ) : null}
              <FunnelCtaBlock fields={ctaFields} />
            </header>

            {/* Proof */}
            {doc.proofBlock ? (
              <section className="mb-14 md:mb-16">
                <SectionRule />
                <FunnelPortableText value={doc.proofBlock} />
              </section>
            ) : null}

            {/* Problem */}
            <section className="mb-14 md:mb-16">
              <SectionRule />
              <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-dark mb-4">
                {doc.problemHeading}
              </h2>
              <FunnelPortableText value={doc.problemBody} />
            </section>

            {/* Alternatives */}
            {doc.alternativesHeading || doc.alternativesBody ? (
              <section className="mb-14 md:mb-16">
                <SectionRule />
                {doc.alternativesHeading ? (
                  <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-dark mb-4">
                    {doc.alternativesHeading}
                  </h2>
                ) : null}
                <FunnelPortableText value={doc.alternativesBody} />
              </section>
            ) : null}

            {/* Fix */}
            <section className="mb-14 md:mb-16">
              <SectionRule />
              <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-dark mb-6">
                {doc.fixHeading}
              </h2>
              <ul className="space-y-3">
                {(doc.fixBullets || []).map((item, i) => (
                  <li key={i} className="flex gap-3 font-sans text-base md:text-lg text-dark/80 leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-text" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Included */}
            <section className="mb-14 md:mb-16">
              <SectionRule />
              <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-dark mb-6">
                {doc.includedHeading}
              </h2>
              <ul className="space-y-3">
                {(doc.included || []).map((item, i) => (
                  <li key={i} className="flex gap-3 font-sans text-base md:text-lg text-dark/80 leading-relaxed">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-text" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Price */}
            <section className="mb-14 md:mb-16">
              <SectionRule />
              <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-dark mb-4">
                {doc.priceHeading}
              </h2>
              <FunnelPortableText value={doc.priceBlock} />
              {doc.guaranteeLine ? (
                <p className="mt-4 font-sans text-base md:text-lg text-dark/80 leading-relaxed">
                  {doc.guaranteeLine}
                </p>
              ) : null}
              <div className="mt-8">
                <FunnelCtaBlock fields={ctaFields} />
              </div>
            </section>

            {/* FAQ */}
            {(doc.faqs || []).length > 0 ? (
              <section className="mb-14 md:mb-16">
                <SectionRule />
                <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-dark mb-8">
                  Questions
                </h2>
                <dl className="space-y-8">
                  {(doc.faqs || []).map((faq, i) => (
                    <div key={i}>
                      <dt className="font-serif text-lg md:text-xl text-dark mb-2">{faq.question}</dt>
                      <dd className="font-sans text-base text-dark/75 leading-relaxed">{faq.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            {/* Final CTA */}
            <section className="mb-8">
              <SectionRule />
              <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-dark mb-8">
                {doc.finalHeading}
              </h2>
              <FunnelCtaBlock fields={ctaFields} quietLabel="Prefer to talk first? Book 15 minutes." />
            </section>

            <FunnelLegalFooter />
          </>
        )}

        {(status === 'missing' || status === 'error') && <FunnelLegalFooter />}
      </div>
    </div>
  )
}

export default FunnelPage
