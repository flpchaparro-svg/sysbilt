/**
 * Coming Soon /go drafts: list prices for review only.
 * No Stripe, no access form wiring. proofKind is always 'draft'.
 */
import type {FunnelProductCopy, FunnelBenefit, FunnelProcessStep, FunnelStackItem, FunnelFaq} from './funnelCopy'

type DraftSeed = {
  eyebrow: string
  h1Generic: string
  h1Personal?: (b: string) => string
  sub: string
  proofLabel?: string
  proofHeading: string
  proofLead: string
  proofAfter: string
  painHeading: string
  painLines: [string, string, string, string]
  bridgeHeading: string
  bridgeBody: string
  bridgeGaugeCaption: string
  benefits: [FunnelBenefit, FunnelBenefit, FunnelBenefit, FunnelBenefit]
  processHeading?: string
  processSteps: [FunnelProcessStep, FunnelProcessStep, FunnelProcessStep]
  stackHeading?: string
  stackItems: FunnelStackItem[]
  scopeLine: string
  price: string
  priceLead: string
  guarantee: string
  priceAnchor: string
  faqs: FunnelFaq[]
  finalHeading: string
  finalLine: string
}

export function makeDraftCopy(seed: DraftSeed): FunnelProductCopy {
  return {
    eyebrow: seed.eyebrow,
    h1Generic: seed.h1Generic,
    h1Personal:
      seed.h1Personal ||
      ((b: string) => `${b}, ${seed.h1Generic.charAt(0).toLowerCase()}${seed.h1Generic.slice(1)}`),
    sub: seed.sub,
    ctaLabel: 'Coming soon',
    proofLabel: seed.proofLabel || 'The picture',
    proofHeadingLive: seed.proofHeading,
    proofHeadingGeneric: seed.proofHeading,
    proofLead: () => seed.proofLead,
    proofLeadGeneric: seed.proofLead,
    proofAfter: seed.proofAfter,
    proofAfterGeneric: seed.proofAfter,
    painLabel: 'What this is costing you',
    painHeading: seed.painHeading,
    painLines: [...seed.painLines],
    bridgeLabel: 'The fix',
    bridgeHeading: seed.bridgeHeading,
    bridgeBody: seed.bridgeBody,
    bridgeGaugeCaption: seed.bridgeGaugeCaption,
    benefitsLabel: 'What changes for you',
    benefitsHeading: 'Outcomes, not jargon',
    benefits: [...seed.benefits],
    processLabel: 'How it runs',
    processHeading: seed.processHeading || 'A short, clear path',
    processSteps: [...seed.processSteps],
    stackLabel: 'Everything included',
    stackHeading: seed.stackHeading || 'One price, the full job',
    stackItems: seed.stackItems,
    scopeLine: seed.scopeLine,
    priceLabel: 'Investment',
    price: seed.price,
    priceLead: seed.priceLead,
    guarantee: seed.guarantee,
    priceAnchor: seed.priceAnchor,
    faqLabel: 'Objections',
    faqHeading: 'Straight answers before you waitlist',
    faqs: seed.faqs,
    finalLabel: 'Last step',
    finalHeading: seed.finalHeading,
    finalLine: seed.finalLine,
    proofKind: 'draft',
  }
}

const comingSoonFaq: FunnelFaq = {
  q: 'Can I buy this today?',
  a: 'Not yet. This page is a draft for review. When it opens, you will get a clear buy path or a short scope form. Until then, treat the price as the intended list price.',
}

export const SCHEMA_FAQ_COPY = makeDraftCopy({
  eyebrow: 'Fixed price · A few days · Coming soon',
  h1Generic: 'If AI answers and search cannot cite you, they invent someone else',
  sub: 'We write plain FAQs on key services and add FAQ schema (structured Q&A markup) so search and AI tools have something honest to read.',
  proofHeading: 'Citeable beats vague',
  proofLead:
    'Thin service pages give ChatGPT and Google nothing safe to quote. Clear Q&A is how you become nameable.',
  proofAfter:
    'Key services get real questions, real answers, and markup where it helps.',
  painHeading: 'You exist. The machines skip you',
  painLines: [
    'Competitors with boring-but-clear FAQs get mentioned. You do not.',
    'Your site answers nothing a patient would ask at 10pm.',
    'Schema was never added, or it was added wrong.',
    'GEO feels mystical when the real gap is missing facts.',
  ],
  bridgeHeading: 'FAQ substance plus markup',
  bridgeBody:
    "This isn't fake citations and it isn't a guarantee any AI picks you. It's practical FAQ content and schema on scoped pages. Coming soon.",
  bridgeGaugeCaption: 'Plain answers. Valid markup. No spam.',
  benefits: [
    {title: 'Questions answered on your site', text: 'Humans and tools both benefit.'},
    {title: 'Schema done properly', text: 'Markup that matches the visible content.'},
    {title: 'Entry to GEO', text: 'A lighter step before a full AI Search Visibility job.'},
    {title: 'Supports Conversion Pass', text: 'FAQs sit near the decision, not in a forgotten footer.'},
  ],
  processSteps: [
    {label: 'Choose', text: 'Which services and which real questions.'},
    {label: 'Write', text: 'Answers in your voice, approved by you.'},
    {label: 'Mark up', text: 'FAQ schema where it earns its place, then validate.'},
  ],
  stackItems: [
    {title: 'FAQ set', text: 'Scoped services, honest answers.'},
    {title: 'On-page placement', text: 'Where visitors actually read.'},
    {title: 'Schema', text: 'Structured Q&A markup aligned to the text.'},
    {title: 'Validation note', text: 'What we checked and what to leave alone.'},
  ],
  scopeLine: 'Scoped services. Coming soon.',
  price: '$1,200',
  priceLead: 'Fixed once services lock. Coming soon.',
  guarantee:
    'When this goes live: agreed FAQs and schema ship as scoped, or we keep working at no extra cost until they do.',
  priceAnchor: 'Smaller than a full GEO project, same direction of travel.',
  faqs: [comingSoonFaq],
  finalHeading: 'Become something tools can quote',
  finalLine: 'FAQs and schema on key services. Coming soon.',
})

