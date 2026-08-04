import type {FunnelProductCopy} from '../funnelCopy'

/** Live /go copy for Inbox Triage Assistant. Wired later via funnelCopyForSlug. */
export const INBOX_TRIAGE_LIVE_COPY = {
  eyebrow: 'Fixed price, about a week, one mailbox',
  h1Generic:
    'You spend the first two hours of every day in an inbox that never gets smaller',
  h1Personal: (b: string) =>
    `${b}, you spend the first two hours of every day in an inbox that never gets smaller`,
  sub: "The client email that actually mattered is three screens down, under newsletters and supplier ads. The reply you're about to write is one you've written forty times already. We sort the mail into buckets that match how you really work, and have the repeat replies drafted and waiting. Nothing sends without you.",
  ctaLabel: 'Fix my inbox, $2,200',
  proofLabel: 'The leak',
  proofHeadingLive: 'Email became the unpaid second job',
  proofHeadingGeneric: 'Email became the unpaid second job',
  proofLead: (b: string | null) =>
    b
      ? `Everything arriving at ${b} lands in one stream, so a customer about to spend money looks exactly like a software invoice and a newsletter nobody signed up for.`
      : 'Everything lands in one stream, so a customer about to spend money looks exactly like a software invoice and a newsletter nobody signed up for.',
  proofLeadGeneric:
    'Everything lands in one stream, so a customer about to spend money looks exactly like a software invoice and a newsletter nobody signed up for.',
  proofAfter:
    'You are not slow at email. You are doing sorting work that a set of rules should have been doing for you, and rewriting answers you have already written.',
  proofAfterGeneric:
    'You are not slow at email. You are doing sorting work that a set of rules should have been doing for you, and rewriting answers you have already written.',
  painLabel: 'What this is costing you',
  painHeading: 'The inbox is running your day',
  painLines: [
    'Everything arrives in one pile, so a customer complaint looks the same as a supplier ad.',
    "You rewrite the same paragraph most days from scratch, because that's quicker than finding the last one.",
    'A client email gets read on your phone, mentally filed, and never actually answered.',
    'The shared inbox has no rules, so either two people reply or nobody does.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Sorting first, then the replies you keep rewriting',
  bridgeBody:
    "This isn't autopilot sending on your behalf, and it isn't a new email system to learn. We work inside the mail tool you already use. First the sorting: rules that put the usual kinds of mail where they belong, so what needs you is visible and the rest is out of the way. Then the drafts: for the messages you answer over and over, a reply is prepared and waiting. You read it, change what you want, and send it. Nothing leaves without a person.",
  bridgeGaugeCaption: 'It sorts. It drafts. You still decide what goes out.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Less hunting, faster replies, you still decide',
  benefits: [
    {
      title: 'You can see what needs you',
      text: 'Real customer mail stops looking identical to invoices, newsletters and supplier ads.',
    },
    {
      title: 'The repeat replies are already written',
      text: 'The messages you answer forty times a year arrive with a draft ready to check and send.',
    },
    {
      title: 'Nothing sends without a person',
      text: 'Drafts wait for you. Silent auto-send stays off unless you deliberately ask for it later.',
    },
    {
      title: 'Shared inboxes get rules',
      text: 'Who answers what, written down, so two people stop replying to the same message.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Map, rules, drafts',
  processSteps: [
    {
      label: 'Map',
      text: 'We go through a real week of mail and agree the handful of types that matter and what done looks like.',
    },
    {
      label: 'Rules',
      text: 'Labels, filters and priorities built inside the mail tool you already use.',
    },
    {
      label: 'Drafts',
      text: 'Prepared replies for the messages that repeat, written in your voice and tested on live mail.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full setup, nothing extra to buy',
  stackItems: [
    {
      title: 'Triage map',
      text: 'The categories that actually match your week, agreed from a real inbox rather than a template.',
    },
    {
      title: 'Rules setup',
      text: 'Built in the mail tool you already use, so nobody has to learn a new system.',
    },
    {
      title: 'Draft pack',
      text: 'Prepared replies for the messages that repeat, ready for a person to check and send.',
    },
    {
      title: 'Team note',
      text: 'How a shared inbox stays clean, and who owns which type of mail.',
    },
  ],
  scopeLine:
    'One primary mailbox or shared inbox, locked at kickoff. Not a CRM, not unsupervised auto-send, not a rewrite of every template you own. Extra mailboxes are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$2,200',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the agreed rules and drafts are working on your real mailbox before handover, or we keep working at no extra cost until they are.',
  priceAnchor:
    "Two hours a day in the inbox, costed at what your time is genuinely worth, comes to more than this inside a month. That's every month, this year and next. This is a week of work, paid once.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why is this cheaper than hiring an assistant?',
      a: "Because an assistant costs about this much every few weeks and still needs managing. This is a one-off setup on the mailbox you already have, and it keeps running after we've gone.",
    },
    {
      q: 'Will it send email without me?',
      a: 'No. Drafts sit and wait for a person to read and send. Silent auto-send is off, and it only ever goes on if you deliberately ask for it later.',
    },
    {
      q: 'Do we have to change email providers?',
      a: 'No. We build inside the mail tool you already use. If it cannot support what you need, we tell you before you pay.',
    },
    {
      q: 'Will the drafts sound like us?',
      a: 'They are written from your existing replies and you approve them before go-live. Anything unusual never gets a draft, it just goes to you.',
    },
    {
      q: 'How many mailboxes are included?',
      a: 'One primary mailbox or shared inbox. Extra boxes are quoted the same day, which keeps the fixed price honest.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed rules and drafts are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Get the morning back',
  finalLine:
    'Pay once, give us one mailbox, and stop losing the first two hours of the day to sorting.',
  proofKind: 'inbox-triage',
} as FunnelProductCopy
