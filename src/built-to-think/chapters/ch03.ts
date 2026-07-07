import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch03Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 3,
    title: 'The anatomy of an AI task that pays',
    subtitle: 'Messy in, checkable out, real volume, cheap wrongness.',
  }),
  flow(
    ...p(
      'Somewhere in your business, right now, are a handful of tasks where AI would pay for itself every single week, and a much longer list of places where it would cost money, add risk, and solve nothing. The entire game is telling them apart before spending, and the good news is that the paying tasks share an anatomy, learnable in one chapter, applicable to every AI proposal anyone ever brings you again.',
    ),
    ...section(
      'FOUR FEATURES',
      'The shape of a task that pays',
      ...p('A task worth giving to AI has four features, and it needs all four.'),
      ...p('The input is messy. Language, documents, conversations, half-structured information, the material rules cannot grip. If the input is already clean and structured, a dropdown choice, a number in a field, a status, then a rule can act on it directly, and chapter one\'s tax applies: never pay a model to think about what a rule can simply do.'),
      ...p('The output is checkable, quickly. A draft a human can read in thirty seconds, a classification whose errors surface fast, a summary skimmed against the source. The fit dies when checking the output takes as long as doing the task, which was the inventory-camera story\'s whole autopsy: correcting the counts cost more than counting.'),
      ...p('The volume is real. The task recurs often enough that saved minutes compound into saved days. Automating with intelligence has setup and supervision costs; a task done twice a year pays neither back.'),
      ...p('And wrongness is cheap. When the AI misfires, and it will, at some percentage, forever, the failure is caught at a gate, costs a shrug, and teaches the setup something. Wrongness is expensive where errors are silent, where they compound into records other systems trust, or where a confident falsehood reaches a customer, a regulator, or a court, and expensive-wrongness tasks either get heavy human gates or stay human entirely.'),
      ...p('Messy in, checkable out, real volume, cheap wrongness. Hold a task against those four and most AI decisions make themselves.'),
      {
        type: 'diagram',
        id: 'btt-ch03-four-features',
        caption: 'Four features of a task that pays. MESSY IN, CHECKABLE OUT, REAL VOLUME, CHEAP WRONGNESS. It needs all four.',
      },
    ),
  ),
  flow(
    ...section(
      'THREE QUESTIONS',
      'The three questions',
      ...p('Before any AI spend, three questions, in order, asked out loud.'),
      ...p('Could a plain rule do this? The most valuable question in the field, and the least asked, because rules are nobody\'s sales pitch. A surprising share of AI transformation proposals dissolve under it: the enquiry-routing that a form\'s dropdown already does, the report-assembly that is really a template plus data, the reminder engine that is the automation book\'s chapter five wearing a lab coat. Rules first, always, and AI only for what remains genuinely messy.'),
      ...p('What does a wrong answer cost? Not whether it will be wrong, it will, sometimes, but what happens when it is. A misclassified email costs a redirect. An invented specification in a customer quote costs the job and maybe more. Price the failure, not the average, because the average is what the demo shows and the failure is what you will remember.'),
      ...p('Who catches it? Every AI task needs a named answer: which human, at what gate, checking what, how often. No good answer, no deployment, full stop. This is the automation book\'s human-in-the-loop doctrine, and here it carries the extra weight of chapter two\'s mechanics: a system built to sound right needs someone listening for wrong.'),
      {
        type: 'diagram',
        id: 'btt-ch03-three-questions',
        caption: 'Three questions, in order. 1: Could a rule do this? 2: What does wrong cost? 3: Who catches it? No good answer to the third, no deployment.',
      },
    ),
    ...section(
      'THE STORY',
      'The story to keep',
      ...p('The retail chain from chapter one deserves its full autopsy, because its lesson is the chapter in miniature. The task, counting stock, had structured input, shelves of discrete items, exactly what scanners and checklists grip. Its wrongness was expensive in the sneakiest way, every miscount had to be found and corrected by a person, so the checking cost swallowed the saving. It failed the fit test on two of four features before a dollar was spent, and a one-page analysis would have shown it. The lesson is not that AI fails. It is that fit was never assessed, because the technology was exciting and the clipboard was not, and exciting is not a business case.'),
      ...p('Run the anatomy on your own candidate list, chapter five supplies a well-stocked one, and the survivors will be genuinely good bets. The next question is what to buy for them, and at which of the three very different price doors. That is chapter four.'),
    ),
  ),
]
