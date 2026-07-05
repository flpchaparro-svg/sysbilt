import type { BtwPage } from '../types'
import { flow, opener, p } from '../../built-to-work/helpers'

export const ch02Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 2,
    title: 'What you own, and what keeps it safe',
    subtitle: 'Domain, catalogue, customers, and the armour that protects them.',
  }),
  flow(...p('This chapter is being prepared. Return to the Built to Sell hub for an overview.')),
]
