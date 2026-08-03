/**
 * No-Show Rescue · live copy (local asset).
 * Wire into funnelCopyForSlug when the product goes live.
 */
import type {FunnelProductCopy} from '../funnelCopy'

export const NOSHOW_RESCUE_LIVE_COPY = {
  eyebrow: 'Fixed price · Two days · One calendar system',
  h1Generic: 'Empty chairs hurt more when the reminder never landed',
  h1Personal: (b: string) =>
    `${b}, empty chairs hurt more when the reminder never landed`,
  sub: 'Reminders and a rebook path for no-shows, usually beside Booking System. Protect the calendar you already fought to fill.',
  ctaLabel: 'Rescue no-shows · $750',
  proofLabel: 'The picture',
  proofHeadingLive: 'No-shows are a systems problem',
  proofHeadingGeneric: 'No-shows are a systems problem',
  proofLead: (b: string | null) =>
    b
      ? `${b} can fill the diary and still lose the hour if the only reminder is hope.`
      : 'People forget. Life happens. If your only reminder is hope, the chair stays empty.',
  proofLeadGeneric:
    'People forget. Life happens. If your only reminder is hope, the chair stays empty.',
  proofAfter: 'Reminder cadence plus a simple rebook path when they miss.',
  proofAfterGeneric: 'Reminder cadence plus a simple rebook path when they miss.',
  painLabel: 'What this is costing you',
  painHeading: 'The gap in the day costs real money',
  painLines: [
    'Reminders are manual or missing.',
    'No-shows get a sigh, not a rebook link.',
    'Staff scramble to fill gaps last minute.',
    'You blame customers for a process gap.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Remind, then recover',
  bridgeBody:
    'Reminder messages and a rebook path on one calendar system. Best with Booking already live. Fit, build, and test with a dummy booking.',
  bridgeGaugeCaption: 'Fewer empty chairs. Faster recovery.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Protect the chair you already booked',
  benefits: [
    {
      title: 'Fewer forgotten visits',
      text: 'Reminders land before the appointment.',
    },
    {
      title: 'Rebook without shame',
      text: 'A clear path when they miss.',
    },
    {
      title: 'Staff time back',
      text: 'Less manual chasing.',
    },
    {
      title: 'Protects Booking ROI',
      text: 'The calendar system earns more when kept full.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Fit, build, test',
  processSteps: [
    {
      label: 'Fit',
      text: 'Your calendar tool and message channel.',
    },
    {
      label: 'Build',
      text: 'Reminder and rebook copy, timing.',
    },
    {
      label: 'Test',
      text: 'A dummy booking proves the path.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'What ships in the rescue',
  stackItems: [
    {
      title: 'Reminder set',
      text: 'Timing you approve.',
    },
    {
      title: 'Rebook path',
      text: 'Link or instruction that works.',
    },
    {
      title: 'Owner alert',
      text: 'Optional ping when a slot frees late.',
    },
  ],
  scopeLine:
    'One calendar system, chosen at kickoff. Not a full Booking System rebuild, not multi-location rollout, not endless message redesign after go-live.',
  priceLabel: 'Investment',
  price: '$750',
  priceLead: 'Paid once when the calendar tool and message channel lock at kickoff.',
  guarantee:
    'Reminders and rebook path work in testing, or we keep working at no extra cost until they do.',
  priceAnchor: 'One recovered appointment can cover this.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
    {
      q: 'Do I need Booking System first?',
      a: 'It pairs best when Booking is already live. If your calendar tool is solid, we can still wire reminders and rebook on that system.',
    },
    {
      q: 'Which channels do you use?',
      a: 'Whatever you already use for client messages, usually SMS or email. We lock the channel at kickoff.',
    },
    {
      q: 'Will this fill the slot automatically?',
      a: 'No. It reminds, then offers a rebook path. Filling the gap still needs a person or your existing booking flow.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If reminders and rebook do not work in testing as scoped, we keep working at no extra cost until they do.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Protect the chair you already booked',
  finalLine: 'Reminders and rebook. Paid once.',
  proofKind: 'noshow-rescue',
} as FunnelProductCopy
