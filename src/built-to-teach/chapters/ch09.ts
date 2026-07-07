import type { BtwPage } from '../types'
import { flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch09Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 9,
    title: 'Change management: rolling out new systems without the revolt',
    subtitle: 'Why people resist, explain why before how, support generously then commit fully, and shipping change with its story.',
  }),
  flow(
    ...p(
      'This is the chapter that makes every other book in this series actually work, because every system this series builds is a change, and change is where good systems go to die. You can build the perfect CRM, the perfect automation, the perfect new process, and watch it fail completely, not because it was wrong, but because the people resisted it, worked around it, and went back to the old way. Managing that, bringing people along through change, is a genuine discipline, and it is the difference between a business that can adopt new systems and one that is stuck with whatever it has because change always fails. This chapter is that discipline.',
    ),
    ...section(
      'WHY RESIST',
      'Why people resist',
      ...p('Start with the real reason people resist change, because the usual explanation, they are lazy or stubborn, is wrong and it leads to handling it badly. People resist change for an understandable reason: a new system makes competent people incompetent again, temporarily. The person who was fast and confident with the old way is suddenly slow and unsure with the new one, and nobody enjoys being a beginner again at work, especially in front of others, especially when they were the expert yesterday. The resistance you meet is often not disagreement with the change, it is the discomfort of being made a novice, wearing the disguise of practical objections. Understanding this changes everything about how you handle it, because you stop arguing with the objections, which are not the real issue, and start addressing the discomfort, which is, with support, patience, and a path back to competence.'),
      {
        type: 'diagram',
        id: 'bte-ch09-why-resist',
        caption: 'Why people resist. A competent, confident person on the old way, then made a slow, unsure beginner again on the new way. Nobody enjoys being a novice again, especially in front of others. Address the discomfort, not the objections, which are not the real issue.',
      },
    ),
    ...section(
      'WHY BEFORE HOW',
      'Explain why before how',
      ...p('The first rule of rolling out change is to explain the why before the how, because people asked to change how they work will resist if they do not understand the reason, and accept far more readily if they do. Before teaching anyone which buttons to press in the new system, tell them plainly why the business is changing, what problem it solves, what is in it for them and the business. People can accept the discomfort of learning something new when they understand the point of it, and they resent it when it feels like change for its own sake imposed from above. The why is not a nicety to skip in the interest of time, it is what buys the willingness to push through the awkward learning phase, and skipping it is why so many rollouts meet a wall of quiet resistance that the managers mistake for stubbornness when it is really just people who were never told why they should bother.'),
      {
        type: 'diagram',
        id: 'bte-ch09-why-before-how',
        caption: 'Explain why before how. LEFT (crossed): straight to the how, buttons to press, meeting a wall of quiet resistance. RIGHT (gold): the why first, the problem it solves, what is in it for them, then the how, met with willingness. The why is what buys the willingness to push through the awkward phase.',
      },
    ),
  ),
  flow(
    ...section(
      'SUPPORT THEN COMMIT',
      'Train in every format, then make it the only way',
      ...p('The rollout itself uses everything this book has built. The change is taught in multiple formats, the video showing the new way, the procedure to reference, the podcast explaining the context and the why, the quiz confirming it landed, so that people can learn it the way that suits them. There is a support window, a period after the change where questions are actively invited and answered, where the training agent absorbs the flood of how-do-I-now questions, where friction gets found and fixed fast, and where people are given room to be temporarily incompetent without penalty while they climb back to competence. And then, after the support and the learning, the new way becomes the only way, because a change that leaves the old way available as an option is a change most people will quietly decline, drifting back to what was comfortable, so at some point, with the support having been given, the old way is genuinely retired. Support generously, then commit fully, is the shape, and both halves matter, because support without commitment lets the change fade and commitment without support causes the revolt.'),
      {
        type: 'diagram',
        id: 'bte-ch09-support-then-commit',
        caption: 'Support generously, then commit fully. TRAIN (multiple formats) → SUPPORT WINDOW (questions invited, agent absorbing them, friction fixed, room to be temporarily incompetent) → THE OLD WAY RETIRED. A faded failure branch: no support, or old way left available, leading to reversion. Support without commitment fades. Commitment without support revolts.',
      },
    ),
    ...section(
      'PREMIUM MOVE',
      'The premium move: ship every change with its story',
      ...p('Here is the practice that makes this series\' businesses adopt change smoothly, and it is a genuinely premium touch that also happens to be effective. Every significant change ships with its own content, made from the knowledge base, explaining what changed and why: a short podcast episode people can listen to, a brief blog post or written note, a two-minute video. Instead of a change being announced in a terse message or a rushed meeting, it arrives wrapped in a clear, considered explanation that treats the team like people worth bringing along properly. We changed this, here is a short podcast on what and why, is a message that lands completely differently from a one-line instruction to start doing things differently, and it is now cheap to produce, an afternoon\'s work with the tools this book describes. This is the shift this book opened with applied to change management: the ability to wrap every change in proper, multi-format explanation, quickly and affordably, which used to be impossible and is now a normal part of rolling something out. It signals that the business takes its people seriously, and it dramatically reduces resistance, because people resist a curt imposition and accept a considered explanation.'),
    ),
  ),
  flow(
    ...realPicture({
      leadIn: 'It is worth being honest about why change management is a real discipline and not just being nice, because the failure of change is one of the most expensive and most predictable things in business, and it is almost always a people failure dressed up as a technology failure.',
      title: 'The real picture',
      paragraphs: [
        'When a business invests in a new system and it does not take, the post-mortem usually blames the system, it was too complicated, it did not fit, the vendor oversold it. Occasionally that is true. Far more often, the system was fine and the rollout failed, because the human side was ignored: people were not told why, were not trained properly, were not supported through the awkward beginner phase, and were left with the old way available as an escape route, so they escaped. The change failed for entirely predictable human reasons, and the business concluded the technology does not work for us, when what actually happened is that change was managed badly, and the same thing will happen to the next system, and the next, until the human side is taken seriously.',
        'The pattern has a shape, and once you see it you can plan for it. There is the dip, the period right after a change when things get worse before they get better, because people are slow and unsure with the new way, and productivity drops, and complaints rise, and this dip is normal and temporary but it is exactly when businesses panic and abandon the change, right before it would have paid off. There is the escape route, the old way left available, which guarantees a share of people quietly revert, so the change never fully lands. And there is the silent resister, the person who does not argue but simply does not adopt, waiting for the whole thing to blow over, which it will if enough people wait. Each of these is predictable, and each has an answer: expect the dip and hold through it, close the escape route once support has been given, and make adoption visible enough that quiet non-adoption is noticed and addressed rather than allowed to spread.',
        'The support window is the piece businesses skip most and need most, and it is worth dwelling on. In the days and weeks after a change, questions spike, friction appears, and people need help climbing back to competence, and a business that provides that help generously, the training agent answering questions, someone available to unstick people, fixes made fast, gets people through the dip and out the other side committed. A business that announces a change and then disappears, offering no support through the hard part, leaves people stranded in the dip, where resentment grows and reversion begins, and the change dies not because it was wrong but because nobody helped anyone through the worst of it. The support window is not indulgence, it is the difference between a change that lands and one that fails, and it is cheap compared to the cost of a failed rollout, which is the whole investment plus the damage to the business\'s willingness to ever try again.',
        'None of this is soft. Change management is the hard, practical discipline of getting real people to actually adopt real systems, and it is the hinge on which every technology investment in this series turns, because the best system in the world delivers nothing until the people use it, and getting the people to use it is exactly this. A business that masters change management can adopt anything, and compounds its advantages system by system. A business that does not is stuck, not for lack of good systems, but for lack of the ability to bring its people through the change to reach them.',
      ],
    }),
    {
      type: 'diagram',
      id: 'bte-ch09-the-dip',
      caption: 'The dip. A performance curve over a change: a dip right after, worse before better, normal and temporary, and exactly when businesses panic and abandon it, right before it pays off, rising to a higher level than before. The support window shown holding people through the dip. Expect the dip, and hold through it.',
    },
    ...section(
      'IN SHORT',
      'In short',
      ...p('Change management is what lets a business actually get the value of everything else this series builds, because it is the discipline of turning a new system from a thing that was installed into a thing that is used. Explain the why, train in every format, support generously through the dip, then commit fully, and wrap every change in its own clear explanation, and you become a business that can adopt change rather than one defeated by it. The remaining chapters are about knowing whether the training system is working, the toolkit of prompts, and the close. The system is built. The next chapter is how you tell it is working and keep it growing.'),
    ),
  ),
]
