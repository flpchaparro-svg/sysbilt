import type {FunnelProductCopy} from '../funnelCopy'

/** Live upgrade of CLIENT_FINDER_COPY: buy-ready, no Coming soon. */
export const CLIENT_FINDER_LIVE_COPY: FunnelProductCopy = {
  eyebrow: 'One sprint, then the list is yours to keep',
  h1Generic:
    'Knowing who to call is half the work. Most teams skip straight to hoping',
  h1Personal: (b: string) =>
    `${b}, knowing who to call is half the work, and most teams skip straight to hoping`,
  sub: "One sprint, and you finish it with a list of 50 to 100 named businesses worth your time, the words to approach them with, and an order to work through. Not a bought list of five thousand strangers, and not a monthly retainer that bills you for activity while nobody can say who's actually a fit.",
  ctaLabel: 'Start Client Finder, $2,800',
  proofLabel: 'The gap',
  proofHeadingLive: 'Hope is not a prospecting system',
  proofHeadingGeneric: 'Hope is not a prospecting system',
  proofLead: (b: string | null) =>
    b
      ? `${b}'s team knows the work is good. The open question is who to call this month, and what to say without sounding like a bot.`
      : 'Your team knows the work is good. The open question is who to call this month, and what to say without sounding like a bot.',
  proofLeadGeneric:
    'Your team knows the work is good. The open question is who to call this month, and what to say without sounding like a bot.',
  proofAfter:
    'You finish with a clear definition of who is worth chasing, the named list, the scripts, a path from reply to booking, and a short automation outline you can run yourself later.',
  proofAfterGeneric:
    'You finish with a clear definition of who is worth chasing, the named list, the scripts, a path from reply to booking, and a short automation outline you can run yourself later.',
  painLabel: 'What this is costing you',
  painHeading: "You're busy, and the pipeline still depends on luck",
  painLines: [
    'Referrals are great until a quiet month arrives and nobody knows who to ring.',
    'Bought lists and spray outreach burn trust and often break the rules.',
    'Endless "lead gen" retainers sell activity. You still do not know who actually fits.',
    'Without a short list and a script, the team defaults to hoping the phone rings.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'One sprint: list, scripts, and a plan you can run',
  bridgeBody:
    "This isn't SYSBILT sending cold spam on your behalf, and it isn't a promise of booked appointments. It's a one-time sprint: lock your ICP (ideal customer profile: who is worth chasing), curate 50 to 100 named prospects that fit, write approach scripts, map a calendar or booking path, and leave a short automation sketch you can run or ask us to build later.",
  bridgeGaugeCaption:
    'Named prospects. Honest scripts. A plan you own and keep.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'What you walk away holding',
  benefits: [
    {
      title: 'You know who to call',
      text: '50 to 100 named businesses that match the profile we agreed with you, not a scraped dump nobody would ring.',
    },
    {
      title: 'You know what to say',
      text: 'Approach scripts your team can use without sounding like a bulk sequence.',
    },
    {
      title: 'A path to a booking',
      text: 'How the reply turns into a calendar slot or booking link, so warm interest does not die in the inbox.',
    },
    {
      title: 'A sketch, not a trap',
      text: 'A short automation outline you can run yourself or ask us to build later. The sprint stands alone.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'One sprint, then the list is yours',
  processSteps: [
    {
      label: 'ICP',
      text: 'Lock who fits: industry, size, geography, and the pain you actually solve.',
    },
    {
      label: 'List and scripts',
      text: 'Curate 50 to 100 named prospects, plus approach wording your team can send or say.',
    },
    {
      label: 'Plan',
      text: 'Execution order, booking path, and a short automation sketch for later if you want it.',
    },
  ],
  stackLabel: 'What you get',
  stackHeading: 'One-time sprint, not a forever spam machine',
  stackItems: [
    {
      title: 'ICP locked',
      text: 'A plain definition of who is worth chasing, so the list stays honest.',
    },
    {
      title: '50 to 100 named prospects',
      text: 'People and companies that fit. Curated. Not a promise that every row will take a meeting.',
    },
    {
      title: 'Approach scripts',
      text: 'What to say in the first touch and the follow-up, in your voice.',
    },
    {
      title: 'Execution plan and booking path',
      text: 'Order of outreach, and how replies land on a calendar or booking link.',
    },
    {
      title: 'Automation sketch',
      text: 'A short outline you can run yourselves or ask us to build later. Not included as ongoing spam from SYSBILT.',
    },
  ],
  scopeLine:
    'Fixed price, one sprint, with who you are chasing agreed at kickoff. We do not guarantee appointments, promise dodgy scraping, or send cold outreach on your behalf as part of this.',
  priceLabel: 'Investment',
  price: '$2,800',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the agreed list, scripts and plan are handed over, or we keep working at no extra cost until they are. What we will not promise is meetings booked, because that depends on your offer and your follow-through.',
  priceAnchor:
    'Work out what one new client is worth to you over a year. If the list produces a single one, this has already paid for itself, and you keep the list, the scripts and the plan either way. The alternative is another quiet month hoping the right people ring you first.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why is this $2,800 when I can buy a list for a hundred?',
      a: 'Because the expensive part is the thinking, not the rows. Anyone will sell you five thousand scraped contacts, and you will not ring a single one of them. This is a short list of businesses that genuinely fit, with the words to approach them and an order to work through.',
    },
    {
      q: 'Do you guarantee appointments?',
      a: 'No. We hand you who to contact and how. Whether they book depends on your offer, timing, and follow-through. Anyone selling guaranteed meetings from a list is overselling.',
    },
    {
      q: 'Will SYSBILT send the outreach for us?',
      a: 'Not as this product. This sprint leaves you the list, scripts, and plan. If you later want us to build automation, that is a separate build, not cold spam sold as the core offer.',
    },
    {
      q: 'Is this illegal scraping?',
      a: 'No. We do not promise illegal scraping or shady data buys. Sources stay within ordinary, lawful research and the tools you already have a right to use.',
    },
    {
      q: 'Is this an ongoing lead-gen retainer?',
      a: 'No. One-time sprint. You leave with the list and the plan. Retainers and ongoing sending are a different conversation if you ever want that.',
    },
    {
      q: 'How many prospects do we get?',
      a: 'Typically 50 to 100 named rows that fit the ICP. Quality over dumping thousands of bad fits into a spreadsheet.',
    },
    {
      q: 'How soon can we start?',
      a: 'As soon as you pay. You fill in the access form, we agree who you are chasing at kickoff, then curate the list, write the scripts and hand over the plan.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Know who to call before you hope the phone rings',
  finalLine: 'ICP, curated list, scripts, and a plan you can run. One sprint.',
  proofKind: 'client-finder',
}