export const TRACKING_FORMS_COPY = makeDraftCopy({
  eyebrow: 'Fixed price · Two days · Coming soon',
  h1Generic: 'If you cannot see the enquiry, you cannot improve the site',
  sub: 'We wire basic events, form destinations, and a simple view so you know what happened after the click. No vanity dashboard theatre.',
  proofHeading: 'Blind optimisation is guessing',
  proofLead:
    'Speed Fix and ads both need a destination signal. Without events and form routing, you argue from vibes.',
  proofAfter:
    'Key actions fire cleanly, forms land where they should, and you get a short map of what to watch.',
  painHeading: 'Money in. Fog out',
  painLines: [
    'You do not know which page produced the last enquiry.',
    'Forms email someone who left the company.',
    'Ads and speed work cannot be judged.',
    'GA4 was installed once and never checked.',
  ],
  bridgeHeading: 'Tracking and forms that tell the truth',
  bridgeBody:
    "This isn't a full analytics rebuild. It's the minimum honest signal: events, destinations, and a simple view. Coming soon.",
  bridgeGaugeCaption: 'See the enquiry. Then improve.',
  benefits: [
    {title: 'Proof for the work', text: 'You can see whether Speed Fix or ads moved anything.'},
    {title: 'Forms stop disappearing', text: 'Destinations match the people who still work there.'},
    {title: 'Light, not heavy', text: 'Enough signal to decide, not a BI project.'},
    {title: 'Ready for CRM', text: 'Clean events make later CRM Rescue easier.'},
  ],
  processSteps: [
    {label: 'Inventory', text: 'Forms, buttons, and where leads should go.'},
    {label: 'Wire', text: 'Events and destinations on the scoped actions.'},
    {label: 'Verify', text: 'Test submissions and a one-page watchlist.'},
  ],
  stackItems: [
    {title: 'Event set', text: 'Primary conversions only.'},
    {title: 'Form destinations', text: 'Correct inboxes or CRM fields.'},
    {title: 'Watchlist', text: 'What to check weekly in plain language.'},
    {title: 'Test proof', text: 'We show you a test event landing correctly.'},
  ],
  scopeLine: 'Primary site conversions. Coming soon.',
  price: '$950',
  priceLead: 'Fixed scope. Coming soon.',
  guarantee:
    'When this goes live: scoped events and destinations work in testing, or we keep working at no extra cost until they do.',
  priceAnchor: 'Cheaper than another month of spend you cannot measure.',
  faqs: [comingSoonFaq],
  finalHeading: 'See the enquiry, then improve',
  finalLine: 'Events, forms, a simple watchlist. Coming soon.',
})

export const SITE_CHAT_COPY = makeDraftCopy({
  eyebrow: 'Fixed price · About a week · Coming soon',
  h1Generic: 'A site chat that answers the usual questions and knows when to shut up',
  sub: 'Branded FAQ chat on your website: hours, services, location, next step. Hands off to a human when the question is real work. Not a toy that invents prices.',
  proofHeading: 'After-hours questions still happen',
  proofLead:
    'People browse at night. If nothing answers, they leave. If a bad bot invents fees, you earn a dispute.',
  proofAfter:
    'A small brain trained on your FAQs, with a clear handoff and a tight leash on what it may say.',
  painHeading: 'Phone-tag for questions a page should answer',
  painLines: [
    'Reception repeats the same five answers all day.',
    'After-hours browsers bounce.',
    'Generic chat widgets sound nothing like you.',
    'You fear AI making up clinical or price claims.',
  ],
  bridgeHeading: 'FAQ bot with a human door',
  bridgeBody:
    "This isn't an unsupervised agent running your business. It's a site chat limited to approved FAQs, with handoff when the question needs a person. Coming soon.",
  bridgeGaugeCaption: 'Answer the usual. Escalate the rest.',
  benefits: [
    {title: 'Common questions handled', text: 'Hours, parking, what you offer, how to book.'},
    {title: 'Handoff when needed', text: 'Real intent reaches a human without theatre.'},
    {title: 'On-brand', text: 'Voice and limits you approve.'},
    {title: 'Works with Booking', text: 'Chat can point at Book now when that system is live.'},
  ],
  processSteps: [
    {label: 'FAQ brain', text: 'Approve what it may say. Ban what it must never say.'},
    {label: 'Install', text: 'On your site, branded, mobile-friendly.'},
    {label: 'Handoff', text: 'Alert path tested. Escape hatch obvious.'},
  ],
  stackItems: [
    {title: 'Approved FAQ set', text: 'You sign off before it goes live.'},
    {title: 'Chat UI', text: 'On your domain, not a random third-party look.'},
    {title: 'Handoff rules', text: 'When to stop answering and call a human.'},
    {title: 'Guardrails', text: 'No inventing prices or clinical advice.'},
  ],
  scopeLine: 'One site. Coming soon.',
  price: '$1,850',
  priceLead: 'Fixed setup. Coming soon.',
  guarantee:
    'When this goes live: chat answers the approved FAQ set and hands off as scoped, or we keep working at no extra cost until it does.',
  priceAnchor: 'Reception time back on questions a page should own.',
  faqs: [
    comingSoonFaq,
    {
      q: 'Will it book appointments alone?',
      a: 'Only if you also have Booking System or a path we can point to. Chat itself does not invent calendar slots.',
    },
  ],
  finalHeading: 'Answer the usual without inventing the rest',
  finalLine: 'FAQ chat, human door, tight leash. Coming soon.',
})

