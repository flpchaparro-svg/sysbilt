/** Chapter opener cover art — web (landscape) + print (portrait A4). */
import type { GuideChapterCover } from '../guides/chapter-cover-types'
import {
  BTM_GUIDE_COVERS,
  GUIDE_SHARED_COVERS as S,
  withAlt,
} from '../guides/shared-cover-assets'

export const BTM_HUB_OG = '/images/built-to-multiply/og.svg'

export const BTM_CHAPTER_COVERS: Record<number, GuideChapterCover> = {
  1: {
    ...BTM_GUIDE_COVERS.ch01FloodVsSystem,
    alt: 'The wall of content production cost fallen, and the flood versus the system.',
  },
  2: {
    ...BTM_GUIDE_COVERS.ch02ThreeJobs,
    alt: 'Three jobs of content: awareness, consideration, lead capture.',
  },
  3: {
    ...BTM_GUIDE_COVERS.ch03HookValueAction,
    alt: 'Hook, value, action in a single piece of content.',
  },
  4: {
    ...BTM_GUIDE_COVERS.ch04RepurposeTree,
    alt: 'One source piece branching into many channels.',
  },
  5: {
    ...BTM_GUIDE_COVERS.ch05ContentToolkit,
    alt: 'Content toolkit mapped along the production line.',
  },
  6: withAlt(
    S.dailyDesk,
    'Batch production and scheduling on a calendar.',
  ),
  7: withAlt(
    S.healthGauge,
    'Honest claims and premium brand standards in content.',
  ),
  8: {
    ...BTM_GUIDE_COVERS.ch08MetricsThatMatter,
    alt: 'Metrics that match the job versus vanity numbers.',
  },
  9: {
    ...BTM_GUIDE_COVERS.ch09ContentChain,
    alt: 'Content chain from post to CRM and follow-up.',
  },
  10: {
    ...BTM_GUIDE_COVERS.ch10TeamTraining,
    alt: 'Training materials for a content team.',
  },
  11: {
    ...BTM_GUIDE_COVERS.ch11PromptCards,
    alt: 'Copy-ready content prompt cards.',
  },
  12: withAlt(
    S.glossaryNotebook,
    'An open glossary notebook on a dark desk, warmly lit.',
  ),
}
