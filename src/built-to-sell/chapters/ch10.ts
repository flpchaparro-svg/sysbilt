import type { BtwPage } from '../types'
import { closing, flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch10Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 10,
    title: 'Selling where the buyers are',
    subtitle: 'Rented land feeds owned ground.',
  }),

  flow(
    ...p(
      'A store used to have one address. Now the buyers are scattered, browsing marketplaces, shopping inside social apps, watching someone sell live on video, and, as this book has followed throughout, asking assistants to buy on their behalf. Every one of those places is a channel, every channel is an opportunity, and every channel comes with the same quiet catch. This chapter is about taking the opportunities without swallowing the catch, and the rule that keeps a multi-channel business sane.',
    ),
  ),

  flow(
    ...section(
      'THE RULE',
      'The rule: rented land feeds owned ground',
      ...p(
        'The whole chapter in one sentence. Every channel you sell on is rented land, useful, crowded, and governed by someone else, and its job is to feed the ground you own: your store, your customer list, your data, your brand.',
        'Rented is not an insult, it is a description. On a marketplace, the customer belongs to the platform: you often cannot email them, the rules and fees change without your vote, and your listing sits beside your competitors\' by design. On social shops, the checkout, the data and the relationship live inside the app. None of that makes the channels bad. It makes them channels, places to meet buyers, not places to build a business. The businesses that get multi-channel right treat every channel as a doorway that ultimately points home: the customer met on rented land becomes, wherever possible and always honestly, a customer known on owned ground, on the list, in the records, with a reason to buy directly next time. The businesses that get it wrong build their whole house on the busiest rented corner they can find, and then one policy change, one fee rise, one suspended account teaches them the word rented properly.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch10-rented-owned',
        caption:
          'Rented land feeds owned ground. YOUR STORE as solid ground: your customer, your data, your margin. Around it: Marketplace, Social shop, Live selling, Agent channel. Every channel has an arrow pointing home, labelled "customers, data, demand".',
      },
    ),
  ),

  flow(
    ...section(
      'MARKETPLACES',
      'Marketplaces, used deliberately',
      ...p(
        'The big marketplaces offer the one thing a growing store lacks: instant access to enormous, ready-to-buy traffic. The honest exchange is margin and control for that traffic, fees on every sale, strict rules, limited customer contact, and your product displayed in a row of rivals.',
        'Used deliberately, that trade can be worth making: for reaching buyers who simply live there, for validating new products against real demand, for categories where the marketplace is the default first search. The deliberate part is knowing which products you send there and why, pricing with the full fee load in sight, and never listing your whole soul, your signature products, your best margins and your brand story do their best work at home. And operationally, a marketplace is not a side project: its orders, stock and reviews must flow through the same hub as everything else, because two sources of truth is how the overselling stories from chapter nine begin.',
      ),
    ),
    ...section(
      'SOCIAL',
      'Social commerce: where discovery lives',
      ...p(
        'Social shops, on the platforms where people already spend their evenings, have become genuine storefronts, and their special power is discovery: buyers finding products they were not looking for, through content, creators and community. For visual, giftable, demonstrable products, they can be remarkable engines.',
        'The same rule governs them. The content, the entertainment, the personality, that is the channel doing what it does best. The capture is what you add: the follower nudged to the list, the buyer\'s details flowing into your records where the platform allows, the bio and the posts pointing home, so the attention rented tonight becomes a relationship owned tomorrow. Treat a social shop as a stage with a till on it, and remember whose stage it is.',
      ),
    ),
  ),

  flow(
    ...section(
      'LIVE',
      'Live selling',
      ...p(
        'Selling live on video, demonstrating, answering, taking orders in real time, has grown from novelty to real channel, and it suits products that benefit from being shown and sellers with genuine presence. It is the oldest retail skill, the market stall, wearing new clothes. The practical notes are the same as all rented land, plus one: live selling makes promises out loud, prices, stock, delivery, and every promise made on camera binds exactly like one written on the site, so the stock truth and the policy honesty from earlier chapters need to be standing beside you on stream.',
      ),
    ),
    ...section(
      'AGENTS',
      'The agent channel',
      ...p(
        'And the newest doorway, the one this book has tracked from page one: purchases that begin and complete inside an AI assistant. The buyer asks, the assistant compares, recommends and, increasingly, transacts, and your store participates not through a beautiful page but through the quality of its data, the feed, the attributes, the availability, the policies, the reviews.',
        'Treat it as a channel in exactly this chapter\'s sense: enormous reach potential, rules set elsewhere, and a relationship that arrives thinner than one made at home, an order without a browsing history, a customer you must earn a second time through the excellence of the delivery, the unboxing, the follow-up. The preparation is nothing new by now, it is chapters two, three, seven and eight done properly, because for this channel, your data is your shopfront and your reliability is your brand.',
      ),
    ),
  ),

  flow(
    ...realPicture({
      title: 'Flying blind on the agent channel',
      paragraphs: [
        'A word on what the agent channel does to your visibility, because it concentrates everything this book has said about flying blind. When the buying journey happens inside an assistant, the browsing, the comparing, the persuading all occur where your analytics cannot see, and what surfaces in your systems is the ending: an order, from a channel your dashboards describe thinly or not at all. The store can be winning inside the machines and look quiet on every chart you own.',
        'The composed response is not panic, it is bookkeeping discipline applied to attention: tag and separate what can be tagged, watch for the orders that arrive without footprints, ask the assistants regularly what they recommend in your categories, and judge the channel by the only numbers that never lie, orders, margins and repeat purchases, rather than by the traffic charts that no longer tell the whole story. The stores that struggle in this shift will be the ones that mistook their dashboards for their business. The ones that thrive will be the ones that kept the machine fed with truth and measured what mattered.',
      ],
    }),
  ),

  flow(
    ...section(
      'ONE HUB',
      'Running many channels without running many stores',
      ...p(
        'The way to sell in five places without working five jobs is the hub from chapter nine doing its work: one catalogue feeding every channel, one stock truth preventing every double-sale, every order from everywhere flowing into one fulfilment queue, one accounting, one customer memory. Add a channel and you add a doorway, not a second business. That is the test of whether your foundations are real: if adding a marketplace or a social shop feels like plugging in a cable, the hub is doing its job. If it feels like opening a second shop, stop and fix the wiring before the wiring costs you a season.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch10-one-hub-doorways',
        caption:
          'One hub, many doorways. The chapter-nine hub at the centre, with channel doorways plugging into it: marketplace, social, live, agents. One doorway mid-connection with a plug icon, labelled "adding a channel = plugging a cable, not opening a second shop".',
      },
    ),
  ),

  flow(
    ...closing(
      'In short',
      ...p(
        'Sell where the buyers are, and own where the business lives. Every channel is a doorway pointed home, every customer met out there is invited, honestly and well, into a direct relationship, and the store at the centre keeps the data, the margin and the memory. Held that way, more channels means more reach. Held the other way, it just means more rent. The next chapter puts AI to work on the store\'s endless appetite for words and upkeep, and the last one closes the book with the plain meanings and the honest invitation.',
      ),
    ),
  ),
]
