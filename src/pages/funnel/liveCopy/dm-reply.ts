/**
 * DM Reply System live funnel copy.
 * Parent must extend FunnelProductCopy['proofKind'] with 'dm-reply'.
 */
import type {FunnelProductCopy} from '../funnelCopy'

export const DM_REPLY_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price, live in two to three days',
  h1Generic:
    'Three days from now, every Instagram and Facebook message gets an answer in seconds',
  h1Personal: (b: string) =>
    `${b}, three days from now every Instagram and Facebook message gets an answer in seconds`,
  sub: "Someone asks your price at nine at night. If your reply lands the next afternoon, they've already booked whoever answered first. We set up instant replies for the questions you get every week, and a clear rule for when a real person takes over.",
  ctaLabel: 'Fix my DMs, $1,100',
  proofLabel: 'The leak',
  proofHeadingLive: 'Your busiest inbox is the one nobody staffs',
  proofHeadingGeneric: 'Your busiest inbox is the one nobody staffs',
  proofLead: (b: string | null) =>
    b
      ? `Someone messages ${b} asking about price or availability. It's the same question you answer on the phone all day, except this one waits until somebody remembers to open the app.`
      : "Someone messages you asking about price or availability. It's the same question you answer on the phone all day, except this one waits until somebody remembers to open the app.",
  proofLeadGeneric:
    "Someone messages you asking about price or availability. It's the same question you answer on the phone all day, except this one waits until somebody remembers to open the app.",
  proofAfter:
    'A message at nine at night gets an answer at nine at night. The ones that need you get flagged, and the rest are already handled.',
  proofAfterGeneric:
    'A message at nine at night gets an answer at nine at night. The ones that need you get flagged, and the rest are already handled.',
  painLabel: 'What this is costing you',
  painHeading: 'Social messages get treated like a hobby',
  painLines: [
    "A customer messages your Instagram on a Sunday asking if you're open Monday. Nobody sees it until Tuesday.",
    "One person has the login. When they're on holiday, the inbox just fills up.",
    'Somebody quoted a price in a DM three months ago. Nobody remembers what it was, including the customer.',
    'You pay for the ad that started the conversation, then let the conversation sit unread.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'One setup on the inboxes you already own',
  bridgeBody:
    "This isn't a social media agency, a content retainer, or someone posting on your behalf. It's a one-off setup on the Instagram and Facebook inboxes you already have: instant answers for the questions that repeat, a rule for when a human steps in, and a written note of who watches which inbox. We test it with a live message before we hand it over.",
  bridgeGaugeCaption:
    'Answered in seconds. Handed to a person the moment it matters.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Your DMs start behaving like enquiries',
  benefits: [
    {
      title: 'Nobody waits until Tuesday',
      text: "The usual questions get answered the moment they're asked, at any hour, including weekends.",
    },
    {
      title: 'The business owns the channel',
      text: "Not one staff member's personal login on one personal phone.",
    },
    {
      title: 'The same answer every time',
      text: 'Prices, hours and availability come out the way you approved them, not from memory at midnight.',
    },
    {
      title: 'Real leads reach a person',
      text: 'Anything that needs you gets flagged and handed over instead of queuing behind the easy questions.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Access, build, test',
  processSteps: [
    {
      label: 'Access',
      text: 'You add us to the Page and inbox. Two minutes, and we never need your personal password.',
    },
    {
      label: 'Build',
      text: 'We write the replies for your most common questions and set the rules for when a human takes over.',
    },
    {
      label: 'Test',
      text: 'You send a real message from your own phone and watch the whole path before we hand it over.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full setup, nothing extra to buy',
  stackItems: [
    {
      title: 'Quick reply pack',
      text: 'Approved answers for the questions you get every week, written in your words, not a robot script.',
    },
    {
      title: 'Handoff rules',
      text: 'What gets answered automatically and what gets pushed to a person, decided by you.',
    },
    {
      title: 'Ownership note',
      text: 'Who watches which inbox, so the setup survives holidays and staff changes.',
    },
    {
      title: 'Live walkthrough',
      text: 'We send a real message with you watching before we call it done.',
    },
  ],
  scopeLine:
    'Instagram, the Facebook Page inbox, or both, locked at kickoff. Quick replies and handoff only. Not content posting, not paid ads management, not a social agency retainer.',
  priceLabel: 'Investment',
  price: '$1,100',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    "Our promise: we test the replies and the handoff on a live message before we hand it over. If they don't work the way we described, we keep working at no extra cost until they do.",
  priceAnchor:
    "That's about one job. The messages arrive whether you answer them or not, so every week you leave them sitting is a week you paid to start conversations you never finished. The silence charges you weekly. This charges you once.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why is this cheaper than a social media agency?',
      a: "Because it's one setup with a fixed scope, not a monthly relationship. An agency charges you every month to keep answering. We build the answers once and hand them to you. We've done this enough times to make it repeatable, and you get the benefit of that.",
    },
    {
      q: 'Will it sound like a robot?',
      a: 'Only if you write like one. The replies use your words, you approve every line before it goes live, and anything beyond the usual questions goes to a person.',
    },
    {
      q: 'Do you post content for us?',
      a: 'No. This is the inbox, not the feed. Profile Posting System and Content System cover publishing.',
    },
    {
      q: 'Which platforms are included?',
      a: 'Instagram, the Facebook Page inbox, or both. You pick at kickoff and the price stays the same.',
    },
    {
      q: 'Is this Enquiry Auto-Reply or Site AI Chat?',
      a: 'No. Enquiry Auto-Reply covers website forms and email. Site AI Chat sits on your website. This one covers Instagram and Facebook messages.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. What you have instead is stronger: if the replies and handoff don't work on a live test, we keep working at no extra cost until they do.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Next message, they hear back in seconds',
  finalLine:
    'Pay once, add us to the Page, and we prove the replies on a live message before we hand it over.',
  proofKind: 'dm-reply' as FunnelProductCopy['proofKind'],
}
