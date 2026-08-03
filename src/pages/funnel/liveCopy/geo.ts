import type {FunnelProductCopy} from '../funnelCopy'

/** Live upgrade of GEO_COPY: buy-ready, no Coming soon. */
export const GEO_LIVE_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed once scoped · AI answers · Citations',
  h1Generic:
    'Your competitors are starting to show up in AI answers. You are still only fighting for the old search page',
  h1Personal: (b: string) =>
    `${b}, your competitors are starting to show up in AI answers. You are still only fighting for the old search page`,
  sub: "People ask ChatGPT, Perplexity, and Google's AI answers what to buy and who to call. If your pages are thin, messy, or hard to cite, those tools skip you. We structure facts, FAQs, and service pages so AI tools can name you. Not magic. Not fake reviews.",
  ctaLabel: 'Start AI visibility · $2,200',
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
    "This isn't a promise that ChatGPT will pick you every time, and it isn't fake reviews or spam. It's practical work: clear service pages, FAQ schema (structured Q&A markup search and AI tools can read), and facts written so generative answers have something solid to quote. It sits beside Search Visibility Fix and Content System when you need those, and it can stand alone when your index and content are already fine.",
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
    'Buy floor $2,200. Fixed once scoped. We do not sell fake reviews, bought citations, or guaranteed placement inside any AI product.',
  priceLabel: 'Investment',
  price: '$2,200',
  priceLead: 'Paid once when the page and schema scope locks at kickoff.',
  guarantee:
    'We deliver the scoped page and schema work. We do not guarantee that any AI product will cite you on a given day. If the agreed structural work is not delivered, we keep working at no extra cost until it is.',
  priceAnchor:
    'About the cost of staying invisible while competitors become the default name in AI answers.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you pay',
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
      a: 'Yes. Fill the access form, we lock the page and schema scope at kickoff, then build from the $2,200 floor.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Show up in the answers, not only the old results list',
  finalLine:
    'Structure the facts. Add FAQ schema where it helps. Stay honest about what AI tools decide.',
  proofKind: 'geo',
}
