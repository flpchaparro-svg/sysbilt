import type { BtwPage } from '../types'
import { flow, opener, p, section, glossary } from '../../built-to-work/helpers'

export const ch12Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 12,
    title: 'Glossary, and who to call',
    subtitle: 'Plain meanings — plus who to talk to when you are ready.',
  }),

  flow(
    ...p(
      'This last chapter is a reference rather than a read. E-commerce has more jargon per square metre than almost any corner of business, and this book has tried to keep it outside. Here is the plain meaning of the terms worth knowing, followed by a short note on ongoing support and an honest invitation.',
    ),
    ...glossary(
      {
        title: 'A plain-English glossary',
        intro: 'The terms worth knowing plainly, so you are never left nodding along to something you do not follow.',
      },
      [
        {
          term: 'Abandoned cart',
          definition:
            'A cart a shopper filled and left without paying. Normal shopping behaviour, and recoverable with a well-timed reminder.',
        },
        {
          term: 'AOV (average order value)',
          definition:
            'The average amount spent per order. One of the three levers of store growth, alongside traffic and conversion.',
        },
        {
          term: 'Agentic commerce',
          definition:
            'Purchases made by an AI assistant on a shopper\'s behalf, sometimes completed entirely inside the conversation. The reason your product data now sells.',
        },
        {
          term: 'BNPL (buy now, pay later)',
          definition:
            'Payment services that split a purchase into instalments. A conversion lift for considered purchases, with costs and fit worth weighing deliberately.',
        },
        {
          term: 'Chargeback',
          definition:
            'A card payment reversed after the cardholder disputes it with their bank. Contested with evidence, inside deadlines, which is why clean records win.',
        },
        {
          term: 'Checkout',
          definition: 'The pages where a buyer pays. The most valuable and most fragile metres in the store.',
        },
        {
          term: 'Collection page',
          definition:
            'A page listing a category of products. The store\'s aisle, and a landing page in its own right.',
        },
        {
          term: 'Conversion rate',
          definition: 'The share of visitors who buy. The measure of how well the store turns attention into orders.',
        },
        {
          term: 'Feed (product feed)',
          definition:
            'A structured export of your whole catalogue that shopping surfaces and assistants ingest. For a machine, the feed is the store.',
        },
        {
          term: 'Fulfilment',
          definition: 'Everything between the order and the doorstep: picking, packing, dispatch, delivery.',
        },
        {
          term: 'Gateway (payment gateway/provider)',
          definition:
            'The specialist service that carries the payment. Card details go to them, not to you, and that is the correct design.',
        },
        {
          term: 'Guest checkout',
          definition:
            'Buying without creating an account. Offering it removes one of the biggest reasons carts get abandoned.',
        },
        {
          term: 'Inventory sync',
          definition:
            'The wiring that keeps stock levels agreeing everywhere you sell, so the last unit is never sold twice.',
        },
        {
          term: 'Marketplace',
          definition: 'A platform where many sellers list side by side. Rented land with heavy foot traffic.',
        },
        {
          term: 'PCI (payment card security standard)',
          definition:
            'The global rules for handling card data. Met, for most stores, by never touching card numbers at all.',
        },
        {
          term: 'Pick and pack',
          definition: 'The fulfilment steps of retrieving the item and preparing it for dispatch.',
        },
        {
          term: 'Reconciliation',
          definition:
            'Checking that the store\'s money records and the payment provider\'s records agree. Continuous beats archaeological.',
        },
        {
          term: 'Returns (RMA)',
          definition:
            'The process for goods coming back. A trust signal in disguise, handled fast and honestly.',
        },
        {
          term: 'SKU',
          definition:
            'A unique code for each distinct product and variant. The label that lets every system talk about the same item.',
        },
        {
          term: 'Social commerce',
          definition:
            'Selling inside social platforms, from shoppable posts to live video. Discovery-rich rented land.',
        },
        {
          term: 'Structured data',
          definition:
            'Labelling on your pages that makes price, availability and reviews machine-readable facts. The store\'s handshake with every finder.',
        },
        {
          term: '3PL (third-party logistics)',
          definition:
            'An outside company that stores, picks, packs and ships for you. Fulfilment as a service.',
        },
        {
          term: 'Upsell / cross-sell',
          definition:
            'Offering the better version, or the natural companion, at the moment of decision. Premium when relevant, pushy when not.',
        },
        {
          term: 'Variant',
          definition:
            'A version of a product, size, colour, spec. Each one deserves complete data of its own.',
        },
        {
          term: 'Win-back',
          definition:
            'Reaching out to customers who have gone quiet, timed to their real buying cycle.',
        },
      ],
    ),
  ),

  flow(
    ...section(
      'NEXT STEP',
      'Who to call, and ongoing support',
      ...p(
        'A store is never finished, this book has said it from the first chapter, and the stores that keep earning are the ones that are kept: the background layer maintained, the data true, the content fresh, the channels wired into one hub, and someone who knows the particular system standing behind it, so that when something needs changing or something goes wrong, you are not explaining your business from scratch to a stranger.',
        'So here is the honest invitation. You have just read, in real detail, what a store that genuinely sells now looks like: built for two readers, owned outright, honest to the dollar, fast, lawful, findable by people and machines, and wired into a hub that runs the trading while you run the business. If, reading it, you saw your own store falling short, or you decided that building and running all of this properly is not how you want to spend your time, then it is worth a conversation.',
        'The place to start is a Store Systems Review. It is a straight, no-obligation look at your store measured against everything this book describes: where it is genuinely working, where it is quietly losing you sales, what the machines see when they read you, and what we would do about it, in the order that matters most. There is no pitch and no pressure in it. Either way, you come away with a clear, honest picture of where your store actually stands.',
        'If that would be useful, request your review at sysbilt.com/contact. Fill in the form and we will get back to you, and you will also receive an audit of your business, a clear read on where you stand right now and where the biggest gains are. Tell us you read Built to Sell, and we will walk you through a live example of the kind of connected store you have just read about, so you can see exactly how it works before you decide anything at all.',
        'Because a store built this way is not a project you commission once. It is a system you grow, and a partnership while you grow it. When you are ready for one that genuinely sells, we are ready to build it with you.',
      ),
    ),
  ),
]
