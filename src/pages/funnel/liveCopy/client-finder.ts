import type {FunnelProductCopy} from '../funnelCopy'

/** Live upgrade of CLIENT_FINDER_COPY: buy-ready, no Coming soon. */
export const CLIENT_FINDER_LIVE_COPY: FunnelProductCopy = {
  eyebrow: 'Curated list · Scripts · Plan · One sprint',
  h1Generic:
    'Knowing who to call is half the work. Most teams skip straight to hoping',
  h1Personal: (b: string) =>
    `${b}, knowing who to call is half the work. Most teams skip straight to hoping`,
  sub: 'A one-time sprint: we lock who you should chase, hand you 50 to 100 named prospects that fit, write how to approach them, and leave a simple execution plan plus a short automation sketch. Not endless spam from us. Not a lead-gen retainer dressed up as a list.',
  ctaLabel: 'Start Client Finder · $2,800',
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
    'ICP locked. Named list. Scripts. Calendar or booking path. A sketch of automation you can run yourself or ask us to build later.',
  proofAfterGeneric:
    'ICP locked. Named list. Scripts. Calendar or booking path. A sketch of automation you can run yourself or ask us to build later.',
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
    'Named prospects. Honest scripts. A plan you own. No guaranteed meetings. No illegal scraping promises.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'You know who to call',
      text: '50 to 100 named prospects that match the ICP we locked with you, not a scraped dump.',
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
    'Buy floor $2,800. One-time sprint. We do not guarantee appointments, promise illegal scraping, or sell SYSBILT cold-spamming on your behalf as the product.',
  priceLabel: 'Investment',
  price: '$2,800',
  priceLead: 'Paid once when the ICP locks at kickoff.',
  guarantee:
    'We deliver the scoped ICP, list, scripts, and plan. We do not guarantee meetings booked. If the agreed deliverables are not handed over as scoped, we keep working at no extra cost until they are.',
  priceAnchor:
    'About the cost of another quiet month spent hoping the right people call you first.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
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
      q: 'Can I buy this today?',
      a: 'Yes. Fill the access form, we lock the ICP at kickoff, then curate the list, write the scripts, and hand over the plan from the $2,800 floor.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Know who to call before you hope the phone rings',
  finalLine: 'ICP, curated list, scripts, and a plan you can run. One sprint.',
  proofKind: 'client-finder',
}
