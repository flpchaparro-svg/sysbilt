import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch02Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 2,
    title: 'Strategy before assets',
    subtitle: 'Deciding what to make, for whom, and why, before a single asset exists.',
  }),
  flow(
    ...p(
      'Chapter one ended on the question the flood never asks: what is this content actually for? This chapter is the answer, and it is the most important one in the book, because it is the chapter that stops the waste. Making content is now the easy part. Deciding what to make, for whom, and why, before a single asset exists, is the part that separates a system that earns from a flood that spins. Strategy is not the slow bit you skip to get to the fun bit. Strategy is the reason the fun bit pays.',
    ),
    ...section(
      'WHO',
      'Who you are actually talking to',
      ...p('Content aimed at everyone lands on no one, so the first decision is who. Not a demographic, a person: the specific kind of business owner you want as a client, with a specific problem you solve, at a specific moment in their thinking.'),
      ...p('A useful way to hold this is by the stage the person is at with you, because it changes everything about what you should make. Someone who has never heard of you needs something different from someone weighing you up, who needs something different again from someone almost ready to enquire. The mistake is making one kind of content and wondering why it does not work for everyone, when it was only ever going to work for one stage. Decide, before you make anything, which person at which stage this piece is for, and the piece almost designs itself. Skip that decision, and you get the flood: content that is technically fine and speaks to nobody in particular.'),
    ),
    ...section(
      'THREE JOBS',
      'The three jobs content does',
      ...p('Content does one of three jobs, and knowing which job a piece is for is the difference between spending well and spending blind.'),
      ...p('Awareness is the top: getting in front of people who do not yet know you exist, earning the first bit of attention, being discovered. The job here is reach and interest, and the content is broad, useful, and made to travel.'),
      ...p('Consideration is the middle: helping the people who now know you decide whether you are any good. The job here is trust, and the content is deeper, the useful answer, the real example, the proof that you know your craft.'),
      ...p('Lead capture is the bottom: turning warm interest into a name, an enquiry, a booking. The job here is action, and the content makes an offer and asks for a step.'),
      ...p('The reason this matters is money and effort. The three jobs deserve different amounts of investment and different kinds of asset, and businesses waste fortunes by ignoring the difference, pouring production budget into an awareness piece that only needed to be quick, or firing off a cheap post where a considered, trust-building piece was needed. Match the asset to the job, and every dollar and every hour lands where it works. Ignore the jobs, and you spend evenly across content that needed spending unevenly.'),
      {
        type: 'diagram',
        id: 'btm-ch02-three-jobs',
        caption: 'The three jobs. AWARENESS: get discovered, measured by reach and how well it holds. CONSIDERATION: build trust. LEAD CAPTURE: turn interest into action. Match the asset to the job.',
      },
    ),
  ),
  flow(
    ...section(
      'INVESTMENT',
      'Investment follows the job, not the impulse',
      ...p('Here is the practical version of that, and it is where the "should I make ten polished videos" question finally gets an honest answer. It depends entirely on the job.'),
      ...p('Take awareness, which is where a lot of businesses are, and where this book\'s own approach is plain. When the job is to get discovered and learn what lands, the smart spend is not one expensive, polished production. It is many cheap, varied, simple pieces, made fast, put out, and watched, because at the awareness stage you do not yet know what will work, and the only way to find out is to try a lot cheaply and read the results. A single polished video is a single expensive guess. A dozen quick variations is an experiment that tells you where to spend next. So at awareness, cheap and plentiful beats polished and singular, not because polish is bad, but because you have not yet earned the right to know what to polish.'),
      ...p('Now consideration and lead capture flip it. When the job is to build trust with someone weighing you up, or to convert someone ready to act, quality carries weight, and a considered, well-made piece is worth the investment, because now you are asking someone to believe you or to act, and cheap can undercut both. So the honest rule on "is it worth making ten expensive videos of one product": if the job is awareness, probably not, make many cheap ones and learn; if the job is converting people who are already interested, maybe, because there the quality is doing real work. The investment follows the job. It never follows the impulse to make the impressive thing because the tools now make impressive things easy.'),
      {
        type: 'diagram',
        id: 'btm-ch02-investment-job',
        caption: 'Investment follows the job. AWARENESS: many small cheap pieces to learn what lands. CONVERSION: one considered piece when you ask someone to believe or act. Never the impulse to make the impressive thing.',
      },
    ),
    ...section(
      'CHANNELS',
      'A few channels, done properly',
      ...p('The last strategic decision is where, and the discipline is the same as everywhere in this series: fewer, done well, beats everywhere, done thinly. Every platform is a different room with a different audience and a different way of behaving, and being genuinely good in two rooms beats being forgettable in six.'),
      ...p('Choose the channels where the person from earlier in this chapter actually spends time, and where your kind of content actually fits, and commit to those. Spreading one business across every platform, posting the same thing everywhere, thin and constant, is the flood wearing a wider coat. It feels like being everywhere and it reads as being nowhere in particular. Pick the rooms that matter for your business and your person, be properly present in them, and leave the others until you have earned the capacity to do them right too.'),
      ...p('That is the strategy: who, which job, how much to invest, and where. Decided before a single asset is made, it turns the cheap, easy making of content from a flood into a system pointed somewhere. With the why settled, the next chapter is the what: the anatomy of a single piece that actually works.'),
      {
        type: 'diagram',
        id: 'btm-ch02-few-rooms',
        caption: 'A few rooms, done properly. LEFT: six rooms, thin, forgettable. RIGHT: two rooms, fully present where your person actually is. Genuinely good in two beats forgettable in six.',
      },
    ),
  ),
]
