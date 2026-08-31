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
  /** Leak subhead in FunnelPage. Required for registered bundles. Never hardcode jobs in FunnelPage. */
  leakHeading?: string
  leakBody?: string
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
  /** Optional body under the price lead (Quote Capture investment block). */
  priceBody?: string
  /** Optional add-on block between stack and investment (Quote Capture AI Concierge). */
  addonLabel?: string
  addonHeading?: string
  addonBody?: string
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
    | 'feedback-review'
    | 'ai-phone'
    | 'booking'
    | 'website'
    | 'geo'
    | 'client-finder'
    | 'enquiry-reply'
    | 'profile-posting'
    | 'local-pack'
    | 'conversion-pass'
    | 'onpage-search'
    | 'schema-faq'
    | 'tracking-forms'
    | 'site-chat'
    | 'media-clean'
    | 'a11y-pass'
    | 'whatsapp-setup'
    | 'dm-reply'
    | 'quote-followup'
    | 'quote-capture'
    | 'noshow-rescue'
    | 'intake-forms'
    | 'inbox-triage'
    | 'sop-playbook'
    | 'dashboard-lite'
    | 'bundle-clinic'
    | 'bundle-speed-next'
    | 'bundle-front-door'
    | 'found-booked'
    | 'catch-the-lead'
    | 'call-and-book'
    | 'maps-trust'
    | 'full-diary'
    | 'get-found'
    | 'get-found-full'
    | 'quote-path'
    | 'geo'
    | 'client-finder'
    | 'draft'
}

