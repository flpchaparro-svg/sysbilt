import type {FunnelProductCopy} from '../funnelCopy'

export const CATCH_THE_LEAD_LIVE_COPY = {
  eyebrow: 'Three jobs, one sprint, one location',
  h1Generic: 'They find you, they do not trust the listing yet, and the call that rings out never comes back',
  h1Personal: (b: string) =>
    `${b}, they find you, they do not trust the listing yet, and the call that rings out never comes back`,
  sub: 'Three jobs in one window: your Google listing cleaned up so Maps looks finished, a review ask that keeps firing after every job, and an automatic text when a call rings out. One handover. Paid once at the pack price.',
  ctaLabel: 'Buy Catch the lead, $1,950',
  proofLabel: 'The leak',
  proofHeadingLive: 'Three leaks that feel separate and are not',
  proofHeadingGeneric: 'Three leaks that feel separate and are not',
  proofLead: (b: string | null) =>
    b
      ? `Someone searches for what ${b} does, finds a listing with the wrong hours and four old reviews, rings anyway, and gets voicemail. That is three chances to lose one enquiry, and you never hear about any of them.`
      : 'Someone searches for what you do, finds a listing with the wrong hours and four old reviews, rings anyway, and gets voicemail. That is three chances to lose one enquiry, and you never hear about any of them.',
  proofLeadGeneric:
    'Someone searches for what you do, finds a listing with the wrong hours and four old reviews, rings anyway, and gets voicemail. That is three chances to lose one enquiry, and you never hear about any of them.',
  proofAfter:
    'None of these is a big project. They stay broken because each one alone never feels urgent enough to start.',
  proofAfterGeneric:
    'None of these is a big project. They stay broken because each one alone never feels urgent enough to start.',
  leakHeading: 'Three leaks at the front door',
  leakBody:
    'Thin profile, quiet reviews, and missed calls feel separate. They are one capture problem.',
  painLabel: 'What this is costing you',
  painHeading: 'Ready people leave without any drama',
  painLines: [
    'Your listing looks unfinished next to the business down the road, and people read that as how you run the place.',
    'Reviews stalled, because asking after a visit depends on somebody remembering at the busiest moment of the day.',
    'A call rings out at lunchtime and that person books with whoever answers next.',
    'Fixing them one at a time means three kickoffs you will never find time for.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Found, trusted, and the miss caught, in one window',
  bridgeBody:
    'We do the three full products in one planned window. Google Profile Fix so the listing is claimed or recovered, categories and description filled, photos sorted, review link ready, keys on your account. Review Engine so an automatic ask fires after every completed job, in your words, with a QR and short link, plus reply templates. Missed-Call Text-Back so a ring-out gets your wording by SMS, the reply lands with you, and we prove it on a live miss with you watching. One access conversation, one handoff.',
  bridgeGaugeCaption: 'Seen on Maps. Reviews keep arriving. Missed call answered by text.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes you can feel in a week',
  benefits: [
    {
      title: 'Your team hands over access once',
      text: 'Maps and phone access, one conversation, instead of three separate chases over three separate months.',
    },
    {
      title: 'The three jobs feed each other',
      text: 'A clean listing gets found, fresh reviews make people call, and the text-back catches the calls you miss.',
    },
    {
      title: 'Less than buying them apart',
      text: '$1,950 together, against $2,450 for the same three products bought separately.',
    },
    {
      title: 'A clear next step, not a trap',
      text: 'Booking System is the obvious job after this, when you want Book now. It is not in this pack and you are not committed to it.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Access, build, prove',
  processSteps: [
    {
      label: 'Access',
      text: 'We lock your Google listing, how reviews get asked, and which phone number we watch.',
    },
    {
      label: 'Build',
      text: 'Profile overhaul, the review ask, and missed-call text-back, all inside one delivery window.',
    },
    {
      label: 'Prove',
      text: 'Who owns review asks, who watches the text-backs, and a live missed call with you watching the SMS land.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Three full products, one price',
  stackItems: [
    {
      title: 'Google Profile Fix',
      text: 'Claim or recover, categories, services, attributes, selling description, photos, review link. Ownership stays on your account. Habit guide, Systems Snapshot, 14 days of aftercare. Same scope as the $600 door.',
    },
    {
      title: 'Review Engine',
      text: 'Automatic ask after every completed job, wording in your voice, QR and short link, good and bad reply templates. Systems Snapshot and 14 days of aftercare. Same scope as the $1,100 door.',
    },
    {
      title: 'Missed-Call Text-Back',
      text: 'Automatic SMS when the business number rings out, in your words, replies captured as a lead, proved on a live miss with you watching. 14 days of aftercare. Same scope as the $750 door.',
    },
  ],
  scopeLine:
    'One location, one Australian business number. Google Profile Fix, Review Engine, and Missed-Call Text-Back as scoped at kickoff. Booking System is not included. Extra locations or numbers are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$1,950',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: all three scoped products are delivered, with a live miss proved, or we keep working at no extra cost until they are.',
  priceAnchor:
    'Bought separately the same three jobs are $2,450 and three kickoffs. Together they are $1,950, one access handover, and the listing, the reviews, and the missed call actually work.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why buy the pack instead of the three products?',
      a: 'Partly the $500. Mostly the sequence. These three feed each other, so done together they land in the right order and your team hands over access once.',
    },
    {
      q: 'What exactly is included?',
      a: 'The same three products we sell separately: Google Profile Fix, Review Engine, and Missed-Call Text-Back, at full scope, for one location and one number.',
    },
    {
      q: 'Is a booking button included?',
      a: 'No. Booking System is the natural next job when you want Book now. This pack covers being found, being trusted, and catching the missed call.',
    },
    {
      q: 'Do you write fake reviews?',
      a: 'Never. We ask real customers at the right moment and make it easy to say yes. What they write is up to them.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the three agreed products are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Stop losing enquiries at the front door',
  finalLine: 'Pay once, hand over access once, and close all three gaps in a single sprint.',
  proofKind: 'catch-the-lead',
} as FunnelProductCopy
