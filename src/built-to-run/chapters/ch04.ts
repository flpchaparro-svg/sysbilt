import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch04Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 4,
    title: 'Finding what to automate',
    subtitle: 'The audit, the rule of three, the never-automate list, and the order that builds momentum.',
  }),
  flow(
    ...p(
      'The question owners ask is what can be automated, and it is the wrong question, because the honest answer, almost anything, helps nobody. The right question is what should be, in your business, in what order, and the answer is not hiding in a platform\'s template gallery. It is hiding in your own week. This chapter is the finding method: the audit, the rule of three, the never-automate list, and the order that builds momentum instead of mess.',
    ),
    ...section(
      'THE AUDIT',
      'The audit of your own week',
      ...p('For one ordinary week, keep a scrap of paper or a note on your phone, and every time you or your team do something that feels like ferrying, copying details between systems, sending an email you have sent before, chasing something again, reminding someone of something, checking whether a thing happened, write it down. One line each. Do not fix anything yet, just collect.'),
      ...p('The list at the end of the week is your automation backlog, and it will be longer than you expect, because this work is invisible precisely by being habitual. The items that appear multiple times in one week go to the top. The items that made you sigh go next. This beats any generic checklist because it is not a guess about businesses like yours, it is evidence about yours, and the sighs are data.'),
      {
        type: 'diagram',
        id: 'btr-ch04-week-audit',
        caption: 'The audit of your own week. A notepad with tally marks, highest-tally items rising to the top. Not a guess about businesses like yours. Evidence about yours.',
      },
    ),
  ),
  flow(
    ...section(
      'RULE OF THREE',
      'The rule of three',
      ...p('The qualifying test for any item on the list: has it been done three times, the same way? Then it is a candidate. The rule works in both directions. Done three times identically means the process is stable enough to hand to a rule, you have effectively already written the specification by living it. But done once, or done differently every time, means automating it now freezes a process that has not settled, and an automation of an unsettled process is a machine for producing consistent mistakes. Stabilise first, automate second. The corollary is worth a smile: the best preparation for automation is simply writing down how you do things, which is why businesses with documented processes automate in weeks while others flounder, and why this series keeps threading training and documentation through every book.'),
      {
        type: 'diagram',
        id: 'btr-ch04-rule-of-three',
        caption: 'The rule of three, both directions. Done three times the same way: automate. Done once or differently each time: stabilise first, or the machine produces consistent mistakes.',
      },
    ),
  ),
  flow(
    ...section(
      'NEVER',
      'What never gets automated',
      ...p('Now the line that keeps this whole discipline premium rather than penny-wise, and it deserves plain words. Some things are never handed to rules, at any volume, at any savings.'),
      ...p('Judgment calls: anything where the right answer depends on reading a situation, pricing the unusual job, handling the delicate complaint, deciding whether an exception deserves one. Relationships at their human moments: the apology that matters, the congratulations that should feel personal, the difficult conversation, because the recipient can always tell, and the entire premium of a premium business lives in people feeling personally attended. And genuine exceptions: the rule of three inverted, the situations that are different every time are different every time, and a rule applied to them produces confident wrongness.'),
      ...p('The pattern underneath, carried from chapter one: automation takes the machine work so people can do the human work. The moment it starts taking the human work, it is not saving money, it is spending trust, and trust is the expensive one.'),
      {
        type: 'diagram',
        id: 'btr-ch04-never-automate',
        caption: 'What never gets automated. Judgment calls, human moments, genuine exceptions. The machine takes the machine work. The moment it takes the human work, it is spending trust.',
      },
    ),
  ),
  flow(
    ...section(
      'QUICK WINS',
      'Quick wins before deep builds',
      ...p('Last, the ordering, because momentum is a strategy. The instinct after the audit is to attack the biggest, hairiest item first, the full quote-to-invoice pipeline, the everything-machine. Resist it. Deep builds on day one mean months of nothing visible, a team watching a project instead of experiencing a change, and a first impression of automation as complicated.'),
      ...p('Start instead with the quick wins: the acknowledgement that answers every enquiry within a minute, the missed-call text-back, the invoice reminder, the appointment nudge. Each is a single afternoon of building, each is felt immediately, and each teaches the team the honest lesson that makes everything after easier: this is not scary, this is Tuesday\'s chore, gone. Two or three quick wins buy the credibility, and the appetite, for the deeper builds, and by then the failure-path habits from chapter three have been practised on things too small to hurt.'),
      ...p('Which raises the obvious question: quick wins and deep builds from what menu? The next chapter is that menu, the largest in this book, a library of what businesses like yours actually automate, area by area, built to be raided for ideas.'),
      {
        type: 'diagram',
        id: 'btr-ch04-quick-wins',
        caption: 'Quick wins before deep builds. Small gold steps first: instant acknowledgement, invoice reminder, missed-call text-back. Larger steps earned by the credibility of the small ones.',
      },
    ),
  ),
]
