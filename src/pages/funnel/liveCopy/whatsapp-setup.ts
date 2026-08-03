/**
 * WhatsApp Business Setup · live funnel copy.
 * Parent must extend FunnelProductCopy['proofKind'] with 'whatsapp-setup'.
 */
import type {FunnelProductCopy} from '../funnelCopy'

export const WHATSAPP_SETUP_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price · Two days · One Business setup',
  h1Generic: 'WhatsApp is where customers already are. Your Business setup is not',
  h1Personal: (b: string) =>
    `${b}, WhatsApp is where customers already are. Your Business setup is not`,
  sub: 'We set up WhatsApp Business properly: profile, labels, quick replies, and routing so chats do not live in one personal phone forever.',
  ctaLabel: 'Set up WhatsApp · $950',
  proofLabel: 'The picture',
  proofHeadingLive: 'Personal chat does not scale',
  proofHeadingGeneric: 'Personal chat does not scale',
  proofLead: (b: string | null) =>
    b
      ? `${b} can lose every holiday when the chat lives on one staff phone and nobody else can see the thread.`
      : 'A number on a staff phone means holidays break you, and nobody else can see the thread.',
  proofLeadGeneric:
    'A number on a staff phone means holidays break you, and nobody else can see the thread.',
  proofAfter:
    'Business profile live, labels for stages, quick replies for the usual asks, and a clear owner path.',
  proofAfterGeneric:
    'Business profile live, labels for stages, quick replies for the usual asks, and a clear owner path.',
  painLabel: 'What this is costing you',
  painHeading: 'The chat lives in one pocket',
  painLines: [
    'The owner is the bottleneck for every WhatsApp ping.',
    'No labels, so urgent and junk look the same.',
    'Tone depends on who typed last.',
    'You cannot hand off when someone is away.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Business WhatsApp with a simple desk',
  bridgeBody:
    'Profile, labels, quick replies, routing. Not a full CRM. One Business setup, clear ownership.',
  bridgeGaugeCaption: 'Shared channel. Shared rules.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Chat on a business footing',
  benefits: [
    {title: 'Not stuck on one phone', text: 'The business owns the channel.'},
    {title: 'Faster usual answers', text: 'Quick replies for hours, parking, pricing ranges you approve.'},
    {title: 'Visible stages', text: 'Labels so the team sees what needs a human.'},
    {title: 'Pairs with Missed-Call', text: 'Phone and chat both covered.'},
  ],
  processLabel: 'How it runs',
  processHeading: 'Set up, desk, train',
  processSteps: [
    {label: 'Set up', text: 'Business profile and access.'},
    {label: 'Desk', text: 'Labels, quick replies, routing rules.'},
    {label: 'Train', text: 'Short handoff for whoever watches the queue.'},
  ],
  stackLabel: 'Everything included',
  stackHeading: 'What ships in the setup',
  stackItems: [
    {title: 'Business profile', text: 'On your number path, as scoped.'},
    {title: 'Label set', text: 'Simple stages your team will actually use.'},
    {title: 'Quick replies', text: 'Approved answers in your voice.'},
    {title: 'Routing note', text: 'Who watches, who escalates.'},
  ],
  scopeLine:
    'One WhatsApp Business setup: profile, labels, quick replies, and routing. Not a full CRM, not AI Phone, not ongoing chat staffing.',
  priceLabel: 'Investment',
  price: '$950',
  priceLead: 'Paid once when the number path and access lock at kickoff.',
  guarantee:
    'Agreed profile, labels, and quick replies are in place, or we keep working at no extra cost until they are.',
  priceAnchor: 'Stops the owner being the only inbox.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
    {
      q: 'Is this a full CRM?',
      a: 'No. It is WhatsApp Business profile, labels, quick replies, and a routing note. CRM work is a different job.',
    },
    {
      q: 'Do you staff the chat for us?',
      a: 'No. We set up the desk and leave a short handoff. Your team watches the queue.',
    },
    {
      q: 'Is this AI Phone or Missed-Call Text?',
      a: 'No. Those cover the phone. This covers WhatsApp Business chat.',
    },
    {
      q: 'What number do we use?',
      a: 'We work on the number path you choose at kickoff, within Meta and carrier rules for Business setup.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed setup is not delivered, we keep working at no extra cost until it is.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Put chat on a business footing',
  finalLine: 'Profile, labels, quick replies. Paid once.',
  proofKind: 'whatsapp-setup' as FunnelProductCopy['proofKind'],
}
