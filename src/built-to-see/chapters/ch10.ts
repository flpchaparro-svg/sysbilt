import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch10Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 10,
    title: 'Growing it over time',
    subtitle: 'See, understand, anticipate: the three stages, build when the decision needs it, grow without over-building.',
  }),
  flow(
    ...p(
      'A dashboard system, like everything in this series, grows in a sensible order rather than arriving complete, and this chapter is about that order: the maturity ladder from simply seeing what happened, to understanding why, to anticipating what is coming, and the discipline of building each view only when a real decision needs it. As everywhere in this series, the growth discipline is the same, build what you need, prove it works, and let it compound, resisting the temptation to build the impressive thing before the useful thing.',
    ),
    ...section(
      'THREE STAGES',
      'The three stages of seeing',
      ...p('Seeing clearly matures through three stages, and knowing which one you are at keeps you from reaching for the advanced thing before the basic thing is solid.'),
      ...p('The first stage is seeing what happened: the dashboards that show you the current state, leads, sales, cash, the numbers that tell you how things are and how they have been. This is the foundation, and it is where every business should start, because you cannot understand or anticipate anything until you can simply see the present clearly, and most businesses do not even have this, so getting to reliable, honest, current visibility of what is actually happening is the first and biggest step, and for many businesses it is enough to transform how they run.'),
      ...p('The second stage is understanding why: moving beyond what happened to why it happened, using the data to see the causes, which marketing drove the good month, where in the process the deals are being lost, what is actually behind the numbers. This is deeper, and it builds on the first, because you can only ask why once you can reliably see what. It is where the marketing view, the conversion analysis, and the plain-language questions from chapter eight earn their place, turning the dashboard from a report on the state of things into a tool for understanding the business.'),
      ...p('The third stage is anticipating what is coming: using the leading numbers and the patterns to see ahead, to catch the dip before it lands, to act on what is coming rather than what has happened. This is the most advanced, and it rests on the first two, because anticipating requires both seeing clearly and understanding the patterns, and it comes with the honesty from chapter eight\'s real picture, that anticipation is informed estimate, not certainty. Most businesses should be focused on the first stage, reaching for the second as that becomes solid, and treating the third as the advanced capability it is, valuable but built on the foundation of actually seeing and understanding first.'),
      {
        type: 'diagram',
        id: 'bse-ch10-three-stages',
        caption: 'The three stages of seeing. SEE WHAT HAPPENED, the foundation: the current state, where most should start, and most do not even have. UNDERSTAND WHY: the causes behind the numbers, built on seeing. ANTICIPATE WHAT IS COMING: the leading numbers and patterns, built on both, held as estimate not certainty. You cannot understand or anticipate until you can simply see.',
      },
    ),
    ...section(
      'BUILD WHEN',
      'Build the view when the decision needs it',
      ...p('The discipline that keeps a dashboard system from becoming an over-built museum is the same one this series applies everywhere: build a view when a real decision needs it, not because a chart would look impressive. Every view should exist because there is a question you are actually asking and a decision you are actually making that it informs, and a view built for any other reason, because the data was available, because it looked good in a demo, becomes the clutter that chapter three and six warned against, admired once and ignored.'),
      ...p('So the honest way to grow a dashboard system is to start with the views that answer the questions you are actually asking right now, usually the daily glance and one or two others, and add a new view only when a new question becomes one you genuinely need answered to make a decision. This keeps the system lean, useful, and used, because every view earns its place by informing real decisions, and it prevents the impressive-dashboard trap where a business builds an elaborate wall of charts that looks like serious data capability and actually gets ignored because none of it answers a question anyone is asking. Chart-porn, the beautiful dashboard built to impress rather than inform, is the vanity metric of this book, and the discipline against it is to demand that every view justify itself by the decision it drives.'),
      {
        type: 'diagram',
        id: 'bse-ch10-build-when-decision',
        caption: 'Build the view when the decision needs it. A view tested by: is there a real question and a real decision this informs? A real one, build it. It would look impressive, do not, chart-porn, the vanity metric of this book, admired once and ignored. Every view earns its place by the decision it drives.',
      },
    ),
  ),
  flow(
    ...section(
      'GROWING',
      'Growing without over-building',
      ...p('The signs you are ready to grow the system are the good ones, the same across this series: the views you have are used and trusted, they are honest and current, the team runs its rhythms from them, and there is a genuine new question you keep needing to answer that no current view addresses. Then you add the view that answers it, build it on the same owned data and shared definitions, prove it gets used, and continue. Grow the system the way the whole series builds, one proven, useful piece at a time, in the sensible order of see-then-understand-then-anticipate, and you get a dashboard system that is always useful and never an over-built screen nobody reads. The temptation, once you can pull data from everywhere, is to build everything, and the discipline is to build what earns its place, which is what keeps seeing clearly a genuine capability rather than an impressive-looking distraction. With the growth discipline set, the next chapter is the toolkit of prompts that helps you make sense of your numbers, and then the close.'),
      {
        type: 'diagram',
        id: 'bse-ch10-grow-one-view',
        caption: 'Grow one proven view at a time. A staircase starting with the daily glance and one or two views, used and trusted, each new view added only when a genuine new question keeps needing answering. Faded warning: an elaborate wall of charts built all at once, impressive-looking, ignored. Build what earns its place, in the order see-understand-anticipate.',
      },
    ),
  ),
]
