import React, {useEffect, useMemo, useState} from 'react'
import {motion, useInView, useReducedMotion} from 'framer-motion'
import {useParams, useSearchParams} from 'react-router-dom'
import {SysbiltLogo} from '../../components/SysbiltLogo'
import {PageMeta} from '../../components/PageMeta'
import {client} from '../../sanityClient'
import {SITE_ORIGIN} from '../../constants/seoMeta'
import {FunnelCtaBlock, FunnelLegalFooter, type FunnelCtaFields} from './FunnelCtaBlock'
import {ScoreMoment} from './ScoreMoment'
import {CallMissedMoment, MissedCallLeakPair} from './CallMissedMoment'
import {PainCostCards} from './PainCostCards'
import {MissedCallPainCards} from './MissedCallPainCards'
import {GoogleProfilePainCards} from './GoogleProfilePainCards'
import {SearchPainCards} from './SearchPainCards'
import {LandingPainCards} from './LandingPainCards'
import {CrmPainCards} from './CrmPainCards'
import {TeamRecognitionCards, TeamPainCards} from './TeamRecognitionCards'
import {LostClientCalculator} from './LostClientCalculator'
import {BenefitMotionRows} from './BenefitMotionRows'
import {StackMotionRows} from './StackMotionRows'
import {FunnelObjections} from './FunnelObjections'
import {ReportDeliverableMock} from './ReportDeliverableMock'
import {TextBackDeliverableMock} from './TextBackDeliverableMock'
import {ProfileDeliverableMock} from './ProfileDeliverableMock'
import {ProfileAfterMoment} from './ProfileAfterMoment'
import {IndexCheckMoment, type IndexCheckEvidence} from './IndexCheckMoment'
import {SearchVisibilityLeakPair} from './SearchVisibilityLeakPair'
import {SearchRecoveryMock} from './SearchRecoveryMock'
import {AdEvidenceMoment, type AdEvidence} from './AdEvidenceMoment'
import {LandingLeakPair} from './LandingLeakPair'
import {LandingDoorMock} from './LandingDoorMock'
import {CrmLeakPair} from './CrmLeakPair'
import {CrmFixedThreadMock} from './CrmFixedThreadMock'
import {
  CrmEnquiryEvidenceCard,
  type CrmEnquiryEvidence,
} from './CrmEnquiryEvidenceCard'
import {TeamSessionDeliverableMock} from './TeamSessionDeliverableMock'
import {
  MissedCallEvidenceCard,
  type MissedCallEvidence,
} from './MissedCallEvidenceCard'
import {
  GoogleProfileEvidenceCard,
  type GoogleProfileEvidence,
} from './GoogleProfileEvidenceCard'
import {GoogleFrontDoorPanel} from './GoogleFrontDoorPanel'
import {ChangeRiskRegisterCard} from './ChangeRiskRegisterCard'
import {ChangeLeakPair} from './ChangeLeakPair'
import {ChangePainCards} from './ChangePainCards'
import {ChangePackDeliverableMock} from './ChangePackDeliverableMock'
import {ContentLastPostCard} from './ContentLastPostCard'
import {ContentFeedLeakPair} from './ContentFeedLeakPair'
import {ContentPainCards} from './ContentPainCards'
import {ContentMonthDeliverableMock} from './ContentMonthDeliverableMock'
import {ReviewEvidenceCard} from './ReviewEvidenceCard'
import {ReviewLeakPair} from './ReviewLeakPair'
import {ReviewPainCards} from './ReviewPainCards'
import {ReviewDeliverableMock} from './ReviewDeliverableMock'
import {
  AiPhoneEvidenceCard,
  type AiPhoneEvidence,
} from './AiPhoneEvidenceCard'
import {AiPhoneLeakPair} from './AiPhoneLeakPair'
import {AiPhonePainCards} from './AiPhonePainCards'
import {AiPhoneDeliverableMock} from './AiPhoneDeliverableMock'
import {BookingEvidenceCard} from './BookingEvidenceCard'
import {BookingLeakPair} from './BookingLeakPair'
import {BookingPainCards} from './BookingPainCards'
import {BookingDeliverableMock} from './BookingDeliverableMock'
import {FunnelComingSoonCta} from './FunnelComingSoonCta'
import {EnquiryReplyEvidenceCard} from './EnquiryReplyEvidenceCard'
import {EnquiryReplyLeakPair} from './EnquiryReplyLeakPair'
import {EnquiryReplyPainCards} from './EnquiryReplyPainCards'
import {EnquiryReplyDeliverableMock} from './EnquiryReplyDeliverableMock'
import {ProfilePostingEvidenceCard} from './ProfilePostingEvidenceCard'
import {ProfilePostingLeakPair} from './ProfilePostingLeakPair'
import {ProfilePostingPainCards} from './ProfilePostingPainCards'
import {ProfilePostingDeliverableMock} from './ProfilePostingDeliverableMock'
import {LocalPackEvidenceCard} from './LocalPackEvidenceCard'
import {LocalPackLeakPair} from './LocalPackLeakPair'
import {LocalPackPainCards} from './LocalPackPainCards'
import {LocalPackDeliverableMock} from './LocalPackDeliverableMock'
import {ConversionEvidenceCard} from './ConversionEvidenceCard'
import {ConversionLeakPair} from './ConversionLeakPair'
import {ConversionPainCards} from './ConversionPainCards'
import {ConversionDeliverableMock} from './ConversionDeliverableMock'
import {OnpageEvidenceCard} from './OnpageEvidenceCard'
import {OnpageLeakPair} from './OnpageLeakPair'
import {OnpagePainCards} from './OnpagePainCards'
import {OnpageDeliverableMock} from './OnpageDeliverableMock'
import {SchemaFaqEvidenceCard} from './SchemaFaqEvidenceCard'
import {SchemaFaqLeakPair} from './SchemaFaqLeakPair'
import {SchemaFaqPainCards} from './SchemaFaqPainCards'
import {SchemaFaqDeliverableMock} from './SchemaFaqDeliverableMock'
import {TrackingFormsEvidenceCard} from './TrackingFormsEvidenceCard'
import {TrackingFormsLeakPair} from './TrackingFormsLeakPair'
import {TrackingFormsPainCards} from './TrackingFormsPainCards'
import {TrackingFormsDeliverableMock} from './TrackingFormsDeliverableMock'
import {SiteChatEvidenceCard} from './SiteChatEvidenceCard'
import {SiteChatLeakPair} from './SiteChatLeakPair'
import {SiteChatPainCards} from './SiteChatPainCards'
import {SiteChatDeliverableMock} from './SiteChatDeliverableMock'
import {MediaCleanEvidenceCard} from './MediaCleanEvidenceCard'
import {MediaCleanLeakPair} from './MediaCleanLeakPair'
import {MediaCleanPainCards} from './MediaCleanPainCards'
import {MediaCleanDeliverableMock} from './MediaCleanDeliverableMock'
import {WebsiteEvidenceCard, type WebsiteEvidence} from './WebsiteEvidenceCard'
import {WebsiteLeakPair} from './WebsiteLeakPair'
import {WebsiteUnknownsCentrepiece} from './WebsiteUnknownsCentrepiece'
import {WebsiteFixTiers} from './WebsiteFixTiers'
import {WebsiteDeliverableMock} from './WebsiteDeliverableMock'
import {WebsitePainCards} from './WebsitePainCards'
import {
  parseBlockedPages,
  parseNoSiteFlag,
  parseReviewCount,
  parseSpeedScore,
  sanitiseBusinessName,
  sanitiseCallDay,
  sanitiseCallTime,
  sanitiseCompetitorName,
  sanitiseLastPostMonth,
} from './funnelPersonalise'
import {FUNNEL_COLOURS, FUNNEL_CSS_VARS} from './funnelTheme'
import {Reveal, RevealList} from './funnelReveal'
import {websiteEnrolmentPriceOptions} from '../../constants/websiteStripe'
import {BOOKING_STRIPE_URL} from '../../constants/bookingStripe'
import {SPEED_FIX_STRIPE_URL} from '../../constants/speedFixStripe'
import {GOOGLE_PROFILE_STRIPE_URL} from '../../constants/googleProfileStripe'
import {MISSED_CALL_STRIPE_URL} from '../../constants/missedCallStripe'
import {SEARCH_FIX_STRIPE_URL} from '../../constants/searchFixStripe'
import {REVIEWS_STRIPE_URL} from '../../constants/reviewsStripe'
import {CRM_RESCUE_STRIPE_URL} from '../../constants/crmRescueStripe'
import {LANDING_PAGE_STRIPE_URL} from '../../constants/landingStripe'
import {AI_PHONE_STRIPE_URL} from '../../constants/aiPhoneStripe'
import {PROFILE_POSTING_STRIPE_URL} from '../../constants/profilePostingStripe'
import {ENQUIRY_REPLY_STRIPE_URL} from '../../constants/enquiryReplyStripe'
import {LOCAL_PACK_STRIPE_URL} from '../../constants/localPackStripe'
import {CONVERSION_PASS_STRIPE_URL} from '../../constants/conversionPassStripe'
import {ONPAGE_SEARCH_STRIPE_URL} from '../../constants/onpageSearchStripe'
import {SCHEMA_FAQ_STRIPE_URL} from '../../constants/schemaFaqStripe'
import {TRACKING_FORMS_STRIPE_URL} from '../../constants/trackingFormsStripe'
import {SITE_CHAT_STRIPE_URL} from '../../constants/siteChatStripe'
import {MEDIA_CLEAN_STRIPE_URL} from '../../constants/mediaCleanStripe'
import {teamAiPriceOptions} from '../../constants/teamAiStripe'
import {funnelCopyForSlug} from './funnelCopy'
import {
  FUNNEL_PRODUCT_LABELS,
  accessFormPathForProduct,
  isFunnelProductCode,
} from '../../constants/funnel'