export const MEDIA_CLEAN_COPY = makeDraftCopy({
  eyebrow: 'Fixed price · One to two days · Coming soon',
  h1Generic: 'Heavy images keep slowing the site after the main speed job',
  sub: 'We compress, replace, and tidy media that the Speed Fix pass flagged as leftovers or that crept back in later.',
  proofHeading: 'Weight returns if nobody watches media',
  proofLead:
    'A beautiful photo at the wrong size undoes part of a speed win. Galleries and blogs are the usual culprits.',
  proofAfter:
    'Scoped media cleaned, with a short rule for what you upload next.',
  painHeading: 'The score slipped again',
  painLines: [
    'Someone uploaded full-resolution phone photos.',
    'A plugin gallery loads everything at once.',
    'Speed Fix helped, then marketing added banners.',
    'You do not know which files are safe to crush.',
  ],
  bridgeHeading: 'A focused media clean',
  bridgeBody:
    'Not a redesign. Media hygiene on a scoped set of pages or folders. Coming soon.',
  bridgeGaugeCaption: 'Lighter files. Same story.',
  benefits: [
    {title: 'Protect the speed win', text: 'Stop quiet regressions from new uploads.'},
    {title: 'Clear upload rules', text: 'Your team knows what size to use next.'},
    {title: 'Small job, clear end', text: 'Scoped pages or folders, not infinite.'},
    {title: 'Optional after Speed Fix', text: 'Only when the audit shows leftovers.'},
  ],
  processSteps: [
    {label: 'Find', text: 'Heaviest offenders on scoped pages.'},
    {label: 'Clean', text: 'Compress, resize, replace where needed.'},
    {label: 'Rule', text: 'One-page upload guide for your team.'},
  ],
  stackItems: [
    {title: 'Media audit', text: 'What is costing you.'},
    {title: 'Clean pass', text: 'Scoped files fixed.'},
    {title: 'Upload guide', text: 'Plain rules so it does not bounce back.'},
  ],
  scopeLine: 'Scoped pages or folders. Coming soon.',
  price: '$650',
  priceLead: 'Small fixed job. Coming soon.',
  guarantee:
    'When this goes live: scoped media is cleaned as agreed, or we keep working at no extra cost until it is.',
  priceAnchor: 'Entry add-on when speed work is already in motion.',
  faqs: [comingSoonFaq],
  finalHeading: 'Keep the site light after the win',
  finalLine: 'Media cleaned. Upload rules left behind. Coming soon.',
})

export const A11Y_PASS_COPY = makeDraftCopy({
  eyebrow: 'Fixed price · A few days · Coming soon',
  h1Generic: 'If people cannot use the site, they will not enquire',
  sub: 'A focused accessibility pass on critical issues: contrast, labels, keyboard paths, and form clarity. Clinics and professional firms feel this in trust as much as compliance.',
  proofHeading: 'Usability is a sales issue',
  proofLead:
    'Low contrast, missing labels, and broken keyboard paths quietly remove customers you never hear from.',
  proofAfter:
    'Critical issues on scoped pages fixed, with a short list of what remains for a deeper audit if you want one later.',
  painHeading: 'Invisible drop-off',
  painLines: [
    'Forms fail screen readers.',
    'Buttons look fine to you and invisible to someone else.',
    'Mobile tap targets fight each other.',
    'You only hear about it when a patient complains, if they bother.',
  ],
  bridgeHeading: 'Critical fixes, not a legal certificate',
  bridgeBody:
    "This isn't a full WCAG certification project. It's a quick pass on the worst blockers on priority pages. Coming soon.",
  bridgeGaugeCaption: 'Clearer for more people. Better for everyone.',
  benefits: [
    {title: 'Fewer quiet exits', text: 'More people can complete the path to enquire.'},
    {title: 'Forms that make sense', text: 'Labels and errors humans can follow.'},
    {title: 'Trust signal', text: 'Especially for clinics and professional services.'},
    {title: 'Honest scope', text: 'Critical pass now. Deeper audit optional later.'},
  ],
  processSteps: [
    {label: 'Scan', text: 'Critical issues on scoped pages.'},
    {label: 'Fix', text: 'Contrast, labels, focus, form clarity.'},
    {label: 'Report', text: 'What changed, what remains.'},
  ],
  stackItems: [
    {title: 'Critical issue list', text: 'Prioritised, plain language.'},
    {title: 'Fix pass', text: 'On scoped pages.'},
    {title: 'Remainder note', text: 'What a deeper audit would cover if you want it.'},
  ],
  scopeLine: 'Priority pages. Coming soon. Not a certification.',
  price: '$1,100',
  priceLead: 'Critical pass only. Coming soon.',
  guarantee:
    'When this goes live: agreed critical fixes ship on scoped pages, or we keep working at no extra cost until they do.',
  priceAnchor: 'Trust and usability, not a certificate badge.',
  faqs: [
    comingSoonFaq,
    {
      q: 'Is this a legal guarantee?',
      a: 'No. It is practical critical fixes. Formal compliance audits are a different engagement.',
    },
  ],
  finalHeading: 'Let more people complete the path',
  finalLine: 'Critical access fixes on priority pages. Coming soon.',
})

export const WHATSAPP_SETUP_COPY = makeDraftCopy({
  eyebrow: 'Fixed price · Two days · Coming soon',
  h1Generic: 'WhatsApp is where customers already are. Your Business setup is not',
  sub: 'We set up WhatsApp Business properly: profile, labels, quick replies, and routing so chats do not live in one personal phone forever.',
  proofHeading: 'Personal chat does not scale',
  proofLead:
    'A number on a staff phone means holidays break you, and nobody else can see the thread.',
  proofAfter:
    'Business profile live, labels for stages, quick replies for the usual asks, and a clear owner path.',
  painHeading: 'The chat lives in one pocket',
  painLines: [
    'The owner is the bottleneck for every WhatsApp ping.',
    'No labels, so urgent and junk look the same.',
    'Tone depends on who typed last.',
    'You cannot hand off when someone is away.',
  ],
  bridgeHeading: 'Business WhatsApp with a simple desk',
  bridgeBody:
    'Profile, labels, quick replies, routing. Not a full CRM. Coming soon.',
  bridgeGaugeCaption: 'Shared channel. Shared rules.',
  benefits: [
    {title: 'Not stuck on one phone', text: 'The business owns the channel.'},
    {title: 'Faster usual answers', text: 'Quick replies for hours, parking, pricing ranges you approve.'},
    {title: 'Visible stages', text: 'Labels so the team sees what needs a human.'},
    {title: 'Pairs with Missed-Call', text: 'Phone and chat both covered.'},
  ],
  processSteps: [
    {label: 'Set up', text: 'Business profile and access.'},
    {label: 'Desk', text: 'Labels, quick replies, routing rules.'},
    {label: 'Train', text: 'Short handoff for whoever watches the queue.'},
  ],
  stackItems: [
    {title: 'Business profile', text: 'On your number path, as scoped.'},
    {title: 'Label set', text: 'Simple stages your team will actually use.'},
    {title: 'Quick replies', text: 'Approved answers in your voice.'},
    {title: 'Routing note', text: 'Who watches, who escalates.'},
  ],
  scopeLine: 'One WhatsApp Business setup. Coming soon.',
  price: '$950',
  priceLead: 'Fixed setup. Coming soon.',
  guarantee:
    'When this goes live: agreed profile, labels, and quick replies are in place, or we keep working at no extra cost until they are.',
  priceAnchor: 'Stops the owner being the only inbox.',
  faqs: [comingSoonFaq],
  finalHeading: 'Put chat on a business footing',
  finalLine: 'Profile, labels, quick replies. Coming soon.',
})

