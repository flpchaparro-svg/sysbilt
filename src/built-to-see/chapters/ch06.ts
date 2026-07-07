import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch06Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 6,
    title: 'Running it day to day',
    subtitle: 'Daily, weekly, and monthly rhythms, only show what you will act on, meetings from one screen.',
  }),
  flow(
    ...p(
      'A dashboard that is not looked at is a screen nobody reads, and this chapter is about making seeing clearly a habit rather than a thing you built and forgot. Running it well is a light rhythm, not a heavy chore, and it comes with one iron rule that separates a useful dashboard from an ignored one: only show what you will act on. This chapter is the rhythm and the rule, so the views from chapter five become part of how the business actually runs rather than another dashboard that dies of neglect.',
    ),
    ...section(
      'RHYTHMS',
      'The rhythms of looking',
      ...p('Seeing clearly works on rhythms matched to the views, and the rhythms are short by design. The daily glance takes two minutes at the start of the day, a quick look at the one view that answers is everything okay, to catch anything that needs dealing with today. The weekly review is where the pipeline and money views get a proper look, twenty minutes to see how the work is coming and how the finances are tracking, and to decide what the week needs, which is the same weekly rhythm this series\' CRM book built around the pipeline. The monthly review is the deeper look, the marketing view, the content view, the fuller picture, an hour to see what worked, what did not, and what to change, which is the same monthly loop the content book described. Each rhythm matches a view, and none of them is long, because the whole point is a quick, honest look that informs your judgment, not hours spent staring at data. Seeing clearly is meant to save time, not consume it, and the rhythms are deliberately brief so they actually get done.'),
      {
        type: 'diagram',
        id: 'bse-ch06-rhythms',
        caption: 'The rhythms of looking. DAILY: two minutes, the daily glance, is everything okay. WEEKLY: twenty minutes, pipeline and money. MONTHLY: an hour, marketing, content, the fuller picture. Short by design, matched to the views.',
      },
    ),
    ...section(
      'IRON RULE',
      'The iron rule: only show what you will act on',
      ...p('Here is the rule that most determines whether a dashboard gets used, and it is worth stating as bluntly as possible: a number you will not act on is a number that should not be on the dashboard. Every number on a view should be there because you would do something differently based on what it shows, and if you would not, it is decoration, and decoration crowds out the numbers that matter and trains you to ignore the whole thing.'),
      ...p('The reason this is iron is that dashboards die from clutter, and clutter comes from putting numbers on because you can rather than because they drive action. A view full of numbers you look at but never act on becomes wallpaper, glanced at and ignored, and its uselessness spreads to the numbers that do matter, which are now buried in the noise. So the discipline, applied ruthlessly and repeatedly, is to ask of every number, what would I do differently based on this, and if the answer is nothing, take it off. A lean dashboard of numbers that each drive a decision stays sharp and stays used. A dashboard that shows everything becomes something nobody reads, and then all the effort of building it is wasted. Show less, act more.'),
      {
        type: 'diagram',
        id: 'bse-ch06-act-on-only',
        caption: 'Only show what you will act on. LEFT (crossed): numbers on screen because you can, wallpaper, the useful ones buried in noise. RIGHT (gold): lean numbers, each one drives a decision. Ask of every number: what would I do differently? If nothing, take it off.',
      },
    ),
  ),
  flow(
    ...section(
      'MEETINGS',
      'Meetings that start from the same screen',
      ...p('One of the most valuable things a shared, honest dashboard does is end an old and tiresome argument: whose numbers are right. In businesses without a single source of truth, meetings dissolve into debates about whose spreadsheet is correct, whose figures are current, whose version of reality wins, and the meeting is spent reconciling numbers instead of making decisions. When everyone works from the same dashboard, built on the shared definitions from chapter two, that argument disappears, because there is one agreed picture, and the meeting can move straight to what the numbers mean and what to do about them.'),
      ...p('This is a quiet but real benefit of running the business from shared dashboards: the conversation shifts from arguing about the data to acting on it. The weekly review runs from the pipeline view everyone can see, the money conversation runs from the money view everyone trusts, and decisions get made on a shared reality rather than competing memories. A business that runs its meetings from one honest screen makes faster, better decisions, because it spends its meeting time deciding rather than disputing, and that alone can justify the whole system.'),
      {
        type: 'diagram',
        id: 'bse-ch06-one-screen',
        caption: 'Meetings from one screen. LEFT (crossed): whose spreadsheet is right, reconciling numbers instead of deciding. RIGHT (gold): one agreed dashboard, shared definitions, straight to what the numbers mean and what to do. Decide, do not dispute.',
      },
    ),
    ...section(
      'LISTENING',
      'The listening loop, for dashboards',
      ...p('As with every system in this series, running dashboards well includes noticing what they are not telling you, and adjusting. The questions that keep coming up that no view answers are a signal to build or change a view. The numbers that turn out not to drive any decision come off. The new priority that the current views do not reflect gets a view of its own. Dashboards are not built once and frozen, they evolve as the business\'s questions evolve, and a periodic look at whether the views still answer the questions you are actually asking keeps them useful rather than letting them drift into showing the questions you used to ask. Run this way, on light rhythms, with only actionable numbers, from a shared screen, and adjusted as the questions change, dashboards become part of how the business runs rather than a thing you meant to look at. The next chapter is about keeping the whole thing trustworthy, because a dashboard is only as good as the data behind it, and dirty data does not just fail, it convinces.'),
    ),
  ),
]
