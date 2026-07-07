/** Chapter opener cover art — web (landscape) + print (portrait A4). */
import type { GuideChapterCover } from '../guides/chapter-cover-types'
import {
  BTW_GUIDE_COVERS,
  GUIDE_SHARED_COVERS as S,
  withAlt,
} from '../guides/shared-cover-assets'

export const BTW_CHAPTER_COVERS: Record<number, GuideChapterCover> = {
  1: {
    ...BTW_GUIDE_COVERS.phoneWebsite,
    alt: 'A business website on a phone and laptop in a softly lit workspace.',
  },
  2: withAlt(S.ownershipKey, 'A brass key and a padlock on a dark desk, lit warmly.'),
  3: withAlt(S.anatomyWireframe, 'A hand-drawn website wireframe on paper on a dark desk.'),
  4: withAlt(S.pagesMockups, 'A small set of website page mockups laid out on a dark surface.'),
  5: withAlt(
    S.featuresComponentsWeb,
    'Small website interface components arranged like parts on a dark workbench.',
  ),
  6: withAlt(S.dailyDesk, 'A desk with coffee, a phone and an open notebook in warm light.'),
  7: withAlt(S.healthGauge, 'A close-up of a fine mechanical gauge lit warmly on a dark background.'),
  8: withAlt(S.discoveryMapPin, 'A glowing location pin on a dark map, lit warmly from above.'),
  9: withAlt(S.hubSpokes, 'Fine gold lines radiating from a central point on a dark background.'),
  10: withAlt(S.growthSeedling, 'A small seedling in warm light against a dark background.'),
  11: withAlt(S.aiKeyboard, 'Hands typing on a backlit keyboard in a softly lit workspace.'),
  12: withAlt(S.glossaryNotebook, 'An open notebook and fountain pen on a dark desk, lit warmly.'),
}
