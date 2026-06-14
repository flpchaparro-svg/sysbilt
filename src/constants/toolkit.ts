export type ToolkitCategory =
  | 'chat-research'
  | 'writing-content'
  | 'images-design'
  | 'video'
  | 'voice-audio'
  | 'meetings-notes'
  | 'coding'
  | 'automation-agents'

export type ToolkitPricingModel = 'free' | 'freemium' | 'free-trial' | 'paid'

export type ToolkitPick = 'our-pick' | 'best-value' | 'best-for-small-business'

export type ToolkitLinkType = 'affiliate' | 'referral' | 'discount' | 'standard'

export const TOOLKIT_CATEGORY_LABELS: Record<ToolkitCategory, string> = {
  'chat-research': 'Chat & research',
  'writing-content': 'Writing & content',
  'images-design': 'Images & design',
  video: 'Video',
  'voice-audio': 'Voice & audio',
  'meetings-notes': 'Meetings & notes',
  coding: 'Coding',
  'automation-agents': 'Automation & agents',
}

export const TOOLKIT_CATEGORY_ORDER: ToolkitCategory[] = [
  'chat-research',
  'writing-content',
  'images-design',
  'video',
  'voice-audio',
  'meetings-notes',
  'coding',
  'automation-agents',
]

export const TOOLKIT_PRICING_LABELS: Record<ToolkitPricingModel, string> = {
  free: 'Free',
  freemium: 'Freemium',
  'free-trial': 'Free trial',
  paid: 'Paid',
}

export const TOOLKIT_PRICING_ORDER: ToolkitPricingModel[] = [
  'free',
  'freemium',
  'free-trial',
  'paid',
]

export const TOOLKIT_PICK_LABELS: Record<ToolkitPick, string> = {
  'our-pick': 'Our pick',
  'best-value': 'Best value',
  'best-for-small-business': 'Best for small business',
}

export function getToolkitOutboundRel(linkType: ToolkitLinkType): string {
  if (linkType === 'standard') return 'noopener noreferrer'
  return 'sponsored nofollow noopener noreferrer'
}

export function getCategoryLabel(category: string): string {
  return TOOLKIT_CATEGORY_LABELS[category as ToolkitCategory] ?? category
}

export function getPricingLabel(pricingModel: string): string {
  return TOOLKIT_PRICING_LABELS[pricingModel as ToolkitPricingModel] ?? pricingModel
}

export function getToolkitDisclosure(linkType: ToolkitLinkType): string | null {
  if (linkType === 'affiliate' || linkType === 'referral') {
    return 'This is an affiliate link. If you sign up through it, we may earn a commission at no extra cost to you. We only list tools we rate.'
  }
  if (linkType === 'discount') {
    return 'Sign up through this link for a discount on your plan. We may also earn a small commission.'
  }
  return null
}

export const TOOLKIT_ITEM_QUERY = `*[_type == "toolkitItem" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  tagline,
  summary,
  benefits,
  category,
  phase,
  pricingModel,
  picks,
  linkType,
  url,
  promoCode,
  metaTitle,
  metaDescription
}`
