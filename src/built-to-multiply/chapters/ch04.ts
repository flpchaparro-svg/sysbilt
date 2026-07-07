import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch04Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 4,
    title: 'One source, many channels',
    subtitle: 'One owned source, multiplied across every channel, without starting from zero each time.',
  }),
  flow(
    ...p(
      'The last chapter ended on a demand that sounds exhausting: one idea, many variations, native to each room, over and over. Done the flood way, from scratch each time, it is exhausting, and it is why most businesses burn out on content within a season. This chapter is the way it actually works, the multiplier at the heart of the system: one source, made once, turned into many pieces across many channels, so that the volume the platforms demand comes from leverage rather than labour.',
    ),
    ...section(
      'THE HOME',
      'The home of your voice',
      ...p('Everything starts with one source, and for the reasons this whole series has built toward, that source lives on ground you own, your website, your blog, the definitive place where your business says what it thinks. This is not sentiment, it is structure. When your voice has a home you own, everything else becomes an extension of it rather than a scattered set of things you said in different places, and the difference shows: a business whose website says one thing, whose social says another, and whose emails say a third feels uncertain and assembled, while a business whose every piece traces back to one clear source feels deliberate and whole.'),
      ...p('So the source is a real, considered piece, an article, an insight, a genuine answer to a question your person actually asks, made properly and published where you own it. That single piece is not the content. It is the seed the content grows from.'),
    ),
    ...section(
      'THE TREE',
      'The repurposing tree',
      ...p('Here is the multiplier, plainly. One source piece becomes many, and it does so by being broken down, reshaped, and re-dressed for each place it goes, rather than rewritten from nothing.'),
      ...p('One article becomes the carousel that carries its main points. It becomes the several short posts, each taking one idea from it. It becomes the script for a video, and the video becomes the clips. It becomes the email to your list. It becomes the set of variations chapter three demanded, each a different hook on the same underlying idea. A single genuine piece of thinking, made once, can feed a week or more of content across every channel you have chosen, and every piece of it is consistent, because every piece came from the same source. This is what turns the platforms\' appetite from a threat into something manageable: you are not making forty things, you are making one thing and multiplying it forty ways, which a person can sustain and a flood-maker cannot.'),
      ...p('The skill, and it is a real skill the rest of this book builds, is doing the multiplication fast and well, so that one source becomes many pieces in an afternoon rather than a fortnight. But the principle is simple and it is the beating heart of the system: make the good thing once, then multiply it, rather than making mediocre things endlessly.'),
      {
        type: 'diagram',
        id: 'btm-ch04-repurposing-tree',
        caption: 'The repurposing tree. One SOURCE PIECE at the root, branching into carousel, short posts, video and clips, email, variations. Every branch consistent, because it came from the same source. Make the good thing once, then multiply it.',
      },
    ),
  ),
  flow(
    ...section(
      'THE LIBRARY',
      'The content library',
      ...p('The pieces you make are assets, and assets should be kept, found, and reused, which most businesses never do, they make a thing, post it once, and lose it. A content library is the place your made assets live: the images, the clips, the graphics, the templates, organised so they can be found and used again, in your colours, your fonts, your look.'),
      ...p('Its value is compounding. The graphic made for one post becomes the base for the next. The clip cut for one platform gets re-dressed for another. The template built once produces the tenth carousel in minutes. Over a year, a business with a library is making new content on top of a growing pile of reusable parts, getting faster as it goes, while a business without one starts from a blank page every single time and never speeds up. The library is what makes the production line in chapter six quick, and it is the quiet reason experienced content systems produce more with less effort as they mature.'),
      {
        type: 'diagram',
        id: 'btm-ch04-library-compounds',
        caption: 'The content library compounds. WITHOUT a library: flat effort, never speeds up. WITH a library: each new piece builds on reusable parts, effort dropping over time, gets faster as it goes.',
      },
    ),
    ...section(
      'CONSISTENCY',
      'Consistency at speed',
      ...p('The risk in all this multiplication and speed is that the business starts to look scattered, ten pieces a week that do not feel like they came from the same place. The answer is a small set of rules held firmly: the colours, the fonts, the visual style, the voice, written down and applied to everything, so that volume never costs recognisability. This is where the brand assets and the voice this series keeps returning to earn their keep, they are what let you make a lot, fast, and still have every piece unmistakably yours.'),
      ...p('Templates are the practical tool here: the carousel format, the quote graphic, the video frame, built once to the brand rules, then filled again and again, so consistency is baked in rather than re-decided each time. A good template is a rule you only have to follow once. Ten filled templates look like one business. Ten pieces made freehand look like ten businesses, and the audience, and the machines now reading you, notice.'),
      {
        type: 'diagram',
        id: 'btm-ch04-one-rule-template',
        caption: 'One rule you only follow once. Ten filled templates look like one business. Ten freehand pieces look like ten businesses. A good template is a rule you only have to follow once.',
      },
      ...p('That is the multiplier: one owned source, multiplied down a repurposing tree, drawing on a growing library, held together by a few firm brand rules. It is what makes the volume the platforms demand come from leverage instead of exhaustion. The next chapter is the toolkit that does the multiplying, honestly assessed, including what each tool is genuinely for and where it is more than a business your size needs.'),
    ),
  ),
]
