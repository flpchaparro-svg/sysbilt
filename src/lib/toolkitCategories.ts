/**
 * Single source of truth for toolkit category taxonomy.
 * Used by the frontend filter, label lookups, and Sanity Studio schema options.
 * To add a category later: append one entry here — no other code changes required.
 */

export type ToolkitPhaseGroup = 'Get Clients' | 'Scale Faster' | 'See Clearly'

export type ToolkitPillarPath =
  | '/pillar1'
  | '/pillar2'
  | '/pillar3'
  | '/pillar4'
  | '/pillar5'
  | '/pillar6'
  | '/pillar7'
  | '/system'
  | '/'
  | '/contact'

export type ToolkitCategoryDef = {
  value: string
  label: string
  group: ToolkitPhaseGroup
  defaultPillar: ToolkitPillarPath
}

export const TOOLKIT_PHASE_GROUPS: ToolkitPhaseGroup[] = [
  'Get Clients',
  'Scale Faster',
  'See Clearly',
]

/** Ordered list — existing eight first (unchanged labels/order), then new categories. */
export const TOOLKIT_CATEGORIES = [
  // Existing
  {value: 'chat-research', label: 'Chat & research', group: 'Scale Faster', defaultPillar: '/pillar4'},
  {value: 'writing-content', label: 'Writing & content', group: 'Scale Faster', defaultPillar: '/pillar5'},
  {value: 'images-design', label: 'Images & design', group: 'Scale Faster', defaultPillar: '/pillar5'},
  {value: 'video', label: 'Video', group: 'Scale Faster', defaultPillar: '/pillar5'},
  {value: 'voice-audio', label: 'Voice & audio', group: 'Scale Faster', defaultPillar: '/pillar5'},
  {value: 'meetings-notes', label: 'Meetings & notes', group: 'Scale Faster', defaultPillar: '/pillar6'},
  {value: 'coding', label: 'Coding', group: 'Scale Faster', defaultPillar: '/pillar3'},
  {value: 'automation-agents', label: 'Automation & agents', group: 'Get Clients', defaultPillar: '/pillar3'},
  // New
  {value: 'website-builders', label: 'Website Builders & CMS', group: 'Get Clients', defaultPillar: '/pillar1'},
  {value: 'hosting-infrastructure', label: 'Hosting & Domains', group: 'Get Clients', defaultPillar: '/pillar1'},
  {value: 'ecommerce', label: 'E-commerce', group: 'Get Clients', defaultPillar: '/pillar1'},
  {value: 'crm', label: 'CRM & Lead Tracking', group: 'Get Clients', defaultPillar: '/pillar2'},
  {value: 'booking-scheduling', label: 'Booking & Scheduling', group: 'Get Clients', defaultPillar: '/pillar2'},
  {value: 'forms-surveys', label: 'Forms & Surveys', group: 'Get Clients', defaultPillar: '/pillar2'},
  {value: 'email-marketing', label: 'Email & Marketing', group: 'Scale Faster', defaultPillar: '/pillar5'},
  {value: 'social-scheduling', label: 'Social Scheduling', group: 'Scale Faster', defaultPillar: '/pillar5'},
  {value: 'project-management', label: 'Project & Task Management', group: 'Scale Faster', defaultPillar: '/pillar6'},
  {value: 'accounting', label: 'Accounting', group: 'See Clearly', defaultPillar: '/pillar7'},
  {value: 'payments-invoicing', label: 'Payments & Invoicing', group: 'See Clearly', defaultPillar: '/pillar7'},
  {value: 'dashboards-reporting', label: 'Dashboards & Reporting', group: 'See Clearly', defaultPillar: '/pillar7'},
] as const satisfies readonly ToolkitCategoryDef[]

export type ToolkitCategory = (typeof TOOLKIT_CATEGORIES)[number]['value']

export const TOOLKIT_CATEGORY_ORDER: ToolkitCategory[] = TOOLKIT_CATEGORIES.map((c) => c.value)

export const TOOLKIT_CATEGORY_LABELS: Record<ToolkitCategory, string> = Object.fromEntries(
  TOOLKIT_CATEGORIES.map((c) => [c.value, c.label]),
) as Record<ToolkitCategory, string>

/** Sanity schema dropdown options derived from the same list. */
export const TOOLKIT_CATEGORY_SANITY_OPTIONS = TOOLKIT_CATEGORIES.map(({value, label}) => ({
  title: label,
  value,
}))

const categoryByValue = new Map(TOOLKIT_CATEGORIES.map((c) => [c.value, c]))

export function getCategoryLabel(category: string): string {
  return categoryByValue.get(category)?.label ?? category
}

export function getCategoryGroup(category: string): ToolkitPhaseGroup | undefined {
  return categoryByValue.get(category)?.group
}

export function getCategoryDefaultPillar(category: string): ToolkitPillarPath | undefined {
  return categoryByValue.get(category)?.defaultPillar
}

export function getGroupedCategories(
  categories: readonly {value: string}[] = TOOLKIT_CATEGORIES,
): Record<ToolkitPhaseGroup, ToolkitCategory[]> {
  const grouped: Record<ToolkitPhaseGroup, ToolkitCategory[]> = {
    'Get Clients': [],
    'Scale Faster': [],
    'See Clearly': [],
  }
  for (const cat of categories) {
    const def = categoryByValue.get(cat.value)
    if (def) grouped[def.group].push(def.value)
  }
  return grouped
}
