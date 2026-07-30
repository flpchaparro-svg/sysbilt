/**
 * Hosted Website Plan · client agreement (repo template, not Notion).
 * Source: Felipe draft v1.0 (23 July 2026), updated for locked billing:
 * one month today to start, monthly autopay at go-live, 14 day delivery,
 * Brochure $120 / Practice $160 / Full $190.
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
  bullets?: string[]
}

export function buildWebsiteAgreementSummary(tier: WebsiteTierCode): {
  title: string
  rows: Array<{label: string; value: string}>
} {
  const meta = WEBSITE_TIER_META[tier]
  return {
    title: 'The deal in one page',
    rows: [
      {
        label: 'What you get',
        value: 'A professional website, written and built by us, hosted by us, kept running',
      },
      {
        label: 'Your plan',
        value: `${meta.name} · ${meta.pages} · $${meta.monthlyAud} a month`,
      },
      {
        label: 'What you pay today',
        value: `$${meta.enrolmentAud}. One month to start the build (enrolment)`,
      },
      {
        label: 'When the monthly starts',
        value: 'The day your site goes live, not the day you pay to begin',
      },
      {
        label: 'Minimum term',
        value: '12 months from go-live, then month to month',
      },
      {
        label: 'How you pay',
        value: 'Card at checkout today, then monthly autopay on that card from go-live',
      },
      {
        label: 'Leaving early',
        value: 'You pay the remaining months of the 12 as a single amount',
      },
      {
        label: 'Taking the site with you',
        value:
          'Available any time for a migration fee, quoted before you commit, based on the size of the site at the time',
      },
      {
        label: 'Your domain',
        value: 'Always yours, whatever happens',
      },
      {
        label: 'Delivery',
        value: 'About 14 days to live from a completed wizard and booked interview',
      },
    ],
  }
}

export function buildWebsiteAgreementClauses(tier: WebsiteTierCode): WebsiteAgreementClause[] {
  const meta = WEBSITE_TIER_META[tier]
  const enrol = `$${meta.enrolmentAud}`
  const monthly = `$${meta.monthlyAud}`
  const earlyExitExample =
    tier === 'brochure'
      ? 'For example, on Brochure at $120 a month, ending after four months leaves eight months, so $960.'
      : tier === 'practice'
        ? 'For example, on Practice at $160 a month, ending after four months leaves eight months, so $1,280.'
        : 'For example, on Full site at $190 a month, ending after four months leaves eight months, so $1,520.'

  return [
    {
      id: 'hwa-1',
      title: '1. Who this agreement is between',
      paragraphs: [
        'Us: SYSBILT, ABN 56 115 228 020, Sydney, New South Wales. Where this agreement says "we", "us" or "our", that means SYSBILT.',
        'You: the business named at checkout and on the signing block. Where this agreement says "you" or "your", that means that business.',
        'This agreement starts on the day you pay your enrolment (one month to start the build).',
      ],
    },
    {
      id: 'hwa-2',
      title: '2. What we are providing',
      paragraphs: [
        `We will write, design, build and host a website for your business on the ${meta.name} plan (${meta.pages}), and we will keep it running while you are on that plan.`,
        'Brochure: one page, who you are, what you do, hours, a map, and a contact form to your email.',
        'Practice: five to seven pages, with room for services, about, and proof.',
        'Full site: nine to twelve pages when you need more room to explain the work.',
        'Every plan includes copy written by us from your wizard answers and your interview, a contact form that emails you, the basic search setup so you can be found, and privacy and terms pages where your site needs them.',
        'The exact page count and inclusions for your plan are confirmed in writing before we build. That written confirmation is what we are agreeing to deliver.',
        'This is not a custom software build, online shop, membership portal, or five thousand dollar agency redesign.',
      ],
    },
    {
      id: 'hwa-3',
      title: '3. What you pay',
      paragraphs: [
        `Today (enrolment): ${enrol}. That is one month of the ${meta.name} plan and it starts the build.`,
        `Monthly: ${monthly}, charged from the day your site goes live on the card you used at checkout. Nothing is charged monthly while we are still building. The second charge around go-live is intentional. It is the first month of live care, not a duplicate enrolment fee.`,
        'No GST line is added on top of the funnel price. Prices are as shown on /go/website.',
        'How we take it: card at checkout today, then monthly autopay on that card from go-live. If a payment fails we will let you know and try again before anything else happens.',
        'Price changes: your monthly fee is fixed for your minimum term. After that, we will give you at least 30 days written notice of any change, and if you do not want to accept it you can cancel without paying anything further.',
      ],
    },
    {
      id: 'hwa-4',
      title: '4. How long this runs',
      paragraphs: [
        'Your minimum term is 12 months, starting the day your site goes live.',
        'After that, it continues month to month until either of us ends it. You can cancel any time after the minimum term with 30 days written notice. We can do the same, and if we do, we will help you move the site somewhere else and we will waive the migration fee.',
      ],
    },
    {
      id: 'hwa-5',
      title: '5. What is included each month (care)',
      paragraphs: [
        'While you are on the plan we provide hosting for your site, an SSL certificate, and security and uptime monitoring.',
        'Care edits on the site we built are included when they are short and sensible. That means small copy tweaks on existing pages, swapping a few images on existing pages (about three image swaps in a request is the right scale), and updating hours, phone, email, address, a services list, or team members. We also fix anything that stops working on the site we built.',
        'These are not a running redesign and not a bank of free build hours. A request that is clearly a bigger job, about half an hour of focused build work or more, a full section rebuild, a new section, or something brand new, is outside care. We will say so before doing the work, never after, and we will quote you.',
      ],
      bullets: [
        'Hosting, SSL, security and uptime monitoring',
        'Short copy edits on existing pages',
        'A few image swaps on existing pages (about three per request is the right scale)',
        'Updates to hours, phone, email, address, services list or team members',
        'Fixes when something we built stops working',
      ],
    },
    {
      id: 'hwa-6',
      title: '6. What is not included',
      paragraphs: [
        'The following are not part of the monthly plan. We will quote a fixed price, or a clear time-based fee for the task, before doing any of them:',
      ],
      bullets: [
        'New pages beyond the count in your plan',
        'Changing the layout or design of a page, or rebuilding a whole section',
        'Adding something completely new that was not in the original build',
        'New features, integrations, booking systems, payments or e-commerce',
        'Content we have to research or write from scratch, beyond the original build',
        'Anything that needs substantial build time (about half an hour or more of focused work)',
      ],
    },
    {
      id: 'hwa-6b',
      title: '6A. How extras are quoted',
      paragraphs: [
        'You always get the price before we start. We never do extra work and invoice you for it afterwards.',
        'Small quoted jobs may be priced as a fixed amount. Larger change work may be priced by time spent on that task, agreed up front. Either way, nothing starts until you accept the quote in writing.',
      ],
    },
    {
      id: 'hwa-7',
      title: '7. Your part',
      paragraphs: [
        'For us to deliver on time, you agree to complete the wizard with accurate information, give us the logo, photos and details we ask for, arrange for your domain to point to our hosting using the method you picked in the wizard, give us feedback and approval within a reasonable time, and cancel your old hosting yourself once we have told you it is safe.',
        'About materials you send us: you confirm you have the right to use the logos, photos, text and anything else you give us, and that using them on your site will not infringe anyone else\'s rights. If a claim is made against us because something you supplied was not yours to use, you agree to cover our reasonable costs in dealing with it.',
      ],
    },
    {
      id: 'hwa-8',
      title: '8. Your domain, your hosting, your email',
      paragraphs: [
        'Your domain stays yours. It stays registered in your name and under your control at all times. We never take ownership of it and we never transfer it away from you.',
        'We host the new site. Your site lives on our hosting while you are on the plan.',
        'Your old hosting is yours to cancel. We will not touch, change or cancel any account of yours, and we will not cancel your old hosting for you. We will tell you exactly when it is safe to do it.',
        'One thing to check: if your email address runs through your old web hosting, cancelling that hosting can switch your email off. We will check this with you before anything changes, and we will tell you what to do so nothing goes dark.',
      ],
    },
    {
      id: 'hwa-9',
      title: '9. Timing',
      paragraphs: [
        'Typical delivery is about 14 days from a completed wizard and a booked interview.',
        'If we are waiting on information, materials, access or approval from you, that clock pauses until it arrives. That is the only thing that moves the date.',
        'Your build includes two rounds of changes. Anything past that gets quoted.',
        'If we cannot start: if you have not submitted the wizard, we will hold your place for 90 days and chase you a few times. If we still cannot begin after 90 days, this agreement ends and the enrolment fee is kept to cover the capacity we reserved and the work already done. Nothing further is charged.',
      ],
    },
    {
      id: 'hwa-10',
      title: '10. Going live',
      paragraphs: [
        'Your site goes live once you have approved it and your domain points to our hosting. That date is the start of your monthly billing and your 12 month term, and we will confirm it to you in writing.',
      ],
    },
    {
      id: 'hwa-11',
      title: '11. Who owns what',
      paragraphs: [
        'Your content is yours. Your logo, your photos, your business information, and anything else you gave us stays yours, always.',
        'The site while you are on the plan: we own the site build and the code behind it, and we license it to you for as long as you are on the plan. That is what makes the monthly price possible. You are not buying a website outright for one month\'s fee.',
        'Taking it with you: you can take the site at any time by paying a migration fee, which we will quote before you commit. The fee depends on the size and complexity of the site at the time (Brochure, Practice or Full, and what has been added). Once that is paid, the site\'s design, code and content become yours outright and we will move it to hosting you control.',
      ],
    },
    {
      id: 'hwa-12',
      title: '12. Leaving before the 12 months are up',
      paragraphs: [
        'You can end this agreement early. If you do, you pay the remaining months of your minimum term as a single amount.',
        earlyExitExample,
        'That figure exists because the monthly price is set on the basis of a full year. Your build costs us considerably more than your first few months cover, and the term is what makes the low monthly possible. Paying out the remaining months puts us where we would have been, and no further.',
        'If you would also like to keep the site on your own hosting, the migration fee applies as set out above. Migration is separate from the remaining-months payout. If you would rather not migrate, the site comes down and your domain stays yours to point wherever you like.',
      ],
    },
    {
      id: 'hwa-13',
      title: '13. If a payment does not go through',
      paragraphs: [
        'We will email you and try the payment again a few days later. If it is still unpaid 14 days after the due date, we will email you again to let you know the site will be suspended. If it reaches 21 days unpaid, we may suspend the site until payment is made. Your domain and your content are not affected by a suspension, and the site goes straight back up once you are up to date.',
        'If an account stays unpaid for 60 days, we may end this agreement, and clause 12 applies to the remaining months.',
      ],
    },
    {
      id: 'hwa-14',
      title: '14. If we need to end it',
      paragraphs: [
        'We can end this agreement with 60 days written notice. If we do that for any reason other than your non-payment or a serious breach by you, we will waive the migration fee, help you move the site to hosting you control, and refund any part of a month you have paid for and will not receive.',
      ],
    },
    {
      id: 'hwa-15',
      title: '15. What we promise, and what we do not',
      paragraphs: [
        'We promise to build what we agreed in writing, to a professional standard, and to keep it running. If what we deliver is not what we agreed, we will keep working at no extra cost until it is.',
        'We will use reasonable efforts to keep your site available and to respond to plan requests within one business day. We cannot guarantee uninterrupted availability, because parts of the internet are not ours to control, but we will fix problems on our side promptly.',
        'We do not promise search rankings. We set up the search basics properly. Where you rank on Google depends on Google, your competitors and many things outside anyone\'s control, and nobody who tells you otherwise is being straight with you.',
        'Things we rely on: your site uses third party services such as hosting infrastructure and domain systems. If one of those has an outage, we will work to restore your site as quickly as we can, but we are not responsible for their failures.',
        'Our liability: if something goes wrong and we are responsible, our total liability is limited to the fees you have paid us in the 12 months before the problem arose. We are not liable for indirect or consequential losses such as lost profits.',
        'Your rights under Australian law: nothing in this agreement excludes, restricts or changes any right or guarantee you have under the Australian Consumer Law or any other law that cannot be excluded. Where a law says we cannot limit something, this agreement does not limit it.',
      ],
    },
    {
      id: 'hwa-16',
      title: '16. Confidentiality and privacy',
      paragraphs: [
        'We will only access what the job needs, and we treat your business information as confidential. We handle personal information in line with our Privacy Policy at sysbilt.com/privacy.',
        'You agree we can name you as a client and show your site as an example of our work. If you would rather we did not, tell us and we will not.',
      ],
    },
    {
      id: 'hwa-17',
      title: '17. If something goes wrong between us',
      paragraphs: [
        'If either of us has a problem with the other, we will raise it in writing first and give the other 14 days to sort it out. Most things get solved with a phone call. If it cannot be resolved that way, either of us can take it further.',
      ],
    },
    {
      id: 'hwa-18',
      title: '18. The general bits',
      paragraphs: [
        'This agreement, plus the written confirmation of your plan\'s inclusions, is the whole agreement between us. Anything discussed beforehand that is not written down here does not form part of it.',
        'Changes to this agreement need to be in writing and agreed by both of us.',
        'This agreement is governed by the laws of New South Wales.',
        'If any part of this agreement turns out to be unenforceable, the rest of it still stands.',
      ],
    },
    {
      id: 'hwa-19',
      title: '19. Acceptance',
      paragraphs: [
        `By signing below you confirm you have read this agreement, you chose the ${meta.name} plan, and you authorise the ${enrol} enrolment charge today and monthly autopay of ${monthly} from go-live.`,
        'Electronic signature on this page is binding. A copy stays on our systems for both of us.',
      ],
    },
  ]
}
