import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch01Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 1,
    title: "Why everyone's talking about AI, and most are wasting money",
    subtitle: 'The shift is real. So is the waste.',
  }),
  flow(
    ...section(
      'THE SHIFT',
      'The ground has shifted, and so has the trap',
      ...p('Start here, because this book rests on two truths that sound like they argue and do not. The first: AI is the real thing. Capable machine intelligence, the kind that reads, writes, summarises and reasons at a useful level, has become cheap and available to any business, not just the giants, and it is the same shift that runs through everything we build. The second: most of the money being spent on it right now is being wasted, and the waste is not small.'),
      ...p('The evidence is uncomfortable and worth stating plainly. Independent studies of business AI projects keep finding the same thing: the large majority of pilots produce no measurable return at all. Companies that rushed AI agents into customer conversations have been rolling them back in waves. Businesses everywhere bought the tool first and defined the problem never, and are now quietly cancelling what they announced loudly. The pattern behind the failures is remarkably consistent, and it is never that the technology did not work. It is that it was pointed at the wrong job, with nobody measuring, and no human catching it when it was wrong.'),
      ...p('One story stands for hundreds. A large retail chain deployed AI cameras to count its stock, a genuinely impressive system, and retired it within months, because staff were spending more time correcting the AI\'s counts than the counting had ever taken, and a clipboard and a checklist had been doing the job fine all along. AI, applied at real expense, to a problem a rule had already solved. Hold that image, because a version of it is being sold to a business like yours this week.'),
      ...p('So this book\'s promise is different from the noise. Not how to use more AI. How to use the right amount, in the right places, which is a smaller amount in fewer places than the hype suggests, and worth far more.'),
      {
        type: 'diagram',
        id: 'btt-ch01-two-truths',
        caption: 'Two truths that sound like they argue. LEFT: the shift is real, capable AI now within reach. RIGHT: the waste is realer, tool bought first, problem defined never, nobody measuring. This book is the composed middle.',
      },
    ),
  ),
  flow(
    ...section(
      'ONE RULE',
      'The one rule',
      ...p('The whole book compresses into one rule, and it sits on the foundations this series has already built. Plain automation does the machine work. AI does the judgment work. Humans make the decisions.'),
      ...p('The machine work, the copying, the routing, the reminding, the when-this-happens-do-that of a business, belongs to rules: cheap, instant, and never wrong twice in the same way. Our automation book is that discipline end to end, and its punchline bears repeating here: most of what gets sold as AI transformation is just automation a business never got around to, achievable with rules, at a fraction of the cost, with none of the hallucinations. If a checkbox, a dropdown or a simple rule can do the job, paying a model to think about it is the purest form of the hype tax.'),
      ...p('What is left over, the genuinely messy work, reading a rambling email and knowing what it wants, summarising a call, drafting a reply that sounds like you, making sense of unstructured mess, is where AI earns its keep, because that work needs something like judgment, and until now the only source of it was a person\'s hour.'),
      ...p('And above both sits the human, deciding, approving, sending, because judgment about the work is not the same as accountability for it, and accountability does not delegate.'),
      {
        type: 'diagram',
        id: 'btt-ch01-one-rule',
        caption: 'The one rule. BOTTOM: rules, the machine work. MIDDLE: AI, the judgment work. TOP: humans, the decisions. If a checkbox can do it, do not pay a model to think about it.',
      },
    ),
  ),
  flow(
    ...section(
      'THE WASTE',
      'Why the waste happens',
      ...p('It is worth naming the mechanics of the waste, because they are avoidable and they will be aimed at you.'),
      ...p('The tool arrives before the problem. Someone sees a demonstration, buys the platform, and then wanders the business looking for something to point it at, which is backwards, and the backwards version fails almost every time. Nobody measures. The pilot launches with fanfare and no baseline, so a year later nobody can say whether anything improved, which means nothing gets killed and nothing gets scaled, the worst of both. The wrongness has no catcher. AI is confidently wrong a small but real percentage of the time, chapter two explains why it cannot be otherwise, and a system with no human check does not fail loudly, it fails politely, in writing, to your customers. And the spending has no meter. AI charges by the thought, and a badly designed flow thinks constantly, which is how businesses discover their first five-figure surprise.'),
      ...p('Every one of those failure modes has a cheap antidote, and the antidotes are this book: the fit test, the three questions, the tiers, the gates, the caps, the measuring habit. None of it is complicated. All of it is discipline, which is precisely what the hype is designed to make you skip.'),
    ),
    ...section(
      'THIS BOOK',
      'What this book is, and is not',
      ...p('This is a book for a business owner who suspects AI matters, is tired of being shouted at about it, and wants the composed version: what it actually is, in plain words. Where it genuinely pays in a business like yours, a shorter and more valuable list than the sales decks show. What it costs, honestly, and how the costs explode when nobody is watching. How to keep it safe, private and legal, because your customers\' information and your name are in the room. And how to grow it, one proven rung at a time, while the hype cycle churns past.'),
      ...p('What it is not: a tour of this month\'s tools, a benchmark table, or a prediction about the future of intelligence. The specifics of models and prices change monthly; the principles here are built to survive them, which is why the book names kinds of things and teaches you to size any specific thing the market offers you.'),
      ...p('The place to start is the machine itself, stripped of both the marketing and the fear, because almost every expensive mistake in this field begins with a misunderstanding of what the thing actually is. That is chapter two.'),
      {
        type: 'diagram',
        id: 'btt-ch01-inventory-camera',
        caption: 'The inventory camera. LEFT: AI cameras, impressive, expensive, corrections cost more than counting. RIGHT: a clipboard and a checklist already solved it. Exciting is not a business case.',
      },
    ),
  ),
]
