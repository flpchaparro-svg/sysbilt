/**
 * WhatsApp Business Setup live funnel copy.
 * Parent must extend FunnelProductCopy['proofKind'] with 'whatsapp-setup'.
 */
import type {FunnelProductCopy} from '../funnelCopy'

export const WHATSAPP_SETUP_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price, live in two days',
  h1Generic:
    "Your customers are already on WhatsApp. Your business is on one staff member's phone",
  h1Personal: (b: string) =>
    `${b}, your customers are already on WhatsApp. Your business is on one staff member's phone`,
  sub: "Right now those chats live in somebody's pocket. When they're on holiday, so is your inbox, and nobody else can see what was promised. We set WhatsApp Business up properly, so the business owns the number, the usual questions answer themselves, and anyone on your team can pick up a conversation.",
  ctaLabel: 'Set up WhatsApp, $950',
  proofLabel: 'The leak',
  proofHeadingLive: 'One pocket is not a business channel',
  proofHeadingGeneric: 'One pocket is not a business channel',
  proofLead: (b: string | null) =>
    b
      ? `Every WhatsApp message to ${b} lands on one phone. If that person is driving, on leave, or has left the company, the customer just waits, and nobody else can even see the question.`
      : 'Every WhatsApp message lands on one phone. If that person is driving, on leave, or has left the company, the customer just waits, and nobody else can even see the question.',
  proofLeadGeneric:
    'Every WhatsApp message lands on one phone. If that person is driving, on leave, or has left the company, the customer just waits, and nobody else can even see the question.',
  proofAfter:
    'The channel works. The setup behind it does not. That is a two day job, not a new system.',
  proofAfterGeneric:
    'The channel works. The setup behind it does not. That is a two day job, not a new system.',
  painLabel: 'What this is costing you',
  painHeading: 'The chat lives in one pocket',
  painLines: [
    'Every question waits for one person, so your busiest team member is also your switchboard.',
    "Urgent and junk look identical, because there's nothing sorting them.",
    'The answer a customer gets depends on who typed it and how tired they were.',
    "When that person takes leave, you can't hand the conversations to anyone, because they're on a personal phone.",
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'A business front door on the number people already use',
  bridgeBody:
    "This isn't a new phone system, a CRM, or someone sitting in your chat queue for a monthly fee. It's a proper WhatsApp Business setup on the number path you choose: a real business profile, saved answers for the questions you get every week, simple labels so the team can see what needs a person, and a written note of who watches the queue when someone is away.",
  bridgeGaugeCaption:
    'The business owns the channel. Anyone on the team can pick it up.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Chat on a business footing',
  benefits: [
    {
      title: 'Not stuck on one phone',
      text: 'The business owns the channel, so holidays and resignations stop taking your inbox with them.',
    },
    {
      title: 'The usual questions answer themselves',
      text: 'Hours, parking, location and the price ranges you approve, saved and ready to send in one tap.',
    },
    {
      title: 'You can see what needs you',
      text: 'Simple labels so a real enquiry stops looking identical to a supplier ad.',
    },
    {
      title: 'Works beside your phone line',
      text: 'Pairs with Missed-Call Text-Back, so a customer who rings and a customer who messages both get an answer.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Set up, build the desk, hand over',
  processSteps: [
    {
      label: 'Set up',
      text: 'Business profile on the number path you choose, within the Meta and carrier rules.',
    },
    {
      label: 'Build the desk',
      text: 'Saved replies in your words, labels your team will actually use, and routing rules.',
    },
    {
      label: 'Hand over',
      text: 'A short walkthrough for whoever watches the queue, and it is written down for the next person.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full setup, nothing extra to buy',
  stackItems: [
    {
      title: 'Business profile',
      text: 'Hours, location, services and links, set up properly on the number path you choose.',
    },
    {
      title: 'Saved replies',
      text: 'Approved answers for the questions you get every week, in your voice, ready in one tap.',
    },
    {
      title: 'Labels that mean something',
      text: 'A simple set of stages so the team can see at a glance what still needs a person.',
    },
    {
      title: 'Ownership note',
      text: 'Who watches the queue, who escalates, and what happens when they are away.',
    },
  ],
  scopeLine:
    'One WhatsApp Business setup: profile, saved replies, labels and routing. Not a full CRM, not AI Phone Setup, not ongoing chat staffing. Extra numbers are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$950',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the agreed profile, saved replies and labels are live and working, or we keep working at no extra cost until they are.',
  priceAnchor:
    "That's about one job. Right now every customer conversation lives on one person's phone, and their next holiday is your outage. This buys the business its own front door, once.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why is this cheaper than a managed chat service?',
      a: "Because we set the desk up once and hand it to you. A managed service charges you every month to sit in your queue. You already have the team, what you're missing is the setup, so that's what you pay for.",
    },
    {
      q: 'Do we have to change our number?',
      a: 'Usually not. We work on the number path you choose at kickoff. If Meta or your carrier will not allow the setup you want, we tell you before you pay, not after.',
    },
    {
      q: 'Do you answer the chats for us?',
      a: 'No. We build the desk and hand it over. Your team watches the queue, with saved answers that make most replies a one-tap job.',
    },
    {
      q: 'Is this AI Phone Setup or Missed-Call Text-Back?',
      a: 'No. Those cover your phone line. This covers WhatsApp. Plenty of businesses run both, and they work well together.',
    },
    {
      q: 'Is this a CRM?',
      a: 'No. It is profile, saved replies, labels and routing. If you need the enquiries tracked properly after that, CRM Rescue is the separate job for it.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed setup is not delivered, we keep working at no extra cost until it is.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Take the business chat out of one pocket',
  finalLine:
    'Pay once, tell us which number path to use, and the desk is live in about two days.',
  proofKind: 'whatsapp-setup' as FunnelProductCopy['proofKind'],
}
