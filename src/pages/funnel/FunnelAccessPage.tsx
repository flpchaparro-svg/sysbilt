import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import {m, AnimatePresence} from 'framer-motion'
import {
  ArrowRight,
  Box,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  FileText,
  Globe2,
  LayoutTemplate,
  Mail,
  MessageCircle,
  Phone,
  Server,
  ShoppingBag,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import {SysbiltLogo} from '../../components/SysbiltLogo'
import {PageMeta} from '../../components/PageMeta'
import {SITE_ORIGIN} from '../../constants/seoMeta'
import {
  FUNNEL_PRODUCT_CATALOGUE,
  FUNNEL_PRODUCT_LABELS,
  isFunnelProductCode,
  type FunnelProductCode,
} from '../../constants/funnel'
import {FunnelLegalFooter} from './FunnelCtaBlock'
import {FUNNEL_COLOURS, FUNNEL_CSS_VARS} from './funnelTheme'
import {
  DOMAIN_REGISTRARS,
  HOSTING_PROVIDERS,
  type AccessPathId,
  type BookingToolId,
  type BookingWhatId,
  type BookingWhereId,
  type ConversionAskId,
  type CrmGoalId,
  type CrmLeadSourceId,
  type CrmSystemId,
  type FunnelAccessPayload,
  type LandingAdsId,
  type LandingGoalId,
  type LandingTrackingId,
  type PhoneSetupId,
  type PlatformId,
  type ProfileStatusId,
  type ReviewJobId,
  type SameProviderId,
  type WhoPublishesId,
  type EnquiryChannelId,
  type EnquiryRouteId,
  type WhatsappStatusId,
  type DmPlatformId,
  type QuoteToolId,
  type IntakeDestId,
} from './funnelAccessTypes'

const SCHEDULER_URL = 'https://meetings-ap1.hubspot.com/felipe-chaparro'
const HELP_EMAIL = 'mailto:hello@sysbilt.com?subject=Access%20form%20help'

const RED = FUNNEL_COLOURS.accent
const INK = FUNNEL_COLOURS.ink
const CREAM = FUNNEL_COLOURS.onInk
/** Brand cream — same as theme.ts / FUNNEL_COLOURS.ground (#FFF2EC), not a grey off-cream */
const GROUND = FUNNEL_COLOURS.ground

type StepId =
  | 'product'
  | 'name'
  | 'email'
  | 'business'
  | 'website'
  | 'websiteUrl'
  | 'phone'
  | 'phoneSetup'
  | 'whatsappStatus'
  | 'profileUrl'
  | 'profileStatus'
  | 'whoPublishes'
  | 'enquiryChannels'
  | 'enquiryRoute'
  | 'reviewJob'
  | 'crmSystem'
  | 'leadSource'
  | 'crmGoal'
  | 'bookingTool'
  | 'bookingWhat'
  | 'bookingWhere'
  | 'landingGoal'
  | 'landingAds'
  | 'landingOffer'
  | 'landingTracking'
  | 'conversionServiceA'
  | 'conversionServiceB'
  | 'conversionAsk'
  | 'conversionOffer'
  | 'onpageUrls'
  | 'onpageQueries'
  | 'schemaServices'
  | 'schemaQuestions'
  | 'trackingStatus'
  | 'trackingActions'
  | 'trackingDestinations'
  | 'chatTopics'
  | 'chatHandoff'
  | 'mediaTargets'
  | 'a11yPages'
  | 'whatsappGoals'
  | 'dmPlatform'
  | 'dmChannels'
  | 'quoteTool'
  | 'quoteTools'
  | 'intakeDest'
  | 'intakePurpose'
  | 'noshowTools'
  | 'inboxTools'
  | 'sopJobs'
  | 'dashMetrics'
  | 'bundleNotes'
  | 'geoTopics'
  | 'finderIcp'
  | 'sessionFormat'
  | 'teamSize'
  | 'teamTools'
  | 'timeEaters'
  | 'sensitiveData'
  | 'dateWindow'
  | 'rolloutType'
  | 'peopleAffected'
  | 'goLiveWindow'
  | 'changeAreas'
  | 'trainingPlan'
  | 'riskSignal'
  | 'contentChannels'
  | 'lastPostWhen'
  | 'hourReady'
  | 'contentGoal'
  | 'platform'
  | 'provider'
  | 'domainProvider'
  | 'hostingProvider'
  | 'access'
  | 'accessDetail'
  | 'notes'
  | 'done'

type PhaseId = 'about' | 'site' | 'access' | 'done'

const PHASES_SPEED: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your site'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_MISSED: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your phone'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_GOOGLE: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your profile'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_POSTING: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your profile'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_ENQUIRY: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your channels'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_REVIEWS: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your reviews'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_LOCAL: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your listing'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_CRM: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your system'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_BOOKING: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your booking'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_LANDING: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your campaign'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_CONVERSION: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your pages'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_SPEED_NEXT: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your site'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_ONPAGE: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your pages'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_SCHEMA_FAQ: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your services'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_TRACKING_FORMS: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your tracking'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_SITE_CHAT: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your chat'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_MEDIA_CLEAN: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your media'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_WHATSAPP: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your WhatsApp'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_DM: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your DMs'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_QUOTE: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your quotes'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_INTAKE: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your intake'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_CLINIC_BUNDLE: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your clinic'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_FRONT_DOOR: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your front door'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_BATCH: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your scope'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_TEAM: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your work'},
  {id: 'access', n: 3, label: 'Date window'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_CHANGE: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'The rollout'},
  {id: 'access', n: 3, label: 'Risk and plan'},
  {id: 'done', n: 4, label: 'Book the call'},
]

const PHASES_CONTENT: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your channels'},
  {id: 'access', n: 3, label: 'Fit'},
  {id: 'done', n: 4, label: 'Book the call'},
]

function phaseIndex(phase: PhaseId, phases: typeof PHASES_SPEED): number {
  return phases.findIndex((p) => p.id === phase)
}

