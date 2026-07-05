import type { BtwPage } from '../types'
import { closing, flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch08Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 8,
    title: 'Getting found, by people and by machines',
    subtitle: 'Readable, relevant, trusted — for search engines and assistants.',
  }),

  flow(
    ...p(
      'A beautiful, fast, honest store is worth very little if nobody arrives. Getting found is how buyers reach you, and for a store the question has just split in two, because the path to your products now runs through two kinds of finder: the search engines people type into, and the assistants people talk to. This chapter covers both, in plain terms, ending with the monthly rhythm that keeps you visible. The encouraging headline first: the work overlaps almost completely, and it is mostly the honest completeness this book has been building all along.',
    ),
    ...section(
      'HOW IT WORKS',
      'How getting found works now',
      ...p(
        'Every system that sends buyers to stores, search engines, shopping surfaces, AI assistants, is trying to do the same thing: show the asker the most relevant, trustworthy answer to what they want. Being found is the work of becoming that answer, and the same three conditions hold here as anywhere: readable, so the systems can understand exactly what you sell; relevant, so what you sell matches what is being asked; trusted, so you are chosen over the alternatives. The stages that follow build each in turn, with the store-specific twists that matter.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch08-three-stages',
        caption:
          'The three stages of getting found, store edition. STAGE 1 READABLE (the catalogue as data, the feed, structured products), STAGE 2 RELEVANT (product, collection and guide content), STAGE 3 TRUSTED (reviews, consistency, kept promises, credible mentions).',
      },
    ),
  ),

  flow(
    ...section(
      'STAGE ONE',
      'Stage one: the readable store',
      ...p(
        'The foundation is technical and mostly done once, and for a store the centre of it is the catalogue as data. Every product carries complete attributes and honest availability. Structured data marks up every product page, price, stock, ratings, identifiers, so that the facts of your products are machine-readable rather than trapped in pictures. Your product feed, the structured export of the whole catalogue, flows to the shopping surfaces where products get compared. Titles and descriptions on every page, clean structure, fast pages, images described in words. None of this is visible to a browsing human, and all of it determines whether you exist to the systems doing the finding, which is why chapter two called the catalogue an asset: this is where it pays.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch08-feed-is-store',
        caption:
          'For a machine, the feed is the store. LEFT, a beautiful storefront labelled "what the person sees". RIGHT, a structured data sheet (rows: name, price, stock, size, delivery) labelled "what the machine sees". An assistant icon reading only the right side. Footer: "Both must be true. Only one of them is read by the systems doing the choosing."',
      },
    ),
  ),

  flow(
    ...section(
      'STAGE TWO',
      'Stage two: the relevant store',
      ...p(
        'Relevance is the ongoing work, and for a store it has a shape of its own. People search for products, which your product pages answer, and for categories, which your collection pages answer, and for questions, which is where a store\'s content earns its keep: the buying guides, the comparisons, the how-to-choose pieces that meet a buyer while they are still deciding. Write them the way this whole series teaches, the direct answer near the top, plain language, genuinely useful, because that opening answer is exactly what a search engine excerpts and an assistant lifts. And keep the catalogue itself relevant: seasonal ranges current, new products fully described on arrival, discontinued ones retired properly. A store that publishes one genuinely helpful buying guide a month has, in a year, built a dozen new doors, each one open permanently.',
      ),
    ),
    ...section(
      'STAGE THREE',
      'Stage three: the trusted store',
      ...p(
        'Trust is the slowest stage and the strongest moat, and for a store it is built from evidence: a steady flow of real reviews, gathered on the system from chapter five; consistent business details everywhere you appear; delivery and returns promises that the record shows you keep; and mentions and links from credible places, suppliers listing their stockists, publications covering your products, communities you genuinely serve. It cannot be rushed or bought without doing more harm than good, and it compounds: trust, once earned, is what every competitor has to overtake the slow way.',
      ),
    ),
  ),

  flow(
    ...section(
      'ASSISTANTS',
      'Found by assistants: the new front door',
      ...p(
        'Now the layer that is new, and it changes what winning looks like. Increasingly, a buyer does not search and compare, they ask, and an assistant does the comparing, reading the stores, weighing the options, and answering with a recommendation, sometimes completing the purchase without the buyer ever seeing a website. Being the store the assistant names is becoming as valuable as ranking ever was, and the factors it weighs are exactly the ones this book has been assembling: complete product data it can trust, honest availability, plain policies it can read certainty from, real reviews, competitive delivery. Assistants are strict shoppers, they skip the incomplete and the stale without a second look, and they cross-check your claims against the wider web, which means the trust stage feeds this too.',
        'The practical posture: do everything in stages one to three properly, answer questions in plain sentences on your pages, and your store is, by the same work, legible to the machines. There is no separate dark art, only completeness with the lights on.',
      ),
    ),
  ),

  flow(
    ...realPicture({
      title: 'Ranked, cited, transacted',
      paragraphs: [
        'There is a shift underneath all this worth understanding plainly, because it changes what getting found even means for a store, and it is where a lot of retailers are about to be caught out.',
        'For twenty years the game was ranked: appear high on the page of links, earn the click, make the sale on your site, and see all of it in your analytics. Then the game added cited: an assistant answers a buyer\'s question and names you, no click, no visit, your name placed at the deciding moment, invisible to your dashboards. Now comes the third step, transacted: the buyer asks, the assistant recommends, and the purchase completes inside the conversation, the payment handled, the order arriving in your systems from a channel your analytics barely describe. Each step is real today, and each moves more of the buying journey somewhere you cannot watch.',
        'This creates an honest new difficulty: the store can be winning and the dashboards can show nothing. The browsing, the comparing, the deciding, all of it can now happen inside an assistant, with only the final order surfacing, so the usual instruments, traffic, sessions, funnels, quietly stop describing reality. Knowing where you actually stand starts to mean new habits: asking the assistants yourself what they recommend in your categories, watching for orders that arrive without a visit attached, and treating your product data feed with the seriousness you once reserved for your home page, because for a machine, the feed is the store.',
        'And none of it is a one-time fix. The systems choosing who gets recommended change constantly, the standards connecting stores to assistants are young and moving, and a presence that was strong a year ago fades quietly if untended. We say this not to alarm but to be straight about the ground: the store that keeps its data complete, its promises measurable, and its reputation real is positioned for whichever version of this future firms up, because every version rewards the same thing, a store machines can verify.',
      ],
    }),
    {
      type: 'diagram',
      id: 'bts-ch08-ranked-cited-transacted',
      caption:
        'Ranked, cited, transacted. PANEL 1 "RANKED": a list of links, a hand clicking, "you earn the click". PANEL 2 "CITED": an assistant\'s answer naming a store, no click, "you earn the mention". PANEL 3 "TRANSACTED": the purchase completing inside the conversation, an order arriving at the store from outside the frame, "the buying happens where you cannot see".',
    },
  ),

  flow(
    ...section(
      'LOCAL',
      'Your merchant profile, and the local layer',
      ...p(
        'For stores with a local dimension, a shopfront, local delivery, pickup, the business profile on the map remains one of the hardest-working assets you have, with a store-specific addition: products can appear on the profile itself, putting your actual stock in front of people searching nearby with intent to buy today. The disciplines are the same as everywhere: complete, current, photographed, reviewed, and consistent with your details everywhere else, because consistency is part of how trust is machine-measured.',
      ),
    ),
    ...section(
      'EVERY MONTH',
      'The monthly rhythm',
      ...p(
        'The whole of it, reduced to a rhythm.',
      ),
    ),
  ),

  flow(
    {
      type: 'checklist',
      title: 'Monthly rhythm',
      items: [
        'Publish one genuinely useful piece: a buying guide, a comparison, an answer to a question buyers actually ask.',
        'Load every new product completely: attributes, images, plain-language answer to what it is for.',
        'Verify the feed and stock truth: what the machines see matches what the shelf holds.',
        'Ask one or two happy recent customers for a review, and reply to every review received.',
        'Refresh anything stale: seasonal pages, featured ranges, dated promotions.',
        'Check your business details are identical everywhere they appear.',
        'Ask the main assistants what they recommend in your categories, and note whether you are named.',
        'Read the search terms buyers used on your own store, and act on the ones that found nothing.',
        'Fix any broken links, dead pages or errors that have appeared.',
      ],
    },
    ...p(
      'A store that does this every month, without fail, is easier to find a year from now than it is today, by people and by machines alike. It is not complicated. It has to be done, and kept up, which is the part that catches most owners out, and the part most worth help with if consistency alone is the obstacle.',
    ),
  ),

  flow(
    ...closing(
      'In short',
      ...p(
        'Getting found brings buyers to the door, and increasingly brings the door to the buyers. What happens next, how the store connects to everything behind it so that orders, stock, money and customers flow without anyone carrying them by hand, is where the machine becomes a business. That is chapter nine, and it ties the whole book together.',
      ),
    ),
  ),
]