export const SPEED_FIX_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price, three days, a measured result',
  h1Generic: "Three days from now your site is fast, and Google's own score proves it",
  h1Personal: (b: string) =>
    `${b}, three days from now your site is fast, and Google's own score proves it`,
  sub: 'Slow pages lose people before they even appear, and Google ranks them lower for it. We fix it, then run the same public test again so you can watch the number change.',
  ctaLabel: 'Fix my website, $1,200',
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
  eyebrow: 'Fixed price, days not months, live proof',
  h1Generic: 'Every missed call gets a reply before they dial the next business',
  h1Personal: (b: string) =>
    `${b}, every missed call gets a reply before they dial the next business`,
  sub: 'When the phone rings out, they move on. We wire an automatic text-back so the lead stays yours, and we prove it on a live missed call before we hand it over.',
  ctaLabel: 'Fix my missed calls, $750',
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
  eyebrow: 'Fixed price, two business days, you keep the keys',
  h1Generic: "Your Google profile is the first thing customers see, and right now it's working against you",
  h1Personal: (b: string) =>
    `${b}, your Google profile is the first thing customers see, and right now it's working against you`,
  sub: "Before anyone visits your website, they see your Google Business Profile: the map listing, the photos, the reviews, the hours. When it's thin or half-claimed, people quietly pick the business next to you that looks alive.",
  ctaLabel: 'Fix my profile, $600',
  proofLabel: 'The front door',
  proofHeadingLive: 'Search your name, then your best competitor. That gap is the job',
  proofHeadingGeneric: 'Search your name, then your best competitor. That gap is the job',
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
  painHeading: "Google is already showing customers a version of your business, and nobody's managing it",
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
      q: 'Why is this only $600?',
      a: 'Because it is two focused days on one listing and we have done it enough times to be quick. It is deliberately the cheapest door we sell. Most people start here, see that we did what we said, and decide about the rest afterwards.',
    },
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
  eyebrow: "Fixed price, three days, checked against Google's own records",
  h1Generic:
    "Three days from now, Google can see your whole site again, and its own records prove it",
  h1Personal: (b: string) =>
    `Three days from now, Google can see ${b} again, and its own records prove it`,
  sub: "A page Google can't see doesn't exist to anyone searching for it. This is almost always one broken setting left behind by a redesign or a migration, and it's fixable fast, with the before and after in Google's own Search Console.",
  ctaLabel: 'Fix my visibility, $1,400',
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
    'One site, one Search Console property. We clear what is blocking Google and watch the recrawl for 30 days. Manual penalties and content strategy are a different job, and we tell you straight if that is what you are actually looking at.',
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
      q: 'Why is this cheaper than an SEO agency?',
      a: 'Because this is a rescue with an end, not a monthly programme. An agency would put you on a retainer and reach this in month two. We find what is blocking Google, clear it, resubmit the site and watch the recrawl for 30 days. Then we are finished.',
    },
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
  eyebrow: 'Fixed price, live in two days, on your own domain',
  h1Generic: "Your ads are working, the page they land on isn't",
  h1Personal: (b: string) => `${b}, your ads are working, the page they land on isn't`,
  sub: "You pay for every click, and right now those clicks land on a homepage built for everyone, which convinces almost no one. A dedicated page that repeats your ad's exact promise turns the same spend into more enquiries, live within two business days.",
  ctaLabel: 'Build my page, $1,800',
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
  scopeLine:
    'One landing page on your own domain, matched to one offer. Extra pages or extra offers are quoted the same day. Running the ad account itself is not included.',
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
      q: 'Why not put this money into more ads?',
      a: 'Because the clicks are not the problem. Doubling the spend into a page that never asks for the enquiry just doubles what you waste. Fix where they land once, and every campaign after this one works harder for the same money.',
    },
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
  eyebrow: 'Fixed price, working in five days, in your own system',
  h1Generic: 'The enquiry that came through your website this week is still waiting',
  h1Personal: (b: string) => `${b}, we enquired through your website, and no one replied`,
  sub: "That's not an insult, it's the evidence that brought you here, and it's exactly how a real customer experienced your business. Enquiries are arriving. The system catching them is what's broken, and it's fixable in five days.",
  ctaLabel: 'Rescue my leads, $2,800',
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
  scopeLine:
    'One business, one lead system, on whichever CRM you already use. Missed-call text-back is folded in. Extra pipelines, multi-brand setups and custom software builds get a same-day quote so the fixed price stays honest.',
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
      q: 'Why not hire someone to chase leads instead?',
      a: 'One person doing this costs you more than this within a month, and they still go home at five. We rebuild the system once so every enquiry lands somewhere owned, alerts a phone in seconds and chases itself. After that it runs whether anyone remembers or not.',
    },
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
  eyebrow: 'Half a day, on your real work, up to 12 people',
  h1Generic: "Your team's already using AI, just badly, separately, and in secret",
  h1Personal: (b: string) =>
    `${b}, your team's already using AI, just badly, separately, and in secret`,
  sub: 'One person has a trick for quotes. Another pastes client details into a tool nobody approved. Most are watching from the side. Half a day fixes that: shared setup, your actual tasks, working prompts, and rules everyone understands.',
  ctaLabel: 'Book the remote session, $1,950',
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
  scopeLine:
    'One session, up to 12 people, run on your own real work. Bigger teams split into two sessions, quoted fairly, so the fixed price stays honest.',
  priceLabel: 'Investment',
  price: 'From $1,950',
  priceLead:
    'Remote $1,950 or face-to-face in Sydney $2,400. Paid once. Fill the prep form with a date range at least two weeks out. We confirm a tentative day once we understand your work.',
  guarantee:
    "Our promise: if the team doesn't leave with working prompts and a setup they'll actually use, we come back and run it again at no extra cost.",
  priceAnchor:
    "Work out what half a day of your team costs, then work out what they lose in a week to jobs an AI does in a minute. This is one afternoon, paid once, and the hours come back every week after it.",
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why not just let people work AI out themselves?',
      a: 'Because they already are, unevenly, quietly, and with no agreement about what client information should never go near it. You are paying for that today. This turns it into one shared way of working, on your real jobs, with rules everybody has actually read.',
    },
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
  eyebrow: 'For a new system or AI rollout, built before day one',
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
  benefitsHeading: 'People actually use the thing you bought',
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
  priceAnchor:
    'Put it beside what the system itself cost. A rollout people quietly refuse to use writes off that whole budget, and you normally find out in month three when the old spreadsheets are still open. This is a fraction of the project, spent on the one part that decides whether any of it works.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you book',
  faqs: [
    {
      q: 'Why does this start at $6,000?',
      a: 'Because it is built for your system rather than bought off a shelf. We learn how the work actually changes, record the how-tos on your screens, write the desk sheets, run the live session and come back at 30 days. You get the fixed number in writing at the scoping call, which costs nothing.',
    },
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
  eyebrow: 'One hour of your month, every channel alive, no lock-in',
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
  benefitsHeading: 'You show up every month without touching it',
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
  priceAnchor:
    'A part-time marketing hire costs more than this every month, before super and leave, and still needs briefing, directing and covering when they are away. This costs you one recorded hour a month and nothing else, and you can pause it whenever you like.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you book',
  faqs: [
    {
      q: 'Why not hire someone or use an agency?',
      a: 'A junior marketing hire costs more per month than this once you count super, leave and the hours you spend directing them. An agency costs about the same and never quite sounds like you. Here you talk for an hour, a person makes the work, and you approve one batch.',
    },
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
  eyebrow: 'Fixed price, two to three days, a habit that keeps asking',
  h1Generic:
    'You have fewer reviews than the business ranking above you, and no system closing the gap',
  h1Personal: (b: string) =>
    `${b}, you have fewer reviews than the business ranking above you`,
  sub: 'Star count is the first trust signal before the site loads. We wire an automatic ask after every job, write the wording in your voice, hand over QR and short link, and load response templates for good and bad reviews.',
  ctaLabel: 'Fix my reviews, $1,100',
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
    'One business, one review path, real customers only. We never post fake reviews, buy stars, or game Google. The engine asks, your customers decide. Extra locations are quoted the same day so the fixed price stays honest.',
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
      q: 'Why not just ask customers ourselves?',
      a: 'You already meant to, and that is exactly the point. Asking is not the hard part, remembering at the end of a long job is. This builds the ask into what already happens, in wording you approved, so it fires without anyone having to think about it.',
    },
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
  eyebrow: 'Fixed price setup, your account, a voice that books',
  h1Generic: 'After hours and mid-job, the call still gets answered',
  h1Personal: (b: string) =>
    `${b}, after hours and mid-job, the call still gets answered`,
  sub: "We do not sell you a monthly receptionist. We set up a voice agent on your own vendor account, load your knowledge, wire calendar and CRM, tune the voice, test live with you listening, and hand over the keys. You pay the vendor's monthly fee directly.",
  ctaLabel: 'Set up my AI phone, $1,950',
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
  eyebrow: 'Fixed price, two to three days, a Book now that sticks',
  h1Generic: 'Customers who want you right now still have to call and hope',
  h1Personal: (b: string) =>
    `${b}, customers who want you right now still have to call and hope`,
  sub: 'Phone tag, email chains, and DMs are how appointments still get made. No Book now on the site or Google panel. No-shows pile up because nothing reminds them. We wire online booking to your real calendar, with confirmations, reminders, and a no-show text sequence, then put Book now where people already look.',
  ctaLabel: 'Fix my booking, $1,500',
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
      q: 'Why pay for this when booking tools are free?',
      a: 'The tool is the cheap part, and it is usually already sitting there unused. The work is wiring it to your real calendar and hours, putting Book now where ready customers actually look, and getting confirmations and reminders firing so the slots stay filled.',
    },
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
  eyebrow: 'Built by us, hosted by us, live in about 14 days',
  h1Generic: 'A website that looks like your business, without the five thousand dollar headache',
  h1Personal: (b: string) =>
    `${b}, a website that looks like your business, without the five thousand dollar headache`,
  sub: 'If your site is missing, broken, or quietly embarrassing, the people who find you online just leave. We interview you, write it, build it, host it, and keep it running. You never touch a password, a plugin, or a design argument.',
  ctaLabel: 'Start my site, from $120',
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
      title: 'Brochure, $120 a month, $120 today',
      text: 'One strong page: who you are, what you do, hours, map, and a contact form to your email. Search basics set up. Privacy and terms when the plan needs them.',
    },
    {
      title: 'Practice, $160 a month, $160 today',
      text: 'Five to seven pages: room for services, about, and proof, plus the same form, hosting and care. Privacy and terms included. The sweet spot for most growing businesses.',
    },
    {
      title: 'Full site, $190 a month, $190 today',
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
  price: 'From $120 a month, pay $120 today to start',
  priceLead:
    'Brochure $120/mo. Practice $160/mo. Full site $190/mo. Today you pay one month to start the build. When your site goes live, monthly autopay begins on that same amount. The twelve month term starts at go-live, not the day you pay to begin.',
  guarantee:
    'Page count, form and care inclusions are written down before we build. Extra work is quoted, never assumed. If what we agreed is not delivered as scoped, we keep working at no extra cost until it is.',
  priceAnchor:
    "You're buying a professional front door and someone else holding the technical end, not a five thousand dollar science project.",
  faqLabel: 'Objections',
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

export const ENQUIRY_REPLY_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price, live in two to three days',
  h1Generic: 'The enquiry sits unread while they tap through to the next result',
  h1Personal: (b: string) =>
    `${b}, the enquiry sits unread while they tap through to the next result`,
  sub: 'Website forms and email are where people actually ask you things. We wire an instant, on-brand acknowledgement the moment they land, then route the real message to the one inbox your team watches.',
  ctaLabel: 'Wire enquiry reply, $350',
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
  benefitsHeading: 'Nobody is left wondering if it arrived',
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
  price: '$350',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the agreed channels send the acknowledgement and land in the right place, tested before handover, or we keep working at no extra cost until they do.',
  priceAnchor:
    'This is the cheapest thing we sell and usually the fastest to pay for itself. One enquiry that would otherwise have gone cold covers it, and every one after that is free.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why is this only $350?',
      a: 'Because it is a small, well-defined job we have done many times over. Two to three days, your forms and email, tested before handover. We would rather you buy this and come back than be sold something bigger you did not need.',
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
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed channels do not acknowledge and route as scoped, we keep working at no extra cost until they do.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Be the first reply they get',
  finalLine: 'An acknowledgement in seconds. The real message in one inbox your team actually watches.',
  proofKind: 'enquiry-reply',
}

