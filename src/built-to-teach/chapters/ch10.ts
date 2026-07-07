import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch10Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 10,
    title: 'Growing it, and knowing it works',
    subtitle: 'Signals you can read, the library that compounds, keeping it alive, and growing without over-building.',
  }),
  flow(
    ...p(
      'A training system, like every system in this series, has to be measured to be trusted and grown to stay useful, and this chapter is about both, because a training system you cannot tell is working is one you will eventually stop investing in, and one that does not grow becomes a fixed snapshot of a business that keeps moving. The measures here are practical, not academic, and the growth discipline is the same one this series applies everywhere: build what is needed, prove it works, and let it compound.',
    ),
    ...section(
      'MEASURING',
      'Measuring training like a system',
      ...p('Training is often treated as unmeasurable, a soft thing you do and hope helps, and that is exactly why it gets underinvested in, because what cannot be measured cannot be defended. But a training system produces signals you can actually read, and reading them turns training from an act of faith into a system you improve. The honest measures are few. Quiz results tell you whether knowledge is landing, and which knowledge is not, directly. The questions the training agent gets asked are a live map of what the team finds unclear, so a topic asked about constantly is a topic the training is failing to convey, and a gap you can fix. Error rates, mistakes made in the actual work, point straight at where training is weak, because a task people keep getting wrong is a task the training is not teaching well. And time to independence for new starters, from chapter eight, tells you whether onboarding is improving or not.'),
      ...p('None of these needs sophisticated tools, they need attention, and reading them monthly turns the training system into something that improves on evidence rather than drifting on assumption. The businesses that get compounding value from training are the ones that treat it as a system with signals to read, not a box ticked, and the signals are all there, in the quiz scores, the agent\'s questions, the errors, and the ramp times, waiting to be used.'),
      {
        type: 'diagram',
        id: 'bte-ch10-signals',
        caption: 'The signals you can read. Four readable signals feeding a simple monthly read: QUIZ RESULTS (is knowledge landing), AGENT QUESTIONS (a live map of what is unclear), ERROR RATES (where training is weak), TIME TO INDEPENDENCE (is onboarding improving). Training is not unmeasurable. The signals are all there, waiting to be used.',
      },
    ),
    ...section(
      'COMPOUNDS',
      'The library that compounds',
      ...p('The most powerful growth dynamic in a training system is that it improves itself if you let it, because every new question, every mistake, every new starter\'s confusion is information about what the knowledge base is missing, and capturing that turns the gaps into content. This is the listening loop this series installs everywhere, applied to training: the question the agent could not answer becomes a new piece of captured knowledge, the mistake that keeps happening becomes a new procedure or a clearer explanation, the thing every new starter stumbles on becomes a dedicated lesson. Run this way, the training system gets better every time it is used, because using it reveals its gaps and filling them is now cheap, so the knowledge base compounds, becoming more complete and more useful with each new starter and each new question rather than staying frozen at the day it was built.'),
      ...p('This is why the capture habit from chapter four matters so much for the long term. A business that captures knowledge continuously, from questions and errors and new situations, builds a training asset that grows richer over time and increasingly answers questions before they are even asked, while a business that built its training once and left it watches it slowly fall behind the business it was meant to describe. The compounding is the reward for treating training as a living system rather than a finished project, and it is what makes a mature training system so much more valuable than a new one.'),
      {
        type: 'diagram',
        id: 'bte-ch10-library-compounds',
        caption: 'The library that compounds. A loop: a question the agent could not answer, or a repeated mistake, or a new starter\'s confusion → captured as new knowledge → the knowledge base grows → it answers more before it is even asked. Gets better every time it is used. The reward for treating training as a living system, not a finished project.',
      },
    ),
  ),
  flow(
    ...section(
      'KEEPING ALIVE',
      'Keeping it alive',
      ...p('The other side of growth is preventing decay, which is the update ritual from chapter six seen over the long term. A training system\'s greatest long-term threat is becoming a graveyard of outdated materials, procedures describing tools the business no longer uses, videos of screens that have since changed, standards that have moved on, all of it teaching confidently wrong things to whoever trusts it. Keeping the system alive means the discipline of updating as the business changes, held consistently, and a periodic review to catch the materials that have quietly gone stale, retiring or refreshing them before they mislead. This is unglamorous maintenance, and it is what separates a training system that stays trusted from one that slowly becomes a liability, because the moment a team learns the training cannot be trusted to be current, they stop using it, and you are back to the bottleneck. A living system is one someone keeps alive, deliberately, and it is worth the small ongoing effort because the alternative is watching the whole asset decay back into uselessness.'),
    ),
    ...section(
      'GROWING',
      'Growing without over-building',
      ...p('Last, the growth discipline this series applies everywhere: build the training you need, when you need it, not everything at once. The temptation, once the system works, is to try to document and format the entire business immediately, which is the firehose aimed at the project itself, overwhelming and usually abandoned. The better path is to build the training that matters most first, the things taught most often, the knowledge most at risk, the onboarding most needed, and let the system grow from there as gaps reveal themselves and as the business changes. Start with the highest-value knowledge, prove the system works by using it, and grow it deliberately, and you get a training system that is always useful and never a stalled megaproject. The signs you are ready to expand are the good ones: the current materials are used and trusted, the capture habit is running, the team looks things up before asking, and there is a clear next gap worth filling. Fill it, prove it, and continue. That is how a training system grows into something that carries the whole business\'s knowledge without ever becoming a project nobody finishes.'),
      {
        type: 'diagram',
        id: 'bte-ch10-highest-value-first',
        caption: 'Highest-value first. A staircase. First step (gold, complete): the highest-value knowledge, taught most often and most at risk, proven by use. Next steps built only as gaps reveal themselves. Faded warning: trying to document the entire business at once, the firehose aimed at the project itself, usually abandoned. Start with the highest-value knowledge, prove it works, grow deliberately.',
      },
      ...p('With the system built, measured, and growing, the next chapter is the toolkit of prompts that makes producing all this training fast, and then the plain-words close.'),
    ),
  ),
]
