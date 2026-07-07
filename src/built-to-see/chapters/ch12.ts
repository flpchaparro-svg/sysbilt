import type { BtwPage } from '../types'
import { flow, glossary, opener, p, section } from '../../built-to-work/helpers'

export const ch12Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 12,
    title: 'Glossary, and who to call',
    subtitle: 'Plain meanings, plus who to talk to when you are ready.',
  }),
  flow(
    ...p(
      'The last chapter of the last book is a reference rather than a read: the plain meaning of the terms this book uses, and the honest note on what comes next, for this book and for the whole series it completes.',
    ),
    ...glossary(
      {
        title: 'A plain-English glossary',
        intro: 'The terms worth knowing plainly, so you are never left nodding along to something you do not follow.',
      },
      [
        {
          term: 'Anomaly',
          definition: 'Something unusual in the data that stands out from the normal pattern, flagged even though you did not set a specific alert for it. How silent problems get caught early.',
        },
        {
          term: 'Dashboard',
          definition: 'A single view that answers one question about the business at a glance, from a handful of numbers, each in context. Built for the glance, not for study.',
        },
        {
          term: 'Cash position',
          definition: 'What is actually in the bank and what is owed, right now. The number that determines survival, because businesses run out of cash, not profit.',
        },
        {
          term: 'Conversion rate',
          definition: 'The proportion of leads that become customers. The number that reveals how well the business turns interest into work.',
        },
        {
          term: 'Definitions',
          definition: 'The agreed, written meaning of each term you measure: what counts as a lead, a sale, revenue. The unglamorous foundation that decides whether your numbers are true or nonsense.',
        },
        {
          term: 'Forecast',
          definition: 'An informed estimate of what is coming, based on patterns in your data. A weather report: worth heeding, sometimes wrong, and never a promise.',
        },
        {
          term: 'KPI (key performance indicator)',
          definition: 'A number that genuinely matters for the business, chosen because you would act on it. The opposite of a vanity number.',
        },
        {
          term: 'Lagging number',
          definition: 'A number about the past, a result that already happened, like revenue. Real, important, and too late to change.',
        },
        {
          term: 'Leading number',
          definition: 'A number about the future, the activity now that predicts results later, like leads and pipeline. Where you can still steer.',
        },
        {
          term: 'Margin',
          definition: 'What is actually left after costs, not the total earned. The number owners most often fly blind on, because revenue can grow while margin bleeds.',
        },
        {
          term: 'MCP',
          definition: 'The standard, governed connection that lets AI read your business data within set permissions, so you can ask your business questions in plain language and get answers from your own numbers.',
        },
        {
          term: 'Pipeline value',
          definition: 'The total value of the work in progress in your CRM. Useful as a forward signal, and not the same as guaranteed revenue.',
        },
        {
          term: 'Single source of truth',
          definition: 'One agreed, honest place the business\'s numbers live and are seen, built on shared definitions, so meetings act on data instead of arguing about it.',
        },
        {
          term: 'Source of truth, silent failure',
          definition: 'The quiet freezing of a dashboard when a connection breaks without warning, so it shows stale numbers that look live. Caught only by monitoring the pipes.',
        },
        {
          term: 'Threshold alert',
          definition: 'A line you set on a number so the system tells you when it is crossed, turning the business into something that taps you on the shoulder rather than something you must watch.',
        },
        {
          term: 'Vanity number',
          definition: 'A number that goes up and feels good but drives no decision, like total visitors that never convert. Decoration that crowds out what matters.',
        },
      ],
    ),
  ),
  flow(
    ...section(
      'NEXT STEP',
      'Who to call, and ongoing support',
      ...p('A dashboard system is never finished, because the business it shows keeps changing, and the connections, the definitions, and the views stay honest and useful only as long as they are kept that way. The businesses that genuinely see clearly have someone who knows their particular system standing behind it: connecting the data properly, keeping the definitions steady and the pipes monitored, building the views that answer the questions that actually matter, and keeping the whole thing honest as the business moves, so the single screen stays a window on the present rather than quietly becoming a photograph of the past.'),
      ...p('So here is the honest invitation, and it is the last one in the series. You have just read what seeing clearly actually looks like: the scattered data of every system pulled into one honest, current view, the few numbers that matter shown in context, the business telling you when something needs attention rather than making you watch, and the whole connected machine finally visible on a single screen you can steer by. If, reading it, you recognised your own business flying blind, on gut, on old reports, or drowning in dashboards that do not agree, or you decided that building this properly is not how you want to spend the time it would give back, then it is worth a conversation.'),
      ...p('The place to start is a Dashboard Systems Review. It is a straight, no-obligation look at how your business currently sees itself, measured against everything this book describes: what you can and cannot currently see, whether the data behind it can be trusted, which numbers actually matter for your priorities, and what single view we would build first. There is no pitch and no pressure in it. Either way, you come away with a clear, honest picture of whether your business can actually see itself, and what it would take to steer on evidence rather than feel.'),
      ...p('If that would be useful, request your review at sysbilt.com. Fill in the form and we will get back to you, and you will also receive an audit of your business, a clear read on where you stand right now and where the biggest gains are. Tell us you read this, and we will show you the single honest screen from these pages working, the scattered numbers pulled together, the machine made visible, so you can see exactly what seeing clearly means before you decide anything at all.'),
      ...p('And a closing word, because this is the last book of the series. Across these books we have built a whole business as a system: a website that works, a store that sells, a follow-up that remembers, an automation that runs, an AI used with sense, a content system that earns, a team trained to run it all, and now the screen that lets you see the whole thing and steer it. Each book was one part, and this one is where the parts become visible as a single machine, which was the point all along, because a business built as a connected system, and seen clearly enough to steer, is a business that runs on design rather than on the owner\'s exhaustion. That is what we build. When you are ready to see your business clearly and run it as the system it could be, we are ready to build it with you.'),
    ),
  ),
]
