/**
 * SYSBILT Feedback Review · Phase 1 config (pass 4).
 *
 * Default `/r/sysbilt` = general (seven services).
 * `?catalog=products` = /go product list for a specific product send.
 */

export const SYSBILT_GOOGLE_REVIEW_URL =
  'https://g.page/r/CVcWJ7MFH-c5EBM/review' as const

export const HAPPY_THRESHOLD = 4

/** Seven reader-facing services (never "pillar" in UI). */
export type GeneralServiceId =
  | 'websites'
  | 'crm'
  | 'automation'
  | 'ai'
  | 'content'
  | 'training'
  | 'dashboards'
  | 'other'

export const GENERAL_SERVICE_OPTIONS: {
  id: GeneralServiceId
  label: string
  blurb: string
}[] = [
  {
    id: 'websites',
    label: 'Website or e-commerce',
    blurb: 'A website, landing pages, or an online shop.',
  },
  {
    id: 'crm',
    label: 'CRM or lead tracking',
    blurb: 'A CRM, pipeline, or follow-up for enquiries.',
  },
  {
    id: 'automation',
    label: 'Automation',
    blurb: 'Jobs that run on their own after a lead, booking, or payment.',
  },
  {
    id: 'ai',
    label: 'AI assistants',
    blurb: 'Website chat, phone AI, or AI for your team.',
  },
  {
    id: 'content',
    label: 'Content systems',
    blurb: 'Posting, blogs, or a system that keeps content moving.',
  },
  {
    id: 'training',
    label: 'Team training',
    blurb: 'Training so your people can run what we built.',
  },
  {
    id: 'dashboards',
    label: 'Dashboards or reporting',
    blurb: 'Screens or reports that show the numbers that matter.',
  },
  {
    id: 'other',
    label: 'Something else',
    blurb: 'Not on this list. You can type what it was.',
  },
]

/** Product catalogue for a specific /go job send. */
export type ProductServiceId =
  | 'website'
  | 'speed-fix'
  | 'google-profile'
  | 'quote-capture'
  | 'search-fix'
  | 'other'

export const PRODUCT_SERVICE_OPTIONS: {
  id: ProductServiceId
  label: string
  blurb: string
}[] = [
  {
    id: 'website',
    label: 'Hosted website',
    blurb: 'A new site or a rebuild.',
  },
  {
    id: 'speed-fix',
    label: 'Website Speed Fix',
    blurb: 'Making your site load faster.',
  },
  {
    id: 'google-profile',
    label: 'Google Profile Fix',
    blurb: 'Cleaning up your Google Business Profile.',
  },
  {
    id: 'quote-capture',
    label: 'Quote Capture',
    blurb: 'The quote wizard on your website.',
  },
  {
    id: 'search-fix',
    label: 'Search Visibility Fix',
    blurb: 'Getting pages back into Google.',
  },
  {
    id: 'other',
    label: 'Something else',
    blurb: 'Not on this list. You can type what it was.',
  },
]

export const PRODUCT_JOB_QUERY_MAP: Record<string, ProductServiceId> = {
  website: 'website',
  'hosted-website': 'website',
  'speed-fix': 'speed-fix',
  speed: 'speed-fix',
  'google-profile': 'google-profile',
  profile: 'google-profile',
  'quote-capture': 'quote-capture',
  quote: 'quote-capture',
  'search-fix': 'search-fix',
  search: 'search-fix',
}

export const GENERAL_JOB_QUERY_MAP: Record<string, GeneralServiceId> = {
  websites: 'websites',
  website: 'websites',
  ecommerce: 'websites',
  'e-commerce': 'websites',
  crm: 'crm',
  automation: 'automation',
  ai: 'ai',
  content: 'content',
  training: 'training',
  dashboards: 'dashboards',
  dashboard: 'dashboards',
}

export type ChoiceOption = {
  id: string
  label: string
  blurb: string
  weak?: boolean
}

export const RESULT_OPTIONS: ChoiceOption[] = [
  {
    id: 'nailed',
    label: 'Nailed it',
    blurb: 'Matches what we agreed, or better.',
  },
  {
    id: 'solid',
    label: 'Solid',
    blurb: 'Good work. Small niggles only.',
  },
  {
    id: 'mixed',
    label: 'Mixed',
    blurb: 'Some good, some unfinished.',
    weak: true,
  },
  {
    id: 'missed',
    label: 'Missed',
    blurb: 'Not what we needed.',
    weak: true,
  },
]

