import type { BtwPage } from '../types'
import { divider, subsection, flow, opener, p } from '../../built-to-work/helpers'

export const ch02Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 2,
    title: 'What you own, and what keeps it safe',
    subtitle: 'Domain, catalogue, customers, and the armour that protects them.',
  }),
  flow(
    ...p(
      'Before a single product is photographed, there is a question most store owners never think to ask, and it is the one that causes the most pain later. Do you actually own your store? Not the stock on the shelf, the store itself: the domain, the platform account, the product information, and the customer list. Plenty of owners assume they do, right up until the day they need access and find someone else is holding the keys. This chapter has two halves. First, the keys to the castle, what you must own outright. Then the armour, what keeps a store safe once it is yours, because a store handles money and personal details every day, and that makes its armour heavier than an ordinary website\'s.',
    ),
    {
      type: 'diagram',
      id: 'bts-ch02-keys-armour',
      caption:
        'Keys, and armour, store edition. LEFT, a key icon, "WHAT YOU OWN": Domain, Platform account, Product catalogue, Customer list. RIGHT, a shield icon, "WHAT KEEPS IT SAFE": SSL, Payment hand-off, Fraud screening, Access and keys, Backups.',
    },
  ),
  flow(
    ...divider('PART ONE', 'The keys to the castle'),
    ...subsection(
      'OWNERSHIP',
      'Who owns what',
      ...p(
        'An online store is made of a few separate things, and you should own every one of them.',
        'There is the domain, your address on the web. There is the platform account the store runs on, and the theme and customisations built into it. There is the product catalogue, every description, photograph, price and specification. And there is the customer list, the names, emails and order histories of everyone who has ever bought from you. Each of these can be registered or held in someone else\'s name, and the mistake we see again and again is a store built by someone who set all of it up under their own accounts. The store works, so no one questions it. Then the relationship ends, and the owner discovers they cannot touch their own shop, export their own customers, or prove any of it is theirs.',
        'The rule is simple. Everything is registered in your name, under accounts you control, and you hold the master logins. A good partner builds inside your accounts and hands you the keys. If anyone ever resists putting these things in your name, treat it as the warning it is.',
      ),
    ),
  ),
  flow(
    ...subsection(
      'YOUR DOMAIN',
      'Your domain, and where the store lives',
      ...p(
        'Your domain is the address people type to reach you, and everything from book-length detail on domains, DNS and hosting applies here just as it does to any website: registered to your business, renewing automatically, in an account only you control.',
        'The store-specific layer is the platform. Most stores today run on a hosted platform, which means the company behind it looks after the servers, the security patching and the uptime, and you rent the machinery. That is a fine arrangement, and it is worth being clear-eyed about what it means. You own your data and your brand. You licence the machinery. So the questions that matter are the exits: can you export your products, your customers and your order history cleanly if you ever leave? A platform that makes leaving easy is a platform you can safely stay with. One that quietly holds your data hostage has told you everything you need to know.',
      ),
    ),
  ),
  flow(
    ...subsection(
      'CATALOGUE',
      'Your catalogue is an asset now',
      ...p(
        'Here is the piece that has changed most, and it connects straight back to the shift this book opened with. Your product information, the titles, descriptions, specifications, measurements, materials, images and categories, used to be treated as packaging, words wrapped around the real asset, which was the stock. Not any more.',
        'Your catalogue is now the thing the machines read. When an assistant decides whether to recommend your product, it is reading that data. When a shopping platform lists you, it is ingesting that data. Complete, accurate, consistently structured product information is what makes your store legible to every system that now sits between you and a buyer, which makes the catalogue itself a business asset, one worth building carefully, keeping clean, and holding in a form you can take with you. A store can survive a theme change or a platform move. A business that has to rewrite its entire catalogue from memory starts again from nothing.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch02-catalogue-asset',
        caption:
          'The catalogue is the asset. One central document stack labelled "YOUR CATALOGUE (titles, specs, images, stock)" with four arrows out to: Your store, Search engines, Shopping surfaces, AI assistants. Legend: "One source of truth, read by everything that sells for you."',
      },
    ),
  ),
  flow(
    ...subsection(
      'CUSTOMERS',
      'Your customer list',
      ...p(
        'The other asset that outlives everything else is the list: every customer, their details, their consent to hear from you, and their history with you. It is the store\'s memory, and it is yours, on one condition. It only counts if it lives in systems you control and can be exported whenever you choose. Customers acquired through a marketplace belong to the marketplace. Customers captured by your own store, into your own records, belong to you, and they are the cheapest sales you will ever make again. Guard the list accordingly, and handle it lawfully, which we return to in the privacy section of chapter seven.',
      ),
    ),
  ),
  flow(
    ...divider(
      'PART TWO',
      'The armour',
      ...p(
        'A store\'s security matters more than an ordinary website\'s for one blunt reason. A website that gets compromised embarrasses you. A store that gets compromised can leak your customers\' personal details and interfere with their money, and trust of that kind does not come back at any price. The good news is that most of the armour is standard, and a properly built store wears all of it from day one.',
      ),
    ),
    ...subsection(
      'SSL',
      'The padlock, and payment security in plain terms',
      ...p(
        'Everything about SSL from the wider world of websites applies doubly here: no store should exist for a single day without the encrypted connection behind the padlock, because every visitor is potentially typing card details.',
        'Beyond that sits payment security, and here is the plain version of something owners worry about more than they need to. There is a strict global standard for handling card data, and the way a modern store meets it is by never touching the card numbers at all. A properly built checkout hands the payment to a specialist payment provider, the card details go straight to them, encrypted, and your store only ever learns that the payment succeeded. You carry the brand and the customer relationship. The provider carries the vault. This is not a corner cut, it is the correct architecture, and it means the question to ask of any store build is simple: do card details ever pass through or rest in our systems? The right answer is no.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch02-payment-handoff',
        caption:
          'Your card details never live here. A three-node flow. Buyer (card icon) → arrow labelled "encrypted" → PAYMENT PROVIDER (vault icon, labelled "card details live here") → arrow back to YOUR STORE labelled "token + verdict only". Your store node visibly does NOT receive the card icon.',
      },
    ),
  ),
  flow(
    ...subsection(
      'FRAUD',
      'Fraud, in plain terms',
      ...p(
        'Where money moves, fraud follows, and an online store meets two kinds. The first is stolen-card fraud: someone buys from you with a card that is not theirs, the real cardholder disputes it, and you lose both the goods and the money, plus a penalty. The second is friendly fraud, a genuine customer who disputes a legitimate charge.',
        'You do not need to become a fraud analyst. You need to know that the defence is layered and mostly automatic: the payment provider\'s own screening, the address and card checks built into a proper checkout, and sensible internal habits, like pausing to verify an unusually large first order shipping somewhere odd. A well-built store has these layers on by default, and a good rhythm reviews the flagged orders rather than ignoring them. Fraud managed this way is a small cost of doing business. Ignored, it can eat a margin whole.',
      ),
    ),
  ),
  flow(
    ...subsection(
      'ACCESS',
      'Accounts, keys and the doors between systems',
      ...p(
        'Everything about passwords, two-factor authentication, and removing access the day someone leaves applies to a store with extra force, because a store\'s admin account can change prices, redirect payouts, and export the customer list. Treat store admin access like the keys to the till, because that is what it is.',
        'And because a modern store connects to other systems, inventory, accounting, shipping, marketing, it holds API keys, the credentials that let those systems talk. Each one is a door. A properly built store stores them securely, grants each connection only the access it needs, and keeps a record of what is connected to what, so that when something is retired, its key is too. This is one of the quiet differences between a store wired together in a hurry and one engineered to be connected, and it matters more with every connection you add.',
      ),
    ),
  ),
  flow(
    ...subsection(
      'BACKUPS',
      'Backups of what matters',
      ...p(
        'Platforms keep their machinery running, but the things that are uniquely yours, the catalogue, the customer list, the order history, the theme customisations, deserve their own regular, automatic export to somewhere you control. The platform going down for an hour is their problem. Your data existing in only one place is yours. The cost of keeping copies is trivial. The cost of needing them and not having them is the business.',
      ),
    ),
  ),
]
