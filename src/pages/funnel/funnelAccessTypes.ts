import type {FunnelProductCode} from '../../constants/funnel'

export type PlatformId =
  | 'wordpress'
  | 'wordpress-com'
  | 'shopify'
  | 'squarespace'
  | 'wix'
  | 'webflow'
  | 'framer'
  | 'bigcommerce'
  | 'magento'
  | 'joomla'
  | 'drupal'
  | 'custom'
  | 'other'

export type SameProviderId = 'yes' | 'no' | 'unsure'
export type AccessPathId =
  | 'wp-admin'
  | 'hosting'
  | 'agency'
  | 'call'
  | 'forward'
  | 'provider'
  | 'crm'
  | 'invite'
  | 'admin'
  | 'form-provider'
  | 'claim'
  | 'recover'
  | 'search-console'
  | 'ad-account'
export type PhoneSetupId = 'mobile' | 'landline' | 'voip' | 'mixed' | 'unsure'
export type ProfileStatusId =
  | 'unclaimed'
  | 'claimed-me'
  | 'claimed-other'
  | 'suspended'
  | 'unsure'
export type ReviewJobId = 'sms' | 'email' | 'software' | 'manual' | 'unsure'
export type WhoPublishesId = 'owner' | 'staff' | 'care-later' | 'unsure'
export type EnquiryChannelId =
  | 'form'
  | 'email'
  | 'both'
  | 'both-plus'
  | 'unsure'
export type EnquiryRouteId = 'inbox' | 'sms' | 'crm' | 'unsure'
export type CrmSystemId =
  | 'hubspot'
  | 'pipedrive'
  | 'salesforce'
  | 'zoho'
  | 'monday'
  | 'sheets'
  | 'inbox'
  | 'other'
  | 'none'
export type CrmLeadSourceId =
  | 'form'
  | 'phone'
  | 'ads'
  | 'social'
  | 'walk-in'
  | 'mixed'
  | 'unsure'
export type CrmGoalId = 'speed' | 'alerts' | 'follow-up' | 'quotes' | 'missed-call' | 'full'
export type BookingToolId = 'hubspot' | 'calendly' | 'setmore' | 'fresha' | 'other' | 'none'
export type BookingWhatId = 'appointments' | 'calls' | 'consults' | 'mixed' | 'other'
export type BookingWhereId = 'site' | 'google' | 'both' | 'unsure'
export type LandingGoalId = 'leads' | 'calls' | 'book' | 'buy' | 'other'
export type LandingAdsId = 'meta' | 'google' | 'both' | 'not-live' | 'other'
export type LandingTrackingId = 'meta' | 'google' | 'both' | 'none' | 'unsure'
export type ConversionAskId = 'call' | 'form' | 'book'

export type FunnelAccessPayload = {
  product: FunnelProductCode
  name: string
  email: string
  business: string
  website?: string
  platform?: PlatformId | ''
  sameProvider?: SameProviderId | ''
  domainProvider?: string
  hostingProvider?: string
  accessPath: AccessPathId
  accessDetail: string
  notes: string
  phone?: string
  phoneSetup?: PhoneSetupId | ''
  profileUrl?: string
  profileStatus?: ProfileStatusId | ''
  reviewJob?: ReviewJobId | ''
  whoPublishes?: WhoPublishesId | ''
  enquiryChannels?: EnquiryChannelId | ''
  enquiryRoute?: EnquiryRouteId | ''
  crmSystem?: CrmSystemId | ''
  leadSource?: CrmLeadSourceId | ''
  crmGoal?: CrmGoalId | ''
  bookingTool?: BookingToolId | ''
  bookingWhat?: BookingWhatId | ''
  bookingWhere?: BookingWhereId | ''
  landingGoal?: LandingGoalId | ''
  landingAds?: LandingAdsId | ''
  landingOffer?: string
  landingTracking?: LandingTrackingId | ''
  conversionServiceA?: string
  conversionServiceB?: string
  conversionAsk?: ConversionAskId | ''
  conversionOffer?: string
  onpageUrls?: string
  onpageQueries?: string
  websiteUrl?: string
  teamSize?: string
  teamTools?: string
  timeEaters?: string
  sensitiveData?: string
  dateWindow?: string
  rolloutType?: string
  peopleAffected?: string
  goLiveWindow?: string
  changeAreas?: string
  trainingPlan?: string
  riskSignal?: string
  contentChannels?: string
  contentChannelLinks?: string
  lastPostWhen?: string
  hourReady?: string
  contentGoal?: string
  sessionFormat?: 'remote' | 'onsite'
}

export const DOMAIN_REGISTRARS = [
  'Crazy Domains',
  'GoDaddy',
  'Namecheap',
  'Google Domains / Squarespace Domains',
  'Cloudflare',
  'Netregistry',
  'VentraIP',
  'OnlyDomains',
  'Hover',
  'Name.com',
  'Porkbun',
  'AWS Route 53',
  'Azure DNS',
  'Other / not listed',
  'Not sure',
] as const

export const HOSTING_PROVIDERS = [
  'SiteGround',
  'WP Engine',
  'Kinsta',
  'Cloudways',
  'DigitalOcean',
  'AWS',
  'Google Cloud',
  'Azure',
  'Vultr',
  'Linode / Akamai',
  'DreamHost',
  'Bluehost',
  'HostGator',
  'Shopify (hosted)',
  'Squarespace (hosted)',
  'Wix (hosted)',
  'Webflow (hosted)',
  'WordPress.com',
  'cPanel shared host (other)',
  'Other / not listed',
  'Not sure',
] as const
