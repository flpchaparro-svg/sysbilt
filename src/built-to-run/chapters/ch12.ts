import type { BtwPage } from '../types'
import { flow, opener, p, section, glossary } from '../../built-to-work/helpers'

export const ch12Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 12,
    title: 'Glossary, and who to call',
    subtitle: 'Plain meanings, plus who to talk to when you are ready.',
  }),
  flow(
    ...p(
      'The last chapter is a reference rather than a read: the plain meaning of the trade\'s terms, and the honest note on what comes next.',
    ),
    ...glossary(
      {
        title: 'A plain-English glossary',
        intro: 'The terms worth knowing plainly, so you are never left nodding along to something you do not follow.',
      },
      [
        {
          term: 'API',
          definition: 'The doorway a system offers so other systems can talk to it. Every connection in this book walks through one.',
        },
        {
          term: 'API key',
          definition: 'The credential that opens that doorway. A key that leaks is an open door, which is why the vault and the register exist.',
        },
        {
          term: 'Automation',
          definition: 'A rule that acts by itself: when this happens, do that. The whole trade, in one sentence.',
        },
        {
          term: 'Circuit breaker',
          definition: 'A safety that halts a step after repeated failures, so a broken loop trips a flag instead of running, and billing, all night.',
        },
        {
          term: 'Condition',
          definition: 'A fork in a workflow: if this, then that path, otherwise the other.',
        },
        {
          term: 'Credential store (vault)',
          definition: 'The platform\'s secure home for keys and logins, owned and auditable by the business, never pasted into flows.',
        },
        {
          term: 'Deduplication',
          definition: 'The logic that recognises the same event, or the same human, arriving twice, and swallows the echo.',
        },
        {
          term: 'Enrichment',
          definition: 'Adding context to a bare record automatically, the signature workflow\'s research step: who enquired, and what is worth knowing.',
        },
        {
          term: 'Failure path',
          definition: 'What a workflow does when a step breaks: stop, retry, park, and always, tell a human. The design half amateurs skip.',
        },
        {
          term: 'Human in the loop',
          definition: 'The pattern this book runs on: the machine prepares, the human approves. Drafts, not sends.',
        },
        {
          term: 'Payload',
          definition: 'The envelope of details a trigger hands over: the form\'s answers, the order\'s contents.',
        },
        {
          term: 'Queue',
          definition: 'The orderly line where work waits when a receiving system is busy, so a surge becomes a deep breath instead of a loss.',
        },
        {
          term: 'Rate limit',
          definition: 'The ceiling on how many requests a system accepts in a window. Invisible on quiet days, decisive on big ones.',
        },
        {
          term: 'Retry',
          definition: 'Trying a failed step again, deliberately, with patience built in. The difference between sent and received.',
        },
        {
          term: 'Self-hosted',
          definition: 'Running the automation platform on infrastructure you control: flat cost, full power, real responsibility.',
        },
        {
          term: 'Silent failure',
          definition: 'A workflow that stops without an error anyone sees. The most expensive failure mode in business, and the reason monitoring watches flow, not appearance.',
        },
        {
          term: 'Staging',
          definition: 'Testing changes on a copy before they touch the live machinery. Non-negotiable, as everywhere in this series.',
        },
        {
          term: 'Trigger',
          definition: 'The event that starts a workflow: the form submitted, the deal won, nine oclock Monday.',
        },
        {
          term: 'Webhook',
          definition: 'The doorbell one system rings in another the instant something happens, envelope in hand. Most of the talking between your tools.',
        },
        {
          term: 'Workflow',
          definition: 'One automation, doing one job, named after it, documented in a line, and legible to a stranger.',
        },
      ],
    ),
  ),
  flow(
    ...section(
      'NEXT STEP',
      'Who to call, and ongoing support',
      ...p('A nervous system is never finished, because the business it serves keeps growing new needs and the world it runs in keeps moving: platforms update, volumes rise, gates earn widening, and the audit list refills, which is what growth looks like from the plumbing. The businesses that get the most from theirs have someone who knows their particular wiring standing behind it, so that new reflexes take days, decay gets caught at the five-minute size, and nobody ever stares at a dead workflow wondering what it did.'),
      ...p('So here is the honest invitation. You have just read, in real detail, what a business that runs itself looks like: every enquiry answered in the minute, every quote chased to an answer, every invoice followed, the routine work happening the moment it should, the machines preparing and the people deciding, and an owner whose evenings belong to the business\'s direction, or to nobody at all, instead of to its ferrying. If, reading it, you recognised your own week in chapter one\'s human glue, or you decided that building and maintaining this properly is not how you want to spend the time it frees, then it is worth a conversation.'),
      ...p('The place to start is an Automation Systems Review. It is a straight, no-obligation look at how your business currently runs its routine work, measured against everything this book describes: where the ferrying is, what it is plausibly costing in hours and leaks, which reflexes to build first, and in what order. There is no pitch and no pressure in it. Either way, you come away with a clear, honest map of what your week could stop containing.'),
      ...p('If that would be useful, request your review at sysbilt.com. Fill in the form and we will get back to you, and you will also receive an audit of your business, a clear read on where you stand right now and where the biggest gains are. And tell us you read this, because the reply you receive will itself be the signature workflow from chapter nine doing its quiet work, the research done, the briefing built, the draft prepared, a human\'s judgment on the send, and there is no better demonstration of this book than watching it answer you.'),
      ...p('Because a business built this way is not running on effort. It is running on design, and design compounds. When you are ready to stop being the glue, we are ready to build it with you.'),
    ),
  ),
]
