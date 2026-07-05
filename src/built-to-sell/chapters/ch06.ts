import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch06Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 6,
    title: 'Running it day to day',
    subtitle: 'The operating rhythm that keeps orders flowing and stock honest.',
  }),

  flow(
    ...p(
      'A store that works is a store that gets worked. Once yours is live, a handful of steady rhythms keep the orders flowing, the stock honest, and the customers coming back. None of it requires technical skill, and most of it, in a properly built store, is watching that the automatic things happened rather than doing them by hand. This chapter is the operating rhythm.',
    ),
    {
      type: 'diagram',
      id: 'bts-ch06-operating-rhythm',
      caption:
        'The operating rhythm. A simple cadence board: DAILY (orders out inside the promised window, exceptions handled, reviews and questions answered), WEEKLY (prices and seasonal content pass, stock spot-check), MONTHLY (test order with a real card, listening-loop review: what questions keep coming).',
    },
  ),

  flow(
    ...section(
      'FULFILMENT',
      'Orders and fulfilment: the promise-keeping machine',
      ...p(
        'Everything the store said before the sale, delivery times, stock, quality, is a promise, and fulfilment is where promises are kept or broken. The daily rhythm is simple and non-negotiable: orders reviewed and dispatched inside the window you advertise, tracking sent the moment it exists, and problems, a delay, a short pick, an address that looks wrong, dealt with by telling the customer before they have to ask. A buyer forgives a delay they were warned about and remembers forever the one they discovered themselves. In a well-built store the mechanics are automatic, the order confirmations, the tracking emails, the pick lists, and your job is the exceptions, which is exactly where a human belongs.',
      ),
    ),
  ),

  flow(
    ...section(
      'STOCK',
      'Stock accuracy: the honesty of the store',
      ...p(
        'Here is the day-to-day discipline this era has promoted from housekeeping to strategy. Stock accuracy used to be an internal matter; now it is public honesty, because your availability is read continuously, by buyers, by search engines, and by the assistants deciding whether to recommend you, and a store that says in stock when it is not gets punished by all three. The person cancels and reviews you badly. The machines learn your data cannot be trusted and quietly stop showing you.',
        'The rhythm: stock levels sync automatically from wherever truth lives, and any product sold in more than one place, online and in person, or across channels, syncs everywhere, every time, because double-selling one item is the fastest way to disappoint two customers at once. Where things are manual, they are counted on a schedule. And products genuinely gone are marked so, with the back-in-stock button doing its work, rather than left pretending.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch06-one-stock-truth',
        caption:
          'One stock truth. A central node "STOCK TRUTH" with two-way sync arrows to: Online store, In-person sales, Marketplace, Social shop. Beneath, a crossed-out scenario: two channels each selling "last unit" to two different buyers, labelled "what happens without it".',
      },
    ),
  ),

  flow(
    ...section(
      'CONTENT',
      'Content upkeep: prices, seasons and freshness',
      ...p(
        'The store\'s content decays on its own, which is why chapter one called an untended store a store that starts lying. The weekly pass is short: prices right everywhere they appear, the seasonal range current, the home page featuring things that exist, new products loaded completely rather than half-described, and anything discontinued retired properly rather than left as a dead end. Fifteen minutes a week keeps a store feeling alive. Skipping it for a quarter makes a store feel abandoned, and buyers can smell abandoned.',
      ),
    ),
    ...section(
      'LISTENING',
      'Reviews, questions and the listening loop',
      ...p(
        'Every day the store talks back to you, and the rhythm is to listen. New reviews get replies, the good ones warmly, the bad ones calmly and helpfully, in public, because the reply is read by a thousand future buyers for every one past one. Questions, in chat, in messages, in email, get fast answers, and then the better move: any question asked twice becomes an answer added to the product page or the FAQ, so it never needs asking again. Run that loop for a year and the store has quietly answered every doubt your market has, which is a moat no competitor can copy quickly.',
      ),
    ),
  ),

  flow(
    ...section(
      'RETURNS',
      'Refunds and returns, handled like a professional',
      ...p(
        'Returns are not a failure state, they are part of selling remotely, and how they are handled is one of the loudest signals a store sends. The rhythm: returns acknowledged fast, processed inside the window your policy states, refunds issued the way the law and your promises require, and the customer told at each step. A smooth return regularly turns into the next purchase, because the buyer has now tested the one thing they could not see before buying: what you are like when something goes wrong. Chapter seven covers the legal floor; the day-to-day standard should sit comfortably above it.',
      ),
    ),
  ),

  flow(
    ...section(
      'FIRE DRILL',
      'The fire drill: when the checkout looks broken',
      ...p(
        'At some point something will look wrong, and in a store the frightening version is always the same one: are we still able to take money? Before panic, the drill.',
      ),
      {
        type: 'fireDrill',
        title: 'Checkout fire drill',
        steps: [
          'Check whether it is just you. Open the store in a private window or on your phone, and place a test order for the cheapest item with a real card. If it goes through, the till works, and the problem is smaller than it looked.',
          'If it fails, capture everything: a screenshot of the exact error, the page address, the time, and what payment method you tried. Check the payment provider\'s own status page, because sometimes the outage is theirs and already being fixed.',
          'Send it all to whoever looks after the store, screenshot, address, time, method, and what you expected. With that in hand a good support arrangement finds the cause fast; without it, the first hour is spent reconstructing what you saw.',
          'Most alarms turn out small, a browser cache, a single payment method hiccup, a theme glitch on one device. The test order is worth doing monthly even when nothing looks wrong, because the worst checkout failure is the silent kind.',
        ],
      },
    ),
  ),

  flow(
    ...p(
      'None of this rhythm takes long, and all of it compounds: a store that keeps its promises, tells the truth about stock, listens, and handles the bad days gracefully becomes the thing algorithms cannot manufacture, a store people trust. Underneath the rhythm sits a heavier layer of upkeep, the speed, the security, the law, and that is chapter seven.',
    ),
  ),
]
