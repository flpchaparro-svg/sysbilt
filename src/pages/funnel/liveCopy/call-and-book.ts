import type {FunnelProductCopy} from '../funnelCopy'

export const CALL_AND_BOOK_LIVE_COPY = {
  eyebrow: 'Two jobs, one window, one calendar',
  h1Generic: 'They want a time, then they have to ring you, and the ring often dies unanswered',
  h1Personal: (b: string) =>
    `${b}, they want a time, then they have to ring you, and the ring often dies unanswered`,
  sub: 'Two jobs in one window: Book now on your site and profile wired to your calendar, and an automatic text when a call rings out. People who will tap, tap. People who still ring and miss you get a text. One handover.',
  ctaLabel: 'Buy Call and book, $1,800',
  proofLabel: 'The leak',
  proofHeadingLive: 'Two ways in, both broken',
  proofHeadingGeneric: 'Two ways in, both broken',
  proofLead: (b: string | null) =>
    b
      ? `Someone decides ${b} is who they want. There is no Book now, so they ring. The call goes to voicemail. Most of them do not try again.`
      : 'Someone decides you are who they want. There is no Book now, so they ring. The call goes to voicemail. Most of them do not try again.',
  proofLeadGeneric:
    'Someone decides you are who they want. There is no Book now, so they ring. The call goes to voicemail. Most of them do not try again.',
  proofAfter:
    'Book now and missed-call text-back are one path. Broken anywhere along it, the enquiry never lands.',
  proofAfterGeneric:
    'Book now and missed-call text-back are one path. Broken anywhere along it, the enquiry never lands.',
  leakHeading: 'Call us, then silence',
  leakBody:
    'A Call us button and a phone that rings out look like two problems. They are one lost booking.',
  painLabel: 'What this is costing you',
  painHeading: 'Ready people cannot finish',
  painLines: [
    'The only next step is to ring you, so anyone who decides after hours has to remember you tomorrow.',
    'A call rings out at lunchtime and that person books with whoever answers next.',
    'You already have a booking tool sitting unused because nobody wired it to the real calendar.',
    'Two separate jobs means two kickoffs, so in practice neither of them ever starts.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Book now live, and the miss caught',
  bridgeBody:
    'We do both full products in one planned window. Booking System so Book now sits on the site and Maps, wired to your calendar, with confirmations, reminders, and a no-show text sequence, then a live test booking. Missed-Call Text-Back so a ring-out gets your wording by SMS, the reply lands with you, and we prove it on a live miss with you watching. One access conversation, one handoff.',
  bridgeGaugeCaption: 'Book now live. Missed call answered by text.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes you can feel in the diary',
  benefits: [
    {
      title: 'Both ways in stay open',
      text: 'People who will tap Book now can finish. People who still ring and get voicemail get a text before they dial the next listing.',
    },
    {
      title: 'Your team hands over access once',
      text: 'Calendar and phone access in one conversation, instead of two chases over two months.',
    },
    {
      title: 'Less than buying them apart',
      text: '$1,800 together, against $2,250 for the same two products bought separately.',
    },
    {
      title: 'A clear next step, not a trap',
      text: 'No-Show Rescue is the natural job after this if empty slots still hurt. It is not in this pack.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Access, build, prove',
  processSteps: [
    {
      label: 'Access',
      text: 'We lock which calendar Book now should use, and which number we watch for ring-outs.',
    },
    {
      label: 'Build',
      text: 'Booking wire and Book now, missed-call text-back, all inside one delivery window.',
    },
    {
      label: 'Prove',
      text: 'A real test booking end to end, and a live missed call with you watching the SMS land.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Two full products, one price',
  stackItems: [
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
    'One Australian business number, one primary calendar. Booking System and Missed-Call Text-Back as scoped at kickoff. Google Profile Fix, Review Engine, and a separate No-Show Rescue rebuild are not included. Extra numbers or staff calendars are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$1,800',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: both scoped products are delivered, with a test booking and a live miss proved, or we keep working at no extra cost until they are.',
  priceAnchor:
    'Bought separately the same two jobs are $2,250 and two kickoffs. Together they are $1,800, one access handover, and both ways in actually work.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why buy the pack instead of the two products?',
      a: 'Partly the $450. Mostly the sequence. Book now is wasted if the people who still ring get silence. Done together they land in the right order and your team hands over access once.',
    },
    {
      q: 'What exactly is included?',
      a: 'The same two products we sell separately: Booking System and Missed-Call Text-Back, at full scope, for one number and one primary calendar.',
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
      a: "There's no change-of-mind refund, because we start straight away. If the two agreed products are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Both ways in, one window',
  finalLine: 'Pay once, hand over access once, and close Book now and the missed call in a single sprint.',
  proofKind: 'call-and-book',
} as FunnelProductCopy
