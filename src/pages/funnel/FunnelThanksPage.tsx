import React from 'react'
import {useSearchParams} from 'react-router-dom'
import {SysbiltLogo} from '../../components/SysbiltLogo'
import {PageMeta} from '../../components/PageMeta'
import {SITE_ORIGIN} from '../../constants/seoMeta'
import {accessFormPathForProduct} from '../../constants/funnel'
import {FunnelPrimaryLink, FunnelLegalFooter} from './FunnelCtaBlock'

const FunnelThanksPage: React.FC = () => {
  const [params] = useSearchParams()
  const product = params.get('p')
  const mode = params.get('m')
  const formUrl = accessFormPathForProduct(product, mode)

  return (
    <div className="min-h-screen bg-cream text-dark font-sans selection:bg-dark selection:text-cream">
      <PageMeta
        title="Paid, confirmed | SYSBILT"
        description="Your payment is confirmed. Complete the access form so we can start delivery."
        canonical={`${SITE_ORIGIN}/go/thanks`}
        robots="noindex, nofollow"
      />

      <div className="max-w-3xl mx-auto px-6 md:px-10 pt-8 pb-16 md:pb-24">
        <div className="mb-10 md:mb-14">
          <SysbiltLogo className="w-[110px] md:w-[130px]" />
        </div>

        <h1 className="font-serif text-4xl md:text-5xl leading-[1.05] tracking-tight text-dark mb-6">
          Paid, confirmed, and we're on it.
        </h1>
        <p className="font-sans text-lg md:text-xl text-dark/75 leading-relaxed mb-10 max-w-2xl">
          One thing stands between payment and delivery: the access form below. It takes about five
          minutes, we only ask for what the job needs, and your delivery clock starts the moment it's
          submitted.
        </p>

        <FunnelPrimaryLink href={formUrl}>Complete the access form now</FunnelPrimaryLink>

        <p className="mt-8 font-sans text-sm text-dark/55 leading-relaxed max-w-xl">
          Stuck or unsure about anything? Reply to your payment confirmation email and a human
          answers.
        </p>

        <FunnelLegalFooter />
      </div>
    </div>
  )
}

export default FunnelThanksPage