/** Positive result picks: no follow-up box. */
export const RESULT_INSTANT_IDS = ['nailed', 'solid'] as const

export const ATTENTION_OPTIONS: ChoiceOption[] = [
  {
    id: 'tight',
    label: 'In the loop',
    blurb: 'Clear updates. No chasing.',
  },
  {
    id: 'fine',
    label: 'Fine',
    blurb: 'Enough contact. Fine.',
  },
  {
    id: 'spotty',
    label: 'Spotty',
    blurb: 'I had to follow up.',
    weak: true,
  },
  {
    id: 'silent',
    label: 'Ignored',
    blurb: 'Hard to get answers.',
    weak: true,
  },
]

export const ATTENTION_INSTANT_IDS = ['tight', 'fine'] as const

export const COMFORT_OPTIONS: ChoiceOption[] = [
  {
    id: 'yes',
    label: 'Yes, fully',
    blurb: 'Looked after the whole way.',
  },
  {
    id: 'mostly',
    label: 'Mostly',
    blurb: 'Comfortable. A few bumps.',
  },
  {
    id: 'uneasy',
    label: 'Not really',
    blurb: 'I second-guessed it.',
    weak: true,
  },
  {
    id: 'no',
    label: 'No',
    blurb: 'Stressful. Not again.',
    weak: true,
  },
]

export const COMFORT_INSTANT_IDS = ['yes', 'mostly'] as const

export const PERSON_OPTIONS: ChoiceOption[] = [
  {
    id: 'excellent',
    label: 'Excellent',
    blurb: 'Easy, clear, and on it.',
  },
  {
    id: 'good',
    label: 'Good',
    blurb: 'Solid to work with.',
  },
  {
    id: 'mixed',
    label: 'Mixed',
    blurb: 'Some good days, some friction.',
    weak: true,
  },
  {
    id: 'hard',
    label: 'Hard',
    blurb: 'Tough to work with.',
    weak: true,
  },
]

/** Positive person picks: no follow-up box. */
export const PERSON_INSTANT_IDS = ['excellent', 'good'] as const

export const MATERIALS_OPTIONS: ChoiceOption[] = [
  {
    id: 'crystal',
    label: 'Crystal clear',
    blurb: 'I always knew what I had.',
  },
  {
    id: 'mostly',
    label: 'Mostly clear',
    blurb: 'A couple of fuzzy bits.',
  },
  {
    id: 'confusing',
    label: 'Confusing',
    blurb: 'I had to ask a lot.',
    weak: true,
  },
  {
    id: 'unclear',
    label: 'Unclear',
    blurb: 'I was often guessing.',
    weak: true,
  },
]

export const MATERIALS_INSTANT_IDS = ['crystal', 'mostly'] as const

export const IMPROVE_BETTER_OPTIONS: ChoiceOption[] = [
  {
    id: 'perfect',
    label: 'All was perfect',
    blurb: 'Nothing to change. Keep going.',
  },
  {
    id: 'result',
    label: 'The result',
    blurb: 'Quality of the finished work.',
    weak: true,
  },
  {
    id: 'explain',
    label: 'How you explain',
    blurb: 'Clearer briefs and decisions.',
    weak: true,
  },
  {
    id: 'updates',
    label: 'Updates',
    blurb: 'More contact, less chase.',
    weak: true,
  },
]

/** Positive improve-better pick: no follow-up box. */
export const IMPROVE_BETTER_INSTANT_IDS = ['perfect'] as const

export const IMPROVE_FASTER_OPTIONS: ChoiceOption[] = [
  {
    id: 'perfect',
    label: 'Pace was right',
    blurb: 'Nothing felt slow.',
  },
  {
    id: 'start',
    label: 'Getting started',
    blurb: 'Kickoff took too long.',
    weak: true,
  },
  {
    id: 'replies',
    label: 'Getting answers',
    blurb: 'Replies came too late.',
    weak: true,
  },
  {
    id: 'delivery',
    label: 'Final delivery',
    blurb: 'The last stretch dragged.',
    weak: true,
  },
]

