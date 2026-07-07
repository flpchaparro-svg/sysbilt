import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch04Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 4,
    title: 'Capturing what is in people\'s heads',
    subtitle: 'Record while doing, voice and screen turned into materials, and the document-as-you-go habit.',
  }),
  flow(
    ...p(
      'Everything in this book depends on one practical step that sounds hard and is not: getting the knowledge out of your experienced people\'s heads and into a form you can use. This is the step businesses get stuck on, because it sounds like a huge documentation project nobody has time for, and so they never start, and the knowledge stays trapped. This chapter is how to make it easy, because the tools that made training cheap made capturing knowledge cheap too, and the person who holds the knowledge no longer has to become a writer to get it out.',
    ),
    ...section(
      'THE SOURCE',
      'The person doing the work is the source',
      ...p('The first principle removes the biggest blocker. The knowledge should come from the person who actually does the work, not from a writer, a manager, or anyone trying to document from the outside, because only the person doing the work knows the real how, including the small things they do not even realise they know. This matters because it changes who does the capturing, from someone who would have to learn the work first, to the person who already knows it, which is faster, more accurate, and far more likely to actually happen. The expert does not need to write anything polished. They need to show and tell what they do, and the tools turn that into the materials, which is the whole shift this chapter rests on.'),
      {
        type: 'diagram',
        id: 'bte-ch04-person-is-source',
        caption: 'The person doing the work is the source. LEFT (crossed): a writer trying to document a task from the outside, has to learn it first, slow, and it never happens. RIGHT (gold): the expert who already does the work, showing and telling, already knows the real how, including what they do not realise they know.',
      },
    ),
    ...section(
      'RECORD',
      'Record while doing',
      ...p('The easiest way to capture knowledge is to record the person doing or explaining the task, rather than asking them to write it up afterwards, because talking through what you are doing is natural and writing a procedure is not. Have the experienced person walk through the task, out loud, while doing it or while explaining it, and record that, the screen, the voice, the demonstration. What you now have is the raw knowledge, in the expert\'s own words, captured in the time it took them to do the thing once. This is dramatically easier than the documentation project businesses dread, because nobody is being asked to write, they are being asked to do what they already do and talk while they do it, which most people find easy.'),
    ),
    ...section(
      'MATERIALS',
      'Voice and screen, turned into materials',
      ...p('Here is where the shift this book opened with does the heavy lifting. That recording, the voice, the screen capture, the walkthrough, can now be turned into clean, usable materials automatically. The spoken explanation becomes a written procedure. The screen recording becomes a training video. The messy real-time walkthrough becomes a structured guide. The tools take the raw, unpolished capture and produce the finished formats, which means the expert\'s job ends at showing and telling, and the production, the part that used to require a writer or a video editor, is handled. This is why capturing knowledge is no longer a project, it is a conversation and a recording, and the difference between the two is the difference between a thing businesses never get around to and a thing they can actually do.'),
      {
        type: 'diagram',
        id: 'bte-ch04-record-not-write',
        caption: 'Record, do not write. The expert talking through a task while doing it on the left, an arrow through the tools in the middle, finished formats out the right: a written procedure, a video, a structured guide. The expert\'s job ends at showing and telling, the tools handle production. Not a documentation project. A conversation and a recording.',
      },
    ),
  ),
  flow(
    ...section(
      'HABIT',
      'The document-as-you-go habit',
      ...p('Beyond the deliberate capture sessions, the most powerful long-term habit is capturing knowledge as the work happens, rather than in a separate project. The moment someone works out how to do a new thing, solves a tricky problem, or handles a situation for the first time, that is the moment to capture it, while it is fresh and while it is happening, a quick recording, a voice note, a screen capture, dropped into the single source of truth from chapter two. This turns knowledge capture from a daunting one-time effort into a small, continuous habit, and over time it builds the knowledge base naturally, from the actual work, without anyone ever having to sit down and document the whole business at once. The businesses that do this well are not the ones that ran a big documentation project, they are the ones that made capturing knowledge a normal part of doing the work, so the asset grows by itself.'),
      {
        type: 'diagram',
        id: 'bte-ch04-capture-as-work',
        caption: 'Capture as the work happens. Daily work along the bottom, with small capture moments dropping up into the growing single source of truth above, each time a new thing is worked out or a problem solved. The asset grows by itself, from the actual work, without a big project.',
      },
      ...p('That is the capture: from the person who does the work, by recording rather than writing, turned into materials by the tools, and built continuously as a habit rather than a project. It is the step that unlocks everything else, and it is far easier than the dread around it suggests. With the knowledge captured, the next chapter is the full range of formats you can now turn it into, because different people learn in different ways and the tools let you serve all of them.'),
    ),
  ),
]
