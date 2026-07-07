import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch11Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 11,
    title: 'The prompt pack',
    subtitle: 'The daily craft of chapter six, packed into briefings you can copy.',
  }),
  flow(
    ...p(
      'The daily craft of chapter six, packed into briefings you can copy. Each one carries the four parts of a good briefing, context, precise ask, constraints, and room for your examples, and each ends where every AI output ends in this book: at your judgment. Fill the brackets with real specifics, add an example of yours where the prompt invites it, and edit what returns until it sounds like your business, because it is about to represent it.',
    ),
    ...section(
      'PROMPT PACK',
      'The prompt pack',
      ...p('Copy, fill the brackets, and treat everything that returns as a draft for judgment.'),
    ),
    {
      type: 'promptCard',
      title: 'Call or meeting notes into a record',
      body: `Turn these rough notes or this transcript into a clean record: [paste notes/transcript]. Give me: a two-line summary, the key facts learned, any commitments made by either side, and the next step with a suggested date. Flag anything unclear or contradictory rather than guessing. Plain language, Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'Classify and route an enquiry',
      body: `Read this enquiry and classify it: [paste enquiry]. Categories: [your real categories, e.g. new work / support / accounts / other]. Tell me the category, the urgency (routine / soon / now), a one-line summary for whoever receives it, and any details that suggest it is not what it first appears. If it does not fit the categories cleanly, say so rather than forcing it.`,
    },
    {
      type: 'promptCard',
      title: 'Voice note into an article draft',
      body: `Turn this voice note transcript into a first-draft article: [paste transcript]. My business is [what you do] for [who you serve]. Keep my actual points and my way of saying things, organise them under plain headings, open with a direct answer to the question the piece addresses, and mark any spot where I should add a specific example or fact with [ADD DETAIL]. Do not invent facts, figures or examples. Australian English, no exclamation marks.`,
    },
  ),
  flow(
    {
      type: 'promptCard',
      title: 'Article into social posts',
      body: `Turn this article into [number] short social posts: [paste article]. Each post makes one genuinely useful point from the piece in a few plain sentences, sounds natural rather than promotional, and points people to the full piece where it fits. Vary the angles rather than repeating the same summary. Do not invent anything not in the article. Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'The polite chase',
      body: `Write a short, warm message chasing [what: the quote decision / the overdue invoice / the missing information] from [who, and the relationship]. The history in one line: [what has happened so far]. Offer something in the message, an answer, an easy next step, a genuine deadline, rather than just checking in. No guilt, no pressure, no exclamation marks. Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'Research brief on a business',
      body: `Prepare a short briefing on this business: [name and website or what you know]. I am about to [the context: reply to their enquiry / meet them / quote them]. From what is publicly available, tell me: what they do and for whom, their apparent size and situation, anything recent worth knowing, and two or three informed questions I could ask. Clearly separate what you found from what you are inferring, and do not present guesses as facts.`,
    },
  ),
  flow(
    {
      type: 'promptCard',
      title: 'Meeting preparation from history',
      body: `Prepare me a one-minute brief for a meeting with [name/role] about [the matter]. Here is the relevant history: [paste the record, with personal details stripped if outside protected tools]. Give me: where things stand, what they appear to care about based on the history, open questions to resolve, and the outcome I should aim for. Short and scannable.`,
    },
    {
      type: 'promptCard',
      title: 'Summarise a document I must answer',
      body: `Summarise this document for someone who has to respond to it: [paste document]. Give me: what it says in three lines, what it asks of us specifically, any deadlines or conditions, anything unusual or worth a second look, and the points a careful reply should address. Do not soften anything; I need the honest read.`,
    },
    {
      type: 'promptCard',
      title: 'Draft from facts I supply',
      body: `Draft [what: a proposal section / a policy answer / a client explanation] using only these facts: [paste the real facts, prices, dates, terms]. Audience: [who]. Tone: [confident and plain / warm and direct]. If a needed fact is missing from what I gave you, mark the gap as [MISSING: what] rather than filling it. Australian English, no jargon, no exclamation marks.`,
    },
  ),
  flow(
    {
      type: 'promptCard',
      title: 'The monthly measure',
      body: `Here is this month's rough picture of an AI use in my business: [what it is, what it costs, hours it appears to save, errors we caught]. Give me the honest read: is this paying, what would make it pay better (fit, briefing, model size, or gate), and what evidence would justify expanding it or switching it off? Be blunt.`,
    },
    ...section(
      'FOUR CHECKS',
      'The four checks, sharpened for AI at work',
      ...p('Before anything from these prompts ships, the series\' four checks, in this book\'s terms. Truth: every fact, figure, name and promise verified against reality, because the fluency is not evidence, chapter seven made sure you know why. Tone: edited until it sounds like your business across a table, because AI-flavoured is the new cheap-looking. Ownership: your knowledge, your examples, your judgment visibly added, or it is filler anyone could have generated. And privacy: nothing pasted anywhere it should not have gone, checked before the pasting, not after.'),
      ...p('The machine drafts. You decide. That has been the deal on every page, and it is what makes the speed safe to use.'),
      {
        type: 'diagram',
        id: 'btt-ch11-four-checks',
        caption: 'The four checks. TRUTH verified, TONE your business across a table, OWNERSHIP your knowledge visibly added, PRIVACY checked before the pasting. A draft passing through all four to yours to send.',
      },
    ),
  ),
]
