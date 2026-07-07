import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch11Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 11,
    title: 'The prompt pack',
    subtitle: 'Ten copy-ready briefings for monthly summaries, weekly reviews, channel analysis, and sanity-checking numbers.',
  }),
  flow(
    ...p(
      'Making sense of numbers, turning data into decisions, is work that AI genuinely helps with, and these are the briefings that do it. Each is built to be copied, filled with your specifics, and used, with the same rule this whole series holds: the tool helps you interpret, you make the decisions, and numbers that will drive real decisions get sanity-checked before you act on them, because chapter eight was clear that a confident-looking number can still be an estimate or an error. Fill the brackets with your real numbers, and treat what comes back as informed help for your judgment, not a replacement for it.',
    ),
    {
      type: 'promptCard',
      title: 'Summarise the month in plain English',
      body: `Here are my business numbers for the month: [paste the numbers, with what each one means]. Summarise honestly how the business did, in plain Australian English: what went well, what did not, and the two or three things that most need my attention. Focus on what connects to real business outcomes, not vanity numbers. Be direct, and flag anything that looks concerning. No jargon.`,
    },
    {
      type: 'promptCard',
      title: 'Explain a change and what to check',
      body: `This number changed: [the number, what it was, what it is now, over what period]. Here is the relevant context: [related numbers, anything you know about the period]. Give me the likely explanations for this change, in order of probability, and tell me exactly what I should check to work out which one is actually happening. Do not guess a single cause with false confidence, give me the possibilities to investigate.`,
    },
    {
      type: 'promptCard',
      title: 'Prepare the weekly review',
      body: `Here is my pipeline and sales data for the week: [paste it]. Prepare me a short brief for my weekly review: where things stand, what moved, what is stuck, which deals need attention, and what the numbers suggest about the coming weeks. Be honest about anything worrying, and keep it scannable. Remember pipeline value is work in progress, not guaranteed revenue.`,
    },
    {
      type: 'promptCard',
      title: 'Draft the monthly leadership summary',
      body: `Here are the business's numbers for the month: [paste them, with definitions]. Draft a clear one-page summary for a leadership or team review: how the business performed against [our goals/targets], the key wins, the key concerns, and the priorities for next month. Plain Australian English, direct, factual, lead with what matters most. No fluff, no exclamation marks.`,
    },
  ),
  flow(
    {
      type: 'promptCard',
      title: 'Compare channels and recommend',
      body: `Here is my marketing data by source: [paste leads, customers, and revenue by source, plus cost per source if known]. Analyse which channels are genuinely producing real business versus just traffic or cheap leads that do not convert, and recommend where I should put more effort and money and where I should pull back. Judge on real business produced, not volume. Be honest about anything the data cannot tell me.`,
    },
    {
      type: 'promptCard',
      title: 'Turn a spreadsheet into decisions',
      body: `Here is a spreadsheet of data from my business: [paste or describe it]. Do not just describe it back to me. Tell me the three most important things it reveals, what decisions I should consider based on them, and what, if anything, in this data looks unreliable or worth double-checking before I act on it. Practical and direct.`,
    },
    {
      type: 'promptCard',
      title: 'Sanity-check a number before acting',
      body: `I am about to make this decision: [the decision] based on this number: [the number and where it came from]. Before I act, help me sanity-check it: what would make this number wrong or misleading, what should I verify, and is this a measured fact or an estimate? Tell me how much confidence this number actually deserves for a decision of this size.`,
    },
    {
      type: 'promptCard',
      title: 'Decide what belongs on a dashboard',
      body: `I want to build a dashboard to answer this question: [the question]. My business is [what you do]. What are the few numbers that would genuinely answer this question at a glance, what context should each carry (versus last period, versus target, versus trend), and what numbers should I deliberately leave off because they would just be clutter? Remember: only numbers I would act on.`,
    },
  ),
  flow(
    {
      type: 'promptCard',
      title: 'Set sensible alert thresholds',
      body: `I want to be alerted when something needs my attention rather than watching dashboards. For these numbers: [list the numbers and their normal ranges], suggest sensible thresholds that would warrant an alert, in both directions where relevant. Help me set lines that catch real problems without generating so many alerts that I start ignoring them. Explain your reasoning briefly.`,
    },
    {
      type: 'promptCard',
      title: 'Ask a plain-language question of your data',
      body: `Here is data from my business: [paste the relevant data]. Answer this question from it: [your plain-language question, e.g. which service made the most margin this quarter, or which clients have not ordered since a certain date]. Give me the answer clearly, show the key figures behind it, and flag if the data I gave you is not enough to answer it properly rather than guessing.`,
    },
    ...section(
      'FOUR CHECKS',
      'The checks before you act on the numbers',
      ...p('Four, in this book\'s terms, run before any number drives a real decision. Trustworthy: is the data behind this clean and current, or could it be stale or dirty, because garbage in is gospel out and a frozen number looks exactly like a live one. Defined: does this number mean what I think it means, consistently, because a number built on drifting definitions lies convincingly. Measured or estimated: is this a fact about what happened or a forecast about what might, because the two deserve very different confidence, and a projection wearing the clothing of a fact is chapter eight\'s central danger. And actionable: would I actually do something different based on this, because if not, it is decoration, and decisions should ride on the numbers that matter. Pass those four and AI becomes what it should be here, the thing that helps a busy owner turn a pile of numbers into a clear decision, with your judgment making the call. The seeing is faster now, and the deciding is still yours, informed by data you have checked rather than guesses dressed as facts. That has been the deal on every page of this series, and it holds here, at the end, too.'),
      {
        type: 'diagram',
        id: 'bse-ch11-four-checks',
        caption: 'The four checks before you act. TRUSTWORTHY: clean and current, not stale or dirty. DEFINED: means what I think, consistently. MEASURED OR ESTIMATED: fact or forecast, and they deserve different confidence. ACTIONABLE: I would do something different. A decision passing through all four to act. A frozen number looks exactly like a live one. Check before you act.',
      },
    ),
  ),
]
