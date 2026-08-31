import type {FunnelProductCopy} from '../funnelCopy'

export const GET_FOUND_LIVE_COPY = {
  eyebrow: 'Two jobs, one window, one site',
  h1Generic: 'Google cannot see half the site, and the pages it can see never answer the question',
  h1Personal: (b: string) =>
    `${b}, Google cannot see half the site, and the pages it can see never answer the question`,
  sub: 'Two jobs in one window: we clear what is blocking Google from indexing you, then write and mark up the FAQs so search and AI tools have something real to cite. One handover.',
  ctaLabel: 'Buy Get found, $2,100',
  proofLabel: 'The leak',
  proofHeadingLive: 'Invisible, then unciteable',
  proofHeadingGeneric: 'Invisible, then unciteable',
  proofLead: (b: string | null) =>
    b
      ? `Someone searches for what ${b} does. Pages that should appear never do, or they appear and still do not answer the question, so the result next door wins.`
      : 'Someone searches for what you do. Pages that should appear never do, or they appear and still do not answer the question, so the result next door wins.',
  proofLeadGeneric:
    'Someone searches for what you do. Pages that should appear never do, or they appear and still do not answer the question, so the result next door wins.',
  proofAfter:
    'Clearing the index block is wasted if the pages have nothing to cite. FAQs are wasted if Google cannot see the site. They belong together.',
  proofAfterGeneric:
    'Clearing the index block is wasted if the pages have nothing to cite. FAQs are wasted if Google cannot see the site. They belong together.',
  leakHeading: 'Blocked, then blank',
  leakBody:
    'Pages stuck out of the index, and pages with no answers, feel like two problems. They are one findability leak.',
  painLabel: 'What this is costing you',
  painHeading: 'You are paying for a site nobody can use',
  painLines: [
    'Pages you already wrote never appear, because something is blocking the crawl.',
    'The pages that do appear never answer the awkward questions, so people bounce to whoever did.',
    'You cannot tell whether the problem is technical or the words, so nothing gets fixed.',
    'Two separate jobs means two kickoffs, so in practice neither of them ever starts.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Seen, then citeable',
  bridgeBody:
    'We do both full products in one planned window. Search Visibility Fix so stray noindex tags, robots rules, broken canonicals and misfired redirects are cleared, the sitemap is rebuilt, Search Console sits on your account, and we watch the recrawl for 30 days. Schema and FAQ Pack so up to three services get up to eight real answers each, placed on the page, marked up, and validated. One access conversation, one handoff.',
  bridgeGaugeCaption: 'Indexed. Answered. Marked up.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes you can check',
  benefits: [
    {
      title: 'Google can see the pages',
      text: 'The blocks come off, the sitemap is clean, and we watch the recrawl instead of guessing.',
    },
    {
      title: 'The pages actually answer',
      text: 'Real FAQs in your voice, on the page and in markup, so search and AI tools have something to cite.',
    },
    {
      title: 'Less than buying them apart',
      text: '$2,100 together, against $2,600 for the same two products bought separately.',
    },
    {
      title: 'A clear next step, not a trap',
      text: 'On-Page Search Pack is the natural job after this if titles and thin copy still lag. It is not in this pack.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Access, build, watch',
  processSteps: [
    {
      label: 'Access',
      text: 'We lock the site, Search Console, and which three services the FAQs cover.',
    },
    {
      label: 'Build',
      text: 'Indexation fixes and FAQ plus schema, inside one delivery window.',
    },
    {
      label: 'Watch',
      text: '30-day recrawl monitoring, plus a validation note on what we checked.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Two full products, one price',
  stackItems: [
    {
      title: 'Search Visibility Fix',
      text: 'Full indexation diagnosis and fix, sitemap rebuilt and resubmitted, Search Console under your ownership, plain-English summary, Systems Snapshot, 30 days of recrawl monitoring and 14 days of aftercare. Same scope as the $1,400 door.',
    },
    {
      title: 'Schema and FAQ Pack',
      text: 'Up to three services, up to eight FAQs each, placed where visitors read, structured Q&A markup aligned to the text, validation note. Same scope as the $1,200 door.',
    },
  ],
  scopeLine:
    'One site, one Search Console property. Search Visibility Fix and Schema and FAQ Pack as scoped at kickoff. On-Page Search Pack and Conversion Pass are not included. Extra services or properties are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$2,100',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: both scoped products are delivered, with the recrawl watched and the agreed answers marked up, or we keep working at no extra cost until they are.',
  priceAnchor:
    'Bought separately the same two jobs are $2,600 and two kickoffs. Together they are $2,100, one access handover, and the site can be found and cited.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why buy the pack instead of the two products?',
      a: 'Partly the $500. Mostly the sequence. FAQs are wasted if Google cannot see the pages. Done together they land in the right order and your team hands over access once.',
    },
    {
      q: 'What exactly is included?',
      a: 'The same two products we sell separately: Search Visibility Fix and Schema and FAQ Pack, at full scope, for one site.',
    },
    {
      q: 'Is this a ranking promise?',
      a: 'No. We clear what is blocking Google and make you citeable. Rankings still depend on the wider web.',
    },
    {
      q: 'Is this On-Page Search Pack?',
      a: 'No. That pack is titles, headings, links, and thin copy. This pack is indexing plus FAQs and markup.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the two agreed products are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Seen, then citeable',
  finalLine: 'Pay once, hand over access once, and close the index block and the unanswered questions in a single sprint.',
  proofKind: 'get-found',
} as FunnelProductCopy
