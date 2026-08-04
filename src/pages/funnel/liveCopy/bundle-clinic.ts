import type {FunnelProductCopy} from '../funnelCopy'

/**
 * Live copy for Clinic Capture Bundle.
 * Written for a first-time reader who has never seen the individual product pages.
 */
export const BUNDLE_CLINIC_LIVE_COPY = {
  eyebrow: 'Three jobs, one sprint, one location',
  h1Generic:
    'People are looking for a clinic like yours today. Three small gaps send them next door',
  h1Personal: (b: string) =>
    `${b}, people are looking for a clinic like yours today, and three small gaps send them next door`,
  sub: 'Your Google listing looks half finished, your reviews stopped two years ago, and the calls that ring out never get answered. We close all three in one sprint: the listing cleaned up, a review ask that keeps firing after every visit, and an automatic text back when a call goes unanswered. One kickoff, one location.',
  ctaLabel: 'Buy the Clinic Bundle, $2,200',
  proofLabel: 'The leak',
  proofHeadingLive: 'Three leaks that feel separate and are not',
  proofHeadingGeneric: 'Three leaks that feel separate and are not',
  proofLead: (b: string | null) =>
    b
      ? `Someone searches for what ${b} does, finds a listing with the wrong hours and four old reviews, rings anyway, and gets voicemail. That is three chances to lose one patient, and you never hear about any of them.`
      : 'Someone searches for what you do, finds a listing with the wrong hours and four old reviews, rings anyway, and gets voicemail. That is three chances to lose one patient, and you never hear about any of them.',
  proofLeadGeneric:
    'Someone searches for what you do, finds a listing with the wrong hours and four old reviews, rings anyway, and gets voicemail. That is three chances to lose one patient, and you never hear about any of them.',
  proofAfter:
    'None of these is a big project. They stay broken because each one alone never feels urgent enough to start.',
  proofAfterGeneric:
    'None of these is a big project. They stay broken because each one alone never feels urgent enough to start.',
  painLabel: 'What this is costing you',
  painHeading: 'Patients leave without any drama',
  painLines: [
    'Your listing looks unfinished next to the clinic down the road, and people read that as how you run the place.',
    'Reviews stalled, because asking after a visit depends on somebody remembering at the busiest moment of the day.',
    'A call rings out at lunchtime and that patient books with whoever answers next.',
    'Fixing them one at a time means three kickoffs you will never find time for.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'All three closed in one window',
  bridgeBody:
    'We do the three jobs in one delivery window. We clean the Google Business Profile so Maps looks like a real clinic, with the right hours, services and photos. We put in a review ask that fires after a visit without staff having to remember. And we set up an automatic text when a call rings out, so the person can still book instead of ringing the clinic next door. One access handover, one handoff at the end.',
  bridgeGaugeCaption: 'Found. Trusted. The missed call caught.',
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
      text: '$2,200 together, against $2,450 for the same three products bought separately.',
    },
    {
      title: 'A clear next step, not a trap',
      text: 'Booking System is the obvious job after this, when you want a Book now button. It is not bundled in and you are not committed to it.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Brief, build, hand over',
  processSteps: [
    {
      label: 'Brief',
      text: 'We lock your Google listing, how reviews get asked, and which phone number we watch.',
    },
    {
      label: 'Build',
      text: 'Profile clean-up, the review ask, and missed-call text-back, all inside one delivery window.',
    },
    {
      label: 'Hand over',
      text: 'Who owns review asks, who watches the text-backs, and the five minute monthly check.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, three capture jobs',
  stackItems: [
    {
      title: 'Google Profile Fix',
      text: 'Categories, photos, hours, services and the basics cleaned up so your listing looks finished and easy to trust.',
    },
    {
      title: 'Review Engine',
      text: 'A simple ask after a visit, so new reviews keep arriving without staff having to remember to chase.',
    },
    {
      title: 'Missed-Call Text-Back',
      text: 'When a call rings out, an automatic text goes back, so that patient can still book instead of ringing the clinic next door.',
    },
  ],
  scopeLine:
    'One location. Google Profile Fix, Review Engine and Missed-Call Text-Back as scoped at kickoff. Booking System is not included. Extra locations are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$2,200',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: all three scoped pieces are delivered and tested, or we keep working at no extra cost until they are.',
  priceAnchor:
    '$2,200 covers all three, which is $250 less than buying them apart and one access handover instead of three. Put that next to what a handful of extra patients a month is worth to the clinic, and it stops being a close call.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why buy the bundle instead of the three products?',
      a: 'Partly the $250, mostly the sequence. These three feed each other, so done together they land in the right order and your team hands over access once instead of three times.',
    },
    {
      q: 'What exactly is included?',
      a: 'Three jobs for one location: your Google Business Profile cleaned up, a review ask that keeps firing after visits, and an automatic text when a call rings out. All scoped at kickoff.',
    },
    {
      q: 'Is a booking button included?',
      a: 'No. Booking System is the natural next job when you want a Book now button. This bundle covers being found, being trusted, and catching the missed call.',
    },
    {
      q: 'Do you write fake reviews?',
      a: 'Never. We ask real patients at the right moment and make it easy to say yes. What they write is up to them.',
    },
    {
      q: 'Is this only for clinics?',
      a: 'It is built for clinics and appointment businesses that lose people on Maps, reviews and missed calls. If that is you, it fits, whatever you call yourselves.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the three agreed pieces are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Stop losing patients at the front door',
  finalLine:
    'Pay once, hand over access once, and close all three gaps in a single sprint.',
  proofKind: 'bundle-clinic',
} as FunnelProductCopy
