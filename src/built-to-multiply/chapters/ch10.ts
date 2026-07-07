import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch10Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 10,
    title: 'Growing it, and training the team to run it',
    subtitle: 'The human layer that decides whether the system produces or quietly dies.',
  }),
  flow(
    ...p(
      'A content system, like everything in this series, is only as good as the people running it, and this chapter is about the human layer that decides whether the system from the previous nine chapters actually produces or quietly dies. It is the team-training chapter, and it carries real weight here, because content is the area where an untrained team wastes the most money fastest: a business that hands the tools to people with no system, no rules, and no training gets the flood, at speed, in its own name. This chapter is how to grow the system by growing the people who run it, and how to scale it without breaking it.',
    ),
    ...section(
      'TRAINED PEOPLE',
      'The system fails without trained people',
      ...p('Start with the plain truth. Everything this book has built, the strategy, the source, the toolkit, the production line, the measurement, the wiring, is a system, and a system has to be run by people who understand it, or it produces exactly the flood it was designed to prevent. Hand a powerful set of content tools to someone with no training and no rules, and they will make a hundred inconsistent, off-brand, unmeasured pieces, because the tools make that easy and nothing is stopping them. The tools do not contain the judgment. The people do, and only if they are trained.'),
      ...p('This is why the businesses that win with content are not the ones with the best tools, everyone has the same tools, they are the ones whose people know how to use them inside a system. Training is not the soft add-on at the end. It is the thing that turns a shelf of powerful tools from a liability into an asset, and it is exactly the discipline this series treats as a capstone.'),
      {
        type: 'diagram',
        id: 'btm-ch10-tools-without-training',
        caption: 'Tools without training. LEFT (crossed): powerful tools handed to an untrained person, producing a fast flood of inconsistent off-brand pieces. RIGHT: the same tools inside a trained team running a system. Training turns a liability into an asset.',
      },
    ),
    ...section(
      'WHAT TEAM NEEDS',
      'What the team actually needs to know',
      ...p('Training a team to run a content system is concrete, not vague, and it comes down to a handful of things written down and taught, which is the beginning of the documented system our training book builds in full.'),
      ...p('They need the simple procedures: how the source becomes the many, how a piece goes from idea to scheduled, step by step, so anyone can run the line, not just the person who invented it. They need to know which tool for which job, because a team drowning in tools wastes time and makes mistakes, and knowing that this tool drafts, that one designs, this one schedules, this one captures, removes the confusion. They need to know which tool and which model for which kind of asset, plainly, which AI to use for writing, which for images, which for video, and, at the level of real detail, which model produces the look you want, because content quality now depends on these choices and an untrained person picks randomly. They need the prompt library, the shared, kept collection of the briefings that work, so that the newest team member briefs the tools as well as the founder does, which our AI book builds and which matters enormously here. And they need the brand rules, the colours, fonts, voice, and standards from chapter four and seven, written down and applied by everyone, so that volume never costs consistency and nothing goes out looking cheap.'),
      ...p('Then they need to know who approves and who publishes, because the gate from chapter six only works if it is someone\'s clear job, and content with no named approver is content that goes out unchecked.'),
      {
        type: 'diagram',
        id: 'btm-ch10-team-written-down',
        caption: 'What the team needs written down. THE PROCEDURES, WHICH TOOL FOR WHICH JOB, WHICH MODEL FOR WHICH ASSET, THE PROMPT LIBRARY, THE BRAND RULES, WHO APPROVES AND PUBLISHES. Written down and taught, so anyone can run the line.',
      },
    ),
  ),
  flow(
    ...section(
      'ONBOARDING',
      'Onboarding into the system in a day',
      ...p('The payoff of writing all that down is that a new person can be brought into the content system quickly, which is the difference between a system that depends on one irreplaceable person and one the business actually owns. When the procedures, the tool choices, the prompt library, and the brand rules exist as real, taught material, a new team member can learn to run the line in a day, not a month of sitting beside someone, because the system is written down rather than living in one person\'s head.'),
      ...p('This is the thread this series never drops: the knowledge of how the business works has to live in the business, not in individuals, and content is no exception. A content system documented well enough to onboard someone in a day is a content system the business owns. One that only works because a particular person knows all the unwritten rules is a risk wearing a marketing function, and it walks out the door the day that person does. Our training book builds the full system for this, the procedures, the formats, the training assets. For content, the principle is the same: write it down, teach it, and the system outlives anyone who runs it.'),
    ),
    ...section(
      'SCALING',
      'Scaling without breaking',
      ...p('Last, growth, and the discipline is the same as everywhere in this series: one thing well before the next thing. The temptation once the system works is to add every platform, every format, every channel at once, which is the flood instinct returning in a more ambitious costume. Resist it. Get one channel genuinely working, producing, measured, earning, before adding the next, because a business that is excellent on one platform and absent on five beats one that is thin and inconsistent across all six, and each new channel adds real work that the system has to absorb without dropping its quality.'),
      ...p('The signs you are ready for more are the good ones: the current channel is running on a rhythm without heroics, the numbers say it is genuinely working, the team can run it without the owner in the middle, and there is capacity to do the next one properly rather than thinly. Then, and only then, add a channel, and bring it up to the same standard before adding another. Grow the system the way you built it, deliberately, one proven piece at a time, with the people trained to run each new part. That is how a content system scales into something that produces more without producing worse.'),
      {
        type: 'diagram',
        id: 'btm-ch10-one-channel-next',
        caption: 'One channel, then the next. Step one: one channel running on a rhythm, measured, earning, team-run. Step two begins only once step one is solid. Excellent on one beats thin across six. Add the next only when the current one runs without heroics.',
      },
      ...p('With the system built and the team trained to run it, the next chapter is the toolkit of prompts that makes the daily work fast, and then the plain-words close.'),
    ),
  ),
]