function phaseForStep(
  step: StepId,
  kind:
    | 'speed'
    | 'missed-call'
    | 'google-profile'
    | 'profile-posting'
    | 'enquiry-reply'
    | 'reviews'
    | 'local-pack'
    | 'crm-rescue'
    | 'booking'
    | 'landing-page'
    | 'conversion-pass'
    | 'onpage-search'
    | 'schema-faq'
    | 'tracking-forms'
    | 'site-chat'
    | 'media-clean'
    | 'a11y-pass'
    | 'whatsapp-setup'
    | 'dm-reply'
    | 'quote-followup'
    | 'noshow-rescue'
    | 'intake-forms'
    | 'inbox-triage'
    | 'sop-playbook'
    | 'dashboard-lite'
    | 'bundle-clinic'
    | 'bundle-speed-next'
    | 'bundle-front-door'
    | 'geo'
    | 'client-finder'
    | 'team-ai'
    | 'change-pack'
    | 'content-system',
): PhaseId {
  if (step === 'done') return 'done'
  if (
    step === 'product' ||
    step === 'name' ||
    step === 'email' ||
    step === 'business'
  ) {
    return 'about'
  }
  if (kind === 'missed-call') {
    if (step === 'phone' || step === 'phoneSetup') return 'site'
    return 'access'
  }
  if (kind === 'google-profile') {
    if (step === 'profileUrl' || step === 'profileStatus') return 'site'
    return 'access'
  }
  if (kind === 'profile-posting') {
    if (step === 'profileUrl' || step === 'profileStatus' || step === 'whoPublishes') return 'site'
    return 'access'
  }
  if (kind === 'enquiry-reply') {
    if (
      step === 'websiteUrl' ||
      step === 'enquiryChannels' ||
      step === 'enquiryRoute'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'reviews') {
    if (step === 'profileUrl' || step === 'profileStatus' || step === 'reviewJob') return 'site'
    return 'access'
  }
  if (kind === 'local-pack') {
    if (
      step === 'profileUrl' ||
      step === 'profileStatus' ||
      step === 'reviewJob' ||
      step === 'whoPublishes'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'crm-rescue') {
    if (
      step === 'websiteUrl' ||
      step === 'crmSystem' ||
      step === 'leadSource' ||
      step === 'crmGoal'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'booking') {
    if (
      step === 'bookingTool' ||
      step === 'bookingWhat' ||
      step === 'bookingWhere' ||
      step === 'websiteUrl'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'landing-page') {
    if (
      step === 'landingGoal' ||
      step === 'landingAds' ||
      step === 'landingOffer' ||
      step === 'landingTracking' ||
      step === 'website' ||
      step === 'platform' ||
      step === 'provider' ||
      step === 'domainProvider' ||
      step === 'hostingProvider'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'conversion-pass') {
    if (
      step === 'conversionServiceA' ||
      step === 'conversionServiceB' ||
      step === 'conversionAsk' ||
      step === 'conversionOffer' ||
      step === 'website' ||
      step === 'platform' ||
      step === 'provider' ||
      step === 'domainProvider' ||
      step === 'hostingProvider'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'bundle-speed-next') {
    if (
      step === 'conversionServiceA' ||
      step === 'conversionServiceB' ||
      step === 'conversionAsk' ||
      step === 'conversionOffer' ||
      step === 'trackingStatus' ||
      step === 'trackingActions' ||
      step === 'trackingDestinations' ||
      step === 'website' ||
      step === 'platform' ||
      step === 'provider' ||
      step === 'domainProvider' ||
      step === 'hostingProvider'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'onpage-search') {
    if (
      step === 'onpageUrls' ||
      step === 'onpageQueries' ||
      step === 'website' ||
      step === 'platform' ||
      step === 'provider' ||
      step === 'domainProvider' ||
      step === 'hostingProvider'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'schema-faq') {
    if (
      step === 'schemaServices' ||
      step === 'schemaQuestions' ||
      step === 'website' ||
      step === 'platform' ||
      step === 'provider' ||
      step === 'domainProvider' ||
      step === 'hostingProvider'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'tracking-forms') {
    if (
      step === 'trackingStatus' ||
      step === 'trackingActions' ||
      step === 'trackingDestinations' ||
      step === 'website' ||
      step === 'platform' ||
      step === 'provider' ||
      step === 'domainProvider' ||
      step === 'hostingProvider'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'site-chat') {
    if (
      step === 'chatTopics' ||
      step === 'chatHandoff' ||
      step === 'website' ||
      step === 'platform' ||
      step === 'provider' ||
      step === 'domainProvider' ||
      step === 'hostingProvider'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'media-clean') {
    if (
      step === 'mediaTargets' ||
      step === 'website' ||
      step === 'platform' ||
      step === 'provider' ||
      step === 'domainProvider' ||
      step === 'hostingProvider'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'whatsapp-setup') {
    if (step === 'phone' || step === 'whatsappStatus' || step === 'whatsappGoals') {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'dm-reply') {
    if (step === 'dmPlatform' || step === 'dmChannels') {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'quote-followup') {
    if (step === 'quoteTool' || step === 'quoteTools') {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'intake-forms') {
    if (step === 'intakeDest' || step === 'intakePurpose') {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'bundle-clinic') {
    if (
      step === 'profileUrl' ||
      step === 'profileStatus' ||
      step === 'phone' ||
      step === 'phoneSetup' ||
      step === 'reviewJob' ||
      step === 'bundleNotes'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'bundle-front-door') {
    if (
      step === 'profileUrl' ||
      step === 'profileStatus' ||
      step === 'reviewJob' ||
      step === 'bookingTool' ||
      step === 'bookingWhat' ||
      step === 'bookingWhere' ||
      step === 'websiteUrl'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (
    kind === 'a11y-pass' ||
    kind === 'noshow-rescue' ||
    kind === 'inbox-triage' ||
    kind === 'sop-playbook' ||
    kind === 'dashboard-lite' ||
    kind === 'geo' ||
    kind === 'client-finder'
  ) {
    if (
      step === 'a11yPages' ||
      step === 'noshowTools' ||
      step === 'inboxTools' ||
      step === 'sopJobs' ||
      step === 'dashMetrics' ||
      step === 'bundleNotes' ||
      step === 'geoTopics' ||
      step === 'finderIcp' ||
      step === 'website' ||
      step === 'platform' ||
      step === 'provider' ||
      step === 'domainProvider' ||
      step === 'hostingProvider'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'team-ai') {
    if (
      step === 'sessionFormat' ||
      step === 'teamSize' ||
      step === 'teamTools' ||
      step === 'timeEaters' ||
      step === 'sensitiveData'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'change-pack') {
    if (
      step === 'rolloutType' ||
      step === 'peopleAffected' ||
      step === 'goLiveWindow' ||
      step === 'changeAreas'
    ) {
      return 'site'
    }
    return 'access'
  }
  if (kind === 'content-system') {
    if (step === 'contentChannels' || step === 'lastPostWhen') {
      return 'site'
    }
    return 'access'
  }
  if (step === 'website') return 'about'
  if (
    step === 'platform' ||
    step === 'provider' ||
    step === 'domainProvider' ||
    step === 'hostingProvider'
  ) {
    return 'site'
  }
  return 'access'
}

const PLATFORM_OPTIONS: {
  id: PlatformId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'wordpress',
    label: 'WordPress',
    blurb: 'Self-hosted WordPress. Usually a /wp-admin login.',
    icon: <LayoutTemplate className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'wordpress-com',
    label: 'WordPress.com',
    blurb: 'Hosted by Automattic. You log in at wordpress.com.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'shopify',
    label: 'Shopify',
    blurb: 'Online store. Admin is at Shopify, not a separate host.',
    icon: <ShoppingBag className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'squarespace',
    label: 'Squarespace',
    blurb: 'All-in-one builder. Domain and hosting are usually together.',
    icon: <Sparkles className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'wix',
    label: 'Wix',
    blurb: 'Drag-and-drop builder. Login is through Wix.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'webflow',
    label: 'Webflow',
    blurb: 'Design-led builder. Designer or Editor login.',
    icon: <Box className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'framer',
    label: 'Framer',
    blurb: 'Modern site builder. You manage it inside Framer.',
    icon: <Sparkles className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'bigcommerce',
    label: 'BigCommerce',
    blurb: 'Ecommerce platform. Admin is inside BigCommerce.',
    icon: <ShoppingBag className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'magento',
    label: 'Magento',
    blurb: 'Adobe Commerce / Magento. Often needs a developer login.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'joomla',
    label: 'Joomla',
    blurb: 'Older CMS. Admin is usually /administrator.',
    icon: <LayoutTemplate className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'drupal',
    label: 'Drupal',
    blurb: 'Enterprise CMS. Often needs a developer to hand over access.',
    icon: <Code2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'custom',
    label: 'Custom / code',
    blurb: 'Built from scratch. Hosting access matters most.',
    icon: <Code2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'other',
    label: 'Not sure',
    blurb: 'Cannot find a match. Pick this and we will work it out with you.',
    icon: null,
    unsure: true,
  },
]

const PROVIDER_OPTIONS: {
  id: SameProviderId
  label: string
  blurb: string
  unsure?: boolean
}[] = [
  {
    id: 'yes',
    label: 'Yes, same place',
    blurb: 'Domain and hosting login are with one company.',
  },
  {
    id: 'no',
    label: 'No, different',
    blurb: 'Domain in one place, hosting somewhere else.',
  },
  {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'Fine. We will work it out on a short call if needed.',
    unsure: true,
  },
]

const ACCESS_BY_ID: Record<
  'wp-admin' | 'hosting' | 'agency' | 'call',
  {
    id: AccessPathId
    label: string
    blurb: string
    icon: React.ReactNode
  }
> = {
  'wp-admin': {
    id: 'wp-admin',
    label: 'Website admin',
    blurb: 'Create a temporary admin, or tell us how we should get in.',
    icon: <LayoutTemplate className="w-full h-full" strokeWidth={1.25} />,
  },
  hosting: {
    id: 'hosting',
    label: 'Hosting panel',
    blurb: 'cPanel, Plesk, or your host dashboard.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  agency: {
    id: 'agency',
    label: 'Someone else',
    blurb: 'Agency or developer. We will ask you to introduce us.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  },
  call: {
    id: 'call',
    label: 'Quick call',
    blurb: 'We walk through access together. About five minutes.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
}

/** Speed Fix and other site jobs: access cards follow the platform they picked. */
function siteAccessOptionsForPlatform(platform: PlatformId | null) {
  switch (platform) {
    case 'wordpress':
    case 'joomla':
    case 'drupal':
    case 'magento':
      return [
        ACCESS_BY_ID['wp-admin'],
        ACCESS_BY_ID.hosting,
        ACCESS_BY_ID.agency,
        ACCESS_BY_ID.call,
      ]
    case 'wordpress-com':
    case 'shopify':
    case 'squarespace':
    case 'wix':
    case 'webflow':
    case 'framer':
    case 'bigcommerce':
      return [
        {
          ...ACCESS_BY_ID['wp-admin'],
          label: 'Platform admin',
          blurb: 'Invite us inside the builder, or share a temporary staff login.',
        },
        ACCESS_BY_ID.agency,
        ACCESS_BY_ID.call,
      ]
    case 'custom':
      return [ACCESS_BY_ID.hosting, ACCESS_BY_ID.agency, ACCESS_BY_ID.call]
    case 'other':
    default:
      return [
        ACCESS_BY_ID.call,
        ACCESS_BY_ID.agency,
        ACCESS_BY_ID['wp-admin'],
        ACCESS_BY_ID.hosting,
      ]
  }
}

const PHONE_SETUP_OPTIONS: {
  id: PhoneSetupId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'mobile',
    label: 'Mobile',
    blurb: 'A handset or mobile number for the business.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'landline',
    label: 'Landline',
    blurb: 'Office phone that rings on desks or a handset.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'voip',
    label: 'VoIP / app',
    blurb: 'Aircall, RingCentral, 3CX, Microsoft Teams, and similar.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'mixed',
    label: 'Mixed',
    blurb: 'Calls go to more than one place depending on the day.',
    icon: <Box className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'Fine. We will work it out on a short call if needed.',
    icon: null,
    unsure: true,
  },
]

const MISSED_CALL_ACCESS_BY_ID: Record<
  'forward' | 'provider' | 'crm' | 'call',
  {
    id: AccessPathId
    label: string
    blurb: string
    icon: React.ReactNode
  }
> = {
  forward: {
    id: 'forward',
    label: 'Call forward',
    blurb: 'You can change divert / unanswered forwarding on the number.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
  provider: {
    id: 'provider',
    label: 'Phone / SMS login',
    blurb: 'Carrier portal, VoIP admin, or SMS provider we can use.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  crm: {
    id: 'crm',
    label: 'CRM already linked',
    blurb: 'HubSpot or similar already sees your calls. Tell us how.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  },
  call: {
    id: 'call',
    label: 'Quick call',
    blurb: 'We walk through access together. About five minutes.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
}

/** Access path cards depend on phone setup. Same four options for every answer is wrong. */
function missedCallAccessOptionsForSetup(setup: PhoneSetupId | null) {
  switch (setup) {
    case 'mobile':
    case 'landline':
      return [
        MISSED_CALL_ACCESS_BY_ID.forward,
        MISSED_CALL_ACCESS_BY_ID.provider,
        MISSED_CALL_ACCESS_BY_ID.call,
      ]
    case 'voip':
      return [
        MISSED_CALL_ACCESS_BY_ID.provider,
        MISSED_CALL_ACCESS_BY_ID.crm,
        MISSED_CALL_ACCESS_BY_ID.call,
      ]
    case 'mixed':
      return [
        MISSED_CALL_ACCESS_BY_ID.forward,
        MISSED_CALL_ACCESS_BY_ID.provider,
        MISSED_CALL_ACCESS_BY_ID.crm,
        MISSED_CALL_ACCESS_BY_ID.call,
      ]
    case 'unsure':
    default:
      return [MISSED_CALL_ACCESS_BY_ID.call, MISSED_CALL_ACCESS_BY_ID.provider]
  }
}

/** AI Phone Setup: different job from text-back. Cards follow phone setup, not a static set. */
function aiPhoneAccessOptionsForSetup(setup: PhoneSetupId | null) {
  const vendor = {
    id: 'provider' as AccessPathId,
    label: 'Voice vendor login',
    blurb: 'Retell, Vapi, or similar. Invite us as staff, or share a temporary admin path.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  }
  const calendar = {
    id: 'invite' as AccessPathId,
    label: 'Calendar share',
    blurb: 'Share the Google or Outlook calendar the agent will book into.',
    icon: <Calendar className="w-full h-full" strokeWidth={1.25} />,
  }
  const divert = {
    id: 'forward' as AccessPathId,
    label: 'Call divert',
    blurb: 'You can divert unanswered or after-hours calls to the AI number.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  }
  const call = {
    ...MISSED_CALL_ACCESS_BY_ID.call,
    blurb: 'We walk through vendor, calendar, and divert together. About five minutes.',
  }

  switch (setup) {
    case 'mobile':
    case 'landline':
      return [divert, vendor, calendar, call]
    case 'voip':
      return [vendor, calendar, MISSED_CALL_ACCESS_BY_ID.crm, call]
    case 'mixed':
      return [divert, vendor, calendar, call]
    case 'unsure':
    default:
      return [call, vendor, calendar]
  }
}

const WHATSAPP_STATUS_OPTIONS: {
  id: WhatsappStatusId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'personal',
    label: 'Personal app',
    blurb: 'Chats live on one phone in the consumer WhatsApp app.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'business-app',
    label: 'Business app',
    blurb: 'WhatsApp Business is already installed, even if it is messy.',
    icon: <MessageCircle className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'meta',
    label: 'Meta Business',
    blurb: 'Number sits under Meta Business Manager or the API path.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'We will work it out on the access call.',
    icon: <Sparkles className="w-full h-full" strokeWidth={1.25} />,
    unsure: true,
  },
]

/** WhatsApp Business Setup: access cards follow how chat runs today. */
function whatsappAccessOptionsForStatus(status: WhatsappStatusId | null) {
  const phoneHandoff = {
    id: 'invite' as AccessPathId,
    label: 'Phone handoff',
    blurb: 'You can hand us the handset for setup, or walk through Business install together.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  }
  const businessInvite = {
    id: 'admin' as AccessPathId,
    label: 'Business app invite',
    blurb: 'Invite our device or account into WhatsApp Business so we can set labels and replies.',
    icon: <MessageCircle className="w-full h-full" strokeWidth={1.25} />,
  }
  const metaBm = {
    id: 'provider' as AccessPathId,
    label: 'Meta Business Manager',
    blurb: 'Invite us as a partner or admin on the Meta Business that owns the number.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  }
  const call = {
    id: 'call' as AccessPathId,
    label: 'Quick access call',
    blurb: 'We walk through the number path and Business setup together. About five minutes.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  }

  switch (status) {
    case 'personal':
      return [phoneHandoff, call]
    case 'business-app':
      return [businessInvite, metaBm, call]
    case 'meta':
      return [metaBm, businessInvite, call]
    case 'unsure':
    default:
      return [call, phoneHandoff, metaBm]
  }
}

const DM_PLATFORM_OPTIONS: {
  id: DmPlatformId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    blurb: 'DMs come into the Instagram inbox for the business profile.',
    icon: <MessageCircle className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    blurb: 'DMs come into the Facebook Page inbox.',
    icon: <Users className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'both',
    label: 'Both',
    blurb: 'Instagram and Facebook Page inboxes as scoped at kickoff.',
    icon: <Box className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'We will lock the inboxes on the access call.',
    icon: <Sparkles className="w-full h-full" strokeWidth={1.25} />,
    unsure: true,
  },
]

/** DM Reply System: access cards follow which Meta inboxes are in scope. */
function dmAccessOptionsForPlatform(platform: DmPlatformId | null) {
  const pageInvite = {
    id: 'invite' as AccessPathId,
    label: 'Page or IG invite',
    blurb: 'Invite us as a Page or Instagram professional role so we can set quick replies.',
    icon: <Users className="w-full h-full" strokeWidth={1.25} />,
  }
  const metaBm = {
    id: 'provider' as AccessPathId,
    label: 'Meta Business Manager',
    blurb: 'Invite us as a partner or admin on the Meta Business that owns the Page.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  }
  const inboxAdmin = {
    id: 'admin' as AccessPathId,
    label: 'Inbox admin login',
    blurb: 'Share a temporary staff path into Meta Business Suite or the Page inbox.',
    icon: <MessageCircle className="w-full h-full" strokeWidth={1.25} />,
  }
  const call = {
    id: 'call' as AccessPathId,
    label: 'Quick access call',
    blurb: 'We walk through Page and Instagram permissions together. About five minutes.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  }

  switch (platform) {
    case 'instagram':
      return [pageInvite, metaBm, call]
    case 'facebook':
      return [pageInvite, metaBm, inboxAdmin, call]
    case 'both':
      return [metaBm, pageInvite, call]
    case 'unsure':
    default:
      return [call, pageInvite, metaBm]
  }
}

const QUOTE_TOOL_OPTIONS: {
  id: QuoteToolId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'hubspot',
    label: 'HubSpot',
    blurb: 'Quotes or deals live in HubSpot.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'pipedrive',
    label: 'Pipedrive',
    blurb: 'Deals and quotes sit in Pipedrive.',
    icon: <Box className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'sheets',
    label: 'Spreadsheet',
    blurb: 'Google Sheets, Excel, or a similar tracker.',
    icon: <FileText className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'email',
    label: 'Email only',
    blurb: 'PDFs go out from an inbox. No CRM yet.',
    icon: <Mail className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'other',
    label: 'Other tool',
    blurb: 'Job software, accounting, or something else.',
    icon: <LayoutTemplate className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'We will map the quote path on the access call.',
    icon: <Sparkles className="w-full h-full" strokeWidth={1.25} />,
    unsure: true,
  },
]

/** Quote Follow-Up: access cards follow where quotes live today. */
function quoteAccessOptionsForTool(tool: QuoteToolId | null) {
  const crmInvite = {
    id: 'invite' as AccessPathId,
    label: 'CRM invite',
    blurb: 'Invite us as a user so we can wire the follow-up on your deals.',
    icon: <Users className="w-full h-full" strokeWidth={1.25} />,
  }
  const crmAdmin = {
    id: 'crm' as AccessPathId,
    label: 'CRM admin path',
    blurb: 'Share a temporary admin or workflow path for the quote stage.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  }
  const sheetShare = {
    id: 'invite' as AccessPathId,
    label: 'Sheet share',
    blurb: 'Share the quote tracker with edit access, or a copy we can wire from.',
    icon: <FileText className="w-full h-full" strokeWidth={1.25} />,
  }
  const mailbox = {
    id: 'provider' as AccessPathId,
    label: 'Mailbox access',
    blurb: 'Share the sending inbox or the tool that fires email after a quote.',
    icon: <Mail className="w-full h-full" strokeWidth={1.25} />,
  }
  const call = {
    id: 'call' as AccessPathId,
    label: 'Quick access call',
    blurb: 'We walk through the quote path and stop rules together. About five minutes.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  }

  switch (tool) {
    case 'hubspot':
    case 'pipedrive':
      return [crmInvite, crmAdmin, call]
    case 'sheets':
      return [sheetShare, call]
    case 'email':
      return [mailbox, call]
    case 'other':
      return [crmInvite, mailbox, call]
    case 'unsure':
    default:
      return [call, crmInvite, mailbox]
  }
}

const INTAKE_DEST_OPTIONS: {
  id: IntakeDestId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'crm',
    label: 'CRM',
    blurb: 'Submissions should create or update a contact or deal.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'email',
    label: 'Structured email',
    blurb: 'A clean inbox destination staff actually watch.',
    icon: <Mail className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'sheets',
    label: 'Spreadsheet',
    blurb: 'Rows land in Google Sheets or Excel for now.',
    icon: <FileText className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'other',
    label: 'Other tool',
    blurb: 'Practice software, job system, or something else.',
    icon: <LayoutTemplate className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'We will lock the destination on the access call.',
    icon: <Sparkles className="w-full h-full" strokeWidth={1.25} />,
    unsure: true,
  },
]

/** Intake Form Pack: access cards follow where submissions should land. */
function intakeAccessOptionsForDest(dest: IntakeDestId | null) {
  const crmInvite = {
    id: 'invite' as AccessPathId,
    label: 'CRM invite',
    blurb: 'Invite us so we can map fields into the right contact or deal properties.',
    icon: <Users className="w-full h-full" strokeWidth={1.25} />,
  }
  const crmAdmin = {
    id: 'crm' as AccessPathId,
    label: 'CRM admin path',
    blurb: 'Share a temporary admin or form-to-CRM path for the intake object.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  }
  const mailbox = {
    id: 'provider' as AccessPathId,
    label: 'Inbox access',
    blurb: 'Share the mailbox or form tool that should receive structured submissions.',
    icon: <Mail className="w-full h-full" strokeWidth={1.25} />,
  }
  const sheetShare = {
    id: 'invite' as AccessPathId,
    label: 'Sheet share',
    blurb: 'Share the destination sheet with edit access, or a blank template we can wire.',
    icon: <FileText className="w-full h-full" strokeWidth={1.25} />,
  }
  const formTool = {
    id: 'form-provider' as AccessPathId,
    label: 'Form tool login',
    blurb: 'Typeform, Jotform, Gravity, or similar. Invite us or share a temporary admin path.',
    icon: <LayoutTemplate className="w-full h-full" strokeWidth={1.25} />,
  }
  const call = {
    id: 'call' as AccessPathId,
    label: 'Quick access call',
    blurb: 'We walk through fields and destination together. About five minutes.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  }

  switch (dest) {
    case 'crm':
      return [crmInvite, crmAdmin, formTool, call]
    case 'email':
      return [mailbox, formTool, call]
    case 'sheets':
      return [sheetShare, formTool, call]
    case 'other':
      return [formTool, crmInvite, call]
    case 'unsure':
    default:
      return [call, formTool, crmInvite]
  }
}

/** Search Visibility Fix: Search Console first, then platform-aware site access. */
function searchAccessOptionsForPlatform(platform: PlatformId | null) {
  const searchConsole = {
    id: 'search-console' as AccessPathId,
    label: 'Search Console',
    blurb: 'Approve us as a user on your Search Console property. Ownership stays yours.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  }
  const site = siteAccessOptionsForPlatform(platform).filter((opt) => opt.id !== 'call')
  return [searchConsole, ...site, ACCESS_BY_ID.call]
}

const LANDING_GOAL_OPTIONS: {
  id: LandingGoalId
  label: string
  blurb: string
  icon: React.ReactNode
}[] = [
  {
    id: 'leads',
    label: 'Lead form',
    blurb: 'Capture name, phone, or email for follow-up.',
    icon: <FileText className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'calls',
    label: 'Call now',
    blurb: 'Push people to ring your number.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'book',
    label: 'Book a consult',
    blurb: 'Calendar or booking link as the main action.',
    icon: <Calendar className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'buy',
    label: 'Buy or pay',
    blurb: 'Checkout, deposit, or paid offer on the page.',
    icon: <ShoppingBag className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'other',
    label: 'Something else',
    blurb: 'Tell us the action in the offer step.',
    icon: <Code2 className="w-full h-full" strokeWidth={1.25} />,
  },
]

const CONVERSION_ASK_OPTIONS: {
  id: ConversionAskId
  label: string
  blurb: string
  icon: React.ReactNode
}[] = [
  {
    id: 'call',
    label: 'Call now',
    blurb: 'The main next step is picking up the phone.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'form',
    label: 'Enquiry form',
    blurb: 'The main next step is filling in a form.',
    icon: <FileText className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'book',
    label: 'Book a time',
    blurb: 'The main next step is a calendar or booking link.',
    icon: <Calendar className="w-full h-full" strokeWidth={1.25} />,
  },
]

const LANDING_ADS_OPTIONS: {
  id: LandingAdsId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'meta',
    label: 'Meta ads',
    blurb: 'Facebook or Instagram ads are live or about to be.',
    icon: <Users className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'google',
    label: 'Google ads',
    blurb: 'Search, Display, or YouTube ads.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'both',
    label: 'Meta and Google',
    blurb: 'Clicks come from both platforms.',
    icon: <Box className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'not-live',
    label: 'Not live yet',
    blurb: 'You have the offer. Ads start after the page is ready.',
    icon: <FileText className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'other',
    label: 'Other / not sure',
    blurb: 'LinkedIn, TikTok, or you are still deciding.',
    icon: null,
    unsure: true,
  },
]

const LANDING_TRACKING_OPTIONS: {
  id: LandingTrackingId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'meta',
    label: 'Meta pixel',
    blurb: 'Pixel already on the site, or you can share it.',
    icon: <Users className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'google',
    label: 'Google tag',
    blurb: 'gtag, Google Ads tag, or Tag Manager.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'both',
    label: 'Both',
    blurb: 'Meta and Google tracking both matter.',
    icon: <Box className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'none',
    label: 'Nothing yet',
    blurb: 'We wire tracking as part of the build.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'Fine. We will check the site and set what is missing.',
    icon: null,
    unsure: true,
  },
]


const TRACKING_STATUS_OPTIONS: {
  id: 'ga4' | 'gtm' | 'none' | 'unsure'
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'ga4',
    label: 'GA4 only',
    blurb: 'Google Analytics 4 is on the site.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'gtm',
    label: 'Tag Manager',
    blurb: 'GTM is installed, with or without GA4.',
    icon: <Box className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'none',
    label: 'Nothing yet',
    blurb: 'No GA4 or Tag Manager that you know of.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'Fine. We will check the site and set what is missing.',
    icon: null,
    unsure: true,
  },
]

/** Campaign Landing Page: ad account when ads are live, then platform-aware site access. */
function landingAccessOptionsForAds(ads: LandingAdsId | null, platform: PlatformId | null) {
  const site = siteAccessOptionsForPlatform(platform).filter((opt) => opt.id !== 'call')
  const adMeta = {
    id: 'ad-account' as AccessPathId,
    label: 'Meta Business Manager',
    blurb: 'Invite us as a partner or advertiser. Ownership stays yours.',
    icon: <Users className="w-full h-full" strokeWidth={1.25} />,
  }
  const adGoogle = {
    id: 'ad-account' as AccessPathId,
    label: 'Google Ads access',
    blurb: 'Add us as a user on the Google Ads account, or share the tag details.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  }
  const adBoth = {
    id: 'ad-account' as AccessPathId,
    label: 'Ad account invite',
    blurb: 'Invite us on Meta and Google so tracking and destinations line up.',
    icon: <Box className="w-full h-full" strokeWidth={1.25} />,
  }
  switch (ads) {
    case 'meta':
      return [adMeta, ...site, ACCESS_BY_ID.call]
    case 'google':
      return [adGoogle, ...site, ACCESS_BY_ID.call]
    case 'both':
      return [adBoth, ...site, ACCESS_BY_ID.call]
    case 'not-live':
      return [...site, ACCESS_BY_ID.call]
    case 'other':
    default:
      return [ACCESS_BY_ID.call, adBoth, ...site]
  }
}


const GOOGLE_PROFILE_STATUS_OPTIONS: {
  id: ProfileStatusId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'claimed-me',
    label: 'I manage it',
    blurb: 'You can already open the profile in Google Business Profile.',
    icon: <Check className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'unclaimed',
    label: 'Unclaimed',
    blurb: 'The listing exists or should exist, but nobody owns it yet.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'claimed-other',
    label: 'Someone else claimed it',
    blurb: 'Ex-staff, old agency, or another number. Recovery is part of the job.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'suspended',
    label: 'Suspended',
    blurb: 'Google locked or restricted the listing. We will assess recovery.',
    icon: <X className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'Fine. We will work it out once we can see the listing.',
    icon: null,
    unsure: true,
  },
]

const GOOGLE_PROFILE_ACCESS_BY_ID: Record<
  'invite' | 'call' | 'claim' | 'recover',
  {
    id: AccessPathId
    label: string
    blurb: string
    icon: React.ReactNode
  }
> = {
  invite: {
    id: 'invite',
    label: 'Manager invite',
    blurb: 'You add us as a manager in Google. No password sharing.',
    icon: <Check className="w-full h-full" strokeWidth={1.25} />,
  },
  call: {
    id: 'call',
    label: 'Quick call',
    blurb: 'We walk through it together. About five minutes.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
  claim: {
    id: 'claim',
    label: 'Claim it with us',
    blurb: 'Nobody owns it yet. We walk the Google claim together. Manager invite comes after.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  },
  recover: {
    id: 'recover',
    label: 'Recover ownership',
    blurb: 'We start Google recovery for a listing you do not control today.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  },
}

/** Access path cards depend on profile status. Unclaimed cannot invite a manager. */
function googleAccessOptionsForStatus(status: ProfileStatusId | null) {
  switch (status) {
    case 'claimed-me':
      return [
        GOOGLE_PROFILE_ACCESS_BY_ID.invite,
        {
          ...GOOGLE_PROFILE_ACCESS_BY_ID.call,
          blurb: 'We walk through the manager invite together. About five minutes.',
        },
      ]
    case 'unclaimed':
      return [
        GOOGLE_PROFILE_ACCESS_BY_ID.claim,
        {
          ...GOOGLE_PROFILE_ACCESS_BY_ID.call,
          blurb: 'Talk through whether a listing already exists and how to claim it.',
        },
      ]
    case 'claimed-other':
      return [
        GOOGLE_PROFILE_ACCESS_BY_ID.recover,
        {
          ...GOOGLE_PROFILE_ACCESS_BY_ID.call,
          blurb: 'Useful if you know who claimed it or have old emails.',
        },
      ]
    case 'suspended':
      return [
        {
          ...GOOGLE_PROFILE_ACCESS_BY_ID.recover,
          label: 'Assess the suspension',
          blurb: 'We open the case with you and map what Google will allow.',
        },
        {
          ...GOOGLE_PROFILE_ACCESS_BY_ID.call,
          blurb: 'Best when you have the suspension email from Google.',
        },
      ]
    case 'unsure':
    default:
      return [
        {
          ...GOOGLE_PROFILE_ACCESS_BY_ID.call,
          blurb: 'We look at the listing together and pick claim, invite, or recovery.',
        },
        {
          ...GOOGLE_PROFILE_ACCESS_BY_ID.invite,
          label: 'I think I manage it',
          blurb: 'If you can already open Business Profile, invite us as manager.',
        },
      ]
  }
}

/** Clinic Capture Bundle: Maps access plus the missed-call path, without duplicate cards. */
function clinicBundleAccessOptions(
  status: ProfileStatusId | null,
  setup: PhoneSetupId | null,
) {
  const google = googleAccessOptionsForStatus(status)
  const phone = missedCallAccessOptionsForSetup(setup).filter((opt) => opt.id !== 'call')
  const seen = new Set<string>()
  const merged: typeof google = []
  for (const opt of [...google, ...phone]) {
    if (seen.has(opt.id)) continue
    seen.add(opt.id)
    merged.push(opt)
  }
  const callOpt = {
    id: 'call' as AccessPathId,
    label: 'Quick access call',
    blurb: 'We walk through Maps manager and the missed-call SMS path together. About ten minutes.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  }
  return [...merged.filter((opt) => opt.id !== 'call'), callOpt]
}

const WHO_PUBLISHES_OPTIONS: {
  id: WhoPublishesId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'owner',
    label: 'I will publish',
    blurb: 'You hit publish yourself once the cadence and templates are ready.',
    icon: <Check className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'staff',
    label: 'Someone on the team',
    blurb: 'A staff member publishes from the calendar and the starter bank.',
    icon: <Users className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'care-later',
    label: 'We may want care later',
    blurb: 'You start solo, then hand posting to us as an add-on down the track.',
    icon: <Calendar className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'Fine. We will help you decide once the system is set up.',
    icon: null,
    unsure: true,
  },
]

/** Who-publishes cards change with listing status. Unclaimed / locked listings ask about later. */
function whoPublishesOptionsForStatus(status: ProfileStatusId | null) {
  const base = WHO_PUBLISHES_OPTIONS
  switch (status) {
    case 'unclaimed':
      return [
        {
          ...base[0],
          label: 'I will, once claimed',
          blurb: 'After we claim the listing, you hit publish from the kit.',
        },
        {
          ...base[1],
          label: 'Staff, once claimed',
          blurb: 'After claim, someone on the team publishes from the bank.',
        },
        {
          ...base[2],
          label: 'May want care later',
          blurb: 'Claim and kit first. Care month is optional once posting is live.',
        },
        {
          ...base[3],
          blurb: 'Fine. We decide who publishes after the listing is claimed.',
        },
      ]
    case 'claimed-other':
      return [
        {
          ...base[0],
          label: 'I will, once recovered',
          blurb: 'After ownership is back with you, you hit publish from the kit.',
        },
        {
          ...base[1],
          label: 'Staff, once recovered',
          blurb: 'After recovery, someone on the team publishes from the bank.',
        },
        {
          ...base[2],
          label: 'May want care later',
          blurb: 'Recover first. Care month is optional once you control the listing.',
        },
        {
          ...base[3],
          blurb: 'Fine. We decide who publishes after recovery.',
        },
      ]
    case 'suspended':
      return [
        {
          ...base[0],
          label: 'I will, if it reopens',
          blurb: 'If Google restores the listing, you publish from the kit.',
        },
        {
          ...base[1],
          label: 'Staff, if it reopens',
          blurb: 'If it reopens, someone on the team publishes from the bank.',
        },
        {
          ...base[2],
          label: 'May want care later',
          blurb: 'Suspension first. Care month only makes sense if the listing is usable.',
        },
        {
          ...base[3],
          blurb: 'Fine. We decide after we know what Google will allow.',
        },
      ]
    case 'unsure':
      return [
        {
          ...base[0],
          blurb: 'If you already manage it, you hit publish. If not, we sort access first.',
        },
        {
          ...base[1],
          blurb: 'A staff member publishes once we know who can open the profile.',
        },
        {...base[2]},
        {
          ...base[3],
          blurb: 'Fine. We match publisher to access once we see the listing.',
        },
      ]
    case 'claimed-me':
    default:
      return base
  }
}

/** Profile Posting access: status first, then refine by who publishes when they already manage it. */
function postingAccessOptionsForStatus(
  status: ProfileStatusId | null,
  who: WhoPublishesId | null,
) {
  const invite = GOOGLE_PROFILE_ACCESS_BY_ID.invite
  const call = GOOGLE_PROFILE_ACCESS_BY_ID.call
  const claim = GOOGLE_PROFILE_ACCESS_BY_ID.claim
  const recover = GOOGLE_PROFILE_ACCESS_BY_ID.recover

  switch (status) {
    case 'claimed-me': {
      if (who === 'staff') {
        return [
          {
            ...invite,
            label: 'Manager invite',
            blurb: 'Invite us as manager so we can hand the kit to you and your publisher.',
          },
          {
            ...call,
            blurb: 'Walk through invite plus who on the team will hit publish. About five minutes.',
          },
        ]
      }
      if (who === 'care-later') {
        return [
          {
            ...invite,
            blurb: 'Invite us as manager for the kit now. Care month, if you want it, is a separate step later.',
          },
          {
            ...call,
            blurb: 'Useful if you want to talk through solo publish vs care month.',
          },
        ]
      }
      if (who === 'unsure') {
        return [
          {
            ...call,
            blurb: 'We look at the listing together and decide invite vs who should publish.',
          },
          {
            ...invite,
            blurb: 'If you can already open Business Profile, invite us as manager.',
          },
        ]
      }
      return [
        {
          ...invite,
          blurb: 'Add us as a manager so we can set cadence, templates, and the bank. No password sharing.',
        },
        {
          ...call,
          blurb: 'We walk the manager invite together. About five minutes.',
        },
      ]
    }
    case 'unclaimed':
      return [
        {
          ...claim,
          label: 'Claim it with us',
          blurb: 'Nobody owns it yet. We claim it together, then build the posting kit.',
        },
        {
          ...call,
          blurb: 'Talk through whether a listing already exists and how to claim it before any posts.',
        },
      ]
    case 'claimed-other':
      return [
        {
          ...recover,
          label: 'Recover ownership',
          blurb: 'We start Google recovery. The posting kit waits until you control the listing.',
        },
        {
          ...call,
          blurb: 'Useful if you know who claimed it or still have old Google emails.',
        },
      ]
    case 'suspended':
      return [
        {
          ...recover,
          label: 'Assess the suspension',
          blurb: 'We open the case with you. No point building posts until Google will allow them.',
        },
        {
          ...call,
          blurb: 'Best when you have the suspension email from Google.',
        },
      ]
    case 'unsure':
    default:
      return [
        {
          ...call,
          blurb: 'We look at the listing together and pick claim, invite, or recovery before the kit.',
        },
        {
          ...invite,
          label: 'I think I manage it',
          blurb: 'If you can already open Business Profile, invite us as manager for the kit.',
        },
      ]
  }
}

/** Posting-specific status blurbs (same ids as Google Profile Fix). */
const POSTING_PROFILE_STATUS_OPTIONS: typeof GOOGLE_PROFILE_STATUS_OPTIONS =
  GOOGLE_PROFILE_STATUS_OPTIONS.map((opt) => {
    switch (opt.id) {
      case 'claimed-me':
        return {
          ...opt,
          blurb: 'You can already open Business Profile and post updates today.',
        }
      case 'unclaimed':
        return {
          ...opt,
          blurb: 'Nobody owns it yet. Claim comes before any posting kit.',
        }
      case 'claimed-other':
        return {
          ...opt,
          blurb: 'Ex-staff or old agency holds it. Recovery first, then the kit.',
        }
      case 'suspended':
        return {
          ...opt,
          blurb: 'Google locked it. We assess recovery before we write posts.',
        }
      case 'unsure':
        return {
          ...opt,
          blurb: 'Fine. We will sort claim vs invite once we see the listing.',
        }
      default:
        return opt
    }
  })

/** Local Pack: status blurbs framed around the whole pack, not just posting. */
const LOCAL_PACK_PROFILE_STATUS_OPTIONS: typeof GOOGLE_PROFILE_STATUS_OPTIONS =
  GOOGLE_PROFILE_STATUS_OPTIONS.map((opt) => {
    switch (opt.id) {
      case 'claimed-me':
        return {
          ...opt,
          blurb: 'You can already open Business Profile. The pack can start straight away.',
        }
      case 'unclaimed':
        return {
          ...opt,
          blurb: 'Nobody owns it yet. Claim comes before the profile, review, and posting work.',
        }
      case 'claimed-other':
        return {
          ...opt,
          blurb: 'Ex-staff or old agency holds it. Recovery comes before the pack starts.',
        }
      case 'suspended':
        return {
          ...opt,
          blurb: 'Google locked it. We assess recovery before the pack starts.',
        }
      case 'unsure':
        return {
          ...opt,
          blurb: 'Fine. We will sort claim vs invite once we see the listing.',
        }
      default:
        return opt
    }
  })

/** Reviews: access depends on profile status, then how jobs get marked complete. */
function reviewsAccessOptionsForStatus(
  status: ProfileStatusId | null,
  job: ReviewJobId | null,
) {
  const invite = {
    id: 'invite' as AccessPathId,
    label: 'Manager invite',
    blurb: 'Add us as a manager on the Google listing. No password sharing.',
    icon: <Check className="w-full h-full" strokeWidth={1.25} />,
  }
  const call = {
    id: 'call' as AccessPathId,
    label: 'Quick call',
    blurb: 'We walk through listing access and the ask path together.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  }
  const smsProvider = {
    id: 'provider' as AccessPathId,
    label: 'SMS / email tool',
    blurb: 'The tool that already texts or emails customers after a job.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  }
  const crm = {
    id: 'crm' as AccessPathId,
    label: 'Job software login',
    blurb: 'CRM, job management, or booking tool where jobs get marked done.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  }

  switch (status) {
    case 'unclaimed':
      return [
        {
          id: 'claim' as AccessPathId,
          label: 'Claim the listing first',
          blurb: 'Nobody owns it yet. We claim it with you, then wire the ask.',
          icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
        },
        call,
      ]
    case 'claimed-other':
      return [
        {
          id: 'recover' as AccessPathId,
          label: 'Recover ownership',
          blurb: 'We start Google recovery, then wire the ask once you control it.',
          icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
        },
        call,
      ]
    case 'suspended':
      return [
        {
          id: 'recover' as AccessPathId,
          label: 'Assess the suspension',
          blurb: 'Reviews cannot grow on a locked listing. We map what Google will allow.',
          icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
        },
        call,
      ]
    case 'claimed-me':
      switch (job) {
        case 'sms':
        case 'email':
          return [invite, smsProvider, call]
        case 'software':
          return [invite, crm, call]
        case 'manual':
          return [invite, call]
        case 'unsure':
        default:
          return [call, invite, smsProvider]
      }
    case 'unsure':
    default:
      return [
        call,
        {
          ...invite,
          label: 'I think I manage it',
          blurb: 'If you can open Business Profile, invite us as manager.',
        },
      ]
  }
}

/**
 * Local Pack access: listing path from Profile Posting / Profile Fix, plus Review Engine
 * tool paths (SMS/email provider or job software) when the buyer already manages the listing.
 */
function localPackAccessOptionsForStatus(
  status: ProfileStatusId | null,
  who: WhoPublishesId | null,
  job: ReviewJobId | null,
) {
  const listing = postingAccessOptionsForStatus(status, who).map((opt) => {
    if (opt.id === 'invite') {
      return {
        ...opt,
        blurb:
          who === 'staff'
            ? 'Invite us as manager so we can clean the profile, wire reviews, and hand the posting kit to you and your publisher.'
            : who === 'care-later'
              ? 'Invite us as manager for profile, reviews, and the posting kit. Care month, if you want it, is separate later.'
              : who === 'unsure'
                ? 'If you can already open Business Profile, invite us as manager for the whole pack.'
                : 'Add us as a manager so we can clean the profile, wire the review ask, and set the posting kit. No password sharing.',
      }
    }
    if (opt.id === 'call') {
      return {
        ...opt,
        blurb:
          status === 'claimed-me'
            ? 'Walk through manager invite, the review ask path, and who hits publish. About five minutes.'
            : opt.blurb.includes('posting')
              ? opt.blurb.replace(/posting kit/gi, 'pack').replace(/posts/gi, 'the pack')
              : opt.blurb,
      }
    }
    if (opt.id === 'claim') {
      return {
        ...opt,
        blurb: 'Nobody owns it yet. We claim it together, then run profile, reviews, and posting.',
      }
    }
    if (opt.id === 'recover') {
      return {
        ...opt,
        label: status === 'suspended' ? 'Assess the suspension' : 'Recover ownership',
        blurb:
          status === 'suspended'
            ? 'We open the case with you. No profile, review, or posting work until Google will allow it.'
            : 'We start Google recovery. The pack waits until you control the listing.',
      }
    }
    return opt
  })

  if (status !== 'claimed-me') return listing

  const smsProvider = {
    id: 'provider' as AccessPathId,
    label: 'SMS / email tool',
    blurb: 'The tool that already texts or emails customers after a job. We need it for the review ask.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  }
  const crm = {
    id: 'crm' as AccessPathId,
    label: 'Job software login',
    blurb: 'CRM, job management, or booking tool where jobs get marked done. That is the review trigger.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  }

  const invite = listing.find((o) => o.id === 'invite')
  const call = listing.find((o) => o.id === 'call')
  if (!invite || !call) return listing

  if (job === 'sms' || job === 'email') return [invite, smsProvider, call]
  if (job === 'software') return [invite, crm, call]
  if (job === 'unsure') return [call, invite, smsProvider]
  // manual: listing access is enough for the ask templates
  return [invite, call]
}

const REVIEW_JOB_OPTIONS: {
  id: ReviewJobId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'sms',
    label: 'SMS after the job',
    blurb: 'A text goes out when the work is done, or when you mark it complete.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'email',
    label: 'Email after the job',
    blurb: 'An email fires from your inbox tool or CRM when the job closes.',
    icon: <Mail className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'software',
    label: 'Job software',
    blurb: 'A CRM, booking tool, or job app already marks jobs complete.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'manual',
    label: 'We ask by hand',
    blurb: 'QR, short link, or a verbal ask. No automation yet.',
    icon: <Check className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'Fine. We will pick the lightest path on a short call if needed.',
    icon: null,
    unsure: true,
  },
]

const CRM_SYSTEM_OPTIONS: {
  id: CrmSystemId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'hubspot',
    label: 'HubSpot',
    blurb: 'Free or paid. We rescue the setup you already have.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'pipedrive',
    label: 'Pipedrive',
    blurb: 'Pipeline CRM. We wire alerts and follow-up into it.',
    icon: <LayoutTemplate className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'salesforce',
    label: 'Salesforce',
    blurb: 'Larger CRM. We keep scope tight on lead handling.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'zoho',
    label: 'Zoho',
    blurb: 'Zoho CRM or similar. We work with what you pay for.',
    icon: <Box className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'monday',
    label: 'Monday / other board',
    blurb: 'Boards and lists counting as your CRM today.',
    icon: <Sparkles className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'sheets',
    label: 'Spreadsheet',
    blurb: 'Google Sheets or Excel is the current system of record.',
    icon: <LayoutTemplate className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'inbox',
    label: 'Just email / inbox',
    blurb: 'Leads land in a shared or personal inbox. Common and fixable.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'other',
    label: 'Something else',
    blurb: 'Tell us the name in the notes. We will work with it.',
    icon: <Code2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'none',
    label: 'Nothing yet',
    blurb: 'We stand up HubSpot free tier as part of the rescue.',
    icon: null,
    unsure: true,
  },
]

const CRM_LEAD_SOURCE_OPTIONS: {
  id: CrmLeadSourceId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'form',
    label: 'Website form',
    blurb: 'Contact or quote forms are the main path.',
    icon: <LayoutTemplate className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'phone',
    label: 'Phone calls',
    blurb: 'Most work starts on the phone.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'ads',
    label: 'Paid ads',
    blurb: 'Ad clicks become form fills or calls.',
    icon: <Sparkles className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'social',
    label: 'Social / DMs',
    blurb: 'Instagram, Facebook, or LinkedIn messages.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'walk-in',
    label: 'Walk-ins / referrals',
    blurb: 'In person or word of mouth still needs a system.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'mixed',
    label: 'A mix',
    blurb: 'More than one channel. We map them all.',
    icon: <Box className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'Fine. We will sort channels during the audit.',
    icon: null,
    unsure: true,
  },
]

const CRM_GOAL_OPTIONS: {
  id: CrmGoalId
  label: string
  blurb: string
  icon: React.ReactNode
}[] = [
  {
    id: 'speed',
    label: 'Reply in seconds',
    blurb: 'Instant first reply while the customer is still on the site.',
    icon: <Sparkles className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'alerts',
    label: 'Phone alerts',
    blurb: 'The right phone buzzes the moment a lead arrives.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'follow-up',
    label: 'Follow-up that runs itself',
    blurb: 'Sequences that chase leads without someone remembering.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'quotes',
    label: 'Quotes chased',
    blurb: 'Sent quotes get followed up until they win or die cleanly.',
    icon: <Check className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'missed-call',
    label: 'Missed-call text-back',
    blurb: 'Included in the rescue. Flag if that is the biggest gap.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'full',
    label: 'The full rescue',
    blurb: 'Alerts, replies, follow-up, quotes, missed calls. All of it.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  },
]

const CRM_ACCESS_BY_ID: Record<
  'invite' | 'admin' | 'form-provider' | 'call',
  {
    id: AccessPathId
    label: string
    blurb: string
    icon: React.ReactNode
  }
> = {
  invite: {
    id: 'invite',
    label: 'CRM invite',
    blurb: 'You invite us as a user or admin. No password sharing.',
    icon: <Check className="w-full h-full" strokeWidth={1.25} />,
  },
  admin: {
    id: 'admin',
    label: 'Admin login details',
    blurb: 'You share a temporary admin path we can use for the build.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  'form-provider': {
    id: 'form-provider',
    label: 'Form / email provider',
    blurb: 'Typeform, Gravity Forms, Gmail, or the tool that catches leads today.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  },
  call: {
    id: 'call',
    label: 'We will call you',
    blurb: 'After we audit the form, we call to finish access. You do not book a sales chat.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
}

/** CRM Rescue: access cards follow the system they said they use. */
function crmAccessOptionsForSystem(system: CrmSystemId | null) {
  switch (system) {
    case 'hubspot':
    case 'pipedrive':
    case 'salesforce':
    case 'zoho':
    case 'monday':
      return [CRM_ACCESS_BY_ID.invite, CRM_ACCESS_BY_ID.admin, CRM_ACCESS_BY_ID.call]
    case 'sheets':
    case 'inbox':
    case 'none':
      return [CRM_ACCESS_BY_ID['form-provider'], CRM_ACCESS_BY_ID.call]
    case 'other':
    default:
      return [
        CRM_ACCESS_BY_ID.call,
        CRM_ACCESS_BY_ID.invite,
        CRM_ACCESS_BY_ID['form-provider'],
      ]
  }
}

const ENQUIRY_CHANNEL_OPTIONS: {
  id: EnquiryChannelId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'both',
    label: 'Form and email',
    blurb: 'Website form plus the inbox people write to. The usual fixed-price scope.',
    icon: <Mail className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'form',
    label: 'Website form only',
    blurb: 'Contact or quote form on the site. Email can wait.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'email',
    label: 'Email only',
    blurb: 'People write to an address. No public form in scope for this job.',
    icon: <Mail className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'both-plus',
    label: 'Form, email, plus one more',
    blurb: 'The fixed price includes one extra intake you already use, for example chat or WhatsApp.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'Fine. We will map channels on a short call.',
    icon: null,
    unsure: true,
  },
]

const ENQUIRY_ROUTE_BY_ID: Record<
  EnquiryRouteId,
  {id: EnquiryRouteId; label: string; blurb: string; icon: React.ReactNode; unsure?: boolean}
> = {
  inbox: {
    id: 'inbox',
    label: 'One email inbox',
    blurb: 'The real message lands in one shared inbox your team already watches.',
    icon: <Mail className="w-full h-full" strokeWidth={1.25} />,
  },
  sms: {
    id: 'sms',
    label: 'SMS alert',
    blurb: 'Someone gets a text when an enquiry lands, then opens the full message.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
  crm: {
    id: 'crm',
    label: 'CRM or job software',
    blurb: 'The enquiry creates or updates a record where you already work leads.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  },
  unsure: {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'Fine. We will pick the simplest route once we see your tools.',
    icon: null,
    unsure: true,
  },
}

/** Route cards change with channel scope. */
function enquiryRouteOptionsForChannels(channels: EnquiryChannelId | null) {
  if (channels === 'email') {
    return [
      {
        ...ENQUIRY_ROUTE_BY_ID.inbox,
        label: 'Same inbox, with auto-ack',
        blurb: 'Acknowledgement fires, and the real email stays in the inbox you already use.',
      },
      ENQUIRY_ROUTE_BY_ID.sms,
      ENQUIRY_ROUTE_BY_ID.crm,
      ENQUIRY_ROUTE_BY_ID.unsure,
    ]
  }
  if (channels === 'form') {
    return [
      {
        ...ENQUIRY_ROUTE_BY_ID.inbox,
        blurb: 'Form submissions land in one watched inbox, with the acknowledgement first.',
      },
      ENQUIRY_ROUTE_BY_ID.sms,
      ENQUIRY_ROUTE_BY_ID.crm,
      ENQUIRY_ROUTE_BY_ID.unsure,
    ]
  }
  if (channels === 'both-plus') {
    return [
      {
        ...ENQUIRY_ROUTE_BY_ID.inbox,
        blurb: 'Every in-scope channel feeds one watched inbox after the acknowledgement.',
      },
      ENQUIRY_ROUTE_BY_ID.sms,
      ENQUIRY_ROUTE_BY_ID.crm,
      ENQUIRY_ROUTE_BY_ID.unsure,
    ]
  }
  return [
    ENQUIRY_ROUTE_BY_ID.inbox,
    ENQUIRY_ROUTE_BY_ID.sms,
    ENQUIRY_ROUTE_BY_ID.crm,
    ENQUIRY_ROUTE_BY_ID.unsure,
  ]
}

/** Access path depends on channels and where the real message should land. */
function enquiryAccessOptionsFor(
  channels: EnquiryChannelId | null,
  route: EnquiryRouteId | null,
) {
  const formProvider = {
    ...CRM_ACCESS_BY_ID['form-provider'],
    label: 'Form / email tool',
    blurb: 'Login or invite for the form builder, mailbox, or tool that catches enquiries today.',
  }
  const emailProvider = {
    ...CRM_ACCESS_BY_ID['form-provider'],
    label: 'Email inbox access',
    blurb: 'The mailbox people write to, or the filter that catches enquiries today.',
  }
  const crm = {
    id: 'crm' as AccessPathId,
    label: 'CRM invite',
    blurb: 'Invite us into the CRM or job software where leads should land.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  }
  const call = {
    ...CRM_ACCESS_BY_ID.call,
    label: 'Quick call',
    blurb: 'We walk channel access and routing together. About five minutes.',
  }
  const smsTool = {
    id: 'provider' as AccessPathId,
    label: 'SMS tool access',
    blurb: 'The SMS or alert tool that should ping when an enquiry lands.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  }

  if (channels === 'unsure' || !channels) {
    return [call, formProvider]
  }

  if (route === 'crm') {
    if (channels === 'email') return [crm, call]
    return [formProvider, crm, call]
  }

  if (route === 'sms') {
    if (channels === 'email') return [emailProvider, smsTool, call]
    return [formProvider, smsTool, call]
  }

  if (channels === 'email') {
    return [emailProvider, call]
  }

  if (route === 'unsure') {
    return [call, formProvider]
  }

  return [formProvider, call]
}

const BOOKING_TOOL_OPTIONS: {
  id: BookingToolId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'hubspot',
    label: 'HubSpot Meetings',
    blurb: 'You already use HubSpot for meetings or want to.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'calendly',
    label: 'Calendly',
    blurb: 'Calendly is the tool, or the one you want.',
    icon: <Calendar className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'setmore',
    label: 'Setmore / similar',
    blurb: 'Setmore, SimplyBook, or another appointment tool.',
    icon: <LayoutTemplate className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'fresha',
    label: 'Fresha / salon tool',
    blurb: 'Fresha, Timely, or a salon or clinic booking app.',
    icon: <Sparkles className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'other',
    label: 'Something else',
    blurb: 'Tell us the name in the notes. We will work with it.',
    icon: <Code2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'none',
    label: 'Nothing yet',
    blurb: 'We pick the lightest fit and explain any monthly cost before we lock it in.',
    icon: null,
    unsure: true,
  },
]

const BOOKING_WHAT_OPTIONS: {
  id: BookingWhatId
  label: string
  blurb: string
  icon: React.ReactNode
}[] = [
  {
    id: 'appointments',
    label: 'In-person appointments',
    blurb: 'Clinic visits, site visits, or face-to-face sessions.',
    icon: <Users className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'calls',
    label: 'Phone or video calls',
    blurb: 'Discovery calls, consults on Zoom, or phone slots.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'consults',
    label: 'Paid consults',
    blurb: 'Booked paid time, assessments, or quote sessions.',
    icon: <FileText className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'mixed',
    label: 'A mix',
    blurb: 'More than one type of booking on the same calendar.',
    icon: <LayoutTemplate className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'other',
    label: 'Something else',
    blurb: 'Describe it in the notes so we set the right rules.',
    icon: <Code2 className="w-full h-full" strokeWidth={1.25} />,
  },
]

const BOOKING_WHERE_OPTIONS: {
  id: BookingWhereId
  label: string
  blurb: string
  icon: React.ReactNode
}[] = [
  {
    id: 'both',
    label: 'Site and Google',
    blurb: 'Book now on the website and the Google Business Profile. The usual path.',
    icon: <Check className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'site',
    label: 'Website only',
    blurb: 'Button or embed on the site first. Google can wait.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'google',
    label: 'Google profile only',
    blurb: 'Book from Maps and the knowledge panel first.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'unsure',
    label: 'Not sure yet',
    blurb: 'We will recommend based on where people already find you.',
    icon: <Sparkles className="w-full h-full" strokeWidth={1.25} />,
  },
]

const BOOKING_ACCESS_BY_ID: Record<
  'invite' | 'wp-admin' | 'admin' | 'call',
  {
    id: AccessPathId
    label: string
    blurb: string
    icon: React.ReactNode
  }
> = {
  invite: {
    id: 'invite',
    label: 'Calendar share',
    blurb: 'Share your Google or Outlook calendar with us. No password sharing.',
    icon: <Calendar className="w-full h-full" strokeWidth={1.25} />,
  },
  'wp-admin': {
    id: 'wp-admin',
    label: 'Website access',
    blurb: 'Temporary site admin so we can place Book now where it belongs.',
    icon: <LayoutTemplate className="w-full h-full" strokeWidth={1.25} />,
  },
  admin: {
    id: 'admin',
    label: 'Google profile manager',
    blurb: 'Add us as a manager so we can turn booking on the listing.',
    icon: <Check className="w-full h-full" strokeWidth={1.25} />,
  },
  call: {
    id: 'call',
    label: 'Quick call',
    blurb: 'We walk through calendar, site, and Google access together.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
}

/** Booking: access cards follow where Book now will live. Site-only cannot need Google manager. */
function bookingAccessOptionsForWhere(
  where: BookingWhereId | null,
  tool: BookingToolId | null,
) {
  const calendar =
    tool === 'none'
      ? {
          ...BOOKING_ACCESS_BY_ID.invite,
          label: 'Calendar share first',
          blurb: 'Share the calendar we will book against. We pick the lightest booking tool after.',
        }
      : tool === 'hubspot' || tool === 'calendly' || tool === 'setmore' || tool === 'fresha'
        ? {
            ...BOOKING_ACCESS_BY_ID.invite,
            label: 'Tool + calendar',
            blurb: `Invite us into ${
              tool === 'hubspot'
                ? 'HubSpot'
                : tool === 'calendly'
                  ? 'Calendly'
                  : tool === 'setmore'
                    ? 'your booking tool'
                    : 'Fresha'
            } and share the calendar it uses.`,
          }
        : BOOKING_ACCESS_BY_ID.invite

  switch (where) {
    case 'site':
      return [calendar, BOOKING_ACCESS_BY_ID['wp-admin'], BOOKING_ACCESS_BY_ID.call]
    case 'google':
      return [calendar, BOOKING_ACCESS_BY_ID.admin, BOOKING_ACCESS_BY_ID.call]
    case 'both':
      return [
        calendar,
        BOOKING_ACCESS_BY_ID['wp-admin'],
        BOOKING_ACCESS_BY_ID.admin,
        BOOKING_ACCESS_BY_ID.call,
      ]
    case 'unsure':
    default:
      return [BOOKING_ACCESS_BY_ID.call, calendar, BOOKING_ACCESS_BY_ID['wp-admin']]
  }
}

/**
 * Front Door Bundle: Maps / review path plus Book now surfaces.
 * `invite` covers Google manager and calendar share in one card to avoid duplicate IDs.
 */
function frontDoorAccessOptions(
  status: ProfileStatusId | null,
  where: BookingWhereId | null,
  tool: BookingToolId | null,
  job: ReviewJobId | null,
) {
  const google = googleAccessOptionsForStatus(status).map((opt) => {
    if (opt.id === 'invite') {
      return {
        ...opt,
        label: 'Manager + calendar',
        blurb:
          'Add us as a Google Business Profile manager, and share the calendar Book now will use. No password sharing.',
      }
    }
    if (opt.id === 'call') {
      return {
        ...opt,
        blurb:
          'We walk Maps manager, the review ask path, and Book now access together. About ten minutes.',
      }
    }
    if (opt.id === 'claim') {
      return {
        ...opt,
        blurb: 'Nobody owns the listing yet. We claim it together, then wire reviews and Book now.',
      }
    }
    if (opt.id === 'recover') {
      return {
        ...opt,
        blurb:
          status === 'suspended'
            ? 'We open the suspension case with you. Profile, reviews, and Book now wait until Google allows work.'
            : 'We start Google recovery. Reviews and Book now wait until you control the listing.',
      }
    }
    return opt
  })

  const extras: typeof google = []
  if (status === 'claimed-me') {
    if (job === 'sms' || job === 'email') {
      extras.push({
        id: 'provider',
        label: 'SMS / email tool',
        blurb:
          'The tool that already texts or emails customers after a visit or job. We need it for the review ask.',
        icon: <Server className="w-full h-full" strokeWidth={1.25} />,
      })
    } else if (job === 'software') {
      extras.push({
        id: 'crm',
        label: 'Job software login',
        blurb:
          'CRM, job management, or booking tool where work gets marked done. That is the review trigger.',
        icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
      })
    } else if (job === 'unsure') {
      extras.push({
        id: 'provider',
        label: 'SMS / email tool',
        blurb: 'If reviews fire from a text or email tool, invite us there too.',
        icon: <Server className="w-full h-full" strokeWidth={1.25} />,
      })
    }
  }

  if (where === 'site' || where === 'both' || where === 'unsure' || !where) {
    extras.push({
      ...BOOKING_ACCESS_BY_ID['wp-admin'],
      blurb: 'Temporary site admin so we can place Book now where it belongs on the website.',
    })
  }
  if ((where === 'google' || where === 'both') && !google.some((o) => o.id === 'invite')) {
    extras.push({
      ...BOOKING_ACCESS_BY_ID.admin,
      blurb: 'Add us as a manager so we can turn booking on the listing.',
    })
  }

  const seen = new Set<string>()
  const merged: typeof google = []
  for (const opt of [...google, ...extras]) {
    if (seen.has(opt.id)) continue
    seen.add(opt.id)
    merged.push(opt)
  }
  const callOpt = {
    id: 'call' as AccessPathId,
    label: 'Quick access call',
    blurb:
      'We walk Maps manager, the review ask path, and Book now access together. About ten minutes.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  }
  return [...merged.filter((opt) => opt.id !== 'call'), callOpt]
}

const TEAM_FORMAT_OPTIONS = [
  {
    id: 'remote' as const,
    label: 'Remote',
    blurb: 'Half-day on video. Everyone on their own laptop.',
  },
  {
    id: 'onsite' as const,
    label: 'Face-to-face · Sydney',
    blurb: 'Same session, in person. We come to you in Sydney.',
  },
] as const

const TEAM_SIZE_OPTIONS = [
  {id: '2-4', label: '2 to 4 people', blurb: 'Small team. Plenty of hands-on time.'},
  {id: '5-8', label: '5 to 8 people', blurb: 'Sweet spot for one remote session.'},
  {id: '9-12', label: '9 to 12 people', blurb: 'Full room. Still one session.'},
  {id: '13+', label: '13 or more', blurb: 'We will split into two sessions. Tell us in notes.'},
] as const

const TEAM_TOOL_OPTIONS = [
  {id: 'chatgpt-personal', label: 'ChatGPT (personal)'},
  {id: 'chatgpt-team', label: 'ChatGPT Team / Business'},
  {id: 'copilot', label: 'Microsoft Copilot'},
  {id: 'gemini', label: 'Google Gemini'},
  {id: 'claude', label: 'Claude'},
  {id: 'perplexity', label: 'Perplexity'},
  {id: 'notion', label: 'Notion AI'},
  {id: 'grammarly', label: 'Grammarly'},
  {id: 'canva', label: 'Canva Magic Studio'},
  {id: 'm365', label: 'Microsoft 365'},
  {id: 'google-workspace', label: 'Google Workspace'},
  {id: 'slack', label: 'Slack / Teams chat'},
  {id: 'crm-ai', label: 'CRM with AI features'},
  {id: 'image-ai', label: 'Image AI (Midjourney, etc.)'},
  {id: 'all-of-these', label: 'A bit of everything'},
  {id: 'none', label: 'Almost nothing yet'},
] as const

const TEAM_TOOL_PICK_IDS = TEAM_TOOL_OPTIONS.map((o) => o.id).filter(
  (id) => id !== 'none' && id !== 'all-of-these',
)

const TEAM_TASK_OPTIONS = [
  {id: 'quotes', label: 'Quotes and proposals'},
  {id: 'follow-up', label: 'Client follow-up'},
  {id: 'email', label: 'Email drafting'},
  {id: 'reporting', label: 'Reporting and admin'},
  {id: 'research', label: 'Research'},
  {id: 'scheduling', label: 'Scheduling'},
  {id: 'content', label: 'Content / posts'},
  {id: 'support', label: 'Customer replies'},
] as const

const TEAM_SENSITIVE_OPTIONS = [
  {id: 'client-names', label: 'Client names'},
  {id: 'client-files', label: 'Client files / contracts'},
  {id: 'medical', label: 'Medical or health info'},
  {id: 'legal', label: 'Legal matters'},
  {id: 'payroll', label: 'Payroll / HR'},
  {id: 'financial', label: 'Financials / bank'},
  {id: 'passwords', label: 'Passwords / logins'},
  {id: 'unsure', label: 'Not sure yet · cover it all'},
] as const

const TEAM_TIMING_OPTIONS = [
  {id: 'mornings', label: 'Weekday mornings', blurb: 'Roughly 9am to 12pm AEST.'},
  {id: 'afternoons', label: 'Weekday afternoons', blurb: 'Roughly 1pm to 5pm AEST.'},
  {id: 'flexible', label: 'Flexible', blurb: 'We will find a half-day that works.'},
] as const

const CHANGE_ROLLOUT_OPTIONS = [
  {
    id: 'new-system',
    label: 'New system or AI tool',
    blurb: 'CRM, AI, rostering, accounts, ops software going live.',
  },
  {
    id: 'process',
    label: 'Process change on existing tools',
    blurb: 'Same stack, different way of working.',
  },
  {
    id: 'merger',
    label: 'Merger of two ways of working',
    blurb: 'Two systems or two teams becoming one.',
  },
  {
    id: 'restructure',
    label: 'Restructure with new tools',
    blurb: 'Roles shift and the software shifts with them.',
  },
  {id: 'other', label: 'Something else', blurb: 'Tell us in the notes at the end.'},
] as const

const CHANGE_PEOPLE_OPTIONS = [
  {id: 'under-20', label: 'Under 20 people', blurb: 'Tight group. Full pack still helps.'},
  {id: '20-50', label: '20 to 50 people', blurb: 'Sweet spot for a full pack.'},
  {id: '50-100', label: '50 to 100 people', blurb: 'Often needs more pieces, scoped on the call.'},
  {id: '100-plus', label: '100 or more', blurb: 'We scope waves. Tell us on the call.'},
] as const

const CHANGE_GOLIVE_OPTIONS = [
  {id: 'under-2w', label: 'Under 2 weeks', blurb: 'Tight. Partial pack still beats a slide deck.'},
  {id: '2-6w', label: '2 to 6 weeks', blurb: 'Ideal window. Build in parallel with final prep.'},
  {id: '6w-plus', label: '6 weeks or more', blurb: 'Room to do this properly.'},
  {id: 'past', label: 'Already live', blurb: 'We can still rescue adoption.'},
  {id: 'unset', label: 'Date not set', blurb: 'We scope around the date when you have it.'},
] as const

const CHANGE_AREA_OPTIONS = [
  {id: 'crm', label: 'CRM / sales'},
  {id: 'accounts', label: 'Accounts / finance'},
  {id: 'roster', label: 'Rostering / workforce'},
  {id: 'ops', label: 'Ops software'},
  {id: 'comms', label: 'Internal comms tools'},
  {id: 'brand', label: 'Brand / customer-facing'},
  {id: 'location', label: 'New site / location'},
  {id: 'other', label: 'Other'},
] as const

const CHANGE_TRAINING_OPTIONS = [
  {id: 'none', label: 'Nothing planned yet', blurb: 'Adoption is still a blank row.'},
  {id: 'one-session', label: 'One long session', blurb: 'The usual all-hands the week before.'},
  {id: 'some-docs', label: 'Some docs or videos', blurb: 'Pieces exist, not a full pack.'},
  {id: 'full-plan', label: 'A full training plan', blurb: 'We can arm what you already have.'},
] as const

const CHANGE_RISK_OPTIONS = [
  {id: 'half-miss', label: 'Half the team will miss the session', blurb: 'Jobs always win that week.'},
  {id: 'helpdesk', label: 'Help desk will flood', blurb: 'You can already see the tickets coming.'},
  {id: 'spreadsheet', label: 'Old spreadsheet will come back', blurb: 'Workarounds are already circling.'},
  {id: 'all-three', label: 'All of the above', blurb: 'That is exactly who this pack is for.'},
  {id: 'unsure', label: 'Not sure yet', blurb: 'We will pressure-test it on the call.'},
] as const

const CONTENT_CHANNEL_OPTIONS = [
  {id: 'linkedin', label: 'LinkedIn'},
  {id: 'instagram', label: 'Instagram'},
  {id: 'facebook', label: 'Facebook'},
  {id: 'youtube', label: 'YouTube'},
  {id: 'tiktok', label: 'TikTok'},
  {id: 'email', label: 'Email'},
  {id: 'blog', label: 'Blog'},
  {id: 'other', label: 'Other'},
] as const

const CONTENT_CHANNEL_URL_HINTS: Record<string, string> = {
  linkedin: 'linkedin.com/company/your-business',
  instagram: 'instagram.com/yourhandle',
  facebook: 'facebook.com/yourpage',
  youtube: 'youtube.com/@yourchannel',
  tiktok: 'tiktok.com/@yourhandle',
  email: 'Newsletter signup or list page URL',
  blog: 'yoursite.com/blog',
  other: 'Profile or feed URL',
}

const LAST_POST_OPTIONS = [
  {id: 'this-week', label: 'This week', blurb: 'You are posting right now.'},
  {id: 'this-month', label: 'This month', blurb: 'Something went out recently.'},
  {id: '1-3-months', label: '1–3 months ago', blurb: 'Quiet for a bit, still in the habit.'},
  {id: '3-6-months', label: '3–6 months ago', blurb: 'The feed has gone quiet.'},
  {id: '6-plus', label: '6+ months ago', blurb: 'Long enough that restarting feels hard.'},
  {
    id: 'never-sure',
    label: 'Not sure / never really posted',
    blurb: 'No clear last date, or it never stuck.',
  },
] as const

const HOUR_READY_OPTIONS = [
  {
    id: 'yes',
    label: 'Yes, one hour a month',
    blurb: 'You can protect that hour most months.',
  },
  {
    id: 'mostly',
    label: 'Mostly, some months are hard',
    blurb: 'Usually yes. Busy months slip.',
  },
  {
    id: 'not-yet',
    label: 'Not yet',
    blurb: 'The hour is the blocker. We talk through that on the call.',
  },
] as const

const CONTENT_GOAL_OPTIONS = [
  {
    id: 'stay-visible',
    label: 'Stay visibly alive online',
    blurb: 'Show up consistently so you do not look dormant.',
  },
  {
    id: 'leads',
    label: 'More enquiries from social',
    blurb: 'Content that pulls people toward a conversation.',
  },
  {
    id: 'hire',
    label: 'Attract hires',
    blurb: 'Look like a place good people want to join.',
  },
  {
    id: 'authority',
    label: 'Sound like the expert',
    blurb: 'Clear voice. People know what you stand for.',
  },
  {
    id: 'mixed',
    label: 'A mix of these',
    blurb: 'Visibility, leads, hiring, and authority together.',
  },
] as const

function isValidName(value: string): boolean {
  const t = value.trim()
  if (t.length < 2) return false
  if (!/[A-Za-z]/.test(t)) return false
  if (/^\d+$/.test(t)) return false
  return true
}

function isValidEmail(value: string): boolean {
  const t = value.trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)
}

function isValidWebsite(value: string): boolean {
  const t = value.trim().toLowerCase()
  if (t.length < 4) return false
  return /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i.test(t)
}

function onpageUrlLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function isValidOnpageUrls(value: string): boolean {
  const lines = onpageUrlLines(value)
  return lines.length >= 2 && lines.length <= 8
}

function schemaServiceLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function isValidSchemaServices(value: string): boolean {
  const lines = schemaServiceLines(value)
  return lines.length >= 1 && lines.length <= 3
}

function isValidBusiness(value: string): boolean {
  return value.trim().length >= 2
}

function isValidPhone(value: string): boolean {
  const clean = value.replace(/\s+/g, '')
  return /^(0[23478])\d{8}$/.test(clean)
}

type HelpBlock = {
  title: string
  body: string
  steps?: string[]
  links?: {label: string; href: string}[]
}

function helpForStep(
  step: StepId,
  opts?: {
    isAiPhone?: boolean
    isWhatsappSetup?: boolean
    isDmReply?: boolean
    isQuoteFollowup?: boolean
    isIntakeForms?: boolean
    isBundleClinic?: boolean
    isBundleSpeedNext?: boolean
    isBundleFrontDoor?: boolean
  },
): HelpBlock {
  switch (step) {
    case 'product':
      return {
        title: 'Which fix you bought',
        body: 'You are about to tell us what we need so we can start the job. First up: which product you paid for. If you landed here from checkout, this may already be filled in.',
      }
    case 'name':
      return {
        title: 'A short form, then we start',
        body: opts?.isWhatsappSetup
          ? 'A few plain questions about you and WhatsApp so we can begin. No tech degree needed. If a later step feels unclear, open Help again.'
          : opts?.isDmReply
            ? 'A few plain questions about you and your Meta DMs so we can begin. No tech degree needed. If a later step feels unclear, open Help again.'
          : opts?.isQuoteFollowup
            ? 'A few plain questions about you and your quote path so we can begin. No tech degree needed. If a later step feels unclear, open Help again.'
          : opts?.isIntakeForms
            ? 'A few plain questions about you and the intake path so we can begin. No tech degree needed. If a later step feels unclear, open Help again.'
          : opts?.isBundleClinic
            ? 'A few plain questions about you, your Google listing, and the clinic phone so we can begin. No tech degree needed. If a later step feels unclear, open Help again.'
          : opts?.isBundleSpeedNext
            ? 'A few plain questions about your site, which pages to rewrite, and how enquiries should be tracked. No tech degree needed. If a later step feels unclear, open Help again.'
          : opts?.isBundleFrontDoor
            ? 'A few plain questions about your Google listing, how reviews get asked, and how Book now should work. No tech degree needed. If a later step feels unclear, open Help again.'
          : 'You are on a short access form. A few plain questions about you and your site so we can begin as soon as we can. No tech degree needed. If a later step feels unclear, open Help again and we will walk you through it.',
        steps: opts?.isWhatsappSetup
          ? [
              'About you: name, email, business',
              'Your WhatsApp: number, how it runs today, what it should handle',
              'Access: the easiest way for us to set it up',
            ]
          : opts?.isDmReply
            ? [
                'About you: name, email, business',
                'Your DMs: which inboxes, what people ask',
                'Access: the easiest way into Meta',
              ]
          : opts?.isQuoteFollowup
            ? [
                'About you: name, email, business',
                'Your quotes: where they live, how follow-up works now',
                'Access: the easiest way into that tool',
              ]
          : opts?.isIntakeForms
            ? [
                'About you: name, email, business',
                'Your intake: where answers land, which fields matter',
                'Access: the easiest way into that destination',
              ]
          : opts?.isBundleClinic
            ? [
                'About you: name, email, business',
                'Your clinic: Google listing, phone for missed calls, how reviews get asked',
                'Access: Maps manager plus the missed-call path',
              ]
          : opts?.isBundleSpeedNext
            ? [
                'About you: name, email, business',
                'Your site: URL, platform, which pages, the main ask, tracking today',
                'Access: the easiest way into the site',
              ]
          : opts?.isBundleFrontDoor
            ? [
                'About you: name, email, business',
                'Your front door: Google listing, review ask path, calendar and Book now surfaces',
                'Access: Maps manager, calendar, and site if Book now lives there',
              ]
          : [
              'About you: name, email, business',
              'Your site: URL, what it runs on, where it lives',
              'Access: the easiest way for us to get in',
            ],
      }
    case 'email':
      return {
        title: 'Which email to use',
        body: 'Use the same email you used at checkout if you can. That helps us match your payment to this form. We only use it for this job and delivery updates.',
      }
    case 'business':
      return {
        title: 'Business name',
        body: 'The name on the website, the one customers know. Legal company name is fine too if that is what you use day to day.',
      }
    case 'phone':
      return opts?.isWhatsappSetup
        ? {
            title: 'Which number is on WhatsApp',
            body: 'The Australian number customers message on WhatsApp. Ten digits, usually a mobile.',
            steps: [
              'Use the public WhatsApp number, not a private staff line unless that is the public chat',
              'Include the leading 0',
            ],
          }
        : opts?.isBundleClinic
          ? {
              title: 'Which number we watch for missed calls',
              body: 'The Australian clinic line patients dial. When it rings out, we send the text-back. Ten digits, mobile or landline.',
              steps: [
                'Use the main booking number, not a private mobile unless that is the public line',
                'Include the leading 0',
              ],
            }
          : {
            title: 'Which number we watch',
            body: 'The Australian business number customers dial. Ten digits, mobile or landline.',
            steps: [
              'Use the main enquiry number, not a private mobile unless that is the public line',
              'Include the leading 0',
            ],
          }
    case 'whatsappStatus':
      return {
        title: 'How WhatsApp runs today',
        body: 'Personal app on one phone, WhatsApp Business already installed, or under Meta Business Manager. Not sure is fine.',
      }
    case 'dmPlatform':
      return {
        title: 'Which inboxes are in scope',
        body: 'Instagram, Facebook Page, or both. This locks the $1,100 scope at kickoff.',
      }
    case 'dmChannels':
      return {
        title: 'Which channels and what to answer',
        body: 'The questions people ask most in DMs, and who should take a handoff. A short list is enough.',
      }
    case 'quoteTool':
      return {
        title: 'Where quotes live today',
        body: 'HubSpot, Pipedrive, a spreadsheet, email, or another tool. This locks the pipeline we wire.',
      }
    case 'quoteTools':
      return {
        title: 'How follow-up works now',
        body: 'What happens after a quote goes out, and where the chase stalls. A short honest note is enough.',
      }
    case 'intakeDest':
      return {
        title: 'Where submissions should land',
        body: 'CRM, structured email, a spreadsheet, or another tool. This locks the destination we wire.',
      }
    case 'intakePurpose':
      return {
        title: 'What intake should capture',
        body: 'Purpose, key fields, and who reviews new submissions. A short list is enough.',
      }
    case 'phoneSetup':
      return {
        title: 'How the phone is set up',
        body: opts?.isAiPhone
          ? 'This tells us how calls reach the number the voice agent will cover. Hover a card, then Select. Not sure is fine.'
          : 'This tells us how missed calls show up today. Hover a card, then Select. Not sure is fine.',
      }
    case 'websiteUrl':
      return {
        title: 'Website URL',
        body: 'The live site people use to enquire. Skip if you do not have it handy. We can collect it after we audit what you send.',
      }
    case 'crmSystem':
      return {
        title: 'What catches leads today',
        body: 'CRM, spreadsheet, shared inbox, or nothing. We rescue what you have before we suggest replacing it.',
      }
    case 'leadSource':
      return {
        title: 'How leads arrive',
        body: 'Website form, phone, ads, social, or a mix. Pick the main path so we know where to wire alerts first.',
      }
    case 'crmGoal':
      return {
        title: 'What to fix first',
        body: 'Speed of reply, phone alerts, follow-up, quote chasing, missed calls, or the full rescue. This steers the build.',
      }
    case 'bookingTool':
      return {
        title: 'Which booking tool',
        body: 'What you already use, or nothing yet. We wire that tool to your calendar. We do not sell you software for its own sake.',
      }
    case 'bookingWhat':
      return {
        title: 'What people book',
        body: 'Appointments, calls, paid consults, or a mix. This sets the rules, duration, and reminder wording.',
      }
    case 'bookingWhere':
      return {
        title: 'Where Book now should live',
        body: 'Website, Google Business Profile, both, or we decide with you. Ready customers look in both places.',
      }
    case 'sessionFormat':
      return {
        title: 'Remote or face-to-face',
        body: 'Usually this is already set from what you paid. Confirm remote or Sydney face-to-face. The rest of the form is the same.',
      }
    case 'teamSize':
      return {
        title: 'How many people',
        body: 'Pick a band. Up to 12 works best in one session. Bigger teams split into two.',
      }
    case 'teamTools':
      return {
        title: 'Tools and AI today',
        body: 'Tap every option that fits, including unofficial personal accounts. Use “A bit of everything” if they bounce around tools. Almost nothing yet is fine. Type anything missing in the box below.',
      }
    case 'timeEaters':
      return {
        title: 'Time-hungry work',
        body: 'Tap the tasks that eat the most hours. We build the session around those.',
      }
    case 'sensitiveData':
      return {
        title: 'What never goes in a prompt',
        body: 'Tap anything that must stay out. This becomes part of the usage policy.',
      }
    case 'dateWindow':
      return {
        title: 'When can you run it',
        body: 'Scroll how many days out you need (minimum 14). Then pick mornings, afternoons, or flexible. We confirm a tentative day after we review.',
      }
    case 'rolloutType':
      return {
        title: 'What kind of rollout',
        body: 'Pick the closest match. This steers which pieces of the pack matter most.',
      }
    case 'peopleAffected':
      return {
        title: 'How many people',
        body: 'Rough band is enough. Bigger groups often need waves, scoped on the call.',
      }
    case 'goLiveWindow':
      return {
        title: 'When is go-live',
        body: 'Two to six weeks out is ideal. Later or already live still works.',
      }
    case 'changeAreas':
      return {
        title: 'What is changing',
        body: 'Tap every area that moves. Missing one? Type it below.',
      }
    case 'trainingPlan':
      return {
        title: 'Training today',
        body: 'What exists for adoption right now. Honest answers make the fixed price accurate.',
      }
    case 'riskSignal':
      return {
        title: 'Biggest adoption risk',
        body: 'Pick the risk you already feel. This is what the pack is built to prevent.',
      }
    case 'contentChannels':
      return {
        title: 'Which channels',
        body: 'Tap every channel you want in the system. As soon as you tap one, paste the profile or page link if you have it. Links are optional, but they stop us chasing the wrong accounts later.',
      }
    case 'lastPostWhen':
      return {
        title: 'When you last posted',
        body: 'Rough is fine. This tells us how cold the feed is today.',
      }
    case 'hourReady':
      return {
        title: 'One hour a month',
        body: 'The system needs about an hour of your time each month. Say how ready that feels.',
      }
    case 'contentGoal':
      return {
        title: 'What content should do',
        body: 'Pick the main outcome. Mixed is fine if you want more than one.',
      }
    case 'landingGoal':
      return {
        title: 'What the page should do',
        body: 'One main action. The page exists to finish one promise, not twelve.',
      }
    case 'landingAds':
      return {
        title: 'Where the clicks come from',
        body: 'This shapes tracking and whether we need an ad-account invite. Not live yet is fine.',
      }
    case 'landingOffer':
      return {
        title: 'The promise to repeat',
        body: 'Paste the ad copy, the offer, or the one sentence a visitor should believe. We write the page from that.',
        steps: [
          'Headline and main offer from the ad',
          'Any price, bonus, or deadline that matters',
          'Logo link or brand notes if you have them',
        ],
      }
    case 'landingTracking':
      return {
        title: 'Conversion tracking',
        body: 'Pixels and tags teach the ad platform what worked. Tell us what exists today.',
      }
    case 'conversionServiceA':
    case 'conversionServiceB':
      return {
        title: 'Which service pages',
        body: 'Home and contact are already in scope. Tell us the two service pages that matter most so we rewrite those as well.',
      }
    case 'conversionAsk':
      return {
        title: 'The one main action',
        body: 'Every rewritten page should point at the same next step. Pick the one that fits how you actually take enquiries.',
      }
    case 'conversionOffer':
      return {
        title: 'The one-line offer',
        body: 'The single sentence a visitor should believe after reading. We build the headlines and proof around this line.',
      }
    case 'onpageUrls':
      return {
        title: 'Which priority URLs',
        body: 'One URL or path per line. Up to eight. Home and main services first. This locks the scope so the job ends.',
      }
    case 'onpageQueries':
      return {
        title: 'What people should find these pages for',
        body: 'Services and suburbs people actually type, not guesses about search volume. A short honest list is enough.',
      }
    case 'schemaServices':
      return {
        title: 'Which services get FAQs',
        body: 'One service name or URL per line. Up to three. This locks the scope so the job ends.',
      }
    case 'schemaQuestions':
      return {
        title: 'What people ask you most',
        body: 'The questions that come by phone, email, or after hours. A short honest list is enough.',
      }
    case 'trackingStatus':
      return {
        title: 'What tracking you already have',
        body: 'GA4, Tag Manager, nothing, or not sure. Honest answers save time.',
      }
    case 'trackingActions':
      return {
        title: 'Which actions matter',
        body: 'Form submit, call click, book, and similar. Up to five primary conversions.',
      }
    case 'trackingDestinations':
      return {
        title: 'Where leads should land',
        body: 'The inbox or CRM that still gets watched. Up to three forms.',
      }
    case 'chatTopics':
      return {
        title: 'What people ask you most',
        body: 'Hours, services, suburbs, how to book. Up to twenty FAQs. A short honest list is enough.',
      }
    case 'chatHandoff':
      return {
        title: 'Where should handoff go',
        body: 'Email, SMS, or the inbox a human actually watches when the chat escalates.',
      }
    case 'mediaTargets':
      return {
        title: 'Which pages or folders',
        body: 'Up to eight pages, or two media folders. Paths or plain names are fine. This locks the $650 scope at kickoff.',
      }
    case 'a11yPages':
      return {
        title: 'Which pages matter most',
        body: 'Priority pages for the access pass. Paths or plain names are fine.',
      }
    case 'whatsappGoals':
      return {
        title: 'What should WhatsApp handle',
        body: 'Labels, quick replies, and how messages should route. A short list is enough.',
      }
    case 'noshowTools':
      return {
        title: 'Booking tool and reminder gaps',
        body: 'What you use today and where reminders fail.',
      }
    case 'inboxTools':
      return {
        title: 'Inbox and tools in play',
        body: 'Email or CRM, and what burns the most time.',
      }
    case 'sopJobs':
      return {
        title: 'Which jobs to turn into playbooks',
        body: 'Real repeating work the team does every week.',
      }
    case 'dashMetrics':
      return {
        title: 'Metrics you need on one screen',
        body: 'Leads, bookings, ads, reviews. What you check every week.',
      }
    case 'bundleNotes':
      return {
        title: opts?.isBundleClinic
          ? 'Anything about this clinic location'
          : 'Scope notes for this bundle',
        body: opts?.isBundleClinic
          ? 'One location is in scope. Note opening hours quirks, multiple lines, or anything that would trip the review ask or text-back.'
          : 'Location, quirks, and anything we should know before kickoff.',
      }
    case 'geoTopics':
      return {
        title: 'Topics AI should know you for',
        body: 'Services, suburbs, and proof points tools should cite.',
      }
    case 'finderIcp':
      return {
        title: 'Who you want to find',
        body: 'Ideal customer, geography, and who to exclude.',
      }
    case 'website':
      return {
        title: 'Which site we are fixing',
        body: 'Paste the main website URL for this job.',
        steps: [
          'Include https:// if you have it',
          'Use the live public site, not a staging link, unless that is what we should work on',
        ],
      }
    case 'platform':
      return {
        title: 'What runs the site',
        body: 'This is the system behind the site (WordPress, Shopify, Wix, and so on). Hover a card to read a short plain explanation, then press Select. If you are not sure, pick Not sure. We can work it out.',
        steps: [
          'Open your site in a browser',
          'Scroll to the footer. Many WordPress sites say "Powered by WordPress"',
          'Or open Help links below for a quick check',
        ],
        links: [
          {
            label: 'How to tell if a site is WordPress',
            href: 'https://www.wpbeginner.com/beginners-guide/how-to-know-if-a-website-is-wordpress/',
          },
        ],
      }
    case 'provider':
      return {
        title: 'Domain vs hosting',
        body: 'Two different things, often from the same company.',
        steps: [
          'Domain: the address people type (yourbusiness.com.au). You pay a registrar for that name each year.',
          'Hosting: where the site files live and get served from.',
          'Same company: one login usually covers both. Different companies: two logins.',
          'Not sure: pick that. We will sort it on a short call if needed.',
        ],
      }
    case 'domainProvider':
      return {
        title: 'Who holds the domain',
        body: 'This is who you pay for the domain name each year. Check the email where you get renewal notices, or look it up.',
        steps: [
          'Search your inbox for "domain renewal" or "dns"',
          'Or use the Whois lookup link below and enter your domain',
          'If nothing rings a bell, choose Other or Not sure',
        ],
        links: [{label: 'Whois lookup (see registrar)', href: 'https://who.is/'}],
      }
    case 'hostingProvider':
      return {
        title: 'Where the site is hosted',
        body: 'This is the company that serves the site. Shopify, Wix, and Squarespace usually host themselves. WordPress sites often use a separate host.',
        steps: [
          'Check invoices or emails for "hosting", "cPanel", or your host brand',
          'Ask whoever built the site if you have an agency or developer',
          'Not sure is fine. We can find it together',
        ],
      }
    case 'whoPublishes':
      return {
        title: 'Who hits publish',
        body: 'This is for after the listing is usable. If it still needs claim or recovery, we sort that first, then match the kit to whoever publishes.',
      }
    case 'enquiryChannels':
      return {
        title: 'Which channels get the first reply',
        body: 'Website forms and email are in the fixed price. One extra intake you already use can sit in the same job. Extra channels beyond that are quoted the same day.',
      }
    case 'enquiryRoute':
      return {
        title: 'Where the real message lands',
        body: 'The acknowledgement goes to the customer in seconds. The real enquiry should land in one place your team already watches: inbox, SMS alert, or CRM.',
      }
    case 'access':
      return {
        title: 'How we get in',
        body: opts?.isBundleClinic
          ? 'This bundle needs Google listing access and a path into the missed-call SMS setup. Pick the easiest option. A short call can cover both.'
          : opts?.isBundleFrontDoor
            ? 'This bundle needs Google listing access, the review ask path, and Book now access on the calendar and site or Maps. Pick the easiest option. A short call can cover it.'
          : 'Pick the easiest path for you. We never need more access than the job requires. Hover a card for a short explanation, then Select.',
        steps: opts?.isBundleClinic
          ? [
              'Manager invite: add us on Google Business Profile',
              'Claim or recover: if the listing is not yours yet',
              'Missed-call path: divert, VoIP, or CRM where calls land',
              'Quick call: we walk Maps and the phone path together',
            ]
          : opts?.isBundleFrontDoor
            ? [
                'Manager + calendar: Google manager invite and calendar share',
                'Claim or recover: if the listing is not yours yet',
                'Website access: if Book now lives on the site',
                'Quick call: we walk Maps, reviews, and Book now together',
              ]
          : [
              'Website admin: temporary admin user, or tell us how to request one',
              'Hosting panel: cPanel, Plesk, or your host dashboard',
              'Someone else: agency or developer. You introduce us',
              'Quick call: we walk through it together in about five minutes',
            ],
      }
    case 'accessDetail':
      return {
        title: 'Access notes',
        body: opts?.isBundleClinic
          ? 'Anything that helps us reach Maps manager and the missed-call path without a chase. Do not put passwords in this form if you would rather send them by email.'
          : opts?.isBundleFrontDoor
            ? 'Anything that helps us reach Maps manager, the review ask tool, and Book now without a chase. Do not put passwords in this form if you would rather send them by email.'
          : 'Anything that helps us log in without a chase. Do not put passwords in this form if you would rather send them by email.',
        steps: opts?.isBundleClinic
          ? [
              'Google account email that can add managers',
              'Carrier, VoIP, or SMS tool name if you know it',
              'Best times for a short call if you chose that path',
            ]
          : opts?.isBundleFrontDoor
            ? [
                'Google account email that can add managers',
                'Calendar email to share, and booking tool name if you have one',
                'Best times for a short call if you chose that path',
              ]
          : [
              'Login URL (for example yoursite.com.au/wp-admin)',
              'Who manages the site day to day',
              'Best times for a short call if you chose that path',
            ],
      }
    case 'notes':
      return {
        title: 'Anything else',
        body: 'Optional comment only. Staging quirks, part-time people, or a preference we should know. If the taps already cover it, leave blank and submit.',
      }
    default:
      return {
        title: 'Help',
        body: 'Reply to your payment email anytime. A human answers.',
      }
  }
}

/**
 * BOXT-style card:
 * Rest: big icon + title (card height holds the empty space)
 * Hover/selected: icon shrinks, blurb + Select fade into the freed space
 */
function SelectCard({
  selected,
  onSelect,
  title,
  blurb,
  icon,
  unsure,
}: {
  selected: boolean
  onSelect: () => void
  title: string
  blurb: string
  icon?: React.ReactNode
  unsure?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-selected={selected ? 'true' : undefined}
      className="group relative flex h-[300px] w-full flex-col items-center overflow-hidden rounded-2xl border border-dark/12 bg-white px-4 pt-8 pb-4 text-center shadow-[0_8px_24px_-18px_rgba(26,26,26,0.28)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#E21E3F] hover:shadow-[0_16px_40px_-20px_rgba(226,30,63,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21E3F] focus-visible:ring-offset-2 data-[selected=true]:border-[#E21E3F] data-[selected=true]:shadow-[0_16px_40px_-20px_rgba(226,30,63,0.35)]"
    >
      {/* Tall icon at rest → short on hover so copy fits underneath without jumping neighbours */}
      <div className="mb-5 flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center text-dark transition-all duration-300 ease-out group-hover:mb-2 group-hover:h-9 group-hover:w-9 group-hover:text-[#E21E3F] group-data-[selected=true]:mb-2 group-data-[selected=true]:h-9 group-data-[selected=true]:w-9 group-data-[selected=true]:text-[#E21E3F]">
        {unsure ? (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A1A1A] text-2xl text-[#FFF2EC] transition-all duration-300 group-hover:h-9 group-hover:w-9 group-hover:text-base group-data-[selected=true]:h-9 group-data-[selected=true]:w-9 group-data-[selected=true]:text-base">
            <span className="font-serif leading-none">?</span>
          </div>
        ) : (
          <div className="h-full w-full [&_svg]:h-full [&_svg]:w-full">{icon}</div>
        )}
      </div>

      <div className="shrink-0 font-sans text-base font-semibold leading-snug text-dark transition-colors duration-300 group-hover:text-[#E21E3F] group-data-[selected=true]:text-[#E21E3F]">
        {title}
      </div>

      <div className="mt-0 flex max-h-0 w-full flex-1 flex-col overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100 group-data-[selected=true]:mt-3 group-data-[selected=true]:max-h-40 group-data-[selected=true]:opacity-100">
        <p className="flex-1 px-0.5 font-sans text-[13px] leading-relaxed text-dark/55">{blurb}</p>
        <span
          className="mt-3 flex w-full shrink-0 items-center justify-center rounded-lg py-2.5 font-sans text-sm font-semibold text-white"
          style={{backgroundColor: RED}}
        >
          Select
        </span>
      </div>
    </button>
  )
}

/**
 * Stage bar: black track, cream fill grows with progress.
 * Back circle ~85% of pill height; hover only on that button.
 */
function StageJourney({
  phase,
  phases,
  canGoBack,
  onBack,
  onHelp,
}: {
  phase: PhaseId
  phases: typeof PHASES_SPEED
  canGoBack: boolean
  onBack: () => void
  onHelp: () => void
}) {
  const active = phaseIndex(phase, phases)
  const trackRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const [fillWidth, setFillWidth] = useState(120)

  const measure = useCallback(() => {
    const track = trackRef.current
    const end = endRef.current
    if (!track || !end) return
    const t = track.getBoundingClientRect()
    const e = end.getBoundingClientRect()
    setFillWidth(Math.max(96, e.right - t.left + 6))
  }, [])

  useLayoutEffect(() => {
    measure()
    const raf = requestAnimationFrame(measure)
    const t1 = window.setTimeout(measure, 50)
    const t2 = window.setTimeout(measure, 400)
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    if (trackRef.current) ro?.observe(trackRef.current)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.removeEventListener('resize', onResize)
      ro?.disconnect()
    }
  }, [measure, active, canGoBack, phases])

  return (
    <div
      ref={trackRef}
      className="relative flex h-12 w-full min-w-0 items-center rounded-full shadow-[0_4px_18px_-6px_rgba(26,26,26,0.28)] md:h-[52px]"
      style={{backgroundColor: INK}}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
        style={{width: fillWidth, backgroundColor: CREAM}}
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-w-0 flex-1 items-center gap-0 pl-1.5 pr-2 md:pl-2 md:pr-3">
        <div className="flex shrink-0 items-center gap-2 md:gap-2.5">
          {canGoBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-solid border-dark text-dark transition-colors duration-200 hover:bg-dark/10 active:bg-dark/15 md:h-[42px] md:w-[42px]"
              aria-label="Back"
              title="Back"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <span className="w-1 shrink-0" aria-hidden />
          )}

          <div className="shrink-0">
            <SysbiltLogo className="w-[92px] md:w-[108px]" />
          </div>
        </div>

        <nav
          className="flex min-w-0 flex-1 items-center gap-0 overflow-x-auto"
          aria-label="Progress"
        >
          {phases.map((p, i) => {
            const done = i < active
            const current = i === active
            const filled = i <= active
            return (
              <div
                key={p.id}
                ref={current ? endRef : undefined}
                className="shrink-0 whitespace-nowrap px-2.5 font-sans text-[12px] tracking-wide md:px-3.5 md:text-[13px]"
                style={{
                  color: filled ? INK : 'rgba(255,242,236,0.4)',
                  fontWeight: current || done ? 600 : 400,
                }}
              >
                {p.n}. {p.label}
              </div>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={onHelp}
          className="ml-2 inline-flex shrink-0 items-center gap-2 font-sans text-[13px] text-cream/55 transition-colors hover:text-cream"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-cream/40 text-cream/70 transition-colors hover:border-cream/80 hover:bg-white/10 hover:text-cream md:h-[42px] md:w-[42px]">
            <span className="text-[15px] font-medium leading-none">?</span>
          </span>
          <span className="hidden sm:inline">Help</span>
        </button>
      </div>
    </div>
  )
}

const inputClass =
  'w-full max-w-md mx-auto rounded-xl border border-dark/12 bg-white px-4 py-4 font-sans text-lg text-dark placeholder:text-dark/35 shadow-[0_8px_24px_-16px_rgba(26,26,26,0.28)] focus:outline-none focus:ring-2 focus:ring-[#E21E3F]/35 focus:border-[#E21E3F]'

const FunnelAccessPage: React.FC = () => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const prefilled = params.get('p')
  const initialProduct = isFunnelProductCode(prefilled) ? prefilled : null
  const modeParam = params.get('m')?.trim().toLowerCase()
  const initialSessionFormat: 'remote' | 'onsite' | null =
    modeParam === 'remote' || modeParam === 'onsite' ? modeParam : null

  // Hosted Website Plan has its own agreement → wizard path. Never run Speed Fix steps.
  useEffect(() => {
    if (prefilled === 'website' || prefilled === 'website-hook') {
      const tier = params.get('tier')
      navigate(
        tier && (tier === 'brochure' || tier === 'practice' || tier === 'full')
          ? `/go/website/wizard?tier=${tier}`
          : '/go/website',
        {replace: true},
      )
    }
  }, [navigate, params, prefilled])

  const [step, setStep] = useState<StepId>('product')
  const [product, setProduct] = useState<FunnelProductCode | null>(
    prefilled === 'website' || prefilled === 'website-hook' ? null : initialProduct,
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [business, setBusiness] = useState('')
  const [website, setWebsite] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneSetup, setPhoneSetup] = useState<PhoneSetupId | null>(null)
  const [whatsappStatus, setWhatsappStatus] = useState<WhatsappStatusId | null>(null)
  const [dmPlatform, setDmPlatform] = useState<DmPlatformId | null>(null)
  const [quoteTool, setQuoteTool] = useState<QuoteToolId | null>(null)
  const [intakeDest, setIntakeDest] = useState<IntakeDestId | null>(null)
  const [profileUrl, setProfileUrl] = useState('')
  const [profileStatus, setProfileStatus] = useState<ProfileStatusId | null>(null)
  const [reviewJob, setReviewJob] = useState<ReviewJobId | null>(null)
  const [whoPublishes, setWhoPublishes] = useState<WhoPublishesId | null>(null)
  const [enquiryChannels, setEnquiryChannels] = useState<EnquiryChannelId | null>(null)
  const [enquiryRoute, setEnquiryRoute] = useState<EnquiryRouteId | null>(null)
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [crmSystem, setCrmSystem] = useState<CrmSystemId | null>(null)
  const [leadSource, setLeadSource] = useState<CrmLeadSourceId | null>(null)
  const [crmGoal, setCrmGoal] = useState<CrmGoalId | null>(null)
  const [bookingTool, setBookingTool] = useState<BookingToolId | null>(null)
  const [bookingWhat, setBookingWhat] = useState<BookingWhatId | null>(null)
  const [bookingWhere, setBookingWhere] = useState<BookingWhereId | null>(null)
  const [landingGoal, setLandingGoal] = useState<LandingGoalId | null>(null)
  const [landingAds, setLandingAds] = useState<LandingAdsId | null>(null)
  const [landingOffer, setLandingOffer] = useState('')
  const [landingTracking, setLandingTracking] = useState<LandingTrackingId | null>(null)
  const [conversionServiceA, setConversionServiceA] = useState('')
  const [conversionServiceB, setConversionServiceB] = useState('')
  const [conversionAsk, setConversionAsk] = useState<ConversionAskId | null>(null)
  const [conversionOffer, setConversionOffer] = useState('')
  const [onpageUrls, setOnpageUrls] = useState('')
  const [onpageQueries, setOnpageQueries] = useState('')
  const [schemaServices, setSchemaServices] = useState('')
  const [schemaQuestions, setSchemaQuestions] = useState('')
  const [trackingStatus, setTrackingStatus] = useState<'ga4' | 'gtm' | 'none' | 'unsure' | null>(null)
  const [trackingActions, setTrackingActions] = useState('')
  const [trackingDestinations, setTrackingDestinations] = useState('')
  const [chatTopics, setChatTopics] = useState('')
  const [chatHandoff, setChatHandoff] = useState('')
  const [mediaTargets, setMediaTargets] = useState('')
  const [scopeText, setScopeText] = useState('')
  const [sessionFormat, setSessionFormat] = useState<'remote' | 'onsite' | null>(
    initialSessionFormat,
  )
  const [teamSize, setTeamSize] = useState('')
  const [teamTools, setTeamTools] = useState<string[]>([])
  const [teamToolsOther, setTeamToolsOther] = useState('')
  const [timeEaters, setTimeEaters] = useState<string[]>([])
  const [timeEatersOther, setTimeEatersOther] = useState('')
  const [sensitiveData, setSensitiveData] = useState<string[]>([])
  const [sensitiveOther, setSensitiveOther] = useState('')
  const [sessionDaysOut, setSessionDaysOut] = useState(21)
  const [sessionTiming, setSessionTiming] = useState<string | null>(null)
  const [rolloutType, setRolloutType] = useState('')
  const [peopleAffected, setPeopleAffected] = useState('')
  const [goLiveWindow, setGoLiveWindow] = useState('')
  const [changeAreas, setChangeAreas] = useState<string[]>([])
  const [changeAreasOther, setChangeAreasOther] = useState('')
  const [trainingPlan, setTrainingPlan] = useState('')
  const [riskSignal, setRiskSignal] = useState('')
  const [contentChannels, setContentChannels] = useState<string[]>([])
  const [contentChannelsOther, setContentChannelsOther] = useState('')
  const [contentChannelUrls, setContentChannelUrls] = useState<Record<string, string>>({})
  const [lastPostWhen, setLastPostWhen] = useState('')
  const [hourReady, setHourReady] = useState('')
  const [contentGoal, setContentGoal] = useState('')
  const [platform, setPlatform] = useState<PlatformId | null>(null)
  const [sameProvider, setSameProvider] = useState<SameProviderId | null>(null)
  const [domainProvider, setDomainProvider] = useState('')
  const [hostingProvider, setHostingProvider] = useState('')
  const [accessPath, setAccessPath] = useState<AccessPathId | null>(null)
  const [accessDetail, setAccessDetail] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [helpOpen, setHelpOpen] = useState(false)

  const isMissedCall = product === 'missed-call'
  const isAiPhone = product === 'ai-phone'
  const isGoogleProfile = product === 'google-profile'
  const isProfilePosting = product === 'profile-posting'
  const isEnquiryReply = product === 'enquiry-reply'
  const isReviews = product === 'reviews'
  const isLocalPack = product === 'local-pack'
  const isCrmRescue = product === 'crm-rescue'
  const isBooking = product === 'booking'
  const isSearchFix = product === 'search-fix'
  const isLandingPage = product === 'landing-page'
  const isConversionPass = product === 'conversion-pass'
  const isOnpageSearch = product === 'onpage-search'
  const isSchemaFaq = product === 'schema-faq'
  const isTrackingForms = product === 'tracking-forms'
  const isSiteChat = product === 'site-chat'
  const isMediaClean = product === 'media-clean'
  const isA11yPass = product === 'a11y-pass'
  const isWhatsappSetup = product === 'whatsapp-setup'
  const isDmReply = product === 'dm-reply'
  const isQuoteFollowup = product === 'quote-followup'
  const isNoshowRescue = product === 'noshow-rescue'
  const isIntakeForms = product === 'intake-forms'
  const isInboxTriage = product === 'inbox-triage'
  const isSopPlaybook = product === 'sop-playbook'
  const isDashboardLite = product === 'dashboard-lite'
  const isBundleClinic = product === 'bundle-clinic'
  const isBundleSpeedNext = product === 'bundle-speed-next'
  const isBundleFrontDoor = product === 'bundle-front-door'
  const isGeo = product === 'geo'
  const isClientFinder = product === 'client-finder'
  const usesBatchWizard =
    isA11yPass ||
    isNoshowRescue ||
    isInboxTriage ||
    isSopPlaybook ||
    isDashboardLite ||
    isGeo ||
    isClientFinder
  const batchScopeField: StepId | null =
    isA11yPass
      ? 'a11yPages'
      : isNoshowRescue
        ? 'noshowTools'
        : isInboxTriage
          ? 'inboxTools'
          : isSopPlaybook
            ? 'sopJobs'
            : isDashboardLite
              ? 'dashMetrics'
              : isGeo
                ? 'geoTopics'
                : isClientFinder
                  ? 'finderIcp'
                  : null
  const isTeamAi = product === 'team-ai'
  const isChangePack = product === 'change-pack'
  const isContentSystem = product === 'content-system'
  const usesMissedWizard = isMissedCall || isAiPhone
  const usesGoogleWizard = isGoogleProfile
  const usesPostingWizard = isProfilePosting
  const usesEnquiryWizard = isEnquiryReply
  const usesReviewsWizard = isReviews
  const usesLocalPackWizard = isLocalPack
  const usesWhatsappWizard = isWhatsappSetup
  const usesDmWizard = isDmReply
  const usesQuoteWizard = isQuoteFollowup
  const usesIntakeWizard = isIntakeForms
  const usesClinicWizard = isBundleClinic
  const usesSpeedNextWizard = isBundleSpeedNext
  const usesFrontDoorWizard = isBundleFrontDoor
  const usesConversionWizard = isConversionPass
  const usesOnpageWizard = isOnpageSearch
  const usesSchemaFaqWizard = isSchemaFaq
  const usesTrackingFormsWizard = isTrackingForms
  const usesSiteChatWizard = isSiteChat
  const usesMediaCleanWizard = isMediaClean
  const productKind:
    | 'speed'
    | 'missed-call'
    | 'google-profile'
    | 'profile-posting'
    | 'enquiry-reply'
    | 'reviews'
    | 'local-pack'
    | 'crm-rescue'
    | 'booking'
    | 'landing-page'
    | 'conversion-pass'
    | 'onpage-search'
    | 'schema-faq'
    | 'tracking-forms'
    | 'site-chat'
    | 'media-clean'
    | 'a11y-pass'
    | 'whatsapp-setup'
    | 'dm-reply'
    | 'quote-followup'
    | 'noshow-rescue'
    | 'intake-forms'
    | 'inbox-triage'
    | 'sop-playbook'
    | 'dashboard-lite'
    | 'bundle-clinic'
    | 'bundle-speed-next'
    | 'bundle-front-door'
    | 'geo'
    | 'client-finder'
    | 'team-ai'
    | 'change-pack'
    | 'content-system' =
    usesMissedWizard
      ? 'missed-call'
      : usesGoogleWizard
        ? 'google-profile'
        : usesPostingWizard
          ? 'profile-posting'
          : usesEnquiryWizard
            ? 'enquiry-reply'
            : usesReviewsWizard
              ? 'reviews'
              : usesLocalPackWizard
                ? 'local-pack'
                : isCrmRescue
                ? 'crm-rescue'
                : isBooking
                  ? 'booking'
                  : isLandingPage
                    ? 'landing-page'
                    : usesConversionWizard
                      ? 'conversion-pass'
                      : usesSpeedNextWizard
                        ? 'bundle-speed-next'
                      : usesOnpageWizard
                        ? 'onpage-search'
                        : usesSchemaFaqWizard
                          ? 'schema-faq'
                          : usesTrackingFormsWizard
                            ? 'tracking-forms'
                          : usesSiteChatWizard
                            ? 'site-chat'
                          : usesMediaCleanWizard
                            ? 'media-clean'
                          : usesWhatsappWizard
                            ? 'whatsapp-setup'
                          : usesDmWizard
                            ? 'dm-reply'
                          : usesQuoteWizard
                            ? 'quote-followup'
                          : usesIntakeWizard
                            ? 'intake-forms'
                          : usesClinicWizard
                            ? 'bundle-clinic'
                          : usesFrontDoorWizard
                            ? 'bundle-front-door'
                          : usesBatchWizard && product
                            ? (product as typeof productKind)
                          : isTeamAi
                            ? 'team-ai'
                            : isChangePack
                              ? 'change-pack'
                              : isContentSystem
                                ? 'content-system'
                                : 'speed'
  const phases = usesMissedWizard
    ? PHASES_MISSED
    : usesGoogleWizard
      ? PHASES_GOOGLE
      : usesPostingWizard
        ? PHASES_POSTING
        : usesEnquiryWizard
          ? PHASES_ENQUIRY
          : usesReviewsWizard
            ? PHASES_REVIEWS
            : usesLocalPackWizard
              ? PHASES_LOCAL
              : isCrmRescue
              ? PHASES_CRM
              : isBooking
                ? PHASES_BOOKING
                : isLandingPage
                  ? PHASES_LANDING
                  : usesConversionWizard
                    ? PHASES_CONVERSION
                    : usesSpeedNextWizard
                      ? PHASES_SPEED_NEXT
                    : usesOnpageWizard
                      ? PHASES_ONPAGE
                      : usesSchemaFaqWizard
                        ? PHASES_SCHEMA_FAQ
                        : usesTrackingFormsWizard
                          ? PHASES_TRACKING_FORMS
                        : usesSiteChatWizard
                          ? PHASES_SITE_CHAT
                        : usesMediaCleanWizard
                          ? PHASES_MEDIA_CLEAN
                        : usesWhatsappWizard
                          ? PHASES_WHATSAPP
                        : usesDmWizard
                          ? PHASES_DM
                        : usesQuoteWizard
                          ? PHASES_QUOTE
                        : usesIntakeWizard
                          ? PHASES_INTAKE
                        : usesClinicWizard
                          ? PHASES_CLINIC_BUNDLE
                        : usesFrontDoorWizard
                          ? PHASES_FRONT_DOOR
                        : usesBatchWizard
                          ? PHASES_BATCH
                        : isTeamAi
                        ? PHASES_TEAM
                        : isChangePack
                          ? PHASES_CHANGE
                          : isContentSystem
                            ? PHASES_CONTENT
                            : PHASES_SPEED

  const stepOrder = useMemo((): StepId[] => {
    // Always show the product picker first so buyers see their purchase highlighted
    // and can still spot the other doors. ?p= only pre-selects.
    if (usesMissedWizard) {
      return [
        'product',
        'name',
        'email',
        'business',
        'phone',
        'phoneSetup',
        'access',
        'accessDetail',
        'notes',
        'done',
      ]
    }
    if (usesGoogleWizard) {
      return [
        'product',
        'name',
        'email',
        'business',
        'profileUrl',
        'profileStatus',
        'access',
        'accessDetail',
        'notes',
        'done',
      ]
    }
    if (usesPostingWizard) {
      const steps: StepId[] = [
        'product',
        'name',
        'email',
        'business',
        'profileUrl',
        'profileStatus',
      ]
      // Claimed: who publishes first, then access tailored to that.
      // Locked / foreign / unclaimed: access first, then who publishes once usable.
      if (profileStatus === 'claimed-me') {
        steps.push('whoPublishes', 'access', 'accessDetail')
      } else if (
        profileStatus === 'unclaimed' ||
        profileStatus === 'claimed-other' ||
        profileStatus === 'suspended'
      ) {
        steps.push('access', 'accessDetail', 'whoPublishes')
      } else {
        // unsure, or not chosen yet: access first so we do not pretend they can invite
        steps.push('access', 'whoPublishes', 'accessDetail')
      }
      steps.push('notes', 'done')
      return steps
    }
    if (usesEnquiryWizard) {
      return [
        'product',
        'name',
        'email',
        'business',
        'websiteUrl',
        'enquiryChannels',
        'enquiryRoute',
        'access',
        'accessDetail',
        'notes',
        'done',
      ]
    }
    if (usesReviewsWizard) {
      const steps: StepId[] = [
        'product',
        'name',
        'email',
        'business',
        'profileUrl',
        'profileStatus',
      ]
      if (profileStatus === 'claimed-me') steps.push('reviewJob')
      steps.push('access', 'accessDetail', 'notes', 'done')
      return steps
    }
    if (usesLocalPackWizard) {
      const steps: StepId[] = [
        'product',
        'name',
        'email',
        'business',
        'profileUrl',
        'profileStatus',
      ]
      if (profileStatus === 'claimed-me') {
        steps.push('reviewJob', 'whoPublishes', 'access', 'accessDetail')
      } else {
        steps.push('access', 'accessDetail', 'whoPublishes')
      }
      steps.push('notes', 'done')
      return steps
    }
    if (isCrmRescue) {
      return [
        'product',
        'name',
        'email',
        'business',
        'websiteUrl',
        'crmSystem',
        'leadSource',
        'crmGoal',
        'access',
        'accessDetail',
        'notes',
        'done',
      ]
    }
    if (isBooking) {
      return [
        'product',
        'name',
        'email',
        'business',
        'bookingTool',
        'bookingWhat',
        'bookingWhere',
        'websiteUrl',
        'access',
        'accessDetail',
        'notes',
        'done',
      ]
    }
    if (isLandingPage) {
      const base: StepId[] = [
        'product',
        'name',
        'email',
        'business',
        'landingGoal',
        'landingAds',
        'landingOffer',
        'landingTracking',
        'website',
        'platform',
        'provider',
      ]
      if (sameProvider === 'no') {
        base.push('domainProvider', 'hostingProvider')
      }
      base.push('access', 'accessDetail', 'notes', 'done')
      return base
    }
    if (usesConversionWizard) {
      const base: StepId[] = [
        'product',
        'name',
        'email',
        'business',
        'website',
        'platform',
        'provider',
      ]
      if (sameProvider === 'no') {
        base.push('domainProvider', 'hostingProvider')
      }
      base.push(
        'conversionServiceA',
        'conversionServiceB',
        'conversionAsk',
        'conversionOffer',
        'access',
        'accessDetail',
        'notes',
        'done',
      )
      return base
    }
    if (usesSpeedNextWizard) {
      const base: StepId[] = [
        'product',
        'name',
        'email',
        'business',
        'website',
        'platform',
        'provider',
      ]
      if (sameProvider === 'no') {
        base.push('domainProvider', 'hostingProvider')
      }
      base.push(
        'conversionServiceA',
        'conversionServiceB',
        'conversionAsk',
        'conversionOffer',
        'trackingStatus',
        'trackingActions',
        'trackingDestinations',
        'access',
        'accessDetail',
        'notes',
        'done',
      )
      return base
    }
    if (usesOnpageWizard) {
      const base: StepId[] = [
        'product',
        'name',
        'email',
        'business',
        'website',
        'platform',
        'provider',
      ]
      if (sameProvider === 'no') {
        base.push('domainProvider', 'hostingProvider')
      }
      base.push('onpageUrls', 'onpageQueries', 'access', 'accessDetail', 'notes', 'done')
      return base
    }
    if (usesSchemaFaqWizard) {
      const base: StepId[] = [
        'product',
        'name',
        'email',
        'business',
        'website',
        'platform',
        'provider',
      ]
      if (sameProvider === 'no') {
        base.push('domainProvider', 'hostingProvider')
      }
      base.push('schemaServices', 'schemaQuestions', 'access', 'accessDetail', 'notes', 'done')
      return base
    }
    if (usesTrackingFormsWizard) {
      const base: StepId[] = [
        'product',
        'name',
        'email',
        'business',
        'website',
        'platform',
        'provider',
      ]
      if (sameProvider === 'no') {
        base.push('domainProvider', 'hostingProvider')
      }
      base.push('trackingStatus', 'trackingActions', 'trackingDestinations', 'access', 'accessDetail', 'notes', 'done')
      return base
    }
    if (usesSiteChatWizard) {
      const base: StepId[] = [
        'product',
        'name',
        'email',
        'business',
        'website',
        'platform',
        'provider',
      ]
      if (sameProvider === 'no') {
        base.push('domainProvider', 'hostingProvider')
      }
      base.push('chatTopics', 'chatHandoff', 'access', 'accessDetail', 'notes', 'done')
      return base
    }
    if (usesMediaCleanWizard) {
      const base: StepId[] = [
        'product',
        'name',
        'email',
        'business',
        'website',
        'platform',
        'provider',
      ]
      if (sameProvider === 'no') {
        base.push('domainProvider', 'hostingProvider')
      }
      base.push('mediaTargets', 'access', 'accessDetail', 'notes', 'done')
      return base
    }
    if (usesWhatsappWizard) {
      return [
        'product',
        'name',
        'email',
        'business',
        'phone',
        'whatsappStatus',
        'whatsappGoals',
        'access',
        'accessDetail',
        'notes',
        'done',
      ]
    }
    if (usesDmWizard) {
      return [
        'product',
        'name',
        'email',
        'business',
        'dmPlatform',
        'dmChannels',
        'access',
        'accessDetail',
        'notes',
        'done',
      ]
    }
    if (usesQuoteWizard) {
      return [
        'product',
        'name',
        'email',
        'business',
        'quoteTool',
        'quoteTools',
        'access',
        'accessDetail',
        'notes',
        'done',
      ]
    }
    if (usesIntakeWizard) {
      return [
        'product',
        'name',
        'email',
        'business',
        'intakeDest',
        'intakePurpose',
        'access',
        'accessDetail',
        'notes',
        'done',
      ]
    }
    if (usesClinicWizard) {
      const steps: StepId[] = [
        'product',
        'name',
        'email',
        'business',
        'profileUrl',
        'profileStatus',
        'phone',
        'phoneSetup',
      ]
      if (profileStatus === 'claimed-me') steps.push('reviewJob')
      steps.push('bundleNotes', 'access', 'accessDetail', 'notes', 'done')
      return steps
    }
    if (usesFrontDoorWizard) {
      const steps: StepId[] = [
        'product',
        'name',
        'email',
        'business',
        'profileUrl',
        'profileStatus',
      ]
      if (profileStatus === 'claimed-me') steps.push('reviewJob')
      steps.push(
        'bookingTool',
        'bookingWhat',
        'bookingWhere',
        'websiteUrl',
        'access',
        'accessDetail',
        'notes',
        'done',
      )
      return steps
    }
    if (usesBatchWizard && batchScopeField) {
      const base: StepId[] = [
        'product',
        'name',
        'email',
        'business',
        'website',
        'platform',
        'provider',
      ]
      if (sameProvider === 'no') {
        base.push('domainProvider', 'hostingProvider')
      }
      base.push(batchScopeField, 'access', 'accessDetail', 'notes', 'done')
      return base
    }
    if (isTeamAi) {
      const teamSteps: StepId[] = [
        'product',
        'name',
        'email',
        'business',
      ]
      if (!initialSessionFormat) teamSteps.push('sessionFormat')
      teamSteps.push(
        'teamSize',
        'teamTools',
        'timeEaters',
        'sensitiveData',
        'dateWindow',
        'notes',
        'done',
      )
      return teamSteps
    }
    if (isChangePack) {
      return [
        'product',
        'name',
        'email',
        'business',
        'rolloutType',
        'peopleAffected',
        'goLiveWindow',
        'changeAreas',
        'trainingPlan',
        'riskSignal',
        'notes',
        'done',
      ]
    }
    if (isContentSystem) {
      return [
        'product',
        'name',
        'email',
        'business',
        'contentChannels',
        'lastPostWhen',
        'hourReady',
        'contentGoal',
        'notes',
        'done',
      ]
    }
    const base: StepId[] = [
      'product',
      'name',
      'email',
      'business',
      'website',
      'platform',
      'provider',
    ]
    if (sameProvider === 'no') {
      base.push('domainProvider', 'hostingProvider')
    }
    base.push('access', 'accessDetail', 'notes', 'done')
    return base
  }, [
    sameProvider,
    isMissedCall,
    isAiPhone,
    isGoogleProfile,
    isProfilePosting,
    isEnquiryReply,
    isReviews,
    usesLocalPackWizard,
    profileStatus,
    isCrmRescue,
    isBooking,
    isLandingPage,
    usesConversionWizard,
    usesSpeedNextWizard,
    usesOnpageWizard,
    usesSchemaFaqWizard,
    usesTrackingFormsWizard,
    usesSiteChatWizard,
    usesMediaCleanWizard,
    usesWhatsappWizard,
    usesDmWizard,
    usesQuoteWizard,
    usesIntakeWizard,
    usesClinicWizard,
    usesFrontDoorWizard,
    usesBatchWizard,
    batchScopeField,
    isSearchFix,
    isTeamAi,
    isChangePack,
    isContentSystem,
    initialSessionFormat,
  ])

  const stepIndex = Math.max(0, stepOrder.indexOf(step))
  const lineProgress =
    step === 'done'
      ? 100
      : Math.round(((stepIndex + 1) / Math.max(stepOrder.length, 1)) * 100)

  const activePhase = phaseForStep(step, productKind)

  const firstStep: StepId = 'product'
  const help = helpForStep(step, {
    isAiPhone,
    isWhatsappSetup,
    isDmReply,
    isQuoteFollowup,
    isIntakeForms,
    isBundleClinic,
    isBundleSpeedNext,
    isBundleFrontDoor,
  })
  const liveProducts = useMemo(() => {
    const all = FUNNEL_PRODUCT_CATALOGUE.filter(
      (p) => p.status === 'live' && p.code !== 'website' && p.code !== 'website-hook',
    )
    if (!product) return all
    const selected = all.find((p) => p.code === product)
    if (!selected) return all
    return [selected, ...all.filter((p) => p.code !== product)]
  }, [product])
  const canGoBack = step !== 'done' && step !== firstStep
  const accessOptions = usesMissedWizard
    ? isAiPhone
      ? aiPhoneAccessOptionsForSetup(phoneSetup)
      : missedCallAccessOptionsForSetup(phoneSetup)
    : usesWhatsappWizard
      ? whatsappAccessOptionsForStatus(whatsappStatus)
      : usesDmWizard
        ? dmAccessOptionsForPlatform(dmPlatform)
      : usesQuoteWizard
        ? quoteAccessOptionsForTool(quoteTool)
      : usesIntakeWizard
        ? intakeAccessOptionsForDest(intakeDest)
      : usesClinicWizard
        ? clinicBundleAccessOptions(profileStatus, phoneSetup)
      : usesFrontDoorWizard
        ? frontDoorAccessOptions(profileStatus, bookingWhere, bookingTool, reviewJob)
      : usesPostingWizard
      ? postingAccessOptionsForStatus(profileStatus, whoPublishes)
      : usesEnquiryWizard
        ? enquiryAccessOptionsFor(enquiryChannels, enquiryRoute)
        : usesGoogleWizard
      ? googleAccessOptionsForStatus(profileStatus)
      : usesReviewsWizard
        ? reviewsAccessOptionsForStatus(profileStatus, reviewJob)
        : usesLocalPackWizard
          ? localPackAccessOptionsForStatus(profileStatus, whoPublishes, reviewJob)
          : isCrmRescue
          ? crmAccessOptionsForSystem(crmSystem)
          : isBooking
            ? bookingAccessOptionsForWhere(bookingWhere, bookingTool)
            : isLandingPage
              ? landingAccessOptionsForAds(landingAds, platform)
              : isSearchFix || isOnpageSearch
                ? searchAccessOptionsForPlatform(platform)
                : siteAccessOptionsForPlatform(platform)

  const postingWhoOptions = whoPublishesOptionsForStatus(profileStatus)
  const postingStatusOptions = usesPostingWizard
    ? POSTING_PROFILE_STATUS_OPTIONS
    : usesLocalPackWizard
      ? LOCAL_PACK_PROFILE_STATUS_OPTIONS
      : GOOGLE_PROFILE_STATUS_OPTIONS
  const enquiryRouteOptions = enquiryRouteOptionsForChannels(enquiryChannels)

  function goNext(from: StepId) {
    setError(null)
    const idx = stepOrder.indexOf(from)
    const next = stepOrder[idx + 1]
    if (next) setStep(next)
  }

  function goBack() {
    setError(null)
    const idx = stepOrder.indexOf(step)
    if (idx > 0) setStep(stepOrder[idx - 1])
  }

  async function submit() {
    if (!product) {
      setError('Something is missing. Use Back to check your answers.')
      return
    }
    if (!isTeamAi && !isChangePack && !isContentSystem && !accessPath) {
      setError('Something is missing. Use Back to check your answers.')
      return
    }
    if (usesMissedWizard) {
      if (!phoneSetup) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesWhatsappWizard) {
      if (!whatsappStatus || scopeText.trim().length < 8) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesDmWizard) {
      if (!dmPlatform || scopeText.trim().length < 8) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesQuoteWizard) {
      if (!quoteTool || scopeText.trim().length < 8) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesIntakeWizard) {
      if (!intakeDest || scopeText.trim().length < 8) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesClinicWizard) {
      if (
        profileUrl.trim().length < 3 ||
        !profileStatus ||
        !phoneSetup ||
        !isValidPhone(phone) ||
        scopeText.trim().length < 8
      ) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
      if (profileStatus === 'claimed-me' && !reviewJob) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesFrontDoorWizard) {
      if (
        profileUrl.trim().length < 3 ||
        !profileStatus ||
        !bookingTool ||
        !bookingWhat ||
        !bookingWhere
      ) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
      if (profileStatus === 'claimed-me' && !reviewJob) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesGoogleWizard) {
      if (!profileStatus) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesPostingWizard) {
      if (!profileStatus || !whoPublishes) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesEnquiryWizard) {
      if (!enquiryChannels || !enquiryRoute) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesReviewsWizard) {
      if (!profileStatus) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
      if (profileStatus === 'claimed-me' && !reviewJob) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesLocalPackWizard) {
      if (!profileStatus || !whoPublishes) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
      if (profileStatus === 'claimed-me' && !reviewJob) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (isCrmRescue) {
      if (!crmSystem || !leadSource || !crmGoal) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (isBooking) {
      if (!bookingTool || !bookingWhat || !bookingWhere) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (isLandingPage) {
      if (
        !landingGoal ||
        !landingAds ||
        landingOffer.trim().length < 8 ||
        !landingTracking ||
        !platform ||
        !sameProvider
      ) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesConversionWizard) {
      if (
        !isValidWebsite(website) ||
        !platform ||
        !sameProvider ||
        conversionServiceA.trim().length < 2 ||
        conversionServiceB.trim().length < 2 ||
        !conversionAsk ||
        conversionOffer.trim().length < 8
      ) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesSpeedNextWizard) {
      if (
        !isValidWebsite(website) ||
        !platform ||
        !sameProvider ||
        conversionServiceA.trim().length < 2 ||
        conversionServiceB.trim().length < 2 ||
        !conversionAsk ||
        conversionOffer.trim().length < 8 ||
        !trackingStatus ||
        trackingActions.trim().length < 8 ||
        trackingDestinations.trim().length < 8
      ) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesOnpageWizard) {
      if (
        !isValidWebsite(website) ||
        !platform ||
        !sameProvider ||
        !isValidOnpageUrls(onpageUrls) ||
        onpageQueries.trim().length < 8
      ) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesSchemaFaqWizard) {
      if (
        !isValidWebsite(website) ||
        !platform ||
        !sameProvider ||
        !isValidSchemaServices(schemaServices) ||
        schemaQuestions.trim().length < 8
      ) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesTrackingFormsWizard) {
      if (
        !isValidWebsite(website) ||
        !platform ||
        !sameProvider ||
        !trackingStatus ||
        trackingActions.trim().length < 8 ||
        trackingDestinations.trim().length < 8
      ) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesSiteChatWizard) {
      if (
        !isValidWebsite(website) ||
        !platform ||
        !sameProvider ||
        chatTopics.trim().length < 8 ||
        chatHandoff.trim().length < 8
      ) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesMediaCleanWizard) {
      if (
        !isValidWebsite(website) ||
        !platform ||
        !sameProvider ||
        mediaTargets.trim().length < 8
      ) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (usesBatchWizard) {
      if (
        !isValidWebsite(website) ||
        !platform ||
        !sameProvider ||
        scopeText.trim().length < 8
      ) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (isTeamAi) {
      const toolsOk = teamTools.length >= 1 || teamToolsOther.trim().length >= 2
      const tasksOk = timeEaters.length >= 1 || timeEatersOther.trim().length >= 2
      const sensitiveOk =
        sensitiveData.length >= 1 || sensitiveOther.trim().length >= 2
      if (
        !sessionFormat ||
        !teamSize ||
        !toolsOk ||
        !tasksOk ||
        !sensitiveOk ||
        !sessionTiming ||
        sessionDaysOut < 14
      ) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (isChangePack) {
      const areasOk = changeAreas.length >= 1 || changeAreasOther.trim().length >= 2
      if (
        !rolloutType ||
        !peopleAffected ||
        !goLiveWindow ||
        !areasOk ||
        !trainingPlan ||
        !riskSignal
      ) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (isContentSystem) {
      const channelsOk =
        contentChannels.length >= 1 || contentChannelsOther.trim().length >= 2
      if (!channelsOk || !lastPostWhen || !hourReady || !contentGoal) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (!platform || !sameProvider) {
      setError('Something is missing. Use Back to check your answers.')
      return
    }
    setSubmitting(true)
    setError(null)
    const payload: FunnelAccessPayload = usesMissedWizard
      ? {
          product,
          name: name.trim(),
          email: email.trim(),
          business: business.trim(),
          phone: phone.trim(),
          phoneSetup: phoneSetup!,
          accessPath,
          accessDetail: accessDetail.trim(),
          notes: notes.trim(),
        }
      : usesWhatsappWizard
        ? {
            product,
            name: name.trim(),
            email: email.trim(),
            business: business.trim(),
            phone: phone.trim(),
            whatsappStatus: whatsappStatus!,
            whatsappGoals: scopeText.trim(),
            accessPath,
            accessDetail: accessDetail.trim(),
            notes: notes.trim(),
          }
      : usesDmWizard
        ? {
            product,
            name: name.trim(),
            email: email.trim(),
            business: business.trim(),
            dmPlatform: dmPlatform!,
            dmChannels: scopeText.trim(),
            accessPath,
            accessDetail: accessDetail.trim(),
            notes: notes.trim(),
          }
      : usesQuoteWizard
        ? {
            product,
            name: name.trim(),
            email: email.trim(),
            business: business.trim(),
            quoteTool: quoteTool!,
            quoteTools: scopeText.trim(),
            accessPath,
            accessDetail: accessDetail.trim(),
            notes: notes.trim(),
          }
      : usesIntakeWizard
        ? {
            product,
            name: name.trim(),
            email: email.trim(),
            business: business.trim(),
            intakeDest: intakeDest!,
            intakePurpose: scopeText.trim(),
            accessPath,
            accessDetail: accessDetail.trim(),
            notes: notes.trim(),
          }
      : usesClinicWizard
        ? {
            product,
            name: name.trim(),
            email: email.trim(),
            business: business.trim(),
            profileUrl: profileUrl.trim(),
            profileStatus: profileStatus!,
            phone: phone.trim(),
            phoneSetup: phoneSetup!,
            reviewJob: profileStatus === 'claimed-me' ? reviewJob! : '',
            bundleNotes: scopeText.trim(),
            accessPath,
            accessDetail: accessDetail.trim(),
            notes: notes.trim(),
          }
      : usesFrontDoorWizard
        ? {
            product,
            name: name.trim(),
            email: email.trim(),
            business: business.trim(),
            profileUrl: profileUrl.trim(),
            profileStatus: profileStatus!,
            reviewJob: profileStatus === 'claimed-me' ? reviewJob! : '',
            bookingTool: bookingTool!,
            bookingWhat: bookingWhat!,
            bookingWhere: bookingWhere!,
            websiteUrl: websiteUrl.trim(),
            accessPath,
            accessDetail: accessDetail.trim(),
            notes: notes.trim(),
          }
      : usesGoogleWizard
        ? {
            product,
            name: name.trim(),
            email: email.trim(),
            business: business.trim(),
            profileUrl: profileUrl.trim(),
            profileStatus: profileStatus!,
            accessPath,
            accessDetail: accessDetail.trim(),
            notes: notes.trim(),
          }
        : usesPostingWizard
          ? {
              product,
              name: name.trim(),
              email: email.trim(),
              business: business.trim(),
              profileUrl: profileUrl.trim(),
              profileStatus: profileStatus!,
              whoPublishes: whoPublishes!,
              accessPath,
              accessDetail: accessDetail.trim(),
              notes: notes.trim(),
            }
          : usesEnquiryWizard
            ? {
                product,
                name: name.trim(),
                email: email.trim(),
                business: business.trim(),
                websiteUrl: websiteUrl.trim(),
                enquiryChannels: enquiryChannels!,
                enquiryRoute: enquiryRoute!,
                accessPath,
                accessDetail: accessDetail.trim(),
                notes: notes.trim(),
              }
        : usesReviewsWizard
          ? {
              product,
              name: name.trim(),
              email: email.trim(),
              business: business.trim(),
              profileUrl: profileUrl.trim(),
              profileStatus: profileStatus!,
              reviewJob: profileStatus === 'claimed-me' ? reviewJob! : '',
              accessPath,
              accessDetail: accessDetail.trim(),
              notes: notes.trim(),
            }
          : usesLocalPackWizard
            ? {
                product,
                name: name.trim(),
                email: email.trim(),
                business: business.trim(),
                profileUrl: profileUrl.trim(),
                profileStatus: profileStatus!,
                reviewJob: profileStatus === 'claimed-me' ? reviewJob! : '',
                whoPublishes: whoPublishes!,
                accessPath,
                accessDetail: accessDetail.trim(),
                notes: notes.trim(),
              }
          : isCrmRescue
          ? {
              product,
              name: name.trim(),
              email: email.trim(),
              business: business.trim(),
              websiteUrl: websiteUrl.trim(),
              crmSystem: crmSystem!,
              leadSource: leadSource!,
              crmGoal: crmGoal!,
              accessPath,
              accessDetail: accessDetail.trim(),
              notes: notes.trim(),
            }
          : isLandingPage
            ? {
                product,
                name: name.trim(),
                email: email.trim(),
                business: business.trim(),
                landingGoal: landingGoal!,
                landingAds: landingAds!,
                landingOffer: landingOffer.trim(),
                landingTracking: landingTracking!,
                website: website.trim(),
                platform: platform!,
                sameProvider: sameProvider!,
                domainProvider: domainProvider.trim(),
                hostingProvider: hostingProvider.trim(),
                accessPath,
                accessDetail: accessDetail.trim(),
                notes: notes.trim(),
              }
          : isBooking
            ? {
                product,
                name: name.trim(),
                email: email.trim(),
                business: business.trim(),
                websiteUrl: websiteUrl.trim(),
                bookingTool: bookingTool!,
                bookingWhat: bookingWhat!,
                bookingWhere: bookingWhere!,
                accessPath,
                accessDetail: accessDetail.trim(),
                notes: notes.trim(),
              }
          : usesConversionWizard
            ? {
                product,
                name: name.trim(),
                email: email.trim(),
                business: business.trim(),
                website: website.trim(),
                platform: platform!,
                sameProvider: sameProvider!,
                domainProvider: domainProvider.trim(),
                hostingProvider: hostingProvider.trim(),
                conversionServiceA: conversionServiceA.trim(),
                conversionServiceB: conversionServiceB.trim(),
                conversionAsk: conversionAsk!,
                conversionOffer: conversionOffer.trim(),
                accessPath,
                accessDetail: accessDetail.trim(),
                notes: notes.trim(),
              }
          : usesSpeedNextWizard
            ? {
                product,
                name: name.trim(),
                email: email.trim(),
                business: business.trim(),
                website: website.trim(),
                platform: platform!,
                sameProvider: sameProvider!,
                domainProvider: domainProvider.trim(),
                hostingProvider: hostingProvider.trim(),
                conversionServiceA: conversionServiceA.trim(),
                conversionServiceB: conversionServiceB.trim(),
                conversionAsk: conversionAsk!,
                conversionOffer: conversionOffer.trim(),
                trackingStatus: trackingStatus!,
                trackingActions: trackingActions.trim(),
                trackingDestinations: trackingDestinations.trim(),
                accessPath,
                accessDetail: accessDetail.trim(),
                notes: notes.trim(),
              }
          : usesOnpageWizard
            ? {
                product,
                name: name.trim(),
                email: email.trim(),
                business: business.trim(),
                website: website.trim(),
                platform: platform!,
                sameProvider: sameProvider!,
                domainProvider: domainProvider.trim(),
                hostingProvider: hostingProvider.trim(),
                onpageUrls: onpageUrlLines(onpageUrls).join('\n'),
                onpageQueries: onpageQueries.trim(),
                accessPath,
                accessDetail: accessDetail.trim(),
                notes: notes.trim(),
              }
          : usesSchemaFaqWizard
            ? {
                product,
                name: name.trim(),
                email: email.trim(),
                business: business.trim(),
                website: website.trim(),
                platform: platform!,
                sameProvider: sameProvider!,
                domainProvider: domainProvider.trim(),
                hostingProvider: hostingProvider.trim(),
                schemaServices: schemaServiceLines(schemaServices).join('\n'),
                schemaQuestions: schemaQuestions.trim(),
                accessPath,
                accessDetail: accessDetail.trim(),
                notes: notes.trim(),
              }
          : usesTrackingFormsWizard
            ? {
                product,
                name: name.trim(),
                email: email.trim(),
                business: business.trim(),
                website: website.trim(),
                platform: platform!,
                sameProvider: sameProvider!,
                domainProvider: domainProvider.trim(),
                hostingProvider: hostingProvider.trim(),
                trackingStatus: trackingStatus!,
                trackingActions: trackingActions.trim(),
                trackingDestinations: trackingDestinations.trim(),
                accessPath,
                accessDetail: accessDetail.trim(),
                notes: notes.trim(),
              }
          : usesSiteChatWizard
            ? {
                product,
                name: name.trim(),
                email: email.trim(),
                business: business.trim(),
                website: website.trim(),
                platform: platform!,
                sameProvider: sameProvider!,
                domainProvider: domainProvider.trim(),
                hostingProvider: hostingProvider.trim(),
                chatTopics: chatTopics.trim(),
                chatHandoff: chatHandoff.trim(),
                accessPath,
                accessDetail: accessDetail.trim(),
                notes: notes.trim(),
              }
          : usesMediaCleanWizard
            ? {
                product,
                name: name.trim(),
                email: email.trim(),
                business: business.trim(),
                website: website.trim(),
                platform: platform!,
                sameProvider: sameProvider!,
                domainProvider: domainProvider.trim(),
                hostingProvider: hostingProvider.trim(),
                mediaTargets: mediaTargets.trim(),
                accessPath,
                accessDetail: accessDetail.trim(),
                notes: notes.trim(),
              }
          : usesBatchWizard && batchScopeField
            ? ({
                product,
                name: name.trim(),
                email: email.trim(),
                business: business.trim(),
                website: website.trim(),
                platform: platform!,
                sameProvider: sameProvider!,
                domainProvider: domainProvider.trim(),
                hostingProvider: hostingProvider.trim(),
                [batchScopeField]: scopeText.trim(),
                accessPath,
                accessDetail: accessDetail.trim(),
                notes: notes.trim(),
              } as FunnelAccessPayload)
            : isTeamAi
            ? {
                product,
                name: name.trim(),
                email: email.trim(),
                business: business.trim(),
                accessPath: 'call',
                accessDetail: '',
                notes: notes.trim(),
                sessionFormat: sessionFormat!,
                teamSize:
                  TEAM_SIZE_OPTIONS.find((o) => o.id === teamSize)?.label || teamSize,
                teamTools: (() => {
                  const labels = teamTools
                    .filter((id) => id !== 'all-of-these')
                    .map((id) => TEAM_TOOL_OPTIONS.find((o) => o.id === id)?.label || id)
                  if (teamTools.includes('all-of-these') && labels.length === 0) {
                    labels.push('A bit of everything')
                  }
                  if (teamToolsOther.trim()) labels.push(teamToolsOther.trim())
                  return labels.join(', ')
                })(),
                timeEaters: (() => {
                  const labels = timeEaters.map(
                    (id) => TEAM_TASK_OPTIONS.find((o) => o.id === id)?.label || id,
                  )
                  if (timeEatersOther.trim()) labels.push(timeEatersOther.trim())
                  return labels.join(', ')
                })(),
                sensitiveData: (() => {
                  const labels = sensitiveData.map(
                    (id) => TEAM_SENSITIVE_OPTIONS.find((o) => o.id === id)?.label || id,
                  )
                  if (sensitiveOther.trim()) labels.push(sensitiveOther.trim())
                  return labels.join(', ')
                })(),
                dateWindow: (() => {
                  const start = new Date()
                  start.setDate(start.getDate() + sessionDaysOut)
                  const dateLabel = start.toLocaleDateString('en-AU', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                  const timing =
                    TEAM_TIMING_OPTIONS.find((o) => o.id === sessionTiming)?.label ||
                    sessionTiming ||
                    'Flexible'
                  return `Earliest in ${sessionDaysOut} days (from ${dateLabel}). Prefer: ${timing}.`
                })(),
              }
            : isChangePack
              ? {
                  product,
                  name: name.trim(),
                  email: email.trim(),
                  business: business.trim(),
                  accessPath: 'call',
                  accessDetail: '',
                  notes: notes.trim(),
                  rolloutType:
                    CHANGE_ROLLOUT_OPTIONS.find((o) => o.id === rolloutType)?.label || rolloutType,
                  peopleAffected:
                    CHANGE_PEOPLE_OPTIONS.find((o) => o.id === peopleAffected)?.label ||
                    peopleAffected,
                  goLiveWindow:
                    CHANGE_GOLIVE_OPTIONS.find((o) => o.id === goLiveWindow)?.label || goLiveWindow,
                  changeAreas: (() => {
                    const labels = changeAreas.map(
                      (id) => CHANGE_AREA_OPTIONS.find((o) => o.id === id)?.label || id,
                    )
                    if (changeAreasOther.trim()) labels.push(changeAreasOther.trim())
                    return labels.join(', ')
                  })(),
                  trainingPlan:
                    CHANGE_TRAINING_OPTIONS.find((o) => o.id === trainingPlan)?.label ||
                    trainingPlan,
                  riskSignal:
                    CHANGE_RISK_OPTIONS.find((o) => o.id === riskSignal)?.label || riskSignal,
                }
              : isContentSystem
                ? {
                    product,
                    name: name.trim(),
                    email: email.trim(),
                    business: business.trim(),
                    accessPath: 'call',
                    accessDetail: '',
                    notes: notes.trim(),
                    contentChannels: (() => {
                      const labels = contentChannels.map(
                        (id) => CONTENT_CHANNEL_OPTIONS.find((o) => o.id === id)?.label || id,
                      )
                      if (contentChannelsOther.trim()) labels.push(contentChannelsOther.trim())
                      return labels.join(', ')
                    })(),
                    contentChannelLinks: (() => {
                      const rows: string[] = []
                      for (const id of contentChannels) {
                        if (id === 'other') {
                          const label = contentChannelsOther.trim() || 'Other'
                          const url = (contentChannelUrls.other || '').trim()
                          rows.push(url ? `${label}: ${url}` : `${label}: (no link yet)`)
                          continue
                        }
                        const label =
                          CONTENT_CHANNEL_OPTIONS.find((o) => o.id === id)?.label || id
                        const url = (contentChannelUrls[id] || '').trim()
                        rows.push(url ? `${label}: ${url}` : `${label}: (no link yet)`)
                      }
                      if (
                        contentChannelsOther.trim() &&
                        !contentChannels.includes('other')
                      ) {
                        const url = (contentChannelUrls.other || '').trim()
                        rows.push(
                          url
                            ? `${contentChannelsOther.trim()}: ${url}`
                            : `${contentChannelsOther.trim()}: (no link yet)`,
                        )
                      }
                      return rows.join('\n')
                    })(),
                    lastPostWhen:
                      LAST_POST_OPTIONS.find((o) => o.id === lastPostWhen)?.label || lastPostWhen,
                    hourReady:
                      HOUR_READY_OPTIONS.find((o) => o.id === hourReady)?.label || hourReady,
                    contentGoal:
                      CONTENT_GOAL_OPTIONS.find((o) => o.id === contentGoal)?.label || contentGoal,
                  }
            : {
                product,
                name: name.trim(),
                email: email.trim(),
                business: business.trim(),
                website: website.trim(),
                platform: platform!,
                sameProvider: sameProvider!,
                domainProvider: domainProvider.trim(),
                hostingProvider: hostingProvider.trim(),
                accessPath,
                accessDetail: accessDetail.trim(),
                notes: notes.trim(),
              }
    try {
      const res = await fetch('/api/funnel/access', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as {error?: string}
      if (!res.ok) {
        throw new Error(data.error || 'Could not submit. Try again or reply to your payment email.')
      }
      setStep('done')
      setHelpOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  function selectPhoneSetup(id: PhoneSetupId) {
    setPhoneSetup(id)
    setAccessPath(null)
    window.setTimeout(() => goNext('phoneSetup'), 200)
  }

  function selectWhatsappStatus(id: WhatsappStatusId) {
    setWhatsappStatus(id)
    setAccessPath(null)
    window.setTimeout(() => goNext('whatsappStatus'), 200)
  }

  function selectDmPlatform(id: DmPlatformId) {
    setDmPlatform(id)
    setAccessPath(null)
    window.setTimeout(() => goNext('dmPlatform'), 200)
  }

  function selectQuoteTool(id: QuoteToolId) {
    setQuoteTool(id)
    setAccessPath(null)
    window.setTimeout(() => goNext('quoteTool'), 200)
  }

  function selectIntakeDest(id: IntakeDestId) {
    setIntakeDest(id)
    setAccessPath(null)
    window.setTimeout(() => goNext('intakeDest'), 200)
  }

  function selectProfileStatus(id: ProfileStatusId) {
    setProfileStatus(id)
    setReviewJob(null)
    setWhoPublishes(null)
    setAccessPath(null)
    window.setTimeout(() => {
      // Branch from the id just chosen. Do not trust stepOrder from the previous render.
      if (usesPostingWizard) {
        setStep(id === 'claimed-me' ? 'whoPublishes' : 'access')
        return
      }
      if (usesReviewsWizard || usesLocalPackWizard) {
        setStep(id === 'claimed-me' ? 'reviewJob' : 'access')
        return
      }
      if (usesFrontDoorWizard) {
        setStep(id === 'claimed-me' ? 'reviewJob' : 'bookingTool')
        return
      }
      goNext('profileStatus')
    }, 200)
  }

  function selectWhoPublishes(id: WhoPublishesId) {
    setWhoPublishes(id)
    setAccessPath(null)
    window.setTimeout(() => {
      if (usesPostingWizard) {
        // claimed-me: access next. Other statuses ask whoPublishes after accessDetail → notes.
        if (profileStatus === 'claimed-me') {
          setStep('access')
          return
        }
        if (
          profileStatus === 'unclaimed' ||
          profileStatus === 'claimed-other' ||
          profileStatus === 'suspended'
        ) {
          setStep('notes')
          return
        }
        // unsure: access already done, accessDetail next
        setStep('accessDetail')
        return
      }
      if (usesLocalPackWizard) {
        // claimed-me: reviewJob already picked, access next. Other statuses ask
        // whoPublishes after accessDetail, so notes is next.
        setStep(profileStatus === 'claimed-me' ? 'access' : 'notes')
        return
      }
      goNext('whoPublishes')
    }, 200)
  }

  function selectEnquiryChannels(id: EnquiryChannelId) {
    setEnquiryChannels(id)
    setEnquiryRoute(null)
    setAccessPath(null)
    window.setTimeout(() => setStep('enquiryRoute'), 200)
  }

  function selectEnquiryRoute(id: EnquiryRouteId) {
    setEnquiryRoute(id)
    setAccessPath(null)
    window.setTimeout(() => setStep('access'), 200)
  }

  function selectReviewJob(id: ReviewJobId) {
    setReviewJob(id)
    setAccessPath(null)
    window.setTimeout(() => goNext('reviewJob'), 200)
  }

  function selectPlatform(id: PlatformId) {
    setPlatform(id)
    setAccessPath(null)
    window.setTimeout(() => goNext('platform'), 200)
  }

  function selectProvider(id: SameProviderId) {
    setSameProvider(id)
    window.setTimeout(() => {
      if (id === 'no') {
        setStep('domainProvider')
      } else if (usesConversionWizard || usesSpeedNextWizard) {
        setStep('conversionServiceA')
      } else if (usesOnpageWizard) {
        setStep('onpageUrls')
      } else if (usesSchemaFaqWizard) {
        setStep('schemaServices')
      } else if (usesTrackingFormsWizard) {
        setStep('trackingStatus')
      } else if (usesSiteChatWizard) {
        setStep('chatTopics')
      } else if (usesMediaCleanWizard) {
        setStep('mediaTargets')
      } else if (usesBatchWizard && batchScopeField) {
        setStep(batchScopeField)
      } else {
        setStep('access')
      }
    }, 200)
  }

  function selectAccess(id: AccessPathId) {
    setAccessPath(id)
    window.setTimeout(() => goNext('access'), 200)
  }

  return (
    <div
      className="min-h-screen font-sans selection:bg-dark selection:text-cream"
      style={{...FUNNEL_CSS_VARS, backgroundColor: GROUND, color: INK}}
    >
      <PageMeta
        title="Access form | SYSBILT"
        description="Tell us how to reach your site so we can start delivery."
        canonical={`${SITE_ORIGIN}/go/access`}
        robots="noindex, nofollow"
      />

      {/* Top progress line */}
      <div className="fixed top-0 inset-x-0 z-[60] h-1 bg-black/10">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{width: `${lineProgress}%`, backgroundColor: RED}}
        />
      </div>

      {/* Cream page header — floating cream pill like BOXT (not a dark track) */}
      <header
        className="sticky top-0 z-40 pt-[10px] pb-2 md:pt-3 md:pb-3"
        style={{backgroundColor: GROUND}}
      >
        <div className="mx-auto max-w-5xl px-3 md:px-6">
          <StageJourney
            phase={activePhase}
            phases={phases}
            canGoBack={canGoBack}
            onBack={goBack}
            onHelp={() => setHelpOpen(true)}
          />
        </div>
      </header>

      <AnimatePresence>
        {helpOpen ? (
          <>
            <m.button
              type="button"
              aria-label="Close help"
              className="fixed inset-0 z-[70] bg-dark/40"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setHelpOpen(false)}
            />
            <m.aside
              initial={{x: '100%'}}
              animate={{x: 0}}
              exit={{x: '100%'}}
              transition={{type: 'spring', stiffness: 320, damping: 34}}
              className="fixed right-0 top-0 bottom-0 z-[80] flex w-[min(100%,400px)] flex-col border-l border-dark/10 bg-white shadow-2xl"
            >
              <div
                className="flex items-center justify-between border-b border-white/10 px-5 py-4"
                style={{backgroundColor: INK}}
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Help
                  </p>
                  <p className="mt-0.5 font-sans text-sm text-cream">{help.title}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setHelpOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <p className="mb-5 font-sans text-[15px] leading-relaxed text-dark/75">{help.body}</p>
                {help.steps?.length ? (
                  <ol className="mb-6 list-decimal space-y-2.5 pl-5">
                    {help.steps.map((line) => (
                      <li key={line} className="font-sans text-[14px] leading-relaxed text-dark/70">
                        {line}
                      </li>
                    ))}
                  </ol>
                ) : null}
                {help.links?.length ? (
                  <ul className="mb-8 space-y-2">
                    {help.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-sans text-sm underline underline-offset-4"
                          style={{color: RED}}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="space-y-3 border-t border-dark/10 px-5 py-5" style={{backgroundColor: FUNNEL_COLOURS.surface}}>
                <p className="font-sans text-sm leading-relaxed text-dark/70">
                  Still stuck? Email us or book a short call. A human answers.
                </p>
                <a
                  href={HELP_EMAIL}
                  className="block w-full border border-dark py-3 text-center font-mono text-xs uppercase tracking-[0.16em] text-dark"
                >
                  Email hello@sysbilt.com
                </a>
                <a
                  href={SCHEDULER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-3 text-center font-mono text-xs uppercase tracking-[0.16em] text-white"
                  style={{backgroundColor: RED}}
                >
                  Request a call
                </a>
              </div>
            </m.aside>
          </>
        ) : null}
      </AnimatePresence>

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14 pb-24">
        <AnimatePresence mode="wait">
          <m.div
            key={step}
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -8}}
            transition={{duration: 0.25, ease: [0.22, 1, 0.36, 1]}}
            className="rounded-3xl border border-dark/[0.06] bg-white p-6 md:p-12 min-h-[460px] shadow-[0_24px_60px_-36px_rgba(26,26,26,0.35)]"
          >
            {product && step !== 'product' && step !== 'done' ? (
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/40 mb-4 text-center md:text-left">
                {FUNNEL_PRODUCT_LABELS[product]}
              </p>
            ) : null}

            {step === 'product' ? (
              <>
                <QuestionTitle>
                  Which <span style={{color: RED}}>fix</span> did you buy?
                </QuestionTitle>
                {initialProduct ? (
                  <p className="font-sans text-sm text-dark/55 text-center md:text-left mb-2">
                    We&apos;ve highlighted what you paid for. Confirm it, or pick a different door if
                    you meant another job.
                  </p>
                ) : null}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                  {liveProducts.map((p) => (
                    <div key={p.code}>
                      <SelectCard
                        selected={product === p.code}
                        onSelect={() => {
                          setProduct(p.code)
                          window.setTimeout(() => setStep('name'), 200)
                        }}
                        title={p.title}
                        blurb={p.blurb}
                      />
                    </div>
                  ))}
                </div>
                {product ? (
                  <div className="mt-8 flex justify-center md:justify-start">
                    <button
                      type="button"
                      onClick={() => goNext('product')}
                      className="rounded-full bg-[#E21E3F] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream shadow-[0_12px_28px_-12px_rgba(226,30,63,0.65)] transition hover:bg-[#c41935]"
                    >
                      Continue with {FUNNEL_PRODUCT_LABELS[product]}
                    </button>
                  </div>
                ) : null}
              </>
            ) : null}

            {step === 'name' ? (
              <OneField
                title="What is your name?"
                hint="So we know who to write to. First and last is ideal."
                value={name}
                onChange={setName}
                placeholder="First and last name"
                autoComplete="name"
                disabled={!isValidName(name)}
                onNext={() => goNext('name')}
              />
            ) : null}

            {step === 'email' ? (
              <OneField
                title="What is your email?"
                hint="Preferably the same email you used at checkout."
                value={email}
                onChange={setEmail}
                placeholder="you@business.com.au"
                type="email"
                autoComplete="email"
                disabled={!isValidEmail(email)}
                onNext={() => goNext('email')}
              />
            ) : null}

            {step === 'business' ? (
              <OneField
                title="What is the business name?"
                hint="The trading name customers know."
                value={business}
                onChange={setBusiness}
                placeholder="Trading name"
                autoComplete="organization"
                disabled={!isValidBusiness(business)}
                onNext={() => goNext('business')}
              />
            ) : null}

            {step === 'phone' ? (
              <OneField
                title={
                  usesWhatsappWizard
                    ? 'Which number is on WhatsApp?'
                    : usesClinicWizard
                      ? 'Which number should we watch for missed calls?'
                      : 'Which number should we watch?'
                }
                hint={
                  usesWhatsappWizard
                    ? 'The Australian number customers message. Ten digits.'
                    : usesClinicWizard
                      ? 'The clinic line patients dial. When it rings out, we send the text-back. Ten digits.'
                      : 'The Australian business line customers dial. Ten digits.'
                }
                value={phone}
                onChange={setPhone}
                placeholder="02 1234 5678 or 0412 345 678"
                type="tel"
                autoComplete="tel"
                disabled={!isValidPhone(phone)}
                onNext={() => goNext('phone')}
              />
            ) : null}

            {step === 'phoneSetup' ? (
              <>
                <QuestionTitle>
                  How is the <span style={{color: RED}}>phone</span> set up?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Hover a card, then Select. Not sure is fine.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {PHONE_SETUP_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={phoneSetup === opt.id}
                        onSelect={() => selectPhoneSetup(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'whatsappStatus' ? (
              <>
                <QuestionTitle>
                  How does <span style={{color: RED}}>WhatsApp</span> run today?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Hover a card, then Select. Not sure is fine.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {WHATSAPP_STATUS_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={whatsappStatus === opt.id}
                        onSelect={() => selectWhatsappStatus(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {usesWhatsappWizard && step === 'whatsappGoals' ? (
              <OneField
                title="What should WhatsApp handle"
                hint="Labels, quick replies, and how messages should route. A short list is enough."
                value={scopeText}
                onChange={setScopeText}
                placeholder={'e.g. New enquiries\nAfter-hours\nBooking link\nWho escalates'}
                multiline
                disabled={scopeText.trim().length < 8}
                onNext={() => goNext('whatsappGoals')}
              />
            ) : null}

            {step === 'dmPlatform' ? (
              <>
                <QuestionTitle>
                  Which <span style={{color: RED}}>inboxes</span> are in scope?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Hover a card, then Select. Not sure is fine.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {DM_PLATFORM_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={dmPlatform === opt.id}
                        onSelect={() => selectDmPlatform(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {usesDmWizard && step === 'dmChannels' ? (
              <OneField
                title="What should DMs answer"
                hint="The questions people ask most, and who takes a handoff. A short list is enough."
                value={scopeText}
                onChange={setScopeText}
                placeholder={'e.g. Hours, pricing ranges, how to book\nHandoff to owner for quotes'}
                multiline
                disabled={scopeText.trim().length < 8}
                onNext={() => goNext('dmChannels')}
              />
            ) : null}

            {step === 'quoteTool' ? (
              <>
                <QuestionTitle>
                  Where do <span style={{color: RED}}>quotes</span> live today?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Hover a card, then Select. Not sure is fine.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {QUOTE_TOOL_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={quoteTool === opt.id}
                        onSelect={() => selectQuoteTool(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {usesQuoteWizard && step === 'quoteTools' ? (
              <OneField
                title="How follow-up works now"
                hint="What happens after a quote goes out, and where the chase stalls. A short honest note is enough."
                value={scopeText}
                onChange={setScopeText}
                placeholder={'e.g. PDF by email, no chase\nStaff only nudge big jobs'}
                multiline
                disabled={scopeText.trim().length < 8}
                onNext={() => goNext('quoteTools')}
              />
            ) : null}

            {step === 'intakeDest' ? (
              <>
                <QuestionTitle>
                  Where should <span style={{color: RED}}>submissions</span> land?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Hover a card, then Select. Not sure is fine.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {INTAKE_DEST_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={intakeDest === opt.id}
                        onSelect={() => selectIntakeDest(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {usesIntakeWizard && step === 'intakePurpose' ? (
              <OneField
                title="What intake should capture"
                hint="Purpose, key fields, and who reviews new submissions. A short list is enough."
                value={scopeText}
                onChange={setScopeText}
                placeholder={'e.g. New patient form\nName, phone, reason for visit\nOwner reviews daily'}
                multiline
                disabled={scopeText.trim().length < 8}
                onNext={() => goNext('intakePurpose')}
              />
            ) : null}

            {step === 'profileUrl' ? (
              <OneField
                title="Where is the Google listing?"
                hint="Paste the Google Maps or Business Profile link, or type the exact name customers search."
                value={profileUrl}
                onChange={setProfileUrl}
                placeholder="maps.google.com/... or Your Business Sydney"
                disabled={profileUrl.trim().length < 3}
                onNext={() => goNext('profileUrl')}
              />
            ) : null}

            {step === 'profileStatus' ? (
              <>
                <QuestionTitle>
                  {usesPostingWizard ||
                  usesLocalPackWizard ||
                  usesClinicWizard ||
                  usesFrontDoorWizard ? (
                    <>
                      What is the <span style={{color: RED}}>listing</span> status?
                    </>
                  ) : (
                    <>
                      What is the <span style={{color: RED}}>profile</span> status?
                    </>
                  )}
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  {usesPostingWizard
                    ? 'This decides whether we claim, recover, or invite before the posting kit. Hover a card, then Select.'
                    : usesLocalPackWizard
                      ? 'This decides whether we claim, recover, or invite before the pack starts. Hover a card, then Select.'
                      : usesClinicWizard
                        ? 'This decides whether we claim, recover, or invite before we clean the listing and wire reviews. Hover a card, then Select.'
                      : usesFrontDoorWizard
                        ? 'This decides whether we claim, recover, or invite before profile clean-up, reviews, and Book now. Hover a card, then Select.'
                      : 'Hover a card, then Select. Not sure is fine.'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {postingStatusOptions.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={profileStatus === opt.id}
                        onSelect={() => selectProfileStatus(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'whoPublishes' ? (
              <>
                <QuestionTitle>
                  {profileStatus === 'unclaimed' ||
                  profileStatus === 'claimed-other' ||
                  profileStatus === 'suspended' ? (
                    <>
                      Once the listing is usable, who hits{' '}
                      <span style={{color: RED}}>publish</span>?
                    </>
                  ) : (
                    <>
                      Who will hit <span style={{color: RED}}>publish</span>?
                    </>
                  )}
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  {profileStatus === 'unclaimed'
                    ? 'Claim comes first. Tell us who will publish after that. Hover a card, then Select.'
                    : profileStatus === 'claimed-other'
                      ? 'Recovery comes first. Tell us who will publish after ownership is back. Hover a card, then Select.'
                      : profileStatus === 'suspended'
                        ? 'We assess the suspension first. Tell us who would publish if Google restores it. Hover a card, then Select.'
                        : profileStatus === 'unsure'
                          ? 'Best guess is fine. We match this to access once we see the listing. Hover a card, then Select.'
                          : 'This decides who needs the calendar and templates. Hover a card, then Select.'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {postingWhoOptions.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={whoPublishes === opt.id}
                        onSelect={() => selectWhoPublishes(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'reviewJob' ? (
              <>
                <QuestionTitle>
                  {usesClinicWizard || usesFrontDoorWizard ? (
                    <>
                      How do visits get marked <span style={{color: RED}}>done</span>?
                    </>
                  ) : (
                    <>
                      How do jobs get marked <span style={{color: RED}}>done</span>?
                    </>
                  )}
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  {usesClinicWizard || usesFrontDoorWizard
                    ? 'That is when the review ask should fire after a visit or job. Hover a card, then Select.'
                    : 'That is when the review ask should fire. Hover a card, then Select.'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {REVIEW_JOB_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={reviewJob === opt.id}
                        onSelect={() => selectReviewJob(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'websiteUrl' ? (
              <OneField
                title="What is the website URL?"
                hint={
                  usesEnquiryWizard
                    ? 'The site with the contact or quote form. Paste the homepage if you are not sure which page holds the form.'
                    : isBooking || usesFrontDoorWizard
                      ? 'Optional but helpful. The site where Book now should appear.'
                      : 'Optional but helpful. The site people use to enquire with you.'
                }
                value={websiteUrl}
                onChange={setWebsiteUrl}
                placeholder="https://yourbusiness.com.au"
                inputMode="url"
                disabled={false}
                onNext={() => goNext('websiteUrl')}
                nextLabel={websiteUrl.trim() ? 'Continue' : 'Skip for now'}
              />
            ) : null}

            {step === 'enquiryChannels' ? (
              <>
                <QuestionTitle>
                  Which channels should get the{' '}
                  <span style={{color: RED}}>first reply</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Fixed price covers website forms and email, plus one extra intake if you already use one. Hover a card, then Select.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {ENQUIRY_CHANNEL_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={enquiryChannels === opt.id}
                        onSelect={() => selectEnquiryChannels(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'enquiryRoute' ? (
              <>
                <QuestionTitle>
                  Where should the real message{' '}
                  <span style={{color: RED}}>land</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  {enquiryChannels === 'email'
                    ? 'Email is in scope. Pick where the team should see the real message after the acknowledgement.'
                    : enquiryChannels === 'form'
                      ? 'Form only. Pick where submissions should land after the acknowledgement.'
                      : enquiryChannels === 'both-plus'
                        ? 'Form, email, and one extra channel. Pick the place your team already watches.'
                        : enquiryChannels === 'unsure'
                          ? 'Best guess is fine. We will confirm once we map the channels.'
                          : 'The acknowledgement goes to the customer. The real enquiry goes here. Hover a card, then Select.'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {enquiryRouteOptions.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={enquiryRoute === opt.id}
                        onSelect={() => selectEnquiryRoute(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'crmSystem' ? (
              <>
                <QuestionTitle>
                  What catches leads <span style={{color: RED}}>today</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  CRM, inbox, spreadsheet, or nothing. Hover a card, then Select.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {CRM_SYSTEM_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={crmSystem === opt.id}
                        onSelect={() => {
                          setCrmSystem(opt.id)
                          setAccessPath(null)
                          goNext('crmSystem')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'leadSource' ? (
              <>
                <QuestionTitle>
                  How do leads <span style={{color: RED}}>usually</span> arrive?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Pick the main path. Mixed is fine.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {CRM_LEAD_SOURCE_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={leadSource === opt.id}
                        onSelect={() => {
                          setLeadSource(opt.id)
                          goNext('leadSource')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'crmGoal' ? (
              <>
                <QuestionTitle>
                  What should this rescue <span style={{color: RED}}>fix</span> first?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Pick the outcome that matters most. Full rescue covers the lot.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {CRM_GOAL_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={crmGoal === opt.id}
                        onSelect={() => {
                          setCrmGoal(opt.id)
                          goNext('crmGoal')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'landingGoal' ? (
              <>
                <QuestionTitle>
                  What should this page <span style={{color: RED}}>do</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  One main action. Hover a card, then Select.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {LANDING_GOAL_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={landingGoal === opt.id}
                        onSelect={() => {
                          setLandingGoal(opt.id)
                          goNext('landingGoal')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'landingAds' ? (
              <>
                <QuestionTitle>
                  Where are the <span style={{color: RED}}>clicks</span> coming from?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Live ads, or not live yet. This changes the access cards later.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {LANDING_ADS_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={landingAds === opt.id}
                        onSelect={() => {
                          setLandingAds(opt.id)
                          setAccessPath(null)
                          goNext('landingAds')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'landingOffer' ? (
              <OneField
                title="What promise should the page repeat?"
                hint="Paste the ad copy, the offer, or the one sentence a visitor should believe. Include price or deadline if it matters."
                value={landingOffer}
                onChange={setLandingOffer}
                placeholder="e.g. Free kitchen design consult this month · book online…"
                multiline
                disabled={landingOffer.trim().length < 8}
                onNext={() => goNext('landingOffer')}
              />
            ) : null}

            {step === 'landingTracking' ? (
              <>
                <QuestionTitle>
                  What tracking is on the site <span style={{color: RED}}>today</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Pixel, Google tag, both, or nothing. Not sure is fine.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {LANDING_TRACKING_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={landingTracking === opt.id}
                        onSelect={() => {
                          setLandingTracking(opt.id)
                          goNext('landingTracking')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'conversionServiceA' ? (
              <OneField
                title="First service page to rewrite"
                hint="Page name or URL. Home and contact are already included."
                value={conversionServiceA}
                onChange={setConversionServiceA}
                placeholder="e.g. Kitchen renovations, or /services/kitchens"
                disabled={conversionServiceA.trim().length < 2}
                onNext={() => goNext('conversionServiceA')}
              />
            ) : null}

            {step === 'conversionServiceB' ? (
              <OneField
                title="Second service page"
                hint="Page name or URL. Home and contact are already included."
                value={conversionServiceB}
                onChange={setConversionServiceB}
                placeholder="e.g. Bathroom renovations, or /services/bathrooms"
                disabled={conversionServiceB.trim().length < 2}
                onNext={() => goNext('conversionServiceB')}
              />
            ) : null}

            {step === 'conversionAsk' ? (
              <>
                <QuestionTitle>
                  What should visitors <span style={{color: RED}}>do</span> next?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  One main action across the rewritten pages. Hover a card, then Select.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 max-w-3xl">
                  {CONVERSION_ASK_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={conversionAsk === opt.id}
                        onSelect={() => {
                          setConversionAsk(opt.id)
                          goNext('conversionAsk')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'conversionOffer' ? (
              <OneField
                title="What is the one-line offer?"
                hint="The single sentence a visitor should believe after reading. Include price or deadline if it matters."
                value={conversionOffer}
                onChange={setConversionOffer}
                placeholder="e.g. Free kitchen design consult, fixed quote within 48 hours…"
                multiline
                disabled={conversionOffer.trim().length < 8}
                onNext={() => goNext('conversionOffer')}
              />
            ) : null}

            {step === 'onpageUrls' ? (
              <OneField
                title="Which priority URLs?"
                hint="One URL or path per line. Up to eight. Home and main services first."
                value={onpageUrls}
                onChange={setOnpageUrls}
                placeholder={'/\n/services/kitchens\n/services/bathrooms\n/contact'}
                multiline
                disabled={!isValidOnpageUrls(onpageUrls)}
                onNext={() => goNext('onpageUrls')}
              />
            ) : null}

            {step === 'onpageQueries' ? (
              <OneField
                title="What should these pages be findable for?"
                hint="Services and suburbs people actually type. A short list is fine."
                value={onpageQueries}
                onChange={setOnpageQueries}
                placeholder="e.g. kitchen renovations Parramatta, bathroom renovation cost…"
                multiline
                disabled={onpageQueries.trim().length < 8}
                onNext={() => goNext('onpageQueries')}
              />
            ) : null}

            {step === 'schemaServices' ? (
              <OneField
                title="Which services get FAQs?"
                hint="One service name or URL per line. Up to three. Home FAQs are not the focus unless a service lives there."
                value={schemaServices}
                onChange={setSchemaServices}
                placeholder={'Kitchen renovations\nBathroom renovations\n/services/kitchens'}
                multiline
                disabled={!isValidSchemaServices(schemaServices)}
                onNext={() => goNext('schemaServices')}
              />
            ) : null}

            {step === 'schemaQuestions' ? (
              <OneField
                title="What do people ask you most?"
                hint="The questions that come by phone, email, or after hours. A short list is fine."
                value={schemaQuestions}
                onChange={setSchemaQuestions}
                placeholder="e.g. How long does a kitchen renovation take? Do you offer fixed quotes?"
                multiline
                disabled={schemaQuestions.trim().length < 8}
                onNext={() => goNext('schemaQuestions')}
              />
            ) : null}

            {step === 'trackingStatus' ? (
              <>
                <QuestionTitle>
                  What tracking is on the site <span style={{color: RED}}>today</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  GA4, Tag Manager, nothing, or not sure. Honest answers save time.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {TRACKING_STATUS_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={trackingStatus === opt.id}
                        onSelect={() => {
                          setTrackingStatus(opt.id)
                          goNext('trackingStatus')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'trackingActions' ? (
              <OneField
                title="Which actions matter"
                hint="Form submit, call click, book, and similar. Up to five primary conversions."
                value={trackingActions}
                onChange={setTrackingActions}
                placeholder="e.g. Contact form submit, Call click, Book a consult"
                multiline
                disabled={trackingActions.trim().length < 8}
                onNext={() => goNext('trackingActions')}
              />
            ) : null}

            {step === 'trackingDestinations' ? (
              <OneField
                title="Where should leads land"
                hint="The inbox or CRM that still gets watched. Up to three forms."
                value={trackingDestinations}
                onChange={setTrackingDestinations}
                placeholder="e.g. hello@… inbox, HubSpot form, /contact form to sales@"
                multiline
                disabled={trackingDestinations.trim().length < 8}
                onNext={() => goNext('trackingDestinations')}
              />
            ) : null}

            {step === 'chatTopics' ? (
              <OneField
                title="What people ask you most"
                hint="Hours, services, suburbs, how to book. Up to twenty FAQs. A short honest list is enough."
                value={chatTopics}
                onChange={setChatTopics}
                placeholder="e.g. Are you open Saturdays? Do you cover the North Shore? How do we book?"
                multiline
                disabled={chatTopics.trim().length < 8}
                onNext={() => goNext('chatTopics')}
              />
            ) : null}

            {step === 'chatHandoff' ? (
              <OneField
                title="Where should handoff go"
                hint="Email, SMS, or the inbox a human actually watches when the chat escalates."
                value={chatHandoff}
                onChange={setChatHandoff}
                placeholder="e.g. SMS to 04…, or hello@… watched by the owner"
                multiline
                disabled={chatHandoff.trim().length < 8}
                onNext={() => goNext('chatHandoff')}
              />
            ) : null}

            {step === 'mediaTargets' ? (
              <OneField
                title="Which pages or folders"
                hint="One path or folder per line. Up to eight pages, or two media folders. This locks the $650 scope."
                value={mediaTargets}
                onChange={setMediaTargets}
                placeholder={'/\n/services/kitchens\n/gallery\nwp-content/uploads/2024'}
                multiline
                disabled={mediaTargets.trim().length < 8}
                onNext={() => goNext('mediaTargets')}
              />
            ) : null}

            {usesClinicWizard && step === 'bundleNotes' ? (
              <OneField
                title="Anything about this clinic location?"
                hint="One location is in scope. Note hours quirks, multiple lines, or anything that would trip the review ask or text-back."
                value={scopeText}
                onChange={setScopeText}
                placeholder={'e.g. One location in Bondi\nMain line on Maps, mobile for after hours\nReviews asked by SMS after checkout'}
                multiline
                disabled={scopeText.trim().length < 8}
                onNext={() => goNext('bundleNotes')}
              />
            ) : null}

            {usesBatchWizard && batchScopeField && step === batchScopeField ? (
              <OneField
                title={
                  batchScopeField === 'a11yPages'
                    ? 'Which pages matter most'
                    : batchScopeField === 'noshowTools'
                      ? 'Booking tool and reminder gaps'
                      : batchScopeField === 'inboxTools'
                        ? 'Inbox and tools in play'
                        : batchScopeField === 'sopJobs'
                          ? 'Which jobs to turn into playbooks'
                          : batchScopeField === 'dashMetrics'
                            ? 'Metrics you need on one screen'
                            : batchScopeField === 'geoTopics'
                              ? 'Topics AI should know you for'
                              : 'Who you want to find'
                }
                hint={
                  batchScopeField === 'a11yPages'
                    ? 'Priority pages for the access pass. Paths or plain names are fine.'
                    : batchScopeField === 'noshowTools'
                      ? 'What you use today and where reminders fail.'
                      : batchScopeField === 'inboxTools'
                        ? 'Email or CRM, and what burns the most time.'
                        : batchScopeField === 'sopJobs'
                          ? 'Real repeating work the team does every week.'
                          : batchScopeField === 'dashMetrics'
                            ? 'Leads, bookings, ads, reviews. What you check every week.'
                            : batchScopeField === 'geoTopics'
                              ? 'Services, suburbs, and proof points tools should cite.'
                              : 'Ideal customer, geography, and who to exclude.'
                }
                value={scopeText}
                onChange={setScopeText}
                placeholder={
                  batchScopeField === 'a11yPages'
                    ? '/\n/contact\n/book'
                    : batchScopeField === 'noshowTools'
                      ? 'e.g. Fresha, SMS day-before only'
                      : batchScopeField === 'inboxTools'
                        ? 'e.g. Gmail + HubSpot, quotes and referrals'
                        : batchScopeField === 'sopJobs'
                          ? 'e.g. Quote replies, onboarding checklist'
                          : batchScopeField === 'dashMetrics'
                            ? 'e.g. Weekly leads, booked jobs, ad spend'
                            : batchScopeField === 'geoTopics'
                              ? 'e.g. Kitchen reno, Inner West, 12 years'
                              : 'e.g. Clinic owners, Sydney, no chains'
                }
                multiline
                disabled={scopeText.trim().length < 8}
                onNext={() => goNext(batchScopeField)}
              />
            ) : null}


            {step === 'bookingTool' ? (
              <>
                <QuestionTitle>
                  Which booking tool do you <span style={{color: RED}}>use</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  What you already pay for, or nothing yet. Hover a card, then Select.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {BOOKING_TOOL_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={bookingTool === opt.id}
                        onSelect={() => {
                          setBookingTool(opt.id)
                          setAccessPath(null)
                          goNext('bookingTool')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'bookingWhat' ? (
              <>
                <QuestionTitle>
                  What should people <span style={{color: RED}}>book</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Appointments, calls, paid consults, or a mix. This sets the rules.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {BOOKING_WHAT_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={bookingWhat === opt.id}
                        onSelect={() => {
                          setBookingWhat(opt.id)
                          goNext('bookingWhat')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'bookingWhere' ? (
              <>
                <QuestionTitle>
                  Where should <span style={{color: RED}}>Book now</span> live?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Site, Google profile, both, or we decide with you.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {BOOKING_WHERE_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={bookingWhere === opt.id}
                        onSelect={() => {
                          setBookingWhere(opt.id)
                          setAccessPath(null)
                          goNext('bookingWhere')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'sessionFormat' ? (
              <>
                <QuestionTitle>
                  Remote or <span style={{color: RED}}>face-to-face</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Same half-day either way. Face-to-face is Sydney only.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-2xl">
                  {TEAM_FORMAT_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={sessionFormat === opt.id}
                        onSelect={() => {
                          setSessionFormat(opt.id)
                          goNext('sessionFormat')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={<Users className="w-full h-full" strokeWidth={1.25} />}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'teamSize' ? (
              <>
                <QuestionTitle>
                  How many people will <span style={{color: RED}}>join</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Tap a band. Up to 12 works best in one remote session.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {TEAM_SIZE_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={teamSize === opt.id}
                        onSelect={() => {
                          setTeamSize(opt.id)
                          goNext('teamSize')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={<Users className="w-full h-full" strokeWidth={1.25} />}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'teamTools' ? (
              <ChipPickStep
                title={
                  <>
                    Tools and AI you use <span style={{color: RED}}>today</span>
                  </>
                }
                hint="Tap every option that fits, including unofficial personal accounts. Missing one? Type it below. Then Continue."
                options={TEAM_TOOL_OPTIONS}
                selected={teamTools}
                onToggle={(id) => {
                  if (id === 'all-of-these') {
                    setTeamTools((prev) =>
                      prev.includes('all-of-these')
                        ? []
                        : ['all-of-these', ...TEAM_TOOL_PICK_IDS],
                    )
                    return
                  }
                  setTeamTools((prev) => {
                    const next = toggleExclusiveChip(prev, id, 'none')
                    return next.filter((x) => x !== 'all-of-these')
                  })
                }}
                otherValue={teamToolsOther}
                onOtherChange={setTeamToolsOther}
                otherPlaceholder="e.g. Jasper, fireflies.ai, a custom GPT…"
                otherHint="Something else, or almost nothing but a tool we missed"
                disabled={teamTools.length < 1 && teamToolsOther.trim().length < 2}
                onNext={() => goNext('teamTools')}
              />
            ) : null}

            {step === 'timeEaters' ? (
              <ChipPickStep
                title={
                  <>
                    What work eats the most <span style={{color: RED}}>hours</span>?
                  </>
                }
                hint="Tap the tasks that burn the most time. Missing one? Type it below."
                options={TEAM_TASK_OPTIONS}
                selected={timeEaters}
                onToggle={(id) => setTimeEaters((prev) => toggleChip(prev, id))}
                otherValue={timeEatersOther}
                onOtherChange={setTimeEatersOther}
                otherPlaceholder="e.g. job sheets, site visits write-ups…"
                otherHint="Another time sink we did not list"
                disabled={timeEaters.length < 1 && timeEatersOther.trim().length < 2}
                onNext={() => goNext('timeEaters')}
              />
            ) : null}

            {step === 'sensitiveData' ? (
              <ChipPickStep
                title={
                  <>
                    What must never go in a <span style={{color: RED}}>prompt</span>?
                  </>
                }
                hint="Tap anything that stays out. Unsure is fine. Or type something specific below."
                options={TEAM_SENSITIVE_OPTIONS}
                selected={sensitiveData}
                onToggle={(id) =>
                  setSensitiveData((prev) => toggleExclusiveChip(prev, id, 'unsure'))
                }
                otherValue={sensitiveOther}
                onOtherChange={setSensitiveOther}
                otherPlaceholder="e.g. student records, supplier pricing…"
                otherHint="Anything else that must stay out"
                disabled={sensitiveData.length < 1 && sensitiveOther.trim().length < 2}
                onNext={() => goNext('sensitiveData')}
              />
            ) : null}

            {step === 'dateWindow' ? (
              <div className="max-w-2xl mx-auto text-center py-4">
                <QuestionTitle>
                  When can you run the <span style={{color: RED}}>session</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-8 leading-relaxed">
                  Scroll how many days out you need (minimum 14). Then pick mornings,
                  afternoons, or flexible. We confirm a tentative day after we review.
                </p>

                <DaysOutStepper
                  value={sessionDaysOut}
                  onChange={setSessionDaysOut}
                  min={14}
                  max={90}
                />

                <p className="mt-8 mb-4 font-sans text-sm font-semibold text-dark/70">
                  Prefer which part of the day?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 text-left">
                  {TEAM_TIMING_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={sessionTiming === opt.id}
                        onSelect={() => setSessionTiming(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={<Sparkles className="w-full h-full" strokeWidth={1.25} />}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    disabled={!sessionTiming || sessionDaysOut < 14}
                    onClick={() => goNext('dateWindow')}
                    className="inline-flex items-center gap-2 font-mono font-bold uppercase tracking-[0.16em] text-xs px-10 py-4 text-white disabled:opacity-40 transition-opacity"
                    style={{backgroundColor: INK}}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : null}

            {step === 'rolloutType' ? (
              <>
                <QuestionTitle>
                  What kind of <span style={{color: RED}}>rollout</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Pick the closest match. This steers which pieces of the pack matter most.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {CHANGE_ROLLOUT_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={rolloutType === opt.id}
                        onSelect={() => {
                          setRolloutType(opt.id)
                          goNext('rolloutType')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={<Sparkles className="w-full h-full" strokeWidth={1.25} />}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'peopleAffected' ? (
              <>
                <QuestionTitle>
                  How many people are <span style={{color: RED}}>affected</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Rough band is enough. Bigger groups often need waves, scoped on the call.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {CHANGE_PEOPLE_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={peopleAffected === opt.id}
                        onSelect={() => {
                          setPeopleAffected(opt.id)
                          goNext('peopleAffected')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={<Users className="w-full h-full" strokeWidth={1.25} />}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'goLiveWindow' ? (
              <>
                <QuestionTitle>
                  When is <span style={{color: RED}}>go-live</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Two to six weeks out is ideal. Later or already live still works.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {CHANGE_GOLIVE_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={goLiveWindow === opt.id}
                        onSelect={() => {
                          setGoLiveWindow(opt.id)
                          goNext('goLiveWindow')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={<Sparkles className="w-full h-full" strokeWidth={1.25} />}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'changeAreas' ? (
              <ChipPickStep
                title={
                  <>
                    What is <span style={{color: RED}}>changing</span>?
                  </>
                }
                hint="Tap every area that moves. Missing one? Type it below."
                options={CHANGE_AREA_OPTIONS}
                selected={changeAreas}
                onToggle={(id) => setChangeAreas((prev) => toggleChip(prev, id))}
                otherValue={changeAreasOther}
                onOtherChange={setChangeAreasOther}
                otherPlaceholder="e.g. warehouse scanners, customer portal…"
                otherHint="Another area we did not list"
                disabled={changeAreas.length < 1 && changeAreasOther.trim().length < 2}
                onNext={() => goNext('changeAreas')}
              />
            ) : null}

            {step === 'trainingPlan' ? (
              <>
                <QuestionTitle>
                  What training exists <span style={{color: RED}}>today</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Honest answers make the fixed price accurate.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {CHANGE_TRAINING_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={trainingPlan === opt.id}
                        onSelect={() => {
                          setTrainingPlan(opt.id)
                          goNext('trainingPlan')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={<Users className="w-full h-full" strokeWidth={1.25} />}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'riskSignal' ? (
              <>
                <QuestionTitle>
                  Biggest adoption <span style={{color: RED}}>risk</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Pick the risk you already feel. This is what the pack is built to prevent.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {CHANGE_RISK_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={riskSignal === opt.id}
                        onSelect={() => {
                          setRiskSignal(opt.id)
                          goNext('riskSignal')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={<Sparkles className="w-full h-full" strokeWidth={1.25} />}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'contentChannels' ? (
              <div className="max-w-2xl mx-auto text-center py-4">
                <QuestionTitle>
                  Which <span style={{color: RED}}>channels</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-8 leading-relaxed">
                  Tap every channel you want in the system. As soon as you tap one, paste the
                  profile or page link if you have it. Links are optional, but they stop us chasing
                  the wrong accounts later.
                </p>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {CONTENT_CHANNEL_OPTIONS.map((opt) => {
                    const on = contentChannels.includes(opt.id)
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setContentChannels((prev) => toggleChip(prev, opt.id))
                        }
                        className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 font-sans text-sm font-semibold transition-[border-color,background-color,color] duration-200"
                        style={{
                          borderColor: on ? RED : 'rgba(26,26,26,0.14)',
                          backgroundColor: on ? 'rgba(226,30,63,0.08)' : '#fff',
                          color: on ? RED : INK,
                        }}
                      >
                        {on ? <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} /> : null}
                        {opt.label}
                      </button>
                    )
                  })}
                </div>

                {contentChannels.length > 0 || contentChannelsOther.trim().length >= 2 ? (
                  <div className="mt-8 max-w-lg mx-auto text-left space-y-4">
                    <p className="font-sans text-sm text-dark/50 text-center">
                      Paste each profile or page link. Skip any you do not have handy.
                    </p>
                    {contentChannels
                      .filter((id) => id !== 'other')
                      .map((id) => {
                        const label =
                          CONTENT_CHANNEL_OPTIONS.find((o) => o.id === id)?.label || id
                        return (
                          <div key={id}>
                            <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark/45 mb-2">
                              {label} link
                            </label>
                            <input
                              className={inputClass}
                              type="url"
                              inputMode="url"
                              autoComplete="url"
                              value={contentChannelUrls[id] || ''}
                              onChange={(e) =>
                                setContentChannelUrls((prev) => ({
                                  ...prev,
                                  [id]: e.target.value,
                                }))
                              }
                              placeholder={CONTENT_CHANNEL_URL_HINTS[id] || 'https://…'}
                            />
                          </div>
                        )
                      })}
                    {contentChannels.includes('other') ||
                    contentChannelsOther.trim().length >= 2 ? (
                      <div>
                        <label className="block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark/45 mb-2">
                          {contentChannelsOther.trim() || 'Other'} link
                        </label>
                        <input
                          className={inputClass}
                          type="url"
                          inputMode="url"
                          autoComplete="url"
                          value={contentChannelUrls.other || ''}
                          onChange={(e) =>
                            setContentChannelUrls((prev) => ({
                              ...prev,
                              other: e.target.value,
                            }))
                          }
                          placeholder={CONTENT_CHANNEL_URL_HINTS.other}
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}

                <div className="mt-8 max-w-lg mx-auto text-left">
                  <p className="font-sans text-sm text-dark/50 mb-2 text-center">
                    Another channel we did not list
                  </p>
                  <input
                    className={inputClass}
                    type="text"
                    value={contentChannelsOther}
                    onChange={(e) => setContentChannelsOther(e.target.value)}
                    placeholder="e.g. Threads, newsletter elsewhere…"
                    onKeyDown={(e) => {
                      if (
                        e.key === 'Enter' &&
                        (contentChannels.length >= 1 || contentChannelsOther.trim().length >= 2)
                      ) {
                        goNext('contentChannels')
                      }
                    }}
                  />
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    disabled={
                      contentChannels.length < 1 && contentChannelsOther.trim().length < 2
                    }
                    onClick={() => goNext('contentChannels')}
                    className="inline-flex items-center gap-2 font-mono font-bold uppercase tracking-[0.16em] text-xs px-10 py-4 text-white disabled:opacity-40 transition-opacity"
                    style={{backgroundColor: INK}}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ) : null}

            {step === 'lastPostWhen' ? (
              <>
                <QuestionTitle>
                  When did you last <span style={{color: RED}}>post</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  {contentChannels.includes('linkedin') && contentChannels.length === 1
                    ? 'LinkedIn only is fine. Rough date tells us how cold that feed is today.'
                    : contentChannels.length >= 3
                      ? 'Across those channels, pick the last time anything real went out.'
                      : 'Rough is fine. This tells us how cold the feed is today.'}
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {LAST_POST_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={lastPostWhen === opt.id}
                        onSelect={() => {
                          setLastPostWhen(opt.id)
                          goNext('lastPostWhen')
                        }}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={<FileText className="w-full h-full" strokeWidth={1.25} />}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'hourReady' ? (
              <>
                <QuestionTitle>
                  Can you give <span style={{color: RED}}>one hour</span> a month?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  {lastPostWhen === 'this-week' || lastPostWhen === 'this-month'
                    ? 'You are already posting somehow. The question is whether one protected hour can replace the scramble.'
                    : lastPostWhen === '6-plus' || lastPostWhen === 'never-sure'
                      ? 'Restarting from cold is normal. One honest hour a month is still the input. Without it, this product does not fit yet.'
                      : 'That hour is the input. The system does the rest.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  {(lastPostWhen === '6-plus' || lastPostWhen === 'never-sure'
                    ? [...HOUR_READY_OPTIONS].sort((a, b) =>
                        a.id === 'not-yet' ? -1 : b.id === 'not-yet' ? 1 : 0,
                      )
                    : HOUR_READY_OPTIONS
                  ).map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={hourReady === opt.id}
                        onSelect={() => {
                          setHourReady(opt.id)
                          goNext('hourReady')
                        }}
                        title={opt.label}
                        blurb={
                          lastPostWhen === 'this-week' && opt.id === 'yes'
                            ? 'Swap the late nights for one booked hour.'
                            : lastPostWhen === 'never-sure' && opt.id === 'not-yet'
                              ? 'Say so. The call is where we decide if now is the right time.'
                              : opt.blurb
                        }
                        icon={<Users className="w-full h-full" strokeWidth={1.25} />}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'contentGoal' ? (
              <>
                <QuestionTitle>
                  What should content <span style={{color: RED}}>do</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  {hourReady === 'not-yet'
                    ? 'Even if the hour is not locked yet, pick the outcome you would want. The call pressure-tests fit.'
                    : contentChannels.includes('linkedin') &&
                        !contentChannels.includes('instagram') &&
                        !contentChannels.includes('tiktok')
                      ? 'With LinkedIn in the mix, most owners pick visibility, enquiries, or sounding like the expert.'
                      : 'Pick the main outcome. Mixed is fine if you want more than one.'}
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {(contentChannels.includes('linkedin') &&
                  !contentChannels.includes('instagram') &&
                  !contentChannels.includes('tiktok')
                    ? [
                        ...CONTENT_GOAL_OPTIONS.filter((o) =>
                          ['stay-visible', 'leads', 'authority', 'hire', 'mixed'].includes(o.id),
                        ),
                      ].sort((a, b) => {
                        const order = ['authority', 'leads', 'stay-visible', 'hire', 'mixed']
                        return order.indexOf(a.id) - order.indexOf(b.id)
                      })
                    : CONTENT_GOAL_OPTIONS
                  ).map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={contentGoal === opt.id}
                        onSelect={() => {
                          setContentGoal(opt.id)
                          goNext('contentGoal')
                        }}
                        title={opt.label}
                        blurb={
                          hourReady === 'not-yet' && opt.id === 'stay-visible'
                            ? 'The usual first win once the hour exists.'
                            : opt.blurb
                        }
                        icon={<Sparkles className="w-full h-full" strokeWidth={1.25} />}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'website' ? (
              <OneField
                title={
                  isLandingPage
                    ? 'Which website should host the page?'
                    : 'Which website are we fixing?'
                }
                hint={
                  isLandingPage
                    ? 'Your domain. The campaign page lives on your site, not ours.'
                    : 'Paste the live site URL for this job.'
                }
                value={website}
                onChange={setWebsite}
                placeholder="https://yourbusiness.com.au"
                inputMode="url"
                disabled={!isValidWebsite(website)}
                onNext={() => goNext('website')}
              />
            ) : null}

            {step === 'platform' ? (
              <>
                <QuestionTitle>
                  What runs your <span style={{color: RED}}>website</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Hover a card to read the hint, then press Select. Cannot find yours? Use Not sure.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {PLATFORM_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={platform === opt.id}
                        onSelect={() => selectPlatform(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'provider' ? (
              <>
                <QuestionTitle>
                  Are domain and hosting with the same{' '}
                  <span style={{color: RED}}>provider</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-xl leading-relaxed">
                  Domain is the web address. Hosting is where the site files live.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                  {PROVIDER_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={sameProvider === opt.id}
                        onSelect={() => selectProvider(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'domainProvider' ? (
              <ComboboxField
                title="Where is the domain registered?"
                hint="Start typing to find your registrar. If it is not listed, type the name and keep going. Not sure is fine."
                value={domainProvider}
                onChange={setDomainProvider}
                options={DOMAIN_REGISTRARS}
                onNext={() => goNext('domainProvider')}
                placeholder="e.g. GoDaddy, Crazy Domains"
              />
            ) : null}

            {step === 'hostingProvider' ? (
              <ComboboxField
                title="Where is the site hosted?"
                hint="Start typing to find your host. Shopify, Wix, and Squarespace usually host themselves. Type your own if it is missing."
                value={hostingProvider}
                onChange={setHostingProvider}
                options={HOSTING_PROVIDERS}
                onNext={() => goNext('hostingProvider')}
                placeholder="e.g. SiteGround, WP Engine"
              />
            ) : null}

            {step === 'access' ? (
              <>
                <QuestionTitle>
                  {usesPostingWizard || usesLocalPackWizard ? (
                    profileStatus === 'unclaimed' ? (
                      <>
                        How do we <span style={{color: RED}}>claim</span> it?
                      </>
                    ) : profileStatus === 'claimed-other' ? (
                      <>
                        How do we <span style={{color: RED}}>recover</span> it?
                      </>
                    ) : profileStatus === 'suspended' ? (
                      <>
                        How do we handle the <span style={{color: RED}}>suspension</span>?
                      </>
                    ) : profileStatus === 'claimed-me' ? (
                      usesLocalPackWizard &&
                      (reviewJob === 'sms' ||
                        reviewJob === 'email' ||
                        reviewJob === 'software' ||
                        reviewJob === 'unsure') ? (
                        <>
                          How do we get <span style={{color: RED}}>in</span> for the pack?
                        </>
                      ) : (
                        <>
                          How do we get <span style={{color: RED}}>manager</span> access?
                        </>
                      )
                    ) : (
                      <>
                        How should we get <span style={{color: RED}}>in</span>?
                      </>
                    )
                  ) : usesEnquiryWizard ? (
                    enquiryRoute === 'crm' ? (
                      <>
                        How do we reach the <span style={{color: RED}}>CRM</span>?
                      </>
                    ) : enquiryChannels === 'email' ? (
                      <>
                        How do we reach the <span style={{color: RED}}>inbox</span>?
                      </>
                    ) : (
                      <>
                        How do we reach the <span style={{color: RED}}>enquiry tools</span>?
                      </>
                    )
                  ) : usesWhatsappWizard ? (
                    <>
                      How should we set up <span style={{color: RED}}>WhatsApp</span>?
                    </>
                  ) : usesDmWizard ? (
                    <>
                      How should we reach the <span style={{color: RED}}>DM inboxes</span>?
                    </>
                  ) : usesQuoteWizard ? (
                    <>
                      How should we reach the <span style={{color: RED}}>quote tool</span>?
                    </>
                  ) : usesIntakeWizard ? (
                    <>
                      How should we wire the <span style={{color: RED}}>intake destination</span>?
                    </>
                  ) : usesClinicWizard ? (
                    profileStatus === 'unclaimed' ? (
                      <>
                        How do we <span style={{color: RED}}>claim</span> the listing and set phone access?
                      </>
                    ) : profileStatus === 'claimed-other' ? (
                      <>
                        How do we <span style={{color: RED}}>recover</span> the listing and set phone access?
                      </>
                    ) : profileStatus === 'suspended' ? (
                      <>
                        How do we handle the <span style={{color: RED}}>suspension</span> and phone path?
                      </>
                    ) : (
                      <>
                        How should we get <span style={{color: RED}}>Maps and phone</span> access?
                      </>
                    )
                  ) : usesFrontDoorWizard ? (
                    profileStatus === 'unclaimed' ? (
                      <>
                        How do we <span style={{color: RED}}>claim</span> the listing and set Book now?
                      </>
                    ) : profileStatus === 'claimed-other' ? (
                      <>
                        How do we <span style={{color: RED}}>recover</span> the listing and set Book now?
                      </>
                    ) : profileStatus === 'suspended' ? (
                      <>
                        How do we handle the <span style={{color: RED}}>suspension</span> and Book now?
                      </>
                    ) : (
                      <>
                        How should we get <span style={{color: RED}}>Maps, reviews, and Book now</span> access?
                      </>
                    )
                  ) : (
                    <>
                      How should we get <span style={{color: RED}}>in</span>?
                    </>
                  )}
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-xl leading-relaxed">
                  {usesPostingWizard
                    ? profileStatus === 'unclaimed'
                      ? 'The listing is unclaimed. Pick claim with us, or a short call first.'
                      : profileStatus === 'claimed-other'
                        ? 'Someone else holds it. Recovery or a call. The posting kit waits until you control it.'
                        : profileStatus === 'suspended'
                          ? 'No posts until Google allows them. Assess with us, or call first.'
                          : profileStatus === 'claimed-me' && whoPublishes === 'staff'
                            ? 'You manage it. Invite us so we can hand the kit to you and your publisher.'
                            : 'Hover, then Select. Pick whatever is easiest for you.'
                    : usesLocalPackWizard
                      ? profileStatus === 'unclaimed'
                        ? 'The listing is unclaimed. Pick claim with us, or a short call first.'
                        : profileStatus === 'claimed-other'
                          ? 'Someone else holds it. Recovery or a call. The pack waits until you control it.'
                          : profileStatus === 'suspended'
                            ? 'No profile, review, or posting work until Google allows it. Assess with us, or call first.'
                            : profileStatus === 'claimed-me' &&
                                (reviewJob === 'sms' || reviewJob === 'email')
                              ? 'We need Google manager access plus the SMS or email tool that fires after a job.'
                              : profileStatus === 'claimed-me' && reviewJob === 'software'
                                ? 'We need Google manager access plus the job software where work gets marked done.'
                                : profileStatus === 'claimed-me' && whoPublishes === 'staff'
                                  ? 'You manage it. Invite us so we can hand the pack to you and your publisher.'
                                  : 'Hover, then Select. Pick whatever is easiest for you.'
                    : usesEnquiryWizard
                      ? enquiryRoute === 'crm'
                        ? 'The real message lands in your CRM. Pick CRM invite, form tool access if needed, or a short call.'
                        : enquiryRoute === 'sms'
                          ? 'We need the form or inbox tool, plus the SMS alert path. Or a short call.'
                          : 'Hover, then Select. Pick whatever is easiest for you.'
                    : usesWhatsappWizard
                      ? 'Phone handoff, Business app invite, Meta Business Manager, or a short call. Pick whatever is easiest.'
                    : usesDmWizard
                      ? 'Page or Instagram invite, Meta Business Manager, inbox admin, or a short call. Pick whatever is easiest.'
                    : usesQuoteWizard
                      ? 'CRM invite, sheet share, mailbox access, or a short call. Pick whatever is easiest.'
                    : usesIntakeWizard
                      ? 'CRM invite, form tool login, inbox or sheet share, or a short call. Pick whatever is easiest.'
                    : usesClinicWizard
                      ? profileStatus === 'unclaimed'
                        ? 'We need a path to claim the Google listing, plus how we reach the missed-call SMS setup. Or a short call covering both.'
                        : profileStatus === 'claimed-other'
                          ? 'Recovery for the listing plus the missed-call path. Or a short call covering both.'
                          : profileStatus === 'suspended'
                            ? 'We assess the suspension with you, then lock the missed-call path. Or a short call first.'
                            : 'Google manager invite, missed-call divert or VoIP access, or a short call that covers both. Pick whatever is easiest.'
                    : usesFrontDoorWizard
                      ? profileStatus === 'unclaimed'
                        ? 'We need a path to claim the Google listing, plus calendar and site access for Book now. Or a short call covering all of it.'
                        : profileStatus === 'claimed-other'
                          ? 'Recovery for the listing, then calendar and Book now access. Or a short call covering all of it.'
                          : profileStatus === 'suspended'
                            ? 'We assess the suspension with you, then lock the review and Book now paths. Or a short call first.'
                            : 'Google manager plus calendar share, website access if Book now lives on the site, or a short call that covers the whole front door. Pick whatever is easiest.'
                    : 'Hover, then Select. Pick whatever is easiest for you.'}
                </p>
                <div
                  className={
                    accessOptions.length <= 2
                      ? 'grid grid-cols-2 gap-3 md:gap-4 max-w-2xl'
                      : accessOptions.length === 3
                        ? 'grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl'
                        : 'grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'
                  }
                >
                  {accessOptions.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={accessPath === opt.id}
                        onSelect={() => selectAccess(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'accessDetail' ? (
              <OneField
                title="Anything we should know about access?"
                hint={
                  usesMissedWizard
                    ? isAiPhone
                      ? accessPath === 'forward'
                        ? 'Carrier name, or how you change divert / after-hours routing today.'
                        : accessPath === 'provider'
                          ? 'Voice vendor name and login URL, or say you will email an invite separately.'
                          : accessPath === 'invite'
                            ? 'Which calendar (Google or Outlook), and the email to share with.'
                            : accessPath === 'crm'
                              ? 'Which CRM, and whether calls or bookings already log there.'
                              : 'Best times to call, or anything that usually trips people up.'
                      : accessPath === 'forward'
                        ? 'Carrier name, or how you change divert today.'
                        : accessPath === 'provider'
                          ? 'VoIP or SMS login URL, or say you will email credentials separately.'
                          : accessPath === 'crm'
                            ? 'Which CRM, and whether calls already log there.'
                            : 'Best times to call, or anything that usually trips people up.'
                    : usesClinicWizard
                      ? accessPath === 'invite'
                        ? 'The Google account email that can add managers, or say you will send the invite shortly.'
                        : accessPath === 'claim'
                          ? 'Business name, suburb, and the Google Maps link if you have one. Do not share passwords here.'
                          : accessPath === 'recover'
                            ? 'Who used to manage it if you know, any suspension email from Google, and best times to call.'
                            : accessPath === 'forward'
                              ? 'Carrier name, or how you change divert today for the clinic line.'
                              : accessPath === 'provider'
                                ? 'VoIP or SMS login URL, or say you will email credentials separately.'
                                : accessPath === 'crm'
                                  ? 'Which CRM or booking tool logs calls today, and the email to invite.'
                                  : 'Best times to call, or anything that usually trips people up on Maps or the phone path.'
                    : usesFrontDoorWizard
                      ? accessPath === 'invite'
                        ? 'Google account email for manager invite, plus the calendar email to share for Book now.'
                        : accessPath === 'claim'
                          ? 'Business name, suburb, and the Google Maps link if you have one. Do not share passwords here.'
                          : accessPath === 'recover'
                            ? 'Who used to manage it if you know, any suspension email from Google, and best times to call.'
                            : accessPath === 'wp-admin'
                              ? 'Login URL for the site, or say you will email credentials separately.'
                              : accessPath === 'admin'
                                ? 'The Google account email that can add managers on the listing.'
                                : accessPath === 'provider'
                                  ? 'SMS or email tool name and login URL, or say you will email access separately.'
                                  : accessPath === 'crm'
                                    ? 'Which job software marks visits done, and how to invite us.'
                                    : 'Best times to call, or anything that usually trips people up on Maps, reviews, or Book now.'
                    : usesGoogleWizard ||
                        usesPostingWizard ||
                        usesReviewsWizard ||
                        usesLocalPackWizard ||
                        usesEnquiryWizard
                      ? accessPath === 'invite'
                        ? 'The Google account email that can add managers, or say you will send the invite shortly.'
                        : accessPath === 'claim'
                          ? 'Business name, suburb, and the Google Maps link if you have one. Do not share passwords here.'
                          : accessPath === 'recover'
                            ? 'Who used to manage it if you know, any suspension email from Google, and best times to call.'
                            : accessPath === 'form-provider'
                              ? usesEnquiryWizard
                                ? 'Form tool or mailbox name, login URL, or say you will email an invite separately.'
                                : 'SMS or email tool name and login URL, or say you will email access separately.'
                              : accessPath === 'provider'
                              ? usesEnquiryWizard
                                ? 'SMS or alert tool name and login URL, or say you will email access separately.'
                                : 'SMS or email tool name and login URL, or say you will email access separately.'
                              : accessPath === 'crm'
                                ? usesEnquiryWizard
                                  ? 'Which CRM, and the email to invite. Or say you will send the invite shortly.'
                                  : 'Which job software, and how a job gets marked complete today.'
                                : 'Best times to call, or anything that usually trips people up.'
                      : accessPath === 'search-console'
                        ? 'The Google account email that owns Search Console, or say you will approve the invite shortly.'
                        : accessPath === 'wp-admin'
                          ? 'Login URL, or say you will email credentials separately.'
                          : accessPath === 'hosting'
                            ? 'Hosting panel name, or how you usually log in.'
                            : accessPath === 'agency'
                              ? 'Who manages the site? Name or email is enough.'
                              : 'Best times to call, or anything that usually trips people up.'
                }
                value={accessDetail}
                onChange={setAccessDetail}
                placeholder="Optional but helpful"
                multiline
                disabled={false}
                onNext={() => goNext('accessDetail')}
                allowEmpty
              />
            ) : null}

            {step === 'notes' ? (
              <>
                <OneField
                  title={
                    isChangePack || isTeamAi || isContentSystem
                      ? 'Anything to add?'
                      : 'Anything else?'
                  }
                  hint={
                    isChangePack
                      ? 'Optional. Skip if you are done. Add rollout quirks, union rules, shift patterns, or anything that usually trips go-live.'
                      : isContentSystem
                        ? 'Optional. Skip if you are done. Brand quirks, channels we missed, or anything that usually trips content.'
                        : isTeamAi
                          ? 'Optional comment only. Skip if the taps above already cover it.'
                          : 'Optional. Skip if you are done.'
                  }
                  value={notes}
                  onChange={setNotes}
                  placeholder={
                    isChangePack
                      ? 'e.g. night shift needs a different pack, or two sites go live a week apart…'
                      : isContentSystem
                        ? 'e.g. we avoid politics, or LinkedIn is the only channel that matters…'
                        : isTeamAi
                          ? 'e.g. two people are part-time, or we prefer Tuesdays…'
                          : 'Optional'
                  }
                  multiline
                  disabled={false}
                  onNext={() => void submit()}
                  allowEmpty
                  nextLabel={
                    submitting
                      ? 'Sending…'
                      : isChangePack || isTeamAi || isContentSystem
                        ? 'Submit prep'
                        : 'Submit and start the clock'
                  }
                  nextDisabled={submitting}
                />
                {error ? (
                  <p className="mt-4 font-sans text-sm text-[#9A1730] text-center">{error}</p>
                ) : null}
              </>
            ) : null}

            {step === 'done' ? (
              <div className="text-center md:text-left max-w-xl mx-auto md:mx-0 py-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0 text-white"
                  style={{backgroundColor: RED}}
                >
                  <Check className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-dark mb-3">
                  {isChangePack || isContentSystem
                    ? 'Scoped prep received'
                    : isTeamAi
                      ? 'Prep received. We are on it'
                      : 'Access received. We are on it'}
                </h1>
                <p className="font-sans text-dark/65 leading-relaxed mb-8">
                  {isContentSystem && hourReady === 'not-yet'
                    ? 'We have the brief. Book the 15-minute call so we can pressure-test the hour and see if this product fits yet. You leave with a clear yes or no.'
                    : isChangePack || isContentSystem
                      ? 'We have what we need. Next, book the 15-minute scoping call. You get a fixed price in writing the same day.'
                      : isTeamAi
                        ? `We will review what you sent, then call you to lock a tentative day inside your window. If we need anything else, we will email ${email || 'you'}.`
                        : `Your delivery clock starts from this submission. If we need anything else, we will email ${email || 'you'}, usually the same day.`}
                </p>
                {isChangePack || isContentSystem ? (
                  <a
                    href={SCHEDULER_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto font-mono font-bold uppercase tracking-[0.16em] text-xs px-10 py-4 text-white mb-6"
                    style={{backgroundColor: RED}}
                  >
                    Book the 15-minute scoping call
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : null}
                <div>
                  <Link
                    to={product ? `/go/${product}` : '/go'}
                    className="font-sans text-sm underline underline-offset-4 text-dark/55 hover:text-dark"
                  >
                    Back to the offer page
                  </Link>
                </div>
              </div>
            ) : null}
          </m.div>
        </AnimatePresence>

        <FunnelLegalFooter />
      </main>
    </div>
  )
}

function QuestionTitle({children}: {children: React.ReactNode}) {
  return (
    <h1 className="font-serif text-3xl md:text-[2.4rem] tracking-tight text-dark mb-3 leading-[1.15] text-center md:text-left">
      {children}
    </h1>
  )
}

function toggleChip(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
}

/** When exclusiveId is selected, clear others. Selecting anything else clears exclusiveId. */
function toggleExclusiveChip(list: string[], id: string, exclusiveId: string): string[] {
  if (id === exclusiveId) {
    return list.includes(exclusiveId) ? [] : [exclusiveId]
  }
  const withoutExclusive = list.filter((x) => x !== exclusiveId)
  return withoutExclusive.includes(id)
    ? withoutExclusive.filter((x) => x !== id)
    : [...withoutExclusive, id]
}

function ChipPickStep({
  title,
  hint,
  options,
  selected,
  onToggle,
  disabled,
  onNext,
  nextLabel = 'Continue',
  otherValue,
  onOtherChange,
  otherPlaceholder,
  otherHint,
}: {
  title: React.ReactNode
  hint: string
  options: readonly {id: string; label: string}[]
  selected: string[]
  onToggle: (id: string) => void
  disabled: boolean
  onNext: () => void
  nextLabel?: string
  otherValue?: string
  onOtherChange?: (v: string) => void
  otherPlaceholder?: string
  otherHint?: string
}) {
  return (
    <div className="max-w-2xl mx-auto text-center py-4">
      <QuestionTitle>{title}</QuestionTitle>
      <p className="font-sans text-dark/55 mb-8 leading-relaxed">{hint}</p>
      <div className="flex flex-wrap justify-center gap-2.5">
        {options.map((opt) => {
          const on = selected.includes(opt.id)
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onToggle(opt.id)}
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-3 font-sans text-sm font-semibold transition-[border-color,background-color,color] duration-200"
              style={{
                borderColor: on ? RED : 'rgba(26,26,26,0.14)',
                backgroundColor: on ? 'rgba(226,30,63,0.08)' : '#fff',
                color: on ? RED : INK,
              }}
            >
              {on ? <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2.5} /> : null}
              {opt.label}
            </button>
          )
        })}
      </div>
      {onOtherChange ? (
        <div className="mt-8 max-w-lg mx-auto text-left">
          {otherHint ? (
            <p className="font-sans text-sm text-dark/50 mb-2 text-center">{otherHint}</p>
          ) : null}
          <input
            className={inputClass}
            type="text"
            value={otherValue || ''}
            onChange={(e) => onOtherChange(e.target.value)}
            placeholder={otherPlaceholder || 'Type anything else…'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !disabled) onNext()
            }}
          />
        </div>
      ) : null}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          disabled={disabled}
          onClick={onNext}
          className="inline-flex items-center gap-2 font-mono font-bold uppercase tracking-[0.16em] text-xs px-10 py-4 text-white disabled:opacity-40 transition-opacity"
          style={{backgroundColor: INK}}
        >
          {nextLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function DaysOutStepper({
  value,
  onChange,
  min,
  max,
}: {
  value: number
  onChange: (n: number) => void
  min: number
  max: number
}) {
  const date = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + value)
    return d.toLocaleDateString('en-AU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }, [value])

  function bump(delta: number) {
    onChange(Math.min(max, Math.max(min, value + delta)))
  }

  return (
    <div
      className="mx-auto max-w-sm rounded-2xl border border-dark/12 bg-white px-6 py-8 shadow-[0_8px_24px_-18px_rgba(26,26,26,0.28)]"
      onWheel={(e) => {
        e.preventDefault()
        bump(e.deltaY > 0 ? 1 : -1)
      }}
    >
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-dark/45 mb-4">
        Earliest in
      </p>
      <div className="flex items-center justify-center gap-5">
        <button
          type="button"
          aria-label="Fewer days"
          disabled={value <= min}
          onClick={() => bump(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-dark/15 text-dark disabled:opacity-30 transition-opacity hover:border-[#E21E3F] hover:text-[#E21E3F]"
        >
          <ChevronDown className="w-5 h-5" strokeWidth={2} />
        </button>
        <div className="min-w-[7.5rem] text-center">
          <div className="font-serif text-5xl tracking-tight text-dark tabular-nums leading-none">
            {value}
          </div>
          <div className="mt-2 font-sans text-sm text-dark/55">days</div>
        </div>
        <button
          type="button"
          aria-label="More days"
          disabled={value >= max}
          onClick={() => bump(1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-dark/15 text-dark disabled:opacity-30 transition-opacity hover:border-[#E21E3F] hover:text-[#E21E3F]"
        >
          <ChevronUp className="w-5 h-5" strokeWidth={2} />
        </button>
      </div>
      <p className="mt-6 font-sans text-sm text-dark/60 leading-relaxed">
        Roughly from <span className="font-semibold text-dark">{date}</span>
      </p>
      <div className="mt-5 flex justify-center gap-2">
        {[14, 21, 28, 42].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className="rounded-lg px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-colors"
            style={{
              backgroundColor: value === n ? INK : 'transparent',
              color: value === n ? '#fff' : 'rgba(26,26,26,0.45)',
              border: value === n ? 'none' : '1px solid rgba(26,26,26,0.12)',
            }}
          >
            {n}d
          </button>
        ))}
      </div>
    </div>
  )
}

function OneField({
  title,
  hint,
  value,
  onChange,
  placeholder,
  onNext,
  disabled,
  allowEmpty,
  type = 'text',
  autoComplete,
  inputMode,
  multiline,
  nextLabel = 'Next',
  nextDisabled,
}: {
  title: string
  hint?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  onNext: () => void
  disabled: boolean
  allowEmpty?: boolean
  type?: string
  autoComplete?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  multiline?: boolean
  nextLabel?: string
  nextDisabled?: boolean
}) {
  const blockNext = nextDisabled || (!allowEmpty && disabled)
  return (
    <div className="max-w-lg mx-auto text-center py-4">
      <QuestionTitle>{title}</QuestionTitle>
      {hint ? (
        <p className="font-sans text-dark/55 mb-8 leading-relaxed">{hint}</p>
      ) : (
        <div className="mb-8" />
      )}
      {multiline ? (
        <textarea
          className={`${inputClass} min-h-[140px] resize-y text-base`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={inputClass}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !blockNext) onNext()
          }}
        />
      )}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          disabled={blockNext}
          onClick={onNext}
          className="inline-flex items-center gap-2 font-mono font-bold uppercase tracking-[0.16em] text-xs px-10 py-4 text-white disabled:opacity-40 transition-opacity"
          style={{backgroundColor: INK}}
        >
          {nextLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function ComboboxField({
  title,
  hint,
  value,
  onChange,
  options,
  onNext,
  placeholder = 'Start typing to search',
}: {
  title: string
  hint?: string
  value: string
  onChange: (v: string) => void
  options: readonly string[]
  onNext: () => void
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const query = value
  const normalised = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    if (!normalised) return [...options]
    return options.filter((opt) => opt.toLowerCase().includes(normalised))
  }, [options, normalised])

  const showCustom =
    normalised.length > 0 &&
    !options.some((opt) => opt.toLowerCase() === normalised)

  const customLabel = showCustom ? `Use "${query.trim()}"` : null

  const items = useMemo(() => {
    if (customLabel) return [...filtered, customLabel]
    return filtered
  }, [filtered, customLabel])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    setHighlight(0)
  }, [normalised, open])

  function pick(opt: string) {
    if (customLabel && opt === customLabel) {
      onChange(query.trim())
    } else {
      onChange(opt)
    }
    setOpen(false)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setHighlight((h) => Math.min(h + 1, Math.max(items.length - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (open && items[highlight]) {
        pick(items[highlight])
      } else if (value.trim()) {
        onNext()
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  useEffect(() => {
    const el = listRef.current?.children[highlight] as HTMLElement | undefined
    el?.scrollIntoView({block: 'nearest'})
  }, [highlight])

  return (
    <div className="mx-auto max-w-lg py-4 text-center">
      <QuestionTitle>{title}</QuestionTitle>
      {hint ? <p className="mb-8 font-sans leading-relaxed text-dark/55">{hint}</p> : null}

      <div ref={rootRef} className="relative mx-auto w-full max-w-md text-left">
        <input
          className={inputClass}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls="provider-listbox"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
          }}
          onKeyDown={onKeyDown}
        />

        {open ? (
          <ul
            id="provider-listbox"
            ref={listRef}
            role="listbox"
            className="absolute left-0 right-0 z-20 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-dark/10 bg-white py-2 shadow-[0_16px_40px_-20px_rgba(26,26,26,0.35)]"
          >
            {items.length === 0 ? (
              <li className="px-4 py-3 font-sans text-sm text-dark/45">No matches. Keep typing your provider.</li>
            ) : (
              items.map((opt, i) => {
                const active = i === highlight
                const isCustom = Boolean(customLabel && opt === customLabel)
                return (
                  <li key={opt} role="option" aria-selected={value === opt}>
                    <button
                      type="button"
                      className={[
                        'flex w-full items-center px-4 py-2.5 text-left font-sans text-[15px] transition-colors',
                        active ? 'bg-[#FFF2EC] text-dark' : 'text-dark/80 hover:bg-[#FFF2EC]',
                        isCustom ? 'font-medium' : '',
                      ].join(' ')}
                      style={active ? {boxShadow: `inset 3px 0 0 ${RED}`} : undefined}
                      onMouseEnter={() => setHighlight(i)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => pick(opt)}
                    >
                      {opt}
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        ) : null}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          disabled={!value.trim()}
          onClick={onNext}
          className="inline-flex items-center gap-2 px-10 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white transition-opacity disabled:opacity-40"
          style={{backgroundColor: INK}}
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default FunnelAccessPage
