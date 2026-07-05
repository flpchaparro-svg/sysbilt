import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch05Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 5,
    title: 'Your features',
    subtitle: 'Each feature is a small machine with a job to do.',
  }),

  flow(
    ...p(
      'This is the chapter you will come back to. A store is built from features, and each one is a small machine with a job: win the sale, grow the order, or bring the customer back. Most stores treat features as boxes to tick. We treat every feature as a worker that has to earn its place, and the shift this book opened with is exactly what has made these workers affordable, capabilities that were enterprise retail only a few years ago now switch on in an afternoon.',
      'For each feature, the same four things: what it is, what it does for your sales, how you use it day to day, and where it can grow next. You will not need all of them. Take the ones that fit how your store wins, and leave the rest.',
    ),
    { type: 'featureIntro' },
    {
      type: 'diagram',
      id: 'bts-ch05-four-ways',
      caption:
        'Every feature, four ways. A single feature card split into four labelled parts: WHAT IT IS / WHAT IT DOES / HOW YOU USE IT / WHERE IT GROWS. Placed once so the reader recognises the rhythm of every feature that follows.',
    },
    {
      type: 'diagram',
      id: 'bts-ch05-journey-map',
      caption:
        'The features, mapped to the journey. A four-stage buyer journey left to right: DISCOVER (search, filters, finders and quizzes), DECIDE (reviews, chat, payment options), BUY (checkout, cart recovery, BNPL), RETURN (post-purchase flows, subscriptions, loyalty, back-in-stock, win-back).',
    },
  ),

  flow(
    {
      type: 'featureCard',
      title: 'Search and filtering',
      what: 'On-site search is the express lane for buyers who know what they want, and those buyers convert at multiples of the browsers.',
      does: 'Done properly, it forgives typos, understands synonyms, and returns products, not pages. Filtering does the same job for the undecided, narrowing by the things buyers actually care about.',
      use: 'You use it by watching what people search for, because the searches with no results are a live list of what your customers want and cannot find, which is some of the cheapest product research a store ever gets.',
      next: 'From here, search can learn, ranking what converts rather than what merely matches.',
    },
    {
      type: 'featureCard',
      title: 'Reviews, as a system',
      what: 'Reviews are the single most persuasive element on a product page, and left to chance they dry up.',
      does: 'Treated as a system, every completed order triggers a review request at the right moment, after delivery, when satisfaction peaks, and the reviews flow back onto the product pages where doubt lives. Photo reviews are worth actively inviting, because a customer\'s photo is proof no studio shot can match.',
      use: 'You use it by replying, especially to the critical ones, calmly and helpfully, because future buyers read your replies as a preview of how you will treat them.',
      next: 'From here, reviews feed your structured data, so the stars appear where machines and search results show them, and never, ever fake one, which chapter seven makes plain is both ruinous and unlawful.',
    },
  ),

  flow({
    type: 'featureCard',
    title: 'Abandoned cart recovery',
    what: 'Most carts are abandoned. That is not failure, it is shopping, people compare, get interrupted, wait for payday.',
    does: 'Recovery is the feature that follows up: a reminder an hour later, another the next day, each with a direct link back to the waiting cart. Done in a helpful register, you left these behind, here they are, it recovers a meaningful slice of sales that were otherwise gone, and it is usually the single highest-return automation a store runs.',
    use: 'You use it by letting it run and keeping the tone service, not pressure.',
    next: 'From here it can grow smarter: including the answer to the doubt that likely stalled them, shipping cost, returns ease, or a nudge only when stock is genuinely low.',
  }),

  flow({
    type: 'diagram',
    id: 'bts-ch05-cart-recovery',
    caption:
      'Recovering the cart. A timeline. Cart abandoned (0h) → gentle reminder (1h) → second nudge with the doubt answered (next day) → "Recovered sale" endpoint. Below, a faded alternative line: "No follow-up: sale gone." Tone labels on the arrows: "service, not pressure".',
  }),

  flow(
    {
      type: 'featureCard',
      title: 'Email and SMS flows',
      what: 'Beyond the cart sit the other automatic conversations: the welcome series for new subscribers, the post-purchase sequence that confirms, reassures and teaches, the win-back for customers who have gone quiet, the review request.',
      does: 'These run on triggers, not calendars, which is what makes them work: each message arrives because of something the customer did, so it lands as relevant rather than as noise.',
      use: 'You use them by writing each flow once, well, in your voice, and reviewing quarterly.',
      next: 'From here, segmentation sharpens everything, first-time buyers hear different things from loyal ones, and the permission rules from chapter seven apply to every message: consent, identity, easy exit.',
    },
    {
      type: 'featureCard',
      title: 'Upsells and bundles',
      what: 'The cheapest sale to grow is the one already happening. Upsells offer the better version at the decision moment; cross-sells suggest what goes with it; bundles package the natural combination at a sensible saving.',
      does: 'The line that keeps these premium rather than pushy is relevance: suggest what a knowledgeable shop assistant would genuinely suggest, and nothing else.',
      use: 'You use them by wiring the pairings once and reviewing what actually gets taken.',
      next: 'From here, the suggestions can learn from real buying patterns, surfacing the combinations your customers invented themselves.',
    },
  ),

  flow(
    {
      type: 'featureCard',
      title: 'Subscriptions and reorder',
      what: 'For anything consumed and repurchased, coffee, skincare, supplies, filters, subscription is the difference between selling once and selling steadily, and one-tap reorder serves the customers who want convenience without commitment.',
      does: 'The value is not just the repeat revenue but its predictability, which changes how confidently you can buy stock and plan.',
      use: 'You use it by making pausing and cancelling genuinely easy, because friction there kills trust and reviews, and easy exits paradoxically keep subscribers longer.',
      next: 'From here, subscriber-only perks give the loyal a reason to stay that is warmer than a discount.',
    },
    {
      type: 'featureCard',
      title: 'Back-in-stock and wishlist',
      what: 'When a product is unavailable, the difference between a dead end and a captured sale is one button: notify me. The back-in-stock alert converts disappointment into a queue of ready buyers who asked to be told, and the wishlist does the same for not yet: it lets intent be saved instead of lost.',
      does: 'Both quietly double as intelligence, showing you exactly which products to restock first and how much silent demand exists.',
      use: 'You use them by honouring them fast, the alert goes out the moment stock lands, because these are the warmest emails a store ever sends.',
      next: 'From here, the queue data tells you what to reorder before the spreadsheet does.',
    },
  ),

  flow({
    type: 'diagram',
    id: 'bts-ch05-back-in-stock',
    caption:
      'The back-in-stock queue. A sold-out product with a "Notify me" button, an arrow to a short queue of waiting buyer icons, then an arrow labelled "stock lands" to "warmest email the store sends" and a purchase. Second small note: the queue itself labelled "free demand data".',
  }),

  flow(
    {
      type: 'featureCard',
      title: 'Live chat with AI handoff',
      what: 'A buyer with a question is a sale in the balance, and chat answers at the moment of doubt: sizing, delivery, will this fit my situation.',
      does: 'A well-built assistant handles the routine instantly at any hour, in your voice, and hands to a human the moment judgment or empathy is needed.',
      use: 'You use it by reviewing the conversations, because the questions people ask are a running audit of what your product pages failed to answer, and each fix converts silently forever after.',
      next: 'Building assistants properly is a discipline of its own with its own guide; on the store, the job is answer, help, capture, hand over.',
    },
    {
      type: 'featureCard',
      title: 'Payment options and buy-now-pay-later',
      what: 'Every payment method a buyer expects and does not find is friction at the worst moment.',
      does: 'The modern baseline is cards through a proper provider, the phone wallets that make mobile checkout one touch, and, where it fits the products and the customer, buy-now-pay-later. On that last one, be deliberate rather than automatic: it lifts conversion and order size for considered purchases, it carries its own costs, and it suits some brands and price points better than others.',
      use: 'You use payments by keeping the options current and the checkout uncluttered, offering the few that matter rather than a wall of logos.',
      next: 'From here, watch which methods your buyers actually choose and trim the rest.',
    },
  ),

  flow(
    {
      type: 'featureCard',
      title: 'Click-to-message',
      what: 'Some buyers will never fill a form but will happily fire off a one-line message. A tap-to-WhatsApp or SMS button meets them on the channel they live in.',
      does: 'A message is a conversation, and a conversation is a sale in progress.',
      use: 'You use it by replying fast and by making sure those conversations land in the same system as every other enquiry, so a message becomes a tracked lead rather than a thread lost in someone\'s phone.',
      next: 'From here, those threads can feed the same customer record as every other channel.',
    },
    {
      type: 'featureCard',
      title: 'Loyalty and gift cards',
      what: 'Loyalty gives your best customers a reason to concentrate their buying with you, and gift cards do two jobs: they let your customers recruit new ones, and they smooth revenue into seasons.',
      does: 'Loyalty works when it is simple, generous enough to feel real, and framed as recognition rather than mechanics.',
      use: 'You use loyalty by keeping it effortless, points that apply themselves, rewards that are actually wanted, and you resist the temptation to make it a puzzle.',
      next: 'From here, loyalty data becomes the map of who your best customers actually are, which is worth more than the points cost.',
    },
  ),

  flow(
    {
      type: 'featureCard',
      title: 'Product finders and quizzes',
      what: 'For stores where choosing is the hard part, which formulation, which size, which model, a short guided quiz turns confusion into confidence: three or four questions, then a recommendation with reasons.',
      does: 'It converts because it recreates the best thing about a great shop assistant, and it qualifies because every answer teaches you what this buyer needs.',
      use: 'You use it by delivering the recommendation, and offering to send it, capturing the buyer who is not ready today.',
      next: 'From here, quiz answers can personalise everything that follows.',
    },
    {
      type: 'featureCard',
      title: 'Personalisation and dynamic content',
      what: 'A store that adapts converts better than one that greets everyone identically: the returning visitor sees what is new since last time, the buyer arriving from an ad about one range lands on that range, recommendations reflect what this person actually browses and buys.',
      does: 'None of it requires the visitor to do anything, and all of it makes the store feel like it remembers, which is what good shops have always done.',
      use: 'You set the rules once and let them run.',
      next: 'It is an advanced layer, not a day-one requirement, and it compounds every other feature once the foundations are earning.',
    },
  ),

  flow(
    {
      type: 'featureCard',
      title: 'Speed to first purchase',
      what: 'The last feature is the sum of the others, less a thing you see than a result you feel: the total distance from arriving to owning.',
      does: 'Every feature in this chapter either shortens that distance or lengthens it, and the discipline is to keep asking the only question that matters at each step: does this help someone buy, or is it in the way?',
      use: 'You use it by reviewing the path regularly, from first landing to paid, and cutting anything that does not earn its place.',
      next: 'A store tuned this way feels effortless to buy from, and effortless is what wins when everyone is one tab away.',
    },
  ),

  flow(
    ...section(
      'CHOOSING',
      'Choosing what you actually need',
      ...p(
        'That is the toolkit. The skill is choosing the few that fit how your store wins, building those properly, and leaving the rest, because a handful of features working well will always beat a store wearing every option and mastering none. Once the right features are in place, the question becomes how you run the machine, which is where we go next.',
      ),
    ),
  ),
]
