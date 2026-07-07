import type { BtwPage } from '../types'
import { flow, opener, p, section, realPicture } from '../../built-to-work/helpers'

export const ch07Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 7,
    title: 'Keeping it safe, private and legal',
    subtitle: 'Your customers\' information and your name are in the room.',
  }),
  flow(
    ...p(
      'AI arrives in a business with your customers\' information in one hand and your name in the other, and this chapter is about protecting both. The rules are few, firm, and mostly familiar from this series, applied to the newest tool in the building, plus one piece of understanding that makes every rule make sense: why the machine invents, mechanically, and what that means for where it can be trusted.',
    ),
    ...section(
      'PRIVACY',
      'The privacy line, drawn in ink',
      ...p('The rule first, because it is the one broken most casually: customer personal information does not go into public AI tools. Names, contact details, histories, the substance of your records, pasted into a consumer chatbot, may leave your control entirely, and your obligation to protect that information, the same obligation this series has carried since its first book, does not pause because the tool is clever. Australian privacy law is tightening, individuals can now act directly over serious mishandling, and the reforms keep coming; the direction is one way.'),
      ...p('The practical hierarchy: use the AI built into your existing tools first, tier two from chapter four, because the data stays inside walls already governed by your agreements. Where working outside those walls, strip the identifying details, the follow-up template does not need the client\'s real name to be drafted well. And for the connected setups of chapter nine, the credentials-and-access disciplines of our automation book apply in full, because an AI wired into your systems holds keys, and keys are governed. One habit covers most of it: before pasting, ask whose information is this, and would they be comfortable with where it is going.'),
      {
        type: 'diagram',
        id: 'btt-ch07-privacy-line',
        caption: 'The privacy line. AI inside your own tools: permitted, walled. Public AI tools: crossed, may leave your control entirely. Stripped of identifying details: permitted with care. Whose information is this?',
      },
    ),
    ...section(
      'LIABILITY',
      'Hallucination liability: the confident falsehood with your name on it',
      ...p('The second exposure is the machine\'s signature failure meeting the law\'s oldest rule: your business is responsible for what it publishes and promises, regardless of who, or what, wrote it. A drafted quote with an invented specification, a generated FAQ answer that misstates your policy, a confident claim about materials, results or compliance that the model produced and nobody checked, each is your representation the moment it ships, and misleading conduct law does not accept the machine did it as a defence.'),
      ...p('The stakes scale with the field. Anywhere regulated, health, finance, law, building, anything where advice carries duty, a fluent falsehood is not embarrassing, it is actionable, and the gate is not a review, it is a qualified human who knows the rules. Everywhere else, the everyday discipline holds: facts checked, promises verified, nothing published unread. The gates from chapter six are not workflow preferences. They are your legal perimeter.'),
    ),
  ),
  flow(
    ...realPicture({
      leadIn: 'It is worth understanding why the machine invents, mechanically, because once seen, it can never be unseen, and every trust decision in this book gets easier.',
      title: 'The real picture',
      paragraphs: [
        'A language model answers by producing, one word at a time, the most plausible continuation of everything so far. That is the entire operation. When you ask what it knows well, the most plausible continuation and the truth are usually the same thing, which is why it is so often right, and so useful. But when you ask at the edge of what it absorbed, the obscure detail, the specific figure, the thing that was never in its training, the machinery does not stop and say I do not know, because the machinery has no concept of knowing. It does what it always does: produces the most plausible continuation. And the most plausible continuation of a confident question is a confident answer, fluent, well-formed, specific, and, at that edge, invented.',
        'This is why hallucination is not a bug being fixed but a property being managed. The same mechanism that writes your excellent draft writes the occasional excellent falsehood, in the same voice, with the same fluency, and nothing in the text signals which is which, because to the machine there is no which. The signals humans use to detect uncertainty in each other, hedging, hesitation, vagueness, are exactly what the model does not naturally produce, which is what makes its errors so much more dangerous than a person\'s: a colleague misremembering usually sounds like a colleague misremembering. The model sounds like the annual report.',
        'The practical consequences fall straight out. Trust it most where you can check it fastest: summaries against sources you know, drafts about facts you supplied, classifications whose errors surface. Trust it least where it sounds best and you know least: the specific figure you did not provide, the citation you have not opened, the confident answer at the edge of anyone\'s knowledge. Supply the facts yourself and let it do the wording, the pattern behind every prompt in this series, because a model working from your inputs has nowhere to invent from. And keep the gates human, because the one thing the machinery cannot do is doubt itself, so the doubting is, permanently, your department.',
        'None of this diminishes the tool. A prediction engine of this power, honestly understood, is worth more than the magic being marketed, because you can build on what it actually is. The businesses that get hurt are the ones that believed the fluency. The ones that thrive are the ones that priced it.',
      ],
    }),
    {
      type: 'diagram',
      id: 'btt-ch07-why-invents',
      caption: 'Why the machine invents. At the edge of what it absorbed, both paths produce the same confident output shape: TRUE or INVENTED, visually identical. The doubting is, permanently, your department.',
    },
    {
      type: 'diagram',
      id: 'btt-ch07-trust-gradient',
      caption: 'Where to trust it. HIGH: summaries against sources you know, drafts from facts you supplied, classifications whose errors surface. LOW: figures you did not provide, citations you have not opened, confident answers at the edge of knowledge.',
    },
  ),
  flow(
    ...section(
      'HONESTY',
      'Honesty, and the brand cost of sounding like a machine',
      ...p('Two final lines, one legal-adjacent, one commercial. Honesty: where AI\'s involvement would matter to the person on the other end, be straightforward about it, the voice agent that announces itself, the automated help signed as automated, because discovered pretence costs more than disclosed assistance ever will, and the regulatory direction on impersonation is not subtle. And brand: AI-flavoured content, the padded paragraphs, the hype adjectives, the uncanny sameness, now reads as cheap to the very customers a premium business courts, which makes your editing pass a brand decision, not a proofread. The voice rules in your prompt library, and the human ear before publishing, are what keep the machine\'s speed from costing the business\'s sound.'),
      ...p('Safe, private, legal, and honestly yours: that is the perimeter. Inside it sits the most ambitious application in the book, AI that answers your customers directly, in chat and on the phone, and it deserves its own chapter, because its success is decided somewhere unexpected. Chapter eight.'),
    ),
  ),
]
