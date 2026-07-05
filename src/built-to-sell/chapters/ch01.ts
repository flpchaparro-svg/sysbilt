import type { BtwPage } from '../types'
import { flow, opener, p } from '../../built-to-work/helpers'

export const ch01Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 1,
    title: 'Why your store exists',
    subtitle: 'The way people buy online has shifted again. Most stores have not caught up.',
  }),
  flow(...p('This chapter is being prepared. Return to the Built to Sell hub for an overview.')),
]
