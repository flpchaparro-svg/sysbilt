import type { BtwPage } from '../types'
import { flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch08Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 8,
    title: 'Knowing what works',
    subtitle: 'The few numbers that matter, matched to the job you set in chapter two.',
  }),
  flow(
    ...p(
      'A content system that is not measured is a flood with better production values, because without knowing what worked you repeat your misses forever and never find your hits. This chapter is how you learn: the few numbers that actually matter, matched to the job you set in chapter two, the honest way to test the variations chapter three demanded, using AI to see what is working beyond your own account, and the monthly loop that turns all of it into a system that improves. And it is where we deal plainly with the numbers that flatter and pay nothing.',
    ),
    ...section(
      'NUMBERS',
      'The numbers that match the job',
      ...p('The single most important idea in measuring content is that the right number depends on the job, and businesses go wrong by watching one set of numbers for everything. Chapter two set three jobs, and each is measured differently.'),
      ...p('For awareness, whose job is reach and interest, the numbers that matter are how many people the content reached, and, more honestly, how well it held them, because the platforms now reward content watched to the end and saved, over content merely glanced at, so completion and saves tell you more than raw views. A piece seen by many and held by few did the job badly; a piece that held its smaller audience did it well.'),
      ...p('For consideration, whose job is trust, the numbers are the deeper signals: saves, shares, meaningful comments, the time spent, the follows that come from someone deciding you are worth hearing more from. These say the content built belief, which is what that job needed.'),
      ...p('For lead capture, whose job is action, only one kind of number matters: clicks, captures, enquiries, the people who took the step. A lead-capture piece with huge reach and no captures failed at its actual job, however good it looked.'),
      ...p('Match the number to the job, and measurement tells you the truth. Watch the same number for everything, and it lies to you constantly.'),
      {
        type: 'diagram',
        id: 'btm-ch08-number-matches-job',
        caption: 'The number matches the job. AWARENESS: reach and how well it held. CONSIDERATION: trust signals, saves, shares, meaningful comments. LEAD CAPTURE: action only, clicks, captures, enquiries. Match the number to the job, or it lies to you constantly.',
      },
    ),
    ...section(
      'VARIATIONS',
      'Testing variations properly',
      ...p('Chapter three made variations the unit of content, and this is how you read them. When you put out several versions of an idea, the point is to see which one the audience responds to, and then to make more like the winner, that is the whole loop. Done properly, it is genuine learning: a real pattern, watched over enough pieces to mean something, that tells you which hooks, which formats, which angles work for your audience, so your content gets better on purpose over time.'),
      ...p('Done improperly, it is superstition: reading too much into a single post that happened to do well or badly, changing everything based on one result, chasing noise. The discipline is patience, look for patterns across many pieces, not verdicts from one, because any single post can succeed or fail for reasons that have nothing to do with its quality. The system that tests variations and reads the patterns honestly gets smarter every month. The one that overreacts to every individual result just thrashes.'),
      {
        type: 'diagram',
        id: 'btm-ch08-patterns-not-verdicts',
        caption: 'Patterns, not verdicts. LEFT (crossed): reacting wildly to one post, superstition, chasing noise. RIGHT: a pattern read across many pieces over time, genuine learning, gets smarter every month.',
      },
    ),
  ),
  flow(
    ...section(
      'RESEARCH',
      'AI as the researcher',
      ...p('Beyond your own numbers, AI gives you a way to see what is working more broadly, and this is where the one honest touch of the paid world enters, as intelligence, not as a campaign. You can use AI to scan what kinds of content, hooks, and formats are working in your niche, what your competitors and others in your space are doing that lands, and, yes, what is working in paid content in your field, not so you can run ads, but because paid creative is a live, expensive experiment in what messages and formats work, and reading it is free market research. What it does for you is widen your view beyond your own account, so you are learning from the whole field rather than only from your own trial and error. When it earns its place: as periodic research that informs what you make, not as a daily obsession. The point is to feed your system better ideas, tested by others at their expense, and then make them yours.'),
    ),
    ...section(
      'MONTHLY LOOP',
      'The monthly loop',
      ...p('All of this becomes a system through one simple rhythm: once a month, look at what you made, read the numbers that match each job, find the patterns, and decide what next month makes more of and less of. What worked, do more of. What did not, stop. What the research surfaced, try. That is the loop, and it is the entire difference between a content system that compounds and a flood that repeats. It takes an hour, it needs no fancy tools, the platforms\' own numbers are enough to start, and it is the habit that most businesses skip and most successful content systems never do. Measure against the job, read patterns not noise, learn from the wider field, and adjust every month.'),
    ),
    ...realPicture({
      leadIn: 'It is worth naming the trap that catches more content efforts than any other, because it feels like success while it delivers nothing: the vanity metric.',
      title: 'The real picture',
      paragraphs: [
        'A vanity metric is a number that goes up, feels good, and changes nothing about the business. Follower count is the classic, a big number that flatters and, on its own, pays no wages, because followers who never see your content, never engage, and never act are a trophy, not an asset, and the shift this book opened with made this worse, because reach no longer even tracks follower count, so a large following can sit there watching almost none of what you post. Likes are the next, the easiest number to get and the weakest signal there is, now ranked by the platforms themselves below saves, shares, and completion, precisely because a like is a reflex and a save is a decision. Raw view counts flatter similarly, a video seen by thousands and held by none did nothing.',
        'The reason vanity metrics are dangerous is not that they are meaningless, it is that they feel meaningful, so a business chases them, optimises for them, and feels successful while the thing that pays, attention turned into business, does not move. A business can grow its followers and its likes for a year and win no more work, and the numbers will tell it everything is going well right up until it notices the bank does not agree.',
        'The honest alternative is to watch, for each job, the one or two numbers that connect to the business, and to be ruthless about ignoring the rest however good they feel. Did the awareness content actually hold people and get saved. Did the consideration content actually build the trust that shows up as deeper engagement and follows that lead somewhere. Did the lead-capture content actually produce clicks, captures, enquiries. Those numbers are harder to grow and they are the only ones that matter, and a smaller account winning real business beats a large one collecting applause every single time. Measure what pays, not what flatters, and the whole system stays pointed at the one job from chapter one: attention turned into something you own.',
      ],
    }),
    {
      type: 'diagram',
      id: 'btm-ch08-vanity-or-pays',
      caption: 'Vanity, or what pays. VANITY: follower count, likes, raw views, goes up, feels good, changes nothing. WHAT PAYS: held attention and saves, trust signals that lead somewhere, clicks and captures and enquiries. A smaller account winning real business beats a large one collecting applause.',
    },
    ...p('Measured this way, the content system stops guessing and starts learning, which is what makes it a system rather than a habit. The next chapter connects it to everything else, the wiring that turns a piece of content into a lead in your business, where content stops being marketing and becomes the top of the machine.'),
  ),
]
