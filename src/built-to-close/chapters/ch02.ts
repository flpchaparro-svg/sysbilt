import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch02Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 2,
    title: 'What a CRM actually is, and what you own',
    subtitle:
      'The plain anatomy, the honest sizing conversation, and the ownership rules.',
  }),
  flow(
    ...p(
      'Chapter one ended on the question that decides whether this system serves you or trades on you: who owns the memory? Before answering it, we need to strip the jargon off the thing itself, because CRM is one of those terms that sounds more complicated than it is, and the mystique costs owners money, either in tools too big for the job or in years of avoiding the decision altogether. This chapter is the plain anatomy, the honest sizing conversation, and the ownership rules.',
    ),
  ),
  flow(
    ...section(
      'FOUR WORDS',
      'The four words that matter',
      ...p(
        'Underneath every CRM ever built sit four ideas, and once you hold them, no demo can confuse you again.',
        'A contact is a person: name, details, and everything ever known about them, in one place. A company groups the contacts who belong together, so the three people you deal with at one client read as one relationship, not three strangers. A deal is a piece of potential work moving toward a yes or a no: the bathroom renovation being quoted, the retainer being discussed, each with a value and a stage. And an activity is anything that happened: the call, the email, the meeting, the note, stamped to the contact and the deal it belongs to.',
        'That is the whole machine. Contacts and companies are the memory of who. Deals are the memory of what might happen. Activities are the memory of what did. Every feature in chapter five is just a faster way of feeding or reading those four things, and every button in every CRM on earth maps back to them.',
      ),
      {
        type: 'diagram',
        id: 'btc-ch02-four-words',
        caption:
          'The four words that matter. Four stacked blocks: CONTACT "a person, everything known, one place", COMPANY "the contacts who belong together", DEAL "potential work moving toward yes or no", ACTIVITY "what actually happened, stamped where it belongs". Bracket: "everything else is a faster way to feed or read these four."',
      },
    ),
  ),
  flow(
    ...section(
      'RIGHT-SIZED',
      'Right-sized, honestly',
      ...p(
        'Now the sizing conversation most vendors will not have with you.',
        'CRMs come in tiers, and the tiers exist for different animals. At the top sits the enterprise end, platforms like Salesforce, built for organisations with sales departments, administrators on payroll, and processes measured in committees. They are superb at what they do, and what they do is not you. A growing business inside an enterprise CRM is a family paying for a freight terminal: everything is possible and everything is heavy, and the weight is precisely what kills adoption, which chapter ten will show is how CRMs actually die.',
        'The tier this book lives in is the modern middle, platforms like HubSpot and Pipedrive and their peers, built so that a business owner can see the whole pipeline on one screen, staff can update a deal from a phone in a carpark, and the system starts earning in days rather than quarters. They connect willingly to the tools you already run, they grow with you, and their free-to-modest entry tiers mean the decision is not a gamble.',
        'The honest rule of thumb: buy the smallest system your next two years can live in, not the biggest one your ambitions can imagine. An outgrown CRM is a good problem, easily solved. An over-bought one is a graveyard with a subscription.',
      ),
      {
        type: 'diagram',
        id: 'btc-ch02-right-sized',
        caption:
          'Right-sized, honestly. Three vessels: SMALL "spreadsheet: fine until it is not", MIDDLE (gold) "the modern middle tier: visible pipeline, mobile-first, earning in days, this book lives here", LARGE "enterprise platforms: superb, heavy, built for departments, not for you". Footer: "Buy the smallest system your next two years can live in."',
      },
    ),
  ),
  flow(
    ...section(
      'OWNERSHIP',
      'What you own',
      ...p(
        'And now the question this book keeps asking, because it hurts most when skipped. The memory the CRM holds, every contact, every deal, every note and email trail, is the asset. The software is just the shelf it sits on. So the ownership rules:',
        'The account is yours: registered to the business, in your name, master login held by you, the same doctrine as every system you run. The data is exportable: before committing to any platform, find the export button and use it, because a CRM that lets you leave cleanly, contacts, deals, histories and all, is one you can safely stay with, and one that holds your memory hostage has told you its business model. And the configuration is documented: the pipeline stages, the automations, the reasons behind them, written down somewhere that is not the head of whoever set it up. If a partner builds your CRM, they build it in your account and hand you the keys, and if anyone resists that, treat it as the warning it is.',
      ),
      {
        type: 'diagram',
        id: 'btc-ch02-what-you-own',
        caption:
          'What you own. Key icon over three items: "The account, in your name", "The data, exportable, test the export before you commit", "The configuration, documented outside anyone\'s head". Footer: "The software is the shelf. The memory is the asset."',
      },
    ),
  ),
  flow(
    ...section(
      'MOVING IN',
      'Moving in',
      ...p(
        'Last, the move itself, because every business adopting a CRM is migrating from somewhere, usually the inbox, the spreadsheet, and a few hundred sticky notes of the soul.',
        'The temptation is to shovel everything in. Resist it. A migration is the one free chance to start clean: contacts deduplicated so the same human does not arrive as three records, dead entries left behind, sources tagged where they are known, and the spreadsheet\'s fifteen half-used columns distilled to the handful chapter four will defend. Bring the living relationships and the open conversations. Archive the fossils. A CRM that opens on day one clean, current and trustworthy gets used, and one that opens as a landfill teaches the team to distrust it in the first week, which is a lesson very hard to unteach.',
        'With the machine understood and owned, the next question is the one that makes it earn: what shape should the pipeline be? That is chapter three.',
      ),
    ),
  ),
]