export const IMPROVE_FASTER_INSTANT_IDS = ['perfect'] as const

export const AGAIN_OPTIONS: ChoiceOption[] = [
  {
    id: 'yes',
    label: 'Yes',
    blurb: 'Hire again or send someone.',
  },
  {
    id: 'likely',
    label: 'Likely',
    blurb: 'For the right job, yes.',
  },
  {
    id: 'maybe',
    label: 'Maybe',
    blurb: 'Depends. Not a hard no.',
    weak: true,
  },
  {
    id: 'no',
    label: 'No',
    blurb: 'I would look elsewhere.',
    weak: true,
  },
]

export function serviceLabel(
  catalog: 'general' | 'products',
  id: string | null,
  otherText: string,
): string {
  if (id === 'other') {
    const t = otherText.trim()
    return t || 'the work we did together'
  }
  const list =
    catalog === 'products' ? PRODUCT_SERVICE_OPTIONS : GENERAL_SERVICE_OPTIONS
  const found = list.find((s) => s.id === id)
  return found?.label ?? 'the work we did together'
}

/** What specifically was done, keyed by service id (general or product). */
export const SERVICE_DETAIL_BY_ID: Record<string, ChoiceOption[]> = {
  websites: [
    {id: 'full-site', label: 'Full website', blurb: 'A new site or a rebuild.'},
    {id: 'landing', label: 'Landing page', blurb: 'A page for ads or a campaign.'},
    {id: 'shop', label: 'Online shop', blurb: 'Products, cart, checkout.'},
    {id: 'forms', label: 'Contact forms', blurb: 'Enquiry forms that actually work.'},
    {id: 'fixes', label: 'Site fixes', blurb: 'Broken bits, updates, cleanup.'},
    {id: 'other-detail', label: 'Something else', blurb: 'Not on this list. You can type it.', weak: true},
  ],
  website: [
    {id: 'full-site', label: 'Full website', blurb: 'A new site or a rebuild.'},
    {id: 'landing', label: 'Landing page', blurb: 'A page for ads or a campaign.'},
    {id: 'shop', label: 'Online shop', blurb: 'Products, cart, checkout.'},
    {id: 'forms', label: 'Contact forms', blurb: 'Enquiry forms that actually work.'},
    {id: 'fixes', label: 'Site fixes', blurb: 'Broken bits, updates, cleanup.'},
    {id: 'other-detail', label: 'Something else', blurb: 'Not on this list. You can type it.', weak: true},
  ],
  crm: [
    {id: 'setup', label: 'CRM setup', blurb: 'Getting the CRM in place.'},
    {id: 'pipeline', label: 'Pipeline', blurb: 'Stages, deals, who owns what.'},
    {id: 'followup', label: 'Follow-up', blurb: 'Reminders and chase sequences.'},
    {id: 'cleanup', label: 'Cleanup', blurb: 'Messy data sorted out.'},
    {id: 'other-detail', label: 'Something else', blurb: 'Not on this list. You can type it.', weak: true},
  ],
  automation: [
    {id: 'lead-flow', label: 'Lead flow', blurb: 'What happens when an enquiry lands.'},
    {id: 'job-flow', label: 'Job flow', blurb: 'After a job is booked or done.'},
    {id: 'alerts', label: 'Alerts', blurb: 'Texts or emails when something matters.'},
    {id: 'other-detail', label: 'Something else', blurb: 'Not on this list. You can type it.', weak: true},
  ],
  ai: [
    {id: 'site-chat', label: 'Website chat', blurb: 'Chat on the site that answers people.'},
    {id: 'phone', label: 'Phone AI', blurb: 'A voice agent on the phone.'},
    {id: 'team-ai', label: 'Team AI', blurb: 'AI your staff use day to day.'},
    {id: 'other-detail', label: 'Something else', blurb: 'Not on this list. You can type it.', weak: true},
  ],
  content: [
    {id: 'posting', label: 'Social posting', blurb: 'Posts going out on a cadence.'},
    {id: 'blog', label: 'Blog or articles', blurb: 'Longer pieces on the site.'},
    {id: 'system', label: 'Publishing system', blurb: 'Draft to publish without chaos.'},
    {id: 'other-detail', label: 'Something else', blurb: 'Not on this list. You can type it.', weak: true},
  ],
  training: [
    {id: 'workshop', label: 'Workshop', blurb: 'A live training session.'},
    {id: 'playbook', label: 'Playbook', blurb: 'Written how-to for the team.'},
    {id: 'handover', label: 'Handover', blurb: 'Walking people through the build.'},
    {id: 'other-detail', label: 'Something else', blurb: 'Not on this list. You can type it.', weak: true},
  ],
  dashboards: [
    {id: 'live-board', label: 'Live dashboard', blurb: 'Numbers on one screen.'},
    {id: 'weekly', label: 'Weekly report', blurb: 'A report you get each week.'},
    {id: 'tracking', label: 'Tracking setup', blurb: 'Forms, ads, or source tracking.'},
    {id: 'other-detail', label: 'Something else', blurb: 'Not on this list. You can type it.', weak: true},
  ],
  'speed-fix': [
    {id: 'speed', label: 'Speed work', blurb: 'Making pages load faster.'},
    {id: 'images', label: 'Images and media', blurb: 'Heavy files cleaned up.'},
    {id: 'other-detail', label: 'Something else', blurb: 'Not on this list. You can type it.', weak: true},
  ],
  'google-profile': [
    {id: 'profile-clean', label: 'Profile cleanup', blurb: 'Categories, hours, photos, text.'},
    {id: 'claim', label: 'Claim or access', blurb: 'Getting control of the listing.'},
    {id: 'other-detail', label: 'Something else', blurb: 'Not on this list. You can type it.', weak: true},
  ],
  'quote-capture': [
    {id: 'wizard', label: 'Quote wizard', blurb: 'Questions that build a quote.'},
    {id: 'rates', label: 'Rate card', blurb: 'Prices locked into the flow.'},
    {id: 'other-detail', label: 'Something else', blurb: 'Not on this list. You can type it.', weak: true},
  ],
  'search-fix': [
    {id: 'index', label: 'Pages in Google', blurb: 'Getting pages back in search.'},
    {id: 'sitemap', label: 'Sitemap / crawl', blurb: 'Helping Google find the site.'},
    {id: 'other-detail', label: 'Something else', blurb: 'Not on this list. You can type it.', weak: true},
  ],
}

