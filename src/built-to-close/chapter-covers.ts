/** Chapter opener cover art — web (landscape) + print (portrait A4). */
import type { GuideChapterCover } from '../guides/chapter-cover-types'
import {
  BTC_GUIDE_COVERS,
  GUIDE_SHARED_COVERS as S,
  withAlt,
} from '../guides/shared-cover-assets'

export const BTC_HUB_OG = '/images/built-to-close/og.svg'

export const BTC_CHAPTER_COVERS: Record<number, GuideChapterCover> = {
  1: {
    ...BTC_GUIDE_COVERS.ch01Memory,
    alt: 'Scattered inbox and notebook beside a single CRM memory node on a dark desk.',
  },
  2: withAlt(
    S.ownershipKey,
    'Four labelled CRM blocks and a key over exportable data on a dark surface.',
  ),
  3: {
    ...BTC_GUIDE_COVERS.ch03Pipeline,
    alt: 'A horizontal pipeline board with deal stages left to right.',
  },
  4: {
    ...BTC_GUIDE_COVERS.ch04ContactRecord,
    alt: 'A clean contact record with a short field list on a dark background.',
  },
  5: {
    ...BTC_GUIDE_COVERS.ch05FollowUpCards,
    alt: 'Feature cards mapped to follow-up machinery on a dark desk.',
  },
  6: withAlt(S.dailyDesk, 'A morning rhythm strip with clock and task list motifs.'),
  7: {
    ...BTC_GUIDE_COVERS.ch07MessageStacks,
    alt: 'Two message stacks contrasting pest versus persistent follow-up.',
  },
  8: {
    ...BTC_GUIDE_COVERS.ch08LeadTracking,
    alt: 'Tagged inbound channels feeding a CRM ledger on a dark surface.',
  },
  9: withAlt(
    S.hubSpokes,
    'Gold spokes radiating from a central CRM hub to connected systems.',
  ),
  10: {
    ...BTC_GUIDE_COVERS.ch10BalanceScale,
    alt: 'A seesaw balancing work added versus value returned from the CRM.',
  },
  11: withAlt(
    S.aiKeyboard,
    'An AI draft loop with human approval before client messages send.',
  ),
  12: withAlt(
    S.glossaryNotebook,
    'An open glossary notebook and pen on a dark desk, warmly lit.',
  ),
}
