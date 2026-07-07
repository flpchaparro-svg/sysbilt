import type { BtwPage } from '../types'
import { flow, glossary, opener, p, section } from '../../built-to-work/helpers'

export const ch12Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 12,
    title: 'Glossary, and who to call',
    subtitle: 'Plain meanings, plus who to talk to when you are ready.',
  }),
  flow(
    ...p(
      'The last chapter is a reference rather than a read: the plain meaning of the terms this book uses, and the honest note on what comes next.',
    ),
    ...glossary(
      {
        title: 'A plain-English glossary',
        intro: 'The terms worth knowing plainly, so you are never left nodding along to something you do not follow.',
      },
      [
        {
          term: 'Change management',
          definition: 'The discipline of getting people to actually adopt a new system or process, through explaining why, training, supporting through the hard part, and committing fully. The hinge every technology investment turns on.',
        },
        {
          term: 'Document-as-you-go',
          definition: 'The habit of capturing knowledge the moment it is worked out, as part of the work, rather than in a separate documentation project. How a knowledge base grows without a megaproject.',
        },
        {
          term: 'Format library',
          definition: 'The range of shapes captured knowledge can be turned into: procedures, videos, podcasts, infographics, quizzes, avatar presenters, and more. Serve the same knowledge in the shape that suits the knowledge and the people.',
        },
        {
          term: 'Key-person risk',
          definition: 'The danger that critical knowledge lives only in one person\'s head and leaves when they do. One of the largest and most ignored risks a growing business carries.',
        },
        {
          term: 'Knowledge base',
          definition: 'The written, current, organised record of how the business works. The asset the whole training system is built from, and the product behind any training agent.',
        },
        {
          term: 'Onboarding',
          definition: 'Bringing a new person from their first day to genuine independence. The highest-value moment for a training system, and where person-dependent training costs the most.',
        },
        {
          term: 'Single source of truth',
          definition: 'The one place how the business works is written down and kept current, from which every training format is generated. One source, one truth, everything else built from it.',
        },
        {
          term: 'Show then do then check',
          definition: 'The sequence of training that sticks: demonstrate it, have them do it, confirm it landed. Most training stops at telling.',
        },
        {
          term: 'Spaced repetition',
          definition: 'Encountering knowledge again over time rather than once, because that is how memory actually holds things. Why on-demand, revisitable materials beat one-time sessions.',
        },
        {
          term: 'Support window',
          definition: 'The period after a change when questions are actively invited and help is generous, carrying people through the dip to committed adoption. The step businesses skip most and need most.',
        },
        {
          term: 'Time to independence',
          definition: 'How long a new person takes to do the work well without constant help. The measure that reveals whether onboarding is working.',
        },
        {
          term: 'Training agent',
          definition: 'An AI voice or chat interface on top of your knowledge base, that the team can ask questions of at any hour. The look-it-up layer made effortless, and only as good as the knowledge behind it.',
        },
      ],
    ),
  ),
  flow(
    ...section(
      'NEXT STEP',
      'Who to call, and ongoing support',
      ...p('A training system is never finished, because the business it describes keeps changing, and the knowledge base, the formats, and the agent stay exactly as good as they are kept current. The businesses that get compounding value from training have someone who knows their particular system standing behind it: helping capture the knowledge in the first place, building it into the formats and the agent, and keeping the whole thing alive as the business moves, so the training keeps pace with the systems it teaches.'),
      ...p('So here is the honest invitation. You have just read what a training system that actually works looks like: the knowledge of the business captured out of people\'s heads and owned, turned into whatever format suits the person and the moment, available on demand through an agent that never tires, running onboarding that takes new people to independent fast, and rolling out change without the revolt that kills most new systems. If, reading it, you recognised your own business in chapter one, the knowledge trapped in a few heads, the senior people stuck being the manual, the good systems that failed because nobody was trained to use them, or you decided that building this properly is not how you want to spend the time it would free, then it is worth a conversation.'),
      ...p('The place to start is a Training Systems Review. It is a straight, no-obligation look at how your business currently captures and shares its knowledge, measured against everything this book describes: where the knowledge lives and how much of it is at risk, how onboarding actually works, whether change lands or fails, and what we would build first. There is no pitch and no pressure in it. Either way, you come away with a clear, honest picture of whether your business owns its knowledge or merely rents it from the people who happen to still work there.'),
      ...p('If that would be useful, request your review at sysbilt.com. Fill in the form and we will get back to you, and you will also receive an audit of your business, a clear read on where you stand right now and where the biggest gains are. Tell us you read this, and we will show you the system from these pages working, the knowledge captured, the formats generated, the agent answering, so you can see exactly how a business gets its knowledge out of heads and into something it owns before you decide anything at all.'),
      ...p('Because the businesses that pull ahead are not the ones with the most knowledge in their people\'s heads. They are the ones that got it out of the heads and into a system, so their best people lead instead of repeat, their new people ramp fast, and their good systems actually get used. When you are ready for that, we are ready to build it with you.'),
    ),
  ),
]
