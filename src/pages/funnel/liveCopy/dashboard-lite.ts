import type {FunnelProductCopy} from '../funnelCopy'

/** Live /go copy for Dashboard Lite. Wired later via funnelCopyForSlug. */
export const DASHBOARD_LITE_LIVE_COPY = {
  eyebrow: 'Fixed price, about two weeks, one screen',
  h1Generic: 'Every Monday you guess how last week actually went',
  h1Personal: (b: string) =>
    `${b}, every Monday you guess how last week actually went`,
  sub: "Leads sit in one login, bookings in another, reviews somewhere else, and what you spent on ads in a fourth. So you either lose an hour pulling it together or you decide on a feeling. This is one screen with the numbers that change what you'd do next, wired to the tools you already pay for.",
  ctaLabel: 'Build my dashboard, $2,600',
  proofLabel: 'The picture',
  proofHeadingLive: 'The answer is in five logins, so nobody looks',
  proofHeadingGeneric: 'The answer is in five logins, so nobody looks',
  proofLead: (b: string | null) =>
    b
      ? `To know how ${b} did last week you'd need the booking system, the inbox, the ad account, the reviews and a spreadsheet. By the time you've opened all five, the week you were checking on is already gone.`
      : "To know how you did last week you'd need the booking system, the inbox, the ad account, the reviews and a spreadsheet. By the time you've opened all five, the week you were checking on is already gone.",
  proofLeadGeneric:
    "To know how you did last week you'd need the booking system, the inbox, the ad account, the reviews and a spreadsheet. By the time you've opened all five, the week you were checking on is already gone.",
  proofAfter:
    'So the check quietly stops happening, and the business runs on whichever number somebody mentioned in the last meeting.',
  proofAfterGeneric:
    'So the check quietly stops happening, and the business runs on whichever number somebody mentioned in the last meeting.',
  painLabel: 'What this is costing you',
  painHeading: 'You are managing on anecdote',
  painLines: [
    'The ads look like they are working, right up until you count the enquiries that came from them.',
    'Bookings and reviews never sit next to each other, so you cannot tell whether a quiet month was demand or reputation.',
    'Staff report how the week felt, because nobody has the numbers to hand.',
    'You already pay for tools that hold the answer. Somebody still screenshots them into a chat thread.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'A small board that answers one question well',
  bridgeBody:
    "This isn't a business intelligence project, the kind that takes months and needs a data team to keep alive. It's a focused board answering one question: are we alright this week. We pick the handful of numbers that would actually change a decision, wire them to the tools you already pay for, and leave you a ten minute Monday check with a name against it.",
  bridgeGaugeCaption: 'See the week in ten minutes. Then get on with it.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'One place to look each week',
  benefits: [
    {
      title: 'The Monday check takes ten minutes',
      text: 'One screen instead of five logins, so the review actually happens instead of being skipped.',
    },
    {
      title: 'Spend sits next to results',
      text: 'What you paid for ads, beside the enquiries and bookings that came out the other end.',
    },
    {
      title: 'A few numbers, done properly',
      text: 'We would rather give you six numbers you trust than forty you ignore.',
    },
    {
      title: 'Someone owns it',
      text: 'We name who opens it on Monday and write the routine down, because a board nobody opens is decoration.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Pick, connect, hand over',
  processSteps: [
    {
      label: 'Pick',
      text: 'We agree the handful of numbers that would genuinely change what you do next week.',
    },
    {
      label: 'Connect',
      text: 'We wire them to the tools you already pay for, and tell you early if one will not feed cleanly.',
    },
    {
      label: 'Hand over',
      text: 'The board, a map of where every number comes from, and the ten minute Monday routine.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full board, nothing extra to buy',
  stackItems: [
    {
      title: 'The metric set',
      text: 'Leads, bookings, reviews and what campaigns returned, as far as your sources allow.',
    },
    {
      title: 'The board itself',
      text: 'A simple layout built to be read in a minute, not a science fair of charts.',
    },
    {
      title: 'Source map',
      text: 'Where each number comes from and what it does not include, so you can trust it.',
    },
    {
      title: 'The Monday routine',
      text: 'A ten minute check written down, with an owner, so it survives a busy month.',
    },
  ],
  scopeLine:
    'One board, metric list locked at kickoff. Deep business intelligence work, custom data warehouses and multi-brand rollups are quoted separately so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$2,600',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the agreed numbers appear on the board from your connected sources, or we keep working at no extra cost until they do.',
  priceAnchor:
    "That's less than a fortnight of guessing. Every week you either lose an hour assembling numbers from five logins, or you skip it and run the business on a feeling. One of those costs your time, the other costs your money. This costs you once.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why is this cheaper than a proper data project?',
      a: "Because we're not building a warehouse or modelling five years of history. We connect the handful of numbers that change a decision and leave you a ten minute check. It's small on purpose, and that's why it gets used.",
    },
    {
      q: 'Which sources can you connect?',
      a: 'The tools you already pay for, as long as they will hand over the numbers you picked. If one will not feed cleanly, we tell you before you pay rather than after.',
    },
    {
      q: 'Do I need CRM Rescue first?',
      a: 'No. Cleaner data makes a better board, but this stands alone whenever your inputs are good enough for a weekly read. If they are not, we will say so.',
    },
    {
      q: 'Who keeps it running?',
      a: 'You do, and it is built to need almost nothing. We name the owner and write the routine at handover, because the board only pays for itself if somebody opens it.',
    },
    {
      q: 'Can we add more numbers later?',
      a: 'Yes, quoted the same day. The fixed price covers the set you lock at kickoff, which keeps it honest for both of us.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed numbers are not on the board from your connected sources, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'See the week on one screen',
  finalLine:
    'Pay once, pick the numbers that matter, and stop guessing how the week went.',
  proofKind: 'dashboard-lite',
} as FunnelProductCopy