export const DM_REPLY_COPY = makeDraftCopy({
  eyebrow: 'Fixed price · Two to three days · Coming soon',
  h1Generic: 'Instagram and Facebook DMs deserve the same first reply as your forms',
  sub: 'Quick replies and handoff rules for Meta DMs so social enquiries do not die in a personal inbox.',
  proofHeading: 'Social is an intake channel',
  proofLead:
    'People ask price and availability in DMs. Slow or missing replies feel like the business is asleep.',
  proofAfter:
    'Quick replies live, escape to a human clear, ownership documented.',
  painHeading: 'DMs are treated like hobbies',
  painLines: [
    'Only one person has the login.',
    'Replies go out at midnight or not at all.',
    'No record of what was promised.',
    'Ads drive DMs into a black hole.',
  ],
  bridgeHeading: 'DM desk with quick replies',
  bridgeBody:
    'Meta quick replies, handoff, and a short desk. Not a full social agency. Coming soon.',
  bridgeGaugeCaption: 'First reply fast. Human when needed.',
  benefits: [
    {title: 'Ads stop leaking into silence', text: 'DM intent gets an ack.'},
    {title: 'Shared ownership', text: 'Not one personal profile forever.'},
    {title: 'Consistent answers', text: 'Approved lines for the usual asks.'},
    {title: 'Path to CRM', text: 'Serious leads can move into your real system next.'},
  ],
  processSteps: [
    {label: 'Access', text: 'Page and inbox permissions.'},
    {label: 'Build', text: 'Quick replies and handoff rules.'},
    {label: 'Test', text: 'You send a DM. We watch the path.'},
  ],
  stackItems: [
    {title: 'Quick reply pack', text: 'Approved answers.'},
    {title: 'Handoff rules', text: 'When a human must take it.'},
    {title: 'Ownership note', text: 'Who watches which inbox.'},
  ],
  scopeLine: 'Instagram and/or Facebook Page inbox as scoped. Coming soon.',
  price: '$1,100',
  priceLead: 'Fixed once channels lock. Coming soon.',
  guarantee:
    'When this goes live: scoped quick replies and handoff work in testing, or we keep working at no extra cost until they do.',
  priceAnchor: 'Protects paid social and organic DMs alike.',
  faqs: [comingSoonFaq],
  finalHeading: 'Treat DMs like enquiries',
  finalLine: 'Quick replies, clear handoff. Coming soon.',
})

export const QUOTE_FOLLOWUP_COPY = makeDraftCopy({
  eyebrow: 'Fixed price · About a week · Coming soon',
  h1Generic: 'Quotes go quiet. The follow-up still depends on memory',
  sub: 'A gentle chase sequence for quotes that did not convert, so warm work does not die in a spreadsheet.',
  proofHeading: 'Silence after the PDF',
  proofLead:
    'People mean to reply. Life intervenes. If you never nudge, the job goes to whoever followed up.',
  proofAfter:
    'A short, polite sequence with stop rules when they answer or say no.',
  painHeading: 'Your best leads go cold politely',
  painLines: [
    'Quotes sit in Sent with no next step.',
    'Staff hate chasing, so they avoid it.',
    'You only remember the big ones.',
    'No record of how many nudges went out.',
  ],
  bridgeHeading: 'Autopilot with manners',
  bridgeBody:
    'Timed follow-ups, your voice, clear stop conditions. Not spam. Coming soon.',
  bridgeGaugeCaption: 'Nudge. Stop when they engage.',
  benefits: [
    {title: 'Warm work gets a second chance', text: 'Without you living in Sent.'},
    {title: 'Tone stays human', text: 'Short, respectful, on-brand.'},
    {title: 'Stops when it should', text: 'Reply or decline ends the sequence.'},
    {title: 'Pairs with CRM Rescue', text: 'Stronger when deals already live somewhere.'},
  ],
  processSteps: [
    {label: 'Map', text: 'Where quotes live and what counts as sent.'},
    {label: 'Write', text: 'Sequence copy and timing.'},
    {label: 'Wire', text: 'Automation on your tools, tested.'},
  ],
  stackItems: [
    {title: 'Sequence copy', text: 'Two to four touches, approved by you.'},
    {title: 'Timing rules', text: 'Sensible gaps, not daily noise.'},
    {title: 'Stop rules', text: 'Reply, book, or opt-out ends it.'},
    {title: 'Owner alert', text: 'When a human should call instead.'},
  ],
  scopeLine: 'One quote pipeline. Coming soon.',
  price: '$1,450',
  priceLead: 'Fixed once the quote path is clear. Coming soon.',
  guarantee:
    'When this goes live: the agreed sequence runs and stops as scoped, or we keep working at no extra cost until it does.',
  priceAnchor: 'One recovered quote usually covers this.',
  faqs: [comingSoonFaq],
  finalHeading: 'Chase the quiet quotes without nagging',
  finalLine: 'Gentle sequence. Hard stop rules. Coming soon.',
})