/** Ids that advance with no write box on the service-detail step. */
export function serviceDetailInstantIds(serviceId: string | null): string[] {
  return detailsForService(serviceId)
    .filter((o) => o.id !== 'other-detail')
    .map((o) => o.id)
}

export function detailsForService(serviceId: string | null): ChoiceOption[] {
  if (!serviceId || serviceId === 'other') return []
  return SERVICE_DETAIL_BY_ID[serviceId] ?? []
}

/**
 * What stood out about the person. Multi-pick so reviews do not all sound the same.
 */
export const PERSON_TRAIT_OPTIONS: ChoiceOption[] = [
  {
    id: 'clear',
    label: 'Explained things clearly',
    blurb: 'No jargon fog.',
  },
  {
    id: 'fast',
    label: 'Quick to reply',
    blurb: 'Did not leave me waiting.',
  },
  {
    id: 'patient',
    label: 'Patient',
    blurb: 'Happy to go over things again.',
  },
  {
    id: 'honest',
    label: 'Straight with me',
    blurb: 'Said what was possible, and what was not.',
  },
  {
    id: 'organised',
    label: 'Organised',
    blurb: 'Knew the next step every time.',
  },
  {
    id: 'skilled',
    label: 'Knew their stuff',
    blurb: 'Competent on the work.',
  },
  {
    id: 'calm',
    label: 'Calm under pressure',
    blurb: 'Steady when things got messy.',
  },
  {
    id: 'listened',
    label: 'Actually listened',
    blurb: 'Heard what I needed, not a script.',
  },
]

export const PERSON_TRAIT_LINES: Record<string, string> = {
  clear: 'explained things in plain language',
  fast: 'was quick to reply',
  patient: 'was patient when I had questions',
  honest: 'was straight about what was possible',
  organised: 'kept the work organised',
  skilled: 'really knew their stuff',
  calm: 'stayed calm when things got messy',
  listened: 'actually listened to what we needed',
}

