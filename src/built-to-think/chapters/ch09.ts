import type { BtwPage } from '../types'
import { flow, opener, p, section, realPicture } from '../../built-to-work/helpers'

export const ch09Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 9,
    title: 'Connecting AI to your systems',
    subtitle: 'Where the meter runs with nobody at the keyboard.',
  }),
  flow(
    ...p(
      'Everything so far has been AI at arm\'s length: a chat window, a feature in a tool, an agent on a defined patch. This chapter is the deeper layer, AI wired into your actual systems, reading your live data, working inside your automations, and it is where the technology stops being an assistant and starts being infrastructure. It is also the only chapter where the meter runs with nobody at the keyboard, which is why it arrives with the firmest guardrails in the book.',
    ),
    ...section(
      'TIER TWO',
      'AI inside the tools that know you',
      ...p('The gentlest connection is the one already happening: the AI features inside your CRM and your other systems, drafting the follow-up from the deal\'s own history, summarising the call into the record, reading the receipt into the ledger. Their advantage is context without effort, the model arrives already knowing what the record knows, and containment, the data never leaves walls your agreements already govern, which quietly satisfies chapter seven\'s privacy line by architecture rather than discipline. Switch them on, hold them to the fit test, and let them prove themselves; they are the cheapest connected AI you will ever run.'),
    ),
    ...section(
      'AUTOMATIONS',
      'AI inside your automations',
      ...p('The next layer is our automation book\'s thinking steps, running here at full strength: the classifier reading every inbound message and routing it with context, the extractor turning documents into fields, the researcher building briefings, the drafter preparing replies for the gates. Each is a chapter-five workhorse, wired into a workflow, firing on triggers instead of requests, which is precisely what makes this layer powerful and precisely what changes its risk profile: at tier one, a bad prompt wastes your minute; at this tier, a bad step wastes money and makes mistakes at whatever rate the trigger fires. The automation book\'s disciplines, one job per workflow, failure paths, human gates, monthly tests, are not background reading for this layer. They are its licence conditions.'),
    ),
    ...section(
      'MCP',
      'MCP, and asking your business questions',
      ...p('Now the newest piece, explained plainly because it will be sold to you confusingly. Until recently, wiring AI to a business system meant custom plumbing per connection. A new standard has emerged, MCP, and the honest analogy is the power socket: a standard plug that lets an AI connect safely to a tool, see what that tool offers, and use it within set permissions, the same way any appliance uses any socket.'),
      ...p('What it makes possible is the thing owners have wanted since the first dashboard: asking your business questions in plain English and getting answers from your live data. Which quotes went quiet this month. What did we win from referrals this quarter. Show me every client we have not spoken to since March. The AI, plugged into the CRM and the books through governed sockets, reads, assembles, and answers, and the follow-up question works too. The guardrails write themselves from everything this book has said: the plugs carry permissions, read access is not write access and the difference is policy; the credentials behind them are governed by our automation book\'s key doctrine; and the answers are chapter-two outputs, trusted most where checking is fastest, so the number that surprises you gets verified before it changes a decision. Read widely, write narrowly, and let nothing spend, send or delete without a human, the standing rule for every socket in the building.'),
      {
        type: 'diagram',
        id: 'btt-ch09-standard-plug',
        caption: 'The standard plug. AI with governed sockets into CRM, books, calendar. Read widely, write narrowly, spend never without a human. A plain-English question in, an answer from live systems out.',
      },
    ),
  ),
  flow(
    ...section(
      'TUESDAY',
      'Under the hood: the same Tuesday, from the AI\'s side',
      ...p('Our automation book walked the signature workflow, the enquiry that arrives with its homework done, from the wiring\'s point of view. Here is the same 8:47 Tuesday from the intelligence side, because seeing where the thinking sits, and does not sit, is this chapter\'s whole lesson.'),
      ...p('The rules fire first and think nothing: capture, tag, acknowledge, alert, ninety seconds, zero tokens, chapter one\'s doctrine in action. Then four small thoughts, each sized to its job. A classifier, small model, fraction of a cent, reads the enquiry: commercial, service enquiry, worth the full treatment. A researcher, mid-sized, a few cents, reads what is publicly there about the enquirer and hands its findings on. An extractor distils them into the briefing, the shape a human can use in thirty seconds. A drafter, the large model because here quality is the product, writes the reply the owner would want to send, from the facts supplied and nothing else. Total thinking cost: coins. Then the machinery parks everything at the gate, and the intelligence is done, because the fifth step, judgment, was never the machine\'s to take.'),
      ...p('Four thoughts, four sizes, four costs, one gate. Every connected AI setup you ever evaluate can be read against that pattern, and the ones that cannot be are the ones to question.'),
      {
        type: 'diagram',
        id: 'btt-ch09-four-thoughts',
        caption: 'Four thoughts, four sizes, one gate. Zero-token rules lane, then CLASSIFIER small, RESEARCHER mid, EXTRACTOR small, DRAFTER large, all ending at DRAFTS. The fifth step was never the machine\'s.',
      },
    ),
  ),
  flow(
    ...realPicture({
      title: 'The real picture',
      paragraphs: [
        'The engineering under connected AI is the automation book\'s engineering plus one new ingredient, a meter, and the meter changes the failure economics enough to deserve its own honesty.',
        'Every failure mode that wiring inherits, the retries, the queues, the silent stops, now has a billed version. The retry loop that used to fail quietly now fails expensively: a step that errors, retries, and errors again is thinking at cost on every attempt, and a loop like that running unnoticed overnight is how the trade\'s cautionary tales begin, the bill arriving before the alarm does, sometimes with more digits than the year\'s budget. The industry has real stories of a single misrouted experiment burning through sums that read like typos. The defences are unglamorous and absolute: a spend cap on every AI step, an alert well before the cap, and a circuit breaker that halts a step after repeated failures, so the loop trips a flag instead of running a tab. If a proposed setup lacks those three, the proposal is not finished.',
        'Then the sizing discipline, at wiring scale. The barrister-sorting-mail mistake from chapter four is an annoyance in a chat window and a structural leak in an automation, because the oversized model runs on every trigger, forever: the premium reasoning model classifying routine emails is paying, on each of ten thousand messages, for thinking the task never needed. Connected setups are audited by step: smallest model that does the job, promoted on evidence, demoted by default, and the audit is a line item in chapter six\'s monthly measure.',
        'Caching is the quiet saver: the same question should not be paid for twice, the same document not re-read hourly, the knowledge that rarely changes not re-fetched on every call. Well-built setups remember their own recent work; naive ones re-think identical thoughts at full price all day, and the difference never shows in a demo because demos run once.',
        'And the safety engineering is the cost engineering\'s twin, because both are about an unattended machine\'s blast radius. Permissions scoped to the read, writes gated to the human, credentials vaulted and expiring on schedule, and the monitoring watching flow rather than appearance, the automation book\'s watcher, now also watching spend, because tokens-per-day is a health metric exactly like enquiries-per-day, and its sudden change in either direction is the earliest alarm there is.',
        'None of this argues against the wiring. It argues for respecting what changed: at this layer, the machine thinks without being asked, and everything unattended needs limits, meters and someone who reads them. Give it those and connected AI is the cheapest capable colleague you will ever add. Skip them and you have built a very fluent liability with your keys in its pocket.',
      ],
    }),
    {
      type: 'diagram',
      id: 'btt-ch09-metered-failure',
      caption: 'The metered failure. A retry loop spinning against a rising bill through the night, then the defended version: SPEND CAP, ALERT, CIRCUIT BREAKER, ending at a flag to a human. The loop trips a flag instead of running a tab.',
    },
    {
      type: 'diagram',
      id: 'btt-ch09-tokens-health',
      caption: 'Tokens per day is a health metric. Three watched lines: enquiries per day, drafts per day, tokens per day. A sudden change in any direction is the earliest alarm there is.',
    },
  ),
  flow(
    ...section(
      'IN SHORT',
      'In short',
      ...p('Connected properly, AI stops being a window you visit and becomes a capability your systems simply have: the records that summarise themselves, the enquiries that arrive briefed, the business you can question in plain English, all of it gated, capped, and owned. The remaining question is sequence, what to adopt when, and how to keep a level head while the industry shouts, which is the next chapter, and the shortest sermon in the book.'),
    ),
  ),
]
