import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch03Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 3,
    title: 'The anatomy of an automation that works',
    subtitle: 'Built for the real world, not the demonstration.',
  }),
  flow(
    ...p(
      'There is a canyon between an automation that works in a demonstration and one that works every night for years, and most of the disappointment in this field lives in that canyon. The demo version handles the happy path: the form submits cleanly, the systems respond promptly, everything flows. The real world supplies the other days: the malformed submission, the system that times out, the double-click that sends everything twice. This chapter is the anatomy of the second kind of automation, the one built for the real world, and its rules are few and firm.',
    ),
    {
      type: 'diagram',
      id: 'btr-ch03-canyon',
      caption: 'The canyon. LEFT: the demo, handles the happy path, works once. RIGHT: the dependable, handles the real world, works every night. Gap: malformed input, timeouts, double-clicks, busy days.',
    },
    ...section(
      'ONE JOB',
      'One job per workflow',
      ...p('The first rule is scope. An automation does one job, named after that job, and does it completely: handle a new enquiry, chase an overdue invoice, send the review request. The temptation is the mega-flow, one sprawling canvas that does everything, and it must be resisted, because a workflow that does everything is a workflow nobody can safely change. When one thing needs adjusting, the whole organism is on the operating table. Small workflows, each with one job, can be understood at a glance, tested alone, and fixed without fear. When a workflow grows a second job, it is time for a second workflow, a division chapter ten returns to.'),
      {
        type: 'diagram',
        id: 'btr-ch03-one-job',
        caption: 'One job per workflow. LEFT crossed: mega-flow nobody can safely change. RIGHT: four small named workflows, understood at a glance, tested alone, fixed without fear.',
      },
    ),
  ),
  flow(
    ...section(
      'THE TRIGGER',
      'A trigger chosen with care',
      ...p('The trigger deserves more thought than it usually gets, because a badly chosen trigger fires wrong forever. The questions: does it fire at the true moment, the enquiry arriving, not a nightly sweep that adds hours of delay to your speed-to-lead? Can it fire twice for one event, the impatient double-click, the retried submission, and if so, what stops the customer getting two acknowledgements? And can it fire on things it should not, the test entry, the spam submission, the internal email that matches the rule? A workflow with a precise trigger barely needs conditions. One with a sloppy trigger spends its life apologising downstream.'),
    ),
  ),
  flow(
    ...section(
      'FAILURE PATH',
      'The failure path is the design',
      ...p('Here is the professional secret of the whole discipline, the thing that separates the craft from the hobby: the happy path is the easy half. The design work is the failure path, deciding in advance what happens when a step does not work.'),
      ...p('Every step in a workflow can fail, the receiving system busy, the email address malformed, the record missing, and an automation with no failure plan fails silently, which chapter one\'s series has already flagged as the most expensive kind of failure in business. The design questions for every workflow: if a step fails, does the workflow stop or continue? Is the failed item retried, and how many times? Who gets told, because someone must always get told, a failure notification to a human is the minimum civilised behaviour of any automation. And what happens to the poor lead or invoice caught in the failure, is it parked somewhere visible, or lost?'),
      ...p('None of this requires engineering depth to specify. It requires the owner asking one question of every automation built for them: what happens when this breaks, and how do we find out? A builder with a good answer is a professional. A builder who says it will not break is describing the demo.'),
      {
        type: 'diagram',
        id: 'btr-ch03-failure-path',
        caption: 'The failure path is the design. Expected exit: worked, continue. Designed exit with equal weight: failed, retry, park it visible, tell a human always.',
      },
    ),
  ),
  flow(
    ...section(
      'LEGIBLE',
      'Built to be understood',
      ...p('The last anatomical rule sounds soft and is structural: an automation must be legible to the next person. Named after its job, not workflow 7 final v2. Steps labelled in plain English. The one-line description filled in: what triggers this, what it does, what it touches. A note on anything clever, because clever unexplained is a trap for whoever comes next, including you in eighteen months.'),
      ...p('This is chapter two\'s documentation doctrine turned into a building habit, and it costs minutes at build time against days at repair time. The test for the whole chapter compresses into one sentence: a working automation is one that a stranger could understand, that fails loudly, and that has already decided what to do on its worst day. Hold every workflow to that, and the canyon between demo and dependable closes.'),
      ...p('With the anatomy in hand, the next question is where to point it, and the answer is hiding in your own calendar. Finding what to automate is chapter four.'),
    ),
  ),
]
