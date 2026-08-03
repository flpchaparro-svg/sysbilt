/**
 * Intake Form Pack · live copy (local asset).
 * Wire into funnelCopyForSlug when the product goes live.
 */
import type {FunnelProductCopy} from '../funnelCopy'

export const INTAKE_FORMS_LIVE_COPY = {
  eyebrow: 'Fixed price · Three to five days · One intake form',
  h1Generic: 'Intake by email thread is how details get lost before the first visit',
  h1Personal: (b: string) =>
    `${b}, intake by email thread is how details get lost before the first visit`,
  sub: 'A branded intake form that feeds your CRM or inbox cleanly: the fields you need, nothing you do not.',
  ctaLabel: 'Build intake forms · $1,200',
  proofLabel: 'The picture',
  proofHeadingLive: 'Clean intake, calmer first visit',
  proofHeadingGeneric: 'Clean intake, calmer first visit',
  proofLead: (b: string | null) =>
    b
      ? `${b} can lose hours to scattered PDFs and reply-all threads before the real work starts.`
      : 'Scattered PDFs and reply-all threads mean staff re-type, and patients repeat themselves.',
  proofLeadGeneric:
    'Scattered PDFs and reply-all threads mean staff re-type, and patients repeat themselves.',
  proofAfter: 'One intake path, fields mapped, destination clear.',
  proofAfterGeneric: 'One intake path, fields mapped, destination clear.',
  painLabel: 'What this is costing you',
  painHeading: 'Admin before the work even starts',
  painLines: [
    'Paper or PDF forms go missing.',
    'Email threads bury medical or project details.',
    'CRM fields stay empty because nobody copies them in.',
    'First appointments start with catch-up admin.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Intake that feeds the system',
  bridgeBody:
    'Branded form, required fields, destination into CRM or structured email. One intake path. Clinical compliance needs are scoped honestly at kickoff.',
  bridgeGaugeCaption: 'Ask once. Store once.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Collect what you need once',
  benefits: [
    {
      title: 'Patients or clients type once',
      text: 'You stop chasing missing details.',
    },
    {
      title: 'Staff stop re-keying',
      text: 'Fields land where work happens.',
    },
    {
      title: 'Brand-consistent',
      text: 'Looks like you, not a random form tool.',
    },
    {
      title: 'Ready for clinics and professionals',
      text: 'Scoped fields, not a generic survey.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Fields, build, handoff',
  processSteps: [
    {
      label: 'Fields',
      text: 'What you truly need before the first visit or job.',
    },
    {
      label: 'Build',
      text: 'Form, validation, destination.',
    },
    {
      label: 'Handoff',
      text: 'Who reviews submissions and when.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'What ships in the pack',
  stackItems: [
    {
      title: 'Form design',
      text: 'Mobile-first, branded.',
    },
    {
      title: 'Field map',
      text: 'Into CRM or structured inbox.',
    },
    {
      title: 'Confirmation',
      text: 'What the submitter sees next.',
    },
    {
      title: 'Owner rules',
      text: 'Who reads new intakes.',
    },
  ],
  scopeLine:
    'One intake form. Clinical compliance needs are scoped honestly at kickoff. Not a full CRM rebuild, not multi-form suite, not endless field changes after go-live.',
  priceLabel: 'Investment',
  price: '$1,200',
  priceLead: 'Paid once when fields lock at kickoff.',
  guarantee:
    'The form collects scoped fields and lands in the agreed place, or we keep working at no extra cost until it does.',
  priceAnchor: 'Admin time back before every first visit.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
    {
      q: 'Is this a generic survey tool?',
      a: 'No. It is a branded intake form with the fields you need, mapped into CRM or a structured inbox.',
    },
    {
      q: 'Can you handle clinical compliance?',
      a: 'We scope honestly at kickoff. If you need specialised clinical compliance work beyond a practical intake form, we say so before you pay.',
    },
    {
      q: 'Where do submissions land?',
      a: 'CRM fields when possible, or a structured inbox destination you approve. Locked at kickoff.',
    },
    {
      q: 'How many forms?',
      a: 'One intake form in this pack. Extra forms are quoted separately.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the form does not collect scoped fields into the agreed place, we keep working at no extra cost until it does.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Collect what you need once',
  finalLine: 'Branded intake into your system. Paid once.',
  proofKind: 'intake-forms',
} as FunnelProductCopy
