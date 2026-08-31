import type {FunnelProductCopy} from '../funnelCopy'

export const FOUND_BOOKED_LIVE_COPY = {
  eyebrow: 'Three jobs, one window, one location',
  h1Generic: 'They find you, then they have to ring you, and the ring often dies unanswered',
  h1Personal: (b: string) =>
    `${b}, they find you, then they have to ring you, and the ring often dies unanswered`,
  sub: 'Three jobs in one window: your Google listing cleaned up so Maps looks finished, Book now on your site and profile wired to your calendar, and an automatic text when a call rings out. One handover. Paid once at the pack price.',
  ctaLabel: 'Buy Found and booked, $2,300',
  proofLabel: 'The leak',
  proofHeadingLive: 'Found is wasted if they cannot book or reach you',
  proofHeadingGeneric: 'Found is wasted if they cannot book or reach you',
  proofLead: (b: string | null) =>
    b
      ? `Someone decides ${b} is who they want. The listing looks thin, there is no Book now, and the call goes to voicemail. Most of them do not try again.`
      : 'Someone decides you are who they want. The listing looks thin, there is no Book now, and the call goes to voicemail. Most of them do not try again.',
  proofLeadGeneric:
    'Someone decides you are who they want. The listing looks thin, there is no Book now, and the call goes to voicemail. Most of them do not try again.',
  proofAfter:
    'Being found, being able to book, and catching the missed call are one path. Broken anywhere along it, the enquiry never lands.',
  proofAfterGeneric:
    'Being found, being able to book, and catching the missed call are one path. Broken anywhere along it, the enquiry never lands.',
  leakHeading: 'Three doors, none of them finish',
  leakBody:
    'A thin listing, a Call us button, and a phone that rings out look like three problems. They are one lost enquiry.',
  painLabel: 'What this is costing you',
  painHeading: 'Ready people leave without a fight',
  painLines: [
    'Your Google listing looks unfinished next to the business down the road, and people read that as how you run things.',
    'The only next step is to ring you, so anyone who decides after hours has to remember you tomorrow.',
    'A call rings out at lunchtime and that person books with whoever answers next.',
    'Three separate jobs means three kickoffs, so in practice none of them ever start.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Found, bookable, and the miss caught, in one window',
  bridgeBody:
    'We do the three full products in one planned window. Google Profile Fix so the listing is claimed or recovered, categories and description filled, photos sorted, review link ready, keys on your account. Booking System so Book now sits on the site and Maps, wired to your calendar, with confirmations, reminders, and a no-show text sequence, then a live test booking. Missed-Call Text-Back so a ring-out gets your wording by SMS, the reply lands with you, and we prove it on a live miss with you watching. One access conversation, one handoff.',
  bridgeGaugeCaption: 'Seen on Maps. Book now live. Missed call answered by text.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes you can feel at the door',
  benefits: [
    {
      title: 'Your team hands over access once',
      text: 'Maps, calendar, and phone access in one conversation, instead of three chases over three months.',
    },
    {
      title: 'Both ways in stay open',
      text: 'People who will tap Book now can finish. People who still ring and get voicemail get a text before they dial the next listing.',
    },
    {
      title: 'Less than buying them apart',
      text: '$2,300 together, against $2,850 for the same three products bought separately.',
    },
    {
      title: 'A clear next step, not a trap',
      text: 'Review Engine is the natural job after this, when you want the ask after every visit. It is not in this pack and you are not committed to it.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Access, build, prove',
  processSteps: [
    {
      label: 'Access',
      text: 'We lock your Google listing, which calendar Book now should use, and which number we watch for ring-outs.',
    },
    {
      label: 'Build',
      text: 'Profile overhaul, booking wire and Book now, missed-call text-back, all inside one delivery window.',
    },
    {
      label: 'Prove',
      text: 'A real test booking end to end, and a live missed call with you watching the SMS land.',
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
      title: 'Booking System',
      text: 'Tool wired to your real calendar. Confirmations, reminders, and a no-show text sequence. Book now on the site, Google, or both, then a live test booking. Systems Snapshot and 14 days of aftercare. Same scope as the $1,500 door.',
    },
    {
      title: 'Missed-Call Text-Back',
      text: 'Automatic SMS when the business number rings out, in your words, replies captured as a lead, proved on a live miss with you watching. 14 days of aftercare. Same scope as the $750 door.',
    },
  ],
  scopeLine:
    'One location, one Australian business number, one primary calendar. Google Profile Fix, Booking System, and Missed-Call Text-Back as scoped at kickoff. Review Engine, AI Phone, and a separate No-Show Rescue rebuild are not included. Extra locations, numbers, or staff calendars are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$2,300',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: all three scoped products are delivered, with a test booking and a live miss proved, or we keep working at no extra cost until they are.',
  priceAnchor:
    'Bought separately the same three jobs are $2,850 and three kickoffs. Together they are $2,300, one access handover, and both ways in actually work.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why buy the pack instead of the three products?',
      a: 'Partly the $550. Mostly the sequence. Found is wasted if they cannot book, and Book now is wasted if the people who still ring get silence. Done together they land in the right order and your team hands over access once.',
    },
    {
      q: 'What exactly is included?',
      a: 'The same three products we sell separately: Google Profile Fix, Booking System, and Missed-Call Text-Back, at full scope, for one location, one number, and one primary calendar.',
    },
    {
      q: 'Is Review Engine included?',
      a: 'No. Profile Fix includes a review link and ask wording. Review Engine is the automatic ask after every job. That is a separate product if you want it later.',
    },
    {
      q: 'Will Book now work with our calendar?',
      a: 'We wire it to the booking tool and calendar you already use where we can. If yours will not support it properly, we tell you before you pay rather than after.',
    },
    {
      q: 'Is this a new phone system?',
      a: 'No. Missed-Call Text-Back watches the number you already use. It does not answer live calls. That is AI Phone Setup, sold separately.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the three agreed products are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'One link, three jobs, both ways in',
  finalLine:
    'Pay once, hand over access once, and close the listing, the Book now, and the missed call in a single sprint.',
  proofKind: 'found-booked',
} as FunnelProductCopy
