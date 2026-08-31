import type {FunnelProductCopy} from '../funnelCopy'

export const MAPS_TRUST_LIVE_COPY = {
  eyebrow: 'Two jobs, one sprint, one location',
  h1Generic: 'They find you, then the listing looks thin and the last review is from 2022',
  h1Personal: (b: string) =>
    `${b}, they find you, then the listing looks thin and the last review is from 2022`,
  sub: 'Two jobs in one window: your Google listing cleaned up so Maps looks finished, and a review ask that keeps firing after every job. Found and believed. One handover.',
  ctaLabel: 'Buy Maps trust, $1,350',
  proofLabel: 'The leak',
  proofHeadingLive: 'Found is wasted if they do not believe you',
  proofHeadingGeneric: 'Found is wasted if they do not believe you',
  proofLead: (b: string | null) =>
    b
      ? `Someone searches for what ${b} does. The hours are wrong, the photos are old, and the last review is years ago. They tap the listing next door.`
      : 'Someone searches for what you do. The hours are wrong, the photos are old, and the last review is years ago. They tap the listing next door.',
  proofLeadGeneric:
    'Someone searches for what you do. The hours are wrong, the photos are old, and the last review is years ago. They tap the listing next door.',
  proofAfter:
    'A clean profile without reviews still looks unfinished. Reviews without a finished profile still look untrusted. They belong together.',
  proofAfterGeneric:
    'A clean profile without reviews still looks unfinished. Reviews without a finished profile still look untrusted. They belong together.',
  leakHeading: 'Thin listing, quiet proof',
  leakBody: 'Wrong hours and stalled reviews feel separate. They are one Maps trust problem.',
  painLabel: 'What this is costing you',
  painHeading: 'People decide in five seconds',
  painLines: [
    'Your listing looks unfinished next to the business down the road, and people read that as how you run things.',
    'Reviews stalled, because asking after a job depends on somebody remembering at the busiest moment of the day.',
    'You cleaned categories once, then never touched the ask.',
    'Two separate jobs means two kickoffs, so in practice neither of them ever starts.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Finished listing, reviews that keep arriving',
  bridgeBody:
    'We do both full products in one planned window. Google Profile Fix so the listing is claimed or recovered, categories and description filled, photos sorted, review link ready, keys on your account. Review Engine so an automatic ask fires after every completed job, in your words, with a QR and short link, plus reply templates. One access conversation, one handoff.',
  bridgeGaugeCaption: 'Seen on Maps. Reviews keep arriving.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes you can feel on Maps',
  benefits: [
    {
      title: 'The listing looks run',
      text: 'Hours, photos, categories, and description match the business people actually walk into.',
    },
    {
      title: 'The ask does not depend on memory',
      text: 'After a job, the review request fires without staff having to remember.',
    },
    {
      title: 'Less than buying them apart',
      text: '$1,350 together, against $1,700 for the same two products bought separately.',
    },
    {
      title: 'A clear next step, not a trap',
      text: 'Profile Posting or Booking System are the usual jobs after this. Neither is in this pack.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Access, build, hand over',
  processSteps: [
    {
      label: 'Access',
      text: 'We lock your Google listing and how reviews get asked after a job.',
    },
    {
      label: 'Build',
      text: 'Profile overhaul and the review ask, inside one delivery window.',
    },
    {
      label: 'Hand over',
      text: 'Who owns the five-minute monthly check, and who watches the ask.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Two full products, one price',
  stackItems: [
    {
      title: 'Google Profile Fix',
      text: 'Claim or recover, categories, services, attributes, selling description, photos, review link. Ownership stays on your account. Habit guide, Systems Snapshot, 14 days of aftercare. Same scope as the $600 door.',
    },
    {
      title: 'Review Engine',
      text: 'Automatic ask after every completed job, wording in your voice, QR and short link, good and bad reply templates. Systems Snapshot and 14 days of aftercare. Same scope as the $1,100 door.',
    },
  ],
  scopeLine:
    'One location. Google Profile Fix and Review Engine as scoped at kickoff. Profile Posting, Booking System, and Missed-Call Text-Back are not included. Extra locations are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$1,350',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: both scoped products are delivered, or we keep working at no extra cost until they are.',
  priceAnchor:
    'Bought separately the same two jobs are $1,700 and two kickoffs. Together they are $1,350, one access handover, and the listing finally looks like a business somebody runs.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why buy the pack instead of the two products?',
      a: 'Partly the $350. Mostly the sequence. A clean listing without reviews still looks unfinished. Done together they land in the right order and your team hands over access once.',
    },
    {
      q: 'What exactly is included?',
      a: 'The same two products we sell separately: Google Profile Fix and Review Engine, at full scope, for one location.',
    },
    {
      q: 'Do you write fake reviews?',
      a: 'Never. We ask real customers at the right moment and make it easy to say yes. What they write is up to them.',
    },
    {
      q: 'Is this local SEO or ranking work?',
      a: 'No. This pack is profile cleanup and review asks. We do not promise map pack rankings.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the two agreed products are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Look finished, then stay believed',
  finalLine: 'Pay once, hand over access once, and close the listing and the review ask in a single sprint.',
  proofKind: 'maps-trust',
} as FunnelProductCopy
