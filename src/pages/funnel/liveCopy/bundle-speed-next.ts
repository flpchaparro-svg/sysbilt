import type {FunnelProductCopy} from '../funnelCopy'

/** Live copy for Speed Next Bundle. Wire via funnelCopyForSlug when ready. */
export const BUNDLE_SPEED_NEXT_LIVE_COPY = {
  eyebrow: 'Bundle · After Speed Fix · Same access window',
  h1Generic: 'While the site is open: make pages convert and make results visible',
  h1Personal: (b: string) =>
    `${b}, while the site is open: make pages convert and make results visible`,
  sub: 'Conversion Pass plus Tracking and Forms Pack as the natural next bundle after Website Speed Fix. Same access window, two jobs that finish the story.',
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
    'This is not another archaeology of passwords. While site access is warm, we run Conversion Pass on scoped pages and wire Tracking and Forms so you can see enquiries land.',
  bridgeGaugeCaption: 'Clear ask. Visible signal.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {title: 'Same open window', text: 'No second archaeology of passwords.'},
    {title: 'Words and proof together', text: 'Convert and measure in one pass.'},
    {title: 'Honest bundle price', text: '$2,400 vs $1,400 + $950 separate.'},
    {title: 'Story for the client', text: 'We made it fast, clear, and measurable.'},
  ],
  processLabel: 'How it runs',
  processHeading: 'A short, clear path',
  processSteps: [
    {label: 'Pages', text: 'Conversion Pass on scoped URLs.'},
    {label: 'Signal', text: 'Tracking and form destinations.'},
    {label: 'Show', text: 'Before/after note plus a test enquiry.'},
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Two jobs that finish Speed Fix',
  stackItems: [
    {title: 'Conversion Pass', text: 'Included.'},
    {title: 'Tracking and Forms Pack', text: 'Included.'},
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
      a: 'Same access window, one story, and $2,400 instead of $1,400 + $950 if you buy them apart.',
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
