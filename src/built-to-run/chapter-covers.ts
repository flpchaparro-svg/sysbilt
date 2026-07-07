/** Chapter opener cover art — web (landscape) + print (portrait A4). */
import type { GuideChapterCover } from '../guides/chapter-cover-types'
import {
  BTR_GUIDE_COVERS,
  GUIDE_SHARED_COVERS as S,
  withAlt,
} from '../guides/shared-cover-assets'

export const BTR_HUB_OG = '/images/built-to-run/og.svg'

export const BTR_CHAPTER_COVERS: Record<number, GuideChapterCover> = {
  1: {
    ...BTR_GUIDE_COVERS.ch01HumanGlue,
    alt: 'System islands connected through a person acting as glue on a dark desk.',
  },
  2: withAlt(
    S.ownershipKey,
    'Four automation parts and a webhook doorbell between systems.',
  ),
  3: {
    ...BTR_GUIDE_COVERS.ch03DemoCanyon,
    alt: 'A canyon between demo workflows and dependable ones.',
  },
  4: {
    ...BTR_GUIDE_COVERS.ch04WeekAudit,
    alt: 'A week audit notepad ranking repetitive tasks.',
  },
  5: {
    ...BTR_GUIDE_COVERS.ch05LibraryShelves,
    alt: 'Shelves of automation library entries on a dark background.',
  },
  6: withAlt(
    S.dailyDesk,
    'Human-in-the-loop gate between machine preparation and approval.',
  ),
  7: {
    ...BTR_GUIDE_COVERS.ch07CredentialsDecay,
    alt: 'Credentials and decay arrows pressing on a frozen workflow.',
  },
  8: {
    ...BTR_GUIDE_COVERS.ch08AiVsRules,
    alt: 'AI steps classified beside plain rules in a flow.',
  },
  9: {
    ...BTR_GUIDE_COVERS.ch09NervousSystem,
    alt: 'A nervous system wiring business organs with reflex gears.',
  },
  10: {
    ...BTR_GUIDE_COVERS.ch10CostCrossover,
    alt: 'A per-task cost line crossing a flat self-hosted line.',
  },
  11: withAlt(
    S.aiKeyboard,
    'A specification branching to multiple builders including AI.',
  ),
  12: withAlt(
    S.glossaryNotebook,
    'An open glossary notebook on a dark desk, warmly lit.',
  ),
}
