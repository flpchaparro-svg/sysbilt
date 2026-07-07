import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch06Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 6,
    title: 'Running it day to day',
    subtitle: 'Training in the flow of work, look it up first, and the update ritual.',
  }),
  flow(
    ...p(
      'Training that lives in a folder and gets opened once is not training, it is filing. This chapter is about making the training system part of the daily work, where knowledge is available at the moment it is needed and stays current as the business changes, because a training system, like every system in this series, is only worth anything if it is actually used and actually maintained. The good news is that running it well is a light habit, not a heavy one, once it is built.',
    ),
    ...section(
      'IN FLOW',
      'Training in the flow of work',
      ...p('The most important shift in running a training system is where the training lives: not in a separate place people have to remember to go, but in the flow of the actual work, available at the moment the work is happening. Chapter three showed that a five-minute lesson at the moment of need beats an hour-long session weeks before, and running the system well is about making that real, putting the answer where the question arises. When someone hits a task they are unsure about, the procedure, the video, the answer should be a few seconds away, in the tool they are already using or a place they know to look, rather than buried somewhere they would have to stop and hunt for. Training in the flow of work is what turns a knowledge base from a library nobody visits into a resource people actually use, because it meets them where the need is instead of asking them to leave the work to find it.'),
      {
        type: 'diagram',
        id: 'bte-ch06-in-flow',
        caption: 'Training in the flow of work. LEFT (crossed): training in a separate place people have to remember to visit, a library nobody goes to. RIGHT (gold): the answer sitting right where the work happens, a few seconds from the question, meets people where the need is. Put the answer where the question arises.',
      },
    ),
    ...section(
      'LOOK IT UP',
      'The look-it-up layer',
      ...p('For this to work, there has to be a layer everyone knows to check first, the single source of truth from chapter two, organised so people can actually find what they need. The habit to build across the team is simple: when you do not know how to do something, look it up before you ask a person, because the whole point of the system is to stop the senior people being the manual. This only works if two things are true: the knowledge is actually there, and it is findable, which is why the single source of truth has to be real, current, and organised rather than a dumping ground. A team that knows to look it up, and finds the answer when they do, is a team that has stopped queueing behind its experts, which is the freedom this whole book is trying to buy. The training agent in the next chapter is the most powerful version of this look-it-up layer, because you can simply ask it, but the principle holds whatever the format: check the system first.'),
      {
        type: 'diagram',
        id: 'bte-ch06-look-it-up',
        caption: 'Look it up before you ask. A team member hitting an unknown, with two paths: DEFAULT (gold) check the system first, find the answer, and the faded old path queue behind a busy expert. Only works if the knowledge is there and findable. A team that looks it up has stopped queueing behind its experts.',
      },
    ),
  ),
  flow(
    ...section(
      'UPDATE',
      'The update ritual',
      ...p('Here is the discipline that separates a training system that stays valuable from one that quietly becomes dangerous: when something changes, the training changes with it, the same day, as part of the change. This series has said it about every system, and it matters most here, because stale training is worse than no training. A procedure that describes how the business used to do something, taught confidently to a new starter, actively teaches them the wrong thing, and they will do it wrong with total confidence because the training told them to. So the ritual is non-negotiable: a process changes, a tool updates, a standard shifts, and the relevant training is updated in the same motion, not added to a list of documentation to fix later, because later never comes and the stale version does damage in the meantime.'),
      ...p('The reason this is achievable rather than burdensome is everything the earlier chapters built. Because the knowledge lives in one source, you know where to update it. Because capturing is now a quick recording rather than a writing project, updating is fast. And because the formats are generated from the source, updating the source and regenerating the affected materials is a manageable task rather than a re-documentation of the business. The update ritual is what keeps the asset from rotting, and it is the habit most businesses skip and then wonder why their training stopped being trusted, because the moment a team catches the training being wrong once, they stop believing it entirely, and then you are back to asking the experts.'),
      {
        type: 'diagram',
        id: 'bte-ch06-update-ritual',
        caption: 'The update ritual. A change happening with an arrow immediately updating the relevant training in the same motion, same day, part of the change. Beside it (crossed): the stale version left in place, confidently teaching a new starter the old way. Stale training is worse than none. The moment a team catches the training being wrong once, they stop believing it entirely.',
      },
    ),
    ...section(
      'RHYTHM',
      'The light rhythm',
      ...p('Run day to day, the system needs only a light rhythm: training available where the work happens, a team habit of looking it up first, and the discipline of updating the moment things change. Add to that a periodic glance at what people are still asking about despite the training, because those questions are a map of where the knowledge base has gaps, exactly the same listening loop this series installs everywhere, and every recurring question that the system should have answered is an instruction to capture that knowledge and add it. None of this is heavy. It is a habit, not a project, and once the system is built, keeping it alive costs far less than the endless re-explaining it replaced. The next chapter is the format that makes the look-it-up layer effortless and available around the clock, the training agent, and it is the one that changes the daily experience of training most.'),
    ),
  ),
]
