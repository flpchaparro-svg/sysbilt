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
  ctaLabel: 'Buy Front Door, $2,550',
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
  leakHeading: 'Demand with nowhere to land',
  leakBody:
    'Profile and reviews pull people in. Without Book now they still have to ring you tomorrow.',
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
    'We do the three full products in one planned window. Google Profile Fix so the listing is claimed or recovered, categories and description filled, photos sorted, review link ready, keys on your account. Review Engine so an automatic ask fires after every completed job, in your words, with a QR and short link, plus reply templates. Booking System so Book now sits on the site and Maps, wired to your calendar, with confirmations, reminders, and a no-show text sequence, then a live test booking. One access conversation, one handoff.',
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
      title: 'Less than buying them apart',
      text: '$2,550 together, against $3,200 for the same three products bought separately.',
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
      text: 'Profile overhaul, the review ask, and Book now on the surfaces you chose, in one planned window.',
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
      text: 'Claim or recover, categories, services, attributes, selling description, photos, review link. Ownership stays on your account. Habit guide, Systems Snapshot, 14 days of aftercare. Same scope as the $600 door.',
    },
    {
      title: 'Review Engine',
      text: 'Automatic ask after every completed job, wording in your voice, QR and short link, good and bad reply templates. Systems Snapshot and 14 days of aftercare. Same scope as the $1,100 door.',
    },
    {
      title: 'Booking System',
      text: 'Tool wired to your real calendar. Confirmations, reminders, and a no-show text sequence. Book now on the site, Google, or both, then a live test booking. Systems Snapshot and 14 days of aftercare. Same scope as the $1,500 door.',
    },
  ],
  scopeLine:
    'One location, one calendar system. Google Profile Fix, Review Engine and Booking System as scoped at kickoff. Extra locations or staff calendars are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$2,550',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: all three scoped pieces are delivered, with a real test booking run end to end, or we keep working at no extra cost until they are.',
  priceAnchor:
    'Bought separately the same three jobs are $3,200 and three kickoffs. Together they are $2,550, one access handover, and people can book without ringing you.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why buy the bundle instead of the three jobs?',
      a: 'Because the three only pay off together, and the order matters. Bought separately it is three kickoffs, three access handovers, and usually months of drift between them, so you never see what the whole path does.',
    },
    {
      q: 'What exactly is included?',
      a: 'The same three products we sell separately: Google Profile Fix, Review Engine, and Booking System, at full scope, for one location and one primary calendar.',
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
