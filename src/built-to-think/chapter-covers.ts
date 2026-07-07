/** Chapter opener cover art — web (landscape) + print (portrait A4). */
import type { GuideChapterCover } from '../guides/chapter-cover-types'
import {
  BTT_GUIDE_COVERS,
  GUIDE_SHARED_COVERS as S,
  withAlt,
} from '../guides/shared-cover-assets'

export const BTT_HUB_OG = '/images/built-to-think/og.svg'

export const BTT_CHAPTER_COVERS: Record<number, GuideChapterCover> = {
  1: {
    ...BTT_GUIDE_COVERS.ch01TwoTruths,
    alt: 'Two truths about AI: the shift is real and the waste is realer.',
  },
  2: {
    ...BTT_GUIDE_COVERS.ch02PredictionMachine,
    alt: 'A prediction machine with memory, window, and meter mechanics.',
  },
  3: {
    ...BTT_GUIDE_COVERS.ch03FourGates,
    alt: 'Four gates of a task that pays for AI.',
  },
  4: {
    ...BTT_GUIDE_COVERS.ch04ThreeDoors,
    alt: 'Three doors AI is sold at, ascending in price.',
  },
  5: {
    ...BTT_GUIDE_COVERS.ch05UseCaseLibrary,
    alt: 'Shelves of AI use-case library entries.',
  },
  6: withAlt(
    S.dailyDesk,
    'A briefing document with four labelled sections.',
  ),
  7: withAlt(
    S.healthGauge,
    'Privacy line between walled tools and public AI.',
  ),
  8: {
    ...BTT_GUIDE_COVERS.ch08IcebergKnowledge,
    alt: 'An iceberg showing knowledge beneath the agent interface.',
  },
  9: {
    ...BTT_GUIDE_COVERS.ch09SystemPlugs,
    alt: 'Standard plugs connecting AI to business systems.',
  },
  10: {
    ...BTT_GUIDE_COVERS.ch10AdoptionLadder,
    alt: 'A six-rung adoption ladder for AI.',
  },
  11: {
    ...BTT_GUIDE_COVERS.ch11PromptCards,
    alt: 'Copy-ready prompt cards on a dark desk.',
  },
  12: withAlt(
    S.glossaryNotebook,
    'An open glossary notebook on a dark desk, warmly lit.',
  ),
}
