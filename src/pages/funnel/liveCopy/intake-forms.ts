/**
 * Intake Form Pack live copy (local asset).
 * Wire into funnelCopyForSlug when the product goes live.
 */
import type {FunnelProductCopy} from '../funnelCopy'

export const INTAKE_FORMS_LIVE_COPY = {
  eyebrow: 'Fixed price, three to five days, one intake form',
  h1Generic:
    'Every first appointment starts with admin that should already be done',
  h1Personal: (b: string) =>
    `${b}, every first appointment starts with admin that should already be done`,
  sub: "Right now the details arrive as a PDF nobody can find, or buried in a reply-all thread, or not at all. Staff re-type them, customers repeat themselves, and the visit starts late. One branded form that asks only what you actually need, landing straight where the work happens.",
  ctaLabel: 'Build my intake form, $1,200',
  proofLabel: 'The leak',
  proofHeadingLive: 'You ask for the details, then chase them anyway',
  proofHeadingGeneric: 'You ask for the details, then chase them anyway',
  proofLead: (b: string | null) =>
    b
      ? `${b} sends the form, the customer means to fill it in, and it surfaces on the day as a half-finished PDF attached to the wrong email. Somebody re-types it while the appointment waits.`
      : 'You send the form, the customer means to fill it in, and it surfaces on the day as a half-finished PDF attached to the wrong email. Somebody re-types it while the appointment waits.',
  proofLeadGeneric:
    'You send the form, the customer means to fill it in, and it surfaces on the day as a half-finished PDF attached to the wrong email. Somebody re-types it while the appointment waits.',
  proofAfter:
    'The information was never the problem. The path it travels is, and that is a three to five day job.',
  proofAfterGeneric:
    'The information was never the problem. The path it travels is, and that is a three to five day job.',
  painLabel: 'What this is costing you',
  painHeading: 'Admin before the work even starts',
  painLines: [
    'Paper and PDF forms go missing somewhere between the car park and the front desk.',
    'Details get buried halfway down an email thread nobody reads twice.',
    "Your customer records have empty fields, because copying them across is everybody's least favourite job.",
    'Every first appointment opens with catching up on information you asked for a week ago.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'One form that feeds the system you already use',
  bridgeBody:
    "This isn't a generic survey tool with your logo on it, and it isn't a rebuild of your customer records. It's one intake form that looks like your business, asks only what you genuinely need, works properly on a phone, and lands the answers where your team already works, either in your CRM (the system that stores customer records) or as a structured email nobody has to decode. If you have clinical or privacy requirements beyond that, we scope them honestly at kickoff rather than pretend.",
  bridgeGaugeCaption: 'Ask once. Store once. Start the appointment on time.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Collect what you need once',
  benefits: [
    {
      title: 'Customers fill it in once',
      text: 'On their phone, in a couple of minutes, and you stop chasing the missing half.',
    },
    {
      title: 'Staff stop re-typing',
      text: 'Answers land in the system where the work happens, already in the right fields.',
    },
    {
      title: 'It looks like your business',
      text: 'Branded and clean, not a random form tool that makes people wonder if it is legitimate.',
    },
    {
      title: 'The first visit starts on time',
      text: 'You open with the actual work instead of twenty minutes of catch-up.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Fields, build, hand over',
  processSteps: [
    {
      label: 'Fields',
      text: 'We agree what you truly need before the first visit, and cut everything you do not.',
    },
    {
      label: 'Build',
      text: 'The form, the checks that stop half-finished submissions, and the destination it feeds.',
    },
    {
      label: 'Hand over',
      text: 'Who reads new submissions and when, written down so nothing sits unopened.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full pack, nothing extra to buy',
  stackItems: [
    {
      title: 'The form',
      text: 'Branded, built for a phone first, short enough that people finish it.',
    },
    {
      title: 'Field mapping',
      text: 'Answers land in your customer records or a structured inbox, in the right places.',
    },
    {
      title: 'Confirmation',
      text: 'What the customer sees after they submit, so nobody wonders if it went through.',
    },
    {
      title: 'Owner rules',
      text: 'Who checks new submissions and how often, so none of them sit unread.',
    },
  ],
  scopeLine:
    'One intake form. Clinical and privacy requirements are scoped honestly at kickoff. Not a CRM rebuild, not a multi-form suite, not endless field changes after go-live. Extra forms are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$1,200',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the form collects the agreed fields and lands them in the agreed place, tested before handover, or we keep working at no extra cost until it does.',
  priceAnchor:
    'Work out what twenty minutes of catch-up admin costs you, then multiply it by every new customer this year. That happens every week. This happens once, and the form keeps working long after.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why is this cheaper than a forms platform?',
      a: "Because you're buying the setup, not a subscription. Form tools are cheap to run and genuinely painful to configure properly. We do the configuring, map it into your system, test it, and hand it over.",
    },
    {
      q: 'Is this just a survey with our logo on it?',
      a: 'No. A survey collects answers into a spreadsheet. This collects the specific fields you need and puts them where your team already works, so nobody re-types anything.',
    },
    {
      q: 'Can you handle clinical or privacy requirements?',
      a: 'We scope that honestly at kickoff. If you need specialised clinical compliance beyond a practical intake form, we tell you before you pay rather than after.',
    },
    {
      q: 'Where do submissions end up?',
      a: 'In your customer records where the system allows it, otherwise as a structured email you approve. We lock the destination at kickoff.',
    },
    {
      q: 'How many forms do I get?',
      a: 'One, done properly. Extra forms are quoted the same day, which keeps the fixed price honest.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the form does not collect the agreed fields into the agreed place, we keep working at no extra cost until it does.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Collect what you need once',
  finalLine:
    'Pay once, agree the fields, and start appointments with the details already in front of you.',
  proofKind: 'intake-forms',
} as FunnelProductCopy
