import type { BtwPage } from '../types'
import { flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch06Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 6,
    title: 'The production line, day to day',
    subtitle: 'Fast batched making, on a calendar, through a human gate.',
  }),
  flow(
    ...p(
      'A content system that works is a content system that runs on a rhythm, not on inspiration, because inspiration is unreliable and a business needs content whether or not anyone felt creative this week. This chapter is the line: how the source becomes the many, in batches, on a schedule, with a gate before anything goes out, and an honest look at what the whole thing actually costs, because the making got cheap and the rest did not.',
    ),
    ...section(
      'FIVE MINUTES',
      'The five-minute idea, and the honest version of it',
      ...p('Here is how fast the making can now be, told plainly. Take one idea for a carousel. You brief the writing tool with the point you want to make and the angle, clearly, in a sentence or two. You take what it gives back and shape it. You brief the image or design tool with one clean instruction for the look. You drop the words into the template from chapter four, adjust, and it is done, a finished, on-brand carousel, in about the time it takes to make a coffee.'),
      ...p('That is real, and it is the shift this book opened with made concrete. But the honest version has a caveat that matters, because the five minutes is the making, and the making was never the whole job. The five minutes assumes the idea was already decided, which is chapter two\'s strategy done in advance. It assumes the template already exists, which is chapter four\'s library built. It assumes a person then reads what the tools produced and fixes what is wrong, which is the editing the next section insists on. The making is five minutes. The system around the making is what makes those five minutes produce something worth posting rather than something that looks made by a machine in five minutes. Keep both truths: the production is genuinely fast now, and fast production without the system around it is exactly how the flood happens.'),
      {
        type: 'diagram',
        id: 'btm-ch06-five-minutes',
        caption: 'Five minutes of making, and the system around it. At the centre: brief writer, shape, brief image tool, drop into template, done. Around it: STRATEGY DECIDED, TEMPLATE EXISTS, HUMAN EDITS. The making is five minutes. The system around it is what makes those five minutes worth posting.',
      },
    ),
    ...section(
      'BATCHING',
      'Batching and the calendar',
      ...p('The rhythm that works is batched, not daily. Instead of making one piece each day, in the moment, under pressure, you set aside time to make many at once, a week or a month of content in one focused session, drawing on the source and the library, and then you schedule them to go out over time. This is how a busy business stays consistent, which the platforms reward above almost everything, without content eating every single day.'),
      ...p('The calendar is the tool that holds it: a simple plan of what goes out where and when, filled in a session and published automatically, so that being consistent stops depending on remembering to post and starts being something the system does. Batching also makes the variations from chapter three practical, because making ten versions of an idea in one sitting is efficient, while making them one per day is torture. Make in batches, schedule the batch, and the daily scramble disappears.'),
      {
        type: 'diagram',
        id: 'btm-ch06-batch-schedule',
        caption: 'Batch, schedule, publish. LEFT (crossed): one piece each day under pressure, the daily scramble. RIGHT: one focused session making many, dropped onto a calendar, publishing automatically, consistency without living in the apps.',
      },
    ),
  ),
  flow(
    ...section(
      'THREE LEVELS',
      'The three levels of line',
      ...p('How automated your production line should be depends entirely on your business, and it is worth being honest that more automation is not automatically better, it is another place a business your size can over-build.'),
      ...p('The manual-with-AI level is a person using the AI and design tools by hand, briefing, shaping, assembling, scheduling, with the tools doing the heavy lifting but a human driving each piece. This is where most businesses should be, and where a great deal of excellent content gets made, including, plainly, much of the fast work this book describes. It is quick, it is controlled, and it needs no complex setup.'),
      ...p('The semi-automated level wires some of the repetitive steps together, the source piece automatically becoming draft posts for review, the scheduling flowing from a content calendar, the captions pre-drafted, with a person still approving and shaping. This earns its place once volume is high enough that the wiring saves real time, and its automations are the ones our automation book covers.'),
      ...p('The fully automated level, content generated, assembled, and posted with minimal human touch, is where businesses get into trouble, because it is exactly how the machine-made flood gets produced at scale, and it is where the brand risk from chapter seven becomes real. For most businesses your size, this is a step too far, and the honest guidance is the same as everywhere in this series: automate the repetitive preparation, keep a human on the judgment and the final look, and be deeply suspicious of any setup that removes the human from content entirely. The goal is a person making good content fast, not a machine making content nobody chose.'),
      {
        type: 'diagram',
        id: 'btm-ch06-three-levels',
        caption: 'The three levels of line. MANUAL-WITH-AI (gold): where most should be. SEMI-AUTOMATED: repetitive steps wired, human approves. FULLY AUTOMATED (caution): how the machine-flood happens. A person making good content fast, not a machine making content nobody chose.',
      },
    ),
    ...section(
      'THE GATE',
      'The gate',
      ...p('One rule holds the whole line together, and it is the doctrine of this entire series: nothing goes out without a human looking at it. However fast the making, however clever the tools, a person reads the piece, checks it is right, checks it sounds like you, and approves it before it publishes. This is the difference between speed and recklessness. The gate costs seconds and it protects the only thing content is for, the impression your business makes, which a single machine-flavoured or plain-wrong piece can undo in public. Fast making, human gate. That is the line.'),
    ),
    ...realPicture({
      leadIn: 'It is worth being honest about what "free content" actually costs, because the phrase is doing a lot of quiet damage, and the businesses that believe it are the ones that end up with the flood.',
      title: 'The real picture',
      paragraphs: [
        'The making is nearly free now. That part is true, and it is the genuine shift. But making was only ever one cost of content, and the others did not go anywhere. There is the deciding, the strategy from chapter two, which takes real thought and is where the value actually lives, and no tool decides for you what is worth saying to whom. There is the editing, the human pass that turns the tool\'s plausible-but-generic output into something that sounds like your business and is actually true, and that pass takes a person with judgment, and skipping it is precisely what produces content that reads as cheap. There is the consistency, the brand rules and templates and library that keep a high volume looking like one business, which took work to build and takes attention to maintain. And there is the scarcest cost of all, which no tool has made cheaper and no tool ever will: attention. The audience\'s attention is not free, it is harder to earn than ever, and flooding them with cheap content spends it rather than earns it, so the "free" content actively costs you the one thing you cannot generate.',
        'So the real economics of a content system are the opposite of what "free content" suggests. The commodity part, the raw making, got cheap. The valuable parts, the strategy, the editing, the consistency, and the earning of attention, got relatively more important, because when everyone can make content, the deciding and the quality and the judgment are the only things left that separate you. The businesses that understand this invest their freed-up time in the parts that still matter and make less, better content. The businesses that hear "free" and make a flood spend their most expensive resource, their audience\'s patience, buying nothing. Free making is an invitation to do the valuable parts better, not an excuse to skip them.',
      ],
    }),
    ...p('That is the line: fast batched making, on a calendar, at the right level of automation for your size, through a human gate, understood honestly as cheap making around costly judgment. The next chapter is the discipline that keeps all that speed from getting you into trouble, the honesty, the law, and the brand.'),
  ),
]
