import type {FunnelProductCopy} from '../funnelCopy'

export const FULL_DIARY_LIVE_COPY = {
  eyebrow: 'Three jobs, one window, one calendar',
  h1Generic: 'They cannot book without ringing, missed calls go quiet, and empty slots stay empty',
  h1Personal: (b: string) =>
    `${b}, they cannot book without ringing, missed calls go quiet, and empty slots stay empty`,
  sub: 'Three jobs in one window: Book now wired to your calendar, an automatic text when a call rings out, and reminders plus a rebook path so no-shows do not silently eat the week. One handover.',
  ctaLabel: 'Buy Full diary, $2,400',
  proofLabel: 'The leak',
  proofHeadingLive: 'The diary leaks in three places',
  proofHeadingGeneric: 'The diary leaks in three places',
  proofLead: (b: string | null) =>
    b
      ? `Someone wants a time with ${b}. They cannot book without ringing. The call rings out. The ones who do book forget, and the slot sits empty.`
      : 'Someone wants a time with you. They cannot book without ringing. The call rings out. The ones who do book forget, and the slot sits empty.',
  proofLeadGeneric:
    'Someone wants a time with you. They cannot book without ringing. The call rings out. The ones who do book forget, and the slot sits empty.',
  proofAfter:
    'Getting the booking, catching the miss, and holding the slot are one diary path. Broken anywhere along it, the week stays thin.',
  proofAfterGeneric:
    'Getting the booking, catching the miss, and holding the slot are one diary path. Broken anywhere along it, the week stays thin.',
  leakHeading: 'Book, catch, hold',
  leakBody:
    'No Book now, ring-out silence, and empty slots feel like three problems. They are one diary leak.',
  painLabel: 'What this is costing you',
  painHeading: 'The week looks busier than it is',
  painLines: [
    'The only next step is to ring you, so anyone who decides after hours has to remember you tomorrow.',
    'A call rings out at lunchtime and that person books with whoever answers next.',
    'Reminders depend on somebody remembering, so no-shows still punch holes in the week.',
    'Three separate jobs means three kickoffs, so in practice none of them ever start.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Fill it, catch the miss, hold the slot',
  bridgeBody:
    'We do the three full products in one planned window. Booking System so Book now sits on the site and Maps, wired to your calendar, with confirmations, reminders, and a no-show text sequence, then a live test booking. Missed-Call Text-Back so a ring-out gets your wording by SMS, proved on a live miss with you watching. No-Show Rescue so reminder timing, a rebook path, and an optional owner alert are live, proved on a dummy booking. One access conversation, one handoff.',
  bridgeGaugeCaption: 'Book now live. Miss caught. Empty slots chased.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes you can feel in the week',
  benefits: [
    {
      title: 'People can finish without you answering',
      text: 'Book now for the ones who tap. A text-back for the ones who still ring and miss you.',
    },
    {
      title: 'The slot does not go quiet',
      text: 'Reminders fire, a miss can turn into next week, and you get a ping when a late gap is worth filling.',
    },
    {
      title: 'Less than buying them apart',
      text: '$2,400 together, against $3,000 for the same three products bought separately.',
    },
    {
      title: 'A clear next step, not a trap',
      text: 'Google Profile Fix is the natural job after this if Maps still looks thin. It is not in this pack.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Access, build, prove',
  processSteps: [
    {
      label: 'Access',
      text: 'We lock which calendar Book now should use, which number we watch, and how reminders should fire.',
    },
    {
      label: 'Build',
      text: 'Booking wire, missed-call text-back, and no-show rescue, all inside one delivery window.',
    },
    {
      label: 'Prove',
      text: 'A real test booking, a live missed call, and a dummy booking that proves the reminder path.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Three full products, one price',
  stackItems: [
    {
      title: 'Booking System',
      text: 'Tool wired to your real calendar. Confirmations, reminders, and a no-show text sequence. Book now on the site, Google, or both, then a live test booking. Systems Snapshot and 14 days of aftercare. Same scope as the $1,500 door.',
    },
    {
      title: 'Missed-Call Text-Back',
      text: 'Automatic SMS when the business number rings out, in your words, replies captured as a lead, proved on a live miss with you watching. 14 days of aftercare. Same scope as the $750 door.',
    },
    {
      title: 'No-Show Rescue',
      text: 'Reminder set you approve, a rebook path that actually works, optional owner alert on late gaps, proved on a dummy booking. Same scope as the $750 door.',
    },
  ],
  scopeLine:
    'One Australian business number, one primary calendar. Booking System, Missed-Call Text-Back, and No-Show Rescue as scoped at kickoff. Google Profile Fix and Review Engine are not included. Extra numbers or staff calendars are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$2,400',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: all three scoped products are delivered, with a test booking, a live miss, and a dummy reminder path proved, or we keep working at no extra cost until they are.',
  priceAnchor:
    'Bought separately the same three jobs are $3,000 and three kickoffs. Together they are $2,400, one access handover, and the diary actually holds.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why buy the pack instead of the three products?',
      a: 'Partly the $600. Mostly the sequence. Book now is wasted if misses go quiet and booked slots still empty. Done together they land in the right order and your team hands over access once.',
    },
    {
      q: 'What exactly is included?',
      a: 'The same three products we sell separately: Booking System, Missed-Call Text-Back, and No-Show Rescue, at full scope, for one number and one primary calendar.',
    },
    {
      q: 'Is this a new booking tool?',
      a: 'We wire the tool you already use where we can. If yours will not support it properly, we tell you before you pay rather than after.',
    },
    {
      q: 'Will it fill the empty slot for me?',
      a: 'No. It reminds people so fewer slots go empty, and gives the ones who miss an easy way to rebook. Filling a late gap still needs a person.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the three agreed products are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Fill it, catch it, hold it',
  finalLine: 'Pay once, hand over access once, and close Book now, the missed call, and the empty slot in a single sprint.',
  proofKind: 'full-diary',
} as FunnelProductCopy
