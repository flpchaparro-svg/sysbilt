/**
 * Hardcoded funnel narrative by product.
 * Sanity still owns CTA / Stripe / FAQ overrides; structure stays in code for now.
 */

export type FunnelBenefit = {title: string; text: string}
export type FunnelProcessStep = {label: string; text: string}
export type FunnelStackItem = {title: string; text: string}
export type FunnelFaq = {q: string; a: string}

export type FunnelProductCopy = {
  eyebrow: string
  h1Generic: string
  h1Personal: (b: string) => string
  sub: string
  ctaLabel: string
  proofLabel: string
  proofHeadingLive: string
  proofHeadingGeneric: string
  proofLead: (b: string | null) => string
  proofLeadGeneric: string
  proofAfter: string
  proofAfterGeneric: string
  painLabel: string
  painHeading: string
  painLines: string[]
  bridgeLabel: string
  bridgeHeading: string
  bridgeBody: string
  bridgeGaugeCaption: string
  benefitsLabel: string
  benefitsHeading: string
  benefits: FunnelBenefit[]
  processLabel: string
  processHeading: string
  processSteps: FunnelProcessStep[]
  stackLabel: string
  stackHeading: string
  stackItems: FunnelStackItem[]
  scopeLine: string
  priceLabel: string
  price: string
  priceLead: string
  guarantee: string
  priceAnchor: string
  faqLabel: string
  faqHeading: string
  faqs: FunnelFaq[]
  finalLabel: string
  finalHeading: string
  finalLine: string
  /** Proof UI: pagespeed dial vs missed-call moment */
  proofKind: 'speed' | 'missed-call'
}

