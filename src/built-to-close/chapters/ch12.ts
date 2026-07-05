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
      'This last chapter is a reference rather than a read: the plain meaning of the terms this world throws around, and an honest note about what comes next.',
    ),
    ...glossary(
      {
        title: 'A plain-English glossary',
        intro: 'The terms worth knowing plainly, so you are never left nodding along to something you do not follow.',
      },
      [
        {
          term: 'Activity',
          definition:
            'Anything that happened with a contact: a call, an email, a meeting, a note. The memory of what was done.',
        },
        {
          term: 'Attribution',
          definition:
            'Working out which marketing gets credit for a lead or sale. Useful as evidence, dangerous as gospel, as chapter eight explains.',
        },
        {
          term: 'Automation trigger',
          definition:
            'A rule that acts when something happens: enquiry arrives, acknowledgement sends. The connective tissue of the hub.',
        },
        {
          term: 'Cadence',
          definition:
            'The rhythm of a follow-up sequence: how many touches, spaced how far apart.',
        },
        {
          term: 'Churn',
          definition:
            'Customers lost over a period. The number the win-back machinery exists to lower.',
        },
        {
          term: 'Contact',
          definition:
            'A person in the system: their details and everything known about them, in one place.',
        },
        {
          term: 'CRM',
          definition:
            'Customer relationship management. Plainly: the memory of the business, kept somewhere permanent, shared and awake.',
        },
        {
          term: 'Deal',
          definition:
            'A piece of potential work moving toward yes or no, with a value and a stage.',
        },
        {
          term: 'Deliverability',
          definition:
            'Whether your emails actually reach inboxes. Governed by sender reputation, spent by irrelevance.',
        },
        {
          term: 'Dark funnel',
          definition:
            'The part of a buyer\'s journey no tracking can see: word of mouth, private recommendations, offline moments.',
        },
        {
          term: 'Lead',
          definition:
            'A person who has shown interest but is not yet a customer. The most perishable asset the business holds.',
        },
        {
          term: 'Lead scoring',
          definition:
            'Ranking leads by fit and behaviour so attention lands on the likeliest first. A later-stage tool.',
        },
        {
          term: 'Lifetime value',
          definition:
            'What a customer is worth across the whole relationship, not one job. The number that makes the third leak expensive.',
        },
        {
          term: 'Pipeline',
          definition:
            'The board of deals, staged from first contact to won or lost. The most honest page in the business, if kept true.',
        },
        {
          term: 'Qualified',
          definition:
            'A lead confirmed as real: genuine need, workable timing, right fit. Defined by a written rule, not a feeling.',
        },
        {
          term: 'Segmentation',
          definition:
            'Cutting the contact list by what the system knows, so messages go to the people they are actually for.',
        },
        {
          term: 'Sender reputation',
          definition:
            'The invisible score deciding whether your email reaches inboxes or junk folders. Chapter seven\'s real picture.',
        },
        {
          term: 'Sequence',
          definition:
            'A pre-written series of follow-up touches that runs on a trigger and stops the moment the person replies.',
        },
        {
          term: 'Source',
          definition:
            'Where a lead came from. Tagged at the moment of capture, or fiction by Friday.',
        },
        {
          term: 'Speed to lead',
          definition:
            'How fast a fresh enquiry gets its first response. Minutes win work; days donate it.',
        },
        {
          term: 'UTM',
          definition:
            'A small tag on a link that tells you where a visitor came from. A naming convention and a habit, not a technology.',
        },
        {
          term: 'Win-back',
          definition:
            'The systematic re-engagement of past clients and gone-quiet leads. The machinery for the warmest list you own.',
        },
        {
          term: 'Zombie deal',
          definition:
            'A deal that died months ago but was never closed. Inflates forecasts and erodes trust in the board.',
        },
      ],
    ),
  ),

  flow(
    ...section(
      'NEXT STEP',
      'Who to call, and ongoing support',
      ...p(
        'A CRM is never finished, because the business it remembers keeps moving: new sources to wire, sequences to sharpen, a team to keep fluent, and the quiet engineering underneath, the syncs, the monitoring, the hygiene, that keeps the memory true. The businesses that get the most from theirs have someone who knows their particular system standing behind it, so that changes take days, problems get found before they cost a quiet fortnight, and nobody ever explains the business from scratch to a stranger.',
        'So here is the honest invitation. You have just read, in real detail, what a business with a working memory looks like: every lead caught and answered in minutes, every quote carried to an actual answer, every past client kept warm, the marketing judged on won work rather than clicks, and a team that trusts the board because the board tells the truth. If, reading it, you recognised your own leaks, or you decided that building and running this properly is not how you want to spend your time, then it is worth a conversation.',
        'The place to start is a CRM Systems Review. It is a straight, no-obligation look at how your business currently captures, follows up and tracks its leads, measured against everything this book describes: where the leaks are, what they are plausibly costing you, what to wire first, and in what order. There is no pitch and no pressure in it. Either way, you come away with a clear, honest picture of where your follow-up actually stands.',
        'If that would be useful, request your review at sysbilt.com/contact. Fill in the form and we will get back to you, and you will also receive an audit of your business, a clear read on where you stand right now and where the biggest gains are. Tell us you read Built to Close, and we will walk you through a live example of the kind of connected system you have just read about, the enquiry that answers itself, the quote that chases itself, the client that never drifts, so you can see exactly how it works before you decide anything at all.',
        'Because a business built this way does not win by shouting loudest. It wins by answering first, remembering everything, and never letting interest die in silence. When you are ready to close the leaks, we are ready to build it with you.',
      ),
    ),
  ),
]
