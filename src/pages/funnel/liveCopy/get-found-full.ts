import type {FunnelProductCopy} from '../funnelCopy'

export const GET_FOUND_FULL_LIVE_COPY = {
  eyebrow: 'Three jobs, one window, one site',
  h1Generic: 'Google cannot see it, the pages that exist are thin, and nobody answered the question',
  h1Personal: (b: string) =>
    `${b}, Google cannot see it, the pages that exist are thin, and nobody answered the question`,
  sub: 'Three jobs in one window: we clear what is blocking Google, we fix titles, headings, links and thin copy on the pages that matter, then we write and mark up the FAQs. One handover.',
  ctaLabel: 'Buy Get found (full), $3,600',
  proofLabel: 'The leak',
  proofHeadingLive: 'Invisible, thin, and unanswered',
  proofHeadingGeneric: 'Invisible, thin, and unanswered',
  proofLead: (b: string | null) =>
    b
      ? `Someone searches for what ${b} does. Pages never appear, or they appear with a useless title, or they appear and still do not answer the question.`
      : 'Someone searches for what you do. Pages never appear, or they appear with a useless title, or they appear and still do not answer the question.',
  proofLeadGeneric:
    'Someone searches for what you do. Pages never appear, or they appear with a useless title, or they appear and still do not answer the question.',
  proofAfter:
    'Indexing, on-page, and FAQs are one findability path. Broken anywhere along it, you still look absent.',
  proofAfterGeneric:
    'Indexing, on-page, and FAQs are one findability path. Broken anywhere along it, you still look absent.',
  leakHeading: 'Three gaps between you and the search',
  leakBody:
    'Blocked pages, thin titles, and no answers feel like three projects. They are one findability leak.',
  painLabel: 'What this is costing you',
  painHeading: 'The site is there. Search treats it as missing',
  painLines: [
    'Pages you already wrote never appear, because something is blocking the crawl.',
    'The pages that do appear have titles and headings that say nothing useful.',
    'Nobody answered the awkward questions, so people bounce to whoever did.',
    'Three separate jobs means three kickoffs, so in practice none of them ever start.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Indexed, written, answered',
  bridgeBody:
    'We do the three full products in one planned window. Search Visibility Fix so the crawl blocks come off, the sitemap is clean, Search Console sits on your account, and we watch the recrawl for 30 days. On-Page Search Pack so up to eight agreed pages get honest titles, headings, internal links, and thin copy lifted. Schema and FAQ Pack so up to three services get up to eight real answers each, placed and marked up. One access conversation, one handoff.',
  bridgeGaugeCaption: 'Indexed. Written. Answered.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes you can check',
  benefits: [
    {
      title: 'Google can see the pages',
      text: 'The blocks come off, the sitemap is clean, and we watch the recrawl instead of guessing.',
    },
    {
      title: 'The pages say what they are',
      text: 'Titles, headings, links, and thin copy on up to eight pages, written for a person first.',
    },
    {
      title: 'Less than buying them apart',
      text: '$3,600 together, against $4,500 for the same three products bought separately.',
    },
    {
      title: 'A clear next step, not a trap',
      text: 'Conversion Pass is the natural job after this if the pages still do not ask. It is not in this pack.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Access, build, watch',
  processSteps: [
    {
      label: 'Access',
      text: 'We lock the site, Search Console, the eight pages, and which three services the FAQs cover.',
    },
    {
      label: 'Build',
      text: 'Indexation fixes, on-page pass, and FAQ plus schema, inside one delivery window.',
    },
    {
      label: 'Watch',
      text: '30-day recrawl monitoring, plus a validation note on what we checked.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Three full products, one price',
  stackItems: [
    {
      title: 'Search Visibility Fix',
      text: 'Full indexation diagnosis and fix, sitemap rebuilt and resubmitted, Search Console under your ownership, plain-English summary, Systems Snapshot, 30 days of recrawl monitoring and 14 days of aftercare. Same scope as the $1,400 door.',
    },
    {
      title: 'On-Page Search Pack',
      text: 'Up to eight pages: titles and headings, internal links, thin pages lifted. Same scope as the $1,900 door.',
    },
    {
      title: 'Schema and FAQ Pack',
      text: 'Up to three services, up to eight FAQs each, placed where visitors read, structured Q&A markup aligned to the text, validation note. Same scope as the $1,200 door.',
    },
  ],
  scopeLine:
    'One site, one Search Console property. Search Visibility Fix, On-Page Search Pack, and Schema and FAQ Pack as scoped at kickoff. Conversion Pass is not included. Extra pages or services are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$3,600',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: all three scoped products are delivered, with the recrawl watched and the agreed pages and answers shipped, or we keep working at no extra cost until they are.',
  priceAnchor:
    'Bought separately the same three jobs are $4,500 and three kickoffs. Together they are $3,600, one access handover, and the site can be found, read, and cited.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why buy the pack instead of the three products?',
      a: 'Partly the $900. Mostly the sequence. On-page work is wasted if Google cannot see the pages, and FAQs are wasted if the titles still say nothing. Done together they land in the right order and your team hands over access once.',
    },
    {
      q: 'What exactly is included?',
      a: 'The same three products we sell separately: Search Visibility Fix, On-Page Search Pack, and Schema and FAQ Pack, at full scope, for one site.',
    },
    {
      q: 'Is this a ranking promise?',
      a: 'No. We clear what is blocking Google, write the pages properly, and make you citeable. Rankings still depend on the wider web.',
    },
    {
      q: 'Is this Conversion Pass?',
      a: 'No. Conversion Pass rewrites the offer and the next step for people who already landed. This pack is findability.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the three agreed products are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Indexed, written, answered',
  finalLine: 'Pay once, hand over access once, and close the three findability jobs in a single sprint.',
  proofKind: 'get-found-full',
} as FunnelProductCopy
