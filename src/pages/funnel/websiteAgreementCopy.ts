/**
 * Hosted Website Plan · product agreement copy (repo template, not Notion).
 * One template; tier fills prices and page band.
 */

export type WebsiteTierCode = 'brochure' | 'practice' | 'full'

export const WEBSITE_TIER_META: Record<
  WebsiteTierCode,
  {
    name: string
    pages: string
    monthlyAud: number
    enrolmentAud: number
  }
> = {
  brochure: {
    name: 'Brochure',
    pages: 'one page',
    monthlyAud: 120,
    enrolmentAud: 120,
  },
  practice: {
    name: 'Practice',
    pages: 'five to seven pages',
    monthlyAud: 160,
    enrolmentAud: 160,
  },
  full: {
    name: 'Full site',
    pages: 'nine to twelve pages',
    monthlyAud: 190,
    enrolmentAud: 190,
  },
}

export function isWebsiteTierCode(value: string | null | undefined): value is WebsiteTierCode {
  return value === 'brochure' || value === 'practice' || value === 'full'
}

export type WebsiteAgreementClause = {
  id: string
  title: string
  paragraphs: string[]
}

export function buildWebsiteAgreementClauses(tier: WebsiteTierCode): WebsiteAgreementClause[] {
  const meta = WEBSITE_TIER_META[tier]
  const enrol = `$${meta.enrolmentAud}`
  const monthly = `$${meta.monthlyAud}`

  return [
    {
      id: 'hwa-1',
      title: '1. What this agreement covers',
      paragraphs: [
        `This is the Hosted Website Plan agreement between SYSBILT (ABN 56 115 228 020) and you for the ${meta.name} plan (${meta.pages}).`,
        'We interview you, write the copy we need, build the site on our hosting, and keep it live under the care plan described here. It is not a custom software build, online shop, or membership portal.',
      ],
    },
    {
      id: 'hwa-2',
      title: '2. What you pay',
      paragraphs: [
        `Today you pay ${enrol}. That is one month of the plan and it starts the build (enrolment).`,
        `When your site goes live, monthly autopay of ${monthly} begins on the card you used at checkout. The second charge is intentional. It is the first month of live care, not a duplicate enrolment fee.`,
        'Prices on /go/website are GST-inclusive as shown. We do not add a separate GST line on the funnel price.',
      ],
    },
    {
      id: 'hwa-3',
      title: '3. Term',
      paragraphs: [
        'The minimum term is twelve months from the day your site goes live. After that, the plan continues month to month until either of us ends it with thirty days written notice.',
        'If you leave before the twelve months end, you pay the remaining months of the term at the monthly rate for your plan. That is how the build cost is covered.',
      ],
    },
    {
      id: 'hwa-4',
      title: '4. Delivery',
      paragraphs: [
        'Typical delivery is about fourteen days from a complete brief and a booked interview. Delays on access, content, or approvals pause the clock.',
        'The discovery interview is about twenty minutes and is recorded with your consent so we can build accurately without chasing you for every line.',
      ],
    },
    {
      id: 'hwa-5',
      title: '5. What is included',
      paragraphs: [
        `A ${meta.pages} site on our hosting, with a contact form to your email, search basics, and privacy and terms pages when needed.`,
        'Hosting, SSL, uptime monitoring, and light care edits within the plan. Larger redesigns, new page packs beyond the plan size, e-commerce, and custom apps are out of scope and quoted separately.',
      ],
    },
    {
      id: 'hwa-6',
      title: '6. Your responsibilities',
      paragraphs: [
        'You give truthful business details, approve copy in good time, and keep login and domain access available when we need them.',
        'You are responsible for the accuracy of your offers, licences, and claims. We are not your lawyer or accountant.',
      ],
    },
    {
      id: 'hwa-7',
      title: '7. Leaving and taking the site',
      paragraphs: [
        'You can take a copy of the site content with you. Moving hosting, domains, and integrations off our stack is a separate migration job, quoted as a one-off fee.',
        'Until migration is complete and paid, the live site stays on our hosting under this plan.',
      ],
    },
    {
      id: 'hwa-8',
      title: '8. Acceptance',
      paragraphs: [
        'By signing below you confirm you have read this agreement, you chose the plan named above, and you authorise the enrolment charge today and monthly autopay from go-live.',
        'Electronic signature on this page is binding. A copy stays on our systems for both of us.',
      ],
    },
  ]
}
