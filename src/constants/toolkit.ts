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

export const TOOLKIT_TAGLINE_MAX_CHARS = 160

/** Detail-page summary display cap (hero-adjacent copy). */
export const TOOLKIT_SUMMARY_MAX_CHARS = 200

const PICK_PRIORITY: ToolkitPick[] = ['our-pick', 'best-value', 'best-for-small-business']

export const TOOLKIT_PICK_BADGE_CLASSES: Record<ToolkitPick, string> = {
  'our-pick': 'bg-red-solid text-white',
  'best-value': 'bg-gold text-dark',
  'best-for-small-business': 'bg-cream text-dark',
}

export function getPrimaryPick(picks?: ToolkitPick[] | null): ToolkitPick | null {
  if (!picks?.length) return null
  for (const pick of PICK_PRIORITY) {
    if (picks.includes(pick)) return pick
  }
  return picks[0]
}

export function truncateToolkitTagline(text: string | undefined, max = TOOLKIT_TAGLINE_MAX_CHARS): string {
  if (!text) return ''
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trimEnd()}…`
}

export function truncateToolkitSummary(text: string | undefined, max = TOOLKIT_SUMMARY_MAX_CHARS): string {
  if (!text) return ''
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trimEnd()}…`
}

/** Brutalist action — cream border, hard shadow lift on hover (toolkit tiles). */
export const TOOLKIT_BTN_BRUTAL =
  'inline-flex items-center justify-center gap-2 border-2 border-cream type-eyebrow text-cream transition-all duration-300 hover:bg-cream hover:border-cream hover:text-dark hover:shadow-[6px_6px_0px_0px_#FFF2EC] hover:-translate-y-0.5'

/** Primary outbound action on toolkit detail (Visit tool). */
export const TOOLKIT_BTN_PRIMARY = `${TOOLKIT_BTN_BRUTAL} w-full`

/** Secondary / inline action on dark toolkit surfaces. */
export const TOOLKIT_BTN_SECONDARY =
  'inline-flex items-center justify-center gap-2 border-2 border-cream type-eyebrow text-cream transition-all duration-300 hover:bg-gold hover:border-gold hover:text-dark hover:shadow-[4px_4px_0px_0px_#D4A84B] hover:-translate-y-0.5'

/** Inline CTA inside conversion blocks. */
export const TOOLKIT_BTN_INLINE_CTA =
  'font-mono text-xs font-bold uppercase transition-all duration-300 border-2 border-cream bg-cream text-dark type-eyebrow hover:bg-gold hover:border-gold hover:shadow-[4px_4px_0px_0px_#D4A84B] hover:-translate-y-0.5 px-8 py-4 inline-flex items-center gap-3'

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
  body,
  category,
  phase,
  pricingModel,
  picks,
  linkType,
  url,
  promoCode,
  metaTitle,
  metaDescription,
  tags,
  _updatedAt
}`
