import type {FunnelProductCopy} from '../funnelCopy'

/** Live /go copy for Inbox Triage Assistant. Wired later via funnelCopyForSlug. */
export const INBOX_TRIAGE_LIVE_COPY = {
  eyebrow: 'Warm setup · About a week · One mailbox',
  h1Generic: 'Your inbox is running the business instead of the other way around',
  h1Personal: (b: string) =>
    `${b}, your inbox is running the business instead of the other way around`,
  sub: 'Rules and draft-reply assistance so routine mail gets sorted and suggested answers appear for humans to send. You stay in charge of what goes out.',
  ctaLabel: 'Fix my inbox · $2,200',
  proofLabel: 'The picture',
  proofHeadingLive: 'Triage before burnout',
  proofHeadingGeneric: 'Triage before burnout',
  proofLead: (b: string | null) =>
    b
      ? `${b} can bury important mail under newsletters while the same reply gets rewritten ten times.`
      : 'Important mail sits under newsletters. Drafting the same reply ten times is not leadership.',
  proofLeadGeneric:
    'Important mail sits under newsletters. Drafting the same reply ten times is not leadership.',
  proofAfter:
    'Labels or folders for the usual types, plus draft helpers for repetitive answers.',
  proofAfterGeneric:
    'Labels or folders for the usual types, plus draft helpers for repetitive answers.',
  painLabel: 'What this is costing you',
  painHeading: 'Email is the unpaid second job',
  painLines: [
    'Everything lands in one stream.',
    'You rewrite the same paragraph daily.',
    'Urgent client mail looks like noise.',
    'Team inboxes have no shared rules.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Triage rules plus draft help',
  bridgeBody:
    'Organisation first, then AI drafts you approve. Not autopilot sending. One primary mailbox or shared inbox, scoped at kickoff.',
  bridgeGaugeCaption: 'Sort. Suggest. You send.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Less hunting. Faster replies. You still decide',
  benefits: [
    {title: 'Less hunting', text: 'Mail lands in sensible buckets.'},
    {title: 'Faster replies', text: 'Drafts for the repetitive ones.'},
    {
      title: 'Human final say',
      text: 'Nothing sends without you unless you explicitly choose that later.',
    },
    {title: 'Feeds Team AI', text: 'Same discipline as wider team prompts.'},
  ],
  processLabel: 'How it runs',
  processHeading: 'Map, rules, drafts',
  processSteps: [
    {label: 'Map', text: 'Types of mail and what "done" means.'},
    {label: 'Rules', text: 'Labels, filters, priorities.'},
    {label: 'Drafts', text: 'Prompt pack for repetitive replies.'},
  ],
  stackLabel: 'Everything included',
  stackHeading: 'What ships for one mailbox',
  stackItems: [
    {title: 'Triage map', text: 'Categories that match your week.'},
    {title: 'Rules setup', text: 'In the mail tool you already use.'},
    {title: 'Draft prompt pack', text: 'For humans to run, not silent send.'},
    {title: 'Team note', text: 'How shared inboxes stay clean.'},
  ],
  scopeLine:
    'One primary mailbox or shared inbox, locked at kickoff. Not a full CRM, not unsupervised auto-send, not a rewrite of every template you own.',
  priceLabel: 'Investment',
  price: '$2,200',
  priceLead: 'Paid once when mailbox scope locks at kickoff.',
  guarantee:
    'Agreed rules and draft pack are in place, or we keep working at no extra cost until they are.',
  priceAnchor: 'Hours back every week for the person who owns the inbox.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
    {
      q: 'Will it send mail without me?',
      a: 'No. Drafts are for humans to review and send. Autopilot send is only if you explicitly choose that later, and it is not the default.',
    },
    {
      q: 'Which mail tools do you support?',
      a: 'We work in the mail tool you already use for that mailbox. Scope locks at kickoff so the rules match the real inbox.',
    },
    {
      q: 'Is this Team AI?',
      a: 'No. This is inbox triage and draft help for one mailbox. Team AI is a wider shared prompt setup for the whole team.',
    },
    {
      q: 'Can we cover every shared inbox?',
      a: 'The $2,200 lock is one primary mailbox or shared inbox. Extra boxes are quoted the same day.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed rules and draft pack are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Make email smaller',
  finalLine: 'Triage rules and draft help. Paid once.',
  proofKind: 'inbox-triage',
} as FunnelProductCopy
