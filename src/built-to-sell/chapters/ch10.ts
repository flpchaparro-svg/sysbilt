import type { BtwPage } from '../types'
import { flow, opener, p } from '../../built-to-work/helpers'

export const ch10Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 10,
    title: 'Selling where the buyers are',
    subtitle: 'Rented land feeds owned ground.',
  }),
  flow(...p('This chapter is being prepared. Return to the Built to Sell hub for an overview.')),
]
