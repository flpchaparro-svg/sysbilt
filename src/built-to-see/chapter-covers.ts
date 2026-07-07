/** Chapter opener cover art — web (landscape) + print (portrait A4). */
import type { GuideChapterCover } from '../guides/chapter-cover-types'
import {
  BSE_GUIDE_COVERS,
  GUIDE_SHARED_COVERS as S,
  withAlt,
} from '../guides/shared-cover-assets'

export const BSE_HUB_OG = '/images/built-to-see/og.svg'

export const BSE_CHAPTER_COVERS: Record<number, GuideChapterCover> = {
  1: {
    ...BSE_GUIDE_COVERS.ch01FlyingBlind,
    alt: 'Rear-view mirror versus live dashboard windscreen.',
  },
  2: withAlt(
    S.ownershipKey,
    'Scattered system data converging into one instrument panel.',
  ),
  3: {
    ...BSE_GUIDE_COVERS.ch03DashboardAnatomy,
    alt: 'One question per dashboard view, five numbers not forty.',
  },
  4: {
    ...BSE_GUIDE_COVERS.ch04LeadingLagging,
    alt: 'Leading numbers now, lagging results later.',
  },
  5: {
    ...BSE_GUIDE_COVERS.ch05DashboardLibrary,
    alt: 'The dashboard library: daily glance, pipeline, money, marketing.',
  },
  6: withAlt(
    S.dailyDesk,
    'Daily, weekly, and monthly dashboard rhythms.',
  ),
  7: {
    ...BSE_GUIDE_COVERS.ch07KeepingHonest,
    alt: 'Clean data versus a dashboard that lies convincingly.',
  },
  8: {
    ...BSE_GUIDE_COVERS.ch08AlertsThresholds,
    alt: 'Alerts and plain-language questions of business data.',
  },
  9: {
    ...BSE_GUIDE_COVERS.ch09NervousSystemScreen,
    alt: 'The whole connected business visible on one screen.',
  },
  10: {
    ...BSE_GUIDE_COVERS.ch10ThreeStages,
    alt: 'Three stages: see, understand, anticipate.',
  },
  11: {
    ...BSE_GUIDE_COVERS.ch11PromptCards,
    alt: 'Copy-ready dashboard prompt cards.',
  },
  12: withAlt(
    S.glossaryNotebook,
    'An open glossary notebook on a dark desk, warmly lit.',
  ),
}
