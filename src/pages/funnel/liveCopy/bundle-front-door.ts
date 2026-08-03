import type {FunnelProductCopy} from '../funnelCopy'

/** Live copy for Front Door Bundle. Wire via funnelCopyForSlug when ready. */
export const BUNDLE_FRONT_DOOR_LIVE_COPY = {
  eyebrow: 'Bundle · One location · Find, trust, book',
  h1Generic: 'Profile, reviews, and booking so demand can land and book',
  h1Personal: (b: string) =>
    `${b}, profile, reviews, and booking so demand can land and book`,
  sub: 'Google Profile Fix, Review Engine, and Booking System as one front-door bundle for businesses ready to take appointments properly.',
  ctaLabel: 'Buy Front Door · $3,400',
  proofLabel: 'The picture',
  proofHeadingLive: 'Find, trust, book',
  proofHeadingGeneric: 'Find, trust, book',
  proofLead: (b: string | null) =>
    b
      ? `${b} can show up on Maps and still lose the booking to a thin profile, quiet reviews, and "call us".`
      : 'Maps without trust is weak. Trust without booking still forces phone tag.',
  proofLeadGeneric:
    'Maps without trust is weak. Trust without booking still forces phone tag.',
  proofAfter: 'Local presence, social proof habit, and Book now in one delivery story.',
  proofAfterGeneric:
    'Local presence, social proof habit, and Book now in one delivery story.',
  painLabel: 'What this is costing you',
  painHeading: 'The front door has three locks',
  painLines: [
    'Profile messy.',
    'Reviews thin.',
    'Booking is still "call us".',
    'Three projects never start together.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Front Door bundle',
  bridgeBody:
    'This is not three kickoffs that never align. It is Profile Fix, Review Engine, and Booking System in one planned window so people can find you, trust you, and book.',
  bridgeGaugeCaption: 'Seen. Trusted. Booked.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {title: 'One narrative for the buyer', text: 'Easy to explain on a call.'},
    {title: 'Bundle list price', text: '$3,400 vs $600 + $1,100 + $1,500.'},
    {title: 'Clinic and service fit', text: 'Anywhere appointments matter.'},
    {title: 'Upsell path', text: 'No-Show Rescue and AI Phone later.'},
  ],
  processLabel: 'How it runs',
  processHeading: 'A short, clear path',
  processSteps: [
    {label: 'Access', text: 'Profile, review path, calendar.'},
    {label: 'Build', text: 'All three in a planned window.'},
    {label: 'Go live', text: 'Book now tested end to end.'},
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Three doors, one delivery',
  stackItems: [
    {title: 'Google Profile Fix', text: 'Included.'},
    {title: 'Review Engine', text: 'Included.'},
    {title: 'Booking System', text: 'Included.'},
  ],
  scopeLine:
    'One location, one calendar system. Profile Fix, Review Engine, and Booking System as scoped at kickoff.',
  priceLabel: 'Investment',
  price: '$3,400',
  priceLead: 'Paid once when profile, review path, and calendar lock at kickoff. Bundle list price.',
  guarantee:
    'All three scoped pieces deliver, or we keep working at no extra cost until they do.',
  priceAnchor: 'Below buying the three doors apart.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
    {
      q: 'What is included?',
      a: 'Google Profile Fix, Review Engine, and Booking System for one location and one calendar system, scoped at kickoff.',
    },
    {
      q: 'Is this only for clinics?',
      a: 'It fits clinics and any service business where appointments matter. Ask if your calendar setup fits.',
    },
    {
      q: 'Why buy the bundle?',
      a: 'One narrative, one window, and $3,400 instead of $600 + $1,100 + $1,500 if you buy the three apart.',
    },
    {
      q: 'What comes after?',
      a: 'No-Show Rescue and AI Phone are common next steps once Book now is live. They are not in this bundle.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the three agreed pieces are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Open the front door properly',
  finalLine: 'Profile, reviews, booking. Paid once.',
  proofKind: 'bundle-front-door',
} as FunnelProductCopy
