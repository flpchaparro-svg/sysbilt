import type {FunnelProductCopy} from '../funnelCopy'

/**
 * Live copy for Front Door Bundle.
 * Written for a first-time reader who has never seen the individual product pages.
 */
export const BUNDLE_FRONT_DOOR_LIVE_COPY = {
  eyebrow: 'Bundle · One location · Find, trust, book',
  h1Generic: 'Profile, reviews, and booking so demand can land and book',
  h1Personal: (b: string) =>
    `${b}, profile, reviews, and booking so demand can land and book`,
  sub: 'Three front-door jobs in one sprint: we clean your Google listing, set a review ask that keeps firing, and put Book now on the site or Maps so people can book without phone tag. One kickoff. One location.',
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
  proofAfter: 'Local presence, a review habit, and Book now in one delivery story.',
  proofAfterGeneric:
    'Local presence, a review habit, and Book now in one delivery story.',
  painLabel: 'What this is costing you',
  painHeading: 'The front door has three locks',
  painLines: [
    'Your Google listing looks unfinished next to the business down the road.',
    'Reviews stall because nobody asks after a visit or job.',
    'Booking is still "call us", so demand dies in phone tag.',
    'Three separate projects never start together.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Front Door bundle',
  bridgeBody:
    'We do three jobs in one planned window. Clean the Google Business Profile so Maps looks finished. Install a review ask that fires after a visit or job. Put Book now on the site, Maps, or both so people can book without ringing. One access chat. One handoff.',
  bridgeGaugeCaption: 'Seen. Trusted. Booked.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes you can feel at the door',
  benefits: [
    {
      title: 'One story on the call',
      text: 'Find on Maps, trust from reviews, book without phone tag. Easy to explain in one sentence.',
    },
    {
      title: 'One kickoff, three jobs',
      text: '$3,400 in one window vs $600 + $1,100 + $1,500 with three separate access chases.',
    },
    {
      title: 'Built for appointments',
      text: 'Clinics and service businesses where people need a time on the calendar, not a brochure.',
    },
    {
      title: 'Natural next steps',
      text: 'Add No-Show Rescue or AI Phone later once Book now is live. They are not in this bundle.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'A short, clear path',
  processSteps: [
    {
      label: 'Access',
      text: 'We lock your Google listing, how reviews get asked, and which calendar Book now should use.',
    },
    {
      label: 'Build',
      text: 'Profile clean-up, review ask path, and Book now on the surfaces you chose, in one planned window.',
    },
    {
      label: 'Go live',
      text: 'Book now tested end to end, plus who owns review asks and what to check monthly.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Three doors, one delivery',
  stackItems: [
    {
      title: 'Google Profile Fix',
      text: 'We clean categories, photos, hours, and the basics so your Maps listing looks finished and easy to trust.',
    },
    {
      title: 'Review Engine',
      text: 'A simple ask after a visit or job so new Google reviews keep arriving without staff remembering to chase.',
    },
    {
      title: 'Booking System',
      text: 'Book now on the site, Google, or both, wired to your calendar so people can book without phone tag.',
    },
  ],
  scopeLine:
    'One location, one calendar system. Google Profile Fix, Review Engine, and Booking System as scoped at kickoff.',
  priceLabel: 'Investment',
  price: '$3,400',
  priceLead: 'Paid once when profile, review path, and calendar lock at kickoff. Bundle list price.',
  guarantee:
    'All three scoped pieces deliver, or we keep working at no extra cost until they do.',
  priceAnchor: 'One window instead of three kickoffs.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
    {
      q: 'What is included?',
      a: 'Three jobs for one location: we clean your Google Business Profile, set a review ask that keeps firing, and put Book now on the site or Maps against one calendar system. Scoped at kickoff.',
    },
    {
      q: 'What is Google Profile Fix?',
      a: 'We clean the public listing: categories, photos, hours, and the basics so Maps looks finished. Not a full ads campaign.',
    },
    {
      q: 'What is Review Engine?',
      a: 'A simple ask after a visit or job so new Google reviews keep arriving. Not fake reviews.',
    },
    {
      q: 'What is Booking System?',
      a: 'Book now on the site, Google, or both, wired to your calendar so people can pick a time without phone tag.',
    },
    {
      q: 'Is this only for clinics?',
      a: 'It fits clinics and any service business where appointments matter. Ask if your calendar setup fits.',
    },
    {
      q: 'Why buy the bundle?',
      a: 'One narrative, one access window, and $3,400 instead of three separate kickoffs at $600 + $1,100 + $1,500.',
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
