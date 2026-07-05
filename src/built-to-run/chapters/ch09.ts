import type { BtwPage } from '../types'
import { flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch09Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 9,
    title: 'Your automations as the nervous system',
    subtitle: 'The wiring that connects the website, the CRM, the inbox, and makes them one organism.',
  }),
  flow(
    ...p(
      'Every book in this series has a hub chapter, and this one wears the crown, because automations are not another spoke, they are the wiring itself: the nervous system that connects the website, the CRM, the inbox, the calendar, the accounting, the content, and makes them one organism instead of a drawer of tools. This chapter sees the machine whole, walks the signature flow bolt by bolt, and shows the engineering that makes a nervous system dependable rather than decorative.',
    ),
    ...p(
      'The picture first. The website senses, enquiries, behaviour, orders. The CRM remembers. The accounting keeps score. And between them all run the automations: dozens of small reflexes, each one a chapter-two rule, together forming something none of them is alone, a business with reactions. An enquiry does not wait to be noticed; the system flinches, usefully, in the same second. That is the difference between owning tools and having a nervous system, and it is the whole distance this series has travelled from its first book to here.',
    ),
    {
      type: 'diagram',
      id: 'btr-ch09-nervous-system',
      caption: 'The nervous system. Website senses, CRM remembers, Accounting keeps score, reflex-wiring on every connection. The automations are not another spoke. They are the wiring.',
    },
  ),
  flow(
    ...section(
      'SIGNATURE FLOW',
      'Under the hood: the enquiry that arrives with its homework done',
      ...p('Now the signature, promised since chapter five, walked slowly, because this single flow contains every idea in this book working at once.'),
      ...p('At 8:47 on a Tuesday, a business fills in the website\'s contact form. The trigger fires, the doorbell from chapter two, and the reflexes begin. First the rules do the machine work: the contact exists in the CRM, tagged with source and page; the acknowledgement is in the enquirer\'s inbox before their kettle boils, warm, specific, promising a proper reply shortly; the owner\'s phone quietly holds the alert. Ninety seconds, no intelligence required, and already the business has out-responded most of its market.'),
      ...p('Then the thinking steps, chapter eight\'s scalpels, each doing one modest job. The system looks up who enquired, reads what is publicly there to be read, their website, their presence, the shape of their situation, and an extraction step distils it into a briefing: who they are, what they likely need, what is worth knowing before the conversation. A drafting step then writes the reply the owner would want to send, personal, informed, answering what was actually asked, with the briefing attached below for the human\'s eyes only.'),
      ...p('And then, the gate. Nothing sends. The draft sits in the owner\'s drafts folder, homework stapled to it, and the machine\'s work is done. What the owner experiences at 9:15 is this: a coffee, a phone, a prepared reply to a lead they have never heard of, about whom they are somehow already informed, requiring thirty seconds of judgment and one tap. What the enquirer experiences is a considered, personal, knowledgeable response inside the hour, from a business that clearly has itself together. What actually happened is chapter two\'s rules, chapter three\'s anatomy, chapter six\'s gate and chapter eight\'s thinking, in a chain, while everyone slept-walked through a Tuesday morning.'),
      ...p('That is the book, in one flow. Not a robot replacing a person, a system making one person operate like a firm.'),
      {
        type: 'diagram',
        id: 'btr-ch09-signature-flow',
        caption: 'The enquiry that arrives with its homework done. 8:47 Tuesday. Rules in ninety seconds. Thinking steps research, brief, draft. Everything parked in DRAFTS. Owner at 9:15: thirty seconds, one tap.',
      },
    ),
  ),
  flow(
    ...realPicture({
      leadIn:
        'That flow ran clean because everything underneath it held, and this box is the underneath, told at full depth, because this book is the craft and the craft deserves its truth.',
      title: 'The real picture',
      paragraphs: [
        'Every arrow in that story was a hand-off that could fail. The form fired its webhook once; had the receiving system been mid-hiccup in that exact second, the enquiry would have vanished, silently, no error anywhere, which is why the professional version never fires and forgets: it confirms every delivery, queues what cannot go yet, and retries what did not confirm, because sent and received are different facts and the gap between them is where leads go to die. The lookups and the drafting leaned on outside services, each with moods and limits of their own; the dependable version expects the refusals, waits politely, and tries again, so that a rate limit is a pause, not a loss. And the surge case is designed for, not hoped against: the morning a campaign lands and forty enquiries arrive in an hour, the queue simply deepens and the flow works through it in order, where the naive version would have hit every ceiling at once and shed the exact leads the campaign existed to win.',
        'The double-fire is designed for too. Forms get double-clicked, webhooks get retried by their own senders, and without deduplication the enquirer receives two acknowledgements and the CRM grows twins, so every trigger that can fire twice is met by logic that recognises the echo and swallows it. The same discipline guards the record: the flow that researches and the human who edits can touch the same contact in the same minute, and the wiring is built so the last write does not silently erase the first.',
        'Then the watcher. Every reflex in this nervous system is monitored not for whether it exists but for whether it is firing: enquiries per day, acknowledgements per day, drafts per day, compared, continuously, because those numbers agreeing is what health looks like, and their divergence is the earliest possible alarm. And the watcher is watched, the oldest problem in monitoring, solved the unglamorous way: a heartbeat, a daily proof-of-life from the monitoring itself, so that silence can never be mistaken for peace. This is the machinery behind chapter six\'s two-minute check; the two minutes work because a great deal of engineering decided in advance what would be worth telling a human.',
        'The thinking steps carry their own guardrails. Each AI step runs the smallest model its job allows, carries a spend ceiling, and lives behind a circuit breaker, because the one failure mode unique to intelligent steps is the expensive loop, the retry that thinks, fails, and thinks again at cost, all night, and the fable every practitioner knows is the bill that arrived before the alarm did. Caps and breakers turn that fable into a non-event: the loop trips the breaker, the human gets the flag, the damage is a line item instead of a mortgage payment.',
        'And beneath the whole flow, the keys: the credentials that let it read the CRM, send as the business, research the world, each scoped to exactly its job, stored in the vault, expiries tracked, because this one workflow holds more doors open than anything else in the building, and it is built like it knows that.',
        'None of this was visible at 8:47, and that is the entire point. The idea is simple. The engineering that makes it true on the fortieth enquiry of a surge morning, in the eleventh month, the week after a platform update, is not, and it is precisely the difference between the demo that dazzled once and the nervous system a business rests its reputation on.',
      ],
    }),
    {
      type: 'diagram',
      id: 'btr-ch09-sent-received',
      caption: 'Sent is not received. Fire, confirm, queue, retry, delivered. The gap between sent and received is where leads go to die.',
    },
    {
      type: 'diagram',
      id: 'btr-ch09-watcher',
      caption: 'The watcher, and the watcher\'s watcher. Enquiries in, acknowledgements out, drafts prepared, health is these numbers agreeing. Daily proof of life from the monitor itself.',
    },
  ),
  flow(
    ...section(
      'THE ORDER',
      'The order the reflexes earn their place',
      ...p('Seen whole, the nervous system is built the way chapter four ordered it: sensing first, the website wired to the CRM, every enquiry caught; reflexes second, the acknowledgements, the chasers, the reminders, the quick wins; memory-keeping third, the records, the logging, the reconciliation flags; thinking fourth, the classification, the briefings, the drafting, added where rules ran out; and awareness last, the digests, the anomaly alerts, the watcher watching. Each layer stands on the one before, which is why the everything-machine on day one fails and the layered build compounds.'),
      {
        type: 'diagram',
        id: 'btr-ch09-layers',
        caption: 'The layers, in order. SENSING, REFLEXES, MEMORY-KEEPING, THINKING, AWARENESS. Each layer stands on the one before.',
      },
    ),
  ),
  flow(
    ...section(
      'IN SHORT',
      'In short',
      ...p('This is what built to run means: a business where information moves itself, routine work happens the moment it should, the machines prepare and the people decide, and the owner\'s attention, the scarcest resource in the building, is spent only where it earns. The remaining chapters are about keeping it growing, the sequencing, the team, the moment the platform economics flip, and then the toolkit for building faster with AI at your elbow. The machine is built. Now it scales.'),
    ),
  ),
]