export const NOSHOW_RESCUE_COPY = makeDraftCopy({
  eyebrow: 'Fixed price · Two days · Coming soon',
  h1Generic: 'Empty chairs hurt more when the reminder never landed',
  sub: 'Reminders and a rebook path for no-shows, usually beside Booking System. Protect the calendar you already fought to fill.',
  proofHeading: 'No-shows are a systems problem',
  proofLead:
    'People forget. Life happens. If your only reminder is hope, the chair stays empty.',
  proofAfter:
    'Reminder cadence plus a simple rebook path when they miss.',
  painHeading: 'The gap in the day costs real money',
  painLines: [
    'Reminders are manual or missing.',
    'No-shows get a sigh, not a rebook link.',
    'Staff scramble to fill gaps last minute.',
    'You blame customers for a process gap.',
  ],
  bridgeHeading: 'Remind, then recover',
  bridgeBody:
    'Reminder messages and a rebook path. Best with Booking already live. Coming soon.',
  bridgeGaugeCaption: 'Fewer empty chairs. Faster recovery.',
  benefits: [
    {title: 'Fewer forgotten visits', text: 'Reminders land before the appointment.'},
    {title: 'Rebook without shame', text: 'A clear path when they miss.'},
    {title: 'Staff time back', text: 'Less manual chasing.'},
    {title: 'Protects Booking ROI', text: 'The calendar system earns more when kept full.'},
  ],
  processSteps: [
    {label: 'Fit', text: 'Your calendar tool and message channel.'},
    {label: 'Build', text: 'Reminder and rebook copy, timing.'},
    {label: 'Test', text: 'A dummy booking proves the path.'},
  ],
  stackItems: [
    {title: 'Reminder set', text: 'Timing you approve.'},
    {title: 'Rebook path', text: 'Link or instruction that works.'},
    {title: 'Owner alert', text: 'Optional ping when a slot frees late.'},
  ],
  scopeLine: 'One calendar system. Coming soon.',
  price: '$750',
  priceLead: 'Fixed add-on. Coming soon.',
  guarantee:
    'When this goes live: reminders and rebook path work in testing, or we keep working at no extra cost until they do.',
  priceAnchor: 'One recovered appointment can cover this.',
  faqs: [comingSoonFaq],
  finalHeading: 'Protect the chair you already booked',
  finalLine: 'Reminders and rebook. Coming soon.',
})

export const INTAKE_FORMS_COPY = makeDraftCopy({
  eyebrow: 'Fixed price · Three to five days · Coming soon',
  h1Generic: 'Intake by email thread is how details get lost before the first visit',
  sub: 'A branded intake form that feeds your CRM or inbox cleanly: the fields you need, nothing you do not.',
  proofHeading: 'Clean intake, calmer first visit',
  proofLead:
    'Scattered PDFs and reply-all threads mean staff re-type, and patients repeat themselves.',
  proofAfter:
    'One intake path, fields mapped, destination clear.',
  painHeading: 'Admin before the work even starts',
  painLines: [
    'Paper or PDF forms go missing.',
    'Email threads bury medical or project details.',
    'CRM fields stay empty because nobody copies them in.',
    'First appointments start with catch-up admin.',
  ],
  bridgeHeading: 'Intake that feeds the system',
  bridgeBody:
    'Branded form, required fields, destination into CRM or structured email. Coming soon.',
  bridgeGaugeCaption: 'Ask once. Store once.',
  benefits: [
    {title: 'Patients or clients type once', text: 'You stop chasing missing details.'},
    {title: 'Staff stop re-keying', text: 'Fields land where work happens.'},
    {title: 'Brand-consistent', text: 'Looks like you, not a random form tool.'},
    {title: 'Ready for clinics and professionals', text: 'Scoped fields, not a generic survey.'},
  ],
  processSteps: [
    {label: 'Fields', text: 'What you truly need before the first visit or job.'},
    {label: 'Build', text: 'Form, validation, destination.'},
    {label: 'Handoff', text: 'Who reviews submissions and when.'},
  ],
  stackItems: [
    {title: 'Form design', text: 'Mobile-first, branded.'},
    {title: 'Field map', text: 'Into CRM or structured inbox.'},
    {title: 'Confirmation', text: 'What the submitter sees next.'},
    {title: 'Owner rules', text: 'Who reads new intakes.'},
  ],
  scopeLine: 'One intake form. Coming soon. Clinical compliance needs are scoped honestly.',
  price: '$1,200',
  priceLead: 'Fixed once fields lock. Coming soon.',
  guarantee:
    'When this goes live: the form collects scoped fields and lands in the agreed place, or we keep working at no extra cost until it does.',
  priceAnchor: 'Admin time back before every first visit.',
  faqs: [comingSoonFaq],
  finalHeading: 'Collect what you need once',
  finalLine: 'Branded intake into your system. Coming soon.',
})

export const INBOX_TRIAGE_COPY = makeDraftCopy({
  eyebrow: 'Warm setup · About a week · Coming soon',
  h1Generic: 'Your inbox is running the business instead of the other way around',
  sub: 'Rules and draft-reply assistance so routine mail gets sorted and suggested answers appear for humans to send. You stay in charge of what goes out.',
  proofHeading: 'Triage before burnout',
  proofLead:
    'Important mail sits under newsletters. Drafting the same reply ten times is not leadership.',
  proofAfter:
    'Labels or folders for the usual types, plus draft helpers for repetitive answers.',
  painHeading: 'Email is the unpaid second job',
  painLines: [
    'Everything lands in one stream.',
    'You rewrite the same paragraph daily.',
    'Urgent client mail looks like noise.',
    'Team inboxes have no shared rules.',
  ],
  bridgeHeading: 'Triage rules plus draft help',
  bridgeBody:
    'Organisation first, then AI drafts you approve. Not autopilot sending. Coming soon.',
  bridgeGaugeCaption: 'Sort. Suggest. You send.',
  benefits: [
    {title: 'Less hunting', text: 'Mail lands in sensible buckets.'},
    {title: 'Faster replies', text: 'Drafts for the repetitive ones.'},
    {title: 'Human final say', text: 'Nothing sends without you unless you explicitly choose that later.'},
    {title: 'Feeds Team AI', text: 'Same discipline as wider team prompts.'},
  ],
  processSteps: [
    {label: 'Map', text: 'Types of mail and what "done" means.'},
    {label: 'Rules', text: 'Labels, filters, priorities.'},
    {label: 'Drafts', text: 'Prompt pack for repetitive replies.'},
  ],
  stackItems: [
    {title: 'Triage map', text: 'Categories that match your week.'},
    {title: 'Rules setup', text: 'In the mail tool you already use.'},
    {title: 'Draft prompt pack', text: 'For humans to run, not silent send.'},
    {title: 'Team note', text: 'How shared inboxes stay clean.'},
  ],
  scopeLine: 'One primary mailbox or shared inbox. Coming soon.',
  price: '$2,200',
  priceLead: 'Fixed once mailbox scope locks. Coming soon.',
  guarantee:
    'When this goes live: agreed rules and draft pack are in place, or we keep working at no extra cost until they are.',
  priceAnchor: 'Hours back every week for the person who owns the inbox.',
  faqs: [comingSoonFaq],
  finalHeading: 'Make email smaller',
  finalLine: 'Triage rules and draft help. Coming soon.',
})

