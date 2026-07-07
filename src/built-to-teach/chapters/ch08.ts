import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch08Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 8,
    title: 'Onboarding: from first day to independent',
    subtitle: 'Ready before they arrive, a path not a firehose, the blend that works, and time to independent.',
  }),
  flow(
    ...p(
      'Onboarding is where everything in this book either pays off or fails visibly, because it is the moment a business most needs its training to work and most often has none, so the new person learns by consuming the most expensive resource in the building, a senior person\'s time, for weeks. This chapter is about turning onboarding from that painful, person-dependent scramble into a system that takes a new starter from their first day to genuinely independent, fast, and with far less of your best people\'s time. It is the same system from the earlier chapters, pointed at the highest-value moment for it.',
    ),
    ...section(
      'READY FIRST',
      'The system ready before they arrive',
      ...p('The first principle is preparation: the training a new person needs should already exist before they start, not be created on the fly while they wait. In the bottleneck model, onboarding begins on day one with a senior person clearing their calendar to explain the business, which is slow, inconsistent, and dependent on that person being available, and it means every new starter costs a chunk of your most valuable time. In the system model, the knowledge is already captured, the formats already made, the path already laid out, so onboarding is ready to run the moment someone joins, and it runs largely without a senior person having to deliver it in person. This is the payoff of the capture work from chapter four: done once, it serves every future new starter, so the effort that used to be repeated for each hire is spent once and reused forever.'),
      {
        type: 'diagram',
        id: 'bte-ch08-ready-before-arrive',
        caption: 'Ready before they arrive. LEFT (crossed): onboarding created on the fly on day one, a senior person clearing their calendar, slow, inconsistent, costs your most valuable time every hire. RIGHT (gold): the path, formats, and agent already built and waiting, done once, serves every future starter. The effort that used to repeat for each hire is spent once and reused forever.',
      },
    ),
    ...section(
      'THE PATH',
      'A path, not a firehose',
      ...p('Chapter three\'s anatomy applies most sharply to onboarding, because onboarding is where the firehose does the most damage. A new person given everything at once, the full induction, the entire manual, every system in a day, absorbs almost none of it and feels overwhelmed, which is the standard onboarding experience and it is a training failure. The system version is a path: a deliberate sequence of short pieces, one skill at a time, in a sensible order, so the person builds capability step by step rather than drowning on day one. First the things they need immediately, then the next layer, then the deeper knowledge, each in a format that suits it, each confirmed before moving on. A path respects how people actually learn, and it turns the overwhelming first week into a manageable progression that a new person can actually follow and retain.'),
      {
        type: 'diagram',
        id: 'bte-ch08-path-not-firehose',
        caption: 'A path, not a firehose. LEFT (crossed): everything dumped on day one, an overwhelmed new starter. RIGHT (gold): a deliberate sequence of short steps, day-one essentials first, then the next layer, then depth, each confirmed before the next. A path respects how people actually learn.',
      },
    ),
  ),
  flow(
    ...section(
      'THE BLEND',
      'The blend that works',
      ...p('The best onboarding blends the formats and the human touch deliberately, using each for what it is best at. The materials, the videos, the procedures, the podcasts for context on the commute, carry the bulk of the knowledge, the standardised how-things-work that does not need a person to deliver and is the same for every new starter. The training agent from chapter seven answers the endless specific questions a new person has, instantly and without embarrassment, which is exactly the load that used to fall on whoever sat nearest. The quizzes confirm each stage landed before moving on. And the human time, the senior person\'s involvement, is reserved for what only it can do, the judgment, the culture, the relationships, the welcome, the practice with real feedback, rather than being spent reciting information a video delivers better. This blend is what makes onboarding both better for the new person and dramatically cheaper in senior time, because the system carries the repeatable knowledge and the humans carry the human parts.'),
    ),
    ...section(
      'TIME TO INDEPENDENT',
      'Time to independent',
      ...p('The measure that matters for onboarding is how long it takes a new person to become genuinely independent, able to do the work well without constant help, and it is worth measuring because it reveals whether the system is working. In the bottleneck model, this is slow and variable, because it depends on how much of the busy expert\'s time the new person can get. In the system model, it is faster and more consistent, because the knowledge is available on demand rather than rationed by someone\'s availability, and the new person can progress as fast as they can learn rather than as fast as someone can teach them.'),
      ...p('The contrast is worth stating plainly, because it is the business case for this entire book compressed into one moment. Without the system, onboarding a new person means your most experienced operator spends a large part of a month teaching instead of doing the work only they can do, and the new person still ramps slowly and inconsistently. With the system, the same new person ramps faster, the senior operator spends a fraction of the time and only on the parts that need them, and the quality of the onboarding is the same for every hire because it does not depend on who happened to be free to deliver it. Faster to productive, far less senior time, consistent every time. That is what a training system does to onboarding, and for a growing business that hires regularly, it is one of the highest-return things in this series. The next chapter tackles the other moment training matters most, when the business changes, which is the hardest training challenge of all.'),
      {
        type: 'diagram',
        id: 'bte-ch08-time-to-independent',
        caption: 'Time to independent. WITHOUT THE SYSTEM (grey, slow, jagged): rationed by the expert\'s availability, senior person teaching most of a month. WITH THE SYSTEM (gold, faster, smooth): the new person progresses as fast as they can learn, senior time only on the human parts. Faster to productive, far less senior time, consistent every hire.',
      },
    ),
  ),
]
