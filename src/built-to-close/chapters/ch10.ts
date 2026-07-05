import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch10Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 10,
    title: 'Getting your team to actually use it',
    subtitle: 'Everything promised is multiplied by whether the thing gets used.',
  }),

  flow(
    ...p(
      'Here is the statistic that matters more than any feature list: the number one way CRMs fail is not the software. It is the team quietly not using it. The system launches, the first fortnight looks promising, and then the updates thin out, the board drifts from reality, and six months later the owner concludes CRMs do not work for a business like ours. The software gets the blame. The rollout earned it. This chapter is how to be the other story, and it may be the highest-return chapter in the book, because everything the previous nine promised is multiplied by exactly one factor: whether the thing gets used.',
    ),
  ),

  flow(
    ...section(
      'WHY CRMs DIE',
      'Why CRMs die',
      ...p(
        'Start with the honest diagnosis, because the usual one, the team is lazy, is wrong and useless. Your people are not lazy. They are rational. A CRM dies when it adds work without returning value to the person doing the adding: the salesperson types notes into a system that never gives anything back, the update feels like surveillance paperwork, and the tool competes with the actual job instead of serving it. People do not resist systems. They resist unpaid taxes, and a badly rolled out CRM is exactly that: a tax paid by the team, collected by a dashboard, enjoyed by no one.',
        'There is a second, softer reason underneath, worth naming because it never appears in vendor brochures: a new system makes competent people feel like beginners again. The veteran who knows every client by heart is suddenly the person fumbling with an app in front of colleagues, and some of the resistance you will meet is just that discomfort wearing a practical costume. Treat it with respect rather than argument, because it responds to help and never to memos.',
      ),
      {
        type: 'diagram',
        id: 'btc-ch10-why-crms-die',
        caption:
          'Why CRMs die. A seesaw. LEFT side loaded "work it adds: typing, fields, surveillance feeling"; RIGHT side loaded "value it returns: the morning list, the saved embarrassment, sounding brilliant on a call". Two states: tipped left, tagged "abandoned by rational people"; tipped right (gold), tagged "fed daily". Footer: "People do not resist systems. They resist unpaid taxes."',
      },
    ),
  ),

  flow(
    ...section(
      'DESIGN',
      'Design for laziness',
      ...p(
        'The fix begins before training, in the setup, and the principle is blunt: build the system so the easiest path is the right one, because the easiest path is the one humans take.',
        'That means auto-capture everywhere it exists: the email sync, the wired forms, the call logging from chapter five, so the system feeds itself and nobody types what a machine already knows. It means chapter four\'s ruthlessness about fields: if updating a deal takes more than a minute from a phone, the setup has failed, not the team. It means mobile-first as doctrine, because your people live in carparks and job sites, not at desks. And it means every workflow returning value to the person using it: the salesperson\'s morning list written for them, the reminder that saves them an embarrassment, the client history that makes them sound brilliant on a call. A system that gives back gets fed. That is the whole design test.',
      ),
      {
        type: 'diagram',
        id: 'btc-ch10-design-laziness',
        caption:
          'Design for laziness. Four labelled design moves around a phone: AUTO-CAPTURE "the system feeds itself", MINIMUM FIELDS "under a minute per update", MOBILE-FIRST "carparks, not desks", GIVES BACK "value returned to the person updating". Footer: "The easiest path must be the right one."',
      },
    ),
  ),

  flow(
    ...section(
      'OWNER',
      'The owner goes first',
      ...p(
        'Now the rollout, and it starts with the least comfortable rule in the book: the leader adopts hardest. If the owner works from memory, asks for updates by text, and treats the CRM as the team\'s chore, the team will read the truth in a week and act on it, because everyone always knows what the boss actually values. The reverse is equally powerful. When every question about a deal gets answered with what does the CRM say, when the Monday meeting runs from the board and only the board, when work that is not in the system politely does not exist, the message lands without a single memo: this is where the business happens now. Culture is just what the leader repeatedly does, and CRM adoption is culture before it is training.',
      ),
    ),
  ),

  flow(
    ...section(
      'TRAINING',
      'Training that respects adults',
      ...p(
        'The training itself is smaller and different than most rollouts assume. Not one long session on everything, which teaches nothing and insults everyone, but short, role-shaped pieces: the fifteen minutes that cover the five things this person actually does daily, shown, then done together, then done alone. A one-page cheat sheet where the work happens. The permission to ask the same question three times without ceremony. And the champion: one respected team member brought in early, fluent first, who becomes the human help desk and the proof that this is doable, because peers convince where managers merely announce.',
        'Then the support window, the fortnight after launch when questions are actively invited, friction gets fixed the day it is found, a confusing field renamed, a pointless step deleted, and the team watches their feedback change the system. Nothing builds ownership faster than being listened to, and nothing kills a rollout faster than launching and disappearing.',
      ),
      {
        type: 'diagram',
        id: 'btc-ch10-rollout-arc',
        caption:
          'The rollout arc. A five-step arc: OWNER GOES FIRST → CHAMPION FLUENT EARLY → SHORT ROLE-SHAPED TRAINING → SUPPORT WINDOW "questions free, friction fixed same day" → SINGLE SOURCE OF TRUTH "meetings run from the board". Footer: "Culture is what the leader repeatedly does."',
      },
    ),
  ),

  flow(
    ...section(
      'SINGLE SOURCE',
      'Make it the single source of truth',
      ...p(
        'The habits that lock it in are rhythms, not rules, and chapter six already built them: the daily fifteen minutes, the weekly review run from the board, logging in the moment. The team versions differ only in one addition, gentle and absolute: the CRM is where reality lives. Praise flows from it, help flows from it, planning flows from it, and slowly the team discovers the honest secret, that the system was never surveillance, it was the end of carrying everything in their heads, and the veteran who resisted hardest usually becomes its fiercest defender, roughly the day it saves them from a dropped ball in front of a client.',
      ),
    ),
  ),

  flow(
    ...section(
      'GROWING',
      'Growing it without breaking it',
      ...p(
        'Last, the growth discipline, because over-building is the quieter way rollouts die. Start with the spine from chapter five, forms, sync, tasks, the quote sequence, the mobile app, and let everything else earn its way in when volume demands it: lead scoring when enquiries outgrow judgment, deeper automation when the team is fluent, more pipelines only when genuinely different work demands them. Every addition is a small new tax on every user, so each must pay its way, and a feature nobody asked for is a weed. The signs you have outgrown the setup are the happy ones, enquiry volume straining the rhythms, reporting questions the system cannot answer, a team asking for more, and the properly built version grows by addition, not by starting over, exactly as this series keeps promising.',
        'Which leaves one tool that makes every rhythm in this book faster, and it deserves its own chapter: putting AI to work inside the machine.',
      ),
    ),
  ),
]
