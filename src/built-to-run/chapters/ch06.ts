import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch06Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 6,
    title: 'Running it day to day, and the human in the loop',
    subtitle: 'The machines prepare, the humans approve, and a small daily rhythm keeps it trustworthy.',
  }),
  flow(
    ...p(
      'A business full of automations does not run itself in the science-fiction sense, and this chapter is the honest version of what it does instead: the machines do the preparing, the humans do the approving, and a small daily rhythm keeps the whole orchestra trustworthy. This is also the chapter that answers the quiet worry underneath this entire book, how do I hand work to machines without losing control of my own business, and the answer is a pattern with a name.',
    ),
    ...section(
      'HUMAN IN THE LOOP',
      'The human in the loop',
      ...p('The pattern is this: the machine prepares, the human approves, and the split between them is drawn by stakes, not convenience.'),
      ...p('Anything internal and reversible can simply run: the record updated, the task created, the digest assembled, the reminder queued. Anything customer-facing or irreversible gets a gate: the message drafts rather than sends, the refund proposes rather than processes, the unusual case parks itself for a person. The gate is not a failure of automation, it is the design, because the whole promise of chapter one was machines doing machine work so people can do judgment work, and approving is judgment work distilled: thirty seconds of human read on the machine\'s ten minutes of preparation.'),
      ...p('Drafts, not sends, deserves its moment as the golden rule of customer-facing automation. A drafted message costs you one review; a wrongly sent one costs you a relationship and your name on the mistake. The signature workflow from chapter five embodies it exactly: the research done, the reply written, the whole thing waiting in drafts, and the human contribution reduced to the two things only a human should do, the judgment and the send. As trust in a specific workflow accumulates over months, some gates can widen, the truly routine acknowledgements flowing straight through, but the direction of travel is always earned, never assumed, and anything with stakes keeps its gate forever.'),
      {
        type: 'diagram',
        id: 'btr-ch06-human-loop',
        caption: 'The human in the loop. MACHINE prepares, GATE the human\'s thirty seconds of judgment, WORLD the send, spend, decision. Internal and reversible runs freely. Drafts, not sends.',
      },
    ),
  ),
  flow(
    ...section(
      'TWO MINUTES',
      'The two-minute daily check',
      ...p('The operating rhythm is almost embarrassingly small. Once a day, two minutes: the failure notifications, because chapter three built every workflow to tell a human when something broke, and this is the human being told; the approval queue, the drafts awaiting their thirty seconds; and a glance at the morning digest, which is itself an automation reporting on the others.'),
      ...p('That is the whole ceremony, and its smallness is the point. The owner who used to spend evenings being the glue now spends two minutes being the editor, and the difference in what those two roles do to a person\'s week, and judgment, and family dinners, is the entire argument of this book measured in one habit.'),
      {
        type: 'diagram',
        id: 'btr-ch06-two-minute-check',
        caption: 'The two-minute check. 1 FAILURE FLAGS anything that broke. 2 APPROVAL QUEUE drafts awaiting judgment. 3 THE DIGEST the machine reporting on the machines. From glue to editor, in one habit.',
      },
    ),
  ),
  flow(
    ...section(
      'STAY SHARP',
      'Keeping the humans sharp',
      ...p('One honest caution the vendors never mention: automation done well creates a new risk, the atrophy of attention. When the machine is right ninety-nine times, the hundredth gets rubber-stamped, and the approval gate quietly becomes a formality, which is how a wrong quote goes out with a human signature on it. The defences are small and cultural: approvals read, not skimmed, because thirty seconds means thirty seconds; the occasional deliberate question in the weekly rhythm, what did the machines get wrong this week, asked expecting an answer; and the standing rule that anyone can halt any automation that looks off, no permission needed, because a paused workflow costs minutes and a wrong one running costs more. The machines never get tired. The job of the humans is to never get careless, and it is a lighter job, but it is still a job.'),
    ),
  ),
  flow(
    ...section(
      'FIRE DRILL',
      'The fire drill: when a workflow stops',
      ...p('At some point a workflow will die, and the drill mirrors its siblings across this series.'),
      {
        type: 'fireDrill',
        title: 'Workflow fire drill',
        steps: [
          'Check the platform\'s own history first. Every serious platform shows each run of each workflow, succeeded, failed, or never triggered, and the pattern tells the story: failing runs point to a broken step, no runs at all point to a dead trigger or an expired credential.',
          'Capture before touching: which workflow, when it last ran cleanly, the error text if any, and what changed lately, because something always changed, a renamed field, an updated app, a new form.',
          'Send it to whoever maintains the system with all of the above, and resist the urge to re-run blindly, because re-running a half-failed workflow can double-send what already half-sent.',
          'And the standing habit that makes the drill rare: the monthly test, one real enquiry, one real invoice reminder, walked through end to end, eyes on. Chapter seven explains why even untouched automations decay; the monthly test is how decay gets caught at the size of a five-minute fix.',
        ],
      },
    ),
    ...p(
      'The rhythm, the gates, and the drill are the running of it. What keeps the machinery itself sound underneath, the credentials, the updates, the law when automations send messages and move data, is the next chapter.',
    ),
  ),
]
