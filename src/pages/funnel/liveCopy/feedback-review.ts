/**
 * Feedback Review live copy. Private /go/feedback-review door.
 * Distinct from Review Engine (/go/reviews): guided questions + a suggested
 * Google review they copy themselves. We never post for them.
 */
import type {FunnelProductCopy} from '../funnelCopy'

export const FEEDBACK_REVIEW_LIVE_COPY = {
  eyebrow: 'Fixed price, a few days, the review after the job',
  h1Generic: 'The job went well, and the Google review never arrived',
  h1Personal: (b: string) =>
    `${b}, the job went well, and the Google review never arrived`,
  sub: 'Happy customers mean to leave a review, then the next job starts. We install a short question flow you send when the work is done. They tap through what happened. If it went well, they get a suggested review they can edit, copy, and post themselves. You never post for them.',
  ctaLabel: 'Get Feedback Review, $1,500',
  proofLabel: 'Sound familiar',
  proofHeadingLive: 'Jobs done. Reviews missing',
  proofHeadingGeneric: 'Jobs done. Reviews missing',
  proofLead: (b: string | null) =>
    b
      ? `${b} already does the work. The listing above you has the review count, because they asked when the job was still warm.`
      : 'You already do the work. The listing above you has the review count, because they asked when the job was still warm.',
  proofLeadGeneric:
    'Open your Google listing next to the business ranking above you. Count the reviews. That gap is already deciding who gets the next call.',
  proofAfter:
    'A blank box on Google is a lot to ask of someone who just paid you. A few taps about the job is not.',
  proofAfterGeneric:
    'A blank box on Google is a lot to ask of someone who just paid you. A few taps about the job is not.',
  painLabel: 'What this is costing you',
  painHeading: 'They liked the work. Google never heard it',
  painLines: [
    'The customer was happy at handover. By the evening they had forgotten, and Google still shows last year.',
    'Asking for a review in person feels awkward, so it waits for a quiet moment that never comes.',
    'When someone does try, they stare at a blank Google box and type two words, or they leave.',
    'A thin review trail makes a busy business look smaller than the jobs you already do.',
  ],
  bridgeLabel: 'What we actually build',
  bridgeHeading: 'Questions first. Google only if it went well',
  bridgeBody:
    'This is not a review farm and it is not a monthly retainer. We install a short question flow on your link. You send it after the job, by email or text, from a list we set up with you. They tap through what happened. If the job went well, they get a suggested Google review in their own words, ready to copy and post. If it did not, that stays with you. We never post reviews for you, and we never push a weak job onto Google.',
  bridgeGaugeCaption:
    'Question flow, suggested review they copy themselves, send list with Gmail drafts. Live within five business days of access.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'The ask happens while the job is still warm',
      text: 'You send the link when the work is done, not three weeks later when nobody remembers the details.',
    },
    {
      title: 'They are not staring at a blank Google box',
      text: 'A few taps about the job give them something real to paste. They can edit every word before they post.',
    },
    {
      title: 'Weak jobs stay private',
      text: 'If it did not go well, you get the notes. Nobody is sent to Google to write that up in public.',
    },
    {
      title: 'You do not have to remember the wording',
      text: 'We set up the send list, the Gmail drafts, and the text you can paste. Drafts only. You hit send.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'A few days, then you send after each job',
  processSteps: [
    {
      label: 'Day 1',
      text: 'Access, your Google review link, and how you mark a job complete.',
    },
    {
      label: 'Days 2 to 3',
      text: 'Build the question flow, the send list, and the Gmail drafts in your voice.',
    },
    {
      label: 'Days 4 to 5',
      text: 'Test with you, hand over, and leave you sending after jobs. Many setups finish sooner.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full job, nothing extra to buy',
  stackItems: [
    {
      title: 'Your question flow',
      text: 'A short link you send after the job. Built around the work you actually do.',
    },
    {
      title: 'Suggested Google review',
      text: 'If it went well, they get wording from what they said, ready to copy and post. You never post for them.',
    },
    {
      title: 'Send list and Gmail drafts',
      text: 'Put the name in, mark it ready, and a draft sits in Gmail. We never send for you.',
    },
    {
      title: 'Text you can paste',
      text: 'Plain wording with the link visible, for the SMS app you already use.',
    },
    {
      title: 'Quiet path when it went poorly',
      text: 'Private notes for you. No Google push on a weak job.',
    },
    {
      title: '14 days of aftercare',
      text: 'If anything we touched misbehaves, we sort it, no charge.',
    },
  ],
  scopeLine:
    'One business, one Google review page, real customers only. We never post fake reviews, buy stars, or write reviews pretending to be customers. Extra locations are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$1,500',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the question flow, the send list, and the drafts are live within five business days of access, or we keep working at no extra cost until they are. Real customers only. We never post fake reviews.',
  priceAnchor:
    'That is about one job a thin review trail costs you when someone picks the listing with more stars.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Do you post reviews for us?',
      a: 'No. We never post fake reviews, buy stars, or write reviews pretending to be customers. They copy and post themselves, only if they want to.',
    },
    {
      q: 'Can we try it first?',
      a: 'Yes. There is a sample of the customer questions on this page. Nothing is saved, and it is not your Google listing. Your install uses your review page and your jobs.',
    },
    {
      q: 'What if the job did not go well?',
      a: 'They still get a thank you. The notes stay with you. Nobody is sent to Google to write that up in public.',
    },
    {
      q: 'How is this different from Review Engine?',
      a: 'Review Engine is the ask, a QR, and reply templates. Feedback Review is the stronger loop: they answer a few questions about the job, and if it went well they get a suggested review in their own words. Same rule on both: we never post for you.',
    },
    {
      q: 'Will this send emails for me?',
      a: 'No. We set up Gmail drafts. You review them and hit send. Same for text: we give you the wording, you paste it.',
    },
    {
      q: 'Do I need a CRM first?',
      a: 'No. A send list and Gmail are enough. If the person is already in HubSpot, we can attach the notes there. We do not create new contacts.',
    },
    {
      q: 'Is this refundable?',
      a: 'There is no change-of-mind refund, because we start straight away. What you have instead: the flow, the send list, and the drafts go live within five business days of access, or we keep working at no extra cost until they do.',
    },
    {
      q: 'How long does it take?',
      a: 'Usually three to five business days from access. Many setups finish sooner once we have your Google review link and how you mark jobs complete.',
    },
    {
      q: 'What do you need from me?',
      a: 'Your Google review link, how you mark a job complete, and a few minutes on the access form after payment.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Next finished job, they have something real to post',
  finalLine:
    'Pay once, complete the short access form, and we hand over the flow, the send list, and the drafts in a few days.',
  proofKind: 'feedback-review',
} as FunnelProductCopy
