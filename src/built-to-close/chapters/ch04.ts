import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch04Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 4,
    title: 'Your data, and keeping it clean',
    subtitle:
      'What to record, what to refuse to record, and the small rhythm that keeps the memory honest.',
  }),
  flow(
    ...p(
      'Every promise this book makes, the follow-up that never forgets, the tracking that shows what pays, the reports that tell the truth, rests on one unglamorous foundation: the data being right. A CRM full of duplicates, dead contacts and empty fields does not just underperform, it actively lies, and a system the team catches lying gets abandoned. This chapter is the shortest in the book and carries the most weight per page: what to record, what to refuse to record, and the small rhythm that keeps the memory honest.',
    ),
  ),
  flow(
    ...section(
      'FEWER FIELDS',
      'Fewer fields, ruthlessly',
      ...p(
        'The instinct when setting up a CRM is to add a field for everything you might ever want to know. The instinct is wrong, and it is the number one way setups sabotage themselves. Every field is a small tax on every person every time they touch a record, and fields that are taxing get skipped, and skipped fields breed records that are half-true, which is worse than absent, because half-true gets trusted.',
        'The rule: a field earns its place only if someone will act differently because of what it holds. Name, contact details, source, owner, and the handful of facts your actual sales conversation turns on. That is usually under a dozen. Everything else is a note, notes are free-form and honest, and the record stays quick enough to update from a phone in sixty seconds, which is the real adoption test.',
      ),
      {
        type: 'diagram',
        id: 'btc-ch04-fewer-fields',
        caption:
          'A field earns its place. Record card with gold list "KEEP: name, contact, source, owner, the facts the sale turns on" and faded list flowing into notes "EVERYTHING ELSE: a note". Footer: "Under a minute from a phone, or the setup has failed."',
      },
    ),
  ),
  flow(
    ...section(
      'SOURCE',
      'The source, tagged from day one',
      ...p(
        'One field is sacred, and it gets its own commandment: every contact carries where it came from. Website form, phone call, referral, social, walk-in. Tagged at the moment of capture, automatically wherever the wiring allows, because memory-based source data is fiction by Friday. This single discipline is what makes chapter eight possible at all, knowing which marketing actually pays, and it cannot be reconstructed later. Start it on day one even if you start nothing else.',
      ),
    ),
  ),
  flow(
    ...section(
      'DUPLICATES',
      'Duplicates, and the one-human rule',
      ...p(
        'Chapter one called the CRM the memory of the business, and a memory that holds the same person as three people is a memory with amnesia. Duplicates are how follow-up emails the same client twice in a morning, how the history of a relationship scatters into fragments too thin to matter, and how your best customer hides inside three mediocre records. The defences: capture through wired forms rather than retyping, let the system\'s own duplicate-catching do its work, and merge on sight as a reflex, not a project. One human, one record, is the rule everything else leans on.',
      ),
      {
        type: 'diagram',
        id: 'btc-ch04-one-human',
        caption:
          'One human, one record. Three thin duplicate records merging into one full record with history and value. Crossed alternative: two follow-ups reaching the same person in one morning.',
      },
    ),
  ),
  flow(
    ...section(
      'HYGIENE',
      'Decay, and the hygiene rhythm',
      ...p(
        'Data rots at rest. People change jobs, numbers, and minds, and a contact record untouched for two years is a guess wearing a name tag. The answer is not a heroic annual cleanse, heroic cleanses get scheduled and skipped, it is a small standing rhythm: merge duplicates as they appear, retire the truly dead rather than letting them pad the numbers, and correct details in the moment you learn they changed, which takes ten seconds now and an archaeology later. A monthly half hour on the worst of it, and the memory stays trustworthy.',
        'Because that is the whole stake, trust. A team that opens the CRM and finds it true, current and quick starts treating it as the single source of truth, and everything in the chapters ahead compounds from there. A clean small CRM beats a bloated big one every single time, and it is not close. Now, onto the machinery that feeds it: the features.',
      ),
      {
        type: 'diagram',
        id: 'btc-ch04-hygiene-rhythm',
        caption:
          'The hygiene rhythm. Cadence strip: IN THE MOMENT "correct details as you learn them" / ON SIGHT "merge duplicates as a reflex" / MONTHLY "half an hour on the worst of it". Footer: "Small and standing beats heroic and skipped."',
      },
    ),
  ),
]
