import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch01Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 1,
    title: 'Why good systems fail without trained people',
    subtitle: 'Training got cheap. Adoption is the factor every other system multiplies by.',
  }),
  flow(
    ...section(
      'THE SHIFT',
      'The ground has shifted',
      ...p('Start here, because this book rests on it, and because it is the quiet reason so much else in a business fails. Training, teaching your people how the business actually works, used to be slow, expensive, and stuck in one shape, and it has just become fast, cheap, and available in every shape at once. Most businesses have not noticed, and they are still training the old way, or not training at all.'),
      ...p('The old way had two problems built into it. Training meant one format, usually the worst one, a manual nobody read, or a document that sat in a folder, or a single session in a room that people forgot by the following week. And training meant one bottleneck, a person, usually your best and most experienced person, standing next to the new starter for days, explaining the same things they explained to the last new starter, and the one before that. So training was something businesses did badly, or rarely, or not at all, because doing it properly cost the time of exactly the people who could least spare it.'),
      ...p('That world is over. The same shift that runs through everything we build has landed here, and it has landed hard. One well-made explanation of how something works can now become a written procedure, a video, a podcast episode people listen to in the car, a quiz that checks they understood, an infographic, and a voice you can ring and ask questions, all made in an afternoon, at a cost that used to be unthinkable. The thing that made training expensive, the production and the repetition, has collapsed, and what is left is the part that always mattered, the knowledge itself.'),
      ...p('And this matters more now than ever, because the technology a business runs on is changing faster than it ever has. The website, the CRM, the automations, the AI tools, everything this series builds, changes and improves constantly, and a team that cannot be trained at the speed the business changes is a team that falls behind its own tools. The businesses pulling ahead are the ones whose training keeps pace with their systems, and whose experienced people lead the business instead of endlessly re-explaining it. This book is how to build that.'),
      {
        type: 'diagram',
        id: 'bte-ch01-one-source-many-formats',
        caption: 'One source, many formats. One captured explanation at the centre, radiating into a written procedure, a video, a podcast, a quiz, an infographic, a voice agent. Made in an afternoon, from one source. The production collapsed. What is left is the knowledge itself.',
      },
    ),
    ...section(
      'ONE JOB',
      'The one job',
      ...p('Training has one job. Get what is in your best people\'s heads into the rest of the team, fast, so the business does not depend on any one person being present to function.'),
      ...p('Everything else serves that. Not the polish of the materials, not the cleverness of the tools, not how much content you produce. The only measure that counts is whether your people actually know how to do the work, so that the business runs well whoever is on, and does not grind to a halt every time the one person who knows how something works is away, busy, or gone.'),
      ...p('Because that is what untrained teams cost, and the cost is hidden until it hurts. The knowledge of how the business runs sits in a few heads, and everything routes through those heads: the questions only they can answer, the tasks only they know how to do, the new starter who can only learn by taking their time. It looks like it works, until the person is on leave, or leaves, and the business discovers how much of itself lived in one mind that is no longer in the room.'),
    ),
  ),
  flow(
    ...section(
      'THE TRAP',
      'The manager-as-manual trap',
      ...p('Here is the specific, expensive version of that, and most growing businesses are living in it right now. The person who should be guiding the business, the experienced manager, the senior operator, the owner, spends their week being a manual. Answering the same questions. Showing the same new starter the same things. Fixing the same misunderstandings. Being the human the whole team consults because the knowledge lives in them and nowhere else.'),
      ...p('It is worth seeing why this is so costly. The time of your most experienced people is the most valuable time in the business, and it is exactly the time being spent on repetition, on teaching the basics, on being consulted for things that could have been written down or recorded once. Every hour a senior person spends re-explaining how something works is an hour not spent on the things only they can do, the judgment, the strategy, the growth, the work you actually need their experience for. The manager becomes the bottleneck the whole business waits behind, and the business stalls, not because the market is hard or the people are weak, but because the knowledge never left the manager\'s head, so the manager can never stop teaching it.'),
      ...p('This is the trap this book breaks. Get the knowledge out of the heads and into materials the team can learn from without a person, and the senior people are freed to lead, the new starters ramp faster, and the business stops depending on a few tired minds being available at all times. The technology to do this properly has just arrived. What is missing in most businesses is the system, and that is what this book builds.'),
      {
        type: 'diagram',
        id: 'bte-ch01-manager-as-manual',
        caption: 'The manager as manual. LEFT: the knowledge lives in the senior person, so everyone waits there. RIGHT: the knowledge captured into a system the team draws from directly, the senior person freed to do the work only they can do. Every hour re-explaining is an hour not leading.',
      },
    ),
    ...section(
      'ADOPTION',
      'Adoption is the real reason systems fail',
      ...p('There is a bigger point underneath all of this, and it is why this book belongs at the heart of this series rather than at the edge of it. Every other book in this series builds a system, a website, a store, a follow-up machine, an automation engine, an AI capability, a content system, and every one of those systems shares a single point of failure that has nothing to do with the technology: whether the team actually uses it.'),
      ...p('The pattern is remorseless and it is everywhere. A business invests in a good system, launches it, and then watches it quietly die, not because it was built badly, but because the people were never properly trained to use it, so the old habits continued, the system sat unused, and the business concluded the technology had failed when the training had. The number one reason good systems fail is not the system. It is adoption, and adoption is training. A brilliant CRM that the team does not use is worth nothing. A powerful automation the team does not trust gets worked around. An AI tool nobody was taught to use becomes an expensive subscription. Every system this series builds is multiplied by exactly one factor, whether the people can and do use it, and that factor is set here, in the training.'),
      ...p('So this is not the soft book at the end of the series. It is the one that decides whether any of the others pay off, which is why it deserves the same care as all of them, and why the businesses that get real value from their systems are, without exception, the ones that trained their people to use them.'),
      {
        type: 'diagram',
        id: 'bte-ch01-adoption-failure',
        caption: 'Adoption is the real point of failure. A row of systems, each with a shared gate: DID THE TEAM ACTUALLY USE IT? Systems past a closed gate greyed, unused, worth nothing. Every system is multiplied by one factor, and it is set in the training.',
      },
    ),
  ),
  flow(
    ...section(
      'TWO WAYS',
      'A bottleneck, or a system',
      ...p('Every business handles this one of two ways, and knowing which one you are shapes everything that follows.'),
      ...p('The first is the bottleneck. The knowledge lives in a few heads, training happens by those heads explaining things in person, over and over, and there is no real system for it. It works, after a fashion, while the business is small and the key people are always around. Its ceiling is built in and invisible until you hit it: the business cannot grow faster than its experienced people can personally teach, it is fragile to anyone leaving, new starters take forever to become useful, and the senior people spend their lives repeating themselves instead of leading. The bottleneck is a fine way to start. It is a terrible way to grow.'),
      ...p('The second is a system. The knowledge of how the business works is captured out of the heads and into materials, taught in whatever formats suit whatever people, kept current as the business changes, and available on demand so nobody has to queue behind a busy expert. New people ramp in a fraction of the time. Change gets rolled out without chaos. The senior people teach once, into the system, and then lead. And crucially, the business owns its own knowledge, rather than renting it from the minds of whoever happens to still work there. It scales, it survives people leaving, and it frees your best people to do their best work.'),
      ...p('This book is about building the second. The chapters ahead are its parts: the knowledge as the asset you own, the anatomy of training that actually sticks, how to get what is in people\'s heads out of them, the full library of formats now available to you, the training agent that answers questions around the clock, the onboarding system, the art of rolling out change without a revolt, and the measuring that keeps it all honest. But before any of it, there is a question that decides whether you are building an asset or just making some videos, and the bottleneck never asks it. What is the knowledge of your business actually worth, and where does it currently live? That is chapter two.'),
    ),
  ),
]
