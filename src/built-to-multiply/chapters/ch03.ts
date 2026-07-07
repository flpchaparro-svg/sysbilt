import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch03Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 3,
    title: 'The anatomy of content that works',
    subtitle: 'Hook, value, action. One idea. Native to the room. Variations as the unit.',
  }),
  flow(
    ...p(
      'Strategy decides what to make and why. This chapter is about the piece itself, because a good reason expressed in a weak piece still earns nothing. Every bit of content that works, on any platform, in any format, shares a shape, and once you can see it you can look at any post, yours or a competitor\'s, and tell in a second whether it was built to work or built to fill the feed. This is that shape, plus the one rule the platforms have quietly made non-negotiable.',
    ),
    ...section(
      'THREE STEPS',
      'Hook, value, action',
      ...p('Content that works moves a person through three steps, fast, and usually in the first few seconds.'),
      ...p('The hook comes first, and it matters more than everything after it combined, because on a modern feed nothing is owed a second of attention, and a piece that does not earn the first second is never seen at all. The hook is the opening line, the first frame, the thing that stops the scroll: a question the person wants answered, a statement that surprises, a promise of something useful. Weak hook, dead post, however good the rest.'),
      ...p('Value comes second: the thing the piece actually gives, the useful answer, the insight, the moment worth the attention. This is where you earn the right to have stopped them, and content that hooks and then delivers nothing trains the audience to scroll past you next time.'),
      ...p('Action comes third: the small next step, follow for more, read the full piece, get the guide, enquire. Not every piece asks for much, but every piece should know what it wants the person to do next, because content with no next step is the fire in the empty room from chapter one.'),
      ...p('Hook, value, action. Miss the hook and nobody sees it. Miss the value and nobody trusts it. Miss the action and nobody moves. Almost every failed piece fails at one of those three, and almost every good one has all three.'),
      {
        type: 'diagram',
        id: 'btm-ch03-hook-value-action',
        caption: 'Hook, value, action. HOOK stops the scroll. VALUE earns the right to have stopped them. ACTION is the next step. Miss any one and the piece fails.',
      },
    ),
    ...section(
      'ONE IDEA',
      'One idea per piece',
      ...p('The most common mistake in a single piece is cramming, trying to say five things because you can, which leaves the viewer with none of them. Content that works says one thing. One idea, one point, one answer, made well and made memorable. If you have five things to say, that is five pieces, which the next chapter will show is exactly how a system turns one idea into many. Cramming is a flood instinct, more in less. The system instinct is the opposite: one clear thing, done properly, then the next.'),
      {
        type: 'diagram',
        id: 'btm-ch03-one-idea',
        caption: 'One idea per piece. LEFT: five points crammed, the viewer leaves with none. RIGHT: five posts, one idea each, done properly. That is how the system multiplies.',
      },
    ),
  ),
  flow(
    ...section(
      'NATIVE',
      'Native to the room',
      ...p('A piece made for one platform and sprayed across all of them reads as imported everywhere it lands, because each platform has its own shape, rhythm, and unwritten rules, and audiences feel the mismatch instantly. Content that works is native: made to fit the room it is in, not the room it came from. This does not mean making everything from scratch for every platform, the next chapter is precisely about avoiding that, it means adapting the piece to the room rather than dumping it. The same idea, dressed for where it is going. The flood posts identically everywhere and calls it efficiency. The system adapts, and the difference is felt in the results.'),
    ),
    ...section(
      'WORDS',
      'The words that carry it',
      ...p('Even in video and image content, a few words do most of the work, and they are worth getting right. The hook line, obviously. The caption, which on many platforms is where the real persuading happens and where search increasingly reads you, so it earns actual thought rather than an afterthought and a row of hashtags. And the call to action, the plain words that tell the person what to do next. These few words are the difference between a piece that looks fine and slides past and one that stops, holds, and moves someone, and they cost nothing but attention to get right.'),
    ),
    ...section(
      'VARIATIONS',
      'Variations are the unit now',
      ...p('Here is the rule the platforms have made non-negotiable, and it changes how you should think about a piece entirely. The old way was to make one post and put it out. That no longer works well, for two reasons. The platforms now reward freshness and variety, and they show a single post to only a fraction of the people who follow you, let alone beyond. And you cannot know in advance which version of an idea will land, because the audience decides, not you.'),
      ...p('So the unit of content is no longer the post. It is the idea, expressed as many variations. One point, made as several different hooks, several different openings, several different angles, put out and watched to see which one the audience responds to. One post is a guess. Ten variations of it is an experiment that tells you which guess was right, and then you make more like the winner. This sounds like more work, and it would be, if you were making each from scratch. The entire reason the rest of this book exists, the source, the toolkit, the production line, is to make variations cheap, so that the thing the platforms now demand becomes something a system produces easily rather than something that buries you in labour. Variation is not optional any more. It is the format. The system is what makes it survivable.'),
      {
        type: 'diagram',
        id: 'btm-ch03-variations-unit',
        caption: 'Variations are the unit now. One idea, many hooks, put out and watched. One post is a guess. Ten variations is an experiment. The system is what makes that survivable.',
      },
      ...p('That is the anatomy: hook, value, action, one idea, native to the room, carried by a few sharp words, and produced as variations rather than single shots. The next chapter is how you make all of that without starting from zero every time, the one source your whole voice flows from.'),
    ),
  ),
]
