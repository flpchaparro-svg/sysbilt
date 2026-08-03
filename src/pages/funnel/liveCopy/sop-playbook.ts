import type {FunnelProductCopy} from '../funnelCopy'

/** Live /go copy for SOP to AI Playbook. Wired later via funnelCopyForSlug. */
export const SOP_PLAYBOOK_LIVE_COPY = {
  eyebrow: 'Warm · About a week · Scoped jobs',
  h1Generic: "Your best work still lives in one person's head",
  h1Personal: (b: string) =>
    `${b}, your best work still lives in one person's head`,
  sub: 'We turn real jobs into SOPs and AI playbooks the team can reuse: steps, prompts, and checks so quality does not depend on who is free.',
  ctaLabel: 'Build the playbook · $2,400',
  proofLabel: 'The picture',
  proofHeadingLive: 'Knowledge that ships',
  proofHeadingGeneric: 'Knowledge that ships',
  proofLead: (b: string | null) =>
    b
      ? `When ${b}'s expert is away, the work slows or freestyles. That is expensive and uneven.`
      : 'When the expert is away, the work slows or freestyles. That is expensive and uneven.',
  proofLeadGeneric:
    'When the expert is away, the work slows or freestyles. That is expensive and uneven.',
  proofAfter:
    'A playbook for scoped jobs: when to use AI, what to check, what never to skip.',
  proofAfterGeneric:
    'A playbook for scoped jobs: when to use AI, what to check, what never to skip.',
  painLabel: 'What this is costing you',
  painHeading: 'Hero culture does not scale',
  painLines: [
    'Only one person knows the "proper" way.',
    'AI use is secret and inconsistent.',
    'New staff learn by osmosis.',
    'Quality swings with who is on shift.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'SOP plus AI playbook',
  bridgeBody:
    'Document the job, then add prompts and checks. Feeds Team AI and Change Pack later. Job count locks at kickoff.',
  bridgeGaugeCaption: 'Same job. Same standard. Any trained person.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Work that survives holidays',
  benefits: [
    {title: 'Work survives holidays', text: 'The method is written down.'},
    {title: 'AI used on purpose', text: 'Prompts tied to real steps, not vibes.'},
    {title: 'Faster onboarding', text: 'New people have a path.'},
    {
      title: 'Ready for Change Pack',
      text: 'When a bigger rollout comes, the discipline already exists.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Capture, write, trial',
  processSteps: [
    {label: 'Capture', text: 'Watch or interview how the job is done today.'},
    {label: 'Write', text: 'SOP steps and AI prompts with checks.'},
    {label: 'Trial', text: 'Someone else runs it once with you watching.'},
  ],
  stackLabel: 'Everything included',
  stackHeading: 'What ships in the playbook',
  stackItems: [
    {title: 'SOP', text: 'Plain steps for scoped jobs.'},
    {title: 'Prompt pack', text: 'Tied to those steps.'},
    {title: 'Quality checks', text: 'What must be true before send or publish.'},
    {title: 'Owner map', text: 'Who maintains the playbook.'},
  ],
  scopeLine:
    'Scoped jobs count fixed at kickoff. Not a company-wide wiki, not unsupervised agent rollout, not Change Pack itself.',
  priceLabel: 'Investment',
  price: '$2,400',
  priceLead: 'Paid once when the job list locks at kickoff.',
  guarantee:
    'Agreed SOPs and playbooks are delivered and trialled, or we keep working at no extra cost until they are.',
  priceAnchor: 'Insurance against knowledge walking out the door.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
    {
      q: 'How many jobs are included?',
      a: 'The job count locks at kickoff. Extra jobs are quoted the same day so the $2,400 price stays honest.',
    },
    {
      q: 'Is this Team AI?',
      a: 'No. This product writes SOPs and AI playbooks for scoped jobs. Team AI is a shared session and prompt setup for the wider team.',
    },
    {
      q: 'Do you force AI into every step?',
      a: 'No. Prompts sit next to real steps. Some steps stay human-only when that is safer.',
    },
    {
      q: 'What does the trial look like?',
      a: 'Someone other than the expert runs the playbook once while we watch. Gaps get fixed before handoff.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed SOPs and playbooks are not delivered and trialled, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Take the job out of one head',
  finalLine: 'SOPs and AI playbooks. Paid once.',
  proofKind: 'sop-playbook',
} as FunnelProductCopy
