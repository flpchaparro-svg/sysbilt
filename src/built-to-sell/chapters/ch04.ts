import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch04Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 4,
    title: 'Your pages',
    subtitle: 'Every page earns its place, or it costs you attention.',
  }),
  flow(
    ...p(
      'A store is a set of pages, and each one has a job. The trouble starts when pages accumulate because other stores have them, rather than because they earn their place. A store built to sell is lean: every page moves someone closer to an order or makes them more confident placing one, and anything that does not is costing you attention. This chapter is about which pages a store needs, what each is for, and the two humble pages that have quietly become some of the most important on the site.',
    ),
    {
      type: 'diagram',
      id: 'bts-ch04-page-jobs',
      caption:
        'What each page is really for. A grid of six page icons with one-line jobs: HOME "Establishes the promise, routes people". COLLECTIONS "The aisles, narrowing made easy". PRODUCT "Where the sale is won". CART + CHECKOUT "Where intent is fragile". SHIPPING + RETURNS "The new salespeople, read by buyers and machines". ABOUT + TRUST "Decides whether the rest gets believed".',
    },
  ),
  flow(
    ...section(
      'HOMEPAGE',
      'The home page: the shopfront, not the catalogue',
      ...p(
        'A store\'s home page has seconds to answer three questions: what do you sell, why buy it here, and where do I start. It is not the place to show everything, it is the place to establish the promise and route people, to the bestsellers, the categories, the offer of the season. Trust signals live here too, real reviews, clear delivery promises, the human evidence that this is a real business, because a first-time visitor is deciding whether to trust a stranger with their card details, and the home page is where that verdict starts forming.',
      ),
    ),
  ),
  flow(
    ...section(
      'COLLECTIONS',
      'Collection pages: the aisles',
      ...p(
        'Collection or category pages are the aisles of the store, and their job is to make narrowing effortless: sensible categories in the customer\'s language, filters that match how buyers actually choose (size, price, use, brand), and product tiles that carry enough information, image, name, price, availability, to compare without opening every page. A well-built collection page is also a landing page in its own right, because people search for categories as often as products, which makes the short piece of genuinely useful text on each collection page, what this range is, who it suits, how to choose, work twice: it helps the undecided buyer, and it tells the machines what this aisle contains.',
      ),
    ),
  ),
  flow(
    ...section(
      'CHECKOUT',
      'The cart and the checkout',
      ...p(
        'The cart is where intent becomes fragile, and the checkout is where most stores bleed. The principles are few and firm. The cart shows everything honestly: items, quantities, the shipping cost or a calculator for it, the total. The checkout asks for the minimum, allows guest checkout rather than demanding an account, shows a clear progress line, and never introduces a surprise, a new fee, a sudden requirement, a form that resets. Every extra field, every surprise, every second of doubt at this stage costs real money, because these are people who had already decided to buy. We return to recovering the ones who leave anyway in chapter five, but the first job is to stop giving them reasons.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch04-checkout-bleed',
        caption:
          'Where checkouts bleed. A horizontal funnel from CART to PAID with three labelled leak arrows dropping out between them: "Surprise fee appears", "Account forced", "Too many fields". The width visibly narrows at each leak. These were people who had already decided to buy.',
      },
    ),
  ),
  flow(
    ...section(
      'POLICIES',
      'Shipping, returns and policy pages: the new salespeople',
      ...p(
        'Here is the quiet promotion this era has handed to the humblest pages on the site. Shipping and returns pages used to be legal furniture, written once, read by almost no one. Now they are read constantly, by buyers deciding whether to risk you over a competitor, and by machines deciding whether to recommend you at all, because delivery certainty and returns friction are exactly the factors an assistant weighs when choosing between two stores selling the same thing.',
        'So write them like sales pages that happen to be true. Plain answers: what shipping costs, how long it takes, where you deliver, how returns work, who pays, how fast refunds land. No hedging, no dense paragraphs of conditions, no burying the answer. A store whose policies are clear, generous where it can afford to be, and stated in plain sentences is a store both readers can choose with confidence. And every promise on these pages must be true in practice, which is not only good business but the law, as chapter seven covers.',
      ),
    ),
  ),
  flow(
    ...section(
      'TRUST',
      'The about and trust pages',
      ...p(
        'People buy from people, and for a store competing on quality rather than price, the about page does more work than owners expect: the story, the faces, the reason this business exists, the evidence of craft. Alongside it sit the trust utilities, contact details that are easy to find (a store that hides its contact page looks like a store planning to disappear), the FAQ that answers the pre-purchase doubts, and the privacy policy handled properly. None of these pages sell directly. All of them decide whether the selling pages get believed.',
      ),
    ),
  ),
  flow(
    ...section(
      'LEAN',
      'The pages you do not need',
      ...p(
        'Everything beyond this set should justify itself. Pages nobody visits and nobody maintains dilute the store, and a stale page, last season\'s promotion, a discontinued range still showing, does worse than nothing, because in a store, stale reads as untrustworthy. When in doubt, fewer pages kept true will always outsell more pages left to age.',
      ),
    ),
  ),
]
