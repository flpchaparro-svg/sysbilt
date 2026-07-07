import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch06Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 6,
    title: 'Running it day to day',
    subtitle: 'Briefing, library, gates, measurement: the daily craft.',
  }),
  flow(
    ...p(
      'The gap between businesses getting real value from AI and businesses paying for a novelty is not the tools, everyone has the same tools, it is a small set of daily disciplines, learnable in a week, compounding forever. This chapter is those disciplines: briefing as the actual skill, the library that makes one person\'s skill everyone\'s, the gates that keep it safe, and the measuring habit that keeps it honest.',
    ),
    ...section(
      'BRIEFING',
      'Prompting is briefing',
      ...p('Strip the mystique off prompting: it is briefing, the skill every good manager already has, applied to a tireless junior with no context and no memory. The model knows nothing about your business, your client or your intent except what the briefing supplies, chapter two\'s mechanics made practical, so the quality of what comes back is set almost entirely by what goes in.'),
      ...p('A good briefing carries four things. Context: who we are, who this is for, what the situation is, the model cannot infer what it was never told. The ask, precisely: not write something about the delay, but write a short apology to a commercial client explaining a two-week delay, taking responsibility without grovelling, offering the revised date. Constraints: length, tone, format, what to avoid, Australian English, no exclamation marks, the rules that make it sound like your business. And examples, the most underused lever in the field: here is one we sent before that struck the right note, because the model matches patterns brilliantly when shown the pattern.'),
      ...p('Vague in, plausible fluff out. Specific in, a draft worth editing out. That trade never changes, and everything else in AI practice is downstream of it.'),
      {
        type: 'diagram',
        id: 'btt-ch06-briefing-four-parts',
        caption: 'Briefing, the four parts. CONTEXT, THE ASK, CONSTRAINTS, EXAMPLES. Vague in, grey fluff out. This brief, a draft worth editing out.',
      },
    ),
  ),
  flow(
    ...section(
      'LIBRARY',
      'The prompt library: one person\'s skill, everyone\'s',
      ...p('The moment a briefing works, it becomes an asset, and assets get kept. The prompt library is the shared, living document of the briefings that work: the proposal draft, the review reply, the meeting summary format, the polite chase, each one refined, each one carrying the brand rules inside it, so the newest team member briefs the machine as well as the founder does on day one.'),
      ...p('This is chapter two\'s ownership doctrine in daily action, and it is also this series\' training thread arriving on schedule: the library is a training document, the fastest one you will ever write, because it teaches by working. It lives where the team actually works, it gets a named owner, and it grows one proven prompt at a time. A business with a good prompt library has turned a personal knack into an institutional capability, which is the whole difference between using AI and having AI.'),
      {
        type: 'diagram',
        id: 'btt-ch06-prompt-library',
        caption: 'The prompt library. Named prompt cards on a shared shelf; one person adding a refined card, a new team member producing founder-grade output on day one. One person\'s knack, everyone\'s capability.',
      },
    ),
    ...section(
      'GATES',
      'The gates, as habit',
      ...p('The doctrine is set elsewhere in this series; here it becomes muscle memory. Everything customer-facing drafts, a person approves, nothing sends itself. Summaries get the ten-second skim before they become records. Facts, figures, names and promises get checked against reality every time, because the model is built to sound right, not be right. And the approvals are read, not rubber-stamped, the atrophy warning from our automation book applying doubly here, because AI\'s errors are fluent, and fluent errors slide past a skimming eye.'),
      ...p('The gates cost seconds. What they protect is the only thing in this book that cannot be re-generated: your name on the work.'),
    ),
  ),
  flow(
    ...section(
      'MEASURING',
      'The measuring habit',
      ...p('Last, the discipline that separates this book from the hype cycle: the standing question, asked monthly, would we notice if we switched it off?'),
      ...p('For each AI use in the business, three honest numbers on a page: what it costs, roughly, the subscriptions and the metered cents; what it saves, roughly, the hours of drafting, summarising and ferrying that stopped; and what it got wrong this month, because the error log is data, not embarrassment. Uses that pay stay and grow. Uses that turned out to be novelty get switched off without ceremony, which is a capability most businesses lack entirely, and the lack is precisely why the waste from chapter one persists: nothing measured, so nothing killed, so everything drifts.'),
      ...p('The businesses that win with AI are not the ones that adopted the most. They are the ones that kept what measured well and shed what did not, one honest month at a time. Briefing, library, gates, measurement: the whole daily craft in four habits. What surrounds the craft, the law, the privacy line, and the reason the machine invents, is chapter seven.'),
      {
        type: 'diagram',
        id: 'btt-ch06-switch-off-test',
        caption: 'Would we notice if we switched it off? Monthly page per AI use: COSTS, SAVES, GOT WRONG. Measured well stays and grows; novelty switched off without ceremony. Nothing measured, nothing killed, everything drifts.',
      },
    ),
  ),
]
