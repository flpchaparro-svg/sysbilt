/**
 * Accessibility Quick Pass · live funnel copy.
 * Parent must extend FunnelProductCopy['proofKind'] with 'a11y-pass'.
 */
import type {FunnelProductCopy} from '../funnelCopy'

export const A11Y_PASS_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price · A few days · Priority pages',
  h1Generic: 'If people cannot use the site, they will not enquire',
  h1Personal: (b: string) =>
    `${b}, if people cannot use the site, they will not enquire`,
  sub: 'A focused accessibility pass on critical issues: contrast, labels, keyboard paths, and form clarity. Clinics and professional firms feel this in trust as much as compliance.',
  ctaLabel: 'Fix access · $1,100',
  proofLabel: 'The picture',
  proofHeadingLive: 'Usability is a sales issue',
  proofHeadingGeneric: 'Usability is a sales issue',
  proofLead: (b: string | null) =>
    b
      ? `${b} can lose customers to low contrast, missing labels, and broken keyboard paths you never hear about.`
      : 'Low contrast, missing labels, and broken keyboard paths quietly remove customers you never hear from.',
  proofLeadGeneric:
    'Low contrast, missing labels, and broken keyboard paths quietly remove customers you never hear from.',
  proofAfter:
    'Critical issues on scoped pages fixed, with a short list of what remains for a deeper audit if you want one later.',
  proofAfterGeneric:
    'Critical issues on scoped pages fixed, with a short list of what remains for a deeper audit if you want one later.',
  painLabel: 'What this is costing you',
  painHeading: 'Invisible drop-off',
  painLines: [
    'Forms fail screen readers.',
    'Buttons look fine to you and invisible to someone else.',
    'Mobile tap targets fight each other.',
    'You only hear about it when a patient complains, if they bother.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Critical fixes, not a legal certificate',
  bridgeBody:
    "This isn't a full WCAG certification project. It's a quick pass on the worst blockers on priority pages.",
  bridgeGaugeCaption: 'Clearer for more people. Better for everyone.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'More people complete the path',
  benefits: [
    {title: 'Fewer quiet exits', text: 'More people can complete the path to enquire.'},
    {title: 'Forms that make sense', text: 'Labels and errors humans can follow.'},
    {title: 'Trust signal', text: 'Especially for clinics and professional services.'},
    {title: 'Honest scope', text: 'Critical pass now. Deeper audit optional later.'},
  ],
  processLabel: 'How it runs',
  processHeading: 'Scan, fix, report',
  processSteps: [
    {label: 'Scan', text: 'Critical issues on scoped pages.'},
    {label: 'Fix', text: 'Contrast, labels, focus, form clarity.'},
    {label: 'Report', text: 'What changed, what remains.'},
  ],
  stackLabel: 'Everything included',
  stackHeading: 'What ships in the pass',
  stackItems: [
    {title: 'Critical issue list', text: 'Prioritised, plain language.'},
    {title: 'Fix pass', text: 'On scoped pages.'},
    {title: 'Remainder note', text: 'What a deeper audit would cover if you want it.'},
    {title: 'Scope lock', text: 'Priority pages chosen at kickoff.'},
  ],
  scopeLine:
    'Priority pages chosen at kickoff. Critical accessibility fixes only. Not a WCAG certification, not a full redesign.',
  priceLabel: 'Investment',
  price: '$1,100',
  priceLead: 'Paid once when the page list locks at kickoff.',
  guarantee:
    'Agreed critical fixes ship on scoped pages, or we keep working at no extra cost until they do.',
  priceAnchor: 'Trust and usability, not a certificate badge.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
    {
      q: 'Is this a legal guarantee?',
      a: 'No. It is practical critical fixes. Formal compliance audits are a different engagement.',
    },
    {
      q: 'Is this a full WCAG audit?',
      a: 'No. This is a focused pass on the worst blockers on priority pages. A deeper audit can follow if you want it.',
    },
    {
      q: 'Which pages are included?',
      a: 'Priority pages locked at kickoff. We agree the list before work starts.',
    },
    {
      q: 'Will you redesign the site?',
      a: 'No. We fix access blockers: contrast, labels, keyboard paths, and form clarity on the scoped set.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed critical fixes are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Let more people complete the path',
  finalLine: 'Critical access fixes on priority pages. Paid once.',
  proofKind: 'a11y-pass' as FunnelProductCopy['proofKind'],
}
