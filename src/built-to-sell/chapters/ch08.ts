import type { BtwPage } from '../types'
import { flow, opener, p } from '../../built-to-work/helpers'

export const ch08Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 8,
    title: 'Getting found, by people and by machines',
    subtitle: 'Readable, relevant, trusted — for search engines and assistants.',
  }),
  flow(...p('This chapter is being prepared. Return to the Built to Sell hub for an overview.')),
]