export const SPEED_FIX_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price · Three days · Measured result',
  h1Generic: "Three days from now your site is fast, and Google's own score proves it",
  h1Personal: (b: string) =>
    `${b}, three days from now your site is fast, and Google's own score proves it`,
  sub: 'Slow pages lose people before they even appear, and Google ranks them lower for it. We fix it, then run the same public test again so you can watch the number change.',
  ctaLabel: 'Fix my website · $1,200',
  proofLabel: 'Your score',
  proofHeadingLive: 'This is you, right now',
  proofHeadingGeneric: 'We measure before we touch anything',
  proofLead: (b: string | null) =>
    b
      ? `We already ran ${b} through Google's speed test. This is your mobile score today.`
      : "We already ran your site through Google's speed test. This is your mobile score today.",
  proofLeadGeneric:
    "Google scores every site out of 100 on mobile. We use that number before and after so the result is public, not our spin. Here's what a typical slow score looks like.",
  proofAfter:
    "That number isn't our opinion, it's Google's. When we're done, we run the same test again and you watch what changed.",
  proofAfterGeneric:
    "That number isn't our opinion, it's Google's. When we run your site, this dial shows your real score, and after the fix, we run the same test again.",
  painLabel: 'What this is costing you',
  painHeading: "You're paying for traffic that never becomes a lead",
  painLines: [
    "Someone finds you, taps the link, waits, and leaves. They don't complain. They just call the next business.",
    "You feel it as quiet weeks and ads that don't work, when the real leak is a page that loads too late.",
    'Google prefers faster sites. While yours lags, competitors with the same offer sit above you.',
    'And every day you wait, you buy the same problem again: visitors who never see what you sell.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'One job, fixed scope, a number you can verify',
  bridgeBody:
    "This isn't a redesign, a retainer, or a twelve month agency relationship. It's a three day speed overhaul on the site you already have, measured before and after with Google's public tools. No meetings about meetings, no discovery workshops, no surprise invoice in month four.",
  bridgeGaugeCaption:
    "Three days later, the same test. Google calls 90 and up good. That's the band we tune toward, and we keep working until the improvement is real.",
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'People stay long enough to act',
      text: 'Pages that open fast stop the bounce. More of the traffic you already pay for gets a chance to enquire.',
    },
    {
      title: 'Google stops punishing the delay',
      text: 'Speed is a ranking signal. Closing the gap gives you a fairer fight against faster competitors.',
    },
    {
      title: 'You get proof, not a vibe',
      text: 'Before and after scores from the same public test. A number you can forward to anyone.',
    },
    {
      title: 'Done in three business days',
      text: "From the moment we have access. Most jobs finish faster, and you're never waiting on a slot.",
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Three days, then the proof lands',
  processSteps: [
    {
      label: 'Day 1',
      text: "Access, backup, and a full audit of what's actually slowing you down.",
    },
    {
      label: 'Day 2',
      text: 'The overhaul: images, scripts, caching, mobile-first tuning.',
    },
    {
      label: 'Day 3',
      text: 'Re-test, tune again, and send the before and after report.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full job, nothing extra to buy',
  stackItems: [
    {
      title: 'Full speed overhaul',
      text: 'Images, scripts, caching and mobile performance, delivered within three business days of access.',
    },
    {
      title: 'Before and after Google reports',
      text: 'Side by side, from the same public tools we used to score you.',
    },
    {
      title: 'Plain-English summary',
      text: 'What changed, why it mattered, and what to leave alone.',
    },
    {
      title: 'Systems Snapshot',
      text: "A one-page read on your website, lead handling, follow-up, reviews and automation, plus the one thing we'd fix next.",
    },
    {
      title: '14 days of aftercare',
      text: 'If anything we touched misbehaves, we sort it, no charge.',
    },
  ],
  scopeLine:
    'Works on WordPress, Shopify, Squarespace, Wix and custom builds. One site, up to 30 pages. Bigger builds get a same-day quote so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$1,200',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    "Our promise: we measure before and after. If the improvement isn't real, we keep working at no extra cost until it is.",
  priceAnchor:
    "That's about one client you'd otherwise lose. The leak charges you every month. This charges you once.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Is this refundable?',
      a: "There is no change-of-mind refund, because we start straight away. What you have instead is stronger: if the measured improvement isn't real, we keep working at no extra cost until it is.",
    },
    {
      q: 'Will anything break?',
      a: 'We back everything up before we start and test as we go. Anything we touched that misbehaves inside 14 days gets fixed free.',
    },
    {
      q: 'How long does it take?',
      a: 'Three business days from the moment we have access. Most jobs finish faster.',
    },
    {
      q: 'What do you need from me?',
      a: 'A short access form after payment — how your site is built and how we should get in. About five minutes, plain English.',
    },
    {
      q: 'Why is this cheaper than an agency retainer?',
      a: 'Because it is one job with a fixed scope, not a relationship. We made it repeatable. You get the benefit of that.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Three days from now, your site is fast and you have the proof',
  finalLine:
    'Same Google test, new number. The before and after land in your inbox, and the score speaks for itself.',
  proofKind: 'speed',
}

export const MISSED_CALL_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price · Days, not months · Live proof',
  h1Generic: 'Every missed call gets a reply before they dial the next business',
  h1Personal: (b: string) =>
    `${b}, every missed call gets a reply before they dial the next business`,
  sub: 'When the phone rings out, they move on. We wire an automatic text-back so the lead stays yours, and we prove it on a live missed call before we hand it over.',
  ctaLabel: 'Fix my missed calls · $790',
  proofLabel: 'The leak',
  proofHeadingLive: 'They called ready to say yes, and silence sent them elsewhere',
  proofHeadingGeneric: 'They called ready to say yes, and silence sent them elsewhere',
  proofLead: (b: string | null) =>
    b
      ? `Someone rings ${b} because they need something now. You can't answer. There is no message, no callback promise, nothing to hold them. Their mind is already looking for the next option.`
      : "Someone rings because they need something now. You can't answer. There is no message, no callback promise, nothing to hold them. Their mind is already looking for the next option.",
  proofLeadGeneric:
    "Someone rings because they need something now. You can't answer. There is no message, no callback promise, nothing to hold them. Their mind is already looking for the next option.",
  proofAfter:
    "People call with intent. If you give them nothing, they give the job to whoever answers. That's the leak: not the missed ring, the empty seconds after it.",
  proofAfterGeneric:
    "People call with intent. If you give them nothing, they give the job to whoever answers. That's the leak: not the missed ring, the empty seconds after it.",
  painLabel: 'What this is costing you',
  painHeading: "You're losing jobs you'll never know existed",
  painLines: [
    'Someone calls at lunch, after hours, or while your team is with a client. The phone rings out.',
    "They don't leave a voicemail. They call the next business on Google.",
    'You feel it as quiet weeks. You never see the lead that walked away.',
    'Every missed call is a job you paid to attract, then handed to someone else.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'One job, fixed scope, a reply you can watch fire',
  bridgeBody:
    "This isn't a new phone system, a receptionist hire, or a twelve month retainer. It's a missed-call text-back on the number you already use, wired once, tested live with you, then left running. No discovery workshops, no surprise invoice in month four.",
  bridgeGaugeCaption:
    "After setup, we miss a call on purpose with you watching. The text lands: we'll call back, and if they want, they can leave questions meanwhile. That's the handoff.",
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'The lead stays warm',
      text: 'A missed call gets a reply in seconds, so they wait for you instead of ringing the next listing.',
    },
    {
      title: 'You stop guessing',
      text: 'Every miss becomes a logged lead with a thread you can follow up, not a silent hang-up.',
    },
    {
      title: 'You get proof, not a vibe',
      text: 'We fire a live missed call with you on the line before we hand it over. You watch the SMS arrive.',
    },
    {
      title: 'Within three business days',
      text: 'From the moment we have access. Many setups finish on day one once the number is reachable. Three days is the cap, not the wait.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Often one day, never more than three, then the proof fires',
  processSteps: [
    {
      label: 'Day 1',
      text: 'Access, number check, and the wording customers will read.',
    },
    {
      label: 'Day 2',
      text: 'Wire the miss trigger, SMS, and where the lead lands.',
    },
    {
      label: 'Day 3',
      text: 'Live test with you watching, then hand over. Many jobs never need this day.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full job, nothing extra to buy',
  stackItems: [
    {
      title: 'Missed-call text-back',
      text: 'Automatic SMS when the business number rings out, on the number you choose.',
    },
    {
      title: 'Your words, not a robot script',
      text: "A calm reply that says you'll call back, and optionally invites them to leave questions while they wait.",
    },
    {
      title: 'Lead capture',
      text: 'Their reply lands with you, so the callback starts with a brief, not a blank slate.',
    },
    {
      title: 'Live proof',
      text: 'A deliberate missed call with you watching before we call it done.',
    },
    {
      title: '14 days of aftercare',
      text: 'If anything we touched misbehaves, we sort it, no charge.',
    },
  ],
  scopeLine:
    'One Australian business number. Works with mobile, landline, and most VoIP setups. Complex call-centre stacks get a same-day quote so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$790',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    "Our promise: we prove the text-back works on a live missed call before we hand it over. If it doesn't fire, we keep working at no extra cost until it does.",
  priceAnchor:
    "That's about one job you'd otherwise lose without knowing. The leak charges you every week. This charges you once.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Is this refundable?',
      a: "There is no change-of-mind refund, because we start straight away. What you have instead is stronger: we prove the text-back works on a live missed call before we hand it over. If it doesn't fire, we keep working at no extra cost until it does.",
    },
    {
      q: 'What if I already answer most calls?',
      a: "Then this catches the ones you can't. It only fires on missed calls, and it never touches the ones you answer.",
    },
    {
      q: 'Are there ongoing costs?',
      a: 'Our fee is once. The texts themselves cost a few cents each through your messaging account, less per month than one coffee for most businesses.',
    },
    {
      q: 'How long does it take?',
      a: 'Usually within three business days of access. Many setups finish in one afternoon once we can reach the number.',
    },
    {
      q: 'Why not an answering service?',
      a: "An answering service is a stranger with a script and a monthly bill. This is your own number and your own words, wired once. Most missed calls only need the first sixty seconds held, and that's the sixty seconds this owns.",
    },
    {
      q: 'What do you need from me?',
      a: 'Your business number, how the phone is set up, and the easiest way for us to connect. The access form after payment takes a few minutes.',
    },
    {
      q: 'Will this replace my receptionist?',
      a: 'No. It only fires when a call is missed. When you answer, nothing changes.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Next missed call, they hear from you first',
  finalLine:
    'Pay once, complete the short access form, and we prove the text-back on a live miss before we hand it over.',
  proofKind: 'missed-call',
}

export function funnelCopyForSlug(slug: string | undefined): FunnelProductCopy {
  if (slug === 'missed-call') return MISSED_CALL_COPY
  return SPEED_FIX_COPY
}
