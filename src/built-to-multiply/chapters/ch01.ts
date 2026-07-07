import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch01Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 1,
    title: 'Why content, and why most of it is wasted',
    subtitle: 'Making got cheap. The flood is not the strategy.',
  }),
  flow(
    ...section(
      'THE SHIFT',
      'The ground has shifted',
      ...p('Start here, because this book rests on it. Making content used to be the expensive, slow, specialist part of marketing, and it has just become fast, cheap, and available to anyone, which sounds like good news and is actually the whole problem.'),
      ...p('Not long ago, content was a production. A carousel meant a designer. A video meant a crew, or at least a good camera and a day you would not get back. A month of posts meant an agency, a retainer, and a calendar someone was paid to fill. The making was the bottleneck, and the businesses with the biggest budgets made the most, because the cost of production was the wall everyone else hit.'),
      ...p('That wall is gone. AI writes the first draft, generates the image, drafts the script. Design tools that once needed a trained hand now do in minutes what used to take an afternoon. Video that looked like real production is becoming something a business can make at its desk. The making, the part that used to cost the most and take the longest, has collapsed to almost nothing, and it keeps getting cheaper and easier as you read this.'),
      ...p('Here is the trap inside the good news. The platforms watched creation get cheap, and they responded by demanding more of it, and by rewarding variety, freshness, and consistency over raw volume. So at the exact moment content became easy to make, the amount of content needed to be seen went up, and the bar for what gets shown went up with it. Everyone can make content now, which means making content is no longer the edge. When everyone can do a thing, doing the thing stops setting you apart.'),
      ...p('So the businesses pulling ahead are not the ones making the most. They are the ones running a system: a reason behind what they post, one consistent voice, a way to turn one idea into many pieces without starting from scratch each time, a habit of learning what actually worked, a path that carries the attention back to something they own, and a team that can run all of it without the owner in the middle. That system is the edge now, and this book is how to build it.'),
      {
        type: 'diagram',
        id: 'btm-ch01-wall-fell',
        caption: 'The wall that fell. BEFORE: the cost of making was the wall, only big budgets climbed. NOW: making is free, so making is no longer the edge. When everyone can do a thing, doing it stops setting you apart.',
      },
    ),
  ),
  flow(
    ...section(
      'ONE JOB',
      'The one job',
      ...p('Content has one job. Earn attention, and point it at something you own.'),
      ...p('Everything else serves that. Not the follower count, not the likes, not the video that felt clever to make. The only measure that counts is whether the attention you earn turns into something that matters to the business, a visitor to your site, a name on your list, an enquiry, a client, rather than a number that flatters you and pays nothing.'),
      ...p('This is the part most businesses miss, and it is why so much content earns nothing. Attention on a social platform is not the goal. It is rented, it is fleeting, and it belongs to the platform, not to you. Content that earns attention and then does nothing with it is a fire that warms an empty room. The job is to earn the attention and then move it, to your website, your list, your enquiry form, the ground you actually own, which is the thread that ties this book to everything else this series has built. Content is the top of the machine. Everything downstream, the site, the follow-up, the memory of the business, depends on it feeding them, and none of it works if the content earns applause instead of leads.'),
      {
        type: 'diagram',
        id: 'btm-ch01-fire-empty-room',
        caption: 'The fire in the empty room. Attention on rented ground with no path home, versus attention carried to ground you own. Earn attention, and point it at something you own.',
      },
    ),
    ...section(
      'THE FLOOD',
      'A hundred videos nobody uses',
      ...p('Here is the failure this book exists to prevent, and it is the direct result of the shift we just described. When making content is nearly free, the obvious move is to make a lot of it, and a business fires up the tools and produces a hundred posts, a hundred videos, a flood of it, and almost none of it does anything.'),
      ...p('It is worth being honest about why the flood fails, because it is not laziness, it is the opposite, it is effort pointed the wrong way. Content made without a reason behind it has no job to do, so it does no job. Content made without consistency confuses the audience about who you even are. Content made without ever checking what worked repeats the same misses forever. And content made in a rush, with the tool\'s fingerprints all over it, reads as cheap, which for a business that competes on quality quietly undoes the very impression it was meant to build. The flood is not just wasted effort. On platforms that now suppress accounts posting more than their audience engages with, it can actively bury you, so the hundred rushed videos do not just fail to help, they can make the next one seen by fewer people.'),
      ...p('The lesson runs through this whole book. Volume is not the strategy. It was never the strategy, and now that volume is free, mistaking it for the strategy is the most common and most expensive error in the field. A handful of pieces made with a reason, a voice, and a system behind them will out-earn a hundred made because the tools made a hundred easy.'),
    ),
  ),
  flow(
    ...section(
      'SCOPE',
      'One thing to be clear about',
      ...p('A quick, plain note on scope, because everyone is shouting about it and it is not what we do. We do not run ads. This book is about creating content, the organic assets that earn attention and feed your business, not about buying reach through paid campaigns.'),
      ...p('We are deliberate about that line. Running ads, the media buying, the budgets, the campaign management, is a different trade with a different skill set, and it is not the one this book teaches or the one our business practises. What we do, and what this book is about, is building the engine that produces the assets: the posts, the videos, the carousels, the emails, the words, made faster and better than used to be possible, and wired into a system that turns the attention they earn into business. There is one honest place where the two worlds touch, and we will get to it, because the same engine that makes your organic content can make ad creative, and knowing what is working in paid content is useful intelligence even for a business that does not buy it. But that is one section, not the theme. The theme is the engine, and the engine is organic.'),
    ),
    ...section(
      'TWO WAYS',
      'A flood of posts, or a system',
      ...p('Every business making content is doing it one of two ways, and knowing which one you are shapes everything that follows.'),
      ...p('The first is the flood. Make things because the tools make making easy, post them because posting feels like progress, and hope. It looks busy, it feels productive, and it is the trap from three paragraphs ago: no reason behind it, no consistency across it, no learning from it, and no path from it to anything you own. It scales the effort and not the result, and now that the making is free, it scales the effort to a flood while the result stays a trickle.'),
      ...p('The second is a system. A reason behind what you make, decided before you make it. One voice, so everything you post builds the same recognisable business. A production line that turns one good idea into a week of varied pieces without starting over. A loop that checks what worked and makes more of it. And a pipe that carries every bit of earned attention back to the ground you own, where the rest of your business can act on it. It is calmer than the flood, it makes less, and it earns more, because every piece has a job and the whole thing points somewhere.'),
      ...p('This book is about building the second. The chapters ahead are its parts: the strategy that comes before a single asset, the one source your whole voice flows from, the toolkit that makes production fast, the line that runs day to day, the honesty and the law that keep it premium, the numbers that tell you what worked, the wiring that turns a post into a lead, and the team that runs it all. But before any asset gets made, there is a question that decides whether the whole system earns or just spins, and the flood never asks it. What is this content actually for? That is chapter two.'),
      {
        type: 'diagram',
        id: 'btm-ch01-flood-or-system',
        caption: 'A flood, or a system. THE FLOOD: no reason, no consistency, no learning, no path. THE SYSTEM: a reason, a voice, a line, a loop, a pipe. Less made. More earned.',
      },
    ),
  ),
]
