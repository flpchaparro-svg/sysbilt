import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch03Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 3,
    title: 'The anatomy of a product page that sells',
    subtitle: 'Every product page that earns money shares the same structure.',
  }),
  flow(
    ...p(
      'Every product page that earns money shares a structure, and once you can see it, you can look at any product page, yours or a competitor\'s, and tell within moments whether it was built to sell or just to display. This chapter gives you that eye, with the addition this era demands: a product page now has two readers, and it has to convince both.',
    ),
  ),
  flow(
    ...section(
      'THE SHAPE',
      'The shape of a page that sells',
      ...p(
        'A selling product page moves a buyer through four steps, in order, without them noticing the steps at all.',
        'First, the promise: the product shown and named so clearly that within seconds the visitor knows what it is and whether it is for them. Second, the proof: the photography, the details and the reviews that make the promise believable. Third, price clarity: the full cost, honestly presented, with shipping and delivery expectations visible before the checkout, not sprung inside it. Fourth, one clear action: an add-to-cart or buy button that is unmistakable, always reachable, and never competing with clutter. Most product pages that fail do so because they bury one of the four, usually the third, and a buyer who feels a cost was hidden does not just abandon the page. They remember.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch03-anatomy',
        caption:
          'The anatomy of a product page. A tall stylised product page with four stacked zones, top to bottom: PROMISE (product, name, who it is for), PROOF (photos, details, reviews), PRICE CLARITY (full cost, shipping, delivery window), ACTION (one unmistakable buy button). One short note beside each zone.',
      },
    ),
  ),
  flow(
    ...section(
      'TWO READERS',
      'The two readers',
      ...p(
        'Now the layer that is new. Every product page is read by a person deciding whether to buy, and increasingly by a machine deciding whether to recommend. The craft of the page serves the first. The completeness of the page serves the second. They are built together.',
        'For the person: photography that shows the product honestly and beautifully, in use and in scale, because online, the photos are the product. Copy that sells the outcome before the specification, in the buyer\'s language. Reviews close to the buy button, because doubt lives there. Answers to the obvious questions, sizing, materials, care, compatibility, on the page rather than a click away.',
        'For the machine: every attribute filled in, dimensions, weight, materials, colour, model, identifiers, none left blank because "the photo shows it," because a machine cannot see your photo the way a buyer can. Stock status that is true. Delivery times that are real. Structured data underneath, the labelling from the wider web applied to products, so that price, availability and reviews are machine-readable facts rather than pixels. A plain-language answer near the top to the question this product exists to solve, because that is the sentence an assistant lifts when someone asks it what to buy.',
        'Here is the discipline that makes this easy rather than endless: write the page as if answering a careful buyer\'s questions completely, and you will have served the machine without doing anything twice. Vague pages fail both readers. Complete ones win both.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch03-two-readers',
        caption:
          'Two readers, one page. The product page in the centre, with annotations on each side. LEFT column "THE PERSON reads": photography, outcome copy, reviews near the button, answered doubts. RIGHT column "THE MACHINE reads": complete attributes, true stock, real delivery times, structured data, the plain answer near the top. Bottom line: "Write for a careful buyer, and you have served both."',
      },
    ),
  ),
  flow(
    ...section(
      'THE WORDS',
      'The words that do the work',
      ...p(
        'People skim, and on a product page the few words that carry weight are the title, the first line, and the button. A title that says what the product actually is beats a clever name that says nothing, and the first line should sell the outcome in plain words. The button says what happens next: add to cart, buy now, nothing coy. The same rule extends to every small label on the page. Shipping calculated at checkout is a phrase that loses sales; free shipping over a stated amount, delivered in a stated window, wins them, because certainty is what a buyer is really purchasing at that moment.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch03-words',
        caption:
          'Words that lose, words that win. Two-column comparison. LEFT (greyed): "Submit", "Shipping calculated at checkout", "Learn more". RIGHT (bold): "Add to cart", "Free shipping over a stated amount, delivered in a stated window", "See how it fits".',
      },
    ),
  ),
  flow(
    ...section(
      'OPTIONS',
      'Options without confusion',
      ...p(
        'Products with variants, sizes, colours, bundles, are where good pages quietly die. The rule is that choosing must feel like narrowing, not like work: every option visible, unavailable combinations clearly marked rather than discovered at the error message, the price updating honestly as choices change, and the photo changing with the selection wherever it can. Every moment of confusion in the options is a percentage of buyers gone.',
      ),
    ),
  ),
  flow(
    ...section(
      'PHONE FIRST',
      'Built for the phone, built for speed',
      ...p(
        'Most buyers will meet your product on a phone, often mid-thought, and everything about phone-first design applies with money now attached: images that load instantly, buttons that thumbs can hit, a page that never makes the buyer pinch, zoom or wait. Speed on a product page is not a technical nicety, it is revenue, and we will treat it that way in chapter seven.',
      ),
    ),
    ...section(
      'THE PAYOFF',
      'What a great product page buys you',
      ...p(
        'Pull the pieces together and the return is plain. A page built this way earns the person\'s trust in seconds, answers the doubts before they harden, makes the full cost honest and the next step obvious, and hands the machines everything they need to recommend you with confidence. That is the template. The next question is which pages surround it, and that is chapter four.',
      ),
    ),
  ),
]
