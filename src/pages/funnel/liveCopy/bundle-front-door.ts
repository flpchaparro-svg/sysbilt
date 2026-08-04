import type {FunnelProductCopy} from '../funnelCopy'

/**
 * Live copy for Front Door Bundle.
 * Written for a first-time reader who has never seen the individual product pages.
 */
export const BUNDLE_FRONT_DOOR_LIVE_COPY = {
  eyebrow: 'Three jobs, one window, one location',
  h1Generic:
    'They find you, they like the look of you, and then they have to ring during business hours',
  h1Personal: (b: string) =>
    `${b}, they find you, they like the look of you, and then they have to ring during business hours`,
  sub: 'Three jobs in one window: your Google listing cleaned up so you look like a real business on Maps, a review ask that keeps firing so the proof stays fresh, and a Book now button on your site and Maps wired to your calendar, so people can book at ten at night without playing phone tag.',
  ctaLabel: 'Buy the Front Door bundle, $3,400',
  proofLabel: 'The leak',
  proofHeadingLive: 'Three locks on one door',
  proofHeadingGeneric: 'Three locks on one door',
  proofLead: (b: string | null) =>
    b
      ? `Someone decides tonight that ${b} is who they want. The listing is thin, the last review is from 2022, and the only way to book is to ring you tomorrow between nine and five. Most of them do not.`
      : 'Someone decides tonight that you are who they want. The listing is thin, the last review is from 2022, and the only way to book is to ring tomorrow between nine and five. Most of them do not.',
  proofLeadGeneric:
    'Someone decides tonight that you are who they want. The listing is thin, the last review is from 2022, and the only way to book is to ring tomorrow between nine and five. Most of them do not.',
  proofAfter:
    'Being found, being believed, and being able to book are one path, not three projects. Broken anywhere along it, the whole thing stops.',
  proofAfterGeneric:
    'Being found, being believed, and being able to book are one path, not three projects. Broken anywhere along it, the whole thing stops.',
  painLabel: 'What this is costing you',
  painHeading: 'The front door has three locks',
  painLines: [
    'Your Google listing looks unfinished next to the business down the road, and people read that as how you run things.',
    'Reviews stalled, because asking after a job depends on somebody remembering at the busiest moment of the day.',
    'Booking still means ringing you, so anyone who decides after hours has to remember you tomorrow.',
    'Three separate jobs means three kickoffs, so in practice none of them ever start.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'The whole path opened in one window',
  bridgeBody:
    'We do the three jobs in one planned window. We clean the Google Business Profile so Maps looks finished. We put in a review ask that fires after a visit or job without staff having to remember. And we put Book now on the site, on Maps, or both, wired to your calendar and tested end to end. One access conversation at the start, one handoff at the end.',
  bridgeGaugeCaption: 'Seen. Believed. Booked without a phone call.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes you can feel at the door',
  benefits: [
    {
      title: 'The whole path works, not one third of it',
      text: 'Getting found is wasted if nobody trusts the reviews, and both are wasted if the only way to book is to ring you.',
    },
    {
      title: 'Your team hands over access once',
      text: 'Maps and calendar access in one conversation, instead of three separate chases over three separate months.',
    },
    {
      title: 'People can book after hours',
      text: 'The moment someone decides is usually the evening. A Book now button is the difference between that and a note they never act on.',
    },
    {
      title: 'Built for appointment businesses',
      text: 'Clinics and service businesses where the goal is a time in the calendar, not a brochure download.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Access, build, go live',
  processSteps: [
    {
      label: 'Access',
      text: 'We lock your Google listing, how reviews get asked, and which calendar Book now should use.',
    },
    {
      label: 'Build',
      text: 'Profile clean-up, the review ask, and Book now on the surfaces you chose, in one planned window.',
    },
    {
      label: 'Go live',
      text: 'A real test booking end to end with you watching, plus who owns reviews and what to check monthly.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Three doors, one delivery',
  stackItems: [
    {
      title: 'Google Profile Fix',
      text: 'Categories, photos, hours, services and the basics cleaned up so your Maps listing looks finished and easy to trust.',
    },
    {
      title: 'Review Engine',
      text: 'A simple ask after a visit or job, so new reviews keep arriving without staff having to remember to chase.',
    },
    {
      title: 'Booking System',
      text: 'Book now on the site, on Google, or both, wired to your calendar so people can pick a time without ringing anyone.',
    },
  ],
  scopeLine:
    'One location, one calendar system. Google Profile Fix, Review Engine and Booking System as scoped at kickoff. Extra locations or staff calendars are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$3,400',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: all three scoped pieces are delivered, with a real test booking run end to end, or we keep working at no extra cost until they are.',
  priceAnchor:
    'Work out what one booking is worth to you, then count the evenings and weekends where the only option was to ring you tomorrow. Those go on happening every week. This is one window, paid once.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why buy the bundle instead of the three jobs?',
      a: 'Because the three only pay off together, and the order matters. Bought separately it is three kickoffs, three access handovers, and usually months of drift between them, so you never see what the whole path does.',
    },
    {
      q: 'What exactly is included?',
      a: 'Three jobs for one location: your Google Business Profile cleaned up, a review ask that keeps firing, and Book now on your site or Maps against one calendar. All scoped at kickoff.',
    },
    {
      q: 'Will Book now work with our calendar?',
      a: 'We wire it to the booking tool and calendar you already use where we can. If yours will not support it properly, we tell you before you pay rather than after.',
    },
    {
      q: 'Do you write fake reviews?',
      a: 'Never. We ask real customers at the right moment and make it easy to say yes. What they write is up to them.',
    },
    {
      q: 'Is this only for clinics?',
      a: 'It fits clinics and any service business where the goal is a booked time. If people have to ring you to buy, this is your bundle.',
    },
    {
      q: 'What comes after this?',
      a: 'No-Show Rescue and AI Phone Setup are the usual next jobs once Book now is live. Neither is in this bundle and neither is required.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the three agreed pieces are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Open the front door properly',
  finalLine:
    'Pay once, hand over access once, and let people book you at ten at night.',
  proofKind: 'bundle-front-door',
} as FunnelProductCopy
