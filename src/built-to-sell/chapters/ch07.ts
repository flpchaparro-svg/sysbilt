import type { BtwPage } from '../types'
import { flow, opener, p } from '../../built-to-work/helpers'

export const ch07Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 7,
    title: 'Keeping it healthy, legal and fast',
    subtitle: 'Money and personal data make the maintenance bar higher.',
  }),
  flow(...p('This chapter is being prepared. Return to the Built to Sell hub for an overview.')),
]
