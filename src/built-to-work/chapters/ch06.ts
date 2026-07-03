import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../helpers'

export const ch06Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 6,
    title: 'Running it day to day',
    subtitle:
      'A website that works is a website that gets used. Here is the handful of things worth doing well.',
  }),

  flow(
    ...p(
      'A website that works is a website that gets used. Once yours is live, a handful of simple, regular tasks keep it sharp and keep the leads moving. None of it requires technical skill. This chapter covers the day-to-day running of your site, the few things worth doing well so the machine keeps earning.',
    ),
    ...section(
      'EDITING',
      'Editing content without breaking anything',
      ...p(
        'Your website is built so you can update the words and images yourself, through a content system made for exactly that. You change what you are meant to change, the text, the photos, the details, while the design and structure stay locked and safe underneath.',
        'This is deliberate. A good build separates the content you edit from the engineering that holds the site together, so you can keep things current without any risk of breaking the layout or the site itself. You refresh a paragraph, swap a photo, correct a detail, and the site reflects the change. The freedom to keep your own site fresh, without calling anyone for small edits, is one of the quiet advantages of a properly built website. Make the changes you need when you need them, and trust that the foundation underneath will hold.',
      ),
    ),
  ),

  flow(
    ...section(
      'PUBLISHING',
      'Publishing to the blog',
      ...p(
        'Publishing an article follows the same simple path. You write the piece, add it through your content system, and it appears on your site, formatted and ready, without you touching code or design.',
        'The thing that matters here is not the mechanics, which are straightforward, but the rhythm. One strong article a month, published consistently, does far more than a burst of ten that is never followed up. A steady cadence signals to search engines and to readers that the business is active and worth paying attention to. You do not need to write constantly. You need to write regularly, on the questions your clients actually ask, and let each piece work for you long after it is published. We return to what to write, and how it helps you get found, in the getting-found chapter.',
      ),
    ),
    ...section(
      'YOUR INBOX',
      'Where enquiries land, and acting fast',
      ...p(
        'Every way a visitor can reach you, the forms, the messages, the bookings, is built to land in one place, so you are never hunting across email, your phone, and three other apps to find your leads. They arrive together, each with the context of where it came from.',
      ),
    ),
  ),

  flow(
    ...p(
      'The single most important habit in running your site is acting on those enquiries quickly. We said it among the features and it bears repeating, because it is where most businesses lose work they had already won. A lead answered within minutes is a lead that still remembers you and is still interested. A lead left until the end of the week has usually moved on. Build a simple habit of checking and responding promptly, and the website will keep handing you opportunities that your speed turns into clients.',
    ),
    ...section(
      'BOOKINGS & CHAT',
      'Managing bookings and chat',
      ...p(
        'Bookings and conversations need light, regular attention rather than constant watching. Keep your availability accurate so the booking calendar only ever offers times you can honour, and the appointments will look after themselves. Glance over the conversations your chat has handled, both to catch anything that needs a personal reply and to notice the questions that keep coming up.',
        'Those recurring questions are a gift. They tell you what your visitors are unsure about, which is exactly what your FAQ, your service pages, and your next article should address. Running the site well is partly this, listening to what it tells you and feeding what you learn back in. A website looked after this way does not just hold steady. It gets better at its job over time.',
      ),
    ),
  ),

  flow(
    ...section(
      'THE FIRE DRILL',
      'What to do when something looks wrong',
      ...p(
        'At some point you will glance at the site and something will look off. A page that looks broken, a button that does nothing, a form that seems to have stopped sending. Before that turns into panic, here is a simple protocol that resolves most of it in minutes and makes the rest quick to fix.',
      ),
      {
        type: 'fireDrill',
        title: 'Fire drill',
        steps: [
          'Check whether it is just you. Often the problem is your own browser holding an old version of the page. Clear your browser\'s cache and cookies, or open the site in a private window or on your phone. A surprising share of "the site is broken" turns out to be a browser showing yesterday\'s copy, and this clears it.',
          'If it is still wrong, capture it. Take a screenshot of exactly what you are seeing, and copy the address of the page you are on. The two together turn a vague "something\'s wrong" into something that can be diagnosed straight away.',
          'Send it to whoever looks after the site, with the screenshot, the page address, and a line on what you expected to happen. With that in hand, a good support arrangement can usually find and fix the cause quickly, rather than spending the first hour working out what you meant.',
        ],
      },
    ),
  ),

  flow(
    ...p(
      'That is the whole drill. Most issues are small and quickly sorted. Knowing these three steps means you stay calm, you never lose time, and the things that do need a hand get fixed fast.',
      'None of this takes long, and all of it compounds. A site that is used, updated, and listened to stays alive in a way a neglected site never can. Keeping it running, though, is not quite the same as keeping it healthy. There is a layer of upkeep that happens underneath, the security, the speed, the safe updates, that keeps the whole thing standing. That is where we go next.',
    ),
  ),
]
