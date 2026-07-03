import type { BtwPage } from '../types'
import { flow, opener, contents, p, section, closing } from '../helpers'

export const ch10Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 10,
    title: 'Growing it over time',
    subtitle: 'A website is never built complete. It grows, in a sensible order, as the business grows.',
  }),

  flow(
    ...p(
      'A website is rarely built complete in a single go, and it should not be. Trying to add every feature and every connection at once is expensive, overwhelming, and usually wasteful, because a business does not need everything on day one. The smarter approach is to build a strong core, then grow it deliberately as the business grows, adding each piece when it will actually earn its place. This chapter is about that order, the signs that tell you when to take the next step, and why a properly built website can keep growing rather than forcing you to start over.',
    ),
  ),

  flow(
    ...section(
      'THE ORDER',
      'When to add what',
      ...p(
        'There is a natural order to building a website that works, and following it saves money and effort. Each stage rests on the one before, so building them in sequence means every piece lands on solid ground.',
        'It begins with the foundation and the core pages. Before anything clever, the site must be owned properly, secure, fast, and built around a small set of strong pages that say clearly what you do. This is the groundwork the whole thing stands on, and it comes first without exception.',
        'Next comes capturing enquiries. Once the core is sound, you add the ways for visitors to reach you and the wiring that catches what they send, a contact form into your customer records, a clear way to call or message, the basics of turning a visitor into a lead. A site that looks good but cannot capture an enquiry is a shopfront with no till, so this follows closely behind the foundation.',
      ),
    ),
  ),

  flow(
    ...p(
      'Then comes getting found. With a site that converts, it becomes worth driving people to it, the steady content, the business profile, the ongoing work of being seen. There is little sense pouring effort into traffic before the site is ready to turn that traffic into enquiries, which is why this comes after capture, not before.',
      'After that comes connecting and automating. As the volume of enquiries grows, you wire the parts together so the system begins to run itself, the follow-up, the reminders, the reporting. This earns its place once there is enough activity for the saved time to matter, which is usually after the first three stages are doing their job.',
      'Last come the advanced layers. The richer tools, dynamic content that adapts to the visitor, an AI assistant, the means to recover visitors who never made contact, these come once the rest is established and producing, when you are ready to sharpen an already working machine rather than waiting on the basics. Reach for them too early and they sit unused. Add them at the right time and they compound what is already there.',
    ),
  ),

  flow(
    ...p(
      'You do not have to march through these in a rigid line, and a good build often lays the groundwork for later stages from the start. But the order holds. Foundation, capture, found, connect, then sharpen. Build in that sequence and every dollar and every hour lands where it can do the most.',
    ),
    {
      type: 'diagram',
      id: 'five-stages',
      caption: 'The order to build in.',
    },
  ),

  flow(
    ...section(
      'OUTGROWING IT',
      'The signs you have outgrown the build',
      ...p(
        'A website that fit the business two years ago may stop fitting it, and the signs are worth knowing, because most businesses carry on with an outgrown site for far too long.',
        'You have likely outgrown your build when the site can no longer do what the business now needs, when you find yourself working around it rather than with it. It shows in small frustrations that add up. You are copying enquiries by hand because the site does not connect to your systems. You are turning away the chance to offer something new because the site cannot accommodate it. The site is slow, or dated, and no longer reflects how far the business has come, so it undersells you to the very people you most want to impress. Enquiries have grown to a point where handling them by hand is eating real time. Or you simply know, looking at it, that it no longer matches the quality of what you do.',
        'None of these means the site failed. It means the business moved on, which is a good problem to have. The point is to notice it deliberately rather than letting an outgrown site hold you back. A website should keep pace with the business it serves, and with a web that, as this book has said throughout, is moving quickly. When it starts lagging behind either one, that is the signal to grow it.',
      ),
    ),
  ),

  flow(
    ...section(
      'BUILT TO STRETCH',
      'Why we build so it stretches',
      ...p(
        'Here is where the way a site is built in the first place matters enormously, and it is the difference between growing a website and replacing it.',
        'Many websites are put together in a way that makes them easy to start and hard to change. They look fine on day one, but the moment you want to add something the original did not allow for, you hit a wall, and the only way forward is to tear it down and begin again. That is expensive, disruptive, and entirely avoidable. We build the other way, properly and in code, on foundations made to be extended. A site built this way is not a fixed object but a platform, something you add to. A new feature, a new connection, a new section can be built onto what already exists, rather than forcing a rebuild from scratch.',
      ),
    ),
  ),

  flow(
    ...p(
      'This is the payoff of building correctly from the outset. The business that started with a strong, well-built core can keep growing that same site for years, adding to it as needs arise, never losing what came before. The business that started with something quick and rigid pays again and again, rebuilding each time it outgrows the last attempt. Building properly costs a little more thought at the beginning. It saves a great deal for as long as the business keeps growing, which is rather the point of building anything well, especially now. This is exactly where the book began, with the ground shifting under everyone who treats a website as a thing you finish once. What is advanced today becomes ordinary tomorrow, and a site that cannot grow is a site already on its way to being replaced.',
      'One note on scope. This book is about the lead-generation website, the site whose job is to bring you enquiries and run your business around them. If you sell products online, an online store is a different kind of build with its own demands, stock, payments, fulfilment, and we cover that in a separate guide rather than stretching this one to cover both.',
    ),
  ),

  flow(
    ...closing(
      'In short',
      ...p(
        'Grown this way, a website is never finished and never needs to be, because it keeps becoming whatever the business needs next. Most of that growth is steady, deliberate work. Some of it, though, you can now do far faster than ever before, with a little help from AI, which is where we turn next.',
      ),
    ),
  ),
]
