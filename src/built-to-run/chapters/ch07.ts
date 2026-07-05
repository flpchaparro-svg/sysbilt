import type { BtwPage } from '../types'
import { flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch07Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 7,
    title: 'Keeping it healthy, safe and legal',
    subtitle: 'What decays, what protects, and where the legal lines sit.',
  }),
  flow(
    ...p(
      'An automation, once built, looks finished, and it is not, any more than the website from this series\' first book was finished at launch. The machinery sits in a moving world: the platforms it connects update, the fields it relies on get renamed, the credentials it runs on expire, and the data it moves is governed by laws with opinions. This chapter is the upkeep layer: what decays, what protects, and where the legal lines sit. As ever, you need not do most of it yourself. You need to know what good looks like, because this is exactly the layer where cheap builds and professional ones part company, invisibly, until the day it is visible.',
    ),
    ...section(
      'TEST FIRST',
      'Test before it touches the world',
      ...p('The staging doctrine from this series applies with a twist: an automation is tested with real-shaped data before it meets real people. The new enquiry flow gets fed test submissions, including the malformed ones, the empty fields, the strange characters, the double-click. The invoice chaser runs against a dummy invoice before it ever emails a client. And changes to a live workflow get the same respect as changes to a live website: tried on a copy, then promoted, never edited hot on a Friday afternoon. The failure path from chapter three gets tested too, deliberately breaking a step to confirm the alarm actually reaches a human, because an untested alarm is a hope, not a system.'),
    ),
  ),
  flow(
    ...section(
      'THE KEYS',
      'The keys, revisited',
      ...p('Chapter two set the credential doctrine; here is its maintenance. Keys expire, and an expired key is the single most common cause of the silently dead workflow, so expiries are tracked and renewed ahead of time, not discovered by absence. Access is scoped: each connection gets only the permissions its job needs, the workflow that reads the calendar cannot also empty the customer list. And the register lives: what is connected to what, holding which access, so that when a tool is retired or a person leaves, their keys leave with them, the same day, the same reflex as collecting a physical key to the building.'),
    ),
  ),
  flow(
    ...section(
      'BACK UP',
      'Back up the logic itself',
      ...p('The workflows are business logic, chapter two called them an asset, and assets get backed up. The platform holds them, and the platform is one place; a regular export of every workflow to somewhere you control turns a catastrophic account problem into an inconvenience. The documentation, the plain-English line per workflow, backs up alongside, because a pile of exported logic without its explanations is a puzzle, not a backup.'),
    ),
  ),
  flow(
    ...realPicture({
      leadIn:
        'It is worth being honest about why automations decay, because nothing about a workflow looks like it is rotting, and the surprise is where businesses get hurt.',
      title: 'The real picture',
      paragraphs: [
        'An automation is a set of assumptions frozen at build time: that the form has these fields, that the app responds this way, that the folder is here, that the key is valid. Every one of those assumptions belongs to a system that keeps moving after the freeze. The platform on the other end ships an update and a response changes shape. A well-meaning colleague renames a field, improving a label and severing a wire nobody knew ran through it. A trial app the workflow leaned on lapses. A credential hits its quiet expiry date. None of these announce themselves, and none of them look like anything at all from the outside, which is the entire problem: a decayed automation does not sputter, it simply stops, and the business it served carries on believing.',
        'Then there are the limits, the machinery\'s version of weather. Every system an automation talks to will only accept so many requests so fast, and beyond that line it refuses, politely, temporarily, and completely. On an ordinary Tuesday the line is never approached. On the day the campaign lands and a hundred enquiries arrive in an hour, the unprepared workflow slams into the ceiling and begins shedding exactly the leads the campaign was paid to produce, while the prepared one, built with the queues and retries chapter nine describes, simply breathes deeper and works through the surge. The difference was invisible every day before that one.',
        'And the timing traps: two workflows touching the same record in the same second, each overwriting the other\'s work; the retried trigger that runs a flow twice and sends a customer two of everything; the overnight job that assumed the other overnight job had already finished. These are the ghosts in every automated system, and the professional response is not genius, it is the disciplines this book keeps repeating: one job per workflow, deliberate failure paths, deduplication where triggers can double, and monitoring that watches the flow of things rather than the appearance of things.',
        'The moral is not fragility, it is maintenance. A garden does not stay a garden because it was planted well; it stays a garden because someone walks it. The monthly test, the tended credentials, the watched alarms, that is the walking, and it is hours a year against the silent fortnight it prevents.',
      ],
    }),
    {
      type: 'diagram',
      id: 'btr-ch07-decay',
      caption: 'Why automations decay. Assumptions frozen at build time with four arrows of change: platform update, field renamed, app lapses, credential expires. It does not sputter. It simply stops.',
    },
    {
      type: 'diagram',
      id: 'btr-ch07-ceiling',
      caption: 'The ceiling on a big day. Unprepared flow hits the ceiling and sheds items. Prepared flow bends into a queue and works through. The difference was invisible every day before this one.',
    },
  ),
  flow(
    ...section(
      'THE LAW',
      'The law, when machines act for you',
      ...p('The legal layer is mercifully simple to state, because it is one principle: an automation acting for your business is your business acting. The law does not grade on who pressed send.'),
      ...p('So when automations send messages, the messaging rules from this series apply in full: consent, identification, a working unsubscribe, and, one automation-specific addition with teeth, the unsubscribe must actually reach the machinery. A person who opts out and keeps receiving the sequence because the suppression never synced is not a technical glitch in the law\'s eyes, it is a breach, which makes the wiring between your unsubscribe list and every sending workflow a compliance component, not a nice-to-have. When automations move personal data between systems, the privacy obligations travel with the data: each new connection is a new place customer information lives, worth a moment\'s thought about whether it needs to, and the register from the keys section doubles as the map of where personal information flows, which is exactly the map the privacy rules expect a business to have. And when automations scrape or gather public information, as the signature workflow does, the composed position is restraint: publicly available, used respectfully, for a purpose the person would find reasonable, a briefing to serve them better clears that bar; hoarding beyond need does not. The lawyer\'s read over the final shape of anything novel remains, as everywhere in this series, cheap insurance.'),
      {
        type: 'diagram',
        id: 'btr-ch07-law-travels',
        caption: 'The law travels with the data. Consent, identification, working unsubscribe, plus the register as map of where personal information flows. An automation acting for your business is your business acting.',
      },
    ),
  ),
  flow(
    ...section(
      'IN SHORT',
      'In short',
      ...p('The upkeep of automation is small, regular, and dull, which is the highest compliment infrastructure can earn: tested changes, tended keys, exported logic, watched alarms, and the law wired in rather than bolted on. With the machinery sound, the next chapter adds the ingredient everyone is shouting about, intelligence inside the flows, and it does so with this book\'s characteristic scepticism, because AI in an automation is either a scalpel or a very expensive way to be wrong quickly.'),
    ),
  ),
]
