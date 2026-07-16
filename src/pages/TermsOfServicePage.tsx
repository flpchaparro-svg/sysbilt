import React from 'react'
import {m} from 'framer-motion'
import BackButton from '../components/BackButton'
import {PageMeta} from '../components/PageMeta'
import {SEO_META} from '../constants/seoMeta'

interface TermsOfServicePageProps {
  onBack: () => void
  onNavigate?: (view: string) => void
}

const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({onBack}) => {
  return (
    <m.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className="min-h-screen bg-cream text-dark font-sans selection:bg-gold/30"
    >
      <PageMeta
        title={SEO_META.terms.title}
        description={SEO_META.terms.description}
        canonical={SEO_META.terms.canonical}
      />
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-32">
        <div className="mb-16">
          <BackButton onClick={onBack} label="Return to Home" />
        </div>

        <div className="mb-24 border-b border-dark/10 pb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-muted mb-4 block">
            / LEGAL
          </span>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tighter text-dark">
            Terms of{' '}
            <span className="italic font-serif text-gold-on-cream">Service.</span>
          </h1>
          <p className="mt-8 font-sans text-lg text-dark/80 max-w-2xl">
            The plain-English terms for SYSBILT's fixed-scope services: what's included, how delivery
            works, and where you stand.
          </p>
          <p className="mt-4 font-mono text-xs text-dark/50 uppercase tracking-widest">
            Version 1.0, July 2026
          </p>
        </div>

        <div className="space-y-16 max-w-3xl">
          <section>
            <h2 className="font-serif text-2xl mb-4">1. Who we are</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              SYSBILT is a Sydney-based business systems firm. Our ABN appears on every invoice and
              receipt (ABN 56 115 228 020). When these terms say "we" or "us", that's SYSBILT. "You"
              means the business purchasing the service.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">2. What these terms cover</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              These terms apply to fixed-scope services purchased through our payment links or
              accepted quotes. Paying for a service means you've read and accepted these terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">3. The deal, plainly</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              Each service has a fixed price, a defined scope described on its page or quote, and a
              delivery window. You pay once, up front. The delivery window starts when you submit the
              access form with what the job needs, not at the moment of payment, because we can't
              start without access.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">4. Scope</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              The scope is what's written on the service page or quote, nothing more and nothing less.
              If your situation sits outside the stated scope, for example a much larger site than the
              page describes, we'll tell you before starting and give you a same-day quote for the
              real job instead. You can accept it or take a full refund of what you paid, since no
              work has started.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">5. Your part</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              You agree to provide accurate information and timely access to the accounts and systems
              the job needs. If access or information is delayed on your side, the delivery clock
              pauses until it arrives.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">6. Our delivery promise</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              Each service page states what "done" looks like. If the outcome isn't delivered as
              described, we keep working at no extra cost until it is. That promise is the heart of
              these terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">7. Refunds</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              There's no change-of-mind refund, because work begins as soon as access arrives. Where a
              service page states a specific refund exception, such as a Google Business Profile
              recovery that's genuinely beyond saving, that exception applies as written and you'll get
              a straight answer plus a refund of anything we couldn't do. Nothing in these terms
              excludes, restricts or modifies any consumer guarantees or other rights you have under
              the Australian Consumer Law or any other law that can't be excluded.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">8. Aftercare</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              Each service includes the aftercare period stated on its page, normally 14 days on
              everything we touched. If something we changed misbehaves in that window, we fix it at
              no charge.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">9. Ownership</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              On full payment, everything we build or configure inside your website and accounts is
              yours. Access and ownership stay locked to your accounts, not ours.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">10. Third-party costs</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              Some services rely on third-party tools with their own small running costs, for example
              per-message SMS fees through your messaging account. Where these exist, the service page
              states them plainly. They're billed by the provider, not by us.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">11. Privacy and confidentiality</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              We access only what the job needs, and we treat your business information as
              confidential. Our Privacy Policy at sysbilt.com/privacy explains how we handle personal
              information.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">12. Liability</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              To the extent the law allows, our total liability for a service is capped at the amount
              you paid for that service, and we're not liable for indirect or consequential loss. This
              clause doesn't limit anything the Australian Consumer Law says can't be limited.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl mb-4">13. The general bits</h2>
            <p className="font-sans text-base text-dark/70 leading-relaxed">
              These terms are governed by the laws of New South Wales. We may update these terms from
              time to time; the version on this page at the time of your purchase is the one that
              applies to it.
            </p>
            <p className="font-sans text-base text-dark/70 leading-relaxed mt-4">
              Questions about any of this, before or after buying: reply to any email from us and a
              human answers.
            </p>
          </section>
        </div>
      </div>
    </m.div>
  )
}

export default TermsOfServicePage
