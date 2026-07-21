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
  /** Proof UI: pagespeed dial vs missed-call vs Google profile vs index check vs ad landing vs CRM vs team recognition */
  proofKind:
    | 'speed'
    | 'missed-call'
    | 'google-profile'
    | 'search-fix'
    | 'landing-page'
    | 'crm-rescue'
    | 'team-ai'
    | 'change-pack'
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
  ctaLabel: 'Fix my missed calls · $750',
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
  price: '$750',
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

export const GOOGLE_PROFILE_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price · Two business days · You keep the keys',
  h1Generic: "Your Google profile is the first thing customers see. Right now it's working against you.",
  h1Personal: (b: string) =>
    `${b}, your Google profile is the first thing customers see. Right now it's working against you.`,
  sub: "Before anyone visits your website, they see your Google Business Profile: the map listing, the photos, the reviews, the hours. When it's thin or half-claimed, people quietly pick the business next to you that looks alive.",
  ctaLabel: 'Fix my profile · $600',
  proofLabel: 'The front door',
  proofHeadingLive: 'Search your name, then your best competitor. That gap is the job.',
  proofHeadingGeneric: 'Search your name, then your best competitor. That gap is the job.',
  proofLead: (b: string | null) =>
    b
      ? `Before anyone opens ${b}'s website, they see the Google panel: map, photos, reviews, hours. When that panel looks unfinished, they call the listing that looks looked after.`
      : 'Before anyone opens your website, they see the Google panel: map, photos, reviews, hours. When that panel looks unfinished, they call the listing that looks looked after.',
  proofLeadGeneric:
    'Before anyone opens your website, they see the Google panel: map, photos, reviews, hours. When that panel looks unfinished, they call the listing that looks looked after.',
  proofAfter:
    "That panel is often the highest-traffic page you own, and the one nobody looks after. This fix is two business days of proper attention, not a retainer.",
  proofAfterGeneric:
    "That panel is often the highest-traffic page you own, and the one nobody looks after. This fix is two business days of proper attention, not a retainer.",
  painLabel: 'What this is costing you',
  painHeading: "Google is already showing customers a version of your business. Nobody's managing it.",
  painLines: [
    'Most profiles were claimed once, years ago, and never touched again. Missing services, old hours, three phone photos, categories Google guessed.',
    'Doing it yourself someday costs you every day it waits, because the profile is deciding calls right now.',
    'Cheap listing gigs stuff fake signals into profiles. That is how listings get suspended, and a suspended profile is worse than a thin one.',
    'A full SEO retainer gets there eventually, over months and a monthly bill, when the front door needs two days of proper work.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'What we actually do',
  bridgeBody:
    "This isn't Google Ads, website SEO, or a monthly posting retainer. It's a complete Google Business Profile overhaul on one location: claim or recover, categories and services filled, description that sells, photos sorted, review link ready, messaging and Q and A switched on. Ownership stays on your account. Two business days from access.",
  bridgeGaugeCaption:
    'When we hand it over, the panel looks alive: complete categories, clear hours, a description that sells, a review path your customers can use, and the keys still in your name.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'You look open for business',
      text: 'Categories, services, hours and attributes filled properly, so Google can show you for the searches you actually want.',
    },
    {
      title: 'The description sells',
      text: 'Plain language, with the terms customers search, not a blank box or a keyword dump.',
    },
    {
      title: 'Reviews become a habit',
      text: 'Your review link plus ready wording, so asking happy customers is a five-minute routine, not a mystery.',
    },
    {
      title: 'Done in two business days',
      text: 'From the moment we have manager access. If access is delayed on your side, we say so. The two days start when we can work.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Two business days, then you own a profile that works',
  processSteps: [
    {
      label: 'Day 1',
      text: 'Manager access, claim or recovery check, and a full read of what is missing or wrong.',
    },
    {
      label: 'Day 2',
      text: 'Overhaul, review link, Q and A, hand over the guide and Systems Snapshot.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full job, nothing extra to buy',
  stackItems: [
    {
      title: 'Complete profile overhaul',
      text: 'Claim or recover, categories, services, attributes, description, photos, messaging and Q and A, within two business days of access.',
    },
    {
      title: 'Ownership locked to you',
      text: 'You keep the keys. We work as a manager. We never need your Google password.',
    },
    {
      title: 'Review link and ask wording',
      text: 'A simple, honest way to ask happy customers, ready to send.',
    },
    {
      title: 'Monthly habit guide + Systems Snapshot',
      text: 'The five-minute routine that keeps the profile winning, plus a one-page read on what we would fix next.',
    },
    {
      title: '14 days of aftercare',
      text: 'If anything we touched misbehaves, we sort it, no charge.',
    },
  ],
  scopeLine:
    'One Australian business location with a real address Google will accept. Service-area-only or no-address cases get a same-day straight answer. Ads, website SEO, and ongoing posting are out of scope.',
  priceLabel: 'Investment',
  price: '$600',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    "Our promise: if the profile isn't set up the way we described, we keep working at no extra cost until it is. If Google blocks the listing (for example no address), we tell you early and refund what we could not do.",
  priceAnchor:
    "That's less than most owners spend guessing at DIY while the panel keeps losing calls. The leak is daily. This is once.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Do you need my Google login?',
      a: 'No. Google lets you add us as a manager without sharing your password, and we walk you through it in two minutes. Ownership stays with you.',
    },
    {
      q: 'My profile is suspended or someone else claimed it. Can you fix that?',
      a: 'Usually yes. Recovery is part of the job. Genuinely stuck cases get a straight answer and a refund for anything we could not do.',
    },
    {
      q: 'Will this get me more reviews?',
      a: 'We set up the link, the wording and the habit. The reviews come from your customers. We never post fake ones, and we walk away from anyone who asks.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the profile isn't set up the way we described, we keep working at no extra cost until it is. The exception is a listing Google will not allow us to finish: you get a straight answer and your money back for what we could not do.",
    },
    {
      q: 'Is this the same as SEO?',
      a: "It's the local piece of it, and usually the fastest-moving piece. Your profile often decides the call before your website loads.",
    },
    {
      q: 'What happens after I pay?',
      a: 'Access form immediately. We start as soon as we have manager access, and the finished profile plus your guide and Systems Snapshot land within two business days of that access.',
    },
    {
      q: 'What if I have more than one location?',
      a: 'This price is one location. Extra locations are a separate job or a same-day quote so the fixed price stays honest.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Two days from now, the first thing customers see finally works for you',
  finalLine:
    'Pay once, complete the short access form, add us as manager, and we hand back a profile you own.',
  proofKind: 'google-profile',
}

export const SEARCH_FIX_COPY: FunnelProductCopy = {
  eyebrow: "Fixed price · Three days · Google's own records",
  h1Generic:
    "Three days from now, Google can see your whole site again, and its own records prove it",
  h1Personal: (b: string) =>
    `Three days from now, Google can see ${b} again, and its own records prove it`,
  sub: "A page Google can't see doesn't exist to anyone searching for it. This is almost always one broken setting left behind by a redesign or a migration, and it's fixable fast, with the before and after in Google's own Search Console.",
  ctaLabel: 'Fix my visibility · $1,400',
  proofLabel: 'The evidence',
  proofHeadingLive: 'This is you, right now',
  proofHeadingGeneric: 'This is you, right now',
  proofLead: (b: string | null) =>
    b
      ? `We ran ${b} through an indexation check this week. That's how many pages Google is currently skipping. Not our opinion, Google's own index.`
      : "We ran your site through an indexation check this week. That's how many pages Google is currently skipping. Not our opinion, Google's own index.",
  proofLeadGeneric:
    'Open Google and search site:yourbusiness.com.au. Count the results, then count the pages your site actually has. The gap is what this fixes.',
  proofAfter:
    "That's not a ranking guess. It's pages Google isn't listing at all.",
  proofAfterGeneric:
    "If the counts don't match, customers searching for what you do can't find pages that should be there.",
  painLabel: 'What this is costing you',
  painHeading: "You're invisible at the exact moment they're choosing",
  painLines: [
    "Someone searches for exactly what you do. Google shows them everyone but you.",
    "They don't know you're missing. They just choose from who's there.",
    'Every enquiry your competitors take this month includes the ones that were looking for you.',
    'And the longer pages stay dropped, the longer the recrawl takes when they finally come back.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: "One job, fixed scope, verified in Google's own records",
  bridgeBody:
    "This isn't an SEO retainer, a rebuild, or a six month content plan. It's a three day rescue: find every setting blocking Google, remove them, resubmit the site, and then watch the recrawl in Search Console until your pages come back.",
  bridgeGaugeCaption:
    "Google recrawls on its own schedule, usually days to a few weeks. That's why 30 days of monitoring is included, and why anyone promising overnight rankings is selling you something else.",
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'Customers can find you again',
      text: "Pages back in the index means showing up for the searches you'd already earned.",
    },
    {
      title: "You watch it happen in Google's records",
      text: 'Search Console, owned by your account, shows the pages returning. Check it any morning you like.',
    },
    {
      title: 'It stays fixed',
      text: 'A plain-English summary of what broke, plus the habit that stops a future redesign quietly undoing it.',
    },
    {
      title: 'Fixes in three business days',
      text: 'The blocks come off fast. Then we watch the recrawl with you for a full 30 days.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Three days of fixes, thirty days of watching',
  processSteps: [
    {
      label: 'Day 1',
      text: "Access and the full diagnosis, what Google sees, what it can't, and the exact settings blocking it.",
    },
    {
      label: 'Day 2 to 3',
      text: 'Blocks removed, sitemap rebuilt and resubmitted, Search Console configured under your ownership.',
    },
    {
      label: 'The watch',
      text: '30 days of recrawl monitoring, then your before and after report.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full rescue, nothing extra to buy',
  stackItems: [
    {
      title: 'Full indexation diagnosis and fix',
      text: 'Stray noindex tags, robots rules, broken canonicals, misfired redirects.',
    },
    {
      title: 'Sitemap rebuilt and resubmitted',
      text: 'So Google gets a clean map of the site.',
    },
    {
      title: 'Search Console under your ownership',
      text: 'Set up and locked to your account, not ours. You keep the keys.',
    },
    {
      title: 'Plain-English summary',
      text: 'What broke, why, and how to stop it happening again.',
    },
    {
      title: 'Systems Snapshot',
      text: "A one-page read on your website, lead handling, follow-up, reviews and automation, plus the one thing we'd fix next.",
    },
    {
      title: '30 days of recrawl monitoring',
      text: 'Plus 14 days of aftercare on everything we touched.',
    },
  ],
  scopeLine:
    'Getting seen again costs less than one of the clients invisibility is already costing you.',
  priceLabel: 'Investment',
  price: '$1,400',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    "Our promise: we apply the fixes fast, then watch Google's recrawl for 30 days. If the blocked pages aren't returning, we keep working at no extra cost until they are.",
  priceAnchor:
    "That's less than one client who couldn't find you. Invisibility charges you every week. This charges you once.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. What you have instead is stronger: if the blocked pages aren't returning through the 30-day watch, we keep working at no extra cost until they are.",
    },
    {
      q: 'How fast do rankings come back?',
      a: 'The fixes go in within three business days. Google then recrawls on its own schedule, usually days to a few weeks, which is exactly why the 30-day watch is included.',
    },
    {
      q: 'Whose fault was this?',
      a: "Usually nobody's. These settings hide behind redesigns and migrations. We fix it without the blame game and show you how to catch it next time.",
    },
    {
      q: "What if it's something bigger than a blocked setting?",
      a: "Then you'll know within the diagnosis. You get a straight answer and a fair path, not a surprise bill.",
    },
    {
      q: 'What do you need from me?',
      a: 'Website admin access and two minutes to approve us in Search Console. The secure form arrives straight after payment.',
    },
    {
      q: 'Is this the same as SEO?',
      a: "It's the floor under SEO. Nothing else you ever spend on marketing works while Google can't see the site.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Three days from now, Google starts seeing you again',
  finalLine:
    "The blocks come off fast. Then you watch your pages walk back into the index, in Google's own records, not our word.",
  proofKind: 'search-fix',
}

export const LANDING_PAGE_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price · Live in two days · Your domain',
  h1Generic: "Your ads are working, the page they land on isn't",
  h1Personal: (b: string) => `${b}, your ads are working, the page they land on isn't`,
  sub: "You pay for every click, and right now those clicks land on a homepage built for everyone, which convinces almost no one. A dedicated page that repeats your ad's exact promise turns the same spend into more enquiries, live within two business days.",
  ctaLabel: 'Build my page · $1,800',
  proofLabel: 'This is you, right now',
  proofHeadingLive: 'This is you, right now',
  proofHeadingGeneric: 'Try it now',
  proofLead: (b: string | null) =>
    b
      ? `${b}'s ads are running this week. The clicks land on your homepage.`
      : "Your ads are running this week. The clicks land on your homepage.",
  proofLeadGeneric:
    'Open one of your own ads and tap it like a customer would. Now count the steps between where you land and the thing the ad promised.',
  proofAfter: 'The Ad Library is public. So is where your clicks go.',
  proofAfterGeneric:
    'The Ad Library is public. So is where your clicks go. If the destination is your homepage, this is the gap.',
  painLabel: 'What this is costing you',
  painHeading: "You're paying twice for every click that leaks",
  painLines: [
    'Every click costs the same whether the page converts it or wastes it.',
    'A visitor who clicked one promise gets shown twelve things, and chooses none.',
    'The platform learns from conversions. A leaking page teaches it nothing, so your ads get more expensive, not smarter.',
    "And next month's campaign starts from the same blind spot, because the data never improved.",
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'One page, one message, one action',
  bridgeBody:
    "This isn't an ads retainer and it isn't a website rebuild. It's one dedicated page for one campaign, written to repeat your ad's promise word for word, built on your own domain in your own brand, live within two business days, with conversion tracking wired in so the platform finally learns what's working.",
  bridgeGaugeCaption:
    'One page. Paid once. Live in two business days, with tracking verified before we call it done.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'The page finishes what the ad started',
      text: 'Same promise, one action, no menus, no exits.',
    },
    {
      title: 'Your ads get smarter',
      text: 'Real conversion signals flow back to the platform, so optimisation runs on data instead of guesses.',
    },
    {
      title: 'You own it outright',
      text: 'Your domain, your brand, yours to keep and reuse for the next campaign.',
    },
    {
      title: 'Live in two business days',
      text: 'Draft in one, live in two, tracking verified with a test conversion before we call it done.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Two days from ad to door',
  processSteps: [
    {
      label: 'Day 1',
      text: 'You send the ad and the offer. We write and build the draft.',
    },
    {
      label: 'Day 2',
      text: 'Live on your domain, tracking verified with a test conversion.',
    },
    {
      label: 'After',
      text: '14 days of aftercare, including one round of copy tweaks after real traffic hits it.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full job, nothing extra to buy',
  stackItems: [
    {
      title: 'One complete campaign landing page',
      text: 'Copy written by us and matched word for word to your ad.',
    },
    {
      title: 'Built on your domain',
      text: 'In your brand, mobile-first and fast.',
    },
    {
      title: 'Conversion tracking connected',
      text: 'Wired to your ad account so the platform can learn.',
    },
    {
      title: 'Campaign pointing note',
      text: 'A plain note on pointing your campaign at it, two minutes of work.',
    },
    {
      title: 'Systems Snapshot',
      text: "The one-page read on your wider systems, plus the one thing we'd fix next.",
    },
    {
      title: '14 days of aftercare',
      text: 'Including one round of copy tweaks after real traffic hits it.',
    },
  ],
  scopeLine: "You're already paying for the clicks. This is the difference between renting them and keeping them.",
  priceLabel: 'Investment',
  price: '$1,800',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    "Our promise: if the page isn't converting the way a matched page should, we keep tuning it at no extra cost until it is.",
  priceAnchor:
    "You're already paying for the clicks. This is the difference between renting them and keeping them.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Is this refundable?',
      a: "No change-of-mind refund, because we start straight away. Instead: if the page isn't converting the way a matched page should, we keep tuning at no extra cost until it is.",
    },
    {
      q: 'Does it go on my website or yours?',
      a: 'Yours. Your domain, your brand, you own it outright.',
    },
    {
      q: 'Do you write the copy?',
      a: "Yes, that's most of the value. You send the ad and the offer, we do the rest.",
    },
    {
      q: 'Do you manage the ads too?',
      a: 'No. This makes the ads you already run work harder. Ad management is a different conversation if you ever want it.',
    },
    {
      q: 'Why not just improve the homepage?',
      a: 'The homepage has to serve everyone who arrives for any reason. A campaign page serves one promise to one visitor. That\'s exactly why it converts.',
    },
    {
      q: 'What do you need from me?',
      a: 'The ad copy, the offer details, your logo, and website access. Five minutes in the secure form.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Two days from now, your clicks land somewhere built to convert them',
  finalLine: 'Same ads, same spend, a destination that matches the promise. The next campaign starts from in front.',
  proofKind: 'landing-page',
}

export const CRM_RESCUE_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price · Working in five days · Your own system',
  h1Generic: 'The enquiry that came through your website this week is still waiting',
  h1Personal: (b: string) => `${b}, we enquired through your website, and no one replied`,
  sub: "That's not an insult, it's the evidence that brought you here, and it's exactly how a real customer experienced your business. Enquiries are arriving. The system catching them is what's broken, and it's fixable in five days.",
  ctaLabel: 'Rescue my leads · $2,800',
  proofLabel: 'This is you, right now',
  proofHeadingLive: 'This is you, right now',
  proofHeadingGeneric: 'Try it now',
  proofLead: (b: string | null) =>
    b
      ? `We sent a genuine enquiry through ${b}'s form. As of this morning, no reply has come back.`
      : 'We sent a genuine enquiry through the form. As of this morning, no reply has come back.',
  proofLeadGeneric:
    'Fill in your own contact form from a personal email and start a timer. However long it takes anyone to reply, that is your real response time, and your customers already know it.',
  proofAfter:
    "We do this politely, one enquiry, withdrawn once you've seen this. Your customers don't withdraw theirs. They just buy elsewhere.",
  proofAfterGeneric:
    "Your customers don't start a timer. They open another tab. Whatever your reply time is, that is the race you're already in.",
  painLabel: 'What this is costing you',
  painHeading: 'Speed decides who wins the job, and silence is a speed',
  painLines: [
    "The first business to reply usually takes the work, while the customer's still sitting at the screen.",
    "Your quotes don't die because of price. They die unfollowed, while someone else's follow-up lands.",
    'Every enquiry you paid to attract is an appointment somebody on the team meant to make.',
    "And to the customer, silence isn't neutral. It's an answer.",
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'One rescue, your existing system, working in five days',
  bridgeBody:
    "This isn't new software to learn or another subscription. We rescue the CRM or lead system you already have, so every enquiry lands somewhere owned, alerts the right phone in seconds, replies to the customer instantly, and chases every quote you send. The missed-call text-back is folded in, the same system we sell on its own. If you truly have nothing, we stand up a free starter CRM as part of the rescue.",
  bridgeGaugeCaption:
    'Enquiry in, alert on the phone, instant reply to the customer, quote follow-up queued. Working within five business days of access.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'Every enquiry answered in seconds',
      text: "The automatic first reply lands while the customer's still on your site, even when the whole team's with clients.",
    },
    {
      title: 'The right phone buzzes instantly',
      text: 'Alerts arrive like text messages. No dashboard to remember to check.',
    },
    {
      title: 'Sent quotes get chased',
      text: 'The follow-up sequence runs itself, because the quote that gets followed up is the quote that gets accepted.',
    },
    {
      title: 'Your team actually uses it',
      text: "Built phone-first and handed over in a 30-minute walkthrough on their own screens. If it needs a manual, we built it wrong.",
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Five days from silence to seconds',
  processSteps: [
    {
      label: 'Days 1 to 3',
      text: 'The build: pipeline, alerts, instant replies, quote follow-up, missed-call text-back.',
    },
    {
      label: 'Days 4 to 5',
      text: 'Live testing, the 30-minute team walkthrough, and the one-page cheat sheet.',
    },
    {
      label: 'Then',
      text: '14 days of us watching it run. We call you once we have what we need from the access form.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full rescue, nothing extra to buy',
  stackItems: [
    {
      title: 'The complete lead-handling rescue',
      text: 'On whatever CRM or lead system you already use. Brand does not matter. Setup does.',
    },
    {
      title: 'Missed-Call Text-Back included',
      text: 'The same product we sell on its own.',
    },
    {
      title: 'Instant alerts, instant first replies, quote follow-up',
      text: 'Automation that runs while the team is busy.',
    },
    {
      title: 'The 30-minute team walkthrough',
      text: 'Plus a one-page cheat sheet.',
    },
    {
      title: 'Systems Snapshot',
      text: "The one-page read on your wider systems, plus the one thing we'd fix next.",
    },
    {
      title: '14 days of aftercare',
      text: 'While it beds in.',
    },
  ],
  scopeLine: "That's about two of the clients silence is already costing you, paid once.",
  priceLabel: 'Investment',
  price: '$2,800',
  priceLead: 'Paid once, and we start. Fill the access form, we audit what you have, then we call you when we have what we need.',
  guarantee:
    "Our promise: if enquiries aren't being caught and chased the way we've described, we keep working at no extra cost until they are.",
  priceAnchor: "That's about two of the clients silence is already costing you, paid once.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'We already have a CRM.',
      a: "Most of our rescues do. The system isn't the problem, the setup is. We rescue what you have before we'd ever suggest replacing it.",
    },
    {
      q: 'Is this refundable?',
      a: "No change-of-mind refund, because we start straight away. Instead: if enquiries aren't caught and chased as described, we keep working free until they are.",
    },
    {
      q: 'Are there ongoing costs?',
      a: "Our fee is once. If you already pay for a CRM, that stays yours. If we stand a free starter CRM up for you because you had nothing, there is no monthly fee from us for the tools.",
    },
    {
      q: 'Will my team actually use it?',
      a: "It's phone-first, the alerts arrive like texts, and the handover happens on their screens. If it needs a manual, we built it wrong.",
    },
    {
      q: 'How long does it take?',
      a: 'Working within five business days of access. Most of that is us, not you.',
    },
    {
      q: 'What happens after I pay?',
      a: 'You fill a short access form about your system and goals. We audit what you sent, then we call you to confirm the start and any missing access. Build days one to three, walkthrough day four or five, then 14 days of us watching it run.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Next week, the enquiry that went unanswered gets answered in seconds',
  finalLine: "Every lead caught, every customer replied to, every quote chased, while you're busy doing the actual work.",
  proofKind: 'crm-rescue',
}

export const TEAM_AI_COPY: FunnelProductCopy = {
  eyebrow: 'Half a day · Your real work · Up to 12 people',
  h1Generic: "Your team's already using AI, just badly, separately, and in secret",
  h1Personal: (b: string) =>
    `${b}, your team's already using AI, just badly, separately, and in secret`,
  sub: 'One person has a trick for quotes. Another pastes client details into a tool nobody approved. Most are watching from the side. Half a day fixes that: shared setup, your actual tasks, working prompts, and rules everyone understands.',
  ctaLabel: 'Book the remote session · $1,950',
  proofLabel: 'Sound familiar',
  proofHeadingLive: 'Three roles in almost every team',
  proofHeadingGeneric: 'Three roles in almost every team',
  proofLead: () =>
    "That's not a talent problem. It's a setup problem, and setup takes an afternoon.",
  proofLeadGeneric:
    "That's not a talent problem. It's a setup problem, and setup takes an afternoon.",
  proofAfter:
    'The gains from AI show up when a whole team works the same way with the same guardrails.',
  proofAfterGeneric:
    'The gains from AI show up when a whole team works the same way with the same guardrails.',
  painLabel: 'What this is costing you',
  painHeading: 'The hours are being saved once, by one person',
  painLines: [
    "Your best experimenter's shortcuts save one salary's worth of time, not eight.",
    'The tools your team already uses in private are exactly the ones nobody checked for client data.',
    'Teams that set this up together this year pull ahead of teams that never make it official.',
    'And the longer it stays unofficial, the harder the habits set around the wrong tools.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Half a day, four blocks, no slideware',
  bridgeBody:
    "This isn't a webinar and it isn't a tool demo. It's a working session run on your business's real tasks, collected in a short form before the day, inside a workspace your business owns when we leave. Remote or face-to-face in Sydney, fixed price, paid once.",
  bridgeGaugeCaption:
    'Shared workspace, working prompts for real tasks, one-page usage policy, 30-day check-in.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'The whole team works like your best experimenter',
      text: 'Shared tools, shared prompts, same guardrails.',
    },
    {
      title: 'Client data stays where it should',
      text: 'The policy spells out what never goes into a prompt, and the workspace makes the safe path the easy path.',
    },
    {
      title: 'The wins compound',
      text: "Prompts live in a shared library your business owns, not in one person's head.",
    },
    {
      title: 'It sticks',
      text: "A 30-day check-in call to tighten what's working and fix what isn't.",
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Before the day, then four blocks',
  processSteps: [
    {
      label: 'Before',
      text: 'A short form on your tools, time-eaters, sensitive data, and a date range at least two weeks out.',
    },
    {
      label: 'Blocks 1 and 2',
      text: 'Foundation and safety rules, then working solutions for three of your most time-hungry tasks.',
    },
    {
      label: 'Blocks 3 and 4',
      text: 'Role prompts saved in a shared library, then the one-page policy and who owns what. 30-day check-in after.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One afternoon, everything included',
  stackItems: [
    {
      title: 'The half-day session',
      text: 'Up to 12 people, on your real work. Remote or face-to-face in Sydney.',
    },
    {
      title: 'The configured AI workspace',
      text: 'Owned by your business when we leave.',
    },
    {
      title: 'Prompt library, recording, usage policy',
      text: 'So the wins do not walk out with one person.',
    },
    {
      title: '30-day check-in call',
      text: 'Tighten what works. Fix what does not.',
    },
    {
      title: 'Systems Snapshot',
      text: "The one-page read on your wider systems, plus the one thing we'd fix next.",
    },
  ],
  scopeLine: 'One afternoon, priced under a week of one salary, for hours back across the whole team.',
  priceLabel: 'Investment',
  price: 'From $1,950',
  priceLead:
    'Remote $1,950 or face-to-face in Sydney $2,400. Paid once. Fill the prep form with a date range at least two weeks out. We confirm a tentative day once we understand your work.',
  guarantee:
    "Our promise: if the team doesn't leave with working prompts and a setup they'll actually use, we come back and run it again at no extra cost.",
  priceAnchor: 'One afternoon, priced under a week of one salary, for hours back across the whole team.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Is this refundable?',
      a: "No change-of-mind refund. Instead: if the team doesn't leave with working prompts and a setup they'll use, we run it again free.",
    },
    {
      q: 'Remote or face-to-face?',
      a: 'Same session either way. Remote is $1,950. Face-to-face in Sydney is $2,400. Pick the button that matches how you want to run it.',
    },
    {
      q: 'How many people can join?',
      a: 'Up to 12 works best, everyone gets hands on keyboards. Bigger teams split into two sessions, quoted fairly.',
    },
    {
      q: 'Which AI tools do you set up?',
      a: "The ones that fit your work and your budget, decided from your prep form. We're not resellers, so there's no commission steering the advice.",
    },
    {
      q: 'What about client data and privacy?',
      a: "That's block one. The usage policy spells out what never goes into a prompt, and the workspace is configured so the safe path is the easy path.",
    },
    {
      q: 'Do people need to be technical?',
      a: 'No. If they can write an email, they can do everything in this session.',
    },
    {
      q: 'What happens after I pay?',
      a: 'You fill a short prep form: team size, tools, time-eaters, sensitive data, and a date range at least two weeks out. We review it, then call you to lock a tentative day.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'One afternoon from now, the whole team works like your best experimenter',
  finalLine: 'Shared setup. Real tasks. Prompts you own. Rules everyone understands.',
  proofKind: 'team-ai',
}

export const CHANGE_PACK_COPY: FunnelProductCopy = {
  eyebrow: 'New system or AI rollout · Built before day one · Fixed once scoped',
  h1Generic: 'The software is ready. The team is not, and a slide deck will not fix that',
  h1Personal: (b: string) =>
    `${b}, the software is ready. The team is not, and a slide deck will not fix that`,
  sub: 'CRM, AI tools, rostering, accounts, anything people have to use differently on Monday. The project plan covers the build. Nobody owns the part where busy people learn the new way of working. That usually becomes one long session half the team misses. We build the training materials before go-live, then check in for 30 days after.',
  ctaLabel: 'Start the scoping form',
  proofLabel: 'Sound familiar',
  proofHeadingLive: "Every rollout's risk register",
  proofHeadingGeneric: "Every rollout's risk register",
  proofLead: () =>
    'Adoption sits on the risk register as High, owner TBC. That row is what this pack fills.',
  proofLeadGeneric:
    'Adoption sits on the risk register as High, owner TBC. That row is what this pack fills.',
  proofAfter:
    'Go-live is a date on a calendar. Getting people to actually use the new system is the work that usually gets skipped.',
  proofAfterGeneric:
    'Go-live is a date on a calendar. Getting people to actually use the new system is the work that usually gets skipped.',
  painLabel: 'What this is costing you',
  painHeading: 'The budget paid for the software. Week two pays for the confusion',
  painLines: [
    'One long training session the week before loses to real jobs. Half the team never sees it.',
    'Week one does not show up as complaints. It shows up as tickets, workarounds, and the old spreadsheet coming back.',
    'Once a workaround sticks, it becomes the real system, whether you bought the new one or not.',
    'The money already spent on the rollout is betting on the one part nobody staffed: people changing how they work.',
  ],
  bridgeLabel: 'What we actually build',
  bridgeHeading: 'A training pack for your system, ready before Monday',
  bridgeBody:
    'We sit with how your new CRM, AI tool, or process actually works, then we produce the materials your people need. Short audio they can play on the way to work, explaining what is changing and why. Short screen videos for each task that changes, so someone can replay how to log a job or raise an invoice. One-page desk sheets for the steps they use every day. One live session after they have tried the tools, for the questions that only appear once they have used them. Then a 30-day call with you: what is sticking, what is not, and what we fix. We are not monitoring your staff, and we are not running an AI chatbot over them. We make the training, hand it over, and follow up once.',
  bridgeGaugeCaption:
    'Audio explainers, screen how-tos, desk sheets, one live Q and A, one 30-day check-in.',
  benefitsLabel: 'What you get',
  benefitsHeading: 'Clear for the company',
  benefits: [
    {
      title: 'Day one has a path, not a guess',
      text: 'Each role gets the exact how-tos for the tasks that changed in your system.',
    },
    {
      title: 'Fewer tickets in week two',
      text: 'Common questions are already answered in a two-minute video or a one-pager.',
    },
    {
      title: 'The pack stays yours',
      text: 'New hires train on the same audio and videos months later. No re-buying a workshop.',
    },
    {
      title: 'Someone owns the people side until day 30',
      text: 'Us. Named. With a check-in after go-live, not a hand-wave at launch.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Form, scope, build, ship, check',
  processSteps: [
    {
      label: 'Form and call',
      text: 'You tell us what system is going live, how many people, and when. Fifteen minutes later you have a fixed price in writing.',
    },
    {
      label: 'We build the materials',
      text: 'Two to three weeks. We write and record the audio, screen how-tos, and desk sheets for your rollout. You review before we lock them.',
    },
    {
      label: 'Ship, then check',
      text: 'The pack goes to your team before go-live. After day one we run one live Q and A. Around day 30 we call you: what stuck, what needs a fix.',
    },
  ],
  stackLabel: 'What is in the pack',
  stackHeading: 'The pieces, in plain English',
  stackItems: [
    {
      title: 'Audio explainers',
      text: 'Commute-length recordings: what is changing, why, and what good looks like. Private to your team.',
    },
    {
      title: 'Screen how-to videos',
      text: 'Two to four minutes each. Click-by-click for every task that changes in the new system.',
    },
    {
      title: 'Desk one-pagers',
      text: 'Printable or PDF sheets for the daily steps. They stay on the desk when the video is forgotten.',
    },
    {
      title: 'One live Q and A',
      text: 'After people have used the tools, not before. We answer what only shows up in real use.',
    },
    {
      title: 'One 30-day check-in',
      text: 'A call with you: adoption, workarounds, and what we patch in the materials.',
    },
    {
      title: 'Systems Snapshot',
      text: 'A one-page read on your wider setup, included with the pack.',
    },
  ],
  scopeLine:
    'Best started two to three weeks before go-live. Later than that, start anyway. A partial pack beats a slide deck.',
  priceLabel: 'Investment',
  price: 'From $6,000',
  priceLead:
    'Fixed once scoped. The form and the call set the system, the headcount, the date, and which pieces you need. You get the number in writing the same day.',
  guarantee:
    'Our promise: the pack ships before your go-live date, complete, or we keep building at no extra cost until it is.',
  priceAnchor: 'Priced against the project it protects, not the hours of recording.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you book',
  faqs: [
    {
      q: 'What systems is this for?',
      a: 'Any go-live where people must work differently: CRM, AI tools, rostering, accounts, ops software, or a merge of two ways of working. If it has a Monday and a confused team, it fits.',
    },
    {
      q: 'Are you watching or scoring our staff?',
      a: 'No. We build training materials and run one check-in with you. We do not monitor individuals or run agents over their day.',
    },
    {
      q: 'When should we start?',
      a: 'Two to three weeks before go-live is ideal. Later than that, start anyway. A partial pack beats a slide deck.',
    },
    {
      q: 'What does the scoping call cost?',
      a: 'Nothing, and you leave with the fixed price in writing whether you go ahead or not.',
    },
    {
      q: 'Our processes are confidential',
      a: "Everything stays access-controlled to your team. We will sign what your legal team needs before we see a document.",
    },
    {
      q: "Does this replace our project team's training?",
      a: 'It arms it. Your project team knows the system. We turn that into materials people finish, plus the follow-through after day one.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Monday arrives, and the how-tos are already in their hands',
  finalLine:
    'Audio, screen videos, desk sheets, one live Q and A, one 30-day check. Built for your system, before go-live.',
  proofKind: 'change-pack',
}

export function funnelCopyForSlug(slug: string | undefined): FunnelProductCopy {
  if (slug === 'missed-call') return MISSED_CALL_COPY
  if (slug === 'google-profile') return GOOGLE_PROFILE_COPY
  if (slug === 'search-fix') return SEARCH_FIX_COPY
  if (slug === 'landing-page') return LANDING_PAGE_COPY
  if (slug === 'crm-rescue') return CRM_RESCUE_COPY
  if (slug === 'team-ai') return TEAM_AI_COPY
  if (slug === 'change-pack') return CHANGE_PACK_COPY
  return SPEED_FIX_COPY
}
