import type { BtwPage } from '../types'
import { flow, opener, p } from '../../built-to-work/helpers'

export const ch06Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 6,
    title: 'Running it day to day',
    subtitle: 'The operating rhythm that keeps orders flowing and stock honest.',
  }),
  flow(...p('This chapter is being prepared. Return to the Built to Sell hub for an overview.')),
]
