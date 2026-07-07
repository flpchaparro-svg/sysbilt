import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch03Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 3,
    title: 'The anatomy of a dashboard that gets used',
    subtitle: 'One question per view, a handful of numbers, context on every figure, built for the glance.',
  }),
  flow(
    ...p(
      'Most dashboards fail the same way: they get built, admired once, and never looked at again, because they were designed to show everything rather than to answer something, and a wall of numbers that answers no question is a wall of numbers nobody reads. A dashboard that gets used has an anatomy, and it is almost the opposite of the everything-on-one-screen instinct. This chapter is that anatomy, so the views you build in the chapters ahead are ones a busy person actually glances at and acts on, rather than another dashboard that dies of neglect.',
    ),
    ...section(
      'ONE QUESTION',
      'One question per view',
      ...p('The first rule is the one most dashboards break: a good dashboard answers one clear question, it does not display everything you have. Before building any view, the question to ask is what do I want to know, and the dashboard exists to answer exactly that, at a glance. How are sales tracking this month? Which marketing is bringing leads? Is anything wrong right now? Each is a question, and each deserves a view built to answer it clearly, not a single mega-dashboard that tries to answer all of them and answers none of them well.'),
      ...p('The everything-dashboard fails because it forces the viewer to hunt for the answer among dozens of numbers, which is the same scavenger hunt as having ten tabs open, just on one screen. A view built around one question puts the answer front and centre, and the viewer knows in a second what it is telling them. If you find yourself cramming a view with unrelated numbers, that is the signal it should be more than one view, each answering its own question, which is exactly how the library in chapter five is organised.'),
      {
        type: 'diagram',
        id: 'bse-ch03-one-question',
        caption: 'One question per view. LEFT (crossed): a mega-dashboard trying to answer everything, the viewer hunting among dozens of numbers. RIGHT (gold): one clear question, the answer front and centre, understood in a second. Split the view when the questions split.',
      },
    ),
    ...section(
      'HANDFUL',
      'A handful of numbers, not forty',
      ...p('Following from that, a dashboard that gets used shows a handful of numbers, the few that matter for its question, not every number available. The instinct, especially once you can pull data from everywhere, is to put it all on the screen because you can, and it is the wrong instinct, because forty numbers is not forty times as useful as the five that matter, it is less useful, because the five that matter are now buried among thirty-five that do not. Restraint is the skill: choosing the few numbers that actually answer the question and leaving everything else off, so the view stays glanceable. A dashboard with five clear numbers gets read in seconds and used daily. A dashboard with forty gets glanced at once, found overwhelming, and ignored, which means all that data is doing nothing. Less on the screen is more in the head.'),
      {
        type: 'diagram',
        id: 'bse-ch03-five-not-forty',
        caption: 'Five numbers, not forty. LEFT (crossed): forty numbers on screen, the five that matter buried, glanced at once and ignored. RIGHT (gold): a handful of clear numbers, read in seconds, used daily. Less on the screen is more in the head.',
      },
    ),
  ),
  flow(
    ...section(
      'CONTEXT',
      'Every number in context',
      ...p('A number on its own means almost nothing, and a dashboard that gets used gives every number the context that makes it meaningful. Sales of a certain amount this month, is that good or bad? You cannot tell without context: compared to last month, compared to the same month last year, compared to the target. The number alone is just a figure, and the context is what turns it into information you can act on. So every important number on a dashboard should carry its comparison, against the previous period, against a target, against the trend, so that a glance tells you not just what the number is but whether it is good, bad, rising, or falling. A dashboard of bare numbers makes you do the interpreting in your head, which means you mostly do not, while a dashboard where every number shows whether it is above or below where it should be tells you what needs attention instantly. Context is what makes a number a signal rather than a digit.'),
      {
        type: 'diagram',
        id: 'bse-ch03-number-in-context',
        caption: 'Every number in context. TOP (crossed): a bare figure, good or bad unknown, you do the interpreting in your head. BOTTOM (gold): the number with comparison to last period, target, and trend. Context turns a digit into a signal.',
      },
    ),
    ...section(
      'GLANCE',
      'Built for the glance',
      ...p('A dashboard that gets used is built to be understood at a glance, by a busy person, not to be studied by someone who loves spreadsheets. This means the important things are visually obvious, good and bad are instantly distinguishable, often by simple visual cues so you can see without reading closely which numbers are fine and which need attention, and the whole thing communicates its message in the few seconds someone will actually give it. The test is simple: can the person it is for look at it for five seconds and know how things are and what needs attention? If yes, it will get used, because it fits into a busy day. If it takes real study to extract the meaning, it will not, however accurate it is, because busy people do not study dashboards, they glance at them, and a dashboard that demands more than a glance is a dashboard that will be ignored. Build for the glance, and the dashboard becomes part of the daily rhythm rather than a thing you keep meaning to look at.'),
      {
        type: 'diagram',
        id: 'bse-ch03-five-second-test',
        caption: 'The five-second test. LEFT (crossed): demands study to extract meaning, busy people will not. RIGHT (gold): good and bad instantly obvious, the message clear in five seconds. Build for the glance, not the spreadsheet lover.',
      },
    ),
    ...section(
      'WHY DIE',
      'Why most dashboards die',
      ...p('Pull these together and you can see why most dashboards fail: they answer no particular question, they show everything instead of the few things that matter, they present bare numbers without context, and they demand study rather than a glance, so they get built, admired once, and abandoned. The anatomy that works is the opposite in every respect: one question per view, a handful of numbers, every number in context, built for the glance. A dashboard built that way earns a place in the daily routine because it is genuinely useful in the seconds a busy person can spare, which is the only kind of dashboard worth building. With the anatomy understood, the next chapter is the substance, which numbers actually deserve a place on these views, because a beautifully built dashboard of the wrong numbers is still useless.'),
    ),
  ),
]
