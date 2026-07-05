import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch10Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 10,
    title: 'Growing it over time',
    subtitle: 'One reflex at a time, each earning its place.',
  }),
  flow(
    ...p(
      'An automated business is not built in a season, and it should not be. The nervous system from chapter nine grows the way chapter four ordered it, one reflex at a time, each earning its place, and this chapter is the growth discipline: the sequencing, the moment a workflow should become two, the day the platform economics flip, and the human layer that decides whether any of it survives contact with your team.',
    ),
    ...section(
      'START SMALL',
      'Start with the one that stings',
      ...p('The first automation is chosen by pain, not ambition: the item from your chapter-four audit that made you sigh loudest, provided it passes the rule of three. For most businesses it is one of the same three: the instant acknowledgement, the invoice chaser, or the missed-call text-back, each an afternoon\'s build, each felt within a week. The point of starting small is not modesty, it is proof: the team experiences a chore vanishing, the owner experiences the two-minute check working, and the appetite for the next one arrives on its own. Momentum is the strategy; the everything-machine is the anti-strategy.'),
    ),
  ),
  flow(
    ...section(
      'SPLIT',
      'When one workflow becomes two',
      ...p('Workflows grow, and there is a moment to split them, signalled by three smells. The workflow has grown a second trigger, or a second unrelated outcome, which means it has quietly become two jobs sharing one body. The conditions have branched so deep that reading it requires a map, which means the branches want to be their own flows. Or changing one part now frightens you because of what else might move, which is the definitive sign: fear of touching is the smell of over-grown scope. Splitting is not failure, it is the same one-job doctrine from chapter three, reapplied as the system matures, and small workflows stay understandable, testable and fixable forever, which is the entire maintenance bill in three adjectives.'),
      {
        type: 'diagram',
        id: 'btr-ch10-split-workflow',
        caption: 'When one workflow becomes two. Three smell-tags: second trigger, branches need a map, afraid to touch it. Split into two small named workflows.',
      },
    ),
  ),
  flow(
    ...section(
      'CROSSOVER',
      'When the economics flip',
      ...p('The platform conversation from chapter two has a sequel, and it arrives on a schedule most businesses can predict. Per-task pricing is a friend at low volume: the easy platforms let you start in an afternoon, and a few hundred tasks a month costs less than the coffee budget. But every reflex added multiplies the tasks, success multiplies them again, and there is a crossover, different for every business but unmistakable when it approaches, where the monthly bill for plumbing rivals a salary line, and the flat-cost, self-hosted end of the spectrum stops being the technical enthusiast\'s choice and becomes the accountant\'s.'),
      ...p('The composed posture: watch the trend, not the number. A per-task bill growing faster than revenue is the flag, and the migration, moved deliberately, workflow by workflow, tested as chapter seven demands, is a project measured in weeks that pays monthly forever. What the flat-cost end asks in exchange is real technical care, self-hosted means self-responsible, which for most businesses honestly means a partner who carries it, and that trade, subscription tax for stewardship, is usually the right one at scale and the wrong one before it. Timing, as everywhere in this series, is the whole wisdom.'),
      {
        type: 'diagram',
        id: 'btr-ch10-crossover',
        caption: 'The crossover. Per-task cost line crossing flat self-hosted line. Watch the trend, not the number. Moved workflow by workflow.',
      },
    ),
  ),
  flow(
    ...section(
      'THE TEAM',
      'The team layer',
      ...p('And now the truth this series keeps arriving at from every direction: the system\'s ceiling is its adoption, and automations have their own version of the CRM book\'s chapter ten. Automations fail socially in two opposite ways. The team does not trust them, so the manual habits continue in parallel, the spreadsheet shadow-kept, the reminders still human-sent, and the business pays twice for one job. Or the team over-trusts them, chapter six\'s atrophy, and the gates become rubber stamps.'),
      ...p('The remedies are cultural and small. Every automation that touches a person\'s work is introduced to that person before it ships: what it does, what it will take off their plate, what they still own, because a reflex that appears overnight reads as surveillance, and one that was asked for reads as help. The documentation from chapter two lives where the team can read it, one plain line per workflow, so the machinery is never black magic to the people beside it. Anyone can flag, pause, or question any automation, no ceremony, because the person closest to the work notices the drift first. And the wins get named out loud: the hours the invoice chaser returned, the leads the acknowledgement saved, because a team that sees the machinery working for them starts proposing the next reflex themselves, and that, the team feeding the audit, is the moment the system starts growing itself.'),
      {
        type: 'diagram',
        id: 'btr-ch10-social-failures',
        caption: 'The two social failure modes. Under-trust: shadow spreadsheet, paying twice. Over-trust: rubber-stamped gate. Level: introduced, documented, anyone can pause, wins named out loud.',
      },
    ),
  ),
  flow(
    ...section(
      'READY FOR MORE',
      'The signs you are ready for more',
      ...p('The happy signals, so they are recognised on arrival: the two-minute check has been boring for months, boring being the highest state of infrastructure; the audit list has refilled with new ferrying, because growth manufactures admin; the team is proposing automations unprompted; and the workflows in place have earned wider gates. That is a business ready for the deeper builds, the full pipelines, the thinking steps, the nervous system\'s next layer. Growth in this discipline is not adding complexity, it is adding reflexes to a body that has proven it can feel them. One at a time, tested, documented, gated, owned. The same rules at fifty workflows as at one.'),
      ...p('The last working chapter puts AI at your elbow for the building itself, because the same shift that made automations affordable has made describing them the main skill, and the prompt pack turns description into a craft.'),
    ),
  ),
]
