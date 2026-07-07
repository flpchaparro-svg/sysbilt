import type { BtwPage } from '../types'
import { flow, opener, p, section, subsection } from '../../built-to-work/helpers'

export const ch05Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 5,
    title: 'The use-case library',
    subtitle: 'What AI is genuinely good at, and what rules do better.',
  }),
  flow(
    ...p(
      'This is the chapter to raid: what AI is genuinely good at in a business, entry by entry, each held to chapter three\'s anatomy, with the failure modes stated and the human gate marked. And running beside it, the column no vendor includes: the things sold as AI that a plain rule does better, cheaper, and without inventing anything. Take what fits, and keep the second column handy for the next sales call.',
    ),
    {
      type: 'diagram',
      id: 'btt-ch05-library-map',
      caption: 'The library map. Shelves: summarising, drafting, classifying, extracting, researching, answering, plus flagged images and code. Beside them, a crossed bin: sold as AI, done by a rule.',
    },
    ...subsection(
      'SUMMARISING',
      'Summarising: the easiest win in business AI',
      ...p('The call, the meeting, the long thread, the fifty-page document, collapsed into the two-line record and the action list. This is the single most reliable, lowest-risk, fastest-paying use in the field: the input is exactly the messy language AI grips best, the output checks in a ten-second skim against a source you were present for, the volume is every meeting you ever have, and the wrongness is cheap because the skim catches it. The AI note-taker alone, meetings transcribed and summarised into your records, has quietly ended the era of the unlogged conversation, and if a business adopts exactly one thing from this book, this is it. Gate: the ten-second skim before a summary becomes the record, because a misheard number lives forever in a system everyone trusts.'),
    ),
    ...subsection(
      'DRAFTING',
      'Drafting: the end of the blank page',
      ...p('The proposal first pass, the follow-up email, the article from your voice note, the awkward message you have been putting off. AI drafts fast and tirelessly, in your voice once briefed properly, and the arithmetic is the book\'s best: minutes of editing bought for cents, on work that used to cost the blank-page hour. The failure mode is blandness and invention, generic filler where your knowledge should be, plausible details you never supplied, which is why the gate is absolute and doubled: every fact checked, every draft edited until it sounds like you, nothing sent unread. Drafts, never sends, the doctrine of this whole series.'),
    ),
    ...subsection(
      'CLASSIFYING',
      'Classifying and routing: the quiet workhorse',
      ...p('Reading the inbound thing, the email, the enquiry, the review, and deciding what it is, so the right rule or person gets it with context attached. Low glamour, high volume, and the most dependable AI step in the connected setups of chapter nine: sales enquiry here, support issue there, invoice query to accounts, angry review flagged to a human now. Errors surface fast, the misrouted message announces itself, which makes the wrongness cheap. Gate: light, results-checked, because the volume is the point.'),
    ),
  ),
  flow(
    ...subsection(
      'EXTRACTING',
      'Extracting: the un-typist',
      ...p('Pulling structure out of mess: the name, address and job details from the rambling email, the line items from the photographed invoice, the dates from the contract. This is the ferrying tax from our automation book, abolished, the human retyping what a machine already held. Failure mode: the confident misread, the eight that became a three, so anything extracted into records that money or promises ride on gets the skim. Everything else flows.'),
    ),
    ...subsection(
      'RESEARCHING',
      'Researching: the briefing engine',
      ...p('The prepared mind, on demand: who is this business that just enquired, what is publicly worth knowing before the call, what does the market look like for this idea. AI reads fast and distils well, and the output is a briefing a human verifies in the act of using it. This is the thinking half of the signature workflow from our automation book, the enquiry that arrives with its homework done, and its gate is built into its nature: briefings inform decisions, they never make them.'),
    ),
    ...subsection(
      'ANSWERING',
      'Answering: your knowledge, on duty',
      ...p('The chat on your website answering the routine at any hour, and the internal version, the team asking your knowledge base instead of asking you: what do we charge for this, what is the process for that, where is the template. Genuinely transformative when, and only when, the knowledge behind it is real, current and complete, which is the truth so decisive it owns chapter eight. Until then, one line: the answering is easy, the knowledge is the work.'),
    ),
    ...subsection(
      'THE PHONE',
      'The phone',
      ...p('The voice agent, AI that answers the call itself, is the frontier of answering, and it earns a chapter of its own, because done right it is after-hours coverage and never-missed enquiries, and done wrong it is your brand on the line, literally. Chapter eight, in full.'),
    ),
  ),
  flow(
    ...subsection(
      'IMAGES',
      'Images: the honest split',
      ...p('Image generation has crossed into genuinely useful, and the line down its middle must be drawn in ink. Safe and valuable: concepts, internal documents, illustrations, mood boards, the visual scaffolding of thinking and planning. Dangerous: anything presenting as real, your products, your people, your finished work, because customers can increasingly tell, regulators increasingly care, and one discovered fake costs more trust than a thousand real photos earned. For a premium business, the rule is simple: AI imagery may support the brand, never impersonate the evidence. Your gallery is testimony, and testimony is not generated.'),
      {
        type: 'diagram',
        id: 'btt-ch05-images-line',
        caption: 'The images line. LEFT (safe): concepts, internal documents, illustration, mood boards, supports the brand. RIGHT (crossed): your products, your people, your finished work presented as real. Your gallery is testimony. Testimony is not generated.',
      },
    ),
    ...subsection(
      'CODE',
      'Code and websites: the danger dressed as a miracle',
      ...p('AI now writes working code and assembles working websites from a description, and the demonstrations are genuinely astonishing, which is exactly the problem. What the demo produces looks finished, and what is underneath is unowned: unaudited for security, unmaintained by anyone accountable, unexplainable to whoever inherits it. For internal spreadsheets-with-buttons and prototypes, wonderful. For the systems your revenue, your customer data and your reputation stand on, the question is never can AI build it, it is who answers for it at two in the morning in the eleventh month, and the answer must be a name, not a model. Our website book calls this building properly; AI has made building improperly faster, which makes the discipline more valuable, not less.'),
      {
        type: 'diagram',
        id: 'btt-ch05-who-answers-2am',
        caption: 'Who answers at 2am? A gleaming AI-built website above the waterline; below, question marks over security, maintenance, accountability. The answer must be a name, not a model.',
      },
    ),
    ...subsection(
      'OTHER COLUMN',
      'The other column: sold as AI, done by a rule',
      ...p('Keep this list beside the library, because every entry on it has crossed a sales desk recently. Enquiry routing where the form already has a dropdown: the customer classified themselves, the rule routes, no model required. Report assembly that is a template plus your data: automation, not intelligence. Reminder and follow-up engines: the automation book\'s chapter five, wearing a lab coat and a markup. Stock counting, appointment scheduling, invoice chasing: rules, rules, rules, each cheaper, faster and incapable of hallucinating. The tell is always the same: if the input is already structured, the intelligence is already done, and what remains is plumbing. Pay plumbing prices.'),
      {
        type: 'diagram',
        id: 'btt-ch05-other-column',
        caption: 'The other column. THE PITCH: AI enquiry routing, AI report engine, AI follow-up system. THE TRUTH: the form\'s dropdown, a template plus your data, the automation book\'s chapter five. If the input is already structured, pay plumbing prices.',
      },
      ...p('The library is stocked. What turns it from a list into a return is the daily craft of using it, the briefing, the checking, the measuring, and that is chapter six.'),
    ),
  ),
]