type FunnelPageDoc = FunnelCtaFields & {
  title?: string
  ctaLabel?: string | null
  faqs?: Array<{question?: string; answer?: string}>
}

const QUERY = `*[_type == "funnelPage" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  title,
  "slug": slug.current,
  ctaMode,
  ctaLabel,
  stripeUrl,
  schedulerUrl,
  waitlistUrl,
  secondaryCtaLabel,
  secondaryUrl,
  priceOptions[]{ label, ctaLabel, stripeUrl },
  faqs[]{ question, answer }
}`

function SectionLabel({
  children,
  onDark = false,
}: {
  children: React.ReactNode
  onDark?: boolean
}) {
  return (
    <p
      className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.28em] mb-4"
      style={{color: onDark ? `${FUNNEL_COLOURS.onInk}70` : FUNNEL_COLOURS.steel}}
    >
      {children}
    </p>
  )
}

function SectionRule({onDark = false}: {onDark?: boolean}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, {once: true, amount: 0.2})
  const show = reduce || inView
  return (
    <motion.div
      ref={ref}
      className="h-px w-12 mb-10 md:mb-12 origin-left"
      style={{backgroundColor: onDark ? FUNNEL_COLOURS.goldLight : FUNNEL_COLOURS.gold}}
      initial={reduce ? false : {scaleX: 0}}
      animate={show ? {scaleX: 1} : {scaleX: 0}}
      transition={{duration: 0.65, ease: [0.16, 1, 0.3, 1]}}
      aria-hidden
    />
  )
}

