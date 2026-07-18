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
export type PhoneSetupId = 'mobile' | 'landline' | 'voip' | 'mixed' | 'unsure'
export type ProfileStatusId =
  | 'unclaimed'
  | 'claimed-me'
  | 'claimed-other'
  | 'suspended'
  | 'unsure'

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
