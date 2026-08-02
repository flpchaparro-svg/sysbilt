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
  /** Proof UI: pagespeed dial vs missed-call vs Google profile vs index check vs ad landing vs CRM vs team recognition vs content vs reviews vs AI phone vs booking vs website vs geo vs client-finder */
  proofKind:
    | 'speed'
    | 'missed-call'
    | 'google-profile'
    | 'search-fix'
    | 'landing-page'
    | 'crm-rescue'
    | 'team-ai'
    | 'change-pack'
    | 'content-system'
    | 'reviews'
    | 'ai-phone'
    | 'booking'
    | 'website'
    | 'geo'
    | 'client-finder'
    | 'enquiry-reply'
    | 'profile-posting'
    | 'draft'
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
      a: 'A short access form after payment: how your site is built and how we should get in. About five minutes, plain English.',
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
    "This isn't Google Ads, website SEO, or a monthly posting retainer. It's a complete Google Business Profile overhaul on one location: claim or recover, categories and services filled, description that sells, photos sorted, review link ready. Ownership stays on your account. Two business days from access.",
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
      text: 'Overhaul, review link, hand over the guide and Systems Snapshot.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full job, nothing extra to buy',
  stackItems: [
    {
      title: 'Complete profile overhaul',
      text: 'Claim or recover, categories, services, attributes, description, photos, review link, within two business days of access.',
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

export const CONTENT_SYSTEM_COPY: FunnelProductCopy = {
  eyebrow: 'One hour of your month · Every channel alive · No lock-in',
  h1Generic: "Your last post was months ago, and it's not because you're lazy",
  h1Personal: (b: string) =>
    `${b}, your last post was months ago, and it's not because you're lazy`,
  sub: 'Posting always loses to real work. That is why it stops. You talk for an hour. We turn that into a month of on-brand posts, designed, approved by you, and scheduled. Done.',
  ctaLabel: 'Start the scoping form',
  proofLabel: 'Sound familiar',
  proofHeadingLive: 'Last post',
  proofHeadingGeneric: 'Last post',
  proofLead: () =>
    'To a customer comparing two businesses tonight, a quiet feed reads as a quiet business, fair or not.',
  proofLeadGeneric:
    'To a customer comparing two businesses tonight, a quiet feed reads as a quiet business, fair or not.',
  proofAfter:
    'Your work has not stopped. Your channels have. That gap is what this fixes.',
  proofAfterGeneric:
    'Open your own Instagram the way a stranger would. Check the date on the last post. Then check your busiest competitor.',
  painLabel: 'What this is costing you',
  painHeading: 'They compare feeds before they compare quotes',
  painLines: [
    'Every customer checks you out online before they call. A dead feed answers before you can.',
    'The competitor posting weekly is not better at the work. They are just visible doing it.',
    'DIY content dies the week real work gets busy, and every week real work gets busy.',
    'Generic outsourced content is worse than silence, because it sounds like nobody, especially you.',
  ],
  bridgeLabel: 'What we actually build',
  bridgeHeading: 'One recorded hour becomes a month that sounds like you',
  bridgeBody:
    'This is not a posting service and it is not a content mill. We set your brand and voice first: how you talk, how you look, what you never say. Then every month one recorded conversation becomes posts, carousels, and captions. A human reviews every piece. You approve one batch. We schedule it. You never touch a posting screen.',
  bridgeGaugeCaption:
    'Setup builds the machine. The monthly keeps it running. Pause any time. Leave with 30 days notice. The brand system stays yours.',
  benefitsLabel: 'What you get',
  benefitsHeading: 'Clear for the company',
  benefits: [
    {
      title: 'You look as busy online as you are in real life',
      text: 'Every channel you care about stays alive each week, without you thinking about it.',
    },
    {
      title: 'It sounds like you on your best day',
      text: 'Voice rules from how you actually talk. A human checks every piece before you approve the batch.',
    },
    {
      title: 'One hour is the whole job',
      text: 'You talk about jobs, customer questions, and opinions on your industry. Everything after that is ours.',
    },
    {
      title: 'You see what worked',
      text: 'A plain monthly report: what went out, what landed, what we are doing more of.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Setup builds the machine, the monthly keeps it running',
  processSteps: [
    {
      label: 'Form and call',
      text: 'You tell us your channels, when you last posted, and what you want content to do. Fifteen minutes later you know if it fits.',
    },
    {
      label: 'Weeks 1 to 2, setup',
      text: 'Brand and voice system, the pipeline, your channels connected, and your first month produced.',
    },
    {
      label: 'Every month after',
      text: 'Your recorded hour, then a full month written, designed, approved in one batch, and scheduled. Plus the report.',
    },
  ],
  stackLabel: 'What is included',
  stackHeading: 'The setup builds it, the monthly runs it',
  stackItems: [
    {
      title: 'Setup, $3,400 once',
      text: 'Brand and voice system, the content pipeline, channels connected, first month produced.',
    },
    {
      title: 'Monthly, $1,900',
      text: 'The recorded hour, a month of posts, carousels and captions, human-reviewed, approved by you, scheduled.',
    },
    {
      title: 'Monthly report',
      text: 'What went out, what landed, what we are doing more of. Plain English.',
    },
    {
      title: 'No lock-in',
      text: 'Pause any time. Leave with 30 days notice. The brand system stays yours.',
    },
    {
      title: 'Systems Snapshot',
      text: 'A one-page read on your wider setup, included with the pack.',
    },
  ],
  scopeLine:
    'Best when you can give one honest hour a month. If you cannot, this is not the product yet.',
  priceLabel: 'Investment',
  price: '$3,400 setup, then $1,900 a month',
  priceLead:
    'Most people take the scoping form and the 15-minute call first. If you already know, pay the setup and we book your kickoff recording.',
  guarantee:
    'Our promise: if a month of content does not sound like you, we redo it at no extra cost until it does.',
  priceAnchor: 'One hour of your month, against every customer who checks you out before they call.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you book',
  faqs: [
    {
      q: 'What do you need from me each month?',
      a: 'One recorded hour, talking about jobs, questions customers ask, and opinions on your industry. We handle everything after that.',
    },
    {
      q: 'Will it sound like me?',
      a: 'That is the point of the setup. We build your voice rules from how you actually talk, and a human checks every piece against them before you approve the batch.',
    },
    {
      q: 'Is this AI content?',
      a: 'It is AI-assisted and human-made. The thinking comes from your recorded hour, the drafting is accelerated, the judgement is ours, and the approval is yours. Nothing ships that a machine wrote alone.',
    },
    {
      q: 'Which platforms?',
      a: 'The ones your customers actually use, decided at setup. More channels does not mean better. Consistency does.',
    },
    {
      q: 'Can I pause or leave?',
      a: 'Pause any time. Leave with 30 days notice. The brand system stays yours.',
    },
    {
      q: 'Is the setup refundable?',
      a: 'No change-of-mind refund. Instead: if the first month does not sound like you, we redo it at no extra cost until it does.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Next month, your business looks as busy online as it is in real life',
  finalLine: 'You talk for an hour. Everything else just happens.',
  proofKind: 'content-system',
}

export const REVIEWS_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price · Two to three days · Habit that asks',
  h1Generic:
    'You have fewer reviews than the business ranking above you, and no system closing the gap',
  h1Personal: (b: string) =>
    `${b}, you have fewer reviews than the business ranking above you`,
  sub: 'Star count is the first trust signal before the site loads. We wire an automatic ask after every job, write the wording in your voice, hand over QR and short link, and load response templates for good and bad reviews.',
  ctaLabel: 'Fix my reviews · $1,100',
  proofLabel: 'Sound familiar',
  proofHeadingLive: 'Your reviews vs theirs',
  proofHeadingGeneric: 'Your reviews vs theirs',
  proofLead: (b: string | null) =>
    b
      ? `${b} has the jobs. The listing above you has the review count. Customers pick on that gap before they open your site.`
      : 'You have the jobs. The listing above you has the review count. Customers pick on that gap before they open your site.',
  proofLeadGeneric:
    'Open your Google listing next to the business ranking above you. Count the reviews. That gap is already deciding who gets the call.',
  proofAfter:
    'The work did not stop. The asks did. Happy customers leave quiet unless someone asks at the right moment.',
  proofAfterGeneric:
    'Happy customers leave quiet unless someone asks at the right moment. That moment is right after the job.',
  painLabel: 'What this is costing you',
  painHeading: 'They pick on stars before they pick you',
  painLines: [
    'Google shows review count before your website loads. Fewer stars reads as risk, fair or not.',
    'The competitor above you is not better at the work. They asked more often after jobs.',
    'You meant to ask. The invoice went out, the next job started, and the ask never left your head.',
    'A thin review trail keeps you looking smaller than the jobs you already do.',
  ],
  bridgeLabel: 'What we actually build',
  bridgeHeading: 'Reviews stop being an afterthought',
  bridgeBody:
    'This is not a review farm and it is not a monthly retainer. We wire an automatic ask that fires after every completed job, write the wording in your voice, hand you a QR code and short link for the van and the invoice, and load calm response templates for good and bad reviews. Real customers only. We never post fake reviews.',
  bridgeGaugeCaption:
    'Automatic ask, your wording, QR and short link, reply templates. Live in two to three business days of access.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'Every job gets an ask',
      text: 'The review request fires after the work is done, so happy customers are not left guessing how to leave one.',
    },
    {
      title: 'It sounds like you',
      text: 'We write the SMS or email in your voice. Short, plain, no corporate script.',
    },
    {
      title: 'QR and short link ready',
      text: 'Print it for the van, the desk, or the invoice. One tap to your Google review page.',
    },
    {
      title: 'You know what to say back',
      text: 'Templates for good reviews and for the ones that sting, so replies do not sit in drafts.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Two to three days, then the habit asks for you',
  processSteps: [
    {
      label: 'Day 1',
      text: 'Access, your Google listing, and how jobs get marked complete.',
    },
    {
      label: 'Day 2',
      text: 'Wire the ask, write the wording, build the QR and short link, load the reply templates.',
    },
    {
      label: 'Day 3',
      text: 'Test with you, hand over, and leave the habit running. Many setups finish on day two.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full job, nothing extra to buy',
  stackItems: [
    {
      title: 'Automatic review ask',
      text: 'Fires after every completed job on the path you already use.',
    },
    {
      title: 'Wording in your voice',
      text: 'SMS and email copy that sounds like you, not a template farm.',
    },
    {
      title: 'QR code and short link',
      text: 'For the van, the counter, and the invoice footer.',
    },
    {
      title: 'Good and bad reply templates',
      text: 'Calm responses you can send without staring at a blank box.',
    },
    {
      title: 'Systems Snapshot',
      text: 'A one-page read on your wider setup, included with the pack.',
    },
    {
      title: '14 days of aftercare',
      text: 'If anything we touched misbehaves, we sort it, no charge.',
    },
  ],
  scopeLine:
    'Real customers only. We never post fake reviews, buy stars, or game Google. The engine asks. Your customers decide.',
  priceLabel: 'Investment',
  price: '$1,100',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the ask, the wording, the QR, and the templates are live within three business days of access, or we keep working at no extra cost until they are. Real customers only. We never post fake reviews.',
  priceAnchor:
    'That is about one job a thin review trail costs you when someone picks the listing with more stars.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Do you post reviews for us?',
      a: 'No. We never post fake reviews, buy stars, or write reviews pretending to be customers. We build the ask. Real people leave real reviews.',
    },
    {
      q: 'Is this refundable?',
      a: 'There is no change-of-mind refund, because we start straight away. What you have instead: the ask, wording, QR, and templates go live within three business days of access, or we keep working at no extra cost until they do.',
    },
    {
      q: 'What if I already ask sometimes?',
      a: 'Sometimes is the problem. This makes the ask automatic after every job, so it does not depend on remembering at 6pm.',
    },
    {
      q: 'Are there ongoing costs?',
      a: 'Our fee is once. SMS or email costs sit on whatever account you already use, usually a few cents per ask.',
    },
    {
      q: 'How long does it take?',
      a: 'Two to three business days from access. Many setups finish on day two once we can reach your listing and job flow.',
    },
    {
      q: 'What do you need from me?',
      a: 'Access to your Google Business Profile, how you mark jobs complete, and a few minutes on the access form after payment.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Next finished job, the ask goes out without you thinking about it',
  finalLine:
    'Pay once, complete the short access form, and we hand over the ask, the QR, and the reply templates in two to three days.',
  proofKind: 'reviews',
}

export const AI_PHONE_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price setup · Their account · Voice that books',
  h1Generic: 'After hours and mid-job, the call still gets answered',
  h1Personal: (b: string) =>
    `${b}, after hours and mid-job, the call still gets answered`,
  sub: "We do not sell you a monthly receptionist. We set up a voice agent on your own vendor account, load your knowledge, wire calendar and CRM, tune the voice, test live with you listening, and hand over the keys. You pay the vendor's monthly fee directly.",
  ctaLabel: 'Set up my AI phone · $1,950',
  proofLabel: 'The leak',
  proofHeadingLive: 'They called after hours, and voicemail was the whole answer',
  proofHeadingGeneric: 'They called after hours, and voicemail was the whole answer',
  proofLead: (b: string | null) =>
    b
      ? `Someone rings ${b} ready to book. You're on a job, or it's after hours. The call hits voicemail or rings out. No answers, no booking, nothing to hold them.`
      : "Someone rings ready to book. You're on a job, or it's after hours. The call hits voicemail or rings out. No answers, no booking, nothing to hold them.",
  proofLeadGeneric:
    "Someone rings ready to book. You're on a job, or it's after hours. The call hits voicemail or rings out. No answers, no booking, nothing to hold them.",
  proofAfter:
    "A text can hold the lead. A voice agent answers, books, and hands off. Voicemail does neither. That's the gap this setup closes.",
  proofAfterGeneric:
    "A text can hold the lead. A voice agent answers, books, and hands off. Voicemail does neither. That's the gap this setup closes.",
  painLabel: 'What this is costing you',
  painHeading: "You're losing callers who were ready to book",
  painLines: [
    'After hours and mid-job, the phone still rings. Voicemail or ring-out is what they get.',
    "They don't leave a message. They call the next business that picks up.",
    'Missed-Call Text-Back holds them with a reply. This goes further: it answers, books, and hands off cleanly.',
    'Every silent miss is a job you paid to attract, then gave away.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'One setup on your account, live-tested, then yours',
  bridgeBody:
    "This isn't a monthly AI receptionist from us, and it isn't a twelve month retainer. It's a voice agent set up on your own vendor account (Synthflow, Vapi, or the same class), loaded with your knowledge, wired to calendar and CRM, tuned, tested live with you listening, then handed over. You pay the vendor's monthly fee directly. No surprise invoice from us in month four.",
  bridgeGaugeCaption:
    "When we're done, we place a live test call with you on the line. You hear it answer, book, and hand off. Then we leave you the runbook and the keys.",
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'The call gets answered',
      text: 'After hours and mid-job, a voice agent picks up in your name, so the caller is not left with silence or a dead voicemail.',
    },
    {
      title: 'It books, then hands off',
      text: 'Common questions get answered. Ready callers get a booking. Anything that needs a human gets a clean handoff, not a dead end.',
    },
    {
      title: 'You own the account',
      text: 'We set it up on your vendor login. You keep the agent, the knowledge, and the bill with them. We are not your middle-man subscription.',
    },
    {
      title: 'A few business days',
      text: 'From the moment we have access and your knowledge pack. We test live with you before we call it done.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'A few business days, then you hear it live',
  processSteps: [
    {
      label: 'Day 1',
      text: 'Access, vendor account, and the knowledge we need: hours, services, FAQs, booking rules.',
    },
    {
      label: 'Day 2',
      text: 'Build the agent, wire calendar and CRM, tune the voice and the handoff paths.',
    },
    {
      label: 'Day 3+',
      text: 'Live test call with you listening, refine, then hand over the runbook and keys.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full setup, nothing extra from us',
  stackItems: [
    {
      title: 'Voice agent setup on your account',
      text: 'Built on your Synthflow, Vapi, or equivalent vendor login, not locked inside ours.',
    },
    {
      title: 'Knowledge load',
      text: 'Hours, services, FAQs, tone, and booking rules so it sounds like your business.',
    },
    {
      title: 'Calendar and CRM wiring',
      text: 'Bookings land where you already work. Handoffs reach the right phone or inbox.',
    },
    {
      title: 'Live proof and runbook',
      text: 'A test call with you listening, plus plain steps so your team can adjust later.',
    },
    {
      title: '14 days of aftercare',
      text: 'If anything we set up misbehaves, we sort it, no charge.',
    },
  ],
  scopeLine:
    'One Australian business number and one voice agent on your vendor account. Complex multi-site or call-centre stacks get a same-day quote so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$1,950',
  priceLead: 'Paid once for setup, and we start. No quotes, no meetings, no scope creep from us.',
  guarantee:
    "Our promise: we prove the agent on a live test call with you listening before we hand it over. If it doesn't answer and book as scoped, we keep working at no extra cost until it does.",
  priceAnchor:
    "One-time setup, not another endless SaaS bill from us. You pay the vendor about $50 to $200 a month directly for the voice platform, the same way Missed-Call Text-Back leaves SMS costs on your messaging account. This charges you once for the build.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Is this a monthly receptionist from SYSBILT?',
      a: 'No. We sell the setup. The voice agent lives on your vendor account. You own it. We are not billing you every month to be your AI receptionist.',
    },
    {
      q: 'Are there ongoing costs?',
      a: "Our fee is once. The vendor's voice platform usually runs about $50 to $200 a month, paid by you directly to them. Usage can sit on top of that, depending on call volume. Same idea as Missed-Call Text-Back: we wire it, you pay the carrier or messaging fees.",
    },
    {
      q: 'How is this different from Missed-Call Text-Back?',
      a: 'Missed-Call Text-Back ($750) sends a text when the call is missed, so the lead stays warm. AI Phone Setup answers the call, handles questions, books, and hands off. Text holds. Voice closes more of the loop.',
    },
    {
      q: 'What do you load into the agent?',
      a: 'Your hours, services, FAQs, tone, booking rules, and when to hand to a human. We work from what you already tell customers, not a generic script.',
    },
    {
      q: 'How do you prove it works?',
      a: 'We place a live test call with you listening before we hand it over. You hear it answer, book, and hand off. If it fails that test, we keep working at no extra cost until it passes.',
    },
    {
      q: 'How long does it take?',
      a: 'A few business days from access and a usable knowledge pack. Complex calendars or CRM wiring can add a day. We never leave you guessing where it sits.',
    },
    {
      q: 'What do you need from me?',
      a: 'A vendor account (or we help you open one), your business number, calendar access, CRM or lead inbox if you have one, and the FAQs and booking rules. The access form after payment lists it in plain English.',
    },
    {
      q: 'Is this refundable?',
      a: "There is no change-of-mind refund, because we start straight away. What you have instead is stronger: live proof with you listening before handover. If the scoped answer-and-book path doesn't work, we keep fixing it at no extra cost.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Next after-hours call, someone answers in your name',
  finalLine:
    'Pay once for setup, complete the short access form, and we prove the agent on a live test call before we hand over the keys.',
  proofKind: 'ai-phone',
}


export const BOOKING_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price · Two to three days · Book now that sticks',
  h1Generic: 'Customers who want you right now still have to call and hope',
  h1Personal: (b: string) =>
    `${b}, customers who want you right now still have to call and hope`,
  sub: 'Phone tag, email chains, and DMs are how appointments still get made. No Book now on the site or Google panel. No-shows pile up because nothing reminds them. We wire online booking to your real calendar, with confirmations, reminders, and a no-show text sequence, then put Book now where people already look.',
  ctaLabel: 'Fix my booking · $1,500',
  proofLabel: 'This is you, right now',
  proofHeadingLive: 'This is you, right now',
  proofHeadingGeneric: 'Try it now',
  proofLead: (b: string | null) =>
    b
      ? `We looked for Book now on ${b}'s site and Google panel. It isn't there, or it doesn't land on a real calendar.`
      : 'Open your own site and your Google panel. Look for Book now. If you cannot tap it and pick a time, that is the leak.',
  proofLeadGeneric:
    'Open your own site and your Google panel. Look for Book now. If you cannot tap it and pick a time, that is the leak.',
  proofAfter:
    'Ready customers do not wait for a callback. They book the business that lets them finish in one tap.',
  proofAfterGeneric:
    'Ready customers do not wait for a callback. They book the business that lets them finish in one tap.',
  painLabel: 'What this is costing you',
  painHeading: 'Every no-show and every phone-tag loop is money you already paid to attract',
  painLines: [
    'A no-show is not just an empty slot. It is the ad, the enquiry, and the hour you held that never turned into work.',
    'Phone tag and DM chase feel free until you count the hours and the warm leads who booked elsewhere while you were busy.',
    'The competitor with Book now on the site and Google panel takes the person who was ready tonight.',
    'Run the numbers below on one lost booking or one empty hour. That is the cost of leaving booking on hope.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Online booking on the calendar you already use, live in two to three days',
  bridgeBody:
    'This is not a new software religion. We set up HubSpot Meetings, Calendly, or whatever booking tool you already have, wired to your real calendar. Confirmations go out. Reminders go out. A no-show text sequence follows empty slots. Book now lands on your site and your Google profile so the ready customer finishes without calling.',
  bridgeGaugeCaption:
    'Book now on site and Google. Slot chosen. Confirmation and reminder texts. Empty slots chased. Working within two to three business days of access.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'They book while intent is hot',
      text: 'One tap on the site or Google panel. Real availability. No waiting for you to reply.',
    },
    {
      title: 'Your calendar stays the source of truth',
      text: 'Bookings write into the calendar you already live in. No double-entry, no mystery spreadsheet.',
    },
    {
      title: 'Fewer empty chairs',
      text: 'Confirmations and reminders cut the quiet no-shows. An empty slot triggers a plain text sequence.',
    },
    {
      title: 'Done in two to three business days',
      text: 'From the moment we have access. You keep the tool. We leave the setup working.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Two to three days, then Book now is live',
  processSteps: [
    {
      label: 'Day 1',
      text: 'Access, calendar rules, and the booking tool you already have or the lightest fit we agree on.',
    },
    {
      label: 'Day 2',
      text: 'Confirmations, reminders, no-show texts, and Book now on the site plus Google profile.',
    },
    {
      label: 'Day 3 if needed',
      text: 'Live test a real booking with you, tune the copy, and hand over how to change hours.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full booking setup, nothing extra to buy',
  stackItems: [
    {
      title: 'Booking tool wired to your calendar',
      text: 'HubSpot Meetings, Calendly, or what you already pay for. Plain English setup, not a sales pitch for software.',
    },
    {
      title: 'Confirmations, reminders, no-show sequence',
      text: 'Texts and emails that fire when someone books, before they arrive, and when a slot goes empty.',
    },
    {
      title: 'Book now on site and Google',
      text: 'The button where ready customers already look.',
    },
    {
      title: 'Systems Snapshot',
      text: "A one-page read on your wider setup, plus the one thing we'd fix next.",
    },
    {
      title: '14 days of aftercare',
      text: 'If booking misbehaves after handoff, we sort it, no charge.',
    },
  ],
  scopeLine:
    'One business, one primary calendar, one booking flow. Extra locations or staff calendars get a same-day quote so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: '$1,500',
  priceLead: 'Paid once, and we start. No quotes, no meetings about meetings.',
  guarantee:
    "Our promise: if Book now is not live on the agreed surfaces and bookings are not landing on your calendar as described, we keep working at no extra cost until they are.",
  priceAnchor:
    "That's about one recovered booking or one empty hour you stop eating. The leak charges you every week. This charges you once.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Which booking tool do you use?',
      a: 'Whatever you already have, if it can sync a real calendar. HubSpot Meetings and Calendly are common. If you have nothing, we pick the lightest option that fits and explain the monthly cost in plain English before we lock it in.',
    },
    {
      q: 'Will it sync with my calendar?',
      a: 'Yes. Availability comes from your real calendar, and new bookings write back into it. That is the whole point.',
    },
    {
      q: 'Do reminders actually go out?',
      a: 'Confirmations when they book, reminders before the appointment, and a text sequence when a slot goes empty. You approve the wording before it goes live.',
    },
    {
      q: 'Can Book now sit on my Google profile too?',
      a: 'Yes. Site and Google Business Profile are both in scope when you have access to the listing.',
    },
    {
      q: 'What do you need from me?',
      a: 'A short access form after payment: calendar access, the booking tool if you have one, site and Google login paths, and your usual hours. About ten minutes. Most of the build is us.',
    },
    {
      q: 'Is this refundable?',
      a: 'No change-of-mind refund, because we start straight away. Instead: if Book now is not live and bookings are not landing as described, we keep working free until they are.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Two to three days from now, ready customers book without calling',
  finalLine:
    'Book now on the site and Google. Confirmations and reminders on. Empty slots chased. Your calendar stays the truth.',
  proofKind: 'booking',
}

export const WEBSITE_COPY: FunnelProductCopy = {
  eyebrow: 'Built by us · Hosted by us · About 14 days to live',
  h1Generic: 'A website that looks like your business, without the five thousand dollar headache',
  h1Personal: (b: string) =>
    `${b}, a website that looks like your business, without the five thousand dollar headache`,
  sub: 'If your site is missing, broken, or quietly embarrassing, the people who find you online just leave. We interview you, write it, build it, host it, and keep it running. You never touch a password, a plugin, or a design argument.',
  ctaLabel: 'Start my site · from $120',
  proofLabel: 'The evidence',
  proofHeadingLive: 'This is you, right now',
  proofHeadingGeneric: 'This is you, right now',
  proofLead: (b: string | null) =>
    b
      ? `They saw ${b} on Maps, on social, or a mate mentioned you. They went looking for a proper website, and what they got was nothing, or an old page, or something that did not look like a serious business.`
      : 'They saw you on Maps, on social, or a mate mentioned you. They went looking for a proper website, and what they got was nothing, or an old page, or something that did not look like a serious business.',
  proofLeadGeneric:
    'They saw you on Maps, on social, or a mate mentioned you. They went looking for a proper website, and what they got was nothing, or an old page, or something that did not look like a serious business.',
  proofAfter:
    'So they went back to the results and picked someone else. That is not a branding debate. That is work you had already won, handed away at the last step.',
  proofAfterGeneric:
    'So they went back to the results and picked someone else. That is not a branding debate. That is work you had already won, handed away at the last step.',
  painLabel: 'What this is costing you',
  painHeading: "You're paying for the front door either way",
  painLines: [
    'Word of mouth, Maps, ads, listings: every one of them ends at the same door, and right now that door does not open.',
    "You're already paying for hosting and a domain. You're paying to keep a room nobody can walk into.",
    "A stranger decides in seconds whether you look like a business that's still going. Nothing on your site is arguing your case.",
    'And the rebuild quotes come back at thousands, so it stays on the list, and another year goes past.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'We build the front door, you stay on one monthly plan',
  bridgeBody:
    "This isn't a DIY kit and it isn't a six month agency project. You fill in a form, we run a short interview, we research what your customers need to see, then we write and build a professional site on our hosting. The contact form emails you. The search basics are set so you can be found. Privacy and terms come with the plan when it needs them.",
  bridgeGaugeCaption:
    'Three sizes. Same care model. Pick by how much room you need.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'No design spiral',
      text: 'We ask what you do, who you serve, and what has to be on the page. Then we build. You are not choosing fonts for a month.',
    },
    {
      title: "It looks like a business that's still going",
      text: 'Clean, fast on phones, and clear enough that a stranger trusts you enough to enquire.',
    },
    {
      title: 'The boring tech is ours',
      text: "Hosting for your new site, security, the domain pointing and the search basics all sit with us. Your old hosting account stays yours to close, and we'll tell you when.",
    },
    {
      title: 'Enquiries land somewhere real',
      text: 'The contact form emails you. That is the minimum. Without it a website is a poster on a wall.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Form, interview, then we build',
  processSteps: [
    {
      label: 'Form and interview',
      text: 'You send the logo, photos, hours, and services. We ask the short questions that matter, so the site matches how you actually work.',
    },
    {
      label: 'Research and build',
      text: 'We check how you show up today and what your customers need to see. We write the copy and build the site on our hosting. Typical turnaround is about fourteen days from a complete brief.',
    },
    {
      label: 'Live on Care',
      text: "Your domain points to us and your site goes live. That day monthly autopay begins on the card you used to start. We'll tell you when it's safe to cancel your old hosting. Light updates stay inside the plan. Twelve month minimum from go-live, then month to month.",
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Three sizes, one care model',
  stackItems: [
    {
      title: 'Brochure · $120/mo · today $120',
      text: 'One strong page: who you are, what you do, hours, map, and a contact form to your email. Search basics set up. Privacy and terms when the plan needs them.',
    },
    {
      title: 'Practice · $160/mo · today $160',
      text: 'Five to seven pages: room for services, about, and proof, plus the same form, hosting and care. Privacy and terms included. The sweet spot for most growing businesses.',
    },
    {
      title: 'Full site · $190/mo · today $190',
      text: 'Nine to twelve pages when you need more room to explain the work. Same form, hosting, and care.',
    },
    {
      title: 'What else later',
      text: "When the front door works, you can grow into booking, follow-up, reviews and content. Ask when you're ready. It is not part of day one and we will never push it on you.",
    },
  ],
  scopeLine:
    'Twelve month minimum term from the day your site goes live, then month to month. Page count, form and care inclusions are written down before we build. Extra work is quoted, never assumed. Leave early and you pay the remaining months of the term. The site is yours to take: migration to your own hosting is a separate one-off fee quoted at the time.',
  priceLabel: 'Investment',
  price: 'From $120 a month · pay $120 today to start',
  priceLead:
    'Brochure $120/mo. Practice $160/mo. Full site $190/mo. Today you pay one month to start the build. When your site goes live, monthly autopay begins on that same amount. The twelve month term starts at go-live, not the day you pay to begin.',
  guarantee:
    'Page count, form and care inclusions are written down before we build. Extra work is quoted, never assumed. If what we agreed is not delivered as scoped, we keep working at no extra cost until it is.',
  priceAnchor:
    "You're buying a professional front door and someone else holding the technical end, not a five thousand dollar science project.",
  faqLabel: 'Straight answers',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Is there a lock-in?',
      a: 'Twelve months minimum from the day your site goes live, then it continues month to month. We say that plainly because the plan covers a full build up front, and the term is what makes the monthly price possible. After the first year, any price change follows the market rate written in your agreement, not a surprise jump.',
    },
    {
      q: 'What happens if I leave?',
      a: 'If you leave before the twelve months are up, you pay the remaining months of the term as a single amount. Your domain and content stay yours. If you also want to keep the site on your own hosting, migration is a one-off fee quoted before you commit.',
    },
    {
      q: 'What do I pay today?',
      a: 'One month of your plan: $120, $160, or $190. That starts the build. It is not a double start fee.',
    },
    {
      q: 'When does the monthly start?',
      a: 'The day your site goes live, not the day you pay to begin. That is when monthly autopay begins on the card you used at checkout.',
    },
    {
      q: 'What about my current hosting?',
      a: "That stays yours to cancel, and we'll tell you exactly when it's safe. We host the new site, we point your domain at it, and we never touch or cancel anything on your account.",
    },
    {
      q: 'Do I have to write the website?',
      a: "No. That's the part most people stall on, so it's ours. You talk for about twenty minutes about the work you do, we record the call with your say-so, and we write from that.",
    },
    {
      q: 'Where do enquiries go?',
      a: "Straight to your email, the moment someone hits send. If you'd rather they landed in a system that alerts your phone and chases the quote, that's a later conversation, not a day one requirement.",
    },
    {
      q: 'Do I manage hosting and passwords?',
      a: "No. Hosting for your new site, security, the domain pointing and the search basics sit with us. That's the whole point of the plan.",
    },
    {
      q: 'Is this a five thousand dollar agency rebuild?',
      a: "No, and it isn't trying to be. It's a professional front door that takes enquiries, built fast, kept running. If you ever need the bigger project, you'll know, and by then you'll have something working in the meantime.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'A website that looks like you, without the headache',
  finalLine:
    'We interview, research, build, and host. You get a front door that opens and a form that emails you.',
  proofKind: 'website',
}

export const GEO_COPY: FunnelProductCopy = {
  eyebrow: 'AI answers · Citations · Coming soon',
  h1Generic:
    'Your competitors are starting to show up in AI answers. You are still only fighting for the old search page',
  h1Personal: (b: string) =>
    `${b}, your competitors are starting to show up in AI answers. You are still only fighting for the old search page`,
  sub: "People ask ChatGPT, Perplexity, and Google's AI answers what to buy and who to call. If your pages are thin, messy, or hard to cite, those tools skip you. We structure facts, FAQs, and service pages so AI tools can name you. Not magic. Not fake reviews. Coming soon.",
  ctaLabel: 'Coming soon',
  proofLabel: 'The shift',
  proofHeadingLive: 'Ten blue links are not the whole game anymore',
  proofHeadingGeneric: 'Ten blue links are not the whole game anymore',
  proofLead: (b: string | null) =>
    b
      ? `Someone asks an AI tool who to hire for what ${b} does. If your facts are buried or vague, the answer names someone else.`
      : 'Someone asks an AI tool who to hire for what you do. If your facts are buried or vague, the answer names someone else.',
  proofLeadGeneric:
    'Someone asks an AI tool who to hire for what you do. If your facts are buried or vague, the answer names someone else.',
  proofAfter:
    'Clear service pages, FAQ schema, and facts written so machines can cite them. That is the work. Guarantees of "rank in ChatGPT" are not.',
  proofAfterGeneric:
    'Clear service pages, FAQ schema, and facts written so machines can cite them. That is the work. Guarantees of "rank in ChatGPT" are not.',
  painLabel: 'What this is costing you',
  painHeading: "You're invisible in the answers people trust next",
  painLines: [
    'Buyers still search, but more of them also ask an AI tool before they call.',
    'If competitors have clearer pages and cleaner facts, those tools cite them, not you.',
    'Classic search work still matters. Alone, it does not cover this new layer.',
    'Every week you wait, someone else becomes the default name in the answer.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Structure the site so AI tools can cite you',
  bridgeBody:
    "This isn't a promise that ChatGPT will pick you every time, and it isn't fake reviews or spam. It's practical work: clear service pages, FAQ schema (structured Q&A markup search and AI tools can read), and facts written so generative answers have something solid to quote. It sits beside Search Visibility Fix and Content System when you need those, and it can stand alone when your index and content are already fine. Coming soon.",
  bridgeGaugeCaption:
    'Facts machines can cite. Pages humans still read. No magic ranking guarantee, no review games.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'You have a shot in AI answers',
      text: 'Clear facts and service pages give ChatGPT, Perplexity, and Google AI something real to cite.',
    },
    {
      title: 'FAQ schema that earns its place',
      text: 'Structured Q&A markup so tools can read the questions you already answer for customers.',
    },
    {
      title: 'Honest scope',
      text: 'We say what we will change and what we will not promise. No fake citations, no review farms.',
    },
    {
      title: 'Works with what you already bought',
      text: 'Pairs with Search Visibility Fix and Content System when you need them. Does not require them if those jobs are already done.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Audit the citeable surface, then fix it',
  processSteps: [
    {
      label: 'Map',
      text: 'Which services, facts, and FAQs should AI tools be able to quote. Where the page is thin or conflicting.',
    },
    {
      label: 'Structure',
      text: 'Service pages, FAQ schema, and plain facts cleaned so humans and machines both get a straight answer.',
    },
    {
      label: 'Check',
      text: 'We re-read the pages the way a tool would: clear entities, clear offers, no buried essentials.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One scoped job, fixed once agreed',
  stackItems: [
    {
      title: 'Citeable service pages',
      text: 'Clear offers, who you serve, and what you do, written so AI tools have something solid to quote.',
    },
    {
      title: 'FAQ schema where it helps',
      text: 'Structured Q&A markup on the questions customers already ask, not keyword stuffing.',
    },
    {
      title: 'Fact cleanup',
      text: 'Hours, locations, services, and claims aligned so the site does not contradict itself.',
    },
    {
      title: 'Plain handoff',
      text: 'What we changed, why it matters for AI answers, and what to keep consistent when you edit later.',
    },
  ],
  scopeLine:
    'Coming soon. Fixed once scoped from $2,200. We do not sell fake reviews, bought citations, or guaranteed placement inside any AI product.',
  priceLabel: 'Investment',
  price: 'From $2,200',
  priceLead:
    'Placeholder band. Fixed once scoped. This offer is coming soon, not for sale today.',
  guarantee:
    'When this goes live: we deliver the scoped page and schema work. We do not guarantee that any AI product will cite you on a given day. If the agreed structural work is not delivered, we keep working at no extra cost until it is.',
  priceAnchor:
    'About the cost of staying invisible while competitors become the default name in AI answers.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you waitlist',
  faqs: [
    {
      q: 'Is this SEO?',
      a: 'It overlaps. Classic search still cares about clear pages and indexation. This job focuses on making your facts easy for generative tools to cite, not only ranking in ten blue links.',
    },
    {
      q: 'Do I need Search Visibility Fix first?',
      a: 'Only if Google cannot see your pages. Search Visibility Fix ($1,400) is the rescue when indexation is broken. GEO assumes the site can be found, then makes it citeable. We will tell you if the rescue should come first.',
    },
    {
      q: 'Do I need the Content System?',
      a: 'Not required. Content System helps you publish steady, useful pages over time. GEO can stand on the pages you already have, or sit beside a content plan if you want both.',
    },
    {
      q: 'Can you guarantee ChatGPT will name us?',
      a: 'No. Anyone who guarantees placement in an AI answer is selling you hope. We do the structural work that makes citation possible. The tools decide.',
    },
    {
      q: 'Is this fake reviews or spam?',
      a: 'No. We never post fake reviews, buy stars, or invent citations. Clear facts only.',
    },
    {
      q: 'Can I buy this today?',
      a: 'Not yet. This page is the coming-soon brief. When it opens, we scope the pages and schema work, lock the price from $2,200, and build from there.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Show up in the answers, not only the old results list',
  finalLine:
    'Structure the facts. Add FAQ schema where it helps. Stay honest about what AI tools decide. Coming soon.',
  proofKind: 'geo',
}

export const CLIENT_FINDER_COPY: FunnelProductCopy = {
  eyebrow: 'Curated list · Scripts · Plan · Coming soon',
  h1Generic:
    'Knowing who to call is half the work. Most teams skip straight to hoping',
  h1Personal: (b: string) =>
    `${b}, knowing who to call is half the work. Most teams skip straight to hoping`,
  sub: 'A one-time sprint: we lock who you should chase, hand you 50 to 100 named prospects that fit, write how to approach them, and leave a simple execution plan plus a short automation sketch. Not endless spam from us. Not a lead-gen retainer dressed up as a list. Coming soon.',
  ctaLabel: 'Coming soon',
  proofLabel: 'The gap',
  proofHeadingLive: 'Hope is not a prospecting system',
  proofHeadingGeneric: 'Hope is not a prospecting system',
  proofLead: (b: string | null) =>
    b
      ? `${b}'s team knows the work is good. The open question is who to call this month, and what to say without sounding like a bot.`
      : 'Your team knows the work is good. The open question is who to call this month, and what to say without sounding like a bot.',
  proofLeadGeneric:
    'Your team knows the work is good. The open question is who to call this month, and what to say without sounding like a bot.',
  proofAfter:
    'ICP locked. Named list. Scripts. Calendar or booking path. A sketch of automation you can run yourself or ask us to build later.',
  proofAfterGeneric:
    'ICP locked. Named list. Scripts. Calendar or booking path. A sketch of automation you can run yourself or ask us to build later.',
  painLabel: 'What this is costing you',
  painHeading: "You're busy, and the pipeline still depends on luck",
  painLines: [
    'Referrals are great until a quiet month arrives and nobody knows who to ring.',
    'Bought lists and spray outreach burn trust and often break the rules.',
    'Endless "lead gen" retainers sell activity. You still do not know who actually fits.',
    'Without a short list and a script, the team defaults to hoping the phone rings.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'One sprint: list, scripts, and a plan you can run',
  bridgeBody:
    "This isn't SYSBILT sending cold spam on your behalf, and it isn't a promise of booked appointments. It's a one-time sprint: lock your ICP (ideal customer profile: who is worth chasing), curate 50 to 100 named prospects that fit, write approach scripts, map a calendar or booking path, and leave a short automation sketch you can run or ask us to build later. Coming soon.",
  bridgeGaugeCaption:
    'Named prospects. Honest scripts. A plan you own. No guaranteed meetings. No illegal scraping promises.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'You know who to call',
      text: '50 to 100 named prospects that match the ICP we locked with you, not a scraped dump.',
    },
    {
      title: 'You know what to say',
      text: 'Approach scripts your team can use without sounding like a bulk sequence.',
    },
    {
      title: 'A path to a booking',
      text: 'How the reply turns into a calendar slot or booking link, so warm interest does not die in the inbox.',
    },
    {
      title: 'A sketch, not a trap',
      text: 'A short automation outline you can run yourself or ask us to build later. The sprint stands alone.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'One sprint, then the list is yours',
  processSteps: [
    {
      label: 'ICP',
      text: 'Lock who fits: industry, size, geography, and the pain you actually solve.',
    },
    {
      label: 'List and scripts',
      text: 'Curate 50 to 100 named prospects, plus approach wording your team can send or say.',
    },
    {
      label: 'Plan',
      text: 'Execution order, booking path, and a short automation sketch for later if you want it.',
    },
  ],
  stackLabel: 'What you get',
  stackHeading: 'One-time sprint, not a forever spam machine',
  stackItems: [
    {
      title: 'ICP locked',
      text: 'A plain definition of who is worth chasing, so the list stays honest.',
    },
    {
      title: '50 to 100 named prospects',
      text: 'People and companies that fit. Curated. Not a promise that every row will take a meeting.',
    },
    {
      title: 'Approach scripts',
      text: 'What to say in the first touch and the follow-up, in your voice.',
    },
    {
      title: 'Execution plan and booking path',
      text: 'Order of outreach, and how replies land on a calendar or booking link.',
    },
    {
      title: 'Automation sketch',
      text: 'A short outline you can run yourselves or ask us to build later. Not included as ongoing spam from SYSBILT.',
    },
  ],
  scopeLine:
    'Coming soon. One-time sprint from $2,800. We do not guarantee appointments, promise illegal scraping, or sell SYSBILT cold-spamming on your behalf as the product.',
  priceLabel: 'Investment',
  price: 'From $2,800',
  priceLead:
    'One-time sprint. Fixed once scoped. This offer is coming soon, not for sale today.',
  guarantee:
    'When this goes live: we deliver the scoped ICP, list, scripts, and plan. We do not guarantee meetings booked. If the agreed deliverables are not handed over as scoped, we keep working at no extra cost until they are.',
  priceAnchor:
    'About the cost of another quiet month spent hoping the right people call you first.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you waitlist',
  faqs: [
    {
      q: 'Do you guarantee appointments?',
      a: 'No. We hand you who to contact and how. Whether they book depends on your offer, timing, and follow-through. Anyone selling guaranteed meetings from a list is overselling.',
    },
    {
      q: 'Will SYSBILT send the outreach for us?',
      a: 'Not as this product. This sprint leaves you the list, scripts, and plan. If you later want us to build automation, that is a separate build, not cold spam sold as the core offer.',
    },
    {
      q: 'Is this illegal scraping?',
      a: 'No. We do not promise illegal scraping or shady data buys. Sources stay within ordinary, lawful research and the tools you already have a right to use.',
    },
    {
      q: 'Is this an ongoing lead-gen retainer?',
      a: 'No. One-time sprint. You leave with the list and the plan. Retainers and ongoing sending are a different conversation if you ever want that.',
    },
    {
      q: 'How many prospects do we get?',
      a: 'Typically 50 to 100 named rows that fit the ICP. Quality over dumping thousands of bad fits into a spreadsheet.',
    },
    {
      q: 'Can I buy this today?',
      a: 'Not yet. This page is the coming-soon brief. When it opens, we lock the ICP, curate the list, write the scripts, and hand over the plan from $2,800.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Know who to call before you hope the phone rings',
  finalLine:
    'ICP, curated list, scripts, and a plan you can run. One sprint. Coming soon.',
  proofKind: 'client-finder',
}

export const ENQUIRY_REPLY_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price · Two to three days · One shared inbox',
  h1Generic: 'The enquiry sits unread while they tap through to the next result',
  h1Personal: (b: string) =>
    `${b}, the enquiry sits unread while they tap through to the next result`,
  sub: 'Website forms and email are where people actually ask you things. We wire an instant, on-brand acknowledgement the moment they land, then route the real message to the one inbox your team watches.',
  ctaLabel: 'Wire enquiry reply · $1,250',
  proofLabel: 'The picture',
  proofHeadingLive: 'Speed of reply is the whole product',
  proofHeadingGeneric: 'Speed of reply is the whole product',
  proofLead: (b: string | null) =>
    b
      ? `${b}'s contact form and inbox both take enquiries today. Neither one replies straight away.`
      : 'Your contact form and inbox both take enquiries today. Neither one replies straight away.',
  proofLeadGeneric:
    'Website forms and email both take enquiries today. Neither one replies straight away, and the person on the other end has no way to know the message even arrived.',
  proofAfter:
    "The fix isn't a chatbot pretending to be a person. It's a calm acknowledgement in seconds, then the real message routed to whoever actually answers it.",
  proofAfterGeneric:
    "The fix isn't a chatbot pretending to be a person. It's a calm acknowledgement in seconds, then the real message routed to whoever actually answers it.",
  painLabel: 'What this is costing you',
  painHeading: 'Enquiries land. Nobody owns the first minute',
  painLines: [
    'The website form emails an inbox nobody checks until the end of the day.',
    'Email and the contact form live in separate places, so nothing gets a consistent first reply.',
    'The customer hears nothing back and assumes you are too busy, or closed.',
    'Whoever is free writes the reply, so tone and facts change depending on who was around.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'An instant reply, then a clean handoff',
  bridgeBody:
    "This isn't a full CRM rebuild and it isn't a phone system. It's the first reply on your written channels, website forms and email, plus a second intake if you already run one. The moment someone enquires, they get a calm, on-brand acknowledgement, and the real message routes to the one inbox or phone your team already watches.",
  bridgeGaugeCaption:
    'Seconds for the acknowledgement. Minutes for a person once the message lands where it should.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Outcomes, not jargon',
  benefits: [
    {
      title: 'They hear from you in seconds',
      text: 'The acknowledgement buys you time without ever looking closed or slow to respond.',
    },
    {
      title: 'One inbox, not five',
      text: 'Forms and email stop scattering across different apps. Your team watches one place.',
    },
    {
      title: 'Tone stays yours',
      text: 'The reply reads like your business wrote it, not a generic script.',
    },
    {
      title: 'Ready for the next step',
      text: 'Clean routing makes Missed-Call Text-Back or CRM Rescue easier to add later.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'A short, clear build',
  processSteps: [
    {
      label: 'Map',
      text: 'Which channels matter, who should see the real message, and where it lands.',
    },
    {
      label: 'Build',
      text: 'Acknowledgement wording and routing, tested on each channel in scope.',
    },
    {
      label: 'Prove',
      text: 'You send a real enquiry. We watch it arrive where it should, in seconds.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full job',
  stackItems: [
    {
      title: 'Channel scope',
      text: 'Website forms and email in the fixed price, plus one extra intake channel if you already use one.',
    },
    {
      title: 'Acknowledgement templates',
      text: 'On-brand first reply for open hours and after hours.',
    },
    {
      title: 'Routing',
      text: 'Email, SMS alert, or a CRM field, matched to what you already run.',
    },
    {
      title: 'Test pack',
      text: 'A short checklist so your team can re-test after staff or channel changes.',
    },
  ],
  scopeLine:
    'Website forms and email, plus one extra channel you already use. Extra channels quoted the same day.',
  priceLabel: 'Investment',
  price: '$1,250',
  priceLead: 'Fixed once your channels are confirmed. This is the locked list price for the scope above.',
  guarantee:
    'When this goes live: agreed channels send the acknowledgement and land in the agreed place, or we keep working at no extra cost until they do.',
  priceAnchor: 'One recovered enquiry usually covers this.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
    {
      q: 'Can I pay for this today?',
      a: "Not on this page yet. Payment isn't wired here, and the price above is the locked list price for when it opens. Reply to any SYSBILT email if you want it scoped sooner.",
    },
    {
      q: 'Does this cover Google Business Profile messages?',
      a: "No. Profile chat sits inside Google's own tools and behaves differently to a form or inbox. This product covers written enquiries: your website form and email.",
    },
    {
      q: 'How is this different from Missed-Call Text-Back?',
      a: 'Missed-Call catches phone calls you did not answer. This catches written enquiries, forms and email, so the two work well side by side.',
    },
    {
      q: 'How is this different from CRM Rescue?',
      a: 'CRM Rescue rebuilds the whole catch-and-chase system inside your CRM. This is smaller: the first reply, and the route into wherever you already work.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Be the first reply they get',
  finalLine: 'An acknowledgement in seconds. The real message in one inbox your team actually watches.',
  proofKind: 'enquiry-reply',
}

export const PROFILE_POSTING_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price · Setup kit · You hit publish',
  h1Generic: 'Your Google profile looks closed when the Updates tab stays empty',
  h1Personal: (b: string) =>
    `${b}, your Google profile looks closed when the Updates tab stays empty`,
  sub: "This is a posting kit for one Google Business Profile: how often to post, templates in your voice, and a bank of posts ready to publish. You hit publish. We don't schedule it for you in this product.",
  ctaLabel: 'Set up posting · $1,100',
  proofLabel: 'The picture',
  proofHeadingLive: 'An empty Updates tab reads as neglect',
  proofHeadingGeneric: 'An empty Updates tab reads as neglect',
  proofLead: (b: string | null) =>
    b
      ? `${b} shows photos and reviews. The Updates feed has nothing new.`
      : 'Your listing shows photos and reviews. The Updates feed has nothing new.',
  proofLeadGeneric:
    'Your listing shows photos and reviews. The Updates feed has nothing new, so people quietly assume the business slowed down.',
  proofAfter:
    "We leave you a kit you can run: cadence, templates, and weeks of posts already written. Publishing stays with you unless you buy care later.",
  proofAfterGeneric:
    "We leave you a kit you can run: cadence, templates, and weeks of posts already written. Publishing stays with you unless you buy care later.",
  painLabel: 'What this is costing you',
  painHeading: 'You meant to post, then the week ate you',
  painLines: [
    'The last update is so old that half your offers have already changed.',
    'Nobody owns posting, so it only happens when someone feels guilty.',
    'The clinic next door posts weekly and looks busier than you, even when you are busier.',
    'Reviews keep landing, but nothing fresh sits between them.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'A posting kit, not a posting retainer',
  bridgeBody:
    "We're not running your calendar in this product, and we're not promising messages or Q&A. You get a clear cadence, templates in your voice, and a starter bank ready to publish. Optional monthly care is separate if you later want us to keep feeding it.",
  bridgeGaugeCaption: 'Setup once. You publish from the bank.',
  benefitsLabel: 'What you get',
  benefitsHeading: 'Clear for the company',
  benefits: [
    {
      title: 'A rhythm you can keep',
      text: 'How often to post, matched to real capacity, not an influencer schedule.',
    },
    {
      title: 'Templates in your voice',
      text: 'Offer, proof, FAQ, and seasonal shapes so you are not inventing from nothing each week.',
    },
    {
      title: 'A starter bank',
      text: 'Four to eight weeks of posts drafted and ready before we hand over.',
    },
    {
      title: 'You stay in control',
      text: 'You publish. Care month is optional later if you want us to feed the bank.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'A short, clear build',
  processSteps: [
    {
      label: 'Brief',
      text: 'Voice, offers, and what you will and will not say in public.',
    },
    {
      label: 'Build',
      text: 'Cadence, templates, and the starter bank.',
    },
    {
      label: 'Handoff',
      text: 'You approve the kit. First publish is yours, with a short how-to.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full kit',
  stackItems: [
    {
      title: 'Posting cadence',
      text: 'A realistic rhythm for your week.',
    },
    {
      title: 'Template set',
      text: 'Offer, proof, FAQ, and seasonal shapes in your voice.',
    },
    {
      title: 'Starter bank',
      text: 'Four to eight weeks of posts ready to publish.',
    },
    {
      title: 'Handover notes',
      text: 'How to keep the rhythm yourself, and when care month is worth adding.',
    },
  ],
  scopeLine:
    'One Google Business Profile. Setup is the kit only. We do not schedule posts for you in this price. Optional monthly care is quoted separately.',
  priceLabel: 'Investment',
  price: '$1,100',
  priceLead: 'Paid once for the kit. No monthly fee unless you choose care later.',
  guarantee:
    'Agreed cadence, templates, and starter bank are delivered as scoped, or we keep working at no extra cost until they are.',
  priceAnchor: 'Less than looking closed next to a competitor who posts every week.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
  faqs: [
    {
      q: 'Do you post and schedule for us every week?',
      a: 'Not in this product. Setup leaves you the cadence, templates, and bank. You hit publish. Optional care month is separate if you want us to keep feeding it.',
    },
    {
      q: 'Is this messages or Q&A on Google?',
      a: 'No. This is posts on the Updates tab only.',
    },
    {
      q: 'How is this different from Google Profile Fix?',
      a: 'Profile Fix cleans claim, categories, photos, and the review link. This kit is what keeps the Updates feed from going quiet afterwards.',
    },
    {
      q: 'How is this different from Content System?',
      a: 'Content System feeds every channel every month. This is one Google profile, set up once.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed kit isn't delivered, we keep working at no extra cost until it is.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'A kit you can publish from, not a promise we post forever',
  finalLine: 'Cadence, templates, starter bank. You hit publish. Paid once.',
  proofKind: 'profile-posting',
}

import {DRAFT_COPY_BY_SLUG} from './funnelDraftProducts'

export function funnelCopyForSlug(slug: string | undefined): FunnelProductCopy {
  if (slug === 'enquiry-reply') return ENQUIRY_REPLY_COPY
  if (slug === 'profile-posting') return PROFILE_POSTING_COPY
  if (slug === 'missed-call') return MISSED_CALL_COPY
  if (slug === 'google-profile') return GOOGLE_PROFILE_COPY
  if (slug === 'search-fix') return SEARCH_FIX_COPY
  if (slug === 'landing-page') return LANDING_PAGE_COPY
  if (slug === 'crm-rescue') return CRM_RESCUE_COPY
  if (slug === 'team-ai') return TEAM_AI_COPY
  if (slug === 'change-pack') return CHANGE_PACK_COPY
  if (slug === 'content-system') return CONTENT_SYSTEM_COPY
  if (slug === 'reviews') return REVIEWS_COPY
  if (slug === 'ai-phone') return AI_PHONE_COPY
  if (slug === 'booking') return BOOKING_COPY
  if (slug === 'website' || slug === 'website-hook') return WEBSITE_COPY
  if (slug === 'geo') return GEO_COPY
  if (slug === 'client-finder') return CLIENT_FINDER_COPY
  if (slug && DRAFT_COPY_BY_SLUG[slug]) return DRAFT_COPY_BY_SLUG[slug]
  return SPEED_FIX_COPY
}
