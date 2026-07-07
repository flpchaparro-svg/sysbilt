import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch02Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 2,
    title: 'What AI actually is, in plain terms',
    subtitle: 'The honest model every practical rule falls out of.',
  }),
  flow(
    ...p(
      'Nobody needs the mathematics, and everybody making spending decisions needs the mental model, because the expensive mistakes in this field, trusting it too much, pointing it at the wrong work, paying premium prices for simple jobs, all grow from the same root: treating AI as something it is not. This chapter is the honest model, in plain words, and every practical rule in the rest of the book falls out of it.',
    ),
    ...section(
      'PREDICTION',
      'A prediction machine, not a knowledge machine',
      ...p('The AI this book concerns, the kind behind ChatGPT, Claude, Gemini and their peers, is a language model, and what it actually does is this: given everything so far, it predicts what words most plausibly come next. That is the whole trick, performed at staggering scale and sophistication. It was not programmed with facts and rules the way software is built; it was trained, shown a vast portion of everything humans have written until the patterns of language, and the knowledge embedded in language, soaked in.'),
      ...p('Two enormous consequences follow, and they explain almost everything about working with it. First, the good one: because it learned from how people actually write and reason, it is remarkably capable with exactly the messy, human material that rules-based software could never touch, the rambling email, the half-formed brief, the document that needs summarising. Second, the dangerous one: because it produces the most plausible next words rather than consulting a store of verified facts, it can be wrong in a very particular way. Not wrong like a crashed program, wrong like a confident colleague misremembering, fluently, plausibly, with no signal that anything is amiss. The trade calls it hallucination. The practical translation: the machine is built to sound right, being right is a frequent side effect, and the gap between those two sentences is where every human check in this book comes from.'),
      {
        type: 'diagram',
        id: 'btt-ch02-prediction-machine',
        caption: 'A prediction machine. Given everything so far, it outputs the most plausible next words. Brilliant with messy human language; wrong like a confident colleague, fluently, with no signal. Built to sound right. Being right is a frequent side effect.',
      },
    ),
  ),
  flow(
    ...section(
      'MECHANICS',
      'No memory, a window, and a meter',
      ...p('Three more mechanics, each one a spending decision in disguise.'),
      ...p('It has no memory. Each conversation starts blank; the model retains nothing of you between sessions unless the product around it deliberately saves and re-supplies it. The practical meaning: context must be given, every time, which is why chapter six treats prompting as briefing and why the connected setups in chapter nine exist, to hand the model your business\'s context automatically instead of by hand.'),
      ...p('It has a window. The model can only consider so much at once, its context window, and everything you want it to weigh, the instructions, the background, the document, must fit through it. Bigger windows cost more, and stuffing them with everything just in case is a quiet money leak.'),
      ...p('And it has a meter. AI is priced by the token, roughly by the word, in and out, which makes it the first tool in your business that charges by the thought. Cents per task is the honest going rate for well-designed work. The meter only becomes dangerous when nobody knows it is running, which is how chapter nine\'s five-figure surprises happen.'),
      {
        type: 'diagram',
        id: 'btt-ch02-memory-window-meter',
        caption: 'No memory: context must be supplied every time. The window: everything it weighs must fit. The meter: priced by the token, roughly the word. Three mechanics, three spending decisions in disguise.',
      },
    ),
  ),
  flow(
    ...section(
      'TIERS',
      'Standard and reasoning, and the barrister sorting the mail',
      ...p('One distinction now matters commercially. Standard models answer in one pass, fast and cheap, and handle the great majority of business tasks, the drafting, the summarising, the classifying. Reasoning models think before answering, working through steps internally, brilliant for genuinely hard problems, and they charge for every step of the thinking, at multiples of the standard price and the standard wait.'),
      ...p('The waste pattern writes itself: businesses running premium reasoning models on routine tasks, the barrister hired to sort the mail, because nobody told them the mail room existed. The rule, which chapter four turns into a buying method: match the model to the job, and default to the smallest model that does the job well. Most of your business\'s AI work is mail, and the mail room is excellent now.'),
      {
        type: 'diagram',
        id: 'btt-ch02-barrister-mail',
        caption: 'The barrister sorting the mail. LEFT (crossed): reasoning model on routine tasks, multiples of the price, all of the wait. RIGHT: standard model, fast, cheap, most of your work is mail. Match the model to the job. Default small.',
      },
    ),
    ...section(
      'OWNERSHIP',
      'What you own',
      ...p('The ownership doctrine of this series, applied to its newest asset class. Your prompts are yours: the carefully refined briefing that produces exactly the right proposal draft is business logic, chapter six makes it a shared library, and it walks with you between tools. Your workflows are yours, on the terms the automation book set. And your data is yours, which cuts two ways: the knowledge you feed AI systems remains your asset and should live where you control it, and, the sharper edge, what you paste into public AI tools may leave your control entirely, which for customer information is not a preference but a legal obligation, and chapter seven draws that line in full.'),
      ...p('That is the machine: a prediction engine of genuine power, no memory, a window, a running meter, tiers of capability, and a signature failure mode of confident plausibility. Nothing in that description is frightening, and nothing in it is magic, which is exactly the posture the next chapter needs, because deciding where this machine pays is a fit test, and fit tests require seeing the thing plainly. That is chapter three.'),
    ),
  ),
]
