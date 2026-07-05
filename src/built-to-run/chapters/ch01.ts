import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch01Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 1,
    title: 'Why your business drowns in admin, and does not have to',
    subtitle: 'The admin, the chasing, the copying has just become optional, and most businesses have not noticed.',
  }),
  flow(
    ...section(
      'THE SHIFT',
      'The ground has shifted',
      ...p('Start here, because everything in this book rests on it. The most tiring part of running a business, the admin, the chasing, the copying of things from one place to another, has just become optional, and most businesses have not noticed.'),
      ...p('Big companies noticed decades ago. Automation is precisely how they scale: no one at a bank retypes your transaction into a second system, no one at an airline manually emails you a boarding pass. Behind every large business is a web of small, invisible rules doing the repetitive work, which is exactly why a company of thousands does not need millions of administrators. But that machinery used to be bought with custom software, developer teams, and budgets with more zeros than most businesses will ever see. For everyone else, the rule was simple: if it needed doing, a person did it, again and again, by hand.'),
      ...p('That world is over. The connecting tools have become cheap, the systems a business already uses now talk to each other willingly, and AI has made the connections smart enough to handle the messy in-between steps that used to need a human. The result is that the machinery of a big company is now available to a growing one, assembled in days rather than years, at a cost that reads like a subscription rather than a project.'),
      ...p('And that has changed who pulls ahead. Two businesses can have the same website, the same leads, the same skills. In one, every enquiry, invoice, and reminder is a small manual task in somebody\'s day, and the owner spends the evening being the glue between systems. In the other, the routine work simply happens, the moment it needs to, without anyone touching it, and the people spend their days on work that actually needs a person. Give that difference a year and it stops being a difference in convenience. It becomes a difference in what the business can take on, how fast it can grow, and how tired its owner is. This book is about being the second business.'),
    ),
  ),
  flow(
    ...section(
      'ONE JOB',
      'The one job',
      ...p('Your automations have one job. Do the work that does not need a person, so your people can do the work that does.'),
      ...p('Everything else serves that. Not the clever workflows, not the tools, not the diagrams. The only measure that counts is whether the routine work of the business happens by itself, reliably, so that human hours stop being spent on tasks a rule could do.'),
      ...p('It is worth being precise about what that work is, because it hides in plain sight. It is copying an enquiry from the inbox into the spreadsheet. Sending the same welcome email for the hundredth time. Chasing the invoice that is two weeks overdue, again. Reminding the client about tomorrow\'s appointment. Typing the same customer details into a third system. None of these tasks needs judgment, taste, or a relationship. They need doing, exactly the same way, every time, which is precisely what makes them miserable for a person and perfect for a machine. A person doing machine work is the most expensive machine there is, and the most likely to make a mistake, because repetition is where human attention goes to die.'),
    ),
  ),
  flow(
    ...section(
      'HUMAN GLUE',
      'The owner as human glue',
      ...p('Here is the cost most businesses never write down, because it never appears on an invoice.'),
      ...p('In a business that has grown the usual way, the systems do not talk to each other. The website is one thing, the inbox another, the spreadsheet, the calendar, the accounting software, each its own island. So a person becomes the bridge between them, and in a growing business that person is usually the owner or the best staff member, exactly the people whose time is worth most. Every enquiry, order, and job carries a little tax of retyping, forwarding, updating, and remembering, paid in the most expensive currency the business has.'),
      ...p('And the tax compounds as you grow. More work means more copying, more chasing, more things held in heads, until the owner\'s day is spent answering questions only they can answer and moving information only they know where to find. This is the quiet reason so many capable businesses stall at a certain size. It is not the market and it is not the skills. It is that the owner has become the operating system, everything routes through them, and there are only so many hours in a person. The business does not need its owner to work harder. It needs to stop using its best people as plumbing.'),
      {
        type: 'diagram',
        id: 'btr-ch01-human-glue',
        caption: 'The owner as human glue. Five system islands with a person in the middle, arrows labelled retype, forward, chase, remember. The business does not need its owner to work harder. It needs to stop using its best people as plumbing.',
      },
    ),
  ),
  flow(
    ...section(
      'PLAIN ANATOMY',
      'What automation actually is',
      ...p('Strip away the jargon and an automation is one sentence: when this happens, do that.'),
      ...p('When a form is submitted, create the contact and send the acknowledgement. When a quote sits unanswered for three days, send the polite nudge. When an invoice goes overdue, chase it, and chase it again next week. When a job is marked done, ask for the review. Each one is a small rule, written once, that then fires every single time, at midnight, on weekends, during your busiest week, without being remembered, without being in a mood, without ever doing it slightly differently.'),
      ...p('That is the whole trick, and it is worth noticing what is not in it. There is no robot, no science fiction, and, for most automations, no artificial intelligence either, just a rule, faithfully applied. The power is not in any single rule being clever. It is in dozens of small rules, each handling one boring thing forever, adding up to a business where the routine work simply occurs. Later in this book we will add AI to the mix for the steps that genuinely need judgment, reading, or writing. But the honest foundation is humbler than the hype: when this happens, do that, applied to everything in your week that happens the same way twice.'),
      {
        type: 'diagram',
        id: 'btr-ch01-when-do-that',
        caption: 'When this happens, do that. WHEN: form submitted, arrow to DO: create contact, send acknowledgement, alert owner. No robot. No magic. A rule, faithfully applied.',
      },
    ),
  ),
  flow(
    ...section(
      'BETTER USED',
      'Not fewer people. Better used ones.',
      ...p('Let us deal directly with the worry that sits under this topic, because it deserves a straight answer.'),
      ...p('Automation, done the way this book describes, does not exist to replace your people. It exists to stop wasting them. Every hour a skilled person spends retyping details, formatting the same document, or chasing a payment is an hour of skill the business paid for and did not use. The salesperson\'s value is in the conversation, not the data entry after it. The manager\'s value is in judgment, not in forwarding emails between systems. Your value is in the decisions only you can make, not in being the last person who checks that things happened.'),
      ...p('So the honest promise is not a smaller team. It is a team doing the work you actually hired them for, and an owner doing the work only an owner can do. The machine takes the machine work. The people keep the thinking, the craft, and the relationships, which is where every dollar of margin in a premium business actually lives. Businesses that automate to cut people miss the point and usually regret it. Businesses that automate to unleash people are the ones that pull away.'),
    ),
  ),
  flow(
    ...section(
      'TWO WAYS',
      'Held together by effort, or built to run',
      ...p('Every business operates one of two ways, and knowing which one you are shapes everything that follows.'),
      ...p('The first is held together by effort. The work gets done, but only because people push it, remember it, and carry it between systems by hand. It can look impressively busy from the inside. Its ceiling is invisible until you hit it: every new client adds admin faster than revenue, holidays are a risk, growth makes everything creak, and the whole thing rests on a few tired people not dropping anything. Effort is a fine way to start a business. It is a terrible way to run one.'),
      ...p('The second is built to run. The routine work is wired into rules, the systems pass information between themselves, and human effort is spent only where humans add something. It is calmer from the inside, which owners sometimes mistrust at first, because busy has always felt like safe. But it scales without groaning, it survives holidays, and it frees the people in it to do their best work instead of their most repetitive.'),
      ...p('This book is the path from the first to the second: what to automate and what never to, the platforms honestly compared, a library of automations to steal ideas from, the AI layer added where it earns its place, and the habits that keep it all trustworthy. But before any of that, the same question every book in this series starts with, because it hurts the most when it is skipped. Who owns these automations, the accounts they run in, and the keys that connect them, and what happens if the person who built them disappears? That is where we start.'),
      {
        type: 'diagram',
        id: 'btr-ch01-effort-or-run',
        caption: 'Held together by effort, or built to run. LEFT: systems connected through people, effort carries the information. RIGHT: systems connected by rules, information carries itself, one person at judgment work.',
      },
    ),
  ),
]
