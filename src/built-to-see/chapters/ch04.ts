import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch04Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 4,
    title: 'The numbers that matter',
    subtitle: 'Leading versus lagging numbers, the core set most businesses need, and vanity numbers to ignore.',
  }),
  flow(
    ...p(
      'A dashboard is only as useful as the numbers on it, and choosing the right numbers is where most of the value in this whole book actually lives, because a well-built view of the wrong numbers tells you nothing useful beautifully. This chapter is about metric literacy in plain terms: the crucial difference between numbers that tell you about the past and numbers that tell you about the future, the few numbers that genuinely matter for most businesses, and how the right ones change depending on what you are trying to do. No jargon, no formulas, just how to know which numbers deserve your attention.',
    ),
    ...section(
      'LEADING',
      'Leading and lagging, the most useful distinction there is',
      ...p('The single most useful idea in measuring a business is the difference between lagging numbers and leading numbers, and understanding it changes how you look at everything.'),
      ...p('A lagging number tells you about the past, the result that has already happened. Revenue is the classic: it tells you what you earned, which is real and important and completely done, because you cannot change last month\'s revenue. A leading number tells you about the future, the activity now that predicts the results to come. Leads coming in, quotes going out, the pipeline of work in progress, these are happening now and they predict what your revenue will be later, which means, unlike revenue, you can still affect them.'),
      ...p('Why this matters is the whole point of seeing clearly. Lagging numbers, revenue, profit, the finished results, are the ones businesses naturally watch, and they are backward-looking, the rear-view mirror from chapter one, so watching only them means always learning too late. Leading numbers, the activity that predicts results, are the ones you can actually act on, because they are happening now and there is still time to change them. A business watching its leading numbers sees a problem coming, leads have dropped this week, so revenue will drop in two months, and can act now, while a business watching only revenue finds out about the same problem two months later when the revenue actually drops and it is too late to prevent. Watch both, but understand that the leading numbers are where you can still steer, and the lagging numbers are where you confirm the results, and a dashboard that shows only lagging numbers is a rear-view mirror while one that shows leading numbers too is a windscreen.'),
      {
        type: 'diagram',
        id: 'bse-ch04-leading-lagging',
        caption: 'Leading and lagging. LAGGING (rear-view): revenue, profit, results already done, you cannot change them. LEADING (windscreen): leads, quotes, pipeline, happening now, still time to steer. Watch both, but steer on the leading numbers.',
      },
    ),
    ...section(
      'CORE',
      'The core numbers most businesses need',
      ...p('Every business is different, but a core set of numbers matters for most, and it maps to the systems this whole series has built. It is worth knowing them plainly, because these are the candidates for your dashboards.'),
      ...p('On the getting-work side, the leading numbers: how many leads are coming in and from where, how many quotes or proposals are going out, and the value and health of the pipeline, the work in progress that predicts future revenue. These come from the CRM this series built, and they are the earliest signals of where the business is heading. On the conversion side: what proportion of leads become customers, which tells you how well the business turns interest into work, and how fast, because a slowing conversion is an early warning. On the results side, the lagging numbers: revenue, and, the one owners most often fly blind on, margin, what is actually left after costs, because a business can grow its revenue and shrink its margin and feel successful right up until it is in trouble. On the money side: the cash position, what is actually in the bank and what is owed, because profit and cash are not the same thing and businesses run out of cash, not profit. And on the delivery side: whether the business can actually deliver the work it is winning, the capacity and the workload, because winning more than you can deliver is its own kind of problem.'),
      ...p('That is the core, and most businesses need a view of some numbers from each group: the leading indicators that predict, the conversion that reveals how well the machine works, the results that confirm, the cash that keeps the doors open, and the capacity that keeps promises. Not all of them on one screen, chapter three forbade that, but the right ones, in the right views, for the questions that matter.'),
      {
        type: 'diagram',
        id: 'bse-ch04-core-numbers',
        caption: 'The core numbers most businesses need. Getting work (leads, quotes, pipeline), conversion, results (revenue, margin), money (cash, owed), delivery (capacity, workload). Not all on one screen, the right ones in the right views.',
      },
    ),
  ),
  flow(
    ...section(
      'GOAL',
      'The right numbers change with the goal',
      ...p('Which numbers matter most is not fixed, it depends on what the business is trying to do right now, and this echoes the content book\'s point about strategy: what you measure should follow what you are building. A business focused on growth watches leads and pipeline and conversion most closely, because those are the numbers that tell it whether the growth is coming. A business focused on profitability watches margin and costs most closely, because revenue growth means nothing if the margin is bleeding. A business worried about cash watches the cash position and what is owed above everything, because that is the number that determines survival. A business at capacity watches delivery and workload, because its constraint is no longer winning work but doing it.'),
      ...p('So the numbers on your dashboards should reflect your actual priorities, not a generic list, and they should change as your priorities change. The mistake is watching the same numbers out of habit regardless of what the business actually needs to focus on, which means watching numbers that are not the ones that matter right now. Decide what the business is trying to achieve this quarter, and put the numbers that tell you whether you are achieving it front and centre, which is the honest version of choosing what to measure.'),
      {
        type: 'diagram',
        id: 'bse-ch04-numbers-follow-goal',
        caption: 'Numbers follow the goal. Growth: leads, pipeline, conversion. Profitability: margin, costs. Cash: position and owed. Capacity: delivery, workload. What you measure should follow what you are building this quarter.',
      },
    ),
    ...section(
      'VANITY',
      'Vanity numbers, again',
      ...p('One warning carries over from the content book because it applies to all business numbers, not just content: beware the number that looks good and means nothing. Just as follower counts flatter without paying, plenty of business numbers can go up and feel good while telling you nothing useful, total website visitors that never convert, total leads that are mostly junk, revenue that hides a collapsing margin. The discipline is the same everywhere in this series: watch the numbers that connect to real outcomes, and be ruthless about ignoring the ones that merely flatter, however good they feel to watch. A number belongs on your dashboard only if you would act differently based on what it shows, and a number you would never act on is decoration, taking up space the numbers that matter should have.'),
      ...p('That is metric literacy in plain terms: know your leading numbers from your lagging ones, watch the core set that matters for your business, let your actual priorities decide which matter most right now, and ignore the ones that only flatter. With the right numbers chosen, the next chapter is the library of actual views you can build from them, the dashboards most businesses genuinely need.'),
    ),
  ),
]
