/**
 * Quote Follow-Up Autopilot · live copy (local asset).
 * Wire into funnelCopyForSlug when the product goes live.
 */
import type {FunnelProductCopy} from '../funnelCopy'

export const QUOTE_FOLLOWUP_LIVE_COPY = {
  eyebrow: 'Fixed price · About a week · One quote pipeline',
  h1Generic: 'Quotes go quiet. The follow-up still depends on memory',
  h1Personal: (b: string) =>
    `${b}, quotes go quiet and the follow-up still depends on memory`,
  sub: 'A gentle chase sequence for quotes that did not convert, so warm work does not die in a spreadsheet.',
  ctaLabel: 'Chase quiet quotes · $1,450',
  proofLabel: 'The picture',
  proofHeadingLive: 'Silence after the PDF',
  proofHeadingGeneric: 'Silence after the PDF',
  proofLead: (b: string | null) =>
    b
      ? `${b} can send a solid quote and still lose the job to whoever nudged next.`
      : 'People mean to reply. Life intervenes. If you never nudge, the job goes to whoever followed up.',
  proofLeadGeneric:
    'People mean to reply. Life intervenes. If you never nudge, the job goes to whoever followed up.',
  proofAfter: 'A short, polite sequence with stop rules when they answer or say no.',
  proofAfterGeneric: 'A short, polite sequence with stop rules when they answer or say no.',
  painLabel: 'What this is costing you',
  painHeading: 'Your best leads go cold politely',
  painLines: [
    'Quotes sit in Sent with no next step.',
    'Staff hate chasing, so they avoid it.',
    'You only remember the big ones.',
    'No record of how many nudges went out.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Autopilot with manners',
  bridgeBody:
    'Timed follow-ups in your voice, with clear stop conditions. Not spam. One quote pipeline, wired and tested on your tools.',
  bridgeGaugeCaption: 'Nudge. Stop when they engage.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Warm work gets a second chance',
  benefits: [
    {
      title: 'Warm work gets a second chance',
      text: 'Without you living in Sent.',
    },
    {
      title: 'Tone stays human',
      text: 'Short, respectful, on-brand.',
    },
    {
      title: 'Stops when it should',
      text: 'Reply or decline ends the sequence.',
    },
    {
      title: 'Pairs with CRM Rescue',
      text: 'Stronger when deals already live somewhere.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Map, write, wire',
  processSteps: [
    {
      label: 'Map',
      text: 'Where quotes live and what counts as sent.',
    },
    {
      label: 'Write',
      text: 'Sequence copy and timing.',
    },
    {
      label: 'Wire',
      text: 'Automation on your tools, tested.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'What ships in the autopilot',
  stackItems: [
    {
      title: 'Sequence copy',
      text: 'Two to four touches, approved by you.',
    },
    {
      title: 'Timing rules',
      text: 'Sensible gaps, not daily noise.',
    },
    {
      title: 'Stop rules',
      text: 'Reply, book, or opt-out ends it.',
    },
    {
      title: 'Owner alert',
      text: 'When a human should call instead.',
    },
  ],
  scopeLine:
    'One quote pipeline, chosen at kickoff. Not a full CRM rebuild, not cold outbound, not endless copy rewrites after go-live.',
  priceLabel: 'Investment',
  price: '$1,450',
  priceLead: 'Paid once when the quote path locks at kickoff.',
  guarantee:
    'The agreed sequence runs and stops as scoped, or we keep working at no extra cost until it does.',
  priceAnchor: 'One recovered quote usually covers this.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
    {
      q: 'Is this spam?',
      a: 'No. It is a short, polite sequence with stop rules when they reply, book, or opt out.',
    },
    {
      q: 'Do I need CRM Rescue first?',
      a: 'No. It pairs well when deals already live in a CRM, and it also stands alone when quotes live in email or a sheet.',
    },
    {
      q: 'How many touches?',
      a: 'Usually two to four. You approve the copy and timing before it goes live.',
    },
    {
      q: 'Will it keep chasing after they say no?',
      a: 'No. Decline, reply, or opt-out ends the sequence.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed sequence is not delivered as scoped, we keep working at no extra cost until it is.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Chase the quiet quotes without nagging',
  finalLine: 'Gentle sequence. Hard stop rules. Paid once.',
  proofKind: 'quote-followup',
} as FunnelProductCopy
