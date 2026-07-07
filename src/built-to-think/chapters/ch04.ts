import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch04Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 4,
    title: 'Choosing the right tool, at the right tier',
    subtitle: 'Three doors, wildly different prices, one buying method.',
  }),
  flow(
    ...p(
      'AI is sold at three doors, at wildly different prices, and most businesses walk through the expensive one for jobs the cheap one does perfectly. This chapter is the buying method: the three tiers, when each earns its place, which models to reach for, and the cost arithmetic in honest terms, cents against salaries, so that every AI purchase from here on is sized before it is signed.',
    ),
    {
      type: 'diagram',
      id: 'btt-ch04-three-doors',
      caption: 'Three doors. DOOR 1: the chat subscription, a person and a window, most of the value for many businesses. DOOR 2: AI inside your tools, context built in, data stays home. DOOR 3: the API, powerful, metered, earned. Most businesses walk through the expensive door for jobs the cheap one does.',
    },
    ...section(
      'TIER ONE',
      'Tier one: the chat subscription',
      ...p('The first door is the one you already know: a subscription to one of the major AI assistants, ChatGPT, Claude, Gemini, used through a chat window by a person. Modest monthly cost per seat, no setup, and, this is the part the industry undersells because there is no project fee in it, for a great many businesses this tier is most of the value. The drafting, the summarising, the thinking-out-loud, the research briefs, the polish on a proposal: a capable person with a chat subscription and the briefing skills of chapter six captures an enormous share of what AI offers a business your size.'),
      ...p('The honest guidance: start here, stay here longer than the vendors would like, and let the next tiers be pulled into existence by real volume, never pushed by enthusiasm. A business that has not exhausted tier one has no business paying for tier three.'),
    ),
    ...section(
      'TIER TWO',
      'Tier two: the AI already inside your tools',
      ...p('The second door is quieter: the AI features arriving inside the systems you already run. Your CRM drafting the follow-up from the deal\'s own context. The meeting note-taker summarising into the record. The accounting software reading the receipt. The e-commerce platform writing the first-pass product description.'),
      ...p('Its strengths are exactly what tier one lacks: the context is already there, the data never leaves the walls, which matters enormously for chapter seven\'s privacy line, and there is nothing to build. Its weakness is that quality varies by vendor and you take what you are given. The guidance: switch these on where they exist, judge them by chapter three\'s fit test like anything else, and let them eat the tasks they are genuinely good at before considering anything custom. A surprising amount of connected AI arrives this way, free with the subscription you already pay.'),
    ),
  ),
  flow(
    ...section(
      'TIER THREE',
      'Tier three: the API, AI inside your automations',
      ...p('The third door is the powerful one: AI called directly inside your own workflows, the thinking steps from our automation book, the classifying, extracting, researching and drafting wired into the nervous system, billed by the token, running without a human at the keyboard. This is where the signature workflows live, the enquiry that researches itself, the inbox that sorts itself, and it is genuinely transformative at the right volume.'),
      ...p('It is also the only tier where the meter runs unattended, which makes it the only tier that produces surprises, and the guidance is correspondingly firm: tier three is earned, not started with. It earns its place when a specific task passes chapter three\'s anatomy, has proven itself manually at tier one, and now recurs at a volume where wiring it pays. Built that way, with the caps and gates the automation book demands, it is cents per task doing an employee-hour\'s preparation. Built speculatively, it is how the five-figure invoice stories begin.'),
    ),
    ...section(
      'SIZING',
      'Which model, sized to the job',
      ...p('Across all three tiers, the same sizing rule from chapter two, now as buying method. The frontier names, ChatGPT, Claude, Gemini, are all excellent, and the differences that matter to a business are workflow fit and trust, not benchmark decimals; pick per job, not per fashion, and feel free to use different ones for different jobs. Within each family, sizes: small, fast, cheap models that handle the classifying, extracting and routing, the mail room, and large models for the work where quality is the product, the client-facing draft, the judgment-adjacent summary, the research brief. Reasoning models, the premium tier, are for genuinely hard problems, and a business your size meets fewer of those per week than the pricing pages hope.'),
      ...p('The default that saves the most money in this book: the smallest model that does the job well, promoted only when its output demonstrably is not good enough. Demotion never happens by itself; someone has to ask, which is chapter six\'s measuring habit wearing its accountant\'s hat.'),
      {
        type: 'diagram',
        id: 'btt-ch04-sized-to-job',
        caption: 'Sized to the job. Small tasks to small model, cents. Quality-is-the-product tasks to large model. Genuinely hard problems to reasoning model, premium and rare. Default: smallest model that does the job well.',
      },
    ),
  ),
  flow(
    ...section(
      'ARITHMETIC',
      'The arithmetic, honestly',
      ...p('Close with the numbers in their plainest form, because they anchor everything. A well-designed AI task costs cents: the classified email, the drafted reply, the summarised call, each a fraction of a dollar in tokens. The human hour it prepares or replaces costs two orders of magnitude more. That gap is the entire economic case, and it is real, which is exactly why the discipline matters: the gap only exists when the task fits, the model is sized, the volume is real and the meter is watched. Skip the discipline and the same technology happily inverts the arithmetic, thinking expensively about nothing, at scale, all night.'),
      ...p('Cents per task, for tasks that pass the anatomy, at the cheapest tier that does the job. That is the whole buying method. Now for the menu it applies to: the use-case library, the honest one, with the hype column included. Chapter five.'),
      {
        type: 'diagram',
        id: 'btt-ch04-arithmetic',
        caption: 'The arithmetic. LEFT: a well-designed AI task, cents. RIGHT: the human hour it prepares or replaces, orders of magnitude heavier. Skip the discipline and the technology happily inverts it, all night.',
      },
    ),
  ),
]
