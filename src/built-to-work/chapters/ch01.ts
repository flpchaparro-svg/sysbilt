import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../helpers'

export const ch01Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 1,
    title: 'Why your website exists',
    subtitle:
      'The way websites get built, and what a website is even for, has just changed. Most businesses have not caught up.',
  }),
  flow(
    ...section(
      'THE SHIFT',
      'The ground has shifted',
      ...p(
        'Start here, because everything in this book rests on it. The way websites get built, and what a website is even for, has just changed, and most businesses have not caught up.',
        'Not long ago, a good website was a major undertaking. You needed a designer, then a developer to write the code, then a copywriter for the words, each one expensive, the whole thing slow, and the result, after all of it, was usually a brochure. A handsome, static page that sat online and told people you existed. That was the state of the art, and it cost accordingly.',
        'That world is ending. The tools have changed, and artificial intelligence has changed them fastest of all. Building a site, connecting it to other systems, writing for it, all the things that used to take a team of specialists and a serious budget, have become dramatically faster and cheaper to do well. The hard, costly part is no longer the building itself.',
      ),
    ),
  ),
  flow(
    ...p(
      'This does two things. It means a website is no longer a brochure you commission once and forget. It can now be a connected system that actively runs the business, capturing enquiries, following up on its own, feeding every other tool you use, and getting better over time. And it means the businesses that understand this are pulling ahead, while the ones still treating their website as a one-off expense are falling behind, paying for something outdated now and paying again later to catch up.',
      'That is the choice this book is really about. The market is moving, the way businesses operate online is moving with it, and a website built the old way is a website already behind. What follows is how it works now, so you can build on the right side of that line rather than the wrong one. We will start with what a website is actually for, then build outward to everything it can become.',
    ),
    {
      type: 'diagram',
      id: 'ch01-old-vs-new',
      caption:
        'The old model, and the new one. On the left, the old way as a one-way chain, Designer to Developer to Copywriter, ending in a single static box labelled "Brochure". On the right, the new way as a central website with arrows flowing out to and back from connected systems (enquiries, follow-up, records, reporting), labelled "A system that runs the business".',
    },
  ),
  flow(
    ...section(
      'WHAT IT\'S FOR',
      'The one job',
      {
        type: 'p',
        text: 'Your website has one job. Bring you business while your attention is elsewhere.',
        lead: true,
      },
      {
        type: 'p',
        text: 'Everything else serves that. Not how clever it looks in a showcase, not how many pages it has, not whether it won an award. The only measure that counts is whether it brings you work.',
      },
      {
        type: 'p',
        text: 'A website is not a brochure you put online and forget. It\'s the one part of your business that never closes. It works through the night, through the weekend, and through every meeting you sit in. While you\'re with a client, it\'s making your case to the next one. The only question is whether it\'s any good at the job, because a serious enquiry that arrives at the wrong hour will not wait for you. It moves on to whoever answers first.',
      },
    ),
    {
      type: 'pullQuote',
      text: 'A serious enquiry that arrives at the wrong hour will not wait for you. It moves on to whoever answers first.',
      emphasis: 'whoever answers first.',
    },
    ...section(
      'TWO JOBS',
      'Marketing first, then conversion',
      {
        type: 'p',
        text: 'Two things have to happen for a website to bring in business.',
        lead: true,
      },
      {
        type: 'p',
        text: 'First, the right people have to find it and want what you offer. That\'s marketing. Second, those people have to act once they arrive, a call, an enquiry, a booking. That\'s conversion. Miss either one and the site earns nothing.',
      },
      {
        type: 'p',
        text: 'It\'s worth being honest about how most sites fall short. Some are beautiful and invisible, so all that craft sits in an empty room. Others draw a steady stream of visitors who look once, find no reason to act, and leave. A site that works does both. It earns attention, then turns that attention into business. We lead with marketing, because there is no point converting a visitor you never attracted. We never stop at marketing, because attention you cannot capture is just traffic passing through.',
      },
    ),
  ),
  flow(
    ...section(
      'THE EDGE',
      'Why design is the edge now',
      ...p(
        'We have just said the building got cheap. Here is the consequence that matters most for winning work. Because almost anyone can now put a site online, the website itself no longer sets you apart. Everyone has one. What separates you now is whether it looks like you take the work seriously.',
        'Here is why that matters more than it first appears. A prospective client cannot judge the quality of your work before they commit to you. They can\'t sit in on a consultation or see a finished project up close. Your website is the first evidence they get. If it looks rushed or generic, they assume the work might be too. If it looks considered, they assume you are the careful choice. That judgement forms in seconds, almost always on a phone, before they have read a word about you.',
        'Design, then, is not decoration. It is the first signal a stranger uses to decide whether to trust you. The moment the build became cheap, design became the thing that sets the serious operators apart.',
      ),
    ),
  ),
  flow(
    ...section(
      'BEYOND TEMPLATES',
      'Design today is more than a tidy template',
      ...p(
        'Design now means far more than a clean layout and a considered colour palette. It\'s how the site feels to move through. The way elements respond as you scroll. How quickly a page appears. The small, deliberate touches that make the whole thing feel made rather than assembled from a kit.',
        'Templates give everyone the same starting point, which is exactly why the difference now lives in the details a template cannot reproduce. A site built with care moves smoothly, loads instantly, and feels like real thought went into it. None of it announces itself. It leaves the visitor with a quiet sense that this business operates at a higher level, often before they could say why.',
        'That impression does real work. It is the difference between a visitor who trusts you enough to make contact and one who clicks away to keep looking.',
      ),
    ),
  ),
  flow(
    ...section(
      'A LIVING ASSET',
      'Your website is a living asset, never a finished job',
      ...p(
        'Before we get into the build, one thing to settle. A website is never finished.',
        'The most common mistake we see is treating it as a one-off. Build it once, sign it off, walk away. The web does not stand still, and as the opening of this chapter made clear, right now it is moving faster than it has in years. The way people search changes. Your business changes. A site left untouched slowly falls behind and stops earning, and the difficult part is that you rarely notice, because nothing sounds an alarm when a website goes quiet.',
        'The sites that keep producing are the ones that are looked after, a little at a time and on purpose. Think of it less as a building you complete and more as an asset you maintain. Much of this book is about how to keep yours performing, and what that work looks like month to month.',
      ),
    ),
  ),
  flow(
    ...section(
      'THE FORK',
      'Brochure, or lead generator',
      ...p(
        'Every website sits in one of two camps, and knowing which one you\'re building shapes everything that follows.',
        'A brochure site exists to inform. It states who you are and what you do, then waits politely to be read. For some businesses that is enough, a refined place to send people who already know your name and simply want to confirm you are the real thing.',
        'A lead-generation site is built to make something happen. Every page has a purpose and a next step. It captures details, follows up on its own, and feeds the rest of your business while you focus on the work. It is not a pamphlet. It earns its place.',
        'This book is mostly about the second kind. There is nothing wrong with a brochure if that is all you need. But if you want your website to bring you business rather than sit online looking respectable, you want a lead generator, and everything from here is about building one properly.',
      ),
    ),
    {
      type: 'diagram',
      id: 'ch01-two-kinds',
      caption:
        'Two kinds of website. "Brochure" as a passive single page (an open book or pamphlet icon, the word "Informs"). "Lead generator" as an active machine with an arrow turning a visitor into a captured enquiry (the word "Acts").',
    },
    ...p(
      'Before we build that engine, there is something most owners are never told, and it has caught out plenty of them. You need to genuinely own your website, your domain, and the accounts behind it, and you need them secure. That is where we start.',
    ),
  ),
]
