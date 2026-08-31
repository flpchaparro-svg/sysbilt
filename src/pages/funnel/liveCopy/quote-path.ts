import type {FunnelProductCopy} from '../funnelCopy'

export const QUOTE_PATH_LIVE_COPY = {
  eyebrow: 'Two jobs, one window, one quote pipeline',
  h1Generic: 'They ask for a price, then the form goes quiet, and nobody chases the quote that sat there',
  h1Personal: (b: string) =>
    `${b}, they ask for a price, then the form goes quiet, and nobody chases the quote that sat there`,
  sub: 'Two jobs in one window: a quote wizard on your rate card so the buyer gets a real number, then a follow-up sequence that chases the ones who went quiet. One handover.',
  ctaLabel: 'Buy Quote path, $3,400',
  proofLabel: 'The leak',
  proofHeadingLive: 'Priced, then forgotten',
  proofHeadingGeneric: 'Priced, then forgotten',
  proofLead: (b: string | null) =>
    b
      ? `Someone wants a number from ${b}. The form asks them to write a novel, or they get a PDF and nobody follows up. That job goes to whoever answered.`
      : 'Someone wants a number from you. The form asks them to write a novel, or they get a PDF and nobody follows up. That job goes to whoever answered.',
  proofLeadGeneric:
    'Someone wants a number from you. The form asks them to write a novel, or they get a PDF and nobody follows up. That job goes to whoever answered.',
  proofAfter:
    'A quote that never leaves, and a quote that leaves and dies, are one path. Broken anywhere along it, the job never lands.',
  proofAfterGeneric:
    'A quote that never leaves, and a quote that leaves and dies, are one path. Broken anywhere along it, the job never lands.',
  leakHeading: 'Blank form, then silence',
  leakBody:
    'A form that cannot price, and a quote nobody chases, feel like two problems. They are one quote leak.',
  painLabel: 'What this is costing you',
  painHeading: 'You already earned the right to send a number',
  painLines: [
    'The site asks people to describe the job in a blank box, so they bounce.',
    'Quotes sit in email until somebody remembers on a busy Thursday.',
    'Follow-up sounds desperate when it happens, and never happens when it should.',
    'Two separate jobs means two kickoffs, so in practice neither of them ever starts.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Priced on the card, then chased properly',
  bridgeBody:
    'We do both full products in one planned window. Quote Capture so a guided wizard prices from your locked rate card, the buyer leaves with a quotation, PDF, email and SMS, and you get an owner alert. Quote Follow-Up Autopilot so two to four messages in your voice fire on sensible gaps, stop on reply, booking, or opt-out, and ping you when a quote is worth a call. One access conversation, one handoff.',
  bridgeGaugeCaption: 'Quoted from your card. Followed up. Stopped when they reply.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes you can feel in the pipeline',
  benefits: [
    {
      title: 'The buyer gets a real number',
      text: 'Plain questions, your locked rate card, a quotation they can take with them. No invented prices.',
    },
    {
      title: 'The quiet quotes get chased',
      text: 'Two to four touches in your voice, stopping the moment they reply, book, or opt out.',
    },
    {
      title: 'Less than buying them apart',
      text: '$3,400 together, against $4,250 for the same two products bought separately.',
    },
    {
      title: 'A clear next step, not a trap',
      text: 'AI Concierge is an add-on on Quote Capture if you want it. CRM Rescue is a different job. Neither is bundled in.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Access, build, prove',
  processSteps: [
    {
      label: 'Access',
      text: 'We lock the rate card, where quotes should live, and how follow-up should sound.',
    },
    {
      label: 'Build',
      text: 'The wizard and the follow-up sequence, inside one delivery window.',
    },
    {
      label: 'Prove',
      text: 'A live quote with you on the phone, then a test sequence that stops exactly as agreed.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Two full products, one price',
  stackItems: [
    {
      title: 'Quote Capture',
      text: 'Guided wizard on your locked rate card, on-screen quotation, PDF, email and SMS, owner alert, quote landing in your system, live test, 14 days of aftercare. Same scope as the $2,800 door. AI Concierge is still +$600 if you want it.',
    },
    {
      title: 'Quote Follow-Up Autopilot',
      text: 'Two to four messages in your voice, timing rules, stop rules, owner alert, tested before it touches a real customer. Same scope as the $1,450 door.',
    },
  ],
  scopeLine:
    'One website install and one quote pipeline, chosen at kickoff. Quote Capture and Quote Follow-Up Autopilot as scoped at kickoff. AI Concierge is +$600. Extra pipelines are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$3,400',
  priceLead: 'Paid once, then the rate-card call. No monthly quote software fee.',
  guarantee:
    'Our promise: both scoped products are delivered, with a live quote and a tested follow-up sequence, or we keep working at no extra cost until they are.',
  priceAnchor:
    'Bought separately the same two jobs are $4,250 and two kickoffs. Together they are $3,400, one access handover, and the quote can leave and get chased.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why buy the pack instead of the two products?',
      a: 'Partly the $850. Mostly the sequence. A quote wizard is wasted if nobody chases the PDF. Follow-up is wasted if there is no real number to send. Done together they land in the right order and your team hands over access once.',
    },
    {
      q: 'What exactly is included?',
      a: 'The same two products we sell separately: Quote Capture and Quote Follow-Up Autopilot, at full scope, for one site and one quote pipeline.',
    },
    {
      q: 'Will it invent prices?',
      a: 'No. The wizard only uses numbers and rules you approved. Anything outside the card gets flagged for your call.',
    },
    {
      q: 'Is this spam?',
      a: 'No. These are people who asked you for a price. Two to four short messages, in your words, stopping the moment they reply, book, or opt out.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the two agreed products are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Price it, then chase it',
  finalLine: 'Pay once, hand over access once, and close the quote wizard and the follow-up in a single sprint.',
  proofKind: 'quote-path',
} as FunnelProductCopy
