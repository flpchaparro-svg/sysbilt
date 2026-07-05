import type { BtwPage } from '../types'
import { flow, opener, p } from '../../built-to-work/helpers'

export const ch09Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 9,
    title: 'Your store as the hub',
    subtitle: 'One order, one second — and everything behind it connected.',
  }),
  flow(...p('This chapter is being prepared. Return to the Built to Sell hub for an overview.')),
]
