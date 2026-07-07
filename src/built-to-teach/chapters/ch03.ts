import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch03Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 3,
    title: 'The anatomy of training that sticks',
    subtitle: 'One skill at a time, show then do then check, short and close to need.',
  }),
  flow(
    ...p(
      'Having the knowledge is not the same as the team knowing it, and this chapter is about the difference. Most training fails not because the information was wrong but because of how it was delivered, one long session, one dense document, told once and never checked, in a shape and at a pace that guaranteed people would forget it. Training that sticks has an anatomy, and it is simple, learnable, and almost the opposite of how most businesses do it. This is that anatomy, so that everything you build in the chapters ahead is built to be remembered rather than just delivered.',
    ),
    ...section(
      'ONE SKILL',
      'One skill at a time',
      ...p('The first rule is scope, and it is the one most training breaks. Training that sticks teaches one thing at a time, one skill, one procedure, one concept, learned properly before moving to the next. The common failure is the firehose: the full-day induction, the everything-at-once handover, the giant manual, which overwhelms the person so completely that almost nothing lands, because a human being can only absorb so much at once and the rest simply washes past. Break the knowledge into single skills, each taught on its own, and each one has a chance to stick. This is also what makes the format library in chapter five work, because a single skill is exactly the right size for a short video, a one-page procedure, or a two-minute podcast segment, whereas everything-at-once fits no format well.'),
      {
        type: 'diagram',
        id: 'bte-ch03-one-skill',
        caption: 'One skill at a time. LEFT (crossed): a firehose of everything-at-once hitting an overwhelmed person, almost nothing lands. RIGHT (gold): single skills delivered one at a time, each landing. Each has a chance to stick, and fits a short format.',
      },
    ),
    ...section(
      'SHOW DO CHECK',
      'Show, then do, then check',
      ...p('People do not learn by being told, they learn by being shown and then doing, so training that sticks follows a simple sequence. Show them how the thing is done, clearly, in a format they can absorb. Then have them do it themselves, because the doing is where learning actually happens and being told is not. Then check they have got it, gently, so that both they and you know it landed rather than assuming it did. Most business training stops at the first step, telling, and skips the doing and the checking entirely, which is why so much of it evaporates. The showing can be a video or a written procedure, the doing is the real task with support, and the checking is the quiz or the observation from later in this chapter, and the three together are what turn information into capability.'),
      {
        type: 'diagram',
        id: 'bte-ch03-show-do-check',
        caption: 'Show, then do, then check. SHOW: demonstrate it clearly. DO: they do it themselves, where learning happens. CHECK: confirm it landed. Most training stops at SHOW. Being told is not learning. Doing is.',
      },
    ),
  ),
  flow(
    ...section(
      'SHORT',
      'Short beats long',
      ...p('Training that sticks is short, and delivered close to when it is needed. A five-minute lesson at the moment someone needs to do the thing beats an hour-long session weeks before they will use it, because people forget what they are not about to apply, and a wall of training delivered all at once, far from the work, is mostly forgotten by the time the work arrives. Short pieces, available when the need is live, are how knowledge actually reaches the moment it matters. This is why the format library favours short, findable pieces over long courses, and why the training agent in chapter seven, answering a specific question at the exact moment it is asked, is such a powerful form of training: it is the shortest possible lesson, delivered at the precise moment of need.'),
      {
        type: 'diagram',
        id: 'bte-ch03-short-close',
        caption: 'Short and close beats long and early. LEFT (crossed): a long session weeks before, mostly forgotten by the time the work arrives. RIGHT (gold): a five-minute lesson right at the moment of need, applied immediately. People forget what they are not about to apply.',
      },
    ),
    ...section(
      'SPACED',
      'Repetition, spaced out',
      ...p('People forget, that is simply how memory works, and training that sticks accepts this and plans for it with repetition spread over time rather than crammed into one sitting. Something taught once and never revisited fades. The same thing encountered again a few days later, and again a while after that, sticks, because each repetition strengthens the memory. You do not need the science, you need the habit: important things get taught more than once, spaced out, and the materials are available for people to revisit rather than being a one-time event. This is another reason the knowledge base and the on-demand formats matter so much, because they let people encounter the knowledge repeatedly and on their own schedule, which is exactly what memory needs, instead of relying on a single session to do a job a single session cannot do.'),
    ),
    ...section(
      'THE CHECK',
      'The check that confirms it landed',
      ...p('The last part of the anatomy is the one businesses skip most and need most: confirming the training actually worked. Training delivered is not training learned, and the only way to know the difference is to check, with a quiz, an observation, a simple confirmation that the person can now do the thing. The check is not a test to catch people out, it is a confirmation for both sides that the knowledge landed, and where it did not, a signal of exactly what to teach again. Without the check, you are hoping, and hope is not a training strategy, because the cost of assuming someone learned something they did not shows up later as a mistake, and by then it is expensive. The quiz from the format library is the easy version of this, and it turns training from something you delivered and hoped about into something you delivered and confirmed.'),
      ...p('That is the anatomy: one skill at a time, show then do then check, short and close to the need, repeated over time, and confirmed to have landed. Build every piece of training in the chapters ahead to that shape, and it will be remembered rather than just delivered. The next chapter is the practical problem that has to be solved before any of this can happen, getting the knowledge out of your experts\' heads in the first place.'),
    ),
  ),
]
