/**
 * Quote Follow-Up Autopilot live copy (local asset).
 * Wire into funnelCopyForSlug when the product goes live.
 */
import type {FunnelProductCopy} from '../funnelCopy'

export const QUOTE_FOLLOWUP_LIVE_COPY = {
  eyebrow: 'Fixed price, about a week, one quote pipeline',
  h1Generic: 'The quote went out. Nothing came back. Nobody chased it',
  h1Personal: (b: string) =>
    `${b}, the quote went out, nothing came back, and nobody chased it`,
  sub: "Most quotes that go quiet aren't a no. They're a busy person who meant to reply and forgot. If nobody nudges, the job goes to whoever did. We build a short, polite follow-up that runs itself and stops the moment they answer.",
  ctaLabel: 'Chase quiet quotes, $1,450',
  proofLabel: 'The leak',
  proofHeadingLive: 'The job goes to whoever followed up',
  proofHeadingGeneric: 'The job goes to whoever followed up',
  proofLead: (b: string | null) =>
    b
      ? `${b} can send a better quote at a better price and still lose the job, because the other mob sent a two line email a week later and you did not.`
      : 'You can send a better quote at a better price and still lose the job, because the other mob sent a two line email a week later and you did not.',
  proofLeadGeneric:
    'You can send a better quote at a better price and still lose the job, because the other mob sent a two line email a week later and you did not.',
  proofAfter:
    'These are people who already asked you for a price. You have done the expensive part. The follow-up is the cheap part, and it is the part that keeps getting skipped.',
  proofAfterGeneric:
    'These are people who already asked you for a price. You have done the expensive part. The follow-up is the cheap part, and it is the part that keeps getting skipped.',
  painLabel: 'What this is costing you',
  painHeading: 'Your warmest leads go cold politely',
  painLines: [
    'Quotes sit in the Sent folder with no next step against them.',
    "Chasing feels like begging, so staff put it off, and then it's been three weeks and it's awkward.",
    'You remember to follow up on the big ones, which means every smaller quote is pure loss.',
    'Nobody can tell you how many quotes went unanswered last month, or what they were worth.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'A polite nudge that never forgets and never nags',
  bridgeBody:
    "This isn't cold outbound and it isn't a CRM rebuild. It's a short sequence, usually two to four messages, written in your voice, running on the quote pipeline you already use. You approve every word and every gap between them. It stops dead the moment they reply, book, or say no, and it pings a person when the situation deserves a phone call instead of an email.",
  bridgeGaugeCaption: 'Nudges until they answer. Stops the second they do.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Warm work gets a second chance',
  benefits: [
    {
      title: 'Every quote gets followed up',
      text: 'Not just the big ones you happened to remember on a quiet Thursday.',
    },
    {
      title: 'Nobody has to feel pushy',
      text: 'Short, respectful messages that sound like you, sent on a schedule you approved.',
    },
    {
      title: 'It stops when it should',
      text: 'A reply, a booking, or a no ends the sequence immediately. Nobody gets chased after they answer.',
    },
    {
      title: 'You find out what is really happening',
      text: 'You can finally see how many quotes went quiet and what they were worth.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Map, write, wire',
  processSteps: [
    {
      label: 'Map',
      text: 'Where your quotes live and what counts as sent, so nothing gets chased twice.',
    },
    {
      label: 'Write',
      text: 'The messages and the timing, in your words, approved by you before anything sends.',
    },
    {
      label: 'Wire',
      text: 'Built on the tools you already use and tested end to end before it touches a real customer.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full sequence, nothing extra to buy',
  stackItems: [
    {
      title: 'The messages',
      text: 'Two to four touches in your voice, every line approved by you.',
    },
    {
      title: 'Timing rules',
      text: 'Sensible gaps that read as attentive, not desperate.',
    },
    {
      title: 'Stop rules',
      text: 'Reply, booking, or opt-out ends it on the spot, so nobody gets nagged.',
    },
    {
      title: 'Owner alert',
      text: 'A ping when a quote is worth a phone call rather than another email.',
    },
  ],
  scopeLine:
    'One quote pipeline, chosen at kickoff. Not a full CRM rebuild, not cold outbound, not endless copy rewrites after go-live. Extra pipelines are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$1,450',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the sequence runs and stops exactly as agreed, tested before it touches a real customer, or we keep working at no extra cost until it does.',
  priceAnchor:
    "One recovered job usually covers this outright, and it keeps working after that for nothing. Right now your follow-up depends on somebody remembering on a busy Thursday, and that quietly costs you a job here and there, every month, forever. This costs you once.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why is this cheaper than paying someone to chase quotes?',
      a: "Because a person doing this costs you more than this within a month, and they still forget the small ones. This runs on quotes you've already earned the right to send, and it doesn't take annual leave.",
    },
    {
      q: 'Is this spam?',
      a: 'No. These are people who asked you for a price. Two to four short messages, in your words, stopping the moment they reply, book, or opt out.',
    },
    {
      q: 'Will it chase someone who already said no?',
      a: 'No. A decline ends the sequence on the spot, and so does a reply or a booking. That is the part we test hardest.',
    },
    {
      q: 'Do I need CRM Rescue first?',
      a: 'No. It works better when deals already live in a CRM, and it still works when your quotes live in email or a spreadsheet.',
    },
    {
      q: 'What if the messages sound wrong for us?',
      a: 'You approve every line before it goes live. If it does not sound like you, it does not send.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the sequence does not run and stop as agreed, we keep working at no extra cost until it does.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Stop losing jobs to a two line email',
  finalLine:
    'Pay once, approve the messages, and every quote you send gets followed up from then on.',
  proofKind: 'quote-followup',
} as FunnelProductCopy
