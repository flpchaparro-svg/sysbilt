import type {FunnelProductCopy} from '../funnelCopy'

/** Live /go copy for Dashboard Lite. Wired later via funnelCopyForSlug. */
export const DASHBOARD_LITE_LIVE_COPY = {
  eyebrow: 'Warm · About two weeks · Lite scope',
  h1Generic: 'One screen for leads, bookings, reviews, and what ads returned',
  h1Personal: (b: string) =>
    `${b}, one screen for leads, bookings, reviews, and what ads returned`,
  sub: 'A lite dashboard that answers "are we okay this week?" without a BI project. Wired to the sources you already have.',
  ctaLabel: 'Build my dashboard · $2,600',
  proofLabel: 'The picture',
  proofHeadingLive: 'Decisions need a single pane',
  proofHeadingGeneric: 'Decisions need a single pane',
  proofLead: (b: string | null) =>
    b
      ? `${b}'s numbers live in five logins. By the time you assemble them, the week is gone.`
      : 'Numbers live in five logins. By the time you assemble them, the week is gone.',
  proofLeadGeneric:
    'Numbers live in five logins. By the time you assemble them, the week is gone.',
  proofAfter:
    'A simple view: enquiries, bookings, reviews, and campaign outcomes you care about.',
  proofAfterGeneric:
    'A simple view: enquiries, bookings, reviews, and campaign outcomes you care about.',
  painLabel: 'What this is costing you',
  painHeading: 'You manage by anecdote',
  painLines: [
    'Ads look fine until you check enquiries.',
    'Bookings and reviews never sit beside each other.',
    'Staff report vibes in meetings.',
    'You buy tools and still screenshot into Slack.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Lite dashboard, real sources',
  bridgeBody:
    'Not enterprise BI. A focused board for weekly decisions, wired to sources you already pay for. Metric set locks at kickoff.',
  bridgeGaugeCaption: 'See the week. Act once.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'One place to look each week',
  benefits: [
    {title: 'One place to look', text: 'Weekly review becomes short.'},
    {title: 'Connects spend to outcomes', text: 'Ads beside enquiries and bookings.'},
    {title: 'Honest scope', text: 'A few metrics done well.'},
    {title: 'Grows with CRM Rescue', text: 'Cleaner inputs make the board better.'},
  ],
  processLabel: 'How it runs',
  processHeading: 'Pick, connect, hand off',
  processSteps: [
    {label: 'Pick metrics', text: 'Only what changes a decision.'},
    {label: 'Connect', text: 'Sources you already pay for.'},
    {label: 'Handoff', text: 'Who checks it on Monday.'},
  ],
  stackLabel: 'Everything included',
  stackHeading: 'What ships on the lite board',
  stackItems: [
    {
      title: 'Metric set',
      text: 'Leads, bookings, reviews, campaign outcomes as available.',
    },
    {title: 'Board', text: 'Simple layout, not a science fair.'},
    {title: 'Source map', text: 'Where each number comes from.'},
    {title: 'Weekly ritual', text: 'Ten-minute check, written down.'},
  ],
  scopeLine:
    'Lite scope. Metric list locked at kickoff. Deep BI, custom warehouses, and multi-brand rollups are quoted separately.',
  priceLabel: 'Investment',
  price: '$2,600',
  priceLead: 'Paid once when the metric set locks at kickoff.',
  guarantee:
    'Agreed metrics appear on the board from connected sources, or we keep working at no extra cost until they do.',
  priceAnchor: 'Weekly clarity without a data team.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
    {
      q: 'Is this a full BI project?',
      a: 'No. It is a lite board for weekly decisions. Deep BI and warehouse work are quoted separately.',
    },
    {
      q: 'Which sources can you connect?',
      a: 'Sources you already pay for that expose the metrics you choose at kickoff. If a source cannot feed cleanly, we say so before you pay.',
    },
    {
      q: 'Do I need CRM Rescue first?',
      a: 'No. Cleaner CRM data helps, and this board still stands alone when the inputs are good enough for a weekly check.',
    },
    {
      q: 'Who owns the Monday check?',
      a: 'We write the ritual and name an owner with you at handoff. The board is useless if nobody opens it.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed metrics are not on the board from connected sources, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'See the week on one screen',
  finalLine: 'Lite dashboard for decisions. Paid once.',
  proofKind: 'dashboard-lite',
} as FunnelProductCopy
