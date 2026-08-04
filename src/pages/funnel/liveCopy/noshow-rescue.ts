/**
 * No-Show Rescue live copy (local asset).
 * Wire into funnelCopyForSlug when the product goes live.
 */
import type {FunnelProductCopy} from '../funnelCopy'

export const NOSHOW_RESCUE_LIVE_COPY = {
  eyebrow: 'Fixed price, live in two days',
  h1Generic: 'An empty chair costs you the same as a full one',
  h1Personal: (b: string) => `${b}, an empty chair costs you the same as a full one`,
  sub: "Somebody books, then forgets, and you find out when the room stays empty. Either the reminder never went out, or it went out at a time nobody reads. We set up reminders that land when they'll actually be seen, plus a rebook path for the ones who miss, on the calendar you already use.",
  ctaLabel: 'Rescue no-shows, $750',
  proofLabel: 'The leak',
  proofHeadingLive: 'A no-show is a process gap, not a bad customer',
  proofHeadingGeneric: 'A no-show is a process gap, not a bad customer',
  proofLead: (b: string | null) =>
    b
      ? `${b} spends real money filling the diary, then loses the slot to somebody who genuinely forgot. You still pay the staff, the rent and the light bill for that hour.`
      : 'You spend real money filling the diary, then lose the slot to somebody who genuinely forgot. You still pay the staff, the rent and the light bill for that hour.',
  proofLeadGeneric:
    'You spend real money filling the diary, then lose the slot to somebody who genuinely forgot. You still pay the staff, the rent and the light bill for that hour.',
  proofAfter:
    'Most people who miss would happily come back. They just never get asked, because the miss ends in a sigh instead of a message.',
  proofAfterGeneric:
    'Most people who miss would happily come back. They just never get asked, because the miss ends in a sigh instead of a message.',
  painLabel: 'What this is costing you',
  painHeading: 'The gap in the day costs real money',
  painLines: [
    'Reminders are manual, so they go out when someone remembers rather than when they work.',
    'A no-show ends in a sigh, so a customer who would gladly rebook never gets asked.',
    'Staff lose the morning ringing around to fill a gap that was avoidable.',
    'You end up blaming customers for something that is really a gap in the process.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Remind properly, then recover the ones who still miss',
  bridgeBody:
    "This isn't a new booking system and it isn't a rebuild. It's reminders at the times that actually reduce misses, sent on the channel your customers already read, plus a rebook path for anyone who does not show. We build it on the calendar you already use and prove it with a dummy booking before you rely on it.",
  bridgeGaugeCaption: 'Fewer empty chairs. Faster recovery on the ones you lose.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Protect the chair you already paid to fill',
  benefits: [
    {
      title: 'Fewer forgotten appointments',
      text: 'Reminders land at the times people actually read them, not whenever somebody got around to it.',
    },
    {
      title: 'A miss becomes a rebook',
      text: 'They get an easy way back in instead of an awkward silence, so the slot is not simply gone.',
    },
    {
      title: 'Staff stop ringing around',
      text: 'The reminders run themselves, so the morning goes on the work rather than the phone.',
    },
    {
      title: 'Your booking spend works harder',
      text: 'Every dollar you put into filling the diary is worth more when the diary stays full.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Fit, build, test',
  processSteps: [
    {
      label: 'Fit',
      text: 'We check your calendar tool and the channel your customers actually read, usually text or email.',
    },
    {
      label: 'Build',
      text: 'Reminder timing and wording you approve, plus the rebook path for anyone who misses.',
    },
    {
      label: 'Test',
      text: 'A dummy booking runs the whole path with you watching before a real customer sees it.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full setup, nothing extra to buy',
  stackItems: [
    {
      title: 'Reminder set',
      text: 'Timing and wording you approve, on the channel your customers already read.',
    },
    {
      title: 'Rebook path',
      text: 'A link or instruction that actually works, so a miss can turn into next week.',
    },
    {
      title: 'Owner alert',
      text: 'An optional ping when a slot frees up late enough to be worth filling.',
    },
    {
      title: 'Live test',
      text: 'A dummy booking proves the whole path before you depend on it.',
    },
  ],
  scopeLine:
    'One calendar system, chosen at kickoff. Not a full booking rebuild, not a multi-location rollout, not endless message redesign after go-live. Extra locations are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$750',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the reminders and the rebook path work in a live test before handover, or we keep working at no extra cost until they do.',
  priceAnchor:
    'One recovered appointment covers most of this. A couple a month covers it many times over. The gaps happen every week whether you fix this or not, and this is a two day job you pay for once.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why is this only $750?',
      a: "Because it's a small job on a calendar you already have. We're not rebuilding your booking system, we're wiring the reminders and the rebook path that should have been there from the start. Small scope, small price, no monthly fee.",
    },
    {
      q: 'Do I need a booking system first?',
      a: 'It works best alongside one. If your current calendar tool is solid, we can still wire reminders and rebooking onto it. We check before you pay.',
    },
    {
      q: 'Which channel do the reminders go out on?',
      a: 'Whatever your customers already read, usually text or email. We lock the channel at kickoff so there are no surprise costs.',
    },
    {
      q: 'Will it fill the empty slot for me?',
      a: 'No, and nothing honestly can. It reminds people so fewer slots go empty, and gives the ones who miss an easy way to rebook. Filling a late gap still needs a person.',
    },
    {
      q: 'Will customers find the reminders annoying?',
      a: 'Not at the timing we use. You approve the wording and the schedule, and most people are relieved to be reminded.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the reminders and rebook path do not work in testing, we keep working at no extra cost until they do.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Protect the chair you already paid to fill',
  finalLine:
    'Pay once, tell us your calendar tool, and the reminders are live in about two days.',
  proofKind: 'noshow-rescue',
} as FunnelProductCopy
