import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch11Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 11,
    title: 'Using AI to run the CRM faster',
    subtitle: 'AI drafts. You verify. Nothing ships unreviewed.',
  }),

  flow(
    ...p(
      'A CRM runs on words: the follow-up emails, the call notes, the proposals, the re-engagement messages, the meeting preparation. The words used to be the tax, the reason logging got skipped and follow-ups got delayed. AI has changed the price of them. Used properly, it turns the two-line note into a full record, the blank follow-up into a strong draft, and the pre-meeting scramble into a one-minute brief, while you stay firmly in charge of what gets sent, because in a CRM the words go to real clients under your name, and that raises the stakes on getting the method right.',
    ),
  ),

  flow(
    ...section(
      'THE METHOD',
      'The method, and the two hard rules',
      ...p(
        'Same discipline as everywhere in this series: AI drafts, you edit, nothing ships unreviewed. Feed it specifics, the deal\'s actual context, the client\'s actual words, and it returns something worth editing; feed it nothing and it returns confident fluff.',
        'Two rules carry extra weight here. First, nothing sends itself. A follow-up drafted by AI and fired without human eyes is your reputation on autopilot, and one hallucinated detail, a price misremembered, a promise invented, costs more than all the minutes saved. The machine prepares; a person approves. Second, and this one is legal as much as sensible: client personal details do not get pasted into public AI tools. Names, contacts, histories, the substance of your CRM, are personal information you are obliged to protect, and a public chatbot is not a protected place. Use the AI features built into your CRM, which keep the data inside the walls, or strip identifying details before drafting outside, the follow-up template does not need the client\'s real name to be written well. This rule is not optional courtesy. It is the privacy obligation this series keeps returning to, applied to the newest tool in the shed.',
      ),
      {
        type: 'diagram',
        id: 'btc-ch11-division-labour',
        caption:
          'The division of labour. A three-node loop: AI "drafts from real context" → YOU "review, edit, approve" → CLIENT "receives words with your name on them". One deliberately missing arrow, AI direct to client, crossed and labelled "nothing sends itself". Side vault icon: "client details stay inside protected tools".',
      },
    ),
  ),

  flow(
    ...section(
      'NOTE-TAKERS',
      'AI note-takers, and the self-writing record',
      ...p(
        'The single best AI gift to CRM discipline is the end of typing. Call recording with AI summaries, meeting note-takers, voice-to-note on the mobile app: the conversation happens, and a clean summary with action items lands on the record, turning chapter six\'s log-as-you-go from a discipline into a default. Two honest caveats. Recording conversations requires consent, so the note-taker announces itself and nobody gets recorded unaware, courtesy and law agreeing again. And summaries get a ten-second human skim before they become the record, because an AI mishearing quoted twelve as quoted twenty is exactly the error that lives forever in a system everyone trusts.',
      ),
      {
        type: 'diagram',
        id: 'btc-ch11-self-writing-record',
        caption:
          'The self-writing record. A call/meeting icon → AI summary → a ten-second human skim (gold checkpoint) → the CRM record. Two footnotes on the flow: "the note-taker announces itself" and "a misheard number lives forever, skim first".',
      },
    ),
  ),

  flow(
    ...section(
      'PROMPT PACK',
      'The CRM prompt pack',
      ...p('Copy, fill the brackets with real context, strip real names where you are working outside protected tools, and edit what returns.'),
    ),
    {
      type: 'promptCard',
      title: 'Quote follow-up',
      body: `Write a short follow-up email for a quote I sent [number] days ago for [the work, plainly]. The client's situation: [what they told you]. The likeliest doubt holding them back: [your read]. Address that doubt helpfully, offer to answer questions, and make the next step easy. Warm, professional, no pressure, no "just checking in". Australian English, plain language.`,
    },
    {
      type: 'promptCard',
      title: 'Second and third touch',
      body: `Write the [second/third] follow-up in a sequence about [the quote/work]. Earlier messages covered [what you already said]. This touch should offer something new: [a useful detail, an example, a timing note]. Shorter than the last one, warm, zero pressure. Australian English.`,
    },
  ),

  flow(
    {
      type: 'promptCard',
      title: 'The graceful close',
      body: `Write a final follow-up closing off a quote conversation that has gone quiet about [the work]. Tone: kind, honest, zero guilt. Say we will stop chasing, the door stays open, and here is how to restart when timing is right. Two or three sentences. Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'Re-engaging a cold lead',
      body: `Write a short re-engagement email to a lead who enquired about [the work] around [when] and went quiet. Lead with something useful or new: [what has changed, a relevant piece of news, a genuine question]. No guilt, no pressure, one easy next step. Australian English.`,
    },
  ),

  flow(
    {
      type: 'promptCard',
      title: 'Winning back a past client',
      body: `Write a warm check-in to a past client we worked with on [the job] around [when]. Reference the actual work naturally, ask how it has held up or how things are going, and mention [the relevant reason to reconnect] lightly. Relationship first, business second. Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'Call notes into a CRM record',
      body: `Turn these rough call notes into a clean CRM record: [paste notes or transcript]. Give me: a two-line summary, the key facts learned, any commitments made by either side, and the next step with a suggested date. Flag anything unclear rather than guessing. Plain language.`,
    },
  ),

  flow(
    {
      type: 'promptCard',
      title: 'Meeting preparation brief',
      body: `Prepare me a one-minute brief for a meeting with [name/role] about [the deal]. Their history with us: [paste the relevant record]. Give me: where things stand, what they care about based on the history, open questions to resolve, and the outcome I should aim for. Short and scannable.`,
    },
    {
      type: 'promptCard',
      title: 'Proposal cover note',
      body: `Write a short cover email for a proposal for [the work]. The client's main goal: [their goal in their words]. Point to the one or two parts of the proposal that answer it, invite questions, and propose the next step. Confident, warm, brief. Australian English.`,
    },
  ),

  flow(
    {
      type: 'promptCard',
      title: 'Review request',
      body: `Write a short message asking a happy client for a review after finishing [the job]. Reference the work naturally, make it genuinely easy [link goes here], and keep it to a few sentences with no begging. Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'Why-lost pattern read',
      body: `Here are the reasons we logged for deals lost this quarter: [paste the list]. Group them into patterns, tell me which pattern costs us most, and suggest one practical change to our process or follow-up for each major pattern. Plain language, no fluff.`,
    },
  ),

  flow(
    ...section(
      'BEFORE YOU SHIP',
      'The checks before anything sends',
      ...p(
        'Four, tuned for this book. Tone: does it sound like you across a table, or like software. Truth: every fact, price, date and promise checked against the record, because the CRM will faithfully remember whatever you send, including the errors. Relationship: does this touch give before it asks, chapter seven\'s rule applies to drafted words doubly. Privacy: no client details in public tools, consent for recordings, and nothing in writing you would not stand behind with your name on it, which it has.',
        'Pass those and AI becomes what it should be here: the assistant that killed the blank page and the typing tax, with your judgment untouched at the send button. The machine drafts. You decide. The system remembers. That is the division of labour this whole book has been building, and it is the right one.',
      ),
    ),
  ),
]
