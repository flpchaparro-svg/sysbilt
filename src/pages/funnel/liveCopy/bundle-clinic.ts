import type {FunnelProductCopy} from '../funnelCopy'

/** Live copy for Clinic Capture Bundle. Wire via funnelCopyForSlug when ready. */
export const BUNDLE_CLINIC_LIVE_COPY = {
  eyebrow: 'Bundle · One location · One sprint',
  h1Generic: 'Profile, reviews, and missed-call text-back for clinics that lose people at the door',
  h1Personal: (b: string) =>
    `${b}, profile, reviews, and missed-call text-back for clinics that lose people at the door`,
  sub: 'Google Profile Fix, Review Engine, and Missed-Call Text-Back run as one clinic capture bundle. List price below buying the three as strangers.',
  ctaLabel: 'Buy Clinic Bundle · $2,200',
  proofLabel: 'The picture',
  proofHeadingLive: 'Local demand dies in small gaps',
  proofHeadingGeneric: 'Local demand dies in small gaps',
  proofLead: (b: string | null) =>
    b
      ? `${b} can look busy on Maps and still lose patients to a thin profile, quiet reviews, and unanswered calls.`
      : 'Maps, trust, and the missed call are three leaks that feel separate and are not.',
  proofLeadGeneric:
    'Maps, trust, and the missed call are three leaks that feel separate and are not.',
  proofAfter: 'One sprint covering the three capture jobs clinics feel every week.',
  proofAfterGeneric: 'One sprint covering the three capture jobs clinics feel every week.',
  painLabel: 'What this is costing you',
  painHeading: 'Patients leave without drama',
  painLines: [
    'Profile looks unfinished next to the clinic down the road.',
    'Reviews stall because nobody asks.',
    "Missed calls become the competitor's booking.",
    'Three vendors means three kickoffs you do not have time for.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'One capture bundle',
  bridgeBody:
    'This is not three separate projects with three kickoffs. It is Profile Fix, Review Engine, and Missed-Call Text-Back in one delivery window, so Maps, proof, and phone catch-up move together.',
  bridgeGaugeCaption: 'Find. Trust. Catch the call.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {title: 'One access window', text: 'Less admin for your team.'},
    {title: 'Coherent local story', text: 'Maps, proof, and phone catch-up together.'},
    {title: 'Bundle list price', text: '$2,200 vs $2,450 separate.'},
    {title: 'Natural next step', text: 'Booking System when you want Book now.'},
  ],
  processLabel: 'How it runs',
  processHeading: 'A short, clear path',
  processSteps: [
    {label: 'Brief', text: 'Profile, review ask path, phone setup.'},
    {label: 'Build', text: 'All three jobs in one window.'},
    {label: 'Handoff', text: 'Who owns asks, who watches missed calls.'},
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, three capture jobs',
  stackItems: [
    {title: 'Google Profile Fix', text: 'Included.'},
    {title: 'Review Engine', text: 'Included.'},
    {title: 'Missed-Call Text-Back', text: 'Included.'},
  ],
  scopeLine:
    'One location. Profile Fix, Review Engine, and Missed-Call Text-Back as scoped at kickoff. Booking System is not included.',
  priceLabel: 'Investment',
  price: '$2,200',
  priceLead: 'Paid once when the three pieces lock at kickoff. Bundle list price.',
  guarantee:
    'All three scoped pieces deliver, or we keep working at no extra cost until they do.',
  priceAnchor: 'Below $600 + $1,100 + $750 if bought apart.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
    {
      q: 'What is included?',
      a: 'Google Profile Fix, Review Engine, and Missed-Call Text-Back for one location, scoped at kickoff.',
    },
    {
      q: 'Is Booking System in this bundle?',
      a: 'No. Booking is the natural next step when you want Book now. This pack covers find, trust, and catch the call.',
    },
    {
      q: 'Why buy the bundle instead of three products?',
      a: 'One access window, one handoff, and $2,200 instead of $2,450 if you buy the three apart.',
    },
    {
      q: 'Is this only for clinics?',
      a: 'It is built for clinics and similar appointment businesses that lose people on Maps, reviews, and missed calls. Ask if your setup fits.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the three agreed pieces are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Stop losing patients at the front door',
  finalLine: 'Profile, reviews, missed-call catch. Paid once.',
  proofKind: 'bundle-clinic',
} as FunnelProductCopy
