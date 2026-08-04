import type {FunnelProductCopy} from '../funnelCopy'

/** Live upgrade of GEO_COPY: buy-ready, no Coming soon. */
export const GEO_LIVE_COPY: FunnelProductCopy = {
  eyebrow: 'Fixed price, scope agreed at kickoff',
  h1Generic:
    "Your competitors are starting to show up in AI answers. You're still only fighting for the old search page",
  h1Personal: (b: string) =>
    `${b}, your competitors are starting to show up in AI answers, and you're still only fighting for the old search page`,
  sub: "A customer now asks ChatGPT or Google's AI answer who to call, and gets three names back. If your pages are thin, vague, or contradict each other, you're not one of them. We rewrite and structure your service pages, facts and FAQs so those tools have something solid to quote. No magic, no fake reviews, no guarantees anyone else pretends to make.",
  ctaLabel: 'Start AI visibility, $2,200',
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
  benefitsHeading: 'A real chance of being the name that comes back',
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
    'Fixed price, with the page and schema list agreed at kickoff. We do not sell fake reviews, bought citations, or guaranteed placement inside any AI product.',
  priceLabel: 'Investment',
  price: '$2,200',
  priceLead: 'Paid once, and we start. No quotes, no meetings, no scope creep.',
  guarantee:
    'Our promise: the agreed page and schema work is delivered, or we keep working at no extra cost until it is. What we will not promise is that a particular AI product will name you on a particular day, because nobody controls that.',
  priceAnchor:
    'Put it beside what you already spend each year trying to rank on a page fewer people bother scrolling. This is the same job, aimed at where people are starting to ask instead, done once, on pages you own and keep.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'Why does this cost $2,200?',
      a: 'Because it is real writing and structural work across your service pages, not a plugin you install. Most of the cost is the part nobody enjoys: getting your facts straight, consistent and specific enough that a machine can quote them without guessing.',
    },
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
      q: 'How soon can we start?',
      a: 'As soon as you pay. You fill in the access form, we agree the page and schema list at kickoff, and the work starts from there.',
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Show up in the answers, not only the old results list',
  finalLine:
    'Structure the facts. Add FAQ schema where it helps. Stay honest about what AI tools decide.',
  proofKind: 'geo',
}
