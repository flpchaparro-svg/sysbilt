/**
 * Accessibility Quick Pass live funnel copy.
 * Parent must extend FunnelProductCopy['proofKind'] with 'a11y-pass'.
 */
import type {FunnelProductCopy} from '../funnelCopy'

export const A11Y_PASS_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price, done in a few days',
  h1Generic: "Some people can't use your website, and they'll never tell you why",
  h1Personal: (b: string) =>
    `${b}, some people can't use your website, and they'll never tell you why`,
  sub: "Text too faint to read, forms that don't say what went wrong, buttons you can't reach without a mouse. People hit those and quietly leave. We fix the worst of it on the pages that matter most, so more of the people who arrive can actually get to the point of contacting you.",
  ctaLabel: 'Fix access, $1,100',
  proofLabel: 'The leak',
  proofHeadingLive: 'The drop-off you never hear about',
  proofHeadingGeneric: 'The drop-off you never hear about',
  proofLead: (b: string | null) =>
    b
      ? `Nobody emails ${b} to say the contact form rejected them without explaining why. They just close the tab and try the next business, and you record it as a quiet week.`
      : 'Nobody emails you to say the contact form rejected them without explaining why. They just close the tab and try the next business, and you record it as a quiet week.',
  proofLeadGeneric:
    'Nobody emails you to say the contact form rejected them without explaining why. They just close the tab and try the next business, and you record it as a quiet week.',
  proofAfter:
    'These are not exotic problems. They are faint text, unlabelled fields, and buttons that only work with a mouse, and they sit on the pages you most need working.',
  proofAfterGeneric:
    'These are not exotic problems. They are faint text, unlabelled fields, and buttons that only work with a mouse, and they sit on the pages you most need working.',
  painLabel: 'What this is costing you',
  painHeading: 'The quiet exits',
  painLines: [
    'Someone in reading glasses gives up on light grey text against a white background.',
    'A form rejects an entry without saying which field is wrong, so they close the tab and stop trying.',
    "A customer on a phone taps the wrong button twice and decides you're not worth the effort.",
    'About one in five Australians lives with disability. Not one of them will email to tell you your site did not work.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'The blockers fixed, not a compliance certificate',
  bridgeBody:
    "This isn't a WCAG certification project (WCAG is the international accessibility standard), and it isn't a redesign. It's a focused pass on the pages that matter most: contrast, form labels, error messages, keyboard paths and tap targets. We fix what blocks people, then hand you a plain list of what a deeper audit would cover if you ever want one.",
  bridgeGaugeCaption:
    'Clearer for the people who were struggling. Easier for everyone else.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'More people finish what they started',
  benefits: [
    {
      title: 'More people reach the enquiry',
      text: 'The path from landing on the page to contacting you stops breaking halfway through.',
    },
    {
      title: 'Forms that explain themselves',
      text: 'Clear labels and error messages, so people know what went wrong and can actually fix it.',
    },
    {
      title: 'Trust, not just access',
      text: 'For clinics and professional firms especially, a site that works for everyone reads as a business that pays attention.',
    },
    {
      title: 'Honest boundaries',
      text: 'A critical pass now, with a written list of what remains. No scare stories about lawsuits.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Scan, fix, report',
  processSteps: [
    {
      label: 'Scan',
      text: 'We test your priority pages the way people actually use them, including with a keyboard and a screen reader.',
    },
    {
      label: 'Fix',
      text: 'Contrast, labels, focus order, error messages and tap targets, corrected on those pages.',
    },
    {
      label: 'Report',
      text: 'A plain-English note on what changed, and what a deeper audit would still cover.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full pass, nothing extra to buy',
  stackItems: [
    {
      title: 'Critical issue list',
      text: 'What is blocking people right now, ranked by how much it costs you, in plain language.',
    },
    {
      title: 'The fix pass',
      text: 'Contrast, labels, keyboard paths, error messages and tap targets on your priority pages.',
    },
    {
      title: 'What remains',
      text: 'An honest note on what a deeper audit would cover, so you can decide later without pressure.',
    },
    {
      title: '14 days of aftercare',
      text: 'If anything we touched misbehaves, we sort it, no charge.',
    },
  ],
  scopeLine:
    'Priority pages chosen at kickoff. Critical access fixes only. Not a formal WCAG certification, not a redesign. Extra pages are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$1,100',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the agreed critical fixes ship on the scoped pages, or we keep working at no extra cost until they do.',
  priceAnchor:
    "That's less than one client who gave up on your contact form. People who can't use the site don't complain, they just go somewhere that works. That happens every week. This happens once.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why is this cheaper than a full accessibility audit?',
      a: "Because an audit tells you what's wrong and hands you a report to action. This fixes the worst of it on your priority pages and then tells you what's left. One job, fixed scope, no retainer.",
    },
    {
      q: 'Is this a legal guarantee?',
      a: 'No, and anyone selling you one is overselling. This is practical work on the things that block real people. Formal compliance sign-off is a different engagement, and we will say so plainly rather than sell you a badge.',
    },
    {
      q: 'Which pages are included?',
      a: 'The priority pages you pick at kickoff, usually home, contact, services and booking. We agree the list in writing before any work starts.',
    },
    {
      q: 'Will you redesign the site?',
      a: 'No. Your design stays. We correct the things that stop people using it, which usually means nobody notices except the people who were struggling.',
    },
    {
      q: 'Do I need Website Speed Fix first?',
      a: 'No. This stands alone. If the site is also slow, that is a useful separate job, not a requirement here.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed fixes are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Let more people finish what they started',
  finalLine:
    'Pay once, tell us the pages that matter, and we clear the blockers within a few days.',
  proofKind: 'a11y-pass' as FunnelProductCopy['proofKind'],
}