export const PROFILE_POSTING_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price, a kit you publish from',
  h1Generic: 'Your Google profile looks closed when the Updates tab stays empty',
  h1Personal: (b: string) =>
    `${b}, your Google profile looks closed when the Updates tab stays empty`,
  sub: "Somebody comparing you to the business down the road sees their last post was Tuesday and yours was eighteen months ago. This is the kit that fixes that: how often to post, templates written in your voice, and four to eight weeks of posts already drafted. You hit publish. We don't schedule it for you in this one.",
  ctaLabel: 'Set up posting, $1,100',
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
  benefitsHeading: 'A rhythm that survives a busy week',
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
    'Our promise: the agreed rhythm, templates and starter bank are delivered, or we keep working at no extra cost until they are.',
  priceAnchor:
    'A monthly posting retainer costs more than this within three months, and the day you stop paying, the posting stops. This is the kit, once, and it keeps working for as long as you use it.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why buy a kit instead of paying someone monthly?',
      a: 'Because most of the cost in a posting retainer is deciding what to say, and that only needs doing properly once. You get the rhythm, the shapes and weeks of posts written. Pressing publish takes a couple of minutes a week.',
    },
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
  finalLine:
    'Pay once, approve the kit, and never open a blank posting box again.',
  proofKind: 'profile-posting',
}

