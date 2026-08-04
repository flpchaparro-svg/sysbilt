import type {FunnelProductCopy} from '../funnelCopy'

/** Live copy for Speed Next Bundle. Wire via funnelCopyForSlug when ready. */
export const BUNDLE_SPEED_NEXT_LIVE_COPY = {
  eyebrow: 'Bundle · After Speed Fix · Same access window',
  h1Generic: 'While the site is open: make pages convert and make results visible',
  h1Personal: (b: string) =>
    `${b}, while the site is open: make pages convert and make results visible`,
  sub: 'Two follow-on jobs while site access is still warm: rewrite priority pages so the next step is obvious, and wire tracking plus forms so you can see when an enquiry lands. Natural finish after Website Speed Fix.',
  ctaLabel: 'Buy Speed Next · $2,400',
  proofLabel: 'The picture',
  proofHeadingLive: 'Fast is not finished',
  proofHeadingGeneric: 'Fast is not finished',
  proofLead: (b: string | null) =>
    b
      ? `${b} can be quick and still leave people unsure what to do, with no clear signal that an enquiry landed.`
      : 'Speed without a clear ask, and without measurement, leaves you wondering what changed.',
  proofLeadGeneric:
    'Speed without a clear ask, and without measurement, leaves you wondering what changed.',
  proofAfter: 'Priority pages ask properly, and you can see enquiries land.',
  proofAfterGeneric: 'Priority pages ask properly, and you can see enquiries land.',
  painLabel: 'What this is costing you',
  painHeading: 'You paid for speed and still argue about results',
  painLines: [
    'Pages are quick and unclear.',
    'Nobody knows if enquiries rose.',
    'A second kickoff feels heavy.',
    'Marketing wants proof you cannot show.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Speed Next bundle',
  bridgeBody:
    'While site access is warm, we do two jobs in one window. We rewrite scoped pages so the ask is clear. We wire primary events and form destinations so you can see enquiries land. No second chase for passwords.',
  bridgeGaugeCaption: 'Clear ask. Visible signal.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes you can point at',
  benefits: [
    {
      title: 'Same open window',
      text: 'We reuse the site access from Speed Fix, or any job where the site is already open.',
    },
    {
      title: 'Words and proof together',
      text: 'Clearer pages and measurable enquiries ship in one pass, not two kickoffs.',
    },
    {
      title: 'Honest bundle price',
      text: '$2,400 for both jobs in one window, vs $1,400 + $950 if you buy them apart.',
    },
    {
      title: 'A story you can tell',
      text: 'The site is fast, the ask is clear, and you can show when enquiries land.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'A short, clear path',
  processSteps: [
    {
      label: 'Pages',
      text: 'We lock two service pages plus the main ask, then rewrite headlines and CTAs so the path to enquire is obvious.',
    },
    {
      label: 'Signal',
      text: 'We wire the primary events and form destinations so a real enquiry shows up where you watch.',
    },
    {
      label: 'Show',
      text: 'Before/after note on the pages, plus a test enquiry so you see the signal fire.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Two jobs that finish Speed Fix',
  stackItems: [
    {
      title: 'Conversion Pass',
      text: 'We rewrite scoped pages so headlines, CTAs, and the path to enquire are clear. Not a full redesign.',
    },
    {
      title: 'Tracking and Forms Pack',
      text: 'We set primary events, form destinations, and a plain watchlist so you can see whether enquiries landed.',
    },
  ],
  scopeLine:
    'Assumes site access similar to Speed Fix. Conversion Pass and Tracking and Forms Pack as scoped at kickoff.',
  priceLabel: 'Investment',
  price: '$2,400',
  priceLead: 'Paid once when the page list and tracking scope lock at kickoff. Bundle list price.',
  guarantee:
    'Both scoped pieces deliver, or we keep working at no extra cost until they do.',
  priceAnchor: 'The finish after Speed Fix.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
    {
      q: 'Do I need Website Speed Fix first?',
      a: 'It pairs best right after Speed Fix while access is warm. It can also follow any job where we already have the site open and you want convert plus measure.',
    },
    {
      q: 'What is Conversion Pass?',
      a: 'Clearer asks on scoped pages: headlines, CTAs, and the path to enquire. Not a full redesign.',
    },
    {
      q: 'What is Tracking and Forms Pack?',
      a: 'Primary events, form destinations, and a plain watchlist so you can see whether enquiries landed.',
    },
    {
      q: 'Why buy the bundle?',
      a: 'Same access window, one story, and both jobs scoped together for $2,400 instead of two separate kickoffs at $1,400 + $950.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the two agreed pieces are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Finish what Speed Fix started',
  finalLine: 'Convert and measure. Paid once.',
  proofKind: 'bundle-speed-next',
} as FunnelProductCopy
