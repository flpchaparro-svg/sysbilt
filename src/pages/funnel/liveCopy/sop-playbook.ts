import type {FunnelProductCopy} from '../funnelCopy'

/** Live /go copy for SOP to AI Playbook. Wired later via funnelCopyForSlug. */
export const SOP_PLAYBOOK_LIVE_COPY = {
  eyebrow: 'Fixed price, about a week, jobs you choose',
  h1Generic: 'If your best person left tomorrow, the job would leave with them',
  h1Personal: (b: string) =>
    `${b}, if your best person left tomorrow the job would leave with them`,
  sub: "One person knows the proper way to do the work. It isn't written down anywhere, so quality depends on who is free that day and every new hire learns by watching. We sit with that person, write down how the job is actually done, and add the AI prompts and checks that make it repeatable by someone else.",
  ctaLabel: 'Build the playbook, $2,400',
  proofLabel: 'The picture',
  proofHeadingLive: 'The method is in one head and nowhere else',
  proofHeadingGeneric: 'The method is in one head and nowhere else',
  proofLead: (b: string | null) =>
    b
      ? `When that person at ${b} is on leave, the work either slows to a stop or somebody improvises. Both cost you, and you usually find out from a customer.`
      : 'When that person is on leave, the work either slows to a stop or somebody improvises. Both cost you, and you usually find out from a customer.',
  proofLeadGeneric:
    'When that person is on leave, the work either slows to a stop or somebody improvises. Both cost you, and you usually find out from a customer.',
  proofAfter:
    'Meanwhile the team is quietly using AI anyway, with nobody checking the output and no agreement on where it should never be used.',
  proofAfterGeneric:
    'Meanwhile the team is quietly using AI anyway, with nobody checking the output and no agreement on where it should never be used.',
  painLabel: 'What this is costing you',
  painHeading: 'Hero culture does not scale',
  painLines: [
    'Only one person knows the proper way, and they are too busy doing it to teach it.',
    'AI is already in use, unevenly and unsupervised, because nobody set the rules.',
    'New staff learn by watching, which means they inherit the shortcuts as well as the standard.',
    'Quality swings with whoever is on shift, and the customer notices before you do.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'The job written down, with the AI part done properly',
  bridgeBody:
    "This isn't a company-wide wiki nobody reads, and it isn't handing your work to an unsupervised robot. We take the jobs you pick, capture how they are actually done today, and write them as steps anyone trained can follow. Where AI genuinely helps, there's a tested prompt and a check on the output. Where it should not be near the work, we say so. Then somebody other than your expert runs it once while we watch.",
  bridgeGaugeCaption: 'Same job. Same standard. Whoever is on shift.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Work that survives holidays and resignations',
  benefits: [
    {
      title: 'The work survives leave',
      text: 'The method is written down, so a holiday stops being an outage.',
    },
    {
      title: 'AI used on purpose',
      text: 'Tested prompts sit beside the real steps, with a check on what comes out, instead of everyone freestyling.',
    },
    {
      title: 'New people get going faster',
      text: 'They follow a path instead of interrupting your busiest person all week.',
    },
    {
      title: 'Proof it works before we leave',
      text: 'Someone who is not the expert runs the playbook once with us watching, and we fix the gaps that turn up.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Capture, write, trial',
  processSteps: [
    {
      label: 'Capture',
      text: 'We watch or interview the person who does the job, and record how it really works, not how it is supposed to.',
    },
    {
      label: 'Write',
      text: 'Plain steps, tested AI prompts where they help, and the checks that must pass before anything is sent.',
    },
    {
      label: 'Trial',
      text: 'Someone else runs it once while we watch, and we correct whatever the trial exposes.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full playbook, nothing extra to buy',
  stackItems: [
    {
      title: 'The written job',
      text: 'Plain steps for the jobs you picked, in language a new starter can follow.',
    },
    {
      title: 'Prompt pack',
      text: 'Tested AI prompts tied to the exact steps where they help, not a generic list.',
    },
    {
      title: 'Quality checks',
      text: 'What has to be true before anything goes out, and which steps stay human only.',
    },
    {
      title: 'Owner map',
      text: 'Who keeps the playbook current, so it does not go stale the month after we leave.',
    },
  ],
  scopeLine:
    'The number of jobs is fixed at kickoff. Not a company-wide wiki, not an unsupervised agent rollout, not Change Pack. Extra jobs are quoted the same day so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$2,400',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the agreed playbooks are written and trialled by someone other than your expert, or we keep working at no extra cost until they are.',
  priceAnchor:
    "That's a fraction of what one experienced person costs you in a month, and right now they're the only copy of how the work gets done. Every time they're away, or gone for good, you pay for that gap at full price. This pays once.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why is this cheaper than a consultant writing our procedures?',
      a: "Because we scope it to the jobs that actually repeat, not your whole company. A consultancy documents everything and bills by the month. We write the handful of jobs that hurt when the expert is away, prove them once, and hand them over.",
    },
    {
      q: 'How many jobs are included?',
      a: 'The count locks at kickoff, usually the two or three that cause the most damage when the expert is unavailable. Extra jobs are quoted the same day.',
    },
    {
      q: 'Will my expert have to stop working for a week?',
      a: 'No. We work around them, usually a couple of short sessions plus watching one real run. The point is to take work off them, not add a project.',
    },
    {
      q: 'Do you force AI into every step?',
      a: 'No, and that matters. Some steps are safer human only, and we mark them that way. AI goes where it genuinely saves time and the output can be checked.',
    },
    {
      q: 'Is this Team AI Setup?',
      a: 'No. Team AI Setup gives the wider team shared tools and prompts. This writes down specific jobs so they can be done to the same standard by anyone.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed playbooks are not delivered and trialled, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Take the job out of one head',
  finalLine:
    'Pay once, pick the jobs that hurt most when your expert is away, and have them written and proven inside a week.',
  proofKind: 'sop-playbook',
} as FunnelProductCopy
