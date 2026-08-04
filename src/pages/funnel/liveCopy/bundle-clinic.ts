import type {FunnelProductCopy} from '../funnelCopy'

/**
 * Live copy for Clinic Capture Bundle.
 * Written for a first-time reader who has never seen the individual product pages.
 */
export const BUNDLE_CLINIC_LIVE_COPY = {
  eyebrow: 'Bundle · One location · One sprint',
  h1Generic: 'Profile, reviews, and missed-call text-back for clinics that lose people at the door',
  h1Personal: (b: string) =>
    `${b}, profile, reviews, and missed-call text-back for clinics that lose people at the door`,
  sub: 'Three capture jobs in one sprint: we clean your Google listing, set a review ask that keeps firing, and text people back when a call rings out. One kickoff. List price below buying the three apart.',
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
  proofAfter:
    'One sprint that cleans the listing, gets reviews moving, and catches missed calls with a text.',
  proofAfterGeneric:
    'One sprint that cleans the listing, gets reviews moving, and catches missed calls with a text.',
  painLabel: 'What this is costing you',
  painHeading: 'Patients leave without drama',
  painLines: [
    'Your Google listing looks unfinished next to the clinic down the road.',
    'Reviews stall because nobody asks after a visit.',
    "Missed calls become the competitor's booking.",
    'Buying three jobs apart means three kickoffs you do not have time for.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'One capture bundle',
  bridgeBody:
    'We do three jobs in one delivery window. Clean the Google Business Profile so Maps looks finished. Install a review ask that fires after a visit. Send an SMS when a call rings out so the person can still book. One access chat. One handoff.',
  bridgeGaugeCaption: 'Find. Trust. Catch the call.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes you can feel in a week',
  benefits: [
    {
      title: 'One access window',
      text: 'Your team only hands over Maps and phone access once, not three times.',
    },
    {
      title: 'Coherent local story',
      text: 'Listing, proof, and missed-call catch move together instead of drifting apart.',
    },
    {
      title: 'Bundle list price',
      text: '$2,200 vs $2,450 if you buy the three jobs as separate products.',
    },
    {
      title: 'Natural next step',
      text: 'Add Booking System later when you want a Book now button on the site.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'A short, clear path',
  processSteps: [
    {
      label: 'Brief',
      text: 'We lock your Google listing, how reviews get asked, and which phone to watch.',
    },
    {
      label: 'Build',
      text: 'Profile clean-up, review ask path, and missed-call SMS in one window.',
    },
    {
      label: 'Handoff',
      text: 'Who owns review asks, who watches missed-call texts, and what to check monthly.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, three capture jobs',
  stackItems: [
    {
      title: 'Google Profile Fix',
      text: 'We clean categories, photos, hours, and the basics so your Maps listing looks finished and easy to trust.',
    },
    {
      title: 'Review Engine',
      text: 'A simple ask after a visit so new Google reviews keep arriving without staff remembering to chase.',
    },
    {
      title: 'Missed-Call Text-Back',
      text: 'When a call rings out, an automatic SMS goes back so the person can still book instead of ringing the clinic next door.',
    },
  ],
  scopeLine:
    'One location. Google Profile Fix, Review Engine, and Missed-Call Text-Back as scoped at kickoff. Booking System is not included.',
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
      a: 'Three jobs for one location: we clean your Google Business Profile, set a review ask that keeps firing after visits, and text people back when a call rings out. Scoped at kickoff.',
    },
    {
      q: 'Is Booking System in this bundle?',
      a: 'No. Booking is the natural next step when you want a Book now button. This pack covers find on Maps, trust from reviews, and catch the missed call.',
    },
    {
      q: 'Why buy the bundle instead of three products?',
      a: 'One access window, one handoff, and $2,200 instead of $2,450 if you buy Google Profile Fix, Review Engine, and Missed-Call Text-Back apart.',
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
  finalLine: 'Clean listing, review asks, missed-call text-back. Paid once.',
  proofKind: 'bundle-clinic',
} as FunnelProductCopy
