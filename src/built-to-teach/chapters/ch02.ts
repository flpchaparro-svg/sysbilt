import type { BtwPage } from '../types'
import { flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch02Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 2,
    title: 'What you actually own: the knowledge of the business',
    subtitle: 'The asset nobody wrote down, the single source of truth, and key-person risk.',
  }),
  flow(
    ...p(
      'Chapter one ended on the question the bottleneck never asks: what is your business\'s knowledge worth, and where does it live? This chapter is the answer, and it is uncomfortable, because in most businesses the most valuable asset they own is stored in the one place they do not control, their people\'s heads, and it can walk out the door without notice. This chapter is about seeing that knowledge as the asset it is, and building the one thing that turns it from a liability into something the business actually owns.',
    ),
    ...section(
      'THE ASSET',
      'The asset nobody wrote down',
      ...p('Every business runs on knowledge, how we do things here, how the work actually gets done, the hundred small decisions and methods and shortcuts that make the business work, and in most businesses almost none of it is written down. It lives in habits and memories: the way the experienced person handles a tricky job, the reason things are done in a particular order, the answer to the question that always comes up, the standard nobody ever wrote but everybody senior somehow knows.'),
      ...p('This is the real intellectual property of a business, more than any logo or document, and it is worth naming plainly, because businesses protect their equipment and their money and leave their most valuable asset stored in the least secure place imaginable, a human mind that can forget, get busy, get sick, or resign. The knowledge that makes the business work is an asset, and like any asset it should be owned by the business, written down, kept, and controlled, rather than rented from whoever happens to still be employed. A business that has captured its own knowledge owns something durable. A business whose knowledge lives only in heads owns nothing it can count on, because the asset goes home every night and might not come back.'),
      {
        type: 'diagram',
        id: 'bte-ch02-asset-unsafe-place',
        caption: 'The asset in the least safe place. A vault labelled the business protects holds equipment and money. Outside it, unguarded, how the business actually works. The most valuable asset, in the least secure place. It goes home every night and might not come back.',
      },
    ),
    ...section(
      'ONE SOURCE',
      'The single source of truth',
      ...p('The way you turn that scattered, in-heads knowledge into an owned asset is to give it one home: a single source of truth, one place where how the business works is written down, kept current, and findable. This is the foundation the whole book stands on, and it is the same idea this series returns to everywhere, the website as the home of your voice, the CRM as the memory of the business, and here, the knowledge base as the memory of how the work is done.'),
      ...p('The single source of truth matters for a reason that becomes obvious the moment you think about it: everything else in this book is generated from it. The written procedure, the video, the podcast, the quiz, the infographic, the voice agent that answers questions, all of them are made from the knowledge in that one source, which means the source has to exist, be right, and be current, or everything built on it inherits the gaps and the errors. Build the source once, properly, and every training format flows from it and stays consistent with it. Skip the source and make materials ad hoc, and you get ten versions of the truth that contradict each other, which is worse than none, because now the team does not know which to believe. One source, one truth, everything else generated from it.'),
      {
        type: 'diagram',
        id: 'bte-ch02-single-source',
        caption: 'The single source of truth. Scattered knowledge on the left converges into one organised source in the centre, from which every format flows out on the right. One source, one truth, everything generated from it. Skip the source and you get ten versions that contradict each other, which is worse than none.',
      },
    ),
  ),
  flow(
    ...section(
      'OWNERSHIP',
      'Owned, exportable, controlled',
      ...p('The ownership doctrine of this series applies to your knowledge exactly as it applies to your domain, your data, and your systems. The knowledge base is yours: it lives somewhere the business controls, not in a departing employee\'s personal notes or a tool only one person can access. It is exportable: you can take it with you, move it, back it up, because knowledge trapped in a system you cannot get it out of is only half owned. And it is controlled: someone owns keeping it current, because a knowledge base that is not maintained rots into a museum of how the business used to work, which is its own kind of dangerous. Treat the knowledge of your business the way you treat every other critical asset, owned in your name, held where you control it, and kept current, because it is more valuable than most of the assets you already guard that carefully.'),
    ),
    ...realPicture({
      leadIn: 'It is worth being honest about what actually happens when a business\'s knowledge lives only in heads, because the risk is invisible right up until the day it is catastrophic, and by then it is too late to fix.',
      title: 'The real picture',
      paragraphs: [
        'Picture the person who just knows how everything works. Every business has one, often several, the long-serving operator, the founder, the senior hand who holds a huge share of how the business actually runs, none of it written down. While they are there, everything is fine, better than fine, because they are fast and they are reliable and they never need to look anything up. And that very reliability is what hides the risk, because the business never feels the gap, so it never fills it, and the knowledge quietly concentrates in one mind that everyone has learned to depend on.',
        'Then that person leaves. They retire, they resign, they are unwell, they are poached, and in a single day the business loses a huge portion of how it works, with no way to get it back, because it was never anywhere but in that head. The new person cannot be trained properly because the trainer is gone. The questions that used to have an instant answer now have no answer. The standards drift because nobody remembers exactly what they were. The business spends months, sometimes years, painfully rediscovering things it already knew, at real cost, all because the knowledge was never captured while the person was still there to give it. This is key-person risk, and it is one of the largest and most ignored risks a growing business carries, precisely because it does not show up on any report and it feels rude to plan for.',
        'The quieter version is just as expensive and even easier to miss: the person does not leave, but they become the bottleneck from chapter one, so valuable for what they know that they can never be promoted, never take real leave, never step back to lead, because the business cannot run without them in their current seat. Their knowledge, uncaptured, has trapped both them and the business, and the trap tightens as the business grows more dependent on them.',
        'None of this is here to alarm you about your people. It is here to make one point clearly: the knowledge in your team\'s heads is a real asset carrying a real risk, and the only insurance is to capture it while the people are still there to give it, which is exactly what the rest of this book is about. Capturing knowledge is not bureaucracy. It is protecting the most valuable and least protected thing the business owns, in advance, while you still can.',
      ],
    }),
    {
      type: 'diagram',
      id: 'bte-ch02-person-who-knew-everything',
      caption: 'The person who just knows everything. WHILE THEY ARE THERE: everything runs smoothly, the risk invisible. THE DAY THEY LEAVE: a large chunk of how it works vanishes with them, the team stranded. Months of painfully rediscovering what the business already knew. The only insurance is capturing it while they are still here to give it.',
    },
    ...p(
      'That is the shift in thinking this chapter asks for: your business\'s knowledge is its most valuable asset, it currently lives in the least safe place possible, and the fix is to capture it into one owned, current source that everything else is built from. The next chapter is about what good training actually looks like once you have the knowledge, because capturing it is one thing and making it stick is another.',
    ),
  ),
]
