import type {FunnelProductCopy} from '../funnelCopy'

/** Live copy for Pages that ask (Conversion Pass + Tracking). */
export const BUNDLE_SPEED_NEXT_LIVE_COPY = {
  eyebrow: 'Two jobs, one window, while access is still open',
  h1Generic: 'The site is fast now. It still never asks anyone to do anything',
  h1Personal: (b: string) =>
    `${b}, the site is fast now, and it still never asks anyone to do anything`,
  sub: 'Speed was the first half. The second half is the pages actually asking for the enquiry, and you being able to see when one lands. While we still have access to the site, we rewrite the pages that matter so the next step is obvious, then wire the tracking and forms so a real enquiry turns up where you can see it.',
  ctaLabel: 'Buy Pages that ask, $1,900',
  proofLabel: 'The gap',
  proofHeadingLive: 'Fast is not finished',
  proofHeadingGeneric: 'Fast is not finished',
  proofLead: (b: string | null) =>
    b
      ? `${b} now loads quickly, and a visitor still reads two paragraphs about your values before finding anything that tells them what to do next. Then nobody can say whether enquiries went up, because nothing is counting them.`
      : 'The site now loads quickly, and a visitor still reads two paragraphs about your values before finding anything that tells them what to do next. Then nobody can say whether enquiries went up, because nothing is counting them.',
  proofLeadGeneric:
    'The site now loads quickly, and a visitor still reads two paragraphs about your values before finding anything that tells them what to do next. Then nobody can say whether enquiries went up, because nothing is counting them.',
  proofAfter:
    'Speed gets people to stay. The words get them to act. The tracking tells you whether any of it worked. All three or you are guessing.',
  proofAfterGeneric:
    'Speed gets people to stay. The words get them to act. The tracking tells you whether any of it worked. All three or you are guessing.',
  leakHeading: 'Fast without the ask still loses',
  leakBody:
    'Speed is fixed, then the page still does not ask clearly, and you cannot see what landed.',
  painLabel: 'What this is costing you',
  painHeading: 'You paid for speed and still argue about results',
  painLines: [
    'The pages load fast and still leave people unsure what they are meant to do next.',
    'Nobody can tell you whether enquiries actually went up, because nothing was ever set up to count them.',
    'Forms send to an inbox somebody left, or to nowhere at all, and you find out months later.',
    'Booking a second kickoff feels like a whole project, so it quietly never happens.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Clear ask, visible signal, same access window',
  bridgeBody:
    'While we still have access to the site, we do two jobs in one window. First the words: we rewrite the pages you pick so the headline says what you do, and the next step is obvious without scrolling. Then the measurement: we wire the main actions and every form destination, then send a real test enquiry so you watch it arrive. No second hunt for passwords, no waiting on a new kickoff.',
  bridgeGaugeCaption: 'The page asks properly. You can see the answer.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes you can point at',
  benefits: [
    {
      title: 'The page finally asks',
      text: 'Headlines and buttons that say what to do next, on the pages that actually get traffic.',
    },
    {
      title: 'You can see enquiries land',
      text: 'The main actions and every form destination wired up, then proved with a real test submission.',
    },
    {
      title: 'No second access chase',
      text: 'We already have the site open, so nobody has to go hunting for logins again in three months.',
    },
    {
      title: 'You find out if it worked',
      text: 'Both jobs land together, so you get a clean read instead of two half-changes months apart.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Pages, signal, proof',
  processSteps: [
    {
      label: 'Pages',
      text: 'We lock two service pages plus the main ask, then rewrite headlines and buttons so the path to enquire is obvious.',
    },
    {
      label: 'Signal',
      text: 'We wire the main actions and form destinations so a real enquiry shows up where you actually look.',
    },
    {
      label: 'Proof',
      text: 'A before and after note on the pages, plus a test enquiry you watch arrive.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Two jobs that finish what Speed Fix started',
  stackItems: [
    {
      title: 'Conversion Pass',
      text: 'Headlines, buttons and the path to enquire rewritten on the pages you pick. Not a redesign, the same site saying something clearer.',
    },
    {
      title: 'Tracking and Forms Pack',
      text: 'Your main actions and every form destination wired up, plus a short list of what to check each week, proved with a live test.',
    },
  ],
  scopeLine:
    'Assumes site access like Website Speed Fix. Conversion Pass and Tracking and Forms Pack as scoped at kickoff. Extra pages, events or forms are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$1,900',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: both scoped pieces are delivered, with a test enquiry proved end to end, or we keep working at no extra cost until they are.',
  priceAnchor:
    'Bought separately Conversion Pass and Tracking and Forms Pack are $2,350. Together they are $1,900, while the site is still open, so you get a clean read instead of two half-changes months apart.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why buy both together instead of one at a time?',
      a: 'Because they answer the same question. Clearer pages should bring more enquiries, and the tracking is what tells you whether they did. Split them across months and you never get a clean read on either.',
    },
    {
      q: 'Do I need Website Speed Fix first?',
      a: 'It fits best straight after, while access is still warm. It also works after any job where we already have the site open and you want the pages to convert and the results to be visible.',
    },
    {
      q: 'What is Conversion Pass?',
      a: 'A rewrite of the pages you pick: headlines, buttons and the path to enquire. Same design, clearer words, so people know what to do.',
    },
    {
      q: 'What is the Tracking and Forms Pack?',
      a: 'Your main actions and form destinations wired up so enquiries are counted and land in the right inbox, plus a short weekly watchlist in plain English.',
    },
    {
      q: 'Will you redesign the site?',
      a: 'No. The design stays. We change what the pages say and where the buttons take people.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the two agreed pieces are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Finish what Speed Fix started',
  finalLine:
    'Pay once, while the site is still open, and get pages that ask plus numbers that answer.',
  proofKind: 'bundle-speed-next',
} as FunnelProductCopy
