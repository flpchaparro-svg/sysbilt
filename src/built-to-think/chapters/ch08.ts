import type { BtwPage } from '../types'
import { flow, opener, p, section, realPicture } from '../../built-to-work/helpers'

export const ch08Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 8,
    title: 'AI that answers: chat and voice agents',
    subtitle: 'Done well, the end of the missed enquiry. Done badly, your brand live and unsupervised.',
  }),
  flow(
    ...p(
      'The most visible AI ambition in business is the agent that answers customers itself: the chat on the website at midnight, the voice on the phone when everyone is on the tools. Done well, it is the end of the missed enquiry. Done badly, it is your brand, live, unsupervised, being confidently wrong to the people who pay you. This chapter is the honest version: what agents genuinely do well, where they must hand off, and the truth that decides every deployment before it starts, which has nothing to do with the agent at all.',
    ),
    ...section(
      'STRENGTHS',
      'What they genuinely do well',
      ...p('Hold the agent to chapter three\'s anatomy and its real strengths emerge, and they are real. The routine, at any hour: the opening times, the service explanations, the what-do-you-charge-for structure, the how-does-it-work, answered instantly, identically, at three in the afternoon and three in the morning, which matters because this series\' CRM book already established that the business answering first wins, and the agent answers first, always. The capture: every conversation can end in details taken, a booking made, a callback promised, so the midnight browser becomes a named morning lead instead of a closed tab. And the qualifying: the agent that asks the three intake questions and routes accordingly hands your humans conversations that start warm and informed.'),
      ...p('The voice version extends all of it to the phone, and for phone-heavy businesses the after-hours and overflow case is genuinely strong: the call that used to ring out now gets answered, helped, booked, and logged, and the morning starts with a briefing instead of a voicemail graveyard.'),
    ),
    ...section(
      'HANDOFF',
      'Where they fail, and the handoff that saves them',
      ...p('The failure modes are as predictable as the strengths. Anything requiring judgment: the unusual job, the price that depends, the situation that is genuinely an exception, chapter four of our automation book\'s never-automate list, arriving here with a microphone. Anything emotional: the complaint, the distressed customer, the delicate history, where a fluent script reads as an insult. And anything at the edge of its knowledge, where chapter seven\'s mechanics apply with an audience: the agent that does not know does not go quiet, it goes plausible, live, to a customer.'),
      ...p('The design answer is the handoff, and it is the most important feature of any agent, weighted above every capability on the brochure: the agent knows what it does not handle, says so gracefully, and moves the person to a human, with the context attached so nothing is repeated. A good handoff feels like being helped twice. A missing one feels like a phone tree with better grammar, and customers punish it identically. The rule when configuring: define the agent\'s territory narrowly, script the exit warmly, and let the humans own everything past the border. An agent that says let me get someone who can help with that properly is protecting your brand. One that improvises past its knowledge is spending it.'),
      {
        type: 'diagram',
        id: 'btt-ch08-agent-territory',
        caption: 'The agent\'s territory. Inside: the routine, the capture, the qualifying, at any hour. Outside: judgment, emotion, the edge of its knowledge. On the border: the handoff, context attached, nothing repeated.',
      },
    ),
  ),
  flow(
    ...realPicture({
      leadIn: 'Here is the truth that decides every agent project, and it is the one the demos are built to hide: the agent is the interface. The knowledge is the product.',
      title: 'The real picture',
      paragraphs: [
        'An agent answers from what it has been given, your services, your prices, your policies, your processes, your answers to the hundred questions customers actually ask, and every quality it displays is downstream of that material. Given a complete, current, well-organised knowledge base, a modern agent is genuinely impressive, and, this is the part that surprises people, genuinely straightforward to stand up: the platforms are mature, the wiring is days not months, and once the information exists, building the agent on top of it is the easy fortnight at the end.',
        'Which reveals where the real project lives. The work is the knowledge: extracting what is currently in the owner\'s head and the veterans\' habits, writing down the actual prices and the actual policies, deciding the official answer to the questions that have always been answered slightly differently by whoever picked up, and keeping all of it current as the business moves, because an agent reading last year\'s prices is a machine for confidently misquoting. Most failed agent projects were never agent failures. They were businesses that pointed a fluent interface at thin, stale, or contradictory knowledge, and got fluent, stale contradictions delivered with perfect confidence, at scale.',
        'The strategic reading is the encouraging part. The knowledge base is not a tax the agent imposes; it is an asset the agent finally gives you a reason to build, and it is the same asset this series has been circling from every direction, the documented processes that make automation possible, the written answers that feed the website\'s FAQ and the machines that read it, the single source of truth that our training book builds an entire system on. Build it once, properly, and the agent is merely its first employee. The chat inherits it, the voice inherits it, the new staff member inherits it, the website inherits it, and every one of them stays exactly as good as it is kept.',
        'So the honest sequence for any business wanting an agent: knowledge first, agent second, and if the knowledge work sounds like the hard part, that is because it is, and it was always going to be done by someone, at some point, under some deadline. The agent just made it worth doing now.',
      ],
    }),
    {
      type: 'diagram',
      id: 'btt-ch08-knowledge-product',
      caption: 'The knowledge is the product. Above water: the agent, the easy fortnight at the end. Below water: your services, prices, policies, processes, answers, written down, current, owned. Build it once properly and the agent is merely its first employee.',
    },
  ),
  flow(
    ...section(
      'OPERATING',
      'Running one, honestly',
      ...p('The operating disciplines, briefly, because they follow from everything above. The agent announces itself, chapter seven\'s honesty line, no pretending to be Sharon. Its conversations are reviewed on a rhythm, because they are a live map of what customers ask and where the knowledge is thin, the same listening loop this series installs everywhere, and every recurring question the agent fumbles is an instruction: update the knowledge, and the whole system improves at once. Its territory grows the way everything in this book grows, one proven expansion at a time, measured by chapter six\'s habit. And its knowledge has an owner, a named human whose job includes keeping it true, because an unowned knowledge base is next year\'s confident misinformation.'),
      ...p('Built this way, knowledge-first, narrow, honest, handing off warmly, the agent becomes what it should be: your best answers, on duty around the clock, with your humans doing what only humans do. The next chapter wires this and everything else together, AI connected to your actual systems, where the questions get answered from your live data and the meter runs unattended, which is why it comes with the strongest guardrails in the book.'),
      {
        type: 'diagram',
        id: 'btt-ch08-listening-loop',
        caption: 'The listening loop. Customers ask, the agent answers and fumbles some, fumbles map what is thin, knowledge gets updated, everything that reads it improves at once. Every recurring fumble is an instruction.',
      },
    ),
  ),
]
