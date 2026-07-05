import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch08Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 8,
    title: 'When automations think: adding AI',
    subtitle: 'Where a thinking step earns its place, where it is hype, and the rules that keep intelligent automations honest.',
  }),
  flow(
    ...p(
      'Everything so far has run on rules, when this happens, do that, and chapter one was firm that rules are the honest foundation, no intelligence required. But some steps genuinely need judgment of a modest kind: reading a message and deciding what it is about, summarising a call, drafting a reply, extracting details from a messy document. This used to be exactly where automation stopped and a human stepped in. AI has moved that line, and this chapter is about moving it deliberately: where a thinking step earns its place, where it is hype wearing a lab coat, and the rules that keep intelligent automations honest.',
    ),
    ...section(
      'WHERE AI BELONGS',
      'Where AI belongs in a flow',
      ...p('The plain test: an AI step earns its place where the input is messy and the required output is language or a judgment call a human could check quickly. The workhorses, in rough order of how safely they pay:'),
      ...p('Classifying: reading the inbound message and deciding what it is, sales enquiry, support issue, invoice question, then routing accordingly. Low stakes, high volume, easily checked by results, and the single most reliable AI step in the trade. Extracting: pulling the structured details out of the unstructured thing, the name and job address out of the rambling email, the line items out of the photographed invoice. Summarising: the call, the thread, the document, collapsed into the two-line record that chapter-six humans actually read. Drafting: the reply, the follow-up, the briefing, prepared for the approval gate, never past it. And researching: the signature workflow\'s engine, gathering and distilling what is publicly knowable into the briefing that makes the human\'s reply land like it was written by someone paying attention, because it was, twice.'),
      ...p('Notice what all five share: the AI reads and prepares, and something else, a rule or a human, decides and acts. That division is not timidity, it is the architecture that works, and it has a name worth keeping: the AI is the intern with infinite energy and no accountability; the rules and the humans are the accountability.'),
      {
        type: 'diagram',
        id: 'btr-ch08-ai-belongs',
        caption: 'Where AI belongs in a flow. CLASSIFY, EXTRACT, SUMMARISE, DRAFT, RESEARCH. AI reads and prepares. Rules and humans decide and act.',
      },
    ),
  ),
  flow(
    ...section(
      'WHERE IT DOES NOT',
      'Where it does not belong',
      ...p('The counter-list, stated with this book\'s whole chest, because the money wasted here is spectacular and ongoing.'),
      ...p('AI is the wrong tool wherever a rule already suffices. If the form has a dropdown, you do not need a model to classify the enquiry, the customer classified it themselves; paying per-token for a decision a checkbox made is the purest form of the hype tax. It is the wrong tool for arithmetic and lookups, what is owed, what is in stock, when the booking is, where the answer exists exactly and the model can only approximate it confidently. It is the wrong tool at high stakes without a gate: anything legal, medical, financial, or promise-making that flows machine-to-customer unreviewed is not automation, it is liability with good grammar. And it is the wrong tool where a wrong answer is silent: a misclassified email surfaces quickly, an invented detail in a record poisons quietly, so AI-written data that other systems will trust gets the same skim a chapter-six approval does.'),
      ...p('The one-line discipline for every proposed AI step: what would this cost as a rule, what does the model add, and who catches it when it is wrong? No good answer to the third question, no AI step.'),
      {
        type: 'diagram',
        id: 'btr-ch08-hype-tax',
        caption: 'The hype tax. Paying per token for a decision a checkbox made. What would this cost as a rule? What does the model add? Who catches it wrong?',
      },
    ),
  ),
  flow(
    ...section(
      'AGENTS',
      'Agents, honestly',
      ...p('The word of the moment is agents, AI that does not just perform a step but plans and executes sequences of them, and the honest line for a growing business in this era is the one this series\' AI book draws at full length: the technology is real, the demonstrations are dazzling, and the composed position is to give AI the reading, the drafting and the preparing, and keep the sending, the spending and the deciding behind gates, for now. Every workflow in this book is built so that widening a gate later is a config change, not a rebuild, which means you lose nothing by being conservative and can adopt each new capability the month it stops being a demo and starts being dependable. Ambition in the architecture, patience at the gates.'),
      {
        type: 'diagram',
        id: 'btr-ch08-patience-gates',
        caption: 'Ambition in the architecture, patience at the gates. AI lane through reading, drafting, preparing, stops at gate before send, spend, decide. Widens as trust is earned, config not rebuild.',
      },
    ),
  ),
  flow(
    ...section(
      'COST',
      'The cost discipline',
      ...p('Last, the meter, because AI steps are the first components in this book that charge by the thought. Two habits keep them honest. Match the model to the job: classifying an email is a small-model task at a fraction of the cost, and running the premium reasoning model on it is hiring a barrister to sort the mail, the single most common way automation bills explode. And cap everything: a sensible ceiling on any AI step\'s daily spend, an alert when it is approached, because an AI step caught in a retry loop is the one failure mode in this book that does not just break quietly, it bills loudly, and chapter nine\'s real picture has the receipts. Cents per task is the honest price of machine thinking, and any flow trending past it is telling you a rule wants its job back.'),
      ...p('Rules for the machine work, AI for the reading and drafting, humans at the gates: that is the full stack. The last piece is seeing it whole, the workflows not as a list of clever tricks but as one connected nervous system, and walking through the signature flow that shows what the whole book builds toward. That is chapter nine.'),
      {
        type: 'diagram',
        id: 'btr-ch08-match-model',
        caption: 'Match the model to the job. Small tasks with small model, cents. Heavy tasks with larger model, still cents, more of them. A ceiling on every step.',
      },
    ),
  ),
]