export const SOP_PLAYBOOK_COPY = makeDraftCopy({
  eyebrow: 'Warm · About a week · Coming soon',
  h1Generic: 'Your best work still lives in one person\'s head',
  sub: 'We turn real jobs into SOPs and AI playbooks the team can reuse: steps, prompts, and checks so quality does not depend on who is free.',
  proofHeading: 'Knowledge that ships',
  proofLead:
    'When the expert is away, the work slows or freestyles. That is expensive and uneven.',
  proofAfter:
    'A playbook for scoped jobs: when to use AI, what to check, what never to skip.',
  painHeading: 'Hero culture does not scale',
  painLines: [
    'Only one person knows the "proper" way.',
    'AI use is secret and inconsistent.',
    'New staff learn by osmosis.',
    'Quality swings with who is on shift.',
  ],
  bridgeHeading: 'SOP plus AI playbook',
  bridgeBody:
    'Document the job, then add prompts and checks. Feeds Team AI and Change Pack later. Coming soon.',
  bridgeGaugeCaption: 'Same job. Same standard. Any trained person.',
  benefits: [
    {title: 'Work survives holidays', text: 'The method is written down.'},
    {title: 'AI used on purpose', text: 'Prompts tied to real steps, not vibes.'},
    {title: 'Faster onboarding', text: 'New people have a path.'},
    {title: 'Ready for Change Pack', text: 'When a bigger rollout comes, the discipline already exists.'},
  ],
  processSteps: [
    {label: 'Capture', text: 'Watch or interview how the job is done today.'},
    {label: 'Write', text: 'SOP steps and AI prompts with checks.'},
    {label: 'Trial', text: 'Someone else runs it once with you watching.'},
  ],
  stackItems: [
    {title: 'SOP', text: 'Plain steps for scoped jobs.'},
    {title: 'Prompt pack', text: 'Tied to those steps.'},
    {title: 'Quality checks', text: 'What must be true before send or publish.'},
    {title: 'Owner map', text: 'Who maintains the playbook.'},
  ],
  scopeLine: 'Scoped jobs count fixed at kickoff. Coming soon.',
  price: '$2,400',
  priceLead: 'Fixed once jobs lock. Coming soon.',
  guarantee:
    'When this goes live: agreed SOPs and playbooks are delivered and trialled, or we keep working at no extra cost until they are.',
  priceAnchor: 'Insurance against knowledge walking out the door.',
  faqs: [comingSoonFaq],
  finalHeading: 'Take the job out of one head',
  finalLine: 'SOPs and AI playbooks. Coming soon.',
})

export const DASHBOARD_LITE_COPY = makeDraftCopy({
  eyebrow: 'Warm · About two weeks · Coming soon',
  h1Generic: 'One screen for leads, bookings, reviews, and what ads returned',
  sub: 'A lite dashboard that answers "are we okay this week?" without a BI project. Wired to the sources you already have.',
  proofHeading: 'Decisions need a single pane',
  proofLead:
    'Numbers live in five logins. By the time you assemble them, the week is gone.',
  proofAfter:
    'A simple view: enquiries, bookings, reviews, and campaign outcomes you care about.',
  painHeading: 'You manage by anecdote',
  painLines: [
    'Ads look fine until you check enquiries.',
    'Bookings and reviews never sit beside each other.',
    'Staff report vibes in meetings.',
    'You buy tools and still screenshot into Slack.',
  ],
  bridgeHeading: 'Lite dashboard, real sources',
  bridgeBody:
    'Not enterprise BI. A focused board for weekly decisions. Coming soon.',
  bridgeGaugeCaption: 'See the week. Act once.',
  benefits: [
    {title: 'One place to look', text: 'Weekly review becomes short.'},
    {title: 'Connects spend to outcomes', text: 'Ads beside enquiries and bookings.'},
    {title: 'Honest scope', text: 'A few metrics done well.'},
    {title: 'Grows with CRM Rescue', text: 'Cleaner inputs make the board better.'},
  ],
  processSteps: [
    {label: 'Pick metrics', text: 'Only what changes a decision.'},
    {label: 'Connect', text: 'Sources you already pay for.'},
    {label: 'Handoff', text: 'Who checks it on Monday.'},
  ],
  stackItems: [
    {title: 'Metric set', text: 'Leads, bookings, reviews, campaign outcomes as available.'},
    {title: 'Board', text: 'Simple layout, not a science fair.'},
    {title: 'Source map', text: 'Where each number comes from.'},
    {title: 'Weekly ritual', text: 'Ten-minute check, written down.'},
  ],
  scopeLine: 'Lite scope. Coming soon. Deep BI quoted separately.',
  price: '$2,600',
  priceLead: 'Fixed once metrics lock. Coming soon.',
  guarantee:
    'When this goes live: agreed metrics appear on the board from connected sources, or we keep working at no extra cost until they do.',
  priceAnchor: 'Weekly clarity without a data team.',
  faqs: [comingSoonFaq],
  finalHeading: 'See the week on one screen',
  finalLine: 'Lite dashboard for decisions. Coming soon.',
})

export const BUNDLE_CLINIC_COPY = makeDraftCopy({
  eyebrow: 'Bundle · Coming soon',
  h1Generic: 'Profile, reviews, and missed-call text-back for clinics that lose people at the door',
  sub: 'Google Profile Fix, Review Engine, and Missed-Call Text-Back run as one clinic capture bundle. List price below buying the three as strangers.',
  proofHeading: 'Local demand dies in small gaps',
  proofLead:
    'Maps, trust, and the missed call are three leaks that feel separate and are not.',
  proofAfter:
    'One sprint covering the three capture jobs clinics feel every week.',
  painHeading: 'Patients leave without drama',
  painLines: [
    'Profile looks unfinished next to the clinic down the road.',
    'Reviews stall because nobody asks.',
    'Missed calls become the competitor\'s booking.',
    'Three vendors means three kickoffs you do not have time for.',
  ],
  bridgeHeading: 'One capture bundle',
  bridgeBody:
    'Profile Fix + Review Engine + Missed-Call as one delivery. Coming soon.',
  bridgeGaugeCaption: 'Find. Trust. Catch the call.',
  benefits: [
    {title: 'One access window', text: 'Less admin for your team.'},
    {title: 'Coherent local story', text: 'Maps, proof, and phone catch-up together.'},
    {title: 'Bundle list price', text: '$2,200 vs $2,450 separate.'},
    {title: 'Natural next step', text: 'Booking System when you want Book now.'},
  ],
  processSteps: [
    {label: 'Brief', text: 'Profile, review ask path, phone setup.'},
    {label: 'Build', text: 'All three jobs in one window.'},
    {label: 'Handoff', text: 'Who owns asks, who watches missed calls.'},
  ],
  stackItems: [
    {title: 'Google Profile Fix', text: 'Included.'},
    {title: 'Review Engine', text: 'Included.'},
    {title: 'Missed-Call Text-Back', text: 'Included.'},
  ],
  scopeLine: 'One location. Coming soon.',
  price: '$2,200',
  priceLead: 'Bundle list price. Coming soon.',
  guarantee:
    'When this goes live: all three scoped pieces deliver, or we keep working at no extra cost until they do.',
  priceAnchor: 'Below $600 + $1,100 + $750 if bought apart.',
  faqs: [comingSoonFaq],
  finalHeading: 'Stop losing patients at the front door',
  finalLine: 'Profile, reviews, missed-call catch. Coming soon.',
})

