/**
 * DM Reply System · live funnel copy.
 * Parent must extend FunnelProductCopy['proofKind'] with 'dm-reply'.
 */
import type {FunnelProductCopy} from '../funnelCopy'

export const DM_REPLY_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price · Two to three days · Meta DMs',
  h1Generic: 'Instagram and Facebook DMs deserve the same first reply as your forms',
  h1Personal: (b: string) =>
    `${b}, Instagram and Facebook DMs deserve the same first reply as your forms`,
  sub: 'Quick replies and handoff rules for Meta DMs so social enquiries do not die in a personal inbox.',
  ctaLabel: 'Fix my DMs · $1,100',
  proofLabel: 'The picture',
  proofHeadingLive: 'Social is an intake channel',
  proofHeadingGeneric: 'Social is an intake channel',
  proofLead: (b: string | null) =>
    b
      ? `${b} can lose price and availability asks in DMs when slow or missing replies make the business look asleep.`
      : 'People ask price and availability in DMs. Slow or missing replies feel like the business is asleep.',
  proofLeadGeneric:
    'People ask price and availability in DMs. Slow or missing replies feel like the business is asleep.',
  proofAfter:
    'Quick replies live, escape to a human clear, ownership documented.',
  proofAfterGeneric:
    'Quick replies live, escape to a human clear, ownership documented.',
  painLabel: 'What this is costing you',
  painHeading: 'DMs are treated like hobbies',
  painLines: [
    'Only one person has the login.',
    'Replies go out at midnight or not at all.',
    'No record of what was promised.',
    'Ads drive DMs into a black hole.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'DM desk with quick replies',
  bridgeBody:
    'Meta quick replies, handoff, and a short desk. Not a full social agency.',
  bridgeGaugeCaption: 'First reply fast. Human when needed.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Treat DMs like enquiries',
  benefits: [
    {title: 'Ads stop leaking into silence', text: 'DM intent gets an ack.'},
    {title: 'Shared ownership', text: 'Not one personal profile forever.'},
    {title: 'Consistent answers', text: 'Approved lines for the usual asks.'},
    {title: 'Path to CRM', text: 'Serious leads can move into your real system next.'},
  ],
  processLabel: 'How it runs',
  processHeading: 'Access, build, test',
  processSteps: [
    {label: 'Access', text: 'Page and inbox permissions.'},
    {label: 'Build', text: 'Quick replies and handoff rules.'},
    {label: 'Test', text: 'You send a DM. We watch the path.'},
  ],
  stackLabel: 'Everything included',
  stackHeading: 'What ships in the desk',
  stackItems: [
    {title: 'Quick reply pack', text: 'Approved answers.'},
    {title: 'Handoff rules', text: 'When a human must take it.'},
    {title: 'Ownership note', text: 'Who watches which inbox.'},
    {title: 'Path test', text: 'Live DM walkthrough before handoff.'},
  ],
  scopeLine:
    'Instagram and/or Facebook Page inbox as scoped at kickoff. Quick replies and handoff only. Not a full social agency, not content posting, not paid ads management.',
  priceLabel: 'Investment',
  price: '$1,100',
  priceLead: 'Paid once when channels lock at kickoff.',
  guarantee:
    'Scoped quick replies and handoff work in testing, or we keep working at no extra cost until they do.',
  priceAnchor: 'Protects paid social and organic DMs alike.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
    {
      q: 'Is this a social media agency retainer?',
      a: 'No. It is Meta DM quick replies, handoff rules, and ownership for the inboxes you scope.',
    },
    {
      q: 'Do you post content for us?',
      a: 'No. Profile Posting and content systems are separate products. This is the DM desk.',
    },
    {
      q: 'Which platforms are included?',
      a: 'Instagram and/or Facebook Page inbox as locked at kickoff.',
    },
    {
      q: 'Is this Enquiry Reply or Site Chat?',
      a: 'No. Enquiry Reply covers form and email intake. Site Chat sits on your website. This covers Meta DMs.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the scoped quick replies and handoff do not work in testing, we keep working at no extra cost until they do.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Treat DMs like enquiries',
  finalLine: 'Quick replies, clear handoff. Paid once.',
  proofKind: 'dm-reply' as FunnelProductCopy['proofKind'],
}
