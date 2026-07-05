import type { BtwPage } from '../types'
import { flow, opener, p } from '../../built-to-work/helpers'

export const ch03Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 3,
    title: 'The anatomy of a product page that sells',
    subtitle: 'Every product page that earns money shares the same structure.',
  }),
  flow(...p('This chapter is being prepared. Return to the Built to Sell hub for an overview.')),
]