export const BUNDLE_SPEED_NEXT_COPY = makeDraftCopy({
  eyebrow: 'Bundle · After Speed Fix · Coming soon',
  h1Generic: 'While the site is open: make pages convert and make results visible',
  sub: 'Conversion Pass plus Tracking and Forms Pack as the natural next bundle after Website Speed Fix. Same access window, two jobs that finish the story.',
  proofHeading: 'Fast is not finished',
  proofLead:
    'Speed without a clear ask, and without measurement, leaves you wondering what changed.',
  proofAfter:
    'Priority pages ask properly, and you can see enquiries land.',
  painHeading: 'You paid for speed and still argue about results',
  painLines: [
    'Pages are quick and unclear.',
    'Nobody knows if enquiries rose.',
    'A second kickoff feels heavy.',
    'Marketing wants proof you cannot show.',
  ],
  bridgeHeading: 'Speed Next bundle',
  bridgeBody:
    'Conversion Pass + Tracking Pack while access is warm. Coming soon.',
  bridgeGaugeCaption: 'Clear ask. Visible signal.',
  benefits: [
    {title: 'Same open window', text: 'No second archaeology of passwords.'},
    {title: 'Words and proof together', text: 'Convert and measure in one pass.'},
    {title: 'Honest bundle price', text: '$2,400 vs $1,400 + $950 separate.'},
    {title: 'Story for the client', text: 'We made it fast, clear, and measurable.'},
  ],
  processSteps: [
    {label: 'Pages', text: 'Conversion Pass on scoped URLs.'},
    {label: 'Signal', text: 'Tracking and form destinations.'},
    {label: 'Show', text: 'Before/after note plus a test enquiry.'},
  ],
  stackItems: [
    {title: 'Conversion Pass', text: 'Included.'},
    {title: 'Tracking and Forms Pack', text: 'Included.'},
  ],
  scopeLine: 'Assumes site access similar to Speed Fix. Coming soon.',
  price: '$2,400',
  priceLead: 'Bundle list price. Coming soon.',
  guarantee:
    'When this goes live: both scoped pieces deliver, or we keep working at no extra cost until they do.',
  priceAnchor: 'The finish after Speed Fix.',
  faqs: [comingSoonFaq],
  finalHeading: 'Finish what Speed Fix started',
  finalLine: 'Convert and measure. Coming soon.',
})

export const BUNDLE_FRONT_DOOR_COPY = makeDraftCopy({
  eyebrow: 'Bundle · Coming soon',
  h1Generic: 'Profile, reviews, and booking so demand can land and book',
  sub: 'Google Profile Fix, Review Engine, and Booking System as one front-door bundle for businesses ready to take appointments properly.',
  proofHeading: 'Find, trust, book',
  proofLead:
    'Maps without trust is weak. Trust without booking still forces phone tag.',
  proofAfter:
    'Local presence, social proof habit, and Book now in one delivery story.',
  painHeading: 'The front door has three locks',
  painLines: [
    'Profile messy.',
    'Reviews thin.',
    'Booking is still "call us".',
    'Three projects never start together.',
  ],
  bridgeHeading: 'Front Door bundle',
  bridgeBody:
    'Profile + Reviews + Booking. Coming soon.',
  bridgeGaugeCaption: 'Seen. Trusted. Booked.',
  benefits: [
    {title: 'One narrative for the buyer', text: 'Easy to explain on a call.'},
    {title: 'Bundle list price', text: '$3,400 vs $600 + $1,100 + $1,500.'},
    {title: 'Clinic and service fit', text: 'Anywhere appointments matter.'},
    {title: 'Upsell path', text: 'No-Show Rescue and AI Phone later.'},
  ],
  processSteps: [
    {label: 'Access', text: 'Profile, review path, calendar.'},
    {label: 'Build', text: 'All three in a planned window.'},
    {label: 'Go live', text: 'Book now tested end to end.'},
  ],
  stackItems: [
    {title: 'Google Profile Fix', text: 'Included.'},
    {title: 'Review Engine', text: 'Included.'},
    {title: 'Booking System', text: 'Included.'},
  ],
  scopeLine: 'One location, one calendar system. Coming soon.',
  price: '$3,400',
  priceLead: 'Bundle list price. Coming soon.',
  guarantee:
    'When this goes live: all three scoped pieces deliver, or we keep working at no extra cost until they do.',
  priceAnchor: 'Below buying the three doors apart.',
  faqs: [comingSoonFaq],
  finalHeading: 'Open the front door properly',
  finalLine: 'Profile, reviews, booking. Coming soon.',
})

