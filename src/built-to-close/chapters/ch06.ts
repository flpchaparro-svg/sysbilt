import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch06Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 6,
    title: 'Running it day to day',
    subtitle:
      'A short daily rhythm, one honest weekly ritual, and a handful of reflexes that keep the system true.',
  }),
  flow(
    ...p(
      'A CRM that works is a CRM that gets worked, and the working is smaller than most owners fear: a short daily rhythm, one honest weekly ritual, and a handful of reflexes. None of it requires technical skill. All of it compounds, because a system trusted daily stays true, and a system visited monthly becomes fiction, and the fall from one to the other is quiet and fast. This chapter is the operating rhythm.',
    ),
  ),
  flow(
    ...section(
      'FIFTEEN MINUTES',
      'The fifteen minutes that run the day',
      ...p(
        'The day starts with the CRM, not the inbox, and it takes about fifteen minutes.',
        'First, the new leads: everything that arrived since yesterday, each one answered or owned before anything else happens, because chapter one\'s arithmetic has not changed overnight, the fresh enquiry is the most perishable thing the business holds. Second, today\'s tasks: the follow-ups, the promised calls, the quotes due a nudge, worked as the list the system wrote from your own commitments. Third, a glance at the board: anything sitting past its stage rhythm gets a decision, act, or move it honestly.',
        'That is the whole ceremony. Its power is not any single morning but the compounding: a business that starts every day this way simply does not leak the way chapter one described, and the owner who used to carry the follow-up in their head now carries nothing, because the list is the memory.',
      ),
      {
        type: 'diagram',
        id: 'btc-ch06-fifteen-minutes',
        caption:
          'The fifteen minutes. Three-step morning strip with clock: 1 NEW LEADS "answered or owned, first", 2 TODAY\'S TASKS "the list the system wrote", 3 THE BOARD "anything sitting past rhythm gets a decision". Footer: "The list is the memory now."',
      },
    ),
  ),
  flow(
    ...section(
      'INBOX ZERO',
      'Lead-inbox zero',
      ...p(
        'One reflex deserves its own name. Every lead, from every source, reaches a state of answered-and-owned the same day it arrives: replied to, assigned, next step set. Not necessarily closed, not even quoted, just never floating. The unified inbox from chapter five makes this mechanical, and the speed-to-lead wiring makes the first touch instant even when you are on a job. The habit is refusing to let anything sit unowned overnight, because unowned is where leads go to die, and the whole system exists so they do not.',
      ),
    ),
  ),
  flow(
    ...section(
      'LOGGING',
      'Logging as you go',
      ...p(
        'The second reflex: the record happens in the moment, not from memory later. The call ends, the two-line note goes in from the phone, the next step gets a date, done in the carpark in under a minute. This is not admin discipline for its own sake. It is the difference between a CRM that knows things and one that guesses, and it is why chapter five made the mobile app non-negotiable. The team version of this reflex is chapter ten\'s whole subject; the owner\'s version starts here, because nobody logs consistently for a leader who does not.',
      ),
    ),
  ),
  flow(
    ...section(
      'WEEKLY REVIEW',
      'The weekly pipeline review',
      ...p(
        'Once a week, twenty minutes, the board gets read honestly, alone or with the team, and the same questions every time. What moved, what stalled, and why. Which deals have no next step, fix each one on the spot. What is the board\'s total telling us about the quarter ahead. Which deals were lost this week, and what did the why-lost field say.',
        'The review\'s real product is not the answers, it is the standard: a business that reads its pipeline aloud every week keeps a pipeline worth reading, because everyone knows the board is looked at, so the board gets kept true. Meetings that start from the same screen also end the oldest argument in sales, whose version of reality is right, because there is now one version.',
      ),
      {
        type: 'diagram',
        id: 'btc-ch06-weekly-review',
        caption:
          'The weekly review, four questions. Panel: What moved and what stalled / Which deals have no next step / What is the total saying about the quarter / What did the lost deals teach.',
      },
    ),
  ),
  flow(
    ...section(
      'ZOMBIES',
      'Killing zombie deals',
      ...p(
        'Every pipeline grows them: deals that died months ago but nobody moved, because closing a card feels like admitting defeat. Left alone, zombies inflate the forecast, clutter the board, and slowly teach everyone that the pipeline is decorative. The rule is kind and firm: a deal past double your normal cycle with no response gets one honest final touch, chapter seven has the graceful version, and then it is closed with its reason logged. Lost is not failure, lost is data, and a clean board that tells the truth is worth more than a fat one that flatters.',
      ),
    ),
  ),
  flow(
    ...section(
      'FIRE DRILL',
      'The fire drill: when a lead did not arrive',
      ...p(
        'At some point something will look wrong, a customer says they enquired and nothing is in the system, or a sequence seems to have gone quiet. Before panic, the drill.',
      ),
      {
        type: 'fireDrill',
        title: 'Lead capture fire drill',
        steps: [
          'Test it yourself. Submit your own website form, and watch for the contact to appear and the acknowledgement to land. If it flows, the system works and the missing lead came another way, check the other channels before assuming breakage.',
          'If it does not flow, capture everything: which form, what time, a screenshot of the submission, and whether the acknowledgement email arrived. Check the automation\'s own history for errors, most platforms show exactly where a flow stopped.',
          'Send it all to whoever looks after the system, the what, where and when, plus what you expected. With that in hand the cause is usually found in minutes rather than reconstructed over days.',
        ],
      },
      ...p(
        'And the deeper habit: run the test monthly even when nothing looks wrong, because the worst failure mode of any automated system is the silent one, the form that stopped feeding, the sequence that stopped sending, discovered weeks later as a mysterious quiet month. Five minutes of monthly paranoia is the cheapest insurance in this book.',
      ),
    ),
  ),
  flow(
    ...p(
      'None of this rhythm is heavy, and that is the point: the system carries the memory so the people carry only the habits. The next chapter takes the sharpest of those habits, following up, and turns it into a craft, because rails can carry warmth or spam with equal efficiency, and everything depends on which.',
    ),
  ),
]