/** Bundle: Profile Fix + Review Engine + Profile Posting. Not local SEO. */
export const LOCAL_PACK_COPY: FunnelProductCopy = {
  eyebrow: 'Three jobs, one sprint, one location',
  h1Generic: 'Your Google listing needs a clean profile, a review habit, and posts that keep showing up',
  h1Personal: (b: string) =>
    `${b}, your Google listing needs a clean profile, a review habit, and posts that keep showing up`,
  sub: 'Three jobs in one delivery: your listing cleaned up, a review ask that keeps firing after every job, and a posting kit so the Updates tab stops looking abandoned. This is not local SEO and it is not a rankings promise,     it is the front door on Maps, done properly, for $550 less than buying the three apart.',
  ctaLabel: 'Get Maps alive, $2,250',
  proofLabel: 'The picture',
  proofHeadingLive: 'Maps trust is three jobs, not one',
  proofHeadingGeneric: 'Maps trust is three jobs, not one',
  proofLead: (b: string | null) =>
    b
      ? `${b} can look thin if the profile is messy, reviews stall, and the Updates tab goes quiet.`
      : 'A listing looks thin if the profile is messy, reviews stall, and the Updates tab goes quiet.',
  proofLeadGeneric:
    'A listing looks thin if the profile is messy, reviews stall, and the Updates tab goes quiet. Buying those as three separate projects means three kickoffs and three handoffs.',
  proofAfter:
    'One sprint: profile cleaned, review ask wired, posting kit ready. One access pass. One handoff. Paid once at the bundle price.',
  proofAfterGeneric:
    'One sprint: profile cleaned, review ask wired, posting kit ready. One access pass. One handoff. Paid once at the bundle price.',
  painLabel: 'What this is costing you',
  painHeading: 'Piecemeal local work never finishes',
  painLines: [
    'You cleaned categories once, then never touched reviews.',
    'You asked for reviews once, then the habit died.',
    'Posts only happen when someone remembers and feels guilty.',
    'Three separate buys mean three briefs, three access chats, and three chances to stall.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'One local sprint, three connected jobs',
  bridgeBody:
    'This is not SEO for suburbs, and it is not a rankings promise. It is the three Maps jobs that belong together: Google Profile Fix, Review Engine, and Profile Posting System, run as one delivery so your listing looks coherent. Bought separately today that is $2,800. The pack is $2,250.',
  bridgeGaugeCaption: 'Clean profile. Review ask. Posts you can keep. One sprint.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'One window, not three projects',
  benefits: [
    {
      title: 'One kickoff',
      text: 'One brief, one access pass, one delivery window instead of three separate starts.',
    },
    {
      title: 'Maps looks coherent',
      text: 'Details, social proof, and Updates finally match what the business actually is.',
    },
    {
      title: 'Real products inside',
      text: 'Full Profile Fix, full Review Engine, and the full Profile Posting kit. Not thin samples.',
    },
    {
      title: 'Clear price',
      text: '$2,250 once. That is $550 under buying the three doors separately at list price.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'One sprint, then you own the habits',
  processSteps: [
    {
      label: 'Access',
      text: 'Profile access, how jobs get marked done, and who will hit publish.',
    },
    {
      label: 'Build',
      text: 'Profile cleanup, review ask and templates, posting cadence and starter bank.',
    },
    {
      label: 'Handoff',
      text: 'You approve. We leave who owns asks, who publishes, and a short monthly check.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Three live products, one price',
  stackItems: [
    {
      title: 'Google Profile Fix',
      text: 'Claim or recover if needed, categories, details, photos guidance, review link. Same scope as the $600 door.',
    },
    {
      title: 'Review Engine',
      text: 'Automatic ask after jobs, wording in your voice, QR and short link, reply templates. Same scope as the $1,100 door.',
    },
    {
      title: 'Profile Posting System',
      text: 'Cadence, templates in your voice, starter bank. You hit publish. Same scope as the $1,100 door.',
    },
    {
      title: 'Local checklist',
      text: 'A five-minute monthly check so profile, asks, and posts do not quietly rot.',
    },
  ],
  scopeLine:
    'One Google Business Profile / one location. Not local SEO, not ranking work, not multi-location. Extra locations quoted the same day.',
  priceLabel: 'Investment',
  price: '$2,250',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: all three scoped pieces are delivered, or we keep working at no extra cost until they are.',
  priceAnchor:
    'Bought separately the same three jobs are $2,800 and three separate kickoffs, which in practice means the third one never happens. Together they are $2,250, one access handover, and a listing that finally looks like a business somebody runs.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Is this local SEO or ranking work?',
      a: 'No. This pack is profile cleanup, review asks, and posting. We do not promise map pack rankings or keyword positions in this product.',
    },
    {
      q: 'What am I actually buying?',
      a: 'The same three products we sell separately: Google Profile Fix, Review Engine, and Profile Posting System, delivered in one sprint with one access pass.',
    },
    {
      q: 'Why not buy the three doors alone?',
      a: 'You can. Separate list prices add to $2,800. The pack is $2,250 and removes two extra kickoffs.',
    },
    {
      q: 'Do you post for us every week?',
      a: 'No. Profile Posting in this pack is the kit: cadence, templates, and a starter bank. You hit publish unless you buy care later.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed scopes are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'One sprint for the listing people actually open',
  finalLine:
    'Pay once, hand over access once, and get the listing people actually open sorted in one sprint.',
  proofKind: 'local-pack',
}

/** Home, contact, up to two service pages rewritten so people enquire. Not a redesign. */
export const CONVERSION_PASS_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price, three to five days, four pages',
  h1Generic: 'Your site can be fast and still never ask for the job',
  h1Personal: (b: string) =>
    `${b}, your site can be fast and still never ask for the job`,
  sub: 'Somebody lands, reads two paragraphs about your values, and still cannot tell what you do or what happens next. We rewrite the four pages that decide it, home, contact and up to two service pages, so the offer is obvious, the proof is visible, and the next step is impossible to miss. Same design, different words.',
  ctaLabel: 'Fix my conversion, $1,400',
  proofLabel: 'The picture',
  proofHeadingLive: 'Speed without a clear ask still leaks',
  proofHeadingGeneric: 'Speed without a clear ask still leaks',
  proofLead: (b: string | null) =>
    b
      ? `${b} can keep people reading, then lose them when the next step is buried.`
      : 'A site can keep people reading, then lose them when the next step is buried.',
  proofLeadGeneric:
    'People stay long enough to read, then shrug. Weak headlines, buried contact, and vague services waste the traffic you already paid for.',
  proofAfter:
    'Priority pages say what you do, who it is for, why you, and how to enquire, without a redesign of the whole brand.',
  proofAfterGeneric:
    'Priority pages say what you do, who it is for, why you, and how to enquire, without a redesign of the whole brand.',
  painLabel: 'What this is costing you',
  painHeading: 'Traffic arrives. Clarity does not',
  painLines: [
    'The homepage talks about you, not the job the visitor needs done.',
    'Contact is three clicks deep on mobile.',
    'Service pages are thin or interchangeable.',
    'You fixed speed and still cannot explain why enquiries did not rise.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'A conversion pass on the pages that matter',
  bridgeBody:
    'This is not a brand redesign and it is not a twelve-page content project. It is a focused rewrite on home, contact, and up to two service pages. Clear offer. Visible proof. Obvious next step.',
  bridgeGaugeCaption: 'Clear offer. Visible proof. Obvious next step.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'The pages that ask, rewritten',
  benefits: [
    {
      title: 'The ask is obvious',
      text: 'People know what to do next without hunting for it, which is most of the battle.',
    },
    {
      title: 'Proof sits where the decision happens',
      text: 'Reviews, results and credentials next to the button, not buried on an about page nobody opens.',
    },
    {
      title: 'Judged on a phone first',
      text: 'That is where most people decide, so that is where we check the work before it ships.',
    },
    {
      title: 'Your traffic starts earning',
      text: 'Everyone who already visits gets the clearer version, so the ads and search work you paid for stop being wasted.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Audit, rewrite, ship',
  processSteps: [
    {
      label: 'Audit',
      text: 'Which pages leak, and what the real offer is.',
    },
    {
      label: 'Rewrite',
      text: 'Headlines, sections, buttons and form labels on the pages we agreed.',
    },
    {
      label: 'Ship',
      text: 'Live on your site, checked on mobile, with a short before/after note.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'Four pages that earn their keep',
  stackItems: [
    {
      title: 'Home rewrite',
      text: 'What you do, who it is for, the proof, and one obvious next step.',
    },
    {
      title: 'Contact clarity',
      text: 'A form and a path that do not make anyone hunt for them.',
    },
    {
      title: 'Up to two service pages',
      text: 'Specific enough to sell the job without turning into a novel.',
    },
    {
      title: 'Checked on a phone',
      text: 'We judge the work on a phone first, because that is where most people decide.',
    },
  ],
  scopeLine:
    'Home, contact, up to two service pages on one site. Extra pages quoted the same day. Visual redesign is a different job.',
  priceLabel: 'Investment',
  price: '$1,400',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the agreed pages ship with a clear offer and an obvious next step, or we keep working at no extra cost until they do.',
  priceAnchor:
    'Put it next to a month of ad spend, or the cost of the traffic you already get. That money lands on these same pages either way. $1,400 makes them ask for the job, once, and every visitor after that gets the better version.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why is this cheaper than a redesign?',
      a: 'Because we are not touching the design. A redesign bills you for layout and pictures. This is the words and the buttons on the four pages that decide whether somebody contacts you, which is usually where the actual problem is.',
    },
    {
      q: 'Do you redesign the whole site?',
      a: 'No. The words, the structure and the buttons on the pages that matter. Visual redesign is a different job.',
    },
    {
      q: 'Is this SEO or title tags?',
      a: 'No. This pass is for humans who already landed. On-Page Search Pack is the titles and headings job.',
    },
    {
      q: 'Do I need Speed Fix first?',
      a: 'Not required, but best after Speed Fix while access is still open. You can buy this alone.',
    },
    {
      q: 'What if I need more than two service pages?',
      a: 'We quote extras the same day. The $1,400 lock is home, contact, and two services.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed pages are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Make the next step impossible to miss',
  finalLine:
    'Pay once, and within a week the four pages that matter finally ask for the job.',
  proofKind: 'conversion-pass',
}

/** Titles, headings, links, and thin-page lifts on priority URLs. Not a retainer. */
export const ONPAGE_SEARCH_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price, about a week, up to eight pages',
  h1Generic: 'Your pages look finished and still say almost nothing Google can trust',
  h1Personal: (b: string) =>
    `${b}, your pages look finished and still say almost nothing Google can trust`,
  sub: 'Every page title starts with your business name, the service pages could be swapped without anyone noticing, and nothing links to anything. So a clearer competitor takes the click. We fix the titles, headings, internal links and thin pages on the eight that matter most. One job with an end, not a six-month retainer.',
  ctaLabel: 'Fix my on-page search, $1,900',
  proofLabel: 'The picture',
  proofHeadingLive: 'Messy pages lose to clearer ones',
  proofHeadingGeneric: 'Messy pages lose to clearer ones',
  proofLead: (b: string | null) =>
    b
      ? `${b} can look polished and still leave Google guessing what each page is for.`
      : 'A site can look polished and still leave Google guessing what each page is for.',
  proofLeadGeneric:
    'Brand-only titles, interchangeable service pages, and dead-end links leave search nothing solid to hold. Clearer competitors win the click.',
  proofAfter:
    'The pages you pick get honest titles, headings and links that match how people actually search for what you do.',
  proofAfterGeneric:
    'The pages you pick get honest titles, headings and links that match how people actually search for what you do.',
  painLabel: 'What this is costing you',
  painHeading: 'The pages are messy. Search shrugs',
  painLines: [
    'Every page title opens with your business name, which tells a searcher nothing about what they came for.',
    'Your service pages repeat the same paragraph with a different heading on top.',
    'Nothing links to anything, so people and search engines both hit dead ends.',
    'You pay for tools that report on traffic while the pages themselves have almost nothing on them.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'On-page work on the pages that matter',
  bridgeBody:
    'This is not link buying and it is not a content factory. It is on-page clarity for up to eight priority pages: titles, headings, internal links, and careful lifts where a page is too thin.',
  bridgeGaugeCaption: 'Titles, headings, links, thin-page fixes.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Pages that say what they are',
  benefits: [
    {
      title: 'Pages say what they actually are',
      text: 'A searcher and a search engine both work out what the page is for within a second of arriving.',
    },
    {
      title: 'A job that ends',
      text: 'Eight pages agreed at kickoff, fixed, handed over. No monthly invoice arriving forever.',
    },
    {
      title: 'Honest, not stuffed',
      text: 'Titles and headings that match what is on the page, so it reads like a business rather than keyword soup.',
    },
    {
      title: 'Better ground for what comes next',
      text: 'Clean pages make the FAQ and AI visibility work far more effective if you do it later.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Select, fix, check',
  processSteps: [
    {
      label: 'Select',
      text: 'We agree the page list and the searches that actually matter to your business.',
    },
    {
      label: 'Fix',
      text: 'Titles, headings, internal links, and real substance where a page is too thin.',
    },
    {
      label: 'Check',
      text: 'A plain before and after note you can keep, so you know exactly what changed.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full pass, nothing extra to buy',
  stackItems: [
    {
      title: 'The page list',
      text: 'Up to eight pages, agreed at kickoff, so the job has a clear end.',
    },
    {
      title: 'Titles and headings',
      text: 'Clear and honest, written for a person first, without the keyword stuffing.',
    },
    {
      title: 'Internal links',
      text: 'Proper paths between your services, your proof and your contact page, so nothing dead-ends.',
    },
    {
      title: 'Thin pages lifted',
      text: 'Where a page has almost nothing on it, we add real substance rather than padding.',
    },
  ],
  scopeLine:
    'Up to eight priority pages on one site. Extra pages quoted the same day. Not link building, not a monthly retainer, and not Conversion Pass, which rewrites the words and buttons for the people who already landed.',
  priceLabel: 'Investment',
  price: '$1,900',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the agreed on-page work ships on the pages we locked, or we keep working at no extra cost until it does.',
  priceAnchor:
    'An SEO retainer at fifteen hundred a month costs you more than this before the second invoice, and it never stops. This stops. Eight pages, fixed, handed over, and the work stays yours whether or not you ever hire anyone again.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why buy this instead of an SEO retainer?',
      a: 'Because the on-page work is a finite job, and most retainers spend the first three months doing exactly this while billing monthly. We do it once, show you what changed, and leave. If you want ongoing work after that, at least you are starting from clean pages.',
    },
    {
      q: 'Is this the same as Search Visibility Fix?',
      a: 'No. Search Visibility Fix is about indexing and technical findability. This pack is titles, headings, links, and thin copy on pages that already exist.',
    },
    {
      q: 'Is this Conversion Pass?',
      a: 'No. Conversion Pass rewrites home, contact, and services so people enquire. This pack makes priority pages clearer for search.',
    },
    {
      q: 'Do you buy links or run a monthly SEO retainer?',
      a: 'No. Fixed on-page work on up to eight URLs, then we hand off.',
    },
    {
      q: 'What if I need more than eight pages?',
      a: 'We quote the extras the same day. The $1,900 covers eight priority pages, which keeps the fixed price honest.',
    },
    {
      q: 'Do I need Website Speed Fix first?',
      a: 'No. This pack stands alone. If the site is already slow, Speed Fix is a useful separate job, not a requirement here.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed fixes are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Give search something solid to hold',
  finalLine:
    'Pay once, pick the eight pages that matter, and stop losing clicks to businesses that were simply clearer.',
  proofKind: 'onpage-search',
}

/** Plain FAQs on key services plus FAQ schema. Not a GEO promise. */
export const SCHEMA_FAQ_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price, a few days, up to three services',
  h1Generic: 'If search and AI answers cannot quote you, they quote somebody else',
  h1Personal: (b: string) =>
    `${b}, if search and AI answers cannot quote you, they quote somebody else`,
  sub: "Someone at ten at night wants to know what it costs, how long it takes, and whether you come to them. Your site does not say, so they ask a search engine and it names a competitor who did. We write the real questions and answers onto your key service pages, then add FAQ schema (the markup that lets search and AI tools read a question and answer properly).",
  ctaLabel: 'Fix my FAQs and schema, $1,200',
  proofLabel: 'The picture',
  proofHeadingLive: 'Citeable beats vague',
  proofHeadingGeneric: 'Citeable beats vague',
  proofLead: (b: string | null) =>
    b
      ? `${b} can look finished and still answer nothing a customer would ask at 10pm.`
      : 'A site can look finished and still answer nothing a customer would ask at 10pm.',
  proofLeadGeneric:
    'Thin service pages give ChatGPT and Google nothing safe to quote. Clear Q&A is how you become nameable.',
  proofAfter:
    'Key services get real questions, real answers, and markup that matches what is on the page.',
  proofAfterGeneric:
    'Key services get real questions, real answers, and markup that matches what is on the page.',
  painLabel: 'What this is costing you',
  painHeading: 'You exist. The machines skip you',
  painLines: [
    'Competitors with boring-but-clear FAQs get mentioned. You do not.',
    'Your site answers nothing people ask after hours.',
    'Schema was never added, or it was added wrong.',
    'You keep hearing about AI search while the real gap is missing facts.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'FAQ substance plus markup',
  bridgeBody:
    'This is not fake citations and it is not a promise any AI will pick you. It is practical FAQ content in your voice, placed where visitors read, with schema that matches the visible text.',
  bridgeGaugeCaption: 'Plain answers. Valid markup. No spam.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Answers people and tools can use',
  benefits: [
    {
      title: 'The awkward questions get answered',
      text: 'Cost, timing, what is included, whether you cover their area. The ones people will not ring to ask.',
    },
    {
      title: 'Fewer time-wasting enquiries',
      text: 'People who were never a fit work that out on the page, so the ones who do contact you are closer to buying.',
    },
    {
      title: 'Markup that actually matches',
      text: 'The structured code says exactly what the page says, which is the part most sites get wrong.',
    },
    {
      title: 'Sat next to the decision',
      text: 'The answers live on the service page where people are deciding, not in a footer nobody opens.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Choose, write, mark up',
  processSteps: [
    {
      label: 'Choose',
      text: 'Which services and which real questions.',
    },
    {
      label: 'Write',
      text: 'Answers in your voice, approved by you.',
    },
    {
      label: 'Mark up',
      text: 'FAQ schema where it earns its place, then validate.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'What ships on the scoped services',
  stackItems: [
    {
      title: 'FAQ set',
      text: 'Up to three services, up to eight FAQs each.',
    },
    {
      title: 'On-page placement',
      text: 'Where visitors actually read.',
    },
    {
      title: 'Schema',
      text: 'Structured Q&A markup aligned to the text.',
    },
    {
      title: 'Validation note',
      text: 'What we checked and what to leave alone.',
    },
  ],
  scopeLine:
    'Up to three service pages, up to eight questions each, on one site. Extra services quoted the same day. Not Site AI Chat, not the On-Page Search title work, and not an ongoing AI visibility retainer.',
  priceLabel: 'Investment',
  price: '$1,200',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the agreed answers and markup ship on the pages we locked, or we keep working at no extra cost until they do.',
  priceAnchor:
    'Up to twenty-four proper answers written in your voice and marked up correctly, for less than most agencies charge to write one page. Every one of them keeps working at ten at night when nobody is in the office.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why not just write the FAQs ourselves?',
      a: 'You can, and plenty do. What usually happens is you write six vague ones, skip the awkward questions about price, and never add the markup, which is the part that lets search and AI tools use them. That is the bit we are actually selling.',
    },
    {
      q: 'Is this a guarantee AI tools will mention us?',
      a: 'No. We make you citeable. Whether any tool picks you still depends on the wider web.',
    },
    {
      q: 'Is this On-Page Search Pack?',
      a: 'No. On-Page Search is titles, headings, and links. This pack is FAQ content plus schema.',
    },
    {
      q: 'Is this Site Chat?',
      a: 'No. Site Chat is a live bot. This pack puts answers on the page with markup.',
    },
    {
      q: 'Do I need Conversion Pass or On-Page Search first?',
      a: 'No. This pack stands alone. Those are useful separate jobs when you want clearer CTAs or titles.',
    },
    {
      q: 'What if I need more than three services?',
      a: 'We quote extras the same day. The $1,200 lock is three services and up to eight FAQs each.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed FAQs and schema are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Become something tools can quote',
  finalLine:
    'Pay once, pick three services, and let your site answer the questions people ask at ten at night.',
  proofKind: 'schema-faq',
}

export const TRACKING_FORMS_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price, about two days, one site',
  h1Generic: 'If you cannot see the enquiry, you are guessing about everything else',
  h1Personal: (b: string) =>
    `${b}, if you cannot see the enquiry, you are guessing about everything else`,
  sub: 'You spend on ads, you pay to make the site faster, and nobody can tell you whether enquiries went up, because nothing was ever set up to count them. Meanwhile at least one form is emailing somebody who left last year. We wire the actions that matter, fix where forms land, and leave you a short list of what to check each week.',
  ctaLabel: 'Wire my tracking, $950',
  proofLabel: 'The picture',
  proofHeadingLive: 'Click, then fog',
  proofHeadingGeneric: 'Click, then fog',
  proofLead: (b: string | null) =>
    b
      ? `${b} can spend on speed and ads and still not know which page produced the last enquiry.`
      : 'A site can spend on speed and ads and still not know which page produced the last enquiry.',
  proofLeadGeneric:
    'Forms go to the wrong inbox. Events never fire. You argue from vibes while the lead trail stays dark.',
  proofAfter:
    'Key actions fire cleanly, forms land where they should, and you get a short map of what to watch each week.',
  proofAfterGeneric:
    'Key actions fire cleanly, forms land where they should, and you get a short map of what to watch each week.',
  painLabel: 'What this is costing you',
  painHeading: 'Money in. Fog out',
  painLines: [
    'Nobody can tell you which page produced the last enquiry, so every decision after that is a guess.',
    'At least one form quietly emails somebody who left the company, and you will find out months late.',
    'You cannot judge the ads or the speed work, so you keep paying for both on faith.',
    'Analytics was installed once, by somebody, and has never been opened since.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Tracking and forms that tell the truth',
  bridgeBody:
    'This is not a full analytics rebuild and it is not a BI project. It is the minimum honest signal: primary events, correct destinations, and a simple view of what to check.',
  bridgeGaugeCaption: 'See the enquiry. Then improve.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Signal you can act on',
  benefits: [
    {
      title: 'You can prove what worked',
      text: 'Whether the ads or the speed work moved anything stops being an argument and becomes a number.',
    },
    {
      title: 'Enquiries stop disappearing',
      text: 'Every form goes to somebody who still works there, checked with a real test submission.',
    },
    {
      title: 'Small enough to actually use',
      text: 'A handful of numbers worth watching, not a dashboard nobody opens twice.',
    },
    {
      title: 'Better ground for what comes next',
      text: 'Clean signals make a CRM job or a dashboard far easier and cheaper later on.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Inventory, wire, verify',
  processSteps: [
    {
      label: 'Inventory',
      text: 'Forms, buttons, and where leads should go.',
    },
    {
      label: 'Wire',
      text: 'Events and destinations on the scoped actions.',
    },
    {
      label: 'Verify',
      text: 'Test submissions and a one-page watchlist.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'What ships on one site',
  stackItems: [
    {
      title: 'Event set',
      text: 'Up to five primary conversions only.',
    },
    {
      title: 'Form destinations',
      text: 'Up to three forms, correct inboxes or CRM fields.',
    },
    {
      title: 'Watchlist',
      text: 'What to check weekly in plain language.',
    },
    {
      title: 'Test proof',
      text: 'We show you a test event landing correctly.',
    },
  ],
  scopeLine:
    'One site. Up to five main actions and up to three forms. We check your Google Analytics, and only touch tag manager if the job needs it. Not heatmaps, not call tracking, not CRM Rescue, not a full analytics rebuild.',
  priceLabel: 'Investment',
  price: '$950',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the agreed actions and form destinations work in a live test before handover, or we keep working at no extra cost until they do.',
  priceAnchor:
    'One form quietly emailing somebody who left costs you more than this in a fortnight. And every dollar you put into ads or a faster site is a guess until this is done, which makes it the cheapest thing you can buy before spending more.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why is this only $950?',
      a: 'Because it is two days on a site that already exists, and we do it often enough to be quick. It is deliberately small: the handful of actions that matter, done properly, rather than a rebuild you would never look at.',
    },
    {
      q: 'Is this a full analytics rebuild?',
      a: 'No. We wire the conversions that actually matter and leave you a short weekly watchlist. Heavy dashboards are a different job, and most businesses never need one.',
    },
    {
      q: 'Do you fix Meta and Google ads pixels?',
      a: 'Only when they sit on the same primary actions we already scoped. Full ad-account setup is separate.',
    },
    {
      q: 'Is this Enquiry Auto-Reply?',
      a: 'No. Enquiry Auto-Reply acknowledges written enquiries. This pack makes sure you can see the enquiry happened and that forms reach the right place.',
    },
    {
      q: 'Is this CRM Rescue?',
      a: 'No. Clean events make CRM easier later. This pack stops at events, destinations, and the watchlist.',
    },
    {
      q: 'What if I need more than five events or three forms?',
      a: 'We quote extras the same day. The $950 lock is five primary events and three forms on one site.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed events and destinations are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'See the enquiry, then improve',
  finalLine:
    'Pay once, give it two days, and stop guessing whether anything you spend is working.',
  proofKind: 'tracking-forms',
}

export const SITE_CHAT_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price, about a week, one site',
  h1Generic: 'A site chat that answers the usual questions and knows when to shut up',
  h1Personal: (b: string) =>
    `${b}, a site chat that answers the usual questions and knows when to shut up`,
  sub: 'Your reception gives the same five answers all day, and after hours nobody gives them at all. This is a chat on your website that handles hours, services, location and what happens next, using answers you wrote and approved. When the question is real work, it stops and hands over to a person. It cannot make up a price, because we never give it one to guess with.',
  ctaLabel: 'Add AI chat, $950',
  proofLabel: 'The picture',
  proofHeadingLive: 'Answer, then hand off',
  proofHeadingGeneric: 'Answer, then hand off',
  proofLead: (b: string | null) =>
    b
      ? `${b} can lose night browsers to silence, or worse, to a bot that invents fees.`
      : 'A site can lose night browsers to silence, or worse, to a bot that invents fees.',
  proofLeadGeneric:
    'People browse at night. If nothing answers, they leave. If a bad bot invents fees, you earn a dispute.',
  proofAfter:
    'A small brain trained on your approved FAQs, with a clear handoff and a tight leash on what it may say.',
  proofAfterGeneric:
    'A small brain trained on your approved FAQs, with a clear handoff and a tight leash on what it may say.',
  painLabel: 'What this is costing you',
  painHeading: 'Phone-tag for questions a page should answer',
  painLines: [
    'Your reception gives the same five answers all day, which is not what you pay them for.',
    'People browsing at nine at night get nothing, so they go and ask somebody else.',
    'Off-the-shelf chat widgets sound like a call centre in another country.',
    'You have held off because a bot inventing a price or a health claim would be genuinely worse than nothing.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'AI chat with a human door',
  bridgeBody:
    'This is not an unsupervised agent running your business. It is branded AI chat limited to FAQs you approve, with handoff when the question needs a person.',
  bridgeGaugeCaption: 'Answer the usual. Escalate the rest.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Common questions handled. Real work escalated',
  benefits: [
    {
      title: 'The same five questions, handled',
      text: 'Hours, parking, what you offer and how to get started, answered instantly at any hour.',
    },
    {
      title: 'Real enquiries reach a person',
      text: 'When someone is actually ready to buy, the chat stops and hands them over instead of pretending.',
    },
    {
      title: 'It sounds like your business',
      text: 'Every answer is written and approved by you before it goes live, in your words.',
    },
    {
      title: 'Optional Care later',
      text: 'After setup, you can keep FAQ and prompt refresh with us, or run it yourself. Your call.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Approve, install, hand off',
  processSteps: [
    {
      label: 'FAQ brain',
      text: 'Approve what it may say. Ban what it must never say.',
    },
    {
      label: 'Install',
      text: 'On your site, branded, mobile-friendly.',
    },
    {
      label: 'Handoff',
      text: 'Alert path tested. Escape hatch obvious.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'What ships on one site',
  stackItems: [
    {
      title: 'Approved FAQ set',
      text: 'Up to twenty Q and As you sign off before go-live.',
    },
    {
      title: 'Chat UI',
      text: 'On your domain, not a random third-party look.',
    },
    {
      title: 'Handoff rules',
      text: 'When to stop answering and call a human.',
    },
    {
      title: 'Guardrails',
      text: 'No inventing prices or clinical advice.',
    },
  ],
  scopeLine:
    'One site. Up to twenty approved FAQs, branded AI chat, handoff, and guardrails. Not AI Phone, not Schema FAQ markup, not a qualify-and-book CRM agent. Optional Care after setup is available if you want ongoing refresh. Setup price is fixed either way.',
  priceLabel: 'Investment',
  price: '$950',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the chat answers your approved questions and hands over as agreed, tested before go-live, or we keep working at no extra cost until it does.',
  priceAnchor:
    'Count the hours your front desk spends repeating opening times, then add the people who browse at night and get nothing back. This is a week of work, paid once, and it answers at three in the morning without being rostered on.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why pay for this when chat widgets are cheap?',
      a: 'The widget is the cheap part. What costs money is deciding what it may say, writing the answers in your voice, setting the point where it stops and fetches a person, and testing that it holds. That is the job here.',
    },
    {
      q: 'Is this a generic off-the-shelf widget?',
      a: 'No. We build branded AI chat on your site, trained on FAQs you approve, with handoff and a tight leash. Setup is fixed. Ongoing Care is optional later if you want it.',
    },
    {
      q: 'Will it invent prices or medical claims?',
      a: 'No. Guardrails ban inventing prices and clinical advice. If it cannot answer safely, it hands off.',
    },
    {
      q: 'Will it book appointments alone?',
      a: 'Only if you also have Booking System or a path we can point to. Chat itself does not invent calendar slots.',
    },
    {
      q: 'Is this Schema and FAQ Pack?',
      a: 'No. Schema FAQ puts answers on the page with markup. This product is a live chat bubble.',
    },
    {
      q: 'Is this AI Phone?',
      a: 'No. AI Phone is voice on the phone. This is chat on the website.',
    },
    {
      q: 'Do I have to buy Care?',
      a: 'No. Setup stands alone. Care is optional after the chat is live, only if you want ongoing FAQ and prompt refresh.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed chat and handoff are not delivered, we keep working at no extra cost until they are.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Answer the usual without inventing the rest',
  finalLine:
    'Pay once, approve what it may say, and have the usual questions answered at any hour.',
  proofKind: 'site-chat',
}

export const MEDIA_CLEAN_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price, one to two days, one site',
  h1Generic: 'Somebody uploaded photos straight off a phone and the site got slow again',
  h1Personal: (b: string) =>
    `${b}, somebody uploaded photos straight off a phone and the site got slow again`,
  sub: 'A single full-size photo can weigh more than an entire page should. Add a gallery of them and a visitor on mobile data gives up before your site appears. We compress and replace the worst offenders on the pages you pick, then leave a one-page rule so the next person who uploads does not undo it.',
  ctaLabel: 'Clean my media, $650',
  proofLabel: 'The picture',
  proofHeadingLive: 'Fat files undo the speed win',
  proofHeadingGeneric: 'Fat files undo the speed win',
  proofLead: (b: string | null) =>
    b
      ? `${b} can look finished and still ship phone photos that crush mobile load.`
      : 'A site can look finished and still ship phone photos that crush mobile load.',
  proofLeadGeneric:
    'A beautiful photo at the wrong size undoes part of a speed win. Galleries and blogs are the usual culprits.',
  proofAfter:
    'Scoped media cleaned, with a short rule for what you upload next.',
  proofAfterGeneric:
    'Scoped media cleaned, with a short rule for what you upload next.',
  painLabel: 'What this is costing you',
  painHeading: 'The score slipped again',
  painLines: [
    'Somebody uploaded photos straight off a phone, at full size, because nothing told them not to.',
    'A gallery loads every image at once, so the page crawls on a phone.',
    'You paid to make the site fast, then new banners went up and it crept back.',
    'Nobody knows which files are safe to compress, so nobody touches any of them.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'A focused media clean',
  bridgeBody:
    'This is not a redesign and it is not an infinite media project. It is hygiene on up to eight pages or two folders, then a one-page upload guide for your team.',
  bridgeGaugeCaption: 'Lighter files. Same story.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Protect the speed win',
  benefits: [
    {
      title: 'The pages load properly again',
      text: 'Especially on a phone on mobile data, which is where most people give up.',
    },
    {
      title: 'It stops coming back',
      text: 'Your team gets one plain rule for what size to upload, so the next photo does not undo the work.',
    },
    {
      title: 'The photos still look right',
      text: 'We compress and resize carefully. Nobody visiting the site will be able to tell, except that it arrives faster.',
    },
    {
      title: 'A small job with an end',
      text: 'The pages or folders are agreed at kickoff, so it finishes in a day or two and stays finished.',
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Find, clean, leave a rule',
  processSteps: [
    {
      label: 'Find',
      text: 'Heaviest offenders on the scoped pages or folders.',
    },
    {
      label: 'Clean',
      text: 'Compress, resize, replace where needed.',
    },
    {
      label: 'Rule',
      text: 'One-page upload guide for your team.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'What ships in the clean',
  stackItems: [
    {
      title: 'Media audit',
      text: 'What is costing you on the scoped set.',
    },
    {
      title: 'Clean pass',
      text: 'Heavy files compressed or replaced.',
    },
    {
      title: 'Upload guide',
      text: 'Plain rules so it does not bounce back.',
    },
    {
      title: 'Scope lock',
      text: 'Up to eight pages or two folders at kickoff.',
    },
  ],
  scopeLine:
    'One site. Up to eight pages or two folders, chosen at kickoff. Not Website Speed Fix, not a full redesign, not endless gallery cleanup.',
  priceLabel: 'Investment',
  price: '$650',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the agreed pages are cleaned and lighter, or we keep working at no extra cost until they are.',
  priceAnchor:
    'This is the smallest job we sell, and when heavy images are the whole problem it is the only one you need. A day or two of work instead of a full speed overhaul, and the upload rule is what stops you buying either one again.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why is this only $650?',
      a: 'Because it is a day or two on a defined set of pages, and we would rather sell you the small job that fixes it than a full speed overhaul you did not need. If the problem turns out to be bigger than images, we tell you before you pay.',
    },
    {
      q: 'Is this Website Speed Fix?',
      a: 'No. Speed Fix is the full speed overhaul. This pack is media only on a scoped set of pages or folders.',
    },
    {
      q: 'Do I need Speed Fix first?',
      a: 'No. It pairs well after Speed Fix, and it also stands alone when the problem is clearly heavy images.',
    },
    {
      q: 'What if I need more than eight pages?',
      a: 'We quote extras the same day. The $650 lock is eight pages or two folders.',
    },
    {
      q: 'Will you rebuild my galleries?',
      a: 'No. We clean weight and leave upload rules. Gallery redesign is a different job.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the agreed media clean is not delivered, we keep working at no extra cost until it is.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Keep the site light after the win',
  finalLine:
    'Pay once, pick the pages, and get them loading properly again within a day or two.',
  proofKind: 'media-clean',
}

import {A11Y_PASS_COPY as A11Y_PASS_LIVE} from './liveCopy/a11y-pass'
import {WHATSAPP_SETUP_COPY as WHATSAPP_SETUP_LIVE} from './liveCopy/whatsapp-setup'
import {DM_REPLY_COPY as DM_REPLY_LIVE} from './liveCopy/dm-reply'
import {QUOTE_FOLLOWUP_LIVE_COPY as QUOTE_FOLLOWUP_LIVE} from './liveCopy/quote-followup'
import {QUOTE_CAPTURE_LIVE_COPY as QUOTE_CAPTURE_LIVE} from './liveCopy/quote-capture'
import {FEEDBACK_REVIEW_LIVE_COPY as FEEDBACK_REVIEW_LIVE} from './liveCopy/feedback-review'
import {NOSHOW_RESCUE_LIVE_COPY as NOSHOW_RESCUE_LIVE} from './liveCopy/noshow-rescue'
import {INTAKE_FORMS_LIVE_COPY as INTAKE_FORMS_LIVE} from './liveCopy/intake-forms'
import {INBOX_TRIAGE_LIVE_COPY as INBOX_TRIAGE_LIVE} from './liveCopy/inbox-triage'
import {SOP_PLAYBOOK_LIVE_COPY as SOP_PLAYBOOK_LIVE} from './liveCopy/sop-playbook'
import {DASHBOARD_LITE_LIVE_COPY as DASHBOARD_LITE_LIVE} from './liveCopy/dashboard-lite'
import {BUNDLE_SPEED_NEXT_LIVE_COPY as BUNDLE_SPEED_NEXT_LIVE} from './liveCopy/bundle-speed-next'
import {BUNDLE_FRONT_DOOR_LIVE_COPY as BUNDLE_FRONT_DOOR_LIVE} from './liveCopy/bundle-front-door'
import {FOUND_BOOKED_LIVE_COPY as FOUND_BOOKED_LIVE} from './liveCopy/found-booked'
import {CATCH_THE_LEAD_LIVE_COPY as CATCH_THE_LEAD_LIVE} from './liveCopy/catch-the-lead'
import {CALL_AND_BOOK_LIVE_COPY as CALL_AND_BOOK_LIVE} from './liveCopy/call-and-book'
import {MAPS_TRUST_LIVE_COPY as MAPS_TRUST_LIVE} from './liveCopy/maps-trust'
import {FULL_DIARY_LIVE_COPY as FULL_DIARY_LIVE} from './liveCopy/full-diary'
import {GET_FOUND_LIVE_COPY as GET_FOUND_LIVE} from './liveCopy/get-found'
import {GET_FOUND_FULL_LIVE_COPY as GET_FOUND_FULL_LIVE} from './liveCopy/get-found-full'
import {QUOTE_PATH_LIVE_COPY as QUOTE_PATH_LIVE} from './liveCopy/quote-path'
import {GEO_LIVE_COPY} from './liveCopy/geo'
import {CLIENT_FINDER_LIVE_COPY} from './liveCopy/client-finder'

export function funnelCopyForSlug(slug: string | undefined): FunnelProductCopy {
  if (slug === 'a11y-pass') return A11Y_PASS_LIVE
  if (slug === 'whatsapp-setup') return WHATSAPP_SETUP_LIVE
  if (slug === 'dm-reply') return DM_REPLY_LIVE
  if (slug === 'quote-followup') return QUOTE_FOLLOWUP_LIVE
  if (slug === 'quote-capture') return QUOTE_CAPTURE_LIVE
  if (slug === 'feedback-review') return FEEDBACK_REVIEW_LIVE
  if (slug === 'noshow-rescue') return NOSHOW_RESCUE_LIVE
  if (slug === 'intake-forms') return INTAKE_FORMS_LIVE
  if (slug === 'inbox-triage') return INBOX_TRIAGE_LIVE
  if (slug === 'sop-playbook') return SOP_PLAYBOOK_LIVE
  if (slug === 'dashboard-lite') return DASHBOARD_LITE_LIVE
  if (slug === 'bundle-clinic' || slug === 'catch-the-lead') return CATCH_THE_LEAD_LIVE
  if (slug === 'bundle-speed-next') return BUNDLE_SPEED_NEXT_LIVE
  if (slug === 'bundle-front-door') return BUNDLE_FRONT_DOOR_LIVE
  if (slug === 'found-booked') return FOUND_BOOKED_LIVE
  if (slug === 'call-and-book') return CALL_AND_BOOK_LIVE
  if (slug === 'maps-trust') return MAPS_TRUST_LIVE
  if (slug === 'full-diary') return FULL_DIARY_LIVE
  if (slug === 'get-found') return GET_FOUND_LIVE
  if (slug === 'get-found-full') return GET_FOUND_FULL_LIVE
  if (slug === 'quote-path') return QUOTE_PATH_LIVE
  if (slug === 'geo') return GEO_LIVE_COPY
  if (slug === 'client-finder') return CLIENT_FINDER_LIVE_COPY
  if (slug === 'media-clean') return MEDIA_CLEAN_COPY
  if (slug === 'site-chat') return SITE_CHAT_COPY
  if (slug === 'tracking-forms') return TRACKING_FORMS_COPY
  if (slug === 'schema-faq') return SCHEMA_FAQ_COPY
  if (slug === 'onpage-search') return ONPAGE_SEARCH_COPY
  if (slug === 'conversion-pass') return CONVERSION_PASS_COPY
  if (slug === 'local-pack') return LOCAL_PACK_COPY
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
  return SPEED_FIX_COPY
}
