/** Chapter opener cover art — web (landscape) + print (portrait A4). */
import type { GuideChapterCover } from '../guides/chapter-cover-types'
import {
  BTS_GUIDE_COVERS,
  GUIDE_SHARED_COVERS as S,
  withAlt,
} from '../guides/shared-cover-assets'

export const BTS_HUB_OG = '/images/built-to-sell/og.svg'

export const BTS_CHAPTER_COVERS: Record<number, GuideChapterCover> = {
  1: {
    ...BTS_GUIDE_COVERS.phoneStore,
    alt: 'A phone showing a product page beside a subtle machine-read icon on a dark desk.',
  },
  2: withAlt(S.ownershipKey, 'A brass key and padlock on a dark surface, warmly lit.'),
  3: withAlt(
    S.anatomyWireframe,
    'A product page wireframe with image, copy lines, and a gold buy button.',
  ),
  4: withAlt(S.pagesMockups, 'Six small page mockups arranged in a grid on a dark background.'),
  5: {
    ...BTS_GUIDE_COVERS.ecommerceTiles,
    alt: 'Four feature cards in a row suggesting cart, search, and recovery tools.',
  },
  6: withAlt(S.dailyDesk, 'A calm desk with notebook blocks suggesting a weekly operating rhythm.'),
  7: withAlt(S.healthGauge, 'A speed gauge and shield motif suggesting security and performance.'),
  8: {
    ...BTS_GUIDE_COVERS.productDataSearch,
    alt: 'A magnifier over structured data lines suggesting search and machine readability.',
  },
  9: withAlt(S.hubSpokes, 'Gold lines radiating from a central store hub to connected systems.'),
  10: {
    ...BTS_GUIDE_COVERS.channelsStorefront,
    alt: 'Two doorways converging on one owned store, suggesting rented channels feeding home.',
  },
  11: withAlt(S.aiKeyboard, 'A keyboard with a soft glow suggesting AI-assisted store content work.'),
  12: withAlt(S.glossaryNotebook, 'An open glossary notebook and pen on a dark desk, warmly lit.'),
}
