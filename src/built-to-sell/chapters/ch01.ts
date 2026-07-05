import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch01Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 1,
    title: 'Why your store exists',
    subtitle: 'The way people buy online has shifted again. Most stores have not caught up.',
  }),
  flow(
    ...section(
      'THE SHIFT',
      'The ground has shifted, again',
      ...p(
        'Start here, because everything in this book rests on it. The way people buy online, and what an online store is even for, has just changed, and most businesses have not caught up.',
        'Not long ago, an online store had one audience: a person, browsing. They searched, they scrolled, they compared tabs, they read your product pages, and if you had done your work well, they bought. Everything about e-commerce was built around that person and their eyes. The photography, the copy, the layout, all of it existed to persuade a human being looking at a screen.',
        'That person is still there. But they are no longer alone, and increasingly they are not even the one doing the looking. More and more, a shopper asks an assistant instead. Which one should I buy. Compare these two. Find me the best price on this, delivered by Friday. The assistant reads the web, weighs the options, and answers, and that answer either names your store or it does not. The biggest AI platforms have gone further still, letting people complete the purchase inside the conversation, without ever visiting a website at all. The shopper sets the intent. The machine does the shopping.',
        'This changes what an online store is. It is no longer a shopfront built only for human eyes. It is now also a source of information that machines read, judge, and choose from, and those machines are strict. A person might forgive a vague product description or a missing measurement. A machine comparing fifty options simply skips you and recommends the store whose information was complete. The businesses that understand this are being chosen, quietly, thousands of times a day. The ones still selling only to human eyes are disappearing from decisions they never even knew were being made.',
        'That is the choice this book is really about. Selling online now means selling to two customers at once: the person, and the machine choosing on their behalf. What follows is how a store works when it is built for both, so you end up on the right side of that line rather than the wrong one. We will start with what a store is actually for, then build outward to everything it has to do.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch01-two-readers',
        caption:
          'One reader, then two. BEFORE: one product page with a single figure (a person) looking at it, labelled "One reader: the buyer". NOW: the same product page with two figures reading it, a person and a simple robot/assistant icon, labelled "Two readers: the buyer, and the machine choosing for them".',
      },
    ),
  ),
  flow(
    ...section(
      'ONE JOB',
      'The one job',
      ...p(
        'Your store has one job. Sell while your attention is elsewhere.',
        'Everything else serves that. Not how striking it looks in a showcase, not how many products it carries, not whether the photography wins awards. The only measure that counts is whether it turns visitors into orders, day after day, without you standing beside it.',
        'A physical shop needs someone behind the counter. Your store does not. It takes the order at midnight, answers the sizing question on a Sunday, processes the payment while you are with your family, and lines up the fulfilment before you have looked at your phone. It is the one part of your business that never closes and never asks for a wage. The only question is whether it is any good at the job, because a ready buyer who hits a slow page, a confusing checkout, or an unanswered doubt does not wait. They buy from whoever made it easy, and online, someone always has.',
      ),
    ),
  ),
  flow(
    ...section(
      'TWO CUSTOMERS',
      'Two customers now',
      ...p(
        'It is worth sitting with the shift from the opening of this chapter, because it is the thread that runs through this whole book.',
        'Your first customer is the one you have always had: a person, with taste and doubts and a limited amount of patience. They are persuaded by things machines cannot feel, the photograph that makes the product real, the review that sounds like someone they know, the sense that this business is the careful choice. Everything you have ever heard about good e-commerce still applies to them.',
        'Your second customer is new: the machine reading your store on that person\'s behalf. It does not admire your photography. It reads your information. What exactly is this product, what are its measurements and materials, what does it cost with shipping, is it actually in stock, how fast does it arrive, what is the returns policy. When the information is complete, consistent, and plainly stated, the machine can trust it, and a store a machine can trust is a store a machine can recommend. When the information is thin, stale, or contradictory, the machine does not argue with you. It moves on to the next option, and you never learn you were considered.',
        'Here is the fortunate part, and it shapes everything we build. The two customers want almost the same thing. The clarity that lets a machine choose you, complete details, honest stock, plain policies, straight answers, is exactly what a careful human buyer wanted all along. Building for the machine does not mean gutting the store of its craft. It means finishing the store properly, all the way down to the information underneath. The craft wins the person. The completeness wins the machine. A store that works now does both.',
      ),
    ),
  ),
  flow(
    ...section(
      'LIVING ASSET',
      'A store is a living asset, never a finished job',
      ...p(
        'Before we get into the build, one thing to settle. An online store is never finished.',
        'The most common mistake we see is treating it as a one-off. Launch it, load the products, walk away. But a store decays faster than any other kind of website, because it carries things that go stale by themselves: stock levels, prices, shipping times, seasonal ranges, policies. A brochure site left alone slowly goes quiet. A store left alone starts telling lies, offering products that sold out, quoting delivery times that are no longer true, and both customers punish that. The person loses trust. The machine stops recommending you, and it does not send a note explaining why.',
        'The stores that keep earning are the ones that are kept, current, accurate, and tended a little at a time. Think of yours less as a shop you fitted out once and more as an asset you maintain, because much of this book is about exactly that: what the upkeep is, who does which part, and how the right build makes most of it automatic.',
      ),
    ),
  ),
  flow(
    ...section(
      'OWNED GROUND',
      'Marketplace-only, or a store you own',
      ...p(
        'Every business selling online sits somewhere on a line. At one end is selling only through marketplaces and platforms, the big marketplaces, the social shops. There is real traffic there, and for some products it is a fine place to start. But read the arrangement honestly. The customer belongs to the platform, not to you. The rules, the fees, and the visibility can change overnight, and an account can be restricted without appeal. You are trading margin and control for foot traffic, on ground you will never own.',
        'At the other end is a store of your own. Your prices, your presentation, your rules, and, most valuable of all, your customer: their details in your system, their history yours to serve, their next purchase yours to earn directly. It has to work harder for its traffic, and everything it builds, it keeps.',
        'This book is about the second kind, and the sensible relationship between the two. Marketplaces and social shops can feed a business, and we will cover using them without being owned by them later in the book. But the centre of gravity belongs on ground you control. Because the same shift that opened this chapter is coming for the platforms too, and when machines are choosing between sellers, you want them reading a store that answers for itself, not a listing that looks like everyone else\'s.',
        'Before any of that, though, there is a question most owners are never asked until it hurts. Do you actually own your store, your domain, your product data, and your customer list, and are they safe? That is where we start.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch01-marketplace-owned',
        caption:
          'Marketplace-only, or a store you own. LEFT: a small stall inside a large building labelled "MARKETPLACE", with tags "their customer, their rules, their fees". RIGHT: a freestanding shop labelled "YOUR STORE", with tags "your customer, your data, your margin". An arrow from the marketplace side pointing toward the owned store, labelled "traffic feeds home".',
      },
    ),
  ),
]
