import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch03Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 3,
    title: 'The anatomy of a pipeline that closes',
    subtitle: 'Built well, the pipeline is the most honest page in the business.',
  }),
  flow(
    ...p(
      'The pipeline is the heart of the CRM, the board where every piece of potential work is visible, moving left to right from first contact to won or lost. Built well, it is the most honest page in the business: one glance on a Monday morning tells you what is coming, what is stuck, and what needs a call today. Built badly, it is a decoration nobody updates. The difference is anatomy, and the anatomy has rules.',
    ),
    ...section(
      'THE STAGES',
      'Stages that mirror reality',
      ...p('A pipeline\'s stages should describe what actually happens to a deal in your business, in the words you already use. Not a textbook\'s funnel, yours. For most businesses that shape is familiar: a new enquiry arrives, it gets qualified with a conversation, something is scoped or visited, a quote or proposal goes out, a decision gets chased, and it lands as won or lost. Five to seven stages, named plainly.'),
      ...p('The two ways pipelines die are the two ways owners over-think this. Too many stages, twelve micro-steps mapping every possible wobble, and updating the board becomes admin, so nobody does, and the board starts lying within a month. Too few, three vague zones, and the board tells you nothing you did not already feel. The test: each stage should represent a real change in the deal\'s situation, something you would mention if a colleague asked how that one is going.'),
      {
        type: 'diagram',
        id: 'btc-ch03-too-many-few',
        caption: 'Too many, too few. LEFT: twelve cramped micro-stages, nobody updates it. RIGHT: three vague zones, tells you nothing. CENTRE: five to seven plain stages, a real change per stage.',
      },
      {
        type: 'diagram',
        id: 'btc-ch03-pipeline',
        caption: 'A pipeline that mirrors reality. Six stages left to right with one-line entry rules beneath each.',
      },
    ),
  ),
  flow(
    ...section(
      'ENTRY RULES',
      'Entry and exit rules',
      ...p('Here is the discipline that separates a pipeline from a mood board: every stage has a plain rule for what gets a deal into it. Quoted means the quote has been sent, not written, not intended, sent. Qualified means the conversation happened and the need, timing and fit are real. Write the rules once, a single line per stage, and the board becomes trustworthy, because two people looking at it are reading the same language. Without the rules, "qualified" means whatever the optimist who dragged the card felt that day, and a board that means different things to different people means nothing at all.'),
    ),
  ),
  flow(
    ...section(
      'ONE OWNER',
      'One owner, one next step',
      ...p('Two more rules, small and mighty. Every deal has exactly one owner, a named human answerable for it, because a deal owned by the team is a deal owned by nobody, and unowned deals are where chapter one\'s second leak lives. And every open deal carries a next step with a date: the follow-up call Thursday, the site visit booked, the decision expected Friday. A deal with no next step is not being worked, it is being remembered fondly, and the pipeline should make that visible enough to sting.'),
      {
        type: 'diagram',
        id: 'btc-ch03-one-owner',
        caption: 'One owner, one next step. LEFT: no owner, no date, being remembered fondly. RIGHT: owner named, next step dated, being worked.',
      },
    ),
  ),
  flow(
    ...section(
      'READING THE BOARD',
      'Reading the board',
      ...p('A healthy pipeline answers questions faster than any report. Where deals cluster tells you where your process bottlenecks, a pile-up at Quoted is a follow-up problem, a pile-up at New Enquiry is a response-time problem. How long deals sit in a stage tells you your real sales rhythm, and which deals have sat past it tells you today\'s call list. The total value on the board, weighted by how far along things are, is the honest weather forecast for the next quarter. None of this needs analysis software. It needs a board kept true, which is a habit, and habits are chapter six\'s business.'),
      {
        type: 'diagram',
        id: 'btc-ch03-reading-board',
        caption: 'Reading the board. A pile-up at QUOTED tagged follow-up problem, a deal past its rhythm tagged today\'s call, the weighted total tagged the quarter\'s honest weather.',
      },
    ),
  ),
  flow(
    ...section(
      'WON AND LOST',
      'Won, lost, and the truth about lost',
      ...p('Two exits, both mattering more than they look. Won triggers the machinery, the invoice, the onboarding, the handover, which chapter nine wires up. Lost deserves one honest field on the way out: why. Price, timing, went quiet, chose another, not a fit. It takes five seconds per deal and after a year it is the cheapest strategic research you will ever own: the actual reasons your market says no, in your market\'s own pattern. Businesses that skip the why lose the same deals the same way forever, and call it luck.'),
      ...p('The pipeline is the shape. What fills it, the records, the fields, the tags, is the substance, and substance rots without hygiene. That is chapter four.'),
    ),
  ),
]