export const WEBSITE_HOOK_COPY = makeDraftCopy({
  eyebrow: 'Hosted by us · Monthly Care · Coming soon',
  h1Generic: 'You need a website that looks professional, without the $5,000 headache',
  h1Personal: (b: string) =>
    `${b}, you need a website that looks professional, without the $5,000 headache`,
  sub: 'If your site is missing, broken, or embarrassing, people who find you online leave. We interview you, send a short form, research how you sell, and build a clean site on our hosting. You get a contact form to your email, basic pages that look ready, and a monthly plan so you are not chasing passwords or hosts.',
  proofLabel: 'The problem',
  proofHeading: 'People find you. Then they hit a dead end',
  proofLead:
    'They saw you on Google Maps, social, or a referral. They looked for a proper website. What they got was nothing, an old page, or something that does not look like a serious business. That is not a branding debate. That is lost work.',
  proofAfter:
    'Every week that goes on, you pay for ads, listings, and word of mouth that send people to a door that does not open. The fix is a front door that looks like you, takes their details, and does not cost an agency fortune or weeks of design arguments.',
  painHeading: 'What this is costing you',
  painLines: [
    'Someone searches, finds you, taps the site, and leaves in seconds because it looks unfinished or dead.',
    'You only live on Google Maps. That works until a competitor shows a real page and you look like you never bothered.',
    'You do not want to design it, write it, or learn hosting. So nothing gets done, and the problem sits there.',
    'A big rebuild quote lands at thousands before you even have one page that takes an enquiry.',
  ],
  bridgeHeading: 'We build the front door. You stay on a simple monthly plan',
  bridgeBody:
    "This isn't a DIY kit and it isn't a six-month agency project. You fill a form, we do a short interview, we research what your clients need to see, and we build a professional site on our hosting. Contact form to your email is included. Terms and privacy pages when the plan needs them. Basic search setup so the site can be found. You do not manage hosting, logins, or the technical junk. You pick Brochure, Practice, or Full site by how many pages you need.",
  bridgeGaugeCaption:
    'One page, five to seven, or nine to twelve. Same idea on all three: look ready, take enquiries, we host it.',
  benefits: [
    {
      title: 'No design spiral',
      text: 'We ask what you do, who you serve, and what must be on the page. Then we build. You are not stuck choosing fonts for a month.',
    },
    {
      title: 'Looks like a real business',
      text: 'Clean, fast on phones, and clear enough that a stranger trusts you enough to enquire.',
    },
    {
      title: 'We handle the boring tech',
      text: 'Hosting, security, domain pointing, and the basic setup so search can see you. You are not chasing passwords.',
    },
    {
      title: 'Enquiries have somewhere to go',
      text: 'A contact form emails you. That is the minimum. Without it, the site is a poster on the wall.',
    },
  ],
  processHeading: 'Form, interview, then we build',
  processSteps: [
    {
      label: 'Form and interview',
      text: 'You send logo, photos, hours, and services. We ask the short questions that matter so the site matches how you actually work.',
    },
    {
      label: 'Research and build',
      text: 'We check how you show up today and what your clients need to see. We write the basic page copy and build the site on our hosting.',
    },
    {
      label: 'Live on Care',
      text: 'Domain points to us. Form works. Monthly autopay begins at go-live. Light updates stay inside the plan. Today you pay one month to start the build.',
    },
  ],
  stackHeading: 'Three sizes. Same Care model',
  stackItems: [
    {
      title: 'Brochure · $120/mo',
      text: 'One strong page: who you are, what you do, hours, map, and a contact form to your email. Basic search setup. Privacy and terms when needed. Pay $120 today to start.',
    },
    {
      title: 'Practice · $160/mo',
      text: 'Five to seven pages: room for services, about, and proof, plus the form and the same hosting Care. Privacy and terms included. Pay $160 today to start.',
    },
    {
      title: 'Full site · $190/mo',
      text: 'Nine to twelve pages when you need more room to explain the work. Same form, hosting, and Care. Pay $190 today to start.',
    },
    {
      title: 'What else later',
      text: 'When the front door is working, you can grow into booking, follow-up, reviews, content, and more. Ask when you care. Not part of day one.',
    },
  ],
  scopeLine:
    'Build included in Care. Pay one month today to start. Monthly autopay from go-live. Minimum term and exit rules go in the agreement before we start. Coming soon. Draft for review only.',
  price: 'From $120/mo · pay from $120 today',
  priceLead:
    'Brochure $120/mo (today $120). Practice $160/mo (today $160). Full site $190/mo (today $190). Pay one month to start. Monthly autopay begins at go-live. Coming soon.',
  guarantee:
    'When this goes live: page count, form, and Care inclusions are written before build. Extra work is quoted. If the agreed pages and form are not delivered as scoped, we keep working at no extra cost until they are.',
  priceAnchor:
    'You are buying a professional front door and peace of mind on hosting, not a $5,000 science project.',
  faqs: [
    comingSoonFaq,
    {
      q: 'Do I have to write the website?',
      a: 'No. You give us the facts: services, hours, photos, how you want to sound. We draft the basic copy and build the pages. You approve before it goes live.',
    },
    {
      q: 'Where do enquiries go?',
      a: 'The contact form emails your inbox. That is included on every plan.',
    },
    {
      q: 'Do I manage hosting and passwords?',
      a: 'No. We host it on our stack and point your domain. Monthly Care is so you are not chasing hosts, renewals, or logins you forgot.',
    },
    {
      q: 'Is this a $5,000 agency rebuild?',
      a: 'No. It is a clear page count, a form, and monthly Care. Pay one month today to start. Bigger custom work stays on our normal website packages if you need that later.',
    },
    {
      q: 'What if we want more later?',
      a: 'Once the site is live, you can add other pieces when you care about them. We will quote those separately. Day one is the front door.',
    },
  ],
  finalHeading: 'A website that looks like you, without the headache',
  finalLine:
    'We interview, research, build, and host. You get a professional front door and a form that emails you. Coming soon.',
})

export const DRAFT_COPY_BY_SLUG: Record<string, FunnelProductCopy> = {
  'schema-faq': SCHEMA_FAQ_COPY,
  'tracking-forms': TRACKING_FORMS_COPY,
  'site-chat': SITE_CHAT_COPY,
  'media-clean': MEDIA_CLEAN_COPY,
  'a11y-pass': A11Y_PASS_COPY,
  'whatsapp-setup': WHATSAPP_SETUP_COPY,
  'dm-reply': DM_REPLY_COPY,
  'quote-followup': QUOTE_FOLLOWUP_COPY,
  'noshow-rescue': NOSHOW_RESCUE_COPY,
  'intake-forms': INTAKE_FORMS_COPY,
  'inbox-triage': INBOX_TRIAGE_COPY,
  'sop-playbook': SOP_PLAYBOOK_COPY,
  'dashboard-lite': DASHBOARD_LITE_COPY,
  'bundle-clinic': BUNDLE_CLINIC_COPY,
  'bundle-speed-next': BUNDLE_SPEED_NEXT_COPY,
  'bundle-front-door': BUNDLE_FRONT_DOOR_COPY,
  'website-hook': WEBSITE_HOOK_COPY,
}
