/** Chapter opener cover art — web (landscape) + print (portrait A4). */
import type { GuideChapterCover } from '../guides/chapter-cover-types'
import {
  BTE_GUIDE_COVERS,
  GUIDE_SHARED_COVERS as S,
  withAlt,
} from '../guides/shared-cover-assets'

export const BTE_HUB_OG = '/images/built-to-teach/og.svg'

export const BTE_CHAPTER_COVERS: Record<number, GuideChapterCover> = {
  1: {
    ...BTE_GUIDE_COVERS.ch01SystemsNeedPeople,
    alt: 'A polished system diagram beside an empty training checklist — adoption is the failure point.',
  },
  2: withAlt(
    S.ownershipKey,
    'Business knowledge as an owned asset and single source of truth.',
  ),
  3: {
    ...BTE_GUIDE_COVERS.ch03ShowDoCheck,
    alt: 'Show, then do, then check: the anatomy of training that sticks.',
  },
  4: {
    ...BTE_GUIDE_COVERS.ch04CaptureKnowledge,
    alt: 'Recording expert knowledge while doing the work.',
  },
  5: {
    ...BTE_GUIDE_COVERS.ch05FormatLibrary,
    alt: 'The training format library: procedures, video, podcasts, quizzes.',
  },
  6: withAlt(
    S.dailyDesk,
    'Training in the flow of work and the update ritual.',
  ),
  7: {
    ...BTE_GUIDE_COVERS.ch07TrainingAgent,
    alt: 'A training agent answering questions from the knowledge base.',
  },
  8: {
    ...BTE_GUIDE_COVERS.ch08OnboardingPath,
    alt: 'Onboarding path from first day to independent.',
  },
  9: {
    ...BTE_GUIDE_COVERS.ch09ChangeManagement,
    alt: 'Change management: support through the dip, then commit fully.',
  },
  10: {
    ...BTE_GUIDE_COVERS.ch10TrainingSignals,
    alt: 'Signals that show whether training is working.',
  },
  11: {
    ...BTE_GUIDE_COVERS.ch11PromptCards,
    alt: 'Copy-ready training prompt cards.',
  },
  12: withAlt(
    S.glossaryNotebook,
    'An open glossary notebook on a dark desk, warmly lit.',
  ),
}
