import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch01Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 1,
    title: 'Why your business needs a memory',
    subtitle: 'The way businesses win work has shifted. Memory does not scale, and discipline runs out when you get busy.',
  }),
  flow(
    ...section(
      'THE SHIFT',
      'The ground has shifted',
      ...p('Start here, because everything in this book rests on it. The way businesses win work has just changed, and it is not where most owners think.'),
      ...p('For as long as anyone can remember, following up was a personal discipline. Leads lived in an inbox, a notebook, a stack of sticky notes, and the owner\'s head. Whether an enquiry became a job depended on whether somebody remembered, on a busy Tuesday, to reply, to chase the quote, to call back the client from last winter. Some people were naturally good at it. Most were not, because they were busy doing the actual work, and every business leaked in the same places for the same human reason. Memory does not scale, and discipline runs out at exactly the moment the business gets busy, which is exactly the moment the leads arrive.'),
      ...p('The tools that fixed this used to belong to big companies. A proper system for tracking every lead, every conversation, every promise to call back, that was enterprise software, with an enterprise price and a team to run it. Everyone else made do with the inbox and hoped.'),
      ...p('That world is over. The same shift that runs through everything we build, capable tools becoming cheap and connectable, has landed squarely here. A system that catches every enquiry the moment it arrives, remembers every conversation, and nudges the right follow-up on the right day now costs less than a phone plan and sets up in days. Follow-up has stopped being a personality trait and become a system you either have or you do not.'),
      ...p('And that has quietly redrawn who wins. The business that answers first and never forgets is beating the business with the better product and the bigger ad budget, not occasionally, but as a rule, because buyers reward whoever made it easy and whoever stayed present while they decided. The ground has shifted from winning attention to keeping it. This book is about the machine that keeps it.'),
      {
        type: 'diagram',
        id: 'btc-ch01-old-way',
        caption: 'Where leads used to live. LEFT: inbox, notebook, sticky notes, the owner\'s memory, with leads falling between them. RIGHT: one system catching every lead, labelled one memory, always awake.',
      },
    ),
  ),
  flow(
    ...section(
      'ONE JOB',
      'The one job',
      ...p('Your CRM has one job. Make sure no lead is ever lost to forgetting.'),
      ...p('Everything else serves that. Not the dashboards, not the features, not the tidy columns. The only measure that counts is whether interest, once shown, is carried all the way to an answer, a yes, a no, or a not yet, instead of dying in silence somewhere in an inbox.'),
      ...p('Because here is the uncomfortable arithmetic of most growing businesses. The marketing works harder than the follow-up. Money and effort go into making the phone ring, and then a share of what arrives, often a large share, quietly evaporates. Not lost to a competitor\'s brilliance. Lost to a busy week. The enquiry that came in while you were on a job. The quote that went out and was never chased. Nobody decides to lose these. They just slip, one at a time, invisibly, which is what makes it the most expensive problem in the business: you already paid for every one of them.'),
    ),
  ),
  flow(
    ...section(
      'THREE LEAKS',
      'The three leaks',
      ...p('Every business leaks in the same three places. See if you recognise yours.'),
      ...p('The first is the lead you forgot. Someone enquires through your website. The email lands, the day takes over, and by the time you reply it has been two days. They were ready when they wrote. They are gone by the time you answer, because a serious buyer with a live problem does not wait, they simply move to whoever answered first. You paid to bring that lead in, and a competitor closed it.'),
      ...p('The second is the quote that went quiet. You did the work: the visit, the numbers, the proposal, sent. You meant to follow up in a few days. A few days became a few weeks, and now it feels awkward, so you do nothing, and the deal dies in silence. Not rejected. Just never carried to a decision. Most businesses lose more revenue at this stage than at any other, precisely because the hard part was already done.'),
      ...p('The third is the client you already won. The job finished six months ago and they were happy. They would have come back, and they would have referred you, but nobody stayed in touch, so they drifted, and when the need returned they searched again like a stranger. Repeat business and referrals are the cheapest, warmest work a business ever gets, and they disappear for the simplest reason of all: no one was keeping track.'),
      ...p('Three leaks, one cause. Not laziness, and not a lack of care. The absence of a memory that does not depend on anyone\'s discipline.'),
      {
        type: 'diagram',
        id: 'btc-ch01-three-leaks',
        caption: 'The three leaks. A bucket labelled leads you already paid for with three leak streams: the lead you forgot, the quote that went quiet, the client you already won. One cause: no memory that survives a busy week.',
      },
    ),
  ),
  flow(
    ...section(
      'THE REFRAME',
      'You do not have a lead problem',
      ...p('This is the reframe the whole book stands on, so let us say it plainly. Most businesses that want more leads do not need more leads. They need to stop losing the ones they already get.'),
      ...p('It is worth noticing why "get more leads" is always the first instinct. New leads are visible and exciting, and buying them feels like progress. The leaks are invisible. Nothing announces a lead that died in silence, no report shows the quote nobody chased, so the loss never presents itself as a decision. Fixing follow-up feels like admin. Buying marketing feels like growth. And so businesses pour more water into a leaking bucket, year after year, and call the leak a lead problem.'),
      ...p('Run the honest thought experiment instead. If every enquiry from last quarter had been answered within minutes, every quote followed to an actual answer, and every past client kept warm, how much more work would you have won, with not one extra dollar of marketing? For most businesses the answer is uncomfortable, and it is the case for everything that follows. Sealing the bucket costs less than filling it faster, and it pays forever.'),
    ),
  ),
  flow(
    ...section(
      'THE MEMORY',
      'The memory of the business',
      ...p('So what is this system, plainly? A CRM is the memory of the business. That is the whole idea, and it is worth sitting with, because the name, customer relationship management, makes it sound like software, and the software is the least of it.'),
      ...p('Every business already has this memory. It is just stored in the worst possible place: people. Who enquired and what they wanted. What was quoted and what was promised. Who said call me in March. Which client likes things done a certain way. While the business is small, the owner holds all of it, and it mostly works. As the business grows, the memory fragments, some in your head, some in a staff member\'s phone, some in an inbox nobody checks, and things begin to fall between people. And when someone leaves, their share of the memory walks out the door with them.'),
      ...p('A CRM takes that memory out of heads and puts it somewhere permanent, shared, and awake. Every enquiry, every conversation, every quote, every promise, in one place, visible to everyone who needs it, with the system itself remembering what happens next. It does not forget on a busy Tuesday. It does not resign. And it turns follow-up from a feat of personal discipline into something the business simply does, the way invoices go out and doors get locked.'),
    ),
  ),
  flow(
    ...section(
      'TWO WAYS',
      'Inbox and spreadsheet, or a system',
      ...p('Every business handles its leads in one of two ways, and knowing which side you are on shapes everything that follows.'),
      ...p('The first way is the inbox and the spreadsheet, with a notebook and a memory doing the rest. It is where every business starts, and to be fair to it, it can work, for a while, at a certain size, with an unusually disciplined owner. But it has a ceiling built in. It depends entirely on people remembering, it shows you nothing you did not already know, and it breaks precisely when the business succeeds, because more leads means more slippage, and busier weeks mean worse follow-up. Growth makes it fail faster.'),
      ...p('The second way is a system. Every lead lands in one place the moment it arrives, tagged with where it came from. Every deal is visible on a board, so you can see at a glance who is new, who has been quoted, and who needs a nudge today. Follow-ups fire on time whether or not anyone remembered, and the fresh enquiry gets an answer in minutes, not days, because the system responded while you were working. Nothing depends on the memory of a busy person, which is exactly why it keeps working on the weeks the first way collapses.'),
      ...p('This book is about building the second way properly: the pipeline, the data, the follow-up that stays welcome, the tracking that shows which marketing actually pays, and the habits that keep a team using it. But before any of that, there is a question that decides whether the system serves you or trades on you, and most owners never think to ask it. Who owns the memory, the records, the contacts, the history, and what happens to it all if you ever want to leave? That is where we start.'),
      {
        type: 'diagram',
        id: 'btc-ch01-inbox-or-system',
        caption: 'Inbox and spreadsheet, or a system. LEFT: inbox plus spreadsheet, depends on remembering, breaks when busy. RIGHT: pipeline board with bell icon, catches, remembers, nudges, on its worst week too.',
      },
    ),
  ),
]