function ProcessDayCards({
  steps,
}: {
  steps: Array<{label: string; text: string}>
}) {
  const reduce = useReducedMotion()

  return (
    <div
      className={`grid grid-cols-1 gap-4 md:gap-5 ${
        steps.length === 2 ? 'sm:grid-cols-2 max-w-2xl' : 'sm:grid-cols-3'
      }`}
    >
      {steps.map((step, i) => (
        <motion.div
          key={i}
          className="group border bg-cream p-5 md:p-6 flex flex-col min-h-[160px] cursor-default"
          style={{
            borderColor: `${FUNNEL_COLOURS.ink}22`,
            boxShadow: '4px 4px 0 0 rgba(26,26,26,0.06)',
          }}
          initial={reduce ? false : {opacity: 0, y: 18}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.4}}
          transition={{duration: 0.45, delay: i * 0.12, ease: [0.16, 1, 0.3, 1]}}
          whileHover={
            reduce
              ? undefined
              : {
                  y: -6,
                  borderColor: FUNNEL_COLOURS.gold,
                  boxShadow: '6px 10px 0 0 rgba(197,160,89,0.28)',
                  backgroundColor: FUNNEL_COLOURS.surface,
                }
          }
        >
          <div
            className="h-px mb-4 w-8 transition-all duration-200 ease-out group-hover:w-14"
            style={{backgroundColor: FUNNEL_COLOURS.gold}}
            aria-hidden
          />
          <p
            className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3 transition-[letter-spacing] duration-200 group-hover:tracking-[0.28em]"
            style={{color: FUNNEL_COLOURS.goldDeep}}
          >
            {step.label}
          </p>
          <p
            className="font-sans text-sm md:text-[15px] leading-relaxed mt-auto"
            style={{color: FUNNEL_COLOURS.muted}}
          >
            {step.text}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

const FunnelPage: React.FC = () => {
  const {slug} = useParams<{slug: string}>()
  const [params] = useSearchParams()
  const [doc, setDoc] = useState<FunnelPageDoc | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing' | 'error'>('loading')

  const COPY = useMemo(() => funnelCopyForSlug(slug), [slug])
  const business = useMemo(() => sanitiseBusinessName(params.get('b')), [params])
  const competitor = useMemo(() => sanitiseCompetitorName(params.get('c')), [params])
  const score = useMemo(() => parseSpeedScore(params.get('s')), [params])
  const noSite = useMemo(() => parseNoSiteFlag(params.get('nosite')), [params])
  const blockedPages = useMemo(() => parseBlockedPages(params.get('n')), [params])
  const callDay = useMemo(() => sanitiseCallDay(params.get('d')), [params])
  const callTime = useMemo(() => sanitiseCallTime(params.get('t')), [params])
  const proofKind = COPY.proofKind
  const isMissedCall = proofKind === 'missed-call'
  const isGoogleProfile = proofKind === 'google-profile'
  const isSearchFix = proofKind === 'search-fix'
  const isLandingPage = proofKind === 'landing-page'
  const isCrmRescue = proofKind === 'crm-rescue'
  const isTeamAi = proofKind === 'team-ai'
  const isChangePack = proofKind === 'change-pack'
  const isContentSystem = proofKind === 'content-system'
  const isReviews = proofKind === 'reviews'
  const isAiPhone = proofKind === 'ai-phone'
  const isBooking = proofKind === 'booking'
  const isSpeed = proofKind === 'speed'
  const isWebsite = proofKind === 'website'
  const isEnquiryReply = proofKind === 'enquiry-reply'
  const isProfilePosting = proofKind === 'profile-posting'
  const isLocalPack = proofKind === 'local-pack'
  const isConversionPass = proofKind === 'conversion-pass'
  const isOnpageSearch = proofKind === 'onpage-search'
  const isSchemaFaq = proofKind === 'schema-faq'
  const isTrackingForms = proofKind === 'tracking-forms'
  const isSiteChat = proofKind === 'site-chat'
  const isMediaClean = proofKind === 'media-clean'
  const isDraftSoon =
    proofKind === 'geo' || proofKind === 'client-finder' || proofKind === 'draft'
  /** Visual drafts and priced-but-not-wired products that are not buyable yet. */
  const usesComingSoonCta = isDraftSoon
  const lastPostMonth = useMemo(() => sanitiseLastPostMonth(params.get('m')), [params])
  const yourReviews = useMemo(() => parseReviewCount(params.get('n')), [params])
  const theirReviews = useMemo(() => parseReviewCount(params.get('r')), [params])
  const motionVariant = isMissedCall
    ? 'missed-call'
    : isGoogleProfile
      ? 'google-profile'
      : isSearchFix
        ? 'search-fix'
        : isWebsite
          ? 'website'
          : isLandingPage || isDraftSoon
            ? 'landing-page'
            : isCrmRescue
              ? 'crm-rescue'
              : isEnquiryReply
                ? 'enquiry-reply'
                : isProfilePosting
                  ? 'profile-posting'
                  : isLocalPack
                    ? 'local-pack'
                    : isConversionPass
                      ? 'conversion-pass'
                      : isOnpageSearch
                        ? 'onpage-search'
                        : isSchemaFaq
                          ? 'schema-faq'
                          : isTrackingForms
                            ? 'tracking-forms'
                          : isSiteChat
                            ? 'site-chat'
                          : isMediaClean
                            ? 'media-clean'
                        : isTeamAi
                    ? 'team-ai'
                    : isChangePack
                      ? 'change-pack'
                      : isContentSystem
                        ? 'content-system'
                        : isReviews
                            ? 'reviews'
                            : isAiPhone
                              ? 'ai-phone'
                              : isBooking
                                ? 'booking'
                                : 'speed'
  const calculatorVariant = isSpeed
    ? 'speed'
    : isMissedCall
      ? 'missed-call'
      : isCrmRescue
        ? 'crm-rescue'
        : isTeamAi
          ? 'team-ai'
          : isChangePack
            ? 'change-pack'
            : isContentSystem
              ? 'content-system'
              : isReviews
                ? 'reviews'
                : isAiPhone
                  ? 'ai-phone'
                  : isBooking
                    ? 'booking'
                    : isWebsite
                      ? 'website'
                      : isSearchFix
                        ? 'search-fix'
                        : isLandingPage
                          ? 'landing-page'
                          : 'google-profile'
  const missedEvidence: MissedCallEvidence = useMemo(() => {
    if (business && callDay && callTime) {
      return {mode: 'tested', business, day: callDay, time: callTime}
    }
    return {mode: 'try'}
  }, [business, callDay, callTime])
  const aiPhoneEvidence: AiPhoneEvidence = useMemo(() => {
    if (business && callDay && callTime) {
      return {mode: 'tested', business, day: callDay, time: callTime}
    }
    return {mode: 'try'}
  }, [business, callDay, callTime])
  const profileEvidence: GoogleProfileEvidence = useMemo(() => {
    if (business && competitor) return {mode: 'compared', business, competitor}
    if (business) return {mode: 'named', business}
    return {mode: 'try'}
  }, [business, competitor])
  const searchEvidence: IndexCheckEvidence = useMemo(() => {
    if (business && blockedPages != null) {
      return {mode: 'live', business, pages: blockedPages}
    }
    return {mode: 'try'}
  }, [business, blockedPages])
  const adEvidence: AdEvidence = useMemo(() => {
    if (business) return {mode: 'live', business}
    return {mode: 'try'}
  }, [business])
  const websiteEvidence: WebsiteEvidence = useMemo(() => {
    if (business && noSite) return {mode: 'nosite', business}
    if (business && score != null) return {mode: 'score', business, score}
    return {mode: 'try'}
  }, [business, noSite, score])
  const crmEvidence: CrmEnquiryEvidence = useMemo(() => {
    if (business && callDay && callTime) {
      return {mode: 'tested', business, day: callDay, time: callTime}
    }
    return {mode: 'try'}
  }, [business, callDay, callTime])

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
        if (!result) {
          if (isFunnelProductCode(slug)) {
            const copy = funnelCopyForSlug(slug)
            setDoc({
              title: FUNNEL_PRODUCT_LABELS[slug],
              ctaMode:
                slug === 'change-pack' || slug === 'content-system' ? 'call' : 'buy',
              ctaLabel: copy.ctaLabel,
              schedulerUrl:
                slug === 'change-pack' || slug === 'content-system'
                  ? accessFormPathForProduct(slug)
                  : undefined,
            })
            setStatus('ready')
            return
          }
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

  const rawLabel = doc?.ctaLabel || COPY.ctaLabel
  // Live Payment Links in code. Website / Team AI dual CTAs always use code options
  // so Sanity cannot leak test buy links.
  const liveWebsitePriceOptions = isWebsite ? websiteEnrolmentPriceOptions() : null
  const liveTeamAiPriceOptions = isTeamAi ? teamAiPriceOptions() : null
  const sanityPriceOptions = (doc?.priceOptions || []).filter(
    (o) =>
      o?.ctaLabel &&
      o?.stripeUrl &&
      !String(o.stripeUrl).includes('buy.stripe.com/test_'),
  )
  const liveFallback =
    (isWebsite ? websiteEnrolmentPriceOptions()[0]?.stripeUrl : undefined) ||
    (isTeamAi ? teamAiPriceOptions()[0]?.stripeUrl : undefined) ||
    (isBooking ? BOOKING_STRIPE_URL : undefined) ||
    (isSpeed ? SPEED_FIX_STRIPE_URL : undefined) ||
    (isGoogleProfile ? GOOGLE_PROFILE_STRIPE_URL : undefined) ||
    (isMissedCall ? MISSED_CALL_STRIPE_URL : undefined) ||
    (isSearchFix ? SEARCH_FIX_STRIPE_URL : undefined) ||
    (isReviews ? REVIEWS_STRIPE_URL : undefined) ||
    (isCrmRescue ? CRM_RESCUE_STRIPE_URL : undefined) ||
    (isLandingPage ? LANDING_PAGE_STRIPE_URL : undefined) ||
    (isAiPhone ? AI_PHONE_STRIPE_URL : undefined) ||
    (isProfilePosting ? PROFILE_POSTING_STRIPE_URL : undefined) ||
    (isLocalPack ? LOCAL_PACK_STRIPE_URL : undefined) ||
    (isConversionPass ? CONVERSION_PASS_STRIPE_URL : undefined) ||
    (isOnpageSearch ? ONPAGE_SEARCH_STRIPE_URL : undefined) ||
    (isSchemaFaq ? SCHEMA_FAQ_STRIPE_URL : undefined) ||
    (isTrackingForms ? TRACKING_FORMS_STRIPE_URL : undefined) ||
    (isSiteChat ? SITE_CHAT_STRIPE_URL : undefined) ||
    (isMediaClean ? MEDIA_CLEAN_STRIPE_URL : undefined) ||
    (isEnquiryReply ? ENQUIRY_REPLY_STRIPE_URL : undefined)
  const sanityStripe = (doc?.stripeUrl || '').trim()
  const resolvedStripeUrl =
    sanityStripe && !sanityStripe.includes('buy.stripe.com/test_')
      ? sanityStripe
      : liveFallback || sanityStripe || undefined
  const buyDoorNeedsAccess =
    (isReviews || isAiPhone || isBooking || isWebsite || isLocalPack) && !resolvedStripeUrl
  const dualWebsite =
    isWebsite && (liveWebsitePriceOptions || []).filter((o) => o?.ctaLabel && o?.stripeUrl).length >= 2
  const dualTeamAi =
    isTeamAi && (liveTeamAiPriceOptions || []).filter((o) => o?.ctaLabel && o?.stripeUrl).length >= 2
  const ctaFields: FunnelCtaFields = {
    ctaMode: buyDoorNeedsAccess
      ? 'call'
      : dualWebsite || dualTeamAi
        ? 'dual'
        : isChangePack || isContentSystem
          ? 'call'
          : doc?.ctaMode || 'buy',
    // Authored labels already include price text. Only normalise a comma before $ into one middle dot.
    ctaLabel: rawLabel.replace(/,\s*(?=\$)/, ' · ').replace(/\s*·\s*·\s*(?=\$)/, ' · '),
    stripeUrl: resolvedStripeUrl,
    quietLine: isWebsite
      ? 'Prefer to talk first? Book 15 minutes.'
      : undefined,
    secondaryCtaLabel: isWebsite
      ? doc?.secondaryCtaLabel || 'Prefer to talk first? Book 15 minutes.'
      : doc?.secondaryCtaLabel,
    secondaryUrl: isWebsite
      ? doc?.secondaryUrl || doc?.schedulerUrl
      : doc?.secondaryUrl,
    schedulerUrl: buyDoorNeedsAccess
      ? accessFormPathForProduct(
          isReviews
            ? 'reviews'
            : isAiPhone
              ? 'ai-phone'
              : isBooking
                ? 'booking'
                : isLocalPack
                  ? 'local-pack'
                  : 'website',
        )
      : isChangePack || isContentSystem
        ? accessFormPathForProduct(isContentSystem ? 'content-system' : 'change-pack')
        : doc?.schedulerUrl || undefined,
    priceOptions:
      liveWebsitePriceOptions ||
      liveTeamAiPriceOptions ||
      (sanityPriceOptions.length > 0 ? sanityPriceOptions : undefined),
  }

  const pageTitle = doc?.title ? `${doc.title} | SYSBILT` : 'Fixed-price fix | SYSBILT'
  const h1 =
    isContentSystem && business && lastPostMonth
      ? `${business}, your last post was ${lastPostMonth}, and it's not because you're lazy`
      : business
        ? COPY.h1Personal(business)
        : COPY.h1Generic
  const faqs =
    doc?.faqs && doc.faqs.length > 0
      ? doc.faqs.map((f) => ({q: f.question || '', a: f.answer || ''}))
      : COPY.faqs

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        ...FUNNEL_CSS_VARS,
        backgroundColor: FUNNEL_COLOURS.ground,
        color: FUNNEL_COLOURS.ink,
      }}
    >
      <PageMeta
        title={pageTitle}
        description={COPY.sub}
        canonical={slug ? `${SITE_ORIGIN}/go/${slug}` : undefined}
        robots="noindex, nofollow"
      />

      {status === 'loading' && (
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-8">
          <SysbiltLogo className="w-[110px] md:w-[130px]" />
          <p className="mt-10 font-sans" style={{color: FUNNEL_COLOURS.muted}}>
            Loading…
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-8 pb-16">
          <SysbiltLogo className="w-[110px] md:w-[130px]" />
          <p className="mt-10 font-sans" style={{color: FUNNEL_COLOURS.muted}}>
            Something went wrong loading this page. Reply to any SYSBILT email and a human answers.
          </p>
          <FunnelLegalFooter />
        </div>
      )}

      {status === 'missing' && (
        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-8 pb-16">
          <SysbiltLogo className="w-[110px] md:w-[130px]" />
          <p className="mt-10 font-sans" style={{color: FUNNEL_COLOURS.muted}}>
            This offer page is not available. If you followed a link from us, reply to that email and
            we will sort it.
          </p>
          <FunnelLegalFooter />
        </div>
      )}

      {status === 'ready' && doc && (
        <>
          <header className="max-w-3xl mx-auto px-6 md:px-10 pt-8 pb-16 md:pb-20">
            <SysbiltLogo className="w-[110px] md:w-[130px]" />

            <Reveal delay={0.05} y={10}>
              <p
                className="mt-10 md:mt-12 font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]"
                style={{color: FUNNEL_COLOURS.steel}}
              >
                {COPY.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.12} y={20}>
              <h1
                className="mt-6 md:mt-8 font-serif font-bold text-[2.5rem] sm:text-5xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl"
                style={{color: FUNNEL_COLOURS.ink}}
              >
                {h1}
              </h1>
            </Reveal>

            <Reveal delay={0.22} y={14}>
              <p
                className="mt-6 md:mt-8 font-sans text-base md:text-xl leading-relaxed max-w-2xl"
                style={{color: FUNNEL_COLOURS.muted}}
              >
                {COPY.sub}
              </p>
            </Reveal>

            <Reveal delay={0.32} y={12}>
              <div className="mt-10">
                {usesComingSoonCta ? (
                  <FunnelComingSoonCta label={COPY.ctaLabel} size="final" />
                ) : (
                  <FunnelCtaBlock fields={ctaFields} size="final" />
                )}
              </div>
            </Reveal>
          </header>

          <section
            className={`mx-auto px-6 md:px-10 ${
              isWebsite ? 'pb-20 md:pb-28' : 'pb-16 md:pb-24'
            } ${
              isSpeed ||
              isSearchFix ||
              isLandingPage ||
              isCrmRescue ||
              isTeamAi ||
              isChangePack ||
              isContentSystem ||
              isReviews ||
              isAiPhone ||
              isBooking ||
              isWebsite ||
              isGoogleProfile ||
              isMissedCall ||
              isEnquiryReply ||
              isProfilePosting ||
              isLocalPack ||
              isConversionPass ||
              isOnpageSearch ||
              isSchemaFaq ||
              isTrackingForms ||
              isSiteChat ||
              isMediaClean ||
              isDraftSoon
                ? 'max-w-3xl'
                : 'max-w-5xl'
            }`}
          >
            <SectionRule />
            <Reveal y={10}>
              <SectionLabel>{COPY.proofLabel}</SectionLabel>
            </Reveal>
            <Reveal delay={0.06} y={18}>
              <h2
                className="font-serif font-bold text-3xl md:text-4xl tracking-tight mb-6 md:mb-8 max-w-2xl"
                style={{color: FUNNEL_COLOURS.ink}}
              >
                {isSpeed && score != null
                  ? COPY.proofHeadingLive
                  : isSearchFix && searchEvidence.mode === 'live'
                    ? COPY.proofHeadingLive
                    : isLandingPage && adEvidence.mode === 'live'
                      ? COPY.proofHeadingLive
                      : isCrmRescue && crmEvidence.mode === 'tested'
                        ? COPY.proofHeadingLive
                        : COPY.proofHeadingGeneric}
              </h2>
            </Reveal>
            {isMissedCall ? <MissedCallEvidenceCard evidence={missedEvidence} /> : null}
            {isGoogleProfile ? <GoogleProfileEvidenceCard evidence={profileEvidence} /> : null}
            {isSearchFix ? <IndexCheckMoment evidence={searchEvidence} /> : null}
            {isLandingPage ? <AdEvidenceMoment evidence={adEvidence} /> : null}
            {isCrmRescue ? <CrmEnquiryEvidenceCard evidence={crmEvidence} /> : null}
            {isEnquiryReply ? <EnquiryReplyEvidenceCard business={business} /> : null}
            {isProfilePosting ? (
              <ProfilePostingEvidenceCard business={business} lastPostMonth={lastPostMonth} />
            ) : null}
            {isLocalPack ? <LocalPackEvidenceCard business={business} /> : null}
            {isConversionPass ? <ConversionEvidenceCard business={business} /> : null}
            {isOnpageSearch ? <OnpageEvidenceCard business={business} /> : null}
            {isSchemaFaq ? <SchemaFaqEvidenceCard business={business} /> : null}
            {isTrackingForms ? <TrackingFormsEvidenceCard business={business} /> : null}
            {isSiteChat ? <SiteChatEvidenceCard business={business} /> : null}
            {isMediaClean ? <MediaCleanEvidenceCard business={business} /> : null}
            {isTeamAi ? <TeamRecognitionCards /> : null}
            {isChangePack ? <ChangeRiskRegisterCard business={business} /> : null}
            {isContentSystem ? (
              <ContentLastPostCard business={business} lastPostMonth={lastPostMonth} />
            ) : null}
            {isReviews ? (
              <ReviewEvidenceCard
                business={business}
                yourCount={yourReviews}
                competitor={competitor}
                theirCount={theirReviews}
              />
            ) : null}
            {isAiPhone ? <AiPhoneEvidenceCard evidence={aiPhoneEvidence} /> : null}
            {isBooking ? <BookingEvidenceCard business={business} /> : null}
            {isWebsite ? <WebsiteEvidenceCard evidence={websiteEvidence} /> : null}
            {isDraftSoon ? (
              <div
                className="mt-2 rounded-sm border p-5 md:p-6 max-w-2xl"
                style={{
                  borderColor: `${FUNNEL_COLOURS.ink}14`,
                  backgroundColor: FUNNEL_COLOURS.surface,
                }}
              >
                <p
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] mb-3"
                  style={{color: FUNNEL_COLOURS.steel}}
                >
                  Draft for review
                </p>
                <p
                  className="font-sans text-base md:text-lg leading-relaxed"
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  {COPY.proofLeadGeneric}
                </p>
              </div>
            ) : null}
            {!(isSearchFix && searchEvidence.mode === 'try') &&
            !(isLandingPage && adEvidence.mode === 'try') &&
            !(isCrmRescue && crmEvidence.mode === 'try') &&
            !(isContentSystem && !business) &&
            !isDraftSoon &&
            !isWebsite ? (
              <Reveal delay={0.12} y={12}>
                <p
                  className={`font-sans text-base md:text-lg leading-relaxed max-w-2xl ${
                    isMissedCall ||
                    isGoogleProfile ||
                    isSearchFix ||
                    isLandingPage ||
                    isCrmRescue ||
                    isEnquiryReply ||
                    isProfilePosting ||
                    isLocalPack ||
                    isConversionPass ||
                    isOnpageSearch ||
                    isSchemaFaq ||
                    isTrackingForms ||
                    isSiteChat ||
                    isMediaClean ||
                    isTeamAi ||
                    isChangePack ||
                    isContentSystem ||
                    isReviews ||
                    isAiPhone ||
                    isBooking
                      ? 'mt-8'
                      : ''
                  }`}
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  {isSpeed
                    ? score != null
                      ? COPY.proofLead(business)
                      : COPY.proofLeadGeneric
                    : isSearchFix
                      ? COPY.proofLead(business)
                      : isLandingPage
                        ? COPY.proofLead(business)
                        : isCrmRescue
                          ? COPY.proofLead(business)
                          : isTeamAi
                            ? COPY.proofLeadGeneric
                            : isChangePack
                              ? COPY.proofLeadGeneric
                              : isContentSystem
                                ? COPY.proofLeadGeneric
                                : business
                                  ? COPY.proofLead(business)
                                  : COPY.proofLeadGeneric}
                </p>
              </Reveal>
            ) : null}
            {isMissedCall ? (
              <>
                <Reveal delay={0.08} y={12}>
                  <p
                    className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {COPY.proofAfterGeneric}
                  </p>
                </Reveal>
                <MissedCallLeakPair businessName={business} />
              </>
            ) : isGoogleProfile ? (
              <>
                <Reveal delay={0.08} y={12}>
                  <p
                    className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {COPY.proofAfterGeneric}
                  </p>
                </Reveal>
                <GoogleFrontDoorPanel businessName={business} competitorName={competitor} />
              </>
            ) : isSearchFix ? (
              <>
                {searchEvidence.mode === 'live' ? (
                  <Reveal delay={0.08} y={12}>
                    <p
                      className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      {COPY.proofAfter}
                    </p>
                  </Reveal>
                ) : null}
                <SearchVisibilityLeakPair />
              </>
            ) : isLandingPage ? (
              <>
                {adEvidence.mode === 'live' ? (
                  <Reveal delay={0.08} y={12}>
                    <p
                      className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      {COPY.proofAfter}
                    </p>
                  </Reveal>
                ) : null}
                <section className="mt-12 md:mt-14">
                  <Reveal y={10}>
                    <SectionLabel>The leak</SectionLabel>
                  </Reveal>
                  <Reveal delay={0.06} y={14}>
                    <h3
                      className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                      style={{color: FUNNEL_COLOURS.ink}}
                    >
                      The homepage is a lobby, and ads need a door
                    </h3>
                  </Reveal>
                  <Reveal delay={0.1} y={10}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-2"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      Someone clicks an ad about one specific thing, and your homepage greets them
                      with everything: the menu, the story, six services, a popup. They scan, they
                      don&apos;t find the exact thing they clicked for, and they&apos;re gone, with
                      your money. The ad did its job. The destination dropped it.
                    </p>
                  </Reveal>
                  <LandingLeakPair />
                </section>
              </>
            ) : isCrmRescue ? (
              <>
                {crmEvidence.mode === 'tested' ? (
                  <Reveal delay={0.08} y={12}>
                    <p
                      className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      {COPY.proofAfter}
                    </p>
                  </Reveal>
                ) : (
                  <Reveal delay={0.08} y={12}>
                    <p
                      className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      {COPY.proofAfterGeneric}
                    </p>
                  </Reveal>
                )}
                <section className="mt-12 md:mt-14">
                  <Reveal y={10}>
                    <SectionLabel>The leak</SectionLabel>
                  </Reveal>
                  <Reveal delay={0.06} y={14}>
                    <h3
                      className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                      style={{color: FUNNEL_COLOURS.ink}}
                    >
                      Your leads land in an inbox nobody owns
                    </h3>
                  </Reveal>
                  <Reveal delay={0.1} y={10}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-2"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      The form sends an email. The email sits between invoices and spam. Whoever
                      notices it means well, but they&apos;re with a client, so it waits until
                      tonight, and tonight becomes Thursday. Meanwhile the customer enquired with
                      two other businesses, and one of them called back in ten minutes. You never
                      lost the lead on price. You lost it on silence.
                    </p>
                  </Reveal>
                  <CrmLeakPair />
                </section>
              </>
            ) : isEnquiryReply ? (
              <>
                <Reveal delay={0.08} y={12}>
                  <p
                    className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {COPY.proofAfterGeneric}
                  </p>
                </Reveal>
                <section className="mt-12 md:mt-14">
                  <Reveal y={10}>
                    <SectionLabel>The leak</SectionLabel>
                  </Reveal>
                  <Reveal delay={0.06} y={14}>
                    <h3
                      className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                      style={{color: FUNNEL_COLOURS.ink}}
                    >
                      The reply lands whenever someone happens to notice
                    </h3>
                  </Reveal>
                  <Reveal delay={0.1} y={10}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-2"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      The form emails an inbox, and the same person also checks a separate email
                      account, on a different schedule. Neither one pings a phone. Whoever notices
                      first replies, eventually, and the customer has already decided you are slow
                      or closed. You never lost the job on price. You lost it on silence.
                    </p>
                  </Reveal>
                  <EnquiryReplyLeakPair />
                </section>
              </>
            ) : isProfilePosting ? (
              <>
                <Reveal delay={0.08} y={12}>
                  <p
                    className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {COPY.proofAfterGeneric}
                  </p>
                </Reveal>
                <section className="mt-12 md:mt-14">
                  <Reveal y={10}>
                    <SectionLabel>The leak</SectionLabel>
                  </Reveal>
                  <Reveal delay={0.06} y={14}>
                    <h3
                      className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                      style={{color: FUNNEL_COLOURS.ink}}
                    >
                      A quiet profile still looks closed
                    </h3>
                  </Reveal>
                  <Reveal delay={0.1} y={10}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-2"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      The listing is claimed and the categories are set, so it looks finished at a
                      glance. Then someone taps the Updates tab and finds nothing recent, while the
                      business down the road posted three times this week. Nobody lied about being
                      open. The profile just never said so.
                    </p>
                  </Reveal>
                  <ProfilePostingLeakPair />
                </section>
              </>
            ) : isLocalPack ? (
              <>
                <Reveal delay={0.08} y={12}>
                  <p
                    className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {COPY.proofAfterGeneric}
                  </p>
                </Reveal>
                <section className="mt-12 md:mt-14">
                  <Reveal y={10}>
                    <SectionLabel>The leak</SectionLabel>
                  </Reveal>
                  <Reveal delay={0.06} y={14}>
                    <h3
                      className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                      style={{color: FUNNEL_COLOURS.ink}}
                    >
                      Buying the three jobs apart means none of them finish
                    </h3>
                  </Reveal>
                  <Reveal delay={0.1} y={10}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-2"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      The profile gets cleaned once, then reviews sit untouched. Reviews get asked
                      for once, then the habit dies. Posting only happens when someone remembers and
                      feels guilty about it. Each job on its own is a fresh kickoff and a fresh
                      access chat, and each one is a fresh chance to stall.
                    </p>
                  </Reveal>
                  <LocalPackLeakPair />
                </section>
              </>
            ) : isConversionPass ? (
              <>
                <Reveal delay={0.08} y={12}>
                  <p
                    className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {COPY.proofAfterGeneric}
                  </p>
                </Reveal>
                <section className="mt-12 md:mt-14">
                  <Reveal y={10}>
                    <SectionLabel>The leak</SectionLabel>
                  </Reveal>
                  <Reveal delay={0.06} y={14}>
                    <h3
                      className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                      style={{color: FUNNEL_COLOURS.ink}}
                    >
                      Fast pages still lose when the ask is buried
                    </h3>
                  </Reveal>
                  <Reveal delay={0.1} y={10}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-2"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      The score looks fine and people stay long enough to skim. Then the homepage
                      talks about the business instead of the job, contact hides behind another tap,
                      and the service pages sound like each other. Traffic arrived. The enquiry did
                      not.
                    </p>
                  </Reveal>
                  <ConversionLeakPair />
                </section>
              </>
            ) : isOnpageSearch ? (
              <>
                <Reveal delay={0.08} y={12}>
                  <p
                    className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {COPY.proofAfterGeneric}
                  </p>
                </Reveal>
                <section className="mt-12 md:mt-14">
                  <Reveal y={10}>
                    <SectionLabel>The leak</SectionLabel>
                  </Reveal>
                  <Reveal delay={0.06} y={14}>
                    <h3
                      className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                      style={{color: FUNNEL_COLOURS.ink}}
                    >
                      Thin titles leave search nothing solid to hold
                    </h3>
                  </Reveal>
                  <Reveal delay={0.1} y={10}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-2"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      The page loads. The brand name is in the title. Google still cannot tell what
                      the page is actually about, and internal links never connect the service to
                      proof or contact. The site looks finished. The pages stay thin.
                    </p>
                  </Reveal>
                  <OnpageLeakPair />
                </section>
              </>
            ) : isSchemaFaq ? (
              <>
                <Reveal delay={0.08} y={12}>
                  <p
                    className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {COPY.proofAfterGeneric}
                  </p>
                </Reveal>
                <section className="mt-12 md:mt-14">
                  <Reveal y={10}>
                    <SectionLabel>The leak</SectionLabel>
                  </Reveal>
                  <Reveal delay={0.06} y={14}>
                    <h3
                      className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                      style={{color: FUNNEL_COLOURS.ink}}
                    >
                      Nothing on the page means nothing tools can quote
                    </h3>
                  </Reveal>
                  <Reveal delay={0.1} y={10}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-2"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      The service page looks finished. There is no plain answer to the questions
                      people ask after hours, and no markup that matches real Q and A. Competitors
                      with boring-but-clear FAQs get mentioned. You stay invisible to the tools that
                      invent answers.
                    </p>
                  </Reveal>
                  <SchemaFaqLeakPair />
                </section>
              </>
            ) : isTrackingForms ? (
              <>
                <Reveal delay={0.08} y={12}>
                  <p
                    className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {COPY.proofAfterGeneric}
                  </p>
                </Reveal>
                <section className="mt-12 md:mt-14">
                  <Reveal y={10}>
                    <SectionLabel>The leak</SectionLabel>
                  </Reveal>
                  <Reveal delay={0.06} y={14}>
                    <h3
                      className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                      style={{color: FUNNEL_COLOURS.ink}}
                    >
                      Spend without a trail is just guessing
                    </h3>
                  </Reveal>
                  <Reveal delay={0.1} y={10}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-2"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      The form looks finished. The click looks busy. Without events and a live
                      destination, you cannot tell which page produced the enquiry or whether the
                      lead reached anyone who still works there.
                    </p>
                  </Reveal>
                  <TrackingFormsLeakPair />
                </section>
              </>
            ) : isSiteChat ? (
              <>
                <Reveal delay={0.08} y={12}>
                  <p
                    className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {COPY.proofAfterGeneric}
                  </p>
                </Reveal>
                <section className="mt-12 md:mt-14">
                  <Reveal y={10}>
                    <SectionLabel>The leak</SectionLabel>
                  </Reveal>
                  <Reveal delay={0.06} y={14}>
                    <h3
                      className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                      style={{color: FUNNEL_COLOURS.ink}}
                    >
                      Silence loses them. Loose AI burns you
                    </h3>
                  </Reveal>
                  <Reveal delay={0.1} y={10}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-2"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      After hours, nobody answers. Or a generic widget invents a fee. Either way the
                      visitor leaves, and your brand takes the hit.
                    </p>
                  </Reveal>
                  <SiteChatLeakPair />
                </section>
              </>
            ) : isMediaClean ? (
              <>
                <Reveal delay={0.08} y={12}>
                  <p
                    className="mt-6 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {COPY.proofAfterGeneric}
                  </p>
                </Reveal>
                <section className="mt-12 md:mt-14">
                  <Reveal y={10}>
                    <SectionLabel>The leak</SectionLabel>
                  </Reveal>
                  <Reveal delay={0.06} y={14}>
                    <h3
                      className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                      style={{color: FUNNEL_COLOURS.ink}}
                    >
                      Fat files quietly undo the win
                    </h3>
                  </Reveal>
                  <Reveal delay={0.1} y={10}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-2"
                      style={{color: FUNNEL_COLOURS.muted}}
                    >
                      The page looks finished. Phone photos and banners still crush mobile load.
                      Speed slips while nobody notices which files did it.
                    </p>
                  </Reveal>
                  <MediaCleanLeakPair />
                </section>
              </>
            ) : isTeamAi ? (
              <section className="mt-12 md:mt-14">
                <Reveal y={10}>
                  <SectionLabel>The leak</SectionLabel>
                </Reveal>
                <Reveal delay={0.06} y={14}>
                  <h3
                    className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                    style={{color: FUNNEL_COLOURS.ink}}
                  >
                    Everyone experimenting alone means nobody compounding
                  </h3>
                </Reveal>
                <Reveal delay={0.1} y={10}>
                  <p
                    className="font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    The gains from AI show up when a whole team works the same way with the same
                    guardrails. Right now the wins live in one person&apos;s head, the risks live
                    in personal accounts, and the sceptics are waiting for permission to care.
                  </p>
                </Reveal>
              </section>
            ) : isChangePack ? (
              <section className="mt-12 md:mt-14">
                <Reveal y={10}>
                  <SectionLabel>The leak</SectionLabel>
                </Reveal>
                <Reveal delay={0.06} y={14}>
                  <h3
                    className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                    style={{color: FUNNEL_COLOURS.ink}}
                  >
                    The go-live is a date. Getting people to use the new system is the work that
                    usually gets skipped
                  </h3>
                </Reveal>
                <Reveal delay={0.1} y={10}>
                  <p
                    className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-2"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    CRM, AI tools, rostering, accounts: the build finishes, then training is one
                    long session half the team misses. Monday arrives and people invent their own
                    way through. Week one shows up as tickets, workarounds, and the old spreadsheet
                    reopening. That is where the budget leaks: not in the software, in the gap
                    between announcement and habit.
                  </p>
                </Reveal>
                <ChangeLeakPair />
              </section>
            ) : isContentSystem ? (
              <section className="mt-12 md:mt-14">
                <Reveal y={10}>
                  <SectionLabel>The leak</SectionLabel>
                </Reveal>
                <Reveal delay={0.06} y={14}>
                  <h3
                    className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                    style={{color: FUNNEL_COLOURS.ink}}
                  >
                    Consistency is the whole game, and it is exactly what a busy business cannot do
                    by hand
                  </h3>
                </Reveal>
                <Reveal delay={0.1} y={10}>
                  <p
                    className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-2"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    The usual fixes fail the same two ways. The owner burns out writing posts at
                    10pm, or a cheap agency ships generic content that sounds like nobody. The fix
                    is not more discipline. It is a system where your only job is the hour you are
                    best at: talking about your work.
                  </p>
                </Reveal>
                <ContentFeedLeakPair lastPostMonth={lastPostMonth} />
              </section>
            ) : isReviews ? (
              <section className="mt-12 md:mt-14">
                <Reveal y={10}>
                  <SectionLabel>The leak</SectionLabel>
                </Reveal>
                <Reveal delay={0.06} y={14}>
                  <h3
                    className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                    style={{color: FUNNEL_COLOURS.ink}}
                  >
                    Happy customers leave quiet unless someone asks
                  </h3>
                </Reveal>
                <ReviewLeakPair />
              </section>
            ) : isAiPhone ? (
              <section className="mt-12 md:mt-14">
                <Reveal y={10}>
                  <SectionLabel>The leak</SectionLabel>
                </Reveal>
                <Reveal delay={0.06} y={14}>
                  <h3
                    className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                    style={{color: FUNNEL_COLOURS.ink}}
                  >
                    Voicemail holds nothing. A voice agent books
                  </h3>
                </Reveal>
                <AiPhoneLeakPair businessName={business} />
              </section>
            ) : isBooking ? (
              <section className="mt-12 md:mt-14">
                <Reveal y={10}>
                  <SectionLabel>The leak</SectionLabel>
                </Reveal>
                <Reveal delay={0.06} y={14}>
                  <h3
                    className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                    style={{color: FUNNEL_COLOURS.ink}}
                  >
                    Phone tag is not a booking system
                  </h3>
                </Reveal>
                <BookingLeakPair />
              </section>
            ) : isWebsite ? (
              <section className="mt-20 md:mt-24">
                <Reveal y={10}>
                  <SectionLabel>The leak</SectionLabel>
                </Reveal>
                <Reveal delay={0.06} y={14}>
                  <h3
                    className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-6 md:mb-8 max-w-2xl"
                    style={{color: FUNNEL_COLOURS.ink}}
                  >
                    People find you, then they hit a dead end
                  </h3>
                </Reveal>
                <Reveal delay={0.1} y={10}>
                  <p
                    className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-4"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {business ? COPY.proofLead(business) : COPY.proofLeadGeneric}
                  </p>
                </Reveal>
                <Reveal delay={0.14} y={10}>
                  <p
                    className="font-sans text-base md:text-lg leading-relaxed max-w-2xl mb-2"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {COPY.proofAfterGeneric}
                  </p>
                </Reveal>
                <WebsiteLeakPair />
              </section>
            ) : isDraftSoon ? (
              <section className="mt-12 md:mt-14">
                <Reveal y={10}>
                  <SectionLabel>The leak</SectionLabel>
                </Reveal>
                <Reveal delay={0.06} y={14}>
                  <h3
                    className="font-serif font-bold text-2xl md:text-3xl tracking-tight mb-4 max-w-2xl"
                    style={{color: FUNNEL_COLOURS.ink}}
                  >
                    {COPY.proofHeadingGeneric}
                  </h3>
                </Reveal>
                <Reveal delay={0.1} y={10}>
                  <p
                    className="font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {COPY.proofAfterGeneric}
                  </p>
                </Reveal>
              </section>
            ) : (
              <>
                <ScoreMoment
                  businessName={business}
                  score={score ?? 34}
                  mode={score != null ? 'live' : 'example'}
                />
                <Reveal delay={0.08} y={12}>
                  <p
                    className="mt-8 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                    style={{color: FUNNEL_COLOURS.muted}}
                  >
                    {score != null ? COPY.proofAfter : COPY.proofAfterGeneric}
                  </p>
                </Reveal>
              </>
            )}
          </section>

          <section
            className={`w-full mb-0 ${isWebsite ? 'py-20 md:py-28' : 'py-16 md:py-24'}`}
            style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
          >
            <div className="max-w-5xl mx-auto px-6 md:px-10">
              <SectionRule onDark />
              <Reveal y={10}>
                <SectionLabel onDark>{COPY.painLabel}</SectionLabel>
              </Reveal>
              <Reveal delay={0.06} y={18}>
                <h2
                  className="font-serif font-bold text-3xl md:text-4xl tracking-tight mb-8 md:mb-10 max-w-2xl"
                  style={{color: FUNNEL_COLOURS.onInk}}
                >
                  {COPY.painHeading}
                </h2>
              </Reveal>
              <RevealList className="space-y-7 mb-12 md:mb-14 max-w-2xl" stagger={0.14}>
                {COPY.painLines.map((line, i) => (
                  <li
                    key={i}
                    className="font-sans text-lg md:text-xl leading-relaxed"
                    style={{color: `${FUNNEL_COLOURS.onInk}CC`}}
                  >
                    {line}
                  </li>
                ))}
              </RevealList>
              {isMissedCall ? (
                <MissedCallPainCards />
              ) : isGoogleProfile ? (
                <GoogleProfilePainCards />
              ) : isSearchFix ? (
                <SearchPainCards />
              ) : isLandingPage ? (
                <LandingPainCards />
              ) : isCrmRescue ? (
                <CrmPainCards />
              ) : isEnquiryReply ? (
                <EnquiryReplyPainCards />
              ) : isProfilePosting ? (
                <ProfilePostingPainCards />
              ) : isLocalPack ? (
                <LocalPackPainCards />
              ) : isConversionPass ? (
                <ConversionPainCards />
              ) : isOnpageSearch ? (
                <OnpagePainCards />
              ) : isSchemaFaq ? (
                <SchemaFaqPainCards />
              ) : isTrackingForms ? (
                <TrackingFormsPainCards />
              ) : isSiteChat ? (
                <SiteChatPainCards />
              ) : isMediaClean ? (
                <MediaCleanPainCards />
              ) : isTeamAi ? (
                <TeamPainCards />
              ) : isChangePack ? (
                <ChangePainCards />
              ) : isContentSystem ? (
                <ContentPainCards />
              ) : isReviews ? (
                <ReviewPainCards />
              ) : isAiPhone ? (
                <AiPhonePainCards />
              ) : isBooking ? (
                <BookingPainCards />
              ) : isWebsite ? (
                <WebsitePainCards />
              ) : isDraftSoon ? null : (
                <PainCostCards />
              )}
              {!usesComingSoonCta ? (
                <LostClientCalculator variant={calculatorVariant} theme="dark" />
              ) : null}
            </div>
          </section>

          {isWebsite ? <WebsiteUnknownsCentrepiece /> : null}

          <section
            className={`mx-auto px-6 md:px-10 ${
              isWebsite
                ? 'max-w-5xl pt-20 md:pt-28 pb-20 md:pb-28'
                : 'max-w-3xl pt-16 md:pt-24 pb-16 md:pb-24'
            }`}
          >
            <SectionRule />
            <Reveal y={10}>
              <SectionLabel>{COPY.bridgeLabel}</SectionLabel>
            </Reveal>
            <Reveal delay={0.06} y={18}>
              <h2
                className="font-serif font-bold text-3xl md:text-4xl tracking-tight mb-6 max-w-2xl"
                style={{color: FUNNEL_COLOURS.ink}}
              >
                {COPY.bridgeHeading}
              </h2>
            </Reveal>
            <Reveal delay={0.12} y={12}>
              <p
                className="font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                style={{color: FUNNEL_COLOURS.muted}}
              >
                {COPY.bridgeBody}
              </p>
            </Reveal>

            {isWebsite ? (
              <WebsiteFixTiers />
            ) : (
              <Reveal delay={0.08} y={12}>
                <p
                  className="mt-12 font-sans text-base md:text-lg leading-relaxed max-w-2xl"
                  style={{color: FUNNEL_COLOURS.muted}}
                >
                  {COPY.bridgeGaugeCaption}
                </p>
              </Reveal>
            )}
            {isMissedCall ? (
              <CallMissedMoment businessName={business} mode="after" />
            ) : isGoogleProfile ? (
              <ProfileAfterMoment businessName={business} />
            ) : isSearchFix ? (
              <SearchRecoveryMock />
            ) : isLandingPage ? (
              <div className="mt-10">
                <LandingDoorMock />
              </div>
            ) : isCrmRescue ? (
              <div className="mt-10">
                <CrmFixedThreadMock />
              </div>
            ) : isEnquiryReply ||
              isProfilePosting ||
              isLocalPack ||
              isConversionPass ||
              isOnpageSearch ||
              isSchemaFaq ||
              isTrackingForms ||
              isSiteChat ||
              isMediaClean ||
              isTeamAi ||
              isChangePack ||
              isContentSystem ||
              isReviews ||
              isAiPhone ||
              isBooking ||
              isWebsite ||
              isDraftSoon ? null : (
              <ScoreMoment score={90} mode="benchmark" />
            )}
          </section>

          <section
            className={`w-full ${isWebsite ? 'py-20 md:py-28' : 'py-16 md:py-24'}`}
            style={{backgroundColor: FUNNEL_COLOURS.surfaceGold}}
          >
            <div className="max-w-5xl mx-auto px-6 md:px-10">
              <SectionRule />
              <Reveal y={10}>
                <SectionLabel>{COPY.benefitsLabel}</SectionLabel>
              </Reveal>
                  <Reveal delay={0.06} y={18}>
                <h2
                  className={`font-serif font-bold text-3xl md:text-4xl tracking-tight max-w-2xl ${
                    isWebsite ? 'mb-12 md:mb-14' : 'mb-10'
                  }`}
                  style={{color: FUNNEL_COLOURS.ink}}
                >
                  {COPY.benefitsHeading}
                </h2>
              </Reveal>
              <BenefitMotionRows
                benefits={COPY.benefits}
                ink={FUNNEL_COLOURS.ink}
                muted={FUNNEL_COLOURS.muted}
                gold={FUNNEL_COLOURS.goldDeep}
                variant={isWebsite ? 'website' : motionVariant}
              />
            </div>
          </section>

          <section
            className={`max-w-3xl mx-auto px-6 md:px-10 ${
              isWebsite ? 'pt-20 md:pt-28 pb-20 md:pb-28' : 'pt-16 md:pt-24 pb-16 md:pb-24'
            }`}
          >
            <SectionRule />
            <Reveal y={10}>
              <SectionLabel>{COPY.processLabel}</SectionLabel>
            </Reveal>
            <Reveal delay={0.06} y={18}>
              <h2
                className="font-serif font-bold text-3xl md:text-4xl tracking-tight mb-10 max-w-2xl"
                style={{color: FUNNEL_COLOURS.ink}}
              >
                {COPY.processHeading}
              </h2>
            </Reveal>
            <ProcessDayCards steps={COPY.processSteps} />
            <Reveal delay={0.1} y={10}>
              <p
                className="mt-10 font-sans text-sm md:text-base leading-relaxed max-w-2xl"
                style={{color: FUNNEL_COLOURS.muted}}
              >
                {COPY.scopeLine}
              </p>
            </Reveal>
            <Reveal delay={0.16} y={10}>
              <div className="mt-10">
                {usesComingSoonCta ? (
                  <FunnelComingSoonCta label={COPY.ctaLabel} size="lg" />
                ) : (
                  <FunnelCtaBlock fields={ctaFields} size="lg" />
                )}
              </div>
            </Reveal>
          </section>

          <section
            className={`max-w-5xl mx-auto px-6 md:px-10 ${
              isWebsite ? 'pt-4 md:pt-6 pb-20 md:pb-28' : 'pb-16 md:pb-24'
            }`}
          >
            <SectionRule />
            <Reveal y={10}>
              <SectionLabel>{COPY.stackLabel}</SectionLabel>
            </Reveal>
            <Reveal delay={0.06} y={18}>
              <h2
                className="font-serif font-bold text-3xl md:text-4xl tracking-tight mb-10 max-w-2xl"
                style={{color: FUNNEL_COLOURS.ink}}
              >
                {COPY.stackHeading}
              </h2>
            </Reveal>
            <StackMotionRows
              items={COPY.stackItems}
              ink={FUNNEL_COLOURS.ink}
              muted={FUNNEL_COLOURS.muted}
              variant={isWebsite ? 'website' : motionVariant}
            />
          </section>

          <section
            className={`w-full overflow-hidden ${
              isWebsite ? 'py-20 md:py-28 mb-20 md:mb-28' : 'py-16 md:py-24 mb-16 md:mb-24'
            }`}
            style={{backgroundColor: FUNNEL_COLOURS.inkSoft, color: FUNNEL_COLOURS.onInk}}
          >
            <div className="max-w-5xl mx-auto px-6 md:px-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 md:items-center">
                <div className="flex flex-col justify-center">
                  <Reveal y={10}>
                    <p
                      className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.28em] mb-4"
                      style={{color: `${FUNNEL_COLOURS.onInk}70`}}
                    >
                      {COPY.priceLabel}
                    </p>
                  </Reveal>
                  <Reveal delay={0.08} y={22}>
                    <p
                      className="font-serif font-bold text-5xl md:text-7xl tracking-tight mb-6"
                      style={{color: FUNNEL_COLOURS.onInk}}
                    >
                      {COPY.price}
                    </p>
                  </Reveal>
                  <Reveal delay={0.14} y={12}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-xl mb-4"
                      style={{color: `${FUNNEL_COLOURS.onInk}CC`}}
                    >
                      {COPY.priceLead}
                    </p>
                  </Reveal>
                  <Reveal delay={0.2} y={10}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-xl mb-4"
                      style={{color: `${FUNNEL_COLOURS.onInk}B3`}}
                    >
                      {COPY.guarantee}
                    </p>
                  </Reveal>
                  <Reveal delay={0.24} y={8}>
                    <p
                      className="font-sans text-base md:text-lg leading-relaxed max-w-xl mb-10"
                      style={{color: FUNNEL_COLOURS.goldLight}}
                    >
                      {COPY.priceAnchor}
                    </p>
                  </Reveal>
                  <Reveal delay={0.28} y={10}>
                    {usesComingSoonCta ? (
                      <FunnelComingSoonCta label={COPY.ctaLabel} theme="dark" size="xl" />
                    ) : (
                      <FunnelCtaBlock fields={ctaFields} theme="dark" size="xl" />
                    )}
                  </Reveal>
                </div>

                {isMissedCall ? (
                  <TextBackDeliverableMock />
                ) : isGoogleProfile ? (
                  <ProfileDeliverableMock />
                ) : isSearchFix ? (
                  <SearchRecoveryMock compact onDark />
                ) : isLandingPage ? (
                  <LandingDoorMock />
                ) : isCrmRescue ? (
                  <CrmFixedThreadMock />
                ) : isEnquiryReply ? (
                  <EnquiryReplyDeliverableMock />
                ) : isProfilePosting ? (
                  <ProfilePostingDeliverableMock />
                ) : isLocalPack ? (
                  <LocalPackDeliverableMock />
                ) : isConversionPass ? (
                  <ConversionDeliverableMock />
                ) : isOnpageSearch ? (
                  <OnpageDeliverableMock />
                ) : isSchemaFaq ? (
                  <SchemaFaqDeliverableMock />
                ) : isTrackingForms ? (
                  <TrackingFormsDeliverableMock />
                ) : isSiteChat ? (
                  <SiteChatDeliverableMock />
                ) : isMediaClean ? (
                  <MediaCleanDeliverableMock />
                ) : isTeamAi ? (
                  <TeamSessionDeliverableMock />
                ) : isChangePack ? (
                  <ChangePackDeliverableMock />
                ) : isContentSystem ? (
                  <ContentMonthDeliverableMock />
                ) : isReviews ? (
                  <ReviewDeliverableMock />
                ) : isAiPhone ? (
                  <AiPhoneDeliverableMock />
                ) : isBooking ? (
                  <BookingDeliverableMock />
                ) : isWebsite ? (
                  <WebsiteDeliverableMock />
                ) : isDraftSoon ? (
                  <div
                    className="rounded-sm border p-5 md:p-6"
                    style={{
                      borderColor: `${FUNNEL_COLOURS.onInk}22`,
                      backgroundColor: 'rgba(255,242,236,0.06)',
                    }}
                  >
                    <p
                      className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-3"
                      style={{color: FUNNEL_COLOURS.goldLight}}
                    >
                      Coming soon
                    </p>
                    <p
                      className="font-sans text-sm leading-relaxed"
                      style={{color: `${FUNNEL_COLOURS.onInk}85`}}
                    >
                      {COPY.scopeLine}
                    </p>
                  </div>
                ) : (
                  <ReportDeliverableMock />
                )}
              </div>
            </div>
          </section>

          <FunnelObjections
            label={COPY.faqLabel}
            heading={COPY.faqHeading}
            faqs={faqs}
          />

          <section
            className="w-full relative overflow-hidden"
            style={{backgroundColor: FUNNEL_COLOURS.ink, color: FUNNEL_COLOURS.onInk}}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.14]"
              style={{
                background:
                  'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226,30,63,0.55) 0%, transparent 55%)',
              }}
              aria-hidden
            />
            <div className="relative max-w-4xl mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-16 md:pb-20 text-center flex flex-col items-center">
              <Reveal y={10}>
                <p
                  className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.32em] mb-6"
                  style={{color: FUNNEL_COLOURS.goldLight}}
                >
                  {COPY.finalLabel}
                </p>
              </Reveal>
              <Reveal delay={0.08} y={24}>
                <h2
                  className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6 max-w-3xl leading-[1.05]"
                  style={{color: FUNNEL_COLOURS.onInk}}
                >
                  {COPY.finalHeading}
                </h2>
              </Reveal>
              <Reveal delay={0.16} y={14}>
                <p
                  className="font-sans text-lg md:text-xl leading-relaxed mb-12 md:mb-14 max-w-2xl"
                  style={{color: `${FUNNEL_COLOURS.onInk}B8`}}
                >
                  {COPY.finalLine}
                </p>
              </Reveal>
              <Reveal delay={0.24} y={12}>
                {usesComingSoonCta ? (
                  <FunnelComingSoonCta label={COPY.ctaLabel} theme="dark" size="final" />
                ) : (
                  <FunnelCtaBlock
                    fields={ctaFields}
                    theme="dark"
                    size="final"
                    align="center"
                  />
                )}
              </Reveal>
            </div>
            <div className="relative max-w-4xl mx-auto px-6 md:px-10 pb-10">
              <FunnelLegalFooter theme="dark" />
            </div>
          </section>
        </>
      )}
    </div>
  )
}

export default FunnelPage