export const DETAIL_LINES: Record<string, string> = {
  'full-site': 'a full website',
  landing: 'a landing page',
  shop: 'an online shop',
  forms: 'contact forms',
  fixes: 'fixes on the existing site',
  'other-detail': 'website work',
  setup: 'CRM setup',
  pipeline: 'pipeline work',
  followup: 'follow-up setup',
  cleanup: 'CRM cleanup',
  'lead-flow': 'lead automation',
  'job-flow': 'job automation',
  alerts: 'alert automation',
  'other-auto': 'automation',
  'site-chat': 'website chat',
  phone: 'phone AI',
  'team-ai': 'team AI',
  'other-ai': 'AI help',
  posting: 'social posting',
  blog: 'blog content',
  system: 'a publishing system',
  'other-content': 'content work',
  workshop: 'a training workshop',
  playbook: 'a playbook for the team',
  handover: 'a handover',
  'other-train': 'training',
  'live-board': 'a live dashboard',
  weekly: 'weekly reporting',
  tracking: 'tracking setup',
  'other-dash': 'reporting',
  speed: 'website speed work',
  images: 'image and media cleanup',
  'other-speed': 'speed work',
  'profile-clean': 'Google profile cleanup',
  claim: 'profile claim and access',
  'other-profile': 'Google profile work',
  wizard: 'a quote wizard',
  rates: 'a locked rate card',
  'other-quote': 'quote capture work',
  index: 'getting pages into Google',
  sitemap: 'sitemap and crawl fixes',
  'other-search': 'search visibility work',
}

/**
 * Phase 1: deterministic draft from structured answers (no AI yet).
 * Uses service detail + person traits so reviews do not all read the same.
 */
export function buildFakeDraft(input: {
  serviceLabel: string
  detailId: string | null
  detailOther: string
  score: number
  personName: string
  resultId: string | null
  attentionId: string | null
  comfortId: string | null
  personId: string | null
  personTraitIds: string[]
  materialsId: string | null
  againId: string | null
  extraNote?: string
}): string {
  const person = input.personName.trim()
  const otherDetail = input.detailOther.trim()
  const extra = (input.extraNote || '').trim()
  const detail =
    input.detailId === 'other-detail' && otherDetail
      ? otherDetail
      : (input.detailId && DETAIL_LINES[input.detailId]) || input.serviceLabel
  const bits: string[] = []

  bits.push(`We worked with SYSBILT on ${detail}.`)

  if (input.resultId === 'nailed') {
    bits.push('The finished work was what we needed.')
  } else if (input.resultId === 'solid') {
    bits.push('The result was good and ready to use.')
  }

  if (input.attentionId === 'tight') {
    bits.push('They kept me in the loop.')
  } else if (input.attentionId === 'fine') {
    bits.push('Updates were enough.')
  }

  if (input.comfortId === 'yes') {
    bits.push('I felt looked after.')
  } else if (input.comfortId === 'mostly') {
    bits.push('I felt mostly comfortable working with them.')
  }

  if (person && (input.personId === 'excellent' || input.personId === 'good')) {
    const traits = input.personTraitIds
      .map((id) => PERSON_TRAIT_LINES[id])
      .filter(Boolean)
    if (traits.length === 0) {
      bits.push(
        input.personId === 'excellent'
          ? `${person} was excellent to work with.`
          : `${person} was good to work with.`,
      )
    } else if (traits.length === 1) {
      bits.push(`${person} ${traits[0]}.`)
    } else if (traits.length === 2) {
      bits.push(`${person} ${traits[0]}, and ${traits[1]}.`)
    } else {
      const last = traits[traits.length - 1]
      const head = traits.slice(0, -1).join(', ')
      bits.push(`${person} ${head}, and ${last}.`)
    }
  }

  if (input.materialsId === 'crystal') {
    bits.push('What they sent was easy to follow.')
  } else if (input.materialsId === 'mostly') {
    bits.push('The materials were mostly clear.')
  }

  if (extra && extra.length <= 140) {
    bits.push(extra.replace(/[.!?]+$/, '') + '.')
  }

  if (input.againId === 'yes' || input.againId === 'likely') {
    bits.push('I would work with them again.')
  }

  return bits.join(' ').replace(/\s+/g, ' ').trim()
}
